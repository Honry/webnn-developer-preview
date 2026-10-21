/*!
 * ONNX Runtime Web v1.30.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Fr=Object.defineProperty;var tm=Object.getOwnPropertyDescriptor;var nm=Object.getOwnPropertyNames;var rm=Object.prototype.hasOwnProperty;var qr=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var L=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(n){throw r=[n],n}};var Ht=(e,t)=>{for(var r in t)Fr(e,r,{get:t[r],enumerable:!0})},om=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of nm(t))!rm.call(e,o)&&o!==r&&Fr(e,o,{get:()=>t[o],enumerable:!(n=tm(t,o))||n.enumerable});return e};var tn=e=>om(Fr({},"__esModule",{value:!0}),e);var Sn,Ot,Dt,im,Ji,jr=L(()=>{"use strict";Sn=new Map,Ot=[],Dt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=Sn.get(e);if(n===void 0)Sn.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=Ot.indexOf(e);o!==-1&&Ot.splice(o,1);for(let a=0;a<Ot.length;a++)if(Sn.get(Ot[a]).priority<=r){Ot.splice(a,0,e);return}Ot.push(e)}return}throw new TypeError("not a valid backend")},im=async e=>{let t=Sn.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ji=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?Ot:r,o,a=[],s=new Set;for(let d of n){let c=await im(d);typeof c=="string"?a.push({name:d,err:c}):(o||(o=c),o===c&&s.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${a.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:c}of a)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${c}`);let u=t.filter(d=>s.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,c)=>c==="executionProviders"?u:Reflect.get(d,c)})]}});var ea=L(()=>{"use strict";jr()});var ta,na=L(()=>{"use strict";ta="1.30.0"});var ra,De,Kr=L(()=>{"use strict";na();ra="warning",De={wasm:{},webgl:{},webgpu:{},versions:{common:ta},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);ra=e}},get logLevel(){return ra}};Object.defineProperty(De,"logLevel",{enumerable:!0})});var ve,oa=L(()=>{"use strict";Kr();ve=De});var ia,aa,sa=L(()=>{"use strict";ia=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[3]):(o=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let m=a*o,f=0,g=m,_=m*2,y=-1;s==="RGBA"?(f=0,g=m,_=m*2,y=m*3):s==="RGB"?(f=0,g=m,_=m*2):s==="RBG"&&(f=0,_=m,g=m*2);for(let w=0;w<a;w++)for(let x=0;x<o;x++){let v=(e.data[f++]-c[0])*d[0],$=(e.data[g++]-c[1])*d[1],S=(e.data[_++]-c[2])*d[2],T=y===-1?255:(e.data[y++]-c[3])*d[3];n.fillStyle="rgba("+v+","+$+","+S+","+T+")",n.fillRect(x,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},aa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],a=e.dims[1],s=e.dims[3]):(o=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,c,m;d===void 0||d.mean===void 0?c=[255,255,255,255]:typeof d.mean=="number"?c=[d.mean,d.mean,d.mean,d.mean]:(c=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(c[3]=d.mean[3])),d===void 0||d.bias===void 0?m=[0,0,0,0]:typeof d.bias=="number"?m=[d.bias,d.bias,d.bias,d.bias]:(m=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(m[3]=d.bias[3]));let f=a*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,_=0,y=1,w=2,x=3,v=0,$=f,S=f*2,T=-1;u==="RGBA"?(v=0,$=f,S=f*2,T=f*3):u==="RGB"?(v=0,$=f,S=f*2):u==="RBG"&&(v=0,S=f,$=f*2),n=r.createImageData(o,a);for(let A=0;A<a*o;_+=g,y+=g,w+=g,x+=g,A++)n.data[_]=(e.data[v++]-m[0])*c[0],n.data[y]=(e.data[$++]-m[1])*c[1],n.data[w]=(e.data[S++]-m[2])*c[2],n.data[x]=T===-1?255:(e.data[T++]-m[3])*c[3]}else throw new Error("Can not access image data");return n}});var Zr,ua,la,da,ca,pa,ma=L(()=>{"use strict";Tn();Zr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},a,s;typeof o.mean=="number"?a=[o.mean,o.mean,o.mean,o.mean]:a=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*n,m=d==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),f=4,g=0,_=1,y=2,w=3,x=0,v=c,$=c*2,S=-1;u==="RGB"&&(f=3,g=0,_=1,y=2,w=-1),d==="RGBA"?S=c*3:d==="RBG"?(x=0,$=c,v=c*2):d==="BGR"&&($=0,v=c,x=c*2);for(let A=0;A<c;A++,g+=f,y+=f,_+=f,w+=f)m[x++]=(e[g]+s[0])/a[0],m[v++]=(e[_]+s[1])/a[1],m[$++]=(e[y]+s[2])/a[2],S!==-1&&w!==-1&&(m[S++]=(e[w]+s[3])/a[3]);return d==="RGBA"?new ze("float32",m,[1,4,r,n]):new ze("float32",m,[1,3,r,n])},ua=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=d();m.width=e.width,m.height=e.height;let f=c(m);if(f!=null){let g=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=_}else u.tensorFormat="RGBA",u.height=g,u.width=_;f.drawImage(e,0,0),s=f.getImageData(0,0,_,g).data}else throw new Error("Can not access image data")}else if(n){let m,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,f=t.resizedWidth):(m=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=m,u.width=f,t!==void 0){let g=d();g.width=f,g.height=m;let _=c(g);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,f,m).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=d();m.width=e.width,m.height=e.height;let f=c(m);if(f!=null){let g=e.height,_=e.width;return f.drawImage(e,0,0,_,g),s=f.getImageData(0,0,_,g).data,u.height=g,u.width=_,Zr(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((m,f)=>{let g=d(),_=c(g);if(!e||!_)return f();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{g.width=y.width,g.height=y.height,_.drawImage(y,0,0,g.width,g.height);let w=_.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,m(Zr(w.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Zr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},la=(e,t)=>{let{width:r,height:n,download:o,dispose:a}=t,s=[1,n,r,4];return new ze({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:a})},da=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:a}=t;return new ze({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:a})},ca=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:a}=t;return new ze({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:a})},pa=(e,t,r)=>new ze({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var Bt,nn,fa,ha,ga=L(()=>{"use strict";Bt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),nn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),fa=!1,ha=()=>{if(!fa){fa=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(Bt.set("int64",BigInt64Array),nn.set(BigInt64Array,"int64")),t&&(Bt.set("uint64",BigUint64Array),nn.set(BigUint64Array,"uint64")),n?(Bt.set("float16",r),nn.set(r,"float16")):Bt.set("float16",Uint16Array)}}});var ya,ba,_a=L(()=>{"use strict";Tn();ya=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ba=(e,t)=>{switch(e.location){case"cpu":return new ze(e.type,e.data,t);case"cpu-pinned":return new ze({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new ze({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new ze({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new ze({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var ze,Tn=L(()=>{"use strict";sa();ma();ga();_a();ze=class{constructor(t,r,n){ha();let o,a;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,a=t.dims,t.location){case"cpu-pinned":{let u=Bt.get(o);if(!u)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof u))throw new TypeError(`buffer should be of type ${u.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let u,d;if(typeof t=="string")if(o=t,d=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");u=r}else{let c=Bt.get(t);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&c===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${c.name} as data.`);t==="uint64"||t==="int64"?u=c.from(r,BigInt):u=c.from(r)}else if(r instanceof c)u=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")u=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(t==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)u=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(d=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof t[0];if(c==="string")o="string",u=t;else if(c==="boolean")o="bool",u=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",u=Uint8Array.from(t);else{let c=nn.get(t.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=c,u=t}if(d===void 0)d=[u.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");a=d,this.cpuData=u,this.dataLocation="cpu"}let s=ya(a);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=a,this.size=s}static async fromImage(t,r){return ua(t,r)}static fromTexture(t,r){return la(t,r)}static fromGpuBuffer(t,r){return da(t,r)}static fromMLTensor(t,r){return ca(t,r)}static fromPinnedBuffer(t,r,n){return pa(t,r,n)}toDataURL(t){return ia(this,t)}toImageData(t){return aa(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ba(this,t)}}});var je,Qr=L(()=>{"use strict";Tn();je=ze});var Cn,wa,Ve,Re,vt,$t,Yr=L(()=>{"use strict";Kr();Cn=(e,t)=>{(typeof De.trace>"u"?!De.wasm.trace:!De.trace)||console.timeStamp(`${e}::ORT::${t}`)},wa=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(a+=`::${t}`),Cn("CPU",a);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ve=e=>{(typeof De.trace>"u"?!De.wasm.trace:!De.trace)||wa("BEGIN",e)},Re=e=>{(typeof De.trace>"u"?!De.wasm.trace:!De.trace)||wa("END",e)},vt=e=>{(typeof De.trace>"u"?!De.wasm.trace:!De.trace)||console.time(`ORT::${e}`)},$t=e=>{(typeof De.trace>"u"?!De.wasm.trace:!De.trace)||console.timeEnd(`ORT::${e}`)}});var In,va=L(()=>{"use strict";jr();Qr();Yr();In=class e{constructor(t){this.handler=t}async run(t,r,n){Ve(),vt("InferenceSession.run");let o={},a={};if(typeof t!="object"||t===null||t instanceof je||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof je)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,m=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(m.indexOf(f)!==-1){let g=r[f];(g===null||g instanceof je)&&(c=!0,s=!1,o[f]=g)}if(c){if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(s)for(let c of this.outputNames)o[c]=null;let u=await this.handler.run(t,o,a),d={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let m=u[c];m instanceof je?d[c]=m:d[c]=new je(m.type,m.data,m.dims)}return $t("InferenceSession.run"),Re(),d}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ve(),vt("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,f=0,g=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(g=t.byteLength-f,typeof n=="number"){if(g=n,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-f}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(m,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Ji(s),c=await u.createInferenceSessionHandler(a,d);return $t("InferenceSession.create"),Re(),new e(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}});var am,$a=L(()=>{"use strict";va();am=In});var xa=L(()=>{"use strict"});var Sa=L(()=>{"use strict"});var Ta=L(()=>{"use strict"});var Ca=L(()=>{"use strict"});var Xr={};Ht(Xr,{InferenceSession:()=>am,TRACE:()=>Cn,TRACE_EVENT_BEGIN:()=>vt,TRACE_EVENT_END:()=>$t,TRACE_FUNC_BEGIN:()=>Ve,TRACE_FUNC_END:()=>Re,Tensor:()=>je,env:()=>ve,registerBackend:()=>Dt});var Le=L(()=>{"use strict";ea();oa();$a();Qr();xa();Sa();Yr();Ta();Ca()});var An=L(()=>{"use strict"});var ka={};Ht(ka,{default:()=>sm});var Aa,Ea,sm,Pa=L(()=>{"use strict";Jr();xt();En();Aa="ort-wasm-proxy-worker",Ea=globalThis.self?.name===Aa;Ea&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":kn(r.wasm).then(()=>{Pn(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;On(o,n).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:n}=r,o=rn(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Dn(n,o).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":Bn(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:a,outputIndices:s,options:u}=r;zn(n,o,a,s,new Array(s.length).fill(null),u).then(d=>{d.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Rn([...a,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Mn(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});sm=Ea?null:e=>new Worker(e??We,{type:"module",name:Aa})});var Da={};Ht(Da,{default:()=>um});var Oa,um,lm,Ba=L(()=>{"use strict";Oa=async function(e={}){var t,r,n=e,o=new Promise((i,l)=>{t=i,r=l}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",u=s&&self.name?.startsWith("em-pthread");n.mountExternalData=(i,l)=>{i.startsWith("./")&&(i=i.substring(2)),(n.Fb||(n.Fb=new Map)).set(i,l)},n.unmountExternalData=()=>{delete n.Fb};var d=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let c=i=>async(...l)=>{try{if(n.Gb)throw Error("Session already started");let p=n.Gb={ec:l[0],errors:[]},h=await i(...l);if(n.Gb!==p)throw Error("Session mismatch");n.Kb?.flush();let b=p.errors;if(0<b.length){let C=await Promise.all(b);if(C=C.filter(P=>P),0<C.length)throw Error(C.join(`
`))}return h}finally{n.Gb=null}};n.jsepInit=(i,l)=>{if(i==="webgpu"){[n.Kb,n.Vb,n.Zb,n.Lb,n.Yb,n.Ab,n.$b,n.bc,n.Wb,n.Xb,n.ac]=l;let p=n.Kb;n.jsepRegisterBuffer=(h,b,C,P)=>p.registerBuffer(h,b,C,P),n.jsepGetBuffer=h=>p.getBuffer(h),n.jsepCreateDownloader=(h,b,C)=>p.createDownloader(h,b,C),n.jsepOnCreateSession=h=>{p.onCreateSession(h)},n.jsepOnReleaseSession=h=>{p.onReleaseSession(h)},n.jsepOnRunStart=h=>p.onRunStart(h),n.cc=(h,b)=>{p.upload(h,b)}}else if(i==="webnn"){let p=l[0];[n.oc,n.Ob,n.webnnEnsureTensor,n.Pb,n.webnnDownloadTensor,n.nc,n.webnnEnableTraceEvent]=l.slice(1),n.webnnReleaseTensorId=n.Ob,n.webnnUploadTensor=n.Pb,n.webnnRegisterMLContext=n.nc,n.webnnOnRunStart=h=>p.onRunStart(h),n.webnnOnRunEnd=p.onRunEnd.bind(p),n.webnnOnReleaseSession=h=>{p.onReleaseSession(h)},n.webnnCreateMLTensorDownloader=(h,b)=>p.createMLTensorDownloader(h,b),n.webnnRegisterMLTensor=(h,b,C,P)=>p.registerMLTensor(h,b,C,P),n.webnnCreateMLContext=h=>p.createMLContext(h),n.webnnRegisterMLConstant=(h,b,C,P,z,N)=>p.registerMLConstant(h,b,C,P,z,n.Fb,N),n.webnnRegisterGraphInput=p.registerGraphInput.bind(p),n.webnnIsGraphInput=p.isGraphInput.bind(p),n.webnnRegisterGraphOutput=p.registerGraphOutput.bind(p),n.webnnIsGraphOutput=p.isGraphOutput.bind(p),n.webnnCreateTemporaryTensor=p.createTemporaryTensor.bind(p),n.webnnIsGraphInputOutputTypeSupported=p.isGraphInputOutputTypeSupported.bind(p)}};let m=()=>{let i=(l,p,h)=>(...b)=>{let C=et,P=p?.();b=l(...b);let z=p?.();return P!==z&&(l=z,h(P),p=h=null),et!=C?new Promise((N,G)=>{Br={resolve:N,reject:G}}):b};(()=>{for(let l of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])n[l]=i(n[l],()=>n[l],p=>n[l]=p)})(),c!==void 0&&(n._OrtRun=c(n._OrtRun),n._OrtRunWithBinding=c(n._OrtRunWithBinding)),m=void 0};n.asyncInit=()=>{m?.()};var f,g,_=(i,l)=>{throw l},y=import.meta.url,w="";if(a||s){try{w=new URL(".",y).href}catch{}s&&(g=i=>{var l=new XMLHttpRequest;return l.open("GET",i,!1),l.responseType="arraybuffer",l.send(null),new Uint8Array(l.response)}),f=async i=>{if(ce(i))return new Promise((p,h)=>{var b=new XMLHttpRequest;b.open("GET",i,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):h(b.status)},b.onerror=h,b.send(null)});var l=await fetch(i,{credentials:"same-origin"});if(l.ok)return l.arrayBuffer();throw Error(l.status+" : "+l.url)}}var x,v,$,S,T,A,I,D,B,V,H,F,j,ee,ie,Q=console.log.bind(console),Y=console.error.bind(console),te=Q,K=Y,oe=!1,ce=i=>i.startsWith("file://");function le(){return v.buffer!=T.buffer&&me(),T}function xe(){return v.buffer!=T.buffer&&me(),A}function fe(){return v.buffer!=T.buffer&&me(),I}function R(){return v.buffer!=T.buffer&&me(),D}function k(){return v.buffer!=T.buffer&&me(),B}function X(){return v.buffer!=T.buffer&&me(),V}function Ae(){return v.buffer!=T.buffer&&me(),H}function he(){return v.buffer!=T.buffer&&me(),ee}if(u){let i=function(l){try{var p=l.data,h=p.Db;if(h==="load"){let b=[];self.onmessage=C=>b.push(C),self.startWorker=()=>{postMessage({Db:"loaded"});for(let C of b)i(C);self.onmessage=i};for(let C of p.Sb)n[C]&&!n[C].proxy||(n[C]=(...P)=>{postMessage({Db:"callHandler",Rb:C,args:P})},C=="print"&&(te=n[C]),C=="printErr"&&(K=n[C]));v=p.kc,me(),ie(p.lc)}else if(h==="run"){Dc(p.Bb),Vr(p.Bb,0,0,1,0,0),Zo(),Or(p.Bb),ke||(Li(),ke=!0);try{Bc(p.hc,p.Jb)}catch(b){if(b!="unwind")throw b}}else p.target!=="setimmediate"&&(h==="checkMailbox"?ke&&fn():h&&(K(`worker: received unknown command ${h}`),K(p)))}catch(b){throw Wi(),b}};var Hg=i,ke=!1;self.onunhandledrejection=l=>{throw l.reason||l},self.onmessage=i}function me(){var i=v.buffer;n.HEAP8=T=new Int8Array(i),I=new Int16Array(i),n.HEAPU8=A=new Uint8Array(i),D=new Uint16Array(i),n.HEAP32=B=new Int32Array(i),n.HEAPU32=V=new Uint32Array(i),H=new Float32Array(i),ee=new Float64Array(i),F=new BigInt64Array(i),j=new BigUint64Array(i)}function Ce(){u?startWorker(n):M.Da()}var He,Xe=0,ht=null;function wr(){if(--Xe==0&&ht){var i=ht;ht=null,i()}}function gt(i){throw K(i="Aborted("+i+")"),oe=!0,i=new WebAssembly.RuntimeError(i+". Build with -sASSERTIONS for more info."),r(i),i}function Go(){return{a:{L:Jp,Aa:Xp,b:Mc,$:Jo,A:ni,pa:ri,X:oi,Z:ii,qa:ai,na:si,ga:ui,ma:li,J:di,Y:ci,V:pi,oa:mi,W:fi,va:Rc,E:Nc,Q:Vc,O:Wc,D:Hc,v:Fc,s:qc,P:jc,z:ep,R:tp,ja:np,T:rp,aa:op,M:ip,F:ap,ia:Or,sa:sp,r:up,Ca:lp,w:pp,o:mp,m:hp,c:Ar,Ba:gp,n:yp,j:wp,u:vp,p:$p,f:xp,t:Sp,l:Tp,e:Cp,k:Ip,h:Ap,g:Ep,d:kp,da:Pp,ea:Op,fa:Dp,ba:Ii,ca:Ai,N:Ei,xa:zp,ua:Up,i:Np,C:Vp,G:Lp,ta:Mp,x:Wp,ra:Gp,U:Hp,q:Bp,y:Fp,K:qp,S:jp,za:Kp,ya:Zp,ka:Di,la:Bi,_:Sr,B:zi,I:Mi,ha:Ri,H:Ui,a:v,wa:xr}}}class vr{name="ExitStatus";constructor(l){this.message=`Program terminated with exit(${l})`,this.status=l}}var Ho=i=>{i.terminate(),i.onmessage=()=>{}},$r=[],Fo=i=>{bt.length==0&&(Yo(),Qo(bt[0]));var l=bt.pop();if(!l)return 6;Xt.push(l),Et[i.Bb]=l,l.Bb=i.Bb;var p={Db:"run",hc:i.fc,Jb:i.Jb,Bb:i.Bb};return l.postMessage(p,i.Nb),0},yt=0,Se=(i,l,...p)=>{for(var h=2*p.length,b=Gr(),C=Wr(8*h),P=C>>>3,z=0;z<p.length;z++){var N=p[z];typeof N=="bigint"?(F[P+2*z]=1n,F[P+2*z+1]=N):(F[P+2*z]=0n,he()[P+2*z+1>>>0]=N)}return i=Gi(i,0,h,C,l),xn(b),i};function xr(i){if(u)return Se(0,1,i);if(S=i,!(0<yt)){for(var l of Xt)Ho(l);for(l of bt)Ho(l);bt=[],Xt=[],Et={},oe=!0}_(0,new vr(i))}function qo(i){if(u)return Se(1,0,i);Sr(i)}var Sr=i=>{if(S=i,u)throw qo(i),"unwind";xr(i)},bt=[],Xt=[],jo=[],Et={},Ko=i=>{var l=i.Bb;delete Et[l],bt.push(i),Xt.splice(Xt.indexOf(i),1),i.Bb=0,Hi(l)};function Zo(){jo.forEach(i=>i())}var Qo=i=>new Promise(l=>{i.onmessage=b=>{var C=(b=b.data).Db;if(b.Hb&&b.Hb!=Nr()){var P=Et[b.Hb];P?P.postMessage(b,b.Nb):K(`Internal error! Worker sent a message "${C}" to target pthread ${b.Hb}, but that thread no longer exists!`)}else C==="checkMailbox"?fn():C==="spawnThread"?Fo(b):C==="cleanupThread"?Ko(Et[b.ic]):C==="loaded"?(i.loaded=!0,l(i)):b.target==="setimmediate"?i.postMessage(b):C==="callHandler"?n[b.Rb](...b.args):C&&K(`worker sent an unknown command ${C}`)},i.onerror=b=>{throw K(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var p,h=[];for(p of[])n.propertyIsEnumerable(p)&&h.push(p);i.postMessage({Db:"load",Sb:h,kc:v,lc:$})});function Yo(){var i=new Worker((()=>{let l=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new l("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});bt.push(i)}var Dc=i=>{me();var l=X()[i+52>>>2>>>0];i=X()[i+56>>>2>>>0],ji(l,l-i),xn(l)},Bc=(i,l)=>{yt=0,i=Ki(i,l),0<yt?S=i:Lr(i)};class zc{constructor(l){this.Ib=l-24}}function Mc(i,l,p){var h=new zc(i>>>=0);throw l>>>=0,p>>>=0,X()[h.Ib+16>>>2>>>0]=0,X()[h.Ib+4>>>2>>>0]=l,X()[h.Ib+8>>>2>>>0]=p,i}function Xo(i,l,p,h){return u?Se(2,1,i,l,p,h):Jo(i,l,p,h)}function Jo(i,l,p,h){if(i>>>=0,p>>>=0,h>>>=0,d===void 0)return 6;var b=[];return u&&b.length===0?Xo(i,l>>>=0,p,h):(i={fc:p,Bb:i,Jb:h,Nb:b},u?(i.Db="spawnThread",postMessage(i,b),0):Fo(i))}var ei=typeof TextDecoder<"u"?new TextDecoder:void 0,ti=(i,l=0,p=NaN)=>{var h=(l>>>=0)+p;for(p=l;i[p]&&!(p>=h);)++p;if(16<p-l&&i.buffer&&ei)return ei.decode(i.buffer instanceof ArrayBuffer?i.subarray(l,p):i.slice(l,p));for(h="";l<p;){var b=i[l++];if(128&b){var C=63&i[l++];if((224&b)==192)h+=String.fromCharCode((31&b)<<6|C);else{var P=63&i[l++];65536>(b=(240&b)==224?(15&b)<<12|C<<6|P:(7&b)<<18|C<<12|P<<6|63&i[l++])?h+=String.fromCharCode(b):(b-=65536,h+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else h+=String.fromCharCode(b)}return h},Ee=(i,l)=>(i>>>=0)?ti(xe(),i,l):"";function ni(i,l,p){return u?Se(3,1,i,l,p):0}function ri(i,l){if(u)return Se(4,1,i,l)}function oi(i,l){if(u)return Se(5,1,i,l)}function ii(i,l,p){if(u)return Se(6,1,i,l,p)}function ai(i,l,p){return u?Se(7,1,i,l,p):0}function si(i,l){if(u)return Se(8,1,i,l)}function ui(i,l,p){if(u)return Se(9,1,i,l,p)}function li(i,l,p,h){if(u)return Se(10,1,i,l,p,h)}function di(i,l,p,h){if(u)return Se(11,1,i,l,p,h)}function ci(i,l,p,h){if(u)return Se(12,1,i,l,p,h)}function pi(i){if(u)return Se(13,1,i)}function mi(i,l){if(u)return Se(14,1,i,l)}function fi(i,l,p){if(u)return Se(15,1,i,l,p)}var hi,Rc=()=>gt(""),Je=i=>{for(var l="";xe()[i>>>0];)l+=hi[xe()[i++>>>0]];return l},Tr={},Cr={},Uc={},Wt=n.BindingError=class extends Error{constructor(i){super(i),this.name="BindingError"}};function lt(i,l,p={}){return(function(h,b,C={}){var P=b.name;if(!h)throw new Wt(`type "${P}" must have a positive integer typeid pointer`);if(Cr.hasOwnProperty(h)){if(C.Tb)return;throw new Wt(`Cannot register type '${P}' twice`)}Cr[h]=b,delete Uc[h],Tr.hasOwnProperty(h)&&(b=Tr[h],delete Tr[h],b.forEach(z=>z()))})(i,l,p)}var gi=(i,l,p)=>{switch(l){case 1:return p?h=>le()[h>>>0]:h=>xe()[h>>>0];case 2:return p?h=>fe()[h>>>1>>>0]:h=>R()[h>>>1>>>0];case 4:return p?h=>k()[h>>>2>>>0]:h=>X()[h>>>2>>>0];case 8:return p?h=>F[h>>>3]:h=>j[h>>>3];default:throw new TypeError(`invalid integer width (${l}): ${i}`)}};function Nc(i,l,p){p>>>=0,lt(i>>>=0,{name:l=Je(l>>>0),fromWireType:h=>h,toWireType:function(h,b){if(typeof b!="bigint"&&typeof b!="number")throw b=b===null?"null":(h=typeof b)=="object"||h==="array"||h==="function"?b.toString():""+b,new TypeError(`Cannot convert "${b}" to ${this.name}`);return typeof b=="number"&&(b=BigInt(b)),b},Cb:_t,readValueFromPointer:gi(l,p,l.indexOf("u")==-1),Eb:null})}var _t=8;function Vc(i,l,p,h){lt(i>>>=0,{name:l=Je(l>>>0),fromWireType:function(b){return!!b},toWireType:function(b,C){return C?p:h},Cb:_t,readValueFromPointer:function(b){return this.fromWireType(xe()[b>>>0])},Eb:null})}var Ir=[],dt=[];function Ar(i){9<(i>>>=0)&&--dt[i+1]===0&&(dt[i]=void 0,Ir.push(i))}var Me=i=>{if(!i)throw new Wt(`Cannot use deleted val. handle = ${i}`);return dt[i]},Fe=i=>{switch(i){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let l=Ir.pop()||dt.length;return dt[l]=i,dt[l+1]=1,l}};function Er(i){return this.fromWireType(X()[i>>>2>>>0])}var Lc={name:"emscripten::val",fromWireType:i=>{var l=Me(i);return Ar(i),l},toWireType:(i,l)=>Fe(l),Cb:_t,readValueFromPointer:Er,Eb:null};function Wc(i){return lt(i>>>0,Lc)}var Gc=(i,l)=>{switch(l){case 4:return function(p){return this.fromWireType(Ae()[p>>>2>>>0])};case 8:return function(p){return this.fromWireType(he()[p>>>3>>>0])};default:throw new TypeError(`invalid float width (${l}): ${i}`)}};function Hc(i,l,p){p>>>=0,lt(i>>>=0,{name:l=Je(l>>>0),fromWireType:h=>h,toWireType:(h,b)=>b,Cb:_t,readValueFromPointer:Gc(l,p),Eb:null})}function Fc(i,l,p,h,b){if(i>>>=0,p>>>=0,l=Je(l>>>0),b===-1&&(b=4294967295),b=z=>z,h===0){var C=32-8*p;b=z=>z<<C>>>C}var P=l.includes("unsigned")?function(z,N){return N>>>0}:function(z,N){return N};lt(i,{name:l,fromWireType:b,toWireType:P,Cb:_t,readValueFromPointer:gi(l,p,h!==0),Eb:null})}function qc(i,l,p){function h(C){var P=X()[C>>>2>>>0];return C=X()[C+4>>>2>>>0],new b(le().buffer,C,P)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][l];lt(i>>>=0,{name:p=Je(p>>>0),fromWireType:h,Cb:_t,readValueFromPointer:h},{Tb:!0})}var kt=(i,l,p)=>{var h=xe();if(l>>>=0,0<p){var b=l;p=l+p-1;for(var C=0;C<i.length;++C){var P=i.charCodeAt(C);if(55296<=P&&57343>=P&&(P=65536+((1023&P)<<10)|1023&i.charCodeAt(++C)),127>=P){if(l>=p)break;h[l++>>>0]=P}else{if(2047>=P){if(l+1>=p)break;h[l++>>>0]=192|P>>6}else{if(65535>=P){if(l+2>=p)break;h[l++>>>0]=224|P>>12}else{if(l+3>=p)break;h[l++>>>0]=240|P>>18,h[l++>>>0]=128|P>>12&63}h[l++>>>0]=128|P>>6&63}h[l++>>>0]=128|63&P}}h[l>>>0]=0,i=l-b}else i=0;return i},kr=i=>{for(var l=0,p=0;p<i.length;++p){var h=i.charCodeAt(p);127>=h?l++:2047>=h?l+=2:55296<=h&&57343>=h?(l+=4,++p):l+=3}return l};function jc(i,l){lt(i>>>=0,{name:l=Je(l>>>0),fromWireType:function(p){for(var h,b=X()[p>>>2>>>0],C=p+4,P=C,z=0;z<=b;++z){var N=C+z;z!=b&&xe()[N>>>0]!=0||(P=Ee(P,N-P),h===void 0?h=P:(h+="\0",h+=P),P=N+1)}return ct(p),h},toWireType:function(p,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var b=typeof h=="string";if(!(b||ArrayBuffer.isView(h)&&h.BYTES_PER_ELEMENT==1))throw new Wt("Cannot pass non-string to std::string");var C=b?kr(h):h.length,P=$n(4+C+1),z=P+4;return X()[P>>>2>>>0]=C,b?kt(h,z,C+1):xe().set(h,z>>>0),p!==null&&p.push(ct,P),P},Cb:_t,readValueFromPointer:Er,Eb(p){ct(p)}})}var yi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Kc=(i,l)=>{for(var p=i>>1,h=p+l/2;!(p>=h)&&R()[p>>>0];)++p;if(32<(p<<=1)-i&&yi)return yi.decode(xe().slice(i,p));for(p="",h=0;!(h>=l/2);++h){var b=fe()[i+2*h>>>1>>>0];if(b==0)break;p+=String.fromCharCode(b)}return p},Zc=(i,l,p)=>{if(p??=2147483647,2>p)return 0;var h=l;p=(p-=2)<2*i.length?p/2:i.length;for(var b=0;b<p;++b){var C=i.charCodeAt(b);fe()[l>>>1>>>0]=C,l+=2}return fe()[l>>>1>>>0]=0,l-h},Qc=i=>2*i.length,Yc=(i,l)=>{for(var p=0,h="";!(p>=l/4);){var b=k()[i+4*p>>>2>>>0];if(b==0)break;++p,65536<=b?(b-=65536,h+=String.fromCharCode(55296|b>>10,56320|1023&b)):h+=String.fromCharCode(b)}return h},Xc=(i,l,p)=>{if(l>>>=0,p??=2147483647,4>p)return 0;var h=l;p=h+p-4;for(var b=0;b<i.length;++b){var C=i.charCodeAt(b);if(55296<=C&&57343>=C&&(C=65536+((1023&C)<<10)|1023&i.charCodeAt(++b)),k()[l>>>2>>>0]=C,(l+=4)+4>p)break}return k()[l>>>2>>>0]=0,l-h},Jc=i=>{for(var l=0,p=0;p<i.length;++p){var h=i.charCodeAt(p);55296<=h&&57343>=h&&++p,l+=4}return l};function ep(i,l,p){if(i>>>=0,l>>>=0,p=Je(p>>>=0),l===2)var h=Kc,b=Zc,C=Qc,P=z=>R()[z>>>1>>>0];else l===4&&(h=Yc,b=Xc,C=Jc,P=z=>X()[z>>>2>>>0]);lt(i,{name:p,fromWireType:z=>{for(var N,G=X()[z>>>2>>>0],Z=z+4,re=0;re<=G;++re){var pe=z+4+re*l;re!=G&&P(pe)!=0||(Z=h(Z,pe-Z),N===void 0?N=Z:(N+="\0",N+=Z),Z=pe+l)}return ct(z),N},toWireType:(z,N)=>{if(typeof N!="string")throw new Wt(`Cannot pass non-string to C++ string type ${p}`);var G=C(N),Z=$n(4+G+l);return X()[Z>>>2>>>0]=G/l,b(N,Z+4,G+l),z!==null&&z.push(ct,Z),Z},Cb:_t,readValueFromPointer:Er,Eb(z){ct(z)}})}function tp(i,l){lt(i>>>=0,{Ub:!0,name:l=Je(l>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function np(i){Vr(i>>>0,!s,1,!a,131072,!1),Zo()}var Pr=i=>{if(!oe)try{if(i(),!(0<yt))try{u?Lr(S):Sr(S)}catch(l){l instanceof vr||l=="unwind"||_(0,l)}}catch(l){l instanceof vr||l=="unwind"||_(0,l)}};function Or(i){i>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(k(),i>>>2,i).value.then(fn),i+=128,Atomics.store(k(),i>>>2,1))}var fn=()=>{var i=Nr();i&&(Or(i),Pr(qi))};function rp(i,l){(i>>>=0)==l>>>0?setTimeout(fn):u?postMessage({Hb:i,Db:"checkMailbox"}):(i=Et[i])&&i.postMessage({Db:"checkMailbox"})}var Dr=[];function op(i,l,p,h,b){for(l>>>=0,h/=2,Dr.length=h,p=b>>>0>>>3,b=0;b<h;b++)Dr[b]=F[p+2*b]?F[p+2*b+1]:he()[p+2*b+1>>>0];return(l?Ur[l]:Yp[i])(...Dr)}var ip=()=>{yt=0};function ap(i){i>>>=0,u?postMessage({Db:"cleanupThread",ic:i}):Ko(Et[i])}function sp(i){}var hn=(i,l)=>{var p=Cr[i];if(p===void 0)throw i=Vi(i),p=Je(i),ct(i),new Wt(`${l} has unknown type ${p}`);return p},bi=(i,l,p)=>{var h=[];return i=i.toWireType(h,p),h.length&&(X()[l>>>2>>>0]=Fe(h)),i};function up(i,l,p){return l>>>=0,p>>>=0,i=Me(i>>>0),l=hn(l,"emval::as"),bi(l,p,i)}function lp(i,l){return l>>>=0,i=Me(i>>>0),(l=hn(l,"emval::as")).toWireType(null,i)}var gn=i=>{try{i()}catch(l){gt(l)}},wt=0,et=null,_i=0,yn=[],wi={},vi={},dp=0,Br=null,cp=[];function $i(i){return(function(l){if(!oe){if(wt===0){var p=!1,h=!1;l((b=0)=>{if(!oe&&(_i=b,p=!0,h)){wt=2,gn(()=>Yi(et)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),b=!1;try{var C=(function(){var N=k()[et+8>>>2>>>0];return N=M[vi[N]],--yt,N()})()}catch(N){C=N,b=!0}var P=!1;if(!et){var z=Br;z&&(Br=null,(b?z.reject:z.resolve)(C),P=!0)}if(b&&!P)throw C}}),h=!0,p||(wt=1,et=(function(){var b=$n(65548),C=b+12;X()[b>>>2>>>0]=C,X()[b+4>>>2>>>0]=C+65536,C=yn[0];var P=wi[C];return P===void 0&&(P=dp++,wi[C]=P,vi[P]=C),C=P,k()[b+8>>>2>>>0]=C,b})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),gn(()=>Zi(et)))}else wt===2?(wt=0,gn(Xi),ct(et),et=null,cp.forEach(Pr)):gt(`invalid state: ${wt}`);return _i}})(l=>{i().then(l)})}function pp(i){return i>>>=0,$i(async()=>{var l=await Me(i);return Fe(l)})}var bn=[];function mp(i,l,p,h){return p>>>=0,h>>>=0,(i=bn[i>>>0])(null,l=Me(l>>>0),p,h)}var fp={},_n=i=>{var l=fp[i];return l===void 0?Je(i):l};function hp(i,l,p,h,b){return p>>>=0,h>>>=0,b>>>=0,(i=bn[i>>>0])(l=Me(l>>>0),l[p=_n(p)],h,b)}function gp(i,l){return l>>>=0,(i=Me(i>>>0))==Me(l)}var xi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function yp(i){return(i>>>=0)==0?Fe(xi()):(i=_n(i),Fe(xi()[i]))}var bp=i=>{var l=bn.length;return bn.push(i),l},_p=(i,l)=>{for(var p=Array(i),h=0;h<i;++h)p[h]=hn(X()[l+4*h>>>2>>>0],`parameter ${h}`);return p};function wp(i,l,p){var h=(l=_p(i,l>>>0)).shift();i--;var b=`return function (obj, func, destructorsRef, args) {
`,C=0,P=[];p===0&&P.push("obj");for(var z=["retType"],N=[h],G=0;G<i;++G)P.push(`arg${G}`),z.push(`argType${G}`),N.push(l[G]),b+=`  var arg${G} = argType${G}.readValueFromPointer(args${C?"+"+C:""});
`,C+=l[G].Cb;return b+=`  var rv = ${p===1?"new func":"func.call"}(${P.join(", ")});
`,h.Ub||(z.push("emval_returnValue"),N.push(bi),b+=`  return emval_returnValue(retType, destructorsRef, rv);
`),i=new Function(...z,b+`};
`)(...N),p=`methodCaller<(${l.map(Z=>Z.name).join(", ")}) => ${h.name}>`,bp(Object.defineProperty(i,"name",{value:p}))}function vp(i){return i=_n(i>>>0),Fe(n[i])}function $p(i,l){return l>>>=0,i=Me(i>>>0),l=Me(l),Fe(i[l])}function xp(i){9<(i>>>=0)&&(dt[i+1]+=1)}function Sp(){return Fe([])}function Tp(i){i=Me(i>>>0);for(var l=Array(i.length),p=0;p<i.length;p++)l[p]=i[p];return Fe(l)}function Cp(i){return Fe(_n(i>>>0))}function Ip(){return Fe({})}function Ap(i){for(var l=Me(i>>>=0);l.length;){var p=l.pop();l.pop()(p)}Ar(i)}function Ep(i,l,p){l>>>=0,p>>>=0,i=Me(i>>>0),l=Me(l),p=Me(p),i[l]=p}function kp(i,l){return l>>>=0,i=(i=hn(i>>>0,"_emval_take_value")).readValueFromPointer(l),Fe(i)}function Pp(i,l){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),l>>>=0,i=new Date(1e3*i),k()[l>>>2>>>0]=i.getUTCSeconds(),k()[l+4>>>2>>>0]=i.getUTCMinutes(),k()[l+8>>>2>>>0]=i.getUTCHours(),k()[l+12>>>2>>>0]=i.getUTCDate(),k()[l+16>>>2>>>0]=i.getUTCMonth(),k()[l+20>>>2>>>0]=i.getUTCFullYear()-1900,k()[l+24>>>2>>>0]=i.getUTCDay(),i=(i.getTime()-Date.UTC(i.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,k()[l+28>>>2>>>0]=i}var Si=i=>i%4==0&&(i%100!=0||i%400==0),Ti=[0,31,60,91,121,152,182,213,244,274,305,335],Ci=[0,31,59,90,120,151,181,212,243,273,304,334];function Op(i,l){i=-9007199254740992>i||9007199254740992<i?NaN:Number(i),l>>>=0,i=new Date(1e3*i),k()[l>>>2>>>0]=i.getSeconds(),k()[l+4>>>2>>>0]=i.getMinutes(),k()[l+8>>>2>>>0]=i.getHours(),k()[l+12>>>2>>>0]=i.getDate(),k()[l+16>>>2>>>0]=i.getMonth(),k()[l+20>>>2>>>0]=i.getFullYear()-1900,k()[l+24>>>2>>>0]=i.getDay();var p=(Si(i.getFullYear())?Ti:Ci)[i.getMonth()]+i.getDate()-1|0;k()[l+28>>>2>>>0]=p,k()[l+36>>>2>>>0]=-60*i.getTimezoneOffset(),p=new Date(i.getFullYear(),6,1).getTimezoneOffset();var h=new Date(i.getFullYear(),0,1).getTimezoneOffset();i=0|(p!=h&&i.getTimezoneOffset()==Math.min(h,p)),k()[l+32>>>2>>>0]=i}function Dp(i){i>>>=0;var l=new Date(k()[i+20>>>2>>>0]+1900,k()[i+16>>>2>>>0],k()[i+12>>>2>>>0],k()[i+8>>>2>>>0],k()[i+4>>>2>>>0],k()[i>>>2>>>0],0),p=k()[i+32>>>2>>>0],h=l.getTimezoneOffset(),b=new Date(l.getFullYear(),6,1).getTimezoneOffset(),C=new Date(l.getFullYear(),0,1).getTimezoneOffset(),P=Math.min(C,b);return 0>p?k()[i+32>>>2>>>0]=+(b!=C&&P==h):0<p!=(P==h)&&(b=Math.max(C,b),l.setTime(l.getTime()+6e4*((0<p?P:b)-h))),k()[i+24>>>2>>>0]=l.getDay(),p=(Si(l.getFullYear())?Ti:Ci)[l.getMonth()]+l.getDate()-1|0,k()[i+28>>>2>>>0]=p,k()[i>>>2>>>0]=l.getSeconds(),k()[i+4>>>2>>>0]=l.getMinutes(),k()[i+8>>>2>>>0]=l.getHours(),k()[i+12>>>2>>>0]=l.getDate(),k()[i+16>>>2>>>0]=l.getMonth(),k()[i+20>>>2>>>0]=l.getYear(),i=l.getTime(),BigInt(isNaN(i)?-1:i/1e3)}function Ii(i,l,p,h,b,C,P){return u?Se(16,1,i,l,p,h,b,C,P):-52}function Ai(i,l,p,h,b,C){if(u)return Se(17,1,i,l,p,h,b,C)}var Jt={},Bp=()=>performance.timeOrigin+performance.now();function Ei(i,l){if(u)return Se(18,1,i,l);if(Jt[i]&&(clearTimeout(Jt[i].id),delete Jt[i]),!l)return 0;var p=setTimeout(()=>{delete Jt[i],Pr(()=>Fi(i,performance.timeOrigin+performance.now()))},l);return Jt[i]={id:p,rc:l},0}function zp(i,l,p,h){i>>>=0,l>>>=0,p>>>=0,h>>>=0;var b=new Date().getFullYear(),C=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var P=Math.max(C,b);X()[i>>>2>>>0]=60*P,k()[l>>>2>>>0]=+(C!=b),i=(l=z=>{var N=Math.abs(z);return`UTC${0<=z?"-":"+"}${String(Math.floor(N/60)).padStart(2,"0")}${String(N%60).padStart(2,"0")}`})(C),l=l(b),b<C?(kt(i,p,17),kt(l,h,17)):(kt(i,h,17),kt(l,p,17))}var Mp=()=>Date.now(),Rp=1;function Up(i,l,p){if(!(0<=i&&3>=i))return 28;if(i===0)i=Date.now();else{if(!Rp)return 52;i=performance.timeOrigin+performance.now()}return F[p>>>0>>>3]=BigInt(Math.round(1e6*i)),0}var zr=[],ki=(i,l)=>{zr.length=0;for(var p;p=xe()[i++>>>0];){var h=p!=105;l+=(h&=p!=112)&&l%8?4:0,zr.push(p==112?X()[l>>>2>>>0]:p==106?F[l>>>3]:p==105?k()[l>>>2>>>0]:he()[l>>>3>>>0]),l+=h?8:4}return zr};function Np(i,l,p){return i>>>=0,l=ki(l>>>0,p>>>0),Ur[i](...l)}function Vp(i,l,p){return i>>>=0,l=ki(l>>>0,p>>>0),Ur[i](...l)}var Lp=()=>{};function Wp(i,l){return K(Ee(i>>>0,l>>>0))}var Gp=()=>{throw yt+=1,"unwind"};function Hp(){return 4294901760}var Fp=()=>navigator.hardwareConcurrency;function qp(){return gt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function jp(i){i>>>=0;var l=xe().length;if(i<=l||4294901760<i)return!1;for(var p=1;4>=p;p*=2){var h=l*(1+.2/p);h=Math.min(h,i+100663296);e:{h=(Math.min(4294901760,65536*Math.ceil(Math.max(i,h)/65536))-v.buffer.byteLength+65535)/65536|0;try{v.grow(h),me();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}var wn=()=>(gt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Gt={},Pi=i=>{i.forEach(l=>{var p=wn();p&&(Gt[p]=l)})};function Kp(){var i=Error().stack.toString().split(`
`);return i[0]=="Error"&&i.shift(),Pi(i),Gt.Mb=wn(),Gt.dc=i,Gt.Mb}function Zp(i,l,p){if(i>>>=0,l>>>=0,Gt.Mb==i)var h=Gt.dc;else(h=Error().stack.toString().split(`
`))[0]=="Error"&&h.shift(),Pi(h);for(var b=3;h[b]&&wn()!=i;)++b;for(i=0;i<p&&h[i+b];++i)k()[l+4*i>>>2>>>0]=wn();return i}var Mr,Rr={},Oi=()=>{if(!Mr){var i,l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(i in Rr)Rr[i]===void 0?delete l[i]:l[i]=Rr[i];var p=[];for(i in l)p.push(`${i}=${l[i]}`);Mr=p}return Mr};function Di(i,l){if(u)return Se(19,1,i,l);i>>>=0,l>>>=0;var p,h=0,b=0;for(p of Oi()){var C=l+h;X()[i+b>>>2>>>0]=C,h+=kt(p,C,1/0)+1,b+=4}return 0}function Bi(i,l){if(u)return Se(20,1,i,l);i>>>=0,l>>>=0;var p=Oi();for(var h of(X()[i>>>2>>>0]=p.length,i=0,p))i+=kr(h)+1;return X()[l>>>2>>>0]=i,0}function zi(i){return u?Se(21,1,i):52}function Mi(i,l,p,h){return u?Se(22,1,i,l,p,h):52}function Ri(i,l,p,h){return u?Se(23,1,i,l,p,h):70}var Qp=[null,[],[]];function Ui(i,l,p,h){if(u)return Se(24,1,i,l,p,h);l>>>=0,p>>>=0,h>>>=0;for(var b=0,C=0;C<p;C++){var P=X()[l>>>2>>>0],z=X()[l+4>>>2>>>0];l+=8;for(var N=0;N<z;N++){var G=i,Z=xe()[P+N>>>0],re=Qp[G];Z===0||Z===10?((G===1?te:K)(ti(re)),re.length=0):re.push(Z)}b+=z}return X()[h>>>2>>>0]=b,0}u||(function(){for(var i=n.numThreads-1;i--;)Yo();$r.push(()=>{Xe++,(function(l){u?l():Promise.all(bt.map(Qo)).then(l)})(()=>wr())})})();for(var Ni=Array(256),vn=0;256>vn;++vn)Ni[vn]=String.fromCharCode(vn);hi=Ni,dt.push(0,1,void 0,1,null,1,!0,1,!1,1),n.count_emval_handles=()=>dt.length/2-5-Ir.length,u||(v=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),me()),n.wasmBinary&&(x=n.wasmBinary),n.stackSave=()=>Gr(),n.stackRestore=i=>xn(i),n.stackAlloc=i=>Wr(i),n.setValue=function(i,l,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":le()[i>>>0]=l;break;case"i16":fe()[i>>>1>>>0]=l;break;case"i32":k()[i>>>2>>>0]=l;break;case"i64":F[i>>>3]=BigInt(l);break;case"float":Ae()[i>>>2>>>0]=l;break;case"double":he()[i>>>3>>>0]=l;break;case"*":X()[i>>>2>>>0]=l;break;default:gt(`invalid type for setValue: ${p}`)}},n.getValue=function(i,l="i8"){switch(l.endsWith("*")&&(l="*"),l){case"i1":case"i8":return le()[i>>>0];case"i16":return fe()[i>>>1>>>0];case"i32":return k()[i>>>2>>>0];case"i64":return F[i>>>3];case"float":return Ae()[i>>>2>>>0];case"double":return he()[i>>>3>>>0];case"*":return X()[i>>>2>>>0];default:gt(`invalid type for getValue: ${l}`)}},n.UTF8ToString=Ee,n.stringToUTF8=kt,n.lengthBytesUTF8=kr;var Yp=[xr,qo,Xo,ni,ri,oi,ii,ai,si,ui,li,di,ci,pi,mi,fi,Ii,Ai,Ei,Di,Bi,zi,Mi,Ri,Ui],Ur={1299348:(i,l,p,h,b)=>{if(n===void 0||!n.Fb)return 1;if((i=Ee(Number(i>>>0))).startsWith("./")&&(i=i.substring(2)),!(i=n.Fb.get(i)))return 2;if(l=Number(l>>>0),p=Number(p>>>0),h=Number(h>>>0),l+p>i.byteLength)return 3;try{let C=i.subarray(l,l+p);switch(b){case 0:xe().set(C,h>>>0);break;case 1:n.mc?n.mc(h,C):n.cc(h,C);break;default:return 4}return 0}catch{return 4}},1300172:(i,l,p)=>{n.Pb(i,xe().subarray(l>>>0,l+p>>>0))},1300236:()=>n.oc(),1300278:i=>{n.Ob(i)},1300315:()=>{n.Wb()},1300346:()=>{n.Xb()},1300375:()=>{n.ac()},1300400:i=>n.Vb(i),1300433:i=>n.Zb(i),1300465:(i,l,p)=>{n.Lb(Number(i),Number(l),Number(p),!0)},1300528:(i,l,p)=>{n.Lb(Number(i),Number(l),Number(p))},1300585:()=>typeof wasmOffsetConverter<"u",1300642:i=>{n.Ab("Abs",i,void 0)},1300693:i=>{n.Ab("Neg",i,void 0)},1300744:i=>{n.Ab("Floor",i,void 0)},1300797:i=>{n.Ab("Ceil",i,void 0)},1300849:i=>{n.Ab("Reciprocal",i,void 0)},1300907:i=>{n.Ab("Sqrt",i,void 0)},1300959:i=>{n.Ab("Exp",i,void 0)},1301010:i=>{n.Ab("Erf",i,void 0)},1301061:i=>{n.Ab("Sigmoid",i,void 0)},1301116:(i,l,p)=>{n.Ab("HardSigmoid",i,{alpha:l,beta:p})},1301195:i=>{n.Ab("Log",i,void 0)},1301246:i=>{n.Ab("Sin",i,void 0)},1301297:i=>{n.Ab("Cos",i,void 0)},1301348:i=>{n.Ab("Tan",i,void 0)},1301399:i=>{n.Ab("Asin",i,void 0)},1301451:i=>{n.Ab("Acos",i,void 0)},1301503:i=>{n.Ab("Atan",i,void 0)},1301555:i=>{n.Ab("Sinh",i,void 0)},1301607:i=>{n.Ab("Cosh",i,void 0)},1301659:i=>{n.Ab("Asinh",i,void 0)},1301712:i=>{n.Ab("Acosh",i,void 0)},1301765:i=>{n.Ab("Atanh",i,void 0)},1301818:i=>{n.Ab("Tanh",i,void 0)},1301870:i=>{n.Ab("Not",i,void 0)},1301921:(i,l,p)=>{n.Ab("Clip",i,{min:l,max:p})},1301990:i=>{n.Ab("Clip",i,void 0)},1302042:(i,l)=>{n.Ab("Elu",i,{alpha:l})},1302100:i=>{n.Ab("Gelu",i,void 0)},1302152:i=>{n.Ab("Relu",i,void 0)},1302204:(i,l)=>{n.Ab("LeakyRelu",i,{alpha:l})},1302268:(i,l)=>{n.Ab("ThresholdedRelu",i,{alpha:l})},1302338:(i,l)=>{n.Ab("Cast",i,{to:l})},1302396:i=>{n.Ab("Add",i,void 0)},1302447:i=>{n.Ab("Sub",i,void 0)},1302498:i=>{n.Ab("Mul",i,void 0)},1302549:i=>{n.Ab("Div",i,void 0)},1302600:i=>{n.Ab("Pow",i,void 0)},1302651:i=>{n.Ab("Equal",i,void 0)},1302704:i=>{n.Ab("Greater",i,void 0)},1302759:i=>{n.Ab("GreaterOrEqual",i,void 0)},1302821:i=>{n.Ab("Less",i,void 0)},1302873:i=>{n.Ab("LessOrEqual",i,void 0)},1302932:(i,l,p,h,b)=>{n.Ab("ReduceMean",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1303107:(i,l,p,h,b)=>{n.Ab("ReduceMax",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1303281:(i,l,p,h,b)=>{n.Ab("ReduceMin",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1303455:(i,l,p,h,b)=>{n.Ab("ReduceProd",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1303630:(i,l,p,h,b)=>{n.Ab("ReduceSum",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1303804:(i,l,p,h,b)=>{n.Ab("ReduceL1",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1303977:(i,l,p,h,b)=>{n.Ab("ReduceL2",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1304150:(i,l,p,h,b)=>{n.Ab("ReduceLogSum",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1304327:(i,l,p,h,b)=>{n.Ab("ReduceSumSquare",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1304507:(i,l,p,h,b)=>{n.Ab("ReduceLogSumExp",i,{keepDims:!!l,noopWithEmptyAxes:!!p,axes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1304687:i=>{n.Ab("Where",i,void 0)},1304740:(i,l,p)=>{n.Ab("Transpose",i,{perm:l?Array.from(k().subarray(Number(l)>>>0,Number(p)>>>0)):[]})},1304864:(i,l,p,h)=>{n.Ab("DepthToSpace",i,{blocksize:l,mode:Ee(p),format:h?"NHWC":"NCHW"})},1304997:(i,l,p,h)=>{n.Ab("DepthToSpace",i,{blocksize:l,mode:Ee(p),format:h?"NHWC":"NCHW"})},1305130:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe)=>{n.Ab("ConvTranspose",i,{format:N?"NHWC":"NCHW",autoPad:l,dilations:[p],group:h,kernelShape:[b],pads:[C,P],strides:[z],wIsConst:()=>!!le()[G>>>0],outputPadding:Z?Array.from(k().subarray(Number(Z)>>>0,Number(re)>>>0)):[],outputShape:pe?Array.from(k().subarray(Number(pe)>>>0,Number(_e)>>>0)):[],activation:Ee(Pe)})},1305563:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e)=>{n.Ab("ConvTranspose",i,{format:z?"NHWC":"NCHW",autoPad:l,dilations:Array.from(k().subarray(Number(p)>>>0,(Number(p)>>>0)+2>>>0)),group:h,kernelShape:Array.from(k().subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from(k().subarray(Number(C)>>>0,(Number(C)>>>0)+4>>>0)),strides:Array.from(k().subarray(Number(P)>>>0,(Number(P)>>>0)+2>>>0)),wIsConst:()=>!!le()[N>>>0],outputPadding:G?Array.from(k().subarray(Number(G)>>>0,Number(Z)>>>0)):[],outputShape:re?Array.from(k().subarray(Number(re)>>>0,Number(pe)>>>0)):[],activation:Ee(_e)})},1306224:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe)=>{n.Ab("ConvTranspose",i,{format:N?"NHWC":"NCHW",autoPad:l,dilations:[p],group:h,kernelShape:[b],pads:[C,P],strides:[z],wIsConst:()=>!!le()[G>>>0],outputPadding:Z?Array.from(k().subarray(Number(Z)>>>0,Number(re)>>>0)):[],outputShape:pe?Array.from(k().subarray(Number(pe)>>>0,Number(_e)>>>0)):[],activation:Ee(Pe)})},1306657:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e)=>{n.Ab("ConvTranspose",i,{format:z?"NHWC":"NCHW",autoPad:l,dilations:Array.from(k().subarray(Number(p)>>>0,(Number(p)>>>0)+2>>>0)),group:h,kernelShape:Array.from(k().subarray(Number(b)>>>0,(Number(b)>>>0)+2>>>0)),pads:Array.from(k().subarray(Number(C)>>>0,(Number(C)>>>0)+4>>>0)),strides:Array.from(k().subarray(Number(P)>>>0,(Number(P)>>>0)+2>>>0)),wIsConst:()=>!!le()[N>>>0],outputPadding:G?Array.from(k().subarray(Number(G)>>>0,Number(Z)>>>0)):[],outputShape:re?Array.from(k().subarray(Number(re)>>>0,Number(pe)>>>0)):[],activation:Ee(_e)})},1307318:(i,l)=>{n.Ab("GlobalAveragePool",i,{format:l?"NHWC":"NCHW"})},1307409:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e)=>{n.Ab("AveragePool",i,{format:_e?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:b,dilations:C?Array.from(k().subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:z?Array.from(k().subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:G?Array.from(k().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:re?Array.from(k().subarray(Number(re)>>>0,Number(pe)>>>0)):[]})},1307888:(i,l)=>{n.Ab("GlobalAveragePool",i,{format:l?"NHWC":"NCHW"})},1307979:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e)=>{n.Ab("AveragePool",i,{format:_e?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:b,dilations:C?Array.from(k().subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:z?Array.from(k().subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:G?Array.from(k().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:re?Array.from(k().subarray(Number(re)>>>0,Number(pe)>>>0)):[]})},1308458:(i,l)=>{n.Ab("GlobalMaxPool",i,{format:l?"NHWC":"NCHW"})},1308545:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e)=>{n.Ab("MaxPool",i,{format:_e?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:b,dilations:C?Array.from(k().subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:z?Array.from(k().subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:G?Array.from(k().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:re?Array.from(k().subarray(Number(re)>>>0,Number(pe)>>>0)):[]})},1309020:(i,l)=>{n.Ab("GlobalMaxPool",i,{format:l?"NHWC":"NCHW"})},1309107:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e)=>{n.Ab("MaxPool",i,{format:_e?"NHWC":"NCHW",auto_pad:l,ceil_mode:p,count_include_pad:h,storage_order:b,dilations:C?Array.from(k().subarray(Number(C)>>>0,Number(P)>>>0)):[],kernel_shape:z?Array.from(k().subarray(Number(z)>>>0,Number(N)>>>0)):[],pads:G?Array.from(k().subarray(Number(G)>>>0,Number(Z)>>>0)):[],strides:re?Array.from(k().subarray(Number(re)>>>0,Number(pe)>>>0)):[]})},1309582:(i,l,p,h,b)=>{n.Ab("Gemm",i,{alpha:l,beta:p,transA:h,transB:b})},1309686:i=>{n.Ab("MatMul",i,void 0)},1309740:(i,l,p,h)=>{n.Ab("ArgMax",i,{keepDims:!!l,selectLastIndex:!!p,axis:h})},1309848:(i,l,p,h)=>{n.Ab("ArgMin",i,{keepDims:!!l,selectLastIndex:!!p,axis:h})},1309956:(i,l)=>{n.Ab("Softmax",i,{axis:l})},1310019:(i,l)=>{n.Ab("Concat",i,{axis:l})},1310079:(i,l,p,h,b)=>{n.Ab("Split",i,{axis:l,numOutputs:p,splitSizes:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1310235:i=>{n.Ab("Expand",i,void 0)},1310289:(i,l)=>{n.Ab("Gather",i,{axis:Number(l)})},1310360:(i,l)=>{n.Ab("GatherElements",i,{axis:Number(l)})},1310439:(i,l)=>{n.Ab("GatherND",i,{batch_dims:Number(l)})},1310518:(i,l,p,h,b,C,P,z,N,G,Z)=>{n.Ab("Resize",i,{antialias:l,axes:p?Array.from(k().subarray(Number(p)>>>0,Number(h)>>>0)):[],coordinateTransformMode:Ee(b),cubicCoeffA:C,excludeOutside:P,extrapolationValue:z,keepAspectRatioPolicy:Ee(N),mode:Ee(G),nearestMode:Ee(Z)})},1310880:(i,l,p,h,b,C,P)=>{n.Ab("Slice",i,{starts:l?Array.from(k().subarray(Number(l)>>>0,Number(p)>>>0)):[],ends:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[],axes:C?Array.from(k().subarray(Number(C)>>>0,Number(P)>>>0)):[]})},1311144:i=>{n.Ab("Tile",i,void 0)},1311196:(i,l,p)=>{n.Ab("InstanceNormalization",i,{epsilon:l,format:p?"NHWC":"NCHW"})},1311310:(i,l,p)=>{n.Ab("InstanceNormalization",i,{epsilon:l,format:p?"NHWC":"NCHW"})},1311424:i=>{n.Ab("Range",i,void 0)},1311477:(i,l)=>{n.Ab("Einsum",i,{equation:Ee(l)})},1311558:(i,l,p,h,b)=>{n.Ab("Pad",i,{mode:l,value:p,pads:h?Array.from(k().subarray(Number(h)>>>0,Number(b)>>>0)):[]})},1311701:(i,l,p,h,b,C)=>{n.Ab("BatchNormalization",i,{epsilon:l,momentum:p,spatial:!!b,trainingMode:!!h,format:C?"NHWC":"NCHW"})},1311870:(i,l,p,h,b,C)=>{n.Ab("BatchNormalization",i,{epsilon:l,momentum:p,spatial:!!b,trainingMode:!!h,format:C?"NHWC":"NCHW"})},1312039:(i,l,p)=>{n.Ab("CumSum",i,{exclusive:Number(l),reverse:Number(p)})},1312136:(i,l,p)=>{n.Ab("DequantizeLinear",i,{axis:l,blockSize:p})},1312226:(i,l,p,h,b)=>{n.Ab("GridSample",i,{align_corners:l,mode:Ee(p),padding_mode:Ee(h),format:b?"NHWC":"NCHW"})},1312396:(i,l,p,h,b)=>{n.Ab("GridSample",i,{align_corners:l,mode:Ee(p),padding_mode:Ee(h),format:b?"NHWC":"NCHW"})},1312566:(i,l)=>{n.Ab("ScatterND",i,{reduction:Ee(l)})},1312651:(i,l,p,h,b,C,P,z,N)=>{n.Ab("Attention",i,{numHeads:l,isUnidirectional:p,maskFilterValue:h,scale:b,doRotary:C,qkvHiddenSizes:P?Array.from(k().subarray(Number(z)>>>0,Number(z)+P>>>0)):[],pastPresentShareBuffer:!!N})},1312923:i=>{n.Ab("BiasAdd",i,void 0)},1312978:i=>{n.Ab("BiasSplitGelu",i,void 0)},1313039:i=>{n.Ab("FastGelu",i,void 0)},1313095:(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne)=>{n.Ab("Conv",i,{format:re?"NHWC":"NCHW",auto_pad:l,dilations:p?Array.from(k().subarray(Number(p)>>>0,Number(h)>>>0)):[],group:b,kernel_shape:C?Array.from(k().subarray(Number(C)>>>0,Number(P)>>>0)):[],pads:z?Array.from(k().subarray(Number(z)>>>0,Number(N)>>>0)):[],strides:G?Array.from(k().subarray(Number(G)>>>0,Number(Z)>>>0)):[],w_is_const:()=>!!le()[Number(pe)>>>0],activation:Ee(_e),activation_params:Pe?Array.from(Ae().subarray(Number(Pe)>>>0,Number(Ne)>>>0)):[]})},1313679:i=>{n.Ab("Gelu",i,void 0)},1313731:(i,l,p,h,b,C,P,z,N)=>{n.Ab("GroupQueryAttention",i,{numHeads:l,kvNumHeads:p,scale:h,softcap:b,doRotary:C,rotaryInterleaved:P,smoothSoftmax:z,localWindowSize:N})},1313948:(i,l,p,h)=>{n.Ab("LayerNormalization",i,{axis:l,epsilon:p,simplified:!!h})},1314059:(i,l,p,h)=>{n.Ab("LayerNormalization",i,{axis:l,epsilon:p,simplified:!!h})},1314170:(i,l,p,h,b,C)=>{n.Ab("MatMulNBits",i,{k:l,n:p,accuracyLevel:h,bits:b,blockSize:C})},1314297:(i,l,p,h,b,C)=>{n.Ab("MultiHeadAttention",i,{numHeads:l,isUnidirectional:p,maskFilterValue:h,scale:b,doRotary:C})},1314456:(i,l)=>{n.Ab("QuickGelu",i,{alpha:l})},1314520:(i,l,p,h,b)=>{n.Ab("RotaryEmbedding",i,{interleaved:!!l,numHeads:p,rotaryEmbeddingDim:h,scale:b})},1314659:(i,l,p)=>{n.Ab("SkipLayerNormalization",i,{epsilon:l,simplified:!!p})},1314761:(i,l,p)=>{n.Ab("SkipLayerNormalization",i,{epsilon:l,simplified:!!p})},1314863:(i,l,p,h)=>{n.Ab("GatherBlockQuantized",i,{gatherAxis:l,quantizeAxis:p,blockSize:h})},1314984:i=>{n.$b(i)},1315018:(i,l)=>n.bc(Number(i),Number(l),n.Gb.ec,n.Gb.errors)};function Xp(i,l,p){return $i(async()=>{await n.Yb(Number(i),Number(l),Number(p))})}function Jp(){return typeof wasmOffsetConverter<"u"}var M=await(async function(){function i(h,b){return M=h.exports,M=(function(){var C=M,P={};for(let[z,N]of Object.entries(C))P[z]=typeof N=="function"?(...G)=>{yn.push(z);try{return N(...G)}finally{oe||(yn.pop(),et&&wt===1&&yn.length===0&&(wt=0,yt+=1,gn(Qi),typeof Fibers<"u"&&Fibers.sc()))}}:N;return P})(),M=(function(){var C=M,P=N=>G=>N(G)>>>0,z=N=>()=>N()>>>0;return(C=Object.assign({},C)).Ea=P(C.Ea),C.gb=z(C.gb),C.ib=P(C.ib),C.tb=P(C.tb),C.ub=z(C.ub),C.__cxa_get_exception_ptr=P(C.__cxa_get_exception_ptr),C})(),jo.push(M.jb),$=b,wr(),M}Xe++;var l=Go();if(n.instantiateWasm)return new Promise(h=>{n.instantiateWasm(l,(b,C)=>{h(i(b,C))})});if(u)return new Promise(h=>{ie=b=>{var C=new WebAssembly.Instance(b,Go());h(i(C,b))}});He??=n.locateFile?n.locateFile?n.locateFile("ort-wasm-simd-threaded.jsep.wasm",w):w+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var p=await(async function(h){var b=He;if(!x&&typeof WebAssembly.instantiateStreaming=="function"&&!ce(b))try{var C=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(C,h)}catch(P){K(`wasm streaming compile failed: ${P}`),K("falling back to ArrayBuffer instantiation")}return(async function(P,z){try{var N=await(async function(G){if(!x)try{var Z=await f(G);return new Uint8Array(Z)}catch{}if(G==He&&x)G=new Uint8Array(x);else{if(!g)throw"both async and sync fetching of the wasm failed";G=g(G)}return G})(P);return await WebAssembly.instantiate(N,z)}catch(G){K(`failed to asynchronously prepare wasm: ${G}`),gt(G)}})(b,h)})(l);return i(p.instance,p.module)}catch(h){return r(h),Promise.reject(h)}})(),Vi=i=>(Vi=M.Ea)(i),Li=()=>(Li=M.Fa)();n._OrtInit=(i,l)=>(n._OrtInit=M.Ga)(i,l),n._OrtGetLastError=(i,l)=>(n._OrtGetLastError=M.Ha)(i,l),n._OrtCreateSessionOptions=(i,l,p,h,b,C,P,z,N,G)=>(n._OrtCreateSessionOptions=M.Ia)(i,l,p,h,b,C,P,z,N,G),n._OrtAppendExecutionProvider=(i,l,p,h,b)=>(n._OrtAppendExecutionProvider=M.Ja)(i,l,p,h,b),n._OrtAddFreeDimensionOverride=(i,l,p)=>(n._OrtAddFreeDimensionOverride=M.Ka)(i,l,p),n._OrtAddSessionConfigEntry=(i,l,p)=>(n._OrtAddSessionConfigEntry=M.La)(i,l,p),n._OrtReleaseSessionOptions=i=>(n._OrtReleaseSessionOptions=M.Ma)(i),n._OrtCreateSession=(i,l,p)=>(n._OrtCreateSession=M.Na)(i,l,p),n._OrtReleaseSession=i=>(n._OrtReleaseSession=M.Oa)(i),n._OrtGetInputOutputCount=(i,l,p)=>(n._OrtGetInputOutputCount=M.Pa)(i,l,p),n._OrtGetInputOutputMetadata=(i,l,p,h)=>(n._OrtGetInputOutputMetadata=M.Qa)(i,l,p,h),n._OrtFree=i=>(n._OrtFree=M.Ra)(i),n._OrtCreateTensor=(i,l,p,h,b,C)=>(n._OrtCreateTensor=M.Sa)(i,l,p,h,b,C),n._OrtGetTensorData=(i,l,p,h,b)=>(n._OrtGetTensorData=M.Ta)(i,l,p,h,b),n._OrtReleaseTensor=i=>(n._OrtReleaseTensor=M.Ua)(i),n._OrtCreateRunOptions=(i,l,p,h)=>(n._OrtCreateRunOptions=M.Va)(i,l,p,h),n._OrtAddRunConfigEntry=(i,l,p)=>(n._OrtAddRunConfigEntry=M.Wa)(i,l,p),n._OrtReleaseRunOptions=i=>(n._OrtReleaseRunOptions=M.Xa)(i),n._OrtCreateBinding=i=>(n._OrtCreateBinding=M.Ya)(i),n._OrtBindInput=(i,l,p)=>(n._OrtBindInput=M.Za)(i,l,p),n._OrtBindOutput=(i,l,p,h)=>(n._OrtBindOutput=M._a)(i,l,p,h),n._OrtClearBoundOutputs=i=>(n._OrtClearBoundOutputs=M.$a)(i),n._OrtReleaseBinding=i=>(n._OrtReleaseBinding=M.ab)(i),n._OrtRunWithBinding=(i,l,p,h,b)=>(n._OrtRunWithBinding=M.bb)(i,l,p,h,b),n._OrtRun=(i,l,p,h,b,C,P,z)=>(n._OrtRun=M.cb)(i,l,p,h,b,C,P,z),n._OrtEndProfiling=i=>(n._OrtEndProfiling=M.db)(i),n._JsepOutput=(i,l,p)=>(n._JsepOutput=M.eb)(i,l,p),n._JsepGetNodeName=i=>(n._JsepGetNodeName=M.fb)(i);var Nr=()=>(Nr=M.gb)(),ct=n._free=i=>(ct=n._free=M.hb)(i),$n=n._malloc=i=>($n=n._malloc=M.ib)(i),Vr=(i,l,p,h,b,C)=>(Vr=M.kb)(i,l,p,h,b,C),Wi=()=>(Wi=M.lb)(),Gi=(i,l,p,h,b)=>(Gi=M.mb)(i,l,p,h,b),Hi=i=>(Hi=M.nb)(i),Lr=i=>(Lr=M.ob)(i),Fi=(i,l)=>(Fi=M.pb)(i,l),qi=()=>(qi=M.qb)(),ji=(i,l)=>(ji=M.rb)(i,l),xn=i=>(xn=M.sb)(i),Wr=i=>(Wr=M.tb)(i),Gr=()=>(Gr=M.ub)(),Ki=n.dynCall_ii=(i,l)=>(Ki=n.dynCall_ii=M.vb)(i,l);n.dynCall_vii=(i,l,p)=>(n.dynCall_vii=M.dynCall_vii)(i,l,p),n.dynCall_vi=(i,l)=>(n.dynCall_vi=M.dynCall_vi)(i,l),n.dynCall_iiii=(i,l,p,h)=>(n.dynCall_iiii=M.dynCall_iiii)(i,l,p,h),n.dynCall_i=i=>(n.dynCall_i=M.dynCall_i)(i),n.dynCall_viiiiiiii=(i,l,p,h,b,C,P,z,N)=>(n.dynCall_viiiiiiii=M.dynCall_viiiiiiii)(i,l,p,h,b,C,P,z,N),n.dynCall_viii=(i,l,p,h)=>(n.dynCall_viii=M.dynCall_viii)(i,l,p,h),n.dynCall_viiiiii=(i,l,p,h,b,C,P)=>(n.dynCall_viiiiii=M.dynCall_viiiiii)(i,l,p,h,b,C,P),n.dynCall_viijj=(i,l,p,h,b)=>(n.dynCall_viijj=M.dynCall_viijj)(i,l,p,h,b),n.dynCall_iii=(i,l,p)=>(n.dynCall_iii=M.dynCall_iii)(i,l,p),n.dynCall_viiii=(i,l,p,h,b)=>(n.dynCall_viiii=M.dynCall_viiii)(i,l,p,h,b),n.dynCall_iiiii=(i,l,p,h,b)=>(n.dynCall_iiiii=M.dynCall_iiiii)(i,l,p,h,b),n.dynCall_iiiiiiii=(i,l,p,h,b,C,P,z)=>(n.dynCall_iiiiiiii=M.dynCall_iiiiiiii)(i,l,p,h,b,C,P,z),n.dynCall_iiiiiii=(i,l,p,h,b,C,P)=>(n.dynCall_iiiiiii=M.dynCall_iiiiiii)(i,l,p,h,b,C,P),n.dynCall_vfiii=(i,l,p,h,b)=>(n.dynCall_vfiii=M.dynCall_vfiii)(i,l,p,h,b),n.dynCall_viiiiff=(i,l,p,h,b,C,P)=>(n.dynCall_viiiiff=M.dynCall_viiiiff)(i,l,p,h,b,C,P),n.dynCall_viiiiiff=(i,l,p,h,b,C,P,z)=>(n.dynCall_viiiiiff=M.dynCall_viiiiiff)(i,l,p,h,b,C,P,z),n.dynCall_ffff=(i,l,p,h)=>(n.dynCall_ffff=M.dynCall_ffff)(i,l,p,h),n.dynCall_viiff=(i,l,p,h,b)=>(n.dynCall_viiff=M.dynCall_viiff)(i,l,p,h,b),n.dynCall_fffffff=(i,l,p,h,b,C,P)=>(n.dynCall_fffffff=M.dynCall_fffffff)(i,l,p,h,b,C,P),n.dynCall_viiiii=(i,l,p,h,b,C)=>(n.dynCall_viiiii=M.dynCall_viiiii)(i,l,p,h,b,C),n.dynCall_jjjjjjj=(i,l,p,h,b,C,P)=>(n.dynCall_jjjjjjj=M.dynCall_jjjjjjj)(i,l,p,h,b,C,P),n.dynCall_jjjjjj=(i,l,p,h,b,C)=>(n.dynCall_jjjjjj=M.dynCall_jjjjjj)(i,l,p,h,b,C),n.dynCall_iijjii=(i,l,p,h,b,C)=>(n.dynCall_iijjii=M.dynCall_iijjii)(i,l,p,h,b,C),n.dynCall_viiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e)=>(n.dynCall_viiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e),n.dynCall_viiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z)=>(n.dynCall_viiiiiiiiii=M.dynCall_viiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z),n.dynCall_viiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re)=>(n.dynCall_viiiiiiiiiii=M.dynCall_viiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re),n.dynCall_viiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe)=>(n.dynCall_viiiiiiiiiiii=M.dynCall_viiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe),n.dynCall_viiiiiiiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt,en)=>(n.dynCall_viiiiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt,en),n.dynCall_viiiiiiiii=(i,l,p,h,b,C,P,z,N,G)=>(n.dynCall_viiiiiiiii=M.dynCall_viiiiiiiii)(i,l,p,h,b,C,P,z,N,G),n.dynCall_viiiiiiiiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt,en,Hr)=>(n.dynCall_viiiiiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt,en,Hr),n.dynCall_viiiiiii=(i,l,p,h,b,C,P,z)=>(n.dynCall_viiiiiii=M.dynCall_viiiiiii)(i,l,p,h,b,C,P,z),n.dynCall_viiiiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne)=>(n.dynCall_viiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne),n.dynCall_jiji=(i,l,p,h)=>(n.dynCall_jiji=M.dynCall_jiji)(i,l,p,h),n.dynCall_v=i=>(n.dynCall_v=M.dynCall_v)(i),n.dynCall_iidiiii=(i,l,p,h,b,C,P)=>(n.dynCall_iidiiii=M.dynCall_iidiiii)(i,l,p,h,b,C,P),n.dynCall_iiiiii=(i,l,p,h,b,C)=>(n.dynCall_iiiiii=M.dynCall_iiiiii)(i,l,p,h,b,C),n.dynCall_iiiiiiiii=(i,l,p,h,b,C,P,z,N)=>(n.dynCall_iiiiiiiii=M.dynCall_iiiiiiiii)(i,l,p,h,b,C,P,z,N),n.dynCall_iiij=(i,l,p,h)=>(n.dynCall_iiij=M.dynCall_iiij)(i,l,p,h),n.dynCall_iiiiiiiiii=(i,l,p,h,b,C,P,z,N,G)=>(n.dynCall_iiiiiiiiii=M.dynCall_iiiiiiiiii)(i,l,p,h,b,C,P,z,N,G),n.dynCall_iiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe)=>(n.dynCall_iiiiiiiiiiiii=M.dynCall_iiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe),n.dynCall_iiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z)=>(n.dynCall_iiiiiiiiiii=M.dynCall_iiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z),n.dynCall_ji=(i,l)=>(n.dynCall_ji=M.dynCall_ji)(i,l),n.dynCall_vij=(i,l,p)=>(n.dynCall_vij=M.dynCall_vij)(i,l,p),n.dynCall_viiijii=(i,l,p,h,b,C,P)=>(n.dynCall_viiijii=M.dynCall_viiijii)(i,l,p,h,b,C,P),n.dynCall_viijiiiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt)=>(n.dynCall_viijiiiiiiiiiiiiii=M.dynCall_viijiiiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt),n.dynCall_viiiji=(i,l,p,h,b,C)=>(n.dynCall_viiiji=M.dynCall_viiiji)(i,l,p,h,b,C),n.dynCall_fi=(i,l)=>(n.dynCall_fi=M.dynCall_fi)(i,l),n.dynCall_fii=(i,l,p)=>(n.dynCall_fii=M.dynCall_fii)(i,l,p),n.dynCall_jii=(i,l,p)=>(n.dynCall_jii=M.dynCall_jii)(i,l,p),n.dynCall_dii=(i,l,p)=>(n.dynCall_dii=M.dynCall_dii)(i,l,p),n.dynCall_fiiii=(i,l,p,h,b)=>(n.dynCall_fiiii=M.dynCall_fiiii)(i,l,p,h,b),n.dynCall_fif=(i,l,p)=>(n.dynCall_fif=M.dynCall_fif)(i,l,p),n.dynCall_jfi=(i,l,p)=>(n.dynCall_jfi=M.dynCall_jfi)(i,l,p),n.dynCall_viiiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe)=>(n.dynCall_viiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe),n.dynCall_viiiiiiiiiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt,en,Hr,em)=>(n.dynCall_viiiiiiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt,Pt,en,Hr,em),n.dynCall_viiiiiiiiiiiiiiii=(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt)=>(n.dynCall_viiiiiiiiiiiiiiii=M.dynCall_viiiiiiiiiiiiiiii)(i,l,p,h,b,C,P,z,N,G,Z,re,pe,_e,Pe,Ne,pt),n.dynCall_fiii=(i,l,p,h)=>(n.dynCall_fiii=M.dynCall_fiii)(i,l,p,h),n.dynCall_viij=(i,l,p,h)=>(n.dynCall_viij=M.dynCall_viij)(i,l,p,h),n.dynCall_jiij=(i,l,p,h)=>(n.dynCall_jiij=M.dynCall_jiij)(i,l,p,h),n.dynCall_iif=(i,l,p)=>(n.dynCall_iif=M.dynCall_iif)(i,l,p),n.dynCall_jiiii=(i,l,p,h,b)=>(n.dynCall_jiiii=M.dynCall_jiiii)(i,l,p,h,b),n.dynCall_jiii=(i,l,p,h)=>(n.dynCall_jiii=M.dynCall_jiii)(i,l,p,h),n.dynCall_viif=(i,l,p,h)=>(n.dynCall_viif=M.dynCall_viif)(i,l,p,h),n.dynCall_viiij=(i,l,p,h,b)=>(n.dynCall_viiij=M.dynCall_viiij)(i,l,p,h,b),n.dynCall_viiiijii=(i,l,p,h,b,C,P,z)=>(n.dynCall_viiiijii=M.dynCall_viiiijii)(i,l,p,h,b,C,P,z),n.dynCall_viji=(i,l,p,h)=>(n.dynCall_viji=M.dynCall_viji)(i,l,p,h),n.dynCall_vifi=(i,l,p,h)=>(n.dynCall_vifi=M.dynCall_vifi)(i,l,p,h),n.dynCall_vidi=(i,l,p,h)=>(n.dynCall_vidi=M.dynCall_vidi)(i,l,p,h),n.dynCall_viijii=(i,l,p,h,b,C)=>(n.dynCall_viijii=M.dynCall_viijii)(i,l,p,h,b,C),n.dynCall_iiiiij=(i,l,p,h,b,C)=>(n.dynCall_iiiiij=M.dynCall_iiiiij)(i,l,p,h,b,C),n.dynCall_iiiiid=(i,l,p,h,b,C)=>(n.dynCall_iiiiid=M.dynCall_iiiiid)(i,l,p,h,b,C),n.dynCall_iiiiijj=(i,l,p,h,b,C,P)=>(n.dynCall_iiiiijj=M.dynCall_iiiiijj)(i,l,p,h,b,C,P),n.dynCall_iiiiiijj=(i,l,p,h,b,C,P,z)=>(n.dynCall_iiiiiijj=M.dynCall_iiiiiijj)(i,l,p,h,b,C,P,z);var Zi=i=>(Zi=M.wb)(i),Qi=()=>(Qi=M.xb)(),Yi=i=>(Yi=M.yb)(i),Xi=()=>(Xi=M.zb)();return(function i(){if(0<Xe)ht=i;else if(u)t(n),Ce();else{for(;0<$r.length;)$r.shift()(n);0<Xe?ht=i:(n.calledRun=!0,oe||(Ce(),t(n)))}})(),n.PTR_SIZE=4,o},um=Oa,lm=globalThis.self?.name?.startsWith("em-pthread");lm&&Oa()});var Ra,to,dm,We,Ua,eo,cm,pm,Na,mm,za,Va,Ma,La,En=L(()=>{"use strict";An();Ra=typeof location>"u"?void 0:location.origin,to=import.meta.url>"file:"&&import.meta.url<"file;",dm=()=>{if(!!1){if(to){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Ra).href}return import.meta.url}},We=dm(),Ua=()=>{if(We&&!We.startsWith("blob:"))return We.substring(0,We.lastIndexOf("/")+1)},eo=(e,t)=>{try{let r=t??We;return(r?new URL(e,r):new URL(e)).origin===Ra}catch{return!1}},cm=(e,t)=>{let r=t??We;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},pm=(e,t)=>`${t??"./"}${e}`,Na=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},mm=async e=>(await import(/*webpackIgnore:true*/ /*@vite-ignore*/e)).default,za=(Pa(),tn(ka)).default,Va=async()=>{if(!We)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(eo(We))return[void 0,za()];let e=await Na(We);return[e,za(e)]},Ma=(Ba(),tn(Da)).default,La=async(e,t,r,n)=>{let o=Ma&&!(e||t);if(o)if(We)o=eo(We)||n&&!r;else if(n&&!r)o=!0;else throw new Error("cannot determine the script source URL.");if(o)return[void 0,Ma];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??cm(a,t),u=!!1&&r&&s&&!eo(s,t),d=u?await Na(s):s??pm(a,t);return[u?d:void 0,await mm(d)]}}});var no,ro,Un,Wa,fm,hm,gm,kn,we,xt=L(()=>{"use strict";En();ro=!1,Un=!1,Wa=!1,fm=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},hm=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},gm=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},kn=async e=>{if(ro)return Promise.resolve();if(Un)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Wa)throw new Error("previous call to 'initializeWebAssembly()' failed.");Un=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!gm())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!hm())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=fm();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,a=typeof o=="string"?o:void 0,s=o?.mjs,u=s?.href??s,d=o?.wasm,c=d?.href??d,m=e.wasmBinary,[f,g]=await La(u,a,r>1,!!m||!!c),_=!1,y=[];if(t>0&&y.push(new Promise(w=>{setTimeout(()=>{_=!0,w()},t)})),y.push(new Promise((w,x)=>{let v={numThreads:r};if(m)v.wasmBinary=m,v.locateFile=$=>$;else if(c||a)v.locateFile=$=>c??a+$;else if(u&&u.indexOf("blob:")!==0)v.locateFile=$=>new URL($,u).href;else if(f){let $=Ua();$&&(v.locateFile=S=>$+S)}g(v).then($=>{Un=!1,ro=!0,no=$,w(),f&&URL.revokeObjectURL(f)},$=>{Un=!1,Wa=!0,x($)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},we=()=>{if(ro&&no)return no;throw new Error("WebAssembly is not initialized yet.")}});var Ge,on,ge,Nn=L(()=>{"use strict";xt();Ge=(e,t)=>{let r=we(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},on=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,a])=>{let s=t?t+o:o;if(typeof a=="object")on(a,s+".",r,n);else if(typeof a=="string"||typeof a=="number")n(s,a.toString());else if(typeof a=="boolean")n(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},ge=e=>{let t=we(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let a=Number(t.getValue(o,n===4?"i32":"i64")),s=t.getValue(o+n,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}});var Ga,Ha=L(()=>{"use strict";xt();Nn();Ga=e=>{let t=we(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Ge(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,a),r===0&&ge("Can't create run options."),e?.extra!==void 0&&on(e.extra,"",new WeakSet,(s,u)=>{let d=Ge(s,n),c=Ge(u,n);t._OrtAddRunConfigEntry(r,d,c)!==0&&ge(`Can't set a run config entry: ${s} - ${u}.`)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(s=>t._free(s)),a}}});var ym,bm,_m,Ft,wm,Fa,qa=L(()=>{"use strict";xt();Nn();ym=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},bm=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},_m=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Ft=(e,t,r,n)=>{let o=Ge(t,n),a=Ge(r,n);we()._OrtAddSessionConfigEntry(e,o,a)!==0&&ge(`Can't set a session config entry: ${t} - ${r}.`)},wm=async(e,t,r)=>{let n=t.executionProviders;for(let o of n){let a=typeof o=="string"?o:o.name,s=[];switch(a){case"webnn":if(a="WEBNN",Ft(e,"session.disable_quant_qdq","1",r),Ft(e,"session.disable_qdq_constant_folding","1",r),typeof o!="string"){let g=o?.deviceType;g&&Ft(e,"deviceType",g,r)}break;case"webgpu":if(a="JS",typeof o!="string"){let f=o;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Ft(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let u=Ge(a,r),d=s.length,c=0,m=0;if(d>0){c=we()._malloc(d*we().PTR_SIZE),r.push(c),m=we()._malloc(d*we().PTR_SIZE),r.push(m);for(let f=0;f<d;f++)we().setValue(c+f*we().PTR_SIZE,s[f][0],"*"),we().setValue(m+f*we().PTR_SIZE,s[f][1],"*")}await we()._OrtAppendExecutionProvider(e,u,c,m,d)!==0&&ge(`Can't append execution provider: ${a}.`)}},Fa=async e=>{let t=we(),r=0,n=[],o=e||{};_m(o);try{let a=ym(o.graphOptimizationLevel??"all"),s=bm(o.executionMode??"sequential"),u=typeof o.logId=="string"?Ge(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log severity level is not valid: ${d}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let m=typeof o.optimizedModelFilePath=="string"?Ge(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(a,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,u,d,c,m),r===0&&ge("Can't create session options."),o.executionProviders&&await wm(r,o,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);Ft(r,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[f,g]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let _=Ge(f,n);t._OrtAddFreeDimensionOverride(r,_,g)!==0&&ge(`Can't set a free dimension override: ${f} - ${g}.`)}return o.extra!==void 0&&on(o.extra,"",new WeakSet,(f,g)=>{Ft(r,f,g,n)}),[r,n]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&ge("Can't release session options."),n.forEach(s=>t._free(s)),a}}});var St,tt,Tt,qt,an,Vn,Ln,oo,ne=L(()=>{"use strict";St=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},tt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Tt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,a)=>o*a,1);return r>0?Math.ceil(n*r):void 0},qt=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},an=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Vn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ln=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",oo=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var sn,io=L(()=>{"use strict";An();sn=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=qr("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=qr("node:fs"),n=r(e),o=[];for await(let a of n)o.push(a);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),a;try{a=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let d=Math.ceil(n/65536);a=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let s=0;for(;;){let{done:u,value:d}=await o.read();if(u)break;let c=d.byteLength;new Uint8Array(a,s,c).set(d),s+=c}return new Uint8Array(a,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var vm,$m,ja,Ka,Wn,xm,de,nt=L(()=>{"use strict";ne();vm=["V","I","W","E","F"],$m=(e,t)=>{console.log(`[${vm[e]},${new Date().toISOString()}]${t}`)},Wn=(e,t)=>{ja=e,Ka=t},xm=(e,t)=>{let r=an(e),n=an(ja);r>=n&&$m(r,typeof t=="function"?t():t)},de=(...e)=>{Ka&&xm(...e)}});var ao,rt,E,Mt,Gn,Za,Qa,ae=L(()=>{"use strict";ao=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},rt=class{static calcShape(t,r,n=!1){let o=t.length,a=r.length;if(o===0)return r;if(a===0)return t;let s=Math.max(t.length,r.length),u=new Array(s);if(n){if(o<2||a<2)return;let d=ao.calcMatMulShape([t[o-2],t[o-1]],[r[a-2],r[a-1]]);if(d===void 0)return;[u[s-2],u[s-1]]=d}for(let d=n?3:1;d<=s;d++){let c=o-d<0?1:t[o-d],m=a-d<0?1:r[a-d];if(c!==m&&c>1&&m>1)return;let f=Math.max(c,m);if(c&&m)u[s-d]=Math.max(c,m);else{if(f>1)return;u[s-d]=0}}return u}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let a=1;a<=n;a++)if(t[n-a]!==1&&t[n-a]!==r[o-a])return!1;return!0}},E=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),a=n-1;for(;a>=0;){if(t[a]%r===0){o[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");o[a]=1,r/=t[a],a--}for(a--;a>=0;a--)o[a]=t[a];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let a=r;a<n;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[a])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,a)=>o+r[a]+r[a+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},Mt=class e{static adjustPoolAttributes(t,r,n,o,a,s){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<o.length){if(o[u]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let u=0;u<n.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<n.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=n[u]||s[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(s?1:2)],r[d],n[d],o[d],a,d,d+t.length-2,u)}}static computePoolOutputShape(t,r,n,o,a,s,u,d=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let c=[r[0],r[1]];return e.computeShapeHelper(t,r,c,n,o,a,s,u,d),c}static computeConvOutputShape(t,r,n,o,a,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return e.computeShapeHelper(!1,t,d,n,o,a,s,u),d}static computeShapeHelper(t,r,n,o,a,s,u,d,c=0){if(t)for(let m=0;m<r.length-2;m++)n.push(1);else for(let m=0;m<r.length-2;m++)n.push(e.adjustPadAndReturnShape(r[m+2],o[m],a[m],s[m],u,m,m+r.length-2,d,c))}static computeOutputSize(t,r,n,o,a){let s=Math.floor(t/r)+1;return a===1&&(s=Math.ceil(t/r)+1,(s-1)*r>=n+o&&(s-=1)),s}static adjustPadAndReturnShape(t,r,n,o,a,s,u,d,c=0){let m=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return a[s]=0,a[u]=0,e.computeOutputSize(t-m,r,t,0,c);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let g=(Math.floor((t+r-1)/r)-1)*r+o-t;return a[s]=Math.floor(d==="SAME_LOWER"?(g+1)/2:g/2),a[u]=g-a[s],e.computeOutputSize(t+a[s]+a[u]-m,r,t,a[s],c)}default:throw new Error("Unsupported AutoPad type")}else return e.computeOutputSize(t+a[s]+a[u]-m,r,t,a[s],c)}},Gn=class{static getShapeOfGemmResult(t,r,n,o,a){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let s,u,d;r?(s=t[1],u=t[0]):(s=t[0],u=t[1]);let c=-1;if(o?(d=n[0],c=1):(d=n[1],c=0),n[c]!==u)throw new Error("dimension mismatch");if(s<=0||d<=0||u<=0)throw new Error("invalid shape specified");if(a&&!rt.isValidBroadcast(a,[s,d]))throw new Error("gemm: invalid bias shape for broadcast");return[s,d,u]}},Za=-34028234663852886e22,Qa=34028234663852886e22});var Hn,so=L(()=>{"use strict";ne();Hn=(e,t)=>new(qt(t))(e)});var Xa,Sm,Ja,Tm,Ya,Cm,es,Fn,qn,uo,ts,ns=L(()=>{"use strict";ne();nt();Xa=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Sm=(e,t)=>{if(t==="int32")return e;let r=Xa.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let o=e.byteLength/n,a=new(qt(t))(e.buffer,e.byteOffset,o);switch(t){case"int64":case"uint64":{let s=new Int32Array(o);for(let u=0;u<o;u++){let d=a[u];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(d)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ja=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let o=BigInt64Array.from(n,BigInt);return new Uint8Array(o.buffer)}case"uint64":{if(n.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let o=BigUint64Array.from(n,BigInt);return new Uint8Array(o.buffer)}case"int8":{if(n.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let o=Int8Array.from(n,Number);return new Uint8Array(o.buffer)}case"uint8":{if(n.some(o=>o<0||o>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number)}case"uint32":{if(n.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let o=Uint32Array.from(n,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Tm=1,Ya=()=>Tm++,Cm=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),es=(e,t)=>{let r=Xa.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((n,o)=>n*o)*r/8):0},Fn=class{constructor(t){this.isDataConverted=!1;let{sessionId:r,context:n,tensor:o,dataType:a,shape:s,fallbackDataType:u}=t;this.sessionId=r,this.mlContext=n,this.mlTensor=o,this.dataType=a,this.tensorShape=s,this.fallbackDataType=u}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return es(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){if(this.fallbackDataType){let r=await this.mlContext.readTensor(this.mlTensor),n=Ja(new Uint8Array(r),this.dataType);if(t){(t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)).set(n);return}else return new Uint8Array(n).buffer}else return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(t,r,n){return this.mlContext===t&&this.dataType===r&&this.tensorShape.length===n.length&&this.tensorShape.every((o,a)=>o===n[a])}setIsDataConverted(t){this.isDataConverted=t}},qn=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n,o){let a=this.tensorManager.getMLContext(t),s=this.tensorManager.getMLOpSupportLimits(t),u;if(!s?.input.dataTypes.includes(r)){if(u=Cm.get(r),!u||!s?.input.dataTypes.includes(u))throw new Error(`WebNN backend does not support data type: ${r}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${u}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,r,n))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==es(r,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let d=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,n,d,!0,!0,u),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let r=t;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")r=Sm(t,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(r);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(t){if(this.activeUpload){let r=this.wrapper?.isDataConverted?Ja(this.activeUpload,this.wrapper?.type):this.activeUpload;if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(r):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},uo=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(t){let r=this.backend.getMLContext(t);if(!r)throw new Error("MLContext not found for session.");return r}getMLOpSupportLimits(t){return this.backend.getMLOpSupportLimits(t)}reserveTensorId(){let t=Ya();return this.tensorTrackersById.set(t,new qn(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o,a){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${n}, shape: ${o}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(r);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(t,n,o,a)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let a=this.getMLContext(t),s=Ya(),u=new Fn({sessionId:t,context:a,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(s,new qn(this,u)),this.externalTensors.add(u),s}async getCachedTensor(t,r,n,o,a,s,u){let d=this.getMLContext(t);for(let[m,f]of this.freeTensors.entries())if(f.canReuseTensor(d,r,n)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${u?`fallbackDataType: ${u},`:""} shape: ${n}`);let g=this.freeTensors.splice(m,1)[0];return g.sessionId=t,g}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${u?`fallbackDataType: ${u},`:""} shape: ${n}}`);let c=await d.createTensor({dataType:u??r,shape:n,dimensions:n,usage:o,writable:a,readable:s});return new Fn({sessionId:t,context:d,tensor:c,dataType:r,shape:n,fallbackDataType:u})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},ts=(...e)=>new uo(...e)});var jn,Im,Kn,rs=L(()=>{"use strict";ne();xt();so();ns();nt();jn=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Im=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,a)=>o===n[a]&&e[o]===t[o])},Kn=class{constructor(t){this.tensorManager=ts(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.sessionGraphOutputs=new Map;this.temporaryGraphInputs=[];this.temporaryGraphOutputs=[];this.temporarySessionTensorIds=new Map;this.mlOpSupportLimitsBySessionId=new Map;Wn(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let r=this.temporarySessionTensorIds.get(t);if(r){for(let n of r)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${n}}`),this.tensorManager.releaseTensorId(n);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>Im(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t),this.mlOpSupportLimitsBySessionId.has(t)||this.mlOpSupportLimitsBySessionId.set(t,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(t,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t),this.sessionGraphOutputs.delete(t);let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t),this.mlOpSupportLimitsBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(a=>a.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}getMLOpSupportLimits(t){return this.mlOpSupportLimitsBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o,a){let s=jn.get(n);if(!s)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,r,s,o,a)}async createTemporaryTensor(t,r,n){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${n}}`);let o=jn.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,a,o,n,!1);let s=this.temporarySessionTensorIds.get(t);return s?s.push(a):this.temporarySessionTensorIds.set(t,[a]),a}uploadTensor(t,r){if(!we().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Hn(n,r)}}registerMLTensor(t,r,n,o){let a=jn.get(n);if(!a)throw new Error(`Unsupported ONNX data type: ${n}`);let s=this.tensorManager.registerTensor(t,r,a,o);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${a}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerGraphInput(t){this.temporaryGraphInputs.push(t)}registerGraphOutput(t){this.temporaryGraphOutputs.push(t)}isGraphInput(t,r){let n=this.sessionGraphInputs.get(t);return n?n.includes(r):!1}isGraphOutput(t,r){let n=this.sessionGraphOutputs.get(t);return n?n.includes(r):!1}isGraphInputOutputTypeSupported(t,r,n=!0){let o=jn.get(St(r)),a=this.mlOpSupportLimitsBySessionId.get(t);return typeof o>"u"?!1:n?!!a?.input.dataTypes.includes(o):!!a?.output.dataTypes.includes(o)}flush(){}}});var Zn=L(()=>{"use strict"});var os,lo,co,Am,Em,is,mo,po,ss,us=L(()=>{"use strict";nt();Zn();os=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),lo=[],co=e=>Math.ceil(Number(e)/16)*16,Am=e=>{for(let t=0;t<lo.length;t++){let r=lo[t];if(e<=r)return r}return Math.ceil(e/16)*16},Em=1,is=()=>Em++,mo=async(e,t,r,n)=>{let o=co(r),a=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,o),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},po=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of os)lo.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,a=r.byteLength,s=co(a),u=this.storageCache.get(t);if(!u)throw new Error("gpu data for uploading does not exist");if(Number(u.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${u.originalSize}, data size=${a}`);if(s===a&&o%4===0)this.backend.device.queue.writeBuffer(u.gpuData.buffer,0,n,o,a);else{let d=new Uint8Array(s);d.set(r),this.backend.device.queue.writeBuffer(u.gpuData.buffer,0,d,0,s)}de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=co(n.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,a)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=is();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Am(t),o,a=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let c=(a?this.freeBuffers:this.freeUniformBuffers).get(n);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let u={id:is(),type:0,buffer:o};return this.storageCache.set(u.id,{gpuData:u,originalSize:Number(t)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${u.id}`),u}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await mo(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=os.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ss=(...e)=>new po(...e)});var fo,J,Te=L(()=>{"use strict";fo=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},J=e=>new fo(e)});var Rt,go,$e,Ie,W,ye,yo,Ut,Ke,q,Qn,O,U,ls,Yn,ho,ds,ue=L(()=>{"use strict";ne();ae();Rt=64,go=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},$e=(e,t=1)=>{let r=go(e,t);return typeof r=="string"?r:r[0]},Ie=(e,t=1)=>{let r=go(e,t);return typeof r=="string"?r:r[1]},W=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:E.computeStrides(r)})}),t},ye=e=>e%4===0?4:e%2===0?2:1,yo=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Ut=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Ke=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,q=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Qn=(e,t,r,n,o)=>{let a=typeof r=="number",s=a?r:r.length,u=[...new Array(s).keys()],d=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,c=go(t,o),m=typeof c=="string"?c:c[1],f=typeof c=="string"?c:c[0],g={indices:d,value:m,storage:f,tensor:t},_=R=>typeof R=="string"?R:`${R}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=a?"uniforms.":"",x=`${w}${e}_shape`,v=`${w}${e}_strides`,$="";for(let R=0;R<s-1;R++)$+=`
    let dim${R} = current / ${q(v,R,s)};
    let rest${R} = current % ${q(v,R,s)};
    indices[${R}] = dim${R};
    current = rest${R};
    `;$+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${$}
    return indices;
  }`,T=R=>(y.offsetToIndices=!0,s<2?R:`o2i_${e}(${R})`),A=[];if(s>=2)for(let R=s-1;R>=0;R--)A.push(`${q(v,R,s)} * (indices[${R}])`);let I=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${A.join("+")};
  }`,D=R=>(y.indicesToOffset=!0,s<2?R:`i2o_${e}(${R})`),B=(...R)=>s===0?"0u":`${g.indices}(${R.map(_).join(",")})`,V=(R,k)=>s<2?`${R}`:`${q(R,k,s)}`,H=(R,k,X)=>s<2?`${R}=${X};`:`${q(R,k,s)}=${X};`,F={},j=(R,k)=>{y.broadcastedIndicesToOffset=!0;let X=`${k.name}broadcastedIndicesTo${e}Offset`;if(X in F)return`${X}(${R})`;let Ae=[];for(let he=s-1;he>=0;he--){let ke=k.indicesGet("outputIndices",he+k.rank-s);Ae.push(`${V(v,he)} * (${ke} % ${V(x,he)})`)}return F[X]=`fn ${X}(outputIndices: ${k.type.indices}) -> u32 {
             return ${Ae.length>0?Ae.join("+"):"0u"};
           }`,`${X}(${R})`},ee=(R,k)=>(()=>{if(g.storage===g.value)return`${e}[${R}]=${k};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${R}]=vec2<u32>(u32(${k}), select(0u, 0xFFFFFFFFu, ${k} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${R}]=vec2<u32>(u32(${k}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${R}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${k}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),ie=R=>(()=>{if(g.storage===g.value)return`${e}[${R}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${R}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${R}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${R}] & 0xFFu), bool(${e}[${R}] & 0xFF00u), bool(${e}[${R}] & 0xFF0000u), bool(${e}[${R}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),Q=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${m} {
    return ${ie(`i2o_${e}(indices)`)};
  }`,Y=s<2?"":(()=>{let R=u.map(X=>`d${X}: u32`).join(", "),k=u.map(X=>`d${X}`).join(", ");return`
  fn get_${e}(${R}) -> ${m} {
    return get_${e}ByIndices(${B(k)});
  }`})(),te=(...R)=>{if(R.length!==s)throw new Error(`indices length must be ${s}`);let k=R.map(_).join(",");return s===0?ie("0u"):s===1?ie(k[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${k})`)},K=R=>s<2?ie(R):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${R})`),oe=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${m}) {
    ${ee(`i2o_${e}(indices)`,"value")}
  }`,ce=s<2?"":(()=>{let R=u.map(X=>`d${X}: u32`).join(", "),k=u.map(X=>`d${X}`).join(", ");return`
  fn set_${e}(${R}, value: ${m}) {
    set_${e}ByIndices(${B(k)}, value);
  }`})();return{impl:()=>{let R=[],k=!1;return y.offsetToIndices&&(R.push(S),k=!0),y.indicesToOffset&&(R.push(I),k=!0),y.broadcastedIndicesToOffset&&(Object.values(F).forEach(X=>R.push(X)),k=!0),y.set&&(R.push(ce),k=!0),y.setByIndices&&(R.push(oe),k=!0),y.get&&(R.push(Y),k=!0),y.getByIndices&&(R.push(Q),k=!0),!a&&k&&R.unshift(`const ${x} = ${g.indices}(${r.join(",")});`,`const ${v} = ${g.indices}(${E.computeStrides(r).join(",")});`),R.join(`
`)},type:g,offsetToIndices:T,indicesToOffset:D,broadcastedIndicesToOffset:j,indices:B,indicesGet:V,indicesSet:H,set:(...R)=>{if(R.length!==s+1)throw new Error(`indices length must be ${s}`);let k=R[s];if(typeof k!="string")throw new Error("value must be string");let X=R.slice(0,s).map(_).join(",");return s===0?ee("0u",k):s===1?ee(X[0],k):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${X}, ${k})`)},setByOffset:ee,setByIndices:(R,k)=>s<2?ee(R,k):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${R}, ${k});`),get:te,getByOffset:ie,getByIndices:K,usage:n,name:e,strides:v,shape:x,rank:s}},O=(e,t,r,n=1)=>Qn(e,t,r,"input",n),U=(e,t,r,n=1)=>Qn(e,t,r,"output",n),ls=(e,t,r)=>Qn(e,t,r,"atomicOutput",1),Yn=(e,t,r,n=1)=>Qn(e,t,r,"internal",n),ho=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Rt){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,u=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${s}) {
    ${u}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.usage==="atomicOutput"?"atomic<i32>":t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let a=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${a}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},ds=(e,t)=>new ho(e,t)});var km,cs,Pm,Om,Dm,Bm,Be,ps,ms,mt=L(()=>{"use strict";ne();ae();Te();ue();km=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},cs=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Pm=(e,t)=>E.sortBasedOnPerm(e,cs(e.length,t)),Om=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)o+=`a[${e[a]}]=i[${a}];`;return o+="return a;}"},Dm=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},Bm=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Be=(e,t)=>{let r=e.dataType,n=e.dims.length,o=cs(n,t),a=Pm(e.dims,o),s=e.dims,u=a,d=n<2||Bm(o,e.dims),c;if(d)return c=w=>{let x=O("input",r,s,4),v=U("output",r,u,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(x,v)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:c};let{newShape:m,newPerm:f}=Dm(e.dims,o),g=E.areEqual(f,[2,3,1]),_=E.areEqual(f,[3,1,2]);if(m.length===2||g||_){s=g?[m[0],m[1]*m[2]]:_?[m[0]*m[1],m[2]]:m,u=[s[1],s[0]];let w=16;return c=x=>{let v=O("a",r,s.length),$=U("output",r,u.length);return`
  ${x.registerUniform("output_size","u32").declareVariables(v,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${w+1}>, ${w}>;
  ${x.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${v.getByIndices(`${v.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/w),y:Math.ceil(u[0]/w)},programUniforms:[{type:12,data:x},...W(s,u)]}},getShaderSource:c}}return c=w=>{let x=O("a",r,s.length),v=U("output",r,u.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(x,v)}

  ${Om(o,n,x,v)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",x.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=E.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...W(s,u)]}},getShaderSource:c}},ps=(e,t)=>{km(e.inputs,t.perm),e.compute(Be(e.inputs[0],t.perm))},ms=e=>J({perm:e.perm})});var zm,Mm,Rm,Um,Nm,Vm,Lm,Wm,Gm,Hm,ot,fs,hs,gs,ys,bs,_s,ws,vs,$s,xs,Ss=L(()=>{"use strict";ne();ae();ue();Xn();mt();zm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Mm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Rm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Um={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Nm=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Vm=(e,t)=>{let r=[],n=e.length;for(let a=0;a<n;a++)t.indexOf(a)===-1&&r.push(e[a]);let o=t.map(a=>e[a]);return[r,o]},Lm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?n.push(e[o++]):n.push(1);return n},Wm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Gm=(e,t)=>{let r=[];if(!Wm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Hm=(e,t,r,n,o,a,s)=>{let u=r[0].dims,d=E.size(a),c=E.size(s),m=O("_A",r[0].dataType,u),f=U("output",o,a),g=64;d===1&&(g=256);let _=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,y=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(m,f)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Rm[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${zm[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Mm[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${n==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Um[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:c}]})}},ot=(e,t,r,n)=>{let o=e.inputs.length===1?r:bo(e.inputs,r),a=o.axes;a.length===0&&!o.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((_,y)=>y));let s=E.normalizeAxes(a,e.inputs[0].dims.length),u=s,d=e.inputs[0],c=Gm(u,e.inputs[0].dims.length);c.length>0&&(d=e.compute(Be(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],u=Nm(u.length,d.dims.length));let[m,f]=Vm(d.dims,u),g=m;o.keepDims&&(g=Lm(m,s)),e.compute(Hm(t,o.cacheKey,[d],n,e.inputs[0].dataType,g,f),{inputs:[d]})},fs=(e,t)=>{ot(e,"ReduceMeanShared",t,"mean")},hs=(e,t)=>{ot(e,"ReduceL1Shared",t,"l1")},gs=(e,t)=>{ot(e,"ReduceL2Shared",t,"l2")},ys=(e,t)=>{ot(e,"ReduceLogSumExpShared",t,"logSumExp")},bs=(e,t)=>{ot(e,"ReduceMaxShared",t,"max")},_s=(e,t)=>{ot(e,"ReduceMinShared",t,"min")},ws=(e,t)=>{ot(e,"ReduceProdShared",t,"prod")},vs=(e,t)=>{ot(e,"ReduceSumShared",t,"sum")},$s=(e,t)=>{ot(e,"ReduceSumSquareShared",t,"sumSquare")},xs=(e,t)=>{ot(e,"ReduceLogSumShared",t,"logSum")}});var it,Fm,Jn,bo,at,qm,jm,Km,Zm,Qm,Ym,Xm,Jm,ef,tf,st,Ts,Cs,Is,As,Es,ks,Ps,Os,Ds,Bs,Xn=L(()=>{"use strict";ne();ae();Te();ue();Ss();it=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Fm=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Jn=(e,t,r,n,o,a,s=!1,u=!1)=>{let d=[],c=r[0].dims,m=c.length,f=E.normalizeAxes(o,m),g=!u&&f.length===0;c.forEach((x,v)=>{g||f.indexOf(v)>=0?s&&d.push(1):d.push(x)});let _=d.length,y=E.size(d);return{name:e,shaderCache:t,getShaderSource:x=>{let v=[],$=O("_A",r[0].dataType,m),S=U("output",a,_),T=n($,S,f),A=T[2];for(let I=0,D=0;I<m;I++)g||f.indexOf(I)>=0?(s&&D++,A=`for(var j${I}: u32 = 0; j${I} < ${c[I]}; j${I}++) {
                  ${T[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${$.indicesSet("input_indices",I,`j${I}`)}
                  ${A}
                }`):(v.push(`${$.indicesSet("input_indices",I,S.indicesGet("output_indices",D))};`),D++);return`

        ${x.registerUniform("output_size","u32").declareVariables($,S)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${v.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${A}
          ${T[3]}
          ${T.length===4?S.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:a}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...W(c,d)]})}},bo=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),J({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},at=(e,t,r,n)=>{let o=e.inputs,a=o.length===1?r:bo(o,r);e.compute(Jn(t,{hint:a.cacheKey,inputDependencies:["rank"]},[o[0]],a.noopWithEmptyAxes&&a.axes.length===0?Fm:n,a.axes,o[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},qm=(e,t)=>{it(e.inputs),at(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},jm=(e,t)=>{it(e.inputs),at(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},Km=(e,t)=>{it(e.inputs),at(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Zm=(e,t)=>{it(e.inputs),at(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},Qm=(e,t)=>{it(e.inputs),at(e,"ReduceMax",t,(n,o,a)=>{let s=[];for(let u=0;u<n.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(n.indicesSet("input_indices",u,0));return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Ym=(e,t)=>{it(e.inputs),at(e,"ReduceMean",t,(n,o,a)=>{let s=1;for(let u=0;u<n.rank;u++)(a.indexOf(u)>=0||a.length===0)&&(s*=e.inputs[0].dims[u]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Xm=(e,t)=>{it(e.inputs),at(e,"ReduceMin",t,(n,o,a)=>{let s=[];for(let u=0;u<n.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Jm=(e,t)=>{it(e.inputs),at(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},ef=(e,t)=>{it(e.inputs),at(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},tf=(e,t)=>{it(e.inputs),at(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},st=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?n*=e[a]:o*=e[a];return o<32&&n>1024},Ts=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ym(e,t):fs(e,t)},Cs=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?jm(e,t):hs(e,t)},Is=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Km(e,t):gs(e,t)},As=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zm(e,t):ys(e,t)},Es=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qm(e,t):bs(e,t)},ks=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xm(e,t):_s(e,t)},Ps=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jm(e,t):ws(e,t)},Os=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ef(e,t):vs(e,t)},Ds=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tf(e,t):$s(e,t)},Bs=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qm(e,t):xs(e,t)}});var zs,Ms,Rs,_o,Us=L(()=>{"use strict";ne();Te();Xn();zs=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Ms=(e,t)=>{zs(e.inputs);let r=(n,o,a)=>{let s=[];for(let u=0;u<n.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Jn("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Rs=(e,t)=>{zs(e.inputs);let r=(n,o,a)=>{let s=[];for(let u=0;u<n.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Jn("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},_o=e=>J(e)});var nf,wo,rf,of,af,jt,sf,Ns,er=L(()=>{"use strict";ne();ae();Zn();ue();nf=(e,t)=>{let r=e[0],n=e[1],o=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],c=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,g=f,_=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=c;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+g+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(s){if(g!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=s.dims[3])}let x=y+w,v=-1,$=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:w,kvSequenceLength:y,totalSequenceLength:x,maxSequenceLength:v,inputHiddenSize:m,hiddenSize:f,vHiddenSize:_,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},wo=(e,t,r)=>t&&e?`
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
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,rf=(e,t,r,n,o,a,s,u)=>{let d=ye(s?1:a),c=64,m=a/d;m<c&&(c=32);let f=Math.ceil(a/d/c),g=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:m},{type:12,data:f}],_=$e(e.dataType,d),y=Ie(1,d),w=["type"];s&&w.push("type"),u&&w.push("type");let x=v=>{let $=U("x",e.dataType,e.dims,d),S=[$],T=s?O("seq_lens",s.dataType,s.dims):void 0;T&&S.push(T);let A=u?O("total_sequence_length_input",u.dataType,u.dims):void 0;A&&S.push(A);let I=Ie(e.dataType),D=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${v.registerUniforms(D).declareVariables(...S)}
  ${v.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${wo(T,A,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${_};${d}`,inputDependencies:w},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:o,z:t*r},programUniforms:g})}},of=(e,t,r,n,o,a,s,u,d)=>{let c=s+a.kvSequenceLength,m=[a.batchSize,a.numHeads,a.sequenceLength,c],f=e>1&&n,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=f?[a.batchSize,g,c,a.headSize]:void 0,y=a.nReps?a.nReps:1,w=a.scale===0?1/Math.sqrt(a.headSize):a.scale,x=ye(a.headSize),v=a.headSize/x,$=12,S={x:Math.ceil(c/$),y:Math.ceil(a.sequenceLength/$),z:a.batchSize*a.numHeads},T=[{type:12,data:a.sequenceLength},{type:12,data:v},{type:12,data:c},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:w},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:y}],A=f&&n&&E.size(n.dims)>0,I=["type","type"];A&&I.push("type"),o&&I.push("type"),u&&I.push("type"),d&&I.push("type");let D=[{dims:m,dataType:t.dataType,gpuDataType:0}];f&&D.push({dims:_,dataType:t.dataType,gpuDataType:0});let B=V=>{let H=O("q",t.dataType,t.dims,x),F=O("key",r.dataType,r.dims,x),j=[H,F];if(A){let oe=O("past_key",n.dataType,n.dims,x);j.push(oe)}o&&j.push(O("attention_bias",o.dataType,o.dims));let ee=u?O("seq_lens",u.dataType,u.dims):void 0;ee&&j.push(ee);let ie=d?O("total_sequence_length_input",d.dataType,d.dims):void 0;ie&&j.push(ie);let Q=U("output",t.dataType,m),Y=[Q];f&&Y.push(U("present_key",t.dataType,_,x));let te=Ie(1,x),K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${H.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${H.type.storage}, ${$*$}>;
  ${V.registerUniforms(K).declareVariables(...j,...Y)}
  ${V.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${wo(ee,ie,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${A&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${te}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${A&&f?`
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
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${Q.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${o!==void 0};${n!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:D,dispatchGroup:S,programUniforms:T}),getShaderSource:B}},af=(e,t,r,n,o,a,s=void 0,u=void 0)=>{let d=a+o.kvSequenceLength,c=o.nReps?o.nReps:1,m=o.vHiddenSize*c,f=e>1&&n,g=o.kvNumHeads?o.kvNumHeads:o.numHeads,_=f?[o.batchSize,g,d,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,m],w=12,x={x:Math.ceil(o.vHeadSize/w),y:Math.ceil(o.sequenceLength/w),z:o.batchSize*o.numHeads},v=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:m},{type:12,data:a},{type:12,data:o.kvSequenceLength},{type:12,data:c}],$=f&&n&&E.size(n.dims)>0,S=["type","type"];$&&S.push("type"),s&&S.push("type"),u&&S.push("type");let T=[{dims:y,dataType:t.dataType,gpuDataType:0}];f&&T.push({dims:_,dataType:t.dataType,gpuDataType:0});let A=I=>{let D=O("probs",t.dataType,t.dims),B=O("v",r.dataType,r.dims),V=[D,B];$&&V.push(O("past_value",n.dataType,n.dims));let H=s?O("seq_lens",s.dataType,s.dims):void 0;s&&V.push(H);let F=u?O("total_sequence_length_input",u.dataType,u.dims):void 0;u&&V.push(F);let ee=[U("output",t.dataType,y)];f&&ee.push(U("present_value",t.dataType,_));let ie=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${D.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${D.type.value}, ${w*w}>;
  ${I.registerUniforms(ie).declareVariables(...V,...ee)}
  ${I.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${wo(H,F,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${D.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&f?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:T,dispatchGroup:x,programUniforms:v}),getShaderSource:A}},jt=(e,t,r,n,o,a,s,u,d,c,m=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),_=g>1?s:void 0,y=g>1?u:void 0,w=g>1?c.pastSequenceLength:0,x=w+c.kvSequenceLength,v=d&&E.size(d.dims)>0?d:void 0,$=[t,r];_&&E.size(_.dims)>0&&$.push(_),v&&$.push(v),m&&$.push(m),f&&$.push(f);let S=e.compute(of(g,t,r,_,v,c,w,m,f),{inputs:$,outputs:g>1?[-1,1]:[-1]})[0];e.compute(rf(S,c.batchSize,c.numHeads,w,c.sequenceLength,x,m,f),{inputs:m&&f?[S,m,f]:[S],outputs:[]});let T=[S,n];y&&E.size(y.dims)>0&&T.push(y),m&&T.push(m),f&&T.push(f),e.compute(af(g,S,n,y,c,w,m,f),{inputs:T,outputs:g>1?[0,2]:[0]})},sf=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:n},{type:12,data:o},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=f=>{let g=U("output_q",d[0].dataType,r),_=U("output_k",d[0].dataType,r),y=U("output_v",d[0].dataType,r),w=O("input",d[0].dataType,d[0].dims),x=O("weight",d[1].dataType,d[1].dims),v=O("bias",d[2].dataType,d[2].dims),$=w.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${$}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${$}, ${s*s}>;
  var<workgroup> tileWeightK: array<${$}, ${s*s}>;
  var<workgroup> tileWeightV: array<${$}, ${s*s}>;
  ${f.registerUniforms(S).declareVariables(w,x,v,g,_,y)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:c}),getShaderSource:m},{inputs:d,outputs:[-1,-1,-1]})},Ns=(e,t)=>{let r=nf(e.inputs,t),[n,o,a]=sf(e,r);return jt(e,n,o,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var uf,lf,df,Vs,Ls=L(()=>{"use strict";Le();ne();ae();Te();ue();uf=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,a)=>{let s=o.length;if(s!==n.length)throw new Error(`${a}: num dimensions != ${s}`);o.forEach((u,d)=>{if(u!==n[d])throw new Error(`${a}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},lf=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,a=e[0].dims,s=n?ye(a[a.length-1]):1,u=o==="NHWC"&&a.length>1?s:1,d=E.size(a)/s,c=n,m=c?a.length:a,f=O("x",e[0].dataType,e[0].dims,s),g=O("scale",e[1].dataType,e[1].dims,u),_=O("bias",e[2].dataType,e[2].dims,u),y=O("inputMean",e[3].dataType,e[3].dims,u),w=O("inputVar",e[4].dataType,e[4].dims,u),x=U("y",e[0].dataType,m,s),v=()=>{let S="";if(n)S=`let cOffset = ${a.length===1?"0u":o==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let T=1;T<g.rank;T++)S+=`cIndices[${T}] = outputIndices[${T}];`;S+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return S},$=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(f,g,_,y,w,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${s}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c?[{type:12,data:d},...W(a)]:[{type:12,data:d}]})}},df=e=>J(e),Vs=(e,t)=>{let{inputs:r,outputCount:n}=e,o=df({...t,outputCount:n});if(ve.webgpu.validateInputContent&&uf(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(lf(r,o))}});var cf,pf,Ws,Gs=L(()=>{"use strict";ae();ue();cf=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},pf=e=>{let t=e[0].dims,r=e[0].dims[2],n=E.size(t)/4,o=e[0].dataType,a=O("input",o,t,4),s=O("bias",o,[r],4),u=O("residual",o,t,4),d=U("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(a,s,u,d)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Ws=e=>{cf(e.inputs),e.compute(pf(e.inputs))}});var mf,be,Hs,Fs,qs,js,Ks,Zs,Qs,Ys,Xs,ff,Js,eu,tu,nu,un,ru,tr,ou,iu,au,su,uu,lu,du,cu,pu,mu,fu,hu,gu,yu,bu,_u,wu,vu,$u,vo,$o,xu,Su,Tu,hf,gf,Cu,nr=L(()=>{"use strict";ne();ae();Te();ue();mf=(e,t,r,n,o,a,s)=>{let u=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let c=O("inputData",r,[u],4),m=U("outputData",n,[u],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(c,m)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",d)}
  }`},be=(e,t,r,n,o,a=e.dataType,s,u)=>{let d=[{type:12,data:Math.ceil(E.size(e.dims)/4)}];return s&&d.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>mf(c,E.size(e.dims),e.dataType,a,r,n,u),getRunData:c=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(E.size(c[0].dims)/64/4)},programUniforms:d})}},Hs=e=>{e.compute(be(e.inputs[0],"Abs","abs"))},Fs=e=>{e.compute(be(e.inputs[0],"Acos","acos"))},qs=e=>{e.compute(be(e.inputs[0],"Acosh","acosh"))},js=e=>{e.compute(be(e.inputs[0],"Asin","asin"))},Ks=e=>{e.compute(be(e.inputs[0],"Asinh","asinh"))},Zs=e=>{e.compute(be(e.inputs[0],"Atan","atan"))},Qs=e=>{e.compute(be(e.inputs[0],"Atanh","atanh"))},Ys=e=>J(e),Xs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(be(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},ff=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return J({min:t,max:r})},Js=(e,t)=>{let r=t||ff(e.inputs),n=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},eu=e=>{e.compute(be(e.inputs[0],"Ceil","ceil"))},tu=e=>{e.compute(be(e.inputs[0],"Cos","cos"))},nu=e=>{e.compute(be(e.inputs[0],"Cosh","cosh"))},un=e=>J(e),ru=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},tr=(e="f32")=>`
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
}`,ou=e=>{let t=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,tr(t)))},iu=e=>{e.compute(be(e.inputs[0],"Exp","exp"))},au=e=>{e.compute(be(e.inputs[0],"Floor","floor"))},su=e=>{let t=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,tr(t)))},uu=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},lu=e=>{e.compute(be(e.inputs[0],"Not",t=>`!${t}`))},du=e=>{e.compute(be(e.inputs[0],"Neg",t=>`-${t}`))},cu=e=>{e.compute(be(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},pu=e=>{let t=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},mu=e=>{e.compute(be(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},fu=e=>J(e),hu=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},gu=e=>{let t=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},yu=e=>{e.compute(be(e.inputs[0],"Sin","sin"))},bu=e=>{e.compute(be(e.inputs[0],"Sinh","sinh"))},_u=e=>{e.compute(be(e.inputs[0],"Sqrt","sqrt"))},wu=e=>{e.compute(be(e.inputs[0],"Tan","tan"))},vu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,$u=e=>{e.compute(be(e.inputs[0],"Tanh",vu))},vo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${vu("v")};
}
`,$o=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,xu=e=>{let t=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"FastGelu",$o,vo(t),void 0,e.inputs[0].dataType))},Su=(e,t)=>{let r=Ie(e.inputs[0].dataType);return e.compute(be(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Tu=e=>{e.compute(be(e.inputs[0],"Log","log"))},hf=(e,t)=>`
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
`,gf=e=>`quick_gelu_impl(${e})`,Cu=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(be(e.inputs[0],"QuickGelu",gf,hf(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var yf,bf,Au,Eu=L(()=>{"use strict";ae();ue();nr();yf=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},bf=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=O("input",e[0].dataType,e[0].dims,4),n=O("bias",e[0].dataType,[e[0].dims[2]],4),o=U("output",e[0].dataType,t,4),a=E.size(t)/4,s=$e(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${tr(s)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Au=e=>{yf(e.inputs),e.compute(bf(e.inputs))}});var _f,wf,ut,ku,Pu,Ou,Du,Bu,zu,Mu,Ru,Uu,Nu,Vu=L(()=>{"use strict";ne();ae();ue();_f=(e,t,r,n,o,a,s,u,d,c,m,f)=>{let g,_;typeof u=="string"?g=_=($,S)=>`${u}((${$}),(${S}))`:typeof u=="function"?g=_=u:(g=u.scalar,_=u.vector);let y=U("outputData",m,n.length,4),w=O("aData",d,t.length,4),x=O("bData",c,r.length,4),v;if(o)if(a){let $=E.size(t)===1,S=E.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,A=r.length>0&&r[r.length-1]%4===0;$||S?v=y.setByOffset("global_idx",_($?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):v=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(s||T?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||A?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=y.setByOffset("global_idx",_(w.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(S,T,A="")=>{let I=`aData[indexA${T}][componentA${T}]`,D=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${y.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${w.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let offsetB${T} = ${x.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${S}[${T}] = ${A}(${g(I,D)});
          `};m===9?v=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(w,x,y)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},wf=(e,t,r,n,o,a,s=r.dataType)=>{let u=r.dims.map(Number),d=n.dims.map(Number),c=!E.areEqual(u,d),m=u,f=E.size(u),g=!1,_=!1,y=[c];if(c){let w=rt.calcShape(u,d,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");m=w.slice(),f=E.size(m);let x=E.size(u)===1,v=E.size(d)===1,$=u.length>0&&u[u.length-1]%4===0,S=d.length>0&&d[d.length-1]%4===0;y.push(x),y.push(v),y.push($),y.push(S);let T=1;for(let A=1;A<m.length;A++){let I=u[u.length-A],D=d[d.length-A];if(I===D)T*=I;else break}T%4===0?(_=!0,g=!0):(x||v||$||S)&&(g=!0)}else g=!0;return y.push(g),{name:e,shaderCache:{hint:t+y.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>_f(w,u,d,m,g,c,_,o,r.dataType,n.dataType,s,a),getRunData:()=>({outputs:[{dims:m,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(E.size(m)/4)},...W(u,d,m)]})}},ut=(e,t,r,n,o,a)=>{e.compute(wf(t,o??"",e.inputs[0],e.inputs[1],r,n,a))},ku=e=>{ut(e,"Add",(t,r)=>`${t}+${r}`)},Pu=e=>{ut(e,"Div",(t,r)=>`${t}/${r}`)},Ou=e=>{ut(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Du=e=>{ut(e,"Mul",(t,r)=>`${t}*${r}`)},Bu=e=>{let t=O("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ut(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},zu=e=>{ut(e,"Sub",(t,r)=>`${t}-${r}`)},Mu=e=>{ut(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Ru=e=>{ut(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Uu=e=>{ut(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Nu=e=>{ut(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var $f,xf,Sf,Tf,Lu,Wu,Gu=L(()=>{"use strict";ne();ae();Te();ue();$f=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,a=n.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((d,c)=>{if(c!==t&&d!==n.dims[c])throw new Error("non concat dimensions must match")})}})},xf=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Sf=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let a=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(a):o===0?n.push(`if (inputIndex == ${o}u) { ${a} }`):o===r-1?n.push(`else { ${a} }`):n.push(`else if (inputIndex == ${o}) { ${a} }`)}return n.join(`
`)},Tf=(e,t,r,n)=>{let o=E.size(r),a=new Array(e.length),s=new Array(e.length),u=0,d=[],c=[],m=[{type:12,data:o}];for(let w=0;w<e.length;++w)u+=e[w].dims[t],a[w]=u,c.push(e[w].dims.length),s[w]=O(`input${w}`,n,c[w]),d.push("rank"),m.push({type:12,data:a[w]});for(let w=0;w<e.length;++w)m.push(...W(e[w].dims));m.push(...W(r));let f=U("output",n,r.length),g=f.indicesGet("indices",t),_=Array.from(Array(a.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),y=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)w.registerUniform(`sizeInConcatAxis${x}`,"u32");return w.declareVariables(...s,f)})()}

  ${xf(a.length,_)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${_});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Sf(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:y}},Lu=(e,t)=>{let r=e.inputs,n=r[0].dims,o=E.normalizeAxis(t.axis,n.length);$f(r,o);let a=n.slice();a[o]=r.reduce((u,d)=>u+(d.dims.length>o?d.dims[o]:0),0);let s=r.filter(u=>E.size(u.dims)>0);e.compute(Tf(s,o,a,r[0].dataType),{inputs:s})},Wu=e=>J({axis:e.axis})});var Ze,Qe,Ye,rr,Ct=L(()=>{"use strict";ne();ae();Ze=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Qe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ye=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},rr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Za,Qa];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Oe,Hu,or=L(()=>{"use strict";Oe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Hu=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Fu,qu=L(()=>{"use strict";Fu=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var ln,ir,ar=L(()=>{"use strict";ne();ae();ue();Ct();ln=(e,t,r,n,o)=>{let a=n-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${q(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,q(o,u+a,n))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},ir=(e,t,r,n,o=!1,a)=>{let s=e[0].dims,u=e[1].dims,d=s[s.length-2],c=u[u.length-1],m=s[s.length-1],f=ye(c),g=ye(m),_=ye(d),y=E.size(r)/f/_,w=e.length>2,x=n?n.slice(0,-2):r.slice(0,-2),$=[E.size(x),d,c],S=[{type:12,data:y},{type:12,data:d},{type:12,data:c},{type:12,data:m}];Qe(t,S),S.push(...W(x,s,u)),w&&S.push(...W(e[2].dims)),S.push(...W($));let T=A=>{let I=Yn("batch_dims",e[0].dataType,x.length),D=O("a",e[0].dataType,s.length,g),B=O("b",e[1].dataType,u.length,f),V=U("output",e[0].dataType,$.length,f),H=$e(V.type.tensor),F=Ze(t,V.type.value,H),j=[D,B],ee="";if(w){let Y=o?f:1;j.push(O("bias",e[2].dataType,e[2].dims.length,Y)),ee=`${o?`value += bias[col / ${Y}];`:`value += ${V.type.value}(bias[row + i]);`}`}let ie=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ye(t,ie);let Q=()=>{let Y=`var a_data: ${D.type.value};`;for(let te=0;te<g;te++)Y+=`
              let b_data${te} = b[(b_offset + (k + ${te}) * uniforms.N + col) / ${f}];`;for(let te=0;te<_;te++){Y+=`a_data = a[(a_offset + (row + ${te}) * uniforms.K + k) / ${g}];`;for(let K=0;K<g;K++)Y+=`
            values[${te}] = fma(${B.type.value}(a_data${g===1?"":`[${K}]`}), b_data${K}, values[${te}]);
`}return Y};return`
  ${A.registerUniforms(ie).registerInternalVariables(I).declareVariables(...j,V)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${D.type.indices};
    ${ln("a_indices",D,D.rank-2,I.rank,"batch_indices")}
    ${D.indicesSet("a_indices",D.rank-2,0)}
    ${D.indicesSet("a_indices",D.rank-1,0)}
    let a_offset = ${D.indicesToOffset("a_indices")};

    var b_indices: ${B.type.indices};
    ${ln("b_indices",B,B.rank-2,I.rank,"batch_indices")}
    ${B.indicesSet("b_indices",B.rank-2,0)}
    ${B.indicesSet("b_indices",B.rank-1,0)}
    let b_offset = ${B.indicesToOffset("b_indices")};
    var values: array<${V.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${Q()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${ee}
      ${F}
      let cur_indices = ${V.type.indices}(batch, row + i, col);
      let offset = ${V.indicesToOffset("cur_indices")};
      ${V.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${_};${o}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:S}),getShaderSource:T}}});var Cf,If,xo,ju,Af,So,Ef,dn,sr=L(()=>{"use strict";ne();ae();ue();Ct();ar();or();Cf=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,If=(e,t)=>e?`
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
        }`,xo=(e,t,r="f32",n,o=!1,a=32,s=!1,u=32)=>{let d=t[1]*e[1],c=t[0]*e[0],m=o?d:a,f=o?a:d,g=m/t[0],_=a/t[1];if(!((o&&g===4&&e[1]===4||!o&&(g===3||g===4))&&m%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${m/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
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
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Cf(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${If(o,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},ju=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Af=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",So=(e,t,r="f32",n,o=!1,a=32,s=!1,u=32,d=!1)=>{let c=e[1]*t[1],m=e[0]*t[0],f=o?c:a,g=o?a:c;if(!(g%t[1]===0&&f%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let _=g/t[1],y=f/t[0],w=a/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${ju(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
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
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${ju(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Af(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${m}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Ef=(e,t,r,n,o=!1)=>{let[a,s,u,d]=n,c=$e(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Oe(e,c)} {
      var value = ${Oe(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${ln("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Oe(e,c)} {
      var value = ${Oe(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${ln("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Oe(e,c)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Oe(e,c)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},dn=(e,t,r,n,o=!1,a)=>{let s=e[0].dims,u=e[1].dims,d=s.slice(0,-2),c=u.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),f=E.size(m),g=s[s.length-2],_=s[s.length-1],y=u[u.length-1],w=_%4===0&&y%4===0,x=g<=8?[4,1,1]:[4,4,1],v=[8,8,1],$=[Math.ceil(y/v[0]/x[0]),Math.ceil(g/v[1]/x[1]),Math.ceil(f/v[2]/x[2])],S=w?4:1,T=[...d,g,_/S],A=T.length,I=[...c,_,y/S],D=I.length,B=[f,g,y/S],V=[{type:6,data:g},{type:6,data:y},{type:6,data:_}];Qe(t,V),V.push(...W(m,T,I));let H=["rank","rank"],F=e.length>2;F&&(V.push(...W(e[2].dims)),H.push("rank")),V.push(...W(B));let j=ee=>{let ie=m.length,Q=Yn("batchDims",e[0].dataType,ie,1),Y=$e(e[0].dataType),te=O("a",e[0].dataType,A,S),K=O("b",e[1].dataType,D,S),oe=U("result",e[0].dataType,B.length,S),ce=[te,K];if(F){let k=o?S:1;ce.push(O("bias",e[2].dataType,e[2].dims.length,k))}let le=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ye(t,le);let xe=$e(oe.type.tensor),fe=Ze(t,oe.type.value,xe),R=Ef(S,F,fe,[Q,te,K,oe],o);return`
  ${ee.registerUniforms(le).registerInternalVariables(Q).declareVariables(...ce,oe)}
  ${R}
  ${w?xo(x,v,Y,Q):So(x,v,Y,Q)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${w};${o}`,inputDependencies:H},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:V}),getShaderSource:j}}});var kf,Ku,Zu=L(()=>{"use strict";ne();nt();ue();Ct();or();qu();sr();kf=(e,t,r,n,o=!1,a,s=4,u=4,d=4,c="f32")=>{let m=H=>{switch(H){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},f=H=>{switch(H){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${H} is not supported.`)}},g=e?`
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
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",v=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Oe(s,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${w}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(s)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Oe(s,c)}(0.0);`:n&&r?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Oe(s,c)}(0.0);`,T=e?n&&r?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${Oe(u,c)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${Oe(u,c)}(0.0);`,A=Oe(d,c),I=e?Oe(s,c):Oe(u,c),D=e?Oe(u,c):Oe(s,c),B=Ze(a,A,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?S:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${D} {
      ${e?T:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${A}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Hu(o)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ku=(e,t,r,n,o,a,s,u,d)=>{let c=t.format==="NHWC",m=c?e[0].dims[3]:e[0].dims[1],f=r[0],g=c?r[2]:r[3],_=c?r[1]:r[2],y=c?r[3]:r[1],w=c&&(m%4===0||m%3===0)&&y%4===0,x=c?y:g*_,v=c?g*_:y,$=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(x/$[0]/S[0]),Math.ceil(v/$[1]/S[1]),Math.ceil(f/$[2]/S[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let A=w?c&&m%4!==0?3:4:1,I=$[1]*S[1],D=$[0]*S[0],B=Math.max($[0]*A,$[1]),V=n%I===0,H=o%D===0,F=a%B===0,j=w?[A,4,4]:[1,1,1],ee=[{type:6,data:n},{type:6,data:o},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Qe(t,ee),ee.push(...W(e[0].dims,e[1].dims));let ie=["rank","rank"];s&&(ee.push(...W(e[2].dims)),ie.push("rank")),ee.push(...W(r));let Q=Y=>{let te=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ye(t,te);let K=w?4:1,oe=$e(e[0].dataType),ce=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${oe}>`:oe}) {
        result[flatIndex] = ${w?`vec4<${oe}>`:oe}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${oe}>`:oe}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,le=O("x",e[0].dataType,e[0].dims.length,A===3?1:A),xe=O("w",e[1].dataType,e[1].dims.length,K),fe=[le,xe],R=U("result",e[0].dataType,r.length,K);if(s){let k=O("bias",e[2].dataType,e[2].dims.length,K);fe.push(k),ce+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${oe}>`:oe} {
          return bias[coords.${c?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Fu("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Y.registerUniforms(te).declareVariables(...fe,R)}
        ${ce}
        ${kf(c,V,H,F,s,t,j[0],j[1],j[2],oe)}
        ${w?xo(S,$,oe,void 0,!c,B):So(S,$,oe,void 0,!c,B,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${A};${w};${V};${H};${F};${I};${D};${B}`,inputDependencies:ie},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:ee}),getShaderSource:Q}}});var Pf,Qu,ur,Of,Yu,Df,Xu,Ju,el=L(()=>{"use strict";ne();nt();ae();ue();Ct();or();Pf=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Qu=e=>typeof e=="number"?[e,e,e]:e,ur=(e,t)=>t<=1?e:e+(e-1)*(t-1),Of=(e,t,r,n=1)=>{let o=ur(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Yu=(e,t,r,n,o)=>{o==null&&(o=Of(e,t[0],n[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*o)/n[s]+1));return a},Df=(e,t,r,n,o,a,s,u,d,c)=>{let m,f,g,_;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Yu([t,r,n,1],[u,d,c],1,[o,a,s],e);f=y[0],g=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((w,x,v)=>w===v[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Yu([t,r,n,1],[u,d,c],1,[o,a,s],e[0]);f=y[0],g=y[1],_=y[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/o),g=Math.ceil(r/a),_=Math.ceil(n/s);let y=(f-1)*o+u-t,w=(g-1)*a+d-r,x=(_-1)*s+c-n,v=Math.floor(y/2),$=y-v,S=Math.floor(w/2),T=w-S,A=Math.floor(x/2),I=x-A;m={top:S,bottom:T,left:A,right:I,front:v,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:f,outHeight:g,outWidth:_}},Xu=(e,t,r,n,o,a=!1,s="channelsLast")=>{let u,d,c,m,f;if(s==="channelsLast")[u,d,c,m,f]=e;else if(s==="channelsFirst")[u,f,d,c,m]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,_,y,w]=t,[x,v,$]=Qu(r),[S,T,A]=Qu(n),I=ur(_,S),D=ur(y,T),B=ur(w,A),{padInfo:V,outDepth:H,outHeight:F,outWidth:j}=Df(o,d,c,m,x,v,$,I,D,B),ee=a?g*f:g,ie=[0,0,0,0,0];return s==="channelsFirst"?ie=[u,ee,H,F,j]:s==="channelsLast"&&(ie=[u,H,F,j,ee]),{batchSize:u,dataFormat:s,inDepth:d,inHeight:c,inWidth:m,inChannels:f,outDepth:H,outHeight:F,outWidth:j,outChannels:ee,padInfo:V,strideDepth:x,strideHeight:v,strideWidth:$,filterDepth:_,filterHeight:y,filterWidth:w,effectiveFilterDepth:I,effectiveFilterHeight:D,effectiveFilterWidth:B,dilationDepth:S,dilationHeight:T,dilationWidth:A,inShape:e,outShape:ie,filterShape:t}},Ju=(e,t,r,n,o,a)=>{let s=a==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],d=!1,c=[64,1,1],m={x:r.map(($,S)=>S)},f=[Math.ceil(Pf(m.x.map($=>r[$]))/c[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let g=d?s&&u%4!==0?3:4:1,_=E.size(r),y=[{type:12,data:_},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Qe(t,y),y.push(...W(e[0].dims,e[1].dims));let w=["rank","rank"],x=e.length===3;x&&(y.push(...W(e[2].dims)),w.push("rank")),y.push(...W(r));let v=$=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ye(t,S);let T=d?4:1,A=$e(e[0].dataType),I=O("x",e[0].dataType,e[0].dims.length,g===3?1:g),D=O("W",e[1].dataType,e[1].dims.length,T),B=[I,D],V=U("result",e[0].dataType,r.length,T),H="";if(x){let ee=O("bias",e[2].dataType,e[2].dims.length,T);B.push(ee),H+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${A}>`:A} {
          return bias[${s?q("coords",4,5):q("coords",1,5)}${d?"/ 4":""}];
        }`}let F=Oe(g,A),j=Ze(t,F,A);return`
            ${H}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${D.getByIndices("aIndices")};
            }
          ${$.registerUniforms(S).declareVariables(...B,V)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${V.offsetToIndices("global_idx")};
              let batch = ${q("coords",0,I.rank)};
              let d2 = ${s?q("coords",I.rank-1,I.rank):q("coords",1,I.rank)};
              let xFRCCorner = vec3<u32>(${s?q("coords",1,I.rank):q("coords",2,I.rank)},
              ${s?q("coords",2,I.rank):q("coords",3,I.rank)},
              ${s?q("coords",3,I.rank):q("coords",4,I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?q("uniforms.x_shape",1,I.rank):q("uniforms.x_shape",2,I.rank)};
              let xShapeZ = ${s?q("uniforms.x_shape",2,I.rank):q("uniforms.x_shape",3,I.rank)};
              let xShapeW = ${s?q("uniforms.x_shape",3,I.rank):q("uniforms.x_shape",4,I.rank)};
              let xShapeU = ${s?q("uniforms.x_shape",4,I.rank):q("uniforms.x_shape",1,I.rank)};
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
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${j}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${g};${x}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:y}),getShaderSource:v}}});var tl,nl,rl=L(()=>{"use strict";ne();ae();ue();Ct();tl=(e,t,r,n)=>{let o=e.length>2,a=o?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,d=t.format==="NHWC",c=d?r[3]:r[1],m=c/t.group,f=d&&m>=4?ye(c):1,g=E.size(r)/f,_=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];Qe(t,_),_.push(...W(s,[u[0],u[1],u[2],u[3]/f]));let y=o?["rank","rank","rank"]:["rank","rank"];_.push(...W([r[0],r[1],r[2],r[3]/f]));let w=x=>{let v=U("output",e[0].dataType,r.length,f),$=$e(v.type.tensor),S=Ze(t,v.type.value,$),T=O("x",e[0].dataType,s.length),A=O("w",e[1].dataType,u.length,f),I=[T,A];o&&I.push(O("b",e[2].dataType,e[2].dims,f));let D=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ye(t,D);let B=d?`
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
            let xVal = ${T.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${A.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(D).declareVariables(...I,v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${B}
    ${a}
    ${S}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:w}},nl=(e,t,r,n)=>{let o=e.length>2,a=ye(r[3]),s=ye(r[2]),u=E.size(r)/a/s,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],m=[r[0],r[1],r[2],r[3]/a],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Qe(t,f),f.push(...W(d,c,m));let g=(s-1)*t.strides[1]+c[1],_=y=>{let w=U("output",e[0].dataType,m.length,a),x=$e(w.type.tensor),v=Ze(t,w.type.value,x),$=O("x",e[0].dataType,d.length,a),S=O("w",e[1].dataType,c.length,a),T=[$,S];o&&T.push(O("b",e[2].dataType,e[2].dims,a));let A=o?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ye(t,I),`
  ${y.registerUniforms(I).declareVariables(...T,w)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${g}>;
    var values: array<${w.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${A}
      ${v}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${g};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:_}}});var Bf,To,zf,Co,Io,ol,Mf,Rf,Ao,il=L(()=>{"use strict";ae();Zu();el();sr();rl();Ct();ar();mt();Bf=(e,t,r,n,o,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),d=u.length,c=t[0],f=t.slice(2).map((y,w)=>y+(y-1)*(r[w]-1)),_=u.map((y,w)=>y+n[w]+n[w+d]).map((y,w)=>Math.floor((y-f[w]+o[w])/o[w]));return _.splice(0,0,s),_.splice(a?3:1,0,c),_},To=[2,3,1,0],zf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Co=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let n=e.pads.slice();Mt.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},Io=e=>{let t=rr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,d=e.strides,c=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:a,kernelShape:s,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},ol=(e,t,r,n)=>{let o=r.format==="NHWC",a=Bf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let I=[t[0]];if(o){let B=e.kernelCustomData.wT??e.compute(Be(t[1],To),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=B),I.push(B)}else I.push(t[1]);t.length===3&&I.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(nl(I,r,a,n),{inputs:I}):e.compute(tl(I,r,a,n),{inputs:I});return}let s=t.length===3,u=t[0].dims[o?1:2],d=t[0].dims[o?2:3],c=t[0].dims[o?3:1],m=t[1].dims[2],f=t[1].dims[3],g=a[o?1:2],_=a[o?2:3],y=a[o?3:1],w=o&&m===u&&f===d&&r.pads[0]===0&&r.pads[1]===0;if(w||m===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let I=a[0],D,B,V,H=[];if(o){let ee=e.kernelCustomData.wT??e.compute(Be(t[1],To),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ee),w){let ie=u*d*c;D=t[0].reshape([1,I,ie]),B=ee.reshape([1,ie,y]),V=[1,I,y]}else D=t[0].reshape([I,u*d,c]),B=ee.reshape([1,c,y]),V=[I,g*_,y];H.push(D),H.push(B)}else D=t[0].reshape([I,c,u*d]),B=t[1].reshape([1,y,c]),V=[I,y,g*_],H.push(B),H.push(D);s&&H.push(t[2]);let F=V[2],j=H[0].dims[H[0].dims.length-1];F<8&&j<8?e.compute(ir(H,r,a,V,o,n),{inputs:H}):e.compute(dn(H,r,a,V,o,n),{inputs:H});return}let x=!0,v=e.kernelCustomData.wT??e.compute(Be(t[1],To),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let $=[t[0],v];s&&$.push(t[2]);let S=o?g*_:y,T=o?y:g*_,A=m*f*c;e.compute(Ku($,r,a,S,T,A,s,x,n),{inputs:$})},Mf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=Co({...t,pads:o,strides:a,dilations:s,kernelShape:u},n);ol(e,n,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Rf=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Co(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=Xu(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,n);e.compute(Ju(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],n))},Ao=(e,t)=>{if(zf(e.inputs,t),e.inputs[0].dims.length===3)Mf(e,t);else if(e.inputs[0].dims.length===5)Rf(e,e.inputs,t);else{let r=Co(t,e.inputs);ol(e,e.inputs,r)}}});var al,sl=L(()=>{"use strict";ne();nt();ae();ue();al=(e,t,r)=>{let n=e.length>2,o=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,d=u[2]/s,c=u[3],m=a?ye(d):1,f=a&&c===1&&d>=4,g=f?Math.floor(d/4)*4:Math.floor(d/m)*m,_=d-g,y=a?ye(c):1,w=a?c===1?m:y:1,x=E.size(o)/y,v=[Math.ceil(x/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let $=["rank","rank"],S=[t.strides[0],t.strides[1]],T=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],A=[t.dilations[0],t.dilations[1]],I=[T[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),T[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],D=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],B=[{type:12,data:x},{type:12,data:S},{type:12,data:T},{type:12,data:A},{type:12,data:I},{type:6,data:D},{type:12,data:g},{type:12,data:d},{type:12,data:c},...W(e[0].dims,e[1].dims)];n&&(B.push(...W(e[2].dims)),$.push("rank")),B.push(...W(o));let V=H=>{let F=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:D.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],j=$e(e[0].dataType),ee=a?1:2,ie=a?2:3,Q=a?3:1,Y=O("W",e[1].dataType,e[1].dims.length,w),te=O("Dy",e[0].dataType,e[0].dims.length,m),K=[te,Y];n&&K.push(O("bias",e[2].dataType,[o[Q]].length,y));let oe=U("result",e[0].dataType,o.length,y),ce=()=>{let fe="";if(f)m===4?fe+=`
        let xValue = ${te.getByOffset("x_offset")};
        let wValue = ${Y.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:m===2?fe+=`
          dotProd = dotProd + dot(vec4<${j}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}), vec4<${j}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:m===1&&(fe+=`
          dotProd = dotProd + dot(vec4<${j}>(${te.getByOffset("x_offset")}, ${te.getByOffset("x_offset + 1u")}, ${te.getByOffset("x_offset + 2u")}, ${te.getByOffset("x_offset + 3u")}), vec4<${j}>(${Y.getByOffset("w_offset")}, ${Y.getByOffset("w_offset + 1u")}, ${Y.getByOffset("w_offset + 2u")}, ${Y.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(fe+=`
                  let xValue = ${a?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${m}`):te.get("batch","inputChannel","idyR","idyC")};
        `,m===1)fe+=`
          let w_offset = ${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Y.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let R=0;R<m;R++)fe+=`
            let wValue${R} = ${Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${R}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${R}] * wValue${R};`;return fe},le=()=>{if(_===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let fe="";if(m===1){fe+="dotProd = dotProd";for(let R=0;R<_;R++)fe+=`
            + ${te.getByOffset(`x_offset + ${R}`)} * ${Y.getByOffset(`w_offset + ${R}`)}`;fe+=";"}else if(m===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);fe+=`
          let xValue = ${te.getByOffset("x_offset")};
          let wValue = ${Y.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return fe},xe=`
            let outputIndices = ${oe.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${oe.indicesGet("outputIndices",0)};
            let d1 = ${oe.indicesGet("outputIndices",Q)};
            let r = ${oe.indicesGet("outputIndices",ee)};
            let c = ${oe.indicesGet("outputIndices",ie)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${oe.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${j}(dyRCorner) + ${j}(wR)) / ${j}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${j}(uniforms.Dy_shape[${ee}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${j}(dyCCorner) + ${j}(wC)) / ${j}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${j}(uniforms.Dy_shape[${ie}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${m};
                var w_offset = ${Y.indicesToOffset(`${Y.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:m}) {
                  ${ce()}
                  inputChannel = inputChannel + ${f?4:m};
                }
                ${le()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${y}]`:""};
            ${oe.setByOffset("global_idx","value")};
          `;return`
    ${H.registerUniforms(F).declareVariables(...K,oe)}
      ${H.mainStart()}
      ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${xe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${m}${w}${y}${f}${_}`,inputDependencies:$},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:B}),getShaderSource:V}}});var Uf,Nf,Vf,ul,ll,Lf,dl,Wf,cl,pl=L(()=>{"use strict";sl();Ct();mt();Uf=(e,t,r,n,o,a)=>(e-1)*t+r+(n-1)*o+1-a,Nf=(e,t,r,n,o)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=a,r[o]=e-a):t==="SAME_LOWER"&&(r[n]=e-a,r[o]=a)},Vf=(e,t,r,n,o,a,s,u,d,c)=>{let m=e.length-2,f=c.length===0;d.length<m&&d.push(...Array(m-d.length).fill(0));let g=e[0],_=t[u?3:1]*o;for(let y=0,w=e.length-m-(u?1:0);y<m;++y,++w){let x=e[w],v=f?x*s[y]:c[y],$=Uf(x,s[y],a[y],t[w],r[y],v);Nf($,n,a,y,y+m),f&&c.push(s[y]*(x-1)+d[y]+(t[w]-1)*r[y]+1-a[y]-a[y+m])}c.splice(0,0,g),c.splice(u?3:1,0,_)},ul=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}let c=e.strides.slice();if(c.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;c=new Array(f).fill(1)}Vf(u,r,d,e.autoPad,e.group,o,c,n,s,a);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:s,outputShape:a,dilations:d,strides:c}),m},ll=e=>{let t=rr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,a=e.group??1,s=e.kernelShape,u=e.pads,d=e.strides,c=e.wIsConst(),m=e.outputPadding,f=e.outputShape;return{autoPad:n,format:r,dilations:o,group:a,kernelShape:s,outputPadding:m,outputShape:f,pads:u,strides:d,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Lf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((m,f)=>m+f,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((m,f)=>m+f,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((m,f)=>m+f,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((m,f)=>m+f,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},dl=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(Be(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let a=[t[0],o];t.length===3&&a.push(t[2]),e.compute(al(a,r,n),{inputs:a})},Wf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),o=[1].concat(o);let d=t.outputPadding;d=[0].concat(d);let c=ul({...t,pads:u,strides:s,dilations:a,kernelShape:o,outputPadding:d},n);dl(e,n,c,m=>r?[m[0],m[2],m[3]]:[m[0],m[1],m[3]])},cl=(e,t)=>{if(Lf(e.inputs,t),e.inputs[0].dims.length===3)Wf(e,t);else{let r=ul(t,e.inputs);dl(e,e.inputs,r)}}});var Gf,ml,fl,hl=L(()=>{"use strict";ne();ae();Te();ue();Gf=(e,t,r,n)=>{let o=E.size(t),a=t.length,s=O("input",e,a),u=U("output",e,a),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=E.normalizeAxis(d,a),m=f=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=q("uniforms.input_shape","uniforms.axis",a),y=n.reverse?g+(n.exclusive?" + 1":""):"0",w=n.reverse?_:g+(n.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...W(t,t)]}),getShaderSource:m}},ml=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(Gf(n,r,o,t),{inputs:[0]})},fl=e=>{let t=e.exclusive===1,r=e.reverse===1;return J({exclusive:t,reverse:r})}});var Hf,Ff,qf,gl,yl,bl=L(()=>{"use strict";ne();ae();Te();ue();Hf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Ff=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)o.push(r.indicesSet("a",e[a],`i[${a}]`));return o.push("return a;}"),o.join(`
`)},qf=(e,t)=>{let r,n,o,a,s,u,d=t.format==="NHWC",c=t.blocksize,m=t.mode==="DCR";d?([r,n,o,a]=e.dims,s=m?[r,n,o,c,c,a/c**2]:[r,n,o,a/c**2,c,c],u=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=m?[r,c,c,a/c**2,n,o]:[r,a/c**2,c,c,n,o],u=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),g=f.dims.length,_=e.dataType,y=O("a",_,g),w=U("output",_,g),x=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(y,w)}

  ${Ff(u,g,y,w)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let $=d?[r,n*c,o*c,a/c**2]:[r,a/c**2,n*c,o*c],S=E.size($),T=f.dims,A=E.sortBasedOnPerm(T,u);return{outputs:[{dims:$,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...W(T,A)]}},getShaderSource:x}},gl=(e,t)=>{Hf(e.inputs),e.compute(qf(e.inputs[0],t))},yl=e=>J({blocksize:e.blocksize,mode:e.mode,format:e.format})});var It,lr,Eo,wl,Nt,jf,Kf,Zf,vl,$l,xl,Qf,Yf,_l,Xf,Sl,Tl,Cl=L(()=>{"use strict";ne();ae();Te();ue();It=256,lr=512,Eo=2*Math.PI,wl=e=>{let t=[],r=e;for(let n of[4,2,3,5])for(;r%n===0;)t.push(n),r/=n;return r===1?t:void 0},Nt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},jf=(e,t,r,n,o)=>{let a=r/e,s=lr-n,u=c=>`smem[${s}u + base + ${c*t}u]`,d=`  for (var t = local_idx; t < ${a}u; t += ${It}u) {
`;d+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,d+=`    var leg: array<vec2<f32>, 5>;
`;for(let c=0;c<e;c++){let m=`${n}u + t + ${c*a}u`;if(c===0)d+=`    leg[0] = smem[${m}];
`;else{let f=o*Eo*c/(e*t);d+=`    { let a = ${Nt(f)} * angleUnit; leg[${c}] = cmul(smem[${m}], vec2<f32>(cos(a), sin(a))); }
`}}if(d+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)d+=`    ${u(0)} = leg[0] + leg[1];
    ${u(1)} = leg[0] - leg[1];
`;else if(e===4){let c=o<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";d+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,d+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,d+=`    let oddRot = ${c};
`,d+=`    ${u(0)} = evenSum + oddSum;
    ${u(1)} = evenDiff + oddRot;
`,d+=`    ${u(2)} = evenSum - oddSum;
    ${u(3)} = evenDiff - oddRot;
`}else for(let c=0;c<e;c++){let m=["leg[0]"];for(let f=1;f<e;f++){let g=o*Eo*(f*c)/e,_=Nt(Math.cos(g)),y=Nt(Math.sin(g));m.push(`vec2<f32>(leg[${f}].x*${_} - leg[${f}].y*${y}, leg[${f}].x*${y} + leg[${f}].y*${_})`)}d+=`    ${u(c)} = ${m.join(" + ")};
`}return`${d}  }
  workgroupBarrier();
`},Kf=(e,t,r)=>{let n="",o=1,a=0;for(let s of e)n+=jf(s,o,t,a,r),o*=s,a=lr-a;return{code:n,resultOffset:a}},Zf=(e,t,r,n,o)=>{let a=e.dims,s=a.length,u=a[s-1],d=a[t],c=r&&n?(d-1)*2:d;o!==void 0&&(c=o);let m=r&&n?1:2,f=n&&!r?Math.floor(c/2)+1:c,g=a.slice();g[t]=f,g[s-1]=m;let _=1;for(let w=t+1;w<s-1;w++)_*=a[w];let y=E.size(a)/u/d;return{dataType:e.dataType,outputDims:g,length:c,signalLength:d,inner:_,batch:y,inputComponents:u,outputComponents:m,outputLength:f,inverse:r,onesided:n}},vl=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),$l=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],xl=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),Qf=e=>{let{dataType:t,length:r,inputComponents:n,outputComponents:o,inverse:a,onesided:s}=e,u=Ie(t),d=a?1:-1,c=a?1/r:1,m=wl(r),f=g=>{let _=O("x",t,[1]),y=U("y",t,[1]),w=A=>{let I=`inBase + (${A}) * uniforms.inner * ${n}u`,D=`f32(${_.getByOffset(I)})`,B=n===2?`f32(${_.getByOffset(`${I} + 1u`)})`:"0.0";return`vec2<f32>(${D}, ${B})`},x;if(a&&s){let A=Math.floor(r/2)+1,I=r%2===0?`select(provided, provided - 1u, provided == ${A}u)`:"provided";x=`
    let provided = min(uniforms.signalLength, ${A}u);
    for (var i = local_idx; i < ${r}u; i += ${It}u) {
      if (i < provided) { smem[i] = ${w("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${I}; k += ${It}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else x=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${It}u) {
      if (i < loadCount) { smem[i] = ${w("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:v,resultOffset:$}=Kf(m,r,d),S=c===1?`smem[${$}u + i]`:`smem[${$}u + i] * ${Nt(c)}`,T=o===2?y.setByOffset("off + 1u",`${u}(v.y)`):"";return`
  ${xl(g,_,y)}
  var<workgroup> smem: array<vec2<f32>, ${2*lr}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${g.mainStart(It)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${n}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${o}u;
    ${x}
${v}    for (var i = local_idx; i < uniforms.outputLength; i += ${It}u) {
      let v = ${S};
      let off = outBase + i * uniforms.inner * ${o}u;
      ${y.setByOffset("off",`${u}(v.x)`)}
      ${T}
    }
  }`};return{name:"DFT",shaderCache:{hint:vl(e,"fft"),inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:$l(e),dispatchGroup:{x:e.batch}})}},Yf=e=>{let{dataType:t,length:r,inputComponents:n,outputComponents:o,inverse:a,onesided:s}=e,u=Ie(t),d=a?1:-1,c=a?1/r:1,m=f=>{let g=O("x",t,[1]),_=U("y",t,[1]),y=S=>{let T=`inBase + (${S}) * uniforms.inner * ${n}u`,A=`f32(${g.getByOffset(T)})`,I=n===2?`f32(${g.getByOffset(`${T} + 1u`)})`:"0.0";return`vec2<f32>(${A}, ${I})`},w=a&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${y("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${y("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${y("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,x=`
      let angle = ${Nt(d*Eo)} * f32(knMod) / ${Nt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,v=o===2?_.setByOffset("off + 1u",`${u}(v.y)`):"",$=c===1?"acc":`acc * ${Nt(c)}`;return`
  ${xl(f,g,_)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${w}
  ${f.mainStart(It)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${n}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${o}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${It}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${x}
      }
      let v = ${$};
      let off = outBase + k * uniforms.inner * ${o}u;
      ${_.setByOffset("off",`${u}(v.x)`)}
      ${v}
    }
  }`};return{name:"DFT",shaderCache:{hint:vl(e,"direct"),inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:$l(e),dispatchGroup:{x:e.batch}})}},_l=e=>{if(!e||e.dataType===0)return;if(E.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},Xf=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},Sl=(e,t)=>{Xf(e.inputs);let r=e.inputs[0],n=r.dims.length,o=t.inverse!==0,a=t.onesided!==0,s=_l(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let u=E.normalizeAxis(_l(e.inputs[2])??t.axis,n);if(u===n-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(o&&a&&r.dims[n-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let d=Zf(r,u,o,a,s);if(d.length<=0)throw new Error(`Invalid DFT length: ${d.length}`);let m=d.length<=lr&&wl(d.length)!==void 0?Qf(d):Yf(d);e.compute(m,{inputs:[0]})},Tl=e=>J({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})});var ko,dr,Il,Jf,eh,Po,Oo,Al,th,El,kl,Pl=L(()=>{"use strict";ne();ae();Te();ue();ko="[a-zA-Z]|\\.\\.\\.",dr="("+ko+")+",Il="^"+dr+"$",Jf="("+dr+",)*"+dr,eh="^"+Jf+"$",Po=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},Oo=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(eh)))throw new Error("Invalid LHS term");if(n.split(",").forEach((u,d)=>{let c=t[d].dims.slice();if(!u.match(RegExp(Il)))throw new Error("Invalid LHS term");let m=this.processTerm(u,!0,c,d);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([u,d])=>d.count===1||u==="...").map(([u])=>u).join("");else if(!o.match(RegExp(dr)))throw new Error("Invalid RHS");o.match(RegExp(ko,"g"))?.forEach(u=>{if(u==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(u);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let a=n.length,s=!1,u=[],d=0;if(!t.match(RegExp(Il))&&!r&&t!=="")throw new Error("Invalid LHS term");let c=t.match(RegExp(ko,"g")),m=new Po(o);return c?.forEach((f,g)=>{if(f==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let _=a-c.length+1;if(_<0)throw new Error("Ellipsis out of bounds");if(u=n.slice(d,d+_),this.hasEllipsis){if(this.ellipsisDims.length!==u.length||this.ellipsisDims.toString()!==u.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=u;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<u.length;y++){let w=String.fromCharCode(48+y);m.addSymbol(w,g+y),this.addSymbol(w,n[d++],o)}}else m.addSymbol(f,g+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,n[d++],o)}),m}},Al=e=>e+"_max",th=(e,t,r,n)=>{let a=e.map(m=>m.length).map((m,f)=>O(`input${f}`,t,m)),s=E.size(n),u=U("output",t,n.length),d=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),c=m=>{let f=[],g="var prod = 1.0;",_="var sum = 0.0;",y="sum += prod;",w=[],x=[],v=[],$=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((A,I)=>{if(r.rhs.symbolToIndices.has(I)){let D=r.rhs.symbolToIndices.get(I)?.[0];D!==void 0&&r.lhs.forEach((B,V)=>{if(A.inputIndices.includes(V)){let H=B.symbolToIndices.get(I);if(H===void 0)throw new Error("Invalid symbol error");H.forEach(F=>{f.push(`${a[V].indicesSet(`input${V}Indices`,F,u.indicesGet("outputIndices",D))}`)})}})}else r.lhs.forEach((D,B)=>{if(A.inputIndices.includes(B)){let V=D.symbolToIndices.get(I);if(V===void 0)throw new Error("Invalid symbol error");V.forEach(H=>{w.push(`${a[B].indicesSet(`input${B}Indices`,H,`${I}`)}`)}),$.push(`prod *= ${a[B].getByIndices(`input${B}Indices`)};`)}}),x.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Al(I)}; ${I}++) {`),v.push("}")});let T=S?[...f,`let sum = ${a.map((A,I)=>A.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...f,_,...x,...w,g,...$,y,...v];return`
            ${m.registerUniforms(d.map(A=>({name:`${Al(A)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,u)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${a.map((A,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=d.filter(g=>r.symbolToInfo.has(g)).map(g=>({type:12,data:r.symbolToInfo.get(g)?.dimValue||0}));m.push({type:12,data:s});let f=e.map((g,_)=>[...W(g)]).reduce((g,_)=>g.concat(_),m);return f.push(...W(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}},getShaderSource:c}},El=(e,t)=>{let r=new Oo(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((a,s)=>a.dims);e.compute(th(o,e.inputs[0].dataType,r,n))},kl=e=>{let t=e.equation.replace(/\s+/g,"");return J({equation:t})}});var nh,Ol,rh,oh,Dl,Bl=L(()=>{"use strict";ne();ae();ue();nh=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Ol=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},rh=(e,t)=>e.length>t.length?Ol(e,t):Ol(t,e),oh=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=rh(t,r),o=e[0].dataType,a=o===9||E.size(t)===1,s=o===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(E.size(n)/u),c=f=>{let g=O("input",o,t.length,s),_=U("output",o,n.length,u),y;if(o===9){let w=(x,v,$="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${g.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${$}(${g.getByOffset(`index${v}`)}[component${v}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,_)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},m=[{type:12,data:d},...W(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m})}},Dl=e=>{nh(e.inputs),e.compute(oh(e.inputs),{inputs:[0]})}});var ih,zl,Ml=L(()=>{"use strict";ne();ae();ue();nr();ih=e=>{let t=e[0].dataType,r=E.size(e[0].dims),n=E.size(e[1].dims),o=n%4===0,a=s=>{let u=O("x",t,[1],4),d=O("bias",t,[1],4),c=U("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${d.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,g=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(m).declareVariables(u,d,c)}

    ${vo(Ie(t))}

    ${s.mainStart(Rt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",$o("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Rt/4)}})}},zl=e=>{e.inputs.length<2||E.size(e.inputs[1].dims)===0?xu(e):e.compute(ih(e.inputs))}});var ah,sh,Rl,Ul,Nl=L(()=>{"use strict";ne();ae();Te();ue();ah=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},sh=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,a=E.normalizeAxis(t.axis,o),s=r.slice(0);s.splice(a,1,...n);let u=r[a],d=e[0].dataType===9?4:1,c=Math.ceil(E.size(s)/d),m=[{type:12,data:c},{type:6,data:u},{type:12,data:a},...W(e[0].dims,e[1].dims,s)],f=g=>{let _=O("data",e[0].dataType,e[0].dims.length,d),y=O("inputIndices",e[1].dataType,e[1].dims.length),w=U("output",e[0].dataType,s.length,d),x=$=>{let S=n.length,T=`var indicesIndices${$}  = ${y.type.indices}(0);`;for(let A=0;A<S;A++)T+=`${S>1?`indicesIndices${$}[${A}]`:`indicesIndices${$}`} = ${s.length>1?`outputIndices${$}[uniforms.axis + ${A}]`:`outputIndices${$}`};`;T+=`
          var idx${$} = ${y.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${_.type.indices};
        `;for(let A=0,I=0;A<o;A++)A===a?(T+=`${o>1?`dataIndices${$}[${A}]`:`dataIndices${$}`} = u32(idx${$});`,I+=S):(T+=`${o>1?`dataIndices${$}[${A}]`:`dataIndices${$}`} = ${s.length>1?`outputIndices${$}[${I}]`:`outputIndices${$}`};`,I++);return T},v;if(e[0].dataType===9){let $=(S,T,A="")=>`
          let outputIndices${T} = ${w.offsetToIndices(`outputOffset + ${T}u`)};
          ${x(T)};
          let offset${T} = ${_.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${S}[${T}] = ${A}(${_.getByOffset(`index${T}`)}[component${T}]);
        `;v=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${_.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,w)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:f}},Rl=e=>J({axis:e.axis}),Ul=(e,t)=>{let r=e.inputs;ah(r),e.compute(sh(e.inputs,t))}});var uh,Vl,Ll,Wl=L(()=>{"use strict";ne();ae();ue();uh=(e,t,r,n,o,a,s,u,d)=>{let c=[{type:12,data:a},{type:12,data:n},{type:12,data:o},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:d}],m=[a];c.push(...W(t.dims,m));let f=g=>{let _=O("indices_data",t.dataType,t.dims.length),y=U("input_slice_offsets_data",12,1,1),w=[_,y],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(x).declareVariables(...w)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:m,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Vl=(e,t)=>{let r=e.inputs,n=r[0].dims,o=r[0].dataType,a=r[1].dims,s=a[a.length-1],u=E.sizeToDimension(a,a.length-1),d=E.sizeFromDimension(n,t.batchDims+s),c=E.sizeToDimension(n,t.batchDims),m=E.sizeFromDimension(n,t.batchDims),f=u/c,g=new Array(s),_=d;for(let T=0;T<s;++T)g[s-1-T]=_,_*=n[t.batchDims+s-1-T];let y=uh(e,r[1],g,t.batchDims,n,u,f,m,s),w=t.batchDims+s;if(w>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=a.slice(0,-1).concat(n.slice(w)),v=E.size(x),$=[{type:12,data:v},{type:12,data:d},...W(r[0].dims,y.dims,x)],S=T=>{let A=O("data",r[0].dataType,r[0].dims.length),I=O("slice_offsets",12,y.dims.length),D=U("output",r[0].dataType,x.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(A,I,D)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:o}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:$}),getShaderSource:S},{inputs:[r[0],y]})},Ll=e=>({batchDims:e.batch_dims,cacheKey:""})});var lh,dh,Gl,Hl,Fl=L(()=>{"use strict";ne();ae();Te();ue();lh=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=E.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==o.dims.length||!o.dims.map((u,d)=>d===r?Math.ceil(u/n)===a.dims[d]:u===a.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,d)=>u===a.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},dh=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,a=E.normalizeAxis(t.gatherAxis,o),s=E.normalizeAxis(t.quantizeAxis,o),u=r.slice(0);u.splice(a,1,...n);let d=E.size(u),c=e[2].dataType,f=e[0].dataType===22,g=[{type:12,data:d},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...W(...e.map((y,w)=>y.dims),u)],_=y=>{let w=O("data",e[0].dataType,e[0].dims.length),x=O("inputIndices",e[1].dataType,e[1].dims.length),v=O("scales",e[2].dataType,e[2].dims.length),$=e.length>3?O("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=U("output",c,u.length),T=[w,x,v];$&&T.push($);let A=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(A).declareVariables(...T,S)}
        ${y.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${v.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${v.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${v.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ie(c)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,w)=>w!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,w)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:c}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:g}),getShaderSource:_}},Gl=(e,t)=>{let r=e.inputs;lh(r,t),e.compute(dh(e.inputs,t))},Hl=e=>J({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var ch,ph,ql,jl,Kl=L(()=>{"use strict";ne();ae();Te();ue();ch=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},ph=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,a=e[1].dims,s=e[1].dataType,u=E.normalizeAxis(t.axis,o),d=r[u],c=a.slice(0),m=E.size(c),f=O("input",n,o),g=O("indicesInput",s,a.length),_=U("output",n,c.length),y=[{type:12,data:m},{type:6,data:d},{type:12,data:u}];return y.push(...W(r,a,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,_)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},ql=e=>J({axis:e.axis}),jl=(e,t)=>{let r=e.inputs;ch(r),e.compute(ph(e.inputs,t))}});var mh,fh,Zl,Ql,Yl=L(()=>{"use strict";ne();ae();ue();mh=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},fh=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,a,s]=Gn.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[o,a];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,c=Math.ceil(a/d),m=Math.ceil(o/d),f=!0,g=E.size(u),_=[{type:12,data:f?c:g},{type:12,data:o},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...W(e[2].dims)),y.push("rank")),_.push(...W(u));let w=v=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",T=O("a",e[0].dataType,e[0].dims),A=O("b",e[1].dataType,e[1].dims),I=T.type.value,D=null,B=[T,A];e.length===3&&(D=O("c",e[2].dataType,e[2].dims.length),B.push(D));let V=U("output",e[0].dataType,u.length);B.push(V);let H=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(H).declareVariables(...B)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${S}
    ${D!=null?`let cOffset = ${D.broadcastedIndicesToOffset("vec2(m, n)",V)}; value += ${I}(uniforms.beta) * ${D.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=v=>{let $=O("a",e[0].dataType,e[0].dims),S=O("b",e[1].dataType,e[1].dims),T=null,A=[$,S];e.length===3&&(T=O("c",e[2].dataType,e[2].dims.length),A.push(T));let I=U("output",e[0].dataType,u.length);A.push(I);let D=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],B="",V="";t.transA&&t.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(V=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(V=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let H=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(D).declareVariables(...A)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${d}>, ${d}>;
  ${v.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${V}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${B}
      }
      workgroupBarrier();
    }

    ${H}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:c*m},programUniforms:_}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:_}),getShaderSource:w}},Zl=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Ql=(e,t)=>{mh(e.inputs),e.compute(fh(e.inputs,t))}});var ft,At,Kt,Zt,hh,gh,yh,bh,_h,wh,vh,$h,Xl,Jl,ed=L(()=>{"use strict";ne();ae();Te();ue();[ft,At,Kt,Zt]=[0,1,2,3],hh=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},gh=`
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
`,yh=e=>`
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
`,bh=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,_h=e=>`
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
`,wh=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${ft}] = batch;
     indices[${At}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Kt}] = u32(r);
            indices[${Zt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Kt}] = u32(clamp(r, 0, H - 1));
          indices[${Zt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Kt}] = gs_reflect(r, border[1], border[3]);
          indices[${Zt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,vh=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ft}], indices[${At}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ft}], indices[${At}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ft}], indices[${At}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ft}], indices[${At}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ft}], indices[${At}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ft}], indices[${At}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,$h=(e,t)=>{let r=O("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=O("grid",e[1].dataType,n.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[ft,At,Kt,Zt]=[0,3,1,2]);let s=U("output",e[0].dataType,a.length),u=r.type.value,d=E.size(a),c=[{type:12,data:d},...W(e[0].dims,n,a)],m=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,o,s)}
  ${gh}
  ${yh(u)}
  ${bh(t)}
  ${_h(t)}
  ${wh(r,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Kt}]);
      let W_in = i32(uniforms.x_shape[${Zt}]);

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
      var grid_indices = vec3<u32>(indices[${ft}], indices[${Kt}], indices[${Zt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${vh(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=E.size(a);return{outputs:[{dims:a,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:c}},getShaderSource:m}},Xl=(e,t)=>{hh(e.inputs),e.compute($h(e.inputs,t))},Jl=e=>J({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Ue,Th,nd,td,Ch,cn,rd,Do=L(()=>{"use strict";ne();ae();Te();Zn();er();ue();mt();Ue=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Th=(e,t)=>{let r=e[0],n=Ue(e,1),o=Ue(e,2),a=Ue(e,3),s=Ue(e,4),u=Ue(e,5),d=Ue(e,6),c=Ue(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],f=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=f,y=0,w=0,x=Math.floor(g/t.numHeads);if(d&&c&&E.size(d.dims)&&E.size(c.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==m||c.dims[1]!==t.numHeads||c.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=d.dims[2],w=d.dims[2]}else if(d&&E.size(d.dims)||c&&E.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(n&&E.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(a&&E.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=y+_,S=0;if(s&&E.size(s.dims)>0){S=8;let D=s.dims;throw D.length===1?D[0]===m?S=1:D[0]===3*m+2&&(S=3):D.length===2&&D[0]===m&&D[1]===$&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,A=g;if(o&&E.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(_!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(_!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],T=!0}}let I=!1;if(s&&E.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&E.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==m||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:f,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:$,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:g,vHiddenSize:A,headSize:x,vHeadSize:Math.floor(A/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:I,passPastInKv:T,qkvFormat:v}},nd=e=>J({...e}),td=J({perm:[0,2,1,3]}),Ch=(e,t,r,n,o,a,s)=>{let u=[n,o,a],d=E.size(u),c=[{type:12,data:d},{type:12,data:s},{type:12,data:a}],m=f=>{let g=U("qkv_with_bias",t.dataType,u),_=O("qkv",t.dataType,u),y=O("bias",r.dataType,u),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(w).declareVariables(_,y,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},cn=(e,t,r,n,o,a,s,u)=>{let d=a;if(s&&E.size(s.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Ch(e,a,s,t,n,r*o,u),d=d.reshape([t,n,r,o]),r===1||n===1?d:e.compute(Be(d,td.perm),{inputs:[d],outputs:[-1]})[0]}else return a.dims.length===3&&(d=a.reshape([t,n,r,o])),r===1||n===1?d:e.compute(Be(d,td.perm),{inputs:[d],outputs:[-1]})[0]},rd=(e,t)=>{let r=Th(e.inputs,t),n=e.inputs[0],o=Ue(e.inputs,1),a=Ue(e.inputs,2),s=Ue(e.inputs,3),u=Ue(e.inputs,4),d=Ue(e.inputs,5),c=Ue(e.inputs,6),m=Ue(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&a&&o.dims.length===4&&a.dims.length===4,g=cn(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,s,0);if(f)return jt(e,g,o,a,u,void 0,c,m,d,r);if(!o||!a)throw new Error("key and value must be provided");let _=cn(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,s,r.hiddenSize),y=cn(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);jt(e,g,_,y,u,void 0,c,m,d,r)}});var Ih,Ah,Eh,kh,Bo,od,id,zo=L(()=>{"use strict";ne();ae();Te();ue();Ih=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ah=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),J({numOutputs:n,axis:t.axis,splitSizes:r})},Eh=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${q("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,kh=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Bo=(e,t)=>{let r=e[0].dims,n=E.size(r),o=e[0].dataType,a=E.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=O("input",o,r.length),d=new Array(t.numOutputs),c=[],m=[],f=0,g=[{type:12,data:n}];for(let y=0;y<t.numOutputs;y++){f+=t.splitSizes[y],d[y]=f;let w=r.slice();w[a]=t.splitSizes[y],m.push(w),s[y]=U(`output${y}`,o,w.length),c.push({dims:m[y],dataType:e[0].dataType})}g.push({type:12,data:d},...W(r,...m));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...s)}
  ${Eh(d.length)}
  ${kh(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${q("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:g})}},od=(e,t)=>{Ih(e.inputs);let r=e.inputs.length===1?t:Ah(e.inputs,t);e.compute(Bo(e.inputs,r),{inputs:[0]})},id=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return J({axis:t,numOutputs:n,splitSizes:r})}});var Ph,cr,ad,Mo=L(()=>{"use strict";ne();ae();Te();ue();Ph=(e,t)=>{let[r,n,o,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!E.areEqual(n.dims,[])&&!E.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!E.areEqual(o.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],c=r.dims[r.dims.length-2],m=o.dims[0],f=E.sizeFromDimension(r.dims,1)/c,g=u===0?o.dims[1]*2:f/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(c!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(c>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(g/2!==o.dims[1]&&u/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`)},cr=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:a}=t,s=e[0].dims[0],u=E.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],c=u/d,m=e[2].dims[1],f=o===0?m*2:c/n,g=new Array(s,d,c/f,f-m),_=E.computeStrides(g),y=[{type:1,data:a},{type:12,data:g},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,c,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,d*f,1]}):[],...W(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=x=>{let v=O("input",e[0].dataType,e[0].dims.length),$=O("position_ids",e[1].dataType,e[1].dims.length),S=O("cos_cache",e[2].dataType,e[2].dims.length),T=O("sin_cache",e[3].dataType,e[3].dims.length),A=U("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${x.declareVariables(v,$,S,T,A)}

        ${x.mainStart(Rt)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",U("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${A.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${A.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${A.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(g)/Rt)},programUniforms:y})}},ad=(e,t)=>{Ph(e.inputs,t),e.compute(cr(e.inputs,t))}});var Oh,Dh,sd,Bh,ud,ld=L(()=>{"use strict";Te();ne();er();Do();zo();mt();Mo();ue();Oh=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],c=r.dims[1],m=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=c,g=0,_=!n||n.dims.length===0,y=Math.floor(_?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);_&&(m=y*t.numHeads);let w=a&&a.dims.length!==0,x=s&&s.dims.length!==0;if(w&&a.dims.length===4&&a.dims[0]===d&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&x){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(w||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');f=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let S=0,T=!1,A=t.kvNumHeads?y*t.kvNumHeads:m;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');A=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');A=o.dims[1]*o.dims[3],T=!0}}let I=e.length>4?e[5]:void 0;if(I){if(I.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let H=I.dims.reduce((F,j)=>F*j,1);if(H!==d)throw new Error(`seqlens_k must have batch_size (${d}) elements, got ${H}.`);for(let F=0;F<I.dims.length;F++)if(I.dims[F]!==1&&I.dims[F]!==d)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${d}), got dims[${F}] = ${I.dims[F]}.`)}return{batchSize:d,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:m,vHiddenSize:A,headSize:y,vHeadSize:Math.floor(A/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:$}},Dh=J({perm:[0,2,1,3]}),sd=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(Be(n,Dh.perm),{inputs:[n],outputs:[-1]})[0]),n},Bh=(e,t,r,n)=>{let o=7,a=["type","type"],s=[e*t],u=e*t,d=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],c=m=>{let f=O("seq_lens",r.dataType,r.dims),g=O("total_seq_lens",n.dataType,n.dims),_=U("pos_ids",o,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${m.registerUniforms(y).declareVariables(f,g,_)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
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
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},ud=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=Oh(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=J({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,m*r.headSize,m*r.headSize]}),[g,_,y]=!o&&!a?e.compute(Bo([n],f),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,a],w,x;if(t.doRotary){let T=e.compute(Bh(r.batchSize,r.sequenceLength,d,c),{inputs:[d,c],outputs:[-1]})[0],A=e.inputs[7],I=e.inputs[8],D=J({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),B=[g,T,A,I],V=[-1];w=e.compute(cr(B,D),{inputs:B,outputs:V})[0],B.splice(0,1,_);let H=J({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(cr(B,H),{inputs:B,outputs:V})[0]}let v=cn(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:g,void 0,0),$=sd(e,t.doRotary?x:_,r),S=sd(e,y,r);jt(e,v,$,S,void 0,void 0,s,u,void 0,r,d,c)}});var dd,zh,Mh,cd,pd=L(()=>{"use strict";ne();ae();mt();ue();dd=(e,t,r,n,o,a,s,u)=>{let d=ye(a),c=d===1?"f32":`vec${d}f`,m=d===1?"vec2f":`mat2x${d}f`,f=o*s,g=64;f===1&&(g=256);let _=[o,s,a/d],y=[o,s,2],w=["rank","type","type"],x=[];x.push(...W(_,y));let v=$=>{let S=O("x",t.dataType,3,d),T=O("scale",r.dataType,r.dims),A=O("bias",n.dataType,n.dims),I=U("output",1,3,2),D=[S,T,A,I];return`
  var<workgroup> workgroup_shared : array<${m}, ${g}>;
  const workgroup_size = ${g}u;
  ${$.declareVariables(...D)}
  ${$.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${m}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Ke("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${Ke("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${g}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:f},programUniforms:x}),getShaderSource:v},{inputs:[t,r,n],outputs:[-1]})[0]},zh=(e,t,r)=>{let n=t[0].dims,o=n,a=2,s=n[0],u=n[1],d=E.sizeFromDimension(n,a),c=ye(d),m=E.size(o)/c,f=dd(e,t[0],t[1],t[2],s,d,u,r.epsilon),g=[s,u,d/c],_=[s,u],y=["type","none"],w=x=>{let v=O("x",t[0].dataType,g.length,c),$=O("scale_shift",1,_.length,2),S=U("output",t[0].dataType,g.length,c),T=[v,$,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...T)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...W(g,_,g)]}),getShaderSource:w},{inputs:[t[0],f]})},Mh=(e,t,r)=>{let n=t[0].dims,o=n,a=n[0],s=n[n.length-1],u=E.sizeFromDimension(n,1)/s,d=ye(s),c=E.size(o)/d,m=[{type:12,data:u},{type:12,data:Math.floor(s/d)}],f=["type","type"],g=!1,_=[0,n.length-1];for(let v=0;v<n.length-2;v++)g=g||n[v+1]!==1,_.push(v+1);g=g&&n[n.length-1]!==1;let y=g?e.compute(Be(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},(v,$)=>n[_[$]])),w=dd(e,y,t[1],t[2],a,u,s,r.epsilon),x=v=>{let $=$e(t[0].dataType),S=d===1?"vec2f":`mat${d}x2f`,T=D=>{let B=D===0?"x":"y",V=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${$}(${V}(scale.${B}))`;case 2:return`vec2<${$}>(${V}(scale[0].${B}, scale[1].${B}))`;case 4:return`vec4<${$}>(${V}(scale[0].${B}, scale[1].${B}, scale[2].${B}, scale[3].${B}))`;default:throw new Error(`Not supported compoents ${d}`)}},A=O("input",t[0].dataType,t[0].dims,d),I=U("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${A.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:x},{inputs:[t[0],w]})},cd=(e,t)=>{t.format==="NHWC"?Mh(e,e.inputs,t):zh(e,e.inputs,t)}});var Rh,Uh,md,fd=L(()=>{"use strict";ne();ae();ue();Rh=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Uh=(e,t,r)=>{let n=t.simplified,o=e[0].dims,a=e[1],s=!n&&e[2],u=o,d=E.normalizeAxis(t.axis,o.length),c=E.sizeToDimension(o,d),m=E.sizeFromDimension(o,d),f=E.size(a.dims),g=s?E.size(s.dims):0;if(f!==m||s&&g!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let _=[];for(let A=0;A<o.length;++A)A<d?_.push(o[A]):_.push(1);let y=ye(m),w=["type","type"],x=[{type:12,data:c},{type:1,data:m},{type:12,data:Math.floor(m/y)},{type:1,data:t.epsilon}];s&&w.push("type");let v=r>1,$=r>2,S=A=>{let I=$e(e[0].dataType),D=[O("x",e[0].dataType,e[0].dims,y),O("scale",a.dataType,a.dims,y)];s&&D.push(O("bias",s.dataType,s.dims,y)),D.push(U("output",e[0].dataType,u,y)),v&&D.push(U("mean_data_output",1,_)),$&&D.push(U("inv_std_output",1,_));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${A.registerUniforms(B).declareVariables(...D)}
  ${A.mainStart()}
    ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${yo("f32",y)};
    var mean_square_vector = ${yo("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ut(I,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ke("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ke("mean_square_vector",y)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ut(I,y,"x[j + offset]")};
      let f32scale = ${Ut(I,y,"scale[j]")};
      output[j + offset] = ${D[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Ut(I,y,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:u,dataType:e[0].dataType}];return v&&T.push({dims:_,dataType:1}),$&&T.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${n}`,inputDependencies:w},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:x}),getShaderSource:S}},md=(e,t)=>{Rh(e.inputs),e.compute(Uh(e.inputs,t,e.outputCount))}});var Nh,hd,gd=L(()=>{"use strict";ae();ar();sr();Nh=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},hd=e=>{Nh(e.inputs);let t=rt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(ir(e.inputs,{activation:""},t));else{let o=t[t.length-2],a=E.size(e.inputs[0].dims.slice(0,-2)),s=E.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&o===1&&s===1){let u=e.inputs[0].reshape([1,a,n]),d=e.inputs[1].reshape([1,n,r]),c=[1,a,r],m=[u,d];e.compute(dn(m,{activation:""},t,c),{inputs:m})}else e.compute(dn(e.inputs,{activation:""},t))}}});var Vh,Lh,Wh,yd,bd,_d=L(()=>{"use strict";ne();ae();Te();ue();Vh=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!E.areEqual(s.dims,[t.n,o,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(E.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,f=t.n*(t.bits===8?o:Math.floor((o*t.bits+7)/8));if(E.size(m)!==f)throw new Error("zeroPoints input size error.")}},Lh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],a=t.k,s=t.n,u=r.slice(0,n-2),d=E.size(u),m=e[1].dims[2]/4,f=e[0].dataType,g=ye(t.k),_=ye(m),y=ye(s),w=u.concat([o,s]),x=o>1&&s/y%2===0?2:1,v=E.size(w)/y/x,$=64,S=[],T=[d,o,a/g],A=E.convertShape(e[1].dims).slice();A.splice(-1,1,m/_),S.push(...W(T)),S.push(...W(A)),S.push(...W(e[2].dims)),e.length===4&&S.push(...W(E.convertShape(e[3].dims)));let I=[d,o,s/y];S.push(...W(I));let D=B=>{let V=T.length,H=O("a",e[0].dataType,V,g),F=O("b",12,A.length,_),j=O("scales",e[2].dataType,e[2].dims.length),ee=[H,F,j],ie=e.length===4?O("zero_points",12,e[3].dims.length):void 0;ie&&ee.push(ie);let Q=I.length,Y=U("output",e[0].dataType,Q,y),te=$e(e[0].dataType),K=(()=>{switch(g){case 1:return`array<${te}, 8>`;case 2:return`mat4x2<${te}>`;case 4:return`mat2x4<${te}>`;default:throw new Error(`${g}-component is not supported.`)}})(),oe=Math.floor(32/t.bits),ce=Math.floor(oe/8),le=()=>{let R="";for(let k=0;k<ce;k++){let X=k*t.bits*4,Ae=X+t.bits;R+=`
          // reuse a data (pass ${k})
            var input_offset${k>0?k:""} = ${k===0?H.indicesToOffset(`${H.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${k>0?k:""}: ${K};
            for (var j${k>0?k:""}: u32 = 0; j${k>0?k:""} < ${8/g}; j${k>0?k:""}++) {
              a_data${k>0?k:""}[j${k>0?k:""}] = ${H.getByOffset(`input_offset${k>0?k:""}`)};
              input_offset${k>0?k:""}++;
            }
          `;for(let he=0;he<y*x;he++)R+=`
            b_value = ${_===1?`b${he}_data`:`b${he}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${k*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${X}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ae}u) & b_mask);`}
            b_quantized_values = ${K}(${Array.from({length:4},(ke,me)=>`${te}(b_value_lower[${me}]), ${te}(b_value_upper[${me}])`).join(", ")});
            b_dequantized_values = ${g===1?`${K}(${Array.from({length:8},(ke,me)=>`(b_quantized_values[${me}] - ${ie?`zero_point${he}`:"zero_point"}) * scale${he}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${ie?`zero_point${he}`:"zero_point"}`).join(",")})) * scale${he};`};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(he/y)}]${y>1?`[${he%y}]`:""} += ${Array.from({length:8/g},(ke,me)=>`${g===1?`a_data${k>0?k:""}[${me}] * b_dequantized_values[${me}]`:`dot(a_data${k>0?k:""}[${me}], b_dequantized_values[${me}])`}`).join(" + ")};
          `}return R},xe=()=>{let R=`
            var col_index = col * ${y};
            ${ie?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${te}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let k=0;k<y*x;k++)R+=`
            let scale${k} = ${j.getByOffset("col_index * nBlocksPerCol + block")};
            ${ie?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${ie.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${k} = ${te}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return R},fe=()=>{let R=`col_index = col * ${y};`;for(let k=0;k<y*x;k++)R+=`
            let b${k}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return R+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,R};return`
        var<workgroup> workgroup_shared: array<${Y.type.value}, ${x*$}>;
        ${B.declareVariables(...ee,Y)}
        ${B.mainStart([$,1,1])}
          let output_indices = ${Y.offsetToIndices(`(global_idx / ${$}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/g};
            ${xe()}
            for (var word: u32 = 0; word < ${m}; word += ${_}) {
              ${fe()}
              for (var i: u32 = 0; i < ${_}; i++) {
                ${le()}
                word_offset += ${oe/g};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${g};${_};${y};${x};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:f}],dispatchGroup:{x:v},programUniforms:S}),getShaderSource:D}},Wh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],a=t.k,s=t.n,u=r.slice(0,n-2),d=E.size(u),m=e[1].dims[2]/4,f=e[0].dataType,g=ye(t.k),_=ye(m),y=u.concat([o,s]),w=128,x=s%8===0?8:s%4===0?4:1,v=w/x,$=Math.floor(32/t.bits),S=v*_*$,T=S/g,A=S/t.blockSize,I=E.size(y)/x,D=[],B=[d,o,a/g],V=E.convertShape(e[1].dims).slice();V.splice(-1,1,m/_),D.push(...W(B)),D.push(...W(V)),D.push(...W(e[2].dims)),e.length===4&&D.push(...W(E.convertShape(e[3].dims)));let H=[d,o,s];D.push(...W(H));let F=j=>{let ee=B.length,ie=O("a",e[0].dataType,ee,g),Q=O("b",12,V.length,_),Y=O("scales",e[2].dataType,e[2].dims.length),te=[ie,Q,Y],K=e.length===4?O("zero_points",12,e[3].dims.length):void 0;K&&te.push(K);let oe=H.length,ce=U("output",e[0].dataType,oe),le=$e(e[0].dataType),xe=()=>{switch(g){case 1:return`
          let a_data0 = vec4<${le}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${le}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${le}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${le}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${g}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ie.type.value}, ${T}>;
        var<workgroup> inter_results: array<array<${ce.type.value}, ${v}>, ${x}>;
        ${j.declareVariables(...te,ce)}
        ${j.mainStart([v,x,1])}
          let output_indices = ${ce.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${A} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${T};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${T}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ie.getByIndices(`${ie.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ie.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${A} + local_id.x;
            ${K?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${le}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${le}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${Y.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Q.getByIndices(`${Q.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/g};
            for (var i: u32 = 0; i < ${_}; i++) {
              let b_value = ${_===1?"b_data":"b_data[i]"};
              ${(()=>{let fe=Math.floor($/8),R="";for(let k=0;k<fe;k++){let X=k*t.bits*4,Ae=X+t.bits;R+=`
              ${xe()}
              {${t.bits===2?`
                let half_word = b_value >> ${k*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${X}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ae}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${le}>(${Array.from({length:4},(he,ke)=>`${le}(b_value_lower[${ke}]), ${le}(b_value_upper[${ke}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${le}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(he,ke)=>`${`dot(a_data${ke}, b_dequantized_values[${ke}])`}`).join(" + ")};
              }
              word_offset += ${8/g};`}return R})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${ce.type.value} = ${ce.type.value}(0);
            for (var b = 0u; b < ${v}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ce.setByIndices(`${ce.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${g};${_};${v};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:I},programUniforms:D}),getShaderSource:F}},yd=(e,t)=>{Vh(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Wh(e.inputs,t)):e.compute(Lh(e.inputs,t))},bd=e=>J(e)});var Gh,Hh,Fh,qh,jh,Kh,Zh,Qh,wd,vd=L(()=>{"use strict";ne();ae();ue();Gh=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Hh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${q("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${q("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${q("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Fh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${q("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${q("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${q("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${q("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},qh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${q("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${q("uniforms.x_shape",o,t)})) {
                  k = i32(${q("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${q("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},jh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${q("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${q("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${q("uniforms.x_shape",o,t)})) {
                  k -= i32(${q("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${q("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Kh=(e,t,r)=>{switch(r.mode){case 0:return Hh(e,t,r.pads.length);case 1:return Fh(e,t,r.pads.length);case 2:return qh(e,t,r.pads.length);case 3:return jh(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Zh=(e,t)=>{let r=E.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=E.size(r),a=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...W(e[0].dims,r));let u=["rank"],d=c=>{let m=U("output",e[0].dataType,r.length),f=O("x",e[0].dataType,n.length),g=f.type.value,_=Kh(m,n.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?g:"f32"}),`
            ${c.registerUniforms(y).declareVariables(f,m)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(E.size(r)/64)},programUniforms:a}),getShaderSource:d}},Qh=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,a=new Int32Array(2*o).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)a[Number(u[d])]=Number(r[d]),a[Number(u[d])+o]=Number(r[d+u.length])}else r.forEach((u,d)=>a[Number(d)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:n,pads:s}}else return t},wd=(e,t)=>{Gh(e.inputs);let r=Qh(e.inputs,t);e.compute(Zh(e.inputs,r),{inputs:[0]})}});var pr,$d,xd,Sd,Td,Yh,Xh,Cd,Id,Ad,Ed,kd,Pd,Od,Dd,Bd,zd,Md,Rd,Ud=L(()=>{"use strict";Le();ne();ae();ue();pr=e=>{if(ve.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},$d=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),d=a?t.dilations.slice():[],c=t.pads.slice();Mt.adjustPoolAttributes(r,o,s,u,d,c);let m=Mt.computePoolOutputShape(r,o,u,d,s,c,t.autoPad,t.ceilMode),f=Object.assign({},t);a?Object.assign(f,{kernelShape:s,strides:u,pads:c,dilations:d,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:u,pads:c,cacheKey:t.cacheKey});let g=m.slice();return g.push(g.splice(1,1)[0]),[f,n?g:m]},xd=(e,t)=>{let r=t.format==="NHWC",n=E.size(e),o=E.size(t.kernelShape),a=[{type:12,data:n},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],f=!!(c+m);a.push({type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:m}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];g=!!(w+x),a.push({type:12,data:_},{type:12,data:y},{type:12,data:w},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,f,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=E.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((c,m)=>c+m);return[a,s,!!d,!1,!1]}},Sd=(e,t,r,n,o,a,s,u,d,c,m,f)=>{let g=o.format==="NHWC",_=t.type.value,y=U("output",t.type.tensor,n);if(o.kernelShape.length<=2){let w="",x="",v="",$=r-(g?2:1);if(m?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,o.kernelShape.length===2){let T=r-(g?3:2);f?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${x}
              ${w}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=o.kernelShape.length,x=o.pads.length,v="";return c?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(d).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${q("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${q("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${q("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${q("uniforms.pads","j - 2u",x)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},Td=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Yh=e=>`${Td(e)};${e.countIncludePad}`,Xh=e=>`${Td(e)};${e.storageOrder};${e.dilations}`,Cd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Id=(e,t,r,n)=>{let[o,a]=$d(t,n,r),s=O("x",t.dataType,t.dims.length),u=s.type.value,d="value += x_val;",c="";o.countIncludePad?c+=`value /= ${u}(uniforms.kernelSize);`:c+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[m,f,g,_,y]=xd(a,o);m.push(...W(t.dims,a));let w=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${g};${_};${y}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:m}),getShaderSource:x=>Sd(x,s,t.dims.length,a.length,o,d,c,0,f,g,_,y)}},Ad=e=>{let t=e.count_include_pad!==0,r=Cd(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Yh(n)}},Ed=(e,t)=>{pr(e.inputs),e.compute(Id("AveragePool",e.inputs[0],!1,t))},kd={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Pd=e=>{let t=e.format;return{format:t,...kd,cacheKey:t}},Od=(e,t)=>{pr(e.inputs),e.compute(Id("GlobalAveragePool",e.inputs[0],!0,t))},Dd=(e,t,r,n)=>{let[o,a]=$d(t,n,r),s=`
      value = max(x_val, value);
    `,u="",d=O("x",t.dataType,t.dims.length),c=["rank"],[m,f,g,_,y]=xd(a,o);return m.push(...W(t.dims,a)),{name:e,shaderCache:{hint:`${n.cacheKey};${g};${_};${y}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(E.size(a)/64)},programUniforms:m}),getShaderSource:w=>Sd(w,d,t.dims.length,a.length,o,s,u,t.dataType===10?-65504:-1e5,f,g,_,y)}},Bd=(e,t)=>{pr(e.inputs),e.compute(Dd("MaxPool",e.inputs[0],!1,t))},zd=e=>{let t=e.storage_order,r=e.dilations,n=Cd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:Xh(o)}},Md=e=>{let t=e.format;return{format:t,...kd,cacheKey:t}},Rd=(e,t)=>{pr(e.inputs),e.compute(Dd("GlobalMaxPool",e.inputs[0],!0,t))}});var eg,tg,Nd,Vd,Ld=L(()=>{"use strict";ne();ae();Te();ue();eg=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,a)=>a===t.axis||o===e[0].dims[a]).reduce((o,a)=>o&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},tg=(e,t)=>{let r=E.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,a=e[0].dims,s=e[1].dataType,u=E.size(a),d=n===3||n===2,c=d?[Math.ceil(E.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,f=e.length>2?e[2]:void 0,g=f?d?[Math.ceil(E.size(f.dims)/4)]:f.dims:void 0,_=m.length===0||m.length===1&&m[0]===1,y=_===!1&&m.length===1,w=ye(u),x=_&&(!d||w===4),v=x?w:1,$=x&&!d?w:1,S=O("input",d?12:n,c.length,$),T=O("scale",s,m.length),A=f?O("zero_point",d?12:n,g.length):void 0,I=U("output",s,a.length,v),D=[S,T];A&&D.push(A);let B=[c,m];f&&B.push(g);let V=[{type:12,data:u/v},{type:12,data:r},{type:12,data:t.blockSize},...W(...B,a)],H=F=>{let j=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${F.registerUniforms(j).declareVariables(...D,I)}
      ${F.mainStart()}
          ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${T.getByOffset("0")}`:y?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${A?_?d?`
                let zero_point_input = ${A.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${A.getByOffset("0")}`:y?d?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${A.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${A.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${A.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${A.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:A?["rank","rank","rank"]:["rank","rank"]},getShaderSource:H,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:V})}},Nd=(e,t)=>{eg(e.inputs,t),e.compute(tg(e.inputs,t))},Vd=e=>J({axis:e.axis,blockSize:e.blockSize})});var ng,rg,Wd,Gd=L(()=>{"use strict";Le();ne();ue();ng=(e,t,r)=>{let n=e===t,o=e<t&&r<0,a=e>t&&r>0;if(n||o||a)throw new Error("Range these inputs' contents are invalid.")},rg=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),a=[o],s=o,u=[{type:12,data:s},{type:n,data:e},{type:n,data:r},...W(a)],d=c=>{let m=U("output",n,a.length),f=m.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${c.registerUniforms(g).declareVariables(m)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},Wd=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),ve.webgpu.validateInputContent&&ng(t,r,n),e.compute(rg(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var og,ig,Hd,Fd,qd=L(()=>{"use strict";ne();ae();Te();ue();og=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let o=`{
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
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${o}bitcast<${n}>(oldValue) + (${r})${a}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${o}min(bitcast<${n}>(oldValue), (${r}))${a}`;case"mul":return`${o}(bitcast<${n}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},ig=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r,a=1,s=Math.ceil(E.sizeToDimension(n,n.length-1)/a),u=n[n.length-1],d=E.sizeFromDimension(r,u),c=[{type:12,data:s},{type:12,data:u},{type:12,data:d},...W(e[1].dims,e[2].dims,o)],m=f=>{let g=O("indices",e[1].dataType,e[1].dims.length),_=O("updates",e[2].dataType,e[2].dims.length,a),y=t.reduction!=="none"&&t.reduction!==""?ls("output",e[0].dataType,o.length):U("output",e[0].dataType,o.length,a);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,_,y)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
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
    ${og(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:m}},Hd=e=>J({reduction:e.reduction}),Fd=(e,t)=>{e.compute(ig(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}});var ag,sg,ug,jd,lg,dg,cg,pg,mg,fg,hg,gg,Kd,yg,bg,_g,wg,vg,Zd,Qd,Yd=L(()=>{"use strict";ne();ae();Te();ue();ag=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},sg=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,a)=>n[o]=e[a]),n},ug=(e,t,r,n,o,a)=>{let[s,u,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(m=>a.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==c&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");ag(n,t),t.axes.length>0&&sg(n,t.axes,c).forEach((m,f)=>n[f]=m)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==c&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},jd=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,lg=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${jd("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${jd("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",dg=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",cg=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((a,s)=>{n[a]=o[s],n[s+r]=o[t.length+s]}),n):o},pg=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(a=>o.push(a)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((a,s)=>o[a]=r[s])}else r.forEach(a=>o.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((a,s)=>Math.round(a*t[s]))}return o},mg=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=n),r.axes.forEach(a=>o[a]=Math.round(e[a]*t[a]))):(t.fill(n,0,t.length),o.forEach((a,s)=>o[s]=Math.round(a*t[s]))),o},fg=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${q("uniforms.scales","i",n)};
        var roi_low = ${q("uniforms.roi","i",o)};
        var roi_hi = ${q("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${q("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${q("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,hg=(e,t,r,n,o,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${q("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${q("uniforms.roi","i",a)};
          var roi_hi = ${q("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${q("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${q("uniforms.output_shape","i",n.length)};
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
    }`,gg=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${q("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Kd=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",yg=(e,t,r,n,o)=>{let[s,u,d,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(row, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${Kd(e,c,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${m} = originalIndices[${u}];
      var col:${m} = originalIndices[${d}];
      ${n?`if (row < 0 || row > (${r[u]} - 1) || col < 0 || col > (${r[d]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[u]} - 1));
      col = max(0, min(col, ${r[d]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${m} = getInputValue(batch, channel, row1, col1);
      var x12: ${m} = getInputValue(batch, channel, row1, col2);
      var x21: ${m} = getInputValue(batch, channel, row2, col1);
      var x22: ${m} = getInputValue(batch, channel, row2, col2);
      var dx1: ${m} = abs(row - ${m}(row1));
      var dx2: ${m} = abs(${m}(row2) - row);
      var dy1: ${m} = abs(col - ${m}(col1));
      var dy2: ${m} = abs(${m}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},bg=(e,t,r,n,o,a,s,u,d,c)=>{let m=r.length===2,f=!0,[g,_]=m?[0,1]:f?[2,3]:[1,2],y=e.type.value,w=x=>{let v=x===g?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[x]},
        ${n[x]}, ${r[x]}, ${a[x]}, ${a[x]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${d};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${y} = originalIdx + ${y}(i);
          if (${v} < 0 || ${v} >= ${r[x]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${v} = max(0, min(${v}, ${r[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${v})`)};
          data[i + 1] = ${x===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(g)};
    ${w(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},_g=(e,t,r,n,o)=>{let[s,u,d,c,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",u,`max(0, min(depth, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${Kd(e,m,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${u}];
      var height:${f} = originalIndices[${d}];
      var width:${f} = originalIndices[${c}];
      ${n?`if (depth < 0 || depth > (${r[u]} - 1) || height < 0 || height > (${r[d]} - 1) || width < 0 || (width > ${r[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[u]} - 1));
      height = max(0, min(height, ${r[d]} - 1));
      width = max(0, min(width, ${r[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${m}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},wg=(e,t,r,n,o,a)=>{let s=e.dims,u=cg(a,t.axes,s.length),d=pg(s,n,o,t.axes),c=n.slice();n.length===0&&(c=s.map(($,S)=>$===0?1:d[S]/$),t.keepAspectRatioPolicy!=="stretch"&&(d=mg(s,c,t)));let m=U("output",e.dataType,d.length),f=O("input",e.dataType,s.length),g=E.size(d),_=s.length===d.length&&s.every(($,S)=>$===d[S]),y=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,x=f.type.value,v=$=>`
      ${_?"":`
      ${lg(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${gg(f,s)};
              ${dg(t.nearestMode,r,x)};
              ${hg(f,m,s,d,c.length,u.length,y)};
              `;case"linear":return`
              ${fg(m,s,d,c.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${yg(f,m,s,y,w)}`;if(s.length===3||s.length===5)return`${_g(f,m,s,y,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${bg(f,m,s,d,c,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",u.length).declareVariables(f,m)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?t.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:c},{type:1,data:u},...W(s,d)]})}},vg=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},Zd=(e,t)=>{let r=[],n=[],o=[],a=vg(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");ug(e.inputs,t,a,r,n,o),e.compute(wg(e.inputs[0],t,a,r,n,o),{inputs:[0]})},Qd=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return J({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:d,nearestMode:c})}});var $g,xg,Xd,Jd=L(()=>{"use strict";ne();ae();ue();$g=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},xg=(e,t,r,n)=>{let o=t.simplified,a=e[0].dims,s=E.size(a),u=a,d=s,c=a.slice(-1)[0],m=n?a.slice(0,-1).concat(1):[],f=!o&&e.length>3,g=e.length>4,_=n&&r>1,y=n&&r>2,w=r>3,x=64,v=ye(c),$=[{type:12,data:d},{type:12,data:v},{type:12,data:c},{type:1,data:t.epsilon}],S=A=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],D=[O("x",e[0].dataType,e[0].dims,v),O("skip",e[1].dataType,e[1].dims,v),O("gamma",e[2].dataType,e[2].dims,v)];f&&D.push(O("beta",e[3].dataType,e[3].dims,v)),g&&D.push(O("bias",e[4].dataType,e[4].dims,v)),D.push(U("output",e[0].dataType,u,v)),_&&D.push(U("mean_output",1,m)),y&&D.push(U("inv_std_output",1,m)),w&&D.push(U("input_skip_bias_sum",e[0].dataType,u,v));let B=$e(e[0].dataType),V=$e(1,v);return`

      ${A.registerUniforms(I).declareVariables(...D)}
      var<workgroup> sum_shared : array<${V}, ${x}>;
      var<workgroup> sum_squared_shared : array<${V}, ${x}>;

      ${A.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":B+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ut(B,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
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
        let mean = ${Ke("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ke("square_sum",v)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:u,dataType:e[0].dataType}];return r>1&&T.push({dims:m,dataType:1}),r>2&&T.push({dims:m,dataType:1}),r>3&&T.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${y};${w}`,inputDependencies:e.map((A,I)=>"type")},getShaderSource:S,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/c)},programUniforms:$})}},Xd=(e,t)=>{$g(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(xg(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Sg,mr,Tg,ec,Cg,Ig,tc,nc,rc=L(()=>{"use strict";ne();ae();Te();ue();Sg=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},mr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Tg=(e,t)=>{if(e.length>1){let r=mr(e,1),n=mr(e,2),o=mr(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),J({starts:r,ends:n,axes:o})}else return t},ec=(e,t,r,n,o)=>{let a=e;return e<0&&(a+=r[n[t]]),o[t]<0?Math.max(0,Math.min(a,r[n[t]]-1)):Math.max(0,Math.min(a,r[n[t]]))},Cg=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${q("uniforms.input_shape","i",r.length)};
            let steps_i = ${q("uniforms.steps","i",r.length)};
            let signs_i = ${q("uniforms.signs","i",r.length)};
            let starts_i = ${q("uniforms.starts","i",r.length)};
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
      }`,Ig=(e,t)=>{let r=e[0].dims,n=E.size(r),o=t.axes.length>0?E.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=mr(e,4);a.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(o.length).fill(1));let s=t.starts.map((v,$)=>ec(v,$,r,o,a)),u=t.ends.map((v,$)=>ec(v,$,r,o,a));if(o.length!==s.length||o.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let v=0;v<r.length;++v)o.includes(v)||(s.splice(v,0,0),u.splice(v,0,r[v]),a.splice(v,0,1));let d=a.map(v=>Math.sign(v));a.forEach((v,$,S)=>{if(v<0){let T=(u[$]-s[$])/v,A=s[$],I=A+T*a[$];s[$]=I,u[$]=A,S[$]=-v}});let c=r.slice(0);o.forEach((v,$)=>{c[v]=Math.ceil((u[v]-s[v])/a[v])});let m={dims:c,dataType:e[0].dataType},f=U("output",e[0].dataType,c.length),g=O("input",e[0].dataType,e[0].dims.length),_=E.size(c),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:a.length}],w=[{type:12,data:_},{type:12,data:s},{type:6,data:d},{type:12,data:a},...W(e[0].dims,c)],x=v=>`
      ${v.registerUniforms(y).declareVariables(g,f)}
        ${Cg(g,f,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:w})}},tc=(e,t)=>{Sg(e.inputs,t);let r=Tg(e.inputs,t);e.compute(Ig(e.inputs,r),{inputs:[0]})},nc=e=>{let t=e.starts,r=e.ends,n=e.axes;return J({starts:t,ends:r,axes:n})}});var Ag,Eg,oc,ic,ac=L(()=>{"use strict";ne();ae();Te();mt();ue();Ag=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Eg=(e,t)=>{let r=e.inputs[0],n=r.dims,o=E.size(n),a=n.length,s=E.normalizeAxis(t.axis,a),u=s<n.length-1,d,c=[];u?(c=Array.from({length:a},(D,B)=>B),c[s]=a-1,c[a-1]=s,d=e.compute(Be(r,c),{inputs:[r],outputs:[-1]})[0]):d=r;let m=d.dims,f=m[a-1],g=o/f,_=ye(f),y=f/_,w=64;g===1&&(w=256);let x=(D,B)=>B===4?`max(max(${D}.x, ${D}.y), max(${D}.z, ${D}.w))`:B===2?`max(${D}.x, ${D}.y)`:B===3?`max(max(${D}.x, ${D}.y), ${D}.z)`:D,v=O("x",d.dataType,d.dims,_),$=U("result",d.dataType,d.dims,_),S=v.type.value,T=$e(d.dataType)==="f32"?`var threadMax = ${S}(-3.4028234663852886e+38f);`:`var threadMax = ${S}(-65504.0h);`,A=D=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${D.registerUniform("packedCols","i32").declareVariables(v,$)}
      ${D.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
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
          rowMaxShared = ${S}(${x("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
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
          rowSumShared = ${S}(${Ke("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${S}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,I=e.compute({name:"Softmax",shaderCache:{hint:`${_};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:d.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:y}]}),getShaderSource:A},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(Be(I,c),{inputs:[I]})},oc=(e,t)=>{Ag(e.inputs),Eg(e,t)},ic=e=>J({axis:e.axis})});var sc,kg,Pg,Og,uc,lc=L(()=>{"use strict";ne();ae();ue();sc=e=>Array.from(e.getBigInt64Array(),Number),kg=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(sc(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Pg=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Og=(e,t)=>{let r=e[0].dims,n=t??sc(e[1]),o=Pg(r,n),a=E.size(o),s=e[0].dataType,u=O("input",s,r.length),d=U("output",s,o.length),c=m=>`
      const inputShape = ${u.indices(...r)};
      ${m.registerUniform("output_size","u32").declareVariables(u,d)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...W(e[0].dims,o)]}),getShaderSource:c}},uc=e=>{kg(e.inputs),e.compute(Og(e.inputs),{inputs:[0]})}});var Dg,Bg,dc,cc=L(()=>{"use strict";ne();ae();ue();Dg=(e,t,r,n,o)=>{let a=U("output_data",o,r.length,4),s=O("a_data",t[1].dataType,t[1].dims.length,4),u=O("b_data",t[2].dataType,t[2].dims.length,4),d=O("c_data",t[0].dataType,t[0].dims.length,4),c,m=(f,g,_)=>`select(${g}, ${f}, ${_})`;if(!n)c=a.setByOffset("global_idx",m(s.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let f=(g,_,y="")=>{let w=`a_data[index_a${_}][component_a${_}]`,x=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${a.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let offset_c${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,a)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${g}[${_}] = ${y}(${m(w,x,v)});
          `};o===9?c=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},Bg=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,a=!(E.areEqual(t,r)&&E.areEqual(r,n)),s=t,u=E.size(t);if(a){let c=rt.calcShape(rt.calcShape(t,r,!1),n,!1);if(!c)throw new Error("Can't perform where op on the given tensors");s=c,u=E.size(s)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>Dg(c,e,s,a,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...W(n,t,r,s)]})}},dc=e=>{e.compute(Bg(e.inputs))}});var pc,mc=L(()=>{"use strict";Us();er();Ls();Gs();Eu();Vu();Gu();il();pl();hl();bl();Cl();Pl();Bl();Ml();Nl();Wl();Fl();Kl();Yl();ed();ld();pd();fd();gd();_d();Do();vd();Ud();Ld();Gd();qd();Xn();Yd();Mo();Jd();rc();ac();zo();lc();mt();nr();cc();pc=new Map([["Abs",[Hs]],["Acos",[Fs]],["Acosh",[qs]],["Add",[ku]],["ArgMax",[Rs,_o]],["ArgMin",[Ms,_o]],["Asin",[js]],["Asinh",[Ks]],["Atan",[Zs]],["Atanh",[Qs]],["Attention",[Ns]],["AveragePool",[Ed,Ad]],["BatchNormalization",[Vs]],["BiasAdd",[Ws]],["BiasSplitGelu",[Au]],["Cast",[Xs,Ys]],["Ceil",[eu]],["Clip",[Js]],["Concat",[Lu,Wu]],["Conv",[Ao,Io]],["ConvTranspose",[cl,ll]],["Cos",[tu]],["Cosh",[nu]],["CumSum",[ml,fl]],["DepthToSpace",[gl,yl]],["DequantizeLinear",[Nd,Vd]],["DFT",[Sl,Tl]],["Div",[Pu]],["Einsum",[El,kl]],["Elu",[ru,un]],["Equal",[Ou]],["Erf",[ou]],["Exp",[iu]],["Expand",[Dl]],["FastGelu",[zl]],["Floor",[au]],["FusedConv",[Ao,Io]],["Gather",[Ul,Rl]],["GatherElements",[jl,ql]],["GatherBlockQuantized",[Gl,Hl]],["GatherND",[Vl,Ll]],["Gelu",[su]],["Gemm",[Ql,Zl]],["GlobalAveragePool",[Od,Pd]],["GlobalMaxPool",[Rd,Md]],["Greater",[Mu]],["GreaterOrEqual",[Uu]],["GridSample",[Xl,Jl]],["GroupQueryAttention",[ud]],["HardSigmoid",[hu,fu]],["HardSwish",[gu]],["InstanceNormalization",[cd]],["LayerNormalization",[md]],["LeakyRelu",[uu,un]],["Less",[Ru]],["LessOrEqual",[Nu]],["Log",[Tu]],["MatMul",[hd]],["MatMulNBits",[yd,bd]],["MaxPool",[Bd,zd]],["Mul",[Du]],["MultiHeadAttention",[rd,nd]],["Neg",[du]],["Not",[lu]],["Pad",[wd]],["Pow",[Bu]],["QuickGelu",[Cu,un]],["Range",[Wd]],["Reciprocal",[cu]],["ReduceMin",[ks]],["ReduceMean",[Ts]],["ReduceMax",[Es]],["ReduceSum",[Os]],["ReduceProd",[Ps]],["ReduceL1",[Cs]],["ReduceL2",[Is]],["ReduceLogSum",[Bs]],["ReduceLogSumExp",[As]],["ReduceSumSquare",[Ds]],["Relu",[pu]],["Resize",[Zd,Qd]],["RotaryEmbedding",[ad]],["ScatterND",[Fd,Hd]],["Sigmoid",[mu]],["Sin",[yu]],["Sinh",[bu]],["Slice",[tc,nc]],["SkipLayerNormalization",[Xd]],["Split",[od,id]],["Sqrt",[_u]],["Softmax",[oc,ic]],["Sub",[zu]],["Tan",[wu]],["Tanh",[$u]],["ThresholdedRelu",[Su,un]],["Tile",[uc]],["Transpose",[ps,ms]],["Where",[dc]]])});var fr,fc=L(()=>{"use strict";Le();nt();ue();fr=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,a){Ve(t.programInfo.name);let s=this.backend.device,u=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let m of r)d.push({binding:d.length,resource:{buffer:m.buffer}});for(let m of n)d.push({binding:d.length,resource:{buffer:m.buffer}});a&&d.push({binding:d.length,resource:a});let c=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}u.setPipeline(t.computePipeline),u.setBindGroup(0,c),u.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Re(t.programInfo.name)}dispose(){}build(t,r){Ve(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(f=>{n.features.has(f.feature)&&o.push(`enable ${f.extension};`)});let s=ds(r,this.backend.device.limits),u=t.getShaderSource(s),d=`${o.join(`
`)}
${s.additionalImplementations}
${u}`,c=n.createShaderModule({code:d,label:t.name});de("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let m=n.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:t.name});return Re(t.name),{programInfo:t,computePipeline:m,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=a&&n<=a&&o<=a)return[r,n,o];let s=r*n*o,u=Math.ceil(Math.sqrt(s));if(u>a){if(u=Math.ceil(Math.cbrt(s)),u>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[u,u,u]}else return[u,u,1]}}});var hc={};Ht(hc,{WebGpuBackend:()=>Uo});var zg,Mg,Ro,Uo,gc=L(()=>{"use strict";Le();ne();nt();so();us();mc();fc();zg=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let a=e[n].dims.length;r.push(`${o};${a}`);break}case"dims":{let a=e[n].dims.join(",");r.push(`${o};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Mg=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${zg(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Ro=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Uo=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},a=d=>r.features.has(d)&&n.push(d)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await r.requestDevice(o);let s=r,u=r.info??(typeof s.requestAdapterInfo=="function"?await s.requestAdapterInfo():void 0);this.adapterInfo=new Ro(u),this.gpuDataManager=ss(this),this.programManager=new fr(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Wn(t.logLevel,!!t.debug),this.device.onuncapturederror=d=>{d.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${d.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ve(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let a=n[o],s=a.kernelId,u=this.kernels.get(s),d=u.kernelType,c=u.kernelName,m=a.programName,f=a.inputTensorViews,g=a.outputTensorViews,_=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let w=Number(_-this.queryTimeBase),x=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(w)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(v=>({dims:v.dims,dataType:tt(v.dataType)})),outputsMetadata:g.map(v=>({dims:v.dims,dataType:tt(v.dataType)})),kernelId:s,kernelType:d,kernelName:c,programName:m,startTime:w,endTime:x});else{let v="";f.forEach((S,T)=>{v+=`input[${T}]: [${S.dims}] | ${tt(S.dataType)}, `});let $="";g.forEach((S,T)=>{$+=`output[${T}]: [${S.dims}] | ${tt(S.dataType)}, `}),console.log(`[profiling] kernel "${s}|${d}|${c}|${m}" ${v}${$}start time: ${w} ns, execution time: ${x-w} ns`)}Cn("GPU",`${m}::${_}::${y}`)}t.unmap(),this.pendingQueries.delete(t)}),Re()}run(t,r,n,o,a,s){Ve(t.name);let u=[];for(let S=0;S<r.length;++S){let T=r[S].data;if(T===0)continue;let A=this.gpuDataManager.get(T);if(!A)throw new Error(`no GPU data for input: ${T}`);u.push(A)}let{outputs:d,dispatchGroup:c,programUniforms:m}=t.getRunData(r),f=n.length===0?d.map((S,T)=>T):n;if(f.length!==d.length)throw new Error(`Output size ${f.length} must be equal to ${d.length}.`);let g=[],_=[];for(let S=0;S<d.length;++S){if(!Number.isInteger(f[S])||f[S]<-3||f[S]>=s)throw new Error(`Invalid output index: ${f[S]}`);if(f[S]===-3)continue;let T=f[S]===-1,A=f[S]===-2,I=T||A?a(d[S].dataType,d[S].dims):o(f[S],d[S].dataType,d[S].dims);if(g.push(I),I.data===0)continue;let D=this.gpuDataManager.get(I.data);if(!D)throw new Error(`no GPU data for output: ${I.data}`);if(T&&this.temporaryData.push(D),A){let B=this.kernelPersistentData.get(this.currentKernelId);B||(B=[],this.kernelPersistentData.set(this.currentKernelId,B)),B.push(D)}_.push(D)}if(u.length!==r.length||_.length!==g.length){if(_.length===0)return Re(t.name),g;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(m){let S=0,T=[];m.forEach(B=>{let V=typeof B.data=="number"?[B.data]:B.data;if(V.length===0)return;let H=B.type===10?2:4,F,j;B.type===10?(j=V.length>4?16:V.length>2?8:V.length*H,F=V.length>4?16:H*V.length):(j=V.length<=2?V.length*H:16,F=16),S=Math.ceil(S/j)*j,T.push(S);let ee=B.type===10?8:4;S+=V.length>4?Math.ceil(V.length/ee)*F:V.length*H});let A=16;S=Math.ceil(S/A)*A;let I=new ArrayBuffer(S);m.forEach((B,V)=>{let H=T[V],F=typeof B.data=="number"?[B.data]:B.data;if(B.type===6)new Int32Array(I,H,F.length).set(F);else if(B.type===12)new Uint32Array(I,H,F.length).set(F);else if(B.type===10)new Uint16Array(I,H,F.length).set(F);else if(B.type===1)new Float32Array(I,H,F.length).set(F);else throw new Error(`Unsupported uniform type: ${tt(B.type)}`)});let D=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(D.buffer,0,I,0,S),this.gpuDataManager.release(D.id),y={offset:0,size:S,buffer:D.buffer}}let w=this.programManager.normalizeDispatchGroupSize(c),x=w[1]===1&&w[2]===1,v=Mg(t,r,x),$=this.programManager.getArtifact(v);if($||($=this.programManager.build(t,w),this.programManager.setArtifact(v,$),de("info",()=>`[artifact] key: ${v}, programName: ${t.name}`)),m&&$.uniformVariablesInfo){if(m.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${m.length} in program "${$.programInfo.name}".`);for(let S=0;S<m.length;S++){let T=m[S],A=T.type,I=typeof T.data=="number"?1:T.data.length,[D,B]=$.uniformVariablesInfo[S];if(A!==D||I!==B)throw new Error(`Uniform variable ${S} mismatch: expect type ${D} with size ${B}, got type ${A} with size ${I} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${t.name}" (key=${v}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:r,outputTensorViews:g};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run($,u,_,w,y),Re(t.name),g}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let a=pc.get(t);if(!a)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:a[0],attributes:[a[1],n]};this.kernels.set(r,s)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let a=o.kernelType,s=o.kernelName,u=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),u(r,d[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${m}`)),1}finally{c&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${a}] ${s}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let a=this.sessionExternalDataMapping.get(t);a||(a=new Map,this.sessionExternalDataMapping.set(t,a));let s=a.get(r),u=this.gpuDataManager.registerExternalBuffer(n,o,s);return a.set(r,[u,n]),u}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await mo(this,t,r);return Hn(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let a=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var yc={};Ht(yc,{init:()=>Rg});var pn,No,Rg,bc=L(()=>{"use strict";ne();nt();ae();rs();pn=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=E.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(E.size(t)!==E.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},No=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo;let o=t.PTR_SIZE,a=n/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*a++,s));let u=Number(t.getValue(o*a++,s));this.outputCount=Number(t.getValue(o*a++,s)),this.customDataOffset=Number(t.getValue(o*a++,"*")),this.customDataSize=Number(t.getValue(o*a++,s));let d=[];for(let c=0;c<u;c++){let m=Number(t.getValue(o*a++,s)),f=Number(t.getValue(o*a++,"*")),g=Number(t.getValue(o*a++,s)),_=[];for(let y=0;y<g;y++)_.push(Number(t.getValue(o*a++,s)));d.push(new pn(t,m,f,_))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(u=>typeof u=="number"?this.inputs[u]:u)??this.inputs,o=r?.outputs??[],a=(u,d,c)=>new pn(this.module,d,this.output(u,c),c),s=(u,d)=>{let c=Tt(u,d);if(!c)throw new Error(`Unsupported data type: ${u}`);let m=c>0?this.backend.gpuDataManager.create(c).id:0;return new pn(this.module,u,m,d)};return this.backend.run(t,n,o,a,s,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,a=o===4?"i32":"i64",s=this.module.stackAlloc((1+r.length)*o);this.module.setValue(s,r.length,a);for(let u=0;u<r.length;u++)this.module.setValue(s+o*(u+1),r[u],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},Rg=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(gc(),tn(hc)).WebGpuBackend,s=new a;await s.initialize(r,n),o("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,d,c,m=!1)=>{if(m)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(c)}`),s.memcpy(Number(u),Number(d));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(c)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(c));s.upload(Number(d),f)}},async(u,d,c)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${c}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+c)>>>0))},(u,d,c)=>s.createKernel(u,Number(d),c,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),u=>s.releaseKernel(u),(u,d,c,m)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${c}, kernel=${u}, contextDataOffset=${d}`);let f=new No(t,s,Number(d));return s.computeKernel(Number(u),f,m)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Kn(r);o("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,d,c,m)=>a.ensureTensor(s,u,d,c,m),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!r.trace])}}});var Ug,Pn,On,Vt,Ng,_c,rn,Dn,Bn,wc,zn,Mn,Rn,Jr=L(()=>{"use strict";Le();Ha();qa();ne();xt();Nn();io();Ug=(e,t)=>{we()._OrtInit(e,t)!==0&&ge("Can't initialize onnxruntime.")},Pn=async e=>{Ug(e.wasm.numThreads,an(e.logLevel))},On=async(e,t)=>{we().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let o=e.webgpu.forceFallbackAdapter;if(o!==void 0&&typeof o!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${o}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:o}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let n=(bc(),tn(yc)).init;t==="webgpu"&&await n("webgpu",we(),e,r),t==="webnn"&&await n("webnn",we(),e)}},Vt=new Map,Ng=e=>{let t=we(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&ge("Can't get session input/output count.");let s=n===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+n,s))]}finally{t.stackRestore(r)}},_c=(e,t)=>{let r=we(),n=r.stackSave(),o=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&ge("Can't get session input/output metadata.");let d=Number(r.getValue(s,"*"));o=Number(r.getValue(s+a,"*"));let c=r.HEAP32[o/4];if(c===0)return[d,0];let m=r.HEAPU32[o/4+1],f=[];for(let g=0;g<m;g++){let _=Number(r.getValue(o+8+g*a,"*"));f.push(_!==0?r.UTF8ToString(_):Number(r.getValue(o+8+(g+m)*a,"*")))}return[d,c,f]}finally{r.stackRestore(n),o!==0&&r._OrtFree(o)}},rn=e=>{let t=we(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Dn=async(e,t)=>{let r,n,o=we();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=rn(e);let a=0,s=0,u=0,d=[],c=[],m=[];try{if([s,d]=await Fa(t),t?.externalData&&o.mountExternalData){let T=[];for(let A of t.externalData){let I=typeof A=="string"?A:A.path,D=typeof A=="string"?A:A.data;T.push(sn(D).then(B=>{o.mountExternalData(I,B)}))}await Promise.all(T)}for(let T of t?.executionProviders??[])if((typeof T=="string"?T:T.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof T!="string"){let I=T,D=I?.context,B=I?.gpuDevice,V=I?.deviceType,H=I?.powerPreference;D?o.currentContext=D:B?o.currentContext=await o.webnnCreateMLContext(B):o.currentContext=await o.webnnCreateMLContext({deviceType:V,powerPreference:H})}else o.currentContext=await o.webnnCreateMLContext();break}a=await o._OrtCreateSession(r,n,s),o.webgpuOnCreateSession?.(a),a===0&&ge("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.webnnRegisterMLContext(a,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[f,g]=Ng(a),_=!!t?.enableGraphCapture,y=[],w=[],x=[],v=[],$=[];for(let T=0;T<f;T++){let[A,I,D]=_c(a,T);A===0&&ge("Can't get an input name."),c.push(A);let B=o.UTF8ToString(A);y.push(B),x.push(I===0?{name:B,isTensor:!1}:{name:B,isTensor:!0,type:tt(I),shape:D})}for(let T=0;T<g;T++){let[A,I,D]=_c(a,T+f);A===0&&ge("Can't get an output name."),m.push(A);let B=o.UTF8ToString(A);w.push(B),v.push(I===0?{name:B,isTensor:!1}:{name:B,isTensor:!0,type:tt(I),shape:D});{if(_&&t?.preferredOutputLocation===void 0){$.push("gpu-buffer");continue}let V=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[B]??"cpu",H=o.webnnIsGraphOutput;if(V==="cpu"&&H&&H(a,B)){$.push("ml-tensor-cpu-output");continue}if(V!=="cpu"&&V!=="cpu-pinned"&&V!=="gpu-buffer"&&V!=="ml-tensor")throw new Error(`Not supported preferred output location: ${V}.`);if(_&&V!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${V}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);$.push(V)}}let S=null;return $.some(T=>T==="gpu-buffer"||T==="ml-tensor"||T==="ml-tensor-cpu-output")&&(u=o._OrtCreateBinding(a),u===0&&ge("Can't create IO binding."),S={handle:u,outputPreferredLocations:$,outputPreferredLocationsEncoded:$.map(T=>T==="ml-tensor-cpu-output"?"ml-tensor":T).map(T=>oo(T))}),Vt.set(a,[a,c,m,S,_,!1]),[a,y,w,x,v]}catch(f){throw c.forEach(g=>o._OrtFree(g)),m.forEach(g=>o._OrtFree(g)),u!==0&&o._OrtReleaseBinding(u)!==0&&ge("Can't release IO binding."),a!==0&&o._OrtReleaseSession(a)!==0&&ge("Can't release session."),f}finally{o._free(r),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&ge("Can't release session options."),d.forEach(f=>o._free(f)),o.unmountExternalData?.()}},Bn=e=>{let t=we(),r=Vt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,a,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&ge("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ge("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),a.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&ge("Can't release session."),Vt.delete(e)},wc=async(e,t,r,n,o,a,s=!1)=>{if(!e){t.push(0);return}let u=we(),d=u.PTR_SIZE,c=e[0],m=e[1],f=e[3],g=f,_,y;if(c==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=e[2].gpuBuffer;y=Tt(St(c),m);{let $=u.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=$(n,a,v,y)}}else if(f==="ml-tensor"){let v=e[2].mlTensor;y=Tt(St(c),m);let $=u.webnnRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=$(n,v,St(c),m)}else{let v=e[2];if(Array.isArray(v)){y=d*v.length,_=u._malloc(y),r.push(_);for(let $=0;$<v.length;$++){if(typeof v[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);u.setValue(_+$*d,Ge(v[$],r),"*")}}else{let $=u.webnnIsGraphInput,S=u.webnnIsGraphOutput;if(c!=="string"&&$&&S){let T=u.UTF8ToString(o);if($(n,T)||S(n,T)){let A=St(c);y=Tt(A,m),g="ml-tensor";let I=u.webnnCreateTemporaryTensor,D=u.webnnUploadTensor;if(!I||!D)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let B=await I(n,A,m);D(B,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),_=B}else y=v.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),_)}else y=v.byteLength,_=u._malloc(y),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,y),_)}}let w=u.stackSave(),x=u.stackAlloc(4*m.length);try{m.forEach(($,S)=>u.setValue(x+S*d,$,d===4?"i32":"i64"));let v=u._OrtCreateTensor(St(c),_,y,x,m.length,oo(g));v===0&&ge(`Can't create tensor for input/output. session=${n}, index=${a}.`),t.push(v)}finally{u.stackRestore(w)}},zn=async(e,t,r,n,o,a)=>{let s=we(),u=s.PTR_SIZE,d=Vt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=d[0],m=d[1],f=d[2],g=d[3],_=d[4],y=d[5],w=t.length,x=n.length,v=0,$=[],S=[],T=[],A=[],I=[],D=s.stackSave(),B=s.stackAlloc(w*u),V=s.stackAlloc(w*u),H=s.stackAlloc(x*u),F=s.stackAlloc(x*u);try{[v,$]=Ga(a),vt("wasm prepareInputOutputTensor");for(let Q=0;Q<w;Q++)await wc(r[Q],S,A,e,m[t[Q]],t[Q],_);for(let Q=0;Q<x;Q++)await wc(o[Q],T,A,e,f[n[Q]],w+n[Q],_);$t("wasm prepareInputOutputTensor");for(let Q=0;Q<w;Q++)s.setValue(B+Q*u,S[Q],"*"),s.setValue(V+Q*u,m[t[Q]],"*");for(let Q=0;Q<x;Q++)s.setValue(H+Q*u,T[Q],"*"),s.setValue(F+Q*u,f[n[Q]],"*");if(g&&!y){let{handle:Q,outputPreferredLocations:Y,outputPreferredLocationsEncoded:te}=g;if(m.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${m.length}).`);vt("wasm bindInputsOutputs");for(let K=0;K<w;K++){let oe=t[K];await s._OrtBindInput(Q,m[oe],S[K])!==0&&ge(`Can't bind input[${K}] for session=${e}.`)}for(let K=0;K<x;K++){let oe=n[K];o[K]?.[3]?(I.push(T[K]),s._OrtBindOutput(Q,f[oe],T[K],0)!==0&&ge(`Can't bind pre-allocated output[${K}] for session=${e}.`)):s._OrtBindOutput(Q,f[oe],0,te[oe])!==0&&ge(`Can't bind output[${K}] to ${Y[K]} for session=${e}.`)}$t("wasm bindInputsOutputs"),Vt.set(e,[c,m,f,g,_,!0])}s.jsepOnRunStart?.(c),s.webnnOnRunStart?.(c);let j;g?j=await s._OrtRunWithBinding(c,g.handle,x,H,v):j=await s._OrtRun(c,V,B,w,F,x,H,v),j!==0&&ge("failed to call OrtRun().");let ee=[],ie=[];vt("wasm ProcessOutputTensor");for(let Q=0;Q<x;Q++){let Y=Number(s.getValue(H+Q*u,"*"));if(Y===T[Q]||I.includes(T[Q])){ee.push(o[Q]),Y!==T[Q]&&s._OrtReleaseTensor(Y)!==0&&ge("Can't release tensor.");continue}let te=s.stackSave(),K=s.stackAlloc(4*u),oe=!1,ce,le=0;try{s._OrtGetTensorData(Y,K,K+u,K+2*u,K+3*u)!==0&&ge(`Can't access output tensor data on index ${Q}.`);let fe=u===4?"i32":"i64",R=Number(s.getValue(K,fe));le=s.getValue(K+u,"*");let k=s.getValue(K+u*2,"*"),X=Number(s.getValue(K+u*3,fe)),Ae=[];for(let me=0;me<X;me++)Ae.push(Number(s.getValue(k+me*u,fe)));s._OrtFree(k)!==0&&ge("Can't free memory for tensor dims.");let he=Ae.reduce((me,Ce)=>me*Ce,1);ce=tt(R);let ke=g?.outputPreferredLocations[n[Q]];if(ce==="string"){if(ke==="gpu-buffer"||ke==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let me=[];for(let Ce=0;Ce<he;Ce++){let He=s.getValue(le+Ce*u,"*"),Xe=s.getValue(le+(Ce+1)*u,"*"),ht=Ce===he-1?void 0:Xe-He;me.push(s.UTF8ToString(He,ht))}ee.push([ce,Ae,me,"cpu"])}else if(ke==="gpu-buffer"&&he>0){let me=s.jsepGetBuffer;if(!me)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ce=me(le),He=Tt(R,he);if(He===void 0||!Vn(ce))throw new Error(`Unsupported data type: ${ce}`);oe=!0,ee.push([ce,Ae,{gpuBuffer:Ce,download:s.jsepCreateDownloader(Ce,He,ce),dispose:()=>{s._OrtReleaseTensor(Y)!==0&&ge("Can't release tensor.")}},"gpu-buffer"])}else if(ke==="ml-tensor"&&he>0){let me=s.webnnEnsureTensor,Ce=s.webnnIsGraphInputOutputTypeSupported;if(!me||!Ce)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Tt(R,he)===void 0||!Ln(ce))throw new Error(`Unsupported data type: ${ce}`);if(!Ce(e,ce,!1))throw new Error(`preferredLocation "ml-tensor" for ${ce} output is not supported by current WebNN Context.`);let Xe=await me(e,le,R,Ae,!1);oe=!0,ee.push([ce,Ae,{mlTensor:Xe,download:s.webnnCreateMLTensorDownloader(le,ce),dispose:()=>{s.webnnReleaseTensorId(le),s._OrtReleaseTensor(Y)}},"ml-tensor"])}else if(ke==="ml-tensor-cpu-output"&&he>0){let me=s.webnnCreateMLTensorDownloader(le,ce)(),Ce=ee.length;oe=!0,ie.push((async()=>{let He=[Ce,await me];return s.webnnReleaseTensorId(le),s._OrtReleaseTensor(Y),He})()),ee.push([ce,Ae,[],"cpu"])}else{let me=qt(ce),Ce=new me(he);new Uint8Array(Ce.buffer,Ce.byteOffset,Ce.byteLength).set(s.HEAPU8.subarray(le,le+Ce.byteLength)),ee.push([ce,Ae,Ce,"cpu"])}}finally{s.stackRestore(te),ce==="string"&&le&&s._free(le),oe||s._OrtReleaseTensor(Y)}}g&&!_&&(s._OrtClearBoundOutputs(g.handle)!==0&&ge("Can't clear bound outputs."),Vt.set(e,[c,m,f,g,_,!1]));for(let[Q,Y]of await Promise.all(ie))ee[Q][2]=Y;return $t("wasm ProcessOutputTensor"),ee}finally{s.webnnOnRunEnd?.(c),s.stackRestore(D),S.forEach(j=>s._OrtReleaseTensor(j)),T.forEach(j=>s._OrtReleaseTensor(j)),A.forEach(j=>s._free(j)),v!==0&&s._OrtReleaseRunOptions(v),$.forEach(j=>s._free(j))}},Mn=e=>{let t=we(),r=Vt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&ge("Can't get an profile file name."),t._OrtFree(o)},Rn=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Lt,qe,mn,gr,yr,hr,Vo,Lo,Qt,Yt,Lg,vc,$c,xc,Sc,Tc,Cc,Ic,Wo=L(()=>{"use strict";Le();Jr();xt();En();Lt=()=>!!ve.wasm.proxy&&typeof document<"u",mn=!1,gr=!1,yr=!1,Lo=new Map,Qt=(e,t)=>{let r=Lo.get(e);r?r.push(t):Lo.set(e,[t])},Yt=()=>{if(mn||!gr||yr||!qe)throw new Error("worker not ready")},Lg=e=>{switch(e.data.type){case"init-wasm":mn=!1,e.data.err?(yr=!0,Vo[1](e.data.err)):(gr=!0,Vo[0]()),hr&&(URL.revokeObjectURL(hr),hr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Lo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},vc=async()=>{if(!gr){if(mn)throw new Error("multiple calls to 'initWasm()' detected.");if(yr)throw new Error("previous call to 'initWasm()' failed.");if(mn=!0,Lt())return new Promise((e,t)=>{qe?.terminate(),Va().then(([r,n])=>{try{qe=n,qe.onerror=a=>t(a),qe.onmessage=Lg,Vo=[e,t];let o={type:"init-wasm",in:ve};!o.in.wasm.wasmPaths&&(r||to)&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),qe.postMessage(o),hr=r}catch(o){t(o)}},t)});try{await kn(ve.wasm),await Pn(ve),gr=!0}catch(e){throw yr=!0,e}finally{mn=!1}}},$c=async e=>{if(Lt())return Yt(),new Promise((t,r)=>{Qt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:ve}};qe.postMessage(n)});await On(ve,e)},xc=async e=>Lt()?(Yt(),new Promise((t,r)=>{Qt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};qe.postMessage(n,[e.buffer])})):rn(e),Sc=async(e,t)=>{if(Lt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Yt(),new Promise((r,n)=>{Qt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),qe.postMessage(o,a)})}else return Dn(e,t)},Tc=async e=>{if(Lt())return Yt(),new Promise((t,r)=>{Qt("release",[t,r]);let n={type:"release",in:e};qe.postMessage(n)});Bn(e)},Cc=async(e,t,r,n,o,a)=>{if(Lt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Yt(),new Promise((s,u)=>{Qt("run",[s,u]);let d=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:a}};qe.postMessage(c,Rn(d))})}else return zn(e,t,r,n,o,a)},Ic=async e=>{if(Lt())return Yt(),new Promise((t,r)=>{Qt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};qe.postMessage(n)});Mn(e)}});var Ac,Wg,br,Ec=L(()=>{"use strict";Le();Wo();ne();An();io();Ac=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Wg=e=>{switch(e[3]){case"cpu":return new je(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Vn(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return je.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Ln(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return je.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},br=class{async fetchModelAndCopyToWasmMemory(t){return xc(await sn(t))}async loadModel(t,r){Ve();let n;typeof t=="string"?n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Sc(n,r),Re()}async dispose(){return Tc(this.sessionId)}async run(t,r,n){Ve();let o=[],a=[];Object.entries(t).forEach(g=>{let _=g[0],y=g[1],w=this.inputNames.indexOf(_);if(w===-1)throw new Error(`invalid input '${_}'`);o.push(y),a.push(w)});let s=[],u=[];Object.entries(r).forEach(g=>{let _=g[0],y=g[1],w=this.outputNames.indexOf(_);if(w===-1)throw new Error(`invalid output '${_}'`);s.push(y),u.push(w)});let d=o.map((g,_)=>Ac(g,()=>`input "${this.inputNames[a[_]]}"`)),c=s.map((g,_)=>g?Ac(g,()=>`output "${this.outputNames[u[_]]}"`):null),m=await Cc(this.sessionId,a,d,u,c,n),f={};for(let g=0;g<m.length;g++)f[this.outputNames[u[g]]]=s[g]??Wg(m[g]);return Re(),f}startProfiling(){}endProfiling(){Ic(this.sessionId)}}});var Pc={};Ht(Pc,{OnnxruntimeWebAssemblyBackend:()=>_r,initializeFlags:()=>kc,wasmBackend:()=>Gg});var kc,_r,Gg,Oc=L(()=>{"use strict";Le();Wo();Ec();kc=()=>{(typeof ve.wasm.initTimeout!="number"||ve.wasm.initTimeout<0)&&(ve.wasm.initTimeout=0);let e=ve.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ve.wasm.simd=!1),typeof ve.wasm.proxy!="boolean"&&(ve.wasm.proxy=!1),typeof ve.wasm.trace!="boolean"&&(ve.wasm.trace=!1),typeof ve.wasm.numThreads!="number"||!Number.isInteger(ve.wasm.numThreads)||ve.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ve.wasm.numThreads=1;else{let t=typeof navigator>"u"?qr("node:os").cpus().length:navigator.hardwareConcurrency;ve.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},_r=class{async init(t){kc(),await vc(),await $c(t)}async createInferenceSessionHandler(t,r){let n=new br;return await n.loadModel(t,r),n}},Gg=new _r});Le();Le();Le();var Ia="1.30.0";var sS=Xr;{let e=(Oc(),tn(Pc)).wasmBackend;Dt("webgpu",e,5),Dt("webnn",e,5),Dt("cpu",e,10),Dt("wasm",e,10)}Object.defineProperty(ve.versions,"web",{value:Ia,enumerable:!0});export{am as InferenceSession,Cn as TRACE,vt as TRACE_EVENT_BEGIN,$t as TRACE_EVENT_END,Ve as TRACE_FUNC_BEGIN,Re as TRACE_FUNC_END,je as Tensor,sS as default,ve as env,Dt as registerBackend};
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
//# sourceMappingURL=ort.bundle.min.mjs.map
