/* eslint-disable no-undef */
import { $, isFloat16ArrayAvailable, convertToSnakeCase } from "../../assets/js/common_utils.js";
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

/**
 * normalize the buffer size so that it fits the 128-bits (16 bytes) alignment.
 */
const calcNormalizedBufferSize = size => Math.ceil(Number(size) / 16) * 16;

const downloadGpuData = async (device, gpuBuffer, originalSize, getTargetBuffer) => {
    const bufferSize = calcNormalizedBufferSize(originalSize);
    const gpuReadBuffer = device.createBuffer({
        size: bufferSize,
        usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });
    try {
        const commandEncoder = device.createCommandEncoder();

        commandEncoder.copyBufferToBuffer(
            gpuBuffer /* source buffer */,
            0 /* source offset */,
            gpuReadBuffer /* destination buffer */,
            0 /* destination offset */,
            bufferSize /* size */,
        );
        device.queue.submit([commandEncoder.finish()]);
        await gpuReadBuffer.mapAsync(GPUMapMode.READ);

        const arrayBuffer = gpuReadBuffer.getMappedRange();
        if (getTargetBuffer) {
            // if we already have a CPU buffer to accept the data, no need to clone the ArrayBuffer.
            const targetBuffer = getTargetBuffer();
            targetBuffer.set(new Uint8Array(arrayBuffer, 0, originalSize));
            return targetBuffer;
        } else {
            // the mapped ArrayBuffer will be released when the GPU buffer is destroyed. Need to clone the
            // ArrayBuffer.
            return new Uint8Array(arrayBuffer.slice(0, originalSize));
        }
    } finally {
        gpuReadBuffer.destroy();
    }
};

