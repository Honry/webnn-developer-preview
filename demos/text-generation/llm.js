/* eslint-disable no-undef */
import {
    $,
    convertToSnakeCase,
    createMlTensor,
    createGpuTensor,
    readBackMLTensor,
    readBackGpuTensor,
} from "../../assets/js/common_utils.js";
import {
    getModelOPFS,
    log,
    updateOnnxCompileProgress,
    updateOnnxDataCompileProgress,
    updateLoadProgress,
    updateProgressBar,
    loadProgress,
    onnxFetchProgress,
    onnxDataFetchProgress,
    onnxCompileProgress,
    onnxDataCompileProgress,
} from "./utils.js";
import { WebNNPerf } from "../webnn-perf.js";
// Class to handle a large language model on top of onnxruntime-web
export class LLM {
    provider = "webnn";
    session1 = undefined;
    session2 = undefined;
    feed = {};
    fetches = {};
    outputTokens = [];
    stop = false;
    kvDims = [];
    deviceType = "gpu";
    maxLength = 2048;
    mlContext = undefined;
    startLength = 0;
    logitsBuffer = undefined;
    repetitionPenalty = 1.0;
    temperature = 0.0;
    topK = 0;

    constructor(maxLength) {
        this.maxLength = maxLength;
    }

    async load(model, options, flag = true) {
        this.provider = options.provider;
        this.deviceType = options.deviceType;
        const verbose = options.verbose;
        this.eos = model.eos_token_id; // End of sentence token ids
        this.numLayers = model.num_layers;
        this.kvNumHeads = model.kv_num_heads;
        this.headSize = model.head_size;
        this.kvDims = [1, model.kv_num_heads, this.maxLength, model.head_size];
        this.vocabSize = model.vocab_size;
        this.hasPositionIds = !!model.has_position_ids;
        this.repetitionPenalty = model.repetition_penalty || 1.0;
        this.temperature = model.temperature || 0.0;
        this.topK = model.top_k || 0;
        this.topP = model.top_p || 1.0;
        this.endThinkTokenId = model.end_think_token_id || 0; // token ID for </think>
        this.maxThinkTokens = model.max_think_tokens || 0; // 0 = no limit
        this.logitsBuffer = new Float16Array(this.vocabSize);
        log(`WebNN EP config: ${model.name} · ${this.provider} · ${this.deviceType}`);

        const path = options.local ? model.local_path : model.remote_path;
        const modelFile = model.file_name;
        const modelPath = path + modelFile;
        const modelName = convertToSnakeCase(model.name);
        const modelBytes = await WebNNPerf.time(
            "webnn.model.fetch",
            () => getModelOPFS(`${modelName}_${modelFile}`, modelPath, false),
            { model: modelName },
        );
        const externalFile = modelFile + ".data";
        const externalDataPath = path + externalFile;
        const externalDataBytes = await WebNNPerf.time(
            "webnn.model.fetch",
            () => getModelOPFS(`${modelName}_${externalFile}`, externalDataPath, false),
            { model: `${modelName}-data` },
        );

        let modelSize = modelBytes.byteLength;
        modelSize += externalDataBytes.byteLength;

        log(`model size: ${Math.round(modelSize / 1024 / 1024)} MB`);
        WebNNPerf.configure({ model: modelName, device: this.deviceType, provider: this.provider });
        if (this.provider == "webnn") {
            this.mlContext = await WebNNPerf.time("webnn.context.create", () =>
                navigator.ml.createContext({ deviceType: this.deviceType }),
            );
        }
        const sessionOptions = {
            executionProviders: [
                {
                    name: this.provider,
                    deviceType: this.deviceType,
                    context: this.mlContext,
                    freeDimensionBounds: {
                        sequence_length: { maxSize: this.maxLength },
                        total_sequence_length: { maxSize: this.maxLength },
                    },
                },
            ],
            externalData: [
                {
                    data: externalDataBytes,
                    path: externalFile,
                },
            ],
            extra: {
                session: {
                    strict_shape_type_inference: "1",
                },
            },
        };

        if (verbose) {
            sessionOptions.logSeverityLevel = 0;
            sessionOptions.logVerbosityLevel = 0;
        }

        if (this.provider == "webnn") {
            sessionOptions.freeDimensionOverrides = {
                batch_size: 1,
                past_sequence_length: this.maxLength,
            };
        }

        let progressBarLabel = $("#p-bar-label");
        log("Create session for prefill process");
        console.log("Create session with option: ");
        console.log({ ...sessionOptions });
        this.session1 = await WebNNPerf.time(
            "webnn.session.create",
            () => ort.InferenceSession.create(modelBytes, sessionOptions),
            { model: `${modelName}-prefill` },
        );
        updateOnnxCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Prefill session created · ${loadProgress.toFixed(2)}%`;

        log("Session created");

        if (this.provider == "webgpu") {
            this.gpuDevice = ort.env.webgpu.device;
        }

        updateOnnxDataCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Session for decode created · ${loadProgress.toFixed(2)}%`;

        updateProgressBar(100.0);
        progressBarLabel.innerHTML = "100%";

        if (!flag) {
            this.initialize();
        }
    }

