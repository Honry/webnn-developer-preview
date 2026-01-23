/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
// An example how to run sdxl-turbo with webnn in onnxruntime-web.
//

import { AutoTokenizer, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers/dist/transformers.js";

env.localModelPath = "models/";
env.allowRemoteModels = true;
env.allowLocalModels = true;
env.useBrowserCache = false;

import {
    $,
    $$,
    log,
    logError,
    setupORT,
    showCompatibleChromiumVersion,
    getHuggingFaceDomain,
    createMlTensor,
    createGpuTensor,
    readBackMLTensor,
    readBackGpuTensor,
} from "../../assets/js/common_utils.js";

let device = "gpu";
let mlContext;
let gpuDevice;
let badge;
let memoryReleaseSwitch;
const dom = {};
const modelDOMPrefixes = {
    text_encoder: "textEncoder",
    transformer: "transformer",
    vae_decoder: "vae",
    safety_checker: "sc",
};
let generate = null;
let load = null;
let buttons = null;
let loadwave = null;
let loadwaveData = null;
let loading;
let webnnStatus;

const config = getConfig();
const dataType = "float32";
const opt = {
    logSeverityLevel: config.verbose ? 0 : 3, // 0: verbose, 1: info, 2: warning, 3: error
};

// Always use local/relative paths for tokenizers, as they are small enough to be hosted on GitHub Pages
const tokenizer = await AutoTokenizer.from_pretrained("tokenizer");

const batchSize = config.images;
const imageHeight = 512;
const imageWidth = 512;
const models = {
    text_encoder: {
        name: "Text Encoder",
        url: `z_image_turbo_onnx/text_encoder/${config.useQdq ? "qdq" : ""}q4f16/model.onnx`,
        size: "118MB",
        // input: NodeArg(name='input_ids', type='tensor(int64)', shape=['batch_size', 'sequence_length'])
        // input: NodeArg(name='attention_mask', type='tensor(int64)', shape=['batch_size', 'sequence_length'])
        // input: NodeArg(name='position_ids', type='tensor(int64)', shape=['batch_size', 'sequence_length'])
        // output: NodeArg(name='logits', type='tensor(float)', shape=['batch_size', 'sequence_length', 151936])
        // output: NodeArg(name='/model/layers.34/Add_1_output_0', type='tensor(float)', shape=['batch_size', 'sequence_length', 2560])
        opt: {
            freeDimensionOverrides: {
                batch_size: batchSize,
                sequence_length: 512,
            },
        },
        inputInfo: {
            // input_ids: { dataType: "int64", dims: [batchSize, 512], writable: true },
            // attention_mask: { dataType: "int64", dims: [batchSize, 512], writable: true },
            // position_ids: { dataType: "int64", dims: [batchSize, 512], writable: true },
        },
        outputInfo: {
            // TODO: logits is not used, can be removed from model, and prune the last attention layer
            logits: { dataType: dataType, dims: [batchSize, 512, 151936] },
            // "/model/layers.34/Add_1_output_0": { dataType: dataType, dims: [batchSize, 512, 2560] },
        },
    },
    transformer: {
        name: "Transformer",
        url: `z_image_turbo_onnx/transformer/${config.useQdq ? "qdq-" : ""}q4f16/model.onnx`,
        size: "1.83GB",
        // input: NodeArg(name='hidden_states', type='tensor(float)', shape=['batch_size', 16, 'num_frames', 'height', 'width'])
        // input: NodeArg(name='timestep', type='tensor(float)', shape=['batch_size'])
        // input: NodeArg(name='encoder_hidden_states', type='tensor(float)', shape=['batch_size', 'seq_len', 2560])
        // output: NodeArg(name='unified_results', type='tensor(float)', shape=[16, 'num_frames', 'height', 'width'])
        opt: {
            freeDimensionOverrides: {
                batch_size: batchSize,
                num_frames: 1,
                height: imageHeight / 8,
                width: imageWidth / 8,
                seq_len: 512,
            },
        },
        inputInfo: {
            hidden_states: { dataType: dataType, dims: [batchSize, 16, 1, imageHeight / 8, imageWidth / 8] },
            timestep: { dataType: dataType, dims: [batchSize], writable: true },
            // encoder_hidden_states: { dataType: dataType, dims: [batchSize, 512, 2560] },
        },
        outputInfo: {
            unified_results: { dataType: dataType, dims: [16, 1, imageHeight / 8, imageWidth / 8] },
        },
    },
    vae_decoder: {
        name: "VAE Decoder",
        url: `z_image_turbo_onnx/vae_decoder/model.onnx`,
        size: "93MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: batchSize,
                latent_height: imageHeight / 8,
                latent_width: imageWidth / 8,
            },
        },
        inputInfo: {
            latent_sample: { dataType: dataType, dims: [batchSize, 16, imageHeight / 8, imageWidth / 8] },
        },
        outputInfo: {
            sample: { dataType: dataType, dims: [batchSize, 3, imageHeight, imageWidth], readable: true },
        },
    },
    sc_prep: {
        name: "Safety Checker Pre-processing Model",
        url: "sc_prep_model_f16.onnx",
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 3,
                height: imageHeight,
                width: imageWidth,
            },
        },
        inputInfo: {
            sample: { dataType: dataType, dims: [batchSize, 3, imageHeight, imageWidth] },
        },
        outputInfo: {
            clip_input: { dataType: dataType, dims: [batchSize, 3, 224, 224] },
        },
    },
    safety_checker: {
        name: "Safety Checker",
        url: "safety_checker_model_f16.onnx",
        size: "580MB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 3,
                height: 224,
                width: 224,
            },
        },
        inputInfo: {
            clip_input: { dataType: dataType, dims: [batchSize, 3, 224, 224], writable: true },
        },
        outputInfo: {
            has_nsfw_concepts: { dataType: "bool", dims: [batchSize], readable: true },
        },
    },
};
/*
 * get configuration from url
 */
