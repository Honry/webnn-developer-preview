/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
// An example how to run sdxl-turbo with webnn in onnxruntime-web.
//

import { AutoTokenizer, env } from "https://cdn.jsdelivr.net/npm/@xenova/transformers/dist/transformers.js";
import {
    $,
    $$,
    log,
    logError,
    setupORT,
    showCompatibleChromiumVersion,
    getHuggingFaceDomain,
    remapHuggingFaceDomainIfNeeded,
    checkRemoteEnvironment,
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
let textEncoderFetchProgress = 0;
let textEncoder2FetchProgress = 0;
let unetFetchProgress = 0;
let vaeDecoderFetchProgress = 0;
let textEncoderCompileProgress = 0;
let textEncoder2CompileProgress = 0;
let unetCompileProgress = 0;
let vaeDecoderCompileProgress = 0;
let scFetchProgress = 0;
let scCompileProgress = 0;
let textEncoderFetch = null;
let textEncoderCreate = null;
let textEncoder2Fetch = null;
let textEncoder2Create = null;
let textEncoderRun = null;
let textEncoder2Run = null;
let unetFetch = null;
let unetCreate = null;
let unetRun = null;
let vaeRun = null;
let scFetch = null;
let scCreate = null;
let scRun = null;
let vaeFetch = null;
let vaeCreate = null;
let runTotal = null;
let generate = null;
let load = null;
let buttons = null;
let loadwave = null;
let loadwaveData = null;
let progress = 0;
let loading;
let webnnStatus;

const config = getConfig();

const opt = {
    logSeverityLevel: config.verbose ? 0 : 3, // 0: verbose, 1: info, 2: warning, 3: error
};
let path = "../../demos/sdxl-turbo/models/tokenizer";
if (checkRemoteEnvironment()) {
    path = "webnn/sdxl-turbo-webnn";
    await remapHuggingFaceDomainIfNeeded(env);
}

const tokenizer = await AutoTokenizer.from_pretrained(path);
const tokenizer2 = await AutoTokenizer.from_pretrained(path + "_2");

const batchSize = config.images;
const imageSize = 512;
const models = {
    text_encoder: {
        name: "Text Encoder",
        url: `text_encoder/model${config.usePrunedModels ? "_pruned" : ""}.onnx`,
        has_external_data: true,
        size: "118MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: 1,
                sequence_length: 77,
            },
        },
        inputInfo: {
            input_ids: { dataType: "int32", dims: [1, 77], writable: true },
        },
        outputInfo: {
            "hidden_states.11": { dataType: "float32", dims: [1, 77, 768] },
        },
    },
    text_encoder_2: {
        name: "Text Encoder 2",
        url: `text_encoder_2/model${config.usePrunedModels ? "_pruned" : ""}.onnx`,
        has_external_data: true,
        size: "461MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: 1,
                sequence_length: 77,
            },
        },
        inputInfo: {
            input_ids: { dataType: "int64", dims: [1, 77], writable: true },
        },
        outputInfo: {
            "hidden_states.31": { dataType: "float32", dims: [1, 77, 1280] },
            text_embeds: { dataType: "float32", dims: [1, 1280] },
        },
    },
    concat: {
        // A small model to concat the two text encoder outputs.
        name: "Concat Model",
        url: "concat/model.onnx",
        has_external_data: false,
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch_size: batchSize,
            },
            graphOptimizationLevel: config.provider === "webgpu" ? "disabled" : "all",
        },
        inputInfo: {
            hidden_states_1: { dataType: "float32", dims: [1, 77, 768] },
            hidden_states_2: { dataType: "float32", dims: [1, 77, 1280] },
            text_embeds: { dataType: "float32", dims: [1, 1280] },
            sample: { dataType: "int32", dims: [batchSize], writable: true, readable: true },
        },
        outputInfo: {
            prompt_embeds: { dataType: "float32", dims: [batchSize, 77, 2048] },
            pooled_prompt_embeds: { dataType: "float32", dims: [batchSize, 1280] },
        },
    },
    latents: {
        // A small model to handle latents scaling.
        name: "Latents Model",
        url: "latents/model.onnx",
        has_external_data: false,
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 4,
                height: imageSize / 8,
                width: imageSize / 8,
            },
        },
        inputInfo: {
            sample: {
                dataType: "float32",
                dims: [batchSize, 4, imageSize / 8, imageSize / 8],
                writable: true,
                readable: true,
            },
        },
        outputInfo: {
            latents: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
            latentModelInput: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
        },
    },
    unet: {
        name: "UNet",
        url: "unet/model.onnx",
        has_external_data: false,
        size: "1.83GB",
        opt: {
            freeDimensionOverrides: {
                unet_sample_batch: batchSize,
                unet_sample_channels: 4,
                unet_sample_height: imageSize / 8,
                unet_sample_width: imageSize / 8,
                unet_time_batch: 1,
                unet_hidden_batch: batchSize,
                unet_hidden_sequence: 77,
                unet_text_embeds_batch: batchSize,
                unet_text_embeds_size: 1280,
                unet_time_ids_batch: batchSize,
                unet_time_ids_size: 6,
            },
        },
        inputInfo: {
            sample: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
            timestep: { dataType: "float32", dims: [1], writable: true },
            encoder_hidden_states: { dataType: "float32", dims: [batchSize, 77, 2048] },
            text_embeds: { dataType: "float32", dims: [batchSize, 1280] },
            time_ids: { dataType: "float32", dims: [batchSize, 6], writable: true },
        },
        outputInfo: {
            out_sample: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
        },
    },
    scheduler: {
        // A small model to perform scheduler calculations.
        name: "Scheduler Model",
        url: "scheduler/model.onnx",
        has_external_data: false,
        size: "1KB",
        opt: {
            freeDimensionOverrides: {
                batch: batchSize,
                channels: 4,
                height: imageSize / 8,
                width: imageSize / 8,
            },
        },
        inputInfo: {
            sample: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
            out_sample: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
        },
        outputInfo: {
            prevSample: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
        },
    },
    vae_decoder: {
        name: "VAE Decoder",
        url: "vae_decoder/model.onnx",
        has_external_data: true,
        size: "96.2MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: batchSize,
                num_channels_latent: 4,
                height_latent: imageSize / 8,
                width_latent: imageSize / 8,
            },
        },
        inputInfo: {
            latent_sample: { dataType: "float32", dims: [batchSize, 4, imageSize / 8, imageSize / 8] },
        },
        outputInfo: {
            sample: { dataType: "float32", dims: [batchSize, 3, imageSize, imageSize], readable: true },
        },
    },
    safety_checker: {
        name: "Safety Checker",
        // url: "safety_checker/safety_checker_int32_reduceSum.onnx",
        url: "safety_checker/safety_checker_int32_reduceSum_no_images_input.onnx",
        has_external_data: false,
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
            clip_input: { dataType: "float32", dims: [batchSize, 3, 224, 224], writable: true },
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
        model: location.href.includes("github.io")
            ? "https://huggingface.co/microsoft/sdxl-turbo-webnn/resolve/main"
            : "models",
        mode: "none",
        safetyChecker: true,
        provider: "webnn",
        deviceType: "gpu",
        useQdq: false,
        useIOBinding: false,
        usePrunedModels: false,
        images: 4,
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

    return config;
}

