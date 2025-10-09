/*!
 * ONNX Runtime Web v1.23.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
"use strict";
var ort = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // common/dist/esm/backend-impl.js
  var backends, backendsSortedByPriority, registerBackend, tryResolveAndInitializeBackend, resolveBackendAndExecutionProviders;
  var init_backend_impl = __esm({
    "common/dist/esm/backend-impl.js"() {
      "use strict";
      backends = /* @__PURE__ */ new Map();
      backendsSortedByPriority = [];
      registerBackend = (name, backend, priority) => {
        if (backend && typeof backend.init === "function" && typeof backend.createInferenceSessionHandler === "function") {
          const currentBackend = backends.get(name);
          if (currentBackend === void 0) {
            backends.set(name, { backend, priority });
          } else if (currentBackend.priority > priority) {
            return;
          } else if (currentBackend.priority === priority) {
            if (currentBackend.backend !== backend) {
              throw new Error(`cannot register backend "${name}" using priority ${priority}`);
            }
          }
          if (priority >= 0) {
            const i = backendsSortedByPriority.indexOf(name);
            if (i !== -1) {
              backendsSortedByPriority.splice(i, 1);
            }
            for (let i2 = 0; i2 < backendsSortedByPriority.length; i2++) {
              if (backends.get(backendsSortedByPriority[i2]).priority <= priority) {
                backendsSortedByPriority.splice(i2, 0, name);
                return;
              }
            }
            backendsSortedByPriority.push(name);
          }
          return;
        }
        throw new TypeError("not a valid backend");
      };
      tryResolveAndInitializeBackend = async (backendName) => {
        const backendInfo = backends.get(backendName);
        if (!backendInfo) {
          return "backend not found.";
        }
        if (backendInfo.initialized) {
          return backendInfo.backend;
        } else if (backendInfo.aborted) {
          return backendInfo.error;
        } else {
          const isInitializing = !!backendInfo.initPromise;
          try {
            if (!isInitializing) {
              backendInfo.initPromise = backendInfo.backend.init(backendName);
            }
            await backendInfo.initPromise;
            backendInfo.initialized = true;
            return backendInfo.backend;
          } catch (e) {
            if (!isInitializing) {
              backendInfo.error = `${e}`;
              backendInfo.aborted = true;
            }
            return backendInfo.error;
          } finally {
            delete backendInfo.initPromise;
          }
        }
      };
      resolveBackendAndExecutionProviders = async (options) => {
        const eps = options.executionProviders || [];
        const backendHints = eps.map((i) => typeof i === "string" ? i : i.name);
        const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
        let backend;
        const errors = [];
        const availableBackendNames = /* @__PURE__ */ new Set();
        for (const backendName of backendNames) {
          const resolveResult = await tryResolveAndInitializeBackend(backendName);
          if (typeof resolveResult === "string") {
            errors.push({ name: backendName, err: resolveResult });
          } else {
            if (!backend) {
              backend = resolveResult;
            }
            if (backend === resolveResult) {
              availableBackendNames.add(backendName);
            }
          }
        }
        if (!backend) {
          throw new Error(`no available backend found. ERR: ${errors.map((e) => `[${e.name}] ${e.err}`).join(", ")}`);
        }
        for (const { name, err } of errors) {
          if (backendHints.includes(name)) {
            console.warn(`removing requested execution provider "${name}" from session options because it is not available: ${err}`);
          }
        }
        const filteredEps = eps.filter((i) => availableBackendNames.has(typeof i === "string" ? i : i.name));
        return [
          backend,
          new Proxy(options, {
            get: (target, prop) => {
              if (prop === "executionProviders") {
                return filteredEps;
              }
              return Reflect.get(target, prop);
            }
          })
        ];
      };
    }
  });

  // common/dist/esm/backend.js
  var init_backend = __esm({
    "common/dist/esm/backend.js"() {
      "use strict";
      init_backend_impl();
    }
  });

  // common/dist/esm/version.js
  var version;
  var init_version = __esm({
    "common/dist/esm/version.js"() {
      "use strict";
      version = "1.23.0";
    }
  });

  // common/dist/esm/env-impl.js
  var logLevelValue, env;
  var init_env_impl = __esm({
    "common/dist/esm/env-impl.js"() {
      "use strict";
      init_version();
      logLevelValue = "warning";
      env = {
        wasm: {},
        webgl: {},
        webgpu: {},
        versions: { common: version },
        set logLevel(value) {
          if (value === void 0) {
            return;
          }
          if (typeof value !== "string" || ["verbose", "info", "warning", "error", "fatal"].indexOf(value) === -1) {
            throw new Error(`Unsupported logging level: ${value}`);
          }
          logLevelValue = value;
        },
        get logLevel() {
          return logLevelValue;
        }
      };
      Object.defineProperty(env, "logLevel", { enumerable: true });
    }
  });

  // common/dist/esm/env.js
  var env2;
  var init_env = __esm({
    "common/dist/esm/env.js"() {
      "use strict";
      init_env_impl();
      env2 = env;
    }
  });

  // common/dist/esm/tensor-conversion-impl.js
  var tensorToDataURL, tensorToImageData;
  var init_tensor_conversion_impl = __esm({
    "common/dist/esm/tensor-conversion-impl.js"() {
      "use strict";
      tensorToDataURL = (tensor, options) => {
        const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
        canvas.width = tensor.dims[3];
        canvas.height = tensor.dims[2];
        const pixels2DContext = canvas.getContext("2d");
        if (pixels2DContext != null) {
          let width;
          let height;
          if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
            width = tensor.dims[2];
            height = tensor.dims[3];
          } else {
            width = tensor.dims[3];
            height = tensor.dims[2];
          }
          const inputformat = options?.format !== void 0 ? options.format : "RGB";
          const norm = options?.norm;
          let normMean;
          let normBias;
          if (norm === void 0 || norm.mean === void 0) {
            normMean = [255, 255, 255, 255];
          } else {
            if (typeof norm.mean === "number") {
              normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
            } else {
              normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 0];
              if (norm.mean[3] !== void 0) {
                normMean[3] = norm.mean[3];
              }
            }
          }
          if (norm === void 0 || norm.bias === void 0) {
            normBias = [0, 0, 0, 0];
          } else {
            if (typeof norm.bias === "number") {
              normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
            } else {
              normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
              if (norm.bias[3] !== void 0) {
                normBias[3] = norm.bias[3];
              }
            }
          }
          const stride = height * width;
          let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
          if (inputformat === "RGBA") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
            aTensorPointer = stride * 3;
          } else if (inputformat === "RGB") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
          } else if (inputformat === "RBG") {
            rTensorPointer = 0;
            bTensorPointer = stride;
            gTensorPointer = stride * 2;
          }
          for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
              const R = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
              const G = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
              const B = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
              const A = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
              pixels2DContext.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")";
              pixels2DContext.fillRect(j, i, 1, 1);
            }
          }
          if ("toDataURL" in canvas) {
            return canvas.toDataURL();
          } else {
            throw new Error("toDataURL is not supported");
          }
        } else {
          throw new Error("Can not access image data");
        }
      };
      tensorToImageData = (tensor, options) => {
        const pixels2DContext = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d");
        let image;
        if (pixels2DContext != null) {
          let width;
          let height;
          let channels;
          if (options?.tensorLayout !== void 0 && options.tensorLayout === "NHWC") {
            width = tensor.dims[2];
            height = tensor.dims[1];
            channels = tensor.dims[3];
          } else {
            width = tensor.dims[3];
            height = tensor.dims[2];
            channels = tensor.dims[1];
          }
          const inputformat = options !== void 0 ? options.format !== void 0 ? options.format : "RGB" : "RGB";
          const norm = options?.norm;
          let normMean;
          let normBias;
          if (norm === void 0 || norm.mean === void 0) {
            normMean = [255, 255, 255, 255];
          } else {
            if (typeof norm.mean === "number") {
              normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
            } else {
              normMean = [norm.mean[0], norm.mean[1], norm.mean[2], 255];
              if (norm.mean[3] !== void 0) {
                normMean[3] = norm.mean[3];
              }
            }
          }
          if (norm === void 0 || norm.bias === void 0) {
            normBias = [0, 0, 0, 0];
          } else {
            if (typeof norm.bias === "number") {
              normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
            } else {
              normBias = [norm.bias[0], norm.bias[1], norm.bias[2], 0];
              if (norm.bias[3] !== void 0) {
                normBias[3] = norm.bias[3];
              }
            }
          }
          const stride = height * width;
          if (options !== void 0) {
            if (options.format !== void 0 && channels === 4 && options.format !== "RGBA" || channels === 3 && options.format !== "RGB" && options.format !== "BGR") {
              throw new Error("Tensor format doesn't match input tensor dims");
            }
          }
          const step = 4;
          let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
          let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
          if (inputformat === "RGBA") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
            aTensorPointer = stride * 3;
          } else if (inputformat === "RGB") {
            rTensorPointer = 0;
            gTensorPointer = stride;
            bTensorPointer = stride * 2;
          } else if (inputformat === "RBG") {
            rTensorPointer = 0;
            bTensorPointer = stride;
            gTensorPointer = stride * 2;
          }
          image = pixels2DContext.createImageData(width, height);
          for (let i = 0; i < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i++) {
            image.data[rImagePointer] = (tensor.data[rTensorPointer++] - normBias[0]) * normMean[0];
            image.data[gImagePointer] = (tensor.data[gTensorPointer++] - normBias[1]) * normMean[1];
            image.data[bImagePointer] = (tensor.data[bTensorPointer++] - normBias[2]) * normMean[2];
            image.data[aImagePointer] = aTensorPointer === -1 ? 255 : (tensor.data[aTensorPointer++] - normBias[3]) * normMean[3];
          }
        } else {
          throw new Error("Can not access image data");
        }
        return image;
      };
    }
  });

  // common/dist/esm/tensor-factory-impl.js
  var bufferToTensor, tensorFromImage, tensorFromTexture, tensorFromGpuBuffer, tensorFromMLTensor, tensorFromPinnedBuffer;
  var init_tensor_factory_impl = __esm({
    "common/dist/esm/tensor-factory-impl.js"() {
      "use strict";
      init_tensor_impl();
      bufferToTensor = (buffer, options) => {
        if (buffer === void 0) {
          throw new Error("Image buffer must be defined");
        }
        if (options.height === void 0 || options.width === void 0) {
          throw new Error("Image height and width must be defined");
        }
        if (options.tensorLayout === "NHWC") {
          throw new Error("NHWC Tensor layout is not supported yet");
        }
        const { height, width } = options;
        const norm = options.norm ?? { mean: 255, bias: 0 };
        let normMean;
        let normBias;
        if (typeof norm.mean === "number") {
          normMean = [norm.mean, norm.mean, norm.mean, norm.mean];
        } else {
          normMean = [norm.mean[0], norm.mean[1], norm.mean[2], norm.mean[3] ?? 255];
        }
        if (typeof norm.bias === "number") {
          normBias = [norm.bias, norm.bias, norm.bias, norm.bias];
        } else {
          normBias = [norm.bias[0], norm.bias[1], norm.bias[2], norm.bias[3] ?? 0];
        }
        const inputformat = options.format !== void 0 ? options.format : "RGBA";
        const outputformat = options.tensorFormat !== void 0 ? options.tensorFormat !== void 0 ? options.tensorFormat : "RGB" : "RGB";
        const stride = height * width;
        const float32Data = outputformat === "RGBA" ? new Float32Array(stride * 4) : new Float32Array(stride * 3);
        let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
        let rTensorPointer = 0, gTensorPointer = stride, bTensorPointer = stride * 2, aTensorPointer = -1;
        if (inputformat === "RGB") {
          step = 3;
          rImagePointer = 0;
          gImagePointer = 1;
          bImagePointer = 2;
          aImagePointer = -1;
        }
        if (outputformat === "RGBA") {
          aTensorPointer = stride * 3;
        } else if (outputformat === "RBG") {
          rTensorPointer = 0;
          bTensorPointer = stride;
          gTensorPointer = stride * 2;
        } else if (outputformat === "BGR") {
          bTensorPointer = 0;
          gTensorPointer = stride;
          rTensorPointer = stride * 2;
        }
        for (let i = 0; i < stride; i++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
          float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias[0]) / normMean[0];
          float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias[1]) / normMean[1];
          float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias[2]) / normMean[2];
          if (aTensorPointer !== -1 && aImagePointer !== -1) {
            float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias[3]) / normMean[3];
          }
        }
        const outputTensor = outputformat === "RGBA" ? new Tensor("float32", float32Data, [1, 4, height, width]) : new Tensor("float32", float32Data, [1, 3, height, width]);
        return outputTensor;
      };
      tensorFromImage = async (image, options) => {
        const isHTMLImageEle = typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement;
        const isImageDataEle = typeof ImageData !== "undefined" && image instanceof ImageData;
        const isImageBitmap = typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap;
        const isString = typeof image === "string";
        let data;
        let bufferToTensorOptions = options ?? {};
        const createCanvas = () => {
          if (typeof document !== "undefined") {
            return document.createElement("canvas");
          } else if (typeof OffscreenCanvas !== "undefined") {
            return new OffscreenCanvas(1, 1);
          } else {
            throw new Error("Canvas is not supported");
          }
        };
        const createCanvasContext = (canvas) => {
          if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement) {
            return canvas.getContext("2d");
          } else if (canvas instanceof OffscreenCanvas) {
            return canvas.getContext("2d");
          } else {
            return null;
          }
        };
        if (isHTMLImageEle) {
          const canvas = createCanvas();
          canvas.width = image.width;
          canvas.height = image.height;
          const pixels2DContext = createCanvasContext(canvas);
          if (pixels2DContext != null) {
            let height = image.height;
            let width = image.width;
            if (options !== void 0 && options.resizedHeight !== void 0 && options.resizedWidth !== void 0) {
              height = options.resizedHeight;
              width = options.resizedWidth;
            }
            if (options !== void 0) {
              bufferToTensorOptions = options;
              if (options.tensorFormat !== void 0) {
                throw new Error("Image input config format must be RGBA for HTMLImageElement");
              } else {
                bufferToTensorOptions.tensorFormat = "RGBA";
              }
              bufferToTensorOptions.height = height;
              bufferToTensorOptions.width = width;
            } else {
              bufferToTensorOptions.tensorFormat = "RGBA";
              bufferToTensorOptions.height = height;
              bufferToTensorOptions.width = width;
            }
            pixels2DContext.drawImage(image, 0, 0);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
          } else {
            throw new Error("Can not access image data");
          }
        } else if (isImageDataEle) {
          let height;
          let width;
          if (options !== void 0 && options.resizedWidth !== void 0 && options.resizedHeight !== void 0) {
            height = options.resizedHeight;
            width = options.resizedWidth;
          } else {
            height = image.height;
            width = image.width;
          }
          if (options !== void 0) {
            bufferToTensorOptions = options;
          }
          bufferToTensorOptions.format = "RGBA";
          bufferToTensorOptions.height = height;
          bufferToTensorOptions.width = width;
          if (options !== void 0) {
            const tempCanvas = createCanvas();
            tempCanvas.width = width;
            tempCanvas.height = height;
            const pixels2DContext = createCanvasContext(tempCanvas);
            if (pixels2DContext != null) {
              pixels2DContext.putImageData(image, 0, 0);
              data = pixels2DContext.getImageData(0, 0, width, height).data;
            } else {
              throw new Error("Can not access image data");
            }
          } else {
            data = image.data;
          }
        } else if (isImageBitmap) {
          if (options === void 0) {
            throw new Error("Please provide image config with format for Imagebitmap");
          }
          const canvas = createCanvas();
          canvas.width = image.width;
          canvas.height = image.height;
          const pixels2DContext = createCanvasContext(canvas);
          if (pixels2DContext != null) {
            const height = image.height;
            const width = image.width;
            pixels2DContext.drawImage(image, 0, 0, width, height);
            data = pixels2DContext.getImageData(0, 0, width, height).data;
            bufferToTensorOptions.height = height;
            bufferToTensorOptions.width = width;
            return bufferToTensor(data, bufferToTensorOptions);
          } else {
            throw new Error("Can not access image data");
          }
        } else if (isString) {
          return new Promise((resolve, reject) => {
            const canvas = createCanvas();
            const context = createCanvasContext(canvas);
            if (!image || !context) {
              return reject();
            }
            const newImage = new Image();
            newImage.crossOrigin = "Anonymous";
            newImage.src = image;
            newImage.onload = () => {
              canvas.width = newImage.width;
              canvas.height = newImage.height;
              context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
              const img = context.getImageData(0, 0, canvas.width, canvas.height);
              bufferToTensorOptions.height = canvas.height;
              bufferToTensorOptions.width = canvas.width;
              resolve(bufferToTensor(img.data, bufferToTensorOptions));
            };
          });
        } else {
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
        if (data !== void 0) {
          return bufferToTensor(data, bufferToTensorOptions);
        } else {
          throw new Error("Input data provided is not supported - aborted tensor creation");
        }
      };
      tensorFromTexture = (texture, options) => {
        const { width, height, download, dispose } = options;
        const dims = [1, height, width, 4];
        return new Tensor({ location: "texture", type: "float32", texture, dims, download, dispose });
      };
      tensorFromGpuBuffer = (gpuBuffer, options) => {
        const { dataType, dims, download, dispose } = options;
        return new Tensor({ location: "gpu-buffer", type: dataType ?? "float32", gpuBuffer, dims, download, dispose });
      };
      tensorFromMLTensor = (mlTensor, options) => {
        const { dataType, dims, download, dispose } = options;
        return new Tensor({ location: "ml-tensor", type: dataType ?? "float32", mlTensor, dims, download, dispose });
      };
      tensorFromPinnedBuffer = (type, buffer, dims) => new Tensor({ location: "cpu-pinned", type, data: buffer, dims: dims ?? [buffer.length] });
    }
  });

  // common/dist/esm/tensor-impl-type-mapping.js
  var NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP, NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP, isTypedArrayChecked, checkTypedArray;
  var init_tensor_impl_type_mapping = __esm({
    "common/dist/esm/tensor-impl-type-mapping.js"() {
      "use strict";
      NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = /* @__PURE__ */ new Map([
        ["float32", Float32Array],
        ["uint8", Uint8Array],
        ["int8", Int8Array],
        ["uint16", Uint16Array],
        ["int16", Int16Array],
        ["int32", Int32Array],
        ["bool", Uint8Array],
        ["float64", Float64Array],
        ["uint32", Uint32Array],
        ["int4", Uint8Array],
        ["uint4", Uint8Array]
      ]);
      NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = /* @__PURE__ */ new Map([
        [Float32Array, "float32"],
        [Uint8Array, "uint8"],
        [Int8Array, "int8"],
        [Uint16Array, "uint16"],
        [Int16Array, "int16"],
        [Int32Array, "int32"],
        [Float64Array, "float64"],
        [Uint32Array, "uint32"]
      ]);
      isTypedArrayChecked = false;
      checkTypedArray = () => {
        if (!isTypedArrayChecked) {
          isTypedArrayChecked = true;
          const isBigInt64ArrayAvailable = typeof BigInt64Array !== "undefined" && BigInt64Array.from;
          const isBigUint64ArrayAvailable = typeof BigUint64Array !== "undefined" && BigUint64Array.from;
          const Float16Array2 = globalThis.Float16Array;
          const isFloat16ArrayAvailable = typeof Float16Array2 !== "undefined" && Float16Array2.from;
          if (isBigInt64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("int64", BigInt64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, "int64");
          }
          if (isBigUint64ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("uint64", BigUint64Array);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, "uint64");
          }
          if (isFloat16ArrayAvailable) {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Float16Array2);
            NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(Float16Array2, "float16");
          } else {
            NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set("float16", Uint16Array);
          }
        }
      };
    }
  });

  // common/dist/esm/tensor-utils-impl.js
  var calculateSize, tensorReshape;
  var init_tensor_utils_impl = __esm({
    "common/dist/esm/tensor-utils-impl.js"() {
      "use strict";
      init_tensor_impl();
      calculateSize = (dims) => {
        let size = 1;
        for (let i = 0; i < dims.length; i++) {
          const dim = dims[i];
          if (typeof dim !== "number" || !Number.isSafeInteger(dim)) {
            throw new TypeError(`dims[${i}] must be an integer, got: ${dim}`);
          }
          if (dim < 0) {
            throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${dim}`);
          }
          size *= dim;
        }
        return size;
      };
      tensorReshape = (tensor, dims) => {
        switch (tensor.location) {
          case "cpu":
            return new Tensor(tensor.type, tensor.data, dims);
          case "cpu-pinned":
            return new Tensor({
              location: "cpu-pinned",
              data: tensor.data,
              type: tensor.type,
              dims
            });
          case "texture":
            return new Tensor({
              location: "texture",
              texture: tensor.texture,
              type: tensor.type,
              dims
            });
          case "gpu-buffer":
            return new Tensor({
              location: "gpu-buffer",
              gpuBuffer: tensor.gpuBuffer,
              type: tensor.type,
              dims
            });
          case "ml-tensor":
            return new Tensor({
              location: "ml-tensor",
              mlTensor: tensor.mlTensor,
              type: tensor.type,
              dims
            });
          default:
            throw new Error(`tensorReshape: tensor location ${tensor.location} is not supported`);
        }
      };
    }
  });

  // common/dist/esm/tensor-impl.js
  var Tensor;
  var init_tensor_impl = __esm({
    "common/dist/esm/tensor-impl.js"() {
      "use strict";
      init_tensor_conversion_impl();
      init_tensor_factory_impl();
      init_tensor_impl_type_mapping();
      init_tensor_utils_impl();
      Tensor = class {
        /**
         * implementation.
         */
        constructor(arg0, arg1, arg2) {
          checkTypedArray();
          let type;
          let dims;
          if (typeof arg0 === "object" && "location" in arg0) {
            this.dataLocation = arg0.location;
            type = arg0.type;
            dims = arg0.dims;
            switch (arg0.location) {
              case "cpu-pinned": {
                const expectedTypedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(type);
                if (!expectedTypedArrayConstructor) {
                  throw new TypeError(`unsupported type "${type}" to create tensor from pinned buffer`);
                }
                if (!(arg0.data instanceof expectedTypedArrayConstructor)) {
                  throw new TypeError(`buffer should be of type ${expectedTypedArrayConstructor.name}`);
                }
                this.cpuData = arg0.data;
                break;
              }
              case "texture": {
                if (type !== "float32") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from texture`);
                }
                this.gpuTextureData = arg0.texture;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              case "gpu-buffer": {
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from gpu buffer`);
                }
                this.gpuBufferData = arg0.gpuBuffer;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              case "ml-tensor": {
                if (type !== "float32" && type !== "float16" && type !== "int32" && type !== "int64" && type !== "uint32" && type !== "uint64" && type !== "int8" && type !== "uint8" && type !== "bool" && type !== "uint4" && type !== "int4") {
                  throw new TypeError(`unsupported type "${type}" to create tensor from MLTensor`);
                }
                this.mlTensorData = arg0.mlTensor;
                this.downloader = arg0.download;
                this.disposer = arg0.dispose;
                break;
              }
              default:
                throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`);
            }
          } else {
            let data;
            let maybeDims;
            if (typeof arg0 === "string") {
              type = arg0;
              maybeDims = arg2;
              if (arg0 === "string") {
                if (!Array.isArray(arg1)) {
                  throw new TypeError("A string tensor's data must be a string array.");
                }
                data = arg1;
              } else {
                const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
                if (typedArrayConstructor === void 0) {
                  throw new TypeError(`Unsupported tensor type: ${arg0}.`);
                }
                if (Array.isArray(arg1)) {
                  if (arg0 === "float16" && typedArrayConstructor === Uint16Array || arg0 === "uint4" || arg0 === "int4") {
                    throw new TypeError(`Creating a ${arg0} tensor from number array is not supported. Please use ${typedArrayConstructor.name} as data.`);
                  } else if (arg0 === "uint64" || arg0 === "int64") {
                    data = typedArrayConstructor.from(arg1, BigInt);
                  } else {
                    data = typedArrayConstructor.from(arg1);
                  }
                } else if (arg1 instanceof typedArrayConstructor) {
                  data = arg1;
                } else if (arg1 instanceof Uint8ClampedArray) {
                  if (arg0 === "uint8") {
                    data = Uint8Array.from(arg1);
                  } else {
                    throw new TypeError(`A Uint8ClampedArray tensor's data must be type of uint8`);
                  }
                } else if (arg0 === "float16" && arg1 instanceof Uint16Array && typedArrayConstructor !== Uint16Array) {
                  data = new globalThis.Float16Array(arg1.buffer, arg1.byteOffset, arg1.length);
                } else {
                  throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
                }
              }
            } else {
              maybeDims = arg1;
              if (Array.isArray(arg0)) {
                if (arg0.length === 0) {
                  throw new TypeError("Tensor type cannot be inferred from an empty array.");
                }
                const firstElementType = typeof arg0[0];
                if (firstElementType === "string") {
                  type = "string";
                  data = arg0;
                } else if (firstElementType === "boolean") {
                  type = "bool";
                  data = Uint8Array.from(arg0);
                } else {
                  throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
                }
              } else if (arg0 instanceof Uint8ClampedArray) {
                type = "uint8";
                data = Uint8Array.from(arg0);
              } else {
                const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
                if (mappedType === void 0) {
                  throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
                }
                type = mappedType;
                data = arg0;
              }
            }
            if (maybeDims === void 0) {
              maybeDims = [data.length];
            } else if (!Array.isArray(maybeDims)) {
              throw new TypeError("A tensor's dims must be a number array");
            }
            dims = maybeDims;
            this.cpuData = data;
            this.dataLocation = "cpu";
          }
          const size = calculateSize(dims);
          if (this.cpuData && size !== this.cpuData.length) {
            if ((type === "uint4" || type === "int4") && Math.ceil(size / 2) === this.cpuData.length) {
            } else {
              throw new Error(`Tensor's size(${size}) does not match data length(${this.cpuData.length}).`);
            }
          }
          this.type = type;
          this.dims = dims;
          this.size = size;
        }
        // #endregion
        // #region factory
        static async fromImage(image, options) {
          return tensorFromImage(image, options);
        }
        static fromTexture(texture, options) {
          return tensorFromTexture(texture, options);
        }
        static fromGpuBuffer(gpuBuffer, options) {
          return tensorFromGpuBuffer(gpuBuffer, options);
        }
        static fromMLTensor(mlTensor, options) {
          return tensorFromMLTensor(mlTensor, options);
        }
        static fromPinnedBuffer(type, buffer, dims) {
          return tensorFromPinnedBuffer(type, buffer, dims);
        }
        // #endregion
        // #region conversions
        toDataURL(options) {
          return tensorToDataURL(this, options);
        }
        toImageData(options) {
          return tensorToImageData(this, options);
        }
        // #endregion
        // #region properties
        get data() {
          this.ensureValid();
          if (!this.cpuData) {
            throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
          }
          return this.cpuData;
        }
        get location() {
          return this.dataLocation;
        }
        get texture() {
          this.ensureValid();
          if (!this.gpuTextureData) {
            throw new Error("The data is not stored as a WebGL texture.");
          }
          return this.gpuTextureData;
        }
        get gpuBuffer() {
          this.ensureValid();
          if (!this.gpuBufferData) {
            throw new Error("The data is not stored as a WebGPU buffer.");
          }
          return this.gpuBufferData;
        }
        get mlTensor() {
          this.ensureValid();
          if (!this.mlTensorData) {
            throw new Error("The data is not stored as a WebNN MLTensor.");
          }
          return this.mlTensorData;
        }
        // #endregion
        // #region methods
        async getData(releaseData) {
          this.ensureValid();
          switch (this.dataLocation) {
            case "cpu":
            case "cpu-pinned":
              return this.data;
            case "texture":
            case "gpu-buffer":
            case "ml-tensor": {
              if (!this.downloader) {
                throw new Error("The current tensor is not created with a specified data downloader.");
              }
              if (this.isDownloading) {
                throw new Error("The current tensor is being downloaded.");
              }
              try {
                this.isDownloading = true;
                const data = await this.downloader();
                this.downloader = void 0;
                this.dataLocation = "cpu";
                this.cpuData = data;
                if (releaseData && this.disposer) {
                  this.disposer();
                  this.disposer = void 0;
                }
                return data;
              } finally {
                this.isDownloading = false;
              }
            }
            default:
              throw new Error(`cannot get data from location: ${this.dataLocation}`);
          }
        }
        dispose() {
          if (this.isDownloading) {
            throw new Error("The current tensor is being downloaded.");
          }
          if (this.disposer) {
            this.disposer();
            this.disposer = void 0;
          }
          this.cpuData = void 0;
          this.gpuTextureData = void 0;
          this.gpuBufferData = void 0;
          this.mlTensorData = void 0;
          this.downloader = void 0;
          this.isDownloading = void 0;
          this.dataLocation = "none";
        }
        // #endregion
        // #region tensor utilities
        ensureValid() {
          if (this.dataLocation === "none") {
            throw new Error("The tensor is disposed.");
          }
        }
        reshape(dims) {
          this.ensureValid();
          if (this.downloader || this.disposer) {
            throw new Error("Cannot reshape a tensor that owns GPU resource.");
          }
          return tensorReshape(this, dims);
        }
      };
    }
  });

  // common/dist/esm/tensor.js
  var Tensor2;
  var init_tensor = __esm({
    "common/dist/esm/tensor.js"() {
      "use strict";
      init_tensor_impl();
      Tensor2 = Tensor;
    }
  });

  // common/dist/esm/trace.js
  var TRACE, TRACE_FUNC, TRACE_FUNC_BEGIN, TRACE_FUNC_END, TRACE_EVENT_BEGIN, TRACE_EVENT_END;
  var init_trace = __esm({
    "common/dist/esm/trace.js"() {
      "use strict";
      init_env_impl();
      TRACE = (deviceType, label) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.timeStamp(`${deviceType}::ORT::${label}`);
      };
      TRACE_FUNC = (msg, extraMsg) => {
        const stack = new Error().stack?.split(/\r\n|\r|\n/g) || [];
        let hasTraceFunc = false;
        for (let i = 0; i < stack.length; i++) {
          if (hasTraceFunc && !stack[i].includes("TRACE_FUNC")) {
            let label = `FUNC_${msg}::${stack[i].trim().split(" ")[1]}`;
            if (extraMsg) {
              label += `::${extraMsg}`;
            }
            TRACE("CPU", label);
            return;
          }
          if (stack[i].includes("TRACE_FUNC")) {
            hasTraceFunc = true;
          }
        }
      };
      TRACE_FUNC_BEGIN = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        TRACE_FUNC("BEGIN", extraMsg);
      };
      TRACE_FUNC_END = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        TRACE_FUNC("END", extraMsg);
      };
      TRACE_EVENT_BEGIN = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.time(`ORT::${extraMsg}`);
      };
      TRACE_EVENT_END = (extraMsg) => {
        if (typeof env.trace === "undefined" ? !env.wasm.trace : !env.trace) {
          return;
        }
        console.timeEnd(`ORT::${extraMsg}`);
      };
    }
  });

  // common/dist/esm/inference-session-impl.js
  var InferenceSession;
  var init_inference_session_impl = __esm({
    "common/dist/esm/inference-session-impl.js"() {
      "use strict";
      init_backend_impl();
      init_tensor();
      init_trace();
      InferenceSession = class _InferenceSession {
        constructor(handler) {
          this.handler = handler;
        }
        async run(feeds, arg1, arg2) {
          TRACE_FUNC_BEGIN();
          TRACE_EVENT_BEGIN("InferenceSession.run");
          const fetches = {};
          let options = {};
          if (typeof feeds !== "object" || feeds === null || feeds instanceof Tensor2 || Array.isArray(feeds)) {
            throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
          }
          let isFetchesEmpty = true;
          if (typeof arg1 === "object") {
            if (arg1 === null) {
              throw new TypeError("Unexpected argument[1]: cannot be null.");
            }
            if (arg1 instanceof Tensor2) {
              throw new TypeError("'fetches' cannot be a Tensor");
            }
            if (Array.isArray(arg1)) {
              if (arg1.length === 0) {
                throw new TypeError("'fetches' cannot be an empty array.");
              }
              isFetchesEmpty = false;
              for (const name of arg1) {
                if (typeof name !== "string") {
                  throw new TypeError("'fetches' must be a string array or an object.");
                }
                if (this.outputNames.indexOf(name) === -1) {
                  throw new RangeError(`'fetches' contains invalid output name: ${name}.`);
                }
                fetches[name] = null;
              }
              if (typeof arg2 === "object" && arg2 !== null) {
                options = arg2;
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'options' must be an object.");
              }
            } else {
              let isFetches = false;
              const arg1Keys = Object.getOwnPropertyNames(arg1);
              for (const name of this.outputNames) {
                if (arg1Keys.indexOf(name) !== -1) {
                  const v = arg1[name];
                  if (v === null || v instanceof Tensor2) {
                    isFetches = true;
                    isFetchesEmpty = false;
                    fetches[name] = v;
                  }
                }
              }
              if (isFetches) {
                if (typeof arg2 === "object" && arg2 !== null) {
                  options = arg2;
                } else if (typeof arg2 !== "undefined") {
                  throw new TypeError("'options' must be an object.");
                }
              } else {
                options = arg1;
              }
            }
          } else if (typeof arg1 !== "undefined") {
            throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
          }
          for (const name of this.inputNames) {
            if (typeof feeds[name] === "undefined") {
              throw new Error(`input '${name}' is missing in 'feeds'.`);
            }
          }
          if (isFetchesEmpty) {
            for (const name of this.outputNames) {
              fetches[name] = null;
            }
          }
          const results = await this.handler.run(feeds, fetches, options);
          const returnValue = {};
          for (const key in results) {
            if (Object.hasOwnProperty.call(results, key)) {
              const result = results[key];
              if (result instanceof Tensor2) {
                returnValue[key] = result;
              } else {
                returnValue[key] = new Tensor2(result.type, result.data, result.dims);
              }
            }
          }
          TRACE_EVENT_END("InferenceSession.run");
          TRACE_FUNC_END();
          return returnValue;
        }
        async release() {
          return this.handler.dispose();
        }
        static async create(arg0, arg1, arg2, arg3) {
          TRACE_FUNC_BEGIN();
          TRACE_EVENT_BEGIN("InferenceSession.create");
          let filePathOrUint8Array;
          let options = {};
          if (typeof arg0 === "string") {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else if (arg0 instanceof Uint8Array) {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
          } else if (arg0 instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && arg0 instanceof SharedArrayBuffer) {
            const buffer = arg0;
            let byteOffset = 0;
            let byteLength = arg0.byteLength;
            if (typeof arg1 === "object" && arg1 !== null) {
              options = arg1;
            } else if (typeof arg1 === "number") {
              byteOffset = arg1;
              if (!Number.isSafeInteger(byteOffset)) {
                throw new RangeError("'byteOffset' must be an integer.");
              }
              if (byteOffset < 0 || byteOffset >= buffer.byteLength) {
                throw new RangeError(`'byteOffset' is out of range [0, ${buffer.byteLength}).`);
              }
              byteLength = arg0.byteLength - byteOffset;
              if (typeof arg2 === "number") {
                byteLength = arg2;
                if (!Number.isSafeInteger(byteLength)) {
                  throw new RangeError("'byteLength' must be an integer.");
                }
                if (byteLength <= 0 || byteOffset + byteLength > buffer.byteLength) {
                  throw new RangeError(`'byteLength' is out of range (0, ${buffer.byteLength - byteOffset}].`);
                }
                if (typeof arg3 === "object" && arg3 !== null) {
                  options = arg3;
                } else if (typeof arg3 !== "undefined") {
                  throw new TypeError("'options' must be an object.");
                }
              } else if (typeof arg2 !== "undefined") {
                throw new TypeError("'byteLength' must be a number.");
              }
            } else if (typeof arg1 !== "undefined") {
              throw new TypeError("'options' must be an object.");
            }
            filePathOrUint8Array = new Uint8Array(buffer, byteOffset, byteLength);
          } else {
            throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
          }
          const [backend, optionsWithValidatedEPs] = await resolveBackendAndExecutionProviders(options);
          const handler = await backend.createInferenceSessionHandler(filePathOrUint8Array, optionsWithValidatedEPs);
          TRACE_EVENT_END("InferenceSession.create");
          TRACE_FUNC_END();
          return new _InferenceSession(handler);
        }
        startProfiling() {
          this.handler.startProfiling();
        }
        endProfiling() {
          this.handler.endProfiling();
        }
        get inputNames() {
          return this.handler.inputNames;
        }
        get outputNames() {
          return this.handler.outputNames;
        }
        get inputMetadata() {
          return this.handler.inputMetadata;
        }
        get outputMetadata() {
          return this.handler.outputMetadata;
        }
      };
    }
  });

  // common/dist/esm/inference-session.js
  var InferenceSession2;
  var init_inference_session = __esm({
    "common/dist/esm/inference-session.js"() {
      "use strict";
      init_inference_session_impl();
      InferenceSession2 = InferenceSession;
    }
  });

  // common/dist/esm/tensor-conversion.js
  var init_tensor_conversion = __esm({
    "common/dist/esm/tensor-conversion.js"() {
      "use strict";
    }
  });

  // common/dist/esm/tensor-factory.js
  var init_tensor_factory = __esm({
    "common/dist/esm/tensor-factory.js"() {
      "use strict";
    }
  });

  // common/dist/esm/onnx-model.js
  var init_onnx_model = __esm({
    "common/dist/esm/onnx-model.js"() {
      "use strict";
    }
  });

  // common/dist/esm/onnx-value.js
  var init_onnx_value = __esm({
    "common/dist/esm/onnx-value.js"() {
      "use strict";
    }
  });

  // common/dist/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
    TRACE_EVENT_END: () => TRACE_EVENT_END,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    env: () => env2,
    registerBackend: () => registerBackend
  });
  var init_esm = __esm({
    "common/dist/esm/index.js"() {
      "use strict";
      init_backend();
      init_env();
      init_inference_session();
      init_tensor();
      init_tensor_conversion();
      init_tensor_factory();
      init_trace();
      init_onnx_model();
      init_onnx_value();
    }
  });

  // web/lib/wasm/wasm-utils-env.ts
  var isNode;
  var init_wasm_utils_env = __esm({
    "web/lib/wasm/wasm-utils-env.ts"() {
      "use strict";
      isNode = false;
    }
  });

  // web/lib/wasm/proxy-worker/main.ts
  var main_exports = {};
  __export(main_exports, {
    default: () => main_default
  });
  var WORKER_NAME, isProxyWorker, main_default;
  var init_main = __esm({
    "web/lib/wasm/proxy-worker/main.ts"() {
      "use strict";
      init_wasm_core_impl();
      init_wasm_factory();
      init_wasm_utils_import();
      WORKER_NAME = "ort-wasm-proxy-worker";
      isProxyWorker = globalThis.self?.name === WORKER_NAME;
      if (isProxyWorker) {
        self.onmessage = (ev) => {
          const { type, in: message } = ev.data;
          try {
            switch (type) {
              case "init-wasm":
                initializeWebAssembly(message.wasm).then(
                  () => {
                    initRuntime(message).then(
                      () => {
                        postMessage({ type });
                      },
                      (err) => {
                        postMessage({ type, err });
                      }
                    );
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              case "init-ep": {
                const { epName, env: env3 } = message;
                initEp(env3, epName).then(
                  () => {
                    postMessage({ type });
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "copy-from": {
                const { buffer } = message;
                const bufferData = copyFromExternalBuffer(buffer);
                postMessage({ type, out: bufferData });
                break;
              }
              case "create": {
                const { model, options } = message;
                createSession(model, options).then(
                  (sessionMetadata) => {
                    postMessage({ type, out: sessionMetadata });
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "release":
                releaseSession(message);
                postMessage({ type });
                break;
              case "run": {
                const { sessionId, inputIndices, inputs, outputIndices, options } = message;
                run(sessionId, inputIndices, inputs, outputIndices, new Array(outputIndices.length).fill(null), options).then(
                  (outputs) => {
                    if (outputs.some((o) => o[3] !== "cpu")) {
                      postMessage({ type, err: "Proxy does not support non-cpu tensor location." });
                    } else {
                      postMessage(
                        { type, out: outputs },
                        extractTransferableBuffers([...inputs, ...outputs])
                      );
                    }
                  },
                  (err) => {
                    postMessage({ type, err });
                  }
                );
                break;
              }
              case "end-profiling":
                endProfiling(message);
                postMessage({ type });
                break;
              default:
            }
          } catch (err) {
            postMessage({ type, err });
          }
        };
      }
      main_default = isProxyWorker ? null : (urlOverride) => new Worker(urlOverride ?? scriptSrc, { type: false ? "module" : "classic", name: WORKER_NAME });
    }
  });

  // web/lib/wasm/wasm-utils-import.ts
  var origin, getScriptSrc, scriptSrc, inferWasmPathPrefixFromScriptSrc, isSameOrigin, normalizeUrl, fallbackUrl, preload, dynamicImportDefault, createProxyWorker, importProxyWorker, embeddedWasmModule, importWasmModule;
  var init_wasm_utils_import = __esm({
    "web/lib/wasm/wasm-utils-import.ts"() {
      "use strict";
      init_wasm_utils_env();
      origin = isNode || typeof location === "undefined" ? void 0 : location.origin;
      getScriptSrc = () => {
        if (isNode) {
          return void 0;
        }
        if (false) {
          if (isEsmImportMetaUrlHardcodedAsFileUri) {
            const URL2 = URL;
            return new URL(new URL2("ort.wasm.js", void 0).href, origin).href;
          }
          return void 0;
        }
        return typeof document !== "undefined" ? document.currentScript?.src : (
          // use `self.location.href` if available
          typeof self !== "undefined" ? self.location?.href : void 0
        );
      };
      scriptSrc = getScriptSrc();
      inferWasmPathPrefixFromScriptSrc = () => {
        if (scriptSrc && !scriptSrc.startsWith("blob:")) {
          return scriptSrc.substring(0, scriptSrc.lastIndexOf("/") + 1);
        }
        return void 0;
      };
      isSameOrigin = (filename, prefixOverride) => {
        try {
          const baseUrl = prefixOverride ?? scriptSrc;
          const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
          return url.origin === origin;
        } catch {
          return false;
        }
      };
      normalizeUrl = (filename, prefixOverride) => {
        const baseUrl = prefixOverride ?? scriptSrc;
        try {
          const url = baseUrl ? new URL(filename, baseUrl) : new URL(filename);
          return url.href;
        } catch {
          return void 0;
        }
      };
      fallbackUrl = (filename, prefixOverride) => `${prefixOverride ?? "./"}${filename}`;
      preload = async (absoluteUrl) => {
        const response = await fetch(absoluteUrl, { credentials: "same-origin" });
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      };
      dynamicImportDefault = async (url) => (await import(
        /* webpackIgnore: true */
        url
      )).default;
      createProxyWorker = // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
      false ? void 0 : (init_main(), __toCommonJS(main_exports)).default;
      importProxyWorker = async () => {
        if (!scriptSrc) {
          throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
        }
        if (isSameOrigin(scriptSrc)) {
          return [void 0, createProxyWorker()];
        }
        const url = await preload(scriptSrc);
        return [url, createProxyWorker(url)];
      };
      embeddedWasmModule = false ? (
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        (false ? null : false ? null : null).default
      ) : void 0;
      importWasmModule = async (urlOverride, prefixOverride, isMultiThreaded, isWasmOverridden) => {
        let useEmbeddedModule = embeddedWasmModule && !(urlOverride || prefixOverride);
        if (useEmbeddedModule) {
          if (!scriptSrc) {
            if (isWasmOverridden && !isMultiThreaded) {
              useEmbeddedModule = true;
            } else {
              throw new Error("cannot determine the script source URL.");
            }
          } else {
            useEmbeddedModule = isSameOrigin(scriptSrc);
          }
        }
        if (useEmbeddedModule) {
          return [void 0, embeddedWasmModule];
        } else {
          const wasmModuleFilename = false ? "ort-wasm-simd-threaded.jsep.mjs" : false ? "ort-wasm-simd-threaded.asyncify.mjs" : "ort-wasm-simd-threaded.mjs";
          const wasmModuleUrl = urlOverride ?? normalizeUrl(wasmModuleFilename, prefixOverride);
          const needPreload = !isNode && isMultiThreaded && wasmModuleUrl && !isSameOrigin(wasmModuleUrl, prefixOverride);
          const url = needPreload ? await preload(wasmModuleUrl) : wasmModuleUrl ?? fallbackUrl(wasmModuleFilename, prefixOverride);
          return [needPreload ? url : void 0, await dynamicImportDefault(url)];
        }
      };
    }
  });

  // web/lib/wasm/wasm-factory.ts
  var wasm, initialized, initializing, aborted, isMultiThreadSupported, isSimdSupported, isRelaxedSimdSupported, initializeWebAssembly, getInstance;
  var init_wasm_factory = __esm({
    "web/lib/wasm/wasm-factory.ts"() {
      "use strict";
      init_wasm_utils_import();
      initialized = false;
      initializing = false;
      aborted = false;
      isMultiThreadSupported = () => {
        if (typeof SharedArrayBuffer === "undefined") {
          return false;
        }
        try {
          if (typeof MessageChannel !== "undefined") {
            new MessageChannel().port1.postMessage(new SharedArrayBuffer(1));
          }
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              4,
              1,
              96,
              0,
              0,
              3,
              2,
              1,
              0,
              5,
              4,
              1,
              3,
              1,
              1,
              10,
              11,
              1,
              9,
              0,
              65,
              0,
              254,
              16,
              2,
              0,
              26,
              11
            ])
          );
        } catch (e) {
          return false;
        }
      };
      isSimdSupported = () => {
        try {
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              4,
              1,
              96,
              0,
              0,
              3,
              2,
              1,
              0,
              10,
              30,
              1,
              28,
              0,
              65,
              0,
              253,
              15,
              253,
              12,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              253,
              186,
              1,
              26,
              11
            ])
          );
        } catch (e) {
          return false;
        }
      };
      isRelaxedSimdSupported = () => {
        try {
          return WebAssembly.validate(
            new Uint8Array([
              0,
              97,
              115,
              109,
              1,
              0,
              0,
              0,
              1,
              5,
              1,
              96,
              0,
              1,
              123,
              3,
              2,
              1,
              0,
              10,
              19,
              1,
              17,
              0,
              65,
              1,
              253,
              15,
              65,
              2,
              253,
              15,
              65,
              3,
              253,
              15,
              253,
              147,
              2,
              11
            ])
          );
        } catch (e) {
          return false;
        }
      };
      initializeWebAssembly = async (flags) => {
        if (initialized) {
          return Promise.resolve();
        }
        if (initializing) {
          throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
        }
        if (aborted) {
          throw new Error("previous call to 'initializeWebAssembly()' failed.");
        }
        initializing = true;
        const timeout = flags.initTimeout;
        let numThreads = flags.numThreads;
        if (flags.simd === false) {
        } else if (flags.simd === "relaxed") {
          if (!isRelaxedSimdSupported()) {
            throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.");
          }
        } else if (!isSimdSupported()) {
          throw new Error("WebAssembly SIMD is not supported in the current environment.");
        }
        const multiThreadSupported = isMultiThreadSupported();
        if (numThreads > 1 && !multiThreadSupported) {
          if (typeof self !== "undefined" && !self.crossOriginIsolated) {
            console.warn(
              "env.wasm.numThreads is set to " + numThreads + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."
            );
          }
          console.warn(
            "WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."
          );
          flags.numThreads = numThreads = 1;
        }
        const wasmPaths = flags.wasmPaths;
        const wasmPrefixOverride = typeof wasmPaths === "string" ? wasmPaths : void 0;
        const mjsPathOverrideFlag = wasmPaths?.mjs;
        const mjsPathOverride = mjsPathOverrideFlag?.href ?? mjsPathOverrideFlag;
        const wasmPathOverrideFlag = wasmPaths?.wasm;
        const wasmPathOverride = wasmPathOverrideFlag?.href ?? wasmPathOverrideFlag;
        const wasmBinaryOverride = flags.wasmBinary;
        const [objectUrl, ortWasmFactory] = await importWasmModule(
          mjsPathOverride,
          wasmPrefixOverride,
          numThreads > 1,
          !!wasmBinaryOverride || !!wasmPathOverride
        );
        let isTimeout = false;
        const tasks = [];
        if (timeout > 0) {
          tasks.push(
            new Promise((resolve) => {
              setTimeout(() => {
                isTimeout = true;
                resolve();
              }, timeout);
            })
          );
        }
        tasks.push(
          new Promise((resolve, reject) => {
            const config = {
              /**
               * The number of threads. WebAssembly will create (Module.numThreads - 1) workers. If it is 1, no worker will be
               * created.
               */
              numThreads
            };
            if (wasmBinaryOverride) {
              config.wasmBinary = wasmBinaryOverride;
            } else if (wasmPathOverride || wasmPrefixOverride) {
              config.locateFile = (fileName) => wasmPathOverride ?? wasmPrefixOverride + fileName;
            } else if (mjsPathOverride && mjsPathOverride.indexOf("blob:") !== 0) {
              config.locateFile = (fileName) => new URL(fileName, mjsPathOverride).href;
            } else if (objectUrl) {
              const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
              if (inferredWasmPathPrefix) {
                config.locateFile = (fileName) => inferredWasmPathPrefix + fileName;
              }
            }
            ortWasmFactory(config).then(
              // wasm module initialized successfully
              (module) => {
                initializing = false;
                initialized = true;
                wasm = module;
                resolve();
                if (objectUrl) {
                  URL.revokeObjectURL(objectUrl);
                }
              },
              // wasm module failed to initialize
              (what) => {
                initializing = false;
                aborted = true;
                reject(what);
              }
            );
          })
        );
        await Promise.race(tasks);
        if (isTimeout) {
          throw new Error(`WebAssembly backend initializing failed due to timeout: ${timeout}ms`);
        }
      };
      getInstance = () => {
        if (initialized && wasm) {
          return wasm;
        }
        throw new Error("WebAssembly is not initialized yet.");
      };
    }
  });

  // web/lib/wasm/wasm-utils.ts
  var allocWasmString, iterateExtraOptions, checkLastError;
  var init_wasm_utils = __esm({
    "web/lib/wasm/wasm-utils.ts"() {
      "use strict";
      init_wasm_factory();
      allocWasmString = (data, allocs) => {
        const wasm2 = getInstance();
        const dataLength = wasm2.lengthBytesUTF8(data) + 1;
        const dataOffset = wasm2._malloc(dataLength);
        wasm2.stringToUTF8(data, dataOffset, dataLength);
        allocs.push(dataOffset);
        return dataOffset;
      };
      iterateExtraOptions = (options, prefix, seen, handler) => {
        if (typeof options == "object" && options !== null) {
          if (seen.has(options)) {
            throw new Error("Circular reference in options");
          } else {
            seen.add(options);
          }
        }
        Object.entries(options).forEach(([key, value]) => {
          const name = prefix ? prefix + key : key;
          if (typeof value === "object") {
            iterateExtraOptions(value, name + ".", seen, handler);
          } else if (typeof value === "string" || typeof value === "number") {
            handler(name, value.toString());
          } else if (typeof value === "boolean") {
            handler(name, value ? "1" : "0");
          } else {
            throw new Error(`Can't handle extra config type: ${typeof value}`);
          }
        });
      };
      checkLastError = (message) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const paramsOffset = wasm2.stackAlloc(2 * ptrSize);
          wasm2._OrtGetLastError(paramsOffset, paramsOffset + ptrSize);
          const errorCode = Number(wasm2.getValue(paramsOffset, ptrSize === 4 ? "i32" : "i64"));
          const errorMessagePointer = wasm2.getValue(paramsOffset + ptrSize, "*");
          const errorMessage = errorMessagePointer ? wasm2.UTF8ToString(errorMessagePointer) : "";
          throw new Error(`${message} ERROR_CODE: ${errorCode}, ERROR_MESSAGE: ${errorMessage}`);
        } finally {
          wasm2.stackRestore(stack);
        }
      };
    }
  });

  // web/lib/wasm/run-options.ts
  var setRunOptions;
  var init_run_options = __esm({
    "web/lib/wasm/run-options.ts"() {
      "use strict";
      init_wasm_factory();
      init_wasm_utils();
      setRunOptions = (options) => {
        const wasm2 = getInstance();
        let runOptionsHandle = 0;
        const allocs = [];
        const runOptions = options || {};
        try {
          if (options?.logSeverityLevel === void 0) {
            runOptions.logSeverityLevel = 2;
          } else if (typeof options.logSeverityLevel !== "number" || !Number.isInteger(options.logSeverityLevel) || options.logSeverityLevel < 0 || options.logSeverityLevel > 4) {
            throw new Error(`log severity level is not valid: ${options.logSeverityLevel}`);
          }
          if (options?.logVerbosityLevel === void 0) {
            runOptions.logVerbosityLevel = 0;
          } else if (typeof options.logVerbosityLevel !== "number" || !Number.isInteger(options.logVerbosityLevel)) {
            throw new Error(`log verbosity level is not valid: ${options.logVerbosityLevel}`);
          }
          if (options?.terminate === void 0) {
            runOptions.terminate = false;
          }
          let tagDataOffset = 0;
          if (options?.tag !== void 0) {
            tagDataOffset = allocWasmString(options.tag, allocs);
          }
          runOptionsHandle = wasm2._OrtCreateRunOptions(
            runOptions.logSeverityLevel,
            runOptions.logVerbosityLevel,
            !!runOptions.terminate,
            tagDataOffset
          );
          if (runOptionsHandle === 0) {
            checkLastError("Can't create run options.");
          }
          if (options?.extra !== void 0) {
            iterateExtraOptions(options.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
              const keyDataOffset = allocWasmString(key, allocs);
              const valueDataOffset = allocWasmString(value, allocs);
              if (wasm2._OrtAddRunConfigEntry(runOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
                checkLastError(`Can't set a run config entry: ${key} - ${value}.`);
              }
            });
          }
          return [runOptionsHandle, allocs];
        } catch (e) {
          if (runOptionsHandle !== 0) {
            wasm2._OrtReleaseRunOptions(runOptionsHandle);
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          throw e;
        }
      };
    }
  });

  // web/lib/wasm/session-options.ts
  var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, appendSessionConfig, setExecutionProviders, setSessionOptions;
  var init_session_options = __esm({
    "web/lib/wasm/session-options.ts"() {
      "use strict";
      init_wasm_factory();
      init_wasm_utils();
      getGraphOptimzationLevel = (graphOptimizationLevel) => {
        switch (graphOptimizationLevel) {
          case "disabled":
            return 0;
          case "basic":
            return 1;
          case "extended":
            return 2;
          case "layout":
            return 3;
          case "all":
            return 99;
          default:
            throw new Error(`unsupported graph optimization level: ${graphOptimizationLevel}`);
        }
      };
      getExecutionMode = (executionMode) => {
        switch (executionMode) {
          case "sequential":
            return 0;
          case "parallel":
            return 1;
          default:
            throw new Error(`unsupported execution mode: ${executionMode}`);
        }
      };
      appendDefaultOptions = (options) => {
        if (!options.extra) {
          options.extra = {};
        }
        if (!options.extra.session) {
          options.extra.session = {};
        }
        const session = options.extra.session;
        if (!session.use_ort_model_bytes_directly) {
          session.use_ort_model_bytes_directly = "1";
        }
        if (options.executionProviders && options.executionProviders.some((ep) => (typeof ep === "string" ? ep : ep.name) === "webgpu")) {
          options.enableMemPattern = false;
        }
      };
      appendSessionConfig = (sessionOptionsHandle, key, value, allocs) => {
        const keyDataOffset = allocWasmString(key, allocs);
        const valueDataOffset = allocWasmString(value, allocs);
        if (getInstance()._OrtAddSessionConfigEntry(sessionOptionsHandle, keyDataOffset, valueDataOffset) !== 0) {
          checkLastError(`Can't set a session config entry: ${key} - ${value}.`);
        }
      };
      setExecutionProviders = async (sessionOptionsHandle, executionProviders, allocs) => {
        for (const ep of executionProviders) {
          let epName = typeof ep === "string" ? ep : ep.name;
          const epOptions = [];
          switch (epName) {
            case "webnn":
              epName = "WEBNN";
              if (typeof ep !== "string") {
                const webnnOptions = ep;
                const deviceType = webnnOptions?.deviceType;
                if (deviceType) {
                  appendSessionConfig(sessionOptionsHandle, "deviceType", deviceType, allocs);
                }
              }
              break;
            case "webgpu":
              if (false) {
                epName = "WebGPU";
                let customDevice;
                if (typeof ep !== "string") {
                  const customOptions = ep;
                  if (customOptions.device) {
                    if (typeof GPUDevice !== "undefined" && customOptions.device instanceof GPUDevice) {
                      customDevice = customOptions.device;
                    } else {
                      throw new Error("Invalid GPU device set in WebGPU EP options.");
                    }
                  }
                }
                const info = getInstance().webgpuRegisterDevice(customDevice);
                if (info) {
                  const [deviceId, instanceHandle, deviceHandle] = info;
                  appendEpOption(epOptions, "deviceId", deviceId.toString(), allocs);
                  appendEpOption(epOptions, "webgpuInstance", instanceHandle.toString(), allocs);
                  appendEpOption(epOptions, "webgpuDevice", deviceHandle.toString(), allocs);
                }
              } else {
                epName = "JS";
                if (typeof ep !== "string") {
                  const webgpuOptions = ep;
                  if (webgpuOptions?.preferredLayout) {
                    if (webgpuOptions.preferredLayout !== "NCHW" && webgpuOptions.preferredLayout !== "NHWC") {
                      throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${webgpuOptions.preferredLayout}`);
                    }
                    appendSessionConfig(sessionOptionsHandle, "preferredLayout", webgpuOptions.preferredLayout, allocs);
                  }
                }
              }
              break;
            case "wasm":
            case "cpu":
              continue;
            default:
              throw new Error(`not supported execution provider: ${epName}`);
          }
          const epNameDataOffset = allocWasmString(epName, allocs);
          const epOptionsCount = epOptions.length;
          let keysOffset = 0;
          let valuesOffset = 0;
          if (epOptionsCount > 0) {
            keysOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
            allocs.push(keysOffset);
            valuesOffset = getInstance()._malloc(epOptionsCount * getInstance().PTR_SIZE);
            allocs.push(valuesOffset);
            for (let i = 0; i < epOptionsCount; i++) {
              getInstance().setValue(keysOffset + i * getInstance().PTR_SIZE, epOptions[i][0], "*");
              getInstance().setValue(valuesOffset + i * getInstance().PTR_SIZE, epOptions[i][1], "*");
            }
          }
          if (await getInstance()._OrtAppendExecutionProvider(
            sessionOptionsHandle,
            epNameDataOffset,
            keysOffset,
            valuesOffset,
            epOptionsCount
          ) !== 0) {
            checkLastError(`Can't append execution provider: ${epName}.`);
          }
        }
      };
      setSessionOptions = async (options) => {
        const wasm2 = getInstance();
        let sessionOptionsHandle = 0;
        const allocs = [];
        const sessionOptions = options || {};
        appendDefaultOptions(sessionOptions);
        try {
          const graphOptimizationLevel = getGraphOptimzationLevel(sessionOptions.graphOptimizationLevel ?? "all");
          const executionMode = getExecutionMode(sessionOptions.executionMode ?? "sequential");
          const logIdDataOffset = typeof sessionOptions.logId === "string" ? allocWasmString(sessionOptions.logId, allocs) : 0;
          const logSeverityLevel = sessionOptions.logSeverityLevel ?? 2;
          if (!Number.isInteger(logSeverityLevel) || logSeverityLevel < 0 || logSeverityLevel > 4) {
            throw new Error(`log severity level is not valid: ${logSeverityLevel}`);
          }
          const logVerbosityLevel = sessionOptions.logVerbosityLevel ?? 0;
          if (!Number.isInteger(logVerbosityLevel) || logVerbosityLevel < 0 || logVerbosityLevel > 4) {
            throw new Error(`log verbosity level is not valid: ${logVerbosityLevel}`);
          }
          const optimizedModelFilePathOffset = typeof sessionOptions.optimizedModelFilePath === "string" ? allocWasmString(sessionOptions.optimizedModelFilePath, allocs) : 0;
          sessionOptionsHandle = wasm2._OrtCreateSessionOptions(
            graphOptimizationLevel,
            !!sessionOptions.enableCpuMemArena,
            !!sessionOptions.enableMemPattern,
            executionMode,
            !!sessionOptions.enableProfiling,
            0,
            logIdDataOffset,
            logSeverityLevel,
            logVerbosityLevel,
            optimizedModelFilePathOffset
          );
          if (sessionOptionsHandle === 0) {
            checkLastError("Can't create session options.");
          }
          if (sessionOptions.executionProviders) {
            await setExecutionProviders(sessionOptionsHandle, sessionOptions.executionProviders, allocs);
          }
          if (sessionOptions.enableGraphCapture !== void 0) {
            if (typeof sessionOptions.enableGraphCapture !== "boolean") {
              throw new Error(`enableGraphCapture must be a boolean value: ${sessionOptions.enableGraphCapture}`);
            }
            appendSessionConfig(
              sessionOptionsHandle,
              "enableGraphCapture",
              sessionOptions.enableGraphCapture.toString(),
              allocs
            );
          }
          if (sessionOptions.freeDimensionOverrides) {
            for (const [name, value] of Object.entries(sessionOptions.freeDimensionOverrides)) {
              if (typeof name !== "string") {
                throw new Error(`free dimension override name must be a string: ${name}`);
              }
              if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
                throw new Error(`free dimension override value must be a non-negative integer: ${value}`);
              }
              const nameOffset = allocWasmString(name, allocs);
              if (wasm2._OrtAddFreeDimensionOverride(sessionOptionsHandle, nameOffset, value) !== 0) {
                checkLastError(`Can't set a free dimension override: ${name} - ${value}.`);
              }
            }
          }
          if (sessionOptions.extra !== void 0) {
            iterateExtraOptions(sessionOptions.extra, "", /* @__PURE__ */ new WeakSet(), (key, value) => {
              appendSessionConfig(sessionOptionsHandle, key, value, allocs);
            });
          }
          return [sessionOptionsHandle, allocs];
        } catch (e) {
          if (sessionOptionsHandle !== 0) {
            if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
              checkLastError("Can't release session options.");
            }
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          throw e;
        }
      };
    }
  });

  // web/lib/wasm/wasm-common.ts
  var tensorDataTypeStringToEnum, tensorDataTypeEnumToString, calculateTensorSizeInBytes, tensorTypeToTypedArrayConstructor, logLevelStringToEnum, isGpuBufferSupportedType, isMLTensorSupportedType, dataLocationStringToEnum;
  var init_wasm_common = __esm({
    "web/lib/wasm/wasm-common.ts"() {
      "use strict";
      tensorDataTypeStringToEnum = (type) => {
        switch (type) {
          case "int8":
            return 3 /* int8 */;
          case "uint8":
            return 2 /* uint8 */;
          case "bool":
            return 9 /* bool */;
          case "int16":
            return 5 /* int16 */;
          case "uint16":
            return 4 /* uint16 */;
          case "int32":
            return 6 /* int32 */;
          case "uint32":
            return 12 /* uint32 */;
          case "float16":
            return 10 /* float16 */;
          case "float32":
            return 1 /* float */;
          case "float64":
            return 11 /* double */;
          case "string":
            return 8 /* string */;
          case "int64":
            return 7 /* int64 */;
          case "uint64":
            return 13 /* uint64 */;
          case "int4":
            return 22 /* int4 */;
          case "uint4":
            return 21 /* uint4 */;
          default:
            throw new Error(`unsupported data type: ${type}`);
        }
      };
      tensorDataTypeEnumToString = (typeProto) => {
        switch (typeProto) {
          case 3 /* int8 */:
            return "int8";
          case 2 /* uint8 */:
            return "uint8";
          case 9 /* bool */:
            return "bool";
          case 5 /* int16 */:
            return "int16";
          case 4 /* uint16 */:
            return "uint16";
          case 6 /* int32 */:
            return "int32";
          case 12 /* uint32 */:
            return "uint32";
          case 10 /* float16 */:
            return "float16";
          case 1 /* float */:
            return "float32";
          case 11 /* double */:
            return "float64";
          case 8 /* string */:
            return "string";
          case 7 /* int64 */:
            return "int64";
          case 13 /* uint64 */:
            return "uint64";
          case 22 /* int4 */:
            return "int4";
          case 21 /* uint4 */:
            return "uint4";
          default:
            throw new Error(`unsupported data type: ${typeProto}`);
        }
      };
      calculateTensorSizeInBytes = (dateType, dimsOrSize) => {
        const elementSize = [
          -1,
          // undefined = 0
          4,
          // float = 1
          1,
          // uint8 = 2
          1,
          // int8 = 3
          2,
          // uint16 = 4
          2,
          // int16 = 5
          4,
          // int32 = 6
          8,
          // int64 = 7
          -1,
          // string = 8
          1,
          // bool = 9
          2,
          // float16 = 10
          8,
          // double = 11
          4,
          // uint32 = 12
          8,
          // uint64 = 13
          -1,
          // complex64 = 14
          -1,
          // complex128 = 15
          -1,
          // bfloat16 = 16
          -1,
          // FLOAT8E4M3FN = 17
          -1,
          // FLOAT8E4M3FNUZ = 18
          -1,
          // FLOAT8E5M2 = 19
          -1,
          // FLOAT8E5M2FNUZ = 20
          0.5,
          // uint4 = 21
          0.5
          // int4 = 22
        ][dateType];
        const size = typeof dimsOrSize === "number" ? dimsOrSize : dimsOrSize.reduce((a, b) => a * b, 1);
        return elementSize > 0 ? Math.ceil(size * elementSize) : void 0;
      };
      tensorTypeToTypedArrayConstructor = (type) => {
        switch (type) {
          case "float16":
            return typeof Float16Array !== "undefined" && Float16Array.from ? Float16Array : Uint16Array;
          case "float32":
            return Float32Array;
          case "uint8":
            return Uint8Array;
          case "int8":
            return Int8Array;
          case "uint16":
            return Uint16Array;
          case "int16":
            return Int16Array;
          case "int32":
            return Int32Array;
          case "bool":
            return Uint8Array;
          case "float64":
            return Float64Array;
          case "uint32":
            return Uint32Array;
          case "int64":
            return BigInt64Array;
          case "uint64":
            return BigUint64Array;
          default:
            throw new Error(`unsupported type: ${type}`);
        }
      };
      logLevelStringToEnum = (logLevel) => {
        switch (logLevel) {
          case "verbose":
            return 0;
          case "info":
            return 1;
          case "warning":
            return 2;
          case "error":
            return 3;
          case "fatal":
            return 4;
          default:
            throw new Error(`unsupported logging level: ${logLevel}`);
        }
      };
      isGpuBufferSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
      isMLTensorSupportedType = (type) => type === "float32" || type === "float16" || type === "int32" || type === "int64" || type === "uint32" || type === "uint64" || type === "int8" || type === "uint8" || type === "bool" || type === "uint4" || type === "int4";
      dataLocationStringToEnum = (location2) => {
        switch (location2) {
          case "none":
            return 0;
          case "cpu":
            return 1;
          case "cpu-pinned":
            return 2;
          case "texture":
            return 3;
          case "gpu-buffer":
            return 4;
          case "ml-tensor":
            return 5;
          default:
            throw new Error(`unsupported data location: ${location2}`);
        }
      };
    }
  });

  // web/lib/wasm/wasm-utils-load-file.ts
  var loadFile;
  var init_wasm_utils_load_file = __esm({
    "web/lib/wasm/wasm-utils-load-file.ts"() {
      "use strict";
      init_wasm_utils_env();
      loadFile = async (file) => {
        if (typeof file === "string") {
          if (isNode) {
            try {
              const { readFile } = __require("node:fs/promises");
              return new Uint8Array(await readFile(file));
            } catch (e) {
              if (e.code === "ERR_FS_FILE_TOO_LARGE") {
                const { createReadStream } = __require("node:fs");
                const stream = createReadStream(file);
                const chunks = [];
                for await (const chunk of stream) {
                  chunks.push(chunk);
                }
                return new Uint8Array(Buffer.concat(chunks));
              }
              throw e;
            }
          } else {
            const response = await fetch(file);
            if (!response.ok) {
              throw new Error(`failed to load external data file: ${file}`);
            }
            const contentLengthHeader = response.headers.get("Content-Length");
            const fileSize = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;
            if (fileSize < 1073741824) {
              return new Uint8Array(await response.arrayBuffer());
            } else {
              if (!response.body) {
                throw new Error(`failed to load external data file: ${file}, no response body.`);
              }
              const reader = response.body.getReader();
              let buffer;
              try {
                buffer = new ArrayBuffer(fileSize);
              } catch (e) {
                if (e instanceof RangeError) {
                  const pages = Math.ceil(fileSize / 65536);
                  buffer = new WebAssembly.Memory({ initial: pages, maximum: pages }).buffer;
                } else {
                  throw e;
                }
              }
              let offset = 0;
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                const chunkSize = value.byteLength;
                const chunk = new Uint8Array(buffer, offset, chunkSize);
                chunk.set(value);
                offset += chunkSize;
              }
              return new Uint8Array(buffer, 0, fileSize);
            }
          }
        } else if (file instanceof Blob) {
          return new Uint8Array(await file.arrayBuffer());
        } else if (file instanceof Uint8Array) {
          return file;
        } else {
          return new Uint8Array(file);
        }
      };
    }
  });

  // web/lib/wasm/wasm-core-impl.ts
  var initOrt, initRuntime, initEp, activeSessions, getSessionInputOutputCount, getSessionInputOutputMetadata, copyFromExternalBuffer, createSession, releaseSession, prepareInputOutputTensor, run, endProfiling, extractTransferableBuffers;
  var init_wasm_core_impl = __esm({
    "web/lib/wasm/wasm-core-impl.ts"() {
      "use strict";
      init_esm();
      init_run_options();
      init_session_options();
      init_wasm_common();
      init_wasm_factory();
      init_wasm_utils();
      init_wasm_utils_load_file();
      initOrt = (numThreads, loggingLevel) => {
        const errorCode = getInstance()._OrtInit(numThreads, loggingLevel);
        if (errorCode !== 0) {
          checkLastError("Can't initialize onnxruntime.");
        }
      };
      initRuntime = async (env3) => {
        initOrt(env3.wasm.numThreads, logLevelStringToEnum(env3.logLevel));
      };
      initEp = async (env3, epName) => {
        getInstance().asyncInit?.();
        let webgpuAdapter = env3.webgpu.adapter;
        if (epName === "webgpu") {
          if (typeof navigator === "undefined" || !navigator.gpu) {
            throw new Error("WebGPU is not supported in current environment");
          }
          if (!webgpuAdapter) {
            const powerPreference = env3.webgpu.powerPreference;
            if (powerPreference !== void 0 && powerPreference !== "low-power" && powerPreference !== "high-performance") {
              throw new Error(`Invalid powerPreference setting: "${powerPreference}"`);
            }
            const forceFallbackAdapter = env3.webgpu.forceFallbackAdapter;
            if (forceFallbackAdapter !== void 0 && typeof forceFallbackAdapter !== "boolean") {
              throw new Error(`Invalid forceFallbackAdapter setting: "${forceFallbackAdapter}"`);
            }
            webgpuAdapter = await navigator.gpu.requestAdapter({ powerPreference, forceFallbackAdapter });
            if (!webgpuAdapter) {
              throw new Error(
                'Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.'
              );
            }
          } else {
            if (typeof webgpuAdapter.limits !== "object" || typeof webgpuAdapter.features !== "object" || typeof webgpuAdapter.requestDevice !== "function") {
              throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
            }
          }
        }
        if (epName === "webnn") {
          if (typeof navigator === "undefined" || !navigator.ml) {
            throw new Error("WebNN is not supported in current environment");
          }
        }
        if (false) {
          const initJsep = null.init;
          if (epName === "webgpu") {
            await initJsep("webgpu", getInstance(), env3, webgpuAdapter);
          }
          if (epName === "webnn") {
            await initJsep("webnn", getInstance(), env3);
          }
        } else {
          if (false) {
            getInstance().webgpuInit((device) => {
              env3.webgpu.device = device;
            });
          }
          if (false) {
            const backend = new null.WebNNBackend(env3);
            getInstance().webnnInit([
              backend,
              // webnnReserveTensorId
              () => backend.reserveTensorId(),
              // webnnReleaseTensorId,
              (tensorId) => backend.releaseTensorId(tensorId),
              // webnnEnsureTensor
              async (sessionId, tensorId, onnxDataType, shape, copyOld) => backend.ensureTensor(sessionId, tensorId, onnxDataType, shape, copyOld),
              // webnnUploadTensor
              (tensorId, data) => {
                backend.uploadTensor(tensorId, data);
              },
              // webnnDownloadTensor
              async (tensorId, dstBuffer) => backend.downloadTensor(tensorId, dstBuffer),
              // webnnRegisterMLContext
              (sessionId, mlContext) => backend.registerMLContext(sessionId, mlContext),
              // webnnEnableTraceEvent
              !!env3.trace
            ]);
          }
        }
      };
      activeSessions = /* @__PURE__ */ new Map();
      getSessionInputOutputCount = (sessionHandle) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const dataOffset = wasm2.stackAlloc(2 * ptrSize);
          const errorCode = wasm2._OrtGetInputOutputCount(sessionHandle, dataOffset, dataOffset + ptrSize);
          if (errorCode !== 0) {
            checkLastError("Can't get session input/output count.");
          }
          const type = ptrSize === 4 ? "i32" : "i64";
          return [Number(wasm2.getValue(dataOffset, type)), Number(wasm2.getValue(dataOffset + ptrSize, type))];
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      getSessionInputOutputMetadata = (sessionHandle, index) => {
        const wasm2 = getInstance();
        const stack = wasm2.stackSave();
        let metadataOffset = 0;
        try {
          const ptrSize = wasm2.PTR_SIZE;
          const dataOffset = wasm2.stackAlloc(2 * ptrSize);
          const errorCode = wasm2._OrtGetInputOutputMetadata(sessionHandle, index, dataOffset, dataOffset + ptrSize);
          if (errorCode !== 0) {
            checkLastError("Can't get session input/output metadata.");
          }
          const nameOffset = Number(wasm2.getValue(dataOffset, "*"));
          metadataOffset = Number(wasm2.getValue(dataOffset + ptrSize, "*"));
          const elementType = wasm2.HEAP32[metadataOffset / 4];
          if (elementType === 0) {
            return [nameOffset, 0];
          }
          const dimsCount = wasm2.HEAPU32[metadataOffset / 4 + 1];
          const dims = [];
          for (let i = 0; i < dimsCount; i++) {
            const symbolicDimNameOffset = Number(wasm2.getValue(metadataOffset + 8 + i * ptrSize, "*"));
            dims.push(
              symbolicDimNameOffset !== 0 ? wasm2.UTF8ToString(symbolicDimNameOffset) : Number(wasm2.getValue(metadataOffset + 8 + (i + dimsCount) * ptrSize, "*"))
            );
          }
          return [nameOffset, elementType, dims];
        } finally {
          wasm2.stackRestore(stack);
          if (metadataOffset !== 0) {
            wasm2._OrtFree(metadataOffset);
          }
        }
      };
      copyFromExternalBuffer = (model) => {
        const wasm2 = getInstance();
        const modelDataOffset = wasm2._malloc(model.byteLength);
        if (modelDataOffset === 0) {
          throw new Error(`Can't create a session. failed to allocate a buffer of size ${model.byteLength}.`);
        }
        wasm2.HEAPU8.set(model, modelDataOffset);
        return [modelDataOffset, model.byteLength];
      };
      createSession = async (modelData, options) => {
        let modelDataOffset, modelDataLength;
        const wasm2 = getInstance();
        if (Array.isArray(modelData)) {
          [modelDataOffset, modelDataLength] = modelData;
        } else if (modelData.buffer === wasm2.HEAPU8.buffer) {
          [modelDataOffset, modelDataLength] = [modelData.byteOffset, modelData.byteLength];
        } else {
          [modelDataOffset, modelDataLength] = copyFromExternalBuffer(modelData);
        }
        let sessionHandle = 0;
        let sessionOptionsHandle = 0;
        let ioBindingHandle = 0;
        let allocs = [];
        const inputNamesUTF8Encoded = [];
        const outputNamesUTF8Encoded = [];
        try {
          [sessionOptionsHandle, allocs] = await setSessionOptions(options);
          if (options?.externalData && wasm2.mountExternalData) {
            const loadingPromises = [];
            for (const file of options.externalData) {
              const path = typeof file === "string" ? file : file.path;
              loadingPromises.push(
                loadFile(typeof file === "string" ? file : file.data).then((data) => {
                  wasm2.mountExternalData(path, data);
                })
              );
            }
            await Promise.all(loadingPromises);
          }
          for (const provider of options?.executionProviders ?? []) {
            const providerName = typeof provider === "string" ? provider : provider.name;
            if (providerName === "webnn") {
              wasm2.shouldTransferToMLTensor = false;
              if (typeof provider !== "string") {
                const webnnOptions = provider;
                const context = webnnOptions?.context;
                const gpuDevice = webnnOptions?.gpuDevice;
                const deviceType = webnnOptions?.deviceType;
                const powerPreference = webnnOptions?.powerPreference;
                if (context) {
                  wasm2.currentContext = context;
                } else if (gpuDevice) {
                  wasm2.currentContext = await wasm2.webnnCreateMLContext(gpuDevice);
                } else {
                  wasm2.currentContext = await wasm2.webnnCreateMLContext({ deviceType, powerPreference });
                }
              } else {
                wasm2.currentContext = await wasm2.webnnCreateMLContext();
              }
              break;
            }
          }
          sessionHandle = await wasm2._OrtCreateSession(modelDataOffset, modelDataLength, sessionOptionsHandle);
          wasm2.webgpuOnCreateSession?.(sessionHandle);
          if (sessionHandle === 0) {
            checkLastError("Can't create a session.");
          }
          wasm2.jsepOnCreateSession?.();
          if (wasm2.currentContext) {
            wasm2.webnnRegisterMLContext(sessionHandle, wasm2.currentContext);
            wasm2.currentContext = void 0;
            wasm2.shouldTransferToMLTensor = true;
          }
          const [inputCount, outputCount] = getSessionInputOutputCount(sessionHandle);
          const enableGraphCapture = !!options?.enableGraphCapture;
          const inputNames = [];
          const outputNames = [];
          const inputMetadata = [];
          const outputMetadata = [];
          const outputPreferredLocations = [];
          for (let i = 0; i < inputCount; i++) {
            const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i);
            if (nameOffset === 0) {
              checkLastError("Can't get an input name.");
            }
            inputNamesUTF8Encoded.push(nameOffset);
            const name = wasm2.UTF8ToString(nameOffset);
            inputNames.push(name);
            inputMetadata.push(
              elementType === 0 ? { name, isTensor: false } : { name, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
            );
          }
          for (let i = 0; i < outputCount; i++) {
            const [nameOffset, elementType, shape] = getSessionInputOutputMetadata(sessionHandle, i + inputCount);
            if (nameOffset === 0) {
              checkLastError("Can't get an output name.");
            }
            outputNamesUTF8Encoded.push(nameOffset);
            const nameString = wasm2.UTF8ToString(nameOffset);
            outputNames.push(nameString);
            outputMetadata.push(
              elementType === 0 ? { name: nameString, isTensor: false } : { name: nameString, isTensor: true, type: tensorDataTypeEnumToString(elementType), shape }
            );
            if (false) {
              if (enableGraphCapture && options?.preferredOutputLocation === void 0) {
                outputPreferredLocations.push("gpu-buffer");
                continue;
              }
              const location2 = typeof options?.preferredOutputLocation === "string" ? options.preferredOutputLocation : options?.preferredOutputLocation?.[nameString] ?? "cpu";
              const isGraphOutput = wasm2.webnnIsGraphOutput;
              if (location2 === "cpu" && isGraphOutput && isGraphOutput(sessionHandle, nameString)) {
                outputPreferredLocations.push("ml-tensor-cpu-output");
                continue;
              }
              if (location2 !== "cpu" && location2 !== "cpu-pinned" && location2 !== "gpu-buffer" && location2 !== "ml-tensor") {
                throw new Error(`Not supported preferred output location: ${location2}.`);
              }
              if (enableGraphCapture && location2 !== "gpu-buffer") {
                throw new Error(
                  `Not supported preferred output location: ${location2}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`
                );
              }
              outputPreferredLocations.push(location2);
            }
          }
          let bindingState = null;
          if (false) {
            ioBindingHandle = wasm2._OrtCreateBinding(sessionHandle);
            if (ioBindingHandle === 0) {
              checkLastError("Can't create IO binding.");
            }
            bindingState = {
              handle: ioBindingHandle,
              outputPreferredLocations,
              outputPreferredLocationsEncoded: outputPreferredLocations.map((l) => l === "ml-tensor-cpu-output" ? "ml-tensor" : l).map((l) => dataLocationStringToEnum(l))
            };
          }
          activeSessions.set(sessionHandle, [
            sessionHandle,
            inputNamesUTF8Encoded,
            outputNamesUTF8Encoded,
            bindingState,
            enableGraphCapture,
            false
          ]);
          return [sessionHandle, inputNames, outputNames, inputMetadata, outputMetadata];
        } catch (e) {
          inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
          if (ioBindingHandle !== 0) {
            if (wasm2._OrtReleaseBinding(ioBindingHandle) !== 0) {
              checkLastError("Can't release IO binding.");
            }
          }
          if (sessionHandle !== 0) {
            if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
              checkLastError("Can't release session.");
            }
          }
          throw e;
        } finally {
          wasm2._free(modelDataOffset);
          if (sessionOptionsHandle !== 0) {
            if (wasm2._OrtReleaseSessionOptions(sessionOptionsHandle) !== 0) {
              checkLastError("Can't release session options.");
            }
          }
          allocs.forEach((alloc) => wasm2._free(alloc));
          wasm2.unmountExternalData?.();
        }
      };
      releaseSession = (sessionId) => {
        const wasm2 = getInstance();
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error(`cannot release session. invalid session id: ${sessionId}`);
        }
        const [sessionHandle, inputNamesUTF8Encoded, outputNamesUTF8Encoded, ioBindingState, enableGraphCapture] = session;
        if (ioBindingState) {
          if (enableGraphCapture) {
            if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
              checkLastError("Can't clear bound outputs.");
            }
          }
          if (wasm2._OrtReleaseBinding(ioBindingState.handle) !== 0) {
            checkLastError("Can't release IO binding.");
          }
        }
        wasm2.jsepOnReleaseSession?.(sessionId);
        wasm2.webnnOnReleaseSession?.(sessionId);
        wasm2.webgpuOnReleaseSession?.(sessionId);
        inputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        outputNamesUTF8Encoded.forEach((buf) => wasm2._OrtFree(buf));
        if (wasm2._OrtReleaseSession(sessionHandle) !== 0) {
          checkLastError("Can't release session.");
        }
        activeSessions.delete(sessionId);
      };
      prepareInputOutputTensor = async (tensor, tensorHandles, allocs, sessionId, tensorNameUTF8Encoded, index, enableGraphCapture = false) => {
        if (!tensor) {
          tensorHandles.push(0);
          return;
        }
        const wasm2 = getInstance();
        const ptrSize = wasm2.PTR_SIZE;
        const dataType = tensor[0];
        const dims = tensor[1];
        const location2 = tensor[3];
        let actualLocation = location2;
        let rawData;
        let dataByteLength;
        if (dataType === "string" && (location2 === "gpu-buffer" || location2 === "ml-tensor")) {
          throw new Error("String tensor is not supported on GPU.");
        }
        if (enableGraphCapture && location2 !== "gpu-buffer") {
          throw new Error(
            `External buffer must be provided for input/output index ${index} when enableGraphCapture is true.`
          );
        }
        if (location2 === "gpu-buffer") {
          const gpuBuffer = tensor[2].gpuBuffer;
          dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
          if (false) {
            const registerBuffer = wasm2.webgpuRegisterBuffer;
            if (!registerBuffer) {
              throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            }
            rawData = registerBuffer(gpuBuffer, sessionId);
          } else {
            const registerBuffer = wasm2.jsepRegisterBuffer;
            if (!registerBuffer) {
              throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            }
            rawData = registerBuffer(sessionId, index, gpuBuffer, dataByteLength);
          }
        } else if (location2 === "ml-tensor") {
          const mlTensor = tensor[2].mlTensor;
          dataByteLength = calculateTensorSizeInBytes(tensorDataTypeStringToEnum(dataType), dims);
          const registerMLTensor = wasm2.webnnRegisterMLTensor;
          if (!registerMLTensor) {
            throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
          }
          rawData = registerMLTensor(sessionId, mlTensor, tensorDataTypeStringToEnum(dataType), dims);
        } else {
          const data = tensor[2];
          if (Array.isArray(data)) {
            dataByteLength = ptrSize * data.length;
            rawData = wasm2._malloc(dataByteLength);
            allocs.push(rawData);
            for (let i = 0; i < data.length; i++) {
              if (typeof data[i] !== "string") {
                throw new TypeError(`tensor data at index ${i} is not a string`);
              }
              wasm2.setValue(rawData + i * ptrSize, allocWasmString(data[i], allocs), "*");
            }
          } else {
            const isGraphInput = wasm2.webnnIsGraphInput;
            const isGraphOutput = wasm2.webnnIsGraphOutput;
            if (dataType !== "string" && isGraphInput && isGraphOutput) {
              const tensorName = wasm2.UTF8ToString(tensorNameUTF8Encoded);
              if (isGraphInput(sessionId, tensorName) || isGraphOutput(sessionId, tensorName)) {
                const dataTypeEnum = tensorDataTypeStringToEnum(dataType);
                dataByteLength = calculateTensorSizeInBytes(dataTypeEnum, dims);
                actualLocation = "ml-tensor";
                const createTemporaryTensor = wasm2.webnnCreateTemporaryTensor;
                const uploadTensor = wasm2.webnnUploadTensor;
                if (!createTemporaryTensor || !uploadTensor) {
                  throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
                }
                const tensorId = await createTemporaryTensor(sessionId, dataTypeEnum, dims);
                uploadTensor(tensorId, new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
                rawData = tensorId;
              } else {
                dataByteLength = data.byteLength;
                rawData = wasm2._malloc(dataByteLength);
                allocs.push(rawData);
                wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
              }
            } else {
              dataByteLength = data.byteLength;
              rawData = wasm2._malloc(dataByteLength);
              allocs.push(rawData);
              wasm2.HEAPU8.set(new Uint8Array(data.buffer, data.byteOffset, dataByteLength), rawData);
            }
          }
        }
        const stack = wasm2.stackSave();
        const dimsOffset = wasm2.stackAlloc(4 * dims.length);
        try {
          dims.forEach((d, index2) => wasm2.setValue(dimsOffset + index2 * ptrSize, d, ptrSize === 4 ? "i32" : "i64"));
          const tensor2 = wasm2._OrtCreateTensor(
            tensorDataTypeStringToEnum(dataType),
            rawData,
            dataByteLength,
            dimsOffset,
            dims.length,
            dataLocationStringToEnum(actualLocation)
          );
          if (tensor2 === 0) {
            checkLastError(`Can't create tensor for input/output. session=${sessionId}, index=${index}.`);
          }
          tensorHandles.push(tensor2);
        } finally {
          wasm2.stackRestore(stack);
        }
      };
      run = async (sessionId, inputIndices, inputTensors, outputIndices, outputTensors, options) => {
        const wasm2 = getInstance();
        const ptrSize = wasm2.PTR_SIZE;
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error(`cannot run inference. invalid session id: ${sessionId}`);
        }
        const sessionHandle = session[0];
        const inputNamesUTF8Encoded = session[1];
        const outputNamesUTF8Encoded = session[2];
        const ioBindingState = session[3];
        const enableGraphCapture = session[4];
        const inputOutputBound = session[5];
        const inputCount = inputIndices.length;
        const outputCount = outputIndices.length;
        let runOptionsHandle = 0;
        let runOptionsAllocs = [];
        const inputTensorHandles = [];
        const outputTensorHandles = [];
        const inputOutputAllocs = [];
        const preAllocatedOutputs = [];
        const beforeRunStack = wasm2.stackSave();
        const inputValuesOffset = wasm2.stackAlloc(inputCount * ptrSize);
        const inputNamesOffset = wasm2.stackAlloc(inputCount * ptrSize);
        const outputValuesOffset = wasm2.stackAlloc(outputCount * ptrSize);
        const outputNamesOffset = wasm2.stackAlloc(outputCount * ptrSize);
        try {
          [runOptionsHandle, runOptionsAllocs] = setRunOptions(options);
          TRACE_EVENT_BEGIN("wasm prepareInputOutputTensor");
          for (let i = 0; i < inputCount; i++) {
            await prepareInputOutputTensor(
              inputTensors[i],
              inputTensorHandles,
              inputOutputAllocs,
              sessionId,
              inputNamesUTF8Encoded[inputIndices[i]],
              inputIndices[i],
              enableGraphCapture
            );
          }
          for (let i = 0; i < outputCount; i++) {
            await prepareInputOutputTensor(
              outputTensors[i],
              outputTensorHandles,
              inputOutputAllocs,
              sessionId,
              outputNamesUTF8Encoded[outputIndices[i]],
              inputCount + outputIndices[i],
              enableGraphCapture
            );
          }
          TRACE_EVENT_END("wasm prepareInputOutputTensor");
          for (let i = 0; i < inputCount; i++) {
            wasm2.setValue(inputValuesOffset + i * ptrSize, inputTensorHandles[i], "*");
            wasm2.setValue(inputNamesOffset + i * ptrSize, inputNamesUTF8Encoded[inputIndices[i]], "*");
          }
          for (let i = 0; i < outputCount; i++) {
            wasm2.setValue(outputValuesOffset + i * ptrSize, outputTensorHandles[i], "*");
            wasm2.setValue(outputNamesOffset + i * ptrSize, outputNamesUTF8Encoded[outputIndices[i]], "*");
          }
          if (false) {
            const { handle, outputPreferredLocations, outputPreferredLocationsEncoded } = ioBindingState;
            if (inputNamesUTF8Encoded.length !== inputCount) {
              throw new Error(
                `input count from feeds (${inputCount}) is expected to be always equal to model's input count (${inputNamesUTF8Encoded.length}).`
              );
            }
            TRACE_EVENT_BEGIN("wasm bindInputsOutputs");
            for (let i = 0; i < inputCount; i++) {
              const index = inputIndices[i];
              const errorCode2 = await wasm2._OrtBindInput(handle, inputNamesUTF8Encoded[index], inputTensorHandles[i]);
              if (errorCode2 !== 0) {
                checkLastError(`Can't bind input[${i}] for session=${sessionId}.`);
              }
            }
            for (let i = 0; i < outputCount; i++) {
              const index = outputIndices[i];
              const location2 = outputTensors[i]?.[3];
              if (location2) {
                preAllocatedOutputs.push(outputTensorHandles[i]);
                const errorCode2 = wasm2._OrtBindOutput(handle, outputNamesUTF8Encoded[index], outputTensorHandles[i], 0);
                if (errorCode2 !== 0) {
                  checkLastError(`Can't bind pre-allocated output[${i}] for session=${sessionId}.`);
                }
              } else {
                const errorCode2 = wasm2._OrtBindOutput(
                  handle,
                  outputNamesUTF8Encoded[index],
                  0,
                  outputPreferredLocationsEncoded[index]
                );
                if (errorCode2 !== 0) {
                  checkLastError(`Can't bind output[${i}] to ${outputPreferredLocations[i]} for session=${sessionId}.`);
                }
              }
            }
            TRACE_EVENT_END("wasm bindInputsOutputs");
            activeSessions.set(sessionId, [
              sessionHandle,
              inputNamesUTF8Encoded,
              outputNamesUTF8Encoded,
              ioBindingState,
              enableGraphCapture,
              true
            ]);
          }
          wasm2.jsepOnRunStart?.(sessionHandle);
          wasm2.webnnOnRunStart?.(sessionHandle);
          let errorCode;
          if (false) {
            errorCode = await wasm2._OrtRunWithBinding(
              sessionHandle,
              ioBindingState.handle,
              outputCount,
              outputValuesOffset,
              runOptionsHandle
            );
          } else {
            errorCode = await wasm2._OrtRun(
              sessionHandle,
              inputNamesOffset,
              inputValuesOffset,
              inputCount,
              outputNamesOffset,
              outputCount,
              outputValuesOffset,
              runOptionsHandle
            );
          }
          if (errorCode !== 0) {
            checkLastError("failed to call OrtRun().");
          }
          const output = [];
          const outputPromises = [];
          TRACE_EVENT_BEGIN("wasm ProcessOutputTensor");
          for (let i = 0; i < outputCount; i++) {
            const tensor = Number(wasm2.getValue(outputValuesOffset + i * ptrSize, "*"));
            if (tensor === outputTensorHandles[i] || preAllocatedOutputs.includes(outputTensorHandles[i])) {
              output.push(outputTensors[i]);
              if (tensor !== outputTensorHandles[i]) {
                if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                  checkLastError("Can't release tensor.");
                }
              }
              continue;
            }
            const beforeGetTensorDataStack = wasm2.stackSave();
            const tensorDataOffset = wasm2.stackAlloc(4 * ptrSize);
            let keepOutputTensor = false;
            let type, dataOffset = 0;
            try {
              const errorCode2 = wasm2._OrtGetTensorData(
                tensor,
                tensorDataOffset,
                tensorDataOffset + ptrSize,
                tensorDataOffset + 2 * ptrSize,
                tensorDataOffset + 3 * ptrSize
              );
              if (errorCode2 !== 0) {
                checkLastError(`Can't access output tensor data on index ${i}.`);
              }
              const valueType = ptrSize === 4 ? "i32" : "i64";
              const dataType = Number(wasm2.getValue(tensorDataOffset, valueType));
              dataOffset = wasm2.getValue(tensorDataOffset + ptrSize, "*");
              const dimsOffset = wasm2.getValue(tensorDataOffset + ptrSize * 2, "*");
              const dimsLength = Number(wasm2.getValue(tensorDataOffset + ptrSize * 3, valueType));
              const dims = [];
              for (let i2 = 0; i2 < dimsLength; i2++) {
                dims.push(Number(wasm2.getValue(dimsOffset + i2 * ptrSize, valueType)));
              }
              if (wasm2._OrtFree(dimsOffset) !== 0) {
                checkLastError("Can't free memory for tensor dims.");
              }
              const size = dims.reduce((a, b) => a * b, 1);
              type = tensorDataTypeEnumToString(dataType);
              const preferredLocation = ioBindingState?.outputPreferredLocations[outputIndices[i]];
              if (type === "string") {
                if (preferredLocation === "gpu-buffer" || preferredLocation === "ml-tensor") {
                  throw new Error("String tensor is not supported on GPU.");
                }
                const stringData = [];
                for (let i2 = 0; i2 < size; i2++) {
                  const offset = wasm2.getValue(dataOffset + i2 * ptrSize, "*");
                  const nextOffset = wasm2.getValue(dataOffset + (i2 + 1) * ptrSize, "*");
                  const maxBytesToRead = i2 === size - 1 ? void 0 : nextOffset - offset;
                  stringData.push(wasm2.UTF8ToString(offset, maxBytesToRead));
                }
                output.push([type, dims, stringData, "cpu"]);
              } else {
                if (preferredLocation === "gpu-buffer" && size > 0) {
                  const getBuffer = false ? wasm2.webgpuGetBuffer : wasm2.jsepGetBuffer;
                  if (!getBuffer) {
                    throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                  }
                  const gpuBuffer = getBuffer(dataOffset);
                  const bufferSize = calculateTensorSizeInBytes(dataType, size);
                  if (bufferSize === void 0 || !isGpuBufferSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  keepOutputTensor = true;
                  if (false) {
                    wasm2.webgpuRegisterBuffer(gpuBuffer, sessionId, dataOffset);
                    const downloadDataFunction = wasm2.webgpuCreateDownloader(gpuBuffer, bufferSize, sessionId);
                    output.push([
                      type,
                      dims,
                      {
                        gpuBuffer,
                        download: async () => {
                          const arrayBuffer = await downloadDataFunction();
                          const data = new (tensorTypeToTypedArrayConstructor(type))(arrayBuffer);
                          return data;
                        },
                        dispose: () => {
                          if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                            checkLastError("Can't release tensor.");
                          }
                        }
                      },
                      "gpu-buffer"
                    ]);
                  } else {
                    output.push([
                      type,
                      dims,
                      {
                        gpuBuffer,
                        download: wasm2.jsepCreateDownloader(gpuBuffer, bufferSize, type),
                        dispose: () => {
                          if (wasm2._OrtReleaseTensor(tensor) !== 0) {
                            checkLastError("Can't release tensor.");
                          }
                        }
                      },
                      "gpu-buffer"
                    ]);
                  }
                } else if (preferredLocation === "ml-tensor" && size > 0) {
                  const ensureTensor = wasm2.webnnEnsureTensor;
                  const isGraphInputOutputTypeSupported = wasm2.webnnIsGraphInputOutputTypeSupported;
                  if (!ensureTensor || !isGraphInputOutputTypeSupported) {
                    throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                  }
                  const tensorSize = calculateTensorSizeInBytes(dataType, size);
                  if (tensorSize === void 0 || !isMLTensorSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  if (!isGraphInputOutputTypeSupported(sessionId, type, false)) {
                    throw new Error(
                      `preferredLocation "ml-tensor" for ${type} output is not supported by current WebNN Context.`
                    );
                  }
                  const mlTensor = await ensureTensor(sessionId, dataOffset, dataType, dims, false);
                  keepOutputTensor = true;
                  output.push([
                    type,
                    dims,
                    {
                      mlTensor,
                      download: wasm2.webnnCreateMLTensorDownloader(dataOffset, type),
                      dispose: () => {
                        wasm2.webnnReleaseTensorId(dataOffset);
                        wasm2._OrtReleaseTensor(tensor);
                      }
                    },
                    "ml-tensor"
                  ]);
                } else if (preferredLocation === "ml-tensor-cpu-output" && size > 0) {
                  const data = wasm2.webnnCreateMLTensorDownloader(dataOffset, type)();
                  const index = output.length;
                  keepOutputTensor = true;
                  outputPromises.push(
                    (async () => {
                      const result = [index, await data];
                      wasm2.webnnReleaseTensorId(dataOffset);
                      wasm2._OrtReleaseTensor(tensor);
                      return result;
                    })()
                  );
                  output.push([type, dims, [], "cpu"]);
                } else {
                  const typedArrayConstructor = tensorTypeToTypedArrayConstructor(type);
                  const data = new typedArrayConstructor(size);
                  new Uint8Array(data.buffer, data.byteOffset, data.byteLength).set(
                    wasm2.HEAPU8.subarray(dataOffset, dataOffset + data.byteLength)
                  );
                  output.push([type, dims, data, "cpu"]);
                }
              }
            } finally {
              wasm2.stackRestore(beforeGetTensorDataStack);
              if (type === "string" && dataOffset) {
                wasm2._free(dataOffset);
              }
              if (!keepOutputTensor) {
                wasm2._OrtReleaseTensor(tensor);
              }
            }
          }
          if (ioBindingState && !enableGraphCapture) {
            if (wasm2._OrtClearBoundOutputs(ioBindingState.handle) !== 0) {
              checkLastError("Can't clear bound outputs.");
            }
            activeSessions.set(sessionId, [
              sessionHandle,
              inputNamesUTF8Encoded,
              outputNamesUTF8Encoded,
              ioBindingState,
              enableGraphCapture,
              false
            ]);
          }
          for (const [index, data] of await Promise.all(outputPromises)) {
            output[index][2] = data;
          }
          TRACE_EVENT_END("wasm ProcessOutputTensor");
          return output;
        } finally {
          wasm2.webnnOnRunEnd?.(sessionHandle);
          wasm2.stackRestore(beforeRunStack);
          if (false) {
            inputTensors.forEach((t) => {
              if (t && t[3] === "gpu-buffer") {
                wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
              }
            });
            outputTensors.forEach((t) => {
              if (t && t[3] === "gpu-buffer") {
                wasm2.webgpuUnregisterBuffer(t[2].gpuBuffer);
              }
            });
          }
          inputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
          outputTensorHandles.forEach((v) => wasm2._OrtReleaseTensor(v));
          inputOutputAllocs.forEach((p) => wasm2._free(p));
          if (runOptionsHandle !== 0) {
            wasm2._OrtReleaseRunOptions(runOptionsHandle);
          }
          runOptionsAllocs.forEach((p) => wasm2._free(p));
        }
      };
      endProfiling = (sessionId) => {
        const wasm2 = getInstance();
        const session = activeSessions.get(sessionId);
        if (!session) {
          throw new Error("invalid session id");
        }
        const sessionHandle = session[0];
        const profileFileName = wasm2._OrtEndProfiling(sessionHandle);
        if (profileFileName === 0) {
          checkLastError("Can't get an profile file name.");
        }
        wasm2._OrtFree(profileFileName);
      };
      extractTransferableBuffers = (tensors) => {
        const buffers = [];
        for (const tensor of tensors) {
          const data = tensor[2];
          if (!Array.isArray(data) && "buffer" in data) {
            buffers.push(data.buffer);
          }
        }
        return buffers;
      };
    }
  });

  // web/lib/wasm/proxy-wrapper.ts
  var isProxy, proxyWorker, initializing2, initialized2, aborted2, temporaryObjectUrl, initWasmCallbacks, queuedCallbacks, enqueueCallbacks, ensureWorker, onProxyWorkerMessage, initializeWebAssemblyAndOrtRuntime, initializeOrtEp, copyFromExternalBuffer2, createSession2, releaseSession2, run2, endProfiling2;
  var init_proxy_wrapper = __esm({
    "web/lib/wasm/proxy-wrapper.ts"() {
      "use strict";
      init_esm();
      init_wasm_core_impl();
      init_wasm_factory();
      init_wasm_utils_import();
      isProxy = () => !!env2.wasm.proxy && typeof document !== "undefined";
      initializing2 = false;
      initialized2 = false;
      aborted2 = false;
      queuedCallbacks = /* @__PURE__ */ new Map();
      enqueueCallbacks = (type, callbacks) => {
        const queue = queuedCallbacks.get(type);
        if (queue) {
          queue.push(callbacks);
        } else {
          queuedCallbacks.set(type, [callbacks]);
        }
      };
      ensureWorker = () => {
        if (initializing2 || !initialized2 || aborted2 || !proxyWorker) {
          throw new Error("worker not ready");
        }
      };
      onProxyWorkerMessage = (ev) => {
        switch (ev.data.type) {
          case "init-wasm":
            initializing2 = false;
            if (ev.data.err) {
              aborted2 = true;
              initWasmCallbacks[1](ev.data.err);
            } else {
              initialized2 = true;
              initWasmCallbacks[0]();
            }
            if (temporaryObjectUrl) {
              URL.revokeObjectURL(temporaryObjectUrl);
              temporaryObjectUrl = void 0;
            }
            break;
          case "init-ep":
          case "copy-from":
          case "create":
          case "release":
          case "run":
          case "end-profiling": {
            const callbacks = queuedCallbacks.get(ev.data.type);
            if (ev.data.err) {
              callbacks.shift()[1](ev.data.err);
            } else {
              callbacks.shift()[0](ev.data.out);
            }
            break;
          }
          default:
        }
      };
      initializeWebAssemblyAndOrtRuntime = async () => {
        if (initialized2) {
          return;
        }
        if (initializing2) {
          throw new Error("multiple calls to 'initWasm()' detected.");
        }
        if (aborted2) {
          throw new Error("previous call to 'initWasm()' failed.");
        }
        initializing2 = true;
        if (isProxy()) {
          return new Promise((resolve, reject) => {
            proxyWorker?.terminate();
            void importProxyWorker().then(([objectUrl, worker]) => {
              try {
                proxyWorker = worker;
                proxyWorker.onerror = (ev) => reject(ev);
                proxyWorker.onmessage = onProxyWorkerMessage;
                initWasmCallbacks = [resolve, reject];
                const message = { type: "init-wasm", in: env2 };
                if (!message.in.wasm.wasmPaths && objectUrl) {
                  const inferredWasmPathPrefix = inferWasmPathPrefixFromScriptSrc();
                  if (inferredWasmPathPrefix) {
                    message.in.wasm.wasmPaths = inferredWasmPathPrefix;
                  }
                }
                if (false) {
                  message.in.wasm.wasmPaths = {
                    wasm: false ? new URL("ort-wasm-simd-threaded.jsep.wasm", void 0).href : false ? new URL("ort-wasm-simd-threaded.asyncify.wasm", void 0).href : new URL("ort-wasm-simd-threaded.wasm", void 0).href
                  };
                }
                proxyWorker.postMessage(message);
                temporaryObjectUrl = objectUrl;
              } catch (e) {
                reject(e);
              }
            }, reject);
          });
        } else {
          try {
            await initializeWebAssembly(env2.wasm);
            await initRuntime(env2);
            initialized2 = true;
          } catch (e) {
            aborted2 = true;
            throw e;
          } finally {
            initializing2 = false;
          }
        }
      };
      initializeOrtEp = async (epName) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("init-ep", [resolve, reject]);
            const message = { type: "init-ep", in: { epName, env: env2 } };
            proxyWorker.postMessage(message);
          });
        } else {
          await initEp(env2, epName);
        }
      };
      copyFromExternalBuffer2 = async (buffer) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("copy-from", [resolve, reject]);
            const message = { type: "copy-from", in: { buffer } };
            proxyWorker.postMessage(message, [buffer.buffer]);
          });
        } else {
          return copyFromExternalBuffer(buffer);
        }
      };
      createSession2 = async (model, options) => {
        if (isProxy()) {
          if (options?.preferredOutputLocation) {
            throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
          }
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("create", [resolve, reject]);
            const message = { type: "create", in: { model, options: { ...options } } };
            const transferable = [];
            if (model instanceof Uint8Array) {
              transferable.push(model.buffer);
            }
            proxyWorker.postMessage(message, transferable);
          });
        } else {
          return createSession(model, options);
        }
      };
      releaseSession2 = async (sessionId) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("release", [resolve, reject]);
            const message = { type: "release", in: sessionId };
            proxyWorker.postMessage(message);
          });
        } else {
          releaseSession(sessionId);
        }
      };
      run2 = async (sessionId, inputIndices, inputs, outputIndices, outputs, options) => {
        if (isProxy()) {
          if (inputs.some((t) => t[3] !== "cpu")) {
            throw new Error("input tensor on GPU is not supported for proxy.");
          }
          if (outputs.some((t) => t)) {
            throw new Error("pre-allocated output tensor is not supported for proxy.");
          }
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("run", [resolve, reject]);
            const serializableInputs = inputs;
            const message = {
              type: "run",
              in: { sessionId, inputIndices, inputs: serializableInputs, outputIndices, options }
            };
            proxyWorker.postMessage(message, extractTransferableBuffers(serializableInputs));
          });
        } else {
          return run(sessionId, inputIndices, inputs, outputIndices, outputs, options);
        }
      };
      endProfiling2 = async (sessionId) => {
        if (isProxy()) {
          ensureWorker();
          return new Promise((resolve, reject) => {
            enqueueCallbacks("end-profiling", [resolve, reject]);
            const message = { type: "end-profiling", in: sessionId };
            proxyWorker.postMessage(message);
          });
        } else {
          endProfiling(sessionId);
        }
      };
    }
  });

  // web/lib/wasm/session-handler-inference.ts
  var encodeTensorMetadata, decodeTensorMetadata, OnnxruntimeWebAssemblySessionHandler;
  var init_session_handler_inference = __esm({
    "web/lib/wasm/session-handler-inference.ts"() {
      "use strict";
      init_esm();
      init_proxy_wrapper();
      init_wasm_common();
      init_wasm_utils_env();
      init_wasm_utils_load_file();
      encodeTensorMetadata = (tensor, getName) => {
        switch (tensor.location) {
          case "cpu":
            return [tensor.type, tensor.dims, tensor.data, "cpu"];
          case "gpu-buffer":
            return [tensor.type, tensor.dims, { gpuBuffer: tensor.gpuBuffer }, "gpu-buffer"];
          case "ml-tensor":
            return [tensor.type, tensor.dims, { mlTensor: tensor.mlTensor }, "ml-tensor"];
          default:
            throw new Error(`invalid data location: ${tensor.location} for ${getName()}`);
        }
      };
      decodeTensorMetadata = (tensor) => {
        switch (tensor[3]) {
          case "cpu":
            return new Tensor2(tensor[0], tensor[2], tensor[1]);
          case "gpu-buffer": {
            const dataType = tensor[0];
            if (!isGpuBufferSupportedType(dataType)) {
              throw new Error(`not supported data type: ${dataType} for deserializing GPU tensor`);
            }
            const { gpuBuffer, download, dispose } = tensor[2];
            return Tensor2.fromGpuBuffer(gpuBuffer, { dataType, dims: tensor[1], download, dispose });
          }
          case "ml-tensor": {
            const dataType = tensor[0];
            if (!isMLTensorSupportedType(dataType)) {
              throw new Error(`not supported data type: ${dataType} for deserializing MLTensor tensor`);
            }
            const { mlTensor, download, dispose } = tensor[2];
            return Tensor2.fromMLTensor(mlTensor, { dataType, dims: tensor[1], download, dispose });
          }
          default:
            throw new Error(`invalid data location: ${tensor[3]}`);
        }
      };
      OnnxruntimeWebAssemblySessionHandler = class {
        async fetchModelAndCopyToWasmMemory(path) {
          return copyFromExternalBuffer2(await loadFile(path));
        }
        async loadModel(pathOrBuffer, options) {
          TRACE_FUNC_BEGIN();
          let model;
          if (typeof pathOrBuffer === "string") {
            if (isNode) {
              model = await loadFile(pathOrBuffer);
            } else {
              model = await this.fetchModelAndCopyToWasmMemory(pathOrBuffer);
            }
          } else {
            model = pathOrBuffer;
          }
          [this.sessionId, this.inputNames, this.outputNames, this.inputMetadata, this.outputMetadata] = await createSession2(
            model,
            options
          );
          TRACE_FUNC_END();
        }
        async dispose() {
          return releaseSession2(this.sessionId);
        }
        async run(feeds, fetches, options) {
          TRACE_FUNC_BEGIN();
          const inputArray = [];
          const inputIndices = [];
          Object.entries(feeds).forEach((kvp) => {
            const name = kvp[0];
            const tensor = kvp[1];
            const index = this.inputNames.indexOf(name);
            if (index === -1) {
              throw new Error(`invalid input '${name}'`);
            }
            inputArray.push(tensor);
            inputIndices.push(index);
          });
          const outputArray = [];
          const outputIndices = [];
          Object.entries(fetches).forEach((kvp) => {
            const name = kvp[0];
            const tensor = kvp[1];
            const index = this.outputNames.indexOf(name);
            if (index === -1) {
              throw new Error(`invalid output '${name}'`);
            }
            outputArray.push(tensor);
            outputIndices.push(index);
          });
          const inputs = inputArray.map(
            (t, i) => encodeTensorMetadata(t, () => `input "${this.inputNames[inputIndices[i]]}"`)
          );
          const outputs = outputArray.map(
            (t, i) => t ? encodeTensorMetadata(t, () => `output "${this.outputNames[outputIndices[i]]}"`) : null
          );
          const results = await run2(this.sessionId, inputIndices, inputs, outputIndices, outputs, options);
          const resultMap = {};
          for (let i = 0; i < results.length; i++) {
            resultMap[this.outputNames[outputIndices[i]]] = outputArray[i] ?? decodeTensorMetadata(results[i]);
          }
          TRACE_FUNC_END();
          return resultMap;
        }
        startProfiling() {
        }
        endProfiling() {
          void endProfiling2(this.sessionId);
        }
      };
    }
  });

  // web/lib/backend-wasm.ts
  var backend_wasm_exports = {};
  __export(backend_wasm_exports, {
    OnnxruntimeWebAssemblyBackend: () => OnnxruntimeWebAssemblyBackend,
    initializeFlags: () => initializeFlags,
    wasmBackend: () => wasmBackend
  });
  var initializeFlags, OnnxruntimeWebAssemblyBackend, wasmBackend;
  var init_backend_wasm = __esm({
    "web/lib/backend-wasm.ts"() {
      "use strict";
      init_esm();
      init_proxy_wrapper();
      init_session_handler_inference();
      initializeFlags = () => {
        if (typeof env2.wasm.initTimeout !== "number" || env2.wasm.initTimeout < 0) {
          env2.wasm.initTimeout = 0;
        }
        const simd = env2.wasm.simd;
        if (typeof simd !== "boolean" && simd !== void 0 && simd !== "fixed" && simd !== "relaxed") {
          console.warn(
            `Property "env.wasm.simd" is set to unknown value "${simd}". Reset it to \`false\` and ignore SIMD feature checking.`
          );
          env2.wasm.simd = false;
        }
        if (typeof env2.wasm.proxy !== "boolean") {
          env2.wasm.proxy = false;
        }
        if (typeof env2.wasm.trace !== "boolean") {
          env2.wasm.trace = false;
        }
        if (typeof env2.wasm.numThreads !== "number" || !Number.isInteger(env2.wasm.numThreads) || env2.wasm.numThreads <= 0) {
          if (typeof self !== "undefined" && !self.crossOriginIsolated) {
            env2.wasm.numThreads = 1;
          } else {
            const numCpuLogicalCores = typeof navigator === "undefined" ? __require("node:os").cpus().length : navigator.hardwareConcurrency;
            env2.wasm.numThreads = Math.min(4, Math.ceil((numCpuLogicalCores || 1) / 2));
          }
        }
      };
      OnnxruntimeWebAssemblyBackend = class {
        /**
         * This function initializes the WebAssembly backend.
         *
         * This function will be called only once for each backend name. It will be called the first time when
         * `ort.InferenceSession.create()` is called with a registered backend name.
         *
         * @param backendName - the registered backend name.
         */
        async init(backendName) {
          initializeFlags();
          await initializeWebAssemblyAndOrtRuntime();
          await initializeOrtEp(backendName);
        }
        async createInferenceSessionHandler(pathOrBuffer, options) {
          const handler = new OnnxruntimeWebAssemblySessionHandler();
          await handler.loadModel(pathOrBuffer, options);
          return handler;
        }
      };
      wasmBackend = new OnnxruntimeWebAssemblyBackend();
    }
  });

  // web/lib/index.ts
  var index_exports = {};
  __export(index_exports, {
    InferenceSession: () => InferenceSession2,
    TRACE: () => TRACE,
    TRACE_EVENT_BEGIN: () => TRACE_EVENT_BEGIN,
    TRACE_EVENT_END: () => TRACE_EVENT_END,
    TRACE_FUNC_BEGIN: () => TRACE_FUNC_BEGIN,
    TRACE_FUNC_END: () => TRACE_FUNC_END,
    Tensor: () => Tensor2,
    default: () => index_default,
    env: () => env2,
    registerBackend: () => registerBackend
  });
  init_esm();
  init_esm();
  init_esm();

  // web/lib/version.ts
  var version2 = "1.23.0";

  // web/lib/index.ts
  var index_default = esm_exports;
  if (false) {
    const onnxjsBackend = null.onnxjsBackend;
    registerBackend("webgl", onnxjsBackend, -10);
  }
  if (false) {
    throw new Error(
      "The current build is specified to enable both JSEP and WebGPU EP. This is not a valid configuration. JSEP and WebGPU EPs cannot be enabled at the same time."
    );
  }
  if (false) {
    throw new Error(
      "The current build is specified to enable WebNN EP without JSEP or WebGPU EP. This is not a valid configuration. WebNN EP requires either JSEP or WebGPU EP to be enabled."
    );
  }
  if (true) {
    const wasmBackend2 = (init_backend_wasm(), __toCommonJS(backend_wasm_exports)).wasmBackend;
    if (false) {
      registerBackend("webgpu", wasmBackend2, 5);
    }
    if (false) {
      registerBackend("webnn", wasmBackend2, 5);
    }
    registerBackend("cpu", wasmBackend2, 10);
    registerBackend("wasm", wasmBackend2, 10);
  }
  Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
  return __toCommonJS(index_exports);
})();
typeof exports=="object"&&typeof module=="object"&&(module.exports=ort);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmRleC50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWVudi50cyIsICIuLi9saWIvd2FzbS9wcm94eS13b3JrZXIvbWFpbi50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50cyIsICIuLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1sb2FkLWZpbGUudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb3JlLWltcGwudHMiLCAiLi4vbGliL3dhc20vcHJveHktd3JhcHBlci50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlLnRzIiwgIi4uL2xpYi9iYWNrZW5kLXdhc20udHMiLCAiLi4vbGliL2luZGV4LnRzIiwgIi4uL2xpYi92ZXJzaW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgQmFja2VuZCB9IGZyb20gJy4vYmFja2VuZC5qcyc7XHJcbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcclxuXHJcbmludGVyZmFjZSBCYWNrZW5kSW5mbyB7XHJcbiAgYmFja2VuZDogQmFja2VuZDtcclxuICBwcmlvcml0eTogbnVtYmVyO1xyXG5cclxuICBpbml0UHJvbWlzZT86IFByb21pc2U8dm9pZD47XHJcbiAgaW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xyXG4gIGFib3J0ZWQ/OiBib29sZWFuO1xyXG4gIGVycm9yPzogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBiYWNrZW5kczogTWFwPHN0cmluZywgQmFja2VuZEluZm8+ID0gbmV3IE1hcCgpO1xyXG5jb25zdCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHk6IHN0cmluZ1tdID0gW107XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBiYWNrZW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSAtIHRoZSBuYW1lIGFzIGEga2V5IHRvIGxvb2t1cCBhcyBhbiBleGVjdXRpb24gcHJvdmlkZXIuXHJcbiAqIEBwYXJhbSBiYWNrZW5kIC0gdGhlIGJhY2tlbmQgb2JqZWN0LlxyXG4gKiBAcGFyYW0gcHJpb3JpdHkgLSBhbiBpbnRlZ2VyIGluZGljYXRpbmcgdGhlIHByaW9yaXR5IG9mIHRoZSBiYWNrZW5kLiBIaWdoZXIgbnVtYmVyIG1lYW5zIGhpZ2hlciBwcmlvcml0eS4gaWYgcHJpb3JpdHlcclxuICogPCAwLCBpdCB3aWxsIGJlIGNvbnNpZGVyZWQgYXMgYSAnYmV0YScgdmVyc2lvbiBhbmQgd2lsbCBub3QgYmUgdXNlZCBhcyBhIGZhbGxiYWNrIGJhY2tlbmQgYnkgZGVmYXVsdC5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyQmFja2VuZCA9IChuYW1lOiBzdHJpbmcsIGJhY2tlbmQ6IEJhY2tlbmQsIHByaW9yaXR5OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICBpZiAoYmFja2VuZCAmJiB0eXBlb2YgYmFja2VuZC5pbml0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBiYWNrZW5kLmNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBjb25zdCBjdXJyZW50QmFja2VuZCA9IGJhY2tlbmRzLmdldChuYW1lKTtcclxuICAgIGlmIChjdXJyZW50QmFja2VuZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGJhY2tlbmRzLnNldChuYW1lLCB7IGJhY2tlbmQsIHByaW9yaXR5IH0pO1xyXG4gICAgfSBlbHNlIGlmIChjdXJyZW50QmFja2VuZC5wcmlvcml0eSA+IHByaW9yaXR5KSB7XHJcbiAgICAgIC8vIHNhbWUgbmFtZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQgd2l0aCBhIGhpZ2hlciBwcmlvcml0eS4gc2tpcCByZWdpc3RlcmF0aW9uLlxyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID09PSBwcmlvcml0eSkge1xyXG4gICAgICBpZiAoY3VycmVudEJhY2tlbmQuYmFja2VuZCAhPT0gYmFja2VuZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IHJlZ2lzdGVyIGJhY2tlbmQgXCIke25hbWV9XCIgdXNpbmcgcHJpb3JpdHkgJHtwcmlvcml0eX1gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmlvcml0eSA+PSAwKSB7XHJcbiAgICAgIGNvbnN0IGkgPSBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuaW5kZXhPZihuYW1lKTtcclxuICAgICAgaWYgKGkgIT09IC0xKSB7XHJcbiAgICAgICAgYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5LnNwbGljZShpLCAxKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYmFja2VuZHMuZ2V0KGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eVtpXSkhLnByaW9yaXR5IDw9IHByaW9yaXR5KSB7XHJcbiAgICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDAsIG5hbWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkucHVzaChuYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ25vdCBhIHZhbGlkIGJhY2tlbmQnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcnkgdG8gcmVzb2x2ZSBhbmQgaW5pdGlhbGl6ZSBhIGJhY2tlbmQuXHJcbiAqXHJcbiAqIEBwYXJhbSBiYWNrZW5kTmFtZSAtIHRoZSBuYW1lIG9mIHRoZSBiYWNrZW5kLlxyXG4gKiBAcmV0dXJucyB0aGUgYmFja2VuZCBpbnN0YW5jZSBpZiByZXNvbHZlZCBhbmQgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LCBvciBhbiBlcnJvciBtZXNzYWdlIGlmIGZhaWxlZC5cclxuICovXHJcbmNvbnN0IHRyeVJlc29sdmVBbmRJbml0aWFsaXplQmFja2VuZCA9IGFzeW5jIChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTxCYWNrZW5kIHwgc3RyaW5nPiA9PiB7XHJcbiAgY29uc3QgYmFja2VuZEluZm8gPSBiYWNrZW5kcy5nZXQoYmFja2VuZE5hbWUpO1xyXG4gIGlmICghYmFja2VuZEluZm8pIHtcclxuICAgIHJldHVybiAnYmFja2VuZCBub3QgZm91bmQuJztcclxuICB9XHJcblxyXG4gIGlmIChiYWNrZW5kSW5mby5pbml0aWFsaXplZCkge1xyXG4gICAgcmV0dXJuIGJhY2tlbmRJbmZvLmJhY2tlbmQ7XHJcbiAgfSBlbHNlIGlmIChiYWNrZW5kSW5mby5hYm9ydGVkKSB7XHJcbiAgICByZXR1cm4gYmFja2VuZEluZm8uZXJyb3IhO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBpc0luaXRpYWxpemluZyA9ICEhYmFja2VuZEluZm8uaW5pdFByb21pc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XHJcbiAgICAgICAgYmFja2VuZEluZm8uaW5pdFByb21pc2UgPSBiYWNrZW5kSW5mby5iYWNrZW5kLmluaXQoYmFja2VuZE5hbWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xyXG4gICAgICBiYWNrZW5kSW5mby5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgIHJldHVybiBiYWNrZW5kSW5mby5iYWNrZW5kO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIWlzSW5pdGlhbGl6aW5nKSB7XHJcbiAgICAgICAgYmFja2VuZEluZm8uZXJyb3IgPSBgJHtlfWA7XHJcbiAgICAgICAgYmFja2VuZEluZm8uYWJvcnRlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGJhY2tlbmRJbmZvLmVycm9yITtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGRlbGV0ZSBiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzb2x2ZSBleGVjdXRpb24gcHJvdmlkZXJzIGZyb20gdGhlIHNwZWNpZmljIHNlc3Npb24gb3B0aW9ucy5cclxuICpcclxuICogQHBhcmFtIG9wdGlvbnMgLSB0aGUgc2Vzc2lvbiBvcHRpb25zIG9iamVjdC5cclxuICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiBhbiBpbml0aWFsaXplZCBiYWNrZW5kIGluc3RhbmNlIGFuZCBhIHNlc3Npb24gb3B0aW9ucyBvYmplY3Qgd2l0aFxyXG4gKiBmaWx0ZXJlZCBFUCBsaXN0LlxyXG4gKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMgPSBhc3luYyAoXHJcbiAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcclxuKTogUHJvbWlzZTxbYmFja2VuZDogQmFja2VuZCwgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9uc10+ID0+IHtcclxuICAvLyBleHRyYWN0IGJhY2tlbmQgaGludHMgZnJvbSBzZXNzaW9uIG9wdGlvbnNcclxuICBjb25zdCBlcHMgPSBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyB8fCBbXTtcclxuICBjb25zdCBiYWNrZW5kSGludHMgPSBlcHMubWFwKChpKSA9PiAodHlwZW9mIGkgPT09ICdzdHJpbmcnID8gaSA6IGkubmFtZSkpO1xyXG4gIGNvbnN0IGJhY2tlbmROYW1lcyA9IGJhY2tlbmRIaW50cy5sZW5ndGggPT09IDAgPyBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkgOiBiYWNrZW5kSGludHM7XHJcblxyXG4gIC8vIHRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGFsbCByZXF1ZXN0ZWQgYmFja2VuZHNcclxuICBsZXQgYmFja2VuZDogQmFja2VuZCB8IHVuZGVmaW5lZDtcclxuICBjb25zdCBlcnJvcnMgPSBbXTtcclxuICBjb25zdCBhdmFpbGFibGVCYWNrZW5kTmFtZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICBmb3IgKGNvbnN0IGJhY2tlbmROYW1lIG9mIGJhY2tlbmROYW1lcykge1xyXG4gICAgY29uc3QgcmVzb2x2ZVJlc3VsdCA9IGF3YWl0IHRyeVJlc29sdmVBbmRJbml0aWFsaXplQmFja2VuZChiYWNrZW5kTmFtZSk7XHJcbiAgICBpZiAodHlwZW9mIHJlc29sdmVSZXN1bHQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGVycm9ycy5wdXNoKHsgbmFtZTogYmFja2VuZE5hbWUsIGVycjogcmVzb2x2ZVJlc3VsdCB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICghYmFja2VuZCkge1xyXG4gICAgICAgIGJhY2tlbmQgPSByZXNvbHZlUmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChiYWNrZW5kID09PSByZXNvbHZlUmVzdWx0KSB7XHJcbiAgICAgICAgYXZhaWxhYmxlQmFja2VuZE5hbWVzLmFkZChiYWNrZW5kTmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGlmIG5vIGJhY2tlbmQgaXMgYXZhaWxhYmxlLCB0aHJvdyBlcnJvci5cclxuICBpZiAoIWJhY2tlbmQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgbm8gYXZhaWxhYmxlIGJhY2tlbmQgZm91bmQuIEVSUjogJHtlcnJvcnMubWFwKChlKSA9PiBgWyR7ZS5uYW1lfV0gJHtlLmVycn1gKS5qb2luKCcsICcpfWApO1xyXG4gIH1cclxuXHJcbiAgLy8gZm9yIGVhY2ggZXhwbGljaXRseSByZXF1ZXN0ZWQgYmFja2VuZCwgaWYgaXQncyBub3QgYXZhaWxhYmxlLCBvdXRwdXQgd2FybmluZyBtZXNzYWdlLlxyXG4gIGZvciAoY29uc3QgeyBuYW1lLCBlcnIgfSBvZiBlcnJvcnMpIHtcclxuICAgIGlmIChiYWNrZW5kSGludHMuaW5jbHVkZXMobmFtZSkpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgIGByZW1vdmluZyByZXF1ZXN0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyIFwiJHtuYW1lfVwiIGZyb20gc2Vzc2lvbiBvcHRpb25zIGJlY2F1c2UgaXQgaXMgbm90IGF2YWlsYWJsZTogJHtlcnJ9YCxcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGZpbHRlcmVkRXBzID0gZXBzLmZpbHRlcigoaSkgPT4gYXZhaWxhYmxlQmFja2VuZE5hbWVzLmhhcyh0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyBpIDogaS5uYW1lKSk7XHJcblxyXG4gIHJldHVybiBbXHJcbiAgICBiYWNrZW5kLFxyXG4gICAgbmV3IFByb3h5KG9wdGlvbnMsIHtcclxuICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wKSA9PiB7XHJcbiAgICAgICAgaWYgKHByb3AgPT09ICdleGVjdXRpb25Qcm92aWRlcnMnKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmlsdGVyZWRFcHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3ApO1xyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXTtcclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi5qcyc7XHJcbmltcG9ydCB7IE9ubnhWYWx1ZSB9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFNlc3Npb25IYW5kbGVyIHtcclxuICB0eXBlIEZlZWRzVHlwZSA9IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9O1xyXG4gIHR5cGUgRmV0Y2hlc1R5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XHJcbiAgdHlwZSBSZXR1cm5UeXBlID0geyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHNoYXJlZCBTZXNzaW9uSGFuZGxlciBmdW5jdGlvbmFsaXR5XHJcbiAqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmludGVyZmFjZSBTZXNzaW9uSGFuZGxlciB7XHJcbiAgZGlzcG9zZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICByZWFkb25seSBpbnB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuICByZWFkb25seSBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XHJcblxyXG4gIHJlYWRvbmx5IGlucHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xyXG4gIHJlYWRvbmx5IG91dHB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBhIGhhbmRsZXIgaW5zdGFuY2Ugb2YgYW4gaW5mZXJlbmNlIHNlc3Npb24uXHJcbiAqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgZXh0ZW5kcyBTZXNzaW9uSGFuZGxlciB7XHJcbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcclxuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcclxuXHJcbiAgcnVuKFxyXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcclxuICAgIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxyXG4gICAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxyXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgYSBiYWNrZW5kIHRoYXQgcHJvdmlkZXMgaW1wbGVtZW50YXRpb24gb2YgbW9kZWwgaW5mZXJlbmNpbmcuXHJcbiAqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFja2VuZCB7XHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgYmFja2VuZCBhc3luY2hyb25vdXNseS4gU2hvdWxkIHRocm93IHdoZW4gZmFpbGVkLlxyXG4gICAqL1xyXG4gIGluaXQoYmFja2VuZE5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxyXG4gICAgdXJpT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksXHJcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcclxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVnaXN0ZXJCYWNrZW5kIH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcclxuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXHJcblxyXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjIzLjAnO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IEVudiB9IGZyb20gJy4vZW52LmpzJztcclxuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbi5qcyc7XHJcblxyXG50eXBlIExvZ0xldmVsVHlwZSA9IEVudlsnbG9nTGV2ZWwnXTtcclxuXHJcbmxldCBsb2dMZXZlbFZhbHVlOiBSZXF1aXJlZDxMb2dMZXZlbFR5cGU+ID0gJ3dhcm5pbmcnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGVudjogRW52ID0ge1xyXG4gIHdhc206IHt9IGFzIEVudi5XZWJBc3NlbWJseUZsYWdzLFxyXG4gIHdlYmdsOiB7fSBhcyBFbnYuV2ViR0xGbGFncyxcclxuICB3ZWJncHU6IHt9IGFzIEVudi5XZWJHcHVGbGFncyxcclxuICB2ZXJzaW9uczogeyBjb21tb246IHZlcnNpb24gfSxcclxuXHJcbiAgc2V0IGxvZ0xldmVsKHZhbHVlOiBMb2dMZXZlbFR5cGUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IFsndmVyYm9zZScsICdpbmZvJywgJ3dhcm5pbmcnLCAnZXJyb3InLCAnZmF0YWwnXS5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBsb2dnaW5nIGxldmVsOiAke3ZhbHVlfWApO1xyXG4gICAgfVxyXG4gICAgbG9nTGV2ZWxWYWx1ZSA9IHZhbHVlO1xyXG4gIH0sXHJcbiAgZ2V0IGxvZ0xldmVsKCk6IFJlcXVpcmVkPExvZ0xldmVsVHlwZT4ge1xyXG4gICAgcmV0dXJuIGxvZ0xldmVsVmFsdWU7XHJcbiAgfSxcclxufTtcclxuXHJcbi8vIHNldCBwcm9wZXJ0eSAnbG9nTGV2ZWwnIHNvIHRoYXQgdGhleSBjYW4gYmUgY29ycmVjdGx5IHRyYW5zZmVycmVkIHRvIHdvcmtlciBieSBgcG9zdE1lc3NhZ2UoKWAuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYsICdsb2dMZXZlbCcsIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBlbnYgYXMgZW52SW1wbCB9IGZyb20gJy4vZW52LWltcGwuanMnO1xyXG5pbXBvcnQgeyBUcnlHZXRHbG9iYWxUeXBlIH0gZnJvbSAnLi90eXBlLWhlbHBlci5qcyc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgRW52IHtcclxuICBleHBvcnQgdHlwZSBXYXNtUGF0aFByZWZpeCA9IHN0cmluZztcclxuICBleHBvcnQgaW50ZXJmYWNlIFdhc21GaWxlUGF0aHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHRoZSBvdmVycmlkZSBwYXRoIGZvciB0aGUgbWFpbiAud2FzbSBmaWxlLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cclxuICAgICAqXHJcbiAgICAgKiBJZiBub3QgbW9kaWZpZWQsIHRoZSBmaWxlbmFtZSBvZiB0aGUgLndhc20gZmlsZSBpczpcclxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQud2FzbWAgZm9yIGRlZmF1bHQgYnVpbGRcclxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC53YXNtYCBmb3IgSlNFUCBidWlsZCAod2l0aCBXZWJHUFUgYW5kIFdlYk5OKVxyXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5hc3luY2lmeS53YXNtYCBmb3IgV2ViR1BVIGJ1aWxkIHdpdGggQXN5bmNpZnkgKHdpdGggV2ViTk4pXHJcbiAgICAgKi9cclxuICAgIHdhc20/OiBVUkwgfCBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgdGhlIG92ZXJyaWRlIHBhdGggZm9yIHRoZSBtYWluIC5tanMgZmlsZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHBhdGggc2hvdWxkIGJlIGFuIGFic29sdXRlIHBhdGguXHJcbiAgICAgKlxyXG4gICAgICogSWYgbm90IG1vZGlmaWVkLCB0aGUgZmlsZW5hbWUgb2YgdGhlIC5tanMgZmlsZSBpczpcclxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzYCBmb3IgZGVmYXVsdCBidWlsZFxyXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qc2AgZm9yIEpTRVAgYnVpbGQgKHdpdGggV2ViR1BVIGFuZCBXZWJOTilcclxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkubWpzYCBmb3IgV2ViR1BVIGJ1aWxkIHdpdGggQXN5bmNpZnkgKHdpdGggV2ViTk4pXHJcbiAgICAgKi9cclxuICAgIG1qcz86IFVSTCB8IHN0cmluZztcclxuICB9XHJcbiAgZXhwb3J0IHR5cGUgV2FzbVByZWZpeE9yRmlsZVBhdGhzID0gV2FzbVBhdGhQcmVmaXggfCBXYXNtRmlsZVBhdGhzO1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViQXNzZW1ibHlGbGFncyB7XHJcbiAgICAvKipcclxuICAgICAqIHNldCBvciBnZXQgbnVtYmVyIG9mIHRocmVhZChzKS4gSWYgb21pdHRlZCBvciBzZXQgdG8gMCwgbnVtYmVyIG9mIHRocmVhZChzKSB3aWxsIGJlIGRldGVybWluZWQgYnkgc3lzdGVtLiBJZiBzZXRcclxuICAgICAqIHRvIDEsIG5vIHdvcmtlciB0aHJlYWQgd2lsbCBiZSBzcGF3bmVkLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IG11bHRpdGhyZWFkIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxyXG4gICAgICovXHJcbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSBTSU1ELlxyXG4gICAgICpcclxuICAgICAqIE9OTlggUnVudGltZSB3aWxsIHBlcmZvcm0gZmVhdHVyZSBkZXRlY3Rpb24gYmFzZWQgb24gdGhlIHZhbHVlIG9mIHRoaXMgcHJvcGVydHkuIFNwZWNpZmljYWxseSwgd2hlbiB0aGUgdmFsdWUgaXNcclxuICAgICAqIHNldCB0bzpcclxuICAgICAqIC0gYHVuZGVmaW5lZGAsIGB0cnVlYCBvciBgXCJmaXhlZFwiYDogd2lsbCBjaGVjayBhdmFpbGFiaWxpdHkgb2YgRml4ZWQtd2lkdGggU0lNRC5cclxuICAgICAqIC0gYFwicmVsYXhlZFwiYDogd2lsbCBjaGVjayBhdmFpbGFiaWxpdHkgb2YgUmVsYXhlZCBTSU1ELlxyXG4gICAgICogLSBgZmFsc2VgOiB3aWxsIG5vdCBwZXJmb3JtIFNJTUQgZmVhdHVyZSBjaGVja2luZy5cclxuICAgICAqXHJcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgZG9lcyBub3QgbWFrZSBPTk5YIFJ1bnRpbWUgdG8gc3dpdGNoIHRvIHRoZSBjb3JyZXNwb25kaW5nIHJ1bnRpbWUgYXV0b21hdGljYWxseS4gVXNlciBuZWVkXHJcbiAgICAgKiB0byBzZXQgYHdhc21QYXRoc2Agb3IgYHdhc21CaW5hcnlgIHByb3BlcnR5IHRvIGxvYWQgdGhlIGNvcnJlc3BvbmRpbmcgcnVudGltZS5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgd2hlbiBXZWJBc3NlbWJseSBTSU1EIGZlYXR1cmUgaXMgYXZhaWxhYmxlIGluIGN1cnJlbnQgY29udGV4dC5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB0cnVlYFxyXG4gICAgICovXHJcbiAgICBzaW1kPzogYm9vbGVhbiB8ICdmaXhlZCcgfCAncmVsYXhlZCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gZW5hYmxlIHRyYWNlLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgZW52LnRyYWNlYCBpbnN0ZWFkLiBJZiBgZW52LnRyYWNlYCBpcyBzZXQsIHRoaXMgcHJvcGVydHkgd2lsbCBiZSBpZ25vcmVkLlxyXG4gICAgICovXHJcbiAgICB0cmFjZT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IGEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIHRpbWVvdXQgZm9yIGluaXRpYWxpemF0aW9uIG9mIFdlYkFzc2VtYmx5IGJhY2tlbmQsIGluIG1pbGxpc2Vjb25kcy4gQSB6ZXJvXHJcbiAgICAgKiB2YWx1ZSBpbmRpY2F0ZXMgbm8gdGltZW91dCBpcyBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgMGBcclxuICAgICAqL1xyXG4gICAgaW5pdFRpbWVvdXQ/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBjdXN0b20gVVJMIHByZWZpeCB0byB0aGUgLndhc20vLm1qcyBmaWxlcywgb3IgYW4gb2JqZWN0IG9mIG92ZXJyaWRlcyBmb3IgYm90aCAud2FzbS8ubWpzIGZpbGUuIFRoZSBvdmVycmlkZVxyXG4gICAgICogcGF0aCBzaG91bGQgYmUgYW4gYWJzb2x1dGUgcGF0aC5cclxuICAgICAqL1xyXG4gICAgd2FzbVBhdGhzPzogV2FzbVByZWZpeE9yRmlsZVBhdGhzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgY3VzdG9tIGJ1ZmZlciB3aGljaCBjb250YWlucyB0aGUgV2ViQXNzZW1ibHkgYmluYXJ5LiBJZiB0aGlzIHByb3BlcnR5IGlzIHNldCwgdGhlIGB3YXNtUGF0aHNgIHByb3BlcnR5IHdpbGxcclxuICAgICAqIGJlIGlnbm9yZWQuXHJcbiAgICAgKi9cclxuICAgIHdhc21CaW5hcnk/OiBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHByb3h5IHRoZSBleGVjdXRpb24gb2YgbWFpbiB0aHJlYWQgdG8gYSB3b3JrZXIgdGhyZWFkLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAgICovXHJcbiAgICBwcm94eT86IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRmxhZ3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBXZWJHTCBDb250ZXh0IElEICh3ZWJnbCBvciB3ZWJnbDIpLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCd3ZWJnbDInYFxyXG4gICAgICovXHJcbiAgICBjb250ZXh0SWQ/OiAnd2ViZ2wnIHwgJ3dlYmdsMic7XHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgV2ViR0wgcmVuZGVyaW5nIGNvbnRleHQuXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IGNvbnRleHQ6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgbWF4aW11bSBiYXRjaCBzaXplIGZvciBtYXRtdWwuIDAgbWVhbnMgdG8gZGlzYWJsZSBiYXRjaGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgICovXHJcbiAgICBtYXRtdWxNYXhCYXRjaFNpemU/OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNldCBvciBnZXQgdGhlIHRleHR1cmUgY2FjaGUgbW9kZS5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAnZnVsbCdgXHJcbiAgICAgKi9cclxuICAgIHRleHR1cmVDYWNoZU1vZGU/OiAnaW5pdGlhbGl6ZXJPbmx5JyB8ICdmdWxsJztcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgcGFja2VkIHRleHR1cmUgbW9kZVxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAgICovXHJcbiAgICBwYWNrPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIGVuYWJsZSBhc3luYyBkb3dubG9hZC5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcclxuICAgICAqL1xyXG4gICAgYXN5bmM/OiBib29sZWFuO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YSB7XHJcbiAgICBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcclxuICAgIGRhdGFUeXBlOiBzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1UHJvZmlsaW5nRGF0YVYxIHtcclxuICAgIHZlcnNpb246IDE7XHJcbiAgICBpbnB1dHNNZXRhZGF0YTogcmVhZG9ubHkgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGFbXTtcclxuICAgIG91dHB1dHNNZXRhZGF0YTogcmVhZG9ubHkgV2ViR3B1UHJvZmlsaW5nRGF0YVYxVGVuc29yTWV0YWRhdGFbXTtcclxuICAgIGtlcm5lbElkOiBudW1iZXI7XHJcbiAgICBrZXJuZWxUeXBlOiBzdHJpbmc7XHJcbiAgICBrZXJuZWxOYW1lOiBzdHJpbmc7XHJcbiAgICBwcm9ncmFtTmFtZTogc3RyaW5nO1xyXG4gICAgc3RhcnRUaW1lOiBudW1iZXI7XHJcbiAgICBlbmRUaW1lOiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgdHlwZSBXZWJHcHVQcm9maWxpbmdEYXRhID0gV2ViR3B1UHJvZmlsaW5nRGF0YVYxO1xyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUZsYWdzIHtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBlbnYud2ViZ3B1LnByb2ZpbGluZy5tb2RlYCBpbnN0ZWFkLiBJZiBgZW52LndlYmdwdS5wcm9maWxpbmcubW9kZWAgaXMgc2V0LCB0aGlzIHByb3BlcnR5IHdpbGwgYmVcclxuICAgICAqIGlnbm9yZWQuXHJcbiAgICAgKi9cclxuICAgIHByb2ZpbGluZ01vZGU/OiAnb2ZmJyB8ICdkZWZhdWx0JztcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIGNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHByb2ZpbGluZzoge1xyXG4gICAgICAvKipcclxuICAgICAgICogU2V0IG9yIGdldCB0aGUgcHJvZmlsaW5nIG1vZGUuXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBkZWZhdWx0VmFsdWUgYCdvZmYnYFxyXG4gICAgICAgKi9cclxuICAgICAgbW9kZT86ICdvZmYnIHwgJ2RlZmF1bHQnO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIFNldCBvciBnZXQgYSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIGEgcHJvZmlsaW5nIGRhdGEgaXMgcmVjZWl2ZWQuIElmIG5vdCBzZXQsIHRoZSBwcm9maWxpbmcgZGF0YSB3aWxsIGJlXHJcbiAgICAgICAqIHByaW50ZWQgdG8gY29uc29sZS5cclxuICAgICAgICovXHJcbiAgICAgIG9uZGF0YT86IChkYXRhOiBXZWJHcHVQcm9maWxpbmdEYXRhKSA9PiB2b2lkO1xyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgcG93ZXIgcHJlZmVyZW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXHJcbiAgICAgKiB1c2VkIGFzIG9wdGlvbnMgZm9yIGBuYXZpZ2F0b3IuZ3B1LnJlcXVlc3RBZGFwdGVyKClgLlxyXG4gICAgICpcclxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9ncHV3ZWIuZ2l0aHViLmlvL2dwdXdlYi8jZGljdGRlZi1ncHVyZXF1ZXN0YWRhcHRlcm9wdGlvbnN9IGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdW5kZWZpbmVkYFxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIENyZWF0ZSB5b3VyIG93biBHUFVBZGFwdGVyLCB1c2UgaXQgdG8gY3JlYXRlIGEgR1BVRGV2aWNlIGluc3RhbmNlIGFuZCBzZXQge0BsaW5rIGRldmljZX0gcHJvcGVydHkgaWZcclxuICAgICAqIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIHBvd2VyIHByZWZlcmVuY2UuXHJcbiAgICAgKi9cclxuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdsb3ctcG93ZXInIHwgJ2hpZ2gtcGVyZm9ybWFuY2UnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBmb3JjZSBmYWxsYmFjayBhZGFwdGVyIGZsYWcuXHJcbiAgICAgKlxyXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxyXG4gICAgICogdXNlZCBhcyBvcHRpb25zIGZvciBgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcigpYC5cclxuICAgICAqXHJcbiAgICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZ3B1d2ViLmdpdGh1Yi5pby9ncHV3ZWIvI2RpY3RkZWYtZ3B1cmVxdWVzdGFkYXB0ZXJvcHRpb25zfSBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYHVuZGVmaW5lZGBcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBDcmVhdGUgeW91ciBvd24gR1BVQWRhcHRlciwgdXNlIGl0IHRvIGNyZWF0ZSBhIEdQVURldmljZSBpbnN0YW5jZSBhbmQgc2V0IHtAbGluayBkZXZpY2V9IHByb3BlcnR5IGlmXHJcbiAgICAgKiB5b3Ugd2FudCB0byB1c2UgYSBzcGVjaWZpYyBmYWxsYmFjayBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIGZvcmNlRmFsbGJhY2tBZGFwdGVyPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgYWRhcHRlciBmb3IgV2ViR1BVLlxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcclxuICAgICAqIHVzZWQgYXMgdGhlIEdQVSBhZGFwdGVyIGZvciB0aGUgdW5kZXJseWluZyBXZWJHUFUgYmFja2VuZCB0byBjcmVhdGUgR1BVIGRldmljZS5cclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGlzIHByb3BlcnR5IGlzIG5vdCBzZXQsIGl0IHdpbGwgYmUgYXZhaWxhYmxlIHRvIGdldCBhZnRlciB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZVxyXG4gICAgICogdmFsdWUgd2lsbCBiZSB0aGUgR1BVIGFkYXB0ZXIgdGhhdCBjcmVhdGVkIGJ5IHRoZSB1bmRlcmx5aW5nIFdlYkdQVSBiYWNrZW5kLlxyXG4gICAgICpcclxuICAgICAqIFdoZW4gdXNlIHdpdGggVHlwZVNjcmlwdCwgdGhlIHR5cGUgb2YgdGhpcyBwcm9wZXJ0eSBpcyBgR1BVQWRhcHRlcmAgZGVmaW5lZCBpbiBcIkB3ZWJncHUvdHlwZXNcIi5cclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBJdCBpcyBubyBsb25nZXIgcmVjb21tZW5kZWQgdG8gdXNlIHRoaXMgcHJvcGVydHkuIFRoZSBsYXRlc3QgV2ViR1BVIHNwZWMgYWRkcyBgR1BVRGV2aWNlLmFkYXB0ZXJJbmZvYFxyXG4gICAgICogKGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJncHUvI2RvbS1ncHVkZXZpY2UtYWRhcHRlcmluZm8pLCB3aGljaCBhbGxvd3MgdG8gZ2V0IHRoZSBhZGFwdGVyIGluZm9ybWF0aW9uIGZyb20gdGhlXHJcbiAgICAgKiBkZXZpY2UuIFdoZW4gaXQncyBhdmFpbGFibGUsIHRoZXJlIGlzIG5vIG5lZWQgdG8gc2V0L2dldCB0aGUge0BsaW5rIGFkYXB0ZXJ9IHByb3BlcnR5LlxyXG4gICAgICovXHJcbiAgICBhZGFwdGVyOiBUcnlHZXRHbG9iYWxUeXBlPCdHUFVBZGFwdGVyJz47XHJcbiAgICAvKipcclxuICAgICAqIFNldCBvciBnZXQgdGhlIEdQVSBkZXZpY2UgZm9yIFdlYkdQVS5cclxuICAgICAqXHJcbiAgICAgKiBUaGVyZSBhcmUgMyB2YWxpZCBzY2VuYXJpb3Mgb2YgYWNjZXNzaW5nIHRoaXMgcHJvcGVydHk6XHJcbiAgICAgKiAtIFNldCBhIHZhbHVlIGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlIHVzZWQgYnkgdGhlIFdlYkdQVSBiYWNrZW5kXHJcbiAgICAgKiB0byBwZXJmb3JtIGNhbGN1bGF0aW9ucy4gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIGBHUFVEZXZpY2VgIG9iamVjdCwgYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24uXHJcbiAgICAgKiAtIEdldCB0aGUgdmFsdWUgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhpcyB3aWxsIHRyeSB0byBjcmVhdGUgYSBuZXcgR1BVRGV2aWNlXHJcbiAgICAgKiBpbnN0YW5jZS4gUmV0dXJucyBhIGBQcm9taXNlYCB0aGF0IHJlc29sdmVzIHRvIGEgYEdQVURldmljZWAgb2JqZWN0LlxyXG4gICAgICogLSBHZXQgdGhlIHZhbHVlIGFmdGVyIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gUmV0dXJucyBhIHJlc29sdmVkIGBQcm9taXNlYCB0byB0aGVcclxuICAgICAqIGBHUFVEZXZpY2VgIG9iamVjdCB1c2VkIGJ5IHRoZSBXZWJHUFUgYmFja2VuZC5cclxuICAgICAqL1xyXG4gICAgZ2V0IGRldmljZSgpOiBQcm9taXNlPFRyeUdldEdsb2JhbFR5cGU8J0dQVURldmljZSc+PjtcclxuICAgIHNldCBkZXZpY2UodmFsdWU6IFRyeUdldEdsb2JhbFR5cGU8J0dQVURldmljZSc+KTtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB3aGV0aGVyIHZhbGlkYXRlIGlucHV0IGNvbnRlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlSW5wdXRDb250ZW50PzogYm9vbGVhbjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRW52IHtcclxuICAvKipcclxuICAgKiBzZXQgdGhlIHNldmVyaXR5IGxldmVsIGZvciBsb2dnaW5nLlxyXG4gICAqXHJcbiAgICogQGRlZmF1bHRWYWx1ZSBgJ3dhcm5pbmcnYFxyXG4gICAqL1xyXG4gIGxvZ0xldmVsPzogJ3ZlcmJvc2UnIHwgJ2luZm8nIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdmYXRhbCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEluZGljYXRlIHdoZXRoZXIgcnVuIGluIGRlYnVnIG1vZGUuXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcclxuICAgKi9cclxuICBkZWJ1Zz86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcclxuICAgKi9cclxuICB0cmFjZT86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB2ZXJzaW9uIG9mIHRoZSBjdXJyZW50IHBhY2thZ2UuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgdmVyc2lvbnM6IHtcclxuICAgIHJlYWRvbmx5IGNvbW1vbjogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgd2ViPzogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgbm9kZT86IHN0cmluZztcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgIHJlYWRvbmx5ICdyZWFjdC1uYXRpdmUnPzogc3RyaW5nO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBmb3IgV2ViQXNzZW1ibHlcclxuICAgKi9cclxuICByZWFkb25seSB3YXNtOiBFbnYuV2ViQXNzZW1ibHlGbGFncztcclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHTFxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHdlYmdsOiBFbnYuV2ViR0xGbGFncztcclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJHUFVcclxuICAgKi9cclxuICByZWFkb25seSB3ZWJncHU6IEVudi5XZWJHcHVGbGFncztcclxuXHJcbiAgW25hbWU6IHN0cmluZ106IHVua25vd247XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgYXMgYSBnbG9iYWwgc2luZ2xldG9uLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVudjogRW52ID0gZW52SW1wbDtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcclxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci50b0RhdGFVUkwoKVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvclRvRGF0YVVSTCA9ICh0ZW5zb3I6IFRlbnNvciwgb3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGNhbnZhcyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSA6IG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XHJcbiAgY2FudmFzLndpZHRoID0gdGVuc29yLmRpbXNbM107XHJcbiAgY2FudmFzLmhlaWdodCA9IHRlbnNvci5kaW1zWzJdO1xyXG4gIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzXHJcbiAgICB8IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxyXG4gICAgfCBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcclxuICAgIHwgbnVsbDtcclxuXHJcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XHJcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxyXG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XHJcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBpZiAob3B0aW9ucz8udGVuc29yTGF5b3V0ICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy50ZW5zb3JMYXlvdXQgPT09ICdOSFdDJykge1xyXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzJdO1xyXG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1szXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIERlZmF1bHQgbGF5b3V0IGlzIE5DV0hcclxuICAgICAgd2lkdGggPSB0ZW5zb3IuZGltc1szXTtcclxuICAgICAgaGVpZ2h0ID0gdGVuc29yLmRpbXNbMl07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zPy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQic7XHJcblxyXG4gICAgY29uc3Qgbm9ybSA9IG9wdGlvbnM/Lm5vcm07XHJcbiAgICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgbGV0IG5vcm1CaWFzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5tZWFuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgbm9ybU1lYW4gPSBbMjU1LCAyNTUsIDI1NSwgMjU1XTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuWzBdLCBub3JtLm1lYW5bMV0sIG5vcm0ubWVhblsyXSwgMF07XHJcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xyXG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XHJcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcclxuICAgIGxldCByVGVuc29yUG9pbnRlciA9IDAsXHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlLFxyXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDIsXHJcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XHJcblxyXG4gICAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxyXG4gICAgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCQScpIHtcclxuICAgICAgclRlbnNvclBvaW50ZXIgPSAwO1xyXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcclxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xyXG4gICAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XHJcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkdCJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICB9IGVsc2UgaWYgKGlucHV0Zm9ybWF0ID09PSAnUkJHJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcclxuICAgICAgICBjb25zdCBSID0gKCh0ZW5zb3IuZGF0YVtyVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMF0pICogbm9ybU1lYW5bMF07IC8vIFIgdmFsdWVcclxuICAgICAgICBjb25zdCBHID0gKCh0ZW5zb3IuZGF0YVtnVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMV0pICogbm9ybU1lYW5bMV07IC8vIEcgdmFsdWVcclxuICAgICAgICBjb25zdCBCID0gKCh0ZW5zb3IuZGF0YVtiVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMl0pICogbm9ybU1lYW5bMl07IC8vIEIgdmFsdWVcclxuICAgICAgICBjb25zdCBBID0gYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3Jlc3RyaWN0LXBsdXMtb3BlcmFuZHNcclxuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIFIgKyAnLCcgKyBHICsgJywnICsgQiArICcsJyArIEEgKyAnKSc7XHJcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxSZWN0KGosIGksIDEsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoJ3RvRGF0YVVSTCcgaW4gY2FudmFzKSB7XHJcbiAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvRGF0YVVSTCBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9JbWFnZURhdGEoKVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvclRvSW1hZ2VEYXRhID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhID0+IHtcclxuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPVxyXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcclxuICAgICAgOiAobmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKS5nZXRDb250ZXh0KCcyZCcpIGFzIE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XHJcbiAgbGV0IGltYWdlOiBJbWFnZURhdGE7XHJcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XHJcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxyXG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XHJcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBsZXQgY2hhbm5lbHM6IG51bWJlcjtcclxuICAgIGlmIChvcHRpb25zPy50ZW5zb3JMYXlvdXQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XHJcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XHJcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzFdO1xyXG4gICAgICBjaGFubmVscyA9IHRlbnNvci5kaW1zWzNdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxyXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xyXG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcclxuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1sxXTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xyXG5cclxuICAgIGNvbnN0IG5vcm0gPSBvcHRpb25zPy5ub3JtO1xyXG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0ubWVhbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIG5vcm0ubWVhbiA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDI1NV07XHJcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xyXG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XHJcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCAmJiBjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxyXG4gICAgICAgIChjaGFubmVscyA9PT0gMyAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQicgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdCR1InKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZW5zb3IgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXNcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcclxuICAgIGNvbnN0IHN0ZXAgPSA0O1xyXG4gICAgbGV0IHJJbWFnZVBvaW50ZXIgPSAwLFxyXG4gICAgICBnSW1hZ2VQb2ludGVyID0gMSxcclxuICAgICAgYkltYWdlUG9pbnRlciA9IDIsXHJcbiAgICAgIGFJbWFnZVBvaW50ZXIgPSAzO1xyXG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCxcclxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcclxuICAgICAgYVRlbnNvclBvaW50ZXIgPSAtMTtcclxuXHJcbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XHJcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH1cclxuXHJcbiAgICBpbWFnZSA9IHBpeGVsczJEQ29udGV4dC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICBpIDwgaGVpZ2h0ICogd2lkdGg7XHJcbiAgICAgIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBiSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCwgaSsrXHJcbiAgICApIHtcclxuICAgICAgaW1hZ2UuZGF0YVtySW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAvLyBSIHZhbHVlXHJcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxyXG4gICAgICBpbWFnZS5kYXRhW2JJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtiVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMl0pICogbm9ybU1lYW5bMl07IC8vIEIgdmFsdWVcclxuICAgICAgaW1hZ2UuZGF0YVthSW1hZ2VQb2ludGVyXSA9XHJcbiAgICAgICAgYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XHJcbiAgfVxyXG4gIHJldHVybiBpbWFnZTtcclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge1xyXG4gIE9wdGlvbnNEaW1lbnNpb25zLFxyXG4gIE9wdGlvbnNGb3JtYXQsXHJcbiAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLFxyXG4gIE9wdGlvbnNUZW5zb3JGb3JtYXQsXHJcbiAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucyxcclxuICBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLFxyXG4gIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxyXG4gIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxyXG4gIFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnMsXHJcbiAgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLFxyXG4gIFRlbnNvckZyb21VcmxPcHRpb25zLFxyXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xyXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcclxuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckludGVyZmFjZSB9IGZyb20gJy4vdGVuc29yLmpzJztcclxuXHJcbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnNcclxuICBleHRlbmRzIE9wdGlvbnNEaW1lbnNpb25zLFxyXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyxcclxuICAgIE9wdGlvbnNGb3JtYXQsXHJcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0IHt9XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSBpbWFnZSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIGJ1ZmZlciAtIEV4dHJhY3RlZCBpbWFnZSBidWZmZXIgZGF0YSAtIGFzc3VtaW5nIFJHQkEgZm9ybWF0XHJcbiAqIEBwYXJhbSBpbWFnZUZvcm1hdCAtIGlucHV0IGltYWdlIGNvbmZpZ3VyYXRpb24gLSByZXF1aXJlZCBjb25maWd1cmF0aW9ucyBoZWlnaHQsIHdpZHRoLCBmb3JtYXRcclxuICogQHBhcmFtIHRlbnNvckZvcm1hdCAtIG91dHB1dCB0ZW5zb3IgY29uZmlndXJhdGlvbiAtIERlZmF1bHQgaXMgUkdCIGZvcm1hdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGJ1ZmZlclRvVGVuc29yID0gKGJ1ZmZlcjogVWludDhDbGFtcGVkQXJyYXkgfCB1bmRlZmluZWQsIG9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyk6IFRlbnNvciA9PiB7XHJcbiAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGJ1ZmZlciBtdXN0IGJlIGRlZmluZWQnKTtcclxuICB9XHJcbiAgaWYgKG9wdGlvbnMuaGVpZ2h0ID09PSB1bmRlZmluZWQgfHwgb3B0aW9ucy53aWR0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGhlaWdodCBhbmQgd2lkdGggbXVzdCBiZSBkZWZpbmVkJyk7XHJcbiAgfVxyXG4gIGlmIChvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05IV0MgVGVuc29yIGxheW91dCBpcyBub3Qgc3VwcG9ydGVkIHlldCcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSBvcHRpb25zO1xyXG5cclxuICBjb25zdCBub3JtID0gb3B0aW9ucy5ub3JtID8/IHsgbWVhbjogMjU1LCBiaWFzOiAwIH07XHJcbiAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuICBpZiAodHlwZW9mIG5vcm0ubWVhbiA9PT0gJ251bWJlcicpIHtcclxuICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbl07XHJcbiAgfSBlbHNlIHtcclxuICAgIG5vcm1NZWFuID0gW25vcm0ubWVhbiFbMF0sIG5vcm0ubWVhbiFbMV0sIG5vcm0ubWVhbiFbMl0sIG5vcm0ubWVhbiFbM10gPz8gMjU1XTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2Ygbm9ybS5iaWFzID09PSAnbnVtYmVyJykge1xyXG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzXTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzIVswXSwgbm9ybS5iaWFzIVsxXSwgbm9ybS5iaWFzIVsyXSwgbm9ybS5iaWFzIVszXSA/PyAwXTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZm9ybWF0IDogJ1JHQkEnO1xyXG4gIC8vIGRlZmF1bHQgdmFsdWUgaXMgUkdCQSBzaW5jZSBpbWFnZWRhdGEgYW5kIEhUTUxJbWFnZUVsZW1lbnQgdXNlcyBpdFxyXG5cclxuICBjb25zdCBvdXRwdXRmb3JtYXQgPVxyXG4gICAgb3B0aW9ucy50ZW5zb3JGb3JtYXQgIT09IHVuZGVmaW5lZCA/IChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy50ZW5zb3JGb3JtYXQgOiAnUkdCJykgOiAnUkdCJztcclxuICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcclxuICBjb25zdCBmbG9hdDMyRGF0YSA9IG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnID8gbmV3IEZsb2F0MzJBcnJheShzdHJpZGUgKiA0KSA6IG5ldyBGbG9hdDMyQXJyYXkoc3RyaWRlICogMyk7XHJcblxyXG4gIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xyXG4gIGxldCBzdGVwID0gNCxcclxuICAgIHJJbWFnZVBvaW50ZXIgPSAwLFxyXG4gICAgZ0ltYWdlUG9pbnRlciA9IDEsXHJcbiAgICBiSW1hZ2VQb2ludGVyID0gMixcclxuICAgIGFJbWFnZVBvaW50ZXIgPSAzO1xyXG4gIGxldCByVGVuc29yUG9pbnRlciA9IDAsXHJcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSxcclxuICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcclxuICAgIGFUZW5zb3JQb2ludGVyID0gLTE7XHJcblxyXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBpbnB1dCBpbWFnZSBmb3JtYXRcclxuICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XHJcbiAgICBzdGVwID0gMztcclxuICAgIHJJbWFnZVBvaW50ZXIgPSAwO1xyXG4gICAgZ0ltYWdlUG9pbnRlciA9IDE7XHJcbiAgICBiSW1hZ2VQb2ludGVyID0gMjtcclxuICAgIGFJbWFnZVBvaW50ZXIgPSAtMTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0aW5nIHRoZSBwb2ludGVyIGFzc2lnbm1lbnRzIGJhc2VkIG9uIHRoZSBvdXRwdXQgdGVuc29yIGZvcm1hdFxyXG4gIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSR0JBJykge1xyXG4gICAgYVRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAzO1xyXG4gIH0gZWxzZSBpZiAob3V0cHV0Zm9ybWF0ID09PSAnUkJHJykge1xyXG4gICAgclRlbnNvclBvaW50ZXIgPSAwO1xyXG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdCR1InKSB7XHJcbiAgICBiVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICBnVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcclxuICAgIHJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICB9XHJcblxyXG4gIGZvciAoXHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBpIDwgc3RyaWRlO1xyXG4gICAgaSsrLCBySW1hZ2VQb2ludGVyICs9IHN0ZXAsIGJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBhSW1hZ2VQb2ludGVyICs9IHN0ZXBcclxuICApIHtcclxuICAgIGZsb2F0MzJEYXRhW3JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltySW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzBdKSAvIG5vcm1NZWFuWzBdO1xyXG4gICAgZmxvYXQzMkRhdGFbZ1RlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2dJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMV0pIC8gbm9ybU1lYW5bMV07XHJcbiAgICBmbG9hdDMyRGF0YVtiVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbYkltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1syXSkgLyBub3JtTWVhblsyXTtcclxuICAgIGlmIChhVGVuc29yUG9pbnRlciAhPT0gLTEgJiYgYUltYWdlUG9pbnRlciAhPT0gLTEpIHtcclxuICAgICAgZmxvYXQzMkRhdGFbYVRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW2FJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbM10pIC8gbm9ybU1lYW5bM107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGbG9hdDMyQXJyYXkgLT4gb3J0LlRlbnNvclxyXG4gIGNvbnN0IG91dHB1dFRlbnNvciA9XHJcbiAgICBvdXRwdXRmb3JtYXQgPT09ICdSR0JBJ1xyXG4gICAgICA/IG5ldyBUZW5zb3IoJ2Zsb2F0MzInLCBmbG9hdDMyRGF0YSwgWzEsIDQsIGhlaWdodCwgd2lkdGhdKVxyXG4gICAgICA6IG5ldyBUZW5zb3IoJ2Zsb2F0MzInLCBmbG9hdDMyRGF0YSwgWzEsIDMsIGhlaWdodCwgd2lkdGhdKTtcclxuICByZXR1cm4gb3V0cHV0VGVuc29yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tSW1hZ2UoKS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tSW1hZ2UgPSBhc3luYyAoXHJcbiAgaW1hZ2U6IEltYWdlRGF0YSB8IEhUTUxJbWFnZUVsZW1lbnQgfCBJbWFnZUJpdG1hcCB8IHN0cmluZyxcclxuICBvcHRpb25zPzpcclxuICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcclxuICAgIHwgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcclxuICAgIHwgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9uc1xyXG4gICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcclxuKTogUHJvbWlzZTxUZW5zb3I+ID0+IHtcclxuICAvLyBjaGVja2luZyB0aGUgdHlwZSBvZiBpbWFnZSBvYmplY3RcclxuICBjb25zdCBpc0hUTUxJbWFnZUVsZSA9IHR5cGVvZiBIVE1MSW1hZ2VFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgY29uc3QgaXNJbWFnZURhdGFFbGUgPSB0eXBlb2YgSW1hZ2VEYXRhICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YTtcclxuICBjb25zdCBpc0ltYWdlQml0bWFwID0gdHlwZW9mIEltYWdlQml0bWFwICE9PSAndW5kZWZpbmVkJyAmJiBpbWFnZSBpbnN0YW5jZW9mIEltYWdlQml0bWFwO1xyXG4gIGNvbnN0IGlzU3RyaW5nID0gdHlwZW9mIGltYWdlID09PSAnc3RyaW5nJztcclxuXHJcbiAgbGV0IGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5IHwgdW5kZWZpbmVkO1xyXG4gIGxldCBidWZmZXJUb1RlbnNvck9wdGlvbnM6IEJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnMgPz8ge307XHJcblxyXG4gIGNvbnN0IGNyZWF0ZUNhbnZhcyA9ICgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIE9mZnNjcmVlbkNhbnZhcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIG5ldyBPZmZzY3JlZW5DYW52YXMoMSwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnZhcyBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBjcmVhdGVDYW52YXNDb250ZXh0ID0gKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgfCBPZmZzY3JlZW5DYW52YXMpID0+IHtcclxuICAgIGlmICh0eXBlb2YgSFRNTENhbnZhc0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XHJcbiAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIH0gZWxzZSBpZiAoY2FudmFzIGluc3RhbmNlb2YgT2Zmc2NyZWVuQ2FudmFzKSB7XHJcbiAgICAgIHJldHVybiBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG4gIC8vIGZpbGxpbmcgYW5kIGNoZWNraW5nIGltYWdlIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xyXG4gIGlmIChpc0hUTUxJbWFnZUVsZSkge1xyXG4gICAgLy8gSFRNTEltYWdlRWxlbWVudCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBpcyBSR0JBIGJ5IGRlZmF1bHRcclxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xyXG4gICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xyXG5cclxuICAgIGlmIChwaXhlbHMyRENvbnRleHQgIT0gbnVsbCkge1xyXG4gICAgICBsZXQgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICBsZXQgd2lkdGggPSBpbWFnZS53aWR0aDtcclxuICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVkSGVpZ2h0O1xyXG4gICAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltYWdlIGlucHV0IGNvbmZpZyBmb3JtYXQgbXVzdCBiZSBSR0JBIGZvciBIVE1MSW1hZ2VFbGVtZW50Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy50ZW5zb3JGb3JtYXQgPSAnUkdCQSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcclxuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaXNJbWFnZURhdGFFbGUpIHtcclxuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcclxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xyXG5cclxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZXNpemVkV2lkdGggIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRIZWlnaHQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XHJcbiAgICAgIHdpZHRoID0gb3B0aW9ucy5yZXNpemVkV2lkdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgIHdpZHRoID0gaW1hZ2Uud2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfVxyXG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmZvcm1hdCA9ICdSR0JBJztcclxuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcclxuXHJcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHRlbXBDYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcclxuXHJcbiAgICAgIHRlbXBDYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgdGVtcENhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KHRlbXBDYW52YXMpO1xyXG5cclxuICAgICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XHJcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZSwgMCwgMCk7XHJcbiAgICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYWNjZXNzIGltYWdlIGRhdGEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YSA9IGltYWdlLmRhdGE7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChpc0ltYWdlQml0bWFwKSB7XHJcbiAgICAvLyBJbWFnZUJpdG1hcCAtIGltYWdlIG9iamVjdCAtIGZvcm1hdCBtdXN0IGJlIHByb3ZpZGVkIGJ5IHVzZXJcclxuICAgIGlmIChvcHRpb25zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBpbWFnZSBjb25maWcgd2l0aCBmb3JtYXQgZm9yIEltYWdlYml0bWFwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XHJcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XHJcblxyXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IGhlaWdodCA9IGltYWdlLmhlaWdodDtcclxuICAgICAgY29uc3Qgd2lkdGggPSBpbWFnZS53aWR0aDtcclxuICAgICAgcGl4ZWxzMkRDb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgIGRhdGEgPSBwaXhlbHMyRENvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpLmRhdGE7XHJcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoaXNTdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xyXG4gICAgICBjb25zdCBjb250ZXh0ID0gY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXMpO1xyXG4gICAgICBpZiAoIWltYWdlIHx8ICFjb250ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG5ld0ltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIG5ld0ltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XHJcbiAgICAgIG5ld0ltYWdlLnNyYyA9IGltYWdlO1xyXG4gICAgICBuZXdJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gbmV3SW1hZ2Uud2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IG5ld0ltYWdlLmhlaWdodDtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShuZXdJbWFnZSwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBpbWcgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgcmVzb2x2ZShidWZmZXJUb1RlbnNvcihpbWcuZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKSk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIGJ1ZmZlclRvVGVuc29yKGRhdGEsIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgZGF0YSBwcm92aWRlZCBpcyBub3Qgc3VwcG9ydGVkIC0gYWJvcnRlZCB0ZW5zb3IgY3JlYXRpb24nKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21UZXh0dXJlKCkuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVRleHR1cmUgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcclxuICB0ZXh0dXJlOiBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGUsXHJcbiAgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+LFxyXG4pOiBUZW5zb3IgPT4ge1xyXG4gIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XHJcbiAgLy8gQWx3YXlzIGFzc3VtZSBSR0JBRjMyLiBUT0RPOiBzdXBwb3J0IGRpZmZlcmVudCB0ZXh0dXJlIGZvcm1hdFxyXG4gIGNvbnN0IGRpbXMgPSBbMSwgaGVpZ2h0LCB3aWR0aCwgNF07XHJcbiAgcmV0dXJuIG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ3RleHR1cmUnLCB0eXBlOiAnZmxvYXQzMicsIHRleHR1cmUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tR3B1QnVmZmVyKCkuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbUdwdUJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXHJcbiAgZ3B1QnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZSxcclxuICBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPixcclxuKTogVGVuc29yID0+IHtcclxuICBjb25zdCB7IGRhdGFUeXBlLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gb3B0aW9ucztcclxuICByZXR1cm4gbmV3IFRlbnNvcih7IGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsIHR5cGU6IGRhdGFUeXBlID8/ICdmbG9hdDMyJywgZ3B1QnVmZmVyLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbU1MVGVuc29yKCkuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbU1MVGVuc29yID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JEYXRhVHlwZXM+KFxyXG4gIG1sVGVuc29yOiBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlLFxyXG4gIG9wdGlvbnM6IFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnM8VD4sXHJcbik6IFRlbnNvciA9PiB7XHJcbiAgY29uc3QgeyBkYXRhVHlwZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSA9IG9wdGlvbnM7XHJcbiAgcmV0dXJuIG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ21sLXRlbnNvcicsIHR5cGU6IGRhdGFUeXBlID8/ICdmbG9hdDMyJywgbWxUZW5zb3IsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tUGlubmVkQnVmZmVyKCkuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlciA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXHJcbiAgdHlwZTogVCxcclxuICBidWZmZXI6IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZU1hcFtUXSxcclxuICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbik6IFRlbnNvciA9PiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdjcHUtcGlubmVkJywgdHlwZSwgZGF0YTogYnVmZmVyLCBkaW1zOiBkaW1zID8/IFtidWZmZXIubGVuZ3RoXSB9KTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcblxyXG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzID1cclxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcclxuICB8IEludDhBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBJbnQxNkFycmF5Q29uc3RydWN0b3JcclxuICB8IEludDMyQXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcclxuICB8IEZsb2F0NjRBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yO1xyXG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRUeXBlZEFycmF5ID0gSW5zdGFuY2VUeXBlPFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnM+O1xyXG5cclxuLy8gYSBydW50aW1lIG1hcCB0aGF0IG1hcHMgdHlwZSBzdHJpbmcgdG8gVHlwZWRBcnJheSBjb25zdHJ1Y3Rvci4gU2hvdWxkIG1hdGNoIFRlbnNvci5EYXRhVHlwZU1hcC5cclxuZXhwb3J0IGNvbnN0IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgPSBuZXcgTWFwPHN0cmluZywgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz4oW1xyXG4gIFsnZmxvYXQzMicsIEZsb2F0MzJBcnJheV0sXHJcbiAgWyd1aW50OCcsIFVpbnQ4QXJyYXldLFxyXG4gIFsnaW50OCcsIEludDhBcnJheV0sXHJcbiAgWyd1aW50MTYnLCBVaW50MTZBcnJheV0sXHJcbiAgWydpbnQxNicsIEludDE2QXJyYXldLFxyXG4gIFsnaW50MzInLCBJbnQzMkFycmF5XSxcclxuICBbJ2Jvb2wnLCBVaW50OEFycmF5XSxcclxuICBbJ2Zsb2F0NjQnLCBGbG9hdDY0QXJyYXldLFxyXG4gIFsndWludDMyJywgVWludDMyQXJyYXldLFxyXG4gIFsnaW50NCcsIFVpbnQ4QXJyYXldLFxyXG4gIFsndWludDQnLCBVaW50OEFycmF5XSxcclxuXSk7XHJcblxyXG4vLyBhIHJ1bnRpbWUgbWFwIHRoYXQgbWFwcyB0eXBlIHN0cmluZyB0byBUeXBlZEFycmF5IGNvbnN0cnVjdG9yLiBTaG91bGQgbWF0Y2ggVGVuc29yLkRhdGFUeXBlTWFwLlxyXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUCA9IG5ldyBNYXA8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycywgVGVuc29yLlR5cGU+KFtcclxuICBbRmxvYXQzMkFycmF5LCAnZmxvYXQzMiddLFxyXG4gIFtVaW50OEFycmF5LCAndWludDgnXSxcclxuICBbSW50OEFycmF5LCAnaW50OCddLFxyXG4gIFtVaW50MTZBcnJheSwgJ3VpbnQxNiddLFxyXG4gIFtJbnQxNkFycmF5LCAnaW50MTYnXSxcclxuICBbSW50MzJBcnJheSwgJ2ludDMyJ10sXHJcbiAgW0Zsb2F0NjRBcnJheSwgJ2Zsb2F0NjQnXSxcclxuICBbVWludDMyQXJyYXksICd1aW50MzInXSxcclxuXSk7XHJcblxyXG4vLyB0aGUgZm9sbG93aW5nIGNvZGUgYWxsb3dzIGRlbGF5aW5nIGV4ZWN1dGlvbiBvZiBCaWdJbnQvRmxvYXQxNkFycmF5IGNoZWNraW5nLiBUaGlzIGFsbG93cyBsYXp5IGluaXRpYWxpemF0aW9uIGZvclxyXG4vLyBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQIGFuZCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLCB3aGljaCBhbGxvd3MgQmlnSW50L0Zsb2F0MTZBcnJheVxyXG4vLyBwb2x5ZmlsbCBpZiBhdmFpbGFibGUuXHJcbmxldCBpc1R5cGVkQXJyYXlDaGVja2VkID0gZmFsc2U7XHJcbmV4cG9ydCBjb25zdCBjaGVja1R5cGVkQXJyYXkgPSAoKSA9PiB7XHJcbiAgaWYgKCFpc1R5cGVkQXJyYXlDaGVja2VkKSB7XHJcbiAgICBpc1R5cGVkQXJyYXlDaGVja2VkID0gdHJ1ZTtcclxuICAgIGNvbnN0IGlzQmlnSW50NjRBcnJheUF2YWlsYWJsZSA9IHR5cGVvZiBCaWdJbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBCaWdJbnQ2NEFycmF5LmZyb207XHJcbiAgICBjb25zdCBpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ1VpbnQ2NEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBCaWdVaW50NjRBcnJheS5mcm9tO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGNvbnN0IEZsb2F0MTZBcnJheSA9IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5O1xyXG4gICAgY29uc3QgaXNGbG9hdDE2QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgRmxvYXQxNkFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBGbG9hdDE2QXJyYXkuZnJvbTtcclxuXHJcbiAgICBpZiAoaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlKSB7XHJcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCdpbnQ2NCcsIEJpZ0ludDY0QXJyYXkpO1xyXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChCaWdJbnQ2NEFycmF5LCAnaW50NjQnKTtcclxuICAgIH1cclxuICAgIGlmIChpc0JpZ1VpbnQ2NEFycmF5QXZhaWxhYmxlKSB7XHJcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCd1aW50NjQnLCBCaWdVaW50NjRBcnJheSk7XHJcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ1VpbnQ2NEFycmF5LCAndWludDY0Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNGbG9hdDE2QXJyYXlBdmFpbGFibGUpIHtcclxuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2Zsb2F0MTYnLCBGbG9hdDE2QXJyYXkpO1xyXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLnNldChGbG9hdDE2QXJyYXksICdmbG9hdDE2Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZiBGbG9hdDE2QXJyYXkgaXMgbm90IGF2YWlsYWJsZSwgdXNlICdVaW50MTZBcnJheScgdG8gc3RvcmUgdGhlIGRhdGEuXHJcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuc2V0KCdmbG9hdDE2JywgVWludDE2QXJyYXkpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge1xyXG4gIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyxcclxuICBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXHJcbiAgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXHJcbiAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyxcclxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcclxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XHJcblxyXG4vKipcclxuICogY2FsY3VsYXRlIHNpemUgZnJvbSBkaW1zLlxyXG4gKlxyXG4gKiBAcGFyYW0gZGltcyB0aGUgZGltcyBhcnJheS4gTWF5IGJlIGFuIGlsbGVnYWwgaW5wdXQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlU2l6ZSA9IChkaW1zOiByZWFkb25seSB1bmtub3duW10pOiBudW1iZXIgPT4ge1xyXG4gIGxldCBzaXplID0gMTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXMubGVuZ3RoOyBpKyspIHtcclxuICAgIGNvbnN0IGRpbSA9IGRpbXNbaV07XHJcbiAgICBpZiAodHlwZW9mIGRpbSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc1NhZmVJbnRlZ2VyKGRpbSkpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGFuIGludGVnZXIsIGdvdDogJHtkaW19YCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZGltIDwgMCkge1xyXG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgZGltc1ske2l9XSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIsIGdvdDogJHtkaW19YCk7XHJcbiAgICB9XHJcbiAgICBzaXplICo9IGRpbTtcclxuICB9XHJcbiAgcmV0dXJuIHNpemU7XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnJlc2hhcGUoKVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvclJlc2hhcGUgPSAodGVuc29yOiBUZW5zb3IsIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yID0+IHtcclxuICBzd2l0Y2ggKHRlbnNvci5sb2NhdGlvbikge1xyXG4gICAgY2FzZSAnY3B1JzpcclxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yLnR5cGUsIHRlbnNvci5kYXRhLCBkaW1zKTtcclxuICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XHJcbiAgICAgICAgbG9jYXRpb246ICdjcHUtcGlubmVkJyxcclxuICAgICAgICBkYXRhOiB0ZW5zb3IuZGF0YSBhcyBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ2RhdGEnXSxcclxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcclxuICAgICAgICBkaW1zLFxyXG4gICAgICB9KTtcclxuICAgIGNhc2UgJ3RleHR1cmUnOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XHJcbiAgICAgICAgbG9jYXRpb246ICd0ZXh0dXJlJyxcclxuICAgICAgICB0ZXh0dXJlOiB0ZW5zb3IudGV4dHVyZSxcclxuICAgICAgICB0eXBlOiB0ZW5zb3IudHlwZSBhcyBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXHJcbiAgICAgICAgZGltcyxcclxuICAgICAgfSk7XHJcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcclxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xyXG4gICAgICAgIGxvY2F0aW9uOiAnZ3B1LWJ1ZmZlcicsXHJcbiAgICAgICAgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyLFxyXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxyXG4gICAgICAgIGRpbXMsXHJcbiAgICAgIH0pO1xyXG4gICAgY2FzZSAnbWwtdGVuc29yJzpcclxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3Ioe1xyXG4gICAgICAgIGxvY2F0aW9uOiAnbWwtdGVuc29yJyxcclxuICAgICAgICBtbFRlbnNvcjogdGVuc29yLm1sVGVuc29yLFxyXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXHJcbiAgICAgICAgZGltcyxcclxuICAgICAgfSk7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRlbnNvclJlc2hhcGU6IHRlbnNvciBsb2NhdGlvbiAke3RlbnNvci5sb2NhdGlvbn0gaXMgbm90IHN1cHBvcnRlZGApO1xyXG4gIH1cclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyB0ZW5zb3JUb0RhdGFVUkwsIHRlbnNvclRvSW1hZ2VEYXRhIH0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi1pbXBsLmpzJztcclxuaW1wb3J0IHsgVGVuc29yVG9EYXRhVXJsT3B0aW9ucywgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIH0gZnJvbSAnLi90ZW5zb3ItY29udmVyc2lvbi5qcyc7XHJcbmltcG9ydCB7XHJcbiAgdGVuc29yRnJvbUdwdUJ1ZmZlcixcclxuICB0ZW5zb3JGcm9tSW1hZ2UsXHJcbiAgdGVuc29yRnJvbU1MVGVuc29yLFxyXG4gIHRlbnNvckZyb21QaW5uZWRCdWZmZXIsXHJcbiAgdGVuc29yRnJvbVRleHR1cmUsXHJcbn0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS1pbXBsLmpzJztcclxuaW1wb3J0IHtcclxuICBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXHJcbiAgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxyXG4gIE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxyXG4gIFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zLFxyXG4gIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnMsXHJcbiAgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsXHJcbiAgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnMsXHJcbiAgVGVuc29yRnJvbU1MVGVuc29yT3B0aW9ucyxcclxuICBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnMsXHJcbiAgVGVuc29yRnJvbVVybE9wdGlvbnMsXHJcbiAgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyxcclxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcclxuaW1wb3J0IHtcclxuICBjaGVja1R5cGVkQXJyYXksXHJcbiAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCxcclxuICBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQLFxyXG4gIFN1cHBvcnRlZFR5cGVkQXJyYXksXHJcbiAgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyxcclxufSBmcm9tICcuL3RlbnNvci1pbXBsLXR5cGUtbWFwcGluZy5qcyc7XHJcbmltcG9ydCB7IGNhbGN1bGF0ZVNpemUsIHRlbnNvclJlc2hhcGUgfSBmcm9tICcuL3RlbnNvci11dGlscy1pbXBsLmpzJztcclxuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckludGVyZmFjZSB9IGZyb20gJy4vdGVuc29yLmpzJztcclxuXHJcbi8vIHR5cGUgYWxpYXNlcyBmb3IgdGhvc2UgZXhwb3J0ZWQgZnJvbSBUZW5zb3IgaW50ZXJmYWNlXHJcblxyXG50eXBlIFRlbnNvclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuVHlwZTtcclxudHlwZSBUZW5zb3JEYXRhVHlwZSA9IFRlbnNvckludGVyZmFjZS5EYXRhVHlwZTtcclxudHlwZSBUZW5zb3JEYXRhTG9jYXRpb24gPSBUZW5zb3JJbnRlcmZhY2UuRGF0YUxvY2F0aW9uO1xyXG50eXBlIFRlbnNvclRleHR1cmVUeXBlID0gVGVuc29ySW50ZXJmYWNlLlRleHR1cmVUeXBlO1xyXG50eXBlIFRlbnNvckdwdUJ1ZmZlclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyVHlwZTtcclxudHlwZSBUZW5zb3JNTFRlbnNvclR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JUeXBlO1xyXG5cclxuLyoqXHJcbiAqIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IgaW50ZXJmYWNlLlxyXG4gKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGVuc29yIGltcGxlbWVudHMgVGVuc29ySW50ZXJmYWNlIHtcclxuICAvLyAjcmVnaW9uIGNvbnN0cnVjdG9yc1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgQ1BVIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHR5cGU6IFRlbnNvclR5cGUsXHJcbiAgICBkYXRhOiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBudW1iZXJbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLiBUeXBlIGlzIGluZmVycmVkIGZyb20gZGF0YS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGRhdGE6IFRlbnNvckRhdGFUeXBlIHwgVWludDhDbGFtcGVkQXJyYXkgfCByZWFkb25seSBzdHJpbmdbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIHBpbm5lZCBDUFUgZGF0YSB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ2NwdS1waW5uZWQnLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYkdMIHRleHR1cmUgd2l0aCB0aGUgZ2l2ZW4gdHlwZSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIFRlbnNvcidzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICd0ZXh0dXJlJy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVycyk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR1BVIGJ1ZmZlciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ2dwdS1idWZmZXInLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJOTiBNTFRlbnNvciB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ21sLXRlbnNvcicuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IE1MVGVuc29yQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcclxuXHJcbiAgLyoqXHJcbiAgICogaW1wbGVtZW50YXRpb24uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBhcmcwOlxyXG4gICAgICB8IFRlbnNvclR5cGVcclxuICAgICAgfCBUZW5zb3JEYXRhVHlwZVxyXG4gICAgICB8IFVpbnQ4Q2xhbXBlZEFycmF5XHJcbiAgICAgIHwgcmVhZG9ubHkgc3RyaW5nW11cclxuICAgICAgfCByZWFkb25seSBib29sZWFuW11cclxuICAgICAgfCBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnNcclxuICAgICAgfCBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzXHJcbiAgICAgIHwgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzXHJcbiAgICAgIHwgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXHJcbiAgICBhcmcxPzogVGVuc29yRGF0YVR5cGUgfCBVaW50OENsYW1wZWRBcnJheSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBib29sZWFuW10sXHJcbiAgICBhcmcyPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKSB7XHJcbiAgICAvLyBwZXJmb3JtIG9uZS10aW1lIGNoZWNrIGZvciBCaWdJbnQvRmxvYXQxNkFycmF5IHN1cHBvcnRcclxuICAgIGNoZWNrVHlwZWRBcnJheSgpO1xyXG5cclxuICAgIGxldCB0eXBlOiBUZW5zb3JUeXBlO1xyXG4gICAgbGV0IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xyXG5cclxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ29iamVjdCcgJiYgJ2xvY2F0aW9uJyBpbiBhcmcwKSB7XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBzcGVjaWZpYyBsb2NhdGlvblxyXG4gICAgICAvL1xyXG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9IGFyZzAubG9jYXRpb247XHJcbiAgICAgIHR5cGUgPSBhcmcwLnR5cGU7XHJcbiAgICAgIGRpbXMgPSBhcmcwLmRpbXM7XHJcbiAgICAgIHN3aXRjaCAoYXJnMC5sb2NhdGlvbikge1xyXG4gICAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOiB7XHJcbiAgICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuZ2V0KHR5cGUpO1xyXG4gICAgICAgICAgaWYgKCFleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBwaW5uZWQgYnVmZmVyYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIShhcmcwLmRhdGEgaW5zdGFuY2VvZiBleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgYnVmZmVyIHNob3VsZCBiZSBvZiB0eXBlICR7ZXhwZWN0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3IubmFtZX1gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuY3B1RGF0YSA9IGFyZzAuZGF0YTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICd0ZXh0dXJlJzoge1xyXG4gICAgICAgICAgaWYgKHR5cGUgIT09ICdmbG9hdDMyJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSB0ZXh0dXJlYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmdwdVRleHR1cmVEYXRhID0gYXJnMC50ZXh0dXJlO1xyXG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcclxuICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSBhcmcwLmRpc3Bvc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnZ3B1LWJ1ZmZlcic6IHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MzInICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDE2JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50MzInICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ2NCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQzMicgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ4JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAnYm9vbCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ0JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NCdcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBncHUgYnVmZmVyYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmdwdUJ1ZmZlckRhdGEgPSBhcmcwLmdwdUJ1ZmZlcjtcclxuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XHJcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgJ21sLXRlbnNvcic6IHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MzInICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdmbG9hdDE2JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50MzInICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ2NCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQzMicgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ2NCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDgnICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50OCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Jvb2wnICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICd1aW50NCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDQnXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZSBcIiR7dHlwZX1cIiB0byBjcmVhdGUgdGVuc29yIGZyb20gTUxUZW5zb3JgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMubWxUZW5zb3JEYXRhID0gYXJnMC5tbFRlbnNvcjtcclxuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IGFyZzAuZG93bmxvYWQ7XHJcbiAgICAgICAgICB0aGlzLmRpc3Bvc2VyID0gYXJnMC5kaXNwb3NlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRlbnNvciBjb25zdHJ1Y3RvcjogdW5zdXBwb3J0ZWQgbG9jYXRpb24gJyR7dGhpcy5kYXRhTG9jYXRpb259J2ApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL1xyXG4gICAgICAvLyBjb25zdHJ1Y3RpbmcgdGVuc29yIG9mIGxvY2F0aW9uICdjcHUnXHJcbiAgICAgIC8vXHJcbiAgICAgIGxldCBkYXRhOiBUZW5zb3JEYXRhVHlwZTtcclxuICAgICAgbGV0IG1heWJlRGltczogdHlwZW9mIGFyZzEgfCB0eXBlb2YgYXJnMjtcclxuICAgICAgLy8gY2hlY2sgd2hldGhlciBhcmcwIGlzIHR5cGUgb3IgZGF0YVxyXG4gICAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IodHlwZSwgZGF0YSwgLi4uKVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdHlwZSA9IGFyZzA7XHJcbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMjtcclxuICAgICAgICBpZiAoYXJnMCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIC8vIHN0cmluZyB0ZW5zb3JcclxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmcxKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQSBzdHJpbmcgdGVuc29yJ3MgZGF0YSBtdXN0IGJlIGEgc3RyaW5nIGFycmF5LlwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIHdlIGRvbid0IGNoZWNrIHdoZXRoZXIgZXZlcnkgZWxlbWVudCBpbiB0aGUgYXJyYXkgaXMgc3RyaW5nOyB0aGlzIGlzIHRvbyBzbG93LiB3ZSBhc3N1bWUgaXQncyBjb3JyZWN0IGFuZFxyXG4gICAgICAgICAgLy8gZXJyb3Igd2lsbCBiZSBwb3B1bGF0ZWQgYXQgaW5mZXJlbmNlXHJcbiAgICAgICAgICBkYXRhID0gYXJnMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gbnVtZXJpYyB0ZW5zb3JcclxuICAgICAgICAgIGNvbnN0IHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAuZ2V0KGFyZzApO1xyXG4gICAgICAgICAgaWYgKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuc3VwcG9ydGVkIHRlbnNvciB0eXBlOiAke2FyZzB9LmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcclxuICAgICAgICAgICAgaWYgKChhcmcwID09PSAnZmxvYXQxNicgJiYgdHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSBVaW50MTZBcnJheSkgfHwgYXJnMCA9PT0gJ3VpbnQ0JyB8fCBhcmcwID09PSAnaW50NCcpIHtcclxuICAgICAgICAgICAgICAvLyAtICdmbG9hdDE2JzpcclxuICAgICAgICAgICAgICAvLyAgIFdoZW4gbm8gRmxvYXQxNkFycmF5IHBvbHlmaWxsIGlzIHVzZWQsIHdlIGNhbm5vdCBjcmVhdGUgJ2Zsb2F0MTYnIHRlbnNvciBmcm9tIG51bWJlciBhcnJheS5cclxuICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgIC8vICAgVGhyb3cgZXJyb3IgaGVyZSBiZWNhdXNlIHdoZW4gdXNlciB0cnkgdG8gdXNlIG51bWJlciBhcnJheSBhcyBkYXRhLFxyXG4gICAgICAgICAgICAgIC8vICAgZS5nLiBuZXcgVGVuc29yKCdmbG9hdDE2JywgWzEsIDIsIDMsIDRdLCBkaW1zKSksIGl0IHdpbGwgYWN0dWFsbHkgY2FsbFxyXG4gICAgICAgICAgICAgIC8vICAgVWludDE2QXJyYXkuZnJvbShhcmcxKSB3aGljaCBnZW5lcmF0ZXMgd3JvbmcgZGF0YS5cclxuICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgIC8vIC0gJ3VpbnQ0JyBhbmQgJ2ludDQnOlxyXG4gICAgICAgICAgICAgIC8vICAgVWludDhBcnJheS5mcm9tKGFyZzEpIHdpbGwgZ2VuZXJhdGUgd3JvbmcgZGF0YSBmb3IgJ3VpbnQ0JyBhbmQgJ2ludDQnIHRlbnNvci5cclxuICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgQ3JlYXRpbmcgYSAke2FyZzB9IHRlbnNvciBmcm9tIG51bWJlciBhcnJheSBpcyBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlICR7dHlwZWRBcnJheUNvbnN0cnVjdG9yLm5hbWV9IGFzIGRhdGEuYCxcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZzAgPT09ICd1aW50NjQnIHx8IGFyZzAgPT09ICdpbnQ2NCcpIHtcclxuICAgICAgICAgICAgICAvLyB1c2UgJ2FzIGFueScgaGVyZSBiZWNhdXNlOlxyXG4gICAgICAgICAgICAgIC8vIDEuIFR5cGVTY3JpcHQncyBjaGVjayBvbiB0eXBlIG9mICdBcnJheS5pc0FycmF5KCknIGRvZXMgbm90IHdvcmsgd2l0aCByZWFkb25seSBhcnJheXMuXHJcbiAgICAgICAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTcwMDJcclxuICAgICAgICAgICAgICAvLyAyLiBUeXBlU2NyaXB0J3MgY2hlY2sgb24gdW5pb24gdHlwZSBvZiAnKEJpZ0ludDY0QXJyYXlDb25zdHJ1Y3RvcnxCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yKS5mcm9tKCknXHJcbiAgICAgICAgICAgICAgLy8gZG9lcyBub3QgYWNjZXB0IHBhcmFtZXRlciBtYXBGbi5cclxuICAgICAgICAgICAgICAvLyAzLiBwYXJhbWV0ZXJzIG9mICdTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLmZyb20oKScgZG9lcyBub3QgbWF0Y2ggdGhlIHJlcXVpcmVtZW50IG9mIHRoZSB1bmlvblxyXG4gICAgICAgICAgICAgIC8vIHR5cGUuXHJcblxyXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdfHJlYWRvbmx5IGJpZ2ludFtdXCIgaGVyZS5cclxuXHJcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSwgQmlnSW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBhc3N1bWUgJ2FyZzEnIGlzIG9mIHR5cGUgXCJyZWFkb25seSBudW1iZXJbXVwiIGhlcmUuXHJcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICBkYXRhID0gKHR5cGVkQXJyYXlDb25zdHJ1Y3RvciBhcyBhbnkpLmZyb20oYXJnMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMSBpbnN0YW5jZW9mIHR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICBkYXRhID0gYXJnMTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmIChhcmcwID09PSAndWludDgnKSB7XHJcbiAgICAgICAgICAgICAgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShhcmcxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBIFVpbnQ4Q2xhbXBlZEFycmF5IHRlbnNvcidzIGRhdGEgbXVzdCBiZSB0eXBlIG9mIHVpbnQ4YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMCA9PT0gJ2Zsb2F0MTYnICYmIGFyZzEgaW5zdGFuY2VvZiBVaW50MTZBcnJheSAmJiB0eXBlZEFycmF5Q29uc3RydWN0b3IgIT09IFVpbnQxNkFycmF5KSB7XHJcbiAgICAgICAgICAgIC8vIHdoZW4gRmxvYXQxNkFycmF5IGlzIGF2YWlsYWJsZSBhbmQgZGF0YSBpcyBvZiB0eXBlIFVpbnQxNkFycmF5LlxyXG4gICAgICAgICAgICAvLyBXZSBhbGxvdyBVaW50MTZBcnJheSB0byBiZSBwYXNzZWQgaW4gYXMgZGF0YSBmb3IgJ2Zsb2F0MTYnIHRlbnNvciB1bnRpbCBGbG9hdDE2QXJyYXkgaXMgZ2VuZXJhbGx5XHJcbiAgICAgICAgICAgIC8vIHN1cHBvcnRlZCBpbiBKYXZhU2NyaXB0IGVudmlyb25tZW50LlxyXG5cclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgZGF0YSA9IG5ldyAoZ2xvYmFsVGhpcyBhcyBhbnkpLkZsb2F0MTZBcnJheShhcmcxLmJ1ZmZlciwgYXJnMS5ieXRlT2Zmc2V0LCBhcmcxLmxlbmd0aCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBBICR7dHlwZX0gdGVuc29yJ3MgZGF0YSBtdXN0IGJlIHR5cGUgb2YgJHt0eXBlZEFycmF5Q29uc3RydWN0b3J9YCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gT3ZlcnJpZGU6IGNvbnN0cnVjdG9yKGRhdGEsIC4uLilcclxuICAgICAgICAvL1xyXG4gICAgICAgIG1heWJlRGltcyA9IGFyZzE7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMCkpIHtcclxuICAgICAgICAgIC8vIG9ubHkgYm9vbGVhbltdIGFuZCBzdHJpbmdbXSBpcyBzdXBwb3J0ZWRcclxuICAgICAgICAgIGlmIChhcmcwLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUZW5zb3IgdHlwZSBjYW5ub3QgYmUgaW5mZXJyZWQgZnJvbSBhbiBlbXB0eSBhcnJheS4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGZpcnN0RWxlbWVudFR5cGUgPSB0eXBlb2YgYXJnMFswXTtcclxuICAgICAgICAgIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0eXBlID0gJ3N0cmluZyc7XHJcbiAgICAgICAgICAgIGRhdGEgPSBhcmcwO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdEVsZW1lbnRUeXBlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgdHlwZSA9ICdib29sJztcclxuICAgICAgICAgICAgLy8gJ2FyZzAnIGlzIG9mIHR5cGUgJ2Jvb2xlYW5bXScuIFVpbnQ4QXJyYXkuZnJvbShib29sZWFuW10pIGFjdHVhbGx5IHdvcmtzLCBidXQgdHlwZXNjcmlwdCB0aGlua3MgdGhpcyBpc1xyXG4gICAgICAgICAgICAvLyB3cm9uZyB0eXBlLiBXZSB1c2UgJ2FzIGFueScgdG8gbWFrZSBpdCBoYXBweS5cclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShhcmcwIGFzIGFueVtdKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgZWxlbWVudCB0eXBlIG9mIGRhdGEgYXJyYXk6ICR7Zmlyc3RFbGVtZW50VHlwZX0uYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcclxuICAgICAgICAgIHR5cGUgPSAndWludDgnO1xyXG4gICAgICAgICAgZGF0YSA9IFVpbnQ4QXJyYXkuZnJvbShhcmcwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gZ2V0IHRlbnNvciB0eXBlIGZyb20gVHlwZWRBcnJheVxyXG4gICAgICAgICAgY29uc3QgbWFwcGVkVHlwZSA9IE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuZ2V0KFxyXG4gICAgICAgICAgICBhcmcwLmNvbnN0cnVjdG9yIGFzIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKG1hcHBlZFR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBVbnN1cHBvcnRlZCB0eXBlIGZvciB0ZW5zb3IgZGF0YTogJHthcmcwLmNvbnN0cnVjdG9yfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHR5cGUgPSBtYXBwZWRUeXBlO1xyXG4gICAgICAgICAgZGF0YSA9IGFyZzAgYXMgU3VwcG9ydGVkVHlwZWRBcnJheTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHR5cGUgYW5kIGRhdGEgaXMgcHJvY2Vzc2VkLCBub3cgcHJvY2Vzc2luZyBkaW1zXHJcbiAgICAgIGlmIChtYXliZURpbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIGFzc3VtZSAxLUQgdGVuc29yIGlmIGRpbXMgb21pdHRlZFxyXG4gICAgICAgIG1heWJlRGltcyA9IFtkYXRhLmxlbmd0aF07XHJcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWF5YmVEaW1zKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBIHRlbnNvcidzIGRpbXMgbXVzdCBiZSBhIG51bWJlciBhcnJheVwiKTtcclxuICAgICAgfVxyXG4gICAgICBkaW1zID0gbWF5YmVEaW1zIGFzIHJlYWRvbmx5IG51bWJlcltdO1xyXG5cclxuICAgICAgdGhpcy5jcHVEYXRhID0gZGF0YTtcclxuICAgICAgdGhpcy5kYXRhTG9jYXRpb24gPSAnY3B1JztcclxuICAgIH1cclxuXHJcbiAgICAvLyBwZXJmb3JtIGNoZWNrIG9uIGRpbXNcclxuICAgIGNvbnN0IHNpemUgPSBjYWxjdWxhdGVTaXplKGRpbXMpO1xyXG4gICAgLy8gaWYgZGF0YSBpcyBvbiBDUFUsIGNoZWNrIHdoZXRoZXIgZGF0YSBsZW5ndGggbWF0Y2hlcyB0ZW5zb3Igc2l6ZVxyXG4gICAgaWYgKHRoaXMuY3B1RGF0YSAmJiBzaXplICE9PSB0aGlzLmNwdURhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGlmICgodHlwZSA9PT0gJ3VpbnQ0JyB8fCB0eXBlID09PSAnaW50NCcpICYmIE1hdGguY2VpbChzaXplIC8gMikgPT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAvLyBmb3IgKHUpaW50NCwgdGhlIGRhdGEgbGVuZ3RoIGlzIGhhbGYgb2YgdGhlIHRlbnNvciBzaXplLiBTbyB3ZSBjaGVjayB0aGlzIHNwZWNpYWwgY2FzZSB3aGVuIHNpemUgaXMgb2RkLlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yJ3Mgc2l6ZSgke3NpemV9KSBkb2VzIG5vdCBtYXRjaCBkYXRhIGxlbmd0aCgke3RoaXMuY3B1RGF0YS5sZW5ndGh9KS5gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmRpbXMgPSBkaW1zO1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuICB9XHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIGZhY3RvcnlcclxuICBzdGF0aWMgYXN5bmMgZnJvbUltYWdlKFxyXG4gICAgaW1hZ2U6IEltYWdlRGF0YSB8IEhUTUxJbWFnZUVsZW1lbnQgfCBJbWFnZUJpdG1hcCB8IHN0cmluZyxcclxuICAgIG9wdGlvbnM/OlxyXG4gICAgICB8IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zXHJcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRWxlbWVudE9wdGlvbnNcclxuICAgICAgfCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXHJcbiAgICAgIHwgVGVuc29yRnJvbVVybE9wdGlvbnMsXHJcbiAgKTogUHJvbWlzZTxUZW5zb3JJbnRlcmZhY2U+IHtcclxuICAgIHJldHVybiB0ZW5zb3JGcm9tSW1hZ2UoaW1hZ2UsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21UZXh0dXJlPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZURhdGFUeXBlcz4oXHJcbiAgICB0ZXh0dXJlOiBUZW5zb3JUZXh0dXJlVHlwZSxcclxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcclxuICApOiBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gICAgcmV0dXJuIHRlbnNvckZyb21UZXh0dXJlKHRleHR1cmUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21HcHVCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJEYXRhVHlwZXM+KFxyXG4gICAgZ3B1QnVmZmVyOiBUZW5zb3JHcHVCdWZmZXJUeXBlLFxyXG4gICAgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4sXHJcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcclxuICAgIHJldHVybiB0ZW5zb3JGcm9tR3B1QnVmZmVyKGdwdUJ1ZmZlciwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbU1MVGVuc29yPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuTUxUZW5zb3JEYXRhVHlwZXM+KFxyXG4gICAgbWxUZW5zb3I6IFRlbnNvck1MVGVuc29yVHlwZSxcclxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnM8VD4sXHJcbiAgKTogVGVuc29ySW50ZXJmYWNlIHtcclxuICAgIHJldHVybiB0ZW5zb3JGcm9tTUxUZW5zb3IobWxUZW5zb3IsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5DcHVQaW5uZWREYXRhVHlwZXM+KFxyXG4gICAgdHlwZTogVCxcclxuICAgIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLFxyXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxyXG4gICk6IFRlbnNvciB7XHJcbiAgICByZXR1cm4gdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcih0eXBlLCBidWZmZXIsIGRpbXMpO1xyXG4gIH1cclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIGNvbnZlcnNpb25zXHJcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0ZW5zb3JUb0RhdGFVUkwodGhpcywgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICB0b0ltYWdlRGF0YShvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhIHtcclxuICAgIHJldHVybiB0ZW5zb3JUb0ltYWdlRGF0YSh0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHB1YmxpYyBmaWVsZHNcclxuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcclxuICByZWFkb25seSB0eXBlOiBUZW5zb3JUeXBlO1xyXG4gIHJlYWRvbmx5IHNpemU6IG51bWJlcjtcclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gcHJpdmF0ZSBmaWVsZHNcclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cclxuICAgKi9cclxuICBwcml2YXRlIGRhdGFMb2NhdGlvbjogVGVuc29yRGF0YUxvY2F0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBzdG9yZXMgdGhlIGRhdGEgb24gQ1BVLCBpZiBsb2NhdGlvbiBpcyAnY3B1JyBvciAnY3B1LXBpbm5lZCcuIG90aGVyd2lzZSBlbXB0eS5cclxuICAgKi9cclxuICBwcml2YXRlIGNwdURhdGE/OiBUZW5zb3JEYXRhVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIHRleHR1cmUgd2hlbiBsb2NhdGlvbiBpcyAndGV4dHVyZScuIG90aGVyd2lzZSBlbXB0eS5cclxuICAgKi9cclxuICBwcml2YXRlIGdwdVRleHR1cmVEYXRhPzogVGVuc29yVGV4dHVyZVR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgdW5kZXJseWluZyBHUFUgYnVmZmVyIHdoZW4gbG9jYXRpb24gaXMgJ2dwdS1idWZmZXInLiBvdGhlcndpc2UgZW1wdHkuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBncHVCdWZmZXJEYXRhPzogVGVuc29yR3B1QnVmZmVyVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIFdlYk5OIE1MVGVuc29yIHdoZW4gbG9jYXRpb24gaXMgJ21sLXRlbnNvcicuIG90aGVyd2lzZSBlbXB0eS5cclxuICAgKi9cclxuICBwcml2YXRlIG1sVGVuc29yRGF0YT86IFRlbnNvck1MVGVuc29yVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIGFuIG9wdGlvbmFsIGRvd25sb2FkZXIgZnVuY3Rpb24gdG8gZG93bmxvYWQgZGF0YSBmcm9tIEdQVSB0byBDUFUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkb3dubG9hZGVyPygpOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGUgZGF0YSBpcyBiZWluZyBkb3dubG9hZGVkIGZyb20gR1BVIHRvIENQVS5cclxuICAgKi9cclxuICBwcml2YXRlIGlzRG93bmxvYWRpbmc/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZGlzcG9zZXIgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdW5kZXJseWluZyBkYXRhLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGlzcG9zZXI/KCk6IHZvaWQ7XHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHByb3BlcnRpZXNcclxuICBnZXQgZGF0YSgpOiBUZW5zb3JEYXRhVHlwZSB7XHJcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XHJcbiAgICBpZiAoIXRoaXMuY3B1RGF0YSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgJ1RoZSBkYXRhIGlzIG5vdCBvbiBDUFUuIFVzZSBgZ2V0RGF0YSgpYCB0byBkb3dubG9hZCBHUFUgZGF0YSB0byBDUFUsICcgK1xyXG4gICAgICAgICAgJ29yIHVzZSBgdGV4dHVyZWAgb3IgYGdwdUJ1ZmZlcmAgcHJvcGVydHkgdG8gYWNjZXNzIHRoZSBHUFUgZGF0YSBkaXJlY3RseS4nLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3B1RGF0YTtcclxuICB9XHJcblxyXG4gIGdldCBsb2NhdGlvbigpOiBUZW5zb3JEYXRhTG9jYXRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YUxvY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRleHR1cmUoKTogVGVuc29yVGV4dHVyZVR5cGUge1xyXG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xyXG4gICAgaWYgKCF0aGlzLmdwdVRleHR1cmVEYXRhKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdMIHRleHR1cmUuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ncHVUZXh0dXJlRGF0YTtcclxuICB9XHJcblxyXG4gIGdldCBncHVCdWZmZXIoKTogVGVuc29yR3B1QnVmZmVyVHlwZSB7XHJcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XHJcbiAgICBpZiAoIXRoaXMuZ3B1QnVmZmVyRGF0YSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJHUFUgYnVmZmVyLicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZ3B1QnVmZmVyRGF0YTtcclxuICB9XHJcblxyXG4gIGdldCBtbFRlbnNvcigpOiBUZW5zb3JNTFRlbnNvclR5cGUge1xyXG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xyXG4gICAgaWYgKCF0aGlzLm1sVGVuc29yRGF0YSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBkYXRhIGlzIG5vdCBzdG9yZWQgYXMgYSBXZWJOTiBNTFRlbnNvci4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm1sVGVuc29yRGF0YTtcclxuICB9XHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIG1ldGhvZHNcclxuXHJcbiAgYXN5bmMgZ2V0RGF0YShyZWxlYXNlRGF0YT86IGJvb2xlYW4pOiBQcm9taXNlPFRlbnNvckRhdGFUeXBlPiB7XHJcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XHJcbiAgICBzd2l0Y2ggKHRoaXMuZGF0YUxvY2F0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2NwdSc6XHJcbiAgICAgIGNhc2UgJ2NwdS1waW5uZWQnOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICAgIGNhc2UgJ3RleHR1cmUnOlxyXG4gICAgICBjYXNlICdncHUtYnVmZmVyJzpcclxuICAgICAgY2FzZSAnbWwtdGVuc29yJzoge1xyXG4gICAgICAgIGlmICghdGhpcy5kb3dubG9hZGVyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBub3QgY3JlYXRlZCB3aXRoIGEgc3BlY2lmaWVkIGRhdGEgZG93bmxvYWRlci4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNEb3dubG9hZGluZykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY3VycmVudCB0ZW5zb3IgaXMgYmVpbmcgZG93bmxvYWRlZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5kb3dubG9hZGVyKCk7XHJcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xyXG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgICBpZiAocmVsZWFzZURhdGEgJiYgdGhpcy5kaXNwb3Nlcikge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGdldCBkYXRhIGZyb20gbG9jYXRpb246ICR7dGhpcy5kYXRhTG9jYXRpb259YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNEb3dubG9hZGluZykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBiZWluZyBkb3dubG9hZGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRpc3Bvc2VyKSB7XHJcbiAgICAgIHRoaXMuZGlzcG9zZXIoKTtcclxuICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHRoaXMuY3B1RGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ3B1VGV4dHVyZURhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmdwdUJ1ZmZlckRhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLm1sVGVuc29yRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuaXNEb3dubG9hZGluZyA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdub25lJztcclxuICB9XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiB0ZW5zb3IgdXRpbGl0aWVzXHJcbiAgcHJpdmF0ZSBlbnN1cmVWYWxpZCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRhdGFMb2NhdGlvbiA9PT0gJ25vbmUnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHRlbnNvciBpcyBkaXNwb3NlZC4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2hhcGUoZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gICAgdGhpcy5lbnN1cmVWYWxpZCgpO1xyXG4gICAgaWYgKHRoaXMuZG93bmxvYWRlciB8fCB0aGlzLmRpc3Bvc2VyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlc2hhcGUgYSB0ZW5zb3IgdGhhdCBvd25zIEdQVSByZXNvdXJjZS4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW5zb3JSZXNoYXBlKHRoaXMsIGRpbXMpO1xyXG4gIH1cclxuICAvLyAjZW5kcmVnaW9uXHJcbn1cclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBUZW5zb3JGYWN0b3J5IH0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XHJcbmltcG9ydCB7IFRlbnNvciBhcyBUZW5zb3JJbXBsIH0gZnJvbSAnLi90ZW5zb3ItaW1wbC5qcyc7XHJcbmltcG9ydCB7IFR5cGVkVGVuc29yVXRpbHMgfSBmcm9tICcuL3RlbnNvci11dGlscy5qcyc7XHJcbmltcG9ydCB7IFRyeUdldEdsb2JhbFR5cGUgfSBmcm9tICcuL3R5cGUtaGVscGVyLmpzJztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cclxuXHJcbi8qKlxyXG4gKiByZXByZXNlbnQgYSBiYXNpYyB0ZW5zb3Igd2l0aCBzcGVjaWZpZWQgZGltZW5zaW9ucyBhbmQgZGF0YSB0eXBlLlxyXG4gKi9cclxuaW50ZXJmYWNlIFR5cGVkVGVuc29yQmFzZTxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IHtcclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICByZWFkb25seSBkaW1zOiByZWFkb25seSBudW1iZXJbXTtcclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHR5cGU6IFQ7XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBidWZmZXIgZGF0YSBvZiB0aGUgdGVuc29yLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIENQVSAoZWcuIGl0J3MgaW4gdGhlIGZvcm0gb2YgV2ViR0wgdGV4dHVyZSBvciBXZWJHUFUgYnVmZmVyKSwgdGhyb3cgZXJyb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdO1xyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbG9jYXRpb246IFRlbnNvci5EYXRhTG9jYXRpb247XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHTCB0ZXh0dXJlLCB0aHJvdyBlcnJvci5cclxuICAgKi9cclxuICByZWFkb25seSB0ZXh0dXJlOiBUZW5zb3IuVGV4dHVyZVR5cGU7XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBXZWJHUFUgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IG9uIEdQVSBhcyBXZWJHUFUgYnVmZmVyLCB0aHJvdyBlcnJvci5cclxuICAgKi9cclxuICByZWFkb25seSBncHVCdWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIFdlYk5OIE1MVGVuc29yIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgbm90IGluIGEgV2ViTk4gTUxUZW5zb3IsIHRocm93IGVycm9yLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG1sVGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJldHVybnMgdGhlIGRhdGEgaW1tZWRpYXRlbHkuXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCBkb3dubG9hZHMgdGhlIGRhdGEgYW5kIHJldHVybnMgdGhlIHByb21pc2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcmVsZWFzZURhdGEgLSB3aGV0aGVyIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLiBJZ25vcmUgaWYgZGF0YSBpcyBhbHJlYWR5IG9uIENQVS5cclxuICAgKi9cclxuICBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcclxuXHJcbiAgLyoqXHJcbiAgICogRGlzcG9zZSB0aGUgdGVuc29yIGRhdGEuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBDUFUsIHJlbW92ZSBpdHMgaW50ZXJuYWwgcmVmZXJlbmNlIHRvIHRoZSB1bmRlcmx5aW5nIGRhdGEuXHJcbiAgICogSWYgdGhlIGRhdGEgaXMgb24gR1BVLCByZWxlYXNlIHRoZSBkYXRhIG9uIEdQVS5cclxuICAgKlxyXG4gICAqIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgdGhlIHRlbnNvciBpcyBjb25zaWRlcmVkIG5vIGxvbmdlciB2YWxpZC4gSXRzIGxvY2F0aW9uIHdpbGwgYmUgc2V0IHRvICdub25lJy5cclxuICAgKi9cclxuICBkaXNwb3NlKCk6IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBUZW5zb3Ige1xyXG4gIGludGVyZmFjZSBEYXRhVHlwZU1hcCB7XHJcbiAgICBmbG9hdDMyOiBGbG9hdDMyQXJyYXk7XHJcbiAgICB1aW50ODogVWludDhBcnJheTtcclxuICAgIGludDg6IEludDhBcnJheTtcclxuICAgIHVpbnQxNjogVWludDE2QXJyYXk7XHJcbiAgICBpbnQxNjogSW50MTZBcnJheTtcclxuICAgIGludDMyOiBJbnQzMkFycmF5O1xyXG4gICAgaW50NjQ6IEJpZ0ludDY0QXJyYXk7XHJcbiAgICBzdHJpbmc6IHN0cmluZ1tdO1xyXG4gICAgYm9vbDogVWludDhBcnJheTtcclxuICAgIGZsb2F0MTY6IFVpbnQxNkFycmF5OyAvLyBLZWVwIHVzaW5nIFVpbnQxNkFycmF5IHVudGlsIHdlIGhhdmUgYSBjb25jcmV0ZSBzb2x1dGlvbiBmb3IgZmxvYXQgMTYuXHJcbiAgICBmbG9hdDY0OiBGbG9hdDY0QXJyYXk7XHJcbiAgICB1aW50MzI6IFVpbnQzMkFycmF5O1xyXG4gICAgdWludDY0OiBCaWdVaW50NjRBcnJheTtcclxuICAgIC8vIGNvbXBsZXg2NDogbmV2ZXI7XHJcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcclxuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcclxuICAgIHVpbnQ0OiBVaW50OEFycmF5O1xyXG4gICAgaW50NDogSW50OEFycmF5O1xyXG4gIH1cclxuXHJcbiAgaW50ZXJmYWNlIEVsZW1lbnRUeXBlTWFwIHtcclxuICAgIGZsb2F0MzI6IG51bWJlcjtcclxuICAgIHVpbnQ4OiBudW1iZXI7XHJcbiAgICBpbnQ4OiBudW1iZXI7XHJcbiAgICB1aW50MTY6IG51bWJlcjtcclxuICAgIGludDE2OiBudW1iZXI7XHJcbiAgICBpbnQzMjogbnVtYmVyO1xyXG4gICAgaW50NjQ6IGJpZ2ludDtcclxuICAgIHN0cmluZzogc3RyaW5nO1xyXG4gICAgYm9vbDogYm9vbGVhbjtcclxuICAgIGZsb2F0MTY6IG51bWJlcjsgLy8gS2VlcCB1c2luZyBVaW50MTZBcnJheSB1bnRpbCB3ZSBoYXZlIGEgY29uY3JldGUgc29sdXRpb24gZm9yIGZsb2F0IDE2LlxyXG4gICAgZmxvYXQ2NDogbnVtYmVyO1xyXG4gICAgdWludDMyOiBudW1iZXI7XHJcbiAgICB1aW50NjQ6IGJpZ2ludDtcclxuICAgIC8vIGNvbXBsZXg2NDogbmV2ZXI7XHJcbiAgICAvLyBjb21wbGV4MTI4OiBuZXZlcjtcclxuICAgIC8vIGJmbG9hdDE2OiBuZXZlcjtcclxuICAgIHVpbnQ0OiBudW1iZXI7XHJcbiAgICBpbnQ0OiBudW1iZXI7XHJcbiAgfVxyXG5cclxuICB0eXBlIERhdGFUeXBlID0gRGF0YVR5cGVNYXBbVHlwZV07XHJcbiAgdHlwZSBFbGVtZW50VHlwZSA9IEVsZW1lbnRUeXBlTWFwW1R5cGVdO1xyXG5cclxuICAvKipcclxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBwaW5uZWQgQ1BVIGJ1ZmZlclxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIENwdVBpbm5lZERhdGFUeXBlcyA9IEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR0wgdGV4dHVyZVxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIFRleHR1cmVUeXBlID0gV2ViR0xUZXh0dXJlO1xyXG5cclxuICAvKipcclxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgVGV4dHVyZURhdGFUeXBlcyA9ICdmbG9hdDMyJztcclxuXHJcbiAgdHlwZSBHcHVCdWZmZXJUeXBlRmFsbGJhY2sgPSB7IHNpemU6IG51bWJlcjsgbWFwU3RhdGU6ICd1bm1hcHBlZCcgfCAncGVuZGluZycgfCAnbWFwcGVkJyB9O1xyXG4gIC8qKlxyXG4gICAqIHR5cGUgYWxpYXMgZm9yIFdlYkdQVSBidWZmZXJcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJUeXBlID0gVHJ5R2V0R2xvYmFsVHlwZTwnR1BVQnVmZmVyJywgR3B1QnVmZmVyVHlwZUZhbGxiYWNrPjtcclxuXHJcbiAgdHlwZSBNTFRlbnNvclR5cGVGYWxsYmFjayA9IHsgZGVzdHJveSgpOiB2b2lkIH07XHJcbiAgLyoqXHJcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViTk4gTUxUZW5zb3JcclxuICAgKlxyXG4gICAqIFRoZSBzcGVjaWZpY2F0aW9uIGZvciBXZWJOTidzIE1MVGVuc29yIGlzIGN1cnJlbnRseSBpbiBmbHV4LlxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIE1MVGVuc29yVHlwZSA9IFRyeUdldEdsb2JhbFR5cGU8J01MVGVuc29yJywgTUxUZW5zb3JUeXBlRmFsbGJhY2s+O1xyXG5cclxuICAvKipcclxuICAgKiBzdXBwb3J0ZWQgZGF0YSB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHUFUgYnVmZmVyXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgR3B1QnVmZmVyRGF0YVR5cGVzID0gJ2Zsb2F0MzInIHwgJ2Zsb2F0MTYnIHwgJ2ludDMyJyB8ICdpbnQ2NCcgfCAndWludDMyJyB8ICd1aW50OCcgfCAnYm9vbCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYk5OIE1MVGVuc29yXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgTUxUZW5zb3JEYXRhVHlwZXMgPVxyXG4gICAgfCAnZmxvYXQzMidcclxuICAgIHwgJ2Zsb2F0MTYnXHJcbiAgICB8ICdpbnQ4J1xyXG4gICAgfCAndWludDgnXHJcbiAgICB8ICdpbnQzMidcclxuICAgIHwgJ3VpbnQzMidcclxuICAgIHwgJ2ludDY0J1xyXG4gICAgfCAndWludDY0J1xyXG4gICAgfCAnYm9vbCdcclxuICAgIHwgJ3VpbnQ0J1xyXG4gICAgfCAnaW50NCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJlcHJlc2VudCB3aGVyZSB0aGUgdGVuc29yIGRhdGEgaXMgc3RvcmVkXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgRGF0YUxvY2F0aW9uID0gJ25vbmUnIHwgJ2NwdScgfCAnY3B1LXBpbm5lZCcgfCAndGV4dHVyZScgfCAnZ3B1LWJ1ZmZlcicgfCAnbWwtdGVuc29yJztcclxuXHJcbiAgLyoqXHJcbiAgICogcmVwcmVzZW50IHRoZSBkYXRhIHR5cGUgb2YgYSB0ZW5zb3JcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBUeXBlID0ga2V5b2YgRGF0YVR5cGVNYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZWRUZW5zb3I8VCBleHRlbmRzIFRlbnNvci5UeXBlPiBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUPiwgVHlwZWRUZW5zb3JVdGlsczxUPiB7fVxyXG4vKipcclxuICogUmVwcmVzZW50IG11bHRpLWRpbWVuc2lvbmFsIGFycmF5cyB0byBmZWVkIHRvIG9yIGZldGNoIGZyb20gbW9kZWwgaW5mZXJlbmNpbmcuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvciBleHRlbmRzIFR5cGVkVGVuc29yQmFzZTxUZW5zb3IuVHlwZT4sIFR5cGVkVGVuc29yVXRpbHM8VGVuc29yLlR5cGU+IHt9XHJcblxyXG4vKipcclxuICogdHlwZSBUZW5zb3JDb25zdHJ1Y3RvciBkZWZpbmVzIHRoZSBjb25zdHJ1Y3RvcnMgb2YgJ1RlbnNvcicgdG8gY3JlYXRlIENQVSB0ZW5zb3IgaW5zdGFuY2VzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JDb25zdHJ1Y3RvciBleHRlbmRzIFRlbnNvckZhY3Rvcnkge1xyXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIHNwZWNpZnkgZWxlbWVudCB0eXBlXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHN0cmluZyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKFxyXG4gICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ3N0cmluZyddIHwgcmVhZG9ubHkgc3RyaW5nW10sXHJcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKTogVHlwZWRUZW5zb3I8J3N0cmluZyc+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYm9vbCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKFxyXG4gICAgdHlwZTogJ2Jvb2wnLFxyXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwWydib29sJ10gfCByZWFkb25seSBib29sZWFuW10sXHJcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSBhIFVpbnQ4Q2xhbXBlZEFycmF5LCBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3ICh0eXBlOiAndWludDgnLCBkYXRhOiBVaW50OENsYW1wZWRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyA2NC1iaXQgaW50ZWdlciB0eXBlZCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIHR5cGUsIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgPFQgZXh0ZW5kcyAndWludDY0JyB8ICdpbnQ2NCc+KFxyXG4gICAgdHlwZTogVCxcclxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXSB8IHJlYWRvbmx5IGJpZ2ludFtdIHwgcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKTogVHlwZWRUZW5zb3I8VD47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBudW1lcmljIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyA8VCBleHRlbmRzIEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnIHwgJ2Jvb2wnIHwgJ3VpbnQ2NCcgfCAnaW50NjQnPj4oXHJcbiAgICB0eXBlOiBULFxyXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKTogVHlwZWRUZW5zb3I8VD47XHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBpbmZlciBlbGVtZW50IHR5cGVzXHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBmbG9hdDMyIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogRmxvYXQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnZmxvYXQzMic+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50OCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IEludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDgnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogVWludDhBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ4Jz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50OCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IFVpbnQxNkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDE2Jz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQxNiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IEludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQxNic+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiBJbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50MzInPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogQmlnSW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDY0Jz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBzdHJpbmcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiByZWFkb25seSBzdHJpbmdbXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3N0cmluZyc+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgYm9vbCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IHJlYWRvbmx5IGJvb2xlYW5bXSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Jvb2wnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiBGbG9hdDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDY0Jz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiBVaW50MzJBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQzMic+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDY0IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogQmlnVWludDY0QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50NjQnPjtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIENQVSB0ZW5zb3IgLSBmYWxsIGJhY2sgdG8gbm9uLWdlbmVyaWMgdGVuc29yIHR5cGUgZGVjbGFyYXRpb25cclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoXHJcbiAgICB0eXBlOiBUZW5zb3IuVHlwZSxcclxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgc3RyaW5nW10gfCByZWFkb25seSBiaWdpbnRbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApOiBUZW5zb3I7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IFRlbnNvci5EYXRhVHlwZSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVGVuc29yO1xyXG4gIC8vICNlbmRyZWdpb25cclxufVxyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG5leHBvcnQgY29uc3QgVGVuc29yID0gVGVuc29ySW1wbCBhcyBUZW5zb3JDb25zdHJ1Y3RvcjtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBlbnYgfSBmcm9tICcuL2Vudi1pbXBsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVFJBQ0UgPSAoZGV2aWNlVHlwZTogc3RyaW5nLCBsYWJlbDogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gIGNvbnNvbGUudGltZVN0YW1wKGAke2RldmljZVR5cGV9OjpPUlQ6OiR7bGFiZWx9YCk7XHJcbn07XHJcblxyXG5jb25zdCBUUkFDRV9GVU5DID0gKG1zZzogc3RyaW5nLCBleHRyYU1zZz86IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s/LnNwbGl0KC9cXHJcXG58XFxyfFxcbi9nKSB8fCBbXTtcclxuICBsZXQgaGFzVHJhY2VGdW5jID0gZmFsc2U7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGhhc1RyYWNlRnVuYyAmJiAhc3RhY2tbaV0uaW5jbHVkZXMoJ1RSQUNFX0ZVTkMnKSkge1xyXG4gICAgICBsZXQgbGFiZWwgPSBgRlVOQ18ke21zZ306OiR7c3RhY2tbaV0udHJpbSgpLnNwbGl0KCcgJylbMV19YDtcclxuICAgICAgaWYgKGV4dHJhTXNnKSB7XHJcbiAgICAgICAgbGFiZWwgKz0gYDo6JHtleHRyYU1zZ31gO1xyXG4gICAgICB9XHJcbiAgICAgIFRSQUNFKCdDUFUnLCBsYWJlbCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XHJcbiAgICAgIGhhc1RyYWNlRnVuYyA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0JFR0lOID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBUUkFDRV9GVU5DKCdCRUdJTicsIGV4dHJhTXNnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVFJBQ0VfRlVOQ19FTkQgPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcclxuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIFRSQUNFX0ZVTkMoJ0VORCcsIGV4dHJhTXNnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVFJBQ0VfRVZFTlRfQkVHSU4gPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcclxuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgY29uc29sZS50aW1lKGBPUlQ6OiR7ZXh0cmFNc2d9YCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRSQUNFX0VWRU5UX0VORCA9IChleHRyYU1zZz86IHN0cmluZykgPT4ge1xyXG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICBjb25zb2xlLnRpbWVFbmQoYE9SVDo6JHtleHRyYU1zZ31gKTtcclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyB9IGZyb20gJy4vYmFja2VuZC1pbXBsLmpzJztcclxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgfSBmcm9tICcuL2JhY2tlbmQuanMnO1xyXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UgfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcclxuaW1wb3J0IHsgT25ueFZhbHVlIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcclxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5pbXBvcnQgeyBUUkFDRV9GVU5DX0JFR0lOLCBUUkFDRV9GVU5DX0VORCwgVFJBQ0VfRVZFTlRfQkVHSU4sIFRSQUNFX0VWRU5UX0VORCB9IGZyb20gJy4vdHJhY2UuanMnO1xyXG5cclxudHlwZSBTZXNzaW9uT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuU2Vzc2lvbk9wdGlvbnM7XHJcbnR5cGUgUnVuT3B0aW9ucyA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUnVuT3B0aW9ucztcclxudHlwZSBGZWVkc1R5cGUgPSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLkZlZWRzVHlwZTtcclxudHlwZSBGZXRjaGVzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmV0Y2hlc1R5cGU7XHJcbnR5cGUgUmV0dXJuVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuUmV0dXJuVHlwZTtcclxuXHJcbmV4cG9ydCBjbGFzcyBJbmZlcmVuY2VTZXNzaW9uIGltcGxlbWVudHMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZSB7XHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihoYW5kbGVyOiBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcikge1xyXG4gICAgdGhpcy5oYW5kbGVyID0gaGFuZGxlcjtcclxuICB9XHJcbiAgcnVuKGZlZWRzOiBGZWVkc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcclxuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgZmV0Y2hlczogRmV0Y2hlc1R5cGUsIG9wdGlvbnM/OiBSdW5PcHRpb25zKTogUHJvbWlzZTxSZXR1cm5UeXBlPjtcclxuICBhc3luYyBydW4oZmVlZHM6IEZlZWRzVHlwZSwgYXJnMT86IEZldGNoZXNUeXBlIHwgUnVuT3B0aW9ucywgYXJnMj86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+IHtcclxuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcclxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCdJbmZlcmVuY2VTZXNzaW9uLnJ1bicpO1xyXG4gICAgY29uc3QgZmV0Y2hlczogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIHwgbnVsbCB9ID0ge307XHJcbiAgICBsZXQgb3B0aW9uczogUnVuT3B0aW9ucyA9IHt9O1xyXG4gICAgLy8gY2hlY2sgaW5wdXRzXHJcbiAgICBpZiAodHlwZW9mIGZlZWRzICE9PSAnb2JqZWN0JyB8fCBmZWVkcyA9PT0gbnVsbCB8fCBmZWVkcyBpbnN0YW5jZW9mIFRlbnNvciB8fCBBcnJheS5pc0FycmF5KGZlZWRzKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgIFwiJ2ZlZWRzJyBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IHVzZSBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXCIsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGlzRmV0Y2hlc0VtcHR5ID0gdHJ1ZTtcclxuICAgIC8vIGRldGVybWluZSB3aGljaCBvdmVycmlkZSBpcyBiZWluZyB1c2VkXHJcbiAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmIChhcmcxID09PSBudWxsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5leHBlY3RlZCBhcmd1bWVudFsxXTogY2Fubm90IGJlIG51bGwuJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGFyZzEgaW5zdGFuY2VvZiBUZW5zb3IpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIGNhbm5vdCBiZSBhIFRlbnNvclwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnMSkpIHtcclxuICAgICAgICBpZiAoYXJnMS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGFuIGVtcHR5IGFycmF5LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAvLyBvdXRwdXQgbmFtZXNcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgYXJnMSkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2ZldGNoZXMnIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkgb3IgYW4gb2JqZWN0LlwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGAnZmV0Y2hlcycgY29udGFpbnMgaW52YWxpZCBvdXRwdXQgbmFtZTogJHtuYW1lfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICBvcHRpb25zID0gYXJnMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGRlY2lkZSB3aGV0aGVyIGFyZzEgaXMgZmV0Y2hlcyBvciBvcHRpb25zXHJcbiAgICAgICAgLy8gaWYgYW55IG91dHB1dCBuYW1lIGlzIHByZXNlbnQgYW5kIGl0cyB2YWx1ZSBpcyB2YWxpZCBPbm54VmFsdWUsIHdlIGNvbnNpZGVyIGl0IGZldGNoZXNcclxuICAgICAgICBsZXQgaXNGZXRjaGVzID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgYXJnMUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcmcxKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xyXG4gICAgICAgICAgaWYgKGFyZzFLZXlzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSAoYXJnMSBhcyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLk51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSlbbmFtZV07XHJcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsIHx8IHYgaW5zdGFuY2VvZiBUZW5zb3IpIHtcclxuICAgICAgICAgICAgICBpc0ZldGNoZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIGlzRmV0Y2hlc0VtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0ZldGNoZXMpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gJ29iamVjdCcgJiYgYXJnMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvcHRpb25zID0gYXJnMSBhcyBSdW5PcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgYXJndW1lbnRbMV06IG11c3QgYmUgJ2ZldGNoZXMnIG9yICdvcHRpb25zJy5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgYWxsIGlucHV0cyBhcmUgaW4gZmVlZFxyXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIHRoaXMuaW5wdXROYW1lcykge1xyXG4gICAgICBpZiAodHlwZW9mIGZlZWRzW25hbWVdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW5wdXQgJyR7bmFtZX0nIGlzIG1pc3NpbmcgaW4gJ2ZlZWRzJy5gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIG5vIGZldGNoZXMgaXMgc3BlY2lmaWVkLCB3ZSB1c2UgdGhlIGZ1bGwgb3V0cHV0IG5hbWVzIGxpc3RcclxuICAgIGlmIChpc0ZldGNoZXNFbXB0eSkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5vdXRwdXROYW1lcykge1xyXG4gICAgICAgIGZldGNoZXNbbmFtZV0gPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMgYXJlIHByZXBhcmVkXHJcblxyXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHRoaXMuaGFuZGxlci5ydW4oZmVlZHMsIGZldGNoZXMsIG9wdGlvbnMpO1xyXG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB9ID0ge307XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiByZXN1bHRzKSB7XHJcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHRzLCBrZXkpKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1trZXldO1xyXG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBUZW5zb3IpIHtcclxuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSByZXN1bHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVyblZhbHVlW2tleV0gPSBuZXcgVGVuc29yKHJlc3VsdC50eXBlLCByZXN1bHQuZGF0YSwgcmVzdWx0LmRpbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgVFJBQ0VfRVZFTlRfRU5EKCdJbmZlcmVuY2VTZXNzaW9uLnJ1bicpO1xyXG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcclxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmRpc3Bvc2UoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjcmVhdGUocGF0aDogc3RyaW5nLCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xyXG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XHJcbiAgc3RhdGljIGNyZWF0ZShcclxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLFxyXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyLFxyXG4gICAgYnl0ZUxlbmd0aD86IG51bWJlcixcclxuICAgIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyxcclxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xyXG4gIHN0YXRpYyBjcmVhdGUoYnVmZmVyOiBVaW50OEFycmF5LCBvcHRpb25zPzogU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+O1xyXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUoXHJcbiAgICBhcmcwOiBzdHJpbmcgfCBBcnJheUJ1ZmZlckxpa2UgfCBVaW50OEFycmF5LFxyXG4gICAgYXJnMT86IFNlc3Npb25PcHRpb25zIHwgbnVtYmVyLFxyXG4gICAgYXJnMj86IG51bWJlcixcclxuICAgIGFyZzM/OiBTZXNzaW9uT3B0aW9ucyxcclxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2U+IHtcclxuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcclxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCdJbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZScpO1xyXG4gICAgLy8gZWl0aGVyIGxvYWQgZnJvbSBhIGZpbGUgb3IgYnVmZmVyXHJcbiAgICBsZXQgZmlsZVBhdGhPclVpbnQ4QXJyYXk6IHN0cmluZyB8IFVpbnQ4QXJyYXk7XHJcbiAgICBsZXQgb3B0aW9uczogU2Vzc2lvbk9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGFyZzAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZpbGVQYXRoT3JVaW50OEFycmF5ID0gYXJnMDtcclxuICAgICAgaWYgKHR5cGVvZiBhcmcxID09PSAnb2JqZWN0JyAmJiBhcmcxICE9PSBudWxsKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IGFyZzE7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoYXJnMCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcclxuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBhcmcwO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcclxuICAgICAgICBvcHRpb25zID0gYXJnMTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgYXJnMCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8XHJcbiAgICAgICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGFyZzAgaW5zdGFuY2VvZiBTaGFyZWRBcnJheUJ1ZmZlcilcclxuICAgICkge1xyXG4gICAgICBjb25zdCBidWZmZXIgPSBhcmcwO1xyXG4gICAgICBsZXQgYnl0ZU9mZnNldCA9IDA7XHJcbiAgICAgIGxldCBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcclxuICAgICAgICBvcHRpb25zID0gYXJnMTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBieXRlT2Zmc2V0ID0gYXJnMTtcclxuICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVPZmZzZXQpKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidieXRlT2Zmc2V0JyBtdXN0IGJlIGFuIGludGVnZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYnl0ZU9mZnNldCA+PSBidWZmZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdieXRlT2Zmc2V0JyBpcyBvdXQgb2YgcmFuZ2UgWzAsICR7YnVmZmVyLmJ5dGVMZW5ndGh9KS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzAuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgYnl0ZUxlbmd0aCA9IGFyZzI7XHJcbiAgICAgICAgICBpZiAoIU51bWJlci5pc1NhZmVJbnRlZ2VyKGJ5dGVMZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiJ2J5dGVMZW5ndGgnIG11c3QgYmUgYW4gaW50ZWdlci5cIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoYnl0ZUxlbmd0aCA8PSAwIHx8IGJ5dGVPZmZzZXQgKyBieXRlTGVuZ3RoID4gYnVmZmVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdieXRlTGVuZ3RoJyBpcyBvdXQgb2YgcmFuZ2UgKDAsICR7YnVmZmVyLmJ5dGVMZW5ndGggLSBieXRlT2Zmc2V0fV0uYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZzMgPT09ICdvYmplY3QnICYmIGFyZzMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IGFyZzM7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmczICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidieXRlTGVuZ3RoJyBtdXN0IGJlIGEgbnVtYmVyLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzEgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XHJcbiAgICAgIH1cclxuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuZXhwZWN0ZWQgYXJndW1lbnRbMF06IG11c3QgYmUgJ3BhdGgnIG9yICdidWZmZXInLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXNvbHZlIGJhY2tlbmQsIHVwZGF0ZSBzZXNzaW9uIG9wdGlvbnMgd2l0aCB2YWxpZGF0ZWQgRVBzLCBhbmQgY3JlYXRlIHNlc3Npb24gaGFuZGxlclxyXG4gICAgY29uc3QgW2JhY2tlbmQsIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzXSA9IGF3YWl0IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzKG9wdGlvbnMpO1xyXG4gICAgY29uc3QgaGFuZGxlciA9IGF3YWl0IGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoZmlsZVBhdGhPclVpbnQ4QXJyYXksIG9wdGlvbnNXaXRoVmFsaWRhdGVkRVBzKTtcclxuICAgIFRSQUNFX0VWRU5UX0VORCgnSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUnKTtcclxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XHJcbiAgICByZXR1cm4gbmV3IEluZmVyZW5jZVNlc3Npb24oaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcclxuICAgIHRoaXMuaGFuZGxlci5zdGFydFByb2ZpbGluZygpO1xyXG4gIH1cclxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XHJcbiAgICB0aGlzLmhhbmRsZXIuZW5kUHJvZmlsaW5nKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaW5wdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmlucHV0TmFtZXM7XHJcbiAgfVxyXG4gIGdldCBvdXRwdXROYW1lcygpOiByZWFkb25seSBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLm91dHB1dE5hbWVzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlucHV0TWV0YWRhdGEoKTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5WYWx1ZU1ldGFkYXRhW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5pbnB1dE1ldGFkYXRhO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG91dHB1dE1ldGFkYXRhKCk6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuVmFsdWVNZXRhZGF0YVtdIHtcclxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TWV0YWRhdGE7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyO1xyXG59XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiBhcyBJbmZlcmVuY2VTZXNzaW9uSW1wbCB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24taW1wbC5qcyc7XHJcbmltcG9ydCB7IE9ubnhNb2RlbE9wdGlvbnMgfSBmcm9tICcuL29ubngtbW9kZWwuanMnO1xyXG5pbXBvcnQgeyBPbm54VmFsdWUsIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiB9IGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XHJcbmltcG9ydCB0eXBlIHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5pbXBvcnQgeyBUcnlHZXRHbG9iYWxUeXBlIH0gZnJvbSAnLi90eXBlLWhlbHBlci5qcyc7XHJcblxyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVkZWNsYXJlICovXHJcblxyXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XHJcbiAgLy8gI3JlZ2lvbiBpbnB1dC9vdXRwdXQgdHlwZXNcclxuXHJcbiAgdHlwZSBPbm54VmFsdWVNYXBUeXBlID0geyByZWFkb25seSBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH07XHJcbiAgdHlwZSBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmVlZHMgKG1vZGVsIGlucHV0cykgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBpbnB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcbiAgICovXHJcbiAgdHlwZSBGZWVkc1R5cGUgPSBPbm54VmFsdWVNYXBUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBBIGZldGNoZXMgKG1vZGVsIG91dHB1dHMpIGNvdWxkIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxyXG4gICAqXHJcbiAgICogLSBPbWl0dGVkLiBVc2UgbW9kZWwncyBvdXRwdXQgbmFtZXMgZGVmaW5pdGlvbi5cclxuICAgKiAtIEFuIGFycmF5IG9mIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBvdXRwdXQgbmFtZXMuXHJcbiAgICogLSBBbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBvciBudWxsIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAqXHJcbiAgICogQHJlbWFya1xyXG4gICAqIGRpZmZlcmVudCBmcm9tIGlucHV0IGFyZ3VtZW50LCBpbiBvdXRwdXQsIE9ubnhWYWx1ZSBpcyBvcHRpb25hbC4gSWYgYW4gT25ueFZhbHVlIGlzIHByZXNlbnQgaXQgd2lsbCBiZVxyXG4gICAqIHVzZWQgYXMgYSBwcmUtYWxsb2NhdGVkIHZhbHVlIGJ5IHRoZSBpbmZlcmVuY2UgZW5naW5lOyBpZiBvbWl0dGVkLCBpbmZlcmVuY2UgZW5naW5lIHdpbGwgYWxsb2NhdGUgYnVmZmVyXHJcbiAgICogaW50ZXJuYWxseS5cclxuICAgKi9cclxuICB0eXBlIEZldGNoZXNUeXBlID0gcmVhZG9ubHkgc3RyaW5nW10gfCBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgaW5mZXJlbmNpbmcgcmV0dXJuIHR5cGUgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAqL1xyXG4gIHR5cGUgUmV0dXJuVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBzZXNzaW9uIG9wdGlvbnNcclxuXHJcbiAgLyoqXHJcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIHNlc3Npb24gYmVoYXZpb3IuXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyBleHRlbmRzIE9ubnhNb2RlbE9wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBvZiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBBbiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9uIGNhbiBiZSBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBuYW1lIG9mIHRoZSBleGVjdXRpb24gcHJvdmlkZXIsXHJcbiAgICAgKiBvciBhbiBvYmplY3Qgb2YgY29ycmVzcG9uZGluZyB0eXBlLlxyXG4gICAgICovXHJcbiAgICBleGVjdXRpb25Qcm92aWRlcnM/OiByZWFkb25seSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGludHJhIE9QIHRocmVhZHMgbnVtYmVyLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxyXG4gICAgICovXHJcbiAgICBpbnRyYU9wTnVtVGhyZWFkcz86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpbnRlciBPUCB0aHJlYWRzIG51bWJlci5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cclxuICAgICAqL1xyXG4gICAgaW50ZXJPcE51bVRocmVhZHM/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxyXG4gICAgICovXHJcbiAgICBmcmVlRGltZW5zaW9uT3ZlcnJpZGVzPzogeyByZWFkb25seSBbZGltZW5zaW9uTmFtZTogc3RyaW5nXTogbnVtYmVyIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbD86ICdkaXNhYmxlZCcgfCAnYmFzaWMnIHwgJ2V4dGVuZGVkJyB8ICdsYXlvdXQnIHwgJ2FsbCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBDUFUgbWVtb3J5IGFyZW5hLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxyXG4gICAgICovXHJcbiAgICBlbmFibGVNZW1QYXR0ZXJuPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGlvbiBtb2RlLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZXhlY3V0aW9uTW9kZT86ICdzZXF1ZW50aWFsJyB8ICdwYXJhbGxlbCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIElmIHRoaXMgc2V0dGluZyBpcyBzcGVjaWZpZWQsIHRoZSBvcHRpbWl6ZWQgbW9kZWwgd2lsbCBiZSBkdW1wZWQuIEluIGJyb3dzZXIsIGEgYmxvYiB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxyXG4gICAgICovXHJcbiAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBlbmFibGUgcHJvZmlsaW5nLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZVByb2ZpbGluZz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxlIHByZWZpeCBmb3IgcHJvZmlsaW5nLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXHJcbiAgICAgKi9cclxuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIElELlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgbG9nSWQ/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2cgc2V2ZXJpdHkgbGV2ZWwuIFNlZVxyXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXHJcbiAgICAgKi9cclxuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICovXHJcbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgc3RyaW5nIGFzIGEgcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gZm9yIGFsbCBvdXRwdXRzLCBvciBhbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIGFcclxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdMIGFuZCBXZWJHUFUgRVAuXHJcbiAgICAgKi9cclxuICAgIHByZWZlcnJlZE91dHB1dExvY2F0aW9uPzogT25ueFZhbHVlRGF0YUxvY2F0aW9uIHwgeyByZWFkb25seSBbb3V0cHV0TmFtZTogc3RyaW5nXTogT25ueFZhbHVlRGF0YUxvY2F0aW9uIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBncmFwaCBjYXB0dXJlLlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIFdlYiBmb3IgV2ViR1BVIEVQLlxyXG4gICAgICovXHJcbiAgICBlbmFibGVHcmFwaENhcHR1cmU/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmUgY29uZmlndXJhdGlvbnMgZm9yIGEgc2Vzc2lvbi4gU2VlXHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvc2Vzc2lvbi9cclxuICAgICAqIG9ubnhydW50aW1lX3Nlc3Npb25fb3B0aW9uc19jb25maWdfa2V5cy5oXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBgYGBqc1xyXG4gICAgICogZXh0cmE6IHtcclxuICAgICAqICAgc2Vzc2lvbjoge1xyXG4gICAgICogICAgIHNldF9kZW5vcm1hbF9hc196ZXJvOiBcIjFcIixcclxuICAgICAqICAgICBkaXNhYmxlX3ByZXBhY2tpbmc6IFwiMVwiXHJcbiAgICAgKiAgIH0sXHJcbiAgICAgKiAgIG9wdGltaXphdGlvbjoge1xyXG4gICAgICogICAgIGVuYWJsZV9nZWx1X2FwcHJveGltYXRpb246IFwiMVwiXHJcbiAgICAgKiAgIH1cclxuICAgICAqIH1cclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG4gIH1cclxuXHJcbiAgLy8gI3JlZ2lvbiBleGVjdXRpb24gcHJvdmlkZXJzXHJcblxyXG4gIC8vIEN1cnJlbnRseSwgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIGJhY2tlbmRzIHRvIHN1cHBvcnQgZXhlY3V0aW9uIHByb3ZpZGVyczpcclxuICAvLyBCYWNrZW5kIE5vZGUuanMgYmluZGluZzogc3VwcG9ydHMgJ2NwdScsICdkbWwnICh3aW4zMiksICdjb3JlbWwnIChtYWNPUykgYW5kICdjdWRhJyAobGludXgpLlxyXG4gIC8vIEJhY2tlbmQgV2ViQXNzZW1ibHk6IHN1cHBvcnRzICdjcHUnLCAnd2FzbScsICd3ZWJncHUnIGFuZCAnd2Vibm4nLlxyXG4gIC8vIEJhY2tlbmQgT05OWC5qczogc3VwcG9ydHMgJ3dlYmdsJy5cclxuICAvLyBCYWNrZW5kIFJlYWN0IE5hdGl2ZTogc3VwcG9ydHMgJ2NwdScsICd4bm5wYWNrJywgJ2NvcmVtbCcgKGlPUyksICdubmFwaScgKEFuZHJvaWQpLlxyXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XHJcbiAgICBjb3JlbWw6IENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgY3B1OiBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIGRtbDogRG1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICBubmFwaTogTm5hcGlFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgd2FzbTogV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHdlYmdsOiBXZWJHTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgd2ViZ3B1OiBXZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHdlYm5uOiBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgcW5uOiBRbm5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHhubnBhY2s6IFhubnBhY2tFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICB9XHJcblxyXG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJOYW1lID0ga2V5b2YgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXA7XHJcbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZyA9XHJcbiAgICB8IEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwW0V4ZWN1dGlvblByb3ZpZGVyTmFtZV1cclxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25cclxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJOYW1lXHJcbiAgICB8IHN0cmluZztcclxuXHJcbiAgZXhwb3J0IGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnY3B1JztcclxuICAgIHVzZUFyZW5hPzogYm9vbGVhbjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBDdWRhRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnY3VkYSc7XHJcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICdkbWwnO1xyXG4gICAgZGV2aWNlSWQ/OiBudW1iZXI7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgVGVuc29yUnRFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICd0ZW5zb3JydCc7XHJcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJBc3NlbWJseUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xyXG4gICAgLy8gVE9ETzogYWRkIGZsYWdzXHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3hubnBhY2snO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYmdwdSc7XHJcbiAgICBwcmVmZXJyZWRMYXlvdXQ/OiAnTkNIVycgfCAnTkhXQyc7XHJcbiAgfVxyXG5cclxuICAvLyAjcmVnaW9uIFdlYk5OIG9wdGlvbnNcclxuXHJcbiAgaW50ZXJmYWNlIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYm5uJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcHJlc2VudHMgYSBzZXQgb2Ygb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBXZWJOTiBNTENvbnRleHQuXHJcbiAgICpcclxuICAgKiBAc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi93ZWJubi8jZGljdGRlZi1tbGNvbnRleHRvcHRpb25zXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTkNvbnRleHRPcHRpb25zIHtcclxuICAgIGRldmljZVR5cGU/OiAnY3B1JyB8ICdncHUnIHwgJ25wdSc7XHJcbiAgICBudW1UaHJlYWRzPzogbnVtYmVyO1xyXG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2RlZmF1bHQnIHwgJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlciB3aXRob3V0IE1MQ29udGV4dC5cclxuICAgKi9cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dpdGhvdXRNTENvbnRleHQgZXh0ZW5kcyBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSwgV2ViTk5Db250ZXh0T3B0aW9ucyB7XHJcbiAgICBjb250ZXh0PzogbmV2ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlciB3aXRoIE1MQ29udGV4dC5cclxuICAgKlxyXG4gICAqIFdoZW4gTUxDb250ZXh0IGlzIHByb3ZpZGVkLCB0aGUgZGV2aWNlVHlwZSBpcyBhbHNvIHJlcXVpcmVkIHNvIHRoYXQgdGhlIFdlYk5OIEVQIGNhbiBkZXRlcm1pbmUgdGhlIHByZWZlcnJlZFxyXG4gICAqIGNoYW5uZWwgbGF5b3V0LlxyXG4gICAqXHJcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RvbS1tbC1jcmVhdGVjb250ZXh0XHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XHJcbiAgICBleHRlbmRzIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lLFxyXG4gICAgICBPbWl0PFdlYk5OQ29udGV4dE9wdGlvbnMsICdkZXZpY2VUeXBlJz4sXHJcbiAgICAgIFJlcXVpcmVkPFBpY2s8V2ViTk5Db250ZXh0T3B0aW9ucywgJ2RldmljZVR5cGUnPj4ge1xyXG4gICAgY29udGV4dDogVHJ5R2V0R2xvYmFsVHlwZTwnTUxDb250ZXh0Jz47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlciB3aXRoIE1MQ29udGV4dCB3aGljaCBpcyBjcmVhdGVkIGZyb20gR1BVRGV2aWNlLlxyXG4gICAqXHJcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RvbS1tbC1jcmVhdGVjb250ZXh0LWdwdWRldmljZVxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2ViR3B1IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUge1xyXG4gICAgY29udGV4dDogVHJ5R2V0R2xvYmFsVHlwZTwnTUxDb250ZXh0Jz47XHJcbiAgICBncHVEZXZpY2U6IFRyeUdldEdsb2JhbFR5cGU8J0dQVURldmljZSc+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3B0aW9ucyBmb3IgV2ViTk4gZXhlY3V0aW9uIHByb3ZpZGVyLlxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gPVxyXG4gICAgfCBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0XHJcbiAgICB8IFdlYk5OT3B0aW9uc1dpdGhNTENvbnRleHRcclxuICAgIHwgV2ViTk5PcHRpb25zV2ViR3B1O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgUW5uRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAncW5uJztcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB0aGUgUU5OIGJhY2tlbmQgdHlwZS4gRS5nLiwgJ2NwdScgb3IgJ2h0cCcuXHJcbiAgICAgKiBNdXR1YWxseSBleGNsdXNpdmUgd2l0aCBgYmFja2VuZFBhdGhgLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0ICdodHAnXHJcbiAgICAgKi9cclxuICAgIGJhY2tlbmRUeXBlPzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IGEgcGF0aCB0byB0aGUgUU5OIGJhY2tlbmQgbGlicmFyeS5cclxuICAgICAqIE11dHVhbGx5IGV4Y2x1c2l2ZSB3aXRoIGBiYWNrZW5kVHlwZWAuXHJcbiAgICAgKi9cclxuICAgIGJhY2tlbmRQYXRoPzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gZW5hYmxlIEhUUCBGUDE2IHByZWNpc2lvbi5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdCB0cnVlXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZUZwMTZQcmVjaXNpb24/OiBib29sZWFuO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ2NvcmVtbCc7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiaXQgZmxhZ3MgZm9yIENvcmVNTCBleGVjdXRpb24gcHJvdmlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogYGBgXHJcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX09OTFkgPSAweDAwMVxyXG4gICAgICogQ09SRU1MX0ZMQUdfRU5BQkxFX09OX1NVQkdSQVBIID0gMHgwMDJcclxuICAgICAqIENPUkVNTF9GTEFHX09OTFlfRU5BQkxFX0RFVklDRV9XSVRIX0FORSA9IDB4MDA0XHJcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0FMTE9XX1NUQVRJQ19JTlBVVF9TSEFQRVMgPSAweDAwOFxyXG4gICAgICogQ09SRU1MX0ZMQUdfQ1JFQVRFX01MUFJPR1JBTSA9IDB4MDEwXHJcbiAgICAgKiBDT1JFTUxfRkxBR19VU0VfQ1BVX0FORF9HUFUgPSAweDAyMFxyXG4gICAgICogYGBgXHJcbiAgICAgKlxyXG4gICAgICogU2VlIGluY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9wcm92aWRlcnMvY29yZW1sL2NvcmVtbF9wcm92aWRlcl9mYWN0b3J5LmggZm9yIG1vcmUgZGV0YWlscy5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIGZsYWcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZykuXHJcbiAgICAgKi9cclxuICAgIGNvcmVNbEZsYWdzPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHdoZXRoZXIgdG8gdXNlIENQVSBvbmx5IGluIENvcmVNTCBFUC5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKHJlYWN0LW5hdGl2ZSkuXHJcbiAgICAgKi9cclxuICAgIHVzZUNQVU9ubHk/OiBib29sZWFuO1xyXG4gICAgdXNlQ1BVQW5kR1BVPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIGVuYWJsZSBDb3JlTUwgRVAgb24gc3ViZ3JhcGguXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxyXG4gICAgICovXHJcbiAgICBlbmFibGVPblN1YmdyYXBoPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIG9ubHkgZW5hYmxlIENvcmVNTCBFUCBmb3IgQXBwbGUgZGV2aWNlcyB3aXRoIEFORSAoQXBwbGUgTmV1cmFsIEVuZ2luZSkuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxyXG4gICAgICovXHJcbiAgICBvbmx5RW5hYmxlRGV2aWNlV2l0aEFORT86IGJvb2xlYW47XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgTm5hcGlFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICdubmFwaSc7XHJcbiAgICB1c2VGUDE2PzogYm9vbGVhbjtcclxuICAgIHVzZU5DSFc/OiBib29sZWFuO1xyXG4gICAgY3B1RGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gICAgY3B1T25seT86IGJvb2xlYW47XHJcbiAgfVxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHJ1biBvcHRpb25zXHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2V0IG9mIGNvbmZpZ3VyYXRpb25zIGZvciBpbmZlcmVuY2UgcnVuIGJlaGF2aW9yXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBSdW5PcHRpb25zIHtcclxuICAgIC8qKlxyXG4gICAgICogTG9nIHNldmVyaXR5IGxldmVsLiBTZWVcclxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9jb21tb24vbG9nZ2luZy9zZXZlcml0eS5oXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxyXG4gICAgICovXHJcbiAgICBsb2dTZXZlcml0eUxldmVsPzogMCB8IDEgfCAyIHwgMyB8IDQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2cgdmVyYm9zaXR5IGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcclxuICAgICAqL1xyXG4gICAgbG9nVmVyYm9zaXR5TGV2ZWw/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXJtaW5hdGUgYWxsIGluY29tcGxldGUgT3J0UnVuIGNhbGxzIGFzIHNvb24gYXMgcG9zc2libGUgaWYgdHJ1ZVxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcclxuICAgICAqL1xyXG4gICAgdGVybWluYXRlPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgdGFnIGZvciB0aGUgUnVuKCkgY2FsbHMgdXNpbmcgdGhpc1xyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgdGFnPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IGEgc2luZ2xlIHJ1biBjb25maWd1cmF0aW9uIGVudHJ5LiBTZWVcclxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUvYmxvYi9tYWluL2luY2x1ZGUvb25ueHJ1bnRpbWUvY29yZS9zZXNzaW9uL1xyXG4gICAgICogb25ueHJ1bnRpbWVfcnVuX29wdGlvbnNfY29uZmlnX2tleXMuaFxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBXZWJBc3NlbWJseSBiYWNrZW5kLiBXaWxsIHN1cHBvcnQgTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUgbGF0ZXJcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqIGBgYGpzXHJcbiAgICAgKiBleHRyYToge1xyXG4gICAgICogICBtZW1vcnk6IHtcclxuICAgICAqICAgICBlbmFibGVfbWVtb3J5X2FyZW5hX3Nocmlua2FnZTogXCIxXCIsXHJcbiAgICAgKiAgIH1cclxuICAgICAqIH1cclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG4gIH1cclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHZhbHVlIG1ldGFkYXRhXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjb21tb24gcGFydCBvZiB0aGUgdmFsdWUgbWV0YWRhdGEgdHlwZSBmb3IgYm90aCB0ZW5zb3IgYW5kIG5vbi10ZW5zb3IgdmFsdWVzLlxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgVmFsdWVNZXRhZGF0YUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgc3BlY2lmaWVkIGlucHV0IG9yIG91dHB1dC5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyB0aGUgbWV0YWRhdGEgb2YgYSBub24tdGVuc29yIHZhbHVlLlxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgTm9uVGVuc29yVmFsdWVNZXRhZGF0YSBleHRlbmRzIFZhbHVlTWV0YWRhdGFCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBhIHRlbnNvci5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyB0aGUgbWV0YWRhdGEgb2YgYSB0ZW5zb3IgdmFsdWUuXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBUZW5zb3JWYWx1ZU1ldGFkYXRhIGV4dGVuZHMgVmFsdWVNZXRhZGF0YUJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGEgdGVuc29yLlxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBpc1RlbnNvcjogdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgdHlwZTogVGVuc29yLlR5cGU7XHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgc2hhcGUgb2YgdGhlIHRlbnNvci5cclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGUgc2hhcGUgaXMgbm90IGRlZmluZWQsIHRoZSB2YWx1ZSB3aWxsIGFuIGVtcHR5IGFycmF5LiBPdGhlcndpc2UsIGl0IHdpbGwgYmUgYW4gYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBzaGFwZVxyXG4gICAgICogb2YgdGhlIHRlbnNvci4gRWFjaCBlbGVtZW50IGluIHRoZSBhcnJheSBjYW4gYmUgYSBudW1iZXIgb3IgYSBzdHJpbmcuIElmIHRoZSBlbGVtZW50IGlzIGEgbnVtYmVyLCBpdCByZXByZXNlbnRzXHJcbiAgICAgKiB0aGUgY29ycmVzcG9uZGluZyBkaW1lbnNpb24gc2l6ZS4gSWYgdGhlIGVsZW1lbnQgaXMgYSBzdHJpbmcsIGl0IHJlcHJlc2VudHMgYSBzeW1ib2xpYyBkaW1lbnNpb24uXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHNoYXBlOiBSZWFkb25seUFycmF5PG51bWJlciB8IHN0cmluZz47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnRzIHRoZSBtZXRhZGF0YSBvZiBhIHZhbHVlLlxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIFZhbHVlTWV0YWRhdGEgPSBOb25UZW5zb3JWYWx1ZU1ldGFkYXRhIHwgVGVuc29yVmFsdWVNZXRhZGF0YTtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50IGEgcnVudGltZSBpbnN0YW5jZSBvZiBhbiBPTk5YIG1vZGVsLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcclxuICAvLyAjcmVnaW9uIHJ1bigpXHJcblxyXG4gIC8qKlxyXG4gICAqIEV4ZWN1dGUgdGhlIG1vZGVsIGFzeW5jaHJvbm91c2x5IHdpdGggdGhlIGdpdmVuIGZlZWRzIGFuZCBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGZlZWRzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIGlucHV0LiBTZWUgdHlwZSBkZXNjcmlwdGlvbiBvZiBgSW5mZXJlbmNlU2Vzc2lvbi5JbnB1dFR5cGVgIGZvciBkZXRhaWwuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbC4gQSBzZXQgb2Ygb3B0aW9ucyB0aGF0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBtb2RlbCBpbmZlcmVuY2UuXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBtYXAsIHdoaWNoIHVzZXMgb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cclxuICAgKi9cclxuICBydW4oZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcywgZmV0Y2hlcyBhbmQgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxyXG4gICAqIEBwYXJhbSBmZXRjaGVzIC0gUmVwcmVzZW50YXRpb24gb2YgdGhlIG1vZGVsIG91dHB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uT3V0cHV0VHlwZWAgZm9yXHJcbiAgICogZGV0YWlsLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcbiAgICovXHJcbiAgcnVuKFxyXG4gICAgZmVlZHM6IEluZmVyZW5jZVNlc3Npb24uRmVlZHNUeXBlLFxyXG4gICAgZmV0Y2hlczogSW5mZXJlbmNlU2Vzc2lvbi5GZXRjaGVzVHlwZSxcclxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXHJcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uLlJldHVyblR5cGU+O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gcmVsZWFzZSgpXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbGVhc2UgdGhlIGluZmVyZW5jZSBzZXNzaW9uIGFuZCB0aGUgdW5kZXJseWluZyByZXNvdXJjZXMuXHJcbiAgICovXHJcbiAgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gcHJvZmlsaW5nXHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHByb2ZpbGluZy5cclxuICAgKi9cclxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBFbmQgcHJvZmlsaW5nLlxyXG4gICAqL1xyXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gbWV0YWRhdGFcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGlucHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBvdXRwdXQgbmFtZXMgb2YgdGhlIGxvYWRlZCBtb2RlbC5cclxuICAgKi9cclxuICByZWFkb25seSBvdXRwdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBpbnB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGlucHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgb3V0cHV0IG1ldGFkYXRhIG9mIHRoZSBsb2FkZWQgbW9kZWwuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbkZhY3Rvcnkge1xyXG4gIC8vICNyZWdpb24gY3JlYXRlKClcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gT05OWCBtb2RlbCBmaWxlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVyaSAtIFRoZSBVUkkgb3IgZmlsZSBwYXRoIG9mIHRoZSBtb2RlbCB0byBsb2FkLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cclxuICAgKi9cclxuICBjcmVhdGUodXJpOiBzdHJpbmcsIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uIGFuZCBsb2FkIG1vZGVsIGFzeW5jaHJvbm91c2x5IGZyb20gYW4gYXJyYXkgYnVmZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXHJcbiAgICovXHJcbiAgY3JlYXRlKGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIHNlZ21lbnQgb2YgYW4gYXJyYXkgYnVmZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQW4gQXJyYXlCdWZmZXIgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cclxuICAgKiBAcGFyYW0gYnl0ZU9mZnNldCAtIFRoZSBiZWdpbm5pbmcgb2YgdGhlIHNwZWNpZmllZCBwb3J0aW9uIG9mIHRoZSBhcnJheSBidWZmZXIuXHJcbiAgICogQHBhcmFtIGJ5dGVMZW5ndGggLSBUaGUgbGVuZ3RoIGluIGJ5dGVzIG9mIHRoZSBhcnJheSBidWZmZXIuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxyXG4gICAqL1xyXG4gIGNyZWF0ZShcclxuICAgIGJ1ZmZlcjogQXJyYXlCdWZmZXJMaWtlLFxyXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyLFxyXG4gICAgYnl0ZUxlbmd0aD86IG51bWJlcixcclxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxyXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGEgVWludDhBcnJheS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBidWZmZXIgLSBBIFVpbnQ4QXJyYXkgcmVwcmVzZW50YXRpb24gb2YgYW4gT05OWCBtb2RlbC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXHJcbiAgICovXHJcbiAgY3JlYXRlKGJ1ZmZlcjogVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcbn1cclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZXhwb3J0IGNvbnN0IEluZmVyZW5jZVNlc3Npb246IEluZmVyZW5jZVNlc3Npb25GYWN0b3J5ID0gSW5mZXJlbmNlU2Vzc2lvbkltcGw7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLCBPcHRpb25zVGVuc29yTGF5b3V0IH0gZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvclRvRGF0YVVybE9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zVGVuc29yTGF5b3V0LCBPcHRpb25zRm9ybWF0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVG9JbWFnZURhdGFPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbnZlcnNpb25VdGlscyB7XHJcbiAgLyoqXHJcbiAgICogY3JlYXRlcyBhIERhdGFVUkwgaW5zdGFuY2UgZnJvbSB0ZW5zb3JcclxuICAgKlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyBhIERhdGFVUkwgaW5zdGFuY2UgZnJvbSB0aGUgdGVuc29yLlxyXG4gICAqXHJcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcclxuICAgKiAtIGBmb3JtYXRgOiBgJ1JHQidgXHJcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcclxuICAgKiBAcmV0dXJucyBhIERhdGFVUkwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgaW1hZ2UgY29udmVydGVkIGZyb20gdGVuc29yIGRhdGFcclxuICAgKi9cclxuICB0b0RhdGFVUkwob3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZXMgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIGZyb20gdGVuc29yXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogQHJldHVybnMgYW4gSW1hZ2VEYXRhIGluc3RhbmNlIHJlcHJlc2VudGluZyB0aGUgaW1hZ2UgY29udmVydGVkIGZyb20gdGVuc29yIGRhdGFcclxuICAgKi9cclxuICB0b0ltYWdlRGF0YShvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhO1xyXG59XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgVGVuc29yLCBUeXBlZFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcclxuXHJcbmV4cG9ydCB0eXBlIEltYWdlRm9ybWF0ID0gJ1JHQicgfCAnUkdCQScgfCAnQkdSJyB8ICdSQkcnO1xyXG5leHBvcnQgdHlwZSBJbWFnZVRlbnNvckxheW91dCA9ICdOSFdDJyB8ICdOQ0hXJztcclxuXHJcbi8vIHRoZSBmb2xsb3dpbmcgcmVnaW9uIGNvbnRhaW5zIHR5cGUgZGVmaW5pdGlvbnMgZm9yIGNvbnN0cnVjdGluZyB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uLlxyXG5cclxuLy8gI3JlZ2lvbiB0eXBlcyBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvblxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCBjb21tb24gcHJvcGVydGllcyBvZiB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHNwZWNpZmljIGxvY2F0aW9uLlxyXG4gKi9cclxuaW50ZXJmYWNlIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICByZWFkb25seSB0eXBlOiBUO1xyXG59XHJcblxyXG4vKipcclxuICogcmVwcmVzZW50IHRoZSBwYXJhbWV0ZXIgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgR1BVIHJlc291cmNlLlxyXG4gKi9cclxuaW50ZXJmYWNlIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xyXG4gIC8qKlxyXG4gICAqIGFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGRvd25sb2FkIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLlxyXG4gICAqXHJcbiAgICogSWYgbm90IHByb3ZpZGVkLCB0aGUgdGVuc29yIHRyZWF0IHRoZSBHUFUgZGF0YSBhcyBleHRlcm5hbCByZXNvdXJjZS5cclxuICAgKi9cclxuICBkb3dubG9hZD8oKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xyXG5cclxuICAvKipcclxuICAgKiBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIHRlbnNvciBpcyBkaXNwb3NlZC5cclxuICAgKlxyXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXHJcbiAgICovXHJcbiAgZGlzcG9zZT8oKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLkNwdVBpbm5lZERhdGFUeXBlcyA9IFRlbnNvci5DcHVQaW5uZWREYXRhVHlwZXM+XHJcbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdjcHUtcGlubmVkJy5cclxuICAgKi9cclxuICByZWFkb25seSBsb2NhdGlvbjogJ2NwdS1waW5uZWQnO1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgdGhlIENQVSBwaW5uZWQgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFtUXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGV4dHVyZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXMgPSBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcz5cclxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPixcclxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAndGV4dHVyZScuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbG9jYXRpb246ICd0ZXh0dXJlJztcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0gVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cclxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPixcclxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAnZ3B1LWJ1ZmZlcicuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbG9jYXRpb246ICdncHUtYnVmZmVyJztcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHUFUgYnVmZmVyIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcyA9IFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcz5cclxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPixcclxuICAgIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAnbWwtdGVuc29yJy5cclxuICAgKi9cclxuICByZWFkb25seSBsb2NhdGlvbjogJ21sLXRlbnNvcic7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgdGhlIFdlYk5OIE1MVGVuc29yIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG1sVGVuc29yOiBUZW5zb3IuTUxUZW5zb3JUeXBlO1xyXG59XHJcblxyXG4vLyAjZW5kcmVnaW9uXHJcblxyXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIG9mIGVhY2ggaW5kaXZpZHVhbCBvcHRpb25zLlxyXG4vLyB0aGUgdGVuc29yIGZhY3RvcnkgZnVuY3Rpb25zIHVzZSBhIGNvbXBvc2l0aW9uIG9mIHRob3NlIG9wdGlvbnMgYXMgdGhlIHBhcmFtZXRlciB0eXBlLlxyXG5cclxuLy8gI3JlZ2lvbiBPcHRpb25zIGZpZWxkc1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zRm9ybWF0IHtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGZvcm1hdCByZXByZXNlbnRlZCBpbiBSR0JBIGNvbG9yIHNwYWNlLlxyXG4gICAqL1xyXG4gIGZvcm1hdD86IEltYWdlRm9ybWF0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JGb3JtYXQge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2UgZm9ybWF0IG9mIHRoZSB0ZW5zb3IuXHJcbiAgICpcclxuICAgKiBOT1RFOiB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIG9wdGlvbiAnZm9ybWF0Jy4gV2hpbGUgb3B0aW9uICdmb3JtYXQnIHJlcHJlc2VudHMgdGhlIG9yaWdpbmFsIGltYWdlLCAndGVuc29yRm9ybWF0J1xyXG4gICAqIHJlcHJlc2VudHMgdGhlIHRhcmdldCBmb3JtYXQgb2YgdGhlIHRlbnNvci4gQSB0cmFuc3Bvc2Ugd2lsbCBiZSBwZXJmb3JtZWQgaWYgdGhleSBhcmUgZGlmZmVyZW50LlxyXG4gICAqL1xyXG4gIHRlbnNvckZvcm1hdD86IEltYWdlRm9ybWF0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSB7XHJcbiAgLyoqXHJcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICBkYXRhVHlwZT86ICdmbG9hdDMyJyB8ICd1aW50OCc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc1RlbnNvckxheW91dCB7XHJcbiAgLyoqXHJcbiAgICogRGVzY3JpYmVzIHRoZSB0ZW5zb3IgbGF5b3V0IHdoZW4gcmVwcmVzZW50aW5nIGRhdGEgb2Ygb25lIG9yIG1vcmUgaW1hZ2UocykuXHJcbiAgICovXHJcbiAgdGVuc29yTGF5b3V0PzogSW1hZ2VUZW5zb3JMYXlvdXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc0RpbWVuc2lvbnMge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2UgaGVpZ2h0IGluIHBpeGVsXHJcbiAgICovXHJcbiAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgaW1hZ2Ugd2lkdGggaW4gcGl4ZWxcclxuICAgKi9cclxuICB3aWR0aD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25SZXNpemVkRGltZW5zaW9ucyB7XHJcbiAgLyoqXHJcbiAgICogRGVzY3JpYmVzIHRoZSByZXNpemVkIGhlaWdodC4gSWYgb21pdHRlZCwgb3JpZ2luYWwgaGVpZ2h0IHdpbGwgYmUgdXNlZC5cclxuICAgKi9cclxuICByZXNpemVkSGVpZ2h0PzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyByZXNpemVkIHdpZHRoIC0gY2FuIGJlIGFjY2Vzc2VkIHZpYSB0ZW5zb3IgZGltZW5zaW9ucyBhcyB3ZWxsXHJcbiAgICovXHJcbiAgcmVzaXplZFdpZHRoPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7XHJcbiAgLyoqXHJcbiAgICogRGVzY3JpYmVzIG5vcm1hbGl6YXRpb24gcGFyYW1ldGVycyB3aGVuIHByZXByb2Nlc3NpbmcgdGhlIGltYWdlIGFzIG1vZGVsIGlucHV0LlxyXG4gICAqXHJcbiAgICogRGF0YSBlbGVtZW50IGFyZSByYW5nZWQgZnJvbSAwIHRvIDI1NS5cclxuICAgKi9cclxuICBub3JtPzoge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgJ2JpYXMnIHZhbHVlIGZvciBpbWFnZSBub3JtYWxpemF0aW9uLlxyXG4gICAgICogLSBJZiBvbWl0dGVkLCB1c2UgZGVmYXVsdCB2YWx1ZSAwLlxyXG4gICAgICogLSBJZiBpdCdzIGEgc2luZ2xlIG51bWJlciwgYXBwbHkgdG8gZWFjaCBjaGFubmVsXHJcbiAgICAgKiAtIElmIGl0J3MgYW4gYXJyYXkgb2YgMyBvciA0IG51bWJlcnMsIGFwcGx5IGVsZW1lbnQtd2lzZS4gTnVtYmVyIG9mIGVsZW1lbnRzIG5lZWQgdG8gbWF0Y2ggdGhlIG51bWJlciBvZiBjaGFubmVsc1xyXG4gICAgICogZm9yIHRoZSBjb3JyZXNwb25kaW5nIGltYWdlIGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBiaWFzPzogbnVtYmVyIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcbiAgICAvKipcclxuICAgICAqIFRoZSAnbWVhbicgdmFsdWUgZm9yIGltYWdlIG5vcm1hbGl6YXRpb24uXHJcbiAgICAgKiAtIElmIG9taXR0ZWQsIHVzZSBkZWZhdWx0IHZhbHVlIDI1NS5cclxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxyXG4gICAgICogLSBJZiBpdCdzIGFuIGFycmF5IG9mIDMgb3IgNCBudW1iZXJzLCBhcHBseSBlbGVtZW50LXdpc2UuIE51bWJlciBvZiBlbGVtZW50cyBuZWVkIHRvIG1hdGNoIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcclxuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcclxuICAgICAqL1xyXG4gICAgbWVhbj86IG51bWJlciB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gIH07XHJcbn1cclxuXHJcbi8vICNlbmRyZWdpb25cclxuXHJcbi8vICNyZWdpb24gT3B0aW9ucyBjb21wb3NpdGlvblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc1xyXG4gIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXHJcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxyXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcclxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc1xyXG4gIGV4dGVuZHMgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXHJcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxyXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcclxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVXJsT3B0aW9uc1xyXG4gIGV4dGVuZHMgT3B0aW9uc0RpbWVuc2lvbnMsXHJcbiAgICBPcHRpb25SZXNpemVkRGltZW5zaW9ucyxcclxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXHJcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxyXG4gICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxyXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnNcclxuICBleHRlbmRzIE9wdGlvblJlc2l6ZWREaW1lbnNpb25zLFxyXG4gICAgT3B0aW9uc1RlbnNvckZvcm1hdCxcclxuICAgIE9wdGlvbnNUZW5zb3JMYXlvdXQsXHJcbiAgICBPcHRpb25zVGVuc29yRGF0YVR5cGUsXHJcbiAgICBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge31cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQgZXh0ZW5kcyBUZW5zb3IuVGV4dHVyZURhdGFUeXBlcz5cclxuICBleHRlbmRzIFJlcXVpcmVkPE9wdGlvbnNEaW1lbnNpb25zPixcclxuICAgIE9wdGlvbnNGb3JtYXQsXHJcbiAgICBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiAvKiBUT0RPOiBhZGQgbW9yZSAqLyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cclxuICBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+LFxyXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgZGF0YVR5cGU/OiBUO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnM8VCBleHRlbmRzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcz5cclxuICBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+LFxyXG4gICAgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgZGF0YVR5cGU/OiBUO1xyXG59XHJcblxyXG4vLyAjZW5kcmVnaW9uXHJcblxyXG4vKipcclxuICogdHlwZSBUZW5zb3JGYWN0b3J5IGRlZmluZXMgdGhlIGZhY3RvcnkgZnVuY3Rpb25zIG9mICdUZW5zb3InIHRvIGNyZWF0ZSB0ZW5zb3IgaW5zdGFuY2VzIGZyb20gZXhpc3RpbmcgZGF0YSBvclxyXG4gKiByZXNvdXJjZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZhY3Rvcnkge1xyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGFuIEltYWdlRGF0YSBvYmplY3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpbWFnZURhdGEgLSB0aGUgSW1hZ2VEYXRhIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gSW1hZ2VEYXRhLlxyXG4gICAqXHJcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcclxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXHJcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcclxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XHJcbiAgICovXHJcbiAgZnJvbUltYWdlKFxyXG4gICAgaW1hZ2VEYXRhOiBJbWFnZURhdGEsXHJcbiAgICBvcHRpb25zPzogVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnMsXHJcbiAgKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIEhUTUxJbWFnZUVsZW1lbnQgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW1hZ2VFbGVtZW50IC0gdGhlIEhUTUxJbWFnZUVsZW1lbnQgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBIVE1MSW1hZ2VFbGVtZW50LlxyXG4gICAqXHJcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcclxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXHJcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcclxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XHJcbiAgICovXHJcbiAgZnJvbUltYWdlKFxyXG4gICAgaW1hZ2VFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50LFxyXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxyXG4gICk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gVVJMXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdXJsU291cmNlIC0gYSBzdHJpbmcgYXMgYSBVUkwgdG8gdGhlIGltYWdlIG9yIGEgZGF0YSBVUkwgY29udGFpbmluZyB0aGUgaW1hZ2UgZGF0YS5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gVVJMLlxyXG4gICAqXHJcbiAgICogVGhlIGZvbGxvd2luZyBkZWZhdWx0IHNldHRpbmdzIHdpbGwgYmUgYXBwbGllZDpcclxuICAgKiAtIGB0ZW5zb3JGb3JtYXRgOiBgJ1JHQidgXHJcbiAgICogLSBgdGVuc29yTGF5b3V0YDogYCdOQ0hXJ2BcclxuICAgKiAtIGBkYXRhVHlwZWA6IGAnZmxvYXQzMidgXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0ZW5zb3Igb2JqZWN0XHJcbiAgICovXHJcbiAgZnJvbUltYWdlKHVybFNvdXJjZTogc3RyaW5nLCBvcHRpb25zPzogVGVuc29yRnJvbVVybE9wdGlvbnMpOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGFuIEltYWdlQml0bWFwIG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGJpdG1hcCAtIHRoZSBJbWFnZUJpdG1hcCBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFVSTC5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21JbWFnZShcclxuICAgIGJpdG1hcDogSW1hZ2VCaXRtYXAsXHJcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLFxyXG4gICk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGV4dHVyZSAtIHRoZSBXZWJHTFRleHR1cmUgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBXZWJHTCB0ZXh0dXJlLlxyXG4gICAqXHJcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgKiAtIGB3aWR0aGA6IHRoZSB3aWR0aCBvZiB0aGUgdGV4dHVyZS4gUmVxdWlyZWQuXHJcbiAgICogLSBgaGVpZ2h0YDogdGhlIGhlaWdodCBvZiB0aGUgdGV4dHVyZS4gUmVxdWlyZWQuXHJcbiAgICogLSBgZm9ybWF0YDogdGhlIGZvcm1hdCBvZiB0aGUgdGV4dHVyZS4gSWYgb21pdHRlZCwgYXNzdW1lICdSR0JBJy5cclxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIEdQVSB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YVxyXG4gICAqIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndFxyXG4gICAqIG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiBHUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YSB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cclxuICAgKiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcclxuICAgKi9cclxuICBmcm9tVGV4dHVyZTxUIGV4dGVuZHMgVGVuc29yLlRleHR1cmVEYXRhVHlwZXMgPSAnZmxvYXQzMic+KFxyXG4gICAgdGV4dHVyZTogVGVuc29yLlRleHR1cmVUeXBlLFxyXG4gICAgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+LFxyXG4gICk6IFR5cGVkVGVuc29yPCdmbG9hdDMyJz47XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgV2ViR1BVIGJ1ZmZlclxyXG4gICAqXHJcbiAgICogQHBhcmFtIGJ1ZmZlciAtIHRoZSBHUFVCdWZmZXIgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBXZWJHUFUgYnVmZmVyLlxyXG4gICAqXHJcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgKiAtIGBkYXRhVHlwZWA6IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYXNzdW1lICdmbG9hdDMyJy5cclxuICAgKiAtIGBkaW1zYDogdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBSZXF1aXJlZC5cclxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIEdQVSB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YVxyXG4gICAqIHdpbGwgbm90IGJlIGFibGUgdG8gZG93bmxvYWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgYSBHUFUgYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLiBVc2VycyBkb24ndFxyXG4gICAqIG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiBHUFUuIElmIG9taXR0ZWQsIHRoZSBHUFUgZGF0YSB3aWxsIG5vdCBiZSBkaXNwb3NlZC5cclxuICAgKiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcclxuICAgKi9cclxuICBmcm9tR3B1QnVmZmVyPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzPihcclxuICAgIGJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGUsXHJcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPixcclxuICApOiBUeXBlZFRlbnNvcjxUPjtcclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBXZWJOTiBNTFRlbnNvclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHRlbnNvciAtIHRoZSBNTFRlbnNvciBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3IuXHJcbiAgICpcclxuICAgKiBUaGUgb3B0aW9ucyBpbmNsdWRlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gICAqIC0gYGRhdGFUeXBlYDogdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhc3N1bWUgJ2Zsb2F0MzInLlxyXG4gICAqIC0gYGRpbXNgOiB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIFJlcXVpcmVkLlxyXG4gICAqIC0gYGRvd25sb2FkYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZG93bmxvYWQgdGhlIHRlbnNvciBkYXRhIGZyb20gdGhlIE1MVGVuc29yIHRvIENQVS4gSWYgb21pdHRlZCwgdGhlIE1MVGVuc29yXHJcbiAgICogZGF0YSB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IHRoZSBXZWJOTiBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuXHJcbiAgICogVXNlcnMgZG9uJ3QgbmVlZCB0byBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXHJcbiAgICogLSBgZGlzcG9zZWA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRpc3Bvc2UgdGhlIHRlbnNvciBkYXRhIG9uIHRoZSBXZWJOTiBNTFRlbnNvci4gSWYgb21pdHRlZCwgdGhlIE1MVGVuc29yIHdpbGxcclxuICAgKiBub3QgYmUgZGlzcG9zZWQuIFVzdWFsbHksIHRoaXMgaXMgcHJvdmlkZWQgYnkgdGhlIFdlYk5OIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3QgbmVlZCB0b1xyXG4gICAqIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21NTFRlbnNvcjxUIGV4dGVuZHMgVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzPihcclxuICAgIHRlbnNvcjogVGVuc29yLk1MVGVuc29yVHlwZSxcclxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnM8VD4sXHJcbiAgKTogVHlwZWRUZW5zb3I8VD47XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgcHJlLWFsbG9jYXRlZCBidWZmZXIuIFRoZSBidWZmZXIgd2lsbCBiZSB1c2VkIGFzIGEgcGlubmVkIGJ1ZmZlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gdGhlIHRlbnNvciBlbGVtZW50IHR5cGUuXHJcbiAgICogQHBhcmFtIGJ1ZmZlciAtIGEgVHlwZWRBcnJheSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gc3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XHJcbiAgICovXHJcbiAgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyc+PihcclxuICAgIHR5cGU6IFQsXHJcbiAgICBidWZmZXI6IFRlbnNvci5EYXRhVHlwZU1hcFtUXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApOiBUeXBlZFRlbnNvcjxUPjtcclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8qKlxyXG4gKiBBIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBmaWxlJ3MgVVJMIG9yIHBhdGguXHJcbiAqXHJcbiAqIFBhdGggaXMgdmFpbGFibGUgb25seSBpbiBvbm54cnVudGltZS1ub2RlIG9yIG9ubnhydW50aW1lLXdlYiBydW5uaW5nIGluIE5vZGUuanMuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBGaWxlVXJsT3JQYXRoID0gc3RyaW5nO1xyXG5cclxuLyoqXHJcbiAqIEEgQmxvYiBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZpbGVCbG9iID0gQmxvYjtcclxuXHJcbi8qKlxyXG4gKiBBIFVpbnQ4QXJyYXksIEFycmF5QnVmZmVyIG9yIFNoYXJlZEFycmF5QnVmZmVyIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgYSBmaWxlIGNvbnRlbnQuXHJcbiAqXHJcbiAqIFdoZW4gaXQgaXMgYW4gQXJyYXlCdWZmZXIgb3IgU2hhcmVkQXJyYXlCdWZmZXIsIHRoZSB3aG9sZSBidWZmZXIgaXMgYXNzdW1lZCB0byBiZSB0aGUgZmlsZSBjb250ZW50LlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRmlsZURhdGEgPSBVaW50OEFycmF5IHwgQXJyYXlCdWZmZXJMaWtlO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBmaWxlIHRoYXQgY2FuIGJlIGxvYWRlZCBieSB0aGUgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRmlsZVR5cGUgPSBGaWxlVXJsT3JQYXRoIHwgRmlsZUJsb2IgfCBGaWxlRGF0YTtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGV4dGVybmFsIGRhdGEgZmlsZS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZXJuYWxEYXRhRmlsZURlc2NyaXB0aW9uIHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBleHRlcm5hbCBkYXRhIGZpbGUuXHJcbiAgICovXHJcbiAgZGF0YTogRmlsZVR5cGU7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgZmlsZSBwYXRoLlxyXG4gICAqL1xyXG4gIHBhdGg6IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYW4gZXh0ZXJuYWwgZGF0YSBmaWxlLlxyXG4gKlxyXG4gKiBXaGVuIHVzaW5nIGEgc3RyaW5nLCBpdCBzaG91bGQgYmUgYSBmaWxlIFVSTCBvciBwYXRoIHRoYXQgaW4gdGhlIHNhbWUgZGlyZWN0b3J5IGFzIHRoZSBtb2RlbCBmaWxlLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRXh0ZXJuYWxEYXRhRmlsZVR5cGUgPSBFeHRlcm5hbERhdGFGaWxlRGVzY3JpcHRpb24gfCBGaWxlVXJsT3JQYXRoO1xyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgZm9yIG1vZGVsIGxvYWRpbmcuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE9ubnhNb2RlbE9wdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnlpbmcgYSBsaXN0IG9mIGZpbGVzIHRoYXQgcmVwcmVzZW50cyB0aGUgZXh0ZXJuYWwgZGF0YS5cclxuICAgKi9cclxuICBleHRlcm5hbERhdGE/OiByZWFkb25seSBFeHRlcm5hbERhdGFGaWxlVHlwZVtdO1xyXG59XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5cclxuZXhwb3J0IHR5cGUgTm9uVGVuc29yVHlwZSA9IG5ldmVyO1xyXG5cclxuLyoqXHJcbiAqIFR5cGUgT25ueFZhbHVlIFJlcHJlc2VudHMgYm90aCB0ZW5zb3JzIGFuZCBub24tdGVuc29ycyB2YWx1ZSBmb3IgbW9kZWwncyBpbnB1dHMvb3V0cHV0cy5cclxuICpcclxuICogTk9URTogY3VycmVudGx5IG5vdCBzdXBwb3J0IG5vbi10ZW5zb3JcclxuICovXHJcbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZSA9IFRlbnNvciB8IE5vblRlbnNvclR5cGU7XHJcblxyXG4vKipcclxuICogVHlwZSBPbm54VmFsdWVEYXRhTG9jYXRpb24gcmVwcmVzZW50cyB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgb2YgYW4gT25ueFZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uID0gVGVuc29yLkRhdGFMb2NhdGlvbjtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG4vKipcclxuICogIyBPTk5YIFJ1bnRpbWUgSmF2YVNjcmlwdCBBUElcclxuICpcclxuICogT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJIGlzIGEgdW5pZmllZCBBUEkgZm9yIGFsbCBKYXZhU2NyaXB0IHVzYWdlcywgaW5jbHVkaW5nIHRoZSBmb2xsb3dpbmcgTlBNIHBhY2thZ2VzOlxyXG4gKlxyXG4gKiAtIFtvbm54cnVudGltZS1ub2RlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1ub2RlKVxyXG4gKiAtIFtvbm54cnVudGltZS13ZWJdKGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL29ubnhydW50aW1lLXdlYilcclxuICogLSBbb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS1yZWFjdC1uYXRpdmUpXHJcbiAqXHJcbiAqIFNlZSBhbHNvOlxyXG4gKiAtIFtHZXQgU3RhcnRlZF0oaHR0cHM6Ly9vbm54cnVudGltZS5haS9kb2NzL2dldC1zdGFydGVkL3dpdGgtamF2YXNjcmlwdC8pXHJcbiAqIC0gW0luZmVyZW5jZSBleGFtcGxlc10oaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS1pbmZlcmVuY2UtZXhhbXBsZXMvdHJlZS9tYWluL2pzKVxyXG4gKlxyXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cclxuICovXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2JhY2tlbmQuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2Vudi5qcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci5qcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi90cmFjZS5qcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vb25ueC1tb2RlbC5qcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vb25ueC12YWx1ZS5qcyc7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICEhKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMubm9kZSk7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgbGliPVwid2Vid29ya2VyXCIgLz5cclxuXHJcbi8vXHJcbi8vICogdHlwZSBoYWNrIGZvciBcIkhUTUxJbWFnZUVsZW1lbnRcIlxyXG4vL1xyXG4vLyBpbiB0eXBlc2NyaXB0LCB0aGUgdHlwZSBvZiBcIkhUTUxJbWFnZUVsZW1lbnRcIiBpcyBkZWZpbmVkIGluIGxpYi5kb20uZC50cywgd2hpY2ggaXMgY29uZmxpY3Qgd2l0aCBsaWIud2Vid29ya2VyLmQudHMuXHJcbi8vIHdoZW4gd2UgdXNlIHdlYndvcmtlciwgdGhlIGxpYi53ZWJ3b3JrZXIuZC50cyB3aWxsIGJlIHVzZWQsIHdoaWNoIGRvZXMgbm90IGhhdmUgSFRNTEltYWdlRWxlbWVudCBkZWZpbmVkLlxyXG4vL1xyXG4vLyB3ZSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIGVycm9ycyBjb21wbGFpbmluZyB0aGF0IEhUTUxJbWFnZUVsZW1lbnQgaXMgbm90IGRlZmluZWQ6XHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vXHJcbi8vIC4uL2NvbW1vbi9kaXN0L2Nqcy90ZW5zb3ItZmFjdG9yeS5kLnRzOjE4NzoyOSAtIGVycm9yIFRTMjU1MjogQ2Fubm90IGZpbmQgbmFtZSAnSFRNTEltYWdlRWxlbWVudCcuIERpZCB5b3UgbWVhblxyXG4vLyAnSFRNTExJRWxlbWVudCc/XHJcbi8vXHJcbi8vIDE4NyAgICAgZnJvbUltYWdlKGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCwgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zKTpcclxuLy8gUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+fn5+fn5+fn5cclxuLy9cclxuLy8gbm9kZV9tb2R1bGVzL0B3ZWJncHUvdHlwZXMvZGlzdC9pbmRleC5kLnRzOjgzOjcgLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxJbWFnZUVsZW1lbnQnLiBEaWQgeW91IG1lYW5cclxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xyXG4vL1xyXG4vLyA4MyAgICAgfCBIVE1MSW1hZ2VFbGVtZW50XHJcbi8vICAgICAgICAgIH5+fn5+fn5+fn5+fn5+fn5cclxuLy9cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gYEhUTUxJbWFnZUVsZW1lbnRgIGlzIG9ubHkgdXNlZCBpbiB0eXBlIGRlY2xhcmF0aW9uIGFuZCBub3QgaW4gcmVhbCBjb2RlLiBTbyB3ZSBkZWZpbmUgaXQgYXMgYHVua25vd25gIGhlcmUgdG9cclxuLy8gYnlwYXNzIHRoZSB0eXBlIGNoZWNrLlxyXG5cclxuLy9cclxuLy8gKiB0eXBlIGhhY2sgZm9yIFwiZG9jdW1lbnRcIlxyXG4vL1xyXG4vLyBpbiB0eXBlc2NyaXB0LCB0aGUgdHlwZSBvZiBcImRvY3VtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHNvIGl0J3Mgbm90IGF2YWlsYWJsZSBpbiB3ZWJ3b3JrZXIuXHJcbi8vXHJcbi8vIHdlIHdpbGwgZ2V0IHRoZSBmb2xsb3dpbmcgZXJyb3JzIGNvbXBsYWluaW5nIHRoYXQgZG9jdW1lbnQgaXMgbm90IGRlZmluZWQ6XHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vXHJcbi8vIGxpYi93YXNtL3dhc20tdXRpbHMtaW1wb3J0LnRzOjc6MzMgLSBlcnJvciBUUzI1ODQ6IENhbm5vdCBmaW5kIG5hbWUgJ2RvY3VtZW50Jy4gRG8geW91IG5lZWQgdG8gY2hhbmdlIHlvdXIgdGFyZ2V0XHJcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXHJcbi8vXHJcbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cclxuLy9cclxuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6Nzo2MSAtIGVycm9yIFRTMjU4NDogQ2Fubm90IGZpbmQgbmFtZSAnZG9jdW1lbnQnLiBEbyB5b3UgbmVlZCB0byBjaGFuZ2UgeW91ciB0YXJnZXRcclxuLy8gbGlicmFyeT8gVHJ5IGNoYW5naW5nIHRoZSAnbGliJyBjb21waWxlciBvcHRpb24gdG8gaW5jbHVkZSAnZG9tJy5cclxuLy9cclxuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5cclxuLy9cclxuLy8gbGliL3dhc20vd2FzbS11dGlscy1pbXBvcnQudHM6Nzo4OCAtIGVycm9yIFRTMjU1MjogQ2Fubm90IGZpbmQgbmFtZSAnSFRNTFNjcmlwdEVsZW1lbnQnLiBEaWQgeW91IG1lYW5cclxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xyXG4vL1xyXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+flxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBgZG9jdW1lbnRgIGlzIHVzZWQgdG8gZ2V0IHRoZSBjdXJyZW50IHNjcmlwdCBVUkwsIHdoaWNoIGlzIG5vdCBhdmFpbGFibGUgaW4gd2Vid29ya2VyLiBUaGlzIGZpbGUgaXMgc2VydmVkIGFzIGFcclxuLy8gXCJkdWFsXCIgZmlsZSBmb3IgZW50cmllcyBvZiBib3RoIHdlYndvcmtlciBhbmQgdGhlIGVzbSBtb2R1bGUuXHJcbi8vXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICB0eXBlIEhUTUxJbWFnZUVsZW1lbnQgPSB1bmtub3duO1xyXG4gIHR5cGUgSFRNTFNjcmlwdEVsZW1lbnQgPSB7IHNyYz86IHN0cmluZyB9O1xyXG4gIGNvbnN0IGRvY3VtZW50OiB1bmRlZmluZWQgfCB7IGN1cnJlbnRTY3JpcHQ/OiBIVE1MU2NyaXB0RWxlbWVudCB9O1xyXG59XHJcblxyXG4vKipcclxuICogQHN1bW1hcnlcclxuICpcclxuICogVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhIFwiZHVhbFwiIGZpbGUgZm9yIGJvdGggZW50cmllcyBvZiB0aGUgZm9sbG93aW5nOlxyXG4gKiAtIFRoZSBwcm94eSB3b3JrZXIgaXRzZWxmLlxyXG4gKiAgIC0gV2hlbiB1c2VkIGFzIGEgd29ya2VyLCBpdCBsaXN0ZW5zIHRvIHRoZSBtZXNzYWdlcyBmcm9tIHRoZSBtYWluIHRocmVhZCBhbmQgcGVyZm9ybXMgdGhlIGNvcnJlc3BvbmRpbmcgb3BlcmF0aW9ucy5cclxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCBkaXJlY3RseSB1c2luZyBgbmV3IFdvcmtlcigpYCBpbiB0aGUgbWFpbiB0aHJlYWQuXHJcbiAqXHJcbiAqIC0gVGhlIEVTTSBtb2R1bGUgdGhhdCBjcmVhdGVzIHRoZSBwcm94eSB3b3JrZXIgKGFzIGEgd29ya2VyIGxhdW5jaGVyKS5cclxuICogICAtIFdoZW4gdXNlZCBhcyBhIHdvcmtlciBsYXVuY2hlciwgaXQgY3JlYXRlcyB0aGUgcHJveHkgd29ya2VyIGFuZCByZXR1cm5zIGl0LlxyXG4gKiAgIC0gU2hvdWxkIGJlIGltcG9ydGVkIHVzaW5nIGBpbXBvcnQoKWAgaW4gdGhlIG1haW4gdGhyZWFkLCB3aXRoIHRoZSBxdWVyeSBwYXJhbWV0ZXIgYGltcG9ydD0xYC5cclxuICpcclxuICogVGhpcyBmaWxlIHdpbGwgYmUgYWx3YXlzIGNvbXBpbGluZyBpbnRvIEVTTSBmb3JtYXQuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTWVzc2FnZSwgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGEgfSBmcm9tICcuLi9wcm94eS1tZXNzYWdlcy5qcyc7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlU2Vzc2lvbixcclxuICBjb3B5RnJvbUV4dGVybmFsQnVmZmVyLFxyXG4gIGVuZFByb2ZpbGluZyxcclxuICBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyxcclxuICBpbml0RXAsXHJcbiAgaW5pdFJ1bnRpbWUsXHJcbiAgcmVsZWFzZVNlc3Npb24sXHJcbiAgcnVuLFxyXG59IGZyb20gJy4uL3dhc20tY29yZS1pbXBsLmpzJztcclxuaW1wb3J0IHsgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5IH0gZnJvbSAnLi4vd2FzbS1mYWN0b3J5LmpzJztcclxuaW1wb3J0IHsgc2NyaXB0U3JjIH0gZnJvbSAnLi4vd2FzbS11dGlscy1pbXBvcnQuanMnO1xyXG5cclxuY29uc3QgV09SS0VSX05BTUUgPSAnb3J0LXdhc20tcHJveHktd29ya2VyJztcclxuY29uc3QgaXNQcm94eVdvcmtlciA9IGdsb2JhbFRoaXMuc2VsZj8ubmFtZSA9PT0gV09SS0VSX05BTUU7XHJcblxyXG5pZiAoaXNQcm94eVdvcmtlcikge1xyXG4gIC8vIFdvcmtlciB0aHJlYWRcclxuICBzZWxmLm9ubWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50PE9ydFdhc21NZXNzYWdlPik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgeyB0eXBlLCBpbjogbWVzc2FnZSB9ID0gZXYuZGF0YTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ2luaXQtd2FzbSc6XHJcbiAgICAgICAgICBpbml0aWFsaXplV2ViQXNzZW1ibHkobWVzc2FnZSEud2FzbSkudGhlbihcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGluaXRSdW50aW1lKG1lc3NhZ2UhKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2luaXQtZXAnOiB7XHJcbiAgICAgICAgICBjb25zdCB7IGVwTmFtZSwgZW52IH0gPSBtZXNzYWdlITtcclxuICAgICAgICAgIGluaXRFcChlbnYsIGVwTmFtZSkudGhlbihcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdjb3B5LWZyb20nOiB7XHJcbiAgICAgICAgICBjb25zdCB7IGJ1ZmZlciB9ID0gbWVzc2FnZSE7XHJcbiAgICAgICAgICBjb25zdCBidWZmZXJEYXRhID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xyXG4gICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBvdXQ6IGJ1ZmZlckRhdGEgfSBhcyBPcnRXYXNtTWVzc2FnZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnY3JlYXRlJzoge1xyXG4gICAgICAgICAgY29uc3QgeyBtb2RlbCwgb3B0aW9ucyB9ID0gbWVzc2FnZSE7XHJcbiAgICAgICAgICBjcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKS50aGVuKFxyXG4gICAgICAgICAgICAoc2Vzc2lvbk1ldGFkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBvdXQ6IHNlc3Npb25NZXRhZGF0YSB9IGFzIE9ydFdhc21NZXNzYWdlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdyZWxlYXNlJzpcclxuICAgICAgICAgIHJlbGVhc2VTZXNzaW9uKG1lc3NhZ2UhKTtcclxuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3J1bic6IHtcclxuICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9ucyB9ID0gbWVzc2FnZSE7XHJcbiAgICAgICAgICBydW4oc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgbmV3IEFycmF5KG91dHB1dEluZGljZXMubGVuZ3RoKS5maWxsKG51bGwpLCBvcHRpb25zKS50aGVuKFxyXG4gICAgICAgICAgICAob3V0cHV0cykgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChvdXRwdXRzLnNvbWUoKG8pID0+IG9bM10gIT09ICdjcHUnKSkge1xyXG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnI6ICdQcm94eSBkb2VzIG5vdCBzdXBwb3J0IG5vbi1jcHUgdGVuc29yIGxvY2F0aW9uLicgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAgICB7IHR5cGUsIG91dDogb3V0cHV0cyB9IGFzIE9ydFdhc21NZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyhbLi4uaW5wdXRzLCAuLi5vdXRwdXRzXSBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKSxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgJ2VuZC1wcm9maWxpbmcnOlxyXG4gICAgICAgICAgZW5kUHJvZmlsaW5nKG1lc3NhZ2UhKTtcclxuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9IGFzIE9ydFdhc21NZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpc1Byb3h5V29ya2VyXHJcbiAgPyBudWxsXHJcbiAgOiAodXJsT3ZlcnJpZGU/OiBzdHJpbmcpID0+XHJcbiAgICAgIG5ldyBXb3JrZXIodXJsT3ZlcnJpZGUgPz8gc2NyaXB0U3JjISwgeyB0eXBlOiBCVUlMRF9ERUZTLklTX0VTTSA/ICdtb2R1bGUnIDogJ2NsYXNzaWMnLCBuYW1lOiBXT1JLRVJfTkFNRSB9KTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgdHlwZSB7IE9ydFdhc21Nb2R1bGUgfSBmcm9tICcuL3dhc20tdHlwZXMnO1xyXG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcclxuXHJcbi8qKlxyXG4gKiBUaGUgb3JpZ2luIG9mIHRoZSBjdXJyZW50IGxvY2F0aW9uLlxyXG4gKlxyXG4gKiBJbiBOb2RlLmpzLCB0aGlzIGlzIHVuZGVmaW5lZC5cclxuICovXHJcbmNvbnN0IG9yaWdpbiA9IGlzTm9kZSB8fCB0eXBlb2YgbG9jYXRpb24gPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogbG9jYXRpb24ub3JpZ2luO1xyXG5cclxuLyoqXHJcbiAqIFNvbWUgYnVuZGxlcnMgKGVnLiBXZWJwYWNrKSB3aWxsIHJld3JpdGUgYGltcG9ydC5tZXRhLnVybGAgdG8gYSBmaWxlIFVSTCBhdCBjb21waWxlIHRpbWUuXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIGBpbXBvcnQubWV0YS51cmxgIHN0YXJ0cyB3aXRoIGBmaWxlOmAsIGJ1dCB1c2luZyB0aGUgYD5gIGFuZCBgPGAgb3BlcmF0b3JzIGluc3RlYWQgb2ZcclxuICogYHN0YXJ0c1dpdGhgIGZ1bmN0aW9uIHNvIHRoYXQgY29kZSBtaW5pbWl6ZXJzIGNhbiByZW1vdmUgdGhlIGRlYWQgY29kZSBjb3JyZWN0bHkuXHJcbiAqXHJcbiAqIEZvciBleGFtcGxlLCBpZiB3ZSB1c2UgdGVyc2VyIHRvIG1pbmlmeSB0aGUgZm9sbG93aW5nIGNvZGU6XHJcbiAqIGBgYGpzXHJcbiAqIGlmIChcImZpbGU6Ly9oYXJkLWNvZGVkLWZpbGVuYW1lXCIuc3RhcnRzV2l0aChcImZpbGU6XCIpKSB7XHJcbiAqICAgY29uc29sZS5sb2coMSlcclxuICogfSBlbHNlIHtcclxuICogICBjb25zb2xlLmxvZygyKVxyXG4gKiB9XHJcbiAqXHJcbiAqIGlmIChcImZpbGU6Ly9oYXJkLWNvZGVkLWZpbGVuYW1lXCIgPiBcImZpbGU6XCIgJiYgXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiIDwgXCJmaWxlO1wiKSB7XHJcbiAqICAgY29uc29sZS5sb2coMylcclxuICogfSBlbHNlIHtcclxuICogICBjb25zb2xlLmxvZyg0KVxyXG4gKiB9XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBUaGUgbWluaWZpZWQgY29kZSB3aWxsIGJlOlxyXG4gKiBgYGBqc1xyXG4gKiBcImZpbGU6Ly9oYXJkLWNvZGVkLWZpbGVuYW1lXCIuc3RhcnRzV2l0aChcImZpbGU6XCIpP2NvbnNvbGUubG9nKDEpOmNvbnNvbGUubG9nKDIpLGNvbnNvbGUubG9nKDMpO1xyXG4gKiBgYGBcclxuICpcclxuICogKHVzZSBUZXJzZXIgNS4zOS4wIHdpdGggZGVmYXVsdCBvcHRpb25zLCBodHRwczovL3RyeS50ZXJzZXIub3JnLylcclxuICpcclxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgaW1wb3J0Lm1ldGEudXJsIGlzIGhhcmRjb2RlZCBhcyBhIGZpbGUgVVJJLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSA9XHJcbiAgQlVJTERfREVGUy5JU19FU00gJiYgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMISA+ICdmaWxlOicgJiYgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMISA8ICdmaWxlOyc7XHJcblxyXG5jb25zdCBnZXRTY3JpcHRTcmMgPSAoKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcclxuICAvLyBpZiBOb2RlanMsIHJldHVybiB1bmRlZmluZWRcclxuICBpZiAoaXNOb2RlKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICAvLyBpZiBJdCdzIEVTTSwgdXNlIGltcG9ydC5tZXRhLnVybFxyXG4gIGlmIChCVUlMRF9ERUZTLklTX0VTTSkge1xyXG4gICAgLy8gRm9yIEVTTSwgaWYgdGhlIGltcG9ydC5tZXRhLnVybCBpcyBhIGZpbGUgVVJMLCB0aGlzIHVzdWFsbHkgbWVhbnMgdGhlIGJ1bmRsZXIgcmV3cml0ZXMgYGltcG9ydC5tZXRhLnVybGAgdG9cclxuICAgIC8vIHRoZSBmaWxlIHBhdGggYXQgY29tcGlsZSB0aW1lLiBJbiB0aGlzIGNhc2UsIHRoaXMgZmlsZSBwYXRoIGNhbm5vdCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgcnVudGltZSBVUkwuXHJcbiAgICAvL1xyXG4gICAgLy8gV2UgbmVlZCB0byB1c2UgdGhlIFVSTCBjb25zdHJ1Y3RvciBsaWtlIHRoaXM6XHJcbiAgICAvLyBgYGBqc1xyXG4gICAgLy8gbmV3IFVSTCgnYWN0dWFsLWJ1bmRsZS1uYW1lLmpzJywgaW1wb3J0Lm1ldGEudXJsKS5ocmVmXHJcbiAgICAvLyBgYGBcclxuICAgIC8vIFNvIHRoYXQgYnVuZGxlciBjYW4gcHJlcHJvY2VzcyB0aGUgVVJMIGNvcnJlY3RseS5cclxuICAgIGlmIChpc0VzbUltcG9ydE1ldGFVcmxIYXJkY29kZWRBc0ZpbGVVcmkpIHtcclxuICAgICAgLy8gaWYgdGhlIHJld3JpdHRlbiBVUkwgaXMgYSByZWxhdGl2ZSBwYXRoLCB3ZSBuZWVkIHRvIHVzZSB0aGUgb3JpZ2luIHRvIHJlc29sdmUgdGhlIFVSTC5cclxuXHJcbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgaXMgYSB3b3JrYXJvdW5kIGZvciBWaXRlLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBWaXRlIHVzZXMgYSBidW5kbGVyKHJvbGx1cC9yb2xsZG93bikgdGhhdCBkb2VzIG5vdCByZXdyaXRlIGBpbXBvcnQubWV0YS51cmxgIHRvIGEgZmlsZSBVUkwuIFNvIGluIHRoZW9yeSwgdGhpc1xyXG4gICAgICAvLyBjb2RlIHBhdGggc2hvdWxkIG5vdCBiZSBleGVjdXRlZCBpbiBWaXRlLiBIb3dldmVyLCB0aGUgYnVuZGxlciBkb2VzIG5vdCBrbm93IGl0IGFuZCBpdCBzdGlsbCB0cnkgdG8gbG9hZCB0aGVcclxuICAgICAgLy8gZm9sbG93aW5nIHBhdHRlcm46XHJcbiAgICAgIC8vIC0gYHJldHVybiBuZXcgVVJMKCdmaWxlbmFtZScsIGltcG9ydC5tZXRhLnVybCkuaHJlZmBcclxuICAgICAgLy9cclxuICAgICAgLy8gQnkgcmVwbGFjaW5nIHRoZSBwYXR0ZXJuIGFib3ZlIHdpdGggdGhlIGZvbGxvd2luZyBjb2RlLCB3ZSBjYW4gc2tpcCB0aGUgcmVzb3VyY2UgbG9hZGluZyBiZWhhdmlvcjpcclxuICAgICAgLy8gLSBgY29uc3QgVVJMMiA9IFVSTDsgcmV0dXJuIG5ldyBVUkwyKCdmaWxlbmFtZScsIGltcG9ydC5tZXRhLnVybCkuaHJlZjtgXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIEFuZCBpdCBzdGlsbCB3b3JrcyBpbiBXZWJwYWNrLlxyXG4gICAgICBjb25zdCBVUkwyID0gVVJMO1xyXG4gICAgICByZXR1cm4gbmV3IFVSTChuZXcgVVJMMihCVUlMRF9ERUZTLkJVTkRMRV9GSUxFTkFNRSwgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMKS5ocmVmLCBvcmlnaW4pLmhyZWY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXHJcbiAgICA/IChkb2N1bWVudC5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjXHJcbiAgICA6IC8vIHVzZSBgc2VsZi5sb2NhdGlvbi5ocmVmYCBpZiBhdmFpbGFibGVcclxuICAgICAgdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnXHJcbiAgICAgID8gc2VsZi5sb2NhdGlvbj8uaHJlZlxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3NpYyBzY3JpcHQgc291cmNlIFVSTC4gVGhpcyBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZSBpbiBub24gRVNNb2R1bGUgZW52aXJvbm1lbnRzLlxyXG4gKlxyXG4gKiBJbiBOb2RlLmpzLCB0aGlzIGlzIHVuZGVmaW5lZC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSBnZXRTY3JpcHRTcmMoKTtcclxuXHJcbi8qKlxyXG4gKiBJbmZlciB0aGUgd2FzbSBwYXRoIHByZWZpeCBmcm9tIHRoZSBzY3JpcHQgc291cmNlIFVSTC5cclxuICpcclxuICogQHJldHVybnMgVGhlIGluZmVycmVkIHdhc20gcGF0aCBwcmVmaXgsIG9yIHVuZGVmaW5lZCBpZiB0aGUgc2NyaXB0IHNvdXJjZSBVUkwgaXMgbm90IGF2YWlsYWJsZSBvciBpcyBhIGJsb2IgVVJMLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluZmVyV2FzbVBhdGhQcmVmaXhGcm9tU2NyaXB0U3JjID0gKCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgaWYgKHNjcmlwdFNyYyAmJiAhc2NyaXB0U3JjLnN0YXJ0c1dpdGgoJ2Jsb2I6JykpIHtcclxuICAgIHJldHVybiBzY3JpcHRTcmMuc3Vic3RyaW5nKDAsIHNjcmlwdFNyYy5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGZpbGVuYW1lIHdpdGggcHJlZml4IGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLlxyXG4gKi9cclxuY29uc3QgaXNTYW1lT3JpZ2luID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGJhc2VVcmwgPSBwcmVmaXhPdmVycmlkZSA/PyBzY3JpcHRTcmM7XHJcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsID8gbmV3IFVSTChmaWxlbmFtZSwgYmFzZVVybCkgOiBuZXcgVVJMKGZpbGVuYW1lKTtcclxuICAgIHJldHVybiB1cmwub3JpZ2luID09PSBvcmlnaW47XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZSB0aGUgaW5wdXRzIHRvIGFuIGFic29sdXRlIFVSTCB3aXRoIHRoZSBnaXZlbiBwcmVmaXggb3ZlcnJpZGUuIElmIGZhaWxlZCwgcmV0dXJuIHVuZGVmaW5lZC5cclxuICovXHJcbmNvbnN0IG5vcm1hbGl6ZVVybCA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IGJhc2VVcmwgPSBwcmVmaXhPdmVycmlkZSA/PyBzY3JpcHRTcmM7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybCA9IGJhc2VVcmwgPyBuZXcgVVJMKGZpbGVuYW1lLCBiYXNlVXJsKSA6IG5ldyBVUkwoZmlsZW5hbWUpO1xyXG4gICAgcmV0dXJuIHVybC5ocmVmO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZmFsbGJhY2sgVVJMIGlmIGFuIGFic29sdXRlIFVSTCBjYW5ub3QgYmUgY3JlYXRlZCBieSB0aGUgbm9ybWFsaXplVXJsIGZ1bmN0aW9uLlxyXG4gKi9cclxuY29uc3QgZmFsbGJhY2tVcmwgPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IGAke3ByZWZpeE92ZXJyaWRlID8/ICcuLyd9JHtmaWxlbmFtZX1gO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcHJlbG9hZCBhIG1vZHVsZSBmcm9tIGEgVVJMLlxyXG4gKlxyXG4gKiBJZiB0aGUgb3JpZ2luIG9mIHRoZSB3b3JrZXIgVVJMIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IG9yaWdpbiwgdGhlIHdvcmtlciBjYW5ub3QgYmUgbG9hZGVkIGRpcmVjdGx5LlxyXG4gKiBTZWUgZGlzY3Vzc2lvbnMgaW4gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi93b3JrZXItbG9hZGVyL2lzc3Vlcy8xNTRcclxuICpcclxuICogSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIGZldGNoIHRoZSB3b3JrZXIgVVJMIGFuZCBjcmVhdGUgYSBuZXcgQmxvYiBVUkwgd2l0aCB0aGUgc2FtZSBvcmlnaW4gYXMgYSB3b3JrYXJvdW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0gYWJzb2x1dGVVcmwgLSBUaGUgYWJzb2x1dGUgVVJMIHRvIHByZWxvYWQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBuZXcgQmxvYiBVUkxcclxuICovXHJcbmNvbnN0IHByZWxvYWQgPSBhc3luYyAoYWJzb2x1dGVVcmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChhYnNvbHV0ZVVybCwgeyBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9KTtcclxuICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xyXG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZHluYW1pY2FsbHkgaW1wb3J0IGEgbW9kdWxlIGZyb20gYSBVUkwuXHJcbiAqXHJcbiAqIFRoZSBidWlsZCBzY3JpcHQgaGFzIHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRoaXMgZnVuY3Rpb24gdG8gZW5zdXJlIHRoYXQgdGhlIFVSTCBpcyBub3QgYnVuZGxlZCBpbnRvIHRoZSBmaW5hbCBvdXRwdXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB1cmwgLSBUaGUgVVJMIHRvIGltcG9ydC5cclxuICpcclxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgZGVmYXVsdCBleHBvcnQgb2YgdGhlIG1vZHVsZS5cclxuICovXHJcbmNvbnN0IGR5bmFtaWNJbXBvcnREZWZhdWx0ID0gYXN5bmMgPFQ+KHVybDogc3RyaW5nKTogUHJvbWlzZTxUPiA9PlxyXG4gIChhd2FpdCBpbXBvcnQoLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqLyB1cmwpKS5kZWZhdWx0O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBwcm94eSB3b3JrZXIgZmFjdG9yeSBpbXBvcnRlZCBmcm9tIHRoZSBwcm94eSB3b3JrZXIgbW9kdWxlLlxyXG4gKlxyXG4gKiBUaGlzIGlzIG9ubHkgYXZhaWxhYmxlIHdoZW4gdGhlIFdlYkFzc2VtYmx5IHByb3h5IGlzIG5vdCBkaXNhYmxlZC5cclxuICovXHJcbmNvbnN0IGNyZWF0ZVByb3h5V29ya2VyOiAoKHVybE92ZXJyaWRlPzogc3RyaW5nKSA9PiBXb3JrZXIpIHwgdW5kZWZpbmVkID1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xyXG4gIEJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZID8gdW5kZWZpbmVkIDogcmVxdWlyZSgnLi9wcm94eS13b3JrZXIvbWFpbicpLmRlZmF1bHQ7XHJcblxyXG4vKipcclxuICogSW1wb3J0IHRoZSBwcm94eSB3b3JrZXIuXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XHJcbiAqIDEuIElmIGEgcHJlbG9hZCBpcyBuZWVkZWQsIGl0IHdpbGwgcHJlbG9hZCB0aGUgbW9kdWxlIGFuZCByZXR1cm4gdGhlIG9iamVjdCBVUkwuXHJcbiAqIDIuIFVzZSB0aGUgcHJveHkgd29ya2VyIGZhY3RvcnkgdG8gY3JlYXRlIHRoZSBwcm94eSB3b3JrZXIuXHJcbiAqXHJcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSB0dXBsZSBvZiAyIGVsZW1lbnRzOlxyXG4gKiAgICAgICAgICAgIC0gVGhlIG9iamVjdCBVUkwgb2YgdGhlIHByZWxvYWRlZCBtb2R1bGUsIG9yIHVuZGVmaW5lZCBpZiBubyBwcmVsb2FkIGlzIG5lZWRlZC5cclxuICogICAgICAgICAgICAtIFRoZSBwcm94eSB3b3JrZXIuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW1wb3J0UHJveHlXb3JrZXIgPSBhc3luYyAoKTogUHJvbWlzZTxbdW5kZWZpbmVkIHwgc3RyaW5nLCBXb3JrZXJdPiA9PiB7XHJcbiAgaWYgKCFzY3JpcHRTcmMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgcHJveHkgd29ya2VyOiBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBzY3JpcHQgc291cmNlIFVSTC4nKTtcclxuICB9XHJcblxyXG4gIC8vIElmIHRoZSBzY3JpcHQgc291cmNlIGlzIGZyb20gdGhlIHNhbWUgb3JpZ2luLCB3ZSBjYW4gdXNlIHRoZSBlbWJlZGRlZCBwcm94eSBtb2R1bGUgZGlyZWN0bHkuXHJcbiAgaWYgKGlzU2FtZU9yaWdpbihzY3JpcHRTcmMpKSB7XHJcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgY3JlYXRlUHJveHlXb3JrZXIhKCldO1xyXG4gIH1cclxuXHJcbiAgLy8gT3RoZXJ3aXNlLCBuZWVkIHRvIHByZWxvYWRcclxuICBjb25zdCB1cmwgPSBhd2FpdCBwcmVsb2FkKHNjcmlwdFNyYyk7XHJcbiAgcmV0dXJuIFt1cmwsIGNyZWF0ZVByb3h5V29ya2VyISh1cmwpXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgZW1iZWRkZWQgV2ViQXNzZW1ibHkgbW9kdWxlLlxyXG4gKlxyXG4gKiBUaGlzIGlzIG9ubHkgYXZhaWxhYmxlIGluIEVTTSBhbmQgd2hlbiBlbWJlZGRpbmcgaXMgbm90IGRpc2FibGVkLlxyXG4gKi9cclxuY29uc3QgZW1iZWRkZWRXYXNtTW9kdWxlOiBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPiB8IHVuZGVmaW5lZCA9XHJcbiAgQlVJTERfREVGUy5JU19FU00gJiYgQlVJTERfREVGUy5FTkFCTEVfQlVORExFX1dBU01fSlNcclxuICAgID8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcclxuICAgICAgcmVxdWlyZShcclxuICAgICAgICAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVBcclxuICAgICAgICAgID8gJy4uLy4uL2Rpc3Qvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qcydcclxuICAgICAgICAgIDogIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFVcclxuICAgICAgICAgICAgPyAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lm1qcydcclxuICAgICAgICAgICAgOiAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qcycsXHJcbiAgICAgICkuZGVmYXVsdFxyXG4gICAgOiB1bmRlZmluZWQ7XHJcblxyXG4vKipcclxuICogSW1wb3J0IHRoZSBXZWJBc3NlbWJseSBtb2R1bGUuXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XHJcbiAqIDEuIElmIHRoZSBlbWJlZGRlZCBtb2R1bGUgZXhpc3RzIGFuZCBubyBjdXN0b20gVVJMIGlzIHNwZWNpZmllZCwgdXNlIHRoZSBlbWJlZGRlZCBtb2R1bGUuXHJcbiAqIDIuIElmIGEgcHJlbG9hZCBpcyBuZWVkZWQsIGl0IHdpbGwgcHJlbG9hZCB0aGUgbW9kdWxlIGFuZCByZXR1cm4gdGhlIG9iamVjdCBVUkwuXHJcbiAqIDMuIE90aGVyd2lzZSwgaXQgd2lsbCBwZXJmb3JtIGEgZHluYW1pYyBpbXBvcnQgb2YgdGhlIG1vZHVsZS5cclxuICpcclxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIDIgZWxlbWVudHM6XHJcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxyXG4gKiAgICAgICAgICAgIC0gVGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUsIHdoaWNoIGlzIGEgZmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIFdlYkFzc2VtYmx5IG1vZHVsZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbXBvcnRXYXNtTW9kdWxlID0gYXN5bmMgKFxyXG4gIHVybE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgcHJlZml4T3ZlcnJpZGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICBpc011bHRpVGhyZWFkZWQ6IGJvb2xlYW4sXHJcbiAgaXNXYXNtT3ZlcnJpZGRlbjogYm9vbGVhbixcclxuKTogUHJvbWlzZTxbdW5kZWZpbmVkIHwgc3RyaW5nLCBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPl0+ID0+IHtcclxuICAvL1xyXG4gIC8vIENoZWNrIGlmIHdlIHNob3VsZCB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZS5cclxuICAvL1xyXG5cclxuICAvLyBUbyB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZSwgaXQgc2hvdWxkIGJlIGF2YWlsYWJsZSwgYW5kIG5vIFVSTCBvdmVycmlkZSBvciBwcmVmaXggb3ZlcnJpZGUgc2hvdWxkIGJlIHNwZWNpZmllZC5cclxuICBsZXQgdXNlRW1iZWRkZWRNb2R1bGUgPSBlbWJlZGRlZFdhc21Nb2R1bGUgJiYgISh1cmxPdmVycmlkZSB8fCBwcmVmaXhPdmVycmlkZSk7XHJcbiAgaWYgKHVzZUVtYmVkZGVkTW9kdWxlKSB7XHJcbiAgICBpZiAoIXNjcmlwdFNyYykge1xyXG4gICAgICAvLyBubyBVUkwgaW5mbyBhdmFpbGFibGUuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIE5vdGU6IHdoZW4gdGhlIGVtYmVkZGVkIG1vZHVsZSBpcyBhdmFpbGFibGUsIGl0IG1lYW5zIHRoZSBjdXJyZW50IHNjcmlwdCBpcyBFU00uIFVzdWFsbHksIGluIEVTTSwgdGhlXHJcbiAgICAgIC8vIGBpbXBvcnQubWV0YS51cmxgIGlzIGF2YWlsYWJsZS4gQnV0IGluIHNvbWUgY2FzZXMgKGVnLiBDbG91ZGZsYXJlIFdvcmtlcnMpLCB0aGUgdmFsdWUgb2YgYGltcG9ydC5tZXRhLnVybGBcclxuICAgICAgLy8gY2FuIGJlIGBudWxsYCBvciBgdW5kZWZpbmVkYC4gSW4gdGhpcyBjYXNlLCB3ZSBjYW4gb25seSBsb2FkIHRoZSBlbWJlZGRlZCBtb2R1bGUgd2hlbjpcclxuICAgICAgLy9cclxuICAgICAgLy8gMS4gVGhlIFdlYkFzc2VtYmx5IG1vZHVsZSBiaW5hcnkgaXMgb3ZlcnJpZGRlbjpcclxuICAgICAgLy8gICAgYGBganNcclxuICAgICAgLy8gICAgZW52Lndhc20ud2FzbVBhdGhzID0gdW5kZWZpbmVkOyAgLy8gb3Igbm90IHNwZWNpZmllZFxyXG4gICAgICAvLyAgICBlbnYud2FzbS53YXNtQmluYXJ5ID0gLyogYSBVaW50OEFycmF5IGNvbnRhaW5pbmcgdGhlIFdlYkFzc2VtYmx5IGJpbmFyeSAqLztcclxuICAgICAgLy8gICAgYGBgXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIDIuIFRoZSBcIi53YXNtXCIgb25seSBpcyBvdmVycmlkZGVuLlxyXG4gICAgICAvLyAgICBgYGBqc1xyXG4gICAgICAvLyAgICBlbnYud2FzbS53YXNtUGF0aHMgPSB7IHdhc206IC8qIFVSTCBvZiB0aGUgLndhc20gZmlsZSAqLyB9O1xyXG4gICAgICAvLyAgICBgYGBcclxuICAgICAgLy9cclxuICAgICAgaWYgKGlzV2FzbU92ZXJyaWRkZW4gJiYgIWlzTXVsdGlUaHJlYWRlZCkge1xyXG4gICAgICAgIHVzZUVtYmVkZGVkTW9kdWxlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBkZXRlcm1pbmUgdGhlIHNjcmlwdCBzb3VyY2UgVVJMLicpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZiB0aGUgc2NyaXB0IHNvdXJjZSBpcyBhdmFpbGFibGUsIHdlIGNhbiBjaGVjayBpZiBpdCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cclxuICAgICAgdXNlRW1iZWRkZWRNb2R1bGUgPSBpc1NhbWVPcmlnaW4oc2NyaXB0U3JjKTtcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHVzZUVtYmVkZGVkTW9kdWxlKSB7XHJcbiAgICByZXR1cm4gW3VuZGVmaW5lZCwgZW1iZWRkZWRXYXNtTW9kdWxlIV07XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHdhc21Nb2R1bGVGaWxlbmFtZSA9ICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUFxyXG4gICAgICA/ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzJ1xyXG4gICAgICA6ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVXHJcbiAgICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5hc3luY2lmeS5tanMnXHJcbiAgICAgICAgOiAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5tanMnO1xyXG4gICAgY29uc3Qgd2FzbU1vZHVsZVVybCA9IHVybE92ZXJyaWRlID8/IG5vcm1hbGl6ZVVybCh3YXNtTW9kdWxlRmlsZW5hbWUsIHByZWZpeE92ZXJyaWRlKTtcclxuICAgIC8vIG5lZWQgdG8gcHJlbG9hZCBpZiBhbGwgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XHJcbiAgICAvLyAxLiBub3QgaW4gTm9kZS5qcy5cclxuICAgIC8vICAgIC0gTm9kZS5qcyBkb2VzIG5vdCBoYXZlIHRoZSBzYW1lIG9yaWdpbiBwb2xpY3kgZm9yIGNyZWF0aW5nIHdvcmtlcnMuXHJcbiAgICAvLyAyLiBtdWx0aS10aHJlYWRlZCBpcyBlbmFibGVkLlxyXG4gICAgLy8gICAgLSBJZiBtdWx0aS10aHJlYWRlZCBpcyBkaXNhYmxlZCwgbm8gd29ya2VyIHdpbGwgYmUgY3JlYXRlZC4gU28gd2UgZG9uJ3QgbmVlZCB0byBwcmVsb2FkIHRoZSBtb2R1bGUuXHJcbiAgICAvLyAzLiB0aGUgYWJzb2x1dGUgVVJMIGlzIGF2YWlsYWJsZS5cclxuICAgIC8vICAgIC0gSWYgdGhlIGFic29sdXRlIFVSTCBpcyBmYWlsZWQgdG8gYmUgY3JlYXRlZCwgdGhlIG9yaWdpbiBjYW5ub3QgYmUgZGV0ZXJtaW5lZC4gSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIG5vdFxyXG4gICAgLy8gICAgcHJlbG9hZCB0aGUgbW9kdWxlLlxyXG4gICAgLy8gNC4gdGhlIHdvcmtlciBVUkwgaXMgbm90IGZyb20gdGhlIHNhbWUgb3JpZ2luLlxyXG4gICAgLy8gICAgLSBJZiB0aGUgd29ya2VyIFVSTCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbiwgd2UgY2FuIGNyZWF0ZSB0aGUgd29ya2VyIGRpcmVjdGx5LlxyXG4gICAgY29uc3QgbmVlZFByZWxvYWQgPSAhaXNOb2RlICYmIGlzTXVsdGlUaHJlYWRlZCAmJiB3YXNtTW9kdWxlVXJsICYmICFpc1NhbWVPcmlnaW4od2FzbU1vZHVsZVVybCwgcHJlZml4T3ZlcnJpZGUpO1xyXG4gICAgY29uc3QgdXJsID0gbmVlZFByZWxvYWRcclxuICAgICAgPyBhd2FpdCBwcmVsb2FkKHdhc21Nb2R1bGVVcmwpXHJcbiAgICAgIDogKHdhc21Nb2R1bGVVcmwgPz8gZmFsbGJhY2tVcmwod2FzbU1vZHVsZUZpbGVuYW1lLCBwcmVmaXhPdmVycmlkZSkpO1xyXG4gICAgcmV0dXJuIFtuZWVkUHJlbG9hZCA/IHVybCA6IHVuZGVmaW5lZCwgYXdhaXQgZHluYW1pY0ltcG9ydERlZmF1bHQ8RW1zY3JpcHRlbk1vZHVsZUZhY3Rvcnk8T3J0V2FzbU1vZHVsZT4+KHVybCldO1xyXG4gIH1cclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBFbnYgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTW9kdWxlIH0gZnJvbSAnLi93YXNtLXR5cGVzJztcclxuaW1wb3J0IHsgaW1wb3J0V2FzbU1vZHVsZSwgaW5mZXJXYXNtUGF0aFByZWZpeEZyb21TY3JpcHRTcmMgfSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcclxuXHJcbmxldCB3YXNtOiBPcnRXYXNtTW9kdWxlIHwgdW5kZWZpbmVkO1xyXG5sZXQgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxubGV0IGluaXRpYWxpemluZyA9IGZhbHNlO1xyXG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xyXG5cclxuY29uc3QgaXNNdWx0aVRocmVhZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICAvLyBJZiAnU2hhcmVkQXJyYXlCdWZmZXInIGlzIG5vdCBhdmFpbGFibGUsIFdlYkFzc2VtYmx5IHRocmVhZHMgd2lsbCBub3Qgd29yay5cclxuICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIFRlc3QgZm9yIHRyYW5zZmVyYWJpbGl0eSBvZiBTQUJzIChmb3IgYnJvd3NlcnMuIG5lZWRlZCBmb3IgRmlyZWZveClcclxuICAgIC8vIGh0dHBzOi8vZ3JvdXBzLmdvb2dsZS5jb20vZm9ydW0vIyFtc2cvbW96aWxsYS5kZXYucGxhdGZvcm0vSUhrQlpsSEVUcEEvZHdzTU5jaFdFUUFKXHJcbiAgICBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBuZXcgTWVzc2FnZUNoYW5uZWwoKS5wb3J0MS5wb3N0TWVzc2FnZShuZXcgU2hhcmVkQXJyYXlCdWZmZXIoMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IHRocmVhZHMgY2FwYWJpbGl0eSAoZm9yIGJvdGggYnJvd3NlcnMgYW5kIE5vZGUuanMpXHJcbiAgICAvLyBUaGlzIHR5cGVkIGFycmF5IGlzIGEgV2ViQXNzZW1ibHkgcHJvZ3JhbSBjb250YWluaW5nIHRocmVhZGVkIGluc3RydWN0aW9ucy5cclxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShcclxuICAgICAgbmV3IFVpbnQ4QXJyYXkoW1xyXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNCwgMSwgOTYsIDAsIDAsIDMsIDIsIDEsIDAsIDUsIDQsIDEsIDMsIDEsIDEsIDEwLCAxMSwgMSwgOSwgMCwgNjUsIDAsIDI1NCwgMTYsXHJcbiAgICAgICAgMiwgMCwgMjYsIDExLFxyXG4gICAgICBdKSxcclxuICAgICk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGlzU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgU0lNRCBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcclxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgU0lNRCBpbnN0cnVjdGlvbnMuXHJcblxyXG4gICAgLy8gVGhlIGJpbmFyeSBkYXRhIGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgY29kZSBieSB3YXQyd2FzbTpcclxuICAgIC8vXHJcbiAgICAvLyAobW9kdWxlXHJcbiAgICAvLyAgICh0eXBlICR0MCAoZnVuYykpXHJcbiAgICAvLyAgIChmdW5jICRmMCAodHlwZSAkdDApXHJcbiAgICAvLyAgICAgKGRyb3BcclxuICAgIC8vICAgICAgIChpMzJ4NC5kb3RfaTE2eDhfc1xyXG4gICAgLy8gICAgICAgICAoaTh4MTYuc3BsYXRcclxuICAgIC8vICAgICAgICAgICAoaTMyLmNvbnN0IDApKVxyXG4gICAgLy8gICAgICAgICAodjEyOC5jb25zdCBpMzJ4NCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwKSkpKSlcclxuXHJcbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXHJcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcclxuICAgICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsIDI4LCAwLCA2NSwgMCwgMjUzLCAxNSwgMjUzLCAxMiwgMCwgMCwgMCxcclxuICAgICAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAyNTMsIDE4NiwgMSwgMjYsIDExLFxyXG4gICAgICBdKSxcclxuICAgICk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGlzUmVsYXhlZFNpbWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIFRlc3QgZm9yIFdlYkFzc2VtYmx5IFJlbGF4ZWQgU0lNRCBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcclxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgUmVsYXhlZCBTSU1EIGluc3RydWN0aW9ucy5cclxuXHJcbiAgICAvLyBUaGUgYmluYXJ5IGRhdGEgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIGZvbGxvd2luZyBjb2RlIGJ5IHdhdDJ3YXNtOlxyXG4gICAgLy8gKG1vZHVsZVxyXG4gICAgLy8gICAoZnVuYyAocmVzdWx0IHYxMjgpXHJcbiAgICAvLyAgICAgIGkzMi5jb25zdCAxXHJcbiAgICAvLyAgICAgIGk4eDE2LnNwbGF0XHJcbiAgICAvLyAgICAgIGkzMi5jb25zdCAyXHJcbiAgICAvLyAgICAgIGk4eDE2LnNwbGF0XHJcbiAgICAvLyAgICAgIGkzMi5jb25zdCAzXHJcbiAgICAvLyAgICAgIGk4eDE2LnNwbGF0XHJcbiAgICAvLyAgICAgIGkzMng0LnJlbGF4ZWRfZG90X2k4eDE2X2k3eDE2X2FkZF9zXHJcbiAgICAvLyAgIClcclxuICAgIC8vICApXHJcbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXHJcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcclxuICAgICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDUsIDEsIDk2LCAwLCAxLCAxMjMsIDMsIDIsIDEsIDAsIDEwLCAxOSwgMSwgMTcsIDAsIDY1LCAxLCAyNTMsIDE1LCA2NSwgMiwgMjUzLFxyXG4gICAgICAgIDE1LCA2NSwgMywgMjUzLCAxNSwgMjUzLCAxNDcsIDIsIDExLFxyXG4gICAgICBdKSxcclxuICAgICk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0aWFsaXplV2ViQXNzZW1ibHkgPSBhc3luYyAoZmxhZ3M6IEVudi5XZWJBc3NlbWJseUZsYWdzKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgaWYgKGluaXRpYWxpemVkKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfVxyXG4gIGlmIChpbml0aWFsaXppbmcpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIm11bHRpcGxlIGNhbGxzIHRvICdpbml0aWFsaXplV2ViQXNzZW1ibHkoKScgZGV0ZWN0ZWQuXCIpO1xyXG4gIH1cclxuICBpZiAoYWJvcnRlZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicHJldmlvdXMgY2FsbCB0byAnaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KCknIGZhaWxlZC5cIik7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xyXG5cclxuICAvLyB3YXNtIGZsYWdzIGFyZSBhbHJlYWR5IGluaXRpYWxpemVkXHJcbiAgY29uc3QgdGltZW91dCA9IGZsYWdzLmluaXRUaW1lb3V0ITtcclxuICBsZXQgbnVtVGhyZWFkcyA9IGZsYWdzLm51bVRocmVhZHMhO1xyXG5cclxuICAvLyBlbnN1cmUgU0lNRCBpcyBzdXBwb3J0ZWRcclxuICBpZiAoZmxhZ3Muc2ltZCA9PT0gZmFsc2UpIHtcclxuICAgIC8vIHNraXAgU0lNRCBmZWF0dXJlIGNoZWNraW5nIGFzIGl0IGlzIGRpc2FibGVkIGV4cGxpY2l0bHkgYnkgdXNlclxyXG4gIH0gZWxzZSBpZiAoZmxhZ3Muc2ltZCA9PT0gJ3JlbGF4ZWQnKSB7XHJcbiAgICAvLyBjaGVjayBpZiByZWxheGVkIFNJTUQgaXMgc3VwcG9ydGVkXHJcbiAgICBpZiAoIWlzUmVsYXhlZFNpbWRTdXBwb3J0ZWQoKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlbGF4ZWQgV2ViQXNzZW1ibHkgU0lNRCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LicpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoIWlzU2ltZFN1cHBvcnRlZCgpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IFNJTUQgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4nKTtcclxuICB9XHJcblxyXG4gIC8vIGNoZWNrIGlmIG11bHRpLXRocmVhZGluZyBpcyBzdXBwb3J0ZWRcclxuICBjb25zdCBtdWx0aVRocmVhZFN1cHBvcnRlZCA9IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQoKTtcclxuICBpZiAobnVtVGhyZWFkcyA+IDEgJiYgIW11bHRpVGhyZWFkU3VwcG9ydGVkKSB7XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmICFzZWxmLmNyb3NzT3JpZ2luSXNvbGF0ZWQpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICdlbnYud2FzbS5udW1UaHJlYWRzIGlzIHNldCB0byAnICtcclxuICAgICAgICAgIG51bVRocmVhZHMgK1xyXG4gICAgICAgICAgJywgYnV0IHRoaXMgd2lsbCBub3Qgd29yayB1bmxlc3MgeW91IGVuYWJsZSBjcm9zc09yaWdpbklzb2xhdGVkIG1vZGUuICcgK1xyXG4gICAgICAgICAgJ1NlZSBodHRwczovL3dlYi5kZXYvY3Jvc3Mtb3JpZ2luLWlzb2xhdGlvbi1ndWlkZS8gZm9yIG1vcmUgaW5mby4nLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICdXZWJBc3NlbWJseSBtdWx0aS10aHJlYWRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4gJyArICdGYWxsaW5nIGJhY2sgdG8gc2luZ2xlLXRocmVhZGluZy4nLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBzZXQgZmxhZ3MubnVtVGhyZWFkcyB0byAxIHNvIHRoYXQgT3J0SW5pdCgpIHdpbGwgbm90IGNyZWF0ZSBhIGdsb2JhbCB0aHJlYWQgcG9vbC5cclxuICAgIGZsYWdzLm51bVRocmVhZHMgPSBudW1UaHJlYWRzID0gMTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHdhc21QYXRocyA9IGZsYWdzLndhc21QYXRocztcclxuICBjb25zdCB3YXNtUHJlZml4T3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnc3RyaW5nJyA/IHdhc21QYXRocyA6IHVuZGVmaW5lZDtcclxuICBjb25zdCBtanNQYXRoT3ZlcnJpZGVGbGFnID0gKHdhc21QYXRocyBhcyBFbnYuV2FzbUZpbGVQYXRocyk/Lm1qcztcclxuICBjb25zdCBtanNQYXRoT3ZlcnJpZGUgPSAobWpzUGF0aE92ZXJyaWRlRmxhZyBhcyBVUkwpPy5ocmVmID8/IG1qc1BhdGhPdmVycmlkZUZsYWc7XHJcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ud2FzbTtcclxuICBjb25zdCB3YXNtUGF0aE92ZXJyaWRlID0gKHdhc21QYXRoT3ZlcnJpZGVGbGFnIGFzIFVSTCk/LmhyZWYgPz8gd2FzbVBhdGhPdmVycmlkZUZsYWc7XHJcbiAgY29uc3Qgd2FzbUJpbmFyeU92ZXJyaWRlID0gZmxhZ3Mud2FzbUJpbmFyeTtcclxuXHJcbiAgY29uc3QgW29iamVjdFVybCwgb3J0V2FzbUZhY3RvcnldID0gYXdhaXQgaW1wb3J0V2FzbU1vZHVsZShcclxuICAgIG1qc1BhdGhPdmVycmlkZSxcclxuICAgIHdhc21QcmVmaXhPdmVycmlkZSxcclxuICAgIG51bVRocmVhZHMgPiAxLFxyXG4gICAgISF3YXNtQmluYXJ5T3ZlcnJpZGUgfHwgISF3YXNtUGF0aE92ZXJyaWRlLFxyXG4gICk7XHJcblxyXG4gIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3QgdGFza3M6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XHJcblxyXG4gIC8vIHByb21pc2UgZm9yIHRpbWVvdXRcclxuICBpZiAodGltZW91dCA+IDApIHtcclxuICAgIHRhc2tzLnB1c2goXHJcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICB9KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBwcm9taXNlIGZvciBtb2R1bGUgaW5pdGlhbGl6YXRpb25cclxuICB0YXNrcy5wdXNoKFxyXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBjb25maWc6IFBhcnRpYWw8T3J0V2FzbU1vZHVsZT4gPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG51bWJlciBvZiB0aHJlYWRzLiBXZWJBc3NlbWJseSB3aWxsIGNyZWF0ZSAoTW9kdWxlLm51bVRocmVhZHMgLSAxKSB3b3JrZXJzLiBJZiBpdCBpcyAxLCBubyB3b3JrZXIgd2lsbCBiZVxyXG4gICAgICAgICAqIGNyZWF0ZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbnVtVGhyZWFkcyxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh3YXNtQmluYXJ5T3ZlcnJpZGUpIHtcclxuICAgICAgICAvLyBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIFRoaXMgd2lsbCBza2lwIHRoZSB3YXNtIGZpbGUgZmV0Y2hpbmcuXHJcbiAgICAgICAgY29uZmlnLndhc21CaW5hcnkgPSB3YXNtQmluYXJ5T3ZlcnJpZGU7XHJcbiAgICAgIH0gZWxzZSBpZiAod2FzbVBhdGhPdmVycmlkZSB8fCB3YXNtUHJlZml4T3ZlcnJpZGUpIHtcclxuICAgICAgICAvLyBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGxvY2F0ZSB0aGUgV2ViQXNzZW1ibHkgZmlsZS4gVGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZS5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFNpbmNlIEVtc2NyaXB0ZW4gMy4xLjU4LCB0aGlzIGZ1bmN0aW9uIGlzIG9ubHkgY2FsbGVkIGZvciB0aGUgLndhc20gZmlsZS5cclxuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSkgPT4gd2FzbVBhdGhPdmVycmlkZSA/PyB3YXNtUHJlZml4T3ZlcnJpZGUgKyBmaWxlTmFtZTtcclxuICAgICAgfSBlbHNlIGlmIChtanNQYXRoT3ZlcnJpZGUgJiYgbWpzUGF0aE92ZXJyaWRlLmluZGV4T2YoJ2Jsb2I6JykgIT09IDApIHtcclxuICAgICAgICAvLyBpZiBtanMgcGF0aCBpcyBzcGVjaWZpZWQsIHVzZSBpdCBhcyB0aGUgYmFzZSBwYXRoIGZvciB0aGUgLndhc20gZmlsZS5cclxuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSkgPT4gbmV3IFVSTChmaWxlTmFtZSwgbWpzUGF0aE92ZXJyaWRlKS5ocmVmO1xyXG4gICAgICB9IGVsc2UgaWYgKG9iamVjdFVybCkge1xyXG4gICAgICAgIGNvbnN0IGluZmVycmVkV2FzbVBhdGhQcmVmaXggPSBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYygpO1xyXG4gICAgICAgIGlmIChpbmZlcnJlZFdhc21QYXRoUHJlZml4KSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGUgd2FzbSBtb2R1bGUgaXMgcHJlbG9hZGVkLCB1c2UgdGhlIGluZmVycmVkIHdhc20gcGF0aCBhcyB0aGUgYmFzZSBwYXRoIGZvciB0aGUgLndhc20gZmlsZS5cclxuICAgICAgICAgIGNvbmZpZy5sb2NhdGVGaWxlID0gKGZpbGVOYW1lKSA9PiBpbmZlcnJlZFdhc21QYXRoUHJlZml4ICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBvcnRXYXNtRmFjdG9yeShjb25maWcpLnRoZW4oXHJcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgKG1vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICB3YXNtID0gbW9kdWxlO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgaWYgKG9iamVjdFVybCkge1xyXG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBmYWlsZWQgdG8gaW5pdGlhbGl6ZVxyXG4gICAgICAgICh3aGF0KSA9PiB7XHJcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGFib3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgcmVqZWN0KHdoYXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgICB9KSxcclxuICApO1xyXG5cclxuICBhd2FpdCBQcm9taXNlLnJhY2UodGFza3MpO1xyXG5cclxuICBpZiAoaXNUaW1lb3V0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYkFzc2VtYmx5IGJhY2tlbmQgaW5pdGlhbGl6aW5nIGZhaWxlZCBkdWUgdG8gdGltZW91dDogJHt0aW1lb3V0fW1zYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlID0gKCk6IE9ydFdhc21Nb2R1bGUgPT4ge1xyXG4gIGlmIChpbml0aWFsaXplZCAmJiB3YXNtKSB7XHJcbiAgICByZXR1cm4gd2FzbTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgaXMgbm90IGluaXRpYWxpemVkIHlldC4nKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwb3NlID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmIChpbml0aWFsaXplZCAmJiAhaW5pdGlhbGl6aW5nICYmICFhYm9ydGVkKSB7XHJcbiAgICAvLyBUT0RPOiBjdXJyZW50bHkgXCJQVGhyZWFkLnRlcm1pbmF0ZUFsbFRocmVhZHMoKVwiIGlzIG5vdCBleHBvc2VkIGluIHRoZSB3YXNtIG1vZHVsZS5cclxuICAgIC8vICAgICAgIEFuZCB0aGlzIGZ1bmN0aW9uIGlzIG5vdCB5ZXQgY2FsbGVkIGJ5IGFueSBjb2RlLlxyXG4gICAgLy8gICAgICAgSWYgaXQgaXMgbmVlZGVkIGluIHRoZSBmdXR1cmUsIHdlIHNob3VsZCBleHBvc2UgaXQgaW4gdGhlIHdhc20gbW9kdWxlIGFuZCB1bmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsaW5lLlxyXG5cclxuICAgIC8vIHdhc20/LlBUaHJlYWQ/LnRlcm1pbmF0ZUFsbFRocmVhZHMoKTtcclxuICAgIHdhc20gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgYWJvcnRlZCA9IHRydWU7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xyXG4gIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MoZGF0YUxlbmd0aCk7XHJcbiAgd2FzbS5zdHJpbmdUb1VURjgoZGF0YSwgZGF0YU9mZnNldCwgZGF0YUxlbmd0aCk7XHJcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XHJcblxyXG4gIHJldHVybiBkYXRhT2Zmc2V0O1xyXG59O1xyXG5cclxuaW50ZXJmYWNlIEV4dHJhT3B0aW9uc0hhbmRsZXIge1xyXG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9IChcclxuICBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcclxuICBwcmVmaXg6IHN0cmluZyxcclxuICBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcclxuICBoYW5kbGVyOiBFeHRyYU9wdGlvbnNIYW5kbGVyLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xyXG4gICAgaWYgKHNlZW4uaGFzKG9wdGlvbnMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIG9wdGlvbnMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlZW4uYWRkKG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICBjb25zdCBuYW1lID0gcHJlZml4ID8gcHJlZml4ICsga2V5IDoga2V5O1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgbmFtZSArICcuJywgc2VlbiwgaGFuZGxlcik7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlID8gJzEnIDogJzAnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgaGFuZGxlIGV4dHJhIGNvbmZpZyB0eXBlOiAke3R5cGVvZiB2YWx1ZX1gKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVjayB3ZWIgYXNzZW1ibHkgQVBJJ3MgbGFzdCBlcnJvciBhbmQgdGhyb3cgZXJyb3IgaWYgYW55IGVycm9yIG9jY3VycmVkLlxyXG4gKiBAcGFyYW0gbWVzc2FnZSBhIG1lc3NhZ2UgdXNlZCB3aGVuIGFuIGVycm9yIG9jY3VycmVkLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNoZWNrTGFzdEVycm9yID0gKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xyXG4gICAgY29uc3QgcGFyYW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDIgKiBwdHJTaXplKTtcclxuICAgIHdhc20uX09ydEdldExhc3RFcnJvcihwYXJhbXNPZmZzZXQsIHBhcmFtc09mZnNldCArIHB0clNpemUpO1xyXG4gICAgY29uc3QgZXJyb3JDb2RlID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUocGFyYW1zT2Zmc2V0LCBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JykpO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlUG9pbnRlciA9IHdhc20uZ2V0VmFsdWUocGFyYW1zT2Zmc2V0ICsgcHRyU2l6ZSwgJyonKTtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVBvaW50ZXIgPyB3YXNtLlVURjhUb1N0cmluZyhlcnJvck1lc3NhZ2VQb2ludGVyKSA6ICcnO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9ucyB9IGZyb20gJy4vd2FzbS11dGlscyc7XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0UnVuT3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBbbnVtYmVyLCBudW1iZXJbXV0gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcclxuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XHJcblxyXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gIHRyeSB7XHJcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA9IDI7IC8vIERlZmF1bHQgdG8gd2FybmluZ1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHxcclxuICAgICAgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dTZXZlcml0eUxldmVsKSB8fFxyXG4gICAgICBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8XHJcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDRcclxuICAgICkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dTZXZlcml0eUxldmVsfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zPy5sb2dWZXJib3NpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPSAwOyAvLyBEZWZhdWx0IHRvIDBcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XHJcbiAgICBpZiAob3B0aW9ucz8udGFnICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcclxuICAgIH1cclxuXHJcbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcclxuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsISxcclxuICAgICAgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCEsXHJcbiAgICAgICEhcnVuT3B0aW9ucy50ZXJtaW5hdGUhLFxyXG4gICAgICB0YWdEYXRhT2Zmc2V0LFxyXG4gICAgKTtcclxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIHJ1biBvcHRpb25zLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucz8uZXh0cmEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKG9wdGlvbnMuZXh0cmEsICcnLCBuZXcgV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oKSwgKGtleSwgdmFsdWUpID0+IHtcclxuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcclxuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XHJcblxyXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgcnVuIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgIT09IDApIHtcclxuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB9XHJcbiAgICBhbGxvY3MuZm9yRWFjaCgoYWxsb2MpID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB0eXBlIHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9ucyB9IGZyb20gJy4vd2FzbS11dGlscyc7XHJcblxyXG5jb25zdCBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwgPSAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbDogc3RyaW5nIHwgdW5rbm93bik6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChncmFwaE9wdGltaXphdGlvbkxldmVsKSB7XHJcbiAgICBjYXNlICdkaXNhYmxlZCc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnYmFzaWMnOlxyXG4gICAgICByZXR1cm4gMTtcclxuICAgIGNhc2UgJ2V4dGVuZGVkJzpcclxuICAgICAgcmV0dXJuIDI7XHJcbiAgICBjYXNlICdsYXlvdXQnOlxyXG4gICAgICByZXR1cm4gMztcclxuICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIHJldHVybiA5OTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCcgfCAncGFyYWxsZWwnKTogbnVtYmVyID0+IHtcclxuICBzd2l0Y2ggKGV4ZWN1dGlvbk1vZGUpIHtcclxuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIGNhc2UgJ3BhcmFsbGVsJzpcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGV4ZWN1dGlvbiBtb2RlOiAke2V4ZWN1dGlvbk1vZGV9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xyXG4gIGlmICghb3B0aW9ucy5leHRyYSkge1xyXG4gICAgb3B0aW9ucy5leHRyYSA9IHt9O1xyXG4gIH1cclxuICBpZiAoIW9wdGlvbnMuZXh0cmEuc2Vzc2lvbikge1xyXG4gICAgb3B0aW9ucy5leHRyYS5zZXNzaW9uID0ge307XHJcbiAgfVxyXG4gIGNvbnN0IHNlc3Npb24gPSBvcHRpb25zLmV4dHJhLnNlc3Npb24gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuICBpZiAoIXNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSkge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxyXG4gICAgc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5ID0gJzEnO1xyXG4gIH1cclxuXHJcbiAgLy8gaWYgdXNpbmcgSlNFUCB3aXRoIFdlYkdQVSwgYWx3YXlzIGRpc2FibGUgbWVtb3J5IHBhdHRlcm5cclxuICBpZiAoXHJcbiAgICBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxyXG4gICAgb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMuc29tZSgoZXApID0+ICh0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lKSA9PT0gJ3dlYmdwdScpXHJcbiAgKSB7XHJcbiAgICBvcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4gPSBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBhcHBlbmRTZXNzaW9uQ29uZmlnID0gKHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBhbGxvY3M6IG51bWJlcltdKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhrZXksIGFsbG9jcyk7XHJcbiAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xyXG4gIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcclxuICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYXBwZW5kRXBPcHRpb24gPSAoZXBPcHRpb25zOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPiwga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiB2b2lkID0+IHtcclxuICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcclxuICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XHJcbiAgZXBPcHRpb25zLnB1c2goW2tleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldF0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0RXhlY3V0aW9uUHJvdmlkZXJzID0gYXN5bmMgKFxyXG4gIHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsXHJcbiAgZXhlY3V0aW9uUHJvdmlkZXJzOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLkV4ZWN1dGlvblByb3ZpZGVyQ29uZmlnW10sXHJcbiAgYWxsb2NzOiBudW1iZXJbXSxcclxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgZm9yIChjb25zdCBlcCBvZiBleGVjdXRpb25Qcm92aWRlcnMpIHtcclxuICAgIGxldCBlcE5hbWUgPSB0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lO1xyXG4gICAgY29uc3QgZXBPcHRpb25zOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPiA9IFtdO1xyXG5cclxuICAgIC8vIGNoZWNrIEVQIG5hbWVcclxuICAgIHN3aXRjaCAoZXBOYW1lKSB7XHJcbiAgICAgIGNhc2UgJ3dlYm5uJzpcclxuICAgICAgICBlcE5hbWUgPSAnV0VCTk4nO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBjb25zdCB3ZWJubk9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5ORXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICAgICAgICAvLyBjb25zdCBjb250ZXh0ID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OT3B0aW9uc1dpdGhNTENvbnRleHQpPy5jb250ZXh0O1xyXG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcclxuICAgICAgICAgIGlmIChkZXZpY2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsICdkZXZpY2VUeXBlJywgZGV2aWNlVHlwZSwgYWxsb2NzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3dlYmdwdSc6XHJcbiAgICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XHJcbiAgICAgICAgICBlcE5hbWUgPSAnV2ViR1BVJztcclxuICAgICAgICAgIGxldCBjdXN0b21EZXZpY2U6IEdQVURldmljZSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBjdXN0b21PcHRpb25zID0gZXAgYXMgdW5rbm93biBhcyB7IGRldmljZTogR1BVRGV2aWNlIH07XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21PcHRpb25zLmRldmljZSkge1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgR1BVRGV2aWNlICE9PSAndW5kZWZpbmVkJyAmJiBjdXN0b21PcHRpb25zLmRldmljZSBpbnN0YW5jZW9mIEdQVURldmljZSkge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tRGV2aWNlID0gY3VzdG9tT3B0aW9ucy5kZXZpY2U7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgZGV2aWNlIHNldCBpbiBXZWJHUFUgRVAgb3B0aW9ucy4nKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGhhbmRsZSBtb3JlIG9wdGlvbnNcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBpbmZvID0gZ2V0SW5zdGFuY2UoKS53ZWJncHVSZWdpc3RlckRldmljZSEoY3VzdG9tRGV2aWNlKTtcclxuICAgICAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFtkZXZpY2VJZCwgaW5zdGFuY2VIYW5kbGUsIGRldmljZUhhbmRsZV0gPSBpbmZvO1xyXG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdkZXZpY2VJZCcsIGRldmljZUlkLnRvU3RyaW5nKCksIGFsbG9jcyk7XHJcbiAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ3dlYmdwdUluc3RhbmNlJywgaW5zdGFuY2VIYW5kbGUudG9TdHJpbmcoKSwgYWxsb2NzKTtcclxuICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAnd2ViZ3B1RGV2aWNlJywgZGV2aWNlSGFuZGxlLnRvU3RyaW5nKCksIGFsbG9jcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVwTmFtZSA9ICdKUyc7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGVwICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCB3ZWJncHVPcHRpb25zID0gZXAgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnM/LnByZWZlcnJlZExheW91dCkge1xyXG4gICAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCAhPT0gJ05DSFcnICYmIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkhXQycpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgcHJlZmVycmVkTGF5b3V0IG11c3QgYmUgZWl0aGVyICdOQ0hXJyBvciAnTkhXQyc6ICR7d2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXR9YCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsICdwcmVmZXJyZWRMYXlvdXQnLCB3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dCwgYWxsb2NzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2FzbSc6XHJcbiAgICAgIGNhc2UgJ2NwdSc6XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGV4ZWN1dGlvbiBwcm92aWRlcjogJHtlcE5hbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXBOYW1lRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhlcE5hbWUsIGFsbG9jcyk7XHJcbiAgICBjb25zdCBlcE9wdGlvbnNDb3VudCA9IGVwT3B0aW9ucy5sZW5ndGg7XHJcbiAgICBsZXQga2V5c09mZnNldCA9IDA7XHJcbiAgICBsZXQgdmFsdWVzT2Zmc2V0ID0gMDtcclxuICAgIGlmIChlcE9wdGlvbnNDb3VudCA+IDApIHtcclxuICAgICAga2V5c09mZnNldCA9IGdldEluc3RhbmNlKCkuX21hbGxvYyhlcE9wdGlvbnNDb3VudCAqIGdldEluc3RhbmNlKCkuUFRSX1NJWkUpO1xyXG4gICAgICBhbGxvY3MucHVzaChrZXlzT2Zmc2V0KTtcclxuICAgICAgdmFsdWVzT2Zmc2V0ID0gZ2V0SW5zdGFuY2UoKS5fbWFsbG9jKGVwT3B0aW9uc0NvdW50ICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSk7XHJcbiAgICAgIGFsbG9jcy5wdXNoKHZhbHVlc09mZnNldCk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXBPcHRpb25zQ291bnQ7IGkrKykge1xyXG4gICAgICAgIGdldEluc3RhbmNlKCkuc2V0VmFsdWUoa2V5c09mZnNldCArIGkgKiBnZXRJbnN0YW5jZSgpLlBUUl9TSVpFLCBlcE9wdGlvbnNbaV1bMF0sICcqJyk7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2UoKS5zZXRWYWx1ZSh2YWx1ZXNPZmZzZXQgKyBpICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSwgZXBPcHRpb25zW2ldWzFdLCAnKicpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIChhd2FpdCBnZXRJbnN0YW5jZSgpLl9PcnRBcHBlbmRFeGVjdXRpb25Qcm92aWRlcihcclxuICAgICAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSxcclxuICAgICAgICBlcE5hbWVEYXRhT2Zmc2V0LFxyXG4gICAgICAgIGtleXNPZmZzZXQsXHJcbiAgICAgICAgdmFsdWVzT2Zmc2V0LFxyXG4gICAgICAgIGVwT3B0aW9uc0NvdW50LFxyXG4gICAgICApKSAhPT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBhcHBlbmQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX0uYCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFNlc3Npb25PcHRpb25zID0gYXN5bmMgKG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxbbnVtYmVyLCBudW1iZXJbXV0+ID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xyXG4gIGNvbnN0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgY29uc3Qgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gIGFwcGVuZERlZmF1bHRPcHRpb25zKHNlc3Npb25PcHRpb25zKTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwgPSBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwoc2Vzc2lvbk9wdGlvbnMuZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA/PyAnYWxsJyk7XHJcbiAgICBjb25zdCBleGVjdXRpb25Nb2RlID0gZ2V0RXhlY3V0aW9uTW9kZShzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Nb2RlID8/ICdzZXF1ZW50aWFsJyk7XHJcbiAgICBjb25zdCBsb2dJZERhdGFPZmZzZXQgPVxyXG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMubG9nSWQgPT09ICdzdHJpbmcnID8gYWxsb2NXYXNtU3RyaW5nKHNlc3Npb25PcHRpb25zLmxvZ0lkLCBhbGxvY3MpIDogMDtcclxuXHJcbiAgICBjb25zdCBsb2dTZXZlcml0eUxldmVsID0gc2Vzc2lvbk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA/PyAyOyAvLyBEZWZhdWx0IHRvIDIgLSB3YXJuaW5nXHJcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nU2V2ZXJpdHlMZXZlbCkgfHwgbG9nU2V2ZXJpdHlMZXZlbCA8IDAgfHwgbG9nU2V2ZXJpdHlMZXZlbCA+IDQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgc2V2ZXJpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke2xvZ1NldmVyaXR5TGV2ZWx9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbG9nVmVyYm9zaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCA/PyAwOyAvLyBEZWZhdWx0IHRvIDAgLSB2ZXJib3NlXHJcbiAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobG9nVmVyYm9zaXR5TGV2ZWwpIHx8IGxvZ1ZlcmJvc2l0eUxldmVsIDwgMCB8fCBsb2dWZXJib3NpdHlMZXZlbCA+IDQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBsb2cgdmVyYm9zaXR5IGxldmVsIGlzIG5vdCB2YWxpZDogJHtsb2dWZXJib3NpdHlMZXZlbH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0ID1cclxuICAgICAgdHlwZW9mIHNlc3Npb25PcHRpb25zLm9wdGltaXplZE1vZGVsRmlsZVBhdGggPT09ICdzdHJpbmcnXHJcbiAgICAgICAgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCwgYWxsb2NzKVxyXG4gICAgICAgIDogMDtcclxuXHJcbiAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZVNlc3Npb25PcHRpb25zKFxyXG4gICAgICBncmFwaE9wdGltaXphdGlvbkxldmVsLFxyXG4gICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZUNwdU1lbUFyZW5hLFxyXG4gICAgICAhIXNlc3Npb25PcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4sXHJcbiAgICAgIGV4ZWN1dGlvbk1vZGUsXHJcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlUHJvZmlsaW5nLFxyXG4gICAgICAwLFxyXG4gICAgICBsb2dJZERhdGFPZmZzZXQsXHJcbiAgICAgIGxvZ1NldmVyaXR5TGV2ZWwsXHJcbiAgICAgIGxvZ1ZlcmJvc2l0eUxldmVsLFxyXG4gICAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoT2Zmc2V0LFxyXG4gICAgKTtcclxuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSA9PT0gMCkge1xyXG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBzZXNzaW9uIG9wdGlvbnMuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMpIHtcclxuICAgICAgYXdhaXQgc2V0RXhlY3V0aW9uUHJvdmlkZXJzKHNlc3Npb25PcHRpb25zSGFuZGxlLCBzZXNzaW9uT3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMsIGFsbG9jcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGVuYWJsZUdyYXBoQ2FwdHVyZSBtdXN0IGJlIGEgYm9vbGVhbiB2YWx1ZTogJHtzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmV9YCk7XHJcbiAgICAgIH1cclxuICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhcclxuICAgICAgICBzZXNzaW9uT3B0aW9uc0hhbmRsZSxcclxuICAgICAgICAnZW5hYmxlR3JhcGhDYXB0dXJlJyxcclxuICAgICAgICBzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUudG9TdHJpbmcoKSxcclxuICAgICAgICBhbGxvY3MsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmZyZWVEaW1lbnNpb25PdmVycmlkZXMpIHtcclxuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHNlc3Npb25PcHRpb25zLmZyZWVEaW1lbnNpb25PdmVycmlkZXMpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSBuYW1lIG11c3QgYmUgYSBzdHJpbmc6ICR7bmFtZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIodmFsdWUpIHx8IHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZSB2YWx1ZSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXI6ICR7dmFsdWV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcobmFtZSwgYWxsb2NzKTtcclxuICAgICAgICBpZiAod2FzbS5fT3J0QWRkRnJlZURpbWVuc2lvbk92ZXJyaWRlKHNlc3Npb25PcHRpb25zSGFuZGxlLCBuYW1lT2Zmc2V0LCB2YWx1ZSkgIT09IDApIHtcclxuICAgICAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBmcmVlIGRpbWVuc2lvbiBvdmVycmlkZTogJHtuYW1lfSAtICR7dmFsdWV9LmApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5leHRyYSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGl0ZXJhdGVFeHRyYU9wdGlvbnMoc2Vzc2lvbk9wdGlvbnMuZXh0cmEsICcnLCBuZXcgV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oKSwgKGtleSwgdmFsdWUpID0+IHtcclxuICAgICAgICBhcHBlbmRTZXNzaW9uQ29uZmlnKHNlc3Npb25PcHRpb25zSGFuZGxlLCBrZXksIHZhbHVlLCBhbGxvY3MpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChzZXNzaW9uT3B0aW9uc0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVNlc3Npb25PcHRpb25zKHNlc3Npb25PcHRpb25zSGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uIG9wdGlvbnMuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBhbGxvY3MuZm9yRWFjaCgoYWxsb2MpID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG4vLyBhIGR1bW15IHR5cGUgZGVjbGFyYXRpb24gZm9yIEZsb2F0MTZBcnJheSBpbiBjYXNlIGFueSBwb2x5ZmlsbCBpcyBhdmFpbGFibGUuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgY29uc3QgRmxvYXQxNkFycmF5OiBhbnk7XHJcbn1cclxuXHJcbi8vIFRoaXMgZmlsZSBpbmNsdWRlcyBjb21tb24gZGVmaW5pdGlvbnMuIFRoZXkgZG8gTk9UIGhhdmUgZGVwZW5kZW5jeSBvbiB0aGUgV2ViQXNzZW1ibHkgaW5zdGFuY2UuXHJcblxyXG4vKipcclxuICogQ29waWVkIGZyb20gT05OWCBkZWZpbml0aW9uLiBVc2UgdGhpcyB0byBkcm9wIGRlcGVuZGVuY3kgJ29ubnhfcHJvdG8nIHRvIGRlY3JlYXNlIGNvbXBpbGVkIC5qcyBmaWxlIHNpemUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZW51bSBEYXRhVHlwZSB7XHJcbiAgdW5kZWZpbmVkID0gMCxcclxuICBmbG9hdCA9IDEsXHJcbiAgdWludDggPSAyLFxyXG4gIGludDggPSAzLFxyXG4gIHVpbnQxNiA9IDQsXHJcbiAgaW50MTYgPSA1LFxyXG4gIGludDMyID0gNixcclxuICBpbnQ2NCA9IDcsXHJcbiAgc3RyaW5nID0gOCxcclxuICBib29sID0gOSxcclxuICBmbG9hdDE2ID0gMTAsXHJcbiAgZG91YmxlID0gMTEsXHJcbiAgdWludDMyID0gMTIsXHJcbiAgdWludDY0ID0gMTMsXHJcbiAgY29tcGxleDY0ID0gMTQsXHJcbiAgY29tcGxleDEyOCA9IDE1LFxyXG4gIGJmbG9hdDE2ID0gMTYsXHJcblxyXG4gIC8vIDQtYml0IGRhdGEtdHlwZXNcclxuICB1aW50NCA9IDIxLFxyXG4gIGludDQgPSAyMixcclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcCBzdHJpbmcgdGVuc29yIGRhdGEgdG8gZW51bSB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtID0gKHR5cGU6IHN0cmluZyk6IERhdGFUeXBlID0+IHtcclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgJ2ludDgnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50ODtcclxuICAgIGNhc2UgJ3VpbnQ4JzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ4O1xyXG4gICAgY2FzZSAnYm9vbCc6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5ib29sO1xyXG4gICAgY2FzZSAnaW50MTYnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MTY7XHJcbiAgICBjYXNlICd1aW50MTYnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDE2O1xyXG4gICAgY2FzZSAnaW50MzInOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50MzI7XHJcbiAgICBjYXNlICd1aW50MzInOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDMyO1xyXG4gICAgY2FzZSAnZmxvYXQxNic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDE2O1xyXG4gICAgY2FzZSAnZmxvYXQzMic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5mbG9hdDtcclxuICAgIGNhc2UgJ2Zsb2F0NjQnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuZG91YmxlO1xyXG4gICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLnN0cmluZztcclxuICAgIGNhc2UgJ2ludDY0JzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLmludDY0O1xyXG4gICAgY2FzZSAndWludDY0JzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ2NDtcclxuICAgIGNhc2UgJ2ludDQnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50NDtcclxuICAgIGNhc2UgJ3VpbnQ0JzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLnVpbnQ0O1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hcCBlbnVtIHZhbHVlIHRvIHN0cmluZyB0ZW5zb3IgZGF0YVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nID0gKHR5cGVQcm90bzogRGF0YVR5cGUpOiBUZW5zb3IuVHlwZSA9PiB7XHJcbiAgc3dpdGNoICh0eXBlUHJvdG8pIHtcclxuICAgIGNhc2UgRGF0YVR5cGUuaW50ODpcclxuICAgICAgcmV0dXJuICdpbnQ4JztcclxuICAgIGNhc2UgRGF0YVR5cGUudWludDg6XHJcbiAgICAgIHJldHVybiAndWludDgnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5ib29sOlxyXG4gICAgICByZXR1cm4gJ2Jvb2wnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5pbnQxNjpcclxuICAgICAgcmV0dXJuICdpbnQxNic7XHJcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQxNjpcclxuICAgICAgcmV0dXJuICd1aW50MTYnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5pbnQzMjpcclxuICAgICAgcmV0dXJuICdpbnQzMic7XHJcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQzMjpcclxuICAgICAgcmV0dXJuICd1aW50MzInO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDE2OlxyXG4gICAgICByZXR1cm4gJ2Zsb2F0MTYnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5mbG9hdDpcclxuICAgICAgcmV0dXJuICdmbG9hdDMyJztcclxuICAgIGNhc2UgRGF0YVR5cGUuZG91YmxlOlxyXG4gICAgICByZXR1cm4gJ2Zsb2F0NjQnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5zdHJpbmc6XHJcbiAgICAgIHJldHVybiAnc3RyaW5nJztcclxuICAgIGNhc2UgRGF0YVR5cGUuaW50NjQ6XHJcbiAgICAgIHJldHVybiAnaW50NjQnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS51aW50NjQ6XHJcbiAgICAgIHJldHVybiAndWludDY0JztcclxuICAgIGNhc2UgRGF0YVR5cGUuaW50NDpcclxuICAgICAgcmV0dXJuICdpbnQ0JztcclxuICAgIGNhc2UgRGF0YVR5cGUudWludDQ6XHJcbiAgICAgIHJldHVybiAndWludDQnO1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGVQcm90b31gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogZ2V0IHRlbnNvciBzaXplIGluIGJ5dGVzIGJ5IHRoZSBnaXZlbiBkYXRhIHR5cGUgYW5kIGRpbWVuc2lvbnNcclxuICogQHJldHVybnMgc2l6ZSBpbiBpbnRlZ2VyIG9yIHVuZGVmaW5lZCBpZiB0aGUgZGF0YSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWRcclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyA9IChcclxuICBkYXRlVHlwZTogbnVtYmVyLFxyXG4gIGRpbXNPclNpemU6IHJlYWRvbmx5IG51bWJlcltdIHwgbnVtYmVyLFxyXG4pOiBudW1iZXIgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGNvbnN0IGVsZW1lbnRTaXplID0gW1xyXG4gICAgLTEsIC8vIHVuZGVmaW5lZCA9IDBcclxuICAgIDQsIC8vIGZsb2F0ID0gMVxyXG4gICAgMSwgLy8gdWludDggPSAyXHJcbiAgICAxLCAvLyBpbnQ4ID0gM1xyXG4gICAgMiwgLy8gdWludDE2ID0gNFxyXG4gICAgMiwgLy8gaW50MTYgPSA1XHJcbiAgICA0LCAvLyBpbnQzMiA9IDZcclxuICAgIDgsIC8vIGludDY0ID0gN1xyXG4gICAgLTEsIC8vIHN0cmluZyA9IDhcclxuICAgIDEsIC8vIGJvb2wgPSA5XHJcbiAgICAyLCAvLyBmbG9hdDE2ID0gMTBcclxuICAgIDgsIC8vIGRvdWJsZSA9IDExXHJcbiAgICA0LCAvLyB1aW50MzIgPSAxMlxyXG4gICAgOCwgLy8gdWludDY0ID0gMTNcclxuICAgIC0xLCAvLyBjb21wbGV4NjQgPSAxNFxyXG4gICAgLTEsIC8vIGNvbXBsZXgxMjggPSAxNVxyXG4gICAgLTEsIC8vIGJmbG9hdDE2ID0gMTZcclxuICAgIC0xLCAvLyBGTE9BVDhFNE0zRk4gPSAxN1xyXG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTlVaID0gMThcclxuICAgIC0xLCAvLyBGTE9BVDhFNU0yID0gMTlcclxuICAgIC0xLCAvLyBGTE9BVDhFNU0yRk5VWiA9IDIwXHJcbiAgICAwLjUsIC8vIHVpbnQ0ID0gMjFcclxuICAgIDAuNSwgLy8gaW50NCA9IDIyXHJcbiAgXVtkYXRlVHlwZV07XHJcblxyXG4gIGNvbnN0IHNpemUgPSB0eXBlb2YgZGltc09yU2l6ZSA9PT0gJ251bWJlcicgPyBkaW1zT3JTaXplIDogZGltc09yU2l6ZS5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiLCAxKTtcclxuICByZXR1cm4gZWxlbWVudFNpemUgPiAwID8gTWF0aC5jZWlsKHNpemUgKiBlbGVtZW50U2l6ZSkgOiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vKipcclxuICogZ2V0IHR5cGVkIGFycmF5IGNvbnN0cnVjdG9yIGJ5IHRoZSBnaXZlbiB0ZW5zb3IgdHlwZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IChcclxuICB0eXBlOiBUZW5zb3IuVHlwZSxcclxuKTpcclxuICB8IEZsb2F0MzJBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcclxuICB8IEludDhBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50MTZBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBJbnQxNkFycmF5Q29uc3RydWN0b3JcclxuICB8IEludDMyQXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50OEFycmF5Q29uc3RydWN0b3JcclxuICB8IEZsb2F0NjRBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBVaW50MzJBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBCaWdVaW50NjRBcnJheUNvbnN0cnVjdG9yID0+IHtcclxuICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgIGNhc2UgJ2Zsb2F0MTYnOlxyXG4gICAgICAvLyBhbGxvdyBGbG9hdDE2QXJyYXkgcG9seWZpbGwuXHJcbiAgICAgIHJldHVybiB0eXBlb2YgRmxvYXQxNkFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBGbG9hdDE2QXJyYXkuZnJvbSA/IEZsb2F0MTZBcnJheSA6IFVpbnQxNkFycmF5O1xyXG4gICAgY2FzZSAnZmxvYXQzMic6XHJcbiAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XHJcbiAgICBjYXNlICd1aW50OCc6XHJcbiAgICAgIHJldHVybiBVaW50OEFycmF5O1xyXG4gICAgY2FzZSAnaW50OCc6XHJcbiAgICAgIHJldHVybiBJbnQ4QXJyYXk7XHJcbiAgICBjYXNlICd1aW50MTYnOlxyXG4gICAgICByZXR1cm4gVWludDE2QXJyYXk7XHJcbiAgICBjYXNlICdpbnQxNic6XHJcbiAgICAgIHJldHVybiBJbnQxNkFycmF5O1xyXG4gICAgY2FzZSAnaW50MzInOlxyXG4gICAgICByZXR1cm4gSW50MzJBcnJheTtcclxuICAgIGNhc2UgJ2Jvb2wnOlxyXG4gICAgICByZXR1cm4gVWludDhBcnJheTtcclxuICAgIGNhc2UgJ2Zsb2F0NjQnOlxyXG4gICAgICByZXR1cm4gRmxvYXQ2NEFycmF5O1xyXG4gICAgY2FzZSAndWludDMyJzpcclxuICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xyXG4gICAgY2FzZSAnaW50NjQnOlxyXG4gICAgICByZXR1cm4gQmlnSW50NjRBcnJheTtcclxuICAgIGNhc2UgJ3VpbnQ2NCc6XHJcbiAgICAgIHJldHVybiBCaWdVaW50NjRBcnJheTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZTogJHt0eXBlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYXAgc3RyaW5nIGxvZyBsZXZlbCB0byBpbnRlZ2VyIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9nTGV2ZWxTdHJpbmdUb0VudW0gPSAobG9nTGV2ZWw/OiAndmVyYm9zZScgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2ZhdGFsJyk6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xyXG4gICAgY2FzZSAndmVyYm9zZSc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnaW5mbyc6XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgY2FzZSAnd2FybmluZyc6XHJcbiAgICAgIHJldHVybiAyO1xyXG4gICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICByZXR1cm4gMztcclxuICAgIGNhc2UgJ2ZhdGFsJzpcclxuICAgICAgcmV0dXJuIDQ7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRlbnNvciB0eXBlIGlzIHN1cHBvcnRlZCBieSBHUFUgYnVmZmVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0+XHJcbiAgdHlwZSA9PT0gJ2Zsb2F0MzInIHx8XHJcbiAgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8XHJcbiAgdHlwZSA9PT0gJ2ludDMyJyB8fFxyXG4gIHR5cGUgPT09ICdpbnQ2NCcgfHxcclxuICB0eXBlID09PSAndWludDMyJyB8fFxyXG4gIHR5cGUgPT09ICd1aW50OCcgfHxcclxuICB0eXBlID09PSAnYm9vbCcgfHxcclxuICB0eXBlID09PSAndWludDQnIHx8XHJcbiAgdHlwZSA9PT0gJ2ludDQnO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRlbnNvciB0eXBlIGlzIHN1cHBvcnRlZCBieSBXZWJOTiBNTFRlbnNvclxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMgPT5cclxuICB0eXBlID09PSAnZmxvYXQzMicgfHxcclxuICB0eXBlID09PSAnZmxvYXQxNicgfHxcclxuICB0eXBlID09PSAnaW50MzInIHx8XHJcbiAgdHlwZSA9PT0gJ2ludDY0JyB8fFxyXG4gIHR5cGUgPT09ICd1aW50MzInIHx8XHJcbiAgdHlwZSA9PT0gJ3VpbnQ2NCcgfHxcclxuICB0eXBlID09PSAnaW50OCcgfHxcclxuICB0eXBlID09PSAndWludDgnIHx8XHJcbiAgdHlwZSA9PT0gJ2Jvb2wnIHx8XHJcbiAgdHlwZSA9PT0gJ3VpbnQ0JyB8fFxyXG4gIHR5cGUgPT09ICdpbnQ0JztcclxuXHJcbi8qKlxyXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSA9IChsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbik6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChsb2NhdGlvbikge1xyXG4gICAgY2FzZSAnbm9uZSc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnY3B1JzpcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcclxuICAgICAgcmV0dXJuIDI7XHJcbiAgICBjYXNlICd0ZXh0dXJlJzpcclxuICAgICAgcmV0dXJuIDM7XHJcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcclxuICAgICAgcmV0dXJuIDQ7XHJcbiAgICBjYXNlICdtbC10ZW5zb3InOlxyXG4gICAgICByZXR1cm4gNTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSBsb2NhdGlvbjogJHtsb2NhdGlvbn1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcclxuICovXHJcbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25FbnVtVG9TdHJpbmcgPSAobG9jYXRpb246IG51bWJlcik6IFRlbnNvci5EYXRhTG9jYXRpb24gfCB1bmRlZmluZWQgPT5cclxuICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlcicsICdtbC10ZW5zb3InXSBhcyBjb25zdClbbG9jYXRpb25dO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgYSBmaWxlIGludG8gYSBVaW50OEFycmF5LlxyXG4gKlxyXG4gKiBAcGFyYW0gZmlsZSAtIHRoZSBmaWxlIHRvIGxvYWQuIENhbiBiZSBhIFVSTC9wYXRoLCBhIEJsb2IsIGFuIEFycmF5QnVmZmVyLCBvciBhIFVpbnQ4QXJyYXkuXHJcbiAqIEByZXR1cm5zIGEgVWludDhBcnJheSBjb250YWluaW5nIHRoZSBmaWxlIGRhdGEuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSBhc3luYyAoZmlsZTogc3RyaW5nIHwgQmxvYiB8IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFVpbnQ4QXJyYXk+ID0+IHtcclxuICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIE5vZGUuanNcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IHJlYWRGaWxlIH0gPSByZXF1aXJlKCdub2RlOmZzL3Byb21pc2VzJyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IHJlYWRGaWxlKGZpbGUpKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmIChlLmNvZGUgPT09ICdFUlJfRlNfRklMRV9UT09fTEFSR0UnKSB7XHJcbiAgICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIGZzLmNyZWF0ZVJlYWRTdHJlYW0gaW5zdGVhZFxyXG4gICAgICAgICAgY29uc3QgeyBjcmVhdGVSZWFkU3RyZWFtIH0gPSByZXF1aXJlKCdub2RlOmZzJyk7XHJcbiAgICAgICAgICBjb25zdCBzdHJlYW0gPSBjcmVhdGVSZWFkU3RyZWFtKGZpbGUpO1xyXG4gICAgICAgICAgY29uc3QgY2h1bmtzOiBVaW50OEFycmF5W10gPSBbXTtcclxuICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBsb2FkIGZpbGUgaW50byBBcnJheUJ1ZmZlciBpbiBicm93c2Vyc1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZpbGUpO1xyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX1gKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb250ZW50TGVuZ3RoSGVhZGVyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtTGVuZ3RoJyk7XHJcbiAgICAgIGNvbnN0IGZpbGVTaXplID0gY29udGVudExlbmd0aEhlYWRlciA/IHBhcnNlSW50KGNvbnRlbnRMZW5ndGhIZWFkZXIsIDEwKSA6IDA7XHJcbiAgICAgIGlmIChmaWxlU2l6ZSA8IDEwNzM3NDE4MjQgLyogMUdCICovKSB7XHJcbiAgICAgICAgLy8gd2hlbiBDb250ZW50LUxlbmd0aCBoZWFkZXIgaXMgbm90IHNldCwgd2UgY2Fubm90IGRldGVybWluZSB0aGUgZmlsZSBzaXplLiBXZSBhc3N1bWUgaXQgaXMgc21hbGwgZW5vdWdoIHRvXHJcbiAgICAgICAgLy8gbG9hZCBpbnRvIG1lbW9yeS5cclxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZmlsZSBpcyB0b28gbGFyZ2UsIHVzZSBzdHJlYW0gaW5zdGVhZFxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuYm9keSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX0sIG5vIHJlc3BvbnNlIGJvZHkuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XHJcblxyXG4gICAgICAgIGxldCBidWZmZXI7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIHRyeSB0byBjcmVhdGUgQXJyYXlCdWZmZXIgZGlyZWN0bHlcclxuICAgICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihmaWxlU2l6ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIHVzZSBXZWJBc3NlbWJseSBNZW1vcnkgdG8gYWxsb2NhdGUgbGFyZ2VyIEFycmF5QnVmZmVyXHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKGZpbGVTaXplIC8gNjU1MzYpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSBuZXcgV2ViQXNzZW1ibHkuTWVtb3J5KHsgaW5pdGlhbDogcGFnZXMsIG1heGltdW06IHBhZ2VzIH0pLmJ1ZmZlcjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XHJcbiAgICAgICAgICBpZiAoZG9uZSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGNodW5rU2l6ZSA9IHZhbHVlLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICBjb25zdCBjaHVuayA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBjaHVua1NpemUpO1xyXG4gICAgICAgICAgY2h1bmsuc2V0KHZhbHVlKTtcclxuICAgICAgICAgIG9mZnNldCArPSBjaHVua1NpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWZmZXIsIDAsIGZpbGVTaXplKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoZmlsZSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShhd2FpdCBmaWxlLmFycmF5QnVmZmVyKCkpO1xyXG4gIH0gZWxzZSBpZiAoZmlsZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcclxuICAgIHJldHVybiBmaWxlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZmlsZSk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8vIFdlYk5OIEFQSSBjdXJyZW50bHkgZG9lcyBub3QgaGF2ZSBhIFR5cGVTY3JpcHQgZGVmaW5pdGlvbiBmaWxlLiBUaGlzIGZpbGUgaXMgYSB3b3JrYXJvdW5kIHdpdGggdHlwZXMgZ2VuZXJhdGVkIGZyb21cclxuLy8gV2ViTk4gQVBJIHNwZWNpZmljYXRpb24uXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJtYWNoaW5lbGVhcm5pbmcvd2Vibm4vaXNzdWVzLzY3N1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianNlcC93ZWJubi93ZWJubi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCB7IEVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgVGVuc29yLCBUUkFDRV9FVkVOVF9CRUdJTiwgVFJBQ0VfRVZFTlRfRU5EIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXHJcbiAgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLFxyXG4gIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhLFxyXG4gIFRlbnNvck1ldGFkYXRhLFxyXG59IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xyXG5pbXBvcnQgeyBzZXRSdW5PcHRpb25zIH0gZnJvbSAnLi9ydW4tb3B0aW9ucyc7XHJcbmltcG9ydCB7IHNldFNlc3Npb25PcHRpb25zIH0gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQge1xyXG4gIGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzLFxyXG4gIGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSxcclxuICBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsXHJcbiAgaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUsXHJcbiAgbG9nTGV2ZWxTdHJpbmdUb0VudW0sXHJcbiAgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcsXHJcbiAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0sXHJcbiAgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yLFxyXG59IGZyb20gJy4vd2FzbS1jb21tb24nO1xyXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciB9IGZyb20gJy4vd2FzbS11dGlscyc7XHJcbmltcG9ydCB7IGxvYWRGaWxlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWxvYWQtZmlsZSc7XHJcblxyXG4vLyAjcmVnaW9uIEluaXRpYWxpemF0aW9uc1xyXG5cclxuLyoqXHJcbiAqIFRoZXJlIGFyZSA0IGRpZmZlcmVudCBcImluaXRpYWxpemF0aW9uXCIgc3RlcHMgZm9yIE9SVC4gVGhleSBoYXBwZW4gaW4gZGlmZmVyZW50IHBsYWNlcyBhbmQgZGlmZmVyZW50IHRpbWUuXHJcbiAqXHJcbiAqIDEuIEphdmFTY3JpcHQgaW5pdGlhbGl6YXRpb24gZm9yIG9ubnhydW50aW1lLWNvbW1vbiBhbmQgb25ueHJ1bnRpbWUtd2ViLlxyXG4gKiAgICBUaGlzIGlzIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBzdGVwLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBjYWxscyBvbm54cnVudGltZS1jb21tb24ncyByZWdpc3RlckJhY2tlbmQoKVxyXG4gKiBmdW5jdGlvbiBtdWx0aXBsZSB0aW1lcyB0byByZWdpc3RlciBhbGwgdGhlIGF2YWlsYWJsZSBiYWNrZW5kcy4gVGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uIGlzIHZlcnkgZmFzdC4gSXQgb25seVxyXG4gKiByZWdpc3RlcnMgdGhlIGJhY2tlbmQgbmFtZSB3aXRoIHRoZSB1bmluaXRpYWxpemVkIGJhY2tlbmQgb2JqZWN0LiBObyBoZWF2eSBpbml0aWFsaXphdGlvbiBpcyBkb25lIGluIHRoaXMgc3RlcC5cclxuICogICAgUmVmZXIgdG8gd2ViL2xpYi9pbmRleC50cyBmb3IgdGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uLlxyXG4gKlxyXG4gKiAyLiBXZWJBc3NlbWJseSBhcnRpZmFjdCBpbml0aWFsaXphdGlvbi5cclxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYW55IHJlZ2lzdGVyZWQgd2FzbSBiYWNrZW5kIGlzIHVzZWQgZm9yIHRoZSBmaXJzdCB0aW1lIChpZS4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpc1xyXG4gKiBjYWxsZWQpLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZSBmb2xsb3dpbmdzOlxyXG4gKiAgICAgLSBjcmVhdGUgYSBwcm94eSB3b3JrZXIgYW5kIG1ha2Ugc3VyZSB0aGUgcHJveHkgd29ya2VyIGlzIHJlYWR5IHRvIHJlY2VpdmUgbWVzc2FnZXMsIGlmIHByb3h5IGlzIGVuYWJsZWQuXHJcbiAqICAgICAtIHBlcmZvcm0gZmVhdHVyZSBkZXRlY3Rpb24sIGxvY2F0ZSBjb3JyZWN0IFdlYkFzc2VtYmx5IGFydGlmYWN0IHBhdGggYW5kIGNhbGwgdGhlIEVtc2NyaXB0ZW4gZ2VuZXJhdGVkXHJcbiAqIEphdmFTY3JpcHQgY29kZSB0byBpbml0aWFsaXplIHRoZSBXZWJBc3NlbWJseSBydW50aW1lLlxyXG4gKiAgICAgICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LXdhc20nLlxyXG4gKiAgICAgICAgIC0gZG93bmxvYWRpbmcgdGhlICdvcnQtd2FzbXsuLi59Lndhc20nIGZpbGUgaXMgZG9uZSBpbiB0aGlzIHN0ZXAuXHJcbiAqICAgICAgICAgLSBpZiBtdWx0aS10aHJlYWQgaXMgZW5hYmxlZCwgb25lIG9yIG1vcmUgd2Vid29ya2VyIHdpbGwgYmUgY3JlYXRlZCB0byBpbml0aWFsaXplIHRoZSBQVGhyZWFkIHRocmVhZHBvb2wuXHJcbiAqXHJcbiAqIDMuIE9SVCBlbnZpcm9ubWVudCBpbml0aWFsaXphdGlvbi5cclxuICogICAgVGhpcyBoYXBwZW5zIGFmdGVyIHN0ZXAgMi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgcGVyZm9ybXMgT05OWCBSdW50aW1lIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxyXG4gKiBGdW5jdGlvbiBgX09ydEluaXQoKWAgaXMgY2FsbGVkIGluIHRoaXMgc3RlcC5cclxuICogICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LW9ydCcuXHJcbiAqICAgICAtIGxvZ2dpbmcgbGV2ZWwgKG9ydC5lbnYubG9nTGV2ZWwpIGFuZCB0aHJlYWQgbnVtYmVyIChvcnQuZW52Lndhc20ubnVtVGhyZWFkcykgYXJlIHNldCBpbiB0aGlzIHN0ZXAuXHJcbiAqXHJcbiAqIDQuIFNlc3Npb24gaW5pdGlhbGl6YXRpb24uXHJcbiAqICAgIFRoaXMgaGFwcGVucyB3aGVuIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkLiBVbmxpa2UgdGhlIGZpcnN0IDMgc3RlcHMgKHRoZXkgb25seSBjYWxsZWQgb25jZSksXHJcbiAqIHRoaXMgc3RlcCB3aWxsIGJlIGRvbmUgZm9yIGVhY2ggc2Vzc2lvbi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgZG9lcyB0aGUgZm9sbG93aW5nczpcclxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVSTDpcclxuICogICAgLSBkb3dubG9hZCB0aGUgbW9kZWwgZGF0YSBmcm9tIHRoZSBVUkwuXHJcbiAqICAgIC0gY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLiAocHJveHk6ICdjb3B5LWZyb20nKVxyXG4gKiAgICAtIGRlcmVmZXJlbmNlIHRoZSBtb2RlbCBidWZmZXIuIFRoaXMgc3RlcCBhbGxvd3MgdGhlIG9yaWdpbmFsIEFycmF5QnVmZmVyIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxyXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcclxuICpcclxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVpbnQ4QXJyYXkgb2JqZWN0OlxyXG4gKiAgICAtIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC4gKHByb3h5OiAnY29weS1mcm9tJylcclxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXHJcbiAqXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGluaXRpYWxpemUgT1JUIGVudmlyb25tZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gbnVtVGhyZWFkcyBTZXRHbG9iYWxJbnRyYU9wTnVtVGhyZWFkcyhudW1UaHJlYWRzKVxyXG4gKiBAcGFyYW0gbG9nZ2luZ0xldmVsIENyZWF0ZUVudihzdGF0aWNfY2FzdDxPcnRMb2dnaW5nTGV2ZWw+KGxvZ2dpbmdfbGV2ZWwpKVxyXG4gKi9cclxuY29uc3QgaW5pdE9ydCA9IChudW1UaHJlYWRzOiBudW1iZXIsIGxvZ2dpbmdMZXZlbDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3QgZXJyb3JDb2RlID0gZ2V0SW5zdGFuY2UoKS5fT3J0SW5pdChudW1UaHJlYWRzLCBsb2dnaW5nTGV2ZWwpO1xyXG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcclxuICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgaW5pdGlhbGl6ZSBvbm54cnVudGltZS5cIik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGluaXRpYWxpemUgcnVudGltZSBlbnZpcm9ubWVudC5cclxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5pdFJ1bnRpbWUgPSBhc3luYyAoZW52OiBFbnYpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAvLyBpbml0IE9SVFxyXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHBlcmZvcm0gRVAgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSBlbnZcclxuICogQHBhcmFtIGVwTmFtZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaXRFcCA9IGFzeW5jIChlbnY6IEVudiwgZXBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAvLyBpbml0aWFsaXplIEFTWU5DSUZZIHN1cHBvcnRcclxuICBnZXRJbnN0YW5jZSgpLmFzeW5jSW5pdD8uKCk7XHJcblxyXG4gIC8vIHBlcmZvcm0gV2ViR1BVIGF2YWlsYWJpbGl0eSBjaGVjayAoIGVpdGhlciBKU0VQIG9yIFdlYkdQVSBFUCApXHJcbiAgbGV0IHdlYmdwdUFkYXB0ZXIgPSBlbnYud2ViZ3B1LmFkYXB0ZXIgYXMgR1BVQWRhcHRlciB8IG51bGw7XHJcbiAgaWYgKGVwTmFtZSA9PT0gJ3dlYmdwdScpIHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhbmF2aWdhdG9yLmdwdSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkdQVSBpcyBub3Qgc3VwcG9ydGVkIGluIGN1cnJlbnQgZW52aXJvbm1lbnQnKTtcclxuICAgIH1cclxuICAgIGlmICghd2ViZ3B1QWRhcHRlcikge1xyXG4gICAgICAvLyBpZiBhZGFwdGVyIGlzIG5vdCBzZXQsIHJlcXVlc3QgYSBuZXcgYWRhcHRlci5cclxuICAgICAgY29uc3QgcG93ZXJQcmVmZXJlbmNlID0gZW52LndlYmdwdS5wb3dlclByZWZlcmVuY2U7XHJcbiAgICAgIGlmIChwb3dlclByZWZlcmVuY2UgIT09IHVuZGVmaW5lZCAmJiBwb3dlclByZWZlcmVuY2UgIT09ICdsb3ctcG93ZXInICYmIHBvd2VyUHJlZmVyZW5jZSAhPT0gJ2hpZ2gtcGVyZm9ybWFuY2UnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBvd2VyUHJlZmVyZW5jZSBzZXR0aW5nOiBcIiR7cG93ZXJQcmVmZXJlbmNlfVwiYCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZm9yY2VGYWxsYmFja0FkYXB0ZXIgPSBlbnYud2ViZ3B1LmZvcmNlRmFsbGJhY2tBZGFwdGVyO1xyXG4gICAgICBpZiAoZm9yY2VGYWxsYmFja0FkYXB0ZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZm9yY2VGYWxsYmFja0FkYXB0ZXIgIT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBmb3JjZUZhbGxiYWNrQWRhcHRlciBzZXR0aW5nOiBcIiR7Zm9yY2VGYWxsYmFja0FkYXB0ZXJ9XCJgKTtcclxuICAgICAgfVxyXG4gICAgICB3ZWJncHVBZGFwdGVyID0gYXdhaXQgbmF2aWdhdG9yLmdwdS5yZXF1ZXN0QWRhcHRlcih7IHBvd2VyUHJlZmVyZW5jZSwgZm9yY2VGYWxsYmFja0FkYXB0ZXIgfSk7XHJcbiAgICAgIGlmICghd2ViZ3B1QWRhcHRlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICdGYWlsZWQgdG8gZ2V0IEdQVSBhZGFwdGVyLiAnICtcclxuICAgICAgICAgICAgJ1lvdSBtYXkgbmVlZCB0byBlbmFibGUgZmxhZyBcIi0tZW5hYmxlLXVuc2FmZS13ZWJncHVcIiBpZiB5b3UgYXJlIHVzaW5nIENocm9tZS4nLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlmIGFkYXB0ZXIgaXMgc2V0LCB2YWxpZGF0ZSBpdC5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiB3ZWJncHVBZGFwdGVyLmxpbWl0cyAhPT0gJ29iamVjdCcgfHxcclxuICAgICAgICB0eXBlb2Ygd2ViZ3B1QWRhcHRlci5mZWF0dXJlcyAhPT0gJ29iamVjdCcgfHxcclxuICAgICAgICB0eXBlb2Ygd2ViZ3B1QWRhcHRlci5yZXF1ZXN0RGV2aWNlICE9PSAnZnVuY3Rpb24nXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgYWRhcHRlciBzZXQgaW4gYGVudi53ZWJncHUuYWRhcHRlcmAuIEl0IG11c3QgYmUgYSBHUFVBZGFwdGVyIG9iamVjdC4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gcGVyZm9ybSBXZWJOTiBhdmFpbGFiaWxpdHkgY2hlY2sgKCBlaXRoZXIgSlNFUCBvciBXZWJOTiBFUCApXHJcbiAgaWYgKGVwTmFtZSA9PT0gJ3dlYm5uJykge1xyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnIHx8ICEobmF2aWdhdG9yIGFzIHVua25vd24gYXMgeyBtbDogdW5rbm93biB9KS5tbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYk5OIGlzIG5vdCBzdXBwb3J0ZWQgaW4gY3VycmVudCBlbnZpcm9ubWVudCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCkge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcclxuICAgIGNvbnN0IGluaXRKc2VwID0gcmVxdWlyZSgnLi9qc2VwL2luaXQnKS5pbml0O1xyXG5cclxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJncHUnKSB7XHJcbiAgICAgIGF3YWl0IGluaXRKc2VwKCd3ZWJncHUnLCBnZXRJbnN0YW5jZSgpLCBlbnYsIHdlYmdwdUFkYXB0ZXIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVwTmFtZSA9PT0gJ3dlYm5uJykge1xyXG4gICAgICBhd2FpdCBpbml0SnNlcCgnd2Vibm4nLCBnZXRJbnN0YW5jZSgpLCBlbnYpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUgJiYgZXBOYW1lID09PSAnd2ViZ3B1Jykge1xyXG4gICAgICBnZXRJbnN0YW5jZSgpLndlYmdwdUluaXQhKChkZXZpY2UpID0+IHtcclxuICAgICAgICBlbnYud2ViZ3B1LmRldmljZSA9IGRldmljZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJOTiAmJiBlcE5hbWUgPT09ICd3ZWJubicpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMsIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcclxuICAgICAgY29uc3QgYmFja2VuZCA9IG5ldyAocmVxdWlyZSgnLi9qc2VwL2JhY2tlbmQtd2Vibm4nKS5XZWJOTkJhY2tlbmQpKGVudik7XHJcbiAgICAgIGdldEluc3RhbmNlKCkud2Vibm5Jbml0IShbXHJcbiAgICAgICAgYmFja2VuZCxcclxuICAgICAgICAvLyB3ZWJublJlc2VydmVUZW5zb3JJZFxyXG4gICAgICAgICgpID0+IGJhY2tlbmQucmVzZXJ2ZVRlbnNvcklkKCksXHJcbiAgICAgICAgLy8gd2Vibm5SZWxlYXNlVGVuc29ySWQsXHJcbiAgICAgICAgKHRlbnNvcklkOiBudW1iZXIpID0+IGJhY2tlbmQucmVsZWFzZVRlbnNvcklkKHRlbnNvcklkKSxcclxuICAgICAgICAvLyB3ZWJubkVuc3VyZVRlbnNvclxyXG4gICAgICAgIGFzeW5jIChzZXNzaW9uSWQ6IG51bWJlciB8IHVuZGVmaW5lZCwgdGVuc29ySWQ6IG51bWJlciwgb25ueERhdGFUeXBlOiBudW1iZXIsIHNoYXBlOiBudW1iZXJbXSwgY29weU9sZCkgPT5cclxuICAgICAgICAgIGJhY2tlbmQuZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgdGVuc29ySWQsIG9ubnhEYXRhVHlwZSwgc2hhcGUsIGNvcHlPbGQpLFxyXG4gICAgICAgIC8vIHdlYm5uVXBsb2FkVGVuc29yXHJcbiAgICAgICAgKHRlbnNvcklkOiBudW1iZXIsIGRhdGE6IFVpbnQ4QXJyYXkpID0+IHtcclxuICAgICAgICAgIGJhY2tlbmQudXBsb2FkVGVuc29yKHRlbnNvcklkLCBkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIHdlYm5uRG93bmxvYWRUZW5zb3JcclxuICAgICAgICBhc3luYyAodGVuc29ySWQ6IG51bWJlciwgZHN0QnVmZmVyOiBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlcikgPT5cclxuICAgICAgICAgIGJhY2tlbmQuZG93bmxvYWRUZW5zb3IodGVuc29ySWQsIGRzdEJ1ZmZlciksXHJcbiAgICAgICAgLy8gd2Vibm5SZWdpc3Rlck1MQ29udGV4dFxyXG4gICAgICAgIChzZXNzaW9uSWQ6IG51bWJlciwgbWxDb250ZXh0OiBNTENvbnRleHQpID0+IGJhY2tlbmQucmVnaXN0ZXJNTENvbnRleHQoc2Vzc2lvbklkLCBtbENvbnRleHQpLFxyXG4gICAgICAgIC8vIHdlYm5uRW5hYmxlVHJhY2VFdmVudFxyXG4gICAgICAgICEhZW52LnRyYWNlLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyAjZW5kcmVnaW9uIEluaXRpYWxpemF0aW9uc1xyXG5cclxuLyoqXHJcbiAqIHZhbGlkIGRhdGEgbG9jYXRpb25zIGZvciBpbnB1dC9vdXRwdXQgdGVuc29ycy5cclxuICovXHJcbnR5cGUgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXQgPVxyXG4gIHwgJ2NwdSdcclxuICB8ICdjcHUtcGlubmVkJ1xyXG4gIHwgJ2dwdS1idWZmZXInXHJcbiAgfCAnbWwtdGVuc29yJ1xyXG4gIC8vIFVzZSAnbWwtdGVuc29yJyBkdXJpbmcgaW5mZXJlbmNlLCBidXQgb3V0cHV0IGEgdGVuc29yIGxvY2F0ZWQgb24gdGhlIENQVS5cclxuICB8ICdtbC10ZW5zb3ItY3B1LW91dHB1dCc7XHJcblxyXG50eXBlIElPQmluZGluZ1N0YXRlID0ge1xyXG4gIC8qKlxyXG4gICAqIHRoZSBoYW5kbGUgb2YgSU8gYmluZGluZy5cclxuICAgKi9cclxuICByZWFkb25seSBoYW5kbGU6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogdGhlIHByZWZlcnJlZCBsb2NhdGlvbiBmb3IgZWFjaCBvdXRwdXQgdGVuc29yLlxyXG4gICAqXHJcbiAgICogdmFsdWUgaXMgb25lIG9mICdjcHUnLCAnY3B1LXBpbm5lZCcsICdncHUtYnVmZmVyJywgJ21sLXRlbnNvcicuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zOiByZWFkb25seSBTdXBwb3J0ZWRUZW5zb3JEYXRhTG9jYXRpb25Gb3JJbnB1dE91dHB1dFtdO1xyXG5cclxuICAvKipcclxuICAgKiBlbnVtIHZhbHVlIG9mIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cclxuICAgKi9cclxuICByZWFkb25seSBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiByZWFkb25seSBudW1iZXJbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAgdHVwbGUgZWxlbWVudHMgYXJlOiBJbmZlcmVuY2VTZXNzaW9uIElEOyBpbnB1dE5hbWVzVVRGOEVuY29kZWQ7IG91dHB1dE5hbWVzVVRGOEVuY29kZWQ7IGJpbmRpbmdTdGF0ZVxyXG4gKi9cclxudHlwZSBTZXNzaW9uTWV0YWRhdGEgPSBbXHJcbiAgaW5mZXJlbmNlU2Vzc2lvbklkOiBudW1iZXIsXHJcbiAgaW5wdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcclxuICBvdXRwdXROYW1lc1VURjhFbmNvZGVkOiBudW1iZXJbXSxcclxuICBiaW5kaW5nU3RhdGU6IElPQmluZGluZ1N0YXRlIHwgbnVsbCxcclxuICBlbmFibGVHcmFwaENhcHR1cmU6IGJvb2xlYW4sXHJcbiAgaW5wdXRPdXRwdXRCb3VuZDogYm9vbGVhbixcclxuXTtcclxuXHJcbmNvbnN0IGFjdGl2ZVNlc3Npb25zID0gbmV3IE1hcDxudW1iZXIsIFNlc3Npb25NZXRhZGF0YT4oKTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgdGhlIGlucHV0L291dHB1dCBjb3VudCBvZiB0aGUgc2Vzc2lvbi5cclxuICogQHBhcmFtIHNlc3Npb25IYW5kbGUgdGhlIGhhbmRsZSByZXByZXNlbnRpbmcgdGhlIHNlc3Npb24uIHNob3VsZCBiZSBub24temVyby5cclxuICogQHJldHVybnMgYSB0dXBsZSBpbmNsdWRpbmcgMiBudW1iZXJzLCByZXByZXNlbnRpbmcgdGhlIGlucHV0IGNvdW50IGFuZCBvdXRwdXQgY291bnQuXHJcbiAqL1xyXG5jb25zdCBnZXRTZXNzaW9uSW5wdXRPdXRwdXRDb3VudCA9IChzZXNzaW9uSGFuZGxlOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xyXG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYygyICogcHRyU2l6ZSk7XHJcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRHZXRJbnB1dE91dHB1dENvdW50KHNlc3Npb25IYW5kbGUsIGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBwdHJTaXplKTtcclxuICAgIGlmIChlcnJvckNvZGUgIT09IDApIHtcclxuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBnZXQgc2Vzc2lvbiBpbnB1dC9vdXRwdXQgY291bnQuXCIpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdHlwZSA9IHB0clNpemUgPT09IDQgPyAnaTMyJyA6ICdpNjQnO1xyXG4gICAgcmV0dXJuIFtOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0LCB0eXBlKSksIE51bWJlcih3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQgKyBwdHJTaXplLCB0eXBlKSldO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEgPSAoXHJcbiAgc2Vzc2lvbkhhbmRsZTogbnVtYmVyLFxyXG4gIGluZGV4OiBudW1iZXIsXHJcbik6IFtuYW1lT2Zmc2V0OiBudW1iZXIsIGVsZW1lbnRUeXBlOiBudW1iZXIsIGRpbXM/OiBBcnJheTxudW1iZXIgfCBzdHJpbmc+XSA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xyXG4gIGxldCBtZXRhZGF0YU9mZnNldCA9IDA7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xyXG4gICAgY29uc3QgZGF0YU9mZnNldCA9IHdhc20uc3RhY2tBbGxvYygyICogcHRyU2l6ZSk7XHJcbiAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRHZXRJbnB1dE91dHB1dE1ldGFkYXRhKHNlc3Npb25IYW5kbGUsIGluZGV4LCBkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgcHRyU2l6ZSk7XHJcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IG1ldGFkYXRhLlwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5hbWVPZmZzZXQgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0LCAnKicpKTtcclxuICAgIG1ldGFkYXRhT2Zmc2V0ID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIHB0clNpemUsICcqJykpO1xyXG4gICAgLy8gZ2V0IGVsZW1lbnQgdHlwZVxyXG4gICAgY29uc3QgZWxlbWVudFR5cGUgPSB3YXNtLkhFQVAzMlttZXRhZGF0YU9mZnNldCAvIDRdO1xyXG4gICAgaWYgKGVsZW1lbnRUeXBlID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBbbmFtZU9mZnNldCwgMF07IC8vIG5vbi10ZW5zb3JcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgZGltcyBjb3VudFxyXG4gICAgY29uc3QgZGltc0NvdW50ID0gd2FzbS5IRUFQVTMyW21ldGFkYXRhT2Zmc2V0IC8gNCArIDFdO1xyXG4gICAgLy8gZ2V0IGRpbXNcclxuICAgIGNvbnN0IGRpbXM6IEFycmF5PG51bWJlciB8IHN0cmluZz4gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltc0NvdW50OyBpKyspIHtcclxuICAgICAgY29uc3Qgc3ltYm9saWNEaW1OYW1lT2Zmc2V0ID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUobWV0YWRhdGFPZmZzZXQgKyA4ICsgaSAqIHB0clNpemUsICcqJykpO1xyXG4gICAgICBkaW1zLnB1c2goXHJcbiAgICAgICAgc3ltYm9saWNEaW1OYW1lT2Zmc2V0ICE9PSAwXHJcbiAgICAgICAgICA/IHdhc20uVVRGOFRvU3RyaW5nKHN5bWJvbGljRGltTmFtZU9mZnNldClcclxuICAgICAgICAgIDogTnVtYmVyKHdhc20uZ2V0VmFsdWUobWV0YWRhdGFPZmZzZXQgKyA4ICsgKGkgKyBkaW1zQ291bnQpICogcHRyU2l6ZSwgJyonKSksXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW25hbWVPZmZzZXQsIGVsZW1lbnRUeXBlLCBkaW1zXTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xyXG4gICAgaWYgKG1ldGFkYXRhT2Zmc2V0ICE9PSAwKSB7XHJcbiAgICAgIHdhc20uX09ydEZyZWUobWV0YWRhdGFPZmZzZXQpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBhbGxvY2F0ZSB0aGUgbWVtb3J5IGFuZCBtZW1jcHkgdGhlIGV4dGVybmFsIGJ1ZmZlci5cclxuICpcclxuICogQHBhcmFtIG1vZGVsIC0gdGhlIGV4dGVybmFsIGJ1ZmZlciBjb250YWluaW5nIHRoZSBtb2RlbCBkYXRhLiBNdXN0IG5vdCBiZSB0aGUgc2FtZSBidWZmZXIgYXMgdGhlIFdBU00gaGVhcC5cclxuICogQHJldHVybnMgYSAyLWVsZW1lbnRzIHR1cGxlIC0gdGhlIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIGFsbG9jYXRlZCBidWZmZXJcclxuICovXHJcbmV4cG9ydCBjb25zdCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyID0gKG1vZGVsOiBVaW50OEFycmF5KTogW251bWJlciwgbnVtYmVyXSA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3QgbW9kZWxEYXRhT2Zmc2V0ID0gd2FzbS5fbWFsbG9jKG1vZGVsLmJ5dGVMZW5ndGgpO1xyXG4gIGlmIChtb2RlbERhdGFPZmZzZXQgPT09IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgY3JlYXRlIGEgc2Vzc2lvbi4gZmFpbGVkIHRvIGFsbG9jYXRlIGEgYnVmZmVyIG9mIHNpemUgJHttb2RlbC5ieXRlTGVuZ3RofS5gKTtcclxuICB9XHJcbiAgd2FzbS5IRUFQVTguc2V0KG1vZGVsLCBtb2RlbERhdGFPZmZzZXQpO1xyXG4gIHJldHVybiBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbC5ieXRlTGVuZ3RoXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjcmVhdGUgYW4gaW5mZXJlbmNlIHNlc3Npb24gZnJvbSBhIG1vZGVsIGRhdGEgYnVmZmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gbW9kZWxEYXRhIC0gZWl0aGVyIGEgVWludDhBcnJheSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBtb2RlbCBkYXRhLCBvciBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGVcclxuICogICAgIHBvaW50ZXIgYW5kIHNpemUgb2YgdGhlIG1vZGVsIGRhdGEgYnVmZmVyLlxyXG4gKiBAcGFyYW0gb3B0aW9ucyBhbiBvcHRpb25hbCBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxyXG4gKiBAcmV0dXJucyBhIDMtZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyBbc2Vzc2lvbiBoYW5kbGUsIGlucHV0IG5hbWVzLCBvdXRwdXQgbmFtZXNdXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IGFzeW5jIChcclxuICBtb2RlbERhdGE6IFVpbnQ4QXJyYXkgfCBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcixcclxuICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcclxuKTogUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+ID0+IHtcclxuICBsZXQgbW9kZWxEYXRhT2Zmc2V0OiBudW1iZXIsIG1vZGVsRGF0YUxlbmd0aDogbnVtYmVyO1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbERhdGEpKSB7XHJcbiAgICAvLyBpZiBtb2RlbCBkYXRhIGlzIGFuIGFycmF5LCBpdCBtdXN0IGJlIGEgMi1lbGVtZW50cyB0dXBsZSBjb250YWluaW5nIHRoZSBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhXHJcbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gbW9kZWxEYXRhO1xyXG4gIH0gZWxzZSBpZiAobW9kZWxEYXRhLmJ1ZmZlciA9PT0gd2FzbS5IRUFQVTguYnVmZmVyKSB7XHJcbiAgICAvLyBpZiBtb2RlbCBkYXRhIHVzZXMgdGhlIHNhbWUgYnVmZmVyIGFzIHRoZSBXQVNNIGhlYXAsIHdlIGRvbid0IG5lZWQgdG8gY29weSBpdC5cclxuICAgIFttb2RlbERhdGFPZmZzZXQsIG1vZGVsRGF0YUxlbmd0aF0gPSBbbW9kZWxEYXRhLmJ5dGVPZmZzZXQsIG1vZGVsRGF0YS5ieXRlTGVuZ3RoXTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gb3RoZXJ3aXNlLCBjb3B5IHRoZSBtb2RlbCBkYXRhIHRvIHRoZSBXQVNNIGhlYXAuXHJcbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gY29weUZyb21FeHRlcm5hbEJ1ZmZlcihtb2RlbERhdGEpO1xyXG4gIH1cclxuXHJcbiAgbGV0IHNlc3Npb25IYW5kbGUgPSAwO1xyXG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XHJcbiAgbGV0IGlvQmluZGluZ0hhbmRsZSA9IDA7XHJcbiAgbGV0IGFsbG9jczogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCBpbnB1dE5hbWVzVVRGOEVuY29kZWQgPSBbXTtcclxuICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gW107XHJcblxyXG4gIHRyeSB7XHJcbiAgICBbc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGFsbG9jc10gPSBhd2FpdCBzZXRTZXNzaW9uT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICBpZiAob3B0aW9ucz8uZXh0ZXJuYWxEYXRhICYmIHdhc20ubW91bnRFeHRlcm5hbERhdGEpIHtcclxuICAgICAgY29uc3QgbG9hZGluZ1Byb21pc2VzID0gW107XHJcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBvcHRpb25zLmV4dGVybmFsRGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHBhdGggPSB0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycgPyBmaWxlIDogZmlsZS5wYXRoO1xyXG4gICAgICAgIGxvYWRpbmdQcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgbG9hZEZpbGUodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUuZGF0YSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhKHBhdGgsIGRhdGEpO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gd2FpdCBmb3IgYWxsIGV4dGVybmFsIGRhdGEgZmlsZXMgdG8gYmUgbG9hZGVkXHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGxvYWRpbmdQcm9taXNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm92aWRlciBvZiBvcHRpb25zPy5leGVjdXRpb25Qcm92aWRlcnMgPz8gW10pIHtcclxuICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gdHlwZW9mIHByb3ZpZGVyID09PSAnc3RyaW5nJyA/IHByb3ZpZGVyIDogcHJvdmlkZXIubmFtZTtcclxuICAgICAgaWYgKHByb3ZpZGVyTmFtZSA9PT0gJ3dlYm5uJykge1xyXG4gICAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwcm92aWRlciAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNvbnN0IHdlYm5uT3B0aW9ucyA9IHByb3ZpZGVyIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XHJcbiAgICAgICAgICBjb25zdCBncHVEZXZpY2UgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2ViR3B1KT8uZ3B1RGV2aWNlO1xyXG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcclxuICAgICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8ucG93ZXJQcmVmZXJlbmNlO1xyXG4gICAgICAgICAgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IGNvbnRleHQgYXMgTUxDb250ZXh0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChncHVEZXZpY2UpIHtcclxuICAgICAgICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IGF3YWl0IHdhc20ud2Vibm5DcmVhdGVNTENvbnRleHQhKGdwdURldmljZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gYXdhaXQgd2FzbS53ZWJubkNyZWF0ZU1MQ29udGV4dCEoeyBkZXZpY2VUeXBlLCBwb3dlclByZWZlcmVuY2UgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCB3YXNtLndlYm5uQ3JlYXRlTUxDb250ZXh0ISgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlc3Npb25IYW5kbGUgPSBhd2FpdCB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB3YXNtLndlYmdwdU9uQ3JlYXRlU2Vzc2lvbj8uKHNlc3Npb25IYW5kbGUpO1xyXG4gICAgaWYgKHNlc3Npb25IYW5kbGUgPT09IDApIHtcclxuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB3YXNtLmpzZXBPbkNyZWF0ZVNlc3Npb24/LigpO1xyXG5cclxuICAgIC8vIGNsZWFyIGN1cnJlbnQgTUxDb250ZXh0IGFmdGVyIHNlc3Npb24gY3JlYXRpb25cclxuICAgIGlmICh3YXNtLmN1cnJlbnRDb250ZXh0KSB7XHJcbiAgICAgIHdhc20ud2Vibm5SZWdpc3Rlck1MQ29udGV4dCEoc2Vzc2lvbkhhbmRsZSwgd2FzbS5jdXJyZW50Q29udGV4dCk7XHJcbiAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XHJcblxyXG4gICAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gISFvcHRpb25zPy5lbmFibGVHcmFwaENhcHR1cmU7XHJcblxyXG4gICAgY29uc3QgaW5wdXROYW1lcyA9IFtdO1xyXG4gICAgY29uc3Qgb3V0cHV0TmFtZXMgPSBbXTtcclxuICAgIGNvbnN0IGlucHV0TWV0YWRhdGE6IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdID0gW107XHJcbiAgICBjb25zdCBvdXRwdXRNZXRhZGF0YTogSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW10gPSBbXTtcclxuICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgW25hbWVPZmZzZXQsIGVsZW1lbnRUeXBlLCBzaGFwZV0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRNZXRhZGF0YShzZXNzaW9uSGFuZGxlLCBpKTtcclxuICAgICAgaWYgKG5hbWVPZmZzZXQgPT09IDApIHtcclxuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBpbnB1dCBuYW1lLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lT2Zmc2V0KTtcclxuICAgICAgY29uc3QgbmFtZSA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWVPZmZzZXQpO1xyXG4gICAgICBpbnB1dE5hbWVzLnB1c2gobmFtZSk7XHJcbiAgICAgIGlucHV0TWV0YWRhdGEucHVzaChcclxuICAgICAgICBlbGVtZW50VHlwZSA9PT0gMFxyXG4gICAgICAgICAgPyB7IG5hbWUsIGlzVGVuc29yOiBmYWxzZSB9XHJcbiAgICAgICAgICA6IHsgbmFtZSwgaXNUZW5zb3I6IHRydWUsIHR5cGU6IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGVsZW1lbnRUeXBlKSwgc2hhcGU6IHNoYXBlISB9LFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgc2hhcGVdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaSArIGlucHV0Q291bnQpO1xyXG4gICAgICBpZiAobmFtZU9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IGFuIG91dHB1dCBuYW1lLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZU9mZnNldCk7XHJcbiAgICAgIGNvbnN0IG5hbWVTdHJpbmcgPSB3YXNtLlVURjhUb1N0cmluZyhuYW1lT2Zmc2V0KTtcclxuICAgICAgb3V0cHV0TmFtZXMucHVzaChuYW1lU3RyaW5nKTtcclxuICAgICAgb3V0cHV0TWV0YWRhdGEucHVzaChcclxuICAgICAgICBlbGVtZW50VHlwZSA9PT0gMFxyXG4gICAgICAgICAgPyB7IG5hbWU6IG5hbWVTdHJpbmcsIGlzVGVuc29yOiBmYWxzZSB9XHJcbiAgICAgICAgICA6IHsgbmFtZTogbmFtZVN0cmluZywgaXNUZW5zb3I6IHRydWUsIHR5cGU6IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGVsZW1lbnRUeXBlKSwgc2hhcGU6IHNoYXBlISB9LFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gICAgICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2goJ2dwdS1idWZmZXInKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9XHJcbiAgICAgICAgICB0eXBlb2Ygb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvblxyXG4gICAgICAgICAgICA6IChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnKTtcclxuICAgICAgICBjb25zdCBpc0dyYXBoT3V0cHV0ID0gd2FzbS53ZWJubklzR3JhcGhPdXRwdXQ7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uID09PSAnY3B1JyAmJiBpc0dyYXBoT3V0cHV0ICYmIGlzR3JhcGhPdXRwdXQoc2Vzc2lvbkhhbmRsZSwgbmFtZVN0cmluZykpIHtcclxuICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKCdtbC10ZW5zb3ItY3B1LW91dHB1dCcpO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInICYmIGxvY2F0aW9uICE9PSAnbWwtdGVuc29yJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7bG9jYXRpb259LmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYE5vdCBzdXBwb3J0ZWQgcHJlZmVycmVkIG91dHB1dCBsb2NhdGlvbjogJHtsb2NhdGlvbn0uIE9ubHkgJ2dwdS1idWZmZXInIGxvY2F0aW9uIGlzIHN1cHBvcnRlZCB3aGVuIGVuYWJsZUdyYXBoQ2FwdHVyZSBpcyB0cnVlLmAsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMucHVzaChsb2NhdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2UgSU8gYmluZGluZyBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG91dHB1dCBpcyBwcmVmZXJyZWQgdG8gYmUgb24gR1BVLlxyXG4gICAgbGV0IGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGUgfCBudWxsID0gbnVsbDtcclxuICAgIGlmIChcclxuICAgICAgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkgJiZcclxuICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnNvbWUoKGwpID0+IGwgPT09ICdncHUtYnVmZmVyJyB8fCBsID09PSAnbWwtdGVuc29yJyB8fCBsID09PSAnbWwtdGVuc29yLWNwdS1vdXRwdXQnKVxyXG4gICAgKSB7XHJcbiAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XHJcbiAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgPT09IDApIHtcclxuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBJTyBiaW5kaW5nLlwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYmluZGluZ1N0YXRlID0ge1xyXG4gICAgICAgIGhhbmRsZTogaW9CaW5kaW5nSGFuZGxlLFxyXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucyxcclxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNcclxuICAgICAgICAgIC8vICdtbC10ZW5zb3ItY3B1LW91dHB1dCcgaXMgdHJlYXRlZCBhcyAnbWwtdGVuc29yJyBmb3IgdGhlIHB1cnBvc2Ugb2YgSU8gYmluZGluZy5cclxuICAgICAgICAgIC5tYXAoKGwpID0+IChsID09PSAnbWwtdGVuc29yLWNwdS1vdXRwdXQnID8gJ21sLXRlbnNvcicgOiBsKSlcclxuICAgICAgICAgIC5tYXAoKGwpID0+IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bShsKSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25IYW5kbGUsIFtcclxuICAgICAgc2Vzc2lvbkhhbmRsZSxcclxuICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICBiaW5kaW5nU3RhdGUsXHJcbiAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcclxuICAgICAgZmFsc2UsXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lcywgb3V0cHV0TmFtZXMsIGlucHV0TWV0YWRhdGEsIG91dHB1dE1ldGFkYXRhXTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xyXG4gICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKChidWYpID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XHJcblxyXG4gICAgaWYgKGlvQmluZGluZ0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nSGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhyb3cgZTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5fZnJlZShtb2RlbERhdGFPZmZzZXQpO1xyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpICE9PSAwKSB7XHJcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHNlc3Npb24gb3B0aW9ucy5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFsbG9jcy5mb3JFYWNoKChhbGxvYykgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xyXG5cclxuICAgIC8vIHVubW91bnQgZXh0ZXJuYWwgZGF0YSBpZiBuZWNlc3NhcnlcclxuICAgIHdhc20udW5tb3VudEV4dGVybmFsRGF0YT8uKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xyXG4gIGlmICghc2Vzc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVsZWFzZSBzZXNzaW9uLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xyXG4gIH1cclxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlXSA9IHNlc3Npb247XHJcblxyXG4gIGlmIChpb0JpbmRpbmdTdGF0ZSkge1xyXG4gICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSkge1xyXG4gICAgICBpZiAod2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY2xlYXIgYm91bmQgb3V0cHV0cy5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpICE9PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdhc20uanNlcE9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xyXG4gIHdhc20ud2Vibm5PblJlbGVhc2VTZXNzaW9uPy4oc2Vzc2lvbklkKTtcclxuICB3YXNtLndlYmdwdU9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xyXG5cclxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xyXG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xyXG4gIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKSAhPT0gMCkge1xyXG4gICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHNlc3Npb24uXCIpO1xyXG4gIH1cclxuICBhY3RpdmVTZXNzaW9ucy5kZWxldGUoc2Vzc2lvbklkKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IgPSBhc3luYyAoXHJcbiAgdGVuc29yOiBUZW5zb3JNZXRhZGF0YSB8IG51bGwsXHJcbiAgdGVuc29ySGFuZGxlczogbnVtYmVyW10sXHJcbiAgYWxsb2NzOiBudW1iZXJbXSxcclxuICBzZXNzaW9uSWQ6IG51bWJlcixcclxuICB0ZW5zb3JOYW1lVVRGOEVuY29kZWQ6IG51bWJlcixcclxuICBpbmRleDogbnVtYmVyLFxyXG4gIGVuYWJsZUdyYXBoQ2FwdHVyZSA9IGZhbHNlLFxyXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoIXRlbnNvcikge1xyXG4gICAgdGVuc29ySGFuZGxlcy5wdXNoKDApO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3QgcHRyU2l6ZSA9IHdhc20uUFRSX1NJWkU7XHJcblxyXG4gIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xyXG4gIGNvbnN0IGRpbXMgPSB0ZW5zb3JbMV07XHJcbiAgY29uc3QgbG9jYXRpb24gPSB0ZW5zb3JbM107XHJcbiAgbGV0IGFjdHVhbExvY2F0aW9uID0gbG9jYXRpb247XHJcblxyXG4gIGxldCByYXdEYXRhOiBudW1iZXI7XHJcbiAgbGV0IGRhdGFCeXRlTGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgKGxvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgfHwgbG9jYXRpb24gPT09ICdtbC10ZW5zb3InKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBFeHRlcm5hbCBidWZmZXIgbXVzdCBiZSBwcm92aWRlZCBmb3IgaW5wdXQvb3V0cHV0IGluZGV4ICR7aW5kZXh9IHdoZW4gZW5hYmxlR3JhcGhDYXB0dXJlIGlzIHRydWUuYCxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgY29uc3QgZ3B1QnVmZmVyID0gdGVuc29yWzJdLmdwdUJ1ZmZlcjtcclxuICAgIGRhdGFCeXRlTGVuZ3RoID0gY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXModGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCBkaW1zKSE7XHJcblxyXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XHJcbiAgICAgIGNvbnN0IHJlZ2lzdGVyQnVmZmVyID0gd2FzbS53ZWJncHVSZWdpc3RlckJ1ZmZlcjtcclxuICAgICAgaWYgKCFyZWdpc3RlckJ1ZmZlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGxvY2F0aW9uIFwiZ3B1LWJ1ZmZlclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJHUFUuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJhd0RhdGEgPSByZWdpc3RlckJ1ZmZlcihncHVCdWZmZXIsIHNlc3Npb25JZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCByZWdpc3RlckJ1ZmZlciA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyO1xyXG4gICAgICBpZiAoIXJlZ2lzdGVyQnVmZmVyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgbG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcclxuICAgICAgfVxyXG4gICAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpIHtcclxuICAgIGNvbnN0IG1sVGVuc29yID0gdGVuc29yWzJdLm1sVGVuc29yIGFzIE1MVGVuc29yO1xyXG4gICAgZGF0YUJ5dGVMZW5ndGggPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyh0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIGRpbXMpITtcclxuXHJcbiAgICBjb25zdCByZWdpc3Rlck1MVGVuc29yID0gd2FzbS53ZWJublJlZ2lzdGVyTUxUZW5zb3I7XHJcbiAgICBpZiAoIXJlZ2lzdGVyTUxUZW5zb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgbG9jYXRpb24gXCJtbC10ZW5zb3JcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViTk4uJyk7XHJcbiAgICB9XHJcbiAgICByYXdEYXRhID0gcmVnaXN0ZXJNTFRlbnNvcihzZXNzaW9uSWQsIG1sVGVuc29yLCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIGRpbXMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgIC8vIHN0cmluZyB0ZW5zb3JcclxuICAgICAgZGF0YUJ5dGVMZW5ndGggPSBwdHJTaXplICogZGF0YS5sZW5ndGg7XHJcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xyXG4gICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2FzbS5zZXRWYWx1ZShyYXdEYXRhICsgaSAqIHB0clNpemUsIGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpLCAnKicpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpc0dyYXBoSW5wdXQgPSB3YXNtLndlYm5uSXNHcmFwaElucHV0O1xyXG4gICAgICBjb25zdCBpc0dyYXBoT3V0cHV0ID0gd2FzbS53ZWJubklzR3JhcGhPdXRwdXQ7XHJcbiAgICAgIGlmIChkYXRhVHlwZSAhPT0gJ3N0cmluZycgJiYgaXNHcmFwaElucHV0ICYmIGlzR3JhcGhPdXRwdXQpIHtcclxuICAgICAgICBjb25zdCB0ZW5zb3JOYW1lID0gd2FzbS5VVEY4VG9TdHJpbmcodGVuc29yTmFtZVVURjhFbmNvZGVkKTtcclxuICAgICAgICAvLyBQcm9tb3RlIHRoZSB0ZW5zb3IgdG8gJ21sLXRlbnNvcicgaWYgaXQgaXMgYSBncmFwaCBpbnB1dC5cclxuICAgICAgICBpZiAoaXNHcmFwaElucHV0KHNlc3Npb25JZCwgdGVuc29yTmFtZSkgfHwgaXNHcmFwaE91dHB1dChzZXNzaW9uSWQsIHRlbnNvck5hbWUpKSB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhVHlwZUVudW0gPSB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSk7XHJcbiAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKGRhdGFUeXBlRW51bSwgZGltcykhO1xyXG4gICAgICAgICAgYWN0dWFsTG9jYXRpb24gPSAnbWwtdGVuc29yJztcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZVRlbXBvcmFyeVRlbnNvciA9IHdhc20ud2Vibm5DcmVhdGVUZW1wb3JhcnlUZW5zb3I7XHJcbiAgICAgICAgICBjb25zdCB1cGxvYWRUZW5zb3IgPSB3YXNtLndlYm5uVXBsb2FkVGVuc29yO1xyXG4gICAgICAgICAgaWYgKCFjcmVhdGVUZW1wb3JhcnlUZW5zb3IgfHwgIXVwbG9hZFRlbnNvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHRlbnNvcklkID0gYXdhaXQgY3JlYXRlVGVtcG9yYXJ5VGVuc29yKHNlc3Npb25JZCwgZGF0YVR5cGVFbnVtLCBkaW1zIGFzIG51bWJlcltdKTtcclxuICAgICAgICAgIHVwbG9hZFRlbnNvcih0ZW5zb3JJZCwgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKSk7XHJcbiAgICAgICAgICByYXdEYXRhID0gdGVuc29ySWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcclxuICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xyXG4gIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIGRpbXMubGVuZ3RoKTtcclxuICB0cnkge1xyXG4gICAgZGltcy5mb3JFYWNoKChkLCBpbmRleCkgPT4gd2FzbS5zZXRWYWx1ZShkaW1zT2Zmc2V0ICsgaW5kZXggKiBwdHJTaXplLCBkLCBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JykpO1xyXG4gICAgY29uc3QgdGVuc29yID0gd2FzbS5fT3J0Q3JlYXRlVGVuc29yKFxyXG4gICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksXHJcbiAgICAgIHJhd0RhdGEsXHJcbiAgICAgIGRhdGFCeXRlTGVuZ3RoLFxyXG4gICAgICBkaW1zT2Zmc2V0LFxyXG4gICAgICBkaW1zLmxlbmd0aCxcclxuICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGFjdHVhbExvY2F0aW9uKSxcclxuICAgICk7XHJcbiAgICBpZiAodGVuc29yID09PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBpbnB1dC9vdXRwdXQuIHNlc3Npb249JHtzZXNzaW9uSWR9LCBpbmRleD0ke2luZGV4fS5gKTtcclxuICAgIH1cclxuICAgIHRlbnNvckhhbmRsZXMucHVzaCh0ZW5zb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIHBlcmZvcm0gaW5mZXJlbmNlIHJ1blxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJ1biA9IGFzeW5jIChcclxuICBzZXNzaW9uSWQ6IG51bWJlcixcclxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxyXG4gIGlucHV0VGVuc29yczogVGVuc29yTWV0YWRhdGFbXSxcclxuICBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcclxuICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxyXG4gIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcclxuKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3QgcHRyU2l6ZSA9IHdhc20uUFRSX1NJWkU7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xyXG4gIGlmICghc2Vzc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcnVuIGluZmVyZW5jZS4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcclxuICB9XHJcbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XHJcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsxXTtcclxuICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsyXTtcclxuICBjb25zdCBpb0JpbmRpbmdTdGF0ZSA9IHNlc3Npb25bM107XHJcbiAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gc2Vzc2lvbls0XTtcclxuICBjb25zdCBpbnB1dE91dHB1dEJvdW5kID0gc2Vzc2lvbls1XTtcclxuXHJcbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XHJcbiAgY29uc3Qgb3V0cHV0Q291bnQgPSBvdXRwdXRJbmRpY2VzLmxlbmd0aDtcclxuXHJcbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xyXG4gIGxldCBydW5PcHRpb25zQWxsb2NzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XHJcbiAgY29uc3Qgb3V0cHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCBpbnB1dE91dHB1dEFsbG9jczogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCBwcmVBbGxvY2F0ZWRPdXRwdXRzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdCBiZWZvcmVSdW5TdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIHB0clNpemUpO1xyXG4gIGNvbnN0IGlucHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIHB0clNpemUpO1xyXG4gIGNvbnN0IG91dHB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhvdXRwdXRDb3VudCAqIHB0clNpemUpO1xyXG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogcHRyU2l6ZSk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcicpO1xyXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGF3YWl0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcclxuICAgICAgICBpbnB1dFRlbnNvcnNbaV0sXHJcbiAgICAgICAgaW5wdXRUZW5zb3JIYW5kbGVzLFxyXG4gICAgICAgIGlucHV0T3V0cHV0QWxsb2NzLFxyXG4gICAgICAgIHNlc3Npb25JZCxcclxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXSxcclxuICAgICAgICBpbnB1dEluZGljZXNbaV0sXHJcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGF3YWl0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcclxuICAgICAgICBvdXRwdXRUZW5zb3JzW2ldLFxyXG4gICAgICAgIG91dHB1dFRlbnNvckhhbmRsZXMsXHJcbiAgICAgICAgaW5wdXRPdXRwdXRBbGxvY3MsXHJcbiAgICAgICAgc2Vzc2lvbklkLFxyXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbb3V0cHV0SW5kaWNlc1tpXV0sXHJcbiAgICAgICAgaW5wdXRDb3VudCArIG91dHB1dEluZGljZXNbaV0sXHJcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcicpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIHdhc20uc2V0VmFsdWUoaW5wdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldLCAnKicpO1xyXG4gICAgICB3YXNtLnNldFZhbHVlKGlucHV0TmFtZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV0sICcqJyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcclxuICAgICAgd2FzbS5zZXRWYWx1ZShvdXRwdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgJyonKTtcclxuICAgICAgd2FzbS5zZXRWYWx1ZShvdXRwdXROYW1lc09mZnNldCArIGkgKiBwdHJTaXplLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW291dHB1dEluZGljZXNbaV1dLCAnKicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQIHx8ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSAmJiBpb0JpbmRpbmdTdGF0ZSAmJiAhaW5wdXRPdXRwdXRCb3VuZCkge1xyXG4gICAgICBjb25zdCB7IGhhbmRsZSwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkIH0gPSBpb0JpbmRpbmdTdGF0ZTtcclxuXHJcbiAgICAgIGlmIChpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RoICE9PSBpbnB1dENvdW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgYGlucHV0IGNvdW50IGZyb20gZmVlZHMgKCR7aW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIGJpbmRJbnB1dHNPdXRwdXRzJyk7XHJcbiAgICAgIC8vIHByb2Nlc3MgaW5wdXRzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBpbnB1dEluZGljZXNbaV07XHJcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0QmluZElucHV0KGhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldKTtcclxuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBpbnB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBwcm9jZXNzIHByZS1hbGxvY2F0ZWQgb3V0cHV0c1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IG91dHB1dEluZGljZXNbaV07XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBvdXRwdXRUZW5zb3JzW2ldPy5bM107IC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXHJcblxyXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQsIHN0b3JlIGFuZCBiaW5kIHRoZSB0ZW5zb3IuXHJcbiAgICAgICAgICBwcmVBbGxvY2F0ZWRPdXRwdXRzLnB1c2gob3V0cHV0VGVuc29ySGFuZGxlc1tpXSk7XHJcbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sIDApO1xyXG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBwcmUtYWxsb2NhdGVkIG91dHB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC4gcmVzZXQgcHJlZmVycmVkIGxvY2F0aW9uLlxyXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0QmluZE91dHB1dChcclxuICAgICAgICAgICAgaGFuZGxlLFxyXG4gICAgICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZFtpbmRleF0sXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBvdXRwdXRbJHtpfV0gdG8gJHtvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbaV19IGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIGJpbmRJbnB1dHNPdXRwdXRzJyk7XHJcbiAgICAgIGFjdGl2ZVNlc3Npb25zLnNldChzZXNzaW9uSWQsIFtcclxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxyXG4gICAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZCxcclxuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxyXG4gICAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcclxuICAgICAgICB0cnVlLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICB3YXNtLmpzZXBPblJ1blN0YXJ0Py4oc2Vzc2lvbkhhbmRsZSk7XHJcbiAgICB3YXNtLndlYm5uT25SdW5TdGFydD8uKHNlc3Npb25IYW5kbGUpO1xyXG5cclxuICAgIGxldCBlcnJvckNvZGU6IG51bWJlcjtcclxuICAgIGlmICgoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQIHx8ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSAmJiBpb0JpbmRpbmdTdGF0ZSkge1xyXG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcclxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxyXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLmhhbmRsZSxcclxuICAgICAgICBvdXRwdXRDb3VudCxcclxuICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsXHJcbiAgICAgICAgcnVuT3B0aW9uc0hhbmRsZSxcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bihcclxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxyXG4gICAgICAgIGlucHV0TmFtZXNPZmZzZXQsXHJcbiAgICAgICAgaW5wdXRWYWx1ZXNPZmZzZXQsXHJcbiAgICAgICAgaW5wdXRDb3VudCxcclxuICAgICAgICBvdXRwdXROYW1lc09mZnNldCxcclxuICAgICAgICBvdXRwdXRDb3VudCxcclxuICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsXHJcbiAgICAgICAgcnVuT3B0aW9uc0hhbmRsZSxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcclxuICAgIGNvbnN0IG91dHB1dFByb21pc2VzOiBBcnJheTxQcm9taXNlPFtudW1iZXIsIFRlbnNvci5EYXRhVHlwZV0+PiA9IFtdO1xyXG5cclxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIFByb2Nlc3NPdXRwdXRUZW5zb3InKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xyXG4gICAgICBjb25zdCB0ZW5zb3IgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZShvdXRwdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgJyonKSk7XHJcbiAgICAgIC8vIFRPRE86IHJldmlzaXQgdGhpcyBwYXJ0IHRvIGVuc3VyZSBpdCB3b3JrcyBmb3IgV2ViR1BVIHdoZW4gYm90aCBwcmUtYWxsb2NhdGVkIG91dHB1dHMgYW5kXHJcbiAgICAgIC8vIHByZWZlcnJlZCBsb2NhdGlvbiBhcmUgc3BlY2lmaWVkLlxyXG4gICAgICAvLyBDZXJ0YWluIHByZS1hbGxvY2F0ZWQgdGVuc29ycyBtYXkgYWxyZWFkeSBiZSBib3VuZCBpbiB0aGUgSU8gYmluZGluZy4gZS5nLiB0aGUgV2ViTk4gYmFja2VuZFxyXG4gICAgICAvLyBhbHdheXMgYmluZHMgaXRzIHRlbnNvciB0byAnbWwtdGVuc29yJy4gSW4gc3VjaCBjYXNlcywgdGhlIHRlbnNvciBJRCBtaWdodCBjaGFuZ2UgYWZ0ZXIgYmluZGluZyxcclxuICAgICAgLy8gYnV0IGNvcHlpbmcgZGF0YSBmb3IgdGhlc2UgdGVuc29ycyBzaG91bGQgc3RpbGwgYmUgYXZvaWRlZC5cclxuICAgICAgaWYgKHRlbnNvciA9PT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSB8fCBwcmVBbGxvY2F0ZWRPdXRwdXRzLmluY2x1ZGVzKG91dHB1dFRlbnNvckhhbmRsZXNbaV0pKSB7XHJcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cclxuICAgICAgICBvdXRwdXQucHVzaChvdXRwdXRUZW5zb3JzW2ldISk7XHJcbiAgICAgICAgaWYgKHRlbnNvciAhPT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSkge1xyXG4gICAgICAgICAgLy8gcmVsZWFzZSByZWR1bmRhbnQgdGVuc29yIGVhcmxpZXIuXHJcbiAgICAgICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSB0ZW5zb3IuXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuICAgICAgLy8gc3RhY2sgYWxsb2NhdGUgNCBwb2ludGVyIHZhbHVlXHJcbiAgICAgIGNvbnN0IHRlbnNvckRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIHB0clNpemUpO1xyXG5cclxuICAgICAgbGV0IGtlZXBPdXRwdXRUZW5zb3IgPSBmYWxzZTtcclxuICAgICAgbGV0IHR5cGU6IFRlbnNvci5UeXBlIHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGRhdGFPZmZzZXQgPSAwO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXHJcbiAgICAgICAgICB0ZW5zb3IsXHJcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0LFxyXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIHB0clNpemUsXHJcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgMiAqIHB0clNpemUsXHJcblxyXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIDMgKiBwdHJTaXplLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFjY2VzcyBvdXRwdXQgdGVuc29yIGRhdGEgb24gaW5kZXggJHtpfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsdWVUeXBlID0gcHRyU2l6ZSA9PT0gNCA/ICdpMzInIDogJ2k2NCc7XHJcbiAgICAgICAgY29uc3QgZGF0YVR5cGUgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0LCB2YWx1ZVR5cGUpKTtcclxuICAgICAgICBkYXRhT2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSwgJyonKTtcclxuICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSAqIDIsICcqJyk7XHJcbiAgICAgICAgY29uc3QgZGltc0xlbmd0aCA9IE51bWJlcih3YXNtLmdldFZhbHVlKHRlbnNvckRhdGFPZmZzZXQgKyBwdHJTaXplICogMywgdmFsdWVUeXBlKSk7XHJcbiAgICAgICAgY29uc3QgZGltcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBkaW1zLnB1c2goTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGltc09mZnNldCArIGkgKiBwdHJTaXplLCB2YWx1ZVR5cGUpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3YXNtLl9PcnRGcmVlKGRpbXNPZmZzZXQpICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGZyZWUgbWVtb3J5IGZvciB0ZW5zb3IgZGltcy5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNpemUgPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpO1xyXG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZWZlcnJlZExvY2F0aW9uID0gaW9CaW5kaW5nU3RhdGU/Lm91dHB1dFByZWZlcnJlZExvY2F0aW9uc1tvdXRwdXRJbmRpY2VzW2ldXTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyB8fCBwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3Qgc3RyaW5nRGF0YTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIGkgKiBwdHJTaXplLCAnKicpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0T2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0ICsgKGkgKyAxKSAqIHB0clNpemUsICcqJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heEJ5dGVzVG9SZWFkID0gaSA9PT0gc2l6ZSAtIDEgPyB1bmRlZmluZWQgOiBuZXh0T2Zmc2V0IC0gb2Zmc2V0O1xyXG4gICAgICAgICAgICBzdHJpbmdEYXRhLnB1c2god2FzbS5VVEY4VG9TdHJpbmcob2Zmc2V0LCBtYXhCeXRlc1RvUmVhZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIGEgY2VydGFpbiBvdXRwdXQncyBwcmVmZXJyZWQgbG9jYXRpb24gaXMgR1BVIGJ1dCB0aGUgdGVuc29yIGlzIGVtcHR5LCB3ZSBzdGlsbCBuZWVkIHRvIGNyZWF0ZSBhIENQVVxyXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXHJcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyAmJiBzaXplID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRCdWZmZXIgPSAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSA/IHdhc20ud2ViZ3B1R2V0QnVmZmVyIDogd2FzbS5qc2VwR2V0QnVmZmVyO1xyXG4gICAgICAgICAgICBpZiAoIWdldEJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSBnZXRCdWZmZXIoZGF0YU9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZSwgc2l6ZSk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJTaXplID09PSB1bmRlZmluZWQgfHwgIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxyXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gICAgICAgICAgICAgIHdhc20ud2ViZ3B1UmVnaXN0ZXJCdWZmZXIhKGdwdUJ1ZmZlciwgc2Vzc2lvbklkLCBkYXRhT2Zmc2V0KTtcclxuICAgICAgICAgICAgICBjb25zdCBkb3dubG9hZERhdGFGdW5jdGlvbiA9IHdhc20ud2ViZ3B1Q3JlYXRlRG93bmxvYWRlciEoZ3B1QnVmZmVyLCBidWZmZXJTaXplLCBzZXNzaW9uSWQpO1xyXG4gICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcclxuICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICBkaW1zLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBncHVCdWZmZXIsXHJcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBkb3dubG9hZERhdGFGdW5jdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgKHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlISkpKGFycmF5QnVmZmVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBUZW5zb3IuRGF0YVR5cGVNYXBbVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlc107XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2UgdGVuc29yLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2dwdS1idWZmZXInLFxyXG4gICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcclxuICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICBkaW1zLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBncHVCdWZmZXIsXHJcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkOiB3YXNtLmpzZXBDcmVhdGVEb3dubG9hZGVyIShncHVCdWZmZXIsIGJ1ZmZlclNpemUsIHR5cGUpLFxyXG4gICAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHRlbnNvci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdncHUtYnVmZmVyJyxcclxuICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicgJiYgc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZW5zdXJlVGVuc29yID0gd2FzbS53ZWJubkVuc3VyZVRlbnNvcjtcclxuICAgICAgICAgICAgY29uc3QgaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZCA9IHdhc20ud2Vibm5Jc0dyYXBoSW5wdXRPdXRwdXRUeXBlU3VwcG9ydGVkO1xyXG4gICAgICAgICAgICBpZiAoIWVuc3VyZVRlbnNvciB8fCAhaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJtbC10ZW5zb3JcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViTk4uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdGVuc29yU2l6ZSA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKGRhdGFUeXBlLCBzaXplKTtcclxuICAgICAgICAgICAgaWYgKHRlbnNvclNpemUgPT09IHVuZGVmaW5lZCB8fCAhaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUodHlwZSkpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZChzZXNzaW9uSWQsIHR5cGUsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgIGBwcmVmZXJyZWRMb2NhdGlvbiBcIm1sLXRlbnNvclwiIGZvciAke3R5cGV9IG91dHB1dCBpcyBub3Qgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgV2ViTk4gQ29udGV4dC5gLFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBncmFwaCBoYXMgYmVlbiBwYXJ0aXRpb25lZCwgdGhlIG91dHB1dCB0ZW5zb3IgbWF5IGhhdmUgbm90IGJlZW4gY3JlYXRlZC4gRm9yIHRoaXMgcmVhc29uLCB3ZSB1c2VcclxuICAgICAgICAgICAgLy8gZW5zdXJlVGVuc29yIHRvIGdldC9jcmVhdGUgdGhlIE1MVGVuc29yLiBJbiB3aGljaCBjYXNlLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgdGhlIGRhdGEgaWYgYSBuZXcgdGVuc29yXHJcbiAgICAgICAgICAgIC8vIGhhcyBiZWVuIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgIGNvbnN0IG1sVGVuc29yID0gYXdhaXQgZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgZGF0YU9mZnNldCwgZGF0YVR5cGUsIGRpbXMsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxyXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcclxuICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgIGRpbXMsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWxUZW5zb3IsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogd2FzbS53ZWJubkNyZWF0ZU1MVGVuc29yRG93bmxvYWRlciEoZGF0YU9mZnNldCwgdHlwZSksXHJcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHdhc20ud2Vibm5SZWxlYXNlVGVuc29ySWQhKGRhdGFPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgJ21sLXRlbnNvcicsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvci1jcHUtb3V0cHV0JyAmJiBzaXplID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gd2FzbS53ZWJubkNyZWF0ZU1MVGVuc29yRG93bmxvYWRlciEoZGF0YU9mZnNldCwgdHlwZSBhcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMpKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0Lmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gRGVsYXkgdGhlIGRhdGEgZG93bmxvYWQgYW5kIHJlbGVhc2luZyB0aGUgdGVuc29yIHVudGlsIHdlIGNhbiB3YWl0IGZvciBhbGwgb3V0cHV0IHRlbnNvcnMgdG8gYmUgZG93bmxvYWRlZC5cclxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XHJcbiAgICAgICAgICAgIG91dHB1dFByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogW251bWJlciwgVGVuc29yLkRhdGFUeXBlXSA9IFtpbmRleCwgYXdhaXQgZGF0YV07XHJcbiAgICAgICAgICAgICAgICB3YXNtLndlYm5uUmVsZWFzZVRlbnNvcklkIShkYXRhT2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIFtdLCAnY3B1J10pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yKHR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IHR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzaXplKTtcclxuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKS5zZXQoXHJcbiAgICAgICAgICAgICAgd2FzbS5IRUFQVTguc3ViYXJyYXkoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2spO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBkYXRhT2Zmc2V0KSB7XHJcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWtlZXBPdXRwdXRUZW5zb3IpIHtcclxuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW9CaW5kaW5nU3RhdGUgJiYgIWVuYWJsZUdyYXBoQ2FwdHVyZSkge1xyXG4gICAgICBpZiAod2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY2xlYXIgYm91bmQgb3V0cHV0cy5cIik7XHJcbiAgICAgIH1cclxuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xyXG4gICAgICAgIHNlc3Npb25IYW5kbGUsXHJcbiAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXHJcbiAgICAgICAgaW9CaW5kaW5nU3RhdGUsXHJcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuICAgIC8vIFdhaXQgZm9yIGFsbCBvdXRwdXQgdGVuc29yIGRhdGEgdG8gYmUgZG93bmxvYWRlZC5cclxuICAgIGZvciAoY29uc3QgW2luZGV4LCBkYXRhXSBvZiBhd2FpdCBQcm9taXNlLmFsbChvdXRwdXRQcm9taXNlcykpIHtcclxuICAgICAgb3V0cHV0W2luZGV4XVsyXSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICBUUkFDRV9FVkVOVF9FTkQoJ3dhc20gUHJvY2Vzc091dHB1dFRlbnNvcicpO1xyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS53ZWJubk9uUnVuRW5kPy4oc2Vzc2lvbkhhbmRsZSk7XHJcblxyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xyXG5cclxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gICAgICBpbnB1dFRlbnNvcnMuZm9yRWFjaCgodCkgPT4ge1xyXG4gICAgICAgIGlmICh0ICYmIHRbM10gPT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgICAgICAgd2FzbS53ZWJncHVVbnJlZ2lzdGVyQnVmZmVyISh0WzJdLmdwdUJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgb3V0cHV0VGVuc29ycy5mb3JFYWNoKCh0KSA9PiB7XHJcbiAgICAgICAgaWYgKHQgJiYgdFszXSA9PT0gJ2dwdS1idWZmZXInKSB7XHJcbiAgICAgICAgICB3YXNtLndlYmdwdVVucmVnaXN0ZXJCdWZmZXIhKHRbMl0uZ3B1QnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2goKHYpID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xyXG4gICAgb3V0cHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKCh2KSA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcclxuICAgIGlucHV0T3V0cHV0QWxsb2NzLmZvckVhY2goKHApID0+IHdhc20uX2ZyZWUocCkpO1xyXG5cclxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIHdhc20uX09ydFJlbGVhc2VSdW5PcHRpb25zKHJ1bk9wdGlvbnNIYW5kbGUpO1xyXG4gICAgfVxyXG4gICAgcnVuT3B0aW9uc0FsbG9jcy5mb3JFYWNoKChwKSA9PiB3YXNtLl9mcmVlKHApKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogZW5kIHByb2ZpbGluZ1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcclxuICBpZiAoIXNlc3Npb24pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzZXNzaW9uIGlkJyk7XHJcbiAgfVxyXG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xyXG5cclxuICAvLyBwcm9maWxlIGZpbGUgbmFtZSBpcyBub3QgdXNlZCB5ZXQsIGJ1dCBpdCBtdXN0IGJlIGZyZWVkLlxyXG4gIGNvbnN0IHByb2ZpbGVGaWxlTmFtZSA9IHdhc20uX09ydEVuZFByb2ZpbGluZyhzZXNzaW9uSGFuZGxlKTtcclxuICBpZiAocHJvZmlsZUZpbGVOYW1lID09PSAwKSB7XHJcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS5cIik7XHJcbiAgfVxyXG4gIHdhc20uX09ydEZyZWUocHJvZmlsZUZpbGVOYW1lKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyA9ICh0ZW5zb3JzOiByZWFkb25seSBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKTogQXJyYXlCdWZmZXJMaWtlW10gPT4ge1xyXG4gIGNvbnN0IGJ1ZmZlcnM6IEFycmF5QnVmZmVyTGlrZVtdID0gW107XHJcbiAgZm9yIChjb25zdCB0ZW5zb3Igb2YgdGVuc29ycykge1xyXG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSAmJiAnYnVmZmVyJyBpbiBkYXRhKSB7XHJcbiAgICAgIGJ1ZmZlcnMucHVzaChkYXRhLmJ1ZmZlcik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBidWZmZXJzO1xyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGVudiwgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9ydFdhc21NZXNzYWdlLFxyXG4gIFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyLFxyXG4gIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSxcclxuICBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSxcclxuICBUZW5zb3JNZXRhZGF0YSxcclxufSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcclxuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuL3dhc20tY29yZS1pbXBsJztcclxuaW1wb3J0IHsgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5IH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xyXG5pbXBvcnQge1xyXG4gIGltcG9ydFByb3h5V29ya2VyLFxyXG4gIGluZmVyV2FzbVBhdGhQcmVmaXhGcm9tU2NyaXB0U3JjLFxyXG4gIGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSxcclxufSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcclxuXHJcbmNvbnN0IGlzUHJveHkgPSAoKTogYm9vbGVhbiA9PiAhIWVudi53YXNtLnByb3h5ICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XHJcbmxldCBwcm94eVdvcmtlcjogV29ya2VyIHwgdW5kZWZpbmVkO1xyXG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xyXG5sZXQgdGVtcG9yYXJ5T2JqZWN0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG50eXBlIFByb21pc2VDYWxsYmFja3M8VCA9IHZvaWQ+ID0gW3Jlc29sdmU6IChyZXN1bHQ6IFQpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbjogdW5rbm93bikgPT4gdm9pZF07XHJcbmxldCBpbml0V2FzbUNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrcztcclxuY29uc3QgcXVldWVkQ2FsbGJhY2tzOiBNYXA8T3J0V2FzbU1lc3NhZ2VbJ3R5cGUnXSwgQXJyYXk8UHJvbWlzZUNhbGxiYWNrczx1bmtub3duPj4+ID0gbmV3IE1hcCgpO1xyXG5cclxuY29uc3QgZW5xdWV1ZUNhbGxiYWNrcyA9ICh0eXBlOiBPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBjYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4pOiB2b2lkID0+IHtcclxuICBjb25zdCBxdWV1ZSA9IHF1ZXVlZENhbGxiYWNrcy5nZXQodHlwZSk7XHJcbiAgaWYgKHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5wdXNoKGNhbGxiYWNrcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHF1ZXVlZENhbGxiYWNrcy5zZXQodHlwZSwgW2NhbGxiYWNrc10pO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGVuc3VyZVdvcmtlciA9ICgpOiB2b2lkID0+IHtcclxuICBpZiAoaW5pdGlhbGl6aW5nIHx8ICFpbml0aWFsaXplZCB8fCBhYm9ydGVkIHx8ICFwcm94eVdvcmtlcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b3JrZXIgbm90IHJlYWR5Jyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgb25Qcm94eVdvcmtlck1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcclxuICBzd2l0Y2ggKGV2LmRhdGEudHlwZSkge1xyXG4gICAgY2FzZSAnaW5pdC13YXNtJzpcclxuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xyXG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzFdKGV2LmRhdGEuZXJyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMF0oKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGVtcG9yYXJ5T2JqZWN0VXJsKSB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0ZW1wb3JhcnlPYmplY3RVcmwpO1xyXG4gICAgICAgIHRlbXBvcmFyeU9iamVjdFVybCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2luaXQtZXAnOlxyXG4gICAgY2FzZSAnY29weS1mcm9tJzpcclxuICAgIGNhc2UgJ2NyZWF0ZSc6XHJcbiAgICBjYXNlICdyZWxlYXNlJzpcclxuICAgIGNhc2UgJ3J1bic6XHJcbiAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzoge1xyXG4gICAgICBjb25zdCBjYWxsYmFja3MgPSBxdWV1ZWRDYWxsYmFja3MuZ2V0KGV2LmRhdGEudHlwZSkhO1xyXG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcclxuICAgICAgICBjYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoaW5pdGlhbGl6ZWQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaWYgKGluaXRpYWxpemluZykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRXYXNtKCknIGRldGVjdGVkLlwiKTtcclxuICB9XHJcbiAgaWYgKGFib3J0ZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInByZXZpb3VzIGNhbGwgdG8gJ2luaXRXYXNtKCknIGZhaWxlZC5cIik7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xyXG5cclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcHJveHlXb3JrZXI/LnRlcm1pbmF0ZSgpO1xyXG5cclxuICAgICAgdm9pZCBpbXBvcnRQcm94eVdvcmtlcigpLnRoZW4oKFtvYmplY3RVcmwsIHdvcmtlcl0pID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcHJveHlXb3JrZXIgPSB3b3JrZXI7XHJcbiAgICAgICAgICBwcm94eVdvcmtlci5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KSA9PiByZWplY3QoZXYpO1xyXG4gICAgICAgICAgcHJveHlXb3JrZXIub25tZXNzYWdlID0gb25Qcm94eVdvcmtlck1lc3NhZ2U7XHJcbiAgICAgICAgICBpbml0V2FzbUNhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdpbml0LXdhc20nLCBpbjogZW52IH07XHJcblxyXG4gICAgICAgICAgLy8gaWYgdGhlIHByb3h5IHdvcmtlciBpcyBsb2FkZWQgZnJvbSBhIGJsb2IgVVJMLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgcGF0aCBpbmZvcm1hdGlvbiBpcyBub3QgbG9zdC5cclxuICAgICAgICAgIC8vXHJcbiAgICAgICAgICAvLyB3aGVuIGBlbnYud2FzbS53YXNtUGF0aHNgIGlzIG5vdCBzZXQsIHdlIG5lZWQgdG8gcGFzcyB0aGUgcGF0aCBpbmZvcm1hdGlvbiB0byB0aGUgd29ya2VyLlxyXG4gICAgICAgICAgLy9cclxuICAgICAgICAgIGlmICghQlVJTERfREVGUy5FTkFCTEVfQlVORExFX1dBU01fSlMgJiYgIW1lc3NhZ2UuaW4hLndhc20ud2FzbVBhdGhzICYmIG9iamVjdFVybCkge1xyXG4gICAgICAgICAgICAvLyBmb3IgYSBidWlsZCBub3QgYnVuZGxlZCB0aGUgd2FzbSBKUywgd2UgbmVlZCB0byBwYXNzIHRoZSBwYXRoIHByZWZpeCB0byB0aGUgd29ya2VyLlxyXG4gICAgICAgICAgICAvLyB0aGUgcGF0aCBwcmVmaXggd2lsbCBiZSB1c2VkIHRvIHJlc29sdmUgdGhlIHBhdGggdG8gYm90aCB0aGUgd2FzbSBKUyBhbmQgdGhlIHdhc20gZmlsZS5cclxuICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRXYXNtUGF0aFByZWZpeCA9IGluZmVyV2FzbVBhdGhQcmVmaXhGcm9tU2NyaXB0U3JjKCk7XHJcbiAgICAgICAgICAgIGlmIChpbmZlcnJlZFdhc21QYXRoUHJlZml4KSB7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgPSBpbmZlcnJlZFdhc21QYXRoUHJlZml4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBCVUlMRF9ERUZTLklTX0VTTSAmJlxyXG4gICAgICAgICAgICBCVUlMRF9ERUZTLkVOQUJMRV9CVU5ETEVfV0FTTV9KUyAmJlxyXG4gICAgICAgICAgICAhbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgJiZcclxuICAgICAgICAgICAgKG9iamVjdFVybCB8fCBpc0VzbUltcG9ydE1ldGFVcmxIYXJkY29kZWRBc0ZpbGVVcmkpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgLy8gZm9yIGEgYnVpbGQgYnVuZGxlZCB0aGUgd2FzbSBKUywgaWYgZWl0aGVyIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBpcyBtZXQ6XHJcbiAgICAgICAgICAgIC8vIC0gdGhlIHByb3h5IHdvcmtlciBpcyBsb2FkZWQgZnJvbSBhIGJsb2IgVVJMXHJcbiAgICAgICAgICAgIC8vIC0gYGltcG9ydC5tZXRhLnVybGAgaXMgYSBmaWxlIFVSTCwgaXQgbWVhbnMgaXQgaXMgb3ZlcndyaXR0ZW4gYnkgdGhlIGJ1bmRsZXIuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIGluIGVpdGhlciBjYXNlLCB0aGUgcGF0aCBpbmZvcm1hdGlvbiBpcyBsb3N0LCB3ZSBuZWVkIHRvIHBhc3MgdGhlIHBhdGggb2YgdGhlIC53YXNtIGZpbGUgdG8gdGhlIHdvcmtlci5cclxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB1c2UgdGhlIGJ1bmRsZXIgcHJlZmVycmVkIFVSTCBmb3JtYXQ6XHJcbiAgICAgICAgICAgIC8vIG5ldyBVUkwoJ2ZpbGVuYW1lJywgaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICAgICAgICAvLyBzbyB0aGF0IHRoZSBidW5kbGVyIGNhbiBoYW5kbGUgdGhlIGZpbGUgdXNpbmcgY29ycmVzcG9uZGluZyBsb2FkZXJzLlxyXG4gICAgICAgICAgICBtZXNzYWdlLmluIS53YXNtLndhc21QYXRocyA9IHtcclxuICAgICAgICAgICAgICB3YXNtOiAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVBcclxuICAgICAgICAgICAgICAgID8gbmV3IFVSTCgnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWZcclxuICAgICAgICAgICAgICAgIDogIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFVcclxuICAgICAgICAgICAgICAgICAgPyBuZXcgVVJMKCdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWZcclxuICAgICAgICAgICAgICAgICAgOiBuZXcgVVJMKCdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWYsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwcm94eVdvcmtlci5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgICAgIHRlbXBvcmFyeU9iamVjdFVybCA9IG9iamVjdFVybDtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCByZWplY3QpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGluaXRpYWxpemVXZWJBc3NlbWJseShlbnYud2FzbSk7XHJcbiAgICAgIGF3YWl0IGNvcmUuaW5pdFJ1bnRpbWUoZW52KTtcclxuICAgICAgaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBhYm9ydGVkID0gdHJ1ZTtcclxuICAgICAgdGhyb3cgZTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgIGluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbml0aWFsaXplT3J0RXAgPSBhc3luYyAoZXBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgZW5zdXJlV29ya2VyKCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdpbml0LWVwJywgW3Jlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2luaXQtZXAnLCBpbjogeyBlcE5hbWUsIGVudiB9IH07XHJcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhd2FpdCBjb3JlLmluaXRFcChlbnYsIGVwTmFtZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIgPSBhc3luYyAoYnVmZmVyOiBVaW50OEFycmF5KTogUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4gPT4ge1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XHJcbiAgICBlbnN1cmVXb3JrZXIoKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdjb3B5LWZyb20nLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnY29weS1mcm9tJywgaW46IHsgYnVmZmVyIH0gfTtcclxuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIFtidWZmZXIuYnVmZmVyXSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGNvcmUuY29weUZyb21FeHRlcm5hbEJ1ZmZlcihidWZmZXIpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTZXNzaW9uID0gYXN5bmMgKFxyXG4gIG1vZGVsOiBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciB8IFVpbnQ4QXJyYXksXHJcbiAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXHJcbik6IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcclxuICAgIC8vIGNoZWNrIHVuc3VwcG9ydGVkIG9wdGlvbnNcclxuICAgIGlmIChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Nlc3Npb24gb3B0aW9uIFwicHJlZmVycmVkT3V0cHV0TG9jYXRpb25cIiBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcclxuICAgIH1cclxuICAgIGVuc3VyZVdvcmtlcigpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdjcmVhdGUnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnY3JlYXRlJywgaW46IHsgbW9kZWwsIG9wdGlvbnM6IHsgLi4ub3B0aW9ucyB9IH0gfTtcclxuICAgICAgY29uc3QgdHJhbnNmZXJhYmxlOiBUcmFuc2ZlcmFibGVbXSA9IFtdO1xyXG4gICAgICBpZiAobW9kZWwgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XHJcbiAgICAgICAgdHJhbnNmZXJhYmxlLnB1c2gobW9kZWwuYnVmZmVyKTtcclxuICAgICAgfVxyXG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgdHJhbnNmZXJhYmxlKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gY29yZS5jcmVhdGVTZXNzaW9uKG1vZGVsLCBvcHRpb25zKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVsZWFzZVNlc3Npb24gPSBhc3luYyAoc2Vzc2lvbklkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgZW5zdXJlV29ya2VyKCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdyZWxlYXNlJywgW3Jlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ3JlbGVhc2UnLCBpbjogc2Vzc2lvbklkIH07XHJcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb3JlLnJlbGVhc2VTZXNzaW9uKHNlc3Npb25JZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJ1biA9IGFzeW5jIChcclxuICBzZXNzaW9uSWQ6IG51bWJlcixcclxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxyXG4gIGlucHV0czogVGVuc29yTWV0YWRhdGFbXSxcclxuICBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcclxuICBvdXRwdXRzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxyXG4gIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcclxuKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcclxuICAgIC8vIGNoZWNrIGlucHV0cyBsb2NhdGlvblxyXG4gICAgaWYgKGlucHV0cy5zb21lKCh0KSA9PiB0WzNdICE9PSAnY3B1JykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnB1dCB0ZW5zb3Igb24gR1BVIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xyXG4gICAgfVxyXG4gICAgLy8gY2hlY2sgb3V0cHV0cyBsb2NhdGlvblxyXG4gICAgaWYgKG91dHB1dHMuc29tZSgodCkgPT4gdCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcmUtYWxsb2NhdGVkIG91dHB1dCB0ZW5zb3IgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XHJcbiAgICB9XHJcbiAgICBlbnN1cmVXb3JrZXIoKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ3J1bicsIFtyZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgY29uc3Qgc2VyaWFsaXphYmxlSW5wdXRzID0gaW5wdXRzIGFzIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhW107IC8vIGV2ZXJ5IGlucHV0IGlzIG9uIENQVS5cclxuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7XHJcbiAgICAgICAgdHlwZTogJ3J1bicsXHJcbiAgICAgICAgaW46IHsgc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0czogc2VyaWFsaXphYmxlSW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvcHRpb25zIH0sXHJcbiAgICAgIH07XHJcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBjb3JlLmV4dHJhY3RUcmFuc2ZlcmFibGVCdWZmZXJzKHNlcmlhbGl6YWJsZUlucHV0cykpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBjb3JlLnJ1bihzZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZW5kUHJvZmlsaW5nID0gYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcclxuICAgIGVuc3VyZVdvcmtlcigpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnZW5kLXByb2ZpbGluZycsIFtyZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdlbmQtcHJvZmlsaW5nJywgaW46IHNlc3Npb25JZCB9O1xyXG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29yZS5lbmRQcm9maWxpbmcoc2Vzc2lvbklkKTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHtcclxuICBJbmZlcmVuY2VTZXNzaW9uLFxyXG4gIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyLFxyXG4gIFNlc3Npb25IYW5kbGVyLFxyXG4gIFRlbnNvcixcclxuICBUUkFDRV9GVU5DX0JFR0lOLFxyXG4gIFRSQUNFX0ZVTkNfRU5ELFxyXG59IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlciwgVGVuc29yTWV0YWRhdGEgfSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcclxuaW1wb3J0IHsgY29weUZyb21FeHRlcm5hbEJ1ZmZlciwgY3JlYXRlU2Vzc2lvbiwgZW5kUHJvZmlsaW5nLCByZWxlYXNlU2Vzc2lvbiwgcnVuIH0gZnJvbSAnLi9wcm94eS13cmFwcGVyJztcclxuaW1wb3J0IHsgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlLCBpc01MVGVuc29yU3VwcG9ydGVkVHlwZSB9IGZyb20gJy4vd2FzbS1jb21tb24nO1xyXG5pbXBvcnQgeyBpc05vZGUgfSBmcm9tICcuL3dhc20tdXRpbHMtZW52JztcclxuaW1wb3J0IHsgbG9hZEZpbGUgfSBmcm9tICcuL3dhc20tdXRpbHMtbG9hZC1maWxlJztcclxuXHJcbmV4cG9ydCBjb25zdCBlbmNvZGVUZW5zb3JNZXRhZGF0YSA9ICh0ZW5zb3I6IFRlbnNvciwgZ2V0TmFtZTogKCkgPT4gc3RyaW5nKTogVGVuc29yTWV0YWRhdGEgPT4ge1xyXG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XHJcbiAgICBjYXNlICdjcHUnOlxyXG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgdGVuc29yLmRhdGEsICdjcHUnXTtcclxuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxyXG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgeyBncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXIgfSwgJ2dwdS1idWZmZXInXTtcclxuICAgIGNhc2UgJ21sLXRlbnNvcic6XHJcbiAgICAgIHJldHVybiBbdGVuc29yLnR5cGUsIHRlbnNvci5kaW1zLCB7IG1sVGVuc29yOiB0ZW5zb3IubWxUZW5zb3IgfSwgJ21sLXRlbnNvciddO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgbG9jYXRpb246ICR7dGVuc29yLmxvY2F0aW9ufSBmb3IgJHtnZXROYW1lKCl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlY29kZVRlbnNvck1ldGFkYXRhID0gKHRlbnNvcjogVGVuc29yTWV0YWRhdGEpOiBUZW5zb3IgPT4ge1xyXG4gIHN3aXRjaCAodGVuc29yWzNdKSB7XHJcbiAgICBjYXNlICdjcHUnOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3JbMF0sIHRlbnNvclsyXSwgdGVuc29yWzFdKTtcclxuICAgIGNhc2UgJ2dwdS1idWZmZXInOiB7XHJcbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xyXG4gICAgICBpZiAoIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZShkYXRhVHlwZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBHUFUgdGVuc29yYCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyBncHVCdWZmZXIsIGRvd25sb2FkLCBkaXNwb3NlIH0gPSB0ZW5zb3JbMl07XHJcbiAgICAgIHJldHVybiBUZW5zb3IuZnJvbUdwdUJ1ZmZlcihncHVCdWZmZXIsIHsgZGF0YVR5cGUsIGRpbXM6IHRlbnNvclsxXSwgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XHJcbiAgICB9XHJcbiAgICBjYXNlICdtbC10ZW5zb3InOiB7XHJcbiAgICAgIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xyXG4gICAgICBpZiAoIWlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlKGRhdGFUeXBlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbm90IHN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7ZGF0YVR5cGV9IGZvciBkZXNlcmlhbGl6aW5nIE1MVGVuc29yIHRlbnNvcmApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgbWxUZW5zb3IsIGRvd25sb2FkLCBkaXNwb3NlIH0gPSB0ZW5zb3JbMl07XHJcbiAgICAgIHJldHVybiBUZW5zb3IuZnJvbU1MVGVuc29yKG1sVGVuc29yLCB7IGRhdGFUeXBlLCBkaW1zOiB0ZW5zb3JbMV0sIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgbG9jYXRpb246ICR7dGVuc29yWzNdfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIgaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB7XHJcbiAgcHJpdmF0ZSBzZXNzaW9uSWQ6IG51bWJlcjtcclxuXHJcbiAgaW5wdXROYW1lczogcmVhZG9ubHkgc3RyaW5nW107XHJcbiAgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG4gIGlucHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xyXG4gIG91dHB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcclxuXHJcbiAgYXN5bmMgZmV0Y2hNb2RlbEFuZENvcHlUb1dhc21NZW1vcnkocGF0aDogc3RyaW5nKTogUHJvbWlzZTxTZXJpYWxpemFibGVJbnRlcm5hbEJ1ZmZlcj4ge1xyXG4gICAgLy8gZmV0Y2ggbW9kZWwgZnJvbSB1cmwgYW5kIG1vdmUgdG8gd2FzbSBoZWFwLlxyXG4gICAgcmV0dXJuIGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYXdhaXQgbG9hZEZpbGUocGF0aCkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9hZE1vZGVsKHBhdGhPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcclxuICAgIGxldCBtb2RlbDogUGFyYW1ldGVyczx0eXBlb2YgY3JlYXRlU2Vzc2lvbj5bMF07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBwYXRoT3JCdWZmZXIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGlmIChpc05vZGUpIHtcclxuICAgICAgICAvLyBub2RlXHJcbiAgICAgICAgbW9kZWwgPSBhd2FpdCBsb2FkRmlsZShwYXRoT3JCdWZmZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGJyb3dzZXJcclxuICAgICAgICAvLyBmZXRjaCBtb2RlbCBhbmQgY29weSB0byB3YXNtIGhlYXAuXHJcbiAgICAgICAgbW9kZWwgPSBhd2FpdCB0aGlzLmZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGhPckJ1ZmZlcik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1vZGVsID0gcGF0aE9yQnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIFt0aGlzLnNlc3Npb25JZCwgdGhpcy5pbnB1dE5hbWVzLCB0aGlzLm91dHB1dE5hbWVzLCB0aGlzLmlucHV0TWV0YWRhdGEsIHRoaXMub3V0cHV0TWV0YWRhdGFdID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihcclxuICAgICAgbW9kZWwsXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICApO1xyXG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGRpc3Bvc2UoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gcmVsZWFzZVNlc3Npb24odGhpcy5zZXNzaW9uSWQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcnVuKFxyXG4gICAgZmVlZHM6IFNlc3Npb25IYW5kbGVyLkZlZWRzVHlwZSxcclxuICAgIGZldGNoZXM6IFNlc3Npb25IYW5kbGVyLkZldGNoZXNUeXBlLFxyXG4gICAgb3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxyXG4gICk6IFByb21pc2U8U2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZT4ge1xyXG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xyXG4gICAgY29uc3QgaW5wdXRBcnJheTogVGVuc29yW10gPSBbXTtcclxuICAgIGNvbnN0IGlucHV0SW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuICAgIE9iamVjdC5lbnRyaWVzKGZlZWRzKS5mb3JFYWNoKChrdnApID0+IHtcclxuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcclxuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5wdXROYW1lcy5pbmRleE9mKG5hbWUpO1xyXG4gICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGlucHV0ICcke25hbWV9J2ApO1xyXG4gICAgICB9XHJcbiAgICAgIGlucHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xyXG4gICAgICBpbnB1dEluZGljZXMucHVzaChpbmRleCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBvdXRwdXRBcnJheTogQXJyYXk8VGVuc29yIHwgbnVsbD4gPSBbXTtcclxuICAgIGNvbnN0IG91dHB1dEluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgICBPYmplY3QuZW50cmllcyhmZXRjaGVzKS5mb3JFYWNoKChrdnApID0+IHtcclxuICAgICAgY29uc3QgbmFtZSA9IGt2cFswXTtcclxuICAgICAgY29uc3QgdGVuc29yID0ga3ZwWzFdO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBvdXRwdXQgJyR7bmFtZX0nYCk7XHJcbiAgICAgIH1cclxuICAgICAgb3V0cHV0QXJyYXkucHVzaCh0ZW5zb3IpO1xyXG4gICAgICBvdXRwdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaW5wdXRzID0gaW5wdXRBcnJheS5tYXAoKHQsIGkpID0+XHJcbiAgICAgIGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBpbnB1dCBcIiR7dGhpcy5pbnB1dE5hbWVzW2lucHV0SW5kaWNlc1tpXV19XCJgKSxcclxuICAgICk7XHJcbiAgICBjb25zdCBvdXRwdXRzID0gb3V0cHV0QXJyYXkubWFwKCh0LCBpKSA9PlxyXG4gICAgICB0ID8gZW5jb2RlVGVuc29yTWV0YWRhdGEodCwgKCkgPT4gYG91dHB1dCBcIiR7dGhpcy5vdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXX1cImApIDogbnVsbCxcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHJ1bih0aGlzLnNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG91dHB1dHMsIG9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdE1hcDogU2Vzc2lvbkhhbmRsZXIuUmV0dXJuVHlwZSA9IHt9O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHJlc3VsdE1hcFt0aGlzLm91dHB1dE5hbWVzW291dHB1dEluZGljZXNbaV1dXSA9IG91dHB1dEFycmF5W2ldID8/IGRlY29kZVRlbnNvck1ldGFkYXRhKHJlc3VsdHNbaV0pO1xyXG4gICAgfVxyXG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcclxuICAgIHJldHVybiByZXN1bHRNYXA7XHJcbiAgfVxyXG5cclxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkIHtcclxuICAgIC8vIFRPRE86IGltcGxlbWVudCBwcm9maWxpbmdcclxuICB9XHJcblxyXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcclxuICAgIHZvaWQgZW5kUHJvZmlsaW5nKHRoaXMuc2Vzc2lvbklkKTtcclxuICB9XHJcbn1cclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBCYWNrZW5kLCBlbnYsIEluZmVyZW5jZVNlc3Npb24sIEluZmVyZW5jZVNlc3Npb25IYW5kbGVyIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGluaXRpYWxpemVPcnRFcCwgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSB9IGZyb20gJy4vd2FzbS9wcm94eS13cmFwcGVyJztcclxuaW1wb3J0IHsgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyIH0gZnJvbSAnLi93YXNtL3Nlc3Npb24taGFuZGxlci1pbmZlcmVuY2UnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgYWxsIGZsYWdzIGZvciBXZWJBc3NlbWJseS5cclxuICpcclxuICogVGhvc2UgZmxhZ3MgYXJlIGFjY2Vzc2libGUgZnJvbSBgb3J0LmVudi53YXNtYC4gVXNlcnMgYXJlIGFsbG93IHRvIHNldCB0aG9zZSBmbGFncyBiZWZvcmUgdGhlIGZpcnN0IGluZmVyZW5jZSBzZXNzaW9uXHJcbiAqIGJlaW5nIGNyZWF0ZWQsIHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsdWUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZUZsYWdzID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmICh0eXBlb2YgZW52Lndhc20uaW5pdFRpbWVvdXQgIT09ICdudW1iZXInIHx8IGVudi53YXNtLmluaXRUaW1lb3V0IDwgMCkge1xyXG4gICAgZW52Lndhc20uaW5pdFRpbWVvdXQgPSAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2ltZCA9IGVudi53YXNtLnNpbWQ7XHJcbiAgaWYgKHR5cGVvZiBzaW1kICE9PSAnYm9vbGVhbicgJiYgc2ltZCAhPT0gdW5kZWZpbmVkICYmIHNpbWQgIT09ICdmaXhlZCcgJiYgc2ltZCAhPT0gJ3JlbGF4ZWQnKSB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgY29uc29sZS53YXJuKFxyXG4gICAgICBgUHJvcGVydHkgXCJlbnYud2FzbS5zaW1kXCIgaXMgc2V0IHRvIHVua25vd24gdmFsdWUgXCIke3NpbWR9XCIuIFJlc2V0IGl0IHRvIFxcYGZhbHNlXFxgIGFuZCBpZ25vcmUgU0lNRCBmZWF0dXJlIGNoZWNraW5nLmAsXHJcbiAgICApO1xyXG4gICAgZW52Lndhc20uc2ltZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5wcm94eSAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICBlbnYud2FzbS5wcm94eSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS50cmFjZSAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICBlbnYud2FzbS50cmFjZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBlbnYud2FzbS5udW1UaHJlYWRzICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzSW50ZWdlcihlbnYud2FzbS5udW1UaHJlYWRzKSB8fCBlbnYud2FzbS5udW1UaHJlYWRzIDw9IDApIHtcclxuICAgIC8vIFRoZSBmb2xsb3dpbmcgbG9naWMgb25seSBhcHBsaWVzIHdoZW4gYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCBpcyBub3Qgc2V0IGJ5IHVzZXIuIFdlIHdpbGwgYWx3YXlzIGhvbm9yIHVzZXInc1xyXG4gICAgLy8gc2V0dGluZyBpZiBpdCBpcyBwcm92aWRlZC5cclxuXHJcbiAgICAvLyBCcm93c2VyOiB3aGVuIGNyb3NzT3JpZ2luSXNvbGF0ZWQgaXMgZmFsc2UsIFNoYXJlZEFycmF5QnVmZmVyIGlzIG5vdCBhdmFpbGFibGUgc28gV2ViQXNzZW1ibHkgdGhyZWFkcyB3aWxsIG5vdFxyXG4gICAgLy8gd29yay4gSW4gdGhpcyBjYXNlLCB3ZSB3aWxsIHNldCBudW1UaHJlYWRzIHRvIDEuXHJcbiAgICAvL1xyXG4gICAgLy8gVGhlcmUgaXMgYW4gZXhjZXB0aW9uOiB3aGVuIHRoZSBicm93c2VyIGlzIGNvbmZpZ3VyZWQgdG8gZm9yY2UtZW5hYmxlIFNoYXJlZEFycmF5QnVmZmVyIChlLmcuIENocm9tdWltIHdpdGhcclxuICAgIC8vIC0tZW5hYmxlLWZlYXR1cmVzPVNoYXJlZEFycmF5QnVmZmVyKSwgaXQgaXMgcG9zc2libGUgdGhhdCBgc2VsZi5jcm9zc09yaWdpbklzb2xhdGVkYCBpcyBmYWxzZSBhbmRcclxuICAgIC8vIFNoYXJlZEFycmF5QnVmZmVyIGlzIGF2YWlsYWJsZSBhdCB0aGUgc2FtZSB0aW1lLiBUaGlzIGlzIHVzdWFsbHkgZm9yIHRlc3RpbmcuIEluIHRoaXMgY2FzZSwgIHdlIHdpbGwgc3RpbGwgc2V0XHJcbiAgICAvLyBudW1UaHJlYWRzIHRvIDEgaGVyZS4gSWYgd2Ugd2FudCB0byBlbmFibGUgbXVsdGktdGhyZWFkaW5nIGluIHRlc3QsIHdlIHNob3VsZCBzZXQgYG9ydC5lbnYud2FzbS5udW1UaHJlYWRzYCB0byBhXHJcbiAgICAvLyB2YWx1ZSBncmVhdGVyIHRoYW4gMS5cclxuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgIXNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZCkge1xyXG4gICAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG51bUNwdUxvZ2ljYWxDb3JlcyA9XHJcbiAgICAgICAgdHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCdub2RlOm9zJykuY3B1cygpLmxlbmd0aCA6IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5O1xyXG4gICAgICBlbnYud2FzbS5udW1UaHJlYWRzID0gTWF0aC5taW4oNCwgTWF0aC5jZWlsKChudW1DcHVMb2dpY2FsQ29yZXMgfHwgMSkgLyAyKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kIGltcGxlbWVudHMgQmFja2VuZCB7XHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBpbml0aWFsaXplcyB0aGUgV2ViQXNzZW1ibHkgYmFja2VuZC5cclxuICAgKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgb25seSBvbmNlIGZvciBlYWNoIGJhY2tlbmQgbmFtZS4gSXQgd2lsbCBiZSBjYWxsZWQgdGhlIGZpcnN0IHRpbWUgd2hlblxyXG4gICAqIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkIHdpdGggYSByZWdpc3RlcmVkIGJhY2tlbmQgbmFtZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBiYWNrZW5kTmFtZSAtIHRoZSByZWdpc3RlcmVkIGJhY2tlbmQgbmFtZS5cclxuICAgKi9cclxuICBhc3luYyBpbml0KGJhY2tlbmROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIHBvcHVsYXRlIHdhc20gZmxhZ3NcclxuICAgIGluaXRpYWxpemVGbGFncygpO1xyXG5cclxuICAgIC8vIGluaXQgd2FzbVxyXG4gICAgYXdhaXQgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSgpO1xyXG5cclxuICAgIC8vIHBlcmZvcm1lIEVQIHNwZWNpZmljIGluaXRpYWxpemF0aW9uXHJcbiAgICBhd2FpdCBpbml0aWFsaXplT3J0RXAoYmFja2VuZE5hbWUpO1xyXG4gIH1cclxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihcclxuICAgIHBhdGg6IHN0cmluZyxcclxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxyXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xyXG4gIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxyXG4gICAgYnVmZmVyOiBVaW50OEFycmF5LFxyXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXHJcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj47XHJcbiAgYXN5bmMgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXHJcbiAgICBwYXRoT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksXHJcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcclxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPiB7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlcigpO1xyXG4gICAgYXdhaXQgaGFuZGxlci5sb2FkTW9kZWwocGF0aE9yQnVmZmVyLCBvcHRpb25zKTtcclxuICAgIHJldHVybiBoYW5kbGVyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHdhc21CYWNrZW5kID0gbmV3IE9ubnhydW50aW1lV2ViQXNzZW1ibHlCYWNrZW5kKCk7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlcywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cyAqL1xyXG5cclxuLy8gV2UgdXNlIFwicmVxdWlyZVwiIGluc3RlYWQgb2YgXCJpbXBvcnRcIiBoZXJlIGJlY2F1c2UgaW1wb3J0IHN0YXRlbWVudCBtdXN0IGJlIHB1dCBpbiB0b3AgbGV2ZWwuIE91ciBjdXJyZW50IGNvZGUgZG9lc1xyXG4vLyBub3QgYWxsb3cgYnVuZGxlciB0byB0cmVlLXNoYWtpbmcgY29kZSBhcyBleHBlY3RlZCBiZWNhdXNlIHNvbWUgY29kZXMgYXJlIHRyZWF0ZWQgYXMgaGF2aW5nIHNpZGUgZWZmZWN0cy5cclxuLy8gU28gd2UgaW1wb3J0IGNvZGUgaW5zaWRlIHRoZSBpZi1jbGF1c2UgdG8gYWxsb3cgYnVuZGxlciByZW1vdmUgdGhlIGNvZGUgc2FmZWx5LlxyXG5cclxuZXhwb3J0ICogZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuaW1wb3J0ICogYXMgb3J0IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcbmV4cG9ydCBkZWZhdWx0IG9ydDtcclxuXHJcbmltcG9ydCB7IHJlZ2lzdGVyQmFja2VuZCwgZW52IH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuaW1wb3J0IHsgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbic7XHJcblxyXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHTCkge1xyXG4gIGNvbnN0IG9ubnhqc0JhY2tlbmQgPSByZXF1aXJlKCcuL2JhY2tlbmQtb25ueGpzJykub25ueGpzQmFja2VuZDtcclxuICByZWdpc3RlckJhY2tlbmQoJ3dlYmdsJywgb25ueGpzQmFja2VuZCwgLTEwKTtcclxufVxyXG5cclxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCAmJiAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gIHRocm93IG5ldyBFcnJvcihcclxuICAgICdUaGUgY3VycmVudCBidWlsZCBpcyBzcGVjaWZpZWQgdG8gZW5hYmxlIGJvdGggSlNFUCBhbmQgV2ViR1BVIEVQLiBUaGlzIGlzIG5vdCBhIHZhbGlkIGNvbmZpZ3VyYXRpb24uICcgK1xyXG4gICAgICAnSlNFUCBhbmQgV2ViR1BVIEVQcyBjYW5ub3QgYmUgZW5hYmxlZCBhdCB0aGUgc2FtZSB0aW1lLicsXHJcbiAgKTtcclxufVxyXG5cclxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCTk4gJiYgQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgJiYgQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gIHRocm93IG5ldyBFcnJvcihcclxuICAgICdUaGUgY3VycmVudCBidWlsZCBpcyBzcGVjaWZpZWQgdG8gZW5hYmxlIFdlYk5OIEVQIHdpdGhvdXQgSlNFUCBvciBXZWJHUFUgRVAuIFRoaXMgaXMgbm90IGEgdmFsaWQgY29uZmlndXJhdGlvbi4gJyArXHJcbiAgICAgICdXZWJOTiBFUCByZXF1aXJlcyBlaXRoZXIgSlNFUCBvciBXZWJHUFUgRVAgdG8gYmUgZW5hYmxlZC4nLFxyXG4gICk7XHJcbn1cclxuXHJcbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU00pIHtcclxuICBjb25zdCB3YXNtQmFja2VuZCA9IHJlcXVpcmUoJy4vYmFja2VuZC13YXNtJykud2FzbUJhY2tlbmQ7XHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJncHUnLCB3YXNtQmFja2VuZCwgNSk7XHJcbiAgfVxyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQk5OKSB7XHJcbiAgICByZWdpc3RlckJhY2tlbmQoJ3dlYm5uJywgd2FzbUJhY2tlbmQsIDUpO1xyXG4gIH1cclxuICByZWdpc3RlckJhY2tlbmQoJ2NwdScsIHdhc21CYWNrZW5kLCAxMCk7XHJcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3YXNtJywgd2FzbUJhY2tlbmQsIDEwKTtcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudi52ZXJzaW9ucywgJ3dlYicsIHsgdmFsdWU6IHZlcnNpb24sIGVudW1lcmFibGU6IHRydWUgfSk7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xyXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMjMuMCc7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFnQk0sVUFDQSwwQkFZTyxpQkF3Q1AsZ0NBd0NPO0FBN0diOzs7QUFnQkEsTUFBTSxXQUFxQyxvQkFBSSxJQUFHO0FBQ2xELE1BQU0sMkJBQXFDLENBQUE7QUFZcEMsTUFBTSxrQkFBa0IsQ0FBQyxNQUFjLFNBQWtCLGFBQTBCO0FBQ3hGLFlBQUksV0FBVyxPQUFPLFFBQVEsU0FBUyxjQUFjLE9BQU8sUUFBUSxrQ0FBa0MsWUFBWTtBQUNoSCxnQkFBTSxpQkFBaUIsU0FBUyxJQUFJLElBQUk7QUFDeEMsY0FBSSxtQkFBbUIsUUFBVztBQUNoQyxxQkFBUyxJQUFJLE1BQU0sRUFBRSxTQUFTLFNBQVEsQ0FBRTtxQkFDL0IsZUFBZSxXQUFXLFVBQVU7QUFFN0M7cUJBQ1MsZUFBZSxhQUFhLFVBQVU7QUFDL0MsZ0JBQUksZUFBZSxZQUFZLFNBQVM7QUFDdEMsb0JBQU0sSUFBSSxNQUFNLDRCQUE0QixJQUFJLG9CQUFvQixRQUFRLEVBQUU7OztBQUlsRixjQUFJLFlBQVksR0FBRztBQUNqQixrQkFBTSxJQUFJLHlCQUF5QixRQUFRLElBQUk7QUFDL0MsZ0JBQUksTUFBTSxJQUFJO0FBQ1osdUNBQXlCLE9BQU8sR0FBRyxDQUFDOztBQUd0QyxxQkFBU0EsS0FBSSxHQUFHQSxLQUFJLHlCQUF5QixRQUFRQSxNQUFLO0FBQ3hELGtCQUFJLFNBQVMsSUFBSSx5QkFBeUJBLEVBQUMsQ0FBQyxFQUFHLFlBQVksVUFBVTtBQUNuRSx5Q0FBeUIsT0FBT0EsSUFBRyxHQUFHLElBQUk7QUFDMUM7OztBQUdKLHFDQUF5QixLQUFLLElBQUk7O0FBRXBDOztBQUdGLGNBQU0sSUFBSSxVQUFV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QUEsSUFDekM7QUFDQSxvQkFBZ0IsT0FBT0EsY0FBYSxFQUFFO0FBQ3RDLG9CQUFnQixRQUFRQSxjQUFhLEVBQUU7QUFBQSxFQUN6QztBQUVBLFNBQU8sZUFBZUMsS0FBSSxVQUFVLE9BQU8sRUFBRSxPQUFPQyxVQUFTLFlBQVksS0FBSyxDQUFDOyIsCiAgIm5hbWVzIjogWyJpIiwgImVudiIsICJGbG9hdDE2QXJyYXkiLCAiVGVuc29yIiwgIlRlbnNvciIsICJJbmZlcmVuY2VTZXNzaW9uIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgImVudiIsICJlbnYiLCAid2FzbSIsICJ3YXNtIiwgIndhc20iLCAibG9jYXRpb24iLCAiZW52IiwgIndhc20iLCAibG9jYXRpb24iLCAiaW5kZXgiLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIiwgImluaXRpYWxpemluZyIsICJpbml0aWFsaXplZCIsICJhYm9ydGVkIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJUZW5zb3IiLCAiY29weUZyb21FeHRlcm5hbEJ1ZmZlciIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiZW52IiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgImVudiIsICJ2ZXJzaW9uIiwgIndhc21CYWNrZW5kIiwgImVudiIsICJ2ZXJzaW9uIl0KfQo=