function getConfig() {
    const queryParams = new URLSearchParams(window.location.search);
    const config = {
        model: location.href.includes("github.io") ? "https://huggingface.co/lwanming/Z-Image/resolve/main" : "models",
        mode: "none",
        safetyChecker: false,
        provider: "webgpu",
        deviceType: "gpu",
        // use QDQ models by default
        // Fix me: set useQdq to true once WebNN OV backend supports MatMulNBits well
        useQdq: false,
        useIOBinding: false,
        images: 1,
        numInferenceSteps: 8,
        verbose: false,
    };

    for (const key in config) {
        const lowerKey = key.toLowerCase();
        const value = queryParams.get(key) ?? queryParams.get(lowerKey);
        if (value !== null) {
            if (typeof config[key] === "boolean") {
                config[key] = value === "true";
            } else if (typeof config[key] === "number") {
                config[key] = isNaN(parseInt(value)) ? config[key] : parseInt(value);
            } else {
                config[key] = decodeURIComponent(value);
            }
        }
    }

    if (config.provider === "webgpu" && config.useQdq) {
        // WebGPU EP does not support INT4 QDQ model well yet.
        config.useQdq = false;
    }
    return config;
}

const getQueryValue = name => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

class ProgressManager {
    constructor(config) {
        this.config = config;
        this.weights = this.getWeights(config.safetyChecker);
        this.progress = {};
        this.totalProgress = 0;

        // Initialize progress for all models
        for (const key in this.weights) {
            this.progress[key] = { fetch: 0, compile: 0 };
        }
    }

    getWeights(safetyChecker) {
        if (safetyChecker) {
            return {
                text_encoder: { fetch: 20, compile: 1 },
                transformer: { fetch: 38, compile: 15 },
                vae_decoder: { fetch: 3, compile: 1 },
                safety_checker: { fetch: 16, compile: 2 },
            };
        } else {
            return {
                text_encoder: { fetch: 20, compile: 1 },
                transformer: { fetch: 55, compile: 17 },
                vae_decoder: { fetch: 3, compile: 1 },
            };
        }
    }

    update(modelName, stage, percentage) {
        let key = modelName;
        if (modelName.includes("text_encoder")) key = "text_encoder";
        else if (modelName.includes("transformer")) key = "transformer";
        else if (modelName.includes("vae_decoder")) key = "vae_decoder";
        else if (modelName.includes("safety_checker")) key = "safety_checker";

        if (!this.weights[key]) return;

        this.progress[key][stage] = percentage;
        this.calculateTotal();
        updateLoadWave(this.totalProgress.toFixed(2));
    }

    calculateTotal() {
        let total = 0;
        for (const key in this.weights) {
            const w = this.weights[key];
            const p = this.progress[key];
            total += (p.fetch * w.fetch) / 100;
            total += (p.compile * w.compile) / 100;
        }
        this.totalProgress = total;
    }

    reset() {
        for (const key in this.progress) {
            this.progress[key] = { fetch: 0, compile: 0 };
        }
        this.totalProgress = 0;
        updateLoadWave(0.0);
    }
}
const progressManager = new ProgressManager(config);

// Get model via Origin Private File System
async function getModelOPFS(name, url, updateModel) {
    const root = await navigator.storage.getDirectory();
    let fileHandle;

    async function updateFile() {
        const response = await fetch(url);
        const buffer = await readResponse(name, response);
        fileHandle = await root.getFileHandle(name, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(buffer);
        await writable.close();
        return buffer;
    }

    if (updateModel) {
        return await updateFile();
    }

    try {
        fileHandle = await root.getFileHandle(name);
        const blob = await fileHandle.getFile();
        let buffer = await blob.arrayBuffer();
        if (buffer) {
            progressManager.update(name, "fetch", 100);
            return buffer;
        }
    } catch (e) {
        console.log(e.message);
        return await updateFile();
    }
}

async function readResponse(name, response) {
    const contentLength = response.headers.get("Content-Length");
    let total = parseInt(contentLength ?? "0");
    let buffer = new Uint8Array(total);
    let loadedByteCount = 0;

    const reader = response.body.getReader();
    async function read() {
        const { done, value } = await reader.read();
        if (done) return;

        let newLoadedByteCount = loadedByteCount + value.length;
        let fetchProgress = (newLoadedByteCount / contentLength) * 100;
        progressManager.update(name, "fetch", fetchProgress);

        if (newLoadedByteCount > total) {
            total = newLoadedByteCount;
            let newBuffer = new Uint8Array(total);
            newBuffer.set(buffer);
            buffer = newBuffer;
        }
        buffer.set(value, loadedByteCount);
        loadedByteCount = newLoadedByteCount;
        return read();
    }

    await read();
    return buffer;
}

const getMode = () => {
    return getQueryValue("mode") === "normal" ? false : true;
};

const sizeOfShape = shape => shape.reduce((a, b) => a * b, 1);

// Seeded PRNG (mulberry32)
function mulberry32(seed) {
    let t = seed >>> 0;
    return function () {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), t | 1);
        r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
}