const getQueryValue = name => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

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
            if (config.safetyChecker) {
                if (name.includes("text_encoder_model")) {
                    textEncoderFetchProgress = 5.0;
                } else if (name.includes("text_encoder_2_model")) {
                    textEncoder2FetchProgress = 15.0;
                } else if (name.includes("unet")) {
                    unetFetchProgress = 48.0;
                } else if (name.includes("vae_decoder")) {
                    vaeDecoderFetchProgress = 3.0;
                } else if (name.includes("safety_checker")) {
                    scFetchProgress = 17.0;
                }
            } else {
                if (name.includes("text_encoder_model")) {
                    textEncoderFetchProgress = 5.0;
                } else if (name.includes("text_encoder_2_model")) {
                    textEncoder2FetchProgress = 15.0;
                } else if (name.includes("unet")) {
                    unetFetchProgress = 65.0;
                } else if (name.includes("vae_decoder")) {
                    vaeDecoderFetchProgress = 3.0;
                }
            }

            updateProgress();
            updateLoadWave(progress.toFixed(2));
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
    let loaded = 0;

    const reader = response.body.getReader();
    async function read() {
        const { done, value } = await reader.read();
        if (done) return;

        let newLoaded = loaded + value.length;
        let fetchProgress = (newLoaded / contentLength) * 100;

        if (!config.safetyChecker) {
            if (name.includes("text_encoder_model")) {
                textEncoderFetchProgress = 0.05 * fetchProgress;
            } else if (name.includes("text_encoder_2_model")) {
                textEncoder2FetchProgress = 0.15 * fetchProgress;
            } else if (name.includes("unet")) {
                unetFetchProgress = 0.65 * fetchProgress;
            } else if (name.includes("vae_decoder")) {
                vaeDecoderFetchProgress = 0.03 * fetchProgress;
            }
        } else {
            if (name.includes("text_encoder_model")) {
                textEncoderFetchProgress = 0.05 * fetchProgress;
            } else if (name.includes("text_encoder_2_model")) {
                textEncoder2FetchProgress = 0.15 * fetchProgress;
            } else if (name.includes("unet")) {
                unetFetchProgress = 0.48 * fetchProgress;
            } else if (name.includes("vae_decoder")) {
                vaeDecoderFetchProgress = 0.03 * fetchProgress;
            } else if (name.includes("safety_checker")) {
                scFetchProgress = 0.17 * fetchProgress;
            }
        }

        updateProgress();
        updateLoadWave(progress.toFixed(2));

        if (newLoaded > total) {
            total = newLoaded;
            let newBuffer = new Uint8Array(total);
            newBuffer.set(buffer);
            buffer = newBuffer;
        }
        buffer.set(value, loaded);
        loaded = newLoaded;
        return read();
    }

    await read();
    return buffer;
}

