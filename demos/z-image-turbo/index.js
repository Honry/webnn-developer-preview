/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
// An example how to run Z-Image Turbo with webnn/webgpu in onnxruntime-web.
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
let currentResolution = null;

const config = getConfig();
const dataType = "float32";
const opt = {
    logSeverityLevel: config.verbose ? 0 : 3, // 0: verbose, 1: info, 2: warning, 3: error
};

const prompt = $("#user-input");
// Always use local/relative paths for tokenizers, as they are small enough to be hosted on GitHub Pages
const tokenizer = await AutoTokenizer.from_pretrained("tokenizer");

const maxSeqLen = 512;
const batchSize = 1;
let imageHeight = config.resolution;
let imageWidth = config.resolution;

// Hard code for WebNN test
let realSeqLen = 72;

const models = {
    text_encoder: {
        name: "Text Encoder",
        url: "text_encoder_model_q4f16.onnx",
        externalDataUrl: "text_encoder_model_q4f16.onnx_data",
        size: "2.06GB",
    },
    transformer: {
        name: "Transformer",
        url: "transformer_model_q4f16.onnx",
        externalDataUrl: "transformer_model_q4f16.onnx_data",
        size: "3.44GB",
    },
    scheduler_step: {
        name: "Scheduler Step",
        url: "scheduler_step_model_f16.onnx",
        size: "4KB",
    },
    vae_pre_process: {
        name: "VAE Pre Process",
        url: "vae_pre_process_model_f16.onnx",
        size: "1KB",
    },
    vae_decoder: {
        name: "VAE Decoder",
        url: "vae_decoder_model_f16.onnx",
        size: "93MB",
    },
    sc_prep: {
        name: "Safety Checker Pre-processing",
        url: "sc_prep_model_f16.onnx",
        size: "1KB",
    },
    safety_checker: {
        name: "Safety Checker",
        url: "safety_checker_model_f16.onnx",
        size: "580MB",
    },
};

function updateModelDimensions(res) {
    imageHeight = res;
    imageWidth = res;

    if (config.provider === "webnn") {
        models["text_encoder"].opt = {
            freeDimensionOverrides: {
                batch_size: batchSize,
                sequence_length: realSeqLen,
                total_sequence_length: realSeqLen,
            },
        };
        models["transformer"].opt = {
            freeDimensionOverrides: {
                batch_size: batchSize,
                num_frames: 1,
                height: imageHeight / 8,
                width: imageWidth / 8,
                seq_len: realSeqLen,
            },
        };
        models["scheduler_step"].opt = {
            freeDimensionOverrides: {
                batch: batchSize,
                height: imageHeight / 8,
                width: imageWidth / 8,
            },
        };
        models["vae_pre_process"].opt = {
            freeDimensionOverrides: {
                batch: batchSize,
                height: imageHeight / 8,
                width: imageWidth / 8,
            },
        };
        models["vae_decoder"].opt = {
            freeDimensionOverrides: {
                batch_size: batchSize,
                latent_height: imageHeight / 8,
                latent_width: imageWidth / 8,
            },
        };
        if (config.safetyChecker) {
            models["sc_prep"].opt = {
                freeDimensionOverrides: {
                    batch: batchSize,
                    channels: 3,
                    height: imageHeight,
                    width: imageWidth,
                },
            };
            models["safety_checker"].opt = {
                freeDimensionOverrides: {
                    batch: batchSize,
                    channels: 3,
                    height: 224,
                    width: 224,
                },
            };
        }
    }

    models["text_encoder"].inputInfo = {};
    models["text_encoder"].outputInfo = {};

    models["transformer"].inputInfo = {
        hidden_states: {
            dataType: dataType,
            dims: [batchSize, 16, 1, imageHeight / 8, imageWidth / 8],
            writable: true,
        },
        timestep: { dataType: dataType, dims: [batchSize], writable: true },
    };
    models["transformer"].outputInfo = {
        unified_results: { dataType: dataType, dims: [16, 1, imageHeight / 8, imageWidth / 8] },
    };

    models["scheduler_step"].inputInfo = {
        noise_pred: { dataType: "float32", dims: [16, 1, imageHeight / 8, imageWidth / 8] },
        latents: { dataType: "float32", dims: [batchSize, 16, 1, imageHeight / 8, imageWidth / 8] },
        step_info: { dataType: "float32", dims: [2], writable: true },
    };
    models["scheduler_step"].outputInfo = {
        latents_out: {
            dataType: "float32",
            dims: [batchSize, 16, 1, imageHeight / 8, imageWidth / 8],
        },
    };

    models["vae_pre_process"].inputInfo = {
        latents: { dataType: "float32", dims: [batchSize, 16, 1, imageHeight / 8, imageWidth / 8] },
    };
    models["vae_pre_process"].outputInfo = {
        scaled_latents: { dataType: "float32", dims: [batchSize, 16, imageHeight / 8, imageWidth / 8] },
    };

    models["vae_decoder"].inputInfo = {
        latent_sample: { dataType: dataType, dims: [batchSize, 16, imageHeight / 8, imageWidth / 8] },
    };
    models["vae_decoder"].outputInfo = {
        sample: { dataType: dataType, dims: [batchSize, 3, imageHeight, imageWidth], readable: true },
    };

    if (config.safetyChecker) {
        models["sc_prep"].inputInfo = {
            sample: { dataType: dataType, dims: [batchSize, 3, imageHeight, imageWidth] },
        };
        models["sc_prep"].outputInfo = {
            clip_input: { dataType: dataType, dims: [batchSize, 3, 224, 224] },
        };
        models["safety_checker"].inputInfo = {
            clip_input: { dataType: dataType, dims: [batchSize, 3, 224, 224], writable: true },
        };
        models["safety_checker"].outputInfo = {
            has_nsfw_concepts: { dataType: "bool", dims: [batchSize], readable: true },
        };
    }
}

