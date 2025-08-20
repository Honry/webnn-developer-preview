import { $, getMode, getTime } from "../../assets/js/common_utils.js";

export let progressBarInner;
export let progressBarLabel;

export let loadProgress = 0;
export let onnxFetchProgress = 0;
export let onnxDataFetchProgress = 0;
export let onnxCompileProgress = 0;
export let onnxDataCompileProgress = 0;

export const updateOnnxCompileProgress = value => {
    onnxCompileProgress = value;
};
export const updateOnnxDataCompileProgress = value => {
    onnxDataCompileProgress = value;
};
export const updateLoadProgress = value => {
    loadProgress = value;
};

progressBarInner = $("#p-bar-inner");
progressBarLabel = $("#p-bar-label");

export const updateProgressBar = progress => {
    progressBarInner.style.width = `${progress}%`;
};

// Get model via Origin Private File System
export async function getModelOPFS(name, url, updateModel) {
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
            if (name.toLowerCase().indexOf("onnx.data") > -1) {
                onnxDataFetchProgress = 40.0;
                loadProgress =
                    onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress;
                updateProgressBar(loadProgress.toFixed(2));
                progressBarLabel.innerHTML = `Loading ONNX data file · ${loadProgress.toFixed(2)}%`;
            } else {
                onnxFetchProgress = 40.0;
                loadProgress =
                    onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress;
                updateProgressBar(loadProgress.toFixed(2));
                progressBarLabel.innerHTML = `Loading ONNX file · ${loadProgress.toFixed(2)}%`;
            }

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

        if (name.toLowerCase().indexOf("onnx.data") > -1) {
            onnxDataFetchProgress = 0.4 * fetchProgress;
            loadProgress = onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress;
            updateProgressBar(loadProgress.toFixed(2));
            progressBarLabel.innerHTML = `Loading ONNX data file · ${loadProgress.toFixed(2)}%`;
        } else {
            onnxFetchProgress = 0.4 * fetchProgress;
            loadProgress = onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress;
            updateProgressBar(loadProgress.toFixed(2));
            progressBarLabel.innerHTML = `Loading ONNX file · ${loadProgress.toFixed(2)}%`;
        }

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

// Normalize the buffer size so that it fits the 128-bits (16 bytes) alignment.
const calcNormalizedBufferSize = size => Math.ceil(Number(size) / 16) * 16;

// Create a new ORT ML Tensor from the given parameters.
export async function createMlTensor(mlContext, dataType, dims, writable, readable) {
    const mlTensor = await mlContext.createTensor({ dataType, shape: dims, writable, readable });
    // eslint-disable-next-line no-undef
    return ort.Tensor.fromMLTensor(mlTensor, { dataType, dims });
}

// Create a new ORT GPU Tensor from the given parameters.
export function createGpuTensor(device, dataType, dims, bufferSize) {
    const gpuBuffer = device.createBuffer({
        usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
        size: calcNormalizedBufferSize(bufferSize),
    });
    // eslint-disable-next-line no-undef
    return ort.Tensor.fromGpuBuffer(gpuBuffer, { dataType, dims });
}

// Download an ML tensor into a pre-allocated target buffer.
export async function downloadMlTensor(mlContext, mlTensor, targetBuffer) {
    await mlContext.readTensor(mlTensor, targetBuffer);
}

// Download a gpu tensor into a pre-allocated target buffer.
export async function downloadGpuTensor(device, gpuBuffer, originalSize, targetBuffer) {
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
        targetBuffer.set(new Float16Array(arrayBuffer, 0, originalSize / 2));
    } finally {
        gpuReadBuffer.destroy();
    }
}

export function log(i) {
    console.log(i);
    if (getMode()) {
        $("#log").innerHTML =
            `
        <div class="item app">
            <div class="head">
                <div><span>App</span></div>
                <div>${getTime()}</div>
            </div>
            <div class="info">${i}</div>
        </div>
        ` + $("#log").innerHTML;
    } else {
        $("#log").innerHTML =
            `
        <div class="item app">
            <div class="head">
                <div><span>App</span></div>
                <div></div>
            </div>
            <div class="info">${i}</div>
        </div>
        ` + $("#log").innerHTML;
    }
}

export const logError = i => {
    console.error(i);
    if (getMode()) {
        $("#log").innerHTML =
            `
    <div class="item app">
        <div class="head">
            <div><span>App</span></div>
            <div>${getTime()}</div>
        </div>
        <div class="info">${i}</div>
    </div>
    ` + $("#log").innerHTML;
    } else {
        $("#log").innerHTML =
            `
        <div class="item app">
            <div class="head">
                <div><span>App</span></div>
                <div></div>
            </div>
            <div class="info">${i}</div>
        </div>
        ` + $("#log").innerHTML;
    }
};

export function logUser(i) {
    console.log(i);
    if (getMode()) {
        $("#log").innerHTML =
            `
        <div class="item user">
            <div class="head">
                <div><span>User</span></div>
                <div>${getTime()}</div>
            </div>
            <div class="info">${i}</div>
        </div>
        ` + $("#log").innerHTML;
    } else {
        $("#log").innerHTML =
            `
        <div class="item user">
            <div class="head">
                <div><span>User</span></div>
                <div></div>
            </div>
            <div class="info">${i}</div>
        </div>
        ` + $("#log").innerHTML;
    }
}