const getMode = () => {
    return getQueryValue("mode") === "normal" ? false : true;
};

const updateProgress = () => {
    progress =
        textEncoderFetchProgress +
        textEncoder2FetchProgress +
        unetFetchProgress +
        scFetchProgress +
        vaeDecoderFetchProgress +
        textEncoderCompileProgress +
        textEncoder2CompileProgress +
        unetCompileProgress +
        vaeDecoderCompileProgress +
        scCompileProgress;
};

const sizeOfShape = shape => shape.reduce((a, b) => a * b, 1);

/*
 * load models used in the pipeline
 */
async function load_models(models) {
    log("[Load] ONNX Runtime Execution Provider: " + config.provider);
    log("[Load] ONNX Runtime EP device type: " + config.deviceType);
    updateLoadWave(0.0);
    load.disabled = true;
    try {
        for (const [name, model] of Object.entries(models)) {
            const modelNameInLog = model.name;
            let start = performance.now();
            let modelUrl = `${config.model + (config.useQdq ? "-qdq" : "")}/${model.url}`;
            if (modelUrl.includes("huggingface.co")) {
                await getHuggingFaceDomain().then(domain => {
                    modelUrl = modelUrl.replace("huggingface.co", domain);
                });
            }
            log(`[Load] Loading model ${modelNameInLog} · ${model.size}`);
            const modelBuffer = await getModelOPFS(`sdxl-turbo_${modelUrl.replace(/\//g, "_")}`, modelUrl, false);
            if (model.has_external_data) {
                const externalDataBytes = await getModelOPFS(
                    `sdxl-turbo_${modelUrl.replace(/\//g, "_")}_external`,
                    `${modelUrl}.data`,
                    false,
                );
                opt.externalData = [
                    {
                        data: externalDataBytes,
                        path: "model.onnx.data",
                    },
                ];
            }
            let modelFetchTime = (performance.now() - start).toFixed(2);
            if (name == "text_encoder") {
                textEncoderFetch.innerHTML = modelFetchTime;
            } else if (name == "text_encoder_2") {
                textEncoder2Fetch.innerHTML = modelFetchTime;
            } else if (name == "unet") {
                unetFetch.innerHTML = modelFetchTime;
            } else if (name == "vae_decoder") {
                vaeFetch.innerHTML = modelFetchTime;
            } else if (name == "safety_checker") {
                scFetch.innerHTML = modelFetchTime;
            }
            log(`[Load] ${modelNameInLog} loaded · ${modelFetchTime}ms`);
            log(`[Session Create] Beginning ${modelNameInLog}`);

            start = performance.now();
            const sess_opt = { ...opt, ...model.opt };
            console.log(sess_opt);

            models[name].sess = await ort.InferenceSession.create(modelBuffer, sess_opt);
            let createTime = (performance.now() - start).toFixed(2);

            if (config.safetyChecker) {
                if (name == "text_encoder") {
                    textEncoderCreate.innerHTML = createTime;
                    textEncoderCompileProgress = 1;
                } else if (name == "text_encoder_2") {
                    textEncoder2Create.innerHTML = createTime;
                    textEncoder2CompileProgress = 2;
                } else if (name == "unet") {
                    unetCreate.innerHTML = createTime;
                    unetCompileProgress = 7;
                } else if (name == "vae_decoder") {
                    vaeCreate.innerHTML = createTime;
                    vaeDecoderCompileProgress = 1;
                } else if (name == "safety_checker") {
                    scCreate.innerHTML = createTime;
                    scCompileProgress = 2;
                }
            } else {
                if (name == "text_encoder") {
                    textEncoderCreate.innerHTML = createTime;
                    textEncoderCompileProgress = 1;
                } else if (name == "text_encoder_2") {
                    textEncoder2Create.innerHTML = createTime;
                    textEncoder2CompileProgress = 1;
                } else if (name == "unet") {
                    unetCreate.innerHTML = createTime;
                    unetCompileProgress = 9;
                } else if (name == "vae_decoder") {
                    vaeCreate.innerHTML = createTime;
                    vaeDecoderCompileProgress = 1;
                }
            }
            updateProgress();
            updateLoadWave(progress.toFixed(2));

            if (getMode()) {
                log(`[Session Create] Create ${modelNameInLog} completed · ${createTime}ms`);
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
    let image_area = $$("#image_area>div");
    image_area.forEach(i => {
        i.setAttribute("class", "frame ready");
    });
    buttons.setAttribute("class", "button-group key loaded");
    generate.disabled = false;
    $("#user-input").setAttribute("class", "form-control enabled");
}

const getDataTypeSize = dataType => {
    switch (dataType) {
        case "float32":
            return 4;
        case "float16":
            return 2;
        case "int32":
            return 4;
        case "int64":
            return 8;
        case "uint8":
            return 1;
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
        const arrayBuffer = data.buffer;
        const gpuBuffer = tensor.gpuBuffer;
        const commandEncoder = gpuDevice.createCommandEncoder();
        const tempBuffer = gpuDevice.createBuffer({
            size: arrayBuffer.byteLength,
            usage: GPUBufferUsage.COPY_SRC,
            mappedAtCreation: true,
        });
        const mapping = tempBuffer.getMappedRange();
        new data.constructor(mapping).set(data);
        tempBuffer.unmap();
        commandEncoder.copyBufferToBuffer(tempBuffer, 0, gpuBuffer, 0, arrayBuffer.byteLength);
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
    models["text_encoder"].feed = {
        input_ids: await createTensor(models["text_encoder"].inputInfo.input_ids),
    };
    models["text_encoder"].fetches = {
        "hidden_states.11": await createTensor(models["text_encoder"].outputInfo["hidden_states.11"]),
    };

    // text_encoder_2
    models["text_encoder_2"].feed = {
        input_ids: await createTensor(models["text_encoder_2"].inputInfo.input_ids),
    };
    models["text_encoder_2"].fetches = {
        "hidden_states.31": await createTensor(models["text_encoder_2"].outputInfo["hidden_states.31"]),
        text_embeds: await createTensor(models["text_encoder_2"].outputInfo.text_embeds),
    };

    // concat
    models["concat"].feed = {
        hidden_states_1: models["text_encoder"].fetches["hidden_states.11"],
        hidden_states_2: models["text_encoder_2"].fetches["hidden_states.31"],
        text_embeds: models["text_encoder_2"].fetches.text_embeds,
        sample: await createTensor(models["concat"].inputInfo.sample),
    };
    // A dummy tensor with shape [batchSize] to allow shape inference
    // Initialize the tensor early to avoid re-allocation during execution
    writeTensor(models["concat"].feed.sample, new Int32Array(batchSize));
    models["concat"].fetches = {
        prompt_embeds: await createTensor(models["concat"].outputInfo.prompt_embeds),
        pooled_prompt_embeds: await createTensor(models["concat"].outputInfo.pooled_prompt_embeds),
    };

    // latents
    models["latents"].feed = {
        sample: await createTensor(models["latents"].inputInfo.sample),
    };
    // Initialize the tensor early to avoid re-allocation during execution
    writeTensor(models["latents"].feed.sample, new Float32Array(sizeOfShape(models["latents"].inputInfo.sample.dims)));
    models["latents"].fetches = {
        latents: await createTensor(models["latents"].outputInfo.latents),
        latentModelInput: await createTensor(models["latents"].outputInfo.latentModelInput),
    };

    // unet
    models["unet"].feed = {
        sample: models["latents"].fetches.latentModelInput,
        timestep: await createTensor(models["unet"].inputInfo.timestep),
        encoder_hidden_states: models["concat"].fetches.prompt_embeds,
        text_embeds: models["concat"].fetches.pooled_prompt_embeds,
        time_ids: await createTensor(models["unet"].inputInfo.time_ids),
    };
    // Initialize the tensors early to avoid re-allocation during execution
    writeTensor(models["unet"].feed.timestep, new Float32Array([999]));
    writeTensor(models["unet"].feed.time_ids, get_add_time_ids(imageSize, imageSize, batchSize));
    models["unet"].fetches = {
        out_sample: await createTensor(models["unet"].outputInfo.out_sample),
    };

    // scheduler
    models["scheduler"].feed = {
        out_sample: models["unet"].fetches.out_sample,
        sample: models["latents"].fetches.latents,
    };
    models["scheduler"].fetches = {
        prevSample: await createTensor(models["scheduler"].outputInfo.prevSample),
    };

    // vae_decoder
    models["vae_decoder"].feed = {
        latent_sample: models["scheduler"].fetches.prevSample,
    };
    models["vae_decoder"].fetches = {
        sample: await createTensor(models["vae_decoder"].outputInfo.sample),
    };

    // safety_checker
    if (config.safetyChecker) {
        models["safety_checker"].feed = {
            clip_input: await createTensor(models["safety_checker"].inputInfo.clip_input),
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

/*
 * Get the "add_time_ids" for SDXL (micro-conditioning).
 * These correspond to: [original_height, original_width, crop_top, crop_left, target_height, target_width]
 */
function get_add_time_ids(height, width, batchSize = 1) {
    // 1. Define the 6 basic values for the time_ids
    // [original_height, original_width, crop_top, crop_left, target_height, target_width]
    const time_ids_base = [height, width, 0, 0, height, width];

    // 2. Construct the data array
    // Final Shape: [batchSize, 6]
    const data = new Float32Array(batchSize * 6);

    for (let i = 0; i < batchSize; i++) {
        data.set(time_ids_base, i * 6);
    }

    return data;
}

/**
 * Directly process VAE output for Safety Checker input.
 * Performs bilinear interpolation (resize) and normalization in one pass.
 * Input: NCHW, range [-1, 1] (VAE output)
 * Output: NCHW, normalized (Safety Checker input)
 * This avoids the overhead of converting to RGBA, drawing to Canvas, and reading back.
 *
 * @param {Float32Array} vaeOutput - The raw output from VAE Decoder
 * @param {number} batchSize - Number of images in the batch
 * @param {number} srcSize - Source image size (e.g., 512)
 * @param {number} dstSize - Destination image size (e.g., 224)
 */
function get_safety_checker_feed_from_vae_output(vaeOutput, batchSize, srcSize, dstSize) {
    const mean = [0.48145466, 0.4578275, 0.40821073];
    const std = [0.26862954, 0.26130258, 0.27577711];

    // Precompute scaling factors to go from [-1, 1] directly to Normalized
    // val_0_1 = val_vae * 0.5 + 0.5
    // val_norm = (val_0_1 - mean) / std
    // val_norm = (val_vae * 0.5 + 0.5 - mean) / std
    // val_norm = val_vae * (0.5/std) + (0.5 - mean)/std

    const scale = mean.map((m, i) => 0.5 / std[i]);
    const offset = mean.map((m, i) => (0.5 - m) / std[i]);

    const dstTotalSize = batchSize * 3 * dstSize * dstSize;
    const dstData = new Float32Array(dstTotalSize);

    const xRatio = srcSize / dstSize;
    const yRatio = srcSize / dstSize;

    for (let b = 0; b < batchSize; b++) {
        for (let c = 0; c < 3; c++) {
            const srcOffset = (b * 3 + c) * srcSize * srcSize;
            const dstOffset = (b * 3 + c) * dstSize * dstSize;

            const cScale = scale[c];
            const cOffset = offset[c];

            for (let y = 0; y < dstSize; y++) {
                // Bilinear Y
                const ySrc = y * yRatio;
                const y0 = Math.floor(ySrc);
                const y1 = Math.min(y0 + 1, srcSize - 1);
                const yWeight = ySrc - y0;

                for (let x = 0; x < dstSize; x++) {
                    // Bilinear X
                    const xSrc = x * xRatio;
                    const x0 = Math.floor(xSrc);
                    const x1 = Math.min(x0 + 1, srcSize - 1);
                    const xWeight = xSrc - x0;

                    // Fetch 4 neighbors
                    const p00 = vaeOutput[srcOffset + y0 * srcSize + x0];
                    const p01 = vaeOutput[srcOffset + y0 * srcSize + x1];
                    const p10 = vaeOutput[srcOffset + y1 * srcSize + x0];
                    const p11 = vaeOutput[srcOffset + y1 * srcSize + x1];

                    // Interpolate
                    const val =
                        p00 * (1 - xWeight) * (1 - yWeight) +
                        p01 * xWeight * (1 - yWeight) +
                        p10 * (1 - xWeight) * yWeight +
                        p11 * xWeight * yWeight;

                    // Normalize and store
                    dstData[dstOffset + y * dstSize + x] = val * cScale + cOffset;
                }
            }
        }
    }

    return {
        clip_input: new ort.Tensor("float32", dstData, [batchSize, 3, dstSize, dstSize]),
    };
}

/**
 * draw images from pixel data
 * @param {Float32Array} pix
 * @param {number} imageIndex
 * @param {number} height
 * @param {number} width
 */
function draw_image(pix, imageIndex, height, width) {
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

async function generate_image() {
    generate.disabled = true;
    const imgDivs = [img_div_0, img_div_1, img_div_2, img_div_3];
    imgDivs.forEach(div => div.setAttribute("class", "frame"));

    try {
        textEncoderRun.innerHTML = "";
        textEncoder2Run.innerHTML = "";
        unetRun.innerHTML = "";
        vaeRun.innerHTML = "";
        runTotal.innerHTML = "";
        scRun.innerHTML = "";

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
        const { input_ids: inputIds } = await tokenizer(prompt.value, {
            padding: "max_length",
            maxLength: 77,
            truncation: true,
            return_tensor: false,
        });

        // Run Text Encoder 1 (Batch 1) - Optimization: Run once, then repeat
        const inputIdsData = new Int32Array(inputIds);
        writeTensor(models["text_encoder"].feed.input_ids, inputIdsData);
        await runModel(models["text_encoder"]);

        const sessionRunTimeTextEncode = (performance.now() - start).toFixed(2);
        textEncoderRun.innerHTML = sessionRunTimeTextEncode;

        if (getMode()) {
            log(`[Session Run] Text Encoder execution time: ${sessionRunTimeTextEncode}ms`);
        } else {
            log(`[Session Run] Text Encoder completed`);
        }

        // Run Text Encoder 2 (Batch 1)
        start = performance.now();
        const { input_ids: inputIds2 } = await tokenizer2(prompt.value, {
            padding: "max_length",
            maxLength: 77,
            truncation: true,
            return_tensor: false,
        });
        const inputIds2Data = new BigInt64Array(inputIds2.map(x => BigInt(x)));
        writeTensor(models["text_encoder_2"].feed.input_ids, inputIds2Data);
        await runModel(models["text_encoder_2"]);

        const sessionRunTimeTextEncode2 = (performance.now() - start).toFixed(2);
        textEncoder2Run.innerHTML = sessionRunTimeTextEncode2;

        if (getMode()) {
            log(`[Session Run] Text Encoder 2 execution time: ${sessionRunTimeTextEncode2}ms`);
        } else {
            log(`[Session Run] Text Encoder 2 completed`);
        }

        // Inference prepare for UNet

        // Construct promptEmbeds and pooledPromptEmbeds (Batch N) by repeating the single batch output
        start = performance.now();
        await runModel(models["concat"]);
        if (getMode()) {
            log(`[Session Run] concat execution time: ${(performance.now() - start).toFixed(2)}ms`);
        } else {
            log(`[Session Run] concat completed`);
        }

        // Initialize latents (Batch N) for random noise
        start = performance.now();
        await runModel(models["latents"]);
        if (getMode()) {
            log(`[Session Run] latents execution time: ${(performance.now() - start).toFixed(2)}ms`);
        } else {
            log(`[Session Run] latents completed`);
        }

        // Run UNet
        start = performance.now();
        await runModel(models["unet"]);

        const unetRunTime = (performance.now() - start).toFixed(2);
        $(`#unetRun`).innerHTML = unetRunTime;

        if (getMode()) {
            log(`[Session Run] UNet execution time: ${unetRunTime}ms`);
        } else {
            log(`[Session Run] UNet completed`);
        }

        // Inference parepare for VAE Decoder

        // scheduler
        start = performance.now();
        await runModel(models["scheduler"]);
        if (getMode()) {
            log(`[Session Run] Scheduler execution time: ${(performance.now() - start).toFixed(2)}ms`);
        } else {
            log(`[Session Run] Scheduler completed`);
        }

        // Run VAE Decoder
        start = performance.now();
        await runModel(models["vae_decoder"]);

        let pix = new Float32Array(sizeOfShape(models["vae_decoder"].outputInfo.sample.dims));
        await readTensor(models["vae_decoder"].fetches.sample, pix);

        let vaeRunTime = (performance.now() - start).toFixed(2);
        $(`#vaeRun`).innerHTML = vaeRunTime;
        if (getMode()) {
            log(`[Session Run] VAE Decoder execution time: ${vaeRunTime}ms`);
        } else {
            log(`[Session Run] VAE Decoder completed`);
        }

        start = performance.now();
        for (let i = 0; i < batchSize; i++) {
            const size = 3 * imageSize * imageSize;
            const offset = i * size;
            const subPix = pix.subarray(offset, offset + size);
            draw_image(subPix, i, imageSize, imageSize);
        }
        const imageDrawTime = (performance.now() - start).toFixed(2);
        log(`[Images Drawing] drawing ${batchSize} images time: ${imageDrawTime}ms`);

        const totalRunTime = (performance.now() - startTotal).toFixed(2);
        if (getMode()) {
            log(`[Total] Total images generation time: ${totalRunTime}ms`);
        }
        $("#runTotal").innerHTML = totalRunTime;

        if (config.safetyChecker) {
            // 1. Prepare Batch Data (Directly from VAE output)
            let scPrepStart = performance.now();
            const feed = get_safety_checker_feed_from_vae_output(pix, batchSize, imageSize, 224);

            if (getMode()) {
                log(
                    `[Session Run] Safety Checker input prepared time: ${(performance.now() - scPrepStart).toFixed(2)}ms`,
                );
            }

            // 2. Write Tensor and Run Once
            writeTensor(models["safety_checker"].feed.clip_input, feed.clip_input.data);

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

            $("#scRun").innerHTML = totalScRunTime;
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
    const links = `· <a href="./?devicetype=gpu">GPU</a> · <a id="npu_link" href="./?devicetype=npu">NPU</a>`;
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
    }
    await checkWebNN();

    const elementIds = [
        "#textEncoderFetch",
        "#textEncoderCreate",
        "#textEncoder2Fetch",
        "#textEncoder2Create",
        "#textEncoderRun",
        "#textEncoder2Run",
        "#unetRun",
        "#runTotal",
        "#unetFetch",
        "#unetCreate",
        "#vaeFetch",
        "#vaeCreate",
        "#vaeRun",
        "#scFetch",
        "#scCreate",
        "#scRun",
    ];

    [
        textEncoderFetch,
        textEncoder2Fetch,
        textEncoderCreate,
        textEncoder2Create,
        textEncoderRun,
        textEncoder2Run,
        unetRun,
        runTotal,
        unetFetch,
        unetCreate,
        vaeFetch,
        vaeCreate,
        vaeRun,
        scFetch,
        scCreate,
        scRun,
    ] = elementIds.map(id => $(id));

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

    // prompt.value = "A cinematic shot of a baby racoon wearing an intricate italian priest robe.";
    // prompt.value =
    // "a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, high detail, 8k";
    prompt.value =
        "A scene mountain landscape at sunrise, soft golden light, clear sky, very detailed, photo-realistic style." +
        " Add a crystal clear lake reflecting the mountain." +
        " Add a wooden cabin near the shore." +
        " Surround the cabin with tall palm and coconut trees.";
    // Event listener for Ctrl + Enter or CMD + Enter
    prompt.addEventListener("keydown", e => {
        if (e.ctrlKey && e.key === "Enter") {
            generate_image();
        }
    });
    generate.addEventListener("click", () => {
        generate_image();
    });

    const load_model_ui = () => {
        if (!config.safetyChecker) {
            delete models["safety_checker"];
        }
        loading = load_models(models);
        const imgDivs = [img_div_0, img_div_1, img_div_2, img_div_3];
        imgDivs.forEach(div => div.setAttribute("class", "frame loadwave"));
        buttons.setAttribute("class", "button-group key loading");
    };

    load.addEventListener("click", () => {
        load_model_ui();
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
                models["text_encoder_2"]?.sess,
                models["unet"]?.sess,
                models["vae_decoder"]?.sess,
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
            textEncoderFetchProgress = 0;
            textEncoder2FetchProgress = 0;
            unetFetchProgress = 0;
            vaeDecoderFetchProgress = 0;
            textEncoderCompileProgress = 0;
            textEncoder2CompileProgress = 0;
            unetCompileProgress = 0;
            vaeDecoderCompileProgress = 0;
            scFetchProgress = 0;
            scCompileProgress = 0;
            textEncoderFetch.innerHTML = "";
            textEncoder2Fetch.innerHTML = "";
            textEncoderCreate.innerHTML = "";
            textEncoder2Create.innerHTML = "";
            textEncoderRun.innerHTML = "";
            textEncoder2Run.innerHTML = "";
            unetFetch.innerHTML = "";
            unetCreate.innerHTML = "";
            unetRun.innerHTML = "";
            vaeRun.innerHTML = "";
            scFetch.innerHTML = "";
            scCreate.innerHTML = "";
            scRun.innerHTML = "";
            vaeFetch.innerHTML = "";
            vaeCreate.innerHTML = "";
            runTotal.innerHTML = "";
        }
    });
};

if (document.readyState !== "loading") {
    ui();
} else {
    document.addEventListener("DOMContentLoaded", ui, false);
}
