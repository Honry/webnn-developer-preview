/*!
 * ONNX Runtime Web v1.22.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Qy=Object.create;var Zn=Object.defineProperty;var Yy=Object.getOwnPropertyDescriptor;var ex=Object.getOwnPropertyNames;var tx=Object.getPrototypeOf,rx=Object.prototype.hasOwnProperty;var Ui=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var v=(n,e)=>()=>(n&&(e=n(n=0)),e);var Le=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),Yr=(n,e)=>{for(var r in e)Zn(n,r,{get:e[r],enumerable:!0})},Tu=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of ex(e))!rx.call(n,o)&&o!==r&&Zn(n,o,{get:()=>e[o],enumerable:!(t=Yy(e,o))||t.enumerable});return n};var Er=(n,e,r)=>(r=n!=null?Qy(tx(n)):{},Tu(e||!n||!n.__esModule?Zn(r,"default",{value:n,enumerable:!0}):r,n)),Jn=n=>Tu(Zn({},"__esModule",{value:!0}),n);var Qn,or,Wt,nx,wu,Gi=v(()=>{"use strict";Qn=new Map,or=[],Wt=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=Qn.get(n);if(t===void 0)Qn.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=or.indexOf(n);o!==-1&&or.splice(o,1);for(let i=0;i<or.length;i++)if(Qn.get(or[i]).priority<=r){or.splice(i,0,n);return}or.push(n)}return}throw new TypeError("not a valid backend")},nx=async n=>{let e=Qn.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},wu=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?or:r,o,i=[],s=new Set;for(let u of t){let l=await nx(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=e.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var vu=v(()=>{"use strict";Gi()});var Iu,Su=v(()=>{"use strict";Iu="1.22.0"});var $u,rt,Wi=v(()=>{"use strict";Su();$u="warning",rt={wasm:{},webgl:{},webgpu:{},versions:{common:Iu},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);$u=n}},get logLevel(){return $u}};Object.defineProperty(rt,"logLevel",{enumerable:!0})});var ee,Au=v(()=>{"use strict";Wi();ee=rt});var Ou,Pu,Eu=v(()=>{"use strict";Ou=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let s=e?.format!==void 0?e.format:"RGB",a=e?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let c=i*o,f=0,d=c,p=c*2,m=-1;s==="RGBA"?(f=0,d=c,p=c*2,m=c*3):s==="RGB"?(f=0,d=c,p=c*2):s==="RBG"&&(f=0,p=c,d=c*2);for(let h=0;h<i;h++)for(let y=0;y<o;y++){let b=(n.data[f++]-l[0])*u[0],g=(n.data[d++]-l[1])*u[1],x=(n.data[p++]-l[2])*u[2],T=m===-1?255:(n.data[m++]-l[3])*u[3];t.fillStyle="rgba("+b+","+g+","+x+","+T+")",t.fillRect(y,h,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Pu=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],s=n.dims[3]):(o=n.dims[3],i=n.dims[2],s=n.dims[1]);let a=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let f=i*o;if(e!==void 0&&(e.format!==void 0&&s===4&&e.format!=="RGBA"||s===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let d=4,p=0,m=1,h=2,y=3,b=0,g=f,x=f*2,T=-1;a==="RGBA"?(b=0,g=f,x=f*2,T=f*3):a==="RGB"?(b=0,g=f,x=f*2):a==="RBG"&&(b=0,x=f,g=f*2),t=r.createImageData(o,i);for(let I=0;I<i*o;p+=d,m+=d,h+=d,y+=d,I++)t.data[p]=(n.data[b++]-c[0])*l[0],t.data[m]=(n.data[g++]-c[1])*l[1],t.data[h]=(n.data[x++]-c[2])*l[2],t.data[y]=T===-1?255:(n.data[T++]-c[3])*l[3]}else throw new Error("Can not access image data");return t}});var Hi,Cu,Du,ku,Bu,zu,Lu=v(()=>{"use strict";Yn();Hi=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=r*t,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),f=4,d=0,p=1,m=2,h=3,y=0,b=l,g=l*2,x=-1;a==="RGB"&&(f=3,d=0,p=1,m=2,h=-1),u==="RGBA"?x=l*3:u==="RBG"?(y=0,g=l,b=l*2):u==="BGR"&&(g=0,b=l,y=l*2);for(let I=0;I<l;I++,d+=f,m+=f,p+=f,h+=f)c[y++]=(n[d]+s[0])/i[0],c[b++]=(n[p]+s[1])/i[1],c[g++]=(n[m]+s[2])/i[2],x!==-1&&h!==-1&&(c[x++]=(n[h]+s[3])/i[3]);return u==="RGBA"?new We("float32",c,[1,4,r,t]):new We("float32",c,[1,3,r,t])},Cu=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",s,a=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=u();c.width=n.width,c.height=n.height;let f=l(c);if(f!=null){let d=n.height,p=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(d=e.resizedHeight,p=e.resizedWidth),e!==void 0){if(a=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=d,a.width=p}else a.tensorFormat="RGBA",a.height=d,a.width=p;f.drawImage(n,0,0),s=f.getImageData(0,0,p,d).data}else throw new Error("Can not access image data")}else if(t){let c,f;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,f=e.resizedWidth):(c=n.height,f=n.width),e!==void 0&&(a=e),a.format="RGBA",a.height=c,a.width=f,e!==void 0){let d=u();d.width=f,d.height=c;let p=l(d);if(p!=null)p.putImageData(n,0,0),s=p.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else s=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=n.width,c.height=n.height;let f=l(c);if(f!=null){let d=n.height,p=n.width;return f.drawImage(n,0,0,p,d),s=f.getImageData(0,0,p,d).data,a.height=d,a.width=p,Hi(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,f)=>{let d=u(),p=l(d);if(!n||!p)return f();let m=new Image;m.crossOrigin="Anonymous",m.src=n,m.onload=()=>{d.width=m.width,d.height=m.height,p.drawImage(m,0,0,d.width,d.height);let h=p.getImageData(0,0,d.width,d.height);a.height=d.height,a.width=d.width,c(Hi(h.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Hi(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},Du=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,s=[1,t,r,4];return new We({location:"texture",type:"float32",texture:n,dims:s,download:o,dispose:i})},ku=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new We({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},Bu=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new We({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},zu=(n,e,r)=>new We({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var ir,en,Ru,Nu,Vu=v(()=>{"use strict";ir=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),en=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Ru=!1,Nu=()=>{if(!Ru){Ru=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,t=typeof r<"u"&&r.from;n&&(ir.set("int64",BigInt64Array),en.set(BigInt64Array,"int64")),e&&(ir.set("uint64",BigUint64Array),en.set(BigUint64Array,"uint64")),t?(ir.set("float16",r),en.set(r,"float16")):ir.set("float16",Uint16Array)}}});var Mu,Fu,Uu=v(()=>{"use strict";Yn();Mu=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},Fu=(n,e)=>{switch(n.location){case"cpu":return new We(n.type,n.data,e);case"cpu-pinned":return new We({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new We({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new We({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new We({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var We,Yn=v(()=>{"use strict";Eu();Lu();Vu();Uu();We=class{constructor(e,r,t){Nu();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let a=ir.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");a=r}else{let l=ir.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(r,BigInt):a=l.from(r)}else if(r instanceof l)a=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&l!==Uint16Array)a=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",a=e;else if(l==="boolean")o="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(e);else{let l=en.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,a=e}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=Mu(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(e,r){return Cu(e,r)}static fromTexture(e,r){return Du(e,r)}static fromGpuBuffer(e,r){return ku(e,r)}static fromMLTensor(e,r){return Bu(e,r)}static fromPinnedBuffer(e,r,t){return zu(e,r,t)}toDataURL(e){return Ou(this,e)}toImageData(e){return Pu(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Fu(this,e)}}});var nt,qi=v(()=>{"use strict";Yn();nt=We});var eo,Gu,ot,Je,Ki=v(()=>{"use strict";Wi();eo=(n,e)=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeStamp(`${n}::ORT::${e}`)},Gu=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),eo("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},ot=n=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Gu("BEGIN",n)},Je=n=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Gu("END",n)}});var to,Wu=v(()=>{"use strict";Gi();qi();Ki();to=class n{constructor(e){this.handler=e}async run(e,r,t){ot();let o={},i={};if(typeof e!="object"||e===null||e instanceof nt||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof nt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of r){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(c.indexOf(f)!==-1){let d=r[f];(d===null||d instanceof nt)&&(l=!0,s=!1,o[f]=d)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let a=await this.handler.run(e,o,i),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let c=a[l];c instanceof nt?u[l]=c:u[l]=new nt(c.type,c.data,c.dims)}return Je(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){ot();let i,s={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,f=0,d=e.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(d=e.byteLength-f,typeof t=="number"){if(d=t,!Number.isSafeInteger(d))throw new RangeError("'byteLength' must be an integer.");if(d<=0||f+d>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,f,d)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await wu(s),l=await a.createInferenceSessionHandler(i,u);return Je(),new n(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var ox,Hu=v(()=>{"use strict";Wu();ox=to});var qu=v(()=>{"use strict"});var Ku=v(()=>{"use strict"});var ju=v(()=>{"use strict"});var Xu=v(()=>{"use strict"});var ji={};Yr(ji,{InferenceSession:()=>ox,TRACE:()=>eo,TRACE_FUNC_BEGIN:()=>ot,TRACE_FUNC_END:()=>Je,Tensor:()=>nt,env:()=>ee,registerBackend:()=>Wt});var qe=v(()=>{"use strict";vu();Au();Hu();qi();qu();Ku();Ki();ju();Xu()});function Ht(n,e,r,t){if(e===void 0)return sx(n);if(r===void 0)ro(n,e,1);else if(typeof r=="number"&&t===void 0)ro(n,e,r);else if(typeof r=="string"&&t===void 0)ro(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")ro(n,r,t,e);else throw new TypeError("input is valid")}function sx(n){return{verbose:Ht.verbose.bind(null,n),info:Ht.info.bind(null,n),warning:Ht.warning.bind(null,n),error:Ht.error.bind(null,n),fatal:Ht.fatal.bind(null,n)}}function ro(n,e,r,t){let o=tn[t||""]||tn[""];Ju[n]<Ju[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,ix[o.provider].log(n,e,t))}var Xi,Zi,Ju,ix,Qu,tn,ye,oo,io,so,no,st=v(()=>{"use strict";Xi=class{log(e,r,t){}},Zi=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Ju={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},ix={none:new Xi,console:new Zi},Qu={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},tn={"":Qu};(u=>{function n(l,c){u("verbose",l,c)}u.verbose=n;function e(l,c){u("info",l,c)}u.info=e;function r(l,c){u("warning",l,c)}u.warning=r;function t(l,c){u("error",l,c)}u.error=t;function o(l,c){u("fatal",l,c)}u.fatal=o;function i(l){tn={},s("",l||{})}u.reset=i;function s(l,c){if(l==="*")i(c);else{let f=tn[l]||Qu;tn[l]={provider:c.provider||f.provider,minimalSeverity:c.minimalSeverity||f.minimalSeverity,logDateTime:c.logDateTime===void 0?f.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?f.logSourceLocation:c.logSourceLocation}}}u.set=s;function a(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),s("",c)}u.setWithEnv=a})(Ht||={});ye=Ht,oo=class{constructor(e,r,t,o,i,s){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},io=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},so=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=no(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,s=!1,a=t();if(a&&typeof a.then=="function")return s=!0,new Promise((u,l)=>{a.then(async c=>{i&&await i.end(),u(c)},async c=>{i&&await i.end(),l(c)})});if(!s&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(a)},f=>{c(f)})})}return a}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=no();return this.flush(o),new oo(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new oo(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new io(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=no();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new io(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){ye.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=no()}}get started(){return this._started}},no=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Yu(n,e,r){for(let t of r){let o=t[0],i=t[1],s=t[2],a=t[3],u=t[4];if(n.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&ax(l.version,s))return{opImpl:a,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function ax(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var el=v(()=>{"use strict"});var tl=Le(Ji=>{"use strict";Ji.__esModule=!0;var ux=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();Ji.Guid=ux});function we(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function Ke(n){return(n&&n.__isLong__)===!0}function rl(n){var e=Math.clz32(n&-n);return n?31-e:e}function sr(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=ol[n],t)?t:(r=he(n,0,!0),o&&(ol[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=nl[n],t)?t:(r=he(n,n<0?-1:0,!1),o&&(nl[n]=r),r))}function ut(n,e){if(isNaN(n))return e?Vt:mt;if(e){if(n<0)return Vt;if(n>=ul)return fl}else{if(n<=-sl)return Qe;if(n+1>=sl)return cl}return n<0?ut(-n,e).neg():he(n%Dr|0,n/Dr|0,e)}function he(n,e,r){return new we(n,e,r)}function Yi(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?Vt:mt;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return Yi(n.substring(1),e,r).neg();for(var o=ut(ao(r,8)),i=mt,s=0;s<n.length;s+=8){var a=Math.min(8,n.length-s),u=parseInt(n.substring(s,s+a),r);if(a<8){var l=ut(ao(r,a));i=i.mul(l).add(ut(u))}else i=i.mul(o),i=i.add(ut(u))}return i.unsigned=e,i}function ht(n,e){return typeof n=="number"?ut(n,e):typeof n=="string"?Yi(n,e):he(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var at,nl,ol,ao,il,lx,Dr,ul,sl,al,mt,Vt,Cr,ll,Qi,cl,fl,Qe,B,qt,es=v(()=>{at=null;try{at=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}we.prototype.__isLong__;Object.defineProperty(we.prototype,"__isLong__",{value:!0});we.isLong=Ke;nl={},ol={};we.fromInt=sr;we.fromNumber=ut;we.fromBits=he;ao=Math.pow;we.fromString=Yi;we.fromValue=ht;il=65536,lx=1<<24,Dr=il*il,ul=Dr*Dr,sl=ul/2,al=sr(lx),mt=sr(0);we.ZERO=mt;Vt=sr(0,!0);we.UZERO=Vt;Cr=sr(1);we.ONE=Cr;ll=sr(1,!0);we.UONE=ll;Qi=sr(-1);we.NEG_ONE=Qi;cl=he(-1,2147483647,!1);we.MAX_VALUE=cl;fl=he(-1,-1,!0);we.MAX_UNSIGNED_VALUE=fl;Qe=he(0,-2147483648,!1);we.MIN_VALUE=Qe;B=we.prototype;B.toInt=function(){return this.unsigned?this.low>>>0:this.low};B.toNumber=function(){return this.unsigned?(this.high>>>0)*Dr+(this.low>>>0):this.high*Dr+(this.low>>>0)};B.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(Qe)){var r=ut(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=ut(ao(e,6),this.unsigned),s=this,a="";;){var u=s.div(i),l=s.sub(u.mul(i)).toInt()>>>0,c=l.toString(e);if(s=u,s.isZero())return c+a;for(;c.length<6;)c="0"+c;a=""+c+a}};B.getHighBits=function(){return this.high};B.getHighBitsUnsigned=function(){return this.high>>>0};B.getLowBits=function(){return this.low};B.getLowBitsUnsigned=function(){return this.low>>>0};B.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Qe)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&(e&1<<r)==0;r--);return this.high!=0?r+33:r+1};B.isZero=function(){return this.high===0&&this.low===0};B.eqz=B.isZero;B.isNegative=function(){return!this.unsigned&&this.high<0};B.isPositive=function(){return this.unsigned||this.high>=0};B.isOdd=function(){return(this.low&1)===1};B.isEven=function(){return(this.low&1)===0};B.equals=function(e){return Ke(e)||(e=ht(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};B.eq=B.equals;B.notEquals=function(e){return!this.eq(e)};B.neq=B.notEquals;B.ne=B.notEquals;B.lessThan=function(e){return this.comp(e)<0};B.lt=B.lessThan;B.lessThanOrEqual=function(e){return this.comp(e)<=0};B.lte=B.lessThanOrEqual;B.le=B.lessThanOrEqual;B.greaterThan=function(e){return this.comp(e)>0};B.gt=B.greaterThan;B.greaterThanOrEqual=function(e){return this.comp(e)>=0};B.gte=B.greaterThanOrEqual;B.ge=B.greaterThanOrEqual;B.compare=function(e){if(Ke(e)||(e=ht(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};B.comp=B.compare;B.negate=function(){return!this.unsigned&&this.eq(Qe)?Qe:this.not().add(Cr)};B.neg=B.negate;B.add=function(e){Ke(e)||(e=ht(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,s=e.high>>>16,a=e.high&65535,u=e.low>>>16,l=e.low&65535,c=0,f=0,d=0,p=0;return p+=i+l,d+=p>>>16,p&=65535,d+=o+u,f+=d>>>16,d&=65535,f+=t+a,c+=f>>>16,f&=65535,c+=r+s,c&=65535,he(d<<16|p,c<<16|f,this.unsigned)};B.subtract=function(e){return Ke(e)||(e=ht(e)),this.add(e.neg())};B.sub=B.subtract;B.multiply=function(e){if(this.isZero())return this;if(Ke(e)||(e=ht(e)),at){var r=at.mul(this.low,this.high,e.low,e.high);return he(r,at.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?Vt:mt;if(this.eq(Qe))return e.isOdd()?Qe:mt;if(e.eq(Qe))return this.isOdd()?Qe:mt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(al)&&e.lt(al))return ut(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,s=this.low&65535,a=e.high>>>16,u=e.high&65535,l=e.low>>>16,c=e.low&65535,f=0,d=0,p=0,m=0;return m+=s*c,p+=m>>>16,m&=65535,p+=i*c,d+=p>>>16,p&=65535,p+=s*l,d+=p>>>16,p&=65535,d+=o*c,f+=d>>>16,d&=65535,d+=i*l,f+=d>>>16,d&=65535,d+=s*u,f+=d>>>16,d&=65535,f+=t*c+o*l+i*u+s*a,f&=65535,he(p<<16|m,f<<16|d,this.unsigned)};B.mul=B.multiply;B.divide=function(e){if(Ke(e)||(e=ht(e)),e.isZero())throw Error("division by zero");if(at){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?at.div_u:at.div_s)(this.low,this.high,e.low,e.high);return he(r,at.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?Vt:mt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return Vt;if(e.gt(this.shru(1)))return ll;i=Vt}else{if(this.eq(Qe)){if(e.eq(Cr)||e.eq(Qi))return Qe;if(e.eq(Qe))return Cr;var s=this.shr(1);return t=s.div(e).shl(1),t.eq(mt)?e.isNegative()?Cr:Qi:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(Qe))return this.unsigned?Vt:mt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=mt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var a=Math.ceil(Math.log(t)/Math.LN2),u=a<=48?1:ao(2,a-48),l=ut(t),c=l.mul(e);c.isNegative()||c.gt(o);)t-=u,l=ut(t,this.unsigned),c=l.mul(e);l.isZero()&&(l=Cr),i=i.add(l),o=o.sub(c)}return i};B.div=B.divide;B.modulo=function(e){if(Ke(e)||(e=ht(e)),at){var r=(this.unsigned?at.rem_u:at.rem_s)(this.low,this.high,e.low,e.high);return he(r,at.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};B.mod=B.modulo;B.rem=B.modulo;B.not=function(){return he(~this.low,~this.high,this.unsigned)};B.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};B.clz=B.countLeadingZeros;B.countTrailingZeros=function(){return this.low?rl(this.low):rl(this.high)+32};B.ctz=B.countTrailingZeros;B.and=function(e){return Ke(e)||(e=ht(e)),he(this.low&e.low,this.high&e.high,this.unsigned)};B.or=function(e){return Ke(e)||(e=ht(e)),he(this.low|e.low,this.high|e.high,this.unsigned)};B.xor=function(e){return Ke(e)||(e=ht(e)),he(this.low^e.low,this.high^e.high,this.unsigned)};B.shiftLeft=function(e){return Ke(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?he(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):he(0,this.low<<e-32,this.unsigned)};B.shl=B.shiftLeft;B.shiftRight=function(e){return Ke(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?he(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):he(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};B.shr=B.shiftRight;B.shiftRightUnsigned=function(e){return Ke(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?he(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?he(this.high,0,this.unsigned):he(this.high>>>e-32,0,this.unsigned)};B.shru=B.shiftRightUnsigned;B.shr_u=B.shiftRightUnsigned;B.rotateLeft=function(e){var r;return Ke(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?he(this.high,this.low,this.unsigned):e<32?(r=32-e,he(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,he(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};B.rotl=B.rotateLeft;B.rotateRight=function(e){var r;return Ke(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?he(this.high,this.low,this.unsigned):e<32?(r=32-e,he(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,he(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};B.rotr=B.rotateRight;B.toSigned=function(){return this.unsigned?he(this.low,this.high,!1):this};B.toUnsigned=function(){return this.unsigned?this:he(this.low,this.high,!0)};B.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};B.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};B.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};we.fromBytes=function(e,r,t){return t?we.fromBytesLE(e,r):we.fromBytesBE(e,r)};we.fromBytesLE=function(e,r){return new we(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};we.fromBytesBE=function(e,r){return new we(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};qt=we});var ts=v(()=>{"use strict"});var ar=v(()=>{});var St,uo,lo,kr,rs=v(()=>{St=new Int32Array(2),uo=new Float32Array(St.buffer),lo=new Float64Array(St.buffer),kr=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var rn,ns=v(()=>{(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(rn||(rn={}))});var Br,os=v(()=>{ar();rs();ns();Br=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return St[0]=this.readInt32(e),uo[0]}readFloat64(e){return St[kr?0:1]=this.readInt32(e),St[kr?1:0]=this.readInt32(e+4),lo[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){uo[0]=r,this.writeInt32(e,St[0])}writeFloat64(e,r){lo[0]=r,this.writeInt32(e,St[kr?0:1]),this.writeInt32(e+4,St[kr?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+4+4)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<4;r++)e+=String.fromCharCode(this.readInt8(this.position_+4+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=4;let o=this.bytes_.subarray(e,e+t);return r===rn.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+4}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=4)throw new Error("FlatBuffers: file identifier must be length "+4);for(let r=0;r<4;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+4+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}}});var dl=v(()=>{os();ar()});var be=v(()=>{ar();ar();ar();ar();rs();ns();dl();os()});var nn,is=v(()=>{"use strict";be();ts();nn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,0)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}}});var on,ss=v(()=>{"use strict";on=(p=>(p[p.UNDEFINED=0]="UNDEFINED",p[p.FLOAT=1]="FLOAT",p[p.INT=2]="INT",p[p.STRING=3]="STRING",p[p.TENSOR=4]="TENSOR",p[p.GRAPH=5]="GRAPH",p[p.FLOATS=6]="FLOATS",p[p.INTS=7]="INTS",p[p.STRINGS=8]="STRINGS",p[p.TENSORS=9]="TENSORS",p[p.GRAPHS=10]="GRAPHS",p[p.SPARSE_TENSOR=11]="SPARSE_TENSOR",p[p.SPARSE_TENSORS=12]="SPARSE_TENSORS",p))(on||{})});var as=v(()=>{"use strict"});var cr,us=v(()=>{"use strict";be();ls();as();cr=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):0}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new Kt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,0)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,s,a,u,l,c,f,d,p,m){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,s),n.addOpType(e,a),n.addType(e,u),n.addExecutionProviderType(e,l),n.addInputs(e,c),n.addOutputs(e,f),n.addAttributes(e,d),n.addInputArgCounts(e,p),n.addImplicitInputs(e,m),n.endNode(e)}}});var zr,cs=v(()=>{"use strict";zr=class{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}}});var sn,fs=v(()=>{"use strict";be();cs();sn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new zr).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new zr).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}}});var an,ds=v(()=>{"use strict";be();an=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,s,a,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,s),n.addNumVariadicInputs(e,a),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}}});var un,ps=v(()=>{"use strict";be();ds();un=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new an).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}}});var ln,ms=v(()=>{"use strict";be();ps();ln=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new un).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}}});var cn,hs=v(()=>{"use strict";be();ms();cn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new ln).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}}});var fn=v(()=>{"use strict"});var bt,dn=v(()=>{"use strict";be();fn();bt=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,0)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,s,a,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,s),n.addStringData(e,a),n.addExternalDataOffset(e,u),n.endTensor(e)}}});var pn,bs=v(()=>{"use strict";be();dn();pn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new bt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new bt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}}});var gs=v(()=>{"use strict";be();fn();mn()});var ys=v(()=>{"use strict";be();mn()});var xs=v(()=>{"use strict"});var hn,_s=v(()=>{"use strict";be();xs();hn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):0}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,0)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}}});var bn,Ts=v(()=>{"use strict";be();_s();bn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new hn).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}}});var gn,ws=v(()=>{"use strict";be();Ts();gn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new bn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}}});var Lr,vs=v(()=>{"use strict";be();ws();fn();Lr=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):0}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new gn).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,0)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}}});var Is=v(()=>{"use strict";gs();ys();vs()});var fr,mn=v(()=>{"use strict";be();Is();fr=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):0}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,0)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}}});var yn,Ss=v(()=>{"use strict";be();mn();yn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new fr).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}}});var $t,fo=v(()=>{"use strict";be();us();fs();hs();bs();dn();Ss();$t=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new bt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new yn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new cr).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new sn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new pn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new cn).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}}});var Kt,ls=v(()=>{"use strict";be();ss();fo();dn();Kt=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):0}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new bt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new $t).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new bt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new $t).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,0)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}}});var $s=v(()=>{"use strict";be()});var ml=v(()=>{"use strict";be()});var As=v(()=>{"use strict";be();Os()});var Os=v(()=>{"use strict";be();$s();As()});var xn,Ps=v(()=>{"use strict";be();is();xn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new nn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}}});var _n,Es=v(()=>{"use strict";be();Ps();_n=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new xn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}}});var Tn,Cs=v(()=>{"use strict";be();Es();Tn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new _n).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}}});var wn,Ds=v(()=>{"use strict";be();wn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}}});var vn,ks=v(()=>{"use strict";be();vn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}}});var In,Bs=v(()=>{"use strict";be();fo();Ds();ks();In=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new wn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new $t).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new vn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}}});var Sn,hl=v(()=>{"use strict";be();Cs();Bs();Sn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new In).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new Tn).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}}});var bl=v(()=>{"use strict";ts();is();ls();ss();$s();ml();Os();As();Ts();_s();xs();cs();fo();hl();Ps();Cs();gs();Bs();us();fs();as();ds();Es();Ds();ps();ms();hs();ys();ws();bs();ks();dn();fn();vs();mn();Is();Ss()});var $n=v(()=>{"use strict";bl()});var yl=Le((P$,gl)=>{"use strict";gl.exports=xx;function xx(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(a,u){r[t]=function(c){if(i)if(i=!1,c)u(c);else{for(var f=new Array(arguments.length-1),d=0;d<f.length;)f[d++]=arguments[d];a.apply(null,f)}};try{n.apply(e||null,r)}catch(l){i&&(i=!1,u(l))}})}});var wl=Le(Tl=>{"use strict";var mo=Tl;mo.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Rr=new Array(64),_l=new Array(123);for(gt=0;gt<64;)_l[Rr[gt]=gt<26?gt+65:gt<52?gt+71:gt<62?gt-4:gt-59|43]=gt++;var gt;mo.encode=function(e,r,t){for(var o=null,i=[],s=0,a=0,u;r<t;){var l=e[r++];switch(a){case 0:i[s++]=Rr[l>>2],u=(l&3)<<4,a=1;break;case 1:i[s++]=Rr[u|l>>4],u=(l&15)<<2,a=2;break;case 2:i[s++]=Rr[u|l>>6],i[s++]=Rr[l&63],a=0;break}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),s=0)}return a&&(i[s++]=Rr[u],i[s++]=61,a===1&&(i[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,i.slice(0,s))),o.join("")):String.fromCharCode.apply(String,i.slice(0,s))};var xl="invalid encoding";mo.decode=function(e,r,t){for(var o=t,i=0,s,a=0;a<e.length;){var u=e.charCodeAt(a++);if(u===61&&i>1)break;if((u=_l[u])===void 0)throw Error(xl);switch(i){case 0:s=u,i=1;break;case 1:r[t++]=s<<2|(u&48)>>4,s=u,i=2;break;case 2:r[t++]=(s&15)<<4|(u&60)>>2,s=u,i=3;break;case 3:r[t++]=(s&3)<<6|u,i=0;break}}if(i===1)throw Error(xl);return t-o};mo.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var Il=Le((C$,vl)=>{"use strict";vl.exports=ho;function ho(){this._listeners={}}ho.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};ho.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};ho.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var Cl=Le((D$,El)=>{"use strict";El.exports=Sl(Sl);function Sl(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,l,c){e[0]=u,l[c]=r[0],l[c+1]=r[1],l[c+2]=r[2],l[c+3]=r[3]}function i(u,l,c){e[0]=u,l[c]=r[3],l[c+1]=r[2],l[c+2]=r[1],l[c+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function s(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],e[0]}function a(u,l){return r[3]=u[l],r[2]=u[l+1],r[1]=u[l+2],r[0]=u[l+3],e[0]}n.readFloatLE=t?s:a,n.readFloatBE=t?a:s}():function(){function e(t,o,i,s){var a=o<0?1:0;if(a&&(o=-o),o===0)t(1/o>0?0:2147483648,i,s);else if(isNaN(o))t(2143289344,i,s);else if(o>34028234663852886e22)t((a<<31|2139095040)>>>0,i,s);else if(o<11754943508222875e-54)t((a<<31|Math.round(o/1401298464324817e-60))>>>0,i,s);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((a<<31|u+127<<23|l)>>>0,i,s)}}n.writeFloatLE=e.bind(null,$l),n.writeFloatBE=e.bind(null,Al);function r(t,o,i){var s=t(o,i),a=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:a*(1/0):u===0?a*1401298464324817e-60*l:a*Math.pow(2,u-150)*(l+8388608)}n.readFloatLE=r.bind(null,Ol),n.readFloatBE=r.bind(null,Pl)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,l,c){e[0]=u,l[c]=r[0],l[c+1]=r[1],l[c+2]=r[2],l[c+3]=r[3],l[c+4]=r[4],l[c+5]=r[5],l[c+6]=r[6],l[c+7]=r[7]}function i(u,l,c){e[0]=u,l[c]=r[7],l[c+1]=r[6],l[c+2]=r[5],l[c+3]=r[4],l[c+4]=r[3],l[c+5]=r[2],l[c+6]=r[1],l[c+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function s(u,l){return r[0]=u[l],r[1]=u[l+1],r[2]=u[l+2],r[3]=u[l+3],r[4]=u[l+4],r[5]=u[l+5],r[6]=u[l+6],r[7]=u[l+7],e[0]}function a(u,l){return r[7]=u[l],r[6]=u[l+1],r[5]=u[l+2],r[4]=u[l+3],r[3]=u[l+4],r[2]=u[l+5],r[1]=u[l+6],r[0]=u[l+7],e[0]}n.readDoubleLE=t?s:a,n.readDoubleBE=t?a:s}():function(){function e(t,o,i,s,a,u){var l=s<0?1:0;if(l&&(s=-s),s===0)t(0,a,u+o),t(1/s>0?0:2147483648,a,u+i);else if(isNaN(s))t(0,a,u+o),t(2146959360,a,u+i);else if(s>17976931348623157e292)t(0,a,u+o),t((l<<31|2146435072)>>>0,a,u+i);else{var c;if(s<22250738585072014e-324)c=s/5e-324,t(c>>>0,a,u+o),t((l<<31|c/4294967296)>>>0,a,u+i);else{var f=Math.floor(Math.log(s)/Math.LN2);f===1024&&(f=1023),c=s*Math.pow(2,-f),t(c*4503599627370496>>>0,a,u+o),t((l<<31|f+1023<<20|c*1048576&1048575)>>>0,a,u+i)}}}n.writeDoubleLE=e.bind(null,$l,0,4),n.writeDoubleBE=e.bind(null,Al,4,0);function r(t,o,i,s,a){var u=t(s,a+o),l=t(s,a+i),c=(l>>31)*2+1,f=l>>>20&2047,d=4294967296*(l&1048575)+u;return f===2047?d?NaN:c*(1/0):f===0?c*5e-324*d:c*Math.pow(2,f-1075)*(d+4503599627370496)}n.readDoubleLE=r.bind(null,Ol,0,4),n.readDoubleBE=r.bind(null,Pl,4,0)}(),n}function $l(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function Al(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function Ol(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function Pl(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var Dl=Le((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var Bl=Le(kl=>{"use strict";var zs=kl;zs.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};zs.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,s=[],a=0,u;r<t;)u=e[r++],u<128?s[a++]=u:u>191&&u<224?s[a++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,s[a++]=55296+(u>>10),s[a++]=56320+(u&1023)):s[a++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,s)),a=0);return i?(a&&i.push(String.fromCharCode.apply(String,s.slice(0,a))),i.join("")):String.fromCharCode.apply(String,s.slice(0,a))};zs.write=function(e,r,t){for(var o=t,i,s,a=0;a<e.length;++a)i=e.charCodeAt(a),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((s=e.charCodeAt(a+1))&64512)===56320?(i=65536+((i&1023)<<10)+(s&1023),++a,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var Ll=Le((B$,zl)=>{"use strict";zl.exports=_x;function _x(n,e,r){var t=r||8192,o=t>>>1,i=null,s=t;return function(u){if(u<1||u>o)return n(u);s+u>t&&(i=n(t),s=0);var l=e.call(i,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var Nl=Le((z$,Rl)=>{"use strict";Rl.exports=Ue;var An=Xt();function Ue(n,e){this.lo=n>>>0,this.hi=e>>>0}var dr=Ue.zero=new Ue(0,0);dr.toNumber=function(){return 0};dr.zzEncode=dr.zzDecode=function(){return this};dr.length=function(){return 1};var Tx=Ue.zeroHash="\0\0\0\0\0\0\0\0";Ue.fromNumber=function(e){if(e===0)return dr;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new Ue(t,o)};Ue.from=function(e){if(typeof e=="number")return Ue.fromNumber(e);if(An.isString(e))if(An.Long)e=An.Long.fromString(e);else return Ue.fromNumber(parseInt(e,10));return e.low||e.high?new Ue(e.low>>>0,e.high>>>0):dr};Ue.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};Ue.prototype.toLong=function(e){return An.Long?new An.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var jt=String.prototype.charCodeAt;Ue.fromHash=function(e){return e===Tx?dr:new Ue((jt.call(e,0)|jt.call(e,1)<<8|jt.call(e,2)<<16|jt.call(e,3)<<24)>>>0,(jt.call(e,4)|jt.call(e,5)<<8|jt.call(e,6)<<16|jt.call(e,7)<<24)>>>0)};Ue.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};Ue.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};Ue.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};Ue.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var Xt=Le(Ls=>{"use strict";var q=Ls;q.asPromise=yl();q.base64=wl();q.EventEmitter=Il();q.float=Cl();q.inquire=Dl();q.utf8=Bl();q.pool=Ll();q.LongBits=Nl();q.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);q.global=q.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||Ls;q.emptyArray=Object.freeze?Object.freeze([]):[];q.emptyObject=Object.freeze?Object.freeze({}):{};q.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};q.isString=function(e){return typeof e=="string"||e instanceof String};q.isObject=function(e){return e&&typeof e=="object"};q.isset=q.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};q.Buffer=function(){try{var n=q.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();q._Buffer_from=null;q._Buffer_allocUnsafe=null;q.newBuffer=function(e){return typeof e=="number"?q.Buffer?q._Buffer_allocUnsafe(e):new q.Array(e):q.Buffer?q._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};q.Array=typeof Uint8Array<"u"?Uint8Array:Array;q.Long=q.global.dcodeIO&&q.global.dcodeIO.Long||q.global.Long||q.inquire("long");q.key2Re=/^true|false|0|1$/;q.key32Re=/^-?(?:0|[1-9][0-9]*)$/;q.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;q.longToHash=function(e){return e?q.LongBits.from(e).toHash():q.LongBits.zeroHash};q.longFromHash=function(e,r){var t=q.LongBits.fromHash(e);return q.Long?q.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function Vl(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}q.merge=Vl;q.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function Ml(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&Vl(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}q.newError=Ml;q.ProtocolError=Ml("ProtocolError");q.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};q.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};q.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};q._configure=function(){var n=q.Buffer;if(!n){q._Buffer_from=q._Buffer_allocUnsafe=null;return}q._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},q._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var Gs=Le((R$,Wl)=>{"use strict";Wl.exports=de;var lt=Xt(),Rs,bo=lt.LongBits,Fl=lt.base64,Ul=lt.utf8;function On(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function Vs(){}function wx(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function de(){this.len=0,this.head=new On(Vs,0,0),this.tail=this.head,this.states=null}var Gl=function(){return lt.Buffer?function(){return(de.create=function(){return new Rs})()}:function(){return new de}};de.create=Gl();de.alloc=function(e){return new lt.Array(e)};lt.Array!==Array&&(de.alloc=lt.pool(de.alloc,lt.Array.prototype.subarray));de.prototype._push=function(e,r,t){return this.tail=this.tail.next=new On(e,r,t),this.len+=r,this};function Ms(n,e,r){e[r]=n&255}function vx(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function Fs(n,e){this.len=n,this.next=void 0,this.val=e}Fs.prototype=Object.create(On.prototype);Fs.prototype.fn=vx;de.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new Fs((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};de.prototype.int32=function(e){return e<0?this._push(Us,10,bo.fromNumber(e)):this.uint32(e)};de.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function Us(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}de.prototype.uint64=function(e){var r=bo.from(e);return this._push(Us,r.length(),r)};de.prototype.int64=de.prototype.uint64;de.prototype.sint64=function(e){var r=bo.from(e).zzEncode();return this._push(Us,r.length(),r)};de.prototype.bool=function(e){return this._push(Ms,1,e?1:0)};function Ns(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}de.prototype.fixed32=function(e){return this._push(Ns,4,e>>>0)};de.prototype.sfixed32=de.prototype.fixed32;de.prototype.fixed64=function(e){var r=bo.from(e);return this._push(Ns,4,r.lo)._push(Ns,4,r.hi)};de.prototype.sfixed64=de.prototype.fixed64;de.prototype.float=function(e){return this._push(lt.float.writeFloatLE,4,e)};de.prototype.double=function(e){return this._push(lt.float.writeDoubleLE,8,e)};var Ix=lt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};de.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(Ms,1,0);if(lt.isString(e)){var t=de.alloc(r=Fl.length(e));Fl.decode(e,t,0),e=t}return this.uint32(r)._push(Ix,r,e)};de.prototype.string=function(e){var r=Ul.length(e);return r?this.uint32(r)._push(Ul.write,r,e):this._push(Ms,1,0)};de.prototype.fork=function(){return this.states=new wx(this),this.head=this.tail=new On(Vs,0,0),this.len=0,this};de.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new On(Vs,0,0),this.len=0),this};de.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};de.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};de._configure=function(n){Rs=n,de.create=Gl(),Rs._configure()}});var Kl=Le((N$,ql)=>{"use strict";ql.exports=At;var Hl=Gs();(At.prototype=Object.create(Hl.prototype)).constructor=At;var Zt=Xt();function At(){Hl.call(this)}At._configure=function(){At.alloc=Zt._Buffer_allocUnsafe,At.writeBytesBuffer=Zt.Buffer&&Zt.Buffer.prototype instanceof Uint8Array&&Zt.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};At.prototype.bytes=function(e){Zt.isString(e)&&(e=Zt._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(At.writeBytesBuffer,r,e),this};function Sx(n,e,r){n.length<40?Zt.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}At.prototype.string=function(e){var r=Zt.Buffer.byteLength(e);return this.uint32(r),r&&this._push(Sx,r,e),this};At._configure()});var qs=Le((V$,Ql)=>{"use strict";Ql.exports=ke;var yt=Xt(),Hs,Zl=yt.LongBits,$x=yt.utf8;function xt(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function ke(n){this.buf=n,this.pos=0,this.len=n.length}var jl=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new ke(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new ke(e);throw Error("illegal buffer")},Jl=function(){return yt.Buffer?function(r){return(ke.create=function(o){return yt.Buffer.isBuffer(o)?new Hs(o):jl(o)})(r)}:jl};ke.create=Jl();ke.prototype._slice=yt.Array.prototype.subarray||yt.Array.prototype.slice;ke.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,xt(this,10);return e}}();ke.prototype.int32=function(){return this.uint32()|0};ke.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function Ws(){var n=new Zl(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw xt(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw xt(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}ke.prototype.bool=function(){return this.uint32()!==0};function go(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}ke.prototype.fixed32=function(){if(this.pos+4>this.len)throw xt(this,4);return go(this.buf,this.pos+=4)};ke.prototype.sfixed32=function(){if(this.pos+4>this.len)throw xt(this,4);return go(this.buf,this.pos+=4)|0};function Xl(){if(this.pos+8>this.len)throw xt(this,8);return new Zl(go(this.buf,this.pos+=4),go(this.buf,this.pos+=4))}ke.prototype.float=function(){if(this.pos+4>this.len)throw xt(this,4);var e=yt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};ke.prototype.double=function(){if(this.pos+8>this.len)throw xt(this,4);var e=yt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};ke.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw xt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=yt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};ke.prototype.string=function(){var e=this.bytes();return $x.read(e,0,e.length)};ke.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw xt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw xt(this);while(this.buf[this.pos++]&128);return this};ke.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};ke._configure=function(n){Hs=n,ke.create=Jl(),Hs._configure();var e=yt.Long?"toLong":"toNumber";yt.merge(ke.prototype,{int64:function(){return Ws.call(this)[e](!1)},uint64:function(){return Ws.call(this)[e](!0)},sint64:function(){return Ws.call(this).zzDecode()[e](!1)},fixed64:function(){return Xl.call(this)[e](!0)},sfixed64:function(){return Xl.call(this)[e](!1)}})}});var rc=Le((M$,tc)=>{"use strict";tc.exports=pr;var ec=qs();(pr.prototype=Object.create(ec.prototype)).constructor=pr;var Yl=Xt();function pr(n){ec.call(this,n)}pr._configure=function(){Yl.Buffer&&(pr.prototype._slice=Yl.Buffer.prototype.slice)};pr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};pr._configure()});var oc=Le((F$,nc)=>{"use strict";nc.exports=Pn;var Ks=Xt();(Pn.prototype=Object.create(Ks.EventEmitter.prototype)).constructor=Pn;function Pn(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");Ks.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}Pn.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var s=this;if(!i)return Ks.asPromise(n,s,e,r,t,o);if(!s.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return s.rpcImpl(e,r[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return s.emit("error",u,e),i(u);if(l===null){s.end(!0);return}if(!(l instanceof t))try{l=t[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return s.emit("error",c,e),i(c)}return s.emit("data",l,e),i(null,l)})}catch(a){s.emit("error",a,e),setTimeout(function(){i(a)},0);return}};Pn.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var sc=Le(ic=>{"use strict";var Ax=ic;Ax.Service=oc()});var uc=Le((G$,ac)=>{"use strict";ac.exports={}});var fc=Le(cc=>{"use strict";var Ye=cc;Ye.build="minimal";Ye.Writer=Gs();Ye.BufferWriter=Kl();Ye.Reader=qs();Ye.BufferReader=rc();Ye.util=Xt();Ye.rpc=sc();Ye.roots=uc();Ye.configure=lc;function lc(){Ye.util._configure(),Ye.Writer._configure(Ye.BufferWriter),Ye.Reader._configure(Ye.BufferReader)}lc()});var pc=Le((H$,dc)=>{"use strict";dc.exports=fc()});var Nr=Le((q$,mc)=>{"use strict";var ve=pc(),z=ve.Reader,Be=ve.Writer,w=ve.util,_=ve.roots.default||(ve.roots.default={});_.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=w.Long?w.Long.fromBits(0,0,!1):0,e.prototype.s=w.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=w.emptyArray,e.prototype.ints=w.emptyArray,e.prototype.strings=w.emptyArray,e.prototype.tensors=w.emptyArray,e.prototype.graphs=w.emptyArray,e.prototype.sparseTensors=w.emptyArray,e.prototype.typeProtos=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&_.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&_.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)_.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)_.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&_.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)_.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&_.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)_.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.AttributeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 21:{s.refAttrName=t.string();break}case 13:{s.docString=t.string();break}case 20:{s.type=t.int32();break}case 2:{s.f=t.float();break}case 3:{s.i=t.int64();break}case 4:{s.s=t.bytes();break}case 5:{s.t=_.onnx.TensorProto.decode(t,t.uint32());break}case 6:{s.g=_.onnx.GraphProto.decode(t,t.uint32());break}case 22:{s.sparseTensor=_.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{s.tp=_.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floats.push(t.float());else s.floats.push(t.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.ints.push(t.int64());else s.ints.push(t.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(t.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(_.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(_.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(_.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(_.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!w.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!w.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!w.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!w.isInteger(t.i)&&!(t.i&&w.isInteger(t.i.low)&&w.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||w.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=_.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=_.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=_.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=_.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!w.isInteger(t.ints[i])&&!(t.ints[i]&&w.isInteger(t.ints[i].low)&&w.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||w.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=_.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=_.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=_.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=_.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof _.onnx.AttributeProto)return t;var o=new _.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(w.Long?(o.i=w.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new w.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?w.base64.decode(t.s,o.s=w.newBuffer(w.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=_.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=_.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=_.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=_.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)w.Long?(o.ints[i]=w.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new w.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?w.base64.decode(t.strings[i],o.strings[i]=w.newBuffer(w.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=_.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=_.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=_.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=_.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,w.Long){var s=new w.Long(0,0,!1);i.i=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=w.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?w.Long.prototype.toString.call(t.i):o.longs===Number?new w.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?w.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=_.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=_.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var a=0;a<t.floats.length;++a)i.floats[a]=o.json&&!isFinite(t.floats[a])?String(t.floats[a]):t.floats[a]}if(t.ints&&t.ints.length){i.ints=[];for(var a=0;a<t.ints.length;++a)typeof t.ints[a]=="number"?i.ints[a]=o.longs===String?String(t.ints[a]):t.ints[a]:i.ints[a]=o.longs===String?w.Long.prototype.toString.call(t.ints[a]):o.longs===Number?new w.LongBits(t.ints[a].low>>>0,t.ints[a].high>>>0).toNumber():t.ints[a]}if(t.strings&&t.strings.length){i.strings=[];for(var a=0;a<t.strings.length;++a)i.strings[a]=o.bytes===String?w.base64.encode(t.strings[a],0,t.strings[a].length):o.bytes===Array?Array.prototype.slice.call(t.strings[a]):t.strings[a]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var a=0;a<t.tensors.length;++a)i.tensors[a]=_.onnx.TensorProto.toObject(t.tensors[a],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var a=0;a<t.graphs.length;++a)i.graphs[a]=_.onnx.GraphProto.toObject(t.graphs[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=_.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var a=0;a<t.typeProtos.length;++a)i.typeProtos[a]=_.onnx.TypeProto.toObject(t.typeProtos[a],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?_.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:_.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=_.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var a=0;a<t.sparseTensors.length;++a)i.sparseTensors[a]=_.onnx.SparseTensorProto.toObject(t.sparseTensors[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Be.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&_.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.ValueInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 2:{s.type=_.onnx.TypeProto.decode(t,t.uint32());break}case 3:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!w.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=_.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!w.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof _.onnx.ValueInfoProto)return t;var o=new _.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=_.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=_.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=w.emptyArray,e.prototype.output=w.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=w.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)_.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.NodeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 3:{s.name=t.string();break}case 4:{s.opType=t.string();break}case 7:{s.domain=t.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(_.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!w.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!w.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!w.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!w.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!w.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=_.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!w.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof _.onnx.NodeProto)return t;var o=new _.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=_.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=_.onnx.AttributeProto.toObject(t.attribute[s],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=w.emptyArray,e.prototype.updateBinding=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&_.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&_.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)_.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)_.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.TrainingInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.initialization=_.onnx.GraphProto.decode(t,t.uint32());break}case 2:{s.algorithm=_.onnx.GraphProto.decode(t,t.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(_.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(_.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=_.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=_.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=_.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=_.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof _.onnx.TrainingInfoProto)return t;var o=new _.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=_.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=_.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=_.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=_.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=_.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=_.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var s=0;s<t.initializationBinding.length;++s)i.initializationBinding[s]=_.onnx.StringStringEntryProto.toObject(t.initializationBinding[s],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var s=0;s<t.updateBinding.length;++s)i.updateBinding[s]=_.onnx.StringStringEntryProto.toObject(t.updateBinding[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=w.Long?w.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=w.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=w.Long?w.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=w.emptyArray,e.prototype.trainingInfo=w.emptyArray,e.prototype.functions=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&_.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)_.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)_.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)_.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)_.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.ModelProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.irVersion=t.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(_.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{s.producerName=t.string();break}case 3:{s.producerVersion=t.string();break}case 4:{s.domain=t.string();break}case 5:{s.modelVersion=t.int64();break}case 6:{s.docString=t.string();break}case 7:{s.graph=_.onnx.GraphProto.decode(t,t.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(_.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(_.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(_.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!w.isInteger(t.irVersion)&&!(t.irVersion&&w.isInteger(t.irVersion.low)&&w.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=_.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!w.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!w.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!w.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!w.isInteger(t.modelVersion)&&!(t.modelVersion&&w.isInteger(t.modelVersion.low)&&w.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!w.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=_.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=_.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=_.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=_.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof _.onnx.ModelProto)return t;var o=new _.onnx.ModelProto;if(t.irVersion!=null&&(w.Long?(o.irVersion=w.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new w.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=_.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(w.Long?(o.modelVersion=w.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new w.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=_.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=_.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=_.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=_.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(w.Long){var s=new w.Long(0,0,!1);i.irVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",w.Long){var s=new w.Long(0,0,!1);i.modelVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?w.Long.prototype.toString.call(t.irVersion):o.longs===Number?new w.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?w.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new w.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=_.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=_.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var a=0;a<t.metadataProps.length;++a)i.metadataProps[a]=_.onnx.StringStringEntryProto.toObject(t.metadataProps[a],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var a=0;a<t.trainingInfo.length;++a)i.trainingInfo[a]=_.onnx.TrainingInfoProto.toObject(t.trainingInfo[a],o)}if(t.functions&&t.functions.length){i.functions=[];for(var a=0;a<t.functions.length;++a)i.functions[a]=_.onnx.FunctionProto.toObject(t.functions[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Be.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.StringStringEntryProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.key=t.string();break}case 2:{s.value=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!w.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!w.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof _.onnx.StringStringEntryProto)return t;var o=new _.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)_.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.TensorAnnotation;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.tensorName=t.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(_.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!w.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=_.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof _.onnx.TensorAnnotation)return t;var o=new _.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=_.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var s=0;s<t.quantParameterTensorNames.length;++s)i.quantParameterTensorNames[s]=_.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=w.emptyArray,e.prototype.name="",e.prototype.initializer=w.emptyArray,e.prototype.sparseInitializer=w.emptyArray,e.prototype.docString="",e.prototype.input=w.emptyArray,e.prototype.output=w.emptyArray,e.prototype.valueInfo=w.emptyArray,e.prototype.quantizationAnnotation=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)_.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)_.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)_.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)_.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)_.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)_.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)_.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.GraphProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(_.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{s.name=t.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(_.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(_.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{s.docString=t.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(_.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(_.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(_.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(_.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=_.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!w.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=_.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=_.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!w.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=_.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=_.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=_.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=_.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof _.onnx.GraphProto)return t;var o=new _.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=_.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=_.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=_.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=_.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=_.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=_.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=_.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=_.onnx.NodeProto.toObject(t.node[s],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var s=0;s<t.initializer.length;++s)i.initializer[s]=_.onnx.TensorProto.toObject(t.initializer[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=_.onnx.ValueInfoProto.toObject(t.input[s],o)}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=_.onnx.ValueInfoProto.toObject(t.output[s],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var s=0;s<t.valueInfo.length;++s)i.valueInfo[s]=_.onnx.ValueInfoProto.toObject(t.valueInfo[s],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var s=0;s<t.quantizationAnnotation.length;++s)i.quantizationAnnotation[s]=_.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[s],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var s=0;s<t.sparseInitializer.length;++s)i.sparseInitializer[s]=_.onnx.SparseTensorProto.toObject(t.sparseInitializer[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=w.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=w.emptyArray,e.prototype.int32Data=w.emptyArray,e.prototype.stringData=w.emptyArray,e.prototype.int64Data=w.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=w.newBuffer([]),e.prototype.externalData=w.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=w.emptyArray,e.prototype.uint64Data=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&_.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)_.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.TensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}case 2:{s.dataType=t.int32();break}case 3:{s.segment=_.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floatData.push(t.float());else s.floatData.push(t.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int32Data.push(t.int32());else s.int32Data.push(t.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(t.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int64Data.push(t.int64());else s.int64Data.push(t.int64());break}case 8:{s.name=t.string();break}case 12:{s.docString=t.string();break}case 9:{s.rawData=t.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(_.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{s.dataLocation=t.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.doubleData.push(t.double());else s.doubleData.push(t.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.uint64Data.push(t.uint64());else s.uint64Data.push(t.uint64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!w.isInteger(t.dims[o])&&!(t.dims[o]&&w.isInteger(t.dims[o].low)&&w.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!w.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=_.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!w.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||w.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!w.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&w.isInteger(t.int64Data[o].low)&&w.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!w.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!w.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||w.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=_.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!w.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&w.isInteger(t.uint64Data[o].low)&&w.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof _.onnx.TensorProto)return t;var o=new _.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)w.Long?(o.dims[i]=w.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new w.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=_.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?w.base64.decode(t.stringData[i],o.stringData[i]=w.newBuffer(w.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)w.Long?(o.int64Data[i]=w.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new w.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?w.base64.decode(t.rawData,o.rawData=w.newBuffer(w.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=_.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)w.Long?(o.uint64Data[i]=w.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new w.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=w.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?w.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new w.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=_.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var s=0;s<t.floatData.length;++s)i.floatData[s]=o.json&&!isFinite(t.floatData[s])?String(t.floatData[s]):t.floatData[s]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var s=0;s<t.int32Data.length;++s)i.int32Data[s]=t.int32Data[s]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var s=0;s<t.stringData.length;++s)i.stringData[s]=o.bytes===String?w.base64.encode(t.stringData[s],0,t.stringData[s].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[s]):t.stringData[s]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var s=0;s<t.int64Data.length;++s)typeof t.int64Data[s]=="number"?i.int64Data[s]=o.longs===String?String(t.int64Data[s]):t.int64Data[s]:i.int64Data[s]=o.longs===String?w.Long.prototype.toString.call(t.int64Data[s]):o.longs===Number?new w.LongBits(t.int64Data[s].low>>>0,t.int64Data[s].high>>>0).toNumber():t.int64Data[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?w.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var s=0;s<t.doubleData.length;++s)i.doubleData[s]=o.json&&!isFinite(t.doubleData[s])?String(t.doubleData[s]):t.doubleData[s]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var s=0;s<t.uint64Data.length;++s)typeof t.uint64Data[s]=="number"?i.uint64Data[s]=o.longs===String?String(t.uint64Data[s]):t.uint64Data[s]:i.uint64Data[s]=o.longs===String?w.Long.prototype.toString.call(t.uint64Data[s]):o.longs===Number?new w.LongBits(t.uint64Data[s].low>>>0,t.uint64Data[s].high>>>0).toNumber(!0):t.uint64Data[s]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var s=0;s<t.externalData.length;++s)i.externalData[s]=_.onnx.StringStringEntryProto.toObject(t.externalData[s],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?_.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:_.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=w.Long?w.Long.fromBits(0,0,!1):0,r.prototype.end=w.Long?w.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=Be.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof z||(o=z.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new _.onnx.TensorProto.Segment;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.begin=o.int64();break}case 2:{a.end=o.int64();break}default:o.skipType(u&7);break}}return a},r.decodeDelimited=function(o){return o instanceof z||(o=new z(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!w.isInteger(o.begin)&&!(o.begin&&w.isInteger(o.begin.low)&&w.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!w.isInteger(o.end)&&!(o.end&&w.isInteger(o.end.low)&&w.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof _.onnx.TensorProto.Segment)return o;var i=new _.onnx.TensorProto.Segment;return o.begin!=null&&(w.Long?(i.begin=w.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new w.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(w.Long?(i.end=w.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new w.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var s={};if(i.defaults){if(w.Long){var a=new w.Long(0,0,!1);s.begin=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.begin=i.longs===String?"0":0;if(w.Long){var a=new w.Long(0,0,!1);s.end=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?s.begin=i.longs===String?String(o.begin):o.begin:s.begin=i.longs===String?w.Long.prototype.toString.call(o.begin):i.longs===Number?new w.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?s.end=i.longs===String?String(o.end):o.end:s.end=i.longs===String?w.Long.prototype.toString.call(o.end):i.longs===Number?new w.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&_.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&_.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.SparseTensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.values=_.onnx.TensorProto.decode(t,t.uint32());break}case 2:{s.indices=_.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=_.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=_.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!w.isInteger(t.dims[i])&&!(t.dims[i]&&w.isInteger(t.dims[i].low)&&w.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof _.onnx.SparseTensorProto)return t;var o=new _.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=_.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=_.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)w.Long?(o.dims[i]=w.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new w.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=_.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=_.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?w.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new w.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=w.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)_.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.TensorShapeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(_.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=_.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof _.onnx.TensorShapeProto)return t;var o=new _.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=_.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var s=0;s<t.dim.length;++s)i.dim[s]=_.onnx.TensorShapeProto.Dimension.toObject(t.dim[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:w.oneOfGetter(t=["dimValue","dimParam"]),set:w.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,s){return s||(s=Be.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&s.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&s.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&s.uint32(26).string(i.denotation),s},r.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},r.decode=function(i,s){i instanceof z||(i=z.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new _.onnx.TensorShapeProto.Dimension;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},r.decodeDelimited=function(i){return i instanceof z||(i=new z(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var s={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(s.value=1,!w.isInteger(i.dimValue)&&!(i.dimValue&&w.isInteger(i.dimValue.low)&&w.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!w.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!w.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof _.onnx.TensorShapeProto.Dimension)return i;var s=new _.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(w.Long?(s.dimValue=w.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?s.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?s.dimValue=i.dimValue:typeof i.dimValue=="object"&&(s.dimValue=new w.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(s.dimParam=String(i.dimParam)),i.denotation!=null&&(s.denotation=String(i.denotation)),s},r.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?a.dimValue=s.longs===String?String(i.dimValue):i.dimValue:a.dimValue=s.longs===String?w.Long.prototype.toString.call(i.dimValue):s.longs===Number?new w.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,s.oneofs&&(a.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(a.dimParam=i.dimParam,s.oneofs&&(a.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(a.denotation=i.denotation),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:w.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:w.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=Be.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&_.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&_.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&_.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&_.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&_.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof z||(o=z.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new _.onnx.TypeProto;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.tensorType=_.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{a.sequenceType=_.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{a.mapType=_.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{a.optionalType=_.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{a.sparseTensorType=_.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{a.denotation=o.string();break}default:o.skipType(u&7);break}}return a},e.decodeDelimited=function(o){return o instanceof z||(o=new z(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var s=_.onnx.TypeProto.Tensor.verify(o.tensorType);if(s)return"tensorType."+s}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=_.onnx.TypeProto.Sequence.verify(o.sequenceType);if(s)return"sequenceType."+s}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=_.onnx.TypeProto.Map.verify(o.mapType);if(s)return"mapType."+s}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=_.onnx.TypeProto.Optional.verify(o.optionalType);if(s)return"optionalType."+s}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=_.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(s)return"sparseTensorType."+s}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!w.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof _.onnx.TypeProto)return o;var i=new _.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=_.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=_.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=_.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=_.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=_.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var s={};return i.defaults&&(s.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(s.tensorType=_.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(s.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(s.sequenceType=_.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(s.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(s.mapType=_.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(s.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(s.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=_.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(s.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(s.optionalType=_.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(s.value="optionalType")),s},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Be.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&_.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof z||(i=z.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new _.onnx.TypeProto.Tensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=_.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof z||(i=new z(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!w.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=_.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof _.onnx.TypeProto.Tensor)return i;var s=new _.onnx.TypeProto.Tensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=_.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=_.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Be.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&_.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof z||(i=z.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new _.onnx.TypeProto.Sequence;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=_.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof z||(i=new z(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=_.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof _.onnx.TypeProto.Sequence)return i;var s=new _.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=_.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=_.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Be.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&s.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&_.onnx.TypeProto.encode(i.valueType,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof z||(i=z.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new _.onnx.TypeProto.Map;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=_.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof z||(i=new z(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!w.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var s=_.onnx.TypeProto.verify(i.valueType);if(s)return"valueType."+s}return null},t.fromObject=function(i){if(i instanceof _.onnx.TypeProto.Map)return i;var s=new _.onnx.TypeProto.Map;if(i.keyType!=null&&(s.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=_.onnx.TypeProto.fromObject(i.valueType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.keyType=0,a.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(a.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(a.valueType=_.onnx.TypeProto.toObject(i.valueType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Be.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&_.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof z||(i=z.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new _.onnx.TypeProto.Optional;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=_.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof z||(i=new z(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=_.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof _.onnx.TypeProto.Optional)return i;var s=new _.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=_.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=_.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=Be.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&_.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof z||(i=z.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new _.onnx.TypeProto.SparseTensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=_.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof z||(i=new z(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!w.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=_.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof _.onnx.TypeProto.SparseTensor)return i;var s=new _.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=_.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=_.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=w.Long?w.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=Be.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.OperatorSetIdProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.domain=t.string();break}case 2:{s.version=t.int64();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!w.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!w.isInteger(t.version)&&!(t.version&&w.isInteger(t.version.low)&&w.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof _.onnx.OperatorSetIdProto)return t;var o=new _.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(w.Long?(o.version=w.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new w.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",w.Long){var s=new w.Long(0,0,!1);i.version=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?w.Long.prototype.toString.call(t.version):o.longs===Number?new w.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=w.emptyArray,e.prototype.output=w.emptyArray,e.prototype.attribute=w.emptyArray,e.prototype.attributeProto=w.emptyArray,e.prototype.node=w.emptyArray,e.prototype.docString="",e.prototype.opsetImport=w.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=Be.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)_.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)_.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)_.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof z||(t=z.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new _.onnx.FunctionProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(t.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(_.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(_.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{s.docString=t.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(_.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{s.domain=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof z||(t=new z(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!w.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!w.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!w.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!w.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=_.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=_.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!w.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=_.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!w.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof _.onnx.FunctionProto)return t;var o=new _.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=_.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=_.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=_.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=t.attribute[s]}if(t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=_.onnx.NodeProto.toObject(t.node[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=_.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var s=0;s<t.attributeProto.length;++s)i.attributeProto[s]=_.onnx.AttributeProto.toObject(t.attributeProto[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();mc.exports=_});function Vr(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Cn(n){return new TextDecoder().decode(n)}var Ie,mr,js,Xe,yo,He,et,U,En,hr,br,gr,ge=v(()=>{"use strict";es();Ie=Er(Nr());yr();mr=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},js=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},Xe=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let s=Math.max(e.length,r.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=js.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:r[i-u];if(l!==c&&l>1&&c>1)return;a[s-u]=Math.max(l,c)}return a}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let s=n.calcShape(e.dims,r.dims);if(s){if(o&&!U.areEqual(s,e.dims))return;let a=U.size(s),u=o?e:new Re(s,i||e.type);if(s.length===0)u.set([],t(e.get([]),r.get([])));else{let l=new Array(s.length),c=new Array(e.dims.length),f=new Array(r.dims.length),d=0,p=0,m=!1,h=!1;e.dims.length===0&&(d=e.get([]),m=!0),r.dims.length===0&&(p=r.get([]),h=!0);let y;for(let b=0;b<a;b++){y=b;for(let g=s.length-1;g>=0;g--)l[g]=y%s[g],y=Math.floor(y/s[g]);m||(n.fillIndex(l,e.dims,c),d=e.get(c)),h||(n.fillIndex(l,r.dims,f),p=r.get(f)),u.set(l,t(d,p))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let s=t-1-i,a=e[s]||1;(r[r.length-1-i]||1)>1&&a===1&&o.unshift(s)}return o}},yo=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;r?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Xe.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},He=class n{static tensorDataTypeFromProto(e){switch(e){case Ie.onnx.TensorProto.DataType.INT8:return"int8";case Ie.onnx.TensorProto.DataType.UINT8:return"uint8";case Ie.onnx.TensorProto.DataType.BOOL:return"bool";case Ie.onnx.TensorProto.DataType.INT16:return"int16";case Ie.onnx.TensorProto.DataType.UINT16:return"uint16";case Ie.onnx.TensorProto.DataType.INT32:return"int32";case Ie.onnx.TensorProto.DataType.UINT32:return"uint32";case Ie.onnx.TensorProto.DataType.FLOAT:return"float32";case Ie.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ie.onnx.TensorProto.DataType.STRING:return"string";case Ie.onnx.TensorProto.DataType.INT64:return"int32";case Ie.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Ie.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ie.onnx.TensorProto.DataType.INT8;case"uint8":return Ie.onnx.TensorProto.DataType.UINT8;case"bool":return Ie.onnx.TensorProto.DataType.BOOL;case"int16":return Ie.onnx.TensorProto.DataType.INT16;case"uint16":return Ie.onnx.TensorProto.DataType.UINT16;case"int32":return Ie.onnx.TensorProto.DataType.INT32;case"uint32":return Ie.onnx.TensorProto.DataType.UINT32;case"float32":return Ie.onnx.TensorProto.DataType.FLOAT;case"float64":return Ie.onnx.TensorProto.DataType.DOUBLE;case"string":return Ie.onnx.TensorProto.DataType.STRING;case"int64":return Ie.onnx.TensorProto.DataType.INT64;case"uint64":return Ie.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>qt.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(et.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},et=class{static longToNumber(e){return qt.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return qt.isLong(e)||typeof e=="bigint"}},U=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,s=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];s*=o[u]}}let a=n.size(e);if(i!==-1){if(a%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=a/s}else if(s!==a)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((s,a)=>s*a,1),o=e.slice(r).reduce((s,a)=>s*a,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let s=n.normalizeAxis(r[i],t.length);if(s>=t.length)throw new Error("'axes' has an out of range axis");if(t[s]!==0)throw new Error("'axes' has a duplicate axis");t[s]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},En=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],s=[0];for(let a=0;a<t.length;++a){a!==0&&s.push(s[a-1]+t[a-1]);let u=e.slice();u[r]=t[a],i.push(u)}return[i,s]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},hr=class n{static adjustPoolAttributes(e,r,t,o,i,s){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<r.length-2;a++)a>=t.length?t.push(r[a+2]):t[a]=r[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<e.length-2;a++)n.adjustPadAndReturnShape(e[a+2],r[a],t[a],o[a],i,a,a+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,s,a){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,s,a),u}static computeConvOutputShape(e,r,t,o,i,s,a){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,r,t,o,i,s,a,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],s[l],a,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+r-1)/r-1)*r+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[a]=f-i[s],Math.floor((e+f-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/r+1)}},br=-34028234663852886e22,gr=34028234663852886e22});function Ox(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function hc(n){switch(n){case ae.onnx.TensorProto.DataType.UINT8:case ae.onnx.TensorProto.DataType.INT8:case ae.onnx.TensorProto.DataType.BOOL:return 1;case ae.onnx.TensorProto.DataType.UINT16:case ae.onnx.TensorProto.DataType.INT16:return 2;case ae.onnx.TensorProto.DataType.FLOAT:case ae.onnx.TensorProto.DataType.INT32:case ae.onnx.TensorProto.DataType.UINT32:return 4;case ae.onnx.TensorProto.DataType.INT64:case ae.onnx.TensorProto.DataType.DOUBLE:case ae.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${ae.onnx.TensorProto.DataType[n]}`)}}function Px(n,e){return new(yc(e))(n)}function yc(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Xs(n,e){if(e===ae.onnx.TensorProto.DataType.INT64||e===7){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===ae.onnx.TensorProto.DataType.UINT32||e===12||e===ae.onnx.TensorProto.DataType.UINT64||e===13){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${ae.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function bc(n,e,r){switch(e){case ae.onnx.TensorProto.DataType.BOOL:case ae.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case ae.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case ae.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case ae.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case ae.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case ae.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case ae.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case ae.onnx.TensorProto.DataType.INT64:return Xs(qt.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case ae.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case ae.onnx.TensorProto.DataType.UINT64:return Xs(qt.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${ae.onnx.TensorProto.DataType[e]}`)}}var gc,ae,Re,yr=v(()=>{"use strict";gc=Er(tl());es();$n();ae=Er(Nr());ge();Re=class n{constructor(e,r,t,o,i,s=gc.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=s;this.size=U.validateDimsAndCalcSize(e);let a=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==a)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(a))}else{if(i!==void 0){let l=yc(r);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(a*Ox(r));this.cache=Px(l,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[U.indicesToOffset(e,this.strides)]}set(e,r){this.data[U.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=U.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=He.tensorDataTypeFromProto(e.dataType),t=He.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,s)=>{o.data[s]=Cn(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,s=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),a=hc(e.dataType),u=e.rawData.byteLength/a;if(e.rawData.byteLength%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=bc(s,e.dataType,l*a);i[l]=c}}else{let i;switch(e.dataType){case ae.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case ae.onnx.TensorProto.DataType.INT32:case ae.onnx.TensorProto.DataType.INT16:case ae.onnx.TensorProto.DataType.UINT16:case ae.onnx.TensorProto.DataType.INT8:case ae.onnx.TensorProto.DataType.UINT8:case ae.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case ae.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case ae.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case ae.onnx.TensorProto.DataType.UINT32:case ae.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let s=o.data;if(s.length!==i.length)throw new Error("array length mismatch");for(let a=0;a<i.length;a++){let u=i[a];qt.isLong(u)?s[a]=Xs(u,e.dataType):s[a]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=He.tensorDimsFromORTFormat(e),t=He.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,s=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),a=hc(e.dataType()),u=e.rawDataLength()/a;if(e.rawDataLength()%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=bc(s,e.dataType(),l*a);i[l]=c}}return o}}});function K(n){return n===1?Ex:Cx}function xc(n){let e=K(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function _c(n){let e=K(n);return`${e.version}
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

    `}function Tc(n,e){let r=K(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var Ex,Cx,$e=v(()=>{"use strict";Ex={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},Cx={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var le=v(()=>{"use strict"});async function Zs(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,s=()=>{if(n()){t();return}i++;let a=e(i);if(r!=null&&i>=r){o();return}setTimeout(s,a)};s()})}function xo(n){return Vr(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function wc(n){return Vr(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function Mr(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function Fr(n,e){return e.map(r=>n[r]).join(", ")}function Ze(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function _t(n=6){return["x","y","z","w","u","v"].slice(0,n)}var Ot=v(()=>{"use strict";ge()});function Dx(n,e){return _t(e).map(r=>`${n}.${r}`)}function Ur(n,e){return e===1?[n]:Dx(n,e)}function Pt(){return`
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
  `}var xr=v(()=>{"use strict";Ot()});function Bx(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function zx(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${n[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",s="rp1, cp1",a="";if(r>2)for(let u=0;u<r-2;++u)a=a+`${e[u]},`;return`getA(${a}${t}),
          rEdge ? 0. : getA(${a}${i}),
          cEdge ? 0. : getA(${a}${o}),
          rEdge || cEdge ? 0. : getA(${a}${s})`}function Lx(n,e,r,t){return n===0||n===1?"":`
    int r = ${e[n-2]};
    int c = ${e[n-1]};
    int rp1 = ${e[n-2]} + 1;
    int cp1 = ${e[n-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${r};
    `}var vc,kx,Ic,Sc=v(()=>{"use strict";$e();le();Ot();xr();vc={name:"pack",inputNames:["A"],inputTypes:[1]},kx=(n,e)=>{let r=K(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,s=Ze(i),a=Ur("rc",i),u=Lx(i,a,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let c=Bx(i,l,a),f=zx(t,a),d=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${c}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${f});
          }
        }
      `;return{...vc,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:d}},Ic=(n,e)=>({...vc,get:()=>kx(n,e)})});function Js(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function Ac(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function Vx(n){let e=U.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,s)=>{let a=`int ${r[s]} = ${t} / ${i}`,u=s===e.length-1?`int ${r[s+1]} = ${t} - ${r[s]} * ${i}`:`index -= ${r[s]} * ${i}`;return`${a}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function Mx(n){let e=U.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var Rx,Nx,$c,Oc=v(()=>{"use strict";ge();$e();le();xr();Rx=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),Nx=(n,e,r,t)=>{let o=e.dims,i=t,s="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let a=K(n.session.backend.glContext.version),u=`
      ${Vx(o)}
      ${Mx(i)}
      ${Pt()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${s}
        ${a.output} = result;
      }
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},$c=(n,e,r)=>{let t=Rx(r);return{...t,get:()=>Nx(n,e,t,r)}}});var Qs,Pc=v(()=>{"use strict";$e();le();Qs=(n,e)=>{let r=e.shape,t=K(n.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function Ux(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var Ec,Fx,Cc,Dc=v(()=>{"use strict";$e();le();Ot();xr();Ec={name:"unpack",inputNames:["A"],inputTypes:[2]},Fx=(n,e)=>{let r=e.dims.length,t=Ur("rc",r),o=t.slice(-2),i=Ze(r),s=Pt(),u=e.dims.length===0?"":Ux(r,t),l=r<=1?"rc":`vec2(${o.join(",")})`,c=K(n.session.backend.glContext.version),f=`
    ${s}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...Ec,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:f}},Cc=(n,e)=>({...Ec,get:()=>Fx(n,e)})});var _o,Dn,To,kn=v(()=>{"use strict";st();_o=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(ye.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(ye.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,s)=>t[s]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},Dn=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(ye.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},To=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Bn,kc,Ys,Bc=v(()=>{"use strict";ge();le();Bn=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,s=r===4?e.length-1:void 0,a=r===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Ys(n,e,t,a,{isPacked:o,reverseWH:i,breakAxis:s})},kc=(n,e,r)=>{let t=Bn(n,e,r);return[t.width,t.height]},Ys=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[s,a]=n.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:a,channels:r,isPacked:i,shape:l,strides:U.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var Wx,wo,Lc=v(()=>{"use strict";st();yr();ge();Sc();Oc();Pc();Dc();kn();Bc();le();Wx=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},wo=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return kc(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(r[l],e.inputTypes[l]);let o=Wx(e,t),i=this.session.programManager.getArtifact(o),s=i?i.programInfo:typeof e.get=="function"?e.get():e,a=Bn(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(a,s.output.type);return i||(i=this.session.programManager.build(s,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=Bn(this.session.layoutStrategy,e.dims,r);if(r===4){let a=e.dims;if(a.length===4){let u=[a[0],Math.ceil(a[1]*a[2]*a[3]/4)],l=Bn(this.session.layoutStrategy,u,r),c=e.numberData;if(a[1]*a[2]*a[3]%4!==0){let f=a[0],d=a[1]*a[2]*a[3],p=Math.ceil(d*1/4)*4,m=f*p;c=new Float32Array(m);for(let h=0;h<f;++h){let y=h*d,b=h*p+h%1*d;c.set(e.numberData.subarray(y,y+d),b)}}return this.createTextureData(l,e.type,c,e,1)}}if(r===2){let i=Ys(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),s=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(s)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){ye.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let s=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,s,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:U.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if(Ac(e.dims,r)){let l={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:U.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=Js(e.dims),i=Js(r),s=this.reshapePacked(e,o),a=this.run($c(this,s,i),[s]);return this.reshapePacked(a,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let s={...e,tensor:o||new Re(e.unpackedShape,r,a=>this.readTexture(s),async a=>this.readTextureAsync(s),void 0,i),texture:t};return this.setTextureData(s.tensor.dataId,s,e.isPacked),s}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Qs(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Qs(this,e))}pack(e){return this.executeProgram(Ic(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(Cc(this,e.tensor),[e.tensor])}}});var ea,se,Ge=v(()=>{"use strict";ea=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},se=n=>new ea(n)});var Rc,Nc,Vc,Hx,qx,Mc=v(()=>{"use strict";Ge();$e();le();Rc={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},Nc=(n,e,r)=>(qx(e),[n.run({...Rc,cacheHint:r.cacheKey,get:()=>Hx(n,e,r)},e)]),Vc=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return se({epsilon:e,momentum:r,spatial:t})},Hx=(n,e,r)=>{let t=K(n.session.backend.glContext.version),o=e[0].dims.length,[i,s]=n.calculateTextureWidthAndHeight(e[1].dims,0),a=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${s});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...Rc,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:a}},qx=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var vo,ct,R,zn,Io,Mt=v(()=>{"use strict";vo=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},ct=class{constructor(e){this.context=e}},R=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},zn=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},Io=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let s=0;s<i.length;++s)this.dfsTraverse(i[s],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function jx(){let n="add_";return{body:`
  float ${n}(float a, float b) {
    return a + b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:n,type:0}}function Xx(){let n="div_";return{body:`
  float ${n}(float a, float b) {
    return a / b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:n,type:0}}function Zx(){let n="mul_";return{body:`
  float ${n}(float a, float b) {
    return a * b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:n,type:0}}function Jx(){let n="sub_";return{body:`
  float ${n}(float a, float b) {
    return a - b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:n,type:0}}function Qx(){let n="equal_";return{body:`
  float ${n}(float a, float b) {
    return float(a == b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:n,type:0}}function Yx(){let n="greater_";return{body:`
  float ${n}(float a, float b) {
    return float(a > b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:n,type:0}}function e_(){let n="less_";return{body:`
  float ${n}(float a, float b) {
    return float(a < b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:n,type:0}}function t_(){let n="and_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:n,type:0}}function r_(){let n="or_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:n,type:0}}function n_(){let n="xor_";return{body:`
  float ${n}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:n,type:0}}function o_(){return s_("pow")}function i_(){let n="prelu_";return{body:`
  float ${n}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:n,type:0}}function s_(n){let e=`${n}_`;return{body:`
  float ${e}(float a, float b) {
    return ${n}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${n}(v1, v2);
  }
  `,name:e,type:0}}var ft,a_,Fc,Uc,Gc,Wc,Hc,qc,Kc,jc,Xc,Zc,Jc,Qc,Yc=v(()=>{"use strict";ge();Mt();$e();le();ft=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>a_(n,e,r,t)}},a_=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!U.areEqual(e[0].dims,e[1].dims),s=e[0].dims,a=n.session.pack;if(i){let c=Xe.calcShape(e[0].dims,e[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");s=c;let f=s.length,d=e[0].dims.length!==0?e[0].dims.length:1,p=e[1].dims.length!==0?e[1].dims.length:1,m=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",y=K(n.session.backend.glContext.version),b=a?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${y.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${f}]) {
        int aindices[${d}];
        int bindices[${p}];
        ${m}
        ${h}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:s,type:t,textureType:o},shaderSource:b,hasMain:a}}let u=K(n.session.backend.glContext.version),l=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},Fc=(n,e)=>[n.run(ft(n,e,jx()),e)],Uc=(n,e)=>[n.run(ft(n,e,t_(),"bool"),e)],Gc=(n,e)=>[n.run(ft(n,e,Xx()),e)],Wc=(n,e)=>[n.run(ft(n,e,Qx(),"bool"),e)],Hc=(n,e)=>[n.run(ft(n,e,Yx(),"bool"),e)],qc=(n,e)=>[n.run(ft(n,e,e_(),"bool"),e)],Kc=(n,e)=>[n.run(ft(n,e,Zx()),e)],jc=(n,e)=>[n.run(ft(n,e,r_(),"bool"),e)],Xc=(n,e)=>[n.run(ft(n,e,o_()),e)],Zc=(n,e)=>[n.run(ft(n,e,i_()),e)],Jc=(n,e)=>[n.run(ft(n,e,Jx()),e)],Qc=(n,e)=>[n.run(ft(n,e,n_(),"bool"),e)]});var ef,tf,l_,rf=v(()=>{"use strict";ge();ef=(n,e,r)=>(l_(e),[n.cast(e[0],r)]),tf=n=>He.tensorDataTypeFromProto(n.attributes.getInt("to")),l_=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var c_,f_,nf,So,of=v(()=>{"use strict";$e();le();Ot();xr();c_=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),f_=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let I=1;I<r.length;I++){let S=r[I].dims.slice();for(let O=0;O<o.length;O++)if(O===t)i[t]+=S[O];else if(o[O]!==S[O])throw new Error("non concat dimensions must match")}let s=i.length,a=Ur("coords",s),u=Ze(s),l=Pt(),c=r.map(I=>I.dims),f=_t(s),d=new Array(c.length-1);d[0]=c[0][t];for(let I=1;I<d.length;I++)d[I]=d[I-1]+c[I][t];let p=f[t],m=f.slice(-2),h=f.join(),y=`if (${p} < ${d[0]}) {
        return getChannel(
            getX0(${h}), vec2(${m.join()}));
        }`;for(let I=1;I<d.length;I++){let S=d[I-1];y+=`
            if (${p} < ${d[I]}  && ${p} >= ${d[I-1]}) {
              return getChannel(
                getX${I}(${So(f,p,S)}),
                vec2(${So(m,p,S)}));
            }`}let b=d.length,g=d[d.length-1];y+=`
            return getChannel(
              getX${b}(${So(f,p,g)}),
              vec2(${So(m,p,g)}));`;let x=K(n.session.backend.glContext.version),T=`
          ${l}
          float getValue(${f.map(I=>"int "+I)}) {
            ${y}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${f[s-1]};
            coords.${f[s-1]} = coords.${f[s-2]};
            coords.${f[s-2]} = lastDim;

            vec4 result = vec4(getValue(${a}), 0., 0., 0.);

            ${a[s-1]} = ${a[s-1]} + 1;
            if (${a[s-1]} < ${i[s-1]}) {
              result.g = getValue(${a});
            }

            ${a[s-2]} = ${a[s-2]} + 1;
            if (${a[s-2]} < ${i[s-2]}) {
              result.a = getValue(${a});
            }

            ${a[s-1]} = ${a[s-1]} - 1;
            if (${a[s-2]} < ${i[s-2]} &&
                ${a[s-1]} < ${i[s-1]}) {
              result.b = getValue(${a});
            }
            ${x.output} = result;
          }
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:T,hasMain:!0}},nf=(n,e,r)=>{let t=c_(e.length,r.cacheKey);return{...t,get:()=>f_(n,t,e,r.axis)}},So=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,s)=>s===t?`${i} - ${r}`:i).join()}});var sf,d_,p_,m_,af,h_,b_,g_,uf,y_,lf=v(()=>{"use strict";Ge();le();of();sf=(n,e,r)=>(y_(e),n.session.pack&&e[0].dims.length>1?[n.run(nf(n,e,r),e)]:[n.run(m_(n,e,r),e)]),d_=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),p_=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let p=1;p<r.length;p++){let m=r[p].dims.slice();for(let h=0;h<o.length;h++)if(h===t)i[t]+=m[h];else if(o[h]!==m[h])throw new Error("non concat dimensions must match")}let s=i.length,a=new Array(r.length),u=0;for(let p=0;p<a.length;++p)u+=r[p].dims[t],a[p]=u;let l="";r.length<5?l=af(a):l=h_(a);let c=b_(r.length,s),f=g_(a),d=`
        ${c}
        ${f}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:d}},m_=(n,e,r)=>{let t=d_(e.length,r.cacheKey);return{...t,get:()=>p_(n,t,e,r.axis)}},af=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,h_=n=>af(n),b_=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},g_=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},uf=n=>se({axis:n.attributes.getInt("axis")}),y_=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function x_(){return dt("abs")}function __(){return dt("acos")}function T_(){return dt("asin")}function w_(){return dt("atan")}function v_(){return dt("ceil")}function I_(){return dt("cos")}function S_(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function $_(){return dt("exp")}function A_(){return dt("floor")}function ta(n,e){let r="clip";return{body:`
  const float min = float(${n});
  const float max = float(${e});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function O_(){let n="indentity";return{body:`
  float ${n}_(float a) {
    return a;
  }
  vec4 ${n}_(vec4 v) {
    return v;
  }
  `,name:n,type:0}}function P_(n){let e="leakyRelu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function E_(){return dt("log")}function C_(){let n="neg";return{body:`
  float ${n}_(float a) {
    return -a;
  }
  vec4 ${n}_(vec4 v) {
    return -v;
  }
  `,name:n,type:0}}function D_(){let n="not";return{body:`
  float ${n}_(float a) {
    return float( ! bool(a) );
  }
  bool ${n}_(bool a) {
    return !a;
  }
  vec4 ${n}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${n}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:n,type:0}}function k_(){return dt("sin")}function ra(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function na(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function B_(){return dt("sqrt")}function z_(){return dt("tan")}function L_(){let n="tanh";return{body:`
  float ${n}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${n}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:n,type:0}}function dt(n){return{body:`
  float ${n}_(float a) {
    return ${n}(a);
  }
  vec4 ${n}_(vec4 v) {
    return ${n}(v);
  }
  `,name:n,type:0}}var R_,ze,cf,ff,df,pf,oa,mf,hf,N_,bf,gf,yf,xf,_f,Tf,ia,wf,vf,If,Sf,$f,Af,Of,Pf,Ef,Cf,Df,sa=v(()=>{"use strict";Ge();ge();Mt();$e();le();R_=(n,e,r,t)=>{let o=n.session.pack?2:0,i=K(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},ze=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>R_(n,i,e,r)}},cf=(n,e)=>[n.run(ze(n,e[0],x_()),e)],ff=(n,e)=>[n.run(ze(n,e[0],__()),e)],df=(n,e)=>[n.run(ze(n,e[0],T_()),e)],pf=(n,e)=>[n.run(ze(n,e[0],w_()),e)],oa=(n,e,r)=>[n.run(ze(n,e[0],ta(r.min,r.max),r.cacheKey),e)],mf=n=>se({min:n.attributes.getFloat("min",br),max:n.attributes.getFloat("max",gr)}),hf=(n,e)=>{let r=N_(n,e);return oa(n,[e[0]],r)},N_=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:br,t=e.length>=3?e[2].numberData[0]:gr;return se({min:r,max:t})},bf=(n,e)=>[n.run(ze(n,e[0],v_()),e)],gf=(n,e)=>[n.run(ze(n,e[0],I_()),e)],yf=(n,e,r)=>[n.run(ze(n,e[0],S_(r.alpha),r.cacheKey),e)],xf=n=>se({alpha:n.attributes.getFloat("alpha",1)}),_f=(n,e)=>[n.run(ze(n,e[0],$_()),e)],Tf=(n,e)=>[n.run(ze(n,e[0],A_()),e)],ia=(n,e)=>[n.run(ze(n,e[0],O_()),e)],wf=(n,e,r)=>[n.run(ze(n,e[0],P_(r.alpha),r.cacheKey),e)],vf=n=>se({alpha:n.attributes.getFloat("alpha",.01)}),If=(n,e)=>[n.run(ze(n,e[0],E_()),e)],Sf=(n,e)=>[n.run(ze(n,e[0],C_()),e)],$f=(n,e)=>[n.run(ze(n,e[0],D_()),e)],Af=(n,e)=>[n.run(ze(n,e[0],ra()),e)],Of=(n,e)=>[n.run(ze(n,e[0],na()),e)],Pf=(n,e)=>[n.run(ze(n,e[0],k_()),e)],Ef=(n,e)=>[n.run(ze(n,e[0],B_()),e)],Cf=(n,e)=>[n.run(ze(n,e[0],z_()),e)],Df=(n,e)=>[n.run(ze(n,e[0],L_()),e)]});function Et(n){let e;switch(n.activation){case"Relu":e=ra();break;case"Sigmoid":e=na();break;case"Clip":e=ta(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var Gr,_r=v(()=>{"use strict";ge();sa();Gr=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[br,gr]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var M_,F_,kf,Bf=v(()=>{"use strict";st();$e();le();$o();_r();M_=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),F_=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",s=e[0].dims.slice(),a=e[1].dims.slice(),u=a[0]/t.group;ye.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=Wr(s,a,t.dilations,t.pads,t.strides),c=K(n.session.backend.glContext.version),{activationFunction:f,applyActivation:d}=Et(t),p=`
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
    for (int wInChannel = 0; wInChannel < ${a[1]}; wInChannel++) {
      int input_channel = group_id * ${a[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${a[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${s[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${a[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${s[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${d}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:l,type:e[0].type,textureType:0},shaderSource:p,hasMain:!0}},kf=(n,e,r)=>{let t=M_(e.length>2,r.cacheKey);return{...t,get:()=>F_(n,e,t,r)}}});var U_,G_,zf,Lf=v(()=>{"use strict";$e();le();xr();U_=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),G_=(n,e,r,t,o,i)=>{let s=r.dims,a=t.dims,u=2,l=3,c=o.length,f=[a[1]*a[2]*a[3],o[2]*o[3]],d=a[2]*a[3],p=Pt(),m=K(n.session.backend.glContext.version),h="";for(let b=0;b<=1;b++)for(let g=0;g<=1;g++)h+=`
            blockIndex = rc.x + ${g};
            pos = rc.y + ${b};

            if(blockIndex < ${f[1]} && pos < ${f[0]}) {
              offsetY = int(blockIndex / (${o[c-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${d}) / ${a[2]});

              if(d0 < ${s[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[c-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${d}), ${a[2]});

                if(d1 < ${s[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${d}.);
                    innerDims = vec2(d0, d1);
                    result[${b*2+g}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let y=`
      ${p}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${h}
          ${m.output} = result;
      }
            `;return{...e,output:{dims:f,type:r.type,textureType:2},shaderSource:y,hasMain:!0}},zf=(n,e,r,t,o)=>{let i=U_(o.cacheKey);return{...i,get:()=>G_(n,i,e,r,t,o)}}});function H_(n,e,r){let t=e[0].dims,o=e[1].dims,i=Xe.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let s=Ze(i.length),a=_t(),{activationFunction:u,applyActivation:l}=Et(r),c=e.length>2,f=c?"value += getBiasForMatmul();":"",d=c?`${ua(s,a,e[2].dims,i,!1)}`:"",p=i.length,m=t.length,h=o.length,y=t[t.length-1],b=`
    ${u}
    ${d}
    float process(int indices[${p}]) {
        int a[${m}];
        int b[${h}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${y}; ++k) {
            a[${m-1}] = k;
            b[${h-2}] = k;
            value += _A(a) * _B(b);
        }
        ${f}
        ${l}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:b}}function aa(n,e){let r=W_(n.length>2,e.activationCacheKey);return{...r,get:()=>H_(r,n,e)}}function ua(n,e,r,t,o){let i="",s=r.length,a=t.length,u=a-s;a<2&&s>0?i="coords":i=r.map((h,y)=>`coords.${e[y+u]}`).join(", ");let c=Xe.getBroadcastDims(r,t).map(h=>`coords.${e[h+u]} = 0;`).join(`
`),d=U.size(r)===1,p="vec4(outputValue.xx, outputValue.yy)";return d&&(p="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${i});
  return ${p};
}`:`
float getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var Rf,Nf,W_,q_,Ao=v(()=>{"use strict";ge();le();Ot();_r();la();Rf=(n,e,r)=>(q_(e),n.session.pack?[n.run(Oo(n,e,r),e)]:[n.run(aa(e,r),e)]),Nf=n=>Gr(n.attributes),W_=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});q_=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function X_(n,e,r,t){let o=[],i=[],s=r[0].dims,a=r[1].dims,u=s.length,l=a.length,c=t.length,f=c-u,d=c-l;o=s.map((x,T)=>`coords.${e[T+f]}`),o[u-1]="i*2",o.join(", "),i=a.map((x,T)=>`coords.${e[T+d]}`),i[l-2]="i*2",i.join(", ");let p=Xe.getBroadcastDims(s,t),m=Xe.getBroadcastDims(a,t),h=p.map(x=>`coords.${e[x+f]} = 0;`).join(`
`),y=m.map(x=>`coords.${e[x+d]} = 0;`).join(`
`),b=`int lastDim = coords.${e[c-1]};
  coords.${e[c-1]} = coords.${e[c-2]};
  coords.${e[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${b}
  ${h}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${b}
  ${y}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function Z_(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function J_(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var K_,j_,Oo,la=v(()=>{"use strict";ge();$e();le();Ot();_r();Ao();K_=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),j_=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",s=r[0].dims,a=r[1].dims,u=Xe.calcShape(s,a,!0),l=!U.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=s[s.length-1],f=Math.ceil(c/2),d=s.length,p=a.length,m=K(n.session.backend.glContext.version),h=Ze(u.length),y=u.length,b=_t(),{activationFunction:g,applyActivation:x}=Et(t),T=o?`${ua(h,b,r[2].dims,u,!0)}`:"",I=l?`${X_(h,b,r,u)}`:"",S=l?"getAAtOutCoordsMatmul(i)":`getA(${Z_(b,d)})`,O=l?"getBAtOutCoordsMatmul(i)":`getB(${J_(b,p)})`,P=l?"":`${h} rc =
          getOutputCoords(); int lastDim = rc.${b[y-1]}; rc.${b[y-1]} =
          rc.${b[y-2]}; rc.${b[y-2]} = lastDim;
      `,C=`
            ${I}
            ${T}
            ${g}
            void main() {
              ${P}

              vec4 value = vec4(0);
              for (int i = 0; i < ${f}; i++) {
                vec4 a = ${S};
                vec4 b = ${O};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${x}
              ${m.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:C,hasMain:!0}},Oo=(n,e,r)=>{let t=K_(e.length>2,r.activationCacheKey);return{...t,get:()=>j_(n,t,e,r)}}});var Vf,Mf=v(()=>{"use strict";$o();Lf();la();Vf=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=Wr(t,o,r.dilations,r.pads,r.strides),s=n.run(zf(n,e[0],e[1],i,r),[e[0]]),a=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[a,s,e[2]]:[a,s],l=n.run(Oo(n,u,r),u);return n.reshapePacked(l,i)}});var Q_,Y_,Ff,ca,fa=v(()=>{"use strict";le();Q_=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),Y_=(n,e,r,t,o,i)=>{let s=r.dims,a=t.dims,u=o.length,l=ca(s,a,o,4),c=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
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
              int x[${s.length}];
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
        `;return{...e,output:{dims:l,type:r.type,textureType:4},shaderSource:c}},Ff=(n,e,r,t,o)=>{let i=Q_(o.cacheKey);return{...i,get:()=>Y_(n,i,e,r,t,o)}},ca=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var eT,tT,Uf,Gf=v(()=>{"use strict";ge();$e();le();_r();fa();eT=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),tT=(n,e,r,t,o)=>{let i=r[0].dims,s=r[1].dims,a=[s[0],Math.ceil(i[1]*s[2]*s[3]/4)],u=ca(i,s,t),[l,c]=n.calculateTextureWidthAndHeight(a,4),f=U.computeStrides(u),[d,p]=n.calculateTextureWidthAndHeight(u,4),m=t.length,h=r.length<3?"0.0":"_B(b)",y=Math.ceil(i[1]*s[2]*s[3]/4),{activationFunction:b,applyActivation:g}=Et(o),x=K(n.session.backend.glContext.version),T=`
${b}
float process(int indices[${m}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${f[0]} + im2col[1] * ${f[1]} + im2col[2] * ${f[2]};
  int kernelOffset = indices[1] * ${a[1]};
  float value = ${h};
  for (int i = 0; i < ${y}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${d}, ${p});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${x.texture2D}(Im2Col, im2colCoords), ${x.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${g}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:T}},Uf=(n,e,r,t)=>{let o=eT(e.length>2,t);return{...o,get:()=>tT(n,o,e,r,t)}}});var Wr,da,rT,nT,oT,iT,pa,sT,$o=v(()=>{"use strict";Ge();ge();Bf();Mf();Gf();_r();fa();Ao();Wr=(n,e,r,t,o)=>{let i=n[0],s=n.slice(2),a=s.length,u=e[0],c=e.slice(2).map((m,h)=>m+(m-1)*(r[h]-1)),d=s.map((m,h)=>m+t[h]+t[h+a]).map((m,h)=>Math.floor((m-c[h]+o[h])/o[h]));return[i,u].concat(...d)},da=(n,e,r)=>(sT(e,r),rT(n,e,r)),rT=(n,e,r)=>{let t=iT(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(kf(n,e,t),e)]:i&&o?[nT(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[Vf(n,e,t)]:[oT(n,e,t)]},nT=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=Wr(t,o,r.dilations,r.pads,r.strides),s=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),a=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[a,s,e[2]]:[a,s],l=n.run(aa(u,r),u);return n.reshapeUnpacked(l,i)},oT=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=Wr(t,o,r.dilations,r.pads,r.strides),s=n.run(Ff(n,e[0],e[1],i,r),[e[0]]),a=e.length===3?[s,e[1],e[2]]:[s,e[1]];return n.run(Uf(n,e,i,r),a)},iT=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();hr.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},pa=n=>{let e=n.attributes,r=Gr(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return se({autoPad:t,dilations:o,group:i,kernelShape:s,pads:a,strides:u,...r})},sT=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var aT,uT,lT,Wf,cT,fT,dT,pT,mT,hT,Hf,bT,qf=v(()=>{"use strict";Ge();$e();le();_r();aT=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,uT=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},lT=(n,e,r,t,o,i,s,a)=>{let u=n.length-2,l=a.length===0;for(let c=0;c<u;++c){let f=l?n[c+2]*i[c]:a[c],d=aT(n[c+2],i[c],o[c],e[c],r[c],f);uT(d,t,o,c,c+u),l&&a.push(i[c]*(n[c+2]-1)+s[c]+(e[c]-1)*r[c]+1-o[c]-o[c+u])}},Wf=(n,e,r)=>(bT(e,r),cT(n,e,r)),cT=(n,e,r)=>{let t=hT(r,e);return[mT(n,e,t)]},fT=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),dT=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",s=e[0].dims,a=e[1].dims,u=a[1],l=a[0]/t.group,c=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],f=K(n.session.backend.glContext.version),{activationFunction:d,applyActivation:p}=Et(t),m=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${d}
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
      for (int wWOff = 0; wWOff < ${a[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${a[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${s[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${s[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${p}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:c,type:e[0].type,textureType:0},shaderSource:m,hasMain:!0}},pT=(n,e,r)=>{let t=fT(e.length>2,r.cacheKey);return{...t,get:()=>dT(n,e,t,r)}},mT=(n,e,r)=>n.run(pT(n,e,r),e),hT=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let a=2;a<e[1].dims.length;++a)r.push(e[1].dims[a]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;lT(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let s=Object.assign({},n);return Object.assign(s,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),s},Hf=n=>{let e=n.attributes,r=Gr(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),c=e.getInts("strides",[1,1]);return se({autoPad:t,dilations:o,group:i,kernelShape:s,outputPadding:a,outputShape:u,pads:l,strides:c,...r})},bT=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var Kf,Tr,jf,gT,Xf,yT,xT,_T,Po=v(()=>{"use strict";Ge();ge();le();Kf={name:"Transpose",inputNames:["A"],inputTypes:[0]},Tr=(n,e,r)=>(_T(e),[n.run({...Kf,cacheHint:r.cacheKey,get:()=>gT(n,e[0],r.perm)},e)]),jf=n=>se({perm:n.attributes.getInts("perm",[])}),gT=(n,e,r)=>{let t=e.dims;r=Xf(t,r);let o=yT(t,r),i=t.length,s=`
      ${xT("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...Kf,output:{dims:o,type:e.type,textureType:0},shaderSource:s}},Xf=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),yT=(n,e)=>(e=Xf(n,e),U.sortBasedOnPerm(n,e)),xT=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},_T=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var Zf,Jf,TT,Qf=v(()=>{"use strict";Po();Zf=(n,e,r)=>{TT(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],a=n.reshapeUnpacked(e[0],s),u={perm:i,cacheKey:`${i}`},[l]=Tr(n,[a],u),c=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(l,c)]},Jf=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},TT=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var Yf,ed,wT,td=v(()=>{"use strict";ge();Yf=(n,e,r)=>{wT(e,r);let t=U.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},ed=n=>n.attributes.getInt("axis",1),wT=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var Jt,Ln=v(()=>{"use strict";Jt=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var rd,nd,vT,IT,ST,$T,od=v(()=>{"use strict";Ge();Ln();ge();le();rd=(n,e,r)=>($T(e,r.axis),[n.run(ST(n,e,r),e)]),nd=n=>se({axis:n.attributes.getInt("axis",0)}),vT={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},IT=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),s=new Array(o.length+i.length-1);t=U.normalizeAxis(t,o.length);let a=[];for(let d=0;d<s.length;d++)d<t?(s[d]=o[d],a.push(`inputIdx[${d}] = outputIdx[${d}];`)):d<t+i.length?(s[d]=i[d-t],a.push(`indexDataIdx[${d-t}] = outputIdx[${d}];`)):(s[d]=o[d-i.length+1],a.push(`inputIdx[${d-i.length+1}] = outputIdx[${d}];`));let u=s.length||1,l=o.length,c=i.length||1,f=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${a.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:s,type:r[0].type,textureType:0},shaderSource:f}},ST=(n,e,r)=>{let t={...vT,cacheHint:r.cacheKey};return{...t,get:()=>IT(n,t,e,r.axis)}},$T=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(Jt.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var ma,id,sd,ad,AT,OT,PT,ud=v(()=>{"use strict";Ge();ge();le();ma=(n,e,r)=>(PT(e,r),[n.run(AT(e,r),e)]),id=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return se({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},sd=n=>id(n,!1),ad=n=>id(n,!0),AT=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>OT(r,n,e)}},OT=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,s]=yo.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),a=[i,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";r.transA&&(u=t[0]),r.transA&&r.transB?l="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?l="value += _A_T(a) * _B(b);":!r.transA&&r.transB?l="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(l="value += _A(a) * _B(b);");let c=a.length,f=e.length===3?`int c[${e[2].dims.length}];`:"",d=e.length===3?"bcastIndices_C(indices, c);":"",p=e.length===3?"value += beta * _C(c);":"",m=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${f}

          copyVec(indices, a);
          copyVec(indices, b);
          ${d}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${p}
          return value;
      }`;return{...n,output:{dims:a,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:m}},PT=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var ld,cd,ET,CT,DT,kT,BT,fd=v(()=>{"use strict";Ge();le();ld=(n,e,r)=>(BT(e),[n.run(DT(n,e,r),e)]),cd=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return se({scale:e,bias:r})},ET={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},CT=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,a=`
      ${kT(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:a}},DT=(n,e,r)=>{let t={...ET,cacheHint:r.cacheKey};return{...t,get:()=>CT(n,t,e,r)}},kT=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},BT=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var pd,md,dd,zT,LT,RT,NT,VT,MT,hd=v(()=>{"use strict";$e();le();pd=(n,e,r)=>{MT(e);let t=n.run(LT(e[0]),e);return[n.run(VT(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},md=n=>n.attributes.getFloat("epsilon",1e-5),dd={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},zT=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],s=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${r[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${r[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:s}},LT=n=>({...dd,get:()=>zT(dd,n)}),RT={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},NT=(n,e,r,t,o)=>{let i=K(n.session.backend.glContext.version),[s,a]=n.calculateTextureWidthAndHeight(o,4),[u,l]=[s/4,a],c=`
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
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:c}},VT=(n,e,r,t)=>{let o={...RT,cacheHint:`${r}`};return{...o,get:()=>NT(n,o,e,r,t)}},MT=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function FT(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),s=`float(${e.alpha}) / float(${e.size})`,a=`float(${e.bias})`,u=`float(${e.beta})`,l=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${r}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${a} + ${s} * square_sum, ${u});
    }`;return{...yd,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:l}}function UT(n,e){return{...yd,cacheHint:e.cacheKey,get:()=>FT(n,e)}}var bd,gd,yd,GT,xd=v(()=>{"use strict";Ge();le();bd=(n,e,r)=>(GT(e),[n.run(UT(e,r),e)]),gd=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return se({alpha:e,beta:r,bias:t,size:o})},yd={name:"LRN",inputNames:["X"],inputTypes:[0]};GT=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var WT,ha,_d,Td,wd,HT,qT,KT,jT,XT,ZT,JT,QT,vd=v(()=>{"use strict";Ge();ge();$e();le();WT={name:"Pad",inputNames:["A"],inputTypes:[0]},ha=(n,e,r)=>(KT(e),[n.run({...WT,cacheHint:r.cacheKey,get:()=>qT(n,e[0],r)},e)]),_d=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return se({mode:e,value:r,pads:t})},Td=(n,e,r)=>{jT(e);let t=HT(n,e,r);return ha(n,[e[0]],t)},wd=n=>n.attributes.getString("mode","constant"),HT=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return se({mode:r,pads:t,value:o})},qT=(n,e,r)=>{let t=U.padShape(e.dims.slice(),r.pads),o=t.length,s=`
      ${XT(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:s}},KT=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},jT=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},XT=(n,e,r)=>{let t=K(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),s=U.computeStrides(e.dims);switch(r.mode){case"constant":return ZT(t,e.dims,s,o,i,r.pads,r.value);case"reflect":return JT(t,e.dims,s,o,i,r.pads);case"edge":return QT(t,e.dims,s,o,i,r.pads);default:throw new Error("Invalid mode")}},ZT=(n,e,r,t,o,i,s)=>{let a=e.length,u="";for(let l=a-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${r[l]};
        `;return`
      float padA(int m[${a}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},JT=(n,e,r,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${r[u]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},QT=(n,e,r,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${r[u]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `}});var Sd,$d,Ad,Od,Pd,Ed,Cd,Dd,kd,YT,Id,Bd,Co,zd,Eo,ew,Ld=v(()=>{"use strict";Ge();ge();le();Sd=(n,e,r)=>{Co(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>Ad(e,t,!1,r)},e)]},$d=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),s=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return se({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:s})},Ad=(n,e,r,t)=>{let[o,i]=kd(n,t,r),s=U.size(o.kernelShape),a="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let c=`
        ${zd(n[0].dims,o,a,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:c}},Od=(n,e,r)=>{Co(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>Ad(e,t,!0,r)},e)]},Pd=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return se({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},Ed=(n,e,r)=>{Co(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>Dd(e,t,!1,r)},e)]},Cd=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),s=n.attributes.getInt("storage_order",0),a=n.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return se({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:s,dilations:a})},Dd=(n,e,r,t)=>{let[o,i]=kd(n,t,r),l=`
      ${zd(n[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:l}},kd=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),s=e.strides.slice(),a=o?e.dilations.slice():[],u=e.pads.slice();hr.adjustPoolAttributes(r,t,i,s,a,u);let l=hr.computePoolOutputShape(r,t,s,a,i,u,e.autoPad),c=Object.assign({},e);return o?Object.assign(c,{kernelShape:i,strides:s,pads:u,dilations:a,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:i,strides:s,pads:u,cacheKey:e.cacheKey}),[c,l]},YT={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},Id={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},Bd=(n,e)=>(Co(e),[n.run({...Id,get:()=>Dd(e,Id,!0,YT)},e)]),Co=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},zd=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],a=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],c=n[i-1],f="",d="",p="";if(u+l!==0?f=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${r}
          }`:f=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            ${r}
          }`,e.kernelShape.length===2){let h=e.kernelShape[e.kernelShape.length-2],y=e.strides[e.strides.length-2],b=e.pads[e.pads.length/2-2],g=e.pads[e.pads.length-2],x=n[i-2];b+g!==0?d=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${y} - ${b} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${x}) {
                pad+= ${s};
                continue;
              }
          `:d=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${y} - ${b} + j;
            `,p=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${d}
          ${f}
          ${p}
          ${t}
          return value;
        }
      `}else{let s=U.size(e.kernelShape),a=U.computeStrides(e.kernelShape),u=a.length,l=e.pads.length,c=ew(u),f=Eo(n,"inputDims"),d=Eo(e.pads,"pads"),p=Eo(a,"kernelStrides"),m=Eo(e.strides,"strides"),h=e.pads.reduce((g,x)=>g+x),y="";return h?y=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${r}
          }`:y=`
          }
          ${r}
        `,`
        ${c}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${d}
          ${f}
          ${m}
          ${p}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${s}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${y}
          }
          ${t}

          return value;
        }
      `}},Eo=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
      ${e}[${t}] = ${n[t]};
    `;return r},ew=n=>`
  void offsetToIndices(int offset, int[${n}] strides, out int[${n}] indices) {
    if (${n} == 0) {
      return;
    }
    for (int i = 0; i < ${n} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${n} - 1] = offset;
  }`});var wr,Qt,tw,rw,Rd,Nd,Vd,Md,Fd,Ud,Gd,Wd=v(()=>{"use strict";Ge();Ln();ge();le();wr=(n,e,r,t,o)=>{rw(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>tw(n,e,r,t,o,i)},e)]},Qt=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return se({axes:e,keepDims:r})},tw=(n,e,r,t,o,i)=>{let s=[],a=e[0].dims.length||1,u=[],l=U.normalizeAxes(r.axes,e[0].dims.length),c=o(e,l),f=c[1];for(let m=0;m<e[0].dims.length;m++)l.indexOf(m)>=0||l.length===0?(r.keepDims&&s.push(1),f=`
          for(int j${m} = 0; j${m} < ${e[0].dims[m]}; j${m}++) {
            inputIdx[${m}] = j${m};
            ${f}
          }`):(u.push(`inputIdx[${m}] = outputIdx[${s.length}];`),s.push(e[0].dims[m]));let p=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${a}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${f}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:s,type:e[0].type,textureType:0},shaderSource:p}},rw=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(Jt.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Rd=(n,e,r)=>wr(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),Nd=(n,e,r)=>wr(n,e,r,"ReduceMean",(o,i)=>{let s=1;for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=o[0].dims[a]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),Vd=(n,e,r)=>wr(n,e,r,"ReduceMax",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),Md=(n,e,r)=>wr(n,e,r,"ReduceMin",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),Fd=(n,e,r)=>wr(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),Ud=(n,e,r)=>wr(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),Gd=(n,e,r)=>wr(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Hd,qd=v(()=>{"use strict";ge();Hd=(n,e)=>{let r=U.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var Kd,ba,jd,Xd,Rn,nw,ga,Do,ya=v(()=>{"use strict";Ge();$e();le();Kd={name:"Upsample",inputNames:["X"],inputTypes:[0]},ba=(n,e,r)=>(ga(e,r),[n.run({...Kd,cacheHint:r.cacheKey,get:()=>nw(n,e,r)},e)]),jd=n=>Rn(n,7),Xd=n=>Rn(n,9),Rn=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),Do(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),s=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let a=s==="tf_crop_and_resize",u=a,l=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=n.attributes.getFloat("cubic_coeff_a",-.75),f=n.attributes.getInt("exclude_outside",0)!==0;if(f&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let d=e<11?!0:t==="nearest"&&s==="asymmetric"&&l==="floor",p=0,m=0,h=0;return e>10?n.inputs.length>2?(p=1,m=2,h=3):(m=1,h=2):e===9&&(m=1),se({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:a,nearestMode:l,cubicCoefficientA:c,excludeOutside:f,useNearest2xOptimization:d,roiInputIdx:p,scalesInputIdx:m,sizesInputIdx:h})},nw=(n,e,r)=>{let t=K(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),s=e[0].dims.map((h,y)=>Math.floor(h*r.scales[y])),[a,u]=n.calculateTextureWidthAndHeight(s,0),l=s.length,c=new Array(l),f=new Array(l),d=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let h=l-1;h>=0;h--)c[h]=h===l-1?1:c[h+1]*s[h+1],f[h]=h===l-1?1:f[h+1]*e[0].dims[h+1],d+=`
        output_pitches[${h}] = ${c[h]};
        input_pitches[${h}] = ${f[h]};
        `;let p=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,m=r.mode==="nearest"?`
    ${p}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${d}

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
    ${p}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${d}

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
    ${p}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${d}

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
    }`;return{...Kd,output:{dims:s,type:e[0].type,textureType:0},shaderSource:m,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(h=>Math.ceil(h))}]}},ga=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},Do=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var xa,_a,Zd,Jd,ow,iw,sw,aw,Qd=v(()=>{"use strict";$e();le();Ot();xr();ya();xa={name:"Resize",inputNames:["A"],inputTypes:[2]},_a=(n,e,r)=>(ga(e,r),[n.run({...xa,cacheHint:r.cacheKey,get:()=>ow(n,e,r)},e)]),Zd=n=>Rn(n,10),Jd=n=>Rn(n,11),ow=(n,e,r)=>{let t=K(n.session.backend.glContext.version),[o,i]=iw(e,r);if(o.every(x=>x===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...xa,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let a=i.length;if(a<2)throw new Error(`output dimension should be at least 2, but got ${a}`);let u=i[a-2],l=i[a-1],c=e[0].dims;if(a!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${a}`);let f=c[a-2],d=c[a-1],p=o[a-2],m=o[a-1],h="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${d}.0 - 1.0, ${f}.0 - 1.0, ${d}.0 - 1.0,
                            ${f}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let y=Ze(a),b=Pt(),g=`
            const vec2 inputWH = vec2(${f}.0, ${d}.0);
            const vec4 scaleWHWH = vec4(float(${p}), float(${m}), float(${p}), float(${m}));
            ${b}
            ${h}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${y} rc = getOutputCoords();

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
        `;return{...xa,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:g}},iw=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let a=n[e.scalesInputIdx];if(a&&a.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=sw(a,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=aw(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=i||t.map((a,u)=>Math.floor(a*o[u]));return[o,s]},sw=(n,e,r)=>{let t=Array.from(n.floatData);return Do(t,e,r),t},aw=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let s=0,a=o;s<a;s++)if(e[s]===0){if(n[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[s]=1}else i[s]=n[s]/e[s];return Do(i,r,t),i}});var Yd,uw,ep=v(()=>{"use strict";yr();Yd=(n,e)=>(uw(e),[new Re([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),uw=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var Ta,tp,rp,np,lw,op,cw,fw,ip=v(()=>{"use strict";Ge();Ln();ge();le();Ta={name:"Slice",inputNames:["A"],inputTypes:[0]},tp=(n,e,r)=>(lw(e),[n.run({...Ta,cacheHint:r.cacheKey,get:()=>np(n,e[0],r)},e)]),rp=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return se({starts:e,ends:r,axes:t})},np=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((f,d)=>d):r.axes,o=U.normalizeAxes(t,e.dims.length),i=r.starts.map((f,d)=>f>e.dims[o[d]]-1?e.dims[o[d]]:U.normalizeAxis(f,e.dims[o[d]])),s=r.ends.map((f,d)=>f>e.dims[o[d]]-1?e.dims[o[d]]:U.normalizeAxis(f,e.dims[o[d]])),a=e.dims.slice(),u=[];for(let f=0;f<o.length;f++)a[o[f]]=s[f]-i[f],i[f]>0&&u.push(`outputIdx[${o[f]}] += ${i[f]};`);let c=`
      float process(int outputIdx[${a.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Ta,output:{dims:a,type:e.type,textureType:0},shaderSource:c}},lw=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(Jt.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},op=(n,e)=>{fw(e);let r=cw(n,e);return[n.run({...Ta,cacheHint:r.cacheKey,get:()=>np(n,e[0],r)},[e[0]])]},cw=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},fw=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var sp,ap,up,lp,cp,fp,dp,pp,dw,pw,mw,mp,hp=v(()=>{"use strict";Ge();ge();$e();le();Po();sp={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},ap={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},up={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},lp=(n,e,r)=>{mp(e);let t=e[0].dims.slice(),o=U.normalizeAxis(r.axis,t.length),i=U.sizeToDimension(t,o),s=U.sizeFromDimension(t,o);return pp(n,e,r,i,s)},cp=n=>se({axis:n.attributes.getInt("axis",1)}),fp=n=>se({axis:n.attributes.getInt("axis",-1)}),dp=(n,e,r)=>{mp(e);let t=e[0].dims.slice(),o=U.normalizeAxis(r.axis,t.length),i=t.length,s=o!==i-1,a=[],u=[],l=[],c;s&&(u=Array.from({length:i}).map((m,h)=>h),u[o]=i-1,u[i-1]=o,u.map(m=>a.push(t[m])),c=se({perm:u}),l=Tr(n,e,c));let f=s?U.sizeToDimension(a,i-1):U.sizeToDimension(t,i-1),d=s?U.sizeFromDimension(a,i-1):U.sizeFromDimension(t,i-1),p=pp(n,s?l:e,r,f,d);return s?Tr(n,p,c):p},pp=(n,e,r,t,o)=>{let i=dw(n,e[0],t,o,[t]),s=n.run({...sp,cacheHint:r.cacheKey,get:()=>i},e),a=pw(n,e[0],t,o,i.output.dims,[t]),u=n.run({...ap,cacheHint:r.cacheKey,get:()=>a},[e[0],s]),l=mw(n,e[0],t,o,i.output.dims,a.output.dims);return[n.run({...up,cacheHint:r.cacheKey,get:()=>l},[e[0],s,u])]},dw=(n,e,r,t,o)=>{let[i,s]=n.calculateTextureWidthAndHeight(e.dims,0),a=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=K(n.session.backend.glContext.version),l=`
      float process(int[${a}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${s} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...sp,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},pw=(n,e,r,t,o,i)=>{let[s,a]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=K(n.session.backend.glContext.version),c=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${a}))) - max);
        }

        return norm_factor;
      }`;return{...ap,output:{dims:i,type:e.type,textureType:0},shaderSource:c}},mw=(n,e,r,t,o,i)=>{let[s,a]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${a});

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
    }`;return{...up,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},mp=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var bp,gp,yp,hw,bw,gw,xp=v(()=>{"use strict";Ge();ge();le();bp={name:"Split",inputNames:["A"],inputTypes:[0]},gp=(n,e,r)=>{gw(e);let t=U.normalizeAxis(r.axis,e[0].dims.length),o=hw(n,e,t,r),i=[];for(let s=0;s<o;++s)i.push(n.run({...bp,cacheHint:`${r.cacheKey};${s}`,get:()=>bw(n,e[0],r,t,s)},e));return i},yp=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return se({axis:e,split:r,numOutputs:t})},hw=(n,e,r,t)=>{let[,o]=En.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},bw=(n,e,r,t,o)=>{let[i,s]=En.splitShape(e.dims,t,r.split,r.numOutputs),a=s[o],u=i[o],c=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${a};
        return _A(indices);
      }
    `;return{...bp,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:c}},gw=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var wa,_p,Tp,yw,xw,wp=v(()=>{"use strict";ge();wa=(n,e,r)=>{yw(e);let t=U.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},_p=(n,e)=>(xw(e),wa(n,[e[0]],Array.from(e[1].integerData))),Tp=n=>n.attributes.getInts("axes"),yw=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},xw=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var vp,_w,Tw,Ip=v(()=>{"use strict";$e();le();vp=(n,e)=>{Tw(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>_w(n,e,r)},e)]},_w=(n,e,r)=>{let t=K(n.session.backend.glContext.version),o=e[0].dims.slice(),s=`
      void main() {
        vec4 result = ${e.map((a,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:s}},Tw=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var Sp,ww,vw,$p=v(()=>{"use strict";Ln();le();Sp=(n,e)=>{vw(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>ww(n,e,r)},e)]},ww=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let s=o.length,a=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},vw=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(Jt.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var va,Ap,Op,Iw,Sw,Pp=v(()=>{"use strict";ge();va=(n,e,r)=>{Iw(e);let t=U.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Ap=(n,e)=>(Sw(e),va(n,[e[0]],Array.from(e[1].integerData))),Op=n=>n.attributes.getInts("axes"),Iw=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},Sw=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var Ep,Cp=v(()=>{"use strict";Mc();Yc();rf();lf();$o();qf();Qf();td();od();ud();fd();hd();xd();Ao();vd();Ld();Wd();qd();Qd();ep();ip();hp();xp();wp();Ip();$p();Po();sa();Pp();ya();Ep=[["Abs","","6+",cf],["Acos","","7+",ff],["Add","","7+",Fc],["And","","7+",Uc],["Asin","","7+",df],["Atan","","7+",pf],["AveragePool","","7+",Sd,$d],["BatchNormalization","","7+",Nc,Vc],["Cast","","6+",ef,tf],["Ceil","","6+",bf],["Clip","","6-10",oa,mf],["Clip","","11+",hf],["Concat","","4+",sf,uf],["Conv","","1+",da,pa],["ConvTranspose","","1+",Wf,Hf],["Cos","","7+",gf],["Div","","7+",Gc],["Dropout","","7+",ia],["DepthToSpace","","1+",Zf,Jf],["Equal","","7+",Wc],["Elu","","6+",yf,xf],["Exp","","6+",_f],["Flatten","","1+",Yf,ed],["Floor","","6+",Tf],["FusedConv","com.microsoft","1+",da,pa],["Gather","","1+",rd,nd],["Gemm","","7-10",ma,sd],["Gemm","","11+",ma,ad],["GlobalAveragePool","","1+",Od,Pd],["GlobalMaxPool","","1+",Bd],["Greater","","7+",Hc],["Identity","","1+",ia],["ImageScaler","","1+",ld,cd],["InstanceNormalization","","6+",pd,md],["LeakyRelu","","6+",wf,vf],["Less","","7+",qc],["LRN","","1+",bd,gd],["Log","","6+",If],["MatMul","","1+",Rf,Nf],["MaxPool","","1+",Ed,Cd],["Mul","","7+",Kc],["Neg","","6+",Sf],["Not","","1+",$f],["Or","","7+",jc],["Pad","","2-10",ha,_d],["Pad","","11+",Td,wd],["Pow","","7+",Xc],["PRelu","","7+",Zc],["ReduceLogSum","","1+",Ud,Qt],["ReduceMax","","1+",Vd,Qt],["ReduceMean","","1+",Nd,Qt],["ReduceMin","","1+",Md,Qt],["ReduceProd","","1+",Fd,Qt],["ReduceSum","","1-12",Rd,Qt],["ReduceSumSquare","","1+",Gd,Qt],["Relu","","6+",Af],["Reshape","","5+",Hd],["Resize","","10",_a,Zd],["Resize","","11+",_a,Jd],["Shape","","1+",Yd],["Sigmoid","","6+",Of],["Sin","","7+",Pf],["Slice","","10+",op],["Slice","","1-9",tp,rp],["Softmax","","1-12",lp,cp],["Softmax","","13+",dp,fp],["Split","","2-12",gp,yp],["Sqrt","","6+",Ef],["Squeeze","","1-12",wa,Tp],["Squeeze","","13+",_p],["Sub","","7+",Jc],["Sum","","6+",vp],["Tan","","7+",Cf],["Tanh","","6+",Df],["Tile","","6+",Sp],["Transpose","","1+",Tr,jf],["Upsample","","7-8",ba,jd],["Upsample","","9",ba,Xd],["Unsqueeze","","1-12",va,Op],["Unsqueeze","","13+",Ap],["Xor","","7+",Qc]]});function kp(n){let e={},r;for(;(r=Dp.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=$w.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let s=r[1],a=r[2],u=r[3].split(","),l=s?`${s} ${a};`:"",c=e[t].body,f="";e[t].params.forEach((p,m)=>{p&&(f+=`${p.type} ${p.name} = ${u[m]};
`)}),c=`${f}
 ${c}`,c=c.replace("return",`${a} = `);let d=`
      ${l}
      {
        ${c}
      }
      `;n=n.replace(r[0],d)}}return n=n.replace(Dp,""),n}var Dp,$w,Bp=v(()=>{"use strict";Dp=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,$w="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Hr(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:Aw(e,n).sort(),s=0;for(let a=0;a<n.length;++a){if(i!=null){if(i[s]===a&&n[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${n[a]}' is not 1`);(i[s]==null||i[s]>a)&&n[a]===1&&(r.push(n[a]),t.push(a)),i[s]<=a&&s++}n[a]!==1&&(r.push(n[a]),t.push(a))}return{newShape:r,keptDims:t}}function Aw(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),Vr(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),Vr(n.every(Ow),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function Ow(n){return n%1===0}function Pw(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function zp(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var ko,Ia=v(()=>{"use strict";st();ge();ko=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let a=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((l,c)=>l*c),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((l,c)=>l*c);if(a>o||u>o)ye.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[a,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((a,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=Hr(i).newShape);let s=Pw(i);return i.length<=1&&s<=o?[1,s]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?zp(s/4).map(a=>a*2):zp(s)}}});var Bo,Lp=v(()=>{"use strict";ge();Mt();$e();Ia();Ot();Bo=class extends ct{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new R(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new R(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(r,t);break;case 2:o[i]=this.getOutputPacked2DCoords(r,t);break;case 3:o[i]=this.getOutputPacked3DCoords(r,t);break;default:o[i]=this.getOutputPackedNDCoords(r,t)}let a=`
      void setOutput(vec4 val) {
        ${K(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new R(a),o}getUnpackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(r,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(r,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(r,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(r,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(r,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(r,t);break;default:throw new Error(`Unsupported output dimensionality: ${r.length}`)}let a=`
        void setOutput(float val) {
          ${K(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new R(a),o}getOutputScalarCoords(){return new R(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,r){let t=r,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new R(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new R(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new R(o))}getOutputPacked2DCoords(e,r){let t="";if(mr.arraysEqual(e,r))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${r[0]}, ${r[1]}));
        }
      `,new R(t);let o=r,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new R(t)}getOutputPacked3DCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),s=`
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
      `;return new R(s)}getOutputPackedNDCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),s=i,a="",u="b, r, c";for(let c=2;c<e.length-1;c++)s*=e[e.length-c-1],a=`
      int b${c} = index / ${s};
      index -= b${c} * ${s};
    `+a,u=`b${c}, `+u;let l=`
      ivec${e.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.y * ${t[0]} + resTexRC.x;

        ${a}

        int b = index / ${i};
        index -= b * ${i};

        // reverse r and c order for packed texture
        int r = imod(index, ${o}) * 2;
        int c = 2 * (index / ${o});

        return ivec${e.length}(${u});
      }
    `;return new R(l)}getOutputUnpacked1DCoords(e,r){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          return resTexRC.y * ${r[0]} + resTexRC.x;
        }
      `;return new R(t)}getOutputUnpacked2DCoords(e,r){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new R(t)}getOutputUnpacked3DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let s=["r","c","d"],a=i.map((u,l)=>{let c=`int ${s[l]} = index / ${u}`,f=l===i.length-1?`int ${s[l+1]} = index - ${s[l]} * ${u}`:`index -= ${s[l]} * ${u}`;return`${c}; ${f};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${a}
          return ivec3(r, c, d);
        }
      `,new R(t)}getOutputUnpacked4DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let s=["r","c","d","d2"],a=i.map((u,l)=>{let c=`int ${s[l]} = index / ${u}`,f=l===i.length-1?`int ${s[l+1]} = index - ${s[l]} * ${u}`:`index -= ${s[l]} * ${u}`;return`${c}; ${f};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${a}
          return ivec4(r, c, d, d2);
        }
      `,new R(t)}getOutputUnpacked5DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let s=["r","c","d","d2","d3"],a=i.map((u,l)=>{let c=`int ${s[l]} = index / ${u}`,f=l===i.length-1?`int ${s[l+1]} = index - ${s[l]} * ${u}`:`index -= ${s[l]} * ${u}`;return`${c}; ${f};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${a}
          return ivec5(r, c, d, d2, d3);
        }
      `,new R(t)}getOutputUnpacked6DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let s=["r","c","d","d2","d3","d4"],a=i.map((u,l)=>{let c=`int ${s[l]} = index / ${u}`,f=l===i.length-1?`int ${s[l+1]} = index - ${s[l]} * ${u}`:`index -= ${s[l]} * ${u}`;return`${c}; ${f};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${r[0]}, ${r[1]}));
         int index = resTexRC.y * ${r[0]} + resTexRC.x;
         ${a}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new R(t)}getCommonUtilFuncs(){let e={},r="uvFromFlat";e[r]=new R(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),r="packedUVfrom1D",e[r]=new R(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom2D",e[r]=new R(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom3D",e[r]=new R(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="sampleTexture";let t=K(this.context.glContext.version);return e[r]=new R(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},r=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],s=xo(t);i.isPacked?e[s]=this.getPackedSamplerFromInput(s,t,i):e[s]=this.getUnpackedSamplerFromInput(s,t,i);let a=wc(t);i.unpackedShape.length<=r.unpackedShape.length&&(i.isPacked?e[a]=this.getPackedSamplerAtOutputCoords(a,i,r,t):e[a]=this.getUnpackedSamplerAtOutputCoords(a,i,r,t))}),e}getPackedSamplerAtOutputCoords(e,r,t,o){let i=r.unpackedShape,s=t.unpackedShape,u=xo(o),l=i.length,c=s.length,f=Xe.getBroadcastDims(i,s),d=Ze(c),p=c-l,m,h=_t();l===0?m="":c<2&&f.length>=1?m="coords = 0;":m=f.map(P=>`coords.${h[P+p]} = 0;`).join(`
`);let y="";c<2&&l>0?y="coords":y=i.map((P,C)=>`coords.${h[C+p]}`).join(", ");let b="return outputValue;",x=U.size(i)===1,I=U.size(s)===1;if(l===1&&!x&&!I)b=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(x&&!I)c===1?b=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:b=`
          return vec4(outputValue.x);
        `;else if(f.length){let P=l-2,C=l-1;f.indexOf(P)>-1&&f.indexOf(C)>-1?b="return vec4(outputValue.x);":f.indexOf(P)>-1?b="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":f.indexOf(C)>-1&&(b="return vec4(outputValue.xx, outputValue.zz);")}let S=`
        int lastDim = coords.${h[c-1]};
        coords.${h[c-1]} = coords.${h[c-2]};
        coords.${h[c-2]} = lastDim;
      `,O=`
      vec4 ${e}() {
        ${d} coords = getOutputCoords();
        ${S}
        ${m}
        vec4 outputValue = ${u}(${y});
        ${b}
      }
    `;return new R(O,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,r,t,o){let i=[t.width,t.height],s=[r.width,r.height],a=r.unpackedShape.length,u=t.unpackedShape.length,l=r.unpackedShape,c=t.unpackedShape,f=xo(o);if(a===u&&mr.arraysEqual(s,i)){let x=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new R(x,["coordinates.sampleTexture"])}let d=Ze(u),p=Xe.getBroadcastDims(l,c),m=u-a,h,y=_t();a===0?h="":u<2&&p.length>=1?h="coords = 0;":h=p.map(x=>`coords.${y[x+m]} = 0;`).join(`
`);let b="";u<2&&a>0?b="coords":b=r.unpackedShape.map((x,T)=>`coords.${y[T+m]}`).join(", ");let g=`
        float ${e}() {
          ${d} coords = getOutputCoords();
          ${h}
          return ${f}(${b});
        }
      `;return new R(g,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,r,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,r);case 1:return this.getPackedSampler1D(e,r,t);case 2:return this.getPackedSampler2D(e,r,t);case 3:return this.getPackedSampler3D(e,r,t);default:return this.getPackedSamplerND(e,r,t)}}getUnpackedSamplerFromInput(e,r,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,r,t);case 1:return this.getUnpackedSampler1D(e,r,t);case 2:return this.getUnpackedSampler2D(e,r,t);case 3:return this.getUnpackedSampler3D(e,r,t);case 4:return this.getUnpackedSampler4D(e,r,t);case 5:return this.getUnpackedSampler5D(e,r,t);case 6:return this.getUnpackedSampler6D(e,r,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,r){let t=K(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${r}, halfCR);
          }
        `;return new R(o)}getPackedSampler1D(e,r,t){let o=[t.width,t.height],i=[o[1],o[0]],s=K(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${s.texture2D}(${r}, uv);
    }`;return new R(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],s=K(this.context.glContext.version),a=i[0],u=i[1];if(i!=null&&mr.arraysEqual(o,i)){let p=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${a}.0);
        return ${s.texture2D}(${r}, uv);
      }`;return new R(p)}let l=i,c=Math.ceil(o[1]/2),d=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l[1]}, ${l[0]}, ${c}, row, col);
      return ${s.texture2D}(${r}, uv);
    }`;return new R(d,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],s=[i[0],i[1]],a=K(this.context.glContext.version);if(o[0]===1){let m=o.slice(1),h=[1,2],y=Mr(o,m),b=["b","row","col"],g=JSON.parse(JSON.stringify(t));g.unpackedShape=y;let x=this.getPackedSamplerFromInput(e,r,g),I=`${x.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${Fr(b,h)});
      } `;return new R(I,x.dependencies)}let u=s[0],l=s[1],c=Math.ceil(o[2]/2),f=c*Math.ceil(o[1]/2),p=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${l}, ${u}, ${f}, ${c}, b, row, col);
      return ${a.texture2D}(${r}, uv);}`;return new R(p,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,r,t){let o=t.unpackedShape,i=o.length,s=[t.width,t.height],a=K(this.context.glContext.version),u=[s[0],s[1]],l=u[1],c=u[0],f=Math.ceil(o[i-1]/2),d=f*Math.ceil(o[i-2]/2),p="int b, int row, int col",m=`b * ${d} + (row / 2) * ${f} + (col / 2)`;for(let b=2;b<i-1;b++)p=`int b${b}, `+p,d*=o[i-b-1],m=`b${b} * ${d} + `+m;let y=`vec4 ${e}(${p}) {
      int index = ${m};
      int texR = index / ${c};
      int texC = index - texR * ${c};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${c}, ${l});
      return ${a.texture2D}(${r}, uv);
    }`;return new R(y)}getUnpackedSamplerScalar(e,r,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let a=`
          float ${e}() {
            return sampleTexture(${r}, halfCR);
          }
        `;return new R(a,["coordinates.sampleTexture"])}let s=`
        float ${e}() {
          int offset_${r} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${r});
          return sampleTexture(${r}, uv);
        }
      `;return new R(s,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,r,t){let o=t.width,i=t.height;if(i===1&&o===1){let a=`
        float ${e}(int index) {
          return sampleTexture(${r}, halfCR);
        }
      `;return new R(a,["coordinates.sampleTexture"])}if(i===1){let a=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new R(a,["coordinates.sampleTexture"])}if(o===1){let a=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new R(a,["coordinates.sampleTexture"])}let s=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new R(s,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&mr.arraysEqual(o,i)){let d=i[1],p=i[0],m=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${d}.0, ${p}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new R(m,["coordinates.sampleTexture"])}let{newShape:s,keptDims:a}=Hr(o),u=s;if(u.length<o.length){let d=Mr(o,u),p=JSON.parse(JSON.stringify(t));p.unpackedShape=d;let m=["col","row"],h=`
          ${this.getUnpackedSamplerFromInput(e,r,p).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${Fr(m,a)});
          }
        `;return new R(h,["coordinates.sampleTexture"])}let l=i[1],c=i[0];if(c===1){let d=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${l}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new R(d,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(l===1){let d=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${l}, ${c});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${c}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new R(d,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let f=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new R(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,r,t){let o=t.unpackedShape,i=o[1]*o[2],s=o[2],{newShape:a,keptDims:u}=Hr(o),l=a;if(l.length<o.length){let p=Mr(o,l),m=["batch","col","row"],h=JSON.parse(JSON.stringify(t));h.unpackedShape=p;let y=this.getUnpackedSamplerFromInput(e,r,h),b=u.reverse(),g=`
          ${y.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${Fr(m,b)});
          }
        `;return new R(g,y.dependencies)}let c=t.width,f=t.height,d=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${s} + row;
            vec2 uv = uvFromFlat(${c}, ${f}, index);
            return sampleTexture(${r}, uv);
          }
      `;return new R(d,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,r,t){let o=t.unpackedShape,i=o[3],s=o[2]*i,a=o[1]*s,u=t.width,l=t.height,c=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${a} + col * ${s} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${l}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new R(c,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,r,t){let o=t.unpackedShape,i=o[4],s=o[3]*i,a=o[2]*s,u=o[1]*a,{newShape:l,keptDims:c}=Hr(o);if(l.length<o.length){let m=Mr(o,l),h=["row","col","depth","depth2","depth3"],y=JSON.parse(JSON.stringify(t));y.unpackedShape=m;let b=`
          ${this.getUnpackedSamplerFromInput(e,r,y).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${Fr(h,c)});
          }
        `;return new R(b,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=t.width,d=t.height,p=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${a} + depth * ${s} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${f}, ${d}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new R(p,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,r,t){let o=t.unpackedShape,i=o[5],s=o[4]*i,a=o[3]*s,u=o[2]*a,l=o[1]*u,{newShape:c,keptDims:f}=Hr(o);if(c.length<o.length){let h=Mr(o,c),y=["row","col","depth","depth2","depth3","depth4"],b=JSON.parse(JSON.stringify(t));b.unpackedShape=h;let g=`
            ${this.getUnpackedSamplerFromInput(e,r,b).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${Fr(y,f)});
            }
          `;return new R(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let d=t.width,p=t.height,m=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${l} + col * ${u} + depth * ${a} +
            depth2 * ${s} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${d}, ${p}, index);
            return sampleTexture(${r}, uv);
          }
        `;return new R(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,r=e.shape.length,t=e.strides,o=e.width,i=e.height,s=[];for(let u=0;u<r-1;++u)s.push(`
        c[${u}] = offset / ${t[u]};`),s.push(`
        offset -= c[${u}] * ${t[u]};`);s.push(`
        c[${r-1}] = offset;`);let a=`
      void toVec(vec2 texCoords, out int c[${r}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${i});
        ${s.join("")}
      }
      void toVec(int offset, out int c[${r}]) {
        ${s.join("")}
      }
    `;return{toVec:new R(a,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t],s=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,a=`_${r}`;e[a]=new R(this.getValueFromSingle(r,s,o.width,o.height,!1),[`shapeUtils.indicesToOffset${a}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),a=a+"_T",e[a]=new R(this.getValueFromSingle(r,s,o.width,o.height,!0),[`shapeUtils.indicesToOffset${a}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,r,t,o,i){let s=`_${e}`;i&&(s=s+"_T");let a=K(this.context.glContext.version);return`
        float ${s}(int m[${r}]) {
          int offset = indicesToOffset${s}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${a.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,r,t,o,i){let s=`_${e}_Pack`;i&&(s=s+"_T");let a=K(this.context.glContext.version);return`
        vec4 ${s}(int m[${r}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${a.texture2D}(${e}, coords);
        }
        `}}});var zo,Rp=v(()=>{"use strict";Mt();zo=class n extends ct{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new R(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new R(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new R(`
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
        `)}}decodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new R(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Lo,Np=v(()=>{"use strict";Mt();$e();Lo=class extends ct{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=K(this.context.glContext.version);return{setFragColor:new R(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new R(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var Ro,Vp=v(()=>{"use strict";Mt();Ro=class n extends ct{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let s=i.length,a=e-s,u=`bcastIndices_${t}`,l="";for(let f=0;f<s;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${a+f}]), ${i[f]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
        }
        `;r[u]=new R(c)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let s=i.length,a=e-s,u=`bcastMatmulIndices_${t}`,l="";for(let f=0;f<s-2;++f)l+=`
          realIndices[${f}] = int( mod(float(bcastedIndices[${a+f}]), ${i[f]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
          realIndices[${s-1}] = bcastedIndices[${e-1}];
          realIndices[${s-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new R(c)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`indicesToOffset_${r}`;e[a]=new R(n.indexToOffsetSingle(a,s,i)),a=`indicesToOffset_${r}_T`,e[a]=new R(n.indexToOffsetSingle(a,s,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${r}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`offsetToIndices_${r}`;e[a]=new R(n.offsetToIndicesSingle(a,s,i)),a=`offsetToIndices_${r}_T`,e[a]=new R(n.offsetToIndicesSingle(a,s,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,r,t){let o=[];for(let i=0;i<r-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${r-1}] = offset;`),`
      void ${e}(int offset, out int indices[${r}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,s=`incrementIndices_${r}`,a="";for(let l=0;l<i;++l)a+=`
        shape[${l}] = ${o[l]};`;let u=`
        void ${s}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${a};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[s]=new R(u)}),e}}});var No,Mp=v(()=>{"use strict";Mt();No=class extends ct{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let s=`${i}Vec`,a="";for(let l=0;l<r;++l)a+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${s}(int src[${r}], out int dest[${r}]) {
          ${a}
        }
        `;o[s]=new R(u)}return o}copyVec(){let r=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<r;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${r}], out int dest[${r}]) {
        ${t}
      }
      `;return{copyVec:new R(o)}}setVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${r} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<r-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${r-1}] = value;
        `;let o=`
      void setVecItem(out int m[${r}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new R(o)}}getVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${r} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<r-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${r-1}];
        `;let o=`
      int getVecItem(int m[${r}], int index) {
        ${t}
      }
    `;return{getVecItem:new R(o)}}}});var Sa,Fp=v(()=>{"use strict";Lp();Rp();Np();Vp();Mp();Sa={encoding:zo,fragcolor:Lo,vec:No,shapeUtils:Ro,coordinates:Bo}});var Vo,Up=v(()=>{"use strict";Mt();Bp();Fp();$e();Vo=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new vo(e,r,t,o),Object.keys(Sa).forEach(s=>{let a=new Sa[s](this.context);this.libs[s]=a});let i=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let c=s+"."+l,f;i[c]?(f=i[c],f.routineBody=u[l].routineBody):(f=new zn(c,u[l].routineBody),i[c]=f);let d=u[l].dependencies;if(d)for(let p=0;p<d.length;++p)if(i[d[p]])f.addDependency(i[d[p]]);else{let m=new zn(d[p]);i[d[p]]=m,f.addDependency(m)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${Tc(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=kp(r),`${_c(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),Io.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var Mo,Gp=v(()=>{"use strict";qe();st();Up();$e();Mo=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(s){throw ye.error("ProgramManager",e.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new Vo(this.glContext,e,r,t),i=o.preprocess(),s=this.compile(i);return{programInfo:e,program:s,uniformLocations:this.getUniformLocations(s,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(e){if(!this.vertexShader){ye.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=xc(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}ee.debug&&ye.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;ye.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:s,type:a,location:u,arrayLength:l}of e){let c=r.find(f=>f.name===s)?.data;if(a!=="sampler2D"&&!c)throw new Error(`variable '${s}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,c):o.uniform1f(u,c);break;case"int":l?o.uniform1iv(u,c):o.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var Fo,Wp=v(()=>{"use strict";st();kn();Fo=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),s=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let a=r.width,u=r.height,l,c;if(this.config.reuseTextures){l=`${a}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let d=this.idleTextures.get(l);if(d&&d.length>0){let p=d.pop();return c.push(p),o===1&&this.glContext.updateTexture(p,a,u,s,this.toTextureData(e,t)),p}}ye.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let f=this.glContext.allocateTexture(a,u,s,this.toTextureData(e,t));return this.config.reuseTextures&&(c.push(f),this.textureLookup.set(f,l)),f}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((s,a)=>s*a)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(s=>i?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,c)=>l*c)*t;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),a=this.toTensorData(r,s),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let s=this.idleTextures.get(t);s||(s=[],this.idleTextures.set(t,s)),s.push(e.texture)}}}(!t||r)&&(ye.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var Uo,Hp=v(()=>{"use strict";st();el();Lc();Cp();Gp();Ia();Wp();Uo=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new ko(e.glContext.maxTextureSize),this.programManager=new Mo(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new Fo(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new wo(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){ye.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=Yu(e,r,Ep);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function Ew(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var Nn,qp=v(()=>{"use strict";qe();kn();kn();Ot();Nn=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,a),this.checkError(),s}updateTexture(e,r,t,o,i){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e);let a=o.encode(i,r*t);s.texSubImage2D(s.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,a),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,s){let a=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,s),l=u.allocate(r*t);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,r,t,a.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(ee.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new _o(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new Dn(this.gl,r):new Dn(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new To(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,s;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let a=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),s=e.createProgram(),!s)?!1:(e.attachShader(s,o),e.attachShader(s,i),e.linkProgram(s),e.useProgram(s),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),s&&e.deleteProgram(s),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await Zs(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=Ew(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await Zs(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function $a(n){let e;if((!n||n==="webgl2")&&"webgl2"in qr?e=qr.webgl2:(!n||n==="webgl")&&"webgl"in qr&&(e=qr.webgl),!e)try{let t=Dw();e=Kp(t,n)}catch{let o=Cw();e=Kp(o,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return qr[n]=e,r.isContextLost()?(delete qr[n],$a(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function Kp(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new Nn(t,2)}catch(i){ye.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new Nn(t,1)}catch(i){ye.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function Cw(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function Dw(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var qr,jp=v(()=>{"use strict";st();qp();qr={}});var Go,Xp=v(()=>{"use strict";qe();st();Hp();jp();Go=class{get contextId(){return ee.webgl.contextId}set contextId(e){ee.webgl.contextId=e}get matmulMaxBatchSize(){return ee.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){ee.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return ee.webgl.textureCacheMode}set textureCacheMode(e){ee.webgl.textureCacheMode=e}get pack(){return ee.webgl.pack}set pack(e){ee.webgl.pack=e}get async(){return ee.webgl.async}set async(e){ee.webgl.async=e}initialize(){try{return this.glContext=$a(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),ye.setWithEnv(ee),ee.webgl.context||Object.defineProperty(ee.webgl,"context",{value:this.glContext.gl}),ye.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return ye.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new Uo(this,e)}dispose(){this.glContext.dispose()}}});async function Aa(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=Zp.get(r);if(t)return t;let o=await Bw(r);if(o)return o}}else return Aa(["webgl"]);throw new Error("no available backend to use")}async function Bw(n){let e=kw;if(typeof e[n]<"u"&&zw(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Zp.set(n,r),r}}function zw(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Zp,kw,Jp=v(()=>{"use strict";Xp();Zp=new Map,kw={webgl:new Go}});var Oa,Wo,Qp=v(()=>{"use strict";st();Oa=class{constructor(e,r){this.op=e;this.node=r}},Wo=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Oa(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let s of t.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((c,f)=>{let d=o[f];this._values[d]=c});let i=this._starter.slice(0),s=this.graph.getValues(),a=this.graph.getNodes(),u=0;for(;u<i.length;){let c=i[u++],f=this._ops[c],d=f.node.inputs.map(y=>this._values[y]);if(d.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${f.node}`);let p=d;ye.verbose("ExecPlan",`Running op:${f.node.name} (${p.map((y,b)=>`'${f.node.inputs[b]}': ${y.type}[${y.dims.join(",")}]`).join(", ")})`);let m=await this.profiler.event("node",f.node.name,async()=>f.op.impl(t,p,f.op.context));if(m.length!==f.node.outputs.length)throw new Error("the size of output does not match model definition.");m.forEach((y,b)=>{let g=f.node.outputs[b];if(this._values[g])throw new Error(`output [${g}] already has value: op:${f.node.name}`);this._values[g]=y});let h=new Set;m.forEach((y,b)=>{let g=f.node.outputs[b];for(let x of s[g].to){let T=a[x],I=!0;for(let S of T.inputs)if(!this._values[S]){I=!1;break}I&&h.add(x)}}),i.push(...h)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let f=this.graph.getOutputIndices()[c],d=this._values[f];if(d===void 0)throw new Error(`required output [${f}] does not have value`);f===0?await d.getData():d.data,l.push(d)}return ye.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var ue,Vn,Yp=v(()=>{"use strict";$n();ue=Er(Nr());yr();ge();Vn=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof ue.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof Kt&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof ue.onnx.AttributeProto?e.type:e.type();switch(r){case ue.onnx.AttributeProto.AttributeType.FLOAT:return"float";case ue.onnx.AttributeProto.AttributeType.INT:return"int";case ue.onnx.AttributeProto.AttributeType.STRING:return"string";case ue.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case ue.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case ue.onnx.AttributeProto.AttributeType.INTS:return"ints";case ue.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case ue.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${ue.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof ue.onnx.AttributeProto?e.type:e.type();if(r===ue.onnx.AttributeProto.AttributeType.GRAPH||r===ue.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===ue.onnx.AttributeProto.AttributeType.INT&&et.isLong(t))return et.longToNumber(t);if(r===ue.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let s=0;s<o.length;s++){let a=o[s];i[s]=et.longToNumber(a)}return i}if(r===ue.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof ue.onnx.AttributeProto?Re.fromProto(t):Re.fromOrtTensor(t);if(r===ue.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof ue.onnx.AttributeProto)return t.map(i=>Re.fromProto(i));if(e instanceof Kt)return t.map(i=>Re.fromOrtTensor(i))}return r===ue.onnx.AttributeProto.AttributeType.STRING&&e instanceof ue.onnx.AttributeProto?Cn(t):r===ue.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof ue.onnx.AttributeProto?t.map(Cn):t}static getValueNoCheck(e){return e instanceof ue.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case ue.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case ue.onnx.AttributeProto.AttributeType.INT:return e.i;case ue.onnx.AttributeProto.AttributeType.STRING:return e.s;case ue.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case ue.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case ue.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case ue.onnx.AttributeProto.AttributeType.INTS:return e.ints;case ue.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case ue.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case ue.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${ue.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case 1:return e.f();case 2:return e.i();case 3:return e.s();case 4:return e.t();case 5:return e.g();case 6:return e.floatsArray();case 7:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case 8:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case 9:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${on[e.type()]}`)}}}});var Ea,Ca,Ct,Ho,Pa,em=v(()=>{"use strict";Yp();$n();Ea=Er(Nr());yr();ge();Ca={from:(n,e)=>new Pa(n,e)},Ct=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=He.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},Ho=class{constructor(e,r){e instanceof Ea.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new Vn(e.attribute)):e instanceof cr&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new Vn(He.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Pa=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Ea.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof $t)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let s=this._allData.push(new Ct(i))-1;r.set(i.name,s),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let s=r.get(i.name);if(s===void 0){let a=new Ct;a.type={shape:{dims:He.tensorDimsFromProto(i.dims)},tensorType:He.tensorDataTypeFromProto(i.dataType)},s=this._allData.push(a)-1,r.set(i.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=Re.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let s=this._allData.push(new Ct(i))-1;r.set(i.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let a=0;;a++){let u=`unnamed_${i.opType}_${a}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let s=this._nodes.push(new Ho(i))-1;t.set(i.name,s)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.output)throw new Error(`missing output for node: ${a.name}`);for(let u of a.output){let l=r.get(u);if(typeof l>"u"&&(l=this._allData.push(new Ct)-1,r.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,a.opType==="Constant"){if(!a.attribute||a.attribute.length!==1||!a.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!a.output||a.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=Re.fromProto(a.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.input)throw new Error(`missing input for node: ${a.name}`);for(let u of a.input){let l=r.get(u);if(typeof l>"u"){if(u===""&&(a.input.length===3||a.input.length===4)&&a.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${a.name}`)}s.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let s=e.inputs(i);if(r.has(s))throw new Error(`duplicated input name: ${s}`);for(let a=0;a<e.nodeArgsLength();a++)if(e.nodeArgs(a)?.name()===s){let u=new Ct;if(e.nodeArgs(a)?.type()?.valueType()!==1)throw new Error("Unexpected value type for the nodeArg.");let c=e.nodeArgs(a).type().value(new Lr),f=He.tensorDataTypeFromProto(c.elemType()),d=c.shape(),p=[];for(let h=0;h<d.dimLength();h++)p.push(et.longToNumber(d.dim(h).value().dimValue()));u.type={shape:{dims:p},tensorType:f};let m=this._allData.push(u)-1;r.set(s,m),o.push(s)}}for(let i=0;i<e.initializersLength();i++){let s=e.initializers(i),a=r.get(s.name());if(a===void 0){let u=new Ct,l=He.tensorDimsFromORTFormat(s),c=He.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:c},a=this._allData.push(u)-1,r.set(s.name(),a)}this._allData[a]._from=-1,this._allData[a].tensor=Re.fromOrtTensor(s)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let s=e.outputs(i);if(r.has(s))throw new Error(`duplicated output name: ${s}`);let a=this._allData.push(new Ct)-1;r.set(s,a),this._allOutputIndices.push(a),this._allOutputNames.push(s)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let s=e.nodes(i),a=s.name();if(!a)for(let l=0;a=`unnamed_${s.opType()}_${l}`,!!t.has(a);l++);if(t.has(a))throw new Error(`duplicated node name: ${a}`);let u=this._nodes.push(new Ho(s,a))-1;t.set(a,u)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a==null)throw new Error(`No node exists at index ${i}`);if(a?.outputsLength()===0)throw new Error(`missing output for node: ${a.name}`);for(let u=0;u<a?.outputsLength();u++){let l=a?.outputs(u),c=r.get(l);if(typeof c>"u"&&(c=this._allData.push(new Ct)-1,r.set(l,c)),s.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,a.opType()==="Constant"){if(a.attributesLength()!==1||!a.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(a.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=Re.fromOrtTensor(a.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a.inputsLength()===0)throw new Error(`missing input for node: ${a.name}`);for(let u=0;u<a.inputsLength();u++){let l=a.inputs(u),c=r.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${a.name()}`);s.inputs.push(c),this._allData[c]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(s=>{e.add(s)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let s=this._allData[i];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(a=>{if(t[a]==="gray")throw new Error("model graph is cyclic");t[a]==="white"&&r.push(a)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let s=0;s<i._to.length;s++)if(i._to[s]>=0)i._to[s]=r[i._to[s]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(s=>{i=this._nodes[s].inputs.indexOf(o+e),i!==-1&&(this._nodes[s].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let a=1;a<r.outputs.length;a++)if(this._allData[r.outputs[a]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let a=0;a<r.inputs.length;a++){let u=this._allData[r.inputs[a]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[a]].to.splice(u,1)}this._allData[o]._to=[];let s=this._allOutputIndices.indexOf(o);if(s!==-1&&(this._allOutputIndices[s]=t),i&&i.length>0)for(let a of i){let u=this._nodes[a].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[a].inputs[u]=t,this._allData[t].to.push(a)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[br,gr])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var tm,qo,rm=v(()=>{"use strict";be();em();$n();tm=Er(Nr());ge();qo=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=tm.onnx.ModelProto.decode(e);if(et.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:et.longToNumber(i.version)})),this._graph=Ca.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new Br(e),o=Sn.getRootAsInferenceSession(t).model();if(et.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<o.opsetImportLength();s++){let a=o.opsetImport(s);this._opsets.push({domain:a?.domain(),version:et.longToNumber(a.version())})}this._graph=Ca.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var Ko,nm=v(()=>{"use strict";Jp();Qp();st();rm();Ko=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=so.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Aa(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new qo,typeof e=="string"){let i=e.endsWith(".ort");{let a=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(a),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new Wo(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let s=e.get(r[i]);if(!s)throw new Error(`missing input tensor for: '${name}'`);t[o++]=s}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let s=0;s<t.length;++s){let a=o[t[s]];i[s]=a.type.shape.dims,this.context.graphInputTypes.push(a.type.tensorType),this.context.graphInputDims.push(e[s].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],s=r[o].dims;if(!this.compareTensorDims(i,s,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var jo,om=v(()=>{"use strict";qe();yr();jo=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,r,t){let o=new Map;for(let a in e)if(Object.hasOwnProperty.call(e,a)){let u=e[a];o.set(a,new Re(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),s={};return i.forEach((a,u)=>{s[u]=new nt(a.type,a.data,a.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var im={};Yr(im,{onnxjsBackend:()=>Lw});var Da,Lw,sm=v(()=>{"use strict";nm();om();Da=class{async init(){}async createInferenceSessionHandler(e,r){let t=new Ko(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new jo(t)}},Lw=new Da});var Xo=v(()=>{"use strict"});var lm={};Yr(lm,{default:()=>Rw});var am,um,Rw,cm=v(()=>{"use strict";ka();Yt();Zo();am="ort-wasm-proxy-worker",um=globalThis.self?.name===am;um&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":Jo(r.wasm).then(()=>{Qo(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;Yo(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=Mn(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;ei(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":ti(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:s,options:a}=r;ri(t,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},oi([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":ni(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});Rw=um?null:n=>new Worker(n??it,{type:"module",name:am})});var pm,Nw,it,ii,Ba,Vw,Mw,mm,Fw,fm,hm,dm,bm,Zo=v(()=>{"use strict";Xo();pm=typeof location>"u"?void 0:location.origin,Nw=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.all.min.mjs",import.meta.url).href,pm).href:import.meta.url},it=Nw(),ii=()=>{if(it&&!it.startsWith("blob:"))return it.substring(0,it.lastIndexOf("/")+1)},Ba=(n,e)=>{try{let r=e??it;return(r?new URL(n,r):new URL(n)).origin===pm}catch{return!1}},Vw=(n,e)=>{let r=e??it;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},Mw=(n,e)=>`${e??"./"}${n}`,mm=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Fw=async n=>(await import(/*webpackIgnore:true*/n)).default,fm=(cm(),Jn(lm)).default,hm=async()=>{if(!it)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ba(it))return[void 0,fm()];let n=await mm(it);return[n,fm(n)]},dm=void 0,bm=async(n,e,r)=>{if(!n&&!e&&dm&&it&&Ba(it))return[void 0,dm];{let t="ort-wasm-simd-threaded.jsep.mjs",o=n??Vw(t,e),i=!!1&&r&&o&&!Ba(o,e),s=i?await mm(o):o??Mw(t,e);return[i?s:void 0,await Fw(s)]}}});var za,La,si,gm,Uw,Gw,Jo,Ee,Yt=v(()=>{"use strict";Zo();La=!1,si=!1,gm=!1,Uw=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Gw=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Jo=async n=>{if(La)return Promise.resolve();if(si)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(gm)throw new Error("previous call to 'initializeWebAssembly()' failed.");si=!0;let e=n.initTimeout,r=n.numThreads;if(!Gw())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=Uw();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,l=u?.href??u,c=n.wasmBinary,[f,d]=await bm(a,i,r>1),p=!1,m=[];if(e>0&&m.push(new Promise(h=>{setTimeout(()=>{p=!0,h()},e)})),m.push(new Promise((h,y)=>{let b={numThreads:r};if(c)b.wasmBinary=c;else if(l||i)b.locateFile=g=>l??i+g;else if(a&&a.indexOf("blob:")!==0)b.locateFile=g=>new URL(g,a).href;else if(f){let g=ii();g&&(b.locateFile=x=>g+x)}d(b).then(g=>{si=!1,La=!0,za=g,h(),f&&URL.revokeObjectURL(f)},g=>{si=!1,gm=!0,y(g)})})),await Promise.race(m),p)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Ee=()=>{if(La&&za)return za;throw new Error("WebAssembly is not initialized yet.")}});var Ve,Fn,ce,ai=v(()=>{"use strict";Yt();Ve=(n,e)=>{let r=Ee(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},Fn=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let s=e?e+o:o;if(typeof i=="object")Fn(i,s+".",r,t);else if(typeof i=="string"||typeof i=="number")t(s,i.toString());else if(typeof i=="boolean")t(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},ce=n=>{let e=Ee(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),s=e.getValue(o+t,"*"),a=s?e.UTF8ToString(s):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`)}finally{e.stackRestore(r)}}});var ym,xm=v(()=>{"use strict";Yt();ai();ym=n=>{let e=Ee(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=Ve(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&ce("Can't create run options."),n?.extra!==void 0&&Fn(n.extra,"",new WeakSet,(s,a)=>{let u=Ve(s,t),l=Ve(a,t);e._OrtAddRunConfigEntry(r,u,l)!==0&&ce(`Can't set a run config entry: ${s} - ${a}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(s=>e._free(s)),i}}});var Ww,Hw,qw,Kw,_m,Tm=v(()=>{"use strict";Yt();ai();Ww=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},Hw=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},qw=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},Kw=(n,e,r)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let a=t?.deviceType;if(a){let u=Ve("deviceType",r),l=Ve(a,r);Ee()._OrtAddSessionConfigEntry(n,u,l)!==0&&ce(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let s=t;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=Ve("preferredLayout",r),u=Ve(s.preferredLayout,r);Ee()._OrtAddSessionConfigEntry(n,a,u)!==0&&ce(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Ve(o,r);Ee()._OrtAppendExecutionProvider(n,i)!==0&&ce(`Can't append execution provider: ${o}.`)}},_m=n=>{let e=Ee(),r=0,t=[],o=n||{};qw(o);try{let i=Ww(o.graphOptimizationLevel??"all"),s=Hw(o.executionMode??"sequential"),a=typeof o.logId=="string"?Ve(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?Ve(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,c),r===0&&ce("Can't create session options."),o.executionProviders&&Kw(r,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let f=Ve("enableGraphCapture",t),d=Ve(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(r,f,d)!==0&&ce(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[f,d]of Object.entries(o.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof d!="number"||!Number.isInteger(d)||d<0)throw new Error(`free dimension override value must be a non-negative integer: ${d}`);let p=Ve(f,t);e._OrtAddFreeDimensionOverride(r,p,d)!==0&&ce(`Can't set a free dimension override: ${f} - ${d}.`)}return o.extra!==void 0&&Fn(o.extra,"",new WeakSet,(f,d)=>{let p=Ve(f,t),m=Ve(d,t);e._OrtAddSessionConfigEntry(r,p,m)!==0&&ce(`Can't set a session config entry: ${f} - ${d}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&ce("Can't release session options."),t.forEach(s=>e._free(s)),i}}});var Kr,er,tr,ui,Un,li,ci,Ra,Z=v(()=>{"use strict";Kr=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},er=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},tr=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},ui=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},Un=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},li=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",ci=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",Ra=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var Gn,Na=v(()=>{"use strict";Xo();Gn=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=Ui("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Ui("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(a){if(a instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let l=u.byteLength;new Uint8Array(i,s,l).set(u),s+=l}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var jw,Xw,wm,vm,fi,Zw,ie,Dt=v(()=>{"use strict";Z();jw=["V","I","W","E","F"],Xw=(n,e)=>{console.log(`[${jw[n]},${new Date().toISOString()}]${e}`)},fi=(n,e)=>{wm=n,vm=e},Zw=(n,e)=>{let r=Un(n),t=Un(wm);r>=t&&Xw(r,typeof e=="function"?e():e)},ie=(...n)=>{vm&&Zw(...n)}});var di,Va=v(()=>{"use strict";Z();di=(n,e)=>new(ui(e))(n)});var pi=v(()=>{"use strict"});var Im,Ma,Fa,Jw,Qw,Sm,Ga,Ua,Am,Om=v(()=>{"use strict";Dt();pi();Im=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ma=[],Fa=n=>Math.ceil(Number(n)/16)*16,Jw=n=>{for(let e=0;e<Ma.length;e++){let r=Ma[e];if(n<=r)return r}return Math.ceil(n/16)*16},Qw=1,Sm=()=>Qw++,Ga=async(n,e,r,t)=>{let o=Fa(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=n.getCommandEncoder();n.endComputePass(),s.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(a,0,r)),u}else return new Uint8Array(a.slice(0,r))}finally{i.destroy()}},Ua=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Im)Ma.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,s=Fa(i),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let c=this.backend.device.createCommandEncoder();c.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([c.finish()]),u.destroy(),ie("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Fa(t.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Sm();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),ie("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ie("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=Jw(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let a={id:Sm(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),ie("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ie("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await Ga(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=Im.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ie("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Am=(...n)=>new Ua(...n)});var Wa,J,Ae=v(()=>{"use strict";Wa=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},J=n=>new Wa(n)});var Ha,kt,$,Ir,mi,Pm,Em,te=v(()=>{"use strict";Ha=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},kt=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let s=Math.max(e.length,r.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Ha.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:r[i-u];if(l!==c&&l>1&&c>1)return;let f=Math.max(l,c);if(l&&c)a[s-u]=Math.max(l,c);else{if(f>1)return;a[s-u]=0}}return a}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},$=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},Ir=class n{static adjustPoolAttributes(e,r,t,o,i,s){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<r.length-2;a++)a>=t.length?t.push(r[a+2]):t[a]=r[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,s,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(s?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,s,a){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,s,a),u}static computeConvOutputShape(e,r,t,o,i,s,a){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,r,t,o,i,s,a,u){if(e)for(let l=0;l<r.length-2;l++)t.push(1);else for(let l=0;l<r.length-2;l++)t.push(n.adjustPadAndReturnShape(r[l+2],o[l],i[l],s[l],a,l,l+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((e+r-1)/r-1)*r+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(f+1)/2:f/2),i[a]=f-i[s],Math.floor((e+f-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/r+1)}},mi=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;r?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!kt.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},Pm=-34028234663852886e22,Em=34028234663852886e22});var Sr,Ka,_e,Me,k,fe,ja,$r,Tt,V,hi,A,E,Cm,bi,qa,Dm,ne=v(()=>{"use strict";Z();te();Sr=64,Ka=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},_e=(n,e=1)=>{let r=Ka(n,e);return typeof r=="string"?r:r[0]},Me=(n,e=1)=>{let r=Ka(n,e);return typeof r=="string"?r:r[1]},k=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:$.computeStrides(r)})}),e},fe=n=>n%4===0?4:n%2===0?2:1,ja=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,$r=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,Tt=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,V=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,hi=(n,e,r,t,o)=>{let i=typeof r=="number",s=i?r:r.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Ka(e,o),c=typeof l=="string"?l:l[1],f=typeof l=="string"?l:l[0],d={indices:u,value:c,storage:f,tensor:e},p=D=>typeof D=="string"?D:`${D}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",y=`${h}${n}_shape`,b=`${h}${n}_strides`,g="";for(let D=0;D<s-1;D++)g+=`
    let dim${D} = current / ${V(b,D,s)};
    let rest${D} = current % ${V(b,D,s)};
    indices[${D}] = dim${D};
    current = rest${D};
    `;g+=`indices[${s-1}] = current;`;let x=s<2?"":`
  fn o2i_${n}(offset: u32) -> ${d.indices} {
    var indices: ${d.indices};
    var current = offset;
    ${g}
    return indices;
  }`,T=D=>(m.offsetToIndices=!0,s<2?D:`o2i_${n}(${D})`),I=[];if(s>=2)for(let D=s-1;D>=0;D--)I.push(`${V(b,D,s)} * (indices[${D}])`);let S=s<2?"":`
  fn i2o_${n}(indices: ${d.indices}) -> u32 {
    return ${I.join("+")};
  }`,O=D=>(m.indicesToOffset=!0,s<2?D:`i2o_${n}(${D})`),P=(...D)=>s===0?"0u":`${d.indices}(${D.map(p).join(",")})`,C=(D,W)=>s<2?`${D}`:`${V(D,W,s)}`,N=(D,W,Te)=>s<2?`${D}=${Te};`:`${V(D,W,s)}=${Te};`,F={},H=(D,W)=>{m.broadcastedIndicesToOffset=!0;let Te=`${W.name}broadcastedIndicesTo${n}Offset`;if(Te in F)return`${Te}(${D})`;let Gt=[];for(let Ce=s-1;Ce>=0;Ce--){let De=W.indicesGet("outputIndices",Ce+W.rank-s);Gt.push(`${C(b,Ce)} * (${De} % ${C(y,Ce)})`)}return F[Te]=`fn ${Te}(outputIndices: ${W.type.indices}) -> u32 {
             return ${Gt.length>0?Gt.join("+"):"0u"};
           }`,`${Te}(${D})`},L=(D,W)=>(()=>{if(d.storage===d.value)return`${n}[${D}]=${W};`;if(d.storage==="vec2<u32>"&&d.value==="i32")return`${n}[${D}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(d.storage==="vec2<u32>"&&d.value==="u32")return`${n}[${D}]=vec2<u32>(u32(${W}), 0u);`;if(d.storage==="u32"&&d.value==="vec4<bool>")return`${n}[${D}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),Q=D=>(()=>{if(d.storage===d.value)return`${n}[${D}]`;if(d.storage==="vec2<u32>"&&d.value==="i32")return`i32(${n}[${D}].x)`;if(d.storage==="vec2<u32>"&&d.value==="u32")return`u32(${n}[${D}].x)`;if(d.storage==="u32"&&d.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${D}] & 0xFFu), bool(${n}[${D}] & 0xFF00u), bool(${n}[${D}] & 0xFF0000u), bool(${n}[${D}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${d.storage} and value type ${d.value} yet`)})(),Se=s<2?"":`
  fn get_${n}ByIndices(indices: ${d.indices}) -> ${c} {
    return ${Q(`i2o_${n}(indices)`)};
  }`,M=s<2?"":(()=>{let D=a.map(Te=>`d${Te}: u32`).join(", "),W=a.map(Te=>`d${Te}`).join(", ");return`
  fn get_${n}(${D}) -> ${c} {
    return get_${n}ByIndices(${P(W)});
  }`})(),G=(...D)=>{if(D.length!==s)throw new Error(`indices length must be ${s}`);let W=D.map(p).join(",");return s===0?Q("0u"):s===1?Q(W[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${n}(${W})`)},oe=D=>s<2?Q(D):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${n}ByIndices(${D})`),X=s<2?"":`
  fn set_${n}ByIndices(indices: ${d.indices}, value: ${c}) {
    ${L(`i2o_${n}(indices)`,"value")}
  }`,Oe=s<2?"":(()=>{let D=a.map(Te=>`d${Te}: u32`).join(", "),W=a.map(Te=>`d${Te}`).join(", ");return`
  fn set_${n}(${D}, value: ${c}) {
    set_${n}ByIndices(${P(W)}, value);
  }`})();return{impl:()=>{let D=[],W=!1;return m.offsetToIndices&&(D.push(x),W=!0),m.indicesToOffset&&(D.push(S),W=!0),m.broadcastedIndicesToOffset&&(Object.values(F).forEach(Te=>D.push(Te)),W=!0),m.set&&(D.push(Oe),W=!0),m.setByIndices&&(D.push(X),W=!0),m.get&&(D.push(M),W=!0),m.getByIndices&&(D.push(Se),W=!0),!i&&W&&D.unshift(`const ${y} = ${d.indices}(${r.join(",")});`,`const ${b} = ${d.indices}(${$.computeStrides(r).join(",")});`),D.join(`
`)},type:d,offsetToIndices:T,indicesToOffset:O,broadcastedIndicesToOffset:H,indices:P,indicesGet:C,indicesSet:N,set:(...D)=>{if(D.length!==s+1)throw new Error(`indices length must be ${s}`);let W=D[s];if(typeof W!="string")throw new Error("value must be string");let Te=D.slice(0,s).map(p).join(",");return s===0?L("0u",W):s===1?L(Te[0],W):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${n}(${Te}, ${W})`)},setByOffset:L,setByIndices:(D,W)=>s<2?L(D,W):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${n}ByIndices(${D}, ${W});`),get:G,getByOffset:Q,getByIndices:oe,usage:t,name:n,strides:b,shape:y,rank:s}},A=(n,e,r,t=1)=>hi(n,e,r,"input",t),E=(n,e,r,t=1)=>hi(n,e,r,"output",t),Cm=(n,e,r)=>hi(n,e,r,"atomicOutput",1),bi=(n,e,r,t=1)=>hi(n,e,r,"internal",t),qa=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Sr){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*t*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${t}, ${o})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(e,r,t=1){return this.uniforms.push({name:e,type:r,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:r,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${r}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${r}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${r}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},Dm=(n,e)=>new qa(n,e)});var Yw,km,ev,tv,rv,nv,Fe,Bm,zm,Ft=v(()=>{"use strict";Z();te();Ae();ne();Yw=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},km=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),ev=(n,e)=>$.sortBasedOnPerm(n,km(n.length,e)),tv=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},rv=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},nv=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},Fe=(n,e)=>{let r=n.dataType,t=n.dims.length,o=km(t,e),i=ev(n.dims,o),s=n.dims,a=i,u=t<2||nv(o,n.dims),l;if(u)return l=h=>{let y=A("input",r,s,4),b=E("output",r,a,4);return`
  ${h.registerUniform("output_size","u32").declareVariables(y,b)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let h=$.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(h/4)}]}},getShaderSource:l};let{newShape:c,newPerm:f}=rv(n.dims,o),d=$.areEqual(f,[2,3,1]),p=$.areEqual(f,[3,1,2]);if(c.length===2||d||p){s=d?[c[0],c[1]*c[2]]:p?[c[0]*c[1],c[2]]:c,a=[s[1],s[0]];let h=16;return l=y=>{let b=A("a",r,s.length),g=E("output",r,a.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(b,g)}
  var<workgroup> tile : array<array<${g.type.value}, ${h+1}>, ${h}>;
  ${y.mainStart([h,h,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${h} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${h}u + local_id.x;
    let input_row = workgroup_id_x * ${h}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${b.getByIndices(`${b.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${h}u + local_id.x;
    let output_row = workgroup_id_y * ${h}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${g.setByIndices(`${g.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=$.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(a[1]/h),y:Math.ceil(a[0]/h)},programUniforms:[{type:12,data:y},...k(s,a)]}},getShaderSource:l}}return l=h=>{let y=A("a",r,s.length),b=E("output",r,a.length);return`
  ${h.registerUniform("output_size","u32").declareVariables(y,b)}

  ${tv(o,t,y,b)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let h=$.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...k(s,a)]}},getShaderSource:l}},Bm=(n,e)=>{Yw(n.inputs,e.perm),n.compute(Fe(n.inputs[0],e.perm))},zm=n=>J({perm:n.perm})});var ov,iv,sv,av,uv,lv,cv,fv,dv,pv,Bt,Lm,Rm,Nm,Vm,Mm,Fm,Um,Gm,Wm,Hm,qm=v(()=>{"use strict";Z();te();ne();gi();Ft();ov={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},iv={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},sv={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},av={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},uv=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},lv=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},cv=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},fv=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},dv=(n,e)=>{let r=[];if(!fv(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},pv=(n,e,r,t,o,i,s)=>{let a=r[0].dims,u=$.size(i),l=$.size(s),c=A("_A",r[0].dataType,a),f=E("output",o,i),d=64;u===1&&(d=256);let p=`
          var<workgroup> aBestValues : array<f32, ${d}>;
       `,m=h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${p}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(d)}

          let outputIndex = global_idx / ${d};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${sv[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${d}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${ov[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${d}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${iv[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${t==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${av[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${d}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Bt=(n,e,r,t)=>{let o=n.inputs.length===1?r:Xa(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((p,m)=>m));let s=$.normalizeAxes(i,n.inputs[0].dims.length),a=s,u=n.inputs[0],l=dv(a,n.inputs[0].dims.length);l.length>0&&(u=n.compute(Fe(n.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=uv(a.length,u.dims.length));let[c,f]=lv(u.dims,a),d=c;o.keepDims&&(d=cv(c,s)),n.compute(pv(e,o.cacheKey,[u],t,n.inputs[0].dataType,d,f),{inputs:[u]})},Lm=(n,e)=>{Bt(n,"ReduceMeanShared",e,"mean")},Rm=(n,e)=>{Bt(n,"ReduceL1Shared",e,"l1")},Nm=(n,e)=>{Bt(n,"ReduceL2Shared",e,"l2")},Vm=(n,e)=>{Bt(n,"ReduceLogSumExpShared",e,"logSumExp")},Mm=(n,e)=>{Bt(n,"ReduceMaxShared",e,"max")},Fm=(n,e)=>{Bt(n,"ReduceMinShared",e,"min")},Um=(n,e)=>{Bt(n,"ReduceProdShared",e,"prod")},Gm=(n,e)=>{Bt(n,"ReduceSumShared",e,"sum")},Wm=(n,e)=>{Bt(n,"ReduceSumSquareShared",e,"sumSquare")},Hm=(n,e)=>{Bt(n,"ReduceLogSumShared",e,"logSum")}});var zt,mv,yi,Xa,Lt,hv,bv,gv,yv,xv,_v,Tv,wv,vv,Iv,Rt,Km,jm,Xm,Zm,Jm,Qm,Ym,eh,th,rh,gi=v(()=>{"use strict";Z();te();Ae();ne();qm();zt=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},mv=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],yi=(n,e,r,t,o,i,s=!1,a=!1)=>{let u=[],l=r[0].dims,c=l.length,f=$.normalizeAxes(o,c),d=!a&&f.length===0;l.forEach((y,b)=>{d||f.indexOf(b)>=0?s&&u.push(1):u.push(y)});let p=u.length,m=$.size(u);return{name:n,shaderCache:e,getShaderSource:y=>{let b=[],g=A("_A",r[0].dataType,c),x=E("output",i,p),T=t(g,x,f),I=T[2];for(let S=0,O=0;S<c;S++)d||f.indexOf(S)>=0?(s&&O++,I=`for(var j${S}: u32 = 0; j${S} < ${l[S]}; j${S}++) {
                  ${T[2].includes("last_index")?`let last_index = j${S};`:""}
                  ${g.indicesSet("input_indices",S,`j${S}`)}
                  ${I}
                }`):(b.push(`${g.indicesSet("input_indices",S,x.indicesGet("output_indices",O))};`),O++);return`

        ${y.registerUniform("output_size","u32").declareVariables(g,x)}

        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${b.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${I}
          ${T[3]}
          ${T.length===4?x.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...k(l,u)]})}},Xa=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),J({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Lt=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:Xa(o,r);n.compute(yi(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?mv:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},hv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},bv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},gv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},yv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},xv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceMax",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(t.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},_v=(n,e)=>{zt(n.inputs),Lt(n,"ReduceMean",e,(t,o,i)=>{let s=1;for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=n.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},Tv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceMin",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},wv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},vv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},Iv=(n,e)=>{zt(n.inputs),Lt(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Rt=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},Km=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?_v(n,e):Lm(n,e)},jm=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?bv(n,e):Rm(n,e)},Xm=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?gv(n,e):Nm(n,e)},Zm=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?yv(n,e):Vm(n,e)},Jm=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?xv(n,e):Mm(n,e)},Qm=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Tv(n,e):Fm(n,e)},Ym=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?wv(n,e):Um(n,e)},eh=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?vv(n,e):Gm(n,e)},th=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?Iv(n,e):Wm(n,e)},rh=(n,e)=>{Rt(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?hv(n,e):Hm(n,e)}});var nh,oh,ih,Za,sh=v(()=>{"use strict";Z();Ae();gi();nh=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},oh=(n,e)=>{nh(n.inputs);let r=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(yi("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},ih=(n,e)=>{nh(n.inputs);let r=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(yi("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},Za=n=>J(n)});var Sv,Ja,$v,Av,Ov,jr,Pv,ah,xi=v(()=>{"use strict";Z();te();pi();ne();Sv=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],s=n[4],a=n[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],l=r.dims[1],c=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=o.dims[0]/3,d=f,p=d;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of e.qkvHiddenSizes)if(x%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=e.qkvHiddenSizes[0],d=e.qkvHiddenSizes[1],p=e.qkvHiddenSizes[2]}let m=l;if(f!==d)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==f+d+p)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(d!==p)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==d/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(h=s.dims[3])}let y=m+h,b=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==e.numHeads||a.dims[2]!==l||a.dims[3]!==y)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:y,maxSequenceLength:b,inputHiddenSize:c,hiddenSize:f,vHiddenSize:p,headSize:Math.floor(f/e.numHeads),vHeadSize:Math.floor(p/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:g,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Ja=(n,e,r)=>e&&n?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${n?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,$v=(n,e,r,t,o,i,s,a)=>{let u=fe(s?1:i),l=64,c=i/u;c<l&&(l=32);let f=Math.ceil(i/u/l),d=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:c},{type:12,data:f}],p=_e(n.dataType,u),m=Me(1,u),h=["type"];s&&h.push("type"),a&&h.push("type");let y=b=>{let g=E("x",n.dataType,n.dims,u),x=[g],T=s?A("seq_lens",s.dataType,s.dims):void 0;T&&x.push(T);let I=a?A("total_sequence_length_input",a.dataType,a.dims):void 0;I&&x.push(I);let S=Me(n.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${b.registerUniforms(O).declareVariables(...x)}
  ${b.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ja(T,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${g.type.value}(${S}(1.0) / ${S}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${g.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${g.type.value}(${S}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${p};${u}`,inputDependencies:h},getShaderSource:y,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/l),y:o,z:e*r},programUniforms:d})}},Av=(n,e,r,t,o,i,s,a,u)=>{let l=s+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],f=n>1&&t,d=i.kvNumHeads?i.kvNumHeads:i.numHeads,p=f?[i.batchSize,d,l,i.headSize]:void 0,m=i.nReps?i.nReps:1,h=i.scale===0?1/Math.sqrt(i.headSize):i.scale,y=fe(i.headSize),b=i.headSize/y,g=12,x={x:Math.ceil(l/g),y:Math.ceil(i.sequenceLength/g),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:b},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:h},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:m}],I=f&&t&&$.size(t.dims)>0,S=["type","type"];I&&S.push("type"),o&&S.push("type"),a&&S.push("type"),u&&S.push("type");let O=[{dims:c,dataType:e.dataType,gpuDataType:0}];f&&O.push({dims:p,dataType:e.dataType,gpuDataType:0});let P=C=>{let N=A("q",e.dataType,e.dims,y),F=A("key",r.dataType,r.dims,y),H=[N,F];if(I){let X=A("past_key",t.dataType,t.dims,y);H.push(X)}o&&H.push(A("attention_bias",o.dataType,o.dims));let L=a?A("seq_lens",a.dataType,a.dims):void 0;L&&H.push(L);let Q=u?A("total_sequence_length_input",u.dataType,u.dims):void 0;Q&&H.push(Q);let Se=E("output",e.dataType,c),M=[Se];f&&M.push(E("present_key",e.dataType,p,y));let G=Me(1,y),oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;

  var<workgroup> tileQ: array<${N.type.storage}, ${g*g}>;
  var<workgroup> tileK: array<${N.type.storage}, ${g*g}>;
  ${C.registerUniforms(oe).declareVariables(...H,...M)}
  ${C.mainStart([g,g,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Ja(L,Q,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&f?`
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
          value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(y){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${y}`)}})()};
        output[outputIdx] = ${Se.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${y};${o!==void 0};${t!==void 0};${n}`,inputDependencies:S},getRunData:()=>({outputs:O,dispatchGroup:x,programUniforms:T}),getShaderSource:P}},Ov=(n,e,r,t,o,i,s=void 0,a=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,c=o.vHiddenSize*l,f=n>1&&t,d=o.kvNumHeads?o.kvNumHeads:o.numHeads,p=f?[o.batchSize,d,u,o.headSize]:void 0,m=[o.batchSize,o.sequenceLength,c],h=12,y={x:Math.ceil(o.vHeadSize/h),y:Math.ceil(o.sequenceLength/h),z:o.batchSize*o.numHeads},b=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:c},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],g=f&&t&&$.size(t.dims)>0,x=["type","type"];g&&x.push("type"),s&&x.push("type"),a&&x.push("type");let T=[{dims:m,dataType:e.dataType,gpuDataType:0}];f&&T.push({dims:p,dataType:e.dataType,gpuDataType:0});let I=S=>{let O=A("probs",e.dataType,e.dims),P=A("v",r.dataType,r.dims),C=[O,P];g&&C.push(A("past_value",t.dataType,t.dims));let N=s?A("seq_lens",s.dataType,s.dims):void 0;s&&C.push(N);let F=a?A("total_sequence_length_input",a.dataType,a.dims):void 0;a&&C.push(F);let L=[E("output",e.dataType,m)];f&&L.push(E("present_value",e.dataType,p));let Q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${h}u;
  var<workgroup> tileQ: array<${O.type.value}, ${h*h}>;
  var<workgroup> tileV: array<${O.type.value}, ${h*h}>;
  ${S.registerUniforms(Q).declareVariables(...C,...L)}
  ${S.mainStart([h,h,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ja(N,F,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${g&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${O.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${g&&f?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:x},getRunData:()=>({outputs:T,dispatchGroup:y,programUniforms:b}),getShaderSource:I}},jr=(n,e,r,t,o,i,s,a,u,l,c=void 0,f=void 0)=>{let d=Math.min(n.outputCount,1+(s?1:0)+(a?1:0)),p=d>1?l.pastSequenceLength:0,m=p+l.kvSequenceLength,h=u&&$.size(u.dims)>0?u:void 0,y=[e,r];d>1&&s&&$.size(s.dims)>0&&y.push(s),h&&y.push(h),c&&y.push(c),f&&y.push(f);let b=n.compute(Av(d,e,r,s,h,l,p,c,f),{inputs:y,outputs:d>1?[-1,1]:[-1]})[0];n.compute($v(b,l.batchSize,l.numHeads,p,l.sequenceLength,m,c,f),{inputs:c&&f?[b,c,f]:[b],outputs:[]});let g=[b,t];d>1&&a&&$.size(a.dims)>0&&g.push(a),c&&g.push(c),f&&g.push(f),n.compute(Ov(d,b,t,a,l,p,c,f),{inputs:g,outputs:d>1?[0,2]:[0]})},Pv=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,s=12,a={x:Math.ceil(e.headSize/s),y:Math.ceil(e.sequenceLength/s),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=f=>{let d=E("output_q",u[0].dataType,r),p=E("output_k",u[0].dataType,r),m=E("output_v",u[0].dataType,r),h=A("input",u[0].dataType,u[0].dims),y=A("weight",u[1].dataType,u[1].dims),b=A("bias",u[2].dataType,u[2].dims),g=h.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${f.registerUniforms(x).declareVariables(h,y,b,d,p,m)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${g}(0);
    var valueK = ${g}(0);
    var valueV = ${g}(0);
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
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},ah=(n,e)=>{let r=Sv(n.inputs,e),[t,o,i]=Pv(n,r);return jr(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var Ev,Cv,Dv,uh,lh=v(()=>{"use strict";qe();Z();te();Ae();ne();Ev=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let s=o.length;if(s!==t.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},Cv=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,s=t?fe(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=$.size(i)/s,l=t,c=l?i.length:i,f=A("x",n[0].dataType,n[0].dims,s),d=A("scale",n[1].dataType,n[1].dims,a),p=A("bias",n[2].dataType,n[2].dims,a),m=A("inputMean",n[3].dataType,n[3].dims,a),h=A("inputVar",n[4].dataType,n[4].dims,a),y=E("y",n[0].dataType,c,s),b=()=>{let x="";if(t)x=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${y.indicesSet("outputIndices","0","0")}
            let cOffset = ${y.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${d.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<d.rank;T++)x+=`cIndices[${T}] = outputIndices[${T}];`;x+=`let cOffset = ${d.indicesToOffset("cIndices")};`}return x},g=x=>`
  const epsilon = ${r};
  ${x.registerUniform("outputSize","u32").declareVariables(f,d,p,m,h,y)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${y.offsetToIndices(`global_idx * ${s}`)};
    ${b()}
    let scale = ${d.getByOffset("cOffset")};
    let bias = ${p.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${y.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...k(i)]:[{type:12,data:u}]})}},Dv=n=>J(n),uh=(n,e)=>{let{inputs:r,outputCount:t}=n,o=Dv({...e,outputCount:t});if(ee.webgpu.validateInputContent&&Ev(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(Cv(r,o))}});var kv,Bv,ch,fh=v(()=>{"use strict";te();ne();kv=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Bv=n=>{let e=n[0].dims,r=n[0].dims[2],t=$.size(e)/4,o=n[0].dataType,i=A("input",o,e,4),s=A("bias",o,[r],4),a=A("residual",o,e,4),u=E("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:c=>`
  const channels = ${r}u / 4;
  ${c.declareVariables(i,s,a,u)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},ch=n=>{kv(n.inputs),n.compute(Bv(n.inputs))}});var zv,me,dh,ph,mh,hh,bh,gh,yh,xh,_h,Lv,Th,wh,vh,Ih,Wn,Sh,_i,$h,Ah,Oh,Ph,Eh,Ch,Dh,kh,Bh,zh,Lh,Rh,Nh,Vh,Mh,Fh,Uh,Gh,Qa,Ya,Wh,Hh,qh,Rv,Nv,Kh,Ti=v(()=>{"use strict";Z();te();Ae();ne();zv=(n,e,r,t,o,i,s)=>{let a=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=A("inputData",r,[a],4),c=E("outputData",t,[a],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${n.registerUniforms(f).declareVariables(l,c)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},me=(n,e,r,t,o,i=n.dataType,s,a)=>{let u=[{type:12,data:Math.ceil($.size(n.dims)/4)}];return s&&u.push(...s),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>zv(l,$.size(n.dims),n.dataType,i,r,t,a),getRunData:l=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil($.size(l[0].dims)/64/4)},programUniforms:u})}},dh=n=>{n.compute(me(n.inputs[0],"Abs","abs"))},ph=n=>{n.compute(me(n.inputs[0],"Acos","acos"))},mh=n=>{n.compute(me(n.inputs[0],"Acosh","acosh"))},hh=n=>{n.compute(me(n.inputs[0],"Asin","asin"))},bh=n=>{n.compute(me(n.inputs[0],"Asinh","asinh"))},gh=n=>{n.compute(me(n.inputs[0],"Atan","atan"))},yh=n=>{n.compute(me(n.inputs[0],"Atanh","atanh"))},xh=n=>J(n),_h=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(me(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},Lv=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return J({min:e,max:r})},Th=(n,e)=>{let r=e||Lv(n.inputs),t=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},wh=n=>{n.compute(me(n.inputs[0],"Ceil","ceil"))},vh=n=>{n.compute(me(n.inputs[0],"Cos","cos"))},Ih=n=>{n.compute(me(n.inputs[0],"Cosh","cosh"))},Wn=n=>J(n),Sh=(n,e)=>{let r=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},_i=(n="f32")=>`
const r0: ${n} = 0.3275911;
const r1: ${n} = 0.254829592;
const r2: ${n} = -0.284496736;
const r3: ${n} = 1.421413741;
const r4: ${n} = -1.453152027;
const r5: ${n} = 1.061405429;

fn erf_vf32(v: vec4<${n}>) -> vec4<${n}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,$h=n=>{let e=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,_i(e)))},Ah=n=>{n.compute(me(n.inputs[0],"Exp","exp"))},Oh=n=>{n.compute(me(n.inputs[0],"Floor","floor"))},Ph=n=>{let e=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,_i(e)))},Eh=(n,e)=>{let r=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},Ch=n=>{n.compute(me(n.inputs[0],"Not",e=>`!${e}`))},Dh=n=>{n.compute(me(n.inputs[0],"Neg",e=>`-${e}`))},kh=n=>{n.compute(me(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},Bh=n=>{let e=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},zh=n=>{n.compute(me(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},Lh=n=>J(n),Rh=(n,e)=>{let r=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},Nh=n=>{n.compute(me(n.inputs[0],"Sin","sin"))},Vh=n=>{n.compute(me(n.inputs[0],"Sinh","sinh"))},Mh=n=>{n.compute(me(n.inputs[0],"Sqrt","sqrt"))},Fh=n=>{n.compute(me(n.inputs[0],"Tan","tan"))},Uh=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,Gh=n=>{n.compute(me(n.inputs[0],"Tanh",Uh))},Qa=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${Uh("v")};
}
`,Ya=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,Wh=n=>{let e=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"FastGelu",Ya,Qa(e),void 0,n.inputs[0].dataType))},Hh=(n,e)=>{let r=Me(n.inputs[0].dataType);return n.compute(me(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},qh=n=>{n.compute(me(n.inputs[0],"Log","log"))},Rv=(n,e)=>`
const alpha = vec4<${n}>(${e});
const one = ${n}(1.0);
const zero = ${n}(0.0);

fn quick_gelu_impl(x: vec4<${n}>) -> vec4<${n}> {
  let v = x *alpha;
  var x1 : vec4<${n}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Nv=n=>`quick_gelu_impl(${n})`,Kh=(n,e)=>{let r=Me(n.inputs[0].dataType);n.compute(me(n.inputs[0],"QuickGelu",Nv,Rv(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var Vv,Mv,Xh,Zh=v(()=>{"use strict";te();ne();Ti();Vv=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Mv=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=A("input",n[0].dataType,n[0].dims,4),t=A("bias",n[0].dataType,[n[0].dims[2]],4),o=E("output",n[0].dataType,e,4),i=$.size(e)/4,s=_e(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${u.declareVariables(r,t,o)}

  ${_i(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Xh=n=>{Vv(n.inputs),n.compute(Mv(n.inputs))}});var Fv,Uv,Nt,Jh,Qh,Yh,eb,tb,rb,nb,ob,ib,sb,ab=v(()=>{"use strict";Z();te();ne();Fv=(n,e,r,t,o,i,s,a,u,l,c,f)=>{let d,p;typeof a=="string"?d=p=(g,x)=>`${a}((${g}),(${x}))`:typeof a=="function"?d=p=a:(d=a.scalar,p=a.vector);let m=E("outputData",c,t.length,4),h=A("aData",u,e.length,4),y=A("bData",l,r.length,4),b;if(o)if(i){let g=$.size(e)===1,x=$.size(r)===1,T=e.length>0&&e[e.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;g||x?b=m.setByOffset("global_idx",p(g?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),x?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"))):b=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",p(s||T?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?y.getByOffset("offsetB / 4u"):`${y.type.value}(${y.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else b=m.setByOffset("global_idx",p(h.getByOffset("global_idx"),y.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(x,T,I="")=>{let S=`aData[indexA${T}][componentA${T}]`,O=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${m.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${h.broadcastedIndicesToOffset(`outputIndices${T}`,m)};
            let offsetB${T} = ${y.broadcastedIndicesToOffset(`outputIndices${T}`,m)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${x}[${T}] = ${I}(${d(S,O)});
          `};c===9?b=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:b=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(h,y,m)}

        ${f??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${b}
      }`},Uv=(n,e,r,t,o,i,s=r.dataType)=>{let a=r.dims.map(h=>Number(h)??1),u=t.dims.map(h=>Number(h)??1),l=!$.areEqual(a,u),c=a,f=$.size(a),d=!1,p=!1,m=[l];if(l){let h=kt.calcShape(a,u,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");c=h.slice(),f=$.size(c);let y=$.size(a)===1,b=$.size(u)===1,g=a.length>0&&a[a.length-1]%4===0,x=u.length>0&&u[u.length-1]%4===0;m.push(y),m.push(b),m.push(g),m.push(x);let T=1;for(let I=1;I<c.length;I++){let S=a[a.length-I],O=u[u.length-I];if(S===O)T*=S;else break}T%4===0?(p=!0,d=!0):(y||b||g||x)&&(d=!0)}else d=!0;return m.push(d),{name:n,shaderCache:{hint:e+m.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>Fv(h,a,u,c,d,l,p,o,r.dataType,t.dataType,s,i),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil($.size(c)/4)},...k(a,u,c)]})}},Nt=(n,e,r,t,o,i)=>{n.compute(Uv(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},Jh=n=>{Nt(n,"Add",(e,r)=>`${e}+${r}`)},Qh=n=>{Nt(n,"Div",(e,r)=>`${e}/${r}`)},Yh=n=>{Nt(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},eb=n=>{Nt(n,"Mul",(e,r)=>`${e}*${r}`)},tb=n=>{let e=A("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;Nt(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},rb=n=>{Nt(n,"Sub",(e,r)=>`${e}-${r}`)},nb=n=>{Nt(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},ob=n=>{Nt(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},ib=n=>{Nt(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},sb=n=>{Nt(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var Wv,Hv,qv,Kv,ub,lb,cb=v(()=>{"use strict";Z();te();Ae();ne();Wv=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((s,a)=>{if(a!==r){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},Hv=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,qv=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},Kv=(n,e,r,t)=>{let o=$.size(r),i=new Array(n.length),s=new Array(n.length),a=0,u=[],l=[],c=[{type:12,data:o}];for(let h=0;h<n.length;++h)a+=n[h].dims[e],i[h]=a,l.push(n[h].dims.length),s[h]=A(`input${h}`,t,l[h]),u.push("rank"),c.push({type:12,data:i[h]});for(let h=0;h<n.length;++h)c.push(...k(n[h].dims));c.push(...k(r));let f=E("output",t,r.length),d=f.indicesGet("indices",e),p=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),m=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let y=0;y<n.length;y++)h.registerUniform(`sizeInConcatAxis${y}`,"u32");return h.declareVariables(...s,f)})()}

  ${Hv(i.length,p)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${d});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${p});
      ${d} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${qv(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:m}},ub=(n,e)=>{let r=n.inputs,t=r[0].dims,o=$.normalizeAxis(e.axis,t.length);Wv(r,o);let i=t.slice();i[o]=r.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=r.filter(a=>$.size(a.dims)>0);n.compute(Kv(s,o,i,r[0].dataType),{inputs:s})},lb=n=>J({axis:n.axis})});var wt,vt,It,wi,rr=v(()=>{"use strict";Z();te();wt=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},vt=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},It=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},wi=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[Pm,Em];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var Ne,fb,vi=v(()=>{"use strict";Ne=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},fb=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var db,pb=v(()=>{"use strict";db=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var Hn,Ii,Si=v(()=>{"use strict";Z();te();ne();rr();Hn=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((s,a)=>`
      if (${V(e.shape,a,e.rank)} != 1) {
        ${e.indicesSet(n,a,V(o,a+i,t))}
      } else {
        ${e.indicesSet(n,a,0)}
      }`).join("")}
`},Ii=(n,e,r,t,o=!1,i)=>{let s=n[0].dims,a=n[1].dims,u=s[s.length-2],l=a[a.length-1],c=s[s.length-1],f=fe(l),d=fe(c),p=fe(u),m=$.size(r)/f/p,h=n.length>2,y=t?t.slice(0,-2):r.slice(0,-2),g=[$.size(y),u,l],x=[{type:12,data:m},{type:12,data:u},{type:12,data:l},{type:12,data:c}];vt(e,x),x.push(...k(y,s,a)),h&&x.push(...k(n[2].dims)),x.push(...k(g));let T=I=>{let S=bi("batch_dims",n[0].dataType,y.length),O=A("a",n[0].dataType,s.length,d),P=A("b",n[1].dataType,a.length,f),C=E("output",n[0].dataType,g.length,f),N=_e(C.type.tensor),F=wt(e,C.type.value,N),H=[O,P],L="";if(h){let M=o?f:1;H.push(A("bias",n[2].dataType,n[2].dims.length,M)),L=`${o?`value += bias[col / ${M}];`:`value += ${C.type.value}(bias[row + i]);`}`}let Q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];It(e,Q);let Se=()=>{let M=`var a_data: ${O.type.value};`;for(let G=0;G<d;G++)M+=`
              let b_data${G} = b[(b_offset + (k + ${G}) * uniforms.N + col) / ${f}];`;for(let G=0;G<p;G++){M+=`a_data = a[(a_offset + (row + ${G}) * uniforms.K + k) / ${d}];`;for(let oe=0;oe<d;oe++)M+=`
            values[${G}] = fma(${P.type.value}(a_data${d===1?"":`[${oe}]`}), b_data${oe}, values[${G}]);
`}return M};return`
  ${I.registerUniforms(Q).registerInternalVariables(S).declareVariables(...H,C)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${S.offsetToIndices("batch")};`}

    var a_indices: ${O.type.indices};
    ${Hn("a_indices",O,O.rank-2,S.rank,"batch_indices")}
    ${O.indicesSet("a_indices",O.rank-2,0)}
    ${O.indicesSet("a_indices",O.rank-1,0)}
    let a_offset = ${O.indicesToOffset("a_indices")};

    var b_indices: ${P.type.indices};
    ${Hn("b_indices",P,P.rank-2,S.rank,"batch_indices")}
    ${P.indicesSet("b_indices",P.rank-2,0)}
    ${P.indicesSet("b_indices",P.rank-1,0)}
    let b_offset = ${P.indicesToOffset("b_indices")};
    var values: array<${C.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${d}) {
      ${Se()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${L}
      ${F}
      let cur_indices = ${C.type.indices}(batch, row + i, col);
      let offset = ${C.indicesToOffset("cur_indices")};
      ${C.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${f};${d};${p};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:x}),getShaderSource:T}}});var jv,Xv,eu,mb,Zv,tu,Jv,qn,$i=v(()=>{"use strict";Z();te();ne();rr();Si();vi();jv=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,Xv=(n,e)=>n?`
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
        }`,eu=(n,e,r="f32",t,o=!1,i=32,s=!1,a=32)=>{let u=e[1]*n[1],l=e[0]*n[0],c=o?u:i,f=o?i:u,d=c/e[0],p=i/e[1];if(!((o&&d===4&&n[1]===4||!o&&(d===3||d===4))&&c%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${d} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${d} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${d}<${r}>, ${c/d}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${l/n[0]}>, ${i}>;

const rowPerThread = ${n[1]};
const colPerThread = ${n[0]};
const innerElementSize = ${d};
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
  let batch = ${s?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${p};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${jv(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
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
          ${d===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Xv(o,d)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},mb=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,Zv=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",tu=(n,e,r="f32",t,o=!1,i=32,s=!1,a=32,u=!1)=>{let l=n[1]*e[1],c=n[0]*e[0],f=o?l:i,d=o?i:l;if(!(d%e[1]===0&&f%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${d} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let p=d/e[1],m=f/e[0],h=i/e[1],y=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${d}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
          ${mb(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
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

let tileRowA = i32(localId.y) * ${p};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${p}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${mb(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
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
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Zv(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${d}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${i}>;
  const rowPerThread = ${n[1]};
  const colPerThread = ${n[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${y}
  }
`},Jv=(n,e,r,t,o=!1)=>{let[i,s,a,u]=t,l=_e(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ne(n,l)} {
      var value = ${Ne(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Hn("aIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ne(n,l)} {
      var value = ${Ne(n,l)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${a.type.indices};
        ${Hn("bIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("bIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("bIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ne(n,l)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${Ne(n,l)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},qn=(n,e,r,t,o=!1,i)=>{let s=n[0].dims,a=n[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),c=t?t.slice(0,-2):r.slice(0,-2),f=$.size(c),d=s[s.length-2],p=s[s.length-1],m=a[a.length-1],h=p%4===0&&m%4===0,y=d<=8?[4,1,1]:[4,4,1],b=[8,8,1],g=[Math.ceil(m/b[0]/y[0]),Math.ceil(d/b[1]/y[1]),Math.ceil(f/b[2]/y[2])],x=h?4:1,T=[...u,d,p/x],I=T.length,S=[...l,p,m/x],O=S.length,P=[f,d,m/x],C=[{type:6,data:d},{type:6,data:m},{type:6,data:p}];vt(e,C),C.push(...k(c,T,S));let N=["rank","rank"],F=n.length>2;F&&(C.push(...k(n[2].dims)),N.push("rank")),C.push(...k(P));let H=L=>{let Q=c.length,Se=bi("batchDims",n[0].dataType,Q,1),M=_e(n[0].dataType),G=A("a",n[0].dataType,I,x),oe=A("b",n[1].dataType,O,x),X=E("result",n[0].dataType,P.length,x),Oe=[G,oe];if(F){let W=o?x:1;Oe.push(A("bias",n[2].dataType,n[2].dims.length,W))}let je=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];It(e,je);let Pe=_e(X.type.tensor),Y=wt(e,X.type.value,Pe),D=Jv(x,F,Y,[Se,G,oe,X],o);return`
  ${L.registerUniforms(je).registerInternalVariables(Se).declareVariables(...Oe,X)}
  ${D}
  ${h?eu(y,b,M,Se):tu(y,b,M,Se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${y};${e.activation};${h};${o}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:C}),getShaderSource:H}}});var Qv,hb,bb=v(()=>{"use strict";Z();Dt();ne();rr();vi();pb();$i();Qv=(n,e,r,t,o=!1,i,s=4,a=4,u=4,l="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},f=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},d=n?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,p=n?`
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
    `,m=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",y=n?"row":"col",b=n?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${y} / outWidth;
    let outCol = ${y} % outWidth;

    let WRow = ${b} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${b} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${b} % inChannels;
    var resData = ${Ne(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${h}) {
      ${d}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,x=n?e&&t?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${Ne(s,l)}(0.0);`:t&&r?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${Ne(s,l)}(0.0);`,T=n?t&&r?f(a):`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(a)}
    }
    return ${Ne(a,l)}(0.0);`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(a)}
    }
    return ${Ne(a,l)}(0.0);`,I=Ne(u,l),S=n?Ne(s,l):Ne(a,l),O=n?Ne(a,l):Ne(s,l),P=wt(i,I,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${n?x:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${n?T:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${p}
      ${fb(o)}
      ${P}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},hb=(n,e,r,t,o,i,s,a,u)=>{let l=e.format==="NHWC",c=l?n[0].dims[3]:n[0].dims[1],f=r[0],d=l?r[2]:r[3],p=l?r[1]:r[2],m=l?r[3]:r[1],h=l&&(c%4===0||c%3===0)&&m%4===0,y=l?m:d*p,b=l?d*p:m,g=[8,8,1],x=t<=8?[4,1,1]:[4,4,1],T=[Math.ceil(y/g[0]/x[0]),Math.ceil(b/g[1]/x[1]),Math.ceil(f/g[2]/x[2])];ie("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let I=h?l&&c%4!==0?3:4:1,S=g[1]*x[1],O=g[0]*x[0],P=Math.max(g[0]*I,g[1]),C=t%S===0,N=o%O===0,F=i%P===0,H=h?[I,4,4]:[1,1,1],L=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];vt(e,L),L.push(...k(n[0].dims,n[1].dims));let Q=["rank","rank"];s&&(L.push(...k(n[2].dims)),Q.push("rank")),L.push(...k(r));let Se=M=>{let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];It(e,G);let oe=h?4:1,X=_e(n[0].dataType),Oe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${X}>`:X}) {
        result[flatIndex] = ${h?`vec4<${X}>`:X}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${X}>`:X}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,je=A("x",n[0].dataType,n[0].dims.length,I===3?1:I),Pe=A("w",n[1].dataType,n[1].dims.length,oe),Y=[je,Pe],D=E("result",n[0].dataType,r.length,oe);if(s){let W=A("bias",n[2].dataType,n[2].dims.length,oe);Y.push(W),Oe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${X}>`:X} {
          return bias[coords.${l?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${db("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${M.registerUniforms(G).declareVariables(...Y,D)}
        ${Oe}
        ${Qv(l,C,N,F,s,e,H[0],H[1],H[2],X)}
        ${h?eu(x,g,X,void 0,!l,P):tu(x,g,X,void 0,!l,P,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${I};${h};${C};${N};${F};${S};${O};${P}`,inputDependencies:Q},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:L}),getShaderSource:Se}}});var Yv,gb,Ai,e0,yb,t0,xb,_b,Tb=v(()=>{"use strict";Z();Dt();te();ne();rr();vi();Yv=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},gb=n=>typeof n=="number"?[n,n,n]:n,Ai=(n,e)=>e<=1?n:n+(n-1)*(e-1),e0=(n,e,r,t=1)=>{let o=Ai(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},yb=(n,e,r,t,o)=>{o==null&&(o=e0(n,e[0],t[0]));let i=[0,0,0,r];for(let s=0;s<3;s++)n[s]+2*o>=e[s]&&(i[s]=Math.trunc((n[s]-e[s]+2*o)/t[s]+1));return i},t0=(n,e,r,t,o,i,s,a,u,l)=>{let c,f,d,p;if(n==="VALID"&&(n=0),typeof n=="number"){c={top:n,bottom:n,left:n,right:n,front:n,back:n};let m=yb([e,r,t,1],[a,u,l],1,[o,i,s],n);f=m[0],d=m[1],p=m[2]}else if(Array.isArray(n)){if(!n.every((h,y,b)=>h===b[0]))throw Error(`Unsupported padding parameter: ${n}`);c={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let m=yb([e,r,t,1],[a,u,l],1,[o,i,s],n[0]);f=m[0],d=m[1],p=m[2]}else if(n==="SAME_UPPER"){f=Math.ceil(e/o),d=Math.ceil(r/i),p=Math.ceil(t/s);let m=(f-1)*o+a-e,h=(d-1)*i+u-r,y=(p-1)*s+l-t,b=Math.floor(m/2),g=m-b,x=Math.floor(h/2),T=h-x,I=Math.floor(y/2),S=y-I;c={top:x,bottom:T,left:I,right:S,front:b,back:g}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:c,outDepth:f,outHeight:d,outWidth:p}},xb=(n,e,r,t,o,i=!1,s="channelsLast")=>{let a,u,l,c,f;if(s==="channelsLast")[a,u,l,c,f]=n;else if(s==="channelsFirst")[a,f,u,l,c]=n;else throw new Error(`Unknown dataFormat ${s}`);let[d,,p,m,h]=e,[y,b,g]=gb(r),[x,T,I]=gb(t),S=Ai(p,x),O=Ai(m,T),P=Ai(h,I),{padInfo:C,outDepth:N,outHeight:F,outWidth:H}=t0(o,u,l,c,y,b,g,S,O,P),L=i?d*f:d,Q=[0,0,0,0,0];return s==="channelsFirst"?Q=[a,L,N,F,H]:s==="channelsLast"&&(Q=[a,N,F,H,L]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:c,inChannels:f,outDepth:N,outHeight:F,outWidth:H,outChannels:L,padInfo:C,strideDepth:y,strideHeight:b,strideWidth:g,filterDepth:p,filterHeight:m,filterWidth:h,effectiveFilterDepth:S,effectiveFilterHeight:O,effectiveFilterWidth:P,dilationDepth:x,dilationHeight:T,dilationWidth:I,inShape:n,outShape:Q,filterShape:e}},_b=(n,e,r,t,o,i)=>{let s=i==="channelsLast",a=s?n[0].dims[3]:n[0].dims[1],u=!1,l=[64,1,1],c={x:r.map((g,x)=>x)},f=[Math.ceil(Yv(c.x.map(g=>r[g]))/l[0]),1,1];ie("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let d=u?s&&a%4!==0?3:4:1,p=$.size(r),m=[{type:12,data:p},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];vt(e,m),m.push(...k(n[0].dims,n[1].dims));let h=["rank","rank"],y=n.length===3;y&&(m.push(...k(n[2].dims)),h.push("rank")),m.push(...k(r));let b=g=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];It(e,x);let T=u?4:1,I=_e(n[0].dataType),S=A("x",n[0].dataType,n[0].dims.length,d===3?1:d),O=A("W",n[1].dataType,n[1].dims.length,T),P=[S,O],C=E("result",n[0].dataType,r.length,T),N="";if(y){let L=A("bias",n[2].dataType,n[2].dims.length,T);P.push(L),N+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${I}>`:I} {
          return bias[${s?V("coords",4,5):V("coords",1,5)}${u?"/ 4":""}];
        }`}let F=Ne(d,I),H=wt(e,F,I);return`
            ${N}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${g.registerUniforms(x).declareVariables(...P,C)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${C.offsetToIndices("global_idx")};
              let batch = ${V("coords",0,S.rank)};
              let d2 = ${s?V("coords",S.rank-1,S.rank):V("coords",1,S.rank)};
              let xFRCCorner = vec3<u32>(${s?V("coords",1,S.rank):V("coords",2,S.rank)},
              ${s?V("coords",2,S.rank):V("coords",3,S.rank)},
              ${s?V("coords",3,S.rank):V("coords",4,S.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?V("uniforms.x_shape",1,S.rank):V("uniforms.x_shape",2,S.rank)};
              let xShapeZ = ${s?V("uniforms.x_shape",2,S.rank):V("uniforms.x_shape",3,S.rank)};
              let xShapeW = ${s?V("uniforms.x_shape",3,S.rank):V("uniforms.x_shape",4,S.rank)};
              let xShapeU = ${s?V("uniforms.x_shape",4,S.rank):V("uniforms.x_shape",1,S.rank)};
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
              ${y?"value = value + getBiasByOutputCoords(coords)":""};
              ${H}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${s};${d};${y}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:m}),getShaderSource:b}}});var wb,vb,Ib=v(()=>{"use strict";Z();te();ne();rr();wb=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",s=n[0].dims,a=n[1].dims,u=e.format==="NHWC",l=u?r[3]:r[1],c=l/e.group,f=u&&c>=4?fe(l):1,d=$.size(r)/f,p=[{type:12,data:d},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];vt(e,p),p.push(...k(s,[a[0],a[1],a[2],a[3]/f]));let m=o?["rank","rank","rank"]:["rank","rank"];p.push(...k([r[0],r[1],r[2],r[3]/f]));let h=y=>{let b=E("output",n[0].dataType,r.length,f),g=_e(b.type.tensor),x=wt(e,b.type.value,g),T=A("x",n[0].dataType,s.length),I=A("w",n[1].dataType,a.length,f),S=[T,I];o&&S.push(A("b",n[2].dataType,n[2].dims,f));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];It(e,O);let P=u?`
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
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${y.registerUniforms(O).declareVariables(...S,b)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${b.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${b.type.value} = ${b.type.value}(0);
    ${P}
    ${i}
    ${x}
    ${b.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${f}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:h}},vb=(n,e,r,t)=>{let o=n.length>2,i=fe(r[3]),s=fe(r[2]),a=$.size(r)/i/s,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],l=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],c=[r[0],r[1],r[2],r[3]/i],f=[{type:12,data:a},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];vt(e,f),f.push(...k(u,l,c));let d=(s-1)*e.strides[1]+l[1],p=m=>{let h=E("output",n[0].dataType,c.length,i),y=_e(h.type.tensor),b=wt(e,h.type.value,y),g=A("x",n[0].dataType,u.length,i),x=A("w",n[1].dataType,l.length,i),T=[g,x];o&&T.push(A("b",n[2].dataType,n[2].dims,i));let I=o?"value += b[output_channel];":"",S=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return It(e,S),`
  ${m.registerUniforms(S).declareVariables(...T,h)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${d}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${d}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${b}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${s};${d};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}),getShaderSource:p}}});var r0,ru,n0,nu,ou,Sb,o0,i0,iu,$b=v(()=>{"use strict";te();bb();Tb();$i();Ib();rr();Si();Ft();r0=(n,e,r,t,o,i)=>{let s=n[0],a=n.slice(i?1:2,i?3:4),u=a.length,l=e[0],f=e.slice(2).map((m,h)=>m+(m-1)*(r[h]-1)),p=a.map((m,h)=>m+t[h]+t[h+u]).map((m,h)=>Math.floor((m-f[h]+o[h])/o[h]));return p.splice(0,0,s),p.splice(i?3:1,0,l),p},ru=[2,3,1,0],n0=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},nu=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();Ir.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},ou=n=>{let e=wi(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,s=n.kernel_shape,a=n.pads,u=n.strides,l=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},Sb=(n,e,r,t)=>{let o=r.format==="NHWC",i=r0(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let S=[e[0]];if(o){let P=n.kernelCustomData.wT??n.compute(Fe(e[1],ru),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=P),S.push(P)}else S.push(e[1]);e.length===3&&S.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(vb(S,r,i,t),{inputs:S}):n.compute(wb(S,r,i,t),{inputs:S});return}let s=e.length===3,a=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],c=e[1].dims[2],f=e[1].dims[3],d=i[o?1:2],p=i[o?2:3],m=i[o?3:1],h=o&&c===a&&f===u&&r.pads[0]===0&&r.pads[1]===0;if(h||c===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let S=i[0],O,P,C,N=[];if(o){let L=n.kernelCustomData.wT??n.compute(Fe(e[1],ru),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=L),h){let Q=a*u*l;O=e[0].reshape([1,S,Q]),P=L.reshape([1,Q,m]),C=[1,S,m]}else O=e[0].reshape([S,a*u,l]),P=L.reshape([1,l,m]),C=[S,d*p,m];N.push(O),N.push(P)}else O=e[0].reshape([S,l,a*u]),P=e[1].reshape([1,m,l]),C=[S,m,d*p],N.push(P),N.push(O);s&&N.push(e[2]);let F=C[2],H=N[0].dims[N[0].dims.length-1];F<8&&H<8?n.compute(Ii(N,r,i,C,o,t),{inputs:N}):n.compute(qn(N,r,i,C,o,t),{inputs:N});return}let y=!0,b=n.kernelCustomData.wT??n.compute(Fe(e[1],ru),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=b);let g=[e[0],b];s&&g.push(e[2]);let x=o?d*p:m,T=o?m:d*p,I=c*f*l;n.compute(hb(g,r,i,x,T,I,s,y,t),{inputs:g})},o0=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),s=[1].concat(e.dilations),a=[1].concat(e.kernelShape),u=nu({...e,pads:o,strides:i,dilations:s,kernelShape:a},t);Sb(n,t,u,l=>r?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},i0=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=nu(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=xb(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(_b(e,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],t))},iu=(n,e)=>{if(n0(n.inputs,e),n.inputs[0].dims.length===3)o0(n,e);else if(n.inputs[0].dims.length===5)i0(n,n.inputs,e);else{let r=nu(e,n.inputs);Sb(n,n.inputs,r)}}});var Ab,Ob=v(()=>{"use strict";Z();Dt();te();ne();Ab=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",s=e.group,a=n[1].dims,u=a[2]/s,l=a[3],c=i?fe(u):1,f=i&&l===1&&u>=4,d=f?Math.floor(u/4)*4:Math.floor(u/c)*c,p=u-d,m=i?fe(l):1,h=i?l===1?c:m:1,y=$.size(o)/m,b=[Math.ceil(y/64),1,1];ie("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${b}`);let g=["rank","rank"],x=[e.strides[0],e.strides[1]],T=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],I=[e.dilations[0],e.dilations[1]],S=[T[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),T[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],O=[S[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),S[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],P=[{type:12,data:y},{type:12,data:x},{type:12,data:T},{type:12,data:I},{type:12,data:S},{type:6,data:O},{type:12,data:d},{type:12,data:u},{type:12,data:l},...k(n[0].dims,n[1].dims)];t&&(P.push(...k(n[2].dims)),g.push("rank")),P.push(...k(o));let C=N=>{let F=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:x.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:S.length},{name:"pads",type:"i32",length:O.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],H=_e(n[0].dataType),L=i?1:2,Q=i?2:3,Se=i?3:1,M=A("W",n[1].dataType,n[1].dims.length,h),G=A("Dy",n[0].dataType,n[0].dims.length,c),oe=[G,M];t&&oe.push(A("bias",n[2].dataType,[o[Se]].length,m));let X=E("result",n[0].dataType,o.length,m),Oe=()=>{let Y="";if(f)c===4?Y+=`
        let xValue = ${G.getByOffset("x_offset")};
        let wValue = ${M.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?Y+=`
          dotProd = dotProd + dot(vec4<${H}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}), vec4<${H}>(${M.getByOffset("w_offset")}, ${M.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(Y+=`
          dotProd = dotProd + dot(vec4<${H}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}, ${G.getByOffset("x_offset + 2u")}, ${G.getByOffset("x_offset + 3u")}), vec4<${H}>(${M.getByOffset("w_offset")}, ${M.getByOffset("w_offset + 1u")}, ${M.getByOffset("w_offset + 2u")}, ${M.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Y+=`
                  let xValue = ${i?G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):G.get("batch","inputChannel","idyR","idyC")};
        `,c===1)Y+=`
          let w_offset = ${M.indicesToOffset(`${M.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${M.getByOffset(`w_offset / ${h}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let D=0;D<c;D++)Y+=`
            let wValue${D} = ${M.getByOffset(`${M.indicesToOffset(`${M.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${D}, wOutChannel)`)} / ${h}`)};
            dotProd = dotProd + xValue[${D}] * wValue${D};`;return Y},je=()=>{if(p===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let Y="";if(c===1){Y+="dotProd = dotProd";for(let D=0;D<p;D++)Y+=`
            + ${G.getByOffset(`x_offset + ${D}`)} * ${M.getByOffset(`w_offset + ${D}`)}`;Y+=";"}else if(c===2){if(p!==2)throw new Error(`Invalid inputChannelsRemainder ${p}.`);Y+=`
          let xValue = ${G.getByOffset("x_offset")};
          let wValue = ${M.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Y},Pe=`
            let outputIndices = ${X.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${X.indicesGet("outputIndices",0)};
            let d1 = ${X.indicesGet("outputIndices",Se)};
            let r = ${X.indicesGet("outputIndices",L)};
            let c = ${X.indicesGet("outputIndices",Q)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${X.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${H}(dyRCorner) + ${H}(wR)) / ${H}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${H}(uniforms.Dy_shape[${L}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${H}(dyCCorner) + ${H}(wC)) / ${H}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${H}(uniforms.Dy_shape[${Q}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${M.indicesToOffset(`${M.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${h};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:c}) {
                  ${Oe()}
                  inputChannel = inputChannel + ${f?4:c};
                }
                ${je()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${m}]`:""};
            ${X.setByOffset("global_idx","value")};
          `;return`
    ${N.registerUniforms(F).declareVariables(...oe,X)}
      ${N.mainStart()}
      ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${Pe}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${c}${h}${m}${f}${p}`,inputDependencies:g},getRunData:()=>({dispatchGroup:{x:b[0],y:b[1],z:b[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:P}),getShaderSource:C}}});var s0,a0,u0,Pb,Eb,l0,Cb,c0,Db,kb=v(()=>{"use strict";Ob();rr();Ft();s0=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,a0=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},u0=(n,e,r,t,o,i,s,a,u,l)=>{let c=n.length-2,f=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let d=n[0],p=e[a?3:1]*o;for(let m=0,h=n.length-c-(a?1:0);m<c;++m,++h){let y=n[h],b=f?y*s[m]:l[m],g=s0(y,s[m],i[m],e[h],r[m],b);a0(g,t,i,m,m+c),f&&l.push(s[m]*(y-1)+u[m]+(e[h]-1)*r[m]+1-i[m]-i[m+c])}l.splice(0,0,d),l.splice(a?3:1,0,p)},Pb=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((f,d)=>f*d,1)===0){r.length=0;for(let f=2;f<e[1].dims.length;++f)r.push(e[1].dims[f])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),s=n.outputPadding.slice(),a=e[0].dims,u=n.dilations.slice();if(u.reduce((f,d)=>f+d,0)===0){let f=e[0].dims.length-2;u=new Array(f).fill(1)}let l=n.strides.slice();if(l.reduce((f,d)=>f+d,0)===0){let f=e[0].dims.length-2;l=new Array(f).fill(1)}u0(a,r,u,n.autoPad,n.group,o,l,t,s,i);let c=Object.assign({},n);return Object.assign(c,{kernelShape:r,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:l}),c},Eb=n=>{let e=wi(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group,s=n.kernelShape,a=n.pads,u=n.strides,l=n.wIsConst(),c=n.outputPadding,f=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:s,outputPadding:c,outputShape:f,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${n.format};${e.activation};`}},l0=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((c,f)=>c+f,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((c,f)=>c+f,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((c,f)=>c+f,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((c,f)=>c+f,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},Cb=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(Fe(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute(Ab(i,r,t),{inputs:i})},c0=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=e.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=e.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let l=Pb({...e,pads:a,strides:s,dilations:i,kernelShape:o,outputPadding:u},t);Cb(n,t,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Db=(n,e)=>{if(l0(n.inputs,e),n.inputs[0].dims.length===3)c0(n,e);else{let r=Pb(e,n.inputs);Cb(n,n.inputs,r)}}});var f0,Bb,zb,Lb=v(()=>{"use strict";Z();te();Ae();ne();f0=(n,e,r,t)=>{let o=$.size(e),i=e.length,s=A("input",n,i),a=E("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),l=$.normalizeAxis(u,i),c=f=>{let d=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,p=V("uniforms.input_shape","uniforms.axis",i),m=t.reverse?d+(t.exclusive?" + 1":""):"0",h=t.reverse?p:d+(t.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...k(e,e)]}),getShaderSource:c}},Bb=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(f0(t,r,o,e),{inputs:[0]})},zb=n=>{let e=n.exclusive===1,r=n.reverse===1;return J({exclusive:e,reverse:r})}});var d0,p0,m0,Rb,Nb,Vb=v(()=>{"use strict";Z();te();Ae();ne();d0=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},p0=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},m0=(n,e)=>{let r,t,o,i,s,a,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([r,t,o,i]=n.dims,s=c?[r,t,o,l,l,i/l**2]:[r,t,o,i/l**2,l,l],a=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],s=c?[r,l,l,i/l**2,t,o]:[r,i/l**2,l,l,t,o],a=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=n.reshape(s),d=f.dims.length,p=n.dataType,m=A("a",p,d),h=E("output",p,d),y=b=>`
  ${b.registerUniform("output_size","u32").declareVariables(m,h)}

  ${p0(a,d,m,h)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:b=>{let g=u?[r,t*l,o*l,i/l**2]:[r,i/l**2,t*l,o*l],x=$.size(g),T=f.dims,I=$.sortBasedOnPerm(T,a);return{outputs:[{dims:g,dataType:b[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...k(T,I)]}},getShaderSource:y}},Rb=(n,e)=>{d0(n.inputs),n.compute(m0(n.inputs[0],e))},Nb=n=>J({blocksize:n.blocksize,mode:n.mode,format:n.format})});var su,Oi,Mb,h0,b0,au,uu,Fb,g0,Ub,Gb,Wb=v(()=>{"use strict";Z();te();Ae();ne();su="[a-zA-Z]|\\.\\.\\.",Oi="("+su+")+",Mb="^"+Oi+"$",h0="("+Oi+",)*"+Oi,b0="^"+h0+"$",au=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},uu=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(b0)))throw new Error("Invalid LHS term");if(t.split(",").forEach((a,u)=>{let l=e[u].dims.slice();if(!a.match(RegExp(Mb)))throw new Error("Invalid LHS term");let c=this.processTerm(a,!0,l,u);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Oi)))throw new Error("Invalid RHS");o.match(RegExp(su,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,s=!1,a=[],u=0;if(!e.match(RegExp(Mb))&&!r&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(su,"g")),c=new au(o);return l?.forEach((f,d)=>{if(f==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let p=i-l.length+1;if(p<0)throw new Error("Ellipsis out of bounds");if(a=t.slice(u,u+p),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<a.length;m++){let h=String.fromCharCode(48+m);c.addSymbol(h,d+m),this.addSymbol(h,t[u++],o)}}else c.addSymbol(f,d+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,t[u++],o)}),c}},Fb=n=>n+"_max",g0=(n,e,r,t)=>{let i=n.map(c=>c.length).map((c,f)=>A(`input${f}`,e,c)),s=$.size(t),a=E("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(c=>!r.rhs.symbolToIndices.has(c)),l=c=>{let f=[],d="var prod = 1.0;",p="var sum = 0.0;",m="sum += prod;",h=[],y=[],b=[],g=[],x=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((I,S)=>{if(r.rhs.symbolToIndices.has(S)){let O=r.rhs.symbolToIndices.get(S)?.[0];O!==void 0&&r.lhs.forEach((P,C)=>{if(I.inputIndices.includes(C)){let N=P.symbolToIndices.get(S);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(F=>{f.push(`${i[C].indicesSet(`input${C}Indices`,F,a.indicesGet("outputIndices",O))}`)})}})}else r.lhs.forEach((O,P)=>{if(I.inputIndices.includes(P)){let C=O.symbolToIndices.get(S);if(C===void 0)throw new Error("Invalid symbol error");C.forEach(N=>{h.push(`${i[P].indicesSet(`input${P}Indices`,N,`${S}`)}`)}),g.push(`prod *= ${i[P].getByIndices(`input${P}Indices`)};`)}}),y.push(`for(var ${S}: u32 = 0; ${S} < uniforms.${Fb(S)}; ${S}++) {`),b.push("}")});let T=x?[...f,`let sum = ${i.map((I,S)=>I.getByIndices(`input${S}Indices`)).join(" * ")};`]:[...f,p,...y,...h,d,...g,m,...b];return`
            ${c.registerUniforms(u.map(I=>({name:`${Fb(I)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((I,S)=>`var input${S}Indices: ${i[S].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let c=u.filter(d=>r.symbolToInfo.has(d)).map(d=>({type:12,data:r.symbolToInfo.get(d)?.dimValue||0}));c.push({type:12,data:s});let f=n.map((d,p)=>[...k(d)]).reduce((d,p)=>d.concat(p),c);return f.push(...k(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}},getShaderSource:l}},Ub=(n,e)=>{let r=new uu(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,s)=>i.dims);n.compute(g0(o,n.inputs[0].dataType,r,t))},Gb=n=>{let e=n.equation.replace(/\s+/g,"");return J({equation:e})}});var y0,Hb,x0,_0,qb,Kb=v(()=>{"use strict";Z();te();ne();y0=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Hb=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},x0=(n,e)=>n.length>e.length?Hb(n,e):Hb(e,n),_0=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=x0(e,r),o=n[0].dataType,i=o===9||$.size(e)===1,s=o===9||e.length>0&&e[e.length-1]%4===0?4:1,a=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil($.size(t)/a),l=f=>{let d=A("input",o,e.length,s),p=E("output",o,t.length,a),m;if(o===9){let h=(y,b,g="")=>`
          let outputIndices${b} = ${p.offsetToIndices(`outputOffset + ${b}u`)};
          let offset${b} = ${d.broadcastedIndicesToOffset(`outputIndices${b}`,p)};
          let index${b} = offset${b} / 4u;
          let component${b} = offset${b} % 4u;
          ${y}[${b}] = ${g}(${d.getByOffset(`index${b}`)}[component${b}]);
        `;m=`
        let outputOffset = global_idx * ${a};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${p.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${p.offsetToIndices(`global_idx * ${a}`)};
        let inputOffset = ${d.broadcastedIndicesToOffset("outputIndices",p)};
        let data = ${p.type.value}(${d.getByOffset(`inputOffset / ${s}`)});
        ${p.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(d,p)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},c=[{type:12,data:u},...k(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${s}${a}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},qb=n=>{y0(n.inputs),n.compute(_0(n.inputs),{inputs:[0]})}});var T0,jb,Xb=v(()=>{"use strict";Z();te();ne();Ti();T0=n=>{let e=n[0].dataType,r=$.size(n[0].dims),t=$.size(n[1].dims),o=t%4===0,i=s=>{let a=A("x",e,[1],4),u=A("bias",e,[1],4),l=E("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=p=>`
      let bias${p}_offset: u32 = (global_idx * 4 + ${p}) % uniforms.bias_size;
      let bias${p} = ${u.getByOffset(`bias${p}_offset / 4`)}[bias${p}_offset % 4];`,d=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(a,u,l)}

    ${Qa(Me(e))}

    ${s.mainStart(Sr)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${d}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Ya("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/Sr/4)}})}},jb=n=>{n.inputs.length<2||$.size(n.inputs[1].dims)===0?Wh(n):n.compute(T0(n.inputs))}});var w0,v0,Zb,Jb,Qb=v(()=>{"use strict";Z();te();Ae();ne();w0=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},v0=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=$.normalizeAxis(e.axis,o),s=r.slice(0);s.splice(i,1,...t);let a=r[i],u=n[0].dataType===9?4:1,l=Math.ceil($.size(s)/u),c=[{type:12,data:l},{type:6,data:a},{type:12,data:i},...k(n[0].dims,n[1].dims,s)],f=d=>{let p=A("data",n[0].dataType,n[0].dims.length,u),m=A("inputIndices",n[1].dataType,n[1].dims.length),h=E("output",n[0].dataType,s.length,u),y=g=>{let x=t.length,T=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let I=0;I<x;I++)T+=`${x>1?`indicesIndices${g}[${I}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${I}]`:`outputIndices${g}`};`;T+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${p.type.indices};
        `;for(let I=0,S=0;I<o;I++)I===i?(T+=`${o>1?`dataIndices${g}[${I}]`:`dataIndices${g}`} = u32(idx${g});`,S+=x):(T+=`${o>1?`dataIndices${g}[${I}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${S}]`:`outputIndices${g}`};`,S++);return T},b;if(n[0].dataType===9){let g=(x,T,I="")=>`
          let outputIndices${T} = ${h.offsetToIndices(`outputOffset + ${T}u`)};
          ${y(T)};
          let offset${T} = ${p.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${x}[${T}] = ${I}(${p.getByOffset(`index${T}`)}[component${T}]);
        `;b=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else b=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${y("")};
      let value = ${p.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${d.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,m,h)}
      ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${b}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:f}},Zb=n=>J({axis:n.axis}),Jb=(n,e)=>{let r=n.inputs;w0(r),n.compute(v0(n.inputs,e))}});var I0,Yb,eg,tg=v(()=>{"use strict";Z();te();ne();I0=(n,e,r,t,o,i,s,a,u)=>{let l=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:s},{type:12,data:a},{type:12,data:u}],c=[i];l.push(...k(e.dims,c));let f=d=>{let p=A("indices_data",e.dataType,e.dims.length),m=E("input_slice_offsets_data",12,1,1),h=[p,m],y=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${d.registerUniforms(y).declareVariables(...h)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:l}),getShaderSource:f},{inputs:[e],outputs:[-1]})[0]},Yb=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,s=i[i.length-1],a=$.sizeToDimension(i,i.length-1),u=$.sizeFromDimension(t,e.batchDims+s),l=$.sizeToDimension(t,e.batchDims),c=$.sizeFromDimension(t,e.batchDims),f=a/l,d=new Array(s),p=u;for(let T=0;T<s;++T)d[s-1-T]=p,p*=t[e.batchDims+s-1-T];let m=I0(n,r[1],d,e.batchDims,t,a,f,c,s),h=e.batchDims+s;if(h>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let y=i.slice(0,-1).concat(t.slice(h)),b=$.size(y),g=[{type:12,data:b},{type:12,data:u},...k(r[0].dims,m.dims,y)],x=T=>{let I=A("data",r[0].dataType,r[0].dims.length),S=A("slice_offsets",12,m.dims.length),O=E("output",r[0].dataType,y.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,S,O)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:y,dataType:o}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:g}),getShaderSource:x},{inputs:[r[0],m]})},eg=n=>({batchDims:n.batch_dims,cacheKey:""})});var S0,$0,rg,ng,og=v(()=>{"use strict";Z();te();Ae();ne();S0=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=$.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],s=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===r?Math.ceil(a/t)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},$0=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=$.normalizeAxis(e.gatherAxis,o),s=$.normalizeAxis(e.quantizeAxis,o),a=r.slice(0);a.splice(i,1,...t);let u=$.size(a),l=n[2].dataType,f=n[0].dataType===22,d=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:e.blockSize},...k(...n.map((m,h)=>m.dims),a)],p=m=>{let h=A("data",n[0].dataType,n[0].dims.length),y=A("inputIndices",n[1].dataType,n[1].dims.length),b=A("scales",n[2].dataType,n[2].dims.length),g=n.length>3?A("zeroPoint",n[3].dataType,n[3].dims.length):void 0,x=E("output",l,a.length),T=[h,y,b];g&&T.push(g);let I=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${m.registerUniforms(I).declareVariables(...T,x)}
        ${m.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${y.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${y.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${h.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${h.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${y.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${h.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${h.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${h.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${h.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${b.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${b.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${b.getByIndices("scale_indices")};
        ${g?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${g.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${g.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Me(l)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((m,h)=>h!==1).map(m=>m.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(m,h)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:p}},rg=(n,e)=>{let r=n.inputs;S0(r,e),n.compute($0(n.inputs,e))},ng=n=>J({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var A0,O0,ig,sg,ag=v(()=>{"use strict";Z();te();Ae();ne();A0=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},O0=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,s=n[1].dataType,a=$.normalizeAxis(e.axis,o),u=r[a],l=i.slice(0),c=$.size(l),f=A("input",t,o),d=A("indicesInput",s,i.length),p=E("output",t,l.length),m=[{type:12,data:c},{type:6,data:u},{type:12,data:a}];return m.push(...k(r,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,d,p)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${p.offsetToIndices("global_idx")};

      var idx = ${d.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${p.setByOffset("global_idx","value")};
  }`}},ig=n=>J({axis:n.axis}),sg=(n,e)=>{let r=n.inputs;A0(r),n.compute(O0(n.inputs,e))}});var P0,E0,ug,lg,cg=v(()=>{"use strict";Z();te();ne();P0=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},E0=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,s]=mi.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),c=Math.ceil(o/u),f=!0,d=$.size(a),p=[{type:12,data:f?l:d},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:e.alpha},{type:1,data:e.beta}],m=["type","type"];n.length===3&&(p.push(...k(n[2].dims)),m.push("rank")),p.push(...k(a));let h=b=>{let g="";e.transA&&e.transB?g="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?g="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?g="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(g="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let x=e.alpha===1?"":"value *= uniforms.alpha;",T=A("a",n[0].dataType,n[0].dims),I=A("b",n[1].dataType,n[1].dims),S=T.type.value,O=null,P=[T,I];n.length===3&&(O=A("c",n[2].dataType,n[2].dims.length),P.push(O));let C=E("output",n[0].dataType,a.length);P.push(C);let N=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${b.registerUniforms(N).declareVariables(...P)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${S}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${g}
    }

    ${x}
    ${O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${S}(uniforms.beta) * ${O.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},y=b=>{let g=A("a",n[0].dataType,n[0].dims),x=A("b",n[1].dataType,n[1].dims),T=null,I=[g,x];n.length===3&&(T=A("c",n[2].dataType,n[2].dims.length),I.push(T));let S=E("output",n[0].dataType,a.length);I.push(S);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],P="",C="";e.transA&&e.transB?(C=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,P="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(C=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,P="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(C=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,P="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(C=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,P="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let N=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${b.registerUniforms(O).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${g.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${x.type.storage}, ${u}>, ${u}>;
  ${b.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${S.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${C}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${P}
      }
      workgroupBarrier();
    }

    ${N}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",S)}; value += ${S.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:l*c},programUniforms:p}),getShaderSource:y}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:h}},ug=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},lg=(n,e)=>{P0(n.inputs),n.compute(E0(n.inputs,e))}});var Ut,nr,Xr,Zr,C0,D0,k0,B0,z0,L0,R0,N0,fg,dg,pg=v(()=>{"use strict";Z();te();Ae();ne();[Ut,nr,Xr,Zr]=[0,1,2,3],C0=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},D0=`
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
`,k0=n=>`
  fn gs_bicubic_interpolate(p: mat4x4<${n}>, x: f32, y: f32) -> ${n} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${n}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,B0=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,z0=n=>`
  ${n.paddingMode==="reflection"?`
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
`,L0=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Ut}] = batch;
     indices[${nr}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Xr}] = u32(r);
            indices[${Zr}] = u32(c);
          }
        `;case"border":return`
          indices[${Xr}] = u32(clamp(r, 0, H - 1));
          indices[${Zr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Xr}] = gs_reflect(r, border[1], border[3]);
          indices[${Zr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${n.getByIndices("indices")};
  }
`,R0=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Ut}], indices[${nr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Ut}], indices[${nr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Ut}], indices[${nr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Ut}], indices[${nr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Ut}], indices[${nr}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Ut}], indices[${nr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,N0=(n,e)=>{let r=A("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=A("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[Ut,nr,Xr,Zr]=[0,3,1,2]);let s=E("output",n[0].dataType,i.length),a=r.type.value,u=$.size(i),l=[{type:12,data:u},...k(n[0].dims,t,i)],c=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,o,s)}
  ${D0}
  ${k0(a)}
  ${B0(e)}
  ${z0(e)}
  ${L0(r,a,e)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Xr}]);
      let W_in = i32(uniforms.x_shape[${Zr}]);

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

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Ut}], indices[${Xr}], indices[${Zr}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${R0(s,a,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let d=$.size(i);return{outputs:[{dims:i,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:l}},getShaderSource:c}},fg=(n,e)=>{C0(n.inputs),n.compute(N0(n.inputs,e))},dg=n=>J({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var tt,F0,hg,mg,U0,Kn,bg,lu=v(()=>{"use strict";Z();te();Ae();pi();xi();ne();Ft();tt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,F0=(n,e)=>{let r=n[0],t=tt(n,1),o=tt(n,2),i=tt(n,3),s=tt(n,4),a=tt(n,5),u=tt(n,6),l=tt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],f=r.dims[1],d=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],p=f,m=0,h=0,y=Math.floor(d/e.numHeads);if(u&&l&&$.size(u.dims)&&$.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==y)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==y)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],h=u.dims[2]}else if(u&&$.size(u.dims)||l&&$.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let b;if(t&&$.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');b=2,p=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');b=5,p=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');b=0,p=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');b=3}if(i&&$.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=m+p,x=0;if(s&&$.size(s.dims)>0){x=8;let O=s.dims;throw O.length===1?O[0]===c?x=1:O[0]===3*c+2&&(x=3):O.length===2&&O[0]===c&&O[1]===g&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,I=d;if(o&&$.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(p!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=o.dims[2]}else{if(p!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=o.dims[1]*o.dims[3],T=!0}}let S=!1;if(s&&$.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&$.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==c||a.dims[1]!==e.numHeads||a.dims[2]!==f||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:g,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:d,vHiddenSize:I,headSize:y,vHeadSize:Math.floor(I/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:S,passPastInKv:T,qkvFormat:b}},hg=n=>J({...n}),mg=J({perm:[0,2,1,3]}),U0=(n,e,r,t,o,i,s)=>{let a=[t,o,i],u=$.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],c=f=>{let d=E("qkv_with_bias",e.dataType,a),p=A("qkv",e.dataType,a),m=A("bias",r.dataType,a),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(h).declareVariables(p,m,d)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,r],outputs:[-1]})[0]},Kn=(n,e,r,t,o,i,s,a)=>{let u=i;if(s&&$.size(s.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=U0(n,i,s,e,t,r*o,a),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(Fe(u,mg.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(Fe(u,mg.perm),{inputs:[u],outputs:[-1]})[0]},bg=(n,e)=>{let r=F0(n.inputs,e),t=n.inputs[0],o=tt(n.inputs,1),i=tt(n.inputs,2),s=tt(n.inputs,3),a=tt(n.inputs,4),u=tt(n.inputs,5),l=tt(n.inputs,6),c=tt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let f=o&&i&&o.dims.length===4&&i.dims.length===4,d=Kn(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,s,0);if(f)return jr(n,d,o,i,a,void 0,l,c,u,r);if(!o||!i)throw new Error("key and value must be provided");let p=Kn(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,s,r.hiddenSize),m=Kn(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,s,2*r.hiddenSize);jr(n,d,p,m,a,void 0,l,c,u,r)}});var G0,W0,H0,q0,cu,gg,yg,fu=v(()=>{"use strict";Z();te();Ae();ne();G0=n=>{if(!n||n.length<1)throw new Error("too few inputs")},W0=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),J({numOutputs:t,axis:e.axis,splitSizes:r})},H0=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${V("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,q0=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},cu=(n,e)=>{let r=n[0].dims,t=$.size(r),o=n[0].dataType,i=$.normalizeAxis(e.axis,r.length),s=new Array(e.numOutputs),a=A("input",o,r.length),u=new Array(e.numOutputs),l=[],c=[],f=0,d=[{type:12,data:t}];for(let m=0;m<e.numOutputs;m++){f+=e.splitSizes[m],u[m]=f;let h=r.slice();h[i]=e.splitSizes[m],c.push(h),s[m]=E(`output${m}`,o,h.length),l.push({dims:c[m],dataType:n[0].dataType})}d.push({type:12,data:u},...k(r,...c));let p=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${H0(u.length)}
  ${q0(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${V("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:d})}},gg=(n,e)=>{G0(n.inputs);let r=n.inputs.length===1?e:W0(n.inputs,e);n.compute(cu(n.inputs,r),{inputs:[0]})},yg=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return J({axis:e,numOutputs:t,splitSizes:r})}});var K0,j0,xg,_g,Tg=v(()=>{"use strict";Ae();xi();lu();fu();Ft();K0=(n,e)=>{if(e.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],s=n[4];if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=r.dims[0],l=r.dims[1],c=r.dims.length===3?a?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],f=l,d=0,p=!t||t.dims.length===0,m=Math.floor(p?c/(e.numHeads+2*e.kvNumHeads):c/e.numHeads);p&&(c=m*e.numHeads);let h=i&&i.dims.length!==0,y=s&&s.dims.length!==0;if(h&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(h&&y){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');d=i.dims[2]}else if(h||y)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');f=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let x=0,T=!1,I=e.kvNumHeads?m*e.kvNumHeads:c;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=o.dims[1]*o.dims[3],T=!0}}let S=n.length>4?n[5]:void 0;if(S&&S.dims.length!==1&&S.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:l,pastSequenceLength:d,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:I,headSize:m,vHeadSize:Math.floor(I/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:e.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:g}},j0=J({perm:[0,2,1,3]}),xg=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(Fe(t,j0.perm),{inputs:[t],outputs:[-1]})[0]),t},_g=(n,e)=>{let r=K0(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,s=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,a=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,l=n.inputs.length>5?n.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=J({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[d,p,m]=!o&&!i?n.compute(cu([t],f),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],h=Kn(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,d,void 0,0);jr(n,h,xg(n,p,r),xg(n,m,r),void 0,void 0,s,a,void 0,r,u,l)}});var wg,X0,Z0,vg,Ig=v(()=>{"use strict";Z();te();Ft();ne();wg=(n,e,r,t,o,i,s,a)=>{let u=fe(i),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,f=o*s,d=64;f===1&&(d=256);let p=[o,s,i/u],m=[o,s,2],h=["rank","type","type"],y=[];y.push(...k(p,m));let b=g=>{let x=A("x",e.dataType,3,u),T=A("scale",r.dataType,r.dims),I=A("bias",t.dataType,t.dims),S=E("output",1,3,2),O=[x,T,I,S];return`
  var<workgroup> workgroup_shared : array<${c}, ${d}>;
  const workgroup_size = ${d}u;
  ${g.declareVariables(...O)}
  ${g.mainStart(d)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${x.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Tt("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Tt("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a};${d}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:f},programUniforms:y}),getShaderSource:b},{inputs:[e,r,t],outputs:[-1]})[0]},X0=(n,e,r)=>{let t=e[0].dims,o=t,i=2,s=t[0],a=t[1],u=$.sizeFromDimension(t,i),l=fe(u),c=$.size(o)/l,f=wg(n,e[0],e[1],e[2],s,u,a,r.epsilon),d=[s,a,u/l],p=[s,a],m=["type","none"],h=y=>{let b=A("x",e[0].dataType,d.length,l),g=A("scale_shift",1,p.length,2),x=E("output",e[0].dataType,d.length,l),T=[b,g,x];return`
  ${y.registerUniform("output_size","u32").declareVariables(...T)}
  ${y.mainStart()}
  ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${b.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...k(d,p,d)]}),getShaderSource:h},{inputs:[e[0],f]})},Z0=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],s=t[t.length-1],a=$.sizeFromDimension(t,1)/s,u=fe(s),l=$.size(o)/u,c=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],f=["type","type"],d=!1,p=[0,t.length-1];for(let b=0;b<t.length-2;b++)d=d||t[b+1]!==1,p.push(b+1);d=d&&t[t.length-1]!==1;let m=d?n.compute(Fe(n.inputs[0],p),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(b,g)=>t[p[g]])),h=wg(n,m,e[1],e[2],i,a,s,r.epsilon),y=b=>{let g=_e(e[0].dataType),x=u===1?"vec2f":`mat${u}x2f`,T=O=>{let P=O===0?"x":"y",C=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${g}(${C}(scale.${P}))`;case 2:return`vec2<${g}>(${C}(scale[0].${P}, scale[1].${P}))`;case 4:return`vec4<${g}>(${C}(scale[0].${P}, scale[1].${P}, scale[2].${P}, scale[3].${P}))`;default:throw new Error(`Not supported compoents ${u}`)}},I=A("input",e[0].dataType,e[0].dims,u),S=E("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${x}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${S.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${b.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:y},{inputs:[e[0],h]})},vg=(n,e)=>{e.format==="NHWC"?Z0(n,n.inputs,e):X0(n,n.inputs,e)}});var J0,Q0,Sg,$g=v(()=>{"use strict";Z();te();ne();J0=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Q0=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],s=!t&&n[2],a=o,u=$.normalizeAxis(e.axis,o.length),l=$.sizeToDimension(o,u),c=$.sizeFromDimension(o,u),f=$.size(i.dims),d=s?$.size(s.dims):0;if(f!==c||s&&d!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${d}`);let p=[];for(let I=0;I<o.length;++I)I<u?p.push(o[I]):p.push(1);let m=fe(c),h=["type","type"],y=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/m)},{type:1,data:e.epsilon}];s&&h.push("type");let b=r>1,g=r>2,x=I=>{let S=_e(n[0].dataType),O=[A("x",n[0].dataType,n[0].dims,m),A("scale",i.dataType,i.dims,m)];s&&O.push(A("bias",s.dataType,s.dims,m)),O.push(E("output",n[0].dataType,a,m)),b&&O.push(E("mean_data_output",1,p)),g&&O.push(E("inv_std_output",1,p));let P=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(P).declareVariables(...O)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ja("f32",m)};
    var mean_square_vector = ${ja("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${$r(S,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Tt("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Tt("mean_square_vector",m)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${$r(S,m,"x[j + offset]")};
      let f32scale = ${$r(S,m,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${$r(S,m,"bias[j]")}`:""}
      );
    }

    ${b?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:a,dataType:n[0].dataType}];return b&&T.push({dims:p,dataType:1}),g&&T.push({dims:p,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${t}`,inputDependencies:h},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:y}),getShaderSource:x}},Sg=(n,e)=>{J0(n.inputs),n.compute(Q0(n.inputs,e,n.outputCount))}});var Y0,Ag,Og=v(()=>{"use strict";te();Si();$i();Y0=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},Ag=n=>{Y0(n.inputs);let e=kt.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(Ii(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=$.size(n.inputs[0].dims.slice(0,-2)),s=$.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&s===1){let a=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),l=[1,i,r],c=[a,u];n.compute(qn(c,{activation:""},e,l),{inputs:c})}else n.compute(qn(n.inputs,{activation:""},e))}}});var e2,t2,r2,Pg,Eg,Cg=v(()=>{"use strict";Z();te();Ae();ne();e2=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,s=n[1];if(!$.areEqual(s.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if($.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let c=n[3].dims,f=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if($.size(c)!==f)throw new Error("zeroPoints input size error.")}},t2=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,s=e.n,a=r.slice(0,t-2),u=$.size(a),c=n[1].dims[2]/4,f=n[0].dataType,d=fe(e.k),p=fe(c),m=fe(s),h=a.concat([o,s]),y=o>1&&s/m%2===0?2:1,b=$.size(h)/m/y,g=64,x=[],T=[u,o,i/d],I=$.convertShape(n[1].dims).slice();I.splice(-1,1,c/p),x.push(...k(T)),x.push(...k(I)),x.push(...k(n[2].dims)),n.length===4&&x.push(...k($.convertShape(n[3].dims)));let S=[u,o,s/m];x.push(...k(S));let O=P=>{let C=T.length,N=A("a",n[0].dataType,C,d),F=A("b",12,I.length,p),H=A("scales",n[2].dataType,n[2].dims.length),L=[N,F,H],Q=n.length===4?A("zero_points",12,n[3].dims.length):void 0;Q&&L.push(Q);let Se=S.length,M=E("output",n[0].dataType,Se,m),G=_e(n[0].dataType),oe=(()=>{switch(d){case 1:return`array<${G}, 8>`;case 2:return`mat4x2<${G}>`;case 4:return`mat2x4<${G}>`;default:throw new Error(`${d}-component is not supported.`)}})(),X=()=>{let Pe=`
          // reuse a data
            var input_offset = ${N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`)};
            var a_data: ${oe};
            for (var j: u32 = 0; j < ${8/d}; j++) {
              a_data[j] = ${N.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let Y=0;Y<m*y;Y++)Pe+=`
            b_value = ${p===1?`b${Y}_data`:`b${Y}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${oe}(${Array.from({length:4},(D,W)=>`${G}(b_value_lower[${W}]), ${G}(b_value_upper[${W}])`).join(", ")});
            b_dequantized_values = ${d===1?`${oe}(${Array.from({length:8},(D,W)=>`(b_quantized_values[${W}] - ${Q?`zero_point${Y}`:"zero_point"}) * scale${Y}`).join(", ")});`:`(b_quantized_values - ${oe}(${Array(8).fill(`${Q?`zero_point${Y}`:"zero_point"}`).join(",")})) * scale${Y};`};
            workgroup_shared[local_id.x * ${y} + ${Math.floor(Y/m)}]${m>1?`[${Y%m}]`:""} += ${Array.from({length:8/d},(D,W)=>`${d===1?`a_data[${W}] * b_dequantized_values[${W}]`:`dot(a_data[${W}], b_dequantized_values[${W}])`}`).join(" + ")};
          `;return Pe},Oe=()=>{let Pe=`
            var col_index = col * ${m};
            ${Q?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${G}(8);`}
            `;for(let Y=0;Y<m*y;Y++)Pe+=`
            let scale${Y} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${Q?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${Y} = ${G}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Pe},je=()=>{let Pe=`col_index = col * ${m};`;for(let Y=0;Y<m*y;Y++)Pe+=`
            let b${Y}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Pe+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${oe};
            var b_dequantized_values: ${oe};`,Pe};return`
        var<workgroup> workgroup_shared: array<${M.type.value}, ${y*g}>;
        ${P.declareVariables(...L,M)}
        ${P.mainStart([g,1,1])}
          let output_indices = ${M.offsetToIndices(`(global_idx / ${g}) * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/d};
            ${Oe()}
            for (var word: u32 = 0; word < ${c}; word += ${p}) {
              ${je()}
              for (var i: u32 = 0; i < ${p}; i++) {
                ${X()}
                word_offset += ${8/d};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${y}) {
            var output_value: ${M.type.value} = ${M.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${y};
            }
            ${M.setByIndices(`${M.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${d};${p};${m};${y};${g}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:f}],dispatchGroup:{x:b},programUniforms:x}),getShaderSource:O}},r2=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,s=e.n,a=r.slice(0,t-2),u=$.size(a),c=n[1].dims[2]/4,f=n[0].dataType,d=fe(e.k),p=fe(c),m=a.concat([o,s]),h=128,y=s%8===0?8:s%4===0?4:1,b=h/y,g=b*p*8,x=g/d,T=g/e.blockSize,I=$.size(m)/y,S=[],O=[u,o,i/d],P=$.convertShape(n[1].dims).slice();P.splice(-1,1,c/p),S.push(...k(O)),S.push(...k(P)),S.push(...k(n[2].dims)),n.length===4&&S.push(...k($.convertShape(n[3].dims)));let C=[u,o,s];S.push(...k(C));let N=F=>{let H=O.length,L=A("a",n[0].dataType,H,d),Q=A("b",12,P.length,p),Se=A("scales",n[2].dataType,n[2].dims.length),M=[L,Q,Se],G=n.length===4?A("zero_points",12,n[3].dims.length):void 0;G&&M.push(G);let oe=C.length,X=E("output",n[0].dataType,oe),Oe=_e(n[0].dataType),je=()=>{switch(d){case 1:return`
          let a_data0 = vec4<${Oe}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Oe}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Oe}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Oe}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${d}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${L.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${X.type.value}, ${b}>, ${y}>;
        ${F.declareVariables(...M,X)}
        ${F.mainStart([b,y,1])}
          let output_indices = ${X.offsetToIndices(`workgroup_index * ${y}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += ${h})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${L.getByIndices(`${L.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${L.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${G?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${G.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${Oe}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Oe}(8);`}
            let scale = ${Se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Q.getByIndices(`${Q.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/d};
            for (var i: u32 = 0; i < ${p}; i++) {
              ${je()}
              let b_value = ${p===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Oe}>(${Array.from({length:4},(Pe,Y)=>`${Oe}(b_value_lower[${Y}]), ${Oe}(b_value_upper[${Y}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Oe}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Pe,Y)=>`${`dot(a_data${Y}, b_dequantized_values[${Y}])`}`).join(" + ")};
              word_offset += ${8/d};
            }
            workgroupBarrier();
          }

          if (local_idx < ${y}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            for (var b = 0u; b < ${b}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${X.setByIndices(`${X.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${d};${p};${b};${y}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:f}],dispatchGroup:{x:I},programUniforms:S}),getShaderSource:N}},Pg=(n,e)=>{e2(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(r2(n.inputs,e)):n.compute(t2(n.inputs,e))},Eg=n=>J(n)});var n2,o2,i2,s2,a2,u2,l2,c2,Dg,kg=v(()=>{"use strict";Z();te();ne();n2=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},o2=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${n.indicesGet("indices",o)}) - ${V("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${V("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${V("uniforms.x_strides",o,e)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},i2=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${V("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${V("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${V("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${V("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},s2=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${V("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${V("uniforms.x_shape",o,e)})) {
                  k = i32(${V("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${V("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},a2=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${V("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${V("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${V("uniforms.x_shape",o,e)})) {
                  k -= i32(${V("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${V("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},u2=(n,e,r)=>{switch(r.mode){case 0:return o2(n,e,r.pads.length);case 1:return i2(n,e,r.pads.length);case 2:return s2(n,e,r.pads.length);case 3:return a2(n,e,r.pads.length);default:throw new Error("Invalid mode")}},l2=(n,e)=>{let r=$.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=$.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],s=n.length>=3&&n[2].data;e.mode===0&&i.push({type:s?n[2].dataType:1,data:e.value}),i.push(...k(n[0].dims,r));let a=["rank"],u=l=>{let c=E("output",n[0].dataType,r.length),f=A("x",n[0].dataType,t.length),d=f.type.value,p=u2(c,t.length,e),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&m.push({name:"constant_value",type:s?d:"f32"}),`
            ${l.registerUniforms(m).declareVariables(f,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${d}(0);
            ${p}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil($.size(r)/64)},programUniforms:i}),getShaderSource:u}},c2=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let a=n[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(r[u]),i[Number(a[u])+o]=Number(r[u+a.length])}else r.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:e.mode,value:t,pads:s}}else return e},Dg=(n,e)=>{n2(n.inputs);let r=c2(n.inputs,e);n.compute(l2(n.inputs,r),{inputs:[0]})}});var Pi,Bg,zg,Lg,Rg,f2,d2,Ng,Vg,Mg,Fg,Ug,Gg,Wg,Hg,qg,Kg,jg,Xg,Zg=v(()=>{"use strict";qe();Z();te();ne();Pi=n=>{if(ee.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},Bg=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),s=e.kernelShape.slice(),a=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();Ir.adjustPoolAttributes(r,o,s,a,u,l);let c=Ir.computePoolOutputShape(r,o,a,u,s,l,e.autoPad),f=Object.assign({},e);i?Object.assign(f,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:s,strides:a,pads:l,cacheKey:e.cacheKey});let d=c.slice();return d.push(d.splice(1,1)[0]),[f,t?d:c]},zg=(n,e)=>{let r=e.format==="NHWC",t=$.size(n),o=$.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],f=!!(l+c);i.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let d=!1;if(e.kernelShape.length===2){let p=e.kernelShape[e.kernelShape.length-2],m=e.strides[e.strides.length-2],h=e.pads[e.pads.length/2-2],y=e.pads[e.pads.length-2];d=!!(h+y),i.push({type:12,data:p},{type:12,data:m},{type:12,data:h},{type:12,data:y}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,f,d]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=$.computeStrides(e.kernelShape);i.push({type:12,data:a},{type:12,data:e.pads},{type:12,data:e.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[i,s,!!u,!1,!1]}},Lg=(n,e,r,t,o,i,s,a,u,l,c,f)=>{let d=o.format==="NHWC",p=e.type.value,m=E("output",e.type.tensor,t);if(o.kernelShape.length<=2){let h="",y="",b="",g=r-(d?2:1);if(c?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(d?3:2);f?y=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:y=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,b=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,m)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${p}(${a});
              var pad = 0;
              ${y}
              ${h}
              ${b}
              ${s}

              output[global_idx] = value;
            }`}else{if(d)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,y=o.pads.length,b="";return l?b=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:b=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${n.registerUniforms(u).declareVariables(e,m)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${p}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${V("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${V("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${r-h}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${V("uniforms.strides",`j - ${r-h}u`,h)}
                    + offsets[j - ${r-h}u] - ${V("uniforms.pads","j - 2u",y)};
                  ${b}
              }
              ${s}

              output[global_idx] = value;
            }`}},Rg=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,f2=n=>`${Rg(n)};${n.countIncludePad}`,d2=n=>`${Rg(n)};${n.storageOrder};${n.dilations}`,Ng=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),Vg=(n,e,r,t)=>{let[o,i]=Bg(e,t,r),s=A("x",e.dataType,e.dims.length),a=s.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[c,f,d,p,m]=zg(i,o);c.push(...k(e.dims,i));let h=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${d};${p};${m}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil($.size(i)/64)},programUniforms:c}),getShaderSource:y=>Lg(y,s,e.dims.length,i.length,o,u,l,0,f,d,p,m)}},Mg=n=>{let e=n.count_include_pad!==0,r=Ng(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:f2(t)}},Fg=(n,e)=>{Pi(n.inputs),n.compute(Vg("AveragePool",n.inputs[0],!1,e))},Ug={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Gg=n=>{let e=n.format;return{format:e,...Ug,cacheKey:e}},Wg=(n,e)=>{Pi(n.inputs),n.compute(Vg("GlobalAveragePool",n.inputs[0],!0,e))},Hg=(n,e,r,t)=>{let[o,i]=Bg(e,t,r),s=`
      value = max(x_val, value);
    `,a="",u=A("x",e.dataType,e.dims.length),l=["rank"],[c,f,d,p,m]=zg(i,o);return c.push(...k(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${d};${p};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil($.size(i)/64)},programUniforms:c}),getShaderSource:h=>Lg(h,u,e.dims.length,i.length,o,s,a,e.dataType===10?-65504:-1e5,f,d,p,m)}},qg=(n,e)=>{Pi(n.inputs),n.compute(Hg("MaxPool",n.inputs[0],!1,e))},Kg=n=>{let e=n.storage_order,r=n.dilations,t=Ng(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:d2(o)}},jg=n=>{let e=n.format;return{format:e,...Ug,cacheKey:e}},Xg=(n,e)=>{Pi(n.inputs),n.compute(Hg("GlobalMaxPool",n.inputs[0],!0,e))}});var m2,h2,Jg,Qg,Yg=v(()=>{"use strict";Z();te();Ae();ne();m2=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},h2=(n,e)=>{let r=$.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,s=n[1].dataType,a=$.size(i),u=t===3||t===2,l=u?[Math.ceil($.size(n[0].dims)/4)]:n[0].dims,c=n[1].dims,f=n.length>2?n[2]:void 0,d=f?u?[Math.ceil($.size(f.dims)/4)]:f.dims:void 0,p=c.length===0||c.length===1&&c[0]===1,m=p===!1&&c.length===1,h=fe(a),y=p&&(!u||h===4),b=y?h:1,g=y&&!u?h:1,x=A("input",u?12:t,l.length,g),T=A("scale",s,c.length),I=f?A("zero_point",u?12:t,d.length):void 0,S=E("output",s,i.length,b),O=[x,T];I&&O.push(I);let P=[l,c];f&&P.push(d);let C=[{type:12,data:a/b},{type:12,data:r},{type:12,data:e.blockSize},...k(...P,i)],N=F=>{let H=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${F.registerUniforms(H).declareVariables(...O,S)}
      ${F.mainStart()}
          ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${S.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${b===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`};

          // Set scale input
          ${p?`let scale_value= ${T.getByOffset("0")}`:m?`
            let scale_index = ${S.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?p?u?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:m?u?`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":x.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset("global_idx",`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:N,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/b/64),y:1,z:1},programUniforms:C})}},Jg=(n,e)=>{m2(n.inputs,e),n.compute(h2(n.inputs,e))},Qg=n=>J({axis:n.axis,blockSize:n.blockSize})});var b2,g2,ey,ty=v(()=>{"use strict";qe();Z();ne();b2=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},g2=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],s=o,a=[{type:12,data:s},{type:t,data:n},{type:t,data:r},...k(i)],u=l=>{let c=E("output",t,i.length),f=c.type.value,d=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${l.registerUniforms(d).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},ey=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),ee.webgpu.validateInputContent&&b2(e,r,t),n.compute(g2(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var y2,x2,ry,ny,oy=v(()=>{"use strict";Z();te();Ae();ne();y2=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
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
              }`;switch(n){case"none":return`${e}=${r};`;case"add":return t==="i32"||t==="u32"?`atomicAdd(&${e}, bitcast<${t}>(${r}));`:`
              ${o}bitcast<${t}>(oldValue) + (${r})${i}`;case"max":return t==="i32"||t==="u32"?`atomicMax(&${e}, bitcast<${t}>(${r}));`:`
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},x2=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,s=Math.ceil($.size(t)/i),a=t[t.length-1],u=$.sizeFromDimension(r,a),l=[{type:12,data:s},{type:12,data:a},{type:12,data:u},...k(n[1].dims,n[2].dims,o)],c=f=>{let d=A("indices",n[1].dataType,n[1].dims.length),p=A("updates",n[2].dataType,n[2].dims.length,i),m=e.reduction!=="none"&&e.reduction!==""?Cm("output",n[0].dataType,o.length):E("output",n[0].dataType,o.length,i);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(d,p,m)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${e.reduction==="none"}) {
    let n = ${$.size(t)};
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
  if (${e.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${n[0].dims.length===1?`
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
    ${y2(e.reduction,"output[data_offset + i]","value",m.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l}),getShaderSource:c}},ry=n=>J({reduction:n.reduction}),ny=(n,e)=>{n.compute(x2(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var _2,T2,w2,iy,v2,I2,S2,$2,A2,O2,P2,E2,sy,C2,D2,k2,B2,z2,ay,uy,ly=v(()=>{"use strict";Z();te();Ae();ne();_2=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},T2=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},w2=(n,e,r,t,o,i)=>{let[s,a,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],l=n[0].dims.length;if(s>0&&n.length>s&&n[s].dims.length>0)n[s].getFloat32Array().forEach(c=>i.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&n.length>a&&n[a].dims.length===1&&n[a].dims[0]>0){if(n[a].getFloat32Array().forEach(c=>t.push(c)),t.length!==0&&t.length!==l&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");_2(t,e),e.axes.length>0&&T2(t,e.axes,l).forEach((c,f)=>t[f]=c)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==0&&o.length!==l&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},iy=(n,e,r,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${t}(big / (${r}));
  let fract = ${t}(big % (${r})) / ${t}(${r});
  return whole + fract;
`,v2=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${iy("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${iy("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",I2=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",S2=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,s)=>{t[i]=o[s],t[s+r]=o[e.length+s]}),t):o},$2=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,s)=>o[i]=r[s])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,s)=>Math.round(i*e[s]))}return o},A2=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,s)=>o[s]=Math.round(i*e[s]))),o},O2=(n,e,r,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${n.type.indices}) -> array<${n.type.value}, ${r.length}> {
      var original_indices: array<${n.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${n.indicesGet("output_indices","i")};
        var scale = ${V("uniforms.scales","i",t)};
        var roi_low = ${V("uniforms.roi","i",o)};
        var roi_hi = ${V("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${n.type.value}(output_index);
        } else {
          var input_shape_i = ${V("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${V("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,P2=(n,e,r,t,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
      var input_indices: ${n.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${V("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${V("uniforms.roi","i",i)};
          var roi_hi = ${V("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${V("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${V("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
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
        ${n.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,E2=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${V("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,sy=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",C2=(n,e,r,t,o)=>{let[s,a,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],c=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${sy(n,l,s,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${a}];
      var col:${c} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${c} = getInputValue(batch, channel, row1, col1);
      var x12: ${c} = getInputValue(batch, channel, row1, col2);
      var x21: ${c} = getInputValue(batch, channel, row2, col1);
      var x22: ${c} = getInputValue(batch, channel, row2, col2);
      var dx1: ${c} = abs(row - ${c}(row1));
      var dx2: ${c} = abs(${c}(row2) - row);
      var dy1: ${c} = abs(col - ${c}(col1));
      var dy2: ${c} = abs(${c}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},D2=(n,e,r,t,o,i,s,a,u,l)=>{let c=r.length===2,f=!0,[d,p]=c?[0,1]:f?[2,3]:[1,2],m=n.type.value,h=y=>{let b=y===d?"row":"col";return`
      fn ${b}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${m} {
        var output_index = ${e.indicesGet("output_indices",y)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[y]},
        ${t[y]}, ${r[y]}, ${i[y]}, ${i[y]} + ${r.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${r[y]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${b}: ${m} = originalIdx + ${m}(i);
          if (${b} < 0 || ${b} >= ${r[y]}) {
            ${l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${b} = max(0, min(${b}, ${r[y]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",y,`u32(${b})`)};
          data[i + 1] = ${y===d?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(d)};
    ${h(p)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${m} {
    var input_indices: ${n.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},k2=(n,e,r,t,o)=>{let[s,a,u,l,c]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${sy(n,c,s,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${a}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${c}])`:"0"};
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
    }`},B2=(n,e,r,t,o,i)=>{let s=n.dims,a=S2(i,e.axes,s.length),u=$2(s,t,o,e.axes),l=t.slice();t.length===0&&(l=s.map((g,x)=>g===0?1:u[x]/g),e.keepAspectRatioPolicy!=="stretch"&&(u=A2(s,l,e)));let c=E("output",n.dataType,u.length),f=A("input",n.dataType,s.length),d=$.size(u),p=s.length===u.length&&s.every((g,x)=>g===u[x]),m=e.coordinateTransformMode==="tf_crop_and_resize",h=e.extrapolationValue,y=f.type.value,b=g=>`
      ${p?"":`
      ${v2(e.coordinateTransformMode,y)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${E2(f,s)};
              ${I2(e.nearestMode,r,y)};
              ${P2(f,c,s,u,l.length,a.length,m)};
              `;case"linear":return`
              ${O2(c,s,u,l.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${C2(f,c,s,m,h)}`;if(s.length===3||s.length===5)return`${k2(f,c,s,m,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${D2(f,c,s,u,l,a,e.cubicCoeffA,m,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(f,c)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${p?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${l.length>0?e.mode==="cubic"?l:l.length:""}|${o.length>0?o:""}|${a.length>0?a:""}|${p}|${e.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},{type:1,data:l},{type:1,data:a},...k(s,u)]})}},z2=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},ay=(n,e)=>{let r=[],t=[],o=[],i=z2(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");w2(n.inputs,e,i,r,t,o),n.compute(B2(n.inputs[0],e,i,r,t,o),{inputs:[0]})},uy=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,s=n.extrapolationValue,a=n.keepAspectRatioPolicy,u=n.mode,l=n.nearestMode===""?"simple":n.nearestMode;return J({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var L2,R2,cy,fy=v(()=>{"use strict";Z();te();Ae();ne();L2=(n,e)=>{let[r,t,o,i]=n,{numHeads:s,rotaryEmbeddingDim:a}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!$.areEqual(t.dims,[])&&!$.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!$.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],l=r.dims[r.dims.length-2],c=o.dims[0],f=$.sizeFromDimension(r.dims,1)/l,d=a===0?o.dims[1]*2:f/s;if(a>d)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(d/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},R2=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,s=n[0].dims[0],a=$.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],l=a/u,c=n[2].dims[1],f=o===0?c*2:l/t,d=new Array(s,u,l/f,f-c),p=$.computeStrides(d),m=[{type:1,data:i},{type:12,data:d},{type:12,data:p},...n[0].dims.length===3?new Array({type:12,data:[a,l,f,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[a,f,u*f,1]}):[],...k(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],h=y=>{let b=A("input",n[0].dataType,n[0].dims.length),g=A("position_ids",n[1].dataType,n[1].dims.length),x=A("cos_cache",n[2].dataType,n[2].dims.length),T=A("sin_cache",n[3].dataType,n[3].dims.length),I=E("output",n[0].dataType,n[0].dims.length);return y.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:d.length},{name:"global_strides",type:"u32",length:p.length},{name:"input_output_strides",type:"u32",length:p.length}]),`
        ${y.declareVariables(b,g,x,T,I)}

        ${y.mainStart(Sr)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",E("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${b.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${b.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${b.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${b.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",b.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:J({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil($.size(d)/Sr)},programUniforms:m})}},cy=(n,e)=>{L2(n.inputs,e),n.compute(R2(n.inputs,e))}});var N2,V2,dy,py=v(()=>{"use strict";Z();te();ne();N2=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let s=n[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let s=n[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},V2=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,s=$.size(i),a=i,u=s,l=i.slice(-1)[0],c=t?i.slice(0,-1).concat(1):[],f=!o&&n.length>3,d=n.length>4,p=t&&r>1,m=t&&r>2,h=r>3,y=64,b=fe(l),g=[{type:12,data:u},{type:12,data:b},{type:12,data:l},{type:1,data:e.epsilon}],x=I=>{let S=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[A("x",n[0].dataType,n[0].dims,b),A("skip",n[1].dataType,n[1].dims,b),A("gamma",n[2].dataType,n[2].dims,b)];f&&O.push(A("beta",n[3].dataType,n[3].dims,b)),d&&O.push(A("bias",n[4].dataType,n[4].dims,b)),O.push(E("output",n[0].dataType,a,b)),p&&O.push(E("mean_output",1,c)),m&&O.push(E("inv_std_output",1,c)),h&&O.push(E("input_skip_bias_sum",n[0].dataType,a,b));let P=_e(n[0].dataType),C=_e(1,b);return`

      ${I.registerUniforms(S).declareVariables(...O)}
      var<workgroup> sum_shared : array<${C}, ${y}>;
      var<workgroup> sum_squared_shared : array<${C}, ${y}>;

      ${I.mainStart([y,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${y};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${y};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${y-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${d?"bias[offset1d + i]":P+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${$r(P,b,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${y};
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
        let mean = ${Tt("sum",b)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Tt("square_sum",b)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${p?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${P}(mean)`}) *
            ${P}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:a,dataType:n[0].dataType}];return r>1&&T.push({dims:c,dataType:1}),r>2&&T.push({dims:c,dataType:1}),r>3&&T.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${b};${p};${m};${h}`,inputDependencies:n.map((I,S)=>"type")},getShaderSource:x,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:g})}},dy=(n,e)=>{N2(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(V2(n.inputs,e,n.outputCount,!1),{outputs:t})}});var M2,Ei,F2,my,U2,G2,hy,by,gy=v(()=>{"use strict";Z();te();Ae();ne();M2=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ei=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},F2=(n,e)=>{if(n.length>1){let r=Ei(n,1),t=Ei(n,2),o=Ei(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),J({starts:r,ends:t,axes:o})}else return e},my=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},U2=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${V("uniforms.input_shape","i",r.length)};
            let steps_i = ${V("uniforms.steps","i",r.length)};
            let signs_i = ${V("uniforms.signs","i",r.length)};
            let starts_i = ${V("uniforms.starts","i",r.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${n.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,G2=(n,e)=>{let r=n[0].dims,t=$.size(r),o=e.axes.length>0?$.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Ei(n,4);i.forEach(b=>b!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=e.starts.map((b,g)=>my(b,g,r,o,i)),a=e.ends.map((b,g)=>my(b,g,r,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let b=0;b<r.length;++b)o.includes(b)||(s.splice(b,0,0),a.splice(b,0,r[b]),i.splice(b,0,1));let u=i.map(b=>Math.sign(b));i.forEach((b,g,x)=>{if(b<0){let T=(a[g]-s[g])/b,I=s[g],S=I+T*i[g];s[g]=S,a[g]=I,x[g]=-b}});let l=r.slice(0);o.forEach((b,g)=>{l[b]=Math.ceil((a[b]-s[b])/i[b])});let c={dims:l,dataType:n[0].dataType},f=E("output",n[0].dataType,l.length),d=A("input",n[0].dataType,n[0].dims.length),p=$.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:p},{type:12,data:s},{type:6,data:u},{type:12,data:i},...k(n[0].dims,l)],y=b=>`
      ${b.registerUniforms(m).declareVariables(d,f)}
        ${U2(d,f,r)}
        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",d.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},hy=(n,e)=>{M2(n.inputs,e);let r=F2(n.inputs,e);n.compute(G2(n.inputs,r),{inputs:[0]})},by=n=>{let e=n.starts,r=n.ends,t=n.axes;return J({starts:e,ends:r,axes:t})}});var W2,H2,yy,xy,_y=v(()=>{"use strict";Z();te();Ae();Ft();ne();W2=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},H2=(n,e)=>{let r=n.inputs[0],t=r.dims,o=$.size(t),i=t.length,s=$.normalizeAxis(e.axis,i),a=s<t.length-1,u,l=[];a?(l=Array.from({length:i},(O,P)=>P),l[s]=i-1,l[i-1]=s,u=n.compute(Fe(r,l),{inputs:[r],outputs:[-1]})[0]):u=r;let c=u.dims,f=c[i-1],d=o/f,p=fe(f),m=f/p,h=64;d===1&&(h=256);let y=(O,P)=>P===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:P===2?`max(${O}.x, ${O}.y)`:P===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,b=A("x",u.dataType,u.dims,p),g=E("result",u.dataType,u.dims,p),x=b.type.value,T=_e(u.dataType)==="f32"?`var threadMax = ${x}(-3.402823e+38f);`:`var threadMax = ${x}(-65504.0h);`,I=O=>`
      var<workgroup> rowMaxShared : ${x};
      var<workgroup> rowSumShared : ${x};
      var<workgroup> threadShared : array<${x}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${x} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${x}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${O.registerUniform("packedCols","i32").declareVariables(b,g)}
      ${O.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
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
          rowMaxShared = ${x}(${y("threadShared[0]",p)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${x}(0.0);
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
          rowSumShared = ${x}(${Tt("threadShared[0]",p)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,S=n.compute({name:"Softmax",shaderCache:{hint:`${p};${h}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:d},programUniforms:[{type:6,data:m}]}),getShaderSource:I},{inputs:[u],outputs:[a?-1:0]})[0];a&&n.compute(Fe(S,l),{inputs:[S]})},yy=(n,e)=>{W2(n.inputs),H2(n,e)},xy=n=>J({axis:n.axis})});var Ty,q2,K2,j2,wy,vy=v(()=>{"use strict";Z();te();ne();Ty=n=>Array.from(n.getBigInt64Array(),Number),q2=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ty(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},K2=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},j2=(n,e)=>{let r=n[0].dims,t=e??Ty(n[1]),o=K2(r,t),i=$.size(o),s=n[0].dataType,a=A("input",s,r.length),u=E("output",s,o.length),l=c=>`
      const inputShape = ${a.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(a,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...k(n[0].dims,o)]}),getShaderSource:l}},wy=n=>{q2(n.inputs),n.compute(j2(n.inputs),{inputs:[0]})}});var X2,Z2,Iy,Sy=v(()=>{"use strict";Z();te();ne();X2=(n,e,r,t,o)=>{let i=E("output_data",o,r.length,4),s=A("a_data",e[1].dataType,e[1].dims.length,4),a=A("b_data",e[2].dataType,e[2].dims.length,4),u=A("c_data",e[0].dataType,e[0].dims.length,4),l,c=(f,d,p)=>`select(${d}, ${f}, ${p})`;if(!t)l=i.setByOffset("global_idx",c(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(d,p,m="")=>{let h=`a_data[index_a${p}][component_a${p}]`,y=`b_data[index_b${p}][component_b${p}]`,b=`bool(c_data[index_c${p}] & (0xffu << (component_c${p} * 8)))`;return`
            let output_indices${p} = ${i.offsetToIndices(`global_idx * 4u + ${p}u`)};
            let offset_a${p} = ${s.broadcastedIndicesToOffset(`output_indices${p}`,i)};
            let offset_b${p} = ${a.broadcastedIndicesToOffset(`output_indices${p}`,i)};
            let offset_c${p} = ${u.broadcastedIndicesToOffset(`output_indices${p}`,i)};
            let index_a${p} = offset_a${p} / 4u;
            let index_b${p} = offset_b${p} / 4u;
            let index_c${p} = offset_c${p} / 4u;
            let component_a${p} = offset_a${p} % 4u;
            let component_b${p} = offset_b${p} % 4u;
            let component_c${p} = offset_c${p} % 4u;
            ${d}[${p}] = ${m}(${c(h,y,b)});
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
        ${n.registerUniform("vec_size","u32").declareVariables(u,s,a,i)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},Z2=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!($.areEqual(e,r)&&$.areEqual(r,t)),s=e,a=$.size(e);if(i){let l=kt.calcShape(kt.calcShape(e,r,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,a=$.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>X2(l,n,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...k(t,e,r,s)]})}},Iy=n=>{n.compute(Z2(n.inputs))}});var $y,Ay=v(()=>{"use strict";sh();xi();lh();fh();Zh();ab();cb();$b();kb();Lb();Vb();Wb();Kb();Xb();Qb();tg();og();ag();cg();pg();Tg();Ig();$g();Og();Cg();lu();kg();Zg();Yg();ty();oy();gi();ly();fy();py();gy();_y();fu();vy();Ft();Ti();Sy();$y=new Map([["Abs",[dh]],["Acos",[ph]],["Acosh",[mh]],["Add",[Jh]],["ArgMax",[ih,Za]],["ArgMin",[oh,Za]],["Asin",[hh]],["Asinh",[bh]],["Atan",[gh]],["Atanh",[yh]],["Attention",[ah]],["AveragePool",[Fg,Mg]],["BatchNormalization",[uh]],["BiasAdd",[ch]],["BiasSplitGelu",[Xh]],["Cast",[_h,xh]],["Ceil",[wh]],["Clip",[Th]],["Concat",[ub,lb]],["Conv",[iu,ou]],["ConvTranspose",[Db,Eb]],["Cos",[vh]],["Cosh",[Ih]],["CumSum",[Bb,zb]],["DepthToSpace",[Rb,Nb]],["DequantizeLinear",[Jg,Qg]],["Div",[Qh]],["Einsum",[Ub,Gb]],["Elu",[Sh,Wn]],["Equal",[Yh]],["Erf",[$h]],["Exp",[Ah]],["Expand",[qb]],["FastGelu",[jb]],["Floor",[Oh]],["FusedConv",[iu,ou]],["Gather",[Jb,Zb]],["GatherElements",[sg,ig]],["GatherBlockQuantized",[rg,ng]],["GatherND",[Yb,eg]],["Gelu",[Ph]],["Gemm",[lg,ug]],["GlobalAveragePool",[Wg,Gg]],["GlobalMaxPool",[Xg,jg]],["Greater",[nb]],["GreaterOrEqual",[ib]],["GridSample",[fg,dg]],["GroupQueryAttention",[_g]],["HardSigmoid",[Rh,Lh]],["InstanceNormalization",[vg]],["LayerNormalization",[Sg]],["LeakyRelu",[Eh,Wn]],["Less",[ob]],["LessOrEqual",[sb]],["Log",[qh]],["MatMul",[Ag]],["MatMulNBits",[Pg,Eg]],["MaxPool",[qg,Kg]],["Mul",[eb]],["MultiHeadAttention",[bg,hg]],["Neg",[Dh]],["Not",[Ch]],["Pad",[Dg]],["Pow",[tb]],["QuickGelu",[Kh,Wn]],["Range",[ey]],["Reciprocal",[kh]],["ReduceMin",[Qm]],["ReduceMean",[Km]],["ReduceMax",[Jm]],["ReduceSum",[eh]],["ReduceProd",[Ym]],["ReduceL1",[jm]],["ReduceL2",[Xm]],["ReduceLogSum",[rh]],["ReduceLogSumExp",[Zm]],["ReduceSumSquare",[th]],["Relu",[Bh]],["Resize",[ay,uy]],["RotaryEmbedding",[cy]],["ScatterND",[ny,ry]],["Sigmoid",[zh]],["Sin",[Nh]],["Sinh",[Vh]],["Slice",[hy,by]],["SkipLayerNormalization",[dy]],["Split",[gg,yg]],["Sqrt",[Mh]],["Softmax",[yy,xy]],["Sub",[rb]],["Tan",[Fh]],["Tanh",[Gh]],["ThresholdedRelu",[Hh,Wn]],["Tile",[wy]],["Transpose",[Bm,zm]],["Where",[Iy]]])});var Ci,Oy=v(()=>{"use strict";qe();Dt();ne();Ci=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){ot(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of r)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});i&&u.push({binding:u.length,resource:i});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Je(e.programInfo.name)}dispose(){}build(e,r){ot(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(f=>{t.features.has(f.feature)&&o.push(`enable ${f.extension};`)});let s=Dm(r,this.backend.device.limits),a=e.getShaderSource(s),u=`${o.join(`
`)}
${s.additionalImplementations}
${a}`,l=t.createShaderModule({code:u,label:e.name});ie("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let c=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return Je(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let s=r*t*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var J2,Q2,du,pu,Di,Py=v(()=>{"use strict";qe();Z();Dt();Va();Om();Ay();Oy();J2=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},Q2=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${J2(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},du=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},pu=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let r=e.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},Di=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=s=>r.features.has(s)&&t.push(s)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new pu(this.device),this.adapterInfo=new du(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Am(this),this.programManager=new Ci(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,fi(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ot(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,l=a.kernelName,c=i.programName,f=i.inputTensorViews,d=i.outputTensorViews,p=r[o*2],m=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=p);let h=Number(p-this.queryTimeBase),y=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(y))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(b=>({dims:b.dims,dataType:er(b.dataType)})),outputsMetadata:d.map(b=>({dims:b.dims,dataType:er(b.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:c,startTime:h,endTime:y});else{let b="";f.forEach((x,T)=>{b+=`input[${T}]: [${x.dims}] | ${er(x.dataType)}, `});let g="";d.forEach((x,T)=>{g+=`output[${T}]: [${x.dims}] | ${er(x.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${c}" ${b}${g}execution time: ${y-h} ns`)}eo("GPU",`${c}::${p}::${m}`)}e.unmap(),this.pendingQueries.delete(e)}),Je()}run(e,r,t,o,i,s){ot(e.name);let a=[];for(let x=0;x<r.length;++x){let T=r[x].data;if(T===0)continue;let I=this.gpuDataManager.get(T);if(!I)throw new Error(`no GPU data for input: ${T}`);a.push(I)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(r),f=t.length===0?u.map((x,T)=>T):t;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let d=[],p=[];for(let x=0;x<u.length;++x){if(!Number.isInteger(f[x])||f[x]<-3||f[x]>=s)throw new Error(`Invalid output index: ${f[x]}`);if(f[x]===-3)continue;let T=f[x]===-1,I=f[x]===-2,S=T||I?i(u[x].dataType,u[x].dims):o(f[x],u[x].dataType,u[x].dims);if(d.push(S),S.data===0)continue;let O=this.gpuDataManager.get(S.data);if(!O)throw new Error(`no GPU data for output: ${S.data}`);if(T&&this.temporaryData.push(O),I){let P=this.kernelPersistentData.get(this.currentKernelId);P||(P=[],this.kernelPersistentData.set(this.currentKernelId,P)),P.push(O)}p.push(O)}if(a.length!==r.length||p.length!==d.length){if(p.length===0)return Je(e.name),d;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(c){let x=0,T=[];c.forEach(P=>{let C=typeof P.data=="number"?[P.data]:P.data;if(C.length===0)return;let N=P.type===10?2:4,F,H;P.type===10?(H=C.length>4?16:C.length>2?8:C.length*N,F=C.length>4?16:N*C.length):(H=C.length<=2?C.length*N:16,F=16),x=Math.ceil(x/H)*H,T.push(x);let L=P.type===10?8:4;x+=C.length>4?Math.ceil(C.length/L)*F:C.length*N});let I=16;x=Math.ceil(x/I)*I;let S=new ArrayBuffer(x);c.forEach((P,C)=>{let N=T[C],F=typeof P.data=="number"?[P.data]:P.data;if(P.type===6)new Int32Array(S,N,F.length).set(F);else if(P.type===12)new Uint32Array(S,N,F.length).set(F);else if(P.type===10)new Uint16Array(S,N,F.length).set(F);else if(P.type===1)new Float32Array(S,N,F.length).set(F);else throw new Error(`Unsupported uniform type: ${er(P.type)}`)});let O=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,S,0,x),this.gpuDataManager.release(O.id),m={offset:0,size:x,buffer:O.buffer}}let h=this.programManager.normalizeDispatchGroupSize(l),y=h[1]===1&&h[2]===1,b=Q2(e,r,y),g=this.programManager.getArtifact(b);if(g||(g=this.programManager.build(e,h),this.programManager.setArtifact(b,g),ie("info",()=>`[artifact] key: ${b}, programName: ${e.name}`)),c&&g.uniformVariablesInfo){if(c.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${c.length} in program "${g.programInfo.name}".`);for(let x=0;x<c.length;x++){let T=c[x],I=T.type,S=typeof T.data=="number"?1:T.data.length,[O,P]=g.uniformVariablesInfo[x];if(I!==O||S!==P)throw new Error(`Uniform variable ${x} mismatch: expect type ${O} with size ${P}, got type ${I} with size ${S} in program "${g.programInfo.name}".`)}}if(ie("info",()=>`[ProgramManager] run "${e.name}" (key=${b}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:r,outputTensorViews:d};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(g,a,p,h,m),Je(e.name),d}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=$y.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,s)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ie("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(r,u[1]),0}catch(c){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${c}`)),1}finally{l&&t.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${s}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(r),a=this.gpuDataManager.registerExternalBuffer(t,o,s);return i.set(r,[a,t]),a}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await Ga(this,e,r);return di(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ie("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ie("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ie("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),s=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});function hu(n,e=!0){if(n.byteLength%8!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 8 (BigInt).");let r=n.byteLength/8,t=new BigInt64Array(n.buffer,n.byteOffset,r),o=new Int32Array(r);for(let i=0;i<r;i++){let s=t[i];if(s>2147483647n||s<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${i}: ${s}`);o[i]=Number(s)}return e?new Uint8Array(o.buffer):o}function ky(n,e=!0){if(n.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (Int32).");let r=n.byteLength/4,t=new Int32Array(n.buffer,n.byteOffset,r),o=BigInt64Array.from(t,BigInt);return e?new Uint8Array(o.buffer):o}var Y2,Ey,eI,Cy,ki,Bi,mu,Dy,By=v(()=>{"use strict";Dt();Y2=1,Ey=()=>Y2++,eI=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Cy=(n,e)=>{let r=eI.get(n);if(!r)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},ki=class{constructor(e){this.shouldConvertInt64toInt32=!1;this.isInt64ToInt32Converted=!1;let{sessionId:r,context:t,tensor:o,dataType:i,shape:s,shouldConvertInt64toInt32:a=!1}=e;this.sessionId=r,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=s,this.shouldConvertInt64toInt32=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Cy(this.dataType,this.tensorShape)}destroy(){ie("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e,r){if(e){let t=await this.mlContext.readTensor(this.mlTensor),o=ky(new Uint8Array(t));if(r){(r instanceof ArrayBuffer?new Uint8Array(r):new Uint8Array(r.buffer,r.byteOffset,r.byteLength)).set(o);return}else return o.buffer}else return r?await this.mlContext.readTensor(this.mlTensor,r):await this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsInt64ToInt32Converted(e){this.isInt64ToInt32Converted=e}},Bi=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){let i=this.tensorManager.getMLContext(e),s=r==="int64"&&!i.opSupportLimits().input.dataTypes.includes("int64");if(s&&(r="int32",ie("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(i,r,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==Cy(r,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let a=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,t,a,!0,!0,s),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(this.wrapper.shouldConvertInt64toInt32&&(e=hu(e,!0),this.wrapper.setIsInt64ToInt32Converted(!0)),e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else ie("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload){let r=this.wrapper?.isInt64ToInt32Converted?ky(this.activeUpload):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,e):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},mu=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let e=Ey();return this.tensorTrackersById.set(e,new Bi(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o,i){ie("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let s=this.tensorTrackersById.get(r);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,t,o,i)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){ie("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=this.getMLContext(e),s=Ey(),a=new ki({sessionId:e,context:i,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(s,new Bi(this,a)),this.externalTensors.add(a),s}async getCachedTensor(e,r,t,o,i,s,a=!1){let u=this.getMLContext(e);for(let[c,f]of this.freeTensors.entries())if(f.canReuseTensor(u,r,t)){ie("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${t}}`);let d=this.freeTensors.splice(c,1)[0];return d.sessionId=e,d}ie("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${t}}`);let l=await u.createTensor({dataType:r,shape:t,dimensions:t,usage:o,writable:i,readable:s});return new ki({sessionId:e,context:u,tensor:l,dataType:r,shape:t,shouldConvertInt64toInt32:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Dy=(...n)=>new mu(...n)});var bu,tI,zi,zy=v(()=>{"use strict";Z();Yt();Va();By();Dt();bu=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),tI=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},zi=class{constructor(e){this.tensorManager=Dy(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;fi(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ie("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ie("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let t of r)ie("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>tI(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ie("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o,i){let s=bu.get(t);if(!s)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,s,o,i)}async createTemporaryTensor(e,r,t){ie("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${t}}`);let o=bu.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!Ee().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ie("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return di(t,r)}}registerMLTensor(e,r,t,o){let i=bu.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let s=this.tensorManager.registerTensor(e,r,i,o);return ie("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${s}}`),s}registerMLConstant(e,r,t,o,i,s,a=!1){if(!s)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=s.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(r+t>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=l.slice(r,r+t).buffer,f;switch(i.dataType){case"float32":f=new Float32Array(c);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(c):new Uint16Array(c);break;case"int32":f=new Int32Array(c);break;case"uint32":f=new Uint32Array(c);break;case"int64":a?(f=hu(new Uint8Array(c),!1),i.dataType="int32"):f=new BigInt64Array(c);break;case"uint64":f=new BigUint64Array(c);break;case"int8":f=new Int8Array(c);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ie("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${a?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,f)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,r){let t=this.sessionGraphInputs.get(e);return t?t.includes(r):!1}isInt64Supported(e){return!!this.mlContextBySessionId.get(e)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}});var Ly={};Yr(Ly,{init:()=>rI});var jn,gu,rI,Ry=v(()=>{"use strict";Z();Py();Dt();te();zy();jn=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if($.size(e)!==$.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},gu=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,s));let a=Number(e.getValue(o*i++,s));this.outputCount=Number(e.getValue(o*i++,s)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,s));let u=[];for(let l=0;l<a;l++){let c=Number(e.getValue(o*i++,s)),f=Number(e.getValue(o*i++,"*")),d=Number(e.getValue(o*i++,s)),p=[];for(let m=0;m<d;m++)p.push(Number(e.getValue(o*i++,s)));u.push(new jn(e,c,f,p))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=r?.outputs??[],i=(a,u,l)=>new jn(this.module,u,this.output(a,l),l),s=(a,u)=>{let l=tr(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new jn(this.module,a,c,u)};return this.backend.run(e,t,o,i,s,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",s=this.module.stackAlloc((1+r.length)*o);this.module.setValue(s,r.length,i);for(let a=0;a<r.length;a++)this.module.setValue(s+o*(a+1),r[a],i);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},rI=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=new Di;await i.initialize(r,t),o("webgpu",[i,s=>i.alloc(Number(s)),s=>i.free(s),(s,a,u,l=!1)=>{if(l)ie("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(a)}, size=${Number(u)}`),i.memcpy(Number(s),Number(a));else{ie("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(a)}, size=${Number(u)}`);let c=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));i.upload(Number(a),c)}},async(s,a,u)=>{ie("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(Number(s),()=>e.HEAPU8.subarray(Number(a)>>>0,Number(a+u)>>>0))},(s,a,u)=>i.createKernel(s,Number(a),u,e.UTF8ToString(e._JsepGetNodeName(Number(a)))),s=>i.releaseKernel(s),(s,a,u,l)=>{ie("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let c=new gu(e,i,Number(a));return i.computeKernel(Number(s),c,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new zi(r);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,a,u,l,c)=>i.ensureTensor(s,a,u,l,c),(s,a)=>{i.uploadTensor(s,a)},async(s,a)=>i.downloadTensor(s,a)])}}});var nI,Qo,Yo,Ar,oI,Mn,ei,ti,Ny,ri,ni,oi,ka=v(()=>{"use strict";xm();Tm();Z();Yt();ai();Na();nI=(n,e)=>{Ee()._OrtInit(n,e)!==0&&ce("Can't initialize onnxruntime.")},Qo=async n=>{nI(n.wasm.numThreads,Un(n.logLevel))},Yo=async(n,e)=>{{let r=(Ry(),Jn(Ly)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=n.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=n.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=n.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ee(),n,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ee(),n)}}},Ar=new Map,oI=n=>{let e=Ee(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&ce("Can't get session input/output count.");let s=t===4?"i32":"i64";return[Number(e.getValue(o,s)),Number(e.getValue(o+t,s))]}finally{e.stackRestore(r)}},Mn=n=>{let e=Ee(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},ei=async(n,e)=>{let r,t,o=Ee();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=Mn(n);let i=0,s=0,a=0,u=[],l=[],c=[];try{if([s,u]=_m(e),e?.externalData&&o.mountExternalData){let g=[];for(let x of e.externalData){let T=typeof x=="string"?x:x.path;g.push(Gn(typeof x=="string"?x:x.data).then(I=>{o.mountExternalData(T,I)}))}await Promise.all(g)}for(let g of e?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof g!="string"){let T=g,I=T?.context,S=T?.gpuDevice,O=T?.deviceType,P=T?.powerPreference;I?o.currentContext=I:S?o.currentContext=await o.jsepCreateMLContext(S):o.currentContext=await o.jsepCreateMLContext({deviceType:O,powerPreference:P})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,t,s),i===0&&ce("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[f,d]=oI(i),p=!!e?.enableGraphCapture,m=[],h=[],y=[];for(let g=0;g<f;g++){let x=o._OrtGetInputName(i,g);x===0&&ce("Can't get an input name."),l.push(x),m.push(o.UTF8ToString(x))}for(let g=0;g<d;g++){let x=o._OrtGetOutputName(i,g);x===0&&ce("Can't get an output name."),c.push(x);let T=o.UTF8ToString(x);h.push(T);{if(p&&e?.preferredOutputLocation===void 0){y.push("gpu-buffer");continue}let I=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[T]??"cpu";if(I!=="cpu"&&I!=="cpu-pinned"&&I!=="gpu-buffer"&&I!=="ml-tensor")throw new Error(`Not supported preferred output location: ${I}.`);if(p&&I!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${I}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);y.push(I)}}let b=null;return y.some(g=>g==="gpu-buffer"||g==="ml-tensor")&&(a=o._OrtCreateBinding(i),a===0&&ce("Can't create IO binding."),b={handle:a,outputPreferredLocations:y,outputPreferredLocationsEncoded:y.map(g=>Ra(g))}),Ar.set(i,[i,l,c,b,p,!1]),[i,m,h]}catch(f){throw l.forEach(d=>o._OrtFree(d)),c.forEach(d=>o._OrtFree(d)),a!==0&&o._OrtReleaseBinding(a)!==0&&ce("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&ce("Can't release session."),f}finally{o._free(r),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&ce("Can't release session options."),u.forEach(f=>o._free(f)),o.unmountExternalData?.()}},ti=n=>{let e=Ee(),r=Ar.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,s,a]=r;s&&(a&&e._OrtClearBoundOutputs(s.handle)!==0&&ce("Can't clear bound outputs."),e._OrtReleaseBinding(s.handle)!==0&&ce("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&ce("Can't release session."),Ar.delete(n)},Ny=async(n,e,r,t,o,i=!1)=>{if(!n){e.push(0);return}let s=Ee(),a=s.PTR_SIZE,u=n[0],l=n[1],c=n[3],f=c,d,p;if(u==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let y=n[2].gpuBuffer;p=tr(Kr(u),l);let b=s.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');d=b(t,o,y,p)}else if(c==="ml-tensor"){let y=n[2].mlTensor;p=tr(Kr(u),l);let b=s.jsepRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');d=b(t,y,Kr(u),l)}else{let y=n[2];if(Array.isArray(y)){p=a*y.length,d=s._malloc(p),r.push(d);for(let b=0;b<y.length;b++){if(typeof y[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);s.setValue(d+b*a,Ve(y[b],r),"*")}}else{let b=s.jsepIsGraphInput;if(u!=="string"&&b){let g=s._OrtGetInputName(t,o),x=s.UTF8ToString(g);if(b(t,x)){let T=Kr(u);p=tr(T,l),f="ml-tensor";let I=s.jsepCreateTemporaryTensor,S=s.jsepUploadTensor;if(!I||!S)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let O=await I(t,T,l);S(O,new Uint8Array(y.buffer,y.byteOffset,y.byteLength)),d=O}else p=y.byteLength,d=s._malloc(p),r.push(d),s.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,p),d)}else p=y.byteLength,d=s._malloc(p),r.push(d),s.HEAPU8.set(new Uint8Array(y.buffer,y.byteOffset,p),d)}}let m=s.stackSave(),h=s.stackAlloc(4*l.length);try{l.forEach((b,g)=>s.setValue(h+g*a,b,a===4?"i32":"i64"));let y=s._OrtCreateTensor(Kr(u),d,p,h,l.length,Ra(f));y===0&&ce(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(y)}finally{s.stackRestore(m)}},ri=async(n,e,r,t,o,i)=>{let s=Ee(),a=s.PTR_SIZE,u=Ar.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let l=u[0],c=u[1],f=u[2],d=u[3],p=u[4],m=u[5],h=e.length,y=t.length,b=0,g=[],x=[],T=[],I=[],S=s.stackSave(),O=s.stackAlloc(h*a),P=s.stackAlloc(h*a),C=s.stackAlloc(y*a),N=s.stackAlloc(y*a);try{[b,g]=ym(i);for(let L=0;L<h;L++)await Ny(r[L],x,I,n,e[L],p);for(let L=0;L<y;L++)await Ny(o[L],T,I,n,h+t[L],p);for(let L=0;L<h;L++)s.setValue(O+L*a,x[L],"*"),s.setValue(P+L*a,c[e[L]],"*");for(let L=0;L<y;L++)s.setValue(C+L*a,T[L],"*"),s.setValue(N+L*a,f[t[L]],"*");if(d&&!m){let{handle:L,outputPreferredLocations:Q,outputPreferredLocationsEncoded:Se}=d;if(c.length!==h)throw new Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${c.length}).`);for(let M=0;M<h;M++){let G=e[M];await s._OrtBindInput(L,c[G],x[M])!==0&&ce(`Can't bind input[${M}] for session=${n}.`)}for(let M=0;M<y;M++){let G=t[M];o[M]?.[3]?s._OrtBindOutput(L,f[G],T[M],0)!==0&&ce(`Can't bind pre-allocated output[${M}] for session=${n}.`):s._OrtBindOutput(L,f[G],0,Se[G])!==0&&ce(`Can't bind output[${M}] to ${Q[M]} for session=${n}.`)}Ar.set(n,[l,c,f,d,p,!0])}s.jsepOnRunStart?.(l);let F;d?F=await s._OrtRunWithBinding(l,d.handle,y,C,b):F=await s._OrtRun(l,P,O,h,N,y,C,b),F!==0&&ce("failed to call OrtRun().");let H=[];for(let L=0;L<y;L++){let Q=Number(s.getValue(C+L*a,"*"));if(Q===T[L]){H.push(o[L]);continue}let Se=s.stackSave(),M=s.stackAlloc(4*a),G=!1,oe,X=0;try{s._OrtGetTensorData(Q,M,M+a,M+2*a,M+3*a)!==0&&ce(`Can't access output tensor data on index ${L}.`);let je=a===4?"i32":"i64",Pe=Number(s.getValue(M,je));X=s.getValue(M+a,"*");let Y=s.getValue(M+a*2,"*"),D=Number(s.getValue(M+a*3,je)),W=[];for(let Ce=0;Ce<D;Ce++)W.push(Number(s.getValue(Y+Ce*a,je)));s._OrtFree(Y)!==0&&ce("Can't free memory for tensor dims.");let Te=W.reduce((Ce,De)=>Ce*De,1);oe=er(Pe);let Gt=d?.outputPreferredLocations[t[L]];if(oe==="string"){if(Gt==="gpu-buffer"||Gt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ce=[];for(let De=0;De<Te;De++){let Pr=s.getValue(X+De*a,"*"),Fi=s.getValue(X+(De+1)*a,"*"),Jy=De===Te-1?void 0:Fi-Pr;Ce.push(s.UTF8ToString(Pr,Jy))}H.push([oe,W,Ce,"cpu"])}else if(Gt==="gpu-buffer"&&Te>0){let Ce=s.jsepGetBuffer;if(!Ce)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let De=Ce(X),Pr=tr(Pe,Te);if(Pr===void 0||!li(oe))throw new Error(`Unsupported data type: ${oe}`);G=!0,H.push([oe,W,{gpuBuffer:De,download:s.jsepCreateDownloader(De,Pr,oe),dispose:()=>{s._OrtReleaseTensor(Q)!==0&&ce("Can't release tensor.")}},"gpu-buffer"])}else if(Gt==="ml-tensor"&&Te>0){let Ce=s.jsepEnsureTensor,De=s.jsepIsInt64Supported;if(!Ce||!De)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(tr(Pe,Te)===void 0||!ci(oe))throw new Error(`Unsupported data type: ${oe}`);if(oe==="int64"&&!De(n))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let Fi=await Ce(n,X,Pe,W,!1);G=!0,H.push([oe,W,{mlTensor:Fi,download:s.jsepCreateMLTensorDownloader(X,oe),dispose:()=>{s.jsepReleaseTensorId(X),s._OrtReleaseTensor(Q)}},"ml-tensor"])}else{let Ce=ui(oe),De=new Ce(Te);new Uint8Array(De.buffer,De.byteOffset,De.byteLength).set(s.HEAPU8.subarray(X,X+De.byteLength)),H.push([oe,W,De,"cpu"])}}finally{s.stackRestore(Se),oe==="string"&&X&&s._free(X),G||s._OrtReleaseTensor(Q),s.jsepOnRunEnd?.(l)}}return d&&!p&&(s._OrtClearBoundOutputs(d.handle)!==0&&ce("Can't clear bound outputs."),Ar.set(n,[l,c,f,d,p,!1])),H}finally{s.stackRestore(S),x.forEach(F=>s._OrtReleaseTensor(F)),T.forEach(F=>s._OrtReleaseTensor(F)),I.forEach(F=>s._free(F)),b!==0&&s._OrtReleaseRunOptions(b),g.forEach(F=>s._free(F))}},ni=n=>{let e=Ee(),r=Ar.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&ce("Can't get an profile file name."),e._OrtFree(o)},oi=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var Or,pt,Xn,Ri,Ni,Li,yu,xu,Jr,Qr,sI,Vy,My,Fy,Uy,Gy,Wy,Hy,_u=v(()=>{"use strict";qe();ka();Yt();Zo();Or=()=>!!ee.wasm.proxy&&typeof document<"u",Xn=!1,Ri=!1,Ni=!1,xu=new Map,Jr=(n,e)=>{let r=xu.get(n);r?r.push(e):xu.set(n,[e])},Qr=()=>{if(Xn||!Ri||Ni||!pt)throw new Error("worker not ready")},sI=n=>{switch(n.data.type){case"init-wasm":Xn=!1,n.data.err?(Ni=!0,yu[1](n.data.err)):(Ri=!0,yu[0]()),Li&&(URL.revokeObjectURL(Li),Li=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=xu.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},Vy=async()=>{if(!Ri){if(Xn)throw new Error("multiple calls to 'initWasm()' detected.");if(Ni)throw new Error("previous call to 'initWasm()' failed.");if(Xn=!0,Or())return new Promise((n,e)=>{pt?.terminate(),hm().then(([r,t])=>{try{pt=t,pt.onerror=i=>e(i),pt.onmessage=sI,yu=[n,e];let o={type:"init-wasm",in:ee};if(!o.in.wasm.wasmPaths&&r){let i=ii();i&&(o.in.wasm.wasmPaths=i)}pt.postMessage(o),Li=r}catch(o){e(o)}},e)});try{await Jo(ee.wasm),await Qo(ee),Ri=!0}catch(n){throw Ni=!0,n}finally{Xn=!1}}},My=async n=>{if(Or())return Qr(),new Promise((e,r)=>{Jr("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:ee}};pt.postMessage(t)});await Yo(ee,n)},Fy=async n=>Or()?(Qr(),new Promise((e,r)=>{Jr("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};pt.postMessage(t,[n.buffer])})):Mn(n),Uy=async(n,e)=>{if(Or()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Qr(),new Promise((r,t)=>{Jr("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),pt.postMessage(o,i)})}else return ei(n,e)},Gy=async n=>{if(Or())return Qr(),new Promise((e,r)=>{Jr("release",[e,r]);let t={type:"release",in:n};pt.postMessage(t)});ti(n)},Wy=async(n,e,r,t,o,i)=>{if(Or()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Qr(),new Promise((s,a)=>{Jr("run",[s,a]);let u=r,l={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};pt.postMessage(l,oi(u))})}else return ri(n,e,r,t,o,i)},Hy=async n=>{if(Or())return Qr(),new Promise((e,r)=>{Jr("end-profiling",[e,r]);let t={type:"end-profiling",in:n};pt.postMessage(t)});ni(n)}});var qy,aI,Vi,Ky=v(()=>{"use strict";qe();_u();Z();Xo();Na();qy=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},aI=n=>{switch(n[3]){case"cpu":return new nt(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!li(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return nt.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!ci(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return nt.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},Vi=class{async fetchModelAndCopyToWasmMemory(e){return Fy(await Gn(e))}async loadModel(e,r){ot();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await Uy(t,r),Je()}async dispose(){return Gy(this.sessionId)}async run(e,r,t){ot();let o=[],i=[];Object.entries(e).forEach(d=>{let p=d[0],m=d[1],h=this.inputNames.indexOf(p);if(h===-1)throw new Error(`invalid input '${p}'`);o.push(m),i.push(h)});let s=[],a=[];Object.entries(r).forEach(d=>{let p=d[0],m=d[1],h=this.outputNames.indexOf(p);if(h===-1)throw new Error(`invalid output '${p}'`);s.push(m),a.push(h)});let u=o.map((d,p)=>qy(d,()=>`input "${this.inputNames[i[p]]}"`)),l=s.map((d,p)=>d?qy(d,()=>`output "${this.outputNames[a[p]]}"`):null),c=await Wy(this.sessionId,i,u,a,l,t),f={};for(let d=0;d<c.length;d++)f[this.outputNames[a[d]]]=s[d]??aI(c[d]);return Je(),f}startProfiling(){}endProfiling(){Hy(this.sessionId)}}});var Xy={};Yr(Xy,{OnnxruntimeWebAssemblyBackend:()=>Mi,initializeFlags:()=>jy,wasmBackend:()=>uI});var jy,Mi,uI,Zy=v(()=>{"use strict";qe();_u();Ky();jy=()=>{if((typeof ee.wasm.initTimeout!="number"||ee.wasm.initTimeout<0)&&(ee.wasm.initTimeout=0),ee.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ee.wasm.proxy!="boolean"&&(ee.wasm.proxy=!1),typeof ee.wasm.trace!="boolean"&&(ee.wasm.trace=!1),typeof ee.wasm.numThreads!="number"||!Number.isInteger(ee.wasm.numThreads)||ee.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ee.wasm.numThreads=1;else{let n=typeof navigator>"u"?Ui("node:os").cpus().length:navigator.hardwareConcurrency;ee.wasm.numThreads=Math.min(4,Math.ceil((n||1)/2))}},Mi=class{async init(e){jy(),await Vy(),await My(e)}async createInferenceSessionHandler(e,r){let t=new Vi;return await t.loadModel(e,r),Promise.resolve(t)}},uI=new Mi});qe();qe();qe();var Zu="1.22.0";var hU=ji;{let n=(sm(),Jn(im)).onnxjsBackend;Wt("webgl",n,-10)}{let n=(Zy(),Jn(Xy)).wasmBackend;Wt("webgpu",n,5),Wt("webnn",n,5),Wt("cpu",n,10),Wt("wasm",n,10)}Object.defineProperty(ee.versions,"web",{value:Zu,enumerable:!0});export{ox as InferenceSession,eo as TRACE,ot as TRACE_FUNC_BEGIN,Je as TRACE_FUNC_END,nt as Tensor,hU as default,ee as env,Wt as registerBackend};
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
//# sourceMappingURL=ort.all.min.mjs.map