// Create latents with normal(0,1) samples, returns { data: Float32Array, shape: number[] }
function createLatents(shape, seed = 42) {
    const size = shape.reduce((a, b) => a * b, 1);
    const rand = mulberry32(seed);
    const out = new Float32Array(size);

    // Box-Muller transform (generate pairs)
    for (let i = 0; i < size; i += 2) {
        let u = rand();
        let v = rand();
        // avoid log(0)
        if (u === 0) u = Number.EPSILON;
        const mag = Math.sqrt(-2.0 * Math.log(u));
        const z0 = mag * Math.cos(2.0 * Math.PI * v);
        const z1 = mag * Math.sin(2.0 * Math.PI * v);
        out[i] = z0;
        if (i + 1 < size) out[i + 1] = z1;
    }
    return { data: out, shape };
}

// VAE scaling parameters (from Python pipeline)
const vaeScalingFactor = 0.3611;
const vaeShiftFactor = 0.1159;

function applyVaeScaling(latentArray) {
    const out = new Float32Array(latentArray.length);
    for (let i = 0; i < latentArray.length; i++) {
        out[i] = latentArray[i] / vaeScalingFactor + vaeShiftFactor;
    }
    return out;
}

function linspace(start, end, num) {
    const out = new Float32Array(num);
    if (num === 1) {
        out[0] = start;
        return out;
    }
    const step = (end - start) / (num - 1);
    for (let i = 0; i < num; i++) out[i] = start + step * i;
    return out;
}

function reverseFloat32(arr) {
    const out = new Float32Array(arr.length);
    for (let i = 0; i < arr.length; i++) out[i] = arr[arr.length - 1 - i];
    return out;
}

function appendFloat32(arr, val) {
    const out = new Float32Array(arr.length + 1);
    out.set(arr, 0);
    out[arr.length] = val;
    return out;
}

// Scheduler class
class Scheduler {
    constructor() {
        // config
        this.num_train_timesteps_ = 1000;
        this.shift_ = 3.0;
        this.num_inference_steps_ = null;
        this.step_index_ = null;

        // sigmas: np.linspace(1, self.num_train_timesteps_, self.num_train_timesteps_)[::-1]
        const timestepsInit = linspace(1, this.num_train_timesteps_, this.num_train_timesteps_);
        const timestepsRev = reverseFloat32(timestepsInit);

        // sigmas = timesteps / self.num_train_timesteps_
        const sigmasTmp = new Float32Array(timestepsRev.length);
        for (let i = 0; i < timestepsRev.length; i++) {
            sigmasTmp[i] = timestepsRev[i] / this.num_train_timesteps_;
        }

        // self.sigmas_ = self.shift_ * sigmas / (1 + (self.shift_ - 1) * sigmas)
        this.sigmas_ = new Float32Array(sigmasTmp.length);
        for (let i = 0; i < sigmasTmp.length; i++) {
            const s = sigmasTmp[i];
            this.sigmas_[i] = (this.shift_ * s) / (1 + (this.shift_ - 1) * s);
        }

        this.sigma_min_ = this.sigmas_[this.sigmas_.length - 1];
        this.sigma_max_ = this.sigmas_[0];
    }

    _sigmaToT(sigma) {
        return sigma * this.num_train_timesteps_;
    }

    setTimesteps(numInferenceSteps) {
        // timesteps = np.linspace(self._sigma_to_t(self.sigma_max_), self._sigma_to_t(self.sigma_min_), num_inference_steps)
        const tStart = this._sigmaToT(this.sigma_max_);
        const tEnd = this._sigmaToT(this.sigma_min_);
        const timesteps = linspace(tStart, tEnd, numInferenceSteps);

        // sigmas = timesteps / self.num_train_timesteps_
        const sigmas = new Float32Array(timesteps.length);
        for (let i = 0; i < timesteps.length; i++) {
            sigmas[i] = timesteps[i] / this.num_train_timesteps_;
        }

        // sigmas = self.shift_ * sigmas / (1 + (self.shift_ - 1) * sigmas)
        for (let i = 0; i < sigmas.length; i++) {
            const s = sigmas[i];
            sigmas[i] = (this.shift_ * s) / (1 + (this.shift_ - 1) * s);
        }

        // self.timesteps_ = sigmas * self.num_train_timesteps_
        this.timesteps_ = new Float32Array(sigmas.length);
        for (let i = 0; i < sigmas.length; i++) this.timesteps_[i] = sigmas[i] * this.num_train_timesteps_;

        // self.sigmas_ = np.append(sigmas, 0.0)
        this.sigmas_ = appendFloat32(sigmas, 0.0);

        this.num_inference_steps_ = numInferenceSteps;
        this.step_index_ = 0;
    }

    step(noisePred, timestep, latents) {
        if (this.step_index_ >= this.num_inference_steps_) {
            throw new Error("Invalid step_index_.");
        }

        const sigmaIdx = this.step_index_;
        const sigma = this.sigmas_[sigmaIdx];
        const sigmaNext = this.sigmas_[sigmaIdx + 1];
        const dt = sigmaNext - sigma;

        // latents_prev = latents - dt * noise_pred
        // support Float32Array or Array
        const length = latents.length;
        const latentsPrev = new Float32Array(length);
        for (let i = 0; i < length; i++) {
            latentsPrev[i] = latents[i] - dt * noisePred[i];
        }

        this.step_index_ += 1;
        return latentsPrev;
    }
}

/*
 * load models used in the pipeline
 */
