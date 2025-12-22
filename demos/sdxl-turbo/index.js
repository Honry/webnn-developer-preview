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
    convertToFloat16OrUint16Array,
    // convertToFloat32Array,
    log,
    logError,
    setupORT,
    showCompatibleChromiumVersion,
    // toHalf,
    getHuggingFaceDomain,
    remapHuggingFaceDomainIfNeeded,
    checkRemoteEnvironment,
} from "../../assets/js/common_utils.js";

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

/*
 * initialize latents with random noise
 */
function randn_latents(shape, noise_sigma) {
    function randn() {
        // Use the Box-Muller transform
        let u = Math.random();
        while (u === 0) u = Math.random(); // avoid log(0)
        let v = Math.random();
        let z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        return z;
    }
    let size = 1;
    shape.forEach(element => {
        size *= element;
    });

    let data = new Float32Array(size);
    // Loop over the shape dimensions
    for (let i = 0; i < size; i++) {
        data[i] = randn() * noise_sigma;
    }
    return data;
}

let device = "gpu";
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
            if (getSafetyChecker()) {
                if (name == "sdxl-turbo_text_encoder") {
                    textEncoderFetchProgress = 5.0;
                } else if (name == "sdxl-turbo_text_encoder_2") {
                    textEncoder2FetchProgress = 15.0;
                } else if (name == "sdxl-turbo_unet") {
                    unetFetchProgress = 48.0;
                } else if (name == "sdxl-turbo_vae_decoder") {
                    vaeDecoderFetchProgress = 3.0;
                } else if (name == "sdxl-turbo_safety_checker") {
                    scFetchProgress = 17.0;
                }
            } else {
                if (name == "sdxl-turbo_text_encoder") {
                    textEncoderFetchProgress = 5.0;
                } else if (name == "sdxl-turbo_text_encoder_2") {
                    textEncoder2FetchProgress = 15.0;
                } else if (name == "sdxl-turbo_unet") {
                    unetFetchProgress = 65.0;
                } else if (name == "sdxl-turbo_vae_decoder") {
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

        if (!getSafetyChecker()) {
            if (name == "sdxl-turbo_text_encoder") {
                textEncoderFetchProgress = 0.05 * fetchProgress;
            } else if (name == "sdxl-turbo_text_encoder_2") {
                textEncoder2FetchProgress = 0.15 * fetchProgress;
            } else if (name == "sdxl-turbo_unet") {
                unetFetchProgress = 0.65 * fetchProgress;
            } else if (name == "sdxl-turbo_vae_decoder") {
                vaeDecoderFetchProgress = 0.03 * fetchProgress;
            }
        } else {
            if (name == "sdxl-turbo_text_encoder") {
                textEncoderFetchProgress = 0.05 * fetchProgress;
            } else if (name == "sdxl-turbo_text_encoder_2") {
                textEncoder2FetchProgress = 0.15 * fetchProgress;
            } else if (name == "sdxl-turbo_unet") {
                unetFetchProgress = 0.48 * fetchProgress;
            } else if (name == "sdxl-turbo_vae_decoder") {
                vaeDecoderFetchProgress = 0.03 * fetchProgress;
            } else if (name == "sdxl-turbo_safety_checker") {
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

const getSafetyChecker = () => {
    if (getQueryValue("safetychecker")) {
        return getQueryValue("safetychecker") === "true" ? true : false;
    } else {
        return true;
    }
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

/*
 * load models used in the pipeline
 */
async function load_models(models) {
    log("[Load] ONNX Runtime Execution Provider: " + config.provider);
    log("[Load] ONNX Runtime EP device type: " + config.deviceType);
    updateLoadWave(0.0);
    load.disabled = true;

    for (const [name, model] of Object.entries(models)) {
        const modelNameInLog = model.name;
        // try {
        let start = performance.now();
        let modelUrl = `${config.model}/${model.url}`;
        if (modelUrl.includes("huggingface.co")) {
            await getHuggingFaceDomain().then(domain => {
                modelUrl = modelUrl.replace("huggingface.co", domain);
            });
        }
        log(`[Load] Loading model ${modelNameInLog} · ${model.size}`);
        const modelBuffer = await getModelOPFS(`sdxl-turbo_${modelUrl.replace(/\//g, "_")}`, modelUrl, false);
        if (model.has_external_data) {
            const externalDataPath = modelUrl + ".data";
            const externalDataBytes = await getModelOPFS(
                `sdxl-turbo_${modelUrl.replace(/\//g, "_")}_external`,
                externalDataPath,
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

        if (getSafetyChecker()) {
            if (name == "text_encoder") {
                textEncoderCreate.innerHTML = createTime;
                textEncoderCompileProgress = 1;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            } else if (name == "text_encoder_2") {
                textEncoder2Create.innerHTML = createTime;
                textEncoder2CompileProgress = 1;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            } else if (name == "unet") {
                unetCreate.innerHTML = createTime;
                unetCompileProgress = 7;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            } else if (name == "vae_decoder") {
                vaeCreate.innerHTML = createTime;
                vaeDecoderCompileProgress = 1;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            } else if (name == "safety_checker") {
                scCreate.innerHTML = createTime;
                scCompileProgress = 2;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            }
        } else {
            if (name == "text_encoder") {
                textEncoderCreate.innerHTML = createTime;
                textEncoderCompileProgress = 1;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            } else if (name == "text_encoder_2") {
                textEncoder2Create.innerHTML = createTime;
                textEncoder2CompileProgress = 1;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            } else if (name == "unet") {
                unetCreate.innerHTML = createTime;
                unetCompileProgress = 9;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            } else if (name == "vae_decoder") {
                vaeCreate.innerHTML = createTime;
                vaeDecoderCompileProgress = 1;
                updateProgress();
                updateLoadWave(progress.toFixed(2));
            }
        }

        if (getMode()) {
            log(`[Session Create] Create ${modelNameInLog} completed · ${createTime}ms`);
        } else {
            log(`[Session Create] Create ${modelNameInLog} completed`);
        }
        // } catch (e) {
        //     logError(`[Load] ${modelNameInLog} failed, ${e}`);
        //     return;
        // }
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

const config = getConfig();

let path = "../../demos/sdxl-turbo/models/tokenizer";
if (checkRemoteEnvironment()) {
    path = "webnn/sdxl-turbo-webnn";
    await remapHuggingFaceDomainIfNeeded(env);
}

const tokenizer = await AutoTokenizer.from_pretrained(path);
const tokenizer2 = await AutoTokenizer.from_pretrained(path + "_2");

const maxLength = 77;
const batchSize = config.images;
const imageSize = 512;
const numChannelsLatent = 4;
const models = {
    text_encoder: {
        name: "Text Encoder",
        url: "text_encoder/model.onnx",
        has_external_data: true,
        size: "118MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: 1,
                sequence_length: maxLength,
            },
        },
    },
    text_encoder_2: {
        name: "Text Encoder 2",
        url: "text_encoder_2/model.onnx",
        has_external_data: true,
        size: "461MB",
        opt: {
            freeDimensionOverrides: {
                batch_size: 1,
                sequence_length: maxLength,
            },
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
    },
    scheduler: {
        name: "Scheduler",
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
    },
    latents: {
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
    },
    unet: {
        name: "UNet",
        // url: "unet/q4f32f16/model.onnx",
        url: "unet/model.onnx",
        // url: "unet/q4fp32/model.onnx",
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
                unet_hidden_sequence: maxLength,
                unet_text_embeds_batch: batchSize,
                unet_text_embeds_size: 1280,
                unet_time_ids_batch: batchSize,
                unet_time_ids_size: 6,
            },
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
                num_channels_latent: numChannelsLatent,
                height_latent: imageSize / 8,
                width_latent: imageSize / 8,
            },
        },
    },
    safety_checker: {
        name: "Safety Checker",
        url: "safety_checker/safety_checker_int32_reduceSum.onnx",
        has_external_data: false,
        size: "580MB",
        opt: {
            freeDimensionOverrides: {
                batch: 1,
                channels: 3,
                height: 224,
                width: 224,
            },
        },
    },
};

let progress = 0;

let loading;
const sigma = 14.6146;
const gamma = 0;
const vaeScalingFactor = 0.13025; // SDXL uses 1/7.68 as scaling factor for VAE

const opt = {
    executionProviders: [config.provider],
    logSeverityLevel: config.verbose ? 0 : 3, // 0: verbose, 1: info, 2: warning, 3: error
};

/*
 * scale the latents
 */
function scale_model_inputs(t) {
    const d_i = t.data;
    const d_o = new Float32Array(d_i.length);

    const divi = (sigma ** 2 + 1) ** 0.5;
    for (let i = 0; i < d_i.length; i++) {
        d_o[i] = d_i[i] / divi;
    }
    return new ort.Tensor(d_o, t.dims);
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

/*
 * Poor mens EulerA step
 * Since this example is just sdxl-turbo, implement the absolute minimum needed to create an image
 * Maybe next step is to support all sd flavors and create a small helper model in onnx can deal
 * much more efficient with latents.
 */
function step(modelOutput, sample) {
    const d_o = new Float32Array(modelOutput.data.length);
    const prevSample = new ort.Tensor(d_o, modelOutput.dims);
    const sigmaHat = sigma * (gamma + 1);

    for (let i = 0; i < modelOutput.data.length; i++) {
        const predOriginalSample = sample.data[i] - sigmaHat * modelOutput.data[i];
        const derivative = (sample.data[i] - predOriginalSample) / sigmaHat;
        const dt = 0 - sigmaHat;
        d_o[i] = (sample.data[i] + derivative * dt) / vaeScalingFactor;
    }
    return prevSample;
}

function resize_image(imageIndex, targetWidth, targetHeight) {
    // Use img_canvas_test to ensure the input
    const canvas = $(`#img_canvas_test`);
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    let ctx = canvas.getContext("2d", { willReadFrequently: true });
    let canvasSource = $(`#img_canvas_${imageIndex}`);
    ctx.drawImage(canvasSource, 0, 0, canvasSource.width, canvasSource.height, 0, 0, targetWidth, targetHeight);
    let imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);

    return imageData;
}

function get_safety_checker_feed(imageData) {
    const { data, width, height } = imageData;
    const numPixels = width * height;
    const mean = [0.48145466, 0.4578275, 0.40821073];
    const std = [0.26862954, 0.26130258, 0.27577711];

    const clipData = new Float32Array(numPixels * 3);
    const imagesData = new Float32Array(numPixels * 3);

    for (let i = 0; i < numPixels; i++) {
        const srcOffset = i * 4;
        const r = data[srcOffset] / 255;
        const g = data[srcOffset + 1] / 255;
        const b = data[srcOffset + 2] / 255;

        // clip_input: NCHW, Normalized
        clipData[i] = (r - mean[0]) / std[0];
        clipData[i + numPixels] = (g - mean[1]) / std[1];
        clipData[i + 2 * numPixels] = (b - mean[2]) / std[2];

        // images: NHWC, 0-1
        const destOffset = i * 3;
        imagesData[destOffset] = r;
        imagesData[destOffset + 1] = g;
        imagesData[destOffset + 2] = b;
    }

    return {
        clip_input: new ort.Tensor("float16", convertToFloat16OrUint16Array(clipData), [1, 3, height, width]),
        images: new ort.Tensor("float16", convertToFloat16OrUint16Array(imagesData), [1, height, width, 3]),
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

    // try {
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
        maxLength: maxLength,
        truncation: true,
        return_tensor: false,
    });

    // Run Text Encoder 1 (Batch 1) - Optimization: Run once, then repeat
    const inputIdsData = new Int32Array(inputIds);
    const textEncoderOutputs = await models.text_encoder.sess.run({
        input_ids: new ort.Tensor("int32", inputIdsData, [1, maxLength]),
    });

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
        maxLength: maxLength,
        truncation: true,
        return_tensor: false,
    });
    const inputIds2Data = new BigInt64Array(inputIds2.map(x => BigInt(x)));
    const textEncoder2Outputs = await models.text_encoder_2.sess.run({
        input_ids: new ort.Tensor("int64", inputIds2Data, [1, maxLength]),
    });

    const sessionRunTimeTextEncode2 = (performance.now() - start).toFixed(2);
    textEncoder2Run.innerHTML = sessionRunTimeTextEncode2;

    if (getMode()) {
        log(`[Session Run] Text Encoder 2 execution time: ${sessionRunTimeTextEncode2}ms`);
    } else {
        log(`[Session Run] Text Encoder 2 completed`);
    }

    // Inference prepare for UNet
    start = performance.now();

    // Construct promptEmbeds (Batch N) by repeating the single batch output
    // This ensures valid embeddings for ALL images in the batch.

    const promptEmbedsData = new Float32Array(batchSize * maxLength * 2048);
    const te1Output = textEncoderOutputs["hidden_states.11"].data; // [77, 768]
    const te2Output = textEncoder2Outputs["hidden_states.31"].data; // [77, 1280]

    for (let i = 0; i < batchSize; i++) {
        for (let j = 0; j < maxLength; j++) {
            const destOffset = (i * maxLength + j) * 2048;
            // Copy 768 from Text Encoder 1
            promptEmbedsData.set(te1Output.subarray(j * 768, (j + 1) * 768), destOffset);
            // Copy 1280 from Text Encoder 2
            promptEmbedsData.set(te2Output.subarray(j * 1280, (j + 1) * 1280), destOffset + 768);
        }
    }
    const promptEmbeds = new ort.Tensor("float32", promptEmbedsData, [batchSize, maxLength, 2048]);

    // Construct pooledPromptEmbeds (Batch N) by repeating
    const pooledOutput = textEncoder2Outputs.text_embeds.data; // [1280]
    const pooledData = new Float32Array(batchSize * 1280);
    for (let i = 0; i < batchSize; i++) {
        pooledData.set(pooledOutput, i * 1280);
    }
    const pooledPromptEmbeds = new ort.Tensor("float32", pooledData, [batchSize, 1280]);

    // const concatOutputs = await models.concat.sess.run({
    //     hidden_states_1: textEncoderOutputs["hidden_states.11"],
    //     hidden_states_2: textEncoder2Outputs["hidden_states.31"],
    //     text_embeds: textEncoder2Outputs.text_embeds,
    //     // Create a dummy tensor with shape [batchSize] to allow shape inference
    //     sample: new ort.Tensor("int32", new Int32Array(batchSize), [batchSize]),
    // });

    // Initialize latents (Batch N) for random noise
    const latentShape = [batchSize, numChannelsLatent, imageSize / 8, imageSize / 8];
    // const size = batchSize * numChannelsLatent * (imageSize / 8) * (imageSize / 8);
    // const dummyInput = new ort.Tensor("float32", new Float32Array(size), latentShape);

    // const latentsOutputs = await models.latents.sess.run({
    //     sample: dummyInput,
    // });
    const latents = new ort.Tensor(randn_latents(latentShape, sigma), latentShape);
    const latentModelInput = scale_model_inputs(latents);

    // Run UNet
    const feed = {
        sample: latentModelInput, // latentsOutputs.latentModelInput,
        timestep: new ort.Tensor("float32", new Float32Array([999]), [1]),
        encoder_hidden_states: promptEmbeds, // concatOutputs.prompt_embeds,
        text_embeds: pooledPromptEmbeds, // concatOutputs.pooled_prompt_embeds,
        time_ids: new ort.Tensor("float32", get_add_time_ids(imageSize, imageSize, batchSize), [batchSize, 6]),
    };

    const unetOutputs = await models.unet.sess.run(feed);

    const unetRunTime = (performance.now() - start).toFixed(2);
    $(`#unetRun`).innerHTML = unetRunTime;

    if (getMode()) {
        log(`[Session Run] UNet execution time: ${unetRunTime}ms`);
    } else {
        log(`[Session Run] UNet completed`);
    }

    // Inference parepare for VAE Decoder
    start = performance.now();

    // scheduler
    // const schedulerOutputs = await models.scheduler.sess.run({
    //     out_sample: unetOutputs.out_sample,
    //     sample: latents, // latentsOutputs.latents,
    // });

    const newLatents = step(unetOutputs.out_sample, latents);

    // Run VAE Decoder
    const { sample } = await models.vae_decoder.sess.run({
        latent_sample: newLatents, // schedulerOutputs.prevSample,
    });

    let vaeRunTime = (performance.now() - start).toFixed(2);
    $(`#vaeRun`).innerHTML = vaeRunTime;

    if (getMode()) {
        log(`[Session Run] VAE Decoder execution time: ${vaeRunTime}ms`);
    } else {
        log(`[Session Run] VAE Decoder completed`);
    }

    start = performance.now();
    const pix = sample.data;
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

    let totalScRunTime = 0;
    for (let i = 0; i < batchSize; i++) {
        if (getSafetyChecker()) {
            // safety_checker
            const resizedImageData = resize_image(i, 224, 224);
            const safetyCheckerFeed = get_safety_checker_feed(resizedImageData);
            start = performance.now();
            const { has_nsfw_concepts } = await models.safety_checker.sess.run(safetyCheckerFeed);

            let scRunTime = performance.now() - start;
            totalScRunTime += scRunTime;
            if (getMode()) {
                log(`[Session Run][Image ${i + 1}] Safety Checker execution time: ${scRunTime.toFixed(2)}ms`);
            } else {
                log(`[Session Run][Image ${i + 1}] Safety Checker completed`);
            }

            let nsfw = false;
            has_nsfw_concepts.data[0] ? (nsfw = true) : (nsfw = false);
            log(`[Session Run][Image ${i + 1}] Safety Checker - not safe for work (NSFW) concepts: ${nsfw}`);
            if (has_nsfw_concepts.data[0]) {
                $(`#img_div_${i}`).setAttribute("class", "frame done nsfw");
                $(`#img_div_${i}`).setAttribute("title", "Not safe for work (NSFW) content");
            } else {
                $(`#img_div_${i}`).setAttribute("class", "frame done");
            }
            if (i == batchSize - 1) {
                $("#scRun").innerHTML = totalScRunTime.toFixed(2);
                if (getMode()) {
                    log(`[Session Run] Safety Checker total execution time: ${totalScRunTime.toFixed(2)}ms`);
                }
            }
        } else {
            $(`#img_div_${i}`).setAttribute("class", "frame done");
        }
    }

    $("#total_data").innerHTML = `${totalRunTime} ms`;

    generate.disabled = false;
    // // this is a gpu-buffer we own, so we need to dispose it
    // last_hidden_state.dispose();
    log("[Info] Images generation completed");
    // } catch (e) {
    //     logError("[Error] " + e);
    //     return;
    // }
}

let webnnStatus;

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

const getQueryValue = name => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

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

    switch (config.provider) {
        case "webgpu":
            if (!("gpu" in navigator)) {
                throw new Error("webgpu is NOT supported");
            }
            opt.preferredOutputLocation = { last_hidden_state: "gpu-buffer" };
            break;
        case "webnn":
            webnnStatus = await getWebnnStatus();
            if (webnnStatus.webnn) {
                opt.executionProviders = [
                    {
                        name: "webnn",
                        deviceType: config.deviceType,
                    },
                ];
            }
            break;
    }

    const deviceType = config.deviceType.toLowerCase();
    const provider = config.provider.toLowerCase();

    if (deviceType === "cpu" || provider === "wasm") {
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
        if (!getSafetyChecker()) {
            delete models.safety_checker;
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

    if (getSafetyChecker()) {
        scTr.setAttribute("class", "");
    } else {
        scTr.setAttribute("class", "hide");
    }

    window.addEventListener("beforeunload", () => {
        if (memoryReleaseSwitch.checked) {
            const sessions = [
                models.text_encoder?.sess,
                models.text_encoder_2?.sess,
                models.unet?.sess,
                models.vae_decoder?.sess,
                models.safety_checker?.sess,
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
