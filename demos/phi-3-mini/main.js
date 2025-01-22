/* eslint-disable no-undef */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
//
// An example how to run Phi-3 Mini in onnxruntime-web.
//

import { log, logUser, logError } from "./utils.js";
import {
    $,
    $$,
    getQueryValue,
    getWebnnStatus,
    setupORT,
    showCompatibleChromiumVersion,
} from "../../assets/js/common_utils.js";
import { env, AutoTokenizer } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.1';
import { LLM } from "./llm.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const MODELS = {
    "llama": {
        name: "llama",
        desc: "Meta TinyLlama-1.1B-Chat-v1.0",
        id: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
        path: "llama_webnn.onnx",
        eos_token_id: [151645, 151643, 2],
        max_length: 2048,
        num_layers: 22,
        kv_num_heads: 4,
        head_size: 64,
        system_content: "You are MiniThinky, a helpful AI assistant. You always think before giving the answer. Use <|thinking|> before thinking and <|answer|> before giving the answer.", // You are a friendly chatbot who always responds in the style of a pirate",
    },
    "phi3": {
        name: "phi3",
        desc: "Microsoft Phi-3-mini-4k-instruct",
        id: "microsoft/Phi-3-mini-4k-instruct",
        path: "phi3_webnn.onnx",
        eos_token_id: [32000, 32001, 32007],
        max_length: 4096,
        num_layers: 32,
        kv_num_heads: 32,
        head_size: 96,
        system_content: "You are a helpful AI assistant.",
    },
    
    "qwen2": {
        name: "qwen2",
        desc: "Alibaba Qwen2-0.5B-Instruct",
        id: "Qwen/Qwen2-0.5B-Instruct",
        path: "qwen2_webnn.onnx",
        eos_token_id: [151645, 151643],
        max_length: 32768,
        num_layers: 24,
        kv_num_heads: 2,
        head_size: 64,
        system_content: "You are a helpful assistant.",
    },
}

let performanceIndicator;
let userInput, chatHistory;
let sendButton, stopButton, buttons, scrollWrapper;
let provider = "webnn";
let deviceType = "gpu";
let device;
let badge;
let ctrl = false,
    ready = false,
    cleanCache = false;