async function loadModels(models) {
    log("[Load] ONNX Runtime Execution Provider: " + config.provider);
    log("[Load] ONNX Runtime EP device type: " + config.deviceType);
    updateLoadWave(0.0);
    load.disabled = true;
    try {
        for (const [name, model] of Object.entries(models)) {
            const modelNameInLog = model.name;
            let start = performance.now();
            let modelUrl = `${config.model}/${model.url}`;
            if (modelUrl.includes("huggingface.co")) {
                await getHuggingFaceDomain().then(domain => {
                    modelUrl = modelUrl.replace("huggingface.co", domain);
                });
            }
            log(`[Load] Loading model ${modelNameInLog} · ${model.size}`);
            const modelBuffer = await getModelOPFS(`zimage-${modelUrl.replace(/\//g, "_")}`, modelUrl, false);
            const externalDataBytes = await getModelOPFS(
                `zimage-${modelUrl.replace(/\//g, "_")}.data`,
                modelUrl + ".data",
                false,
            );
            model.opt.externalData = [
                {
                    data: externalDataBytes,
                    path: `model.onnx.data`,
                },
            ];
            if (config.provider === "webgpu") {
                // WebGPU EP requires freeDimensionOverrides to be set for dynamic dimensions
                model.opt.freeDimensionOverrides = {};
            }
            const sessOpt = { ...opt, ...model.opt };
            const modelFetchTime = (performance.now() - start).toFixed(2);

            if (dom[name]) {
                dom[name].fetch.innerHTML = modelFetchTime;
            }

            log(`[Load] ${modelNameInLog} loaded · ${modelFetchTime}ms`);
            log(`[Session Create] Beginning ${modelNameInLog}`);

            start = performance.now();
            console.log(sessOpt);
            models[name].sess = await ort.InferenceSession.create(modelBuffer, sessOpt);
            const sessionCreationTime = (performance.now() - start).toFixed(2);

            if (dom[name]) {
                dom[name].create.innerHTML = sessionCreationTime;
                progressManager.update(name, "compile", 100);
            }

            if (getMode()) {
                log(`[Session Create] Create ${modelNameInLog} completed · ${sessionCreationTime}ms`);
            } else {
                log(`[Session Create] Create ${modelNameInLog} completed`);
            }
        }

        if (config.provider === "webgpu") {
            gpuDevice = ort.env.webgpu.device;
        }
        const startInitTensors = performance.now();
        await initializeTensors();

        log(`[Session Create] Initialize tensors completed · ${(performance.now() - startInitTensors).toFixed(2)}ms`);
    } catch (e) {
        logError(`[Load] failed, ${e}`);
        return;
    }
    updateLoadWave(100.0);
    log("[Session Create] Ready to generate images");
    let imageArea = $$("#image_area>div");
    imageArea.forEach(i => {
        i.setAttribute("class", "frame ready");
    });
    buttons.setAttribute("class", "button-group key loaded");
    generate.disabled = false;
    $("#user-input").setAttribute("class", "form-control enabled");
}

const getDataTypeSize = dataType => {
    switch (dataType) {
        case "int64":
            return 8;
        case "float32":
        case "int32":
            return 4;
        case "float16":
            return 2;
        case "uint8":
        case "bool":
            return 1;
        default:
            throw new Error(`Unsupported data type: ${dataType}`);
    }
};

async function createTensor(tensorInfo) {
    let tensor;
    const numElements = sizeOfShape(tensorInfo.dims);
    if (!config.useIOBinding) {
        let data;
        switch (tensorInfo.dataType) {
            case "float32":
                data = new Float32Array(numElements);
                break;
            case "float16":
                data = new Float16Array(numElements);
                break;
            case "int32":
                data = new Int32Array(numElements);
                break;
            case "int64":
                data = new BigInt64Array(numElements);
                break;
            case "bool":
            case "uint8":
                data = new Uint8Array(numElements);
                break;
            default:
                throw new Error(`Unsupported data type: ${tensorInfo.dataType}`);
        }
        return new ort.Tensor(tensorInfo.dataType, data, tensorInfo.dims);
    }
    if (config.provider === "webnn") {
        tensor = await createMlTensor(
            mlContext,
            tensorInfo.dataType,
            tensorInfo.dims,
            tensorInfo.writable ?? false,
            tensorInfo.readable ?? false,
        );
    } else if (config.provider === "webgpu") {
        const bufferSize = numElements * getDataTypeSize(tensorInfo.dataType);
        tensor = await createGpuTensor(gpuDevice, tensorInfo.dataType, tensorInfo.dims, bufferSize);
    } else {
        throw new Error(`Unsupported provider: ${config.provider}`);
    }
    return tensor;
}

