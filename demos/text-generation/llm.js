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

// Resolve the external-data file name(s) for a model. Large exports split the weights into
// model.onnx.data.0, model.onnx.data.1, ...; smaller ones use a single model.onnx.data. Each
// entry's `path` must equal the location string baked into the .onnx graph, so we return the real
// file names verbatim. Detection prefers the OPFS cache (so a previously-downloaded model still
// loads offline) and falls back to a 1-byte ranged GET (more portable than HEAD across CDNs).
async function resolveExternalDataFiles(modelName, modelFile, path) {
    const opfs = await navigator.storage.getDirectory();
    const exists = async fileName => {
        try {
            await opfs.getFileHandle(`${modelName}_${fileName}`);
            return true; // already cached in OPFS
        } catch {
            /* not cached; probe the network */
        }
        try {
            const res = await fetch(path + fileName, { headers: { Range: "bytes=0-0" } });
            return res.ok; // 200 or 206
        } catch {
            return false;
        }
    };

    const single = `${modelFile}.data`;
    if (await exists(single)) return [single];

    const files = [];
    for (let i = 0; await exists(`${modelFile}.data.${i}`); i++) {
        files.push(`${modelFile}.data.${i}`);
    }
    // Neither the single file nor any shard was found: fall back to the single name so the
    // subsequent getModelOPFS() surfaces a real fetch error instead of silently loading nothing.
    return files.length ? files : [single];
}

// Class to handle a large language model on top of onnxruntime-web
export class LLM {
    provider = "webnn";
    session = undefined;
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
    _generating = null; // Promise that resolves when current generate() finishes

    constructor(maxLength) {
        this.maxLength = maxLength;
        // Pre-allocated, reused input buffers for the WebNN decode path. Keeping the
        // attention_mask at a fixed [1, maxLength] shape on every run lets Chromium's WebNN
        // backend reuse its shape inference / compiled graph instead of re-running it whenever
        // the sequence length grows. See _doGenerate() for how they are filled.
        this.attentionMaskData = new BigInt64Array(maxLength);
        this.inputIdsData = new BigInt64Array(1);
    }