const clipboardIcon = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clipboard' viewBox='0 0 16 16'>
<path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z'/>
<path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z'/>
</svg>`;

marked.use({ mangle: false, headerIds: false });

//
// auto scroll the content area until a user scrolls up
//
let isAutoScrollOn = true;
let lastKnownScrollPosition = 0;
let ticking = false;

const autoScroller = new ResizeObserver(() => {
    if (isAutoScrollOn) {
        scrollWrapper.scrollIntoView({ behavior: "smooth", block: "end" });
    }
});

document.addEventListener("scroll", () => {
    if (!ticking && isAutoScrollOn && window.scrollY < lastKnownScrollPosition) {
        window.requestAnimationFrame(() => {
            isAutoScrollOn = false;
            ticking = false;
        });
        ticking = true;
    } else if (
        !ticking &&
        !isAutoScrollOn &&
        window.scrollY > lastKnownScrollPosition &&
        window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - 30
    ) {
        window.requestAnimationFrame(() => {
            isAutoScrollOn = true;
            ticking = false;
        });
        ticking = true;
    }
    lastKnownScrollPosition = window.scrollY;
});

//
// make response available for copying to clipboard
//
function copyTextToClipboard(responseDiv) {
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.setAttribute("title", "Copy response to clipboard");
    copyButton.innerHTML = clipboardIcon;
    copyButton.onclick = () => {
        navigator.clipboard.writeText(responseDiv.innerText);
        logUser("Copied response to clipboard");
    };
    let responseMessageOuter = $$(".response-message-outer");
    let lastResponseMessageOuter = responseMessageOuter[responseMessageOuter.length - 1];
    lastResponseMessageOuter.appendChild(copyButton);
}

//
// user hits send, enter or ctl enter
//
async function submitRequest(e) {
    if (ready === false) {
        return;
    }
    if (userInput.innerText.length < 1 && sendButton.disabled === false && ctrl === false) {
        logUser("Please type a message");
        return;
    }
    if (sendButton.disabled === true) {
        llm.abort();
        buttons.setAttribute("class", "button-group key");
        sendButton.disabled = false;
        return;
    }

    // enter will continue the conversation, ctl enter will clear the chat history and start a new conversation
    const continuation = !(e.ctrlKey && e.key === "Enter");

    if (continuation) {
        logUser(`Continuation: ${continuation}`);
    } else {
        performanceIndicator.innerHTML = "";
        logUser(`Continuation: ${continuation}. New conversation started.`);
    }

    let input = userInput.innerText;
    if (input.length == 0) {
        chatHistory.context = "";
        while (chatHistory.firstChild) {
            chatHistory.firstChild.remove();
        }
        return;
    }
    let context = chatHistory.context;
    if (context === undefined) {
        context = "";
    }

    // append to chat history
    let messageElement = document.createElement("div");
    messageElement.className = "message-element";
    let userMessageDiv = document.createElement("div");
    userMessageDiv.className = "user-message";
    userMessageDiv.innerText = input;
    messageElement.appendChild(userMessageDiv);
    chatHistory.appendChild(messageElement);

    // container for llm response
    let responseDiv = document.createElement("div");
    responseDiv.className = "response-message";
    let responseOuter = document.createElement("div");
    responseOuter.className = "response-message-outer";
    let spinner = document.createElement("div");
    spinner.innerHTML = `<span class="dots"></span>`;
    responseDiv.appendChild(spinner);
    responseOuter.appendChild(responseDiv);
    chatHistory.appendChild(responseOuter);

    // toggle button to stop text generation
    sendButton.disabled = true;
    buttons.setAttribute("class", "button-group key inferencing");

    // change autoScroller to keep track of our new responseDiv
    autoScroller.observe(responseDiv);

    // if (continuation) {
    //   input = context + ' ' + input;
    // }

    Query(continuation, input, word => {
        responseDiv.innerHTML = marked.parse(word);
    })
        .then(() => {
            chatHistory.context = responseDiv.innerHTML;
            copyTextToClipboard(responseDiv, true);
            sendButton.disabled = false;
            buttons.setAttribute("class", "button-group key");
            spinner.remove();
        })
        .catch(error => {
            console.error(error);
            sendButton.disabled = false;
            buttons.setAttribute("class", "button-group key");
            spinner.remove();
        });

    // Clear user input
    userInput.innerHTML = "";
}

//
// event listener for Ctrl+Enter or Enter
//
$("#user-input").addEventListener("keydown", async function (e) {
    if (e.ctrlKey && e.key === "Enter") {
        ctrl = true;
        cleanCache = true;
        submitRequest(e);
    } else if (e.key === "Enter") {
        e.preventDefault();
        ctrl = false;
        submitRequest(e);
    }
});

function getConfig() {
    const query = window.location.search.substring(1);
    var config = {
        model: "phi3",
        provider: "webnn",
        devicetype: "gpu",
        profiler: 0,
        verbose: 0,
        threads: 1,
        show_special: 0,
        csv: 0,
        max_length: 256,
        local: 1,
    };
    let vars = query.split("&");
    let err_msg = "";
    for (var i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] in config) {
            const key = pair[0];
            const value = decodeURIComponent(pair[1]);
            if (typeof config[key] == "number") {
                config[key] = parseInt(value);
            } else {
                config[key] = value;
            }
        } else if (pair[0].length > 0) {
            err_msg = `unknown argument: ${pair[0]}`;
            logUser(err_msg);
            throw new Error(err_msg);
        }
    }
    if (MODELS[config.model] !== undefined) {
        config.model = MODELS[config.model];
    } else {
        err_msg = `Unsupported model name: ${config.model}`;
        logError(err_msg);
        throw new Error(err_msg);
    }
    if (config.max_length < 0 || config.max_length > config.model.context_length) {
        err_msg = `max_length should not execeed ${config.model.context_length}`;
        logError(err_msg);
        throw new Error(err_msg);
    }
    return config;
}

const config = getConfig();

// setup for transformers.js tokenizer
env.localModelPath = "models";
env.allowRemoteModels = config.local == 0;
env.allowLocalModels = config.local == 1;

let tokenizer;

const llm = new LLM(config.max_length);
let system_chat_template;
if (config.model.system_content != "") {
    system_chat_template = {"role": "system", "content": config.model.system_content};
}

function token_to_text(tokenizer, tokens) {
    const txt = tokenizer.decode(tokens, { skip_special_tokens: config.show_special != 1 });
    console.log(txt);
    return txt;
}

async function Query(continuation, query, cb) {
    performanceIndicator.innerHTML = "";
    logUser(`Prompt: ${query}`);
    let user_chat_template = {"role": "user", "content": query};
    let messages = [];
    let prompt = `<|user|>\n${query}<|end|>\n<|assistant|>\n`;   // work with qwen2, phi3
    // Fix me: Currently we clean all cache when the cache is full, find other strategy to clean the top of the cache
    if (llm.output_tokens.length == 0 || !continuation || cleanCache) { // || llm.start_len + input_ids_len > llm.max_length) {
        // clear kv cache
        await llm.initialize_feed();
        if (system_chat_template) messages.push(system_chat_template);
        cleanCache = true;
        prompt = `<|system|>\n${config.model.system_content}<|end|>\n<|user|>\n${query}<|end|>\n<|assistant|>\n`;
    }

    let { input_ids } = await tokenizer(prompt, { return_tensor: false, padding: true, truncation: true });
    console.log('input ids from tokenizer: ', input_ids);
    messages.push(user_chat_template);
    console.log('messages: ', messages);
    if (config.model.name == 'phi3' || true) {
        let add_generation_prompt = true; // config.model.name == "llama" ? false : true;
        input_ids = tokenizer.apply_chat_template(messages, { tokenize: true, return_tensor: false, add_generation_prompt});
    }
    // convert input_ids to BigInt
    console.log('input ids: ', input_ids);
    input_ids = input_ids.map(num => BigInt(num));
    const input_ids_len = input_ids.length;
    logUser(`Prompt length: ${input_ids_len}`);

    let time_to_first_token;
    const start_timer = performance.now();
    const output_tokens = await llm.generate(input_ids, cleanCache, output_tokens => {
        if (output_tokens.length == 1) {
            // time to first token
            time_to_first_token = (performance.now() - start_timer) / 1000;
        }
        cb(token_to_text(tokenizer, output_tokens));
    });

    cleanCache = false;

    const took = (performance.now() - start_timer) / 1000;
    const time_to_new_tokens = took - time_to_first_token;
    const seqlen = output_tokens.length;
    log(`${seqlen} tokens in ${took.toFixed(2)} sec<br/>
    Time to first token: ${time_to_first_token.toFixed(2)} sec<br/>
    New tokens per second: ${((seqlen - 1) / time_to_new_tokens).toFixed(2)} tokens/sec`);

    const timeToFirstTokenPerformanceUnit = document.createElement("div");
    timeToFirstTokenPerformanceUnit.className = "tokens-per-second-performance-unit";
    timeToFirstTokenPerformanceUnit.innerHTML = `time to first token`;
    const timeToFirstTokenPerformance = document.createElement("div");
    timeToFirstTokenPerformance.className = "tokens-per-second-performance-data";
    timeToFirstTokenPerformance.innerHTML = `${time_to_first_token.toFixed(2)}s`;
    const performanceDataTtfs = document.createElement("div");
    performanceDataTtfs.className = "performance-data";
    performanceDataTtfs.setAttribute("title", "Time to first token");
    performanceDataTtfs.appendChild(timeToFirstTokenPerformanceUnit);
    performanceDataTtfs.appendChild(timeToFirstTokenPerformance);

    const tokensPerSecondPerformance = document.createElement("div");
    tokensPerSecondPerformance.className = "tokens-per-second-performance-data";
    tokensPerSecondPerformance.innerHTML = `${((seqlen - 1) / time_to_new_tokens).toFixed(2)}`;
    const tokensPerSecondPerformanceUnit = document.createElement("div");
    tokensPerSecondPerformanceUnit.className = "tokens-per-second-performance-unit";
    tokensPerSecondPerformanceUnit.innerHTML = `tokens/s`;

    const performanceDataTps = document.createElement("div");
    performanceDataTps.className = "performance-data";
    performanceDataTps.setAttribute("title", "tokens per second");
    performanceDataTps.appendChild(tokensPerSecondPerformance);
    performanceDataTps.appendChild(tokensPerSecondPerformanceUnit);
    performanceIndicator.innerHTML = "";
    performanceIndicator.appendChild(performanceDataTtfs);
    performanceIndicator.appendChild(performanceDataTps);
}

const main = async () => {
    await setupORT("phi-3-mini", "dev");
    showCompatibleChromiumVersion("phi-3-mini");

    ort.env.wasm.numThreads = 4;
    ort.env.wasm.simd = true;
    ort.env.wasm.proxy = false;
    ort.env.logLevel = "warning"; //'error';

    log(`ONNX Runtime Web Execution Provider loaded · ${provider.toLowerCase()}`);

    sendButton.addEventListener("click", submitRequest);
    stopButton.addEventListener("click", submitRequest);
    userInput.focus();

    try {
        tokenizer = await AutoTokenizer.from_pretrained(config.model.id);
        await llm.load(config.model, {
            provider: config.provider,
            devicetype: config.devicetype,
            profiler: config.profiler,
            verbose: config.verbose,
            local: config.local,
        });
        sendButton.disabled = false;
        ready = true;
        log("Ready to type your message ...");
    } catch (error) {
        logError(`[Error] ${error}`);
    }
};

const ui = async () => {
    device = $("#device");
    badge = $("#badge");
    sendButton = $("#send-button");
    stopButton = $("#stop-button");
    buttons = $("#buttons");
    performanceIndicator = $("#performance-indicator");
    scrollWrapper = $("#scroll-wrapper");
    userInput = $("#user-input");
    chatHistory = $("#chat-history");

    let status = $("#webnnstatus");
    let info = $("#info");
    sendButton.disabled = true;

    if (getQueryValue("devicetype")) {
        deviceType = getQueryValue("devicetype").toLowerCase();
    }

    if (deviceType.indexOf("cpu") > -1 || provider.toLowerCase().indexOf("wasm") > -1) {
        device.innerHTML = "CPU";
        badge.setAttribute("class", "cpu");
        document.body.setAttribute("class", "cpu");
    } else if (deviceType.indexOf("gpu") > -1 || provider.toLowerCase().indexOf("webgpu") > -1) {
        device.innerHTML = "GPU";
        badge.setAttribute("class", "");
        document.body.setAttribute("class", "gpu");
    } else if (deviceType.indexOf("npu") > -1) {
        device.innerHTML = "NPU";
        badge.setAttribute("class", "npu");
        document.body.setAttribute("class", "npu");
    }

    let webnnStatus = await getWebnnStatus();

    if (getQueryValue("provider") && getQueryValue("provider").toLowerCase().indexOf("wasm") > -1) {
        status.innerHTML = "";
        title.innerHTML = "WebAssembly";
        await main();
    } else if (getQueryValue("provider") && getQueryValue("provider").toLowerCase().indexOf("webgpu") > -1) {
        status.innerHTML = "";
        title.innerHTML = "WebGPU";
        await main();
    } else {
        if (webnnStatus.webnn) {
            status.setAttribute("class", "green");
            info.innerHTML = `WebNN supported`;
            // info.innerHTML = `WebNN supported · <a href="./?devicetype=gpu">GPU</a> · <a href="./?devicetype=npu">NPU</a>`;
            if (deviceType.toLowerCase() === "npu") {
                try {
                    await navigator.ml.createContext({ deviceType: "npu" });
                    await main();
                } catch (error) {
                    status.setAttribute("class", "red");
                    info.innerHTML = `
            ${error}<br>
            Your device probably doesn't have an AI processor (NPU) or the NPU driver is not successfully installed.`;
                    logError(`[Error] ${error}`);
                    logError(
                        `[Error] Your device probably doesn't have an AI processor (NPU) or the NPU driver is not successfully installed`,
                    );
                    log(`<a href="./?devicetype=gpu">Switch to WebNN GPU</a>`);
                }
            } else {
                await main();
            }
        } else {
            if (webnnStatus.error) {
                status.setAttribute("class", "red");
                info.innerHTML = `WebNN not supported: ${webnnStatus.error} <a id="webnn_na" href="../../install.html" title="WebNN Installation Guide">Set up WebNN</a>`;
                logError(`[Error] ${webnnStatus.error}`);
                log(`<a href="../../install.html" title="WebNN Installation Guide">WebNN Installation Guide</a>`);
            } else {
                status.setAttribute("class", "red");
                info.innerHTML = "WebNN not supported";
                logError("[Error] WebNN not supported");
            }
        }
    }

    function togglePlaceholder() {
        userInput.classList.toggle("empty", userInput.textContent.trim() === "");
    }

    userInput.addEventListener("input", togglePlaceholder);
    userInput.addEventListener("focus", togglePlaceholder);
    userInput.addEventListener("blur", togglePlaceholder);

    // Initial check
    togglePlaceholder();
};

document.addEventListener("DOMContentLoaded", ui, false);