function writeTensor(tensor, data) {
    if (!config.useIOBinding) {
        tensor.data.set(data);
        return;
    }

    if (config.provider === "webnn") {
        mlContext.writeTensor(tensor.mlTensorData, data);
    } else if (config.provider === "webgpu") {
        const size = data.byteLength;
        const alignedSize = Math.ceil(size / 4) * 4;
        const gpuBuffer = tensor.gpuBuffer;
        const commandEncoder = gpuDevice.createCommandEncoder();
        const tempBuffer = gpuDevice.createBuffer({
            size: alignedSize,
            usage: GPUBufferUsage.COPY_SRC,
            mappedAtCreation: true,
        });
        const mapping = tempBuffer.getMappedRange();
        new Uint8Array(mapping).set(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
        tempBuffer.unmap();
        commandEncoder.copyBufferToBuffer(tempBuffer, 0, gpuBuffer, 0, alignedSize);
        const commandBuffer = commandEncoder.finish();
        gpuDevice.queue.submit([commandBuffer]);
    }
}

async function readTensor(tensor, targetBuffer) {
    if (!config.useIOBinding) {
        targetBuffer.set(tensor.data);
        return;
    }

    if (config.provider === "webnn") {
        await readBackMLTensor(mlContext, tensor.mlTensorData, targetBuffer);
    } else if (config.provider === "webgpu") {
        const bufferSize = sizeOfShape(tensor.dims) * getDataTypeSize(tensor.type);
        await readBackGpuTensor(gpuDevice, tensor.gpuBuffer, bufferSize, targetBuffer);
    }
}

function disposeTensors() {
    // Release tensors
    for (const model of Object.values(models)) {
        const tensors = [...Object.values(model.feed), ...Object.values(model.fetches)];
        for (const tensor of tensors) {
            if (tensor) {
                if (tensor.disposer == undefined) {
                    if (tensor.dataLocation == "ml-tensor") {
                        tensor.mlTensorData.destroy();
                    } else if (tensor.dataLocation == "gpu-buffer") {
                        tensor.gpuBufferData.destroy();
                    }
                } else {
                    tensor.dispose();
                }
            }
        }
    }
}

async function initializeTensors() {
    // text_encoder
    // models["text_encoder"].feed = {
    //     input_ids: await createTensor(models["text_encoder"].inputInfo.input_ids),
    //     attention_mask: await createTensor(models["text_encoder"].inputInfo.attention_mask),
    //     position_ids: await createTensor(models["text_encoder"].inputInfo.position_ids),
    // };
    models["text_encoder"].fetches = {
        logits: await createTensor(models["text_encoder"].outputInfo.logits),
        // Delay the creation of this tensor until needed, as the sequence length may change
        // "/model/layers.34/Add_1_output_0": await createTensor(models["text_encoder"].outputInfo["/model/layers.34/Add_1_output_0"]),
    };

    // transformer
    models["transformer"].feed = {
        hidden_states: await createTensor(models["transformer"].inputInfo.hidden_states),
        timestep: await createTensor(models["transformer"].inputInfo.timestep),
        // encoder_hidden_states: await createTensor(models["transformer"].inputInfo.encoder_hidden_states),
    };

    // Initialize the tensors early to avoid re-allocation during execution
    models["transformer"].fetches = {
        unified_results: await createTensor(models["transformer"].outputInfo.unified_results),
    };

    // vae_decoder
    models["vae_decoder"].feed = {
        latent_sample: await createTensor(models["vae_decoder"].inputInfo.latent_sample),
    };
    models["vae_decoder"].fetches = {
        sample: await createTensor(models["vae_decoder"].outputInfo.sample),
    };

    // safety_checker
    if (config.safetyChecker) {
        models["sc_prep"].feed = {
            sample: models["vae_decoder"].fetches.sample,
        };
        models["sc_prep"].fetches = {
            clip_input: await createTensor(models["sc_prep"].outputInfo.clip_input),
        };

        models["safety_checker"].feed = {
            clip_input: models["sc_prep"].fetches.clip_input,
        };
        models["safety_checker"].fetches = {
            has_nsfw_concepts: await createTensor(models["safety_checker"].outputInfo.has_nsfw_concepts),
        };
    }
}

async function runModel(model) {
    if (config.useIOBinding) {
        await model.sess.run(model.feed, model.fetches);
    } else {
        const results = await model.sess.run(model.feed);
        for (const [name, tensor] of Object.entries(results)) {
            if (model.fetches[name]) {
                model.fetches[name].data.set(tensor.data);
            } else {
                console.warn(`[runModel] Output ${name} not found in fetches for model ${model.name}`);
            }
        }
    }
}

/**
 * draw images from pixel data
 * @param {Float16Array} pix
 * @param {number} imageIndex
 * @param {number} height
 * @param {number} width
 */
function drawImage(pix, imageIndex, height, width) {
    const channelSize = height * width;
    const rgbaData = new Uint8ClampedArray(channelSize * 4);

    for (let j = 0; j < channelSize; j++) {
        // NCHW layout: R is at 0, G at channelSize, B at 2*channelSize
        let r = pix[j];
        let g = pix[j + channelSize];
        let b = pix[j + 2 * channelSize];

        // Map [-1, 1] to [0, 255]
        rgbaData[j * 4 + 0] = (r / 2 + 0.5) * 255;
        rgbaData[j * 4 + 1] = (g / 2 + 0.5) * 255;
        rgbaData[j * 4 + 2] = (b / 2 + 0.5) * 255;
        rgbaData[j * 4 + 3] = 255; // Alpha
    }

    const imageData = new ImageData(rgbaData, width, height);
    const canvas = $(`#img_canvas_${imageIndex}`);
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").putImageData(imageData, 0, 0);
    }
}