    disposeTensors(tensors) {
        if (tensors && typeof tensors === "object") {
            for (const name in tensors) {
                const t = tensors[name];
                if (t.disposer == undefined) {
                    if (t.location == "ml-tensor") {
                        t.mlTensor.destroy();
                    }
                    if (t.location == "gpu-buffer") {
                        t.gpuBuffer.destroy();
                    }
                } else {
                    t.dispose();
                }
            }
        }
    }

    // Initialize key value caches
    async initialize() {
        // Dispose previous tensors
        this.disposeTensors(this.feed);
        this.disposeTensors(this.fetches);

        this.feed = {};
        if (this.provider == "webnn") {
            // Pre-allocate kv cache ml-tensor
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = await createMlTensor(
                    this.mlContext,
                    "float16",
                    this.kvDims,
                    false,
                    false,
                );
                this.feed[`past_key_values.${i}.value`] = await createMlTensor(
                    this.mlContext,
                    "float16",
                    this.kvDims,
                    false,
                    false,
                );

                this.fetches[`present.${i}.key`] = await createMlTensor(
                    this.mlContext,
                    "float16",
                    this.kvDims,
                    false,
                    false,
                );
                this.fetches[`present.${i}.value`] = await createMlTensor(
                    this.mlContext,
                    "float16",
                    this.kvDims,
                    false,
                    false,
                );
            }
            this.fetches["logits"] = await createMlTensor(
                this.mlContext,
                "float16",
                [1, 1, this.vocabSize],
                false,
                true,
            );
        } else if (this.provider == "webgpu") {
            // Pre-allocate kv cache gpu-buffer
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const bufferSize = numElements * Float16Array.BYTES_PER_ELEMENT;
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = createGpuTensor(
                    this.gpuDevice,
                    "float16",
                    this.kvDims,
                    bufferSize,
                );
                this.feed[`past_key_values.${i}.value`] = createGpuTensor(
                    this.gpuDevice,
                    "float16",
                    this.kvDims,
                    bufferSize,
                );

                // The GQA spec suggests to use the same tensor for both present_key & present_value
                // and past_key & past_value if the total_sequence_length = max_sequence_length
                // in order to save GPU memory.
                this.fetches[`present.${i}.key`] = this.feed[`past_key_values.${i}.key`];
                this.fetches[`present.${i}.value`] = this.feed[`past_key_values.${i}.value`];
            }
            this.fetches["logits"] = createGpuTensor(
                this.gpuDevice,
                "float16",
                [1, 1, this.vocabSize],
                this.vocabSize * Float16Array.BYTES_PER_ELEMENT,
            );
        } else {
            // Initialize kv cache as empty tensors for WASM EP
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const emptyTensor = new Float16Array(numElements);
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = new ort.Tensor("float16", emptyTensor, this.kvDims);
                this.feed[`past_key_values.${i}.value`] = new ort.Tensor("float16", emptyTensor, this.kvDims);
            }
            this.fetches["logits"] = new ort.Tensor("float16", new Float16Array(this.vocabSize), [
                1,
                1,
                this.vocabSize,
            ]);
        }
    }

    // Update key value cache
    updateKvCache(outputs) {
        for (const name in outputs) {
            if (name.includes("present.")) {
                let newName = name.replace(name.split(".")[0], "past_key_values");
                const t = this.feed[newName];
                if (this.fetches[name]) {
                    this.feed[newName] = this.fetches[name];
                    this.fetches[name] = t;
                } else {
                    this.feed[newName] = outputs[name];
                }
            }
        }
    }

    // Padding input array with 0
    paddingInput(originInput, maxLength, reverse = false) {
        let input = originInput.slice();
        if (input.length >= maxLength) return input.slice(0, maxLength);
        const paddingLength = maxLength - input.length;
        const padding = Array.from({ length: paddingLength }, () => 0n);
        if (reverse) {
            return padding.concat(input);
        } else {
            return input.concat(padding);
        }
    }

    // Tell generate() to stop
    abort() {
        this.stop = true;
    }

    // Apply repetition penalty to logits for tokens that already appeared
    // Uses frequency-based penalty: penalty^min(count, maxCount) to avoid over-penalizing common words
    applyRepetitionPenalty(logits, vocabSize, generatedTokens, penalty) {
        if (penalty === 1.0 || generatedTokens.length === 0) return;
        const maxCount = 3; // Cap frequency to avoid destroying common word probabilities
        // Count frequency of each token
        const freq = new Map();
        for (const tokenId of generatedTokens) {
            freq.set(tokenId, (freq.get(tokenId) || 0) + 1);
        }
        for (const [tokenId, count] of freq) {
            if (tokenId >= 0 && tokenId < vocabSize) {
                const effectivePenalty = Math.pow(penalty, Math.min(count, maxCount));
                if (logits[tokenId] > 0) {
                    logits[tokenId] = logits[tokenId] / effectivePenalty;
                } else {
                    logits[tokenId] = logits[tokenId] * effectivePenalty;
                }
            }
        }
    }

    // Poor man's argmax
    argmax(arr, vocabSize) {
        let start = 0;
        let max = arr[start];
        let maxIndex = 0;

        for (let i = 0; i < vocabSize; i++) {
            const val = arr[i + start];
            if (!isFinite(val)) {
                throw new Error("Found infinity in logits");
            }
            if (val > max) {
                max = arr[i + start];
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    // Sample from logits using temperature, top-k and top-p (nucleus) sampling
    sampleTopK(logits, vocabSize, temperature, topK, topP) {
        // Build array of {index, logit} pairs
        const candidates = new Array(vocabSize);
        for (let i = 0; i < vocabSize; i++) {
            candidates[i] = { index: i, logit: Number(logits[i]) };
        }

        // Sort by logit descending
        candidates.sort((a, b) => b.logit - a.logit);

        // Top-k filtering
        const k = topK > 0 ? Math.min(topK, vocabSize) : vocabSize;
        let filtered = candidates.slice(0, k);

        // Apply temperature and compute softmax
        const scaledLogits = filtered.map(c => c.logit / temperature);
        const maxLogit = scaledLogits[0];
        const expValues = scaledLogits.map(l => Math.exp(l - maxLogit));
        const sumExp = expValues.reduce((a, b) => a + b, 0);
        const probs = expValues.map(e => e / sumExp);

        // Top-p (nucleus) filtering: keep smallest set of tokens whose cumulative prob >= topP
        if (topP < 1.0) {
            let cumProb = 0;
            let cutoff = probs.length;
            for (let i = 0; i < probs.length; i++) {
                cumProb += probs[i];
                if (cumProb >= topP) {
                    cutoff = i + 1;
                    break;
                }
            }
            // Re-normalize probabilities over the nucleus
            filtered = filtered.slice(0, cutoff);
            const nucleusProbs = probs.slice(0, cutoff);
            const nucleusSum = nucleusProbs.reduce((a, b) => a + b, 0);
            const normalizedProbs = nucleusProbs.map(p => p / nucleusSum);

            // Sample from nucleus
            const r = Math.random();
            let cumulative = 0;
            for (let i = 0; i < normalizedProbs.length; i++) {
                cumulative += normalizedProbs[i];
                if (r < cumulative) {
                    return filtered[i].index;
                }
            }
            return filtered[filtered.length - 1].index;
        }

        // Sample from the distribution (no top-p)
        const r = Math.random();
        let cumulative = 0;
        for (let i = 0; i < probs.length; i++) {
            cumulative += probs[i];
            if (r < cumulative) {
                return filtered[i].index;
            }
        }
        return filtered[filtered.length - 1].index;
    }

    // Select next token: sampling if temperature > 0, otherwise greedy argmax
    selectToken(logits, vocabSize) {
        if (this.temperature > 0) {
            return this.sampleTopK(logits, vocabSize, this.temperature, this.topK, this.topP);
        }
        return this.argmax(logits, vocabSize);
    }

    // Prefill prompt and generate tokens, greedy search only
    async generate(inputIds, callback) {
        this.outputTokens = [];
        const inputIdsLen = inputIds.length;
        const attnMaskLen = this.startLength + inputIdsLen;

        // Guard: total sequence length must not exceed maxLength
        if (attnMaskLen > this.maxLength) {
            throw new Error(
                `Total sequence length (${attnMaskLen}) exceeds maxLength (${this.maxLength}). ` +
                    `startLength=${this.startLength}, inputIdsLen=${inputIdsLen}. Use Ctrl+Enter to start a new conversation.`,
            );
        }

        let attnMask = Array.from({ length: attnMaskLen }, () => BigInt(1));

        this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from(inputIds), [1, inputIds.length]);
        this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMask.length]);
        if (this.hasPositionIds) {
            const positionIds = Array.from({ length: inputIdsLen }, (_, i) => BigInt(this.startLength + i++));
            this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from(positionIds), [
                1,
                positionIds.length,
            ]);
        }
        this.stop = false;
        let lastToken = 0;
        let outputs = await WebNNPerf.time("webnn.inference.first", () => this.session1.run(this.feed, this.fetches), {
            model: "prefill",
        });

        if (this.provider == "webnn") {
            await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.logitsBuffer);
        } else if (this.provider == "webgpu") {
            await readBackGpuTensor(
                this.gpuDevice,
                this.fetches["logits"].gpuBuffer,
                this.vocabSize * Float16Array.BYTES_PER_ELEMENT,
                this.logitsBuffer,
            );
        } else {
            this.logitsBuffer = outputs["logits"].cpuData;
        }

        this.applyRepetitionPenalty(this.logitsBuffer, this.vocabSize, this.outputTokens, this.repetitionPenalty);
        lastToken = this.selectToken(this.logitsBuffer, this.vocabSize);

        // Thinking budget: force </think> if model hasn't produced it within budget
        let thinkingDone = false;
        const hasThinkBudget = this.endThinkTokenId > 0 && this.maxThinkTokens > 0;

        this.startLength = this.startLength + inputIdsLen;
        this.outputTokens.push(lastToken);
        if (lastToken === this.endThinkTokenId) thinkingDone = true;
        if (callback) {
            callback(this.outputTokens);
        }

        this.updateKvCache(outputs);
        while (this.eos.indexOf(lastToken) == -1 && !this.stop && this.startLength < this.maxLength) {
            this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(lastToken)]), [1, 1]);
            attnMask.push(1n);
            this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMask.length]);
            if (this.hasPositionIds) {
                this.feed["position_ids"] = new ort.Tensor(
                    "int64",
                    BigInt64Array.from([BigInt(this.startLength)]),
                    [1, 1],
                );
            }
            if (this.provider == "webnn") {
                outputs = await WebNNPerf.time("webnn.inference", () => this.session1.run(this.feed, this.fetches), {
                    model: "decode",
                    iteration: this.outputTokens.length,
                });
                await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.logitsBuffer);
            } else if (this.provider == "webgpu") {
                if (!this.fetches["logits"]) {
                    // Pre-allocate logits gpu-buffer once
                    this.fetches["logits"] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        [1, 1, this.vocabSize],
                        this.vocabSize * Float16Array.BYTES_PER_ELEMENT,
                    );
                }
                outputs = await WebNNPerf.time("webnn.inference", () => this.session1.run(this.feed, this.fetches), {
                    model: "decode-webgpu",
                    iteration: this.outputTokens.length,
                });
                await readBackGpuTensor(
                    this.gpuDevice,
                    this.fetches["logits"].gpuBuffer,
                    this.vocabSize * Float16Array.BYTES_PER_ELEMENT,
                    this.logitsBuffer,
                );
            } else {
                outputs = await WebNNPerf.time("webnn.inference", () => this.session1.run(this.feed, this.fetches), {
                    model: "decode-wasm",
                    iteration: this.outputTokens.length,
                });
                this.logitsBuffer = outputs["logits"].cpuData;
            }

            this.applyRepetitionPenalty(this.logitsBuffer, this.vocabSize, this.outputTokens, this.repetitionPenalty);
            lastToken = this.selectToken(this.logitsBuffer, this.vocabSize);

            // Thinking budget: if model hasn't emitted </think> within budget, force it
            if (hasThinkBudget && !thinkingDone && this.outputTokens.length >= this.maxThinkTokens) {
                console.warn(
                    `[LLM] Thinking budget (${this.maxThinkTokens}) exceeded, forcing </think> token ${this.endThinkTokenId}`,
                );
                lastToken = this.endThinkTokenId;
                thinkingDone = true;
            }
            if (lastToken === this.endThinkTokenId) thinkingDone = true;

            // Break on consecutive repeat (same token 3+ times in a row)
            const len = this.outputTokens.length;
            if (len >= 2 && this.outputTokens[len - 1] === lastToken && this.outputTokens[len - 2] === lastToken) {
                console.warn(`[LLM] Breaking: token ${lastToken} repeated 3x consecutively`);
                break;
            }

            this.outputTokens.push(lastToken);
            if (callback) {
                callback(this.outputTokens);
            }
            this.updateKvCache(outputs);
            this.startLength++;
        }

        return this.outputTokens;
    }

    async dispose() {
        try {
            this.disposeTensors(this.feed);
            this.disposeTensors(this.fetches);

            this.feed = {};
            this.fetches = {};
            await this.session1.release();
            this.session1 = undefined;
            if (this.session2) {
                await this.session2.release();
                this.session2 = undefined;
            }
        } catch (e) {
            console.log("Error releasing session: ", e);
        }

        if (this.mlContext) {
            await this.mlContext.destroy();
        }

        this.outputTokens = [];
        this.kvDims = [];
        this.mlContext = undefined;
        this.startLength = 0;
    }
}