/*
 * get configuration from url
 */
function getConfig() {
    const queryParams = new URLSearchParams(window.location.search);
    const config = {
        model: location.href.includes("github.io")
            ? "https://huggingface.co/lwanming/Z-Image-Turbo/resolve/main"
            : "models",
        mode: "none",
        safetyChecker: true,
        provider: "webgpu",
        deviceType: "gpu",
        useIOBinding: true,
        numInferenceSteps: null,
        verbose: false,
        resolution: 512,
    };

    for (const key in config) {
        const lowerKey = key.toLowerCase();
        const value = queryParams.get(key) ?? queryParams.get(lowerKey);
        if (value !== null) {
            if (typeof config[key] === "boolean") {
                config[key] = value === "true";
            } else if (typeof config[key] === "number" || key === "numInferenceSteps") {
                config[key] = isNaN(parseInt(value)) ? config[key] : parseInt(value);
            } else {
                config[key] = decodeURIComponent(value);
            }
        }
    }

    if (config.numInferenceSteps === null) {
        config.numInferenceSteps = config.resolution === 1024 ? 3 : 9;
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
            this.progress[key] = { fetch_base: 0, fetch_data: 0, compile: 0 };
        }
    }

    getWeights(safetyChecker) {
        if (safetyChecker) {
            return {
                text_encoder: { fetch: 10, compile: 15 },
                transformer: { fetch: 20, compile: 40 },
                vae_decoder: { fetch: 2, compile: 3 },
                safety_checker: { fetch: 5, compile: 5 },
            };
        } else {
            return {
                text_encoder: { fetch: 10, compile: 20 },
                transformer: { fetch: 25, compile: 40 },
                vae_decoder: { fetch: 2, compile: 3 },
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

            let fetchProgress = p.fetch_base;
            if (models[key] && models[key].externalDataUrl) {
                fetchProgress = p.fetch_base * 0.1 + p.fetch_data * 0.9;
            }

            total += (fetchProgress * w.fetch) / 100;
            total += (p.compile * w.compile) / 100;
        }
        this.totalProgress = total;
    }

    reset() {
        for (const key in this.progress) {
            this.progress[key] = { fetch_base: 0, fetch_data: 0, compile: 0 };
        }
        this.totalProgress = 0;
        updateLoadWave(0.0);
    }
}
const progressManager = new ProgressManager(config);

