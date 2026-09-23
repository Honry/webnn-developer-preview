/*!
 * ONNX Runtime Web v1.30.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var KT=Object.create;var ci=Object.defineProperty;var XT=Object.getOwnPropertyDescriptor;var ZT=Object.getOwnPropertyNames;var JT=Object.getPrototypeOf,YT=Object.prototype.hasOwnProperty;var Jr=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var L=(r,e,n)=>()=>{if(n)throw n[0];try{return r&&(e=r(r=0)),e}catch(t){throw n=[t],t}};var ue=(r,e)=>()=>{try{return e||r((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}},Ar=(r,e)=>{for(var n in e)ci(r,n,{get:e[n],enumerable:!0})},cp=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ZT(e))!YT.call(r,o)&&o!==n&&ci(r,o,{get:()=>e[o],enumerable:!(t=XT(e,o))||t.enumerable});return r};var xe=(r,e,n)=>(n=r!=null?KT(JT(r)):{},cp(e||!r||!r.__esModule?ci(n,"default",{value:r,enumerable:!0}):n,r)),Yr=r=>cp(ci({},"__esModule",{value:!0}),r);var di,Or,ur,QT,dp,Ls=L(()=>{"use strict";di=new Map,Or=[],ur=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=di.get(r);if(t===void 0)di.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=Or.indexOf(r);o!==-1&&Or.splice(o,1);for(let i=0;i<Or.length;i++)if(di.get(Or[i]).priority<=n){Or.splice(i,0,r);return}Or.push(r)}return}throw new TypeError("not a valid backend")},QT=async r=>{let e=di.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},dp=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?Or:n,o,i=[],a=new Set;for(let u of t){let l=await QT(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?s:Reflect.get(u,l)})]}});var pp=L(()=>{"use strict";Ls()});var fp,hp=L(()=>{"use strict";fp="1.30.0"});var mp,ut,Rs=L(()=>{"use strict";hp();mp="warning",ut={wasm:{},webgl:{},webgpu:{},versions:{common:fp},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);mp=r}},get logLevel(){return mp}};Object.defineProperty(ut,"logLevel",{enumerable:!0})});var ye,gp=L(()=>{"use strict";Rs();ye=ut});var bp,yp,_p=L(()=>{"use strict";bp=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,l;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?l=[0,0,0,0]:typeof s.bias=="number"?l=[s.bias,s.bias,s.bias,s.bias]:(l=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(l[3]=s.bias[3]));let d=i*o,f=0,h=d,g=d*2,b=-1;a==="RGBA"?(f=0,h=d,g=d*2,b=d*3):a==="RGB"?(f=0,h=d,g=d*2):a==="RBG"&&(f=0,g=d,h=d*2);for(let _=0;_<i;_++)for(let T=0;T<o;T++){let v=(r.data[f++]-l[0])*u[0],x=(r.data[h++]-l[1])*u[1],I=(r.data[g++]-l[2])*u[2],$=b===-1?255:(r.data[b++]-l[3])*u[3];t.fillStyle="rgba("+v+","+x+","+I+","+$+")",t.fillRect(T,_,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},yp=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],a=r.dims[3]):(o=r.dims[3],i=r.dims[2],a=r.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let f=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,g=0,b=1,_=2,T=3,v=0,x=f,I=f*2,$=-1;s==="RGBA"?(v=0,x=f,I=f*2,$=f*3):s==="RGB"?(v=0,x=f,I=f*2):s==="RBG"&&(v=0,I=f,x=f*2),t=n.createImageData(o,i);for(let P=0;P<i*o;g+=h,b+=h,_+=h,T+=h,P++)t.data[g]=(r.data[v++]-d[0])*l[0],t.data[b]=(r.data[x++]-d[1])*l[1],t.data[_]=(r.data[I++]-d[2])*l[2],t.data[T]=$===-1?255:(r.data[$++]-d[3])*l[3]}else throw new Error("Can not access image data");return t}});var zs,vp,wp,xp,Tp,Ip,Sp=L(()=>{"use strict";pi();zs=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,d=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),f=4,h=0,g=1,b=2,_=3,T=0,v=l,x=l*2,I=-1;s==="RGB"&&(f=3,h=0,g=1,b=2,_=-1),u==="RGBA"?I=l*3:u==="RBG"?(T=0,x=l,v=l*2):u==="BGR"&&(x=0,v=l,T=l*2);for(let P=0;P<l;P++,h+=f,b+=f,g+=f,_+=f)d[T++]=(r[h]+a[0])/i[0],d[v++]=(r[g]+a[1])/i[1],d[x++]=(r[b]+a[2])/i[2],I!==-1&&_!==-1&&(d[I++]=(r[_]+a[3])/i[3]);return u==="RGBA"?new pt("float32",d,[1,4,n,t]):new pt("float32",d,[1,3,n,t])},vp=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(n){let d=u();d.width=r.width,d.height=r.height;let f=l(d);if(f!=null){let h=r.height,g=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(h=e.resizedHeight,g=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=h,s.width=g}else s.tensorFormat="RGBA",s.height=h,s.width=g;f.drawImage(r,0,0),a=f.getImageData(0,0,g,h).data}else throw new Error("Can not access image data")}else if(t){let d,f;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(d=e.resizedHeight,f=e.resizedWidth):(d=r.height,f=r.width),e!==void 0&&(s=e),s.format="RGBA",s.height=d,s.width=f,e!==void 0){let h=u();h.width=f,h.height=d;let g=l(h);if(g!=null)g.putImageData(r,0,0),a=g.getImageData(0,0,f,d).data;else throw new Error("Can not access image data")}else a=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=r.width,d.height=r.height;let f=l(d);if(f!=null){let h=r.height,g=r.width;return f.drawImage(r,0,0,g,h),a=f.getImageData(0,0,g,h).data,s.height=h,s.width=g,zs(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,f)=>{let h=u(),g=l(h);if(!r||!g)return f();let b=new Image;b.crossOrigin="Anonymous",b.src=r,b.onload=()=>{h.width=b.width,h.height=b.height,g.drawImage(b,0,0,h.width,h.height);let _=g.getImageData(0,0,h.width,h.height);s.height=h.height,s.width=h.width,d(zs(_.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return zs(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},wp=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,a=[1,t,n,4];return new pt({location:"texture",type:"float32",texture:r,dims:a,download:o,dispose:i})},xp=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new pt({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},Tp=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new pt({location:"ml-tensor",type:n??"float32",mlTensor:r,dims:t,download:o,dispose:i})},Ip=(r,e,n)=>new pt({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var Pr,To,$p,Ap,Op=L(()=>{"use strict";Pr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),To=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),$p=!1,Ap=()=>{if(!$p){$p=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,t=typeof n<"u"&&n.from;r&&(Pr.set("int64",BigInt64Array),To.set(BigInt64Array,"int64")),e&&(Pr.set("uint64",BigUint64Array),To.set(BigUint64Array,"uint64")),t?(Pr.set("float16",n),To.set(n,"float16")):Pr.set("float16",Uint16Array)}}});var Pp,Ep,Cp=L(()=>{"use strict";pi();Pp=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},Ep=(r,e)=>{switch(r.location){case"cpu":return new pt(r.type,r.data,e);case"cpu-pinned":return new pt({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new pt({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new pt({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});case"ml-tensor":return new pt({location:"ml-tensor",mlTensor:r.mlTensor,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var pt,pi=L(()=>{"use strict";_p();Sp();Op();Cp();pt=class{constructor(e,n,t){Ap();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Pr.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");s=n}else{let l=Pr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(n,BigInt):s=l.from(n)}else if(n instanceof l)s=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&n instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",s=e;else if(l==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let l=To.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=Pp(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,n){return vp(e,n)}static fromTexture(e,n){return wp(e,n)}static fromGpuBuffer(e,n){return xp(e,n)}static fromMLTensor(e,n){return Tp(e,n)}static fromPinnedBuffer(e,n,t){return Ip(e,n,t)}toDataURL(e){return bp(this,e)}toImageData(e){return yp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ep(this,e)}}});var $t,Bs=L(()=>{"use strict";pi();$t=pt});var fi,Dp,At,_t,lr,cr,Ms=L(()=>{"use strict";Rs();fi=(r,e)=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||console.timeStamp(`${r}::ORT::${e}`)},Dp=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),fi("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},At=r=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||Dp("BEGIN",r)},_t=r=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||Dp("END",r)},lr=r=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||console.time(`ORT::${r}`)},cr=r=>{(typeof ut.trace>"u"?!ut.wasm.trace:!ut.trace)||console.timeEnd(`ORT::${r}`)}});var hi,kp=L(()=>{"use strict";Ls();Bs();Ms();hi=class r{constructor(e){this.handler=e}async run(e,n,t){At(),lr("InferenceSession.run");let o={},i={};if(typeof e!="object"||e===null||e instanceof $t||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof $t)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(n);for(let f of this.outputNames)if(d.indexOf(f)!==-1){let h=n[f];(h===null||h instanceof $t)&&(l=!0,a=!1,o[f]=h)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(a)for(let l of this.outputNames)o[l]=null;let s=await this.handler.run(e,o,i),u={};for(let l in s)if(Object.hasOwnProperty.call(s,l)){let d=s[l];d instanceof $t?u[l]=d:u[l]=new $t(d.type,d.data,d.dims)}return cr("InferenceSession.run"),_t(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){At(),lr("InferenceSession.create");let i,a={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let d=e,f=0,h=e.byteLength;if(typeof n=="object"&&n!==null)a=n;else if(typeof n=="number"){if(f=n,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(h=e.byteLength-f,typeof t=="number"){if(h=t,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||f+h>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-f}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(d,f,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await dp(a),l=await s.createInferenceSessionHandler(i,u);return cr("InferenceSession.create"),_t(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var e1,Np=L(()=>{"use strict";kp();e1=hi});var Lp=L(()=>{"use strict"});var Rp=L(()=>{"use strict"});var zp=L(()=>{"use strict"});var Bp=L(()=>{"use strict"});var Vs={};Ar(Vs,{InferenceSession:()=>e1,TRACE:()=>fi,TRACE_EVENT_BEGIN:()=>lr,TRACE_EVENT_END:()=>cr,TRACE_FUNC_BEGIN:()=>At,TRACE_FUNC_END:()=>_t,Tensor:()=>$t,env:()=>ye,registerBackend:()=>ur});var ft=L(()=>{"use strict";pp();gp();Np();Bs();Lp();Rp();Ms();zp();Bp()});function dr(r,e,n,t){if(e===void 0)return n1(r);if(n===void 0)mi(r,e,1);else if(typeof n=="number"&&t===void 0)mi(r,e,n);else if(typeof n=="string"&&t===void 0)mi(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")mi(r,n,t,e);else throw new TypeError("input is valid")}function n1(r){return{verbose:dr.verbose.bind(null,r),info:dr.info.bind(null,r),warning:dr.warning.bind(null,r),error:dr.error.bind(null,r),fatal:dr.fatal.bind(null,r)}}function mi(r,e,n,t){let o=Io[t||""]||Io[""];Vp[r]<Vp[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,t1[o.provider].log(r,e,t))}var Fs,Gs,Vp,t1,Fp,Io,Ge,bi,yi,_i,gi,kt=L(()=>{"use strict";Fs=class{log(e,n,t){}},Gs=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Vp={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},t1={none:new Fs,console:new Gs},Fp={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},Io={"":Fp};(u=>{function r(l,d){u("verbose",l,d)}u.verbose=r;function e(l,d){u("info",l,d)}u.info=e;function n(l,d){u("warning",l,d)}u.warning=n;function t(l,d){u("error",l,d)}u.error=t;function o(l,d){u("fatal",l,d)}u.fatal=o;function i(l){Io={},a("",l||{})}u.reset=i;function a(l,d){if(l==="*")i(d);else{let f=Io[l]||Fp;Io[l]={provider:d.provider||f.provider,minimalSeverity:d.minimalSeverity||f.minimalSeverity,logDateTime:d.logDateTime===void 0?f.logDateTime:d.logDateTime,logSourceLocation:d.logSourceLocation===void 0?f.logSourceLocation:d.logSourceLocation}}}u.set=a;function s(l){let d={};l.logLevel&&(d.minimalSeverity=l.logLevel),a("",d)}u.setWithEnv=s})(dr||={});Ge=dr,bi=class{constructor(e,n,t,o,i,a){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},yi=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},_i=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=gi(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,l)=>{s.then(async d=>{i&&await i.end(),u(d)},async d=>{i&&await i.end(),l(d)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,d)=>{u.then(()=>{l(s)},f=>{d(f)})})}return s}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=gi();return this.flush(o),new bi(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new bi(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new yi(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=gi();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new yi(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){Ge.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=gi()}}get started(){return this._started}},gi=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Gp(r,e,n){for(let t of n){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&r1(l.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function r1(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var Up=L(()=>{"use strict"});var Wp=ue(Us=>{"use strict";Us.__esModule=!0;var o1=(function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r})();Us.Guid=o1});function We(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function mt(r){return(r&&r.__isLong__)===!0}function Hp(r){var e=Math.clz32(r&-r);return r?31-e:e}function Er(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=qp[r],t)?t:(n=Re(r,0,!0),o&&(qp[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=jp[r],t)?t:(n=Re(r,r<0?-1:0,!1),o&&(jp[r]=n),n))}function Lt(r,e){if(isNaN(r))return e?Yn:Ht;if(e){if(r<0)return Yn;if(r>=Jp)return ef}else{if(r<=-Xp)return vt;if(r+1>=Xp)return Qp}return r<0?Lt(-r,e).neg():Re(r%eo|0,r/eo|0,e)}function Re(r,e,n){return new We(r,e,n)}function Hs(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?Yn:Ht;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Hs(r.substring(1),e,n).neg();for(var o=Lt(vi(n,8)),i=Ht,a=0;a<r.length;a+=8){var s=Math.min(8,r.length-a),u=parseInt(r.substring(a,a+s),n);if(s<8){var l=Lt(vi(n,s));i=i.mul(l).add(Lt(u))}else i=i.mul(o),i=i.add(Lt(u))}return i.unsigned=e,i}function Rt(r,e){return typeof r=="number"?Lt(r,e):typeof r=="string"?Hs(r,e):Re(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var Nt,jp,qp,vi,Kp,i1,eo,Jp,Xp,Zp,Ht,Yn,Qr,Yp,Ws,Qp,ef,vt,Y,pr,js=L(()=>{Nt=null;try{Nt=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}We.prototype.__isLong__;Object.defineProperty(We.prototype,"__isLong__",{value:!0});We.isLong=mt;jp={},qp={};We.fromInt=Er;We.fromNumber=Lt;We.fromBits=Re;vi=Math.pow;We.fromString=Hs;We.fromValue=Rt;Kp=65536,i1=1<<24,eo=Kp*Kp,Jp=eo*eo,Xp=Jp/2,Zp=Er(i1),Ht=Er(0);We.ZERO=Ht;Yn=Er(0,!0);We.UZERO=Yn;Qr=Er(1);We.ONE=Qr;Yp=Er(1,!0);We.UONE=Yp;Ws=Er(-1);We.NEG_ONE=Ws;Qp=Re(-1,2147483647,!1);We.MAX_VALUE=Qp;ef=Re(-1,-1,!0);We.MAX_UNSIGNED_VALUE=ef;vt=Re(0,-2147483648,!1);We.MIN_VALUE=vt;Y=We.prototype;Y.toInt=function(){return this.unsigned?this.low>>>0:this.low};Y.toNumber=function(){return this.unsigned?(this.high>>>0)*eo+(this.low>>>0):this.high*eo+(this.low>>>0)};Y.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(vt)){var n=Lt(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Lt(vi(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),l=a.sub(u.mul(i)).toInt()>>>0,d=l.toString(e);if(a=u,a.isZero())return d+s;for(;d.length<6;)d="0"+d;s=""+d+s}};Y.getHighBits=function(){return this.high};Y.getHighBitsUnsigned=function(){return this.high>>>0};Y.getLowBits=function(){return this.low};Y.getLowBitsUnsigned=function(){return this.low>>>0};Y.getNumBitsAbs=function(){if(this.isNegative())return this.eq(vt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&(e&1<<n)==0;n--);return this.high!=0?n+33:n+1};Y.isSafeInteger=function(){var e=this.high>>21;return e?this.unsigned?!1:e===-1&&!(this.low===0&&this.high===-2097152):!0};Y.isZero=function(){return this.high===0&&this.low===0};Y.eqz=Y.isZero;Y.isNegative=function(){return!this.unsigned&&this.high<0};Y.isPositive=function(){return this.unsigned||this.high>=0};Y.isOdd=function(){return(this.low&1)===1};Y.isEven=function(){return(this.low&1)===0};Y.equals=function(e){return mt(e)||(e=Rt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};Y.eq=Y.equals;Y.notEquals=function(e){return!this.eq(e)};Y.neq=Y.notEquals;Y.ne=Y.notEquals;Y.lessThan=function(e){return this.comp(e)<0};Y.lt=Y.lessThan;Y.lessThanOrEqual=function(e){return this.comp(e)<=0};Y.lte=Y.lessThanOrEqual;Y.le=Y.lessThanOrEqual;Y.greaterThan=function(e){return this.comp(e)>0};Y.gt=Y.greaterThan;Y.greaterThanOrEqual=function(e){return this.comp(e)>=0};Y.gte=Y.greaterThanOrEqual;Y.ge=Y.greaterThanOrEqual;Y.compare=function(e){if(mt(e)||(e=Rt(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};Y.comp=Y.compare;Y.negate=function(){return!this.unsigned&&this.eq(vt)?vt:this.not().add(Qr)};Y.neg=Y.negate;Y.add=function(e){mt(e)||(e=Rt(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,l=e.low&65535,d=0,f=0,h=0,g=0;return g+=i+l,h+=g>>>16,g&=65535,h+=o+u,f+=h>>>16,h&=65535,f+=t+s,d+=f>>>16,f&=65535,d+=n+a,d&=65535,Re(h<<16|g,d<<16|f,this.unsigned)};Y.subtract=function(e){return mt(e)||(e=Rt(e)),this.add(e.neg())};Y.sub=Y.subtract;Y.multiply=function(e){if(this.isZero())return this;if(mt(e)||(e=Rt(e)),Nt){var n=Nt.mul(this.low,this.high,e.low,e.high);return Re(n,Nt.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Yn:Ht;if(this.eq(vt))return e.isOdd()?vt:Ht;if(e.eq(vt))return this.isOdd()?vt:Ht;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Zp)&&e.lt(Zp))return Lt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,l=e.low>>>16,d=e.low&65535,f=0,h=0,g=0,b=0;return b+=a*d,g+=b>>>16,b&=65535,g+=i*d,h+=g>>>16,g&=65535,g+=a*l,h+=g>>>16,g&=65535,h+=o*d,f+=h>>>16,h&=65535,h+=i*l,f+=h>>>16,h&=65535,h+=a*u,f+=h>>>16,h&=65535,f+=t*d+o*l+i*u+a*s,f&=65535,Re(g<<16|b,f<<16|h,this.unsigned)};Y.mul=Y.multiply;Y.divide=function(e){if(mt(e)||(e=Rt(e)),e.isZero())throw Error("division by zero");if(Nt){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?Nt.div_u:Nt.div_s)(this.low,this.high,e.low,e.high);return Re(n,Nt.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Yn:Ht;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Yn;if(e.gt(this.shru(1)))return Yp;i=Yn}else{if(this.eq(vt)){if(e.eq(Qr)||e.eq(Ws))return vt;if(e.eq(vt))return Qr;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Ht)?e.isNegative()?Qr:Ws:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(vt))return this.unsigned?Yn:Ht;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Ht}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:vi(2,s-48),l=Lt(t),d=l.mul(e);d.isNegative()||d.gt(o);)t-=u,l=Lt(t,this.unsigned),d=l.mul(e);l.isZero()&&(l=Qr),i=i.add(l),o=o.sub(d)}return i};Y.div=Y.divide;Y.modulo=function(e){if(mt(e)||(e=Rt(e)),Nt){var n=(this.unsigned?Nt.rem_u:Nt.rem_s)(this.low,this.high,e.low,e.high);return Re(n,Nt.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};Y.mod=Y.modulo;Y.rem=Y.modulo;Y.not=function(){return Re(~this.low,~this.high,this.unsigned)};Y.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};Y.clz=Y.countLeadingZeros;Y.countTrailingZeros=function(){return this.low?Hp(this.low):Hp(this.high)+32};Y.ctz=Y.countTrailingZeros;Y.and=function(e){return mt(e)||(e=Rt(e)),Re(this.low&e.low,this.high&e.high,this.unsigned)};Y.or=function(e){return mt(e)||(e=Rt(e)),Re(this.low|e.low,this.high|e.high,this.unsigned)};Y.xor=function(e){return mt(e)||(e=Rt(e)),Re(this.low^e.low,this.high^e.high,this.unsigned)};Y.shiftLeft=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Re(0,this.low<<e-32,this.unsigned)};Y.shl=Y.shiftLeft;Y.shiftRight=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Re(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};Y.shr=Y.shiftRight;Y.shiftRightUnsigned=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Re(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Re(this.high,0,this.unsigned):Re(this.high>>>e-32,0,this.unsigned)};Y.shru=Y.shiftRightUnsigned;Y.shr_u=Y.shiftRightUnsigned;Y.rotateLeft=function(e){var n;return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,Re(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};Y.rotl=Y.rotateLeft;Y.rotateRight=function(e){var n;return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Re(this.high,this.low,this.unsigned):e<32?(n=32-e,Re(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,Re(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};Y.rotr=Y.rotateRight;Y.toSigned=function(){return this.unsigned?Re(this.low,this.high,!1):this};Y.toUnsigned=function(){return this.unsigned?this:Re(this.low,this.high,!0)};Y.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};Y.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};Y.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};We.fromBytes=function(e,n,t){return t?We.fromBytesLE(e,n):We.fromBytesBE(e,n)};We.fromBytesLE=function(e,n){return new We(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};We.fromBytesBE=function(e,n){return new We(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};typeof BigInt=="function"&&(We.fromBigInt=function(e,n){var t=Number(BigInt.asIntN(32,e)),o=Number(BigInt.asIntN(32,e>>BigInt(32)));return Re(t,o,n)},We.fromValue=function(e,n){return typeof e=="bigint"?We.fromBigInt(e,n):Rt(e,n)},Y.toBigInt=function(){var e=BigInt(this.low>>>0),n=BigInt(this.unsigned?this.high>>>0:this.high);return n<<BigInt(32)|e});pr=We});var qs=ue(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.ArgType=void 0;var tf;(function(r){r[r.INPUT=0]="INPUT",r[r.OUTPUT=1]="OUTPUT"})(tf||(wi.ArgType=tf={}))});var xi=ue(nn=>{"use strict";Object.defineProperty(nn,"__esModule",{value:!0});nn.SIZE_PREFIX_LENGTH=nn.FILE_IDENTIFIER_LENGTH=nn.SIZEOF_INT=nn.SIZEOF_SHORT=void 0;nn.SIZEOF_SHORT=2;nn.SIZEOF_INT=4;nn.FILE_IDENTIFIER_LENGTH=4;nn.SIZE_PREFIX_LENGTH=4});var Ks=ue(zt=>{"use strict";Object.defineProperty(zt,"__esModule",{value:!0});zt.isLittleEndian=zt.float64=zt.float32=zt.int32=void 0;zt.int32=new Int32Array(2);zt.float32=new Float32Array(zt.int32.buffer);zt.float64=new Float64Array(zt.int32.buffer);zt.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Xs=ue(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.Encoding=void 0;var nf;(function(r){r[r.UTF8_BYTES=1]="UTF8_BYTES",r[r.UTF16_STRING=2]="UTF16_STRING"})(nf||(Ti.Encoding=nf={}))});var Js=ue(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.ByteBuffer=void 0;var rn=xi(),a1=Xs(),wt=Ks(),Zs=class r{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new r(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return wt.int32[0]=this.readInt32(e),wt.float32[0]}readFloat64(e){return wt.int32[wt.isLittleEndian?0:1]=this.readInt32(e),wt.int32[wt.isLittleEndian?1:0]=this.readInt32(e+4),wt.float64[0]}writeInt8(e,n){this.bytes_[e]=n}writeUint8(e,n){this.bytes_[e]=n}writeInt16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeUint16(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8}writeInt32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeUint32(e,n){this.bytes_[e]=n,this.bytes_[e+1]=n>>8,this.bytes_[e+2]=n>>16,this.bytes_[e+3]=n>>24}writeInt64(e,n){this.writeInt32(e,Number(BigInt.asIntN(32,n))),this.writeInt32(e+4,Number(BigInt.asIntN(32,n>>BigInt(32))))}writeUint64(e,n){this.writeUint32(e,Number(BigInt.asUintN(32,n))),this.writeUint32(e+4,Number(BigInt.asUintN(32,n>>BigInt(32))))}writeFloat32(e,n){wt.float32[0]=n,this.writeInt32(e,wt.int32[0])}writeFloat64(e,n){wt.float64[0]=n,this.writeInt32(e,wt.int32[wt.isLittleEndian?0:1]),this.writeInt32(e+4,wt.int32[wt.isLittleEndian?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+rn.SIZEOF_INT+rn.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let n=0;n<rn.FILE_IDENTIFIER_LENGTH;n++)e+=String.fromCharCode(this.readInt8(this.position_+rn.SIZEOF_INT+n));return e}__offset(e,n){let t=e-this.readInt32(e);return n<this.readInt16(t)?this.readInt16(t+n):0}__union(e,n){return e.bb_pos=n+this.readInt32(n),e.bb=this,e}__string(e,n){e+=this.readInt32(e);let t=this.readInt32(e);e+=rn.SIZEOF_INT;let o=this.bytes_.subarray(e,e+t);return n===a1.Encoding.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,n){return typeof e=="string"?this.__string(n):this.__union(e,n)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+rn.SIZEOF_INT}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=rn.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+rn.FILE_IDENTIFIER_LENGTH);for(let n=0;n<rn.FILE_IDENTIFIER_LENGTH;n++)if(e.charCodeAt(n)!=this.readInt8(this.position()+rn.SIZEOF_INT+n))return!1;return!0}createScalarList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,n){let t=[];for(let o=0;o<n;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}};Ii.ByteBuffer=Zs});var of=ue(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.Builder=void 0;var rf=Js(),Ot=xi(),Ys=class r{constructor(e){this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder;let n;e?n=e:n=1024,this.bb=rf.ByteBuffer.allocate(n),this.space=n}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(e){this.force_defaults=e}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(e,n){e>this.minalign&&(this.minalign=e);let t=~(this.bb.capacity()-this.space+n)+1&e-1;for(;this.space<t+e+n;){let o=this.bb.capacity();this.bb=r.growByteBuffer(this.bb),this.space+=this.bb.capacity()-o}this.pad(t)}pad(e){for(let n=0;n<e;n++)this.bb.writeInt8(--this.space,0)}writeInt8(e){this.bb.writeInt8(this.space-=1,e)}writeInt16(e){this.bb.writeInt16(this.space-=2,e)}writeInt32(e){this.bb.writeInt32(this.space-=4,e)}writeInt64(e){this.bb.writeInt64(this.space-=8,e)}writeFloat32(e){this.bb.writeFloat32(this.space-=4,e)}writeFloat64(e){this.bb.writeFloat64(this.space-=8,e)}addInt8(e){this.prep(1,0),this.writeInt8(e)}addInt16(e){this.prep(2,0),this.writeInt16(e)}addInt32(e){this.prep(4,0),this.writeInt32(e)}addInt64(e){this.prep(8,0),this.writeInt64(e)}addFloat32(e){this.prep(4,0),this.writeFloat32(e)}addFloat64(e){this.prep(8,0),this.writeFloat64(e)}addFieldInt8(e,n,t){(this.force_defaults||n!=t)&&(this.addInt8(n),this.slot(e))}addFieldInt16(e,n,t){(this.force_defaults||n!=t)&&(this.addInt16(n),this.slot(e))}addFieldInt32(e,n,t){(this.force_defaults||n!=t)&&(this.addInt32(n),this.slot(e))}addFieldInt64(e,n,t){(this.force_defaults||n!==t)&&(this.addInt64(n),this.slot(e))}addFieldFloat32(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat32(n),this.slot(e))}addFieldFloat64(e,n,t){(this.force_defaults||n!=t)&&(this.addFloat64(n),this.slot(e))}addFieldOffset(e,n,t){(this.force_defaults||n!=t)&&(this.addOffset(n),this.slot(e))}addFieldStruct(e,n,t){n!=t&&(this.nested(n),this.slot(e))}nested(e){if(e!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(e){this.vtable!==null&&(this.vtable[e]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(e){let n=e.capacity();if(n&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");let t=n<<1,o=rf.ByteBuffer.allocate(t);return o.setPosition(t-n),o.bytes().set(e.bytes(),t-n),o}addOffset(e){this.prep(Ot.SIZEOF_INT,0),this.writeInt32(this.offset()-e+Ot.SIZEOF_INT)}startObject(e){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=e;for(let n=0;n<e;n++)this.vtable[n]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);let e=this.offset(),n=this.vtable_in_use-1;for(;n>=0&&this.vtable[n]==0;n--);let t=n+1;for(;n>=0;n--)this.addInt16(this.vtable[n]!=0?e-this.vtable[n]:0);let o=2;this.addInt16(e-this.object_start);let i=(t+o)*Ot.SIZEOF_SHORT;this.addInt16(i);let a=0,s=this.space;e:for(n=0;n<this.vtables.length;n++){let u=this.bb.capacity()-this.vtables[n];if(i==this.bb.readInt16(u)){for(let l=Ot.SIZEOF_SHORT;l<i;l+=Ot.SIZEOF_SHORT)if(this.bb.readInt16(s+l)!=this.bb.readInt16(u+l))continue e;a=this.vtables[n];break}}return a?(this.space=this.bb.capacity()-e,this.bb.writeInt32(this.space,a-e)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-e,this.offset()-e)),this.isNested=!1,e}finish(e,n,t){let o=t?Ot.SIZE_PREFIX_LENGTH:0;if(n){let i=n;if(this.prep(this.minalign,Ot.SIZEOF_INT+Ot.FILE_IDENTIFIER_LENGTH+o),i.length!=Ot.FILE_IDENTIFIER_LENGTH)throw new TypeError("FlatBuffers: file identifier must be length "+Ot.FILE_IDENTIFIER_LENGTH);for(let a=Ot.FILE_IDENTIFIER_LENGTH-1;a>=0;a--)this.writeInt8(i.charCodeAt(a))}this.prep(this.minalign,Ot.SIZEOF_INT+o),this.addOffset(e),o&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(e,n){this.finish(e,n,!0)}requiredField(e,n){let t=this.bb.capacity()-e,o=t-this.bb.readInt32(t);if(!(n<this.bb.readInt16(o)&&this.bb.readInt16(o+n)!=0))throw new TypeError("FlatBuffers: field "+n+" must be set")}startVector(e,n,t){this.notNested(),this.vector_num_elems=n,this.prep(Ot.SIZEOF_INT,e*n),this.prep(t,e*n)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(e){if(!e)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(e))return this.string_maps.get(e);let n=this.createString(e);return this.string_maps.set(e,n),n}createString(e){if(e==null)return 0;let n;return e instanceof Uint8Array?n=e:n=this.text_encoder.encode(e),this.addInt8(0),this.startVector(1,n.length,1),this.bb.setPosition(this.space-=n.length),this.bb.bytes().set(n,this.space),this.endVector()}createByteVector(e){return e==null?0:(this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector())}createObjectOffset(e){return e===null?0:typeof e=="string"?this.createString(e):e.pack(this)}createObjectOffsetList(e){let n=[];for(let t=0;t<e.length;++t){let o=e[t];if(o!==null)n.push(this.createObjectOffset(o));else throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.")}return n}createStructOffsetList(e,n){return n(this,e.length),this.createObjectOffsetList(e.slice().reverse()),this.endVector()}};Si.Builder=Ys});var Me=ue(Je=>{"use strict";Object.defineProperty(Je,"__esModule",{value:!0});Je.Encoding=Je.ByteBuffer=Je.Builder=Je.isLittleEndian=Je.int32=Je.float64=Je.float32=Je.SIZE_PREFIX_LENGTH=Je.SIZEOF_SHORT=Je.SIZEOF_INT=Je.FILE_IDENTIFIER_LENGTH=void 0;var $i=xi();Object.defineProperty(Je,"FILE_IDENTIFIER_LENGTH",{enumerable:!0,get:function(){return $i.FILE_IDENTIFIER_LENGTH}});Object.defineProperty(Je,"SIZEOF_INT",{enumerable:!0,get:function(){return $i.SIZEOF_INT}});Object.defineProperty(Je,"SIZEOF_SHORT",{enumerable:!0,get:function(){return $i.SIZEOF_SHORT}});Object.defineProperty(Je,"SIZE_PREFIX_LENGTH",{enumerable:!0,get:function(){return $i.SIZE_PREFIX_LENGTH}});var Ai=Ks();Object.defineProperty(Je,"float32",{enumerable:!0,get:function(){return Ai.float32}});Object.defineProperty(Je,"float64",{enumerable:!0,get:function(){return Ai.float64}});Object.defineProperty(Je,"int32",{enumerable:!0,get:function(){return Ai.int32}});Object.defineProperty(Je,"isLittleEndian",{enumerable:!0,get:function(){return Ai.isLittleEndian}});var s1=of();Object.defineProperty(Je,"Builder",{enumerable:!0,get:function(){return s1.Builder}});var u1=Js();Object.defineProperty(Je,"ByteBuffer",{enumerable:!0,get:function(){return u1.ByteBuffer}});var l1=Xs();Object.defineProperty(Je,"Encoding",{enumerable:!0,get:function(){return l1.Encoding}})});var eu=ue(on=>{"use strict";var c1=on&&on.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),d1=on&&on.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),p1=on&&on.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&c1(n,e,t[o]);return d1(n,e),n}})();Object.defineProperty(on,"__esModule",{value:!0});on.ArgTypeAndIndex=void 0;var f1=p1(Me()),af=qs(),Qs=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsArgTypeAndIndex(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,n){return e.setPosition(e.position()+f1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):af.ArgType.INPUT}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,n){e.addFieldInt8(0,n,af.ArgType.INPUT)}static addIndex(e,n){e.addFieldInt32(1,n,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,n,t){return r.startArgTypeAndIndex(e),r.addArgType(e,n),r.addIndex(e,t),r.endArgTypeAndIndex(e)}};on.ArgTypeAndIndex=Qs});var tu=ue(Oi=>{"use strict";Object.defineProperty(Oi,"__esModule",{value:!0});Oi.AttributeType=void 0;var sf;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.INT=2]="INT",r[r.STRING=3]="STRING",r[r.TENSOR=4]="TENSOR",r[r.GRAPH=5]="GRAPH",r[r.FLOATS=6]="FLOATS",r[r.INTS=7]="INTS",r[r.STRINGS=8]="STRINGS",r[r.TENSORS=9]="TENSORS",r[r.GRAPHS=10]="GRAPHS",r[r.SPARSE_TENSOR=11]="SPARSE_TENSOR",r[r.SPARSE_TENSORS=12]="SPARSE_TENSORS"})(sf||(Oi.AttributeType=sf={}))});var nu=ue(Pi=>{"use strict";Object.defineProperty(Pi,"__esModule",{value:!0});Pi.NodeType=void 0;var uf;(function(r){r[r.Primitive=0]="Primitive",r[r.Fused=1]="Fused"})(uf||(Pi.NodeType=uf={}))});var ou=ue(an=>{"use strict";var h1=an&&an.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),m1=an&&an.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),g1=an&&an.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&h1(n,e,t[o]);return m1(n,e),n}})();Object.defineProperty(an,"__esModule",{value:!0});an.Node=void 0;var b1=g1(Me()),y1=iu(),lf=nu(),ru=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNode(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,n){return e.setPosition(e.position()+b1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):lf.NodeType.Primitive}executionProviderType(e){let n=this.bb.__offset(this.bb_pos,18);return n?this.bb.__string(this.bb_pos+n,e):null}inputs(e,n){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?(n||new y1.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let n=this.bb.__offset(this.bb_pos,26);return n?this.bb.readInt32(this.bb.__vector(this.bb_pos+n)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDomain(e,n){e.addFieldOffset(2,n,0)}static addSinceVersion(e,n){e.addFieldInt32(3,n,0)}static addIndex(e,n){e.addFieldInt32(4,n,0)}static addOpType(e,n){e.addFieldOffset(5,n,0)}static addType(e,n){e.addFieldInt32(6,n,lf.NodeType.Primitive)}static addExecutionProviderType(e,n){e.addFieldOffset(7,n,0)}static addInputs(e,n){e.addFieldOffset(8,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(9,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addAttributes(e,n){e.addFieldOffset(10,n,0)}static createAttributesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startAttributesVector(e,n){e.startVector(4,n,4)}static addInputArgCounts(e,n){e.addFieldOffset(11,n,0)}static createInputArgCountsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startInputArgCountsVector(e,n){e.startVector(4,n,4)}static addImplicitInputs(e,n){e.addFieldOffset(12,n,0)}static createImplicitInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startImplicitInputsVector(e,n){e.startVector(4,n,4)}static endNode(e){return e.endObject()}static createNode(e,n,t,o,i,a,s,u,l,d,f,h,g,b){return r.startNode(e),r.addName(e,n),r.addDocString(e,t),r.addDomain(e,o),r.addSinceVersion(e,i),r.addIndex(e,a),r.addOpType(e,s),r.addType(e,u),r.addExecutionProviderType(e,l),r.addInputs(e,d),r.addOutputs(e,f),r.addAttributes(e,h),r.addInputArgCounts(e,g),r.addImplicitInputs(e,b),r.endNode(e)}};an.Node=ru});var su=ue(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.EdgeEnd=void 0;var au=class{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,n,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(n),e.offset()}};Ei.EdgeEnd=au});var lu=ue(sn=>{"use strict";var _1=sn&&sn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),v1=sn&&sn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),w1=sn&&sn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&_1(n,e,t[o]);return v1(n,e),n}})();Object.defineProperty(sn,"__esModule",{value:!0});sn.NodeEdge=void 0;var x1=w1(Me()),cf=su(),uu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodeEdge(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,n){return e.setPosition(e.position()+x1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new cf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new cf.EdgeEnd).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addInputEdges(e,n){e.addFieldOffset(1,n,0)}static startInputEdgesVector(e,n){e.startVector(12,n,4)}static addOutputEdges(e,n){e.addFieldOffset(2,n,0)}static startOutputEdgesVector(e,n){e.startVector(12,n,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,n,t,o){return r.startNodeEdge(e),r.addNodeIndex(e,n),r.addInputEdges(e,t),r.addOutputEdges(e,o),r.endNodeEdge(e)}};sn.NodeEdge=uu});var du=ue(un=>{"use strict";var T1=un&&un.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),I1=un&&un.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),S1=un&&un.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&T1(n,e,t[o]);return I1(n,e),n}})();Object.defineProperty(un,"__esModule",{value:!0});un.NodesToOptimizeIndices=void 0;var $1=S1(Me()),cu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsNodesToOptimizeIndices(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,n){return e.setPosition(e.position()+$1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addNumInputs(e,n){e.addFieldInt32(1,n,0)}static addNumOutputs(e,n){e.addFieldInt32(2,n,0)}static addHasVariadicInput(e,n){e.addFieldInt8(3,+n,0)}static addHasVariadicOutput(e,n){e.addFieldInt8(4,+n,0)}static addNumVariadicInputs(e,n){e.addFieldInt32(5,n,0)}static addNumVariadicOutputs(e,n){e.addFieldInt32(6,n,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,n,t,o,i,a,s,u){return r.startNodesToOptimizeIndices(e),r.addNodeIndices(e,n),r.addNumInputs(e,t),r.addNumOutputs(e,o),r.addHasVariadicInput(e,i),r.addHasVariadicOutput(e,a),r.addNumVariadicInputs(e,s),r.addNumVariadicOutputs(e,u),r.endNodesToOptimizeIndices(e)}};un.NodesToOptimizeIndices=cu});var fu=ue(ln=>{"use strict";var A1=ln&&ln.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),O1=ln&&ln.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),P1=ln&&ln.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&A1(n,e,t[o]);return O1(n,e),n}})();Object.defineProperty(ln,"__esModule",{value:!0});ln.RuntimeOptimizationRecord=void 0;var E1=P1(Me()),C1=du(),pu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecord(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,n){return e.setPosition(e.position()+E1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}nodesToOptimizeIndices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new C1.NodesToOptimizeIndices).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}producedOpIds(e,n){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,n){e.addFieldOffset(0,n,0)}static addNodesToOptimizeIndices(e,n){e.addFieldOffset(1,n,0)}static addProducedOpIds(e,n){e.addFieldOffset(3,n,0)}static createProducedOpIdsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startProducedOpIdsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}};ln.RuntimeOptimizationRecord=pu});var mu=ue(cn=>{"use strict";var D1=cn&&cn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),k1=cn&&cn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),N1=cn&&cn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&D1(n,e,t[o]);return k1(n,e),n}})();Object.defineProperty(cn,"__esModule",{value:!0});cn.RuntimeOptimizationRecordContainerEntry=void 0;var L1=N1(Me()),R1=fu(),hu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,n){return e.setPosition(e.position()+L1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}runtimeOptimizationRecords(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new R1.RuntimeOptimizationRecord).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,n){e.addFieldOffset(0,n,0)}static addRuntimeOptimizationRecords(e,n){e.addFieldOffset(1,n,0)}static createRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizationRecordContainerEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createRuntimeOptimizationRecordContainerEntry(e,n,t){return r.startRuntimeOptimizationRecordContainerEntry(e),r.addOptimizerName(e,n),r.addRuntimeOptimizationRecords(e,t),r.endRuntimeOptimizationRecordContainerEntry(e)}};cn.RuntimeOptimizationRecordContainerEntry=hu});var bu=ue(dn=>{"use strict";var z1=dn&&dn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),B1=dn&&dn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),M1=dn&&dn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&z1(n,e,t[o]);return B1(n,e),n}})();Object.defineProperty(dn,"__esModule",{value:!0});dn.RuntimeOptimizations=void 0;var V1=M1(Me()),F1=mu(),gu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsRuntimeOptimizations(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,n){return e.setPosition(e.position()+V1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}records(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new F1.RuntimeOptimizationRecordContainerEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,n){e.addFieldOffset(0,n,0)}static createRecordsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startRecordsVector(e,n){e.startVector(4,n,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,n){return r.startRuntimeOptimizations(e),r.addRecords(e,n),r.endRuntimeOptimizations(e)}};dn.RuntimeOptimizations=gu});var So=ue(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.TensorDataType=void 0;var df;(function(r){r[r.UNDEFINED=0]="UNDEFINED",r[r.FLOAT=1]="FLOAT",r[r.UINT8=2]="UINT8",r[r.INT8=3]="INT8",r[r.UINT16=4]="UINT16",r[r.INT16=5]="INT16",r[r.INT32=6]="INT32",r[r.INT64=7]="INT64",r[r.STRING=8]="STRING",r[r.BOOL=9]="BOOL",r[r.FLOAT16=10]="FLOAT16",r[r.DOUBLE=11]="DOUBLE",r[r.UINT32=12]="UINT32",r[r.UINT64=13]="UINT64",r[r.COMPLEX64=14]="COMPLEX64",r[r.COMPLEX128=15]="COMPLEX128",r[r.BFLOAT16=16]="BFLOAT16",r[r.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",r[r.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",r[r.FLOAT8E5M2=19]="FLOAT8E5M2",r[r.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"})(df||(Ci.TensorDataType=df={}))});var $o=ue(pn=>{"use strict";var G1=pn&&pn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),U1=pn&&pn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),W1=pn&&pn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&G1(n,e,t[o]);return U1(n,e),n}})();Object.defineProperty(pn,"__esModule",{value:!0});pn.Tensor=void 0;var H1=W1(Me()),pf=So(),yu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,n){return e.setPosition(e.position()+H1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):pf.TensorDataType.UNDEFINED}rawData(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.readUint8(this.bb.__vector(this.bb_pos+n)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static addDataType(e,n){e.addFieldInt32(3,n,pf.TensorDataType.UNDEFINED)}static addRawData(e,n){e.addFieldOffset(4,n,0)}static createRawDataVector(e,n){e.startVector(1,n.length,1);for(let t=n.length-1;t>=0;t--)e.addInt8(n[t]);return e.endVector()}static startRawDataVector(e,n){e.startVector(1,n,1)}static addStringData(e,n){e.addFieldOffset(5,n,0)}static createStringDataVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringDataVector(e,n){e.startVector(4,n,4)}static addExternalDataOffset(e,n){e.addFieldInt64(6,n,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,n,t,o,i,a,s,u){return r.startTensor(e),r.addName(e,n),r.addDocString(e,t),r.addDims(e,o),r.addDataType(e,i),r.addRawData(e,a),r.addStringData(e,s),r.addExternalDataOffset(e,u),r.endTensor(e)}};pn.Tensor=yu});var vu=ue(fn=>{"use strict";var j1=fn&&fn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),q1=fn&&fn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),K1=fn&&fn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&j1(n,e,t[o]);return q1(n,e),n}})();Object.defineProperty(fn,"__esModule",{value:!0});fn.SparseTensor=void 0;var X1=K1(Me()),ff=$o(),_u=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSparseTensor(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,n){return e.setPosition(e.position()+X1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}values(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new ff.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}indices(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new ff.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}dims(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,n){e.addFieldOffset(0,n,0)}static addIndices(e,n){e.addFieldOffset(1,n,0)}static addDims(e,n){e.addFieldOffset(2,n,0)}static createDimsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startDimsVector(e,n){e.startVector(8,n,8)}static endSparseTensor(e){return e.endObject()}};fn.SparseTensor=_u});var xu=ue(hn=>{"use strict";var Z1=hn&&hn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),J1=hn&&hn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),Y1=hn&&hn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&Z1(n,e,t[o]);return J1(n,e),n}})();Object.defineProperty(hn,"__esModule",{value:!0});hn.MapType=void 0;var Q1=Y1(Me()),hf=So(),e2=Ao(),wu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsMapType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsMapType(e,n){return e.setPosition(e.position()+Q1.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}keyType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):hf.TensorDataType.UNDEFINED}valueType(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new e2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startMapType(e){e.startObject(2)}static addKeyType(e,n){e.addFieldInt32(0,n,hf.TensorDataType.UNDEFINED)}static addValueType(e,n){e.addFieldOffset(1,n,0)}static endMapType(e){return e.endObject()}};hn.MapType=wu});var Iu=ue(mn=>{"use strict";var t2=mn&&mn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),n2=mn&&mn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),r2=mn&&mn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&t2(n,e,t[o]);return n2(n,e),n}})();Object.defineProperty(mn,"__esModule",{value:!0});mn.SequenceType=void 0;var o2=r2(Me()),i2=Ao(),Tu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsSequenceType(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSequenceType(e,n){return e.setPosition(e.position()+o2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new i2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startSequenceType(e){e.startObject(1)}static addElemType(e,n){e.addFieldOffset(0,n,0)}static endSequenceType(e){return e.endObject()}static createSequenceType(e,n){return r.startSequenceType(e),r.addElemType(e,n),r.endSequenceType(e)}};mn.SequenceType=Tu});var Su=ue(Di=>{"use strict";Object.defineProperty(Di,"__esModule",{value:!0});Di.DimensionValueType=void 0;var mf;(function(r){r[r.UNKNOWN=0]="UNKNOWN",r[r.VALUE=1]="VALUE",r[r.PARAM=2]="PARAM"})(mf||(Di.DimensionValueType=mf={}))});var Au=ue(gn=>{"use strict";var a2=gn&&gn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),s2=gn&&gn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),u2=gn&&gn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&a2(n,e,t[o]);return s2(n,e),n}})();Object.defineProperty(gn,"__esModule",{value:!0});gn.DimensionValue=void 0;var l2=u2(Me()),gf=Su(),$u=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimensionValue(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,n){return e.setPosition(e.position()+l2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):gf.DimensionValueType.UNKNOWN}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,n){e.addFieldInt8(0,n,gf.DimensionValueType.UNKNOWN)}static addDimValue(e,n){e.addFieldInt64(1,n,BigInt("0"))}static addDimParam(e,n){e.addFieldOffset(2,n,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,n,t,o){return r.startDimensionValue(e),r.addDimType(e,n),r.addDimValue(e,t),r.addDimParam(e,o),r.endDimensionValue(e)}};gn.DimensionValue=$u});var Pu=ue(bn=>{"use strict";var c2=bn&&bn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),d2=bn&&bn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),p2=bn&&bn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&c2(n,e,t[o]);return d2(n,e),n}})();Object.defineProperty(bn,"__esModule",{value:!0});bn.Dimension=void 0;var f2=p2(Me()),h2=Au(),Ou=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDimension(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,n){return e.setPosition(e.position()+f2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}value(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new h2.DimensionValue).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}denotation(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startDimension(e){e.startObject(2)}static addValue(e,n){e.addFieldOffset(0,n,0)}static addDenotation(e,n){e.addFieldOffset(1,n,0)}static endDimension(e){return e.endObject()}static createDimension(e,n,t){return r.startDimension(e),r.addValue(e,n),r.addDenotation(e,t),r.endDimension(e)}};bn.Dimension=Ou});var Cu=ue(yn=>{"use strict";var m2=yn&&yn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),g2=yn&&yn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),b2=yn&&yn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&m2(n,e,t[o]);return g2(n,e),n}})();Object.defineProperty(yn,"__esModule",{value:!0});yn.Shape=void 0;var y2=b2(Me()),_2=Pu(),Eu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,n){return e.setPosition(e.position()+y2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}dim(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new _2.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,n){e.addFieldOffset(0,n,0)}static createDimVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startDimVector(e,n){e.startVector(4,n,4)}static endShape(e){return e.endObject()}static createShape(e,n){return r.startShape(e),r.addDim(e,n),r.endShape(e)}};yn.Shape=Eu});var ku=ue(_n=>{"use strict";var v2=_n&&_n.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),w2=_n&&_n.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),x2=_n&&_n.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&v2(n,e,t[o]);return w2(n,e),n}})();Object.defineProperty(_n,"__esModule",{value:!0});_n.TensorTypeAndShape=void 0;var T2=x2(Me()),I2=Cu(),bf=So(),Du=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTensorTypeAndShape(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,n){return e.setPosition(e.position()+T2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):bf.TensorDataType.UNDEFINED}shape(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new I2.Shape).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,n){e.addFieldInt32(0,n,bf.TensorDataType.UNDEFINED)}static addShape(e,n){e.addFieldOffset(1,n,0)}static endTensorTypeAndShape(e){return e.endObject()}};_n.TensorTypeAndShape=Du});var Nu=ue(to=>{"use strict";Object.defineProperty(to,"__esModule",{value:!0});to.TypeInfoValue=void 0;to.unionToTypeInfoValue=S2;to.unionListToTypeInfoValue=$2;var yf=xu(),_f=Iu(),vf=ku(),ki;(function(r){r[r.NONE=0]="NONE",r[r.tensor_type=1]="tensor_type",r[r.sequence_type=2]="sequence_type",r[r.map_type=3]="map_type"})(ki||(to.TypeInfoValue=ki={}));function S2(r,e){switch(ki[r]){case"NONE":return null;case"tensor_type":return e(new vf.TensorTypeAndShape);case"sequence_type":return e(new _f.SequenceType);case"map_type":return e(new yf.MapType);default:return null}}function $2(r,e,n){switch(ki[r]){case"NONE":return null;case"tensor_type":return e(n,new vf.TensorTypeAndShape);case"sequence_type":return e(n,new _f.SequenceType);case"map_type":return e(n,new yf.MapType);default:return null}}});var Ao=ue(vn=>{"use strict";var A2=vn&&vn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),O2=vn&&vn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),P2=vn&&vn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&A2(n,e,t[o]);return O2(n,e),n}})();Object.defineProperty(vn,"__esModule",{value:!0});vn.TypeInfo=void 0;var E2=P2(Me()),wf=Nu(),Lu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsTypeInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,n){return e.setPosition(e.position()+E2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):wf.TypeInfoValue.NONE}value(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__union(e,this.bb_pos+n):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,n){e.addFieldOffset(0,n,0)}static addValueType(e,n){e.addFieldInt8(1,n,wf.TypeInfoValue.NONE)}static addValue(e,n){e.addFieldOffset(2,n,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,n,t,o){return r.startTypeInfo(e),r.addDenotation(e,n),r.addValueType(e,t),r.addValue(e,o),r.endTypeInfo(e)}};vn.TypeInfo=Lu});var zu=ue(wn=>{"use strict";var C2=wn&&wn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),D2=wn&&wn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),k2=wn&&wn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&C2(n,e,t[o]);return D2(n,e),n}})();Object.defineProperty(wn,"__esModule",{value:!0});wn.ValueInfo=void 0;var N2=k2(Me()),L2=Ao(),Ru=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsValueInfo(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,n){return e.setPosition(e.position()+N2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(e){let n=this.bb.__offset(this.bb_pos,8);return n?(e||new L2.TypeInfo).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldOffset(2,n,0)}static endValueInfo(e){return e.endObject()}};wn.ValueInfo=Ru});var Ni=ue(xn=>{"use strict";var R2=xn&&xn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),z2=xn&&xn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),B2=xn&&xn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&R2(n,e,t[o]);return z2(n,e),n}})();Object.defineProperty(xn,"__esModule",{value:!0});xn.Graph=void 0;var M2=B2(Me()),V2=ou(),F2=lu(),G2=bu(),U2=vu(),W2=$o(),H2=zu(),Bu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsGraph(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,n){return e.setPosition(e.position()+M2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new W2.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new H2.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,n){let t=this.bb.__offset(this.bb_pos,8);return t?(n||new V2.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,n){let t=this.bb.__offset(this.bb_pos,12);return t?(n||new F2.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,n){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,n){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,n){let t=this.bb.__offset(this.bb_pos,18);return t?(n||new U2.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let n=this.bb.__offset(this.bb_pos,20);return n?(e||new G2.RuntimeOptimizations).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,n){e.addFieldOffset(0,n,0)}static createInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInitializersVector(e,n){e.startVector(4,n,4)}static addNodeArgs(e,n){e.addFieldOffset(1,n,0)}static createNodeArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeArgsVector(e,n){e.startVector(4,n,4)}static addNodes(e,n){e.addFieldOffset(2,n,0)}static createNodesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodesVector(e,n){e.startVector(4,n,4)}static addMaxNodeIndex(e,n){e.addFieldInt32(3,n,0)}static addNodeEdges(e,n){e.addFieldOffset(4,n,0)}static createNodeEdgesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startNodeEdgesVector(e,n){e.startVector(4,n,4)}static addInputs(e,n){e.addFieldOffset(5,n,0)}static createInputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startInputsVector(e,n){e.startVector(4,n,4)}static addOutputs(e,n){e.addFieldOffset(6,n,0)}static createOutputsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOutputsVector(e,n){e.startVector(4,n,4)}static addSparseInitializers(e,n){e.addFieldOffset(7,n,0)}static createSparseInitializersVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSparseInitializersVector(e,n){e.startVector(4,n,4)}static addRuntimeOptimizations(e,n){e.addFieldOffset(8,n,0)}static endGraph(e){return e.endObject()}};xn.Graph=Bu});var iu=ue(Tn=>{"use strict";var j2=Tn&&Tn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),q2=Tn&&Tn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),K2=Tn&&Tn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&j2(n,e,t[o]);return q2(n,e),n}})();Object.defineProperty(Tn,"__esModule",{value:!0});Tn.Attribute=void 0;var X2=K2(Me()),xf=tu(),Tf=Ni(),If=$o(),Mu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsAttribute(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,n){return e.setPosition(e.position()+X2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}name(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}docString(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):xf.AttributeType.UNDEFINED}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let n=this.bb.__offset(this.bb_pos,14);return n?this.bb.__string(this.bb_pos+n,e):null}t(e){let n=this.bb.__offset(this.bb_pos,16);return n?(e||new If.Tensor).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}g(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new Tf.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}floats(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.readFloat32(this.bb.__vector(this.bb_pos+n)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let n=this.bb.__offset(this.bb_pos,22);return n?this.bb.readInt64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,n){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,n):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,n){let t=this.bb.__offset(this.bb_pos,26);return t?(n||new If.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,n){let t=this.bb.__offset(this.bb_pos,28);return t?(n||new Tf.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,n){e.addFieldOffset(0,n,0)}static addDocString(e,n){e.addFieldOffset(1,n,0)}static addType(e,n){e.addFieldInt32(2,n,xf.AttributeType.UNDEFINED)}static addF(e,n){e.addFieldFloat32(3,n,0)}static addI(e,n){e.addFieldInt64(4,n,BigInt("0"))}static addS(e,n){e.addFieldOffset(5,n,0)}static addT(e,n){e.addFieldOffset(6,n,0)}static addG(e,n){e.addFieldOffset(7,n,0)}static addFloats(e,n){e.addFieldOffset(8,n,0)}static createFloatsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addFloat32(n[t]);return e.endVector()}static startFloatsVector(e,n){e.startVector(4,n,4)}static addInts(e,n){e.addFieldOffset(9,n,0)}static createIntsVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startIntsVector(e,n){e.startVector(8,n,8)}static addStrings(e,n){e.addFieldOffset(10,n,0)}static createStringsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startStringsVector(e,n){e.startVector(4,n,4)}static addTensors(e,n){e.addFieldOffset(11,n,0)}static createTensorsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startTensorsVector(e,n){e.startVector(4,n,4)}static addGraphs(e,n){e.addFieldOffset(12,n,0)}static createGraphsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startGraphsVector(e,n){e.startVector(4,n,4)}static endAttribute(e){return e.endObject()}};Tn.Attribute=Mu});var Fu=ue(In=>{"use strict";var Z2=In&&In.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),J2=In&&In.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),Y2=In&&In.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&Z2(n,e,t[o]);return J2(n,e),n}})();Object.defineProperty(In,"__esModule",{value:!0});In.DeprecatedKernelCreateInfos=void 0;var Q2=Y2(Me()),Vu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedKernelCreateInfos(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedKernelCreateInfos(e,n){return e.setPosition(e.position()+Q2.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.readUint32(this.bb.__vector(this.bb_pos+n)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}kernelDefHashes(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.readUint64(this.bb.__vector(this.bb_pos+n)+e*8):BigInt(0)}kernelDefHashesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedKernelCreateInfos(e){e.startObject(2)}static addNodeIndices(e,n){e.addFieldOffset(0,n,0)}static createNodeIndicesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addInt32(n[t]);return e.endVector()}static startNodeIndicesVector(e,n){e.startVector(4,n,4)}static addKernelDefHashes(e,n){e.addFieldOffset(1,n,0)}static createKernelDefHashesVector(e,n){e.startVector(8,n.length,8);for(let t=n.length-1;t>=0;t--)e.addInt64(n[t]);return e.endVector()}static startKernelDefHashesVector(e,n){e.startVector(8,n,8)}static endDeprecatedKernelCreateInfos(e){return e.endObject()}static createDeprecatedKernelCreateInfos(e,n,t){return r.startDeprecatedKernelCreateInfos(e),r.addNodeIndices(e,n),r.addKernelDefHashes(e,t),r.endDeprecatedKernelCreateInfos(e)}};In.DeprecatedKernelCreateInfos=Vu});var Sf=ue(Sn=>{"use strict";var eI=Sn&&Sn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),tI=Sn&&Sn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),nI=Sn&&Sn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&eI(n,e,t[o]);return tI(n,e),n}})();Object.defineProperty(Sn,"__esModule",{value:!0});Sn.DeprecatedNodeIndexAndKernelDefHash=void 0;var rI=nI(Me()),Gu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedNodeIndexAndKernelDefHash(e,n){return e.setPosition(e.position()+rI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}kernelDefHash(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint64(this.bb_pos+e):BigInt("0")}static startDeprecatedNodeIndexAndKernelDefHash(e){e.startObject(2)}static addNodeIndex(e,n){e.addFieldInt32(0,n,0)}static addKernelDefHash(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endDeprecatedNodeIndexAndKernelDefHash(e){return e.endObject()}static createDeprecatedNodeIndexAndKernelDefHash(e,n,t){return r.startDeprecatedNodeIndexAndKernelDefHash(e),r.addNodeIndex(e,n),r.addKernelDefHash(e,t),r.endDeprecatedNodeIndexAndKernelDefHash(e)}};Sn.DeprecatedNodeIndexAndKernelDefHash=Gu});var Wu=ue($n=>{"use strict";var oI=$n&&$n.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),iI=$n&&$n.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),aI=$n&&$n.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&oI(n,e,t[o]);return iI(n,e),n}})();Object.defineProperty($n,"__esModule",{value:!0});$n.DeprecatedSubGraphSessionState=void 0;var sI=aI(Me()),uI=Hu(),Uu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSubGraphSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSubGraphSessionState(e,n){return e.setPosition(e.position()+sI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}graphId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}sessionState(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new uI.DeprecatedSessionState).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startDeprecatedSubGraphSessionState(e){e.startObject(2)}static addGraphId(e,n){e.addFieldOffset(0,n,0)}static addSessionState(e,n){e.addFieldOffset(1,n,0)}static endDeprecatedSubGraphSessionState(e){let n=e.endObject();return e.requiredField(n,4),n}};$n.DeprecatedSubGraphSessionState=Uu});var Hu=ue(An=>{"use strict";var lI=An&&An.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),cI=An&&An.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),dI=An&&An.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&lI(n,e,t[o]);return cI(n,e),n}})();Object.defineProperty(An,"__esModule",{value:!0});An.DeprecatedSessionState=void 0;var pI=dI(Me()),fI=Fu(),hI=Wu(),ju=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsDeprecatedSessionState(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDeprecatedSessionState(e,n){return e.setPosition(e.position()+pI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernels(e){let n=this.bb.__offset(this.bb_pos,4);return n?(e||new fI.DeprecatedKernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}subGraphSessionStates(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new hI.DeprecatedSubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}subGraphSessionStatesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startDeprecatedSessionState(e){e.startObject(2)}static addKernels(e,n){e.addFieldOffset(0,n,0)}static addSubGraphSessionStates(e,n){e.addFieldOffset(1,n,0)}static createSubGraphSessionStatesVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startSubGraphSessionStatesVector(e,n){e.startVector(4,n,4)}static endDeprecatedSessionState(e){return e.endObject()}static createDeprecatedSessionState(e,n,t){return r.startDeprecatedSessionState(e),r.addKernels(e,n),r.addSubGraphSessionStates(e,t),r.endDeprecatedSessionState(e)}};An.DeprecatedSessionState=ju});var Ku=ue(On=>{"use strict";var mI=On&&On.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),gI=On&&On.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),bI=On&&On.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&mI(n,e,t[o]);return gI(n,e),n}})();Object.defineProperty(On,"__esModule",{value:!0});On.KernelTypeStrArgsEntry=void 0;var yI=bI(Me()),_I=eu(),qu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+yI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}args(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new _I.ArgTypeAndIndex).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,n){e.addFieldOffset(0,n,0)}static addArgs(e,n){e.addFieldOffset(1,n,0)}static createArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createKernelTypeStrArgsEntry(e,n,t){return r.startKernelTypeStrArgsEntry(e),r.addKernelTypeStr(e,n),r.addArgs(e,t),r.endKernelTypeStrArgsEntry(e)}};On.KernelTypeStrArgsEntry=qu});var Zu=ue(Pn=>{"use strict";var vI=Pn&&Pn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),wI=Pn&&Pn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),xI=Pn&&Pn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&vI(n,e,t[o]);return wI(n,e),n}})();Object.defineProperty(Pn,"__esModule",{value:!0});Pn.OpIdKernelTypeStrArgsEntry=void 0;var TI=xI(Me()),II=Ku(),Xu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,n){return e.setPosition(e.position()+TI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}kernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new II.KernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,n){e.addFieldOffset(0,n,0)}static addKernelTypeStrArgs(e,n){e.addFieldOffset(1,n,0)}static createKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endOpIdKernelTypeStrArgsEntry(e){let n=e.endObject();return e.requiredField(n,4),n}static createOpIdKernelTypeStrArgsEntry(e,n,t){return r.startOpIdKernelTypeStrArgsEntry(e),r.addOpId(e,n),r.addKernelTypeStrArgs(e,t),r.endOpIdKernelTypeStrArgsEntry(e)}};Pn.OpIdKernelTypeStrArgsEntry=Xu});var Yu=ue(En=>{"use strict";var SI=En&&En.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),$I=En&&En.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),AI=En&&En.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&SI(n,e,t[o]);return $I(n,e),n}})();Object.defineProperty(En,"__esModule",{value:!0});En.KernelTypeStrResolver=void 0;var OI=AI(Me()),PI=Zu(),Ju=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsKernelTypeStrResolver(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,n){return e.setPosition(e.position()+OI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,n){let t=this.bb.__offset(this.bb_pos,4);return t?(n||new PI.OpIdKernelTypeStrArgsEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,n){e.addFieldOffset(0,n,0)}static createOpKernelTypeStrArgsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,n){e.startVector(4,n,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,n){return r.startKernelTypeStrResolver(e),r.addOpKernelTypeStrArgs(e,n),r.endKernelTypeStrResolver(e)}};En.KernelTypeStrResolver=Ju});var el=ue(Cn=>{"use strict";var EI=Cn&&Cn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),CI=Cn&&Cn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),DI=Cn&&Cn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&EI(n,e,t[o]);return CI(n,e),n}})();Object.defineProperty(Cn,"__esModule",{value:!0});Cn.OperatorSetId=void 0;var kI=DI(Me()),Qu=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsOperatorSetId(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,n){return e.setPosition(e.position()+kI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,n){e.addFieldOffset(0,n,0)}static addVersion(e,n){e.addFieldInt64(1,n,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,n,t){return r.startOperatorSetId(e),r.addDomain(e,n),r.addVersion(e,t),r.endOperatorSetId(e)}};Cn.OperatorSetId=Qu});var nl=ue(Dn=>{"use strict";var NI=Dn&&Dn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),LI=Dn&&Dn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),RI=Dn&&Dn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&NI(n,e,t[o]);return LI(n,e),n}})();Object.defineProperty(Dn,"__esModule",{value:!0});Dn.StringStringEntry=void 0;var zI=RI(Me()),tl=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsStringStringEntry(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,n){return e.setPosition(e.position()+zI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}key(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}value(e){let n=this.bb.__offset(this.bb_pos,6);return n?this.bb.__string(this.bb_pos+n,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,n){e.addFieldOffset(0,n,0)}static addValue(e,n){e.addFieldOffset(1,n,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,n,t){return r.startStringStringEntry(e),r.addKey(e,n),r.addValue(e,t),r.endStringStringEntry(e)}};Dn.StringStringEntry=tl});var ol=ue(kn=>{"use strict";var BI=kn&&kn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),MI=kn&&kn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),VI=kn&&kn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&BI(n,e,t[o]);return MI(n,e),n}})();Object.defineProperty(kn,"__esModule",{value:!0});kn.Model=void 0;var FI=VI(Me()),GI=Ni(),UI=el(),WI=nl(),rl=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsModel(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,n){return e.setPosition(e.position()+FI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,n){let t=this.bb.__offset(this.bb_pos,6);return t?(n||new UI.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let n=this.bb.__offset(this.bb_pos,8);return n?this.bb.__string(this.bb_pos+n,e):null}producerVersion(e){let n=this.bb.__offset(this.bb_pos,10);return n?this.bb.__string(this.bb_pos+n,e):null}domain(e){let n=this.bb.__offset(this.bb_pos,12);return n?this.bb.__string(this.bb_pos+n,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let n=this.bb.__offset(this.bb_pos,16);return n?this.bb.__string(this.bb_pos+n,e):null}graph(e){let n=this.bb.__offset(this.bb_pos,18);return n?(e||new GI.Graph).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}graphDocString(e){let n=this.bb.__offset(this.bb_pos,20);return n?this.bb.__string(this.bb_pos+n,e):null}metadataProps(e,n){let t=this.bb.__offset(this.bb_pos,22);return t?(n||new WI.StringStringEntry).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,n){e.addFieldInt64(0,n,BigInt("0"))}static addOpsetImport(e,n){e.addFieldOffset(1,n,0)}static createOpsetImportVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startOpsetImportVector(e,n){e.startVector(4,n,4)}static addProducerName(e,n){e.addFieldOffset(2,n,0)}static addProducerVersion(e,n){e.addFieldOffset(3,n,0)}static addDomain(e,n){e.addFieldOffset(4,n,0)}static addModelVersion(e,n){e.addFieldInt64(5,n,BigInt("0"))}static addDocString(e,n){e.addFieldOffset(6,n,0)}static addGraph(e,n){e.addFieldOffset(7,n,0)}static addGraphDocString(e,n){e.addFieldOffset(8,n,0)}static addMetadataProps(e,n){e.addFieldOffset(9,n,0)}static createMetadataPropsVector(e,n){e.startVector(4,n.length,4);for(let t=n.length-1;t>=0;t--)e.addOffset(n[t]);return e.endVector()}static startMetadataPropsVector(e,n){e.startVector(4,n,4)}static endModel(e){return e.endObject()}};kn.Model=rl});var $f=ue(Nn=>{"use strict";var HI=Nn&&Nn.__createBinding||(Object.create?(function(r,e,n,t){t===void 0&&(t=n);var o=Object.getOwnPropertyDescriptor(e,n);(!o||("get"in o?!e.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return e[n]}}),Object.defineProperty(r,t,o)}):(function(r,e,n,t){t===void 0&&(t=n),r[t]=e[n]})),jI=Nn&&Nn.__setModuleDefault||(Object.create?(function(r,e){Object.defineProperty(r,"default",{enumerable:!0,value:e})}):function(r,e){r.default=e}),qI=Nn&&Nn.__importStar||(function(){var r=function(e){return r=Object.getOwnPropertyNames||function(n){var t=[];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[t.length]=o);return t},r(e)};return function(e){if(e&&e.__esModule)return e;var n={};if(e!=null)for(var t=r(e),o=0;o<t.length;o++)t[o]!=="default"&&HI(n,e,t[o]);return jI(n,e),n}})();Object.defineProperty(Nn,"__esModule",{value:!0});Nn.InferenceSession=void 0;var KI=qI(Me()),XI=Yu(),ZI=ol(),il=class r{constructor(){this.bb=null,this.bb_pos=0}__init(e,n){return this.bb_pos=e,this.bb=n,this}static getRootAsInferenceSession(e,n){return(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,n){return e.setPosition(e.position()+KI.SIZE_PREFIX_LENGTH),(n||new r).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let n=this.bb.__offset(this.bb_pos,4);return n?this.bb.__string(this.bb_pos+n,e):null}model(e){let n=this.bb.__offset(this.bb_pos,6);return n?(e||new ZI.Model).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}kernelTypeStrResolver(e){let n=this.bb.__offset(this.bb_pos,10);return n?(e||new XI.KernelTypeStrResolver).__init(this.bb.__indirect(this.bb_pos+n),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,n){e.addFieldOffset(0,n,0)}static addModel(e,n){e.addFieldOffset(1,n,0)}static addKernelTypeStrResolver(e,n){e.addFieldOffset(3,n,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,n){e.finish(n,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,n){e.finish(n,"ORTM",!0)}};Nn.InferenceSession=il});var JI,YI,Li,Bt,QI,eS,tS,nS,rS,oS,iS,aS,al,sl,sS,uS,lS,cS,ul,dS,pS,fS,hS,mS,gS,bS,yS,_S,vS,wS,xS,TS,Oo,ll,IS,cl,SS,Af=L(()=>{"use strict";JI=xe(qs()),YI=xe(eu()),Li=xe(iu()),Bt=xe(tu()),QI=xe(Fu()),eS=xe(Sf()),tS=xe(Hu()),nS=xe(Wu()),rS=xe(Pu()),oS=xe(Au()),iS=xe(Su()),aS=xe(su()),al=xe(Ni()),sl=xe($f()),sS=xe(Ku()),uS=xe(Yu()),lS=xe(xu()),cS=xe(ol()),ul=xe(ou()),dS=xe(lu()),pS=xe(nu()),fS=xe(du()),hS=xe(Zu()),mS=xe(el()),gS=xe(fu()),bS=xe(mu()),yS=xe(bu()),_S=xe(Iu()),vS=xe(Cu()),wS=xe(vu()),xS=xe(nl()),TS=xe($o()),Oo=xe(So()),ll=xe(ku()),IS=xe(Ao()),cl=xe(Nu()),SS=xe(zu())});var Po=L(()=>{"use strict";Af()});var Pf=ue((lk,Of)=>{"use strict";Of.exports=$S;function $S(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(s,u){n[t]=function(d){if(i)if(i=!1,d)u(d);else{for(var f=new Array(arguments.length-1),h=0;h<f.length;)f[h++]=arguments[h];s.apply(null,f)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var kf=ue(Df=>{"use strict";var zi=Df;zi.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var no=new Array(64),Cf=new Array(123);for(jt=0;jt<64;)Cf[no[jt]=jt<26?jt+65:jt<52?jt+71:jt<62?jt-4:jt-59|43]=jt++;var jt;zi.encode=function(e,n,t){for(var o=null,i=[],a=0,s=0,u;n<t;){var l=e[n++];switch(s){case 0:i[a++]=no[l>>2],u=(l&3)<<4,s=1;break;case 1:i[a++]=no[u|l>>4],u=(l&15)<<2,s=2;break;case 2:i[a++]=no[u|l>>6],i[a++]=no[l&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=no[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var Ef="invalid encoding";zi.decode=function(e,n,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=Cf[u])===void 0)throw Error(Ef);switch(i){case 0:a=u,i=1;break;case 1:n[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:n[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:n[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(Ef);return t-o};zi.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Lf=ue((dk,Nf)=>{"use strict";Nf.exports=Bi;function Bi(){this._listeners=Object.create(null)}Bi.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Bi.prototype.off=function(e,n){if(e===void 0)this._listeners=Object.create(null);else if(n===void 0)this._listeners[e]=[];else{var t=this._listeners[e];if(!t)return this;for(var o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o}return this};Bi.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var Gf=ue((pk,Ff)=>{"use strict";Ff.exports=Rf(Rf);function Rf(r){return typeof Float32Array<"u"?(function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,d){e[0]=u,l[d]=n[0],l[d+1]=n[1],l[d+2]=n[2],l[d+3]=n[3]}function i(u,l,d){e[0]=u,l[d]=n[3],l[d+1]=n[2],l[d+2]=n[1],l[d+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function s(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?a:s,r.readFloatBE=t?s:a})():(function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|l)>>>0,i,a)}}r.writeFloatLE=e.bind(null,zf),r.writeFloatBE=e.bind(null,Bf);function n(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,l=a&8388607;return u===255?l?NaN:s*(1/0):u===0?s*1401298464324817e-60*l:s*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,Mf),r.readFloatBE=n.bind(null,Vf)})(),typeof Float64Array<"u"?(function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,d){e[0]=u,l[d]=n[0],l[d+1]=n[1],l[d+2]=n[2],l[d+3]=n[3],l[d+4]=n[4],l[d+5]=n[5],l[d+6]=n[6],l[d+7]=n[7]}function i(u,l,d){e[0]=u,l[d]=n[7],l[d+1]=n[6],l[d+2]=n[5],l[d+3]=n[4],l[d+4]=n[3],l[d+5]=n[2],l[d+6]=n[1],l[d+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function a(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function s(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?a:s,r.readDoubleBE=t?s:a})():(function(){function e(t,o,i,a,s,u){var l=a<0?1:0;if(l&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((l<<31|2146435072)>>>0,s,u+i);else{var d;if(a<22250738585072014e-324)d=a/5e-324,t(d>>>0,s,u+o),t((l<<31|d/4294967296)>>>0,s,u+i);else{var f=Math.floor(Math.log(a)/Math.LN2);f===1024&&(f=1023),d=a*Math.pow(2,-f),t(d*4503599627370496>>>0,s,u+o),t((l<<31|f+1023<<20|d*1048576&1048575)>>>0,s,u+i)}}}r.writeDoubleLE=e.bind(null,zf,0,4),r.writeDoubleBE=e.bind(null,Bf,4,0);function n(t,o,i,a,s){var u=t(a,s+o),l=t(a,s+i),d=(l>>31)*2+1,f=l>>>20&2047,h=4294967296*(l&1048575)+u;return f===2047?h?NaN:d*(1/0):f===0?d*5e-324*h:d*Math.pow(2,f-1075)*(h+4503599627370496)}r.readDoubleLE=n.bind(null,Mf,0,4),r.readDoubleBE=n.bind(null,Vf,4,0)})(),r}function zf(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function Bf(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function Mf(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function Vf(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var Wf=ue((fk,Uf)=>{"use strict";Uf.exports=AS;function AS(r){try{if(typeof Jr!="function")return null;var e=Jr(r);return e&&(e.length||Object.keys(e).length)?e:null}catch{return null}}});var jf=ue(Hf=>{"use strict";var pl=Hf,dl="\uFFFD";pl.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};pl.read=function(e,n,t){if(t-n<1)return"";for(var o="",i=n;i<t;){var a=e[i++];if(a<=127)o+=String.fromCharCode(a);else if(a>=192&&a<224){var s=(a&31)<<6|e[i++]&63;o+=s>=128?String.fromCharCode(s):dl}else if(a>=224&&a<240){var u=(a&15)<<12|(e[i++]&63)<<6|e[i++]&63;o+=u>=2048?String.fromCharCode(u):dl}else if(a>=240){var l=(a&7)<<18|(e[i++]&63)<<12|(e[i++]&63)<<6|e[i++]&63;l<65536||l>1114111?o+=dl:(l-=65536,o+=String.fromCharCode(55296+(l>>10)),o+=String.fromCharCode(56320+(l&1023)))}}return o};pl.write=function(e,n,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var Kf=ue((gk,qf)=>{"use strict";qf.exports=OS;function OS(r,e,n){var t=n||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return r(u);a+u>t&&(i=r(t),a=0);var l=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),l}}});var Zf=ue((bk,Xf)=>{"use strict";Xf.exports=ct;var Eo=hr();function ct(r,e){this.lo=r>>>0,this.hi=e>>>0}var Cr=ct.zero=new ct(0,0);Cr.toNumber=function(){return 0};Cr.zzEncode=Cr.zzDecode=function(){return this};Cr.length=function(){return 1};var PS=ct.zeroHash="\0\0\0\0\0\0\0\0";ct.fromNumber=function(e){if(e===0)return Cr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new ct(t,o)};ct.from=function(e){if(typeof e=="number")return ct.fromNumber(e);if(Eo.isString(e))if(Eo.Long)e=Eo.Long.fromString(e);else return ct.fromNumber(parseInt(e,10));return e.low||e.high?new ct(e.low>>>0,e.high>>>0):Cr};ct.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};ct.prototype.toLong=function(e){return Eo.Long?new Eo.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var fr=String.prototype.charCodeAt;ct.fromHash=function(e){return e===PS?Cr:new ct((fr.call(e,0)|fr.call(e,1)<<8|fr.call(e,2)<<16|fr.call(e,3)<<24)>>>0,(fr.call(e,4)|fr.call(e,5)<<8|fr.call(e,6)<<16|fr.call(e,7)<<24)>>>0)};ct.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};ct.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};ct.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};ct.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var Jf=ue((Co,fl)=>{(function(r,e){function n(t){return t.default||t}typeof define=="function"&&define.amd?define([],function(){var t={};return e(t),n(t)}):typeof Co=="object"?(e(Co),typeof fl=="object"&&(fl.exports=n(Co))):(function(){var t={};e(t),r.Long=n(t)})()})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:Co,function(r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var e=null;try{e=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function n(V,S,F){this.low=V|0,this.high=S|0,this.unsigned=!!F}n.prototype.__isLong__,Object.defineProperty(n.prototype,"__isLong__",{value:!0});function t(V){return(V&&V.__isLong__)===!0}function o(V){var S=Math.clz32(V&-V);return V?31-S:S}n.isLong=t;var i={},a={};function s(V,S){var F,X,te;return S?(V>>>=0,(te=0<=V&&V<256)&&(X=a[V],X)?X:(F=l(V,0,!0),te&&(a[V]=F),F)):(V|=0,(te=-128<=V&&V<128)&&(X=i[V],X)?X:(F=l(V,V<0?-1:0,!1),te&&(i[V]=F),F))}n.fromInt=s;function u(V,S){if(isNaN(V))return S?$:I;if(S){if(V<0)return $;if(V>=T)return H}else{if(V<=-v)return K;if(V+1>=v)return M}return V<0?u(-V,S).neg():l(V%_|0,V/_|0,S)}n.fromNumber=u;function l(V,S,F){return new n(V,S,F)}n.fromBits=l;var d=Math.pow;function f(V,S,F){if(V.length===0)throw Error("empty string");if(typeof S=="number"?(F=S,S=!1):S=!!S,V==="NaN"||V==="Infinity"||V==="+Infinity"||V==="-Infinity")return S?$:I;if(F=F||10,F<2||36<F)throw RangeError("radix");var X;if((X=V.indexOf("-"))>0)throw Error("interior hyphen");if(X===0)return f(V.substring(1),S,F).neg();for(var te=u(d(F,8)),J=I,re=0;re<V.length;re+=8){var pe=Math.min(8,V.length-re),de=parseInt(V.substring(re,re+pe),F);if(pe<8){var Ie=u(d(F,pe));J=J.mul(Ie).add(u(de))}else J=J.mul(te),J=J.add(u(de))}return J.unsigned=S,J}n.fromString=f;function h(V,S){return typeof V=="number"?u(V,S):typeof V=="string"?f(V,S):l(V.low,V.high,typeof S=="boolean"?S:V.unsigned)}n.fromValue=h;var g=65536,b=1<<24,_=g*g,T=_*_,v=T/2,x=s(b),I=s(0);n.ZERO=I;var $=s(0,!0);n.UZERO=$;var P=s(1);n.ONE=P;var E=s(1,!0);n.UONE=E;var z=s(-1);n.NEG_ONE=z;var M=l(-1,2147483647,!1);n.MAX_VALUE=M;var H=l(-1,-1,!0);n.MAX_UNSIGNED_VALUE=H;var K=l(0,-2147483648,!1);n.MIN_VALUE=K;var B=n.prototype;B.toInt=function(){return this.unsigned?this.low>>>0:this.low},B.toNumber=function(){return this.unsigned?(this.high>>>0)*_+(this.low>>>0):this.high*_+(this.low>>>0)},B.toString=function(S){if(S=S||10,S<2||36<S)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(K)){var F=u(S),X=this.div(F),te=X.mul(F).sub(this);return X.toString(S)+te.toInt().toString(S)}else return"-"+this.neg().toString(S);for(var J=u(d(S,6),this.unsigned),re=this,pe="";;){var de=re.div(J),Ie=re.sub(de.mul(J)).toInt()>>>0,ge=Ie.toString(S);if(re=de,re.isZero())return ge+pe;for(;ge.length<6;)ge="0"+ge;pe=""+ge+pe}},B.getHighBits=function(){return this.high},B.getHighBitsUnsigned=function(){return this.high>>>0},B.getLowBits=function(){return this.low},B.getLowBitsUnsigned=function(){return this.low>>>0},B.getNumBitsAbs=function(){if(this.isNegative())return this.eq(K)?64:this.neg().getNumBitsAbs();for(var S=this.high!=0?this.high:this.low,F=31;F>0&&(S&1<<F)==0;F--);return this.high!=0?F+33:F+1},B.isSafeInteger=function(){var S=this.high>>21;return S?this.unsigned?!1:S===-1&&!(this.low===0&&this.high===-2097152):!0},B.isZero=function(){return this.high===0&&this.low===0},B.eqz=B.isZero,B.isNegative=function(){return!this.unsigned&&this.high<0},B.isPositive=function(){return this.unsigned||this.high>=0},B.isOdd=function(){return(this.low&1)===1},B.isEven=function(){return(this.low&1)===0},B.equals=function(S){return t(S)||(S=h(S)),this.unsigned!==S.unsigned&&this.high>>>31===1&&S.high>>>31===1?!1:this.high===S.high&&this.low===S.low},B.eq=B.equals,B.notEquals=function(S){return!this.eq(S)},B.neq=B.notEquals,B.ne=B.notEquals,B.lessThan=function(S){return this.comp(S)<0},B.lt=B.lessThan,B.lessThanOrEqual=function(S){return this.comp(S)<=0},B.lte=B.lessThanOrEqual,B.le=B.lessThanOrEqual,B.greaterThan=function(S){return this.comp(S)>0},B.gt=B.greaterThan,B.greaterThanOrEqual=function(S){return this.comp(S)>=0},B.gte=B.greaterThanOrEqual,B.ge=B.greaterThanOrEqual,B.compare=function(S){if(t(S)||(S=h(S)),this.eq(S))return 0;var F=this.isNegative(),X=S.isNegative();return F&&!X?-1:!F&&X?1:this.unsigned?S.high>>>0>this.high>>>0||S.high===this.high&&S.low>>>0>this.low>>>0?-1:1:this.sub(S).isNegative()?-1:1},B.comp=B.compare,B.negate=function(){return!this.unsigned&&this.eq(K)?K:this.not().add(P)},B.neg=B.negate,B.add=function(S){t(S)||(S=h(S));var F=this.high>>>16,X=this.high&65535,te=this.low>>>16,J=this.low&65535,re=S.high>>>16,pe=S.high&65535,de=S.low>>>16,Ie=S.low&65535,ge=0,W=0,D=0,oe=0;return oe+=J+Ie,D+=oe>>>16,oe&=65535,D+=te+de,W+=D>>>16,D&=65535,W+=X+pe,ge+=W>>>16,W&=65535,ge+=F+re,ge&=65535,l(D<<16|oe,ge<<16|W,this.unsigned)},B.subtract=function(S){return t(S)||(S=h(S)),this.add(S.neg())},B.sub=B.subtract,B.multiply=function(S){if(this.isZero())return this;if(t(S)||(S=h(S)),e){var F=e.mul(this.low,this.high,S.low,S.high);return l(F,e.get_high(),this.unsigned)}if(S.isZero())return this.unsigned?$:I;if(this.eq(K))return S.isOdd()?K:I;if(S.eq(K))return this.isOdd()?K:I;if(this.isNegative())return S.isNegative()?this.neg().mul(S.neg()):this.neg().mul(S).neg();if(S.isNegative())return this.mul(S.neg()).neg();if(this.lt(x)&&S.lt(x))return u(this.toNumber()*S.toNumber(),this.unsigned);var X=this.high>>>16,te=this.high&65535,J=this.low>>>16,re=this.low&65535,pe=S.high>>>16,de=S.high&65535,Ie=S.low>>>16,ge=S.low&65535,W=0,D=0,oe=0,He=0;return He+=re*ge,oe+=He>>>16,He&=65535,oe+=J*ge,D+=oe>>>16,oe&=65535,oe+=re*Ie,D+=oe>>>16,oe&=65535,D+=te*ge,W+=D>>>16,D&=65535,D+=J*Ie,W+=D>>>16,D&=65535,D+=re*de,W+=D>>>16,D&=65535,W+=X*ge+te*Ie+J*de+re*pe,W&=65535,l(oe<<16|He,W<<16|D,this.unsigned)},B.mul=B.multiply,B.divide=function(S){if(t(S)||(S=h(S)),S.isZero())throw Error("division by zero");if(e){if(!this.unsigned&&this.high===-2147483648&&S.low===-1&&S.high===-1)return this;var F=(this.unsigned?e.div_u:e.div_s)(this.low,this.high,S.low,S.high);return l(F,e.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?$:I;var X,te,J;if(this.unsigned){if(S.unsigned||(S=S.toUnsigned()),S.gt(this))return $;if(S.gt(this.shru(1)))return E;J=$}else{if(this.eq(K)){if(S.eq(P)||S.eq(z))return K;if(S.eq(K))return P;var re=this.shr(1);return X=re.div(S).shl(1),X.eq(I)?S.isNegative()?P:z:(te=this.sub(S.mul(X)),J=X.add(te.div(S)),J)}else if(S.eq(K))return this.unsigned?$:I;if(this.isNegative())return S.isNegative()?this.neg().div(S.neg()):this.neg().div(S).neg();if(S.isNegative())return this.div(S.neg()).neg();J=I}for(te=this;te.gte(S);){X=Math.max(1,Math.floor(te.toNumber()/S.toNumber()));for(var pe=Math.ceil(Math.log(X)/Math.LN2),de=pe<=48?1:d(2,pe-48),Ie=u(X),ge=Ie.mul(S);ge.isNegative()||ge.gt(te);)X-=de,Ie=u(X,this.unsigned),ge=Ie.mul(S);Ie.isZero()&&(Ie=P),J=J.add(Ie),te=te.sub(ge)}return J},B.div=B.divide,B.modulo=function(S){if(t(S)||(S=h(S)),e){var F=(this.unsigned?e.rem_u:e.rem_s)(this.low,this.high,S.low,S.high);return l(F,e.get_high(),this.unsigned)}return this.sub(this.div(S).mul(S))},B.mod=B.modulo,B.rem=B.modulo,B.not=function(){return l(~this.low,~this.high,this.unsigned)},B.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32},B.clz=B.countLeadingZeros,B.countTrailingZeros=function(){return this.low?o(this.low):o(this.high)+32},B.ctz=B.countTrailingZeros,B.and=function(S){return t(S)||(S=h(S)),l(this.low&S.low,this.high&S.high,this.unsigned)},B.or=function(S){return t(S)||(S=h(S)),l(this.low|S.low,this.high|S.high,this.unsigned)},B.xor=function(S){return t(S)||(S=h(S)),l(this.low^S.low,this.high^S.high,this.unsigned)},B.shiftLeft=function(S){return t(S)&&(S=S.toInt()),(S&=63)===0?this:S<32?l(this.low<<S,this.high<<S|this.low>>>32-S,this.unsigned):l(0,this.low<<S-32,this.unsigned)},B.shl=B.shiftLeft,B.shiftRight=function(S){return t(S)&&(S=S.toInt()),(S&=63)===0?this:S<32?l(this.low>>>S|this.high<<32-S,this.high>>S,this.unsigned):l(this.high>>S-32,this.high>=0?0:-1,this.unsigned)},B.shr=B.shiftRight,B.shiftRightUnsigned=function(S){return t(S)&&(S=S.toInt()),(S&=63)===0?this:S<32?l(this.low>>>S|this.high<<32-S,this.high>>>S,this.unsigned):S===32?l(this.high,0,this.unsigned):l(this.high>>>S-32,0,this.unsigned)},B.shru=B.shiftRightUnsigned,B.shr_u=B.shiftRightUnsigned,B.rotateLeft=function(S){var F;return t(S)&&(S=S.toInt()),(S&=63)===0?this:S===32?l(this.high,this.low,this.unsigned):S<32?(F=32-S,l(this.low<<S|this.high>>>F,this.high<<S|this.low>>>F,this.unsigned)):(S-=32,F=32-S,l(this.high<<S|this.low>>>F,this.low<<S|this.high>>>F,this.unsigned))},B.rotl=B.rotateLeft,B.rotateRight=function(S){var F;return t(S)&&(S=S.toInt()),(S&=63)===0?this:S===32?l(this.high,this.low,this.unsigned):S<32?(F=32-S,l(this.high<<F|this.low>>>S,this.low<<F|this.high>>>S,this.unsigned)):(S-=32,F=32-S,l(this.low<<F|this.high>>>S,this.high<<F|this.low>>>S,this.unsigned))},B.rotr=B.rotateRight,B.toSigned=function(){return this.unsigned?l(this.low,this.high,!1):this},B.toUnsigned=function(){return this.unsigned?this:l(this.low,this.high,!0)},B.toBytes=function(S){return S?this.toBytesLE():this.toBytesBE()},B.toBytesLE=function(){var S=this.high,F=this.low;return[F&255,F>>>8&255,F>>>16&255,F>>>24,S&255,S>>>8&255,S>>>16&255,S>>>24]},B.toBytesBE=function(){var S=this.high,F=this.low;return[S>>>24,S>>>16&255,S>>>8&255,S&255,F>>>24,F>>>16&255,F>>>8&255,F&255]},n.fromBytes=function(S,F,X){return X?n.fromBytesLE(S,F):n.fromBytesBE(S,F)},n.fromBytesLE=function(S,F){return new n(S[0]|S[1]<<8|S[2]<<16|S[3]<<24,S[4]|S[5]<<8|S[6]<<16|S[7]<<24,F)},n.fromBytesBE=function(S,F){return new n(S[4]<<24|S[5]<<16|S[6]<<8|S[7],S[0]<<24|S[1]<<16|S[2]<<8|S[3],F)},typeof BigInt=="function"&&(n.fromBigInt=function(S,F){var X=Number(BigInt.asIntN(32,S)),te=Number(BigInt.asIntN(32,S>>BigInt(32)));return l(X,te,F)},n.fromValue=function(S,F){return typeof S=="bigint"?n.fromBigInt(S,F):h(S,F)},B.toBigInt=function(){var S=BigInt(this.low>>>0),F=BigInt(this.unsigned?this.high>>>0:this.high);return F<<BigInt(32)|S});var ae=r.default=n})});var hr=ue(hl=>{"use strict";var ce=hl;ce.asPromise=Pf();ce.base64=kf();ce.EventEmitter=Lf();ce.float=Gf();ce.inquire=Wf();ce.utf8=jf();ce.pool=Kf();ce.LongBits=Zf();function Yf(r){return r==="__proto__"||r==="prototype"||r==="constructor"}ce.isUnsafeProperty=Yf;ce.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);ce.global=ce.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||hl;ce.emptyArray=Object.freeze?Object.freeze([]):[];ce.emptyObject=Object.freeze?Object.freeze({}):{};ce.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};ce.isString=function(e){return typeof e=="string"||e instanceof String};ce.isObject=function(e){return e&&typeof e=="object"};ce.isset=ce.isSet=function(e,n){var t=e[n];return t!=null&&Object.hasOwnProperty.call(e,n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};ce.Buffer=(function(){try{var r=ce.global.Buffer;return r.prototype.utf8Write?r:null}catch{return null}})();ce._Buffer_from=null;ce._Buffer_allocUnsafe=null;ce.newBuffer=function(e){return typeof e=="number"?ce.Buffer?ce._Buffer_allocUnsafe(e):new ce.Array(e):ce.Buffer?ce._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};ce.Array=typeof Uint8Array<"u"?Uint8Array:Array;ce.Long=ce.global.dcodeIO&&ce.global.dcodeIO.Long||ce.global.Long||(function(){try{var r=Jf();return r&&r.isLong?r:null}catch{return null}})();ce.key2Re=/^true|false|0|1$/;ce.key32Re=/^-?(?:0|[1-9][0-9]*)$/;ce.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;ce.longToHash=function(e){return e?ce.LongBits.from(e).toHash():ce.LongBits.zeroHash};ce.longFromHash=function(e,n){var t=ce.LongBits.fromHash(e);return ce.Long?ce.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function Qf(r){var e=typeof arguments[arguments.length-1]=="boolean",n=e?arguments.length-1:arguments.length;e=e&&arguments[arguments.length-1];for(var t=1;t<n;++t){var o=arguments[t];if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)!Yf(i[a])&&(r[i[a]]===void 0||!e)&&(r[i[a]]=o[i[a]])}return r}ce.merge=Qf;ce.nestingLimit=32;ce.recursionLimit=100;ce.makeProp=function(e,n){Object.defineProperty(e,n,{enumerable:!0,configurable:!0,writable:!0})};ce.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function eh(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Qf(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}ce.newError=eh;ce.ProtocolError=eh("ProtocolError");ce.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};ce.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};ce.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};ce._configure=function(){var r=ce.Buffer;if(!r){ce._Buffer_from=ce._Buffer_allocUnsafe=null;return}ce._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},ce._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var wl=ue((_k,oh)=>{"use strict";oh.exports=ze;var Mt=hr(),ml,Mi=Mt.LongBits,th=Mt.base64,nh=Mt.utf8;function Do(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function bl(){}function ES(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function ze(){this.len=0,this.head=new Do(bl,0,0),this.tail=this.head,this.states=null}var rh=function(){return Mt.Buffer?function(){return(ze.create=function(){return new ml})()}:function(){return new ze}};ze.create=rh();ze.alloc=function(e){return new Mt.Array(e)};Mt.Array!==Array&&(ze.alloc=Mt.pool(ze.alloc,Mt.Array.prototype.subarray));ze.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Do(e,n,t),this.len+=n,this};function yl(r,e,n){e[n]=r&255}function CS(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function _l(r,e){this.len=r,this.next=void 0,this.val=e}_l.prototype=Object.create(Do.prototype);_l.prototype.fn=CS;ze.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new _l((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};ze.prototype.int32=function(e){return(e|=0)<0?this._push(vl,10,Mi.fromNumber(e)):this.uint32(e)};ze.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function vl(r,e,n){for(var t=r.lo,o=r.hi;o;)e[n++]=t&127|128,t=(t>>>7|o<<25)>>>0,o>>>=7;for(;t>127;)e[n++]=t&127|128,t=t>>>7;e[n++]=t}ze.prototype.uint64=function(e){var n=Mi.from(e);return this._push(vl,n.length(),n)};ze.prototype.int64=ze.prototype.uint64;ze.prototype.sint64=function(e){var n=Mi.from(e).zzEncode();return this._push(vl,n.length(),n)};ze.prototype.bool=function(e){return this._push(yl,1,e?1:0)};function gl(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}ze.prototype.fixed32=function(e){return this._push(gl,4,e>>>0)};ze.prototype.sfixed32=ze.prototype.fixed32;ze.prototype.fixed64=function(e){var n=Mi.from(e);return this._push(gl,4,n.lo)._push(gl,4,n.hi)};ze.prototype.sfixed64=ze.prototype.fixed64;ze.prototype.float=function(e){return this._push(Mt.float.writeFloatLE,4,e)};ze.prototype.double=function(e){return this._push(Mt.float.writeDoubleLE,8,e)};var DS=Mt.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};ze.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(yl,1,0);if(Mt.isString(e)){var t=ze.alloc(n=th.length(e));th.decode(e,t,0),e=t}return this.uint32(n)._push(DS,n,e)};ze.prototype.string=function(e){var n=nh.length(e);return n?this.uint32(n)._push(nh.write,n,e):this._push(yl,1,0)};ze.prototype.fork=function(){return this.states=new ES(this),this.head=this.tail=new Do(bl,0,0),this.len=0,this};ze.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Do(bl,0,0),this.len=0),this};ze.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};ze.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};ze._configure=function(r){ml=r,ze.create=rh(),ml._configure()}});var sh=ue((vk,ah)=>{"use strict";ah.exports=Ln;var ih=wl();(Ln.prototype=Object.create(ih.prototype)).constructor=Ln;var mr=hr();function Ln(){ih.call(this)}Ln._configure=function(){Ln.alloc=mr._Buffer_allocUnsafe,Ln.writeBytesBuffer=mr.Buffer&&mr.Buffer.prototype instanceof Uint8Array&&mr.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};Ln.prototype.bytes=function(e){mr.isString(e)&&(e=mr._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(Ln.writeBytesBuffer,n,e),this};function kS(r,e,n){r.length<40?mr.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}Ln.prototype.string=function(e){var n=mr.Buffer.byteLength(e);return this.uint32(n),n&&this._push(kS,n,e),this};Ln._configure()});var Il=ue((wk,ph)=>{"use strict";ph.exports=Qe;var Vt=hr(),Tl,ch=Vt.LongBits,NS=Vt.utf8;function qt(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Qe(r){this.buf=r,this.pos=0,this.len=r.length}var uh=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Qe(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Qe(e);throw Error("illegal buffer")},dh=function(){return Vt.Buffer?function(n){return(Qe.create=function(o){return Vt.Buffer.isBuffer(o)?new Tl(o):uh(o)})(n)}:uh};Qe.create=dh();Qe.prototype._slice=Vt.Array.prototype.subarray||Vt.Array.prototype.slice;Qe.prototype.uint32=(function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,qt(this,10);return e}})();Qe.prototype.int32=function(){return this.uint32()|0};Qe.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function xl(){var r=new ch(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw qt(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw qt(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Qe.prototype.bool=function(){return this.uint32()!==0};function Vi(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Qe.prototype.fixed32=function(){if(this.pos+4>this.len)throw qt(this,4);return Vi(this.buf,this.pos+=4)};Qe.prototype.sfixed32=function(){if(this.pos+4>this.len)throw qt(this,4);return Vi(this.buf,this.pos+=4)|0};function lh(){if(this.pos+8>this.len)throw qt(this,8);return new ch(Vi(this.buf,this.pos+=4),Vi(this.buf,this.pos+=4))}Qe.prototype.float=function(){if(this.pos+4>this.len)throw qt(this,4);var e=Vt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Qe.prototype.double=function(){if(this.pos+8>this.len)throw qt(this,4);var e=Vt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Qe.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw qt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=Vt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};Qe.prototype.string=function(){var e=this.bytes();return NS.read(e,0,e.length)};Qe.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw qt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw qt(this);while(this.buf[this.pos++]&128);return this};Qe.recursionLimit=Vt.recursionLimit;Qe.prototype.skipType=function(r,e){if(e===void 0&&(e=0),e>Qe.recursionLimit)throw Error("maximum nesting depth exceeded");switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r,e+1);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Qe._configure=function(r){Tl=r,Qe.create=dh(),Tl._configure();var e=Vt.Long?"toLong":"toNumber";Vt.merge(Qe.prototype,{int64:function(){return xl.call(this)[e](!1)},uint64:function(){return xl.call(this)[e](!0)},sint64:function(){return xl.call(this).zzDecode()[e](!1)},fixed64:function(){return lh.call(this)[e](!0)},sfixed64:function(){return lh.call(this)[e](!1)}})}});var gh=ue((xk,mh)=>{"use strict";mh.exports=Dr;var hh=Il();(Dr.prototype=Object.create(hh.prototype)).constructor=Dr;var fh=hr();function Dr(r){hh.call(this,r)}Dr._configure=function(){fh.Buffer&&(Dr.prototype._slice=fh.Buffer.prototype.slice)};Dr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Dr._configure()});var yh=ue((Tk,bh)=>{"use strict";bh.exports=ko;var Sl=hr();(ko.prototype=Object.create(Sl.EventEmitter.prototype)).constructor=ko;function ko(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Sl.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}ko.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return Sl.asPromise(r,a,e,n,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,n[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return a.emit("error",u,e),i(u);if(l===null){a.end(!0);return}if(!(l instanceof t))try{l=t[a.responseDelimited?"decodeDelimited":"decode"](l)}catch(d){return a.emit("error",d,e),i(d)}return a.emit("data",l,e),i(null,l)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};ko.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var vh=ue(_h=>{"use strict";var LS=_h;LS.Service=yh()});var xh=ue((Sk,wh)=>{"use strict";wh.exports=Object.create(null)});var Sh=ue(Ih=>{"use strict";var xt=Ih;xt.build="minimal";xt.Writer=wl();xt.BufferWriter=sh();xt.Reader=Il();xt.BufferReader=gh();xt.util=hr();xt.rpc=vh();xt.roots=xh();xt.configure=Th;function Th(){xt.util._configure(),xt.Writer._configure(xt.BufferWriter),xt.Reader._configure(xt.BufferReader)}Th()});var Ah=ue((Ak,$h)=>{"use strict";$h.exports=Sh()});var ro=ue((Ok,Oh)=>{"use strict";var je=Ah(),ee=je.Reader,nt=je.Writer,C=je.util,A=je.roots.default||(je.roots.default={});A.onnx=(function(){var r={};return r.Version=(function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n})(),r.AttributeProto=(function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=C.Long?C.Long.fromBits(0,0,!1):0,e.prototype.s=C.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=C.emptyArray,e.prototype.ints=C.emptyArray,e.prototype.strings=C.emptyArray,e.prototype.tensors=C.emptyArray,e.prototype.graphs=C.emptyArray,e.prototype.sparseTensors=C.emptyArray,e.prototype.typeProtos=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&A.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&A.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)A.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)A.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&A.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)A.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&A.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)A.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=A.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=A.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=A.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=A.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push(A.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push(A.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push(A.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push(A.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!C.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!C.isInteger(t.i)&&!(t.i&&C.isInteger(t.i.low)&&C.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||C.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=A.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=A.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=A.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=A.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!C.isInteger(t.ints[i])&&!(t.ints[i]&&C.isInteger(t.ints[i].low)&&C.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||C.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=A.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=A.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=A.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=A.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof A.onnx.AttributeProto)return t;var o=new A.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(C.Long?(o.i=C.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new C.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?C.base64.decode(t.s,o.s=C.newBuffer(C.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=A.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=A.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=A.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=A.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)C.Long?(o.ints[i]=C.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new C.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?C.base64.decode(t.strings[i],o.strings[i]=C.newBuffer(C.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=A.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=A.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=A.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=A.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,C.Long){var a=new C.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=C.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?C.Long.prototype.toString.call(t.i):o.longs===Number?new C.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?C.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=A.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=A.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?C.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new C.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?C.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=A.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=A.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=A.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=A.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?A.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:A.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=A.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=A.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=(function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t})(),e})(),r.ValueInfoProto=(function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=nt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&A.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=A.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=A.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.ValueInfoProto)return t;var o=new A.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=A.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=A.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e})(),r.NodeProto=(function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=C.emptyArray,e.prototype.output=C.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=C.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)A.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(A.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!C.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!C.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!C.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=A.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.NodeProto)return t;var o=new A.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=A.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=A.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e})(),r.TrainingInfoProto=(function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=C.emptyArray,e.prototype.updateBinding=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&A.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&A.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)A.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)A.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=A.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=A.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=A.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=A.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=A.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=A.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof A.onnx.TrainingInfoProto)return t;var o=new A.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=A.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=A.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=A.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=A.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=A.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=A.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=A.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=A.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e})(),r.ModelProto=(function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=C.Long?C.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=C.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=C.Long?C.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=C.emptyArray,e.prototype.trainingInfo=C.emptyArray,e.prototype.functions=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&A.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)A.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)A.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)A.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)A.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(A.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=A.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push(A.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push(A.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!C.isInteger(t.irVersion)&&!(t.irVersion&&C.isInteger(t.irVersion.low)&&C.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=A.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!C.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!C.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!C.isInteger(t.modelVersion)&&!(t.modelVersion&&C.isInteger(t.modelVersion.low)&&C.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=A.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=A.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=A.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=A.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.ModelProto)return t;var o=new A.onnx.ModelProto;if(t.irVersion!=null&&(C.Long?(o.irVersion=C.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new C.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=A.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(C.Long?(o.modelVersion=C.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new C.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=A.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=A.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=A.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=A.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(C.Long){var a=new C.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",C.Long){var a=new C.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?C.Long.prototype.toString.call(t.irVersion):o.longs===Number?new C.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?C.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new C.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=A.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=A.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=A.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=A.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=A.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e})(),r.StringStringEntryProto=(function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=nt.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!C.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!C.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.StringStringEntryProto)return t;var o=new A.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e})(),r.TensorAnnotation=(function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)A.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!C.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=A.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.TensorAnnotation)return t;var o=new A.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=A.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=A.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e})(),r.GraphProto=(function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=C.emptyArray,e.prototype.name="",e.prototype.initializer=C.emptyArray,e.prototype.sparseInitializer=C.emptyArray,e.prototype.docString="",e.prototype.input=C.emptyArray,e.prototype.output=C.emptyArray,e.prototype.valueInfo=C.emptyArray,e.prototype.quantizationAnnotation=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)A.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)A.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)A.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)A.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)A.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)A.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)A.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push(A.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push(A.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push(A.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push(A.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push(A.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push(A.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push(A.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=A.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=A.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=A.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=A.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=A.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=A.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=A.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.GraphProto)return t;var o=new A.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=A.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=A.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=A.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=A.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=A.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=A.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=A.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=A.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=A.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=A.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=A.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=A.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=A.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=A.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e})(),r.TensorProto=(function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=C.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=C.emptyArray,e.prototype.int32Data=C.emptyArray,e.prototype.stringData=C.emptyArray,e.prototype.int64Data=C.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=C.newBuffer([]),e.prototype.externalData=C.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=C.emptyArray,e.prototype.uint64Data=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&A.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)A.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=A.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push(A.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!C.isInteger(t.dims[o])&&!(t.dims[o]&&C.isInteger(t.dims[o].low)&&C.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!C.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=A.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!C.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||C.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!C.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&C.isInteger(t.int64Data[o].low)&&C.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||C.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=A.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!C.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&C.isInteger(t.uint64Data[o].low)&&C.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof A.onnx.TensorProto)return t;var o=new A.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)C.Long?(o.dims[i]=C.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new C.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=A.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?C.base64.decode(t.stringData[i],o.stringData[i]=C.newBuffer(C.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)C.Long?(o.int64Data[i]=C.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new C.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?C.base64.decode(t.rawData,o.rawData=C.newBuffer(C.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=A.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)C.Long?(o.uint64Data[i]=C.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new C.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=C.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?C.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new C.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=A.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?C.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?C.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new C.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?C.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?C.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new C.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=A.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?A.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:A.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=(function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t})(),e.Segment=(function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=C.Long?C.Long.fromBits(0,0,!1):0,n.prototype.end=C.Long?C.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=nt.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof ee||(o=ee.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new A.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},n.decodeDelimited=function(o){return o instanceof ee||(o=new ee(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!C.isInteger(o.begin)&&!(o.begin&&C.isInteger(o.begin.low)&&C.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!C.isInteger(o.end)&&!(o.end&&C.isInteger(o.end.low)&&C.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof A.onnx.TensorProto.Segment)return o;var i=new A.onnx.TensorProto.Segment;return o.begin!=null&&(C.Long?(i.begin=C.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new C.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(C.Long?(i.end=C.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new C.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(C.Long){var s=new C.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(C.Long){var s=new C.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?C.Long.prototype.toString.call(o.begin):i.longs===Number?new C.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?C.Long.prototype.toString.call(o.end):i.longs===Number?new C.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n})(),e.DataLocation=(function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t})(),e})(),r.SparseTensorProto=(function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&A.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&A.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=A.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=A.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=A.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=A.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!C.isInteger(t.dims[i])&&!(t.dims[i]&&C.isInteger(t.dims[i].low)&&C.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof A.onnx.SparseTensorProto)return t;var o=new A.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=A.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=A.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)C.Long?(o.dims[i]=C.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new C.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=A.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=A.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?C.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new C.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e})(),r.TensorShapeProto=(function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)A.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();s>>>3===1?(a.dim&&a.dim.length||(a.dim=[]),a.dim.push(A.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()))):t.skipType(s&7)}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=A.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof A.onnx.TensorShapeProto)return t;var o=new A.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=A.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=A.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=(function(){function n(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:C.oneOfGetter(t=["dimValue","dimParam"]),set:C.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,a){return a||(a=nt.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},n.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},n.decode=function(i,a){i instanceof ee||(i=ee.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TensorShapeProto.Dimension;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof ee||(i=new ee(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!C.isInteger(i.dimValue)&&!(i.dimValue&&C.isInteger(i.dimValue.low)&&C.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!C.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!C.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof A.onnx.TensorShapeProto.Dimension)return i;var a=new A.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(C.Long?(a.dimValue=C.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new C.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},n.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?C.Long.prototype.toString.call(i.dimValue):a.longs===Number?new C.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n})(),e})(),r.TypeProto=(function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:C.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:C.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=nt.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&A.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&A.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&A.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&A.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&A.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof ee||(o=ee.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new A.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=A.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=A.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=A.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=A.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=A.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof ee||(o=new ee(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=A.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=A.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!C.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof A.onnx.TypeProto)return o;var i=new A.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=A.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=A.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=A.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=A.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=A.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=A.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=A.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=A.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=A.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=A.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=nt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&A.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof ee||(i=ee.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Tensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=A.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof ee||(i=new ee(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!C.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=A.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Tensor)return i;var a=new A.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=A.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=A.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t})(),e.Sequence=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=nt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&A.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof ee||(i=ee.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Sequence;i.pos<s;){var l=i.uint32();l>>>3===1?u.elemType=A.onnx.TypeProto.decode(i,i.uint32()):i.skipType(l&7)}return u},t.decodeDelimited=function(i){return i instanceof ee||(i=new ee(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=A.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Sequence)return i;var a=new A.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=A.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=A.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t})(),e.Map=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=nt.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&A.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof ee||(i=ee.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Map;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=A.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof ee||(i=new ee(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!C.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=A.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Map)return i;var a=new A.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=A.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=A.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t})(),e.Optional=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=nt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&A.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof ee||(i=ee.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.Optional;i.pos<s;){var l=i.uint32();l>>>3===1?u.elemType=A.onnx.TypeProto.decode(i,i.uint32()):i.skipType(l&7)}return u},t.decodeDelimited=function(i){return i instanceof ee||(i=new ee(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=A.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.Optional)return i;var a=new A.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=A.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=A.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t})(),e.SparseTensor=(function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=nt.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&A.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof ee||(i=ee.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new A.onnx.TypeProto.SparseTensor;i.pos<s;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=A.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof ee||(i=new ee(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!C.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=A.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof A.onnx.TypeProto.SparseTensor)return i;var a=new A.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=A.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=A.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t})(),e})(),r.OperatorSetIdProto=(function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=C.Long?C.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=nt.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!C.isInteger(t.version)&&!(t.version&&C.isInteger(t.version.low)&&C.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof A.onnx.OperatorSetIdProto)return t;var o=new A.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(C.Long?(o.version=C.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new C.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",C.Long){var a=new C.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?C.Long.prototype.toString.call(t.version):o.longs===Number?new C.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e})(),r.OperatorStatus=(function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n})(),r.FunctionProto=(function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=C.emptyArray,e.prototype.output=C.emptyArray,e.prototype.attribute=C.emptyArray,e.prototype.attributeProto=C.emptyArray,e.prototype.node=C.emptyArray,e.prototype.docString="",e.prototype.opsetImport=C.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=nt.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)A.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)A.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)A.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof ee||(t=ee.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new A.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push(A.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push(A.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push(A.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof ee||(t=new ee(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!C.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!C.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!C.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=A.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=A.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=A.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof A.onnx.FunctionProto)return t;var o=new A.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=A.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=A.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=A.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=A.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=A.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=A.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,je.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e})(),r})();Oh.exports=A});function oo(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Lo(r){return new TextDecoder().decode(r)}var qe,kr,$l,bt,Fi,ht,Tt,le,No,Nr,Lr,Rr,Ve=L(()=>{"use strict";js();qe=xe(ro());zr();kr=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},$l=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},bt=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=$l.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],d=i-u<0?1:n[i-u];if(l!==d&&l>1&&d>1)return;s[a-u]=Math.max(l,d)}return s}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let a=r.calcShape(e.dims,n.dims);if(a){if(o&&!le.areEqual(a,e.dims))return;let s=le.size(a),u=o?e:new at(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(a.length),d=new Array(e.dims.length),f=new Array(n.dims.length),h=0,g=0,b=!1,_=!1;e.dims.length===0&&(h=e.get([]),b=!0),n.dims.length===0&&(g=n.get([]),_=!0);let T;for(let v=0;v<s;v++){T=v;for(let x=a.length-1;x>=0;x--)l[x]=T%a[x],T=Math.floor(T/a[x]);b||(r.fillIndex(l,e.dims,d),h=e.get(d)),_||(r.fillIndex(l,n.dims,f),g=n.get(f)),u.set(l,t(h,g))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(n[n.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},Fi=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!bt.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},ht=class r{static tensorDataTypeFromProto(e){switch(e){case qe.onnx.TensorProto.DataType.INT8:return"int8";case qe.onnx.TensorProto.DataType.UINT8:return"uint8";case qe.onnx.TensorProto.DataType.BOOL:return"bool";case qe.onnx.TensorProto.DataType.INT16:return"int16";case qe.onnx.TensorProto.DataType.UINT16:return"uint16";case qe.onnx.TensorProto.DataType.INT32:return"int32";case qe.onnx.TensorProto.DataType.UINT32:return"uint32";case qe.onnx.TensorProto.DataType.FLOAT:return"float32";case qe.onnx.TensorProto.DataType.DOUBLE:return"float64";case qe.onnx.TensorProto.DataType.STRING:return"string";case qe.onnx.TensorProto.DataType.INT64:return"int32";case qe.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${qe.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return qe.onnx.TensorProto.DataType.INT8;case"uint8":return qe.onnx.TensorProto.DataType.UINT8;case"bool":return qe.onnx.TensorProto.DataType.BOOL;case"int16":return qe.onnx.TensorProto.DataType.INT16;case"uint16":return qe.onnx.TensorProto.DataType.UINT16;case"int32":return qe.onnx.TensorProto.DataType.INT32;case"uint32":return qe.onnx.TensorProto.DataType.UINT32;case"float32":return qe.onnx.TensorProto.DataType.FLOAT;case"float64":return qe.onnx.TensorProto.DataType.DOUBLE;case"string":return qe.onnx.TensorProto.DataType.STRING;case"int64":return qe.onnx.TensorProto.DataType.INT64;case"uint64":return qe.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>pr.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(Tt.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},Tt=class{static longToNumber(e){return pr.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return pr.isLong(e)||typeof e=="bigint"}},le=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];a*=o[u]}}let s=r.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(n).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let a=r.normalizeAxis(n[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},No=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[n]=t[s],i.push(u)}return[i,a]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},Nr=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)r.adjustPadAndReturnShape(e[s+2],n[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,a,s,u=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return r.computeShapeHelper(e,n,l,t,o,i,a,s,u),l}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u,l=0){if(e)for(let d=0;d<n.length-2;d++)t.push(1);else for(let d=0;d<n.length-2;d++)t.push(r.adjustPadAndReturnShape(n[d+2],o[d],i[d],a[d],s,d,d+n.length-2,u,l))}static computeOutputSize(e,n,t,o,i){let a=Math.floor(e/n)+1;return i===1&&(a=Math.ceil(e/n)+1,(a-1)*n>=t+o&&(a-=1)),a}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u,l=0){let d=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,r.computeOutputSize(e-d,n,e,0,l);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=(Math.floor((e+n-1)/n)-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(h+1)/2:h/2),i[s]=h-i[a],r.computeOutputSize(e+i[a]+i[s]-d,n,e,i[a],l)}default:throw new Error("Unsupported AutoPad type")}else return r.computeOutputSize(e+i[a]+i[s]-d,n,e,i[a],l)}},Lr=-34028234663852886e22,Rr=34028234663852886e22});function RS(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function Ph(r){switch(r){case Oe.onnx.TensorProto.DataType.UINT8:case Oe.onnx.TensorProto.DataType.INT8:case Oe.onnx.TensorProto.DataType.BOOL:return 1;case Oe.onnx.TensorProto.DataType.UINT16:case Oe.onnx.TensorProto.DataType.INT16:return 2;case Oe.onnx.TensorProto.DataType.FLOAT:case Oe.onnx.TensorProto.DataType.INT32:case Oe.onnx.TensorProto.DataType.UINT32:return 4;case Oe.onnx.TensorProto.DataType.INT64:case Oe.onnx.TensorProto.DataType.DOUBLE:case Oe.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${Oe.onnx.TensorProto.DataType[r]}`)}}function zS(r,e){return new(Dh(e))(r)}function Dh(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Al(r,e){if(e===Oe.onnx.TensorProto.DataType.INT64||e===Oo.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===Oe.onnx.TensorProto.DataType.UINT32||e===Oo.TensorDataType.UINT32||e===Oe.onnx.TensorProto.DataType.UINT64||e===Oo.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${Oe.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function Eh(r,e,n){switch(e){case Oe.onnx.TensorProto.DataType.BOOL:case Oe.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case Oe.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case Oe.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case Oe.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case Oe.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case Oe.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case Oe.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case Oe.onnx.TensorProto.DataType.INT64:return Al(pr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case Oe.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case Oe.onnx.TensorProto.DataType.UINT64:return Al(pr.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${Oe.onnx.TensorProto.DataType[e]}`)}}var Ch,Oe,at,zr=L(()=>{"use strict";Ch=xe(Wp());js();Po();Oe=xe(ro());Ve();at=class r{constructor(e,n,t,o,i,a=Ch.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=le.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let l=Dh(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(s*RS(n));this.cache=zS(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[le.indicesToOffset(e,this.strides)]}set(e,n){this.data[le.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=le.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ht.tensorDataTypeFromProto(e.dataType),t=ht.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,a)=>{o.data[a]=Lo(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=Ph(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let d=Eh(a,e.dataType,l*s);i[l]=d}}else{let i;switch(e.dataType){case Oe.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case Oe.onnx.TensorProto.DataType.INT32:case Oe.onnx.TensorProto.DataType.INT16:case Oe.onnx.TensorProto.DataType.UINT16:case Oe.onnx.TensorProto.DataType.INT8:case Oe.onnx.TensorProto.DataType.UINT8:case Oe.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case Oe.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case Oe.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case Oe.onnx.TensorProto.DataType.UINT32:case Oe.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];pr.isLong(u)?a[s]=Al(u,e.dataType):a[s]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=ht.tensorDimsFromORTFormat(e),t=ht.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=Ph(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let d=Eh(a,e.dataType(),l*s);i[l]=d}}return o}}});function he(r){return r===1?BS:MS}function kh(r){let e=he(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Nh(r){let e=he(r);return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFrag} vec2 TexCoords;
    ${e.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function Lh(r,e){let n=he(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var BS,MS,Ye=L(()=>{"use strict";BS={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},MS={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Ee=L(()=>{"use strict"});async function Ol(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,a=()=>{if(r()){t();return}i++;let s=e(i);if(n!=null&&i>=n){o();return}setTimeout(a,s)};a()})}function Gi(r){return oo(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function Rh(r){return oo(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function io(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function ao(r,e){return e.map(n=>r[n]).join(", ")}function yt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function Kt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var Rn=L(()=>{"use strict";Ve()});function VS(r,e){return Kt(e).map(n=>`${r}.${n}`)}function so(r,e){return e===1?[r]:VS(r,e)}function zn(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var Br=L(()=>{"use strict";Rn()});function GS(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function US(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(n>2)for(let u=0;u<n-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function WS(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var zh,FS,Bh,Mh=L(()=>{"use strict";Ye();Ee();Rn();Br();zh={name:"pack",inputNames:["A"],inputTypes:[1]},FS=(r,e)=>{let n=he(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=yt(i),s=so("rc",i),u=WS(i,s,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let d=GS(i,l,s),f=US(t,s),h=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${d}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${f});
          }
        }
      `;return{...zh,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:h}},Bh=(r,e)=>({...zh,get:()=>FS(r,e)})});function Pl(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function Fh(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function qS(r){let e=le.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${n[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${n[a+1]} = ${t} - ${n[a]} * ${i}`:`index -= ${n[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function KS(r){let e=le.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var HS,jS,Vh,Gh=L(()=>{"use strict";Ve();Ye();Ee();Br();HS=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),jS=(r,e,n,t)=>{let o=e.dims,i=t,a="";for(let l=0;l<4;l++){let d="";switch(l){case 0:d="outputCoords = rc;";break;case 1:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:d="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:d="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${d}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let s=he(r.session.backend.glContext.version),u=`
      ${qS(o)}
      ${KS(i)}
      ${zn()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},Vh=(r,e,n)=>{let t=HS(n);return{...t,get:()=>jS(r,e,t,n)}}});var El,Uh=L(()=>{"use strict";Ye();Ee();El=(r,e)=>{let n=e.shape,t=he(r.session.backend.glContext.version),o=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${t.texture2D}(X,TexCoords).r;
      ${t.output} = encodeAsUint8(value);
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function ZS(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var Wh,XS,Hh,jh=L(()=>{"use strict";Ye();Ee();Rn();Br();Wh={name:"unpack",inputNames:["A"],inputTypes:[2]},XS=(r,e)=>{let n=e.dims.length,t=so("rc",n),o=t.slice(-2),i=yt(n),a=zn(),u=e.dims.length===0?"":ZS(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,d=he(r.session.backend.glContext.version),f=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${d.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Wh,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:f}},Hh=(r,e)=>({...Wh,get:()=>XS(r,e)})});var Ui,Ro,Wi,zo=L(()=>{"use strict";kt();Ui=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(Ge.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(Ge.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Ro=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(Ge.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Wi=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Bo,qh,Cl,Kh=L(()=>{"use strict";Ve();Ee();Bo=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,a=n===4?e.length-1:void 0,s=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Cl(r,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},qh=(r,e,n)=>{let t=Bo(r,e,n);return[t.width,t.height]},Cl=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:n,isPacked:i,shape:l,strides:le.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var YS,Hi,Zh=L(()=>{"use strict";kt();zr();Ve();Mh();Gh();Uh();jh();zo();Kh();Ee();YS=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},Hi=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return qh(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=YS(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Bo(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=Bo(this.session.layoutStrategy,e.dims,n);if(n===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],l=Bo(this.session.layoutStrategy,u,n),d=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let f=s[0],h=s[1]*s[2]*s[3],g=Math.ceil(h*1/4)*4,b=f*g;d=new Float32Array(b);for(let _=0;_<f;++_){let T=_*h,v=_*g+_%1*h;d.set(e.numberData.subarray(T,T+h),v)}}return this.createTextureData(l,e.type,d,e,1)}}if(n===2){let i=Cl(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){Ge.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,a,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:le.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(Fh(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:le.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=Pl(e.dims),i=Pl(n),a=this.reshapePacked(e,o),s=this.run(Vh(this,a,i),[a]);return this.reshapePacked(s,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let a={...e,tensor:o||new at(e.unpackedShape,n,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(El(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(El(this,e))}pack(e){return this.executeProgram(Bh(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Hh(this,e.tensor),[e.tensor])}}});var Dl,$e,dt=L(()=>{"use strict";Dl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},$e=r=>new Dl(r)});var Jh,Yh,Qh,QS,e$,em=L(()=>{"use strict";dt();Ye();Ee();Jh={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Yh=(r,e,n)=>(e$(e),[r.run({...Jh,cacheHint:n.cacheKey,get:()=>QS(r,e,n)},e)]),Qh=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return $e({epsilon:e,momentum:n,spatial:t})},QS=(r,e,n)=>{let t=he(r.session.backend.glContext.version),o=e[0].dims.length,[i,a]=r.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...Jh,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},e$=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var ji,Ft,ne,Mo,qi,Qn=L(()=>{"use strict";ji=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Ft=class{constructor(e){this.context=e}},ne=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Mo=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},qi=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function n$(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function r$(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function o$(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function i$(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function a$(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function s$(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function u$(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function l$(){let r="and_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:r,type:0}}function c$(){return{body:`
  float or_(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 or_(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:"or_",type:0}}function d$(){let r="xor_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:r,type:0}}function p$(){return h$("pow")}function f$(){let r="prelu_";return{body:`
  float ${r}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:r,type:0}}function h$(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var Gt,m$,tm,nm,rm,om,im,am,sm,um,lm,cm,dm,pm,fm=L(()=>{"use strict";Ve();Qn();Ye();Ee();Gt=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>m$(r,e,n,t)}},m$=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!le.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=r.session.pack;if(i){let d=bt.calcShape(e[0].dims,e[1].dims,!1);if(!d)throw new Error("Can't perform binary op on the given tensors");a=d;let f=a.length,h=e[0].dims.length!==0?e[0].dims.length:1,g=e[1].dims.length!==0?e[1].dims.length:1,b=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",_=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",T=he(r.session.backend.glContext.version),v=s?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${T.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${f}]) {
        int aindices[${h}];
        int bindices[${g}];
        ${b}
        ${_}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:v,hasMain:s}}let u=he(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},tm=(r,e)=>[r.run(Gt(r,e,n$()),e)],nm=(r,e)=>[r.run(Gt(r,e,l$(),"bool"),e)],rm=(r,e)=>[r.run(Gt(r,e,r$()),e)],om=(r,e)=>[r.run(Gt(r,e,a$(),"bool"),e)],im=(r,e)=>[r.run(Gt(r,e,s$(),"bool"),e)],am=(r,e)=>[r.run(Gt(r,e,u$(),"bool"),e)],sm=(r,e)=>[r.run(Gt(r,e,o$()),e)],um=(r,e)=>[r.run(Gt(r,e,c$(),"bool"),e)],lm=(r,e)=>[r.run(Gt(r,e,p$()),e)],cm=(r,e)=>[r.run(Gt(r,e,f$()),e)],dm=(r,e)=>[r.run(Gt(r,e,i$()),e)],pm=(r,e)=>[r.run(Gt(r,e,d$(),"bool"),e)]});var hm,mm,b$,gm=L(()=>{"use strict";Ve();hm=(r,e,n)=>(b$(e),[r.cast(e[0],n)]),mm=r=>ht.tensorDataTypeFromProto(r.attributes.getInt("to")),b$=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var y$,_$,bm,Ki,ym=L(()=>{"use strict";Ye();Ee();Rn();Br();y$=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),_$=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<n.length;P++){let E=n[P].dims.slice();for(let z=0;z<o.length;z++)if(z===t)i[t]+=E[z];else if(o[z]!==E[z])throw new Error("non concat dimensions must match")}let a=i.length,s=so("coords",a),u=yt(a),l=zn(),d=n.map(P=>P.dims),f=Kt(a),h=new Array(d.length-1);h[0]=d[0][t];for(let P=1;P<h.length;P++)h[P]=h[P-1]+d[P][t];let g=f[t],b=f.slice(-2),_=f.join(),T=`if (${g} < ${h[0]}) {
        return getChannel(
            getX0(${_}), vec2(${b.join()}));
        }`;for(let P=1;P<h.length;P++){let E=h[P-1];T+=`
            if (${g} < ${h[P]}  && ${g} >= ${h[P-1]}) {
              return getChannel(
                getX${P}(${Ki(f,g,E)}),
                vec2(${Ki(b,g,E)}));
            }`}let v=h.length,x=h[h.length-1];T+=`
            return getChannel(
              getX${v}(${Ki(f,g,x)}),
              vec2(${Ki(b,g,x)}));`;let I=he(r.session.backend.glContext.version),$=`
          ${l}
          float getValue(${f.map(P=>"int "+P)}) {
            ${T}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${f[a-1]};
            coords.${f[a-1]} = coords.${f[a-2]};
            coords.${f[a-2]} = lastDim;

            vec4 result = vec4(getValue(${s}), 0., 0., 0.);

            ${s[a-1]} = ${s[a-1]} + 1;
            if (${s[a-1]} < ${i[a-1]}) {
              result.g = getValue(${s});
            }

            ${s[a-2]} = ${s[a-2]} + 1;
            if (${s[a-2]} < ${i[a-2]}) {
              result.a = getValue(${s});
            }

            ${s[a-1]} = ${s[a-1]} - 1;
            if (${s[a-2]} < ${i[a-2]} &&
                ${s[a-1]} < ${i[a-1]}) {
              result.b = getValue(${s});
            }
            ${I.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:$,hasMain:!0}},bm=(r,e,n)=>{let t=y$(e.length,n.cacheKey);return{...t,get:()=>_$(r,t,e,n.axis)}},Ki=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,a)=>a===t?`${i} - ${n}`:i).join()}});var _m,v$,w$,x$,vm,T$,I$,S$,wm,$$,xm=L(()=>{"use strict";dt();Ee();ym();_m=(r,e,n)=>($$(e),r.session.pack&&e[0].dims.length>1?[r.run(bm(r,e,n),e)]:[r.run(x$(r,e,n),e)]),v$=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),w$=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let g=1;g<n.length;g++){let b=n[g].dims.slice();for(let _=0;_<o.length;_++)if(_===t)i[t]+=b[_];else if(o[_]!==b[_])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(n.length),u=0;for(let g=0;g<s.length;++g)u+=n[g].dims[t],s[g]=u;let l="";n.length<5?l=vm(s):l=T$(s);let d=I$(n.length,a),f=S$(s),h=`
        ${d}
        ${f}
        ${l}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:h}},x$=(r,e,n)=>{let t=v$(e.length,n.cacheKey);return{...t,get:()=>w$(r,t,e,n.axis)}},vm=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,T$=r=>vm(r),I$=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},S$=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},wm=r=>$e({axis:r.attributes.getInt("axis")}),$$=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function A$(){return Ut("abs")}function O$(){return Ut("acos")}function P$(){return Ut("asin")}function E$(){return Ut("atan")}function C$(){return Ut("ceil")}function D$(){return Ut("cos")}function k$(r){return{body:`
  const float alpha = float(${r});

  float elu_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 elu_(vec4 v) {
    return vec4(elu_(v.x), elu_(v.y), elu_(v.z), elu_(v.w));
  }
  `,name:"elu",type:0}}function N$(){return Ut("exp")}function L$(){return Ut("floor")}function kl(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function R$(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function z$(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function B$(){return Ut("log")}function M$(){return{body:`
  float neg_(float a) {
    return -a;
  }
  vec4 neg_(vec4 v) {
    return -v;
  }
  `,name:"neg",type:0}}function V$(){return{body:`
  float not_(float a) {
    return float( ! bool(a) );
  }
  bool not_(bool a) {
    return !a;
  }
  vec4 not_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 not_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:"not",type:0}}function F$(){return Ut("sin")}function Nl(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function Ll(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function G$(){return Ut("sqrt")}function U$(){return Ut("tan")}function W$(){let r="tanh";return{body:`
  float ${r}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${r}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:r,type:0}}function Ut(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var H$,rt,Tm,Im,Sm,$m,Rl,Am,Om,j$,Pm,Em,Cm,Dm,km,Nm,zl,Lm,Rm,zm,Bm,Mm,Vm,Fm,Gm,Um,Wm,Hm,Bl=L(()=>{"use strict";dt();Ve();Qn();Ye();Ee();H$=(r,e,n,t)=>{let o=r.session.pack?2:0,i=he(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},rt=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>H$(r,i,e,n)}},Tm=(r,e)=>[r.run(rt(r,e[0],A$()),e)],Im=(r,e)=>[r.run(rt(r,e[0],O$()),e)],Sm=(r,e)=>[r.run(rt(r,e[0],P$()),e)],$m=(r,e)=>[r.run(rt(r,e[0],E$()),e)],Rl=(r,e,n)=>[r.run(rt(r,e[0],kl(n.min,n.max),n.cacheKey),e)],Am=r=>$e({min:r.attributes.getFloat("min",Lr),max:r.attributes.getFloat("max",Rr)}),Om=(r,e)=>{let n=j$(r,e);return Rl(r,[e[0]],n)},j$=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:Lr,t=e.length>=3?e[2].numberData[0]:Rr;return $e({min:n,max:t})},Pm=(r,e)=>[r.run(rt(r,e[0],C$()),e)],Em=(r,e)=>[r.run(rt(r,e[0],D$()),e)],Cm=(r,e,n)=>[r.run(rt(r,e[0],k$(n.alpha),n.cacheKey),e)],Dm=r=>$e({alpha:r.attributes.getFloat("alpha",1)}),km=(r,e)=>[r.run(rt(r,e[0],N$()),e)],Nm=(r,e)=>[r.run(rt(r,e[0],L$()),e)],zl=(r,e)=>[r.run(rt(r,e[0],R$()),e)],Lm=(r,e,n)=>[r.run(rt(r,e[0],z$(n.alpha),n.cacheKey),e)],Rm=r=>$e({alpha:r.attributes.getFloat("alpha",.01)}),zm=(r,e)=>[r.run(rt(r,e[0],B$()),e)],Bm=(r,e)=>[r.run(rt(r,e[0],M$()),e)],Mm=(r,e)=>[r.run(rt(r,e[0],V$()),e)],Vm=(r,e)=>[r.run(rt(r,e[0],Nl()),e)],Fm=(r,e)=>[r.run(rt(r,e[0],Ll()),e)],Gm=(r,e)=>[r.run(rt(r,e[0],F$()),e)],Um=(r,e)=>[r.run(rt(r,e[0],G$()),e)],Wm=(r,e)=>[r.run(rt(r,e[0],U$()),e)],Hm=(r,e)=>[r.run(rt(r,e[0],W$()),e)]});function Bn(r){let e;switch(r.activation){case"Relu":e=Nl();break;case"Sigmoid":e=Ll();break;case"Clip":e=kl(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var uo,Mr=L(()=>{"use strict";Ve();Bl();uo=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[Lr,Rr]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var K$,X$,jm,qm=L(()=>{"use strict";kt();Ye();Ee();Xi();Mr();K$=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),X$=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;Ge.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=lo(a,s,t.dilations,t.pads,t.strides),d=he(r.session.backend.glContext.version),{activationFunction:f,applyActivation:h}=Bn(t),g=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${f}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${s[1]}; wInChannel++) {
      int input_channel = group_id * ${s[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${s[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${a[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${s[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${a[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${h}
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},jm=(r,e,n)=>{let t=K$(e.length>2,n.cacheKey);return{...t,get:()=>X$(r,e,t,n)}}});var Z$,J$,Km,Xm=L(()=>{"use strict";Ye();Ee();Br();Z$=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),J$=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=2,l=3,d=o.length,f=[s[1]*s[2]*s[3],o[2]*o[3]],h=s[2]*s[3],g=zn(),b=he(r.session.backend.glContext.version),_="";for(let v=0;v<=1;v++)for(let x=0;x<=1;x++)_+=`
            blockIndex = rc.x + ${x};
            pos = rc.y + ${v};

            if(blockIndex < ${f[1]} && pos < ${f[0]}) {
              offsetY = int(blockIndex / (${o[d-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${h}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[d-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${h}), ${s[2]});

                if(d1 < ${a[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${h}.);
                    innerDims = vec2(d0, d1);
                    result[${v*2+x}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let T=`
      ${g}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${_}
          ${b.output} = result;
      }
            `;return{...e,output:{dims:f,type:n.type,textureType:2},shaderSource:T,hasMain:!0}},Km=(r,e,n,t,o)=>{let i=Z$(o.cacheKey);return{...i,get:()=>J$(r,i,e,n,t,o)}}});function Q$(r,e,n){let t=e[0].dims,o=e[1].dims,i=bt.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=yt(i.length),s=Kt(),{activationFunction:u,applyActivation:l}=Bn(n),d=e.length>2,f=d?"value += getBiasForMatmul();":"",h=d?`${Vl(a,s,e[2].dims,i,!1)}`:"",g=i.length,b=t.length,_=o.length,T=t[t.length-1],v=`
    ${u}
    ${h}
    float process(int indices[${g}]) {
        int a[${b}];
        int b[${_}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${T}; ++k) {
            a[${b-1}] = k;
            b[${_-2}] = k;
            value += _A(a) * _B(b);
        }
        ${f}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:v}}function Ml(r,e){let n=Y$(r.length>2,e.activationCacheKey);return{...n,get:()=>Q$(n,r,e)}}function Vl(r,e,n,t,o){let i="",a=n.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=n.map((_,T)=>`coords.${e[T+u]}`).join(", ");let d=bt.getBroadcastDims(n,t).map(_=>`coords.${e[_+u]} = 0;`).join(`
`),h=le.size(n)===1,g="vec4(outputValue.xx, outputValue.yy)";return h&&(g="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${d}
  vec4 outputValue = getBias(${i});
  return ${g};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${d}
  return getBias(coords.x);
}`}var Zm,Jm,Y$,eA,Zi=L(()=>{"use strict";Ve();Ee();Rn();Mr();Fl();Zm=(r,e,n)=>(eA(e),r.session.pack?[r.run(Ji(r,e,n),e)]:[r.run(Ml(e,n),e)]),Jm=r=>uo(r.attributes),Y$=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});eA=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function rA(r,e,n,t){let o=[],i=[],a=n[0].dims,s=n[1].dims,u=a.length,l=s.length,d=t.length,f=d-u,h=d-l;o=a.map((I,$)=>`coords.${e[$+f]}`),o[u-1]="i*2",o.join(", "),i=s.map((I,$)=>`coords.${e[$+h]}`),i[l-2]="i*2",i.join(", ");let g=bt.getBroadcastDims(a,t),b=bt.getBroadcastDims(s,t),_=g.map(I=>`coords.${e[I+f]} = 0;`).join(`
`),T=b.map(I=>`coords.${e[I+h]} = 0;`).join(`
`),v=`int lastDim = coords.${e[d-1]};
  coords.${e[d-1]} = coords.${e[d-2]};
  coords.${e[d-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${v}
  ${_}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${v}
  ${T}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function oA(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function iA(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var tA,nA,Ji,Fl=L(()=>{"use strict";Ve();Ye();Ee();Rn();Mr();Zi();tA=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),nA=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",a=n[0].dims,s=n[1].dims,u=bt.calcShape(a,s,!0),l=!le.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let d=a[a.length-1],f=Math.ceil(d/2),h=a.length,g=s.length,b=he(r.session.backend.glContext.version),_=yt(u.length),T=u.length,v=Kt(),{activationFunction:x,applyActivation:I}=Bn(t),$=o?`${Vl(_,v,n[2].dims,u,!0)}`:"",P=l?`${rA(_,v,n,u)}`:"",E=l?"getAAtOutCoordsMatmul(i)":`getA(${oA(v,h)})`,z=l?"getBAtOutCoordsMatmul(i)":`getB(${iA(v,g)})`,M=l?"":`${_} rc =
          getOutputCoords(); int lastDim = rc.${v[T-1]}; rc.${v[T-1]} =
          rc.${v[T-2]}; rc.${v[T-2]} = lastDim;
      `,H=`
            ${P}
            ${$}
            ${x}
            void main() {
              ${M}

              vec4 value = vec4(0);
              for (int i = 0; i < ${f}; i++) {
                vec4 a = ${E};
                vec4 b = ${z};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${b.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:H,hasMain:!0}},Ji=(r,e,n)=>{let t=tA(e.length>2,n.activationCacheKey);return{...t,get:()=>nA(r,t,e,n)}}});var Ym,Qm=L(()=>{"use strict";Xi();Xm();Fl();Ym=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=lo(t,o,n.dilations,n.pads,n.strides),a=r.run(Km(r,e[0],e[1],i,n),[e[0]]),s=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],l=r.run(Ji(r,u,n),u);return r.reshapePacked(l,i)}});var aA,sA,eg,Gl,Ul=L(()=>{"use strict";Ee();aA=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),sA=(r,e,n,t,o,i)=>{let a=n.dims,s=t.dims,u=o.length,l=Gl(a,s,o,4),d=`
        const int XC = ${a[1]};
        const int XH = ${a[2]};
        const int XW = ${a[3]};
        const int KH = ${i.kernelShape[0]};
        const int KW = ${i.kernelShape[1]};
        const int dilationH = ${i.dilations[0]};
        const int dilationW = ${i.dilations[1]};
        const int strideH = ${i.strides[0]};
        const int strideW = ${i.strides[1]};
        const int padH = ${i.pads[0]};
        const int padW = ${i.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${a.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:d}},eg=(r,e,n,t,o)=>{let i=aA(o.cacheKey);return{...i,get:()=>sA(r,i,e,n,t,o)}},Gl=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var uA,lA,tg,ng=L(()=>{"use strict";Ve();Ye();Ee();Mr();Ul();uA=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),lA=(r,e,n,t,o)=>{let i=n[0].dims,a=n[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Gl(i,a,t),[l,d]=r.calculateTextureWidthAndHeight(s,4),f=le.computeStrides(u),[h,g]=r.calculateTextureWidthAndHeight(u,4),b=t.length,_=n.length<3?"0.0":"_B(b)",T=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:v,applyActivation:x}=Bn(o),I=he(r.session.backend.glContext.version),$=`
${v}
float process(int indices[${b}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${f[0]} + im2col[1] * ${f[1]} + im2col[2] * ${f[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${_};
  for (int i = 0; i < ${T}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${h}, ${g});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${d});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${x}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:$}},tg=(r,e,n,t)=>{let o=uA(e.length>2,t);return{...o,get:()=>lA(r,o,e,n,t)}}});var lo,Wl,cA,dA,pA,fA,Hl,hA,Xi=L(()=>{"use strict";dt();Ve();qm();Qm();ng();Mr();Ul();Zi();lo=(r,e,n,t,o)=>{let i=r[0],a=r.slice(2),s=a.length,u=e[0],d=e.slice(2).map((b,_)=>b+(b-1)*(n[_]-1)),h=a.map((b,_)=>b+t[_]+t[_+s]).map((b,_)=>Math.floor((b-d[_]+o[_])/o[_]));return[i,u].concat(...h)},Wl=(r,e,n)=>(hA(e,n),cA(r,e,n)),cA=(r,e,n)=>{let t=fA(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(jm(r,e,t),e)]:i&&o?[dA(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Ym(r,e,t)]:[pA(r,e,t)]},dA=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=lo(t,o,n.dilations,n.pads,n.strides),a=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],l=r.run(Ml(u,n),u);return r.reshapeUnpacked(l,i)},pA=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=lo(t,o,n.dilations,n.pads,n.strides),a=r.run(eg(r,e[0],e[1],i,n),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return r.run(tg(r,e,i,n),s)},fA=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();Nr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},Hl=r=>{let e=r.attributes,n=uo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return $e({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...n})},hA=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var mA,gA,bA,rg,yA,_A,vA,wA,xA,TA,og,IA,ig=L(()=>{"use strict";dt();Ye();Ee();Mr();mA=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,gA=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},bA=(r,e,n,t,o,i,a,s)=>{let u=r.length-2,l=s.length===0;for(let d=0;d<u;++d){let f=l?r[d+2]*i[d]:s[d],h=mA(r[d+2],i[d],o[d],e[d],n[d],f);gA(h,t,o,d,d+u),l&&s.push(i[d]*(r[d+2]-1)+a[d]+(e[d]-1)*n[d]+1-o[d]-o[d+u])}},rg=(r,e,n)=>(IA(e,n),yA(r,e,n)),yA=(r,e,n)=>{let t=TA(n,e);return[xA(r,e,t)]},_A=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),vA=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],l=s[0]/t.group,d=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],f=he(r.session.backend.glContext.version),{activationFunction:h,applyActivation:g}=Bn(t),b=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${h}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${s[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${s[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${a[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${a[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${g}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:d,type:e[0].type,textureType:0},shaderSource:b,hasMain:!0}},wA=(r,e,n)=>{let t=_A(e.length>2,n.cacheKey);return{...t,get:()=>vA(r,e,t,n)}},xA=(r,e,n)=>r.run(wA(r,e,n),e),TA=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)n.push(e[1].dims[s]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;bA(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let a=Object.assign({},r);return Object.assign(a,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),a},og=r=>{let e=r.attributes,n=uo(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),d=e.getInts("strides",[1,1]);return $e({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:l,strides:d,...n})},IA=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var ag,Vr,sg,SA,ug,$A,AA,OA,Yi=L(()=>{"use strict";dt();Ve();Ee();ag={name:"Transpose",inputNames:["A"],inputTypes:[0]},Vr=(r,e,n)=>(OA(e),[r.run({...ag,cacheHint:n.cacheKey,get:()=>SA(r,e[0],n.perm)},e)]),sg=r=>$e({perm:r.attributes.getInts("perm",[])}),SA=(r,e,n)=>{let t=e.dims;n=ug(t,n);let o=$A(t,n),i=t.length,a=`
      ${AA("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...ag,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},ug=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),$A=(r,e)=>(e=ug(r,e),le.sortBasedOnPerm(r,e)),AA=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},OA=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var lg,cg,PA,dg=L(()=>{"use strict";Yi();lg=(r,e,n)=>{PA(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=r.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[l]=Vr(r,[s],u),d=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,d)]},cg=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},PA=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var pg,fg,EA,hg=L(()=>{"use strict";Ve();pg=(r,e,n)=>{EA(e,n);let t=le.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},fg=r=>r.attributes.getInt("axis",1),EA=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var gr,Vo=L(()=>{"use strict";gr=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var mg,gg,CA,DA,kA,NA,bg=L(()=>{"use strict";dt();Vo();Ve();Ee();mg=(r,e,n)=>(NA(e,n.axis),[r.run(kA(r,e,n),e)]),gg=r=>$e({axis:r.attributes.getInt("axis",0)}),CA={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},DA=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),a=new Array(o.length+i.length-1);t=le.normalizeAxis(t,o.length);let s=[];for(let h=0;h<a.length;h++)h<t?(a[h]=o[h],s.push(`inputIdx[${h}] = outputIdx[${h}];`)):h<t+i.length?(a[h]=i[h-t],s.push(`indexDataIdx[${h-t}] = outputIdx[${h}];`)):(a[h]=o[h-i.length+1],s.push(`inputIdx[${h-i.length+1}] = outputIdx[${h}];`));let u=a.length||1,l=o.length,d=i.length||1,f=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${d}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:n[0].type,textureType:0},shaderSource:f}},kA=(r,e,n)=>{let t={...CA,cacheHint:n.cacheKey};return{...t,get:()=>DA(r,t,e,n.axis)}},NA=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var jl,yg,_g,vg,LA,RA,zA,wg=L(()=>{"use strict";dt();Ve();Ee();jl=(r,e,n)=>(zA(e,n),[r.run(LA(e,n),e)]),yg=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return $e({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},_g=r=>yg(r,!1),vg=r=>yg(r,!0),LA=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>RA(n,r,e)}},RA=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=Fi.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let d=s.length,f=e.length===3?`int c[${e[2].dims.length}];`:"",h=e.length===3?"bcastIndices_C(indices, c);":"",g=e.length===3?"value += beta * _C(c);":"",b=`
      float process(int indices[${d}]) {
          int a[${d}];
          int b[${d}];
          ${f}

          copyVec(indices, a);
          copyVec(indices, b);
          ${h}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${d-1}] = k;
              b[${d-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${g}
          return value;
      }`;return{...r,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:b}},zA=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var xg,Tg,BA,MA,VA,FA,GA,Ig=L(()=>{"use strict";dt();Ee();xg=(r,e,n)=>(GA(e),[r.run(VA(r,e,n),e)]),Tg=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return $e({scale:e,bias:n})},BA={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},MA=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,s=`
      ${FA(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},VA=(r,e,n)=>{let t={...BA,cacheHint:n.cacheKey};return{...t,get:()=>MA(r,t,e,n)}},FA=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},GA=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var $g,Ag,Sg,UA,WA,HA,jA,qA,KA,Og=L(()=>{"use strict";Ye();Ee();$g=(r,e,n)=>{KA(e);let t=r.run(WA(e[0]),e);return[r.run(qA(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},Ag=r=>r.attributes.getFloat("epsilon",1e-5),Sg={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},UA=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],a=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},WA=r=>({...Sg,get:()=>UA(Sg,r)}),HA={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},jA=(r,e,n,t,o)=>{let i=he(r.session.backend.glContext.version),[a,s]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[a/4,s],d=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${i.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:d}},qA=(r,e,n,t)=>{let o={...HA,cacheHint:`${n}`};return{...o,get:()=>jA(r,o,e,n,t)}},KA=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function XA(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,l=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`;return{...Cg,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function ZA(r,e){return{...Cg,cacheHint:e.cacheKey,get:()=>XA(r,e)}}var Pg,Eg,Cg,JA,Dg=L(()=>{"use strict";dt();Ee();Pg=(r,e,n)=>(JA(e),[r.run(ZA(e,n),e)]),Eg=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return $e({alpha:e,beta:n,bias:t,size:o})},Cg={name:"LRN",inputNames:["X"],inputTypes:[0]};JA=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var YA,ql,kg,Ng,Lg,QA,eO,tO,nO,rO,oO,iO,aO,Rg=L(()=>{"use strict";dt();Ve();Ye();Ee();YA={name:"Pad",inputNames:["A"],inputTypes:[0]},ql=(r,e,n)=>(tO(e),[r.run({...YA,cacheHint:n.cacheKey,get:()=>eO(r,e[0],n)},e)]),kg=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return $e({mode:e,value:n,pads:t})},Ng=(r,e,n)=>{nO(e);let t=QA(r,e,n);return ql(r,[e[0]],t)},Lg=r=>r.attributes.getString("mode","constant"),QA=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return $e({mode:n,pads:t,value:o})},eO=(r,e,n)=>{let t=le.padShape(e.dims.slice(),n.pads),o=t.length,a=`
      ${rO(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},tO=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},nO=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},rO=(r,e,n)=>{let t=he(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),a=le.computeStrides(e.dims);switch(n.mode){case"constant":return oO(t,e.dims,a,o,i,n.pads,n.value);case"reflect":return iO(t,e.dims,a,o,i,n.pads);case"edge":return aO(t,e.dims,a,o,i,n.pads);default:throw new Error("Invalid mode")}},oO=(r,e,n,t,o,i,a)=>{let s=e.length,u="";for(let l=s-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${n[l]};
        `;return`
      float padA(int m[${s}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},iO=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[u]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},aO=(r,e,n,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${n[u]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `}});var Bg,Mg,Vg,Fg,Gg,Ug,Wg,Hg,jg,sO,zg,qg,ea,Kg,Qi,uO,Xg=L(()=>{"use strict";dt();Ve();Ee();Bg=(r,e,n)=>{ea(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Vg(e,t,!1,n)},e)]},Mg=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),a=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return $e({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:a})},Vg=(r,e,n,t)=>{let[o,i]=jg(r,t,n),a=le.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let d=`
        ${Kg(r[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:d}},Fg=(r,e,n)=>{ea(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>Vg(e,t,!0,n)},e)]},Gg=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return $e({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Ug=(r,e,n)=>{ea(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>Hg(e,t,!1,n)},e)]},Wg=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),a=r.attributes.getInt("storage_order",0),s=r.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return $e({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},Hg=(r,e,n,t)=>{let[o,i]=jg(r,t,n),l=`
      ${Kg(r[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},jg=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();Nr.adjustPoolAttributes(n,t,i,a,s,u);let l=Nr.computePoolOutputShape(n,t,a,s,i,u,e.autoPad),d=Object.assign({},e);return o?Object.assign(d,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(d,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[d,l]},sO={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},zg={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},qg=(r,e)=>(ea(e),[r.run({...zg,get:()=>Hg(e,zg,!0,sO)},e)]),ea=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},Kg=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],d=r[i-1],f="",h="",g="";if(u+l!==0?f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${d}) {
              pad++;
              continue;
            }
            ${n}
          }`:f=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${n}
          }`,e.kernelShape.length===2){let _=e.kernelShape[e.kernelShape.length-2],T=e.strides[e.strides.length-2],v=e.pads[e.pads.length/2-2],x=e.pads[e.pads.length-2],I=r[i-2];v+x!==0?h=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${v} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${a};
                continue;
              }
          `:h=`
            for (int j = 0; j < ${_}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${T} - ${v} + j;
            `,g=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${h}
          ${f}
          ${g}
          ${t}
          return value;
        }
      `}else{let a=le.size(e.kernelShape),s=le.computeStrides(e.kernelShape),u=s.length,l=e.pads.length,d=uO(u),f=Qi(r,"inputDims"),h=Qi(e.pads,"pads"),g=Qi(s,"kernelStrides"),b=Qi(e.strides,"strides"),_=e.pads.reduce((x,I)=>x+I),T="";return _?T=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:T=`
          }
          ${n}
        `,`
        ${d}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${h}
          ${f}
          ${b}
          ${g}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${a}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${T}
          }
          ${t}

          return value;
        }
      `}},Qi=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},uO=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var Fr,br,lO,cO,Zg,Jg,Yg,Qg,eb,tb,nb,rb=L(()=>{"use strict";dt();Vo();Ve();Ee();Fr=(r,e,n,t,o)=>{cO(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>lO(r,e,n,t,o,i)},e)]},br=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return $e({axes:e,keepDims:n})},lO=(r,e,n,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],l=le.normalizeAxes(n.axes,e[0].dims.length),d=o(e,l),f=d[1];for(let b=0;b<e[0].dims.length;b++)l.indexOf(b)>=0||l.length===0?(n.keepDims&&a.push(1),f=`
          for(int j${b} = 0; j${b} < ${e[0].dims[b]}; j${b}++) {
            inputIdx[${b}] = j${b};
            ${f}
          }`):(u.push(`inputIdx[${b}] = outputIdx[${a.length}];`),a.push(e[0].dims[b]));let g=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${d[0]}       // init ops for reduce max/min
        ${f}
        ${d[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:g}},cO=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},Zg=(r,e,n)=>Fr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Jg=(r,e,n)=>Fr(r,e,n,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),Yg=(r,e,n)=>Fr(r,e,n,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Qg=(r,e,n)=>Fr(r,e,n,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),eb=(r,e,n)=>Fr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),tb=(r,e,n)=>Fr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),nb=(r,e,n)=>Fr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var ob,ib=L(()=>{"use strict";Ve();ob=(r,e)=>{let n=le.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var ab,Kl,sb,ub,Fo,dO,Xl,ta,Zl=L(()=>{"use strict";dt();Ye();Ee();ab={name:"Upsample",inputNames:["X"],inputTypes:[0]},Kl=(r,e,n)=>(Xl(e,n),[r.run({...ab,cacheHint:n.cacheKey,get:()=>dO(r,e,n)},e)]),sb=r=>Fo(r,7),ub=r=>Fo(r,9),Fo=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),ta(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),a=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let d=r.attributes.getFloat("cubic_coeff_a",-.75),f=r.attributes.getInt("exclude_outside",0)!==0;if(f&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let h=e<11?!0:t==="nearest"&&a==="asymmetric"&&l==="floor",g=0,b=0,_=0;return e>10?r.inputs.length>2?(g=1,b=2,_=3):(b=1,_=2):e===9&&(b=1),$e({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:l,cubicCoefficientA:d,excludeOutside:f,useNearest2xOptimization:h,roiInputIdx:g,scalesInputIdx:b,sizesInputIdx:_})},dO=(r,e,n)=>{let t=he(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((_,T)=>Math.floor(_*n.scales[T])),[s,u]=r.calculateTextureWidthAndHeight(a,0),l=a.length,d=new Array(l),f=new Array(l),h=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let _=l-1;_>=0;_--)d[_]=_===l-1?1:d[_+1]*a[_+1],f[_]=_===l-1?1:f[_+1]*e[0].dims[_+1],h+=`
        output_pitches[${_}] = ${d[_]};
        input_pitches[${_}] = ${f[_]};
        `;let g=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,b=n.mode==="nearest"?`
    ${g}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:l===4?`
    ${g}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${e[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${g}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${h}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${e[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...ab,output:{dims:a,type:e[0].type,textureType:0},shaderSource:b,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(_=>Math.ceil(_))}]}},Xl=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},ta=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var Jl,Yl,lb,cb,pO,fO,hO,mO,db=L(()=>{"use strict";Ye();Ee();Rn();Br();Zl();Jl={name:"Resize",inputNames:["A"],inputTypes:[2]},Yl=(r,e,n)=>(Xl(e,n),[r.run({...Jl,cacheHint:n.cacheKey,get:()=>pO(r,e,n)},e)]),lb=r=>Fo(r,10),cb=r=>Fo(r,11),pO=(r,e,n)=>{let t=he(r.session.backend.glContext.version),[o,i]=fO(e,n);if(o.every(I=>I===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...Jl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],l=i[s-1],d=e[0].dims;if(s!==d.length)throw new Error(`output dimension should match input ${d.length}, but got ${s}`);let f=d[s-2],h=d[s-1],g=o[s-2],b=o[s-1],_="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":_=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${h}.0 - 1.0, ${f}.0 - 1.0, ${h}.0 - 1.0,
                            ${f}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let T=yt(s),v=zn(),x=`
            const vec2 inputWH = vec2(${f}.0, ${h}.0);
            const vec4 scaleWHWH = vec4(float(${g}), float(${b}), float(${g}), float(${b}));
            ${v}
            ${_}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${T} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${t.output} = vec4(newValue);
            }
        `;return{...Jl,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:x}},fO=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let s=r[e.scalesInputIdx];if(s&&s.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=hO(s,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=mO(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},hO=(r,e,n)=>{let t=Array.from(r.floatData);return ta(t,e,n),t},mO=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(r[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=r[a]/e[a];return ta(i,n,t),i}});var pb,gO,fb=L(()=>{"use strict";zr();pb=(r,e)=>(gO(e),[new at([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),gO=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var Ql,hb,mb,gb,bO,bb,yO,_O,yb=L(()=>{"use strict";dt();Vo();Ve();Ee();Ql={name:"Slice",inputNames:["A"],inputTypes:[0]},hb=(r,e,n)=>(bO(e),[r.run({...Ql,cacheHint:n.cacheKey,get:()=>gb(r,e[0],n)},e)]),mb=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return $e({starts:e,ends:n,axes:t})},gb=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((f,h)=>h):n.axes,o=le.normalizeAxes(t,e.dims.length),i=n.starts.map((f,h)=>f>e.dims[o[h]]-1?e.dims[o[h]]:le.normalizeAxis(f,e.dims[o[h]])),a=n.ends.map((f,h)=>f>e.dims[o[h]]-1?e.dims[o[h]]:le.normalizeAxis(f,e.dims[o[h]])),s=e.dims.slice(),u=[];for(let f=0;f<o.length;f++)s[o[f]]=a[f]-i[f],i[f]>0&&u.push(`outputIdx[${o[f]}] += ${i[f]};`);let d=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Ql,output:{dims:s,type:e.type,textureType:0},shaderSource:d}},bO=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},bb=(r,e)=>{_O(e);let n=yO(r,e);return[r.run({...Ql,cacheHint:n.cacheKey,get:()=>gb(r,e[0],n)},[e[0]])]},yO=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},_O=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var _b,vb,wb,xb,Tb,Ib,Sb,$b,vO,wO,xO,Ab,Ob=L(()=>{"use strict";dt();Ve();Ye();Ee();Yi();_b={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},vb={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},wb={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},xb=(r,e,n)=>{Ab(e);let t=e[0].dims.slice(),o=le.normalizeAxis(n.axis,t.length),i=le.sizeToDimension(t,o),a=le.sizeFromDimension(t,o);return $b(r,e,n,i,a)},Tb=r=>$e({axis:r.attributes.getInt("axis",1)}),Ib=r=>$e({axis:r.attributes.getInt("axis",-1)}),Sb=(r,e,n)=>{Ab(e);let t=e[0].dims.slice(),o=le.normalizeAxis(n.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],l=[],d;a&&(u=Array.from({length:i}).map((b,_)=>_),u[o]=i-1,u[i-1]=o,u.map(b=>s.push(t[b])),d=$e({perm:u}),l=Vr(r,e,d));let f=a?le.sizeToDimension(s,i-1):le.sizeToDimension(t,i-1),h=a?le.sizeFromDimension(s,i-1):le.sizeFromDimension(t,i-1),g=$b(r,a?l:e,n,f,h);return a?Vr(r,g,d):g},$b=(r,e,n,t,o)=>{let i=vO(r,e[0],t,o,[t]),a=r.run({..._b,cacheHint:n.cacheKey,get:()=>i},e),s=wO(r,e[0],t,o,i.output.dims,[t]),u=r.run({...vb,cacheHint:n.cacheKey,get:()=>s},[e[0],a]),l=xO(r,e[0],t,o,i.output.dims,s.output.dims);return[r.run({...wb,cacheHint:n.cacheKey,get:()=>l},[e[0],a,u])]},vO=(r,e,n,t,o)=>{let[i,a]=r.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=he(r.session.backend.glContext.version),l=`
      float process(int[${s}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${a} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${a})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{..._b,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},wO=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=he(r.session.backend.glContext.version),d=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s}))) - max);
        }

        return norm_factor;
      }`;return{...vb,output:{dims:i,type:e.type,textureType:0},shaderSource:d}},xO=(r,e,n,t,o,i)=>{let[a,s]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${a}, ${s});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${t};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...wb,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},Ab=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var Pb,Eb,Cb,TO,IO,SO,Db=L(()=>{"use strict";dt();Ve();Ee();Pb={name:"Split",inputNames:["A"],inputTypes:[0]},Eb=(r,e,n)=>{SO(e);let t=le.normalizeAxis(n.axis,e[0].dims.length),o=TO(r,e,t,n),i=[];for(let a=0;a<o;++a)i.push(r.run({...Pb,cacheHint:`${n.cacheKey};${a}`,get:()=>IO(r,e[0],n,t,a)},e));return i},Cb=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return $e({axis:e,split:n,numOutputs:t})},TO=(r,e,n,t)=>{let[,o]=No.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},IO=(r,e,n,t,o)=>{let[i,a]=No.splitShape(e.dims,t,n.split,n.numOutputs),s=a[o],u=i[o],d=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...Pb,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:d}},SO=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var ec,kb,Nb,$O,AO,Lb=L(()=>{"use strict";Ve();ec=(r,e,n)=>{$O(e);let t=le.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},kb=(r,e)=>(AO(e),ec(r,[e[0]],Array.from(e[1].integerData))),Nb=r=>r.attributes.getInts("axes"),$O=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},AO=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Rb,OO,PO,zb=L(()=>{"use strict";Ye();Ee();Rb=(r,e)=>{PO(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>OO(r,e,n)},e)]},OO=(r,e,n)=>{let t=he(r.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},PO=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var Bb,EO,CO,Mb=L(()=>{"use strict";Vo();Ee();Bb=(r,e)=>{CO(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>EO(r,e,n)},e)]},EO=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},CO=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if(gr.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var tc,Vb,Fb,DO,kO,Gb=L(()=>{"use strict";Ve();tc=(r,e,n)=>{DO(e);let t=le.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Vb=(r,e)=>(kO(e),tc(r,[e[0]],Array.from(e[1].integerData))),Fb=r=>r.attributes.getInts("axes"),DO=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},kO=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var Ub,Wb=L(()=>{"use strict";em();fm();gm();xm();Xi();ig();dg();hg();bg();wg();Ig();Og();Dg();Zi();Rg();Xg();rb();ib();db();fb();yb();Ob();Db();Lb();zb();Mb();Yi();Bl();Gb();Zl();Ub=[["Abs","","6+",Tm],["Acos","","7+",Im],["Add","","7+",tm],["And","","7+",nm],["Asin","","7+",Sm],["Atan","","7+",$m],["AveragePool","","7+",Bg,Mg],["BatchNormalization","","7+",Yh,Qh],["Cast","","6+",hm,mm],["Ceil","","6+",Pm],["Clip","","6-10",Rl,Am],["Clip","","11+",Om],["Concat","","4+",_m,wm],["Conv","","1+",Wl,Hl],["ConvTranspose","","1+",rg,og],["Cos","","7+",Em],["Div","","7+",rm],["Dropout","","7+",zl],["DepthToSpace","","1+",lg,cg],["Equal","","7+",om],["Elu","","6+",Cm,Dm],["Exp","","6+",km],["Flatten","","1+",pg,fg],["Floor","","6+",Nm],["FusedConv","com.microsoft","1+",Wl,Hl],["Gather","","1+",mg,gg],["Gemm","","7-10",jl,_g],["Gemm","","11+",jl,vg],["GlobalAveragePool","","1+",Fg,Gg],["GlobalMaxPool","","1+",qg],["Greater","","7+",im],["Identity","","1+",zl],["ImageScaler","","1+",xg,Tg],["InstanceNormalization","","6+",$g,Ag],["LeakyRelu","","6+",Lm,Rm],["Less","","7+",am],["LRN","","1+",Pg,Eg],["Log","","6+",zm],["MatMul","","1+",Zm,Jm],["MaxPool","","1+",Ug,Wg],["Mul","","7+",sm],["Neg","","6+",Bm],["Not","","1+",Mm],["Or","","7+",um],["Pad","","2-10",ql,kg],["Pad","","11+",Ng,Lg],["Pow","","7+",lm],["PRelu","","7+",cm],["ReduceLogSum","","1+",tb,br],["ReduceMax","","1+",Yg,br],["ReduceMean","","1+",Jg,br],["ReduceMin","","1+",Qg,br],["ReduceProd","","1+",eb,br],["ReduceSum","","1-12",Zg,br],["ReduceSumSquare","","1+",nb,br],["Relu","","6+",Vm],["Reshape","","5+",ob],["Resize","","10",Yl,lb],["Resize","","11+",Yl,cb],["Shape","","1+",pb],["Sigmoid","","6+",Fm],["Sin","","7+",Gm],["Slice","","10+",bb],["Slice","","1-9",hb,mb],["Softmax","","1-12",xb,Tb],["Softmax","","13+",Sb,Ib],["Split","","2-12",Eb,Cb],["Sqrt","","6+",Um],["Squeeze","","1-12",ec,Nb],["Squeeze","","13+",kb],["Sub","","7+",dm],["Sum","","6+",Rb],["Tan","","7+",Wm],["Tanh","","6+",Hm],["Tile","","6+",Bb],["Transpose","","1+",Vr,sg],["Upsample","","7-8",Kl,sb],["Upsample","","9",Kl,ub],["Unsqueeze","","1-12",tc,Fb],["Unsqueeze","","13+",Vb],["Xor","","7+",pm]]});function jb(r){let e={},n;for(;(n=Hb.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=NO.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let a=n[1],s=n[2],u=n[3].split(","),l=a?`${a} ${s};`:"",d=e[t].body,f="";e[t].params.forEach((g,b)=>{g&&(f+=`${g.type} ${g.name} = ${u[b]};
`)}),d=`${f}
 ${d}`,d=d.replace("return",`${s} = `);let h=`
      ${l}
      {
        ${d}
      }
      `;r=r.replace(n[0],h)}}return r=r.replace(Hb,""),r}var Hb,NO,qb=L(()=>{"use strict";Hb=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,NO="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function co(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:LO(e,r).sort(),a=0;for(let s=0;s<r.length;++s){if(i!=null){if(i[a]===s&&r[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${r[s]}' is not 1`);(i[a]==null||i[a]>s)&&r[s]===1&&(n.push(r[s]),t.push(s)),i[a]<=s&&a++}r[s]!==1&&(n.push(r[s]),t.push(s))}return{newShape:n,keptDims:t}}function LO(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),oo(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),oo(r.every(RO),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function RO(r){return r%1===0}function zO(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function Kb(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var na,nc=L(()=>{"use strict";kt();Ve();na=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let s=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,d)=>l*d),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,d)=>l*d);if(s>o||u>o)Ge.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=co(i).newShape);let a=zO(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?Kb(a/4).map(s=>s*2):Kb(a)}}});var ra,Xb=L(()=>{"use strict";Ve();Qn();Ye();nc();Rn();ra=class extends Ft{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new ne(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new ne(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(n,t);break;case 2:o[i]=this.getOutputPacked2DCoords(n,t);break;case 3:o[i]=this.getOutputPacked3DCoords(n,t);break;default:o[i]=this.getOutputPackedNDCoords(n,t)}let s=`
      void setOutput(vec4 val) {
        ${he(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new ne(s),o}getUnpackedOutputSamplingSnippet(e){let n=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(n.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(n,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(n,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(n,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(n,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(n,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(n,t);break;default:throw new Error(`Unsupported output dimensionality: ${n.length}`)}let s=`
        void setOutput(float val) {
          ${he(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new ne(s),o}getOutputScalarCoords(){return new ne(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,n){let t=n,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new ne(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new ne(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new ne(o))}getOutputPacked2DCoords(e,n){let t="";if(kr.arraysEqual(e,n))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${n[0]}, ${n[1]}));
        }
      `,new ne(t);let o=n,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new ne(t)}getOutputPacked3DCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;

          int b = index / ${i};
          index -= b * ${i};

          // reverse r and c order for packed texture
          int r = imod(index, ${o}) * 2;
          int c = 2 * (index / ${o});

          return ivec3(b, r, c);
        }
      `;return new ne(a)}getOutputPackedNDCoords(e,n){let t=[n[0],n[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let d=2;d<e.length-1;d++)a*=e[e.length-d-1],s=`
      int b${d} = index / ${a};
      index -= b${d} * ${a};
    `+s,u=`b${d}, `+u;let l=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.y * ${t[0]} + resTexRC.x;

        ${s}

        int b = index / ${i};
        index -= b * ${i};

        // reverse r and c order for packed texture
        int r = imod(index, ${o}) * 2;
        int c = 2 * (index / ${o});

        return ivec${e.length}(${u});
      }
    `;return new ne(l)}getOutputUnpacked1DCoords(e,n){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          return resTexRC.y * ${n[0]} + resTexRC.x;
        }
      `;return new ne(t)}getOutputUnpacked2DCoords(e,n){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new ne(t)}getOutputUnpacked3DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new ne(t)}getOutputUnpacked4DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new ne(t)}getOutputUnpacked5DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${n[0]}, ${n[1]}));
          int index = resTexRC.y * ${n[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new ne(t)}getOutputUnpacked6DCoords(e,n){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,l)=>{let d=`int ${a[l]} = index / ${u}`,f=l===i.length-1?`int ${a[l+1]} = index - ${a[l]} * ${u}`:`index -= ${a[l]} * ${u}`;return`${d}; ${f};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${n[0]}, ${n[1]}));
         int index = resTexRC.y * ${n[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new ne(t)}getCommonUtilFuncs(){let e={},n="uvFromFlat";e[n]=new ne(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),n="packedUVfrom1D",e[n]=new ne(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom2D",e[n]=new ne(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="packedUVfrom3D",e[n]=new ne(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),n="sampleTexture";let t=he(this.context.glContext.version);return e[n]=new ne(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},n=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Gi(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=Rh(t);i.unpackedShape.length<=n.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,n,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,n,t))}),e}getPackedSamplerAtOutputCoords(e,n,t,o){let i=n.unpackedShape,a=t.unpackedShape,u=Gi(o),l=i.length,d=a.length,f=bt.getBroadcastDims(i,a),h=yt(d),g=d-l,b,_=Kt();l===0?b="":d<2&&f.length>=1?b="coords = 0;":b=f.map(M=>`coords.${_[M+g]} = 0;`).join(`
`);let T="";d<2&&l>0?T="coords":T=i.map((M,H)=>`coords.${_[H+g]}`).join(", ");let v="return outputValue;",I=le.size(i)===1,P=le.size(a)===1;if(l===1&&!I&&!P)v=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(I&&!P)d===1?v=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:v=`
          return vec4(outputValue.x);
        `;else if(f.length){let M=l-2,H=l-1;f.indexOf(M)>-1&&f.indexOf(H)>-1?v="return vec4(outputValue.x);":f.indexOf(M)>-1?v="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":f.indexOf(H)>-1&&(v="return vec4(outputValue.xx, outputValue.zz);")}let E=`
        int lastDim = coords.${_[d-1]};
        coords.${_[d-1]} = coords.${_[d-2]};
        coords.${_[d-2]} = lastDim;
      `,z=`
      vec4 ${e}() {
        ${h} coords = getOutputCoords();
        ${E}
        ${b}
        vec4 outputValue = ${u}(${T});
        ${v}
      }
    `;return new ne(z,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,n,t,o){let i=[t.width,t.height],a=[n.width,n.height],s=n.unpackedShape.length,u=t.unpackedShape.length,l=n.unpackedShape,d=t.unpackedShape,f=Gi(o);if(s===u&&kr.arraysEqual(a,i)){let I=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new ne(I,["coordinates.sampleTexture"])}let h=yt(u),g=bt.getBroadcastDims(l,d),b=u-s,_,T=Kt();s===0?_="":u<2&&g.length>=1?_="coords = 0;":_=g.map(I=>`coords.${T[I+b]} = 0;`).join(`
`);let v="";u<2&&s>0?v="coords":v=n.unpackedShape.map((I,$)=>`coords.${T[$+b]}`).join(", ");let x=`
        float ${e}() {
          ${h} coords = getOutputCoords();
          ${_}
          return ${f}(${v});
        }
      `;return new ne(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,n,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,n);case 1:return this.getPackedSampler1D(e,n,t);case 2:return this.getPackedSampler2D(e,n,t);case 3:return this.getPackedSampler3D(e,n,t);default:return this.getPackedSamplerND(e,n,t)}}getUnpackedSamplerFromInput(e,n,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,n,t);case 1:return this.getUnpackedSampler1D(e,n,t);case 2:return this.getUnpackedSampler2D(e,n,t);case 3:return this.getUnpackedSampler3D(e,n,t);case 4:return this.getUnpackedSampler4D(e,n,t);case 5:return this.getUnpackedSampler5D(e,n,t);case 6:return this.getUnpackedSampler6D(e,n,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,n){let t=he(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${n}, halfCR);
          }
        `;return new ne(o)}getPackedSampler1D(e,n,t){let o=[t.width,t.height],i=[o[1],o[0]],a=he(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }`;return new ne(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=he(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&kr.arraysEqual(o,i)){let g=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${n}, uv);
      }`;return new ne(g)}let l=i,d=Math.ceil(o[1]/2),h=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${d}, row, col);
      return ${a.texture2D}(${n}, uv);
    }`;return new ne(h,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,n,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=he(this.context.glContext.version);if(o[0]===1){let b=o.slice(1),_=[1,2],T=io(o,b),v=["b","row","col"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=T;let I=this.getPackedSamplerFromInput(e,n,x),P=`${I.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${ao(v,_)});
      } `;return new ne(P,I.dependencies)}let u=a[0],l=a[1],d=Math.ceil(o[2]/2),f=d*Math.ceil(o[1]/2),g=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${f}, ${d}, b, row, col);
      return ${s.texture2D}(${n}, uv);}`;return new ne(g,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,n,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=he(this.context.glContext.version),u=[a[0],a[1]],l=u[1],d=u[0],f=Math.ceil(o[i-1]/2),h=f*Math.ceil(o[i-2]/2),g="int b, int row, int col",b=`b * ${h} + (row / 2) * ${f} + (col / 2)`;for(let v=2;v<i-1;v++)g=`int b${v}, `+g,h*=o[i-v-1],b=`b${v} * ${h} + `+b;let T=`vec4 ${e}(${g}) {
      int index = ${b};
      int texR = index / ${d};
      int texC = index - texR * ${d};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}, ${l});
      return ${s.texture2D}(${n}, uv);
    }`;return new ne(T)}getUnpackedSamplerScalar(e,n,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${n}, halfCR);
          }
        `;return new ne(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${n} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${n});
          return sampleTexture(${n}, uv);
        }
      `;return new ne(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,n,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${n}, halfCR);
        }
      `;return new ne(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new ne(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new ne(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ne(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,n,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&kr.arraysEqual(o,i)){let h=i[1],g=i[0],b=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${h}.0, ${g}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new ne(b,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=co(o),u=a;if(u.length<o.length){let h=io(o,u),g=JSON.parse(JSON.stringify(t));g.unpackedShape=h;let b=["col","row"],_=`
          ${this.getUnpackedSamplerFromInput(e,n,g).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${ao(b,s)});
          }
        `;return new ne(_,["coordinates.sampleTexture"])}let l=i[1],d=i[0];if(d===1){let h=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${n}, uv);
          }
        `;return new ne(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let h=`
          float ${e}(int row, int col) {
            int offset_${n} = coordsToOffset(TexCoords, ${l}, ${d});
            float index = dot(vec3(row, col, offset_${n}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${d}.0, 0.5);
            return sampleTexture(${n}, uv);
          }
        `;return new ne(h,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let f=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${d}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ne(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,n,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=co(o),l=s;if(l.length<o.length){let g=io(o,l),b=["batch","col","row"],_=JSON.parse(JSON.stringify(t));_.unpackedShape=g;let T=this.getUnpackedSamplerFromInput(e,n,_),v=u.reverse(),x=`
          ${T.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${ao(b,v)});
          }
        `;return new ne(x,T.dependencies)}let d=t.width,f=t.height,h=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${d}, ${f}, index);
            return sampleTexture(${n}, uv);
          }
      `;return new ne(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,n,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,l=t.height,d=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ne(d,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,n,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:l,keptDims:d}=co(o);if(l.length<o.length){let b=io(o,l),_=["row","col","depth","depth2","depth3"],T=JSON.parse(JSON.stringify(t));T.unpackedShape=b;let v=`
          ${this.getUnpackedSamplerFromInput(e,n,T).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${ao(_,d)});
          }
        `;return new ne(v,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=t.width,h=t.height,g=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${f}, ${h}, index);
          return sampleTexture(${n}, uv);
        }
      `;return new ne(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,n,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,l=o[1]*u,{newShape:d,keptDims:f}=co(o);if(d.length<o.length){let _=io(o,d),T=["row","col","depth","depth2","depth3","depth4"],v=JSON.parse(JSON.stringify(t));v.unpackedShape=_;let x=`
            ${this.getUnpackedSamplerFromInput(e,n,v).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${ao(T,f)});
            }
          `;return new ne(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let h=t.width,g=t.height,b=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${h}, ${g}, index);
            return sampleTexture(${n}, uv);
          }
        `;return new ne(b,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,n=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<n-1;++u)a.push(`
        c[${u}] = offset / ${t[u]};`),a.push(`
        offset -= c[${u}] * ${t[u]};`);a.push(`
        c[${n-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${n}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${i});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${n}]) {
        ${a.join("")}
      }
    `;return{toVec:new ne(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${n}`;e[s]=new ne(this.getValueFromSingle(n,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new ne(this.getValueFromSingle(n,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,n,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=he(this.context.glContext.version);return`
        float ${a}(int m[${n}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,n,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=he(this.context.glContext.version);return`
        vec4 ${a}(int m[${n}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var oa,Zb=L(()=>{"use strict";Qn();oa=class r extends Ft{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new ne(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new ne(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new ne(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${e}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new ne(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var ia,Jb=L(()=>{"use strict";Qn();Ye();ia=class extends Ft{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=he(this.context.glContext.version);return{setFragColor:new ne(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new ne(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var aa,Yb=L(()=>{"use strict";Qn();aa=class r extends Ft{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,l="";for(let f=0;f<a;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
        }
        `;n[u]=new ne(d)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,l="";for(let f=0;f<a-2;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${s+f}]), ${i[f]}.0) );
          `;let d=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${l}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new ne(d)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${n}`;e[s]=new ne(r.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${n}_T`,e[s]=new ne(r.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${n}`;e[s]=new ne(r.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${n}_T`,e[s]=new ne(r.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${n-1}] = offset;`),`
      void ${e}(int offset, out int indices[${n}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,a=`incrementIndices_${n}`,s="";for(let l=0;l<i;++l)s+=`
        shape[${l}] = ${o[l]};`;let u=`
        void ${a}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${s};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[a]=new ne(u)}),e}}});var sa,Qb=L(()=>{"use strict";Qn();sa=class extends Ft{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let l=0;l<n;++l)s+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${a}(int src[${n}], out int dest[${n}]) {
          ${s}
        }
        `;o[a]=new ne(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new ne(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${n} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${n-1}] = value;
        `;let o=`
      void setVecItem(out int m[${n}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new ne(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${n} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${n-1}];
        `;let o=`
      int getVecItem(int m[${n}], int index) {
        ${t}
      }
    `;return{getVecItem:new ne(o)}}}});var rc,ey=L(()=>{"use strict";Xb();Zb();Jb();Yb();Qb();rc={encoding:oa,fragcolor:ia,vec:sa,shapeUtils:aa,coordinates:ra}});var ua,ty=L(()=>{"use strict";Qn();qb();ey();Ye();ua=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new ji(e,n,t,o),Object.keys(rc).forEach(a=>{let s=new rc[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let l in u){let d=a+"."+l,f;i[d]?(f=i[d],f.routineBody=u[l].routineBody):(f=new Mo(d,u[l].routineBody),i[d]=f);let h=u[l].dependencies;if(h)for(let g=0;g<h.length;++g)if(i[h[g]])f.addDependency(i[h[g]]);else{let b=new Mo(h[g]);i[h[g]]=b,f.addDependency(b)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${Lh(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=jb(n),`${Nh(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),qi.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var la,ny=L(()=>{"use strict";ft();kt();ty();Ye();la=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(a){throw Ge.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new ua(this.glContext,e,n,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){Ge.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=kh(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}ye.debug&&Ge.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;Ge.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:l}of e){let d=n.find(f=>f.name===a)?.data;if(s!=="sampler2D"&&!d)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,d):o.uniform1f(u,d);break;case"int":l?o.uniform1iv(u,d):o.uniform1i(u,d);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var ca,ry=L(()=>{"use strict";kt();zo();ca=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let s=n.width,u=n.height,l,d;if(this.config.reuseTextures){l=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,d=this.inUseTextures.get(l),d||(d=[],this.inUseTextures.set(l,d));let h=this.idleTextures.get(l);if(h&&h.length>0){let g=h.pop();return d.push(g),o===1&&this.glContext.updateTexture(g,s,u,a,this.toTextureData(e,t)),g}}Ge.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let f=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(d.push(f),this.textureLookup.set(f,l)),f}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,d)=>l*d)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),s=this.toTensorData(n,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||n)&&(Ge.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var da,oy=L(()=>{"use strict";kt();Up();Zh();Wb();ny();nc();ry();da=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new na(e.glContext.maxTextureSize),this.programManager=new la(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new ca(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Hi(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){Ge.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=Gp(e,n,Ub);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function BO(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var Go,iy=L(()=>{"use strict";ft();zo();zo();Rn();Go=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,n,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,n*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,a),l=u.allocate(n*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,n,t,s.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ye.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Ui(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Ro(this.gl,n):new Ro(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Wi(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,a;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await Ol(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=BO(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await Ol(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function oc(r){let e;if((!r||r==="webgl2")&&"webgl2"in po?e=po.webgl2:(!r||r==="webgl")&&"webgl"in po&&(e=po.webgl),!e)try{let t=VO();e=ay(t,r)}catch{let t=MO();e=ay(t,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return po[r]=e,n.isContextLost()?(delete po[r],oc(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function ay(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new Go(t,2)}catch(i){Ge.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new Go(t,1)}catch(i){Ge.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function MO(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function VO(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var po,sy=L(()=>{"use strict";kt();iy();po={}});var pa,uy=L(()=>{"use strict";ft();kt();oy();sy();pa=class{get contextId(){return ye.webgl.contextId}set contextId(e){ye.webgl.contextId=e}get matmulMaxBatchSize(){return ye.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){ye.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return ye.webgl.textureCacheMode}set textureCacheMode(e){ye.webgl.textureCacheMode=e}get pack(){return ye.webgl.pack}set pack(e){ye.webgl.pack=e}get async(){return ye.webgl.async}set async(e){ye.webgl.async=e}initialize(){try{return this.glContext=oc(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Ge.setWithEnv(ye),ye.webgl.context||Object.defineProperty(ye.webgl,"context",{value:this.glContext.gl}),Ge.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Ge.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new da(this,e)}dispose(){this.glContext.dispose()}}});async function ic(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=ly.get(n);if(t)return t;let o=await GO(n);if(o)return o}}else return ic(["webgl"]);throw new Error("no available backend to use")}async function GO(r){let e=FO;if(typeof e[r]<"u"&&UO(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return ly.set(r,n),n}}function UO(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var ly,FO,cy=L(()=>{"use strict";uy();ly=new Map,FO={webgl:new pa}});var ac,fa,dy=L(()=>{"use strict";kt();ac=class{constructor(e,n){this.op=e;this.node=n}},fa=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new ac(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((d,f)=>{let h=o[f];this._values[h]=d});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let d=i[u++],f=this._ops[d],h=f.node.inputs.map(T=>this._values[T]);if(h.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${f.node}`);let g=h;Ge.verbose("ExecPlan",`Running op:${f.node.name} (${g.map((T,v)=>`'${f.node.inputs[v]}': ${T.type}[${T.dims.join(",")}]`).join(", ")})`);let b=await this.profiler.event("node",f.node.name,async()=>f.op.impl(t,g,f.op.context));if(b.length!==f.node.outputs.length)throw new Error("the size of output does not match model definition.");b.forEach((T,v)=>{let x=f.node.outputs[v];if(this._values[x])throw new Error(`output [${x}] already has value: op:${f.node.name}`);this._values[x]=T});let _=new Set;b.forEach((T,v)=>{let x=f.node.outputs[v];for(let I of a[x].to){let $=s[I],P=!0;for(let E of $.inputs)if(!this._values[E]){P=!1;break}P&&_.add(I)}}),i.push(..._)}let l=[];for(let d=0;d<this.graph.getOutputIndices().length;d++){let f=this.graph.getOutputIndices()[d],h=this._values[f];if(h===void 0)throw new Error(`required output [${f}] does not have value`);f===0?await h.getData():h.data,l.push(h)}return Ge.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var Pe,Uo,py=L(()=>{"use strict";Po();Pe=xe(ro());zr();Ve();Uo=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof Pe.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof Li.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof Pe.onnx.AttributeProto?e.type:e.type();switch(n){case Pe.onnx.AttributeProto.AttributeType.FLOAT:return"float";case Pe.onnx.AttributeProto.AttributeType.INT:return"int";case Pe.onnx.AttributeProto.AttributeType.STRING:return"string";case Pe.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case Pe.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case Pe.onnx.AttributeProto.AttributeType.INTS:return"ints";case Pe.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case Pe.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${Pe.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof Pe.onnx.AttributeProto?e.type:e.type();if(n===Pe.onnx.AttributeProto.AttributeType.GRAPH||n===Pe.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===Pe.onnx.AttributeProto.AttributeType.INT&&Tt.isLong(t))return Tt.longToNumber(t);if(n===Pe.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=Tt.longToNumber(s)}return i}if(n===Pe.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof Pe.onnx.AttributeProto?at.fromProto(t):at.fromOrtTensor(t);if(n===Pe.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof Pe.onnx.AttributeProto)return t.map(i=>at.fromProto(i));if(e instanceof Li.Attribute)return t.map(i=>at.fromOrtTensor(i))}return n===Pe.onnx.AttributeProto.AttributeType.STRING&&e instanceof Pe.onnx.AttributeProto?Lo(t):n===Pe.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof Pe.onnx.AttributeProto?t.map(Lo):t}static getValueNoCheck(e){return e instanceof Pe.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case Pe.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case Pe.onnx.AttributeProto.AttributeType.INT:return e.i;case Pe.onnx.AttributeProto.AttributeType.STRING:return e.s;case Pe.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case Pe.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case Pe.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case Pe.onnx.AttributeProto.AttributeType.INTS:return e.ints;case Pe.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case Pe.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case Pe.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${Pe.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case Bt.AttributeType.FLOAT:return e.f();case Bt.AttributeType.INT:return e.i();case Bt.AttributeType.STRING:return e.s();case Bt.AttributeType.TENSOR:return e.t();case Bt.AttributeType.GRAPH:return e.g();case Bt.AttributeType.FLOATS:return e.floatsArray();case Bt.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case Bt.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case Bt.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${Bt.AttributeType[e.type()]}`)}}}});var uc,lc,Mn,ha,sc,fy=L(()=>{"use strict";py();Po();uc=xe(ro());zr();Ve();lc={from:(r,e)=>new sc(r,e)},Mn=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=ht.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ha=class{constructor(e,n){e instanceof uc.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Uo(e.attribute)):e instanceof ul.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new Uo(ht.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},sc=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof uc.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof al.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new Mn(i))-1;n.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=n.get(i.name);if(a===void 0){let s=new Mn;s.type={shape:{dims:ht.tensorDimsFromProto(i.dims)},tensorType:ht.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,n.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=at.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new Mn(i))-1;n.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new ha(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new Mn)-1,n.set(u,l)),a.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=at.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(n.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new Mn;if(e.nodeArgs(s)?.type()?.valueType()!==cl.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let d=e.nodeArgs(s).type().value(new ll.TensorTypeAndShape),f=ht.tensorDataTypeFromProto(d.elemType()),h=d.shape(),g=[];for(let _=0;_<h.dimLength();_++)g.push(Tt.longToNumber(h.dim(_).value().dimValue()));u.type={shape:{dims:g},tensorType:f};let b=this._allData.push(u)-1;n.set(a,b),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=n.get(a.name());if(s===void 0){let u=new Mn,l=ht.tensorDimsFromORTFormat(a),d=ht.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:l},tensorType:d},s=this._allData.push(u)-1,n.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=at.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(n.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new Mn)-1;n.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let l=0;s=`unnamed_${a.opType()}_${l}`,!!t.has(s);l++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new ha(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let l=s?.outputs(u),d=n.get(l);if(typeof d>"u"&&(d=this._allData.push(new Mn)-1,n.set(l,d)),a.outputs.push(d),this._allData[d]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${d}`);if(this._allData[d]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[d]._from=-1,this._allData[d].tensor=at.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let l=s.inputs(u),d=n.get(l);if(typeof d>"u")throw new Error(`unrecognized input '${l}' for node: ${s.name()}`);a.inputs.push(d),this._allData[d]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&n.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=n[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let s=1;s<n.outputs.length;s++)if(this._allData[n.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let s=0;s<n.inputs.length;s++){let u=this._allData[n.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[Lr,Rr])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var hy,my,ma,gy=L(()=>{"use strict";hy=xe(Me());fy();Po();my=xe(ro());Ve();ma=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=my.onnx.ModelProto.decode(e);if(Tt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:Tt.longToNumber(i.version)})),this._graph=lc.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new hy.ByteBuffer(e),o=sl.InferenceSession.getRootAsInferenceSession(t).model();if(Tt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:Tt.longToNumber(s.version())})}this._graph=lc.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var ga,by=L(()=>{"use strict";cy();dy();kt();gy();ga=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=_i.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await ic(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new ma,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new fa(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let a=e.get(n[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],a=n[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var ba,yy=L(()=>{"use strict";ft();zr();ba=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}get inputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}get outputMetadata(){throw new Error("Getting model metadata is not supported in webgl backend.")}async dispose(){}async run(e,n,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new at(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new $t(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var _y={};Ar(_y,{onnxjsBackend:()=>WO});var cc,WO,vy=L(()=>{"use strict";by();yy();cc=class{async init(){}async createInferenceSessionHandler(e,n){let t=new ga(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new ba(t)}},WO=new cc});var ya=L(()=>{"use strict"});var Ty={};Ar(Ty,{default:()=>HO});var wy,xy,HO,Iy=L(()=>{"use strict";dc();yr();_a();wy="ort-wasm-proxy-worker",xy=globalThis.self?.name===wy;xy&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":va(n.wasm).then(()=>{wa(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;xa(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=Wo(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;Ta(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":Ia(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=n;Sa(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},Aa([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":$a(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});HO=xy?null:r=>new Worker(r??Pt,{type:"module",name:wy})});var $y={};Ar($y,{default:()=>jO});var Sy,jO,qO,Ay=L(()=>{"use strict";Sy=async function(r={}){var e,n,t=r,o=new Promise((c,p)=>{e=c,n=p}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",s=a&&self.name?.startsWith("em-pthread");t.mountExternalData=(c,p)=>{c.startsWith("./")&&(c=c.substring(2)),(t.Fb||(t.Fb=new Map)).set(c,p)},t.unmountExternalData=()=>{delete t.Fb};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let l=c=>async(...p)=>{try{if(t.Gb)throw Error("Session already started");let m=t.Gb={ec:p[0],errors:[]},y=await c(...p);if(t.Gb!==m)throw Error("Session mismatch");t.Kb?.flush();let w=m.errors;if(0<w.length){let O=await Promise.all(w);if(O=O.filter(N=>N),0<O.length)throw Error(O.join(`
`))}return y}finally{t.Gb=null}};t.jsepInit=(c,p)=>{if(c==="webgpu"){[t.Kb,t.Vb,t.Zb,t.Lb,t.Yb,t.Ab,t.$b,t.bc,t.Wb,t.Xb,t.ac]=p;let m=t.Kb;t.jsepRegisterBuffer=(y,w,O,N)=>m.registerBuffer(y,w,O,N),t.jsepGetBuffer=y=>m.getBuffer(y),t.jsepCreateDownloader=(y,w,O)=>m.createDownloader(y,w,O),t.jsepOnCreateSession=y=>{m.onCreateSession(y)},t.jsepOnReleaseSession=y=>{m.onReleaseSession(y)},t.jsepOnRunStart=y=>m.onRunStart(y),t.cc=(y,w)=>{m.upload(y,w)}}else if(c==="webnn"){let m=p[0];[t.oc,t.Ob,t.webnnEnsureTensor,t.Pb,t.webnnDownloadTensor,t.nc,t.webnnEnableTraceEvent]=p.slice(1),t.webnnReleaseTensorId=t.Ob,t.webnnUploadTensor=t.Pb,t.webnnRegisterMLContext=t.nc,t.webnnOnRunStart=y=>m.onRunStart(y),t.webnnOnRunEnd=m.onRunEnd.bind(m),t.webnnOnReleaseSession=y=>{m.onReleaseSession(y)},t.webnnCreateMLTensorDownloader=(y,w)=>m.createMLTensorDownloader(y,w),t.webnnRegisterMLTensor=(y,w,O,N)=>m.registerMLTensor(y,w,O,N),t.webnnCreateMLContext=y=>m.createMLContext(y),t.webnnRegisterMLConstant=(y,w,O,N,G,q)=>m.registerMLConstant(y,w,O,N,G,t.Fb,q),t.webnnRegisterGraphInput=m.registerGraphInput.bind(m),t.webnnIsGraphInput=m.isGraphInput.bind(m),t.webnnRegisterGraphOutput=m.registerGraphOutput.bind(m),t.webnnIsGraphOutput=m.isGraphOutput.bind(m),t.webnnCreateTemporaryTensor=m.createTemporaryTensor.bind(m),t.webnnIsGraphInputOutputTypeSupported=m.isGraphInputOutputTypeSupported.bind(m)}};let d=()=>{let c=(p,m,y)=>(...w)=>{let O=tn,N=m?.();w=p(...w);let G=m?.();return N!==G&&(p=G,y(N),m=y=null),tn!=O?new Promise((q,Q)=>{Is={resolve:q,reject:Q}}):w};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[p]=c(t[p],()=>t[p],m=>t[p]=m)})(),l!==void 0&&(t._OrtRun=l(t._OrtRun),t._OrtRunWithBinding=l(t._OrtRunWithBinding)),d=void 0};t.asyncInit=()=>{d?.()};var f,h,g=(c,p)=>{throw p},b=import.meta.url,_="";if(i||a){try{_=new URL(".",b).href}catch{}a&&(h=c=>{var p=new XMLHttpRequest;return p.open("GET",c,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),f=async c=>{if(pe(c))return new Promise((m,y)=>{var w=new XMLHttpRequest;w.open("GET",c,!0),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?m(w.response):y(w.status)},w.onerror=y,w.send(null)});var p=await fetch(c,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)}}var T,v,x,I,$,P,E,z,M,H,K,B,ae,V,S,F=console.log.bind(console),X=console.error.bind(console),te=F,J=X,re=!1,pe=c=>c.startsWith("file://");function de(){return v.buffer!=$.buffer&&Ae(),$}function Ie(){return v.buffer!=$.buffer&&Ae(),P}function ge(){return v.buffer!=$.buffer&&Ae(),E}function W(){return v.buffer!=$.buffer&&Ae(),z}function D(){return v.buffer!=$.buffer&&Ae(),M}function oe(){return v.buffer!=$.buffer&&Ae(),H}function He(){return v.buffer!=$.buffer&&Ae(),K}function Ce(){return v.buffer!=$.buffer&&Ae(),V}if(s){let c=function(p){try{var m=p.data,y=m.Db;if(y==="load"){let w=[];self.onmessage=O=>w.push(O),self.startWorker=()=>{postMessage({Db:"loaded"});for(let O of w)c(O);self.onmessage=c};for(let O of m.Sb)t[O]&&!t[O].proxy||(t[O]=(...N)=>{postMessage({Db:"callHandler",Rb:O,args:N})},O=="print"&&(te=t[O]),O=="printErr"&&(J=t[O]));v=m.kc,Ae(),S(m.lc)}else if(y==="run"){$x(m.Bb),Es(m.Bb,0,0,1,0,0),ad(),xs(m.Bb),ot||(Yd(),ot=!0);try{Ax(m.hc,m.Jb)}catch(w){if(w!="unwind")throw w}}else m.target!=="setimmediate"&&(y==="checkMailbox"?ot&&ei():y&&(J(`worker: received unknown command ${y}`),J(m)))}catch(w){throw Qd(),w}};var AC=c,ot=!1;self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=c}function Ae(){var c=v.buffer;t.HEAP8=$=new Int8Array(c),E=new Int16Array(c),t.HEAPU8=P=new Uint8Array(c),z=new Uint16Array(c),t.HEAP32=M=new Int32Array(c),t.HEAPU32=H=new Uint32Array(c),K=new Float32Array(c),V=new Float64Array(c),B=new BigInt64Array(c),ae=new BigUint64Array(c)}function Ze(){s?startWorker(t):U.Da()}var Ct,Qt=0,nr=null;function cs(){if(--Qt==0&&nr){var c=nr;nr=null,c()}}function rr(c){throw J(c="Aborted("+c+")"),re=!0,c=new WebAssembly.RuntimeError(c+". Build with -sASSERTIONS for more info."),n(c),c}function ed(){return{a:{L:jT,Aa:HT,b:Px,$:cd,A:fd,pa:hd,X:md,Z:gd,qa:bd,na:yd,ga:_d,ma:vd,J:wd,Y:xd,V:Td,oa:Id,W:Sd,va:Ex,E:Dx,Q:kx,O:Lx,D:zx,v:Bx,s:Mx,P:Vx,z:qx,R:Kx,ja:Xx,T:Zx,aa:Jx,M:Yx,F:Qx,ia:xs,sa:eT,r:tT,Ca:nT,w:iT,o:aT,m:uT,c:ys,Ba:lT,n:cT,j:fT,u:hT,p:mT,f:gT,t:bT,l:yT,e:_T,k:vT,h:wT,g:xT,d:TT,da:IT,ea:ST,fa:$T,ba:Bd,ca:Md,N:Vd,xa:OT,ua:CT,i:DT,C:kT,G:NT,ta:PT,x:LT,ra:RT,U:zT,q:AT,y:BT,K:MT,S:VT,za:FT,ya:GT,ka:Wd,la:Hd,_:hs,B:jd,I:qd,ha:Kd,H:Xd,a:v,wa:fs}}}class ds{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var td=c=>{c.terminate(),c.onmessage=()=>{}},ps=[],nd=c=>{ir.length==0&&(ud(),sd(ir[0]));var p=ir.pop();if(!p)return 6;vo.push(p),Ir[c.Bb]=p,p.Bb=c.Bb;var m={Db:"run",hc:c.fc,Jb:c.Jb,Bb:c.Bb};return p.postMessage(m,c.Nb),0},or=0,Ke=(c,p,...m)=>{for(var y=2*m.length,w=ks(),O=Ds(8*y),N=O>>>3,G=0;G<m.length;G++){var q=m[G];typeof q=="bigint"?(B[N+2*G]=1n,B[N+2*G+1]=q):(B[N+2*G]=0n,Ce()[N+2*G+1>>>0]=q)}return c=ep(c,0,y,O,p),li(w),c};function fs(c){if(s)return Ke(0,1,c);if(I=c,!(0<or)){for(var p of vo)td(p);for(p of ir)td(p);ir=[],vo=[],Ir={},re=!0}g(0,new ds(c))}function rd(c){if(s)return Ke(1,0,c);hs(c)}var hs=c=>{if(I=c,s)throw rd(c),"unwind";fs(c)},ir=[],vo=[],od=[],Ir={},id=c=>{var p=c.Bb;delete Ir[p],ir.push(c),vo.splice(vo.indexOf(c),1),c.Bb=0,tp(p)};function ad(){od.forEach(c=>c())}var sd=c=>new Promise(p=>{c.onmessage=w=>{var O=(w=w.data).Db;if(w.Hb&&w.Hb!=Ps()){var N=Ir[w.Hb];N?N.postMessage(w,w.Nb):J(`Internal error! Worker sent a message "${O}" to target pthread ${w.Hb}, but that thread no longer exists!`)}else O==="checkMailbox"?ei():O==="spawnThread"?nd(w):O==="cleanupThread"?id(Ir[w.ic]):O==="loaded"?(c.loaded=!0,p(c)):w.target==="setimmediate"?c.postMessage(w):O==="callHandler"?t[w.Rb](...w.args):O&&J(`worker sent an unknown command ${O}`)},c.onerror=w=>{throw J(`worker sent an error! ${w.filename}:${w.lineno}: ${w.message}`),w};var m,y=[];for(m of[])t.propertyIsEnumerable(m)&&y.push(m);c.postMessage({Db:"load",Sb:y,kc:v,lc:x})});function ud(){var c=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ir.push(c)}var $x=c=>{Ae();var p=oe()[c+52>>>2>>>0];c=oe()[c+56>>>2>>>0],op(p,p-c),li(p)},Ax=(c,p)=>{or=0,c=ip(c,p),0<or?I=c:Cs(c)};class Ox{constructor(p){this.Ib=p-24}}function Px(c,p,m){var y=new Ox(c>>>=0);throw p>>>=0,m>>>=0,oe()[y.Ib+16>>>2>>>0]=0,oe()[y.Ib+4>>>2>>>0]=p,oe()[y.Ib+8>>>2>>>0]=m,c}function ld(c,p,m,y){return s?Ke(2,1,c,p,m,y):cd(c,p,m,y)}function cd(c,p,m,y){if(c>>>=0,m>>>=0,y>>>=0,u===void 0)return 6;var w=[];return s&&w.length===0?ld(c,p>>>=0,m,y):(c={fc:m,Bb:c,Jb:y,Nb:w},s?(c.Db="spawnThread",postMessage(c,w),0):nd(c))}var dd=typeof TextDecoder<"u"?new TextDecoder:void 0,pd=(c,p=0,m=NaN)=>{var y=(p>>>=0)+m;for(m=p;c[m]&&!(m>=y);)++m;if(16<m-p&&c.buffer&&dd)return dd.decode(c.buffer instanceof ArrayBuffer?c.subarray(p,m):c.slice(p,m));for(y="";p<m;){var w=c[p++];if(128&w){var O=63&c[p++];if((224&w)==192)y+=String.fromCharCode((31&w)<<6|O);else{var N=63&c[p++];65536>(w=(240&w)==224?(15&w)<<12|O<<6|N:(7&w)<<18|O<<12|N<<6|63&c[p++])?y+=String.fromCharCode(w):(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w))}}else y+=String.fromCharCode(w)}return y},tt=(c,p)=>(c>>>=0)?pd(Ie(),c,p):"";function fd(c,p,m){return s?Ke(3,1,c,p,m):0}function hd(c,p){if(s)return Ke(4,1,c,p)}function md(c,p){if(s)return Ke(5,1,c,p)}function gd(c,p,m){if(s)return Ke(6,1,c,p,m)}function bd(c,p,m){return s?Ke(7,1,c,p,m):0}function yd(c,p){if(s)return Ke(8,1,c,p)}function _d(c,p,m){if(s)return Ke(9,1,c,p,m)}function vd(c,p,m,y){if(s)return Ke(10,1,c,p,m,y)}function wd(c,p,m,y){if(s)return Ke(11,1,c,p,m,y)}function xd(c,p,m,y){if(s)return Ke(12,1,c,p,m,y)}function Td(c){if(s)return Ke(13,1,c)}function Id(c,p){if(s)return Ke(14,1,c,p)}function Sd(c,p,m){if(s)return Ke(15,1,c,p,m)}var $d,Ex=()=>rr(""),en=c=>{for(var p="";Ie()[c>>>0];)p+=$d[Ie()[c++>>>0]];return p},ms={},gs={},Cx={},Xr=t.BindingError=class extends Error{constructor(c){super(c),this.name="BindingError"}};function Kn(c,p,m={}){return(function(y,w,O={}){var N=w.name;if(!y)throw new Xr(`type "${N}" must have a positive integer typeid pointer`);if(gs.hasOwnProperty(y)){if(O.Tb)return;throw new Xr(`Cannot register type '${N}' twice`)}gs[y]=w,delete Cx[y],ms.hasOwnProperty(y)&&(w=ms[y],delete ms[y],w.forEach(G=>G()))})(c,p,m)}var Ad=(c,p,m)=>{switch(p){case 1:return m?y=>de()[y>>>0]:y=>Ie()[y>>>0];case 2:return m?y=>ge()[y>>>1>>>0]:y=>W()[y>>>1>>>0];case 4:return m?y=>D()[y>>>2>>>0]:y=>oe()[y>>>2>>>0];case 8:return m?y=>B[y>>>3]:y=>ae[y>>>3];default:throw new TypeError(`invalid integer width (${p}): ${c}`)}};function Dx(c,p,m){m>>>=0,Kn(c>>>=0,{name:p=en(p>>>0),fromWireType:y=>y,toWireType:function(y,w){if(typeof w!="bigint"&&typeof w!="number")throw w=w===null?"null":(y=typeof w)=="object"||y==="array"||y==="function"?w.toString():""+w,new TypeError(`Cannot convert "${w}" to ${this.name}`);return typeof w=="number"&&(w=BigInt(w)),w},Cb:ar,readValueFromPointer:Ad(p,m,p.indexOf("u")==-1),Eb:null})}var ar=8;function kx(c,p,m,y){Kn(c>>>=0,{name:p=en(p>>>0),fromWireType:function(w){return!!w},toWireType:function(w,O){return O?m:y},Cb:ar,readValueFromPointer:function(w){return this.fromWireType(Ie()[w>>>0])},Eb:null})}var bs=[],Xn=[];function ys(c){9<(c>>>=0)&&--Xn[c+1]===0&&(Xn[c]=void 0,bs.push(c))}var gt=c=>{if(!c)throw new Xr(`Cannot use deleted val. handle = ${c}`);return Xn[c]},Dt=c=>{switch(c){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=bs.pop()||Xn.length;return Xn[p]=c,Xn[p+1]=1,p}};function _s(c){return this.fromWireType(oe()[c>>>2>>>0])}var Nx={name:"emscripten::val",fromWireType:c=>{var p=gt(c);return ys(c),p},toWireType:(c,p)=>Dt(p),Cb:ar,readValueFromPointer:_s,Eb:null};function Lx(c){return Kn(c>>>0,Nx)}var Rx=(c,p)=>{switch(p){case 4:return function(m){return this.fromWireType(He()[m>>>2>>>0])};case 8:return function(m){return this.fromWireType(Ce()[m>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${c}`)}};function zx(c,p,m){m>>>=0,Kn(c>>>=0,{name:p=en(p>>>0),fromWireType:y=>y,toWireType:(y,w)=>w,Cb:ar,readValueFromPointer:Rx(p,m),Eb:null})}function Bx(c,p,m,y,w){if(c>>>=0,m>>>=0,p=en(p>>>0),w===-1&&(w=4294967295),w=G=>G,y===0){var O=32-8*m;w=G=>G<<O>>>O}var N=p.includes("unsigned")?function(G,q){return q>>>0}:function(G,q){return q};Kn(c,{name:p,fromWireType:w,toWireType:N,Cb:ar,readValueFromPointer:Ad(p,m,y!==0),Eb:null})}function Mx(c,p,m){function y(O){var N=oe()[O>>>2>>>0];return O=oe()[O+4>>>2>>>0],new w(de().buffer,O,N)}var w=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];Kn(c>>>=0,{name:m=en(m>>>0),fromWireType:y,Cb:ar,readValueFromPointer:y},{Tb:!0})}var Sr=(c,p,m)=>{var y=Ie();if(p>>>=0,0<m){var w=p;m=p+m-1;for(var O=0;O<c.length;++O){var N=c.charCodeAt(O);if(55296<=N&&57343>=N&&(N=65536+((1023&N)<<10)|1023&c.charCodeAt(++O)),127>=N){if(p>=m)break;y[p++>>>0]=N}else{if(2047>=N){if(p+1>=m)break;y[p++>>>0]=192|N>>6}else{if(65535>=N){if(p+2>=m)break;y[p++>>>0]=224|N>>12}else{if(p+3>=m)break;y[p++>>>0]=240|N>>18,y[p++>>>0]=128|N>>12&63}y[p++>>>0]=128|N>>6&63}y[p++>>>0]=128|63&N}}y[p>>>0]=0,c=p-w}else c=0;return c},vs=c=>{for(var p=0,m=0;m<c.length;++m){var y=c.charCodeAt(m);127>=y?p++:2047>=y?p+=2:55296<=y&&57343>=y?(p+=4,++m):p+=3}return p};function Vx(c,p){Kn(c>>>=0,{name:p=en(p>>>0),fromWireType:function(m){for(var y,w=oe()[m>>>2>>>0],O=m+4,N=O,G=0;G<=w;++G){var q=O+G;G!=w&&Ie()[q>>>0]!=0||(N=tt(N,q-N),y===void 0?y=N:(y+="\0",y+=N),N=q+1)}return Zn(m),y},toWireType:function(m,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var w=typeof y=="string";if(!(w||ArrayBuffer.isView(y)&&y.BYTES_PER_ELEMENT==1))throw new Xr("Cannot pass non-string to std::string");var O=w?vs(y):y.length,N=ui(4+O+1),G=N+4;return oe()[N>>>2>>>0]=O,w?Sr(y,G,O+1):Ie().set(y,G>>>0),m!==null&&m.push(Zn,N),N},Cb:ar,readValueFromPointer:_s,Eb(m){Zn(m)}})}var Od=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Fx=(c,p)=>{for(var m=c>>1,y=m+p/2;!(m>=y)&&W()[m>>>0];)++m;if(32<(m<<=1)-c&&Od)return Od.decode(Ie().slice(c,m));for(m="",y=0;!(y>=p/2);++y){var w=ge()[c+2*y>>>1>>>0];if(w==0)break;m+=String.fromCharCode(w)}return m},Gx=(c,p,m)=>{if(m??=2147483647,2>m)return 0;var y=p;m=(m-=2)<2*c.length?m/2:c.length;for(var w=0;w<m;++w){var O=c.charCodeAt(w);ge()[p>>>1>>>0]=O,p+=2}return ge()[p>>>1>>>0]=0,p-y},Ux=c=>2*c.length,Wx=(c,p)=>{for(var m=0,y="";!(m>=p/4);){var w=D()[c+4*m>>>2>>>0];if(w==0)break;++m,65536<=w?(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w)):y+=String.fromCharCode(w)}return y},Hx=(c,p,m)=>{if(p>>>=0,m??=2147483647,4>m)return 0;var y=p;m=y+m-4;for(var w=0;w<c.length;++w){var O=c.charCodeAt(w);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&c.charCodeAt(++w)),D()[p>>>2>>>0]=O,(p+=4)+4>m)break}return D()[p>>>2>>>0]=0,p-y},jx=c=>{for(var p=0,m=0;m<c.length;++m){var y=c.charCodeAt(m);55296<=y&&57343>=y&&++m,p+=4}return p};function qx(c,p,m){if(c>>>=0,p>>>=0,m=en(m>>>=0),p===2)var y=Fx,w=Gx,O=Ux,N=G=>W()[G>>>1>>>0];else p===4&&(y=Wx,w=Hx,O=jx,N=G=>oe()[G>>>2>>>0]);Kn(c,{name:m,fromWireType:G=>{for(var q,Q=oe()[G>>>2>>>0],se=G+4,be=0;be<=Q;++be){var Se=G+4+be*p;be!=Q&&N(Se)!=0||(se=y(se,Se-se),q===void 0?q=se:(q+="\0",q+=se),se=Se+p)}return Zn(G),q},toWireType:(G,q)=>{if(typeof q!="string")throw new Xr(`Cannot pass non-string to C++ string type ${m}`);var Q=O(q),se=ui(4+Q+p);return oe()[se>>>2>>>0]=Q/p,w(q,se+4,Q+p),G!==null&&G.push(Zn,se),se},Cb:ar,readValueFromPointer:_s,Eb(G){Zn(G)}})}function Kx(c,p){Kn(c>>>=0,{Ub:!0,name:p=en(p>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function Xx(c){Es(c>>>0,!a,1,!i,131072,!1),ad()}var ws=c=>{if(!re)try{if(c(),!(0<or))try{s?Cs(I):hs(I)}catch(p){p instanceof ds||p=="unwind"||g(0,p)}}catch(p){p instanceof ds||p=="unwind"||g(0,p)}};function xs(c){c>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(D(),c>>>2,c).value.then(ei),c+=128,Atomics.store(D(),c>>>2,1))}var ei=()=>{var c=Ps();c&&(xs(c),ws(rp))};function Zx(c,p){(c>>>=0)==p>>>0?setTimeout(ei):s?postMessage({Hb:c,Db:"checkMailbox"}):(c=Ir[c])&&c.postMessage({Db:"checkMailbox"})}var Ts=[];function Jx(c,p,m,y,w){for(p>>>=0,y/=2,Ts.length=y,m=w>>>0>>>3,w=0;w<y;w++)Ts[w]=B[m+2*w]?B[m+2*w+1]:Ce()[m+2*w+1>>>0];return(p?Os[p]:WT[c])(...Ts)}var Yx=()=>{or=0};function Qx(c){c>>>=0,s?postMessage({Db:"cleanupThread",ic:c}):id(Ir[c])}function eT(c){}var ti=(c,p)=>{var m=gs[c];if(m===void 0)throw c=Jd(c),m=en(c),Zn(c),new Xr(`${p} has unknown type ${m}`);return m},Pd=(c,p,m)=>{var y=[];return c=c.toWireType(y,m),y.length&&(oe()[p>>>2>>>0]=Dt(y)),c};function tT(c,p,m){return p>>>=0,m>>>=0,c=gt(c>>>0),p=ti(p,"emval::as"),Pd(p,m,c)}function nT(c,p){return p>>>=0,c=gt(c>>>0),(p=ti(p,"emval::as")).toWireType(null,c)}var ni=c=>{try{c()}catch(p){rr(p)}},sr=0,tn=null,Ed=0,ri=[],Cd={},Dd={},rT=0,Is=null,oT=[];function kd(c){return(function(p){if(!re){if(sr===0){var m=!1,y=!1;p((w=0)=>{if(!re&&(Ed=w,m=!0,y)){sr=2,ni(()=>up(tn)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),w=!1;try{var O=(function(){var q=D()[tn+8>>>2>>>0];return q=U[Dd[q]],--or,q()})()}catch(q){O=q,w=!0}var N=!1;if(!tn){var G=Is;G&&(Is=null,(w?G.reject:G.resolve)(O),N=!0)}if(w&&!N)throw O}}),y=!0,m||(sr=1,tn=(function(){var w=ui(65548),O=w+12;oe()[w>>>2>>>0]=O,oe()[w+4>>>2>>>0]=O+65536,O=ri[0];var N=Cd[O];return N===void 0&&(N=rT++,Cd[O]=N,Dd[N]=O),O=N,D()[w+8>>>2>>>0]=O,w})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),ni(()=>ap(tn)))}else sr===2?(sr=0,ni(lp),Zn(tn),tn=null,oT.forEach(ws)):rr(`invalid state: ${sr}`);return Ed}})(p=>{c().then(p)})}function iT(c){return c>>>=0,kd(async()=>{var p=await gt(c);return Dt(p)})}var oi=[];function aT(c,p,m,y){return m>>>=0,y>>>=0,(c=oi[c>>>0])(null,p=gt(p>>>0),m,y)}var sT={},ii=c=>{var p=sT[c];return p===void 0?en(c):p};function uT(c,p,m,y,w){return m>>>=0,y>>>=0,w>>>=0,(c=oi[c>>>0])(p=gt(p>>>0),p[m=ii(m)],y,w)}function lT(c,p){return p>>>=0,(c=gt(c>>>0))==gt(p)}var Nd=()=>typeof globalThis=="object"?globalThis:Function("return this")();function cT(c){return(c>>>=0)==0?Dt(Nd()):(c=ii(c),Dt(Nd()[c]))}var dT=c=>{var p=oi.length;return oi.push(c),p},pT=(c,p)=>{for(var m=Array(c),y=0;y<c;++y)m[y]=ti(oe()[p+4*y>>>2>>>0],`parameter ${y}`);return m};function fT(c,p,m){var y=(p=pT(c,p>>>0)).shift();c--;var w=`return function (obj, func, destructorsRef, args) {
`,O=0,N=[];m===0&&N.push("obj");for(var G=["retType"],q=[y],Q=0;Q<c;++Q)N.push(`arg${Q}`),G.push(`argType${Q}`),q.push(p[Q]),w+=`  var arg${Q} = argType${Q}.readValueFromPointer(args${O?"+"+O:""});
`,O+=p[Q].Cb;return w+=`  var rv = ${m===1?"new func":"func.call"}(${N.join(", ")});
`,y.Ub||(G.push("emval_returnValue"),q.push(Pd),w+=`  return emval_returnValue(retType, destructorsRef, rv);
`),c=new Function(...G,w+`};
`)(...q),m=`methodCaller<(${p.map(se=>se.name).join(", ")}) => ${y.name}>`,dT(Object.defineProperty(c,"name",{value:m}))}function hT(c){return c=ii(c>>>0),Dt(t[c])}function mT(c,p){return p>>>=0,c=gt(c>>>0),p=gt(p),Dt(c[p])}function gT(c){9<(c>>>=0)&&(Xn[c+1]+=1)}function bT(){return Dt([])}function yT(c){c=gt(c>>>0);for(var p=Array(c.length),m=0;m<c.length;m++)p[m]=c[m];return Dt(p)}function _T(c){return Dt(ii(c>>>0))}function vT(){return Dt({})}function wT(c){for(var p=gt(c>>>=0);p.length;){var m=p.pop();p.pop()(m)}ys(c)}function xT(c,p,m){p>>>=0,m>>>=0,c=gt(c>>>0),p=gt(p),m=gt(m),c[p]=m}function TT(c,p){return p>>>=0,c=(c=ti(c>>>0,"_emval_take_value")).readValueFromPointer(p),Dt(c)}function IT(c,p){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),p>>>=0,c=new Date(1e3*c),D()[p>>>2>>>0]=c.getUTCSeconds(),D()[p+4>>>2>>>0]=c.getUTCMinutes(),D()[p+8>>>2>>>0]=c.getUTCHours(),D()[p+12>>>2>>>0]=c.getUTCDate(),D()[p+16>>>2>>>0]=c.getUTCMonth(),D()[p+20>>>2>>>0]=c.getUTCFullYear()-1900,D()[p+24>>>2>>>0]=c.getUTCDay(),c=(c.getTime()-Date.UTC(c.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[p+28>>>2>>>0]=c}var Ld=c=>c%4==0&&(c%100!=0||c%400==0),Rd=[0,31,60,91,121,152,182,213,244,274,305,335],zd=[0,31,59,90,120,151,181,212,243,273,304,334];function ST(c,p){c=-9007199254740992>c||9007199254740992<c?NaN:Number(c),p>>>=0,c=new Date(1e3*c),D()[p>>>2>>>0]=c.getSeconds(),D()[p+4>>>2>>>0]=c.getMinutes(),D()[p+8>>>2>>>0]=c.getHours(),D()[p+12>>>2>>>0]=c.getDate(),D()[p+16>>>2>>>0]=c.getMonth(),D()[p+20>>>2>>>0]=c.getFullYear()-1900,D()[p+24>>>2>>>0]=c.getDay();var m=(Ld(c.getFullYear())?Rd:zd)[c.getMonth()]+c.getDate()-1|0;D()[p+28>>>2>>>0]=m,D()[p+36>>>2>>>0]=-60*c.getTimezoneOffset(),m=new Date(c.getFullYear(),6,1).getTimezoneOffset();var y=new Date(c.getFullYear(),0,1).getTimezoneOffset();c=0|(m!=y&&c.getTimezoneOffset()==Math.min(y,m)),D()[p+32>>>2>>>0]=c}function $T(c){c>>>=0;var p=new Date(D()[c+20>>>2>>>0]+1900,D()[c+16>>>2>>>0],D()[c+12>>>2>>>0],D()[c+8>>>2>>>0],D()[c+4>>>2>>>0],D()[c>>>2>>>0],0),m=D()[c+32>>>2>>>0],y=p.getTimezoneOffset(),w=new Date(p.getFullYear(),6,1).getTimezoneOffset(),O=new Date(p.getFullYear(),0,1).getTimezoneOffset(),N=Math.min(O,w);return 0>m?D()[c+32>>>2>>>0]=+(w!=O&&N==y):0<m!=(N==y)&&(w=Math.max(O,w),p.setTime(p.getTime()+6e4*((0<m?N:w)-y))),D()[c+24>>>2>>>0]=p.getDay(),m=(Ld(p.getFullYear())?Rd:zd)[p.getMonth()]+p.getDate()-1|0,D()[c+28>>>2>>>0]=m,D()[c>>>2>>>0]=p.getSeconds(),D()[c+4>>>2>>>0]=p.getMinutes(),D()[c+8>>>2>>>0]=p.getHours(),D()[c+12>>>2>>>0]=p.getDate(),D()[c+16>>>2>>>0]=p.getMonth(),D()[c+20>>>2>>>0]=p.getYear(),c=p.getTime(),BigInt(isNaN(c)?-1:c/1e3)}function Bd(c,p,m,y,w,O,N){return s?Ke(16,1,c,p,m,y,w,O,N):-52}function Md(c,p,m,y,w,O){if(s)return Ke(17,1,c,p,m,y,w,O)}var wo={},AT=()=>performance.timeOrigin+performance.now();function Vd(c,p){if(s)return Ke(18,1,c,p);if(wo[c]&&(clearTimeout(wo[c].id),delete wo[c]),!p)return 0;var m=setTimeout(()=>{delete wo[c],ws(()=>np(c,performance.timeOrigin+performance.now()))},p);return wo[c]={id:m,rc:p},0}function OT(c,p,m,y){c>>>=0,p>>>=0,m>>>=0,y>>>=0;var w=new Date().getFullYear(),O=new Date(w,0,1).getTimezoneOffset();w=new Date(w,6,1).getTimezoneOffset();var N=Math.max(O,w);oe()[c>>>2>>>0]=60*N,D()[p>>>2>>>0]=+(O!=w),c=(p=G=>{var q=Math.abs(G);return`UTC${0<=G?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`})(O),p=p(w),w<O?(Sr(c,m,17),Sr(p,y,17)):(Sr(c,y,17),Sr(p,m,17))}var PT=()=>Date.now(),ET=1;function CT(c,p,m){if(!(0<=c&&3>=c))return 28;if(c===0)c=Date.now();else{if(!ET)return 52;c=performance.timeOrigin+performance.now()}return B[m>>>0>>>3]=BigInt(Math.round(1e6*c)),0}var Ss=[],Fd=(c,p)=>{Ss.length=0;for(var m;m=Ie()[c++>>>0];){var y=m!=105;p+=(y&=m!=112)&&p%8?4:0,Ss.push(m==112?oe()[p>>>2>>>0]:m==106?B[p>>>3]:m==105?D()[p>>>2>>>0]:Ce()[p>>>3>>>0]),p+=y?8:4}return Ss};function DT(c,p,m){return c>>>=0,p=Fd(p>>>0,m>>>0),Os[c](...p)}function kT(c,p,m){return c>>>=0,p=Fd(p>>>0,m>>>0),Os[c](...p)}var NT=()=>{};function LT(c,p){return J(tt(c>>>0,p>>>0))}var RT=()=>{throw or+=1,"unwind"};function zT(){return 4294901760}var BT=()=>navigator.hardwareConcurrency;function MT(){return rr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function VT(c){c>>>=0;var p=Ie().length;if(c<=p||4294901760<c)return!1;for(var m=1;4>=m;m*=2){var y=p*(1+.2/m);y=Math.min(y,c+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(c,y)/65536))-v.buffer.byteLength+65535)/65536|0;try{v.grow(y),Ae();var w=1;break e}catch{}w=void 0}if(w)return!0}return!1}var ai=()=>(rr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Zr={},Gd=c=>{c.forEach(p=>{var m=ai();m&&(Zr[m]=p)})};function FT(){var c=Error().stack.toString().split(`
`);return c[0]=="Error"&&c.shift(),Gd(c),Zr.Mb=ai(),Zr.dc=c,Zr.Mb}function GT(c,p,m){if(c>>>=0,p>>>=0,Zr.Mb==c)var y=Zr.dc;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),Gd(y);for(var w=3;y[w]&&ai()!=c;)++w;for(c=0;c<m&&y[c+w];++c)D()[p+4*c>>>2>>>0]=ai();return c}var $s,As={},Ud=()=>{if(!$s){var c,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(c in As)As[c]===void 0?delete p[c]:p[c]=As[c];var m=[];for(c in p)m.push(`${c}=${p[c]}`);$s=m}return $s};function Wd(c,p){if(s)return Ke(19,1,c,p);c>>>=0,p>>>=0;var m,y=0,w=0;for(m of Ud()){var O=p+y;oe()[c+w>>>2>>>0]=O,y+=Sr(m,O,1/0)+1,w+=4}return 0}function Hd(c,p){if(s)return Ke(20,1,c,p);c>>>=0,p>>>=0;var m=Ud();for(var y of(oe()[c>>>2>>>0]=m.length,c=0,m))c+=vs(y)+1;return oe()[p>>>2>>>0]=c,0}function jd(c){return s?Ke(21,1,c):52}function qd(c,p,m,y){return s?Ke(22,1,c,p,m,y):52}function Kd(c,p,m,y){return s?Ke(23,1,c,p,m,y):70}var UT=[null,[],[]];function Xd(c,p,m,y){if(s)return Ke(24,1,c,p,m,y);p>>>=0,m>>>=0,y>>>=0;for(var w=0,O=0;O<m;O++){var N=oe()[p>>>2>>>0],G=oe()[p+4>>>2>>>0];p+=8;for(var q=0;q<G;q++){var Q=c,se=Ie()[N+q>>>0],be=UT[Q];se===0||se===10?((Q===1?te:J)(pd(be)),be.length=0):be.push(se)}w+=G}return oe()[y>>>2>>>0]=w,0}s||(function(){for(var c=t.numThreads-1;c--;)ud();ps.push(()=>{Qt++,(function(p){s?p():Promise.all(ir.map(sd)).then(p)})(()=>cs())})})();for(var Zd=Array(256),si=0;256>si;++si)Zd[si]=String.fromCharCode(si);$d=Zd,Xn.push(0,1,void 0,1,null,1,!0,1,!1,1),t.count_emval_handles=()=>Xn.length/2-5-bs.length,s||(v=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Ae()),t.wasmBinary&&(T=t.wasmBinary),t.stackSave=()=>ks(),t.stackRestore=c=>li(c),t.stackAlloc=c=>Ds(c),t.setValue=function(c,p,m="i8"){switch(m.endsWith("*")&&(m="*"),m){case"i1":case"i8":de()[c>>>0]=p;break;case"i16":ge()[c>>>1>>>0]=p;break;case"i32":D()[c>>>2>>>0]=p;break;case"i64":B[c>>>3]=BigInt(p);break;case"float":He()[c>>>2>>>0]=p;break;case"double":Ce()[c>>>3>>>0]=p;break;case"*":oe()[c>>>2>>>0]=p;break;default:rr(`invalid type for setValue: ${m}`)}},t.getValue=function(c,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return de()[c>>>0];case"i16":return ge()[c>>>1>>>0];case"i32":return D()[c>>>2>>>0];case"i64":return B[c>>>3];case"float":return He()[c>>>2>>>0];case"double":return Ce()[c>>>3>>>0];case"*":return oe()[c>>>2>>>0];default:rr(`invalid type for getValue: ${p}`)}},t.UTF8ToString=tt,t.stringToUTF8=Sr,t.lengthBytesUTF8=vs;var WT=[fs,rd,ld,fd,hd,md,gd,bd,yd,_d,vd,wd,xd,Td,Id,Sd,Bd,Md,Vd,Wd,Hd,jd,qd,Kd,Xd],Os={1299348:(c,p,m,y,w)=>{if(t===void 0||!t.Fb)return 1;if((c=tt(Number(c>>>0))).startsWith("./")&&(c=c.substring(2)),!(c=t.Fb.get(c)))return 2;if(p=Number(p>>>0),m=Number(m>>>0),y=Number(y>>>0),p+m>c.byteLength)return 3;try{let O=c.subarray(p,p+m);switch(w){case 0:Ie().set(O,y>>>0);break;case 1:t.mc?t.mc(y,O):t.cc(y,O);break;default:return 4}return 0}catch{return 4}},1300172:(c,p,m)=>{t.Pb(c,Ie().subarray(p>>>0,p+m>>>0))},1300236:()=>t.oc(),1300278:c=>{t.Ob(c)},1300315:()=>{t.Wb()},1300346:()=>{t.Xb()},1300375:()=>{t.ac()},1300400:c=>t.Vb(c),1300433:c=>t.Zb(c),1300465:(c,p,m)=>{t.Lb(Number(c),Number(p),Number(m),!0)},1300528:(c,p,m)=>{t.Lb(Number(c),Number(p),Number(m))},1300585:()=>typeof wasmOffsetConverter<"u",1300642:c=>{t.Ab("Abs",c,void 0)},1300693:c=>{t.Ab("Neg",c,void 0)},1300744:c=>{t.Ab("Floor",c,void 0)},1300797:c=>{t.Ab("Ceil",c,void 0)},1300849:c=>{t.Ab("Reciprocal",c,void 0)},1300907:c=>{t.Ab("Sqrt",c,void 0)},1300959:c=>{t.Ab("Exp",c,void 0)},1301010:c=>{t.Ab("Erf",c,void 0)},1301061:c=>{t.Ab("Sigmoid",c,void 0)},1301116:(c,p,m)=>{t.Ab("HardSigmoid",c,{alpha:p,beta:m})},1301195:c=>{t.Ab("Log",c,void 0)},1301246:c=>{t.Ab("Sin",c,void 0)},1301297:c=>{t.Ab("Cos",c,void 0)},1301348:c=>{t.Ab("Tan",c,void 0)},1301399:c=>{t.Ab("Asin",c,void 0)},1301451:c=>{t.Ab("Acos",c,void 0)},1301503:c=>{t.Ab("Atan",c,void 0)},1301555:c=>{t.Ab("Sinh",c,void 0)},1301607:c=>{t.Ab("Cosh",c,void 0)},1301659:c=>{t.Ab("Asinh",c,void 0)},1301712:c=>{t.Ab("Acosh",c,void 0)},1301765:c=>{t.Ab("Atanh",c,void 0)},1301818:c=>{t.Ab("Tanh",c,void 0)},1301870:c=>{t.Ab("Not",c,void 0)},1301921:(c,p,m)=>{t.Ab("Clip",c,{min:p,max:m})},1301990:c=>{t.Ab("Clip",c,void 0)},1302042:(c,p)=>{t.Ab("Elu",c,{alpha:p})},1302100:c=>{t.Ab("Gelu",c,void 0)},1302152:c=>{t.Ab("Relu",c,void 0)},1302204:(c,p)=>{t.Ab("LeakyRelu",c,{alpha:p})},1302268:(c,p)=>{t.Ab("ThresholdedRelu",c,{alpha:p})},1302338:(c,p)=>{t.Ab("Cast",c,{to:p})},1302396:c=>{t.Ab("Add",c,void 0)},1302447:c=>{t.Ab("Sub",c,void 0)},1302498:c=>{t.Ab("Mul",c,void 0)},1302549:c=>{t.Ab("Div",c,void 0)},1302600:c=>{t.Ab("Pow",c,void 0)},1302651:c=>{t.Ab("Equal",c,void 0)},1302704:c=>{t.Ab("Greater",c,void 0)},1302759:c=>{t.Ab("GreaterOrEqual",c,void 0)},1302821:c=>{t.Ab("Less",c,void 0)},1302873:c=>{t.Ab("LessOrEqual",c,void 0)},1302932:(c,p,m,y,w)=>{t.Ab("ReduceMean",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1303107:(c,p,m,y,w)=>{t.Ab("ReduceMax",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1303281:(c,p,m,y,w)=>{t.Ab("ReduceMin",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1303455:(c,p,m,y,w)=>{t.Ab("ReduceProd",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1303630:(c,p,m,y,w)=>{t.Ab("ReduceSum",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1303804:(c,p,m,y,w)=>{t.Ab("ReduceL1",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1303977:(c,p,m,y,w)=>{t.Ab("ReduceL2",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1304150:(c,p,m,y,w)=>{t.Ab("ReduceLogSum",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1304327:(c,p,m,y,w)=>{t.Ab("ReduceSumSquare",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1304507:(c,p,m,y,w)=>{t.Ab("ReduceLogSumExp",c,{keepDims:!!p,noopWithEmptyAxes:!!m,axes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1304687:c=>{t.Ab("Where",c,void 0)},1304740:(c,p,m)=>{t.Ab("Transpose",c,{perm:p?Array.from(D().subarray(Number(p)>>>0,Number(m)>>>0)):[]})},1304864:(c,p,m,y)=>{t.Ab("DepthToSpace",c,{blocksize:p,mode:tt(m),format:y?"NHWC":"NCHW"})},1304997:(c,p,m,y)=>{t.Ab("DepthToSpace",c,{blocksize:p,mode:tt(m),format:y?"NHWC":"NCHW"})},1305130:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it)=>{t.Ab("ConvTranspose",c,{format:q?"NHWC":"NCHW",autoPad:p,dilations:[m],group:y,kernelShape:[w],pads:[O,N],strides:[G],wIsConst:()=>!!de()[Q>>>0],outputPadding:se?Array.from(D().subarray(Number(se)>>>0,Number(be)>>>0)):[],outputShape:Se?Array.from(D().subarray(Number(Se)>>>0,Number(Le)>>>0)):[],activation:tt(it)})},1305563:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le)=>{t.Ab("ConvTranspose",c,{format:G?"NHWC":"NCHW",autoPad:p,dilations:Array.from(D().subarray(Number(m)>>>0,(Number(m)>>>0)+2>>>0)),group:y,kernelShape:Array.from(D().subarray(Number(w)>>>0,(Number(w)>>>0)+2>>>0)),pads:Array.from(D().subarray(Number(O)>>>0,(Number(O)>>>0)+4>>>0)),strides:Array.from(D().subarray(Number(N)>>>0,(Number(N)>>>0)+2>>>0)),wIsConst:()=>!!de()[q>>>0],outputPadding:Q?Array.from(D().subarray(Number(Q)>>>0,Number(se)>>>0)):[],outputShape:be?Array.from(D().subarray(Number(be)>>>0,Number(Se)>>>0)):[],activation:tt(Le)})},1306224:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it)=>{t.Ab("ConvTranspose",c,{format:q?"NHWC":"NCHW",autoPad:p,dilations:[m],group:y,kernelShape:[w],pads:[O,N],strides:[G],wIsConst:()=>!!de()[Q>>>0],outputPadding:se?Array.from(D().subarray(Number(se)>>>0,Number(be)>>>0)):[],outputShape:Se?Array.from(D().subarray(Number(Se)>>>0,Number(Le)>>>0)):[],activation:tt(it)})},1306657:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le)=>{t.Ab("ConvTranspose",c,{format:G?"NHWC":"NCHW",autoPad:p,dilations:Array.from(D().subarray(Number(m)>>>0,(Number(m)>>>0)+2>>>0)),group:y,kernelShape:Array.from(D().subarray(Number(w)>>>0,(Number(w)>>>0)+2>>>0)),pads:Array.from(D().subarray(Number(O)>>>0,(Number(O)>>>0)+4>>>0)),strides:Array.from(D().subarray(Number(N)>>>0,(Number(N)>>>0)+2>>>0)),wIsConst:()=>!!de()[q>>>0],outputPadding:Q?Array.from(D().subarray(Number(Q)>>>0,Number(se)>>>0)):[],outputShape:be?Array.from(D().subarray(Number(be)>>>0,Number(Se)>>>0)):[],activation:tt(Le)})},1307318:(c,p)=>{t.Ab("GlobalAveragePool",c,{format:p?"NHWC":"NCHW"})},1307409:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le)=>{t.Ab("AveragePool",c,{format:Le?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],kernel_shape:G?Array.from(D().subarray(Number(G)>>>0,Number(q)>>>0)):[],pads:Q?Array.from(D().subarray(Number(Q)>>>0,Number(se)>>>0)):[],strides:be?Array.from(D().subarray(Number(be)>>>0,Number(Se)>>>0)):[]})},1307888:(c,p)=>{t.Ab("GlobalAveragePool",c,{format:p?"NHWC":"NCHW"})},1307979:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le)=>{t.Ab("AveragePool",c,{format:Le?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],kernel_shape:G?Array.from(D().subarray(Number(G)>>>0,Number(q)>>>0)):[],pads:Q?Array.from(D().subarray(Number(Q)>>>0,Number(se)>>>0)):[],strides:be?Array.from(D().subarray(Number(be)>>>0,Number(Se)>>>0)):[]})},1308458:(c,p)=>{t.Ab("GlobalMaxPool",c,{format:p?"NHWC":"NCHW"})},1308545:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le)=>{t.Ab("MaxPool",c,{format:Le?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],kernel_shape:G?Array.from(D().subarray(Number(G)>>>0,Number(q)>>>0)):[],pads:Q?Array.from(D().subarray(Number(Q)>>>0,Number(se)>>>0)):[],strides:be?Array.from(D().subarray(Number(be)>>>0,Number(Se)>>>0)):[]})},1309020:(c,p)=>{t.Ab("GlobalMaxPool",c,{format:p?"NHWC":"NCHW"})},1309107:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le)=>{t.Ab("MaxPool",c,{format:Le?"NHWC":"NCHW",auto_pad:p,ceil_mode:m,count_include_pad:y,storage_order:w,dilations:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],kernel_shape:G?Array.from(D().subarray(Number(G)>>>0,Number(q)>>>0)):[],pads:Q?Array.from(D().subarray(Number(Q)>>>0,Number(se)>>>0)):[],strides:be?Array.from(D().subarray(Number(be)>>>0,Number(Se)>>>0)):[]})},1309582:(c,p,m,y,w)=>{t.Ab("Gemm",c,{alpha:p,beta:m,transA:y,transB:w})},1309686:c=>{t.Ab("MatMul",c,void 0)},1309740:(c,p,m,y)=>{t.Ab("ArgMax",c,{keepDims:!!p,selectLastIndex:!!m,axis:y})},1309848:(c,p,m,y)=>{t.Ab("ArgMin",c,{keepDims:!!p,selectLastIndex:!!m,axis:y})},1309956:(c,p)=>{t.Ab("Softmax",c,{axis:p})},1310019:(c,p)=>{t.Ab("Concat",c,{axis:p})},1310079:(c,p,m,y,w)=>{t.Ab("Split",c,{axis:p,numOutputs:m,splitSizes:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1310235:c=>{t.Ab("Expand",c,void 0)},1310289:(c,p)=>{t.Ab("Gather",c,{axis:Number(p)})},1310360:(c,p)=>{t.Ab("GatherElements",c,{axis:Number(p)})},1310439:(c,p)=>{t.Ab("GatherND",c,{batch_dims:Number(p)})},1310518:(c,p,m,y,w,O,N,G,q,Q,se)=>{t.Ab("Resize",c,{antialias:p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(y)>>>0)):[],coordinateTransformMode:tt(w),cubicCoeffA:O,excludeOutside:N,extrapolationValue:G,keepAspectRatioPolicy:tt(q),mode:tt(Q),nearestMode:tt(se)})},1310880:(c,p,m,y,w,O,N)=>{t.Ab("Slice",c,{starts:p?Array.from(D().subarray(Number(p)>>>0,Number(m)>>>0)):[],ends:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[],axes:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[]})},1311144:c=>{t.Ab("Tile",c,void 0)},1311196:(c,p,m)=>{t.Ab("InstanceNormalization",c,{epsilon:p,format:m?"NHWC":"NCHW"})},1311310:(c,p,m)=>{t.Ab("InstanceNormalization",c,{epsilon:p,format:m?"NHWC":"NCHW"})},1311424:c=>{t.Ab("Range",c,void 0)},1311477:(c,p)=>{t.Ab("Einsum",c,{equation:tt(p)})},1311558:(c,p,m,y,w)=>{t.Ab("Pad",c,{mode:p,value:m,pads:y?Array.from(D().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},1311701:(c,p,m,y,w,O)=>{t.Ab("BatchNormalization",c,{epsilon:p,momentum:m,spatial:!!w,trainingMode:!!y,format:O?"NHWC":"NCHW"})},1311870:(c,p,m,y,w,O)=>{t.Ab("BatchNormalization",c,{epsilon:p,momentum:m,spatial:!!w,trainingMode:!!y,format:O?"NHWC":"NCHW"})},1312039:(c,p,m)=>{t.Ab("CumSum",c,{exclusive:Number(p),reverse:Number(m)})},1312136:(c,p,m)=>{t.Ab("DequantizeLinear",c,{axis:p,blockSize:m})},1312226:(c,p,m,y,w)=>{t.Ab("GridSample",c,{align_corners:p,mode:tt(m),padding_mode:tt(y),format:w?"NHWC":"NCHW"})},1312396:(c,p,m,y,w)=>{t.Ab("GridSample",c,{align_corners:p,mode:tt(m),padding_mode:tt(y),format:w?"NHWC":"NCHW"})},1312566:(c,p)=>{t.Ab("ScatterND",c,{reduction:tt(p)})},1312651:(c,p,m,y,w,O,N,G,q)=>{t.Ab("Attention",c,{numHeads:p,isUnidirectional:m,maskFilterValue:y,scale:w,doRotary:O,qkvHiddenSizes:N?Array.from(D().subarray(Number(G)>>>0,Number(G)+N>>>0)):[],pastPresentShareBuffer:!!q})},1312923:c=>{t.Ab("BiasAdd",c,void 0)},1312978:c=>{t.Ab("BiasSplitGelu",c,void 0)},1313039:c=>{t.Ab("FastGelu",c,void 0)},1313095:(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St)=>{t.Ab("Conv",c,{format:be?"NHWC":"NCHW",auto_pad:p,dilations:m?Array.from(D().subarray(Number(m)>>>0,Number(y)>>>0)):[],group:w,kernel_shape:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],pads:G?Array.from(D().subarray(Number(G)>>>0,Number(q)>>>0)):[],strides:Q?Array.from(D().subarray(Number(Q)>>>0,Number(se)>>>0)):[],w_is_const:()=>!!de()[Number(Se)>>>0],activation:tt(Le),activation_params:it?Array.from(He().subarray(Number(it)>>>0,Number(St)>>>0)):[]})},1313679:c=>{t.Ab("Gelu",c,void 0)},1313731:(c,p,m,y,w,O,N,G,q)=>{t.Ab("GroupQueryAttention",c,{numHeads:p,kvNumHeads:m,scale:y,softcap:w,doRotary:O,rotaryInterleaved:N,smoothSoftmax:G,localWindowSize:q})},1313948:(c,p,m,y)=>{t.Ab("LayerNormalization",c,{axis:p,epsilon:m,simplified:!!y})},1314059:(c,p,m,y)=>{t.Ab("LayerNormalization",c,{axis:p,epsilon:m,simplified:!!y})},1314170:(c,p,m,y,w,O)=>{t.Ab("MatMulNBits",c,{k:p,n:m,accuracyLevel:y,bits:w,blockSize:O})},1314297:(c,p,m,y,w,O)=>{t.Ab("MultiHeadAttention",c,{numHeads:p,isUnidirectional:m,maskFilterValue:y,scale:w,doRotary:O})},1314456:(c,p)=>{t.Ab("QuickGelu",c,{alpha:p})},1314520:(c,p,m,y,w)=>{t.Ab("RotaryEmbedding",c,{interleaved:!!p,numHeads:m,rotaryEmbeddingDim:y,scale:w})},1314659:(c,p,m)=>{t.Ab("SkipLayerNormalization",c,{epsilon:p,simplified:!!m})},1314761:(c,p,m)=>{t.Ab("SkipLayerNormalization",c,{epsilon:p,simplified:!!m})},1314863:(c,p,m,y)=>{t.Ab("GatherBlockQuantized",c,{gatherAxis:p,quantizeAxis:m,blockSize:y})},1314984:c=>{t.$b(c)},1315018:(c,p)=>t.bc(Number(c),Number(p),t.Gb.ec,t.Gb.errors)};function HT(c,p,m){return kd(async()=>{await t.Yb(Number(c),Number(p),Number(m))})}function jT(){return typeof wasmOffsetConverter<"u"}var U=await(async function(){function c(y,w){return U=y.exports,U=(function(){var O=U,N={};for(let[G,q]of Object.entries(O))N[G]=typeof q=="function"?(...Q)=>{ri.push(G);try{return q(...Q)}finally{re||(ri.pop(),tn&&sr===1&&ri.length===0&&(sr=0,or+=1,ni(sp),typeof Fibers<"u"&&Fibers.sc()))}}:q;return N})(),U=(function(){var O=U,N=q=>Q=>q(Q)>>>0,G=q=>()=>q()>>>0;return(O=Object.assign({},O)).Ea=N(O.Ea),O.gb=G(O.gb),O.ib=N(O.ib),O.tb=N(O.tb),O.ub=G(O.ub),O.__cxa_get_exception_ptr=N(O.__cxa_get_exception_ptr),O})(),od.push(U.jb),x=w,cs(),U}Qt++;var p=ed();if(t.instantiateWasm)return new Promise(y=>{t.instantiateWasm(p,(w,O)=>{y(c(w,O))})});if(s)return new Promise(y=>{S=w=>{var O=new WebAssembly.Instance(w,ed());y(c(O,w))}});Ct??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",_):_+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var m=await(async function(y){var w=Ct;if(!T&&typeof WebAssembly.instantiateStreaming=="function"&&!pe(w))try{var O=fetch(w,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(O,y)}catch(N){J(`wasm streaming compile failed: ${N}`),J("falling back to ArrayBuffer instantiation")}return(async function(N,G){try{var q=await(async function(Q){if(!T)try{var se=await f(Q);return new Uint8Array(se)}catch{}if(Q==Ct&&T)Q=new Uint8Array(T);else{if(!h)throw"both async and sync fetching of the wasm failed";Q=h(Q)}return Q})(N);return await WebAssembly.instantiate(q,G)}catch(Q){J(`failed to asynchronously prepare wasm: ${Q}`),rr(Q)}})(w,y)})(p);return c(m.instance,m.module)}catch(y){return n(y),Promise.reject(y)}})(),Jd=c=>(Jd=U.Ea)(c),Yd=()=>(Yd=U.Fa)();t._OrtInit=(c,p)=>(t._OrtInit=U.Ga)(c,p),t._OrtGetLastError=(c,p)=>(t._OrtGetLastError=U.Ha)(c,p),t._OrtCreateSessionOptions=(c,p,m,y,w,O,N,G,q,Q)=>(t._OrtCreateSessionOptions=U.Ia)(c,p,m,y,w,O,N,G,q,Q),t._OrtAppendExecutionProvider=(c,p,m,y,w)=>(t._OrtAppendExecutionProvider=U.Ja)(c,p,m,y,w),t._OrtAddFreeDimensionOverride=(c,p,m)=>(t._OrtAddFreeDimensionOverride=U.Ka)(c,p,m),t._OrtAddSessionConfigEntry=(c,p,m)=>(t._OrtAddSessionConfigEntry=U.La)(c,p,m),t._OrtReleaseSessionOptions=c=>(t._OrtReleaseSessionOptions=U.Ma)(c),t._OrtCreateSession=(c,p,m)=>(t._OrtCreateSession=U.Na)(c,p,m),t._OrtReleaseSession=c=>(t._OrtReleaseSession=U.Oa)(c),t._OrtGetInputOutputCount=(c,p,m)=>(t._OrtGetInputOutputCount=U.Pa)(c,p,m),t._OrtGetInputOutputMetadata=(c,p,m,y)=>(t._OrtGetInputOutputMetadata=U.Qa)(c,p,m,y),t._OrtFree=c=>(t._OrtFree=U.Ra)(c),t._OrtCreateTensor=(c,p,m,y,w,O)=>(t._OrtCreateTensor=U.Sa)(c,p,m,y,w,O),t._OrtGetTensorData=(c,p,m,y,w)=>(t._OrtGetTensorData=U.Ta)(c,p,m,y,w),t._OrtReleaseTensor=c=>(t._OrtReleaseTensor=U.Ua)(c),t._OrtCreateRunOptions=(c,p,m,y)=>(t._OrtCreateRunOptions=U.Va)(c,p,m,y),t._OrtAddRunConfigEntry=(c,p,m)=>(t._OrtAddRunConfigEntry=U.Wa)(c,p,m),t._OrtReleaseRunOptions=c=>(t._OrtReleaseRunOptions=U.Xa)(c),t._OrtCreateBinding=c=>(t._OrtCreateBinding=U.Ya)(c),t._OrtBindInput=(c,p,m)=>(t._OrtBindInput=U.Za)(c,p,m),t._OrtBindOutput=(c,p,m,y)=>(t._OrtBindOutput=U._a)(c,p,m,y),t._OrtClearBoundOutputs=c=>(t._OrtClearBoundOutputs=U.$a)(c),t._OrtReleaseBinding=c=>(t._OrtReleaseBinding=U.ab)(c),t._OrtRunWithBinding=(c,p,m,y,w)=>(t._OrtRunWithBinding=U.bb)(c,p,m,y,w),t._OrtRun=(c,p,m,y,w,O,N,G)=>(t._OrtRun=U.cb)(c,p,m,y,w,O,N,G),t._OrtEndProfiling=c=>(t._OrtEndProfiling=U.db)(c),t._JsepOutput=(c,p,m)=>(t._JsepOutput=U.eb)(c,p,m),t._JsepGetNodeName=c=>(t._JsepGetNodeName=U.fb)(c);var Ps=()=>(Ps=U.gb)(),Zn=t._free=c=>(Zn=t._free=U.hb)(c),ui=t._malloc=c=>(ui=t._malloc=U.ib)(c),Es=(c,p,m,y,w,O)=>(Es=U.kb)(c,p,m,y,w,O),Qd=()=>(Qd=U.lb)(),ep=(c,p,m,y,w)=>(ep=U.mb)(c,p,m,y,w),tp=c=>(tp=U.nb)(c),Cs=c=>(Cs=U.ob)(c),np=(c,p)=>(np=U.pb)(c,p),rp=()=>(rp=U.qb)(),op=(c,p)=>(op=U.rb)(c,p),li=c=>(li=U.sb)(c),Ds=c=>(Ds=U.tb)(c),ks=()=>(ks=U.ub)(),ip=t.dynCall_ii=(c,p)=>(ip=t.dynCall_ii=U.vb)(c,p);t.dynCall_vii=(c,p,m)=>(t.dynCall_vii=U.dynCall_vii)(c,p,m),t.dynCall_vi=(c,p)=>(t.dynCall_vi=U.dynCall_vi)(c,p),t.dynCall_iiii=(c,p,m,y)=>(t.dynCall_iiii=U.dynCall_iiii)(c,p,m,y),t.dynCall_i=c=>(t.dynCall_i=U.dynCall_i)(c),t.dynCall_viiiiiiii=(c,p,m,y,w,O,N,G,q)=>(t.dynCall_viiiiiiii=U.dynCall_viiiiiiii)(c,p,m,y,w,O,N,G,q),t.dynCall_viii=(c,p,m,y)=>(t.dynCall_viii=U.dynCall_viii)(c,p,m,y),t.dynCall_viiiiii=(c,p,m,y,w,O,N)=>(t.dynCall_viiiiii=U.dynCall_viiiiii)(c,p,m,y,w,O,N),t.dynCall_viijj=(c,p,m,y,w)=>(t.dynCall_viijj=U.dynCall_viijj)(c,p,m,y,w),t.dynCall_iii=(c,p,m)=>(t.dynCall_iii=U.dynCall_iii)(c,p,m),t.dynCall_viiii=(c,p,m,y,w)=>(t.dynCall_viiii=U.dynCall_viiii)(c,p,m,y,w),t.dynCall_iiiii=(c,p,m,y,w)=>(t.dynCall_iiiii=U.dynCall_iiiii)(c,p,m,y,w),t.dynCall_iiiiiiii=(c,p,m,y,w,O,N,G)=>(t.dynCall_iiiiiiii=U.dynCall_iiiiiiii)(c,p,m,y,w,O,N,G),t.dynCall_iiiiiii=(c,p,m,y,w,O,N)=>(t.dynCall_iiiiiii=U.dynCall_iiiiiii)(c,p,m,y,w,O,N),t.dynCall_vfiii=(c,p,m,y,w)=>(t.dynCall_vfiii=U.dynCall_vfiii)(c,p,m,y,w),t.dynCall_viiiiff=(c,p,m,y,w,O,N)=>(t.dynCall_viiiiff=U.dynCall_viiiiff)(c,p,m,y,w,O,N),t.dynCall_viiiiiff=(c,p,m,y,w,O,N,G)=>(t.dynCall_viiiiiff=U.dynCall_viiiiiff)(c,p,m,y,w,O,N,G),t.dynCall_ffff=(c,p,m,y)=>(t.dynCall_ffff=U.dynCall_ffff)(c,p,m,y),t.dynCall_viiff=(c,p,m,y,w)=>(t.dynCall_viiff=U.dynCall_viiff)(c,p,m,y,w),t.dynCall_fffffff=(c,p,m,y,w,O,N)=>(t.dynCall_fffffff=U.dynCall_fffffff)(c,p,m,y,w,O,N),t.dynCall_viiiii=(c,p,m,y,w,O)=>(t.dynCall_viiiii=U.dynCall_viiiii)(c,p,m,y,w,O),t.dynCall_jjjjjjj=(c,p,m,y,w,O,N)=>(t.dynCall_jjjjjjj=U.dynCall_jjjjjjj)(c,p,m,y,w,O,N),t.dynCall_jjjjjj=(c,p,m,y,w,O)=>(t.dynCall_jjjjjj=U.dynCall_jjjjjj)(c,p,m,y,w,O),t.dynCall_iijjii=(c,p,m,y,w,O)=>(t.dynCall_iijjii=U.dynCall_iijjii)(c,p,m,y,w,O),t.dynCall_viiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le)=>(t.dynCall_viiiiiiiiiiiii=U.dynCall_viiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le),t.dynCall_viiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se)=>(t.dynCall_viiiiiiiiii=U.dynCall_viiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se),t.dynCall_viiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be)=>(t.dynCall_viiiiiiiiiii=U.dynCall_viiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be),t.dynCall_viiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se)=>(t.dynCall_viiiiiiiiiiii=U.dynCall_viiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se),t.dynCall_viiiiiiiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r,xo)=>(t.dynCall_viiiiiiiiiiiiiiiiii=U.dynCall_viiiiiiiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r,xo),t.dynCall_viiiiiiiii=(c,p,m,y,w,O,N,G,q,Q)=>(t.dynCall_viiiiiiiii=U.dynCall_viiiiiiiii)(c,p,m,y,w,O,N,G,q,Q),t.dynCall_viiiiiiiiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r,xo,Ns)=>(t.dynCall_viiiiiiiiiiiiiiiiiii=U.dynCall_viiiiiiiiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r,xo,Ns),t.dynCall_viiiiiii=(c,p,m,y,w,O,N,G)=>(t.dynCall_viiiiiii=U.dynCall_viiiiiii)(c,p,m,y,w,O,N,G),t.dynCall_viiiiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St)=>(t.dynCall_viiiiiiiiiiiiiii=U.dynCall_viiiiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St),t.dynCall_jiji=(c,p,m,y)=>(t.dynCall_jiji=U.dynCall_jiji)(c,p,m,y),t.dynCall_v=c=>(t.dynCall_v=U.dynCall_v)(c),t.dynCall_iidiiii=(c,p,m,y,w,O,N)=>(t.dynCall_iidiiii=U.dynCall_iidiiii)(c,p,m,y,w,O,N),t.dynCall_iiiiii=(c,p,m,y,w,O)=>(t.dynCall_iiiiii=U.dynCall_iiiiii)(c,p,m,y,w,O),t.dynCall_iiiiiiiii=(c,p,m,y,w,O,N,G,q)=>(t.dynCall_iiiiiiiii=U.dynCall_iiiiiiiii)(c,p,m,y,w,O,N,G,q),t.dynCall_iiij=(c,p,m,y)=>(t.dynCall_iiij=U.dynCall_iiij)(c,p,m,y),t.dynCall_iiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q)=>(t.dynCall_iiiiiiiiii=U.dynCall_iiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q),t.dynCall_iiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se)=>(t.dynCall_iiiiiiiiiiiii=U.dynCall_iiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se),t.dynCall_iiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se)=>(t.dynCall_iiiiiiiiiii=U.dynCall_iiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se),t.dynCall_ji=(c,p)=>(t.dynCall_ji=U.dynCall_ji)(c,p),t.dynCall_vij=(c,p,m)=>(t.dynCall_vij=U.dynCall_vij)(c,p,m),t.dynCall_viiijii=(c,p,m,y,w,O,N)=>(t.dynCall_viiijii=U.dynCall_viiijii)(c,p,m,y,w,O,N),t.dynCall_viijiiiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r)=>(t.dynCall_viijiiiiiiiiiiiiii=U.dynCall_viijiiiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r),t.dynCall_viiiji=(c,p,m,y,w,O)=>(t.dynCall_viiiji=U.dynCall_viiiji)(c,p,m,y,w,O),t.dynCall_fi=(c,p)=>(t.dynCall_fi=U.dynCall_fi)(c,p),t.dynCall_fii=(c,p,m)=>(t.dynCall_fii=U.dynCall_fii)(c,p,m),t.dynCall_jii=(c,p,m)=>(t.dynCall_jii=U.dynCall_jii)(c,p,m),t.dynCall_dii=(c,p,m)=>(t.dynCall_dii=U.dynCall_dii)(c,p,m),t.dynCall_fiiii=(c,p,m,y,w)=>(t.dynCall_fiiii=U.dynCall_fiiii)(c,p,m,y,w),t.dynCall_fif=(c,p,m)=>(t.dynCall_fif=U.dynCall_fif)(c,p,m),t.dynCall_jfi=(c,p,m)=>(t.dynCall_jfi=U.dynCall_jfi)(c,p,m),t.dynCall_viiiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it)=>(t.dynCall_viiiiiiiiiiiiii=U.dynCall_viiiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it),t.dynCall_viiiiiiiiiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r,xo,Ns,qT)=>(t.dynCall_viiiiiiiiiiiiiiiiiiii=U.dynCall_viiiiiiiiiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn,$r,xo,Ns,qT),t.dynCall_viiiiiiiiiiiiiiii=(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn)=>(t.dynCall_viiiiiiiiiiiiiiii=U.dynCall_viiiiiiiiiiiiiiii)(c,p,m,y,w,O,N,G,q,Q,se,be,Se,Le,it,St,Jn),t.dynCall_fiii=(c,p,m,y)=>(t.dynCall_fiii=U.dynCall_fiii)(c,p,m,y),t.dynCall_viij=(c,p,m,y)=>(t.dynCall_viij=U.dynCall_viij)(c,p,m,y),t.dynCall_jiij=(c,p,m,y)=>(t.dynCall_jiij=U.dynCall_jiij)(c,p,m,y),t.dynCall_iif=(c,p,m)=>(t.dynCall_iif=U.dynCall_iif)(c,p,m),t.dynCall_jiiii=(c,p,m,y,w)=>(t.dynCall_jiiii=U.dynCall_jiiii)(c,p,m,y,w),t.dynCall_jiii=(c,p,m,y)=>(t.dynCall_jiii=U.dynCall_jiii)(c,p,m,y),t.dynCall_viif=(c,p,m,y)=>(t.dynCall_viif=U.dynCall_viif)(c,p,m,y),t.dynCall_viiij=(c,p,m,y,w)=>(t.dynCall_viiij=U.dynCall_viiij)(c,p,m,y,w),t.dynCall_viiiijii=(c,p,m,y,w,O,N,G)=>(t.dynCall_viiiijii=U.dynCall_viiiijii)(c,p,m,y,w,O,N,G),t.dynCall_viji=(c,p,m,y)=>(t.dynCall_viji=U.dynCall_viji)(c,p,m,y),t.dynCall_vifi=(c,p,m,y)=>(t.dynCall_vifi=U.dynCall_vifi)(c,p,m,y),t.dynCall_vidi=(c,p,m,y)=>(t.dynCall_vidi=U.dynCall_vidi)(c,p,m,y),t.dynCall_viijii=(c,p,m,y,w,O)=>(t.dynCall_viijii=U.dynCall_viijii)(c,p,m,y,w,O),t.dynCall_iiiiij=(c,p,m,y,w,O)=>(t.dynCall_iiiiij=U.dynCall_iiiiij)(c,p,m,y,w,O),t.dynCall_iiiiid=(c,p,m,y,w,O)=>(t.dynCall_iiiiid=U.dynCall_iiiiid)(c,p,m,y,w,O),t.dynCall_iiiiijj=(c,p,m,y,w,O,N)=>(t.dynCall_iiiiijj=U.dynCall_iiiiijj)(c,p,m,y,w,O,N),t.dynCall_iiiiiijj=(c,p,m,y,w,O,N,G)=>(t.dynCall_iiiiiijj=U.dynCall_iiiiiijj)(c,p,m,y,w,O,N,G);var ap=c=>(ap=U.wb)(c),sp=()=>(sp=U.xb)(),up=c=>(up=U.yb)(c),lp=()=>(lp=U.zb)();return(function c(){if(0<Qt)nr=c;else if(s)e(t),Ze();else{for(;0<ps.length;)ps.shift()(t);0<Qt?nr=c:(t.calledRun=!0,re||(Ze(),e(t)))}})(),t.PTR_SIZE=4,o},jO=Sy,qO=globalThis.self?.name?.startsWith("em-pthread");qO&&Sy()});var Ey,fc,KO,Pt,Cy,pc,XO,ZO,Dy,JO,Oy,ky,Py,Ny,_a=L(()=>{"use strict";ya();Ey=typeof location>"u"?void 0:location.origin,fc=import.meta.url>"file:"&&import.meta.url<"file;",KO=()=>{if(!!1){if(fc){let r=URL;return new URL(new r("ort.all.bundle.min.mjs",import.meta.url).href,Ey).href}return import.meta.url}},Pt=KO(),Cy=()=>{if(Pt&&!Pt.startsWith("blob:"))return Pt.substring(0,Pt.lastIndexOf("/")+1)},pc=(r,e)=>{try{let n=e??Pt;return(n?new URL(r,n):new URL(r)).origin===Ey}catch{return!1}},XO=(r,e)=>{let n=e??Pt;try{return(n?new URL(r,n):new URL(r)).href}catch{return}},ZO=(r,e)=>`${e??"./"}${r}`,Dy=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},JO=async r=>(await import(/*webpackIgnore:true*/ /*@vite-ignore*/r)).default,Oy=(Iy(),Yr(Ty)).default,ky=async()=>{if(!Pt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(pc(Pt))return[void 0,Oy()];let r=await Dy(Pt);return[r,Oy(r)]},Py=(Ay(),Yr($y)).default,Ny=async(r,e,n,t)=>{let o=Py&&!(r||e);if(o)if(Pt)o=pc(Pt)||t&&!n;else if(t&&!n)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,Py];{let i="ort-wasm-simd-threaded.jsep.mjs",a=r??XO(i,e),s=!!1&&n&&a&&!pc(a,e),u=s?await Dy(a):a??ZO(i,e);return[s?u:void 0,await JO(u)]}}});var hc,mc,Oa,Ly,YO,QO,eP,va,Fe,yr=L(()=>{"use strict";_a();mc=!1,Oa=!1,Ly=!1,YO=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},QO=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},eP=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},va=async r=>{if(mc)return Promise.resolve();if(Oa)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ly)throw new Error("previous call to 'initializeWebAssembly()' failed.");Oa=!0;let e=r.initTimeout,n=r.numThreads;if(r.simd!==!1){if(r.simd==="relaxed"){if(!eP())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!QO())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let t=YO();n>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let o=r.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,l=u?.href??u,d=r.wasmBinary,[f,h]=await Ny(s,i,n>1,!!d||!!l),g=!1,b=[];if(e>0&&b.push(new Promise(_=>{setTimeout(()=>{g=!0,_()},e)})),b.push(new Promise((_,T)=>{let v={numThreads:n};if(d)v.wasmBinary=d,v.locateFile=x=>x;else if(l||i)v.locateFile=x=>l??i+x;else if(s&&s.indexOf("blob:")!==0)v.locateFile=x=>new URL(x,s).href;else if(f){let x=Cy();x&&(v.locateFile=I=>x+I)}h(v).then(x=>{Oa=!1,mc=!0,hc=x,_(),f&&URL.revokeObjectURL(f)},x=>{Oa=!1,Ly=!0,T(x)})})),await Promise.race(b),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Fe=()=>{if(mc&&hc)return hc;throw new Error("WebAssembly is not initialized yet.")}});var Et,Ho,De,Pa=L(()=>{"use strict";yr();Et=(r,e)=>{let n=Fe(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},Ho=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Ho(i,a+".",n,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},De=r=>{let e=Fe(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${r} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(n)}}});var Ry,zy=L(()=>{"use strict";yr();Pa();Ry=r=>{let e=Fe(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=Et(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&De("Can't create run options."),r?.extra!==void 0&&Ho(r.extra,"",new WeakSet,(a,s)=>{let u=Et(a,t),l=Et(s,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&De(`Can't set a run config entry: ${a} - ${s}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(a=>e._free(a)),i}}});var tP,nP,rP,fo,oP,By,My=L(()=>{"use strict";yr();Pa();tP=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},nP=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},rP=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},fo=(r,e,n,t)=>{let o=Et(e,t),i=Et(n,t);Fe()._OrtAddSessionConfigEntry(r,o,i)!==0&&De(`Can't set a session config entry: ${e} - ${n}.`)},oP=async(r,e,n)=>{let t=e.executionProviders;for(let o of t){let i=typeof o=="string"?o:o.name,a=[];switch(i){case"webnn":if(i="WEBNN",fo(r,"session.disable_quant_qdq","1",n),fo(r,"session.disable_qdq_constant_folding","1",n),typeof o!="string"){let h=o?.deviceType;h&&fo(r,"deviceType",h,n)}break;case"webgpu":if(i="JS",typeof o!="string"){let f=o;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);fo(r,"preferredLayout",f.preferredLayout,n)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${i}`)}let s=Et(i,n),u=a.length,l=0,d=0;if(u>0){l=Fe()._malloc(u*Fe().PTR_SIZE),n.push(l),d=Fe()._malloc(u*Fe().PTR_SIZE),n.push(d);for(let f=0;f<u;f++)Fe().setValue(l+f*Fe().PTR_SIZE,a[f][0],"*"),Fe().setValue(d+f*Fe().PTR_SIZE,a[f][1],"*")}await Fe()._OrtAppendExecutionProvider(r,s,l,d,u)!==0&&De(`Can't append execution provider: ${i}.`)}},By=async r=>{let e=Fe(),n=0,t=[],o=r||{};rP(o);try{let i=tP(o.graphOptimizationLevel??"all"),a=nP(o.executionMode??"sequential"),s=typeof o.logId=="string"?Et(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let d=typeof o.optimizedModelFilePath=="string"?Et(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,l,d),n===0&&De("Can't create session options."),o.executionProviders&&await oP(n,o,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);fo(n,"enableGraphCapture",o.enableGraphCapture.toString(),t)}if(o.freeDimensionOverrides)for(let[f,h]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let g=Et(f,t);e._OrtAddFreeDimensionOverride(n,g,h)!==0&&De(`Can't set a free dimension override: ${f} - ${h}.`)}return o.extra!==void 0&&Ho(o.extra,"",new WeakSet,(f,h)=>{fo(n,f,h,t)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n)!==0&&De("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var _r,Vn,vr,ho,jo,Ea,Ca,gc,me=L(()=>{"use strict";_r=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Vn=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},vr=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},ho=r=>{switch(r){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},jo=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Ea=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",Ca=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint64"||r==="int8"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",gc=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${r}`)}}});var qo,bc=L(()=>{"use strict";ya();qo=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=Jr("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Jr("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let l=u.byteLength;new Uint8Array(i,a,l).set(u),a+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var iP,aP,Vy,Fy,Da,sP,Te,Fn=L(()=>{"use strict";me();iP=["V","I","W","E","F"],aP=(r,e)=>{console.log(`[${iP[r]},${new Date().toISOString()}]${e}`)},Da=(r,e)=>{Vy=r,Fy=e},sP=(r,e)=>{let n=jo(r),t=jo(Vy);n>=t&&aP(n,typeof e=="function"?e():e)},Te=(...r)=>{Fy&&sP(...r)}});var yc,Gn,k,Ur,ka,Gy,Uy,_e=L(()=>{"use strict";yc=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Gn=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let a=Math.max(e.length,n.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=yc.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let l=o-u<0?1:e[o-u],d=i-u<0?1:n[i-u];if(l!==d&&l>1&&d>1)return;let f=Math.max(l,d);if(l&&d)s[a-u]=Math.max(l,d);else{if(f>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},k=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},Ur=class r{static adjustPoolAttributes(e,n,t,o,i,a){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<n.length-2;s++)s>=t.length?t.push(n[s+2]):t[s]=n[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(a?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,a,s,u=0){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return r.computeShapeHelper(e,n,l,t,o,i,a,s,u),l}static computeConvOutputShape(e,n,t,o,i,a,s){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,n,t,o,i,a,s,u,l=0){if(e)for(let d=0;d<n.length-2;d++)t.push(1);else for(let d=0;d<n.length-2;d++)t.push(r.adjustPadAndReturnShape(n[d+2],o[d],i[d],a[d],s,d,d+n.length-2,u,l))}static computeOutputSize(e,n,t,o,i){let a=Math.floor(e/n)+1;return i===1&&(a=Math.ceil(e/n)+1,(a-1)*n>=t+o&&(a-=1)),a}static adjustPadAndReturnShape(e,n,t,o,i,a,s,u,l=0){let d=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,r.computeOutputSize(e-d,n,e,0,l);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=(Math.floor((e+n-1)/n)-1)*n+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(h+1)/2:h/2),i[s]=h-i[a],r.computeOutputSize(e+i[a]+i[s]-d,n,e,i[a],l)}default:throw new Error("Unsupported AutoPad type")}else return r.computeOutputSize(e+i[a]+i[s]-d,n,e,i[a],l)}},ka=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;n?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!Gn.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Gy=-34028234663852886e22,Uy=34028234663852886e22});var Na,_c=L(()=>{"use strict";me();Na=(r,e)=>new(ho(e))(r)});var Hy,uP,jy,lP,Wy,cP,qy,La,Ra,vc,Ky,Xy=L(()=>{"use strict";me();Fn();Hy=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),uP=(r,e)=>{if(e==="int32")return r;let n=Hy.get(e);if(!n)throw new Error(`WebNN backend does not support data type: ${e}`);let t=n/8;if(r.byteLength%t!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${t}.`);let o=r.byteLength/t,i=new(ho(e))(r.buffer,r.byteOffset,o);switch(e){case"int64":case"uint64":{let a=new Int32Array(o);for(let s=0;s<o;s++){let u=i[s];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[s]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(e==="uint32"&&i.some(s=>s>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${e} to 'int32'`)}},jy=(r,e)=>{if(e==="int32")return r;if(r.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let n=r.byteLength/4,t=new Int32Array(r.buffer,r.byteOffset,n);switch(e){case"int64":{let o=BigInt64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(t,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(t.some(i=>i<-128||i>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(t,Number);return new Uint8Array(o.buffer)}case"uint8":{if(t.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(t,Number)}case"uint32":{if(t.some(i=>i<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(t,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${e}`)}},lP=1,Wy=()=>lP++,cP=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),qy=(r,e)=>{let n=Hy.get(r);if(!n)throw new Error(`WebNN backend does not support data type: ${r}`);return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*n/8):0},La=class{constructor(e){this.isDataConverted=!1;let{sessionId:n,context:t,tensor:o,dataType:i,shape:a,fallbackDataType:s}=e;this.sessionId=n,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return qy(this.dataType,this.tensorShape)}destroy(){Te("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let n=await this.mlContext.readTensor(this.mlTensor),t=jy(new Uint8Array(n),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(t);return}else return new Uint8Array(t).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,n,t){return this.mlContext===e&&this.dataType===n&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsDataConverted(e){this.isDataConverted=e}},Ra=class{constructor(e,n){this.tensorManager=e;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,n,t,o){let i=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(n)){if(s=cP.get(n),!s||!a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${n}`);Te("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${n} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,n,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==qy(n,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,n,t,u,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let n=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")n=uP(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(n);return}else Te("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(n):this.activeUpload=new Uint8Array(n)}async download(e){if(this.activeUpload){let n=this.wrapper?.isDataConverted?jy(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(n):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(n);return}else return n.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},vc=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let n=this.backend.getMLContext(e);if(!n)throw new Error("MLContext not found for session.");return n}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Wy();return this.tensorTrackersById.set(e,new Ra(this)),e}releaseTensorId(e){let n=this.tensorTrackersById.get(e);n&&(this.tensorTrackersById.delete(e),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(e,n,t,o,i){Te("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(n);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,n){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(n)}async download(e,n){Te("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${n?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(n)}releaseTensorsForSession(e){for(let n of this.freeTensors)n.sessionId===e&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==e)}registerTensor(e,n,t,o){let i=this.getMLContext(e),a=Wy(),s=new La({sessionId:e,context:i,tensor:n,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Ra(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,n,t,o,i,a,s){let u=this.getMLContext(e);for(let[d,f]of this.freeTensors.entries())if(f.canReuseTensor(u,n,t)){Te("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}`);let h=this.freeTensors.splice(d,1)[0];return h.sessionId=e,h}Te("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, ${s?`fallbackDataType: ${s},`:""} shape: ${t}}`);let l=await u.createTensor({dataType:s??n,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new La({sessionId:e,context:u,tensor:l,dataType:n,shape:t,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Ky=(...r)=>new vc(...r)});var za,dP,Ba,Zy=L(()=>{"use strict";me();yr();_c();Xy();Fn();za=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),dP=(r,e)=>{if(r===e)return!0;if(r===void 0||e===void 0)return!1;let n=Object.keys(r).sort(),t=Object.keys(e).sort();return n.length===t.length&&n.every((o,i)=>o===t[i]&&r[o]===e[o])},Ba=class{constructor(e){this.tensorManager=Ky(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;this.mlOpSupportLimitsBySessionId=new Map;Da(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Te("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Te("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let n=this.temporarySessionTensorIds.get(e);if(n){for(let t of n)Te("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(t=>dP(t.options,e));if(n!==-1)return this.mlContextCache[n].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,n){this.mlContextBySessionId.set(e,n);let t=this.sessionIdsByMLContext.get(n);t||(t=new Set,this.sessionIdsByMLContext.set(n,t)),t.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,n.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let n=this.mlContextBySessionId.get(e);if(!n)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(n);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Te("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,n,t,o,i){let a=za.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,n,a,o,i)}async createTemporaryTensor(e,n,t){Te("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${t}}`);let o=za.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,n){if(!Fe().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Te("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${n.byteLength}}`),this.tensorManager.upload(e,n)}async downloadTensor(e,n){return this.tensorManager.download(e,n)}createMLTensorDownloader(e,n){return async()=>{let t=await this.tensorManager.download(e);return Na(t,n)}}registerMLTensor(e,n,t,o){let i=za.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,n,i,o);return Te("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,n){let t=this.sessionGraphInputs.get(e);return t?t.includes(n):!1}isGraphOutput(e,n){let t=this.sessionGraphOutputs.get(e);return t?t.includes(n):!1}isGraphInputOutputTypeSupported(e,n,t=!0){let o=za.get(_r(n)),i=this.mlOpSupportLimitsBySessionId.get(e);return typeof o>"u"?!1:t?!!i?.input.dataTypes.includes(o):!!i?.output.dataTypes.includes(o)}flush(){}}});var Ma=L(()=>{"use strict"});var Jy,wc,xc,pP,fP,Yy,Ic,Tc,e_,t_=L(()=>{"use strict";Fn();Ma();Jy=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),wc=[],xc=r=>Math.ceil(Number(r)/16)*16,pP=r=>{for(let e=0;e<wc.length;e++){let n=wc[e];if(r<=n)return n}return Math.ceil(r/16)*16},fP=1,Yy=()=>fP++,Ic=async(r,e,n,t)=>{let o=xc(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=r.getCommandEncoder();r.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,n)),u}else return new Uint8Array(s.slice(0,n))}finally{i.destroy()}},Tc=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Jy)wc.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,a=xc(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);if(a===i&&o%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,t,o,i);else{let u=new Uint8Array(a);u.set(n),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,u,0,a)}Te("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=xc(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=t[0],e===t[1])return Te("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Yy();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),Te("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Te("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=pP(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let s={id:Yy(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),Te("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(n);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Te("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,n){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await Ic(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=Jy.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Te("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},e_=(...r)=>new Tc(...r)});var Sc,fe,Xe=L(()=>{"use strict";Sc=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=r=>new Sc(r)});var Wr,Ac,Ue,et,Z,ke,Oc,Hr,Xt,ie,Va,R,j,n_,Fa,$c,r_,we=L(()=>{"use strict";me();_e();Wr=64,Ac=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(r)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},Ue=(r,e=1)=>{let n=Ac(r,e);return typeof n=="string"?n:n[0]},et=(r,e=1)=>{let n=Ac(r,e);return typeof n=="string"?n:n[1]},Z=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:k.computeStrides(n)})}),e},ke=r=>r%4===0?4:r%2===0?2:1,Oc=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,Hr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,Xt=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,ie=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,Va=(r,e,n,t,o)=>{let i=typeof n=="number",a=i?n:n.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,l=Ac(e,o),d=typeof l=="string"?l:l[1],f=typeof l=="string"?l:l[0],h={indices:u,value:d,storage:f,tensor:e},g=W=>typeof W=="string"?W:`${W}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=i?"uniforms.":"",T=`${_}${r}_shape`,v=`${_}${r}_strides`,x="";for(let W=0;W<a-1;W++)x+=`
    let dim${W} = current / ${ie(v,W,a)};
    let rest${W} = current % ${ie(v,W,a)};
    indices[${W}] = dim${W};
    current = rest${W};
    `;x+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${r}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${x}
    return indices;
  }`,$=W=>(b.offsetToIndices=!0,a<2?W:`o2i_${r}(${W})`),P=[];if(a>=2)for(let W=a-1;W>=0;W--)P.push(`${ie(v,W,a)} * (indices[${W}])`);let E=a<2?"":`
  fn i2o_${r}(indices: ${h.indices}) -> u32 {
    return ${P.join("+")};
  }`,z=W=>(b.indicesToOffset=!0,a<2?W:`i2o_${r}(${W})`),M=(...W)=>a===0?"0u":`${h.indices}(${W.map(g).join(",")})`,H=(W,D)=>a<2?`${W}`:`${ie(W,D,a)}`,K=(W,D,oe)=>a<2?`${W}=${oe};`:`${ie(W,D,a)}=${oe};`,B={},ae=(W,D)=>{b.broadcastedIndicesToOffset=!0;let oe=`${D.name}broadcastedIndicesTo${r}Offset`;if(oe in B)return`${oe}(${W})`;let He=[];for(let Ce=a-1;Ce>=0;Ce--){let ot=D.indicesGet("outputIndices",Ce+D.rank-a);He.push(`${H(v,Ce)} * (${ot} % ${H(T,Ce)})`)}return B[oe]=`fn ${oe}(outputIndices: ${D.type.indices}) -> u32 {
             return ${He.length>0?He.join("+"):"0u"};
           }`,`${oe}(${W})`},V=(W,D)=>(()=>{if(h.storage===h.value)return`${r}[${W}]=${D};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${r}[${W}]=vec2<u32>(u32(${D}), select(0u, 0xFFFFFFFFu, ${D} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${r}[${W}]=vec2<u32>(u32(${D}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${r}[${W}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${D}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),S=W=>(()=>{if(h.storage===h.value)return`${r}[${W}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${r}[${W}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${r}[${W}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${W}] & 0xFFu), bool(${r}[${W}] & 0xFF00u), bool(${r}[${W}] & 0xFF0000u), bool(${r}[${W}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),F=a<2?"":`
  fn get_${r}ByIndices(indices: ${h.indices}) -> ${d} {
    return ${S(`i2o_${r}(indices)`)};
  }`,X=a<2?"":(()=>{let W=s.map(oe=>`d${oe}: u32`).join(", "),D=s.map(oe=>`d${oe}`).join(", ");return`
  fn get_${r}(${W}) -> ${d} {
    return get_${r}ByIndices(${M(D)});
  }`})(),te=(...W)=>{if(W.length!==a)throw new Error(`indices length must be ${a}`);let D=W.map(g).join(",");return a===0?S("0u"):a===1?S(D[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${r}(${D})`)},J=W=>a<2?S(W):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${r}ByIndices(${W})`),re=a<2?"":`
  fn set_${r}ByIndices(indices: ${h.indices}, value: ${d}) {
    ${V(`i2o_${r}(indices)`,"value")}
  }`,pe=a<2?"":(()=>{let W=s.map(oe=>`d${oe}: u32`).join(", "),D=s.map(oe=>`d${oe}`).join(", ");return`
  fn set_${r}(${W}, value: ${d}) {
    set_${r}ByIndices(${M(D)}, value);
  }`})();return{impl:()=>{let W=[],D=!1;return b.offsetToIndices&&(W.push(I),D=!0),b.indicesToOffset&&(W.push(E),D=!0),b.broadcastedIndicesToOffset&&(Object.values(B).forEach(oe=>W.push(oe)),D=!0),b.set&&(W.push(pe),D=!0),b.setByIndices&&(W.push(re),D=!0),b.get&&(W.push(X),D=!0),b.getByIndices&&(W.push(F),D=!0),!i&&D&&W.unshift(`const ${T} = ${h.indices}(${n.join(",")});`,`const ${v} = ${h.indices}(${k.computeStrides(n).join(",")});`),W.join(`
`)},type:h,offsetToIndices:$,indicesToOffset:z,broadcastedIndicesToOffset:ae,indices:M,indicesGet:H,indicesSet:K,set:(...W)=>{if(W.length!==a+1)throw new Error(`indices length must be ${a}`);let D=W[a];if(typeof D!="string")throw new Error("value must be string");let oe=W.slice(0,a).map(g).join(",");return a===0?V("0u",D):a===1?V(oe[0],D):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${r}(${oe}, ${D})`)},setByOffset:V,setByIndices:(W,D)=>a<2?V(W,D):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${r}ByIndices(${W}, ${D});`),get:te,getByOffset:S,getByIndices:J,usage:t,name:r,strides:v,shape:T,rank:a}},R=(r,e,n,t=1)=>Va(r,e,n,"input",t),j=(r,e,n,t=1)=>Va(r,e,n,"output",t),n_=(r,e,n)=>Va(r,e,n,"atomicOutput",1),Fa=(r,e,n,t=1)=>Va(r,e,n,"internal",t),$c=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Wr){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*t*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${t}, ${o})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,n){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${n}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(e,n,t=1){return this.uniforms.push({name:e,type:n,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:n,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${n}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${n}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${n}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},r_=(r,e)=>new $c(r,e)});var hP,o_,mP,gP,bP,yP,lt,i_,a_,er=L(()=>{"use strict";me();_e();Xe();we();hP=(r,e)=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==r[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${r[0].dims.length}`)},o_=(r,e)=>e.length!==0?e:[...new Array(r).keys()].reverse(),mP=(r,e)=>k.sortBasedOnPerm(r,o_(r.length,e)),gP=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=`a[${r[i]}]=i[${i}];`;return o+="return a;}"},bP=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},yP=(r,e)=>{let n=0;for(let t=0;t<r.length;++t)if(e[r[t]]!==1){if(r[t]<n)return!1;n=r[t]}return!0},lt=(r,e)=>{let n=r.dataType,t=r.dims.length,o=o_(t,e),i=mP(r.dims,o),a=r.dims,s=i,u=t<2||yP(o,r.dims),l;if(u)return l=_=>{let T=R("input",n,a,4),v=j("output",n,s,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,v)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:l};let{newShape:d,newPerm:f}=bP(r.dims,o),h=k.areEqual(f,[2,3,1]),g=k.areEqual(f,[3,1,2]);if(d.length===2||h||g){a=h?[d[0],d[1]*d[2]]:g?[d[0]*d[1],d[2]]:d,s=[a[1],a[0]];let _=16;return l=T=>{let v=R("a",n,a.length),x=j("output",n,s.length);return`
  ${T.registerUniform("output_size","u32").declareVariables(v,x)}
  var<workgroup> tile : array<array<${x.type.value}, ${_+1}>, ${_}>;
  ${T.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${v.getByIndices(`${v.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${x.setByIndices(`${x.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let T=k.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(s[1]/_),y:Math.ceil(s[0]/_)},programUniforms:[{type:12,data:T},...Z(a,s)]}},getShaderSource:l}}return l=_=>{let T=R("a",n,a.length),v=j("output",n,s.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(T,v)}

  ${gP(o,t,T,v)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",T.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let _=k.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...Z(a,s)]}},getShaderSource:l}},i_=(r,e)=>{hP(r.inputs,e.perm),r.compute(lt(r.inputs[0],e.perm))},a_=r=>fe({perm:r.perm})});var _P,vP,wP,xP,TP,IP,SP,$P,AP,OP,Un,s_,u_,l_,c_,d_,p_,f_,h_,m_,g_,b_=L(()=>{"use strict";me();_e();we();Ga();er();_P={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},vP={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},wP={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},xP={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},TP=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},IP=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},SP=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},$P=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},AP=(r,e)=>{let n=[];if(!$P(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},OP=(r,e,n,t,o,i,a)=>{let s=n[0].dims,u=k.size(i),l=k.size(a),d=R("_A",n[0].dataType,s),f=j("output",o,i),h=64;u===1&&(h=256);let g=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,b=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(d,f)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${wP[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${_P[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${vP[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${t==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${xP[t]})`}`)};
         }
        }`;return{name:r,shaderCache:{hint:`${e};${h}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Un=(r,e,n,t)=>{let o=r.inputs.length===1?n:Pc(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((g,b)=>b));let a=k.normalizeAxes(i,r.inputs[0].dims.length),s=a,u=r.inputs[0],l=AP(s,r.inputs[0].dims.length);l.length>0&&(u=r.compute(lt(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],s=TP(s.length,u.dims.length));let[d,f]=IP(u.dims,s),h=d;o.keepDims&&(h=SP(d,a)),r.compute(OP(e,o.cacheKey,[u],t,r.inputs[0].dataType,h,f),{inputs:[u]})},s_=(r,e)=>{Un(r,"ReduceMeanShared",e,"mean")},u_=(r,e)=>{Un(r,"ReduceL1Shared",e,"l1")},l_=(r,e)=>{Un(r,"ReduceL2Shared",e,"l2")},c_=(r,e)=>{Un(r,"ReduceLogSumExpShared",e,"logSumExp")},d_=(r,e)=>{Un(r,"ReduceMaxShared",e,"max")},p_=(r,e)=>{Un(r,"ReduceMinShared",e,"min")},f_=(r,e)=>{Un(r,"ReduceProdShared",e,"prod")},h_=(r,e)=>{Un(r,"ReduceSumShared",e,"sum")},m_=(r,e)=>{Un(r,"ReduceSumSquareShared",e,"sumSquare")},g_=(r,e)=>{Un(r,"ReduceLogSumShared",e,"logSum")}});var Wn,PP,Ua,Pc,Hn,EP,CP,DP,kP,NP,LP,RP,zP,BP,MP,jn,y_,__,v_,w_,x_,T_,I_,S_,$_,A_,Ga=L(()=>{"use strict";me();_e();Xe();we();b_();Wn=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},PP=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],Ua=(r,e,n,t,o,i,a=!1,s=!1)=>{let u=[],l=n[0].dims,d=l.length,f=k.normalizeAxes(o,d),h=!s&&f.length===0;l.forEach((T,v)=>{h||f.indexOf(v)>=0?a&&u.push(1):u.push(T)});let g=u.length,b=k.size(u);return{name:r,shaderCache:e,getShaderSource:T=>{let v=[],x=R("_A",n[0].dataType,d),I=j("output",i,g),$=t(x,I,f),P=$[2];for(let E=0,z=0;E<d;E++)h||f.indexOf(E)>=0?(a&&z++,P=`for(var j${E}: u32 = 0; j${E} < ${l[E]}; j${E}++) {
                  ${$[2].includes("last_index")?`let last_index = j${E};`:""}
                  ${x.indicesSet("input_indices",E,`j${E}`)}
                  ${P}
                }`):(v.push(`${x.indicesSet("input_indices",E,I.indicesGet("output_indices",z))};`),z++);return`

        ${T.registerUniform("output_size","u32").declareVariables(x,I)}

        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${x.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${v.join(`
`)}
          ${$[0]}       // init ops for reduce max/min
          ${$[1]}
          ${P}
          ${$[3]}
          ${$.length===4?I.setByOffset("global_idx","value"):$.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...Z(l,u)]})}},Pc=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),fe({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Hn=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:Pc(o,n);r.compute(Ua(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?PP:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},EP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},CP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},DP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},kP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},NP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},LP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=r.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},RP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},zP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},BP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},MP=(r,e)=>{Wn(r.inputs),Hn(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},jn=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},y_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?LP(r,e):s_(r,e)},__=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?CP(r,e):u_(r,e)},v_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?DP(r,e):l_(r,e)},w_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?kP(r,e):c_(r,e)},x_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?NP(r,e):d_(r,e)},T_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?RP(r,e):p_(r,e)},I_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?zP(r,e):f_(r,e)},S_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?BP(r,e):h_(r,e)},$_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?MP(r,e):m_(r,e)},A_=(r,e)=>{jn(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?EP(r,e):g_(r,e)}});var O_,P_,E_,Ec,C_=L(()=>{"use strict";me();Xe();Ga();O_=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},P_=(r,e)=>{O_(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Ua("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},E_=(r,e)=>{O_(r.inputs);let n=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Ua("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},Ec=r=>fe(r)});var VP,Cc,FP,GP,UP,mo,WP,D_,Wa=L(()=>{"use strict";me();_e();Ma();we();VP=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4],s=r[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],d=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,h=f,g=h;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=e.qkvHiddenSizes[0],h=e.qkvHiddenSizes[1],g=e.qkvHiddenSizes[2]}let b=l;if(f!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+h+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(a){if(h!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(_=a.dims[3])}let T=b+_,v=-1,x=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==l||s.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:_,kvSequenceLength:b,totalSequenceLength:T,maxSequenceLength:v,inputHiddenSize:d,hiddenSize:f,vHiddenSize:g,headSize:Math.floor(f/e.numHeads),vHeadSize:Math.floor(g/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Cc=(r,e,n)=>e&&r?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${r?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,FP=(r,e,n,t,o,i,a,s)=>{let u=ke(a?1:i),l=64,d=i/u;d<l&&(l=32);let f=Math.ceil(i/u/l),h=[{type:12,data:e},{type:12,data:n},{type:12,data:t},{type:12,data:o},{type:12,data:d},{type:12,data:f}],g=Ue(r.dataType,u),b=et(1,u),_=["type"];a&&_.push("type"),s&&_.push("type");let T=v=>{let x=j("x",r.dataType,r.dims,u),I=[x],$=a?R("seq_lens",a.dataType,a.dims):void 0;$&&I.push($);let P=s?R("total_sequence_length_input",s.dataType,s.dims):void 0;P&&I.push(P);let E=et(r.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${v.registerUniforms(z).declareVariables(...I)}
  ${v.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Cc($,P,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${x.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${x.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${x.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${g};${u}`,inputDependencies:_},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:e*n},programUniforms:h})}},GP=(r,e,n,t,o,i,a,s,u)=>{let l=a+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,l],f=r>1&&t,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=f?[i.batchSize,h,l,i.headSize]:void 0,b=i.nReps?i.nReps:1,_=i.scale===0?1/Math.sqrt(i.headSize):i.scale,T=ke(i.headSize),v=i.headSize/T,x=12,I={x:Math.ceil(l/x),y:Math.ceil(i.sequenceLength/x),z:i.batchSize*i.numHeads},$=[{type:12,data:i.sequenceLength},{type:12,data:v},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:_},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:b}],P=f&&t&&k.size(t.dims)>0,E=["type","type"];P&&E.push("type"),o&&E.push("type"),s&&E.push("type"),u&&E.push("type");let z=[{dims:d,dataType:e.dataType,gpuDataType:0}];f&&z.push({dims:g,dataType:e.dataType,gpuDataType:0});let M=H=>{let K=R("q",e.dataType,e.dims,T),B=R("key",n.dataType,n.dims,T),ae=[K,B];if(P){let re=R("past_key",t.dataType,t.dims,T);ae.push(re)}o&&ae.push(R("attention_bias",o.dataType,o.dims));let V=s?R("seq_lens",s.dataType,s.dims):void 0;V&&ae.push(V);let S=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;S&&ae.push(S);let F=j("output",e.dataType,d),X=[F];f&&X.push(j("present_key",e.dataType,g,T));let te=et(1,T),J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;

  var<workgroup> tileQ: array<${K.type.storage}, ${x*x}>;
  var<workgroup> tileK: array<${K.type.storage}, ${x*x}>;
  ${H.registerUniforms(J).declareVariables(...ae,...X)}
  ${H.mainStart([x,x,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Cc(V,S,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${P&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${te}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${P&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${te}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${F.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${o!==void 0};${t!==void 0};${r}`,inputDependencies:E},getRunData:()=>({outputs:z,dispatchGroup:I,programUniforms:$}),getShaderSource:M}},UP=(r,e,n,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,d=o.vHiddenSize*l,f=r>1&&t,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,g=f?[o.batchSize,h,u,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,d],_=12,T={x:Math.ceil(o.vHeadSize/_),y:Math.ceil(o.sequenceLength/_),z:o.batchSize*o.numHeads},v=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:d},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],x=f&&t&&k.size(t.dims)>0,I=["type","type"];x&&I.push("type"),a&&I.push("type"),s&&I.push("type");let $=[{dims:b,dataType:e.dataType,gpuDataType:0}];f&&$.push({dims:g,dataType:e.dataType,gpuDataType:0});let P=E=>{let z=R("probs",e.dataType,e.dims),M=R("v",n.dataType,n.dims),H=[z,M];x&&H.push(R("past_value",t.dataType,t.dims));let K=a?R("seq_lens",a.dataType,a.dims):void 0;a&&H.push(K);let B=s?R("total_sequence_length_input",s.dataType,s.dims):void 0;s&&H.push(B);let V=[j("output",e.dataType,b)];f&&V.push(j("present_value",e.dataType,g));let S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${z.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${z.type.value}, ${_*_}>;
  ${E.registerUniforms(S).declareVariables(...H,...V)}
  ${E.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Cc(K,B,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${x&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${x&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:I},getRunData:()=>({outputs:$,dispatchGroup:T,programUniforms:v}),getShaderSource:P}},mo=(r,e,n,t,o,i,a,s,u,l,d=void 0,f=void 0)=>{let h=Math.min(r.outputCount,1+(a?1:0)+(s?1:0)),g=h>1?a:void 0,b=h>1?s:void 0,_=h>1?l.pastSequenceLength:0,T=_+l.kvSequenceLength,v=u&&k.size(u.dims)>0?u:void 0,x=[e,n];g&&k.size(g.dims)>0&&x.push(g),v&&x.push(v),d&&x.push(d),f&&x.push(f);let I=r.compute(GP(h,e,n,g,v,l,_,d,f),{inputs:x,outputs:h>1?[-1,1]:[-1]})[0];r.compute(FP(I,l.batchSize,l.numHeads,_,l.sequenceLength,T,d,f),{inputs:d&&f?[I,d,f]:[I],outputs:[]});let $=[I,t];b&&k.size(b.dims)>0&&$.push(b),d&&$.push(d),f&&$.push(f),r.compute(UP(h,I,t,b,l,_,d,f),{inputs:$,outputs:h>1?[0,2]:[0]})},WP=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],d=f=>{let h=j("output_q",u[0].dataType,n),g=j("output_k",u[0].dataType,n),b=j("output_v",u[0].dataType,n),_=R("input",u[0].dataType,u[0].dims),T=R("weight",u[1].dataType,u[1].dims),v=R("bias",u[2].dataType,u[2].dims),x=_.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${x}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${x}, ${a*a}>;
  var<workgroup> tileWeightK: array<${x}, ${a*a}>;
  var<workgroup> tileWeightV: array<${x}, ${a*a}>;
  ${f.registerUniforms(I).declareVariables(_,T,v,h,g,b)}
  ${f.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${x}(0);
    var valueK = ${x}(0);
    var valueV = ${x}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},D_=(r,e)=>{let n=VP(r.inputs,e),[t,o,i]=WP(r,n);return mo(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n)}});var HP,jP,qP,k_,N_=L(()=>{"use strict";ft();me();_e();Xe();we();HP=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},jP=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,a=t?ke(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=k.size(i)/a,l=t,d=l?i.length:i,f=R("x",r[0].dataType,r[0].dims,a),h=R("scale",r[1].dataType,r[1].dims,s),g=R("bias",r[2].dataType,r[2].dims,s),b=R("inputMean",r[3].dataType,r[3].dims,s),_=R("inputVar",r[4].dataType,r[4].dims,s),T=j("y",r[0].dataType,d,a),v=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let $=1;$<h.rank;$++)I+=`cIndices[${$}] = outputIndices[${$}];`;I+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return I},x=I=>`
  const epsilon = ${n};
  ${I.registerUniform("outputSize","u32").declareVariables(f,h,g,b,_,T)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${a}`)};
    ${v()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:x,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...Z(i)]:[{type:12,data:u}]})}},qP=r=>fe(r),k_=(r,e)=>{let{inputs:n,outputCount:t}=r,o=qP({...e,outputCount:t});if(ye.webgpu.validateInputContent&&HP(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(jP(n,o))}});var KP,XP,L_,R_=L(()=>{"use strict";_e();we();KP=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},XP=r=>{let e=r[0].dims,n=r[0].dims[2],t=k.size(e)/4,o=r[0].dataType,i=R("input",o,e,4),a=R("bias",o,[n],4),s=R("residual",o,e,4),u=j("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:d=>`
  const channels = ${n}u / 4;
  ${d.declareVariables(i,a,s,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},L_=r=>{KP(r.inputs),r.compute(XP(r.inputs))}});var ZP,Ne,z_,B_,M_,V_,F_,G_,U_,W_,H_,JP,j_,q_,K_,X_,Ko,Z_,Ha,J_,Y_,Q_,e0,t0,n0,r0,o0,i0,a0,s0,u0,l0,c0,d0,p0,f0,h0,m0,Dc,kc,g0,b0,y0,YP,QP,_0,ja=L(()=>{"use strict";me();_e();Xe();we();ZP=(r,e,n,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=R("inputData",n,[s],4),d=j("outputData",t,[s],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${r.registerUniforms(f).declareVariables(l,d)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Ne=(r,e,n,t,o,i=r.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(k.size(r.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>ZP(l,k.size(r.dims),r.dataType,i,n,t,s),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(l[0].dims)/64/4)},programUniforms:u})}},z_=r=>{r.compute(Ne(r.inputs[0],"Abs","abs"))},B_=r=>{r.compute(Ne(r.inputs[0],"Acos","acos"))},M_=r=>{r.compute(Ne(r.inputs[0],"Acosh","acosh"))},V_=r=>{r.compute(Ne(r.inputs[0],"Asin","asin"))},F_=r=>{r.compute(Ne(r.inputs[0],"Asinh","asinh"))},G_=r=>{r.compute(Ne(r.inputs[0],"Atan","atan"))},U_=r=>{r.compute(Ne(r.inputs[0],"Atanh","atanh"))},W_=r=>fe(r),H_=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(Ne(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},JP=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:e,max:n})},j_=(r,e)=>{let n=e||JP(r.inputs),t=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},q_=r=>{r.compute(Ne(r.inputs[0],"Ceil","ceil"))},K_=r=>{r.compute(Ne(r.inputs[0],"Cos","cos"))},X_=r=>{r.compute(Ne(r.inputs[0],"Cosh","cosh"))},Ko=r=>fe(r),Z_=(r,e)=>{let n=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Ha=(r="f32")=>`
const r0: ${r} = 0.3275911;
const r1: ${r} = 0.254829592;
const r2: ${r} = -0.284496736;
const r3: ${r} = 1.421413741;
const r4: ${r} = -1.453152027;
const r5: ${r} = 1.061405429;

fn erf_vf32(v: vec4<${r}>) -> vec4<${r}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,J_=r=>{let e=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Ha(e)))},Y_=r=>{r.compute(Ne(r.inputs[0],"Exp","exp"))},Q_=r=>{r.compute(Ne(r.inputs[0],"Floor","floor"))},e0=r=>{let e=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Ha(e)))},t0=(r,e)=>{let n=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},n0=r=>{r.compute(Ne(r.inputs[0],"Not",e=>`!${e}`))},r0=r=>{r.compute(Ne(r.inputs[0],"Neg",e=>`-${e}`))},o0=r=>{r.compute(Ne(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},i0=r=>{let e=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},a0=r=>{r.compute(Ne(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},s0=r=>fe(r),u0=(r,e)=>{let n=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},l0=r=>{let e=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"HardSwish",n=>`${n} * max(vec4<${e}>(0.0), min(vec4<${e}>(1.0), vec4<${e}>(${e}(1.0 / 6.0)) * ${n} + vec4<${e}>(0.5)))`))},c0=r=>{r.compute(Ne(r.inputs[0],"Sin","sin"))},d0=r=>{r.compute(Ne(r.inputs[0],"Sinh","sinh"))},p0=r=>{r.compute(Ne(r.inputs[0],"Sqrt","sqrt"))},f0=r=>{r.compute(Ne(r.inputs[0],"Tan","tan"))},h0=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,m0=r=>{r.compute(Ne(r.inputs[0],"Tanh",h0))},Dc=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${h0("v")};
}
`,kc=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,g0=r=>{let e=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"FastGelu",kc,Dc(e),void 0,r.inputs[0].dataType))},b0=(r,e)=>{let n=et(r.inputs[0].dataType);return r.compute(Ne(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},y0=r=>{r.compute(Ne(r.inputs[0],"Log","log"))},YP=(r,e)=>`
const alpha = vec4<${r}>(${e});
const one = ${r}(1.0);
const zero = ${r}(0.0);

fn quick_gelu_impl(x: vec4<${r}>) -> vec4<${r}> {
  let v = x *alpha;
  var x1 : vec4<${r}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,QP=r=>`quick_gelu_impl(${r})`,_0=(r,e)=>{let n=et(r.inputs[0].dataType);r.compute(Ne(r.inputs[0],"QuickGelu",QP,YP(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var e3,t3,w0,x0=L(()=>{"use strict";_e();we();ja();e3=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},t3=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=R("input",r[0].dataType,r[0].dims,4),t=R("bias",r[0].dataType,[r[0].dims[2]],4),o=j("output",r[0].dataType,e,4),i=k.size(e)/4,a=Ue(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${Ha(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},w0=r=>{e3(r.inputs),r.compute(t3(r.inputs))}});var n3,r3,qn,T0,I0,S0,$0,A0,O0,P0,E0,C0,D0,k0=L(()=>{"use strict";me();_e();we();n3=(r,e,n,t,o,i,a,s,u,l,d,f)=>{let h,g;typeof s=="string"?h=g=(x,I)=>`${s}((${x}),(${I}))`:typeof s=="function"?h=g=s:(h=s.scalar,g=s.vector);let b=j("outputData",d,t.length,4),_=R("aData",u,e.length,4),T=R("bData",l,n.length,4),v;if(o)if(i){let x=k.size(e)===1,I=k.size(n)===1,$=e.length>0&&e[e.length-1]%4===0,P=n.length>0&&n[n.length-1]%4===0;x||I?v=b.setByOffset("global_idx",g(x?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),I?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):v=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",g(a||$?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||P?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=b.setByOffset("global_idx",g(_.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let x=(I,$,P="")=>{let E=`aData[indexA${$}][componentA${$}]`,z=`bData[indexB${$}][componentB${$}]`;return`
            let outputIndices${$} = ${b.offsetToIndices(`global_idx * 4u + ${$}u`)};
            let offsetA${$} = ${_.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
            let offsetB${$} = ${T.broadcastedIndicesToOffset(`outputIndices${$}`,b)};
            let indexA${$} = offsetA${$} / 4u;
            let indexB${$} = offsetB${$} / 4u;
            let componentA${$} = offsetA${$} % 4u;
            let componentB${$} = offsetB${$} % 4u;
            ${I}[${$}] = ${P}(${h(E,z)});
          `};d===9?v=`
            var data = vec4<u32>(0);
            ${x("data",0,"u32")}
            ${x("data",1,"u32")}
            ${x("data",2,"u32")}
            ${x("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${x("outputData[global_idx]",0)}
            ${x("outputData[global_idx]",1)}
            ${x("outputData[global_idx]",2)}
            ${x("outputData[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(_,T,b)}

        ${f??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},r3=(r,e,n,t,o,i,a=n.dataType)=>{let s=n.dims.map(Number),u=t.dims.map(Number),l=!k.areEqual(s,u),d=s,f=k.size(s),h=!1,g=!1,b=[l];if(l){let _=Gn.calcShape(s,u,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");d=_.slice(),f=k.size(d);let T=k.size(s)===1,v=k.size(u)===1,x=s.length>0&&s[s.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;b.push(T),b.push(v),b.push(x),b.push(I);let $=1;for(let P=1;P<d.length;P++){let E=s[s.length-P],z=u[u.length-P];if(E===z)$*=E;else break}$%4===0?(g=!0,h=!0):(T||v||x||I)&&(h=!0)}else h=!0;return b.push(h),{name:r,shaderCache:{hint:e+b.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>n3(_,s,u,d,h,l,g,o,n.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(d)/4)},...Z(s,u,d)]})}},qn=(r,e,n,t,o,i)=>{r.compute(r3(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},T0=r=>{qn(r,"Add",(e,n)=>`${e}+${n}`)},I0=r=>{qn(r,"Div",(e,n)=>`${e}/${n}`)},S0=r=>{qn(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},$0=r=>{qn(r,"Mul",(e,n)=>`${e}*${n}`)},A0=r=>{let e=R("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;qn(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},O0=r=>{qn(r,"Sub",(e,n)=>`${e}-${n}`)},P0=r=>{qn(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},E0=r=>{qn(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},C0=r=>{qn(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},D0=r=>{qn(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var i3,a3,s3,u3,N0,L0,R0=L(()=>{"use strict";me();_e();Xe();we();i3=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((a,s)=>{if(s!==n){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},a3=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,s3=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},u3=(r,e,n,t)=>{let o=k.size(n),i=new Array(r.length),a=new Array(r.length),s=0,u=[],l=[],d=[{type:12,data:o}];for(let _=0;_<r.length;++_)s+=r[_].dims[e],i[_]=s,l.push(r[_].dims.length),a[_]=R(`input${_}`,t,l[_]),u.push("rank"),d.push({type:12,data:i[_]});for(let _=0;_<r.length;++_)d.push(...Z(r[_].dims));d.push(...Z(n));let f=j("output",t,n.length),h=f.indicesGet("indices",e),g=Array.from(Array(i.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),b=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let T=0;T<r.length;T++)_.registerUniform(`sizeInConcatAxis${T}`,"u32");return _.declareVariables(...a,f)})()}

  ${a3(i.length,g)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${g});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${s3(a,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:b}},N0=(r,e)=>{let n=r.inputs,t=n[0].dims,o=k.normalizeAxis(e.axis,t.length);i3(n,o);let i=t.slice();i[o]=n.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=n.filter(s=>k.size(s.dims)>0);r.compute(u3(a,o,i,n[0].dataType),{inputs:a})},L0=r=>fe({axis:r.axis})});var Zt,Jt,Yt,qa,wr=L(()=>{"use strict";me();_e();Zt=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},Jt=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},Yt=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},qa=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[Gy,Uy];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var st,z0,Ka=L(()=>{"use strict";st=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},z0=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var B0,M0=L(()=>{"use strict";B0=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var Xo,Xa,Za=L(()=>{"use strict";me();_e();we();wr();Xo=(r,e,n,t,o)=>{let i=t-n;return`
      ${Array.from({length:n}).map((a,s)=>`
      if (${ie(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(r,s,ie(o,s+i,t))}
      } else {
        ${e.indicesSet(r,s,0)}
      }`).join("")}
`},Xa=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a[a.length-2],l=s[s.length-1],d=a[a.length-1],f=ke(l),h=ke(d),g=ke(u),b=k.size(n)/f/g,_=r.length>2,T=t?t.slice(0,-2):n.slice(0,-2),x=[k.size(T),u,l],I=[{type:12,data:b},{type:12,data:u},{type:12,data:l},{type:12,data:d}];Jt(e,I),I.push(...Z(T,a,s)),_&&I.push(...Z(r[2].dims)),I.push(...Z(x));let $=P=>{let E=Fa("batch_dims",r[0].dataType,T.length),z=R("a",r[0].dataType,a.length,h),M=R("b",r[1].dataType,s.length,f),H=j("output",r[0].dataType,x.length,f),K=Ue(H.type.tensor),B=Zt(e,H.type.value,K),ae=[z,M],V="";if(_){let X=o?f:1;ae.push(R("bias",r[2].dataType,r[2].dims.length,X)),V=`${o?`value += bias[col / ${X}];`:`value += ${H.type.value}(bias[row + i]);`}`}let S=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Yt(e,S);let F=()=>{let X=`var a_data: ${z.type.value};`;for(let te=0;te<h;te++)X+=`
              let b_data${te} = b[(b_offset + (k + ${te}) * uniforms.N + col) / ${f}];`;for(let te=0;te<g;te++){X+=`a_data = a[(a_offset + (row + ${te}) * uniforms.K + k) / ${h}];`;for(let J=0;J<h;J++)X+=`
            values[${te}] = fma(${M.type.value}(a_data${h===1?"":`[${J}]`}), b_data${J}, values[${te}]);
`}return X};return`
  ${P.registerUniforms(S).registerInternalVariables(E).declareVariables(...ae,H)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${E.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${Xo("a_indices",z,z.rank-2,E.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${M.type.indices};
    ${Xo("b_indices",M,M.rank-2,E.rank,"batch_indices")}
    ${M.indicesSet("b_indices",M.rank-2,0)}
    ${M.indicesSet("b_indices",M.rank-1,0)}
    let b_offset = ${M.indicesToOffset("b_indices")};
    var values: array<${H.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${F()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${V}
      ${B}
      let cur_indices = ${H.type.indices}(batch, row + i, col);
      let offset = ${H.indicesToOffset("cur_indices")};
      ${H.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${f};${h};${g};${o}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:I}),getShaderSource:$}}});var l3,c3,Nc,V0,d3,Lc,p3,Zo,Ja=L(()=>{"use strict";me();_e();we();wr();Za();Ka();l3=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,c3=(r,e)=>r?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Nc=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*r[1],l=e[0]*r[0],d=o?u:i,f=o?i:u,h=d/e[0],g=i/e[1];if(!((o&&h===4&&r[1]===4||!o&&(h===3||h===4))&&d%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${r[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${r[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${n}>, ${d/h}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/r[0]}>, ${i}>;

const rowPerThread = ${r[1]};
const colPerThread = ${r[0]};
const innerElementSize = ${h};
const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${l3(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${t?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${c3(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},V0=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,d3=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Lc=(r,e,n="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let l=r[1]*e[1],d=r[0]*e[0],f=o?l:i,h=o?i:l;if(!(h%e[1]===0&&f%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let g=h/e[1],b=f/e[0],_=i/e[1],T=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          ${V0(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${V0(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${t?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${d3(o)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${f}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${d}>, ${i}>;
  const rowPerThread = ${r[1]};
  const colPerThread = ${r[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${T}
  }
`},p3=(r,e,n,t,o=!1)=>{let[i,a,s,u]=t,l=Ue(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${st(r,l)} {
      var value = ${st(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Xo("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${st(r,l)} {
      var value = ${st(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Xo("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${st(r,l)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${st(r,l)}(bias[row])`};`:""}
        ${n}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Zo=(r,e,n,t,o=!1,i)=>{let a=r[0].dims,s=r[1].dims,u=a.slice(0,-2),l=s.slice(0,-2),d=t?t.slice(0,-2):n.slice(0,-2),f=k.size(d),h=a[a.length-2],g=a[a.length-1],b=s[s.length-1],_=g%4===0&&b%4===0,T=h<=8?[4,1,1]:[4,4,1],v=[8,8,1],x=[Math.ceil(b/v[0]/T[0]),Math.ceil(h/v[1]/T[1]),Math.ceil(f/v[2]/T[2])],I=_?4:1,$=[...u,h,g/I],P=$.length,E=[...l,g,b/I],z=E.length,M=[f,h,b/I],H=[{type:6,data:h},{type:6,data:b},{type:6,data:g}];Jt(e,H),H.push(...Z(d,$,E));let K=["rank","rank"],B=r.length>2;B&&(H.push(...Z(r[2].dims)),K.push("rank")),H.push(...Z(M));let ae=V=>{let S=d.length,F=Fa("batchDims",r[0].dataType,S,1),X=Ue(r[0].dataType),te=R("a",r[0].dataType,P,I),J=R("b",r[1].dataType,z,I),re=j("result",r[0].dataType,M.length,I),pe=[te,J];if(B){let D=o?I:1;pe.push(R("bias",r[2].dataType,r[2].dims.length,D))}let de=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Yt(e,de);let Ie=Ue(re.type.tensor),ge=Zt(e,re.type.value,Ie),W=p3(I,B,ge,[F,te,J,re],o);return`
  ${V.registerUniforms(de).registerInternalVariables(F).declareVariables(...pe,re)}
  ${W}
  ${_?Nc(T,v,X,F):Lc(T,v,X,F)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${e.activation};${_};${o}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:H}),getShaderSource:ae}}});var f3,F0,G0=L(()=>{"use strict";me();Fn();we();wr();Ka();M0();Ja();f3=(r,e,n,t,o=!1,i,a=4,s=4,u=4,l="f32")=>{let d=K=>{switch(K){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${K} is not supported.`)}},f=K=>{switch(K){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${K} is not supported.`)}},h=r?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=r?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,b=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=r?"row":"col",v=r?"col":"row",x=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${st(a,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${_}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(a)}
    }
    return resData;`,I=r?e&&t?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${x}
    }
    return ${st(a,l)}(0.0);`:t&&n?`
    let col = colIn * ${a};
    ${x}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${x}
    }
    return ${st(a,l)}(0.0);`,$=r?t&&n?f(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(s)}
    }
    return ${st(s,l)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(s)}
    }
    return ${st(s,l)}(0.0);`,P=st(u,l),E=r?st(a,l):st(s,l),z=r?st(s,l):st(a,l),M=Zt(i,P,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${r?I:$}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${r?$:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${P}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${z0(o)}
      ${M}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},F0=(r,e,n,t,o,i,a,s,u)=>{let l=e.format==="NHWC",d=l?r[0].dims[3]:r[0].dims[1],f=n[0],h=l?n[2]:n[3],g=l?n[1]:n[2],b=l?n[3]:n[1],_=l&&(d%4===0||d%3===0)&&b%4===0,T=l?b:h*g,v=l?h*g:b,x=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],$=[Math.ceil(T/x[0]/I[0]),Math.ceil(v/x[1]/I[1]),Math.ceil(f/x[2]/I[2])];Te("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let P=_?l&&d%4!==0?3:4:1,E=x[1]*I[1],z=x[0]*I[0],M=Math.max(x[0]*P,x[1]),H=t%E===0,K=o%z===0,B=i%M===0,ae=_?[P,4,4]:[1,1,1],V=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Jt(e,V),V.push(...Z(r[0].dims,r[1].dims));let S=["rank","rank"];a&&(V.push(...Z(r[2].dims)),S.push("rank")),V.push(...Z(n));let F=X=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Yt(e,te);let J=_?4:1,re=Ue(r[0].dataType),pe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${re}>`:re}) {
        result[flatIndex] = ${_?`vec4<${re}>`:re}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${re}>`:re}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,de=R("x",r[0].dataType,r[0].dims.length,P===3?1:P),Ie=R("w",r[1].dataType,r[1].dims.length,J),ge=[de,Ie],W=j("result",r[0].dataType,n.length,J);if(a){let D=R("bias",r[2].dataType,r[2].dims.length,J);ge.push(D),pe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${re}>`:re} {
          return bias[coords.${l?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${B0("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(te).declareVariables(...ge,W)}
        ${pe}
        ${f3(l,H,K,B,a,e,ae[0],ae[1],ae[2],re)}
        ${_?Nc(I,x,re,void 0,!l,M):Lc(I,x,re,void 0,!l,M,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${_};${H};${K};${B};${E};${z};${M}`,inputDependencies:S},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:V}),getShaderSource:F}}});var h3,U0,Ya,m3,W0,g3,H0,j0,q0=L(()=>{"use strict";me();Fn();_e();we();wr();Ka();h3=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},U0=r=>typeof r=="number"?[r,r,r]:r,Ya=(r,e)=>e<=1?r:r+(r-1)*(e-1),m3=(r,e,n,t=1)=>{let o=Ya(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},W0=(r,e,n,t,o)=>{o==null&&(o=m3(r,e[0],t[0]));let i=[0,0,0,n];for(let a=0;a<3;a++)r[a]+2*o>=e[a]&&(i[a]=Math.trunc((r[a]-e[a]+2*o)/t[a]+1));return i},g3=(r,e,n,t,o,i,a,s,u,l)=>{let d,f,h,g;if(r==="VALID"&&(r=0),typeof r=="number"){d={top:r,bottom:r,left:r,right:r,front:r,back:r};let b=W0([e,n,t,1],[s,u,l],1,[o,i,a],r);f=b[0],h=b[1],g=b[2]}else if(Array.isArray(r)){if(!r.every((_,T,v)=>_===v[0]))throw Error(`Unsupported padding parameter: ${r}`);d={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let b=W0([e,n,t,1],[s,u,l],1,[o,i,a],r[0]);f=b[0],h=b[1],g=b[2]}else if(r==="SAME_UPPER"){f=Math.ceil(e/o),h=Math.ceil(n/i),g=Math.ceil(t/a);let b=(f-1)*o+s-e,_=(h-1)*i+u-n,T=(g-1)*a+l-t,v=Math.floor(b/2),x=b-v,I=Math.floor(_/2),$=_-I,P=Math.floor(T/2),E=T-P;d={top:I,bottom:$,left:P,right:E,front:v,back:x}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:d,outDepth:f,outHeight:h,outWidth:g}},H0=(r,e,n,t,o,i=!1,a="channelsLast")=>{let s,u,l,d,f;if(a==="channelsLast")[s,u,l,d,f]=r;else if(a==="channelsFirst")[s,f,u,l,d]=r;else throw new Error(`Unknown dataFormat ${a}`);let[h,,g,b,_]=e,[T,v,x]=U0(n),[I,$,P]=U0(t),E=Ya(g,I),z=Ya(b,$),M=Ya(_,P),{padInfo:H,outDepth:K,outHeight:B,outWidth:ae}=g3(o,u,l,d,T,v,x,E,z,M),V=i?h*f:h,S=[0,0,0,0,0];return a==="channelsFirst"?S=[s,V,K,B,ae]:a==="channelsLast"&&(S=[s,K,B,ae,V]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:l,inWidth:d,inChannels:f,outDepth:K,outHeight:B,outWidth:ae,outChannels:V,padInfo:H,strideDepth:T,strideHeight:v,strideWidth:x,filterDepth:g,filterHeight:b,filterWidth:_,effectiveFilterDepth:E,effectiveFilterHeight:z,effectiveFilterWidth:M,dilationDepth:I,dilationHeight:$,dilationWidth:P,inShape:r,outShape:S,filterShape:e}},j0=(r,e,n,t,o,i)=>{let a=i==="channelsLast",s=a?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],d={x:n.map((x,I)=>I)},f=[Math.ceil(h3(d.x.map(x=>n[x]))/l[0]),1,1];Te("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let h=u?a&&s%4!==0?3:4:1,g=k.size(n),b=[{type:12,data:g},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Jt(e,b),b.push(...Z(r[0].dims,r[1].dims));let _=["rank","rank"],T=r.length===3;T&&(b.push(...Z(r[2].dims)),_.push("rank")),b.push(...Z(n));let v=x=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];Yt(e,I);let $=u?4:1,P=Ue(r[0].dataType),E=R("x",r[0].dataType,r[0].dims.length,h===3?1:h),z=R("W",r[1].dataType,r[1].dims.length,$),M=[E,z],H=j("result",r[0].dataType,n.length,$),K="";if(T){let V=R("bias",r[2].dataType,r[2].dims.length,$);M.push(V),K+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${a?ie("coords",4,5):ie("coords",1,5)}${u?"/ 4":""}];
        }`}let B=st(h,P),ae=Zt(e,B,P);return`
            ${K}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${x.registerUniforms(I).declareVariables(...M,H)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${H.offsetToIndices("global_idx")};
              let batch = ${ie("coords",0,E.rank)};
              let d2 = ${a?ie("coords",E.rank-1,E.rank):ie("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${a?ie("coords",1,E.rank):ie("coords",2,E.rank)},
              ${a?ie("coords",2,E.rank):ie("coords",3,E.rank)},
              ${a?ie("coords",3,E.rank):ie("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?ie("uniforms.x_shape",1,E.rank):ie("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${a?ie("uniforms.x_shape",2,E.rank):ie("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${a?ie("uniforms.x_shape",3,E.rank):ie("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${a?ie("uniforms.x_shape",4,E.rank):ie("uniforms.x_shape",1,E.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${a?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${a?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${T?"value = value + getBiasByOutputCoords(coords)":""};
              ${ae}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${h};${T}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:b}),getShaderSource:v}}});var K0,X0,Z0=L(()=>{"use strict";me();_e();we();wr();K0=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",a=r[0].dims,s=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],d=l/e.group,f=u&&d>=4?ke(l):1,h=k.size(n)/f,g=[{type:12,data:h},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:d}];Jt(e,g),g.push(...Z(a,[s[0],s[1],s[2],s[3]/f]));let b=o?["rank","rank","rank"]:["rank","rank"];g.push(...Z([n[0],n[1],n[2],n[3]/f]));let _=T=>{let v=j("output",r[0].dataType,n.length,f),x=Ue(v.type.tensor),I=Zt(e,v.type.value,x),$=R("x",r[0].dataType,a.length),P=R("w",r[1].dataType,s.length,f),E=[$,P];o&&E.push(R("b",r[2].dataType,r[2].dims,f));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Yt(e,z);let M=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${$.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${P.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${$.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${P.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(z).declareVariables(...E,v)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${M}
    ${i}
    ${I}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${f}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},X0=(r,e,n,t)=>{let o=r.length>2,i=ke(n[3]),a=ke(n[2]),s=k.size(n)/i/a,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],d=[n[0],n[1],n[2],n[3]/i],f=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Jt(e,f),f.push(...Z(u,l,d));let h=(a-1)*e.strides[1]+l[1],g=b=>{let _=j("output",r[0].dataType,d.length,i),T=Ue(_.type.tensor),v=Zt(e,_.type.value,T),x=R("x",r[0].dataType,u.length,i),I=R("w",r[1].dataType,l.length,i),$=[x,I];o&&$.push(R("b",r[2].dataType,r[2].dims,i));let P=o?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Yt(e,E),`
  ${b.registerUniforms(E).declareVariables(...$,_)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${x.type.value}, ${h}>;
    var values: array<${_.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${x.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${x.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${I.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${P}
      ${v}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${h};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}),getShaderSource:g}}});var b3,Rc,y3,zc,Bc,J0,_3,v3,Mc,Y0=L(()=>{"use strict";_e();G0();q0();Ja();Z0();wr();Za();er();b3=(r,e,n,t,o,i)=>{let a=r[0],s=r.slice(i?1:2,i?3:4),u=s.length,l=e[0],f=e.slice(2).map((b,_)=>b+(b-1)*(n[_]-1)),g=s.map((b,_)=>b+t[_]+t[_+u]).map((b,_)=>Math.floor((b-f[_]+o[_])/o[_]));return g.splice(0,0,a),g.splice(i?3:1,0,l),g},Rc=[2,3,1,0],y3=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},zc=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();Ur.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},Bc=r=>{let e=qa(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,a=r.kernel_shape,s=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},J0=(r,e,n,t)=>{let o=n.format==="NHWC",i=b3(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let E=[e[0]];if(o){let M=r.kernelCustomData.wT??r.compute(lt(e[1],Rc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=M),E.push(M)}else E.push(e[1]);e.length===3&&E.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(X0(E,n,i,t),{inputs:E}):r.compute(K0(E,n,i,t),{inputs:E});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],d=e[1].dims[2],f=e[1].dims[3],h=i[o?1:2],g=i[o?2:3],b=i[o?3:1],_=o&&d===s&&f===u&&n.pads[0]===0&&n.pads[1]===0;if(_||d===1&&f===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let E=i[0],z,M,H,K=[];if(o){let V=r.kernelCustomData.wT??r.compute(lt(e[1],Rc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=V),_){let S=s*u*l;z=e[0].reshape([1,E,S]),M=V.reshape([1,S,b]),H=[1,E,b]}else z=e[0].reshape([E,s*u,l]),M=V.reshape([1,l,b]),H=[E,h*g,b];K.push(z),K.push(M)}else z=e[0].reshape([E,l,s*u]),M=e[1].reshape([1,b,l]),H=[E,b,h*g],K.push(M),K.push(z);a&&K.push(e[2]);let B=H[2],ae=K[0].dims[K[0].dims.length-1];B<8&&ae<8?r.compute(Xa(K,n,i,H,o,t),{inputs:K}):r.compute(Zo(K,n,i,H,o,t),{inputs:K});return}let T=!0,v=r.kernelCustomData.wT??r.compute(lt(e[1],Rc),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=v);let x=[e[0],v];a&&x.push(e[2]);let I=o?h*g:b,$=o?b:h*g,P=d*f*l;r.compute(F0(x,n,i,I,$,P,a,T,t),{inputs:x})},_3=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=zc({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);J0(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},v3=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=zc(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,a=H0(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(j0(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Mc=(r,e)=>{if(y3(r.inputs,e),r.inputs[0].dims.length===3)_3(r,e);else if(r.inputs[0].dims.length===5)v3(r,r.inputs,e);else{let n=zc(e,r.inputs);J0(r,r.inputs,n)}}});var Q0,ev=L(()=>{"use strict";me();Fn();_e();we();Q0=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=r[1].dims,u=s[2]/a,l=s[3],d=i?ke(u):1,f=i&&l===1&&u>=4,h=f?Math.floor(u/4)*4:Math.floor(u/d)*d,g=u-h,b=i?ke(l):1,_=i?l===1?d:b:1,T=k.size(o)/b,v=[Math.ceil(T/64),1,1];Te("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let x=["rank","rank"],I=[e.strides[0],e.strides[1]],$=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],P=[e.dilations[0],e.dilations[1]],E=[$[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),$[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],z=[E[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),E[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],M=[{type:12,data:T},{type:12,data:I},{type:12,data:$},{type:12,data:P},{type:12,data:E},{type:6,data:z},{type:12,data:h},{type:12,data:u},{type:12,data:l},...Z(r[0].dims,r[1].dims)];t&&(M.push(...Z(r[2].dims)),x.push("rank")),M.push(...Z(o));let H=K=>{let B=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:I.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:E.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],ae=Ue(r[0].dataType),V=i?1:2,S=i?2:3,F=i?3:1,X=R("W",r[1].dataType,r[1].dims.length,_),te=R("Dy",r[0].dataType,r[0].dims.length,d),J=[te,X];t&&J.push(R("bias",r[2].dataType,[o[F]].length,b));let re=j("result",r[0].dataType,o.length,b),pe=()=>{let ge="";if(f)d===4?ge+=`
        let xValue = ${te.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:d===2?ge+=`
          dotProd = dotProd + dot(vec4<${ae}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}), vec4<${ae}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:d===1&&(ge+=`
          dotProd = dotProd + dot(vec4<${ae}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}, ${te.getByOffset("x_offset + 2u")}, ${te.getByOffset("x_offset + 3u")}), vec4<${ae}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ge+=`
                  let xValue = ${i?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d}`):te.get("batch","inputChannel","idyR","idyC")};
        `,d===1)ge+=`
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let W=0;W<d;W++)ge+=`
            let wValue${W} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${W}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${W}] * wValue${W};`;return ge},de=()=>{if(g===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let ge="";if(d===1){ge+="dotProd = dotProd";for(let W=0;W<g;W++)ge+=`
            + ${te.getByOffset(`x_offset + ${W}`)} * ${X.getByOffset(`w_offset + ${W}`)}`;ge+=";"}else if(d===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);ge+=`
          let xValue = ${te.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ge},Ie=`
            let outputIndices = ${re.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${re.indicesGet("outputIndices",0)};
            let d1 = ${re.indicesGet("outputIndices",F)};
            let r = ${re.indicesGet("outputIndices",V)};
            let c = ${re.indicesGet("outputIndices",S)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${re.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${ae}(dyRCorner) + ${ae}(wR)) / ${ae}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${ae}(uniforms.Dy_shape[${V}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${ae}(dyCCorner) + ${ae}(wC)) / ${ae}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${ae}(uniforms.Dy_shape[${S}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${d};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:d}) {
                  ${pe()}
                  inputChannel = inputChannel + ${f?4:d};
                }
                ${de()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${b}]`:""};
            ${re.setByOffset("global_idx","value")};
          `;return`
    ${K.registerUniforms(B).declareVariables(...J,re)}
      ${K.mainStart()}
      ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Ie}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${d}${_}${b}${f}${g}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:M}),getShaderSource:H}}});var w3,x3,T3,tv,nv,I3,rv,S3,ov,iv=L(()=>{"use strict";ev();wr();er();w3=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,x3=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},T3=(r,e,n,t,o,i,a,s,u,l)=>{let d=r.length-2,f=l.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let h=r[0],g=e[s?3:1]*o;for(let b=0,_=r.length-d-(s?1:0);b<d;++b,++_){let T=r[_],v=f?T*a[b]:l[b],x=w3(T,a[b],i[b],e[_],n[b],v);x3(x,t,i,b,b+d),f&&l.push(a[b]*(T-1)+u[b]+(e[_]-1)*n[b]+1-i[b]-i[b+d])}l.splice(0,0,h),l.splice(s?3:1,0,g)},tv=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((f,h)=>f*h,1)===0){n.length=0;for(let f=2;f<e[1].dims.length;++f)n.push(e[1].dims[f])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),a=r.outputPadding.slice(),s=e[0].dims,u=r.dilations.slice();if(u.reduce((f,h)=>f+h,0)===0){let f=e[0].dims.length-2;u=new Array(f).fill(1)}let l=r.strides.slice();if(l.reduce((f,h)=>f+h,0)===0){let f=e[0].dims.length-2;l=new Array(f).fill(1)}T3(s,n,u,r.autoPad,r.group,o,l,t,a,i);let d=Object.assign({},r);return Object.assign(d,{kernelShape:n,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:l}),d},nv=r=>{let e=qa(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group??1,a=r.kernelShape,s=r.pads,u=r.strides,l=r.wIsConst(),d=r.outputPadding,f=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:a,outputPadding:d,outputShape:f,pads:s,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},I3=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((d,f)=>d+f,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((d,f)=>d+f,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((d,f)=>d+f,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((d,f)=>d+f,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},rv=(r,e,n,t)=>{let o=r.kernelCustomData.wT??r.compute(lt(e[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),r.compute(Q0(i,n,t),{inputs:i})},S3=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=tv({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);rv(r,t,l,d=>n?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},ov=(r,e)=>{if(I3(r.inputs,e),r.inputs[0].dims.length===3)S3(r,e);else{let n=tv(e,r.inputs);rv(r,r.inputs,n)}}});var $3,av,sv,uv=L(()=>{"use strict";me();_e();Xe();we();$3=(r,e,n,t)=>{let o=k.size(e),i=e.length,a=R("input",r,i),s=j("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=k.normalizeAxis(u,i),d=f=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,g=ie("uniforms.input_shape","uniforms.axis",i),b=t.reverse?h+(t.exclusive?" + 1":""):"0",_=t.reverse?g:h+(t.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...Z(e,e)]}),getShaderSource:d}},av=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute($3(t,n,o,e),{inputs:[0]})},sv=r=>{let e=r.exclusive===1,n=r.reverse===1;return fe({exclusive:e,reverse:n})}});var A3,O3,P3,lv,cv,dv=L(()=>{"use strict";me();_e();Xe();we();A3=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},O3=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},P3=(r,e)=>{let n,t,o,i,a,s,u=e.format==="NHWC",l=e.blocksize,d=e.mode==="DCR";u?([n,t,o,i]=r.dims,a=d?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],s=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],a=d?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],s=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=r.reshape(a),h=f.dims.length,g=r.dataType,b=R("a",g,h),_=j("output",g,h),T=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(b,_)}

  ${O3(s,h,b,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:v=>{let x=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],I=k.size(x),$=f.dims,P=k.sortBasedOnPerm($,s);return{outputs:[{dims:x,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...Z($,P)]}},getShaderSource:T}},lv=(r,e)=>{A3(r.inputs),r.compute(P3(r.inputs[0],e))},cv=r=>fe({blocksize:r.blocksize,mode:r.mode,format:r.format})});var xr,Qa,Vc,fv,jr,E3,C3,D3,hv,mv,gv,k3,N3,pv,L3,bv,yv,_v=L(()=>{"use strict";me();_e();Xe();we();xr=256,Qa=512,Vc=2*Math.PI,fv=r=>{let e=[],n=r;for(let t of[4,2,3,5])for(;n%t===0;)e.push(t),n/=t;return n===1?e:void 0},jr=r=>{let e=r.toPrecision(9);return/[.eE]/.test(e)?e:`${e}.0`},E3=(r,e,n,t,o)=>{let i=n/r,a=Qa-t,s=l=>`smem[${a}u + base + ${l*e}u]`,u=`  for (var t = local_idx; t < ${i}u; t += ${xr}u) {
`;u+=`    let twiddleIndex = t % ${e}u;
    let angleUnit = f32(twiddleIndex);
`,u+=`    var leg: array<vec2<f32>, 5>;
`;for(let l=0;l<r;l++){let d=`${t}u + t + ${l*i}u`;if(l===0)u+=`    leg[0] = smem[${d}];
`;else{let f=o*Vc*l/(r*e);u+=`    { let a = ${jr(f)} * angleUnit; leg[${l}] = cmul(smem[${d}], vec2<f32>(cos(a), sin(a))); }
`}}if(u+=`    let base = (t / ${e}u) * ${e*r}u + twiddleIndex;
`,r===2)u+=`    ${s(0)} = leg[0] + leg[1];
    ${s(1)} = leg[0] - leg[1];
`;else if(r===4){let l=o<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";u+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,u+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,u+=`    let oddRot = ${l};
`,u+=`    ${s(0)} = evenSum + oddSum;
    ${s(1)} = evenDiff + oddRot;
`,u+=`    ${s(2)} = evenSum - oddSum;
    ${s(3)} = evenDiff - oddRot;
`}else for(let l=0;l<r;l++){let d=["leg[0]"];for(let f=1;f<r;f++){let h=o*Vc*(f*l)/r,g=jr(Math.cos(h)),b=jr(Math.sin(h));d.push(`vec2<f32>(leg[${f}].x*${g} - leg[${f}].y*${b}, leg[${f}].x*${b} + leg[${f}].y*${g})`)}u+=`    ${s(l)} = ${d.join(" + ")};
`}return`${u}  }
  workgroupBarrier();
`},C3=(r,e,n)=>{let t="",o=1,i=0;for(let a of r)t+=E3(a,o,e,i,n),o*=a,i=Qa-i;return{code:t,resultOffset:i}},D3=(r,e,n,t,o)=>{let i=r.dims,a=i.length,s=i[a-1],u=i[e],l=n&&t?(u-1)*2:u;o!==void 0&&(l=o);let d=n&&t?1:2,f=t&&!n?Math.floor(l/2)+1:l,h=i.slice();h[e]=f,h[a-1]=d;let g=1;for(let _=e+1;_<a-1;_++)g*=i[_];let b=k.size(i)/s/u;return{dataType:r.dataType,outputDims:h,length:l,signalLength:u,inner:g,batch:b,inputComponents:s,outputComponents:d,outputLength:f,inverse:n,onesided:t}},hv=(r,e)=>[e,r.length,r.inputComponents,r.outputComponents,r.inverse,r.onesided].join(";"),mv=r=>[{type:12,data:r.batch},{type:12,data:r.signalLength},{type:12,data:r.inner},{type:12,data:r.outputLength}],gv=(r,e,n)=>r.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(e,n),k3=r=>{let{dataType:e,length:n,inputComponents:t,outputComponents:o,inverse:i,onesided:a}=r,s=et(e),u=i?1:-1,l=i?1/n:1,d=fv(n),f=h=>{let g=R("x",e,[1]),b=j("y",e,[1]),_=P=>{let E=`inBase + (${P}) * uniforms.inner * ${t}u`,z=`f32(${g.getByOffset(E)})`,M=t===2?`f32(${g.getByOffset(`${E} + 1u`)})`:"0.0";return`vec2<f32>(${z}, ${M})`},T;if(i&&a){let P=Math.floor(n/2)+1,E=n%2===0?`select(provided, provided - 1u, provided == ${P}u)`:"provided";T=`
    let provided = min(uniforms.signalLength, ${P}u);
    for (var i = local_idx; i < ${n}u; i += ${xr}u) {
      if (i < provided) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${E}; k += ${xr}u) {
      let h = smem[k];
      smem[${n}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else T=`
    let loadCount = min(uniforms.signalLength, ${n}u);
    for (var i = local_idx; i < ${n}u; i += ${xr}u) {
      if (i < loadCount) { smem[i] = ${_("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:v,resultOffset:x}=C3(d,n,u),I=l===1?`smem[${x}u + i]`:`smem[${x}u + i] * ${jr(l)}`,$=o===2?b.setByOffset("off + 1u",`${s}(v.y)`):"";return`
  ${gv(h,g,b)}
  var<workgroup> smem: array<vec2<f32>, ${2*Qa}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${h.mainStart(xr)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${t}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${o}u;
    ${T}
${v}    for (var i = local_idx; i < uniforms.outputLength; i += ${xr}u) {
      let v = ${I};
      let off = outBase + i * uniforms.inner * ${o}u;
      ${b.setByOffset("off",`${s}(v.x)`)}
      ${$}
    }
  }`};return{name:"DFT",shaderCache:{hint:hv(r,"fft"),inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:r.outputDims,dataType:e}],programUniforms:mv(r),dispatchGroup:{x:r.batch}})}},N3=r=>{let{dataType:e,length:n,inputComponents:t,outputComponents:o,inverse:i,onesided:a}=r,s=et(e),u=i?1:-1,l=i?1/n:1,d=f=>{let h=R("x",e,[1]),g=j("y",e,[1]),b=I=>{let $=`inBase + (${I}) * uniforms.inner * ${t}u`,P=`f32(${h.getByOffset($)})`,E=t===2?`f32(${h.getByOffset(`${$} + 1u`)})`:"0.0";return`vec2<f32>(${P}, ${E})`},_=i&&a?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(n/2)+1}u);
    if (k < provided) { return ${b("k")}; }
    let m = ${n}u - k;
    if (m < provided) {
      let h = ${b("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${b("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,T=`
      let angle = ${jr(u*Vc)} * f32(knMod) / ${jr(n)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${n}u) { knMod -= ${n}u; }`,v=o===2?g.setByOffset("off + 1u",`${s}(v.y)`):"",x=l===1?"acc":`acc * ${jr(l)}`;return`
  ${gv(f,h,g)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${_}
  ${f.mainStart(xr)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${t}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${o}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${xr}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${n}u; n++) {${T}
      }
      let v = ${x};
      let off = outBase + k * uniforms.inner * ${o}u;
      ${g.setByOffset("off",`${s}(v.x)`)}
      ${v}
    }
  }`};return{name:"DFT",shaderCache:{hint:hv(r,"direct"),inputDependencies:["type"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:r.outputDims,dataType:e}],programUniforms:mv(r),dispatchGroup:{x:r.batch}})}},pv=r=>{if(!r||r.dataType===0)return;if(k.size(r.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(r.dataType===6)return r.getInt32Array()[0];let e=Number(r.getBigInt64Array()[0]);if(!Number.isSafeInteger(e))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return e},L3=r=>{if(!r||r.length<1)throw new Error("DFT requires at least 1 input.");let e=r[0].dims;if(e.length<2)throw new Error("DFT input must have at least 2 dimensions.");let n=e[e.length-1];if(n!==1&&n!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},bv=(r,e)=>{L3(r.inputs);let n=r.inputs[0],t=n.dims.length,o=e.inverse!==0,i=e.onesided!==0,a=pv(r.inputs[1]);if(a!==void 0&&a<=0)throw new Error("dft_length must be greater than zero.");let s=k.normalizeAxis(pv(r.inputs[2])??e.axis,t);if(s===t-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(o&&i&&n.dims[t-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let u=D3(n,s,o,i,a);if(u.length<=0)throw new Error(`Invalid DFT length: ${u.length}`);let d=u.length<=Qa&&fv(u.length)!==void 0?k3(u):N3(u);r.compute(d,{inputs:[0]})},yv=r=>fe({axis:r.axis??1,inverse:r.inverse??0,onesided:r.onesided??0})});var Fc,es,vv,R3,z3,Gc,Uc,wv,B3,xv,Tv,Iv=L(()=>{"use strict";me();_e();Xe();we();Fc="[a-zA-Z]|\\.\\.\\.",es="("+Fc+")+",vv="^"+es+"$",R3="("+es+",)*"+es,z3="^"+R3+"$",Gc=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},Uc=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(z3)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let l=e[u].dims.slice();if(!s.match(RegExp(vv)))throw new Error("Invalid LHS term");let d=this.processTerm(s,!0,l,u);this.lhs.push(d)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(es)))throw new Error("Invalid RHS");o.match(RegExp(Fc,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(vv))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Fc,"g")),d=new Gc(o);return l?.forEach((f,h)=>{if(f==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=i-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<s.length;b++){let _=String.fromCharCode(48+b);d.addSymbol(_,h+b),this.addSymbol(_,t[u++],o)}}else d.addSymbol(f,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,t[u++],o)}),d}},wv=r=>r+"_max",B3=(r,e,n,t)=>{let i=r.map(d=>d.length).map((d,f)=>R(`input${f}`,e,d)),a=k.size(t),s=j("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(d=>!n.rhs.symbolToIndices.has(d)),l=d=>{let f=[],h="var prod = 1.0;",g="var sum = 0.0;",b="sum += prod;",_=[],T=[],v=[],x=[],I=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((P,E)=>{if(n.rhs.symbolToIndices.has(E)){let z=n.rhs.symbolToIndices.get(E)?.[0];z!==void 0&&n.lhs.forEach((M,H)=>{if(P.inputIndices.includes(H)){let K=M.symbolToIndices.get(E);if(K===void 0)throw new Error("Invalid symbol error");K.forEach(B=>{f.push(`${i[H].indicesSet(`input${H}Indices`,B,s.indicesGet("outputIndices",z))}`)})}})}else n.lhs.forEach((z,M)=>{if(P.inputIndices.includes(M)){let H=z.symbolToIndices.get(E);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(K=>{_.push(`${i[M].indicesSet(`input${M}Indices`,K,`${E}`)}`)}),x.push(`prod *= ${i[M].getByIndices(`input${M}Indices`)};`)}}),T.push(`for(var ${E}: u32 = 0; ${E} < uniforms.${wv(E)}; ${E}++) {`),v.push("}")});let $=I?[...f,`let sum = ${i.map((P,E)=>P.getByIndices(`input${E}Indices`)).join(" * ")};`]:[...f,g,...T,..._,h,...x,b,...v];return`
            ${d.registerUniforms(u.map(P=>({name:`${wv(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((P,E)=>`var input${E}Indices: ${i[E].type.indices};`).join(`
`)}
            ${$.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let d=u.filter(h=>n.symbolToInfo.has(h)).map(h=>({type:12,data:n.symbolToInfo.get(h)?.dimValue||0}));d.push({type:12,data:a});let f=r.map((h,g)=>[...Z(h)]).reduce((h,g)=>h.concat(g),d);return f.push(...Z(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}},getShaderSource:l}},xv=(r,e)=>{let n=new Uc(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,a)=>i.dims);r.compute(B3(o,r.inputs[0].dataType,n,t))},Tv=r=>{let e=r.equation.replace(/\s+/g,"");return fe({equation:e})}});var M3,Sv,V3,F3,$v,Av=L(()=>{"use strict";me();_e();we();M3=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Sv=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},V3=(r,e)=>r.length>e.length?Sv(r,e):Sv(e,r),F3=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=V3(e,n),o=r[0].dataType,i=o===9||k.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(k.size(t)/s),l=f=>{let h=R("input",o,e.length,a),g=j("output",o,t.length,s),b;if(o===9){let _=(T,v,x="")=>`
          let outputIndices${v} = ${g.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${h.broadcastedIndicesToOffset(`outputIndices${v}`,g)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${T}[${v}] = ${x}(${h.getByOffset(`index${v}`)}[component${v}]);
        `;b=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(h,g)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},d=[{type:12,data:u},...Z(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},$v=r=>{M3(r.inputs),r.compute(F3(r.inputs),{inputs:[0]})}});var G3,Ov,Pv=L(()=>{"use strict";me();_e();we();ja();G3=r=>{let e=r[0].dataType,n=k.size(r[0].dims),t=k.size(r[1].dims),o=t%4===0,i=a=>{let s=R("x",e,[1],4),u=R("bias",e,[1],4),l=j("y",e,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${u.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,h=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(d).declareVariables(s,u,l)}

    ${Dc(et(e))}

    ${a.mainStart(Wr)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",kc("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/Wr/4)}})}},Ov=r=>{r.inputs.length<2||k.size(r.inputs[1].dims)===0?g0(r):r.compute(G3(r.inputs))}});var U3,W3,Ev,Cv,Dv=L(()=>{"use strict";me();_e();Xe();we();U3=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},W3=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=k.normalizeAxis(e.axis,o),a=n.slice(0);a.splice(i,1,...t);let s=n[i],u=r[0].dataType===9?4:1,l=Math.ceil(k.size(a)/u),d=[{type:12,data:l},{type:6,data:s},{type:12,data:i},...Z(r[0].dims,r[1].dims,a)],f=h=>{let g=R("data",r[0].dataType,r[0].dims.length,u),b=R("inputIndices",r[1].dataType,r[1].dims.length),_=j("output",r[0].dataType,a.length,u),T=x=>{let I=t.length,$=`var indicesIndices${x}  = ${b.type.indices}(0);`;for(let P=0;P<I;P++)$+=`${I>1?`indicesIndices${x}[${P}]`:`indicesIndices${x}`} = ${a.length>1?`outputIndices${x}[uniforms.axis + ${P}]`:`outputIndices${x}`};`;$+=`
          var idx${x} = ${b.getByIndices(`indicesIndices${x}`)};
          if (idx${x} < 0) {
            idx${x} = idx${x} + uniforms.axisDimLimit;
          }
          var dataIndices${x} : ${g.type.indices};
        `;for(let P=0,E=0;P<o;P++)P===i?($+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = u32(idx${x});`,E+=I):($+=`${o>1?`dataIndices${x}[${P}]`:`dataIndices${x}`} = ${a.length>1?`outputIndices${x}[${E}]`:`outputIndices${x}`};`,E++);return $},v;if(r[0].dataType===9){let x=(I,$,P="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          ${T($)};
          let offset${$} = ${g.indicesToOffset(`dataIndices${$}`)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${I}[${$}] = ${P}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;v=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${x("value",0,"u32")}
        ${x("value",1,"u32")}
        ${x("value",2,"u32")}
        ${x("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${g.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,b,_)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:f}},Ev=r=>fe({axis:r.axis}),Cv=(r,e)=>{let n=r.inputs;U3(n),r.compute(W3(r.inputs,e))}});var H3,kv,Nv,Lv=L(()=>{"use strict";me();_e();we();H3=(r,e,n,t,o,i,a,s,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:12,data:u}],d=[i];l.push(...Z(e.dims,d));let f=h=>{let g=R("indices_data",e.dataType,e.dims.length),b=j("input_slice_offsets_data",12,1,1),_=[g,b],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(T).declareVariables(..._)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${o.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${n.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return r.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:r.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:f},{inputs:[e],outputs:[-1]})[0]},kv=(r,e)=>{let n=r.inputs,t=n[0].dims,o=n[0].dataType,i=n[1].dims,a=i[i.length-1],s=k.sizeToDimension(i,i.length-1),u=k.sizeFromDimension(t,e.batchDims+a),l=k.sizeToDimension(t,e.batchDims),d=k.sizeFromDimension(t,e.batchDims),f=s/l,h=new Array(a),g=u;for(let $=0;$<a;++$)h[a-1-$]=g,g*=t[e.batchDims+a-1-$];let b=H3(r,n[1],h,e.batchDims,t,s,f,d,a),_=e.batchDims+a;if(_>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=i.slice(0,-1).concat(t.slice(_)),v=k.size(T),x=[{type:12,data:v},{type:12,data:u},...Z(n[0].dims,b.dims,T)],I=$=>{let P=R("data",n[0].dataType,n[0].dims.length),E=R("slice_offsets",12,b.dims.length),z=j("output",n[0].dataType,T.length);return`
          ${$.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(P,E,z)}
            ${$.mainStart()}
            ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};r.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:o}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:x}),getShaderSource:I},{inputs:[n[0],b]})},Nv=r=>({batchDims:r.batch_dims,cacheKey:""})});var j3,q3,Rv,zv,Bv=L(()=>{"use strict";me();_e();Xe();we();j3=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=k.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],a=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===n?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},q3=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=k.normalizeAxis(e.gatherAxis,o),a=k.normalizeAxis(e.quantizeAxis,o),s=n.slice(0);s.splice(i,1,...t);let u=k.size(s),l=r[2].dataType,f=r[0].dataType===22,h=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...Z(...r.map((b,_)=>b.dims),s)],g=b=>{let _=R("data",r[0].dataType,r[0].dims.length),T=R("inputIndices",r[1].dataType,r[1].dims.length),v=R("scales",r[2].dataType,r[2].dims.length),x=r.length>3?R("zeroPoint",r[3].dataType,r[3].dims.length):void 0,I=j("output",l,s.length),$=[_,T,v];x&&$.push(x);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(P).declareVariables(...$,I)}
        ${b.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${T.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${T.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${T.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${v.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${v.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${v.getByIndices("scale_indices")};
        ${x?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${x.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${x.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${et(l)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((b,_)=>_!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(b,_)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:g}},Rv=(r,e)=>{let n=r.inputs;j3(n,e),r.compute(q3(r.inputs,e))},zv=r=>fe({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var K3,X3,Mv,Vv,Fv=L(()=>{"use strict";me();_e();Xe();we();K3=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},X3=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,a=r[1].dataType,s=k.normalizeAxis(e.axis,o),u=n[s],l=i.slice(0),d=k.size(l),f=R("input",t,o),h=R("indicesInput",a,i.length),g=j("output",t,l.length),b=[{type:12,data:d},{type:6,data:u},{type:12,data:s}];return b.push(...Z(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:b}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,g)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},Mv=r=>fe({axis:r.axis}),Vv=(r,e)=>{let n=r.inputs;K3(n),r.compute(X3(r.inputs,e))}});var Z3,J3,Gv,Uv,Wv=L(()=>{"use strict";me();_e();we();Z3=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},J3=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,a]=ka.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),d=Math.ceil(o/u),f=!0,h=k.size(s),g=[{type:12,data:f?l:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],b=["type","type"];r.length===3&&(g.push(...Z(r[2].dims)),b.push("rank")),g.push(...Z(s));let _=v=>{let x="";e.transA&&e.transB?x="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?x="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?x="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(x="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",$=R("a",r[0].dataType,r[0].dims),P=R("b",r[1].dataType,r[1].dims),E=$.type.value,z=null,M=[$,P];r.length===3&&(z=R("c",r[2].dataType,r[2].dims.length),M.push(z));let H=j("output",r[0].dataType,s.length);M.push(H);let K=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(K).declareVariables(...M)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${x}
    }

    ${I}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",H)}; value += ${E}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=v=>{let x=R("a",r[0].dataType,r[0].dims),I=R("b",r[1].dataType,r[1].dims),$=null,P=[x,I];r.length===3&&($=R("c",r[2].dataType,r[2].dims.length),P.push($));let E=j("output",r[0].dataType,s.length);P.push(E);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],M="",H="";e.transA&&e.transB?(H=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(H=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(H=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(H=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${x.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let K=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(z).declareVariables(...P)}
  var<workgroup> tile_a: array<array<${x.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${v.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${H}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${M}
      }
      workgroupBarrier();
    }

    ${K}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${$!=null?`let cOffset = ${$.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${$.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:l*d},programUniforms:g}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},Gv=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},Uv=(r,e)=>{Z3(r.inputs),r.compute(J3(r.inputs,e))}});var tr,Tr,go,bo,Y3,Q3,eE,tE,nE,rE,oE,iE,Hv,jv,qv=L(()=>{"use strict";me();_e();Xe();we();[tr,Tr,go,bo]=[0,1,2,3],Y3=r=>{if(r[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(r[0].dims.length!==r[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(r[0].dims.length-2!==r[1].dims[r[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${r[0].dims.length-2}`);if(r[0].dims[0]!==r[1].dims[0])throw new Error("grid batch size must match input batch size")},Q3=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,eE=r=>`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,tE=r=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${r.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,nE=r=>`
  ${r.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,rE=(r,e,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${tr}] = batch;
     indices[${Tr}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${go}] = u32(r);
            indices[${bo}] = u32(c);
          } else {
            return ${e}(0);
          }
        `;case"border":return`
          indices[${go}] = u32(clamp(r, 0, H - 1));
          indices[${bo}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${go}] = gs_reflect(r, border[1], border[3]);
          indices[${bo}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${r.getByIndices("indices")};
  }
`,oE=(r,e,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${tr}], indices[${Tr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${tr}], indices[${Tr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${tr}], indices[${Tr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${tr}], indices[${Tr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${tr}], indices[${Tr}], border);

          let dx2 = ${e}(f32(x2) - x);
          let dx1 = ${e}(x - f32(x1));
          let dy2 = ${e}(f32(y2) - y);
          let dy1 = ${e}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${e}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${tr}], indices[${Tr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${r.setByOffset("global_idx","result")}`,iE=(r,e)=>{let n=R("x",r[0].dataType,r[0].dims.length),t=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],o=R("grid",r[1].dataType,t.length,2),i=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]];e.format==="NHWC"&&(i=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[tr,Tr,go,bo]=[0,3,1,2]);let a=j("output",r[0].dataType,i.length),s=n.type.value,u=k.size(i),l=[{type:12,data:u},...Z(r[0].dims,t,i)],d=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(n,o,a)}
  ${Q3}
  ${eE(s)}
  ${tE(e)}
  ${nE(e)}
  ${rE(n,s,e)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${go}]);
      let W_in = i32(uniforms.x_shape[${bo}]);

      ${e.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${tr}], indices[${go}], indices[${bo}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${oE(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let h=k.size(i);return{outputs:[{dims:i,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:l}},getShaderSource:d}},Hv=(r,e)=>{Y3(r.inputs),r.compute(iE(r.inputs,e))},jv=r=>fe({alignCorners:r.align_corners,mode:r.mode,paddingMode:r.padding_mode,format:r.format})});var It,uE,Xv,Kv,lE,Jo,Zv,Wc=L(()=>{"use strict";me();_e();Xe();Ma();Wa();we();er();It=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,uE=(r,e)=>{let n=r[0],t=It(r,1),o=It(r,2),i=It(r,3),a=It(r,4),s=It(r,5),u=It(r,6),l=It(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=n.dims[0],f=n.dims[1],h=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],g=f,b=0,_=0,T=Math.floor(h/e.numHeads);if(u&&l&&k.size(u.dims)&&k.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==e.numHeads||u.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==d||l.dims[1]!==e.numHeads||l.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=u.dims[2],_=u.dims[2]}else if(u&&k.size(u.dims)||l&&k.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(t&&k.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,g=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,g=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,g=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let x=b+g,I=0;if(a&&k.size(a.dims)>0){I=8;let z=a.dims;throw z.length===1?z[0]===d?I=1:z[0]===3*d+2&&(I=3):z.length===2&&z[0]===d&&z[1]===x&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let $=!1,P=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(g!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(g!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],$=!0}}let E=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&k.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==d||s.dims[1]!==e.numHeads||s.dims[2]!==f||s.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:f,pastSequenceLength:b,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:h,vHiddenSize:P,headSize:T,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:E,passPastInKv:$,qkvFormat:v}},Xv=r=>fe({...r}),Kv=fe({perm:[0,2,1,3]}),lE=(r,e,n,t,o,i,a)=>{let s=[t,o,i],u=k.size(s),l=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],d=f=>{let h=j("qkv_with_bias",e.dataType,s),g=R("qkv",e.dataType,s),b=R("bias",n.dataType,s),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(_).declareVariables(g,b,h)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[e,n],outputs:[-1]})[0]},Jo=(r,e,n,t,o,i,a,s)=>{let u=i;if(a&&k.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=lE(r,i,a,e,t,n*o,s),u=u.reshape([e,t,n,o]),n===1||t===1?u:r.compute(lt(u,Kv.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),n===1||t===1?u:r.compute(lt(u,Kv.perm),{inputs:[u],outputs:[-1]})[0]},Zv=(r,e)=>{let n=uE(r.inputs,e),t=r.inputs[0],o=It(r.inputs,1),i=It(r.inputs,2),a=It(r.inputs,3),s=It(r.inputs,4),u=It(r.inputs,5),l=It(r.inputs,6),d=It(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&i&&o.dims.length===4&&i.dims.length===4,h=Jo(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,a,0);if(f)return mo(r,h,o,i,s,void 0,l,d,u,n);if(!o||!i)throw new Error("key and value must be provided");let g=Jo(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,a,n.hiddenSize),b=Jo(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,a,2*n.hiddenSize);mo(r,h,g,b,s,void 0,l,d,u,n)}});var cE,dE,pE,fE,Hc,Jv,Yv,jc=L(()=>{"use strict";me();_e();Xe();we();cE=r=>{if(!r||r.length<1)throw new Error("too few inputs")},dE=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),fe({numOutputs:t,axis:e.axis,splitSizes:n})},pE=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${ie("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,fE=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Hc=(r,e)=>{let n=r[0].dims,t=k.size(n),o=r[0].dataType,i=k.normalizeAxis(e.axis,n.length),a=new Array(e.numOutputs),s=R("input",o,n.length),u=new Array(e.numOutputs),l=[],d=[],f=0,h=[{type:12,data:t}];for(let b=0;b<e.numOutputs;b++){f+=e.splitSizes[b],u[b]=f;let _=n.slice();_[i]=e.splitSizes[b],d.push(_),a[b]=j(`output${b}`,o,_.length),l.push({dims:d[b],dataType:r[0].dataType})}h.push({type:12,data:u},...Z(n,...d));let g=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${pE(u.length)}
  ${fE(a)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${ie("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},Jv=(r,e)=>{cE(r.inputs);let n=r.inputs.length===1?e:dE(r.inputs,e);r.compute(Hc(r.inputs,n),{inputs:[0]})},Yv=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes length must be equal");return fe({axis:e,numOutputs:t,splitSizes:n})}});var hE,ts,Qv,qc=L(()=>{"use strict";me();_e();Xe();we();hE=(r,e)=>{let[n,t,o,i]=r,{numHeads:a,rotaryEmbeddingDim:s}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!k.areEqual(t.dims,[])&&!k.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],d=o.dims[0],f=k.sizeFromDimension(n.dims,1)/l,h=s===0?o.dims[1]*2:f/a;if(s>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(l>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(h/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`)},ts=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=r[0].dims[0],s=k.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=s/u,d=r[2].dims[1],f=o===0?d*2:l/t,h=new Array(a,u,l/f,f-d),g=k.computeStrides(h),b=[{type:1,data:i},{type:12,data:h},{type:12,data:g},...r[0].dims.length===3?new Array({type:12,data:[s,l,f,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[s,f,u*f,1]}):[],...Z(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],_=T=>{let v=R("input",r[0].dataType,r[0].dims.length),x=R("position_ids",r[1].dataType,r[1].dims.length),I=R("cos_cache",r[2].dataType,r[2].dims.length),$=R("sin_cache",r[3].dataType,r[3].dims.length),P=j("output",r[0].dataType,r[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${T.declareVariables(v,x,I,$,P)}

        ${T.mainStart(Wr)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${x.broadcastedIndicesToOffset("bsnh.xy",j("",x.type.tensor,2))};
            let position_id =
                u32(${x.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${v.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${$.get("position_id","bsnh[3]")};
            ${P.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${$.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${P.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${P.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Wr)},programUniforms:b})}},Qv=(r,e)=>{hE(r.inputs,e),r.compute(ts(r.inputs,e))}});var mE,gE,ew,bE,tw,nw=L(()=>{"use strict";Xe();me();Wa();Wc();jc();er();qc();we();mE=(r,e)=>{if(e.doRotary&&r.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=r[0],t=r[1],o=r[2],i=r[3],a=r[4];if(e.doRotary!==0&&r.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=n.dims[0],l=n.dims[1],d=n.dims.length===3?s?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],f=l,h=0,g=!t||t.dims.length===0,b=Math.floor(g?d/(e.numHeads+2*e.kvNumHeads):d/e.numHeads);g&&(d=b*e.numHeads);let _=i&&i.dims.length!==0,T=a&&a.dims.length!==0;if(_&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&T){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(_||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let x=1;if(t&&t.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');f=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');x=3}let I=0,$=!1,P=e.kvNumHeads?b*e.kvNumHeads:d;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],$=!0}}let E=r.length>4?r[5]:void 0;if(E){if(E.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let K=E.dims.reduce((B,ae)=>B*ae,1);if(K!==u)throw new Error(`seqlens_k must have batch_size (${u}) elements, got ${K}.`);for(let B=0;B<E.dims.length;B++)if(E.dims[B]!==1&&E.dims[B]!==u)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${u}), got dims[${B}] = ${E.dims[B]}.`)}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:P,headSize:b,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:!1,passPastInKv:$,qkvFormat:x}},gE=fe({perm:[0,2,1,3]}),ew=(r,e,n)=>{let t=e,o=n.kvNumHeads;return e.dims.length===3&&n.kvSequenceLength!==0&&(t=e.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),t=r.compute(lt(t,gE.perm),{inputs:[t],outputs:[-1]})[0]),t},bE=(r,e,n,t)=>{let o=7,i=["type","type"],a=[r*e],s=r*e,u=[{type:12,data:s},{type:12,data:e},{type:12,data:r}],l=d=>{let f=R("seq_lens",n.dataType,n.dims),h=R("total_seq_lens",t.dataType,t.dims),g=j("pos_ids",o,a),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${d.registerUniforms(b).declareVariables(f,h,g)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${g.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${r};${e}`,inputDependencies:i},getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u}),getShaderSource:l}},tw=(r,e)=>{if(r.inputs.length>14&&r.inputs[14]||r.inputs.length>15&&r.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let n=mE(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=r.inputs[0],o=r.inputs[1]&&r.inputs[1].dims.length>0?r.inputs[1]:void 0,i=r.inputs[2]&&r.inputs[2].dims.length>0?r.inputs[2]:void 0,a=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,s=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,u=r.inputs.length>4?r.inputs[5]:void 0,l=r.inputs.length>5?r.inputs[6]:void 0,d=n.kvNumHeads?n.kvNumHeads:n.numHeads,f=fe({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,d*n.headSize,d*n.headSize]}),[h,g,b]=!o&&!i?r.compute(Hc([t],f),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],_,T;if(e.doRotary){let $=r.compute(bE(n.batchSize,n.sequenceLength,u,l),{inputs:[u,l],outputs:[-1]})[0],P=r.inputs[7],E=r.inputs[8],z=fe({interleaved:e.rotaryInterleaved!==0,numHeads:n.numHeads,rotaryEmbeddingDim:0,scale:e.scale}),M=[h,$,P,E],H=[-1];_=r.compute(ts(M,z),{inputs:M,outputs:H})[0],M.splice(0,1,g);let K=fe({interleaved:e.rotaryInterleaved!==0,numHeads:n.kvNumHeads,rotaryEmbeddingDim:0,scale:e.scale});T=r.compute(ts(M,K),{inputs:M,outputs:H})[0]}let v=Jo(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,e.doRotary?_:h,void 0,0),x=ew(r,e.doRotary?T:g,n),I=ew(r,b,n);mo(r,v,x,I,void 0,void 0,a,s,void 0,n,u,l)}});var rw,yE,_E,ow,iw=L(()=>{"use strict";me();_e();er();we();rw=(r,e,n,t,o,i,a,s)=>{let u=ke(i),l=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,f=o*a,h=64;f===1&&(h=256);let g=[o,a,i/u],b=[o,a,2],_=["rank","type","type"],T=[];T.push(...Z(g,b));let v=x=>{let I=R("x",e.dataType,3,u),$=R("scale",n.dataType,n.dims),P=R("bias",t.dataType,t.dims),E=j("output",1,3,2),z=[I,$,P,E];return`
  var<workgroup> workgroup_shared : array<${d}, ${h}>;
  const workgroup_size = ${h}u;
  ${x.declareVariables(...z)}
  ${x.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${I.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Xt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Xt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${h}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:v},{inputs:[e,n,t],outputs:[-1]})[0]},yE=(r,e,n)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=k.sizeFromDimension(t,i),l=ke(u),d=k.size(o)/l,f=rw(r,e[0],e[1],e[2],a,u,s,n.epsilon),h=[a,s,u/l],g=[a,s],b=["type","none"],_=T=>{let v=R("x",e[0].dataType,h.length,l),x=R("scale_shift",1,g.length,2),I=j("output",e[0].dataType,h.length,l),$=[v,x,I];return`
  ${T.registerUniform("output_size","u32").declareVariables(...$)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${x.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...Z(h,g,h)]}),getShaderSource:_},{inputs:[e[0],f]})},_E=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=k.sizeFromDimension(t,1)/a,u=ke(a),l=k.size(o)/u,d=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],f=["type","type"],h=!1,g=[0,t.length-1];for(let v=0;v<t.length-2;v++)h=h||t[v+1]!==1,g.push(v+1);h=h&&t[t.length-1]!==1;let b=h?r.compute(lt(r.inputs[0],g),{inputs:[r.inputs[0]],outputs:[-1]})[0]:r.inputs[0].reshape(Array.from({length:t.length},(v,x)=>t[g[x]])),_=rw(r,b,e[1],e[2],i,s,a,n.epsilon),T=v=>{let x=Ue(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,$=z=>{let M=z===0?"x":"y",H=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${x}(${H}(scale.${M}))`;case 2:return`vec2<${x}>(${H}(scale[0].${M}, scale[1].${M}))`;case 4:return`vec4<${x}>(${H}(scale[0].${M}, scale[1].${M}, scale[2].${M}, scale[3].${M}))`;default:throw new Error(`Not supported compoents ${u}`)}},P=R("input",e[0].dataType,e[0].dims,u),E=j("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${P.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${$(0)}, ${$(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:T},{inputs:[e[0],_]})},ow=(r,e)=>{e.format==="NHWC"?_E(r,r.inputs,e):yE(r,r.inputs,e)}});var vE,wE,aw,sw=L(()=>{"use strict";me();_e();we();vE=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},wE=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],a=!t&&r[2],s=o,u=k.normalizeAxis(e.axis,o.length),l=k.sizeToDimension(o,u),d=k.sizeFromDimension(o,u),f=k.size(i.dims),h=a?k.size(a.dims):0;if(f!==d||a&&h!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${h}`);let g=[];for(let P=0;P<o.length;++P)P<u?g.push(o[P]):g.push(1);let b=ke(d),_=["type","type"],T=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/b)},{type:1,data:e.epsilon}];a&&_.push("type");let v=n>1,x=n>2,I=P=>{let E=Ue(r[0].dataType),z=[R("x",r[0].dataType,r[0].dims,b),R("scale",i.dataType,i.dims,b)];a&&z.push(R("bias",a.dataType,a.dims,b)),z.push(j("output",r[0].dataType,s,b)),v&&z.push(j("mean_data_output",1,g)),x&&z.push(j("inv_std_output",1,g));let M=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(M).declareVariables(...z)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Oc("f32",b)};
    var mean_square_vector = ${Oc("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Hr(E,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Xt("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Xt("mean_square_vector",b)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Hr(E,b,"x[j + offset]")};
      let f32scale = ${Hr(E,b,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Hr(E,b,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${x?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},$=[{dims:s,dataType:r[0].dataType}];return v&&$.push({dims:g,dataType:1}),x&&$.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${t}`,inputDependencies:_},getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:T}),getShaderSource:I}},aw=(r,e)=>{vE(r.inputs),r.compute(wE(r.inputs,e,r.outputCount))}});var xE,uw,lw=L(()=>{"use strict";_e();Za();Ja();xE=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},uw=r=>{xE(r.inputs);let e=Gn.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];if(n<8&&t<8)r.compute(Xa(r.inputs,{activation:""},e));else{let o=e[e.length-2],i=k.size(r.inputs[0].dims.slice(0,-2)),a=k.size(r.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=r.inputs[0].reshape([1,i,t]),u=r.inputs[1].reshape([1,t,n]),l=[1,i,n],d=[s,u];r.compute(Zo(d,{activation:""},e,l),{inputs:d})}else r.compute(Zo(r.inputs,{activation:""},e))}}});var TE,IE,SE,cw,dw,pw=L(()=>{"use strict";me();_e();Xe();we();TE=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=r[1];if(!k.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if(k.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let d=r[3].dims,f=e.n*(e.bits===8?o:Math.floor((o*e.bits+7)/8));if(k.size(d)!==f)throw new Error("zeroPoints input size error.")}},IE=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=k.size(s),d=r[1].dims[2]/4,f=r[0].dataType,h=ke(e.k),g=ke(d),b=ke(a),_=s.concat([o,a]),T=o>1&&a/b%2===0?2:1,v=k.size(_)/b/T,x=64,I=[],$=[u,o,i/h],P=k.convertShape(r[1].dims).slice();P.splice(-1,1,d/g),I.push(...Z($)),I.push(...Z(P)),I.push(...Z(r[2].dims)),r.length===4&&I.push(...Z(k.convertShape(r[3].dims)));let E=[u,o,a/b];I.push(...Z(E));let z=M=>{let H=$.length,K=R("a",r[0].dataType,H,h),B=R("b",12,P.length,g),ae=R("scales",r[2].dataType,r[2].dims.length),V=[K,B,ae],S=r.length===4?R("zero_points",12,r[3].dims.length):void 0;S&&V.push(S);let F=E.length,X=j("output",r[0].dataType,F,b),te=Ue(r[0].dataType),J=(()=>{switch(h){case 1:return`array<${te}, 8>`;case 2:return`mat4x2<${te}>`;case 4:return`mat2x4<${te}>`;default:throw new Error(`${h}-component is not supported.`)}})(),re=Math.floor(32/e.bits),pe=Math.floor(re/8),de=()=>{let W="";for(let D=0;D<pe;D++){let oe=D*e.bits*4,He=oe+e.bits;W+=`
          // reuse a data (pass ${D})
            var input_offset${D>0?D:""} = ${D===0?K.indicesToOffset(`${K.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${D>0?D:""}: ${J};
            for (var j${D>0?D:""}: u32 = 0; j${D>0?D:""} < ${8/h}; j${D>0?D:""}++) {
              a_data${D>0?D:""}[j${D>0?D:""}] = ${K.getByOffset(`input_offset${D>0?D:""}`)};
              input_offset${D>0?D:""}++;
            }
          `;for(let Ce=0;Ce<b*T;Ce++)W+=`
            b_value = ${g===1?`b${Ce}_data`:`b${Ce}_data[i]`};
            ${e.bits===2?`{
              let half_word = b_value >> ${D*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${oe}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${He}u) & b_mask);`}
            b_quantized_values = ${J}(${Array.from({length:4},(ot,Ae)=>`${te}(b_value_lower[${Ae}]), ${te}(b_value_upper[${Ae}])`).join(", ")});
            b_dequantized_values = ${h===1?`${J}(${Array.from({length:8},(ot,Ae)=>`(b_quantized_values[${Ae}] - ${S?`zero_point${Ce}`:"zero_point"}) * scale${Ce}`).join(", ")});`:`(b_quantized_values - ${J}(${Array(8).fill(`${S?`zero_point${Ce}`:"zero_point"}`).join(",")})) * scale${Ce};`};
            workgroup_shared[local_id.x * ${T} + ${Math.floor(Ce/b)}]${b>1?`[${Ce%b}]`:""} += ${Array.from({length:8/h},(ot,Ae)=>`${h===1?`a_data${D>0?D:""}[${Ae}] * b_dequantized_values[${Ae}]`:`dot(a_data${D>0?D:""}[${Ae}], b_dequantized_values[${Ae}])`}`).join(" + ")};
          `}return W},Ie=()=>{let W=`
            var col_index = col * ${b};
            ${S?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${te}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            `;for(let D=0;D<b*T;D++)W+=`
            let scale${D} = ${ae.getByOffset("col_index * nBlocksPerCol + block")};
            ${S?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            zero_point_word = ${S.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${D} = ${te}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return W},ge=()=>{let W=`col_index = col * ${b};`;for(let D=0;D<b*T;D++)W+=`
            let b${D}_data = ${B.getByIndices(`${B.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return W+=`
            var b_value: u32;
            let b_mask: u32 = ${e.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${J};
            var b_dequantized_values: ${J};`,W};return`
        var<workgroup> workgroup_shared: array<${X.type.value}, ${T*x}>;
        ${M.declareVariables(...V,X)}
        ${M.mainStart([x,1,1])}
          let output_indices = ${X.offsetToIndices(`(global_idx / ${x}) * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${x}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/h};
            ${Ie()}
            for (var word: u32 = 0; word < ${d}; word += ${g}) {
              ${ge()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${de()}
                word_offset += ${re/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${T}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${x}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${T};
            }
            ${X.setByIndices(`${X.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${h};${g};${b};${T};${x}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:f}],dispatchGroup:{x:v},programUniforms:I}),getShaderSource:z}},SE=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,a=e.n,s=n.slice(0,t-2),u=k.size(s),d=r[1].dims[2]/4,f=r[0].dataType,h=ke(e.k),g=ke(d),b=s.concat([o,a]),_=128,T=a%8===0?8:a%4===0?4:1,v=_/T,x=Math.floor(32/e.bits),I=v*g*x,$=I/h,P=I/e.blockSize,E=k.size(b)/T,z=[],M=[u,o,i/h],H=k.convertShape(r[1].dims).slice();H.splice(-1,1,d/g),z.push(...Z(M)),z.push(...Z(H)),z.push(...Z(r[2].dims)),r.length===4&&z.push(...Z(k.convertShape(r[3].dims)));let K=[u,o,a];z.push(...Z(K));let B=ae=>{let V=M.length,S=R("a",r[0].dataType,V,h),F=R("b",12,H.length,g),X=R("scales",r[2].dataType,r[2].dims.length),te=[S,F,X],J=r.length===4?R("zero_points",12,r[3].dims.length):void 0;J&&te.push(J);let re=K.length,pe=j("output",r[0].dataType,re),de=Ue(r[0].dataType),Ie=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${de}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${de}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${de}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${de}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${S.type.value}, ${$}>;
        var<workgroup> inter_results: array<array<${pe.type.value}, ${v}>, ${T}>;
        ${ae.declareVariables(...te,pe)}
        ${ae.mainStart([v,T,1])}
          let output_indices = ${pe.offsetToIndices(`workgroup_index * ${T}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${P} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${$};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${$}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${S.getByIndices(`${S.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${S.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${P} + local_id.x;
            ${J?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/e.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${e.bits}u);
            let zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${de}((zero_point_word) & ${e.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,e.bits-1)} for unsigned ${e.bits}-bit quantization.
            let zero_point = ${de}(${Math.pow(2,e.bits-1).toFixed(1)});`}
            let scale = ${X.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${F.getByIndices(`${F.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/h};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g===1?"b_data":"b_data[i]"};
              ${(()=>{let ge=Math.floor(x/8),W="";for(let D=0;D<ge;D++){let oe=D*e.bits*4,He=oe+e.bits;W+=`
              ${Ie()}
              {${e.bits===2?`
                let half_word = b_value >> ${D*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${oe}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${He}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${de}>(${Array.from({length:4},(Ce,ot)=>`${de}(b_value_lower[${ot}]), ${de}(b_value_upper[${ot}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${de}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ce,ot)=>`${`dot(a_data${ot}, b_dequantized_values[${ot}])`}`).join(" + ")};
              }
              word_offset += ${8/h};`}return W})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${T}) {
            var output_value: ${pe.type.value} = ${pe.type.value}(0);
            for (var b = 0u; b < ${v}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${pe.setByIndices(`${pe.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${h};${g};${v};${T}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:f}],dispatchGroup:{x:E},programUniforms:z}),getShaderSource:B}},cw=(r,e)=>{TE(r.inputs,e),e.blockSize===32&&r.adapterInfo.isVendor("intel")&&r.adapterInfo.isArchitecture("gen-12lp")?r.compute(SE(r.inputs,e)):r.compute(IE(r.inputs,e))},dw=r=>fe(r)});var $E,AE,OE,PE,EE,CE,DE,kE,fw,hw=L(()=>{"use strict";me();_e();we();$E=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},AE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${ie("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${ie("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${ie("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},OE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ie("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${ie("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${ie("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${ie("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},PE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ie("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${ie("uniforms.x_shape",o,e)})) {
                  k = i32(${ie("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${ie("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},EE=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${ie("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${ie("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${ie("uniforms.x_shape",o,e)})) {
                  k -= i32(${ie("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${ie("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},CE=(r,e,n)=>{switch(n.mode){case 0:return AE(r,e,n.pads.length);case 1:return OE(r,e,n.pads.length);case 2:return PE(r,e,n.pads.length);case 3:return EE(r,e,n.pads.length);default:throw new Error("Invalid mode")}},DE=(r,e)=>{let n=k.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=k.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],a=r.length>=3&&r[2].data;e.mode===0&&i.push({type:a?r[2].dataType:1,data:e.value}),i.push(...Z(r[0].dims,n));let s=["rank"],u=l=>{let d=j("output",r[0].dataType,n.length),f=R("x",r[0].dataType,t.length),h=f.type.value,g=CE(d,t.length,e),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&b.push({name:"constant_value",type:a?h:"f32"}),`
            ${l.registerUniforms(b).declareVariables(f,d)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(n)/64)},programUniforms:i}),getShaderSource:u}},kE=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let s=r[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(n[u]),i[Number(s[u])+o]=Number(n[u+s.length])}else n.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},fw=(r,e)=>{$E(r.inputs);let n=kE(r.inputs,e);r.compute(DE(r.inputs,n),{inputs:[0]})}});var ns,mw,gw,bw,yw,NE,LE,_w,vw,ww,xw,Tw,Iw,Sw,$w,Aw,Ow,Pw,Ew,Cw=L(()=>{"use strict";ft();me();_e();we();ns=r=>{if(ye.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},mw=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Ur.adjustPoolAttributes(n,o,a,s,u,l);let d=Ur.computePoolOutputShape(n,o,s,u,a,l,e.autoPad,e.ceilMode),f=Object.assign({},e);i?Object.assign(f,{kernelShape:a,strides:s,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:a,strides:s,pads:l,cacheKey:e.cacheKey});let h=d.slice();return h.push(h.splice(1,1)[0]),[f,t?h:d]},gw=(r,e)=>{let n=e.format==="NHWC",t=k.size(r),o=k.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],d=e.pads[e.pads.length-1],f=!!(l+d);i.push({type:12,data:s},{type:12,data:u},{type:12,data:l},{type:12,data:d}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(e.kernelShape.length===2){let g=e.kernelShape[e.kernelShape.length-2],b=e.strides[e.strides.length-2],_=e.pads[e.pads.length/2-2],T=e.pads[e.pads.length-2];h=!!(_+T),i.push({type:12,data:g},{type:12,data:b},{type:12,data:_},{type:12,data:T}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,f,h]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=k.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,d)=>l+d);return[i,a,!!u,!1,!1]}},bw=(r,e,n,t,o,i,a,s,u,l,d,f)=>{let h=o.format==="NHWC",g=e.type.value,b=j("output",e.type.tensor,t);if(o.kernelShape.length<=2){let _="",T="",v="",x=n-(h?2:1);if(d?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${x}] < 0 || xIndices[${x}]
                      >= uniforms.x_shape[${x}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${x}] = indices[${x}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let $=n-(h?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${$}] < 0 || xIndices[${$}] >= uniforms.x_shape[${$}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,b)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${g}(${s});
              var pad = 0;
              ${T}
              ${_}
              ${v}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=o.kernelShape.length,T=o.pads.length,v="";return l?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:v=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,b)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${g}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${ie("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${ie("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${n-_}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${ie("uniforms.strides",`j - ${n-_}u`,_)}
                    + offsets[j - ${n-_}u] - ${ie("uniforms.pads","j - 2u",T)};
                  ${v}
              }
              ${a}

              output[global_idx] = value;
            }`}},yw=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,NE=r=>`${yw(r)};${r.countIncludePad}`,LE=r=>`${yw(r)};${r.storageOrder};${r.dilations}`,_w=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),vw=(r,e,n,t)=>{let[o,i]=mw(e,t,n),a=R("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${s}(uniforms.kernelSize);`:l+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[d,f,h,g,b]=gw(i,o);d.push(...Z(e.dims,i));let _=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${h};${g};${b}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:d}),getShaderSource:T=>bw(T,a,e.dims.length,i.length,o,u,l,0,f,h,g,b)}},ww=r=>{let e=r.count_include_pad!==0,n=_w(r);if(n.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:NE(t)}},xw=(r,e)=>{ns(r.inputs),r.compute(vw("AveragePool",r.inputs[0],!1,e))},Tw={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Iw=r=>{let e=r.format;return{format:e,...Tw,cacheKey:e}},Sw=(r,e)=>{ns(r.inputs),r.compute(vw("GlobalAveragePool",r.inputs[0],!0,e))},$w=(r,e,n,t)=>{let[o,i]=mw(e,t,n),a=`
      value = max(x_val, value);
    `,s="",u=R("x",e.dataType,e.dims.length),l=["rank"],[d,f,h,g,b]=gw(i,o);return d.push(...Z(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${h};${g};${b}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:d}),getShaderSource:_=>bw(_,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,f,h,g,b)}},Aw=(r,e)=>{ns(r.inputs),r.compute($w("MaxPool",r.inputs[0],!1,e))},Ow=r=>{let e=r.storage_order,n=r.dilations,t=_w(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:LE(o)}},Pw=r=>{let e=r.format;return{format:e,...Tw,cacheKey:e}},Ew=(r,e)=>{ns(r.inputs),r.compute($w("GlobalMaxPool",r.inputs[0],!0,e))}});var zE,BE,Dw,kw,Nw=L(()=>{"use strict";me();_e();Xe();we();zE=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},BE=(r,e)=>{let n=k.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,a=r[1].dataType,s=k.size(i),u=t===3||t===2,l=u?[Math.ceil(k.size(r[0].dims)/4)]:r[0].dims,d=r[1].dims,f=r.length>2?r[2]:void 0,h=f?u?[Math.ceil(k.size(f.dims)/4)]:f.dims:void 0,g=d.length===0||d.length===1&&d[0]===1,b=g===!1&&d.length===1,_=ke(s),T=g&&(!u||_===4),v=T?_:1,x=T&&!u?_:1,I=R("input",u?12:t,l.length,x),$=R("scale",a,d.length),P=f?R("zero_point",u?12:t,h.length):void 0,E=j("output",a,i.length,v),z=[I,$];P&&z.push(P);let M=[l,d];f&&M.push(h);let H=[{type:12,data:s/v},{type:12,data:n},{type:12,data:e.blockSize},...Z(...M,i)],K=B=>{let ae=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${B.registerUniforms(ae).declareVariables(...z,E)}
      ${B.mainStart()}
          ${B.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${$.getByOffset("0")}`:b?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${$.getByOffset("scale_index")};`:`
            var scale_indices: ${$.type.indices} = output_indices;
            let index = ${$.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${$.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${$.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${P?g?u?`
                let zero_point_input = ${P.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${P.getByOffset("0")}`:b?u?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${P.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${P.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${$.indicesToOffset("scale_indices")};
                let zero_point_input = ${P.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${P.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:K,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/v/64),y:1,z:1},programUniforms:H})}},Dw=(r,e)=>{zE(r.inputs,e),r.compute(BE(r.inputs,e))},kw=r=>fe({axis:r.axis,blockSize:r.blockSize})});var ME,VE,Lw,Rw=L(()=>{"use strict";ft();me();we();ME=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},VE=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:r},{type:t,data:n},...Z(i)],u=l=>{let d=j("output",t,i.length),f=d.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${l.registerUniforms(h).declareVariables(d)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},Lw=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),ye.webgpu.validateInputContent&&ME(e,n,t),r.compute(VE(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var FE,GE,zw,Bw,Mw=L(()=>{"use strict";me();_e();Xe();we();FE=(r,e,n,t)=>{if(r!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${r}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${e}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(r){case"none":return`${e}=${n};`;case"add":return t==="i32"||t==="u32"?`atomicAdd(&${e}, bitcast<${t}>(${n}));`:`
              ${o}bitcast<${t}>(oldValue) + (${n})${i}`;case"max":return t==="i32"||t==="u32"?`atomicMax(&${e}, bitcast<${t}>(${n}));`:`
                ${o}max(bitcast<f32>(oldValue), (${n}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${n}));`:`${o}min(bitcast<${t}>(oldValue), (${n}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${n}))${i}`;default:throw new Error(`Reduction ${r} is not supported.`)}},GE=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n,i=1,a=Math.ceil(k.sizeToDimension(t,t.length-1)/i),s=t[t.length-1],u=k.sizeFromDimension(n,s),l=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...Z(r[1].dims,r[2].dims,o)],d=f=>{let h=R("indices",r[1].dataType,r[1].dims.length),g=R("updates",r[2].dataType,r[2].dims.length,i),b=e.reduction!=="none"&&e.reduction!==""?n_("output",r[0].dataType,o.length):j("output",r[0].dataType,o.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(h,g,b)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${r[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${FE(e.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l}),getShaderSource:d}},zw=r=>fe({reduction:r.reduction}),Bw=(r,e)=>{r.compute(GE(r.inputs,e),{inputs:[r.inputs[1],r.inputs[2]],outputs:[]})}});var UE,WE,HE,Vw,jE,qE,KE,XE,ZE,JE,YE,QE,Fw,eC,tC,nC,rC,oC,Gw,Uw,Ww=L(()=>{"use strict";me();_e();Xe();we();UE=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},WE=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},HE=(r,e,n,t,o,i)=>{let[a,s,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(a>0&&r.length>a&&r[a].dims.length>0)r[a].getFloat32Array().forEach(d=>i.push(d));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&r.length>s&&r[s].dims.length===1&&r[s].dims[0]>0){if(r[s].getFloat32Array().forEach(d=>t.push(d)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");UE(t,e),e.axes.length>0&&WE(t,e.axes,l).forEach((d,f)=>t[f]=d)}if(u>0&&r.length>u&&r[u].dims.length===1&&r[u].dims[0]>0&&(r[u].getBigInt64Array().forEach(d=>o.push(Number(d))),o.length!==0&&o.length!==l&&n>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},Vw=(r,e,n,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${r}) * (${e});
  let whole = ${t}(big / (${n}));
  let fract = ${t}(big % (${n})) / ${t}(${n});
  return whole + fract;
`,jE=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${Vw("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Vw("xResized","lengthOriginal - 1","lengthResized - 1",e)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",qE=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",KE=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+n]=o[e.length+a]}),t):o},XE=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=n[a])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,a)=>Math.round(i*e[a]))}return o},ZE=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},JE=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${ie("uniforms.scales","i",t)};
        var roi_low = ${ie("uniforms.roi","i",o)};
        var roi_hi = ${ie("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${ie("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${ie("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,YE=(r,e,n,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${ie("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${ie("uniforms.roi","i",i)};
          var roi_hi = ${ie("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${ie("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${ie("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${r.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,QE=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${ie("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,Fw=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",eC=(r,e,n,t,o)=>{let[a,s,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],d=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(row, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${Fw(r,l,a,2)}
      return ${r.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${n[s]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[s]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},tC=(r,e,n,t,o,i,a,s,u,l)=>{let d=n.length===2,f=!0,[h,g]=d?[0,1]:f?[2,3]:[1,2],b=r.type.value,_=T=>{let v=T===h?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${b} {
        var output_index = ${e.indicesGet("output_indices",T)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[T]},
        ${t[T]}, ${n[T]}, ${i[T]}, ${i[T]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${n[T]} - 1))) {
          return ${u};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${b} = originalIdx + ${b}(i);
          if (${v} < 0 || ${v} >= ${n[T]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${v} = max(0, min(${v}, ${n[T]} - 1));`};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",T,`u32(${v})`)};
          data[i + 1] = ${T===h?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(h)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${b}) -> array<${b}, 4> {
    var absS = abs(s);
    var coeffs: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${b} = 1.0 - absS;
    var twoMinusAbsS: ${b} = 2.0 - absS;
    var onePlusAbsS: ${b} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${b}, 4>, coefs: array<${b}, 4>) -> ${b} {
    var coefsSum: ${b} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${b} {
    var input_indices: ${r.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},nC=(r,e,n,t,o)=>{let[a,s,u,l,d]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",s,`max(0, min(depth, ${n[s]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Fw(r,d,a,3)}
      return ${r.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${s}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${n[s]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[s]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},rC=(r,e,n,t,o,i)=>{let a=r.dims,s=KE(i,e.axes,a.length),u=XE(a,t,o,e.axes),l=t.slice();t.length===0&&(l=a.map((x,I)=>x===0?1:u[I]/x),e.keepAspectRatioPolicy!=="stretch"&&(u=ZE(a,l,e)));let d=j("output",r.dataType,u.length),f=R("input",r.dataType,a.length),h=k.size(u),g=a.length===u.length&&a.every((x,I)=>x===u[I]),b=e.coordinateTransformMode==="tf_crop_and_resize",_=e.extrapolationValue,T=f.type.value,v=x=>`
      ${g?"":`
      ${jE(e.coordinateTransformMode,T)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${QE(f,a)};
              ${qE(e.nearestMode,n,T)};
              ${YE(f,d,a,u,l.length,s.length,b)};
              `;case"linear":return`
              ${JE(d,a,u,l.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${eC(f,d,a,b,_)}`;if(a.length===3||a.length===5)return`${nC(f,d,a,b,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${tC(f,d,a,u,l,s,e.cubicCoeffA,b,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${x.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",s.length).declareVariables(f,d)}
      ${x.mainStart()}
        ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${g}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:l},{type:1,data:s},...Z(a,u)]})}},oC=r=>{let e=r.customDataBuffer;return new Uint32Array(e.buffer,e.byteOffset,1)[0]},Gw=(r,e)=>{let n=[],t=[],o=[],i=oC(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");HE(r.inputs,e,i,n,t,o),r.compute(rC(r.inputs[0],e,i,n,t,o),{inputs:[0]})},Uw=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,a=r.extrapolationValue,s=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return fe({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:l})}});var iC,aC,Hw,jw=L(()=>{"use strict";me();_e();we();iC=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let a=r[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let a=r[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},aC=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,a=k.size(i),s=i,u=a,l=i.slice(-1)[0],d=t?i.slice(0,-1).concat(1):[],f=!o&&r.length>3,h=r.length>4,g=t&&n>1,b=t&&n>2,_=n>3,T=64,v=ke(l),x=[{type:12,data:u},{type:12,data:v},{type:12,data:l},{type:1,data:e.epsilon}],I=P=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[R("x",r[0].dataType,r[0].dims,v),R("skip",r[1].dataType,r[1].dims,v),R("gamma",r[2].dataType,r[2].dims,v)];f&&z.push(R("beta",r[3].dataType,r[3].dims,v)),h&&z.push(R("bias",r[4].dataType,r[4].dims,v)),z.push(j("output",r[0].dataType,s,v)),g&&z.push(j("mean_output",1,d)),b&&z.push(j("inv_std_output",1,d)),_&&z.push(j("input_skip_bias_sum",r[0].dataType,s,v));let M=Ue(r[0].dataType),H=Ue(1,v);return`

      ${P.registerUniforms(E).declareVariables(...z)}
      var<workgroup> sum_shared : array<${H}, ${T}>;
      var<workgroup> sum_squared_shared : array<${H}, ${T}>;

      ${P.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":M+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Hr(M,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Xt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Xt("square_sum",v)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${M}(mean)`}) *
            ${M}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},$=[{dims:s,dataType:r[0].dataType}];return n>1&&$.push({dims:d,dataType:1}),n>2&&$.push({dims:d,dataType:1}),n>3&&$.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${g};${b};${_}`,inputDependencies:r.map((P,E)=>"type")},getShaderSource:I,getRunData:()=>({outputs:$,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:x})}},Hw=(r,e)=>{iC(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(aC(r.inputs,e,r.outputCount,!1),{outputs:t})}});var sC,rs,uC,qw,lC,cC,Kw,Xw,Zw=L(()=>{"use strict";me();_e();Xe();we();sC=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},rs=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},uC=(r,e)=>{if(r.length>1){let n=rs(r,1),t=rs(r,2),o=rs(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),fe({starts:n,ends:t,axes:o})}else return e},qw=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},lC=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${ie("uniforms.input_shape","i",n.length)};
            let steps_i = ${ie("uniforms.steps","i",n.length)};
            let signs_i = ${ie("uniforms.signs","i",n.length)};
            let starts_i = ${ie("uniforms.starts","i",n.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,cC=(r,e)=>{let n=r[0].dims,t=k.size(n),o=e.axes.length>0?k.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=rs(r,4);i.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((v,x)=>qw(v,x,n,o,i)),s=e.ends.map((v,x)=>qw(v,x,n,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let v=0;v<n.length;++v)o.includes(v)||(a.splice(v,0,0),s.splice(v,0,n[v]),i.splice(v,0,1));let u=i.map(v=>Math.sign(v));i.forEach((v,x,I)=>{if(v<0){let $=(s[x]-a[x])/v,P=a[x],E=P+$*i[x];a[x]=E,s[x]=P,I[x]=-v}});let l=n.slice(0);o.forEach((v,x)=>{l[v]=Math.ceil((s[v]-a[v])/i[v])});let d={dims:l,dataType:r[0].dataType},f=j("output",r[0].dataType,l.length),h=R("input",r[0].dataType,r[0].dims.length),g=k.size(l),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],_=[{type:12,data:g},{type:12,data:a},{type:6,data:u},{type:12,data:i},...Z(r[0].dims,l)],T=v=>`
      ${v.registerUniforms(b).declareVariables(h,f)}
        ${lC(h,f,n)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:_})}},Kw=(r,e)=>{sC(r.inputs,e);let n=uC(r.inputs,e);r.compute(cC(r.inputs,n),{inputs:[0]})},Xw=r=>{let e=r.starts,n=r.ends,t=r.axes;return fe({starts:e,ends:n,axes:t})}});var dC,pC,Jw,Yw,Qw=L(()=>{"use strict";me();_e();Xe();er();we();dC=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},pC=(r,e)=>{let n=r.inputs[0],t=n.dims,o=k.size(t),i=t.length,a=k.normalizeAxis(e.axis,i),s=a<t.length-1,u,l=[];s?(l=Array.from({length:i},(z,M)=>M),l[a]=i-1,l[i-1]=a,u=r.compute(lt(n,l),{inputs:[n],outputs:[-1]})[0]):u=n;let d=u.dims,f=d[i-1],h=o/f,g=ke(f),b=f/g,_=64;h===1&&(_=256);let T=(z,M)=>M===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:M===2?`max(${z}.x, ${z}.y)`:M===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,v=R("x",u.dataType,u.dims,g),x=j("result",u.dataType,u.dims,g),I=v.type.value,$=Ue(u.dataType)==="f32"?`var threadMax = ${I}(-3.4028234663852886e+38f);`:`var threadMax = ${I}(-65504.0h);`,P=z=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables(v,x)}
      ${z.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${$}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${I}(${T("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${I}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${I}(${Xt("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${I}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,E=r.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:b}]}),getShaderSource:P},{inputs:[u],outputs:[s?-1:0]})[0];s&&r.compute(lt(E,l),{inputs:[E]})},Jw=(r,e)=>{dC(r.inputs),pC(r,e)},Yw=r=>fe({axis:r.axis})});var ex,fC,hC,mC,tx,nx=L(()=>{"use strict";me();_e();we();ex=r=>Array.from(r.getBigInt64Array(),Number),fC=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ex(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},hC=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},mC=(r,e)=>{let n=r[0].dims,t=e??ex(r[1]),o=hC(n,t),i=k.size(o),a=r[0].dataType,s=R("input",a,n.length),u=j("output",a,o.length),l=d=>`
      const inputShape = ${s.indices(...n)};
      ${d.registerUniform("output_size","u32").declareVariables(s,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...Z(r[0].dims,o)]}),getShaderSource:l}},tx=r=>{fC(r.inputs),r.compute(mC(r.inputs),{inputs:[0]})}});var gC,bC,rx,ox=L(()=>{"use strict";me();_e();we();gC=(r,e,n,t,o)=>{let i=j("output_data",o,n.length,4),a=R("a_data",e[1].dataType,e[1].dims.length,4),s=R("b_data",e[2].dataType,e[2].dims.length,4),u=R("c_data",e[0].dataType,e[0].dims.length,4),l,d=(f,h,g)=>`select(${h}, ${f}, ${g})`;if(!t)l=i.setByOffset("global_idx",d(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(h,g,b="")=>{let _=`a_data[index_a${g}][component_a${g}]`,T=`b_data[index_b${g}][component_b${g}]`,v=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${i.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${a.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_b${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let offset_c${g} = ${u.broadcastedIndicesToOffset(`output_indices${g}`,i)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${h}[${g}] = ${b}(${d(_,T,v)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},bC=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!(k.areEqual(e,n)&&k.areEqual(n,t)),a=e,s=k.size(e);if(i){let l=Gn.calcShape(Gn.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");a=l,s=k.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>gC(l,r,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...Z(t,e,n,a)]})}},rx=r=>{r.compute(bC(r.inputs))}});var ix,ax=L(()=>{"use strict";C_();Wa();N_();R_();x0();k0();R0();Y0();iv();uv();dv();_v();Iv();Av();Pv();Dv();Lv();Bv();Fv();Wv();qv();nw();iw();sw();lw();pw();Wc();hw();Cw();Nw();Rw();Mw();Ga();Ww();qc();jw();Zw();Qw();jc();nx();er();ja();ox();ix=new Map([["Abs",[z_]],["Acos",[B_]],["Acosh",[M_]],["Add",[T0]],["ArgMax",[E_,Ec]],["ArgMin",[P_,Ec]],["Asin",[V_]],["Asinh",[F_]],["Atan",[G_]],["Atanh",[U_]],["Attention",[D_]],["AveragePool",[xw,ww]],["BatchNormalization",[k_]],["BiasAdd",[L_]],["BiasSplitGelu",[w0]],["Cast",[H_,W_]],["Ceil",[q_]],["Clip",[j_]],["Concat",[N0,L0]],["Conv",[Mc,Bc]],["ConvTranspose",[ov,nv]],["Cos",[K_]],["Cosh",[X_]],["CumSum",[av,sv]],["DepthToSpace",[lv,cv]],["DequantizeLinear",[Dw,kw]],["DFT",[bv,yv]],["Div",[I0]],["Einsum",[xv,Tv]],["Elu",[Z_,Ko]],["Equal",[S0]],["Erf",[J_]],["Exp",[Y_]],["Expand",[$v]],["FastGelu",[Ov]],["Floor",[Q_]],["FusedConv",[Mc,Bc]],["Gather",[Cv,Ev]],["GatherElements",[Vv,Mv]],["GatherBlockQuantized",[Rv,zv]],["GatherND",[kv,Nv]],["Gelu",[e0]],["Gemm",[Uv,Gv]],["GlobalAveragePool",[Sw,Iw]],["GlobalMaxPool",[Ew,Pw]],["Greater",[P0]],["GreaterOrEqual",[C0]],["GridSample",[Hv,jv]],["GroupQueryAttention",[tw]],["HardSigmoid",[u0,s0]],["HardSwish",[l0]],["InstanceNormalization",[ow]],["LayerNormalization",[aw]],["LeakyRelu",[t0,Ko]],["Less",[E0]],["LessOrEqual",[D0]],["Log",[y0]],["MatMul",[uw]],["MatMulNBits",[cw,dw]],["MaxPool",[Aw,Ow]],["Mul",[$0]],["MultiHeadAttention",[Zv,Xv]],["Neg",[r0]],["Not",[n0]],["Pad",[fw]],["Pow",[A0]],["QuickGelu",[_0,Ko]],["Range",[Lw]],["Reciprocal",[o0]],["ReduceMin",[T_]],["ReduceMean",[y_]],["ReduceMax",[x_]],["ReduceSum",[S_]],["ReduceProd",[I_]],["ReduceL1",[__]],["ReduceL2",[v_]],["ReduceLogSum",[A_]],["ReduceLogSumExp",[w_]],["ReduceSumSquare",[$_]],["Relu",[i0]],["Resize",[Gw,Uw]],["RotaryEmbedding",[Qv]],["ScatterND",[Bw,zw]],["Sigmoid",[a0]],["Sin",[c0]],["Sinh",[d0]],["Slice",[Kw,Xw]],["SkipLayerNormalization",[Hw]],["Split",[Jv,Yv]],["Sqrt",[p0]],["Softmax",[Jw,Yw]],["Sub",[O0]],["Tan",[f0]],["Tanh",[m0]],["ThresholdedRelu",[b0,Ko]],["Tile",[tx]],["Transpose",[i_,a_]],["Where",[rx]]])});var os,sx=L(()=>{"use strict";ft();Fn();we();os=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){At(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of n)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});i&&u.push({binding:u.length,resource:i});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),_t(e.programInfo.name)}dispose(){}build(e,n){At(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(f=>{t.features.has(f.feature)&&o.push(`enable ${f.extension};`)});let a=r_(n,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,l=t.createShaderModule({code:u,label:e.name});Te("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let d=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return _t(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let a=n*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var ux={};Ar(ux,{WebGpuBackend:()=>Xc});var yC,_C,Kc,Xc,lx=L(()=>{"use strict";ft();me();Fn();_c();t_();ax();sx();yC=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},_C=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${yC(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Kc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Xc=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=u=>n.features.has(u)&&t.push(u)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await n.requestDevice(o);let a=n,s=n.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new Kc(s),this.gpuDataManager=e_(this),this.programManager=new os(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Da(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;At(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,d=i.programName,f=i.inputTensorViews,h=i.outputTensorViews,g=n[o*2],b=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),T=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(T))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(v=>({dims:v.dims,dataType:Vn(v.dataType)})),outputsMetadata:h.map(v=>({dims:v.dims,dataType:Vn(v.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:d,startTime:_,endTime:T});else{let v="";f.forEach((I,$)=>{v+=`input[${$}]: [${I.dims}] | ${Vn(I.dataType)}, `});let x="";h.forEach((I,$)=>{x+=`output[${$}]: [${I.dims}] | ${Vn(I.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${d}" ${v}${x}start time: ${_} ns, execution time: ${T-_} ns`)}fi("GPU",`${d}::${g}::${b}`)}e.unmap(),this.pendingQueries.delete(e)}),_t()}run(e,n,t,o,i,a){At(e.name);let s=[];for(let I=0;I<n.length;++I){let $=n[I].data;if($===0)continue;let P=this.gpuDataManager.get($);if(!P)throw new Error(`no GPU data for input: ${$}`);s.push(P)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(n),f=t.length===0?u.map((I,$)=>$):t;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let h=[],g=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(f[I])||f[I]<-3||f[I]>=a)throw new Error(`Invalid output index: ${f[I]}`);if(f[I]===-3)continue;let $=f[I]===-1,P=f[I]===-2,E=$||P?i(u[I].dataType,u[I].dims):o(f[I],u[I].dataType,u[I].dims);if(h.push(E),E.data===0)continue;let z=this.gpuDataManager.get(E.data);if(!z)throw new Error(`no GPU data for output: ${E.data}`);if($&&this.temporaryData.push(z),P){let M=this.kernelPersistentData.get(this.currentKernelId);M||(M=[],this.kernelPersistentData.set(this.currentKernelId,M)),M.push(z)}g.push(z)}if(s.length!==n.length||g.length!==h.length){if(g.length===0)return _t(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(d){let I=0,$=[];d.forEach(M=>{let H=typeof M.data=="number"?[M.data]:M.data;if(H.length===0)return;let K=M.type===10?2:4,B,ae;M.type===10?(ae=H.length>4?16:H.length>2?8:H.length*K,B=H.length>4?16:K*H.length):(ae=H.length<=2?H.length*K:16,B=16),I=Math.ceil(I/ae)*ae,$.push(I);let V=M.type===10?8:4;I+=H.length>4?Math.ceil(H.length/V)*B:H.length*K});let P=16;I=Math.ceil(I/P)*P;let E=new ArrayBuffer(I);d.forEach((M,H)=>{let K=$[H],B=typeof M.data=="number"?[M.data]:M.data;if(M.type===6)new Int32Array(E,K,B.length).set(B);else if(M.type===12)new Uint32Array(E,K,B.length).set(B);else if(M.type===10)new Uint16Array(E,K,B.length).set(B);else if(M.type===1)new Float32Array(E,K,B.length).set(B);else throw new Error(`Unsupported uniform type: ${Vn(M.type)}`)});let z=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,E,0,I),this.gpuDataManager.release(z.id),b={offset:0,size:I,buffer:z.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),T=_[1]===1&&_[2]===1,v=_C(e,n,T),x=this.programManager.getArtifact(v);if(x||(x=this.programManager.build(e,_),this.programManager.setArtifact(v,x),Te("info",()=>`[artifact] key: ${v}, programName: ${e.name}`)),d&&x.uniformVariablesInfo){if(d.length!==x.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${x.uniformVariablesInfo.length}, got ${d.length} in program "${x.programInfo.name}".`);for(let I=0;I<d.length;I++){let $=d[I],P=$.type,E=typeof $.data=="number"?1:$.data.length,[z,M]=x.uniformVariablesInfo[I];if(P!==z||E!==M)throw new Error(`Uniform variable ${I} mismatch: expect type ${z} with size ${M}, got type ${P} with size ${E} in program "${x.programInfo.name}".`)}}if(Te("info",()=>`[ProgramManager] run "${e.name}" (key=${v}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:x.programInfo.name,inputTensorViews:n,outputTensorViews:h};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(x,s,g,_,b),_t(e.name),h}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=ix.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,a)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),Te("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(n,u[1]),0}catch(d){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${d}`)),1}finally{l&&t.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(n),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(n,[s,t]),s}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await Ic(this,e,n);return Na(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Te("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Te("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Te("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var cx={};Ar(cx,{init:()=>vC});var Yo,Zc,vC,dx=L(()=>{"use strict";me();Fn();_e();Zy();Yo=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=k.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(k.size(e)!==k.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},Zc=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let l=0;l<s;l++){let d=Number(e.getValue(o*i++,a)),f=Number(e.getValue(o*i++,"*")),h=Number(e.getValue(o*i++,a)),g=[];for(let b=0;b<h;b++)g.push(Number(e.getValue(o*i++,a)));u.push(new Yo(e,d,f,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,n){let t=n?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=n?.outputs??[],i=(s,u,l)=>new Yo(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=vr(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new Yo(this.module,s,d,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+n.length)*o);this.module.setValue(a,n.length,i);for(let s=0;s<n.length;s++)this.module.setValue(a+o*(s+1),n[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},vC=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=(lx(),Yr(ux)).WebGpuBackend,a=new i;await a.initialize(n,t),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,u,l,d=!1)=>{if(d)Te("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(u)}, size=${Number(l)}`),a.memcpy(Number(s),Number(u));else{Te("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(u)}, size=${Number(l)}`);let f=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(u),f)}},async(s,u,l)=>{Te("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${u}, size=${l}`),await a.download(Number(s),()=>e.HEAPU8.subarray(Number(u)>>>0,Number(u+l)>>>0))},(s,u,l)=>a.createKernel(s,Number(u),l,e.UTF8ToString(e._JsepGetNodeName(Number(u)))),s=>a.releaseKernel(s),(s,u,l,d)=>{Te("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${u}`);let f=new Zc(e,a,Number(u));return a.computeKernel(Number(s),f,d)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let i=new Ba(n);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,l,d)=>i.ensureTensor(a,s,u,l,d),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s),(a,s)=>i.registerMLContext(a,s),!!n.trace])}}});var wC,wa,xa,qr,xC,px,Wo,Ta,Ia,fx,Sa,$a,Aa,dc=L(()=>{"use strict";ft();zy();My();me();yr();Pa();bc();wC=(r,e)=>{Fe()._OrtInit(r,e)!==0&&De("Can't initialize onnxruntime.")},wa=async r=>{wC(r.wasm.numThreads,jo(r.logLevel))},xa=async(r,e)=>{Fe().asyncInit?.();let n=r.webgpu.adapter;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let t=r.webgpu.powerPreference;if(t!==void 0&&t!=="low-power"&&t!=="high-performance")throw new Error(`Invalid powerPreference setting: "${t}"`);let o=r.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:t,forceFallbackAdapter:o}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(e==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let t=(dx(),Yr(cx)).init;e==="webgpu"&&await t("webgpu",Fe(),r,n),e==="webnn"&&await t("webnn",Fe(),r)}},qr=new Map,xC=r=>{let e=Fe(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(r,o,o+t)!==0&&De("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(n)}},px=(r,e)=>{let n=Fe(),t=n.stackSave(),o=0;try{let i=n.PTR_SIZE,a=n.stackAlloc(2*i);n._OrtGetInputOutputMetadata(r,e,a,a+i)!==0&&De("Can't get session input/output metadata.");let u=Number(n.getValue(a,"*"));o=Number(n.getValue(a+i,"*"));let l=n.HEAP32[o/4];if(l===0)return[u,0];let d=n.HEAPU32[o/4+1],f=[];for(let h=0;h<d;h++){let g=Number(n.getValue(o+8+h*i,"*"));f.push(g!==0?n.UTF8ToString(g):Number(n.getValue(o+8+(h+d)*i,"*")))}return[u,l,f]}finally{n.stackRestore(t),o!==0&&n._OrtFree(o)}},Wo=r=>{let e=Fe(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},Ta=async(r,e)=>{let n,t,o=Fe();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=Wo(r);let i=0,a=0,s=0,u=[],l=[],d=[];try{if([a,u]=await By(e),e?.externalData&&o.mountExternalData){let $=[];for(let P of e.externalData){let E=typeof P=="string"?P:P.path,z=typeof P=="string"?P:P.data;$.push(qo(z).then(M=>{o.mountExternalData(E,M)}))}await Promise.all($)}for(let $ of e?.executionProviders??[])if((typeof $=="string"?$:$.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof $!="string"){let E=$,z=E?.context,M=E?.gpuDevice,H=E?.deviceType,K=E?.powerPreference;z?o.currentContext=z:M?o.currentContext=await o.webnnCreateMLContext(M):o.currentContext=await o.webnnCreateMLContext({deviceType:H,powerPreference:K})}else o.currentContext=await o.webnnCreateMLContext();break}i=await o._OrtCreateSession(n,t,a),o.webgpuOnCreateSession?.(i),i===0&&De("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[f,h]=xC(i),g=!!e?.enableGraphCapture,b=[],_=[],T=[],v=[],x=[];for(let $=0;$<f;$++){let[P,E,z]=px(i,$);P===0&&De("Can't get an input name."),l.push(P);let M=o.UTF8ToString(P);b.push(M),T.push(E===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:Vn(E),shape:z})}for(let $=0;$<h;$++){let[P,E,z]=px(i,$+f);P===0&&De("Can't get an output name."),d.push(P);let M=o.UTF8ToString(P);_.push(M),v.push(E===0?{name:M,isTensor:!1}:{name:M,isTensor:!0,type:Vn(E),shape:z});{if(g&&e?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let H=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[M]??"cpu",K=o.webnnIsGraphOutput;if(H==="cpu"&&K&&K(i,M)){x.push("ml-tensor-cpu-output");continue}if(H!=="cpu"&&H!=="cpu-pinned"&&H!=="gpu-buffer"&&H!=="ml-tensor")throw new Error(`Not supported preferred output location: ${H}.`);if(g&&H!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${H}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(H)}}let I=null;return x.some($=>$==="gpu-buffer"||$==="ml-tensor"||$==="ml-tensor-cpu-output")&&(s=o._OrtCreateBinding(i),s===0&&De("Can't create IO binding."),I={handle:s,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map($=>$==="ml-tensor-cpu-output"?"ml-tensor":$).map($=>gc($))}),qr.set(i,[i,l,d,I,g,!1]),[i,b,_,T,v]}catch(f){throw l.forEach(h=>o._OrtFree(h)),d.forEach(h=>o._OrtFree(h)),s!==0&&o._OrtReleaseBinding(s)!==0&&De("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&De("Can't release session."),f}finally{o._free(n),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&De("Can't release session options."),u.forEach(f=>o._free(f)),o.unmountExternalData?.()}},Ia=r=>{let e=Fe(),n=qr.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,a,s]=n;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&De("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&De("Can't release IO binding.")),e.jsepOnReleaseSession?.(r),e.webnnOnReleaseSession?.(r),e.webgpuOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&De("Can't release session."),qr.delete(r)},fx=async(r,e,n,t,o,i,a=!1)=>{if(!r){e.push(0);return}let s=Fe(),u=s.PTR_SIZE,l=r[0],d=r[1],f=r[3],h=f,g,b;if(l==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${i} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=r[2].gpuBuffer;b=vr(_r(l),d);{let x=s.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=x(t,i,v,b)}}else if(f==="ml-tensor"){let v=r[2].mlTensor;b=vr(_r(l),d);let x=s.webnnRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=x(t,v,_r(l),d)}else{let v=r[2];if(Array.isArray(v)){b=u*v.length,g=s._malloc(b),n.push(g);for(let x=0;x<v.length;x++){if(typeof v[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);s.setValue(g+x*u,Et(v[x],n),"*")}}else{let x=s.webnnIsGraphInput,I=s.webnnIsGraphOutput;if(l!=="string"&&x&&I){let $=s.UTF8ToString(o);if(x(t,$)||I(t,$)){let P=_r(l);b=vr(P,d),h="ml-tensor";let E=s.webnnCreateTemporaryTensor,z=s.webnnUploadTensor;if(!E||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let M=await E(t,P,d);z(M,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),g=M}else b=v.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),g)}else b=v.byteLength,g=s._malloc(b),n.push(g),s.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),g)}}let _=s.stackSave(),T=s.stackAlloc(4*d.length);try{d.forEach((x,I)=>s.setValue(T+I*u,x,u===4?"i32":"i64"));let v=s._OrtCreateTensor(_r(l),g,b,T,d.length,gc(h));v===0&&De(`Can't create tensor for input/output. session=${t}, index=${i}.`),e.push(v)}finally{s.stackRestore(_)}},Sa=async(r,e,n,t,o,i)=>{let a=Fe(),s=a.PTR_SIZE,u=qr.get(r);if(!u)throw new Error(`cannot run inference. invalid session id: ${r}`);let l=u[0],d=u[1],f=u[2],h=u[3],g=u[4],b=u[5],_=e.length,T=t.length,v=0,x=[],I=[],$=[],P=[],E=[],z=a.stackSave(),M=a.stackAlloc(_*s),H=a.stackAlloc(_*s),K=a.stackAlloc(T*s),B=a.stackAlloc(T*s);try{[v,x]=Ry(i),lr("wasm prepareInputOutputTensor");for(let F=0;F<_;F++)await fx(n[F],I,P,r,d[e[F]],e[F],g);for(let F=0;F<T;F++)await fx(o[F],$,P,r,f[t[F]],_+t[F],g);cr("wasm prepareInputOutputTensor");for(let F=0;F<_;F++)a.setValue(M+F*s,I[F],"*"),a.setValue(H+F*s,d[e[F]],"*");for(let F=0;F<T;F++)a.setValue(K+F*s,$[F],"*"),a.setValue(B+F*s,f[t[F]],"*");if(h&&!b){let{handle:F,outputPreferredLocations:X,outputPreferredLocationsEncoded:te}=h;if(d.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${d.length}).`);lr("wasm bindInputsOutputs");for(let J=0;J<_;J++){let re=e[J];await a._OrtBindInput(F,d[re],I[J])!==0&&De(`Can't bind input[${J}] for session=${r}.`)}for(let J=0;J<T;J++){let re=t[J];o[J]?.[3]?(E.push($[J]),a._OrtBindOutput(F,f[re],$[J],0)!==0&&De(`Can't bind pre-allocated output[${J}] for session=${r}.`)):a._OrtBindOutput(F,f[re],0,te[re])!==0&&De(`Can't bind output[${J}] to ${X[J]} for session=${r}.`)}cr("wasm bindInputsOutputs"),qr.set(r,[l,d,f,h,g,!0])}a.jsepOnRunStart?.(l),a.webnnOnRunStart?.(l);let ae;h?ae=await a._OrtRunWithBinding(l,h.handle,T,K,v):ae=await a._OrtRun(l,H,M,_,B,T,K,v),ae!==0&&De("failed to call OrtRun().");let V=[],S=[];lr("wasm ProcessOutputTensor");for(let F=0;F<T;F++){let X=Number(a.getValue(K+F*s,"*"));if(X===$[F]||E.includes($[F])){V.push(o[F]),X!==$[F]&&a._OrtReleaseTensor(X)!==0&&De("Can't release tensor.");continue}let te=a.stackSave(),J=a.stackAlloc(4*s),re=!1,pe,de=0;try{a._OrtGetTensorData(X,J,J+s,J+2*s,J+3*s)!==0&&De(`Can't access output tensor data on index ${F}.`);let ge=s===4?"i32":"i64",W=Number(a.getValue(J,ge));de=a.getValue(J+s,"*");let D=a.getValue(J+s*2,"*"),oe=Number(a.getValue(J+s*3,ge)),He=[];for(let Ae=0;Ae<oe;Ae++)He.push(Number(a.getValue(D+Ae*s,ge)));a._OrtFree(D)!==0&&De("Can't free memory for tensor dims.");let Ce=He.reduce((Ae,Ze)=>Ae*Ze,1);pe=Vn(W);let ot=h?.outputPreferredLocations[t[F]];if(pe==="string"){if(ot==="gpu-buffer"||ot==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ae=[];for(let Ze=0;Ze<Ce;Ze++){let Ct=a.getValue(de+Ze*s,"*"),Qt=a.getValue(de+(Ze+1)*s,"*"),nr=Ze===Ce-1?void 0:Qt-Ct;Ae.push(a.UTF8ToString(Ct,nr))}V.push([pe,He,Ae,"cpu"])}else if(ot==="gpu-buffer"&&Ce>0){let Ae=a.jsepGetBuffer;if(!Ae)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ze=Ae(de),Ct=vr(W,Ce);if(Ct===void 0||!Ea(pe))throw new Error(`Unsupported data type: ${pe}`);re=!0,V.push([pe,He,{gpuBuffer:Ze,download:a.jsepCreateDownloader(Ze,Ct,pe),dispose:()=>{a._OrtReleaseTensor(X)!==0&&De("Can't release tensor.")}},"gpu-buffer"])}else if(ot==="ml-tensor"&&Ce>0){let Ae=a.webnnEnsureTensor,Ze=a.webnnIsGraphInputOutputTypeSupported;if(!Ae||!Ze)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(vr(W,Ce)===void 0||!Ca(pe))throw new Error(`Unsupported data type: ${pe}`);if(!Ze(r,pe,!1))throw new Error(`preferredLocation "ml-tensor" for ${pe} output is not supported by current WebNN Context.`);let Qt=await Ae(r,de,W,He,!1);re=!0,V.push([pe,He,{mlTensor:Qt,download:a.webnnCreateMLTensorDownloader(de,pe),dispose:()=>{a.webnnReleaseTensorId(de),a._OrtReleaseTensor(X)}},"ml-tensor"])}else if(ot==="ml-tensor-cpu-output"&&Ce>0){let Ae=a.webnnCreateMLTensorDownloader(de,pe)(),Ze=V.length;re=!0,S.push((async()=>{let Ct=[Ze,await Ae];return a.webnnReleaseTensorId(de),a._OrtReleaseTensor(X),Ct})()),V.push([pe,He,[],"cpu"])}else{let Ae=ho(pe),Ze=new Ae(Ce);new Uint8Array(Ze.buffer,Ze.byteOffset,Ze.byteLength).set(a.HEAPU8.subarray(de,de+Ze.byteLength)),V.push([pe,He,Ze,"cpu"])}}finally{a.stackRestore(te),pe==="string"&&de&&a._free(de),re||a._OrtReleaseTensor(X)}}h&&!g&&(a._OrtClearBoundOutputs(h.handle)!==0&&De("Can't clear bound outputs."),qr.set(r,[l,d,f,h,g,!1]));for(let[F,X]of await Promise.all(S))V[F][2]=X;return cr("wasm ProcessOutputTensor"),V}finally{a.webnnOnRunEnd?.(l),a.stackRestore(z),I.forEach(ae=>a._OrtReleaseTensor(ae)),$.forEach(ae=>a._OrtReleaseTensor(ae)),P.forEach(ae=>a._free(ae)),v!==0&&a._OrtReleaseRunOptions(v),x.forEach(ae=>a._free(ae))}},$a=r=>{let e=Fe(),n=qr.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&De("Can't get an profile file name."),e._OrtFree(o)},Aa=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Kr,Wt,Qo,as,ss,is,Jc,Yc,yo,_o,IC,hx,mx,gx,bx,yx,_x,vx,Qc=L(()=>{"use strict";ft();dc();yr();_a();Kr=()=>!!ye.wasm.proxy&&typeof document<"u",Qo=!1,as=!1,ss=!1,Yc=new Map,yo=(r,e)=>{let n=Yc.get(r);n?n.push(e):Yc.set(r,[e])},_o=()=>{if(Qo||!as||ss||!Wt)throw new Error("worker not ready")},IC=r=>{switch(r.data.type){case"init-wasm":Qo=!1,r.data.err?(ss=!0,Jc[1](r.data.err)):(as=!0,Jc[0]()),is&&(URL.revokeObjectURL(is),is=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Yc.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},hx=async()=>{if(!as){if(Qo)throw new Error("multiple calls to 'initWasm()' detected.");if(ss)throw new Error("previous call to 'initWasm()' failed.");if(Qo=!0,Kr())return new Promise((r,e)=>{Wt?.terminate(),ky().then(([n,t])=>{try{Wt=t,Wt.onerror=i=>e(i),Wt.onmessage=IC,Jc=[r,e];let o={type:"init-wasm",in:ye};!o.in.wasm.wasmPaths&&(n||fc)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Wt.postMessage(o),is=n}catch(o){e(o)}},e)});try{await va(ye.wasm),await wa(ye),as=!0}catch(r){throw ss=!0,r}finally{Qo=!1}}},mx=async r=>{if(Kr())return _o(),new Promise((e,n)=>{yo("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:ye}};Wt.postMessage(t)});await xa(ye,r)},gx=async r=>Kr()?(_o(),new Promise((e,n)=>{yo("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};Wt.postMessage(t,[r.buffer])})):Wo(r),bx=async(r,e)=>{if(Kr()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return _o(),new Promise((n,t)=>{yo("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),Wt.postMessage(o,i)})}else return Ta(r,e)},yx=async r=>{if(Kr())return _o(),new Promise((e,n)=>{yo("release",[e,n]);let t={type:"release",in:r};Wt.postMessage(t)});Ia(r)},_x=async(r,e,n,t,o,i)=>{if(Kr()){if(n.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return _o(),new Promise((a,s)=>{yo("run",[a,s]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};Wt.postMessage(l,Aa(u))})}else return Sa(r,e,n,t,o,i)},vx=async r=>{if(Kr())return _o(),new Promise((e,n)=>{yo("end-profiling",[e,n]);let t={type:"end-profiling",in:r};Wt.postMessage(t)});$a(r)}});var wx,SC,us,xx=L(()=>{"use strict";ft();Qc();me();ya();bc();wx=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[r.type,r.dims,{mlTensor:r.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},SC=r=>{switch(r[3]){case"cpu":return new $t(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Ea(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return $t.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}case"ml-tensor":{let e=r[0];if(!Ca(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:n,download:t,dispose:o}=r[2];return $t.fromMLTensor(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},us=class{async fetchModelAndCopyToWasmMemory(e){return gx(await qo(e))}async loadModel(e,n){At();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await bx(t,n),_t()}async dispose(){return yx(this.sessionId)}async run(e,n,t){At();let o=[],i=[];Object.entries(e).forEach(h=>{let g=h[0],b=h[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);o.push(b),i.push(_)});let a=[],s=[];Object.entries(n).forEach(h=>{let g=h[0],b=h[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);a.push(b),s.push(_)});let u=o.map((h,g)=>wx(h,()=>`input "${this.inputNames[i[g]]}"`)),l=a.map((h,g)=>h?wx(h,()=>`output "${this.outputNames[s[g]]}"`):null),d=await _x(this.sessionId,i,u,s,l,t),f={};for(let h=0;h<d.length;h++)f[this.outputNames[s[h]]]=a[h]??SC(d[h]);return _t(),f}startProfiling(){}endProfiling(){vx(this.sessionId)}}});var Ix={};Ar(Ix,{OnnxruntimeWebAssemblyBackend:()=>ls,initializeFlags:()=>Tx,wasmBackend:()=>$C});var Tx,ls,$C,Sx=L(()=>{"use strict";ft();Qc();xx();Tx=()=>{(typeof ye.wasm.initTimeout!="number"||ye.wasm.initTimeout<0)&&(ye.wasm.initTimeout=0);let r=ye.wasm.simd;if(typeof r!="boolean"&&r!==void 0&&r!=="fixed"&&r!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${r}". Reset it to \`false\` and ignore SIMD feature checking.`),ye.wasm.simd=!1),typeof ye.wasm.proxy!="boolean"&&(ye.wasm.proxy=!1),typeof ye.wasm.trace!="boolean"&&(ye.wasm.trace=!1),typeof ye.wasm.numThreads!="number"||!Number.isInteger(ye.wasm.numThreads)||ye.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ye.wasm.numThreads=1;else{let e=typeof navigator>"u"?Jr("node:os").cpus().length:navigator.hardwareConcurrency;ye.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},ls=class{async init(e){Tx(),await hx(),await mx(e)}async createInferenceSessionHandler(e,n){let t=new us;return await t.loadModel(e,n),t}},$C=new ls});ft();ft();ft();var Mp="1.30.0";var m5=Vs;{let r=(vy(),Yr(_y)).onnxjsBackend;ur("webgl",r,-10)}{let r=(Sx(),Yr(Ix)).wasmBackend;ur("webgpu",r,5),ur("webnn",r,5),ur("cpu",r,10),ur("wasm",r,10)}Object.defineProperty(ye.versions,"web",{value:Mp,enumerable:!0});export{e1 as InferenceSession,fi as TRACE,lr as TRACE_EVENT_BEGIN,cr as TRACE_EVENT_END,At as TRACE_FUNC_BEGIN,_t as TRACE_FUNC_END,$t as Tensor,m5 as default,ye as env,ur as registerBackend};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/*! Bundled license information:

long/index.js:
long/umd/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.all.bundle.min.mjs.map
