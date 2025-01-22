/* eslint-disable no-undef */
import { $ } from "../../assets/js/common_utils.js";
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

function product(shape) {
    if (!Array.isArray(shape) || shape.length === 0) {
        return 0;
    }
    return shape.reduce((acc, val) => acc * val, 1);
}

// class to handle a large language model on top of onnxruntime-web
export class LLM {
    provider = "webnn";
    sess = undefined;
    feed = {};
    input_ids = [];
    output_tokens = [];
    need_position_ids = true;
    stop = false;
    kv_dims = [];
    dtype = "float16";
    deviceType = "gpu";
    max_length = 2048;
    start_len = 0;
    ml_context = undefined;

    constructor(max_length) {
        this.max_length = max_length;
    }

    async load(model, options, flag = true) {
        this.provider = options.provider;
        this.deviceType = options.devicetype;
        const verbose = options.verbose;
        this.eos = model.eos_token_id; // end of sentence token ids
        this.num_layers = model.num_layers;
        this.kv_dims = [1, model.kv_num_heads, this.max_length, model.head_size];
        log(`WebNN EP config: ${model} · ${this.dtype} · ${this.provider}`);

        const path = location.href.includes("github.io")
            ? "https://huggingface.co/webnn/Phi3-mini-4k-instruct-static/resolve/main/"
            : "models/";            
        const model_file = model.path;
        const model_path = path + model_file;
        const model_bytes = await getModelOPFS(`id_${model_file}`, model_path, true); // Fix me, should be false
        const external_file = model_file + ".data";
        const external_data_path = path + external_file;
        const external_data_bytes = await getModelOPFS(`id_${external_file}`, external_data_path, true); // Fix me, should be false

        let model_size = model_bytes.byteLength;
        model_size += external_data_bytes.byteLength;

        log(`Phi-3 Mini model size: ${Math.round(model_size / 1024 / 1024)} MB`);
        this.ml_context = await navigator.ml.createContext({ deviceType: this.deviceType });
        const session_options = {
            executionProviders: [{ name: this.provider, deviceType: this.deviceType, context: this.ml_context }],
            externalData: [
                {
                    data: external_data_bytes,
                    path: external_file,
                },
            ],
        };

        const location_type = this.provider == "webnn" ? "ml-tensor" : "gpu-buffer";
        switch (this.provider) {
            case "webnn":
            case "webgpu":
                // Bind kv cache outputs to ml-tensor or gpu-buffer
                session_options.preferredOutputLocation = {};
                for (let i = 0; i < 32; ++i) {
                    session_options.preferredOutputLocation[`present.${i}.key`] = location_type;
                    session_options.preferredOutputLocation[`present.${i}.value`] = location_type;
                }
                break;
            case "wasm":
                session_options.preferredOutputLocation = "cpu";
                break;
        }

        if (verbose) {
            session_options.logSeverityLevel = 0;
            session_options.logVerbosityLevel = 0;
        }

        if (this.provider == "webnn") {
            session_options.freeDimensionOverrides = {
                batch_size: 1,
                sequence_length: this.max_length,
                total_sequence_length: this.max_length,
                past_sequence_length: this.max_length,
            };
        }

        let progressBarLabel = $("#p-bar-label");
        log("Create session for prefill process");
        console.log("Create session 1 with option: ");
        console.log({ ...session_options });
        this.sess_1 = await ort.InferenceSession.create(model_bytes, session_options);
        updateOnnxCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Prefill session created · ${loadProgress.toFixed(2)}%`;

        log("Prefill session created");
        if (this.provider == "webnn") {
            session_options.freeDimensionOverrides = {
                batch_size: 1,
                sequence_length: 1,
                total_sequence_length: this.max_length,
                past_sequence_length: this.max_length,
            };
            log("Create session for decode process");
            console.log("Create session 2 with option: ");
            console.log({ ...session_options });
            this.sess_2 = await ort.InferenceSession.create(model_bytes, session_options);
            log("Decode process session created");
        }

        updateOnnxDataCompileProgress(10);
        updateLoadProgress(onnxFetchProgress + onnxDataFetchProgress + onnxCompileProgress + onnxDataCompileProgress);
        updateProgressBar(loadProgress.toFixed(2));
        progressBarLabel.innerHTML = `Session for decode created · ${loadProgress.toFixed(2)}%`;

        updateProgressBar(100.0);
        progressBarLabel.innerHTML = `100%`;

        if (!flag) {
            this.initialize_feed();
        }
    }

    async initialize_feed() {
        // dispose previous tensors
        for (const name in this.feed) {
            const t = this.feed[name];
            if (t.location === "gpu-buffer" || t.location === "ml-tensor") {
                t.dispose();
            }
        }

        this.feed = {};
        if (this.provider == "webnn") {
            // init kv cache ml-tensor
            const kv_desc = { dataType: this.dtype, shape: this.kv_dims };
            const ort_kv_desc = { dataType: this.dtype, dims: this.kv_dims };
            const input_ml_tensor = await this.ml_context.createTensor(kv_desc);
            for (let i = 0; i < this.num_layers; ++i) {
                this.feed[`past_key_values.${i}.key`] =
                    ort.Tensor.fromMLTensor(input_ml_tensor, ort_kv_desc);
                this.feed[`past_key_values.${i}.value`] =
                    ort.Tensor.fromMLTensor(input_ml_tensor, ort_kv_desc);
            }
        } else {
            const kv_num_elements = product(this.kv_dims);
            const empty =
                this.dtype === "float16" ? new Uint16Array(kv_num_elements) : new Float32Array(kv_num_elements);
            for (let i = 0; i < this.num_layers; ++i) {
                this.feed[`past_key_values.${i}.key`] = new ort.Tensor(this.dtype, empty, this.kv_dims);
                this.feed[`past_key_values.${i}.value`] = new ort.Tensor(this.dtype, empty, this.kv_dims);
            }
        }
    }

    // update key value cache
    update_kv_cache(outputs) {
        for (const name in outputs) {
            if (name.includes("present.")) {
                let newName = name.replace(name.split(".")[0], "past_key_values");
                const t = this.feed[newName];
                // dispose previous tensors
                if (t.location === "gpu-buffer" || t.location == "ml-tensor") {
                    // ml-tensor in first feed has no dispose method
                    if (t.disposer == undefined && t.location == "ml-tensor") {
                        t.mlTensor.destroy();
                    } else {
                        t.dispose();
                    }

                }

                this.feed[newName] = outputs[name];
            }
        }
    }

    // padding input array with 0
    padding_input(origin_input, max_length, reverse = false) {
        let input = origin_input.slice();
        if (input.length >= max_length) return input.slice(0, max_length);
        const padding_length = max_length - input.length;
        const padding = Array.from({ length: padding_length }, () => 0n);
        if (reverse) {
            padding.push(...input);
            return padding;
        } else {
            input.push(...padding);
            return input;
        }
    }

    // tell generate to stop()
    abort() {
        this.stop = true;
    }

    // poor mens argmax
    argmax(t, seq_len = 1) {
        const arr = t.cpuData;
        for (let i = 0; i < arr.length; i++) {
            // if (!isFinite(arr[i]))
                // console.log('found infinitive in logits=', arr[i]);
        }
        let start = t.dims[2] * (seq_len - 1);
        let max = arr[start];
        let maxidx = 0;

        for (let i = 0; i < t.dims[2]; i++) {
            const val = arr[i + start];
            if (!isFinite(val)) {
                throw new Error("found infinitive in logits");
            }
            if (val > max) {
                max = arr[i + start];
                maxidx = i;
            }
        }
        return maxidx;
    }

    // prefill prompt and generate tokens, greedy search only
    async generate(input_ids, cleanCache, callback) {
        this.output_tokens = [];
        if (cleanCache) {
            // clear cache
            this.start_len = 0;
            this.input_ids = [];
        } else {
            // TODO: empty kv?
        }
        this.input_ids = this.input_ids.concat(input_ids);
        const input_ids_len = this.input_ids.length;

        let attn_mask = Array.from({ length: input_ids_len }, () => BigInt(1));
        const position_ids = Array.from({ length: input_ids_len }, (_, i) => BigInt(i++));
        // Padding input_ids, attention_mask, position_ids to have length of this.max_length
        const input_ids_buffer = this.padding_input(this.input_ids, this.max_length);
        const attn_mask_buffer = this.padding_input(attn_mask, this.max_length);
        const position_ids_buffer = this.padding_input(position_ids, this.max_length);
        this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from(input_ids_buffer), [1, this.max_length]);
        this.feed["attention_mask"] = new ort.Tensor("int64", BigInt64Array.from(attn_mask_buffer), [1, this.max_length]);
        this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from(position_ids_buffer), [1, this.max_length]);
        this.stop = false;

        let last_token = 0;
        let outputs = await this.sess_1.run(this.feed);
        last_token = this.argmax(outputs["casted_logits"], input_ids_len);
        console.log("first token: ", last_token);
        this.start_len = input_ids_len;
        this.output_tokens.push(last_token);
        if (callback) {
            callback(this.output_tokens);
        }
        let seqlen = input_ids_len;

        this.update_kv_cache(outputs);
        log(`Max length of output tokens: ${this.max_length}`);
        while (this.eos.indexOf(last_token) == -1 &&
               !this.stop &&
               this.output_tokens.length <= (this.max_length - input_ids_len)) {
            this.feed["input_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(last_token)]), [1, 1]);
            attn_mask.push(BigInt(1));
            const attn_mask_buffer = this.padding_input(attn_mask, this.max_length);
            this.feed["attention_mask"] = new ort.Tensor("int64", new BigInt64Array(attn_mask_buffer), [1, this.max_length]);
            this.feed["position_ids"] = new ort.Tensor("int64", BigInt64Array.from([BigInt(this.start_len)]), [1, 1]);
            if (this.provider == "webnn") {
                outputs = await this.sess_2.run(this.feed);
            } else {
                outputs = await this.sess_1.run(this.feed);
            }
            last_token = this.argmax(outputs["casted_logits"]);

            console.log("next token: ", last_token);
            this.output_tokens.push(last_token);
            if (callback) {
                callback(this.output_tokens);
            }
            this.update_kv_cache(outputs);
            this.start_len += 1;
            console.log('start len: ', this.start_len);
            // eslint-disable-next-line no-unused-vars
            seqlen += 1;
        }

        this.input_ids = this.input_ids.concat(this.output_tokens.map(num => BigInt(num)));
        return this.output_tokens;
    }
}