async function generateImage() {
    generate.disabled = true;
    const imgDivs = $$("#image_area > div");
    imgDivs.forEach(div => div.setAttribute("class", "frame"));

    // try {
    dom["runTotal"].innerHTML = "";
    dom["safety_checker"].run.innerHTML = "";

    $("#total_data").innerHTML = "...";
    $("#total_data").setAttribute("class", "show");

    log(`[Session Run] Beginning`);

    await loading;
    for (let i = 0; i < batchSize; i++) {
        $(`#img_div_${i}`).setAttribute("class", "frame inferncing");
    }

    // Inference prepare for Text Encoders
    let start = performance.now();
    const startTotal = start;

    const prompt = $("#user-input");

    // Run Text Encoder
    const messages = [{ role: "user", content: prompt.value }];
    const prompt_with_template = tokenizer.apply_chat_template(messages, {
        tokenize: false,
        add_generation_prompt: true,
        enable_thinking: true,
    });
    // TODO: set padding to false for WebGPU (dynamic)
    const promptInputs = tokenizer([prompt_with_template], {
        padding: false,
        max_length: 512, // Qwen3ForCausalLM max length
        truncation: true,
        return_tensor: false,
    });
    const seqLen = promptInputs.attention_mask[0].reduce((s, v) => s + v, 0);
    // Since the tensors of Text Encoder dynamically allocated according to the effective sequence length,
    // we need to create the tensor here.
    models["text_encoder"].feed = {
        // input ids / masks / positions must be int64
        input_ids: await createTensor({ dataType: "int64", dims: [batchSize, seqLen] }),
        attention_mask: await createTensor({ dataType: "int64", dims: [batchSize, seqLen] }),
        position_ids: await createTensor({ dataType: "int64", dims: [batchSize, seqLen] }),
    };
    models["text_encoder"].fetches["/model/layers.34/Add_1_output_0"] = await createTensor({
        dataType: dataType,
        dims: [batchSize, seqLen, 2560],
    });

    console.log("effective sequence length (non-pad tokens):", seqLen);
    console.log("Prompt after applying chat template:", prompt_with_template);
    console.log("Tokenized input IDs:", promptInputs.input_ids);
    console.log("Tokenized attention mask:", promptInputs.attention_mask);

    const inputIdsData = promptInputs.input_ids[0].map(x => BigInt(x));
    const attentionMaskData = promptInputs.attention_mask[0].map(x => BigInt(x));
    const positionIdsData = Array.from({ length: seqLen }, (_, i) => BigInt(i));

    writeTensor(models["text_encoder"].feed.input_ids, inputIdsData);
    writeTensor(models["text_encoder"].feed.attention_mask, attentionMaskData);
    writeTensor(models["text_encoder"].feed.position_ids, positionIdsData);

    await runModel(models["text_encoder"]);

    const sessionRunTimeTextEncode = (performance.now() - start).toFixed(2);

    if (getMode()) {
        log(`[Session Run] Text Encoder execution time: ${sessionRunTimeTextEncode}ms`);
    } else {
        log(`[Session Run] Text Encoder completed`);
    }

    const scheduler = new Scheduler();
    scheduler.setTimesteps(config.numInferenceSteps);

    // read scheduler-generated timesteps (do not overwrite it)
    const schedulerTimesteps = scheduler.timesteps_;
    if (config.numInferenceSteps !== schedulerTimesteps.length) {
        throw new Error("Invalid timesteps.");
    }

    // compute (1000.0 - schedulerTimesteps) / 1000.0
    const timesteps = new Float32Array(schedulerTimesteps.length);
    for (let i = 0; i < schedulerTimesteps.length; i++) {
        timesteps[i] = (1000.0 - schedulerTimesteps[i]) / 1000.0;
    }

    // set last element to 1.0
    timesteps[timesteps.length - 1] = 1.0;
    console.log(`num_inference_steps: ${config.numInferenceSteps}`);
    for (let i = 0; i < config.numInferenceSteps; i++) {
        const timestep = timesteps[i];
        console.log(`timestep ${i}, ${timestep.toFixed(2)}`);
    }
    const latentShape = [batchSize, 16, 1, imageHeight / 8, imageWidth / 8];
    // createLatents returns { data, shape } — keep a Float32Array in `latents`
    const latentsObj = createLatents(latentShape);
    let latents = latentsObj.data;
    for (let i = 0; i < config.numInferenceSteps; i++) {
        // Inference prepare for Transformer
        writeTensor(models["transformer"].feed.hidden_states, latents);
        models["transformer"].feed.encoder_hidden_states =
            models["text_encoder"].fetches["/model/layers.34/Add_1_output_0"];
        writeTensor(models["transformer"].feed.timestep, new Float32Array(Array(batchSize).fill(timesteps[i])));

        // Run Transformer
        start = performance.now();
        await runModel(models["transformer"]);
        const transformerRunTime = (performance.now() - start).toFixed(2);

        if (getMode()) {
            log(`[Session Run] Transformer execution time ${i}: ${transformerRunTime}ms`);
        } else {
            log(`[Session Run] Transformer completed`);
        }

        const noise_pred = models["transformer"].fetches.unified_results;

        latents = scheduler.step(noise_pred.data, 1000, latents);
    }

    // Inference prepare for VAE Decoder

    // Prepare latent sample for VAE decoder by squeezing frame dim (axis=2)
    // 'latents' is a Float32Array with shape [batch, 16, 1, H, W]
    // We need [batch, 16, H, W]
    const H = imageHeight / 8;
    const W = imageWidth / 8;
    const C = 16;
    const batch = batchSize;
    const vaeLen = batch * C * H * W;
    const squeezedLatents = new Float32Array(vaeLen);
    // Since num_frames == 1, the memory layout aligns so we can copy directly
    for (let i = 0; i < vaeLen; i++) {
        squeezedLatents[i] = latents[i];
    }

    const scaledLatents = applyVaeScaling(squeezedLatents);
    writeTensor(models["vae_decoder"].feed.latent_sample, scaledLatents);

    // Run VAE Decoder
    start = performance.now();
    await runModel(models["vae_decoder"]);

    const pixSize = sizeOfShape(models["vae_decoder"].outputInfo.sample.dims);
    let pix = new Float32Array(pixSize);
    await readTensor(models["vae_decoder"].fetches.sample, pix);

    let vaeRunTime = (performance.now() - start).toFixed(2);

    if (getMode()) {
        log(`[Session Run] VAE Decoder execution time: ${vaeRunTime}ms`);
    } else {
        log(`[Session Run] VAE Decoder completed`);
    }

    start = performance.now();
    for (let i = 0; i < batchSize; i++) {
        const size = 3 * imageHeight * imageWidth;
        const offset = i * size;
        const subPix = pix.subarray(offset, offset + size);
        drawImage(subPix, i, imageHeight, imageWidth);
    }
    const imageDrawTime = (performance.now() - start).toFixed(2);
    log(`[Images Drawing] drawing ${batchSize} images time: ${imageDrawTime}ms`);

    const totalRunTime = (performance.now() - startTotal).toFixed(2);
    if (getMode()) {
        log(`[Total] Total images generation time: ${totalRunTime}ms`);
    }
    dom.runTotal.innerHTML = totalRunTime;

    if (config.safetyChecker) {
        // 1. Run Preprocessing Model (VAE Output -> SC Input)
        let start = performance.now();
        await runModel(models["sc_prep"]);

        if (getMode()) {
            log(`[Session Run] Safety Checker input prepared time: ${(performance.now() - start).toFixed(2)}ms`);
        } else {
            log(`[Session Run] Safety Checker input prepared`);
        }

        // 2. Run Safety Checker
        start = performance.now();
        await runModel(models["safety_checker"]);

        // 3. Read Results
        let nsfwBuffer = new Uint8Array(batchSize);
        await readTensor(models["safety_checker"].fetches.has_nsfw_concepts, nsfwBuffer);

        const totalScRunTime = (performance.now() - start).toFixed(2);

        // 4. Process Results UI
        for (let i = 0; i < batchSize; i++) {
            let nsfw = nsfwBuffer[i] ? true : false;
            log(`[Session Run][Image ${i + 1}] Safety Checker - not safe for work (NSFW) concepts: ${nsfw}`);

            if (nsfw) {
                $(`#img_div_${i}`).setAttribute("class", "frame done nsfw");
                $(`#img_div_${i}`).setAttribute("title", "Not safe for work (NSFW) content");
            } else {
                $(`#img_div_${i}`).setAttribute("class", "frame done");
            }
        }

        dom["safety_checker"].run.innerHTML = totalScRunTime;
        if (getMode()) {
            log(`[Session Run] Safety Checker execution time (Batch ${batchSize}): ${totalScRunTime}ms`);
        }
    } else {
        for (let i = 0; i < batchSize; i++) {
            $(`#img_div_${i}`).setAttribute("class", "frame done");
        }
    }

    $("#total_data").innerHTML = `${totalRunTime}ms`;

    generate.disabled = false;
    log("[Info] Images generation completed");
    // } catch (e) {
    //     logError("[Error] " + e);
    //     return;
    // }
}