// Get model via Origin Private File System
async function getModelOPFS(name, url, updateModel, onProgress) {
    const root = await navigator.storage.getDirectory();
    let fileHandle;

    async function updateFile() {
        const response = await fetch(url);
        const buffer = await readResponse(response, onProgress);
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
            if (onProgress) onProgress(100);
            return buffer;
        }
    } catch (e) {
        console.log(e.message);
        return await updateFile();
    }
}

async function readResponse(response, onProgress) {
    const contentLength = response.headers.get("Content-Length");
    let total = parseInt(contentLength ?? "0");
    let buffer = new Uint8Array(total);
    let loadedByteCount = 0;

    const reader = response.body.getReader();
    async function read() {
        const { done, value } = await reader.read();
        if (done) return;

        let newLoadedByteCount = loadedByteCount + value.length;
        let fetchProgress = total > 0 ? (newLoadedByteCount / total) * 100 : 100;

        if (onProgress) onProgress(fetchProgress);

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
}

const scheduler = new Scheduler();
let schedulerTimesteps;
let timesteps;

function updateScheduler() {
    scheduler.setTimesteps(config.numInferenceSteps);

    // read scheduler-generated timesteps (do not overwrite it)
    schedulerTimesteps = scheduler.timesteps_;
    if (config.numInferenceSteps !== schedulerTimesteps.length) {
        throw new Error("Invalid timesteps.");
    }

    // compute (1000.0 - schedulerTimesteps) / 1000.0
    timesteps = new Float32Array(schedulerTimesteps.length);
    for (let i = 0; i < schedulerTimesteps.length; i++) {
        timesteps[i] = (1000.0 - schedulerTimesteps[i]) / 1000.0;
    }
    // set last element to 1.0
    timesteps[timesteps.length - 1] = 1.0;
    console.log(`num_inference_steps: ${config.numInferenceSteps}`);
}

updateScheduler();

/*
 * load models used in the pipeline
 */
async function loadModels(models) {
    log("[Load] ONNX Runtime Execution Provider: " + config.provider);
    log("[Load] ONNX Runtime EP device type: " + config.deviceType);
    updateLoadWave(0.0);
    load.disabled = true;

    // Apply dimensions and inputs/outputs metadata before session creation
    updateModelDimensions(config.resolution);

    try {
        for (const [name, model] of Object.entries(models)) {
            const modelNameInLog = model.name;
            let start = performance.now();
            let modelUrl = `${config.model}/onnx/${model.url}`;
            if (modelUrl.includes("huggingface.co")) {
                await getHuggingFaceDomain().then(domain => {
                    modelUrl = modelUrl.replace("huggingface.co", domain);
                });
            }
            log(`[Load] Loading model ${modelNameInLog} · ${model.size}`);
            const modelBuffer = await getModelOPFS(`zimage-${modelUrl.replace(/\//g, "_")}`, modelUrl, false, p =>
                progressManager.update(name, "fetch_base", p),
            );
            if (model.externalDataUrl) {
                const externalDataBytes = await getModelOPFS(
                    `zimage-${modelUrl.replace(/\//g, "_")}.data`,
                    modelUrl.replace(".onnx", ".onnx_data"),
                    false,
                    p => progressManager.update(name, "fetch_data", p),
                );
                model.opt = model.opt || {};
                model.opt.externalData = [
                    {
                        data: externalDataBytes,
                        path: model.externalDataUrl,
                    },
                ];
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
        currentResolution = config.resolution;

        log(`[Session Create] Initialize tensors completed · ${(performance.now() - startInitTensors).toFixed(2)}ms`);
    } catch (e) {
        logError(`[Load] failed, ${e}`);
        return;
    }
    updateLoadWave(100.0);
    log("[Session Create] Ready to generate image");
    let imageArea = $$("#image_area>div");
    imageArea.forEach(i => {
        i.setAttribute("class", "frame ready");
    });
    buttons.setAttribute("class", "button-group key action-buttons loaded");
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
    // Delay the creation of this tensor until needed, as the sequence length may change
    models["text_encoder"].feed = {
        // "input_ids": await createTensor(models["text_encoder"].inputInfo.input_ids),
        // "attention_mask": await createTensor(models["text_encoder"].inputInfo.attention_mask),
    };
    models["text_encoder"].fetches = {
        // "encoder_hidden_state": await createTensor(models["text_encoder"].outputInfo["encoder_hidden_state"]),
    };

    // transformer
    models["transformer"].feed = {
        hidden_states: await createTensor(models["transformer"].inputInfo.hidden_states),
        timestep: await createTensor(models["transformer"].inputInfo.timestep),
        // Delay the creation of this tensor until needed, as the sequence length may change
        // encoder_hidden_states: await createTensor(models["transformer"].inputInfo.encoder_hidden_states),
    };
    models["transformer"].fetches = {
        unified_results: await createTensor(models["transformer"].outputInfo.unified_results),
    };

    // scheduler_step
    models["scheduler_step"].feed = {
        noise_pred: models["transformer"].fetches.unified_results,
        latents: models["transformer"].feed.hidden_states,
        step_info: await createTensor(models["scheduler_step"].inputInfo.step_info),
    };
    models["scheduler_step"].fetches = {
        latents_out: await createTensor(models["scheduler_step"].outputInfo.latents_out),
    };

    // vae_pre_process
    models["vae_pre_process"].feed = {
        latents: models["scheduler_step"].fetches.latents_out,
    };
    models["vae_pre_process"].fetches = {
        scaled_latents: await createTensor(models["vae_pre_process"].outputInfo.scaled_latents),
    };

    // vae_decoder
    models["vae_decoder"].feed = {
        latent_sample: models["vae_pre_process"].fetches.scaled_latents,
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
 * draw image from pixel data
 * @param {Float32Array} pix
 * @param {number} height
 * @param {number} width
 */
function drawImage(pix, height, width) {
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
    const canvas = $(`#img_canvas`);
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").putImageData(imageData, 0, 0);
    }
}

async function generateImage() {
    generate.disabled = true;
    $("#resolution-select").disabled = true;
    $("#seed-input").disabled = true;
    $("#random-seed").disabled = true;
    const imgDivs = $$("#image_area > div");
    imgDivs.forEach(div => div.setAttribute("class", "frame"));

    try {
        dom["runTotal"].innerHTML = "";
        dom["safety_checker"].run.innerHTML = "";

        $("#total_data").innerHTML = "...";
        $("#total_data").setAttribute("class", "show");

        log(`[Session Run] Beginning`);

        await loading;

        if (currentResolution !== config.resolution) {
            log(`[Session Run] Re-initializing tensors for resolution ${config.resolution}x${config.resolution}...`);
            let initStart = performance.now();
            disposeTensors();
            updateModelDimensions(config.resolution);
            await initializeTensors();
            currentResolution = config.resolution;
            log(`[Session Run] Re-initialized tensors in ${(performance.now() - initStart).toFixed(2)}ms`);
        }

        $("#img_div").setAttribute("class", "frame inferncing");

        // Inference prepare for Text Encoders
        let start = performance.now();
        const startTotal = start;

        // Run Text Encoder
        const messages = [{ role: "user", content: prompt.value }];
        const prompt_with_template = tokenizer.apply_chat_template(messages, {
            tokenize: false,
            add_generation_prompt: true,
            enable_thinking: true,
        });

        const promptInputs = tokenizer([prompt_with_template], {
            padding: false,
            max_length: maxSeqLen,
            truncation: true,
            return_tensor: false,
        });
        realSeqLen = promptInputs.input_ids[0].length;

        console.log(`Provider: ${config.provider}, seqLen: ${realSeqLen}`);

        // Since the tensors of Text Encoder dynamically allocated according to the effective sequence length,
        // we need to create the tensor here.
        models["text_encoder"].feed = {
            input_ids: await createTensor({ dataType: "int64", dims: [batchSize, realSeqLen], writable: true }),
            attention_mask: await createTensor({ dataType: "int64", dims: [batchSize, realSeqLen], writable: true }),
        };
        models["text_encoder"].fetches = {
            encoder_hidden_state: await createTensor({
                dataType: dataType,
                dims: [batchSize, realSeqLen, 2560],
            }),
        };

        console.log("Prompt after applying chat template:", prompt_with_template);
        console.log("Tokenized input IDs:", promptInputs.input_ids);
        console.log("Tokenized attention mask:", promptInputs.attention_mask);

        // Ensure we have exactly seqLen elements
        const inputIdsRaw = promptInputs.input_ids[0];
        const attentionMaskRaw = promptInputs.attention_mask[0];

        const inputIdsData = new BigInt64Array(realSeqLen);
        const attentionMaskData = new BigInt64Array(realSeqLen);

        for (let i = 0; i < realSeqLen; i++) {
            inputIdsData[i] = i < inputIdsRaw.length ? BigInt(inputIdsRaw[i]) : 0n;
            attentionMaskData[i] = i < attentionMaskRaw.length ? BigInt(attentionMaskRaw[i]) : 1n; // default to 1 for valid tokens
        }

        writeTensor(models["text_encoder"].feed.input_ids, inputIdsData);
        writeTensor(models["text_encoder"].feed.attention_mask, attentionMaskData);

        await runModel(models["text_encoder"]);

        const sessionRunTimeTextEncode = (performance.now() - start).toFixed(2);

        if (getMode()) {
            log(`[Session Run] Text Encoder execution time: ${sessionRunTimeTextEncode}ms`);
        } else {
            log(`[Session Run] Text Encoder completed`);
        }

        // Use JS to generate latents (faster for simple random generation)
        const latents = createLatents(models["transformer"].inputInfo.hidden_states.dims, $("#seed-input").value).data;

        // Capture original tensors to restore later
        const tensorA = models["transformer"].feed.hidden_states;
        const tensorB = models["scheduler_step"].fetches.latents_out;

        writeTensor(tensorA, latents);

        for (let i = 0; i < config.numInferenceSteps; i++) {
            start = performance.now();
            // Inference prepare for Transformer
            models["transformer"].feed.encoder_hidden_states = models["text_encoder"].fetches["encoder_hidden_state"];
            writeTensor(models["transformer"].feed.timestep, new Float32Array([timesteps[i]]));

            // Run Transformer
            await runModel(models["transformer"]);
            const transformerRunTime = (performance.now() - start).toFixed(2);

            if (getMode()) {
                log(`[Session Run] Transformer execution time ${i}: ${transformerRunTime}ms`);
            } else {
                log(`[Session Run] Transformer completed`);
            }

            // Use ONNX helper model for the scheduler Euler step
            start = performance.now();
            writeTensor(models["scheduler_step"].feed.step_info, new Float32Array([i, config.numInferenceSteps]));

            await runModel(models["scheduler_step"]);

            // Ping-pong buffer swap to avoid using same tensor as input and output
            const nextInput = models["scheduler_step"].fetches.latents_out;
            const nextOutput = models["scheduler_step"].feed.latents;

            models["scheduler_step"].feed.latents = nextInput;
            models["scheduler_step"].fetches.latents_out = nextOutput;

            models["transformer"].feed.hidden_states = nextInput;

            const schedulerRunTime = (performance.now() - start).toFixed(2);
            if (getMode()) {
                log(`[Session Run] Scheduler step execution time ${i}: ${schedulerRunTime}ms`);
            } else {
                log(`[Session Run] Scheduler step completed`);
            }
        }

        // Inference prepare for VAE Decoder
        models["vae_pre_process"].feed.latents = models["transformer"].feed.hidden_states;

        // Use ONNX helper model for squeeze + VAE scaling
        start = performance.now();
        await runModel(models["vae_pre_process"]);
        const vaePreProcessTime = (performance.now() - start).toFixed(2);
        if (getMode()) {
            log(`[Session Run] VAE pre-processing execution time: ${vaePreProcessTime}ms`);
        } else {
            log(`[Session Run] VAE pre-processing completed`);
        }

        // Run VAE Decoder
        start = performance.now();
        await runModel(models["vae_decoder"]);

        const pixSize = sizeOfShape(models["vae_decoder"].outputInfo.sample.dims);
        const pix = new Float32Array(pixSize);
        await readTensor(models["vae_decoder"].fetches.sample, pix);

        let vaeRunTime = (performance.now() - start).toFixed(2);

        if (getMode()) {
            log(`[Session Run] VAE Decoder execution time: ${vaeRunTime}ms`);
        } else {
            log(`[Session Run] VAE Decoder completed`);
        }

        start = performance.now();
        drawImage(pix, imageHeight, imageWidth);
        const imageDrawTime = (performance.now() - start).toFixed(2);
        log(`[Image Drawing] drawing image time: ${imageDrawTime}ms`);

        const totalRunTime = (performance.now() - startTotal).toFixed(2);
        if (getMode()) {
            log(`[Total] Total image generation time: ${totalRunTime}ms`);
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
            log(`[Session Run] Safety Checker - NSFW concepts: ${nsfwBuffer[0] ? "Yes" : "No"}`);

            if (nsfwBuffer[0]) {
                $("#img_div").setAttribute("class", "frame done nsfw");
                $("#img_div").setAttribute("title", "Not safe for work (NSFW) content");
            } else {
                $("#img_div").setAttribute("class", "frame done");
            }

            dom["safety_checker"].run.innerHTML = totalScRunTime;
            if (getMode()) {
                log(`[Session Run] Safety Checker execution time: ${totalScRunTime}ms`);
            }
        } else {
            $("#img_div").setAttribute("class", "frame done");
        }

        $("#total_data").innerHTML = `${totalRunTime}ms`;

        // Restore original tensors for next run
        models["transformer"].feed.hidden_states = tensorA;
        models["scheduler_step"].feed.latents = tensorA;
        models["scheduler_step"].fetches.latents_out = tensorB;

        // Dispose intermediate tensors to free memory
        const tensorsToDispose = [
            ...Object.values(models["text_encoder"].feed),
            ...Object.values(models["text_encoder"].fetches),
        ];
        for (const tensor of tensorsToDispose) {
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
        generate.disabled = false;
        $("#resolution-select").disabled = false;
        $("#seed-input").disabled = false;
        $("#random-seed").disabled = false;
        log("[Info] Image generation completed");
    } catch (e) {
        logError("[Error] " + e);
        return;
    }
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

    log("[Load] ONNX Runtime loaded");

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

    switch (config.provider) {
        case "webgpu":
            if (!("gpu" in navigator)) {
                throw new Error("webgpu is NOT supported");
            }
            opt.executionProviders = [
                {
                    name: "webgpu",
                },
            ];
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

    // Initialize resolution
    const resolutionSelect = $("#resolution-select");

    resolutionSelect.value = config.resolution.toString();
    resolutionSelect.addEventListener("change", e => {
        const res = parseInt(e.target.value);
        config.resolution = res;
        config.numInferenceSteps = res === 1024 ? 3 : 9;
        updateScheduler();
    });

    prompt.value =
        "极具氛围感的暗调人像，一位优雅的中国美女在黑暗的房间里。一束强光通过遮光板，在她的脸上投射出一个清晰的闪电形状的光影，正好照亮一只眼睛。高对比度，明暗交界清晰，神秘感，莱卡相机色调。";

    // Event listener for Ctrl + Enter or CMD + Enter
    prompt.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "Enter") {
            generateImage();
        }
    });
    generate.addEventListener("click", () => {
        generateImage();
    });

    // Seed randomize button
    const randomSeedBtn = $("#random-seed");
    randomSeedBtn.addEventListener("click", () => {
        $("#seed-input").value = Math.floor(Math.random() * 2147483647);
    });

    // Initialize with a random seed on load
    $("#seed-input").value = Math.floor(Math.random() * 2147483647);

    const loadModelUi = () => {
        // Show performance data table when loading starts
        const dataPanel = $("#data");
        if (dataPanel && dataPanel.classList.contains("hide")) {
            dataPanel.classList.remove("hide");
        }

        if (!config.safetyChecker) {
            delete models["safety_checker"];
            delete models["sc_prep"];
        }
        loading = loadModels(models);
        $("#img_div").setAttribute("class", "frame loadwave");
        buttons.setAttribute("class", "button-group key action-buttons loading");
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
                models["scheduler_step"]?.sess,
                models["vae_pre_process"]?.sess,
                models["vae_decoder"]?.sess,
                models["sc_prep"]?.sess,
                models["safety_checker"]?.sess,
            ];

            Promise.allSettled(sessions.filter(session => session).map(session => session?.release())).catch(error =>
                console.error("Session release error:", error),
            );

            load.disabled = false;
            buttons.setAttribute("class", "button-group key action-buttons");
            generate.disabled = true;
            $("#user-input").setAttribute("class", "form-control");
            updateLoadWave(0.0);
            $("#img_div").setAttribute("class", "frame");
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