const createGpuTensor = (device, dataType, dims, bufferSize) => {
    const gpuBuffer = device.createBuffer({
        usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
        size: calcNormalizedBufferSize(bufferSize),
    });
    return ort.Tensor.fromGpuBuffer(gpuBuffer, { dataType, dims });
};

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
    dataType = "float16";
    deviceType = "gpu";
    maxLength = 2048;
    mlContext = undefined;
    startLen = 0;

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
        log(`WebNN EP config: ${model.name} · ${this.dataType} · ${this.provider} · ${this.deviceType}`);

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

        if (profiler) {
            sessionOptions.enableProfiling = true;
        }

        if (this.provider == "webnn") {
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
        if (this.provider == "webnn") {
            // Decode process
            sessionOptions.freeDimensionOverrides = {
                batch_size: 1,
                sequence_length: 1,
                total_sequence_length: this.maxLength,
                past_sequence_length: this.maxLength,
            };
            log("Create session for decode process");
            console.log("Create session 2 with option: ");
            console.log({ ...sessionOptions });
            this.session2 = await ort.InferenceSession.create(modelBytes, sessionOptions);
            log("Decode process session created");
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
            const kvDescriptor = { dataType: this.dataType, shape: this.kvDims };
            const ortKvDescriptor = { dataType: this.dataType, dims: this.kvDims };
            const inputMlTensor = await this.mlContext.createTensor(kvDescriptor);
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = ort.Tensor.fromMLTensor(inputMlTensor, ortKvDescriptor);
                this.feed[`past_key_values.${i}.value`] = ort.Tensor.fromMLTensor(inputMlTensor, ortKvDescriptor);
            }
        } else if (this.provider == "webgpu") {
            // Pre-allocate kv cache gpu-buffer
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const bufferSize = numElements * (this.dataType === "float16" ? 2 : 4);
            const device = ort.env.webgpu.device;
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = createGpuTensor(device, this.dataType, this.kvDims, bufferSize);
                this.feed[`past_key_values.${i}.value`] = createGpuTensor(
                    device,
                    this.dataType,
                    this.kvDims,
                    bufferSize,
                );

                this.fetches[`present.${i}.key`] = createGpuTensor(device, this.dataType, this.kvDims, bufferSize);
                this.fetches[`present.${i}.value`] = createGpuTensor(device, this.dataType, this.kvDims, bufferSize);
            }
        } else {
            // Initialize kv cache as empty tensors for WASM EP
            const numElements = this.kvDims.reduce((a, b) => a * b, 1);
            const emptyTensor =
                this.dataType === "float16" ? new Float16Array(numElements) : new Float32Array(numElements);
            for (let i = 0; i < this.numLayers; ++i) {
                this.feed[`past_key_values.${i}.key`] = new ort.Tensor(this.dataType, emptyTensor, this.kvDims);
                this.feed[`past_key_values.${i}.value`] = new ort.Tensor(this.dataType, emptyTensor, this.kvDims);
            }
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

    // Poor man's argmax
    argmax(t, sequenceLength = 1, vocabSize) {
        let arr = t.cpuData ? t.cpuData : t;
        if (t.type == "float16" && !isFloat16ArrayAvailable) {
            throw new Error("Float16Array is not available on this browser, try to use newer version");
        }

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
    async generate(inputIds, callback, profiler = false) {
        this.outputTokens = [];
        const inputIdsLen = inputIds.length;
        const attnMaskLen = this.provider == "webnn" ? inputIdsLen : this.startLen + inputIdsLen;
        let attnMask = Array.from({ length: attnMaskLen }, () => BigInt(1));
        let positionIds = Array.from({ length: inputIdsLen }, (_, i) =>
            BigInt(this.provider == "webnn" ? i++ : this.startLen + i++),
        );
        // Both input_ids and position_ids have shapes of [batch_size, sequence_length].
        // The sequence_length is the length of inputIds, which is dynamic.
        // Since WebNN does not support dynamic shapes, fix the sequence_length to maxLength and
        // pad the rest elements with 0 value.
        // TODO: This may cause an overflow error if maxLength is excessively large,
        // as it could exceed the allowable array size or memory limits.
        // e.g. QWen2.0 supports max_length: 32768, in a matmul of the GQA decomposed op,
        // its input shapes will be [1, 14, 32768, 64] x [1, 14, 64, 32768] = [1, 14, 32768, 32768]
        // which exceeds the 2GB tensor size limitation.
        if (this.provider == "webnn") {
            // TODO, investigate if using lesser maxLength is better for inputIds
            inputIds = this.paddingInput(inputIds, this.maxLength);
            positionIds = this.paddingInput(positionIds, this.maxLength);
            attnMask = this.paddingInput(attnMask, this.maxLength);
        }

        this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from(inputIds), [1, inputIds.length]);
        this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMask.length]);
        this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from(positionIds), [1, positionIds.length]);
        this.stop = false;

        let lastToken = 0;
        const device = ort.env.webgpu.device;
        if (this.provider == "webgpu") {
            const numElements = this.vocabSize * inputIdsLen;
            const bufferSize = numElements * (this.dataType === "float16" ? 2 : 4);
            this.fetches["logits"] = createGpuTensor(
                device,
                this.dataType,
                [1, inputIdsLen, this.vocabSize],
                bufferSize,
            );
        }
        let outputs = await this.session1.run(this.feed, this.fetches);
        let logitsBuffer = await downloadGpuData(
            device,
            this.fetches["logits"].gpuBuffer,
            this.vocabSize * inputIdsLen * 2,
        );
        lastToken = this.argmax(new Float16Array(logitsBuffer.buffer), inputIdsLen, this.vocabSize);
        this.fetches["logits"].gpuBuffer.destroy();
        this.startLen = this.provider == "webnn" ? inputIdsLen : this.startLen + inputIdsLen;
        this.outputTokens.push(lastToken);
        if (callback) {
            callback(this.outputTokens);
        }

        this.updateKvCache(outputs);
        while (
            this.eos.indexOf(lastToken) == -1 &&
            !this.stop &&
            this.outputTokens.length <= this.maxLength - inputIdsLen &&
            this.outputTokens.length <= this.startLen
        ) {
            this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(lastToken)]), [1, 1]);

            if (this.provider == "webnn") {
                attnMask[this.startLen] = 1n;
            } else {
                attnMask.push(1n);
            }
            this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attnMask), [1, attnMask.length]);
            this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(this.startLen)]), [1, 1]);
            if (this.provider == "webnn") {
                outputs = await this.session2.run(this.feed, this.fetches);
            } else {
                if (this.provider == "webgpu") {
                    const numElements = this.vocabSize;
                    const bufferSize = numElements * (this.dataType === "float16" ? 2 : 4);
                    this.fetches["logits"] = createGpuTensor(device, this.dataType, [1, 1, this.vocabSize], bufferSize);
                }
                console.time("Decode time");
                outputs = await this.session1.run(this.feed, this.fetches);
                console.timeEnd("Decode time");
            }
            logitsBuffer = await downloadGpuData(device, this.fetches["logits"].gpuBuffer, this.vocabSize * 2);
            lastToken = this.argmax(new Float16Array(logitsBuffer.buffer), 1, this.vocabSize);
            this.fetches["logits"].gpuBuffer.destroy();
            logitsBuffer;
            this.outputTokens.push(lastToken);
            if (callback) {
                callback(this.outputTokens);
            }
            this.updateKvCache(outputs);
            this.startLen++;
        }
        if (this.provider == "webgpu" && profiler) {
            await this.session1.endProfiling();
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
        this.startLen = 0;
    }
}
