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

// Get model via Origin Private File System — returns a File (Blob subclass).
// ORT's JSPI build reads byte ranges from it on demand (low memory peak);
// other builds materialize the whole file. The download streams network →
// OPFS disk without ever holding the full file in memory.
export async function getModelOPFS(name, url, updateModel) {
    const root = await navigator.storage.getDirectory();

    async function updateFile() {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`fetch ${url} -> ${response.status}`);
        const fileHandle = await root.getFileHandle(name, { create: true });
        const writable = await fileHandle.createWritable();
        // Stream network -> OPFS disk; never hold the whole file in memory.
        await response.body.pipeThrough(progressStream(name, response)).pipeTo(writable);
        return await fileHandle.getFile();
    }

    if (updateModel) {
        return await updateFile();
    }

    try {
        const fileHandle = await root.getFileHandle(name);
        // Cache hit: update progress to 40% immediately (same as a completed
        // download) so the progress bar doesn't stay at 0% when going through
        // the compile phases.
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
        return await fileHandle.getFile(); // cached: File == Blob, read lazily
    } catch (e) {
        console.log(e.message);
        return await updateFile();
    }
}

// TransformStream that logs download progress without buffering the payload.
function progressStream(name, response) {
    const total = parseInt(response.headers.get("Content-Length") ?? "0", 10);
    let loaded = 0;
    return new TransformStream({
        transform(chunk, controller) {
            loaded += chunk.byteLength;
            const isData = name.toLowerCase().indexOf("onnx.data") > -1;
            const pct = total > 0 ? (loaded / total) * 100 : (loaded / (loaded + 1)) * 100;
            if (isData) {
                onnxDataFetchProgress = 0.4 * pct;
                loadProgress =
                    onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress;
                updateProgressBar(loadProgress.toFixed(2));
                progressBarLabel.innerHTML = `Loading ONNX data file · ${loadProgress.toFixed(2)}%`;
            } else {
                onnxFetchProgress = 0.4 * pct;
                loadProgress =
                    onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress;
                updateProgressBar(loadProgress.toFixed(2));
                progressBarLabel.innerHTML = `Loading ONNX file · ${loadProgress.toFixed(2)}%`;
            }
            controller.enqueue(chunk);
        },
    });
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
