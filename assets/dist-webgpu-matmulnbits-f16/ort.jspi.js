/*!
 * ONNX Runtime Web v1.30.0
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
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
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
      version = "1.30.0";
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
            return new URL(new URL2("ort.jspi.js", void 0).href, origin).href;
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
        /* @vite-ignore */
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
        (false ? null : true ? null : true ? null : null).default
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
            useEmbeddedModule = isSameOrigin(scriptSrc) || isWasmOverridden && !isMultiThreaded;
          }
        }
        if (useEmbeddedModule) {
          return [void 0, embeddedWasmModule];
        } else {
          const wasmModuleFilename = false ? "ort-wasm-simd-threaded.jsep.mjs" : true ? "ort-wasm-simd-threaded.jspi.mjs" : true ? "ort-wasm-simd-threaded.asyncify.mjs" : "ort-wasm-simd-threaded.mjs";
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
        } catch {
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
        } catch {
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
        } catch {
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
        if (true) {
          if (!("Suspending" in WebAssembly)) {
            throw new Error("WebAssembly JSPI is not supported in the current environment.");
          }
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
              config.locateFile = (fileName) => fileName;
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
  var getGraphOptimzationLevel, getExecutionMode, appendDefaultOptions, appendSessionConfig, appendEpOption, setExecutionProviders, setSessionOptions;
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
      appendEpOption = (epOptions, key, value, allocs) => {
        const keyDataOffset = allocWasmString(key, allocs);
        const valueDataOffset = allocWasmString(value, allocs);
        epOptions.push([keyDataOffset, valueDataOffset]);
      };
      setExecutionProviders = async (sessionOptionsHandle, sessionOptions, allocs) => {
        const executionProviders = sessionOptions.executionProviders;
        for (const ep of executionProviders) {
          let epName = typeof ep === "string" ? ep : ep.name;
          const epOptions = [];
          switch (epName) {
            case "webnn":
              epName = "WEBNN";
              appendSessionConfig(sessionOptionsHandle, "session.disable_quant_qdq", "1", allocs);
              appendSessionConfig(sessionOptionsHandle, "session.disable_qdq_constant_folding", "1", allocs);
              if (typeof ep !== "string") {
                const webnnOptions = ep;
                const deviceType = webnnOptions?.deviceType;
                if (deviceType) {
                  appendSessionConfig(sessionOptionsHandle, "deviceType", deviceType, allocs);
                }
              }
              break;
            case "webgpu":
              if (true) {
                epName = "WebGPU";
                let customDevice;
                if (typeof ep !== "string") {
                  const webgpuOptions = ep;
                  if (webgpuOptions.device) {
                    if (typeof GPUDevice !== "undefined" && webgpuOptions.device instanceof GPUDevice) {
                      customDevice = webgpuOptions.device;
                    } else {
                      throw new Error("Invalid GPU device set in WebGPU EP options.");
                    }
                  }
                  const { enableGraphCapture } = sessionOptions;
                  if (typeof enableGraphCapture === "boolean" && enableGraphCapture) {
                    appendEpOption(epOptions, "enableGraphCapture", "1", allocs);
                  }
                  if (typeof webgpuOptions.preferredLayout === "string") {
                    appendEpOption(epOptions, "preferredLayout", webgpuOptions.preferredLayout, allocs);
                  }
                  if (webgpuOptions.forceCpuNodeNames) {
                    const names = Array.isArray(webgpuOptions.forceCpuNodeNames) ? webgpuOptions.forceCpuNodeNames : [webgpuOptions.forceCpuNodeNames];
                    appendEpOption(epOptions, "forceCpuNodeNames", names.join("\n"), allocs);
                  }
                  if (webgpuOptions.validationMode) {
                    appendEpOption(epOptions, "validationMode", webgpuOptions.validationMode, allocs);
                  }
                  for (const key of [
                    "storageBufferCacheMode",
                    "uniformBufferCacheMode",
                    "queryResolveBufferCacheMode",
                    "defaultBufferCacheMode"
                  ]) {
                    const mode = webgpuOptions[key];
                    if (mode) {
                      if (mode !== "disabled" && mode !== "lazyRelease" && mode !== "simple" && mode !== "bucket") {
                        throw new Error(`${key} must be one of 'disabled', 'lazyRelease', 'simple' or 'bucket': ${mode}`);
                      }
                      appendEpOption(epOptions, key, mode, allocs);
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
            await setExecutionProviders(sessionOptionsHandle, sessionOptions, allocs);
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
            return typeof Float16Array !== "undefined" ? Float16Array : Uint16Array;
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

  // web/lib/wasm/jsep/tensor-view.ts
  var createView;
  var init_tensor_view = __esm({
    "web/lib/wasm/jsep/tensor-view.ts"() {
      "use strict";
      init_wasm_common();
      createView = (dataBuffer, type) => new (tensorTypeToTypedArrayConstructor(type))(dataBuffer);
    }
  });

  // web/lib/wasm/jsep/log.ts
  var logLevelPrefix, doLog, configLogLevel, debug, configureLogger, LOG, LOG_DEBUG;
  var init_log = __esm({
    "web/lib/wasm/jsep/log.ts"() {
      "use strict";
      init_wasm_common();
      logLevelPrefix = ["V", "I", "W", "E", "F"];
      doLog = (level, message) => {
        console.log(`[${logLevelPrefix[level]},${(/* @__PURE__ */ new Date()).toISOString()}]${message}`);
      };
      configureLogger = ($configLogLevel, $debug) => {
        configLogLevel = $configLogLevel;
        debug = $debug;
      };
      LOG = (logLevel, msg) => {
        const messageLevel = logLevelStringToEnum(logLevel);
        const configLevel = logLevelStringToEnum(configLogLevel);
        if (messageLevel >= configLevel) {
          doLog(messageLevel, typeof msg === "function" ? msg() : msg);
        }
      };
      LOG_DEBUG = (...args) => {
        if (debug) {
          LOG(...args);
        }
      };
    }
  });

  // web/lib/wasm/jsep/webnn/tensor-manager.ts
  var webnnDataTypeToSize, convertDataToInt32, convertInt32ToData, tensorGuid, createNewTensorId, webnnDataTypeToFallback, calculateByteLength, TensorWrapper, TensorIdTracker, TensorManagerImpl, createTensorManager;
  var init_tensor_manager = __esm({
    "web/lib/wasm/jsep/webnn/tensor-manager.ts"() {
      "use strict";
      init_wasm_common();
      init_log();
      webnnDataTypeToSize = /* @__PURE__ */ new Map([
        ["float32", 32],
        ["float16", 16],
        ["int32", 32],
        ["uint32", 32],
        ["int64", 64],
        ["uint64", 64],
        ["int8", 8],
        ["uint8", 8],
        ["int4", 4],
        ["uint4", 4]
      ]);
      convertDataToInt32 = (data, dataType) => {
        if (dataType === "int32") {
          return data;
        }
        const dataTypeSize = webnnDataTypeToSize.get(dataType);
        if (!dataTypeSize) {
          throw new Error(`WebNN backend does not support data type: ${dataType}`);
        }
        const bytesPerElement = dataTypeSize / 8;
        if (data.byteLength % bytesPerElement !== 0) {
          throw new Error(`Invalid Uint8Array length - must be a multiple of ${bytesPerElement}.`);
        }
        const numElements = data.byteLength / bytesPerElement;
        const originalArray = new (tensorTypeToTypedArrayConstructor(dataType))(
          data.buffer,
          data.byteOffset,
          numElements
        );
        switch (dataType) {
          case "int64":
          case "uint64": {
            const int32Array = new Int32Array(numElements);
            for (let i = 0; i < numElements; i++) {
              const value = originalArray[i];
              if (value > 2147483647n || value < -2147483648n) {
                throw new Error(`Can not convert int64 data to int32 - value out of range.`);
              }
              int32Array[i] = Number(value);
            }
            return new Uint8Array(int32Array.buffer);
          }
          case "int8":
          case "uint8":
          case "uint32": {
            if (dataType === "uint32") {
              if (originalArray.some((value) => value > 2147483647)) {
                throw new Error(`Can not convert uint32 data to int32 - value out of range.`);
              }
            }
            const int32Array = Int32Array.from(originalArray, Number);
            return new Uint8Array(int32Array.buffer);
          }
          default:
            throw new Error(`Unsupported data conversion from ${dataType} to 'int32'`);
        }
      };
      convertInt32ToData = (data, dataType) => {
        if (dataType === "int32") {
          return data;
        }
        if (data.byteLength % 4 !== 0) {
          throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");
        }
        const numElements = data.byteLength / 4;
        const int32Array = new Int32Array(data.buffer, data.byteOffset, numElements);
        switch (dataType) {
          case "int64": {
            const bigInt64Array = BigInt64Array.from(int32Array, BigInt);
            return new Uint8Array(bigInt64Array.buffer);
          }
          case "uint64": {
            if (int32Array.some((value) => value < 0)) {
              throw new Error("Can not convert int32 data to uin64 - negative value found.");
            }
            const bigUint64Array = BigUint64Array.from(int32Array, BigInt);
            return new Uint8Array(bigUint64Array.buffer);
          }
          case "int8": {
            if (int32Array.some((value) => value < -128 || value > 127)) {
              throw new Error("Can not convert int32 data to int8 - value out of range.");
            }
            const int8Array = Int8Array.from(int32Array, Number);
            return new Uint8Array(int8Array.buffer);
          }
          case "uint8": {
            if (int32Array.some((value) => value < 0 || value > 255)) {
              throw new Error("Can not convert int32 data to uint8 - value out of range.");
            }
            return Uint8Array.from(int32Array, Number);
          }
          case "uint32": {
            if (int32Array.some((value) => value < 0)) {
              throw new Error("Can not convert int32 data to uint32 - negative value found.");
            }
            const uint32Array = Uint32Array.from(int32Array, Number);
            return new Uint8Array(uint32Array.buffer);
          }
          default:
            throw new Error(`Unsupported data conversion from 'int32' to ${dataType}`);
        }
      };
      tensorGuid = 1;
      createNewTensorId = () => tensorGuid++;
      webnnDataTypeToFallback = /* @__PURE__ */ new Map([
        ["int8", "int32"],
        ["uint8", "int32"],
        ["uint32", "int32"],
        ["int64", "int32"]
      ]);
      calculateByteLength = (dataType, shape) => {
        const dataTypeSize = webnnDataTypeToSize.get(dataType);
        if (!dataTypeSize) {
          throw new Error(`WebNN backend does not support data type: ${dataType}`);
        }
        return shape.length > 0 ? Math.ceil(shape.reduce((a, b) => a * b) * dataTypeSize / 8) : 0;
      };
      TensorWrapper = class {
        constructor(descriptor) {
          // This flag is used to indicate whether the data has been converted to fallback data type.
          this.isDataConverted = false;
          const { sessionId, context, tensor, dataType, shape, fallbackDataType } = descriptor;
          this.sessionId = sessionId;
          this.mlContext = context;
          this.mlTensor = tensor;
          this.dataType = dataType;
          this.tensorShape = shape;
          this.fallbackDataType = fallbackDataType;
        }
        get tensor() {
          return this.mlTensor;
        }
        get type() {
          return this.dataType;
        }
        get fallbackType() {
          return this.fallbackDataType;
        }
        get shape() {
          return this.tensorShape;
        }
        get byteLength() {
          return calculateByteLength(this.dataType, this.tensorShape);
        }
        destroy() {
          LOG_DEBUG("verbose", () => "[WebNN] TensorWrapper.destroy");
          this.mlTensor.destroy();
        }
        write(data) {
          this.mlContext.writeTensor(this.mlTensor, data);
        }
        async read(dstBuffer) {
          if (this.fallbackDataType) {
            const data = await this.mlContext.readTensor(this.mlTensor);
            const originalData = convertInt32ToData(new Uint8Array(data), this.dataType);
            if (dstBuffer) {
              const targetBuffer = dstBuffer instanceof ArrayBuffer ? new Uint8Array(dstBuffer) : new Uint8Array(dstBuffer.buffer, dstBuffer.byteOffset, dstBuffer.byteLength);
              targetBuffer.set(originalData);
              return void 0;
            } else {
              return new Uint8Array(originalData).buffer;
            }
          } else {
            return dstBuffer ? this.mlContext.readTensor(this.mlTensor, dstBuffer) : this.mlContext.readTensor(this.mlTensor);
          }
        }
        canReuseTensor(context, dataType, shape) {
          return this.mlContext === context && this.dataType === dataType && this.tensorShape.length === shape.length && this.tensorShape.every((v, i) => v === shape[i]);
        }
        setIsDataConverted(isConverted) {
          this.isDataConverted = isConverted;
        }
      };
      TensorIdTracker = class {
        constructor(tensorManager, wrapper) {
          this.tensorManager = tensorManager;
          this.wrapper = wrapper;
        }
        get tensorWrapper() {
          return this.wrapper;
        }
        releaseTensor() {
          if (this.tensorWrapper) {
            this.tensorManager.releaseTensor(this.tensorWrapper);
            this.wrapper = void 0;
          }
        }
        async ensureTensor(sessionId, dataType, shape, copyOld) {
          const context = this.tensorManager.getMLContext(sessionId);
          const opLimits = this.tensorManager.getMLOpSupportLimits(sessionId);
          let fallbackDataType;
          if (!opLimits?.input.dataTypes.includes(dataType)) {
            fallbackDataType = webnnDataTypeToFallback.get(dataType);
            if (!fallbackDataType || !opLimits?.input.dataTypes.includes(fallbackDataType)) {
              throw new Error(`WebNN backend does not support data type: ${dataType}`);
            }
            LOG_DEBUG(
              "verbose",
              () => `[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${dataType} to ${fallbackDataType}`
            );
          }
          if (this.wrapper) {
            if (this.wrapper.canReuseTensor(context, dataType, shape)) {
              return this.wrapper.tensor;
            } else {
              if (copyOld) {
                if (this.wrapper.byteLength !== calculateByteLength(dataType, shape)) {
                  throw new Error("Unable to copy data to tensor with different size.");
                }
                this.activeUpload = new Uint8Array(await this.wrapper.read());
              }
              this.tensorManager.releaseTensor(this.wrapper);
            }
          }
          const usage = typeof MLTensorUsage == "undefined" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
          this.wrapper = await this.tensorManager.getCachedTensor(
            sessionId,
            dataType,
            shape,
            usage,
            true,
            true,
            fallbackDataType
          );
          if (copyOld && this.activeUpload) {
            this.wrapper.write(this.activeUpload);
            this.activeUpload = void 0;
          }
          return this.wrapper.tensor;
        }
        upload(data) {
          let newData = data;
          if (this.wrapper) {
            if (this.wrapper.fallbackType) {
              if (this.wrapper.fallbackType === "int32") {
                newData = convertDataToInt32(data, this.wrapper.type);
                this.wrapper.setIsDataConverted(true);
              } else {
                throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);
              }
            }
            if (data.byteLength === this.wrapper.byteLength) {
              this.wrapper.write(newData);
              return;
            } else {
              LOG_DEBUG("verbose", () => "Data size does not match tensor size. Releasing tensor.");
              this.releaseTensor();
            }
          }
          if (this.activeUpload) {
            this.activeUpload.set(newData);
          } else {
            this.activeUpload = new Uint8Array(newData);
          }
        }
        async download(dstBuffer) {
          if (this.activeUpload) {
            const dstData = this.wrapper?.isDataConverted ? convertInt32ToData(this.activeUpload, this.wrapper?.type) : this.activeUpload;
            if (dstBuffer) {
              if (dstBuffer instanceof ArrayBuffer) {
                new Uint8Array(dstBuffer).set(dstData);
              } else {
                new Uint8Array(dstBuffer.buffer, dstBuffer.byteOffset, dstBuffer.byteLength).set(dstData);
              }
              return;
            } else {
              return dstData.buffer;
            }
          }
          if (!this.wrapper) {
            throw new Error("Tensor has not been created.");
          }
          if (!dstBuffer) {
            return this.wrapper.read();
          }
          return this.wrapper.read(dstBuffer);
        }
      };
      TensorManagerImpl = class {
        constructor(backend) {
          this.backend = backend;
          this.tensorTrackersById = /* @__PURE__ */ new Map();
          this.freeTensors = [];
          this.externalTensors = /* @__PURE__ */ new Set();
        }
        getMLContext(sessionId) {
          const context = this.backend.getMLContext(sessionId);
          if (!context) {
            throw new Error("MLContext not found for session.");
          }
          return context;
        }
        getMLOpSupportLimits(sessionId) {
          return this.backend.getMLOpSupportLimits(sessionId);
        }
        reserveTensorId() {
          const tensorId = createNewTensorId();
          this.tensorTrackersById.set(tensorId, new TensorIdTracker(this));
          return tensorId;
        }
        releaseTensorId(tensorId) {
          const tensorTracker = this.tensorTrackersById.get(tensorId);
          if (!tensorTracker) {
            return;
          }
          this.tensorTrackersById.delete(tensorId);
          if (tensorTracker.tensorWrapper) {
            this.releaseTensor(tensorTracker.tensorWrapper);
          }
        }
        async ensureTensor(sessionId, tensorId, dataType, shape, copyOld) {
          LOG_DEBUG(
            "verbose",
            () => `[WebNN] TensorManager.ensureTensor {tensorId: ${tensorId}, dataType: ${dataType}, shape: ${shape}, copyOld: ${copyOld}}`
          );
          const tensor = this.tensorTrackersById.get(tensorId);
          if (!tensor) {
            throw new Error("Tensor not found.");
          }
          return tensor.ensureTensor(sessionId, dataType, shape, copyOld);
        }
        upload(tensorId, data) {
          const tensor = this.tensorTrackersById.get(tensorId);
          if (!tensor) {
            throw new Error("Tensor not found.");
          }
          tensor.upload(data);
        }
        async download(tensorId, dstBuffer) {
          LOG_DEBUG(
            "verbose",
            () => `[WebNN] TensorManager.download {tensorId: ${tensorId}, dstBuffer: ${dstBuffer?.byteLength}}`
          );
          const tensorTracker = this.tensorTrackersById.get(tensorId);
          if (!tensorTracker) {
            throw new Error("Tensor not found.");
          }
          return tensorTracker.download(dstBuffer);
        }
        releaseTensorsForSession(sessionId) {
          for (const tensor of this.freeTensors) {
            if (tensor.sessionId === sessionId) {
              tensor.destroy();
            }
          }
          this.freeTensors = this.freeTensors.filter((tensor) => tensor.sessionId !== sessionId);
        }
        registerTensor(sessionId, mlTensor, dataType, shape) {
          const context = this.getMLContext(sessionId);
          const tensorId = createNewTensorId();
          const wrapper = new TensorWrapper({
            sessionId,
            context,
            tensor: mlTensor,
            dataType,
            shape
          });
          this.tensorTrackersById.set(tensorId, new TensorIdTracker(this, wrapper));
          this.externalTensors.add(wrapper);
          return tensorId;
        }
        /**
         * Get or create an MLTensor with the given data type and shape.
         */
        async getCachedTensor(sessionId, dataType, shape, usage, writable, readable, fallbackDataType) {
          const context = this.getMLContext(sessionId);
          for (const [index, tensor2] of this.freeTensors.entries()) {
            if (tensor2.canReuseTensor(context, dataType, shape)) {
              LOG_DEBUG(
                "verbose",
                () => `[WebNN] Reusing tensor {dataType: ${dataType}, ${fallbackDataType ? `fallbackDataType: ${fallbackDataType},` : ""} shape: ${shape}`
              );
              const wrapper = this.freeTensors.splice(index, 1)[0];
              wrapper.sessionId = sessionId;
              return wrapper;
            }
          }
          LOG_DEBUG(
            "verbose",
            () => `[WebNN] MLContext.createTensor {dataType: ${dataType}, ${fallbackDataType ? `fallbackDataType: ${fallbackDataType},` : ""} shape: ${shape}}`
          );
          const tensor = await context.createTensor({
            dataType: fallbackDataType ?? dataType,
            // If fallback data type is provided, use it.
            shape,
            dimensions: shape,
            usage,
            writable,
            readable
          });
          return new TensorWrapper({ sessionId, context, tensor, dataType, shape, fallbackDataType });
        }
        /**
         * Release tensor for reuse unless external.
         */
        releaseTensor(tensorWrapper) {
          if (this.externalTensors.has(tensorWrapper)) {
            this.externalTensors.delete(tensorWrapper);
          }
          this.freeTensors.push(tensorWrapper);
        }
      };
      createTensorManager = (...args) => new TensorManagerImpl(...args);
    }
  });

  // web/lib/wasm/jsep/backend-webnn.ts
  var backend_webnn_exports = {};
  __export(backend_webnn_exports, {
    WebNNBackend: () => WebNNBackend
  });
  var onnxDataTypeToWebnnDataType, compareMLContextOptions, WebNNBackend;
  var init_backend_webnn = __esm({
    "web/lib/wasm/jsep/backend-webnn.ts"() {
      "use strict";
      init_wasm_common();
      init_wasm_factory();
      init_tensor_view();
      init_tensor_manager();
      init_log();
      onnxDataTypeToWebnnDataType = /* @__PURE__ */ new Map([
        [1 /* float */, "float32"],
        [10 /* float16 */, "float16"],
        [6 /* int32 */, "int32"],
        [12 /* uint32 */, "uint32"],
        [7 /* int64 */, "int64"],
        [13 /* uint64 */, "uint64"],
        [22 /* int4 */, "int4"],
        [21 /* uint4 */, "uint4"],
        [3 /* int8 */, "int8"],
        [2 /* uint8 */, "uint8"],
        [9 /* bool */, "uint8"]
      ]);
      compareMLContextOptions = (a, b) => {
        if (a === b) {
          return true;
        }
        if (a === void 0 || b === void 0) {
          return false;
        }
        const aKeys = Object.keys(a).sort();
        const bKeys = Object.keys(b).sort();
        return aKeys.length === bKeys.length && aKeys.every((key, index) => key === bKeys[index] && a[key] === b[key]);
      };
      WebNNBackend = class {
        constructor(env3) {
          /**
           * Tensor managers for each session.
           */
          this.tensorManager = createTensorManager(this);
          /**
           * Maps from session id to MLContexts.
           */
          this.mlContextBySessionId = /* @__PURE__ */ new Map();
          /**
           * Maps from MLContext to session ids.
           */
          this.sessionIdsByMLContext = /* @__PURE__ */ new Map();
          /**
           * Cache of MLContexts.
           */
          this.mlContextCache = [];
          /**
           * Maps from session id to list of graph inputs.
           */
          this.sessionGraphInputs = /* @__PURE__ */ new Map();
          /**
           * Maps from session id to list of graph outputs.
           */
          this.sessionGraphOutputs = /* @__PURE__ */ new Map();
          /**
           * Temporary graph inputs for the current session.
           * These inputs will be registered when the session is created.
           */
          this.temporaryGraphInputs = [];
          /**
           * Temporary graph outputs for the current session.
           * These outputs will be registered when the session is created.
           */
          this.temporaryGraphOutputs = [];
          /**
           * Temporary tensors for the current session.
           */
          this.temporarySessionTensorIds = /* @__PURE__ */ new Map();
          /**
           * Maps from session id to MLOpSupportLimits.
           */
          this.mlOpSupportLimitsBySessionId = /* @__PURE__ */ new Map();
          configureLogger(env3.logLevel, !!env3.debug);
        }
        get currentSessionId() {
          if (this.activeSessionId === void 0) {
            throw new Error("No active session");
          }
          return this.activeSessionId;
        }
        onRunStart(sessionId) {
          LOG_DEBUG("verbose", () => `[WebNN] onRunStart {sessionId: ${sessionId}}`);
          this.activeSessionId = sessionId;
        }
        onRunEnd(sessionId) {
          LOG_DEBUG("verbose", () => `[WebNN] onRunEnd {sessionId: ${sessionId}}`);
          const tensorIds = this.temporarySessionTensorIds.get(sessionId);
          if (!tensorIds) {
            return;
          }
          for (const tensorId of tensorIds) {
            LOG_DEBUG("verbose", () => `[WebNN] releasing temporary tensor {tensorId: ${tensorId}}`);
            this.tensorManager.releaseTensorId(tensorId);
          }
          this.temporarySessionTensorIds.delete(sessionId);
          this.activeSessionId = void 0;
        }
        async createMLContext(optionsOrDevice) {
          if (optionsOrDevice instanceof GPUDevice) {
            const mlContextIndex2 = this.mlContextCache.findIndex((entry) => entry.gpuDevice === optionsOrDevice);
            if (mlContextIndex2 !== -1) {
              return this.mlContextCache[mlContextIndex2].mlContext;
            } else {
              const mlContext = await navigator.ml.createContext(optionsOrDevice);
              this.mlContextCache.push({ gpuDevice: optionsOrDevice, mlContext });
              return mlContext;
            }
          } else if (optionsOrDevice === void 0) {
            const mlContextIndex2 = this.mlContextCache.findIndex(
              (entry) => entry.options === void 0 && entry.gpuDevice === void 0
            );
            if (mlContextIndex2 !== -1) {
              return this.mlContextCache[mlContextIndex2].mlContext;
            } else {
              const mlContext = await navigator.ml.createContext();
              this.mlContextCache.push({ mlContext });
              return mlContext;
            }
          }
          const mlContextIndex = this.mlContextCache.findIndex(
            (entry) => compareMLContextOptions(entry.options, optionsOrDevice)
          );
          if (mlContextIndex !== -1) {
            return this.mlContextCache[mlContextIndex].mlContext;
          } else {
            const mlContext = await navigator.ml.createContext(optionsOrDevice);
            this.mlContextCache.push({ options: optionsOrDevice, mlContext });
            return mlContext;
          }
        }
        registerMLContext(sessionId, mlContext) {
          this.mlContextBySessionId.set(sessionId, mlContext);
          let sessionIds = this.sessionIdsByMLContext.get(mlContext);
          if (!sessionIds) {
            sessionIds = /* @__PURE__ */ new Set();
            this.sessionIdsByMLContext.set(mlContext, sessionIds);
          }
          sessionIds.add(sessionId);
          if (!this.mlOpSupportLimitsBySessionId.has(sessionId)) {
            this.mlOpSupportLimitsBySessionId.set(sessionId, mlContext.opSupportLimits());
          }
          if (this.temporaryGraphInputs.length > 0) {
            this.sessionGraphInputs.set(sessionId, this.temporaryGraphInputs);
            this.temporaryGraphInputs = [];
          }
          if (this.temporaryGraphOutputs.length > 0) {
            this.sessionGraphOutputs.set(sessionId, this.temporaryGraphOutputs);
            this.temporaryGraphOutputs = [];
          }
        }
        onReleaseSession(sessionId) {
          this.sessionGraphInputs.delete(sessionId);
          this.sessionGraphOutputs.delete(sessionId);
          const mlContext = this.mlContextBySessionId.get(sessionId);
          if (!mlContext) {
            return;
          }
          this.tensorManager.releaseTensorsForSession(sessionId);
          this.mlContextBySessionId.delete(sessionId);
          this.mlOpSupportLimitsBySessionId.delete(sessionId);
          const sessionIds = this.sessionIdsByMLContext.get(mlContext);
          sessionIds.delete(sessionId);
          if (sessionIds.size === 0) {
            this.sessionIdsByMLContext.delete(mlContext);
            const mlContextIndex = this.mlContextCache.findIndex((entry) => entry.mlContext === mlContext);
            if (mlContextIndex !== -1) {
              this.mlContextCache.splice(mlContextIndex, 1);
            }
          }
        }
        getMLContext(sessionId) {
          return this.mlContextBySessionId.get(sessionId);
        }
        getMLOpSupportLimits(sessionId) {
          return this.mlOpSupportLimitsBySessionId.get(sessionId);
        }
        reserveTensorId() {
          return this.tensorManager.reserveTensorId();
        }
        releaseTensorId(tensorId) {
          LOG_DEBUG("verbose", () => `[WebNN] releaseTensorId {tensorId: ${tensorId}}`);
          this.tensorManager.releaseTensorId(tensorId);
        }
        async ensureTensor(sessionId, tensorId, onnxDataType, dimensions, copyOld) {
          const webnnDataType = onnxDataTypeToWebnnDataType.get(onnxDataType);
          if (!webnnDataType) {
            throw new Error(`Unsupported ONNX data type: ${onnxDataType}`);
          }
          return this.tensorManager.ensureTensor(
            sessionId ?? this.currentSessionId,
            tensorId,
            webnnDataType,
            dimensions,
            copyOld
          );
        }
        async createTemporaryTensor(sessionId, onnxDataType, shape) {
          LOG_DEBUG("verbose", () => `[WebNN] createTemporaryTensor {onnxDataType: ${onnxDataType}, shape: ${shape}}`);
          const dataType = onnxDataTypeToWebnnDataType.get(onnxDataType);
          if (!dataType) {
            throw new Error(`Unsupported ONNX data type: ${onnxDataType}`);
          }
          const tensorId = this.tensorManager.reserveTensorId();
          await this.tensorManager.ensureTensor(sessionId, tensorId, dataType, shape, false);
          const tensorIds = this.temporarySessionTensorIds.get(sessionId);
          if (!tensorIds) {
            this.temporarySessionTensorIds.set(sessionId, [tensorId]);
          } else {
            tensorIds.push(tensorId);
          }
          return tensorId;
        }
        uploadTensor(tensorId, data) {
          const wasm2 = getInstance();
          if (!wasm2.shouldTransferToMLTensor) {
            throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
          }
          LOG_DEBUG("verbose", () => `[WebNN] uploadTensor {tensorId: ${tensorId}, data: ${data.byteLength}}`);
          this.tensorManager.upload(tensorId, data);
        }
        async downloadTensor(tensorId, dstBuffer) {
          return this.tensorManager.download(tensorId, dstBuffer);
        }
        createMLTensorDownloader(tensorId, type) {
          return async () => {
            const data = await this.tensorManager.download(tensorId);
            return createView(data, type);
          };
        }
        registerMLTensor(sessionId, tensor, onnxDataType, dimensions) {
          const webnnDataType = onnxDataTypeToWebnnDataType.get(onnxDataType);
          if (!webnnDataType) {
            throw new Error(`Unsupported ONNX data type: ${onnxDataType}`);
          }
          const id = this.tensorManager.registerTensor(sessionId, tensor, webnnDataType, dimensions);
          LOG_DEBUG(
            "verbose",
            () => `[WebNN] registerMLTensor {tensor: ${tensor}, dataType: ${webnnDataType}, dimensions: ${dimensions}} -> {tensorId: ${id}}`
          );
          return id;
        }
        registerGraphInput(inputName) {
          this.temporaryGraphInputs.push(inputName);
        }
        registerGraphOutput(outputName) {
          this.temporaryGraphOutputs.push(outputName);
        }
        isGraphInput(sessionId, inputName) {
          const inputNames = this.sessionGraphInputs.get(sessionId);
          if (!inputNames) {
            return false;
          }
          return inputNames.includes(inputName);
        }
        isGraphOutput(sessionId, outputName) {
          const outputNames = this.sessionGraphOutputs.get(sessionId);
          if (!outputNames) {
            return false;
          }
          return outputNames.includes(outputName);
        }
        isGraphInputOutputTypeSupported(sessionId, type, isInput = true) {
          const dataType = onnxDataTypeToWebnnDataType.get(tensorDataTypeStringToEnum(type));
          const opLimits = this.mlOpSupportLimitsBySessionId.get(sessionId);
          if (typeof dataType === "undefined") {
            return false;
          }
          if (isInput) {
            return !!opLimits?.input.dataTypes.includes(dataType);
          } else {
            return !!opLimits?.output.dataTypes.includes(dataType);
          }
        }
        flush() {
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
          if (epName === "webgpu") {
            getInstance().webgpuInit((device) => {
              env3.webgpu.device = device;
            });
          }
          if (epName === "webnn") {
            const backend = new (init_backend_webnn(), __toCommonJS(backend_webnn_exports)).WebNNBackend(env3);
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
              const data = typeof file === "string" ? file : file.data;
              if (data instanceof Blob) {
                wasm2.mountExternalData(path, data);
                continue;
              }
              loadingPromises.push(
                loadFile(data).then((fileData) => {
                  wasm2.mountExternalData(path, fileData);
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
            if (true) {
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
          if (outputPreferredLocations.some((l) => l === "gpu-buffer" || l === "ml-tensor" || l === "ml-tensor-cpu-output")) {
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
          if (true) {
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
          if (ioBindingState && !inputOutputBound) {
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
          if (ioBindingState) {
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
                  const getBuffer = true ? wasm2.webgpuGetBuffer : wasm2.jsepGetBuffer;
                  if (!getBuffer) {
                    throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                  }
                  const gpuBuffer = getBuffer(dataOffset);
                  const bufferSize = calculateTensorSizeInBytes(dataType, size);
                  if (bufferSize === void 0 || !isGpuBufferSupportedType(type)) {
                    throw new Error(`Unsupported data type: ${type}`);
                  }
                  keepOutputTensor = true;
                  if (true) {
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
          if (true) {
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
                    wasm: false ? new URL("ort-wasm-simd-threaded.jsep.wasm", void 0).href : true ? new URL("ort-wasm-simd-threaded.jspi.wasm", void 0).href : true ? new URL("ort-wasm-simd-threaded.asyncify.wasm", void 0).href : new URL("ort-wasm-simd-threaded.wasm", void 0).href
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
  var version2 = "1.30.0";

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
    if (true) {
      registerBackend("webgpu", wasmBackend2, 5);
    }
    if (true) {
      registerBackend("webnn", wasmBackend2, 5);
    }
    registerBackend("cpu", wasmBackend2, 10);
    registerBackend("wasm", wasmBackend2, 10);
  }
  Object.defineProperty(env2.versions, "web", { value: version2, enumerable: true });
  return __toCommonJS(index_exports);
})();
typeof exports=="object"&&typeof module=="object"&&(module.exports=ort);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9iYWNrZW5kLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL2Vudi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvZW52LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLWNvbnZlcnNpb24taW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LWltcGwudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItaW1wbC10eXBlLW1hcHBpbmcudHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItdXRpbHMtaW1wbC50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdGVuc29yLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvdHJhY2UudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvaW5mZXJlbmNlLXNlc3Npb24udHMiLCAiLi4vLi4vY29tbW9uL2xpYi90ZW5zb3ItY29udmVyc2lvbi50cyIsICIuLi8uLi9jb21tb24vbGliL3RlbnNvci1mYWN0b3J5LnRzIiwgIi4uLy4uL2NvbW1vbi9saWIvb25ueC1tb2RlbC50cyIsICIuLi8uLi9jb21tb24vbGliL29ubngtdmFsdWUudHMiLCAiLi4vLi4vY29tbW9uL2xpYi9pbmRleC50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWVudi50cyIsICIuLi9saWIvd2FzbS9wcm94eS13b3JrZXIvbWFpbi50cyIsICIuLi9saWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50cyIsICIuLi9saWIvd2FzbS93YXNtLWZhY3RvcnkudHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy50cyIsICIuLi9saWIvd2FzbS9ydW4tb3B0aW9ucy50cyIsICIuLi9saWIvd2FzbS9zZXNzaW9uLW9wdGlvbnMudHMiLCAiLi4vbGliL3dhc20vd2FzbS1jb21tb24udHMiLCAiLi4vbGliL3dhc20vd2FzbS11dGlscy1sb2FkLWZpbGUudHMiLCAiLi4vbGliL3dhc20vanNlcC90ZW5zb3Itdmlldy50cyIsICIuLi9saWIvd2FzbS9qc2VwL2xvZy50cyIsICIuLi9saWIvd2FzbS9qc2VwL3dlYm5uL3RlbnNvci1tYW5hZ2VyLnRzIiwgIi4uL2xpYi93YXNtL2pzZXAvYmFja2VuZC13ZWJubi50cyIsICIuLi9saWIvd2FzbS93YXNtLWNvcmUtaW1wbC50cyIsICIuLi9saWIvd2FzbS9wcm94eS13cmFwcGVyLnRzIiwgIi4uL2xpYi93YXNtL3Nlc3Npb24taGFuZGxlci1pbmZlcmVuY2UudHMiLCAiLi4vbGliL2JhY2tlbmQtd2FzbS50cyIsICIuLi9saWIvaW5kZXgudHMiLCAiLi4vbGliL3ZlcnNpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSAnLi9iYWNrZW5kLmpzJztcclxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xyXG5cclxuaW50ZXJmYWNlIEJhY2tlbmRJbmZvIHtcclxuICBiYWNrZW5kOiBCYWNrZW5kO1xyXG4gIHByaW9yaXR5OiBudW1iZXI7XHJcblxyXG4gIGluaXRQcm9taXNlPzogUHJvbWlzZTx2b2lkPjtcclxuICBpbml0aWFsaXplZD86IGJvb2xlYW47XHJcbiAgYWJvcnRlZD86IGJvb2xlYW47XHJcbiAgZXJyb3I/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IGJhY2tlbmRzOiBNYXA8c3RyaW5nLCBCYWNrZW5kSW5mbz4gPSBuZXcgTWFwKCk7XHJcbmNvbnN0IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eTogc3RyaW5nW10gPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIGJhY2tlbmQuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIC0gdGhlIG5hbWUgYXMgYSBrZXkgdG8gbG9va3VwIGFzIGFuIGV4ZWN1dGlvbiBwcm92aWRlci5cclxuICogQHBhcmFtIGJhY2tlbmQgLSB0aGUgYmFja2VuZCBvYmplY3QuXHJcbiAqIEBwYXJhbSBwcmlvcml0eSAtIGFuIGludGVnZXIgaW5kaWNhdGluZyB0aGUgcHJpb3JpdHkgb2YgdGhlIGJhY2tlbmQuIEhpZ2hlciBudW1iZXIgbWVhbnMgaGlnaGVyIHByaW9yaXR5LiBpZiBwcmlvcml0eVxyXG4gKiA8IDAsIGl0IHdpbGwgYmUgY29uc2lkZXJlZCBhcyBhICdiZXRhJyB2ZXJzaW9uIGFuZCB3aWxsIG5vdCBiZSB1c2VkIGFzIGEgZmFsbGJhY2sgYmFja2VuZCBieSBkZWZhdWx0LlxyXG4gKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJCYWNrZW5kID0gKG5hbWU6IHN0cmluZywgYmFja2VuZDogQmFja2VuZCwgcHJpb3JpdHk6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gIGlmIChiYWNrZW5kICYmIHR5cGVvZiBiYWNrZW5kLmluaXQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGJhY2tlbmQuY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGNvbnN0IGN1cnJlbnRCYWNrZW5kID0gYmFja2VuZHMuZ2V0KG5hbWUpO1xyXG4gICAgaWYgKGN1cnJlbnRCYWNrZW5kID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgYmFja2VuZHMuc2V0KG5hbWUsIHsgYmFja2VuZCwgcHJpb3JpdHkgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRCYWNrZW5kLnByaW9yaXR5ID4gcHJpb3JpdHkpIHtcclxuICAgICAgLy8gc2FtZSBuYW1lIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCB3aXRoIGEgaGlnaGVyIHByaW9yaXR5LiBza2lwIHJlZ2lzdGVyYXRpb24uXHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSBpZiAoY3VycmVudEJhY2tlbmQucHJpb3JpdHkgPT09IHByaW9yaXR5KSB7XHJcbiAgICAgIGlmIChjdXJyZW50QmFja2VuZC5iYWNrZW5kICE9PSBiYWNrZW5kKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVnaXN0ZXIgYmFja2VuZCBcIiR7bmFtZX1cIiB1c2luZyBwcmlvcml0eSAke3ByaW9yaXR5fWApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByaW9yaXR5ID49IDApIHtcclxuICAgICAgY29uc3QgaSA9IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5pbmRleE9mKG5hbWUpO1xyXG4gICAgICBpZiAoaSAhPT0gLTEpIHtcclxuICAgICAgICBiYWNrZW5kc1NvcnRlZEJ5UHJpb3JpdHkuc3BsaWNlKGksIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChiYWNrZW5kcy5nZXQoYmFja2VuZHNTb3J0ZWRCeVByaW9yaXR5W2ldKSEucHJpb3JpdHkgPD0gcHJpb3JpdHkpIHtcclxuICAgICAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5zcGxpY2UoaSwgMCwgbmFtZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eS5wdXNoKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgdmFsaWQgYmFja2VuZCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyeSB0byByZXNvbHZlIGFuZCBpbml0aWFsaXplIGEgYmFja2VuZC5cclxuICpcclxuICogQHBhcmFtIGJhY2tlbmROYW1lIC0gdGhlIG5hbWUgb2YgdGhlIGJhY2tlbmQuXHJcbiAqIEByZXR1cm5zIHRoZSBiYWNrZW5kIGluc3RhbmNlIGlmIHJlc29sdmVkIGFuZCBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHksIG9yIGFuIGVycm9yIG1lc3NhZ2UgaWYgZmFpbGVkLlxyXG4gKi9cclxuY29uc3QgdHJ5UmVzb2x2ZUFuZEluaXRpYWxpemVCYWNrZW5kID0gYXN5bmMgKGJhY2tlbmROYW1lOiBzdHJpbmcpOiBQcm9taXNlPEJhY2tlbmQgfCBzdHJpbmc+ID0+IHtcclxuICBjb25zdCBiYWNrZW5kSW5mbyA9IGJhY2tlbmRzLmdldChiYWNrZW5kTmFtZSk7XHJcbiAgaWYgKCFiYWNrZW5kSW5mbykge1xyXG4gICAgcmV0dXJuICdiYWNrZW5kIG5vdCBmb3VuZC4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKGJhY2tlbmRJbmZvLmluaXRpYWxpemVkKSB7XHJcbiAgICByZXR1cm4gYmFja2VuZEluZm8uYmFja2VuZDtcclxuICB9IGVsc2UgaWYgKGJhY2tlbmRJbmZvLmFib3J0ZWQpIHtcclxuICAgIHJldHVybiBiYWNrZW5kSW5mby5lcnJvciE7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IGlzSW5pdGlhbGl6aW5nID0gISFiYWNrZW5kSW5mby5pbml0UHJvbWlzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcclxuICAgICAgICBiYWNrZW5kSW5mby5pbml0UHJvbWlzZSA9IGJhY2tlbmRJbmZvLmJhY2tlbmQuaW5pdChiYWNrZW5kTmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgYXdhaXQgYmFja2VuZEluZm8uaW5pdFByb21pc2U7XHJcbiAgICAgIGJhY2tlbmRJbmZvLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGJhY2tlbmRJbmZvLmJhY2tlbmQ7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmICghaXNJbml0aWFsaXppbmcpIHtcclxuICAgICAgICBiYWNrZW5kSW5mby5lcnJvciA9IGAke2V9YDtcclxuICAgICAgICBiYWNrZW5kSW5mby5hYm9ydGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYmFja2VuZEluZm8uZXJyb3IhO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgZGVsZXRlIGJhY2tlbmRJbmZvLmluaXRQcm9taXNlO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXNvbHZlIGV4ZWN1dGlvbiBwcm92aWRlcnMgZnJvbSB0aGUgc3BlY2lmaWMgc2Vzc2lvbiBvcHRpb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyAtIHRoZSBzZXNzaW9uIG9wdGlvbnMgb2JqZWN0LlxyXG4gKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIGFuIGluaXRpYWxpemVkIGJhY2tlbmQgaW5zdGFuY2UgYW5kIGEgc2Vzc2lvbiBvcHRpb25zIG9iamVjdCB3aXRoXHJcbiAqIGZpbHRlcmVkIEVQIGxpc3QuXHJcbiAqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlQmFja2VuZEFuZEV4ZWN1dGlvblByb3ZpZGVycyA9IGFzeW5jIChcclxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxyXG4pOiBQcm9taXNlPFtiYWNrZW5kOiBCYWNrZW5kLCBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zXT4gPT4ge1xyXG4gIC8vIGV4dHJhY3QgYmFja2VuZCBoaW50cyBmcm9tIHNlc3Npb24gb3B0aW9uc1xyXG4gIGNvbnN0IGVwcyA9IG9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzIHx8IFtdO1xyXG4gIGNvbnN0IGJhY2tlbmRIaW50cyA9IGVwcy5tYXAoKGkpID0+ICh0eXBlb2YgaSA9PT0gJ3N0cmluZycgPyBpIDogaS5uYW1lKSk7XHJcbiAgY29uc3QgYmFja2VuZE5hbWVzID0gYmFja2VuZEhpbnRzLmxlbmd0aCA9PT0gMCA/IGJhY2tlbmRzU29ydGVkQnlQcmlvcml0eSA6IGJhY2tlbmRIaW50cztcclxuXHJcbiAgLy8gdHJ5IHRvIHJlc29sdmUgYW5kIGluaXRpYWxpemUgYWxsIHJlcXVlc3RlZCBiYWNrZW5kc1xyXG4gIGxldCBiYWNrZW5kOiBCYWNrZW5kIHwgdW5kZWZpbmVkO1xyXG4gIGNvbnN0IGVycm9ycyA9IFtdO1xyXG4gIGNvbnN0IGF2YWlsYWJsZUJhY2tlbmROYW1lcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gIGZvciAoY29uc3QgYmFja2VuZE5hbWUgb2YgYmFja2VuZE5hbWVzKSB7XHJcbiAgICBjb25zdCByZXNvbHZlUmVzdWx0ID0gYXdhaXQgdHJ5UmVzb2x2ZUFuZEluaXRpYWxpemVCYWNrZW5kKGJhY2tlbmROYW1lKTtcclxuICAgIGlmICh0eXBlb2YgcmVzb2x2ZVJlc3VsdCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZXJyb3JzLnB1c2goeyBuYW1lOiBiYWNrZW5kTmFtZSwgZXJyOiByZXNvbHZlUmVzdWx0IH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFiYWNrZW5kKSB7XHJcbiAgICAgICAgYmFja2VuZCA9IHJlc29sdmVSZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGJhY2tlbmQgPT09IHJlc29sdmVSZXN1bHQpIHtcclxuICAgICAgICBhdmFpbGFibGVCYWNrZW5kTmFtZXMuYWRkKGJhY2tlbmROYW1lKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaWYgbm8gYmFja2VuZCBpcyBhdmFpbGFibGUsIHRocm93IGVycm9yLlxyXG4gIGlmICghYmFja2VuZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBubyBhdmFpbGFibGUgYmFja2VuZCBmb3VuZC4gRVJSOiAke2Vycm9ycy5tYXAoKGUpID0+IGBbJHtlLm5hbWV9XSAke2UuZXJyfWApLmpvaW4oJywgJyl9YCk7XHJcbiAgfVxyXG5cclxuICAvLyBmb3IgZWFjaCBleHBsaWNpdGx5IHJlcXVlc3RlZCBiYWNrZW5kLCBpZiBpdCdzIG5vdCBhdmFpbGFibGUsIG91dHB1dCB3YXJuaW5nIG1lc3NhZ2UuXHJcbiAgZm9yIChjb25zdCB7IG5hbWUsIGVyciB9IG9mIGVycm9ycykge1xyXG4gICAgaWYgKGJhY2tlbmRIaW50cy5pbmNsdWRlcyhuYW1lKSkge1xyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgYHJlbW92aW5nIHJlcXVlc3RlZCBleGVjdXRpb24gcHJvdmlkZXIgXCIke25hbWV9XCIgZnJvbSBzZXNzaW9uIG9wdGlvbnMgYmVjYXVzZSBpdCBpcyBub3QgYXZhaWxhYmxlOiAke2Vycn1gLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZmlsdGVyZWRFcHMgPSBlcHMuZmlsdGVyKChpKSA9PiBhdmFpbGFibGVCYWNrZW5kTmFtZXMuaGFzKHR5cGVvZiBpID09PSAnc3RyaW5nJyA/IGkgOiBpLm5hbWUpKTtcclxuXHJcbiAgcmV0dXJuIFtcclxuICAgIGJhY2tlbmQsXHJcbiAgICBuZXcgUHJveHkob3B0aW9ucywge1xyXG4gICAgICBnZXQ6ICh0YXJnZXQsIHByb3ApID0+IHtcclxuICAgICAgICBpZiAocHJvcCA9PT0gJ2V4ZWN1dGlvblByb3ZpZGVycycpIHtcclxuICAgICAgICAgIHJldHVybiBmaWx0ZXJlZEVwcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdO1xyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gfSBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcclxuaW1wb3J0IHsgT25ueFZhbHVlIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBuYW1lc3BhY2UgU2Vzc2lvbkhhbmRsZXIge1xyXG4gIHR5cGUgRmVlZHNUeXBlID0geyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH07XHJcbiAgdHlwZSBGZXRjaGVzVHlwZSA9IHsgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGwgfTtcclxuICB0eXBlIFJldHVyblR5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgc2hhcmVkIFNlc3Npb25IYW5kbGVyIGZ1bmN0aW9uYWxpdHlcclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuaW50ZXJmYWNlIFNlc3Npb25IYW5kbGVyIHtcclxuICBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIHJlYWRvbmx5IGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG4gIHJlYWRvbmx5IG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuXHJcbiAgcmVhZG9ubHkgaW5wdXRNZXRhZGF0YTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW107XHJcbiAgcmVhZG9ubHkgb3V0cHV0TWV0YWRhdGE6IHJlYWRvbmx5IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdO1xyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50IGEgaGFuZGxlciBpbnN0YW5jZSBvZiBhbiBpbmZlcmVuY2Ugc2Vzc2lvbi5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciBleHRlbmRzIFNlc3Npb25IYW5kbGVyIHtcclxuICBzdGFydFByb2ZpbGluZygpOiB2b2lkO1xyXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkO1xyXG5cclxuICBydW4oXHJcbiAgICBmZWVkczogU2Vzc2lvbkhhbmRsZXIuRmVlZHNUeXBlLFxyXG4gICAgZmV0Y2hlczogU2Vzc2lvbkhhbmRsZXIuRmV0Y2hlc1R5cGUsXHJcbiAgICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXHJcbiAgKTogUHJvbWlzZTxTZXNzaW9uSGFuZGxlci5SZXR1cm5UeXBlPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBhIGJhY2tlbmQgdGhhdCBwcm92aWRlcyBpbXBsZW1lbnRhdGlvbiBvZiBtb2RlbCBpbmZlcmVuY2luZy5cclxuICpcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBCYWNrZW5kIHtcclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBiYWNrZW5kIGFzeW5jaHJvbm91c2x5LiBTaG91bGQgdGhyb3cgd2hlbiBmYWlsZWQuXHJcbiAgICovXHJcbiAgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXHJcbiAgICB1cmlPckJ1ZmZlcjogc3RyaW5nIHwgVWludDhBcnJheSxcclxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxyXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xyXG59XHJcblxyXG5leHBvcnQgeyByZWdpc3RlckJhY2tlbmQgfSBmcm9tICcuL2JhY2tlbmQtaW1wbC5qcyc7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSAvanMvc2NyaXB0cy91cGRhdGUtdmVyc2lvbi50c1xyXG4vLyBEbyBub3QgbW9kaWZ5IGZpbGUgY29udGVudCBtYW51YWxseS5cclxuXHJcbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gJzEuMzAuMCc7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgRW52IH0gZnJvbSAnLi9lbnYuanMnO1xyXG5pbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi92ZXJzaW9uLmpzJztcclxuXHJcbnR5cGUgTG9nTGV2ZWxUeXBlID0gRW52Wydsb2dMZXZlbCddO1xyXG5cclxubGV0IGxvZ0xldmVsVmFsdWU6IFJlcXVpcmVkPExvZ0xldmVsVHlwZT4gPSAnd2FybmluZyc7XHJcblxyXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSB7XHJcbiAgd2FzbToge30sXHJcbiAgd2ViZ2w6IHt9IGFzIEVudi5XZWJHTEZsYWdzLFxyXG4gIHdlYmdwdToge30gYXMgRW52LldlYkdwdUZsYWdzLFxyXG4gIHZlcnNpb25zOiB7IGNvbW1vbjogdmVyc2lvbiB9LFxyXG5cclxuICBzZXQgbG9nTGV2ZWwodmFsdWU6IExvZ0xldmVsVHlwZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgWyd2ZXJib3NlJywgJ2luZm8nLCAnd2FybmluZycsICdlcnJvcicsICdmYXRhbCddLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7dmFsdWV9YCk7XHJcbiAgICB9XHJcbiAgICBsb2dMZXZlbFZhbHVlID0gdmFsdWU7XHJcbiAgfSxcclxuICBnZXQgbG9nTGV2ZWwoKTogUmVxdWlyZWQ8TG9nTGV2ZWxUeXBlPiB7XHJcbiAgICByZXR1cm4gbG9nTGV2ZWxWYWx1ZTtcclxuICB9LFxyXG59O1xyXG5cclxuLy8gc2V0IHByb3BlcnR5ICdsb2dMZXZlbCcgc28gdGhhdCB0aGV5IGNhbiBiZSBjb3JyZWN0bHkgdHJhbnNmZXJyZWQgdG8gd29ya2VyIGJ5IGBwb3N0TWVzc2FnZSgpYC5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudiwgJ2xvZ0xldmVsJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGVudiBhcyBlbnZJbXBsIH0gZnJvbSAnLi9lbnYtaW1wbC5qcyc7XHJcbmltcG9ydCB7IFRyeUdldEdsb2JhbFR5cGUgfSBmcm9tICcuL3R5cGUtaGVscGVyLmpzJztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBFbnYge1xyXG4gIGV4cG9ydCB0eXBlIFdhc21QYXRoUHJlZml4ID0gc3RyaW5nO1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2FzbUZpbGVQYXRocyB7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgdGhlIG92ZXJyaWRlIHBhdGggZm9yIHRoZSBtYWluIC53YXNtIGZpbGUuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAud2FzbSBmaWxlIGlzOlxyXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtYCBmb3IgZGVmYXVsdCBidWlsZFxyXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLndhc21gIGZvciBKU0VQIGJ1aWxkICh3aXRoIFdlYkdQVSBhbmQgV2ViTk4pXHJcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lndhc21gIGZvciBXZWJHUFUgYnVpbGQgd2l0aCBBc3luY2lmeSAod2l0aCBXZWJOTilcclxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNwaS53YXNtYCBmb3IgV2ViR1BVIGJ1aWxkIHdpdGggSlNQSSBzdXBwb3J0ICh3aXRoIFdlYk5OKVxyXG4gICAgICovXHJcbiAgICB3YXNtPzogVVJMIHwgc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHRoZSBvdmVycmlkZSBwYXRoIGZvciB0aGUgbWFpbiAubWpzIGZpbGUuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIElmIG5vdCBtb2RpZmllZCwgdGhlIGZpbGVuYW1lIG9mIHRoZSAubWpzIGZpbGUgaXM6XHJcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qc2AgZm9yIGRlZmF1bHQgYnVpbGRcclxuICAgICAqIC0gYG9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC5tanNgIGZvciBKU0VQIGJ1aWxkICh3aXRoIFdlYkdQVSBhbmQgV2ViTk4pXHJcbiAgICAgKiAtIGBvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lm1qc2AgZm9yIFdlYkdQVSBidWlsZCB3aXRoIEFzeW5jaWZ5ICh3aXRoIFdlYk5OKVxyXG4gICAgICogLSBgb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc3BpLm1qc2AgZm9yIFdlYkdQVSBidWlsZCB3aXRoIEpTUEkgc3VwcG9ydCAod2l0aCBXZWJOTilcclxuICAgICAqL1xyXG4gICAgbWpzPzogVVJMIHwgc3RyaW5nO1xyXG4gIH1cclxuICBleHBvcnQgdHlwZSBXYXNtUHJlZml4T3JGaWxlUGF0aHMgPSBXYXNtUGF0aFByZWZpeCB8IFdhc21GaWxlUGF0aHM7XHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJBc3NlbWJseUZsYWdzIHtcclxuICAgIC8qKlxyXG4gICAgICogc2V0IG9yIGdldCBudW1iZXIgb2YgdGhyZWFkKHMpLiBJZiBvbWl0dGVkIG9yIHNldCB0byAwLCBudW1iZXIgb2YgdGhyZWFkKHMpIHdpbGwgYmUgZGV0ZXJtaW5lZCBieSBzeXN0ZW0uIElmIHNldFxyXG4gICAgICogdG8gMSwgbm8gd29ya2VyIHRocmVhZCB3aWxsIGJlIHNwYXduZWQuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IHdoZW4gV2ViQXNzZW1ibHkgbXVsdGl0aHJlYWQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYDBgXHJcbiAgICAgKi9cclxuICAgIG51bVRocmVhZHM/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gZW5hYmxlIFNJTUQuXHJcbiAgICAgKlxyXG4gICAgICogT05OWCBSdW50aW1lIHdpbGwgcGVyZm9ybSBmZWF0dXJlIGRldGVjdGlvbiBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eS4gU3BlY2lmaWNhbGx5LCB3aGVuIHRoZSB2YWx1ZSBpc1xyXG4gICAgICogc2V0IHRvOlxyXG4gICAgICogLSBgdW5kZWZpbmVkYCwgYHRydWVgIG9yIGBcImZpeGVkXCJgOiB3aWxsIGNoZWNrIGF2YWlsYWJpbGl0eSBvZiBGaXhlZC13aWR0aCBTSU1ELlxyXG4gICAgICogLSBgXCJyZWxheGVkXCJgOiB3aWxsIGNoZWNrIGF2YWlsYWJpbGl0eSBvZiBSZWxheGVkIFNJTUQuXHJcbiAgICAgKiAtIGBmYWxzZWA6IHdpbGwgbm90IHBlcmZvcm0gU0lNRCBmZWF0dXJlIGNoZWNraW5nLlxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBkb2VzIG5vdCBtYWtlIE9OTlggUnVudGltZSB0byBzd2l0Y2ggdG8gdGhlIGNvcnJlc3BvbmRpbmcgcnVudGltZSBhdXRvbWF0aWNhbGx5LiBVc2VyIG5lZWRcclxuICAgICAqIHRvIHNldCBgd2FzbVBhdGhzYCBvciBgd2FzbUJpbmFyeWAgcHJvcGVydHkgdG8gbG9hZCB0aGUgY29ycmVzcG9uZGluZyBydW50aW1lLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSB3aGVuIFdlYkFzc2VtYmx5IFNJTUQgZmVhdHVyZSBpcyBhdmFpbGFibGUgaW4gY3VycmVudCBjb250ZXh0LlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYHRydWVgXHJcbiAgICAgKi9cclxuICAgIHNpbWQ/OiBib29sZWFuIHwgJ2ZpeGVkJyB8ICdyZWxheGVkJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCBvciBnZXQgYSBib29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0byBlbmFibGUgdHJhY2UuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGBlbnYudHJhY2VgIGluc3RlYWQuIElmIGBlbnYudHJhY2VgIGlzIHNldCwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIGlnbm9yZWQuXHJcbiAgICAgKi9cclxuICAgIHRyYWNlPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBvciBnZXQgYSBudW1iZXIgc3BlY2lmeWluZyB0aGUgdGltZW91dCBmb3IgaW5pdGlhbGl6YXRpb24gb2YgV2ViQXNzZW1ibHkgYmFja2VuZCwgaW4gbWlsbGlzZWNvbmRzLiBBIHplcm9cclxuICAgICAqIHZhbHVlIGluZGljYXRlcyBubyB0aW1lb3V0IGlzIHNldC5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGAwYFxyXG4gICAgICovXHJcbiAgICBpbml0VGltZW91dD86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBhIGN1c3RvbSBVUkwgcHJlZml4IHRvIHRoZSAud2FzbS8ubWpzIGZpbGVzLCBvciBhbiBvYmplY3Qgb2Ygb3ZlcnJpZGVzIGZvciBib3RoIC53YXNtLy5tanMgZmlsZS4gVGhlIG92ZXJyaWRlXHJcbiAgICAgKiBwYXRoIHNob3VsZCBiZSBhbiBhYnNvbHV0ZSBwYXRoLlxyXG4gICAgICovXHJcbiAgICB3YXNtUGF0aHM/OiBXYXNtUHJlZml4T3JGaWxlUGF0aHM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIElmIHRoaXMgcHJvcGVydHkgaXMgc2V0LCB0aGUgYHdhc21QYXRoc2AgcHJvcGVydHkgd2lsbFxyXG4gICAgICogYmUgaWdub3JlZC5cclxuICAgICAqL1xyXG4gICAgd2FzbUJpbmFyeT86IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IGEgYm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gcHJveHkgdGhlIGV4ZWN1dGlvbiBvZiBtYWluIHRocmVhZCB0byBhIHdvcmtlciB0aHJlYWQuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXHJcbiAgICAgKi9cclxuICAgIHByb3h5PzogYm9vbGVhbjtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR0xGbGFncyB7XHJcbiAgICAvKipcclxuICAgICAqIFNldCBvciBnZXQgdGhlIFdlYkdMIENvbnRleHQgSUQgKHdlYmdsIG9yIHdlYmdsMikuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgJ3dlYmdsMidgXHJcbiAgICAgKi9cclxuICAgIGNvbnRleHRJZD86ICd3ZWJnbCcgfCAnd2ViZ2wyJztcclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBXZWJHTCByZW5kZXJpbmcgY29udGV4dC5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgY29udGV4dDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBtYXhpbXVtIGJhdGNoIHNpemUgZm9yIG1hdG11bC4gMCBtZWFucyB0byBkaXNhYmxlIGJhdGNoaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkXHJcbiAgICAgKi9cclxuICAgIG1hdG11bE1heEJhdGNoU2l6ZT86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgdGV4dHVyZSBjYWNoZSBtb2RlLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYCdmdWxsJ2BcclxuICAgICAqL1xyXG4gICAgdGV4dHVyZUNhY2hlTW9kZT86ICdpbml0aWFsaXplck9ubHknIHwgJ2Z1bGwnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwYWNrZWQgdGV4dHVyZSBtb2RlXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgZmFsc2VgXHJcbiAgICAgKi9cclxuICAgIHBhY2s/OiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgZW5hYmxlIGFzeW5jIGRvd25sb2FkLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAgICovXHJcbiAgICBhc3luYz86IGJvb2xlYW47XHJcbiAgfVxyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdVByb2ZpbGluZ0RhdGFWMVRlbnNvck1ldGFkYXRhIHtcclxuICAgIGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xyXG4gICAgZGF0YVR5cGU6IHN0cmluZztcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJHcHVQcm9maWxpbmdEYXRhVjEge1xyXG4gICAgdmVyc2lvbjogMTtcclxuICAgIGlucHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xyXG4gICAgb3V0cHV0c01ldGFkYXRhOiByZWFkb25seSBXZWJHcHVQcm9maWxpbmdEYXRhVjFUZW5zb3JNZXRhZGF0YVtdO1xyXG4gICAga2VybmVsSWQ6IG51bWJlcjtcclxuICAgIGtlcm5lbFR5cGU6IHN0cmluZztcclxuICAgIGtlcm5lbE5hbWU6IHN0cmluZztcclxuICAgIHByb2dyYW1OYW1lOiBzdHJpbmc7XHJcbiAgICBzdGFydFRpbWU6IG51bWJlcjtcclxuICAgIGVuZFRpbWU6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIGV4cG9ydCB0eXBlIFdlYkdwdVByb2ZpbGluZ0RhdGEgPSBXZWJHcHVQcm9maWxpbmdEYXRhVjE7XHJcblxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViR3B1RmxhZ3Mge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgYGVudi53ZWJncHUucHJvZmlsaW5nLm1vZGVgIGluc3RlYWQuIElmIGBlbnYud2ViZ3B1LnByb2ZpbGluZy5tb2RlYCBpcyBzZXQsIHRoaXMgcHJvcGVydHkgd2lsbCBiZVxyXG4gICAgICogaWdub3JlZC5cclxuICAgICAqL1xyXG4gICAgcHJvZmlsaW5nTW9kZT86ICdvZmYnIHwgJ2RlZmF1bHQnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgY29uZmlndXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHJvZmlsaW5nOiB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwcm9maWxpbmcgbW9kZS5cclxuICAgICAgICpcclxuICAgICAgICogQGRlZmF1bHRWYWx1ZSBgJ29mZidgXHJcbiAgICAgICAqL1xyXG4gICAgICBtb2RlPzogJ29mZicgfCAnZGVmYXVsdCc7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogU2V0IG9yIGdldCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYSBwcm9maWxpbmcgZGF0YSBpcyByZWNlaXZlZC4gSWYgbm90IHNldCwgdGhlIHByb2ZpbGluZyBkYXRhIHdpbGwgYmVcclxuICAgICAgICogcHJpbnRlZCB0byBjb25zb2xlLlxyXG4gICAgICAgKi9cclxuICAgICAgb25kYXRhPzogKGRhdGE6IFdlYkdwdVByb2ZpbGluZ0RhdGEpID0+IHZvaWQ7XHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBwb3dlciBwcmVmZXJlbmNlLlxyXG4gICAgICpcclxuICAgICAqIFNldHRpbmcgdGhpcyBwcm9wZXJ0eSBvbmx5IGhhcyBlZmZlY3QgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmVcclxuICAgICAqIHVzZWQgYXMgb3B0aW9ucyBmb3IgYG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoKWAuXHJcbiAgICAgKlxyXG4gICAgICogU2VlIHtAbGluayBodHRwczovL2dwdXdlYi5naXRodWIuaW8vZ3B1d2ViLyNkaWN0ZGVmLWdwdXJlcXVlc3RhZGFwdGVyb3B0aW9uc30gZm9yIG1vcmUgZGV0YWlscy5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGB1bmRlZmluZWRgXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgQ3JlYXRlIHlvdXIgb3duIEdQVUFkYXB0ZXIsIHVzZSBpdCB0byBjcmVhdGUgYSBHUFVEZXZpY2UgaW5zdGFuY2UgYW5kIHNldCB7QGxpbmsgZGV2aWNlfSBwcm9wZXJ0eSBpZlxyXG4gICAgICogeW91IHdhbnQgdG8gdXNlIGEgc3BlY2lmaWMgcG93ZXIgcHJlZmVyZW5jZS5cclxuICAgICAqL1xyXG4gICAgcG93ZXJQcmVmZXJlbmNlPzogJ2xvdy1wb3dlcicgfCAnaGlnaC1wZXJmb3JtYW5jZSc7XHJcbiAgICAvKipcclxuICAgICAqIFNldCBvciBnZXQgdGhlIGZvcmNlIGZhbGxiYWNrIGFkYXB0ZXIgZmxhZy5cclxuICAgICAqXHJcbiAgICAgKiBTZXR0aW5nIHRoaXMgcHJvcGVydHkgb25seSBoYXMgZWZmZWN0IGJlZm9yZSB0aGUgZmlyc3QgV2ViR1BVIGluZmVyZW5jZSBzZXNzaW9uIGlzIGNyZWF0ZWQuIFRoZSB2YWx1ZSB3aWxsIGJlXHJcbiAgICAgKiB1c2VkIGFzIG9wdGlvbnMgZm9yIGBuYXZpZ2F0b3IuZ3B1LnJlcXVlc3RBZGFwdGVyKClgLlxyXG4gICAgICpcclxuICAgICAqIFNlZSB7QGxpbmsgaHR0cHM6Ly9ncHV3ZWIuZ2l0aHViLmlvL2dwdXdlYi8jZGljdGRlZi1ncHVyZXF1ZXN0YWRhcHRlcm9wdGlvbnN9IGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHRWYWx1ZSBgdW5kZWZpbmVkYFxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIENyZWF0ZSB5b3VyIG93biBHUFVBZGFwdGVyLCB1c2UgaXQgdG8gY3JlYXRlIGEgR1BVRGV2aWNlIGluc3RhbmNlIGFuZCBzZXQge0BsaW5rIGRldmljZX0gcHJvcGVydHkgaWZcclxuICAgICAqIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIGZhbGxiYWNrIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgZm9yY2VGYWxsYmFja0FkYXB0ZXI/OiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHRoZSBhZGFwdGVyIGZvciBXZWJHUFUuXHJcbiAgICAgKlxyXG4gICAgICogU2V0dGluZyB0aGlzIHByb3BlcnR5IG9ubHkgaGFzIGVmZmVjdCBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGUgdmFsdWUgd2lsbCBiZVxyXG4gICAgICogdXNlZCBhcyB0aGUgR1BVIGFkYXB0ZXIgZm9yIHRoZSB1bmRlcmx5aW5nIFdlYkdQVSBiYWNrZW5kIHRvIGNyZWF0ZSBHUFUgZGV2aWNlLlxyXG4gICAgICpcclxuICAgICAqIElmIHRoaXMgcHJvcGVydHkgaXMgbm90IHNldCwgaXQgd2lsbCBiZSBhdmFpbGFibGUgdG8gZ2V0IGFmdGVyIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlXHJcbiAgICAgKiB2YWx1ZSB3aWxsIGJlIHRoZSBHUFUgYWRhcHRlciB0aGF0IGNyZWF0ZWQgYnkgdGhlIHVuZGVybHlpbmcgV2ViR1BVIGJhY2tlbmQuXHJcbiAgICAgKlxyXG4gICAgICogV2hlbiB1c2Ugd2l0aCBUeXBlU2NyaXB0LCB0aGUgdHlwZSBvZiB0aGlzIHByb3BlcnR5IGlzIGBHUFVBZGFwdGVyYCBkZWZpbmVkIGluIFwiQHdlYmdwdS90eXBlc1wiLlxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIEl0IGlzIG5vIGxvbmdlciByZWNvbW1lbmRlZCB0byB1c2UgdGhpcyBwcm9wZXJ0eS4gVGhlIGxhdGVzdCBXZWJHUFUgc3BlYyBhZGRzIGBHUFVEZXZpY2UuYWRhcHRlckluZm9gXHJcbiAgICAgKiAoaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYmdwdS8jZG9tLWdwdWRldmljZS1hZGFwdGVyaW5mbyksIHdoaWNoIGFsbG93cyB0byBnZXQgdGhlIGFkYXB0ZXIgaW5mb3JtYXRpb24gZnJvbSB0aGVcclxuICAgICAqIGRldmljZS4gV2hlbiBpdCdzIGF2YWlsYWJsZSwgdGhlcmUgaXMgbm8gbmVlZCB0byBzZXQvZ2V0IHRoZSB7QGxpbmsgYWRhcHRlcn0gcHJvcGVydHkuXHJcbiAgICAgKi9cclxuICAgIGFkYXB0ZXI6IFRyeUdldEdsb2JhbFR5cGU8J0dQVUFkYXB0ZXInPjtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IG9yIGdldCB0aGUgR1BVIGRldmljZSBmb3IgV2ViR1BVLlxyXG4gICAgICpcclxuICAgICAqIFRoZXJlIGFyZSAzIHZhbGlkIHNjZW5hcmlvcyBvZiBhY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eTpcclxuICAgICAqIC0gU2V0IGEgdmFsdWUgYmVmb3JlIHRoZSBmaXJzdCBXZWJHUFUgaW5mZXJlbmNlIHNlc3Npb24gaXMgY3JlYXRlZC4gVGhlIHZhbHVlIHdpbGwgYmUgdXNlZCBieSB0aGUgV2ViR1BVIGJhY2tlbmRcclxuICAgICAqIHRvIHBlcmZvcm0gY2FsY3VsYXRpb25zLiBJZiB0aGUgdmFsdWUgaXMgbm90IGEgYEdQVURldmljZWAgb2JqZWN0LCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cclxuICAgICAqIC0gR2V0IHRoZSB2YWx1ZSBiZWZvcmUgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBUaGlzIHdpbGwgdHJ5IHRvIGNyZWF0ZSBhIG5ldyBHUFVEZXZpY2VcclxuICAgICAqIGluc3RhbmNlLiBSZXR1cm5zIGEgYFByb21pc2VgIHRoYXQgcmVzb2x2ZXMgdG8gYSBgR1BVRGV2aWNlYCBvYmplY3QuXHJcbiAgICAgKiAtIEdldCB0aGUgdmFsdWUgYWZ0ZXIgdGhlIGZpcnN0IFdlYkdQVSBpbmZlcmVuY2Ugc2Vzc2lvbiBpcyBjcmVhdGVkLiBSZXR1cm5zIGEgcmVzb2x2ZWQgYFByb21pc2VgIHRvIHRoZVxyXG4gICAgICogYEdQVURldmljZWAgb2JqZWN0IHVzZWQgYnkgdGhlIFdlYkdQVSBiYWNrZW5kLlxyXG4gICAgICovXHJcbiAgICBnZXQgZGV2aWNlKCk6IFByb21pc2U8VHJ5R2V0R2xvYmFsVHlwZTwnR1BVRGV2aWNlJz4+O1xyXG4gICAgc2V0IGRldmljZSh2YWx1ZTogVHJ5R2V0R2xvYmFsVHlwZTwnR1BVRGV2aWNlJz4pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgb3IgZ2V0IHdoZXRoZXIgdmFsaWRhdGUgaW5wdXQgY29udGVudC5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdFZhbHVlIGBmYWxzZWBcclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGVJbnB1dENvbnRlbnQ/OiBib29sZWFuO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBFbnYge1xyXG4gIC8qKlxyXG4gICAqIHNldCB0aGUgc2V2ZXJpdHkgbGV2ZWwgZm9yIGxvZ2dpbmcuXHJcbiAgICpcclxuICAgKiBAZGVmYXVsdFZhbHVlIGAnd2FybmluZydgXHJcbiAgICovXHJcbiAgbG9nTGV2ZWw/OiAndmVyYm9zZScgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2ZhdGFsJztcclxuXHJcbiAgLyoqXHJcbiAgICogSW5kaWNhdGUgd2hldGhlciBydW4gaW4gZGVidWcgbW9kZS5cclxuICAgKlxyXG4gICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAqL1xyXG4gIGRlYnVnPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IG9yIGdldCBhIGJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRvIGVuYWJsZSB0cmFjZS5cclxuICAgKlxyXG4gICAqIEBkZWZhdWx0VmFsdWUgYGZhbHNlYFxyXG4gICAqL1xyXG4gIHRyYWNlPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHZlcnNpb24gb2YgdGhlIGN1cnJlbnQgcGFja2FnZS5cclxuICAgKi9cclxuICByZWFkb25seSB2ZXJzaW9uczoge1xyXG4gICAgcmVhZG9ubHkgY29tbW9uOiBzdHJpbmc7XHJcbiAgICByZWFkb25seSB3ZWI/OiBzdHJpbmc7XHJcbiAgICByZWFkb25seSBub2RlPzogc3RyaW5nO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxyXG4gICAgcmVhZG9ubHkgJ3JlYWN0LW5hdGl2ZSc/OiBzdHJpbmc7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50IGEgc2V0IG9mIGZsYWdzIGZvciBXZWJBc3NlbWJseVxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHdhc206IEVudi5XZWJBc3NlbWJseUZsYWdzO1xyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdMXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgd2ViZ2w6IEVudi5XZWJHTEZsYWdzO1xyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnQgYSBzZXQgb2YgZmxhZ3MgZm9yIFdlYkdQVVxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHdlYmdwdTogRW52LldlYkdwdUZsYWdzO1xyXG5cclxuICBbbmFtZTogc3RyaW5nXTogdW5rbm93bjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBhIHNldCBvZiBmbGFncyBhcyBhIGdsb2JhbCBzaW5nbGV0b24uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZW52OiBFbnYgPSBlbnZJbXBsO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IFRlbnNvclRvRGF0YVVybE9wdGlvbnMsIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyB9IGZyb20gJy4vdGVuc29yLWNvbnZlcnNpb24uanMnO1xyXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLnRvRGF0YVVSTCgpXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yVG9EYXRhVVJMID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9EYXRhVXJsT3B0aW9ucyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgY2FudmFzID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpIDogbmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKTtcclxuICBjYW52YXMud2lkdGggPSB0ZW5zb3IuZGltc1szXTtcclxuICBjYW52YXMuaGVpZ2h0ID0gdGVuc29yLmRpbXNbMl07XHJcbiAgY29uc3QgcGl4ZWxzMkRDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXNcclxuICAgIHwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXHJcbiAgICB8IE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxyXG4gICAgfCBudWxsO1xyXG5cclxuICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcclxuICAgIC8vIERlZmF1bHQgdmFsdWVzIGZvciBoZWlnaHQgYW5kIHdpZHRoICYgZm9ybWF0XHJcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcclxuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcclxuICAgIGlmIChvcHRpb25zPy50ZW5zb3JMYXlvdXQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XHJcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XHJcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzNdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxyXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xyXG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbnB1dGZvcm1hdCA9IG9wdGlvbnM/LmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCJztcclxuXHJcbiAgICBjb25zdCBub3JtID0gb3B0aW9ucz8ubm9ybTtcclxuICAgIGxldCBub3JtTWVhbjogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcbiAgICBsZXQgbm9ybUJpYXM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLm1lYW4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBub3JtTWVhbiA9IFsyNTUsIDI1NSwgMjU1LCAyNTVdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiBub3JtLm1lYW4gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW5bMF0sIG5vcm0ubWVhblsxXSwgbm9ybS5tZWFuWzJdLCAwXTtcclxuICAgICAgICBpZiAobm9ybS5tZWFuWzNdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIG5vcm1NZWFuWzNdID0gbm9ybS5tZWFuWzNdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG5vcm0gPT09IHVuZGVmaW5lZCB8fCBub3JtLmJpYXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBub3JtQmlhcyA9IFswLCAwLCAwLCAwXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygbm9ybS5iaWFzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXMsIG5vcm0uYmlhc107XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm9ybUJpYXMgPSBbbm9ybS5iaWFzWzBdLCBub3JtLmJpYXNbMV0sIG5vcm0uYmlhc1syXSwgMF07XHJcbiAgICAgICAgaWYgKG5vcm0uYmlhc1szXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBub3JtQmlhc1szXSA9IG5vcm0uYmlhc1szXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdHJpZGUgPSBoZWlnaHQgKiB3aWR0aDtcclxuICAgIC8vIERlZmF1bHQgcG9pbnRlciBhc3NpZ25tZW50c1xyXG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCxcclxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcclxuICAgICAgYVRlbnNvclBvaW50ZXIgPSAtMTtcclxuXHJcbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XHJcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xyXG4gICAgICAgIGNvbnN0IFIgPSAoKHRlbnNvci5kYXRhW3JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1swXSkgKiBub3JtTWVhblswXTsgLy8gUiB2YWx1ZVxyXG4gICAgICAgIGNvbnN0IEcgPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxyXG4gICAgICAgIGNvbnN0IEIgPSAoKHRlbnNvci5kYXRhW2JUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1syXSkgKiBub3JtTWVhblsyXTsgLy8gQiB2YWx1ZVxyXG4gICAgICAgIGNvbnN0IEEgPSBhVGVuc29yUG9pbnRlciA9PT0gLTEgPyAyNTUgOiAoKHRlbnNvci5kYXRhW2FUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1szXSkgKiBub3JtTWVhblszXTsgLy8gQSB2YWx1ZVxyXG5cclxuICAgICAgICBwaXhlbHMyRENvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIFIgKyAnLCcgKyBHICsgJywnICsgQiArICcsJyArIEEgKyAnKSc7XHJcbiAgICAgICAgcGl4ZWxzMkRDb250ZXh0LmZpbGxSZWN0KGosIGksIDEsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoJ3RvRGF0YVVSTCcgaW4gY2FudmFzKSB7XHJcbiAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvRGF0YVVSTCBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IudG9JbWFnZURhdGEoKVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvclRvSW1hZ2VEYXRhID0gKHRlbnNvcjogVGVuc29yLCBvcHRpb25zPzogVGVuc29yVG9JbWFnZURhdGFPcHRpb25zKTogSW1hZ2VEYXRhID0+IHtcclxuICBjb25zdCBwaXhlbHMyRENvbnRleHQgPVxyXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJylcclxuICAgICAgOiAobmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKS5nZXRDb250ZXh0KCcyZCcpIGFzIE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk7XHJcbiAgbGV0IGltYWdlOiBJbWFnZURhdGE7XHJcbiAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XHJcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBmb3IgaGVpZ2h0IGFuZCB3aWR0aCAmIGZvcm1hdFxyXG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XHJcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBsZXQgY2hhbm5lbHM6IG51bWJlcjtcclxuICAgIGlmIChvcHRpb25zPy50ZW5zb3JMYXlvdXQgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnRlbnNvckxheW91dCA9PT0gJ05IV0MnKSB7XHJcbiAgICAgIHdpZHRoID0gdGVuc29yLmRpbXNbMl07XHJcbiAgICAgIGhlaWdodCA9IHRlbnNvci5kaW1zWzFdO1xyXG4gICAgICBjaGFubmVscyA9IHRlbnNvci5kaW1zWzNdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gRGVmYXVsdCBsYXlvdXQgaXMgTkNXSFxyXG4gICAgICB3aWR0aCA9IHRlbnNvci5kaW1zWzNdO1xyXG4gICAgICBoZWlnaHQgPSB0ZW5zb3IuZGltc1syXTtcclxuICAgICAgY2hhbm5lbHMgPSB0ZW5zb3IuZGltc1sxXTtcclxuICAgIH1cclxuICAgIGNvbnN0IGlucHV0Zm9ybWF0ID0gb3B0aW9ucyAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMuZm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xyXG5cclxuICAgIGNvbnN0IG5vcm0gPSBvcHRpb25zPy5ub3JtO1xyXG4gICAgbGV0IG5vcm1NZWFuOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuICAgIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcbiAgICBpZiAobm9ybSA9PT0gdW5kZWZpbmVkIHx8IG5vcm0ubWVhbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG5vcm1NZWFuID0gWzI1NSwgMjU1LCAyNTUsIDI1NV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIG5vcm0ubWVhbiA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtTWVhbiA9IFtub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuLCBub3JtLm1lYW5dO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1NZWFuID0gW25vcm0ubWVhblswXSwgbm9ybS5tZWFuWzFdLCBub3JtLm1lYW5bMl0sIDI1NV07XHJcbiAgICAgICAgaWYgKG5vcm0ubWVhblszXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBub3JtTWVhblszXSA9IG5vcm0ubWVhblszXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChub3JtID09PSB1bmRlZmluZWQgfHwgbm9ybS5iaWFzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgbm9ybUJpYXMgPSBbMCwgMCwgMCwgMF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIG5vcm0uYmlhcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vcm1CaWFzID0gW25vcm0uYmlhc1swXSwgbm9ybS5iaWFzWzFdLCBub3JtLmJpYXNbMl0sIDBdO1xyXG4gICAgICAgIGlmIChub3JtLmJpYXNbM10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgbm9ybUJpYXNbM10gPSBub3JtLmJpYXNbM107XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RyaWRlID0gaGVpZ2h0ICogd2lkdGg7XHJcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCAmJiBjaGFubmVscyA9PT0gNCAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQkEnKSB8fFxyXG4gICAgICAgIChjaGFubmVscyA9PT0gMyAmJiBvcHRpb25zLmZvcm1hdCAhPT0gJ1JHQicgJiYgb3B0aW9ucy5mb3JtYXQgIT09ICdCR1InKVxyXG4gICAgICApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZW5zb3IgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggaW5wdXQgdGVuc29yIGRpbXNcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZhdWx0IHBvaW50ZXIgYXNzaWdubWVudHNcclxuICAgIGNvbnN0IHN0ZXAgPSA0O1xyXG4gICAgbGV0IHJJbWFnZVBvaW50ZXIgPSAwLFxyXG4gICAgICBnSW1hZ2VQb2ludGVyID0gMSxcclxuICAgICAgYkltYWdlUG9pbnRlciA9IDIsXHJcbiAgICAgIGFJbWFnZVBvaW50ZXIgPSAzO1xyXG4gICAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCxcclxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGUsXHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMixcclxuICAgICAgYVRlbnNvclBvaW50ZXIgPSAtMTtcclxuXHJcbiAgICAvLyBVcGRhdGluZyB0aGUgcG9pbnRlciBhc3NpZ25tZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgaW1hZ2UgZm9ybWF0XHJcbiAgICBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0JBJykge1xyXG4gICAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDI7XHJcbiAgICAgIGFUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMztcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSR0InKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgZ1RlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGJUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH0gZWxzZSBpZiAoaW5wdXRmb3JtYXQgPT09ICdSQkcnKSB7XHJcbiAgICAgIHJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGU7XHJcbiAgICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICAgIH1cclxuXHJcbiAgICBpbWFnZSA9IHBpeGVsczJEQ29udGV4dC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICBpIDwgaGVpZ2h0ICogd2lkdGg7XHJcbiAgICAgIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgZ0ltYWdlUG9pbnRlciArPSBzdGVwLCBiSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcCwgaSsrXHJcbiAgICApIHtcclxuICAgICAgaW1hZ2UuZGF0YVtySW1hZ2VQb2ludGVyXSA9ICgodGVuc29yLmRhdGFbclRlbnNvclBvaW50ZXIrK10gYXMgbnVtYmVyKSAtIG5vcm1CaWFzWzBdKSAqIG5vcm1NZWFuWzBdOyAvLyBSIHZhbHVlXHJcbiAgICAgIGltYWdlLmRhdGFbZ0ltYWdlUG9pbnRlcl0gPSAoKHRlbnNvci5kYXRhW2dUZW5zb3JQb2ludGVyKytdIGFzIG51bWJlcikgLSBub3JtQmlhc1sxXSkgKiBub3JtTWVhblsxXTsgLy8gRyB2YWx1ZVxyXG4gICAgICBpbWFnZS5kYXRhW2JJbWFnZVBvaW50ZXJdID0gKCh0ZW5zb3IuZGF0YVtiVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbMl0pICogbm9ybU1lYW5bMl07IC8vIEIgdmFsdWVcclxuICAgICAgaW1hZ2UuZGF0YVthSW1hZ2VQb2ludGVyXSA9XHJcbiAgICAgICAgYVRlbnNvclBvaW50ZXIgPT09IC0xID8gMjU1IDogKCh0ZW5zb3IuZGF0YVthVGVuc29yUG9pbnRlcisrXSBhcyBudW1iZXIpIC0gbm9ybUJpYXNbM10pICogbm9ybU1lYW5bM107IC8vIEEgdmFsdWVcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XHJcbiAgfVxyXG4gIHJldHVybiBpbWFnZTtcclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQge1xyXG4gIE9wdGlvbnNEaW1lbnNpb25zLFxyXG4gIE9wdGlvbnNGb3JtYXQsXHJcbiAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzLFxyXG4gIE9wdGlvbnNUZW5zb3JGb3JtYXQsXHJcbiAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9ucyxcclxuICBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zLFxyXG4gIFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxyXG4gIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zLFxyXG4gIFRlbnNvckZyb21NTFRlbnNvck9wdGlvbnMsXHJcbiAgVGVuc29yRnJvbVRleHR1cmVPcHRpb25zLFxyXG4gIFRlbnNvckZyb21VcmxPcHRpb25zLFxyXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xyXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcclxuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckludGVyZmFjZSB9IGZyb20gJy4vdGVuc29yLmpzJztcclxuXHJcbmludGVyZmFjZSBCdWZmZXJUb1RlbnNvck9wdGlvbnNcclxuICBleHRlbmRzIE9wdGlvbnNEaW1lbnNpb25zLCBPcHRpb25zVGVuc29yTGF5b3V0LCBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMsIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNUZW5zb3JGb3JtYXQge31cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIGltYWdlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0gYnVmZmVyIC0gRXh0cmFjdGVkIGltYWdlIGJ1ZmZlciBkYXRhIC0gYXNzdW1pbmcgUkdCQSBmb3JtYXRcclxuICogQHBhcmFtIGltYWdlRm9ybWF0IC0gaW5wdXQgaW1hZ2UgY29uZmlndXJhdGlvbiAtIHJlcXVpcmVkIGNvbmZpZ3VyYXRpb25zIGhlaWdodCwgd2lkdGgsIGZvcm1hdFxyXG4gKiBAcGFyYW0gdGVuc29yRm9ybWF0IC0gb3V0cHV0IHRlbnNvciBjb25maWd1cmF0aW9uIC0gRGVmYXVsdCBpcyBSR0IgZm9ybWF0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYnVmZmVyVG9UZW5zb3IgPSAoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSB8IHVuZGVmaW5lZCwgb3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zKTogVGVuc29yID0+IHtcclxuICBpZiAoYnVmZmVyID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgYnVmZmVyIG11c3QgYmUgZGVmaW5lZCcpO1xyXG4gIH1cclxuICBpZiAob3B0aW9ucy5oZWlnaHQgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLndpZHRoID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgaGVpZ2h0IGFuZCB3aWR0aCBtdXN0IGJlIGRlZmluZWQnKTtcclxuICB9XHJcbiAgaWYgKG9wdGlvbnMudGVuc29yTGF5b3V0ID09PSAnTkhXQycpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTkhXQyBUZW5zb3IgbGF5b3V0IGlzIG5vdCBzdXBwb3J0ZWQgeWV0Jyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IG9wdGlvbnM7XHJcblxyXG4gIGNvbnN0IG5vcm0gPSBvcHRpb25zLm5vcm0gPz8geyBtZWFuOiAyNTUsIGJpYXM6IDAgfTtcclxuICBsZXQgbm9ybU1lYW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gIGxldCBub3JtQmlhczogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XHJcblxyXG4gIGlmICh0eXBlb2Ygbm9ybS5tZWFuID09PSAnbnVtYmVyJykge1xyXG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuLCBub3JtLm1lYW4sIG5vcm0ubWVhbiwgbm9ybS5tZWFuXTtcclxuICB9IGVsc2Uge1xyXG4gICAgbm9ybU1lYW4gPSBbbm9ybS5tZWFuIVswXSwgbm9ybS5tZWFuIVsxXSwgbm9ybS5tZWFuIVsyXSwgbm9ybS5tZWFuIVszXSA/PyAyNTVdO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBub3JtLmJpYXMgPT09ICdudW1iZXInKSB7XHJcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMsIG5vcm0uYmlhcywgbm9ybS5iaWFzLCBub3JtLmJpYXNdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBub3JtQmlhcyA9IFtub3JtLmJpYXMhWzBdLCBub3JtLmJpYXMhWzFdLCBub3JtLmJpYXMhWzJdLCBub3JtLmJpYXMhWzNdID8/IDBdO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaW5wdXRmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5mb3JtYXQgOiAnUkdCQSc7XHJcbiAgLy8gZGVmYXVsdCB2YWx1ZSBpcyBSR0JBIHNpbmNlIGltYWdlZGF0YSBhbmQgSFRNTEltYWdlRWxlbWVudCB1c2VzIGl0XHJcblxyXG4gIGNvbnN0IG91dHB1dGZvcm1hdCA9XHJcbiAgICBvcHRpb25zLnRlbnNvckZvcm1hdCAhPT0gdW5kZWZpbmVkID8gKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLnRlbnNvckZvcm1hdCA6ICdSR0InKSA6ICdSR0InO1xyXG4gIGNvbnN0IHN0cmlkZSA9IGhlaWdodCAqIHdpZHRoO1xyXG4gIGNvbnN0IGZsb2F0MzJEYXRhID0gb3V0cHV0Zm9ybWF0ID09PSAnUkdCQScgPyBuZXcgRmxvYXQzMkFycmF5KHN0cmlkZSAqIDQpIDogbmV3IEZsb2F0MzJBcnJheShzdHJpZGUgKiAzKTtcclxuXHJcbiAgLy8gRGVmYXVsdCBwb2ludGVyIGFzc2lnbm1lbnRzXHJcbiAgbGV0IHN0ZXAgPSA0LFxyXG4gICAgckltYWdlUG9pbnRlciA9IDAsXHJcbiAgICBnSW1hZ2VQb2ludGVyID0gMSxcclxuICAgIGJJbWFnZVBvaW50ZXIgPSAyLFxyXG4gICAgYUltYWdlUG9pbnRlciA9IDM7XHJcbiAgbGV0IHJUZW5zb3JQb2ludGVyID0gMCxcclxuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlLFxyXG4gICAgYlRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyLFxyXG4gICAgYVRlbnNvclBvaW50ZXIgPSAtMTtcclxuXHJcbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIGlucHV0IGltYWdlIGZvcm1hdFxyXG4gIGlmIChpbnB1dGZvcm1hdCA9PT0gJ1JHQicpIHtcclxuICAgIHN0ZXAgPSAzO1xyXG4gICAgckltYWdlUG9pbnRlciA9IDA7XHJcbiAgICBnSW1hZ2VQb2ludGVyID0gMTtcclxuICAgIGJJbWFnZVBvaW50ZXIgPSAyO1xyXG4gICAgYUltYWdlUG9pbnRlciA9IC0xO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRpbmcgdGhlIHBvaW50ZXIgYXNzaWdubWVudHMgYmFzZWQgb24gdGhlIG91dHB1dCB0ZW5zb3IgZm9ybWF0XHJcbiAgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnKSB7XHJcbiAgICBhVGVuc29yUG9pbnRlciA9IHN0cmlkZSAqIDM7XHJcbiAgfSBlbHNlIGlmIChvdXRwdXRmb3JtYXQgPT09ICdSQkcnKSB7XHJcbiAgICByVGVuc29yUG9pbnRlciA9IDA7XHJcbiAgICBiVGVuc29yUG9pbnRlciA9IHN0cmlkZTtcclxuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlICogMjtcclxuICB9IGVsc2UgaWYgKG91dHB1dGZvcm1hdCA9PT0gJ0JHUicpIHtcclxuICAgIGJUZW5zb3JQb2ludGVyID0gMDtcclxuICAgIGdUZW5zb3JQb2ludGVyID0gc3RyaWRlO1xyXG4gICAgclRlbnNvclBvaW50ZXIgPSBzdHJpZGUgKiAyO1xyXG4gIH1cclxuXHJcbiAgZm9yIChcclxuICAgIGxldCBpID0gMDtcclxuICAgIGkgPCBzdHJpZGU7XHJcbiAgICBpKyssIHJJbWFnZVBvaW50ZXIgKz0gc3RlcCwgYkltYWdlUG9pbnRlciArPSBzdGVwLCBnSW1hZ2VQb2ludGVyICs9IHN0ZXAsIGFJbWFnZVBvaW50ZXIgKz0gc3RlcFxyXG4gICkge1xyXG4gICAgZmxvYXQzMkRhdGFbclRlbnNvclBvaW50ZXIrK10gPSAoYnVmZmVyW3JJbWFnZVBvaW50ZXJdICsgbm9ybUJpYXNbMF0pIC8gbm9ybU1lYW5bMF07XHJcbiAgICBmbG9hdDMyRGF0YVtnVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbZ0ltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1sxXSkgLyBub3JtTWVhblsxXTtcclxuICAgIGZsb2F0MzJEYXRhW2JUZW5zb3JQb2ludGVyKytdID0gKGJ1ZmZlcltiSW1hZ2VQb2ludGVyXSArIG5vcm1CaWFzWzJdKSAvIG5vcm1NZWFuWzJdO1xyXG4gICAgaWYgKGFUZW5zb3JQb2ludGVyICE9PSAtMSAmJiBhSW1hZ2VQb2ludGVyICE9PSAtMSkge1xyXG4gICAgICBmbG9hdDMyRGF0YVthVGVuc29yUG9pbnRlcisrXSA9IChidWZmZXJbYUltYWdlUG9pbnRlcl0gKyBub3JtQmlhc1szXSkgLyBub3JtTWVhblszXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEZsb2F0MzJBcnJheSAtPiBvcnQuVGVuc29yXHJcbiAgY29uc3Qgb3V0cHV0VGVuc29yID1cclxuICAgIG91dHB1dGZvcm1hdCA9PT0gJ1JHQkEnXHJcbiAgICAgID8gbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgNCwgaGVpZ2h0LCB3aWR0aF0pXHJcbiAgICAgIDogbmV3IFRlbnNvcignZmxvYXQzMicsIGZsb2F0MzJEYXRhLCBbMSwgMywgaGVpZ2h0LCB3aWR0aF0pO1xyXG4gIHJldHVybiBvdXRwdXRUZW5zb3I7XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21JbWFnZSgpLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRlbnNvckZyb21JbWFnZSA9IGFzeW5jIChcclxuICBpbWFnZTogSW1hZ2VEYXRhIHwgSFRNTEltYWdlRWxlbWVudCB8IEltYWdlQml0bWFwIHwgc3RyaW5nLFxyXG4gIG9wdGlvbnM/OlxyXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9uc1xyXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc1xyXG4gICAgfCBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXHJcbiAgICB8IFRlbnNvckZyb21VcmxPcHRpb25zLFxyXG4pOiBQcm9taXNlPFRlbnNvcj4gPT4ge1xyXG4gIC8vIGNoZWNraW5nIHRoZSB0eXBlIG9mIGltYWdlIG9iamVjdFxyXG4gIGNvbnN0IGlzSFRNTEltYWdlRWxlID0gdHlwZW9mIEhUTUxJbWFnZUVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudDtcclxuICBjb25zdCBpc0ltYWdlRGF0YUVsZSA9IHR5cGVvZiBJbWFnZURhdGEgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VEYXRhO1xyXG4gIGNvbnN0IGlzSW1hZ2VCaXRtYXAgPSB0eXBlb2YgSW1hZ2VCaXRtYXAgIT09ICd1bmRlZmluZWQnICYmIGltYWdlIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXA7XHJcbiAgY29uc3QgaXNTdHJpbmcgPSB0eXBlb2YgaW1hZ2UgPT09ICdzdHJpbmcnO1xyXG5cclxuICBsZXQgZGF0YTogVWludDhDbGFtcGVkQXJyYXkgfCB1bmRlZmluZWQ7XHJcbiAgbGV0IGJ1ZmZlclRvVGVuc29yT3B0aW9uczogQnVmZmVyVG9UZW5zb3JPcHRpb25zID0gb3B0aW9ucyA/PyB7fTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQ2FudmFzID0gKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gbmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudmFzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNvbnN0IGNyZWF0ZUNhbnZhc0NvbnRleHQgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IE9mZnNjcmVlbkNhbnZhcykgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBIVE1MQ2FudmFzRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgfSBlbHNlIGlmIChjYW52YXMgaW5zdGFuY2VvZiBPZmZzY3JlZW5DYW52YXMpIHtcclxuICAgICAgcmV0dXJuIGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIGFzIE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgLy8gZmlsbGluZyBhbmQgY2hlY2tpbmcgaW1hZ2UgY29uZmlndXJhdGlvbiBvcHRpb25zXHJcbiAgaWYgKGlzSFRNTEltYWdlRWxlKSB7XHJcbiAgICAvLyBIVE1MSW1hZ2VFbGVtZW50IC0gaW1hZ2Ugb2JqZWN0IC0gZm9ybWF0IGlzIFJHQkEgYnkgZGVmYXVsdFxyXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XHJcbiAgICBjYW52YXMud2lkdGggPSBpbWFnZS53aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICBjb25zdCBwaXhlbHMyRENvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XHJcblxyXG4gICAgaWYgKHBpeGVsczJEQ29udGV4dCAhPSBudWxsKSB7XHJcbiAgICAgIGxldCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XHJcbiAgICAgIGxldCB3aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZFdpZHRoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZWRIZWlnaHQ7XHJcbiAgICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudGVuc29yRm9ybWF0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgaW5wdXQgY29uZmlnIGZvcm1hdCBtdXN0IGJlIFJHQkEgZm9yIEhUTUxJbWFnZUVsZW1lbnQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLnRlbnNvckZvcm1hdCA9ICdSR0JBJztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMud2lkdGggPSB3aWR0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMudGVuc29yRm9ybWF0ID0gJ1JHQkEnO1xyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBpeGVsczJEQ29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xyXG4gICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChpc0ltYWdlRGF0YUVsZSkge1xyXG4gICAgbGV0IGhlaWdodDogbnVtYmVyO1xyXG4gICAgbGV0IHdpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMgIT09IHVuZGVmaW5lZCAmJiBvcHRpb25zLnJlc2l6ZWRXaWR0aCAhPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucmVzaXplZEhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGhlaWdodCA9IG9wdGlvbnMucmVzaXplZEhlaWdodDtcclxuICAgICAgd2lkdGggPSBvcHRpb25zLnJlc2l6ZWRXaWR0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhlaWdodCA9IGltYWdlLmhlaWdodDtcclxuICAgICAgd2lkdGggPSBpbWFnZS53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBidWZmZXJUb1RlbnNvck9wdGlvbnMuZm9ybWF0ID0gJ1JHQkEnO1xyXG4gICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcclxuICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG5cclxuICAgIGlmIChvcHRpb25zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc3QgdGVtcENhbnZhcyA9IGNyZWF0ZUNhbnZhcygpO1xyXG5cclxuICAgICAgdGVtcENhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICB0ZW1wQ2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQodGVtcENhbnZhcyk7XHJcblxyXG4gICAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcclxuICAgICAgICBwaXhlbHMyRENvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlLCAwLCAwKTtcclxuICAgICAgICBkYXRhID0gcGl4ZWxzMkRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KS5kYXRhO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBhY2Nlc3MgaW1hZ2UgZGF0YScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYXRhID0gaW1hZ2UuZGF0YTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGlzSW1hZ2VCaXRtYXApIHtcclxuICAgIC8vIEltYWdlQml0bWFwIC0gaW1hZ2Ugb2JqZWN0IC0gZm9ybWF0IG11c3QgYmUgcHJvdmlkZWQgYnkgdXNlclxyXG4gICAgaWYgKG9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGltYWdlIGNvbmZpZyB3aXRoIGZvcm1hdCBmb3IgSW1hZ2ViaXRtYXAnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMoKTtcclxuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcclxuICAgIGNvbnN0IHBpeGVsczJEQ29udGV4dCA9IGNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzKTtcclxuXHJcbiAgICBpZiAocGl4ZWxzMkRDb250ZXh0ICE9IG51bGwpIHtcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xyXG4gICAgICBjb25zdCB3aWR0aCA9IGltYWdlLndpZHRoO1xyXG4gICAgICBwaXhlbHMyRENvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgZGF0YSA9IHBpeGVsczJEQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcclxuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgYnVmZmVyVG9UZW5zb3JPcHRpb25zLndpZHRoID0gd2lkdGg7XHJcbiAgICAgIHJldHVybiBidWZmZXJUb1RlbnNvcihkYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGFjY2VzcyBpbWFnZSBkYXRhJyk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChpc1N0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKCk7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjcmVhdGVDYW52YXNDb250ZXh0KGNhbnZhcyk7XHJcbiAgICAgIGlmICghaW1hZ2UgfHwgIWNvbnRleHQpIHtcclxuICAgICAgICByZXR1cm4gcmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV3SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgbmV3SW1hZ2UuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcclxuICAgICAgbmV3SW1hZ2Uuc3JjID0gaW1hZ2U7XHJcbiAgICAgIG5ld0ltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBjYW52YXMud2lkdGggPSBuZXdJbWFnZS53aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gbmV3SW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKG5ld0ltYWdlLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgIGJ1ZmZlclRvVGVuc29yT3B0aW9ucy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICByZXNvbHZlKGJ1ZmZlclRvVGVuc29yKGltZy5kYXRhLCBidWZmZXJUb1RlbnNvck9wdGlvbnMpKTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0IGRhdGEgcHJvdmlkZWQgaXMgbm90IHN1cHBvcnRlZCAtIGFib3J0ZWQgdGVuc29yIGNyZWF0aW9uJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gYnVmZmVyVG9UZW5zb3IoZGF0YSwgYnVmZmVyVG9UZW5zb3JPcHRpb25zKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBkYXRhIHByb3ZpZGVkIGlzIG5vdCBzdXBwb3J0ZWQgLSBhYm9ydGVkIHRlbnNvciBjcmVhdGlvbicpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IuZnJvbVRleHR1cmUoKS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tVGV4dHVyZSA9IDxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLlRleHR1cmVEYXRhVHlwZXM+KFxyXG4gIHRleHR1cmU6IFRlbnNvckludGVyZmFjZS5UZXh0dXJlVHlwZSxcclxuICBvcHRpb25zOiBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VD4sXHJcbik6IFRlbnNvciA9PiB7XHJcbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gb3B0aW9ucztcclxuICAvLyBBbHdheXMgYXNzdW1lIFJHQkFGMzIuIFRPRE86IHN1cHBvcnQgZGlmZmVyZW50IHRleHR1cmUgZm9ybWF0XHJcbiAgY29uc3QgZGltcyA9IFsxLCBoZWlnaHQsIHdpZHRoLCA0XTtcclxuICByZXR1cm4gbmV3IFRlbnNvcih7IGxvY2F0aW9uOiAndGV4dHVyZScsIHR5cGU6ICdmbG9hdDMyJywgdGV4dHVyZSwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21HcHVCdWZmZXIoKS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tR3B1QnVmZmVyID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuR3B1QnVmZmVyRGF0YVR5cGVzPihcclxuICBncHVCdWZmZXI6IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlLFxyXG4gIG9wdGlvbnM6IFRlbnNvckZyb21HcHVCdWZmZXJPcHRpb25zPFQ+LFxyXG4pOiBUZW5zb3IgPT4ge1xyXG4gIGNvbnN0IHsgZGF0YVR5cGUsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0gPSBvcHRpb25zO1xyXG4gIHJldHVybiBuZXcgVGVuc29yKHsgbG9jYXRpb246ICdncHUtYnVmZmVyJywgdHlwZTogZGF0YVR5cGUgPz8gJ2Zsb2F0MzInLCBncHVCdWZmZXIsIGRpbXMsIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvci5mcm9tTUxUZW5zb3IoKS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tTUxUZW5zb3IgPSA8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5NTFRlbnNvckRhdGFUeXBlcz4oXHJcbiAgbWxUZW5zb3I6IFRlbnNvckludGVyZmFjZS5NTFRlbnNvclR5cGUsXHJcbiAgb3B0aW9uczogVGVuc29yRnJvbU1MVGVuc29yT3B0aW9uczxUPixcclxuKTogVGVuc29yID0+IHtcclxuICBjb25zdCB7IGRhdGFUeXBlLCBkaW1zLCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gb3B0aW9ucztcclxuICByZXR1cm4gbmV3IFRlbnNvcih7IGxvY2F0aW9uOiAnbWwtdGVuc29yJywgdHlwZTogZGF0YVR5cGUgPz8gJ2Zsb2F0MzInLCBtbFRlbnNvciwgZGltcywgZG93bmxvYWQsIGRpc3Bvc2UgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogaW1wbGVtZW50YXRpb24gb2YgVGVuc29yLmZyb21QaW5uZWRCdWZmZXIoKS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB0ZW5zb3JGcm9tUGlubmVkQnVmZmVyID0gPFQgZXh0ZW5kcyBUZW5zb3JJbnRlcmZhY2UuQ3B1UGlubmVkRGF0YVR5cGVzPihcclxuICB0eXBlOiBULFxyXG4gIGJ1ZmZlcjogVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlTWFwW1RdLFxyXG4gIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuKTogVGVuc29yID0+IG5ldyBUZW5zb3IoeyBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLCB0eXBlLCBkYXRhOiBidWZmZXIsIGRpbXM6IGRpbXMgPz8gW2J1ZmZlci5sZW5ndGhdIH0pO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcclxuXHJcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMgPVxyXG4gIHwgRmxvYXQzMkFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQ4QXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQxNkFycmF5Q29uc3RydWN0b3JcclxuICB8IEludDE2QXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQ4QXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQzMkFycmF5Q29uc3RydWN0b3JcclxuICB8IEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3I7XHJcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZFR5cGVkQXJyYXkgPSBJbnN0YW5jZVR5cGU8U3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycz47XHJcblxyXG4vLyBhIHJ1bnRpbWUgbWFwIHRoYXQgbWFwcyB0eXBlIHN0cmluZyB0byBUeXBlZEFycmF5IGNvbnN0cnVjdG9yLiBTaG91bGQgbWF0Y2ggVGVuc29yLkRhdGFUeXBlTWFwLlxyXG5leHBvcnQgY29uc3QgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUCA9IG5ldyBNYXA8c3RyaW5nLCBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzPihbXHJcbiAgWydmbG9hdDMyJywgRmxvYXQzMkFycmF5XSxcclxuICBbJ3VpbnQ4JywgVWludDhBcnJheV0sXHJcbiAgWydpbnQ4JywgSW50OEFycmF5XSxcclxuICBbJ3VpbnQxNicsIFVpbnQxNkFycmF5XSxcclxuICBbJ2ludDE2JywgSW50MTZBcnJheV0sXHJcbiAgWydpbnQzMicsIEludDMyQXJyYXldLFxyXG4gIFsnYm9vbCcsIFVpbnQ4QXJyYXldLFxyXG4gIFsnZmxvYXQ2NCcsIEZsb2F0NjRBcnJheV0sXHJcbiAgWyd1aW50MzInLCBVaW50MzJBcnJheV0sXHJcbiAgWydpbnQ0JywgVWludDhBcnJheV0sXHJcbiAgWyd1aW50NCcsIFVpbnQ4QXJyYXldLFxyXG5dKTtcclxuXHJcbi8vIGEgcnVudGltZSBtYXAgdGhhdCBtYXBzIHR5cGUgc3RyaW5nIHRvIFR5cGVkQXJyYXkgY29uc3RydWN0b3IuIFNob3VsZCBtYXRjaCBUZW5zb3IuRGF0YVR5cGVNYXAuXHJcbmV4cG9ydCBjb25zdCBOVU1FUklDX1RFTlNPUl9UWVBFREFSUkFZX1RPX1RZUEVfTUFQID0gbmV3IE1hcDxTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLCBUZW5zb3IuVHlwZT4oW1xyXG4gIFtGbG9hdDMyQXJyYXksICdmbG9hdDMyJ10sXHJcbiAgW1VpbnQ4QXJyYXksICd1aW50OCddLFxyXG4gIFtJbnQ4QXJyYXksICdpbnQ4J10sXHJcbiAgW1VpbnQxNkFycmF5LCAndWludDE2J10sXHJcbiAgW0ludDE2QXJyYXksICdpbnQxNiddLFxyXG4gIFtJbnQzMkFycmF5LCAnaW50MzInXSxcclxuICBbRmxvYXQ2NEFycmF5LCAnZmxvYXQ2NCddLFxyXG4gIFtVaW50MzJBcnJheSwgJ3VpbnQzMiddLFxyXG5dKTtcclxuXHJcbi8vIHRoZSBmb2xsb3dpbmcgY29kZSBhbGxvd3MgZGVsYXlpbmcgZXhlY3V0aW9uIG9mIEJpZ0ludC9GbG9hdDE2QXJyYXkgY2hlY2tpbmcuIFRoaXMgYWxsb3dzIGxhenkgaW5pdGlhbGl6YXRpb24gZm9yXHJcbi8vIE5VTUVSSUNfVEVOU09SX1RZUEVfVE9fVFlQRURBUlJBWV9NQVAgYW5kIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsIHdoaWNoIGFsbG93cyBCaWdJbnQvRmxvYXQxNkFycmF5XHJcbi8vIHBvbHlmaWxsIGlmIGF2YWlsYWJsZS5cclxubGV0IGlzVHlwZWRBcnJheUNoZWNrZWQgPSBmYWxzZTtcclxuZXhwb3J0IGNvbnN0IGNoZWNrVHlwZWRBcnJheSA9ICgpID0+IHtcclxuICBpZiAoIWlzVHlwZWRBcnJheUNoZWNrZWQpIHtcclxuICAgIGlzVHlwZWRBcnJheUNoZWNrZWQgPSB0cnVlO1xyXG4gICAgY29uc3QgaXNCaWdJbnQ2NEFycmF5QXZhaWxhYmxlID0gdHlwZW9mIEJpZ0ludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ0ludDY0QXJyYXkuZnJvbTtcclxuICAgIGNvbnN0IGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUgPSB0eXBlb2YgQmlnVWludDY0QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEJpZ1VpbnQ2NEFycmF5LmZyb207XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiwgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgY29uc3QgRmxvYXQxNkFycmF5ID0gKGdsb2JhbFRoaXMgYXMgYW55KS5GbG9hdDE2QXJyYXk7XHJcbiAgICBjb25zdCBpc0Zsb2F0MTZBcnJheUF2YWlsYWJsZSA9IHR5cGVvZiBGbG9hdDE2QXJyYXkgIT09ICd1bmRlZmluZWQnICYmIEZsb2F0MTZBcnJheS5mcm9tO1xyXG5cclxuICAgIGlmIChpc0JpZ0ludDY0QXJyYXlBdmFpbGFibGUpIHtcclxuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2ludDY0JywgQmlnSW50NjRBcnJheSk7XHJcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEJpZ0ludDY0QXJyYXksICdpbnQ2NCcpO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzQmlnVWludDY0QXJyYXlBdmFpbGFibGUpIHtcclxuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ3VpbnQ2NCcsIEJpZ1VpbnQ2NEFycmF5KTtcclxuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5zZXQoQmlnVWludDY0QXJyYXksICd1aW50NjQnKTtcclxuICAgIH1cclxuICAgIGlmIChpc0Zsb2F0MTZBcnJheUF2YWlsYWJsZSkge1xyXG4gICAgICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLnNldCgnZmxvYXQxNicsIEZsb2F0MTZBcnJheSk7XHJcbiAgICAgIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAuc2V0KEZsb2F0MTZBcnJheSwgJ2Zsb2F0MTYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGlmIEZsb2F0MTZBcnJheSBpcyBub3QgYXZhaWxhYmxlLCB1c2UgJ1VpbnQxNkFycmF5JyB0byBzdG9yZSB0aGUgZGF0YS5cclxuICAgICAgTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5zZXQoJ2Zsb2F0MTYnLCBVaW50MTZBcnJheSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7XHJcbiAgQ3B1UGlubmVkQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxyXG4gIEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcclxuICBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcclxuICBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxyXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xyXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcclxuXHJcbi8qKlxyXG4gKiBjYWxjdWxhdGUgc2l6ZSBmcm9tIGRpbXMuXHJcbiAqXHJcbiAqIEBwYXJhbSBkaW1zIHRoZSBkaW1zIGFycmF5LiBNYXkgYmUgYW4gaWxsZWdhbCBpbnB1dC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVTaXplID0gKGRpbXM6IHJlYWRvbmx5IHVua25vd25bXSk6IG51bWJlciA9PiB7XHJcbiAgbGV0IHNpemUgPSAxO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZGltID0gZGltc1tpXTtcclxuICAgIGlmICh0eXBlb2YgZGltICE9PSAnbnVtYmVyJyB8fCAhTnVtYmVyLmlzU2FmZUludGVnZXIoZGltKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYW4gaW50ZWdlciwgZ290OiAke2RpbX1gKTtcclxuICAgIH1cclxuICAgIGlmIChkaW0gPCAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBkaW1zWyR7aX1dIG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290OiAke2RpbX1gKTtcclxuICAgIH1cclxuICAgIHNpemUgKj0gZGltO1xyXG4gIH1cclxuICByZXR1cm4gc2l6ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBpbXBsZW1lbnRhdGlvbiBvZiBUZW5zb3IucmVzaGFwZSgpXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yUmVzaGFwZSA9ICh0ZW5zb3I6IFRlbnNvciwgZGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3IgPT4ge1xyXG4gIHN3aXRjaCAodGVuc29yLmxvY2F0aW9uKSB7XHJcbiAgICBjYXNlICdjcHUnOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih0ZW5zb3IudHlwZSwgdGVuc29yLmRhdGEsIGRpbXMpO1xyXG4gICAgY2FzZSAnY3B1LXBpbm5lZCc6XHJcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcclxuICAgICAgICBsb2NhdGlvbjogJ2NwdS1waW5uZWQnLFxyXG4gICAgICAgIGRhdGE6IHRlbnNvci5kYXRhIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1snZGF0YSddLFxyXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1sndHlwZSddLFxyXG4gICAgICAgIGRpbXMsXHJcbiAgICAgIH0pO1xyXG4gICAgY2FzZSAndGV4dHVyZSc6XHJcbiAgICAgIHJldHVybiBuZXcgVGVuc29yKHtcclxuICAgICAgICBsb2NhdGlvbjogJ3RleHR1cmUnLFxyXG4gICAgICAgIHRleHR1cmU6IHRlbnNvci50ZXh0dXJlLFxyXG4gICAgICAgIHR5cGU6IHRlbnNvci50eXBlIGFzIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcclxuICAgICAgICBkaW1zLFxyXG4gICAgICB9KTtcclxuICAgIGNhc2UgJ2dwdS1idWZmZXInOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XHJcbiAgICAgICAgbG9jYXRpb246ICdncHUtYnVmZmVyJyxcclxuICAgICAgICBncHVCdWZmZXI6IHRlbnNvci5ncHVCdWZmZXIsXHJcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzWyd0eXBlJ10sXHJcbiAgICAgICAgZGltcyxcclxuICAgICAgfSk7XHJcbiAgICBjYXNlICdtbC10ZW5zb3InOlxyXG4gICAgICByZXR1cm4gbmV3IFRlbnNvcih7XHJcbiAgICAgICAgbG9jYXRpb246ICdtbC10ZW5zb3InLFxyXG4gICAgICAgIG1sVGVuc29yOiB0ZW5zb3IubWxUZW5zb3IsXHJcbiAgICAgICAgdHlwZTogdGVuc29yLnR5cGUgYXMgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnNbJ3R5cGUnXSxcclxuICAgICAgICBkaW1zLFxyXG4gICAgICB9KTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdGVuc29yUmVzaGFwZTogdGVuc29yIGxvY2F0aW9uICR7dGVuc29yLmxvY2F0aW9ufSBpcyBub3Qgc3VwcG9ydGVkYCk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IHRlbnNvclRvRGF0YVVSTCwgdGVuc29yVG9JbWFnZURhdGEgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLWltcGwuanMnO1xyXG5pbXBvcnQgeyBUZW5zb3JUb0RhdGFVcmxPcHRpb25zLCBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMgfSBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcclxuaW1wb3J0IHtcclxuICB0ZW5zb3JGcm9tR3B1QnVmZmVyLFxyXG4gIHRlbnNvckZyb21JbWFnZSxcclxuICB0ZW5zb3JGcm9tTUxUZW5zb3IsXHJcbiAgdGVuc29yRnJvbVBpbm5lZEJ1ZmZlcixcclxuICB0ZW5zb3JGcm9tVGV4dHVyZSxcclxufSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LWltcGwuanMnO1xyXG5pbXBvcnQge1xyXG4gIENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyxcclxuICBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXHJcbiAgTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMsXHJcbiAgVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnMsXHJcbiAgVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcclxuICBUZW5zb3JGcm9tSW1hZ2VEYXRhT3B0aW9ucyxcclxuICBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcclxuICBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zLFxyXG4gIFRlbnNvckZyb21UZXh0dXJlT3B0aW9ucyxcclxuICBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcclxuICBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzLFxyXG59IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xyXG5pbXBvcnQge1xyXG4gIGNoZWNrVHlwZWRBcnJheSxcclxuICBOVU1FUklDX1RFTlNPUl9UWVBFX1RPX1RZUEVEQVJSQVlfTUFQLFxyXG4gIE5VTUVSSUNfVEVOU09SX1RZUEVEQVJSQVlfVE9fVFlQRV9NQVAsXHJcbiAgU3VwcG9ydGVkVHlwZWRBcnJheSxcclxuICBTdXBwb3J0ZWRUeXBlZEFycmF5Q29uc3RydWN0b3JzLFxyXG59IGZyb20gJy4vdGVuc29yLWltcGwtdHlwZS1tYXBwaW5nLmpzJztcclxuaW1wb3J0IHsgY2FsY3VsYXRlU2l6ZSwgdGVuc29yUmVzaGFwZSB9IGZyb20gJy4vdGVuc29yLXV0aWxzLWltcGwuanMnO1xyXG5pbXBvcnQgeyBUZW5zb3IgYXMgVGVuc29ySW50ZXJmYWNlIH0gZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5cclxuLy8gdHlwZSBhbGlhc2VzIGZvciB0aG9zZSBleHBvcnRlZCBmcm9tIFRlbnNvciBpbnRlcmZhY2VcclxuXHJcbnR5cGUgVGVuc29yVHlwZSA9IFRlbnNvckludGVyZmFjZS5UeXBlO1xyXG50eXBlIFRlbnNvckRhdGFUeXBlID0gVGVuc29ySW50ZXJmYWNlLkRhdGFUeXBlO1xyXG50eXBlIFRlbnNvckRhdGFMb2NhdGlvbiA9IFRlbnNvckludGVyZmFjZS5EYXRhTG9jYXRpb247XHJcbnR5cGUgVGVuc29yVGV4dHVyZVR5cGUgPSBUZW5zb3JJbnRlcmZhY2UuVGV4dHVyZVR5cGU7XHJcbnR5cGUgVGVuc29yR3B1QnVmZmVyVHlwZSA9IFRlbnNvckludGVyZmFjZS5HcHVCdWZmZXJUeXBlO1xyXG50eXBlIFRlbnNvck1MVGVuc29yVHlwZSA9IFRlbnNvckludGVyZmFjZS5NTFRlbnNvclR5cGU7XHJcblxyXG4vKipcclxuICogdGhlIGltcGxlbWVudGF0aW9uIG9mIFRlbnNvciBpbnRlcmZhY2UuXHJcbiAqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUZW5zb3IgaW1wbGVtZW50cyBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gIC8vICNyZWdpb24gY29uc3RydWN0b3JzXHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBDUFUgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdHlwZTogVGVuc29yVHlwZSxcclxuICAgIGRhdGE6IFRlbnNvckRhdGFUeXBlIHwgVWludDhDbGFtcGVkQXJyYXkgfCByZWFkb25seSBzdHJpbmdbXSB8IHJlYWRvbmx5IG51bWJlcltdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxyXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxyXG4gICk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IENQVSB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuIFR5cGUgaXMgaW5mZXJyZWQgZnJvbSBkYXRhLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgZGF0YTogVGVuc29yRGF0YVR5cGUgfCBVaW50OENsYW1wZWRBcnJheSB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxyXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxyXG4gICk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgcGlubmVkIENQVSBkYXRhIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnY3B1LXBpbm5lZCcuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVycyk7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgV2ViR0wgdGV4dHVyZSB3aXRoIHRoZSBnaXZlbiB0eXBlIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogVGVuc29yJ3MgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ3RleHR1cmUnLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHBhcmFtcyAtIFNwZWNpZnkgdGhlIHBhcmFtZXRlcnMgdG8gY29uc3RydWN0IHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocGFyYW1zOiBUZXh0dXJlQ29uc3RydWN0b3JQYXJhbWV0ZXJzKTtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBXZWJHUFUgYnVmZmVyIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnZ3B1LWJ1ZmZlcicuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGFyYW1zIC0gU3BlY2lmeSB0aGUgcGFyYW1ldGVycyB0byBjb25zdHJ1Y3QgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihwYXJhbXM6IEdwdUJ1ZmZlckNvbnN0cnVjdG9yUGFyYW1ldGVycyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIFdlYk5OIE1MVGVuc29yIHdpdGggdGhlIGdpdmVuIHR5cGUgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBUZW5zb3IncyBsb2NhdGlvbiB3aWxsIGJlIHNldCB0byAnbWwtdGVuc29yJy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXJhbXMgLSBTcGVjaWZ5IHRoZSBwYXJhbWV0ZXJzIHRvIGNvbnN0cnVjdCB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtczogTUxUZW5zb3JDb25zdHJ1Y3RvclBhcmFtZXRlcnMpO1xyXG5cclxuICAvKipcclxuICAgKiBpbXBsZW1lbnRhdGlvbi5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGFyZzA6XHJcbiAgICAgIHwgVGVuc29yVHlwZVxyXG4gICAgICB8IFRlbnNvckRhdGFUeXBlXHJcbiAgICAgIHwgVWludDhDbGFtcGVkQXJyYXlcclxuICAgICAgfCByZWFkb25seSBzdHJpbmdbXVxyXG4gICAgICB8IHJlYWRvbmx5IGJvb2xlYW5bXVxyXG4gICAgICB8IENwdVBpbm5lZENvbnN0cnVjdG9yUGFyYW1ldGVyc1xyXG4gICAgICB8IFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnNcclxuICAgICAgfCBHcHVCdWZmZXJDb25zdHJ1Y3RvclBhcmFtZXRlcnNcclxuICAgICAgfCBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVycyxcclxuICAgIGFyZzE/OiBUZW5zb3JEYXRhVHlwZSB8IFVpbnQ4Q2xhbXBlZEFycmF5IHwgcmVhZG9ubHkgbnVtYmVyW10gfCByZWFkb25seSBzdHJpbmdbXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcclxuICAgIGFyZzI/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApIHtcclxuICAgIC8vIHBlcmZvcm0gb25lLXRpbWUgY2hlY2sgZm9yIEJpZ0ludC9GbG9hdDE2QXJyYXkgc3VwcG9ydFxyXG4gICAgY2hlY2tUeXBlZEFycmF5KCk7XHJcblxyXG4gICAgbGV0IHR5cGU6IFRlbnNvclR5cGU7XHJcbiAgICBsZXQgZGltczogcmVhZG9ubHkgbnVtYmVyW107XHJcblxyXG4gICAgaWYgKHR5cGVvZiBhcmcwID09PSAnb2JqZWN0JyAmJiAnbG9jYXRpb24nIGluIGFyZzApIHtcclxuICAgICAgLy9cclxuICAgICAgLy8gY29uc3RydWN0aW5nIHRlbnNvciBmcm9tIHNwZWNpZmljIGxvY2F0aW9uXHJcbiAgICAgIC8vXHJcbiAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gYXJnMC5sb2NhdGlvbjtcclxuICAgICAgdHlwZSA9IGFyZzAudHlwZTtcclxuICAgICAgZGltcyA9IGFyZzAuZGltcztcclxuICAgICAgc3dpdGNoIChhcmcwLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgY2FzZSAnY3B1LXBpbm5lZCc6IHtcclxuICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQodHlwZSk7XHJcbiAgICAgICAgICBpZiAoIWV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIHBpbm5lZCBidWZmZXJgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghKGFyZzAuZGF0YSBpbnN0YW5jZW9mIGV4cGVjdGVkVHlwZWRBcnJheUNvbnN0cnVjdG9yKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBidWZmZXIgc2hvdWxkIGJlIG9mIHR5cGUgJHtleHBlY3RlZFR5cGVkQXJyYXlDb25zdHJ1Y3Rvci5uYW1lfWApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5jcHVEYXRhID0gYXJnMC5kYXRhO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgJ3RleHR1cmUnOiB7XHJcbiAgICAgICAgICBpZiAodHlwZSAhPT0gJ2Zsb2F0MzInKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIHRleHR1cmVgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ3B1VGV4dHVyZURhdGEgPSBhcmcwLnRleHR1cmU7XHJcbiAgICAgICAgICB0aGlzLmRvd25sb2FkZXIgPSBhcmcwLmRvd25sb2FkO1xyXG4gICAgICAgICAgdGhpcy5kaXNwb3NlciA9IGFyZzAuZGlzcG9zZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdncHUtYnVmZmVyJzoge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0eXBlICE9PSAnZmxvYXQzMicgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MTYnICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQzMicgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDY0JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDMyJyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDgnICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdib29sJyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDQnICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQ0J1xyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYHVuc3VwcG9ydGVkIHR5cGUgXCIke3R5cGV9XCIgdG8gY3JlYXRlIHRlbnNvciBmcm9tIGdwdSBidWZmZXJgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IGFyZzAuZ3B1QnVmZmVyO1xyXG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcclxuICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSBhcmcwLmRpc3Bvc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnbWwtdGVuc29yJzoge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0eXBlICE9PSAnZmxvYXQzMicgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2Zsb2F0MTYnICYmXHJcbiAgICAgICAgICAgIHR5cGUgIT09ICdpbnQzMicgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ2ludDY0JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDMyJyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAndWludDY0JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50OCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ4JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAnYm9vbCcgJiZcclxuICAgICAgICAgICAgdHlwZSAhPT0gJ3VpbnQ0JyAmJlxyXG4gICAgICAgICAgICB0eXBlICE9PSAnaW50NCdcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGB1bnN1cHBvcnRlZCB0eXBlIFwiJHt0eXBlfVwiIHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbSBNTFRlbnNvcmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5tbFRlbnNvckRhdGEgPSBhcmcwLm1sVGVuc29yO1xyXG4gICAgICAgICAgdGhpcy5kb3dubG9hZGVyID0gYXJnMC5kb3dubG9hZDtcclxuICAgICAgICAgIHRoaXMuZGlzcG9zZXIgPSBhcmcwLmRpc3Bvc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGVuc29yIGNvbnN0cnVjdG9yOiB1bnN1cHBvcnRlZCBsb2NhdGlvbiAnJHt0aGlzLmRhdGFMb2NhdGlvbn0nYCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIGNvbnN0cnVjdGluZyB0ZW5zb3Igb2YgbG9jYXRpb24gJ2NwdSdcclxuICAgICAgLy9cclxuICAgICAgbGV0IGRhdGE6IFRlbnNvckRhdGFUeXBlO1xyXG4gICAgICBsZXQgbWF5YmVEaW1zOiB0eXBlb2YgYXJnMSB8IHR5cGVvZiBhcmcyO1xyXG4gICAgICAvLyBjaGVjayB3aGV0aGVyIGFyZzAgaXMgdHlwZSBvciBkYXRhXHJcbiAgICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIE92ZXJyaWRlOiBjb25zdHJ1Y3Rvcih0eXBlLCBkYXRhLCAuLi4pXHJcbiAgICAgICAgLy9cclxuICAgICAgICB0eXBlID0gYXJnMDtcclxuICAgICAgICBtYXliZURpbXMgPSBhcmcyO1xyXG4gICAgICAgIGlmIChhcmcwID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgLy8gc3RyaW5nIHRlbnNvclxyXG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZzEpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBIHN0cmluZyB0ZW5zb3IncyBkYXRhIG11c3QgYmUgYSBzdHJpbmcgYXJyYXkuXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gd2UgZG9uJ3QgY2hlY2sgd2hldGhlciBldmVyeSBlbGVtZW50IGluIHRoZSBhcnJheSBpcyBzdHJpbmc7IHRoaXMgaXMgdG9vIHNsb3cuIHdlIGFzc3VtZSBpdCdzIGNvcnJlY3QgYW5kXHJcbiAgICAgICAgICAvLyBlcnJvciB3aWxsIGJlIHBvcHVsYXRlZCBhdCBpbmZlcmVuY2VcclxuICAgICAgICAgIGRhdGEgPSBhcmcxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBudW1lcmljIHRlbnNvclxyXG4gICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gTlVNRVJJQ19URU5TT1JfVFlQRV9UT19UWVBFREFSUkFZX01BUC5nZXQoYXJnMCk7XHJcbiAgICAgICAgICBpZiAodHlwZWRBcnJheUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5zdXBwb3J0ZWQgdGVuc29yIHR5cGU6ICR7YXJnMH0uYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xyXG4gICAgICAgICAgICBpZiAoKGFyZzAgPT09ICdmbG9hdDE2JyAmJiB0eXBlZEFycmF5Q29uc3RydWN0b3IgPT09IFVpbnQxNkFycmF5KSB8fCBhcmcwID09PSAndWludDQnIHx8IGFyZzAgPT09ICdpbnQ0Jykge1xyXG4gICAgICAgICAgICAgIC8vIC0gJ2Zsb2F0MTYnOlxyXG4gICAgICAgICAgICAgIC8vICAgV2hlbiBubyBGbG9hdDE2QXJyYXkgcG9seWZpbGwgaXMgdXNlZCwgd2UgY2Fubm90IGNyZWF0ZSAnZmxvYXQxNicgdGVuc29yIGZyb20gbnVtYmVyIGFycmF5LlxyXG4gICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgLy8gICBUaHJvdyBlcnJvciBoZXJlIGJlY2F1c2Ugd2hlbiB1c2VyIHRyeSB0byB1c2UgbnVtYmVyIGFycmF5IGFzIGRhdGEsXHJcbiAgICAgICAgICAgICAgLy8gICBlLmcuIG5ldyBUZW5zb3IoJ2Zsb2F0MTYnLCBbMSwgMiwgMywgNF0sIGRpbXMpKSwgaXQgd2lsbCBhY3R1YWxseSBjYWxsXHJcbiAgICAgICAgICAgICAgLy8gICBVaW50MTZBcnJheS5mcm9tKGFyZzEpIHdoaWNoIGdlbmVyYXRlcyB3cm9uZyBkYXRhLlxyXG4gICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgLy8gLSAndWludDQnIGFuZCAnaW50NCc6XHJcbiAgICAgICAgICAgICAgLy8gICBVaW50OEFycmF5LmZyb20oYXJnMSkgd2lsbCBnZW5lcmF0ZSB3cm9uZyBkYXRhIGZvciAndWludDQnIGFuZCAnaW50NCcgdGVuc29yLlxyXG4gICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgICAgIGBDcmVhdGluZyBhICR7YXJnMH0gdGVuc29yIGZyb20gbnVtYmVyIGFycmF5IGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSB1c2UgJHt0eXBlZEFycmF5Q29uc3RydWN0b3IubmFtZX0gYXMgZGF0YS5gLFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnMCA9PT0gJ3VpbnQ2NCcgfHwgYXJnMCA9PT0gJ2ludDY0Jykge1xyXG4gICAgICAgICAgICAgIC8vIHVzZSAnYXMgYW55JyBoZXJlIGJlY2F1c2U6XHJcbiAgICAgICAgICAgICAgLy8gMS4gVHlwZVNjcmlwdCdzIGNoZWNrIG9uIHR5cGUgb2YgJ0FycmF5LmlzQXJyYXkoKScgZG9lcyBub3Qgd29yayB3aXRoIHJlYWRvbmx5IGFycmF5cy5cclxuICAgICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzAwMlxyXG4gICAgICAgICAgICAgIC8vIDIuIFR5cGVTY3JpcHQncyBjaGVjayBvbiB1bmlvbiB0eXBlIG9mICcoQmlnSW50NjRBcnJheUNvbnN0cnVjdG9yfEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IpLmZyb20oKSdcclxuICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBhY2NlcHQgcGFyYW1ldGVyIG1hcEZuLlxyXG4gICAgICAgICAgICAgIC8vIDMuIHBhcmFtZXRlcnMgb2YgJ1N1cHBvcnRlZFR5cGVkQXJyYXlDb25zdHJ1Y3RvcnMuZnJvbSgpJyBkb2VzIG5vdCBtYXRjaCB0aGUgcmVxdWlyZW1lbnQgb2YgdGhlIHVuaW9uXHJcbiAgICAgICAgICAgICAgLy8gdHlwZS5cclxuXHJcbiAgICAgICAgICAgICAgLy8gYXNzdW1lICdhcmcxJyBpcyBvZiB0eXBlIFwicmVhZG9ubHkgbnVtYmVyW118cmVhZG9ubHkgYmlnaW50W11cIiBoZXJlLlxyXG5cclxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxLCBCaWdJbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIGFzc3VtZSAnYXJnMScgaXMgb2YgdHlwZSBcInJlYWRvbmx5IG51bWJlcltdXCIgaGVyZS5cclxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgIGRhdGEgPSAodHlwZWRBcnJheUNvbnN0cnVjdG9yIGFzIGFueSkuZnJvbShhcmcxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgdHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBhcmcxO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcxIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKGFyZzAgPT09ICd1aW50OCcpIHtcclxuICAgICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEEgVWludDhDbGFtcGVkQXJyYXkgdGVuc29yJ3MgZGF0YSBtdXN0IGJlIHR5cGUgb2YgdWludDhgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChhcmcwID09PSAnZmxvYXQxNicgJiYgYXJnMSBpbnN0YW5jZW9mIFVpbnQxNkFycmF5ICYmIHR5cGVkQXJyYXlDb25zdHJ1Y3RvciAhPT0gVWludDE2QXJyYXkpIHtcclxuICAgICAgICAgICAgLy8gd2hlbiBGbG9hdDE2QXJyYXkgaXMgYXZhaWxhYmxlIGFuZCBkYXRhIGlzIG9mIHR5cGUgVWludDE2QXJyYXkuXHJcbiAgICAgICAgICAgIC8vIFdlIGFsbG93IFVpbnQxNkFycmF5IHRvIGJlIHBhc3NlZCBpbiBhcyBkYXRhIGZvciAnZmxvYXQxNicgdGVuc29yIHVudGlsIEZsb2F0MTZBcnJheSBpcyBnZW5lcmFsbHlcclxuICAgICAgICAgICAgLy8gc3VwcG9ydGVkIGluIEphdmFTY3JpcHQgZW52aXJvbm1lbnQuXHJcblxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICBkYXRhID0gbmV3IChnbG9iYWxUaGlzIGFzIGFueSkuRmxvYXQxNkFycmF5KGFyZzEuYnVmZmVyLCBhcmcxLmJ5dGVPZmZzZXQsIGFyZzEubGVuZ3RoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEEgJHt0eXBlfSB0ZW5zb3IncyBkYXRhIG11c3QgYmUgdHlwZSBvZiAke3R5cGVkQXJyYXlDb25zdHJ1Y3Rvcn1gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBPdmVycmlkZTogY29uc3RydWN0b3IoZGF0YSwgLi4uKVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgbWF5YmVEaW1zID0gYXJnMTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcwKSkge1xyXG4gICAgICAgICAgLy8gb25seSBib29sZWFuW10gYW5kIHN0cmluZ1tdIGlzIHN1cHBvcnRlZFxyXG4gICAgICAgICAgaWYgKGFyZzAubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RlbnNvciB0eXBlIGNhbm5vdCBiZSBpbmZlcnJlZCBmcm9tIGFuIGVtcHR5IGFycmF5LicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgZmlyc3RFbGVtZW50VHlwZSA9IHR5cGVvZiBhcmcwWzBdO1xyXG4gICAgICAgICAgaWYgKGZpcnN0RWxlbWVudFR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAnc3RyaW5nJztcclxuICAgICAgICAgICAgZGF0YSA9IGFyZzA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0RWxlbWVudFR5cGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICB0eXBlID0gJ2Jvb2wnO1xyXG4gICAgICAgICAgICAvLyAnYXJnMCcgaXMgb2YgdHlwZSAnYm9vbGVhbltdJy4gVWludDhBcnJheS5mcm9tKGJvb2xlYW5bXSkgYWN0dWFsbHkgd29ya3MsIGJ1dCB0eXBlc2NyaXB0IHRoaW5rcyB0aGlzIGlzXHJcbiAgICAgICAgICAgIC8vIHdyb25nIHR5cGUuIFdlIHVzZSAnYXMgYW55JyB0byBtYWtlIGl0IGhhcHB5LlxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzAgYXMgYW55W10pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBlbGVtZW50IHR5cGUgb2YgZGF0YSBhcnJheTogJHtmaXJzdEVsZW1lbnRUeXBlfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFyZzAgaW5zdGFuY2VvZiBVaW50OENsYW1wZWRBcnJheSkge1xyXG4gICAgICAgICAgdHlwZSA9ICd1aW50OCc7XHJcbiAgICAgICAgICBkYXRhID0gVWludDhBcnJheS5mcm9tKGFyZzApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBnZXQgdGVuc29yIHR5cGUgZnJvbSBUeXBlZEFycmF5XHJcbiAgICAgICAgICBjb25zdCBtYXBwZWRUeXBlID0gTlVNRVJJQ19URU5TT1JfVFlQRURBUlJBWV9UT19UWVBFX01BUC5nZXQoXHJcbiAgICAgICAgICAgIGFyZzAuY29uc3RydWN0b3IgYXMgU3VwcG9ydGVkVHlwZWRBcnJheUNvbnN0cnVjdG9ycyxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAobWFwcGVkVHlwZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVuc3VwcG9ydGVkIHR5cGUgZm9yIHRlbnNvciBkYXRhOiAke2FyZzAuY29uc3RydWN0b3J9LmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdHlwZSA9IG1hcHBlZFR5cGU7XHJcbiAgICAgICAgICBkYXRhID0gYXJnMCBhcyBTdXBwb3J0ZWRUeXBlZEFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdHlwZSBhbmQgZGF0YSBpcyBwcm9jZXNzZWQsIG5vdyBwcm9jZXNzaW5nIGRpbXNcclxuICAgICAgaWYgKG1heWJlRGltcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gYXNzdW1lIDEtRCB0ZW5zb3IgaWYgZGltcyBvbWl0dGVkXHJcbiAgICAgICAgbWF5YmVEaW1zID0gW2RhdGEubGVuZ3RoXTtcclxuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtYXliZURpbXMpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkEgdGVuc29yJ3MgZGltcyBtdXN0IGJlIGEgbnVtYmVyIGFycmF5XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGRpbXMgPSBtYXliZURpbXMgYXMgcmVhZG9ubHkgbnVtYmVyW107XHJcblxyXG4gICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xyXG4gICAgICB0aGlzLmRhdGFMb2NhdGlvbiA9ICdjcHUnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBlcmZvcm0gY2hlY2sgb24gZGltc1xyXG4gICAgY29uc3Qgc2l6ZSA9IGNhbGN1bGF0ZVNpemUoZGltcyk7XHJcbiAgICAvLyBpZiBkYXRhIGlzIG9uIENQVSwgY2hlY2sgd2hldGhlciBkYXRhIGxlbmd0aCBtYXRjaGVzIHRlbnNvciBzaXplXHJcbiAgICBpZiAodGhpcy5jcHVEYXRhICYmIHNpemUgIT09IHRoaXMuY3B1RGF0YS5sZW5ndGgpIHtcclxuICAgICAgaWYgKCh0eXBlID09PSAndWludDQnIHx8IHR5cGUgPT09ICdpbnQ0JykgJiYgTWF0aC5jZWlsKHNpemUgLyAyKSA9PT0gdGhpcy5jcHVEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIGZvciAodSlpbnQ0LCB0aGUgZGF0YSBsZW5ndGggaXMgaGFsZiBvZiB0aGUgdGVuc29yIHNpemUuIFNvIHdlIGNoZWNrIHRoaXMgc3BlY2lhbCBjYXNlIHdoZW4gc2l6ZSBpcyBvZGQuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUZW5zb3IncyBzaXplKCR7c2l6ZX0pIGRvZXMgbm90IG1hdGNoIGRhdGEgbGVuZ3RoKCR7dGhpcy5jcHVEYXRhLmxlbmd0aH0pLmApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuZGltcyA9IGRpbXM7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG4gIH1cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gZmFjdG9yeVxyXG4gIHN0YXRpYyBhc3luYyBmcm9tSW1hZ2UoXHJcbiAgICBpbWFnZTogSW1hZ2VEYXRhIHwgSFRNTEltYWdlRWxlbWVudCB8IEltYWdlQml0bWFwIHwgc3RyaW5nLFxyXG4gICAgb3B0aW9ucz86XHJcbiAgICAgIHwgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcclxuICAgICAgfCBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9uc1xyXG4gICAgICB8IFRlbnNvckZyb21JbWFnZUJpdG1hcE9wdGlvbnNcclxuICAgICAgfCBUZW5zb3JGcm9tVXJsT3B0aW9ucyxcclxuICApOiBQcm9taXNlPFRlbnNvckludGVyZmFjZT4ge1xyXG4gICAgcmV0dXJuIHRlbnNvckZyb21JbWFnZShpbWFnZSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5UZXh0dXJlRGF0YVR5cGVzPihcclxuICAgIHRleHR1cmU6IFRlbnNvclRleHR1cmVUeXBlLFxyXG4gICAgb3B0aW9uczogVGVuc29yRnJvbVRleHR1cmVPcHRpb25zPFQ+LFxyXG4gICk6IFRlbnNvckludGVyZmFjZSB7XHJcbiAgICByZXR1cm4gdGVuc29yRnJvbVRleHR1cmUodGV4dHVyZSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXHJcbiAgICBncHVCdWZmZXI6IFRlbnNvckdwdUJ1ZmZlclR5cGUsXHJcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUPixcclxuICApOiBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gICAgcmV0dXJuIHRlbnNvckZyb21HcHVCdWZmZXIoZ3B1QnVmZmVyLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tTUxUZW5zb3I8VCBleHRlbmRzIFRlbnNvckludGVyZmFjZS5NTFRlbnNvckRhdGFUeXBlcz4oXHJcbiAgICBtbFRlbnNvcjogVGVuc29yTUxUZW5zb3JUeXBlLFxyXG4gICAgb3B0aW9uczogVGVuc29yRnJvbU1MVGVuc29yT3B0aW9uczxUPixcclxuICApOiBUZW5zb3JJbnRlcmZhY2Uge1xyXG4gICAgcmV0dXJuIHRlbnNvckZyb21NTFRlbnNvcihtbFRlbnNvciwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbVBpbm5lZEJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29ySW50ZXJmYWNlLkNwdVBpbm5lZERhdGFUeXBlcz4oXHJcbiAgICB0eXBlOiBULFxyXG4gICAgYnVmZmVyOiBUZW5zb3JJbnRlcmZhY2UuRGF0YVR5cGVNYXBbVF0sXHJcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKTogVGVuc29yIHtcclxuICAgIHJldHVybiB0ZW5zb3JGcm9tUGlubmVkQnVmZmVyKHR5cGUsIGJ1ZmZlciwgZGltcyk7XHJcbiAgfVxyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gY29udmVyc2lvbnNcclxuICB0b0RhdGFVUkwob3B0aW9ucz86IFRlbnNvclRvRGF0YVVybE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRlbnNvclRvRGF0YVVSTCh0aGlzLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHRvSW1hZ2VEYXRhKG9wdGlvbnM/OiBUZW5zb3JUb0ltYWdlRGF0YU9wdGlvbnMpOiBJbWFnZURhdGEge1xyXG4gICAgcmV0dXJuIHRlbnNvclRvSW1hZ2VEYXRhKHRoaXMsIG9wdGlvbnMpO1xyXG4gIH1cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gcHVibGljIGZpZWxkc1xyXG4gIHJlYWRvbmx5IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xyXG4gIHJlYWRvbmx5IHR5cGU6IFRlbnNvclR5cGU7XHJcbiAgcmVhZG9ubHkgc2l6ZTogbnVtYmVyO1xyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBwcml2YXRlIGZpZWxkc1xyXG5cclxuICAvKipcclxuICAgKiBzdG9yZXMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZGF0YUxvY2F0aW9uOiBUZW5zb3JEYXRhTG9jYXRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyB0aGUgZGF0YSBvbiBDUFUsIGlmIGxvY2F0aW9uIGlzICdjcHUnIG9yICdjcHUtcGlubmVkJy4gb3RoZXJ3aXNlIGVtcHR5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3B1RGF0YT86IFRlbnNvckRhdGFUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgdGV4dHVyZSB3aGVuIGxvY2F0aW9uIGlzICd0ZXh0dXJlJy4gb3RoZXJ3aXNlIGVtcHR5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ3B1VGV4dHVyZURhdGE/OiBUZW5zb3JUZXh0dXJlVHlwZTtcclxuXHJcbiAgLyoqXHJcbiAgICogc3RvcmVzIHRoZSB1bmRlcmx5aW5nIEdQVSBidWZmZXIgd2hlbiBsb2NhdGlvbiBpcyAnZ3B1LWJ1ZmZlcicuIG90aGVyd2lzZSBlbXB0eS5cclxuICAgKi9cclxuICBwcml2YXRlIGdwdUJ1ZmZlckRhdGE/OiBUZW5zb3JHcHVCdWZmZXJUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBzdG9yZXMgdGhlIHVuZGVybHlpbmcgV2ViTk4gTUxUZW5zb3Igd2hlbiBsb2NhdGlvbiBpcyAnbWwtdGVuc29yJy4gb3RoZXJ3aXNlIGVtcHR5LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWxUZW5zb3JEYXRhPzogVGVuc29yTUxUZW5zb3JUeXBlO1xyXG5cclxuICAvKipcclxuICAgKiBzdG9yZXMgYW4gb3B0aW9uYWwgZG93bmxvYWRlciBmdW5jdGlvbiB0byBkb3dubG9hZCBkYXRhIGZyb20gR1BVIHRvIENQVS5cclxuICAgKi9cclxuICBwcml2YXRlIGRvd25sb2FkZXI/KCk6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+O1xyXG5cclxuICAvKipcclxuICAgKiBhIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBkYXRhIGlzIGJlaW5nIGRvd25sb2FkZWQgZnJvbSBHUFUgdG8gQ1BVLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgaXNEb3dubG9hZGluZz86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0b3JlcyBhbiBvcHRpb25hbCBkaXNwb3NlciBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB1bmRlcmx5aW5nIGRhdGEuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkaXNwb3Nlcj8oKTogdm9pZDtcclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gcHJvcGVydGllc1xyXG4gIGdldCBkYXRhKCk6IFRlbnNvckRhdGFUeXBlIHtcclxuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcclxuICAgIGlmICghdGhpcy5jcHVEYXRhKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAnVGhlIGRhdGEgaXMgbm90IG9uIENQVS4gVXNlIGBnZXREYXRhKClgIHRvIGRvd25sb2FkIEdQVSBkYXRhIHRvIENQVSwgJyArXHJcbiAgICAgICAgICAnb3IgdXNlIGB0ZXh0dXJlYCBvciBgZ3B1QnVmZmVyYCBwcm9wZXJ0eSB0byBhY2Nlc3MgdGhlIEdQVSBkYXRhIGRpcmVjdGx5LicsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jcHVEYXRhO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxvY2F0aW9uKCk6IFRlbnNvckRhdGFMb2NhdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhTG9jYXRpb247XHJcbiAgfVxyXG5cclxuICBnZXQgdGV4dHVyZSgpOiBUZW5zb3JUZXh0dXJlVHlwZSB7XHJcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XHJcbiAgICBpZiAoIXRoaXMuZ3B1VGV4dHVyZURhdGEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZGF0YSBpcyBub3Qgc3RvcmVkIGFzIGEgV2ViR0wgdGV4dHVyZS4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmdwdVRleHR1cmVEYXRhO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGdwdUJ1ZmZlcigpOiBUZW5zb3JHcHVCdWZmZXJUeXBlIHtcclxuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcclxuICAgIGlmICghdGhpcy5ncHVCdWZmZXJEYXRhKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYkdQVSBidWZmZXIuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ncHVCdWZmZXJEYXRhO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1sVGVuc29yKCk6IFRlbnNvck1MVGVuc29yVHlwZSB7XHJcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XHJcbiAgICBpZiAoIXRoaXMubWxUZW5zb3JEYXRhKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGRhdGEgaXMgbm90IHN0b3JlZCBhcyBhIFdlYk5OIE1MVGVuc29yLicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubWxUZW5zb3JEYXRhO1xyXG4gIH1cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gbWV0aG9kc1xyXG5cclxuICBhc3luYyBnZXREYXRhKHJlbGVhc2VEYXRhPzogYm9vbGVhbik6IFByb21pc2U8VGVuc29yRGF0YVR5cGU+IHtcclxuICAgIHRoaXMuZW5zdXJlVmFsaWQoKTtcclxuICAgIHN3aXRjaCAodGhpcy5kYXRhTG9jYXRpb24pIHtcclxuICAgICAgY2FzZSAnY3B1JzpcclxuICAgICAgY2FzZSAnY3B1LXBpbm5lZCc6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgICAgY2FzZSAndGV4dHVyZSc6XHJcbiAgICAgIGNhc2UgJ2dwdS1idWZmZXInOlxyXG4gICAgICBjYXNlICdtbC10ZW5zb3InOiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRvd25sb2FkZXIpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIG5vdCBjcmVhdGVkIHdpdGggYSBzcGVjaWZpZWQgZGF0YSBkb3dubG9hZGVyLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IHRlbnNvciBpcyBiZWluZyBkb3dubG9hZGVkLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmRvd25sb2FkZXIoKTtcclxuICAgICAgICAgIHRoaXMuZG93bmxvYWRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gJ2NwdSc7XHJcbiAgICAgICAgICB0aGlzLmNwdURhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICAgIGlmIChyZWxlYXNlRGF0YSAmJiB0aGlzLmRpc3Bvc2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZ2V0IGRhdGEgZnJvbSBsb2NhdGlvbjogJHt0aGlzLmRhdGFMb2NhdGlvbn1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc0Rvd25sb2FkaW5nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGN1cnJlbnQgdGVuc29yIGlzIGJlaW5nIGRvd25sb2FkZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGlzcG9zZXIpIHtcclxuICAgICAgdGhpcy5kaXNwb3NlcigpO1xyXG4gICAgICB0aGlzLmRpc3Bvc2VyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jcHVEYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5ncHVUZXh0dXJlRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ3B1QnVmZmVyRGF0YSA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMubWxUZW5zb3JEYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kb3dubG9hZGVyID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5pc0Rvd25sb2FkaW5nID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIHRoaXMuZGF0YUxvY2F0aW9uID0gJ25vbmUnO1xyXG4gIH1cclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHRlbnNvciB1dGlsaXRpZXNcclxuICBwcml2YXRlIGVuc3VyZVZhbGlkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGF0YUxvY2F0aW9uID09PSAnbm9uZScpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdGVuc29yIGlzIGRpc3Bvc2VkLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzaGFwZShkaW1zOiByZWFkb25seSBudW1iZXJbXSk6IFRlbnNvckludGVyZmFjZSB7XHJcbiAgICB0aGlzLmVuc3VyZVZhbGlkKCk7XHJcbiAgICBpZiAodGhpcy5kb3dubG9hZGVyIHx8IHRoaXMuZGlzcG9zZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVzaGFwZSBhIHRlbnNvciB0aGF0IG93bnMgR1BVIHJlc291cmNlLicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlbnNvclJlc2hhcGUodGhpcywgZGltcyk7XHJcbiAgfVxyXG4gIC8vICNlbmRyZWdpb25cclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IFRlbnNvckZhY3RvcnkgfSBmcm9tICcuL3RlbnNvci1mYWN0b3J5LmpzJztcclxuaW1wb3J0IHsgVGVuc29yIGFzIFRlbnNvckltcGwgfSBmcm9tICcuL3RlbnNvci1pbXBsLmpzJztcclxuaW1wb3J0IHsgVHlwZWRUZW5zb3JVdGlscyB9IGZyb20gJy4vdGVuc29yLXV0aWxzLmpzJztcclxuaW1wb3J0IHsgVHJ5R2V0R2xvYmFsVHlwZSB9IGZyb20gJy4vdHlwZS1oZWxwZXIuanMnO1xyXG5cclxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlZGVjbGFyZSAqL1xyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCBhIGJhc2ljIHRlbnNvciB3aXRoIHNwZWNpZmllZCBkaW1lbnNpb25zIGFuZCBkYXRhIHR5cGUuXHJcbiAqL1xyXG5pbnRlcmZhY2UgVHlwZWRUZW5zb3JCYXNlPFQgZXh0ZW5kcyBUZW5zb3IuVHlwZT4ge1xyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGRpbXM6IHJlYWRvbmx5IG51bWJlcltdO1xyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgdHlwZTogVDtcclxuICAvKipcclxuICAgKiBHZXQgdGhlIGJ1ZmZlciBkYXRhIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gQ1BVIChlZy4gaXQncyBpbiB0aGUgZm9ybSBvZiBXZWJHTCB0ZXh0dXJlIG9yIFdlYkdQVSBidWZmZXIpLCB0aHJvdyBlcnJvci5cclxuICAgKi9cclxuICByZWFkb25seSBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF07XHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YS5cclxuICAgKi9cclxuICByZWFkb25seSBsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbjtcclxuICAvKipcclxuICAgKiBHZXQgdGhlIFdlYkdMIHRleHR1cmUgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gR1BVIGFzIFdlYkdMIHRleHR1cmUsIHRocm93IGVycm9yLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcclxuICAvKipcclxuICAgKiBHZXQgdGhlIFdlYkdQVSBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3Qgb24gR1BVIGFzIFdlYkdQVSBidWZmZXIsIHRocm93IGVycm9yLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGdwdUJ1ZmZlcjogVGVuc29yLkdwdUJ1ZmZlclR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgV2ViTk4gTUxUZW5zb3IgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXHJcbiAgICpcclxuICAgKiBJZiB0aGUgZGF0YSBpcyBub3QgaW4gYSBXZWJOTiBNTFRlbnNvciwgdGhyb3cgZXJyb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbWxUZW5zb3I6IFRlbnNvci5NTFRlbnNvclR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgYnVmZmVyIGRhdGEgb2YgdGhlIHRlbnNvci5cclxuICAgKlxyXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmV0dXJucyB0aGUgZGF0YSBpbW1lZGlhdGVseS5cclxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIGRvd25sb2FkcyB0aGUgZGF0YSBhbmQgcmV0dXJucyB0aGUgcHJvbWlzZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSByZWxlYXNlRGF0YSAtIHdoZXRoZXIgcmVsZWFzZSB0aGUgZGF0YSBvbiBHUFUuIElnbm9yZSBpZiBkYXRhIGlzIGFscmVhZHkgb24gQ1BVLlxyXG4gICAqL1xyXG4gIGdldERhdGEocmVsZWFzZURhdGE/OiBib29sZWFuKTogUHJvbWlzZTxUZW5zb3IuRGF0YVR5cGVNYXBbVF0+O1xyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YS5cclxuICAgKlxyXG4gICAqIElmIHRoZSBkYXRhIGlzIG9uIENQVSwgcmVtb3ZlIGl0cyBpbnRlcm5hbCByZWZlcmVuY2UgdG8gdGhlIHVuZGVybHlpbmcgZGF0YS5cclxuICAgKiBJZiB0aGUgZGF0YSBpcyBvbiBHUFUsIHJlbGVhc2UgdGhlIGRhdGEgb24gR1BVLlxyXG4gICAqXHJcbiAgICogQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCB0aGUgdGVuc29yIGlzIGNvbnNpZGVyZWQgbm8gbG9uZ2VyIHZhbGlkLiBJdHMgbG9jYXRpb24gd2lsbCBiZSBzZXQgdG8gJ25vbmUnLlxyXG4gICAqL1xyXG4gIGRpc3Bvc2UoKTogdm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIFRlbnNvciB7XHJcbiAgaW50ZXJmYWNlIERhdGFUeXBlTWFwIHtcclxuICAgIGZsb2F0MzI6IEZsb2F0MzJBcnJheTtcclxuICAgIHVpbnQ4OiBVaW50OEFycmF5O1xyXG4gICAgaW50ODogSW50OEFycmF5O1xyXG4gICAgdWludDE2OiBVaW50MTZBcnJheTtcclxuICAgIGludDE2OiBJbnQxNkFycmF5O1xyXG4gICAgaW50MzI6IEludDMyQXJyYXk7XHJcbiAgICBpbnQ2NDogQmlnSW50NjRBcnJheTtcclxuICAgIHN0cmluZzogc3RyaW5nW107XHJcbiAgICBib29sOiBVaW50OEFycmF5O1xyXG4gICAgZmxvYXQxNjogVWludDE2QXJyYXk7IC8vIEtlZXAgdXNpbmcgVWludDE2QXJyYXkgdW50aWwgd2UgaGF2ZSBhIGNvbmNyZXRlIHNvbHV0aW9uIGZvciBmbG9hdCAxNi5cclxuICAgIGZsb2F0NjQ6IEZsb2F0NjRBcnJheTtcclxuICAgIHVpbnQzMjogVWludDMyQXJyYXk7XHJcbiAgICB1aW50NjQ6IEJpZ1VpbnQ2NEFycmF5O1xyXG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcclxuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xyXG4gICAgLy8gYmZsb2F0MTY6IG5ldmVyO1xyXG4gICAgdWludDQ6IFVpbnQ4QXJyYXk7XHJcbiAgICBpbnQ0OiBJbnQ4QXJyYXk7XHJcbiAgfVxyXG5cclxuICBpbnRlcmZhY2UgRWxlbWVudFR5cGVNYXAge1xyXG4gICAgZmxvYXQzMjogbnVtYmVyO1xyXG4gICAgdWludDg6IG51bWJlcjtcclxuICAgIGludDg6IG51bWJlcjtcclxuICAgIHVpbnQxNjogbnVtYmVyO1xyXG4gICAgaW50MTY6IG51bWJlcjtcclxuICAgIGludDMyOiBudW1iZXI7XHJcbiAgICBpbnQ2NDogYmlnaW50O1xyXG4gICAgc3RyaW5nOiBzdHJpbmc7XHJcbiAgICBib29sOiBib29sZWFuO1xyXG4gICAgZmxvYXQxNjogbnVtYmVyOyAvLyBLZWVwIHVzaW5nIFVpbnQxNkFycmF5IHVudGlsIHdlIGhhdmUgYSBjb25jcmV0ZSBzb2x1dGlvbiBmb3IgZmxvYXQgMTYuXHJcbiAgICBmbG9hdDY0OiBudW1iZXI7XHJcbiAgICB1aW50MzI6IG51bWJlcjtcclxuICAgIHVpbnQ2NDogYmlnaW50O1xyXG4gICAgLy8gY29tcGxleDY0OiBuZXZlcjtcclxuICAgIC8vIGNvbXBsZXgxMjg6IG5ldmVyO1xyXG4gICAgLy8gYmZsb2F0MTY6IG5ldmVyO1xyXG4gICAgdWludDQ6IG51bWJlcjtcclxuICAgIGludDQ6IG51bWJlcjtcclxuICB9XHJcblxyXG4gIHR5cGUgRGF0YVR5cGUgPSBEYXRhVHlwZU1hcFtUeXBlXTtcclxuICB0eXBlIEVsZW1lbnRUeXBlID0gRWxlbWVudFR5cGVNYXBbVHlwZV07XHJcblxyXG4gIC8qKlxyXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIHBpbm5lZCBDUFUgYnVmZmVyXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgQ3B1UGlubmVkRGF0YVR5cGVzID0gRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZyc+O1xyXG5cclxuICAvKipcclxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJHTCB0ZXh0dXJlXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgVGV4dHVyZVR5cGUgPSBXZWJHTFRleHR1cmU7XHJcblxyXG4gIC8qKlxyXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdMIHRleHR1cmVcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBUZXh0dXJlRGF0YVR5cGVzID0gJ2Zsb2F0MzInO1xyXG5cclxuICB0eXBlIEdwdUJ1ZmZlclR5cGVGYWxsYmFjayA9IHsgc2l6ZTogbnVtYmVyOyBtYXBTdGF0ZTogJ3VubWFwcGVkJyB8ICdwZW5kaW5nJyB8ICdtYXBwZWQnIH07XHJcbiAgLyoqXHJcbiAgICogdHlwZSBhbGlhcyBmb3IgV2ViR1BVIGJ1ZmZlclxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIEdwdUJ1ZmZlclR5cGUgPSBUcnlHZXRHbG9iYWxUeXBlPCdHUFVCdWZmZXInLCBHcHVCdWZmZXJUeXBlRmFsbGJhY2s+O1xyXG5cclxuICB0eXBlIE1MVGVuc29yVHlwZUZhbGxiYWNrID0geyBkZXN0cm95KCk6IHZvaWQgfTtcclxuICAvKipcclxuICAgKiB0eXBlIGFsaWFzIGZvciBXZWJOTiBNTFRlbnNvclxyXG4gICAqXHJcbiAgICogVGhlIHNwZWNpZmljYXRpb24gZm9yIFdlYk5OJ3MgTUxUZW5zb3IgaXMgY3VycmVudGx5IGluIGZsdXguXHJcbiAgICovXHJcbiAgZXhwb3J0IHR5cGUgTUxUZW5zb3JUeXBlID0gVHJ5R2V0R2xvYmFsVHlwZTwnTUxUZW5zb3InLCBNTFRlbnNvclR5cGVGYWxsYmFjaz47XHJcblxyXG4gIC8qKlxyXG4gICAqIHN1cHBvcnRlZCBkYXRhIHR5cGVzIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBHcHVCdWZmZXJEYXRhVHlwZXMgPSAnZmxvYXQzMicgfCAnZmxvYXQxNicgfCAnaW50MzInIHwgJ2ludDY0JyB8ICd1aW50MzInIHwgJ3VpbnQ4JyB8ICdib29sJztcclxuXHJcbiAgLyoqXHJcbiAgICogc3VwcG9ydGVkIGRhdGEgdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3JcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBNTFRlbnNvckRhdGFUeXBlcyA9XHJcbiAgICB8ICdmbG9hdDMyJ1xyXG4gICAgfCAnZmxvYXQxNidcclxuICAgIHwgJ2ludDgnXHJcbiAgICB8ICd1aW50OCdcclxuICAgIHwgJ2ludDMyJ1xyXG4gICAgfCAndWludDMyJ1xyXG4gICAgfCAnaW50NjQnXHJcbiAgICB8ICd1aW50NjQnXHJcbiAgICB8ICdib29sJ1xyXG4gICAgfCAndWludDQnXHJcbiAgICB8ICdpbnQ0JztcclxuXHJcbiAgLyoqXHJcbiAgICogcmVwcmVzZW50IHdoZXJlIHRoZSB0ZW5zb3IgZGF0YSBpcyBzdG9yZWRcclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBEYXRhTG9jYXRpb24gPSAnbm9uZScgfCAnY3B1JyB8ICdjcHUtcGlubmVkJyB8ICd0ZXh0dXJlJyB8ICdncHUtYnVmZmVyJyB8ICdtbC10ZW5zb3InO1xyXG5cclxuICAvKipcclxuICAgKiByZXByZXNlbnQgdGhlIGRhdGEgdHlwZSBvZiBhIHRlbnNvclxyXG4gICAqL1xyXG4gIGV4cG9ydCB0eXBlIFR5cGUgPSBrZXlvZiBEYXRhVHlwZU1hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBtdWx0aS1kaW1lbnNpb25hbCBhcnJheXMgdG8gZmVlZCB0byBvciBmZXRjaCBmcm9tIG1vZGVsIGluZmVyZW5jaW5nLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUeXBlZFRlbnNvcjxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFQ+LCBUeXBlZFRlbnNvclV0aWxzPFQ+IHt9XHJcbi8qKlxyXG4gKiBSZXByZXNlbnQgbXVsdGktZGltZW5zaW9uYWwgYXJyYXlzIHRvIGZlZWQgdG8gb3IgZmV0Y2ggZnJvbSBtb2RlbCBpbmZlcmVuY2luZy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yIGV4dGVuZHMgVHlwZWRUZW5zb3JCYXNlPFRlbnNvci5UeXBlPiwgVHlwZWRUZW5zb3JVdGlsczxUZW5zb3IuVHlwZT4ge31cclxuXHJcbi8qKlxyXG4gKiB0eXBlIFRlbnNvckNvbnN0cnVjdG9yIGRlZmluZXMgdGhlIGNvbnN0cnVjdG9ycyBvZiAnVGVuc29yJyB0byBjcmVhdGUgQ1BVIHRlbnNvciBpbnN0YW5jZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckNvbnN0cnVjdG9yIGV4dGVuZHMgVGVuc29yRmFjdG9yeSB7XHJcbiAgLy8gI3JlZ2lvbiBDUFUgdGVuc29yIC0gc3BlY2lmeSBlbGVtZW50IHR5cGVcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgc3RyaW5nIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoXHJcbiAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgIGRhdGE6IFRlbnNvci5EYXRhVHlwZU1hcFsnc3RyaW5nJ10gfCByZWFkb25seSBzdHJpbmdbXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoXHJcbiAgICB0eXBlOiAnYm9vbCcsXHJcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbJ2Jvb2wnXSB8IHJlYWRvbmx5IGJvb2xlYW5bXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApOiBUeXBlZFRlbnNvcjwnYm9vbCc+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDggdGVuc29yIG9iamVjdCBmcm9tIGEgVWludDhDbGFtcGVkQXJyYXksIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIFNwZWNpZnkgdGhlIGVsZW1lbnQgdHlwZS5cclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKHR5cGU6ICd1aW50OCcsIGRhdGE6IFVpbnQ4Q2xhbXBlZEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IDY0LWJpdCBpbnRlZ2VyIHR5cGVkIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gdHlwZSwgZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB0eXBlIC0gU3BlY2lmeSB0aGUgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyA8VCBleHRlbmRzICd1aW50NjQnIHwgJ2ludDY0Jz4oXHJcbiAgICB0eXBlOiBULFxyXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlTWFwW1RdIHwgcmVhZG9ubHkgYmlnaW50W10gfCByZWFkb25seSBudW1iZXJbXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApOiBUeXBlZFRlbnNvcjxUPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IG51bWVyaWMgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IDxUIGV4dGVuZHMgRXhjbHVkZTxUZW5zb3IuVHlwZSwgJ3N0cmluZycgfCAnYm9vbCcgfCAndWludDY0JyB8ICdpbnQ2NCc+PihcclxuICAgIHR5cGU6IFQsXHJcbiAgICBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF0gfCByZWFkb25seSBudW1iZXJbXSxcclxuICAgIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSxcclxuICApOiBUeXBlZFRlbnNvcjxUPjtcclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGluZmVyIGVsZW1lbnQgdHlwZXNcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGZsb2F0MzIgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiBGbG9hdDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdmbG9hdDMyJz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogSW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50OCc+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDggdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiBVaW50OEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDgnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQ4IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogVWludDhDbGFtcGVkQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50OCc+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdWludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogVWludDE2QXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCd1aW50MTYnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IGludDE2IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogSW50MTZBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2ludDE2Jz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IEludDMyQXJyYXksIGRpbXM/OiByZWFkb25seSBudW1iZXJbXSk6IFR5cGVkVGVuc29yPCdpbnQzMic+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiBCaWdJbnQ2NEFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnaW50NjQnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHN0cmluZyB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IHJlYWRvbmx5IHN0cmluZ1tdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnc3RyaW5nJz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyBib29sIHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogcmVhZG9ubHkgYm9vbGVhbltdLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwnYm9vbCc+O1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgZmxvYXQ2NCB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IEZsb2F0NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J2Zsb2F0NjQnPjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHVpbnQzMiB0ZW5zb3Igb2JqZWN0IGZyb20gdGhlIGdpdmVuIGRhdGEgYW5kIGRpbXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZGF0YSAtIFNwZWNpZnkgdGhlIENQVSB0ZW5zb3IgZGF0YS5cclxuICAgKiBAcGFyYW0gZGltcyAtIFNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKi9cclxuICBuZXcgKGRhdGE6IFVpbnQzMkFycmF5LCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUeXBlZFRlbnNvcjwndWludDMyJz47XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIG5ldyB1aW50NjQgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChkYXRhOiBCaWdVaW50NjRBcnJheSwgZGltcz86IHJlYWRvbmx5IG51bWJlcltdKTogVHlwZWRUZW5zb3I8J3VpbnQ2NCc+O1xyXG5cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNyZWdpb24gQ1BVIHRlbnNvciAtIGZhbGwgYmFjayB0byBub24tZ2VuZXJpYyB0ZW5zb3IgdHlwZSBkZWNsYXJhdGlvblxyXG5cclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBuZXcgdGVuc29yIG9iamVjdCBmcm9tIHRoZSBnaXZlbiB0eXBlLCBkYXRhIGFuZCBkaW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHR5cGUgLSBTcGVjaWZ5IHRoZSBlbGVtZW50IHR5cGUuXHJcbiAgICogQHBhcmFtIGRhdGEgLSBTcGVjaWZ5IHRoZSBDUFUgdGVuc29yIGRhdGEuXHJcbiAgICogQHBhcmFtIGRpbXMgLSBTcGVjaWZ5IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYSAxLUQgdGVuc29yIGlzIGFzc3VtZWQuXHJcbiAgICovXHJcbiAgbmV3IChcclxuICAgIHR5cGU6IFRlbnNvci5UeXBlLFxyXG4gICAgZGF0YTogVGVuc29yLkRhdGFUeXBlIHwgcmVhZG9ubHkgbnVtYmVyW10gfCByZWFkb25seSBzdHJpbmdbXSB8IHJlYWRvbmx5IGJpZ2ludFtdIHwgcmVhZG9ubHkgYm9vbGVhbltdLFxyXG4gICAgZGltcz86IHJlYWRvbmx5IG51bWJlcltdLFxyXG4gICk6IFRlbnNvcjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgbmV3IHRlbnNvciBvYmplY3QgZnJvbSB0aGUgZ2l2ZW4gZGF0YSBhbmQgZGltcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkYXRhIC0gU3BlY2lmeSB0aGUgQ1BVIHRlbnNvciBkYXRhLlxyXG4gICAqIEBwYXJhbSBkaW1zIC0gU3BlY2lmeSB0aGUgZGltZW5zaW9uIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGEgMS1EIHRlbnNvciBpcyBhc3N1bWVkLlxyXG4gICAqL1xyXG4gIG5ldyAoZGF0YTogVGVuc29yLkRhdGFUeXBlLCBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3I7XHJcbiAgLy8gI2VuZHJlZ2lvblxyXG59XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjb25zdCBUZW5zb3IgPSBUZW5zb3JJbXBsIGFzIFRlbnNvckNvbnN0cnVjdG9yO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGVudiB9IGZyb20gJy4vZW52LWltcGwuanMnO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBjb25zdCBUUkFDRSA9IChkZXZpY2VUeXBlOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcpID0+IHtcclxuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgY29uc29sZS50aW1lU3RhbXAoYCR7ZGV2aWNlVHlwZX06Ok9SVDo6JHtsYWJlbH1gKTtcclxufTtcclxuXHJcbmNvbnN0IFRSQUNFX0ZVTkMgPSAobXNnOiBzdHJpbmcsIGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3Qgc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjaz8uc3BsaXQoL1xcclxcbnxcXHJ8XFxuL2cpIHx8IFtdO1xyXG4gIGxldCBoYXNUcmFjZUZ1bmMgPSBmYWxzZTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoaGFzVHJhY2VGdW5jICYmICFzdGFja1tpXS5pbmNsdWRlcygnVFJBQ0VfRlVOQycpKSB7XHJcbiAgICAgIGxldCBsYWJlbCA9IGBGVU5DXyR7bXNnfTo6JHtzdGFja1tpXS50cmltKCkuc3BsaXQoJyAnKVsxXX1gO1xyXG4gICAgICBpZiAoZXh0cmFNc2cpIHtcclxuICAgICAgICBsYWJlbCArPSBgOjoke2V4dHJhTXNnfWA7XHJcbiAgICAgIH1cclxuICAgICAgVFJBQ0UoJ0NQVScsIGxhYmVsKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0YWNrW2ldLmluY2x1ZGVzKCdUUkFDRV9GVU5DJykpIHtcclxuICAgICAgaGFzVHJhY2VGdW5jID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRSQUNFX0ZVTkNfQkVHSU4gPSAoZXh0cmFNc2c/OiBzdHJpbmcpID0+IHtcclxuICBpZiAodHlwZW9mIGVudi50cmFjZSA9PT0gJ3VuZGVmaW5lZCcgPyAhZW52Lndhc20udHJhY2UgOiAhZW52LnRyYWNlKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIFRSQUNFX0ZVTkMoJ0JFR0lOJywgZXh0cmFNc2cpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBjb25zdCBUUkFDRV9GVU5DX0VORCA9IChleHRyYU1zZz86IHN0cmluZykgPT4ge1xyXG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgVFJBQ0VfRlVOQygnRU5EJywgZXh0cmFNc2cpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmV4cG9ydCBjb25zdCBUUkFDRV9FVkVOVF9CRUdJTiA9IChleHRyYU1zZz86IHN0cmluZykgPT4ge1xyXG4gIGlmICh0eXBlb2YgZW52LnRyYWNlID09PSAndW5kZWZpbmVkJyA/ICFlbnYud2FzbS50cmFjZSA6ICFlbnYudHJhY2UpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICBjb25zb2xlLnRpbWUoYE9SVDo6JHtleHRyYU1zZ31gKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVFJBQ0VfRVZFTlRfRU5EID0gKGV4dHJhTXNnPzogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBlbnYudHJhY2UgPT09ICd1bmRlZmluZWQnID8gIWVudi53YXNtLnRyYWNlIDogIWVudi50cmFjZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gIGNvbnNvbGUudGltZUVuZChgT1JUOjoke2V4dHJhTXNnfWApO1xyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IHJlc29sdmVCYWNrZW5kQW5kRXhlY3V0aW9uUHJvdmlkZXJzIH0gZnJvbSAnLi9iYWNrZW5kLWltcGwuanMnO1xyXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB9IGZyb20gJy4vYmFja2VuZC5qcyc7XHJcbmltcG9ydCB7IEluZmVyZW5jZVNlc3Npb24gYXMgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZSB9IGZyb20gJy4vaW5mZXJlbmNlLXNlc3Npb24uanMnO1xyXG5pbXBvcnQgeyBPbm54VmFsdWUgfSBmcm9tICcuL29ubngtdmFsdWUuanMnO1xyXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcbmltcG9ydCB7IFRSQUNFX0ZVTkNfQkVHSU4sIFRSQUNFX0ZVTkNfRU5ELCBUUkFDRV9FVkVOVF9CRUdJTiwgVFJBQ0VfRVZFTlRfRU5EIH0gZnJvbSAnLi90cmFjZS5qcyc7XHJcblxyXG50eXBlIFNlc3Npb25PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5TZXNzaW9uT3B0aW9ucztcclxudHlwZSBSdW5PcHRpb25zID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SdW5PcHRpb25zO1xyXG50eXBlIEZlZWRzVHlwZSA9IEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuRmVlZHNUeXBlO1xyXG50eXBlIEZldGNoZXNUeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5GZXRjaGVzVHlwZTtcclxudHlwZSBSZXR1cm5UeXBlID0gSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5SZXR1cm5UeXBlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluZmVyZW5jZVNlc3Npb24gaW1wbGVtZW50cyBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlIHtcclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKGhhbmRsZXI6IEluZmVyZW5jZVNlc3Npb25IYW5kbGVyKSB7XHJcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gIH1cclxuICBydW4oZmVlZHM6IEZlZWRzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xyXG4gIHJ1bihmZWVkczogRmVlZHNUeXBlLCBmZXRjaGVzOiBGZXRjaGVzVHlwZSwgb3B0aW9ucz86IFJ1bk9wdGlvbnMpOiBQcm9taXNlPFJldHVyblR5cGU+O1xyXG4gIGFzeW5jIHJ1bihmZWVkczogRmVlZHNUeXBlLCBhcmcxPzogRmV0Y2hlc1R5cGUgfCBSdW5PcHRpb25zLCBhcmcyPzogUnVuT3B0aW9ucyk6IFByb21pc2U8UmV0dXJuVHlwZT4ge1xyXG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xyXG4gICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XHJcbiAgICBjb25zdCBmZXRjaGVzOiB7IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfCBudWxsIH0gPSB7fTtcclxuICAgIGxldCBvcHRpb25zOiBSdW5PcHRpb25zID0ge307XHJcbiAgICAvLyBjaGVjayBpbnB1dHNcclxuICAgIGlmICh0eXBlb2YgZmVlZHMgIT09ICdvYmplY3QnIHx8IGZlZWRzID09PSBudWxsIHx8IGZlZWRzIGluc3RhbmNlb2YgVGVuc29yIHx8IEFycmF5LmlzQXJyYXkoZmVlZHMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgXCInZmVlZHMnIG11c3QgYmUgYW4gb2JqZWN0IHRoYXQgdXNlIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cIixcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaXNGZXRjaGVzRW1wdHkgPSB0cnVlO1xyXG4gICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG92ZXJyaWRlIGlzIGJlaW5nIHVzZWRcclxuICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKGFyZzEgPT09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmV4cGVjdGVkIGFyZ3VtZW50WzFdOiBjYW5ub3QgYmUgbnVsbC4nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYXJnMSBpbnN0YW5jZW9mIFRlbnNvcikge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgY2Fubm90IGJlIGEgVGVuc29yXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcxKSkge1xyXG4gICAgICAgIGlmIChhcmcxLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidmZXRjaGVzJyBjYW5ub3QgYmUgYW4gZW1wdHkgYXJyYXkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0ZldGNoZXNFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIG91dHB1dCBuYW1lc1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhcmcxKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZmV0Y2hlcycgbXVzdCBiZSBhIHN0cmluZyBhcnJheSBvciBhbiBvYmplY3QuXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMub3V0cHV0TmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYCdmZXRjaGVzJyBjb250YWlucyBpbnZhbGlkIG91dHB1dCBuYW1lOiAke25hbWV9LmApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdvYmplY3QnICYmIGFyZzIgIT09IG51bGwpIHtcclxuICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZGVjaWRlIHdoZXRoZXIgYXJnMSBpcyBmZXRjaGVzIG9yIG9wdGlvbnNcclxuICAgICAgICAvLyBpZiBhbnkgb3V0cHV0IG5hbWUgaXMgcHJlc2VudCBhbmQgaXRzIHZhbHVlIGlzIHZhbGlkIE9ubnhWYWx1ZSwgd2UgY29uc2lkZXIgaXQgZmV0Y2hlc1xyXG4gICAgICAgIGxldCBpc0ZldGNoZXMgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBhcmcxS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFyZzEpO1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XHJcbiAgICAgICAgICBpZiAoYXJnMUtleXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgdiA9IChhcmcxIGFzIEluZmVyZW5jZVNlc3Npb25JbnRlcmZhY2UuTnVsbGFibGVPbm54VmFsdWVNYXBUeXBlKVtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdiBpbnN0YW5jZW9mIFRlbnNvcikge1xyXG4gICAgICAgICAgICAgIGlzRmV0Y2hlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgaXNGZXRjaGVzRW1wdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBmZXRjaGVzW25hbWVdID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzRmV0Y2hlcykge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmcyID09PSAnb2JqZWN0JyAmJiBhcmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBhcmcyO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidvcHRpb25zJyBtdXN0IGJlIGFuIG9iamVjdC5cIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9wdGlvbnMgPSBhcmcxIGFzIFJ1bk9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBhcmd1bWVudFsxXTogbXVzdCBiZSAnZmV0Y2hlcycgb3IgJ29wdGlvbnMnLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBpZiBhbGwgaW5wdXRzIGFyZSBpbiBmZWVkXHJcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgdGhpcy5pbnB1dE5hbWVzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgZmVlZHNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnB1dCAnJHtuYW1lfScgaXMgbWlzc2luZyBpbiAnZmVlZHMnLmApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgbm8gZmV0Y2hlcyBpcyBzcGVjaWZpZWQsIHdlIHVzZSB0aGUgZnVsbCBvdXRwdXQgbmFtZXMgbGlzdFxyXG4gICAgaWYgKGlzRmV0Y2hlc0VtcHR5KSB7XHJcbiAgICAgIGZvciAoY29uc3QgbmFtZSBvZiB0aGlzLm91dHB1dE5hbWVzKSB7XHJcbiAgICAgICAgZmV0Y2hlc1tuYW1lXSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmZWVkcywgZmV0Y2hlcyBhbmQgb3B0aW9ucyBhcmUgcHJlcGFyZWRcclxuXHJcbiAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgdGhpcy5oYW5kbGVyLnJ1bihmZWVkcywgZmV0Y2hlcywgb3B0aW9ucyk7XHJcbiAgICBjb25zdCByZXR1cm5WYWx1ZTogeyBbbmFtZTogc3RyaW5nXTogT25ueFZhbHVlIH0gPSB7fTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdHMpIHtcclxuICAgICAgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdHMsIGtleSkpIHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2tleV07XHJcbiAgICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFRlbnNvcikge1xyXG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IHJlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuVmFsdWVba2V5XSA9IG5ldyBUZW5zb3IocmVzdWx0LnR5cGUsIHJlc3VsdC5kYXRhLCByZXN1bHQuZGltcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBUUkFDRV9FVkVOVF9FTkQoJ0luZmVyZW5jZVNlc3Npb24ucnVuJyk7XHJcbiAgICBUUkFDRV9GVU5DX0VORCgpO1xyXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVsZWFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuZGlzcG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNyZWF0ZShwYXRoOiBzdHJpbmcsIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XHJcbiAgc3RhdGljIGNyZWF0ZShidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlPjtcclxuICBzdGF0aWMgY3JlYXRlKFxyXG4gICAgYnVmZmVyOiBBcnJheUJ1ZmZlckxpa2UsXHJcbiAgICBieXRlT2Zmc2V0OiBudW1iZXIsXHJcbiAgICBieXRlTGVuZ3RoPzogbnVtYmVyLFxyXG4gICAgb3B0aW9ucz86IFNlc3Npb25PcHRpb25zLFxyXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XHJcbiAgc3RhdGljIGNyZWF0ZShidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBTZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT47XHJcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcclxuICAgIGFyZzA6IHN0cmluZyB8IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXksXHJcbiAgICBhcmcxPzogU2Vzc2lvbk9wdGlvbnMgfCBudW1iZXIsXHJcbiAgICBhcmcyPzogbnVtYmVyLFxyXG4gICAgYXJnMz86IFNlc3Npb25PcHRpb25zLFxyXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZT4ge1xyXG4gICAgVFJBQ0VfRlVOQ19CRUdJTigpO1xyXG4gICAgVFJBQ0VfRVZFTlRfQkVHSU4oJ0luZmVyZW5jZVNlc3Npb24uY3JlYXRlJyk7XHJcbiAgICAvLyBlaXRoZXIgbG9hZCBmcm9tIGEgZmlsZSBvciBidWZmZXJcclxuICAgIGxldCBmaWxlUGF0aE9yVWludDhBcnJheTogc3RyaW5nIHwgVWludDhBcnJheTtcclxuICAgIGxldCBvcHRpb25zOiBTZXNzaW9uT3B0aW9ucyA9IHt9O1xyXG5cclxuICAgIGlmICh0eXBlb2YgYXJnMCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgZmlsZVBhdGhPclVpbnQ4QXJyYXkgPSBhcmcwO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZzEgPT09ICdvYmplY3QnICYmIGFyZzEgIT09IG51bGwpIHtcclxuICAgICAgICBvcHRpb25zID0gYXJnMTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChhcmcwIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IGFyZzA7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBhcmcwIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHxcclxuICAgICAgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgYXJnMCBpbnN0YW5jZW9mIFNoYXJlZEFycmF5QnVmZmVyKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IGFyZzA7XHJcbiAgICAgIGxldCBieXRlT2Zmc2V0ID0gMDtcclxuICAgICAgbGV0IGJ5dGVMZW5ndGggPSBhcmcwLmJ5dGVMZW5ndGg7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnMSA9PT0gJ29iamVjdCcgJiYgYXJnMSAhPT0gbnVsbCkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBhcmcxO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmcxID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGJ5dGVPZmZzZXQgPSBhcmcxO1xyXG4gICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoYnl0ZU9mZnNldCkpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiJ2J5dGVPZmZzZXQnIG11c3QgYmUgYW4gaW50ZWdlci5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBieXRlT2Zmc2V0ID49IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVPZmZzZXQnIGlzIG91dCBvZiByYW5nZSBbMCwgJHtidWZmZXIuYnl0ZUxlbmd0aH0pLmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBieXRlTGVuZ3RoID0gYXJnMC5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldDtcclxuICAgICAgICBpZiAodHlwZW9mIGFyZzIgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICBieXRlTGVuZ3RoID0gYXJnMjtcclxuICAgICAgICAgIGlmICghTnVtYmVyLmlzU2FmZUludGVnZXIoYnl0ZUxlbmd0aCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInYnl0ZUxlbmd0aCcgbXVzdCBiZSBhbiBpbnRlZ2VyLlwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChieXRlTGVuZ3RoIDw9IDAgfHwgYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGggPiBidWZmZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgJ2J5dGVMZW5ndGgnIGlzIG91dCBvZiByYW5nZSAoMCwgJHtidWZmZXIuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXR9XS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnMyA9PT0gJ29iamVjdCcgJiYgYXJnMyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gYXJnMztcclxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInb3B0aW9ucycgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFyZzIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ2J5dGVMZW5ndGgnIG11c3QgYmUgYSBudW1iZXIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnMSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ29wdGlvbnMnIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcclxuICAgICAgfVxyXG4gICAgICBmaWxlUGF0aE9yVWludDhBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5leHBlY3RlZCBhcmd1bWVudFswXTogbXVzdCBiZSAncGF0aCcgb3IgJ2J1ZmZlcicuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlc29sdmUgYmFja2VuZCwgdXBkYXRlIHNlc3Npb24gb3B0aW9ucyB3aXRoIHZhbGlkYXRlZCBFUHMsIGFuZCBjcmVhdGUgc2Vzc2lvbiBoYW5kbGVyXHJcbiAgICBjb25zdCBbYmFja2VuZCwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHNdID0gYXdhaXQgcmVzb2x2ZUJhY2tlbmRBbmRFeGVjdXRpb25Qcm92aWRlcnMob3B0aW9ucyk7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gYXdhaXQgYmFja2VuZC5jcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihmaWxlUGF0aE9yVWludDhBcnJheSwgb3B0aW9uc1dpdGhWYWxpZGF0ZWRFUHMpO1xyXG4gICAgVFJBQ0VfRVZFTlRfRU5EKCdJbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZScpO1xyXG4gICAgVFJBQ0VfRlVOQ19FTkQoKTtcclxuICAgIHJldHVybiBuZXcgSW5mZXJlbmNlU2Vzc2lvbihoYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0UHJvZmlsaW5nKCk6IHZvaWQge1xyXG4gICAgdGhpcy5oYW5kbGVyLnN0YXJ0UHJvZmlsaW5nKCk7XHJcbiAgfVxyXG4gIGVuZFByb2ZpbGluZygpOiB2b2lkIHtcclxuICAgIHRoaXMuaGFuZGxlci5lbmRQcm9maWxpbmcoKTtcclxuICB9XHJcblxyXG4gIGdldCBpbnB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIuaW5wdXROYW1lcztcclxuICB9XHJcbiAgZ2V0IG91dHB1dE5hbWVzKCk6IHJlYWRvbmx5IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiB0aGlzLmhhbmRsZXIub3V0cHV0TmFtZXM7XHJcbiAgfVxyXG5cclxuICBnZXQgaW5wdXRNZXRhZGF0YSgpOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uSW50ZXJmYWNlLlZhbHVlTWV0YWRhdGFbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVyLmlucHV0TWV0YWRhdGE7XHJcbiAgfVxyXG5cclxuICBnZXQgb3V0cHV0TWV0YWRhdGEoKTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbkludGVyZmFjZS5WYWx1ZU1ldGFkYXRhW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlci5vdXRwdXRNZXRhZGF0YTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlcjogSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI7XHJcbn1cclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBJbmZlcmVuY2VTZXNzaW9uIGFzIEluZmVyZW5jZVNlc3Npb25JbXBsIH0gZnJvbSAnLi9pbmZlcmVuY2Utc2Vzc2lvbi1pbXBsLmpzJztcclxuaW1wb3J0IHsgT25ueE1vZGVsT3B0aW9ucyB9IGZyb20gJy4vb25ueC1tb2RlbC5qcyc7XHJcbmltcG9ydCB7IE9ubnhWYWx1ZSwgT25ueFZhbHVlRGF0YUxvY2F0aW9uIH0gZnJvbSAnLi9vbm54LXZhbHVlLmpzJztcclxuaW1wb3J0IHR5cGUgeyBUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcbmltcG9ydCB7IFRyeUdldEdsb2JhbFR5cGUgfSBmcm9tICcuL3R5cGUtaGVscGVyLmpzJztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZWRlY2xhcmUgKi9cclxuXHJcbmV4cG9ydCBkZWNsYXJlIG5hbWVzcGFjZSBJbmZlcmVuY2VTZXNzaW9uIHtcclxuICAvLyAjcmVnaW9uIGlucHV0L291dHB1dCB0eXBlc1xyXG5cclxuICB0eXBlIE9ubnhWYWx1ZU1hcFR5cGUgPSB7IHJlYWRvbmx5IFtuYW1lOiBzdHJpbmddOiBPbm54VmFsdWUgfTtcclxuICB0eXBlIE51bGxhYmxlT25ueFZhbHVlTWFwVHlwZSA9IHsgcmVhZG9ubHkgW25hbWU6IHN0cmluZ106IE9ubnhWYWx1ZSB8IG51bGwgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBmZWVkcyAobW9kZWwgaW5wdXRzKSBpcyBhbiBvYmplY3QgdGhhdCB1c2VzIGlucHV0IG5hbWVzIGFzIGtleXMgYW5kIE9ubnhWYWx1ZSBhcyBjb3JyZXNwb25kaW5nIHZhbHVlcy5cclxuICAgKi9cclxuICB0eXBlIEZlZWRzVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZmV0Y2hlcyAobW9kZWwgb3V0cHV0cykgY291bGQgYmUgb25lIG9mIHRoZSBmb2xsb3dpbmc6XHJcbiAgICpcclxuICAgKiAtIE9taXR0ZWQuIFVzZSBtb2RlbCdzIG91dHB1dCBuYW1lcyBkZWZpbml0aW9uLlxyXG4gICAqIC0gQW4gYXJyYXkgb2Ygc3RyaW5nIGluZGljYXRpbmcgdGhlIG91dHB1dCBuYW1lcy5cclxuICAgKiAtIEFuIG9iamVjdCB0aGF0IHVzZSBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIG9yIG51bGwgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcbiAgICpcclxuICAgKiBAcmVtYXJrc1xyXG4gICAqIGRpZmZlcmVudCBmcm9tIGlucHV0IGFyZ3VtZW50LCBpbiBvdXRwdXQsIE9ubnhWYWx1ZSBpcyBvcHRpb25hbC4gSWYgYW4gT25ueFZhbHVlIGlzIHByZXNlbnQgaXQgd2lsbCBiZVxyXG4gICAqIHVzZWQgYXMgYSBwcmUtYWxsb2NhdGVkIHZhbHVlIGJ5IHRoZSBpbmZlcmVuY2UgZW5naW5lOyBpZiBvbWl0dGVkLCBpbmZlcmVuY2UgZW5naW5lIHdpbGwgYWxsb2NhdGUgYnVmZmVyXHJcbiAgICogaW50ZXJuYWxseS5cclxuICAgKi9cclxuICB0eXBlIEZldGNoZXNUeXBlID0gcmVhZG9ubHkgc3RyaW5nW10gfCBOdWxsYWJsZU9ubnhWYWx1ZU1hcFR5cGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgaW5mZXJlbmNpbmcgcmV0dXJuIHR5cGUgaXMgYW4gb2JqZWN0IHRoYXQgdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAqL1xyXG4gIHR5cGUgUmV0dXJuVHlwZSA9IE9ubnhWYWx1ZU1hcFR5cGU7XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBzZXNzaW9uIG9wdGlvbnNcclxuXHJcbiAgLyoqXHJcbiAgICogQSBzZXQgb2YgY29uZmlndXJhdGlvbnMgZm9yIHNlc3Npb24gYmVoYXZpb3IuXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBTZXNzaW9uT3B0aW9ucyBleHRlbmRzIE9ubnhNb2RlbE9wdGlvbnMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBvZiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBBbiBleGVjdXRpb24gcHJvdmlkZXIgb3B0aW9uIGNhbiBiZSBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBuYW1lIG9mIHRoZSBleGVjdXRpb24gcHJvdmlkZXIsXHJcbiAgICAgKiBvciBhbiBvYmplY3Qgb2YgY29ycmVzcG9uZGluZyB0eXBlLlxyXG4gICAgICovXHJcbiAgICBleGVjdXRpb25Qcm92aWRlcnM/OiByZWFkb25seSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGludHJhIE9QIHRocmVhZHMgbnVtYmVyLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpLlxyXG4gICAgICovXHJcbiAgICBpbnRyYU9wTnVtVGhyZWFkcz86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpbnRlciBPUCB0aHJlYWRzIG51bWJlci5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKS5cclxuICAgICAqL1xyXG4gICAgaW50ZXJPcE51bVRocmVhZHM/OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxyXG4gICAgICovXHJcbiAgICBmcmVlRGltZW5zaW9uT3ZlcnJpZGVzPzogeyByZWFkb25seSBbZGltZW5zaW9uTmFtZTogc3RyaW5nXTogbnVtYmVyIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3B0aW1pemF0aW9uIGxldmVsLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbD86ICdkaXNhYmxlZCcgfCAnYmFzaWMnIHwgJ2V4dGVuZGVkJyB8ICdsYXlvdXQnIHwgJ2FsbCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBDUFUgbWVtb3J5IGFyZW5hLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZW5hYmxlQ3B1TWVtQXJlbmE/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBlbmFibGUgbWVtb3J5IHBhdHRlcm4uXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSkgb3IgV2ViQXNzZW1ibHkgYmFja2VuZFxyXG4gICAgICovXHJcbiAgICBlbmFibGVNZW1QYXR0ZXJuPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGlvbiBtb2RlLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgZXhlY3V0aW9uTW9kZT86ICdzZXF1ZW50aWFsJyB8ICdwYXJhbGxlbCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpbWl6ZWQgbW9kZWwgZmlsZSBwYXRoLlxyXG4gICAgICpcclxuICAgICAqIElmIHRoaXMgc2V0dGluZyBpcyBzcGVjaWZpZWQsIHRoZSBvcHRpbWl6ZWQgbW9kZWwgd2lsbCBiZSBkdW1wZWQuIEluIGJyb3dzZXIsIGEgYmxvYiB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIHdpdGggYSBwb3AtdXAgd2luZG93LlxyXG4gICAgICovXHJcbiAgICBvcHRpbWl6ZWRNb2RlbEZpbGVQYXRoPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBlbmFibGUgcHJvZmlsaW5nLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZVByb2ZpbGluZz86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxlIHByZWZpeCBmb3IgcHJvZmlsaW5nLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIGZ1dHVyZSB1c2UuXHJcbiAgICAgKi9cclxuICAgIHByb2ZpbGVGaWxlUHJlZml4Pzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIElELlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgbG9nSWQ/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2cgc2V2ZXJpdHkgbGV2ZWwuIFNlZVxyXG4gICAgICogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9vbm54cnVudGltZS9ibG9iL21haW4vaW5jbHVkZS9vbm54cnVudGltZS9jb3JlL2NvbW1vbi9sb2dnaW5nL3NldmVyaXR5LmhcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXHJcbiAgICAgKi9cclxuICAgIGxvZ1NldmVyaXR5TGV2ZWw/OiAwIHwgMSB8IDIgfCAzIHwgNDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyB2ZXJib3NpdHkgbGV2ZWwuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICovXHJcbiAgICBsb2dWZXJib3NpdHlMZXZlbD86IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgc3RyaW5nIGFzIGEgcHJlZmVycmVkIGRhdGEgbG9jYXRpb24gZm9yIGFsbCBvdXRwdXRzLCBvciBhbiBvYmplY3QgdGhhdCB1c2Ugb3V0cHV0IG5hbWVzIGFzIGtleXMgYW5kIGFcclxuICAgICAqIHByZWZlcnJlZCBkYXRhIGxvY2F0aW9uIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSBXZWIgZm9yIFdlYkdMIGFuZCBXZWJHUFUgRVAuXHJcbiAgICAgKi9cclxuICAgIHByZWZlcnJlZE91dHB1dExvY2F0aW9uPzogT25ueFZhbHVlRGF0YUxvY2F0aW9uIHwgeyByZWFkb25seSBbb3V0cHV0TmFtZTogc3RyaW5nXTogT25ueFZhbHVlRGF0YUxvY2F0aW9uIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIGVuYWJsZSBncmFwaCBjYXB0dXJlLlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIFdlYiBmb3IgV2ViR1BVIEVQLlxyXG4gICAgICovXHJcbiAgICBlbmFibGVHcmFwaENhcHR1cmU/OiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmUgY29uZmlndXJhdGlvbnMgZm9yIGEgc2Vzc2lvbi4gU2VlXHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvc2Vzc2lvbi9cclxuICAgICAqIG9ubnhydW50aW1lX3Nlc3Npb25fb3B0aW9uc19jb25maWdfa2V5cy5oXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIFdlYkFzc2VtYmx5IGJhY2tlbmQuIFdpbGwgc3VwcG9ydCBOb2RlLmpzIGJpbmRpbmcgYW5kIHJlYWN0LW5hdGl2ZSBsYXRlclxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBgYGBqc1xyXG4gICAgICogZXh0cmE6IHtcclxuICAgICAqICAgc2Vzc2lvbjoge1xyXG4gICAgICogICAgIHNldF9kZW5vcm1hbF9hc196ZXJvOiBcIjFcIixcclxuICAgICAqICAgICBkaXNhYmxlX3ByZXBhY2tpbmc6IFwiMVwiXHJcbiAgICAgKiAgIH0sXHJcbiAgICAgKiAgIG9wdGltaXphdGlvbjoge1xyXG4gICAgICogICAgIGVuYWJsZV9nZWx1X2FwcHJveGltYXRpb246IFwiMVwiXHJcbiAgICAgKiAgIH1cclxuICAgICAqIH1cclxuICAgICAqIGBgYFxyXG4gICAgICovXHJcbiAgICBleHRyYT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG4gIH1cclxuXHJcbiAgLy8gI3JlZ2lvbiBleGVjdXRpb24gcHJvdmlkZXJzXHJcblxyXG4gIC8vIEN1cnJlbnRseSwgd2UgaGF2ZSB0aGUgZm9sbG93aW5nIGJhY2tlbmRzIHRvIHN1cHBvcnQgZXhlY3V0aW9uIHByb3ZpZGVyczpcclxuICAvLyBCYWNrZW5kIE5vZGUuanMgYmluZGluZzogc3VwcG9ydHMgJ2NwdScsICdkbWwnICh3aW4zMiksICdjb3JlbWwnIChtYWNPUykgYW5kICdjdWRhJyAobGludXgpLlxyXG4gIC8vIEJhY2tlbmQgV2ViQXNzZW1ibHk6IHN1cHBvcnRzICdjcHUnLCAnd2FzbScsICd3ZWJncHUnIGFuZCAnd2Vibm4nLlxyXG4gIC8vIEJhY2tlbmQgT05OWC5qczogc3VwcG9ydHMgJ3dlYmdsJy5cclxuICAvLyBCYWNrZW5kIFJlYWN0IE5hdGl2ZTogc3VwcG9ydHMgJ2NwdScsICd4bm5wYWNrJywgJ2NvcmVtbCcgKGlPUyksICdubmFwaScgKEFuZHJvaWQpLlxyXG4gIGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbk1hcCB7XHJcbiAgICBjb3JlbWw6IENvcmVNTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgY3B1OiBDcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIGN1ZGE6IEN1ZGFFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIGRtbDogRG1sRXhlY3V0aW9uUHJvdmlkZXJPcHRpb247XHJcbiAgICBubmFwaTogTm5hcGlFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHRlbnNvcnJ0OiBUZW5zb3JSdEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgd2FzbTogV2ViQXNzZW1ibHlFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHdlYmdsOiBXZWJHTEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgd2ViZ3B1OiBXZWJHcHVFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHdlYm5uOiBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgcW5uOiBRbm5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgIHhubnBhY2s6IFhubnBhY2tFeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICB9XHJcblxyXG4gIHR5cGUgRXhlY3V0aW9uUHJvdmlkZXJOYW1lID0ga2V5b2YgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25NYXA7XHJcbiAgdHlwZSBFeGVjdXRpb25Qcm92aWRlckNvbmZpZyA9XHJcbiAgICB8IEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uTWFwW0V4ZWN1dGlvblByb3ZpZGVyTmFtZV1cclxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb25cclxuICAgIHwgRXhlY3V0aW9uUHJvdmlkZXJOYW1lXHJcbiAgICB8IHN0cmluZztcclxuXHJcbiAgZXhwb3J0IGludGVyZmFjZSBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3B1RXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnY3B1JztcclxuICAgIHVzZUFyZW5hPzogYm9vbGVhbjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBDdWRhRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnY3VkYSc7XHJcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBEbWxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICdkbWwnO1xyXG4gICAgZGV2aWNlSWQ/OiBudW1iZXI7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgVGVuc29yUnRFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICd0ZW5zb3JydCc7XHJcbiAgICBkZXZpY2VJZD86IG51bWJlcjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJBc3NlbWJseUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3dhc20nO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdMRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnd2ViZ2wnO1xyXG4gICAgLy8gVE9ETzogYWRkIGZsYWdzXHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgWG5ucGFja0V4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3hubnBhY2snO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3dlYmdwdSc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHRoZSBwcmVmZXJyZWQgbGF5b3V0IHdoZW4gcnVubmluZyBsYXlvdXQgc2Vuc2l0aXZlIG9wZXJhdG9ycy5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdCAnTkNIVydcclxuICAgICAqL1xyXG4gICAgcHJlZmVycmVkTGF5b3V0PzogJ05DSFcnIHwgJ05IV0MnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSBhIGxpc3Qgb2Ygbm9kZSBuYW1lcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBvbiBDUFUgZXZlbiB3aGVuIFdlYkdQVSBFUCBpcyB1c2VkLlxyXG4gICAgICovXHJcbiAgICBmb3JjZUNwdU5vZGVOYW1lcz86IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB0aGUgdmFsaWRhdGlvbiBtb2RlIGZvciBXZWJHUFUgZXhlY3V0aW9uIHByb3ZpZGVyLlxyXG4gICAgICogLSAnZGlzYWJsZWQnOiBEaXNhYmxlIGFsbCB2YWxpZGF0aW9uLlxyXG4gICAgICogV2hlbiB1c2VkIGluIE5vZGUuanMsIGRpc2FibGUgdmFsaWRhdGlvbiBtYXkgY2F1c2UgcHJvY2VzcyBjcmFzaCBpZiBXZWJHUFUgZXJyb3JzIG9jY3VyLiBCZSBjYXV0aW91cyB3aGVuIHVzaW5nXHJcbiAgICAgKiB0aGlzIG1vZGUuXHJcbiAgICAgKiBXaGVuIHVzZWQgaW4gd2ViLCB0aGlzIG1vZGUgaXMgZXF1aXZhbGVudCB0byAnd2dwdU9ubHknLlxyXG4gICAgICogLSAnd2dwdU9ubHknOiBQZXJmb3JtIFdlYkdQVSBpbnRlcm5hbCB2YWxpZGF0aW9uIG9ubHkuXHJcbiAgICAgKiAtICdiYXNpYyc6IFBlcmZvcm0gYmFzaWMgdmFsaWRhdGlvbiBpbmNsdWRpbmcgV2ViR1BVIGludGVybmFsIHZhbGlkYXRpb24uIFRoaXMgaXMgdGhlIGRlZmF1bHQgbW9kZS5cclxuICAgICAqIC0gJ2Z1bGwnOiBQZXJmb3JtIGZ1bGwgdmFsaWRhdGlvbi4gVGhpcyBtb2RlIG1heSBoYXZlIHBlcmZvcm1hbmNlIGltcGFjdC4gVXNlIGl0IGZvciBkZWJ1Z2dpbmcgcHVycG9zZS5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdCAnYmFzaWMnXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRpb25Nb2RlPzogJ2Rpc2FibGVkJyB8ICd3Z3B1T25seScgfCAnYmFzaWMnIHwgJ2Z1bGwnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlIHJvYnVzdCBidWZmZXIgYWNjZXNzIGZvciBhbiBPUlQtY3JlYXRlZCBEYXduIGRldmljZS4gVGhpcyBpcyBhIGdsb2JhbCwgZmlyc3QtZGV2aWNlLXdpbnMgb3B0aW9uLiBMYXRlclxyXG4gICAgICogY29uZmxpY3RpbmcgdmFsdWVzIGFuZCB2YWx1ZXMgc3VwcGxpZWQgd2l0aCBhbiBleHRlcm5hbCBkZXZpY2UgYXJlIGlnbm9yZWQgd2l0aCBhIHdhcm5pbmcuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlggUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nKS5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdCBgdHJ1ZWAgaW4gRGVidWcgYnVpbGRzOyBgZmFsc2VgIGluIFJlbGVhc2UgYW5kIFJlbFdpdGhEZWJJbmZvIGJ1aWxkc1xyXG4gICAgICovXHJcbiAgICBlbmFibGVSb2J1c3RuZXNzPzogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgdGhlIGNhY2hlIG1vZGUgZm9yIHN0b3JhZ2UgYnVmZmVycy5cclxuICAgICAqIC0gJ2Rpc2FibGVkJzogRGlzYWJsZSBidWZmZXIgY2FjaGUuIEJ1ZmZlcnMgYXJlIGRlc3Ryb3llZCB3aGVuIG5vIGxvbmdlciBpbiB1c2UuXHJcbiAgICAgKiAtICdsYXp5UmVsZWFzZSc6IEJ1ZmZlcnMgYXJlIHJlbGVhc2VkIGxhemlseSwgYXQgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBydW4uXHJcbiAgICAgKiAtICdzaW1wbGUnOiBSZWxlYXNlZCBidWZmZXJzIGFyZSBjYWNoZWQgYW5kIHJldXNlZCBvbmx5IGZvciByZXF1ZXN0cyBvZiB0aGUgZXhhY3Qgc2FtZSBzaXplLlxyXG4gICAgICogLSAnYnVja2V0JzogUmVsZWFzZWQgYnVmZmVycyBhcmUgY2FjaGVkIGFuZCByZXVzZWQgdXNpbmcgcHJlZGVmaW5lZCBzaXplIGJ1Y2tldHMuIFRoaXMgaXMgdGhlIGRlZmF1bHQgbW9kZS5cclxuICAgICAqXHJcbiAgICAgKiBGb3Igc3RhdGljLXNoYXBlIG1vZGVscywgJ3NpbXBsZScgbWF5IHJlZHVjZSBHUFUgbWVtb3J5IHVzYWdlLCBiZWNhdXNlIGV4YWN0LXNpemUgYnVmZmVycyBhcmUgcmV1c2VkIGFjcm9zc1xyXG4gICAgICogcnVucyBpbnN0ZWFkIG9mIGFsbG9jYXRpbmcgbmV3IGJ1Y2tldC1zaXplZCBidWZmZXJzLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0ICdidWNrZXQnXHJcbiAgICAgKi9cclxuICAgIHN0b3JhZ2VCdWZmZXJDYWNoZU1vZGU/OiAnZGlzYWJsZWQnIHwgJ2xhenlSZWxlYXNlJyB8ICdzaW1wbGUnIHwgJ2J1Y2tldCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHRoZSBjYWNoZSBtb2RlIGZvciB1bmlmb3JtIGJ1ZmZlcnMuXHJcbiAgICAgKlxyXG4gICAgICogU2VlIHtAbGluayBzdG9yYWdlQnVmZmVyQ2FjaGVNb2RlfSBmb3IgYSBkZXNjcmlwdGlvbiBvZiB0aGUgYXZhaWxhYmxlIG1vZGVzLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0ICdzaW1wbGUnXHJcbiAgICAgKi9cclxuICAgIHVuaWZvcm1CdWZmZXJDYWNoZU1vZGU/OiAnZGlzYWJsZWQnIHwgJ2xhenlSZWxlYXNlJyB8ICdzaW1wbGUnIHwgJ2J1Y2tldCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTcGVjaWZ5IHRoZSBjYWNoZSBtb2RlIGZvciBxdWVyeSByZXNvbHZlIGJ1ZmZlcnMuXHJcbiAgICAgKlxyXG4gICAgICogU2VlIHtAbGluayBzdG9yYWdlQnVmZmVyQ2FjaGVNb2RlfSBmb3IgYSBkZXNjcmlwdGlvbiBvZiB0aGUgYXZhaWxhYmxlIG1vZGVzLlxyXG4gICAgICpcclxuICAgICAqIEBkZWZhdWx0ICdkaXNhYmxlZCdcclxuICAgICAqL1xyXG4gICAgcXVlcnlSZXNvbHZlQnVmZmVyQ2FjaGVNb2RlPzogJ2Rpc2FibGVkJyB8ICdsYXp5UmVsZWFzZScgfCAnc2ltcGxlJyB8ICdidWNrZXQnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB0aGUgY2FjaGUgbW9kZSBmb3IgYnVmZmVycyBub3QgY292ZXJlZCBieSB0aGUgb3RoZXIgYnVmZmVyIGNhY2hlIG1vZGUgb3B0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBTZWUge0BsaW5rIHN0b3JhZ2VCdWZmZXJDYWNoZU1vZGV9IGZvciBhIGRlc2NyaXB0aW9uIG9mIHRoZSBhdmFpbGFibGUgbW9kZXMuXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHQgJ2Rpc2FibGVkJ1xyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QnVmZmVyQ2FjaGVNb2RlPzogJ2Rpc2FibGVkJyB8ICdsYXp5UmVsZWFzZScgfCAnc2ltcGxlJyB8ICdidWNrZXQnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSBhbiBvcHRpb25hbCBXZWJHUFUgZGV2aWNlIHRvIGJlIHVzZWQgYnkgdGhlIFdlYkdQVSBleGVjdXRpb24gcHJvdmlkZXIuXHJcbiAgICAgKi9cclxuICAgIGRldmljZT86IFRyeUdldEdsb2JhbFR5cGU8J0dQVURldmljZSc+O1xyXG4gIH1cclxuXHJcbiAgLy8gI3JlZ2lvbiBXZWJOTiBvcHRpb25zXHJcblxyXG4gIGludGVyZmFjZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICd3ZWJubic7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnRzIGEgc2V0IG9mIG9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgV2ViTk4gTUxDb250ZXh0LlxyXG4gICAqXHJcbiAgICogQHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2Vibm4vI2RpY3RkZWYtbWxjb250ZXh0b3B0aW9uc1xyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5Db250ZXh0T3B0aW9ucyB7XHJcbiAgICBkZXZpY2VUeXBlPzogJ2NwdScgfCAnZ3B1JyB8ICducHUnO1xyXG4gICAgbnVtVGhyZWFkcz86IG51bWJlcjtcclxuICAgIHBvd2VyUHJlZmVyZW5jZT86ICdkZWZhdWx0JyB8ICdsb3ctcG93ZXInIHwgJ2hpZ2gtcGVyZm9ybWFuY2UnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aG91dCBNTENvbnRleHQuXHJcbiAgICovXHJcbiAgZXhwb3J0IGludGVyZmFjZSBXZWJOTk9wdGlvbnNXaXRob3V0TUxDb250ZXh0IGV4dGVuZHMgV2ViTk5FeGVjdXRpb25Qcm92aWRlck5hbWUsIFdlYk5OQ29udGV4dE9wdGlvbnMge1xyXG4gICAgY29udGV4dD86IG5ldmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aCBNTENvbnRleHQuXHJcbiAgICpcclxuICAgKiBXaGVuIE1MQ29udGV4dCBpcyBwcm92aWRlZCwgdGhlIGRldmljZVR5cGUgaXMgYWxzbyByZXF1aXJlZCBzbyB0aGF0IHRoZSBXZWJOTiBFUCBjYW4gZGV0ZXJtaW5lIHRoZSBwcmVmZXJyZWRcclxuICAgKiBjaGFubmVsIGxheW91dC5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dFxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dFxyXG4gICAgZXh0ZW5kc1xyXG4gICAgICBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyTmFtZSxcclxuICAgICAgT21pdDxXZWJOTkNvbnRleHRPcHRpb25zLCAnZGV2aWNlVHlwZSc+LFxyXG4gICAgICBSZXF1aXJlZDxQaWNrPFdlYk5OQ29udGV4dE9wdGlvbnMsICdkZXZpY2VUeXBlJz4+IHtcclxuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyBhIHNldCBvZiBvcHRpb25zIGZvciBXZWJOTiBleGVjdXRpb24gcHJvdmlkZXIgd2l0aCBNTENvbnRleHQgd2hpY2ggaXMgY3JlYXRlZCBmcm9tIEdQVURldmljZS5cclxuICAgKlxyXG4gICAqIEBzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3dlYm5uLyNkb20tbWwtY3JlYXRlY29udGV4dC1ncHVkZXZpY2VcclxuICAgKi9cclxuICBleHBvcnQgaW50ZXJmYWNlIFdlYk5OT3B0aW9uc1dlYkdwdSBleHRlbmRzIFdlYk5ORXhlY3V0aW9uUHJvdmlkZXJOYW1lIHtcclxuICAgIGNvbnRleHQ6IFRyeUdldEdsb2JhbFR5cGU8J01MQ29udGV4dCc+O1xyXG4gICAgZ3B1RGV2aWNlOiBUcnlHZXRHbG9iYWxUeXBlPCdHUFVEZXZpY2UnPjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wdGlvbnMgZm9yIFdlYk5OIGV4ZWN1dGlvbiBwcm92aWRlci5cclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBXZWJOTkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uID1cclxuICAgIHwgV2ViTk5PcHRpb25zV2l0aG91dE1MQ29udGV4dFxyXG4gICAgfCBXZWJOTk9wdGlvbnNXaXRoTUxDb250ZXh0XHJcbiAgICB8IFdlYk5OT3B0aW9uc1dlYkdwdTtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICBleHBvcnQgaW50ZXJmYWNlIFFubkV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIGV4dGVuZHMgRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24ge1xyXG4gICAgcmVhZG9ubHkgbmFtZTogJ3Fubic7XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgdGhlIFFOTiBiYWNrZW5kIHR5cGUuIEUuZy4sICdjcHUnIG9yICdodHAnLlxyXG4gICAgICogTXV0dWFsbHkgZXhjbHVzaXZlIHdpdGggYGJhY2tlbmRQYXRoYC5cclxuICAgICAqXHJcbiAgICAgKiBAZGVmYXVsdCAnaHRwJ1xyXG4gICAgICovXHJcbiAgICBiYWNrZW5kVHlwZT86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSBhIHBhdGggdG8gdGhlIFFOTiBiYWNrZW5kIGxpYnJhcnkuXHJcbiAgICAgKiBNdXR1YWxseSBleGNsdXNpdmUgd2l0aCBgYmFja2VuZFR5cGVgLlxyXG4gICAgICovXHJcbiAgICBiYWNrZW5kUGF0aD86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIGVuYWJsZSBIVFAgRlAxNiBwcmVjaXNpb24uXHJcbiAgICAgKlxyXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICovXHJcbiAgICBlbmFibGVGcDE2UHJlY2lzaW9uPzogYm9vbGVhbjtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBDb3JlTUxFeGVjdXRpb25Qcm92aWRlck9wdGlvbiBleHRlbmRzIEV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uIHtcclxuICAgIHJlYWRvbmx5IG5hbWU6ICdjb3JlbWwnO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYml0IGZsYWdzIGZvciBDb3JlTUwgZXhlY3V0aW9uIHByb3ZpZGVyLlxyXG4gICAgICpcclxuICAgICAqIGBgYFxyXG4gICAgICogQ09SRU1MX0ZMQUdfVVNFX0NQVV9PTkxZID0gMHgwMDFcclxuICAgICAqIENPUkVNTF9GTEFHX0VOQUJMRV9PTl9TVUJHUkFQSCA9IDB4MDAyXHJcbiAgICAgKiBDT1JFTUxfRkxBR19PTkxZX0VOQUJMRV9ERVZJQ0VfV0lUSF9BTkUgPSAweDAwNFxyXG4gICAgICogQ09SRU1MX0ZMQUdfT05MWV9BTExPV19TVEFUSUNfSU5QVVRfU0hBUEVTID0gMHgwMDhcclxuICAgICAqIENPUkVNTF9GTEFHX0NSRUFURV9NTFBST0dSQU0gPSAweDAxMFxyXG4gICAgICogQ09SRU1MX0ZMQUdfVVNFX0NQVV9BTkRfR1BVID0gMHgwMjBcclxuICAgICAqIGBgYFxyXG4gICAgICpcclxuICAgICAqIFNlZSBpbmNsdWRlL29ubnhydW50aW1lL2NvcmUvcHJvdmlkZXJzL2NvcmVtbC9jb3JlbWxfcHJvdmlkZXJfZmFjdG9yeS5oIGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBmbGFnIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChOb2RlLmpzIGJpbmRpbmcpLlxyXG4gICAgICovXHJcbiAgICBjb3JlTWxGbGFncz86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogU3BlY2lmeSB3aGV0aGVyIHRvIHVzZSBDUFUgb25seSBpbiBDb3JlTUwgRVAuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBzZXR0aW5nIGlzIGF2YWlsYWJsZSBvbmx5IGluIE9OTlhSdW50aW1lIChyZWFjdC1uYXRpdmUpLlxyXG4gICAgICovXHJcbiAgICB1c2VDUFVPbmx5PzogYm9vbGVhbjtcclxuICAgIHVzZUNQVUFuZEdQVT86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBlbmFibGUgQ29yZU1MIEVQIG9uIHN1YmdyYXBoLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cclxuICAgICAqL1xyXG4gICAgZW5hYmxlT25TdWJncmFwaD86IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIFNwZWNpZnkgd2hldGhlciB0byBvbmx5IGVuYWJsZSBDb3JlTUwgRVAgZm9yIEFwcGxlIGRldmljZXMgd2l0aCBBTkUgKEFwcGxlIE5ldXJhbCBFbmdpbmUpLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAocmVhY3QtbmF0aXZlKS5cclxuICAgICAqL1xyXG4gICAgb25seUVuYWJsZURldmljZVdpdGhBTkU/OiBib29sZWFuO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIE5uYXBpRXhlY3V0aW9uUHJvdmlkZXJPcHRpb24gZXh0ZW5kcyBFeGVjdXRpb25Qcm92aWRlck9wdGlvbiB7XHJcbiAgICByZWFkb25seSBuYW1lOiAnbm5hcGknO1xyXG4gICAgdXNlRlAxNj86IGJvb2xlYW47XHJcbiAgICB1c2VOQ0hXPzogYm9vbGVhbjtcclxuICAgIGNwdURpc2FibGVkPzogYm9vbGVhbjtcclxuICAgIGNwdU9ubHk/OiBib29sZWFuO1xyXG4gIH1cclxuICAvLyAjZW5kcmVnaW9uXHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiBydW4gb3B0aW9uc1xyXG5cclxuICAvKipcclxuICAgKiBBIHNldCBvZiBjb25maWd1cmF0aW9ucyBmb3IgaW5mZXJlbmNlIHJ1biBiZWhhdmlvclxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgUnVuT3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIExvZyBzZXZlcml0eSBsZXZlbC4gU2VlXHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvY29tbW9uL2xvZ2dpbmcvc2V2ZXJpdHkuaFxyXG4gICAgICpcclxuICAgICAqIFRoaXMgc2V0dGluZyBpcyBhdmFpbGFibGUgb25seSBpbiBPTk5YUnVudGltZSAoTm9kZS5qcyBiaW5kaW5nIGFuZCByZWFjdC1uYXRpdmUpIG9yIFdlYkFzc2VtYmx5IGJhY2tlbmRcclxuICAgICAqL1xyXG4gICAgbG9nU2V2ZXJpdHlMZXZlbD86IDAgfCAxIHwgMiB8IDMgfCA0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIHZlcmJvc2l0eSBsZXZlbC5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXHJcbiAgICAgKi9cclxuICAgIGxvZ1ZlcmJvc2l0eUxldmVsPzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVybWluYXRlIGFsbCBpbmNvbXBsZXRlIE9ydFJ1biBjYWxscyBhcyBzb29uIGFzIHBvc3NpYmxlIGlmIHRydWVcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXHJcbiAgICAgKi9cclxuICAgIHRlcm1pbmF0ZT86IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIHRhZyBmb3IgdGhlIFJ1bigpIGNhbGxzIHVzaW5nIHRoaXNcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gT05OWFJ1bnRpbWUgKE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlKSBvciBXZWJBc3NlbWJseSBiYWNrZW5kXHJcbiAgICAgKi9cclxuICAgIHRhZz86IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBhIHNpbmdsZSBydW4gY29uZmlndXJhdGlvbiBlbnRyeS4gU2VlXHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L29ubnhydW50aW1lL2Jsb2IvbWFpbi9pbmNsdWRlL29ubnhydW50aW1lL2NvcmUvc2Vzc2lvbi9cclxuICAgICAqIG9ubnhydW50aW1lX3J1bl9vcHRpb25zX2NvbmZpZ19rZXlzLmhcclxuICAgICAqXHJcbiAgICAgKiBUaGlzIHNldHRpbmcgaXMgYXZhaWxhYmxlIG9ubHkgaW4gV2ViQXNzZW1ibHkgYmFja2VuZC4gV2lsbCBzdXBwb3J0IE5vZGUuanMgYmluZGluZyBhbmQgcmVhY3QtbmF0aXZlIGxhdGVyXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiBgYGBqc1xyXG4gICAgICogZXh0cmE6IHtcclxuICAgICAqICAgbWVtb3J5OiB7XHJcbiAgICAgKiAgICAgZW5hYmxlX21lbW9yeV9hcmVuYV9zaHJpbmthZ2U6IFwiMVwiLFxyXG4gICAgICogICB9XHJcbiAgICAgKiB9XHJcbiAgICAgKiBgYGBcclxuICAgICAqL1xyXG4gICAgZXh0cmE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuICB9XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxuXHJcbiAgLy8gI3JlZ2lvbiB2YWx1ZSBtZXRhZGF0YVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgY29tbW9uIHBhcnQgb2YgdGhlIHZhbHVlIG1ldGFkYXRhIHR5cGUgZm9yIGJvdGggdGVuc29yIGFuZCBub24tdGVuc29yIHZhbHVlcy5cclxuICAgKi9cclxuICBleHBvcnQgaW50ZXJmYWNlIFZhbHVlTWV0YWRhdGFCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHNwZWNpZmllZCBpbnB1dCBvciBvdXRwdXQuXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgbm9uLXRlbnNvciB2YWx1ZS5cclxuICAgKi9cclxuICBleHBvcnQgaW50ZXJmYWNlIE5vblRlbnNvclZhbHVlTWV0YWRhdGEgZXh0ZW5kcyBWYWx1ZU1ldGFkYXRhQmFzZSB7XHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdmFsdWUgaXMgYSB0ZW5zb3IuXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IGlzVGVuc29yOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcHJlc2VudHMgdGhlIG1ldGFkYXRhIG9mIGEgdGVuc29yIHZhbHVlLlxyXG4gICAqL1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVmFsdWVNZXRhZGF0YSBleHRlbmRzIFZhbHVlTWV0YWRhdGFCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBhIHRlbnNvci5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgaXNUZW5zb3I6IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IHR5cGU6IFRlbnNvci5UeXBlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHNoYXBlIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICAgKlxyXG4gICAgICogSWYgdGhlIHNoYXBlIGlzIG5vdCBkZWZpbmVkLCB0aGUgdmFsdWUgd2lsbCBhbiBlbXB0eSBhcnJheS4gT3RoZXJ3aXNlLCBpdCB3aWxsIGJlIGFuIGFycmF5IHJlcHJlc2VudGluZyB0aGUgc2hhcGVcclxuICAgICAqIG9mIHRoZSB0ZW5zb3IuIEVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgY2FuIGJlIGEgbnVtYmVyIG9yIGEgc3RyaW5nLiBJZiB0aGUgZWxlbWVudCBpcyBhIG51bWJlciwgaXQgcmVwcmVzZW50c1xyXG4gICAgICogdGhlIGNvcnJlc3BvbmRpbmcgZGltZW5zaW9uIHNpemUuIElmIHRoZSBlbGVtZW50IGlzIGEgc3RyaW5nLCBpdCByZXByZXNlbnRzIGEgc3ltYm9saWMgZGltZW5zaW9uLlxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBzaGFwZTogUmVhZG9ubHlBcnJheTxudW1iZXIgfCBzdHJpbmc+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVwcmVzZW50cyB0aGUgbWV0YWRhdGEgb2YgYSB2YWx1ZS5cclxuICAgKi9cclxuICBleHBvcnQgdHlwZSBWYWx1ZU1ldGFkYXRhID0gTm9uVGVuc29yVmFsdWVNZXRhZGF0YSB8IFRlbnNvclZhbHVlTWV0YWRhdGE7XHJcblxyXG4gIC8vICNlbmRyZWdpb25cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudCBhIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgYW4gT05OWCBtb2RlbC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5mZXJlbmNlU2Vzc2lvbiB7XHJcbiAgLy8gI3JlZ2lvbiBydW4oKVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBtb2RlbCBhc3luY2hyb25vdXNseSB3aXRoIHRoZSBnaXZlbiBmZWVkcyBhbmQgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmZWVkcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBpbnB1dC4gU2VlIHR5cGUgZGVzY3JpcHRpb24gb2YgYEluZmVyZW5jZVNlc3Npb24uSW5wdXRUeXBlYCBmb3IgZGV0YWlsLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwuIEEgc2V0IG9mIG9wdGlvbnMgdGhhdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgbW9kZWwgaW5mZXJlbmNlLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbWFwLCB3aGljaCB1c2VzIG91dHB1dCBuYW1lcyBhcyBrZXlzIGFuZCBPbm54VmFsdWUgYXMgY29ycmVzcG9uZGluZyB2YWx1ZXMuXHJcbiAgICovXHJcbiAgcnVuKGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcclxuXHJcbiAgLyoqXHJcbiAgICogRXhlY3V0ZSB0aGUgbW9kZWwgYXN5bmNocm9ub3VzbHkgd2l0aCB0aGUgZ2l2ZW4gZmVlZHMsIGZldGNoZXMgYW5kIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZmVlZHMgLSBSZXByZXNlbnRhdGlvbiBvZiB0aGUgbW9kZWwgaW5wdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLklucHV0VHlwZWAgZm9yIGRldGFpbC5cclxuICAgKiBAcGFyYW0gZmV0Y2hlcyAtIFJlcHJlc2VudGF0aW9uIG9mIHRoZSBtb2RlbCBvdXRwdXQuIFNlZSB0eXBlIGRlc2NyaXB0aW9uIG9mIGBJbmZlcmVuY2VTZXNzaW9uLk91dHB1dFR5cGVgIGZvclxyXG4gICAqIGRldGFpbC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsLiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY29udHJvbHMgdGhlIGJlaGF2aW9yIG9mIG1vZGVsIGluZmVyZW5jZS5cclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIG1hcCwgd2hpY2ggdXNlcyBvdXRwdXQgbmFtZXMgYXMga2V5cyBhbmQgT25ueFZhbHVlIGFzIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxyXG4gICAqL1xyXG4gIHJ1bihcclxuICAgIGZlZWRzOiBJbmZlcmVuY2VTZXNzaW9uLkZlZWRzVHlwZSxcclxuICAgIGZldGNoZXM6IEluZmVyZW5jZVNlc3Npb24uRmV0Y2hlc1R5cGUsXHJcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5SdW5PcHRpb25zLFxyXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbi5SZXR1cm5UeXBlPjtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHJlbGVhc2UoKVxyXG5cclxuICAvKipcclxuICAgKiBSZWxlYXNlIHRoZSBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgdGhlIHVuZGVybHlpbmcgcmVzb3VyY2VzLlxyXG4gICAqL1xyXG4gIHJlbGVhc2UoKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIHByb2ZpbGluZ1xyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBwcm9maWxpbmcuXHJcbiAgICovXHJcbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5kIHByb2ZpbGluZy5cclxuICAgKi9cclxuICBlbmRQcm9maWxpbmcoKTogdm9pZDtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG5cclxuICAvLyAjcmVnaW9uIG1ldGFkYXRhXHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBpbnB1dCBuYW1lcyBvZiB0aGUgbG9hZGVkIG1vZGVsLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgb3V0cHV0IG5hbWVzIG9mIHRoZSBsb2FkZWQgbW9kZWwuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgb3V0cHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgaW5wdXQgbWV0YWRhdGEgb2YgdGhlIGxvYWRlZCBtb2RlbC5cclxuICAgKi9cclxuICByZWFkb25seSBpbnB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG91dHB1dCBtZXRhZGF0YSBvZiB0aGUgbG9hZGVkIG1vZGVsLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG91dHB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEluZmVyZW5jZVNlc3Npb25GYWN0b3J5IHtcclxuICAvLyAjcmVnaW9uIGNyZWF0ZSgpXHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGFuIE9OTlggbW9kZWwgZmlsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB1cmkgLSBUaGUgVVJJIG9yIGZpbGUgcGF0aCBvZiB0aGUgbW9kZWwgdG8gbG9hZC5cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIHNwZWNpZnkgY29uZmlndXJhdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24uXHJcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gSW5mZXJlbmNlU2Vzc2lvbiBvYmplY3QuXHJcbiAgICovXHJcbiAgY3JlYXRlKHVyaTogc3RyaW5nLCBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbj47XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbiBhbmQgbG9hZCBtb2RlbCBhc3luY2hyb25vdXNseSBmcm9tIGFuIGFycmF5IGJ1ZmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEFuIEFycmF5QnVmZmVyIHJlcHJlc2VudGF0aW9uIG9mIGFuIE9OTlggbW9kZWwuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxyXG4gICAqL1xyXG4gIGNyZWF0ZShidWZmZXI6IEFycmF5QnVmZmVyTGlrZSwgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBzZWdtZW50IG9mIGFuIGFycmF5IGJ1ZmVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGJ1ZmZlciAtIEFuIEFycmF5QnVmZmVyIHJlcHJlc2VudGF0aW9uIG9mIGFuIE9OTlggbW9kZWwuXHJcbiAgICogQHBhcmFtIGJ5dGVPZmZzZXQgLSBUaGUgYmVnaW5uaW5nIG9mIHRoZSBzcGVjaWZpZWQgcG9ydGlvbiBvZiB0aGUgYXJyYXkgYnVmZmVyLlxyXG4gICAqIEBwYXJhbSBieXRlTGVuZ3RoIC0gVGhlIGxlbmd0aCBpbiBieXRlcyBvZiB0aGUgYXJyYXkgYnVmZmVyLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gc3BlY2lmeSBjb25maWd1cmF0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBpbmZlcmVuY2Ugc2Vzc2lvbi5cclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBJbmZlcmVuY2VTZXNzaW9uIG9iamVjdC5cclxuICAgKi9cclxuICBjcmVhdGUoXHJcbiAgICBidWZmZXI6IEFycmF5QnVmZmVyTGlrZSxcclxuICAgIGJ5dGVPZmZzZXQ6IG51bWJlcixcclxuICAgIGJ5dGVMZW5ndGg/OiBudW1iZXIsXHJcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcclxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb24+O1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgaW5mZXJlbmNlIHNlc3Npb24gYW5kIGxvYWQgbW9kZWwgYXN5bmNocm9ub3VzbHkgZnJvbSBhIFVpbnQ4QXJyYXkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYnVmZmVyIC0gQSBVaW50OEFycmF5IHJlcHJlc2VudGF0aW9uIG9mIGFuIE9OTlggbW9kZWwuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBzcGVjaWZ5IGNvbmZpZ3VyYXRpb24gZm9yIGNyZWF0aW5nIGEgbmV3IGluZmVyZW5jZSBzZXNzaW9uLlxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIEluZmVyZW5jZVNlc3Npb24gb2JqZWN0LlxyXG4gICAqL1xyXG4gIGNyZWF0ZShidWZmZXI6IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uPjtcclxuXHJcbiAgLy8gI2VuZHJlZ2lvblxyXG59XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbmV4cG9ydCBjb25zdCBJbmZlcmVuY2VTZXNzaW9uOiBJbmZlcmVuY2VTZXNzaW9uRmFjdG9yeSA9IEluZmVyZW5jZVNlc3Npb25JbXBsO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycywgT3B0aW9uc1RlbnNvckxheW91dCB9IGZyb20gJy4vdGVuc29yLWZhY3RvcnkuanMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JUb0RhdGFVcmxPcHRpb25zIGV4dGVuZHMgT3B0aW9uc1RlbnNvckxheW91dCwgT3B0aW9uc0Zvcm1hdCwgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyBleHRlbmRzIE9wdGlvbnNUZW5zb3JMYXlvdXQsIE9wdGlvbnNGb3JtYXQsIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb252ZXJzaW9uVXRpbHMge1xyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZXMgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGVuc29yXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBEYXRhVVJMIGluc3RhbmNlIGZyb20gdGhlIHRlbnNvci5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgZm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogQHJldHVybnMgYSBEYXRhVVJMIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGltYWdlIGNvbnZlcnRlZCBmcm9tIHRlbnNvciBkYXRhXHJcbiAgICovXHJcbiAgdG9EYXRhVVJMKG9wdGlvbnM/OiBUZW5zb3JUb0RhdGFVcmxPcHRpb25zKTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGVzIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRlbnNvclxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIGFuIEltYWdlRGF0YSBpbnN0YW5jZSBmcm9tIHRoZSB0ZW5zb3IuXHJcbiAgICpcclxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxyXG4gICAqIC0gYGZvcm1hdGA6IGAnUkdCJ2BcclxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxyXG4gICAqIEByZXR1cm5zIGFuIEltYWdlRGF0YSBpbnN0YW5jZSByZXByZXNlbnRpbmcgdGhlIGltYWdlIGNvbnZlcnRlZCBmcm9tIHRlbnNvciBkYXRhXHJcbiAgICovXHJcbiAgdG9JbWFnZURhdGEob3B0aW9ucz86IFRlbnNvclRvSW1hZ2VEYXRhT3B0aW9ucyk6IEltYWdlRGF0YTtcclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IFRlbnNvciwgVHlwZWRUZW5zb3IgfSBmcm9tICcuL3RlbnNvci5qcyc7XHJcblxyXG5leHBvcnQgdHlwZSBJbWFnZUZvcm1hdCA9ICdSR0InIHwgJ1JHQkEnIHwgJ0JHUicgfCAnUkJHJztcclxuZXhwb3J0IHR5cGUgSW1hZ2VUZW5zb3JMYXlvdXQgPSAnTkhXQycgfCAnTkNIVyc7XHJcblxyXG4vLyB0aGUgZm9sbG93aW5nIHJlZ2lvbiBjb250YWlucyB0eXBlIGRlZmluaXRpb25zIGZvciBjb25zdHJ1Y3RpbmcgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvbi5cclxuXHJcbi8vICNyZWdpb24gdHlwZXMgZm9yIGNvbnN0cnVjdGluZyBhIHRlbnNvciBmcm9tIGEgc3BlY2lmaWMgbG9jYXRpb25cclxuXHJcbi8qKlxyXG4gKiByZXByZXNlbnQgY29tbW9uIHByb3BlcnRpZXMgb2YgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBzcGVjaWZpYyBsb2NhdGlvbi5cclxuICovXHJcbmludGVyZmFjZSBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4gZXh0ZW5kcyBQaWNrPFRlbnNvciwgJ2RpbXMnPiB7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgdHlwZTogVDtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIEdQVSByZXNvdXJjZS5cclxuICovXHJcbmludGVyZmFjZSBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLlR5cGU+IHtcclxuICAvKipcclxuICAgKiBhbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0byBkb3dubG9hZCBkYXRhIGZyb20gR1BVIHRvIENQVS5cclxuICAgKlxyXG4gICAqIElmIG5vdCBwcm92aWRlZCwgdGhlIHRlbnNvciB0cmVhdCB0aGUgR1BVIGRhdGEgYXMgZXh0ZXJuYWwgcmVzb3VyY2UuXHJcbiAgICovXHJcbiAgZG93bmxvYWQ/KCk6IFByb21pc2U8VGVuc29yLkRhdGFUeXBlTWFwW1RdPjtcclxuXHJcbiAgLyoqXHJcbiAgICogYW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSB0ZW5zb3IgaXMgZGlzcG9zZWQuXHJcbiAgICpcclxuICAgKiBJZiBub3QgcHJvdmlkZWQsIHRoZSB0ZW5zb3IgdHJlYXQgdGhlIEdQVSBkYXRhIGFzIGV4dGVybmFsIHJlc291cmNlLlxyXG4gICAqL1xyXG4gIGRpc3Bvc2U/KCk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBwaW5uZWQgQ1BVIGJ1ZmZlclxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDcHVQaW5uZWRDb25zdHJ1Y3RvclBhcmFtZXRlcnM8XHJcbiAgVCBleHRlbmRzIFRlbnNvci5DcHVQaW5uZWREYXRhVHlwZXMgPSBUZW5zb3IuQ3B1UGlubmVkRGF0YVR5cGVzLFxyXG4+IGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAnY3B1LXBpbm5lZCcuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbG9jYXRpb246ICdjcHUtcGlubmVkJztcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBDUFUgcGlubmVkIGJ1ZmZlciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cclxuICAgKi9cclxuICByZWFkb25seSBkYXRhOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiByZXByZXNlbnQgdGhlIHBhcmFtZXRlciBmb3IgY29uc3RydWN0aW5nIGEgdGVuc29yIGZyb20gYSBXZWJHTCB0ZXh0dXJlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRleHR1cmVDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzID0gVGVuc29yLlRleHR1cmVEYXRhVHlwZXM+XHJcbiAgZXh0ZW5kcyBDb21tb25Db25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4sIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBsb2NhdGlvbiBvZiB0aGUgZGF0YSB0byBiZSAndGV4dHVyZScuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbG9jYXRpb246ICd0ZXh0dXJlJztcclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBXZWJHTCB0ZXh0dXJlIHRoYXQgaG9sZHMgdGhlIHRlbnNvciBkYXRhLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHJlcHJlc2VudCB0aGUgcGFyYW1ldGVyIGZvciBjb25zdHJ1Y3RpbmcgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3B1QnVmZmVyQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQgZXh0ZW5kcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0gVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cclxuICBleHRlbmRzIENvbW1vbkNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiwgR3B1UmVzb3VyY2VDb25zdHJ1Y3RvclBhcmFtZXRlcnM8VD4ge1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIHRvIGJlICdncHUtYnVmZmVyJy5cclxuICAgKi9cclxuICByZWFkb25seSBsb2NhdGlvbjogJ2dwdS1idWZmZXInO1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgdGhlIFdlYkdQVSBidWZmZXIgdGhhdCBob2xkcyB0aGUgdGVuc29yIGRhdGEuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZ3B1QnVmZmVyOiBUZW5zb3IuR3B1QnVmZmVyVHlwZTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNTFRlbnNvckNvbnN0cnVjdG9yUGFyYW1ldGVyczxUIGV4dGVuZHMgVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzID0gVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzPlxyXG4gIGV4dGVuZHMgQ29tbW9uQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+LCBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgbG9jYXRpb24gb2YgdGhlIGRhdGEgdG8gYmUgJ21sLXRlbnNvcicuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgbG9jYXRpb246ICdtbC10ZW5zb3InO1xyXG5cclxuICAvKipcclxuICAgKiBTcGVjaWZ5IHRoZSBXZWJOTiBNTFRlbnNvciB0aGF0IGhvbGRzIHRoZSB0ZW5zb3IgZGF0YS5cclxuICAgKi9cclxuICByZWFkb25seSBtbFRlbnNvcjogVGVuc29yLk1MVGVuc29yVHlwZTtcclxufVxyXG5cclxuLy8gI2VuZHJlZ2lvblxyXG5cclxuLy8gdGhlIGZvbGxvd2luZyByZWdpb24gY29udGFpbnMgdHlwZSBkZWZpbml0aW9ucyBvZiBlYWNoIGluZGl2aWR1YWwgb3B0aW9ucy5cclxuLy8gdGhlIHRlbnNvciBmYWN0b3J5IGZ1bmN0aW9ucyB1c2UgYSBjb21wb3NpdGlvbiBvZiB0aG9zZSBvcHRpb25zIGFzIHRoZSBwYXJhbWV0ZXIgdHlwZS5cclxuXHJcbi8vICNyZWdpb24gT3B0aW9ucyBmaWVsZHNcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uc0Zvcm1hdCB7XHJcbiAgLyoqXHJcbiAgICogRGVzY3JpYmVzIHRoZSBpbWFnZSBmb3JtYXQgcmVwcmVzZW50ZWQgaW4gUkdCQSBjb2xvciBzcGFjZS5cclxuICAgKi9cclxuICBmb3JtYXQ/OiBJbWFnZUZvcm1hdDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yRm9ybWF0IHtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGZvcm1hdCBvZiB0aGUgdGVuc29yLlxyXG4gICAqXHJcbiAgICogTk9URTogdGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBvcHRpb24gJ2Zvcm1hdCcuIFdoaWxlIG9wdGlvbiAnZm9ybWF0JyByZXByZXNlbnRzIHRoZSBvcmlnaW5hbCBpbWFnZSwgJ3RlbnNvckZvcm1hdCdcclxuICAgKiByZXByZXNlbnRzIHRoZSB0YXJnZXQgZm9ybWF0IG9mIHRoZSB0ZW5zb3IuIEEgdHJhbnNwb3NlIHdpbGwgYmUgcGVyZm9ybWVkIGlmIHRoZXkgYXJlIGRpZmZlcmVudC5cclxuICAgKi9cclxuICB0ZW5zb3JGb3JtYXQ/OiBJbWFnZUZvcm1hdDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zVGVuc29yRGF0YVR5cGUge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuXHJcbiAgICovXHJcbiAgZGF0YVR5cGU/OiAnZmxvYXQzMicgfCAndWludDgnO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNUZW5zb3JMYXlvdXQge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgdGVuc29yIGxheW91dCB3aGVuIHJlcHJlc2VudGluZyBkYXRhIG9mIG9uZSBvciBtb3JlIGltYWdlKHMpLlxyXG4gICAqL1xyXG4gIHRlbnNvckxheW91dD86IEltYWdlVGVuc29yTGF5b3V0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnNEaW1lbnNpb25zIHtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIGhlaWdodCBpbiBwaXhlbFxyXG4gICAqL1xyXG4gIGhlaWdodD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGltYWdlIHdpZHRoIGluIHBpeGVsXHJcbiAgICovXHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyB0aGUgcmVzaXplZCBoZWlnaHQuIElmIG9taXR0ZWQsIG9yaWdpbmFsIGhlaWdodCB3aWxsIGJlIHVzZWQuXHJcbiAgICovXHJcbiAgcmVzaXplZEhlaWdodD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgcmVzaXplZCB3aWR0aCAtIGNhbiBiZSBhY2Nlc3NlZCB2aWEgdGVuc29yIGRpbWVuc2lvbnMgYXMgd2VsbFxyXG4gICAqL1xyXG4gIHJlc2l6ZWRXaWR0aD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zTm9ybWFsaXphdGlvblBhcmFtZXRlcnMge1xyXG4gIC8qKlxyXG4gICAqIERlc2NyaWJlcyBub3JtYWxpemF0aW9uIHBhcmFtZXRlcnMgd2hlbiBwcmVwcm9jZXNzaW5nIHRoZSBpbWFnZSBhcyBtb2RlbCBpbnB1dC5cclxuICAgKlxyXG4gICAqIERhdGEgZWxlbWVudCBhcmUgcmFuZ2VkIGZyb20gMCB0byAyNTUuXHJcbiAgICovXHJcbiAgbm9ybT86IHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlICdiaWFzJyB2YWx1ZSBmb3IgaW1hZ2Ugbm9ybWFsaXphdGlvbi5cclxuICAgICAqIC0gSWYgb21pdHRlZCwgdXNlIGRlZmF1bHQgdmFsdWUgMC5cclxuICAgICAqIC0gSWYgaXQncyBhIHNpbmdsZSBudW1iZXIsIGFwcGx5IHRvIGVhY2ggY2hhbm5lbFxyXG4gICAgICogLSBJZiBpdCdzIGFuIGFycmF5IG9mIDMgb3IgNCBudW1iZXJzLCBhcHBseSBlbGVtZW50LXdpc2UuIE51bWJlciBvZiBlbGVtZW50cyBuZWVkIHRvIG1hdGNoIHRoZSBudW1iZXIgb2YgY2hhbm5lbHNcclxuICAgICAqIGZvciB0aGUgY29ycmVzcG9uZGluZyBpbWFnZSBmb3JtYXRcclxuICAgICAqL1xyXG4gICAgYmlhcz86IG51bWJlciB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgJ21lYW4nIHZhbHVlIGZvciBpbWFnZSBub3JtYWxpemF0aW9uLlxyXG4gICAgICogLSBJZiBvbWl0dGVkLCB1c2UgZGVmYXVsdCB2YWx1ZSAyNTUuXHJcbiAgICAgKiAtIElmIGl0J3MgYSBzaW5nbGUgbnVtYmVyLCBhcHBseSB0byBlYWNoIGNoYW5uZWxcclxuICAgICAqIC0gSWYgaXQncyBhbiBhcnJheSBvZiAzIG9yIDQgbnVtYmVycywgYXBwbHkgZWxlbWVudC13aXNlLiBOdW1iZXIgb2YgZWxlbWVudHMgbmVlZCB0byBtYXRjaCB0aGUgbnVtYmVyIG9mIGNoYW5uZWxzXHJcbiAgICAgKiBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgaW1hZ2UgZm9ybWF0XHJcbiAgICAgKi9cclxuICAgIG1lYW4/OiBudW1iZXIgfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuICB9O1xyXG59XHJcblxyXG4vLyAjZW5kcmVnaW9uXHJcblxyXG4vLyAjcmVnaW9uIE9wdGlvbnMgY29tcG9zaXRpb25cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbUltYWdlRGF0YU9wdGlvbnNcclxuICBleHRlbmRzXHJcbiAgICBPcHRpb25SZXNpemVkRGltZW5zaW9ucyxcclxuICAgIE9wdGlvbnNUZW5zb3JGb3JtYXQsXHJcbiAgICBPcHRpb25zVGVuc29yTGF5b3V0LFxyXG4gICAgT3B0aW9uc1RlbnNvckRhdGFUeXBlLFxyXG4gICAgT3B0aW9uc05vcm1hbGl6YXRpb25QYXJhbWV0ZXJzIHt9XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFRlbnNvckZyb21JbWFnZUVsZW1lbnRPcHRpb25zXHJcbiAgZXh0ZW5kc1xyXG4gICAgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXHJcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxyXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcclxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVXJsT3B0aW9uc1xyXG4gIGV4dGVuZHNcclxuICAgIE9wdGlvbnNEaW1lbnNpb25zLFxyXG4gICAgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXHJcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxyXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcclxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tSW1hZ2VCaXRtYXBPcHRpb25zXHJcbiAgZXh0ZW5kc1xyXG4gICAgT3B0aW9uUmVzaXplZERpbWVuc2lvbnMsXHJcbiAgICBPcHRpb25zVGVuc29yRm9ybWF0LFxyXG4gICAgT3B0aW9uc1RlbnNvckxheW91dCxcclxuICAgIE9wdGlvbnNUZW5zb3JEYXRhVHlwZSxcclxuICAgIE9wdGlvbnNOb3JtYWxpemF0aW9uUGFyYW1ldGVycyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tVGV4dHVyZU9wdGlvbnM8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzPlxyXG4gIGV4dGVuZHMgUmVxdWlyZWQ8T3B0aW9uc0RpbWVuc2lvbnM+LCBPcHRpb25zRm9ybWF0LCBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiAvKiBUT0RPOiBhZGQgbW9yZSAqLyB7fVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGcm9tR3B1QnVmZmVyT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz5cclxuICBleHRlbmRzIFBpY2s8VGVuc29yLCAnZGltcyc+LCBHcHVSZXNvdXJjZUNvbnN0cnVjdG9yUGFyYW1ldGVyczxUPiB7XHJcbiAgLyoqXHJcbiAgICogRGVzY3JpYmVzIHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci5cclxuICAgKi9cclxuICBkYXRhVHlwZT86IFQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yRnJvbU1MVGVuc29yT3B0aW9uczxUIGV4dGVuZHMgVGVuc29yLk1MVGVuc29yRGF0YVR5cGVzPlxyXG4gIGV4dGVuZHMgUGljazxUZW5zb3IsICdkaW1zJz4sIEdwdVJlc291cmNlQ29uc3RydWN0b3JQYXJhbWV0ZXJzPFQ+IHtcclxuICAvKipcclxuICAgKiBEZXNjcmliZXMgdGhlIGRhdGEgdHlwZSBvZiB0aGUgdGVuc29yLlxyXG4gICAqL1xyXG4gIGRhdGFUeXBlPzogVDtcclxufVxyXG5cclxuLy8gI2VuZHJlZ2lvblxyXG5cclxuLyoqXHJcbiAqIHR5cGUgVGVuc29yRmFjdG9yeSBkZWZpbmVzIHRoZSBmYWN0b3J5IGZ1bmN0aW9ucyBvZiAnVGVuc29yJyB0byBjcmVhdGUgdGVuc29yIGluc3RhbmNlcyBmcm9tIGV4aXN0aW5nIGRhdGEgb3JcclxuICogcmVzb3VyY2VzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUZW5zb3JGYWN0b3J5IHtcclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhbiBJbWFnZURhdGEgb2JqZWN0XHJcbiAgICpcclxuICAgKiBAcGFyYW0gaW1hZ2VEYXRhIC0gdGhlIEltYWdlRGF0YSBvYmplY3QgdG8gY3JlYXRlIHRlbnNvciBmcm9tXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIEltYWdlRGF0YS5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21JbWFnZShcclxuICAgIGltYWdlRGF0YTogSW1hZ2VEYXRhLFxyXG4gICAgb3B0aW9ucz86IFRlbnNvckZyb21JbWFnZURhdGFPcHRpb25zLFxyXG4gICk6IFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcclxuXHJcbiAgLyoqXHJcbiAgICogY3JlYXRlIGEgdGVuc29yIGZyb20gYSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGltYWdlRWxlbWVudCAtIHRoZSBIVE1MSW1hZ2VFbGVtZW50IG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gSFRNTEltYWdlRWxlbWVudC5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21JbWFnZShcclxuICAgIGltYWdlRWxlbWVudDogSFRNTEltYWdlRWxlbWVudCxcclxuICAgIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyxcclxuICApOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIFVSTFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHVybFNvdXJjZSAtIGEgc3RyaW5nIGFzIGEgVVJMIHRvIHRoZSBpbWFnZSBvciBhIGRhdGEgVVJMIGNvbnRhaW5pbmcgdGhlIGltYWdlIGRhdGEuXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvcHRpb25hbCBvYmplY3QgcmVwcmVzZW50aW5nIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRlbnNvciBmcm9tIFVSTC5cclxuICAgKlxyXG4gICAqIFRoZSBmb2xsb3dpbmcgZGVmYXVsdCBzZXR0aW5ncyB3aWxsIGJlIGFwcGxpZWQ6XHJcbiAgICogLSBgdGVuc29yRm9ybWF0YDogYCdSR0InYFxyXG4gICAqIC0gYHRlbnNvckxheW91dGA6IGAnTkNIVydgXHJcbiAgICogLSBgZGF0YVR5cGVgOiBgJ2Zsb2F0MzInYFxyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21JbWFnZSh1cmxTb3VyY2U6IHN0cmluZywgb3B0aW9ucz86IFRlbnNvckZyb21VcmxPcHRpb25zKTogUHJvbWlzZTxUeXBlZFRlbnNvcjwnZmxvYXQzMic+IHwgVHlwZWRUZW5zb3I8J3VpbnQ4Jz4+O1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhbiBJbWFnZUJpdG1hcCBvYmplY3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSBiaXRtYXAgLSB0aGUgSW1hZ2VCaXRtYXAgb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBVUkwuXHJcbiAgICpcclxuICAgKiBUaGUgZm9sbG93aW5nIGRlZmF1bHQgc2V0dGluZ3Mgd2lsbCBiZSBhcHBsaWVkOlxyXG4gICAqIC0gYHRlbnNvckZvcm1hdGA6IGAnUkdCJ2BcclxuICAgKiAtIGB0ZW5zb3JMYXlvdXRgOiBgJ05DSFcnYFxyXG4gICAqIC0gYGRhdGFUeXBlYDogYCdmbG9hdDMyJ2BcclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHRlbnNvciBvYmplY3RcclxuICAgKi9cclxuICBmcm9tSW1hZ2UoXHJcbiAgICBiaXRtYXA6IEltYWdlQml0bWFwLFxyXG4gICAgb3B0aW9uczogVGVuc29yRnJvbUltYWdlQml0bWFwT3B0aW9ucyxcclxuICApOiBQcm9taXNlPFR5cGVkVGVuc29yPCdmbG9hdDMyJz4gfCBUeXBlZFRlbnNvcjwndWludDgnPj47XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgV2ViR0wgdGV4dHVyZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHRleHR1cmUgLSB0aGUgV2ViR0xUZXh0dXJlIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gV2ViR0wgdGV4dHVyZS5cclxuICAgKlxyXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICogLSBgd2lkdGhgOiB0aGUgd2lkdGggb2YgdGhlIHRleHR1cmUuIFJlcXVpcmVkLlxyXG4gICAqIC0gYGhlaWdodGA6IHRoZSBoZWlnaHQgb2YgdGhlIHRleHR1cmUuIFJlcXVpcmVkLlxyXG4gICAqIC0gYGZvcm1hdGA6IHRoZSBmb3JtYXQgb2YgdGhlIHRleHR1cmUuIElmIG9taXR0ZWQsIGFzc3VtZSAnUkdCQScuXHJcbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGFcclxuICAgKiB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3RcclxuICAgKiBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cclxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gR1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGEgd2lsbCBub3QgYmUgZGlzcG9zZWQuXHJcbiAgICogVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XHJcbiAgICovXHJcbiAgZnJvbVRleHR1cmU8VCBleHRlbmRzIFRlbnNvci5UZXh0dXJlRGF0YVR5cGVzID0gJ2Zsb2F0MzInPihcclxuICAgIHRleHR1cmU6IFRlbnNvci5UZXh0dXJlVHlwZSxcclxuICAgIG9wdGlvbnM6IFRlbnNvckZyb21UZXh0dXJlT3B0aW9uczxUPixcclxuICApOiBUeXBlZFRlbnNvcjwnZmxvYXQzMic+O1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIFdlYkdQVSBidWZmZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBidWZmZXIgLSB0aGUgR1BVQnVmZmVyIG9iamVjdCB0byBjcmVhdGUgdGVuc29yIGZyb21cclxuICAgKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9wdGlvbmFsIG9iamVjdCByZXByZXNlbnRpbmcgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGVuc29yIGZyb20gV2ViR1BVIGJ1ZmZlci5cclxuICAgKlxyXG4gICAqIFRoZSBvcHRpb25zIGluY2x1ZGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAgICogLSBgZGF0YVR5cGVgOiB0aGUgZGF0YSB0eXBlIG9mIHRoZSB0ZW5zb3IuIElmIG9taXR0ZWQsIGFzc3VtZSAnZmxvYXQzMicuXHJcbiAgICogLSBgZGltc2A6IHRoZSBkaW1lbnNpb24gb2YgdGhlIHRlbnNvci4gUmVxdWlyZWQuXHJcbiAgICogLSBgZG93bmxvYWRgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkb3dubG9hZCB0aGUgdGVuc29yIGRhdGEgZnJvbSBHUFUgdG8gQ1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGFcclxuICAgKiB3aWxsIG5vdCBiZSBhYmxlIHRvIGRvd25sb2FkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IGEgR1BVIGJhY2tlbmQgZm9yIHRoZSBpbmZlcmVuY2Ugb3V0cHV0cy4gVXNlcnMgZG9uJ3RcclxuICAgKiBuZWVkIHRvIHByb3ZpZGUgdGhpcyBmdW5jdGlvbi5cclxuICAgKiAtIGBkaXNwb3NlYDogYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZGlzcG9zZSB0aGUgdGVuc29yIGRhdGEgb24gR1BVLiBJZiBvbWl0dGVkLCB0aGUgR1BVIGRhdGEgd2lsbCBub3QgYmUgZGlzcG9zZWQuXHJcbiAgICogVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSBhIEdQVSBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgYSB0ZW5zb3Igb2JqZWN0XHJcbiAgICovXHJcbiAgZnJvbUdwdUJ1ZmZlcjxUIGV4dGVuZHMgVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlcz4oXHJcbiAgICBidWZmZXI6IFRlbnNvci5HcHVCdWZmZXJUeXBlLFxyXG4gICAgb3B0aW9uczogVGVuc29yRnJvbUdwdUJ1ZmZlck9wdGlvbnM8VD4sXHJcbiAgKTogVHlwZWRUZW5zb3I8VD47XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIHRlbnNvciBmcm9tIGEgV2ViTk4gTUxUZW5zb3JcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0ZW5zb3IgLSB0aGUgTUxUZW5zb3Igb2JqZWN0IHRvIGNyZWF0ZSB0ZW5zb3IgZnJvbVxyXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb3B0aW9uYWwgb2JqZWN0IHJlcHJlc2VudGluZyBvcHRpb25zIGZvciBjcmVhdGluZyB0ZW5zb3IgZnJvbSBhIFdlYk5OIE1MVGVuc29yLlxyXG4gICAqXHJcbiAgICogVGhlIG9wdGlvbnMgaW5jbHVkZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICAgKiAtIGBkYXRhVHlwZWA6IHRoZSBkYXRhIHR5cGUgb2YgdGhlIHRlbnNvci4gSWYgb21pdHRlZCwgYXNzdW1lICdmbG9hdDMyJy5cclxuICAgKiAtIGBkaW1zYDogdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBSZXF1aXJlZC5cclxuICAgKiAtIGBkb3dubG9hZGA6IGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGRvd25sb2FkIHRoZSB0ZW5zb3IgZGF0YSBmcm9tIHRoZSBNTFRlbnNvciB0byBDUFUuIElmIG9taXR0ZWQsIHRoZSBNTFRlbnNvclxyXG4gICAqIGRhdGEgd2lsbCBub3QgYmUgYWJsZSB0byBkb3dubG9hZC4gVXN1YWxseSwgdGhpcyBpcyBwcm92aWRlZCBieSB0aGUgV2ViTk4gYmFja2VuZCBmb3IgdGhlIGluZmVyZW5jZSBvdXRwdXRzLlxyXG4gICAqIFVzZXJzIGRvbid0IG5lZWQgdG8gcHJvdmlkZSB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqIC0gYGRpc3Bvc2VgOiBhbiBvcHRpb25hbCBmdW5jdGlvbiB0byBkaXNwb3NlIHRoZSB0ZW5zb3IgZGF0YSBvbiB0aGUgV2ViTk4gTUxUZW5zb3IuIElmIG9taXR0ZWQsIHRoZSBNTFRlbnNvciB3aWxsXHJcbiAgICogbm90IGJlIGRpc3Bvc2VkLiBVc3VhbGx5LCB0aGlzIGlzIHByb3ZpZGVkIGJ5IHRoZSBXZWJOTiBiYWNrZW5kIGZvciB0aGUgaW5mZXJlbmNlIG91dHB1dHMuIFVzZXJzIGRvbid0IG5lZWQgdG9cclxuICAgKiBwcm92aWRlIHRoaXMgZnVuY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBhIHRlbnNvciBvYmplY3RcclxuICAgKi9cclxuICBmcm9tTUxUZW5zb3I8VCBleHRlbmRzIFRlbnNvci5NTFRlbnNvckRhdGFUeXBlcz4oXHJcbiAgICB0ZW5zb3I6IFRlbnNvci5NTFRlbnNvclR5cGUsXHJcbiAgICBvcHRpb25zOiBUZW5zb3JGcm9tTUxUZW5zb3JPcHRpb25zPFQ+LFxyXG4gICk6IFR5cGVkVGVuc29yPFQ+O1xyXG5cclxuICAvKipcclxuICAgKiBjcmVhdGUgYSB0ZW5zb3IgZnJvbSBhIHByZS1hbGxvY2F0ZWQgYnVmZmVyLiBUaGUgYnVmZmVyIHdpbGwgYmUgdXNlZCBhcyBhIHBpbm5lZCBidWZmZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdHlwZSAtIHRoZSB0ZW5zb3IgZWxlbWVudCB0eXBlLlxyXG4gICAqIEBwYXJhbSBidWZmZXIgLSBhIFR5cGVkQXJyYXkgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZS5cclxuICAgKiBAcGFyYW0gZGltcyAtIHNwZWNpZnkgdGhlIGRpbWVuc2lvbiBvZiB0aGUgdGVuc29yLiBJZiBvbWl0dGVkLCBhIDEtRCB0ZW5zb3IgaXMgYXNzdW1lZC5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIGEgdGVuc29yIG9iamVjdFxyXG4gICAqL1xyXG4gIGZyb21QaW5uZWRCdWZmZXI8VCBleHRlbmRzIEV4Y2x1ZGU8VGVuc29yLlR5cGUsICdzdHJpbmcnPj4oXHJcbiAgICB0eXBlOiBULFxyXG4gICAgYnVmZmVyOiBUZW5zb3IuRGF0YVR5cGVNYXBbVF0sXHJcbiAgICBkaW1zPzogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKTogVHlwZWRUZW5zb3I8VD47XHJcbn1cclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG4vKipcclxuICogQSBzdHJpbmcgdGhhdCByZXByZXNlbnRzIGEgZmlsZSdzIFVSTCBvciBwYXRoLlxyXG4gKlxyXG4gKiBQYXRoIGlzIHZhaWxhYmxlIG9ubHkgaW4gb25ueHJ1bnRpbWUtbm9kZSBvciBvbm54cnVudGltZS13ZWIgcnVubmluZyBpbiBOb2RlLmpzLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRmlsZVVybE9yUGF0aCA9IHN0cmluZztcclxuXHJcbi8qKlxyXG4gKiBBIEJsb2Igb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGZpbGUuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBGaWxlQmxvYiA9IEJsb2I7XHJcblxyXG4vKipcclxuICogQSBVaW50OEFycmF5LCBBcnJheUJ1ZmZlciBvciBTaGFyZWRBcnJheUJ1ZmZlciBvYmplY3QgdGhhdCByZXByZXNlbnRzIGEgZmlsZSBjb250ZW50LlxyXG4gKlxyXG4gKiBXaGVuIGl0IGlzIGFuIEFycmF5QnVmZmVyIG9yIFNoYXJlZEFycmF5QnVmZmVyLCB0aGUgd2hvbGUgYnVmZmVyIGlzIGFzc3VtZWQgdG8gYmUgdGhlIGZpbGUgY29udGVudC5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZpbGVEYXRhID0gVWludDhBcnJheSB8IEFycmF5QnVmZmVyTGlrZTtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgZmlsZSB0aGF0IGNhbiBiZSBsb2FkZWQgYnkgdGhlIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEZpbGVUeXBlID0gRmlsZVVybE9yUGF0aCB8IEZpbGVCbG9iIHwgRmlsZURhdGE7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhbiBleHRlcm5hbCBkYXRhIGZpbGUuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVybmFsRGF0YUZpbGVEZXNjcmlwdGlvbiB7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmeSB0aGUgZXh0ZXJuYWwgZGF0YSBmaWxlLlxyXG4gICAqL1xyXG4gIGRhdGE6IEZpbGVUeXBlO1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZnkgdGhlIGZpbGUgcGF0aC5cclxuICAgKi9cclxuICBwYXRoOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGV4dGVybmFsIGRhdGEgZmlsZS5cclxuICpcclxuICogV2hlbiB1c2luZyBhIHN0cmluZywgaXQgc2hvdWxkIGJlIGEgZmlsZSBVUkwgb3IgcGF0aCB0aGF0IGluIHRoZSBzYW1lIGRpcmVjdG9yeSBhcyB0aGUgbW9kZWwgZmlsZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIEV4dGVybmFsRGF0YUZpbGVUeXBlID0gRXh0ZXJuYWxEYXRhRmlsZURlc2NyaXB0aW9uIHwgRmlsZVVybE9yUGF0aDtcclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIGZvciBtb2RlbCBsb2FkaW5nLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBPbm54TW9kZWxPcHRpb25zIHtcclxuICAvKipcclxuICAgKiBTcGVjaWZ5aW5nIGEgbGlzdCBvZiBmaWxlcyB0aGF0IHJlcHJlc2VudHMgdGhlIGV4dGVybmFsIGRhdGEuXHJcbiAgICovXHJcbiAgZXh0ZXJuYWxEYXRhPzogcmVhZG9ubHkgRXh0ZXJuYWxEYXRhRmlsZVR5cGVbXTtcclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gJy4vdGVuc29yLmpzJztcclxuXHJcbmV4cG9ydCB0eXBlIE5vblRlbnNvclR5cGUgPSBuZXZlcjtcclxuXHJcbi8qKlxyXG4gKiBUeXBlIE9ubnhWYWx1ZSBSZXByZXNlbnRzIGJvdGggdGVuc29ycyBhbmQgbm9uLXRlbnNvcnMgdmFsdWUgZm9yIG1vZGVsJ3MgaW5wdXRzL291dHB1dHMuXHJcbiAqXHJcbiAqIE5PVEU6IGN1cnJlbnRseSBub3Qgc3VwcG9ydCBub24tdGVuc29yXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBPbm54VmFsdWUgPSBUZW5zb3IgfCBOb25UZW5zb3JUeXBlO1xyXG5cclxuLyoqXHJcbiAqIFR5cGUgT25ueFZhbHVlRGF0YUxvY2F0aW9uIHJlcHJlc2VudHMgdGhlIGxvY2F0aW9uIG9mIHRoZSBkYXRhIG9mIGFuIE9ubnhWYWx1ZS5cclxuICovXHJcbmV4cG9ydCB0eXBlIE9ubnhWYWx1ZURhdGFMb2NhdGlvbiA9IFRlbnNvci5EYXRhTG9jYXRpb247XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuLyoqXHJcbiAqICMgT05OWCBSdW50aW1lIEphdmFTY3JpcHQgQVBJXHJcbiAqXHJcbiAqIE9OTlggUnVudGltZSBKYXZhU2NyaXB0IEFQSSBpcyBhIHVuaWZpZWQgQVBJIGZvciBhbGwgSmF2YVNjcmlwdCB1c2FnZXMsIGluY2x1ZGluZyB0aGUgZm9sbG93aW5nIE5QTSBwYWNrYWdlczpcclxuICpcclxuICogLSBbb25ueHJ1bnRpbWUtbm9kZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtbm9kZSlcclxuICogLSBbb25ueHJ1bnRpbWUtd2ViXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9vbm54cnVudGltZS13ZWIpXHJcbiAqIC0gW29ubnhydW50aW1lLXJlYWN0LW5hdGl2ZV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb25ueHJ1bnRpbWUtcmVhY3QtbmF0aXZlKVxyXG4gKlxyXG4gKiBTZWUgYWxzbzpcclxuICogLSBbR2V0IFN0YXJ0ZWRdKGh0dHBzOi8vb25ueHJ1bnRpbWUuYWkvZG9jcy9nZXQtc3RhcnRlZC93aXRoLWphdmFzY3JpcHQvKVxyXG4gKiAtIFtJbmZlcmVuY2UgZXhhbXBsZXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvb25ueHJ1bnRpbWUtaW5mZXJlbmNlLWV4YW1wbGVzL3RyZWUvbWFpbi9qcylcclxuICpcclxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXHJcbiAqL1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9iYWNrZW5kLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi9lbnYuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2luZmVyZW5jZS1zZXNzaW9uLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3IuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3RlbnNvci1jb252ZXJzaW9uLmpzJztcclxuZXhwb3J0ICogZnJvbSAnLi90ZW5zb3ItZmFjdG9yeS5qcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdHJhY2UuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL29ubngtbW9kZWwuanMnO1xyXG5leHBvcnQgKiBmcm9tICcuL29ubngtdmFsdWUuanMnO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmV4cG9ydCBjb25zdCBpc05vZGUgPSAhISh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIGxpYj1cIndlYndvcmtlclwiIC8+XHJcblxyXG4vL1xyXG4vLyAqIHR5cGUgaGFjayBmb3IgXCJIVE1MSW1hZ2VFbGVtZW50XCJcclxuLy9cclxuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJIVE1MSW1hZ2VFbGVtZW50XCIgaXMgZGVmaW5lZCBpbiBsaWIuZG9tLmQudHMsIHdoaWNoIGlzIGNvbmZsaWN0IHdpdGggbGliLndlYndvcmtlci5kLnRzLlxyXG4vLyB3aGVuIHdlIHVzZSB3ZWJ3b3JrZXIsIHRoZSBsaWIud2Vid29ya2VyLmQudHMgd2lsbCBiZSB1c2VkLCB3aGljaCBkb2VzIG5vdCBoYXZlIEhUTUxJbWFnZUVsZW1lbnQgZGVmaW5lZC5cclxuLy9cclxuLy8gd2Ugd2lsbCBnZXQgdGhlIGZvbGxvd2luZyBlcnJvcnMgY29tcGxhaW5pbmcgdGhhdCBIVE1MSW1hZ2VFbGVtZW50IGlzIG5vdCBkZWZpbmVkOlxyXG4vL1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyAuLi9jb21tb24vZGlzdC9janMvdGVuc29yLWZhY3RvcnkuZC50czoxODc6MjkgLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxJbWFnZUVsZW1lbnQnLiBEaWQgeW91IG1lYW5cclxuLy8gJ0hUTUxMSUVsZW1lbnQnP1xyXG4vL1xyXG4vLyAxODcgICAgIGZyb21JbWFnZShpbWFnZUVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQsIG9wdGlvbnM/OiBUZW5zb3JGcm9tSW1hZ2VFbGVtZW50T3B0aW9ucyk6XHJcbi8vIFByb21pc2U8VHlwZWRUZW5zb3I8J2Zsb2F0MzInPiB8IFR5cGVkVGVuc29yPCd1aW50OCc+PjtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XHJcbi8vXHJcbi8vIG5vZGVfbW9kdWxlcy9Ad2ViZ3B1L3R5cGVzL2Rpc3QvaW5kZXguZC50czo4Mzo3IC0gZXJyb3IgVFMyNTUyOiBDYW5ub3QgZmluZCBuYW1lICdIVE1MSW1hZ2VFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXHJcbi8vICdIVE1MTElFbGVtZW50Jz9cclxuLy9cclxuLy8gODMgICAgIHwgSFRNTEltYWdlRWxlbWVudFxyXG4vLyAgICAgICAgICB+fn5+fn5+fn5+fn5+fn5+XHJcbi8vXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbi8vXHJcbi8vIGBIVE1MSW1hZ2VFbGVtZW50YCBpcyBvbmx5IHVzZWQgaW4gdHlwZSBkZWNsYXJhdGlvbiBhbmQgbm90IGluIHJlYWwgY29kZS4gU28gd2UgZGVmaW5lIGl0IGFzIGB1bmtub3duYCBoZXJlIHRvXHJcbi8vIGJ5cGFzcyB0aGUgdHlwZSBjaGVjay5cclxuXHJcbi8vXHJcbi8vICogdHlwZSBoYWNrIGZvciBcImRvY3VtZW50XCJcclxuLy9cclxuLy8gaW4gdHlwZXNjcmlwdCwgdGhlIHR5cGUgb2YgXCJkb2N1bWVudFwiIGlzIGRlZmluZWQgaW4gbGliLmRvbS5kLnRzLCBzbyBpdCdzIG5vdCBhdmFpbGFibGUgaW4gd2Vid29ya2VyLlxyXG4vL1xyXG4vLyB3ZSB3aWxsIGdldCB0aGUgZm9sbG93aW5nIGVycm9ycyBjb21wbGFpbmluZyB0aGF0IGRvY3VtZW50IGlzIG5vdCBkZWZpbmVkOlxyXG4vL1xyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL1xyXG4vLyBsaWIvd2FzbS93YXNtLXV0aWxzLWltcG9ydC50czo3OjMzIC0gZXJyb3IgVFMyNTg0OiBDYW5ub3QgZmluZCBuYW1lICdkb2N1bWVudCcuIERvIHlvdSBuZWVkIHRvIGNoYW5nZSB5b3VyIHRhcmdldFxyXG4vLyBsaWJyYXJ5PyBUcnkgY2hhbmdpbmcgdGhlICdsaWInIGNvbXBpbGVyIG9wdGlvbiB0byBpbmNsdWRlICdkb20nLlxyXG4vL1xyXG4vLyA3IGV4cG9ydCBjb25zdCBzY3JpcHRTcmMgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gKGRvY3VtZW50Py5jdXJyZW50U2NyaXB0IGFzIEhUTUxTY3JpcHRFbGVtZW50KT8uc3JjIDpcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XHJcbi8vXHJcbi8vIGxpYi93YXNtL3dhc20tdXRpbHMtaW1wb3J0LnRzOjc6NjEgLSBlcnJvciBUUzI1ODQ6IENhbm5vdCBmaW5kIG5hbWUgJ2RvY3VtZW50Jy4gRG8geW91IG5lZWQgdG8gY2hhbmdlIHlvdXIgdGFyZ2V0XHJcbi8vIGxpYnJhcnk/IFRyeSBjaGFuZ2luZyB0aGUgJ2xpYicgY29tcGlsZXIgb3B0aW9uIHRvIGluY2x1ZGUgJ2RvbScuXHJcbi8vXHJcbi8vIDcgZXhwb3J0IGNvbnN0IHNjcmlwdFNyYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyAoZG9jdW1lbnQ/LmN1cnJlbnRTY3JpcHQgYXMgSFRNTFNjcmlwdEVsZW1lbnQpPy5zcmMgOlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH5+fn5+fn5+XHJcbi8vXHJcbi8vIGxpYi93YXNtL3dhc20tdXRpbHMtaW1wb3J0LnRzOjc6ODggLSBlcnJvciBUUzI1NTI6IENhbm5vdCBmaW5kIG5hbWUgJ0hUTUxTY3JpcHRFbGVtZW50Jy4gRGlkIHlvdSBtZWFuXHJcbi8vICdIVE1MTElFbGVtZW50Jz9cclxuLy9cclxuLy8gNyBleHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IChkb2N1bWVudD8uY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyYyA6XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfn5+fn5+fn5+fn5+fn5+fn5cclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9cclxuLy8gYGRvY3VtZW50YCBpcyB1c2VkIHRvIGdldCB0aGUgY3VycmVudCBzY3JpcHQgVVJMLCB3aGljaCBpcyBub3QgYXZhaWxhYmxlIGluIHdlYndvcmtlci4gVGhpcyBmaWxlIGlzIHNlcnZlZCBhcyBhXHJcbi8vIFwiZHVhbFwiIGZpbGUgZm9yIGVudHJpZXMgb2YgYm90aCB3ZWJ3b3JrZXIgYW5kIHRoZSBlc20gbW9kdWxlLlxyXG4vL1xyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgdHlwZSBIVE1MSW1hZ2VFbGVtZW50ID0gdW5rbm93bjtcclxuICB0eXBlIEhUTUxTY3JpcHRFbGVtZW50ID0geyBzcmM/OiBzdHJpbmcgfTtcclxuICBjb25zdCBkb2N1bWVudDogdW5kZWZpbmVkIHwgeyBjdXJyZW50U2NyaXB0PzogSFRNTFNjcmlwdEVsZW1lbnQgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBzdW1tYXJ5XHJcbiAqXHJcbiAqIFRoaXMgZmlsZSBpcyBzZXJ2ZWQgYXMgYSBcImR1YWxcIiBmaWxlIGZvciBib3RoIGVudHJpZXMgb2YgdGhlIGZvbGxvd2luZzpcclxuICogLSBUaGUgcHJveHkgd29ya2VyIGl0c2VsZi5cclxuICogICAtIFdoZW4gdXNlZCBhcyBhIHdvcmtlciwgaXQgbGlzdGVucyB0byB0aGUgbWVzc2FnZXMgZnJvbSB0aGUgbWFpbiB0aHJlYWQgYW5kIHBlcmZvcm1zIHRoZSBjb3JyZXNwb25kaW5nIG9wZXJhdGlvbnMuXHJcbiAqICAgLSBTaG91bGQgYmUgaW1wb3J0ZWQgZGlyZWN0bHkgdXNpbmcgYG5ldyBXb3JrZXIoKWAgaW4gdGhlIG1haW4gdGhyZWFkLlxyXG4gKlxyXG4gKiAtIFRoZSBFU00gbW9kdWxlIHRoYXQgY3JlYXRlcyB0aGUgcHJveHkgd29ya2VyIChhcyBhIHdvcmtlciBsYXVuY2hlcikuXHJcbiAqICAgLSBXaGVuIHVzZWQgYXMgYSB3b3JrZXIgbGF1bmNoZXIsIGl0IGNyZWF0ZXMgdGhlIHByb3h5IHdvcmtlciBhbmQgcmV0dXJucyBpdC5cclxuICogICAtIFNob3VsZCBiZSBpbXBvcnRlZCB1c2luZyBgaW1wb3J0KClgIGluIHRoZSBtYWluIHRocmVhZCwgd2l0aCB0aGUgcXVlcnkgcGFyYW1ldGVyIGBpbXBvcnQ9MWAuXHJcbiAqXHJcbiAqIFRoaXMgZmlsZSB3aWxsIGJlIGFsd2F5cyBjb21waWxpbmcgaW50byBFU00gZm9ybWF0LlxyXG4gKi9cclxuXHJcbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1lc3NhZ2UsIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhIH0gZnJvbSAnLi4vcHJveHktbWVzc2FnZXMuanMnO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZVNlc3Npb24sXHJcbiAgY29weUZyb21FeHRlcm5hbEJ1ZmZlcixcclxuICBlbmRQcm9maWxpbmcsXHJcbiAgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMsXHJcbiAgaW5pdEVwLFxyXG4gIGluaXRSdW50aW1lLFxyXG4gIHJlbGVhc2VTZXNzaW9uLFxyXG4gIHJ1bixcclxufSBmcm9tICcuLi93YXNtLWNvcmUtaW1wbC5qcyc7XHJcbmltcG9ydCB7IGluaXRpYWxpemVXZWJBc3NlbWJseSB9IGZyb20gJy4uL3dhc20tZmFjdG9yeS5qcyc7XHJcbmltcG9ydCB7IHNjcmlwdFNyYyB9IGZyb20gJy4uL3dhc20tdXRpbHMtaW1wb3J0LmpzJztcclxuXHJcbmNvbnN0IFdPUktFUl9OQU1FID0gJ29ydC13YXNtLXByb3h5LXdvcmtlcic7XHJcbmNvbnN0IGlzUHJveHlXb3JrZXIgPSBnbG9iYWxUaGlzLnNlbGY/Lm5hbWUgPT09IFdPUktFUl9OQU1FO1xyXG5cclxuaWYgKGlzUHJveHlXb3JrZXIpIHtcclxuICAvLyBXb3JrZXIgdGhyZWFkXHJcbiAgc2VsZi5vbm1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHsgdHlwZSwgaW46IG1lc3NhZ2UgfSA9IGV2LmRhdGE7XHJcbiAgICB0cnkge1xyXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlICdpbml0LXdhc20nOlxyXG4gICAgICAgICAgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KG1lc3NhZ2UhLndhc20pLnRoZW4oXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICBpbml0UnVudGltZShtZXNzYWdlISkudGhlbihcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdpbml0LWVwJzoge1xyXG4gICAgICAgICAgY29uc3QgeyBlcE5hbWUsIGVudiB9ID0gbWVzc2FnZSE7XHJcbiAgICAgICAgICBpbml0RXAoZW52LCBlcE5hbWUpLnRoZW4oXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAnY29weS1mcm9tJzoge1xyXG4gICAgICAgICAgY29uc3QgeyBidWZmZXIgfSA9IG1lc3NhZ2UhO1xyXG4gICAgICAgICAgY29uc3QgYnVmZmVyRGF0YSA9IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYnVmZmVyKTtcclxuICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgb3V0OiBidWZmZXJEYXRhIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgJ2NyZWF0ZSc6IHtcclxuICAgICAgICAgIGNvbnN0IHsgbW9kZWwsIG9wdGlvbnMgfSA9IG1lc3NhZ2UhO1xyXG4gICAgICAgICAgY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucykudGhlbihcclxuICAgICAgICAgICAgKHNlc3Npb25NZXRhZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgb3V0OiBzZXNzaW9uTWV0YWRhdGEgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIChlcnIpID0+IHtcclxuICAgICAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUsIGVyciB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAncmVsZWFzZSc6XHJcbiAgICAgICAgICByZWxlYXNlU2Vzc2lvbihtZXNzYWdlISk7XHJcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdydW4nOiB7XHJcbiAgICAgICAgICBjb25zdCB7IHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG9wdGlvbnMgfSA9IG1lc3NhZ2UhO1xyXG4gICAgICAgICAgcnVuKHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHMsIG91dHB1dEluZGljZXMsIG5ldyBBcnJheShvdXRwdXRJbmRpY2VzLmxlbmd0aCkuZmlsbChudWxsKSwgb3B0aW9ucykudGhlbihcclxuICAgICAgICAgICAgKG91dHB1dHMpID0+IHtcclxuICAgICAgICAgICAgICBpZiAob3V0cHV0cy5zb21lKChvKSA9PiBvWzNdICE9PSAnY3B1JykpIHtcclxuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyOiAnUHJveHkgZG9lcyBub3Qgc3VwcG9ydCBub24tY3B1IHRlbnNvciBsb2NhdGlvbi4nIH0pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZShcclxuICAgICAgICAgICAgICAgICAgeyB0eXBlLCBvdXQ6IG91dHB1dHMgfSxcclxuICAgICAgICAgICAgICAgICAgZXh0cmFjdFRyYW5zZmVyYWJsZUJ1ZmZlcnMoWy4uLmlucHV0cywgLi4ub3V0cHV0c10gYXMgU2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXSksXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgdHlwZSwgZXJyIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzpcclxuICAgICAgICAgIGVuZFByb2ZpbGluZyhtZXNzYWdlISk7XHJcbiAgICAgICAgICBwb3N0TWVzc2FnZSh7IHR5cGUgfSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlLCBlcnIgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaXNQcm94eVdvcmtlclxyXG4gID8gbnVsbFxyXG4gIDogKHVybE92ZXJyaWRlPzogc3RyaW5nKSA9PlxyXG4gICAgICBuZXcgV29ya2VyKHVybE92ZXJyaWRlID8/IHNjcmlwdFNyYyEsIHsgdHlwZTogQlVJTERfREVGUy5JU19FU00gPyAnbW9kdWxlJyA6ICdjbGFzc2ljJywgbmFtZTogV09SS0VSX05BTUUgfSk7XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHR5cGUgeyBPcnRXYXNtTW9kdWxlIH0gZnJvbSAnLi93YXNtLXR5cGVzJztcclxuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XHJcblxyXG4vKipcclxuICogVGhlIG9yaWdpbiBvZiB0aGUgY3VycmVudCBsb2NhdGlvbi5cclxuICpcclxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXHJcbiAqL1xyXG5jb25zdCBvcmlnaW4gPSBpc05vZGUgfHwgdHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGxvY2F0aW9uLm9yaWdpbjtcclxuXHJcbi8qKlxyXG4gKiBTb21lIGJ1bmRsZXJzIChlZy4gV2VicGFjaykgd2lsbCByZXdyaXRlIGBpbXBvcnQubWV0YS51cmxgIHRvIGEgZmlsZSBVUkwgYXQgY29tcGlsZSB0aW1lLlxyXG4gKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiBgaW1wb3J0Lm1ldGEudXJsYCBzdGFydHMgd2l0aCBgZmlsZTpgLCBidXQgdXNpbmcgdGhlIGA+YCBhbmQgYDxgIG9wZXJhdG9ycyBpbnN0ZWFkIG9mXHJcbiAqIGBzdGFydHNXaXRoYCBmdW5jdGlvbiBzbyB0aGF0IGNvZGUgbWluaW1pemVycyBjYW4gcmVtb3ZlIHRoZSBkZWFkIGNvZGUgY29ycmVjdGx5LlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSwgaWYgd2UgdXNlIHRlcnNlciB0byBtaW5pZnkgdGhlIGZvbGxvd2luZyBjb2RlOlxyXG4gKiBgYGBqc1xyXG4gKiBpZiAoXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiLnN0YXJ0c1dpdGgoXCJmaWxlOlwiKSkge1xyXG4gKiAgIGNvbnNvbGUubG9nKDEpXHJcbiAqIH0gZWxzZSB7XHJcbiAqICAgY29uc29sZS5sb2coMilcclxuICogfVxyXG4gKlxyXG4gKiBpZiAoXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiID4gXCJmaWxlOlwiICYmIFwiZmlsZTovL2hhcmQtY29kZWQtZmlsZW5hbWVcIiA8IFwiZmlsZTtcIikge1xyXG4gKiAgIGNvbnNvbGUubG9nKDMpXHJcbiAqIH0gZWxzZSB7XHJcbiAqICAgY29uc29sZS5sb2coNClcclxuICogfVxyXG4gKiBgYGBcclxuICpcclxuICogVGhlIG1pbmlmaWVkIGNvZGUgd2lsbCBiZTpcclxuICogYGBganNcclxuICogXCJmaWxlOi8vaGFyZC1jb2RlZC1maWxlbmFtZVwiLnN0YXJ0c1dpdGgoXCJmaWxlOlwiKT9jb25zb2xlLmxvZygxKTpjb25zb2xlLmxvZygyKSxjb25zb2xlLmxvZygzKTtcclxuICogYGBgXHJcbiAqXHJcbiAqICh1c2UgVGVyc2VyIDUuMzkuMCB3aXRoIGRlZmF1bHQgb3B0aW9ucywgaHR0cHM6Ly90cnkudGVyc2VyLm9yZy8pXHJcbiAqXHJcbiAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGltcG9ydC5tZXRhLnVybCBpcyBoYXJkY29kZWQgYXMgYSBmaWxlIFVSSS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc0VzbUltcG9ydE1ldGFVcmxIYXJkY29kZWRBc0ZpbGVVcmkgPVxyXG4gIEJVSUxEX0RFRlMuSVNfRVNNICYmIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCEgPiAnZmlsZTonICYmIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCEgPCAnZmlsZTsnO1xyXG5cclxuY29uc3QgZ2V0U2NyaXB0U3JjID0gKCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgLy8gaWYgTm9kZWpzLCByZXR1cm4gdW5kZWZpbmVkXHJcbiAgaWYgKGlzTm9kZSkge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgLy8gaWYgSXQncyBFU00sIHVzZSBpbXBvcnQubWV0YS51cmxcclxuICBpZiAoQlVJTERfREVGUy5JU19FU00pIHtcclxuICAgIC8vIEZvciBFU00sIGlmIHRoZSBpbXBvcnQubWV0YS51cmwgaXMgYSBmaWxlIFVSTCwgdGhpcyB1c3VhbGx5IG1lYW5zIHRoZSBidW5kbGVyIHJld3JpdGVzIGBpbXBvcnQubWV0YS51cmxgIHRvXHJcbiAgICAvLyB0aGUgZmlsZSBwYXRoIGF0IGNvbXBpbGUgdGltZS4gSW4gdGhpcyBjYXNlLCB0aGlzIGZpbGUgcGF0aCBjYW5ub3QgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIHJ1bnRpbWUgVVJMLlxyXG4gICAgLy9cclxuICAgIC8vIFdlIG5lZWQgdG8gdXNlIHRoZSBVUkwgY29uc3RydWN0b3IgbGlrZSB0aGlzOlxyXG4gICAgLy8gYGBganNcclxuICAgIC8vIG5ldyBVUkwoJ2FjdHVhbC1idW5kbGUtbmFtZS5qcycsIGltcG9ydC5tZXRhLnVybCkuaHJlZlxyXG4gICAgLy8gYGBgXHJcbiAgICAvLyBTbyB0aGF0IGJ1bmRsZXIgY2FuIHByZXByb2Nlc3MgdGhlIFVSTCBjb3JyZWN0bHkuXHJcbiAgICBpZiAoaXNFc21JbXBvcnRNZXRhVXJsSGFyZGNvZGVkQXNGaWxlVXJpKSB7XHJcbiAgICAgIC8vIGlmIHRoZSByZXdyaXR0ZW4gVVJMIGlzIGEgcmVsYXRpdmUgcGF0aCwgd2UgbmVlZCB0byB1c2UgdGhlIG9yaWdpbiB0byByZXNvbHZlIHRoZSBVUkwuXHJcblxyXG4gICAgICAvLyBUaGUgZm9sbG93aW5nIGlzIGEgd29ya2Fyb3VuZCBmb3IgVml0ZS5cclxuICAgICAgLy9cclxuICAgICAgLy8gVml0ZSB1c2VzIGEgYnVuZGxlcihyb2xsdXAvcm9sbGRvd24pIHRoYXQgZG9lcyBub3QgcmV3cml0ZSBgaW1wb3J0Lm1ldGEudXJsYCB0byBhIGZpbGUgVVJMLiBTbyBpbiB0aGVvcnksIHRoaXNcclxuICAgICAgLy8gY29kZSBwYXRoIHNob3VsZCBub3QgYmUgZXhlY3V0ZWQgaW4gVml0ZS4gSG93ZXZlciwgdGhlIGJ1bmRsZXIgZG9lcyBub3Qga25vdyBpdCBhbmQgaXQgc3RpbGwgdHJ5IHRvIGxvYWQgdGhlXHJcbiAgICAgIC8vIGZvbGxvd2luZyBwYXR0ZXJuOlxyXG4gICAgICAvLyAtIGByZXR1cm4gbmV3IFVSTCgnZmlsZW5hbWUnLCBpbXBvcnQubWV0YS51cmwpLmhyZWZgXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIEJ5IHJlcGxhY2luZyB0aGUgcGF0dGVybiBhYm92ZSB3aXRoIHRoZSBmb2xsb3dpbmcgY29kZSwgd2UgY2FuIHNraXAgdGhlIHJlc291cmNlIGxvYWRpbmcgYmVoYXZpb3I6XHJcbiAgICAgIC8vIC0gYGNvbnN0IFVSTDIgPSBVUkw7IHJldHVybiBuZXcgVVJMMignZmlsZW5hbWUnLCBpbXBvcnQubWV0YS51cmwpLmhyZWY7YFxyXG4gICAgICAvL1xyXG4gICAgICAvLyBBbmQgaXQgc3RpbGwgd29ya3MgaW4gV2VicGFjay5cclxuICAgICAgY29uc3QgVVJMMiA9IFVSTDtcclxuICAgICAgcmV0dXJuIG5ldyBVUkwobmV3IFVSTDIoQlVJTERfREVGUy5CVU5ETEVfRklMRU5BTUUsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZiwgb3JpZ2luKS5ocmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgPyAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCBhcyBIVE1MU2NyaXB0RWxlbWVudCk/LnNyY1xyXG4gICAgOiAvLyB1c2UgYHNlbGYubG9jYXRpb24uaHJlZmAgaWYgYXZhaWxhYmxlXHJcbiAgICAgIHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICA/IHNlbGYubG9jYXRpb24/LmhyZWZcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzaWMgc2NyaXB0IHNvdXJjZSBVUkwuIFRoaXMgaXMgbm90IGFsd2F5cyBhdmFpbGFibGUgaW4gbm9uIEVTTW9kdWxlIGVudmlyb25tZW50cy5cclxuICpcclxuICogSW4gTm9kZS5qcywgdGhpcyBpcyB1bmRlZmluZWQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc2NyaXB0U3JjID0gZ2V0U2NyaXB0U3JjKCk7XHJcblxyXG4vKipcclxuICogSW5mZXIgdGhlIHdhc20gcGF0aCBwcmVmaXggZnJvbSB0aGUgc2NyaXB0IHNvdXJjZSBVUkwuXHJcbiAqXHJcbiAqIEByZXR1cm5zIFRoZSBpbmZlcnJlZCB3YXNtIHBhdGggcHJlZml4LCBvciB1bmRlZmluZWQgaWYgdGhlIHNjcmlwdCBzb3VyY2UgVVJMIGlzIG5vdCBhdmFpbGFibGUgb3IgaXMgYSBibG9iIFVSTC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYyA9ICgpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xyXG4gIGlmIChzY3JpcHRTcmMgJiYgIXNjcmlwdFNyYy5zdGFydHNXaXRoKCdibG9iOicpKSB7XHJcbiAgICByZXR1cm4gc2NyaXB0U3JjLnN1YnN0cmluZygwLCBzY3JpcHRTcmMubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBmaWxlbmFtZSB3aXRoIHByZWZpeCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cclxuICovXHJcbmNvbnN0IGlzU2FtZU9yaWdpbiA9IChmaWxlbmFtZTogc3RyaW5nLCBwcmVmaXhPdmVycmlkZT86IHN0cmluZykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xyXG4gICAgY29uc3QgdXJsID0gYmFzZVVybCA/IG5ldyBVUkwoZmlsZW5hbWUsIGJhc2VVcmwpIDogbmV3IFVSTChmaWxlbmFtZSk7XHJcbiAgICByZXR1cm4gdXJsLm9yaWdpbiA9PT0gb3JpZ2luO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemUgdGhlIGlucHV0cyB0byBhbiBhYnNvbHV0ZSBVUkwgd2l0aCB0aGUgZ2l2ZW4gcHJlZml4IG92ZXJyaWRlLiBJZiBmYWlsZWQsIHJldHVybiB1bmRlZmluZWQuXHJcbiAqL1xyXG5jb25zdCBub3JtYWxpemVVcmwgPSAoZmlsZW5hbWU6IHN0cmluZywgcHJlZml4T3ZlcnJpZGU/OiBzdHJpbmcpID0+IHtcclxuICBjb25zdCBiYXNlVXJsID0gcHJlZml4T3ZlcnJpZGUgPz8gc2NyaXB0U3JjO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1cmwgPSBiYXNlVXJsID8gbmV3IFVSTChmaWxlbmFtZSwgYmFzZVVybCkgOiBuZXcgVVJMKGZpbGVuYW1lKTtcclxuICAgIHJldHVybiB1cmwuaHJlZjtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIGZhbGxiYWNrIFVSTCBpZiBhbiBhYnNvbHV0ZSBVUkwgY2Fubm90IGJlIGNyZWF0ZWQgYnkgdGhlIG5vcm1hbGl6ZVVybCBmdW5jdGlvbi5cclxuICovXHJcbmNvbnN0IGZhbGxiYWNrVXJsID0gKGZpbGVuYW1lOiBzdHJpbmcsIHByZWZpeE92ZXJyaWRlPzogc3RyaW5nKSA9PiBgJHtwcmVmaXhPdmVycmlkZSA/PyAnLi8nfSR7ZmlsZW5hbWV9YDtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIHByZWxvYWQgYSBtb2R1bGUgZnJvbSBhIFVSTC5cclxuICpcclxuICogSWYgdGhlIG9yaWdpbiBvZiB0aGUgd29ya2VyIFVSTCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgY3VycmVudCBvcmlnaW4sIHRoZSB3b3JrZXIgY2Fubm90IGJlIGxvYWRlZCBkaXJlY3RseS5cclxuICogU2VlIGRpc2N1c3Npb25zIGluIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvd29ya2VyLWxvYWRlci9pc3N1ZXMvMTU0XHJcbiAqXHJcbiAqIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBmZXRjaCB0aGUgd29ya2VyIFVSTCBhbmQgY3JlYXRlIGEgbmV3IEJsb2IgVVJMIHdpdGggdGhlIHNhbWUgb3JpZ2luIGFzIGEgd29ya2Fyb3VuZC5cclxuICpcclxuICogQHBhcmFtIGFic29sdXRlVXJsIC0gVGhlIGFic29sdXRlIFVSTCB0byBwcmVsb2FkLlxyXG4gKlxyXG4gKiBAcmV0dXJucyAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgbmV3IEJsb2IgVVJMXHJcbiAqL1xyXG5jb25zdCBwcmVsb2FkID0gYXN5bmMgKGFic29sdXRlVXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYWJzb2x1dGVVcmwsIHsgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicgfSk7XHJcbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcclxuICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGhlbHBlciBmdW5jdGlvbiBpcyB1c2VkIHRvIGR5bmFtaWNhbGx5IGltcG9ydCBhIG1vZHVsZSBmcm9tIGEgVVJMLlxyXG4gKlxyXG4gKiBUaGUgYnVpbGQgc2NyaXB0IGhhcyBzcGVjaWFsIGhhbmRsaW5nIGZvciB0aGlzIGZ1bmN0aW9uIHRvIGVuc3VyZSB0aGF0IHRoZSBVUkwgaXMgbm90IGJ1bmRsZWQgaW50byB0aGUgZmluYWwgb3V0cHV0LlxyXG4gKlxyXG4gKiBAcGFyYW0gdXJsIC0gVGhlIFVSTCB0byBpbXBvcnQuXHJcbiAqXHJcbiAqIEByZXR1cm5zIC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUuXHJcbiAqL1xyXG5jb25zdCBkeW5hbWljSW1wb3J0RGVmYXVsdCA9IGFzeW5jIDxUPih1cmw6IHN0cmluZyk6IFByb21pc2U8VD4gPT5cclxuICAoYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tJZ25vcmU6IHRydWUgKi8gLyogQHZpdGUtaWdub3JlICovIHVybCkpLmRlZmF1bHQ7XHJcblxyXG4vKipcclxuICogVGhlIHByb3h5IHdvcmtlciBmYWN0b3J5IGltcG9ydGVkIGZyb20gdGhlIHByb3h5IHdvcmtlciBtb2R1bGUuXHJcbiAqXHJcbiAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgd2hlbiB0aGUgV2ViQXNzZW1ibHkgcHJveHkgaXMgbm90IGRpc2FibGVkLlxyXG4gKi9cclxuY29uc3QgY3JlYXRlUHJveHlXb3JrZXI6ICgodXJsT3ZlcnJpZGU/OiBzdHJpbmcpID0+IFdvcmtlcikgfCB1bmRlZmluZWQgPVxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXHJcbiAgQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgPyB1bmRlZmluZWQgOiByZXF1aXJlKCcuL3Byb3h5LXdvcmtlci9tYWluJykuZGVmYXVsdDtcclxuXHJcbi8qKlxyXG4gKiBJbXBvcnQgdGhlIHByb3h5IHdvcmtlci5cclxuICpcclxuICogVGhpcyBmdW5jdGlvbiB3aWxsIHBlcmZvcm0gdGhlIGZvbGxvd2luZyBzdGVwczpcclxuICogMS4gSWYgYSBwcmVsb2FkIGlzIG5lZWRlZCwgaXQgd2lsbCBwcmVsb2FkIHRoZSBtb2R1bGUgYW5kIHJldHVybiB0aGUgb2JqZWN0IFVSTC5cclxuICogMi4gVXNlIHRoZSBwcm94eSB3b3JrZXIgZmFjdG9yeSB0byBjcmVhdGUgdGhlIHByb3h5IHdvcmtlci5cclxuICpcclxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIDIgZWxlbWVudHM6XHJcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxyXG4gKiAgICAgICAgICAgIC0gVGhlIHByb3h5IHdvcmtlci5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbXBvcnRQcm94eVdvcmtlciA9IGFzeW5jICgpOiBQcm9taXNlPFt1bmRlZmluZWQgfCBzdHJpbmcsIFdvcmtlcl0+ID0+IHtcclxuICBpZiAoIXNjcmlwdFNyYykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCBwcm94eSB3b3JrZXI6IGNhbm5vdCBkZXRlcm1pbmUgdGhlIHNjcmlwdCBzb3VyY2UgVVJMLicpO1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgdGhlIHNjcmlwdCBzb3VyY2UgaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4sIHdlIGNhbiB1c2UgdGhlIGVtYmVkZGVkIHByb3h5IG1vZHVsZSBkaXJlY3RseS5cclxuICBpZiAoaXNTYW1lT3JpZ2luKHNjcmlwdFNyYykpIHtcclxuICAgIHJldHVybiBbdW5kZWZpbmVkLCBjcmVhdGVQcm94eVdvcmtlciEoKV07XHJcbiAgfVxyXG5cclxuICAvLyBPdGhlcndpc2UsIG5lZWQgdG8gcHJlbG9hZFxyXG4gIGNvbnN0IHVybCA9IGF3YWl0IHByZWxvYWQoc2NyaXB0U3JjKTtcclxuICByZXR1cm4gW3VybCwgY3JlYXRlUHJveHlXb3JrZXIhKHVybCldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBlbWJlZGRlZCBXZWJBc3NlbWJseSBtb2R1bGUuXHJcbiAqXHJcbiAqIFRoaXMgaXMgb25seSBhdmFpbGFibGUgaW4gRVNNIGFuZCB3aGVuIGVtYmVkZGluZyBpcyBub3QgZGlzYWJsZWQuXHJcbiAqL1xyXG5jb25zdCBlbWJlZGRlZFdhc21Nb2R1bGU6IEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+IHwgdW5kZWZpbmVkID1cclxuICBCVUlMRF9ERUZTLklTX0VTTSAmJiBCVUlMRF9ERUZTLkVOQUJMRV9CVU5ETEVfV0FTTV9KU1xyXG4gICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0cywgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xyXG4gICAgICByZXF1aXJlKFxyXG4gICAgICAgICFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUFxyXG4gICAgICAgICAgPyAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLmpzZXAubWpzJ1xyXG4gICAgICAgICAgOiBCVUlMRF9ERUZTLkVOQUJMRV9KU1BJXHJcbiAgICAgICAgICAgID8gJy4uLy4uL2Rpc3Qvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc3BpLm1qcydcclxuICAgICAgICAgICAgOiAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVVxyXG4gICAgICAgICAgICAgID8gJy4uLy4uL2Rpc3Qvb3J0LXdhc20tc2ltZC10aHJlYWRlZC5hc3luY2lmeS5tanMnXHJcbiAgICAgICAgICAgICAgOiAnLi4vLi4vZGlzdC9vcnQtd2FzbS1zaW1kLXRocmVhZGVkLm1qcycsXHJcbiAgICAgICkuZGVmYXVsdFxyXG4gICAgOiB1bmRlZmluZWQ7XHJcblxyXG4vKipcclxuICogSW1wb3J0IHRoZSBXZWJBc3NlbWJseSBtb2R1bGUuXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBwZXJmb3JtIHRoZSBmb2xsb3dpbmcgc3RlcHM6XHJcbiAqIDEuIElmIHRoZSBlbWJlZGRlZCBtb2R1bGUgZXhpc3RzIGFuZCBubyBjdXN0b20gVVJMIGlzIHNwZWNpZmllZCwgdXNlIHRoZSBlbWJlZGRlZCBtb2R1bGUuXHJcbiAqIDIuIElmIGEgcHJlbG9hZCBpcyBuZWVkZWQsIGl0IHdpbGwgcHJlbG9hZCB0aGUgbW9kdWxlIGFuZCByZXR1cm4gdGhlIG9iamVjdCBVUkwuXHJcbiAqIDMuIE90aGVyd2lzZSwgaXQgd2lsbCBwZXJmb3JtIGEgZHluYW1pYyBpbXBvcnQgb2YgdGhlIG1vZHVsZS5cclxuICpcclxuICogQHJldHVybnMgLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIHR1cGxlIG9mIDIgZWxlbWVudHM6XHJcbiAqICAgICAgICAgICAgLSBUaGUgb2JqZWN0IFVSTCBvZiB0aGUgcHJlbG9hZGVkIG1vZHVsZSwgb3IgdW5kZWZpbmVkIGlmIG5vIHByZWxvYWQgaXMgbmVlZGVkLlxyXG4gKiAgICAgICAgICAgIC0gVGhlIGRlZmF1bHQgZXhwb3J0IG9mIHRoZSBtb2R1bGUsIHdoaWNoIGlzIGEgZmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIFdlYkFzc2VtYmx5IG1vZHVsZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpbXBvcnRXYXNtTW9kdWxlID0gYXN5bmMgKFxyXG4gIHVybE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWQsXHJcbiAgcHJlZml4T3ZlcnJpZGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICBpc011bHRpVGhyZWFkZWQ6IGJvb2xlYW4sXHJcbiAgaXNXYXNtT3ZlcnJpZGRlbjogYm9vbGVhbixcclxuKTogUHJvbWlzZTxbdW5kZWZpbmVkIHwgc3RyaW5nLCBFbXNjcmlwdGVuTW9kdWxlRmFjdG9yeTxPcnRXYXNtTW9kdWxlPl0+ID0+IHtcclxuICAvL1xyXG4gIC8vIENoZWNrIGlmIHdlIHNob3VsZCB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZS5cclxuICAvL1xyXG5cclxuICAvLyBUbyB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZSwgaXQgc2hvdWxkIGJlIGF2YWlsYWJsZSwgYW5kIG5vIFVSTCBvdmVycmlkZSBvciBwcmVmaXggb3ZlcnJpZGUgc2hvdWxkIGJlIHNwZWNpZmllZC5cclxuICBsZXQgdXNlRW1iZWRkZWRNb2R1bGUgPSBlbWJlZGRlZFdhc21Nb2R1bGUgJiYgISh1cmxPdmVycmlkZSB8fCBwcmVmaXhPdmVycmlkZSk7XHJcbiAgaWYgKHVzZUVtYmVkZGVkTW9kdWxlKSB7XHJcbiAgICBpZiAoIXNjcmlwdFNyYykge1xyXG4gICAgICAvLyBubyBVUkwgaW5mbyBhdmFpbGFibGUuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIE5vdGU6IHdoZW4gdGhlIGVtYmVkZGVkIG1vZHVsZSBpcyBhdmFpbGFibGUsIGl0IG1lYW5zIHRoZSBjdXJyZW50IHNjcmlwdCBpcyBFU00uIFVzdWFsbHksIGluIEVTTSwgdGhlXHJcbiAgICAgIC8vIGBpbXBvcnQubWV0YS51cmxgIGlzIGF2YWlsYWJsZS4gQnV0IGluIHNvbWUgY2FzZXMgKGVnLiBDbG91ZGZsYXJlIFdvcmtlcnMpLCB0aGUgdmFsdWUgb2YgYGltcG9ydC5tZXRhLnVybGBcclxuICAgICAgLy8gY2FuIGJlIGBudWxsYCBvciBgdW5kZWZpbmVkYC4gSW4gdGhpcyBjYXNlLCB3ZSBjYW4gb25seSBsb2FkIHRoZSBlbWJlZGRlZCBtb2R1bGUgd2hlbjpcclxuICAgICAgLy9cclxuICAgICAgLy8gMS4gVGhlIFdlYkFzc2VtYmx5IG1vZHVsZSBiaW5hcnkgaXMgb3ZlcnJpZGRlbjpcclxuICAgICAgLy8gICAgYGBganNcclxuICAgICAgLy8gICAgZW52Lndhc20ud2FzbVBhdGhzID0gdW5kZWZpbmVkOyAgLy8gb3Igbm90IHNwZWNpZmllZFxyXG4gICAgICAvLyAgICBlbnYud2FzbS53YXNtQmluYXJ5ID0gLyogYSBVaW50OEFycmF5IGNvbnRhaW5pbmcgdGhlIFdlYkFzc2VtYmx5IGJpbmFyeSAqLztcclxuICAgICAgLy8gICAgYGBgXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIDIuIFRoZSBcIi53YXNtXCIgb25seSBpcyBvdmVycmlkZGVuLlxyXG4gICAgICAvLyAgICBgYGBqc1xyXG4gICAgICAvLyAgICBlbnYud2FzbS53YXNtUGF0aHMgPSB7IHdhc206IC8qIFVSTCBvZiB0aGUgLndhc20gZmlsZSAqLyB9O1xyXG4gICAgICAvLyAgICBgYGBcclxuICAgICAgLy9cclxuICAgICAgaWYgKGlzV2FzbU92ZXJyaWRkZW4gJiYgIWlzTXVsdGlUaHJlYWRlZCkge1xyXG4gICAgICAgIHVzZUVtYmVkZGVkTW9kdWxlID0gdHJ1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBkZXRlcm1pbmUgdGhlIHNjcmlwdCBzb3VyY2UgVVJMLicpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZiB0aGUgc2NyaXB0IHNvdXJjZSBpcyBhdmFpbGFibGUsIHdlIGNhbiBjaGVjayBpZiBpdCBpcyBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cclxuICAgICAgLy8gQWxzbyB1c2UgdGhlIGVtYmVkZGVkIG1vZHVsZSB3aGVuIHdhc21CaW5hcnkgaXMgcHJvdmlkZWQgYW5kIHNpbmdsZS10aHJlYWRlZCAoZWcuIEJsb2IgVVJMIHdvcmtlcnNcclxuICAgICAgLy8gd2hlcmUgaXNTYW1lT3JpZ2luIGZhaWxzIGJ1dCBubyBmaWxlIHJlc29sdXRpb24gb3Igd29ya2VyIHNwYXduaW5nIGlzIG5lZWRlZCkuXHJcbiAgICAgIHVzZUVtYmVkZGVkTW9kdWxlID0gaXNTYW1lT3JpZ2luKHNjcmlwdFNyYykgfHwgKGlzV2FzbU92ZXJyaWRkZW4gJiYgIWlzTXVsdGlUaHJlYWRlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh1c2VFbWJlZGRlZE1vZHVsZSkge1xyXG4gICAgcmV0dXJuIFt1bmRlZmluZWQsIGVtYmVkZGVkV2FzbU1vZHVsZSFdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCB3YXNtTW9kdWxlRmlsZW5hbWUgPSAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVBcclxuICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLm1qcydcclxuICAgICAgOiBCVUlMRF9ERUZTLkVOQUJMRV9KU1BJXHJcbiAgICAgICAgPyAnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc3BpLm1qcydcclxuICAgICAgICA6ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVXHJcbiAgICAgICAgICA/ICdvcnQtd2FzbS1zaW1kLXRocmVhZGVkLmFzeW5jaWZ5Lm1qcydcclxuICAgICAgICAgIDogJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQubWpzJztcclxuICAgIGNvbnN0IHdhc21Nb2R1bGVVcmwgPSB1cmxPdmVycmlkZSA/PyBub3JtYWxpemVVcmwod2FzbU1vZHVsZUZpbGVuYW1lLCBwcmVmaXhPdmVycmlkZSk7XHJcbiAgICAvLyBuZWVkIHRvIHByZWxvYWQgaWYgYWxsIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxyXG4gICAgLy8gMS4gbm90IGluIE5vZGUuanMuXHJcbiAgICAvLyAgICAtIE5vZGUuanMgZG9lcyBub3QgaGF2ZSB0aGUgc2FtZSBvcmlnaW4gcG9saWN5IGZvciBjcmVhdGluZyB3b3JrZXJzLlxyXG4gICAgLy8gMi4gbXVsdGktdGhyZWFkZWQgaXMgZW5hYmxlZC5cclxuICAgIC8vICAgIC0gSWYgbXVsdGktdGhyZWFkZWQgaXMgZGlzYWJsZWQsIG5vIHdvcmtlciB3aWxsIGJlIGNyZWF0ZWQuIFNvIHdlIGRvbid0IG5lZWQgdG8gcHJlbG9hZCB0aGUgbW9kdWxlLlxyXG4gICAgLy8gMy4gdGhlIGFic29sdXRlIFVSTCBpcyBhdmFpbGFibGUuXHJcbiAgICAvLyAgICAtIElmIHRoZSBhYnNvbHV0ZSBVUkwgaXMgZmFpbGVkIHRvIGJlIGNyZWF0ZWQsIHRoZSBvcmlnaW4gY2Fubm90IGJlIGRldGVybWluZWQuIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBub3RcclxuICAgIC8vICAgIHByZWxvYWQgdGhlIG1vZHVsZS5cclxuICAgIC8vIDQuIHRoZSB3b3JrZXIgVVJMIGlzIG5vdCBmcm9tIHRoZSBzYW1lIG9yaWdpbi5cclxuICAgIC8vICAgIC0gSWYgdGhlIHdvcmtlciBVUkwgaXMgZnJvbSB0aGUgc2FtZSBvcmlnaW4sIHdlIGNhbiBjcmVhdGUgdGhlIHdvcmtlciBkaXJlY3RseS5cclxuICAgIGNvbnN0IG5lZWRQcmVsb2FkID0gIWlzTm9kZSAmJiBpc011bHRpVGhyZWFkZWQgJiYgd2FzbU1vZHVsZVVybCAmJiAhaXNTYW1lT3JpZ2luKHdhc21Nb2R1bGVVcmwsIHByZWZpeE92ZXJyaWRlKTtcclxuICAgIGNvbnN0IHVybCA9IG5lZWRQcmVsb2FkXHJcbiAgICAgID8gYXdhaXQgcHJlbG9hZCh3YXNtTW9kdWxlVXJsKVxyXG4gICAgICA6ICh3YXNtTW9kdWxlVXJsID8/IGZhbGxiYWNrVXJsKHdhc21Nb2R1bGVGaWxlbmFtZSwgcHJlZml4T3ZlcnJpZGUpKTtcclxuICAgIHJldHVybiBbbmVlZFByZWxvYWQgPyB1cmwgOiB1bmRlZmluZWQsIGF3YWl0IGR5bmFtaWNJbXBvcnREZWZhdWx0PEVtc2NyaXB0ZW5Nb2R1bGVGYWN0b3J5PE9ydFdhc21Nb2R1bGU+Pih1cmwpXTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgRW52IH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB0eXBlIHsgT3J0V2FzbU1vZHVsZSB9IGZyb20gJy4vd2FzbS10eXBlcyc7XHJcbmltcG9ydCB7IGltcG9ydFdhc21Nb2R1bGUsIGluZmVyV2FzbVBhdGhQcmVmaXhGcm9tU2NyaXB0U3JjIH0gZnJvbSAnLi93YXNtLXV0aWxzLWltcG9ydCc7XHJcblxyXG5sZXQgd2FzbTogT3J0V2FzbU1vZHVsZSB8IHVuZGVmaW5lZDtcclxubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XHJcbmxldCBpbml0aWFsaXppbmcgPSBmYWxzZTtcclxubGV0IGFib3J0ZWQgPSBmYWxzZTtcclxuXHJcbmNvbnN0IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgLy8gSWYgJ1NoYXJlZEFycmF5QnVmZmVyJyBpcyBub3QgYXZhaWxhYmxlLCBXZWJBc3NlbWJseSB0aHJlYWRzIHdpbGwgbm90IHdvcmsuXHJcbiAgaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICAvLyBUZXN0IGZvciB0cmFuc2ZlcmFiaWxpdHkgb2YgU0FCcyAoZm9yIGJyb3dzZXJzLiBuZWVkZWQgZm9yIEZpcmVmb3gpXHJcbiAgICAvLyBodHRwczovL2dyb3Vwcy5nb29nbGUuY29tL2ZvcnVtLyMhbXNnL21vemlsbGEuZGV2LnBsYXRmb3JtL0lIa0JabEhFVHBBL2R3c01OY2hXRVFBSlxyXG4gICAgaWYgKHR5cGVvZiBNZXNzYWdlQ2hhbm5lbCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEucG9zdE1lc3NhZ2UobmV3IFNoYXJlZEFycmF5QnVmZmVyKDEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUZXN0IGZvciBXZWJBc3NlbWJseSB0aHJlYWRzIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxyXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyB0aHJlYWRlZCBpbnN0cnVjdGlvbnMuXHJcbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXHJcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcclxuICAgICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCA1LCA0LCAxLCAzLCAxLCAxLCAxMCwgMTEsIDEsIDksIDAsIDY1LCAwLCAyNTQsIDE2LFxyXG4gICAgICAgIDIsIDAsIDI2LCAxMSxcclxuICAgICAgXSksXHJcbiAgICApO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGlzU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgU0lNRCBjYXBhYmlsaXR5IChmb3IgYm90aCBicm93c2VycyBhbmQgTm9kZS5qcylcclxuICAgIC8vIFRoaXMgdHlwZWQgYXJyYXkgaXMgYSBXZWJBc3NlbWJseSBwcm9ncmFtIGNvbnRhaW5pbmcgU0lNRCBpbnN0cnVjdGlvbnMuXHJcblxyXG4gICAgLy8gVGhlIGJpbmFyeSBkYXRhIGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBmb2xsb3dpbmcgY29kZSBieSB3YXQyd2FzbTpcclxuICAgIC8vXHJcbiAgICAvLyAobW9kdWxlXHJcbiAgICAvLyAgICh0eXBlICR0MCAoZnVuYykpXHJcbiAgICAvLyAgIChmdW5jICRmMCAodHlwZSAkdDApXHJcbiAgICAvLyAgICAgKGRyb3BcclxuICAgIC8vICAgICAgIChpMzJ4NC5kb3RfaTE2eDhfc1xyXG4gICAgLy8gICAgICAgICAoaTh4MTYuc3BsYXRcclxuICAgIC8vICAgICAgICAgICAoaTMyLmNvbnN0IDApKVxyXG4gICAgLy8gICAgICAgICAodjEyOC5jb25zdCBpMzJ4NCAweDAwMDAwMDAwIDB4MDAwMDAwMDAgMHgwMDAwMDAwMCAweDAwMDAwMDAwKSkpKSlcclxuXHJcbiAgICByZXR1cm4gV2ViQXNzZW1ibHkudmFsaWRhdGUoXHJcbiAgICAgIG5ldyBVaW50OEFycmF5KFtcclxuICAgICAgICAwLCA5NywgMTE1LCAxMDksIDEsIDAsIDAsIDAsIDEsIDQsIDEsIDk2LCAwLCAwLCAzLCAyLCAxLCAwLCAxMCwgMzAsIDEsIDI4LCAwLCA2NSwgMCwgMjUzLCAxNSwgMjUzLCAxMiwgMCwgMCwgMCxcclxuICAgICAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAyNTMsIDE4NiwgMSwgMjYsIDExLFxyXG4gICAgICBdKSxcclxuICAgICk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaXNSZWxheGVkU2ltZFN1cHBvcnRlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gVGVzdCBmb3IgV2ViQXNzZW1ibHkgUmVsYXhlZCBTSU1EIGNhcGFiaWxpdHkgKGZvciBib3RoIGJyb3dzZXJzIGFuZCBOb2RlLmpzKVxyXG4gICAgLy8gVGhpcyB0eXBlZCBhcnJheSBpcyBhIFdlYkFzc2VtYmx5IHByb2dyYW0gY29udGFpbmluZyBSZWxheGVkIFNJTUQgaW5zdHJ1Y3Rpb25zLlxyXG5cclxuICAgIC8vIFRoZSBiaW5hcnkgZGF0YSBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIGNvZGUgYnkgd2F0Mndhc206XHJcbiAgICAvLyAobW9kdWxlXHJcbiAgICAvLyAgIChmdW5jIChyZXN1bHQgdjEyOClcclxuICAgIC8vICAgICAgaTMyLmNvbnN0IDFcclxuICAgIC8vICAgICAgaTh4MTYuc3BsYXRcclxuICAgIC8vICAgICAgaTMyLmNvbnN0IDJcclxuICAgIC8vICAgICAgaTh4MTYuc3BsYXRcclxuICAgIC8vICAgICAgaTMyLmNvbnN0IDNcclxuICAgIC8vICAgICAgaTh4MTYuc3BsYXRcclxuICAgIC8vICAgICAgaTMyeDQucmVsYXhlZF9kb3RfaTh4MTZfaTd4MTZfYWRkX3NcclxuICAgIC8vICAgKVxyXG4gICAgLy8gIClcclxuICAgIHJldHVybiBXZWJBc3NlbWJseS52YWxpZGF0ZShcclxuICAgICAgbmV3IFVpbnQ4QXJyYXkoW1xyXG4gICAgICAgIDAsIDk3LCAxMTUsIDEwOSwgMSwgMCwgMCwgMCwgMSwgNSwgMSwgOTYsIDAsIDEsIDEyMywgMywgMiwgMSwgMCwgMTAsIDE5LCAxLCAxNywgMCwgNjUsIDEsIDI1MywgMTUsIDY1LCAyLCAyNTMsXHJcbiAgICAgICAgMTUsIDY1LCAzLCAyNTMsIDE1LCAyNTMsIDE0NywgMiwgMTEsXHJcbiAgICAgIF0pLFxyXG4gICAgKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5ID0gYXN5bmMgKGZsYWdzOiBFbnYuV2ViQXNzZW1ibHlGbGFncyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmIChpbml0aWFsaXplZCkge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxuICBpZiAoaW5pdGlhbGl6aW5nKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtdWx0aXBsZSBjYWxscyB0byAnaW5pdGlhbGl6ZVdlYkFzc2VtYmx5KCknIGRldGVjdGVkLlwiKTtcclxuICB9XHJcbiAgaWYgKGFib3J0ZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInByZXZpb3VzIGNhbGwgdG8gJ2luaXRpYWxpemVXZWJBc3NlbWJseSgpJyBmYWlsZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6aW5nID0gdHJ1ZTtcclxuXHJcbiAgLy8gd2FzbSBmbGFncyBhcmUgYWxyZWFkeSBpbml0aWFsaXplZFxyXG4gIGNvbnN0IHRpbWVvdXQgPSBmbGFncy5pbml0VGltZW91dCE7XHJcbiAgbGV0IG51bVRocmVhZHMgPSBmbGFncy5udW1UaHJlYWRzITtcclxuXHJcbiAgLy8gZW5zdXJlIFNJTUQgaXMgc3VwcG9ydGVkXHJcbiAgaWYgKGZsYWdzLnNpbWQgPT09IGZhbHNlKSB7XHJcbiAgICAvLyBza2lwIFNJTUQgZmVhdHVyZSBjaGVja2luZyBhcyBpdCBpcyBkaXNhYmxlZCBleHBsaWNpdGx5IGJ5IHVzZXJcclxuICB9IGVsc2UgaWYgKGZsYWdzLnNpbWQgPT09ICdyZWxheGVkJykge1xyXG4gICAgLy8gY2hlY2sgaWYgcmVsYXhlZCBTSU1EIGlzIHN1cHBvcnRlZFxyXG4gICAgaWYgKCFpc1JlbGF4ZWRTaW1kU3VwcG9ydGVkKCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWxheGVkIFdlYkFzc2VtYmx5IFNJTUQgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4nKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKCFpc1NpbWRTdXBwb3J0ZWQoKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBc3NlbWJseSBTSU1EIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuJyk7XHJcbiAgfVxyXG5cclxuICBpZiAoQlVJTERfREVGUy5FTkFCTEVfSlNQSSkge1xyXG4gICAgaWYgKCEoJ1N1c3BlbmRpbmcnIGluIFdlYkFzc2VtYmx5KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFzc2VtYmx5IEpTUEkgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIGNoZWNrIGlmIG11bHRpLXRocmVhZGluZyBpcyBzdXBwb3J0ZWRcclxuICBjb25zdCBtdWx0aVRocmVhZFN1cHBvcnRlZCA9IGlzTXVsdGlUaHJlYWRTdXBwb3J0ZWQoKTtcclxuICBpZiAobnVtVGhyZWFkcyA+IDEgJiYgIW11bHRpVGhyZWFkU3VwcG9ydGVkKSB7XHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmICFzZWxmLmNyb3NzT3JpZ2luSXNvbGF0ZWQpIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICdlbnYud2FzbS5udW1UaHJlYWRzIGlzIHNldCB0byAnICtcclxuICAgICAgICAgIG51bVRocmVhZHMgK1xyXG4gICAgICAgICAgJywgYnV0IHRoaXMgd2lsbCBub3Qgd29yayB1bmxlc3MgeW91IGVuYWJsZSBjcm9zc09yaWdpbklzb2xhdGVkIG1vZGUuICcgK1xyXG4gICAgICAgICAgJ1NlZSBodHRwczovL3dlYi5kZXYvY3Jvc3Mtb3JpZ2luLWlzb2xhdGlvbi1ndWlkZS8gZm9yIG1vcmUgaW5mby4nLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICdXZWJBc3NlbWJseSBtdWx0aS10aHJlYWRpbmcgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4gJyArICdGYWxsaW5nIGJhY2sgdG8gc2luZ2xlLXRocmVhZGluZy4nLFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBzZXQgZmxhZ3MubnVtVGhyZWFkcyB0byAxIHNvIHRoYXQgT3J0SW5pdCgpIHdpbGwgbm90IGNyZWF0ZSBhIGdsb2JhbCB0aHJlYWQgcG9vbC5cclxuICAgIGZsYWdzLm51bVRocmVhZHMgPSBudW1UaHJlYWRzID0gMTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHdhc21QYXRocyA9IGZsYWdzLndhc21QYXRocztcclxuICBjb25zdCB3YXNtUHJlZml4T3ZlcnJpZGUgPSB0eXBlb2Ygd2FzbVBhdGhzID09PSAnc3RyaW5nJyA/IHdhc21QYXRocyA6IHVuZGVmaW5lZDtcclxuICBjb25zdCBtanNQYXRoT3ZlcnJpZGVGbGFnID0gKHdhc21QYXRocyBhcyBFbnYuV2FzbUZpbGVQYXRocyk/Lm1qcztcclxuICBjb25zdCBtanNQYXRoT3ZlcnJpZGUgPSAobWpzUGF0aE92ZXJyaWRlRmxhZyBhcyBVUkwpPy5ocmVmID8/IG1qc1BhdGhPdmVycmlkZUZsYWc7XHJcbiAgY29uc3Qgd2FzbVBhdGhPdmVycmlkZUZsYWcgPSAod2FzbVBhdGhzIGFzIEVudi5XYXNtRmlsZVBhdGhzKT8ud2FzbTtcclxuICBjb25zdCB3YXNtUGF0aE92ZXJyaWRlID0gKHdhc21QYXRoT3ZlcnJpZGVGbGFnIGFzIFVSTCk/LmhyZWYgPz8gd2FzbVBhdGhPdmVycmlkZUZsYWc7XHJcbiAgY29uc3Qgd2FzbUJpbmFyeU92ZXJyaWRlID0gZmxhZ3Mud2FzbUJpbmFyeTtcclxuXHJcbiAgY29uc3QgW29iamVjdFVybCwgb3J0V2FzbUZhY3RvcnldID0gYXdhaXQgaW1wb3J0V2FzbU1vZHVsZShcclxuICAgIG1qc1BhdGhPdmVycmlkZSxcclxuICAgIHdhc21QcmVmaXhPdmVycmlkZSxcclxuICAgIG51bVRocmVhZHMgPiAxLFxyXG4gICAgISF3YXNtQmluYXJ5T3ZlcnJpZGUgfHwgISF3YXNtUGF0aE92ZXJyaWRlLFxyXG4gICk7XHJcblxyXG4gIGxldCBpc1RpbWVvdXQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3QgdGFza3M6IEFycmF5PFByb21pc2U8dm9pZD4+ID0gW107XHJcblxyXG4gIC8vIHByb21pc2UgZm9yIHRpbWVvdXRcclxuICBpZiAodGltZW91dCA+IDApIHtcclxuICAgIHRhc2tzLnB1c2goXHJcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBpc1RpbWVvdXQgPSB0cnVlO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgICB9KSxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBwcm9taXNlIGZvciBtb2R1bGUgaW5pdGlhbGl6YXRpb25cclxuICB0YXNrcy5wdXNoKFxyXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBjb25maWc6IFBhcnRpYWw8T3J0V2FzbU1vZHVsZT4gPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG51bWJlciBvZiB0aHJlYWRzLiBXZWJBc3NlbWJseSB3aWxsIGNyZWF0ZSAoTW9kdWxlLm51bVRocmVhZHMgLSAxKSB3b3JrZXJzLiBJZiBpdCBpcyAxLCBubyB3b3JrZXIgd2lsbCBiZVxyXG4gICAgICAgICAqIGNyZWF0ZWQuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbnVtVGhyZWFkcyxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh3YXNtQmluYXJ5T3ZlcnJpZGUpIHtcclxuICAgICAgICAvLyBTZXQgYSBjdXN0b20gYnVmZmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBXZWJBc3NlbWJseSBiaW5hcnkuIFRoaXMgd2lsbCBza2lwIHRoZSB3YXNtIGZpbGUgZmV0Y2hpbmcuXHJcbiAgICAgICAgY29uZmlnLndhc21CaW5hcnkgPSB3YXNtQmluYXJ5T3ZlcnJpZGUgYXMgQXJyYXlCdWZmZXI7XHJcblxyXG4gICAgICAgIC8vIE9mZmVyIGFuIGltcGxlbWVudGF0aW9uIG9mIGxvY2F0ZUZpbGUoKSB0aGF0IHJldHVybnMgdGhlIGZpbGUgbmFtZSBkaXJlY3RseS4gVGhpcyBoZWxwcyB0byBhdm9pZCBhbiBlcnJvclxyXG4gICAgICAgIC8vIHRocm93biBsYXRlciBmcm9tIHRoZSBmb2xsb3dpbmcgY29kZSB3aGVuIGBpbXBvcnQubWV0YS51cmxgIGlzIGEgYmxvYiBVUkw6XHJcbiAgICAgICAgLy8gYGBgXHJcbiAgICAgICAgLy8gICByZXR1cm4gbmV3IFVSTChcIm9ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNlcC53YXNtXCIsIGltcG9ydC5tZXRhLnVybCkuaHJlZjtcclxuICAgICAgICAvLyBgYGBcclxuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSkgPT4gZmlsZU5hbWU7XHJcbiAgICAgIH0gZWxzZSBpZiAod2FzbVBhdGhPdmVycmlkZSB8fCB3YXNtUHJlZml4T3ZlcnJpZGUpIHtcclxuICAgICAgICAvLyBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGxvY2F0ZSB0aGUgV2ViQXNzZW1ibHkgZmlsZS4gVGhlIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZS5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFNpbmNlIEVtc2NyaXB0ZW4gMy4xLjU4LCB0aGlzIGZ1bmN0aW9uIGlzIG9ubHkgY2FsbGVkIGZvciB0aGUgLndhc20gZmlsZS5cclxuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSkgPT4gd2FzbVBhdGhPdmVycmlkZSA/PyB3YXNtUHJlZml4T3ZlcnJpZGUgKyBmaWxlTmFtZTtcclxuICAgICAgfSBlbHNlIGlmIChtanNQYXRoT3ZlcnJpZGUgJiYgbWpzUGF0aE92ZXJyaWRlLmluZGV4T2YoJ2Jsb2I6JykgIT09IDApIHtcclxuICAgICAgICAvLyBpZiBtanMgcGF0aCBpcyBzcGVjaWZpZWQsIHVzZSBpdCBhcyB0aGUgYmFzZSBwYXRoIGZvciB0aGUgLndhc20gZmlsZS5cclxuICAgICAgICBjb25maWcubG9jYXRlRmlsZSA9IChmaWxlTmFtZSkgPT4gbmV3IFVSTChmaWxlTmFtZSwgbWpzUGF0aE92ZXJyaWRlKS5ocmVmO1xyXG4gICAgICB9IGVsc2UgaWYgKG9iamVjdFVybCkge1xyXG4gICAgICAgIGNvbnN0IGluZmVycmVkV2FzbVBhdGhQcmVmaXggPSBpbmZlcldhc21QYXRoUHJlZml4RnJvbVNjcmlwdFNyYygpO1xyXG4gICAgICAgIGlmIChpbmZlcnJlZFdhc21QYXRoUHJlZml4KSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGUgd2FzbSBtb2R1bGUgaXMgcHJlbG9hZGVkLCB1c2UgdGhlIGluZmVycmVkIHdhc20gcGF0aCBhcyB0aGUgYmFzZSBwYXRoIGZvciB0aGUgLndhc20gZmlsZS5cclxuICAgICAgICAgIGNvbmZpZy5sb2NhdGVGaWxlID0gKGZpbGVOYW1lKSA9PiBpbmZlcnJlZFdhc21QYXRoUHJlZml4ICsgZmlsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBvcnRXYXNtRmFjdG9yeShjb25maWcpLnRoZW4oXHJcbiAgICAgICAgLy8gd2FzbSBtb2R1bGUgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5XHJcbiAgICAgICAgKG1vZHVsZSkgPT4ge1xyXG4gICAgICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICB3YXNtID0gbW9kdWxlO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgaWYgKG9iamVjdFVybCkge1xyXG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB3YXNtIG1vZHVsZSBmYWlsZWQgdG8gaW5pdGlhbGl6ZVxyXG4gICAgICAgICh3aGF0KSA9PiB7XHJcbiAgICAgICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgIGFib3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgcmVqZWN0KHdoYXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcbiAgICB9KSxcclxuICApO1xyXG5cclxuICBhd2FpdCBQcm9taXNlLnJhY2UodGFza3MpO1xyXG5cclxuICBpZiAoaXNUaW1lb3V0KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYkFzc2VtYmx5IGJhY2tlbmQgaW5pdGlhbGl6aW5nIGZhaWxlZCBkdWUgdG8gdGltZW91dDogJHt0aW1lb3V0fW1zYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEluc3RhbmNlID0gKCk6IE9ydFdhc21Nb2R1bGUgPT4ge1xyXG4gIGlmIChpbml0aWFsaXplZCAmJiB3YXNtKSB7XHJcbiAgICByZXR1cm4gd2FzbTtcclxuICB9XHJcblxyXG4gIHRocm93IG5ldyBFcnJvcignV2ViQXNzZW1ibHkgaXMgbm90IGluaXRpYWxpemVkIHlldC4nKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNwb3NlID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmIChpbml0aWFsaXplZCAmJiAhaW5pdGlhbGl6aW5nICYmICFhYm9ydGVkKSB7XHJcbiAgICAvLyBUT0RPOiBjdXJyZW50bHkgXCJQVGhyZWFkLnRlcm1pbmF0ZUFsbFRocmVhZHMoKVwiIGlzIG5vdCBleHBvc2VkIGluIHRoZSB3YXNtIG1vZHVsZS5cclxuICAgIC8vICAgICAgIEFuZCB0aGlzIGZ1bmN0aW9uIGlzIG5vdCB5ZXQgY2FsbGVkIGJ5IGFueSBjb2RlLlxyXG4gICAgLy8gICAgICAgSWYgaXQgaXMgbmVlZGVkIGluIHRoZSBmdXR1cmUsIHdlIHNob3VsZCBleHBvc2UgaXQgaW4gdGhlIHdhc20gbW9kdWxlIGFuZCB1bmNvbW1lbnQgdGhlIGZvbGxvd2luZyBsaW5lLlxyXG5cclxuICAgIC8vIHdhc20/LlBUaHJlYWQ/LnRlcm1pbmF0ZUFsbFRocmVhZHMoKTtcclxuICAgIHdhc20gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgYWJvcnRlZCA9IHRydWU7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGdldEluc3RhbmNlIH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFsbG9jV2FzbVN0cmluZyA9IChkYXRhOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdCBkYXRhTGVuZ3RoID0gd2FzbS5sZW5ndGhCeXRlc1VURjgoZGF0YSkgKyAxO1xyXG4gIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLl9tYWxsb2MoZGF0YUxlbmd0aCk7XHJcbiAgd2FzbS5zdHJpbmdUb1VURjgoZGF0YSwgZGF0YU9mZnNldCwgZGF0YUxlbmd0aCk7XHJcbiAgYWxsb2NzLnB1c2goZGF0YU9mZnNldCk7XHJcblxyXG4gIHJldHVybiBkYXRhT2Zmc2V0O1xyXG59O1xyXG5cclxuaW50ZXJmYWNlIEV4dHJhT3B0aW9uc0hhbmRsZXIge1xyXG4gIChuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaXRlcmF0ZUV4dHJhT3B0aW9ucyA9IChcclxuICBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPixcclxuICBwcmVmaXg6IHN0cmluZyxcclxuICBzZWVuOiBXZWFrU2V0PFJlY29yZDxzdHJpbmcsIHVua25vd24+PixcclxuICBoYW5kbGVyOiBFeHRyYU9wdGlvbnNIYW5kbGVyLFxyXG4pOiB2b2lkID0+IHtcclxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xyXG4gICAgaWYgKHNlZW4uaGFzKG9wdGlvbnMpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2lyY3VsYXIgcmVmZXJlbmNlIGluIG9wdGlvbnMnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNlZW4uYWRkKG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgT2JqZWN0LmVudHJpZXMob3B0aW9ucykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICBjb25zdCBuYW1lID0gcHJlZml4ID8gcHJlZml4ICsga2V5IDoga2V5O1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaXRlcmF0ZUV4dHJhT3B0aW9ucyh2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgbmFtZSArICcuJywgc2VlbiwgaGFuZGxlcik7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xyXG4gICAgICBoYW5kbGVyKG5hbWUsIHZhbHVlID8gJzEnIDogJzAnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgaGFuZGxlIGV4dHJhIGNvbmZpZyB0eXBlOiAke3R5cGVvZiB2YWx1ZX1gKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVjayB3ZWIgYXNzZW1ibHkgQVBJJ3MgbGFzdCBlcnJvciBhbmQgdGhyb3cgZXJyb3IgaWYgYW55IGVycm9yIG9jY3VycmVkLlxyXG4gKiBAcGFyYW0gbWVzc2FnZSBhIG1lc3NhZ2UgdXNlZCB3aGVuIGFuIGVycm9yIG9jY3VycmVkLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNoZWNrTGFzdEVycm9yID0gKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG5cclxuICBjb25zdCBzdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHB0clNpemUgPSB3YXNtLlBUUl9TSVpFO1xyXG4gICAgY29uc3QgcGFyYW1zT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKDIgKiBwdHJTaXplKTtcclxuICAgIHdhc20uX09ydEdldExhc3RFcnJvcihwYXJhbXNPZmZzZXQsIHBhcmFtc09mZnNldCArIHB0clNpemUpO1xyXG4gICAgY29uc3QgZXJyb3JDb2RlID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUocGFyYW1zT2Zmc2V0LCBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JykpO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlUG9pbnRlciA9IHdhc20uZ2V0VmFsdWUocGFyYW1zT2Zmc2V0ICsgcHRyU2l6ZSwgJyonKTtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZVBvaW50ZXIgPyB3YXNtLlVURjhUb1N0cmluZyhlcnJvck1lc3NhZ2VQb2ludGVyKSA6ICcnO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGAke21lc3NhZ2V9IEVSUk9SX0NPREU6ICR7ZXJyb3JDb2RlfSwgRVJST1JfTUVTU0FHRTogJHtlcnJvck1lc3NhZ2V9YCk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9ucyB9IGZyb20gJy4vd2FzbS11dGlscyc7XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0UnVuT3B0aW9ucyA9IChvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMpOiBbbnVtYmVyLCBudW1iZXJbXV0gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBydW5PcHRpb25zSGFuZGxlID0gMDtcclxuICBjb25zdCBhbGxvY3M6IG51bWJlcltdID0gW107XHJcblxyXG4gIGNvbnN0IHJ1bk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gIHRyeSB7XHJcbiAgICBpZiAob3B0aW9ucz8ubG9nU2V2ZXJpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJ1bk9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA9IDI7IC8vIERlZmF1bHQgdG8gd2FybmluZ1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgdHlwZW9mIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCAhPT0gJ251bWJlcicgfHxcclxuICAgICAgIU51bWJlci5pc0ludGVnZXIob3B0aW9ucy5sb2dTZXZlcml0eUxldmVsKSB8fFxyXG4gICAgICBvcHRpb25zLmxvZ1NldmVyaXR5TGV2ZWwgPCAwIHx8XHJcbiAgICAgIG9wdGlvbnMubG9nU2V2ZXJpdHlMZXZlbCA+IDRcclxuICAgICkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dTZXZlcml0eUxldmVsfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb25zPy5sb2dWZXJib3NpdHlMZXZlbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJ1bk9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgPSAwOyAvLyBEZWZhdWx0IHRvIDBcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG9wdGlvbnMubG9nVmVyYm9zaXR5TGV2ZWwpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbG9nIHZlcmJvc2l0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7b3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucz8udGVybWluYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcnVuT3B0aW9ucy50ZXJtaW5hdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGFnRGF0YU9mZnNldCA9IDA7XHJcbiAgICBpZiAob3B0aW9ucz8udGFnICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGFnRGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhvcHRpb25zLnRhZywgYWxsb2NzKTtcclxuICAgIH1cclxuXHJcbiAgICBydW5PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlUnVuT3B0aW9ucyhcclxuICAgICAgcnVuT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsISxcclxuICAgICAgcnVuT3B0aW9ucy5sb2dWZXJib3NpdHlMZXZlbCEsXHJcbiAgICAgICEhcnVuT3B0aW9ucy50ZXJtaW5hdGUhLFxyXG4gICAgICB0YWdEYXRhT2Zmc2V0LFxyXG4gICAgKTtcclxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlID09PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIHJ1biBvcHRpb25zLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucz8uZXh0cmEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKG9wdGlvbnMuZXh0cmEsICcnLCBuZXcgV2Vha1NldDxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4oKSwgKGtleSwgdmFsdWUpID0+IHtcclxuICAgICAgICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcclxuICAgICAgICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XHJcblxyXG4gICAgICAgIGlmICh3YXNtLl9PcnRBZGRSdW5Db25maWdFbnRyeShydW5PcHRpb25zSGFuZGxlLCBrZXlEYXRhT2Zmc2V0LCB2YWx1ZURhdGFPZmZzZXQpICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgcnVuIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gW3J1bk9wdGlvbnNIYW5kbGUsIGFsbG9jc107XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgaWYgKHJ1bk9wdGlvbnNIYW5kbGUgIT09IDApIHtcclxuICAgICAgd2FzbS5fT3J0UmVsZWFzZVJ1bk9wdGlvbnMocnVuT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB9XHJcbiAgICBhbGxvY3MuZm9yRWFjaCgoYWxsb2MpID0+IHdhc20uX2ZyZWUoYWxsb2MpKTtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB0eXBlIHsgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciwgaXRlcmF0ZUV4dHJhT3B0aW9ucyB9IGZyb20gJy4vd2FzbS11dGlscyc7XHJcblxyXG5jb25zdCBnZXRHcmFwaE9wdGltemF0aW9uTGV2ZWwgPSAoZ3JhcGhPcHRpbWl6YXRpb25MZXZlbDogc3RyaW5nIHwgdW5rbm93bik6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChncmFwaE9wdGltaXphdGlvbkxldmVsKSB7XHJcbiAgICBjYXNlICdkaXNhYmxlZCc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnYmFzaWMnOlxyXG4gICAgICByZXR1cm4gMTtcclxuICAgIGNhc2UgJ2V4dGVuZGVkJzpcclxuICAgICAgcmV0dXJuIDI7XHJcbiAgICBjYXNlICdsYXlvdXQnOlxyXG4gICAgICByZXR1cm4gMztcclxuICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIHJldHVybiA5OTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZ3JhcGggb3B0aW1pemF0aW9uIGxldmVsOiAke2dyYXBoT3B0aW1pemF0aW9uTGV2ZWx9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0RXhlY3V0aW9uTW9kZSA9IChleGVjdXRpb25Nb2RlOiAnc2VxdWVudGlhbCcgfCAncGFyYWxsZWwnKTogbnVtYmVyID0+IHtcclxuICBzd2l0Y2ggKGV4ZWN1dGlvbk1vZGUpIHtcclxuICAgIGNhc2UgJ3NlcXVlbnRpYWwnOlxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIGNhc2UgJ3BhcmFsbGVsJzpcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGV4ZWN1dGlvbiBtb2RlOiAke2V4ZWN1dGlvbk1vZGV9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYXBwZW5kRGVmYXVsdE9wdGlvbnMgPSAob3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyk6IHZvaWQgPT4ge1xyXG4gIGlmICghb3B0aW9ucy5leHRyYSkge1xyXG4gICAgb3B0aW9ucy5leHRyYSA9IHt9O1xyXG4gIH1cclxuICBpZiAoIW9wdGlvbnMuZXh0cmEuc2Vzc2lvbikge1xyXG4gICAgb3B0aW9ucy5leHRyYS5zZXNzaW9uID0ge307XHJcbiAgfVxyXG4gIGNvbnN0IHNlc3Npb24gPSBvcHRpb25zLmV4dHJhLnNlc3Npb24gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuICBpZiAoIXNlc3Npb24udXNlX29ydF9tb2RlbF9ieXRlc19kaXJlY3RseSkge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxyXG4gICAgc2Vzc2lvbi51c2Vfb3J0X21vZGVsX2J5dGVzX2RpcmVjdGx5ID0gJzEnO1xyXG4gIH1cclxuXHJcbiAgLy8gaWYgdXNpbmcgSlNFUCB3aXRoIFdlYkdQVSwgYWx3YXlzIGRpc2FibGUgbWVtb3J5IHBhdHRlcm5cclxuICBpZiAoXHJcbiAgICBvcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycyAmJlxyXG4gICAgb3B0aW9ucy5leGVjdXRpb25Qcm92aWRlcnMuc29tZSgoZXApID0+ICh0eXBlb2YgZXAgPT09ICdzdHJpbmcnID8gZXAgOiBlcC5uYW1lKSA9PT0gJ3dlYmdwdScpXHJcbiAgKSB7XHJcbiAgICBvcHRpb25zLmVuYWJsZU1lbVBhdHRlcm4gPSBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBhcHBlbmRTZXNzaW9uQ29uZmlnID0gKHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBhbGxvY3M6IG51bWJlcltdKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qga2V5RGF0YU9mZnNldCA9IGFsbG9jV2FzbVN0cmluZyhrZXksIGFsbG9jcyk7XHJcbiAgY29uc3QgdmFsdWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKHZhbHVlLCBhbGxvY3MpO1xyXG4gIGlmIChnZXRJbnN0YW5jZSgpLl9PcnRBZGRTZXNzaW9uQ29uZmlnRW50cnkoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIGtleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldCkgIT09IDApIHtcclxuICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBzZXQgYSBzZXNzaW9uIGNvbmZpZyBlbnRyeTogJHtrZXl9IC0gJHt2YWx1ZX0uYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgYXBwZW5kRXBPcHRpb24gPSAoZXBPcHRpb25zOiBBcnJheTxbbnVtYmVyLCBudW1iZXJdPiwga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGFsbG9jczogbnVtYmVyW10pOiB2b2lkID0+IHtcclxuICBjb25zdCBrZXlEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGtleSwgYWxsb2NzKTtcclxuICBjb25zdCB2YWx1ZURhdGFPZmZzZXQgPSBhbGxvY1dhc21TdHJpbmcodmFsdWUsIGFsbG9jcyk7XHJcbiAgZXBPcHRpb25zLnB1c2goW2tleURhdGFPZmZzZXQsIHZhbHVlRGF0YU9mZnNldF0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0RXhlY3V0aW9uUHJvdmlkZXJzID0gYXN5bmMgKFxyXG4gIHNlc3Npb25PcHRpb25zSGFuZGxlOiBudW1iZXIsXHJcbiAgc2Vzc2lvbk9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXHJcbiAgYWxsb2NzOiBudW1iZXJbXSxcclxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgY29uc3QgZXhlY3V0aW9uUHJvdmlkZXJzID0gc2Vzc2lvbk9wdGlvbnMuZXhlY3V0aW9uUHJvdmlkZXJzITtcclxuICBmb3IgKGNvbnN0IGVwIG9mIGV4ZWN1dGlvblByb3ZpZGVycykge1xyXG4gICAgbGV0IGVwTmFtZSA9IHR5cGVvZiBlcCA9PT0gJ3N0cmluZycgPyBlcCA6IGVwLm5hbWU7XHJcbiAgICBjb25zdCBlcE9wdGlvbnM6IEFycmF5PFtudW1iZXIsIG51bWJlcl0+ID0gW107XHJcblxyXG4gICAgLy8gY2hlY2sgRVAgbmFtZVxyXG4gICAgc3dpdGNoIChlcE5hbWUpIHtcclxuICAgICAgY2FzZSAnd2Vibm4nOlxyXG4gICAgICAgIGVwTmFtZSA9ICdXRUJOTic7XHJcbiAgICAgICAgLy8gRGlzYWJsZSBRRFEgZnVzaW9uIHNvIERRL1Egbm9kZXMgYXJlIHByZXNlcnZlZCBhcyBpbmRpdmlkdWFsIG9wcyBmb3IgV2ViTk4gRVAuXHJcbiAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgJ3Nlc3Npb24uZGlzYWJsZV9xdWFudF9xZHEnLCAnMScsIGFsbG9jcyk7XHJcbiAgICAgICAgLy8gRm9yY2libHkgcHJldmVudCBjb25zdGFudCBmb2xkaW5nIGZyb20gcmVwbGFjaW5nIERRIG5vZGVzIHdpdGggY29uc3RhbnRzLlxyXG4gICAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsICdzZXNzaW9uLmRpc2FibGVfcWRxX2NvbnN0YW50X2ZvbGRpbmcnLCAnMScsIGFsbG9jcyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBlcCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNvbnN0IHdlYm5uT3B0aW9ucyA9IGVwIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgICAgICAgIC8vIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XHJcbiAgICAgICAgICBjb25zdCBkZXZpY2VUeXBlID0gKHdlYm5uT3B0aW9ucyBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYk5OQ29udGV4dE9wdGlvbnMpPy5kZXZpY2VUeXBlO1xyXG4gICAgICAgICAgaWYgKGRldmljZVR5cGUpIHtcclxuICAgICAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgJ2RldmljZVR5cGUnLCBkZXZpY2VUeXBlLCBhbGxvY3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnd2ViZ3B1JzpcclxuICAgICAgICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcclxuICAgICAgICAgIGVwTmFtZSA9ICdXZWJHUFUnO1xyXG4gICAgICAgICAgbGV0IGN1c3RvbURldmljZTogR1BVRGV2aWNlIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdlYmdwdU9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0IGN1c3RvbSBHUFUgZGV2aWNlXHJcbiAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLmRldmljZSkge1xyXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgR1BVRGV2aWNlICE9PSAndW5kZWZpbmVkJyAmJiB3ZWJncHVPcHRpb25zLmRldmljZSBpbnN0YW5jZW9mIEdQVURldmljZSkge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tRGV2aWNlID0gd2ViZ3B1T3B0aW9ucy5kZXZpY2U7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBHUFUgZGV2aWNlIHNldCBpbiBXZWJHUFUgRVAgb3B0aW9ucy4nKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNldCBncmFwaCBjYXB0dXJlIG9wdGlvbiBmcm9tIHNlc3Npb24gb3B0aW9uc1xyXG4gICAgICAgICAgICBjb25zdCB7IGVuYWJsZUdyYXBoQ2FwdHVyZSB9ID0gc2Vzc2lvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZW5hYmxlR3JhcGhDYXB0dXJlID09PSAnYm9vbGVhbicgJiYgZW5hYmxlR3JhcGhDYXB0dXJlKSB7XHJcbiAgICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAnZW5hYmxlR3JhcGhDYXB0dXJlJywgJzEnLCBhbGxvY3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgbGF5b3V0IG9wdGlvblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ3ByZWZlcnJlZExheW91dCcsIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0LCBhbGxvY3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgZm9yY2UgQ1BVIGZhbGxiYWNrIG5vZGVzXHJcbiAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLmZvcmNlQ3B1Tm9kZU5hbWVzKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbmFtZXMgPSBBcnJheS5pc0FycmF5KHdlYmdwdU9wdGlvbnMuZm9yY2VDcHVOb2RlTmFtZXMpXHJcbiAgICAgICAgICAgICAgICA/IHdlYmdwdU9wdGlvbnMuZm9yY2VDcHVOb2RlTmFtZXNcclxuICAgICAgICAgICAgICAgIDogW3dlYmdwdU9wdGlvbnMuZm9yY2VDcHVOb2RlTmFtZXNdO1xyXG5cclxuICAgICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICdmb3JjZUNwdU5vZGVOYW1lcycsIG5hbWVzLmpvaW4oJ1xcbicpLCBhbGxvY3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgdmFsaWRhdGlvbiBtb2RlXHJcbiAgICAgICAgICAgIGlmICh3ZWJncHVPcHRpb25zLnZhbGlkYXRpb25Nb2RlKSB7XHJcbiAgICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAndmFsaWRhdGlvbk1vZGUnLCB3ZWJncHVPcHRpb25zLnZhbGlkYXRpb25Nb2RlLCBhbGxvY3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXQgYnVmZmVyIGNhY2hlIG1vZGVzXHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIFtcclxuICAgICAgICAgICAgICAnc3RvcmFnZUJ1ZmZlckNhY2hlTW9kZScsXHJcbiAgICAgICAgICAgICAgJ3VuaWZvcm1CdWZmZXJDYWNoZU1vZGUnLFxyXG4gICAgICAgICAgICAgICdxdWVyeVJlc29sdmVCdWZmZXJDYWNoZU1vZGUnLFxyXG4gICAgICAgICAgICAgICdkZWZhdWx0QnVmZmVyQ2FjaGVNb2RlJyxcclxuICAgICAgICAgICAgXSBhcyBjb25zdCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG1vZGUgPSB3ZWJncHVPcHRpb25zW2tleV07XHJcbiAgICAgICAgICAgICAgaWYgKG1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtb2RlICE9PSAnZGlzYWJsZWQnICYmIG1vZGUgIT09ICdsYXp5UmVsZWFzZScgJiYgbW9kZSAhPT0gJ3NpbXBsZScgJiYgbW9kZSAhPT0gJ2J1Y2tldCcpIHtcclxuICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2tleX0gbXVzdCBiZSBvbmUgb2YgJ2Rpc2FibGVkJywgJ2xhenlSZWxlYXNlJywgJ3NpbXBsZScgb3IgJ2J1Y2tldCc6ICR7bW9kZX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywga2V5LCBtb2RlLCBhbGxvY3MpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGluZm8gPSBnZXRJbnN0YW5jZSgpLndlYmdwdVJlZ2lzdGVyRGV2aWNlIShjdXN0b21EZXZpY2UpO1xyXG4gICAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgY29uc3QgW2RldmljZUlkLCBpbnN0YW5jZUhhbmRsZSwgZGV2aWNlSGFuZGxlXSA9IGluZm87XHJcbiAgICAgICAgICAgIGFwcGVuZEVwT3B0aW9uKGVwT3B0aW9ucywgJ2RldmljZUlkJywgZGV2aWNlSWQudG9TdHJpbmcoKSwgYWxsb2NzKTtcclxuICAgICAgICAgICAgYXBwZW5kRXBPcHRpb24oZXBPcHRpb25zLCAnd2ViZ3B1SW5zdGFuY2UnLCBpbnN0YW5jZUhhbmRsZS50b1N0cmluZygpLCBhbGxvY3MpO1xyXG4gICAgICAgICAgICBhcHBlbmRFcE9wdGlvbihlcE9wdGlvbnMsICd3ZWJncHVEZXZpY2UnLCBkZXZpY2VIYW5kbGUudG9TdHJpbmcoKSwgYWxsb2NzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXBOYW1lID0gJ0pTJztcclxuICAgICAgICAgIGlmICh0eXBlb2YgZXAgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdlYmdwdU9wdGlvbnMgPSBlcCBhcyBJbmZlcmVuY2VTZXNzaW9uLldlYkdwdUV4ZWN1dGlvblByb3ZpZGVyT3B0aW9uO1xyXG4gICAgICAgICAgICBpZiAod2ViZ3B1T3B0aW9ucz8ucHJlZmVycmVkTGF5b3V0KSB7XHJcbiAgICAgICAgICAgICAgaWYgKHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0ICE9PSAnTkNIVycgJiYgd2ViZ3B1T3B0aW9ucy5wcmVmZXJyZWRMYXlvdXQgIT09ICdOSFdDJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBwcmVmZXJyZWRMYXlvdXQgbXVzdCBiZSBlaXRoZXIgJ05DSFcnIG9yICdOSFdDJzogJHt3ZWJncHVPcHRpb25zLnByZWZlcnJlZExheW91dH1gKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwgJ3ByZWZlcnJlZExheW91dCcsIHdlYmdwdU9wdGlvbnMucHJlZmVycmVkTGF5b3V0LCBhbGxvY3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd3YXNtJzpcclxuICAgICAgY2FzZSAnY3B1JzpcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZXhlY3V0aW9uIHByb3ZpZGVyOiAke2VwTmFtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlcE5hbWVEYXRhT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKGVwTmFtZSwgYWxsb2NzKTtcclxuICAgIGNvbnN0IGVwT3B0aW9uc0NvdW50ID0gZXBPcHRpb25zLmxlbmd0aDtcclxuICAgIGxldCBrZXlzT2Zmc2V0ID0gMDtcclxuICAgIGxldCB2YWx1ZXNPZmZzZXQgPSAwO1xyXG4gICAgaWYgKGVwT3B0aW9uc0NvdW50ID4gMCkge1xyXG4gICAgICBrZXlzT2Zmc2V0ID0gZ2V0SW5zdGFuY2UoKS5fbWFsbG9jKGVwT3B0aW9uc0NvdW50ICogZ2V0SW5zdGFuY2UoKS5QVFJfU0laRSk7XHJcbiAgICAgIGFsbG9jcy5wdXNoKGtleXNPZmZzZXQpO1xyXG4gICAgICB2YWx1ZXNPZmZzZXQgPSBnZXRJbnN0YW5jZSgpLl9tYWxsb2MoZXBPcHRpb25zQ291bnQgKiBnZXRJbnN0YW5jZSgpLlBUUl9TSVpFKTtcclxuICAgICAgYWxsb2NzLnB1c2godmFsdWVzT2Zmc2V0KTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlcE9wdGlvbnNDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2UoKS5zZXRWYWx1ZShrZXlzT2Zmc2V0ICsgaSAqIGdldEluc3RhbmNlKCkuUFRSX1NJWkUsIGVwT3B0aW9uc1tpXVswXSwgJyonKTtcclxuICAgICAgICBnZXRJbnN0YW5jZSgpLnNldFZhbHVlKHZhbHVlc09mZnNldCArIGkgKiBnZXRJbnN0YW5jZSgpLlBUUl9TSVpFLCBlcE9wdGlvbnNbaV1bMV0sICcqJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgKGF3YWl0IGdldEluc3RhbmNlKCkuX09ydEFwcGVuZEV4ZWN1dGlvblByb3ZpZGVyKFxyXG4gICAgICAgIHNlc3Npb25PcHRpb25zSGFuZGxlLFxyXG4gICAgICAgIGVwTmFtZURhdGFPZmZzZXQsXHJcbiAgICAgICAga2V5c09mZnNldCxcclxuICAgICAgICB2YWx1ZXNPZmZzZXQsXHJcbiAgICAgICAgZXBPcHRpb25zQ291bnQsXHJcbiAgICAgICkpICE9PSAwXHJcbiAgICApIHtcclxuICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFwcGVuZCBleGVjdXRpb24gcHJvdmlkZXI6ICR7ZXBOYW1lfS5gKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0U2Vzc2lvbk9wdGlvbnMgPSBhc3luYyAob3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMpOiBQcm9taXNlPFtudW1iZXIsIG51bWJlcltdXT4gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBzZXNzaW9uT3B0aW9uc0hhbmRsZSA9IDA7XHJcbiAgY29uc3QgYWxsb2NzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdCBzZXNzaW9uT3B0aW9uczogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgYXBwZW5kRGVmYXVsdE9wdGlvbnMoc2Vzc2lvbk9wdGlvbnMpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZ3JhcGhPcHRpbWl6YXRpb25MZXZlbCA9IGdldEdyYXBoT3B0aW16YXRpb25MZXZlbChzZXNzaW9uT3B0aW9ucy5ncmFwaE9wdGltaXphdGlvbkxldmVsID8/ICdhbGwnKTtcclxuICAgIGNvbnN0IGV4ZWN1dGlvbk1vZGUgPSBnZXRFeGVjdXRpb25Nb2RlKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvbk1vZGUgPz8gJ3NlcXVlbnRpYWwnKTtcclxuICAgIGNvbnN0IGxvZ0lkRGF0YU9mZnNldCA9XHJcbiAgICAgIHR5cGVvZiBzZXNzaW9uT3B0aW9ucy5sb2dJZCA9PT0gJ3N0cmluZycgPyBhbGxvY1dhc21TdHJpbmcoc2Vzc2lvbk9wdGlvbnMubG9nSWQsIGFsbG9jcykgOiAwO1xyXG5cclxuICAgIGNvbnN0IGxvZ1NldmVyaXR5TGV2ZWwgPSBzZXNzaW9uT3B0aW9ucy5sb2dTZXZlcml0eUxldmVsID8/IDI7IC8vIERlZmF1bHQgdG8gMiAtIHdhcm5pbmdcclxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dTZXZlcml0eUxldmVsKSB8fCBsb2dTZXZlcml0eUxldmVsIDwgMCB8fCBsb2dTZXZlcml0eUxldmVsID4gNCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyBzZXZlcml0eSBsZXZlbCBpcyBub3QgdmFsaWQ6ICR7bG9nU2V2ZXJpdHlMZXZlbH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsb2dWZXJib3NpdHlMZXZlbCA9IHNlc3Npb25PcHRpb25zLmxvZ1ZlcmJvc2l0eUxldmVsID8/IDA7IC8vIERlZmF1bHQgdG8gMCAtIHZlcmJvc2VcclxuICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihsb2dWZXJib3NpdHlMZXZlbCkgfHwgbG9nVmVyYm9zaXR5TGV2ZWwgPCAwIHx8IGxvZ1ZlcmJvc2l0eUxldmVsID4gNCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGxvZyB2ZXJib3NpdHkgbGV2ZWwgaXMgbm90IHZhbGlkOiAke2xvZ1ZlcmJvc2l0eUxldmVsfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdGltaXplZE1vZGVsRmlsZVBhdGhPZmZzZXQgPVxyXG4gICAgICB0eXBlb2Ygc2Vzc2lvbk9wdGlvbnMub3B0aW1pemVkTW9kZWxGaWxlUGF0aCA9PT0gJ3N0cmluZydcclxuICAgICAgICA/IGFsbG9jV2FzbVN0cmluZyhzZXNzaW9uT3B0aW9ucy5vcHRpbWl6ZWRNb2RlbEZpbGVQYXRoLCBhbGxvY3MpXHJcbiAgICAgICAgOiAwO1xyXG5cclxuICAgIHNlc3Npb25PcHRpb25zSGFuZGxlID0gd2FzbS5fT3J0Q3JlYXRlU2Vzc2lvbk9wdGlvbnMoXHJcbiAgICAgIGdyYXBoT3B0aW1pemF0aW9uTGV2ZWwsXHJcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlQ3B1TWVtQXJlbmEsXHJcbiAgICAgICEhc2Vzc2lvbk9wdGlvbnMuZW5hYmxlTWVtUGF0dGVybixcclxuICAgICAgZXhlY3V0aW9uTW9kZSxcclxuICAgICAgISFzZXNzaW9uT3B0aW9ucy5lbmFibGVQcm9maWxpbmcsXHJcbiAgICAgIDAsXHJcbiAgICAgIGxvZ0lkRGF0YU9mZnNldCxcclxuICAgICAgbG9nU2V2ZXJpdHlMZXZlbCxcclxuICAgICAgbG9nVmVyYm9zaXR5TGV2ZWwsXHJcbiAgICAgIG9wdGltaXplZE1vZGVsRmlsZVBhdGhPZmZzZXQsXHJcbiAgICApO1xyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlID09PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY3JlYXRlIHNlc3Npb24gb3B0aW9ucy5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zLmV4ZWN1dGlvblByb3ZpZGVycykge1xyXG4gICAgICBhd2FpdCBzZXRFeGVjdXRpb25Qcm92aWRlcnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUsIHNlc3Npb25PcHRpb25zLCBhbGxvY3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5lbmFibGVHcmFwaENhcHR1cmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAodHlwZW9mIHNlc3Npb25PcHRpb25zLmVuYWJsZUdyYXBoQ2FwdHVyZSAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBlbmFibGVHcmFwaENhcHR1cmUgbXVzdCBiZSBhIGJvb2xlYW4gdmFsdWU6ICR7c2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlfWApO1xyXG4gICAgICB9XHJcbiAgICAgIGFwcGVuZFNlc3Npb25Db25maWcoXHJcbiAgICAgICAgc2Vzc2lvbk9wdGlvbnNIYW5kbGUsXHJcbiAgICAgICAgJ2VuYWJsZUdyYXBoQ2FwdHVyZScsXHJcbiAgICAgICAgc2Vzc2lvbk9wdGlvbnMuZW5hYmxlR3JhcGhDYXB0dXJlLnRvU3RyaW5nKCksXHJcbiAgICAgICAgYWxsb2NzLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhzZXNzaW9uT3B0aW9ucy5mcmVlRGltZW5zaW9uT3ZlcnJpZGVzKSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgbmFtZSBtdXN0IGJlIGEgc3RyaW5nOiAke25hbWV9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSB8fCB2YWx1ZSA8IDApIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGUgdmFsdWUgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyOiAke3ZhbHVlfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuYW1lT2Zmc2V0ID0gYWxsb2NXYXNtU3RyaW5nKG5hbWUsIGFsbG9jcyk7XHJcbiAgICAgICAgaWYgKHdhc20uX09ydEFkZEZyZWVEaW1lbnNpb25PdmVycmlkZShzZXNzaW9uT3B0aW9uc0hhbmRsZSwgbmFtZU9mZnNldCwgdmFsdWUpICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3Qgc2V0IGEgZnJlZSBkaW1lbnNpb24gb3ZlcnJpZGU6ICR7bmFtZX0gLSAke3ZhbHVlfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnMuZXh0cmEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpdGVyYXRlRXh0cmFPcHRpb25zKHNlc3Npb25PcHRpb25zLmV4dHJhLCAnJywgbmV3IFdlYWtTZXQ8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+KCksIChrZXksIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgYXBwZW5kU2Vzc2lvbkNvbmZpZyhzZXNzaW9uT3B0aW9uc0hhbmRsZSwga2V5LCB2YWx1ZSwgYWxsb2NzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFtzZXNzaW9uT3B0aW9uc0hhbmRsZSwgYWxsb2NzXTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpZiAoc2Vzc2lvbk9wdGlvbnNIYW5kbGUgIT09IDApIHtcclxuICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VTZXNzaW9uT3B0aW9ucyhzZXNzaW9uT3B0aW9uc0hhbmRsZSkgIT09IDApIHtcclxuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2Ugc2Vzc2lvbiBvcHRpb25zLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWxsb2NzLmZvckVhY2goKGFsbG9jKSA9PiB3YXNtLl9mcmVlKGFsbG9jKSk7XHJcbiAgICB0aHJvdyBlO1xyXG4gIH1cclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBUZW5zb3IgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuLy8gVGhpcyBmaWxlIGluY2x1ZGVzIGNvbW1vbiBkZWZpbml0aW9ucy4gVGhleSBkbyBOT1QgaGF2ZSBkZXBlbmRlbmN5IG9uIHRoZSBXZWJBc3NlbWJseSBpbnN0YW5jZS5cclxuXHJcbi8qKlxyXG4gKiBDb3BpZWQgZnJvbSBPTk5YIGRlZmluaXRpb24uIFVzZSB0aGlzIHRvIGRyb3AgZGVwZW5kZW5jeSAnb25ueF9wcm90bycgdG8gZGVjcmVhc2UgY29tcGlsZWQgLmpzIGZpbGUgc2l6ZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBlbnVtIERhdGFUeXBlIHtcclxuICB1bmRlZmluZWQgPSAwLFxyXG4gIGZsb2F0ID0gMSxcclxuICB1aW50OCA9IDIsXHJcbiAgaW50OCA9IDMsXHJcbiAgdWludDE2ID0gNCxcclxuICBpbnQxNiA9IDUsXHJcbiAgaW50MzIgPSA2LFxyXG4gIGludDY0ID0gNyxcclxuICBzdHJpbmcgPSA4LFxyXG4gIGJvb2wgPSA5LFxyXG4gIGZsb2F0MTYgPSAxMCxcclxuICBkb3VibGUgPSAxMSxcclxuICB1aW50MzIgPSAxMixcclxuICB1aW50NjQgPSAxMyxcclxuICBjb21wbGV4NjQgPSAxNCxcclxuICBjb21wbGV4MTI4ID0gMTUsXHJcbiAgYmZsb2F0MTYgPSAxNixcclxuXHJcbiAgLy8gNC1iaXQgZGF0YS10eXBlc1xyXG4gIHVpbnQ0ID0gMjEsXHJcbiAgaW50NCA9IDIyLFxyXG59XHJcblxyXG4vKipcclxuICogTWFwIHN0cmluZyB0ZW5zb3IgZGF0YSB0byBlbnVtIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0gPSAodHlwZTogc3RyaW5nKTogRGF0YVR5cGUgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSAnaW50OCc6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ4O1xyXG4gICAgY2FzZSAndWludDgnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDg7XHJcbiAgICBjYXNlICdib29sJzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLmJvb2w7XHJcbiAgICBjYXNlICdpbnQxNic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQxNjtcclxuICAgIGNhc2UgJ3VpbnQxNic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MTY7XHJcbiAgICBjYXNlICdpbnQzMic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQzMjtcclxuICAgIGNhc2UgJ3VpbnQzMic6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS51aW50MzI7XHJcbiAgICBjYXNlICdmbG9hdDE2JzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0MTY7XHJcbiAgICBjYXNlICdmbG9hdDMyJzpcclxuICAgICAgcmV0dXJuIERhdGFUeXBlLmZsb2F0O1xyXG4gICAgY2FzZSAnZmxvYXQ2NCc6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5kb3VibGU7XHJcbiAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuc3RyaW5nO1xyXG4gICAgY2FzZSAnaW50NjQnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUuaW50NjQ7XHJcbiAgICBjYXNlICd1aW50NjQnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDY0O1xyXG4gICAgY2FzZSAnaW50NCc6XHJcbiAgICAgIHJldHVybiBEYXRhVHlwZS5pbnQ0O1xyXG4gICAgY2FzZSAndWludDQnOlxyXG4gICAgICByZXR1cm4gRGF0YVR5cGUudWludDQ7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogTWFwIGVudW0gdmFsdWUgdG8gc3RyaW5nIHRlbnNvciBkYXRhXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcgPSAodHlwZVByb3RvOiBEYXRhVHlwZSk6IFRlbnNvci5UeXBlID0+IHtcclxuICBzd2l0Y2ggKHR5cGVQcm90bykge1xyXG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ4OlxyXG4gICAgICByZXR1cm4gJ2ludDgnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS51aW50ODpcclxuICAgICAgcmV0dXJuICd1aW50OCc7XHJcbiAgICBjYXNlIERhdGFUeXBlLmJvb2w6XHJcbiAgICAgIHJldHVybiAnYm9vbCc7XHJcbiAgICBjYXNlIERhdGFUeXBlLmludDE2OlxyXG4gICAgICByZXR1cm4gJ2ludDE2JztcclxuICAgIGNhc2UgRGF0YVR5cGUudWludDE2OlxyXG4gICAgICByZXR1cm4gJ3VpbnQxNic7XHJcbiAgICBjYXNlIERhdGFUeXBlLmludDMyOlxyXG4gICAgICByZXR1cm4gJ2ludDMyJztcclxuICAgIGNhc2UgRGF0YVR5cGUudWludDMyOlxyXG4gICAgICByZXR1cm4gJ3VpbnQzMic7XHJcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0MTY6XHJcbiAgICAgIHJldHVybiAnZmxvYXQxNic7XHJcbiAgICBjYXNlIERhdGFUeXBlLmZsb2F0OlxyXG4gICAgICByZXR1cm4gJ2Zsb2F0MzInO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5kb3VibGU6XHJcbiAgICAgIHJldHVybiAnZmxvYXQ2NCc7XHJcbiAgICBjYXNlIERhdGFUeXBlLnN0cmluZzpcclxuICAgICAgcmV0dXJuICdzdHJpbmcnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ2NDpcclxuICAgICAgcmV0dXJuICdpbnQ2NCc7XHJcbiAgICBjYXNlIERhdGFUeXBlLnVpbnQ2NDpcclxuICAgICAgcmV0dXJuICd1aW50NjQnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS5pbnQ0OlxyXG4gICAgICByZXR1cm4gJ2ludDQnO1xyXG4gICAgY2FzZSBEYXRhVHlwZS51aW50NDpcclxuICAgICAgcmV0dXJuICd1aW50NCc7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBkYXRhIHR5cGU6ICR7dHlwZVByb3RvfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgdGVuc29yIHNpemUgaW4gYnl0ZXMgYnkgdGhlIGdpdmVuIGRhdGEgdHlwZSBhbmQgZGltZW5zaW9uc1xyXG4gKiBAcmV0dXJucyBzaXplIGluIGludGVnZXIgb3IgdW5kZWZpbmVkIGlmIHRoZSBkYXRhIHR5cGUgaXMgbm90IHN1cHBvcnRlZFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzID0gKFxyXG4gIGRhdGVUeXBlOiBudW1iZXIsXHJcbiAgZGltc09yU2l6ZTogcmVhZG9ubHkgbnVtYmVyW10gfCBudW1iZXIsXHJcbik6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgZWxlbWVudFNpemUgPSBbXHJcbiAgICAtMSwgLy8gdW5kZWZpbmVkID0gMFxyXG4gICAgNCwgLy8gZmxvYXQgPSAxXHJcbiAgICAxLCAvLyB1aW50OCA9IDJcclxuICAgIDEsIC8vIGludDggPSAzXHJcbiAgICAyLCAvLyB1aW50MTYgPSA0XHJcbiAgICAyLCAvLyBpbnQxNiA9IDVcclxuICAgIDQsIC8vIGludDMyID0gNlxyXG4gICAgOCwgLy8gaW50NjQgPSA3XHJcbiAgICAtMSwgLy8gc3RyaW5nID0gOFxyXG4gICAgMSwgLy8gYm9vbCA9IDlcclxuICAgIDIsIC8vIGZsb2F0MTYgPSAxMFxyXG4gICAgOCwgLy8gZG91YmxlID0gMTFcclxuICAgIDQsIC8vIHVpbnQzMiA9IDEyXHJcbiAgICA4LCAvLyB1aW50NjQgPSAxM1xyXG4gICAgLTEsIC8vIGNvbXBsZXg2NCA9IDE0XHJcbiAgICAtMSwgLy8gY29tcGxleDEyOCA9IDE1XHJcbiAgICAtMSwgLy8gYmZsb2F0MTYgPSAxNlxyXG4gICAgLTEsIC8vIEZMT0FUOEU0TTNGTiA9IDE3XHJcbiAgICAtMSwgLy8gRkxPQVQ4RTRNM0ZOVVogPSAxOFxyXG4gICAgLTEsIC8vIEZMT0FUOEU1TTIgPSAxOVxyXG4gICAgLTEsIC8vIEZMT0FUOEU1TTJGTlVaID0gMjBcclxuICAgIDAuNSwgLy8gdWludDQgPSAyMVxyXG4gICAgMC41LCAvLyBpbnQ0ID0gMjJcclxuICBdW2RhdGVUeXBlXTtcclxuXHJcbiAgY29uc3Qgc2l6ZSA9IHR5cGVvZiBkaW1zT3JTaXplID09PSAnbnVtYmVyJyA/IGRpbXNPclNpemUgOiBkaW1zT3JTaXplLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpO1xyXG4gIHJldHVybiBlbGVtZW50U2l6ZSA+IDAgPyBNYXRoLmNlaWwoc2l6ZSAqIGVsZW1lbnRTaXplKSA6IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBnZXQgdHlwZWQgYXJyYXkgY29uc3RydWN0b3IgYnkgdGhlIGdpdmVuIHRlbnNvciB0eXBlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yID0gKFxyXG4gIHR5cGU6IFRlbnNvci5UeXBlLFxyXG4pOlxyXG4gIHwgRmxvYXQzMkFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQ4QXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgSW50OEFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQxNkFycmF5Q29uc3RydWN0b3JcclxuICB8IEludDE2QXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgSW50MzJBcnJheUNvbnN0cnVjdG9yXHJcbiAgfCBCaWdJbnQ2NEFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQ4QXJyYXlDb25zdHJ1Y3RvclxyXG4gIHwgRmxvYXQ2NEFycmF5Q29uc3RydWN0b3JcclxuICB8IFVpbnQzMkFycmF5Q29uc3RydWN0b3JcclxuICB8IEJpZ1VpbnQ2NEFycmF5Q29uc3RydWN0b3IgPT4ge1xyXG4gIHN3aXRjaCAodHlwZSkge1xyXG4gICAgY2FzZSAnZmxvYXQxNic6XHJcbiAgICAgIC8vIEZsb2F0MTYgdGVuc29yIGRhdGEgaXMgc3RvcmVkIGFzIHJhdyAxNi1iaXQgdmFsdWVzLiBQcmVmZXIgYSBuYXRpdmUgb3IgcG9seWZpbGxlZCBGbG9hdDE2QXJyYXkgd2hlblxyXG4gICAgICAvLyBhdmFpbGFibGUgc28gY2FsbGVycyBjYW4gd29yayB3aXRoIGZsb2F0MTYgdmFsdWVzIGRpcmVjdGx5OyBvdGhlcndpc2UgZmFsbCBiYWNrIHRvIFVpbnQxNkFycmF5IHN0b3JhZ2UuXHJcbiAgICAgIHJldHVybiB0eXBlb2YgRmxvYXQxNkFycmF5ICE9PSAndW5kZWZpbmVkJyA/IChGbG9hdDE2QXJyYXkgYXMgdW5rbm93biBhcyBVaW50MTZBcnJheUNvbnN0cnVjdG9yKSA6IFVpbnQxNkFycmF5O1xyXG4gICAgY2FzZSAnZmxvYXQzMic6XHJcbiAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XHJcbiAgICBjYXNlICd1aW50OCc6XHJcbiAgICAgIHJldHVybiBVaW50OEFycmF5O1xyXG4gICAgY2FzZSAnaW50OCc6XHJcbiAgICAgIHJldHVybiBJbnQ4QXJyYXk7XHJcbiAgICBjYXNlICd1aW50MTYnOlxyXG4gICAgICByZXR1cm4gVWludDE2QXJyYXk7XHJcbiAgICBjYXNlICdpbnQxNic6XHJcbiAgICAgIHJldHVybiBJbnQxNkFycmF5O1xyXG4gICAgY2FzZSAnaW50MzInOlxyXG4gICAgICByZXR1cm4gSW50MzJBcnJheTtcclxuICAgIGNhc2UgJ2Jvb2wnOlxyXG4gICAgICByZXR1cm4gVWludDhBcnJheTtcclxuICAgIGNhc2UgJ2Zsb2F0NjQnOlxyXG4gICAgICByZXR1cm4gRmxvYXQ2NEFycmF5O1xyXG4gICAgY2FzZSAndWludDMyJzpcclxuICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xyXG4gICAgY2FzZSAnaW50NjQnOlxyXG4gICAgICByZXR1cm4gQmlnSW50NjRBcnJheTtcclxuICAgIGNhc2UgJ3VpbnQ2NCc6XHJcbiAgICAgIHJldHVybiBCaWdVaW50NjRBcnJheTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdHlwZTogJHt0eXBlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYXAgc3RyaW5nIGxvZyBsZXZlbCB0byBpbnRlZ2VyIHZhbHVlXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9nTGV2ZWxTdHJpbmdUb0VudW0gPSAobG9nTGV2ZWw/OiAndmVyYm9zZScgfCAnaW5mbycgfCAnd2FybmluZycgfCAnZXJyb3InIHwgJ2ZhdGFsJyk6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChsb2dMZXZlbCkge1xyXG4gICAgY2FzZSAndmVyYm9zZSc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnaW5mbyc6XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgY2FzZSAnd2FybmluZyc6XHJcbiAgICAgIHJldHVybiAyO1xyXG4gICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICByZXR1cm4gMztcclxuICAgIGNhc2UgJ2ZhdGFsJzpcclxuICAgICAgcmV0dXJuIDQ7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIGxvZ2dpbmcgbGV2ZWw6ICR7bG9nTGV2ZWx9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRlbnNvciB0eXBlIGlzIHN1cHBvcnRlZCBieSBHUFUgYnVmZmVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNHcHVCdWZmZXJTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuR3B1QnVmZmVyRGF0YVR5cGVzID0+XHJcbiAgdHlwZSA9PT0gJ2Zsb2F0MzInIHx8XHJcbiAgdHlwZSA9PT0gJ2Zsb2F0MTYnIHx8XHJcbiAgdHlwZSA9PT0gJ2ludDMyJyB8fFxyXG4gIHR5cGUgPT09ICdpbnQ2NCcgfHxcclxuICB0eXBlID09PSAndWludDMyJyB8fFxyXG4gIHR5cGUgPT09ICd1aW50OCcgfHxcclxuICB0eXBlID09PSAnYm9vbCcgfHxcclxuICB0eXBlID09PSAndWludDQnIHx8XHJcbiAgdHlwZSA9PT0gJ2ludDQnO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRlbnNvciB0eXBlIGlzIHN1cHBvcnRlZCBieSBXZWJOTiBNTFRlbnNvclxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzTUxUZW5zb3JTdXBwb3J0ZWRUeXBlID0gKHR5cGU6IFRlbnNvci5UeXBlKTogdHlwZSBpcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMgPT5cclxuICB0eXBlID09PSAnZmxvYXQzMicgfHxcclxuICB0eXBlID09PSAnZmxvYXQxNicgfHxcclxuICB0eXBlID09PSAnaW50MzInIHx8XHJcbiAgdHlwZSA9PT0gJ2ludDY0JyB8fFxyXG4gIHR5cGUgPT09ICd1aW50MzInIHx8XHJcbiAgdHlwZSA9PT0gJ3VpbnQ2NCcgfHxcclxuICB0eXBlID09PSAnaW50OCcgfHxcclxuICB0eXBlID09PSAndWludDgnIHx8XHJcbiAgdHlwZSA9PT0gJ2Jvb2wnIHx8XHJcbiAgdHlwZSA9PT0gJ3VpbnQ0JyB8fFxyXG4gIHR5cGUgPT09ICdpbnQ0JztcclxuXHJcbi8qKlxyXG4gKiBNYXAgc3RyaW5nIGRhdGEgbG9jYXRpb24gdG8gaW50ZWdlciB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSA9IChsb2NhdGlvbjogVGVuc29yLkRhdGFMb2NhdGlvbik6IG51bWJlciA9PiB7XHJcbiAgc3dpdGNoIChsb2NhdGlvbikge1xyXG4gICAgY2FzZSAnbm9uZSc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnY3B1JzpcclxuICAgICAgcmV0dXJuIDE7XHJcbiAgICBjYXNlICdjcHUtcGlubmVkJzpcclxuICAgICAgcmV0dXJuIDI7XHJcbiAgICBjYXNlICd0ZXh0dXJlJzpcclxuICAgICAgcmV0dXJuIDM7XHJcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcclxuICAgICAgcmV0dXJuIDQ7XHJcbiAgICBjYXNlICdtbC10ZW5zb3InOlxyXG4gICAgICByZXR1cm4gNTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgZGF0YSBsb2NhdGlvbjogJHtsb2NhdGlvbn1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogTWFwIGludGVnZXIgZGF0YSBsb2NhdGlvbiB0byBzdHJpbmcgdmFsdWVcclxuICovXHJcbmV4cG9ydCBjb25zdCBkYXRhTG9jYXRpb25FbnVtVG9TdHJpbmcgPSAobG9jYXRpb246IG51bWJlcik6IFRlbnNvci5EYXRhTG9jYXRpb24gfCB1bmRlZmluZWQgPT5cclxuICAoWydub25lJywgJ2NwdScsICdjcHUtcGlubmVkJywgJ3RleHR1cmUnLCAnZ3B1LWJ1ZmZlcicsICdtbC10ZW5zb3InXSBhcyBjb25zdClbbG9jYXRpb25dO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vd2FzbS11dGlscy1lbnYnO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgYSBmaWxlIGludG8gYSBVaW50OEFycmF5LlxyXG4gKlxyXG4gKiBAcGFyYW0gZmlsZSAtIHRoZSBmaWxlIHRvIGxvYWQuIENhbiBiZSBhIFVSTC9wYXRoLCBhIEJsb2IsIGFuIEFycmF5QnVmZmVyLCBvciBhIFVpbnQ4QXJyYXkuXHJcbiAqIEByZXR1cm5zIGEgVWludDhBcnJheSBjb250YWluaW5nIHRoZSBmaWxlIGRhdGEuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9hZEZpbGUgPSBhc3luYyAoZmlsZTogc3RyaW5nIHwgQmxvYiB8IEFycmF5QnVmZmVyTGlrZSB8IFVpbnQ4QXJyYXkpOiBQcm9taXNlPFVpbnQ4QXJyYXk+ID0+IHtcclxuICBpZiAodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgIC8vIGxvYWQgZmlsZSBpbnRvIEFycmF5QnVmZmVyIGluIE5vZGUuanNcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7IHJlYWRGaWxlIH0gPSByZXF1aXJlKCdub2RlOmZzL3Byb21pc2VzJyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IHJlYWRGaWxlKGZpbGUpKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlmIChlLmNvZGUgPT09ICdFUlJfRlNfRklMRV9UT09fTEFSR0UnKSB7XHJcbiAgICAgICAgICAvLyBmaWxlIGlzIHRvbyBsYXJnZSwgdXNlIGZzLmNyZWF0ZVJlYWRTdHJlYW0gaW5zdGVhZFxyXG4gICAgICAgICAgY29uc3QgeyBjcmVhdGVSZWFkU3RyZWFtIH0gPSByZXF1aXJlKCdub2RlOmZzJyk7XHJcbiAgICAgICAgICBjb25zdCBzdHJlYW0gPSBjcmVhdGVSZWFkU3RyZWFtKGZpbGUpO1xyXG4gICAgICAgICAgY29uc3QgY2h1bmtzOiBVaW50OEFycmF5W10gPSBbXTtcclxuICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShCdWZmZXIuY29uY2F0KGNodW5rcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBsb2FkIGZpbGUgaW50byBBcnJheUJ1ZmZlciBpbiBicm93c2Vyc1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZpbGUpO1xyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX1gKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb250ZW50TGVuZ3RoSGVhZGVyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtTGVuZ3RoJyk7XHJcbiAgICAgIGNvbnN0IGZpbGVTaXplID0gY29udGVudExlbmd0aEhlYWRlciA/IHBhcnNlSW50KGNvbnRlbnRMZW5ndGhIZWFkZXIsIDEwKSA6IDA7XHJcbiAgICAgIGlmIChmaWxlU2l6ZSA8IDEwNzM3NDE4MjQgLyogMUdCICovKSB7XHJcbiAgICAgICAgLy8gd2hlbiBDb250ZW50LUxlbmd0aCBoZWFkZXIgaXMgbm90IHNldCwgd2UgY2Fubm90IGRldGVybWluZSB0aGUgZmlsZSBzaXplLiBXZSBhc3N1bWUgaXQgaXMgc21hbGwgZW5vdWdoIHRvXHJcbiAgICAgICAgLy8gbG9hZCBpbnRvIG1lbW9yeS5cclxuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZmlsZSBpcyB0b28gbGFyZ2UsIHVzZSBzdHJlYW0gaW5zdGVhZFxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuYm9keSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmYWlsZWQgdG8gbG9hZCBleHRlcm5hbCBkYXRhIGZpbGU6ICR7ZmlsZX0sIG5vIHJlc3BvbnNlIGJvZHkuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XHJcblxyXG4gICAgICAgIGxldCBidWZmZXI7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIC8vIHRyeSB0byBjcmVhdGUgQXJyYXlCdWZmZXIgZGlyZWN0bHlcclxuICAgICAgICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihmaWxlU2l6ZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBSYW5nZUVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vIHVzZSBXZWJBc3NlbWJseSBNZW1vcnkgdG8gYWxsb2NhdGUgbGFyZ2VyIEFycmF5QnVmZmVyXHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VzID0gTWF0aC5jZWlsKGZpbGVTaXplIC8gNjU1MzYpO1xyXG4gICAgICAgICAgICBidWZmZXIgPSBuZXcgV2ViQXNzZW1ibHkuTWVtb3J5KHsgaW5pdGlhbDogcGFnZXMsIG1heGltdW06IHBhZ2VzIH0pLmJ1ZmZlcjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcclxuICAgICAgICAgIGlmIChkb25lKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgY2h1bmtTaXplID0gdmFsdWUuYnl0ZUxlbmd0aDtcclxuICAgICAgICAgIGNvbnN0IGNodW5rID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCBvZmZzZXQsIGNodW5rU2l6ZSk7XHJcbiAgICAgICAgICBjaHVuay5zZXQodmFsdWUpO1xyXG4gICAgICAgICAgb2Zmc2V0ICs9IGNodW5rU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgMCwgZmlsZVNpemUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgQmxvYikge1xyXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKSk7XHJcbiAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgcmV0dXJuIGZpbGU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShmaWxlKTtcclxuICB9XHJcbn07XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7IHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvciB9IGZyb20gJy4uL3dhc20tY29tbW9uJztcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVWaWV3ID0gKFxyXG4gIGRhdGFCdWZmZXI6IEFycmF5QnVmZmVyLFxyXG4gIHR5cGU6IFRlbnNvci5UeXBlLFxyXG4pOlxyXG4gIHwgSW50MzJBcnJheVxyXG4gIHwgVWludDMyQXJyYXlcclxuICB8IEJpZ0ludDY0QXJyYXlcclxuICB8IEJpZ1VpbnQ2NEFycmF5XHJcbiAgfCBVaW50OEFycmF5XHJcbiAgfCBGbG9hdDMyQXJyYXlcclxuICB8IEZsb2F0NjRBcnJheVxyXG4gIHwgSW50OEFycmF5XHJcbiAgfCBJbnQxNkFycmF5XHJcbiAgfCBVaW50MTZBcnJheSA9PiBuZXcgKHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlKSkoZGF0YUJ1ZmZlcik7XHJcblxyXG4vKipcclxuICogYSBUZW5zb3JWaWV3IGRvZXMgbm90IG93biB0aGUgZGF0YS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yVmlldyB7XHJcbiAgcmVhZG9ubHkgZGF0YTogbnVtYmVyO1xyXG4gIHJlYWRvbmx5IGRhdGFUeXBlOiBudW1iZXI7XHJcbiAgcmVhZG9ubHkgZGltczogcmVhZG9ubHkgbnVtYmVyW107XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBhIEZsb2F0MTZBcnJheSBkYXRhIHZpZXcgb2YgdGhlIHRlbnNvciBkYXRhLiB0ZW5zb3IgZGF0YSBtdXN0IGJlIG9uIENQVS5cclxuICAgKi9cclxuICBnZXRVaW50MTZBcnJheSgpOiBVaW50MTZBcnJheTtcclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGEgRmxvYXQzMkFycmF5IGRhdGEgdmlldyBvZiB0aGUgdGVuc29yIGRhdGEuIHRlbnNvciBkYXRhIG11c3QgYmUgb24gQ1BVLlxyXG4gICAqL1xyXG4gIGdldEZsb2F0MzJBcnJheSgpOiBGbG9hdDMyQXJyYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCBhIEJpZ0ludDY0QXJyYXkgZGF0YSB2aWV3IG9mIHRoZSB0ZW5zb3IgZGF0YS4gdGVuc29yIGRhdGEgbXVzdCBiZSBvbiBDUFUuXHJcbiAgICovXHJcbiAgZ2V0QmlnSW50NjRBcnJheSgpOiBCaWdJbnQ2NEFycmF5O1xyXG5cclxuICAvKipcclxuICAgKiBnZXQgYSBJbnQzMkFycmF5IGRhdGEgdmlldyBvZiB0aGUgdGVuc29yIGRhdGEuIHRlbnNvciBkYXRhIG11c3QgYmUgb24gQ1BVLlxyXG4gICAqL1xyXG4gIGdldEludDMyQXJyYXkoKTogSW50MzJBcnJheTtcclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IGEgVWludDE2QXJyYXkgZGF0YSB2aWV3IG9mIHRoZSB0ZW5zb3IgZGF0YS4gdGVuc29yIGRhdGEgbXVzdCBiZSBvbiBDUFUuXHJcbiAgICovXHJcbiAgZ2V0VWludDE2QXJyYXkoKTogVWludDE2QXJyYXk7XHJcblxyXG4gIC8qKlxyXG4gICAqIGNyZWF0ZSBhIG5ldyB0ZW5zb3IgdmlldyB3aXRoIHRoZSBzYW1lIGRhdGEgYnV0IGRpZmZlcmVudCBkaW1lbnNpb25zLlxyXG4gICAqL1xyXG4gIHJlc2hhcGUobmV3RGltczogcmVhZG9ubHkgbnVtYmVyW10pOiBUZW5zb3JWaWV3O1xyXG59XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgRW52IH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7IGxvZ0xldmVsU3RyaW5nVG9FbnVtIH0gZnJvbSAnLi4vd2FzbS1jb21tb24nO1xyXG5cclxudHlwZSBMb2dMZXZlbCA9IE5vbk51bGxhYmxlPEVudlsnbG9nTGV2ZWwnXT47XHJcbnR5cGUgTWVzc2FnZVN0cmluZyA9IHN0cmluZztcclxudHlwZSBNZXNzYWdlRnVuY3Rpb24gPSAoKSA9PiBzdHJpbmc7XHJcbnR5cGUgTWVzc2FnZSA9IE1lc3NhZ2VTdHJpbmcgfCBNZXNzYWdlRnVuY3Rpb247XHJcblxyXG5jb25zdCBsb2dMZXZlbFByZWZpeCA9IFsnVicsICdJJywgJ1cnLCAnRScsICdGJ107XHJcblxyXG5jb25zdCBkb0xvZyA9IChsZXZlbDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gIGNvbnNvbGUubG9nKGBbJHtsb2dMZXZlbFByZWZpeFtsZXZlbF19LCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfV0ke21lc3NhZ2V9YCk7XHJcbn07XHJcblxyXG5sZXQgY29uZmlnTG9nTGV2ZWw6IExvZ0xldmVsIHwgdW5kZWZpbmVkO1xyXG5sZXQgZGVidWc6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlndXJlTG9nZ2VyID0gKCRjb25maWdMb2dMZXZlbDogTG9nTGV2ZWwsICRkZWJ1ZzogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG4gIGNvbmZpZ0xvZ0xldmVsID0gJGNvbmZpZ0xvZ0xldmVsO1xyXG4gIGRlYnVnID0gJGRlYnVnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEEgc2ltcGxlIGxvZ2dpbmcgdXRpbGl0eSB0byBsb2cgbWVzc2FnZXMgdG8gdGhlIGNvbnNvbGUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTE9HID0gKGxvZ0xldmVsOiBMb2dMZXZlbCwgbXNnOiBNZXNzYWdlKTogdm9pZCA9PiB7XHJcbiAgY29uc3QgbWVzc2FnZUxldmVsID0gbG9nTGV2ZWxTdHJpbmdUb0VudW0obG9nTGV2ZWwpO1xyXG4gIGNvbnN0IGNvbmZpZ0xldmVsID0gbG9nTGV2ZWxTdHJpbmdUb0VudW0oY29uZmlnTG9nTGV2ZWwpO1xyXG4gIGlmIChtZXNzYWdlTGV2ZWwgPj0gY29uZmlnTGV2ZWwpIHtcclxuICAgIGRvTG9nKG1lc3NhZ2VMZXZlbCwgdHlwZW9mIG1zZyA9PT0gJ2Z1bmN0aW9uJyA/IG1zZygpIDogbXNnKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQSBzaW1wbGUgbG9nZ2luZyB1dGlsaXR5IHRvIGxvZyBtZXNzYWdlcyB0byB0aGUgY29uc29sZS4gT25seSBsb2dzIHdoZW4gZGVidWcgaXMgZW5hYmxlZC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBMT0dfREVCVUc6IHR5cGVvZiBMT0cgPSAoLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgTE9HPikgPT4ge1xyXG4gIGlmIChkZWJ1Zykge1xyXG4gICAgTE9HKC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG5pbXBvcnQgeyBXZWJOTkJhY2tlbmQgfSBmcm9tICcuLi9iYWNrZW5kLXdlYm5uJztcclxuaW1wb3J0IHsgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yIH0gZnJvbSAnLi4vLi4vd2FzbS1jb21tb24nO1xyXG5pbXBvcnQgeyBMT0dfREVCVUcgfSBmcm9tICcuLi9sb2cnO1xyXG5cclxuLy8gV2ViTk4gQVBJIGN1cnJlbnRseSBkb2VzIG5vdCBoYXZlIGEgVHlwZVNjcmlwdCBkZWZpbml0aW9uIGZpbGUuIFRoaXMgZmlsZSBpcyBhIHdvcmthcm91bmQgd2l0aCB0eXBlcyBnZW5lcmF0ZWQgZnJvbVxyXG4vLyBXZWJOTiBBUEkgc3BlY2lmaWNhdGlvbi5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYm1hY2hpbmVsZWFybmluZy93ZWJubi9pc3N1ZXMvNjc3XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ3ZWJubi5kLnRzXCIgLz5cclxuXHJcbi8qKlxyXG4gKiBNYXAgZnJvbSBNTE9wZXJhbmREYXRhVHlwZSB0byBzaXplIGluIGJpdHMuIFVzaW5nIGJpdHMgaW5zdGVhZCBvZiBieXRlcyB0byBhdm9pZCBwb3NzaWJsZSBwcmVjaXNpb24gbG9zcyBvbiBpbnQ0IGFuZCB1aW50NC5cclxuICovXHJcbmNvbnN0IHdlYm5uRGF0YVR5cGVUb1NpemUgPSBuZXcgTWFwPE1MT3BlcmFuZERhdGFUeXBlLCBudW1iZXI+KFtcclxuICBbJ2Zsb2F0MzInLCAzMl0sXHJcbiAgWydmbG9hdDE2JywgMTZdLFxyXG4gIFsnaW50MzInLCAzMl0sXHJcbiAgWyd1aW50MzInLCAzMl0sXHJcbiAgWydpbnQ2NCcsIDY0XSxcclxuICBbJ3VpbnQ2NCcsIDY0XSxcclxuICBbJ2ludDgnLCA4XSxcclxuICBbJ3VpbnQ4JywgOF0sXHJcbiAgWydpbnQ0JywgNF0sXHJcbiAgWyd1aW50NCcsIDRdLFxyXG5dKTtcclxuXHJcbi8vIENvbnZlcnQgaW50ZWdlciBkYXRhIHRvIGFuIEludDMyQXJyYXkgYnVmZmVyLlxyXG4vLyBTdXBwb3J0cyBjb252ZXJzaW9uIGZyb20gaW50NjQsIHVpbnQ2NCwgdWludDMyLCBpbnQ4IGFuZCB1aW50OCB0byBpbnQzMi5cclxuZXhwb3J0IGNvbnN0IGNvbnZlcnREYXRhVG9JbnQzMiA9IChkYXRhOiBVaW50OEFycmF5LCBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGUpOiBVaW50OEFycmF5ID0+IHtcclxuICBpZiAoZGF0YVR5cGUgPT09ICdpbnQzMicpIHtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGF0YVR5cGVTaXplID0gd2Vibm5EYXRhVHlwZVRvU2l6ZS5nZXQoZGF0YVR5cGUpO1xyXG4gIGlmICghZGF0YVR5cGVTaXplKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYk5OIGJhY2tlbmQgZG9lcyBub3Qgc3VwcG9ydCBkYXRhIHR5cGU6ICR7ZGF0YVR5cGV9YCk7XHJcbiAgfVxyXG4gIGNvbnN0IGJ5dGVzUGVyRWxlbWVudCA9IGRhdGFUeXBlU2l6ZSAvIDg7XHJcbiAgLy8gTWFrZSBzdXJlIHRoZSBkYXRhIGxlbmd0aCBpcyBhIG11bHRpcGxlIG9mIHRoZSBkYXRhIHR5cGUgc2l6ZS5cclxuICBpZiAoZGF0YS5ieXRlTGVuZ3RoICUgYnl0ZXNQZXJFbGVtZW50ICE9PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgVWludDhBcnJheSBsZW5ndGggLSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgJHtieXRlc1BlckVsZW1lbnR9LmApO1xyXG4gIH1cclxuXHJcbiAgLy8gQ29udmVydCBVaW50OEFycmF5IHRvIG9yaWdpbmFsIHR5cGVkIGFycmF5LlxyXG4gIGNvbnN0IG51bUVsZW1lbnRzID0gZGF0YS5ieXRlTGVuZ3RoIC8gYnl0ZXNQZXJFbGVtZW50O1xyXG4gIGNvbnN0IG9yaWdpbmFsQXJyYXkgPSBuZXcgKHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3RvcihkYXRhVHlwZSkpKFxyXG4gICAgZGF0YS5idWZmZXIgYXMgQXJyYXlCdWZmZXIsXHJcbiAgICBkYXRhLmJ5dGVPZmZzZXQsXHJcbiAgICBudW1FbGVtZW50cyxcclxuICApO1xyXG5cclxuICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICBjYXNlICdpbnQ2NCc6XHJcbiAgICBjYXNlICd1aW50NjQnOiB7XHJcbiAgICAgIC8vIENvbnZlcnQgb3JpZ2luYWwgdHlwZWQgYXJyYXkgdG8gSW50MzJBcnJheS5cclxuICAgICAgY29uc3QgaW50MzJBcnJheSA9IG5ldyBJbnQzMkFycmF5KG51bUVsZW1lbnRzKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1FbGVtZW50czsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvcmlnaW5hbEFycmF5W2ldO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Igb3ZlcmZsb3cuXHJcbiAgICAgICAgaWYgKHZhbHVlID4gMjE0NzQ4MzY0N24gfHwgdmFsdWUgPCAtMjE0NzQ4MzY0OG4pIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCBjb252ZXJ0IGludDY0IGRhdGEgdG8gaW50MzIgLSB2YWx1ZSBvdXQgb2YgcmFuZ2UuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQzMkFycmF5W2ldID0gTnVtYmVyKHZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGludDMyQXJyYXkuYnVmZmVyKTtcclxuICAgIH1cclxuICAgIGNhc2UgJ2ludDgnOlxyXG4gICAgY2FzZSAndWludDgnOlxyXG4gICAgY2FzZSAndWludDMyJzoge1xyXG4gICAgICAvLyBDaGVjayBmb3Igb3ZlcmZsb3cuXHJcbiAgICAgIGlmIChkYXRhVHlwZSA9PT0gJ3VpbnQzMicpIHtcclxuICAgICAgICBpZiAob3JpZ2luYWxBcnJheS5zb21lKCh2YWx1ZSkgPT4gdmFsdWUgPiAyMTQ3NDgzNjQ3KSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IGNvbnZlcnQgdWludDMyIGRhdGEgdG8gaW50MzIgLSB2YWx1ZSBvdXQgb2YgcmFuZ2UuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENvbnZlcnQgb3JpZ2luYWwgdHlwZWQgYXJyYXkgdG8gSW50MzJBcnJheS5cclxuICAgICAgY29uc3QgaW50MzJBcnJheSA9IEludDMyQXJyYXkuZnJvbShvcmlnaW5hbEFycmF5LCBOdW1iZXIpO1xyXG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoaW50MzJBcnJheS5idWZmZXIpO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBkYXRhIGNvbnZlcnNpb24gZnJvbSAke2RhdGFUeXBlfSB0byAnaW50MzInYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gQ29udmVydCBJbnQzMkFycmF5IGRhdGEgdG8gb3JpZ2luYWwgaW50ZWdlciBkYXRhIGJ1ZmZlci5cclxuLy8gU3VwcG9ydHMgY29udmVyc2lvbiBmcm9tIGludDMyIHRvIGludDY0LCB1aW50NjQsIHVpbnQzMiwgaW50OCBhbmQgdWludDguXHJcbmV4cG9ydCBjb25zdCBjb252ZXJ0SW50MzJUb0RhdGEgPSAoZGF0YTogVWludDhBcnJheSwgZGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlKTogVWludDhBcnJheSA9PiB7XHJcbiAgaWYgKGRhdGFUeXBlID09PSAnaW50MzInKSB7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB0aGUgZGF0YSBsZW5ndGggaXMgYSBtdWx0aXBsZSBvZiA0IGJ5dGVzIChJbnQzMkFycmF5KS5cclxuICBpZiAoZGF0YS5ieXRlTGVuZ3RoICUgNCAhPT0gMCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFVpbnQ4QXJyYXkgbGVuZ3RoIC0gbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQgKGludDMyKS4nKTtcclxuICB9XHJcblxyXG4gIC8vIENvbnZlcnQgVWludDhBcnJheSB0byBJbnQzMkFycmF5LlxyXG4gIGNvbnN0IG51bUVsZW1lbnRzID0gZGF0YS5ieXRlTGVuZ3RoIC8gNDtcclxuICBjb25zdCBpbnQzMkFycmF5ID0gbmV3IEludDMyQXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgbnVtRWxlbWVudHMpO1xyXG5cclxuICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICBjYXNlICdpbnQ2NCc6IHtcclxuICAgICAgY29uc3QgYmlnSW50NjRBcnJheSA9IEJpZ0ludDY0QXJyYXkuZnJvbShpbnQzMkFycmF5LCBCaWdJbnQpO1xyXG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoYmlnSW50NjRBcnJheS5idWZmZXIpO1xyXG4gICAgfVxyXG4gICAgY2FzZSAndWludDY0Jzoge1xyXG4gICAgICBpZiAoaW50MzJBcnJheS5zb21lKCh2YWx1ZSkgPT4gdmFsdWUgPCAwKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBjb252ZXJ0IGludDMyIGRhdGEgdG8gdWluNjQgLSBuZWdhdGl2ZSB2YWx1ZSBmb3VuZC4nKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBiaWdVaW50NjRBcnJheSA9IEJpZ1VpbnQ2NEFycmF5LmZyb20oaW50MzJBcnJheSwgQmlnSW50KTtcclxuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGJpZ1VpbnQ2NEFycmF5LmJ1ZmZlcik7XHJcbiAgICB9XHJcbiAgICBjYXNlICdpbnQ4Jzoge1xyXG4gICAgICBpZiAoaW50MzJBcnJheS5zb21lKCh2YWx1ZSkgPT4gdmFsdWUgPCAtMTI4IHx8IHZhbHVlID4gMTI3KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBjb252ZXJ0IGludDMyIGRhdGEgdG8gaW50OCAtIHZhbHVlIG91dCBvZiByYW5nZS4nKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBpbnQ4QXJyYXkgPSBJbnQ4QXJyYXkuZnJvbShpbnQzMkFycmF5LCBOdW1iZXIpO1xyXG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoaW50OEFycmF5LmJ1ZmZlcik7XHJcbiAgICB9XHJcbiAgICBjYXNlICd1aW50OCc6IHtcclxuICAgICAgaWYgKGludDMyQXJyYXkuc29tZSgodmFsdWUpID0+IHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDI1NSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgY29udmVydCBpbnQzMiBkYXRhIHRvIHVpbnQ4IC0gdmFsdWUgb3V0IG9mIHJhbmdlLicpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBVaW50OEFycmF5LmZyb20oaW50MzJBcnJheSwgTnVtYmVyKTtcclxuICAgIH1cclxuICAgIGNhc2UgJ3VpbnQzMic6IHtcclxuICAgICAgaWYgKGludDMyQXJyYXkuc29tZSgodmFsdWUpID0+IHZhbHVlIDwgMCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgY29udmVydCBpbnQzMiBkYXRhIHRvIHVpbnQzMiAtIG5lZ2F0aXZlIHZhbHVlIGZvdW5kLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHVpbnQzMkFycmF5ID0gVWludDMyQXJyYXkuZnJvbShpbnQzMkFycmF5LCBOdW1iZXIpO1xyXG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkodWludDMyQXJyYXkuYnVmZmVyKTtcclxuICAgIH1cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSBjb252ZXJzaW9uIGZyb20gJ2ludDMyJyB0byAke2RhdGFUeXBlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRlbnNvcklkID0gbnVtYmVyO1xyXG5cclxuLyoqXHJcbiAqIE1hbmFnZXMgVGVuc29ySWQgdG8gTUxUZW5zb3IgbWFwcGluZy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGVuc29yTWFuYWdlciB7XHJcbiAgLyoqXHJcbiAgICogUmVzZXJ2ZSBhIG5ldyBUZW5zb3JJZC5cclxuICAgKi9cclxuICByZXNlcnZlVGVuc29ySWQoKTogVGVuc29ySWQ7XHJcbiAgLyoqXHJcbiAgICogUmVsZWFzZSBhIFRlbnNvcklkLlxyXG4gICAqL1xyXG4gIHJlbGVhc2VUZW5zb3JJZCh0ZW5zb3JJZDogVGVuc29ySWQpOiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIEVuc3VyZSBhIE1MVGVuc29yIGlzIGNyZWF0ZWQgZm9yIHRoZSBUZW5zb3JJZC5cclxuICAgKi9cclxuICBlbnN1cmVUZW5zb3IoXHJcbiAgICBzZXNzaW9uSWQ6IG51bWJlcixcclxuICAgIHRlbnNvcklkOiBUZW5zb3JJZCxcclxuICAgIGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSxcclxuICAgIHNoYXBlOiByZWFkb25seSBudW1iZXJbXSxcclxuICAgIGNvcHlPbGQ6IGJvb2xlYW4sXHJcbiAgKTogUHJvbWlzZTxNTFRlbnNvcj47XHJcbiAgLyoqXHJcbiAgICogVXBsb2FkIGRhdGEgdG8gYSBNTFRlbnNvci5cclxuICAgKi9cclxuICB1cGxvYWQodGVuc29ySWQ6IFRlbnNvcklkLCBkYXRhOiBVaW50OEFycmF5KTogdm9pZDtcclxuICAvKipcclxuICAgKiBEb3dubG9hZCBkYXRhIGZyb20gYSBNTFRlbnNvci5cclxuICAgKi9cclxuICBkb3dubG9hZCh0ZW5zb3JJZDogVGVuc29ySWQpOiBQcm9taXNlPEFycmF5QnVmZmVyPjtcclxuICBkb3dubG9hZCh0ZW5zb3JJZDogVGVuc29ySWQsIGRzdFRlbnNvcjogQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPHVuZGVmaW5lZD47XHJcbiAgLyoqXHJcbiAgICogUmVsZWFzZSBhbGwgdGVuc29ycyBmb3IgYSBnaXZlbiBzZXNzaW9uLlxyXG4gICAqL1xyXG4gIHJlbGVhc2VUZW5zb3JzRm9yU2Vzc2lvbihzZXNzaW9uOiBudW1iZXIpOiB2b2lkO1xyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGFuIGV4dGVybmFsbHkgY3JlYXRlZCBNTFRlbnNvciB3aXRoIGEgZ2l2ZW4gc2Vzc2lvbiBpZCBhbmQgcmV0dXJuIGEgVGVuc29ySWQuXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJUZW5zb3Ioc2Vzc2lvbklkOiBudW1iZXIsIG1sVGVuc29yOiBNTFRlbnNvciwgZGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlLCBzaGFwZTogbnVtYmVyW10pOiBUZW5zb3JJZDtcclxufVxyXG5cclxubGV0IHRlbnNvckd1aWQgPSAxO1xyXG5jb25zdCBjcmVhdGVOZXdUZW5zb3JJZCA9ICgpOiBUZW5zb3JJZCA9PiB0ZW5zb3JHdWlkKys7XHJcblxyXG4vKipcclxuICogTWFwIGZyb20gZGF0YSB0eXBlIHRvIGZhbGxiYWNrIGRhdGEgdHlwZS5cclxuICogV2hlbiB0aGUgY29udGV4dCBkb2VzIG5vdCBzdXBwb3J0IHRoZSBvcmlnaW5hbCBkYXRhIHR5cGUsIHVzZSBmYWxsYmFjayBkYXRhIHR5cGUgYXMgd29ya2Fyb3VuZC5cclxuICogTm90ZTogQ3VycmVudGx5LCB3ZSBvbmx5IHN1cHBvcnQgZmFsbGJhY2sgdG8gaW50MzIgZm9yIGNlcnRhaW4gaW50ZWdlciBkYXRhIHR5cGVzLlxyXG4gKi9cclxuY29uc3Qgd2Vibm5EYXRhVHlwZVRvRmFsbGJhY2sgPSBuZXcgTWFwPE1MT3BlcmFuZERhdGFUeXBlLCBNTE9wZXJhbmREYXRhVHlwZT4oW1xyXG4gIFsnaW50OCcsICdpbnQzMiddLFxyXG4gIFsndWludDgnLCAnaW50MzInXSxcclxuICBbJ3VpbnQzMicsICdpbnQzMiddLFxyXG4gIFsnaW50NjQnLCAnaW50MzInXSxcclxuXSk7XHJcblxyXG4vKipcclxuICogQ2FsY3VsYXRlIHRoZSBieXRlIGxlbmd0aCBvZiBhIHRlbnNvciB3aXRoIHRoZSBnaXZlbiBkYXRhIHR5cGUgYW5kIHNoYXBlLlxyXG4gKi9cclxuY29uc3QgY2FsY3VsYXRlQnl0ZUxlbmd0aCA9IChkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGUsIHNoYXBlOiByZWFkb25seSBudW1iZXJbXSk6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgZGF0YVR5cGVTaXplID0gd2Vibm5EYXRhVHlwZVRvU2l6ZS5nZXQoZGF0YVR5cGUpO1xyXG4gIGlmICghZGF0YVR5cGVTaXplKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFdlYk5OIGJhY2tlbmQgZG9lcyBub3Qgc3VwcG9ydCBkYXRhIHR5cGU6ICR7ZGF0YVR5cGV9YCk7XHJcbiAgfVxyXG4gIHJldHVybiBzaGFwZS5sZW5ndGggPiAwID8gTWF0aC5jZWlsKChzaGFwZS5yZWR1Y2UoKGEsIGIpID0+IGEgKiBiKSAqIGRhdGFUeXBlU2l6ZSkgLyA4KSA6IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVuc29yV3JhcHBlciB3cmFwcyBhbiBNTFRlbnNvciBhbmQgcHJvdmlkZXMgYSB3YXkgdG8gdHJhY2sgdGhlIGxhc3Qgc2Vzc2lvbiB0aGF0IHVzZWQgaXQuXHJcbiAqL1xyXG5jbGFzcyBUZW5zb3JXcmFwcGVyIHtcclxuICAvLyBUaGUgaWQgb2YgdGhlIGxhc3Qgc2Vzc2lvbiB0aGF0IHVzZWQgdGhpcyB0ZW5zb3IuXHJcbiAgcHVibGljIHNlc3Npb25JZDogbnVtYmVyO1xyXG4gIC8vIFRoaXMgZmxhZyBpcyB1c2VkIHRvIGluZGljYXRlIHdoZXRoZXIgdGhlIGRhdGEgaGFzIGJlZW4gY29udmVydGVkIHRvIGZhbGxiYWNrIGRhdGEgdHlwZS5cclxuICBwdWJsaWMgaXNEYXRhQ29udmVydGVkID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgbWxDb250ZXh0OiBNTENvbnRleHQ7XHJcbiAgcHJpdmF0ZSBtbFRlbnNvcjogTUxUZW5zb3I7XHJcbiAgcHJpdmF0ZSBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGU7XHJcbiAgLy8gRmFsbGJhY2sgZGF0YSB0eXBlIHRvIHVzZSB3aGVuIHRoZSBjb250ZXh0IGRvZXMgbm90IHN1cHBvcnQgdGhlIG9yaWdpbmFsIGRhdGEgdHlwZS5cclxuICBwcml2YXRlIGZhbGxiYWNrRGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlIHwgdW5kZWZpbmVkO1xyXG4gIHByaXZhdGUgdGVuc29yU2hhcGU6IHJlYWRvbmx5IG51bWJlcltdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdG9yOiB7XHJcbiAgICBzZXNzaW9uSWQ6IG51bWJlcjtcclxuICAgIGNvbnRleHQ6IE1MQ29udGV4dDtcclxuICAgIHRlbnNvcjogTUxUZW5zb3I7XHJcbiAgICBkYXRhVHlwZTogTUxPcGVyYW5kRGF0YVR5cGU7XHJcbiAgICBzaGFwZTogcmVhZG9ubHkgbnVtYmVyW107XHJcbiAgICBmYWxsYmFja0RhdGFUeXBlPzogTUxPcGVyYW5kRGF0YVR5cGU7XHJcbiAgfSkge1xyXG4gICAgY29uc3QgeyBzZXNzaW9uSWQsIGNvbnRleHQsIHRlbnNvciwgZGF0YVR5cGUsIHNoYXBlLCBmYWxsYmFja0RhdGFUeXBlIH0gPSBkZXNjcmlwdG9yO1xyXG4gICAgdGhpcy5zZXNzaW9uSWQgPSBzZXNzaW9uSWQ7XHJcbiAgICB0aGlzLm1sQ29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLm1sVGVuc29yID0gdGVuc29yO1xyXG4gICAgdGhpcy5kYXRhVHlwZSA9IGRhdGFUeXBlO1xyXG4gICAgdGhpcy50ZW5zb3JTaGFwZSA9IHNoYXBlO1xyXG4gICAgdGhpcy5mYWxsYmFja0RhdGFUeXBlID0gZmFsbGJhY2tEYXRhVHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdGVuc29yKCk6IE1MVGVuc29yIHtcclxuICAgIHJldHVybiB0aGlzLm1sVGVuc29yO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IE1MT3BlcmFuZERhdGFUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmYWxsYmFja1R5cGUoKTogTUxPcGVyYW5kRGF0YVR5cGUgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuZmFsbGJhY2tEYXRhVHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2hhcGUoKTogcmVhZG9ubHkgbnVtYmVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMudGVuc29yU2hhcGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGJ5dGVMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBjYWxjdWxhdGVCeXRlTGVuZ3RoKHRoaXMuZGF0YVR5cGUsIHRoaXMudGVuc29yU2hhcGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBMT0dfREVCVUcoJ3ZlcmJvc2UnLCAoKSA9PiAnW1dlYk5OXSBUZW5zb3JXcmFwcGVyLmRlc3Ryb3knKTtcclxuICAgIHRoaXMubWxUZW5zb3IuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHdyaXRlKGRhdGE6IFVpbnQ4QXJyYXkpOiB2b2lkIHtcclxuICAgIHRoaXMubWxDb250ZXh0LndyaXRlVGVuc29yKHRoaXMubWxUZW5zb3IsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIHJlYWQoKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj47XHJcbiAgcHVibGljIGFzeW5jIHJlYWQoZHN0QnVmZmVyPzogQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPEFycmF5QnVmZmVyIHwgdW5kZWZpbmVkPjtcclxuICBwdWJsaWMgYXN5bmMgcmVhZChkc3RCdWZmZXI/OiBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlcik6IFByb21pc2U8QXJyYXlCdWZmZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIGlmICh0aGlzLmZhbGxiYWNrRGF0YVR5cGUpIHtcclxuICAgICAgLy8gVGhpcyB0ZW5zb3IgaGFzIGJlZW4gZmFsbGJhY2sgdG8gaW50MzIgYXMgd29ya2Fyb3VuZCwgd2UgbmVlZCB0byByZWFkIGl0IGFzIGl0cyBvcmlnaW5hbCBpbnRlZ2VyIGRhdGEgdHlwZS5cclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMubWxDb250ZXh0LnJlYWRUZW5zb3IodGhpcy5tbFRlbnNvcik7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsRGF0YSA9IGNvbnZlcnRJbnQzMlRvRGF0YShuZXcgVWludDhBcnJheShkYXRhKSwgdGhpcy5kYXRhVHlwZSk7XHJcblxyXG4gICAgICBpZiAoZHN0QnVmZmVyKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0QnVmZmVyID1cclxuICAgICAgICAgIGRzdEJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyXHJcbiAgICAgICAgICAgID8gbmV3IFVpbnQ4QXJyYXkoZHN0QnVmZmVyKVxyXG4gICAgICAgICAgICA6IG5ldyBVaW50OEFycmF5KGRzdEJ1ZmZlci5idWZmZXIsIGRzdEJ1ZmZlci5ieXRlT2Zmc2V0LCBkc3RCdWZmZXIuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgdGFyZ2V0QnVmZmVyLnNldChvcmlnaW5hbERhdGEpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KG9yaWdpbmFsRGF0YSkuYnVmZmVyO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZHN0QnVmZmVyID8gdGhpcy5tbENvbnRleHQucmVhZFRlbnNvcih0aGlzLm1sVGVuc29yLCBkc3RCdWZmZXIpIDogdGhpcy5tbENvbnRleHQucmVhZFRlbnNvcih0aGlzLm1sVGVuc29yKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjYW5SZXVzZVRlbnNvcihjb250ZXh0OiBNTENvbnRleHQsIGRhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSwgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLm1sQ29udGV4dCA9PT0gY29udGV4dCAmJlxyXG4gICAgICB0aGlzLmRhdGFUeXBlID09PSBkYXRhVHlwZSAmJlxyXG4gICAgICB0aGlzLnRlbnNvclNoYXBlLmxlbmd0aCA9PT0gc2hhcGUubGVuZ3RoICYmXHJcbiAgICAgIHRoaXMudGVuc29yU2hhcGUuZXZlcnkoKHYsIGkpID0+IHYgPT09IHNoYXBlW2ldKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRJc0RhdGFDb252ZXJ0ZWQoaXNDb252ZXJ0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuaXNEYXRhQ29udmVydGVkID0gaXNDb252ZXJ0ZWQ7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGVuc29yVHJhY2tlciB0cmFja3MgdGhlIE1MVGVuc29yIGFuZCBwZW5kaW5nIHVwbG9hZCBkYXRhLlxyXG4gKlxyXG4gKiBXZSBuZWVkIHRvIHRyYWNrIHRoZSBNTFRlbnNvciBhbmQgcGVuZGluZyB1cGxvYWQgZGF0YSBiZWNhdXNlIHdlIGRlbGF5IHRoZSBjcmVhdGlvbiBvZiBNTFRlbnNvciB1bnRpbFxyXG4gKiB3ZSBrbm93IHRoZSBkYXRhIHR5cGUgYW5kIHNoYXBlLiBUaGlzIGlzIGJlY2F1c2UgV2ViTk4gb25seSBzdXBwb3J0IGNyZWF0aW5nIE1MVGVuc29ycyB3aXRoIGRhdGFUeXBlcyBhbmQgc2hhcGUuXHJcbiAqL1xyXG5jbGFzcyBUZW5zb3JJZFRyYWNrZXIge1xyXG4gIHByaXZhdGUgYWN0aXZlVXBsb2FkPzogVWludDhBcnJheTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHRlbnNvck1hbmFnZXI6IFRlbnNvck1hbmFnZXJJbXBsLFxyXG4gICAgcHJpdmF0ZSB3cmFwcGVyPzogVGVuc29yV3JhcHBlcixcclxuICApIHt9XHJcblxyXG4gIHB1YmxpYyBnZXQgdGVuc29yV3JhcHBlcigpOiBUZW5zb3JXcmFwcGVyIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLndyYXBwZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsZWFzZVRlbnNvcigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRlbnNvcldyYXBwZXIpIHtcclxuICAgICAgdGhpcy50ZW5zb3JNYW5hZ2VyLnJlbGVhc2VUZW5zb3IodGhpcy50ZW5zb3JXcmFwcGVyKTtcclxuICAgICAgdGhpcy53cmFwcGVyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGVuc3VyZVRlbnNvcihcclxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxyXG4gICAgZGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlLFxyXG4gICAgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdLFxyXG4gICAgY29weU9sZDogYm9vbGVhbixcclxuICApOiBQcm9taXNlPE1MVGVuc29yPiB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy50ZW5zb3JNYW5hZ2VyLmdldE1MQ29udGV4dChzZXNzaW9uSWQpO1xyXG4gICAgY29uc3Qgb3BMaW1pdHMgPSB0aGlzLnRlbnNvck1hbmFnZXIuZ2V0TUxPcFN1cHBvcnRMaW1pdHMoc2Vzc2lvbklkKTtcclxuICAgIGxldCBmYWxsYmFja0RhdGFUeXBlOiBNTE9wZXJhbmREYXRhVHlwZSB8IHVuZGVmaW5lZDtcclxuICAgIC8vIENoZWNrIGlmIHRoZSBjb250ZXh0IHN1cHBvcnRzIHRoZSBkYXRhIHR5cGUuIElmIG5vdCwgdHJ5IHRvIHVzZSB0aGUgZmFsbGJhY2sgZGF0YSB0eXBlLlxyXG4gICAgaWYgKCFvcExpbWl0cz8uaW5wdXQuZGF0YVR5cGVzLmluY2x1ZGVzKGRhdGFUeXBlKSkge1xyXG4gICAgICBmYWxsYmFja0RhdGFUeXBlID0gd2Vibm5EYXRhVHlwZVRvRmFsbGJhY2suZ2V0KGRhdGFUeXBlKTtcclxuICAgICAgaWYgKCFmYWxsYmFja0RhdGFUeXBlIHx8ICFvcExpbWl0cz8uaW5wdXQuZGF0YVR5cGVzLmluY2x1ZGVzKGZhbGxiYWNrRGF0YVR5cGUpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBXZWJOTiBiYWNrZW5kIGRvZXMgbm90IHN1cHBvcnQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfWApO1xyXG4gICAgICB9XHJcbiAgICAgIExPR19ERUJVRyhcclxuICAgICAgICAndmVyYm9zZScsXHJcbiAgICAgICAgKCkgPT4gYFtXZWJOTl0gVGVuc29ySWRUcmFja2VyLmVuc3VyZVRlbnNvcjogZmFsbGJhY2sgZGF0YVR5cGUgZnJvbSAke2RhdGFUeXBlfSB0byAke2ZhbGxiYWNrRGF0YVR5cGV9YCxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy53cmFwcGVyKSB7XHJcbiAgICAgIGlmICh0aGlzLndyYXBwZXIuY2FuUmV1c2VUZW5zb3IoY29udGV4dCwgZGF0YVR5cGUsIHNoYXBlKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZXIudGVuc29yO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChjb3B5T2xkKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy53cmFwcGVyLmJ5dGVMZW5ndGggIT09IGNhbGN1bGF0ZUJ5dGVMZW5ndGgoZGF0YVR5cGUsIHNoYXBlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjb3B5IGRhdGEgdG8gdGVuc29yIHdpdGggZGlmZmVyZW50IHNpemUuJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZVVwbG9hZCA9IG5ldyBVaW50OEFycmF5KGF3YWl0IHRoaXMud3JhcHBlci5yZWFkKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRlbnNvck1hbmFnZXIucmVsZWFzZVRlbnNvcih0aGlzLndyYXBwZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcclxuICAgIGNvbnN0IHVzYWdlID0gdHlwZW9mIE1MVGVuc29yVXNhZ2UgPT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBNTFRlbnNvclVzYWdlLlJFQUQgfCBNTFRlbnNvclVzYWdlLldSSVRFO1xyXG4gICAgdGhpcy53cmFwcGVyID0gYXdhaXQgdGhpcy50ZW5zb3JNYW5hZ2VyLmdldENhY2hlZFRlbnNvcihcclxuICAgICAgc2Vzc2lvbklkLFxyXG4gICAgICBkYXRhVHlwZSxcclxuICAgICAgc2hhcGUsXHJcbiAgICAgIHVzYWdlLFxyXG4gICAgICB0cnVlLFxyXG4gICAgICB0cnVlLFxyXG4gICAgICBmYWxsYmFja0RhdGFUeXBlLFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoY29weU9sZCAmJiB0aGlzLmFjdGl2ZVVwbG9hZCkge1xyXG4gICAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGNvbnZlcnQgdGhlIG9yaWdpbmFsIGludGVnZXIgZGF0YSB0byBpbnQzMixcclxuICAgICAgLy8gYmVjYXVzZSBpdCBoYXMgYmVlbiBjb252ZXJ0ZWQgd2hlbiBpdCB3YXMgdXBsb2FkZWQuXHJcbiAgICAgIHRoaXMud3JhcHBlci53cml0ZSh0aGlzLmFjdGl2ZVVwbG9hZCk7XHJcbiAgICAgIHRoaXMuYWN0aXZlVXBsb2FkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLndyYXBwZXIudGVuc29yO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwbG9hZChkYXRhOiBVaW50OEFycmF5KTogdm9pZCB7XHJcbiAgICBsZXQgbmV3RGF0YSA9IGRhdGE7XHJcbiAgICBpZiAodGhpcy53cmFwcGVyKSB7XHJcbiAgICAgIGlmICh0aGlzLndyYXBwZXIuZmFsbGJhY2tUeXBlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlci5mYWxsYmFja1R5cGUgPT09ICdpbnQzMicpIHtcclxuICAgICAgICAgIC8vIENvbnZlcnQgb3JpZ2luYWwgaW50ZWdlciBkYXRhIHRvIGludDMyLlxyXG4gICAgICAgICAgbmV3RGF0YSA9IGNvbnZlcnREYXRhVG9JbnQzMihkYXRhLCB0aGlzLndyYXBwZXIudHlwZSk7XHJcbiAgICAgICAgICB0aGlzLndyYXBwZXIuc2V0SXNEYXRhQ29udmVydGVkKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGZhbGxiYWNrIGRhdGEgdHlwZTogJHt0aGlzLndyYXBwZXIuZmFsbGJhY2tUeXBlfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIGRhdGEgc2l6ZSBtYXRjaGVzIHRoZSB0ZW5zb3Igc2l6ZS5cclxuICAgICAgaWYgKGRhdGEuYnl0ZUxlbmd0aCA9PT0gdGhpcy53cmFwcGVyLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAvLyBXcml0ZSB0aGUgbmV3RGF0YSB0byB0aGUgdGVuc29yLlxyXG4gICAgICAgIHRoaXMud3JhcHBlci53cml0ZShuZXdEYXRhKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gJ0RhdGEgc2l6ZSBkb2VzIG5vdCBtYXRjaCB0ZW5zb3Igc2l6ZS4gUmVsZWFzaW5nIHRlbnNvci4nKTtcclxuICAgICAgICB0aGlzLnJlbGVhc2VUZW5zb3IoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmFjdGl2ZVVwbG9hZCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVVwbG9hZC5zZXQobmV3RGF0YSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFjdGl2ZVVwbG9hZCA9IG5ldyBVaW50OEFycmF5KG5ld0RhdGEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRvd25sb2FkKGRzdEJ1ZmZlcj86IEFycmF5QnVmZmVyVmlldyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcnJheUJ1ZmZlciB8IHVuZGVmaW5lZD4ge1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlVXBsb2FkKSB7XHJcbiAgICAgIC8vIElmIHRoaXMuYWN0aXZlVXBsb2FkIGhhcyBiZWVuIGNvbnZlcnRlZCB0byBpbnQzMiwgd2UgbmVlZCB0byBjb252ZXJ0IGl0IGJhY2sgdG8gb3JpZ2luYWwgaW50ZWdlciBkYXRhIHR5cGUuXHJcbiAgICAgIGNvbnN0IGRzdERhdGEgPSB0aGlzLndyYXBwZXI/LmlzRGF0YUNvbnZlcnRlZFxyXG4gICAgICAgID8gY29udmVydEludDMyVG9EYXRhKHRoaXMuYWN0aXZlVXBsb2FkLCB0aGlzLndyYXBwZXI/LnR5cGUpXHJcbiAgICAgICAgOiB0aGlzLmFjdGl2ZVVwbG9hZDtcclxuXHJcbiAgICAgIGlmIChkc3RCdWZmZXIpIHtcclxuICAgICAgICBpZiAoZHN0QnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgIG5ldyBVaW50OEFycmF5KGRzdEJ1ZmZlcikuc2V0KGRzdERhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXcgVWludDhBcnJheShkc3RCdWZmZXIuYnVmZmVyLCBkc3RCdWZmZXIuYnl0ZU9mZnNldCwgZHN0QnVmZmVyLmJ5dGVMZW5ndGgpLnNldChkc3REYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkc3REYXRhLmJ1ZmZlciBhcyBBcnJheUJ1ZmZlcjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLndyYXBwZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgaGFzIG5vdCBiZWVuIGNyZWF0ZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFkc3RCdWZmZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMud3JhcHBlci5yZWFkKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy53cmFwcGVyLnJlYWQoZHN0QnVmZmVyKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRlbnNvck1hbmFnZXJJbXBsIGltcGxlbWVudHMgVGVuc29yTWFuYWdlciB7XHJcbiAgcHJpdmF0ZSB0ZW5zb3JUcmFja2Vyc0J5SWQ6IE1hcDxUZW5zb3JJZCwgVGVuc29ySWRUcmFja2VyPiA9IG5ldyBNYXAoKTtcclxuICBwcml2YXRlIGZyZWVUZW5zb3JzOiBUZW5zb3JXcmFwcGVyW10gPSBbXTtcclxuICBwcml2YXRlIGV4dGVybmFsVGVuc29yczogU2V0PFRlbnNvcldyYXBwZXI+ID0gbmV3IFNldCgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhY2tlbmQ6IFdlYk5OQmFja2VuZCkge31cclxuXHJcbiAgcHVibGljIGdldE1MQ29udGV4dChzZXNzaW9uSWQ6IG51bWJlcik6IE1MQ29udGV4dCB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5iYWNrZW5kLmdldE1MQ29udGV4dChzZXNzaW9uSWQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTUxDb250ZXh0IG5vdCBmb3VuZCBmb3Igc2Vzc2lvbi4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb250ZXh0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1MT3BTdXBwb3J0TGltaXRzKHNlc3Npb25JZDogbnVtYmVyKTogTUxPcFN1cHBvcnRMaW1pdHMgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFja2VuZC5nZXRNTE9wU3VwcG9ydExpbWl0cyhzZXNzaW9uSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2VydmVUZW5zb3JJZCgpOiBUZW5zb3JJZCB7XHJcbiAgICBjb25zdCB0ZW5zb3JJZCA9IGNyZWF0ZU5ld1RlbnNvcklkKCk7XHJcbiAgICB0aGlzLnRlbnNvclRyYWNrZXJzQnlJZC5zZXQodGVuc29ySWQsIG5ldyBUZW5zb3JJZFRyYWNrZXIodGhpcykpO1xyXG4gICAgcmV0dXJuIHRlbnNvcklkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGVhc2VUZW5zb3JJZCh0ZW5zb3JJZDogVGVuc29ySWQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRlbnNvclRyYWNrZXIgPSB0aGlzLnRlbnNvclRyYWNrZXJzQnlJZC5nZXQodGVuc29ySWQpO1xyXG4gICAgaWYgKCF0ZW5zb3JUcmFja2VyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudGVuc29yVHJhY2tlcnNCeUlkLmRlbGV0ZSh0ZW5zb3JJZCk7XHJcbiAgICBpZiAodGVuc29yVHJhY2tlci50ZW5zb3JXcmFwcGVyKSB7XHJcbiAgICAgIHRoaXMucmVsZWFzZVRlbnNvcih0ZW5zb3JUcmFja2VyLnRlbnNvcldyYXBwZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGVuc3VyZVRlbnNvcihcclxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxyXG4gICAgdGVuc29ySWQ6IFRlbnNvcklkLFxyXG4gICAgZGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlLFxyXG4gICAgc2hhcGU6IG51bWJlcltdLFxyXG4gICAgY29weU9sZDogYm9vbGVhbixcclxuICApOiBQcm9taXNlPE1MVGVuc29yPiB7XHJcbiAgICBMT0dfREVCVUcoXHJcbiAgICAgICd2ZXJib3NlJyxcclxuICAgICAgKCkgPT5cclxuICAgICAgICBgW1dlYk5OXSBUZW5zb3JNYW5hZ2VyLmVuc3VyZVRlbnNvciB7dGVuc29ySWQ6ICR7dGVuc29ySWR9LCBkYXRhVHlwZTogJHtcclxuICAgICAgICAgIGRhdGFUeXBlXHJcbiAgICAgICAgfSwgc2hhcGU6ICR7c2hhcGV9LCBjb3B5T2xkOiAke2NvcHlPbGR9fWAsXHJcbiAgICApO1xyXG4gICAgY29uc3QgdGVuc29yID0gdGhpcy50ZW5zb3JUcmFja2Vyc0J5SWQuZ2V0KHRlbnNvcklkKTtcclxuICAgIGlmICghdGVuc29yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIG5vdCBmb3VuZC4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW5zb3IuZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgZGF0YVR5cGUsIHNoYXBlLCBjb3B5T2xkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGxvYWQodGVuc29ySWQ6IFRlbnNvcklkLCBkYXRhOiBVaW50OEFycmF5KTogdm9pZCB7XHJcbiAgICBjb25zdCB0ZW5zb3IgPSB0aGlzLnRlbnNvclRyYWNrZXJzQnlJZC5nZXQodGVuc29ySWQpO1xyXG4gICAgaWYgKCF0ZW5zb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3Igbm90IGZvdW5kLicpO1xyXG4gICAgfVxyXG4gICAgdGVuc29yLnVwbG9hZChkYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZCh0ZW5zb3JJZDogVGVuc29ySWQpOiBQcm9taXNlPEFycmF5QnVmZmVyPjtcclxuICBwdWJsaWMgYXN5bmMgZG93bmxvYWQodGVuc29ySWQ6IFRlbnNvcklkLCBkc3RCdWZmZXI6IEFycmF5QnVmZmVyVmlldyB8IEFycmF5QnVmZmVyKTogUHJvbWlzZTx1bmRlZmluZWQ+O1xyXG4gIGFzeW5jIGRvd25sb2FkKHRlbnNvcklkOiBUZW5zb3JJZCwgZHN0QnVmZmVyPzogQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPEFycmF5QnVmZmVyIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBMT0dfREVCVUcoXHJcbiAgICAgICd2ZXJib3NlJyxcclxuICAgICAgKCkgPT4gYFtXZWJOTl0gVGVuc29yTWFuYWdlci5kb3dubG9hZCB7dGVuc29ySWQ6ICR7dGVuc29ySWR9LCBkc3RCdWZmZXI6ICR7ZHN0QnVmZmVyPy5ieXRlTGVuZ3RofX1gLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IHRlbnNvclRyYWNrZXIgPSB0aGlzLnRlbnNvclRyYWNrZXJzQnlJZC5nZXQodGVuc29ySWQpO1xyXG4gICAgaWYgKCF0ZW5zb3JUcmFja2VyKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIG5vdCBmb3VuZC4nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW5zb3JUcmFja2VyLmRvd25sb2FkKGRzdEJ1ZmZlcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsZWFzZVRlbnNvcnNGb3JTZXNzaW9uKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IHRlbnNvciBvZiB0aGlzLmZyZWVUZW5zb3JzKSB7XHJcbiAgICAgIGlmICh0ZW5zb3Iuc2Vzc2lvbklkID09PSBzZXNzaW9uSWQpIHtcclxuICAgICAgICB0ZW5zb3IuZGVzdHJveSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmZyZWVUZW5zb3JzID0gdGhpcy5mcmVlVGVuc29ycy5maWx0ZXIoKHRlbnNvcikgPT4gdGVuc29yLnNlc3Npb25JZCAhPT0gc2Vzc2lvbklkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlclRlbnNvcihcclxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxyXG4gICAgbWxUZW5zb3I6IE1MVGVuc29yLFxyXG4gICAgZGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlLFxyXG4gICAgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdLFxyXG4gICk6IFRlbnNvcklkIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmdldE1MQ29udGV4dChzZXNzaW9uSWQpO1xyXG4gICAgY29uc3QgdGVuc29ySWQgPSBjcmVhdGVOZXdUZW5zb3JJZCgpO1xyXG4gICAgLy8gRGVmYXVsdGluZyB0byBSRUFEIHwgV1JJVEUgaWYgdXNhZ2UgaXMgbm90IHByb3ZpZGVkLlxyXG4gICAgY29uc3Qgd3JhcHBlciA9IG5ldyBUZW5zb3JXcmFwcGVyKHtcclxuICAgICAgc2Vzc2lvbklkLFxyXG4gICAgICBjb250ZXh0LFxyXG4gICAgICB0ZW5zb3I6IG1sVGVuc29yLFxyXG4gICAgICBkYXRhVHlwZSxcclxuICAgICAgc2hhcGUsXHJcbiAgICB9KTtcclxuICAgIHRoaXMudGVuc29yVHJhY2tlcnNCeUlkLnNldCh0ZW5zb3JJZCwgbmV3IFRlbnNvcklkVHJhY2tlcih0aGlzLCB3cmFwcGVyKSk7XHJcbiAgICB0aGlzLmV4dGVybmFsVGVuc29ycy5hZGQod3JhcHBlcik7XHJcbiAgICByZXR1cm4gdGVuc29ySWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgb3IgY3JlYXRlIGFuIE1MVGVuc29yIHdpdGggdGhlIGdpdmVuIGRhdGEgdHlwZSBhbmQgc2hhcGUuXHJcbiAgICovXHJcbiAgcHVibGljIGFzeW5jIGdldENhY2hlZFRlbnNvcihcclxuICAgIHNlc3Npb25JZDogbnVtYmVyLFxyXG4gICAgZGF0YVR5cGU6IE1MT3BlcmFuZERhdGFUeXBlLFxyXG4gICAgc2hhcGU6IHJlYWRvbmx5IG51bWJlcltdLFxyXG4gICAgdXNhZ2U6IE1MVGVuc29yVXNhZ2VGbGFncyB8IHVuZGVmaW5lZCxcclxuICAgIHdyaXRhYmxlOiBib29sZWFuLFxyXG4gICAgcmVhZGFibGU6IGJvb2xlYW4sXHJcbiAgICBmYWxsYmFja0RhdGFUeXBlPzogTUxPcGVyYW5kRGF0YVR5cGUsXHJcbiAgKTogUHJvbWlzZTxUZW5zb3JXcmFwcGVyPiB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5nZXRNTENvbnRleHQoc2Vzc2lvbklkKTtcclxuICAgIGZvciAoY29uc3QgW2luZGV4LCB0ZW5zb3JdIG9mIHRoaXMuZnJlZVRlbnNvcnMuZW50cmllcygpKSB7XHJcbiAgICAgIGlmICh0ZW5zb3IuY2FuUmV1c2VUZW5zb3IoY29udGV4dCwgZGF0YVR5cGUsIHNoYXBlKSkge1xyXG4gICAgICAgIExPR19ERUJVRyhcclxuICAgICAgICAgICd2ZXJib3NlJyxcclxuICAgICAgICAgICgpID0+XHJcbiAgICAgICAgICAgIGBbV2ViTk5dIFJldXNpbmcgdGVuc29yIHtkYXRhVHlwZTogJHtkYXRhVHlwZX0sICR7XHJcbiAgICAgICAgICAgICAgZmFsbGJhY2tEYXRhVHlwZSA/IGBmYWxsYmFja0RhdGFUeXBlOiAke2ZhbGxiYWNrRGF0YVR5cGV9LGAgOiAnJ1xyXG4gICAgICAgICAgICB9IHNoYXBlOiAke3NoYXBlfWAsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5mcmVlVGVuc29ycy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG4gICAgICAgIHdyYXBwZXIuc2Vzc2lvbklkID0gc2Vzc2lvbklkO1xyXG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBMT0dfREVCVUcoXHJcbiAgICAgICd2ZXJib3NlJyxcclxuICAgICAgKCkgPT5cclxuICAgICAgICBgW1dlYk5OXSBNTENvbnRleHQuY3JlYXRlVGVuc29yIHtkYXRhVHlwZTogJHtkYXRhVHlwZX0sICR7XHJcbiAgICAgICAgICBmYWxsYmFja0RhdGFUeXBlID8gYGZhbGxiYWNrRGF0YVR5cGU6ICR7ZmFsbGJhY2tEYXRhVHlwZX0sYCA6ICcnXHJcbiAgICAgICAgfSBzaGFwZTogJHtzaGFwZX19YCxcclxuICAgICk7XHJcbiAgICBjb25zdCB0ZW5zb3IgPSBhd2FpdCBjb250ZXh0LmNyZWF0ZVRlbnNvcih7XHJcbiAgICAgIGRhdGFUeXBlOiBmYWxsYmFja0RhdGFUeXBlID8/IGRhdGFUeXBlLCAvLyBJZiBmYWxsYmFjayBkYXRhIHR5cGUgaXMgcHJvdmlkZWQsIHVzZSBpdC5cclxuICAgICAgc2hhcGUsXHJcbiAgICAgIGRpbWVuc2lvbnM6IHNoYXBlLFxyXG4gICAgICB1c2FnZSxcclxuICAgICAgd3JpdGFibGUsXHJcbiAgICAgIHJlYWRhYmxlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbmV3IFRlbnNvcldyYXBwZXIoeyBzZXNzaW9uSWQsIGNvbnRleHQsIHRlbnNvciwgZGF0YVR5cGUsIHNoYXBlLCBmYWxsYmFja0RhdGFUeXBlIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVsZWFzZSB0ZW5zb3IgZm9yIHJldXNlIHVubGVzcyBleHRlcm5hbC5cclxuICAgKi9cclxuICBwdWJsaWMgcmVsZWFzZVRlbnNvcih0ZW5zb3JXcmFwcGVyOiBUZW5zb3JXcmFwcGVyKSB7XHJcbiAgICBpZiAodGhpcy5leHRlcm5hbFRlbnNvcnMuaGFzKHRlbnNvcldyYXBwZXIpKSB7XHJcbiAgICAgIHRoaXMuZXh0ZXJuYWxUZW5zb3JzLmRlbGV0ZSh0ZW5zb3JXcmFwcGVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuZnJlZVRlbnNvcnMucHVzaCh0ZW5zb3JXcmFwcGVyKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUZW5zb3JNYW5hZ2VyID0gKC4uLmFyZ3M6IENvbnN0cnVjdG9yUGFyYW1ldGVyczx0eXBlb2YgVGVuc29yTWFuYWdlckltcGw+KTogVGVuc29yTWFuYWdlciA9PlxyXG4gIG5ldyBUZW5zb3JNYW5hZ2VySW1wbCguLi5hcmdzKTtcclxuIiwgIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXHJcblxyXG4vLyBXZWJOTiBBUEkgY3VycmVudGx5IGRvZXMgbm90IGhhdmUgYSBUeXBlU2NyaXB0IGRlZmluaXRpb24gZmlsZS4gVGhpcyBmaWxlIGlzIGEgd29ya2Fyb3VuZCB3aXRoIHR5cGVzIGdlbmVyYXRlZCBmcm9tXHJcbi8vIFdlYk5OIEFQSSBzcGVjaWZpY2F0aW9uLlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2VibWFjaGluZWxlYXJuaW5nL3dlYm5uL2lzc3Vlcy82NzdcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIndlYm5uL3dlYm5uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IHsgRW52LCBUZW5zb3IgfSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRGF0YVR5cGUsIHRlbnNvckRhdGFUeXBlU3RyaW5nVG9FbnVtIH0gZnJvbSAnLi4vd2FzbS1jb21tb24nO1xyXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4uL3dhc20tZmFjdG9yeSc7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVWaWV3IH0gZnJvbSAnLi90ZW5zb3Itdmlldyc7XHJcbmltcG9ydCB7IFRlbnNvcklkLCBjcmVhdGVUZW5zb3JNYW5hZ2VyIH0gZnJvbSAnLi93ZWJubi90ZW5zb3ItbWFuYWdlcic7XHJcbmltcG9ydCB7IGNvbmZpZ3VyZUxvZ2dlciwgTE9HX0RFQlVHIH0gZnJvbSAnLi9sb2cnO1xyXG5cclxuLypcclxuICogVGVuc29yUHJvdG86OmRhdGFfdHlwZSB0byBXZWJOTiBPcGVyYW5kVHlwZSBtYXBwaW5nLlxyXG4gKi9cclxuY29uc3Qgb25ueERhdGFUeXBlVG9XZWJubkRhdGFUeXBlID0gbmV3IE1hcDxEYXRhVHlwZSwgTUxPcGVyYW5kRGF0YVR5cGU+KFtcclxuICBbRGF0YVR5cGUuZmxvYXQsICdmbG9hdDMyJ10sXHJcbiAgW0RhdGFUeXBlLmZsb2F0MTYsICdmbG9hdDE2J10sXHJcbiAgW0RhdGFUeXBlLmludDMyLCAnaW50MzInXSxcclxuICBbRGF0YVR5cGUudWludDMyLCAndWludDMyJ10sXHJcbiAgW0RhdGFUeXBlLmludDY0LCAnaW50NjQnXSxcclxuICBbRGF0YVR5cGUudWludDY0LCAndWludDY0J10sXHJcbiAgW0RhdGFUeXBlLmludDQsICdpbnQ0J10sXHJcbiAgW0RhdGFUeXBlLnVpbnQ0LCAndWludDQnXSxcclxuICBbRGF0YVR5cGUuaW50OCwgJ2ludDgnXSxcclxuICBbRGF0YVR5cGUudWludDgsICd1aW50OCddLFxyXG4gIFtEYXRhVHlwZS5ib29sLCAndWludDgnXSxcclxuXSk7XHJcblxyXG50eXBlIE1MQ29udGV4dEVudHJ5ID0ge1xyXG4gIGdwdURldmljZT86IEdQVURldmljZTtcclxuICBvcHRpb25zPzogTUxDb250ZXh0T3B0aW9ucztcclxuICBtbENvbnRleHQ6IE1MQ29udGV4dDtcclxufTtcclxuXHJcbmNvbnN0IGNvbXBhcmVNTENvbnRleHRPcHRpb25zID0gKGE/OiBNTENvbnRleHRPcHRpb25zLCBiPzogTUxDb250ZXh0T3B0aW9ucyk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmIChhID09PSBiKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgaWYgKGEgPT09IHVuZGVmaW5lZCB8fCBiID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgY29uc3QgYUtleXMgPSBPYmplY3Qua2V5cyhhKS5zb3J0KCkgYXMgQXJyYXk8a2V5b2YgdHlwZW9mIGE+O1xyXG4gIGNvbnN0IGJLZXlzID0gT2JqZWN0LmtleXMoYikuc29ydCgpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBiPjtcclxuICByZXR1cm4gYUtleXMubGVuZ3RoID09PSBiS2V5cy5sZW5ndGggJiYgYUtleXMuZXZlcnkoKGtleSwgaW5kZXgpID0+IGtleSA9PT0gYktleXNbaW5kZXhdICYmIGFba2V5XSA9PT0gYltrZXldKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXZWJOTiBiYWNrZW5kIGltcGxlbWVudGF0aW9uLiBUaGlzIGNsYXNzIGlzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgTUxUZW5zb3JzIGNyZWF0ZWQgYnkgdGhlIGJhY2tlbmQgYW5kIGtlZXAgdHJhY2tcclxuICogb2YgdGhlIGN1cnJlbnQgTUxDb250ZXh0IGJlaW5nIHVzZWQgYnkgdGhlIHNlc3Npb25zLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdlYk5OQmFja2VuZCB7XHJcbiAgLyoqXHJcbiAgICogVGVuc29yIG1hbmFnZXJzIGZvciBlYWNoIHNlc3Npb24uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZW5zb3JNYW5hZ2VyID0gY3JlYXRlVGVuc29yTWFuYWdlcih0aGlzKTtcclxuICAvKipcclxuICAgKiBNYXBzIGZyb20gc2Vzc2lvbiBpZCB0byBNTENvbnRleHRzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWxDb250ZXh0QnlTZXNzaW9uSWQgPSBuZXcgTWFwPG51bWJlciwgTUxDb250ZXh0PigpO1xyXG4gIC8qKlxyXG4gICAqIE1hcHMgZnJvbSBNTENvbnRleHQgdG8gc2Vzc2lvbiBpZHMuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXNzaW9uSWRzQnlNTENvbnRleHQgPSBuZXcgTWFwPE1MQ29udGV4dCwgU2V0PG51bWJlcj4+KCk7XHJcbiAgLyoqXHJcbiAgICogQ2FjaGUgb2YgTUxDb250ZXh0cy5cclxuICAgKi9cclxuICBwcml2YXRlIG1sQ29udGV4dENhY2hlOiBNTENvbnRleHRFbnRyeVtdID0gW107XHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzZXNzaW9uIGlkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZlU2Vzc2lvbklkPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIE1hcHMgZnJvbSBzZXNzaW9uIGlkIHRvIGxpc3Qgb2YgZ3JhcGggaW5wdXRzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2Vzc2lvbkdyYXBoSW5wdXRzOiBNYXA8bnVtYmVyLCBzdHJpbmdbXT4gPSBuZXcgTWFwKCk7XHJcbiAgLyoqXHJcbiAgICogTWFwcyBmcm9tIHNlc3Npb24gaWQgdG8gbGlzdCBvZiBncmFwaCBvdXRwdXRzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2Vzc2lvbkdyYXBoT3V0cHV0czogTWFwPG51bWJlciwgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xyXG4gIC8qKlxyXG4gICAqIFRlbXBvcmFyeSBncmFwaCBpbnB1dHMgZm9yIHRoZSBjdXJyZW50IHNlc3Npb24uXHJcbiAgICogVGhlc2UgaW5wdXRzIHdpbGwgYmUgcmVnaXN0ZXJlZCB3aGVuIHRoZSBzZXNzaW9uIGlzIGNyZWF0ZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZW1wb3JhcnlHcmFwaElucHV0czogc3RyaW5nW10gPSBbXTtcclxuICAvKipcclxuICAgKiBUZW1wb3JhcnkgZ3JhcGggb3V0cHV0cyBmb3IgdGhlIGN1cnJlbnQgc2Vzc2lvbi5cclxuICAgKiBUaGVzZSBvdXRwdXRzIHdpbGwgYmUgcmVnaXN0ZXJlZCB3aGVuIHRoZSBzZXNzaW9uIGlzIGNyZWF0ZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZW1wb3JhcnlHcmFwaE91dHB1dHM6IHN0cmluZ1tdID0gW107XHJcbiAgLyoqXHJcbiAgICogVGVtcG9yYXJ5IHRlbnNvcnMgZm9yIHRoZSBjdXJyZW50IHNlc3Npb24uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZW1wb3JhcnlTZXNzaW9uVGVuc29ySWRzOiBNYXA8bnVtYmVyLCBUZW5zb3JJZFtdPiA9IG5ldyBNYXAoKTtcclxuICAvKipcclxuICAgKiBNYXBzIGZyb20gc2Vzc2lvbiBpZCB0byBNTE9wU3VwcG9ydExpbWl0cy5cclxuICAgKi9cclxuICBwcml2YXRlIG1sT3BTdXBwb3J0TGltaXRzQnlTZXNzaW9uSWQgPSBuZXcgTWFwPG51bWJlciwgTUxPcFN1cHBvcnRMaW1pdHM+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGVudjogRW52KSB7XHJcbiAgICBjb25maWd1cmVMb2dnZXIoZW52LmxvZ0xldmVsISwgISFlbnYuZGVidWcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjdXJyZW50U2Vzc2lvbklkKCk6IG51bWJlciB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVTZXNzaW9uSWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFjdGl2ZSBzZXNzaW9uJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVTZXNzaW9uSWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25SdW5TdGFydChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gb25SdW5TdGFydCB7c2Vzc2lvbklkOiAke3Nlc3Npb25JZH19YCk7XHJcbiAgICB0aGlzLmFjdGl2ZVNlc3Npb25JZCA9IHNlc3Npb25JZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblJ1bkVuZChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gb25SdW5FbmQge3Nlc3Npb25JZDogJHtzZXNzaW9uSWR9fWApO1xyXG4gICAgY29uc3QgdGVuc29ySWRzID0gdGhpcy50ZW1wb3JhcnlTZXNzaW9uVGVuc29ySWRzLmdldChzZXNzaW9uSWQpO1xyXG4gICAgaWYgKCF0ZW5zb3JJZHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCB0ZW5zb3JJZCBvZiB0ZW5zb3JJZHMpIHtcclxuICAgICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gcmVsZWFzaW5nIHRlbXBvcmFyeSB0ZW5zb3Ige3RlbnNvcklkOiAke3RlbnNvcklkfX1gKTtcclxuICAgICAgdGhpcy50ZW5zb3JNYW5hZ2VyLnJlbGVhc2VUZW5zb3JJZCh0ZW5zb3JJZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRlbXBvcmFyeVNlc3Npb25UZW5zb3JJZHMuZGVsZXRlKHNlc3Npb25JZCk7XHJcbiAgICB0aGlzLmFjdGl2ZVNlc3Npb25JZCA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBjcmVhdGVNTENvbnRleHQob3B0aW9uc09yRGV2aWNlPzogTUxDb250ZXh0T3B0aW9ucyB8IEdQVURldmljZSk6IFByb21pc2U8TUxDb250ZXh0PiB7XHJcbiAgICBpZiAob3B0aW9uc09yRGV2aWNlIGluc3RhbmNlb2YgR1BVRGV2aWNlKSB7XHJcbiAgICAgIGNvbnN0IG1sQ29udGV4dEluZGV4ID0gdGhpcy5tbENvbnRleHRDYWNoZS5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5ncHVEZXZpY2UgPT09IG9wdGlvbnNPckRldmljZSk7XHJcbiAgICAgIGlmIChtbENvbnRleHRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tbENvbnRleHRDYWNoZVttbENvbnRleHRJbmRleF0ubWxDb250ZXh0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1sQ29udGV4dCA9IGF3YWl0IG5hdmlnYXRvci5tbC5jcmVhdGVDb250ZXh0KG9wdGlvbnNPckRldmljZSk7XHJcbiAgICAgICAgdGhpcy5tbENvbnRleHRDYWNoZS5wdXNoKHsgZ3B1RGV2aWNlOiBvcHRpb25zT3JEZXZpY2UsIG1sQ29udGV4dCB9KTtcclxuICAgICAgICByZXR1cm4gbWxDb250ZXh0O1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnNPckRldmljZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IG1sQ29udGV4dEluZGV4ID0gdGhpcy5tbENvbnRleHRDYWNoZS5maW5kSW5kZXgoXHJcbiAgICAgICAgKGVudHJ5KSA9PiBlbnRyeS5vcHRpb25zID09PSB1bmRlZmluZWQgJiYgZW50cnkuZ3B1RGV2aWNlID09PSB1bmRlZmluZWQsXHJcbiAgICAgICk7XHJcbiAgICAgIGlmIChtbENvbnRleHRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tbENvbnRleHRDYWNoZVttbENvbnRleHRJbmRleF0ubWxDb250ZXh0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG1sQ29udGV4dCA9IGF3YWl0IG5hdmlnYXRvci5tbC5jcmVhdGVDb250ZXh0KCk7XHJcbiAgICAgICAgdGhpcy5tbENvbnRleHRDYWNoZS5wdXNoKHsgbWxDb250ZXh0IH0pO1xyXG4gICAgICAgIHJldHVybiBtbENvbnRleHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtbENvbnRleHRJbmRleCA9IHRoaXMubWxDb250ZXh0Q2FjaGUuZmluZEluZGV4KChlbnRyeSkgPT5cclxuICAgICAgY29tcGFyZU1MQ29udGV4dE9wdGlvbnMoZW50cnkub3B0aW9ucywgb3B0aW9uc09yRGV2aWNlKSxcclxuICAgICk7XHJcbiAgICBpZiAobWxDb250ZXh0SW5kZXggIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm1sQ29udGV4dENhY2hlW21sQ29udGV4dEluZGV4XS5tbENvbnRleHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBtbENvbnRleHQgPSBhd2FpdCBuYXZpZ2F0b3IubWwuY3JlYXRlQ29udGV4dChvcHRpb25zT3JEZXZpY2UpO1xyXG4gICAgICB0aGlzLm1sQ29udGV4dENhY2hlLnB1c2goeyBvcHRpb25zOiBvcHRpb25zT3JEZXZpY2UsIG1sQ29udGV4dCB9KTtcclxuICAgICAgcmV0dXJuIG1sQ29udGV4dDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck1MQ29udGV4dChzZXNzaW9uSWQ6IG51bWJlciwgbWxDb250ZXh0OiBNTENvbnRleHQpOiB2b2lkIHtcclxuICAgIHRoaXMubWxDb250ZXh0QnlTZXNzaW9uSWQuc2V0KHNlc3Npb25JZCwgbWxDb250ZXh0KTtcclxuICAgIGxldCBzZXNzaW9uSWRzID0gdGhpcy5zZXNzaW9uSWRzQnlNTENvbnRleHQuZ2V0KG1sQ29udGV4dCk7XHJcbiAgICBpZiAoIXNlc3Npb25JZHMpIHtcclxuICAgICAgc2Vzc2lvbklkcyA9IG5ldyBTZXQoKTtcclxuICAgICAgdGhpcy5zZXNzaW9uSWRzQnlNTENvbnRleHQuc2V0KG1sQ29udGV4dCwgc2Vzc2lvbklkcyk7XHJcbiAgICB9XHJcbiAgICBzZXNzaW9uSWRzLmFkZChzZXNzaW9uSWQpO1xyXG5cclxuICAgIGlmICghdGhpcy5tbE9wU3VwcG9ydExpbWl0c0J5U2Vzc2lvbklkLmhhcyhzZXNzaW9uSWQpKSB7XHJcbiAgICAgIHRoaXMubWxPcFN1cHBvcnRMaW1pdHNCeVNlc3Npb25JZC5zZXQoc2Vzc2lvbklkLCBtbENvbnRleHQub3BTdXBwb3J0TGltaXRzKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRlbXBvcmFyeUdyYXBoSW5wdXRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zZXNzaW9uR3JhcGhJbnB1dHMuc2V0KHNlc3Npb25JZCwgdGhpcy50ZW1wb3JhcnlHcmFwaElucHV0cyk7XHJcbiAgICAgIHRoaXMudGVtcG9yYXJ5R3JhcGhJbnB1dHMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnRlbXBvcmFyeUdyYXBoT3V0cHV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc2Vzc2lvbkdyYXBoT3V0cHV0cy5zZXQoc2Vzc2lvbklkLCB0aGlzLnRlbXBvcmFyeUdyYXBoT3V0cHV0cyk7XHJcbiAgICAgIHRoaXMudGVtcG9yYXJ5R3JhcGhPdXRwdXRzID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25SZWxlYXNlU2Vzc2lvbihzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5zZXNzaW9uR3JhcGhJbnB1dHMuZGVsZXRlKHNlc3Npb25JZCk7XHJcbiAgICB0aGlzLnNlc3Npb25HcmFwaE91dHB1dHMuZGVsZXRlKHNlc3Npb25JZCk7XHJcbiAgICBjb25zdCBtbENvbnRleHQgPSB0aGlzLm1sQ29udGV4dEJ5U2Vzc2lvbklkLmdldChzZXNzaW9uSWQpITtcclxuICAgIGlmICghbWxDb250ZXh0KSB7XHJcbiAgICAgIC8vIEN1cnJlbnQgc2Vzc2lvbiBpcyBub3QgYSBXZWJOTiBzZXNzaW9uLlxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnRlbnNvck1hbmFnZXIucmVsZWFzZVRlbnNvcnNGb3JTZXNzaW9uKHNlc3Npb25JZCk7XHJcbiAgICB0aGlzLm1sQ29udGV4dEJ5U2Vzc2lvbklkLmRlbGV0ZShzZXNzaW9uSWQpO1xyXG4gICAgdGhpcy5tbE9wU3VwcG9ydExpbWl0c0J5U2Vzc2lvbklkLmRlbGV0ZShzZXNzaW9uSWQpO1xyXG4gICAgY29uc3Qgc2Vzc2lvbklkcyA9IHRoaXMuc2Vzc2lvbklkc0J5TUxDb250ZXh0LmdldChtbENvbnRleHQpITtcclxuICAgIHNlc3Npb25JZHMuZGVsZXRlKHNlc3Npb25JZCk7XHJcbiAgICBpZiAoc2Vzc2lvbklkcy5zaXplID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc2Vzc2lvbklkc0J5TUxDb250ZXh0LmRlbGV0ZShtbENvbnRleHQpO1xyXG4gICAgICBjb25zdCBtbENvbnRleHRJbmRleCA9IHRoaXMubWxDb250ZXh0Q2FjaGUuZmluZEluZGV4KChlbnRyeSkgPT4gZW50cnkubWxDb250ZXh0ID09PSBtbENvbnRleHQpO1xyXG4gICAgICBpZiAobWxDb250ZXh0SW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5tbENvbnRleHRDYWNoZS5zcGxpY2UobWxDb250ZXh0SW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TUxDb250ZXh0KHNlc3Npb25JZDogbnVtYmVyKTogTUxDb250ZXh0IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLm1sQ29udGV4dEJ5U2Vzc2lvbklkLmdldChzZXNzaW9uSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1MT3BTdXBwb3J0TGltaXRzKHNlc3Npb25JZDogbnVtYmVyKTogTUxPcFN1cHBvcnRMaW1pdHMgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMubWxPcFN1cHBvcnRMaW1pdHNCeVNlc3Npb25JZC5nZXQoc2Vzc2lvbklkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNlcnZlVGVuc29ySWQoKTogVGVuc29ySWQge1xyXG4gICAgcmV0dXJuIHRoaXMudGVuc29yTWFuYWdlci5yZXNlcnZlVGVuc29ySWQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxlYXNlVGVuc29ySWQodGVuc29ySWQ6IFRlbnNvcklkKTogdm9pZCB7XHJcbiAgICBMT0dfREVCVUcoJ3ZlcmJvc2UnLCAoKSA9PiBgW1dlYk5OXSByZWxlYXNlVGVuc29ySWQge3RlbnNvcklkOiAke3RlbnNvcklkfX1gKTtcclxuICAgIHRoaXMudGVuc29yTWFuYWdlci5yZWxlYXNlVGVuc29ySWQodGVuc29ySWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGVuc3VyZVRlbnNvcihcclxuICAgIHNlc3Npb25JZDogbnVtYmVyIHwgdW5kZWZpbmVkLFxyXG4gICAgdGVuc29ySWQ6IFRlbnNvcklkLFxyXG4gICAgb25ueERhdGFUeXBlOiBEYXRhVHlwZSxcclxuICAgIGRpbWVuc2lvbnM6IG51bWJlcltdLFxyXG4gICAgY29weU9sZDogYm9vbGVhbixcclxuICApOiBQcm9taXNlPE1MVGVuc29yPiB7XHJcbiAgICBjb25zdCB3ZWJubkRhdGFUeXBlID0gb25ueERhdGFUeXBlVG9XZWJubkRhdGFUeXBlLmdldChvbm54RGF0YVR5cGUpO1xyXG4gICAgaWYgKCF3ZWJubkRhdGFUeXBlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgT05OWCBkYXRhIHR5cGU6ICR7b25ueERhdGFUeXBlfWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudGVuc29yTWFuYWdlci5lbnN1cmVUZW5zb3IoXHJcbiAgICAgIHNlc3Npb25JZCA/PyB0aGlzLmN1cnJlbnRTZXNzaW9uSWQsXHJcbiAgICAgIHRlbnNvcklkLFxyXG4gICAgICB3ZWJubkRhdGFUeXBlLFxyXG4gICAgICBkaW1lbnNpb25zLFxyXG4gICAgICBjb3B5T2xkLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBjcmVhdGVUZW1wb3JhcnlUZW5zb3IoXHJcbiAgICBzZXNzaW9uSWQ6IG51bWJlcixcclxuICAgIG9ubnhEYXRhVHlwZTogRGF0YVR5cGUsXHJcbiAgICBzaGFwZTogcmVhZG9ubHkgbnVtYmVyW10sXHJcbiAgKTogUHJvbWlzZTxUZW5zb3JJZD4ge1xyXG4gICAgTE9HX0RFQlVHKCd2ZXJib3NlJywgKCkgPT4gYFtXZWJOTl0gY3JlYXRlVGVtcG9yYXJ5VGVuc29yIHtvbm54RGF0YVR5cGU6ICR7b25ueERhdGFUeXBlfSwgc2hhcGU6ICR7c2hhcGV9fWApO1xyXG4gICAgY29uc3QgZGF0YVR5cGUgPSBvbm54RGF0YVR5cGVUb1dlYm5uRGF0YVR5cGUuZ2V0KG9ubnhEYXRhVHlwZSk7XHJcbiAgICBpZiAoIWRhdGFUeXBlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgT05OWCBkYXRhIHR5cGU6ICR7b25ueERhdGFUeXBlfWApO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGVuc29ySWQgPSB0aGlzLnRlbnNvck1hbmFnZXIucmVzZXJ2ZVRlbnNvcklkKCk7XHJcbiAgICBhd2FpdCB0aGlzLnRlbnNvck1hbmFnZXIuZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgdGVuc29ySWQsIGRhdGFUeXBlLCBzaGFwZSwgZmFsc2UpO1xyXG4gICAgY29uc3QgdGVuc29ySWRzID0gdGhpcy50ZW1wb3JhcnlTZXNzaW9uVGVuc29ySWRzLmdldChzZXNzaW9uSWQpO1xyXG4gICAgaWYgKCF0ZW5zb3JJZHMpIHtcclxuICAgICAgdGhpcy50ZW1wb3JhcnlTZXNzaW9uVGVuc29ySWRzLnNldChzZXNzaW9uSWQsIFt0ZW5zb3JJZF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGVuc29ySWRzLnB1c2godGVuc29ySWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlbnNvcklkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwbG9hZFRlbnNvcih0ZW5zb3JJZDogVGVuc29ySWQsIGRhdGE6IFVpbnQ4QXJyYXkpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gICAgaWYgKCF3YXNtLnNob3VsZFRyYW5zZmVyVG9NTFRlbnNvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyeWluZyB0byB1cGxvYWQgdG8gYSBNTFRlbnNvciB3aGlsZSBzaG91bGRUcmFuc2ZlclRvTUxUZW5zb3IgaXMgZmFsc2UnKTtcclxuICAgIH1cclxuICAgIExPR19ERUJVRygndmVyYm9zZScsICgpID0+IGBbV2ViTk5dIHVwbG9hZFRlbnNvciB7dGVuc29ySWQ6ICR7dGVuc29ySWR9LCBkYXRhOiAke2RhdGEuYnl0ZUxlbmd0aH19YCk7XHJcbiAgICB0aGlzLnRlbnNvck1hbmFnZXIudXBsb2FkKHRlbnNvcklkLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBkb3dubG9hZFRlbnNvcih0ZW5zb3JJZDogVGVuc29ySWQsIGRzdEJ1ZmZlcjogQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIpOiBQcm9taXNlPHVuZGVmaW5lZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMudGVuc29yTWFuYWdlci5kb3dubG9hZCh0ZW5zb3JJZCwgZHN0QnVmZmVyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVNTFRlbnNvckRvd25sb2FkZXIodGVuc29ySWQ6IFRlbnNvcklkLCB0eXBlOiBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMpOiAoKSA9PiBQcm9taXNlPFRlbnNvci5EYXRhVHlwZT4ge1xyXG4gICAgcmV0dXJuIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMudGVuc29yTWFuYWdlci5kb3dubG9hZCh0ZW5zb3JJZCk7XHJcbiAgICAgIHJldHVybiBjcmVhdGVWaWV3KGRhdGEsIHR5cGUpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3Rlck1MVGVuc29yKHNlc3Npb25JZDogbnVtYmVyLCB0ZW5zb3I6IE1MVGVuc29yLCBvbm54RGF0YVR5cGU6IERhdGFUeXBlLCBkaW1lbnNpb25zOiBudW1iZXJbXSk6IFRlbnNvcklkIHtcclxuICAgIGNvbnN0IHdlYm5uRGF0YVR5cGUgPSBvbm54RGF0YVR5cGVUb1dlYm5uRGF0YVR5cGUuZ2V0KG9ubnhEYXRhVHlwZSk7XHJcbiAgICBpZiAoIXdlYm5uRGF0YVR5cGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBPTk5YIGRhdGEgdHlwZTogJHtvbm54RGF0YVR5cGV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaWQgPSB0aGlzLnRlbnNvck1hbmFnZXIucmVnaXN0ZXJUZW5zb3Ioc2Vzc2lvbklkLCB0ZW5zb3IsIHdlYm5uRGF0YVR5cGUsIGRpbWVuc2lvbnMpO1xyXG4gICAgTE9HX0RFQlVHKFxyXG4gICAgICAndmVyYm9zZScsXHJcbiAgICAgICgpID0+XHJcbiAgICAgICAgYFtXZWJOTl0gcmVnaXN0ZXJNTFRlbnNvciB7dGVuc29yOiAke3RlbnNvcn0sIGRhdGFUeXBlOiAke3dlYm5uRGF0YVR5cGV9LCBkaW1lbnNpb25zOiAke1xyXG4gICAgICAgICAgZGltZW5zaW9uc1xyXG4gICAgICAgIH19IC0+IHt0ZW5zb3JJZDogJHtpZH19YCxcclxuICAgICk7XHJcbiAgICByZXR1cm4gaWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJHcmFwaElucHV0KGlucHV0TmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnRlbXBvcmFyeUdyYXBoSW5wdXRzLnB1c2goaW5wdXROYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlckdyYXBoT3V0cHV0KG91dHB1dE5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy50ZW1wb3JhcnlHcmFwaE91dHB1dHMucHVzaChvdXRwdXROYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0dyYXBoSW5wdXQoc2Vzc2lvbklkOiBudW1iZXIsIGlucHV0TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBpbnB1dE5hbWVzID0gdGhpcy5zZXNzaW9uR3JhcGhJbnB1dHMuZ2V0KHNlc3Npb25JZCk7XHJcbiAgICBpZiAoIWlucHV0TmFtZXMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlucHV0TmFtZXMuaW5jbHVkZXMoaW5wdXROYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0dyYXBoT3V0cHV0KHNlc3Npb25JZDogbnVtYmVyLCBvdXRwdXROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IG91dHB1dE5hbWVzID0gdGhpcy5zZXNzaW9uR3JhcGhPdXRwdXRzLmdldChzZXNzaW9uSWQpO1xyXG4gICAgaWYgKCFvdXRwdXROYW1lcykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0TmFtZXMuaW5jbHVkZXMob3V0cHV0TmFtZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZChzZXNzaW9uSWQ6IG51bWJlciwgdHlwZTogVGVuc29yLlR5cGUsIGlzSW5wdXQgPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBkYXRhVHlwZSA9IG9ubnhEYXRhVHlwZVRvV2Vibm5EYXRhVHlwZS5nZXQodGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0odHlwZSkpO1xyXG4gICAgY29uc3Qgb3BMaW1pdHMgPSB0aGlzLm1sT3BTdXBwb3J0TGltaXRzQnlTZXNzaW9uSWQuZ2V0KHNlc3Npb25JZCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBkYXRhVHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0lucHV0KSB7XHJcbiAgICAgIHJldHVybiAhIW9wTGltaXRzPy5pbnB1dC5kYXRhVHlwZXMuaW5jbHVkZXMoZGF0YVR5cGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICEhb3BMaW1pdHM/Lm91dHB1dC5kYXRhVHlwZXMuaW5jbHVkZXMoZGF0YVR5cGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGZsdXNoKCk6IHZvaWQge1xyXG4gICAgLy8gVW5saWtlIHRoZSBXZWJHUFUgYmFja2VuZCwgdGhlIFdlYk5OIGJhY2tlbmQgZG9lcyBub3QgbmVlZCB0byBmbHVzaCBhbnkgcGVuZGluZyBvcGVyYXRpb25zLlxyXG4gIH1cclxufVxyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8vIFdlYk5OIEFQSSBjdXJyZW50bHkgZG9lcyBub3QgaGF2ZSBhIFR5cGVTY3JpcHQgZGVmaW5pdGlvbiBmaWxlLiBUaGlzIGZpbGUgaXMgYSB3b3JrYXJvdW5kIHdpdGggdHlwZXMgZ2VuZXJhdGVkIGZyb21cclxuLy8gV2ViTk4gQVBJIHNwZWNpZmljYXRpb24uXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJtYWNoaW5lbGVhcm5pbmcvd2Vibm4vaXNzdWVzLzY3N1xyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwianNlcC93ZWJubi93ZWJubi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCB7IEVudiwgSW5mZXJlbmNlU2Vzc2lvbiwgVGVuc29yLCBUUkFDRV9FVkVOVF9CRUdJTiwgVFJBQ0VfRVZFTlRfRU5EIH0gZnJvbSAnb25ueHJ1bnRpbWUtY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXHJcbiAgU2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhLFxyXG4gIFNlcmlhbGl6YWJsZVRlbnNvck1ldGFkYXRhLFxyXG4gIFRlbnNvck1ldGFkYXRhLFxyXG59IGZyb20gJy4vcHJveHktbWVzc2FnZXMnO1xyXG5pbXBvcnQgeyBzZXRSdW5PcHRpb25zIH0gZnJvbSAnLi9ydW4tb3B0aW9ucyc7XHJcbmltcG9ydCB7IHNldFNlc3Npb25PcHRpb25zIH0gZnJvbSAnLi9zZXNzaW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQge1xyXG4gIGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzLFxyXG4gIGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bSxcclxuICBpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUsXHJcbiAgaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUsXHJcbiAgbG9nTGV2ZWxTdHJpbmdUb0VudW0sXHJcbiAgdGVuc29yRGF0YVR5cGVFbnVtVG9TdHJpbmcsXHJcbiAgdGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0sXHJcbiAgdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yLFxyXG59IGZyb20gJy4vd2FzbS1jb21tb24nO1xyXG5pbXBvcnQgeyBnZXRJbnN0YW5jZSB9IGZyb20gJy4vd2FzbS1mYWN0b3J5JztcclxuaW1wb3J0IHsgYWxsb2NXYXNtU3RyaW5nLCBjaGVja0xhc3RFcnJvciB9IGZyb20gJy4vd2FzbS11dGlscyc7XHJcbmltcG9ydCB7IGxvYWRGaWxlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWxvYWQtZmlsZSc7XHJcblxyXG4vLyAjcmVnaW9uIEluaXRpYWxpemF0aW9uc1xyXG5cclxuLyoqXHJcbiAqIFRoZXJlIGFyZSA0IGRpZmZlcmVudCBcImluaXRpYWxpemF0aW9uXCIgc3RlcHMgZm9yIE9SVC4gVGhleSBoYXBwZW4gaW4gZGlmZmVyZW50IHBsYWNlcyBhbmQgZGlmZmVyZW50IHRpbWUuXHJcbiAqXHJcbiAqIDEuIEphdmFTY3JpcHQgaW5pdGlhbGl6YXRpb24gZm9yIG9ubnhydW50aW1lLWNvbW1vbiBhbmQgb25ueHJ1bnRpbWUtd2ViLlxyXG4gKiAgICBUaGlzIGlzIHRoZSBmaXJzdCBpbml0aWFsaXphdGlvbiBzdGVwLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBjYWxscyBvbm54cnVudGltZS1jb21tb24ncyByZWdpc3RlckJhY2tlbmQoKVxyXG4gKiBmdW5jdGlvbiBtdWx0aXBsZSB0aW1lcyB0byByZWdpc3RlciBhbGwgdGhlIGF2YWlsYWJsZSBiYWNrZW5kcy4gVGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uIGlzIHZlcnkgZmFzdC4gSXQgb25seVxyXG4gKiByZWdpc3RlcnMgdGhlIGJhY2tlbmQgbmFtZSB3aXRoIHRoZSB1bmluaXRpYWxpemVkIGJhY2tlbmQgb2JqZWN0LiBObyBoZWF2eSBpbml0aWFsaXphdGlvbiBpcyBkb25lIGluIHRoaXMgc3RlcC5cclxuICogICAgUmVmZXIgdG8gd2ViL2xpYi9pbmRleC50cyBmb3IgdGhlIGJhY2tlbmQgcmVnaXN0cmF0aW9uLlxyXG4gKlxyXG4gKiAyLiBXZWJBc3NlbWJseSBhcnRpZmFjdCBpbml0aWFsaXphdGlvbi5cclxuICogICAgVGhpcyBoYXBwZW5zIHdoZW4gYW55IHJlZ2lzdGVyZWQgd2FzbSBiYWNrZW5kIGlzIHVzZWQgZm9yIHRoZSBmaXJzdCB0aW1lIChpZS4gYG9ydC5JbmZlcmVuY2VTZXNzaW9uLmNyZWF0ZSgpYCBpc1xyXG4gKiBjYWxsZWQpLiBJbiB0aGlzIHN0ZXAsIG9ubnhydW50aW1lLXdlYiBkb2VzIHRoZSBmb2xsb3dpbmdzOlxyXG4gKiAgICAgLSBjcmVhdGUgYSBwcm94eSB3b3JrZXIgYW5kIG1ha2Ugc3VyZSB0aGUgcHJveHkgd29ya2VyIGlzIHJlYWR5IHRvIHJlY2VpdmUgbWVzc2FnZXMsIGlmIHByb3h5IGlzIGVuYWJsZWQuXHJcbiAqICAgICAtIHBlcmZvcm0gZmVhdHVyZSBkZXRlY3Rpb24sIGxvY2F0ZSBjb3JyZWN0IFdlYkFzc2VtYmx5IGFydGlmYWN0IHBhdGggYW5kIGNhbGwgdGhlIEVtc2NyaXB0ZW4gZ2VuZXJhdGVkXHJcbiAqIEphdmFTY3JpcHQgY29kZSB0byBpbml0aWFsaXplIHRoZSBXZWJBc3NlbWJseSBydW50aW1lLlxyXG4gKiAgICAgICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LXdhc20nLlxyXG4gKiAgICAgICAgIC0gZG93bmxvYWRpbmcgdGhlICdvcnQtd2FzbXsuLi59Lndhc20nIGZpbGUgaXMgZG9uZSBpbiB0aGlzIHN0ZXAuXHJcbiAqICAgICAgICAgLSBpZiBtdWx0aS10aHJlYWQgaXMgZW5hYmxlZCwgb25lIG9yIG1vcmUgd2Vid29ya2VyIHdpbGwgYmUgY3JlYXRlZCB0byBpbml0aWFsaXplIHRoZSBQVGhyZWFkIHRocmVhZHBvb2wuXHJcbiAqXHJcbiAqIDMuIE9SVCBlbnZpcm9ubWVudCBpbml0aWFsaXphdGlvbi5cclxuICogICAgVGhpcyBoYXBwZW5zIGFmdGVyIHN0ZXAgMi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgcGVyZm9ybXMgT05OWCBSdW50aW1lIGVudmlyb25tZW50IGluaXRpYWxpemF0aW9uLlxyXG4gKiBGdW5jdGlvbiBgX09ydEluaXQoKWAgaXMgY2FsbGVkIGluIHRoaXMgc3RlcC5cclxuICogICAgIC0gaWYgcHJveHkgaXMgZW5hYmxlZCwgdGhpcyBzdGVwIGhhcHBlbnMgaW4gdGhlIHByb3h5IHdvcmtlciB1c2luZyBtZXNzYWdlICdpbml0LW9ydCcuXHJcbiAqICAgICAtIGxvZ2dpbmcgbGV2ZWwgKG9ydC5lbnYubG9nTGV2ZWwpIGFuZCB0aHJlYWQgbnVtYmVyIChvcnQuZW52Lndhc20ubnVtVGhyZWFkcykgYXJlIHNldCBpbiB0aGlzIHN0ZXAuXHJcbiAqXHJcbiAqIDQuIFNlc3Npb24gaW5pdGlhbGl6YXRpb24uXHJcbiAqICAgIFRoaXMgaGFwcGVucyB3aGVuIGBvcnQuSW5mZXJlbmNlU2Vzc2lvbi5jcmVhdGUoKWAgaXMgY2FsbGVkLiBVbmxpa2UgdGhlIGZpcnN0IDMgc3RlcHMgKHRoZXkgb25seSBjYWxsZWQgb25jZSksXHJcbiAqIHRoaXMgc3RlcCB3aWxsIGJlIGRvbmUgZm9yIGVhY2ggc2Vzc2lvbi4gSW4gdGhpcyBzdGVwLCBvbm54cnVudGltZS13ZWIgZG9lcyB0aGUgZm9sbG93aW5nczpcclxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVSTDpcclxuICogICAgLSBkb3dubG9hZCB0aGUgbW9kZWwgZGF0YSBmcm9tIHRoZSBVUkwuXHJcbiAqICAgIC0gY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLiAocHJveHk6ICdjb3B5LWZyb20nKVxyXG4gKiAgICAtIGRlcmVmZXJlbmNlIHRoZSBtb2RlbCBidWZmZXIuIFRoaXMgc3RlcCBhbGxvd3MgdGhlIG9yaWdpbmFsIEFycmF5QnVmZmVyIHRvIGJlIGdhcmJhZ2UgY29sbGVjdGVkLlxyXG4gKiAgICAtIGNhbGwgYF9PcnRDcmVhdGVTZXNzaW9uKClgIHRvIGNyZWF0ZSB0aGUgc2Vzc2lvbi4gKHByb3h5OiAnY3JlYXRlJylcclxuICpcclxuICogICAgSWYgdGhlIHBhcmFtZXRlciBpcyBhIFVpbnQ4QXJyYXkgb2JqZWN0OlxyXG4gKiAgICAtIGNvcHkgdGhlIG1vZGVsIGRhdGEgdG8gdGhlIFdBU00gaGVhcC4gKHByb3h5OiAnY29weS1mcm9tJylcclxuICogICAgLSBjYWxsIGBfT3J0Q3JlYXRlU2Vzc2lvbigpYCB0byBjcmVhdGUgdGhlIHNlc3Npb24uIChwcm94eTogJ2NyZWF0ZScpXHJcbiAqXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIGluaXRpYWxpemUgT1JUIGVudmlyb25tZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gbnVtVGhyZWFkcyBTZXRHbG9iYWxJbnRyYU9wTnVtVGhyZWFkcyhudW1UaHJlYWRzKVxyXG4gKiBAcGFyYW0gbG9nZ2luZ0xldmVsIENyZWF0ZUVudihzdGF0aWNfY2FzdDxPcnRMb2dnaW5nTGV2ZWw+KGxvZ2dpbmdfbGV2ZWwpKVxyXG4gKi9cclxuY29uc3QgaW5pdE9ydCA9IChudW1UaHJlYWRzOiBudW1iZXIsIGxvZ2dpbmdMZXZlbDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3QgZXJyb3JDb2RlID0gZ2V0SW5zdGFuY2UoKS5fT3J0SW5pdChudW1UaHJlYWRzLCBsb2dnaW5nTGV2ZWwpO1xyXG4gIGlmIChlcnJvckNvZGUgIT09IDApIHtcclxuICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgaW5pdGlhbGl6ZSBvbm54cnVudGltZS5cIik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGluaXRpYWxpemUgcnVudGltZSBlbnZpcm9ubWVudC5cclxuICogQHBhcmFtIGVudiBwYXNzZWQgaW4gdGhlIGVudmlyb25tZW50IGNvbmZpZyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaW5pdFJ1bnRpbWUgPSBhc3luYyAoZW52OiBFbnYpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAvLyBpbml0IE9SVFxyXG4gIGluaXRPcnQoZW52Lndhc20ubnVtVGhyZWFkcyEsIGxvZ0xldmVsU3RyaW5nVG9FbnVtKGVudi5sb2dMZXZlbCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHBlcmZvcm0gRVAgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSBlbnZcclxuICogQHBhcmFtIGVwTmFtZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaXRFcCA9IGFzeW5jIChlbnY6IEVudiwgZXBOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAvLyBpbml0aWFsaXplIEFTWU5DSUZZIHN1cHBvcnRcclxuICBnZXRJbnN0YW5jZSgpLmFzeW5jSW5pdD8uKCk7XHJcblxyXG4gIC8vIHBlcmZvcm0gV2ViR1BVIGF2YWlsYWJpbGl0eSBjaGVjayAoIGVpdGhlciBKU0VQIG9yIFdlYkdQVSBFUCApXHJcbiAgbGV0IHdlYmdwdUFkYXB0ZXI6IEdQVUFkYXB0ZXIgfCBudWxsID0gZW52LndlYmdwdS5hZGFwdGVyO1xyXG4gIGlmIChlcE5hbWUgPT09ICd3ZWJncHUnKSB7XHJcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcgfHwgIW5hdmlnYXRvci5ncHUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJHUFUgaXMgbm90IHN1cHBvcnRlZCBpbiBjdXJyZW50IGVudmlyb25tZW50Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXdlYmdwdUFkYXB0ZXIpIHtcclxuICAgICAgLy8gaWYgYWRhcHRlciBpcyBub3Qgc2V0LCByZXF1ZXN0IGEgbmV3IGFkYXB0ZXIuXHJcbiAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9IGVudi53ZWJncHUucG93ZXJQcmVmZXJlbmNlO1xyXG4gICAgICBpZiAocG93ZXJQcmVmZXJlbmNlICE9PSB1bmRlZmluZWQgJiYgcG93ZXJQcmVmZXJlbmNlICE9PSAnbG93LXBvd2VyJyAmJiBwb3dlclByZWZlcmVuY2UgIT09ICdoaWdoLXBlcmZvcm1hbmNlJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwb3dlclByZWZlcmVuY2Ugc2V0dGluZzogXCIke3Bvd2VyUHJlZmVyZW5jZX1cImApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGZvcmNlRmFsbGJhY2tBZGFwdGVyID0gZW52LndlYmdwdS5mb3JjZUZhbGxiYWNrQWRhcHRlcjtcclxuICAgICAgaWYgKGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGZvcmNlRmFsbGJhY2tBZGFwdGVyICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZm9yY2VGYWxsYmFja0FkYXB0ZXIgc2V0dGluZzogXCIke2ZvcmNlRmFsbGJhY2tBZGFwdGVyfVwiYCk7XHJcbiAgICAgIH1cclxuICAgICAgd2ViZ3B1QWRhcHRlciA9IGF3YWl0IG5hdmlnYXRvci5ncHUucmVxdWVzdEFkYXB0ZXIoeyBwb3dlclByZWZlcmVuY2UsIGZvcmNlRmFsbGJhY2tBZGFwdGVyIH0pO1xyXG4gICAgICBpZiAoIXdlYmdwdUFkYXB0ZXIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAnRmFpbGVkIHRvIGdldCBHUFUgYWRhcHRlci4gJyArXHJcbiAgICAgICAgICAgICdZb3UgbWF5IG5lZWQgdG8gZW5hYmxlIGZsYWcgXCItLWVuYWJsZS11bnNhZmUtd2ViZ3B1XCIgaWYgeW91IGFyZSB1c2luZyBDaHJvbWUuJyxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpZiBhZGFwdGVyIGlzIHNldCwgdmFsaWRhdGUgaXQuXHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlb2Ygd2ViZ3B1QWRhcHRlci5saW1pdHMgIT09ICdvYmplY3QnIHx8XHJcbiAgICAgICAgdHlwZW9mIHdlYmdwdUFkYXB0ZXIuZmVhdHVyZXMgIT09ICdvYmplY3QnIHx8XHJcbiAgICAgICAgdHlwZW9mIHdlYmdwdUFkYXB0ZXIucmVxdWVzdERldmljZSAhPT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgR1BVIGFkYXB0ZXIgc2V0IGluIGBlbnYud2ViZ3B1LmFkYXB0ZXJgLiBJdCBtdXN0IGJlIGEgR1BVQWRhcHRlciBvYmplY3QuJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHBlcmZvcm0gV2ViTk4gYXZhaWxhYmlsaXR5IGNoZWNrICggZWl0aGVyIEpTRVAgb3IgV2ViTk4gRVAgKVxyXG4gIGlmIChlcE5hbWUgPT09ICd3ZWJubicpIHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyB8fCAhKG5hdmlnYXRvciBhcyB1bmtub3duIGFzIHsgbWw6IHVua25vd24gfSkubWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJOTiBpcyBub3Qgc3VwcG9ydGVkIGluIGN1cnJlbnQgZW52aXJvbm1lbnQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVApIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXHJcbiAgICBjb25zdCBpbml0SnNlcCA9IHJlcXVpcmUoJy4vanNlcC9pbml0JykuaW5pdDtcclxuXHJcbiAgICBpZiAoZXBOYW1lID09PSAnd2ViZ3B1Jykge1xyXG4gICAgICBhd2FpdCBpbml0SnNlcCgnd2ViZ3B1JywgZ2V0SW5zdGFuY2UoKSwgZW52LCB3ZWJncHVBZGFwdGVyKTtcclxuICAgIH1cclxuICAgIGlmIChlcE5hbWUgPT09ICd3ZWJubicpIHtcclxuICAgICAgYXdhaXQgaW5pdEpzZXAoJ3dlYm5uJywgZ2V0SW5zdGFuY2UoKSwgZW52KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVICYmIGVwTmFtZSA9PT0gJ3dlYmdwdScpIHtcclxuICAgICAgZ2V0SW5zdGFuY2UoKS53ZWJncHVJbml0ISgoZGV2aWNlKSA9PiB7XHJcbiAgICAgICAgZW52LndlYmdwdS5kZXZpY2UgPSBkZXZpY2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCTk4gJiYgZXBOYW1lID09PSAnd2Vibm4nKSB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tcmVxdWlyZS1pbXBvcnRzLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXHJcbiAgICAgIGNvbnN0IGJhY2tlbmQgPSBuZXcgKHJlcXVpcmUoJy4vanNlcC9iYWNrZW5kLXdlYm5uJykuV2ViTk5CYWNrZW5kKShlbnYpO1xyXG4gICAgICBnZXRJbnN0YW5jZSgpLndlYm5uSW5pdCEoW1xyXG4gICAgICAgIGJhY2tlbmQsXHJcbiAgICAgICAgLy8gd2Vibm5SZXNlcnZlVGVuc29ySWRcclxuICAgICAgICAoKSA9PiBiYWNrZW5kLnJlc2VydmVUZW5zb3JJZCgpLFxyXG4gICAgICAgIC8vIHdlYm5uUmVsZWFzZVRlbnNvcklkLFxyXG4gICAgICAgICh0ZW5zb3JJZDogbnVtYmVyKSA9PiBiYWNrZW5kLnJlbGVhc2VUZW5zb3JJZCh0ZW5zb3JJZCksXHJcbiAgICAgICAgLy8gd2Vibm5FbnN1cmVUZW5zb3JcclxuICAgICAgICBhc3luYyAoc2Vzc2lvbklkOiBudW1iZXIgfCB1bmRlZmluZWQsIHRlbnNvcklkOiBudW1iZXIsIG9ubnhEYXRhVHlwZTogbnVtYmVyLCBzaGFwZTogbnVtYmVyW10sIGNvcHlPbGQpID0+XHJcbiAgICAgICAgICBiYWNrZW5kLmVuc3VyZVRlbnNvcihzZXNzaW9uSWQsIHRlbnNvcklkLCBvbm54RGF0YVR5cGUsIHNoYXBlLCBjb3B5T2xkKSxcclxuICAgICAgICAvLyB3ZWJublVwbG9hZFRlbnNvclxyXG4gICAgICAgICh0ZW5zb3JJZDogbnVtYmVyLCBkYXRhOiBVaW50OEFycmF5KSA9PiB7XHJcbiAgICAgICAgICBiYWNrZW5kLnVwbG9hZFRlbnNvcih0ZW5zb3JJZCwgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB3ZWJubkRvd25sb2FkVGVuc29yXHJcbiAgICAgICAgYXN5bmMgKHRlbnNvcklkOiBudW1iZXIsIGRzdEJ1ZmZlcjogQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIpID0+XHJcbiAgICAgICAgICBiYWNrZW5kLmRvd25sb2FkVGVuc29yKHRlbnNvcklkLCBkc3RCdWZmZXIpLFxyXG4gICAgICAgIC8vIHdlYm5uUmVnaXN0ZXJNTENvbnRleHRcclxuICAgICAgICAoc2Vzc2lvbklkOiBudW1iZXIsIG1sQ29udGV4dDogTUxDb250ZXh0KSA9PiBiYWNrZW5kLnJlZ2lzdGVyTUxDb250ZXh0KHNlc3Npb25JZCwgbWxDb250ZXh0KSxcclxuICAgICAgICAvLyB3ZWJubkVuYWJsZVRyYWNlRXZlbnRcclxuICAgICAgICAhIWVudi50cmFjZSxcclxuICAgICAgXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gI2VuZHJlZ2lvbiBJbml0aWFsaXphdGlvbnNcclxuXHJcbi8qKlxyXG4gKiB2YWxpZCBkYXRhIGxvY2F0aW9ucyBmb3IgaW5wdXQvb3V0cHV0IHRlbnNvcnMuXHJcbiAqL1xyXG50eXBlIFN1cHBvcnRlZFRlbnNvckRhdGFMb2NhdGlvbkZvcklucHV0T3V0cHV0ID1cclxuICB8ICdjcHUnXHJcbiAgfCAnY3B1LXBpbm5lZCdcclxuICB8ICdncHUtYnVmZmVyJ1xyXG4gIHwgJ21sLXRlbnNvcidcclxuICAvLyBVc2UgJ21sLXRlbnNvcicgZHVyaW5nIGluZmVyZW5jZSwgYnV0IG91dHB1dCBhIHRlbnNvciBsb2NhdGVkIG9uIHRoZSBDUFUuXHJcbiAgfCAnbWwtdGVuc29yLWNwdS1vdXRwdXQnO1xyXG5cclxudHlwZSBJT0JpbmRpbmdTdGF0ZSA9IHtcclxuICAvKipcclxuICAgKiB0aGUgaGFuZGxlIG9mIElPIGJpbmRpbmcuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgaGFuZGxlOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoZSBwcmVmZXJyZWQgbG9jYXRpb24gZm9yIGVhY2ggb3V0cHV0IHRlbnNvci5cclxuICAgKlxyXG4gICAqIHZhbHVlIGlzIG9uZSBvZiAnY3B1JywgJ2NwdS1waW5uZWQnLCAnZ3B1LWJ1ZmZlcicsICdtbC10ZW5zb3InLlxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogcmVhZG9ubHkgU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogZW51bSB2YWx1ZSBvZiB0aGUgcHJlZmVycmVkIGxvY2F0aW9uIGZvciBlYWNoIG91dHB1dCB0ZW5zb3IuXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZDogcmVhZG9ubHkgbnVtYmVyW107XHJcbn07XHJcblxyXG4vKipcclxuICogIHR1cGxlIGVsZW1lbnRzIGFyZTogSW5mZXJlbmNlU2Vzc2lvbiBJRDsgaW5wdXROYW1lc1VURjhFbmNvZGVkOyBvdXRwdXROYW1lc1VURjhFbmNvZGVkOyBiaW5kaW5nU3RhdGVcclxuICovXHJcbnR5cGUgU2Vzc2lvbk1ldGFkYXRhID0gW1xyXG4gIGluZmVyZW5jZVNlc3Npb25JZDogbnVtYmVyLFxyXG4gIGlucHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sXHJcbiAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZDogbnVtYmVyW10sXHJcbiAgYmluZGluZ1N0YXRlOiBJT0JpbmRpbmdTdGF0ZSB8IG51bGwsXHJcbiAgZW5hYmxlR3JhcGhDYXB0dXJlOiBib29sZWFuLFxyXG4gIGlucHV0T3V0cHV0Qm91bmQ6IGJvb2xlYW4sXHJcbl07XHJcblxyXG5jb25zdCBhY3RpdmVTZXNzaW9ucyA9IG5ldyBNYXA8bnVtYmVyLCBTZXNzaW9uTWV0YWRhdGE+KCk7XHJcblxyXG4vKipcclxuICogZ2V0IHRoZSBpbnB1dC9vdXRwdXQgY291bnQgb2YgdGhlIHNlc3Npb24uXHJcbiAqIEBwYXJhbSBzZXNzaW9uSGFuZGxlIHRoZSBoYW5kbGUgcmVwcmVzZW50aW5nIHRoZSBzZXNzaW9uLiBzaG91bGQgYmUgbm9uLXplcm8uXHJcbiAqIEByZXR1cm5zIGEgdHVwbGUgaW5jbHVkaW5nIDIgbnVtYmVycywgcmVwcmVzZW50aW5nIHRoZSBpbnB1dCBjb3VudCBhbmQgb3V0cHV0IGNvdW50LlxyXG4gKi9cclxuY29uc3QgZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQgPSAoc2Vzc2lvbkhhbmRsZTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwdHJTaXplID0gd2FzbS5QVFJfU0laRTtcclxuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoMiAqIHB0clNpemUpO1xyXG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0SW5wdXRPdXRwdXRDb3VudChzZXNzaW9uSGFuZGxlLCBkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgcHRyU2l6ZSk7XHJcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IHNlc3Npb24gaW5wdXQvb3V0cHV0IGNvdW50LlwiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHR5cGUgPSBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JztcclxuICAgIHJldHVybiBbTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCwgdHlwZSkpLCBOdW1iZXIod2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0ICsgcHRyU2l6ZSwgdHlwZSkpXTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoc3RhY2spO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGdldFNlc3Npb25JbnB1dE91dHB1dE1ldGFkYXRhID0gKFxyXG4gIHNlc3Npb25IYW5kbGU6IG51bWJlcixcclxuICBpbmRleDogbnVtYmVyLFxyXG4pOiBbbmFtZU9mZnNldDogbnVtYmVyLCBlbGVtZW50VHlwZTogbnVtYmVyLCBkaW1zPzogQXJyYXk8bnVtYmVyIHwgc3RyaW5nPl0gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGNvbnN0IHN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuICBsZXQgbWV0YWRhdGFPZmZzZXQgPSAwO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwdHJTaXplID0gd2FzbS5QVFJfU0laRTtcclxuICAgIGNvbnN0IGRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoMiAqIHB0clNpemUpO1xyXG4gICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0R2V0SW5wdXRPdXRwdXRNZXRhZGF0YShzZXNzaW9uSGFuZGxlLCBpbmRleCwgZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIHB0clNpemUpO1xyXG4gICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBzZXNzaW9uIGlucHV0L291dHB1dCBtZXRhZGF0YS5cIik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuYW1lT2Zmc2V0ID0gTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCwgJyonKSk7XHJcbiAgICBtZXRhZGF0YU9mZnNldCA9IE51bWJlcih3YXNtLmdldFZhbHVlKGRhdGFPZmZzZXQgKyBwdHJTaXplLCAnKicpKTtcclxuICAgIC8vIGdldCBlbGVtZW50IHR5cGVcclxuICAgIGNvbnN0IGVsZW1lbnRUeXBlID0gd2FzbS5IRUFQMzJbbWV0YWRhdGFPZmZzZXQgLyA0XTtcclxuICAgIGlmIChlbGVtZW50VHlwZSA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gW25hbWVPZmZzZXQsIDBdOyAvLyBub24tdGVuc29yXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0IGRpbXMgY291bnRcclxuICAgIGNvbnN0IGRpbXNDb3VudCA9IHdhc20uSEVBUFUzMlttZXRhZGF0YU9mZnNldCAvIDQgKyAxXTtcclxuICAgIC8vIGdldCBkaW1zXHJcbiAgICBjb25zdCBkaW1zOiBBcnJheTxudW1iZXIgfCBzdHJpbmc+ID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbXNDb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHN5bWJvbGljRGltTmFtZU9mZnNldCA9IE51bWJlcih3YXNtLmdldFZhbHVlKG1ldGFkYXRhT2Zmc2V0ICsgOCArIGkgKiBwdHJTaXplLCAnKicpKTtcclxuICAgICAgZGltcy5wdXNoKFxyXG4gICAgICAgIHN5bWJvbGljRGltTmFtZU9mZnNldCAhPT0gMFxyXG4gICAgICAgICAgPyB3YXNtLlVURjhUb1N0cmluZyhzeW1ib2xpY0RpbU5hbWVPZmZzZXQpXHJcbiAgICAgICAgICA6IE51bWJlcih3YXNtLmdldFZhbHVlKG1ldGFkYXRhT2Zmc2V0ICsgOCArIChpICsgZGltc0NvdW50KSAqIHB0clNpemUsICcqJykpLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgZGltc107XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHdhc20uc3RhY2tSZXN0b3JlKHN0YWNrKTtcclxuICAgIGlmIChtZXRhZGF0YU9mZnNldCAhPT0gMCkge1xyXG4gICAgICB3YXNtLl9PcnRGcmVlKG1ldGFkYXRhT2Zmc2V0KTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogYWxsb2NhdGUgdGhlIG1lbW9yeSBhbmQgbWVtY3B5IHRoZSBleHRlcm5hbCBidWZmZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSBtb2RlbCAtIHRoZSBleHRlcm5hbCBidWZmZXIgY29udGFpbmluZyB0aGUgbW9kZWwgZGF0YS4gTXVzdCBub3QgYmUgdGhlIHNhbWUgYnVmZmVyIGFzIHRoZSBXQVNNIGhlYXAuXHJcbiAqIEByZXR1cm5zIGEgMi1lbGVtZW50cyB0dXBsZSAtIHRoZSBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBhbGxvY2F0ZWQgYnVmZmVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY29weUZyb21FeHRlcm5hbEJ1ZmZlciA9IChtb2RlbDogVWludDhBcnJheSk6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGNvbnN0IG1vZGVsRGF0YU9mZnNldCA9IHdhc20uX21hbGxvYyhtb2RlbC5ieXRlTGVuZ3RoKTtcclxuICBpZiAobW9kZWxEYXRhT2Zmc2V0ID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IGNyZWF0ZSBhIHNlc3Npb24uIGZhaWxlZCB0byBhbGxvY2F0ZSBhIGJ1ZmZlciBvZiBzaXplICR7bW9kZWwuYnl0ZUxlbmd0aH0uYCk7XHJcbiAgfVxyXG4gIHdhc20uSEVBUFU4LnNldChtb2RlbCwgbW9kZWxEYXRhT2Zmc2V0KTtcclxuICByZXR1cm4gW21vZGVsRGF0YU9mZnNldCwgbW9kZWwuYnl0ZUxlbmd0aF07XHJcbn07XHJcblxyXG4vKipcclxuICogY3JlYXRlIGFuIGluZmVyZW5jZSBzZXNzaW9uIGZyb20gYSBtb2RlbCBkYXRhIGJ1ZmZlci5cclxuICpcclxuICogQHBhcmFtIG1vZGVsRGF0YSAtIGVpdGhlciBhIFVpbnQ4QXJyYXkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgbW9kZWwgZGF0YSwgb3IgYSAyLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgdGhlXHJcbiAqICAgICBwb2ludGVyIGFuZCBzaXplIG9mIHRoZSBtb2RlbCBkYXRhIGJ1ZmZlci5cclxuICogQHBhcmFtIG9wdGlvbnMgYW4gb3B0aW9uYWwgc2Vzc2lvbiBvcHRpb25zIG9iamVjdC5cclxuICogQHJldHVybnMgYSAzLWVsZW1lbnRzIHR1cGxlIGNvbnRhaW5pbmcgW3Nlc3Npb24gaGFuZGxlLCBpbnB1dCBuYW1lcywgb3V0cHV0IG5hbWVzXVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlc3Npb24gPSBhc3luYyAoXHJcbiAgbW9kZWxEYXRhOiBVaW50OEFycmF5IHwgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsXHJcbiAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXHJcbik6IFByb21pc2U8U2VyaWFsaXphYmxlU2Vzc2lvbk1ldGFkYXRhPiA9PiB7XHJcbiAgbGV0IG1vZGVsRGF0YU9mZnNldDogbnVtYmVyLCBtb2RlbERhdGFMZW5ndGg6IG51bWJlcjtcclxuICBjb25zdCB3YXNtID0gZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkobW9kZWxEYXRhKSkge1xyXG4gICAgLy8gaWYgbW9kZWwgZGF0YSBpcyBhbiBhcnJheSwgaXQgbXVzdCBiZSBhIDItZWxlbWVudHMgdHVwbGUgY29udGFpbmluZyB0aGUgcG9pbnRlciBhbmQgc2l6ZSBvZiB0aGUgbW9kZWwgZGF0YVxyXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IG1vZGVsRGF0YTtcclxuICB9IGVsc2UgaWYgKG1vZGVsRGF0YS5idWZmZXIgPT09IHdhc20uSEVBUFU4LmJ1ZmZlcikge1xyXG4gICAgLy8gaWYgbW9kZWwgZGF0YSB1c2VzIHRoZSBzYW1lIGJ1ZmZlciBhcyB0aGUgV0FTTSBoZWFwLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgaXQuXHJcbiAgICBbbW9kZWxEYXRhT2Zmc2V0LCBtb2RlbERhdGFMZW5ndGhdID0gW21vZGVsRGF0YS5ieXRlT2Zmc2V0LCBtb2RlbERhdGEuYnl0ZUxlbmd0aF07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIG90aGVyd2lzZSwgY29weSB0aGUgbW9kZWwgZGF0YSB0byB0aGUgV0FTTSBoZWFwLlxyXG4gICAgW21vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoXSA9IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIobW9kZWxEYXRhKTtcclxuICB9XHJcblxyXG4gIGxldCBzZXNzaW9uSGFuZGxlID0gMDtcclxuICBsZXQgc2Vzc2lvbk9wdGlvbnNIYW5kbGUgPSAwO1xyXG4gIGxldCBpb0JpbmRpbmdIYW5kbGUgPSAwO1xyXG4gIGxldCBhbGxvY3M6IG51bWJlcltdID0gW107XHJcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gW107XHJcbiAgY29uc3Qgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZCA9IFtdO1xyXG5cclxuICB0cnkge1xyXG4gICAgW3Nlc3Npb25PcHRpb25zSGFuZGxlLCBhbGxvY3NdID0gYXdhaXQgc2V0U2Vzc2lvbk9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnM/LmV4dGVybmFsRGF0YSAmJiB3YXNtLm1vdW50RXh0ZXJuYWxEYXRhKSB7XHJcbiAgICAgIGNvbnN0IGxvYWRpbmdQcm9taXNlcyA9IFtdO1xyXG4gICAgICBmb3IgKGNvbnN0IGZpbGUgb2Ygb3B0aW9ucy5leHRlcm5hbERhdGEpIHtcclxuICAgICAgICBjb25zdCBwYXRoID0gdHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUucGF0aDtcclxuICAgICAgICBjb25zdCBkYXRhID0gdHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnID8gZmlsZSA6IGZpbGUuZGF0YTtcclxuICAgICAgICBpZiAoQlVJTERfREVGUy5FTkFCTEVfSlNQSSAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xyXG4gICAgICAgICAgd2FzbS5tb3VudEV4dGVybmFsRGF0YShwYXRoLCBkYXRhKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsb2FkaW5nUHJvbWlzZXMucHVzaChcclxuICAgICAgICAgIGxvYWRGaWxlKGRhdGEpLnRoZW4oKGZpbGVEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIHdhc20ubW91bnRFeHRlcm5hbERhdGEocGF0aCwgZmlsZURhdGEpO1xyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gd2FpdCBmb3IgYWxsIGV4dGVybmFsIGRhdGEgZmlsZXMgdG8gYmUgbG9hZGVkXHJcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGxvYWRpbmdQcm9taXNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm92aWRlciBvZiBvcHRpb25zPy5leGVjdXRpb25Qcm92aWRlcnMgPz8gW10pIHtcclxuICAgICAgY29uc3QgcHJvdmlkZXJOYW1lID0gdHlwZW9mIHByb3ZpZGVyID09PSAnc3RyaW5nJyA/IHByb3ZpZGVyIDogcHJvdmlkZXIubmFtZTtcclxuICAgICAgaWYgKHByb3ZpZGVyTmFtZSA9PT0gJ3dlYm5uJykge1xyXG4gICAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwcm92aWRlciAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGNvbnN0IHdlYm5uT3B0aW9ucyA9IHByb3ZpZGVyIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5FeGVjdXRpb25Qcm92aWRlck9wdGlvbjtcclxuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2l0aE1MQ29udGV4dCk/LmNvbnRleHQ7XHJcbiAgICAgICAgICBjb25zdCBncHVEZXZpY2UgPSAod2Vibm5PcHRpb25zIGFzIEluZmVyZW5jZVNlc3Npb24uV2ViTk5PcHRpb25zV2ViR3B1KT8uZ3B1RGV2aWNlO1xyXG4gICAgICAgICAgY29uc3QgZGV2aWNlVHlwZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8uZGV2aWNlVHlwZTtcclxuICAgICAgICAgIGNvbnN0IHBvd2VyUHJlZmVyZW5jZSA9ICh3ZWJubk9wdGlvbnMgYXMgSW5mZXJlbmNlU2Vzc2lvbi5XZWJOTkNvbnRleHRPcHRpb25zKT8ucG93ZXJQcmVmZXJlbmNlO1xyXG4gICAgICAgICAgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IGNvbnRleHQgYXMgTUxDb250ZXh0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChncHVEZXZpY2UpIHtcclxuICAgICAgICAgICAgd2FzbS5jdXJyZW50Q29udGV4dCA9IGF3YWl0IHdhc20ud2Vibm5DcmVhdGVNTENvbnRleHQhKGdwdURldmljZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YXNtLmN1cnJlbnRDb250ZXh0ID0gYXdhaXQgd2FzbS53ZWJubkNyZWF0ZU1MQ29udGV4dCEoeyBkZXZpY2VUeXBlLCBwb3dlclByZWZlcmVuY2UgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSBhd2FpdCB3YXNtLndlYm5uQ3JlYXRlTUxDb250ZXh0ISgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlc3Npb25IYW5kbGUgPSBhd2FpdCB3YXNtLl9PcnRDcmVhdGVTZXNzaW9uKG1vZGVsRGF0YU9mZnNldCwgbW9kZWxEYXRhTGVuZ3RoLCBzZXNzaW9uT3B0aW9uc0hhbmRsZSk7XHJcbiAgICB3YXNtLndlYmdwdU9uQ3JlYXRlU2Vzc2lvbj8uKHNlc3Npb25IYW5kbGUpO1xyXG4gICAgaWYgKHNlc3Npb25IYW5kbGUgPT09IDApIHtcclxuICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCBjcmVhdGUgYSBzZXNzaW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICB3YXNtLmpzZXBPbkNyZWF0ZVNlc3Npb24/LigpO1xyXG5cclxuICAgIC8vIGNsZWFyIGN1cnJlbnQgTUxDb250ZXh0IGFmdGVyIHNlc3Npb24gY3JlYXRpb25cclxuICAgIGlmICh3YXNtLmN1cnJlbnRDb250ZXh0KSB7XHJcbiAgICAgIHdhc20ud2Vibm5SZWdpc3Rlck1MQ29udGV4dCEoc2Vzc2lvbkhhbmRsZSwgd2FzbS5jdXJyZW50Q29udGV4dCk7XHJcbiAgICAgIHdhc20uY3VycmVudENvbnRleHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHdhc20uc2hvdWxkVHJhbnNmZXJUb01MVGVuc29yID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbaW5wdXRDb3VudCwgb3V0cHV0Q291bnRdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0Q291bnQoc2Vzc2lvbkhhbmRsZSk7XHJcblxyXG4gICAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gISFvcHRpb25zPy5lbmFibGVHcmFwaENhcHR1cmU7XHJcblxyXG4gICAgY29uc3QgaW5wdXROYW1lcyA9IFtdO1xyXG4gICAgY29uc3Qgb3V0cHV0TmFtZXMgPSBbXTtcclxuICAgIGNvbnN0IGlucHV0TWV0YWRhdGE6IEluZmVyZW5jZVNlc3Npb24uVmFsdWVNZXRhZGF0YVtdID0gW107XHJcbiAgICBjb25zdCBvdXRwdXRNZXRhZGF0YTogSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW10gPSBbXTtcclxuICAgIGNvbnN0IG91dHB1dFByZWZlcnJlZExvY2F0aW9uczogU3VwcG9ydGVkVGVuc29yRGF0YUxvY2F0aW9uRm9ySW5wdXRPdXRwdXRbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dENvdW50OyBpKyspIHtcclxuICAgICAgY29uc3QgW25hbWVPZmZzZXQsIGVsZW1lbnRUeXBlLCBzaGFwZV0gPSBnZXRTZXNzaW9uSW5wdXRPdXRwdXRNZXRhZGF0YShzZXNzaW9uSGFuZGxlLCBpKTtcclxuICAgICAgaWYgKG5hbWVPZmZzZXQgPT09IDApIHtcclxuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBpbnB1dCBuYW1lLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQucHVzaChuYW1lT2Zmc2V0KTtcclxuICAgICAgY29uc3QgbmFtZSA9IHdhc20uVVRGOFRvU3RyaW5nKG5hbWVPZmZzZXQpO1xyXG4gICAgICBpbnB1dE5hbWVzLnB1c2gobmFtZSk7XHJcbiAgICAgIGlucHV0TWV0YWRhdGEucHVzaChcclxuICAgICAgICBlbGVtZW50VHlwZSA9PT0gMFxyXG4gICAgICAgICAgPyB7IG5hbWUsIGlzVGVuc29yOiBmYWxzZSB9XHJcbiAgICAgICAgICA6IHsgbmFtZSwgaXNUZW5zb3I6IHRydWUsIHR5cGU6IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGVsZW1lbnRUeXBlKSwgc2hhcGU6IHNoYXBlISB9LFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IFtuYW1lT2Zmc2V0LCBlbGVtZW50VHlwZSwgc2hhcGVdID0gZ2V0U2Vzc2lvbklucHV0T3V0cHV0TWV0YWRhdGEoc2Vzc2lvbkhhbmRsZSwgaSArIGlucHV0Q291bnQpO1xyXG4gICAgICBpZiAobmFtZU9mZnNldCA9PT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgZ2V0IGFuIG91dHB1dCBuYW1lLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLnB1c2gobmFtZU9mZnNldCk7XHJcbiAgICAgIGNvbnN0IG5hbWVTdHJpbmcgPSB3YXNtLlVURjhUb1N0cmluZyhuYW1lT2Zmc2V0KTtcclxuICAgICAgb3V0cHV0TmFtZXMucHVzaChuYW1lU3RyaW5nKTtcclxuICAgICAgb3V0cHV0TWV0YWRhdGEucHVzaChcclxuICAgICAgICBlbGVtZW50VHlwZSA9PT0gMFxyXG4gICAgICAgICAgPyB7IG5hbWU6IG5hbWVTdHJpbmcsIGlzVGVuc29yOiBmYWxzZSB9XHJcbiAgICAgICAgICA6IHsgbmFtZTogbmFtZVN0cmluZywgaXNUZW5zb3I6IHRydWUsIHR5cGU6IHRlbnNvckRhdGFUeXBlRW51bVRvU3RyaW5nKGVsZW1lbnRUeXBlKSwgc2hhcGU6IHNoYXBlISB9LFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gICAgICAgIGlmIChlbmFibGVHcmFwaENhcHR1cmUgJiYgb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnB1c2goJ2dwdS1idWZmZXInKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9XHJcbiAgICAgICAgICB0eXBlb2Ygb3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24gPT09ICdzdHJpbmcnXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvblxyXG4gICAgICAgICAgICA6IChvcHRpb25zPy5wcmVmZXJyZWRPdXRwdXRMb2NhdGlvbj8uW25hbWVTdHJpbmddID8/ICdjcHUnKTtcclxuICAgICAgICBjb25zdCBpc0dyYXBoT3V0cHV0ID0gd2FzbS53ZWJubklzR3JhcGhPdXRwdXQ7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uID09PSAnY3B1JyAmJiBpc0dyYXBoT3V0cHV0ICYmIGlzR3JhcGhPdXRwdXQoc2Vzc2lvbkhhbmRsZSwgbmFtZVN0cmluZykpIHtcclxuICAgICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucy5wdXNoKCdtbC10ZW5zb3ItY3B1LW91dHB1dCcpO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2NhdGlvbiAhPT0gJ2NwdScgJiYgbG9jYXRpb24gIT09ICdjcHUtcGlubmVkJyAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInICYmIGxvY2F0aW9uICE9PSAnbWwtdGVuc29yJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3Qgc3VwcG9ydGVkIHByZWZlcnJlZCBvdXRwdXQgbG9jYXRpb246ICR7bG9jYXRpb259LmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZW5hYmxlR3JhcGhDYXB0dXJlICYmIGxvY2F0aW9uICE9PSAnZ3B1LWJ1ZmZlcicpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgYE5vdCBzdXBwb3J0ZWQgcHJlZmVycmVkIG91dHB1dCBsb2NhdGlvbjogJHtsb2NhdGlvbn0uIE9ubHkgJ2dwdS1idWZmZXInIGxvY2F0aW9uIGlzIHN1cHBvcnRlZCB3aGVuIGVuYWJsZUdyYXBoQ2FwdHVyZSBpcyB0cnVlLmAsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnMucHVzaChsb2NhdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2UgSU8gYmluZGluZyBvbmx5IHdoZW4gYXQgbGVhc3Qgb25lIG91dHB1dCBpcyBwcmVmZXJyZWQgdG8gYmUgb24gR1BVLlxyXG4gICAgbGV0IGJpbmRpbmdTdGF0ZTogSU9CaW5kaW5nU3RhdGUgfCBudWxsID0gbnVsbDtcclxuICAgIGlmIChcclxuICAgICAgKCFCVUlMRF9ERUZTLkRJU0FCTEVfSlNFUCB8fCAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkgJiZcclxuICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLnNvbWUoKGwpID0+IGwgPT09ICdncHUtYnVmZmVyJyB8fCBsID09PSAnbWwtdGVuc29yJyB8fCBsID09PSAnbWwtdGVuc29yLWNwdS1vdXRwdXQnKVxyXG4gICAgKSB7XHJcbiAgICAgIGlvQmluZGluZ0hhbmRsZSA9IHdhc20uX09ydENyZWF0ZUJpbmRpbmcoc2Vzc2lvbkhhbmRsZSk7XHJcbiAgICAgIGlmIChpb0JpbmRpbmdIYW5kbGUgPT09IDApIHtcclxuICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGNyZWF0ZSBJTyBiaW5kaW5nLlwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYmluZGluZ1N0YXRlID0ge1xyXG4gICAgICAgIGhhbmRsZTogaW9CaW5kaW5nSGFuZGxlLFxyXG4gICAgICAgIG91dHB1dFByZWZlcnJlZExvY2F0aW9ucyxcclxuICAgICAgICBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkOiBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNcclxuICAgICAgICAgIC8vICdtbC10ZW5zb3ItY3B1LW91dHB1dCcgaXMgdHJlYXRlZCBhcyAnbWwtdGVuc29yJyBmb3IgdGhlIHB1cnBvc2Ugb2YgSU8gYmluZGluZy5cclxuICAgICAgICAgIC5tYXAoKGwpID0+IChsID09PSAnbWwtdGVuc29yLWNwdS1vdXRwdXQnID8gJ21sLXRlbnNvcicgOiBsKSlcclxuICAgICAgICAgIC5tYXAoKGwpID0+IGRhdGFMb2NhdGlvblN0cmluZ1RvRW51bShsKSksXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25IYW5kbGUsIFtcclxuICAgICAgc2Vzc2lvbkhhbmRsZSxcclxuICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICBiaW5kaW5nU3RhdGUsXHJcbiAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcclxuICAgICAgZmFsc2UsXHJcbiAgICBdKTtcclxuICAgIHJldHVybiBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lcywgb3V0cHV0TmFtZXMsIGlucHV0TWV0YWRhdGEsIG91dHB1dE1ldGFkYXRhXTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xyXG4gICAgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZC5mb3JFYWNoKChidWYpID0+IHdhc20uX09ydEZyZWUoYnVmKSk7XHJcblxyXG4gICAgaWYgKGlvQmluZGluZ0hhbmRsZSAhPT0gMCkge1xyXG4gICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZUJpbmRpbmcoaW9CaW5kaW5nSGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChzZXNzaW9uSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBzZXNzaW9uLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhyb3cgZTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS5fZnJlZShtb2RlbERhdGFPZmZzZXQpO1xyXG4gICAgaWYgKHNlc3Npb25PcHRpb25zSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbk9wdGlvbnMoc2Vzc2lvbk9wdGlvbnNIYW5kbGUpICE9PSAwKSB7XHJcbiAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHNlc3Npb24gb3B0aW9ucy5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGFsbG9jcy5mb3JFYWNoKChhbGxvYykgPT4gd2FzbS5fZnJlZShhbGxvYykpO1xyXG5cclxuICAgIC8vIHVubW91bnQgZXh0ZXJuYWwgZGF0YSBpZiBuZWNlc3NhcnlcclxuICAgIHdhc20udW5tb3VudEV4dGVybmFsRGF0YT8uKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gKHNlc3Npb25JZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xyXG4gIGlmICghc2Vzc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcmVsZWFzZSBzZXNzaW9uLiBpbnZhbGlkIHNlc3Npb24gaWQ6ICR7c2Vzc2lvbklkfWApO1xyXG4gIH1cclxuICBjb25zdCBbc2Vzc2lvbkhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkLCBpb0JpbmRpbmdTdGF0ZSwgZW5hYmxlR3JhcGhDYXB0dXJlXSA9IHNlc3Npb247XHJcblxyXG4gIGlmIChpb0JpbmRpbmdTdGF0ZSkge1xyXG4gICAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSkge1xyXG4gICAgICBpZiAod2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY2xlYXIgYm91bmQgb3V0cHV0cy5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh3YXNtLl9PcnRSZWxlYXNlQmluZGluZyhpb0JpbmRpbmdTdGF0ZS5oYW5kbGUpICE9PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSBJTyBiaW5kaW5nLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdhc20uanNlcE9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xyXG4gIHdhc20ud2Vibm5PblJlbGVhc2VTZXNzaW9uPy4oc2Vzc2lvbklkKTtcclxuICB3YXNtLndlYmdwdU9uUmVsZWFzZVNlc3Npb24/LihzZXNzaW9uSWQpO1xyXG5cclxuICBpbnB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xyXG4gIG91dHB1dE5hbWVzVVRGOEVuY29kZWQuZm9yRWFjaCgoYnVmKSA9PiB3YXNtLl9PcnRGcmVlKGJ1ZikpO1xyXG4gIGlmICh3YXNtLl9PcnRSZWxlYXNlU2Vzc2lvbihzZXNzaW9uSGFuZGxlKSAhPT0gMCkge1xyXG4gICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHNlc3Npb24uXCIpO1xyXG4gIH1cclxuICBhY3RpdmVTZXNzaW9ucy5kZWxldGUoc2Vzc2lvbklkKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmVwYXJlSW5wdXRPdXRwdXRUZW5zb3IgPSBhc3luYyAoXHJcbiAgdGVuc29yOiBUZW5zb3JNZXRhZGF0YSB8IG51bGwsXHJcbiAgdGVuc29ySGFuZGxlczogbnVtYmVyW10sXHJcbiAgYWxsb2NzOiBudW1iZXJbXSxcclxuICBzZXNzaW9uSWQ6IG51bWJlcixcclxuICB0ZW5zb3JOYW1lVVRGOEVuY29kZWQ6IG51bWJlcixcclxuICBpbmRleDogbnVtYmVyLFxyXG4gIGVuYWJsZUdyYXBoQ2FwdHVyZSA9IGZhbHNlLFxyXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoIXRlbnNvcikge1xyXG4gICAgdGVuc29ySGFuZGxlcy5wdXNoKDApO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3QgcHRyU2l6ZSA9IHdhc20uUFRSX1NJWkU7XHJcblxyXG4gIGNvbnN0IGRhdGFUeXBlID0gdGVuc29yWzBdO1xyXG4gIGNvbnN0IGRpbXMgPSB0ZW5zb3JbMV07XHJcbiAgY29uc3QgbG9jYXRpb24gPSB0ZW5zb3JbM107XHJcbiAgbGV0IGFjdHVhbExvY2F0aW9uID0gbG9jYXRpb247XHJcblxyXG4gIGxldCByYXdEYXRhOiBudW1iZXI7XHJcbiAgbGV0IGRhdGFCeXRlTGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gIGlmIChkYXRhVHlwZSA9PT0gJ3N0cmluZycgJiYgKGxvY2F0aW9uID09PSAnZ3B1LWJ1ZmZlcicgfHwgbG9jYXRpb24gPT09ICdtbC10ZW5zb3InKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGVuYWJsZUdyYXBoQ2FwdHVyZSAmJiBsb2NhdGlvbiAhPT0gJ2dwdS1idWZmZXInKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBFeHRlcm5hbCBidWZmZXIgbXVzdCBiZSBwcm92aWRlZCBmb3IgaW5wdXQvb3V0cHV0IGluZGV4ICR7aW5kZXh9IHdoZW4gZW5hYmxlR3JhcGhDYXB0dXJlIGlzIHRydWUuYCxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAobG9jYXRpb24gPT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgY29uc3QgZ3B1QnVmZmVyID0gdGVuc29yWzJdLmdwdUJ1ZmZlcjtcclxuICAgIGRhdGFCeXRlTGVuZ3RoID0gY2FsY3VsYXRlVGVuc29yU2l6ZUluQnl0ZXModGVuc29yRGF0YVR5cGVTdHJpbmdUb0VudW0oZGF0YVR5cGUpLCBkaW1zKSE7XHJcblxyXG4gICAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSB7XHJcbiAgICAgIGNvbnN0IHJlZ2lzdGVyQnVmZmVyID0gd2FzbS53ZWJncHVSZWdpc3RlckJ1ZmZlcjtcclxuICAgICAgaWYgKCFyZWdpc3RlckJ1ZmZlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGVuc29yIGxvY2F0aW9uIFwiZ3B1LWJ1ZmZlclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJHUFUuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJhd0RhdGEgPSByZWdpc3RlckJ1ZmZlcihncHVCdWZmZXIsIHNlc3Npb25JZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCByZWdpc3RlckJ1ZmZlciA9IHdhc20uanNlcFJlZ2lzdGVyQnVmZmVyO1xyXG4gICAgICBpZiAoIXJlZ2lzdGVyQnVmZmVyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgbG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcclxuICAgICAgfVxyXG4gICAgICByYXdEYXRhID0gcmVnaXN0ZXJCdWZmZXIoc2Vzc2lvbklkLCBpbmRleCwgZ3B1QnVmZmVyLCBkYXRhQnl0ZUxlbmd0aCk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChsb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpIHtcclxuICAgIGNvbnN0IG1sVGVuc29yID0gdGVuc29yWzJdLm1sVGVuc29yO1xyXG4gICAgZGF0YUJ5dGVMZW5ndGggPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyh0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIGRpbXMpITtcclxuXHJcbiAgICBjb25zdCByZWdpc3Rlck1MVGVuc29yID0gd2FzbS53ZWJublJlZ2lzdGVyTUxUZW5zb3I7XHJcbiAgICBpZiAoIXJlZ2lzdGVyTUxUZW5zb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUZW5zb3IgbG9jYXRpb24gXCJtbC10ZW5zb3JcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViTk4uJyk7XHJcbiAgICB9XHJcbiAgICByYXdEYXRhID0gcmVnaXN0ZXJNTFRlbnNvcihzZXNzaW9uSWQsIG1sVGVuc29yLCB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksIGRpbXMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCBkYXRhID0gdGVuc29yWzJdO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgIC8vIHN0cmluZyB0ZW5zb3JcclxuICAgICAgZGF0YUJ5dGVMZW5ndGggPSBwdHJTaXplICogZGF0YS5sZW5ndGg7XHJcbiAgICAgIHJhd0RhdGEgPSB3YXNtLl9tYWxsb2MoZGF0YUJ5dGVMZW5ndGgpO1xyXG4gICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2ldICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgdGVuc29yIGRhdGEgYXQgaW5kZXggJHtpfSBpcyBub3QgYSBzdHJpbmdgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgd2FzbS5zZXRWYWx1ZShyYXdEYXRhICsgaSAqIHB0clNpemUsIGFsbG9jV2FzbVN0cmluZyhkYXRhW2ldLCBhbGxvY3MpLCAnKicpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpc0dyYXBoSW5wdXQgPSB3YXNtLndlYm5uSXNHcmFwaElucHV0O1xyXG4gICAgICBjb25zdCBpc0dyYXBoT3V0cHV0ID0gd2FzbS53ZWJubklzR3JhcGhPdXRwdXQ7XHJcbiAgICAgIGlmIChkYXRhVHlwZSAhPT0gJ3N0cmluZycgJiYgaXNHcmFwaElucHV0ICYmIGlzR3JhcGhPdXRwdXQpIHtcclxuICAgICAgICBjb25zdCB0ZW5zb3JOYW1lID0gd2FzbS5VVEY4VG9TdHJpbmcodGVuc29yTmFtZVVURjhFbmNvZGVkKTtcclxuICAgICAgICAvLyBQcm9tb3RlIHRoZSB0ZW5zb3IgdG8gJ21sLXRlbnNvcicgaWYgaXQgaXMgYSBncmFwaCBpbnB1dC5cclxuICAgICAgICBpZiAoaXNHcmFwaElucHV0KHNlc3Npb25JZCwgdGVuc29yTmFtZSkgfHwgaXNHcmFwaE91dHB1dChzZXNzaW9uSWQsIHRlbnNvck5hbWUpKSB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhVHlwZUVudW0gPSB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSk7XHJcbiAgICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKGRhdGFUeXBlRW51bSwgZGltcykhO1xyXG4gICAgICAgICAgYWN0dWFsTG9jYXRpb24gPSAnbWwtdGVuc29yJztcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZVRlbXBvcmFyeVRlbnNvciA9IHdhc20ud2Vibm5DcmVhdGVUZW1wb3JhcnlUZW5zb3I7XHJcbiAgICAgICAgICBjb25zdCB1cGxvYWRUZW5zb3IgPSB3YXNtLndlYm5uVXBsb2FkVGVuc29yO1xyXG4gICAgICAgICAgaWYgKCFjcmVhdGVUZW1wb3JhcnlUZW5zb3IgfHwgIXVwbG9hZFRlbnNvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RlbnNvciBsb2NhdGlvbiBcIm1sLXRlbnNvclwiIGlzIG5vdCBzdXBwb3J0ZWQgd2l0aG91dCB1c2luZyBXZWJOTi4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IHRlbnNvcklkID0gYXdhaXQgY3JlYXRlVGVtcG9yYXJ5VGVuc29yKHNlc3Npb25JZCwgZGF0YVR5cGVFbnVtLCBkaW1zKTtcclxuICAgICAgICAgIHVwbG9hZFRlbnNvcih0ZW5zb3JJZCwgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKSk7XHJcbiAgICAgICAgICByYXdEYXRhID0gdGVuc29ySWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGFCeXRlTGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgICAgcmF3RGF0YSA9IHdhc20uX21hbGxvYyhkYXRhQnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgICAgIHdhc20uSEVBUFU4LnNldChuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhQnl0ZUxlbmd0aCksIHJhd0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXRhQnl0ZUxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICByYXdEYXRhID0gd2FzbS5fbWFsbG9jKGRhdGFCeXRlTGVuZ3RoKTtcclxuICAgICAgICBhbGxvY3MucHVzaChyYXdEYXRhKTtcclxuICAgICAgICB3YXNtLkhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YUJ5dGVMZW5ndGgpLCByYXdEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RhY2sgPSB3YXNtLnN0YWNrU2F2ZSgpO1xyXG4gIGNvbnN0IGRpbXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIGRpbXMubGVuZ3RoKTtcclxuICB0cnkge1xyXG4gICAgZGltcy5mb3JFYWNoKChkLCBpbmRleCkgPT4gd2FzbS5zZXRWYWx1ZShkaW1zT2Zmc2V0ICsgaW5kZXggKiBwdHJTaXplLCBkLCBwdHJTaXplID09PSA0ID8gJ2kzMicgOiAnaTY0JykpO1xyXG4gICAgY29uc3QgdGVuc29yID0gd2FzbS5fT3J0Q3JlYXRlVGVuc29yKFxyXG4gICAgICB0ZW5zb3JEYXRhVHlwZVN0cmluZ1RvRW51bShkYXRhVHlwZSksXHJcbiAgICAgIHJhd0RhdGEsXHJcbiAgICAgIGRhdGFCeXRlTGVuZ3RoLFxyXG4gICAgICBkaW1zT2Zmc2V0LFxyXG4gICAgICBkaW1zLmxlbmd0aCxcclxuICAgICAgZGF0YUxvY2F0aW9uU3RyaW5nVG9FbnVtKGFjdHVhbExvY2F0aW9uKSxcclxuICAgICk7XHJcbiAgICBpZiAodGVuc29yID09PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKGBDYW4ndCBjcmVhdGUgdGVuc29yIGZvciBpbnB1dC9vdXRwdXQuIHNlc3Npb249JHtzZXNzaW9uSWR9LCBpbmRleD0ke2luZGV4fS5gKTtcclxuICAgIH1cclxuICAgIHRlbnNvckhhbmRsZXMucHVzaCh0ZW5zb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICB3YXNtLnN0YWNrUmVzdG9yZShzdGFjayk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIHBlcmZvcm0gaW5mZXJlbmNlIHJ1blxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHJ1biA9IGFzeW5jIChcclxuICBzZXNzaW9uSWQ6IG51bWJlcixcclxuICBpbnB1dEluZGljZXM6IG51bWJlcltdLFxyXG4gIGlucHV0VGVuc29yczogVGVuc29yTWV0YWRhdGFbXSxcclxuICBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSxcclxuICBvdXRwdXRUZW5zb3JzOiBBcnJheTxUZW5zb3JNZXRhZGF0YSB8IG51bGw+LFxyXG4gIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcclxuKTogUHJvbWlzZTxUZW5zb3JNZXRhZGF0YVtdPiA9PiB7XHJcbiAgY29uc3Qgd2FzbSA9IGdldEluc3RhbmNlKCk7XHJcbiAgY29uc3QgcHRyU2l6ZSA9IHdhc20uUFRSX1NJWkU7XHJcbiAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zLmdldChzZXNzaW9uSWQpO1xyXG4gIGlmICghc2Vzc2lvbikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgcnVuIGluZmVyZW5jZS4gaW52YWxpZCBzZXNzaW9uIGlkOiAke3Nlc3Npb25JZH1gKTtcclxuICB9XHJcbiAgY29uc3Qgc2Vzc2lvbkhhbmRsZSA9IHNlc3Npb25bMF07XHJcbiAgY29uc3QgaW5wdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsxXTtcclxuICBjb25zdCBvdXRwdXROYW1lc1VURjhFbmNvZGVkID0gc2Vzc2lvblsyXTtcclxuICBjb25zdCBpb0JpbmRpbmdTdGF0ZSA9IHNlc3Npb25bM107XHJcbiAgY29uc3QgZW5hYmxlR3JhcGhDYXB0dXJlID0gc2Vzc2lvbls0XTtcclxuICBjb25zdCBpbnB1dE91dHB1dEJvdW5kID0gc2Vzc2lvbls1XTtcclxuXHJcbiAgY29uc3QgaW5wdXRDb3VudCA9IGlucHV0SW5kaWNlcy5sZW5ndGg7XHJcbiAgY29uc3Qgb3V0cHV0Q291bnQgPSBvdXRwdXRJbmRpY2VzLmxlbmd0aDtcclxuXHJcbiAgbGV0IHJ1bk9wdGlvbnNIYW5kbGUgPSAwO1xyXG4gIGxldCBydW5PcHRpb25zQWxsb2NzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdCBpbnB1dFRlbnNvckhhbmRsZXM6IG51bWJlcltdID0gW107XHJcbiAgY29uc3Qgb3V0cHV0VGVuc29ySGFuZGxlczogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCBpbnB1dE91dHB1dEFsbG9jczogbnVtYmVyW10gPSBbXTtcclxuICBjb25zdCBwcmVBbGxvY2F0ZWRPdXRwdXRzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBjb25zdCBiZWZvcmVSdW5TdGFjayA9IHdhc20uc3RhY2tTYXZlKCk7XHJcbiAgY29uc3QgaW5wdXRWYWx1ZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIHB0clNpemUpO1xyXG4gIGNvbnN0IGlucHV0TmFtZXNPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoaW5wdXRDb3VudCAqIHB0clNpemUpO1xyXG4gIGNvbnN0IG91dHB1dFZhbHVlc09mZnNldCA9IHdhc20uc3RhY2tBbGxvYyhvdXRwdXRDb3VudCAqIHB0clNpemUpO1xyXG4gIGNvbnN0IG91dHB1dE5hbWVzT2Zmc2V0ID0gd2FzbS5zdGFja0FsbG9jKG91dHB1dENvdW50ICogcHRyU2l6ZSk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBbcnVuT3B0aW9uc0hhbmRsZSwgcnVuT3B0aW9uc0FsbG9jc10gPSBzZXRSdW5PcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcicpO1xyXG4gICAgLy8gY3JlYXRlIGlucHV0IHRlbnNvcnNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGF3YWl0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcclxuICAgICAgICBpbnB1dFRlbnNvcnNbaV0sXHJcbiAgICAgICAgaW5wdXRUZW5zb3JIYW5kbGVzLFxyXG4gICAgICAgIGlucHV0T3V0cHV0QWxsb2NzLFxyXG4gICAgICAgIHNlc3Npb25JZCxcclxuICAgICAgICBpbnB1dE5hbWVzVVRGOEVuY29kZWRbaW5wdXRJbmRpY2VzW2ldXSxcclxuICAgICAgICBpbnB1dEluZGljZXNbaV0sXHJcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBvdXRwdXQgdGVuc29yc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdXRwdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIGF3YWl0IHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcihcclxuICAgICAgICBvdXRwdXRUZW5zb3JzW2ldLFxyXG4gICAgICAgIG91dHB1dFRlbnNvckhhbmRsZXMsXHJcbiAgICAgICAgaW5wdXRPdXRwdXRBbGxvY3MsXHJcbiAgICAgICAgc2Vzc2lvbklkLFxyXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWRbb3V0cHV0SW5kaWNlc1tpXV0sXHJcbiAgICAgICAgaW5wdXRDb3VudCArIG91dHB1dEluZGljZXNbaV0sXHJcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIHByZXBhcmVJbnB1dE91dHB1dFRlbnNvcicpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgIHdhc20uc2V0VmFsdWUoaW5wdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldLCAnKicpO1xyXG4gICAgICB3YXNtLnNldFZhbHVlKGlucHV0TmFtZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2lucHV0SW5kaWNlc1tpXV0sICcqJyk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcclxuICAgICAgd2FzbS5zZXRWYWx1ZShvdXRwdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgb3V0cHV0VGVuc29ySGFuZGxlc1tpXSwgJyonKTtcclxuICAgICAgd2FzbS5zZXRWYWx1ZShvdXRwdXROYW1lc09mZnNldCArIGkgKiBwdHJTaXplLCBvdXRwdXROYW1lc1VURjhFbmNvZGVkW291dHB1dEluZGljZXNbaV1dLCAnKicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQIHx8ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSAmJiBpb0JpbmRpbmdTdGF0ZSAmJiAhaW5wdXRPdXRwdXRCb3VuZCkge1xyXG4gICAgICBjb25zdCB7IGhhbmRsZSwgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zLCBvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNFbmNvZGVkIH0gPSBpb0JpbmRpbmdTdGF0ZTtcclxuXHJcbiAgICAgIGlmIChpbnB1dE5hbWVzVVRGOEVuY29kZWQubGVuZ3RoICE9PSBpbnB1dENvdW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgYGlucHV0IGNvdW50IGZyb20gZmVlZHMgKCR7aW5wdXRDb3VudH0pIGlzIGV4cGVjdGVkIHRvIGJlIGFsd2F5cyBlcXVhbCB0byBtb2RlbCdzIGlucHV0IGNvdW50ICgke2lucHV0TmFtZXNVVEY4RW5jb2RlZC5sZW5ndGh9KS5gLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIGJpbmRJbnB1dHNPdXRwdXRzJyk7XHJcbiAgICAgIC8vIHByb2Nlc3MgaW5wdXRzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBpbnB1dEluZGljZXNbaV07XHJcbiAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gYXdhaXQgd2FzbS5fT3J0QmluZElucHV0KGhhbmRsZSwgaW5wdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSwgaW5wdXRUZW5zb3JIYW5kbGVzW2ldKTtcclxuICAgICAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBpbnB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBwcm9jZXNzIHByZS1hbGxvY2F0ZWQgb3V0cHV0c1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG91dHB1dENvdW50OyBpKyspIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IG91dHB1dEluZGljZXNbaV07XHJcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBvdXRwdXRUZW5zb3JzW2ldPy5bM107IC8vIHVuZGVmaW5lZCBtZWFucyBvdXRwdXQgaXMgbm90IHByZS1hbGxvY2F0ZWQuXHJcblxyXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgLy8gb3V0cHV0IGlzIHByZS1hbGxvY2F0ZWQsIHN0b3JlIGFuZCBiaW5kIHRoZSB0ZW5zb3IuXHJcbiAgICAgICAgICBwcmVBbGxvY2F0ZWRPdXRwdXRzLnB1c2gob3V0cHV0VGVuc29ySGFuZGxlc1tpXSk7XHJcbiAgICAgICAgICBjb25zdCBlcnJvckNvZGUgPSB3YXNtLl9PcnRCaW5kT3V0cHV0KGhhbmRsZSwgb3V0cHV0TmFtZXNVVEY4RW5jb2RlZFtpbmRleF0sIG91dHB1dFRlbnNvckhhbmRsZXNbaV0sIDApO1xyXG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBwcmUtYWxsb2NhdGVkIG91dHB1dFske2l9XSBmb3Igc2Vzc2lvbj0ke3Nlc3Npb25JZH0uYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIG91dHB1dCBpcyBub3QgcHJlLWFsbG9jYXRlZC4gcmVzZXQgcHJlZmVycmVkIGxvY2F0aW9uLlxyXG4gICAgICAgICAgY29uc3QgZXJyb3JDb2RlID0gd2FzbS5fT3J0QmluZE91dHB1dChcclxuICAgICAgICAgICAgaGFuZGxlLFxyXG4gICAgICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkW2luZGV4XSxcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgb3V0cHV0UHJlZmVycmVkTG9jYXRpb25zRW5jb2RlZFtpbmRleF0sXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBjaGVja0xhc3RFcnJvcihgQ2FuJ3QgYmluZCBvdXRwdXRbJHtpfV0gdG8gJHtvdXRwdXRQcmVmZXJyZWRMb2NhdGlvbnNbaV19IGZvciBzZXNzaW9uPSR7c2Vzc2lvbklkfS5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgVFJBQ0VfRVZFTlRfRU5EKCd3YXNtIGJpbmRJbnB1dHNPdXRwdXRzJyk7XHJcbiAgICAgIGFjdGl2ZVNlc3Npb25zLnNldChzZXNzaW9uSWQsIFtcclxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxyXG4gICAgICAgIGlucHV0TmFtZXNVVEY4RW5jb2RlZCxcclxuICAgICAgICBvdXRwdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLFxyXG4gICAgICAgIGVuYWJsZUdyYXBoQ2FwdHVyZSxcclxuICAgICAgICB0cnVlLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICB3YXNtLmpzZXBPblJ1blN0YXJ0Py4oc2Vzc2lvbkhhbmRsZSk7XHJcbiAgICB3YXNtLndlYm5uT25SdW5TdGFydD8uKHNlc3Npb25IYW5kbGUpO1xyXG5cclxuICAgIGxldCBlcnJvckNvZGU6IG51bWJlcjtcclxuICAgIGlmICgoIUJVSUxEX0RFRlMuRElTQUJMRV9KU0VQIHx8ICFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR1BVKSAmJiBpb0JpbmRpbmdTdGF0ZSkge1xyXG4gICAgICBlcnJvckNvZGUgPSBhd2FpdCB3YXNtLl9PcnRSdW5XaXRoQmluZGluZyhcclxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxyXG4gICAgICAgIGlvQmluZGluZ1N0YXRlLmhhbmRsZSxcclxuICAgICAgICBvdXRwdXRDb3VudCxcclxuICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsXHJcbiAgICAgICAgcnVuT3B0aW9uc0hhbmRsZSxcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVycm9yQ29kZSA9IGF3YWl0IHdhc20uX09ydFJ1bihcclxuICAgICAgICBzZXNzaW9uSGFuZGxlLFxyXG4gICAgICAgIGlucHV0TmFtZXNPZmZzZXQsXHJcbiAgICAgICAgaW5wdXRWYWx1ZXNPZmZzZXQsXHJcbiAgICAgICAgaW5wdXRDb3VudCxcclxuICAgICAgICBvdXRwdXROYW1lc09mZnNldCxcclxuICAgICAgICBvdXRwdXRDb3VudCxcclxuICAgICAgICBvdXRwdXRWYWx1ZXNPZmZzZXQsXHJcbiAgICAgICAgcnVuT3B0aW9uc0hhbmRsZSxcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXJyb3JDb2RlICE9PSAwKSB7XHJcbiAgICAgIGNoZWNrTGFzdEVycm9yKCdmYWlsZWQgdG8gY2FsbCBPcnRSdW4oKS4nKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRwdXQ6IFRlbnNvck1ldGFkYXRhW10gPSBbXTtcclxuICAgIGNvbnN0IG91dHB1dFByb21pc2VzOiBBcnJheTxQcm9taXNlPFtudW1iZXIsIFRlbnNvci5EYXRhVHlwZV0+PiA9IFtdO1xyXG5cclxuICAgIFRSQUNFX0VWRU5UX0JFR0lOKCd3YXNtIFByb2Nlc3NPdXRwdXRUZW5zb3InKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Q291bnQ7IGkrKykge1xyXG4gICAgICBjb25zdCB0ZW5zb3IgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZShvdXRwdXRWYWx1ZXNPZmZzZXQgKyBpICogcHRyU2l6ZSwgJyonKSk7XHJcbiAgICAgIC8vIFRPRE86IHJldmlzaXQgdGhpcyBwYXJ0IHRvIGVuc3VyZSBpdCB3b3JrcyBmb3IgV2ViR1BVIHdoZW4gYm90aCBwcmUtYWxsb2NhdGVkIG91dHB1dHMgYW5kXHJcbiAgICAgIC8vIHByZWZlcnJlZCBsb2NhdGlvbiBhcmUgc3BlY2lmaWVkLlxyXG4gICAgICAvLyBDZXJ0YWluIHByZS1hbGxvY2F0ZWQgdGVuc29ycyBtYXkgYWxyZWFkeSBiZSBib3VuZCBpbiB0aGUgSU8gYmluZGluZy4gZS5nLiB0aGUgV2ViTk4gYmFja2VuZFxyXG4gICAgICAvLyBhbHdheXMgYmluZHMgaXRzIHRlbnNvciB0byAnbWwtdGVuc29yJy4gSW4gc3VjaCBjYXNlcywgdGhlIHRlbnNvciBJRCBtaWdodCBjaGFuZ2UgYWZ0ZXIgYmluZGluZyxcclxuICAgICAgLy8gYnV0IGNvcHlpbmcgZGF0YSBmb3IgdGhlc2UgdGVuc29ycyBzaG91bGQgc3RpbGwgYmUgYXZvaWRlZC5cclxuICAgICAgaWYgKHRlbnNvciA9PT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSB8fCBwcmVBbGxvY2F0ZWRPdXRwdXRzLmluY2x1ZGVzKG91dHB1dFRlbnNvckhhbmRsZXNbaV0pKSB7XHJcbiAgICAgICAgLy8gb3V0cHV0IHRlbnNvciBpcyBwcmUtYWxsb2NhdGVkLiBubyBuZWVkIHRvIGNvcHkgZGF0YS5cclxuICAgICAgICBvdXRwdXQucHVzaChvdXRwdXRUZW5zb3JzW2ldISk7XHJcbiAgICAgICAgaWYgKHRlbnNvciAhPT0gb3V0cHV0VGVuc29ySGFuZGxlc1tpXSkge1xyXG4gICAgICAgICAgLy8gcmVsZWFzZSByZWR1bmRhbnQgdGVuc29yIGVhcmxpZXIuXHJcbiAgICAgICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgcmVsZWFzZSB0ZW5zb3IuXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYmVmb3JlR2V0VGVuc29yRGF0YVN0YWNrID0gd2FzbS5zdGFja1NhdmUoKTtcclxuICAgICAgLy8gc3RhY2sgYWxsb2NhdGUgNCBwb2ludGVyIHZhbHVlXHJcbiAgICAgIGNvbnN0IHRlbnNvckRhdGFPZmZzZXQgPSB3YXNtLnN0YWNrQWxsb2MoNCAqIHB0clNpemUpO1xyXG5cclxuICAgICAgbGV0IGtlZXBPdXRwdXRUZW5zb3IgPSBmYWxzZTtcclxuICAgICAgbGV0IHR5cGU6IFRlbnNvci5UeXBlIHwgdW5kZWZpbmVkLFxyXG4gICAgICAgIGRhdGFPZmZzZXQgPSAwO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yQ29kZSA9IHdhc20uX09ydEdldFRlbnNvckRhdGEoXHJcbiAgICAgICAgICB0ZW5zb3IsXHJcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0LFxyXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIHB0clNpemUsXHJcbiAgICAgICAgICB0ZW5zb3JEYXRhT2Zmc2V0ICsgMiAqIHB0clNpemUsXHJcblxyXG4gICAgICAgICAgdGVuc29yRGF0YU9mZnNldCArIDMgKiBwdHJTaXplLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGVycm9yQ29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgY2hlY2tMYXN0RXJyb3IoYENhbid0IGFjY2VzcyBvdXRwdXQgdGVuc29yIGRhdGEgb24gaW5kZXggJHtpfS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsdWVUeXBlID0gcHRyU2l6ZSA9PT0gNCA/ICdpMzInIDogJ2k2NCc7XHJcbiAgICAgICAgY29uc3QgZGF0YVR5cGUgPSBOdW1iZXIod2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0LCB2YWx1ZVR5cGUpKTtcclxuICAgICAgICBkYXRhT2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSwgJyonKTtcclxuICAgICAgICBjb25zdCBkaW1zT2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZSh0ZW5zb3JEYXRhT2Zmc2V0ICsgcHRyU2l6ZSAqIDIsICcqJyk7XHJcbiAgICAgICAgY29uc3QgZGltc0xlbmd0aCA9IE51bWJlcih3YXNtLmdldFZhbHVlKHRlbnNvckRhdGFPZmZzZXQgKyBwdHJTaXplICogMywgdmFsdWVUeXBlKSk7XHJcbiAgICAgICAgY29uc3QgZGltcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBkaW1zLnB1c2goTnVtYmVyKHdhc20uZ2V0VmFsdWUoZGltc09mZnNldCArIGkgKiBwdHJTaXplLCB2YWx1ZVR5cGUpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3YXNtLl9PcnRGcmVlKGRpbXNPZmZzZXQpICE9PSAwKSB7XHJcbiAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGZyZWUgbWVtb3J5IGZvciB0ZW5zb3IgZGltcy5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNpemUgPSBkaW1zLnJlZHVjZSgoYSwgYikgPT4gYSAqIGIsIDEpO1xyXG4gICAgICAgIHR5cGUgPSB0ZW5zb3JEYXRhVHlwZUVudW1Ub1N0cmluZyhkYXRhVHlwZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZWZlcnJlZExvY2F0aW9uID0gaW9CaW5kaW5nU3RhdGU/Lm91dHB1dFByZWZlcnJlZExvY2F0aW9uc1tvdXRwdXRJbmRpY2VzW2ldXTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyB8fCBwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgb24gR1BVLicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3Qgc3RyaW5nRGF0YTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHdhc20uZ2V0VmFsdWUoZGF0YU9mZnNldCArIGkgKiBwdHJTaXplLCAnKicpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0T2Zmc2V0ID0gd2FzbS5nZXRWYWx1ZShkYXRhT2Zmc2V0ICsgKGkgKyAxKSAqIHB0clNpemUsICcqJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heEJ5dGVzVG9SZWFkID0gaSA9PT0gc2l6ZSAtIDEgPyB1bmRlZmluZWQgOiBuZXh0T2Zmc2V0IC0gb2Zmc2V0O1xyXG4gICAgICAgICAgICBzdHJpbmdEYXRhLnB1c2god2FzbS5VVEY4VG9TdHJpbmcob2Zmc2V0LCBtYXhCeXRlc1RvUmVhZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIHN0cmluZ0RhdGEsICdjcHUnXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIElmIGEgY2VydGFpbiBvdXRwdXQncyBwcmVmZXJyZWQgbG9jYXRpb24gaXMgR1BVIGJ1dCB0aGUgdGVuc29yIGlzIGVtcHR5LCB3ZSBzdGlsbCBuZWVkIHRvIGNyZWF0ZSBhIENQVVxyXG4gICAgICAgICAgLy8gdGVuc29yIGZvciBpdC4gVGhlcmUgaXMgbm8gbWFwcGluZyBHUFUgYnVmZmVyIGZvciBhbiBlbXB0eSB0ZW5zb3IuXHJcbiAgICAgICAgICBpZiAocHJlZmVycmVkTG9jYXRpb24gPT09ICdncHUtYnVmZmVyJyAmJiBzaXplID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRCdWZmZXIgPSAhQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSA/IHdhc20ud2ViZ3B1R2V0QnVmZmVyIDogd2FzbS5qc2VwR2V0QnVmZmVyO1xyXG4gICAgICAgICAgICBpZiAoIWdldEJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJncHUtYnVmZmVyXCIgaXMgbm90IHN1cHBvcnRlZCB3aXRob3V0IHVzaW5nIFdlYkdQVS4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBncHVCdWZmZXIgPSBnZXRCdWZmZXIoZGF0YU9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSBjYWxjdWxhdGVUZW5zb3JTaXplSW5CeXRlcyhkYXRhVHlwZSwgc2l6ZSk7XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJTaXplID09PSB1bmRlZmluZWQgfHwgIWlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSh0eXBlKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZGF0YSB0eXBlOiAke3R5cGV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxyXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gICAgICAgICAgICAgIHdhc20ud2ViZ3B1UmVnaXN0ZXJCdWZmZXIhKGdwdUJ1ZmZlciwgc2Vzc2lvbklkLCBkYXRhT2Zmc2V0KTtcclxuICAgICAgICAgICAgICBjb25zdCBkb3dubG9hZERhdGFGdW5jdGlvbiA9IHdhc20ud2ViZ3B1Q3JlYXRlRG93bmxvYWRlciEoZ3B1QnVmZmVyLCBidWZmZXJTaXplLCBzZXNzaW9uSWQpO1xyXG4gICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcclxuICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICBkaW1zLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBncHVCdWZmZXIsXHJcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBhd2FpdCBkb3dubG9hZERhdGFGdW5jdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgKHRlbnNvclR5cGVUb1R5cGVkQXJyYXlDb25zdHJ1Y3Rvcih0eXBlISkpKGFycmF5QnVmZmVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBUZW5zb3IuRGF0YVR5cGVNYXBbVGVuc29yLkdwdUJ1ZmZlckRhdGFUeXBlc107XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2FzbS5fT3J0UmVsZWFzZVRlbnNvcih0ZW5zb3IpICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IHJlbGVhc2UgdGVuc29yLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgJ2dwdS1idWZmZXInLFxyXG4gICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcclxuICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICBkaW1zLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICBncHVCdWZmZXIsXHJcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkOiB3YXNtLmpzZXBDcmVhdGVEb3dubG9hZGVyIShncHVCdWZmZXIsIGJ1ZmZlclNpemUsIHR5cGUpLFxyXG4gICAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tMYXN0RXJyb3IoXCJDYW4ndCByZWxlYXNlIHRlbnNvci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICdncHUtYnVmZmVyJyxcclxuICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvcicgJiYgc2l6ZSA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZW5zdXJlVGVuc29yID0gd2FzbS53ZWJubkVuc3VyZVRlbnNvcjtcclxuICAgICAgICAgICAgY29uc3QgaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZCA9IHdhc20ud2Vibm5Jc0dyYXBoSW5wdXRPdXRwdXRUeXBlU3VwcG9ydGVkO1xyXG4gICAgICAgICAgICBpZiAoIWVuc3VyZVRlbnNvciB8fCAhaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncHJlZmVycmVkTG9jYXRpb24gXCJtbC10ZW5zb3JcIiBpcyBub3Qgc3VwcG9ydGVkIHdpdGhvdXQgdXNpbmcgV2ViTk4uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdGVuc29yU2l6ZSA9IGNhbGN1bGF0ZVRlbnNvclNpemVJbkJ5dGVzKGRhdGFUeXBlLCBzaXplKTtcclxuICAgICAgICAgICAgaWYgKHRlbnNvclNpemUgPT09IHVuZGVmaW5lZCB8fCAhaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUodHlwZSkpIHtcclxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIGRhdGEgdHlwZTogJHt0eXBlfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNHcmFwaElucHV0T3V0cHV0VHlwZVN1cHBvcnRlZChzZXNzaW9uSWQsIHR5cGUsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICAgICAgICAgIGBwcmVmZXJyZWRMb2NhdGlvbiBcIm1sLXRlbnNvclwiIGZvciAke3R5cGV9IG91dHB1dCBpcyBub3Qgc3VwcG9ydGVkIGJ5IGN1cnJlbnQgV2ViTk4gQ29udGV4dC5gLFxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBncmFwaCBoYXMgYmVlbiBwYXJ0aXRpb25lZCwgdGhlIG91dHB1dCB0ZW5zb3IgbWF5IGhhdmUgbm90IGJlZW4gY3JlYXRlZC4gRm9yIHRoaXMgcmVhc29uLCB3ZSB1c2VcclxuICAgICAgICAgICAgLy8gZW5zdXJlVGVuc29yIHRvIGdldC9jcmVhdGUgdGhlIE1MVGVuc29yLiBJbiB3aGljaCBjYXNlLCB3ZSBkb24ndCBuZWVkIHRvIGNvcHkgdGhlIGRhdGEgaWYgYSBuZXcgdGVuc29yXHJcbiAgICAgICAgICAgIC8vIGhhcyBiZWVuIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgIGNvbnN0IG1sVGVuc29yID0gYXdhaXQgZW5zdXJlVGVuc29yKHNlc3Npb25JZCwgZGF0YU9mZnNldCwgZGF0YVR5cGUsIGRpbXMsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCByZWxlYXNlIHRoZSB0ZW5zb3IgcmlnaHQgbm93LiBpdCB3aWxsIGJlIHJlbGVhc2VkIHdoZW4gdXNlciBjYWxscyB0ZW5zb3IuZGlzcG9zZSgpLlxyXG4gICAgICAgICAgICBrZWVwT3V0cHV0VGVuc29yID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFtcclxuICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgIGRpbXMsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWxUZW5zb3IsXHJcbiAgICAgICAgICAgICAgICBkb3dubG9hZDogd2FzbS53ZWJubkNyZWF0ZU1MVGVuc29yRG93bmxvYWRlciEoZGF0YU9mZnNldCwgdHlwZSksXHJcbiAgICAgICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHdhc20ud2Vibm5SZWxlYXNlVGVuc29ySWQhKGRhdGFPZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHRlbnNvcik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgJ21sLXRlbnNvcicsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChwcmVmZXJyZWRMb2NhdGlvbiA9PT0gJ21sLXRlbnNvci1jcHUtb3V0cHV0JyAmJiBzaXplID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gd2FzbS53ZWJubkNyZWF0ZU1MVGVuc29yRG93bmxvYWRlciEoZGF0YU9mZnNldCwgdHlwZSBhcyBUZW5zb3IuTUxUZW5zb3JEYXRhVHlwZXMpKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gb3V0cHV0Lmxlbmd0aDtcclxuICAgICAgICAgICAgLy8gRGVsYXkgdGhlIGRhdGEgZG93bmxvYWQgYW5kIHJlbGVhc2luZyB0aGUgdGVuc29yIHVudGlsIHdlIGNhbiB3YWl0IGZvciBhbGwgb3V0cHV0IHRlbnNvcnMgdG8gYmUgZG93bmxvYWRlZC5cclxuICAgICAgICAgICAga2VlcE91dHB1dFRlbnNvciA9IHRydWU7XHJcbiAgICAgICAgICAgIG91dHB1dFByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogW251bWJlciwgVGVuc29yLkRhdGFUeXBlXSA9IFtpbmRleCwgYXdhaXQgZGF0YV07XHJcbiAgICAgICAgICAgICAgICB3YXNtLndlYm5uUmVsZWFzZVRlbnNvcklkIShkYXRhT2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgfSkoKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goW3R5cGUsIGRpbXMsIFtdLCAnY3B1J10pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZWRBcnJheUNvbnN0cnVjdG9yID0gdGVuc29yVHlwZVRvVHlwZWRBcnJheUNvbnN0cnVjdG9yKHR5cGUpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IHR5cGVkQXJyYXlDb25zdHJ1Y3RvcihzaXplKTtcclxuICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKS5zZXQoXHJcbiAgICAgICAgICAgICAgd2FzbS5IRUFQVTguc3ViYXJyYXkoZGF0YU9mZnNldCwgZGF0YU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFt0eXBlLCBkaW1zLCBkYXRhLCAnY3B1J10pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICB3YXNtLnN0YWNrUmVzdG9yZShiZWZvcmVHZXRUZW5zb3JEYXRhU3RhY2spO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiBkYXRhT2Zmc2V0KSB7XHJcbiAgICAgICAgICB3YXNtLl9mcmVlKGRhdGFPZmZzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWtlZXBPdXRwdXRUZW5zb3IpIHtcclxuICAgICAgICAgIHdhc20uX09ydFJlbGVhc2VUZW5zb3IodGVuc29yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW9CaW5kaW5nU3RhdGUgJiYgIWVuYWJsZUdyYXBoQ2FwdHVyZSkge1xyXG4gICAgICBpZiAod2FzbS5fT3J0Q2xlYXJCb3VuZE91dHB1dHMoaW9CaW5kaW5nU3RhdGUuaGFuZGxlKSAhPT0gMCkge1xyXG4gICAgICAgIGNoZWNrTGFzdEVycm9yKFwiQ2FuJ3QgY2xlYXIgYm91bmQgb3V0cHV0cy5cIik7XHJcbiAgICAgIH1cclxuICAgICAgYWN0aXZlU2Vzc2lvbnMuc2V0KHNlc3Npb25JZCwgW1xyXG4gICAgICAgIHNlc3Npb25IYW5kbGUsXHJcbiAgICAgICAgaW5wdXROYW1lc1VURjhFbmNvZGVkLFxyXG4gICAgICAgIG91dHB1dE5hbWVzVVRGOEVuY29kZWQsXHJcbiAgICAgICAgaW9CaW5kaW5nU3RhdGUsXHJcbiAgICAgICAgZW5hYmxlR3JhcGhDYXB0dXJlLFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICBdKTtcclxuICAgIH1cclxuICAgIC8vIFdhaXQgZm9yIGFsbCBvdXRwdXQgdGVuc29yIGRhdGEgdG8gYmUgZG93bmxvYWRlZC5cclxuICAgIGZvciAoY29uc3QgW2luZGV4LCBkYXRhXSBvZiBhd2FpdCBQcm9taXNlLmFsbChvdXRwdXRQcm9taXNlcykpIHtcclxuICAgICAgb3V0cHV0W2luZGV4XVsyXSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICBUUkFDRV9FVkVOVF9FTkQoJ3dhc20gUHJvY2Vzc091dHB1dFRlbnNvcicpO1xyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgd2FzbS53ZWJubk9uUnVuRW5kPy4oc2Vzc2lvbkhhbmRsZSk7XHJcblxyXG4gICAgd2FzbS5zdGFja1Jlc3RvcmUoYmVmb3JlUnVuU3RhY2spO1xyXG5cclxuICAgIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQkdQVSkge1xyXG4gICAgICBpbnB1dFRlbnNvcnMuZm9yRWFjaCgodCkgPT4ge1xyXG4gICAgICAgIGlmICh0ICYmIHRbM10gPT09ICdncHUtYnVmZmVyJykge1xyXG4gICAgICAgICAgd2FzbS53ZWJncHVVbnJlZ2lzdGVyQnVmZmVyISh0WzJdLmdwdUJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgb3V0cHV0VGVuc29ycy5mb3JFYWNoKCh0KSA9PiB7XHJcbiAgICAgICAgaWYgKHQgJiYgdFszXSA9PT0gJ2dwdS1idWZmZXInKSB7XHJcbiAgICAgICAgICB3YXNtLndlYmdwdVVucmVnaXN0ZXJCdWZmZXIhKHRbMl0uZ3B1QnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5wdXRUZW5zb3JIYW5kbGVzLmZvckVhY2goKHYpID0+IHdhc20uX09ydFJlbGVhc2VUZW5zb3IodikpO1xyXG4gICAgb3V0cHV0VGVuc29ySGFuZGxlcy5mb3JFYWNoKCh2KSA9PiB3YXNtLl9PcnRSZWxlYXNlVGVuc29yKHYpKTtcclxuICAgIGlucHV0T3V0cHV0QWxsb2NzLmZvckVhY2goKHApID0+IHdhc20uX2ZyZWUocCkpO1xyXG5cclxuICAgIGlmIChydW5PcHRpb25zSGFuZGxlICE9PSAwKSB7XHJcbiAgICAgIHdhc20uX09ydFJlbGVhc2VSdW5PcHRpb25zKHJ1bk9wdGlvbnNIYW5kbGUpO1xyXG4gICAgfVxyXG4gICAgcnVuT3B0aW9uc0FsbG9jcy5mb3JFYWNoKChwKSA9PiB3YXNtLl9mcmVlKHApKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogZW5kIHByb2ZpbGluZ1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IChzZXNzaW9uSWQ6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHdhc20gPSBnZXRJbnN0YW5jZSgpO1xyXG4gIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9ucy5nZXQoc2Vzc2lvbklkKTtcclxuICBpZiAoIXNlc3Npb24pIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBzZXNzaW9uIGlkJyk7XHJcbiAgfVxyXG4gIGNvbnN0IHNlc3Npb25IYW5kbGUgPSBzZXNzaW9uWzBdO1xyXG5cclxuICAvLyBwcm9maWxlIGZpbGUgbmFtZSBpcyBub3QgdXNlZCB5ZXQsIGJ1dCBpdCBtdXN0IGJlIGZyZWVkLlxyXG4gIGNvbnN0IHByb2ZpbGVGaWxlTmFtZSA9IHdhc20uX09ydEVuZFByb2ZpbGluZyhzZXNzaW9uSGFuZGxlKTtcclxuICBpZiAocHJvZmlsZUZpbGVOYW1lID09PSAwKSB7XHJcbiAgICBjaGVja0xhc3RFcnJvcihcIkNhbid0IGdldCBhbiBwcm9maWxlIGZpbGUgbmFtZS5cIik7XHJcbiAgfVxyXG4gIHdhc20uX09ydEZyZWUocHJvZmlsZUZpbGVOYW1lKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyA9ICh0ZW5zb3JzOiByZWFkb25seSBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdKTogQXJyYXlCdWZmZXJMaWtlW10gPT4ge1xyXG4gIGNvbnN0IGJ1ZmZlcnM6IEFycmF5QnVmZmVyTGlrZVtdID0gW107XHJcbiAgZm9yIChjb25zdCB0ZW5zb3Igb2YgdGVuc29ycykge1xyXG4gICAgY29uc3QgZGF0YSA9IHRlbnNvclsyXTtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShkYXRhKSAmJiAnYnVmZmVyJyBpbiBkYXRhKSB7XHJcbiAgICAgIGJ1ZmZlcnMucHVzaChkYXRhLmJ1ZmZlcik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBidWZmZXJzO1xyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7IGVudiwgSW5mZXJlbmNlU2Vzc2lvbiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE9ydFdhc21NZXNzYWdlLFxyXG4gIFNlcmlhbGl6YWJsZUludGVybmFsQnVmZmVyLFxyXG4gIFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YSxcclxuICBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YSxcclxuICBUZW5zb3JNZXRhZGF0YSxcclxufSBmcm9tICcuL3Byb3h5LW1lc3NhZ2VzJztcclxuaW1wb3J0ICogYXMgY29yZSBmcm9tICcuL3dhc20tY29yZS1pbXBsJztcclxuaW1wb3J0IHsgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5IH0gZnJvbSAnLi93YXNtLWZhY3RvcnknO1xyXG5pbXBvcnQge1xyXG4gIGltcG9ydFByb3h5V29ya2VyLFxyXG4gIGluZmVyV2FzbVBhdGhQcmVmaXhGcm9tU2NyaXB0U3JjLFxyXG4gIGlzRXNtSW1wb3J0TWV0YVVybEhhcmRjb2RlZEFzRmlsZVVyaSxcclxufSBmcm9tICcuL3dhc20tdXRpbHMtaW1wb3J0JztcclxuXHJcbmNvbnN0IGlzUHJveHkgPSAoKTogYm9vbGVhbiA9PiAhIWVudi53YXNtLnByb3h5ICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XHJcbmxldCBwcm94eVdvcmtlcjogV29ya2VyIHwgdW5kZWZpbmVkO1xyXG5sZXQgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xyXG5sZXQgYWJvcnRlZCA9IGZhbHNlO1xyXG5sZXQgdGVtcG9yYXJ5T2JqZWN0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG50eXBlIFByb21pc2VDYWxsYmFja3M8VCA9IHZvaWQ+ID0gW3Jlc29sdmU6IChyZXN1bHQ6IFQpID0+IHZvaWQsIHJlamVjdDogKHJlYXNvbjogdW5rbm93bikgPT4gdm9pZF07XHJcbmxldCBpbml0V2FzbUNhbGxiYWNrczogUHJvbWlzZUNhbGxiYWNrcztcclxuY29uc3QgcXVldWVkQ2FsbGJhY2tzOiBNYXA8T3J0V2FzbU1lc3NhZ2VbJ3R5cGUnXSwgQXJyYXk8UHJvbWlzZUNhbGxiYWNrczx1bmtub3duPj4+ID0gbmV3IE1hcCgpO1xyXG5cclxuY29uc3QgZW5xdWV1ZUNhbGxiYWNrcyA9ICh0eXBlOiBPcnRXYXNtTWVzc2FnZVsndHlwZSddLCBjYWxsYmFja3M6IFByb21pc2VDYWxsYmFja3M8dW5rbm93bj4pOiB2b2lkID0+IHtcclxuICBjb25zdCBxdWV1ZSA9IHF1ZXVlZENhbGxiYWNrcy5nZXQodHlwZSk7XHJcbiAgaWYgKHF1ZXVlKSB7XHJcbiAgICBxdWV1ZS5wdXNoKGNhbGxiYWNrcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHF1ZXVlZENhbGxiYWNrcy5zZXQodHlwZSwgW2NhbGxiYWNrc10pO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGVuc3VyZVdvcmtlciA9ICgpOiB2b2lkID0+IHtcclxuICBpZiAoaW5pdGlhbGl6aW5nIHx8ICFpbml0aWFsaXplZCB8fCBhYm9ydGVkIHx8ICFwcm94eVdvcmtlcikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCd3b3JrZXIgbm90IHJlYWR5Jyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgb25Qcm94eVdvcmtlck1lc3NhZ2UgPSAoZXY6IE1lc3NhZ2VFdmVudDxPcnRXYXNtTWVzc2FnZT4pOiB2b2lkID0+IHtcclxuICBzd2l0Y2ggKGV2LmRhdGEudHlwZSkge1xyXG4gICAgY2FzZSAnaW5pdC13YXNtJzpcclxuICAgICAgaW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgIGlmIChldi5kYXRhLmVycikge1xyXG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGluaXRXYXNtQ2FsbGJhY2tzWzFdKGV2LmRhdGEuZXJyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgaW5pdFdhc21DYWxsYmFja3NbMF0oKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGVtcG9yYXJ5T2JqZWN0VXJsKSB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0ZW1wb3JhcnlPYmplY3RVcmwpO1xyXG4gICAgICAgIHRlbXBvcmFyeU9iamVjdFVybCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2luaXQtZXAnOlxyXG4gICAgY2FzZSAnY29weS1mcm9tJzpcclxuICAgIGNhc2UgJ2NyZWF0ZSc6XHJcbiAgICBjYXNlICdyZWxlYXNlJzpcclxuICAgIGNhc2UgJ3J1bic6XHJcbiAgICBjYXNlICdlbmQtcHJvZmlsaW5nJzoge1xyXG4gICAgICBjb25zdCBjYWxsYmFja3MgPSBxdWV1ZWRDYWxsYmFja3MuZ2V0KGV2LmRhdGEudHlwZSkhO1xyXG4gICAgICBpZiAoZXYuZGF0YS5lcnIpIHtcclxuICAgICAgICBjYWxsYmFja3Muc2hpZnQoKSFbMV0oZXYuZGF0YS5lcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbGxiYWNrcy5zaGlmdCgpIVswXShldi5kYXRhLm91dCEpO1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgZGVmYXVsdDpcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZVdlYkFzc2VtYmx5QW5kT3J0UnVudGltZSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAoaW5pdGlhbGl6ZWQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgaWYgKGluaXRpYWxpemluZykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgY2FsbHMgdG8gJ2luaXRXYXNtKCknIGRldGVjdGVkLlwiKTtcclxuICB9XHJcbiAgaWYgKGFib3J0ZWQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcInByZXZpb3VzIGNhbGwgdG8gJ2luaXRXYXNtKCknIGZhaWxlZC5cIik7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXppbmcgPSB0cnVlO1xyXG5cclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcHJveHlXb3JrZXI/LnRlcm1pbmF0ZSgpO1xyXG5cclxuICAgICAgdm9pZCBpbXBvcnRQcm94eVdvcmtlcigpLnRoZW4oKFtvYmplY3RVcmwsIHdvcmtlcl0pID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcHJveHlXb3JrZXIgPSB3b3JrZXI7XHJcbiAgICAgICAgICBwcm94eVdvcmtlci5vbmVycm9yID0gKGV2OiBFcnJvckV2ZW50KSA9PiByZWplY3QoZXYpO1xyXG4gICAgICAgICAgcHJveHlXb3JrZXIub25tZXNzYWdlID0gb25Qcm94eVdvcmtlck1lc3NhZ2U7XHJcbiAgICAgICAgICBpbml0V2FzbUNhbGxiYWNrcyA9IFtyZXNvbHZlLCByZWplY3RdO1xyXG4gICAgICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdpbml0LXdhc20nLCBpbjogZW52IH07XHJcblxyXG4gICAgICAgICAgLy8gaWYgdGhlIHByb3h5IHdvcmtlciBpcyBsb2FkZWQgZnJvbSBhIGJsb2IgVVJMLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgcGF0aCBpbmZvcm1hdGlvbiBpcyBub3QgbG9zdC5cclxuICAgICAgICAgIC8vXHJcbiAgICAgICAgICAvLyB3aGVuIGBlbnYud2FzbS53YXNtUGF0aHNgIGlzIG5vdCBzZXQsIHdlIG5lZWQgdG8gcGFzcyB0aGUgcGF0aCBpbmZvcm1hdGlvbiB0byB0aGUgd29ya2VyLlxyXG4gICAgICAgICAgLy9cclxuICAgICAgICAgIGlmICghQlVJTERfREVGUy5FTkFCTEVfQlVORExFX1dBU01fSlMgJiYgIW1lc3NhZ2UuaW4hLndhc20ud2FzbVBhdGhzICYmIG9iamVjdFVybCkge1xyXG4gICAgICAgICAgICAvLyBmb3IgYSBidWlsZCBub3QgYnVuZGxlZCB0aGUgd2FzbSBKUywgd2UgbmVlZCB0byBwYXNzIHRoZSBwYXRoIHByZWZpeCB0byB0aGUgd29ya2VyLlxyXG4gICAgICAgICAgICAvLyB0aGUgcGF0aCBwcmVmaXggd2lsbCBiZSB1c2VkIHRvIHJlc29sdmUgdGhlIHBhdGggdG8gYm90aCB0aGUgd2FzbSBKUyBhbmQgdGhlIHdhc20gZmlsZS5cclxuICAgICAgICAgICAgY29uc3QgaW5mZXJyZWRXYXNtUGF0aFByZWZpeCA9IGluZmVyV2FzbVBhdGhQcmVmaXhGcm9tU2NyaXB0U3JjKCk7XHJcbiAgICAgICAgICAgIGlmIChpbmZlcnJlZFdhc21QYXRoUHJlZml4KSB7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgPSBpbmZlcnJlZFdhc21QYXRoUHJlZml4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBCVUlMRF9ERUZTLklTX0VTTSAmJlxyXG4gICAgICAgICAgICBCVUlMRF9ERUZTLkVOQUJMRV9CVU5ETEVfV0FTTV9KUyAmJlxyXG4gICAgICAgICAgICAhbWVzc2FnZS5pbiEud2FzbS53YXNtUGF0aHMgJiZcclxuICAgICAgICAgICAgKG9iamVjdFVybCB8fCBpc0VzbUltcG9ydE1ldGFVcmxIYXJkY29kZWRBc0ZpbGVVcmkpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgLy8gZm9yIGEgYnVpbGQgYnVuZGxlZCB0aGUgd2FzbSBKUywgaWYgZWl0aGVyIG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBpcyBtZXQ6XHJcbiAgICAgICAgICAgIC8vIC0gdGhlIHByb3h5IHdvcmtlciBpcyBsb2FkZWQgZnJvbSBhIGJsb2IgVVJMXHJcbiAgICAgICAgICAgIC8vIC0gYGltcG9ydC5tZXRhLnVybGAgaXMgYSBmaWxlIFVSTCwgaXQgbWVhbnMgaXQgaXMgb3ZlcndyaXR0ZW4gYnkgdGhlIGJ1bmRsZXIuXHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIC8vIGluIGVpdGhlciBjYXNlLCB0aGUgcGF0aCBpbmZvcm1hdGlvbiBpcyBsb3N0LCB3ZSBuZWVkIHRvIHBhc3MgdGhlIHBhdGggb2YgdGhlIC53YXNtIGZpbGUgdG8gdGhlIHdvcmtlci5cclxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB1c2UgdGhlIGJ1bmRsZXIgcHJlZmVycmVkIFVSTCBmb3JtYXQ6XHJcbiAgICAgICAgICAgIC8vIG5ldyBVUkwoJ2ZpbGVuYW1lJywgaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICAgICAgICAvLyBzbyB0aGF0IHRoZSBidW5kbGVyIGNhbiBoYW5kbGUgdGhlIGZpbGUgdXNpbmcgY29ycmVzcG9uZGluZyBsb2FkZXJzLlxyXG4gICAgICAgICAgICBtZXNzYWdlLmluIS53YXNtLndhc21QYXRocyA9IHtcclxuICAgICAgICAgICAgICB3YXNtOiAhQlVJTERfREVGUy5ESVNBQkxFX0pTRVBcclxuICAgICAgICAgICAgICAgID8gbmV3IFVSTCgnb3J0LXdhc20tc2ltZC10aHJlYWRlZC5qc2VwLndhc20nLCBCVUlMRF9ERUZTLkVTTV9JTVBPUlRfTUVUQV9VUkwpLmhyZWZcclxuICAgICAgICAgICAgICAgIDogQlVJTERfREVGUy5FTkFCTEVfSlNQSVxyXG4gICAgICAgICAgICAgICAgICA/IG5ldyBVUkwoJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuanNwaS53YXNtJywgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMKS5ocmVmXHJcbiAgICAgICAgICAgICAgICAgIDogIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFVcclxuICAgICAgICAgICAgICAgICAgICA/IG5ldyBVUkwoJ29ydC13YXNtLXNpbWQtdGhyZWFkZWQuYXN5bmNpZnkud2FzbScsIEJVSUxEX0RFRlMuRVNNX0lNUE9SVF9NRVRBX1VSTCkuaHJlZlxyXG4gICAgICAgICAgICAgICAgICAgIDogbmV3IFVSTCgnb3J0LXdhc20tc2ltZC10aHJlYWRlZC53YXNtJywgQlVJTERfREVGUy5FU01fSU1QT1JUX01FVEFfVVJMKS5ocmVmLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcHJveHlXb3JrZXIucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgICAgICB0ZW1wb3JhcnlPYmplY3RVcmwgPSBvYmplY3RVcmw7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBpbml0aWFsaXplV2ViQXNzZW1ibHkoZW52Lndhc20pO1xyXG4gICAgICBhd2FpdCBjb3JlLmluaXRSdW50aW1lKGVudik7XHJcbiAgICAgIGluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgYWJvcnRlZCA9IHRydWU7XHJcbiAgICAgIHRocm93IGU7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBpbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdGlhbGl6ZU9ydEVwID0gYXN5bmMgKGVwTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcclxuICAgIGVuc3VyZVdvcmtlcigpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnaW5pdC1lcCcsIFtyZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdpbml0LWVwJywgaW46IHsgZXBOYW1lLCBlbnYgfSB9O1xyXG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgYXdhaXQgY29yZS5pbml0RXAoZW52LCBlcE5hbWUpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb3B5RnJvbUV4dGVybmFsQnVmZmVyID0gYXN5bmMgKGJ1ZmZlcjogVWludDhBcnJheSk6IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+ID0+IHtcclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNX1BST1hZICYmIGlzUHJveHkoKSkge1xyXG4gICAgZW5zdXJlV29ya2VyKCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY29weS1mcm9tJywgW3Jlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2NvcHktZnJvbScsIGluOiB7IGJ1ZmZlciB9IH07XHJcbiAgICAgIHByb3h5V29ya2VyIS5wb3N0TWVzc2FnZShtZXNzYWdlLCBbYnVmZmVyLmJ1ZmZlcl0pO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBjb3JlLmNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIoYnVmZmVyKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU2Vzc2lvbiA9IGFzeW5jIChcclxuICBtb2RlbDogU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIgfCBVaW50OEFycmF5LFxyXG4gIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxyXG4pOiBQcm9taXNlPFNlcmlhbGl6YWJsZVNlc3Npb25NZXRhZGF0YT4gPT4ge1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XHJcbiAgICAvLyBjaGVjayB1bnN1cHBvcnRlZCBvcHRpb25zXHJcbiAgICBpZiAob3B0aW9ucz8ucHJlZmVycmVkT3V0cHV0TG9jYXRpb24pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXNzaW9uIG9wdGlvbiBcInByZWZlcnJlZE91dHB1dExvY2F0aW9uXCIgaXMgbm90IHN1cHBvcnRlZCBmb3IgcHJveHkuJyk7XHJcbiAgICB9XHJcbiAgICBlbnN1cmVXb3JrZXIoKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxTZXJpYWxpemFibGVTZXNzaW9uTWV0YWRhdGE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygnY3JlYXRlJywgW3Jlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICBjb25zdCBtZXNzYWdlOiBPcnRXYXNtTWVzc2FnZSA9IHsgdHlwZTogJ2NyZWF0ZScsIGluOiB7IG1vZGVsLCBvcHRpb25zOiB7IC4uLm9wdGlvbnMgfSB9IH07XHJcbiAgICAgIGNvbnN0IHRyYW5zZmVyYWJsZTogVHJhbnNmZXJhYmxlW10gPSBbXTtcclxuICAgICAgaWYgKG1vZGVsIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xyXG4gICAgICAgIHRyYW5zZmVyYWJsZS5wdXNoKG1vZGVsLmJ1ZmZlcik7XHJcbiAgICAgIH1cclxuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHRyYW5zZmVyYWJsZSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGNvcmUuY3JlYXRlU2Vzc2lvbihtb2RlbCwgb3B0aW9ucyk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbGVhc2VTZXNzaW9uID0gYXN5bmMgKHNlc3Npb25JZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0FTTV9QUk9YWSAmJiBpc1Byb3h5KCkpIHtcclxuICAgIGVuc3VyZVdvcmtlcigpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZW5xdWV1ZUNhbGxiYWNrcygncmVsZWFzZScsIFtyZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgY29uc3QgbWVzc2FnZTogT3J0V2FzbU1lc3NhZ2UgPSB7IHR5cGU6ICdyZWxlYXNlJywgaW46IHNlc3Npb25JZCB9O1xyXG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29yZS5yZWxlYXNlU2Vzc2lvbihzZXNzaW9uSWQpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBydW4gPSBhc3luYyAoXHJcbiAgc2Vzc2lvbklkOiBudW1iZXIsXHJcbiAgaW5wdXRJbmRpY2VzOiBudW1iZXJbXSxcclxuICBpbnB1dHM6IFRlbnNvck1ldGFkYXRhW10sXHJcbiAgb3V0cHV0SW5kaWNlczogbnVtYmVyW10sXHJcbiAgb3V0cHV0czogQXJyYXk8VGVuc29yTWV0YWRhdGEgfCBudWxsPixcclxuICBvcHRpb25zOiBJbmZlcmVuY2VTZXNzaW9uLlJ1bk9wdGlvbnMsXHJcbik6IFByb21pc2U8VGVuc29yTWV0YWRhdGFbXT4gPT4ge1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XHJcbiAgICAvLyBjaGVjayBpbnB1dHMgbG9jYXRpb25cclxuICAgIGlmIChpbnB1dHMuc29tZSgodCkgPT4gdFszXSAhPT0gJ2NwdScpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW5wdXQgdGVuc29yIG9uIEdQVSBpcyBub3Qgc3VwcG9ydGVkIGZvciBwcm94eS4nKTtcclxuICAgIH1cclxuICAgIC8vIGNoZWNrIG91dHB1dHMgbG9jYXRpb25cclxuICAgIGlmIChvdXRwdXRzLnNvbWUoKHQpID0+IHQpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHJlLWFsbG9jYXRlZCBvdXRwdXQgdGVuc29yIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIHByb3h5LicpO1xyXG4gICAgfVxyXG4gICAgZW5zdXJlV29ya2VyKCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U2VyaWFsaXphYmxlVGVuc29yTWV0YWRhdGFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBlbnF1ZXVlQ2FsbGJhY2tzKCdydW4nLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgIGNvbnN0IHNlcmlhbGl6YWJsZUlucHV0cyA9IGlucHV0cyBhcyBTZXJpYWxpemFibGVUZW5zb3JNZXRhZGF0YVtdOyAvLyBldmVyeSBpbnB1dCBpcyBvbiBDUFUuXHJcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0ge1xyXG4gICAgICAgIHR5cGU6ICdydW4nLFxyXG4gICAgICAgIGluOiB7IHNlc3Npb25JZCwgaW5wdXRJbmRpY2VzLCBpbnB1dHM6IHNlcmlhbGl6YWJsZUlucHV0cywgb3V0cHV0SW5kaWNlcywgb3B0aW9ucyB9LFxyXG4gICAgICB9O1xyXG4gICAgICBwcm94eVdvcmtlciEucG9zdE1lc3NhZ2UobWVzc2FnZSwgY29yZS5leHRyYWN0VHJhbnNmZXJhYmxlQnVmZmVycyhzZXJpYWxpemFibGVJbnB1dHMpKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gY29yZS5ydW4oc2Vzc2lvbklkLCBpbnB1dEluZGljZXMsIGlucHV0cywgb3V0cHV0SW5kaWNlcywgb3V0cHV0cywgb3B0aW9ucyk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVuZFByb2ZpbGluZyA9IGFzeW5jIChzZXNzaW9uSWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX1dBU01fUFJPWFkgJiYgaXNQcm94eSgpKSB7XHJcbiAgICBlbnN1cmVXb3JrZXIoKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGVucXVldWVDYWxsYmFja3MoJ2VuZC1wcm9maWxpbmcnLCBbcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2U6IE9ydFdhc21NZXNzYWdlID0geyB0eXBlOiAnZW5kLXByb2ZpbGluZycsIGluOiBzZXNzaW9uSWQgfTtcclxuICAgICAgcHJveHlXb3JrZXIhLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvcmUuZW5kUHJvZmlsaW5nKHNlc3Npb25JZCk7XHJcbiAgfVxyXG59O1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbmltcG9ydCB7XHJcbiAgSW5mZXJlbmNlU2Vzc2lvbixcclxuICBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcixcclxuICBTZXNzaW9uSGFuZGxlcixcclxuICBUZW5zb3IsXHJcbiAgVFJBQ0VfRlVOQ19CRUdJTixcclxuICBUUkFDRV9GVU5DX0VORCxcclxufSBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgU2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXIsIFRlbnNvck1ldGFkYXRhIH0gZnJvbSAnLi9wcm94eS1tZXNzYWdlcyc7XHJcbmltcG9ydCB7IGNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIsIGNyZWF0ZVNlc3Npb24sIGVuZFByb2ZpbGluZywgcmVsZWFzZVNlc3Npb24sIHJ1biB9IGZyb20gJy4vcHJveHktd3JhcHBlcic7XHJcbmltcG9ydCB7IGlzR3B1QnVmZmVyU3VwcG9ydGVkVHlwZSwgaXNNTFRlbnNvclN1cHBvcnRlZFR5cGUgfSBmcm9tICcuL3dhc20tY29tbW9uJztcclxuaW1wb3J0IHsgaXNOb2RlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWVudic7XHJcbmltcG9ydCB7IGxvYWRGaWxlIH0gZnJvbSAnLi93YXNtLXV0aWxzLWxvYWQtZmlsZSc7XHJcblxyXG5leHBvcnQgY29uc3QgZW5jb2RlVGVuc29yTWV0YWRhdGEgPSAodGVuc29yOiBUZW5zb3IsIGdldE5hbWU6ICgpID0+IHN0cmluZyk6IFRlbnNvck1ldGFkYXRhID0+IHtcclxuICBzd2l0Y2ggKHRlbnNvci5sb2NhdGlvbikge1xyXG4gICAgY2FzZSAnY3B1JzpcclxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHRlbnNvci5kYXRhLCAnY3B1J107XHJcbiAgICBjYXNlICdncHUtYnVmZmVyJzpcclxuICAgICAgcmV0dXJuIFt0ZW5zb3IudHlwZSwgdGVuc29yLmRpbXMsIHsgZ3B1QnVmZmVyOiB0ZW5zb3IuZ3B1QnVmZmVyIH0sICdncHUtYnVmZmVyJ107XHJcbiAgICBjYXNlICdtbC10ZW5zb3InOlxyXG4gICAgICByZXR1cm4gW3RlbnNvci50eXBlLCB0ZW5zb3IuZGltcywgeyBtbFRlbnNvcjogdGVuc29yLm1sVGVuc29yIH0sICdtbC10ZW5zb3InXTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvci5sb2NhdGlvbn0gZm9yICR7Z2V0TmFtZSgpfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWNvZGVUZW5zb3JNZXRhZGF0YSA9ICh0ZW5zb3I6IFRlbnNvck1ldGFkYXRhKTogVGVuc29yID0+IHtcclxuICBzd2l0Y2ggKHRlbnNvclszXSkge1xyXG4gICAgY2FzZSAnY3B1JzpcclxuICAgICAgcmV0dXJuIG5ldyBUZW5zb3IodGVuc29yWzBdLCB0ZW5zb3JbMl0sIHRlbnNvclsxXSk7XHJcbiAgICBjYXNlICdncHUtYnVmZmVyJzoge1xyXG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcclxuICAgICAgaWYgKCFpc0dwdUJ1ZmZlclN1cHBvcnRlZFR5cGUoZGF0YVR5cGUpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBub3Qgc3VwcG9ydGVkIGRhdGEgdHlwZTogJHtkYXRhVHlwZX0gZm9yIGRlc2VyaWFsaXppbmcgR1BVIHRlbnNvcmApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHsgZ3B1QnVmZmVyLCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gdGVuc29yWzJdO1xyXG4gICAgICByZXR1cm4gVGVuc29yLmZyb21HcHVCdWZmZXIoZ3B1QnVmZmVyLCB7IGRhdGFUeXBlLCBkaW1zOiB0ZW5zb3JbMV0sIGRvd25sb2FkLCBkaXNwb3NlIH0pO1xyXG4gICAgfVxyXG4gICAgY2FzZSAnbWwtdGVuc29yJzoge1xyXG4gICAgICBjb25zdCBkYXRhVHlwZSA9IHRlbnNvclswXTtcclxuICAgICAgaWYgKCFpc01MVGVuc29yU3VwcG9ydGVkVHlwZShkYXRhVHlwZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vdCBzdXBwb3J0ZWQgZGF0YSB0eXBlOiAke2RhdGFUeXBlfSBmb3IgZGVzZXJpYWxpemluZyBNTFRlbnNvciB0ZW5zb3JgKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB7IG1sVGVuc29yLCBkb3dubG9hZCwgZGlzcG9zZSB9ID0gdGVuc29yWzJdO1xyXG4gICAgICByZXR1cm4gVGVuc29yLmZyb21NTFRlbnNvcihtbFRlbnNvciwgeyBkYXRhVHlwZSwgZGltczogdGVuc29yWzFdLCBkb3dubG9hZCwgZGlzcG9zZSB9KTtcclxuICAgIH1cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBkYXRhIGxvY2F0aW9uOiAke3RlbnNvclszXX1gKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgT25ueHJ1bnRpbWVXZWJBc3NlbWJseVNlc3Npb25IYW5kbGVyIGltcGxlbWVudHMgSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIge1xyXG4gIHByaXZhdGUgc2Vzc2lvbklkOiBudW1iZXI7XHJcblxyXG4gIGlucHV0TmFtZXM6IHJlYWRvbmx5IHN0cmluZ1tdO1xyXG4gIG91dHB1dE5hbWVzOiByZWFkb25seSBzdHJpbmdbXTtcclxuICBpbnB1dE1ldGFkYXRhOiByZWFkb25seSBJbmZlcmVuY2VTZXNzaW9uLlZhbHVlTWV0YWRhdGFbXTtcclxuICBvdXRwdXRNZXRhZGF0YTogcmVhZG9ubHkgSW5mZXJlbmNlU2Vzc2lvbi5WYWx1ZU1ldGFkYXRhW107XHJcblxyXG4gIGFzeW5jIGZldGNoTW9kZWxBbmRDb3B5VG9XYXNtTWVtb3J5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8U2VyaWFsaXphYmxlSW50ZXJuYWxCdWZmZXI+IHtcclxuICAgIC8vIGZldGNoIG1vZGVsIGZyb20gdXJsIGFuZCBtb3ZlIHRvIHdhc20gaGVhcC5cclxuICAgIHJldHVybiBjb3B5RnJvbUV4dGVybmFsQnVmZmVyKGF3YWl0IGxvYWRGaWxlKHBhdGgpKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGxvYWRNb2RlbChwYXRoT3JCdWZmZXI6IHN0cmluZyB8IFVpbnQ4QXJyYXksIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBUUkFDRV9GVU5DX0JFR0lOKCk7XHJcbiAgICBsZXQgbW9kZWw6IFBhcmFtZXRlcnM8dHlwZW9mIGNyZWF0ZVNlc3Npb24+WzBdO1xyXG5cclxuICAgIGlmICh0eXBlb2YgcGF0aE9yQnVmZmVyID09PSAnc3RyaW5nJykge1xyXG4gICAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgICAgLy8gbm9kZVxyXG4gICAgICAgIG1vZGVsID0gYXdhaXQgbG9hZEZpbGUocGF0aE9yQnVmZmVyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBicm93c2VyXHJcbiAgICAgICAgLy8gZmV0Y2ggbW9kZWwgYW5kIGNvcHkgdG8gd2FzbSBoZWFwLlxyXG4gICAgICAgIG1vZGVsID0gYXdhaXQgdGhpcy5mZXRjaE1vZGVsQW5kQ29weVRvV2FzbU1lbW9yeShwYXRoT3JCdWZmZXIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtb2RlbCA9IHBhdGhPckJ1ZmZlcjtcclxuICAgIH1cclxuXHJcbiAgICBbdGhpcy5zZXNzaW9uSWQsIHRoaXMuaW5wdXROYW1lcywgdGhpcy5vdXRwdXROYW1lcywgdGhpcy5pbnB1dE1ldGFkYXRhLCB0aGlzLm91dHB1dE1ldGFkYXRhXSA9IGF3YWl0IGNyZWF0ZVNlc3Npb24oXHJcbiAgICAgIG1vZGVsLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgKTtcclxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkaXNwb3NlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHJlbGVhc2VTZXNzaW9uKHRoaXMuc2Vzc2lvbklkKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJ1bihcclxuICAgIGZlZWRzOiBTZXNzaW9uSGFuZGxlci5GZWVkc1R5cGUsXHJcbiAgICBmZXRjaGVzOiBTZXNzaW9uSGFuZGxlci5GZXRjaGVzVHlwZSxcclxuICAgIG9wdGlvbnM6IEluZmVyZW5jZVNlc3Npb24uUnVuT3B0aW9ucyxcclxuICApOiBQcm9taXNlPFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGU+IHtcclxuICAgIFRSQUNFX0ZVTkNfQkVHSU4oKTtcclxuICAgIGNvbnN0IGlucHV0QXJyYXk6IFRlbnNvcltdID0gW107XHJcbiAgICBjb25zdCBpbnB1dEluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgICBPYmplY3QuZW50cmllcyhmZWVkcykuZm9yRWFjaCgoa3ZwKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBrdnBbMF07XHJcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmlucHV0TmFtZXMuaW5kZXhPZihuYW1lKTtcclxuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbnB1dCAnJHtuYW1lfSdgKTtcclxuICAgICAgfVxyXG4gICAgICBpbnB1dEFycmF5LnB1c2godGVuc29yKTtcclxuICAgICAgaW5wdXRJbmRpY2VzLnB1c2goaW5kZXgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0QXJyYXk6IEFycmF5PFRlbnNvciB8IG51bGw+ID0gW107XHJcbiAgICBjb25zdCBvdXRwdXRJbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgT2JqZWN0LmVudHJpZXMoZmV0Y2hlcykuZm9yRWFjaCgoa3ZwKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5hbWUgPSBrdnBbMF07XHJcbiAgICAgIGNvbnN0IHRlbnNvciA9IGt2cFsxXTtcclxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm91dHB1dE5hbWVzLmluZGV4T2YobmFtZSk7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgb3V0cHV0ICcke25hbWV9J2ApO1xyXG4gICAgICB9XHJcbiAgICAgIG91dHB1dEFycmF5LnB1c2godGVuc29yKTtcclxuICAgICAgb3V0cHV0SW5kaWNlcy5wdXNoKGluZGV4KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGlucHV0cyA9IGlucHV0QXJyYXkubWFwKCh0LCBpKSA9PlxyXG4gICAgICBlbmNvZGVUZW5zb3JNZXRhZGF0YSh0LCAoKSA9PiBgaW5wdXQgXCIke3RoaXMuaW5wdXROYW1lc1tpbnB1dEluZGljZXNbaV1dfVwiYCksXHJcbiAgICApO1xyXG4gICAgY29uc3Qgb3V0cHV0cyA9IG91dHB1dEFycmF5Lm1hcCgodCwgaSkgPT5cclxuICAgICAgdCA/IGVuY29kZVRlbnNvck1ldGFkYXRhKHQsICgpID0+IGBvdXRwdXQgXCIke3RoaXMub3V0cHV0TmFtZXNbb3V0cHV0SW5kaWNlc1tpXV19XCJgKSA6IG51bGwsXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBydW4odGhpcy5zZXNzaW9uSWQsIGlucHV0SW5kaWNlcywgaW5wdXRzLCBvdXRwdXRJbmRpY2VzLCBvdXRwdXRzLCBvcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCByZXN1bHRNYXA6IFNlc3Npb25IYW5kbGVyLlJldHVyblR5cGUgPSB7fTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICByZXN1bHRNYXBbdGhpcy5vdXRwdXROYW1lc1tvdXRwdXRJbmRpY2VzW2ldXV0gPSBvdXRwdXRBcnJheVtpXSA/PyBkZWNvZGVUZW5zb3JNZXRhZGF0YShyZXN1bHRzW2ldKTtcclxuICAgIH1cclxuICAgIFRSQUNFX0ZVTkNfRU5EKCk7XHJcbiAgICByZXR1cm4gcmVzdWx0TWFwO1xyXG4gIH1cclxuXHJcbiAgc3RhcnRQcm9maWxpbmcoKTogdm9pZCB7XHJcbiAgICAvLyBUT0RPOiBpbXBsZW1lbnQgcHJvZmlsaW5nXHJcbiAgfVxyXG5cclxuICBlbmRQcm9maWxpbmcoKTogdm9pZCB7XHJcbiAgICB2b2lkIGVuZFByb2ZpbGluZyh0aGlzLnNlc3Npb25JZCk7XHJcbiAgfVxyXG59XHJcbiIsICIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxyXG5cclxuaW1wb3J0IHsgQmFja2VuZCwgZW52LCBJbmZlcmVuY2VTZXNzaW9uLCBJbmZlcmVuY2VTZXNzaW9uSGFuZGxlciB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBpbml0aWFsaXplT3J0RXAsIGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUgfSBmcm9tICcuL3dhc20vcHJveHktd3JhcHBlcic7XHJcbmltcG9ydCB7IE9ubnhydW50aW1lV2ViQXNzZW1ibHlTZXNzaW9uSGFuZGxlciB9IGZyb20gJy4vd2FzbS9zZXNzaW9uLWhhbmRsZXItaW5mZXJlbmNlJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGluaXRpYWxpemVzIGFsbCBmbGFncyBmb3IgV2ViQXNzZW1ibHkuXHJcbiAqXHJcbiAqIFRob3NlIGZsYWdzIGFyZSBhY2Nlc3NpYmxlIGZyb20gYG9ydC5lbnYud2FzbWAuIFVzZXJzIGFyZSBhbGxvdyB0byBzZXQgdGhvc2UgZmxhZ3MgYmVmb3JlIHRoZSBmaXJzdCBpbmZlcmVuY2Ugc2Vzc2lvblxyXG4gKiBiZWluZyBjcmVhdGVkLCB0byBvdmVycmlkZSBkZWZhdWx0IHZhbHVlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVGbGFncyA9ICgpOiB2b2lkID0+IHtcclxuICBpZiAodHlwZW9mIGVudi53YXNtLmluaXRUaW1lb3V0ICE9PSAnbnVtYmVyJyB8fCBlbnYud2FzbS5pbml0VGltZW91dCA8IDApIHtcclxuICAgIGVudi53YXNtLmluaXRUaW1lb3V0ID0gMDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNpbWQgPSBlbnYud2FzbS5zaW1kO1xyXG4gIGlmICh0eXBlb2Ygc2ltZCAhPT0gJ2Jvb2xlYW4nICYmIHNpbWQgIT09IHVuZGVmaW5lZCAmJiBzaW1kICE9PSAnZml4ZWQnICYmIHNpbWQgIT09ICdyZWxheGVkJykge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuICAgIGNvbnNvbGUud2FybihcclxuICAgICAgYFByb3BlcnR5IFwiZW52Lndhc20uc2ltZFwiIGlzIHNldCB0byB1bmtub3duIHZhbHVlIFwiJHtzaW1kfVwiLiBSZXNldCBpdCB0byBcXGBmYWxzZVxcYCBhbmQgaWdub3JlIFNJTUQgZmVhdHVyZSBjaGVja2luZy5gLFxyXG4gICAgKTtcclxuICAgIGVudi53YXNtLnNpbWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgZW52Lndhc20ucHJveHkgIT09ICdib29sZWFuJykge1xyXG4gICAgZW52Lndhc20ucHJveHkgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgZW52Lndhc20udHJhY2UgIT09ICdib29sZWFuJykge1xyXG4gICAgZW52Lndhc20udHJhY2UgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgZW52Lndhc20ubnVtVGhyZWFkcyAhPT0gJ251bWJlcicgfHwgIU51bWJlci5pc0ludGVnZXIoZW52Lndhc20ubnVtVGhyZWFkcykgfHwgZW52Lndhc20ubnVtVGhyZWFkcyA8PSAwKSB7XHJcbiAgICAvLyBUaGUgZm9sbG93aW5nIGxvZ2ljIG9ubHkgYXBwbGllcyB3aGVuIGBvcnQuZW52Lndhc20ubnVtVGhyZWFkc2AgaXMgbm90IHNldCBieSB1c2VyLiBXZSB3aWxsIGFsd2F5cyBob25vciB1c2VyJ3NcclxuICAgIC8vIHNldHRpbmcgaWYgaXQgaXMgcHJvdmlkZWQuXHJcblxyXG4gICAgLy8gQnJvd3Nlcjogd2hlbiBjcm9zc09yaWdpbklzb2xhdGVkIGlzIGZhbHNlLCBTaGFyZWRBcnJheUJ1ZmZlciBpcyBub3QgYXZhaWxhYmxlIHNvIFdlYkFzc2VtYmx5IHRocmVhZHMgd2lsbCBub3RcclxuICAgIC8vIHdvcmsuIEluIHRoaXMgY2FzZSwgd2Ugd2lsbCBzZXQgbnVtVGhyZWFkcyB0byAxLlxyXG4gICAgLy9cclxuICAgIC8vIFRoZXJlIGlzIGFuIGV4Y2VwdGlvbjogd2hlbiB0aGUgYnJvd3NlciBpcyBjb25maWd1cmVkIHRvIGZvcmNlLWVuYWJsZSBTaGFyZWRBcnJheUJ1ZmZlciAoZS5nLiBDaHJvbXVpbSB3aXRoXHJcbiAgICAvLyAtLWVuYWJsZS1mZWF0dXJlcz1TaGFyZWRBcnJheUJ1ZmZlciksIGl0IGlzIHBvc3NpYmxlIHRoYXQgYHNlbGYuY3Jvc3NPcmlnaW5Jc29sYXRlZGAgaXMgZmFsc2UgYW5kXHJcbiAgICAvLyBTaGFyZWRBcnJheUJ1ZmZlciBpcyBhdmFpbGFibGUgYXQgdGhlIHNhbWUgdGltZS4gVGhpcyBpcyB1c3VhbGx5IGZvciB0ZXN0aW5nLiBJbiB0aGlzIGNhc2UsICB3ZSB3aWxsIHN0aWxsIHNldFxyXG4gICAgLy8gbnVtVGhyZWFkcyB0byAxIGhlcmUuIElmIHdlIHdhbnQgdG8gZW5hYmxlIG11bHRpLXRocmVhZGluZyBpbiB0ZXN0LCB3ZSBzaG91bGQgc2V0IGBvcnQuZW52Lndhc20ubnVtVGhyZWFkc2AgdG8gYVxyXG4gICAgLy8gdmFsdWUgZ3JlYXRlciB0aGFuIDEuXHJcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmICFzZWxmLmNyb3NzT3JpZ2luSXNvbGF0ZWQpIHtcclxuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBudW1DcHVMb2dpY2FsQ29yZXMgPVxyXG4gICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IgPT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnbm9kZTpvcycpLmNwdXMoKS5sZW5ndGggOiBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeTtcclxuICAgICAgZW52Lndhc20ubnVtVGhyZWFkcyA9IE1hdGgubWluKDQsIE1hdGguY2VpbCgobnVtQ3B1TG9naWNhbENvcmVzIHx8IDEpIC8gMikpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCBpbXBsZW1lbnRzIEJhY2tlbmQge1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaW5pdGlhbGl6ZXMgdGhlIFdlYkFzc2VtYmx5IGJhY2tlbmQuXHJcbiAgICpcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIG9ubHkgb25jZSBmb3IgZWFjaCBiYWNrZW5kIG5hbWUuIEl0IHdpbGwgYmUgY2FsbGVkIHRoZSBmaXJzdCB0aW1lIHdoZW5cclxuICAgKiBgb3J0LkluZmVyZW5jZVNlc3Npb24uY3JlYXRlKClgIGlzIGNhbGxlZCB3aXRoIGEgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYmFja2VuZE5hbWUgLSB0aGUgcmVnaXN0ZXJlZCBiYWNrZW5kIG5hbWUuXHJcbiAgICovXHJcbiAgYXN5bmMgaW5pdChiYWNrZW5kTmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyBwb3B1bGF0ZSB3YXNtIGZsYWdzXHJcbiAgICBpbml0aWFsaXplRmxhZ3MoKTtcclxuXHJcbiAgICAvLyBpbml0IHdhc21cclxuICAgIGF3YWl0IGluaXRpYWxpemVXZWJBc3NlbWJseUFuZE9ydFJ1bnRpbWUoKTtcclxuXHJcbiAgICAvLyBwZXJmb3JtZSBFUCBzcGVjaWZpYyBpbml0aWFsaXphdGlvblxyXG4gICAgYXdhaXQgaW5pdGlhbGl6ZU9ydEVwKGJhY2tlbmROYW1lKTtcclxuICB9XHJcbiAgY3JlYXRlSW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXIoXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBvcHRpb25zPzogSW5mZXJlbmNlU2Vzc2lvbi5TZXNzaW9uT3B0aW9ucyxcclxuICApOiBQcm9taXNlPEluZmVyZW5jZVNlc3Npb25IYW5kbGVyPjtcclxuICBjcmVhdGVJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcihcclxuICAgIGJ1ZmZlcjogVWludDhBcnJheSxcclxuICAgIG9wdGlvbnM/OiBJbmZlcmVuY2VTZXNzaW9uLlNlc3Npb25PcHRpb25zLFxyXG4gICk6IFByb21pc2U8SW5mZXJlbmNlU2Vzc2lvbkhhbmRsZXI+O1xyXG4gIGFzeW5jIGNyZWF0ZUluZmVyZW5jZVNlc3Npb25IYW5kbGVyKFxyXG4gICAgcGF0aE9yQnVmZmVyOiBzdHJpbmcgfCBVaW50OEFycmF5LFxyXG4gICAgb3B0aW9ucz86IEluZmVyZW5jZVNlc3Npb24uU2Vzc2lvbk9wdGlvbnMsXHJcbiAgKTogUHJvbWlzZTxJbmZlcmVuY2VTZXNzaW9uSGFuZGxlcj4ge1xyXG4gICAgY29uc3QgaGFuZGxlciA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5U2Vzc2lvbkhhbmRsZXIoKTtcclxuICAgIGF3YWl0IGhhbmRsZXIubG9hZE1vZGVsKHBhdGhPckJ1ZmZlciwgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gaGFuZGxlcjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3YXNtQmFja2VuZCA9IG5ldyBPbm54cnVudGltZVdlYkFzc2VtYmx5QmFja2VuZCgpO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXMsIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHMgKi9cclxuXHJcbi8vIFdlIHVzZSBcInJlcXVpcmVcIiBpbnN0ZWFkIG9mIFwiaW1wb3J0XCIgaGVyZSBiZWNhdXNlIGltcG9ydCBzdGF0ZW1lbnQgbXVzdCBiZSBwdXQgaW4gdG9wIGxldmVsLiBPdXIgY3VycmVudCBjb2RlIGRvZXNcclxuLy8gbm90IGFsbG93IGJ1bmRsZXIgdG8gdHJlZS1zaGFraW5nIGNvZGUgYXMgZXhwZWN0ZWQgYmVjYXVzZSBzb21lIGNvZGVzIGFyZSB0cmVhdGVkIGFzIGhhdmluZyBzaWRlIGVmZmVjdHMuXHJcbi8vIFNvIHdlIGltcG9ydCBjb2RlIGluc2lkZSB0aGUgaWYtY2xhdXNlIHRvIGFsbG93IGJ1bmRsZXIgcmVtb3ZlIHRoZSBjb2RlIHNhZmVseS5cclxuXHJcbmV4cG9ydCAqIGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcbmltcG9ydCAqIGFzIG9ydCBmcm9tICdvbm54cnVudGltZS1jb21tb24nO1xyXG5leHBvcnQgZGVmYXVsdCBvcnQ7XHJcblxyXG5pbXBvcnQgeyByZWdpc3RlckJhY2tlbmQsIGVudiB9IGZyb20gJ29ubnhydW50aW1lLWNvbW1vbic7XHJcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xyXG5cclxuaWYgKCFCVUlMRF9ERUZTLkRJU0FCTEVfV0VCR0wpIHtcclxuICBjb25zdCBvbm54anNCYWNrZW5kID0gcmVxdWlyZSgnLi9iYWNrZW5kLW9ubnhqcycpLm9ubnhqc0JhY2tlbmQ7XHJcbiAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJnbCcsIG9ubnhqc0JhY2tlbmQsIC0xMCk7XHJcbn1cclxuXHJcbmlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgJiYgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAnVGhlIGN1cnJlbnQgYnVpbGQgaXMgc3BlY2lmaWVkIHRvIGVuYWJsZSBib3RoIEpTRVAgYW5kIFdlYkdQVSBFUC4gVGhpcyBpcyBub3QgYSB2YWxpZCBjb25maWd1cmF0aW9uLiAnICtcclxuICAgICAgJ0pTRVAgYW5kIFdlYkdQVSBFUHMgY2Fubm90IGJlIGVuYWJsZWQgYXQgdGhlIHNhbWUgdGltZS4nLFxyXG4gICk7XHJcbn1cclxuXHJcbmlmICghQlVJTERfREVGUy5ESVNBQkxFX1dFQk5OICYmIEJVSUxEX0RFRlMuRElTQUJMRV9KU0VQICYmIEJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAnVGhlIGN1cnJlbnQgYnVpbGQgaXMgc3BlY2lmaWVkIHRvIGVuYWJsZSBXZWJOTiBFUCB3aXRob3V0IEpTRVAgb3IgV2ViR1BVIEVQLiBUaGlzIGlzIG5vdCBhIHZhbGlkIGNvbmZpZ3VyYXRpb24uICcgK1xyXG4gICAgICAnV2ViTk4gRVAgcmVxdWlyZXMgZWl0aGVyIEpTRVAgb3IgV2ViR1BVIEVQIHRvIGJlIGVuYWJsZWQuJyxcclxuICApO1xyXG59XHJcblxyXG5pZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XQVNNKSB7XHJcbiAgY29uc3Qgd2FzbUJhY2tlbmQgPSByZXF1aXJlKCcuL2JhY2tlbmQtd2FzbScpLndhc21CYWNrZW5kO1xyXG4gIGlmICghQlVJTERfREVGUy5ESVNBQkxFX0pTRVAgfHwgIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJHUFUpIHtcclxuICAgIHJlZ2lzdGVyQmFja2VuZCgnd2ViZ3B1Jywgd2FzbUJhY2tlbmQsIDUpO1xyXG4gIH1cclxuICBpZiAoIUJVSUxEX0RFRlMuRElTQUJMRV9XRUJOTikge1xyXG4gICAgcmVnaXN0ZXJCYWNrZW5kKCd3ZWJubicsIHdhc21CYWNrZW5kLCA1KTtcclxuICB9XHJcbiAgcmVnaXN0ZXJCYWNrZW5kKCdjcHUnLCB3YXNtQmFja2VuZCwgMTApO1xyXG4gIHJlZ2lzdGVyQmFja2VuZCgnd2FzbScsIHdhc21CYWNrZW5kLCAxMCk7XHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnYudmVyc2lvbnMsICd3ZWInLCB7IHZhbHVlOiB2ZXJzaW9uLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xyXG4iLCAiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cclxuXHJcbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgL2pzL3NjcmlwdHMvdXBkYXRlLXZlcnNpb24udHNcclxuLy8gRG8gbm90IG1vZGlmeSBmaWxlIGNvbnRlbnQgbWFudWFsbHkuXHJcblxyXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9ICcxLjMwLjAnO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFnQk0sVUFDQSwwQkFZTyxpQkF3Q1AsZ0NBd0NPO0FBN0diOzs7QUFnQkEsTUFBTSxXQUFxQyxvQkFBSSxJQUFHO0FBQ2xELE1BQU0sMkJBQXFDLENBQUE7QUFZcEMsTUFBTSxrQkFBa0IsQ0FBQyxNQUFjLFNBQWtCLGFBQTBCO0FBQ3hGLFlBQUksV0FBVyxPQUFPLFFBQVEs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QUEwQjtBQUM1QixVQUFNQyxlQUFjLDBEQUEwQjtBQUM5QyxRQUFnQyxNQUE0QjtBQUMxRCxzQkFBZ0IsVUFBVUEsY0FBYSxDQUFDO0FBQUEsSUFDMUM7QUFDQSxRQUFJLE1BQTJCO0FBQzdCLHNCQUFnQixTQUFTQSxjQUFhLENBQUM7QUFBQSxJQUN6QztBQUNBLG9CQUFnQixPQUFPQSxjQUFhLEVBQUU7QUFDdEMsb0JBQWdCLFFBQVFBLGNBQWEsRUFBRTtBQUFBLEVBQ3pDO0FBRUEsU0FBTyxlQUFlQyxLQUFJLFVBQVUsT0FBTyxFQUFFLE9BQU9DLFVBQVMsWUFBWSxLQUFLLENBQUM7IiwKICAibmFtZXMiOiBbImkiLCAiZW52IiwgIkZsb2F0MTZBcnJheSIsICJUZW5zb3IiLCAiVGVuc29yIiwgIkluZmVyZW5jZVNlc3Npb24iLCAiSW5mZXJlbmNlU2Vzc2lvbiIsICJUZW5zb3IiLCAiZW52IiwgImVudiIsICJ3YXNtIiwgIndhc20iLCAid2FzbSIsICJsb2NhdGlvbiIsICJ0ZW5zb3IiLCAiZW52IiwgIm1sQ29udGV4dEluZGV4IiwgIndhc20iLCAiZW52IiwgIndhc20iLCAibG9jYXRpb24iLCAiaW5kZXgiLCAidGVuc29yIiwgImVycm9yQ29kZSIsICJpIiwgImluaXRpYWxpemluZyIsICJpbml0aWFsaXplZCIsICJhYm9ydGVkIiwgImNvcHlGcm9tRXh0ZXJuYWxCdWZmZXIiLCAiY3JlYXRlU2Vzc2lvbiIsICJyZWxlYXNlU2Vzc2lvbiIsICJydW4iLCAiZW5kUHJvZmlsaW5nIiwgImVudiIsICJUZW5zb3IiLCAiY29weUZyb21FeHRlcm5hbEJ1ZmZlciIsICJjcmVhdGVTZXNzaW9uIiwgInJlbGVhc2VTZXNzaW9uIiwgInJ1biIsICJlbmRQcm9maWxpbmciLCAiZW52IiwgIkluZmVyZW5jZVNlc3Npb24iLCAiVGVuc29yIiwgImVudiIsICJ2ZXJzaW9uIiwgIndhc21CYWNrZW5kIiwgImVudiIsICJ2ZXJzaW9uIl0KfQo=
