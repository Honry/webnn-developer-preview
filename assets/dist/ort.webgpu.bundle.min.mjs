/*!
 * ONNX Runtime Web v1.22.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Un=Object.defineProperty;var Ef=Object.getOwnPropertyDescriptor;var Pf=Object.getOwnPropertyNames;var zf=Object.prototype.hasOwnProperty;var Nn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var G=(e,t)=>()=>(e&&(t=e(e=0)),t);var Zt=(e,t)=>{for(var n in t)Un(e,n,{get:t[n],enumerable:!0})},Of=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Pf(t))!zf.call(e,o)&&o!==n&&Un(e,o,{get:()=>t[o],enumerable:!(r=Ef(t,o))||r.enumerable});return e};var br=e=>Of(Un({},"__esModule",{value:!0}),e);var _r,It,Ct,Df,La,Vn=G(()=>{"use strict";_r=new Map,It=[],Ct=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=_r.get(e);if(r===void 0)_r.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let o=It.indexOf(e);o!==-1&&It.splice(o,1);for(let a=0;a<It.length;a++)if(_r.get(It[a]).priority<=n){It.splice(a,0,e);return}It.push(e)}return}throw new TypeError("not a valid backend")},Df=async e=>{let t=_r.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},La=async e=>{let t=e.executionProviders||[],n=t.map(l=>typeof l=="string"?l:l.name),r=n.length===0?It:n,o,a=[],s=new Set;for(let l of r){let p=await Df(l);typeof p=="string"?a.push({name:l,err:p}):(o||(o=p),o===p&&s.add(l))}if(!o)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)n.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let d=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[o,new Proxy(e,{get:(l,p)=>p==="executionProviders"?d:Reflect.get(l,p)})]}});var Ga=G(()=>{"use strict";Vn()});var Ha,Fa=G(()=>{"use strict";Ha="1.22.0"});var qa,Ue,Wn=G(()=>{"use strict";Fa();qa="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:Ha},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);qa=e}},get logLevel(){return qa}};Object.defineProperty(Ue,"logLevel",{enumerable:!0})});var we,Ka=G(()=>{"use strict";Wn();we=Ue});var ja,Za,Qa=G(()=>{"use strict";ja=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let o,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",d=t?.norm,l,p;d===void 0||d.mean===void 0?l=[255,255,255,255]:typeof d.mean=="number"?l=[d.mean,d.mean,d.mean,d.mean]:(l=[d.mean[0],d.mean[1],d.mean[2],0],d.mean[3]!==void 0&&(l[3]=d.mean[3])),d===void 0||d.bias===void 0?p=[0,0,0,0]:typeof d.bias=="number"?p=[d.bias,d.bias,d.bias,d.bias]:(p=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(p[3]=d.bias[3]));let f=a*o,h=0,y=f,_=f*2,b=-1;s==="RGBA"?(h=0,y=f,_=f*2,b=f*3):s==="RGB"?(h=0,y=f,_=f*2):s==="RBG"&&(h=0,_=f,y=f*2);for(let w=0;w<a;w++)for(let S=0;S<o;S++){let $=(e.data[h++]-p[0])*l[0],v=(e.data[y++]-p[1])*l[1],T=(e.data[_++]-p[2])*l[2],I=b===-1?255:(e.data[b++]-p[3])*l[3];r.fillStyle="rgba("+$+","+v+","+T+","+I+")",r.fillRect(S,w,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Za=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let o,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let d=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,f;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?f=[0,0,0,0]:typeof l.bias=="number"?f=[l.bias,l.bias,l.bias,l.bias]:(f=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(f[3]=l.bias[3]));let h=a*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let y=4,_=0,b=1,w=2,S=3,$=0,v=h,T=h*2,I=-1;d==="RGBA"?($=0,v=h,T=h*2,I=h*3):d==="RGB"?($=0,v=h,T=h*2):d==="RBG"&&($=0,T=h,v=h*2),r=n.createImageData(o,a);for(let A=0;A<a*o;_+=y,b+=y,w+=y,S+=y,A++)r.data[_]=(e.data[$++]-f[0])*p[0],r.data[b]=(e.data[v++]-f[1])*p[1],r.data[w]=(e.data[T++]-f[2])*p[2],r.data[S]=I===-1?255:(e.data[I++]-f[3])*p[3]}else throw new Error("Can not access image data");return r}});var Ln,Ya,Xa,Ja,es,ts,rs=G(()=>{"use strict";wr();Ln=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,o=t.norm??{mean:255,bias:0},a,s;typeof o.mean=="number"?a=[o.mean,o.mean,o.mean,o.mean]:a=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let d=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=n*r,f=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,y=0,_=1,b=2,w=3,S=0,$=p,v=p*2,T=-1;d==="RGB"&&(h=3,y=0,_=1,b=2,w=-1),l==="RGBA"?T=p*3:l==="RBG"?(S=0,v=p,$=p*2):l==="BGR"&&(v=0,$=p,S=p*2);for(let A=0;A<p;A++,y+=h,b+=h,_+=h,w+=h)f[S++]=(e[y]+s[0])/a[0],f[$++]=(e[_]+s[1])/a[1],f[v++]=(e[b]+s[2])/a[2],T!==-1&&w!==-1&&(f[T++]=(e[w]+s[3])/a[3]);return l==="RGBA"?new De("float32",f,[1,4,n,r]):new De("float32",f,[1,3,n,r])},Ya=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,d=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(n){let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(y=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(d=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");d.tensorFormat="RGBA",d.height=y,d.width=_}else d.tensorFormat="RGBA",d.height=y,d.width=_;h.drawImage(e,0,0),s=h.getImageData(0,0,_,y).data}else throw new Error("Can not access image data")}else if(r){let f,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,h=t.resizedWidth):(f=e.height,h=e.width),t!==void 0&&(d=t),d.format="RGBA",d.height=f,d.width=h,t!==void 0){let y=l();y.width=h,y.height=f;let _=p(y);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,h,f).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=l();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let y=e.height,_=e.width;return h.drawImage(e,0,0,_,y),s=h.getImageData(0,0,_,y).data,d.height=y,d.width=_,Ln(s,d)}else throw new Error("Can not access image data")}else{if(a)return new Promise((f,h)=>{let y=l(),_=p(y);if(!e||!_)return h();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{y.width=b.width,y.height=b.height,_.drawImage(b,0,0,y.width,y.height);let w=_.getImageData(0,0,y.width,y.height);d.height=y.height,d.width=y.width,f(Ln(w.data,d))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Ln(s,d);throw new Error("Input data provided is not supported - aborted tensor creation")},Xa=(e,t)=>{let{width:n,height:r,download:o,dispose:a}=t,s=[1,r,n,4];return new De({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:a})},Ja=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new De({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:o,dispose:a})},es=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:a}=t;return new De({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:o,dispose:a})},ts=(e,t,n)=>new De({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})});var At,Qt,ns,os,is=G(()=>{"use strict";At=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ns=!1,os=()=>{if(!ns){ns=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=globalThis.Float16Array,r=typeof n<"u"&&n.from;e&&(At.set("int64",BigInt64Array),Qt.set(BigInt64Array,"int64")),t&&(At.set("uint64",BigUint64Array),Qt.set(BigUint64Array,"uint64")),r?(At.set("float16",n),Qt.set(n,"float16")):At.set("float16",Uint16Array)}}});var as,ss,us=G(()=>{"use strict";wr();as=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},ss=(e,t)=>{switch(e.location){case"cpu":return new De(e.type,e.data,t);case"cpu-pinned":return new De({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new De({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new De({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new De({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var De,wr=G(()=>{"use strict";Qa();rs();is();us();De=class{constructor(t,n,r){os();let o,a;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,a=t.dims,t.location){case"cpu-pinned":{let d=At.get(o);if(!d)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof d))throw new TypeError(`buffer should be of type ${d.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let d,l;if(typeof t=="string")if(o=t,l=r,t==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");d=n}else{let p=At.get(t);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(n)){if(t==="float16"&&p===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${p.name} as data.`);t==="uint64"||t==="int64"?d=p.from(n,BigInt):d=p.from(n)}else if(n instanceof p)d=n;else if(n instanceof Uint8ClampedArray)if(t==="uint8")d=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&n instanceof Uint16Array&&p!==Uint16Array)d=new globalThis.Uint16Array(n.buffer,n.byteOffset,n.length);else throw new TypeError(`A ${o} tensor's data must be type of ${p}`)}else if(l=n,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof t[0];if(p==="string")o="string",d=t;else if(p==="boolean")o="bool",d=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",d=Uint8Array.from(t);else{let p=Qt.get(t.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=p,d=t}if(l===void 0)l=[d.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");a=l,this.cpuData=d,this.dataLocation="cpu"}let s=as(a);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=a,this.size=s}static async fromImage(t,n){return Ya(t,n)}static fromTexture(t,n){return Xa(t,n)}static fromGpuBuffer(t,n){return Ja(t,n)}static fromMLTensor(t,n){return es(t,n)}static fromPinnedBuffer(t,n,r){return ts(t,n,r)}toDataURL(t){return ja(this,t)}toImageData(t){return Za(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,t&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ss(this,t)}}});var qe,Gn=G(()=>{"use strict";wr();qe=De});var vr,ds,Ne,Be,Hn=G(()=>{"use strict";Wn();vr=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},ds=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let o=0;o<n.length;o++){if(r&&!n[o].includes("TRACE_FUNC")){let a=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(a+=`::${t}`),vr("CPU",a);return}n[o].includes("TRACE_FUNC")&&(r=!0)}},Ne=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||ds("BEGIN",e)},Be=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||ds("END",e)}});var $r,ls=G(()=>{"use strict";Vn();Gn();Hn();$r=class e{constructor(t){this.handler=t}async run(t,n,r){Ne();let o={},a={};if(typeof t!="object"||t===null||t instanceof qe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof qe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of n){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);o[p]=null}if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,f=Object.getOwnPropertyNames(n);for(let h of this.outputNames)if(f.indexOf(h)!==-1){let y=n[h];(y===null||y instanceof qe)&&(p=!0,s=!1,o[h]=y)}if(p){if(typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else a=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)o[p]=null;let d=await this.handler.run(t,o,a),l={};for(let p in d)if(Object.hasOwnProperty.call(d,p)){let f=d[p];f instanceof qe?l[p]=f:l[p]=new qe(f.type,f.data,f.dims)}return Be(),l}async release(){return this.handler.dispose()}static async create(t,n,r,o){Ne();let a,s={};if(typeof t=="string"){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,h=0,y=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(y=t.byteLength-h,typeof r=="number"){if(y=r,!Number.isSafeInteger(y))throw new RangeError("'byteLength' must be an integer.");if(y<=0||h+y>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-h}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(f,h,y)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[d,l]=await La(s),p=await d.createInferenceSessionHandler(a,l);return Be(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Bf,cs=G(()=>{"use strict";ls();Bf=$r});var ps=G(()=>{"use strict"});var ms=G(()=>{"use strict"});var fs=G(()=>{"use strict"});var hs=G(()=>{"use strict"});var Fn={};Zt(Fn,{InferenceSession:()=>Bf,TRACE:()=>vr,TRACE_FUNC_BEGIN:()=>Ne,TRACE_FUNC_END:()=>Be,Tensor:()=>qe,env:()=>we,registerBackend:()=>Ct});var Ge=G(()=>{"use strict";Ga();Ka();cs();Gn();ps();ms();Hn();fs();hs()});var xr=G(()=>{"use strict"});var _s={};Zt(_s,{default:()=>Mf});var ys,bs,Mf,ws=G(()=>{"use strict";qn();bt();Sr();ys="ort-wasm-proxy-worker",bs=globalThis.self?.name===ys;bs&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":Tr(n.wasm).then(()=>{Ir(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:o}=n;Cr(o,r).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:r}=n,o=Yt(r);postMessage({type:t,out:o});break}case"create":{let{model:r,options:o}=n;Ar(r,o).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":kr(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:o,inputs:a,outputIndices:s,options:d}=n;Er(r,o,a,s,new Array(s.length).fill(null),d).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},zr([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Pr(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}});Mf=bs?null:e=>new Worker(e??Ve,{type:"module",name:ys})});var $s={};Zt($s,{default:()=>Rf});var Kn,vs,Rf,Uf,xs=G(()=>{"use strict";vs=(Kn=import.meta.url,async function(e={}){var t,n,r=e,o=new Promise((i,u)=>{t=i,n=u}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",d=s&&self.name?.startsWith("em-pthread");r.mountExternalData=(i,u)=>{i.startsWith("./")&&(i=i.substring(2)),(r.Bd||(r.Bd=new Map)).set(i,u)},r.unmountExternalData=()=>{delete r.Bd};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let p=()=>{let i=(c,m,g)=>(...x)=>{let C=Xe,z=m?.();x=c(...x);let B=m?.();return z!==B&&(c=B,g(z),m=g=null),Xe!=C?new Promise((L,q)=>{En={resolve:L,reject:q}}):x},u=c=>async(...m)=>{try{if(r.Cd)throw Error("Session already started");let g=r.Cd={be:m[0],errors:[]},x=await c(...m);if(r.Cd!==g)throw Error("Session mismatch");r.Dd?.flush();let C=g.errors;if(0<C.length){let z=await Promise.all(C);if(z=z.filter(B=>B),0<z.length)throw Error(z.join(`
`))}return x}finally{r.Cd=null}};r._OrtCreateSession=i(r._OrtCreateSession,()=>r._OrtCreateSession,c=>r._OrtCreateSession=c),r._OrtRun=u(i(r._OrtRun,()=>r._OrtRun,c=>r._OrtRun=c)),r._OrtRunWithBinding=u(i(r._OrtRunWithBinding,()=>r._OrtRunWithBinding,c=>r._OrtRunWithBinding=c)),r._OrtBindInput=i(r._OrtBindInput,()=>r._OrtBindInput,c=>r._OrtBindInput=c),p=void 0};r.jsepInit=(i,u)=>{if(p?.(),i==="webgpu"){[r.Dd,r.Rd,r.Vd,r.Hd,r.Ud,r.hc,r.Wd,r.Zd,r.Sd,r.Td,r.Xd]=u;let c=r.Dd;r.jsepRegisterBuffer=(m,g,x,C)=>c.registerBuffer(m,g,x,C),r.jsepGetBuffer=m=>c.getBuffer(m),r.jsepCreateDownloader=(m,g,x)=>c.createDownloader(m,g,x),r.jsepOnCreateSession=m=>{c.onCreateSession(m)},r.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},r.jsepOnRunStart=m=>c.onRunStart(m),r.$d=(m,g)=>{c.upload(m,g)}}else if(i==="webnn"){[r.Dd,r.Yd,r.Id,r.jsepEnsureTensor,r.Jd,r.jsepDownloadTensor]=u,r.jsepReleaseTensorId=r.Id,r.jsepUploadTensor=r.Jd;let c=r.Dd;r.jsepOnRunStart=m=>c.onRunStart(m),r.jsepOnRunEnd=c.onRunEnd.bind(c),r.jsepRegisterMLContext=(m,g)=>{c.registerMLContext(m,g)},r.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},r.jsepCreateMLTensorDownloader=(m,g)=>c.createMLTensorDownloader(m,g),r.jsepRegisterMLTensor=(m,g,x,C)=>c.registerMLTensor(m,g,x,C),r.jsepCreateMLContext=m=>c.createMLContext(m),r.jsepRegisterMLConstant=(m,g,x,C,z)=>c.registerMLConstant(m,g,x,C,z,r.Bd),r.jsepRegisterGraphInput=c.registerGraphInput.bind(c),r.jsepIsGraphInput=c.isGraphInput.bind(c),r.jsepCreateTemporaryTensor=c.createTemporaryTensor.bind(c)}};var f,h,y=Object.assign({},r),_=(i,u)=>{throw u},b="";(a||s)&&(s?b=self.location.href:typeof document<"u"&&document.currentScript&&(b=document.currentScript.src),Kn&&(b=Kn),b=b.startsWith("blob:")?"":b.slice(0,b.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(h=i=>{var u=new XMLHttpRequest;return u.open("GET",i,!1),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),f=async i=>{if(se(i))return new Promise((c,m)=>{var g=new XMLHttpRequest;g.open("GET",i,!0),g.responseType="arraybuffer",g.onload=()=>{g.status==200||g.status==0&&g.response?c(g.response):m(g.status)},g.onerror=m,g.send(null)});var u=await fetch(i,{credentials:"same-origin"});if(u.ok)return u.arrayBuffer();throw Error(u.status+" : "+u.url)});var w=console.log.bind(console),S=console.error.bind(console),$=w,v=S;Object.assign(r,y),y=null;var T,I,A,k,O,M,V,F,j,ne,W,J,ve,Q=r.wasmBinary,ee=!1,se=i=>i.startsWith("file://");function Z(){return T.buffer!=k.buffer&&ge(),k}function me(){return T.buffer!=k.buffer&&ge(),O}function ke(){return T.buffer!=k.buffer&&ge(),M}function Se(){return T.buffer!=k.buffer&&ge(),V}function D(){return T.buffer!=k.buffer&&ge(),F}function R(){return T.buffer!=k.buffer&&ge(),j}function Y(){return T.buffer!=k.buffer&&ge(),ne}function fe(){return T.buffer!=k.buffer&&ge(),ve}if(d){let i=function(u){try{var c=u.data,m=c.yd;if(m==="load"){let g=[];self.onmessage=x=>g.push(x),self.startWorker=()=>{postMessage({yd:"loaded"});for(let x of g)i(x);self.onmessage=i};for(let x of c.Od)r[x]&&!r[x].proxy||(r[x]=(...C)=>{postMessage({yd:"callHandler",Nd:x,args:C})},x=="print"&&($=r[x]),x=="printErr"&&(v=r[x]));T=c.he,ge(),Fe(c.ie)}else if(m==="run"){mp(c.xd),Dn(c.xd,0,0,1,0,0),Go(),An(c.xd),xe||(Ri(),xe=!0);try{fp(c.de,c.Fd)}catch(g){if(g!="unwind")throw g}}else c.target!=="setimmediate"&&(m==="checkMailbox"?xe&&ur():m&&(v(`worker: received unknown command ${m}`),v(c)))}catch(g){throw Ui(),g}};var lb=i,Fe,xe=!1;v=function(...u){u=u.join(" "),console.error(u)},self.alert=function(...u){postMessage({yd:"alert",text:u.join(" "),fe:gr()})},self.onunhandledrejection=u=>{throw u.reason||u},self.onmessage=i}function ge(){var i=T.buffer;r.HEAP8=k=new Int8Array(i),r.HEAP16=M=new Int16Array(i),r.HEAPU8=O=new Uint8Array(i),r.HEAPU16=V=new Uint16Array(i),r.HEAP32=F=new Int32Array(i),r.HEAPU32=j=new Uint32Array(i),r.HEAPF32=ne=new Float32Array(i),r.HEAPF64=ve=new Float64Array(i),r.HEAP64=W=new BigInt64Array(i),r.HEAPU64=J=new BigUint64Array(i)}function st(){d?startWorker(r):U.Bb()}d||(T=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ge());var xt,St=0,Ht=null;function Mo(){if(--St==0&&Ht){var i=Ht;Ht=null,i()}}function ut(i){throw v(i="Aborted("+i+")"),ee=!0,i=new WebAssembly.RuntimeError(i+". Build with -sASSERTIONS for more info."),n(i),i}function Ro(){return{a:{Ta:pp,Va:cp,W:hp,la:gp,b:bp,u:_p,R:wp,Za:vp,d:$p,pb:Ko,g:yp,T:Qo,Ga:Yo,lb:Jo,nb:ei,Ha:ti,Ea:ri,wb:ni,Da:oi,pa:ii,mb:ai,jb:si,Fa:ui,kb:di,Ma:xp,za:Tp,eb:Ip,cb:Ap,ya:Ep,V:Pp,N:zp,db:Op,ma:Vp,fb:Wp,zb:Lp,hb:Gp,qb:Hp,ab:Fp,Aa:qp,yb:An,Ja:Kp,S:jp,Wa:Zp,$:Xp,G:Jp,E:tm,m:Tn,H:rm,B:im,X:am,J:sm,v:um,O:dm,D:lm,t:cm,A:pm,z:mm,w:fm,r:hm,tb:gm,ub:ym,vb:bm,rb:xi,sb:Si,bb:Ti,Oa:wm,La:xm,y:Sm,ja:Tm,Ba:Im,Ka:vm,qa:Cm,Ia:Am,ib:km,U:_m,fa:Em,Sa:Pm,gb:zm,Qa:Om,Pa:Dm,Ab:ki,Ca:Ei,ob:_n,aa:Pi,oa:zi,xb:Oi,na:Di,$a:uf,ia:vf,sa:If,ga:af,da:ff,ua:Sf,p:nf,e:Wm,c:Nm,ea:pf,f:Lm,n:Hm,k:Jm,Y:qm,ka:ef,j:of,wa:cf,Ra:kf,ca:_f,Ua:Af,P:mf,K:jm,_:bf,Q:sf,Z:$f,x:Km,l:Vm,va:yf,i:Um,h:Fm,ra:Cf,ta:Tf,o:Gm,q:Zm,s:Ym,I:Xm,C:rf,L:tf,xa:lf,_a:df,F:wf,Ya:hf,ba:xf,M:Qm,Xa:gf,ha:Mm,a:T,Na:bn}}}var hn={1319426:()=>typeof wasmOffsetConverter<"u",1319483:(i,u,c,m,g)=>{if(r===void 0||!r.Bd)return 1;if((i=Ae(Number(i>>>0))).startsWith("./")&&(i=i.substring(2)),!(i=r.Bd.get(i)))return 2;if(u=Number(u>>>0),c=Number(c>>>0),m=Number(m>>>0),u+c>i.byteLength)return 3;try{let x=i.subarray(u,u+c);switch(g){case 0:me().set(x,m>>>0);break;case 1:r.$d(m,x);break;default:return 4}return 0}catch{return 4}},1320198:(i,u,c)=>{r.Jd(i,me().subarray(u>>>0,u+c>>>0))},1320261:()=>r.Yd(),1320302:i=>{r.Id(i)},1320338:()=>{r.Sd()},1320369:()=>{r.Td()},1320398:()=>{r.Xd()},1320423:i=>r.Rd(i),1320456:i=>r.Vd(i),1320488:(i,u,c)=>{r.Hd(Number(i),Number(u),Number(c),!0)},1320551:(i,u,c)=>{r.Hd(Number(i),Number(u),Number(c))},1320608:i=>{r.hc("Abs",i,void 0)},1320659:i=>{r.hc("Neg",i,void 0)},1320710:i=>{r.hc("Floor",i,void 0)},1320763:i=>{r.hc("Ceil",i,void 0)},1320815:i=>{r.hc("Reciprocal",i,void 0)},1320873:i=>{r.hc("Sqrt",i,void 0)},1320925:i=>{r.hc("Exp",i,void 0)},1320976:i=>{r.hc("Erf",i,void 0)},1321027:i=>{r.hc("Sigmoid",i,void 0)},1321082:(i,u,c)=>{r.hc("HardSigmoid",i,{alpha:u,beta:c})},1321161:i=>{r.hc("Log",i,void 0)},1321212:i=>{r.hc("Sin",i,void 0)},1321263:i=>{r.hc("Cos",i,void 0)},1321314:i=>{r.hc("Tan",i,void 0)},1321365:i=>{r.hc("Asin",i,void 0)},1321417:i=>{r.hc("Acos",i,void 0)},1321469:i=>{r.hc("Atan",i,void 0)},1321521:i=>{r.hc("Sinh",i,void 0)},1321573:i=>{r.hc("Cosh",i,void 0)},1321625:i=>{r.hc("Asinh",i,void 0)},1321678:i=>{r.hc("Acosh",i,void 0)},1321731:i=>{r.hc("Atanh",i,void 0)},1321784:i=>{r.hc("Tanh",i,void 0)},1321836:i=>{r.hc("Not",i,void 0)},1321887:(i,u,c)=>{r.hc("Clip",i,{min:u,max:c})},1321956:i=>{r.hc("Clip",i,void 0)},1322008:(i,u)=>{r.hc("Elu",i,{alpha:u})},1322066:i=>{r.hc("Gelu",i,void 0)},1322118:i=>{r.hc("Relu",i,void 0)},1322170:(i,u)=>{r.hc("LeakyRelu",i,{alpha:u})},1322234:(i,u)=>{r.hc("ThresholdedRelu",i,{alpha:u})},1322304:(i,u)=>{r.hc("Cast",i,{to:u})},1322362:i=>{r.hc("Add",i,void 0)},1322413:i=>{r.hc("Sub",i,void 0)},1322464:i=>{r.hc("Mul",i,void 0)},1322515:i=>{r.hc("Div",i,void 0)},1322566:i=>{r.hc("Pow",i,void 0)},1322617:i=>{r.hc("Equal",i,void 0)},1322670:i=>{r.hc("Greater",i,void 0)},1322725:i=>{r.hc("GreaterOrEqual",i,void 0)},1322787:i=>{r.hc("Less",i,void 0)},1322839:i=>{r.hc("LessOrEqual",i,void 0)},1322898:(i,u,c,m,g)=>{r.hc("ReduceMean",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323073:(i,u,c,m,g)=>{r.hc("ReduceMax",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323247:(i,u,c,m,g)=>{r.hc("ReduceMin",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323421:(i,u,c,m,g)=>{r.hc("ReduceProd",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323596:(i,u,c,m,g)=>{r.hc("ReduceSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323770:(i,u,c,m,g)=>{r.hc("ReduceL1",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1323943:(i,u,c,m,g)=>{r.hc("ReduceL2",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324116:(i,u,c,m,g)=>{r.hc("ReduceLogSum",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324293:(i,u,c,m,g)=>{r.hc("ReduceSumSquare",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324473:(i,u,c,m,g)=>{r.hc("ReduceLogSumExp",i,{keepDims:!!u,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1324653:i=>{r.hc("Where",i,void 0)},1324706:(i,u,c)=>{r.hc("Transpose",i,{perm:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[]})},1324830:(i,u,c,m)=>{r.hc("DepthToSpace",i,{blocksize:u,mode:Ae(c),format:m?"NHWC":"NCHW"})},1324963:(i,u,c,m)=>{r.hc("DepthToSpace",i,{blocksize:u,mode:Ae(c),format:m?"NHWC":"NCHW"})},1325096:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e,Le)=>{r.hc("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[x,C],strides:[z],wIsConst:()=>!!Z()[L>>>0],outputPadding:q?Array.from(D().subarray(Number(q)>>>0,Number(X)>>>0)):[],outputShape:de?Array.from(D().subarray(Number(de)>>>0,Number($e)>>>0)):[],activation:Ae(Le)})},1325529:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)=>{r.hc("ConvTranspose",i,{format:z?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!Z()[B>>>0],outputPadding:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(de)>>>0)):[],activation:Ae($e)})},1326190:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e,Le)=>{r.hc("ConvTranspose",i,{format:B?"NHWC":"NCHW",autoPad:u,dilations:[c],group:m,kernelShape:[g],pads:[x,C],strides:[z],wIsConst:()=>!!Z()[L>>>0],outputPadding:q?Array.from(D().subarray(Number(q)>>>0,Number(X)>>>0)):[],outputShape:de?Array.from(D().subarray(Number(de)>>>0,Number($e)>>>0)):[],activation:Ae(Le)})},1326623:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)=>{r.hc("ConvTranspose",i,{format:z?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(g)>>>0,2+(Number(g)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(C)>>>0,2+(Number(C)>>>0)>>>0)),wIsConst:()=>!!Z()[B>>>0],outputPadding:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(de)>>>0)):[],activation:Ae($e)})},1327284:(i,u)=>{r.hc("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1327375:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)=>{r.hc("AveragePool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(de)>>>0)):[]})},1327854:(i,u)=>{r.hc("GlobalAveragePool",i,{format:u?"NHWC":"NCHW"})},1327945:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)=>{r.hc("AveragePool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(de)>>>0)):[]})},1328424:(i,u)=>{r.hc("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1328511:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)=>{r.hc("MaxPool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(de)>>>0)):[]})},1328986:(i,u)=>{r.hc("GlobalMaxPool",i,{format:u?"NHWC":"NCHW"})},1329073:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)=>{r.hc("MaxPool",i,{format:$e?"NHWC":"NCHW",auto_pad:u,ceil_mode:c,count_include_pad:m,storage_order:g,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],kernel_shape:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(de)>>>0)):[]})},1329548:(i,u,c,m,g)=>{r.hc("Gemm",i,{alpha:u,beta:c,transA:m,transB:g})},1329652:i=>{r.hc("MatMul",i,void 0)},1329706:(i,u,c,m)=>{r.hc("ArgMax",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1329814:(i,u,c,m)=>{r.hc("ArgMin",i,{keepDims:!!u,selectLastIndex:!!c,axis:m})},1329922:(i,u)=>{r.hc("Softmax",i,{axis:u})},1329985:(i,u)=>{r.hc("Concat",i,{axis:u})},1330045:(i,u,c,m,g)=>{r.hc("Split",i,{axis:u,numOutputs:c,splitSizes:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1330201:i=>{r.hc("Expand",i,void 0)},1330255:(i,u)=>{r.hc("Gather",i,{axis:Number(u)})},1330326:(i,u)=>{r.hc("GatherElements",i,{axis:Number(u)})},1330405:(i,u)=>{r.hc("GatherND",i,{batch_dims:Number(u)})},1330484:(i,u,c,m,g,x,C,z,B,L,q)=>{r.hc("Resize",i,{antialias:u,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Ae(g),cubicCoeffA:x,excludeOutside:C,extrapolationValue:z,keepAspectRatioPolicy:Ae(B),mode:Ae(L),nearestMode:Ae(q)})},1330846:(i,u,c,m,g,x,C)=>{r.hc("Slice",i,{starts:u?Array.from(D().subarray(Number(u)>>>0,Number(c)>>>0)):[],ends:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[],axes:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[]})},1331110:i=>{r.hc("Tile",i,void 0)},1331162:(i,u,c)=>{r.hc("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1331276:(i,u,c)=>{r.hc("InstanceNormalization",i,{epsilon:u,format:c?"NHWC":"NCHW"})},1331390:i=>{r.hc("Range",i,void 0)},1331443:(i,u)=>{r.hc("Einsum",i,{equation:Ae(u)})},1331524:(i,u,c,m,g)=>{r.hc("Pad",i,{mode:u,value:c,pads:m?Array.from(D().subarray(Number(m)>>>0,Number(g)>>>0)):[]})},1331667:(i,u,c,m,g,x)=>{r.hc("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:x?"NHWC":"NCHW"})},1331836:(i,u,c,m,g,x)=>{r.hc("BatchNormalization",i,{epsilon:u,momentum:c,spatial:!!g,trainingMode:!!m,format:x?"NHWC":"NCHW"})},1332005:(i,u,c)=>{r.hc("CumSum",i,{exclusive:Number(u),reverse:Number(c)})},1332102:(i,u,c)=>{r.hc("DequantizeLinear",i,{axis:u,blockSize:c})},1332192:(i,u,c,m,g)=>{r.hc("GridSample",i,{align_corners:u,mode:Ae(c),padding_mode:Ae(m),format:g?"NHWC":"NCHW"})},1332362:(i,u,c,m,g)=>{r.hc("GridSample",i,{align_corners:u,mode:Ae(c),padding_mode:Ae(m),format:g?"NHWC":"NCHW"})},1332532:(i,u)=>{r.hc("ScatterND",i,{reduction:Ae(u)})},1332617:(i,u,c,m,g,x,C,z,B)=>{r.hc("Attention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:x,qkvHiddenSizes:C?Array.from(D().subarray(Number(z)>>>0,Number(z)+C>>>0)):[],pastPresentShareBuffer:!!B})},1332889:i=>{r.hc("BiasAdd",i,void 0)},1332944:i=>{r.hc("BiasSplitGelu",i,void 0)},1333005:i=>{r.hc("FastGelu",i,void 0)},1333061:(i,u,c,m,g,x,C,z,B,L,q,X,de,$e,Le,jt)=>{r.hc("Conv",i,{format:X?"NHWC":"NCHW",auto_pad:u,dilations:c?Array.from(D().subarray(Number(c)>>>0,Number(m)>>>0)):[],group:g,kernel_shape:x?Array.from(D().subarray(Number(x)>>>0,Number(C)>>>0)):[],pads:z?Array.from(D().subarray(Number(z)>>>0,Number(B)>>>0)):[],strides:L?Array.from(D().subarray(Number(L)>>>0,Number(q)>>>0)):[],w_is_const:()=>!!Z()[Number(de)>>>0],activation:Ae($e),activation_params:Le?Array.from(Y().subarray(Number(Le)>>>0,Number(jt)>>>0)):[]})},1333645:i=>{r.hc("Gelu",i,void 0)},1333697:(i,u,c,m,g,x,C,z,B)=>{r.hc("GroupQueryAttention",i,{numHeads:u,kvNumHeads:c,scale:m,softcap:g,doRotary:x,rotaryInterleaved:C,smoothSoftmax:z,localWindowSize:B})},1333914:(i,u,c,m)=>{r.hc("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1334025:(i,u,c,m)=>{r.hc("LayerNormalization",i,{axis:u,epsilon:c,simplified:!!m})},1334136:(i,u,c,m,g,x)=>{r.hc("MatMulNBits",i,{k:u,n:c,accuracyLevel:m,bits:g,blockSize:x})},1334263:(i,u,c,m,g,x)=>{r.hc("MultiHeadAttention",i,{numHeads:u,isUnidirectional:c,maskFilterValue:m,scale:g,doRotary:x})},1334422:(i,u)=>{r.hc("QuickGelu",i,{alpha:u})},1334486:(i,u,c,m,g)=>{r.hc("RotaryEmbedding",i,{interleaved:!!u,numHeads:c,rotaryEmbeddingDim:m,scale:g})},1334625:(i,u,c)=>{r.hc("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1334727:(i,u,c)=>{r.hc("SkipLayerNormalization",i,{epsilon:u,simplified:!!c})},1334829:(i,u,c,m)=>{r.hc("GatherBlockQuantized",i,{gatherAxis:u,quantizeAxis:c,blockSize:m})},1334950:i=>{r.Wd(i)},1334984:(i,u)=>r.Zd(Number(i),Number(u),r.Cd.be,r.Cd.errors)};function cp(i,u,c){return yi(async()=>{await r.Ud(Number(i),Number(u),Number(c))})}function pp(){return typeof wasmOffsetConverter<"u"}class gn{name="ExitStatus";constructor(u){this.message=`Program terminated with exit(${u})`,this.status=u}}var Uo=i=>{i.terminate(),i.onmessage=()=>{}},yn=[],No=i=>{ft.length==0&&(Fo(),Ho(ft[0]));var u=ft.pop();if(!u)return 6;Ft.push(u),Tt[i.xd]=u,u.xd=i.xd;var c={yd:"run",de:i.ce,Fd:i.Fd,xd:i.xd};return u.postMessage(c,i.Ld),0},mt=0,Te=(i,u,...c)=>{for(var m=2*c.length,g=ie(),x=Mn(8*m),C=x>>>3,z=0;z<c.length;z++){var B=c[z];typeof B=="bigint"?(W[C+2*z]=1n,W[C+2*z+1]=B):(W[C+2*z]=0n,fe()[C+2*z+1>>>0]=B)}return i=Ni(i,0,m,x,u),oe(g),i};function bn(i){if(d)return Te(0,1,i);if(A=i,!(0<mt)){for(var u of Ft)Uo(u);for(u of ft)Uo(u);ft=[],Ft=[],Tt={},ee=!0}_(0,new gn(i))}function Vo(i){if(d)return Te(1,0,i);_n(i)}var _n=i=>{if(A=i,d)throw Vo(i),"unwind";bn(i)},ft=[],Ft=[],Wo=[],Tt={},Lo=i=>{var u=i.xd;delete Tt[u],ft.push(i),Ft.splice(Ft.indexOf(i),1),i.xd=0,Vi(u)};function Go(){Wo.forEach(i=>i())}var Ho=i=>new Promise(u=>{i.onmessage=g=>{var x=(g=g.data).yd;if(g.Ed&&g.Ed!=gr()){var C=Tt[g.Ed];C?C.postMessage(g,g.Ld):v(`Internal error! Worker sent a message "${x}" to target pthread ${g.Ed}, but that thread no longer exists!`)}else x==="checkMailbox"?ur():x==="spawnThread"?No(g):x==="cleanupThread"?Lo(Tt[g.ee]):x==="loaded"?(i.loaded=!0,u(i)):x==="alert"?alert(`Thread ${g.fe}: ${g.text}`):g.target==="setimmediate"?i.postMessage(g):x==="callHandler"?r[g.Nd](...g.args):x&&v(`worker sent an unknown command ${x}`)},i.onerror=g=>{throw v(`worker sent an error! ${g.filename}:${g.lineno}: ${g.message}`),g};var c,m=[];for(c of[])r.propertyIsEnumerable(c)&&m.push(c);i.postMessage({yd:"load",Od:m,he:T,ie:I})});function Fo(){var i=new Worker(import.meta.url.startsWith("file:")?new URL("ort.webgpu.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ft.push(i)}var mp=i=>{ge();var u=R()[i+52>>>2>>>0];i=R()[i+56>>>2>>>0],Gi(u,u-i),oe(u)},fp=(i,u)=>{mt=0,i=Rn(i,u),0<mt?A=i:Bn(i)},sr=[];function hp(i){var u=new wn(i>>>=0);if(Z()[u.wd+12>>>0]==0){var c=1;Z()[u.wd+12>>>0]=c}return c=0,Z()[u.wd+13>>>0]=c,sr.push(u),Fi(i),Ki(i)}var Bt=0,gp=()=>{ue(0,0);var i=sr.pop();Hi(i.Gd),Bt=0};class wn{constructor(u){this.Gd=u,this.wd=u-24}}function yp(i){throw Bt||=i>>>0,Bt}var vn=i=>{var u=Bt;if(!u)return Kt(0),0;var c=new wn(u);R()[c.wd+16>>>2>>>0]=u;var m=R()[c.wd+4>>>2>>>0];if(!m)return Kt(0),u;for(var g of i){if(g===0||g===m)break;if(qi(g,m,c.wd+16))return Kt(g),u}return Kt(m),u};function bp(){return vn([])}function _p(i){return vn([i>>>0])}function wp(i,u){return vn([i>>>0,u>>>0])}var vp=()=>{var i=sr.pop();i||ut("no exception to throw");var u=i.Gd;if(Z()[i.wd+13>>>0]==0){sr.push(i);var c=1;Z()[i.wd+13>>>0]=c,c=0,Z()[i.wd+12>>>0]=c}throw Bt=u};function $p(i,u,c){var m=new wn(i>>>=0);throw u>>>=0,c>>>=0,R()[m.wd+16>>>2>>>0]=0,R()[m.wd+4>>>2>>>0]=u,R()[m.wd+8>>>2>>>0]=c,Bt=i}function qo(i,u,c,m){return d?Te(2,1,i,u,c,m):Ko(i,u,c,m)}function Ko(i,u,c,m){if(i>>>=0,c>>>=0,m>>>=0,l===void 0)return 6;var g=[];return d&&g.length===0?qo(i,u>>>=0,c,m):(i={ce:c,xd:i,Fd:m,Ld:g},d?(i.yd="spawnThread",postMessage(i,g),0):No(i))}var jo=typeof TextDecoder<"u"?new TextDecoder:void 0,Zo=(i,u=0,c=NaN)=>{var m=(u>>>=0)+c;for(c=u;i[c]&&!(c>=m);)++c;if(16<c-u&&i.buffer&&jo)return jo.decode(i.buffer instanceof ArrayBuffer?i.subarray(u,c):i.slice(u,c));for(m="";u<c;){var g=i[u++];if(128&g){var x=63&i[u++];if((224&g)==192)m+=String.fromCharCode((31&g)<<6|x);else{var C=63&i[u++];65536>(g=(240&g)==224?(15&g)<<12|x<<6|C:(7&g)<<18|x<<12|C<<6|63&i[u++])?m+=String.fromCharCode(g):(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g))}}else m+=String.fromCharCode(g)}return m},Ae=(i,u)=>(i>>>=0)?Zo(me(),i,u):"";function Qo(i,u,c){return d?Te(3,1,i,u,c):0}function Yo(i,u){if(d)return Te(4,1,i,u)}var Xo=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);127>=m?u++:2047>=m?u+=2:55296<=m&&57343>=m?(u+=4,++c):u+=3}return u},Mt=(i,u,c)=>{var m=me();if(u>>>=0,0<c){var g=u;c=u+c-1;for(var x=0;x<i.length;++x){var C=i.charCodeAt(x);if(55296<=C&&57343>=C&&(C=65536+((1023&C)<<10)|1023&i.charCodeAt(++x)),127>=C){if(u>=c)break;m[u++>>>0]=C}else{if(2047>=C){if(u+1>=c)break;m[u++>>>0]=192|C>>6}else{if(65535>=C){if(u+2>=c)break;m[u++>>>0]=224|C>>12}else{if(u+3>=c)break;m[u++>>>0]=240|C>>18,m[u++>>>0]=128|C>>12&63}m[u++>>>0]=128|C>>6&63}m[u++>>>0]=128|63&C}}m[u>>>0]=0,i=u-g}else i=0;return i};function Jo(i,u){if(d)return Te(5,1,i,u)}function ei(i,u,c){if(d)return Te(6,1,i,u,c)}function ti(i,u,c){return d?Te(7,1,i,u,c):0}function ri(i,u){if(d)return Te(8,1,i,u)}function ni(i,u,c){if(d)return Te(9,1,i,u,c)}function oi(i,u,c,m){if(d)return Te(10,1,i,u,c,m)}function ii(i,u,c,m){if(d)return Te(11,1,i,u,c,m)}function ai(i,u,c,m){if(d)return Te(12,1,i,u,c,m)}function si(i){if(d)return Te(13,1,i)}function ui(i,u){if(d)return Te(14,1,i,u)}function di(i,u,c){if(d)return Te(15,1,i,u,c)}var li,ht,xp=()=>ut(""),Ye=i=>{for(var u="";me()[i>>>0];)u+=li[me()[i++>>>0]];return u},$n={},xn={},Sp={};function dt(i,u,c={}){return function(m,g,x={}){var C=g.name;if(!m)throw new ht(`type "${C}" must have a positive integer typeid pointer`);if(xn.hasOwnProperty(m)){if(x.Pd)return;throw new ht(`Cannot register type '${C}' twice`)}xn[m]=g,delete Sp[m],$n.hasOwnProperty(m)&&(g=$n[m],delete $n[m],g.forEach(z=>z()))}(i,u,c)}var ci=(i,u,c)=>{switch(u){case 1:return c?m=>Z()[m>>>0]:m=>me()[m>>>0];case 2:return c?m=>ke()[m>>>1>>>0]:m=>Se()[m>>>1>>>0];case 4:return c?m=>D()[m>>>2>>>0]:m=>R()[m>>>2>>>0];case 8:return c?m=>W[m>>>3]:m=>J[m>>>3];default:throw new TypeError(`invalid integer width (${u}): ${i}`)}};function Tp(i,u,c){c>>>=0,dt(i>>>=0,{name:u=Ye(u>>>0),fromWireType:m=>m,toWireType:function(m,g){if(typeof g!="bigint"&&typeof g!="number")throw g=g===null?"null":(m=typeof g)=="object"||m==="array"||m==="function"?g.toString():""+g,new TypeError(`Cannot convert "${g}" to ${this.name}`);return typeof g=="number"&&(g=BigInt(g)),g},zd:gt,readValueFromPointer:ci(u,c,u.indexOf("u")==-1),Ad:null})}var gt=8;function Ip(i,u,c,m){dt(i>>>=0,{name:u=Ye(u>>>0),fromWireType:function(g){return!!g},toWireType:function(g,x){return x?c:m},zd:gt,readValueFromPointer:function(g){return this.fromWireType(me()[g>>>0])},Ad:null})}var Sn=[],lt=[];function Tn(i){9<(i>>>=0)&&--lt[i+1]==0&&(lt[i]=void 0,Sn.push(i))}var Re=i=>{if(!i)throw new ht("Cannot use deleted val. handle = "+i);return lt[i]},We=i=>{switch(i){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let u=Sn.pop()||lt.length;return lt[u]=i,lt[u+1]=1,u}};function In(i){return this.fromWireType(R()[i>>>2>>>0])}var Cp={name:"emscripten::val",fromWireType:i=>{var u=Re(i);return Tn(i),u},toWireType:(i,u)=>We(u),zd:gt,readValueFromPointer:In,Ad:null};function Ap(i){return dt(i>>>0,Cp)}var kp=(i,u)=>{switch(u){case 4:return function(c){return this.fromWireType(Y()[c>>>2>>>0])};case 8:return function(c){return this.fromWireType(fe()[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${u}): ${i}`)}};function Ep(i,u,c){c>>>=0,dt(i>>>=0,{name:u=Ye(u>>>0),fromWireType:m=>m,toWireType:(m,g)=>g,zd:gt,readValueFromPointer:kp(u,c),Ad:null})}function Pp(i,u,c,m,g){if(i>>>=0,c>>>=0,u=Ye(u>>>0),g===-1&&(g=4294967295),g=z=>z,m===0){var x=32-8*c;g=z=>z<<x>>>x}var C=u.includes("unsigned")?function(z,B){return B>>>0}:function(z,B){return B};dt(i,{name:u,fromWireType:g,toWireType:C,zd:gt,readValueFromPointer:ci(u,c,m!==0),Ad:null})}function zp(i,u,c){function m(x){var C=R()[x>>>2>>>0];return x=R()[x+4>>>2>>>0],new g(Z().buffer,x,C)}var g=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][u];dt(i>>>=0,{name:c=Ye(c>>>0),fromWireType:m,zd:gt,readValueFromPointer:m},{Pd:!0})}function Op(i,u){dt(i>>>=0,{name:u=Ye(u>>>0),fromWireType:function(c){for(var m,g=R()[c>>>2>>>0],x=c+4,C=x,z=0;z<=g;++z){var B=x+z;z!=g&&me()[B>>>0]!=0||(C=Ae(C,B-C),m===void 0?m=C:(m+="\0",m+=C),C=B+1)}return Je(c),m},toWireType:function(c,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var g=typeof m=="string";if(!(g||m instanceof Uint8Array||m instanceof Uint8ClampedArray||m instanceof Int8Array))throw new ht("Cannot pass non-string to std::string");var x=g?Xo(m):m.length,C=yr(4+x+1),z=C+4;if(R()[C>>>2>>>0]=x,g)Mt(m,z,x+1);else if(g)for(g=0;g<x;++g){var B=m.charCodeAt(g);if(255<B)throw Je(C),new ht("String has UTF-16 code units that do not fit in 8 bits");me()[z+g>>>0]=B}else for(g=0;g<x;++g)me()[z+g>>>0]=m[g];return c!==null&&c.push(Je,C),C},zd:gt,readValueFromPointer:In,Ad(c){Je(c)}})}var pi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Dp=(i,u)=>{for(var c=i>>1,m=c+u/2;!(c>=m)&&Se()[c>>>0];)++c;if(32<(c<<=1)-i&&pi)return pi.decode(me().slice(i,c));for(c="",m=0;!(m>=u/2);++m){var g=ke()[i+2*m>>>1>>>0];if(g==0)break;c+=String.fromCharCode(g)}return c},Bp=(i,u,c)=>{if(c??=2147483647,2>c)return 0;var m=u;c=(c-=2)<2*i.length?c/2:i.length;for(var g=0;g<c;++g){var x=i.charCodeAt(g);ke()[u>>>1>>>0]=x,u+=2}return ke()[u>>>1>>>0]=0,u-m},Mp=i=>2*i.length,Rp=(i,u)=>{for(var c=0,m="";!(c>=u/4);){var g=D()[i+4*c>>>2>>>0];if(g==0)break;++c,65536<=g?(g-=65536,m+=String.fromCharCode(55296|g>>10,56320|1023&g)):m+=String.fromCharCode(g)}return m},Up=(i,u,c)=>{if(u>>>=0,c??=2147483647,4>c)return 0;var m=u;c=m+c-4;for(var g=0;g<i.length;++g){var x=i.charCodeAt(g);if(55296<=x&&57343>=x&&(x=65536+((1023&x)<<10)|1023&i.charCodeAt(++g)),D()[u>>>2>>>0]=x,(u+=4)+4>c)break}return D()[u>>>2>>>0]=0,u-m},Np=i=>{for(var u=0,c=0;c<i.length;++c){var m=i.charCodeAt(c);55296<=m&&57343>=m&&++c,u+=4}return u};function Vp(i,u,c){if(i>>>=0,u>>>=0,c=Ye(c>>>=0),u===2)var m=Dp,g=Bp,x=Mp,C=z=>Se()[z>>>1>>>0];else u===4&&(m=Rp,g=Up,x=Np,C=z=>R()[z>>>2>>>0]);dt(i,{name:c,fromWireType:z=>{for(var B,L=R()[z>>>2>>>0],q=z+4,X=0;X<=L;++X){var de=z+4+X*u;X!=L&&C(de)!=0||(q=m(q,de-q),B===void 0?B=q:(B+="\0",B+=q),q=de+u)}return Je(z),B},toWireType:(z,B)=>{if(typeof B!="string")throw new ht(`Cannot pass non-string to C++ string type ${c}`);var L=x(B),q=yr(4+L+u);return R()[q>>>2>>>0]=L/u,g(B,q+4,L+u),z!==null&&z.push(Je,q),q},zd:gt,readValueFromPointer:In,Ad(z){Je(z)}})}function Wp(i,u){dt(i>>>=0,{Qd:!0,name:u=Ye(u>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function Lp(i){Dn(i>>>0,!s,1,!a,131072,!1),Go()}var Cn=i=>{if(!ee)try{if(i(),!(0<mt))try{d?Bn(A):_n(A)}catch(u){u instanceof gn||u=="unwind"||_(0,u)}}catch(u){u instanceof gn||u=="unwind"||_(0,u)}};function An(i){i>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(D(),i>>>2,i).value.then(ur),i+=128,Atomics.store(D(),i>>>2,1))}var ur=()=>{var i=gr();i&&(An(i),Cn(Li))};function Gp(i,u){(i>>>=0)==u>>>0?setTimeout(ur):d?postMessage({Ed:i,yd:"checkMailbox"}):(i=Tt[i])&&i.postMessage({yd:"checkMailbox"})}var kn=[];function Hp(i,u,c,m,g){for(u>>>=0,m/=2,kn.length=m,c=g>>>0>>>3,g=0;g<m;g++)kn[g]=W[c+2*g]?W[c+2*g+1]:fe()[c+2*g+1>>>0];return(u?hn[u]:Rm[i])(...kn)}var Fp=()=>{mt=0};function qp(i){i>>>=0,d?postMessage({yd:"cleanupThread",ee:i}):Lo(Tt[i])}function Kp(i){}var dr=(i,u)=>{var c=xn[i];if(c===void 0)throw i=Mi(i),c=Ye(i),Je(i),new ht(`${u} has unknown type ${c}`);return c},mi=(i,u,c)=>{var m=[];return i=i.toWireType(m,c),m.length&&(R()[u>>>2>>>0]=We(m)),i};function jp(i,u,c){return u>>>=0,c>>>=0,i=Re(i>>>0),u=dr(u,"emval::as"),mi(u,c,i)}function Zp(i,u){return u>>>=0,i=Re(i>>>0),(u=dr(u,"emval::as")).toWireType(null,i)}var lr=i=>{try{i()}catch(u){ut(u)}},yt=0,Xe=null,fi=0,cr=[],hi={},gi={},Qp=0,En=null,Yp=[];function yi(i){return function(u){if(!ee){if(yt===0){var c=!1,m=!1;u((g=0)=>{if(!ee&&(fi=g,c=!0,m)){yt=2,lr(()=>Va(Xe)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),g=!1;try{var x=function(){var B=D()[Xe+8>>>2>>>0];return B=U[gi[B]],--mt,B()}()}catch(B){x=B,g=!0}var C=!1;if(!Xe){var z=En;z&&(En=null,(g?z.reject:z.resolve)(x),C=!0)}if(g&&!C)throw x}}),m=!0,c||(yt=1,Xe=function(){var g=yr(65548),x=g+12;R()[g>>>2>>>0]=x,R()[g+4>>>2>>>0]=x+65536,x=cr[0];var C=hi[x];return C===void 0&&(C=Qp++,hi[x]=C,gi[C]=x),x=C,D()[g+8>>>2>>>0]=x,g}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),lr(()=>Ua(Xe)))}else yt===2?(yt=0,lr(Wa),Je(Xe),Xe=null,Yp.forEach(Cn)):ut(`invalid state: ${yt}`);return fi}}(u=>{i().then(u)})}function Xp(i){return i>>>=0,yi(async()=>{var u=await Re(i);return We(u)})}var pr=[];function Jp(i,u,c,m){return c>>>=0,m>>>=0,(i=pr[i>>>0])(null,u=Re(u>>>0),c,m)}var em={},mr=i=>{var u=em[i];return u===void 0?Ye(i):u};function tm(i,u,c,m,g){return c>>>=0,m>>>=0,g>>>=0,(i=pr[i>>>0])(u=Re(u>>>0),u[c=mr(c)],m,g)}var bi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function rm(i){return(i>>>=0)==0?We(bi()):(i=mr(i),We(bi()[i]))}var nm=i=>{var u=pr.length;return pr.push(i),u},om=(i,u)=>{for(var c=Array(i),m=0;m<i;++m)c[m]=dr(R()[u+4*m>>>2>>>0],"parameter "+m);return c},_i=(i,u)=>Object.defineProperty(u,"name",{value:i});function im(i,u,c){var m=(u=om(i,u>>>0)).shift();i--;var g=`return function (obj, func, destructorsRef, args) {
`,x=0,C=[];c===0&&C.push("obj");for(var z=["retType"],B=[m],L=0;L<i;++L)C.push("arg"+L),z.push("argType"+L),B.push(u[L]),g+=`  var arg${L} = argType${L}.readValueFromPointer(args${x?"+"+x:""});
`,x+=u[L].zd;return g+=`  var rv = ${c===1?"new func":"func.call"}(${C.join(", ")});
`,m.Qd||(z.push("emval_returnValue"),B.push(mi),g+=`  return emval_returnValue(retType, destructorsRef, rv);
`),z.push(g+`};
`),i=function(q){var X=Function;if(!(X instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof X} which is not a function`);var de=_i(X.name||"unknownFunctionName",function(){});return de.prototype=X.prototype,de=new de,(q=X.apply(de,q))instanceof Object?q:de}(z)(...B),c=`methodCaller<(${u.map(q=>q.name).join(", ")}) => ${m.name}>`,nm(_i(c,i))}function am(i){return i=mr(i>>>0),We(r[i])}function sm(i,u){return u>>>=0,i=Re(i>>>0),u=Re(u),We(i[u])}function um(i){9<(i>>>=0)&&(lt[i+1]+=1)}function dm(){return We([])}function lm(i){i=Re(i>>>0);for(var u=Array(i.length),c=0;c<i.length;c++)u[c]=i[c];return We(u)}function cm(i){return We(mr(i>>>0))}function pm(){return We({})}function mm(i){for(var u=Re(i>>>=0);u.length;){var c=u.pop();u.pop()(c)}Tn(i)}function fm(i,u,c){u>>>=0,c>>>=0,i=Re(i>>>0),u=Re(u),c=Re(c),i[u]=c}function hm(i,u){return u>>>=0,i=(i=dr(i>>>0,"_emval_take_value")).readValueFromPointer(u),We(i)}function gm(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),D()[u>>>2>>>0]=i.getUTCSeconds(),D()[u+4>>>2>>>0]=i.getUTCMinutes(),D()[u+8>>>2>>>0]=i.getUTCHours(),D()[u+12>>>2>>>0]=i.getUTCDate(),D()[u+16>>>2>>>0]=i.getUTCMonth(),D()[u+20>>>2>>>0]=i.getUTCFullYear()-1900,D()[u+24>>>2>>>0]=i.getUTCDay(),i=(i.getTime()-Date.UTC(i.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[u+28>>>2>>>0]=i}var wi=i=>i%4==0&&(i%100!=0||i%400==0),vi=[0,31,60,91,121,152,182,213,244,274,305,335],$i=[0,31,59,90,120,151,181,212,243,273,304,334];function ym(i,u){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),u>>>=0,i=new Date(1e3*i),D()[u>>>2>>>0]=i.getSeconds(),D()[u+4>>>2>>>0]=i.getMinutes(),D()[u+8>>>2>>>0]=i.getHours(),D()[u+12>>>2>>>0]=i.getDate(),D()[u+16>>>2>>>0]=i.getMonth(),D()[u+20>>>2>>>0]=i.getFullYear()-1900,D()[u+24>>>2>>>0]=i.getDay();var c=(wi(i.getFullYear())?vi:$i)[i.getMonth()]+i.getDate()-1|0;D()[u+28>>>2>>>0]=c,D()[u+36>>>2>>>0]=-60*i.getTimezoneOffset(),c=new Date(i.getFullYear(),6,1).getTimezoneOffset();var m=new Date(i.getFullYear(),0,1).getTimezoneOffset();i=0|(c!=m&&i.getTimezoneOffset()==Math.min(m,c)),D()[u+32>>>2>>>0]=i}function bm(i){i>>>=0;var u=new Date(D()[i+20>>>2>>>0]+1900,D()[i+16>>>2>>>0],D()[i+12>>>2>>>0],D()[i+8>>>2>>>0],D()[i+4>>>2>>>0],D()[i>>>2>>>0],0),c=D()[i+32>>>2>>>0],m=u.getTimezoneOffset(),g=new Date(u.getFullYear(),6,1).getTimezoneOffset(),x=new Date(u.getFullYear(),0,1).getTimezoneOffset(),C=Math.min(x,g);return 0>c?D()[i+32>>>2>>>0]=+(g!=x&&C==m):0<c!=(C==m)&&(g=Math.max(x,g),u.setTime(u.getTime()+6e4*((0<c?C:g)-m))),D()[i+24>>>2>>>0]=u.getDay(),c=(wi(u.getFullYear())?vi:$i)[u.getMonth()]+u.getDate()-1|0,D()[i+28>>>2>>>0]=c,D()[i>>>2>>>0]=u.getSeconds(),D()[i+4>>>2>>>0]=u.getMinutes(),D()[i+8>>>2>>>0]=u.getHours(),D()[i+12>>>2>>>0]=u.getDate(),D()[i+16>>>2>>>0]=u.getMonth(),D()[i+20>>>2>>>0]=u.getYear(),i=u.getTime(),BigInt(isNaN(i)?-1:i/1e3)}function xi(i,u,c,m,g,x,C){return d?Te(16,1,i,u,c,m,g,x,C):-52}function Si(i,u,c,m,g,x){if(d)return Te(17,1,i,u,c,m,g,x)}var qt={},_m=()=>performance.timeOrigin+performance.now();function Ti(i,u){if(d)return Te(18,1,i,u);if(qt[i]&&(clearTimeout(qt[i].id),delete qt[i]),!u)return 0;var c=setTimeout(()=>{delete qt[i],Cn(()=>Wi(i,performance.timeOrigin+performance.now()))},u);return qt[i]={id:c,ke:u},0}function wm(i,u,c,m){i>>>=0,u>>>=0,c>>>=0,m>>>=0;var g=new Date().getFullYear(),x=new Date(g,0,1).getTimezoneOffset();g=new Date(g,6,1).getTimezoneOffset();var C=Math.max(x,g);R()[i>>>2>>>0]=60*C,D()[u>>>2>>>0]=+(x!=g),i=(u=z=>{var B=Math.abs(z);return`UTC${0<=z?"-":"+"}${String(Math.floor(B/60)).padStart(2,"0")}${String(B%60).padStart(2,"0")}`})(x),u=u(g),g<x?(Mt(i,c,17),Mt(u,m,17)):(Mt(i,m,17),Mt(u,c,17))}var vm=()=>Date.now(),$m=1;function xm(i,u,c){if(!(0<=i&&3>=i))return 28;if(i===0)i=Date.now();else{if(!$m)return 52;i=performance.timeOrigin+performance.now()}return W[c>>>0>>>3]=BigInt(Math.round(1e6*i)),0}var Pn=[],Ii=(i,u)=>{Pn.length=0;for(var c;c=me()[i++>>>0];){var m=c!=105;u+=(m&=c!=112)&&u%8?4:0,Pn.push(c==112?R()[u>>>2>>>0]:c==106?W[u>>>3]:c==105?D()[u>>>2>>>0]:fe()[u>>>3>>>0]),u+=m?8:4}return Pn};function Sm(i,u,c){return i>>>=0,u=Ii(u>>>0,c>>>0),hn[i](...u)}function Tm(i,u,c){return i>>>=0,u=Ii(u>>>0,c>>>0),hn[i](...u)}var Im=()=>{};function Cm(i,u){return v(Ae(i>>>0,u>>>0))}var Am=()=>{throw mt+=1,"unwind"};function km(){return 4294901760}var Em=()=>navigator.hardwareConcurrency;function Pm(){return ut("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function zm(i){i>>>=0;var u=me().length;if(i<=u||4294901760<i)return!1;for(var c=1;4>=c;c*=2){var m=u*(1+.2/c);m=Math.min(m,i+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(i,m)/65536))-T.buffer.byteLength+65535)/65536|0;try{T.grow(m),ge();var g=1;break e}catch{}g=void 0}if(g)return!0}return!1}var fr=()=>(ut("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Rt={},Ci=i=>{i.forEach(u=>{var c=fr();c&&(Rt[c]=u)})};function Om(){var i=Error().stack.toString().split(`
`);return i[0]=="Error"&&i.shift(),Ci(i),Rt.Kd=fr(),Rt.ae=i,Rt.Kd}function Dm(i,u,c){if(i>>>=0,u>>>=0,Rt.Kd==i)var m=Rt.ae;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Ci(m);for(var g=3;m[g]&&fr()!=i;)++g;for(i=0;i<c&&m[i+g];++i)D()[u+4*i>>>2>>>0]=fr();return i}var zn,On={},Ai=()=>{if(!zn){var i,u={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(i in On)On[i]===void 0?delete u[i]:u[i]=On[i];var c=[];for(i in u)c.push(`${i}=${u[i]}`);zn=c}return zn};function ki(i,u){if(d)return Te(19,1,i,u);i>>>=0,u>>>=0;var c=0;return Ai().forEach((m,g)=>{var x=u+c;for(g=R()[i+4*g>>>2>>>0]=x,x=0;x<m.length;++x)Z()[g++>>>0]=m.charCodeAt(x);Z()[g>>>0]=0,c+=m.length+1}),0}function Ei(i,u){if(d)return Te(20,1,i,u);i>>>=0,u>>>=0;var c=Ai();R()[i>>>2>>>0]=c.length;var m=0;return c.forEach(g=>m+=g.length+1),R()[u>>>2>>>0]=m,0}function Pi(i){return d?Te(21,1,i):52}function zi(i,u,c,m){return d?Te(22,1,i,u,c,m):52}function Oi(i,u,c,m){return d?Te(23,1,i,u,c,m):70}var Bm=[null,[],[]];function Di(i,u,c,m){if(d)return Te(24,1,i,u,c,m);u>>>=0,c>>>=0,m>>>=0;for(var g=0,x=0;x<c;x++){var C=R()[u>>>2>>>0],z=R()[u+4>>>2>>>0];u+=8;for(var B=0;B<z;B++){var L=me()[C+B>>>0],q=Bm[i];L===0||L===10?((i===1?$:v)(Zo(q)),q.length=0):q.push(L)}g+=z}return R()[m>>>2>>>0]=g,0}function Mm(i){return i>>>0}d||function(){for(var i=r.numThreads-1;i--;)Fo();yn.unshift(()=>{St++,function(u){d?u():Promise.all(ft.map(Ho)).then(u)}(()=>Mo())})}();for(var Bi=Array(256),hr=0;256>hr;++hr)Bi[hr]=String.fromCharCode(hr);li=Bi,ht=r.BindingError=class extends Error{constructor(i){super(i),this.name="BindingError"}},r.InternalError=class extends Error{constructor(i){super(i),this.name="InternalError"}},lt.push(0,1,void 0,1,null,1,!0,1,!1,1),r.count_emval_handles=()=>lt.length/2-5-Sn.length;var U,Rm=[bn,Vo,qo,Qo,Yo,Jo,ei,ti,ri,ni,oi,ii,ai,si,ui,di,xi,Si,Ti,ki,Ei,Pi,zi,Oi,Di];(async function(){function i(m,g){return U=m.exports,U=function(){var x=U,C={};for(let[z,B]of Object.entries(x))C[z]=typeof B=="function"?(...L)=>{cr.push(z);try{return B(...L)}finally{ee||(cr.pop(),Xe&&yt===1&&cr.length===0&&(yt=0,mt+=1,lr(Na),typeof Fibers<"u"&&Fibers.le()))}}:B;return C}(),U=function(){var x=U,C=B=>L=>B(L)>>>0,z=B=>()=>B()>>>0;return(x=Object.assign({},x)).Cb=C(x.Cb),x.fc=z(x.fc),x.ic=C(x.ic),x.vc=C(x.vc),x.wc=z(x.wc),x.Ac=C(x.Ac),x}(),Wo.push(U.jc),I=g,Mo(),U}St++;var u=Ro();if(r.instantiateWasm)return new Promise(m=>{r.instantiateWasm(u,(g,x)=>{i(g,x),m(g.exports)})});if(d)return new Promise(m=>{Fe=g=>{var x=new WebAssembly.Instance(g,Ro());m(i(x,g))}});xt??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",b):b+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var c=await async function(m){var g=xt;if(!Q&&typeof WebAssembly.instantiateStreaming=="function"&&!se(g))try{var x=fetch(g,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(x,m)}catch(C){v(`wasm streaming compile failed: ${C}`),v("falling back to ArrayBuffer instantiation")}return async function(C,z){try{var B=await async function(L){if(!Q)try{var q=await f(L);return new Uint8Array(q)}catch{}if(L==xt&&Q)L=new Uint8Array(Q);else{if(!h)throw"both async and sync fetching of the wasm failed";L=h(L)}return L}(C);return await WebAssembly.instantiate(B,z)}catch(L){v(`failed to asynchronously prepare wasm: ${L}`),ut(L)}}(g,m)}(u);return i(c.instance,c.module)}catch(m){return n(m),Promise.reject(m)}})();var Mi=i=>(Mi=U.Cb)(i),Ri=()=>(Ri=U.Db)();r._OrtInit=(i,u)=>(r._OrtInit=U.Eb)(i,u),r._OrtGetLastError=(i,u)=>(r._OrtGetLastError=U.Fb)(i,u),r._OrtCreateSessionOptions=(i,u,c,m,g,x,C,z,B,L)=>(r._OrtCreateSessionOptions=U.Gb)(i,u,c,m,g,x,C,z,B,L),r._OrtAppendExecutionProvider=(i,u)=>(r._OrtAppendExecutionProvider=U.Hb)(i,u),r._OrtAddFreeDimensionOverride=(i,u,c)=>(r._OrtAddFreeDimensionOverride=U.Ib)(i,u,c),r._OrtAddSessionConfigEntry=(i,u,c)=>(r._OrtAddSessionConfigEntry=U.Jb)(i,u,c),r._OrtReleaseSessionOptions=i=>(r._OrtReleaseSessionOptions=U.Kb)(i),r._OrtCreateSession=(i,u,c)=>(r._OrtCreateSession=U.Lb)(i,u,c),r._OrtReleaseSession=i=>(r._OrtReleaseSession=U.Mb)(i),r._OrtGetInputOutputCount=(i,u,c)=>(r._OrtGetInputOutputCount=U.Nb)(i,u,c),r._OrtGetInputName=(i,u)=>(r._OrtGetInputName=U.Ob)(i,u),r._OrtGetOutputName=(i,u)=>(r._OrtGetOutputName=U.Pb)(i,u),r._OrtFree=i=>(r._OrtFree=U.Qb)(i),r._OrtCreateTensor=(i,u,c,m,g,x)=>(r._OrtCreateTensor=U.Rb)(i,u,c,m,g,x),r._OrtGetTensorData=(i,u,c,m,g)=>(r._OrtGetTensorData=U.Sb)(i,u,c,m,g),r._OrtReleaseTensor=i=>(r._OrtReleaseTensor=U.Tb)(i),r._OrtCreateRunOptions=(i,u,c,m)=>(r._OrtCreateRunOptions=U.Ub)(i,u,c,m),r._OrtAddRunConfigEntry=(i,u,c)=>(r._OrtAddRunConfigEntry=U.Vb)(i,u,c),r._OrtReleaseRunOptions=i=>(r._OrtReleaseRunOptions=U.Wb)(i),r._OrtCreateBinding=i=>(r._OrtCreateBinding=U.Xb)(i),r._OrtBindInput=(i,u,c)=>(r._OrtBindInput=U.Yb)(i,u,c),r._OrtBindOutput=(i,u,c,m)=>(r._OrtBindOutput=U.Zb)(i,u,c,m),r._OrtClearBoundOutputs=i=>(r._OrtClearBoundOutputs=U._b)(i),r._OrtReleaseBinding=i=>(r._OrtReleaseBinding=U.$b)(i),r._OrtRunWithBinding=(i,u,c,m,g)=>(r._OrtRunWithBinding=U.ac)(i,u,c,m,g),r._OrtRun=(i,u,c,m,g,x,C,z)=>(r._OrtRun=U.bc)(i,u,c,m,g,x,C,z),r._OrtEndProfiling=i=>(r._OrtEndProfiling=U.cc)(i),r._JsepOutput=(i,u,c)=>(r._JsepOutput=U.dc)(i,u,c),r._JsepGetNodeName=i=>(r._JsepGetNodeName=U.ec)(i);var gr=()=>(gr=U.fc)(),Je=r._free=i=>(Je=r._free=U.gc)(i),yr=r._malloc=i=>(yr=r._malloc=U.ic)(i),Dn=(i,u,c,m,g,x)=>(Dn=U.kc)(i,u,c,m,g,x),Ui=()=>(Ui=U.lc)(),Ni=(i,u,c,m,g)=>(Ni=U.mc)(i,u,c,m,g),Vi=i=>(Vi=U.nc)(i),Bn=i=>(Bn=U.oc)(i),Wi=(i,u)=>(Wi=U.pc)(i,u),Li=()=>(Li=U.qc)(),ue=(i,u)=>(ue=U.rc)(i,u),Kt=i=>(Kt=U.sc)(i),Gi=(i,u)=>(Gi=U.tc)(i,u),oe=i=>(oe=U.uc)(i),Mn=i=>(Mn=U.vc)(i),ie=()=>(ie=U.wc)(),Hi=i=>(Hi=U.xc)(i),Fi=i=>(Fi=U.yc)(i),qi=(i,u,c)=>(qi=U.zc)(i,u,c),Ki=i=>(Ki=U.Ac)(i),ji=r.dynCall_iii=(i,u,c)=>(ji=r.dynCall_iii=U.Bc)(i,u,c),Zi=r.dynCall_vi=(i,u)=>(Zi=r.dynCall_vi=U.Cc)(i,u),Rn=r.dynCall_ii=(i,u)=>(Rn=r.dynCall_ii=U.Dc)(i,u),Qi=r.dynCall_vii=(i,u,c)=>(Qi=r.dynCall_vii=U.Ec)(i,u,c),Yi=r.dynCall_iiii=(i,u,c,m)=>(Yi=r.dynCall_iiii=U.Fc)(i,u,c,m),Xi=r.dynCall_viii=(i,u,c,m)=>(Xi=r.dynCall_viii=U.Gc)(i,u,c,m),Ji=r.dynCall_iiiii=(i,u,c,m,g)=>(Ji=r.dynCall_iiiii=U.Hc)(i,u,c,m,g),ea=r.dynCall_viiii=(i,u,c,m,g)=>(ea=r.dynCall_viiii=U.Ic)(i,u,c,m,g),ta=r.dynCall_viiiiii=(i,u,c,m,g,x,C)=>(ta=r.dynCall_viiiiii=U.Jc)(i,u,c,m,g,x,C),ra=r.dynCall_viiiiiii=(i,u,c,m,g,x,C,z)=>(ra=r.dynCall_viiiiiii=U.Kc)(i,u,c,m,g,x,C,z),na=r.dynCall_ji=(i,u)=>(na=r.dynCall_ji=U.Lc)(i,u),oa=r.dynCall_v=i=>(oa=r.dynCall_v=U.Mc)(i),ia=r.dynCall_viiiii=(i,u,c,m,g,x)=>(ia=r.dynCall_viiiii=U.Nc)(i,u,c,m,g,x),aa=r.dynCall_i=i=>(aa=r.dynCall_i=U.Oc)(i),sa=r.dynCall_fii=(i,u,c)=>(sa=r.dynCall_fii=U.Pc)(i,u,c),ua=r.dynCall_viiiiiiii=(i,u,c,m,g,x,C,z,B)=>(ua=r.dynCall_viiiiiiii=U.Qc)(i,u,c,m,g,x,C,z,B),da=r.dynCall_viiiiiiiiii=(i,u,c,m,g,x,C,z,B,L,q)=>(da=r.dynCall_viiiiiiiiii=U.Rc)(i,u,c,m,g,x,C,z,B,L,q),la=r.dynCall_jiii=(i,u,c,m)=>(la=r.dynCall_jiii=U.Sc)(i,u,c,m),ca=r.dynCall_dii=(i,u,c)=>(ca=r.dynCall_dii=U.Tc)(i,u,c),pa=r.dynCall_viiiiiiiii=(i,u,c,m,g,x,C,z,B,L)=>(pa=r.dynCall_viiiiiiiii=U.Uc)(i,u,c,m,g,x,C,z,B,L),ma=r.dynCall_viiiiiiiiiii=(i,u,c,m,g,x,C,z,B,L,q,X)=>(ma=r.dynCall_viiiiiiiiiii=U.Vc)(i,u,c,m,g,x,C,z,B,L,q,X),fa=r.dynCall_iiiiii=(i,u,c,m,g,x)=>(fa=r.dynCall_iiiiii=U.Wc)(i,u,c,m,g,x),ha=r.dynCall_iij=(i,u,c)=>(ha=r.dynCall_iij=U.Xc)(i,u,c),ga=r.dynCall_iiiiiiiiii=(i,u,c,m,g,x,C,z,B,L)=>(ga=r.dynCall_iiiiiiiiii=U.Yc)(i,u,c,m,g,x,C,z,B,L),ya=r.dynCall_iiiiiiiiiii=(i,u,c,m,g,x,C,z,B,L,q)=>(ya=r.dynCall_iiiiiiiiiii=U.Zc)(i,u,c,m,g,x,C,z,B,L,q),ba=r.dynCall_vij=(i,u,c)=>(ba=r.dynCall_vij=U._c)(i,u,c),_a=r.dynCall_iiif=(i,u,c,m)=>(_a=r.dynCall_iiif=U.$c)(i,u,c,m),wa=r.dynCall_iiij=(i,u,c,m)=>(wa=r.dynCall_iiij=U.ad)(i,u,c,m),va=r.dynCall_fiii=(i,u,c,m)=>(va=r.dynCall_fiii=U.bd)(i,u,c,m),$a=r.dynCall_viiiiiiiiiiiii=(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)=>($a=r.dynCall_viiiiiiiiiiiii=U.cd)(i,u,c,m,g,x,C,z,B,L,q,X,de,$e),xa=r.dynCall_vjiii=(i,u,c,m,g)=>(xa=r.dynCall_vjiii=U.dd)(i,u,c,m,g),Sa=r.dynCall_vif=(i,u,c)=>(Sa=r.dynCall_vif=U.ed)(i,u,c),Ta=r.dynCall_iiiiiii=(i,u,c,m,g,x,C)=>(Ta=r.dynCall_iiiiiii=U.fd)(i,u,c,m,g,x,C),Ia=r.dynCall_iiiij=(i,u,c,m,g)=>(Ia=r.dynCall_iiiij=U.gd)(i,u,c,m,g),Ca=r.dynCall_iiiiiiii=(i,u,c,m,g,x,C,z)=>(Ca=r.dynCall_iiiiiiii=U.hd)(i,u,c,m,g,x,C,z),Aa=r.dynCall_viiiiiiiiiiii=(i,u,c,m,g,x,C,z,B,L,q,X,de)=>(Aa=r.dynCall_viiiiiiiiiiii=U.id)(i,u,c,m,g,x,C,z,B,L,q,X,de),ka=r.dynCall_diii=(i,u,c,m)=>(ka=r.dynCall_diii=U.jd)(i,u,c,m),Ea=r.dynCall_jiiii=(i,u,c,m,g)=>(Ea=r.dynCall_jiiii=U.kd)(i,u,c,m,g),Pa=r.dynCall_viiij=(i,u,c,m,g)=>(Pa=r.dynCall_viiij=U.ld)(i,u,c,m,g),za=r.dynCall_fiiii=(i,u,c,m,g)=>(za=r.dynCall_fiiii=U.md)(i,u,c,m,g),Oa=r.dynCall_viiif=(i,u,c,m,g)=>(Oa=r.dynCall_viiif=U.nd)(i,u,c,m,g),Da=r.dynCall_diiii=(i,u,c,m,g)=>(Da=r.dynCall_diiii=U.od)(i,u,c,m,g),Ba=r.dynCall_viiid=(i,u,c,m,g)=>(Ba=r.dynCall_viiid=U.pd)(i,u,c,m,g),Ma=r.dynCall_iiiijii=(i,u,c,m,g,x,C)=>(Ma=r.dynCall_iiiijii=U.qd)(i,u,c,m,g,x,C),Ra=r.dynCall_iiiiiij=(i,u,c,m,g,x,C)=>(Ra=r.dynCall_iiiiiij=U.rd)(i,u,c,m,g,x,C),Ua=i=>(Ua=U.sd)(i),Na=()=>(Na=U.td)(),Va=i=>(Va=U.ud)(i),Wa=()=>(Wa=U.vd)();function Um(i,u,c){var m=ie();try{Qi(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;ue(1,0)}}function Nm(i,u,c){var m=ie();try{return ji(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;ue(1,0)}}function Vm(i,u){var c=ie();try{Zi(i,u)}catch(m){if(oe(c),m!==m+0)throw m;ue(1,0)}}function Wm(i,u){var c=ie();try{return Rn(i,u)}catch(m){if(oe(c),m!==m+0)throw m;ue(1,0)}}function Lm(i,u,c,m){var g=ie();try{return Yi(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;ue(1,0)}}function Gm(i,u,c,m,g){var x=ie();try{ea(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function Hm(i,u,c,m,g){var x=ie();try{return Ji(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function Fm(i,u,c,m){var g=ie();try{Xi(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;ue(1,0)}}function qm(i,u,c,m,g,x,C){var z=ie();try{return Ta(i,u,c,m,g,x,C)}catch(B){if(oe(z),B!==B+0)throw B;ue(1,0)}}function Km(i){var u=ie();try{oa(i)}catch(c){if(oe(u),c!==c+0)throw c;ue(1,0)}}function jm(i,u,c){var m=ie();try{return ha(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;ue(1,0)}}function Zm(i,u,c,m,g,x){var C=ie();try{ia(i,u,c,m,g,x)}catch(z){if(oe(C),z!==z+0)throw z;ue(1,0)}}function Qm(i,u,c){var m=ie();try{ba(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;ue(1,0)}}function Ym(i,u,c,m,g,x,C){var z=ie();try{ta(i,u,c,m,g,x,C)}catch(B){if(oe(z),B!==B+0)throw B;ue(1,0)}}function Xm(i,u,c,m,g,x,C,z){var B=ie();try{ra(i,u,c,m,g,x,C,z)}catch(L){if(oe(B),L!==L+0)throw L;ue(1,0)}}function Jm(i,u,c,m,g,x){var C=ie();try{return fa(i,u,c,m,g,x)}catch(z){if(oe(C),z!==z+0)throw z;ue(1,0)}}function ef(i,u,c,m,g,x,C,z){var B=ie();try{return Ca(i,u,c,m,g,x,C,z)}catch(L){if(oe(B),L!==L+0)throw L;ue(1,0)}}function tf(i,u,c,m,g,x,C,z,B,L){var q=ie();try{pa(i,u,c,m,g,x,C,z,B,L)}catch(X){if(oe(q),X!==X+0)throw X;ue(1,0)}}function rf(i,u,c,m,g,x,C,z,B){var L=ie();try{ua(i,u,c,m,g,x,C,z,B)}catch(q){if(oe(L),q!==q+0)throw q;ue(1,0)}}function nf(i){var u=ie();try{return aa(i)}catch(c){if(oe(u),c!==c+0)throw c;ue(1,0)}}function of(i,u,c,m,g,x,C,z,B,L){var q=ie();try{return ga(i,u,c,m,g,x,C,z,B,L)}catch(X){if(oe(q),X!==X+0)throw X;ue(1,0)}}function af(i,u,c){var m=ie();try{return sa(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;ue(1,0)}}function sf(i,u,c,m){var g=ie();try{return la(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;return ue(1,0),0n}}function uf(i,u,c){var m=ie();try{return ca(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;ue(1,0)}}function df(i,u,c,m,g,x,C,z,B,L,q,X){var de=ie();try{ma(i,u,c,m,g,x,C,z,B,L,q,X)}catch($e){if(oe(de),$e!==$e+0)throw $e;ue(1,0)}}function lf(i,u,c,m,g,x,C,z,B,L,q){var X=ie();try{da(i,u,c,m,g,x,C,z,B,L,q)}catch(de){if(oe(X),de!==de+0)throw de;ue(1,0)}}function cf(i,u,c,m,g,x,C,z,B,L,q){var X=ie();try{return ya(i,u,c,m,g,x,C,z,B,L,q)}catch(de){if(oe(X),de!==de+0)throw de;ue(1,0)}}function pf(i,u,c,m){var g=ie();try{return _a(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;ue(1,0)}}function mf(i,u,c,m){var g=ie();try{return wa(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;ue(1,0)}}function ff(i,u,c,m){var g=ie();try{return va(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;ue(1,0)}}function hf(i,u,c,m,g,x,C,z,B,L,q,X,de,$e){var Le=ie();try{$a(i,u,c,m,g,x,C,z,B,L,q,X,de,$e)}catch(jt){if(oe(Le),jt!==jt+0)throw jt;ue(1,0)}}function gf(i,u,c,m,g){var x=ie();try{xa(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function yf(i,u,c){var m=ie();try{Sa(i,u,c)}catch(g){if(oe(m),g!==g+0)throw g;ue(1,0)}}function bf(i,u){var c=ie();try{return na(i,u)}catch(m){if(oe(c),m!==m+0)throw m;return ue(1,0),0n}}function _f(i,u,c,m,g){var x=ie();try{return Ia(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function wf(i,u,c,m,g,x,C,z,B,L,q,X,de){var $e=ie();try{Aa(i,u,c,m,g,x,C,z,B,L,q,X,de)}catch(Le){if(oe($e),Le!==Le+0)throw Le;ue(1,0)}}function vf(i,u,c,m){var g=ie();try{return ka(i,u,c,m)}catch(x){if(oe(g),x!==x+0)throw x;ue(1,0)}}function $f(i,u,c,m,g){var x=ie();try{return Ea(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;return ue(1,0),0n}}function xf(i,u,c,m,g){var x=ie();try{Pa(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function Sf(i,u,c,m,g){var x=ie();try{return za(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function Tf(i,u,c,m,g){var x=ie();try{Oa(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function If(i,u,c,m,g){var x=ie();try{return Da(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function Cf(i,u,c,m,g){var x=ie();try{Ba(i,u,c,m,g)}catch(C){if(oe(x),C!==C+0)throw C;ue(1,0)}}function Af(i,u,c,m,g,x,C){var z=ie();try{return Ma(i,u,c,m,g,x,C)}catch(B){if(oe(z),B!==B+0)throw B;ue(1,0)}}function kf(i,u,c,m,g,x,C){var z=ie();try{return Ra(i,u,c,m,g,x,C)}catch(B){if(oe(z),B!==B+0)throw B;ue(1,0)}}return r.stackSave=()=>ie(),r.stackRestore=i=>oe(i),r.stackAlloc=i=>Mn(i),r.setValue=function(i,u,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":Z()[i>>>0]=u;break;case"i16":ke()[i>>>1>>>0]=u;break;case"i32":D()[i>>>2>>>0]=u;break;case"i64":W[i>>>3]=BigInt(u);break;case"float":Y()[i>>>2>>>0]=u;break;case"double":fe()[i>>>3>>>0]=u;break;case"*":R()[i>>>2>>>0]=u;break;default:ut(`invalid type for setValue: ${c}`)}},r.getValue=function(i,u="i8"){switch(u.endsWith("*")&&(u="*"),u){case"i1":case"i8":return Z()[i>>>0];case"i16":return ke()[i>>>1>>>0];case"i32":return D()[i>>>2>>>0];case"i64":return W[i>>>3];case"float":return Y()[i>>>2>>>0];case"double":return fe()[i>>>3>>>0];case"*":return R()[i>>>2>>>0];default:ut(`invalid type for getValue: ${u}`)}},r.UTF8ToString=Ae,r.stringToUTF8=Mt,r.lengthBytesUTF8=Xo,function i(){if(0<St)Ht=i;else if(d)t(r),st();else{for(;0<yn.length;)yn.shift()(r);0<St?Ht=i:(r.calledRun=!0,ee||(st(),t(r)))}}(),r.PTR_SIZE=4,o}),Rf=vs,Uf=globalThis.self?.name?.startsWith("em-pthread");Uf&&vs()});var Is,Nf,Ve,Cs,jn,Vf,Wf,As,Lf,Ss,ks,Ts,Es,Sr=G(()=>{"use strict";xr();Is=typeof location>"u"?void 0:location.origin,Nf=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.webgpu.bundle.min.mjs",import.meta.url).href,Is).href:import.meta.url},Ve=Nf(),Cs=()=>{if(Ve&&!Ve.startsWith("blob:"))return Ve.substring(0,Ve.lastIndexOf("/")+1)},jn=(e,t)=>{try{let n=t??Ve;return(n?new URL(e,n):new URL(e)).origin===Is}catch{return!1}},Vf=(e,t)=>{let n=t??Ve;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Wf=(e,t)=>`${t??"./"}${e}`,As=async e=>{let n=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Lf=async e=>(await import(/*webpackIgnore:true*/e)).default,Ss=(ws(),br(_s)).default,ks=async()=>{if(!Ve)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(jn(Ve))return[void 0,Ss()];let e=await As(Ve);return[e,Ss(e)]},Ts=(xs(),br($s)).default,Es=async(e,t,n)=>{if(!e&&!t&&Ts&&Ve&&jn(Ve))return[void 0,Ts];{let r="ort-wasm-simd-threaded.jsep.mjs",o=e??Vf(r,t),a=!!1&&n&&o&&!jn(o,t),s=a?await As(o):o??Wf(r,t);return[a?s:void 0,await Lf(s)]}}});var Zn,Qn,Or,Ps,Gf,Hf,Tr,Ce,bt=G(()=>{"use strict";Sr();Qn=!1,Or=!1,Ps=!1,Gf=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Hf=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Tr=async e=>{if(Qn)return Promise.resolve();if(Or)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ps)throw new Error("previous call to 'initializeWebAssembly()' failed.");Or=!0;let t=e.initTimeout,n=e.numThreads;if(!Hf())throw new Error("WebAssembly SIMD is not supported in the current environment.");let r=Gf();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,a=typeof o=="string"?o:void 0,s=o?.mjs,d=s?.href??s,l=o?.wasm,p=l?.href??l,f=e.wasmBinary,[h,y]=await Es(d,a,n>1),_=!1,b=[];if(t>0&&b.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},t)})),b.push(new Promise((w,S)=>{let $={numThreads:n};if(f)$.wasmBinary=f;else if(p||a)$.locateFile=v=>p??a+v;else if(d&&d.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,d).href;else if(h){let v=Cs();v&&($.locateFile=T=>v+T)}y($).then(v=>{Or=!1,Qn=!0,Zn=v,w(),h&&URL.revokeObjectURL(h)},v=>{Or=!1,Ps=!0,S(v)})})),await Promise.race(b),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ce=()=>{if(Qn&&Zn)return Zn;throw new Error("WebAssembly is not initialized yet.")}});var Pe,Xt,he,Dr=G(()=>{"use strict";bt();Pe=(e,t)=>{let n=Ce(),r=n.lengthBytesUTF8(e)+1,o=n._malloc(r);return n.stringToUTF8(e,o,r),t.push(o),o},Xt=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([o,a])=>{let s=t?t+o:o;if(typeof a=="object")Xt(a,s+".",n,r);else if(typeof a=="string"||typeof a=="number")r(s,a.toString());else if(typeof a=="boolean")r(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},he=e=>{let t=Ce(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetLastError(o,o+r);let a=Number(t.getValue(o,r===4?"i32":"i64")),s=t.getValue(o+r,"*"),d=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${d}`)}finally{t.stackRestore(n)}}});var zs,Os=G(()=>{"use strict";bt();Dr();zs=e=>{let t=Ce(),n=0,r=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Pe(e.tag,r)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),n===0&&he("Can't create run options."),e?.extra!==void 0&&Xt(e.extra,"",new WeakSet,(s,d)=>{let l=Pe(s,r),p=Pe(d,r);t._OrtAddRunConfigEntry(n,l,p)!==0&&he(`Can't set a run config entry: ${s} - ${d}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),a}}});var Ff,qf,Kf,jf,Ds,Bs=G(()=>{"use strict";bt();Dr();Ff=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},qf=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Kf=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},jf=(e,t,n)=>{for(let r of t){let o=typeof r=="string"?r:r.name;switch(o){case"webnn":if(o="WEBNN",typeof r!="string"){let d=r?.deviceType;if(d){let l=Pe("deviceType",n),p=Pe(d,n);Ce()._OrtAddSessionConfigEntry(e,l,p)!==0&&he(`Can't set a session config entry: 'deviceType' - ${d}.`)}}break;case"webgpu":if(o="JS",typeof r!="string"){let s=r;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let d=Pe("preferredLayout",n),l=Pe(s.preferredLayout,n);Ce()._OrtAddSessionConfigEntry(e,d,l)!==0&&he(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let a=Pe(o,n);Ce()._OrtAppendExecutionProvider(e,a)!==0&&he(`Can't append execution provider: ${o}.`)}},Ds=e=>{let t=Ce(),n=0,r=[],o=e||{};Kf(o);try{let a=Ff(o.graphOptimizationLevel??"all"),s=qf(o.executionMode??"sequential"),d=typeof o.logId=="string"?Pe(o.logId,r):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let p=o.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let f=typeof o.optimizedModelFilePath=="string"?Pe(o.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(a,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,d,l,p,f),n===0&&he("Can't create session options."),o.executionProviders&&jf(n,o.executionProviders,r),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let h=Pe("enableGraphCapture",r),y=Pe(o.enableGraphCapture.toString(),r);t._OrtAddSessionConfigEntry(n,h,y)!==0&&he(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[h,y]of Object.entries(o.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof y!="number"||!Number.isInteger(y)||y<0)throw new Error(`free dimension override value must be a non-negative integer: ${y}`);let _=Pe(h,r);t._OrtAddFreeDimensionOverride(n,_,y)!==0&&he(`Can't set a free dimension override: ${h} - ${y}.`)}return o.extra!==void 0&&Xt(o.extra,"",new WeakSet,(h,y)=>{let _=Pe(h,r),b=Pe(y,r);t._OrtAddSessionConfigEntry(n,_,b)!==0&&he(`Can't set a session config entry: ${h} - ${y}.`)}),[n,r]}catch(a){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&he("Can't release session options."),r.forEach(s=>t._free(s)),a}}});var Ut,_t,wt,Br,Jt,Mr,Rr,Yn,te=G(()=>{"use strict";Ut=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},_t=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},wt=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((o,a)=>o*a,1);return n>0?Math.ceil(r*n):void 0},Br=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Jt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Mr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Rr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Yn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var er,Xn=G(()=>{"use strict";xr();er=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Nn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=Nn("node:fs"),r=n(e),o=[];for await(let a of r)o.push(a);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),a;try{a=new ArrayBuffer(r)}catch(d){if(d instanceof RangeError){let l=Math.ceil(r/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw d}let s=0;for(;;){let{done:d,value:l}=await o.read();if(d)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Zf,Qf,Ms,Rs,Ur,Yf,pe,et=G(()=>{"use strict";te();Zf=["V","I","W","E","F"],Qf=(e,t)=>{console.log(`[${Zf[e]},${new Date().toISOString()}]${t}`)},Ur=(e,t)=>{Ms=e,Rs=t},Yf=(e,t)=>{let n=Jt(e),r=Jt(Ms);n>=r&&Qf(n,typeof t=="function"?t():t)},pe=(...e)=>{Rs&&Yf(...e)}});var Nr,Jn=G(()=>{"use strict";te();Nr=(e,t)=>new(Br(t))(e)});var Vr=G(()=>{"use strict"});var Us,eo,to,Xf,Jf,Ns,no,ro,Ws,Ls=G(()=>{"use strict";et();Vr();Us=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),eo=[],to=e=>Math.ceil(Number(e)/16)*16,Xf=e=>{for(let t=0;t<eo.length;t++){let n=eo[t];if(e<=n)return n}return Math.ceil(e/16)*16},Jf=1,Ns=()=>Jf++,no=async(e,t,n,r)=>{let o=to(n),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let d=a.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(d,0,n)),l}else return new Uint8Array(d.slice(0,n))}finally{a.destroy()}},ro=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of Us)eo.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(t,n){let r=n.buffer,o=n.byteOffset,a=n.byteLength,s=to(a),d=this.storageCache.get(t);if(!d)throw new Error("gpu data for uploading does not exist");if(Number(d.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${d.originalSize}, data size=${a}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=l.getMappedRange();new Uint8Array(p).set(new Uint8Array(r,o,a)),l.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(l,0,d.gpuData.buffer,0,s),this.backend.device.queue.submit([f.finish()]),l.destroy(),pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=to(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,a)}registerExternalBuffer(t,n,r){let o;if(r){if(o=r[0],t===r[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ns();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:n}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Xf(t),o,a=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let p=(a?this.freeBuffers:this.freeUniformBuffers).get(r);p?p.length>0?o=p.pop():o=this.backend.device.createBuffer({size:r,usage:n}):o=this.backend.device.createBuffer({size:r,usage:n})}else o=this.backend.device.createBuffer({size:r,usage:n});let d={id:Ns(),type:0,buffer:o};return this.storageCache.set(d.id,{gpuData:d,originalSize:Number(t)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${d.id}`),d}get(t){return this.storageCache.get(t)?.gpuData}release(t){let n=typeof t=="bigint"?Number(t):t,r=this.storageCache.get(n);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,n){let r=this.storageCache.get(Number(t));if(!r)throw new Error("data does not exist");await no(this.backend,r.gpuData.buffer,r.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let n=Us.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let n of this.buffersPending)t.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let n=this.capturedPendingBuffers.get(t);n&&(n.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Ws=(...e)=>new ro(...e)});var oo,re,Ie=G(()=>{"use strict";oo=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},re=e=>new oo(e)});var io,tt,E,Et,Wr,Gs,Hs,ae=G(()=>{"use strict";io=class{static calcMatMulShape(t,n){return t[1]!==n[0]?void 0:[t[0],n[1]]}},tt=class{static calcShape(t,n,r=!1){let o=t.length,a=n.length;if(o===0)return n;if(a===0)return t;let s=Math.max(t.length,n.length),d=new Array(s);if(r){if(o<2||a<2)return;let l=io.calcMatMulShape([t[o-2],t[o-1]],[n[a-2],n[a-1]]);if(l===void 0)return;[d[s-2],d[s-1]]=l}for(let l=r?3:1;l<=s;l++){let p=o-l<0?1:t[o-l],f=a-l<0?1:n[a-l];if(p!==f&&p>1&&f>1)return;let h=Math.max(p,f);if(p&&f)d[s-l]=Math.max(p,f);else{if(h>1)return;d[s-l]=0}}return d}static isValidBroadcast(t,n){let r=t.length,o=n.length;if(r>o)return!1;for(let a=1;a<=r;a++)if(t[r-a]!==1&&t[r-a]!==n[o-a])return!1;return!0}},E=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let o=new Array(r),a=r-1;for(;a>=0;){if(t[a]%n===0){o[a]=t[a]/n;break}if(n%t[a]!==0)throw new Error("cannot convert shape");o[a]=1,n/=t[a],a--}for(a--;a>=0;a--)o[a]=t[a];return o}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let o=1;for(let a=n;a<r;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[a])}return o}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let o=n-3;o>=0;--o)r[o]=r[o+1]*t[o+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((o,a)=>o+n[a]+n[a+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,o)=>r===n[o])}},Et=class e{static adjustPoolAttributes(t,n,r,o,a,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let d=0;d<n.length-2;d++)d>=r.length?r.push(n[d+2]):r[d]=n[d+2];for(let d=0;d<r.length;d++)if(d<o.length){if(o[d]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let d=0;d<r.length;d++)if(d<a.length){if(a[d]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let d=0;d<r.length*2;d++)if(d<s.length){if(s[d]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let d=0;d<r.length;d++){if(r[d]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[d]>=r[d]||s[d+r.length]>=r[d])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,o,a,s,d){if(d){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)e.adjustPadAndReturnShape(t[l+(s?1:2)],n[l],r[l],o[l],a,l,l+t.length-2,d)}}static computePoolOutputShape(t,n,r,o,a,s,d){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let l=[n[0],n[1]];return e.computeShapeHelper(t,n,l,r,o,a,s,d),l}static computeConvOutputShape(t,n,r,o,a,s,d){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],n[0]];return e.computeShapeHelper(!1,t,l,r,o,a,s,d),l}static computeShapeHelper(t,n,r,o,a,s,d,l){if(t)for(let p=0;p<n.length-2;p++)r.push(1);else for(let p=0;p<n.length-2;p++)r.push(e.adjustPadAndReturnShape(n[p+2],o[p],a[p],s[p],d,p,p+n.length-2,l))}static adjustPadAndReturnShape(t,n,r,o,a,s,d,l){let p=r*(o-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[d]=0,Math.floor((t-p)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+n-1)/n-1)*n+o-t;return a[s]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),a[d]=h-a[s],Math.floor((t+h-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[d]-p)/n+1)}},Wr=class{static getShapeOfGemmResult(t,n,r,o,a){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,d,l;n?(s=t[1],d=t[0]):(s=t[0],d=t[1]);let p=-1;if(o?(l=r[0],p=1):(l=r[1],p=0),r[p]!==d)throw new Error("dimension mismatch");if(s<=0||l<=0||d<=0)throw new Error("invalid shape specified");if(a&&!tt.isValidBroadcast(a,[s,l]))throw new Error("gemm: invalid bias shape for broadcast");return[s,l,d]}},Gs=-34028234663852886e22,Hs=34028234663852886e22});var Pt,so,_e,ze,H,ye,uo,zt,Ke,K,Lr,P,N,Fs,Gr,ao,qs,ce=G(()=>{"use strict";te();ae();Pt=64,so=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},_e=(e,t=1)=>{let n=so(e,t);return typeof n=="string"?n:n[0]},ze=(e,t=1)=>{let n=so(e,t);return typeof n=="string"?n:n[1]},H=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:E.computeStrides(n)})}),t},ye=e=>e%4===0?4:e%2===0?2:1,uo=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,zt=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,Ke=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Lr=(e,t,n,r,o)=>{let a=typeof n=="number",s=a?n:n.length,d=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=so(t,o),f=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],y={indices:l,value:f,storage:h,tensor:t},_=R=>typeof R=="string"?R:`${R}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=a?"uniforms.":"",S=`${w}${e}_shape`,$=`${w}${e}_strides`,v="";for(let R=0;R<s-1;R++)v+=`
    let dim${R} = current / ${K($,R,s)};
    let rest${R} = current % ${K($,R,s)};
    indices[${R}] = dim${R};
    current = rest${R};
    `;v+=`indices[${s-1}] = current;`;let T=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${y.indices} {
    var indices: ${y.indices};
    var current = offset;
    ${v}
    return indices;
  }`,I=R=>(b.offsetToIndices=!0,s<2?R:`o2i_${e}(${R})`),A=[];if(s>=2)for(let R=s-1;R>=0;R--)A.push(`${K($,R,s)} * (indices[${R}])`);let k=s<2?"":`
  fn i2o_${e}(indices: ${y.indices}) -> u32 {
    return ${A.join("+")};
  }`,O=R=>(b.indicesToOffset=!0,s<2?R:`i2o_${e}(${R})`),M=(...R)=>s===0?"0u":`${y.indices}(${R.map(_).join(",")})`,V=(R,Y)=>s<2?`${R}`:`${K(R,Y,s)}`,F=(R,Y,fe)=>s<2?`${R}=${fe};`:`${K(R,Y,s)}=${fe};`,j={},ne=(R,Y)=>{b.broadcastedIndicesToOffset=!0;let fe=`${Y.name}broadcastedIndicesTo${e}Offset`;if(fe in j)return`${fe}(${R})`;let Fe=[];for(let xe=s-1;xe>=0;xe--){let ge=Y.indicesGet("outputIndices",xe+Y.rank-s);Fe.push(`${V($,xe)} * (${ge} % ${V(S,xe)})`)}return j[fe]=`fn ${fe}(outputIndices: ${Y.type.indices}) -> u32 {
             return ${Fe.length>0?Fe.join("+"):"0u"};
           }`,`${fe}(${R})`},W=(R,Y)=>(()=>{if(y.storage===y.value)return`${e}[${R}]=${Y};`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`${e}[${R}]=vec2<u32>(u32(${Y}), select(0u, 0xFFFFFFFFu, ${Y} < 0));`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`${e}[${R}]=vec2<u32>(u32(${Y}), 0u);`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`${e}[${R}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${Y}));`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),J=R=>(()=>{if(y.storage===y.value)return`${e}[${R}]`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`i32(${e}[${R}].x)`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`u32(${e}[${R}].x)`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${R}] & 0xFFu), bool(${e}[${R}] & 0xFF00u), bool(${e}[${R}] & 0xFF0000u), bool(${e}[${R}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),ve=s<2?"":`
  fn get_${e}ByIndices(indices: ${y.indices}) -> ${f} {
    return ${J(`i2o_${e}(indices)`)};
  }`,Q=s<2?"":(()=>{let R=d.map(fe=>`d${fe}: u32`).join(", "),Y=d.map(fe=>`d${fe}`).join(", ");return`
  fn get_${e}(${R}) -> ${f} {
    return get_${e}ByIndices(${M(Y)});
  }`})(),ee=(...R)=>{if(R.length!==s)throw new Error(`indices length must be ${s}`);let Y=R.map(_).join(",");return s===0?J("0u"):s===1?J(Y[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${Y})`)},se=R=>s<2?J(R):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${R})`),Z=s<2?"":`
  fn set_${e}ByIndices(indices: ${y.indices}, value: ${f}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,me=s<2?"":(()=>{let R=d.map(fe=>`d${fe}: u32`).join(", "),Y=d.map(fe=>`d${fe}`).join(", ");return`
  fn set_${e}(${R}, value: ${f}) {
    set_${e}ByIndices(${M(Y)}, value);
  }`})();return{impl:()=>{let R=[],Y=!1;return b.offsetToIndices&&(R.push(T),Y=!0),b.indicesToOffset&&(R.push(k),Y=!0),b.broadcastedIndicesToOffset&&(Object.values(j).forEach(fe=>R.push(fe)),Y=!0),b.set&&(R.push(me),Y=!0),b.setByIndices&&(R.push(Z),Y=!0),b.get&&(R.push(Q),Y=!0),b.getByIndices&&(R.push(ve),Y=!0),!a&&Y&&R.unshift(`const ${S} = ${y.indices}(${n.join(",")});`,`const ${$} = ${y.indices}(${E.computeStrides(n).join(",")});`),R.join(`
`)},type:y,offsetToIndices:I,indicesToOffset:O,broadcastedIndicesToOffset:ne,indices:M,indicesGet:V,indicesSet:F,set:(...R)=>{if(R.length!==s+1)throw new Error(`indices length must be ${s}`);let Y=R[s];if(typeof Y!="string")throw new Error("value must be string");let fe=R.slice(0,s).map(_).join(",");return s===0?W("0u",Y):s===1?W(fe[0],Y):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${fe}, ${Y})`)},setByOffset:W,setByIndices:(R,Y)=>s<2?W(R,Y):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${R}, ${Y});`),get:ee,getByOffset:J,getByIndices:se,usage:r,name:e,strides:$,shape:S,rank:s}},P=(e,t,n,r=1)=>Lr(e,t,n,"input",r),N=(e,t,n,r=1)=>Lr(e,t,n,"output",r),Fs=(e,t,n)=>Lr(e,t,n,"atomicOutput",1),Gr=(e,t,n,r=1)=>Lr(e,t,n,"internal",r),ao=class{constructor(t,n){this.normalizedDispatchGroup=t;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Pt){let n=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(n>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,d=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*r*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${r}, ${o})
  fn main(${s}) {
    ${d}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,n){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${n}) var<storage, ${r}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(t,n,r=1){return this.uniforms.push({name:t,type:n,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:n,type:r,length:o}of this.uniforms)if(o&&o>4)r==="f16"?t.push(`@align(16) ${n}:array<mat2x4<${r}>, ${Math.ceil(o/8)}>`):t.push(`${n}:array<vec4<${r}>, ${Math.ceil(o/4)}>`);else{let a=o==null||o===1?r:`vec${o}<${r}>`;t.push(`${n}:${a}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[t(n.type),n.length??1])}},qs=(e,t)=>new ao(e,t)});var eh,Ks,th,rh,nh,oh,Oe,js,Zs,ct=G(()=>{"use strict";te();ae();Ie();ce();eh=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ks=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),th=(e,t)=>E.sortBasedOnPerm(e,Ks(e.length,t)),rh=(e,t,n,r)=>{let o=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let a=0;a<t;++a)o+=`a[${e[a]}]=i[${a}];`;return o+="return a;}"},nh=(e,t)=>{let n=[],r=[];for(let o=0;o<e.length;++o)e[o]!==1&&n.push(e[o]),e[t[o]]!==1&&r.push(t[o]);return{newShape:n,newPerm:r}},oh=(e,t)=>{let n=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<n)return!1;n=e[r]}return!0},Oe=(e,t)=>{let n=e.dataType,r=e.dims.length,o=Ks(r,t),a=th(e.dims,o),s=e.dims,d=a,l=r<2||oh(o,e.dims),p;if(l)return p=w=>{let S=P("input",n,s,4),$=N("output",n,d,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,$)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:p};let{newShape:f,newPerm:h}=nh(e.dims,o),y=E.areEqual(h,[2,3,1]),_=E.areEqual(h,[3,1,2]);if(f.length===2||y||_){s=y?[f[0],f[1]*f[2]]:_?[f[0]*f[1],f[2]]:f,d=[s[1],s[0]];let w=16;return p=S=>{let $=P("a",n,s.length),v=N("output",n,d.length);return`
  ${S.registerUniform("output_size","u32").declareVariables($,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${S.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${$.getByIndices(`${$.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let S=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(d[1]/w),y:Math.ceil(d[0]/w)},programUniforms:[{type:12,data:S},...H(s,d)]}},getShaderSource:p}}return p=w=>{let S=P("a",n,s.length),$=N("output",n,d.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(S,$)}

  ${rh(o,r,S,$)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",S.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...H(s,d)]}},getShaderSource:p}},js=(e,t)=>{eh(e.inputs,t.perm),e.compute(Oe(e.inputs[0],t.perm))},Zs=e=>re({perm:e.perm})});var ih,ah,sh,uh,dh,lh,ch,ph,mh,fh,rt,Qs,Ys,Xs,Js,eu,tu,ru,nu,ou,iu,au=G(()=>{"use strict";te();ae();ce();Hr();ct();ih={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ah={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},sh={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},uh={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},dh=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},lh=(e,t)=>{let n=[],r=e.length;for(let a=0;a<r;a++)t.indexOf(a)===-1&&n.push(e[a]);let o=t.map(a=>e[a]);return[n,o]},ch=(e,t)=>{let n=e.length+t.length,r=[],o=0;for(let a=0;a<n;a++)t.indexOf(a)===-1?r.push(e[o++]):r.push(1);return r},ph=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},mh=(e,t)=>{let n=[];if(!ph(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},fh=(e,t,n,r,o,a,s)=>{let d=n[0].dims,l=E.size(a),p=E.size(s),f=P("_A",n[0].dataType,d),h=N("output",o,a),y=64;l===1&&(y=256);let _=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,b=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(f,h)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${sh[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${ih[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ah[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${r==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${uh[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${y}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},rt=(e,t,n,r)=>{let o=e.inputs.length===1?n:lo(e.inputs,n),a=o.axes;a.length===0&&!o.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,b)=>b));let s=E.normalizeAxes(a,e.inputs[0].dims.length),d=s,l=e.inputs[0],p=mh(d,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Oe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],d=dh(d.length,l.dims.length));let[f,h]=lh(l.dims,d),y=f;o.keepDims&&(y=ch(f,s)),e.compute(fh(t,o.cacheKey,[l],r,e.inputs[0].dataType,y,h),{inputs:[l]})},Qs=(e,t)=>{rt(e,"ReduceMeanShared",t,"mean")},Ys=(e,t)=>{rt(e,"ReduceL1Shared",t,"l1")},Xs=(e,t)=>{rt(e,"ReduceL2Shared",t,"l2")},Js=(e,t)=>{rt(e,"ReduceLogSumExpShared",t,"logSumExp")},eu=(e,t)=>{rt(e,"ReduceMaxShared",t,"max")},tu=(e,t)=>{rt(e,"ReduceMinShared",t,"min")},ru=(e,t)=>{rt(e,"ReduceProdShared",t,"prod")},nu=(e,t)=>{rt(e,"ReduceSumShared",t,"sum")},ou=(e,t)=>{rt(e,"ReduceSumSquareShared",t,"sumSquare")},iu=(e,t)=>{rt(e,"ReduceLogSumShared",t,"logSum")}});var nt,hh,Fr,lo,ot,gh,yh,bh,_h,wh,vh,$h,xh,Sh,Th,it,su,uu,du,lu,cu,pu,mu,fu,hu,gu,Hr=G(()=>{"use strict";te();ae();Ie();ce();au();nt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},hh=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Fr=(e,t,n,r,o,a,s=!1,d=!1)=>{let l=[],p=n[0].dims,f=p.length,h=E.normalizeAxes(o,f),y=!d&&h.length===0;p.forEach((S,$)=>{y||h.indexOf($)>=0?s&&l.push(1):l.push(S)});let _=l.length,b=E.size(l);return{name:e,shaderCache:t,getShaderSource:S=>{let $=[],v=P("_A",n[0].dataType,f),T=N("output",a,_),I=r(v,T,h),A=I[2];for(let k=0,O=0;k<f;k++)y||h.indexOf(k)>=0?(s&&O++,A=`for(var j${k}: u32 = 0; j${k} < ${p[k]}; j${k}++) {
                  ${I[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${v.indicesSet("input_indices",k,`j${k}`)}
                  ${A}
                }`):($.push(`${v.indicesSet("input_indices",k,T.indicesGet("output_indices",O))};`),O++);return`

        ${S.registerUniform("output_size","u32").declareVariables(v,T)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${T.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${I[0]}       // init ops for reduce max/min
          ${I[1]}
          ${A}
          ${I[3]}
          ${I.length===4?T.setByOffset("global_idx","value"):I.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...H(p,l)]})}},lo=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),re({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ot=(e,t,n,r)=>{let o=e.inputs,a=o.length===1?n:lo(o,n);e.compute(Fr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&a.axes.length===0?hh:r,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},gh=(e,t)=>{nt(e.inputs),ot(e,"ReduceLogSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},yh=(e,t)=>{nt(e.inputs),ot(e,"ReduceL1",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},bh=(e,t)=>{nt(e.inputs),ot(e,"ReduceL2",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},_h=(e,t)=>{nt(e.inputs),ot(e,"ReduceLogSumExp",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},wh=(e,t)=>{nt(e.inputs),ot(e,"ReduceMax",t,(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",d,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},vh=(e,t)=>{nt(e.inputs),ot(e,"ReduceMean",t,(r,o,a)=>{let s=1;for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&(s*=e.inputs[0].dims[d]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},$h=(e,t)=>{nt(e.inputs),ot(e,"ReduceMin",t,(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},xh=(e,t)=>{nt(e.inputs),ot(e,"ReduceProd",t,(r,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Sh=(e,t)=>{nt(e.inputs),ot(e,"ReduceSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Th=(e,t)=>{nt(e.inputs),ot(e,"ReduceSumSquare",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},it=(e,t,n)=>{if(t.length===0)return n;let r=1,o=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?r*=e[a]:o*=e[a];return o<32&&r>1024},su=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vh(e,t):Qs(e,t)},uu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yh(e,t):Ys(e,t)},du=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bh(e,t):Xs(e,t)},lu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_h(e,t):Js(e,t)},cu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wh(e,t):eu(e,t)},pu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$h(e,t):tu(e,t)},mu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xh(e,t):ru(e,t)},fu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sh(e,t):nu(e,t)},hu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Th(e,t):ou(e,t)},gu=(e,t)=>{it(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gh(e,t):iu(e,t)}});var yu,bu,_u,co,wu=G(()=>{"use strict";te();Ie();Hr();yu=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},bu=(e,t)=>{yu(e.inputs);let n=(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},_u=(e,t)=>{yu(e.inputs);let n=(r,o,a)=>{let s=[];for(let d=0;d<r.rank;d++)(a.indexOf(d)>=0||a.length===0)&&s.push(`input_indices[${d}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Fr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},co=e=>re(e)});var Ih,po,Ch,Ah,kh,Nt,Eh,vu,qr=G(()=>{"use strict";te();ae();Vr();ce();Ih=(e,t)=>{let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4],d=e[5];if(s&&d)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=n.dims[0],p=n.dims[1],f=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=o.dims[0]/3,y=h,_=y;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],y=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let b=p;if(h!==y)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==h+y+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(y!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==y/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let S=b+w,$=-1,v=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(d){if(d.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(d.dims[0]!==l||d.dims[1]!==t.numHeads||d.dims[2]!==p||d.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:w,kvSequenceLength:b,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:f,hiddenSize:h,vHiddenSize:_,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},po=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Ch=(e,t,n,r,o,a,s,d)=>{let l=ye(s?1:a),p=64,f=a/l;f<p&&(p=32);let h=Math.ceil(a/l/p),y=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:f},{type:12,data:h}],_=_e(e.dataType,l),b=ze(1,l),w=["type"];s&&w.push("type"),d&&w.push("type");let S=$=>{let v=N("x",e.dataType,e.dims,l),T=[v],I=s?P("seq_lens",s.dataType,s.dims):void 0;I&&T.push(I);let A=d?P("total_sequence_length_input",d.dataType,d.dims):void 0;A&&T.push(A);let k=ze(e.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(O).declareVariables(...T)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${po(I,A,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${k}(1.0) / ${k}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${k}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:w},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(a/p),y:o,z:t*n},programUniforms:y})}},Ah=(e,t,n,r,o,a,s,d,l)=>{let p=s+a.kvSequenceLength,f=[a.batchSize,a.numHeads,a.sequenceLength,p],h=e>1&&r,y=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=h?[a.batchSize,y,p,a.headSize]:void 0,b=a.nReps?a.nReps:1,w=a.scale===0?1/Math.sqrt(a.headSize):a.scale,S=ye(a.headSize),$=a.headSize/S,v=12,T={x:Math.ceil(p/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},I=[{type:12,data:a.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:b}],A=h&&r&&E.size(r.dims)>0,k=["type","type"];A&&k.push("type"),o&&k.push("type"),d&&k.push("type"),l&&k.push("type");let O=[{dims:f,dataType:t.dataType,gpuDataType:0}];h&&O.push({dims:_,dataType:t.dataType,gpuDataType:0});let M=V=>{let F=P("q",t.dataType,t.dims,S),j=P("key",n.dataType,n.dims,S),ne=[F,j];if(A){let Z=P("past_key",r.dataType,r.dims,S);ne.push(Z)}o&&ne.push(P("attention_bias",o.dataType,o.dims));let W=d?P("seq_lens",d.dataType,d.dims):void 0;W&&ne.push(W);let J=l?P("total_sequence_length_input",l.dataType,l.dims):void 0;J&&ne.push(J);let ve=N("output",t.dataType,f),Q=[ve];h&&Q.push(N("present_key",t.dataType,_,S));let ee=ze(1,S),se=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${F.type.storage}, ${v*v}>;
  ${V.registerUniforms(se).declareVariables(...ne,...Q)}
  ${V.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${po(W,J,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${ve.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${r!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:O,dispatchGroup:T,programUniforms:I}),getShaderSource:M}},kh=(e,t,n,r,o,a,s=void 0,d=void 0)=>{let l=a+o.kvSequenceLength,p=o.nReps?o.nReps:1,f=o.vHiddenSize*p,h=e>1&&r,y=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=h?[o.batchSize,y,l,o.headSize]:void 0,b=[o.batchSize,o.sequenceLength,f],w=12,S={x:Math.ceil(o.vHeadSize/w),y:Math.ceil(o.sequenceLength/w),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:l},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:f},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:p}],v=h&&r&&E.size(r.dims)>0,T=["type","type"];v&&T.push("type"),s&&T.push("type"),d&&T.push("type");let I=[{dims:b,dataType:t.dataType,gpuDataType:0}];h&&I.push({dims:_,dataType:t.dataType,gpuDataType:0});let A=k=>{let O=P("probs",t.dataType,t.dims),M=P("v",n.dataType,n.dims),V=[O,M];v&&V.push(P("past_value",r.dataType,r.dims));let F=s?P("seq_lens",s.dataType,s.dims):void 0;s&&V.push(F);let j=d?P("total_sequence_length_input",d.dataType,d.dims):void 0;d&&V.push(j);let W=[N("output",t.dataType,b)];h&&W.push(N("present_value",t.dataType,_));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${O.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${O.type.value}, ${w*w}>;
  ${k.registerUniforms(J).declareVariables(...V,...W)}
  ${k.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${po(F,j,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${O.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${v&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:I,dispatchGroup:S,programUniforms:$}),getShaderSource:A}},Nt=(e,t,n,r,o,a,s,d,l,p,f=void 0,h=void 0)=>{let y=Math.min(e.outputCount,1+(s?1:0)+(d?1:0)),_=y>1?p.pastSequenceLength:0,b=_+p.kvSequenceLength,w=l&&E.size(l.dims)>0?l:void 0,S=[t,n];y>1&&s&&E.size(s.dims)>0&&S.push(s),w&&S.push(w),f&&S.push(f),h&&S.push(h);let $=e.compute(Ah(y,t,n,s,w,p,_,f,h),{inputs:S,outputs:y>1?[-1,1]:[-1]})[0];e.compute(Ch($,p.batchSize,p.numHeads,_,p.sequenceLength,b,f,h),{inputs:f&&h?[$,f,h]:[$],outputs:[]});let v=[$,r];y>1&&d&&E.size(d.dims)>0&&v.push(d),f&&v.push(f),h&&v.push(h),e.compute(kh(y,$,r,d,p,_,f,h),{inputs:v,outputs:y>1?[0,2]:[0]})},Eh=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,d={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:r},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=h=>{let y=N("output_q",l[0].dataType,n),_=N("output_k",l[0].dataType,n),b=N("output_v",l[0].dataType,n),w=P("input",l[0].dataType,l[0].dims),S=P("weight",l[1].dataType,l[1].dims),$=P("bias",l[2].dataType,l[2].dims),v=w.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${v}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${v}, ${s*s}>;
  var<workgroup> tileWeightK: array<${v}, ${s*s}>;
  var<workgroup> tileWeightV: array<${v}, ${s*s}>;
  ${h.registerUniforms(T).declareVariables(w,S,$,y,_,b)}
  ${h.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${v}(0);
    var valueK = ${v}(0);
    var valueV = ${v}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:p}),getShaderSource:f},{inputs:l,outputs:[-1,-1,-1]})},vu=(e,t)=>{let n=Ih(e.inputs,t),[r,o,a]=Eh(e,n);return Nt(e,r,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}});var Ph,zh,Oh,$u,xu=G(()=>{"use strict";Ge();te();ae();Ie();ce();Ph=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,o,a)=>{let s=o.length;if(s!==r.length)throw new Error(`${a}: num dimensions != ${s}`);o.forEach((d,l)=>{if(d!==r[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},zh=(e,t)=>{let{epsilon:n,spatial:r,format:o}=t,a=e[0].dims,s=r?ye(a[a.length-1]):1,d=o==="NHWC"&&a.length>1?s:1,l=E.size(a)/s,p=r,f=p?a.length:a,h=P("x",e[0].dataType,e[0].dims,s),y=P("scale",e[1].dataType,e[1].dims,d),_=P("bias",e[2].dataType,e[2].dims,d),b=P("inputMean",e[3].dataType,e[3].dims,d),w=P("inputVar",e[4].dataType,e[4].dims,d),S=N("y",e[0].dataType,f,s),$=()=>{let T="";if(r)T=`let cOffset = ${a.length===1?"0u":o==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${y.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let I=1;I<y.rank;I++)T+=`cIndices[${I}] = outputIndices[${I}];`;T+=`let cOffset = ${y.indicesToOffset("cIndices")};`}return T},v=T=>`
  const epsilon = ${n};
  ${T.registerUniform("outputSize","u32").declareVariables(h,y,_,b,w,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${y.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...H(a)]:[{type:12,data:l}]})}},Oh=e=>re(e),$u=(e,t)=>{let{inputs:n,outputCount:r}=e,o=Oh({...t,outputCount:r});if(we.webgpu.validateInputContent&&Ph(n,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(zh(n,o))}});var Dh,Bh,Su,Tu=G(()=>{"use strict";ae();ce();Dh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Bh=e=>{let t=e[0].dims,n=e[0].dims[2],r=E.size(t)/4,o=e[0].dataType,a=P("input",o,t,4),s=P("bias",o,[n],4),d=P("residual",o,t,4),l=N("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:f=>`
  const channels = ${n}u / 4;
  ${f.declareVariables(a,s,d,l)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${d.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Su=e=>{Dh(e.inputs),e.compute(Bh(e.inputs))}});var Mh,be,Iu,Cu,Au,ku,Eu,Pu,zu,Ou,Du,Rh,Bu,Mu,Ru,Uu,tr,Nu,Kr,Vu,Wu,Lu,Gu,Hu,Fu,qu,Ku,ju,Zu,Qu,Yu,Xu,Ju,ed,td,rd,nd,mo,fo,od,id,ad,Uh,Nh,sd,jr=G(()=>{"use strict";te();ae();Ie();ce();Mh=(e,t,n,r,o,a,s)=>{let d=Math.ceil(t/4),l="";typeof o=="string"?l=`${o}(a)`:l=o("a");let p=P("inputData",n,[d],4),f=N("outputData",r,[d],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(p,f)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",l)}
  }`},be=(e,t,n,r,o,a=e.dataType,s,d)=>{let l=[{type:12,data:Math.ceil(E.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:p=>Mh(p,E.size(e.dims),e.dataType,a,n,r,d),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(E.size(p[0].dims)/64/4)},programUniforms:l})}},Iu=e=>{e.compute(be(e.inputs[0],"Abs","abs"))},Cu=e=>{e.compute(be(e.inputs[0],"Acos","acos"))},Au=e=>{e.compute(be(e.inputs[0],"Acosh","acosh"))},ku=e=>{e.compute(be(e.inputs[0],"Asin","asin"))},Eu=e=>{e.compute(be(e.inputs[0],"Asinh","asinh"))},Pu=e=>{e.compute(be(e.inputs[0],"Atan","atan"))},zu=e=>{e.compute(be(e.inputs[0],"Atanh","atanh"))},Ou=e=>re(e),Du=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(be(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},Rh=e=>{let t,n,r=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return re({min:t,max:n})},Bu=(e,t)=>{let n=t||Rh(e.inputs),r=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Mu=e=>{e.compute(be(e.inputs[0],"Ceil","ceil"))},Ru=e=>{e.compute(be(e.inputs[0],"Cos","cos"))},Uu=e=>{e.compute(be(e.inputs[0],"Cosh","cosh"))},tr=e=>re(e),Nu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Kr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Vu=e=>{let t=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Kr(t)))},Wu=e=>{e.compute(be(e.inputs[0],"Exp","exp"))},Lu=e=>{e.compute(be(e.inputs[0],"Floor","floor"))},Gu=e=>{let t=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Kr(t)))},Hu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},Fu=e=>{e.compute(be(e.inputs[0],"Not",t=>`!${t}`))},qu=e=>{e.compute(be(e.inputs[0],"Neg",t=>`-${t}`))},Ku=e=>{e.compute(be(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ju=e=>{let t=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},Zu=e=>{e.compute(be(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Qu=e=>re(e),Yu=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},Xu=e=>{e.compute(be(e.inputs[0],"Sin","sin"))},Ju=e=>{e.compute(be(e.inputs[0],"Sinh","sinh"))},ed=e=>{e.compute(be(e.inputs[0],"Sqrt","sqrt"))},td=e=>{e.compute(be(e.inputs[0],"Tan","tan"))},rd=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,nd=e=>{e.compute(be(e.inputs[0],"Tanh",rd))},mo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${rd("v")};
}
`,fo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,od=e=>{let t=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"FastGelu",fo,mo(t),void 0,e.inputs[0].dataType))},id=(e,t)=>{let n=ze(e.inputs[0].dataType);return e.compute(be(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},ad=e=>{e.compute(be(e.inputs[0],"Log","log"))},Uh=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Nh=e=>`quick_gelu_impl(${e})`,sd=(e,t)=>{let n=ze(e.inputs[0].dataType);e.compute(be(e.inputs[0],"QuickGelu",Nh,Uh(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Vh,Wh,dd,ld=G(()=>{"use strict";ae();ce();jr();Vh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Wh=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=P("input",e[0].dataType,e[0].dims,4),r=P("bias",e[0].dataType,[e[0].dims[2]],4),o=N("output",e[0].dataType,t,4),a=E.size(t)/4,s=_e(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(n,r,o)}

  ${Kr(s)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},dd=e=>{Vh(e.inputs),e.compute(Wh(e.inputs))}});var Lh,Gh,at,cd,pd,md,fd,hd,gd,yd,bd,_d,wd,vd=G(()=>{"use strict";te();ae();ce();Lh=(e,t,n,r,o,a,s,d,l,p,f,h)=>{let y,_;typeof d=="string"?y=_=(v,T)=>`${d}((${v}),(${T}))`:typeof d=="function"?y=_=d:(y=d.scalar,_=d.vector);let b=N("outputData",f,r.length,4),w=P("aData",l,t.length,4),S=P("bData",p,n.length,4),$;if(o)if(a){let v=E.size(t)===1,T=E.size(n)===1,I=t.length>0&&t[t.length-1]%4===0,A=n.length>0&&n[n.length-1]%4===0;v||T?$=b.setByOffset("global_idx",_(v?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",_(s||I?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||A?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=b.setByOffset("global_idx",_(w.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(T,I,A="")=>{let k=`aData[indexA${I}][componentA${I}]`,O=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${b.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${w.broadcastedIndicesToOffset(`outputIndices${I}`,b)};
            let offsetB${I} = ${S.broadcastedIndicesToOffset(`outputIndices${I}`,b)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${T}[${I}] = ${A}(${y(k,O)});
          `};f===9?$=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,S,b)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Gh=(e,t,n,r,o,a,s=n.dataType)=>{let d=n.dims.map(w=>Number(w)??1),l=r.dims.map(w=>Number(w)??1),p=!E.areEqual(d,l),f=d,h=E.size(d),y=!1,_=!1,b=[p];if(p){let w=tt.calcShape(d,l,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");f=w.slice(),h=E.size(f);let S=E.size(d)===1,$=E.size(l)===1,v=d.length>0&&d[d.length-1]%4===0,T=l.length>0&&l[l.length-1]%4===0;b.push(S),b.push($),b.push(v),b.push(T);let I=1;for(let A=1;A<f.length;A++){let k=d[d.length-A],O=l[l.length-A];if(k===O)I*=k;else break}I%4===0?(_=!0,y=!0):(S||$||v||T)&&(y=!0)}else y=!0;return b.push(y),{name:e,shaderCache:{hint:t+b.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>Lh(w,d,l,f,y,p,_,o,n.dataType,r.dataType,s,a),getRunData:()=>({outputs:[{dims:f,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(E.size(f)/4)},...H(d,l,f)]})}},at=(e,t,n,r,o,a)=>{e.compute(Gh(t,o??"",e.inputs[0],e.inputs[1],n,r,a))},cd=e=>{at(e,"Add",(t,n)=>`${t}+${n}`)},pd=e=>{at(e,"Div",(t,n)=>`${t}/${n}`)},md=e=>{at(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},fd=e=>{at(e,"Mul",(t,n)=>`${t}*${n}`)},hd=e=>{let t=P("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;at(e,"Pow",{scalar:(r,o)=>`pow_custom(${r},${o})`,vector:(r,o)=>`pow_vector_custom(${r},${o})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},gd=e=>{at(e,"Sub",(t,n)=>`${t}-${n}`)},yd=e=>{at(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},bd=e=>{at(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},_d=e=>{at(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},wd=e=>{at(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}});var Fh,qh,Kh,jh,$d,xd,Sd=G(()=>{"use strict";te();ae();Ie();ce();Fh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],o=r.dataType,a=r.dims.length;e.forEach((s,d)=>{if(d!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==r.dims[p])throw new Error("non concat dimensions must match")})}})},qh=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Kh=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));n===1?r.push(a):o===0?r.push(`if (inputIndex == ${o}u) { ${a} }`):o===n-1?r.push(`else { ${a} }`):r.push(`else if (inputIndex == ${o}) { ${a} }`)}return r.join(`
`)},jh=(e,t,n,r)=>{let o=E.size(n),a=new Array(e.length),s=new Array(e.length),d=0,l=[],p=[],f=[{type:12,data:o}];for(let w=0;w<e.length;++w)d+=e[w].dims[t],a[w]=d,p.push(e[w].dims.length),s[w]=P(`input${w}`,r,p[w]),l.push("rank"),f.push({type:12,data:a[w]});for(let w=0;w<e.length;++w)f.push(...H(e[w].dims));f.push(...H(n));let h=N("output",r,n.length),y=h.indicesGet("indices",t),_=Array.from(Array(a.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),b=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)w.registerUniform(`sizeInConcatAxis${S}`,"u32");return w.declareVariables(...s,h)})()}

  ${qh(a.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${y});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${_});
      ${y} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Kh(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:b}},$d=(e,t)=>{let n=e.inputs,r=n[0].dims,o=E.normalizeAxis(t.axis,r.length);Fh(n,o);let a=r.slice();a[o]=n.reduce((d,l)=>d+(l.dims.length>o?l.dims[o]:0),0);let s=n.filter(d=>E.size(d.dims)>0);e.compute(jh(s,o,a,n[0].dataType),{inputs:s})},xd=e=>re({axis:e.axis})});var je,Ze,Qe,Zr,vt=G(()=>{"use strict";te();ae();je=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Ze=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Qe=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[Gs,Hs];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}});var Ee,Td,Qr=G(()=>{"use strict";Ee=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Td=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Id,Cd=G(()=>{"use strict";Id=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var rr,Yr,Xr=G(()=>{"use strict";te();ae();ce();vt();rr=(e,t,n,r,o)=>{let a=r-n;return`
      ${Array.from({length:n}).map((s,d)=>`
      if (${K(t.shape,d,t.rank)} != 1) {
        ${t.indicesSet(e,d,K(o,d+a,r))}
      } else {
        ${t.indicesSet(e,d,0)}
      }`).join("")}
`},Yr=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s[s.length-2],p=d[d.length-1],f=s[s.length-1],h=ye(p),y=ye(f),_=ye(l),b=E.size(n)/h/_,w=e.length>2,S=r?r.slice(0,-2):n.slice(0,-2),v=[E.size(S),l,p],T=[{type:12,data:b},{type:12,data:l},{type:12,data:p},{type:12,data:f}];Ze(t,T),T.push(...H(S,s,d)),w&&T.push(...H(e[2].dims)),T.push(...H(v));let I=A=>{let k=Gr("batch_dims",e[0].dataType,S.length),O=P("a",e[0].dataType,s.length,y),M=P("b",e[1].dataType,d.length,h),V=N("output",e[0].dataType,v.length,h),F=_e(V.type.tensor),j=je(t,V.type.value,F),ne=[O,M],W="";if(w){let Q=o?h:1;ne.push(P("bias",e[2].dataType,e[2].dims.length,Q)),W=`${o?`value += bias[col / ${Q}];`:`value += ${V.type.value}(bias[row + i]);`}`}let J=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Qe(t,J);let ve=()=>{let Q=`var a_data: ${O.type.value};`;for(let ee=0;ee<y;ee++)Q+=`
              let b_data${ee} = b[(b_offset + (k + ${ee}) * uniforms.N + col) / ${h}];`;for(let ee=0;ee<_;ee++){Q+=`a_data = a[(a_offset + (row + ${ee}) * uniforms.K + k) / ${y}];`;for(let se=0;se<y;se++)Q+=`
            values[${ee}] = fma(${M.type.value}(a_data${y===1?"":`[${se}]`}), b_data${se}, values[${ee}]);
`}return Q};return`
  ${A.registerUniforms(J).registerInternalVariables(k).declareVariables(...ne,V)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${O.type.indices};
    ${rr("a_indices",O,O.rank-2,k.rank,"batch_indices")}
    ${O.indicesSet("a_indices",O.rank-2,0)}
    ${O.indicesSet("a_indices",O.rank-1,0)}
    let a_offset = ${O.indicesToOffset("a_indices")};

    var b_indices: ${M.type.indices};
    ${rr("b_indices",M,M.rank-2,k.rank,"batch_indices")}
    ${M.indicesSet("b_indices",M.rank-2,0)}
    ${M.indicesSet("b_indices",M.rank-1,0)}
    let b_offset = ${M.indicesToOffset("b_indices")};
    var values: array<${V.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${y}) {
      ${ve()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${W}
      ${j}
      let cur_indices = ${V.type.indices}(batch, row + i, col);
      let offset = ${V.indicesToOffset("cur_indices")};
      ${V.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${y};${_};${o}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:T}),getShaderSource:I}}});var Zh,Qh,ho,Ad,Yh,go,Xh,nr,Jr=G(()=>{"use strict";te();ae();ce();vt();Xr();Qr();Zh=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Qh=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ho=(e,t,n="f32",r,o=!1,a=32,s=!1,d=32)=>{let l=t[1]*e[1],p=t[0]*e[0],f=o?l:a,h=o?a:l,y=f/t[0],_=a/t[1];if(!((o&&y===4&&e[1]===4||!o&&(y===3||y===4))&&f%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${n}>, ${f/y}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${p/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${y};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Zh(o,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${y===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Qh(o,y)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ad=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Yh=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",go=(e,t,n="f32",r,o=!1,a=32,s=!1,d=32,l=!1)=>{let p=e[1]*t[1],f=e[0]*t[0],h=o?p:a,y=o?a:p;if(!(y%t[1]===0&&h%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${y} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=y/t[1],b=h/t[0],w=a/t[1],S=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${y}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Ad(o,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ad(o,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
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
      ${Yh(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${h}>, ${y}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${f}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(d/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${d}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Xh=(e,t,n,r,o=!1)=>{let[a,s,d,l]=r,p=_e(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${rr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${d.type.indices};
        ${rr("bIndices",d,d.rank-2,a.rank,"batchIndices")}
        ${d.indicesSet("bIndices",d.rank-2,"u32(row)")}
        ${d.indicesSet("bIndices",d.rank-1,"u32(colIn)")}
        value = ${d.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Ee(e,p)}(bias[row])`};`:""}
        ${n}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},nr=(e,t,n,r,o=!1,a)=>{let s=e[0].dims,d=e[1].dims,l=s.slice(0,-2),p=d.slice(0,-2),f=r?r.slice(0,-2):n.slice(0,-2),h=E.size(f),y=s[s.length-2],_=s[s.length-1],b=d[d.length-1],w=_%4===0&&b%4===0,S=y<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(b/$[0]/S[0]),Math.ceil(y/$[1]/S[1]),Math.ceil(h/$[2]/S[2])],T=w?4:1,I=[...l,y,_/T],A=I.length,k=[...p,_,b/T],O=k.length,M=[h,y,b/T],V=[{type:6,data:y},{type:6,data:b},{type:6,data:_}];Ze(t,V),V.push(...H(f,I,k));let F=["rank","rank"],j=e.length>2;j&&(V.push(...H(e[2].dims)),F.push("rank")),V.push(...H(M));let ne=W=>{let J=f.length,ve=Gr("batchDims",e[0].dataType,J,1),Q=_e(e[0].dataType),ee=P("a",e[0].dataType,A,T),se=P("b",e[1].dataType,O,T),Z=N("result",e[0].dataType,M.length,T),me=[ee,se];if(j){let Y=o?T:1;me.push(P("bias",e[2].dataType,e[2].dims.length,Y))}let ke=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Qe(t,ke);let Se=_e(Z.type.tensor),D=je(t,Z.type.value,Se),R=Xh(T,j,D,[ve,ee,se,Z],o);return`
  ${W.registerUniforms(ke).registerInternalVariables(ve).declareVariables(...me,Z)}
  ${R}
  ${w?ho(S,$,Q,ve):go(S,$,Q,ve)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${w};${o}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:a?a(n):n,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:V}),getShaderSource:ne}}});var Jh,kd,Ed=G(()=>{"use strict";te();et();ce();vt();Qr();Cd();Jr();Jh=(e,t,n,r,o=!1,a,s=4,d=4,l=4,p="f32")=>{let f=F=>{switch(F){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},h=F=>{switch(F){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${F} is not supported.`)}},y=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ee(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${w}) {
      ${y}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(s)}
    }
    return resData;`,T=e?t&&r?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Ee(s,p)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Ee(s,p)}(0.0);`,I=e?r&&n?h(d):`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(d)}
    }
    return ${Ee(d,p)}(0.0);`:`
    let col = colIn * ${d};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(d)}
    }
    return ${Ee(d,p)}(0.0);`,A=Ee(l,p),k=e?Ee(s,p):Ee(d,p),O=e?Ee(d,p):Ee(s,p),M=je(a,A,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${e?T:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${e?I:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Td(o)}
      ${M}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},kd=(e,t,n,r,o,a,s,d,l)=>{let p=t.format==="NHWC",f=p?e[0].dims[3]:e[0].dims[1],h=n[0],y=p?n[2]:n[3],_=p?n[1]:n[2],b=p?n[3]:n[1],w=p&&(f%4===0||f%3===0)&&b%4===0,S=p?b:y*_,$=p?y*_:b,v=[8,8,1],T=r<=8?[4,1,1]:[4,4,1],I=[Math.ceil(S/v[0]/T[0]),Math.ceil($/v[1]/T[1]),Math.ceil(h/v[2]/T[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let A=w?p&&f%4!==0?3:4:1,k=v[1]*T[1],O=v[0]*T[0],M=Math.max(v[0]*A,v[1]),V=r%k===0,F=o%O===0,j=a%M===0,ne=w?[A,4,4]:[1,1,1],W=[{type:6,data:r},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Ze(t,W),W.push(...H(e[0].dims,e[1].dims));let J=["rank","rank"];s&&(W.push(...H(e[2].dims)),J.push("rank")),W.push(...H(n));let ve=Q=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Qe(t,ee);let se=w?4:1,Z=_e(e[0].dataType),me=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${Z}>`:Z}) {
        result[flatIndex] = ${w?`vec4<${Z}>`:Z}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${Z}>`:Z}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,ke=P("x",e[0].dataType,e[0].dims.length,A===3?1:A),Se=P("w",e[1].dataType,e[1].dims.length,se),D=[ke,Se],R=N("result",e[0].dataType,n.length,se);if(s){let Y=P("bias",e[2].dataType,e[2].dims.length,se);D.push(Y),me+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${Z}>`:Z} {
          return bias[coords.${p?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Id("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Q.registerUniforms(ee).declareVariables(...D,R)}
        ${me}
        ${Jh(p,V,F,j,s,t,ne[0],ne[1],ne[2],Z)}
        ${w?ho(T,v,Z,void 0,!p,M):go(T,v,Z,void 0,!p,M,!1,void 0,d)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${A};${w};${V};${F};${j};${k};${O};${M}`,inputDependencies:J},getRunData:()=>({outputs:[{dims:l?l(n):n,dataType:e[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:W}),getShaderSource:ve}}});var eg,Pd,en,tg,zd,rg,Od,Dd,Bd=G(()=>{"use strict";te();et();ae();ce();vt();Qr();eg=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Pd=e=>typeof e=="number"?[e,e,e]:e,en=(e,t)=>t<=1?e:e+(e-1)*(t-1),tg=(e,t,n,r=1)=>{let o=en(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)},zd=(e,t,n,r,o)=>{o==null&&(o=tg(e,t[0],r[0]));let a=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*o)/r[s]+1));return a},rg=(e,t,n,r,o,a,s,d,l,p)=>{let f,h,y,_;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=zd([t,n,r,1],[d,l,p],1,[o,a,s],e);h=b[0],y=b[1],_=b[2]}else if(Array.isArray(e)){if(!e.every((w,S,$)=>w===$[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=zd([t,n,r,1],[d,l,p],1,[o,a,s],e[0]);h=b[0],y=b[1],_=b[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/o),y=Math.ceil(n/a),_=Math.ceil(r/s);let b=(h-1)*o+d-t,w=(y-1)*a+l-n,S=(_-1)*s+p-r,$=Math.floor(b/2),v=b-$,T=Math.floor(w/2),I=w-T,A=Math.floor(S/2),k=S-A;f={top:T,bottom:I,left:A,right:k,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:y,outWidth:_}},Od=(e,t,n,r,o,a=!1,s="channelsLast")=>{let d,l,p,f,h;if(s==="channelsLast")[d,l,p,f,h]=e;else if(s==="channelsFirst")[d,h,l,p,f]=e;else throw new Error(`Unknown dataFormat ${s}`);let[y,,_,b,w]=t,[S,$,v]=Pd(n),[T,I,A]=Pd(r),k=en(_,T),O=en(b,I),M=en(w,A),{padInfo:V,outDepth:F,outHeight:j,outWidth:ne}=rg(o,l,p,f,S,$,v,k,O,M),W=a?y*h:y,J=[0,0,0,0,0];return s==="channelsFirst"?J=[d,W,F,j,ne]:s==="channelsLast"&&(J=[d,F,j,ne,W]),{batchSize:d,dataFormat:s,inDepth:l,inHeight:p,inWidth:f,inChannels:h,outDepth:F,outHeight:j,outWidth:ne,outChannels:W,padInfo:V,strideDepth:S,strideHeight:$,strideWidth:v,filterDepth:_,filterHeight:b,filterWidth:w,effectiveFilterDepth:k,effectiveFilterHeight:O,effectiveFilterWidth:M,dilationDepth:T,dilationHeight:I,dilationWidth:A,inShape:e,outShape:J,filterShape:t}},Dd=(e,t,n,r,o,a)=>{let s=a==="channelsLast",d=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],f={x:n.map((v,T)=>T)},h=[Math.ceil(eg(f.x.map(v=>n[v]))/p[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let y=l?s&&d%4!==0?3:4:1,_=E.size(n),b=[{type:12,data:_},{type:12,data:r},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Ze(t,b),b.push(...H(e[0].dims,e[1].dims));let w=["rank","rank"],S=e.length===3;S&&(b.push(...H(e[2].dims)),w.push("rank")),b.push(...H(n));let $=v=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Qe(t,T);let I=l?4:1,A=_e(e[0].dataType),k=P("x",e[0].dataType,e[0].dims.length,y===3?1:y),O=P("W",e[1].dataType,e[1].dims.length,I),M=[k,O],V=N("result",e[0].dataType,n.length,I),F="";if(S){let W=P("bias",e[2].dataType,e[2].dims.length,I);M.push(W),F+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${A}>`:A} {
          return bias[${s?K("coords",4,5):K("coords",1,5)}${l?"/ 4":""}];
        }`}let j=Ee(y,A),ne=je(t,j,A);return`
            ${F}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${v.registerUniforms(T).declareVariables(...M,V)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${V.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,k.rank)};
              let d2 = ${s?K("coords",k.rank-1,k.rank):K("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${s?K("coords",1,k.rank):K("coords",2,k.rank)},
              ${s?K("coords",2,k.rank):K("coords",3,k.rank)},
              ${s?K("coords",3,k.rank):K("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?K("uniforms.x_shape",1,k.rank):K("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${s?K("uniforms.x_shape",2,k.rank):K("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${s?K("uniforms.x_shape",3,k.rank):K("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${s?K("uniforms.x_shape",4,k.rank):K("uniforms.x_shape",1,k.rank)};
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
                      ${s?`let xValues = vec4<f32>(
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
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
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
                      ${s?`let xValues = vec3<f32>(
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
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${ne}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${y};${S}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:b}),getShaderSource:$}}});var Md,Rd,Ud=G(()=>{"use strict";te();ae();ce();vt();Md=(e,t,n,r)=>{let o=e.length>2,a=o?"value += b[output_channel];":"",s=e[0].dims,d=e[1].dims,l=t.format==="NHWC",p=l?n[3]:n[1],f=p/t.group,h=l&&f>=4?ye(p):1,y=E.size(n)/h,_=[{type:12,data:y},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Ze(t,_),_.push(...H(s,[d[0],d[1],d[2],d[3]/h]));let b=o?["rank","rank","rank"]:["rank","rank"];_.push(...H([n[0],n[1],n[2],n[3]/h]));let w=S=>{let $=N("output",e[0].dataType,n.length,h),v=_e($.type.tensor),T=je(t,$.type.value,v),I=P("x",e[0].dataType,s.length),A=P("w",e[1].dataType,d.length,h),k=[I,A];o&&k.push(P("b",e[2].dataType,e[2].dims,h));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Qe(t,O);let M=l?`
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
            let xVal = ${I.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${A.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${I.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(O).declareVariables(...k,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${M}
    ${a}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},Rd=(e,t,n,r)=>{let o=e.length>2,a=ye(n[3]),s=ye(n[2]),d=E.size(n)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],f=[n[0],n[1],n[2],n[3]/a],h=[{type:12,data:d},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Ze(t,h),h.push(...H(l,p,f));let y=(s-1)*t.strides[1]+p[1],_=b=>{let w=N("output",e[0].dataType,f.length,a),S=_e(w.type.tensor),$=je(t,w.type.value,S),v=P("x",e[0].dataType,l.length,a),T=P("w",e[1].dataType,p.length,a),I=[v,T];o&&I.push(P("b",e[2].dataType,e[2].dims,a));let A=o?"value += b[output_channel];":"",k=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Qe(t,k),`
  ${b.registerUniforms(k).declareVariables(...I,w)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${y}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${y}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${A}
      ${$}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${y};${p[0]};${p[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:_}}});var ng,yo,og,bo,_o,Nd,ig,ag,wo,Vd=G(()=>{"use strict";ae();Ed();Bd();Jr();Ud();vt();Xr();ct();ng=(e,t,n,r,o,a)=>{let s=e[0],d=e.slice(a?1:2,a?3:4),l=d.length,p=t[0],h=t.slice(2).map((b,w)=>b+(b-1)*(n[w]-1)),_=d.map((b,w)=>b+r[w]+r[w+l]).map((b,w)=>Math.floor((b-h[w]+o[w])/o[w]));return _.splice(0,0,s),_.splice(a?3:1,0,p),_},yo=[2,3,1,0],og=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},bo=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let a=2;a<t[1].dims.length;++a)n[a-2]===0&&(n[a-2]=t[1].dims[a]);let r=e.pads.slice();Et.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:r}),o},_o=e=>{let t=Zr(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,a=e.group,s=e.kernel_shape,d=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Nd=(e,t,n,r)=>{let o=n.format==="NHWC",a=ng(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let k=[t[0]];if(o){let M=e.kernelCustomData.wT??e.compute(Oe(t[1],yo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=M),k.push(M)}else k.push(t[1]);t.length===3&&k.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Rd(k,n,a,r),{inputs:k}):e.compute(Md(k,n,a,r),{inputs:k});return}let s=t.length===3,d=t[0].dims[o?1:2],l=t[0].dims[o?2:3],p=t[0].dims[o?3:1],f=t[1].dims[2],h=t[1].dims[3],y=a[o?1:2],_=a[o?2:3],b=a[o?3:1],w=o&&f===d&&h===l&&n.pads[0]===0&&n.pads[1]===0;if(w||f===1&&h===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let k=a[0],O,M,V,F=[];if(o){let W=e.kernelCustomData.wT??e.compute(Oe(t[1],yo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),w){let J=d*l*p;O=t[0].reshape([1,k,J]),M=W.reshape([1,J,b]),V=[1,k,b]}else O=t[0].reshape([k,d*l,p]),M=W.reshape([1,p,b]),V=[k,y*_,b];F.push(O),F.push(M)}else O=t[0].reshape([k,p,d*l]),M=t[1].reshape([1,b,p]),V=[k,b,y*_],F.push(M),F.push(O);s&&F.push(t[2]);let j=V[2],ne=F[0].dims[F[0].dims.length-1];j<8&&ne<8?e.compute(Yr(F,n,a,V,o,r),{inputs:F}):e.compute(nr(F,n,a,V,o,r),{inputs:F});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Oe(t[1],yo),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];s&&v.push(t[2]);let T=o?y*_:b,I=o?b:y*_,A=f*h*p;e.compute(kd(v,n,a,T,I,A,s,S,r),{inputs:v})},ig=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),d=[1].concat(t.kernelShape),l=bo({...t,pads:o,strides:a,dilations:s,kernelShape:d},r);Nd(e,r,l,p=>n?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},ag=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",o=bo(n,t),a=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Od(t[0].dims,t[1].dims,n.strides,n.dilations,a,!1,r);e.compute(Dd(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},wo=(e,t)=>{if(og(e.inputs,t),e.inputs[0].dims.length===3)ig(e,t);else if(e.inputs[0].dims.length===5)ag(e,e.inputs,t);else{let n=bo(t,e.inputs);Nd(e,e.inputs,n)}}});var Wd,Ld=G(()=>{"use strict";te();et();ae();ce();Wd=(e,t,n)=>{let r=e.length>2,o=t.outputShape,a=t.format==="NHWC",s=t.group,d=e[1].dims,l=d[2]/s,p=d[3],f=a?ye(l):1,h=a?ye(p):1,y=a?p===1?f:h:1,_=E.size(o)/h,b=[Math.ceil(_/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let w=["rank","rank"],S=[t.strides[0],t.strides[1]],$=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],v=[t.dilations[0],t.dilations[1]],T=[$[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),$[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],I=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],A=[{type:12,data:_},{type:12,data:S},{type:12,data:$},{type:12,data:v},{type:12,data:T},{type:6,data:I},{type:12,data:l},{type:12,data:p},...H(e[0].dims,e[1].dims)];r&&(A.push(...H(e[2].dims)),w.push("rank")),A.push(...H(o));let k=O=>{let M=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:T.length},{name:"pads",type:"i32",length:I.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],V=_e(e[0].dataType),F=a?1:2,j=a?2:3,ne=a?3:1,W=P("W",e[1].dataType,e[1].dims.length,y),J=P("Dy",e[0].dataType,e[0].dims.length,f),ve=[J,W];r&&ve.push(P("bias",e[2].dataType,[o[ne]].length,h));let Q=N("result",e[0].dataType,o.length,h),ee=()=>{let Z="";if(f===1)Z+=`
        let w_offset = ${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${W.getByOffset(`w_offset / ${y}`)};
        dotProd = dotProd + xValue * wValue;`;else if(p===1)Z+=`
          let wValue = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${y}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let me=0;me<f;me++)Z+=`
            let wValue${me} = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${me}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${me}] * wValue${me};`;return Z},se=`
            let outputIndices = ${Q.offsetToIndices(`global_idx * ${h}`)};
            let batch = ${Q.indicesGet("outputIndices",0)};
            let d1 = ${Q.indicesGet("outputIndices",ne)};
            let r = ${Q.indicesGet("outputIndices",F)};
            let c = ${Q.indicesGet("outputIndices",j)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Q.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${V}(dyRCorner) + ${V}(wR)) / ${V}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${V}(uniforms.Dy_shape[${F}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${V}(dyCCorner) + ${V}(wC)) / ${V}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${V}(uniforms.Dy_shape[${j}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${f}) {
                  let xValue = ${a?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):J.get("batch","inputChannel","idyR","idyC")};
                  ${ee()}
                  inputChannel = inputChannel + ${f};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${h}]`:""};
            ${Q.setByOffset("global_idx","value")};
          `;return`
    ${O.registerUniforms(M).declareVariables(...ve,Q)}
      ${O.mainStart()}
      ${O.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${se}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${y}${h}${p===1}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:A}),getShaderSource:k}}});var sg,ug,dg,Gd,Hd,lg,Fd,cg,qd,Kd=G(()=>{"use strict";Ld();vt();ct();sg=(e,t,n,r,o,a)=>(e-1)*t+n+(r-1)*o+1-a,ug=(e,t,n,r,o)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=a,n[o]=e-a):t==="SAME_LOWER"&&(n[r]=e-a,n[o]=a)},dg=(e,t,n,r,o,a,s,d,l,p)=>{let f=e.length-2,h=p.length===0;l.length<f&&l.push(...Array(f-l.length).fill(0));let y=e[0],_=t[d?3:1]*o;for(let b=0,w=e.length-f-(d?1:0);b<f;++b,++w){let S=e[w],$=h?S*s[b]:p[b],v=sg(S,s[b],a[b],t[w],n[b],$);ug(v,r,a,b,b+f),h&&p.push(s[b]*(S-1)+l[b]+(t[w]-1)*n[b]+1-a[b]-a[b+f])}p.splice(0,0,y),p.splice(d?3:1,0,_)},Gd=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,y)=>h*y,1)===0){n.length=0;for(let h=2;h<t[1].dims.length;++h)n.push(t[1].dims[h])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),d=t[0].dims,l=e.dilations.slice();if(l.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,y)=>h+y,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}dg(d,n,l,e.autoPad,e.group,o,p,r,s,a);let f=Object.assign({},e);return Object.assign(f,{kernelShape:n,pads:o,outputPadding:s,outputShape:a,dilations:l,strides:p}),f},Hd=e=>{let t=Zr(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group,s=e.kernelShape,d=e.pads,l=e.strides,p=e.wIsConst(),f=e.outputPadding,h=e.outputShape;return{autoPad:r,format:n,dilations:o,group:a,kernelShape:s,outputPadding:f,outputShape:h,pads:d,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},lg=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((f,h)=>f+h,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((f,h)=>f+h,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((f,h)=>f+h,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((f,h)=>f+h,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Fd=(e,t,n,r)=>{let o=e.kernelCustomData.wT??e.compute(Oe(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let a=[t[0],o];t.length===3&&a.push(t[2]),e.compute(Wd(a,n,r),{inputs:a})},cg=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let d=t.pads;d.length===0&&(d=[0,0]),d=[0,d[0],0,d[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let l=t.outputPadding;l=[0].concat(l);let p=Gd({...t,pads:d,strides:s,dilations:a,kernelShape:o,outputPadding:l},r);Fd(e,r,p,f=>n?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},qd=(e,t)=>{if(lg(e.inputs,t),e.inputs[0].dims.length===3)cg(e,t);else{let n=Gd(t,e.inputs);Fd(e,e.inputs,n)}}});var pg,jd,Zd,Qd=G(()=>{"use strict";te();ae();Ie();ce();pg=(e,t,n,r)=>{let o=E.size(t),a=t.length,s=P("input",e,a),d=N("output",e,a),l=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),p=E.normalizeAxis(l,a),f=h=>{let y=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",a),b=r.reverse?y+(r.exclusive?" + 1":""):"0",w=r.reverse?_:y+(r.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,d)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:p},...H(t,t)]}),getShaderSource:f}},jd=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,o=e.inputs[1];e.compute(pg(r,n,o,t),{inputs:[0]})},Zd=e=>{let t=e.exclusive===1,n=e.reverse===1;return re({exclusive:t,reverse:n})}});var mg,fg,hg,Yd,Xd,Jd=G(()=>{"use strict";te();ae();Ie();ce();mg=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},fg=(e,t,n,r)=>{let o=[];o.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let a=0;a<t;++a)o.push(n.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},hg=(e,t)=>{let n,r,o,a,s,d,l=t.format==="NHWC",p=t.blocksize,f=t.mode==="DCR";l?([n,r,o,a]=e.dims,s=f?[n,r,o,p,p,a/p**2]:[n,r,o,a/p**2,p,p],d=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=f?[n,p,p,a/p**2,r,o]:[n,a/p**2,p,p,r,o],d=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),y=h.dims.length,_=e.dataType,b=P("a",_,y),w=N("output",_,y),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(b,w)}

  ${fg(d,y,b,w)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=l?[n,r*p,o*p,a/p**2]:[n,a/p**2,r*p,o*p],T=E.size(v),I=h.dims,A=E.sortBasedOnPerm(I,d);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...H(I,A)]}},getShaderSource:S}},Yd=(e,t)=>{mg(e.inputs),e.compute(hg(e.inputs[0],t))},Xd=e=>re({blocksize:e.blocksize,mode:e.mode,format:e.format})});var vo,tn,el,gg,yg,$o,xo,tl,bg,rl,nl,ol=G(()=>{"use strict";te();ae();Ie();ce();vo="[a-zA-Z]|\\.\\.\\.",tn="("+vo+")+",el="^"+tn+"$",gg="("+tn+",)*"+tn,yg="^"+gg+"$",$o=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,n){let r=this.symbolToIndices.get(t);r===void 0?r=[n]:r.push(n),this.symbolToIndices.set(t,r)}},xo=class{constructor(t,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=n.includes("->")?n.split("->",2):[n,""];if(!r.match(RegExp(yg)))throw new Error("Invalid LHS term");if(r.split(",").forEach((d,l)=>{let p=t[l].dims.slice();if(!d.match(RegExp(el)))throw new Error("Invalid LHS term");let f=this.processTerm(d,!0,p,l);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([d,l])=>l.count===1||d==="...").map(([d])=>d).join("");else if(!o.match(RegExp(tn)))throw new Error("Invalid RHS");o.match(RegExp(vo,"g"))?.forEach(d=>{if(d==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let l=this.symbolToInfo.get(d);if(l===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(l.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,n,r){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:n,inputIndices:[r]};this.symbolToInfo.set(t,o)}processTerm(t,n,r,o=-1){let a=r.length,s=!1,d=[],l=0;if(!t.match(RegExp(el))&&!n&&t!=="")throw new Error("Invalid LHS term");let p=t.match(RegExp(vo,"g")),f=new $o(o);return p?.forEach((h,y)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let _=a-p.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(d=r.slice(l,l+_),this.hasEllipsis){if(this.ellipsisDims.length!==d.length||this.ellipsisDims.toString()!==d.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=d;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<d.length;b++){let w=String.fromCharCode(48+b);f.addSymbol(w,y+b),this.addSymbol(w,r[l++],o)}}else f.addSymbol(h,y+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[l++],o)}),f}},tl=e=>e+"_max",bg=(e,t,n,r)=>{let a=e.map(f=>f.length).map((f,h)=>P(`input${h}`,t,f)),s=E.size(r),d=N("output",t,r.length),l=[...n.symbolToInfo.keys()].filter(f=>!n.rhs.symbolToIndices.has(f)),p=f=>{let h=[],y="var prod = 1.0;",_="var sum = 0.0;",b="sum += prod;",w=[],S=[],$=[],v=[],T=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((A,k)=>{if(n.rhs.symbolToIndices.has(k)){let O=n.rhs.symbolToIndices.get(k)?.[0];O!==void 0&&n.lhs.forEach((M,V)=>{if(A.inputIndices.includes(V)){let F=M.symbolToIndices.get(k);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(j=>{h.push(`${a[V].indicesSet(`input${V}Indices`,j,d.indicesGet("outputIndices",O))}`)})}})}else n.lhs.forEach((O,M)=>{if(A.inputIndices.includes(M)){let V=O.symbolToIndices.get(k);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(F=>{w.push(`${a[M].indicesSet(`input${M}Indices`,F,`${k}`)}`)}),v.push(`prod *= ${a[M].getByIndices(`input${M}Indices`)};`)}}),S.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${tl(k)}; ${k}++) {`),$.push("}")});let I=T?[...h,`let sum = ${a.map((A,k)=>A.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...h,_,...S,...w,y,...v,b,...$];return`
            ${f.registerUniforms(l.map(A=>({name:`${tl(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,d)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${d.offsetToIndices("global_idx")};
            ${a.map((A,k)=>`var input${k}Indices: ${a[k].type.indices};`).join(`
`)}
            ${I.join(`
`)};
            ${d.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let f=l.filter(y=>n.symbolToInfo.has(y)).map(y=>({type:12,data:n.symbolToInfo.get(y)?.dimValue||0}));f.push({type:12,data:s});let h=e.map((y,_)=>[...H(y)]).reduce((y,_)=>y.concat(_),f);return h.push(...H(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:p}},rl=(e,t)=>{let n=new xo(e.inputs,t.equation),r=n.outputDims,o=e.inputs.map((a,s)=>a.dims);e.compute(bg(o,e.inputs[0].dataType,n,r))},nl=e=>{let t=e.equation.replace(/\s+/g,"");return re({equation:t})}});var _g,il,wg,vg,al,sl=G(()=>{"use strict";te();ae();ce();_g=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;r<n.length&&o<t.length;++r,++o)if(n[r]!==t[o]&&n[r]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},il=(e,t)=>{let n=e.length-t.length,r=[];for(let o=0;o<n;++o)r.push(e[o]);for(let o=0;o<t.length;++o)r.push(t[o]===1?e[o+n]:t[o]);return r},wg=(e,t)=>e.length>t.length?il(e,t):il(t,e),vg=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=wg(t,n),o=e[0].dataType,a=o===9||E.size(t)===1,s=o===9||t.length>0&&t[t.length-1]%4===0?4:1,d=a||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(E.size(r)/d),p=h=>{let y=P("input",o,t.length,s),_=N("output",o,r.length,d),b;if(o===9){let w=(S,$,v="")=>`
          let outputIndices${$} = ${_.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${y.broadcastedIndicesToOffset(`outputIndices${$}`,_)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${v}(${y.getByOffset(`index${$}`)}[component${$}]);
        `;b=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${y.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${y.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(y,_)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},f=[{type:12,data:l},...H(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${d}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f})}},al=e=>{_g(e.inputs),e.compute(vg(e.inputs),{inputs:[0]})}});var $g,ul,dl=G(()=>{"use strict";te();ae();ce();jr();$g=e=>{let t=e[0].dataType,n=E.size(e[0].dims),r=E.size(e[1].dims),o=r%4===0,a=s=>{let d=P("x",t,[1],4),l=P("bias",t,[1],4),p=N("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,y=o?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${d.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(f).declareVariables(d,l,p)}

    ${mo(ze(t))}

    ${s.mainStart(Pt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${d.getByOffset("global_idx")};
      ${y}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",fo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/Pt/4)}})}},ul=e=>{e.inputs.length<2||E.size(e.inputs[1].dims)===0?od(e):e.compute($g(e.inputs))}});var xg,Sg,ll,cl,pl=G(()=>{"use strict";te();ae();Ie();ce();xg=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Sg=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=E.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(a,1,...r);let d=n[a],l=e[0].dataType===9?4:1,p=Math.ceil(E.size(s)/l),f=[{type:12,data:p},{type:6,data:d},{type:12,data:a},...H(e[0].dims,e[1].dims,s)],h=y=>{let _=P("data",e[0].dataType,e[0].dims.length,l),b=P("inputIndices",e[1].dataType,e[1].dims.length),w=N("output",e[0].dataType,s.length,l),S=v=>{let T=r.length,I=`var indicesIndices${v}  = ${b.type.indices}(0);`;for(let A=0;A<T;A++)I+=`${T>1?`indicesIndices${v}[${A}]`:`indicesIndices${v}`} = ${s.length>1?`outputIndices${v}[uniforms.axis + ${A}]`:`outputIndices${v}`};`;I+=`
          var idx${v} = ${b.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${_.type.indices};
        `;for(let A=0,k=0;A<o;A++)A===a?(I+=`${o>1?`dataIndices${v}[${A}]`:`dataIndices${v}`} = u32(idx${v});`,k+=T):(I+=`${o>1?`dataIndices${v}[${A}]`:`dataIndices${v}`} = ${s.length>1?`outputIndices${v}[${k}]`:`outputIndices${v}`};`,k++);return I},$;if(e[0].dataType===9){let v=(T,I,A="")=>`
          let outputIndices${I} = ${w.offsetToIndices(`outputOffset + ${I}u`)};
          ${S(I)};
          let offset${I} = ${_.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${T}[${I}] = ${A}(${_.getByOffset(`index${I}`)}[component${I}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,b,w)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},ll=e=>re({axis:e.axis}),cl=(e,t)=>{let n=e.inputs;xg(n),e.compute(Sg(e.inputs,t))}});var Tg,ml,fl,hl=G(()=>{"use strict";te();ae();ce();Tg=(e,t,n,r,o,a,s,d,l)=>{let p=[{type:12,data:a},{type:12,data:r},{type:12,data:o},{type:12,data:n},{type:12,data:s},{type:12,data:d},{type:12,data:l}],f=[a];p.push(...H(t.dims,f));let h=y=>{let _=P("indices_data",t.dataType,t.dims.length),b=N("input_slice_offsets_data",12,1,1),w=[_,b],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${y.registerUniforms(S).declareVariables(...w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},ml=(e,t)=>{let n=e.inputs,r=n[0].dims,o=n[0].dataType,a=n[1].dims,s=a[a.length-1],d=E.sizeToDimension(a,a.length-1),l=E.sizeFromDimension(r,t.batchDims+s),p=E.sizeToDimension(r,t.batchDims),f=E.sizeFromDimension(r,t.batchDims),h=d/p,y=new Array(s),_=l;for(let I=0;I<s;++I)y[s-1-I]=_,_*=r[t.batchDims+s-1-I];let b=Tg(e,n[1],y,t.batchDims,r,d,h,f,s),w=t.batchDims+s;if(w>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=a.slice(0,-1).concat(r.slice(w)),$=E.size(S),v=[{type:12,data:$},{type:12,data:l},...H(n[0].dims,b.dims,S)],T=I=>{let A=P("data",n[0].dataType,n[0].dims.length),k=P("slice_offsets",12,b.dims.length),O=N("output",n[0].dataType,S.length);return`
          ${I.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(A,k,O)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:o}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:T},{inputs:[n[0],b]})},fl=e=>({batchDims:e.batch_dims,cacheKey:""})});var Ig,Cg,gl,yl,bl=G(()=>{"use strict";te();ae();Ie();ce();Ig=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=E.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,o=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==o.dims.length||!o.dims.map((d,l)=>l===n?Math.ceil(d/r)===a.dims[l]:d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((d,l)=>d===a.dims[l]).reduce((d,l)=>d&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Cg=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,a=E.normalizeAxis(t.gatherAxis,o),s=E.normalizeAxis(t.quantizeAxis,o),d=n.slice(0);d.splice(a,1,...r);let l=E.size(d),p=e[2].dataType,h=e[0].dataType===22,y=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...H(...e.map((b,w)=>b.dims),d)],_=b=>{let w=P("data",e[0].dataType,e[0].dims.length),S=P("inputIndices",e[1].dataType,e[1].dims.length),$=P("scales",e[2].dataType,e[2].dims.length),v=e.length>3?P("zeroPoint",e[3].dataType,e[3].dims.length):void 0,T=N("output",p,d.length),I=[w,S,$];v&&I.push(v);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(A).declareVariables(...I,T)}
        ${b.mainStart()}
        let output_indices = ${T.offsetToIndices("global_idx")};
        var indices_indices = ${S.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${T.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${S.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${T.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${T.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${S.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[a]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${T.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${$.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${$.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${$.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${ze(p)}(quantized_data - zero_point) * scale;
        ${T.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,w)=>w!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,w)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:y}),getShaderSource:_}},gl=(e,t)=>{let n=e.inputs;Ig(n,t),e.compute(Cg(e.inputs,t))},yl=e=>re({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Ag,kg,_l,wl,vl=G(()=>{"use strict";te();ae();Ie();ce();Ag=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},kg=(e,t)=>{let n=e[0].dims,r=e[0].dataType,o=n.length,a=e[1].dims,s=e[1].dataType,d=E.normalizeAxis(t.axis,o),l=n[d],p=a.slice(0),f=E.size(p),h=P("input",r,o),y=P("indicesInput",s,a.length),_=N("output",r,p.length),b=[{type:12,data:f},{type:6,data:l},{type:12,data:d}];return b.push(...H(n,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,y,_)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${y.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},_l=e=>re({axis:e.axis}),wl=(e,t)=>{let n=e.inputs;Ag(n),e.compute(kg(e.inputs,t))}});var Eg,Pg,$l,xl,Sl=G(()=>{"use strict";te();ae();ce();Eg=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Pg=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[o,a,s]=Wr.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),d=[o,a];if(!d)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),f=Math.ceil(o/l),h=!0,y=E.size(d),_=[{type:12,data:h?p:y},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(_.push(...H(e[2].dims)),b.push("rank")),_.push(...H(d));let w=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",I=P("a",e[0].dataType,e[0].dims),A=P("b",e[1].dataType,e[1].dims),k=I.type.value,O=null,M=[I,A];e.length===3&&(O=P("c",e[2].dataType,e[2].dims.length),M.push(O));let V=N("output",e[0].dataType,d.length);M.push(V);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(F).declareVariables(...M)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${k}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${T}
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",V)}; value += ${k}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=$=>{let v=P("a",e[0].dataType,e[0].dims),T=P("b",e[1].dataType,e[1].dims),I=null,A=[v,T];e.length===3&&(I=P("c",e[2].dataType,e[2].dims.length),A.push(I));let k=N("output",e[0].dataType,d.length);A.push(k);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],M="",V="";t.transA&&t.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(O).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${k.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${V}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${M}
      }
      workgroupBarrier();
    }

    ${F}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${I!=null?`let cOffset = ${I.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${k.type.value}(uniforms.beta) * ${I.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:p*f},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:w}},$l=e=>{let t=e.transA,n=e.transB,r=e.alpha,o=e.beta;return{transA:t,transB:n,alpha:r,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},xl=(e,t)=>{Eg(e.inputs),e.compute(Pg(e.inputs,t))}});var pt,$t,Vt,Wt,zg,Og,Dg,Bg,Mg,Rg,Ug,Ng,Tl,Il,Cl=G(()=>{"use strict";te();ae();Ie();ce();[pt,$t,Vt,Wt]=[0,1,2,3],zg=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Og=`
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
`,Dg=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Bg=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Mg=e=>`
  ${e.paddingMode==="reflection"?`
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
`,Rg=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${pt}] = batch;
     indices[${$t}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Vt}] = u32(r);
            indices[${Wt}] = u32(c);
          }
        `;case"border":return`
          indices[${Vt}] = u32(clamp(r, 0, H - 1));
          indices[${Wt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Vt}] = gs_reflect(r, border[1], border[3]);
          indices[${Wt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Ug=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${pt}], indices[${$t}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${pt}], indices[${$t}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${pt}], indices[${$t}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${pt}], indices[${$t}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${pt}], indices[${$t}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${pt}], indices[${$t}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Ng=(e,t)=>{let n=P("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=P("grid",e[1].dataType,r.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[pt,$t,Vt,Wt]=[0,3,1,2]);let s=N("output",e[0].dataType,a.length),d=n.type.value,l=E.size(a),p=[{type:12,data:l},...H(e[0].dims,r,a)],f=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${Og}
  ${Dg(d)}
  ${Bg(t)}
  ${Mg(t)}
  ${Rg(n,d,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Vt}]);
      let W_in = i32(uniforms.x_shape[${Wt}]);

      ${t.alignCorners===0?`
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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${pt}], indices[${Vt}], indices[${Wt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Ug(s,d,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let y=E.size(a);return{outputs:[{dims:a,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:p}},getShaderSource:f}},Tl=(e,t)=>{zg(e.inputs),e.compute(Ng(e.inputs,t))},Il=e=>re({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Me,Lg,kl,Al,Gg,or,El,So=G(()=>{"use strict";te();ae();Ie();Vr();qr();ce();ct();Me=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Lg=(e,t)=>{let n=e[0],r=Me(e,1),o=Me(e,2),a=Me(e,3),s=Me(e,4),d=Me(e,5),l=Me(e,6),p=Me(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=n.dims[0],h=n.dims[1],y=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],_=h,b=0,w=0,S=Math.floor(y/t.numHeads);if(l&&p&&E.size(l.dims)&&E.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==f||l.dims[1]!==t.numHeads||l.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=l.dims[2],w=l.dims[2]}else if(l&&E.size(l.dims)||p&&E.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(r&&E.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,_=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,_=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,_=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(a&&E.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=b+_,T=0;if(s&&E.size(s.dims)>0){T=8;let O=s.dims;throw O.length===1?O[0]===f?T=1:O[0]===3*f+2&&(T=3):O.length===2&&O[0]===f&&O[1]===v&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,A=y;if(o&&E.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],I=!0}}let k=!1;if(s&&E.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(d&&E.size(d.dims)>0){if(d.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[2]!==h||d.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:h,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:y,vHiddenSize:A,headSize:S,vHeadSize:Math.floor(A/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:k,passPastInKv:I,qkvFormat:$}},kl=e=>re({...e}),Al=re({perm:[0,2,1,3]}),Gg=(e,t,n,r,o,a,s)=>{let d=[r,o,a],l=E.size(d),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],f=h=>{let y=N("qkv_with_bias",t.dataType,d),_=P("qkv",t.dataType,d),b=P("bias",n.dataType,d),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(w).declareVariables(_,b,y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:d,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:f},{inputs:[t,n],outputs:[-1]})[0]},or=(e,t,n,r,o,a,s,d)=>{let l=a;if(s&&E.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Gg(e,a,s,t,r,n*o,d),l=l.reshape([t,r,n,o]),n===1||r===1?l:e.compute(Oe(l,Al.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,r,n,o])),n===1||r===1?l:e.compute(Oe(l,Al.perm),{inputs:[l],outputs:[-1]})[0]},El=(e,t)=>{let n=Lg(e.inputs,t),r=e.inputs[0],o=Me(e.inputs,1),a=Me(e.inputs,2),s=Me(e.inputs,3),d=Me(e.inputs,4),l=Me(e.inputs,5),p=Me(e.inputs,6),f=Me(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let h=o&&a&&o.dims.length===4&&a.dims.length===4,y=or(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(h)return Nt(e,y,o,a,d,void 0,p,f,l,n);if(!o||!a)throw new Error("key and value must be provided");let _=or(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),b=or(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,a,s,2*n.hiddenSize);Nt(e,y,_,b,d,void 0,p,f,l,n)}});var Hg,Fg,qg,Kg,To,Pl,zl,Io=G(()=>{"use strict";te();ae();Ie();ce();Hg=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Fg=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>n.push(Number(o))),r=n.length),re({numOutputs:r,axis:t.axis,splitSizes:n})},qg=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Kg=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let o=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(o):r===0?n.push(`if (output_number == ${r}u) { ${o} }`):r===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${r}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},To=(e,t)=>{let n=e[0].dims,r=E.size(n),o=e[0].dataType,a=E.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),d=P("input",o,n.length),l=new Array(t.numOutputs),p=[],f=[],h=0,y=[{type:12,data:r}];for(let b=0;b<t.numOutputs;b++){h+=t.splitSizes[b],l[b]=h;let w=n.slice();w[a]=t.splitSizes[b],f.push(w),s[b]=N(`output${b}`,o,w.length),p.push({dims:f[b],dataType:e[0].dataType})}y.push({type:12,data:l},...H(n,...f));let _=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(d,...s)}
  ${qg(l.length)}
  ${Kg(s)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${d.offsetToIndices("global_idx")};
    var index = ${d.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${d.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:y})}},Pl=(e,t)=>{Hg(e.inputs);let n=e.inputs.length===1?t:Fg(e.inputs,t);e.compute(To(e.inputs,n),{inputs:[0]})},zl=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return re({axis:t,numOutputs:r,splitSizes:n})}});var jg,Zg,Ol,Dl,Bl=G(()=>{"use strict";Ie();qr();So();Io();ct();jg=(e,t)=>{if(t.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],o=e[2],a=e[3],s=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,l=n.dims[0],p=n.dims[1],f=n.dims.length===3?d?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],h=p,y=0,_=!r||r.dims.length===0,b=Math.floor(_?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);_&&(f=b*t.numHeads);let w=a&&a.dims.length!==0,S=s&&s.dims.length!==0;if(w&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&S){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=a.dims[2]}else if(w||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let T=0,I=!1,A=t.kvNumHeads?b*t.kvNumHeads:f;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(h!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(h!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],I=!0}}let k=e.length>4?e[5]:void 0;if(k&&k.dims.length!==1&&k.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:A,headSize:b,vHeadSize:Math.floor(A/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:T,scale:t.scale,broadcastResPosBias:!1,passPastInKv:I,qkvFormat:v}},Zg=re({perm:[0,2,1,3]}),Ol=(e,t,n)=>{let r=t,o=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),r=e.compute(Oe(r,Zg.perm),{inputs:[r],outputs:[-1]})[0]),r},Dl=(e,t)=>{let n=jg(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,d=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,f=n.kvNumHeads?n.kvNumHeads:n.numHeads,h=re({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,f*n.headSize,f*n.headSize]}),[y,_,b]=!o&&!a?e.compute(To([r],h),{inputs:[r],outputs:[-1,-1,-1]}):[r,o,a],w=or(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,y,void 0,0);Nt(e,w,Ol(e,_,n),Ol(e,b,n),void 0,void 0,s,d,void 0,n,l,p)}});var Ml,Qg,Yg,Rl,Ul=G(()=>{"use strict";te();ae();ct();ce();Ml=(e,t,n,r,o,a,s,d)=>{let l=ye(a),p=l===1?"f32":`vec${l}f`,f=l===1?"vec2f":`mat2x${l}f`,h=o*s,y=64;h===1&&(y=256);let _=[o,s,a/l],b=[o,s,2],w=["rank","type","type"],S=[];S.push(...H(_,b));let $=v=>{let T=P("x",t.dataType,3,l),I=P("scale",n.dataType,n.dims),A=P("bias",r.dataType,r.dims),k=N("output",1,3,2),O=[T,I,A,k];return`
  var<workgroup> workgroup_shared : array<${f}, ${y}>;
  const workgroup_size = ${y}u;
  ${v.declareVariables(...O)}
  ${v.mainStart(y)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Ke("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${Ke("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${d}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${d};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:h},programUniforms:S}),getShaderSource:$},{inputs:[t,n,r],outputs:[-1]})[0]},Qg=(e,t,n)=>{let r=t[0].dims,o=r,a=2,s=r[0],d=r[1],l=E.sizeFromDimension(r,a),p=ye(l),f=E.size(o)/p,h=Ml(e,t[0],t[1],t[2],s,l,d,n.epsilon),y=[s,d,l/p],_=[s,d],b=["type","none"],w=S=>{let $=P("x",t[0].dataType,y.length,p),v=P("scale_shift",1,_.length,2),T=N("output",t[0].dataType,y.length,p),I=[$,v,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...I)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...H(y,_,y)]}),getShaderSource:w},{inputs:[t[0],h]})},Yg=(e,t,n)=>{let r=t[0].dims,o=r,a=r[0],s=r[r.length-1],d=E.sizeFromDimension(r,1)/s,l=ye(s),p=E.size(o)/l,f=[{type:12,data:d},{type:12,data:Math.floor(s/l)}],h=["type","type"],y=!1,_=[0,r.length-1];for(let $=0;$<r.length-2;$++)y=y||r[$+1]!==1,_.push($+1);y=y&&r[r.length-1]!==1;let b=y?e.compute(Oe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},($,v)=>r[_[v]])),w=Ml(e,b,t[1],t[2],a,d,s,n.epsilon),S=$=>{let v=_e(t[0].dataType),T=l===1?"vec2f":`mat${l}x2f`,I=O=>{let M=O===0?"x":"y",V=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${V}(scale.${M}))`;case 2:return`vec2<${v}>(${V}(scale[0].${M}, scale[1].${M}))`;case 4:return`vec4<${v}>(${V}(scale[0].${M}, scale[1].${M}, scale[2].${M}, scale[3].${M}))`;default:throw new Error(`Not supported compoents ${l}`)}},A=P("input",t[0].dataType,t[0].dims,l),k=N("output",t[0].dataType,o,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${k.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${I(0)}, ${I(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:S},{inputs:[t[0],w]})},Rl=(e,t)=>{t.format==="NHWC"?Yg(e,e.inputs,t):Qg(e,e.inputs,t)}});var Xg,Jg,Nl,Vl=G(()=>{"use strict";te();ae();ce();Xg=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Jg=(e,t,n)=>{let r=t.simplified,o=e[0].dims,a=e[1],s=!r&&e[2],d=o,l=E.normalizeAxis(t.axis,o.length),p=E.sizeToDimension(o,l),f=E.sizeFromDimension(o,l),h=E.size(a.dims),y=s?E.size(s.dims):0;if(h!==f||s&&y!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${y}`);let _=[];for(let A=0;A<o.length;++A)A<l?_.push(o[A]):_.push(1);let b=ye(f),w=["type","type"],S=[{type:12,data:p},{type:1,data:f},{type:12,data:Math.floor(f/b)},{type:1,data:t.epsilon}];s&&w.push("type");let $=n>1,v=n>2,T=A=>{let k=_e(e[0].dataType),O=[P("x",e[0].dataType,e[0].dims,b),P("scale",a.dataType,a.dims,b)];s&&O.push(P("bias",s.dataType,s.dims,b)),O.push(N("output",e[0].dataType,d,b)),$&&O.push(N("mean_data_output",1,_)),v&&O.push(N("inv_std_output",1,_));let M=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(M).declareVariables(...O)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${uo("f32",b)};
    var mean_square_vector = ${uo("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${zt(k,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ke("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ke("mean_square_vector",b)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${zt(k,b,"x[j + offset]")};
      let f32scale = ${zt(k,b,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${zt(k,b,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:d,dataType:e[0].dataType}];return $&&I.push({dims:_,dataType:1}),v&&I.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${n};${r}`,inputDependencies:w},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:T}},Nl=(e,t)=>{Xg(e.inputs),e.compute(Jg(e.inputs,t,e.outputCount))}});var ey,Wl,Ll=G(()=>{"use strict";ae();Xr();Jr();ey=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Wl=e=>{ey(e.inputs);let t=tt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Yr(e.inputs,{activation:""},t));else{let o=t[t.length-2],a=E.size(e.inputs[0].dims.slice(0,-2)),s=E.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&o===1&&s===1){let d=e.inputs[0].reshape([1,a,r]),l=e.inputs[1].reshape([1,r,n]),p=[1,a,n],f=[d,l];e.compute(nr(f,{activation:""},t,p),{inputs:f})}else e.compute(nr(e.inputs,{activation:""},t))}}});var ty,ry,ny,Gl,Hl,Fl=G(()=>{"use strict";te();ae();Ie();ce();ty=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!E.areEqual(s.dims,[t.n,o,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(E.size(l)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let f=e[3].dims,h=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(E.size(f)!==h)throw new Error("zeroPoints input size error.")}},ry=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,d=n.slice(0,r-2),l=E.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=ye(t.k),_=ye(f),b=ye(s),w=d.concat([o,s]),S=o>1&&s/b%2===0?2:1,$=E.size(w)/b/S,v=64,T=[],I=[l,o,a/y],A=E.convertShape(e[1].dims).slice();A.splice(-1,1,f/_),T.push(...H(I)),T.push(...H(A)),T.push(...H(e[2].dims)),e.length===4&&T.push(...H(E.convertShape(e[3].dims)));let k=[l,o,s/b];T.push(...H(k));let O=M=>{let V=I.length,F=P("a",e[0].dataType,V,y),j=P("b",12,A.length,_),ne=P("scales",e[2].dataType,e[2].dims.length),W=[F,j,ne],J=e.length===4?P("zero_points",12,e[3].dims.length):void 0;J&&W.push(J);let ve=k.length,Q=N("output",e[0].dataType,ve,b),ee=_e(e[0].dataType),se=(()=>{switch(y){case 1:return`array<${ee}, 8>`;case 2:return`mat4x2<${ee}>`;case 4:return`mat2x4<${ee}>`;default:throw new Error(`${y}-component is not supported.`)}})(),Z=()=>{let Se=`
          // reuse a data
            var input_offset = ${F.indicesToOffset(`${F.type.indices}(batch, row, word_offset)`)};
            var a_data: ${se};
            for (var j: u32 = 0; j < ${8/y}; j++) {
              a_data[j] = ${F.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let D=0;D<b*S;D++)Se+=`
            b_value = ${_===1?`b${D}_data`:`b${D}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${se}(${Array.from({length:4},(R,Y)=>`${ee}(b_value_lower[${Y}]), ${ee}(b_value_upper[${Y}])`).join(", ")});
            b_dequantized_values = ${y===1?`${se}(${Array.from({length:8},(R,Y)=>`(b_quantized_values[${Y}] - ${J?`zero_point${D}`:"zero_point"}) * scale${D}`).join(", ")});`:`(b_quantized_values - ${se}(${Array(8).fill(`${J?`zero_point${D}`:"zero_point"}`).join(",")})) * scale${D};`};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(D/b)}]${b>1?`[${D%b}]`:""} += ${Array.from({length:8/y},(R,Y)=>`${y===1?`a_data[${Y}] * b_dequantized_values[${Y}]`:`dot(a_data[${Y}], b_dequantized_values[${Y}])`}`).join(" + ")};
          `;return Se},me=()=>{let Se=`
            var col_index = col * ${b};
            ${J?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ee}(8);`}
            `;for(let D=0;D<b*S;D++)Se+=`
            let scale${D} = ${ne.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${D} = ${ee}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Se},ke=()=>{let Se=`col_index = col * ${b};`;for(let D=0;D<b*S;D++)Se+=`
            let b${D}_data = ${j.getByIndices(`${j.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Se+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${se};
            var b_dequantized_values: ${se};`,Se};return`
        var<workgroup> workgroup_shared: array<${Q.type.value}, ${S*v}>;
        ${M.declareVariables(...W,Q)}
        ${M.mainStart([v,1,1])}
          let output_indices = ${Q.offsetToIndices(`(global_idx / ${v}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/y};
            ${me()}
            for (var word: u32 = 0; word < ${f}; word += ${_}) {
              ${ke()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${Z()}
                word_offset += ${8/y};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${Q.type.value} = ${Q.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${Q.setByIndices(`${Q.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${y};${_};${b};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:h}],dispatchGroup:{x:$},programUniforms:T}),getShaderSource:O}},ny=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],a=t.k,s=t.n,d=n.slice(0,r-2),l=E.size(d),f=e[1].dims[2]/4,h=e[0].dataType,y=ye(t.k),_=ye(f),b=d.concat([o,s]),w=128,S=s%8===0?8:s%4===0?4:1,$=w/S,v=$*_*8,T=v/y,I=v/t.blockSize,A=E.size(b)/S,k=[],O=[l,o,a/y],M=E.convertShape(e[1].dims).slice();M.splice(-1,1,f/_),k.push(...H(O)),k.push(...H(M)),k.push(...H(e[2].dims)),e.length===4&&k.push(...H(E.convertShape(e[3].dims)));let V=[l,o,s];k.push(...H(V));let F=j=>{let ne=O.length,W=P("a",e[0].dataType,ne,y),J=P("b",12,M.length,_),ve=P("scales",e[2].dataType,e[2].dims.length),Q=[W,J,ve],ee=e.length===4?P("zero_points",12,e[3].dims.length):void 0;ee&&Q.push(ee);let se=V.length,Z=N("output",e[0].dataType,se),me=_e(e[0].dataType),ke=()=>{switch(y){case 1:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${me}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${me}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${y}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${Z.type.value}, ${$}>, ${S}>;
        ${j.declareVariables(...Q,Z)}
        ${j.mainStart([$,S,1])}
          let output_indices = ${Z.offsetToIndices(`workgroup_index * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${W.getByIndices(`${W.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${W.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${ee?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${me}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${me}(8);`}
            let scale = ${ve.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${J.getByIndices(`${J.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/y};
            for (var i: u32 = 0; i < ${_}; i++) {
              ${ke()}
              let b_value = ${_===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${me}>(${Array.from({length:4},(Se,D)=>`${me}(b_value_lower[${D}]), ${me}(b_value_upper[${D}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${me}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Se,D)=>`${`dot(a_data${D}, b_dequantized_values[${D}])`}`).join(" + ")};
              word_offset += ${8/y};
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${y};${_};${$};${S}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:h}],dispatchGroup:{x:A},programUniforms:k}),getShaderSource:F}},Gl=(e,t)=>{ty(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(ny(e.inputs,t)):e.compute(ry(e.inputs,t))},Hl=e=>re(e)});var oy,iy,ay,sy,uy,dy,ly,cy,ql,Kl=G(()=>{"use strict";te();ae();ce();oy=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},iy=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
            k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},ay=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},sy=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",o,t)})) {
                  k = i32(${K("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},uy=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${K("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",o,t)})) {
                  k -= i32(${K("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},dy=(e,t,n)=>{switch(n.mode){case 0:return iy(e,t,n.pads.length);case 1:return ay(e,t,n.pads.length);case 2:return sy(e,t,n.pads.length);case 3:return uy(e,t,n.pads.length);default:throw new Error("Invalid mode")}},ly=(e,t)=>{let n=E.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,o=E.size(n),a=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...H(e[0].dims,n));let d=["rank"],l=p=>{let f=N("output",e[0].dataType,n.length),h=P("x",e[0].dataType,r.length),y=h.type.value,_=dy(f,r.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:s?y:"f32"}),`
            ${p.registerUniforms(b).declareVariables(h,f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${y}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(n)/64)},programUniforms:a}),getShaderSource:l}},cy=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let d=e[3].getBigInt64Array();for(let l=0;l<d.length;l++)a[Number(d[l])]=Number(n[l]),a[Number(d[l])+o]=Number(n[l+d.length])}else n.forEach((d,l)=>a[Number(l)]=Number(d));let s=[];return a.forEach(d=>s.push(d)),{mode:t.mode,value:r,pads:s}}else return t},ql=(e,t)=>{oy(e.inputs);let n=cy(e.inputs,t);e.compute(ly(e.inputs,n),{inputs:[0]})}});var rn,jl,Zl,Ql,Yl,py,my,Xl,Jl,ec,tc,rc,nc,oc,ic,ac,sc,uc,dc,lc=G(()=>{"use strict";Ge();te();ae();ce();rn=e=>{if(we.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},jl=(e,t,n)=>{let r=t.format==="NHWC",o=e.dims.slice();r&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),d=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();Et.adjustPoolAttributes(n,o,s,d,l,p);let f=Et.computePoolOutputShape(n,o,d,l,s,p,t.autoPad),h=Object.assign({},t);a?Object.assign(h,{kernelShape:s,strides:d,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:d,pads:p,cacheKey:t.cacheKey});let y=f.slice();return y.push(y.splice(1,1)[0]),[h,r?y:f]},Zl=(e,t)=>{let n=t.format==="NHWC",r=E.size(e),o=E.size(t.kernelShape),a=[{type:12,data:r},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let d=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],h=!!(p+f);a.push({type:12,data:d},{type:12,data:l},{type:12,data:p},{type:12,data:f}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let y=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];y=!!(w+S),a.push({type:12,data:_},{type:12,data:b},{type:12,data:w},{type:12,data:S}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,h,y]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let d=E.computeStrides(t.kernelShape);a.push({type:12,data:d},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:d.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,f)=>p+f);return[a,s,!!l,!1,!1]}},Ql=(e,t,n,r,o,a,s,d,l,p,f,h)=>{let y=o.format==="NHWC",_=t.type.value,b=N("output",t.type.tensor,r);if(o.kernelShape.length<=2){let w="",S="",$="",v=n-(y?2:1);if(f?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,o.kernelShape.length===2){let I=n-(y?3:2);h?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${I}] < 0 || xIndices[${I}] >= uniforms.x_shape[${I}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${I}] = indices[${I}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${_}(${d});
              var pad = 0;
              ${S}
              ${w}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(y)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=o.kernelShape.length,S=o.pads.length,$="";return p?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${_}(${d});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${n-w}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${n-w}u`,w)}
                    + offsets[j - ${n-w}u] - ${K("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},Yl=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,py=e=>`${Yl(e)};${e.countIncludePad}`,my=e=>`${Yl(e)};${e.storageOrder};${e.dilations}`,Xl=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Jl=(e,t,n,r)=>{let[o,a]=jl(t,r,n),s=P("x",t.dataType,t.dims.length),d=s.type.value,l="value += x_val;",p="";o.countIncludePad?p+=`value /= ${d}(uniforms.kernelSize);`:p+=`value /= ${d}(i32(uniforms.kernelSize) - pad);`;let[f,h,y,_,b]=Zl(a,o);f.push(...H(t.dims,a));let w=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${y};${_};${b}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:f}),getShaderSource:S=>Ql(S,s,t.dims.length,a.length,o,l,p,0,h,y,_,b)}},ec=e=>{let t=e.count_include_pad!==0,n=Xl(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:py(r)}},tc=(e,t)=>{rn(e.inputs),e.compute(Jl("AveragePool",e.inputs[0],!1,t))},rc={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},nc=e=>{let t=e.format;return{format:t,...rc,cacheKey:t}},oc=(e,t)=>{rn(e.inputs),e.compute(Jl("GlobalAveragePool",e.inputs[0],!0,t))},ic=(e,t,n,r)=>{let[o,a]=jl(t,r,n),s=`
      value = max(x_val, value);
    `,d="",l=P("x",t.dataType,t.dims.length),p=["rank"],[f,h,y,_,b]=Zl(a,o);return f.push(...H(t.dims,a)),{name:e,shaderCache:{hint:`${r.cacheKey};${y};${_};${b}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:f}),getShaderSource:w=>Ql(w,l,t.dims.length,a.length,o,s,d,t.dataType===10?-65504:-1e5,h,y,_,b)}},ac=(e,t)=>{rn(e.inputs),e.compute(ic("MaxPool",e.inputs[0],!1,t))},sc=e=>{let t=e.storage_order,n=e.dilations,r=Xl(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...r,cacheKey:""};return{...o,cacheKey:my(o)}},uc=e=>{let t=e.format;return{format:t,...rc,cacheKey:t}},dc=(e,t)=>{rn(e.inputs),e.compute(ic("GlobalMaxPool",e.inputs[0],!0,t))}});var hy,gy,cc,pc,mc=G(()=>{"use strict";te();ae();Ie();ce();hy=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,a)=>a===t.axis||o===e[0].dims[a]).reduce((o,a)=>o&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},gy=(e,t)=>{let n=E.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,o=r===3,a=e[0].dims,s=e[1].dataType,d=E.size(a),l=r===3||r===2,p=l?[Math.ceil(E.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,h=e.length>2?e[2]:void 0,y=h?l?[Math.ceil(E.size(h.dims)/4)]:h.dims:void 0,_=f.length===0||f.length===1&&f[0]===1,b=_===!1&&f.length===1,w=ye(d),S=_&&(!l||w===4),$=S?w:1,v=S&&!l?w:1,T=P("input",l?12:r,p.length,v),I=P("scale",s,f.length),A=h?P("zero_point",l?12:r,y.length):void 0,k=N("output",s,a.length,$),O=[T,I];A&&O.push(A);let M=[p,f];h&&M.push(y);let V=[{type:12,data:d/$},{type:12,data:n},{type:12,data:t.blockSize},...H(...M,a)],F=j=>{let ne=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${j.registerUniforms(ne).declareVariables(...O,k)}
      ${j.mainStart()}
          ${j.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${k.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${I.getByOffset("0")}`:b?`
            let scale_index = ${k.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};`:`
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${I.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A?_?l?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:b?l?`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${l?o?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${k.setByOffset("global_idx",`${k.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:V})}},cc=(e,t)=>{hy(e.inputs,t),e.compute(gy(e.inputs,t))},pc=e=>re({axis:e.axis,blockSize:e.blockSize})});var yy,by,fc,hc=G(()=>{"use strict";Ge();te();ce();yy=(e,t,n)=>{let r=e===t,o=e<t&&n<0,a=e>t&&n>0;if(r||o||a)throw new Error("Range these inputs' contents are invalid.")},by=(e,t,n,r)=>{let o=Math.abs(Math.ceil((t-e)/n)),a=[o],s=o,d=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...H(a)],l=p=>{let f=N("output",r,a.length),h=f.type.value,y=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(y).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d})}},fc=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),we.webgpu.validateInputContent&&yy(t,n,r),e.compute(by(t,n,r,e.inputs[0].dataType),{inputs:[]})}});var _y,wy,gc,yc,bc=G(()=>{"use strict";te();ae();Ie();ce();_y=(e,t,n,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let o=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${n};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${n}));`:`
              ${o}bitcast<${r}>(oldValue) + (${n})${a}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${n}));`:`
                ${o}max(bitcast<f32>(oldValue), (${n}))${a}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${n}));`:`${o}min(bitcast<${r}>(oldValue), (${n}))${a}`;case"mul":return`${o}(bitcast<${r}>(oldValue) * (${n}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},wy=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n,a=1,s=Math.ceil(E.size(r)/a),d=r[r.length-1],l=E.sizeFromDimension(n,d),p=[{type:12,data:s},{type:12,data:d},{type:12,data:l},...H(e[1].dims,e[2].dims,o)],f=h=>{let y=P("indices",e[1].dataType,e[1].dims.length),_=P("updates",e[2].dataType,e[2].dims.length,a),b=t.reduction!=="none"&&t.reduction!==""?Fs("output",e[0].dataType,o.length):N("output",e[0].dataType,o.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(y,_,b)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${E.size(r)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
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
    ${_y(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:f}},gc=e=>re({reduction:e.reduction}),yc=(e,t)=>{e.compute(wy(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var vy,$y,xy,_c,Sy,Ty,Iy,Cy,Ay,ky,Ey,Py,wc,zy,Oy,Dy,By,My,vc,$c,xc=G(()=>{"use strict";te();ae();Ie();ce();vy=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},$y=(e,t,n)=>{t.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((o,a)=>r[o]=e[a]),r},xy=(e,t,n,r,o,a)=>{let[s,d,l]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(f=>a.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0){if(e[d].getFloat32Array().forEach(f=>r.push(f)),r.length!==0&&r.length!==p&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");vy(r,t),t.axes.length>0&&$y(r,t.axes,p).forEach((f,h)=>r[h]=f)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==p&&n>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof o<"u"&&r.length>0&&o.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},_c=(e,t,n,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${n}));
  let fract = ${r}(big % (${n})) / ${r}(${n});
  return whole + fract;
`,Sy=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${_c("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${_c("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Ty=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Iy=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),o=e.length===0?r:e.slice();return t.length>0?(t.forEach((a,s)=>{r[a]=o[s],r[s+n]=o[t.length+s]}),r):o},Cy=(e,t,n,r)=>{let o=[];if(n.length>0)if(r.length>0){if(e.forEach(a=>o.push(a)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((a,s)=>o[a]=n[s])}else n.forEach(a=>o.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((a,s)=>Math.round(a*t[s]))}return o},Ay=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(a=>t[a]=r),n.axes.forEach(a=>o[a]=Math.round(e[a]*t[a]))):(t.fill(r,0,t.length),o.forEach((a,s)=>o[s]=Math.round(a*t[s]))),o},ky=(e,t,n,r,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",r)};
        var roi_low = ${K("uniforms.roi","i",o)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ey=(e,t,n,r,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",a)};
          var roi_hi = ${K("uniforms.roi",`i + ${n.length}`,a)};
          var input_shape_i = ${K("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Py=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,wc=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",zy=(e,t,n,r,o)=>{let[s,d,l,p]=n.length===2?[-1,0,1,-1]:[0,2,3,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(row, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${n[l]} - 1))`)};
      ${wc(e,p,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${f} = originalIndices[${d}];
      var col:${f} = originalIndices[${l}];
      ${r?`if (row < 0 || row > (${n[d]} - 1) || col < 0 || col > (${n[l]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[d]} - 1));
      col = max(0, min(col, ${n[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${f} = getInputValue(batch, channel, row1, col1);
      var x12: ${f} = getInputValue(batch, channel, row1, col2);
      var x21: ${f} = getInputValue(batch, channel, row2, col1);
      var x22: ${f} = getInputValue(batch, channel, row2, col2);
      var dx1: ${f} = abs(row - ${f}(row1));
      var dx2: ${f} = abs(${f}(row2) - row);
      var dy1: ${f} = abs(col - ${f}(col1));
      var dy2: ${f} = abs(${f}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Oy=(e,t,n,r,o,a,s,d,l,p)=>{let f=n.length===2,h=!0,[y,_]=f?[0,1]:h?[2,3]:[1,2],b=e.type.value,w=S=>{let $=S===y?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${b} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${b} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[S]},
        ${r[S]}, ${n[S]}, ${a[S]}, ${a[S]} + ${n.length});
        var fractOriginalIdx: ${b} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${d} && (originalIdx < 0 || originalIdx > (${n[S]} - 1))) {
          return ${l};
        }
        var data: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${b} = originalIdx + ${b}(i);
          if (${$} < 0 || ${$} >= ${n[S]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:d?`return ${l};`:`${$} = max(0, min(${$}, ${n[S]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===y?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(y)};
    ${w(_)};
  fn getCubicInterpolationCoefs(s: ${b}) -> array<${b}, 4> {
    var absS = abs(s);
    var coeffs: array<${b}, 4> = array<${b}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${b} = 1.0 - absS;
    var twoMinusAbsS: ${b} = 2.0 - absS;
    var onePlusAbsS: ${b} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${b}, 4>, coefs: array<${b}, 4>) -> ${b} {
    var coefsSum: ${b} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${b} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Dy=(e,t,n,r,o)=>{let[s,d,l,p,f]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",d,`max(0, min(depth, ${n[d]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${n[l]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${n[p]} - 1))`)};
      ${wc(e,f,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${d}];
      var height:${h} = originalIndices[${l}];
      var width:${h} = originalIndices[${p}];
      ${r?`if (depth < 0 || depth > (${n[d]} - 1) || height < 0 || height > (${n[l]} - 1) || width < 0 || (width > ${n[p]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[d]} - 1));
      height = max(0, min(height, ${n[l]} - 1));
      width = max(0, min(width, ${n[p]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${f}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
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
    }`},By=(e,t,n,r,o,a)=>{let s=e.dims,d=Iy(a,t.axes,s.length),l=Cy(s,r,o,t.axes),p=r.slice();r.length===0&&(p=s.map((v,T)=>v===0?1:l[T]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=Ay(s,p,t)));let f=N("output",e.dataType,l.length),h=P("input",e.dataType,s.length),y=E.size(l),_=s.length===l.length&&s.every((v,T)=>v===l[T]),b=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,S=h.type.value,$=v=>`
      ${_?"":`
      ${Sy(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Py(h,s)};
              ${Ty(t.nearestMode,n,S)};
              ${Ey(h,f,s,l,p.length,d.length,b)};
              `;case"linear":return`
              ${ky(f,s,l,p.length,d.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${zy(h,f,s,b,w)}`;if(s.length===3||s.length===5)return`${Dy(h,f,s,b,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Oy(h,f,s,l,p,d,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",d.length).declareVariables(h,f)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${o.length>0?o:""}|${d.length>0?d:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},{type:1,data:p},{type:1,data:d},...H(s,l)]})}},My=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},vc=(e,t)=>{let n=[],r=[],o=[],a=My(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");xy(e.inputs,t,a,n,r,o),e.compute(By(e.inputs[0],t,a,n,r,o),{inputs:[0]})},$c=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,o=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,d=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return re({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:d,mode:l,nearestMode:p})}});var Ry,Uy,Sc,Tc=G(()=>{"use strict";te();ae();Ie();ce();Ry=(e,t)=>{let[n,r,o,a]=e,{numHeads:s,rotaryEmbeddingDim:d}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!E.areEqual(r.dims,[])&&!E.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!E.areEqual(o.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(d>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=n.dims[0],p=n.dims[n.dims.length-2],f=o.dims[0],h=E.sizeFromDimension(n.dims,1)/p,y=d===0?o.dims[1]*2:h/s;if(d>y)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(p!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(y/2!==o.dims[1]&&d/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(p>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Uy=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],d=E.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=d/l,f=e[2].dims[1],h=o===0?f*2:p/r,y=new Array(s,l,p/h,h-f),_=E.computeStrides(y),b=[{type:1,data:a},{type:12,data:y},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[d,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[d,h,l*h,1]}):[],...H(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=S=>{let $=P("input",e[0].dataType,e[0].dims.length),v=P("position_ids",e[1].dataType,e[1].dims.length),T=P("cos_cache",e[2].dataType,e[2].dims.length),I=P("sin_cache",e[3].dataType,e[3].dims.length),A=N("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:y.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables($,v,T,I,A)}

        ${S.mainStart(Pt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",N("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:re({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(y)/Pt)},programUniforms:b})}},Sc=(e,t)=>{Ry(e.inputs,t),e.compute(Uy(e.inputs,t))}});var Ny,Vy,Ic,Cc=G(()=>{"use strict";te();ae();ce();Ny=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Vy=(e,t,n,r)=>{let o=t.simplified,a=e[0].dims,s=E.size(a),d=a,l=s,p=a.slice(-1)[0],f=r?a.slice(0,-1).concat(1):[],h=!o&&e.length>3,y=e.length>4,_=r&&n>1,b=r&&n>2,w=n>3,S=64,$=ye(p),v=[{type:12,data:l},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],T=A=>{let k=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[P("x",e[0].dataType,e[0].dims,$),P("skip",e[1].dataType,e[1].dims,$),P("gamma",e[2].dataType,e[2].dims,$)];h&&O.push(P("beta",e[3].dataType,e[3].dims,$)),y&&O.push(P("bias",e[4].dataType,e[4].dims,$)),O.push(N("output",e[0].dataType,d,$)),_&&O.push(N("mean_output",1,f)),b&&O.push(N("inv_std_output",1,f)),w&&O.push(N("input_skip_bias_sum",e[0].dataType,d,$));let M=_e(e[0].dataType),V=_e(1,$);return`

      ${A.registerUniforms(k).declareVariables(...O)}
      var<workgroup> sum_shared : array<${V}, ${S}>;
      var<workgroup> sum_squared_shared : array<${V}, ${S}>;

      ${A.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${y?"bias[offset1d + i]":M+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${zt(M,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
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
        let mean = ${Ke("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ke("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${M}(mean)`}) *
            ${M}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:d,dataType:e[0].dataType}];return n>1&&I.push({dims:f,dataType:1}),n>2&&I.push({dims:f,dataType:1}),n>3&&I.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${_};${b};${w}`,inputDependencies:e.map((A,k)=>"type")},getShaderSource:T,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:v})}},Ic=(e,t)=>{Ny(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Vy(e.inputs,t,e.outputCount,!1),{outputs:r})}});var Wy,nn,Ly,Ac,Gy,Hy,kc,Ec,Pc=G(()=>{"use strict";te();ae();Ie();ce();Wy=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},nn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},Ly=(e,t)=>{if(e.length>1){let n=nn(e,1),r=nn(e,2),o=nn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),re({starts:n,ends:r,axes:o})}else return t},Ac=(e,t,n,r,o)=>{let a=e;return e<0&&(a+=n[r[t]]),o[t]<0?Math.max(0,Math.min(a,n[r[t]]-1)):Math.max(0,Math.min(a,n[r[t]]))},Gy=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",n.length)};
            let steps_i = ${K("uniforms.steps","i",n.length)};
            let signs_i = ${K("uniforms.signs","i",n.length)};
            let starts_i = ${K("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Hy=(e,t)=>{let n=e[0].dims,r=E.size(n),o=t.axes.length>0?E.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],a=nn(e,4);a.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(o.length).fill(1));let s=t.starts.map(($,v)=>Ac($,v,n,o,a)),d=t.ends.map(($,v)=>Ac($,v,n,o,a));if(o.length!==s.length||o.length!==d.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let $=0;$<n.length;++$)o.includes($)||(s.splice($,0,0),d.splice($,0,n[$]),a.splice($,0,1));let l=a.map($=>Math.sign($));a.forEach(($,v,T)=>{if($<0){let I=(d[v]-s[v])/$,A=s[v],k=A+I*a[v];s[v]=k,d[v]=A,T[v]=-$}});let p=n.slice(0);o.forEach(($,v)=>{p[$]=Math.ceil((d[$]-s[$])/a[$])});let f={dims:p,dataType:e[0].dataType},h=N("output",e[0].dataType,p.length),y=P("input",e[0].dataType,e[0].dims.length),_=E.size(p),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:a},...H(e[0].dims,p)],S=$=>`
      ${$.registerUniforms(b).declareVariables(y,h)}
        ${Gy(y,h,n)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",y.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:w})}},kc=(e,t)=>{Wy(e.inputs,t);let n=Ly(e.inputs,t);e.compute(Hy(e.inputs,n),{inputs:[0]})},Ec=e=>{let t=e.starts,n=e.ends,r=e.axes;return re({starts:t,ends:n,axes:r})}});var Fy,qy,zc,Oc,Dc=G(()=>{"use strict";te();ae();Ie();ct();ce();Fy=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},qy=(e,t)=>{let n=e.inputs[0],r=n.dims,o=E.size(r),a=r.length,s=E.normalizeAxis(t.axis,a),d=s<r.length-1,l,p=[];d?(p=Array.from({length:a},(O,M)=>M),p[s]=a-1,p[a-1]=s,l=e.compute(Oe(n,p),{inputs:[n],outputs:[-1]})[0]):l=n;let f=l.dims,h=f[a-1],y=o/h,_=ye(h),b=h/_,w=64;y===1&&(w=256);let S=(O,M)=>M===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:M===2?`max(${O}.x, ${O}.y)`:M===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,$=P("x",l.dataType,l.dims,_),v=N("result",l.dataType,l.dims,_),T=$.type.value,I=_e(l.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,A=O=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${O.registerUniform("packedCols","i32").declareVariables($,v)}
      ${O.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${I}
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
          rowMaxShared = ${T}(${S("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
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
          rowSumShared = ${T}(${Ke("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,k=e.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:l.dataType}],dispatchGroup:{x:y},programUniforms:[{type:6,data:b}]}),getShaderSource:A},{inputs:[l],outputs:[d?-1:0]})[0];d&&e.compute(Oe(k,p),{inputs:[k]})},zc=(e,t)=>{Fy(e.inputs),qy(e,t)},Oc=e=>re({axis:e.axis})});var Bc,Ky,jy,Zy,Mc,Rc=G(()=>{"use strict";te();ae();ce();Bc=e=>Array.from(e.getBigInt64Array(),Number),Ky=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Bc(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},jy=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Zy=(e,t)=>{let n=e[0].dims,r=t??Bc(e[1]),o=jy(n,r),a=E.size(o),s=e[0].dataType,d=P("input",s,n.length),l=N("output",s,o.length),p=f=>`
      const inputShape = ${d.indices(...n)};
      ${f.registerUniform("output_size","u32").declareVariables(d,l)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${d.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${d.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${d.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",d.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...H(e[0].dims,o)]}),getShaderSource:p}},Mc=e=>{Ky(e.inputs),e.compute(Zy(e.inputs),{inputs:[0]})}});var Qy,Yy,Uc,Nc=G(()=>{"use strict";te();ae();ce();Qy=(e,t,n,r,o)=>{let a=N("output_data",o,n.length,4),s=P("a_data",t[1].dataType,t[1].dims.length,4),d=P("b_data",t[2].dataType,t[2].dims.length,4),l=P("c_data",t[0].dataType,t[0].dims.length,4),p,f=(h,y,_)=>`select(${y}, ${h}, ${_})`;if(!r)p=a.setByOffset("global_idx",f(s.getByOffset("global_idx"),d.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(y,_,b="")=>{let w=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,$=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${y}[${_}] = ${b}(${f(w,S,$)});
          `};o===9?p=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,d,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Yy=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,o=e[1].dataType,a=!(E.areEqual(t,n)&&E.areEqual(n,r)),s=t,d=E.size(t);if(a){let p=tt.calcShape(tt.calcShape(t,n,!1),r,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,d=E.size(s)}let l=Math.ceil(d/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Qy(p,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:l},...H(r,t,n,s)]})}},Uc=e=>{e.compute(Yy(e.inputs))}});var Vc,Wc=G(()=>{"use strict";wu();qr();xu();Tu();ld();vd();Sd();Vd();Kd();Qd();Jd();ol();sl();dl();pl();hl();bl();vl();Sl();Cl();Bl();Ul();Vl();Ll();Fl();So();Kl();lc();mc();hc();bc();Hr();xc();Tc();Cc();Pc();Dc();Io();Rc();ct();jr();Nc();Vc=new Map([["Abs",[Iu]],["Acos",[Cu]],["Acosh",[Au]],["Add",[cd]],["ArgMax",[_u,co]],["ArgMin",[bu,co]],["Asin",[ku]],["Asinh",[Eu]],["Atan",[Pu]],["Atanh",[zu]],["Attention",[vu]],["AveragePool",[tc,ec]],["BatchNormalization",[$u]],["BiasAdd",[Su]],["BiasSplitGelu",[dd]],["Cast",[Du,Ou]],["Ceil",[Mu]],["Clip",[Bu]],["Concat",[$d,xd]],["Conv",[wo,_o]],["ConvTranspose",[qd,Hd]],["Cos",[Ru]],["Cosh",[Uu]],["CumSum",[jd,Zd]],["DepthToSpace",[Yd,Xd]],["DequantizeLinear",[cc,pc]],["Div",[pd]],["Einsum",[rl,nl]],["Elu",[Nu,tr]],["Equal",[md]],["Erf",[Vu]],["Exp",[Wu]],["Expand",[al]],["FastGelu",[ul]],["Floor",[Lu]],["FusedConv",[wo,_o]],["Gather",[cl,ll]],["GatherElements",[wl,_l]],["GatherBlockQuantized",[gl,yl]],["GatherND",[ml,fl]],["Gelu",[Gu]],["Gemm",[xl,$l]],["GlobalAveragePool",[oc,nc]],["GlobalMaxPool",[dc,uc]],["Greater",[yd]],["GreaterOrEqual",[_d]],["GridSample",[Tl,Il]],["GroupQueryAttention",[Dl]],["HardSigmoid",[Yu,Qu]],["InstanceNormalization",[Rl]],["LayerNormalization",[Nl]],["LeakyRelu",[Hu,tr]],["Less",[bd]],["LessOrEqual",[wd]],["Log",[ad]],["MatMul",[Wl]],["MatMulNBits",[Gl,Hl]],["MaxPool",[ac,sc]],["Mul",[fd]],["MultiHeadAttention",[El,kl]],["Neg",[qu]],["Not",[Fu]],["Pad",[ql]],["Pow",[hd]],["QuickGelu",[sd,tr]],["Range",[fc]],["Reciprocal",[Ku]],["ReduceMin",[pu]],["ReduceMean",[su]],["ReduceMax",[cu]],["ReduceSum",[fu]],["ReduceProd",[mu]],["ReduceL1",[uu]],["ReduceL2",[du]],["ReduceLogSum",[gu]],["ReduceLogSumExp",[lu]],["ReduceSumSquare",[hu]],["Relu",[ju]],["Resize",[vc,$c]],["RotaryEmbedding",[Sc]],["ScatterND",[yc,gc]],["Sigmoid",[Zu]],["Sin",[Xu]],["Sinh",[Ju]],["Slice",[kc,Ec]],["SkipLayerNormalization",[Ic]],["Split",[Pl,zl]],["Sqrt",[ed]],["Softmax",[zc,Oc]],["Sub",[gd]],["Tan",[td]],["Tanh",[nd]],["ThresholdedRelu",[id,tr]],["Tile",[Mc]],["Transpose",[js,Zs]],["Where",[Uc]]])});var on,Lc=G(()=>{"use strict";Ge();et();ce();on=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,n){this.repo.set(t,n)}run(t,n,r,o,a){Ne(t.programInfo.name);let s=this.backend.device,d=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let f of n)l.push({binding:l.length,resource:{buffer:f.buffer}});for(let f of r)l.push({binding:l.length,resource:{buffer:f.buffer}});a&&l.push({binding:l.length,resource:a});let p=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:p,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}d.setPipeline(t.computePipeline),d.setBindGroup(0,p),d.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Be(t.programInfo.name)}dispose(){}build(t,n){Ne(t.name);let r=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(h=>{r.features.has(h.feature)&&o.push(`enable ${h.extension};`)});let s=qs(n,this.backend.device.limits),d=t.getShaderSource(s),l=`${o.join(`
`)}
${s.additionalImplementations}
${d}`,p=r.createShaderModule({code:l,label:t.name});pe("verbose",()=>`[WebGPU] ${t.name} shader code: ${l}`);let f=r.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:t.name});return Be(t.name),{programInfo:t,computePipeline:f,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let n=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=a&&r<=a&&o<=a)return[n,r,o];let s=n*r*o,d=Math.ceil(Math.sqrt(s));if(d>a){if(d=Math.ceil(Math.cbrt(s)),d>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[d,d,d]}else return[d,d,1]}}});var Xy,Jy,Co,Ao,an,Gc=G(()=>{"use strict";Ge();te();et();Jn();Ls();Wc();Lc();Xy=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let o=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let a=e[r].dims.length;n.push(`${o};${a}`);break}case"dims":{let a=e[r].dims.join(",");n.push(`${o};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Jy=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Xy(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},Co=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Ao=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let n=t.limits;!this.subgroupsSupported||!n.minSubgroupSize||!n.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[n.minSubgroupSize,n.maxSubgroupSize]}},an=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,n){this.env=t;let r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=s=>n.features.has(s)&&r.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups")&&a("subgroups-f16"),this.device=await n.requestDevice(o),this.deviceInfo=new Ao(this.device),this.adapterInfo=new Co(n.info||await n.requestAdapterInfo()),this.gpuDataManager=Ws(this),this.programManager=new on(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ur(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ne(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let o=0;o<n.length/2;o++){let a=r[o],s=a.kernelId,d=this.kernels.get(s),l=d.kernelType,p=d.kernelName,f=a.programName,h=a.inputTensorViews,y=a.outputTensorViews,_=n[o*2],b=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),S=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map($=>({dims:$.dims,dataType:_t($.dataType)})),outputsMetadata:y.map($=>({dims:$.dims,dataType:_t($.dataType)})),kernelId:s,kernelType:l,kernelName:p,programName:f,startTime:w,endTime:S});else{let $="";h.forEach((T,I)=>{$+=`input[${I}]: [${T.dims}] | ${_t(T.dataType)}, `});let v="";y.forEach((T,I)=>{v+=`output[${I}]: [${T.dims}] | ${_t(T.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${p}|${f}" ${$}${v}execution time: ${S-w} ns`)}vr("GPU",`${f}::${_}::${b}`)}t.unmap(),this.pendingQueries.delete(t)}),Be()}run(t,n,r,o,a,s){Ne(t.name);let d=[];for(let T=0;T<n.length;++T){let I=n[T].data;if(I===0)continue;let A=this.gpuDataManager.get(I);if(!A)throw new Error(`no GPU data for input: ${I}`);d.push(A)}let{outputs:l,dispatchGroup:p,programUniforms:f}=t.getRunData(n),h=r.length===0?l.map((T,I)=>I):r;if(h.length!==l.length)throw new Error(`Output size ${h.length} must be equal to ${l.length}.`);let y=[],_=[];for(let T=0;T<l.length;++T){if(!Number.isInteger(h[T])||h[T]<-3||h[T]>=s)throw new Error(`Invalid output index: ${h[T]}`);if(h[T]===-3)continue;let I=h[T]===-1,A=h[T]===-2,k=I||A?a(l[T].dataType,l[T].dims):o(h[T],l[T].dataType,l[T].dims);if(y.push(k),k.data===0)continue;let O=this.gpuDataManager.get(k.data);if(!O)throw new Error(`no GPU data for output: ${k.data}`);if(I&&this.temporaryData.push(O),A){let M=this.kernelPersistentData.get(this.currentKernelId);M||(M=[],this.kernelPersistentData.set(this.currentKernelId,M)),M.push(O)}_.push(O)}if(d.length!==n.length||_.length!==y.length){if(_.length===0)return Be(t.name),y;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(f){let T=0,I=[];f.forEach(M=>{let V=typeof M.data=="number"?[M.data]:M.data;if(V.length===0)return;let F=M.type===10?2:4,j,ne;M.type===10?(ne=V.length>4?16:V.length>2?8:V.length*F,j=V.length>4?16:F*V.length):(ne=V.length<=2?V.length*F:16,j=16),T=Math.ceil(T/ne)*ne,I.push(T);let W=M.type===10?8:4;T+=V.length>4?Math.ceil(V.length/W)*j:V.length*F});let A=16;T=Math.ceil(T/A)*A;let k=new ArrayBuffer(T);f.forEach((M,V)=>{let F=I[V],j=typeof M.data=="number"?[M.data]:M.data;if(M.type===6)new Int32Array(k,F,j.length).set(j);else if(M.type===12)new Uint32Array(k,F,j.length).set(j);else if(M.type===10)new Uint16Array(k,F,j.length).set(j);else if(M.type===1)new Float32Array(k,F,j.length).set(j);else throw new Error(`Unsupported uniform type: ${_t(M.type)}`)});let O=this.gpuDataManager.create(T,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,k,0,T),this.gpuDataManager.release(O.id),b={offset:0,size:T,buffer:O.buffer}}let w=this.programManager.normalizeDispatchGroupSize(p),S=w[1]===1&&w[2]===1,$=Jy(t,n,S),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,w),this.programManager.setArtifact($,v),pe("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),f&&v.uniformVariablesInfo){if(f.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${f.length} in program "${v.programInfo.name}".`);for(let T=0;T<f.length;T++){let I=f[T],A=I.type,k=typeof I.data=="number"?1:I.data.length,[O,M]=v.uniformVariablesInfo[T];if(A!==O||k!==M)throw new Error(`Uniform variable ${T} mismatch: expect type ${O} with size ${M}, got type ${A} with size ${k} in program "${v.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let T={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:n,outputTensorViews:y};this.pendingKernels.push(T),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(T)}return this.programManager.run(v,d,_,w,b),Be(t.name),y}upload(t,n){this.gpuDataManager.upload(t,n)}memcpy(t,n){this.gpuDataManager.memcpy(t,n)}async download(t,n){await this.gpuDataManager.download(t,n)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,n,r,o){let a=Vc.get(t);if(!a)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(n,s)}releaseKernel(t){let n=this.kernelPersistentData.get(t);if(n){for(let r of n)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,n,r){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let a=o.kernelType,s=o.kernelName,d=o.kernelEntry,l=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),d(n,l[1]),0}catch(f){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${f}`)),1}finally{p&&r.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${a}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,n,r,o){let a=this.sessionExternalDataMapping.get(t);a||(a=new Map,this.sessionExternalDataMapping.set(t,a));let s=a.get(n),d=this.gpuDataManager.registerExternalBuffer(r,o,s);return a.set(n,[d,r]),d}unregisterBuffers(t){let n=this.sessionExternalDataMapping.get(t);n&&(n.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let n=this.gpuDataManager.get(t);if(!n)throw new Error(`no GPU data for buffer: ${t}`);return n.buffer}createDownloader(t,n,r){return async()=>{let o=await no(this,t,n);return Nr(o.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let o=0;o<r;o++){let a=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});function Eo(e,t=!0){if(e.byteLength%8!==0)throw new Error("Invalid Uint8Array length, must be a multiple of 8 (BigInt).");let n=e.byteLength/8,r=new BigInt64Array(e.buffer,e.byteOffset,n),o=new Int32Array(n);for(let a=0;a<n;a++){let s=r[a];if(s>2147483647n||s<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${a}: ${s}`);o[a]=Number(s)}return t?new Uint8Array(o.buffer):o}function Kc(e){if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length, must be a multiple of 4 (Int32).");let t=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,t),r=BigInt64Array.from(n,BigInt);return new Uint8Array(r.buffer)}var eb,Hc,tb,Fc,sn,un,ko,qc,jc=G(()=>{"use strict";et();eb=1,Hc=()=>eb++,tb=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Fc=(e,t)=>{let n=tb.get(e);if(!n)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((r,o)=>r*o)*n/8):0},sn=class{constructor(t){this.shouldConvertInt64toInt32=!1;this.isInt64ToInt32Converted=!1;let{sessionId:n,context:r,tensor:o,dataType:a,shape:s,shouldConvertInt64toInt32:d=!1}=t;this.sessionId=n,this.mlContext=r,this.mlTensor=o,this.dataType=a,this.tensorShape=s,this.shouldConvertInt64toInt32=d}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Fc(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t,n){if(t){let r=await this.mlContext.readTensor(this.mlTensor),o=Kc(new Uint8Array(r));if(n){(n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)).set(o);return}else return o.buffer}else return n?await this.mlContext.readTensor(this.mlTensor,n):await this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,n,r){return this.mlContext===t&&this.dataType===n&&this.tensorShape.length===r.length&&this.tensorShape.every((o,a)=>o===r[a])}setIsInt64ToInt32Converted(t){this.isInt64ToInt32Converted=t}},un=class{constructor(t,n){this.tensorManager=t;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,n,r,o){let a=this.tensorManager.getMLContext(t),s=n==="int64"&&!a.opSupportLimits().input.dataTypes.includes("int64");if(s&&(n="int32",pe("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(a,n,r))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Fc(n,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let d=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,n,r,d,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper){if(this.wrapper.shouldConvertInt64toInt32){let n=Eo(t,!0);this.wrapper.setIsInt64ToInt32Converted(!0),t=n instanceof Int32Array?new Uint8Array(n.buffer):n}if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload){let n=this.wrapper?.isInt64ToInt32Converted?Kc(this.activeUpload):this.activeUpload;if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(n):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(n);return}else return n.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,t):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},ko=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let n=this.backend.getMLContext(t);if(!n)throw new Error("MLContext not found for session.");return n}reserveTensorId(){let t=Hc();return this.tensorTrackersById.set(t,new un(this)),t}releaseTensorId(t){let n=this.tensorTrackersById.get(t);n&&(this.tensorTrackersById.delete(t),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(t,n,r,o,a){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${n}, dataType: ${r}, shape: ${o}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(n);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(t,r,o,a)}upload(t,n){let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");r.upload(n)}async download(t,n){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${n?.byteLength}}`);let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");return r.download(n)}releaseTensorsForSession(t){for(let n of this.freeTensors)n.sessionId===t&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==t)}registerTensor(t,n,r,o){let a=this.getMLContext(t),s=Hc(),d=new sn({sessionId:t,context:a,tensor:n,dataType:r,shape:o});return this.tensorTrackersById.set(s,new un(this,d)),this.externalTensors.add(d),s}async getCachedTensor(t,n,r,o,a,s,d=!1){let l=this.getMLContext(t);for(let[f,h]of this.freeTensors.entries())if(h.canReuseTensor(l,n,r)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${n}, shape: ${r}}`);let y=this.freeTensors.splice(f,1)[0];return y.sessionId=t,y}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${n}, shape: ${r}}`);let p=await l.createTensor({dataType:n,shape:r,dimensions:r,usage:o,writable:a,readable:s});return new sn({sessionId:t,context:l,tensor:p,dataType:n,shape:r,shouldConvertInt64toInt32:d})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},qc=(...e)=>new ko(...e)});var Po,rb,dn,Zc=G(()=>{"use strict";te();bt();Jn();jc();et();Po=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),rb=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((o,a)=>o===r[a]&&e[o]===t[o])},dn=class{constructor(t){this.tensorManager=qc(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;Ur(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let n=this.temporarySessionTensorIds.get(t);if(n){for(let r of n)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let r=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(r=>rb(r.options,t));if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}registerMLContext(t,n){this.mlContextBySessionId.set(t,n);let r=this.sessionIdsByMLContext.get(n);r||(r=new Set,this.sessionIdsByMLContext.set(n,r)),r.add(t),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t);let n=this.mlContextBySessionId.get(t);if(!n)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(n);if(r.delete(t),r.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(a=>a.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,n,r,o,a){let s=Po.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,n,s,o,a)}async createTemporaryTensor(t,n,r){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${n}, shape: ${r}}`);let o=Po.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,a,o,r,!1);let s=this.temporarySessionTensorIds.get(t);return s?s.push(a):this.temporarySessionTensorIds.set(t,[a]),a}uploadTensor(t,n){if(!Ce().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${n.byteLength}}`),this.tensorManager.upload(t,n)}async downloadTensor(t,n){return this.tensorManager.download(t,n)}createMLTensorDownloader(t,n){return async()=>{let r=await this.tensorManager.download(t);return Nr(r,n)}}registerMLTensor(t,n,r,o){let a=Po.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(t,n,a,o);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${n}, dataType: ${a}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(t,n,r,o,a,s,d=!1){if(!s)throw new Error("External mounted files are not available.");let l=t;t.startsWith("./")&&(l=t.substring(2));let p=s.get(l);if(!p)throw new Error(`File with name ${l} not found in preloaded files.`);if(n+r>p.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let f=p.slice(n,n+r).buffer,h;switch(a.dataType){case"float32":h=new Float32Array(f);break;case"float16":h=new Uint16Array(f);break;case"int32":h=new Int32Array(f);break;case"uint32":h=new Uint32Array(f);break;case"int64":d?(h=Eo(new Uint8Array(f),!1),a.dataType="int32"):h=new BigInt64Array(f);break;case"uint64":h=new BigUint64Array(f);break;case"int8":h=new Int8Array(f);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(f);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return pe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${d?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(a,h)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}isGraphInput(t,n){let r=this.sessionGraphInputs.get(t);return r?r.includes(n):!1}isInt64Supported(t){return!!this.mlContextBySessionId.get(t)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}});var Qc={};Zt(Qc,{init:()=>nb});var ir,zo,nb,Yc=G(()=>{"use strict";te();Gc();et();ae();Zc();ir=class e{constructor(t,n,r,o){this.module=t;this.dataType=n;this.data=r;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(E.size(t)!==E.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},zo=class{constructor(t,n,r){this.module=t;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo,this.deviceInfo=n.deviceInfo;let o=t.PTR_SIZE,a=r/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*a++,s));let d=Number(t.getValue(o*a++,s));this.outputCount=Number(t.getValue(o*a++,s)),this.customDataOffset=Number(t.getValue(o*a++,"*")),this.customDataSize=Number(t.getValue(o*a++,s));let l=[];for(let p=0;p<d;p++){let f=Number(t.getValue(o*a++,s)),h=Number(t.getValue(o*a++,"*")),y=Number(t.getValue(o*a++,s)),_=[];for(let b=0;b<y;b++)_.push(Number(t.getValue(o*a++,s)));l.push(new ir(t,f,h,_))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,n){let r=n?.inputs?.map(d=>typeof d=="number"?this.inputs[d]:d)??this.inputs,o=n?.outputs??[],a=(d,l,p)=>new ir(this.module,l,this.output(d,p),p),s=(d,l)=>{let p=wt(d,l);if(!p)throw new Error(`Unsupported data type: ${d}`);let f=p>0?this.backend.gpuDataManager.create(p).id:0;return new ir(this.module,d,f,l)};return this.backend.run(t,r,o,a,s,this.outputCount)}output(t,n){let r=this.module.stackSave();try{let o=this.module.PTR_SIZE,a=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,a);for(let d=0;d<n.length;d++)this.module.setValue(s+o*(d+1),n[d],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},nb=async(e,t,n,r)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=new an;await a.initialize(n,r),o("webgpu",[a,s=>a.alloc(Number(s)),s=>a.free(s),(s,d,l,p=!1)=>{if(p)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(d)}, size=${Number(l)}`),a.memcpy(Number(s),Number(d));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(d)}, size=${Number(l)}`);let f=t.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(l));a.upload(Number(d),f)}},async(s,d,l)=>{pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${d}, size=${l}`),await a.download(Number(s),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+l)>>>0))},(s,d,l)=>a.createKernel(s,Number(d),l,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),s=>a.releaseKernel(s),(s,d,l,p)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${s}, contextDataOffset=${d}`);let f=new zo(t,a,Number(d));return a.computeKernel(Number(s),f,p)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let a=new dn(n);o("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,d,l,p,f)=>a.ensureTensor(s,d,l,p,f),(s,d)=>{a.uploadTensor(s,d)},async(s,d)=>a.downloadTensor(s,d)])}}});var ob,Ir,Cr,Ot,ib,Yt,Ar,kr,Xc,Er,Pr,zr,qn=G(()=>{"use strict";Os();Bs();te();bt();Dr();Xn();ob=(e,t)=>{Ce()._OrtInit(e,t)!==0&&he("Can't initialize onnxruntime.")},Ir=async e=>{ob(e.wasm.numThreads,Jt(e.logLevel))},Cr=async(e,t)=>{{let n=(Yc(),br(Qc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let r=e.webgpu.adapter;if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",Ce(),e,r)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",Ce(),e)}}},Ot=new Map,ib=e=>{let t=Ce(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,o,o+r)!==0&&he("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+r,s))]}finally{t.stackRestore(n)}},Yt=e=>{let t=Ce(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},Ar=async(e,t)=>{let n,r,o=Ce();Array.isArray(e)?[n,r]=e:e.buffer===o.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=Yt(e);let a=0,s=0,d=0,l=[],p=[],f=[];try{if([s,l]=Ds(t),t?.externalData&&o.mountExternalData){let v=[];for(let T of t.externalData){let I=typeof T=="string"?T:T.path;v.push(er(typeof T=="string"?T:T.data).then(A=>{o.mountExternalData(I,A)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof v!="string"){let I=v,A=I?.context,k=I?.gpuDevice,O=I?.deviceType,M=I?.powerPreference;A?o.currentContext=A:k?o.currentContext=await o.jsepCreateMLContext(k):o.currentContext=await o.jsepCreateMLContext({deviceType:O,powerPreference:M})}else o.currentContext=await o.jsepCreateMLContext();break}a=await o._OrtCreateSession(n,r,s),a===0&&he("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(a,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[h,y]=ib(a),_=!!t?.enableGraphCapture,b=[],w=[],S=[];for(let v=0;v<h;v++){let T=o._OrtGetInputName(a,v);T===0&&he("Can't get an input name."),p.push(T),b.push(o.UTF8ToString(T))}for(let v=0;v<y;v++){let T=o._OrtGetOutputName(a,v);T===0&&he("Can't get an output name."),f.push(T);let I=o.UTF8ToString(T);w.push(I);{if(_&&t?.preferredOutputLocation===void 0){S.push("gpu-buffer");continue}let A=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[I]??"cpu";if(A!=="cpu"&&A!=="cpu-pinned"&&A!=="gpu-buffer"&&A!=="ml-tensor")throw new Error(`Not supported preferred output location: ${A}.`);if(_&&A!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${A}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);S.push(A)}}let $=null;return S.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(d=o._OrtCreateBinding(a),d===0&&he("Can't create IO binding."),$={handle:d,outputPreferredLocations:S,outputPreferredLocationsEncoded:S.map(v=>Yn(v))}),Ot.set(a,[a,p,f,$,_,!1]),[a,b,w]}catch(h){throw p.forEach(y=>o._OrtFree(y)),f.forEach(y=>o._OrtFree(y)),d!==0&&o._OrtReleaseBinding(d)!==0&&he("Can't release IO binding."),a!==0&&o._OrtReleaseSession(a)!==0&&he("Can't release session."),h}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&he("Can't release session options."),l.forEach(h=>o._free(h)),o.unmountExternalData?.()}},kr=e=>{let t=Ce(),n=Ot.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,o,a,s,d]=n;s&&(d&&t._OrtClearBoundOutputs(s.handle)!==0&&he("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&he("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(r)!==0&&he("Can't release session."),Ot.delete(e)},Xc=async(e,t,n,r,o,a=!1)=>{if(!e){t.push(0);return}let s=Ce(),d=s.PTR_SIZE,l=e[0],p=e[1],f=e[3],h=f,y,_;if(l==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let S=e[2].gpuBuffer;_=wt(Ut(l),p);let $=s.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=$(r,o,S,_)}else if(f==="ml-tensor"){let S=e[2].mlTensor;_=wt(Ut(l),p);let $=s.jsepRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=$(r,S,Ut(l),p)}else{let S=e[2];if(Array.isArray(S)){_=d*S.length,y=s._malloc(_),n.push(y);for(let $=0;$<S.length;$++){if(typeof S[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);s.setValue(y+$*d,Pe(S[$],n),"*")}}else{let $=s.jsepIsGraphInput;if(l!=="string"&&$){let v=s._OrtGetInputName(r,o),T=s.UTF8ToString(v);if($(r,T)){let I=Ut(l);_=wt(I,p),h="ml-tensor";let A=s.jsepCreateTemporaryTensor,k=s.jsepUploadTensor;if(!A||!k)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let O=await A(r,I,p);k(O,new Uint8Array(S.buffer,S.byteOffset,S.byteLength)),y=O}else _=S.byteLength,y=s._malloc(_),n.push(y),s.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}else _=S.byteLength,y=s._malloc(_),n.push(y),s.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}}let b=s.stackSave(),w=s.stackAlloc(4*p.length);try{p.forEach(($,v)=>s.setValue(w+v*d,$,d===4?"i32":"i64"));let S=s._OrtCreateTensor(Ut(l),y,_,w,p.length,Yn(h));S===0&&he(`Can't create tensor for input/output. session=${r}, index=${o}.`),t.push(S)}finally{s.stackRestore(b)}},Er=async(e,t,n,r,o,a)=>{let s=Ce(),d=s.PTR_SIZE,l=Ot.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],f=l[1],h=l[2],y=l[3],_=l[4],b=l[5],w=t.length,S=r.length,$=0,v=[],T=[],I=[],A=[],k=s.stackSave(),O=s.stackAlloc(w*d),M=s.stackAlloc(w*d),V=s.stackAlloc(S*d),F=s.stackAlloc(S*d);try{[$,v]=zs(a);for(let W=0;W<w;W++)await Xc(n[W],T,A,e,t[W],_);for(let W=0;W<S;W++)await Xc(o[W],I,A,e,w+r[W],_);for(let W=0;W<w;W++)s.setValue(O+W*d,T[W],"*"),s.setValue(M+W*d,f[t[W]],"*");for(let W=0;W<S;W++)s.setValue(V+W*d,I[W],"*"),s.setValue(F+W*d,h[r[W]],"*");if(y&&!b){let{handle:W,outputPreferredLocations:J,outputPreferredLocationsEncoded:ve}=y;if(f.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${f.length}).`);for(let Q=0;Q<w;Q++){let ee=t[Q];await s._OrtBindInput(W,f[ee],T[Q])!==0&&he(`Can't bind input[${Q}] for session=${e}.`)}for(let Q=0;Q<S;Q++){let ee=r[Q];o[Q]?.[3]?s._OrtBindOutput(W,h[ee],I[Q],0)!==0&&he(`Can't bind pre-allocated output[${Q}] for session=${e}.`):s._OrtBindOutput(W,h[ee],0,ve[ee])!==0&&he(`Can't bind output[${Q}] to ${J[Q]} for session=${e}.`)}Ot.set(e,[p,f,h,y,_,!0])}s.jsepOnRunStart?.(p);let j;y?j=await s._OrtRunWithBinding(p,y.handle,S,V,$):j=await s._OrtRun(p,M,O,w,F,S,V,$),j!==0&&he("failed to call OrtRun().");let ne=[];for(let W=0;W<S;W++){let J=Number(s.getValue(V+W*d,"*"));if(J===I[W]){ne.push(o[W]);continue}let ve=s.stackSave(),Q=s.stackAlloc(4*d),ee=!1,se,Z=0;try{s._OrtGetTensorData(J,Q,Q+d,Q+2*d,Q+3*d)!==0&&he(`Can't access output tensor data on index ${W}.`);let ke=d===4?"i32":"i64",Se=Number(s.getValue(Q,ke));Z=s.getValue(Q+d,"*");let D=s.getValue(Q+d*2,"*"),R=Number(s.getValue(Q+d*3,ke)),Y=[];for(let xe=0;xe<R;xe++)Y.push(Number(s.getValue(D+xe*d,ke)));s._OrtFree(D)!==0&&he("Can't free memory for tensor dims.");let fe=Y.reduce((xe,ge)=>xe*ge,1);se=_t(Se);let Fe=y?.outputPreferredLocations[r[W]];if(se==="string"){if(Fe==="gpu-buffer"||Fe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let xe=[];for(let ge=0;ge<fe;ge++){let st=s.getValue(Z+ge*d,"*"),xt=s.getValue(Z+(ge+1)*d,"*"),St=ge===fe-1?void 0:xt-st;xe.push(s.UTF8ToString(st,St))}ne.push([se,Y,xe,"cpu"])}else if(Fe==="gpu-buffer"&&fe>0){let xe=s.jsepGetBuffer;if(!xe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ge=xe(Z),st=wt(Se,fe);if(st===void 0||!Mr(se))throw new Error(`Unsupported data type: ${se}`);ee=!0,ne.push([se,Y,{gpuBuffer:ge,download:s.jsepCreateDownloader(ge,st,se),dispose:()=>{s._OrtReleaseTensor(J)!==0&&he("Can't release tensor.")}},"gpu-buffer"])}else if(Fe==="ml-tensor"&&fe>0){let xe=s.jsepEnsureTensor,ge=s.jsepIsInt64Supported;if(!xe||!ge)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wt(Se,fe)===void 0||!Rr(se))throw new Error(`Unsupported data type: ${se}`);if(se==="int64"&&!ge(e))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let xt=await xe(e,Z,Se,Y,!1);ee=!0,ne.push([se,Y,{mlTensor:xt,download:s.jsepCreateMLTensorDownloader(Z,se),dispose:()=>{s.jsepReleaseTensorId(Z),s._OrtReleaseTensor(J)}},"ml-tensor"])}else{let xe=Br(se),ge=new xe(fe);new Uint8Array(ge.buffer,ge.byteOffset,ge.byteLength).set(s.HEAPU8.subarray(Z,Z+ge.byteLength)),ne.push([se,Y,ge,"cpu"])}}finally{s.stackRestore(ve),se==="string"&&Z&&s._free(Z),ee||s._OrtReleaseTensor(J),s.jsepOnRunEnd?.(p)}}return y&&!_&&(s._OrtClearBoundOutputs(y.handle)!==0&&he("Can't clear bound outputs."),Ot.set(e,[p,f,h,y,_,!1])),ne}finally{s.stackRestore(k),T.forEach(j=>s._OrtReleaseTensor(j)),I.forEach(j=>s._OrtReleaseTensor(j)),A.forEach(j=>s._free(j)),$!==0&&s._OrtReleaseRunOptions($),v.forEach(j=>s._free(j))}},Pr=e=>{let t=Ce(),n=Ot.get(e);if(!n)throw new Error("invalid session id");let r=n[0],o=t._OrtEndProfiling(r);o===0&&he("Can't get an profile file name."),t._OrtFree(o)},zr=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}});var Dt,He,ar,cn,pn,ln,Oo,Do,Lt,Gt,sb,Jc,ep,tp,rp,np,op,ip,Bo=G(()=>{"use strict";Ge();qn();bt();Sr();Dt=()=>!!we.wasm.proxy&&typeof document<"u",ar=!1,cn=!1,pn=!1,Do=new Map,Lt=(e,t)=>{let n=Do.get(e);n?n.push(t):Do.set(e,[t])},Gt=()=>{if(ar||!cn||pn||!He)throw new Error("worker not ready")},sb=e=>{switch(e.data.type){case"init-wasm":ar=!1,e.data.err?(pn=!0,Oo[1](e.data.err)):(cn=!0,Oo[0]()),ln&&(URL.revokeObjectURL(ln),ln=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Do.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Jc=async()=>{if(!cn){if(ar)throw new Error("multiple calls to 'initWasm()' detected.");if(pn)throw new Error("previous call to 'initWasm()' failed.");if(ar=!0,Dt())return new Promise((e,t)=>{He?.terminate(),ks().then(([n,r])=>{try{He=r,He.onerror=a=>t(a),He.onmessage=sb,Oo=[e,t];let o={type:"init-wasm",in:we};!o.in.wasm.wasmPaths&&(n||import.meta.url?.startsWith("file:"))&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),He.postMessage(o),ln=n}catch(o){t(o)}},t)});try{await Tr(we.wasm),await Ir(we),cn=!0}catch(e){throw pn=!0,e}finally{ar=!1}}},ep=async e=>{if(Dt())return Gt(),new Promise((t,n)=>{Lt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:we}};He.postMessage(r)});await Cr(we,e)},tp=async e=>Dt()?(Gt(),new Promise((t,n)=>{Lt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};He.postMessage(r,[e.buffer])})):Yt(e),rp=async(e,t)=>{if(Dt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Gt(),new Promise((n,r)=>{Lt("create",[n,r]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),He.postMessage(o,a)})}else return Ar(e,t)},np=async e=>{if(Dt())return Gt(),new Promise((t,n)=>{Lt("release",[t,n]);let r={type:"release",in:e};He.postMessage(r)});kr(e)},op=async(e,t,n,r,o,a)=>{if(Dt()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Gt(),new Promise((s,d)=>{Lt("run",[s,d]);let l=n,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:a}};He.postMessage(p,zr(l))})}else return Er(e,t,n,r,o,a)},ip=async e=>{if(Dt())return Gt(),new Promise((t,n)=>{Lt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};He.postMessage(r)});Pr(e)}});var ap,ub,mn,sp=G(()=>{"use strict";Ge();Bo();te();xr();Xn();ap=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ub=e=>{switch(e[3]){case"cpu":return new qe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Mr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:o}=e[2];return qe.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:o})}case"ml-tensor":{let t=e[0];if(!Rr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:o}=e[2];return qe.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},mn=class{async fetchModelAndCopyToWasmMemory(t){return tp(await er(t))}async loadModel(t,n){Ne();let r;typeof t=="string"?r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames]=await rp(r,n),Be()}async dispose(){return np(this.sessionId)}async run(t,n,r){Ne();let o=[],a=[];Object.entries(t).forEach(y=>{let _=y[0],b=y[1],w=this.inputNames.indexOf(_);if(w===-1)throw new Error(`invalid input '${_}'`);o.push(b),a.push(w)});let s=[],d=[];Object.entries(n).forEach(y=>{let _=y[0],b=y[1],w=this.outputNames.indexOf(_);if(w===-1)throw new Error(`invalid output '${_}'`);s.push(b),d.push(w)});let l=o.map((y,_)=>ap(y,()=>`input "${this.inputNames[a[_]]}"`)),p=s.map((y,_)=>y?ap(y,()=>`output "${this.outputNames[d[_]]}"`):null),f=await op(this.sessionId,a,l,d,p,r),h={};for(let y=0;y<f.length;y++)h[this.outputNames[d[y]]]=s[y]??ub(f[y]);return Be(),h}startProfiling(){}endProfiling(){ip(this.sessionId)}}});var dp={};Zt(dp,{OnnxruntimeWebAssemblyBackend:()=>fn,initializeFlags:()=>up,wasmBackend:()=>db});var up,fn,db,lp=G(()=>{"use strict";Ge();Bo();sp();up=()=>{if((typeof we.wasm.initTimeout!="number"||we.wasm.initTimeout<0)&&(we.wasm.initTimeout=0),we.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof we.wasm.proxy!="boolean"&&(we.wasm.proxy=!1),typeof we.wasm.trace!="boolean"&&(we.wasm.trace=!1),typeof we.wasm.numThreads!="number"||!Number.isInteger(we.wasm.numThreads)||we.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)we.wasm.numThreads=1;else{let e=typeof navigator>"u"?Nn("node:os").cpus().length:navigator.hardwareConcurrency;we.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},fn=class{async init(t){up(),await Jc(),await ep(t)}async createInferenceSessionHandler(t,n){let r=new mn;return await r.loadModel(t,n),Promise.resolve(r)}},db=new fn});Ge();Ge();Ge();var gs="1.22.0";var pT=Fn;{let e=(lp(),br(dp)).wasmBackend;Ct("webgpu",e,5),Ct("webnn",e,5),Ct("cpu",e,10),Ct("wasm",e,10)}Object.defineProperty(we.versions,"web",{value:gs,enumerable:!0});export{Bf as InferenceSession,vr as TRACE,Ne as TRACE_FUNC_BEGIN,Be as TRACE_FUNC_END,qe as Tensor,pT as default,we as env,Ct as registerBackend};
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
//# sourceMappingURL=ort.webgpu.bundle.min.mjs.map
