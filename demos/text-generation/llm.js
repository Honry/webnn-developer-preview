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
    decodeLogitsBuffer = undefined;

    constructor(maxLength) {
        this.maxLength = maxLength;
    }

    async load(model, options, flag = true) {
        this.provider = options.provider;
        this.deviceType = options.deviceType;
        const verbose = options.verbose;
        const profiler = options.profiler;
        this.eos = model.eos_token_id; // End of sentence token ids
        this.numLayers = model.num_layers;
        this.kvNumHeads = model.kv_num_heads;
        this.headSize = model.head_size;
        this.kvDims = [1, model.kv_num_heads, this.maxLength, model.head_size];
        this.vocabSize = model.vocab_size;
        this.decodeLogitsBuffer = new Float16Array(this.vocabSize);
        this.useTwoSessions = options.useTwoSessions;
        this.useSameTensor = options.useSameTensor;
        this.hasPositionId = model.hasPositionId;
        log(`WebNN EP config: ${model.name} · ${this.provider} · ${this.deviceType}`);

        const path = options.local ? model.local_path : model.remote_path;
        const modelFile = model.file_name;
        const modelPath = path + modelFile;
        const modelName = convertToSnakeCase(model.name);
        const modelBytes = await getModelOPFS(`${modelName}_${modelFile}`, modelPath, false);
        const externalFile = modelFile + ".data";
        const externalDataPath = path + externalFile;
        const externalDataBytes = await getModelOPFS(`${modelName}_${externalFile}`, externalDataPath, false);

        let modelSize = modelBytes.byteLength;
        modelSize += externalDataBytes.byteLength;

        log(`model size: ${Math.round(modelSize / 1024 / 1024)} MB`);
        if (this.provider == "webnn") {
            this.mlContext = await navigator.ml.createContext({ deviceType: this.deviceType });
        }
        const sessionOptions = {
            executionProviders: [{ name: this.provider, deviceType: this.deviceType, context: this.mlContext }],
            externalData: [
                {
                    data: externalDataBytes,
                    path: externalFile,
                },
            ],
        };

        if (verbose) {
            sessionOptions.logSeverityLevel = 0;
            sessionOptions.logVerbosityLevel = 0;
        }
        if (profiler && this.provider == "webgpu") {
            sessionOptions.enableProfiling = true;
        }
        if (this.provider == "webnn" || this.useTwoSessions) {
            sessionOptions.freeDimensionOverrides = {
                batch_size: 1,
                sequence_length: this.maxLength,
                total_sequence_length: this.maxLength,
                past_sequence_length: this.maxLength,
            };
        }

        let progressBarLabel = $("#p-bar-label");
        log("Create session for prefill process");
        console.log("Create session 1 with option: ");
        console.log({ ...sessionOptions });
        this.session1 = await ort.InferenceSession.create(modelBytes, sessionOptions);
        updateOnnxCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Prefill session created · ${loadProgress.toFixed(2)}%`;

        log("Prefill session created");
        if (this.provider == "webnn" || this.useTwoSessions) {
            // Decode process
            sessionOptions.freeDimensionOverrides = {
                batch_size: 1,
                sequence_length: 1,
                total_sequence_length: this.maxLength,
                past_sequence_length: this.maxLength,
            };
            // if (this.provider == "webgpu") sessionOptions.freeDimensionOverrides = {};
            log("Create session for decode process");
            console.log("Create session 2 with option: ");
            console.log({ ...sessionOptions });
            this.session2 = await ort.InferenceSession.create(modelBytes, sessionOptions);
            log("Decode process session created");
        }

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
            this.initialize(this.useSameTensor);
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
    async initialize(useSameTensor = false) {
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

                if (useSameTensor) {
                    this.fetches[`present.${i}.key`] = this.feed[`past_key_values.${i}.key`];
                    this.fetches[`present.${i}.value`] = this.feed[`past_key_values.${i}.value`];
                } else {
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
            }

            this.inputIdsMlTensor = await createMlTensor(this.mlContext, "int64", [1, this.maxLength], true, false);
            this.attentionMaskMlTensor = await createMlTensor(
                this.mlContext,
                "int64",
                [1, this.maxLength],
                true,
                false,
            );
            if (this.hasPositionId) {
                this.positionIdsMlTensor = await createMlTensor(
                    this.mlContext,
                    "int64",
                    [1, this.maxLength],
                    true,
                    false,
                );
            }
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

                if (useSameTensor) {
                    this.fetches[`present.${i}.key`] = this.feed[`past_key_values.${i}.key`];
                    this.fetches[`present.${i}.value`] = this.feed[`past_key_values.${i}.value`];
                } else {
                    this.fetches[`present.${i}.key`] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        this.kvDims,
                        bufferSize,
                    );
                    this.fetches[`present.${i}.value`] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        this.kvDims,
                        bufferSize,
                    );
                }
            }
        } else {
            // Initialize kv cache as empty tensors for WASM EP
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const emptyTensor = new Float16Array(numElements);
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = new ort.Tensor("float16", emptyTensor, this.kvDims);
                this.feed[`past_key_values.${i}.value`] = new ort.Tensor("float16", emptyTensor, this.kvDims);
            }
        }
    }

    // Update key value cache
    updateKvCache(outputs) {
        if (this.useSameTensor) return;
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

    // Poor man's argmax
    argmax(arr, sequenceLength = 1, vocabSize) {
        let start = vocabSize * (sequenceLength - 1);
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

    // Prefill prompt and generate tokens, greedy search only
    async generate(inputIds, callback, profiler = false, trace = false) {
        if (trace) {
            console.time("generate(): prefill prepare inputs");
        }
        this.outputTokens = [];
        const inputIdsLen = inputIds.length;
        const attnMaskLen =
            this.provider == "webnn" || this.useTwoSessions ? inputIdsLen : this.startLength + inputIdsLen;
        let attnMask = Array.from({ length: attnMaskLen }, () => BigInt(1));

        let positionIds;
        if (this.hasPositionId) {
            positionIds = Array.from({ length: inputIdsLen }, (_, i) =>
                BigInt(this.provider == "webnn" || this.useTwoSessions ? i++ : this.startLength + i++),
            );
        }
        // Both input_ids and position_ids have shapes of [batch_size, sequence_length].
        // The sequence_length is the length of inputIds, which is dynamic.
        // Since WebNN does not support dynamic shapes, fix the sequence_length to maxLength and
        // pad the rest elements with 0 value.
        // TODO: This may cause an overflow error if maxLength is excessively large,
        // as it could exceed the allowable array size or memory limits.
        // e.g. QWen2.0 supports max_length: 32768, in a matmul of the GQA decomposed op,
        // its input shapes will be [1, 14, 32768, 64] x [1, 14, 64, 32768] = [1, 14, 32768, 32768]
        // which exceeds the 2GB tensor size limitation.
        if (this.provider == "webnn" || this.useTwoSessions) {
            inputIds = this.paddingInput(inputIds, this.maxLength);
            if (this.hasPositionId) {
                positionIds = this.paddingInput(positionIds, this.maxLength);
            }
            attnMask = this.paddingInput(attnMask, this.maxLength);
        }

        if (this.provider == "webnn") {
            this.mlContext.writeTensor(this.inputIdsMlTensor.mlTensor, BigInt64Array.from(inputIds));
            this.mlContext.writeTensor(this.attentionMaskMlTensor.mlTensor, BigInt64Array.from(attnMask));
            if (this.hasPositionId) {
                this.mlContext.writeTensor(this.positionIdsMlTensor.mlTensor, BigInt64Array.from(positionIds));
            }
            this.feed["input_ids"] = this.inputIdsMlTensor;
            this.feed["attention_mask"] = this.attentionMaskMlTensor;
            if (this.hasPositionId) {
                this.feed["position_ids"] = this.positionIdsMlTensor;
            }
        } else {
            this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from(inputIds), [1, inputIds.length]);
            this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMask.length]);
            if (this.hasPositionId) {
                this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from(positionIds), [
                    1,
                    positionIds.length,
                ]);
            }
        }
        this.stop = false;

        // shape of logits in prefill
        const prefillLogitsShape = [
            1,
            this.provider == "webnn" || this.useTwoSessions ? this.maxLength : inputIdsLen,
            this.vocabSize,
        ];
        const numElementsOfPrefillLogits = prefillLogitsShape.reduce((a, b) => a * b, 1);
        const prefillLogitsBufferSize = numElementsOfPrefillLogits * Float16Array.BYTES_PER_ELEMENT;
        let lastToken = 0;
        if (this.provider == "webnn") {
            this.fetches["logits"] = await createMlTensor(this.mlContext, "float16", prefillLogitsShape, false, true);
        } else if (this.provider == "webgpu") {
            this.fetches["logits"] = createGpuTensor(
                this.gpuDevice,
                "float16",
                prefillLogitsShape,
                prefillLogitsBufferSize,
            );
        }
        if (trace) {
            console.timeEnd("generate(): prefill prepare inputs");
            console.time("generate(): prefill session run()");
        }
        let outputs = await this.session1.run(this.feed, this.fetches);
        if (trace) {
            console.timeEnd("generate(): prefill session run()");
            console.time("generate(): prefill readBack");
        }
        this.prefillLogitsBuffer = new Float16Array(numElementsOfPrefillLogits);
        if (this.provider == "webnn") {
            await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.prefillLogitsBuffer);
        } else if (this.provider == "webgpu") {
            await readBackGpuTensor(
                this.gpuDevice,
                this.fetches["logits"].gpuBuffer,
                prefillLogitsBufferSize,
                this.prefillLogitsBuffer,
            );
        } else {
            this.prefillLogitsBuffer = outputs["logits"].cpuData;
        }
        if (trace) {
            console.timeEnd("generate(): prefill readBack");
            console.time("generate(): prefill gen token");
        }
        lastToken = this.argmax(this.prefillLogitsBuffer, inputIdsLen, this.vocabSize);

        // Clean up the logits tensor after prefill
        if (this.provider == "webnn") {
            this.fetches["logits"].mlTensor.destroy();
        } else if (this.provider == "webgpu") {
            this.fetches["logits"].gpuBuffer.destroy();
        }
        this.fetches["logits"] = undefined;

        this.startLength =
            this.provider == "webnn" || this.useTwoSessions ? inputIdsLen : this.startLength + inputIdsLen;
        this.outputTokens.push(lastToken);
        if (callback) {
            callback(this.outputTokens);
        }
        if (trace) {
            console.timeEnd("generate(): prefill gen token");
            console.time("generate(): decode first kv update");
        }
        this.updateKvCache(outputs);
        if (trace) {
            console.timeEnd("generate(): decode first kv update");
        }
        while (this.eos.indexOf(lastToken) == -1 && !this.stop && this.startLength < this.maxLength) {
            if (trace) {
                console.time("generate(): decode prepare inputs");
            }

            if (this.provider == "webnn" || this.useTwoSessions) {
                attnMask[this.startLength] = 1n;
            } else {
                attnMask.push(1n);
            }

            this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(lastToken)]), [1, 1]);
            if (this.hasPositionId) {
                this.feed["position_ids"] = new ort.Tensor(
                    "int64",
                    BigInt64Array.from([BigInt(this.startLength)]),
                    [1, 1],
                );
            }
            if (this.provider == "webnn") {
                this.mlContext.writeTensor(this.feed["attention_mask"].mlTensor, BigInt64Array.from(attnMask));
            } else {
                this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [
                    1,
                    attnMask.length,
                ]);
            }

            if (this.provider == "webnn") {
                // Pre-allocate logits ml-tensor once
                if (!this.fetches["logits"]) {
                    this.fetches["logits"] = await createMlTensor(
                        this.mlContext,
                        "float16",
                        [1, 1, this.vocabSize], // shape of logits in decode
                        false,
                        true,
                    );
                }
                if (trace) {
                    console.timeEnd("generate(): decode prepare inputs");
                    console.time("generate(): decode session run()");
                }
                outputs = await this.session2.run(this.feed, this.fetches);
                if (trace) {
                    console.timeEnd("generate(): decode session run()");
                    console.time("generate(): decode readBack");
                }
                await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.decodeLogitsBuffer);
            } else if (this.provider == "webgpu") {
                const decodeLogitsBufferSize = this.vocabSize * Float16Array.BYTES_PER_ELEMENT;
                if (!this.fetches["logits"]) {
                    // Pre-allocate logits gpu-buffer once
                    this.fetches["logits"] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        [1, 1, this.vocabSize],
                        decodeLogitsBufferSize,
                    );
                }
                if (trace) {
                    console.timeEnd("generate(): decode prepare inputs");
                    console.time("generate(): decode session run()");
                }
                if (this.useTwoSessions) {
                    outputs = await this.session2.run(this.feed, this.fetches);
                } else {
                    outputs = await this.session1.run(this.feed, this.fetches);
                }
                if (trace) {
                    console.timeEnd("generate(): decode session run()");
                    console.time("generate(): decode readBack");
                }
                await readBackGpuTensor(
                    this.gpuDevice,
                    this.fetches["logits"].gpuBuffer,
                    decodeLogitsBufferSize,
                    this.decodeLogitsBuffer,
                );
            } else {
                if (trace) {
                    console.timeEnd("generate(): decode prepare inputs");
                    console.time("generate(): decode session run()");
                }
                outputs = await this.session1.run(this.feed, this.fetches);
                if (trace) {
                    console.timeEnd("generate(): decode session run()");
                    console.time("generate(): decode readBack");
                }
                this.decodeLogitsBuffer = outputs["logits"].cpuData;
            }
            if (trace) {
                console.timeEnd("generate(): decode readBack");
                console.time("generate(): decode gen token");
            }
            lastToken = this.argmax(this.decodeLogitsBuffer, 1, this.vocabSize);

            this.outputTokens.push(lastToken);
            if (callback) {
                callback(this.outputTokens);
            }
            if (trace) {
                console.timeEnd("generate(): decode gen token");
                console.time("generate(): decode kv update");
            }
            this.updateKvCache(outputs);
            if (trace) {
                console.timeEnd("generate(): decode kv update");
            }
            this.startLength++;
        }

        // Clean up the logits tensor after decode
        if (this.provider == "webnn") {
            this.fetches["logits"].mlTensor.destroy();
        } else if (this.provider == "webgpu") {
            this.fetches["logits"].gpuBuffer.destroy();
        }

        if (this.provider == "webgpu" && profiler) {
            await this.session1.endProfiling();
            if (this.session2) {
                await this.session2.endProfiling();
            }
        }
        return this.outputTokens;
    }

    async dispose() {
        try {
            this.disposeTensors(this.feed);
            this.disposeTensors(this.fetches);
            if (this.inputIdsMlTensor) {
                this.inputIdsMlTensor.mlTensor.destroy();
            }
            if (this.attentionMaskMlTensor) {
                this.attentionMaskMlTensor.mlTensor.destroy();
            }
            if (this.positionIdsMlTensor) {
                this.positionIdsMlTensor.mlTensor.destroy();
            }
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