const checkWebNN = async () => {
    let status = $("#webnnstatus");
    let info = $("#info");
    webnnStatus = await getWebnnStatus();

    if (webnnStatus.webnn) {
        status.setAttribute("class", "green");
        info.innerHTML = "WebNN supported";
        updateDeviceTypeLinks();
        load.disabled = false;
    } else {
        if (webnnStatus.error) {
            status.setAttribute("class", "red");
            info.innerHTML = `WebNN not supported: ${webnnStatus.error} <a id="webnn_na" href="../../install.html" title="WebNN Installation Guide">Set up WebNN</a>`;
            logError(`[Error] ${webnnStatus.error}`);
        } else {
            status.setAttribute("class", "red");
            info.innerHTML = "WebNN not supported";
            logError(`[Error] WebNN not supported`);
        }
    }

    if (getQueryValue("provider") && getQueryValue("provider").toLowerCase() === "webgpu") {
        status.innerHTML = "";
    }
};

const getWebnnStatus = async () => {
    let result = {};
    try {
        const context = await navigator.ml.createContext();
        if (context) {
            try {
                const builder = new MLGraphBuilder(context);
                if (builder) {
                    result.webnn = true;
                    return result;
                } else {
                    result.webnn = false;
                    return result;
                }
            } catch (e) {
                result.webnn = false;
                result.error = e.message;
                return result;
            }
        } else {
            result.webnn = false;
            return result;
        }
    } catch (ex) {
        result.webnn = false;
        result.error = ex.message;
        return result;
    }
};

const updateLoadWave = value => {
    loadwave = $$(".loadwave");
    loadwaveData = $$(".loadwave-data strong");

    if (loadwave && loadwaveData) {
        loadwave.forEach(l => {
            l.style.setProperty(`--loadwave-value`, value);
        });
        loadwaveData.forEach(data => {
            data.innerHTML = value;
        });

        if (value === 100) {
            loadwave.forEach(l => {
                l.dataset.value = value;
            });
        }
    }
};

const updateDeviceTypeLinks = () => {
    let backendLinks = $("#backend-links");
    // Fix me: Once NPU is supported, uncomment the following line
    // const links = `· <a href="./?devicetype=gpu">GPU</a> · <a id="npu_link" href="./?devicetype=npu">NPU</a>`;
    const links = `· <a href="./?devicetype=gpu">GPU</a>`;
    backendLinks.innerHTML = `${links}`;
};