    async load(model, options, flag = true) {
        this.provider = options.provider;
        this.deviceType = options.deviceType;
        const verbose = options.verbose;
        this.eos = model.eos_token_id; // End of sentence token ids
        this.numLayers = model.num_layers;
        this.kvNumHeads = model.kv_num_heads;
        this.headSize = model.head_size;
        this.enableCausalLM = !!options.enable_causallm;
        this.kvDims = this.enableCausalLM
            ? [1, model.kv_num_heads, 1, model.head_size]
            : [1, model.kv_num_heads, this.maxLength, model.head_size];
        this.vocabSize = model.vocab_size;
        this.hasPositionIds = !!model.has_position_ids;
        // Qwen3.5-style hybrid model: consumes inputs_embeds, uses mRoPE, and mixes
        // full-attention layers (key/value KV cache) with linear-attention layers
        // (fixed-size conv_state + recurrent_state). See isFullAttn().
        this.usesInputsEmbeds = !!model.uses_inputs_embeds;
        this.hiddenSize = model.hidden_size;
        this.mrope = !!model.mrope;
        this.fullAttnInterval = model.full_attention_interval || 0;
        this.convStateDims = model.conv_state_dim ? [1, model.conv_state_dim, model.conv_state_len] : null;
        this.recurStateDims = model.recurrent_state_dims ? [1, ...model.recurrent_state_dims] : null;
        // WebNN LinearAttention has no loop support (only the seqLen=1 recurrent form), so prefill is
        // fed one token at a time and the decoder is compiled with sequence_length fixed to 1.
        this.tokenByTokenPrefill = !!model.token_by_token_prefill;
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
        const externalFiles = await resolveExternalDataFiles(modelName, modelFile, path);

        let modelSize = modelBytes.size;
        const externalData = [];
        for (const externalFile of externalFiles) {
            const externalDataBytes = await WebNNPerf.time(
                "webnn.model.fetch",
                () => getModelOPFS(`${modelName}_${externalFile}`, path + externalFile, false),
                { model: `${modelName}-data` },
            );
            modelSize += externalDataBytes.size;
            externalData.push({ data: externalDataBytes, path: externalFile });
        }

        // ORT InferenceSession.create only accepts string | Uint8Array | ArrayBuffer,
        // not File / Blob. Convert the OPFS File so it doesn't hit the "must be 'path'
        // or 'buffer'" error. externalData[].data as Blob is handled internally by
        // ORT's loadFile(); only the primary model argument needs conversion here.
        const modelArrayBuffer = await modelBytes.arrayBuffer();

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
                    enableCausalLM: this.enableCausalLM,
                    freeDimensionBounds: {
                        sequence_length: { maxSize: this.maxLength },
                        ...(this.enableCausalLM && { past_sequence_length: { maxSize: this.maxLength } }),
                        total_sequence_length: { maxSize: this.maxLength },
                    },
                },
            ],
            externalData: externalData,
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
            sessionOptions.freeDimensionOverrides = this.enableCausalLM
                ? { batch_size: 1 }
                : { batch_size: 1, past_sequence_length: this.maxLength };
            // Fix the query length to 1 so LinearAttention compiles to its loop-free single-step
            // kernel (the WebNN EP can't emit the chunked-parallel loop). Prefill feeds one token
            // per run to match. See _doGenerate() / _feedToken().
            if (modelName.includes("qwen3") || modelName.includes("phi_4")) {
                sessionOptions.freeDimensionOverrides.kv_cache_dim = 128;
            }
            if (this.tokenByTokenPrefill) {
                // sessionOptions.freeDimensionOverrides.sequence_length = 1;
            }
        }

        let progressBarLabel = $("#p-bar-label");
        log("Create session for prefill process");
        console.log("Create session with option: ");
        console.log({ ...sessionOptions });
        this.session = await WebNNPerf.time(
            "webnn.session.create",
            () => ort.InferenceSession.create(modelArrayBuffer, sessionOptions),
            { model: `${modelName}-prefill` },
        );
        updateOnnxCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Prefill session created · ${loadProgress.toFixed(2)}%`;

        log("Session created");

        // Models that consume inputs_embeds (e.g. Qwen3.5) need a separate embedding model to
        // turn token IDs into embeddings. Run it on the SAME EP as the decoder (sharing the WebNN
        // context / WebGPU device) so its fp16 output tensor is bound straight into the decoder
        // feed with no per-token CPU round-trip. The output is written into pre-allocated tensors
        // (see initialize()/embed()) via IO binding rather than reallocated on every run.
        if (this.usesInputsEmbeds) {
            const embedFile = model.embed_file_name;
            const embedBytes = await getModelOPFS(`${modelName}_${embedFile}`, path + embedFile, false);
            const embedExternalFile = model.embed_external_data;
            const embedExternalBytes = await getModelOPFS(
                `${modelName}_${embedExternalFile}`,
                path + embedExternalFile,
                false,
            );
            log(`embed model size: ${Math.round((embedBytes.size + embedExternalBytes.size) / 1024 / 1024)} MB`);
            const embedArrayBuffer = await embedBytes.arrayBuffer();
            this.embedSession = await ort.InferenceSession.create(embedArrayBuffer, {
                executionProviders: [
                    this.provider == "webnn"
                        ? { name: "webnn", deviceType: this.deviceType, context: this.mlContext }
                        : { name: this.provider },
                ],
                externalData: [{ data: embedExternalBytes, path: embedExternalFile }],
                logSeverityLevel: verbose ? 0 : 3,
            });
            log("Embed session created");
        }

        if (this.provider == "webgpu") {
            this.gpuDevice = ort.env.webgpu.device;
        }

        // Pre-allocate the decode-step embed output tensor once. It is [1, 1, hidden] (one token
        // per decode step) and is reused for every generated token and across questions via IO
        // binding, so the embedding output is never reallocated in the hot loop. The variable-
        // length prefill output is (re)allocated per turn in embed().
        if (this.usesInputsEmbeds) {
            if (this.provider == "webgpu") {
                this.embedOutputDecode = createGpuTensor(
                    this.gpuDevice,
                    "float16",
                    [1, 1, this.hiddenSize],
                    this.hiddenSize * Float16Array.BYTES_PER_ELEMENT,
                );
            } else if (this.provider == "webnn") {
                this.embedOutputDecode = await createMlTensor(
                    this.mlContext,
                    "float16",
                    [1, 1, this.hiddenSize],
                    false,
                    false,
                );
            }
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

    // Layer i uses full attention (key/value KV cache) when fullAttnInterval is set and
    // (i + 1) is a multiple of it; otherwise it is a linear-attention layer carrying a
    // fixed-size conv_state + recurrent_state. Non-hybrid models (fullAttnInterval === 0)
    // treat every layer as full attention, preserving the original uniform-KV behavior.
    isFullAttn(i) {
        if (!this.fullAttnInterval) return true;
        return (i + 1) % this.fullAttnInterval === 0;
    }

    // Run the embedding model to convert token IDs (BigInt64Array) into inputs_embeds. Returns the
    // fp16 ort.Tensor [1, len, hidden] on the decoder's EP, ready to bind straight into the decoder
    // feed. The output is written into a pre-allocated tensor via IO binding: the [1, 1, hidden]
    // decode tensor is reused for every token, while the variable-length prefill tensor is
    // (re)allocated per turn.
    async embed(tokenIds, len) {
        const feeds = { input_ids: new ort.Tensor("int64", tokenIds, [1, len]) };

        if (len === 1 && this.embedOutputDecode) {
            // Decode hot path: reuse the pre-allocated [1, 1, hidden] output tensor.
            await this.embedSession.run(feeds, { inputs_embeds: this.embedOutputDecode });
            return this.embedOutputDecode;
        }

        // Prefill (variable prompt length): (re)allocate the output tensor sized to this turn.
        if (this.embedOutputPrefill) {
            this.disposeTensors({ inputs_embeds: this.embedOutputPrefill });
            this.embedOutputPrefill = undefined;
        }
        const dims = [1, len, this.hiddenSize];
        if (this.provider == "webgpu") {
            this.embedOutputPrefill = createGpuTensor(
                this.gpuDevice,
                "float16",
                dims,
                len * this.hiddenSize * Float16Array.BYTES_PER_ELEMENT,
            );
        } else if (this.provider == "webnn") {
            this.embedOutputPrefill = await createMlTensor(this.mlContext, "float16", dims, false, false);
        }
        if (this.embedOutputPrefill) {
            await this.embedSession.run(feeds, { inputs_embeds: this.embedOutputPrefill });
            return this.embedOutputPrefill;
        }

        // WASM/CPU: no on-device binding; let ORT allocate the (fp16) output tensor.
        const out = await this.embedSession.run(feeds);
        return out.inputs_embeds;
    }

    // Initialize key value caches
    async initialize() {
        // If a previous generate() is still in-flight (e.g. user pressed Ctrl+Enter
        // during generation), abort it and wait for session.run() to complete.
        // Without this, the next dispatch() would fail with "Invalid input tensor state"
        // because MLTensors are still in "dispatched" state from the previous run.
        if (this._generating) {
            this.stop = true;
            try {
                await this._generating;
            } catch (e) {
                /* ignore */
            }
        }

        if (this.provider == "webnn") {
            // TODO(enableCausalLM): When enableCausalLM is true, the KV cache is managed
            // internally by the underlying OV backend. Currently there is no WebNN API to
            // reset the internal KV cache state, so starting a new conversation (Ctrl+Enter)
            // may carry over stale context. A future WebNN API (e.g. MLContext.resetState())
            // is needed to properly clear the backend-managed KV cache.
            if (this.feed[`past_key_values.0.key`] || this.feed[`past_key_values.0.conv_state`]) {
                // Tensors already created — nothing to do on reinitialize for WebNN.
                // The ORT IO binding cache holds references to these tensor objects;
                // destroying or recreating them causes "Invalid input tensor state".
                return;
            }
            // First time: create all tensors
            this.feed = {};
            this.fetches = {};
            for (let i = 0; i < this.numLayers; ++i) {
                if (this.isFullAttn(i)) {
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

                    if (!this.enableCausalLM) {
                        // Stateless: pre-allocate present KV at full size for swap
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
                } else {
                    // Linear-attention layer: fixed-size conv_state + recurrent_state. Always
                    // pre-allocate both past and present and swap them each step, regardless of
                    // stateless/stateful mode (these are recurrent states, not a growing KV cache).
                    this.feed[`past_key_values.${i}.conv_state`] = await createMlTensor(
                        this.mlContext,
                        "float16",
                        this.convStateDims,
                        false,
                        false,
                    );
                    this.feed[`past_key_values.${i}.recurrent_state`] = await createMlTensor(
                        this.mlContext,
                        "float16",
                        this.recurStateDims,
                        false,
                        false,
                    );
                    this.fetches[`present.${i}.conv_state`] = await createMlTensor(
                        this.mlContext,
                        "float16",
                        this.convStateDims,
                        false,
                        false,
                    );
                    this.fetches[`present.${i}.recurrent_state`] = await createMlTensor(
                        this.mlContext,
                        "float16",
                        this.recurStateDims,
                        false,
                        false,
                    );
                }
            }
            // Stateful (enableCausalLM): no present KV pre-allocation
            this.fetches["logits"] = await createMlTensor(
                this.mlContext,
                "float16",
                [1, 1, this.vocabSize],
                false,
                true,
            );
            // Pre-allocated, reused decode input tensors. Mirrors the logits MLTensor above, but
            // writable instead of readable. Reusing the same tensors every decode step keeps the
            // input shapes constant (so the WebNN backend can skip re-running shape inference) and
            // avoids re-uploading through ORT's CPU->MLTensor path each token. input_ids is [1, 1]
            // (one token per step); attention_mask is a fixed [1, maxLength] right-padded mask.
            this.feedInputIds = await createMlTensor(this.mlContext, "int64", [1, 1], true, false);
            this.feedAttentionMask = await createMlTensor(this.mlContext, "int64", [1, this.maxLength], true, false);
        } else if (this.provider == "webgpu") {
            // For WebGPU: destroy old tensors and recreate (WebGPU doesn't have the same
            // IO binding cache issue as WebNN). inputs_embeds points at a pre-allocated embed
            // tensor owned by the embed subsystem (embedOutputDecode / embedOutputPrefill), so drop
            // the reference before disposing the feed to avoid freeing a tensor we keep reusing.
            delete this.feed["inputs_embeds"];
            this.disposeTensors(this.feed);
            this.disposeTensors(this.fetches);
            this.feed = {};
            this.fetches = {};
            // Pre-allocate kv cache gpu-buffer
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const bufferSize = numElements * Float16Array.BYTES_PER_ELEMENT;
            const convBufferSize = this.convStateDims
                ? this.convStateDims.reduce((a, b) => a * b, 1) * Float16Array.BYTES_PER_ELEMENT
                : 0;
            const recurBufferSize = this.recurStateDims
                ? this.recurStateDims.reduce((a, b) => a * b, 1) * Float16Array.BYTES_PER_ELEMENT
                : 0;
            for (let i = 0; i < this.numLayers; ++i) {
                if (this.isFullAttn(i)) {
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
                } else {
                    // Linear-attention layer: fixed-size conv_state + recurrent_state. Use separate
                    // present buffers and swap them each step (safer than aliasing for the recurrent
                    // update, since the op reads the full past state while writing the present).
                    this.feed[`past_key_values.${i}.conv_state`] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        this.convStateDims,
                        convBufferSize,
                    );
                    this.feed[`past_key_values.${i}.recurrent_state`] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        this.recurStateDims,
                        recurBufferSize,
                    );
                    this.fetches[`present.${i}.conv_state`] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        this.convStateDims,
                        convBufferSize,
                    );
                    this.fetches[`present.${i}.recurrent_state`] = createGpuTensor(
                        this.gpuDevice,
                        "float16",
                        this.recurStateDims,
                        recurBufferSize,
                    );
                }
            }
            this.fetches["logits"] = createGpuTensor(
                this.gpuDevice,
                "float16",
                [1, 1, this.vocabSize],
                this.vocabSize * Float16Array.BYTES_PER_ELEMENT,
            );
        } else {
            // WASM EP: just recreate with zeroed tensors (no IO binding cache issue)
            this.feed = {};
            this.fetches = {};
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const emptyTensor = new Float16Array(numElements);
            for (let i = 0; i < this.numLayers; ++i) {
                if (this.isFullAttn(i)) {
                    this.feed[`past_key_values.${i}.key`] = new ort.Tensor("float16", emptyTensor, this.kvDims);
                    this.feed[`past_key_values.${i}.value`] = new ort.Tensor("float16", emptyTensor, this.kvDims);
                } else {
                    // Linear-attention layer: fixed-size conv_state + recurrent_state (zeroed).
                    const convElems = this.convStateDims.reduce((a, b) => a * b, 1);
                    const recurElems = this.recurStateDims.reduce((a, b) => a * b, 1);
                    this.feed[`past_key_values.${i}.conv_state`] = new ort.Tensor(
                        "float16",
                        new Float16Array(convElems),
                        this.convStateDims,
                    );
                    this.feed[`past_key_values.${i}.recurrent_state`] = new ort.Tensor(
                        "float16",
                        new Float16Array(recurElems),
                        this.recurStateDims,
                    );
                }
            }
            this.fetches["logits"] = new ort.Tensor("float16", new Float16Array(this.vocabSize), [
                1,
                1,
                this.vocabSize,
            ]);
        }
    }

    // Update key value cache. Maps every `present.*` output back to its `past_key_values.*`
    // input by prefix and swaps the tensors, so this also carries the linear-attention
    // conv_state/recurrent_state (e.g. present.0.conv_state -> past_key_values.0.conv_state)
    // in addition to the full-attention key/value.
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
        // Track this generation so initialize() can wait for it to complete
        let resolveGenerating;
        this._generating = new Promise(r => {
            resolveGenerating = r;
        });

        try {
            return await this._doGenerate(inputIds, callback);
        } finally {
            resolveGenerating();
            this._generating = null;
        }
    }

    // Build this.feed for a single `token` at the current position this.startLength (seqLen=1).
    // Shared by token-by-token prefill and the decode loop — the only difference between them is
    // the token source (prompt token vs sampled token).
    async _feedToken(token) {
        if (this.provider == "webnn") {
            // Reuse the fixed [1, maxLength] attention_mask MLTensor: flip the new position on and
            // re-upload. Keeping the shape constant lets the WebNN backend keep its shape inference.
            this.attentionMaskData[this.startLength] = 1n;
            this.mlContext.writeTensor(this.feedAttentionMask.mlTensor, this.attentionMaskData);
            this.feed["attention_mask"] = this.feedAttentionMask;
            if (this.usesInputsEmbeds) {
                this.feed["inputs_embeds"] = await this.embed(BigInt64Array.from([BigInt(token)]), 1);
            } else {
                this.inputIdsData[0] = BigInt(token);
                this.mlContext.writeTensor(this.feedInputIds.mlTensor, this.inputIdsData);
                this.feed["input_ids"] = this.feedInputIds;
            }
        } else {
            if (this.usesInputsEmbeds) {
                this.feed["inputs_embeds"] = await this.embed(BigInt64Array.from([BigInt(token)]), 1);
            } else {
                this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(token)]), [1, 1]);
            }
            // attention_mask covers the whole context so far: ones over [0, startLength] inclusive.
            const mask = new BigInt64Array(this.startLength + 1).fill(1n);
            this.feed["attention_mask"] = new ort.Tensor("int64", mask, [1, this.startLength + 1]);
        }
        if (this.hasPositionIds) {
            const p = BigInt(this.startLength);
            this.feed["position_ids"] = this.mrope
                ? new ort.Tensor("int64", BigInt64Array.from([p, p, p]), [3, 1, 1]) // mRoPE: [3, 1, 1]
                : new ort.Tensor("int64", BigInt64Array.from([p]), [1, 1]);
        }
    }

    // Run one seqLen=1 step: session.run + read logits into this.logitsBuffer, accumulating the
    // decode timing metrics. Returns the outputs object whose present.* keys updateKvCache() swaps.
    async _runStep() {
        const startRun = performance.now();
        let outputs;
        if (this.provider == "webnn") {
            await this.session.run(this.feed, this.fetches);
            this.sessionRunTimeSum += performance.now() - startRun;
            const readStart = performance.now();
            await readBackMLTensor(this.mlContext, this.fetches["logits"].mlTensor, this.logitsBuffer);
            this.inferenceTimeSum += performance.now() - readStart;
            this.inferenceTokenCount++;
            outputs = this.fetches; // pre-bound outputs; updateKvCache only needs the present.* keys
        } else if (this.provider == "webgpu") {
            if (!this.fetches["logits"]) {
                this.fetches["logits"] = createGpuTensor(
                    this.gpuDevice,
                    "float16",
                    [1, 1, this.vocabSize],
                    this.vocabSize * Float16Array.BYTES_PER_ELEMENT,
                );
            }
            outputs = await this.session.run(this.feed, this.fetches);
            this.sessionRunTimeSum += performance.now() - startRun;
            const readStart = performance.now();
            await readBackGpuTensor(
                this.gpuDevice,
                this.fetches["logits"].gpuBuffer,
                this.vocabSize * Float16Array.BYTES_PER_ELEMENT,
                this.logitsBuffer,
            );
            this.inferenceTimeSum += performance.now() - readStart;
            this.inferenceTokenCount++;
        } else {
            outputs = await this.session.run(this.feed, this.fetches);
            this.inferenceTimeSum += performance.now() - startRun;
            this.inferenceTokenCount++;
            this.logitsBuffer = outputs["logits"].cpuData;
        }
        return outputs;
    }

    async _doGenerate(inputIds, callback) {
        this.outputTokens = [];
        this.inferenceTimeSum = 0; // Total inference time for decode tokens (ms)
        this.sessionRunTimeSum = 0; // Total session.run() time for decode tokens (ms)
        this.inferenceTokenCount = 0; // Number of decode tokens timed
        const inputIdsLen = inputIds.length;
        const attnMaskLen = this.startLength + inputIdsLen;

        // Guard: total sequence length must not exceed maxLength
        if (attnMaskLen > this.maxLength) {
            throw new Error(
                `Total sequence length (${attnMaskLen}) exceeds maxLength (${this.maxLength}). ` +
                    `startLength=${this.startLength}, inputIdsLen=${inputIdsLen}. Use Ctrl+Enter to start a new conversation.`,
            );
        }

        this.stop = false;
        let lastToken = 0;
        let thinkingDone = false;
        const hasThinkBudget = this.endThinkTokenId > 0 && this.maxThinkTokens > 0;

        if (this.tokenByTokenPrefill) {
            // WebNN LinearAttention only supports the loop-free seqLen=1 form, so feed the prompt one
            // token at a time (each run is a recurrent step, identical to decode). State threads
            // forward via updateKvCache(); the last prompt token's logits predict the first token.
            if (this.provider == "webnn") {
                // Seed the fixed decode mask: ones over the already-cached context [0, startLength),
                // zeros after; _feedToken() flips on each new position as it is fed.
                this.attentionMaskData.fill(1n, 0, this.startLength);
                this.attentionMaskData.fill(0n, this.startLength);
            }
            for (let i = 0; i < inputIdsLen; i++) {
                await this._feedToken(Number(inputIds[i]));
                const outputs = await this._runStep();
                this.updateKvCache(outputs);
                this.startLength++;
            }
            this.applyRepetitionPenalty(this.logitsBuffer, this.vocabSize, this.outputTokens, this.repetitionPenalty);
            lastToken = this.selectToken(this.logitsBuffer, this.vocabSize);
        } else {
            // Standard multi-token prefill: feed the whole prompt in a single run.
            if (this.usesInputsEmbeds) {
                this.feed["inputs_embeds"] = await this.embed(BigInt64Array.from(inputIds), inputIdsLen);
            } else {
                this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from(inputIds), [1, inputIdsLen]);
            }
            // attention_mask: ones over [0, attnMaskLen) (cached context + new tokens). The exported
            // model reduces it to a sum (total_sequence_length), preserving context across turns.
            const attnMask = Array.from({ length: attnMaskLen }, () => 1n);
            this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMaskLen]);
            if (this.provider == "webnn") {
                // Seed the fixed [1, maxLength] decode mask for the decode loop below.
                this.attentionMaskData.fill(1n, 0, attnMaskLen);
                this.attentionMaskData.fill(0n, attnMaskLen);
            }
            if (this.hasPositionIds) {
                const positionIds = Array.from({ length: inputIdsLen }, (_, i) => BigInt(this.startLength + i));
                if (this.mrope) {
                    this.feed["position_ids"] = new ort.Tensor(
                        "int64",
                        BigInt64Array.from([...positionIds, ...positionIds, ...positionIds]),
                        [3, 1, inputIdsLen],
                    );
                } else {
                    this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from(positionIds), [
                        1,
                        inputIdsLen,
                    ]);
                }
            }
            const outputs = await this.session.run(this.feed, this.fetches);
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
            this.startLength = this.startLength + inputIdsLen;
            this.updateKvCache(outputs);
        }

        this.outputTokens.push(lastToken);
        if (lastToken === this.endThinkTokenId) thinkingDone = true;
        if (callback) {
            callback(this.outputTokens);
        }

        // The metrics below cover decode tokens only; discard anything counted during token-by-token prefill.
        this.inferenceTimeSum = 0;
        this.sessionRunTimeSum = 0;
        this.inferenceTokenCount = 0;
        // Decode loop: one token per step (seqLen=1) — the same per-token operation as
        // token-by-token prefill, differing only in that the token comes from sampling.
        while (this.eos.indexOf(lastToken) == -1 && !this.stop && this.startLength < this.maxLength) {
            await this._feedToken(lastToken);
            const outputs = await this._runStep();
            this.applyRepetitionPenalty(this.logitsBuffer, this.vocabSize, this.outputTokens, this.repetitionPenalty);
            lastToken = this.selectToken(this.logitsBuffer, this.vocabSize);
            // Thinking budget: if the model hasn't emitted </think> within budget, force it.
            if (hasThinkBudget && !thinkingDone && this.outputTokens.length >= this.maxThinkTokens) {
                console.warn(
                    `[LLM] Thinking budget (${this.maxThinkTokens}) exceeded, forcing </think> token ${this.endThinkTokenId}`,
                );
                lastToken = this.endThinkTokenId;
                thinkingDone = true;
            }
            if (lastToken === this.endThinkTokenId) thinkingDone = true;
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
            // The decode-stage input MLTensors (feedInputIds / feedAttentionMask) are bound into
            // this.feed during generation, so disposeTensors() frees them along with the KV cache.
            // mlContext.destroy() below is the backstop if decode never ran and they were never bound.
            // inputs_embeds aliases a pre-allocated embed tensor freed separately below, so drop it first.
            delete this.feed["inputs_embeds"];
            this.disposeTensors(this.feed);
            this.disposeTensors(this.fetches);
            if (this.embedOutputDecode) this.disposeTensors({ inputs_embeds: this.embedOutputDecode });
            if (this.embedOutputPrefill) this.disposeTensors({ inputs_embeds: this.embedOutputPrefill });
            this.embedOutputDecode = undefined;
            this.embedOutputPrefill = undefined;

            this.feed = {};
            this.fetches = {};
            await this.session.release();
            this.session = undefined;
            if (this.embedSession) {
                await this.embedSession.release();
                this.embedSession = undefined;
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
        this.embedOutputDecode = undefined;
        this.embedOutputPrefill = undefined;
    }
}