const ui = async () => {
    memoryReleaseSwitch = $("#memory_release");
    device = $("#device");
    badge = $("#badge");
    const prompt = $("#user-input");
    const title = $("#title");
    const dev = $("#dev");
    const scTr = $("#scTr");
    load = $("#load");
    generate = $("#generate");
    buttons = $("#buttons");
    $("#imagesTd").innerHTML = `Images x ${batchSize}`;

    memoryReleaseSwitch.addEventListener("change", () => {
        if (memoryReleaseSwitch.checked) {
            memoryReleaseSwitch.setAttribute("checked", "");
        } else {
            memoryReleaseSwitch.removeAttribute("checked");
        }
    });

    if (!getMode()) {
        dev.setAttribute("class", "mt-1");
    }

    await setupORT("sdxl-turbo", "dev");
    showCompatibleChromiumVersion("sdxl-turbo");

    if (getQueryValue("provider") && getQueryValue("provider").toLowerCase() === "webgpu") {
        title.innerHTML = "WebGPU";
        $("#webnnstatus").hidden = true;
        load.disabled = false;
    } else {
        await checkWebNN();
    }

    for (const [modelName, prefix] of Object.entries(modelDOMPrefixes)) {
        dom[modelName] = {
            fetch: $(`#${prefix}Fetch`),
            create: $(`#${prefix}Create`),
            run: $(`#${prefix}Run`),
        };
    }
    dom.runTotal = $("#runTotal");

    opt.executionProviders = [config.provider];
    switch (config.provider) {
        case "webgpu":
            if (!("gpu" in navigator)) {
                throw new Error("webgpu is NOT supported");
            }
            break;
        case "webnn":
            webnnStatus = await getWebnnStatus();
            if (webnnStatus.webnn) {
                if (config.useIOBinding) {
                    mlContext = await navigator.ml.createContext({ deviceType: config.deviceType });
                }
                opt.executionProviders = [
                    {
                        name: "webnn",
                        deviceType: config.deviceType,
                        context: mlContext,
                    },
                ];
            }
            break;
        default:
            throw new Error(`The provider ${config.provider} is not supported.`);
    }

    const deviceType = config.deviceType.toLowerCase();
    const provider = config.provider.toLowerCase();

    if (deviceType === "cpu") {
        device.innerHTML = "CPU";
        badge.setAttribute("class", "cpu");
        document.body.setAttribute("class", "cpu");
    } else if (deviceType === "gpu" || provider === "webgpu") {
        device.innerHTML = "GPU";
        badge.setAttribute("class", "");
        document.body.setAttribute("class", "gpu");
    } else if (deviceType === "npu") {
        device.innerHTML = "NPU";
        badge.setAttribute("class", "npu");
        document.body.setAttribute("class", "npu");
    }

    // prompt.value =
    //     "An artistic baby raccoon DJ in a vintage suit, adjusting knobs on a futuristic mixer. The scene is a dim nightclub with vibrant lights and soft bokeh. Highly detailed, cinematic style.";
    prompt.value =
        "Young Chinese woman in red Hanfu, intricate embroidery. Impeccable makeup, red floral forehead pattern. Elaborate high bun, golden phoenix headdress, red flowers, beads. Holds round folding fan with lady, trees, bird. Neon lightning-bolt lamp (⚡️), bright yellow glow, above extended left palm. Soft-lit outdoor night background, silhouetted tiered pagoda (西安大雁塔), blurred colorful distant lights.";
    // Event listener for Ctrl + Enter or CMD + Enter
    prompt.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "Enter") {
            generateImage();
        }
    });
    generate.addEventListener("click", () => {
        generateImage();
    });

    const loadModelUi = () => {
        if (!config.safetyChecker) {
            delete models["safety_checker"];
            delete models["sc_prep"];
        }
        loading = loadModels(models);
        const imgDivs = $$("#image_area > div");
        imgDivs.forEach(div => div.setAttribute("class", "frame loadwave"));
        buttons.setAttribute("class", "button-group key loading");
    };

    load.addEventListener("click", () => {
        loadModelUi();
    });

    ort.env.wasm.numThreads = 4;
    ort.env.wasm.simd = true;

    if (config.safetyChecker) {
        scTr.setAttribute("class", "");
    } else {
        scTr.setAttribute("class", "hide");
    }

    window.addEventListener("beforeunload", () => {
        if (memoryReleaseSwitch.checked) {
            disposeTensors();
            const sessions = [
                models["text_encoder"]?.sess,
                models["transformer"]?.sess,
                models["vae_decoder"]?.sess,
                models["sc_prep"]?.sess,
                models["safety_checker"]?.sess,
            ];

            Promise.allSettled(sessions.filter(session => session).map(session => session?.release())).catch(error =>
                console.error("Session release error:", error),
            );

            load.disabled = false;
            buttons.setAttribute("class", "button-group key");
            generate.disabled = true;
            $("#user-input").setAttribute("class", "form-control");
            updateLoadWave(0.0);
            const imgDivs = [img_div_0, img_div_1, img_div_2, img_div_3];
            imgDivs.forEach(div => div.setAttribute("class", "frame"));
            progressManager.reset();
            for (const key in dom) {
                if (key === "runTotal") {
                    dom[key].innerHTML = "";
                } else {
                    dom[key].fetch.innerHTML = "";
                    dom[key].create.innerHTML = "";
                    if (dom[key].run) {
                        dom[key].run.innerHTML = "";
                    }
                }
            }
        }
    });
};

if (document.readyState !== "loading") {
    ui();
} else {
    document.addEventListener("DOMContentLoaded", ui, false);
}
