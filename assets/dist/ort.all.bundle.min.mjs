/*!
 * ONNX Runtime Web v1.22.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Xv=Object.create;var ei=Object.defineProperty;var Zv=Object.getOwnPropertyDescriptor;var Jv=Object.getOwnPropertyNames;var Yv=Object.getPrototypeOf,Qv=Object.prototype.hasOwnProperty;var fs=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var E=(n,e)=>()=>(n&&(e=n(n=0)),e);var nt=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),gn=(n,e)=>{for(var r in e)ei(n,r,{get:e[r],enumerable:!0})},Yf=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Jv(e))!Qv.call(n,o)&&o!==r&&ei(n,o,{get:()=>e[o],enumerable:!(t=Zv(e,o))||t.enumerable});return n};var yn=(n,e,r)=>(r=n!=null?Xv(Yv(n)):{},Yf(e||!n||!n.__esModule?ei(r,"default",{value:n,enumerable:!0}):r,n)),qn=n=>Yf(ei({},"__esModule",{value:!0}),n);var ti,Ur,Sr,e2,Qf,ds=E(()=>{"use strict";ti=new Map,Ur=[],Sr=(n,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=ti.get(n);if(t===void 0)ti.set(n,{backend:e,priority:r});else{if(t.priority>r)return;if(t.priority===r&&t.backend!==e)throw new Error(`cannot register backend "${n}" using priority ${r}`)}if(r>=0){let o=Ur.indexOf(n);o!==-1&&Ur.splice(o,1);for(let i=0;i<Ur.length;i++)if(ti.get(Ur[i]).priority<=r){Ur.splice(i,0,n);return}Ur.push(n)}return}throw new TypeError("not a valid backend")},e2=async n=>{let e=ti.get(n);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(n)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return r||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Qf=async n=>{let e=n.executionProviders||[],r=e.map(u=>typeof u=="string"?u:u.name),t=r.length===0?Ur:r,o,i=[],a=new Set;for(let u of t){let c=await e2(u);typeof c=="string"?i.push({name:u,err:c}):(o||(o=c),o===c&&a.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:c}of i)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${c}`);let s=e.filter(u=>a.has(typeof u=="string"?u:u.name));return[o,new Proxy(n,{get:(u,c)=>c==="executionProviders"?s:Reflect.get(u,c)})]}});var ed=E(()=>{"use strict";ds()});var td,rd=E(()=>{"use strict";td="1.22.0"});var nd,vt,ps=E(()=>{"use strict";rd();nd="warning",vt={wasm:{},webgl:{},webgpu:{},versions:{common:td},set logLevel(n){if(n!==void 0){if(typeof n!="string"||["verbose","info","warning","error","fatal"].indexOf(n)===-1)throw new Error(`Unsupported logging level: ${n}`);nd=n}},get logLevel(){return nd}};Object.defineProperty(vt,"logLevel",{enumerable:!0})});var he,od=E(()=>{"use strict";ps();he=vt});var id,ad,sd=E(()=>{"use strict";id=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=n.dims[3],r.height=n.dims[2];let t=r.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[3]):(o=n.dims[3],i=n.dims[2]);let a=e?.format!==void 0?e.format:"RGB",s=e?.norm,u,c;s===void 0||s.mean===void 0?u=[255,255,255,255]:typeof s.mean=="number"?u=[s.mean,s.mean,s.mean,s.mean]:(u=[s.mean[0],s.mean[1],s.mean[2],0],s.mean[3]!==void 0&&(u[3]=s.mean[3])),s===void 0||s.bias===void 0?c=[0,0,0,0]:typeof s.bias=="number"?c=[s.bias,s.bias,s.bias,s.bias]:(c=[s.bias[0],s.bias[1],s.bias[2],0],s.bias[3]!==void 0&&(c[3]=s.bias[3]));let f=i*o,p=0,m=f,g=f*2,y=-1;a==="RGBA"?(p=0,m=f,g=f*2,y=f*3):a==="RGB"?(p=0,m=f,g=f*2):a==="RBG"&&(p=0,g=f,m=f*2);for(let x=0;x<i;x++)for(let v=0;v<o;v++){let T=(n.data[p++]-c[0])*u[0],w=(n.data[m++]-c[1])*u[1],I=(n.data[g++]-c[2])*u[2],A=y===-1?255:(n.data[y++]-c[3])*u[3];t.fillStyle="rgba("+T+","+w+","+I+","+A+")",t.fillRect(v,x,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ad=(n,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(r!=null){let o,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=n.dims[2],i=n.dims[1],a=n.dims[3]):(o=n.dims[3],i=n.dims[2],a=n.dims[1]);let s=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,c,f;u===void 0||u.mean===void 0?c=[255,255,255,255]:typeof u.mean=="number"?c=[u.mean,u.mean,u.mean,u.mean]:(c=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(c[3]=u.mean[3])),u===void 0||u.bias===void 0?f=[0,0,0,0]:typeof u.bias=="number"?f=[u.bias,u.bias,u.bias,u.bias]:(f=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(f[3]=u.bias[3]));let p=i*o;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,g=0,y=1,x=2,v=3,T=0,w=p,I=p*2,A=-1;s==="RGBA"?(T=0,w=p,I=p*2,A=p*3):s==="RGB"?(T=0,w=p,I=p*2):s==="RBG"&&(T=0,I=p,w=p*2),t=r.createImageData(o,i);for(let P=0;P<i*o;g+=m,y+=m,x+=m,v+=m,P++)t.data[g]=(n.data[T++]-f[0])*c[0],t.data[y]=(n.data[w++]-f[1])*c[1],t.data[x]=(n.data[I++]-f[2])*c[2],t.data[v]=A===-1?255:(n.data[A++]-f[3])*c[3]}else throw new Error("Can not access image data");return t}});var ms,ud,ld,cd,fd,dd,pd=E(()=>{"use strict";ri();ms=(n,e)=>{if(n===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:t}=e,o=e.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let s=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",c=r*t,f=u==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),p=4,m=0,g=1,y=2,x=3,v=0,T=c,w=c*2,I=-1;s==="RGB"&&(p=3,m=0,g=1,y=2,x=-1),u==="RGBA"?I=c*3:u==="RBG"?(v=0,w=c,T=c*2):u==="BGR"&&(w=0,T=c,v=c*2);for(let P=0;P<c;P++,m+=p,y+=p,g+=p,x+=p)f[v++]=(n[m]+a[0])/i[0],f[T++]=(n[g]+a[1])/i[1],f[w++]=(n[y]+a[2])/i[2],I!==-1&&x!==-1&&(f[I++]=(n[x]+a[3])/i[3]);return u==="RGBA"?new ft("float32",f,[1,4,r,t]):new ft("float32",f,[1,3,r,t])},ud=async(n,e)=>{let r=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,t=typeof ImageData<"u"&&n instanceof ImageData,o=typeof ImageBitmap<"u"&&n instanceof ImageBitmap,i=typeof n=="string",a,s=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=u();f.width=n.width,f.height=n.height;let p=c(f);if(p!=null){let m=n.height,g=n.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(m=e.resizedHeight,g=e.resizedWidth),e!==void 0){if(s=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");s.tensorFormat="RGBA",s.height=m,s.width=g}else s.tensorFormat="RGBA",s.height=m,s.width=g;p.drawImage(n,0,0),a=p.getImageData(0,0,g,m).data}else throw new Error("Can not access image data")}else if(t){let f,p;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(f=e.resizedHeight,p=e.resizedWidth):(f=n.height,p=n.width),e!==void 0&&(s=e),s.format="RGBA",s.height=f,s.width=p,e!==void 0){let m=u();m.width=p,m.height=f;let g=c(m);if(g!=null)g.putImageData(n,0,0),a=g.getImageData(0,0,p,f).data;else throw new Error("Can not access image data")}else a=n.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=u();f.width=n.width,f.height=n.height;let p=c(f);if(p!=null){let m=n.height,g=n.width;return p.drawImage(n,0,0,g,m),a=p.getImageData(0,0,g,m).data,s.height=m,s.width=g,ms(a,s)}else throw new Error("Can not access image data")}else{if(i)return new Promise((f,p)=>{let m=u(),g=c(m);if(!n||!g)return p();let y=new Image;y.crossOrigin="Anonymous",y.src=n,y.onload=()=>{m.width=y.width,m.height=y.height,g.drawImage(y,0,0,m.width,m.height);let x=g.getImageData(0,0,m.width,m.height);s.height=m.height,s.width=m.width,f(ms(x.data,s))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return ms(a,s);throw new Error("Input data provided is not supported - aborted tensor creation")},ld=(n,e)=>{let{width:r,height:t,download:o,dispose:i}=e,a=[1,t,r,4];return new ft({location:"texture",type:"float32",texture:n,dims:a,download:o,dispose:i})},cd=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new ft({location:"gpu-buffer",type:r??"float32",gpuBuffer:n,dims:t,download:o,dispose:i})},fd=(n,e)=>{let{dataType:r,dims:t,download:o,dispose:i}=e;return new ft({location:"ml-tensor",type:r??"float32",mlTensor:n,dims:t,download:o,dispose:i})},dd=(n,e,r)=>new ft({location:"cpu-pinned",type:n,data:e,dims:r??[e.length]})});var Gr,Kn,md,hd,bd=E(()=>{"use strict";Gr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Kn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),md=!1,hd=()=>{if(!md){md=!0;let n=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,t=typeof r<"u"&&r.from;n&&(Gr.set("int64",BigInt64Array),Kn.set(BigInt64Array,"int64")),e&&(Gr.set("uint64",BigUint64Array),Kn.set(BigUint64Array,"uint64")),t?(Gr.set("float16",r),Kn.set(r,"float16")):Gr.set("float16",Uint16Array)}}});var gd,yd,_d=E(()=>{"use strict";ri();gd=n=>{let e=1;for(let r=0;r<n.length;r++){let t=n[r];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${r}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${t}`);e*=t}return e},yd=(n,e)=>{switch(n.location){case"cpu":return new ft(n.type,n.data,e);case"cpu-pinned":return new ft({location:"cpu-pinned",data:n.data,type:n.type,dims:e});case"texture":return new ft({location:"texture",texture:n.texture,type:n.type,dims:e});case"gpu-buffer":return new ft({location:"gpu-buffer",gpuBuffer:n.gpuBuffer,type:n.type,dims:e});case"ml-tensor":return new ft({location:"ml-tensor",mlTensor:n.mlTensor,type:n.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${n.location} is not supported`)}}});var ft,ri=E(()=>{"use strict";sd();pd();bd();_d();ft=class{constructor(e,r,t){hd();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let s=Gr.get(o);if(!s)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");s=r}else{let c=Gr.get(e);if(c===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&c===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${c.name} as data.`);e==="uint64"||e==="int64"?s=c.from(r,BigInt):s=c.from(r)}else if(r instanceof c)s=r;else if(r instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&r instanceof Uint16Array&&c!==Uint16Array)s=new globalThis.Uint16Array(r.buffer,r.byteOffset,r.length);else throw new TypeError(`A ${o} tensor's data must be type of ${c}`)}else if(u=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let c=typeof e[0];if(c==="string")o="string",s=e;else if(c==="boolean")o="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${c}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",s=Uint8Array.from(e);else{let c=Kn.get(e.constructor);if(c===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=c,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=s,this.dataLocation="cpu"}let a=gd(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(e,r){return ud(e,r)}static fromTexture(e,r){return ld(e,r)}static fromGpuBuffer(e,r){return cd(e,r)}static fromMLTensor(e,r){return fd(e,r)}static fromPinnedBuffer(e,r,t){return dd(e,r,t)}toDataURL(e){return id(this,e)}toImageData(e){return ad(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return yd(this,e)}}});var It,hs=E(()=>{"use strict";ri();It=ft});var ni,xd,St,gt,bs=E(()=>{"use strict";ps();ni=(n,e)=>{(typeof vt.trace>"u"?!vt.wasm.trace:!vt.trace)||console.timeStamp(`${n}::ORT::${e}`)},xd=(n,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<r.length;o++){if(t&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${n}::${r[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),ni("CPU",i);return}r[o].includes("TRACE_FUNC")&&(t=!0)}},St=n=>{(typeof vt.trace>"u"?!vt.wasm.trace:!vt.trace)||xd("BEGIN",n)},gt=n=>{(typeof vt.trace>"u"?!vt.wasm.trace:!vt.trace)||xd("END",n)}});var oi,Td=E(()=>{"use strict";ds();hs();bs();oi=class n{constructor(e){this.handler=e}async run(e,r,t){St();let o={},i={};if(typeof e!="object"||e===null||e instanceof It||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof It)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);o[c]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,f=Object.getOwnPropertyNames(r);for(let p of this.outputNames)if(f.indexOf(p)!==-1){let m=r[p];(m===null||m instanceof It)&&(c=!0,a=!1,o[p]=m)}if(c){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof e[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(a)for(let c of this.outputNames)o[c]=null;let s=await this.handler.run(e,o,i),u={};for(let c in s)if(Object.hasOwnProperty.call(s,c)){let f=s[c];f instanceof It?u[c]=f:u[c]=new It(f.type,f.data,f.dims)}return gt(),u}async release(){return this.handler.dispose()}static async create(e,r,t,o){St();let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let f=e,p=0,m=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteOffset' must be an integer.");if(p<0||p>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(m=e.byteLength-p,typeof t=="number"){if(m=t,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||p+m>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-p}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(f,p,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[s,u]=await Qf(a),c=await s.createInferenceSessionHandler(i,u);return gt(),new n(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var t2,wd=E(()=>{"use strict";Td();t2=oi});var vd=E(()=>{"use strict"});var Id=E(()=>{"use strict"});var Sd=E(()=>{"use strict"});var $d=E(()=>{"use strict"});var gs={};gn(gs,{InferenceSession:()=>t2,TRACE:()=>ni,TRACE_FUNC_BEGIN:()=>St,TRACE_FUNC_END:()=>gt,Tensor:()=>It,env:()=>he,registerBackend:()=>Sr});var pt=E(()=>{"use strict";ed();od();wd();hs();vd();Id();bs();Sd();$d()});function $r(n,e,r,t){if(e===void 0)return n2(n);if(r===void 0)ii(n,e,1);else if(typeof r=="number"&&t===void 0)ii(n,e,r);else if(typeof r=="string"&&t===void 0)ii(n,r,1,e);else if(typeof r=="string"&&typeof t=="number")ii(n,r,t,e);else throw new TypeError("input is valid")}function n2(n){return{verbose:$r.verbose.bind(null,n),info:$r.info.bind(null,n),warning:$r.warning.bind(null,n),error:$r.error.bind(null,n),fatal:$r.fatal.bind(null,n)}}function ii(n,e,r,t){let o=jn[t||""]||jn[""];Od[n]<Od[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,r2[o.provider].log(n,e,t))}var ys,_s,Od,r2,Pd,jn,Le,si,ui,li,ai,Pt=E(()=>{"use strict";ys=class{log(e,r,t){}},_s=class{log(e,r,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${r}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Od={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},r2={none:new ys,console:new _s},Pd={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},jn={"":Pd};(u=>{function n(c,f){u("verbose",c,f)}u.verbose=n;function e(c,f){u("info",c,f)}u.info=e;function r(c,f){u("warning",c,f)}u.warning=r;function t(c,f){u("error",c,f)}u.error=t;function o(c,f){u("fatal",c,f)}u.fatal=o;function i(c){jn={},a("",c||{})}u.reset=i;function a(c,f){if(c==="*")i(f);else{let p=jn[c]||Pd;jn[c]={provider:f.provider||p.provider,minimalSeverity:f.minimalSeverity||p.minimalSeverity,logDateTime:f.logDateTime===void 0?p.logDateTime:f.logDateTime,logSourceLocation:f.logSourceLocation===void 0?p.logSourceLocation:f.logSourceLocation}}}u.set=a;function s(c){let f={};c.logLevel&&(f.minimalSeverity=c.logLevel),a("",f)}u.setWithEnv=s})($r||={});Le=$r,si=class{constructor(e,r,t,o,i,a){this.category=e;this.name=r;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=a}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},ui=class{constructor(e,r,t,o){this.category=e;this.name=r;this.startTime=t;this.endTime=o}},li=class{constructor(e,r,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=r===void 0?10:r,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=ai(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,r,t,o){let i=this._started?this.begin(e,r,o):void 0,a=!1,s=t();if(s&&typeof s.then=="function")return a=!0,new Promise((u,c)=>{s.then(async f=>{i&&await i.end(),u(f)},async f=>{i&&await i.end(),c(f)})});if(!a&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((c,f)=>{u.then(()=>{c(s)},p=>{f(p)})})}return s}begin(e,r,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=ai();return this.flush(o),new si(e,r,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new si(e,r,0,async i=>this.end(i),o,t)}}async end(e){let r=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new ui(e.category,e.name,e.startTime,r)),this.flush(r))}endSync(e){let r=ai();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new ui(e.category,e.name,e.startTime,r)),this.flush(r))}logOneEvent(e){Le.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let r=this._flushPointer;this._flushPointer<r+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=ai()}}get started(){return this._started}},ai=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Cd(n,e,r){for(let t of r){let o=t[0],i=t[1],a=t[2],s=t[3],u=t[4];if(n.opType===o){for(let c of e)if((c.domain===i||c.domain==="ai.onnx"&&i==="")&&o2(c.version,a))return{opImpl:s,opInit:u}}}throw new TypeError(`cannot resolve operator '${n.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function o2(n,e){if(e.endsWith("+")){let r=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(r)&&r<=n}else if(e.split("-").length===2){let r=e.split("-"),t=Number.parseInt(r[0],10),o=Number.parseInt(r[1],10);return!isNaN(t)&&!isNaN(o)&&t<=n&&n<=o}else return Number.parseInt(e,10)===n}var Ed=E(()=>{"use strict"});var kd=nt(xs=>{"use strict";xs.__esModule=!0;var i2=function(){function n(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=n.EMPTY,e&&n.isGuid(e)&&(this.value=e)}return n.isGuid=function(e){var r=e.toString();return e&&(e instanceof n||n.validator.test(r))},n.create=function(){return new n([n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-"))},n.createEmpty=function(){return new n("emptyguid")},n.parse=function(e){return new n(e)},n.raw=function(){return[n.gen(2),n.gen(1),n.gen(1),n.gen(1),n.gen(3)].join("-")},n.gen=function(e){for(var r="",t=0;t<e;t++)r+=((1+Math.random())*65536|0).toString(16).substring(1);return r},n.prototype.equals=function(e){return n.isGuid(e)&&this.value===e.toString()},n.prototype.isEmpty=function(){return this.value===n.EMPTY},n.prototype.toString=function(){return this.value},n.prototype.toJSON=function(){return{value:this.value}},n.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),n.EMPTY="00000000-0000-0000-0000-000000000000",n}();xs.Guid=i2});function We(n,e,r){this.low=n|0,this.high=e|0,this.unsigned=!!r}function mt(n){return(n&&n.__isLong__)===!0}function Dd(n){var e=Math.clz32(n&-n);return n?31-e:e}function Wr(n,e){var r,t,o;return e?(n>>>=0,(o=0<=n&&n<256)&&(t=Nd[n],t)?t:(r=Ne(n,0,!0),o&&(Nd[n]=r),r)):(n|=0,(o=-128<=n&&n<128)&&(t=Bd[n],t)?t:(r=Ne(n,n<0?-1:0,!1),o&&(Bd[n]=r),r))}function Et(n,e){if(isNaN(n))return e?br:Lt;if(e){if(n<0)return br;if(n>=Md)return Ud}else{if(n<=-zd)return yt;if(n+1>=zd)return Fd}return n<0?Et(-n,e).neg():Ne(n%xn|0,n/xn|0,e)}function Ne(n,e,r){return new We(n,e,r)}function ws(n,e,r){if(n.length===0)throw Error("empty string");if(typeof e=="number"?(r=e,e=!1):e=!!e,n==="NaN"||n==="Infinity"||n==="+Infinity"||n==="-Infinity")return e?br:Lt;if(r=r||10,r<2||36<r)throw RangeError("radix");var t;if((t=n.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return ws(n.substring(1),e,r).neg();for(var o=Et(ci(r,8)),i=Lt,a=0;a<n.length;a+=8){var s=Math.min(8,n.length-a),u=parseInt(n.substring(a,a+s),r);if(s<8){var c=Et(ci(r,s));i=i.mul(c).add(Et(u))}else i=i.mul(o),i=i.add(Et(u))}return i.unsigned=e,i}function Mt(n,e){return typeof n=="number"?Et(n,e):typeof n=="string"?ws(n,e):Ne(n.low,n.high,typeof e=="boolean"?e:n.unsigned)}var Ct,Bd,Nd,ci,Rd,a2,xn,Md,zd,Ld,Lt,br,_n,Vd,Ts,Fd,Ud,yt,K,Ar,vs=E(()=>{Ct=null;try{Ct=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}We.prototype.__isLong__;Object.defineProperty(We.prototype,"__isLong__",{value:!0});We.isLong=mt;Bd={},Nd={};We.fromInt=Wr;We.fromNumber=Et;We.fromBits=Ne;ci=Math.pow;We.fromString=ws;We.fromValue=Mt;Rd=65536,a2=1<<24,xn=Rd*Rd,Md=xn*xn,zd=Md/2,Ld=Wr(a2),Lt=Wr(0);We.ZERO=Lt;br=Wr(0,!0);We.UZERO=br;_n=Wr(1);We.ONE=_n;Vd=Wr(1,!0);We.UONE=Vd;Ts=Wr(-1);We.NEG_ONE=Ts;Fd=Ne(-1,2147483647,!1);We.MAX_VALUE=Fd;Ud=Ne(-1,-1,!0);We.MAX_UNSIGNED_VALUE=Ud;yt=Ne(0,-2147483648,!1);We.MIN_VALUE=yt;K=We.prototype;K.toInt=function(){return this.unsigned?this.low>>>0:this.low};K.toNumber=function(){return this.unsigned?(this.high>>>0)*xn+(this.low>>>0):this.high*xn+(this.low>>>0)};K.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(yt)){var r=Et(e),t=this.div(r),o=t.mul(r).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=Et(ci(e,6),this.unsigned),a=this,s="";;){var u=a.div(i),c=a.sub(u.mul(i)).toInt()>>>0,f=c.toString(e);if(a=u,a.isZero())return f+s;for(;f.length<6;)f="0"+f;s=""+f+s}};K.getHighBits=function(){return this.high};K.getHighBitsUnsigned=function(){return this.high>>>0};K.getLowBits=function(){return this.low};K.getLowBitsUnsigned=function(){return this.low>>>0};K.getNumBitsAbs=function(){if(this.isNegative())return this.eq(yt)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,r=31;r>0&&(e&1<<r)==0;r--);return this.high!=0?r+33:r+1};K.isZero=function(){return this.high===0&&this.low===0};K.eqz=K.isZero;K.isNegative=function(){return!this.unsigned&&this.high<0};K.isPositive=function(){return this.unsigned||this.high>=0};K.isOdd=function(){return(this.low&1)===1};K.isEven=function(){return(this.low&1)===0};K.equals=function(e){return mt(e)||(e=Mt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};K.eq=K.equals;K.notEquals=function(e){return!this.eq(e)};K.neq=K.notEquals;K.ne=K.notEquals;K.lessThan=function(e){return this.comp(e)<0};K.lt=K.lessThan;K.lessThanOrEqual=function(e){return this.comp(e)<=0};K.lte=K.lessThanOrEqual;K.le=K.lessThanOrEqual;K.greaterThan=function(e){return this.comp(e)>0};K.gt=K.greaterThan;K.greaterThanOrEqual=function(e){return this.comp(e)>=0};K.gte=K.greaterThanOrEqual;K.ge=K.greaterThanOrEqual;K.compare=function(e){if(mt(e)||(e=Mt(e)),this.eq(e))return 0;var r=this.isNegative(),t=e.isNegative();return r&&!t?-1:!r&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};K.comp=K.compare;K.negate=function(){return!this.unsigned&&this.eq(yt)?yt:this.not().add(_n)};K.neg=K.negate;K.add=function(e){mt(e)||(e=Mt(e));var r=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,a=e.high>>>16,s=e.high&65535,u=e.low>>>16,c=e.low&65535,f=0,p=0,m=0,g=0;return g+=i+c,m+=g>>>16,g&=65535,m+=o+u,p+=m>>>16,m&=65535,p+=t+s,f+=p>>>16,p&=65535,f+=r+a,f&=65535,Ne(m<<16|g,f<<16|p,this.unsigned)};K.subtract=function(e){return mt(e)||(e=Mt(e)),this.add(e.neg())};K.sub=K.subtract;K.multiply=function(e){if(this.isZero())return this;if(mt(e)||(e=Mt(e)),Ct){var r=Ct.mul(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?br:Lt;if(this.eq(yt))return e.isOdd()?yt:Lt;if(e.eq(yt))return this.isOdd()?yt:Lt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Ld)&&e.lt(Ld))return Et(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,a=this.low&65535,s=e.high>>>16,u=e.high&65535,c=e.low>>>16,f=e.low&65535,p=0,m=0,g=0,y=0;return y+=a*f,g+=y>>>16,y&=65535,g+=i*f,m+=g>>>16,g&=65535,g+=a*c,m+=g>>>16,g&=65535,m+=o*f,p+=m>>>16,m&=65535,m+=i*c,p+=m>>>16,m&=65535,m+=a*u,p+=m>>>16,m&=65535,p+=t*f+o*c+i*u+a*s,p&=65535,Ne(g<<16|y,p<<16|m,this.unsigned)};K.mul=K.multiply;K.divide=function(e){if(mt(e)||(e=Mt(e)),e.isZero())throw Error("division by zero");if(Ct){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var r=(this.unsigned?Ct.div_u:Ct.div_s)(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?br:Lt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return br;if(e.gt(this.shru(1)))return Vd;i=br}else{if(this.eq(yt)){if(e.eq(_n)||e.eq(Ts))return yt;if(e.eq(yt))return _n;var a=this.shr(1);return t=a.div(e).shl(1),t.eq(Lt)?e.isNegative()?_n:Ts:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(yt))return this.unsigned?br:Lt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=Lt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var s=Math.ceil(Math.log(t)/Math.LN2),u=s<=48?1:ci(2,s-48),c=Et(t),f=c.mul(e);f.isNegative()||f.gt(o);)t-=u,c=Et(t,this.unsigned),f=c.mul(e);c.isZero()&&(c=_n),i=i.add(c),o=o.sub(f)}return i};K.div=K.divide;K.modulo=function(e){if(mt(e)||(e=Mt(e)),Ct){var r=(this.unsigned?Ct.rem_u:Ct.rem_s)(this.low,this.high,e.low,e.high);return Ne(r,Ct.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};K.mod=K.modulo;K.rem=K.modulo;K.not=function(){return Ne(~this.low,~this.high,this.unsigned)};K.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};K.clz=K.countLeadingZeros;K.countTrailingZeros=function(){return this.low?Dd(this.low):Dd(this.high)+32};K.ctz=K.countTrailingZeros;K.and=function(e){return mt(e)||(e=Mt(e)),Ne(this.low&e.low,this.high&e.high,this.unsigned)};K.or=function(e){return mt(e)||(e=Mt(e)),Ne(this.low|e.low,this.high|e.high,this.unsigned)};K.xor=function(e){return mt(e)||(e=Mt(e)),Ne(this.low^e.low,this.high^e.high,this.unsigned)};K.shiftLeft=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):Ne(0,this.low<<e-32,this.unsigned)};K.shl=K.shiftLeft;K.shiftRight=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):Ne(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};K.shr=K.shiftRight;K.shiftRightUnsigned=function(e){return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?Ne(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?Ne(this.high,0,this.unsigned):Ne(this.high>>>e-32,0,this.unsigned)};K.shru=K.shiftRightUnsigned;K.shr_u=K.shiftRightUnsigned;K.rotateLeft=function(e){var r;return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ne(this.high,this.low,this.unsigned):e<32?(r=32-e,Ne(this.low<<e|this.high>>>r,this.high<<e|this.low>>>r,this.unsigned)):(e-=32,r=32-e,Ne(this.high<<e|this.low>>>r,this.low<<e|this.high>>>r,this.unsigned))};K.rotl=K.rotateLeft;K.rotateRight=function(e){var r;return mt(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?Ne(this.high,this.low,this.unsigned):e<32?(r=32-e,Ne(this.high<<r|this.low>>>e,this.low<<r|this.high>>>e,this.unsigned)):(e-=32,r=32-e,Ne(this.low<<r|this.high>>>e,this.high<<r|this.low>>>e,this.unsigned))};K.rotr=K.rotateRight;K.toSigned=function(){return this.unsigned?Ne(this.low,this.high,!1):this};K.toUnsigned=function(){return this.unsigned?this:Ne(this.low,this.high,!0)};K.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};K.toBytesLE=function(){var e=this.high,r=this.low;return[r&255,r>>>8&255,r>>>16&255,r>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};K.toBytesBE=function(){var e=this.high,r=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,r>>>24,r>>>16&255,r>>>8&255,r&255]};We.fromBytes=function(e,r,t){return t?We.fromBytesLE(e,r):We.fromBytesBE(e,r)};We.fromBytesLE=function(e,r){return new We(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,r)};We.fromBytesBE=function(e,r){return new We(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],r)};Ar=We});var Is=E(()=>{"use strict"});var Hr=E(()=>{});var Yt,fi,di,Tn,Ss=E(()=>{Yt=new Int32Array(2),fi=new Float32Array(Yt.buffer),di=new Float64Array(Yt.buffer),Tn=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1});var Xn,$s=E(()=>{(function(n){n[n.UTF8_BYTES=1]="UTF8_BYTES",n[n.UTF16_STRING=2]="UTF16_STRING"})(Xn||(Xn={}))});var wn,As=E(()=>{Hr();Ss();$s();wn=class n{constructor(e){this.bytes_=e,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(e){return new n(new Uint8Array(e))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(e){this.position_=e}capacity(){return this.bytes_.length}readInt8(e){return this.readUint8(e)<<24>>24}readUint8(e){return this.bytes_[e]}readInt16(e){return this.readUint16(e)<<16>>16}readUint16(e){return this.bytes_[e]|this.bytes_[e+1]<<8}readInt32(e){return this.bytes_[e]|this.bytes_[e+1]<<8|this.bytes_[e+2]<<16|this.bytes_[e+3]<<24}readUint32(e){return this.readInt32(e)>>>0}readInt64(e){return BigInt.asIntN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readUint64(e){return BigInt.asUintN(64,BigInt(this.readUint32(e))+(BigInt(this.readUint32(e+4))<<BigInt(32)))}readFloat32(e){return Yt[0]=this.readInt32(e),fi[0]}readFloat64(e){return Yt[Tn?0:1]=this.readInt32(e),Yt[Tn?1:0]=this.readInt32(e+4),di[0]}writeInt8(e,r){this.bytes_[e]=r}writeUint8(e,r){this.bytes_[e]=r}writeInt16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeUint16(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8}writeInt32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeUint32(e,r){this.bytes_[e]=r,this.bytes_[e+1]=r>>8,this.bytes_[e+2]=r>>16,this.bytes_[e+3]=r>>24}writeInt64(e,r){this.writeInt32(e,Number(BigInt.asIntN(32,r))),this.writeInt32(e+4,Number(BigInt.asIntN(32,r>>BigInt(32))))}writeUint64(e,r){this.writeUint32(e,Number(BigInt.asUintN(32,r))),this.writeUint32(e+4,Number(BigInt.asUintN(32,r>>BigInt(32))))}writeFloat32(e,r){fi[0]=r,this.writeInt32(e,Yt[0])}writeFloat64(e,r){di[0]=r,this.writeInt32(e,Yt[Tn?0:1]),this.writeInt32(e+4,Yt[Tn?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+4+4)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let e="";for(let r=0;r<4;r++)e+=String.fromCharCode(this.readInt8(this.position_+4+r));return e}__offset(e,r){let t=e-this.readInt32(e);return r<this.readInt16(t)?this.readInt16(t+r):0}__union(e,r){return e.bb_pos=r+this.readInt32(r),e.bb=this,e}__string(e,r){e+=this.readInt32(e);let t=this.readInt32(e);e+=4;let o=this.bytes_.subarray(e,e+t);return r===Xn.UTF8_BYTES?o:this.text_decoder_.decode(o)}__union_with_string(e,r){return typeof e=="string"?this.__string(r):this.__union(e,r)}__indirect(e){return e+this.readInt32(e)}__vector(e){return e+this.readInt32(e)+4}__vector_len(e){return this.readInt32(e+this.readInt32(e))}__has_identifier(e){if(e.length!=4)throw new Error("FlatBuffers: file identifier must be length "+4);for(let r=0;r<4;r++)if(e.charCodeAt(r)!=this.readInt8(this.position()+4+r))return!1;return!0}createScalarList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i)}return t}createObjList(e,r){let t=[];for(let o=0;o<r;++o){let i=e(o);i!==null&&t.push(i.unpack())}return t}}});var Gd=E(()=>{As();Hr()});var Re=E(()=>{Hr();Hr();Hr();Hr();Ss();$s();Gd();As()});var Zn,Os=E(()=>{"use strict";Re();Is();Zn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsArgTypeAndIndex(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsArgTypeAndIndex(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}argType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}static startArgTypeAndIndex(e){e.startObject(2)}static addArgType(e,r){e.addFieldInt8(0,r,0)}static addIndex(e,r){e.addFieldInt32(1,r,0)}static endArgTypeAndIndex(e){return e.endObject()}static createArgTypeAndIndex(e,r,t){return n.startArgTypeAndIndex(e),n.addArgType(e,r),n.addIndex(e,t),n.endArgTypeAndIndex(e)}}});var Jn,Ps=E(()=>{"use strict";Jn=(g=>(g[g.UNDEFINED=0]="UNDEFINED",g[g.FLOAT=1]="FLOAT",g[g.INT=2]="INT",g[g.STRING=3]="STRING",g[g.TENSOR=4]="TENSOR",g[g.GRAPH=5]="GRAPH",g[g.FLOATS=6]="FLOATS",g[g.INTS=7]="INTS",g[g.STRINGS=8]="STRINGS",g[g.TENSORS=9]="TENSORS",g[g.GRAPHS=10]="GRAPHS",g[g.SPARSE_TENSOR=11]="SPARSE_TENSOR",g[g.SPARSE_TENSORS=12]="SPARSE_TENSORS",g))(Jn||{})});var Cs=E(()=>{"use strict"});var jr,Es=E(()=>{"use strict";Re();ks();Cs();jr=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNode(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNode(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}sinceVersion(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}index(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readUint32(this.bb_pos+e):0}opType(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt32(this.bb_pos+e):0}executionProviderType(e){let r=this.bb.__offset(this.bb_pos,18);return r?this.bb.__string(this.bb_pos+r,e):null}inputs(e,r){let t=this.bb.__offset(this.bb_pos,20);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}attributes(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?(r||new Or).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}attributesLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCounts(e){let r=this.bb.__offset(this.bb_pos,26);return r?this.bb.readInt32(this.bb.__vector(this.bb_pos+r)+e*4):0}inputArgCountsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}inputArgCountsArray(){let e=this.bb.__offset(this.bb_pos,26);return e?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}implicitInputs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}implicitInputsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNode(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDomain(e,r){e.addFieldOffset(2,r,0)}static addSinceVersion(e,r){e.addFieldInt32(3,r,0)}static addIndex(e,r){e.addFieldInt32(4,r,0)}static addOpType(e,r){e.addFieldOffset(5,r,0)}static addType(e,r){e.addFieldInt32(6,r,0)}static addExecutionProviderType(e,r){e.addFieldOffset(7,r,0)}static addInputs(e,r){e.addFieldOffset(8,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(9,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addAttributes(e,r){e.addFieldOffset(10,r,0)}static createAttributesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startAttributesVector(e,r){e.startVector(4,r,4)}static addInputArgCounts(e,r){e.addFieldOffset(11,r,0)}static createInputArgCountsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startInputArgCountsVector(e,r){e.startVector(4,r,4)}static addImplicitInputs(e,r){e.addFieldOffset(12,r,0)}static createImplicitInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startImplicitInputsVector(e,r){e.startVector(4,r,4)}static endNode(e){return e.endObject()}static createNode(e,r,t,o,i,a,s,u,c,f,p,m,g,y){return n.startNode(e),n.addName(e,r),n.addDocString(e,t),n.addDomain(e,o),n.addSinceVersion(e,i),n.addIndex(e,a),n.addOpType(e,s),n.addType(e,u),n.addExecutionProviderType(e,c),n.addInputs(e,f),n.addOutputs(e,p),n.addAttributes(e,m),n.addInputArgCounts(e,g),n.addImplicitInputs(e,y),n.endNode(e)}}});var vn,Ds=E(()=>{"use strict";vn=class{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static sizeOf(){return 12}static createEdgeEnd(e,r,t,o){return e.prep(4,12),e.writeInt32(o),e.writeInt32(t),e.writeInt32(r),e.offset()}}});var Yn,Bs=E(()=>{"use strict";Re();Ds();Yn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodeEdge(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodeEdge(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndex(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint32(this.bb_pos+e):0}inputEdges(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new vn).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}inputEdgesLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}outputEdges(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new vn).__init(this.bb.__vector(this.bb_pos+t)+e*12,this.bb):null}outputEdgesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startNodeEdge(e){e.startObject(3)}static addNodeIndex(e,r){e.addFieldInt32(0,r,0)}static addInputEdges(e,r){e.addFieldOffset(1,r,0)}static startInputEdgesVector(e,r){e.startVector(12,r,4)}static addOutputEdges(e,r){e.addFieldOffset(2,r,0)}static startOutputEdgesVector(e,r){e.startVector(12,r,4)}static endNodeEdge(e){return e.endObject()}static createNodeEdge(e,r,t,o){return n.startNodeEdge(e),n.addNodeIndex(e,r),n.addInputEdges(e,t),n.addOutputEdges(e,o),n.endNodeEdge(e)}}});var Qn,Ns=E(()=>{"use strict";Re();Qn=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsNodesToOptimizeIndices(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsNodesToOptimizeIndices(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}nodeIndices(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.readUint32(this.bb.__vector(this.bb_pos+r)+e*4):0}nodeIndicesLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeIndicesArray(){let e=this.bb.__offset(this.bb_pos,4);return e?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}numInputs(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint32(this.bb_pos+e):0}numOutputs(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readUint32(this.bb_pos+e):0}hasVariadicInput(){let e=this.bb.__offset(this.bb_pos,10);return e?!!this.bb.readInt8(this.bb_pos+e):!1}hasVariadicOutput(){let e=this.bb.__offset(this.bb_pos,12);return e?!!this.bb.readInt8(this.bb_pos+e):!1}numVariadicInputs(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readUint32(this.bb_pos+e):0}numVariadicOutputs(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readUint32(this.bb_pos+e):0}static startNodesToOptimizeIndices(e){e.startObject(7)}static addNodeIndices(e,r){e.addFieldOffset(0,r,0)}static createNodeIndicesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addInt32(r[t]);return e.endVector()}static startNodeIndicesVector(e,r){e.startVector(4,r,4)}static addNumInputs(e,r){e.addFieldInt32(1,r,0)}static addNumOutputs(e,r){e.addFieldInt32(2,r,0)}static addHasVariadicInput(e,r){e.addFieldInt8(3,+r,0)}static addHasVariadicOutput(e,r){e.addFieldInt8(4,+r,0)}static addNumVariadicInputs(e,r){e.addFieldInt32(5,r,0)}static addNumVariadicOutputs(e,r){e.addFieldInt32(6,r,0)}static endNodesToOptimizeIndices(e){return e.endObject()}static createNodesToOptimizeIndices(e,r,t,o,i,a,s,u){return n.startNodesToOptimizeIndices(e),n.addNodeIndices(e,r),n.addNumInputs(e,t),n.addNumOutputs(e,o),n.addHasVariadicInput(e,i),n.addHasVariadicOutput(e,a),n.addNumVariadicInputs(e,s),n.addNumVariadicOutputs(e,u),n.endNodesToOptimizeIndices(e)}}});var eo,Rs=E(()=>{"use strict";Re();Ns();eo=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecord(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecord(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}actionId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}nodesToOptimizeIndices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new Qn).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}producedOpIds(e,r){let t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}producedOpIdsLength(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecord(e){e.startObject(4)}static addActionId(e,r){e.addFieldOffset(0,r,0)}static addNodesToOptimizeIndices(e,r){e.addFieldOffset(1,r,0)}static addProducedOpIds(e,r){e.addFieldOffset(3,r,0)}static createProducedOpIdsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startProducedOpIdsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecord(e){return e.endObject()}}});var to,zs=E(()=>{"use strict";Re();Rs();to=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizationRecordContainerEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizationRecordContainerEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}optimizerName(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}runtimeOptimizationRecords(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new eo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}runtimeOptimizationRecordsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizationRecordContainerEntry(e){e.startObject(2)}static addOptimizerName(e,r){e.addFieldOffset(0,r,0)}static addRuntimeOptimizationRecords(e,r){e.addFieldOffset(1,r,0)}static createRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRuntimeOptimizationRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizationRecordContainerEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createRuntimeOptimizationRecordContainerEntry(e,r,t){return n.startRuntimeOptimizationRecordContainerEntry(e),n.addOptimizerName(e,r),n.addRuntimeOptimizationRecords(e,t),n.endRuntimeOptimizationRecordContainerEntry(e)}}});var ro,Ls=E(()=>{"use strict";Re();zs();ro=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsRuntimeOptimizations(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsRuntimeOptimizations(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}records(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new to).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}recordsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startRuntimeOptimizations(e){e.startObject(1)}static addRecords(e,r){e.addFieldOffset(0,r,0)}static createRecordsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startRecordsVector(e,r){e.startVector(4,r,4)}static endRuntimeOptimizations(e){return e.endObject()}static createRuntimeOptimizations(e,r){return n.startRuntimeOptimizations(e),n.addRecords(e,r),n.endRuntimeOptimizations(e)}}});var no=E(()=>{"use strict"});var Vt,oo=E(()=>{"use strict";Re();no();Vt=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensor(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}dataType(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readInt32(this.bb_pos+e):0}rawData(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.readUint8(this.bb.__vector(this.bb_pos+r)+e):0}rawDataLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}rawDataArray(){let e=this.bb.__offset(this.bb_pos,12);return e?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}stringData(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringDataLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}externalDataOffset(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.readInt64(this.bb_pos+e):BigInt("-1")}static startTensor(e){e.startObject(7)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static addDataType(e,r){e.addFieldInt32(3,r,0)}static addRawData(e,r){e.addFieldOffset(4,r,0)}static createRawDataVector(e,r){e.startVector(1,r.length,1);for(let t=r.length-1;t>=0;t--)e.addInt8(r[t]);return e.endVector()}static startRawDataVector(e,r){e.startVector(1,r,1)}static addStringData(e,r){e.addFieldOffset(5,r,0)}static createStringDataVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringDataVector(e,r){e.startVector(4,r,4)}static addExternalDataOffset(e,r){e.addFieldInt64(6,r,BigInt("-1"))}static endTensor(e){return e.endObject()}static createTensor(e,r,t,o,i,a,s,u){return n.startTensor(e),n.addName(e,r),n.addDocString(e,t),n.addDims(e,o),n.addDataType(e,i),n.addRawData(e,a),n.addStringData(e,s),n.addExternalDataOffset(e,u),n.endTensor(e)}}});var io,Ms=E(()=>{"use strict";Re();oo();io=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsSparseTensor(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsSparseTensor(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}values(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new Vt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}indices(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new Vt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}dims(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}dimsLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}static startSparseTensor(e){e.startObject(3)}static addValues(e,r){e.addFieldOffset(0,r,0)}static addIndices(e,r){e.addFieldOffset(1,r,0)}static addDims(e,r){e.addFieldOffset(2,r,0)}static createDimsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startDimsVector(e,r){e.startVector(8,r,8)}static endSparseTensor(e){return e.endObject()}}});var Vs=E(()=>{"use strict";Re();no();ao()});var Fs=E(()=>{"use strict";Re();ao()});var Us=E(()=>{"use strict"});var so,Gs=E(()=>{"use strict";Re();Us();so=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimensionValue(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimensionValue(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dimType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt8(this.bb_pos+e):0}dimValue(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}dimParam(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimensionValue(e){e.startObject(3)}static addDimType(e,r){e.addFieldInt8(0,r,0)}static addDimValue(e,r){e.addFieldInt64(1,r,BigInt("0"))}static addDimParam(e,r){e.addFieldOffset(2,r,0)}static endDimensionValue(e){return e.endObject()}static createDimensionValue(e,r,t,o){return n.startDimensionValue(e),n.addDimType(e,r),n.addDimValue(e,t),n.addDimParam(e,o),n.endDimensionValue(e)}}});var uo,Ws=E(()=>{"use strict";Re();Gs();uo=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsDimension(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsDimension(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}value(e){let r=this.bb.__offset(this.bb_pos,4);return r?(e||new so).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}denotation(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startDimension(e){e.startObject(2)}static addValue(e,r){e.addFieldOffset(0,r,0)}static addDenotation(e,r){e.addFieldOffset(1,r,0)}static endDimension(e){return e.endObject()}static createDimension(e,r,t){return n.startDimension(e),n.addValue(e,r),n.addDenotation(e,t),n.endDimension(e)}}});var lo,Hs=E(()=>{"use strict";Re();Ws();lo=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsShape(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}dim(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new uo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}dimLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startShape(e){e.startObject(1)}static addDim(e,r){e.addFieldOffset(0,r,0)}static createDimVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startDimVector(e,r){e.startVector(4,r,4)}static endShape(e){return e.endObject()}static createShape(e,r){return n.startShape(e),n.addDim(e,r),n.endShape(e)}}});var In,qs=E(()=>{"use strict";Re();Hs();no();In=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTensorTypeAndShape(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTensorTypeAndShape(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}elemType(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt32(this.bb_pos+e):0}shape(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new lo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startTensorTypeAndShape(e){e.startObject(2)}static addElemType(e,r){e.addFieldInt32(0,r,0)}static addShape(e,r){e.addFieldOffset(1,r,0)}static endTensorTypeAndShape(e){return e.endObject()}}});var Ks=E(()=>{"use strict";Vs();Fs();qs()});var Xr,ao=E(()=>{"use strict";Re();Ks();Xr=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsTypeInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsTypeInfo(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}denotation(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}valueType(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readUint8(this.bb_pos+e):0}value(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__union(e,this.bb_pos+r):null}static startTypeInfo(e){e.startObject(3)}static addDenotation(e,r){e.addFieldOffset(0,r,0)}static addValueType(e,r){e.addFieldInt8(1,r,0)}static addValue(e,r){e.addFieldOffset(2,r,0)}static endTypeInfo(e){return e.endObject()}static createTypeInfo(e,r,t,o){return n.startTypeInfo(e),n.addDenotation(e,r),n.addValueType(e,t),n.addValue(e,o),n.endTypeInfo(e)}}});var co,js=E(()=>{"use strict";Re();ao();co=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsValueInfo(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsValueInfo(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(e){let r=this.bb.__offset(this.bb_pos,8);return r?(e||new Xr).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startValueInfo(e){e.startObject(3)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldOffset(2,r,0)}static endValueInfo(e){return e.endObject()}}});var Qt,mi=E(()=>{"use strict";Re();Es();Bs();Ls();Ms();oo();js();Qt=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsGraph(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsGraph(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}initializers(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new Vt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}initializersLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}nodeArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new co).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}nodes(e,r){let t=this.bb.__offset(this.bb_pos,8);return t?(r||new jr).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodesLength(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__vector_len(this.bb_pos+e):0}maxNodeIndex(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readUint32(this.bb_pos+e):0}nodeEdges(e,r){let t=this.bb.__offset(this.bb_pos,12);return t?(r||new Yn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}nodeEdgesLength(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__vector_len(this.bb_pos+e):0}inputs(e,r){let t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}inputsLength(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__vector_len(this.bb_pos+e):0}outputs(e,r){let t=this.bb.__offset(this.bb_pos,16);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}outputsLength(){let e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__vector_len(this.bb_pos+e):0}sparseInitializers(e,r){let t=this.bb.__offset(this.bb_pos,18);return t?(r||new io).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}sparseInitializersLength(){let e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__vector_len(this.bb_pos+e):0}runtimeOptimizations(e){let r=this.bb.__offset(this.bb_pos,20);return r?(e||new ro).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startGraph(e){e.startObject(9)}static addInitializers(e,r){e.addFieldOffset(0,r,0)}static createInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInitializersVector(e,r){e.startVector(4,r,4)}static addNodeArgs(e,r){e.addFieldOffset(1,r,0)}static createNodeArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeArgsVector(e,r){e.startVector(4,r,4)}static addNodes(e,r){e.addFieldOffset(2,r,0)}static createNodesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodesVector(e,r){e.startVector(4,r,4)}static addMaxNodeIndex(e,r){e.addFieldInt32(3,r,0)}static addNodeEdges(e,r){e.addFieldOffset(4,r,0)}static createNodeEdgesVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startNodeEdgesVector(e,r){e.startVector(4,r,4)}static addInputs(e,r){e.addFieldOffset(5,r,0)}static createInputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startInputsVector(e,r){e.startVector(4,r,4)}static addOutputs(e,r){e.addFieldOffset(6,r,0)}static createOutputsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOutputsVector(e,r){e.startVector(4,r,4)}static addSparseInitializers(e,r){e.addFieldOffset(7,r,0)}static createSparseInitializersVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startSparseInitializersVector(e,r){e.startVector(4,r,4)}static addRuntimeOptimizations(e,r){e.addFieldOffset(8,r,0)}static endGraph(e){return e.endObject()}}});var Or,ks=E(()=>{"use strict";Re();Ps();mi();oo();Or=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsAttribute(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsAttribute(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}name(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}docString(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}type(){let e=this.bb.__offset(this.bb_pos,8);return e?this.bb.readInt32(this.bb_pos+e):0}f(){let e=this.bb.__offset(this.bb_pos,10);return e?this.bb.readFloat32(this.bb_pos+e):0}i(){let e=this.bb.__offset(this.bb_pos,12);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}s(e){let r=this.bb.__offset(this.bb_pos,14);return r?this.bb.__string(this.bb_pos+r,e):null}t(e){let r=this.bb.__offset(this.bb_pos,16);return r?(e||new Vt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}g(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new Qt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}floats(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.readFloat32(this.bb.__vector(this.bb_pos+r)+e*4):0}floatsLength(){let e=this.bb.__offset(this.bb_pos,20);return e?this.bb.__vector_len(this.bb_pos+e):0}floatsArray(){let e=this.bb.__offset(this.bb_pos,20);return e?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+e),this.bb.__vector_len(this.bb_pos+e)):null}ints(e){let r=this.bb.__offset(this.bb_pos,22);return r?this.bb.readInt64(this.bb.__vector(this.bb_pos+r)+e*8):BigInt(0)}intsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}strings(e,r){let t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__string(this.bb.__vector(this.bb_pos+t)+e*4,r):null}stringsLength(){let e=this.bb.__offset(this.bb_pos,24);return e?this.bb.__vector_len(this.bb_pos+e):0}tensors(e,r){let t=this.bb.__offset(this.bb_pos,26);return t?(r||new Vt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}tensorsLength(){let e=this.bb.__offset(this.bb_pos,26);return e?this.bb.__vector_len(this.bb_pos+e):0}graphs(e,r){let t=this.bb.__offset(this.bb_pos,28);return t?(r||new Qt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}graphsLength(){let e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__vector_len(this.bb_pos+e):0}static startAttribute(e){e.startObject(13)}static addName(e,r){e.addFieldOffset(0,r,0)}static addDocString(e,r){e.addFieldOffset(1,r,0)}static addType(e,r){e.addFieldInt32(2,r,0)}static addF(e,r){e.addFieldFloat32(3,r,0)}static addI(e,r){e.addFieldInt64(4,r,BigInt("0"))}static addS(e,r){e.addFieldOffset(5,r,0)}static addT(e,r){e.addFieldOffset(6,r,0)}static addG(e,r){e.addFieldOffset(7,r,0)}static addFloats(e,r){e.addFieldOffset(8,r,0)}static createFloatsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addFloat32(r[t]);return e.endVector()}static startFloatsVector(e,r){e.startVector(4,r,4)}static addInts(e,r){e.addFieldOffset(9,r,0)}static createIntsVector(e,r){e.startVector(8,r.length,8);for(let t=r.length-1;t>=0;t--)e.addInt64(r[t]);return e.endVector()}static startIntsVector(e,r){e.startVector(8,r,8)}static addStrings(e,r){e.addFieldOffset(10,r,0)}static createStringsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startStringsVector(e,r){e.startVector(4,r,4)}static addTensors(e,r){e.addFieldOffset(11,r,0)}static createTensorsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startTensorsVector(e,r){e.startVector(4,r,4)}static addGraphs(e,r){e.addFieldOffset(12,r,0)}static createGraphsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startGraphsVector(e,r){e.startVector(4,r,4)}static endAttribute(e){return e.endObject()}}});var Xs=E(()=>{"use strict";Re()});var Hd=E(()=>{"use strict";Re()});var Zs=E(()=>{"use strict";Re();Js()});var Js=E(()=>{"use strict";Re();Xs();Zs()});var fo,Ys=E(()=>{"use strict";Re();Os();fo=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}kernelTypeStr(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}args(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new Zn).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}argsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrArgsEntry(e){e.startObject(2)}static addKernelTypeStr(e,r){e.addFieldOffset(0,r,0)}static addArgs(e,r){e.addFieldOffset(1,r,0)}static createArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createKernelTypeStrArgsEntry(e,r,t){return n.startKernelTypeStrArgsEntry(e),n.addKernelTypeStr(e,r),n.addArgs(e,t),n.endKernelTypeStrArgsEntry(e)}}});var po,Qs=E(()=>{"use strict";Re();Ys();po=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOpIdKernelTypeStrArgsEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOpIdKernelTypeStrArgsEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opId(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}kernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new fo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}kernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}static startOpIdKernelTypeStrArgsEntry(e){e.startObject(2)}static addOpId(e,r){e.addFieldOffset(0,r,0)}static addKernelTypeStrArgs(e,r){e.addFieldOffset(1,r,0)}static createKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endOpIdKernelTypeStrArgsEntry(e){let r=e.endObject();return e.requiredField(r,4),r}static createOpIdKernelTypeStrArgsEntry(e,r,t){return n.startOpIdKernelTypeStrArgsEntry(e),n.addOpId(e,r),n.addKernelTypeStrArgs(e,t),n.endOpIdKernelTypeStrArgsEntry(e)}}});var mo,eu=E(()=>{"use strict";Re();Qs();mo=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsKernelTypeStrResolver(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsKernelTypeStrResolver(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}opKernelTypeStrArgs(e,r){let t=this.bb.__offset(this.bb_pos,4);return t?(r||new po).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opKernelTypeStrArgsLength(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__vector_len(this.bb_pos+e):0}static startKernelTypeStrResolver(e){e.startObject(1)}static addOpKernelTypeStrArgs(e,r){e.addFieldOffset(0,r,0)}static createOpKernelTypeStrArgsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpKernelTypeStrArgsVector(e,r){e.startVector(4,r,4)}static endKernelTypeStrResolver(e){return e.endObject()}static createKernelTypeStrResolver(e,r){return n.startKernelTypeStrResolver(e),n.addOpKernelTypeStrArgs(e,r),n.endKernelTypeStrResolver(e)}}});var ho,tu=E(()=>{"use strict";Re();ho=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsOperatorSetId(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsOperatorSetId(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}domain(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}version(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}static startOperatorSetId(e){e.startObject(2)}static addDomain(e,r){e.addFieldOffset(0,r,0)}static addVersion(e,r){e.addFieldInt64(1,r,BigInt("0"))}static endOperatorSetId(e){return e.endObject()}static createOperatorSetId(e,r,t){return n.startOperatorSetId(e),n.addDomain(e,r),n.addVersion(e,t),n.endOperatorSetId(e)}}});var bo,ru=E(()=>{"use strict";Re();bo=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsStringStringEntry(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsStringStringEntry(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}key(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}value(e){let r=this.bb.__offset(this.bb_pos,6);return r?this.bb.__string(this.bb_pos+r,e):null}static startStringStringEntry(e){e.startObject(2)}static addKey(e,r){e.addFieldOffset(0,r,0)}static addValue(e,r){e.addFieldOffset(1,r,0)}static endStringStringEntry(e){return e.endObject()}static createStringStringEntry(e,r,t){return n.startStringStringEntry(e),n.addKey(e,r),n.addValue(e,t),n.endStringStringEntry(e)}}});var go,nu=E(()=>{"use strict";Re();mi();tu();ru();go=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsModel(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsModel(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}irVersion(){let e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}opsetImport(e,r){let t=this.bb.__offset(this.bb_pos,6);return t?(r||new ho).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}opsetImportLength(){let e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__vector_len(this.bb_pos+e):0}producerName(e){let r=this.bb.__offset(this.bb_pos,8);return r?this.bb.__string(this.bb_pos+r,e):null}producerVersion(e){let r=this.bb.__offset(this.bb_pos,10);return r?this.bb.__string(this.bb_pos+r,e):null}domain(e){let r=this.bb.__offset(this.bb_pos,12);return r?this.bb.__string(this.bb_pos+r,e):null}modelVersion(){let e=this.bb.__offset(this.bb_pos,14);return e?this.bb.readInt64(this.bb_pos+e):BigInt("0")}docString(e){let r=this.bb.__offset(this.bb_pos,16);return r?this.bb.__string(this.bb_pos+r,e):null}graph(e){let r=this.bb.__offset(this.bb_pos,18);return r?(e||new Qt).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}graphDocString(e){let r=this.bb.__offset(this.bb_pos,20);return r?this.bb.__string(this.bb_pos+r,e):null}metadataProps(e,r){let t=this.bb.__offset(this.bb_pos,22);return t?(r||new bo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+t)+e*4),this.bb):null}metadataPropsLength(){let e=this.bb.__offset(this.bb_pos,22);return e?this.bb.__vector_len(this.bb_pos+e):0}static startModel(e){e.startObject(10)}static addIrVersion(e,r){e.addFieldInt64(0,r,BigInt("0"))}static addOpsetImport(e,r){e.addFieldOffset(1,r,0)}static createOpsetImportVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startOpsetImportVector(e,r){e.startVector(4,r,4)}static addProducerName(e,r){e.addFieldOffset(2,r,0)}static addProducerVersion(e,r){e.addFieldOffset(3,r,0)}static addDomain(e,r){e.addFieldOffset(4,r,0)}static addModelVersion(e,r){e.addFieldInt64(5,r,BigInt("0"))}static addDocString(e,r){e.addFieldOffset(6,r,0)}static addGraph(e,r){e.addFieldOffset(7,r,0)}static addGraphDocString(e,r){e.addFieldOffset(8,r,0)}static addMetadataProps(e,r){e.addFieldOffset(9,r,0)}static createMetadataPropsVector(e,r){e.startVector(4,r.length,4);for(let t=r.length-1;t>=0;t--)e.addOffset(r[t]);return e.endVector()}static startMetadataPropsVector(e,r){e.startVector(4,r,4)}static endModel(e){return e.endObject()}}});var yo,qd=E(()=>{"use strict";Re();eu();nu();yo=class n{constructor(){this.bb=null;this.bb_pos=0}__init(e,r){return this.bb_pos=e,this.bb=r,this}static getRootAsInferenceSession(e,r){return(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsInferenceSession(e,r){return e.setPosition(e.position()+4),(r||new n).__init(e.readInt32(e.position())+e.position(),e)}static bufferHasIdentifier(e){return e.__has_identifier("ORTM")}ortVersion(e){let r=this.bb.__offset(this.bb_pos,4);return r?this.bb.__string(this.bb_pos+r,e):null}model(e){let r=this.bb.__offset(this.bb_pos,6);return r?(e||new go).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}kernelTypeStrResolver(e){let r=this.bb.__offset(this.bb_pos,10);return r?(e||new mo).__init(this.bb.__indirect(this.bb_pos+r),this.bb):null}static startInferenceSession(e){e.startObject(4)}static addOrtVersion(e,r){e.addFieldOffset(0,r,0)}static addModel(e,r){e.addFieldOffset(1,r,0)}static addKernelTypeStrResolver(e,r){e.addFieldOffset(3,r,0)}static endInferenceSession(e){return e.endObject()}static finishInferenceSessionBuffer(e,r){e.finish(r,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(e,r){e.finish(r,"ORTM",!0)}}});var Kd=E(()=>{"use strict";Is();Os();ks();Ps();Xs();Hd();Js();Zs();Ws();Gs();Us();Ds();mi();qd();Ys();eu();Vs();nu();Es();Bs();Cs();Ns();Qs();tu();Rs();zs();Ls();Fs();Hs();Ms();ru();oo();no();qs();ao();Ks();js()});var _o=E(()=>{"use strict";Kd()});var Xd=nt((PE,jd)=>{"use strict";jd.exports=b2;function b2(n,e){for(var r=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)r[t++]=arguments[o++];return new Promise(function(s,u){r[t]=function(f){if(i)if(i=!1,f)u(f);else{for(var p=new Array(arguments.length-1),m=0;m<p.length;)p[m++]=arguments[m];s.apply(null,p)}};try{n.apply(e||null,r)}catch(c){i&&(i=!1,u(c))}})}});var Qd=nt(Yd=>{"use strict";var bi=Yd;bi.length=function(e){var r=e.length;if(!r)return 0;for(var t=0;--r%4>1&&e.charAt(r)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Sn=new Array(64),Jd=new Array(123);for(Ft=0;Ft<64;)Jd[Sn[Ft]=Ft<26?Ft+65:Ft<52?Ft+71:Ft<62?Ft-4:Ft-59|43]=Ft++;var Ft;bi.encode=function(e,r,t){for(var o=null,i=[],a=0,s=0,u;r<t;){var c=e[r++];switch(s){case 0:i[a++]=Sn[c>>2],u=(c&3)<<4,s=1;break;case 1:i[a++]=Sn[u|c>>4],u=(c&15)<<2,s=2;break;case 2:i[a++]=Sn[u|c>>6],i[a++]=Sn[c&63],s=0;break}a>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),a=0)}return s&&(i[a++]=Sn[u],i[a++]=61,s===1&&(i[a++]=61)),o?(a&&o.push(String.fromCharCode.apply(String,i.slice(0,a))),o.join("")):String.fromCharCode.apply(String,i.slice(0,a))};var Zd="invalid encoding";bi.decode=function(e,r,t){for(var o=t,i=0,a,s=0;s<e.length;){var u=e.charCodeAt(s++);if(u===61&&i>1)break;if((u=Jd[u])===void 0)throw Error(Zd);switch(i){case 0:a=u,i=1;break;case 1:r[t++]=a<<2|(u&48)>>4,a=u,i=2;break;case 2:r[t++]=(a&15)<<4|(u&60)>>2,a=u,i=3;break;case 3:r[t++]=(a&3)<<6|u,i=0;break}}if(i===1)throw Error(Zd);return t-o};bi.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var tp=nt((EE,ep)=>{"use strict";ep.exports=gi;function gi(){this._listeners={}}gi.prototype.on=function(e,r,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:r,ctx:t||this}),this};gi.prototype.off=function(e,r){if(e===void 0)this._listeners={};else if(r===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===r?t.splice(o,1):++o;return this};gi.prototype.emit=function(e){var r=this._listeners[e];if(r){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<r.length;)r[o].fn.apply(r[o++].ctx,t)}return this}});var up=nt((kE,sp)=>{"use strict";sp.exports=rp(rp);function rp(n){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),r=new Uint8Array(e.buffer),t=r[3]===128;function o(u,c,f){e[0]=u,c[f]=r[0],c[f+1]=r[1],c[f+2]=r[2],c[f+3]=r[3]}function i(u,c,f){e[0]=u,c[f]=r[3],c[f+1]=r[2],c[f+2]=r[1],c[f+3]=r[0]}n.writeFloatLE=t?o:i,n.writeFloatBE=t?i:o;function a(u,c){return r[0]=u[c],r[1]=u[c+1],r[2]=u[c+2],r[3]=u[c+3],e[0]}function s(u,c){return r[3]=u[c],r[2]=u[c+1],r[1]=u[c+2],r[0]=u[c+3],e[0]}n.readFloatLE=t?a:s,n.readFloatBE=t?s:a}():function(){function e(t,o,i,a){var s=o<0?1:0;if(s&&(o=-o),o===0)t(1/o>0?0:2147483648,i,a);else if(isNaN(o))t(2143289344,i,a);else if(o>34028234663852886e22)t((s<<31|2139095040)>>>0,i,a);else if(o<11754943508222875e-54)t((s<<31|Math.round(o/1401298464324817e-60))>>>0,i,a);else{var u=Math.floor(Math.log(o)/Math.LN2),c=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((s<<31|u+127<<23|c)>>>0,i,a)}}n.writeFloatLE=e.bind(null,np),n.writeFloatBE=e.bind(null,op);function r(t,o,i){var a=t(o,i),s=(a>>31)*2+1,u=a>>>23&255,c=a&8388607;return u===255?c?NaN:s*(1/0):u===0?s*1401298464324817e-60*c:s*Math.pow(2,u-150)*(c+8388608)}n.readFloatLE=r.bind(null,ip),n.readFloatBE=r.bind(null,ap)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),r=new Uint8Array(e.buffer),t=r[7]===128;function o(u,c,f){e[0]=u,c[f]=r[0],c[f+1]=r[1],c[f+2]=r[2],c[f+3]=r[3],c[f+4]=r[4],c[f+5]=r[5],c[f+6]=r[6],c[f+7]=r[7]}function i(u,c,f){e[0]=u,c[f]=r[7],c[f+1]=r[6],c[f+2]=r[5],c[f+3]=r[4],c[f+4]=r[3],c[f+5]=r[2],c[f+6]=r[1],c[f+7]=r[0]}n.writeDoubleLE=t?o:i,n.writeDoubleBE=t?i:o;function a(u,c){return r[0]=u[c],r[1]=u[c+1],r[2]=u[c+2],r[3]=u[c+3],r[4]=u[c+4],r[5]=u[c+5],r[6]=u[c+6],r[7]=u[c+7],e[0]}function s(u,c){return r[7]=u[c],r[6]=u[c+1],r[5]=u[c+2],r[4]=u[c+3],r[3]=u[c+4],r[2]=u[c+5],r[1]=u[c+6],r[0]=u[c+7],e[0]}n.readDoubleLE=t?a:s,n.readDoubleBE=t?s:a}():function(){function e(t,o,i,a,s,u){var c=a<0?1:0;if(c&&(a=-a),a===0)t(0,s,u+o),t(1/a>0?0:2147483648,s,u+i);else if(isNaN(a))t(0,s,u+o),t(2146959360,s,u+i);else if(a>17976931348623157e292)t(0,s,u+o),t((c<<31|2146435072)>>>0,s,u+i);else{var f;if(a<22250738585072014e-324)f=a/5e-324,t(f>>>0,s,u+o),t((c<<31|f/4294967296)>>>0,s,u+i);else{var p=Math.floor(Math.log(a)/Math.LN2);p===1024&&(p=1023),f=a*Math.pow(2,-p),t(f*4503599627370496>>>0,s,u+o),t((c<<31|p+1023<<20|f*1048576&1048575)>>>0,s,u+i)}}}n.writeDoubleLE=e.bind(null,np,0,4),n.writeDoubleBE=e.bind(null,op,4,0);function r(t,o,i,a,s){var u=t(a,s+o),c=t(a,s+i),f=(c>>31)*2+1,p=c>>>20&2047,m=4294967296*(c&1048575)+u;return p===2047?m?NaN:f*(1/0):p===0?f*5e-324*m:f*Math.pow(2,p-1075)*(m+4503599627370496)}n.readDoubleLE=r.bind(null,ip,0,4),n.readDoubleBE=r.bind(null,ap,4,0)}(),n}function np(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}function op(n,e,r){e[r]=n>>>24,e[r+1]=n>>>16&255,e[r+2]=n>>>8&255,e[r+3]=n&255}function ip(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0}function ap(n,e){return(n[e]<<24|n[e+1]<<16|n[e+2]<<8|n[e+3])>>>0}});var lp=nt((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(n){}return null}});var fp=nt(cp=>{"use strict";var ou=cp;ou.length=function(e){for(var r=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?r+=1:t<2048?r+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,r+=4):r+=3;return r};ou.read=function(e,r,t){var o=t-r;if(o<1)return"";for(var i=null,a=[],s=0,u;r<t;)u=e[r++],u<128?a[s++]=u:u>191&&u<224?a[s++]=(u&31)<<6|e[r++]&63:u>239&&u<365?(u=((u&7)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,a[s++]=55296+(u>>10),a[s++]=56320+(u&1023)):a[s++]=(u&15)<<12|(e[r++]&63)<<6|e[r++]&63,s>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,a)),s=0);return i?(s&&i.push(String.fromCharCode.apply(String,a.slice(0,s))),i.join("")):String.fromCharCode.apply(String,a.slice(0,s))};ou.write=function(e,r,t){for(var o=t,i,a,s=0;s<e.length;++s)i=e.charCodeAt(s),i<128?r[t++]=i:i<2048?(r[t++]=i>>6|192,r[t++]=i&63|128):(i&64512)===55296&&((a=e.charCodeAt(s+1))&64512)===56320?(i=65536+((i&1023)<<10)+(a&1023),++s,r[t++]=i>>18|240,r[t++]=i>>12&63|128,r[t++]=i>>6&63|128,r[t++]=i&63|128):(r[t++]=i>>12|224,r[t++]=i>>6&63|128,r[t++]=i&63|128);return t-o}});var pp=nt((BE,dp)=>{"use strict";dp.exports=g2;function g2(n,e,r){var t=r||8192,o=t>>>1,i=null,a=t;return function(u){if(u<1||u>o)return n(u);a+u>t&&(i=n(t),a=0);var c=e.call(i,a,a+=u);return a&7&&(a=(a|7)+1),c}}});var hp=nt((NE,mp)=>{"use strict";mp.exports=lt;var xo=Cr();function lt(n,e){this.lo=n>>>0,this.hi=e>>>0}var Zr=lt.zero=new lt(0,0);Zr.toNumber=function(){return 0};Zr.zzEncode=Zr.zzDecode=function(){return this};Zr.length=function(){return 1};var y2=lt.zeroHash="\0\0\0\0\0\0\0\0";lt.fromNumber=function(e){if(e===0)return Zr;var r=e<0;r&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return r&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new lt(t,o)};lt.from=function(e){if(typeof e=="number")return lt.fromNumber(e);if(xo.isString(e))if(xo.Long)e=xo.Long.fromString(e);else return lt.fromNumber(parseInt(e,10));return e.low||e.high?new lt(e.low>>>0,e.high>>>0):Zr};lt.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var r=~this.lo+1>>>0,t=~this.hi>>>0;return r||(t=t+1>>>0),-(r+t*4294967296)}return this.lo+this.hi*4294967296};lt.prototype.toLong=function(e){return xo.Long?new xo.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var Pr=String.prototype.charCodeAt;lt.fromHash=function(e){return e===y2?Zr:new lt((Pr.call(e,0)|Pr.call(e,1)<<8|Pr.call(e,2)<<16|Pr.call(e,3)<<24)>>>0,(Pr.call(e,4)|Pr.call(e,5)<<8|Pr.call(e,6)<<16|Pr.call(e,7)<<24)>>>0)};lt.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};lt.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};lt.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};lt.prototype.length=function(){var e=this.lo,r=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?r===0?e<16384?e<128?1:2:e<2097152?3:4:r<16384?r<128?5:6:r<2097152?7:8:t<128?9:10}});var Cr=nt(iu=>{"use strict";var ie=iu;ie.asPromise=Xd();ie.base64=Qd();ie.EventEmitter=tp();ie.float=up();ie.inquire=lp();ie.utf8=fp();ie.pool=pp();ie.LongBits=hp();ie.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);ie.global=ie.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||iu;ie.emptyArray=Object.freeze?Object.freeze([]):[];ie.emptyObject=Object.freeze?Object.freeze({}):{};ie.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};ie.isString=function(e){return typeof e=="string"||e instanceof String};ie.isObject=function(e){return e&&typeof e=="object"};ie.isset=ie.isSet=function(e,r){var t=e[r];return t!=null&&e.hasOwnProperty(r)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};ie.Buffer=function(){try{var n=ie.inquire("buffer").Buffer;return n.prototype.utf8Write?n:null}catch{return null}}();ie._Buffer_from=null;ie._Buffer_allocUnsafe=null;ie.newBuffer=function(e){return typeof e=="number"?ie.Buffer?ie._Buffer_allocUnsafe(e):new ie.Array(e):ie.Buffer?ie._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};ie.Array=typeof Uint8Array<"u"?Uint8Array:Array;ie.Long=ie.global.dcodeIO&&ie.global.dcodeIO.Long||ie.global.Long||ie.inquire("long");ie.key2Re=/^true|false|0|1$/;ie.key32Re=/^-?(?:0|[1-9][0-9]*)$/;ie.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;ie.longToHash=function(e){return e?ie.LongBits.from(e).toHash():ie.LongBits.zeroHash};ie.longFromHash=function(e,r){var t=ie.LongBits.fromHash(e);return ie.Long?ie.Long.fromBits(t.lo,t.hi,r):t.toNumber(!!r)};function bp(n,e,r){for(var t=Object.keys(e),o=0;o<t.length;++o)(n[t[o]]===void 0||!r)&&(n[t[o]]=e[t[o]]);return n}ie.merge=bp;ie.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function gp(n){function e(r,t){if(!(this instanceof e))return new e(r,t);Object.defineProperty(this,"message",{get:function(){return r}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&bp(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return n},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}ie.newError=gp;ie.ProtocolError=gp("ProtocolError");ie.oneOfGetter=function(e){for(var r={},t=0;t<e.length;++t)r[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(r[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};ie.oneOfSetter=function(e){return function(r){for(var t=0;t<e.length;++t)e[t]!==r&&delete this[e[t]]}};ie.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};ie._configure=function(){var n=ie.Buffer;if(!n){ie._Buffer_from=ie._Buffer_allocUnsafe=null;return}ie._Buffer_from=n.from!==Uint8Array.from&&n.from||function(r,t){return new n(r,t)},ie._Buffer_allocUnsafe=n.allocUnsafe||function(r){return new n(r)}}});var du=nt((zE,Tp)=>{"use strict";Tp.exports=ke;var kt=Cr(),au,yi=kt.LongBits,yp=kt.base64,_p=kt.utf8;function To(n,e,r){this.fn=n,this.len=e,this.next=void 0,this.val=r}function uu(){}function _2(n){this.head=n.head,this.tail=n.tail,this.len=n.len,this.next=n.states}function ke(){this.len=0,this.head=new To(uu,0,0),this.tail=this.head,this.states=null}var xp=function(){return kt.Buffer?function(){return(ke.create=function(){return new au})()}:function(){return new ke}};ke.create=xp();ke.alloc=function(e){return new kt.Array(e)};kt.Array!==Array&&(ke.alloc=kt.pool(ke.alloc,kt.Array.prototype.subarray));ke.prototype._push=function(e,r,t){return this.tail=this.tail.next=new To(e,r,t),this.len+=r,this};function lu(n,e,r){e[r]=n&255}function x2(n,e,r){for(;n>127;)e[r++]=n&127|128,n>>>=7;e[r]=n}function cu(n,e){this.len=n,this.next=void 0,this.val=e}cu.prototype=Object.create(To.prototype);cu.prototype.fn=x2;ke.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new cu((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};ke.prototype.int32=function(e){return e<0?this._push(fu,10,yi.fromNumber(e)):this.uint32(e)};ke.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function fu(n,e,r){for(;n.hi;)e[r++]=n.lo&127|128,n.lo=(n.lo>>>7|n.hi<<25)>>>0,n.hi>>>=7;for(;n.lo>127;)e[r++]=n.lo&127|128,n.lo=n.lo>>>7;e[r++]=n.lo}ke.prototype.uint64=function(e){var r=yi.from(e);return this._push(fu,r.length(),r)};ke.prototype.int64=ke.prototype.uint64;ke.prototype.sint64=function(e){var r=yi.from(e).zzEncode();return this._push(fu,r.length(),r)};ke.prototype.bool=function(e){return this._push(lu,1,e?1:0)};function su(n,e,r){e[r]=n&255,e[r+1]=n>>>8&255,e[r+2]=n>>>16&255,e[r+3]=n>>>24}ke.prototype.fixed32=function(e){return this._push(su,4,e>>>0)};ke.prototype.sfixed32=ke.prototype.fixed32;ke.prototype.fixed64=function(e){var r=yi.from(e);return this._push(su,4,r.lo)._push(su,4,r.hi)};ke.prototype.sfixed64=ke.prototype.fixed64;ke.prototype.float=function(e){return this._push(kt.float.writeFloatLE,4,e)};ke.prototype.double=function(e){return this._push(kt.float.writeDoubleLE,8,e)};var T2=kt.Array.prototype.set?function(e,r,t){r.set(e,t)}:function(e,r,t){for(var o=0;o<e.length;++o)r[t+o]=e[o]};ke.prototype.bytes=function(e){var r=e.length>>>0;if(!r)return this._push(lu,1,0);if(kt.isString(e)){var t=ke.alloc(r=yp.length(e));yp.decode(e,t,0),e=t}return this.uint32(r)._push(T2,r,e)};ke.prototype.string=function(e){var r=_p.length(e);return r?this.uint32(r)._push(_p.write,r,e):this._push(lu,1,0)};ke.prototype.fork=function(){return this.states=new _2(this),this.head=this.tail=new To(uu,0,0),this.len=0,this};ke.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new To(uu,0,0),this.len=0),this};ke.prototype.ldelim=function(){var e=this.head,r=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=r,this.len+=t),this};ke.prototype.finish=function(){for(var e=this.head.next,r=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,r,t),t+=e.len,e=e.next;return r};ke._configure=function(n){au=n,ke.create=xp(),au._configure()}});var Ip=nt((LE,vp)=>{"use strict";vp.exports=er;var wp=du();(er.prototype=Object.create(wp.prototype)).constructor=er;var Er=Cr();function er(){wp.call(this)}er._configure=function(){er.alloc=Er._Buffer_allocUnsafe,er.writeBytesBuffer=Er.Buffer&&Er.Buffer.prototype instanceof Uint8Array&&Er.Buffer.prototype.set.name==="set"?function(e,r,t){r.set(e,t)}:function(e,r,t){if(e.copy)e.copy(r,t,0,e.length);else for(var o=0;o<e.length;)r[t++]=e[o++]}};er.prototype.bytes=function(e){Er.isString(e)&&(e=Er._Buffer_from(e,"base64"));var r=e.length>>>0;return this.uint32(r),r&&this._push(er.writeBytesBuffer,r,e),this};function w2(n,e,r){n.length<40?Er.utf8.write(n,e,r):e.utf8Write?e.utf8Write(n,r):e.write(n,r)}er.prototype.string=function(e){var r=Er.Buffer.byteLength(e);return this.uint32(r),r&&this._push(w2,r,e),this};er._configure()});var hu=nt((ME,Pp)=>{"use strict";Pp.exports=Qe;var Ut=Cr(),mu,Ap=Ut.LongBits,v2=Ut.utf8;function Gt(n,e){return RangeError("index out of range: "+n.pos+" + "+(e||1)+" > "+n.len)}function Qe(n){this.buf=n,this.pos=0,this.len=n.length}var Sp=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Qe(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Qe(e);throw Error("illegal buffer")},Op=function(){return Ut.Buffer?function(r){return(Qe.create=function(o){return Ut.Buffer.isBuffer(o)?new mu(o):Sp(o)})(r)}:Sp};Qe.create=Op();Qe.prototype._slice=Ut.Array.prototype.subarray||Ut.Array.prototype.slice;Qe.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,Gt(this,10);return e}}();Qe.prototype.int32=function(){return this.uint32()|0};Qe.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function pu(){var n=new Ap(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n;if(n.lo=(n.lo|(this.buf[this.pos]&127)<<28)>>>0,n.hi=(n.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return n;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw Gt(this);if(n.lo=(n.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return n}return n.lo=(n.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,n}if(this.len-this.pos>4){for(;e<5;++e)if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}else for(;e<5;++e){if(this.pos>=this.len)throw Gt(this);if(n.hi=(n.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return n}throw Error("invalid varint encoding")}Qe.prototype.bool=function(){return this.uint32()!==0};function _i(n,e){return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0}Qe.prototype.fixed32=function(){if(this.pos+4>this.len)throw Gt(this,4);return _i(this.buf,this.pos+=4)};Qe.prototype.sfixed32=function(){if(this.pos+4>this.len)throw Gt(this,4);return _i(this.buf,this.pos+=4)|0};function $p(){if(this.pos+8>this.len)throw Gt(this,8);return new Ap(_i(this.buf,this.pos+=4),_i(this.buf,this.pos+=4))}Qe.prototype.float=function(){if(this.pos+4>this.len)throw Gt(this,4);var e=Ut.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Qe.prototype.double=function(){if(this.pos+8>this.len)throw Gt(this,4);var e=Ut.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Qe.prototype.bytes=function(){var e=this.uint32(),r=this.pos,t=this.pos+e;if(t>this.len)throw Gt(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(r,t);if(r===t){var o=Ut.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,r,t)};Qe.prototype.string=function(){var e=this.bytes();return v2.read(e,0,e.length)};Qe.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw Gt(this,e);this.pos+=e}else do if(this.pos>=this.len)throw Gt(this);while(this.buf[this.pos++]&128);return this};Qe.prototype.skipType=function(n){switch(n){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(n=this.uint32()&7)!==4;)this.skipType(n);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+n+" at offset "+this.pos)}return this};Qe._configure=function(n){mu=n,Qe.create=Op(),mu._configure();var e=Ut.Long?"toLong":"toNumber";Ut.merge(Qe.prototype,{int64:function(){return pu.call(this)[e](!1)},uint64:function(){return pu.call(this)[e](!0)},sint64:function(){return pu.call(this).zzDecode()[e](!1)},fixed64:function(){return $p.call(this)[e](!0)},sfixed64:function(){return $p.call(this)[e](!1)}})}});var Dp=nt((VE,kp)=>{"use strict";kp.exports=Jr;var Ep=hu();(Jr.prototype=Object.create(Ep.prototype)).constructor=Jr;var Cp=Cr();function Jr(n){Ep.call(this,n)}Jr._configure=function(){Cp.Buffer&&(Jr.prototype._slice=Cp.Buffer.prototype.slice)};Jr.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};Jr._configure()});var Np=nt((FE,Bp)=>{"use strict";Bp.exports=wo;var bu=Cr();(wo.prototype=Object.create(bu.EventEmitter.prototype)).constructor=wo;function wo(n,e,r){if(typeof n!="function")throw TypeError("rpcImpl must be a function");bu.EventEmitter.call(this),this.rpcImpl=n,this.requestDelimited=!!e,this.responseDelimited=!!r}wo.prototype.rpcCall=function n(e,r,t,o,i){if(!o)throw TypeError("request must be specified");var a=this;if(!i)return bu.asPromise(n,a,e,r,t,o);if(!a.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return a.rpcImpl(e,r[a.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,c){if(u)return a.emit("error",u,e),i(u);if(c===null){a.end(!0);return}if(!(c instanceof t))try{c=t[a.responseDelimited?"decodeDelimited":"decode"](c)}catch(f){return a.emit("error",f,e),i(f)}return a.emit("data",c,e),i(null,c)})}catch(s){a.emit("error",s,e),setTimeout(function(){i(s)},0);return}};wo.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var zp=nt(Rp=>{"use strict";var I2=Rp;I2.Service=Np()});var Mp=nt((GE,Lp)=>{"use strict";Lp.exports={}});var Up=nt(Fp=>{"use strict";var _t=Fp;_t.build="minimal";_t.Writer=du();_t.BufferWriter=Ip();_t.Reader=hu();_t.BufferReader=Dp();_t.util=Cr();_t.rpc=zp();_t.roots=Mp();_t.configure=Vp;function Vp(){_t.util._configure(),_t.Writer._configure(_t.BufferWriter),_t.Reader._configure(_t.BufferReader)}Vp()});var Wp=nt((HE,Gp)=>{"use strict";Gp.exports=Up()});var $n=nt((qE,Hp)=>{"use strict";var He=Wp(),j=He.Reader,et=He.Writer,C=He.util,$=He.roots.default||(He.roots.default={});$.onnx=function(){var n={};return n.Version=function(){var e={},r=Object.create(e);return r[e[0]="_START_VERSION"]=0,r[e[1]="IR_VERSION_2017_10_10"]=1,r[e[2]="IR_VERSION_2017_10_30"]=2,r[e[3]="IR_VERSION_2017_11_3"]=3,r[e[4]="IR_VERSION_2019_1_22"]=4,r[e[5]="IR_VERSION_2019_3_18"]=5,r[e[6]="IR_VERSION_2019_9_19"]=6,r[e[7]="IR_VERSION_2020_5_8"]=7,r[e[8]="IR_VERSION_2021_7_30"]=8,r[e[9]="IR_VERSION"]=9,r}(),n.AttributeProto=function(){function e(r){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=C.Long?C.Long.fromBits(0,0,!1):0,e.prototype.s=C.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=C.emptyArray,e.prototype.ints=C.emptyArray,e.prototype.strings=C.emptyArray,e.prototype.tensors=C.emptyArray,e.prototype.graphs=C.emptyArray,e.prototype.sparseTensors=C.emptyArray,e.prototype.typeProtos=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&$.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&$.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)$.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)$.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&$.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)$.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&$.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)$.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.AttributeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 21:{a.refAttrName=t.string();break}case 13:{a.docString=t.string();break}case 20:{a.type=t.int32();break}case 2:{a.f=t.float();break}case 3:{a.i=t.int64();break}case 4:{a.s=t.bytes();break}case 5:{a.t=$.onnx.TensorProto.decode(t,t.uint32());break}case 6:{a.g=$.onnx.GraphProto.decode(t,t.uint32());break}case 22:{a.sparseTensor=$.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{a.tp=$.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(a.floats&&a.floats.length||(a.floats=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floats.push(t.float());else a.floats.push(t.float());break}case 8:{if(a.ints&&a.ints.length||(a.ints=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.ints.push(t.int64());else a.ints.push(t.int64());break}case 9:{a.strings&&a.strings.length||(a.strings=[]),a.strings.push(t.bytes());break}case 10:{a.tensors&&a.tensors.length||(a.tensors=[]),a.tensors.push($.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{a.graphs&&a.graphs.length||(a.graphs=[]),a.graphs.push($.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{a.sparseTensors&&a.sparseTensors.length||(a.sparseTensors=[]),a.sparseTensors.push($.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{a.typeProtos&&a.typeProtos.length||(a.typeProtos=[]),a.typeProtos.push($.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!C.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!C.isInteger(t.i)&&!(t.i&&C.isInteger(t.i.low)&&C.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||C.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=$.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=$.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=$.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=$.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!C.isInteger(t.ints[i])&&!(t.ints[i]&&C.isInteger(t.ints[i].low)&&C.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||C.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=$.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=$.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=$.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=$.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof $.onnx.AttributeProto)return t;var o=new $.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(C.Long?(o.i=C.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new C.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?C.base64.decode(t.s,o.s=C.newBuffer(C.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=$.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=$.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=$.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=$.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)C.Long?(o.ints[i]=C.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new C.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?C.base64.decode(t.strings[i],o.strings[i]=C.newBuffer(C.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=$.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=$.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=$.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=$.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,C.Long){var a=new C.Long(0,0,!1);i.i=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=C.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?C.Long.prototype.toString.call(t.i):o.longs===Number?new C.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?C.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=$.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=$.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var s=0;s<t.floats.length;++s)i.floats[s]=o.json&&!isFinite(t.floats[s])?String(t.floats[s]):t.floats[s]}if(t.ints&&t.ints.length){i.ints=[];for(var s=0;s<t.ints.length;++s)typeof t.ints[s]=="number"?i.ints[s]=o.longs===String?String(t.ints[s]):t.ints[s]:i.ints[s]=o.longs===String?C.Long.prototype.toString.call(t.ints[s]):o.longs===Number?new C.LongBits(t.ints[s].low>>>0,t.ints[s].high>>>0).toNumber():t.ints[s]}if(t.strings&&t.strings.length){i.strings=[];for(var s=0;s<t.strings.length;++s)i.strings[s]=o.bytes===String?C.base64.encode(t.strings[s],0,t.strings[s].length):o.bytes===Array?Array.prototype.slice.call(t.strings[s]):t.strings[s]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var s=0;s<t.tensors.length;++s)i.tensors[s]=$.onnx.TensorProto.toObject(t.tensors[s],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var s=0;s<t.graphs.length;++s)i.graphs[s]=$.onnx.GraphProto.toObject(t.graphs[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=$.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var s=0;s<t.typeProtos.length;++s)i.typeProtos[s]=$.onnx.TypeProto.toObject(t.typeProtos[s],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?$.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:$.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=$.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var s=0;s<t.sparseTensors.length;++s)i.sparseTensors[s]=$.onnx.SparseTensorProto.toObject(t.sparseTensors[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="INT"]=2,t[r[3]="STRING"]=3,t[r[4]="TENSOR"]=4,t[r[5]="GRAPH"]=5,t[r[11]="SPARSE_TENSOR"]=11,t[r[13]="TYPE_PROTO"]=13,t[r[6]="FLOATS"]=6,t[r[7]="INTS"]=7,t[r[8]="STRINGS"]=8,t[r[9]="TENSORS"]=9,t[r[10]="GRAPHS"]=10,t[r[12]="SPARSE_TENSORS"]=12,t[r[14]="TYPE_PROTOS"]=14,t}(),e}(),n.ValueInfoProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=et.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&$.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.ValueInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 2:{a.type=$.onnx.TypeProto.decode(t,t.uint32());break}case 3:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=$.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.ValueInfoProto)return t;var o=new $.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=$.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=$.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),n.NodeProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.input=C.emptyArray,e.prototype.output=C.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=C.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)$.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.NodeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 2:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 3:{a.name=t.string();break}case 4:{a.opType=t.string();break}case 7:{a.domain=t.string();break}case 5:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push($.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{a.docString=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!C.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!C.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!C.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=$.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.NodeProto)return t;var o=new $.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=$.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=$.onnx.AttributeProto.toObject(t.attribute[a],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),n.TrainingInfoProto=function(){function e(r){if(this.initializationBinding=[],this.updateBinding=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=C.emptyArray,e.prototype.updateBinding=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&$.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&$.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)$.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)$.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TrainingInfoProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.initialization=$.onnx.GraphProto.decode(t,t.uint32());break}case 2:{a.algorithm=$.onnx.GraphProto.decode(t,t.uint32());break}case 3:{a.initializationBinding&&a.initializationBinding.length||(a.initializationBinding=[]),a.initializationBinding.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{a.updateBinding&&a.updateBinding.length||(a.updateBinding=[]),a.updateBinding.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=$.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=$.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=$.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=$.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TrainingInfoProto)return t;var o=new $.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=$.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=$.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=$.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=$.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=$.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=$.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var a=0;a<t.initializationBinding.length;++a)i.initializationBinding[a]=$.onnx.StringStringEntryProto.toObject(t.initializationBinding[a],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var a=0;a<t.updateBinding.length;++a)i.updateBinding[a]=$.onnx.StringStringEntryProto.toObject(t.updateBinding[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),n.ModelProto=function(){function e(r){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.irVersion=C.Long?C.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=C.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=C.Long?C.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=C.emptyArray,e.prototype.trainingInfo=C.emptyArray,e.prototype.functions=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&$.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)$.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)$.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)$.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)$.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.ModelProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.irVersion=t.int64();break}case 8:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push($.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{a.producerName=t.string();break}case 3:{a.producerVersion=t.string();break}case 4:{a.domain=t.string();break}case 5:{a.modelVersion=t.int64();break}case 6:{a.docString=t.string();break}case 7:{a.graph=$.onnx.GraphProto.decode(t,t.uint32());break}case 14:{a.metadataProps&&a.metadataProps.length||(a.metadataProps=[]),a.metadataProps.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{a.trainingInfo&&a.trainingInfo.length||(a.trainingInfo=[]),a.trainingInfo.push($.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{a.functions&&a.functions.length||(a.functions=[]),a.functions.push($.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!C.isInteger(t.irVersion)&&!(t.irVersion&&C.isInteger(t.irVersion.low)&&C.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=$.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!C.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!C.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!C.isInteger(t.modelVersion)&&!(t.modelVersion&&C.isInteger(t.modelVersion.low)&&C.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=$.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=$.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=$.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.ModelProto)return t;var o=new $.onnx.ModelProto;if(t.irVersion!=null&&(C.Long?(o.irVersion=C.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new C.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=$.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(C.Long?(o.modelVersion=C.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new C.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=$.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=$.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=$.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=$.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(C.Long){var a=new C.Long(0,0,!1);i.irVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",C.Long){var a=new C.Long(0,0,!1);i.modelVersion=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?C.Long.prototype.toString.call(t.irVersion):o.longs===Number?new C.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?C.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new C.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=$.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=$.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var s=0;s<t.metadataProps.length;++s)i.metadataProps[s]=$.onnx.StringStringEntryProto.toObject(t.metadataProps[s],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var s=0;s<t.trainingInfo.length;++s)i.trainingInfo[s]=$.onnx.TrainingInfoProto.toObject(t.trainingInfo[s],o)}if(t.functions&&t.functions.length){i.functions=[];for(var s=0;s<t.functions.length;++s)i.functions[s]=$.onnx.FunctionProto.toObject(t.functions[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),n.StringStringEntryProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=et.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.StringStringEntryProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.key=t.string();break}case 2:{a.value=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!C.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!C.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.StringStringEntryProto)return t;var o=new $.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),n.TensorAnnotation=function(){function e(r){if(this.quantParameterTensorNames=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)$.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorAnnotation;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.tensorName=t.string();break}case 2:{a.quantParameterTensorNames&&a.quantParameterTensorNames.length||(a.quantParameterTensorNames=[]),a.quantParameterTensorNames.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!C.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorAnnotation)return t;var o=new $.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=$.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var a=0;a<t.quantParameterTensorNames.length;++a)i.quantParameterTensorNames[a]=$.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),n.GraphProto=function(){function e(r){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.node=C.emptyArray,e.prototype.name="",e.prototype.initializer=C.emptyArray,e.prototype.sparseInitializer=C.emptyArray,e.prototype.docString="",e.prototype.input=C.emptyArray,e.prototype.output=C.emptyArray,e.prototype.valueInfo=C.emptyArray,e.prototype.quantizationAnnotation=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)$.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)$.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)$.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)$.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)$.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)$.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)$.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.GraphProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.node&&a.node.length||(a.node=[]),a.node.push($.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{a.name=t.string();break}case 5:{a.initializer&&a.initializer.length||(a.initializer=[]),a.initializer.push($.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{a.sparseInitializer&&a.sparseInitializer.length||(a.sparseInitializer=[]),a.sparseInitializer.push($.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{a.docString=t.string();break}case 11:{a.input&&a.input.length||(a.input=[]),a.input.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{a.output&&a.output.length||(a.output=[]),a.output.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{a.valueInfo&&a.valueInfo.length||(a.valueInfo=[]),a.valueInfo.push($.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{a.quantizationAnnotation&&a.quantizationAnnotation.length||(a.quantizationAnnotation=[]),a.quantizationAnnotation.push($.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=$.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=$.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=$.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=$.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=$.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=$.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=$.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.GraphProto)return t;var o=new $.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=$.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=$.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=$.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=$.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=$.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=$.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=$.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=$.onnx.NodeProto.toObject(t.node[a],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var a=0;a<t.initializer.length;++a)i.initializer[a]=$.onnx.TensorProto.toObject(t.initializer[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=$.onnx.ValueInfoProto.toObject(t.input[a],o)}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=$.onnx.ValueInfoProto.toObject(t.output[a],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var a=0;a<t.valueInfo.length;++a)i.valueInfo[a]=$.onnx.ValueInfoProto.toObject(t.valueInfo[a],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var a=0;a<t.quantizationAnnotation.length;++a)i.quantizationAnnotation[a]=$.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[a],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var a=0;a<t.sparseInitializer.length;++a)i.sparseInitializer[a]=$.onnx.SparseTensorProto.toObject(t.sparseInitializer[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),n.TensorProto=function(){function e(r){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dims=C.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=C.emptyArray,e.prototype.int32Data=C.emptyArray,e.prototype.stringData=C.emptyArray,e.prototype.int64Data=C.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=C.newBuffer([]),e.prototype.externalData=C.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=C.emptyArray,e.prototype.uint64Data=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&$.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)$.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}case 2:{a.dataType=t.int32();break}case 3:{a.segment=$.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(a.floatData&&a.floatData.length||(a.floatData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.floatData.push(t.float());else a.floatData.push(t.float());break}case 5:{if(a.int32Data&&a.int32Data.length||(a.int32Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int32Data.push(t.int32());else a.int32Data.push(t.int32());break}case 6:{a.stringData&&a.stringData.length||(a.stringData=[]),a.stringData.push(t.bytes());break}case 7:{if(a.int64Data&&a.int64Data.length||(a.int64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.int64Data.push(t.int64());else a.int64Data.push(t.int64());break}case 8:{a.name=t.string();break}case 12:{a.docString=t.string();break}case 9:{a.rawData=t.bytes();break}case 13:{a.externalData&&a.externalData.length||(a.externalData=[]),a.externalData.push($.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{a.dataLocation=t.int32();break}case 10:{if(a.doubleData&&a.doubleData.length||(a.doubleData=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.doubleData.push(t.double());else a.doubleData.push(t.double());break}case 11:{if(a.uint64Data&&a.uint64Data.length||(a.uint64Data=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.uint64Data.push(t.uint64());else a.uint64Data.push(t.uint64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!C.isInteger(t.dims[o])&&!(t.dims[o]&&C.isInteger(t.dims[o].low)&&C.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!C.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=$.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!C.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||C.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!C.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&C.isInteger(t.int64Data[o].low)&&C.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||C.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=$.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!C.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&C.isInteger(t.uint64Data[o].low)&&C.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorProto)return t;var o=new $.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)C.Long?(o.dims[i]=C.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new C.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=$.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?C.base64.decode(t.stringData[i],o.stringData[i]=C.newBuffer(C.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)C.Long?(o.int64Data[i]=C.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new C.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?C.base64.decode(t.rawData,o.rawData=C.newBuffer(C.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=$.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)C.Long?(o.uint64Data[i]=C.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new C.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=C.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?C.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new C.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=$.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var a=0;a<t.floatData.length;++a)i.floatData[a]=o.json&&!isFinite(t.floatData[a])?String(t.floatData[a]):t.floatData[a]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var a=0;a<t.int32Data.length;++a)i.int32Data[a]=t.int32Data[a]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var a=0;a<t.stringData.length;++a)i.stringData[a]=o.bytes===String?C.base64.encode(t.stringData[a],0,t.stringData[a].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[a]):t.stringData[a]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var a=0;a<t.int64Data.length;++a)typeof t.int64Data[a]=="number"?i.int64Data[a]=o.longs===String?String(t.int64Data[a]):t.int64Data[a]:i.int64Data[a]=o.longs===String?C.Long.prototype.toString.call(t.int64Data[a]):o.longs===Number?new C.LongBits(t.int64Data[a].low>>>0,t.int64Data[a].high>>>0).toNumber():t.int64Data[a]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?C.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var a=0;a<t.doubleData.length;++a)i.doubleData[a]=o.json&&!isFinite(t.doubleData[a])?String(t.doubleData[a]):t.doubleData[a]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var a=0;a<t.uint64Data.length;++a)typeof t.uint64Data[a]=="number"?i.uint64Data[a]=o.longs===String?String(t.uint64Data[a]):t.uint64Data[a]:i.uint64Data[a]=o.longs===String?C.Long.prototype.toString.call(t.uint64Data[a]):o.longs===Number?new C.LongBits(t.uint64Data[a].low>>>0,t.uint64Data[a].high>>>0).toNumber(!0):t.uint64Data[a]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var a=0;a<t.externalData.length;++a)i.externalData[a]=$.onnx.StringStringEntryProto.toObject(t.externalData[a],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?$.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:$.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var r={},t=Object.create(r);return t[r[0]="UNDEFINED"]=0,t[r[1]="FLOAT"]=1,t[r[2]="UINT8"]=2,t[r[3]="INT8"]=3,t[r[4]="UINT16"]=4,t[r[5]="INT16"]=5,t[r[6]="INT32"]=6,t[r[7]="INT64"]=7,t[r[8]="STRING"]=8,t[r[9]="BOOL"]=9,t[r[10]="FLOAT16"]=10,t[r[11]="DOUBLE"]=11,t[r[12]="UINT32"]=12,t[r[13]="UINT64"]=13,t[r[14]="COMPLEX64"]=14,t[r[15]="COMPLEX128"]=15,t[r[16]="BFLOAT16"]=16,t[r[17]="FLOAT8E4M3FN"]=17,t[r[18]="FLOAT8E4M3FNUZ"]=18,t[r[19]="FLOAT8E5M2"]=19,t[r[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function r(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return r.prototype.begin=C.Long?C.Long.fromBits(0,0,!1):0,r.prototype.end=C.Long?C.Long.fromBits(0,0,!1):0,r.create=function(o){return new r(o)},r.encode=function(o,i){return i||(i=et.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},r.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},r.decode=function(o,i){o instanceof j||(o=j.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new $.onnx.TensorProto.Segment;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.begin=o.int64();break}case 2:{s.end=o.int64();break}default:o.skipType(u&7);break}}return s},r.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},r.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!C.isInteger(o.begin)&&!(o.begin&&C.isInteger(o.begin.low)&&C.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!C.isInteger(o.end)&&!(o.end&&C.isInteger(o.end.low)&&C.isInteger(o.end.high))?"end: integer|Long expected":null},r.fromObject=function(o){if(o instanceof $.onnx.TensorProto.Segment)return o;var i=new $.onnx.TensorProto.Segment;return o.begin!=null&&(C.Long?(i.begin=C.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new C.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(C.Long?(i.end=C.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new C.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},r.toObject=function(o,i){i||(i={});var a={};if(i.defaults){if(C.Long){var s=new C.Long(0,0,!1);a.begin=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.begin=i.longs===String?"0":0;if(C.Long){var s=new C.Long(0,0,!1);a.end=i.longs===String?s.toString():i.longs===Number?s.toNumber():s}else a.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?a.begin=i.longs===String?String(o.begin):o.begin:a.begin=i.longs===String?C.Long.prototype.toString.call(o.begin):i.longs===Number?new C.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?a.end=i.longs===String?String(o.end):o.end:a.end=i.longs===String?C.Long.prototype.toString.call(o.end):i.longs===Number?new C.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),a},r.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},r.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},r}(),e.DataLocation=function(){var r={},t=Object.create(r);return t[r[0]="DEFAULT"]=0,t[r[1]="EXTERNAL"]=1,t}(),e}(),n.SparseTensorProto=function(){function e(r){if(this.dims=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&$.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&$.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.SparseTensorProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.values=$.onnx.TensorProto.decode(t,t.uint32());break}case 2:{a.indices=$.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(a.dims&&a.dims.length||(a.dims=[]),(s&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)a.dims.push(t.int64());else a.dims.push(t.int64());break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=$.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=$.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!C.isInteger(t.dims[i])&&!(t.dims[i]&&C.isInteger(t.dims[i].low)&&C.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof $.onnx.SparseTensorProto)return t;var o=new $.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=$.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=$.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)C.Long?(o.dims[i]=C.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new C.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=$.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=$.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var a=0;a<t.dims.length;++a)typeof t.dims[a]=="number"?i.dims[a]=o.longs===String?String(t.dims[a]):t.dims[a]:i.dims[a]=o.longs===String?C.Long.prototype.toString.call(t.dims[a]):o.longs===Number?new C.LongBits(t.dims[a].low>>>0,t.dims[a].high>>>0).toNumber():t.dims[a]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),n.TensorShapeProto=function(){function e(r){if(this.dim=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.dim=C.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)$.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.TensorShapeProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.dim&&a.dim.length||(a.dim=[]),a.dim.push($.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=$.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof $.onnx.TensorShapeProto)return t;var o=new $.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=$.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var a=0;a<t.dim.length;++a)i.dim[a]=$.onnx.TensorShapeProto.Dimension.toObject(t.dim[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function r(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}r.prototype.dimValue=null,r.prototype.dimParam=null,r.prototype.denotation="";var t;return Object.defineProperty(r.prototype,"value",{get:C.oneOfGetter(t=["dimValue","dimParam"]),set:C.oneOfSetter(t)}),r.create=function(i){return new r(i)},r.encode=function(i,a){return a||(a=et.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&a.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&a.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&a.uint32(26).string(i.denotation),a},r.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},r.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TensorShapeProto.Dimension;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(c&7);break}}return u},r.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},r.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var a={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(a.value=1,!C.isInteger(i.dimValue)&&!(i.dimValue&&C.isInteger(i.dimValue.low)&&C.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(a.value===1)return"value: multiple values";if(a.value=1,!C.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!C.isString(i.denotation)?"denotation: string expected":null},r.fromObject=function(i){if(i instanceof $.onnx.TensorShapeProto.Dimension)return i;var a=new $.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(C.Long?(a.dimValue=C.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?a.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?a.dimValue=i.dimValue:typeof i.dimValue=="object"&&(a.dimValue=new C.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(a.dimParam=String(i.dimParam)),i.denotation!=null&&(a.denotation=String(i.denotation)),a},r.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?s.dimValue=a.longs===String?String(i.dimValue):i.dimValue:s.dimValue=a.longs===String?C.Long.prototype.toString.call(i.dimValue):a.longs===Number?new C.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,a.oneofs&&(s.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(s.dimParam=i.dimParam,a.oneofs&&(s.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(s.denotation=i.denotation),s},r.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},r.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},r}(),e}(),n.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var r;return Object.defineProperty(e.prototype,"value",{get:C.oneOfGetter(r=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:C.oneOfSetter(r)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=et.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&$.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&$.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&$.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&$.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&$.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof j||(o=j.create(o));for(var a=i===void 0?o.len:o.pos+i,s=new $.onnx.TypeProto;o.pos<a;){var u=o.uint32();switch(u>>>3){case 1:{s.tensorType=$.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{s.sequenceType=$.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{s.mapType=$.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{s.optionalType=$.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{s.sparseTensorType=$.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{s.denotation=o.string();break}default:o.skipType(u&7);break}}return s},e.decodeDelimited=function(o){return o instanceof j||(o=new j(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var a=$.onnx.TypeProto.Tensor.verify(o.tensorType);if(a)return"tensorType."+a}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Sequence.verify(o.sequenceType);if(a)return"sequenceType."+a}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Map.verify(o.mapType);if(a)return"mapType."+a}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.Optional.verify(o.optionalType);if(a)return"optionalType."+a}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var a=$.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(a)return"sparseTensorType."+a}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!C.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof $.onnx.TypeProto)return o;var i=new $.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=$.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=$.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=$.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=$.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=$.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var a={};return i.defaults&&(a.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(a.tensorType=$.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(a.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(a.sequenceType=$.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(a.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(a.mapType=$.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(a.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(a.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(a.sparseTensorType=$.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(a.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(a.optionalType=$.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(a.value="optionalType")),a},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&$.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Tensor;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=$.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!C.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=$.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Tensor)return i;var a=new $.onnx.TypeProto.Tensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");a.shape=$.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=$.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&$.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Sequence;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=$.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Sequence)return i;var a=new $.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");a.elemType=$.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=$.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&a.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&$.onnx.TypeProto.encode(i.valueType,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Map;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!C.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var a=$.onnx.TypeProto.verify(i.valueType);if(a)return"valueType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Map)return i;var a=new $.onnx.TypeProto.Map;if(i.keyType!=null&&(a.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");a.valueType=$.onnx.TypeProto.fromObject(i.valueType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.keyType=0,s.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(s.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(s.valueType=$.onnx.TypeProto.toObject(i.valueType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&$.onnx.TypeProto.encode(i.elemType,a.uint32(10).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.Optional;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=$.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var a=$.onnx.TypeProto.verify(i.elemType);if(a)return"elemType."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.Optional)return i;var a=new $.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");a.elemType=$.onnx.TypeProto.fromObject(i.elemType)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=$.onnx.TypeProto.toObject(i.elemType,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),a=0;a<i.length;++a)o[i[a]]!=null&&(this[i[a]]=o[i[a]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,a){return a||(a=et.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&a.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&$.onnx.TensorShapeProto.encode(i.shape,a.uint32(18).fork()).ldelim(),a},t.encodeDelimited=function(i,a){return this.encode(i,a).ldelim()},t.decode=function(i,a){i instanceof j||(i=j.create(i));for(var s=a===void 0?i.len:i.pos+a,u=new $.onnx.TypeProto.SparseTensor;i.pos<s;){var c=i.uint32();switch(c>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=$.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(c&7);break}}return u},t.decodeDelimited=function(i){return i instanceof j||(i=new j(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!C.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var a=$.onnx.TensorShapeProto.verify(i.shape);if(a)return"shape."+a}return null},t.fromObject=function(i){if(i instanceof $.onnx.TypeProto.SparseTensor)return i;var a=new $.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(a.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");a.shape=$.onnx.TensorShapeProto.fromObject(i.shape)}return a},t.toObject=function(i,a){a||(a={});var s={};return a.defaults&&(s.elemType=0,s.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(s.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(s.shape=$.onnx.TensorShapeProto.toObject(i.shape,a)),s},t.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),n.OperatorSetIdProto=function(){function e(r){if(r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.domain="",e.prototype.version=C.Long?C.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=et.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.OperatorSetIdProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.domain=t.string();break}case 2:{a.version=t.int64();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!C.isInteger(t.version)&&!(t.version&&C.isInteger(t.version.low)&&C.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof $.onnx.OperatorSetIdProto)return t;var o=new $.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(C.Long?(o.version=C.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new C.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",C.Long){var a=new C.Long(0,0,!1);i.version=o.longs===String?a.toString():o.longs===Number?a.toNumber():a}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?C.Long.prototype.toString.call(t.version):o.longs===Number?new C.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),n.OperatorStatus=function(){var e={},r=Object.create(e);return r[e[0]="EXPERIMENTAL"]=0,r[e[1]="STABLE"]=1,r}(),n.FunctionProto=function(){function e(r){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],r)for(var t=Object.keys(r),o=0;o<t.length;++o)r[t[o]]!=null&&(this[t[o]]=r[t[o]])}return e.prototype.name="",e.prototype.input=C.emptyArray,e.prototype.output=C.emptyArray,e.prototype.attribute=C.emptyArray,e.prototype.attributeProto=C.emptyArray,e.prototype.node=C.emptyArray,e.prototype.docString="",e.prototype.opsetImport=C.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=et.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)$.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)$.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)$.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof j||(t=j.create(t));for(var i=o===void 0?t.len:t.pos+o,a=new $.onnx.FunctionProto;t.pos<i;){var s=t.uint32();switch(s>>>3){case 1:{a.name=t.string();break}case 4:{a.input&&a.input.length||(a.input=[]),a.input.push(t.string());break}case 5:{a.output&&a.output.length||(a.output=[]),a.output.push(t.string());break}case 6:{a.attribute&&a.attribute.length||(a.attribute=[]),a.attribute.push(t.string());break}case 11:{a.attributeProto&&a.attributeProto.length||(a.attributeProto=[]),a.attributeProto.push($.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{a.node&&a.node.length||(a.node=[]),a.node.push($.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{a.docString=t.string();break}case 9:{a.opsetImport&&a.opsetImport.length||(a.opsetImport=[]),a.opsetImport.push($.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{a.domain=t.string();break}default:t.skipType(s&7);break}}return a},e.decodeDelimited=function(t){return t instanceof j||(t=new j(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!C.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!C.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!C.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!C.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=$.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=$.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!C.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=$.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!C.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof $.onnx.FunctionProto)return t;var o=new $.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=$.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=$.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=$.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var a=0;a<t.input.length;++a)i.input[a]=t.input[a]}if(t.output&&t.output.length){i.output=[];for(var a=0;a<t.output.length;++a)i.output[a]=t.output[a]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var a=0;a<t.attribute.length;++a)i.attribute[a]=t.attribute[a]}if(t.node&&t.node.length){i.node=[];for(var a=0;a<t.node.length;++a)i.node[a]=$.onnx.NodeProto.toObject(t.node[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=$.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var a=0;a<t.attributeProto.length;++a)i.attributeProto[a]=$.onnx.AttributeProto.toObject(t.attributeProto[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,He.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),n}();Hp.exports=$});function An(n,e){if(!n)throw new Error(typeof e=="string"?e:e())}function Io(n){return new TextDecoder().decode(n)}var qe,Yr,gu,ht,xi,dt,xt,ne,vo,Qr,en,tn,ze=E(()=>{"use strict";vs();qe=yn($n());rn();Yr=class{static arraysEqual(e,r){if(e.length!==r.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==r[t])return!1;return!0}},gu=class{static preprocessInputShapes(e,r){let t=e.length===1?[1,e[0]]:e,o=r.length===1?[r[0],1]:r;return[t,o]}static postprocessOutputShape(e,r,t){r===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},ht=class n{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=gu.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let c=o-u<0?1:e[o-u],f=i-u<0?1:r[i-u];if(c!==f&&c>1&&f>1)return;s[a-u]=Math.max(c,f)}return s}static index(e,r){let t=new Array(r.length);return n.fillIndex(e,r,t),t}static fillIndex(e,r,t){let o=e.length-r.length;for(let i=0;i<r.length;i++)t[i]=e[o+i]%r[i]}static calc(e,r,t,o,i){let a=n.calcShape(e.dims,r.dims);if(a){if(o&&!ne.areEqual(a,e.dims))return;let s=ne.size(a),u=o?e:new ot(a,i||e.type);if(a.length===0)u.set([],t(e.get([]),r.get([])));else{let c=new Array(a.length),f=new Array(e.dims.length),p=new Array(r.dims.length),m=0,g=0,y=!1,x=!1;e.dims.length===0&&(m=e.get([]),y=!0),r.dims.length===0&&(g=r.get([]),x=!0);let v;for(let T=0;T<s;T++){v=T;for(let w=a.length-1;w>=0;w--)c[w]=v%a[w],v=Math.floor(v/a[w]);y||(n.fillIndex(c,e.dims,f),m=e.get(f)),x||(n.fillIndex(c,r.dims,p),g=r.get(p)),u.set(c,t(m,g))}}return u}}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}static getBroadcastDims(e,r){let t=e.length,o=[];for(let i=0;i<t;i++){let a=t-1-i,s=e[a]||1;(r[r.length-1-i]||1)>1&&s===1&&o.unshift(a)}return o}},xi=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let c=-1;if(o?(u=t[0],c=1):(u=t[1],c=0),t[c]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!ht.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},dt=class n{static tensorDataTypeFromProto(e){switch(e){case qe.onnx.TensorProto.DataType.INT8:return"int8";case qe.onnx.TensorProto.DataType.UINT8:return"uint8";case qe.onnx.TensorProto.DataType.BOOL:return"bool";case qe.onnx.TensorProto.DataType.INT16:return"int16";case qe.onnx.TensorProto.DataType.UINT16:return"uint16";case qe.onnx.TensorProto.DataType.INT32:return"int32";case qe.onnx.TensorProto.DataType.UINT32:return"uint32";case qe.onnx.TensorProto.DataType.FLOAT:return"float32";case qe.onnx.TensorProto.DataType.DOUBLE:return"float64";case qe.onnx.TensorProto.DataType.STRING:return"string";case qe.onnx.TensorProto.DataType.INT64:return"int32";case qe.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${qe.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return qe.onnx.TensorProto.DataType.INT8;case"uint8":return qe.onnx.TensorProto.DataType.UINT8;case"bool":return qe.onnx.TensorProto.DataType.BOOL;case"int16":return qe.onnx.TensorProto.DataType.INT16;case"uint16":return qe.onnx.TensorProto.DataType.UINT16;case"int32":return qe.onnx.TensorProto.DataType.INT32;case"uint32":return qe.onnx.TensorProto.DataType.UINT32;case"float32":return qe.onnx.TensorProto.DataType.FLOAT;case"float64":return qe.onnx.TensorProto.DataType.DOUBLE;case"string":return qe.onnx.TensorProto.DataType.STRING;case"int64":return qe.onnx.TensorProto.DataType.INT64;case"uint64":return qe.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(r=>Ar.isLong(r)?r.toNumber():r)}static tensorValueTypeFromProto(e){return{tensorType:n.tensorDataTypeFromProto(e.elemType),shape:{dims:n.tensorDimsFromProto(e.shape.dim.map(r=>r.dimValue))}}}static tensorDimsFromORTFormat(e){let r=[];for(let t=0;t<e.dimsLength();t++)r.push(xt.longToNumber(e.dims(t)));return r}static tensorAttributesFromORTFormat(e){let r=[];for(let t=0;t<e.attributesLength();t++)r.push(e.attributes(t));return r}},xt=class{static longToNumber(e){return Ar.isLong(e)?e.toNumber():typeof e=="bigint"?Number(e):e}static isLong(e){return Ar.isLong(e)||typeof e=="bigint"}},ne=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,r,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=r[i]*e[i];return o}static offsetToIndices(e,r){let t=r.length;if(t===0)return[];if(t===1)return[e*r[0]];let o=new Array(r.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/r[i]),e-=o[i]*r[i];return o[o.length-1]=e,o}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r))}static incrementIndex(e,r,t){if(r.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=r.length;else if(t<=0||t>r.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<r[o]));--o)e[o]=0}static calculateReshapedDims(e,r){if(r.length===0){if(e.length===0||n.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=r.length,o=new Array(t),i=-1,a=1;for(let u=0;u<t;u++){if(r[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(r[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(r[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=r[u];a*=o[u]}}let s=n.size(e);if(i!==-1){if(s%a!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${r}]`);o[i]=s/a}else if(a!==s)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let r=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);r*=t}return r}static flattenShape(e,r){r<0&&(r+=e.length);let t=e.reduce((a,s)=>a*s,1),o=e.slice(r).reduce((a,s)=>a*s,1);return[t/o,o]}static squeezeShape(e,r){let t=new Array;r=n.normalizeAxes(r,e.length);for(let o=0;o<e.length;o++){let i=r.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(r.length===0&&e[o]>1||r.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,r){let t=new Array(e.length+r.length);t.fill(0);for(let i=0;i<r.length;i++){let a=n.normalizeAxis(r[i],t.length);if(a>=t.length)throw new Error("'axes' has an out of range axis");if(t[a]!==0)throw new Error("'axes' has a duplicate axis");t[a]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},vo=class n{static splitShape(e,r,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");n.determineSplit(e[r],o,t)}let i=[],a=[0];for(let s=0;s<t.length;++s){s!==0&&a.push(a[s-1]+t[s-1]);let u=e.slice();u[r]=t[s],i.push(u)}return[i,a]}static determineSplit(e,r,t){if(e%r!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<r;++o)t.push(e/r)}},Qr=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let s=0;s<e.length-2;s++)n.adjustPadAndReturnShape(e[s+2],r[s],t[s],o[s],i,s,s+e.length-2,a)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let c=0;c<r.length-2;c++)t.push(1);else for(let c=0;c<r.length-2;c++)t.push(n.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],s,c,c+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),i[s]=p-i[a],Math.floor((e+p-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-c)/r+1)}},en=-34028234663852886e22,tn=34028234663852886e22});function S2(n){switch(n){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${n}`)}}function qp(n){switch(n){case Se.onnx.TensorProto.DataType.UINT8:case Se.onnx.TensorProto.DataType.INT8:case Se.onnx.TensorProto.DataType.BOOL:return 1;case Se.onnx.TensorProto.DataType.UINT16:case Se.onnx.TensorProto.DataType.INT16:return 2;case Se.onnx.TensorProto.DataType.FLOAT:case Se.onnx.TensorProto.DataType.INT32:case Se.onnx.TensorProto.DataType.UINT32:return 4;case Se.onnx.TensorProto.DataType.INT64:case Se.onnx.TensorProto.DataType.DOUBLE:case Se.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${Se.onnx.TensorProto.DataType[n]}`)}}function $2(n,e){return new(Xp(e))(n)}function Xp(n){switch(n){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function yu(n,e){if(e===Se.onnx.TensorProto.DataType.INT64||e===7){if(n.greaterThanOrEqual(2147483648)||n.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===Se.onnx.TensorProto.DataType.UINT32||e===12||e===Se.onnx.TensorProto.DataType.UINT64||e===13){if(n.greaterThanOrEqual(4294967296)||n.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${Se.onnx.TensorProto.DataType[e]}`);return n.toNumber()}function Kp(n,e,r){switch(e){case Se.onnx.TensorProto.DataType.BOOL:case Se.onnx.TensorProto.DataType.UINT8:return n.getUint8(r);case Se.onnx.TensorProto.DataType.INT8:return n.getInt8(r);case Se.onnx.TensorProto.DataType.UINT16:return n.getUint16(r,!0);case Se.onnx.TensorProto.DataType.INT16:return n.getInt16(r,!0);case Se.onnx.TensorProto.DataType.FLOAT:return n.getFloat32(r,!0);case Se.onnx.TensorProto.DataType.INT32:return n.getInt32(r,!0);case Se.onnx.TensorProto.DataType.UINT32:return n.getUint32(r,!0);case Se.onnx.TensorProto.DataType.INT64:return yu(Ar.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!1),e);case Se.onnx.TensorProto.DataType.DOUBLE:return n.getFloat64(r,!0);case Se.onnx.TensorProto.DataType.UINT64:return yu(Ar.fromBits(n.getUint32(r,!0),n.getUint32(r+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${Se.onnx.TensorProto.DataType[e]}`)}}var jp,Se,ot,rn=E(()=>{"use strict";jp=yn(kd());vs();_o();Se=yn($n());ze();ot=class n{constructor(e,r,t,o,i,a=jp.Guid.create()){this.dims=e;this.type=r;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=a;this.size=ne.validateDimsAndCalcSize(e);let s=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==s)throw new RangeError("Input dims doesn't match data length.");if(r==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(c=>typeof c=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(s))}else{if(i!==void 0){let c=Xp(r);if(!(i instanceof c))throw new TypeError(`cache should be type ${c.name}`)}if(u){let c=new ArrayBuffer(s*S2(r));this.cache=$2(c,r)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[ne.indicesToOffset(e,this.strides)]}set(e,r){this.data[ne.indicesToOffset(e,this.strides)]=r}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=ne.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=dt.tensorDataTypeFromProto(e.dataType),t=dt.tensorDimsFromProto(e.dims),o=new n(t,r);if(r==="string")e.stringData.forEach((i,a)=>{o.data[a]=Io(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,a=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),s=qp(e.dataType),u=e.rawData.byteLength/s;if(e.rawData.byteLength%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let c=0;c<u;c++){let f=Kp(a,e.dataType,c*s);i[c]=f}}else{let i;switch(e.dataType){case Se.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case Se.onnx.TensorProto.DataType.INT32:case Se.onnx.TensorProto.DataType.INT16:case Se.onnx.TensorProto.DataType.UINT16:case Se.onnx.TensorProto.DataType.INT8:case Se.onnx.TensorProto.DataType.UINT8:case Se.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case Se.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case Se.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case Se.onnx.TensorProto.DataType.UINT32:case Se.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let a=o.data;if(a.length!==i.length)throw new Error("array length mismatch");for(let s=0;s<i.length;s++){let u=i[s];Ar.isLong(u)?a[s]=yu(u,e.dataType):a[s]=u}}return o}static fromData(e,r,t){return new n(r,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let r=dt.tensorDimsFromORTFormat(e),t=dt.tensorDataTypeFromProto(e.dataType()),o=new n(r,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,a=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),s=qp(e.dataType()),u=e.rawDataLength()/s;if(e.rawDataLength()%s!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let c=0;c<u;c++){let f=Kp(a,e.dataType(),c*s);i[c]=f}}return o}}});function ae(n){return n===1?A2:O2}function Zp(n){let e=ae(n);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Jp(n){let e=ae(n);return`${e.version}
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

    `}function Yp(n,e){let r=ae(n);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${r.output} = result;
  }
  `}var A2,O2,Xe=E(()=>{"use strict";A2={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},O2={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var Oe=E(()=>{"use strict"});async function _u(n,e=t=>0,r){return new Promise((t,o)=>{let i=0,a=()=>{if(n()){t();return}i++;let s=e(i);if(r!=null&&i>=r){o();return}setTimeout(a,s)};a()})}function Ti(n){return An(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)}function Qp(n){return An(typeof n<"u"&&n.length!==0,()=>"empty string found for sampler name"),"get"+n.charAt(0).toUpperCase()+n.slice(1)+"AtOutCoords"}function On(n,e){let r=JSON.parse(JSON.stringify(n));return r=e,r}function Pn(n,e){return e.map(r=>n[r]).join(", ")}function bt(n){if(n<=1)return"int";if(n===2)return"ivec2";if(n===3)return"ivec3";if(n===4)return"ivec4";if(n===5)return"ivec5";if(n===6)return"ivec6";throw Error(`GPU for rank ${n} is not yet supported`)}function Wt(n=6){return["x","y","z","w","u","v"].slice(0,n)}var tr=E(()=>{"use strict";ze()});function P2(n,e){return Wt(e).map(r=>`${n}.${r}`)}function Cn(n,e){return e===1?[n]:P2(n,e)}function rr(){return`
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
  `}var nn=E(()=>{"use strict";tr()});function E2(n,e,r){if(n===0)return"false";if(n===1)return`rc > ${e[0]}`;let t="";for(let o=n-2;o<n;o++)t+=`${r[o]} >= ${e[o-n+2]}`,o<n-1&&(t+="||");return t}function k2(n,e){let r=n.length;if(r===0)return"getA(), 0, 0, 0";if(r===1)return`getA(rc),
            rc + 1 >= ${n[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",a="rp1, cp1",s="";if(r>2)for(let u=0;u<r-2;++u)s=s+`${e[u]},`;return`getA(${s}${t}),
          rEdge ? 0. : getA(${s}${i}),
          cEdge ? 0. : getA(${s}${o}),
          rEdge || cEdge ? 0. : getA(${s}${a})`}function D2(n,e,r,t){return n===0||n===1?"":`
    int r = ${e[n-2]};
    int c = ${e[n-1]};
    int rp1 = ${e[n-2]} + 1;
    int cp1 = ${e[n-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${r};
    `}var em,C2,tm,rm=E(()=>{"use strict";Xe();Oe();tr();nn();em={name:"pack",inputNames:["A"],inputTypes:[1]},C2=(n,e)=>{let r=ae(n.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,a=bt(i),s=Cn("rc",i),u=D2(i,s,t[t.length-2],t[t.length-1]),c;o===0?c=[1,1]:o===1?c=[t[0],1]:c=[t[i-1],t[i-2]];let f=E2(i,c,s),p=k2(t,s),m=`
        void main() {
          ${a} rc = getOutputCoords();

          if(${f}) {
            ${r.output} = vec4(0);
          } else {
            ${u}

            ${r.output} = vec4(${p});
          }
        }
      `;return{...em,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:m}},tm=(n,e)=>({...em,get:()=>C2(n,e)})});function xu(n){if(n.length===0)return[1,1,1];let e=1;for(let r=0;r<n.length-2;++r)e*=n[r];return[e,n.length>1?n[n.length-2]:1,n[n.length-1]]}function om(n,e){let r=!1;return n.length===0||e.length===0?r=!0:n.length<2||e.length<2?r=n[n.length-1]===e[e.length-1]:r=n[n.length-1]===e[e.length-1]&&n[n.length-2]===e[e.length-2],r}function R2(n){let e=ne.computeStrides(n),r=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,a)=>{let s=`int ${r[a]} = ${t} / ${i}`,u=a===e.length-1?`int ${r[a+1]} = ${t} - ${r[a]} * ${i}`:`index -= ${r[a]} * ${i}`;return`${s}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function z2(n){let e=ne.computeStrides(n);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var B2,N2,nm,im=E(()=>{"use strict";ze();Xe();Oe();nn();B2=n=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${n}`}),N2=(n,e,r,t)=>{let o=e.dims,i=t,a="";for(let c=0;c<4;c++){let f="";switch(c){case 0:f="outputCoords = rc;";break;case 1:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:f="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:f="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}a+=`
        ${f}
        ${c>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${c}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${c>0?"}":""}
      `}let s=ae(n.session.backend.glContext.version),u=`
      ${R2(o)}
      ${z2(i)}
      ${rr()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${a}
        ${s.output} = result;
      }
    `;return{...r,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},nm=(n,e,r)=>{let t=B2(r);return{...t,get:()=>N2(n,e,t,r)}}});var Tu,am=E(()=>{"use strict";Xe();Oe();Tu=(n,e)=>{let r=e.shape,t=ae(n.session.backend.glContext.version),o=`
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
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:r,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return n.executeProgram(i,[e.tensor])}});function M2(n,e){if(n===1)return"rc";let r="";for(let t=0;t<n;t++)r+=e[t],t<n-1&&(r+=",");return r}var sm,L2,um,lm=E(()=>{"use strict";Xe();Oe();tr();nn();sm={name:"unpack",inputNames:["A"],inputTypes:[2]},L2=(n,e)=>{let r=e.dims.length,t=Cn("rc",r),o=t.slice(-2),i=bt(r),a=rr(),u=e.dims.length===0?"":M2(r,t),c=r<=1?"rc":`vec2(${o.join(",")})`,f=ae(n.session.backend.glContext.version),p=`
    ${a}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${f.output} = vec4(getChannel(packedInput, ${c}), 0, 0, 0);
     }
   `;return{...sm,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:p}},um=(n,e)=>({...sm,get:()=>L2(n,e)})});var wi,So,vi,$o=E(()=>{"use strict";Pt();wi=class{constructor(e,r=1){if(r===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){let t,o;return e.constructor!==Float32Array&&(Le.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),r*this.channelSize>e.length?(Le.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(r*this.channelSize),o.forEach((i,a)=>t[a]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},So=class{constructor(e,r=1,t){if(r!==1&&r!==4)throw new Error(`Invalid number of channels: ${r}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=r,this.textureType=t||e.FLOAT}encode(e,r){let t=e;return this.channelSize===1&&(Le.verbose("Encoder","Exploding into a larger array"),t=this.allocate(r),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,r){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,r):e.subarray(0,r)}},vi=class{constructor(e,r=1){this.channelSize=4;if(r===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else if(r===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=r;else throw new Error(`Invalid number of channels: ${r}`)}encode(e,r){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,r){if(e instanceof Uint8Array)return e.subarray(0,r);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Ao,cm,wu,fm=E(()=>{"use strict";ze();Oe();Ao=(n,e,r)=>{let t=r===0||r===1?1:4,o=r===2,i=r===1||r===2,a=r===4?e.length-1:void 0,s=r===4?e.map((u,c)=>c===e.length-1?u*4:u):void 0;return wu(n,e,t,s,{isPacked:o,reverseWH:i,breakAxis:a})},cm=(n,e,r)=>{let t=Ao(n,e,r);return[t.width,t.height]},wu=(n,e,r=1,t,o)=>{let i=!!(o&&o.isPacked),[a,s]=n.computeTextureWH(i&&t||e,o),u=e.length,c=e.slice(0);if(u===0&&(c=[1]),r===1)t=e;else if(i){if(r!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(c[u-1]=Math.ceil(c[u-1]/2)),u>1&&(c[u-2]=Math.ceil(c[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:a,height:s,channels:r,isPacked:i,shape:c,strides:ne.computeStrides(c),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var F2,Ii,pm=E(()=>{"use strict";Pt();rn();ze();rm();im();am();lm();$o();fm();Oe();F2=(n,e)=>{let r=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=n.name;return n.cacheHint&&(t+="["+n.cacheHint+"]"),t+=":"+r,t},Ii=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,r){return cm(this.session.layoutStrategy,e,r)}executeProgram(e,r){if(r.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let c=0;c<e.inputNames.length;++c)t[c]=this.getOrCreateTextureData(r[c],e.inputTypes[c]);let o=F2(e,t),i=this.session.programManager.getArtifact(o),a=i?i.programInfo:typeof e.get=="function"?e.get():e,s=Ao(this.session.layoutStrategy,a.output.dims,a.output.textureType),u=this.createTextureData(s,a.output.type);return i||(i=this.session.programManager.build(a,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,r){return this.executeProgram(e,r).tensor}runProgram(e,r,t){for(let o=0;o<r.length;++o)if(!!r[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,r,t)}getOrCreateTextureData(e,r){let t=this.getTextureData(e.dataId,r===2);if(!t&&(t=this.getTextureData(e.dataId,r!==2),t))return r===2?this.pack(t):this.unpack(t);if(!t){let o=Ao(this.session.layoutStrategy,e.dims,r);if(r===4){let s=e.dims;if(s.length===4){let u=[s[0],Math.ceil(s[1]*s[2]*s[3]/4)],c=Ao(this.session.layoutStrategy,u,r),f=e.numberData;if(s[1]*s[2]*s[3]%4!==0){let p=s[0],m=s[1]*s[2]*s[3],g=Math.ceil(m*1/4)*4,y=p*g;f=new Float32Array(y);for(let x=0;x<p;++x){let v=x*m,T=x*g+x%1*m;f.set(e.numberData.subarray(v,v+m),T)}}return this.createTextureData(c,e.type,f,e,1)}}if(r===2){let i=wu(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),a=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(a)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,r,t,o){return this.createTextureData(e,r,t,o,1)}createTextureData(e,r,t,o,i){Le.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let a=this.session.textureManager.createTextureFromLayout(r,e,t,i);return this.createTextureDataFromTexture(e,r,a,o)}reshapeUnpacked(e,r){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:ne.computeStrides(r),unpackedShape:r};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,r){let t=this.getOrCreateTextureData(e,2);if(om(e.dims,r)){let c={channels:t.channels,height:t.height,width:t.width,shape:r.length!==0?r:[1],strides:ne.computeStrides(r),unpackedShape:r,isPacked:!0};return this.createTextureDataFromTexture(c,e.type,t.texture).tensor}let o=xu(e.dims),i=xu(r),a=this.reshapePacked(e,o),s=this.run(nm(this,a,i),[a]);return this.reshapePacked(s,r)}cast(e,r){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,r,t.texture).tensor}createTextureDataFromTexture(e,r,t,o,i){let a={...e,tensor:o||new ot(e.unpackedShape,r,s=>this.readTexture(a),async s=>this.readTextureAsync(a),void 0,i),texture:t};return this.setTextureData(a.tensor.dataId,a,e.isPacked),a}getTextureData(e,r=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,r):r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,r,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,r)}isTextureLayoutCached(e,r=!1){return!!this.getTextureData(e.dataId,r)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Tu(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Tu(this,e))}pack(e){return this.executeProgram(tm(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(um(this,e.tensor),[e.tensor])}}});var vu,Ie,ct=E(()=>{"use strict";vu=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Ie=n=>new vu(n)});var mm,hm,bm,U2,G2,gm=E(()=>{"use strict";ct();Xe();Oe();mm={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},hm=(n,e,r)=>(G2(e),[n.run({...mm,cacheHint:r.cacheKey,get:()=>U2(n,e,r)},e)]),bm=n=>{let e=n.attributes.getFloat("epsilon",1e-5),r=n.attributes.getFloat("momentum",.9),t=n.attributes.getInt("spatial",1);return Ie({epsilon:e,momentum:r,spatial:t})},U2=(n,e,r)=>{let t=ae(n.session.backend.glContext.version),o=e[0].dims.length,[i,a]=n.calculateTextureWidthAndHeight(e[1].dims,0),s=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${a});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${r.epsilon})) ) + b;
  }`;return{...mm,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:s}},G2=n=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=n[0],r=n[1],t=n[2],o=n[3],i=n[4];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Si,Dt,Z,Oo,$i,gr=E(()=>{"use strict";Si=class{constructor(e,r,t,o){this.glContext=e;this.programInfo=r;this.inputTextureLayouts=t;this.outputTextureLayout=o}},Dt=class{constructor(e){this.context=e}},Z=class{constructor(e,r){this.routineBody=e;this.dependencies=r}},Oo=class{constructor(e,r,t){this.name=e;t?this.dependencies=t:this.dependencies=[],r&&(this.routineBody=r)}addDependency(e){e&&this.dependencies.push(e)}},$i=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let r=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,r,t,o),o}static createOrderedNodes(e,r,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],r,t,o)}static dfsTraverse(e,r,t,o){if(!e||t.has(e.name))return;if(r.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");r.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let a=0;a<i.length;++a)this.dfsTraverse(i[a],r,t,o);o.push(e),t.add(e.name),r.delete(e.name)}}});function H2(){let n="add_";return{body:`
  float ${n}(float a, float b) {
    return a + b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:n,type:0}}function q2(){let n="div_";return{body:`
  float ${n}(float a, float b) {
    return a / b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:n,type:0}}function K2(){let n="mul_";return{body:`
  float ${n}(float a, float b) {
    return a * b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:n,type:0}}function j2(){let n="sub_";return{body:`
  float ${n}(float a, float b) {
    return a - b;
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:n,type:0}}function X2(){let n="equal_";return{body:`
  float ${n}(float a, float b) {
    return float(a == b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:n,type:0}}function Z2(){let n="greater_";return{body:`
  float ${n}(float a, float b) {
    return float(a > b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:n,type:0}}function J2(){let n="less_";return{body:`
  float ${n}(float a, float b) {
    return float(a < b);
  }
  vec4 ${n}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:n,type:0}}function Y2(){let n="and_";return{body:`
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
  `,name:n,type:0}}function Q2(){let n="or_";return{body:`
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
  `,name:n,type:0}}function e1(){let n="xor_";return{body:`
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
  `,name:n,type:0}}function t1(){return n1("pow")}function r1(){let n="prelu_";return{body:`
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
  `,name:n,type:0}}function n1(n){let e=`${n}_`;return{body:`
  float ${e}(float a, float b) {
    return ${n}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${n}(v1, v2);
  }
  `,name:e,type:0}}var Bt,o1,ym,_m,xm,Tm,wm,vm,Im,Sm,$m,Am,Om,Pm,Cm=E(()=>{"use strict";ze();gr();Xe();Oe();Bt=(n,e,r,t=e[0].type,o)=>{let i=n.session.pack?2:0;return{name:r.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>o1(n,e,r,t)}},o1=(n,e,r,t=e[0].type)=>{let o=n.session.pack?2:0,i=!ne.areEqual(e[0].dims,e[1].dims),a=e[0].dims,s=n.session.pack;if(i){let f=ht.calcShape(e[0].dims,e[1].dims,!1);if(!f)throw new Error("Can't perform binary op on the given tensors");a=f;let p=a.length,m=e[0].dims.length!==0?e[0].dims.length:1,g=e[1].dims.length!==0?e[1].dims.length:1,y=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",x=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",v=ae(n.session.backend.glContext.version),T=s?`
      ${r.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${r.name}(a, b);
        ${v.output} = result;
      }`:`
      ${r.body}
      float process(int indices[${p}]) {
        int aindices[${m}];
        int bindices[${g}];
        ${y}
        ${x}
        return ${r.name}(_A(aindices), _B(bindices));
      }`;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:a,type:t,textureType:o},shaderSource:T,hasMain:s}}let u=ae(n.session.backend.glContext.version),c=`
    ${r.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${r.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:r.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:c,hasMain:!0}},ym=(n,e)=>[n.run(Bt(n,e,H2()),e)],_m=(n,e)=>[n.run(Bt(n,e,Y2(),"bool"),e)],xm=(n,e)=>[n.run(Bt(n,e,q2()),e)],Tm=(n,e)=>[n.run(Bt(n,e,X2(),"bool"),e)],wm=(n,e)=>[n.run(Bt(n,e,Z2(),"bool"),e)],vm=(n,e)=>[n.run(Bt(n,e,J2(),"bool"),e)],Im=(n,e)=>[n.run(Bt(n,e,K2()),e)],Sm=(n,e)=>[n.run(Bt(n,e,Q2(),"bool"),e)],$m=(n,e)=>[n.run(Bt(n,e,t1()),e)],Am=(n,e)=>[n.run(Bt(n,e,r1()),e)],Om=(n,e)=>[n.run(Bt(n,e,j2()),e)],Pm=(n,e)=>[n.run(Bt(n,e,e1(),"bool"),e)]});var Em,km,a1,Dm=E(()=>{"use strict";ze();Em=(n,e,r)=>(a1(e),[n.cast(e[0],r)]),km=n=>dt.tensorDataTypeFromProto(n.attributes.getInt("to")),a1=n=>{if(!n||n.length!==1)throw new Error("Cast requires 1 input.");if(n[0].type==="string")throw new Error("Invalid input type.")}});var s1,u1,Bm,Ai,Nm=E(()=>{"use strict";Xe();Oe();tr();nn();s1=(n,e)=>({name:"Concat (packed)",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(2),cacheHint:e}),u1=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let P=1;P<r.length;P++){let k=r[P].dims.slice();for(let R=0;R<o.length;R++)if(R===t)i[t]+=k[R];else if(o[R]!==k[R])throw new Error("non concat dimensions must match")}let a=i.length,s=Cn("coords",a),u=bt(a),c=rr(),f=r.map(P=>P.dims),p=Wt(a),m=new Array(f.length-1);m[0]=f[0][t];for(let P=1;P<m.length;P++)m[P]=m[P-1]+f[P][t];let g=p[t],y=p.slice(-2),x=p.join(),v=`if (${g} < ${m[0]}) {
        return getChannel(
            getX0(${x}), vec2(${y.join()}));
        }`;for(let P=1;P<m.length;P++){let k=m[P-1];v+=`
            if (${g} < ${m[P]}  && ${g} >= ${m[P-1]}) {
              return getChannel(
                getX${P}(${Ai(p,g,k)}),
                vec2(${Ai(y,g,k)}));
            }`}let T=m.length,w=m[m.length-1];v+=`
            return getChannel(
              getX${T}(${Ai(p,g,w)}),
              vec2(${Ai(y,g,w)}));`;let I=ae(n.session.backend.glContext.version),A=`
          ${c}
          float getValue(${p.map(P=>"int "+P)}) {
            ${v}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${p[a-1]};
            coords.${p[a-1]} = coords.${p[a-2]};
            coords.${p[a-2]} = lastDim;

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
        `;return{...e,output:{dims:i,type:r[0].type,textureType:2},shaderSource:A,hasMain:!0}},Bm=(n,e,r)=>{let t=s1(e.length,r.cacheKey);return{...t,get:()=>u1(n,t,e,r.axis)}},Ai=(n,e,r)=>{let t=n.indexOf(e);return n.map((i,a)=>a===t?`${i} - ${r}`:i).join()}});var Rm,l1,c1,f1,zm,d1,p1,m1,Lm,h1,Mm=E(()=>{"use strict";ct();Oe();Nm();Rm=(n,e,r)=>(h1(e),n.session.pack&&e[0].dims.length>1?[n.run(Bm(n,e,r),e)]:[n.run(f1(n,e,r),e)]),l1=(n,e)=>({name:"Concat",inputNames:Array.from({length:n},(r,t)=>`X${t}`),inputTypes:Array(n).fill(0),cacheHint:e}),c1=(n,e,r,t)=>{let o=r[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let g=1;g<r.length;g++){let y=r[g].dims.slice();for(let x=0;x<o.length;x++)if(x===t)i[t]+=y[x];else if(o[x]!==y[x])throw new Error("non concat dimensions must match")}let a=i.length,s=new Array(r.length),u=0;for(let g=0;g<s.length;++g)u+=r[g].dims[t],s[g]=u;let c="";r.length<5?c=zm(s):c=d1(s);let f=p1(r.length,a),p=m1(s),m=`
        ${f}
        ${p}
        ${c}
        float process(int indices[${a}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:m}},f1=(n,e,r)=>{let t=l1(e.length,r.cacheKey);return{...t,get:()=>c1(n,t,e,r.axis)}},zm=n=>`int getTextureWhereDataResides(int index) {
      ${n.map((r,t)=>`if(index<${r}) {return ${t};}
`).join("")}
    }`,d1=n=>zm(n),p1=(n,e)=>{let r=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<n;++t)t===0?r.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===n-1?r.push(`	else { return _X${t}(indices); }`):r.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return r.push("	}"),r.join(`
`)},m1=n=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let r=0;r<n.length;++r)r===0?e.push(`	if (index == ${r}) { return ${n[r]}; }`):r===n.length-1?e.push(`	else { return ${n[r]}; }`):e.push(`	else if (index == ${r}) { return ${n[r]}; }`);return e.push("	}"),e.join(`
`)},Lm=n=>Ie({axis:n.attributes.getInt("axis")}),h1=n=>{if(!n||n.length<1)throw new Error("too few inputs");let e=n[0].type,r=n[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of n){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==r)throw new Error("input tensors should have the same shape")}}});function b1(){return Nt("abs")}function g1(){return Nt("acos")}function y1(){return Nt("asin")}function _1(){return Nt("atan")}function x1(){return Nt("ceil")}function T1(){return Nt("cos")}function w1(n){let e="elu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function v1(){return Nt("exp")}function I1(){return Nt("floor")}function Iu(n,e){let r="clip";return{body:`
  const float min = float(${n});
  const float max = float(${e});

  float ${r}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${r}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:r,type:0}}function S1(){let n="indentity";return{body:`
  float ${n}_(float a) {
    return a;
  }
  vec4 ${n}_(vec4 v) {
    return v;
  }
  `,name:n,type:0}}function $1(n){let e="leakyRelu";return{body:`
  const float alpha = float(${n});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function A1(){return Nt("log")}function O1(){let n="neg";return{body:`
  float ${n}_(float a) {
    return -a;
  }
  vec4 ${n}_(vec4 v) {
    return -v;
  }
  `,name:n,type:0}}function P1(){let n="not";return{body:`
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
  `,name:n,type:0}}function C1(){return Nt("sin")}function Su(){let n="relu";return{body:`
  float ${n}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${n}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:n,type:0}}function $u(){let n="sigmoid";return{body:`
  float ${n}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${n}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:n,type:0}}function E1(){return Nt("sqrt")}function k1(){return Nt("tan")}function D1(){let n="tanh";return{body:`
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
  `,name:n,type:0}}function Nt(n){return{body:`
  float ${n}_(float a) {
    return ${n}(a);
  }
  vec4 ${n}_(vec4 v) {
    return ${n}(v);
  }
  `,name:n,type:0}}var B1,tt,Vm,Fm,Um,Gm,Au,Wm,Hm,N1,qm,Km,jm,Xm,Zm,Jm,Ou,Ym,Qm,eh,th,rh,nh,oh,ih,ah,sh,uh,Pu=E(()=>{"use strict";ct();ze();gr();Xe();Oe();B1=(n,e,r,t)=>{let o=n.session.pack?2:0,i=ae(n.session.backend.glContext.version);return{...e,output:{dims:r.dims,type:r.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},tt=(n,e,r,t)=>{let o=n.session.pack?2:0,i={name:r.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>B1(n,i,e,r)}},Vm=(n,e)=>[n.run(tt(n,e[0],b1()),e)],Fm=(n,e)=>[n.run(tt(n,e[0],g1()),e)],Um=(n,e)=>[n.run(tt(n,e[0],y1()),e)],Gm=(n,e)=>[n.run(tt(n,e[0],_1()),e)],Au=(n,e,r)=>[n.run(tt(n,e[0],Iu(r.min,r.max),r.cacheKey),e)],Wm=n=>Ie({min:n.attributes.getFloat("min",en),max:n.attributes.getFloat("max",tn)}),Hm=(n,e)=>{let r=N1(n,e);return Au(n,[e[0]],r)},N1=(n,e)=>{if(e.length>=3&&(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let r=e.length>=3?e[1].numberData[0]:en,t=e.length>=3?e[2].numberData[0]:tn;return Ie({min:r,max:t})},qm=(n,e)=>[n.run(tt(n,e[0],x1()),e)],Km=(n,e)=>[n.run(tt(n,e[0],T1()),e)],jm=(n,e,r)=>[n.run(tt(n,e[0],w1(r.alpha),r.cacheKey),e)],Xm=n=>Ie({alpha:n.attributes.getFloat("alpha",1)}),Zm=(n,e)=>[n.run(tt(n,e[0],v1()),e)],Jm=(n,e)=>[n.run(tt(n,e[0],I1()),e)],Ou=(n,e)=>[n.run(tt(n,e[0],S1()),e)],Ym=(n,e,r)=>[n.run(tt(n,e[0],$1(r.alpha),r.cacheKey),e)],Qm=n=>Ie({alpha:n.attributes.getFloat("alpha",.01)}),eh=(n,e)=>[n.run(tt(n,e[0],A1()),e)],th=(n,e)=>[n.run(tt(n,e[0],O1()),e)],rh=(n,e)=>[n.run(tt(n,e[0],P1()),e)],nh=(n,e)=>[n.run(tt(n,e[0],Su()),e)],oh=(n,e)=>[n.run(tt(n,e[0],$u()),e)],ih=(n,e)=>[n.run(tt(n,e[0],C1()),e)],ah=(n,e)=>[n.run(tt(n,e[0],E1()),e)],sh=(n,e)=>[n.run(tt(n,e[0],k1()),e)],uh=(n,e)=>[n.run(tt(n,e[0],D1()),e)]});function nr(n){let e;switch(n.activation){case"Relu":e=Su();break;case"Sigmoid":e=$u();break;case"Clip":e=Iu(n.clipMin,n.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let r=e.name,t=e.body,o=`value = ${r}_(value);`;return{activationFunction:t,applyActivation:o}}var En,on=E(()=>{"use strict";ze();Pu();En=n=>{let e=n.getString("activation","");if(e==="Clip"){let[r,t]=n.getFloats("activation_params",[en,tn]);return{activation:e,clipMax:t,clipMin:r,activationCacheKey:`${e}:${r},${t}`}}return{activation:e,activationCacheKey:e}}});var z1,L1,lh,ch=E(()=>{"use strict";Pt();Xe();Oe();Oi();on();z1=(n,e)=>({name:"GroupedConv",inputNames:n?["X","W","Bias"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),L1=(n,e,r,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",a=e[0].dims.slice(),s=e[1].dims.slice(),u=s[0]/t.group;Le.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let c=kn(a,s,t.dilations,t.pads,t.strides),f=ae(n.session.backend.glContext.version),{activationFunction:p,applyActivation:m}=nr(t),g=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${p}
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
    ${m}
    ${f.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:c,type:e[0].type,textureType:0},shaderSource:g,hasMain:!0}},lh=(n,e,r)=>{let t=z1(e.length>2,r.cacheKey);return{...t,get:()=>L1(n,e,t,r)}}});var M1,V1,fh,dh=E(()=>{"use strict";Xe();Oe();nn();M1=n=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:n}),V1=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=2,c=3,f=o.length,p=[s[1]*s[2]*s[3],o[2]*o[3]],m=s[2]*s[3],g=rr(),y=ae(n.session.backend.glContext.version),x="";for(let T=0;T<=1;T++)for(let w=0;w<=1;w++)x+=`
            blockIndex = rc.x + ${w};
            pos = rc.y + ${T};

            if(blockIndex < ${p[1]} && pos < ${p[0]}) {
              offsetY = int(blockIndex / (${o[f-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${m}) / ${s[2]});

              if(d0 < ${a[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[f-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${m}), ${s[2]});

                if(d1 < ${a[c]} && d1 >= 0) {

                  ch = int(float(pos)/ ${m}.);
                    innerDims = vec2(d0, d1);
                    result[${T*2+w}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let v=`
      ${g}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${x}
          ${y.output} = result;
      }
            `;return{...e,output:{dims:p,type:r.type,textureType:2},shaderSource:v,hasMain:!0}},fh=(n,e,r,t,o)=>{let i=M1(o.cacheKey);return{...i,get:()=>V1(n,i,e,r,t,o)}}});function U1(n,e,r){let t=e[0].dims,o=e[1].dims,i=ht.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let a=bt(i.length),s=Wt(),{activationFunction:u,applyActivation:c}=nr(r),f=e.length>2,p=f?"value += getBiasForMatmul();":"",m=f?`${Eu(a,s,e[2].dims,i,!1)}`:"",g=i.length,y=t.length,x=o.length,v=t[t.length-1],T=`
    ${u}
    ${m}
    float process(int indices[${g}]) {
        int a[${y}];
        int b[${x}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${v}; ++k) {
            a[${y-1}] = k;
            b[${x-2}] = k;
            value += _A(a) * _B(b);
        }
        ${p}
        ${c}
        return value;
    }`;return{...n,output:{dims:i,type:e[0].type,textureType:0},shaderSource:T}}function Cu(n,e){let r=F1(n.length>2,e.activationCacheKey);return{...r,get:()=>U1(r,n,e)}}function Eu(n,e,r,t,o){let i="",a=r.length,s=t.length,u=s-a;s<2&&a>0?i="coords":i=r.map((x,v)=>`coords.${e[v+u]}`).join(", ");let f=ht.getBroadcastDims(r,t).map(x=>`coords.${e[x+u]} = 0;`).join(`
`),m=ne.size(r)===1,g="vec4(outputValue.xx, outputValue.yy)";return m&&(g="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${f}
  vec4 outputValue = getBias(${i});
  return ${g};
}`:`
float getBiasForMatmul() {
  ${n} coords = getOutputCoords();
  ${f}
  return getBias(coords.x);
}`}var ph,mh,F1,G1,Pi=E(()=>{"use strict";ze();Oe();tr();on();ku();ph=(n,e,r)=>(G1(e),n.session.pack?[n.run(Ci(n,e,r),e)]:[n.run(Cu(e,r),e)]),mh=n=>En(n.attributes),F1=(n,e)=>({name:"MatMul",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e});G1=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64")throw new Error("inputs should be float type");if(n[0].type!==n[1].type)throw new Error("inputs types should match")}});function q1(n,e,r,t){let o=[],i=[],a=r[0].dims,s=r[1].dims,u=a.length,c=s.length,f=t.length,p=f-u,m=f-c;o=a.map((I,A)=>`coords.${e[A+p]}`),o[u-1]="i*2",o.join(", "),i=s.map((I,A)=>`coords.${e[A+m]}`),i[c-2]="i*2",i.join(", ");let g=ht.getBroadcastDims(a,t),y=ht.getBroadcastDims(s,t),x=g.map(I=>`coords.${e[I+p]} = 0;`).join(`
`),v=y.map(I=>`coords.${e[I+m]} = 0;`).join(`
`),T=`int lastDim = coords.${e[f-1]};
  coords.${e[f-1]} = coords.${e[f-2]};
  coords.${e[f-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${T}
  ${x}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${n} coords = getOutputCoords();
  ${T}
  ${v}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function K1(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`rc.${n[e-2]}, i*2`,r}function j1(n,e){let r="";for(let t=0;t<e-2;t++)r+=`rc.${n[t]}, `;return r+=`i*2, rc.${n[e-1]}`,r}var W1,H1,Ci,ku=E(()=>{"use strict";ze();Xe();Oe();tr();on();Pi();W1=(n,e)=>({name:"MatMul (packed)",inputNames:n?["A","B","Bias"]:["A","B"],inputTypes:n?[2,2,2]:[2,2],cacheHint:e}),H1=(n,e,r,t)=>{let o=r.length>2,i=o?"value += getBiasForMatmul();":"",a=r[0].dims,s=r[1].dims,u=ht.calcShape(a,s,!0),c=!ne.areEqual(r[0].dims,r[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let f=a[a.length-1],p=Math.ceil(f/2),m=a.length,g=s.length,y=ae(n.session.backend.glContext.version),x=bt(u.length),v=u.length,T=Wt(),{activationFunction:w,applyActivation:I}=nr(t),A=o?`${Eu(x,T,r[2].dims,u,!0)}`:"",P=c?`${q1(x,T,r,u)}`:"",k=c?"getAAtOutCoordsMatmul(i)":`getA(${K1(T,m)})`,R=c?"getBAtOutCoordsMatmul(i)":`getB(${j1(T,g)})`,z=c?"":`${x} rc =
          getOutputCoords(); int lastDim = rc.${T[v-1]}; rc.${T[v-1]} =
          rc.${T[v-2]}; rc.${T[v-2]} = lastDim;
      `,F=`
            ${P}
            ${A}
            ${w}
            void main() {
              ${z}

              vec4 value = vec4(0);
              for (int i = 0; i < ${p}; i++) {
                vec4 a = ${k};
                vec4 b = ${R};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${I}
              ${y.output} = value;
            }`;return{...e,output:{dims:u,type:r[0].type,textureType:2},shaderSource:F,hasMain:!0}},Ci=(n,e,r)=>{let t=W1(e.length>2,r.activationCacheKey);return{...t,get:()=>H1(n,t,e,r)}}});var hh,bh=E(()=>{"use strict";Oi();dh();ku();hh=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=kn(t,o,r.dilations,r.pads,r.strides),a=n.run(fh(n,e[0],e[1],i,r),[e[0]]),s=n.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[s,a,e[2]]:[s,a],c=n.run(Ci(n,u,r),u);return n.reshapePacked(c,i)}});var X1,Z1,gh,Du,Bu=E(()=>{"use strict";Oe();X1=n=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:n}),Z1=(n,e,r,t,o,i)=>{let a=r.dims,s=t.dims,u=o.length,c=Du(a,s,o,4),f=`
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
        `;return{...e,output:{dims:c,type:r.type,textureType:4},shaderSource:f}},gh=(n,e,r,t,o)=>{let i=X1(o.cacheKey);return{...i,get:()=>Z1(n,i,e,r,t,o)}},Du=(n,e,r,t=4)=>[r[0],r[2],r[3],Math.ceil(n[1]*e[2]*e[3]/t)]});var J1,Y1,yh,_h=E(()=>{"use strict";ze();Xe();Oe();on();Bu();J1=(n,e)=>({name:"ConvDotProduct",inputNames:n?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:n?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),Y1=(n,e,r,t,o)=>{let i=r[0].dims,a=r[1].dims,s=[a[0],Math.ceil(i[1]*a[2]*a[3]/4)],u=Du(i,a,t),[c,f]=n.calculateTextureWidthAndHeight(s,4),p=ne.computeStrides(u),[m,g]=n.calculateTextureWidthAndHeight(u,4),y=t.length,x=r.length<3?"0.0":"_B(b)",v=Math.ceil(i[1]*a[2]*a[3]/4),{activationFunction:T,applyActivation:w}=nr(o),I=ae(n.session.backend.glContext.version),A=`
${T}
float process(int indices[${y}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${p[0]} + im2col[1] * ${p[1]} + im2col[2] * ${p[2]};
  int kernelOffset = indices[1] * ${s[1]};
  float value = ${x};
  for (int i = 0; i < ${v}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${m}, ${g});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${c}, ${f});
    value += dot(${I.texture2D}(Im2Col, im2colCoords), ${I.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${w}
  return value;
}`;return{...e,output:{dims:t,type:r[0].type,textureType:0},shaderSource:A}},yh=(n,e,r,t)=>{let o=J1(e.length>2,t);return{...o,get:()=>Y1(n,o,e,r,t)}}});var kn,Nu,Q1,eI,tI,rI,Ru,nI,Oi=E(()=>{"use strict";ct();ze();ch();bh();_h();on();Bu();Pi();kn=(n,e,r,t,o)=>{let i=n[0],a=n.slice(2),s=a.length,u=e[0],f=e.slice(2).map((y,x)=>y+(y-1)*(r[x]-1)),m=a.map((y,x)=>y+t[x]+t[x+s]).map((y,x)=>Math.floor((y-f[x]+o[x])/o[x]));return[i,u].concat(...m)},Nu=(n,e,r)=>(nI(e,r),Q1(n,e,r)),Q1=(n,e,r)=>{let t=rI(r,e),o=n.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[n.run(lh(n,e,t),e)]:i&&o?[eI(n,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[hh(n,e,t)]:[tI(n,e,t)]},eI=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=kn(t,o,r.dilations,r.pads,r.strides),a=n.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),s=n.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[s,a,e[2]]:[s,a],c=n.run(Cu(u,r),u);return n.reshapeUnpacked(c,i)},tI=(n,e,r)=>{let t=e[0].dims,o=e[1].dims,i=kn(t,o,r.dilations,r.pads,r.strides),a=n.run(gh(n,e[0],e[1],i,r),[e[0]]),s=e.length===3?[a,e[1],e[2]]:[a,e[1]];return n.run(yh(n,e,i,r),s)},rI=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)r.push(e[1].dims[i]);let t=n.pads.slice();Qr.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t,cacheKey:n.cacheKey}),o},Ru=n=>{let e=n.attributes,r=En(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return Ie({autoPad:t,dilations:o,group:i,kernelShape:a,pads:s,strides:u,...r})},nI=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var oI,iI,aI,xh,sI,uI,lI,cI,fI,dI,Th,pI,wh=E(()=>{"use strict";ct();Xe();Oe();on();oI=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,iI=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},aI=(n,e,r,t,o,i,a,s)=>{let u=n.length-2,c=s.length===0;for(let f=0;f<u;++f){let p=c?n[f+2]*i[f]:s[f],m=oI(n[f+2],i[f],o[f],e[f],r[f],p);iI(m,t,o,f,f+u),c&&s.push(i[f]*(n[f+2]-1)+a[f]+(e[f]-1)*r[f]+1-o[f]-o[f+u])}},xh=(n,e,r)=>(pI(e,r),sI(n,e,r)),sI=(n,e,r)=>{let t=dI(r,e);return[fI(n,e,t)]},uI=(n,e)=>({name:"ConvTranspose",inputNames:n?["X","W","B"]:["X","W"],inputTypes:n?[0,0,0]:[0,0],cacheHint:e}),lI=(n,e,r,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",a=e[0].dims,s=e[1].dims,u=s[1],c=s[0]/t.group,f=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],p=ae(n.session.backend.glContext.version),{activationFunction:m,applyActivation:g}=nr(t),y=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${m}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${c}; inChannelOffset++) {
      int input_channel = group_id * ${c} + inChannelOffset;
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
    ${p.output} = vec4(value, .0, .0, .0);
  }
`;return{...r,output:{dims:f,type:e[0].type,textureType:0},shaderSource:y,hasMain:!0}},cI=(n,e,r)=>{let t=uI(e.length>2,r.cacheKey);return{...t,get:()=>lI(n,e,t,r)}},fI=(n,e,r)=>n.run(cI(n,e,r),e),dI=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0)for(let s=2;s<e[1].dims.length;++s)r.push(e[1].dims[s]);let t=n.pads.slice(),o=n.outputShape.slice(),i=e[0].dims;aI(i,r,n.dilations,n.autoPad,t,n.strides,n.outputPadding,o);let a=Object.assign({},n);return Object.assign(a,{kernelShape:r,pads:t,outputShape:o,cacheKey:n.cacheKey}),a},Th=n=>{let e=n.attributes,r=En(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),a=e.getInts("kernel_shape",[]),s=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),c=e.getInts("pads",[0,0,0,0]),f=e.getInts("strides",[1,1]);return Ie({autoPad:t,dilations:o,group:i,kernelShape:a,outputPadding:s,outputShape:u,pads:c,strides:f,...r})},pI=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4||n[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let r=n[0].dims[1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape");if(n[0].type!=="float32"||n[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(n.length===3&&n[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var vh,an,Ih,mI,Sh,hI,bI,gI,Ei=E(()=>{"use strict";ct();ze();Oe();vh={name:"Transpose",inputNames:["A"],inputTypes:[0]},an=(n,e,r)=>(gI(e),[n.run({...vh,cacheHint:r.cacheKey,get:()=>mI(n,e[0],r.perm)},e)]),Ih=n=>Ie({perm:n.attributes.getInts("perm",[])}),mI=(n,e,r)=>{let t=e.dims;r=Sh(t,r);let o=hI(t,r),i=t.length,a=`
      ${bI("perm",r,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...vh,output:{dims:o,type:e.type,textureType:0},shaderSource:a}},Sh=(n,e)=>(e&&e.length!==n.length&&(e=[...n.keys()].reverse()),e),hI=(n,e)=>(e=Sh(n,e),ne.sortBasedOnPerm(n,e)),bI=(n,e,r)=>{let t=[];t.push(`void ${n}(out int a[${r}], int src[${r}]) {`);for(let o=0;o<r;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},gI=n=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("input should be float tensor")}});var $h,Ah,yI,Oh=E(()=>{"use strict";Ei();$h=(n,e,r)=>{yI(e);let t=r.blocksize,o=t*t,i=r.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],a=r.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],s=n.reshapeUnpacked(e[0],a),u={perm:i,cacheKey:`${i}`},[c]=an(n,[s],u),f=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[n.reshapeUnpacked(c,f)]},Ah=n=>{let e=n.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let r=n.attributes.getString("mode","DCR");if(r!=="DCR"&&r!=="CRD")throw new Error(`unrecognized mode: ${r} for DepthToSpace`);return{mode:r,blocksize:e}},yI=n=>{if(n.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${n.length}`);if(n[0].type==="string"||n[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var Ph,Ch,_I,Eh=E(()=>{"use strict";ze();Ph=(n,e,r)=>{_I(e,r);let t=ne.flattenShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Ch=n=>n.attributes.getInt("axis",1),_I=(n,e)=>{if(!n||n.length!==1)throw new Error("Flatten requires 1 input.");let r=n[0].dims.length;if(r===0)throw new Error("scalar tensor is not supported.");if(e<-r||e>r)throw new Error("Invalid axis");if(n[0].type==="string")throw new Error("string tensor is not supported.")}});var kr,Po=E(()=>{"use strict";kr=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var kh,Dh,xI,TI,wI,vI,Bh=E(()=>{"use strict";ct();Po();ze();Oe();kh=(n,e,r)=>(vI(e,r.axis),[n.run(wI(n,e,r),e)]),Dh=n=>Ie({axis:n.attributes.getInt("axis",0)}),xI={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},TI=(n,e,r,t)=>{let o=r[0].dims.slice(),i=r[1].dims.slice(),a=new Array(o.length+i.length-1);t=ne.normalizeAxis(t,o.length);let s=[];for(let m=0;m<a.length;m++)m<t?(a[m]=o[m],s.push(`inputIdx[${m}] = outputIdx[${m}];`)):m<t+i.length?(a[m]=i[m-t],s.push(`indexDataIdx[${m-t}] = outputIdx[${m}];`)):(a[m]=o[m-i.length+1],s.push(`inputIdx[${m-i.length+1}] = outputIdx[${m}];`));let u=a.length||1,c=o.length,f=i.length||1,p=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${c}];
        int indexDataIdx[${f}];
        indexDataIdx[0] = 0;
        ${s.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:a,type:r[0].type,textureType:0},shaderSource:p}},wI=(n,e,r)=>{let t={...xI,cacheHint:r.cacheKey};return{...t,get:()=>TI(n,t,e,r.axis)}},vI=(n,e)=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.");let r=n[0].dims.length;if(r<1)throw new Error("Invalid input shape.");if(e<-r||e>r-1)throw new Error("Invalid axis.");if(kr.indexOf(n[0].type)===-1)throw new Error("Invaid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invaid input type.")}});var zu,Nh,Rh,zh,II,SI,$I,Lh=E(()=>{"use strict";ct();ze();Oe();zu=(n,e,r)=>($I(e,r),[n.run(II(e,r),e)]),Nh=(n,e)=>{let r=n.attributes.getInt("transA",0)!==0,t=n.attributes.getInt("transB",0)!==0,o=n.attributes.getFloat("alpha",1),i=n.attributes.getFloat("beta",1);return Ie({transA:r,transB:t,alpha:o,beta:i,isOptionalC:e})},Rh=n=>Nh(n,!1),zh=n=>Nh(n,!0),II=(n,e)=>{let r={name:"Gemm",inputNames:n.length===3?["A","B","C"]:["A","B"],inputTypes:n.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...r,get:()=>SI(r,n,e)}},SI=(n,e,r)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,a]=xi.getShapeOfGemmResult(t,r.transA,o,r.transB,e.length===3?e[2].dims:void 0),s=[i,a];if(!s)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],c="";r.transA&&(u=t[0]),r.transA&&r.transB?c="value += _A_T(a) * _B_T(b);":r.transA&&!r.transB?c="value += _A_T(a) * _B(b);":!r.transA&&r.transB?c="value += _A(a) * _B_T(b);":!r.transA&&!r.transB&&(c="value += _A(a) * _B(b);");let f=s.length,p=e.length===3?`int c[${e[2].dims.length}];`:"",m=e.length===3?"bcastIndices_C(indices, c);":"",g=e.length===3?"value += beta * _C(c);":"",y=`
      float process(int indices[${f}]) {
          int a[${f}];
          int b[${f}];
          ${p}

          copyVec(indices, a);
          copyVec(indices, b);
          ${m}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${f-1}] = k;
              b[${f-2}] = k;
              ${c}
          }

          value = value * alpha;
          ${g}
          return value;
      }`;return{...n,output:{dims:s,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:r.alpha},{name:"beta",type:"float",data:r.beta}],shaderSource:y}},$I=(n,e)=>{if(!n)throw new Error("Input is missing");if(e.isOptionalC&&(n.length<2||n.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&n.length!==3)throw new Error("Gemm requires 3 inputs");if(n.length===3&&n[2].dims.length!==1&&n[2].dims.length!==2)throw new Error("Invalid input shape of C");if(n[0].type!=="float32"&&n[0].type!=="float64"||n[1].type!=="float32"&&n[1].type!=="float64"||n.length===3&&n[2].type!=="float32"&&n[2].type!=="float64")throw new Error("Invalid input type.");if(n[0].type!==n[1].type||n.length===3&&n[0].type!==n[2].type)throw new Error("Input types are mismatched")}});var Mh,Vh,AI,OI,PI,CI,EI,Fh=E(()=>{"use strict";ct();Oe();Mh=(n,e,r)=>(EI(e),[n.run(PI(n,e,r),e)]),Vh=n=>{let e=n.attributes.getFloat("scale"),r=n.attributes.getFloats("bias");return Ie({scale:e,bias:r})},AI={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},OI=(n,e,r,t)=>{let o=r[0].dims.slice(),i=o.length,s=`
      ${CI(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:r[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:s}},PI=(n,e,r)=>{let t={...AI,cacheHint:r.cacheKey};return{...t,get:()=>OI(n,t,e,r)}},CI=n=>{let e=[`float getBias(float bias[${n}], int channel) {`];for(let r=0;r<n;++r)r===0?e.push(`	if (channel == ${r}) { return bias[${r}]; }`):r===n-1?e.push(`	else { return bias[${r}]; }`):e.push(`	else if (channel == ${r}) { return bias[${r}]; }`);return e.push("	}"),e.join(`
`)},EI=n=>{if(!n||n.length!==1)throw new Error("ImageScaler requires 1 input.");if(n[0].dims.length!==4)throw new Error("Invalid input shape.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")}});var Gh,Wh,Uh,kI,DI,BI,NI,RI,zI,Hh=E(()=>{"use strict";Xe();Oe();Gh=(n,e,r)=>{zI(e);let t=n.run(DI(e[0]),e);return[n.run(RI(n,e[0],r,t.dims),[e[0],t,e[1],e[2]])]},Wh=n=>n.attributes.getFloat("epsilon",1e-5),Uh={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},kI=(n,e)=>{let r=e.dims.slice(),t=r[1],o=r[2]*r[3],i=[r[0],t],a=`
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
      }`;return{...n,output:{dims:i,type:e.type,textureType:4},shaderSource:a}},DI=n=>({...Uh,get:()=>kI(Uh,n)}),BI={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},NI=(n,e,r,t,o)=>{let i=ae(n.session.backend.glContext.version),[a,s]=n.calculateTextureWidthAndHeight(o,4),[u,c]=[a/4,s],f=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${c});
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
      }`;return{...e,output:{dims:r.dims,type:r.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:f}},RI=(n,e,r,t)=>{let o={...BI,cacheHint:`${r}`};return{...o,get:()=>NI(n,o,e,r,t)}},zI=n=>{if(!n||n.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dims.length<3||r.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(r.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||r.type!=="float32"&&r.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(n[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function LI(n,e){let r=n[0].dims[1],t=n[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),a=`float(${e.alpha}) / float(${e.size})`,s=`float(${e.bias})`,u=`float(${e.beta})`,c=`
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
        return x / pow(${s} + ${a} * square_sum, ${u});
    }`;return{...jh,cacheHint:e.cacheKey,output:{dims:n[0].dims,type:n[0].type,textureType:0},shaderSource:c}}function MI(n,e){return{...jh,cacheHint:e.cacheKey,get:()=>LI(n,e)}}var qh,Kh,jh,VI,Xh=E(()=>{"use strict";ct();Oe();qh=(n,e,r)=>(VI(e),[n.run(MI(e,r),e)]),Kh=n=>{let e=n.attributes.getFloat("alpha",1e-4),r=n.attributes.getFloat("beta",.75),t=n.attributes.getFloat("bias",1),o=n.attributes.getInt("size");return Ie({alpha:e,beta:r,bias:t,size:o})},jh={name:"LRN",inputNames:["X"],inputTypes:[0]};VI=n=>{if(!n||n.length!==1)throw new Error("LRN requires 1 input.");if(n[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(n[0].type!=="float32")throw new Error("input should be float type")}});var FI,Lu,Zh,Jh,Yh,UI,GI,WI,HI,qI,KI,jI,XI,Qh=E(()=>{"use strict";ct();ze();Xe();Oe();FI={name:"Pad",inputNames:["A"],inputTypes:[0]},Lu=(n,e,r)=>(WI(e),[n.run({...FI,cacheHint:r.cacheKey,get:()=>GI(n,e[0],r)},e)]),Zh=n=>{let e=n.attributes.getString("mode","constant"),r=n.attributes.getFloat("value",0),t=n.attributes.getInts("pads");return Ie({mode:e,value:r,pads:t})},Jh=(n,e,r)=>{HI(e);let t=UI(n,e,r);return Lu(n,[e[0]],t)},Yh=n=>n.attributes.getString("mode","constant"),UI=(n,e,r)=>{if(!n.session.isInitializer(e[1].dataId)||e.length>=3&&!n.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return Ie({mode:r,pads:t,value:o})},GI=(n,e,r)=>{let t=ne.padShape(e.dims.slice(),r.pads),o=t.length,a=`
      ${qI(n,e,r)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:a}},WI=n=>{if(!n||n.length!==1)throw new Error("Pad requires 1 input");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},HI=n=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(n[1].type!=="int32")throw new Error("Invalid input type.");if(n.length>=3&&n[2].type==="string")throw new Error("Invalid input type.")},qI=(n,e,r)=>{let t=ae(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e.dims,0),a=ne.computeStrides(e.dims);switch(r.mode){case"constant":return KI(t,e.dims,a,o,i,r.pads,r.value);case"reflect":return jI(t,e.dims,a,o,i,r.pads);case"edge":return XI(t,e.dims,a,o,i,r.pads);default:throw new Error("Invalid mode")}},KI=(n,e,r,t,o,i,a)=>{let s=e.length,u="";for(let c=s-1;c>=0;--c)u+=`
        k = m[${c}] - ${i[c]};
        if (k < 0)  return constant;
        if (k >= ${e[c]}) return constant;
        offset += k * ${r[c]};
        `;return`
      float padA(int m[${s}]) {
        const float constant = float(${a});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},jI=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${r[u]};
        `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `},XI=(n,e,r,t,o,i)=>{let a=e.length,s="";for(let u=a-1;u>=0;--u)s+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${r[u]};
      `;return`
      float padA(int m[${a}]) {
        int offset = 0;
        int k = 0;
        ${s}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${n.texture2D}(A, coords));
        return value;
      }
      `}});var tb,rb,nb,ob,ib,ab,sb,ub,lb,ZI,eb,cb,Di,fb,ki,JI,db=E(()=>{"use strict";ct();ze();Oe();tb=(n,e,r)=>{Di(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>nb(e,t,!1,r)},e)]},rb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInt("count_include_pad",0)!==0,o=n.attributes.getInts("kernel_shape"),i=n.attributes.getInts("strides",[]),a=n.attributes.getInts("pads",[]);if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return Ie({autoPad:e,ceilMode:r,countIncludePad:t,kernelShape:o,strides:i,pads:a})},nb=(n,e,r,t)=>{let[o,i]=lb(n,t,r),a=ne.size(o.kernelShape),s="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${a});`:u+=`value /= float(${a} - pad);`;let f=`
        ${fb(n[0].dims,o,s,u,"0.0")}
      `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:f}},ob=(n,e,r)=>{Di(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${r.countIncludePad}`};return[n.run({...t,get:()=>nb(e,t,!0,r)},e)]},ib=n=>{let e=n.attributes.getInt("count_include_pad",0)!==0;return Ie({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},ab=(n,e,r)=>{Di(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:r.cacheKey};return[n.run({...t,get:()=>ub(e,t,!1,r)},e)]},sb=n=>{let e=n.attributes.getString("auto_pad","NOTSET"),r=n.attributes.getInt("ceil_mode",0),t=n.attributes.getInts("kernel_shape"),o=n.attributes.getInts("strides",[]),i=n.attributes.getInts("pads",[]),a=n.attributes.getInt("storage_order",0),s=n.attributes.getInts("dilations",[]);if(a!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return Ie({autoPad:e,ceilMode:r,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:a,dilations:s})},ub=(n,e,r,t)=>{let[o,i]=lb(n,t,r),c=`
      ${fb(n[0].dims,o,`
      value = max(_X(x), value);
    `,"","-1e5")}
    `;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:c}},lb=(n,e,r)=>{let t=n[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),a=e.strides.slice(),s=o?e.dilations.slice():[],u=e.pads.slice();Qr.adjustPoolAttributes(r,t,i,a,s,u);let c=Qr.computePoolOutputShape(r,t,a,s,i,u,e.autoPad),f=Object.assign({},e);return o?Object.assign(f,{kernelShape:i,strides:a,pads:u,dilations:s,cacheKey:e.cacheKey}):Object.assign(f,{kernelShape:i,strides:a,pads:u,cacheKey:e.cacheKey}),[f,c]},ZI={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},eb={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},cb=(n,e)=>(Di(e),[n.run({...eb,get:()=>ub(e,eb,!0,ZI)},e)]),Di=n=>{if(!n||n.length!==1)throw new Error("Pool ops requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.")},fb=(n,e,r,t,o)=>{let i=n.length;if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],s=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],f=n[i-1],p="",m="",g="";if(u+c!==0?p=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${f}) {
              pad++;
              continue;
            }
            ${r}
          }`:p=`
          for (int i = 0; i < ${a}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${s} - ${u} + i;
            ${r}
          }`,e.kernelShape.length===2){let x=e.kernelShape[e.kernelShape.length-2],v=e.strides[e.strides.length-2],T=e.pads[e.pads.length/2-2],w=e.pads[e.pads.length-2],I=n[i-2];T+w!==0?m=`
            for (int j = 0; j < ${x}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${v} - ${T} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${I}) {
                pad+= ${a};
                continue;
              }
          `:m=`
            for (int j = 0; j < ${x}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${v} - ${T} + j;
            `,g=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${m}
          ${p}
          ${g}
          ${t}
          return value;
        }
      `}else{let a=ne.size(e.kernelShape),s=ne.computeStrides(e.kernelShape),u=s.length,c=e.pads.length,f=JI(u),p=ki(n,"inputDims"),m=ki(e.pads,"pads"),g=ki(s,"kernelStrides"),y=ki(e.strides,"strides"),x=e.pads.reduce((w,I)=>w+I),v="";return x?v=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${r}
          }`:v=`
          }
          ${r}
        `,`
        ${f}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${c}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${m}
          ${p}
          ${y}
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
              ${v}
          }
          ${t}

          return value;
        }
      `}},ki=(n,e)=>{let r="";for(let t=0;t<n.length;t++)r+=`
      ${e}[${t}] = ${n[t]};
    `;return r},JI=n=>`
  void offsetToIndices(int offset, int[${n}] strides, out int[${n}] indices) {
    if (${n} == 0) {
      return;
    }
    for (int i = 0; i < ${n} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${n} - 1] = offset;
  }`});var sn,Dr,YI,QI,pb,mb,hb,bb,gb,yb,_b,xb=E(()=>{"use strict";ct();Po();ze();Oe();sn=(n,e,r,t,o)=>{QI(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[n.run({...i,cacheHint:r.cacheKey,get:()=>YI(n,e,r,t,o,i)},e)]},Dr=n=>{let e=n.attributes.getInts("axes",[]),r=n.attributes.getInt("keepdims",1)===1;return Ie({axes:e,keepDims:r})},YI=(n,e,r,t,o,i)=>{let a=[],s=e[0].dims.length||1,u=[],c=ne.normalizeAxes(r.axes,e[0].dims.length),f=o(e,c),p=f[1];for(let y=0;y<e[0].dims.length;y++)c.indexOf(y)>=0||c.length===0?(r.keepDims&&a.push(1),p=`
          for(int j${y} = 0; j${y} < ${e[0].dims[y]}; j${y}++) {
            inputIdx[${y}] = j${y};
            ${p}
          }`):(u.push(`inputIdx[${y}] = outputIdx[${a.length}];`),a.push(e[0].dims[y]));let g=`
      float process(int outputIdx[${a.length||1}]) {
        float value;                 // final result
        int inputIdx[${s}];      // addressing input data
        ${u.join(`
`)}
        ${f[0]}       // init ops for reduce max/min
        ${p}
        ${f[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:a,type:e[0].type,textureType:0},shaderSource:g}},QI=n=>{if(!n||n.length!==1)throw new Error("Reduce op requires 1 input.");if(kr.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},pb=(n,e,r)=>sn(n,e,r,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),mb=(n,e,r)=>sn(n,e,r,"ReduceMean",(o,i)=>{let a=1;for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=o[0].dims[s]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${a}.;`]}),hb=(n,e,r)=>sn(n,e,r,"ReduceMax",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),bb=(n,e,r)=>sn(n,e,r,"ReduceMin",(o,i)=>{let a=[];for(let s=0;s<o[0].dims.length;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`inputIdx[${s}] = 0;`);return[`${a.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),gb=(n,e,r)=>sn(n,e,r,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),yb=(n,e,r)=>sn(n,e,r,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),_b=(n,e,r)=>sn(n,e,r,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var Tb,wb=E(()=>{"use strict";ze();Tb=(n,e)=>{let r=ne.calculateReshapedDims(e[0].dims,e[1].integerData);return n.session.pack?[n.reshapePacked(e[0],r)]:[n.reshapeUnpacked(e[0],r)]}});var vb,Mu,Ib,Sb,Co,eS,Vu,Bi,Fu=E(()=>{"use strict";ct();Xe();Oe();vb={name:"Upsample",inputNames:["X"],inputTypes:[0]},Mu=(n,e,r)=>(Vu(e,r),[n.run({...vb,cacheHint:r.cacheKey,get:()=>eS(n,e,r)},e)]),Ib=n=>Co(n,7),Sb=n=>Co(n,9),Co=(n,e)=>{let r=e>=10,t=n.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=n.attributes.getFloats("scales"),Bi(o,t,r));let i=n.attributes.getFloat("extrapolation_value",0),a=e>10?n.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(a)===-1)throw new Error(`coordinate_transform_mode '${a}' is not supported`);let s=a==="tf_crop_and_resize",u=s,c=t==="nearest"&&e>=11?n.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(c)===-1)throw new Error(`nearest_mode '${c}' is not supported`);let f=n.attributes.getFloat("cubic_coeff_a",-.75),p=n.attributes.getInt("exclude_outside",0)!==0;if(p&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let m=e<11?!0:t==="nearest"&&a==="asymmetric"&&c==="floor",g=0,y=0,x=0;return e>10?n.inputs.length>2?(g=1,y=2,x=3):(y=1,x=2):e===9&&(y=1),Ie({opset:e,isResize:r,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:a,useExtrapolation:u,needRoiInput:s,nearestMode:c,cubicCoefficientA:f,excludeOutside:p,useNearest2xOptimization:m,roiInputIdx:g,scalesInputIdx:y,sizesInputIdx:x})},eS=(n,e,r)=>{let t=ae(n.session.backend.glContext.version),[o,i]=n.calculateTextureWidthAndHeight(e[0].dims,0),a=e[0].dims.map((x,v)=>Math.floor(x*r.scales[v])),[s,u]=n.calculateTextureWidthAndHeight(a,0),c=a.length,f=new Array(c),p=new Array(c),m=`
      int output_pitches[${c}];
      int input_pitches[${c}];
      `;for(let x=c-1;x>=0;x--)f[x]=x===c-1?1:f[x+1]*a[x+1],p[x]=x===c-1?1:p[x+1]*e[0].dims[x+1],m+=`
        output_pitches[${x}] = ${f[x]};
        input_pitches[${x}] = ${p[x]};
        `;let g=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,y=r.mode==="nearest"?`
    ${g}
    float process(int indices[${c}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${m}

      int d, m;
      for (int dim = 0; dim < ${c}; ++dim) {
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
    }`:c===4?`
    ${g}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${s}, ${u});

      ${m}

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

      ${m}

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
    }`;return{...vb,output:{dims:a,type:e[0].type,textureType:0},shaderSource:y,variables:[{name:"scales",type:"int",arrayLength:r.scales.length,data:r.scales.map(x=>Math.ceil(x))}]}},Vu=(n,e)=>{if(!n||e.opset<9&&n.length!==1||e.opset>=9&&e.opset<11&&n.length!==2||e.opset>=11&&n.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&n[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(n[0].type==="string")throw new Error("Invalid input tensor types.")},Bi=(n,e,r)=>{if(r){for(let t of n)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of n)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&n.length!==2&&(n.length!==4||n[0]!==1||n[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${r?"Resize":"Upsample"} opeartor.`)}});var Uu,Gu,$b,Ab,tS,rS,nS,oS,Ob=E(()=>{"use strict";Xe();Oe();tr();nn();Fu();Uu={name:"Resize",inputNames:["A"],inputTypes:[2]},Gu=(n,e,r)=>(Vu(e,r),[n.run({...Uu,cacheHint:r.cacheKey,get:()=>tS(n,e,r)},e)]),$b=n=>Co(n,10),Ab=n=>Co(n,11),tS=(n,e,r)=>{let t=ae(n.session.backend.glContext.version),[o,i]=rS(e,r);if(o.every(I=>I===1)&&r.coordinateTransformMode!=="tf_crop_and_resize")return{...Uu,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let s=i.length;if(s<2)throw new Error(`output dimension should be at least 2, but got ${s}`);let u=i[s-2],c=i[s-1],f=e[0].dims;if(s!==f.length)throw new Error(`output dimension should match input ${f.length}, but got ${s}`);let p=f[s-2],m=f[s-1],g=o[s-2],y=o[s-1],x="";if(r.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${r.mode}'`);switch(r.coordinateTransformMode){case"asymmetric":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${c}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${c}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":x=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${c}.0 - 1.0, ${u}.0 - 1.0, ${c}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${m}.0 - 1.0, ${p}.0 - 1.0, ${m}.0 - 1.0,
                            ${p}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${r.coordinateTransformMode}'`)}let v=bt(s),T=rr(),w=`
            const vec2 inputWH = vec2(${p}.0, ${m}.0);
            const vec4 scaleWHWH = vec4(float(${g}), float(${y}), float(${g}), float(${y}));
            ${T}
            ${x}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${v} rc = getOutputCoords();

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
                bool hasNextCol = rc.z < ${c-1};

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
        `;return{...Uu,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:w}},rS=(n,e)=>{let t=n[0].dims,o=e.scales,i;if(o.length===0){let s=n[e.scalesInputIdx];if(s&&s.size!==0){if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=nS(s,e.mode,e.isResize)}else{let u=n[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=oS(i,t,e.mode,e.isResize)}}else if(n[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let a=i||t.map((s,u)=>Math.floor(s*o[u]));return[o,a]},nS=(n,e,r)=>{let t=Array.from(n.floatData);return Bi(t,e,r),t},oS=(n,e,r,t)=>{let o=e.length,i=new Array(o);for(let a=0,s=o;a<s;a++)if(e[a]===0){if(n[a]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[a]=1}else i[a]=n[a]/e[a];return Bi(i,r,t),i}});var Pb,iS,Cb=E(()=>{"use strict";rn();Pb=(n,e)=>(iS(e),[new ot([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),iS=n=>{if(!n||n.length!==1)throw new Error("Shape requires 1 input.")}});var Wu,Eb,kb,Db,aS,Bb,sS,uS,Nb=E(()=>{"use strict";ct();Po();ze();Oe();Wu={name:"Slice",inputNames:["A"],inputTypes:[0]},Eb=(n,e,r)=>(aS(e),[n.run({...Wu,cacheHint:r.cacheKey,get:()=>Db(n,e[0],r)},e)]),kb=n=>{let e=n.attributes.getInts("starts"),r=n.attributes.getInts("ends"),t=n.attributes.getInts("axes",[]);return Ie({starts:e,ends:r,axes:t})},Db=(n,e,r)=>{let t=r.axes.length===0?e.dims.slice(0).map((p,m)=>m):r.axes,o=ne.normalizeAxes(t,e.dims.length),i=r.starts.map((p,m)=>p>e.dims[o[m]]-1?e.dims[o[m]]:ne.normalizeAxis(p,e.dims[o[m]])),a=r.ends.map((p,m)=>p>e.dims[o[m]]-1?e.dims[o[m]]:ne.normalizeAxis(p,e.dims[o[m]])),s=e.dims.slice(),u=[];for(let p=0;p<o.length;p++)s[o[p]]=a[p]-i[p],i[p]>0&&u.push(`outputIdx[${o[p]}] += ${i[p]};`);let f=`
      float process(int outputIdx[${s.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...Wu,output:{dims:s,type:e.type,textureType:0},shaderSource:f}},aS=n=>{if(!n||n.length!==1)throw new Error("Slice requires 1 input.");if(kr.indexOf(n[0].type)===-1)throw new Error("Invalid input type.")},Bb=(n,e)=>{uS(e);let r=sS(n,e);return[n.run({...Wu,cacheHint:r.cacheKey,get:()=>Db(n,e[0],r)},[e[0]])]},sS=(n,e)=>{if(!n.session.isInitializer(e[1].dataId)||!n.session.isInitializer(e[2].dataId)||e.length>=4&&!n.session.isInitializer(e[3].dataId)||e.length>=5&&!n.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(a=>a!==1))throw new Error("currently non-1 steps is not supported for Slice");let r=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${r};${t}`;return{starts:r,ends:t,axes:o,cacheKey:i}},uS=n=>{if(!n||n.length<3||n.length>5)throw new Error("Invalid input number.");if(n[1].type!=="int32"||n[1].dims.length!==1)throw new Error("Invalid input type.");if(n[2].type!=="int32"||n[2].dims.length!==1)throw new Error("Invalid input type.");if(n.length>=4&&(n[3].type!=="int32"||n[3].dims.length!==1))throw new Error("Invalid input type.");if(n.length>=5&&(n[4].type!=="int32"||n[4].dims.length!==1))throw new Error("Invalid input type.")}});var Rb,zb,Lb,Mb,Vb,Fb,Ub,Gb,lS,cS,fS,Wb,Hb=E(()=>{"use strict";ct();ze();Xe();Oe();Ei();Rb={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},zb={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Lb={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Mb=(n,e,r)=>{Wb(e);let t=e[0].dims.slice(),o=ne.normalizeAxis(r.axis,t.length),i=ne.sizeToDimension(t,o),a=ne.sizeFromDimension(t,o);return Gb(n,e,r,i,a)},Vb=n=>Ie({axis:n.attributes.getInt("axis",1)}),Fb=n=>Ie({axis:n.attributes.getInt("axis",-1)}),Ub=(n,e,r)=>{Wb(e);let t=e[0].dims.slice(),o=ne.normalizeAxis(r.axis,t.length),i=t.length,a=o!==i-1,s=[],u=[],c=[],f;a&&(u=Array.from({length:i}).map((y,x)=>x),u[o]=i-1,u[i-1]=o,u.map(y=>s.push(t[y])),f=Ie({perm:u}),c=an(n,e,f));let p=a?ne.sizeToDimension(s,i-1):ne.sizeToDimension(t,i-1),m=a?ne.sizeFromDimension(s,i-1):ne.sizeFromDimension(t,i-1),g=Gb(n,a?c:e,r,p,m);return a?an(n,g,f):g},Gb=(n,e,r,t,o)=>{let i=lS(n,e[0],t,o,[t]),a=n.run({...Rb,cacheHint:r.cacheKey,get:()=>i},e),s=cS(n,e[0],t,o,i.output.dims,[t]),u=n.run({...zb,cacheHint:r.cacheKey,get:()=>s},[e[0],a]),c=fS(n,e[0],t,o,i.output.dims,s.output.dims);return[n.run({...Lb,cacheHint:r.cacheKey,get:()=>c},[e[0],a,u])]},lS=(n,e,r,t,o)=>{let[i,a]=n.calculateTextureWidthAndHeight(e.dims,0),s=o.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==r)throw new Error("Shape of the output should be equal to logical row count");let u=ae(n.session.backend.glContext.version),c=`
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
      }`;return{...Rb,output:{dims:o,type:e.type,textureType:0},shaderSource:c}},cS=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==r)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let c=ae(n.session.backend.glContext.version),f=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${c.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${a}, ${s}))) - max);
        }

        return norm_factor;
      }`;return{...zb,output:{dims:i,type:e.type,textureType:0},shaderSource:f}},fS=(n,e,r,t,o,i)=>{let[a,s]=n.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(r<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==r||i[0]!==r)throw new Error("Shape of the intermediate results should be equal to logical row count");let c=`
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
    }`;return{...Lb,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:c}},Wb=n=>{if(!n||n.length!==1)throw new Error("Softmax requires 1 input.");if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type")}});var qb,Kb,jb,dS,pS,mS,Xb=E(()=>{"use strict";ct();ze();Oe();qb={name:"Split",inputNames:["A"],inputTypes:[0]},Kb=(n,e,r)=>{mS(e);let t=ne.normalizeAxis(r.axis,e[0].dims.length),o=dS(n,e,t,r),i=[];for(let a=0;a<o;++a)i.push(n.run({...qb,cacheHint:`${r.cacheKey};${a}`,get:()=>pS(n,e[0],r,t,a)},e));return i},jb=n=>{let e=n.attributes.getInt("axis",0),r=n.attributes.getInts("split",[]),t=n.outputs.length;return Ie({axis:e,split:r,numOutputs:t})},dS=(n,e,r,t)=>{let[,o]=vo.splitShape(e[0].dims,r,t.split,t.numOutputs);return o.length},pS=(n,e,r,t,o)=>{let[i,a]=vo.splitShape(e.dims,t,r.split,r.numOutputs),s=a[o],u=i[o],f=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${s};
        return _A(indices);
      }
    `;return{...qb,cacheHint:`${r.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:f}},mS=n=>{if(!n||n.length!==1)throw new Error("Split requires one input.");if(n[0].type!=="int8"&&n[0].type!=="uint8"&&n[0].type!=="int16"&&n[0].type!=="uint16"&&n[0].type!=="int32"&&n[0].type!=="uint32"&&n[0].type!=="float32"&&n[0].type!=="float64"&&n[0].type!=="bool")throw new Error("Invalid input type.")}});var Hu,Zb,Jb,hS,bS,Yb=E(()=>{"use strict";ze();Hu=(n,e,r)=>{hS(e);let t=ne.squeezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},Zb=(n,e)=>(bS(e),Hu(n,[e[0]],Array.from(e[1].integerData))),Jb=n=>n.attributes.getInts("axes"),hS=n=>{if(!n||n.length!==1)throw new Error("Squeeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},bS=n=>{if(!n||n.length!==2)throw new Error("Squeeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var Qb,gS,yS,eg=E(()=>{"use strict";Xe();Oe();Qb=(n,e)=>{yS(e);let r={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[n.run({...r,get:()=>gS(n,e,r)},e)]},gS=(n,e,r)=>{let t=ae(n.session.backend.glContext.version),o=e[0].dims.slice(),a=`
      void main() {
        vec4 result = ${e.map((s,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:a}},yS=n=>{if(!n||n.length===0)throw new Error("Sum requires inputs.");let e=n[0].dims.length;for(let r=1;r<n.length;r++){if(e!==n[r].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(n[0].dims[t]!==n[r].dims[t])throw new Error("Input shapes are not matched.")}if(n[0].type!=="float32"&&n[0].type!=="float64")throw new Error("Invalid input type.");for(let r=1;r<n.length;r++)if(n[0].type!==n[r].type)throw new Error("Input types are not matched.")}});var tg,_S,xS,rg=E(()=>{"use strict";Po();Oe();tg=(n,e)=>{xS(e);let r={name:"Tile",inputNames:["A"],inputTypes:[0]};return[n.run({...r,get:()=>_S(n,e,r)},e)]},_S=(n,e,r)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let a=o.length,s=`
      float process(int outputIdx[${a}]) {
        int inputIdx[${a}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...r,output:{dims:o,type:e[0].type,textureType:0},shaderSource:s}},xS=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 input.");if(n[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(n[1].dims[0]!==n[0].dims.length)throw new Error("Invalid input shape.");if(kr.indexOf(n[0].type)===-1)throw new Error("Invalid input type.");if(n[1].type!=="int32"&&n[1].type!=="int16")throw new Error("Invalid repeat type.")}});var qu,ng,og,TS,wS,ig=E(()=>{"use strict";ze();qu=(n,e,r)=>{TS(e);let t=ne.unsqueezeShape(e[0].dims,r);return[n.reshapeUnpacked(e[0],t)]},ng=(n,e)=>(wS(e),qu(n,[e[0]],Array.from(e[1].integerData))),og=n=>n.attributes.getInts("axes"),TS=n=>{if(!n||n.length!==1)throw new Error("Unsqueeze requires 1 input.");if(n[0].type==="string")throw new Error("invalid input tensor types.")},wS=n=>{if(!n||n.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(n[1].type!=="int32")throw new Error("Invalid input type.")}});var ag,sg=E(()=>{"use strict";gm();Cm();Dm();Mm();Oi();wh();Oh();Eh();Bh();Lh();Fh();Hh();Xh();Pi();Qh();db();xb();wb();Ob();Cb();Nb();Hb();Xb();Yb();eg();rg();Ei();Pu();ig();Fu();ag=[["Abs","","6+",Vm],["Acos","","7+",Fm],["Add","","7+",ym],["And","","7+",_m],["Asin","","7+",Um],["Atan","","7+",Gm],["AveragePool","","7+",tb,rb],["BatchNormalization","","7+",hm,bm],["Cast","","6+",Em,km],["Ceil","","6+",qm],["Clip","","6-10",Au,Wm],["Clip","","11+",Hm],["Concat","","4+",Rm,Lm],["Conv","","1+",Nu,Ru],["ConvTranspose","","1+",xh,Th],["Cos","","7+",Km],["Div","","7+",xm],["Dropout","","7+",Ou],["DepthToSpace","","1+",$h,Ah],["Equal","","7+",Tm],["Elu","","6+",jm,Xm],["Exp","","6+",Zm],["Flatten","","1+",Ph,Ch],["Floor","","6+",Jm],["FusedConv","com.microsoft","1+",Nu,Ru],["Gather","","1+",kh,Dh],["Gemm","","7-10",zu,Rh],["Gemm","","11+",zu,zh],["GlobalAveragePool","","1+",ob,ib],["GlobalMaxPool","","1+",cb],["Greater","","7+",wm],["Identity","","1+",Ou],["ImageScaler","","1+",Mh,Vh],["InstanceNormalization","","6+",Gh,Wh],["LeakyRelu","","6+",Ym,Qm],["Less","","7+",vm],["LRN","","1+",qh,Kh],["Log","","6+",eh],["MatMul","","1+",ph,mh],["MaxPool","","1+",ab,sb],["Mul","","7+",Im],["Neg","","6+",th],["Not","","1+",rh],["Or","","7+",Sm],["Pad","","2-10",Lu,Zh],["Pad","","11+",Jh,Yh],["Pow","","7+",$m],["PRelu","","7+",Am],["ReduceLogSum","","1+",yb,Dr],["ReduceMax","","1+",hb,Dr],["ReduceMean","","1+",mb,Dr],["ReduceMin","","1+",bb,Dr],["ReduceProd","","1+",gb,Dr],["ReduceSum","","1-12",pb,Dr],["ReduceSumSquare","","1+",_b,Dr],["Relu","","6+",nh],["Reshape","","5+",Tb],["Resize","","10",Gu,$b],["Resize","","11+",Gu,Ab],["Shape","","1+",Pb],["Sigmoid","","6+",oh],["Sin","","7+",ih],["Slice","","10+",Bb],["Slice","","1-9",Eb,kb],["Softmax","","1-12",Mb,Vb],["Softmax","","13+",Ub,Fb],["Split","","2-12",Kb,jb],["Sqrt","","6+",ah],["Squeeze","","1-12",Hu,Jb],["Squeeze","","13+",Zb],["Sub","","7+",Om],["Sum","","6+",Qb],["Tan","","7+",sh],["Tanh","","6+",uh],["Tile","","6+",tg],["Transpose","","1+",an,Ih],["Upsample","","7-8",Mu,Ib],["Upsample","","9",Mu,Sb],["Unsqueeze","","1-12",qu,og],["Unsqueeze","","13+",ng],["Xor","","7+",Pm]]});function lg(n){let e={},r;for(;(r=ug.exec(n))!==null;){let t=r[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[r[2]]={params:t,body:r[4]}}for(let t in e){let o=vS.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(r=i.exec(n))!==null;){let a=r[1],s=r[2],u=r[3].split(","),c=a?`${a} ${s};`:"",f=e[t].body,p="";e[t].params.forEach((g,y)=>{g&&(p+=`${g.type} ${g.name} = ${u[y]};
`)}),f=`${p}
 ${f}`,f=f.replace("return",`${s} = `);let m=`
      ${c}
      {
        ${f}
      }
      `;n=n.replace(r[0],m)}}return n=n.replace(ug,""),n}var ug,vS,cg=E(()=>{"use strict";ug=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,vS="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function Dn(n,e){let r=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:IS(e,n).sort(),a=0;for(let s=0;s<n.length;++s){if(i!=null){if(i[a]===s&&n[s]!==1)throw new Error(`Can't squeeze axis ${s} since its dim '${n[s]}' is not 1`);(i[a]==null||i[a]>s)&&n[s]===1&&(r.push(n[s]),t.push(s)),i[a]<=s&&a++}n[s]!==1&&(r.push(n[s]),t.push(s))}return{newShape:r,keptDims:t}}function IS(n,e){let r=e.length;return n=n==null?e.map((t,o)=>o):[].concat(n),An(n.every(t=>t>=-r&&t<r),()=>`All values in axis param must be in range [-${r}, ${r}) but got axis ${n}`),An(n.every(SS),()=>`All values in axis param must be integers but got axis ${n}`),n.map(t=>t<0?r+t:t)}function SS(n){return n%1===0}function $S(n){if(n.length===0)return 1;let e=n[0];for(let r=1;r<n.length;r++)e*=n[r];return e}function fg(n){let e=Math.ceil(Math.sqrt(n));return[e,Math.ceil(n/e)]}var Ni,Ku=E(()=>{"use strict";Pt();ze();Ni=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,r){let t=this.computeTexture(e,r);return r&&r.isPacked&&(t[0]/=2,t[1]/=2),r&&r.reverseWH?[t[1],t[0]]:t}computeTexture(e,r){let t=r&&r.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(r&&r.breakAxis!==void 0){let s=r.breakAxis>=e.length?1:e.slice(r.breakAxis).reduce((c,f)=>c*f),u=r.breakAxis<=0?1:e.slice(0,r.breakAxis).reduce((c,f)=>c*f);if(s>o||u>o)Le.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${r.breakAxis}`);else return[s,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((s,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=Dn(i).newShape);let a=$S(i);return i.length<=1&&a<=o?[1,a]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?fg(a/4).map(s=>s*2):fg(a)}}});var Ri,dg=E(()=>{"use strict";ze();gr();Xe();Ku();tr();Ri=class extends Dt{constructor(e){super(e)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let e="offsetToCoords";return{offsetToCoords:new Z(`
      vec2 ${e}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let e="coordsToOffset";return{coordsToOffset:new Z(`
      int ${e}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let e=this.context.outputTextureLayout;return e.isPacked?this.getPackedOutputSamplingSnippet(e):this.getUnpackedOutputSamplingSnippet(e)}getPackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputPacked1DCoords(r,t);break;case 2:o[i]=this.getOutputPacked2DCoords(r,t);break;case 3:o[i]=this.getOutputPacked3DCoords(r,t);break;default:o[i]=this.getOutputPackedNDCoords(r,t)}let s=`
      void setOutput(vec4 val) {
        ${ae(this.context.glContext.version).output} = val;
      }
    `,u="floatTextureSetRGBA";return o[u]=new Z(s),o}getUnpackedOutputSamplingSnippet(e){let r=e.unpackedShape,t=[e.width,e.height],o={},i="getOutputCoords";switch(r.length){case 0:o[i]=this.getOutputScalarCoords();break;case 1:o[i]=this.getOutputUnpacked1DCoords(r,t);break;case 2:o[i]=this.getOutputUnpacked2DCoords(r,t);break;case 3:o[i]=this.getOutputUnpacked3DCoords(r,t);break;case 4:o[i]=this.getOutputUnpacked4DCoords(r,t);break;case 5:o[i]=this.getOutputUnpacked5DCoords(r,t);break;case 6:o[i]=this.getOutputUnpacked6DCoords(r,t);break;default:throw new Error(`Unsupported output dimensionality: ${r.length}`)}let s=`
        void setOutput(float val) {
          ${ae(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,u="floatTextureSetR";return o[u]=new Z(s),o}getOutputScalarCoords(){return new Z(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(e,r){let t=r,o="";return t[0]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${t[1]}.0);
          }
        `,new Z(o)):t[1]===1?(o=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${t[0]}.0);
          }
        `,new Z(o)):(o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${t[0]}, ${t[1]}));
          return 2 * (resTexRC.y * ${t[0]} + resTexRC.x);
        }
      `,new Z(o))}getOutputPacked2DCoords(e,r){let t="";if(Yr.arraysEqual(e,r))return t=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${r[0]}, ${r[1]}));
        }
      `,new Z(t);let o=r,i=Math.ceil(e[1]/2);return t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));

          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec2(r, c);
        }
      `,new Z(t)}getOutputPacked3DCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[2]/2),i=o*Math.ceil(e[1]/2),a=`
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
      `;return new Z(a)}getOutputPackedNDCoords(e,r){let t=[r[0],r[1]],o=Math.ceil(e[e.length-1]/2),i=o*Math.ceil(e[e.length-2]/2),a=i,s="",u="b, r, c";for(let f=2;f<e.length-1;f++)a*=e[e.length-f-1],s=`
      int b${f} = index / ${a};
      index -= b${f} * ${a};
    `+s,u=`b${f}, `+u;let c=`
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
    `;return new Z(c)}getOutputUnpacked1DCoords(e,r){let t=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          return resTexRC.y * ${r[0]} + resTexRC.x;
        }
      `;return new Z(t)}getOutputUnpacked2DCoords(e,r){let t=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          int r = index / ${e[1]};
          int c = index - r * ${e[1]};
          return ivec2(r, c);
        }
      `;return new Z(t)}getOutputUnpacked3DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,p=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${p};`}).join("");return t=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec3(r, c, d);
        }
      `,new Z(t)}getOutputUnpacked4DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,p=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${p};`}).join("");return t=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec4(r, c, d, d2);
        }
      `,new Z(t)}getOutputUnpacked5DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,p=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${p};`}).join("");return t=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${r[0]}, ${r[1]}));
          int index = resTexRC.y * ${r[0]} + resTexRC.x;
          ${s}
          return ivec5(r, c, d, d2, d3);
        }
      `,new Z(t)}getOutputUnpacked6DCoords(e,r){let t="",o=e.length,i=null;o<2&&(i=[]),i=new Array(o-1),i[o-2]=e[o-1];for(let u=o-3;u>=0;--u)i[u]=i[u+1]*e[u+1];let a=["r","c","d","d2","d3","d4"],s=i.map((u,c)=>{let f=`int ${a[c]} = index / ${u}`,p=c===i.length-1?`int ${a[c+1]} = index - ${a[c]} * ${u}`:`index -= ${a[c]} * ${u}`;return`${f}; ${p};`}).join("");return t=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${r[0]}, ${r[1]}));
         int index = resTexRC.y * ${r[0]} + resTexRC.x;
         ${s}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new Z(t)}getCommonUtilFuncs(){let e={},r="uvFromFlat";e[r]=new Z(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),r="packedUVfrom1D",e[r]=new Z(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom2D",e[r]=new Z(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="packedUVfrom3D",e[r]=new Z(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),r="sampleTexture";let t=ae(this.context.glContext.version);return e[r]=new Z(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${t.texture2D}(textureSampler, uv).r;
        }`),e}getInputsSamplingSnippets(){let e={},r=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=Ti(t);i.isPacked?e[a]=this.getPackedSamplerFromInput(a,t,i):e[a]=this.getUnpackedSamplerFromInput(a,t,i);let s=Qp(t);i.unpackedShape.length<=r.unpackedShape.length&&(i.isPacked?e[s]=this.getPackedSamplerAtOutputCoords(s,i,r,t):e[s]=this.getUnpackedSamplerAtOutputCoords(s,i,r,t))}),e}getPackedSamplerAtOutputCoords(e,r,t,o){let i=r.unpackedShape,a=t.unpackedShape,u=Ti(o),c=i.length,f=a.length,p=ht.getBroadcastDims(i,a),m=bt(f),g=f-c,y,x=Wt();c===0?y="":f<2&&p.length>=1?y="coords = 0;":y=p.map(z=>`coords.${x[z+g]} = 0;`).join(`
`);let v="";f<2&&c>0?v="coords":v=i.map((z,F)=>`coords.${x[F+g]}`).join(", ");let T="return outputValue;",I=ne.size(i)===1,P=ne.size(a)===1;if(c===1&&!I&&!P)T=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(I&&!P)f===1?T=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:T=`
          return vec4(outputValue.x);
        `;else if(p.length){let z=c-2,F=c-1;p.indexOf(z)>-1&&p.indexOf(F)>-1?T="return vec4(outputValue.x);":p.indexOf(z)>-1?T="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":p.indexOf(F)>-1&&(T="return vec4(outputValue.xx, outputValue.zz);")}let k=`
        int lastDim = coords.${x[f-1]};
        coords.${x[f-1]} = coords.${x[f-2]};
        coords.${x[f-2]} = lastDim;
      `,R=`
      vec4 ${e}() {
        ${m} coords = getOutputCoords();
        ${k}
        ${y}
        vec4 outputValue = ${u}(${v});
        ${T}
      }
    `;return new Z(R,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(e,r,t,o){let i=[t.width,t.height],a=[r.width,r.height],s=r.unpackedShape.length,u=t.unpackedShape.length,c=r.unpackedShape,f=t.unpackedShape,p=Ti(o);if(s===u&&Yr.arraysEqual(a,i)){let I=`
          float ${e}() {
            return sampleTexture(${o}, TexCoords);
          }
        `;return new Z(I,["coordinates.sampleTexture"])}let m=bt(u),g=ht.getBroadcastDims(c,f),y=u-s,x,v=Wt();s===0?x="":u<2&&g.length>=1?x="coords = 0;":x=g.map(I=>`coords.${v[I+y]} = 0;`).join(`
`);let T="";u<2&&s>0?T="coords":T=r.unpackedShape.map((I,A)=>`coords.${v[A+y]}`).join(", ");let w=`
        float ${e}() {
          ${m} coords = getOutputCoords();
          ${x}
          return ${p}(${T});
        }
      `;return new Z(w,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(e,r,t){switch(t.unpackedShape.length){case 0:return this.getPackedSamplerScalar(e,r);case 1:return this.getPackedSampler1D(e,r,t);case 2:return this.getPackedSampler2D(e,r,t);case 3:return this.getPackedSampler3D(e,r,t);default:return this.getPackedSamplerND(e,r,t)}}getUnpackedSamplerFromInput(e,r,t){let o=t.unpackedShape;switch(o.length){case 0:return this.getUnpackedSamplerScalar(e,r,t);case 1:return this.getUnpackedSampler1D(e,r,t);case 2:return this.getUnpackedSampler2D(e,r,t);case 3:return this.getUnpackedSampler3D(e,r,t);case 4:return this.getUnpackedSampler4D(e,r,t);case 5:return this.getUnpackedSampler5D(e,r,t);case 6:return this.getUnpackedSampler6D(e,r,t);default:throw new Error(`Unsupported dimension ${o.length}-D`)}}getPackedSamplerScalar(e,r){let t=ae(this.context.glContext.version),o=`
          vec4 ${e}() {
            return ${t.texture2D}(${r}, halfCR);
          }
        `;return new Z(o)}getPackedSampler1D(e,r,t){let o=[t.width,t.height],i=[o[1],o[0]],a=ae(this.context.glContext.version),u=`vec4 ${e}(int index) {
      vec2 uv = packedUVfrom1D(
      ${i[0]}, ${i[1]}, index);
      return ${a.texture2D}(${r}, uv);
    }`;return new Z(u,["coordinates.packedUVfrom1D"])}getPackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=ae(this.context.glContext.version),s=i[0],u=i[1];if(i!=null&&Yr.arraysEqual(o,i)){let g=`vec4 ${e}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${s}.0);
        return ${a.texture2D}(${r}, uv);
      }`;return new Z(g)}let c=i,f=Math.ceil(o[1]/2),m=`vec4 ${e}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c[1]}, ${c[0]}, ${f}, row, col);
      return ${a.texture2D}(${r}, uv);
    }`;return new Z(m,["coordinates.packedUVfrom2D"])}getPackedSampler3D(e,r,t){let o=t.unpackedShape,i=[t.width,t.height],a=[i[0],i[1]],s=ae(this.context.glContext.version);if(o[0]===1){let y=o.slice(1),x=[1,2],v=On(o,y),T=["b","row","col"],w=JSON.parse(JSON.stringify(t));w.unpackedShape=v;let I=this.getPackedSamplerFromInput(e,r,w),P=`${I.routineBody}
      vec4 ${e}(int b, int row, int col) {
        return ${e}(${Pn(T,x)});
      } `;return new Z(P,I.dependencies)}let u=a[0],c=a[1],f=Math.ceil(o[2]/2),p=f*Math.ceil(o[1]/2),g=`vec4 ${e}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${u}, ${p}, ${f}, b, row, col);
      return ${s.texture2D}(${r}, uv);}`;return new Z(g,["coordinates.packedUVfrom3D"])}getPackedSamplerND(e,r,t){let o=t.unpackedShape,i=o.length,a=[t.width,t.height],s=ae(this.context.glContext.version),u=[a[0],a[1]],c=u[1],f=u[0],p=Math.ceil(o[i-1]/2),m=p*Math.ceil(o[i-2]/2),g="int b, int row, int col",y=`b * ${m} + (row / 2) * ${p} + (col / 2)`;for(let T=2;T<i-1;T++)g=`int b${T}, `+g,m*=o[i-T-1],y=`b${T} * ${m} + `+y;let v=`vec4 ${e}(${g}) {
      int index = ${y};
      int texR = index / ${f};
      int texC = index - texR * ${f};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${f}, ${c});
      return ${s.texture2D}(${r}, uv);
    }`;return new Z(v)}getUnpackedSamplerScalar(e,r,t){let[o,i]=[t.width,t.height];if(o===1&&i===1){let s=`
          float ${e}() {
            return sampleTexture(${r}, halfCR);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}let a=`
        float ${e}() {
          int offset_${r} = coordsToOffset(TexCoords, ${o}, ${i});
          vec2 uv = uvFromFlat(${o}, ${i}, offset_${r});
          return sampleTexture(${r}, uv);
        }
      `;return new Z(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(e,r,t){let o=t.width,i=t.height;if(i===1&&o===1){let s=`
        float ${e}(int index) {
          return sampleTexture(${r}, halfCR);
        }
      `;return new Z(s,["coordinates.sampleTexture"])}if(i===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${o}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}if(o===1){let s=`
          float ${e}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${i}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(s,["coordinates.sampleTexture"])}let a=`
        float ${e}(int index) {
          vec2 uv = uvFromFlat(${o}, ${i}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(e,r,t){let o=t.unpackedShape,i=[t.height,t.width];if(i!=null&&Yr.arraysEqual(o,i)){let m=i[1],g=i[0],y=`
          float ${e}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${m}.0, ${g}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(y,["coordinates.sampleTexture"])}let{newShape:a,keptDims:s}=Dn(o),u=a;if(u.length<o.length){let m=On(o,u),g=JSON.parse(JSON.stringify(t));g.unpackedShape=m;let y=["col","row"],x=`
          ${this.getUnpackedSamplerFromInput(e,r,g).routineBody}
          float ${e}(int row, int col) {
            return ${e}(${Pn(y,s)});
          }
        `;return new Z(x,["coordinates.sampleTexture"])}let c=i[1],f=i[0];if(f===1){let m=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${c}, ${f});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(c===1){let m=`
          float ${e}(int row, int col) {
            int offset_${r} = coordsToOffset(TexCoords, ${c}, ${f});
            float index = dot(vec3(row, col, offset_${r}), vec3(${o[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${f}.0, 0.5);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let p=`
        float ${e}(int row, int col) {
          int index = col * ${o[1]} + row;
          vec2 uv = uvFromFlat(${c}, ${f}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(p,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(e,r,t){let o=t.unpackedShape,i=o[1]*o[2],a=o[2],{newShape:s,keptDims:u}=Dn(o),c=s;if(c.length<o.length){let g=On(o,c),y=["batch","col","row"],x=JSON.parse(JSON.stringify(t));x.unpackedShape=g;let v=this.getUnpackedSamplerFromInput(e,r,x),T=u.reverse(),w=`
          ${v.routineBody}
          float ${e}(int batch, int row, int col) {
            return ${e}(${Pn(y,T)});
          }
        `;return new Z(w,v.dependencies)}let f=t.width,p=t.height,m=`
          float ${e}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${i} + col * ${a} + row;
            vec2 uv = uvFromFlat(${f}, ${p}, index);
            return sampleTexture(${r}, uv);
          }
      `;return new Z(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(e,r,t){let o=t.unpackedShape,i=o[3],a=o[2]*i,s=o[1]*a,u=t.width,c=t.height,f=`
        float ${e}(int row, int col, int depth, int depth2) {
          int index = row * ${s} + col * ${a} +
              depth2 * ${i} + depth;
          vec2 uv = uvFromFlat(${u}, ${c}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(f,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(e,r,t){let o=t.unpackedShape,i=o[4],a=o[3]*i,s=o[2]*a,u=o[1]*s,{newShape:c,keptDims:f}=Dn(o);if(c.length<o.length){let y=On(o,c),x=["row","col","depth","depth2","depth3"],v=JSON.parse(JSON.stringify(t));v.unpackedShape=y;let T=`
          ${this.getUnpackedSamplerFromInput(e,r,v).routineBody}
          float ${e}(int row, int col, int depth, int depth2, int depth3) {
            return ${e}(${Pn(x,f)});
          }
        `;return new Z(T,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let p=t.width,m=t.height,g=`
        float ${e}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${u} + col * ${s} + depth * ${a} +
          depth3 * ${i} + depth2;
          vec2 uv = uvFromFlat(${p}, ${m}, index);
          return sampleTexture(${r}, uv);
        }
      `;return new Z(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(e,r,t){let o=t.unpackedShape,i=o[5],a=o[4]*i,s=o[3]*a,u=o[2]*s,c=o[1]*u,{newShape:f,keptDims:p}=Dn(o);if(f.length<o.length){let x=On(o,f),v=["row","col","depth","depth2","depth3","depth4"],T=JSON.parse(JSON.stringify(t));T.unpackedShape=x;let w=`
            ${this.getUnpackedSamplerFromInput(e,r,T).routineBody}
            float ${e}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${e}(${Pn(v,p)});
            }
          `;return new Z(w,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let m=t.width,g=t.height,y=`
          float ${e}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${c} + col * ${u} + depth * ${s} +
            depth2 * ${a} + depth3 * ${i} + depth4;
            vec2 uv = uvFromFlat(${m}, ${g}, index);
            return sampleTexture(${r}, uv);
          }
        `;return new Z(y,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let e=this.context.outputTextureLayout,r=e.shape.length,t=e.strides,o=e.width,i=e.height,a=[];for(let u=0;u<r-1;++u)a.push(`
        c[${u}] = offset / ${t[u]};`),a.push(`
        offset -= c[${u}] * ${t[u]};`);a.push(`
        c[${r-1}] = offset;`);let s=`
      void toVec(vec2 texCoords, out int c[${r}]) {
        int offset = coordsToOffset(texCoords, ${o}, ${i});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${r}]) {
        ${a.join("")}
      }
    `;return{toVec:new Z(s,["coordinates.coordsToOffset"])}}valueFrom(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t],a=(o.unpackedShape.length>0?o.unpackedShape:o.shape).length,s=`_${r}`;e[s]=new Z(this.getValueFromSingle(r,a,o.width,o.height,!1),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),s=s+"_T",e[s]=new Z(this.getValueFromSingle(r,a,o.width,o.height,!0),[`shapeUtils.indicesToOffset${s}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),e}getValueFromSingle(e,r,t,o,i){let a=`_${e}`;i&&(a=a+"_T");let s=ae(this.context.glContext.version);return`
        float ${a}(int m[${r}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          float value = getColorAsFloat(${s.texture2D}(${e}, coords));
          return value;
        }
        `}getPackedValueFrom(e,r,t,o,i){let a=`_${e}_Pack`;i&&(a=a+"_T");let s=ae(this.context.glContext.version);return`
        vec4 ${a}(int m[${r}]) {
          int offset = indicesToOffset_${e}(m);
          vec2 coords = offsetToCoords(offset, ${t}, ${o});
          return ${s.texture2D}(${e}, coords);
        }
        `}}});var zi,pg=E(()=>{"use strict";gr();zi=class n extends Dt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new Z(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new Z(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new Z(`
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
        `)}}decodeUint8(){let e=n.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new Z(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),r=new Uint32Array(e),t=new Uint8Array(e);if(r[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var Li,mg=E(()=>{"use strict";gr();Xe();Li=class extends Dt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=ae(this.context.glContext.version);return{setFragColor:new Z(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new Z(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var Mi,hg=E(()=>{"use strict";gr();Mi=class n extends Dt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let a=i.length,s=e-a,u=`bcastIndices_${t}`,c="";for(let p=0;p<a;++p)c+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let f=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${c}
        }
        `;r[u]=new Z(f)}}),r}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,r={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let a=i.length,s=e-a,u=`bcastMatmulIndices_${t}`,c="";for(let p=0;p<a-2;++p)c+=`
          realIndices[${p}] = int( mod(float(bcastedIndices[${s+p}]), ${i[p]}.0) );
          `;let f=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${a}]) {
          ${c}
          realIndices[${a-1}] = bcastedIndices[${e-1}];
          realIndices[${a-2}] = bcastedIndices[${e-2}];
        }
        `;r[u]=new Z(f)}}),r}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`indicesToOffset_${r}`;e[s]=new Z(n.indexToOffsetSingle(s,a,i)),s=`indicesToOffset_${r}_T`,e[s]=new Z(n.indexToOffsetSingle(s,a,i.slice().reverse()))}),e}static indexToOffsetSingle(e,r,t){let o="";for(let i=r-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${r}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,a=o.length,s=`offsetToIndices_${r}`;e[s]=new Z(n.offsetToIndicesSingle(s,a,i)),s=`offsetToIndices_${r}_T`,e[s]=new Z(n.offsetToIndicesSingle(s,a,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,r,t){let o=[];for(let i=0;i<r-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${r-1}] = offset;`),`
      void ${e}(int offset, out int indices[${r}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((r,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,a=`incrementIndices_${r}`,s="";for(let c=0;c<i;++c)s+=`
        shape[${c}] = ${o[c]};`;let u=`
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
        `;e[a]=new Z(u)}),e}}});var Vi,bg=E(()=>{"use strict";gr();Vi=class extends Dt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let r=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let a=`${i}Vec`,s="";for(let c=0;c<r;++c)s+=`
          dest[${c}] ${t[i]} src[${c}];
          `;let u=`
        void ${a}(int src[${r}], out int dest[${r}]) {
          ${s}
        }
        `;o[a]=new Z(u)}return o}copyVec(){let r=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<r;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${r}], out int dest[${r}]) {
        ${t}
      }
      `;return{copyVec:new Z(o)}}setVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
        `;return{setVecItem:new Z(o)}}getVecItem(){let r=this.context.outputTextureLayout.shape.length,t=`
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
    `;return{getVecItem:new Z(o)}}}});var ju,gg=E(()=>{"use strict";dg();pg();mg();hg();bg();ju={encoding:zi,fragcolor:Li,vec:Vi,shapeUtils:Mi,coordinates:Ri}});var Fi,yg=E(()=>{"use strict";gr();cg();gg();Xe();Fi=class{constructor(e,r,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Si(e,r,t,o),Object.keys(ju).forEach(a=>{let s=new ju[a](this.context);this.libs[a]=s});let i=this.glslLibRoutineDependencyGraph;for(let a in this.libs){let u=this.libs[a].getFunctions();for(let c in u){let f=a+"."+c,p;i[f]?(p=i[f],p.routineBody=u[c].routineBody):(p=new Oo(f,u[c].routineBody),i[f]=p);let m=u[c].dependencies;if(m)for(let g=0;g<m.length;++g)if(i[m[g]])p.addDependency(i[m[g]]);else{let y=new Oo(m[g]);i[m[g]]=y,p.addDependency(y)}}}}preprocess(){let e=this.context.programInfo,r=e.shaderSource;return this.context.programInfo.hasMain||(r=`${r}
      ${Yp(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),r=lg(r),`${Jp(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(r)}
    ${r}`}getImports(e){let r=this.selectGlslLibRoutinesToBeIncluded(e);if(r.length===0)return"";let t="";for(let o=0;o<r.length;++o)if(r[o].routineBody)t+=r[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${r[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let r=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&r.push(this.glslLibRoutineDependencyGraph[t])}),$i.returnOrderedNodes(r)}getUniforms(e,r){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(r)for(let o of r)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var Ui,_g=E(()=>{"use strict";pt();Pt();yg();Xe();Ui=class{constructor(e,r,t){this.profiler=e;this.glContext=r;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],r)}catch(a){throw Le.error("ProgramManager",e.programInfo.shaderSource),a}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,r,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new Fi(this.glContext,e,r,t),i=o.preprocess(),a=this.compile(i);return{programInfo:e,program:a,uniformLocations:this.getUniformLocations(a,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(a)}})}compile(e){if(!this.vertexShader){Le.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Zp(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}he.debug&&Le.verbose("ProrgramManager",`FragShader:
${e}
`);let r=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,r);return this.glContext.deleteShader(r),t}bindOutput(e){let r=e.width,t=e.height;Le.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${r}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,r,t)}bindAttributes(e){let r=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(r,t),this.attributesBound=!0}bindUniforms(e,r,t){let o=this.glContext.gl,i=0;for(let{name:a,type:s,location:u,arrayLength:c}of e){let f=r.find(p=>p.name===a)?.data;if(s!=="sampler2D"&&!f)throw new Error(`variable '${a}' does not have data defined in program info`);switch(s){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":c?o.uniform1fv(u,f):o.uniform1f(u,f);break;case"int":c?o.uniform1iv(u,f):o.uniform1i(u,f);break;default:throw new Error(`Uniform not implemented: ${s}`)}}}bindTexture(e,r,t){this.glContext.bindTextureToUniform(e.texture,t,r)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,r,t){let o=[];if(r)for(let i of r)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,r){let o=this.glContext.gl.getUniformLocation(e,r);if(o===null)throw new Error(`Uniform ${r} not found.`);return o}getAttribLocation(e,r){return this.glContext.gl.getAttribLocation(e,r)}}});var Gi,xg=E(()=>{"use strict";Pt();$o();Gi=class{constructor(e,r,t,o){this.glContext=e;this.layoutStrategy=r;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,r,t,o){let i=this.toEncoderType(e),a=this.glContext.getEncoder(i,r.channels||1,o);if(r.isPacked&&o===1)throw new Error("not implemented");let s=r.width,u=r.height,c,f;if(this.config.reuseTextures){c=`${s}x${u}_${a.format}_${a.internalFormat}_${a.textureType}`,f=this.inUseTextures.get(c),f||(f=[],this.inUseTextures.set(c,f));let m=this.idleTextures.get(c);if(m&&m.length>0){let g=m.pop();return f.push(g),o===1&&this.glContext.updateTexture(g,s,u,a,this.toTextureData(e,t)),g}}Le.verbose("TextureManager",`Creating new texture of size ${r.width}x${r.height}`);let p=this.glContext.allocateTexture(s,u,a,this.toTextureData(e,t));return this.config.reuseTextures&&(f.push(p),this.textureLookup.set(p,c)),p}readTexture(e,r,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((a,s)=>a*s)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(r),t);return this.toTensorData(r,i)})}async readTextureAsync(e,r,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(a=>i?.push(a))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((c,f)=>c*f)*t;await this.glContext.createAndWaitForFence();let a=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(r),t),s=this.toTensorData(r,a),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(c=>c(s)),s})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let r=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,r*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,r)})}releaseTexture(e,r){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){r&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let a=this.idleTextures.get(t);a||(a=[],this.idleTextures.set(t,a)),a.push(e.texture)}}}(!t||r)&&(Le.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,r){switch(e){case"int16":return r instanceof Int16Array?r:Int16Array.from(r);case"int32":return r instanceof Int32Array?r:Int32Array.from(r);case"int8":return r instanceof Int8Array?r:Int8Array.from(r);case"uint16":return r instanceof Uint16Array?r:Uint16Array.from(r);case"uint32":return r instanceof Uint32Array?r:Uint32Array.from(r);case"uint8":case"bool":return r instanceof Uint8Array?r:Uint8Array.from(r);case"float32":return r instanceof Float32Array?r:Float32Array.from(r);case"float64":return r instanceof Float64Array?r:Float64Array.from(r);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,r){if(r)return r instanceof Float32Array?r:new Float32Array(r)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var Wi,Tg=E(()=>{"use strict";Pt();Ed();pm();sg();_g();Ku();xg();Wi=class{constructor(e,r){this.backend=e;this.context=r;this.layoutStrategy=new Ni(e.glContext.maxTextureSize),this.programManager=new Ui(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new Gi(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Ii(this)}onGraphInitialized(e){let r=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(r)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,r){return r?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,r,t=!1){Le.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,r):this.unpackedTextureDataCache.set(e,r)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,r,t){let o=Cd(e,r,ag);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function AS(n){let e=0;for(;e<n.length&&n[e]();++e);return e-1}var Eo,wg=E(()=>{"use strict";pt();$o();$o();tr();Eo=class{constructor(e,r){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=r,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,r,t,o){let i=this.gl,a=i.createTexture();i.bindTexture(i.TEXTURE_2D,a),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let s=o?t.encode(o,e*r):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,r,0,t.format,t.textureType,s),this.checkError(),a}updateTexture(e,r,t,o,i){let a=this.gl;a.bindTexture(a.TEXTURE_2D,e);let s=o.encode(i,r*t);a.texSubImage2D(a.TEXTURE_2D,0,0,0,r,t,o.format,o.textureType,s),this.checkError()}attachFramebuffer(e,r,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,r,t),o.scissor(0,0,r,t)}readTexture(e,r,t,o,i,a){let s=this.gl;a||(a=1),this.frameBufferBound||this.attachFramebuffer(e,r,t);let u=this.getEncoder(i,a),c=u.allocate(r*t);return s.bindTexture(s.TEXTURE_2D,e),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),s.readPixels(0,0,r,t,s.RGBA,u.textureType,c),this.checkError(),u.decode(c,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,r){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),r!==-1&&(t.vertexAttribPointer(r,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(r)),this.checkError()}createProgram(e,r){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,r),t.linkProgram(o),o}compileShader(e,r){let t=this.gl,o=t.createShader(r);if(!o)throw new Error(`createShader() returned null with type ${r}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,r,t){let o=this.gl;o.activeTexture(o.TEXTURE0+r),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,r),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(he.debug){let e=this.gl,r=e.getError(),t="";switch(r){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${r.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,r,t=0){if(this.version===2)return new wi(this.gl,r);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new So(this.gl,r):new So(this.gl,r,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new vi(this.gl,r);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let r=0;r<this.maxTextureImageUnits;++r)e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,r=e.createBuffer();if(!r)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),r}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(r),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,r,t,o,i,a;try{r=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,r);let s=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,s,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),a=e.createProgram(),!a)?!1:(e.attachShader(a,o),e.attachShader(a,i),e.linkProgram(a),e.useProgram(a),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),a&&e.deleteProgram(a),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),r&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(r))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(r.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,r=this.disjointTimerQueryWebgl2Extension;e.endQuery(r.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let r=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;r=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return r&&!t}getTimerResult(e){let r=0;if(this.version===2){let t=this.gl;r=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return r/1e6}async waitForQueryAndGetTime(e){return await _u(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let r,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?r=()=>!0:r=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:r}}async pollFence(e){return new Promise(r=>{this.addItemToPoll(()=>e.isFencePassed(),()=>r())})}pollItems(){let e=AS(this.itemsToPoll.map(r=>r.isDoneFn));for(let r=0;r<=e;++r){let{resolveFn:t}=this.itemsToPoll[r];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,r){this.itemsToPoll.push({isDoneFn:e,resolveFn:r}),!(this.itemsToPoll.length>1)&&await _u(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function Xu(n){let e;if((!n||n==="webgl2")&&"webgl2"in Bn?e=Bn.webgl2:(!n||n==="webgl")&&"webgl"in Bn&&(e=Bn.webgl),!e)try{let t=PS();e=vg(t,n)}catch{let o=OS();e=vg(o,n)}n=n||e.version===1?"webgl":"webgl2";let r=e.gl;return Bn[n]=e,r.isContextLost()?(delete Bn[n],Xu(n)):(r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.BLEND),r.disable(r.DITHER),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SAMPLE_COVERAGE),r.enable(r.SCISSOR_TEST),r.enable(r.CULL_FACE),r.cullFace(r.BACK),e)}function vg(n,e){let r={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=r;if((!e||e==="webgl2")&&(t=n.getContext("webgl2",o),t))try{return new Eo(t,2)}catch(i){Le.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=n.getContext("webgl",o)||n.getContext("experimental-webgl",o),t))try{return new Eo(t,1)}catch(i){Le.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function OS(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let n=document.createElement("canvas");return n.width=1,n.height=1,n}function PS(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var Bn,Ig=E(()=>{"use strict";Pt();wg();Bn={}});var Hi,Sg=E(()=>{"use strict";pt();Pt();Tg();Ig();Hi=class{get contextId(){return he.webgl.contextId}set contextId(e){he.webgl.contextId=e}get matmulMaxBatchSize(){return he.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){he.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return he.webgl.textureCacheMode}set textureCacheMode(e){he.webgl.textureCacheMode=e}get pack(){return he.webgl.pack}set pack(e){he.webgl.pack=e}get async(){return he.webgl.async}set async(e){he.webgl.async=e}initialize(){try{return this.glContext=Xu(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),Le.setWithEnv(he),he.webgl.context||Object.defineProperty(he.webgl,"context",{value:this.glContext.gl}),Le.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return Le.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new Wi(this,e)}dispose(){this.glContext.dispose()}}});async function Zu(n){if(n){let e=typeof n=="string"?[n]:n;for(let r of e){let t=$g.get(r);if(t)return t;let o=await ES(r);if(o)return o}}else return Zu(["webgl"]);throw new Error("no available backend to use")}async function ES(n){let e=CS;if(typeof e[n]<"u"&&kS(e[n])){let r=e[n],t=r.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return $g.set(n,r),r}}function kS(n){let e=n;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var $g,CS,Ag=E(()=>{"use strict";Sg();$g=new Map,CS={webgl:new Hi}});var Ju,qi,Og=E(()=>{"use strict";Pt();Ju=class{constructor(e,r){this.op=e;this.node=r}},qi=class{constructor(e,r,t){this.graph=e;this.profiler=t;this.initialize(r)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let r=this.graph.getNodes();if(r.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new Ju(t,r[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let a of t.node.inputs)if(!this._values[a]&&this.graph.getInputIndices().indexOf(a)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,r){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(r.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${r.length} expected: ${o.length}`);r.forEach((f,p)=>{let m=o[p];this._values[m]=f});let i=this._starter.slice(0),a=this.graph.getValues(),s=this.graph.getNodes(),u=0;for(;u<i.length;){let f=i[u++],p=this._ops[f],m=p.node.inputs.map(v=>this._values[v]);if(m.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${p.node}`);let g=m;Le.verbose("ExecPlan",`Running op:${p.node.name} (${g.map((v,T)=>`'${p.node.inputs[T]}': ${v.type}[${v.dims.join(",")}]`).join(", ")})`);let y=await this.profiler.event("node",p.node.name,async()=>p.op.impl(t,g,p.op.context));if(y.length!==p.node.outputs.length)throw new Error("the size of output does not match model definition.");y.forEach((v,T)=>{let w=p.node.outputs[T];if(this._values[w])throw new Error(`output [${w}] already has value: op:${p.node.name}`);this._values[w]=v});let x=new Set;y.forEach((v,T)=>{let w=p.node.outputs[T];for(let I of a[w].to){let A=s[I],P=!0;for(let k of A.inputs)if(!this._values[k]){P=!1;break}P&&x.add(I)}}),i.push(...x)}let c=[];for(let f=0;f<this.graph.getOutputIndices().length;f++){let p=this.graph.getOutputIndices()[f],m=this._values[p];if(m===void 0)throw new Error(`required output [${p}] does not have value`);p===0?await m.getData():m.data,c.push(m)}return Le.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),c})}}});var $e,ko,Pg=E(()=>{"use strict";_o();$e=yn($n());rn();ze();ko=class n{constructor(e){if(this._attributes=new Map,e!=null){for(let r of e)r instanceof $e.onnx.AttributeProto?this._attributes.set(r.name,[n.getValue(r),n.getType(r)]):r instanceof Or&&this._attributes.set(r.name(),[n.getValue(r),n.getType(r)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,r,t){this._attributes.set(e,[t,r])}delete(e){this._attributes.delete(e)}getFloat(e,r){return this.get(e,"float",r)}getInt(e,r){return this.get(e,"int",r)}getString(e,r){return this.get(e,"string",r)}getTensor(e,r){return this.get(e,"tensor",r)}getFloats(e,r){return this.get(e,"floats",r)}getInts(e,r){return this.get(e,"ints",r)}getStrings(e,r){return this.get(e,"strings",r)}getTensors(e,r){return this.get(e,"tensors",r)}get(e,r,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==r)throw new Error(`type mismatch: expected ${r} but got ${o[1]}`);return o[0]}static getType(e){let r=e instanceof $e.onnx.AttributeProto?e.type:e.type();switch(r){case $e.onnx.AttributeProto.AttributeType.FLOAT:return"float";case $e.onnx.AttributeProto.AttributeType.INT:return"int";case $e.onnx.AttributeProto.AttributeType.STRING:return"string";case $e.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case $e.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case $e.onnx.AttributeProto.AttributeType.INTS:return"ints";case $e.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case $e.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${$e.onnx.AttributeProto.AttributeType[r]}`)}}static getValue(e){let r=e instanceof $e.onnx.AttributeProto?e.type:e.type();if(r===$e.onnx.AttributeProto.AttributeType.GRAPH||r===$e.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(r===$e.onnx.AttributeProto.AttributeType.INT&&xt.isLong(t))return xt.longToNumber(t);if(r===$e.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let a=0;a<o.length;a++){let s=o[a];i[a]=xt.longToNumber(s)}return i}if(r===$e.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof $e.onnx.AttributeProto?ot.fromProto(t):ot.fromOrtTensor(t);if(r===$e.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof $e.onnx.AttributeProto)return t.map(i=>ot.fromProto(i));if(e instanceof Or)return t.map(i=>ot.fromOrtTensor(i))}return r===$e.onnx.AttributeProto.AttributeType.STRING&&e instanceof $e.onnx.AttributeProto?Io(t):r===$e.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof $e.onnx.AttributeProto?t.map(Io):t}static getValueNoCheck(e){return e instanceof $e.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case $e.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case $e.onnx.AttributeProto.AttributeType.INT:return e.i;case $e.onnx.AttributeProto.AttributeType.STRING:return e.s;case $e.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case $e.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case $e.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case $e.onnx.AttributeProto.AttributeType.INTS:return e.ints;case $e.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case $e.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case $e.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${$e.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case 1:return e.f();case 2:return e.i();case 3:return e.s();case 4:return e.t();case 5:return e.g();case 6:return e.floatsArray();case 7:{let r=[];for(let t=0;t<e.intsLength();t++)r.push(e.ints(t));return r}case 8:{let r=[];for(let t=0;t<e.stringsLength();t++)r.push(e.strings(t));return r}case 9:{let r=[];for(let t=0;t<e.tensorsLength();t++)r.push(e.tensors(t));return r}default:throw new Error(`unsupported attribute type: ${Jn[e.type()]}`)}}}});var Qu,el,or,Ki,Yu,Cg=E(()=>{"use strict";Pg();_o();Qu=yn($n());rn();ze();el={from:(n,e)=>new Yu(n,e)},or=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=dt.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},Ki=class{constructor(e,r){e instanceof Qu.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new ko(e.attribute)):e instanceof jr&&(this.name=r??e.name(),this.opType=e.opType(),this.attributes=new ko(dt.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},Yu=class{constructor(e,r){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(r),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof Qu.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof Qt)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(r.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let a=this._allData.push(new or(i))-1;r.set(i.name,a),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let a=r.get(i.name);if(a===void 0){let s=new or;s.type={shape:{dims:dt.tensorDimsFromProto(i.dims)},tensorType:dt.tensorDataTypeFromProto(i.dataType)},a=this._allData.push(s)-1,r.set(i.name,a)}this._allData[a]._from=-1,this._allData[a].tensor=ot.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(r.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let a=this._allData.push(new or(i))-1;r.set(i.name,a),this._allOutputIndices.push(a),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let s=0;;s++){let u=`unnamed_${i.opType}_${s}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let a=this._nodes.push(new Ki(i))-1;t.set(i.name,a)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.output)throw new Error(`missing output for node: ${s.name}`);for(let u of s.output){let c=r.get(u);if(typeof c>"u"&&(c=this._allData.push(new or)-1,r.set(u,c)),a.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,s.opType==="Constant"){if(!s.attribute||s.attribute.length!==1||!s.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!s.output||s.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=ot.fromProto(s.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.node[i];if(!s.input)throw new Error(`missing input for node: ${s.name}`);for(let u of s.input){let c=r.get(u);if(typeof c>"u"){if(u===""&&(s.input.length===3||s.input.length===4)&&s.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${s.name}`)}a.inputs.push(c),this._allData[c]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let r=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let a=e.inputs(i);if(r.has(a))throw new Error(`duplicated input name: ${a}`);for(let s=0;s<e.nodeArgsLength();s++)if(e.nodeArgs(s)?.name()===a){let u=new or;if(e.nodeArgs(s)?.type()?.valueType()!==1)throw new Error("Unexpected value type for the nodeArg.");let f=e.nodeArgs(s).type().value(new In),p=dt.tensorDataTypeFromProto(f.elemType()),m=f.shape(),g=[];for(let x=0;x<m.dimLength();x++)g.push(xt.longToNumber(m.dim(x).value().dimValue()));u.type={shape:{dims:g},tensorType:p};let y=this._allData.push(u)-1;r.set(a,y),o.push(a)}}for(let i=0;i<e.initializersLength();i++){let a=e.initializers(i),s=r.get(a.name());if(s===void 0){let u=new or,c=dt.tensorDimsFromORTFormat(a),f=dt.tensorDataTypeFromProto(a.dataType());u.type={shape:{dims:c},tensorType:f},s=this._allData.push(u)-1,r.set(a.name(),s)}this._allData[s]._from=-1,this._allData[s].tensor=ot.fromOrtTensor(a)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let a=e.outputs(i);if(r.has(a))throw new Error(`duplicated output name: ${a}`);let s=this._allData.push(new or)-1;r.set(a,s),this._allOutputIndices.push(s),this._allOutputNames.push(a)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let a=e.nodes(i),s=a.name();if(!s)for(let c=0;s=`unnamed_${a.opType()}_${c}`,!!t.has(s);c++);if(t.has(s))throw new Error(`duplicated node name: ${s}`);let u=this._nodes.push(new Ki(a,s))-1;t.set(s,u)}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s==null)throw new Error(`No node exists at index ${i}`);if(s?.outputsLength()===0)throw new Error(`missing output for node: ${s.name}`);for(let u=0;u<s?.outputsLength();u++){let c=s?.outputs(u),f=r.get(c);if(typeof f>"u"&&(f=this._allData.push(new or)-1,r.set(c,f)),a.outputs.push(f),this._allData[f]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${f}`);if(this._allData[f]._from=i,s.opType()==="Constant"){if(s.attributesLength()!==1||!s.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(s.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");a.outputs.pop(),a.executeNode=!1,this._allData[f]._from=-1,this._allData[f].tensor=ot.fromOrtTensor(s.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let a=this._nodes[i],s=e.nodes(i);if(s.inputsLength()===0)throw new Error(`missing input for node: ${s.name}`);for(let u=0;u<s.inputsLength();u++){let c=s.inputs(u),f=r.get(c);if(typeof f>"u")throw new Error(`unrecognized input '${c}' for node: ${s.name()}`);a.inputs.push(f),this._allData[f]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(a=>{e.add(a)})});let r=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;r.length>0;){let o=r.pop();t[o]==="gray"?t[o]="black":(r.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let a=this._allData[i];if(typeof a.tensor<"u")throw new Error("node outputs should not be initialized");if(a._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");a._to.forEach(s=>{if(t[s]==="gray")throw new Error("model graph is cyclic");t[s]==="white"&&r.push(s)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,r=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)r[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=r[i._from]);for(let a=0;a<i._to.length;a++)if(i._to[a]>=0)i._to[a]=r[i._to[a]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(a=>{i=this._nodes[a].inputs.indexOf(o+e),i!==-1&&(this._nodes[a].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let r=this._nodes[e];if(r.outputs.length>1){for(let s=1;s<r.outputs.length;s++)if(this._allData[r.outputs[s]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}r.executeNode=!1;let t=r.inputs[0],o=r.outputs[0],i=this._allData[o].to;for(let s=0;s<r.inputs.length;s++){let u=this._allData[r.inputs[s]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[r.inputs[s]].to.splice(u,1)}this._allData[o]._to=[];let a=this._allOutputIndices.indexOf(o);if(a!==-1&&(this._allOutputIndices[a]=t),i&&i.length>0)for(let s of i){let u=this._nodes[s].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[s].inputs[u]=t,this._allData[t].to.push(s)}}removeAllDropoutNodes(){let e=0;for(let r of this._nodes){if(r.opType==="Dropout"){if(r.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(r.outputs.length!==1&&r.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(r.outputs.length===2&&this._allData[r.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let r of this._nodes)r.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let r=this._allData[e.outputs[0]]._to;if(r.length===1&&this.isActivation(this._nodes[r[0]])){let t=this._nodes[r[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[en,tn])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(r[0])}}}}});var Eg,ji,kg=E(()=>{"use strict";Re();Cg();_o();Eg=yn($n());ze();ji=class{constructor(){}load(e,r,t){let o;if(!t)try{this.loadFromOnnxFormat(e,r);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,r)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,r){let t=Eg.onnx.ModelProto.decode(e);if(xt.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:xt.longToNumber(i.version)})),this._graph=el.from(t.graph,r)}loadFromOrtFormat(e,r){let t=new wn(e),o=yo.getRootAsInferenceSession(t).model();if(xt.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let a=0;a<o.opsetImportLength();a++){let s=o.opsetImport(a);this._opsets.push({domain:s?.domain(),version:xt.longToNumber(s.version())})}this._graph=el.from(o.graph(),r)}get graph(){return this._graph}get opsets(){return this._opsets}}});var Xi,Dg=E(()=>{"use strict";Ag();Og();Pt();kg();Xi=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=li.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,r,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await Zu(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new ji,typeof e=="string"){let i=e.endsWith(".ort");{let s=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(s),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,r||0,t||e.byteLength);this.initialize(i)}})}initialize(e,r){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,r),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new qi(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let r=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,r);return this.createOutput(t)})}normalizeAndValidateInputs(e){let r=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==r.length)throw new Error(`incorrect input array length: expected ${r.length} but got ${e.length}`)}else{if(e.size!==r.length)throw new Error(`incorrect input map size: expected ${r.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<r.length;++i){let a=e.get(r[i]);if(!a)throw new Error(`missing input tensor for: '${name}'`);t[o++]=a}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let a=0;a<t.length;++a){let s=o[t[a]];i[a]=s.type.shape.dims,this.context.graphInputTypes.push(s.type.tensorType),this.context.graphInputDims.push(e[a].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,r){for(let t=0;t<r.length;t++){let o=e[t],i=r[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,r,t){for(let o=0;o<r.length;o++){let i=e[o],a=r[o].dims;if(!this.compareTensorDims(i,a,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${a.join(",")}]`)}}compareTensorDims(e,r,t){if(e.length!==r.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==r[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let r=this._model.graph.getOutputNames();if(e.length!==r.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<r.length;++o)t.set(r[o],e[o]);return t}initializeOps(e){let r=e.getNodes();this._ops=new Array(r.length);for(let t=0;t<r.length;t++)this._ops[t]=this.sessionHandler.resolve(r[t],this._model.opsets,e)}}});var Zi,Bg=E(()=>{"use strict";pt();rn();Zi=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,r,t){let o=new Map;for(let s in e)if(Object.hasOwnProperty.call(e,s)){let u=e[s];o.set(s,new ot(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),a={};return i.forEach((s,u)=>{a[u]=new It(s.type,s.data,s.dims)}),a}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var Ng={};gn(Ng,{onnxjsBackend:()=>DS});var tl,DS,Rg=E(()=>{"use strict";Dg();Bg();tl=class{async init(){}async createInferenceSessionHandler(e,r){let t=new Xi(r);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new Zi(t)}},DS=new tl});var Ji=E(()=>{"use strict"});var Mg={};gn(Mg,{default:()=>BS});var zg,Lg,BS,Vg=E(()=>{"use strict";rl();Br();Yi();zg="ort-wasm-proxy-worker",Lg=globalThis.self?.name===zg;Lg&&(self.onmessage=n=>{let{type:e,in:r}=n.data;try{switch(e){case"init-wasm":Qi(r.wasm).then(()=>{ea(r).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=r;ta(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=r,o=Do(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=r;ra(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":na(r),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:a,options:s}=r;oa(t,o,i,a,new Array(a.length).fill(null),s).then(u=>{u.some(c=>c[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},aa([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":ia(r),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});BS=Lg?null:n=>new Worker(n??$t,{type:"module",name:zg})});var Ug={};gn(Ug,{default:()=>NS});var nl,Fg,NS,RS,Gg=E(()=>{"use strict";Fg=(nl=import.meta.url,async function(n={}){var e,r,t=n,o=new Promise((l,d)=>{e=l,r=d}),i=typeof window=="object",a=typeof WorkerGlobalScope<"u",s=a&&self.name?.startsWith("em-pthread");t.mountExternalData=(l,d)=>{l.startsWith("./")&&(l=l.substring(2)),(t.Bd||(t.Bd=new Map)).set(l,d)},t.unmountExternalData=()=>{delete t.Bd};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let c=()=>{let l=(h,b,_)=>(...S)=>{let O=Zt,N=b?.();S=h(...S);let M=b?.();return N!==M&&(h=M,_(N),b=_=null),Zt!=O?new Promise((H,J)=>{ns={resolve:H,reject:J}}):S},d=h=>async(...b)=>{try{if(t.Cd)throw Error("Session already started");let _=t.Cd={be:b[0],errors:[]},S=await h(...b);if(t.Cd!==_)throw Error("Session mismatch");t.Dd?.flush();let O=_.errors;if(0<O.length){let N=await Promise.all(O);if(N=N.filter(M=>M),0<N.length)throw Error(N.join(`
`))}return S}finally{t.Cd=null}};t._OrtCreateSession=l(t._OrtCreateSession,()=>t._OrtCreateSession,h=>t._OrtCreateSession=h),t._OrtRun=d(l(t._OrtRun,()=>t._OrtRun,h=>t._OrtRun=h)),t._OrtRunWithBinding=d(l(t._OrtRunWithBinding,()=>t._OrtRunWithBinding,h=>t._OrtRunWithBinding=h)),t._OrtBindInput=l(t._OrtBindInput,()=>t._OrtBindInput,h=>t._OrtBindInput=h),c=void 0};t.jsepInit=(l,d)=>{if(c?.(),l==="webgpu"){[t.Dd,t.Rd,t.Vd,t.Hd,t.Ud,t.hc,t.Wd,t.Zd,t.Sd,t.Td,t.Xd]=d;let h=t.Dd;t.jsepRegisterBuffer=(b,_,S,O)=>h.registerBuffer(b,_,S,O),t.jsepGetBuffer=b=>h.getBuffer(b),t.jsepCreateDownloader=(b,_,S)=>h.createDownloader(b,_,S),t.jsepOnCreateSession=b=>{h.onCreateSession(b)},t.jsepOnReleaseSession=b=>{h.onReleaseSession(b)},t.jsepOnRunStart=b=>h.onRunStart(b),t.$d=(b,_)=>{h.upload(b,_)}}else if(l==="webnn"){[t.Dd,t.Yd,t.Id,t.jsepEnsureTensor,t.Jd,t.jsepDownloadTensor]=d,t.jsepReleaseTensorId=t.Id,t.jsepUploadTensor=t.Jd;let h=t.Dd;t.jsepOnRunStart=b=>h.onRunStart(b),t.jsepOnRunEnd=h.onRunEnd.bind(h),t.jsepRegisterMLContext=(b,_)=>{h.registerMLContext(b,_)},t.jsepOnReleaseSession=b=>{h.onReleaseSession(b)},t.jsepCreateMLTensorDownloader=(b,_)=>h.createMLTensorDownloader(b,_),t.jsepRegisterMLTensor=(b,_,S,O)=>h.registerMLTensor(b,_,S,O),t.jsepCreateMLContext=b=>h.createMLContext(b),t.jsepRegisterMLConstant=(b,_,S,O,N)=>h.registerMLConstant(b,_,S,O,N,t.Bd),t.jsepRegisterGraphInput=h.registerGraphInput.bind(h),t.jsepIsGraphInput=h.isGraphInput.bind(h),t.jsepCreateTemporaryTensor=h.createTemporaryTensor.bind(h)}};var f,p,m=Object.assign({},t),g=(l,d)=>{throw d},y="";(i||a)&&(a?y=self.location.href:typeof document<"u"&&document.currentScript&&(y=document.currentScript.src),nl&&(y=nl),y=y.startsWith("blob:")?"":y.slice(0,y.replace(/[?#].*/,"").lastIndexOf("/")+1),a&&(p=l=>{var d=new XMLHttpRequest;return d.open("GET",l,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),f=async l=>{if(ge(l))return new Promise((h,b)=>{var _=new XMLHttpRequest;_.open("GET",l,!0),_.responseType="arraybuffer",_.onload=()=>{_.status==200||_.status==0&&_.response?h(_.response):b(_.status)},_.onerror=b,_.send(null)});var d=await fetch(l,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)});var x=console.log.bind(console),v=console.error.bind(console),T=x,w=v;Object.assign(t,m),m=null;var I,A,P,k,R,z,F,X,Q,de,W,se,Fe,te=t.wasmBinary,le=!1,ge=l=>l.startsWith("file://");function ee(){return I.buffer!=k.buffer&&Ce(),k}function ve(){return I.buffer!=k.buffer&&Ce(),R}function rt(){return I.buffer!=k.buffer&&Ce(),z}function Ke(){return I.buffer!=k.buffer&&Ce(),F}function L(){return I.buffer!=k.buffer&&Ce(),X}function V(){return I.buffer!=k.buffer&&Ce(),Q}function re(){return I.buffer!=k.buffer&&Ce(),de}function Ae(){return I.buffer!=k.buffer&&Ce(),Fe}if(s){let l=function(d){try{var h=d.data,b=h.yd;if(b==="load"){let _=[];self.onmessage=S=>_.push(S),self.startWorker=()=>{postMessage({yd:"loaded"});for(let S of _)l(S);self.onmessage=l};for(let S of h.Od)t[S]&&!t[S].proxy||(t[S]=(...O)=>{postMessage({yd:"callHandler",Nd:S,args:O})},S=="print"&&(T=t[S]),S=="printErr"&&(w=t[S]));I=h.he,Ce(),zt(h.ie)}else if(b==="run"){DT(h.xd),ss(h.xd,0,0,1,0,0),Yl(),ts(h.xd),Ge||(qc(),Ge=!0);try{BT(h.de,h.Fd)}catch(_){if(_!="unwind")throw _}}else h.target!=="setimmediate"&&(b==="checkMailbox"?Ge&&Wo():b&&(w(`worker: received unknown command ${b}`),w(h)))}catch(_){throw Kc(),_}};var u3=l,zt,Ge=!1;w=function(...d){d=d.join(" "),console.error(d)},self.alert=function(...d){postMessage({yd:"alert",text:d.join(" "),fe:Yo()})},self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=l}function Ce(){var l=I.buffer;t.HEAP8=k=new Int8Array(l),t.HEAP16=z=new Int16Array(l),t.HEAPU8=R=new Uint8Array(l),t.HEAPU16=F=new Uint16Array(l),t.HEAP32=X=new Int32Array(l),t.HEAPU32=Q=new Uint32Array(l),t.HEAPF32=de=new Float32Array(l),t.HEAPF64=Fe=new Float64Array(l),t.HEAP64=W=new BigInt64Array(l),t.HEAPU64=se=new BigUint64Array(l)}function dr(){s?startWorker(t):U.Bb()}s||(I=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Ce());var Mr,Vr=0,Fn=null;function Hl(){if(--Vr==0&&Fn){var l=Fn;Fn=null,l()}}function pr(l){throw w(l="Aborted("+l+")"),le=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),r(l),l}function ql(){return{a:{Ta:kT,Va:ET,W:NT,la:RT,b:LT,u:MT,R:VT,Za:FT,d:UT,pb:rc,g:zT,T:ic,Ga:ac,lb:uc,nb:lc,Ha:cc,Ea:fc,wb:dc,Da:pc,pa:mc,mb:hc,jb:bc,Fa:gc,kb:yc,Ma:GT,za:HT,eb:qT,cb:jT,ya:ZT,V:JT,N:YT,db:QT,ma:aw,fb:sw,zb:uw,hb:lw,qb:cw,ab:fw,Aa:dw,yb:ts,Ja:pw,S:mw,Wa:hw,$:yw,G:_w,E:Tw,m:Ya,H:ww,B:Sw,X:$w,J:Aw,v:Ow,O:Pw,D:Cw,t:Ew,A:kw,z:Dw,w:Bw,r:Nw,tb:Rw,ub:zw,vb:Lw,rb:kc,sb:Dc,bb:Bc,Oa:Vw,La:Gw,y:Ww,ja:Hw,Ba:qw,Ka:Fw,qa:Kw,Ia:jw,ib:Xw,U:Mw,fa:Zw,Sa:Jw,gb:Yw,Qa:Qw,Pa:ev,Ab:Lc,Ca:Mc,ob:qa,aa:Vc,oa:Fc,xb:Uc,na:Gc,$a:Av,ia:Vv,sa:Hv,ga:Sv,da:Dv,ua:Gv,p:vv,e:sv,c:iv,ea:Ev,f:uv,n:cv,k:_v,Y:dv,ka:xv,j:Iv,wa:Cv,Ra:jv,ca:Lv,Ua:Kv,P:kv,K:mv,_:zv,Q:$v,Z:Fv,x:pv,l:av,va:Rv,i:ov,h:fv,ra:qv,ta:Wv,o:lv,q:hv,s:gv,I:yv,C:wv,L:Tv,xa:Pv,_a:Ov,F:Mv,Ya:Bv,ba:Uv,M:bv,Xa:Nv,ha:rv,a:I,Na:Ha}}}var Ua={1319426:()=>typeof wasmOffsetConverter<"u",1319483:(l,d,h,b,_)=>{if(t===void 0||!t.Bd)return 1;if((l=Ye(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=t.Bd.get(l)))return 2;if(d=Number(d>>>0),h=Number(h>>>0),b=Number(b>>>0),d+h>l.byteLength)return 3;try{let S=l.subarray(d,d+h);switch(_){case 0:ve().set(S,b>>>0);break;case 1:t.$d(b,S);break;default:return 4}return 0}catch{return 4}},1320198:(l,d,h)=>{t.Jd(l,ve().subarray(d>>>0,d+h>>>0))},1320261:()=>t.Yd(),1320302:l=>{t.Id(l)},1320338:()=>{t.Sd()},1320369:()=>{t.Td()},1320398:()=>{t.Xd()},1320423:l=>t.Rd(l),1320456:l=>t.Vd(l),1320488:(l,d,h)=>{t.Hd(Number(l),Number(d),Number(h),!0)},1320551:(l,d,h)=>{t.Hd(Number(l),Number(d),Number(h))},1320608:l=>{t.hc("Abs",l,void 0)},1320659:l=>{t.hc("Neg",l,void 0)},1320710:l=>{t.hc("Floor",l,void 0)},1320763:l=>{t.hc("Ceil",l,void 0)},1320815:l=>{t.hc("Reciprocal",l,void 0)},1320873:l=>{t.hc("Sqrt",l,void 0)},1320925:l=>{t.hc("Exp",l,void 0)},1320976:l=>{t.hc("Erf",l,void 0)},1321027:l=>{t.hc("Sigmoid",l,void 0)},1321082:(l,d,h)=>{t.hc("HardSigmoid",l,{alpha:d,beta:h})},1321161:l=>{t.hc("Log",l,void 0)},1321212:l=>{t.hc("Sin",l,void 0)},1321263:l=>{t.hc("Cos",l,void 0)},1321314:l=>{t.hc("Tan",l,void 0)},1321365:l=>{t.hc("Asin",l,void 0)},1321417:l=>{t.hc("Acos",l,void 0)},1321469:l=>{t.hc("Atan",l,void 0)},1321521:l=>{t.hc("Sinh",l,void 0)},1321573:l=>{t.hc("Cosh",l,void 0)},1321625:l=>{t.hc("Asinh",l,void 0)},1321678:l=>{t.hc("Acosh",l,void 0)},1321731:l=>{t.hc("Atanh",l,void 0)},1321784:l=>{t.hc("Tanh",l,void 0)},1321836:l=>{t.hc("Not",l,void 0)},1321887:(l,d,h)=>{t.hc("Clip",l,{min:d,max:h})},1321956:l=>{t.hc("Clip",l,void 0)},1322008:(l,d)=>{t.hc("Elu",l,{alpha:d})},1322066:l=>{t.hc("Gelu",l,void 0)},1322118:l=>{t.hc("Relu",l,void 0)},1322170:(l,d)=>{t.hc("LeakyRelu",l,{alpha:d})},1322234:(l,d)=>{t.hc("ThresholdedRelu",l,{alpha:d})},1322304:(l,d)=>{t.hc("Cast",l,{to:d})},1322362:l=>{t.hc("Add",l,void 0)},1322413:l=>{t.hc("Sub",l,void 0)},1322464:l=>{t.hc("Mul",l,void 0)},1322515:l=>{t.hc("Div",l,void 0)},1322566:l=>{t.hc("Pow",l,void 0)},1322617:l=>{t.hc("Equal",l,void 0)},1322670:l=>{t.hc("Greater",l,void 0)},1322725:l=>{t.hc("GreaterOrEqual",l,void 0)},1322787:l=>{t.hc("Less",l,void 0)},1322839:l=>{t.hc("LessOrEqual",l,void 0)},1322898:(l,d,h,b,_)=>{t.hc("ReduceMean",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1323073:(l,d,h,b,_)=>{t.hc("ReduceMax",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1323247:(l,d,h,b,_)=>{t.hc("ReduceMin",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1323421:(l,d,h,b,_)=>{t.hc("ReduceProd",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1323596:(l,d,h,b,_)=>{t.hc("ReduceSum",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1323770:(l,d,h,b,_)=>{t.hc("ReduceL1",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1323943:(l,d,h,b,_)=>{t.hc("ReduceL2",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1324116:(l,d,h,b,_)=>{t.hc("ReduceLogSum",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1324293:(l,d,h,b,_)=>{t.hc("ReduceSumSquare",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1324473:(l,d,h,b,_)=>{t.hc("ReduceLogSumExp",l,{keepDims:!!d,noopWithEmptyAxes:!!h,axes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1324653:l=>{t.hc("Where",l,void 0)},1324706:(l,d,h)=>{t.hc("Transpose",l,{perm:d?Array.from(L().subarray(Number(d)>>>0,Number(h)>>>0)):[]})},1324830:(l,d,h,b)=>{t.hc("DepthToSpace",l,{blocksize:d,mode:Ye(h),format:b?"NHWC":"NCHW"})},1324963:(l,d,h,b)=>{t.hc("DepthToSpace",l,{blocksize:d,mode:Ye(h),format:b?"NHWC":"NCHW"})},1325096:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue,Ot)=>{t.hc("ConvTranspose",l,{format:M?"NHWC":"NCHW",autoPad:d,dilations:[h],group:b,kernelShape:[_],pads:[S,O],strides:[N],wIsConst:()=>!!ee()[H>>>0],outputPadding:J?Array.from(L().subarray(Number(J)>>>0,Number(oe)>>>0)):[],outputShape:_e?Array.from(L().subarray(Number(_e)>>>0,Number(Ue)>>>0)):[],activation:Ye(Ot)})},1325529:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)=>{t.hc("ConvTranspose",l,{format:N?"NHWC":"NCHW",autoPad:d,dilations:Array.from(L().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:b,kernelShape:Array.from(L().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(L().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(L().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!ee()[M>>>0],outputPadding:H?Array.from(L().subarray(Number(H)>>>0,Number(J)>>>0)):[],outputShape:oe?Array.from(L().subarray(Number(oe)>>>0,Number(_e)>>>0)):[],activation:Ye(Ue)})},1326190:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue,Ot)=>{t.hc("ConvTranspose",l,{format:M?"NHWC":"NCHW",autoPad:d,dilations:[h],group:b,kernelShape:[_],pads:[S,O],strides:[N],wIsConst:()=>!!ee()[H>>>0],outputPadding:J?Array.from(L().subarray(Number(J)>>>0,Number(oe)>>>0)):[],outputShape:_e?Array.from(L().subarray(Number(_e)>>>0,Number(Ue)>>>0)):[],activation:Ye(Ot)})},1326623:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)=>{t.hc("ConvTranspose",l,{format:N?"NHWC":"NCHW",autoPad:d,dilations:Array.from(L().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:b,kernelShape:Array.from(L().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(L().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(L().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!ee()[M>>>0],outputPadding:H?Array.from(L().subarray(Number(H)>>>0,Number(J)>>>0)):[],outputShape:oe?Array.from(L().subarray(Number(oe)>>>0,Number(_e)>>>0)):[],activation:Ye(Ue)})},1327284:(l,d)=>{t.hc("GlobalAveragePool",l,{format:d?"NHWC":"NCHW"})},1327375:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)=>{t.hc("AveragePool",l,{format:Ue?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:b,storage_order:_,dilations:S?Array.from(L().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:N?Array.from(L().subarray(Number(N)>>>0,Number(M)>>>0)):[],pads:H?Array.from(L().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:oe?Array.from(L().subarray(Number(oe)>>>0,Number(_e)>>>0)):[]})},1327854:(l,d)=>{t.hc("GlobalAveragePool",l,{format:d?"NHWC":"NCHW"})},1327945:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)=>{t.hc("AveragePool",l,{format:Ue?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:b,storage_order:_,dilations:S?Array.from(L().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:N?Array.from(L().subarray(Number(N)>>>0,Number(M)>>>0)):[],pads:H?Array.from(L().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:oe?Array.from(L().subarray(Number(oe)>>>0,Number(_e)>>>0)):[]})},1328424:(l,d)=>{t.hc("GlobalMaxPool",l,{format:d?"NHWC":"NCHW"})},1328511:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)=>{t.hc("MaxPool",l,{format:Ue?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:b,storage_order:_,dilations:S?Array.from(L().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:N?Array.from(L().subarray(Number(N)>>>0,Number(M)>>>0)):[],pads:H?Array.from(L().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:oe?Array.from(L().subarray(Number(oe)>>>0,Number(_e)>>>0)):[]})},1328986:(l,d)=>{t.hc("GlobalMaxPool",l,{format:d?"NHWC":"NCHW"})},1329073:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)=>{t.hc("MaxPool",l,{format:Ue?"NHWC":"NCHW",auto_pad:d,ceil_mode:h,count_include_pad:b,storage_order:_,dilations:S?Array.from(L().subarray(Number(S)>>>0,Number(O)>>>0)):[],kernel_shape:N?Array.from(L().subarray(Number(N)>>>0,Number(M)>>>0)):[],pads:H?Array.from(L().subarray(Number(H)>>>0,Number(J)>>>0)):[],strides:oe?Array.from(L().subarray(Number(oe)>>>0,Number(_e)>>>0)):[]})},1329548:(l,d,h,b,_)=>{t.hc("Gemm",l,{alpha:d,beta:h,transA:b,transB:_})},1329652:l=>{t.hc("MatMul",l,void 0)},1329706:(l,d,h,b)=>{t.hc("ArgMax",l,{keepDims:!!d,selectLastIndex:!!h,axis:b})},1329814:(l,d,h,b)=>{t.hc("ArgMin",l,{keepDims:!!d,selectLastIndex:!!h,axis:b})},1329922:(l,d)=>{t.hc("Softmax",l,{axis:d})},1329985:(l,d)=>{t.hc("Concat",l,{axis:d})},1330045:(l,d,h,b,_)=>{t.hc("Split",l,{axis:d,numOutputs:h,splitSizes:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1330201:l=>{t.hc("Expand",l,void 0)},1330255:(l,d)=>{t.hc("Gather",l,{axis:Number(d)})},1330326:(l,d)=>{t.hc("GatherElements",l,{axis:Number(d)})},1330405:(l,d)=>{t.hc("GatherND",l,{batch_dims:Number(d)})},1330484:(l,d,h,b,_,S,O,N,M,H,J)=>{t.hc("Resize",l,{antialias:d,axes:h?Array.from(L().subarray(Number(h)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Ye(_),cubicCoeffA:S,excludeOutside:O,extrapolationValue:N,keepAspectRatioPolicy:Ye(M),mode:Ye(H),nearestMode:Ye(J)})},1330846:(l,d,h,b,_,S,O)=>{t.hc("Slice",l,{starts:d?Array.from(L().subarray(Number(d)>>>0,Number(h)>>>0)):[],ends:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[],axes:S?Array.from(L().subarray(Number(S)>>>0,Number(O)>>>0)):[]})},1331110:l=>{t.hc("Tile",l,void 0)},1331162:(l,d,h)=>{t.hc("InstanceNormalization",l,{epsilon:d,format:h?"NHWC":"NCHW"})},1331276:(l,d,h)=>{t.hc("InstanceNormalization",l,{epsilon:d,format:h?"NHWC":"NCHW"})},1331390:l=>{t.hc("Range",l,void 0)},1331443:(l,d)=>{t.hc("Einsum",l,{equation:Ye(d)})},1331524:(l,d,h,b,_)=>{t.hc("Pad",l,{mode:d,value:h,pads:b?Array.from(L().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},1331667:(l,d,h,b,_,S)=>{t.hc("BatchNormalization",l,{epsilon:d,momentum:h,spatial:!!_,trainingMode:!!b,format:S?"NHWC":"NCHW"})},1331836:(l,d,h,b,_,S)=>{t.hc("BatchNormalization",l,{epsilon:d,momentum:h,spatial:!!_,trainingMode:!!b,format:S?"NHWC":"NCHW"})},1332005:(l,d,h)=>{t.hc("CumSum",l,{exclusive:Number(d),reverse:Number(h)})},1332102:(l,d,h)=>{t.hc("DequantizeLinear",l,{axis:d,blockSize:h})},1332192:(l,d,h,b,_)=>{t.hc("GridSample",l,{align_corners:d,mode:Ye(h),padding_mode:Ye(b),format:_?"NHWC":"NCHW"})},1332362:(l,d,h,b,_)=>{t.hc("GridSample",l,{align_corners:d,mode:Ye(h),padding_mode:Ye(b),format:_?"NHWC":"NCHW"})},1332532:(l,d)=>{t.hc("ScatterND",l,{reduction:Ye(d)})},1332617:(l,d,h,b,_,S,O,N,M)=>{t.hc("Attention",l,{numHeads:d,isUnidirectional:h,maskFilterValue:b,scale:_,doRotary:S,qkvHiddenSizes:O?Array.from(L().subarray(Number(N)>>>0,Number(N)+O>>>0)):[],pastPresentShareBuffer:!!M})},1332889:l=>{t.hc("BiasAdd",l,void 0)},1332944:l=>{t.hc("BiasSplitGelu",l,void 0)},1333005:l=>{t.hc("FastGelu",l,void 0)},1333061:(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue,Ot,Hn)=>{t.hc("Conv",l,{format:oe?"NHWC":"NCHW",auto_pad:d,dilations:h?Array.from(L().subarray(Number(h)>>>0,Number(b)>>>0)):[],group:_,kernel_shape:S?Array.from(L().subarray(Number(S)>>>0,Number(O)>>>0)):[],pads:N?Array.from(L().subarray(Number(N)>>>0,Number(M)>>>0)):[],strides:H?Array.from(L().subarray(Number(H)>>>0,Number(J)>>>0)):[],w_is_const:()=>!!ee()[Number(_e)>>>0],activation:Ye(Ue),activation_params:Ot?Array.from(re().subarray(Number(Ot)>>>0,Number(Hn)>>>0)):[]})},1333645:l=>{t.hc("Gelu",l,void 0)},1333697:(l,d,h,b,_,S,O,N,M)=>{t.hc("GroupQueryAttention",l,{numHeads:d,kvNumHeads:h,scale:b,softcap:_,doRotary:S,rotaryInterleaved:O,smoothSoftmax:N,localWindowSize:M})},1333914:(l,d,h,b)=>{t.hc("LayerNormalization",l,{axis:d,epsilon:h,simplified:!!b})},1334025:(l,d,h,b)=>{t.hc("LayerNormalization",l,{axis:d,epsilon:h,simplified:!!b})},1334136:(l,d,h,b,_,S)=>{t.hc("MatMulNBits",l,{k:d,n:h,accuracyLevel:b,bits:_,blockSize:S})},1334263:(l,d,h,b,_,S)=>{t.hc("MultiHeadAttention",l,{numHeads:d,isUnidirectional:h,maskFilterValue:b,scale:_,doRotary:S})},1334422:(l,d)=>{t.hc("QuickGelu",l,{alpha:d})},1334486:(l,d,h,b,_)=>{t.hc("RotaryEmbedding",l,{interleaved:!!d,numHeads:h,rotaryEmbeddingDim:b,scale:_})},1334625:(l,d,h)=>{t.hc("SkipLayerNormalization",l,{epsilon:d,simplified:!!h})},1334727:(l,d,h)=>{t.hc("SkipLayerNormalization",l,{epsilon:d,simplified:!!h})},1334829:(l,d,h,b)=>{t.hc("GatherBlockQuantized",l,{gatherAxis:d,quantizeAxis:h,blockSize:b})},1334950:l=>{t.Wd(l)},1334984:(l,d)=>t.Zd(Number(l),Number(d),t.Cd.be,t.Cd.errors)};function ET(l,d,h){return $c(async()=>{await t.Ud(Number(l),Number(d),Number(h))})}function kT(){return typeof wasmOffsetConverter<"u"}class Ga{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var Kl=l=>{l.terminate(),l.onmessage=()=>{}},Wa=[],jl=l=>{Tr.length==0&&(ec(),Ql(Tr[0]));var d=Tr.pop();if(!d)return 6;Un.push(d),Fr[l.xd]=d,d.xd=l.xd;var h={yd:"run",de:l.ce,Fd:l.Fd,xd:l.xd};return d.postMessage(h,l.Ld),0},xr=0,je=(l,d,...h)=>{for(var b=2*h.length,_=me(),S=ls(8*b),O=S>>>3,N=0;N<h.length;N++){var M=h[N];typeof M=="bigint"?(W[O+2*N]=1n,W[O+2*N+1]=M):(W[O+2*N]=0n,Ae()[O+2*N+1>>>0]=M)}return l=jc(l,0,b,S,d),pe(_),l};function Ha(l){if(s)return je(0,1,l);if(P=l,!(0<xr)){for(var d of Un)Kl(d);for(d of Tr)Kl(d);Tr=[],Un=[],Fr={},le=!0}g(0,new Ga(l))}function Xl(l){if(s)return je(1,0,l);qa(l)}var qa=l=>{if(P=l,s)throw Xl(l),"unwind";Ha(l)},Tr=[],Un=[],Zl=[],Fr={},Jl=l=>{var d=l.xd;delete Fr[d],Tr.push(l),Un.splice(Un.indexOf(l),1),l.xd=0,Xc(d)};function Yl(){Zl.forEach(l=>l())}var Ql=l=>new Promise(d=>{l.onmessage=_=>{var S=(_=_.data).yd;if(_.Ed&&_.Ed!=Yo()){var O=Fr[_.Ed];O?O.postMessage(_,_.Ld):w(`Internal error! Worker sent a message "${S}" to target pthread ${_.Ed}, but that thread no longer exists!`)}else S==="checkMailbox"?Wo():S==="spawnThread"?jl(_):S==="cleanupThread"?Jl(Fr[_.ee]):S==="loaded"?(l.loaded=!0,d(l)):S==="alert"?alert(`Thread ${_.fe}: ${_.text}`):_.target==="setimmediate"?l.postMessage(_):S==="callHandler"?t[_.Nd](..._.args):S&&w(`worker sent an unknown command ${S}`)},l.onerror=_=>{throw w(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var h,b=[];for(h of[])t.propertyIsEnumerable(h)&&b.push(h);l.postMessage({yd:"load",Od:b,he:I,ie:A})});function ec(){var l=new Worker(import.meta.url.startsWith("file:")?new URL("ort.all.bundle.min.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});Tr.push(l)}var DT=l=>{Ce();var d=V()[l+52>>>2>>>0];l=V()[l+56>>>2>>>0],Yc(d,d-l),pe(d)},BT=(l,d)=>{xr=0,l=cs(l,d),0<xr?P=l:us(l)},Go=[];function NT(l){var d=new Ka(l>>>=0);if(ee()[d.wd+12>>>0]==0){var h=1;ee()[d.wd+12>>>0]=h}return h=0,ee()[d.wd+13>>>0]=h,Go.push(d),ef(l),rf(l)}var mn=0,RT=()=>{ye(0,0);var l=Go.pop();Qc(l.Gd),mn=0};class Ka{constructor(d){this.Gd=d,this.wd=d-24}}function zT(l){throw mn||=l>>>0,mn}var ja=l=>{var d=mn;if(!d)return Wn(0),0;var h=new Ka(d);V()[h.wd+16>>>2>>>0]=d;var b=V()[h.wd+4>>>2>>>0];if(!b)return Wn(0),d;for(var _ of l){if(_===0||_===b)break;if(tf(_,b,h.wd+16))return Wn(_),d}return Wn(b),d};function LT(){return ja([])}function MT(l){return ja([l>>>0])}function VT(l,d){return ja([l>>>0,d>>>0])}var FT=()=>{var l=Go.pop();l||pr("no exception to throw");var d=l.Gd;if(ee()[l.wd+13>>>0]==0){Go.push(l);var h=1;ee()[l.wd+13>>>0]=h,h=0,ee()[l.wd+12>>>0]=h}throw mn=d};function UT(l,d,h){var b=new Ka(l>>>=0);throw d>>>=0,h>>>=0,V()[b.wd+16>>>2>>>0]=0,V()[b.wd+4>>>2>>>0]=d,V()[b.wd+8>>>2>>>0]=h,mn=l}function tc(l,d,h,b){return s?je(2,1,l,d,h,b):rc(l,d,h,b)}function rc(l,d,h,b){if(l>>>=0,h>>>=0,b>>>=0,u===void 0)return 6;var _=[];return s&&_.length===0?tc(l,d>>>=0,h,b):(l={ce:h,xd:l,Fd:b,Ld:_},s?(l.yd="spawnThread",postMessage(l,_),0):jl(l))}var nc=typeof TextDecoder<"u"?new TextDecoder:void 0,oc=(l,d=0,h=NaN)=>{var b=(d>>>=0)+h;for(h=d;l[h]&&!(h>=b);)++h;if(16<h-d&&l.buffer&&nc)return nc.decode(l.buffer instanceof ArrayBuffer?l.subarray(d,h):l.slice(d,h));for(b="";d<h;){var _=l[d++];if(128&_){var S=63&l[d++];if((224&_)==192)b+=String.fromCharCode((31&_)<<6|S);else{var O=63&l[d++];65536>(_=(240&_)==224?(15&_)<<12|S<<6|O:(7&_)<<18|S<<12|O<<6|63&l[d++])?b+=String.fromCharCode(_):(_-=65536,b+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else b+=String.fromCharCode(_)}return b},Ye=(l,d)=>(l>>>=0)?oc(ve(),l,d):"";function ic(l,d,h){return s?je(3,1,l,d,h):0}function ac(l,d){if(s)return je(4,1,l,d)}var sc=l=>{for(var d=0,h=0;h<l.length;++h){var b=l.charCodeAt(h);127>=b?d++:2047>=b?d+=2:55296<=b&&57343>=b?(d+=4,++h):d+=3}return d},hn=(l,d,h)=>{var b=ve();if(d>>>=0,0<h){var _=d;h=d+h-1;for(var S=0;S<l.length;++S){var O=l.charCodeAt(S);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&l.charCodeAt(++S)),127>=O){if(d>=h)break;b[d++>>>0]=O}else{if(2047>=O){if(d+1>=h)break;b[d++>>>0]=192|O>>6}else{if(65535>=O){if(d+2>=h)break;b[d++>>>0]=224|O>>12}else{if(d+3>=h)break;b[d++>>>0]=240|O>>18,b[d++>>>0]=128|O>>12&63}b[d++>>>0]=128|O>>6&63}b[d++>>>0]=128|63&O}}b[d>>>0]=0,l=d-_}else l=0;return l};function uc(l,d){if(s)return je(5,1,l,d)}function lc(l,d,h){if(s)return je(6,1,l,d,h)}function cc(l,d,h){return s?je(7,1,l,d,h):0}function fc(l,d){if(s)return je(8,1,l,d)}function dc(l,d,h){if(s)return je(9,1,l,d,h)}function pc(l,d,h,b){if(s)return je(10,1,l,d,h,b)}function mc(l,d,h,b){if(s)return je(11,1,l,d,h,b)}function hc(l,d,h,b){if(s)return je(12,1,l,d,h,b)}function bc(l){if(s)return je(13,1,l)}function gc(l,d){if(s)return je(14,1,l,d)}function yc(l,d,h){if(s)return je(15,1,l,d,h)}var _c,wr,GT=()=>pr(""),Xt=l=>{for(var d="";ve()[l>>>0];)d+=_c[ve()[l++>>>0]];return d},Xa={},Za={},WT={};function mr(l,d,h={}){return function(b,_,S={}){var O=_.name;if(!b)throw new wr(`type "${O}" must have a positive integer typeid pointer`);if(Za.hasOwnProperty(b)){if(S.Pd)return;throw new wr(`Cannot register type '${O}' twice`)}Za[b]=_,delete WT[b],Xa.hasOwnProperty(b)&&(_=Xa[b],delete Xa[b],_.forEach(N=>N()))}(l,d,h)}var xc=(l,d,h)=>{switch(d){case 1:return h?b=>ee()[b>>>0]:b=>ve()[b>>>0];case 2:return h?b=>rt()[b>>>1>>>0]:b=>Ke()[b>>>1>>>0];case 4:return h?b=>L()[b>>>2>>>0]:b=>V()[b>>>2>>>0];case 8:return h?b=>W[b>>>3]:b=>se[b>>>3];default:throw new TypeError(`invalid integer width (${d}): ${l}`)}};function HT(l,d,h){h>>>=0,mr(l>>>=0,{name:d=Xt(d>>>0),fromWireType:b=>b,toWireType:function(b,_){if(typeof _!="bigint"&&typeof _!="number")throw _=_===null?"null":(b=typeof _)=="object"||b==="array"||b==="function"?_.toString():""+_,new TypeError(`Cannot convert "${_}" to ${this.name}`);return typeof _=="number"&&(_=BigInt(_)),_},zd:vr,readValueFromPointer:xc(d,h,d.indexOf("u")==-1),Ad:null})}var vr=8;function qT(l,d,h,b){mr(l>>>=0,{name:d=Xt(d>>>0),fromWireType:function(_){return!!_},toWireType:function(_,S){return S?h:b},zd:vr,readValueFromPointer:function(_){return this.fromWireType(ve()[_>>>0])},Ad:null})}var Ja=[],hr=[];function Ya(l){9<(l>>>=0)&&--hr[l+1]==0&&(hr[l]=void 0,Ja.push(l))}var wt=l=>{if(!l)throw new wr("Cannot use deleted val. handle = "+l);return hr[l]},At=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=Ja.pop()||hr.length;return hr[d]=l,hr[d+1]=1,d}};function Qa(l){return this.fromWireType(V()[l>>>2>>>0])}var KT={name:"emscripten::val",fromWireType:l=>{var d=wt(l);return Ya(l),d},toWireType:(l,d)=>At(d),zd:vr,readValueFromPointer:Qa,Ad:null};function jT(l){return mr(l>>>0,KT)}var XT=(l,d)=>{switch(d){case 4:return function(h){return this.fromWireType(re()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(Ae()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${l}`)}};function ZT(l,d,h){h>>>=0,mr(l>>>=0,{name:d=Xt(d>>>0),fromWireType:b=>b,toWireType:(b,_)=>_,zd:vr,readValueFromPointer:XT(d,h),Ad:null})}function JT(l,d,h,b,_){if(l>>>=0,h>>>=0,d=Xt(d>>>0),_===-1&&(_=4294967295),_=N=>N,b===0){var S=32-8*h;_=N=>N<<S>>>S}var O=d.includes("unsigned")?function(N,M){return M>>>0}:function(N,M){return M};mr(l,{name:d,fromWireType:_,toWireType:O,zd:vr,readValueFromPointer:xc(d,h,b!==0),Ad:null})}function YT(l,d,h){function b(S){var O=V()[S>>>2>>>0];return S=V()[S+4>>>2>>>0],new _(ee().buffer,S,O)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];mr(l>>>=0,{name:h=Xt(h>>>0),fromWireType:b,zd:vr,readValueFromPointer:b},{Pd:!0})}function QT(l,d){mr(l>>>=0,{name:d=Xt(d>>>0),fromWireType:function(h){for(var b,_=V()[h>>>2>>>0],S=h+4,O=S,N=0;N<=_;++N){var M=S+N;N!=_&&ve()[M>>>0]!=0||(O=Ye(O,M-O),b===void 0?b=O:(b+="\0",b+=O),O=M+1)}return Jt(h),b},toWireType:function(h,b){b instanceof ArrayBuffer&&(b=new Uint8Array(b));var _=typeof b=="string";if(!(_||b instanceof Uint8Array||b instanceof Uint8ClampedArray||b instanceof Int8Array))throw new wr("Cannot pass non-string to std::string");var S=_?sc(b):b.length,O=Qo(4+S+1),N=O+4;if(V()[O>>>2>>>0]=S,_)hn(b,N,S+1);else if(_)for(_=0;_<S;++_){var M=b.charCodeAt(_);if(255<M)throw Jt(O),new wr("String has UTF-16 code units that do not fit in 8 bits");ve()[N+_>>>0]=M}else for(_=0;_<S;++_)ve()[N+_>>>0]=b[_];return h!==null&&h.push(Jt,O),O},zd:vr,readValueFromPointer:Qa,Ad(h){Jt(h)}})}var Tc=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,ew=(l,d)=>{for(var h=l>>1,b=h+d/2;!(h>=b)&&Ke()[h>>>0];)++h;if(32<(h<<=1)-l&&Tc)return Tc.decode(ve().slice(l,h));for(h="",b=0;!(b>=d/2);++b){var _=rt()[l+2*b>>>1>>>0];if(_==0)break;h+=String.fromCharCode(_)}return h},tw=(l,d,h)=>{if(h??=2147483647,2>h)return 0;var b=d;h=(h-=2)<2*l.length?h/2:l.length;for(var _=0;_<h;++_){var S=l.charCodeAt(_);rt()[d>>>1>>>0]=S,d+=2}return rt()[d>>>1>>>0]=0,d-b},rw=l=>2*l.length,nw=(l,d)=>{for(var h=0,b="";!(h>=d/4);){var _=L()[l+4*h>>>2>>>0];if(_==0)break;++h,65536<=_?(_-=65536,b+=String.fromCharCode(55296|_>>10,56320|1023&_)):b+=String.fromCharCode(_)}return b},ow=(l,d,h)=>{if(d>>>=0,h??=2147483647,4>h)return 0;var b=d;h=b+h-4;for(var _=0;_<l.length;++_){var S=l.charCodeAt(_);if(55296<=S&&57343>=S&&(S=65536+((1023&S)<<10)|1023&l.charCodeAt(++_)),L()[d>>>2>>>0]=S,(d+=4)+4>h)break}return L()[d>>>2>>>0]=0,d-b},iw=l=>{for(var d=0,h=0;h<l.length;++h){var b=l.charCodeAt(h);55296<=b&&57343>=b&&++h,d+=4}return d};function aw(l,d,h){if(l>>>=0,d>>>=0,h=Xt(h>>>=0),d===2)var b=ew,_=tw,S=rw,O=N=>Ke()[N>>>1>>>0];else d===4&&(b=nw,_=ow,S=iw,O=N=>V()[N>>>2>>>0]);mr(l,{name:h,fromWireType:N=>{for(var M,H=V()[N>>>2>>>0],J=N+4,oe=0;oe<=H;++oe){var _e=N+4+oe*d;oe!=H&&O(_e)!=0||(J=b(J,_e-J),M===void 0?M=J:(M+="\0",M+=J),J=_e+d)}return Jt(N),M},toWireType:(N,M)=>{if(typeof M!="string")throw new wr(`Cannot pass non-string to C++ string type ${h}`);var H=S(M),J=Qo(4+H+d);return V()[J>>>2>>>0]=H/d,_(M,J+4,H+d),N!==null&&N.push(Jt,J),J},zd:vr,readValueFromPointer:Qa,Ad(N){Jt(N)}})}function sw(l,d){mr(l>>>=0,{Qd:!0,name:d=Xt(d>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function uw(l){ss(l>>>0,!a,1,!i,131072,!1),Yl()}var es=l=>{if(!le)try{if(l(),!(0<xr))try{s?us(P):qa(P)}catch(d){d instanceof Ga||d=="unwind"||g(0,d)}}catch(d){d instanceof Ga||d=="unwind"||g(0,d)}};function ts(l){l>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(L(),l>>>2,l).value.then(Wo),l+=128,Atomics.store(L(),l>>>2,1))}var Wo=()=>{var l=Yo();l&&(ts(l),es(Jc))};function lw(l,d){(l>>>=0)==d>>>0?setTimeout(Wo):s?postMessage({Ed:l,yd:"checkMailbox"}):(l=Fr[l])&&l.postMessage({yd:"checkMailbox"})}var rs=[];function cw(l,d,h,b,_){for(d>>>=0,b/=2,rs.length=b,h=_>>>0>>>3,_=0;_<b;_++)rs[_]=W[h+2*_]?W[h+2*_+1]:Ae()[h+2*_+1>>>0];return(d?Ua[d]:nv[l])(...rs)}var fw=()=>{xr=0};function dw(l){l>>>=0,s?postMessage({yd:"cleanupThread",ee:l}):Jl(Fr[l])}function pw(l){}var Ho=(l,d)=>{var h=Za[l];if(h===void 0)throw l=Hc(l),h=Xt(l),Jt(l),new wr(`${d} has unknown type ${h}`);return h},wc=(l,d,h)=>{var b=[];return l=l.toWireType(b,h),b.length&&(V()[d>>>2>>>0]=At(b)),l};function mw(l,d,h){return d>>>=0,h>>>=0,l=wt(l>>>0),d=Ho(d,"emval::as"),wc(d,h,l)}function hw(l,d){return d>>>=0,l=wt(l>>>0),(d=Ho(d,"emval::as")).toWireType(null,l)}var qo=l=>{try{l()}catch(d){pr(d)}},Ir=0,Zt=null,vc=0,Ko=[],Ic={},Sc={},bw=0,ns=null,gw=[];function $c(l){return function(d){if(!le){if(Ir===0){var h=!1,b=!1;d((_=0)=>{if(!le&&(vc=_,h=!0,b)){Ir=2,qo(()=>Zf(Zt)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),_=!1;try{var S=function(){var M=L()[Zt+8>>>2>>>0];return M=U[Sc[M]],--xr,M()}()}catch(M){S=M,_=!0}var O=!1;if(!Zt){var N=ns;N&&(ns=null,(_?N.reject:N.resolve)(S),O=!0)}if(_&&!O)throw S}}),b=!0,h||(Ir=1,Zt=function(){var _=Qo(65548),S=_+12;V()[_>>>2>>>0]=S,V()[_+4>>>2>>>0]=S+65536,S=Ko[0];var O=Ic[S];return O===void 0&&(O=bw++,Ic[S]=O,Sc[O]=S),S=O,L()[_+8>>>2>>>0]=S,_}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),qo(()=>jf(Zt)))}else Ir===2?(Ir=0,qo(Jf),Jt(Zt),Zt=null,gw.forEach(es)):pr(`invalid state: ${Ir}`);return vc}}(d=>{l().then(d)})}function yw(l){return l>>>=0,$c(async()=>{var d=await wt(l);return At(d)})}var jo=[];function _w(l,d,h,b){return h>>>=0,b>>>=0,(l=jo[l>>>0])(null,d=wt(d>>>0),h,b)}var xw={},Xo=l=>{var d=xw[l];return d===void 0?Xt(l):d};function Tw(l,d,h,b,_){return h>>>=0,b>>>=0,_>>>=0,(l=jo[l>>>0])(d=wt(d>>>0),d[h=Xo(h)],b,_)}var Ac=()=>typeof globalThis=="object"?globalThis:Function("return this")();function ww(l){return(l>>>=0)==0?At(Ac()):(l=Xo(l),At(Ac()[l]))}var vw=l=>{var d=jo.length;return jo.push(l),d},Iw=(l,d)=>{for(var h=Array(l),b=0;b<l;++b)h[b]=Ho(V()[d+4*b>>>2>>>0],"parameter "+b);return h},Oc=(l,d)=>Object.defineProperty(d,"name",{value:l});function Sw(l,d,h){var b=(d=Iw(l,d>>>0)).shift();l--;var _=`return function (obj, func, destructorsRef, args) {
`,S=0,O=[];h===0&&O.push("obj");for(var N=["retType"],M=[b],H=0;H<l;++H)O.push("arg"+H),N.push("argType"+H),M.push(d[H]),_+=`  var arg${H} = argType${H}.readValueFromPointer(args${S?"+"+S:""});
`,S+=d[H].zd;return _+=`  var rv = ${h===1?"new func":"func.call"}(${O.join(", ")});
`,b.Qd||(N.push("emval_returnValue"),M.push(wc),_+=`  return emval_returnValue(retType, destructorsRef, rv);
`),N.push(_+`};
`),l=function(J){var oe=Function;if(!(oe instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof oe} which is not a function`);var _e=Oc(oe.name||"unknownFunctionName",function(){});return _e.prototype=oe.prototype,_e=new _e,(J=oe.apply(_e,J))instanceof Object?J:_e}(N)(...M),h=`methodCaller<(${d.map(J=>J.name).join(", ")}) => ${b.name}>`,vw(Oc(h,l))}function $w(l){return l=Xo(l>>>0),At(t[l])}function Aw(l,d){return d>>>=0,l=wt(l>>>0),d=wt(d),At(l[d])}function Ow(l){9<(l>>>=0)&&(hr[l+1]+=1)}function Pw(){return At([])}function Cw(l){l=wt(l>>>0);for(var d=Array(l.length),h=0;h<l.length;h++)d[h]=l[h];return At(d)}function Ew(l){return At(Xo(l>>>0))}function kw(){return At({})}function Dw(l){for(var d=wt(l>>>=0);d.length;){var h=d.pop();d.pop()(h)}Ya(l)}function Bw(l,d,h){d>>>=0,h>>>=0,l=wt(l>>>0),d=wt(d),h=wt(h),l[d]=h}function Nw(l,d){return d>>>=0,l=(l=Ho(l>>>0,"_emval_take_value")).readValueFromPointer(d),At(l)}function Rw(l,d){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),d>>>=0,l=new Date(1e3*l),L()[d>>>2>>>0]=l.getUTCSeconds(),L()[d+4>>>2>>>0]=l.getUTCMinutes(),L()[d+8>>>2>>>0]=l.getUTCHours(),L()[d+12>>>2>>>0]=l.getUTCDate(),L()[d+16>>>2>>>0]=l.getUTCMonth(),L()[d+20>>>2>>>0]=l.getUTCFullYear()-1900,L()[d+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,L()[d+28>>>2>>>0]=l}var Pc=l=>l%4==0&&(l%100!=0||l%400==0),Cc=[0,31,60,91,121,152,182,213,244,274,305,335],Ec=[0,31,59,90,120,151,181,212,243,273,304,334];function zw(l,d){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),d>>>=0,l=new Date(1e3*l),L()[d>>>2>>>0]=l.getSeconds(),L()[d+4>>>2>>>0]=l.getMinutes(),L()[d+8>>>2>>>0]=l.getHours(),L()[d+12>>>2>>>0]=l.getDate(),L()[d+16>>>2>>>0]=l.getMonth(),L()[d+20>>>2>>>0]=l.getFullYear()-1900,L()[d+24>>>2>>>0]=l.getDay();var h=(Pc(l.getFullYear())?Cc:Ec)[l.getMonth()]+l.getDate()-1|0;L()[d+28>>>2>>>0]=h,L()[d+36>>>2>>>0]=-60*l.getTimezoneOffset(),h=new Date(l.getFullYear(),6,1).getTimezoneOffset();var b=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(h!=b&&l.getTimezoneOffset()==Math.min(b,h)),L()[d+32>>>2>>>0]=l}function Lw(l){l>>>=0;var d=new Date(L()[l+20>>>2>>>0]+1900,L()[l+16>>>2>>>0],L()[l+12>>>2>>>0],L()[l+8>>>2>>>0],L()[l+4>>>2>>>0],L()[l>>>2>>>0],0),h=L()[l+32>>>2>>>0],b=d.getTimezoneOffset(),_=new Date(d.getFullYear(),6,1).getTimezoneOffset(),S=new Date(d.getFullYear(),0,1).getTimezoneOffset(),O=Math.min(S,_);return 0>h?L()[l+32>>>2>>>0]=+(_!=S&&O==b):0<h!=(O==b)&&(_=Math.max(S,_),d.setTime(d.getTime()+6e4*((0<h?O:_)-b))),L()[l+24>>>2>>>0]=d.getDay(),h=(Pc(d.getFullYear())?Cc:Ec)[d.getMonth()]+d.getDate()-1|0,L()[l+28>>>2>>>0]=h,L()[l>>>2>>>0]=d.getSeconds(),L()[l+4>>>2>>>0]=d.getMinutes(),L()[l+8>>>2>>>0]=d.getHours(),L()[l+12>>>2>>>0]=d.getDate(),L()[l+16>>>2>>>0]=d.getMonth(),L()[l+20>>>2>>>0]=d.getYear(),l=d.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function kc(l,d,h,b,_,S,O){return s?je(16,1,l,d,h,b,_,S,O):-52}function Dc(l,d,h,b,_,S){if(s)return je(17,1,l,d,h,b,_,S)}var Gn={},Mw=()=>performance.timeOrigin+performance.now();function Bc(l,d){if(s)return je(18,1,l,d);if(Gn[l]&&(clearTimeout(Gn[l].id),delete Gn[l]),!d)return 0;var h=setTimeout(()=>{delete Gn[l],es(()=>Zc(l,performance.timeOrigin+performance.now()))},d);return Gn[l]={id:h,ke:d},0}function Vw(l,d,h,b){l>>>=0,d>>>=0,h>>>=0,b>>>=0;var _=new Date().getFullYear(),S=new Date(_,0,1).getTimezoneOffset();_=new Date(_,6,1).getTimezoneOffset();var O=Math.max(S,_);V()[l>>>2>>>0]=60*O,L()[d>>>2>>>0]=+(S!=_),l=(d=N=>{var M=Math.abs(N);return`UTC${0<=N?"-":"+"}${String(Math.floor(M/60)).padStart(2,"0")}${String(M%60).padStart(2,"0")}`})(S),d=d(_),_<S?(hn(l,h,17),hn(d,b,17)):(hn(l,b,17),hn(d,h,17))}var Fw=()=>Date.now(),Uw=1;function Gw(l,d,h){if(!(0<=l&&3>=l))return 28;if(l===0)l=Date.now();else{if(!Uw)return 52;l=performance.timeOrigin+performance.now()}return W[h>>>0>>>3]=BigInt(Math.round(1e6*l)),0}var os=[],Nc=(l,d)=>{os.length=0;for(var h;h=ve()[l++>>>0];){var b=h!=105;d+=(b&=h!=112)&&d%8?4:0,os.push(h==112?V()[d>>>2>>>0]:h==106?W[d>>>3]:h==105?L()[d>>>2>>>0]:Ae()[d>>>3>>>0]),d+=b?8:4}return os};function Ww(l,d,h){return l>>>=0,d=Nc(d>>>0,h>>>0),Ua[l](...d)}function Hw(l,d,h){return l>>>=0,d=Nc(d>>>0,h>>>0),Ua[l](...d)}var qw=()=>{};function Kw(l,d){return w(Ye(l>>>0,d>>>0))}var jw=()=>{throw xr+=1,"unwind"};function Xw(){return 4294901760}var Zw=()=>navigator.hardwareConcurrency;function Jw(){return pr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Yw(l){l>>>=0;var d=ve().length;if(l<=d||4294901760<l)return!1;for(var h=1;4>=h;h*=2){var b=d*(1+.2/h);b=Math.min(b,l+100663296);e:{b=(Math.min(4294901760,65536*Math.ceil(Math.max(l,b)/65536))-I.buffer.byteLength+65535)/65536|0;try{I.grow(b),Ce();var _=1;break e}catch{}_=void 0}if(_)return!0}return!1}var Zo=()=>(pr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),bn={},Rc=l=>{l.forEach(d=>{var h=Zo();h&&(bn[h]=d)})};function Qw(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),Rc(l),bn.Kd=Zo(),bn.ae=l,bn.Kd}function ev(l,d,h){if(l>>>=0,d>>>=0,bn.Kd==l)var b=bn.ae;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Rc(b);for(var _=3;b[_]&&Zo()!=l;)++_;for(l=0;l<h&&b[l+_];++l)L()[d+4*l>>>2>>>0]=Zo();return l}var is,as={},zc=()=>{if(!is){var l,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in as)as[l]===void 0?delete d[l]:d[l]=as[l];var h=[];for(l in d)h.push(`${l}=${d[l]}`);is=h}return is};function Lc(l,d){if(s)return je(19,1,l,d);l>>>=0,d>>>=0;var h=0;return zc().forEach((b,_)=>{var S=d+h;for(_=V()[l+4*_>>>2>>>0]=S,S=0;S<b.length;++S)ee()[_++>>>0]=b.charCodeAt(S);ee()[_>>>0]=0,h+=b.length+1}),0}function Mc(l,d){if(s)return je(20,1,l,d);l>>>=0,d>>>=0;var h=zc();V()[l>>>2>>>0]=h.length;var b=0;return h.forEach(_=>b+=_.length+1),V()[d>>>2>>>0]=b,0}function Vc(l){return s?je(21,1,l):52}function Fc(l,d,h,b){return s?je(22,1,l,d,h,b):52}function Uc(l,d,h,b){return s?je(23,1,l,d,h,b):70}var tv=[null,[],[]];function Gc(l,d,h,b){if(s)return je(24,1,l,d,h,b);d>>>=0,h>>>=0,b>>>=0;for(var _=0,S=0;S<h;S++){var O=V()[d>>>2>>>0],N=V()[d+4>>>2>>>0];d+=8;for(var M=0;M<N;M++){var H=ve()[O+M>>>0],J=tv[l];H===0||H===10?((l===1?T:w)(oc(J)),J.length=0):J.push(H)}_+=N}return V()[b>>>2>>>0]=_,0}function rv(l){return l>>>0}s||function(){for(var l=t.numThreads-1;l--;)ec();Wa.unshift(()=>{Vr++,function(d){s?d():Promise.all(Tr.map(Ql)).then(d)}(()=>Hl())})}();for(var Wc=Array(256),Jo=0;256>Jo;++Jo)Wc[Jo]=String.fromCharCode(Jo);_c=Wc,wr=t.BindingError=class extends Error{constructor(l){super(l),this.name="BindingError"}},t.InternalError=class extends Error{constructor(l){super(l),this.name="InternalError"}},hr.push(0,1,void 0,1,null,1,!0,1,!1,1),t.count_emval_handles=()=>hr.length/2-5-Ja.length;var U,nv=[Ha,Xl,tc,ic,ac,uc,lc,cc,fc,dc,pc,mc,hc,bc,gc,yc,kc,Dc,Bc,Lc,Mc,Vc,Fc,Uc,Gc];(async function(){function l(b,_){return U=b.exports,U=function(){var S=U,O={};for(let[N,M]of Object.entries(S))O[N]=typeof M=="function"?(...H)=>{Ko.push(N);try{return M(...H)}finally{le||(Ko.pop(),Zt&&Ir===1&&Ko.length===0&&(Ir=0,xr+=1,qo(Xf),typeof Fibers<"u"&&Fibers.le()))}}:M;return O}(),U=function(){var S=U,O=M=>H=>M(H)>>>0,N=M=>()=>M()>>>0;return(S=Object.assign({},S)).Cb=O(S.Cb),S.fc=N(S.fc),S.ic=O(S.ic),S.vc=O(S.vc),S.wc=N(S.wc),S.Ac=O(S.Ac),S}(),Zl.push(U.jc),A=_,Hl(),U}Vr++;var d=ql();if(t.instantiateWasm)return new Promise(b=>{t.instantiateWasm(d,(_,S)=>{l(_,S),b(_.exports)})});if(s)return new Promise(b=>{zt=_=>{var S=new WebAssembly.Instance(_,ql());b(l(S,_))}});Mr??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",y):y+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var h=await async function(b){var _=Mr;if(!te&&typeof WebAssembly.instantiateStreaming=="function"&&!ge(_))try{var S=fetch(_,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(S,b)}catch(O){w(`wasm streaming compile failed: ${O}`),w("falling back to ArrayBuffer instantiation")}return async function(O,N){try{var M=await async function(H){if(!te)try{var J=await f(H);return new Uint8Array(J)}catch{}if(H==Mr&&te)H=new Uint8Array(te);else{if(!p)throw"both async and sync fetching of the wasm failed";H=p(H)}return H}(O);return await WebAssembly.instantiate(M,N)}catch(H){w(`failed to asynchronously prepare wasm: ${H}`),pr(H)}}(_,b)}(d);return l(h.instance,h.module)}catch(b){return r(b),Promise.reject(b)}})();var Hc=l=>(Hc=U.Cb)(l),qc=()=>(qc=U.Db)();t._OrtInit=(l,d)=>(t._OrtInit=U.Eb)(l,d),t._OrtGetLastError=(l,d)=>(t._OrtGetLastError=U.Fb)(l,d),t._OrtCreateSessionOptions=(l,d,h,b,_,S,O,N,M,H)=>(t._OrtCreateSessionOptions=U.Gb)(l,d,h,b,_,S,O,N,M,H),t._OrtAppendExecutionProvider=(l,d)=>(t._OrtAppendExecutionProvider=U.Hb)(l,d),t._OrtAddFreeDimensionOverride=(l,d,h)=>(t._OrtAddFreeDimensionOverride=U.Ib)(l,d,h),t._OrtAddSessionConfigEntry=(l,d,h)=>(t._OrtAddSessionConfigEntry=U.Jb)(l,d,h),t._OrtReleaseSessionOptions=l=>(t._OrtReleaseSessionOptions=U.Kb)(l),t._OrtCreateSession=(l,d,h)=>(t._OrtCreateSession=U.Lb)(l,d,h),t._OrtReleaseSession=l=>(t._OrtReleaseSession=U.Mb)(l),t._OrtGetInputOutputCount=(l,d,h)=>(t._OrtGetInputOutputCount=U.Nb)(l,d,h),t._OrtGetInputName=(l,d)=>(t._OrtGetInputName=U.Ob)(l,d),t._OrtGetOutputName=(l,d)=>(t._OrtGetOutputName=U.Pb)(l,d),t._OrtFree=l=>(t._OrtFree=U.Qb)(l),t._OrtCreateTensor=(l,d,h,b,_,S)=>(t._OrtCreateTensor=U.Rb)(l,d,h,b,_,S),t._OrtGetTensorData=(l,d,h,b,_)=>(t._OrtGetTensorData=U.Sb)(l,d,h,b,_),t._OrtReleaseTensor=l=>(t._OrtReleaseTensor=U.Tb)(l),t._OrtCreateRunOptions=(l,d,h,b)=>(t._OrtCreateRunOptions=U.Ub)(l,d,h,b),t._OrtAddRunConfigEntry=(l,d,h)=>(t._OrtAddRunConfigEntry=U.Vb)(l,d,h),t._OrtReleaseRunOptions=l=>(t._OrtReleaseRunOptions=U.Wb)(l),t._OrtCreateBinding=l=>(t._OrtCreateBinding=U.Xb)(l),t._OrtBindInput=(l,d,h)=>(t._OrtBindInput=U.Yb)(l,d,h),t._OrtBindOutput=(l,d,h,b)=>(t._OrtBindOutput=U.Zb)(l,d,h,b),t._OrtClearBoundOutputs=l=>(t._OrtClearBoundOutputs=U._b)(l),t._OrtReleaseBinding=l=>(t._OrtReleaseBinding=U.$b)(l),t._OrtRunWithBinding=(l,d,h,b,_)=>(t._OrtRunWithBinding=U.ac)(l,d,h,b,_),t._OrtRun=(l,d,h,b,_,S,O,N)=>(t._OrtRun=U.bc)(l,d,h,b,_,S,O,N),t._OrtEndProfiling=l=>(t._OrtEndProfiling=U.cc)(l),t._JsepOutput=(l,d,h)=>(t._JsepOutput=U.dc)(l,d,h),t._JsepGetNodeName=l=>(t._JsepGetNodeName=U.ec)(l);var Yo=()=>(Yo=U.fc)(),Jt=t._free=l=>(Jt=t._free=U.gc)(l),Qo=t._malloc=l=>(Qo=t._malloc=U.ic)(l),ss=(l,d,h,b,_,S)=>(ss=U.kc)(l,d,h,b,_,S),Kc=()=>(Kc=U.lc)(),jc=(l,d,h,b,_)=>(jc=U.mc)(l,d,h,b,_),Xc=l=>(Xc=U.nc)(l),us=l=>(us=U.oc)(l),Zc=(l,d)=>(Zc=U.pc)(l,d),Jc=()=>(Jc=U.qc)(),ye=(l,d)=>(ye=U.rc)(l,d),Wn=l=>(Wn=U.sc)(l),Yc=(l,d)=>(Yc=U.tc)(l,d),pe=l=>(pe=U.uc)(l),ls=l=>(ls=U.vc)(l),me=()=>(me=U.wc)(),Qc=l=>(Qc=U.xc)(l),ef=l=>(ef=U.yc)(l),tf=(l,d,h)=>(tf=U.zc)(l,d,h),rf=l=>(rf=U.Ac)(l),nf=t.dynCall_iii=(l,d,h)=>(nf=t.dynCall_iii=U.Bc)(l,d,h),of=t.dynCall_vi=(l,d)=>(of=t.dynCall_vi=U.Cc)(l,d),cs=t.dynCall_ii=(l,d)=>(cs=t.dynCall_ii=U.Dc)(l,d),af=t.dynCall_vii=(l,d,h)=>(af=t.dynCall_vii=U.Ec)(l,d,h),sf=t.dynCall_iiii=(l,d,h,b)=>(sf=t.dynCall_iiii=U.Fc)(l,d,h,b),uf=t.dynCall_viii=(l,d,h,b)=>(uf=t.dynCall_viii=U.Gc)(l,d,h,b),lf=t.dynCall_iiiii=(l,d,h,b,_)=>(lf=t.dynCall_iiiii=U.Hc)(l,d,h,b,_),cf=t.dynCall_viiii=(l,d,h,b,_)=>(cf=t.dynCall_viiii=U.Ic)(l,d,h,b,_),ff=t.dynCall_viiiiii=(l,d,h,b,_,S,O)=>(ff=t.dynCall_viiiiii=U.Jc)(l,d,h,b,_,S,O),df=t.dynCall_viiiiiii=(l,d,h,b,_,S,O,N)=>(df=t.dynCall_viiiiiii=U.Kc)(l,d,h,b,_,S,O,N),pf=t.dynCall_ji=(l,d)=>(pf=t.dynCall_ji=U.Lc)(l,d),mf=t.dynCall_v=l=>(mf=t.dynCall_v=U.Mc)(l),hf=t.dynCall_viiiii=(l,d,h,b,_,S)=>(hf=t.dynCall_viiiii=U.Nc)(l,d,h,b,_,S),bf=t.dynCall_i=l=>(bf=t.dynCall_i=U.Oc)(l),gf=t.dynCall_fii=(l,d,h)=>(gf=t.dynCall_fii=U.Pc)(l,d,h),yf=t.dynCall_viiiiiiii=(l,d,h,b,_,S,O,N,M)=>(yf=t.dynCall_viiiiiiii=U.Qc)(l,d,h,b,_,S,O,N,M),_f=t.dynCall_viiiiiiiiii=(l,d,h,b,_,S,O,N,M,H,J)=>(_f=t.dynCall_viiiiiiiiii=U.Rc)(l,d,h,b,_,S,O,N,M,H,J),xf=t.dynCall_jiii=(l,d,h,b)=>(xf=t.dynCall_jiii=U.Sc)(l,d,h,b),Tf=t.dynCall_dii=(l,d,h)=>(Tf=t.dynCall_dii=U.Tc)(l,d,h),wf=t.dynCall_viiiiiiiii=(l,d,h,b,_,S,O,N,M,H)=>(wf=t.dynCall_viiiiiiiii=U.Uc)(l,d,h,b,_,S,O,N,M,H),vf=t.dynCall_viiiiiiiiiii=(l,d,h,b,_,S,O,N,M,H,J,oe)=>(vf=t.dynCall_viiiiiiiiiii=U.Vc)(l,d,h,b,_,S,O,N,M,H,J,oe),If=t.dynCall_iiiiii=(l,d,h,b,_,S)=>(If=t.dynCall_iiiiii=U.Wc)(l,d,h,b,_,S),Sf=t.dynCall_iij=(l,d,h)=>(Sf=t.dynCall_iij=U.Xc)(l,d,h),$f=t.dynCall_iiiiiiiiii=(l,d,h,b,_,S,O,N,M,H)=>($f=t.dynCall_iiiiiiiiii=U.Yc)(l,d,h,b,_,S,O,N,M,H),Af=t.dynCall_iiiiiiiiiii=(l,d,h,b,_,S,O,N,M,H,J)=>(Af=t.dynCall_iiiiiiiiiii=U.Zc)(l,d,h,b,_,S,O,N,M,H,J),Of=t.dynCall_vij=(l,d,h)=>(Of=t.dynCall_vij=U._c)(l,d,h),Pf=t.dynCall_iiif=(l,d,h,b)=>(Pf=t.dynCall_iiif=U.$c)(l,d,h,b),Cf=t.dynCall_iiij=(l,d,h,b)=>(Cf=t.dynCall_iiij=U.ad)(l,d,h,b),Ef=t.dynCall_fiii=(l,d,h,b)=>(Ef=t.dynCall_fiii=U.bd)(l,d,h,b),kf=t.dynCall_viiiiiiiiiiiii=(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)=>(kf=t.dynCall_viiiiiiiiiiiii=U.cd)(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue),Df=t.dynCall_vjiii=(l,d,h,b,_)=>(Df=t.dynCall_vjiii=U.dd)(l,d,h,b,_),Bf=t.dynCall_vif=(l,d,h)=>(Bf=t.dynCall_vif=U.ed)(l,d,h),Nf=t.dynCall_iiiiiii=(l,d,h,b,_,S,O)=>(Nf=t.dynCall_iiiiiii=U.fd)(l,d,h,b,_,S,O),Rf=t.dynCall_iiiij=(l,d,h,b,_)=>(Rf=t.dynCall_iiiij=U.gd)(l,d,h,b,_),zf=t.dynCall_iiiiiiii=(l,d,h,b,_,S,O,N)=>(zf=t.dynCall_iiiiiiii=U.hd)(l,d,h,b,_,S,O,N),Lf=t.dynCall_viiiiiiiiiiii=(l,d,h,b,_,S,O,N,M,H,J,oe,_e)=>(Lf=t.dynCall_viiiiiiiiiiii=U.id)(l,d,h,b,_,S,O,N,M,H,J,oe,_e),Mf=t.dynCall_diii=(l,d,h,b)=>(Mf=t.dynCall_diii=U.jd)(l,d,h,b),Vf=t.dynCall_jiiii=(l,d,h,b,_)=>(Vf=t.dynCall_jiiii=U.kd)(l,d,h,b,_),Ff=t.dynCall_viiij=(l,d,h,b,_)=>(Ff=t.dynCall_viiij=U.ld)(l,d,h,b,_),Uf=t.dynCall_fiiii=(l,d,h,b,_)=>(Uf=t.dynCall_fiiii=U.md)(l,d,h,b,_),Gf=t.dynCall_viiif=(l,d,h,b,_)=>(Gf=t.dynCall_viiif=U.nd)(l,d,h,b,_),Wf=t.dynCall_diiii=(l,d,h,b,_)=>(Wf=t.dynCall_diiii=U.od)(l,d,h,b,_),Hf=t.dynCall_viiid=(l,d,h,b,_)=>(Hf=t.dynCall_viiid=U.pd)(l,d,h,b,_),qf=t.dynCall_iiiijii=(l,d,h,b,_,S,O)=>(qf=t.dynCall_iiiijii=U.qd)(l,d,h,b,_,S,O),Kf=t.dynCall_iiiiiij=(l,d,h,b,_,S,O)=>(Kf=t.dynCall_iiiiiij=U.rd)(l,d,h,b,_,S,O),jf=l=>(jf=U.sd)(l),Xf=()=>(Xf=U.td)(),Zf=l=>(Zf=U.ud)(l),Jf=()=>(Jf=U.vd)();function ov(l,d,h){var b=me();try{af(l,d,h)}catch(_){if(pe(b),_!==_+0)throw _;ye(1,0)}}function iv(l,d,h){var b=me();try{return nf(l,d,h)}catch(_){if(pe(b),_!==_+0)throw _;ye(1,0)}}function av(l,d){var h=me();try{of(l,d)}catch(b){if(pe(h),b!==b+0)throw b;ye(1,0)}}function sv(l,d){var h=me();try{return cs(l,d)}catch(b){if(pe(h),b!==b+0)throw b;ye(1,0)}}function uv(l,d,h,b){var _=me();try{return sf(l,d,h,b)}catch(S){if(pe(_),S!==S+0)throw S;ye(1,0)}}function lv(l,d,h,b,_){var S=me();try{cf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function cv(l,d,h,b,_){var S=me();try{return lf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function fv(l,d,h,b){var _=me();try{uf(l,d,h,b)}catch(S){if(pe(_),S!==S+0)throw S;ye(1,0)}}function dv(l,d,h,b,_,S,O){var N=me();try{return Nf(l,d,h,b,_,S,O)}catch(M){if(pe(N),M!==M+0)throw M;ye(1,0)}}function pv(l){var d=me();try{mf(l)}catch(h){if(pe(d),h!==h+0)throw h;ye(1,0)}}function mv(l,d,h){var b=me();try{return Sf(l,d,h)}catch(_){if(pe(b),_!==_+0)throw _;ye(1,0)}}function hv(l,d,h,b,_,S){var O=me();try{hf(l,d,h,b,_,S)}catch(N){if(pe(O),N!==N+0)throw N;ye(1,0)}}function bv(l,d,h){var b=me();try{Of(l,d,h)}catch(_){if(pe(b),_!==_+0)throw _;ye(1,0)}}function gv(l,d,h,b,_,S,O){var N=me();try{ff(l,d,h,b,_,S,O)}catch(M){if(pe(N),M!==M+0)throw M;ye(1,0)}}function yv(l,d,h,b,_,S,O,N){var M=me();try{df(l,d,h,b,_,S,O,N)}catch(H){if(pe(M),H!==H+0)throw H;ye(1,0)}}function _v(l,d,h,b,_,S){var O=me();try{return If(l,d,h,b,_,S)}catch(N){if(pe(O),N!==N+0)throw N;ye(1,0)}}function xv(l,d,h,b,_,S,O,N){var M=me();try{return zf(l,d,h,b,_,S,O,N)}catch(H){if(pe(M),H!==H+0)throw H;ye(1,0)}}function Tv(l,d,h,b,_,S,O,N,M,H){var J=me();try{wf(l,d,h,b,_,S,O,N,M,H)}catch(oe){if(pe(J),oe!==oe+0)throw oe;ye(1,0)}}function wv(l,d,h,b,_,S,O,N,M){var H=me();try{yf(l,d,h,b,_,S,O,N,M)}catch(J){if(pe(H),J!==J+0)throw J;ye(1,0)}}function vv(l){var d=me();try{return bf(l)}catch(h){if(pe(d),h!==h+0)throw h;ye(1,0)}}function Iv(l,d,h,b,_,S,O,N,M,H){var J=me();try{return $f(l,d,h,b,_,S,O,N,M,H)}catch(oe){if(pe(J),oe!==oe+0)throw oe;ye(1,0)}}function Sv(l,d,h){var b=me();try{return gf(l,d,h)}catch(_){if(pe(b),_!==_+0)throw _;ye(1,0)}}function $v(l,d,h,b){var _=me();try{return xf(l,d,h,b)}catch(S){if(pe(_),S!==S+0)throw S;return ye(1,0),0n}}function Av(l,d,h){var b=me();try{return Tf(l,d,h)}catch(_){if(pe(b),_!==_+0)throw _;ye(1,0)}}function Ov(l,d,h,b,_,S,O,N,M,H,J,oe){var _e=me();try{vf(l,d,h,b,_,S,O,N,M,H,J,oe)}catch(Ue){if(pe(_e),Ue!==Ue+0)throw Ue;ye(1,0)}}function Pv(l,d,h,b,_,S,O,N,M,H,J){var oe=me();try{_f(l,d,h,b,_,S,O,N,M,H,J)}catch(_e){if(pe(oe),_e!==_e+0)throw _e;ye(1,0)}}function Cv(l,d,h,b,_,S,O,N,M,H,J){var oe=me();try{return Af(l,d,h,b,_,S,O,N,M,H,J)}catch(_e){if(pe(oe),_e!==_e+0)throw _e;ye(1,0)}}function Ev(l,d,h,b){var _=me();try{return Pf(l,d,h,b)}catch(S){if(pe(_),S!==S+0)throw S;ye(1,0)}}function kv(l,d,h,b){var _=me();try{return Cf(l,d,h,b)}catch(S){if(pe(_),S!==S+0)throw S;ye(1,0)}}function Dv(l,d,h,b){var _=me();try{return Ef(l,d,h,b)}catch(S){if(pe(_),S!==S+0)throw S;ye(1,0)}}function Bv(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue){var Ot=me();try{kf(l,d,h,b,_,S,O,N,M,H,J,oe,_e,Ue)}catch(Hn){if(pe(Ot),Hn!==Hn+0)throw Hn;ye(1,0)}}function Nv(l,d,h,b,_){var S=me();try{Df(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function Rv(l,d,h){var b=me();try{Bf(l,d,h)}catch(_){if(pe(b),_!==_+0)throw _;ye(1,0)}}function zv(l,d){var h=me();try{return pf(l,d)}catch(b){if(pe(h),b!==b+0)throw b;return ye(1,0),0n}}function Lv(l,d,h,b,_){var S=me();try{return Rf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function Mv(l,d,h,b,_,S,O,N,M,H,J,oe,_e){var Ue=me();try{Lf(l,d,h,b,_,S,O,N,M,H,J,oe,_e)}catch(Ot){if(pe(Ue),Ot!==Ot+0)throw Ot;ye(1,0)}}function Vv(l,d,h,b){var _=me();try{return Mf(l,d,h,b)}catch(S){if(pe(_),S!==S+0)throw S;ye(1,0)}}function Fv(l,d,h,b,_){var S=me();try{return Vf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;return ye(1,0),0n}}function Uv(l,d,h,b,_){var S=me();try{Ff(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function Gv(l,d,h,b,_){var S=me();try{return Uf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function Wv(l,d,h,b,_){var S=me();try{Gf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function Hv(l,d,h,b,_){var S=me();try{return Wf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function qv(l,d,h,b,_){var S=me();try{Hf(l,d,h,b,_)}catch(O){if(pe(S),O!==O+0)throw O;ye(1,0)}}function Kv(l,d,h,b,_,S,O){var N=me();try{return qf(l,d,h,b,_,S,O)}catch(M){if(pe(N),M!==M+0)throw M;ye(1,0)}}function jv(l,d,h,b,_,S,O){var N=me();try{return Kf(l,d,h,b,_,S,O)}catch(M){if(pe(N),M!==M+0)throw M;ye(1,0)}}return t.stackSave=()=>me(),t.stackRestore=l=>pe(l),t.stackAlloc=l=>ls(l),t.setValue=function(l,d,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":ee()[l>>>0]=d;break;case"i16":rt()[l>>>1>>>0]=d;break;case"i32":L()[l>>>2>>>0]=d;break;case"i64":W[l>>>3]=BigInt(d);break;case"float":re()[l>>>2>>>0]=d;break;case"double":Ae()[l>>>3>>>0]=d;break;case"*":V()[l>>>2>>>0]=d;break;default:pr(`invalid type for setValue: ${h}`)}},t.getValue=function(l,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return ee()[l>>>0];case"i16":return rt()[l>>>1>>>0];case"i32":return L()[l>>>2>>>0];case"i64":return W[l>>>3];case"float":return re()[l>>>2>>>0];case"double":return Ae()[l>>>3>>>0];case"*":return V()[l>>>2>>>0];default:pr(`invalid type for getValue: ${d}`)}},t.UTF8ToString=Ye,t.stringToUTF8=hn,t.lengthBytesUTF8=sc,function l(){if(0<Vr)Fn=l;else if(s)e(t),dr();else{for(;0<Wa.length;)Wa.shift()(t);0<Vr?Fn=l:(t.calledRun=!0,le||(dr(),e(t)))}}(),t.PTR_SIZE=4,o}),NS=Fg,RS=globalThis.self?.name?.startsWith("em-pthread");RS&&Fg()});var qg,zS,$t,Kg,ol,LS,MS,jg,VS,Wg,Xg,Hg,Zg,Yi=E(()=>{"use strict";Ji();qg=typeof location>"u"?void 0:location.origin,zS=()=>{if(!!1)return import.meta.url?.startsWith("file:")?new URL(new URL("ort.all.bundle.min.mjs",import.meta.url).href,qg).href:import.meta.url},$t=zS(),Kg=()=>{if($t&&!$t.startsWith("blob:"))return $t.substring(0,$t.lastIndexOf("/")+1)},ol=(n,e)=>{try{let r=e??$t;return(r?new URL(n,r):new URL(n)).origin===qg}catch{return!1}},LS=(n,e)=>{let r=e??$t;try{return(r?new URL(n,r):new URL(n)).href}catch{return}},MS=(n,e)=>`${e??"./"}${n}`,jg=async n=>{let r=await(await fetch(n,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},VS=async n=>(await import(/*webpackIgnore:true*/n)).default,Wg=(Vg(),qn(Mg)).default,Xg=async()=>{if(!$t)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(ol($t))return[void 0,Wg()];let n=await jg($t);return[n,Wg(n)]},Hg=(Gg(),qn(Ug)).default,Zg=async(n,e,r)=>{if(!n&&!e&&Hg&&$t&&ol($t))return[void 0,Hg];{let t="ort-wasm-simd-threaded.jsep.mjs",o=n??LS(t,e),i=!!1&&r&&o&&!ol(o,e),a=i?await jg(o):o??MS(t,e);return[i?a:void 0,await VS(a)]}}});var il,al,sa,Jg,FS,US,Qi,Je,Br=E(()=>{"use strict";Yi();al=!1,sa=!1,Jg=!1,FS=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},US=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Qi=async n=>{if(al)return Promise.resolve();if(sa)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Jg)throw new Error("previous call to 'initializeWebAssembly()' failed.");sa=!0;let e=n.initTimeout,r=n.numThreads;if(!US())throw new Error("WebAssembly SIMD is not supported in the current environment.");let t=FS();r>1&&!t&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),n.numThreads=r=1);let o=n.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,s=a?.href??a,u=o?.wasm,c=u?.href??u,f=n.wasmBinary,[p,m]=await Zg(s,i,r>1),g=!1,y=[];if(e>0&&y.push(new Promise(x=>{setTimeout(()=>{g=!0,x()},e)})),y.push(new Promise((x,v)=>{let T={numThreads:r};if(f)T.wasmBinary=f;else if(c||i)T.locateFile=w=>c??i+w;else if(s&&s.indexOf("blob:")!==0)T.locateFile=w=>new URL(w,s).href;else if(p){let w=Kg();w&&(T.locateFile=I=>w+I)}m(T).then(w=>{sa=!1,al=!0,il=w,x(),p&&URL.revokeObjectURL(p)},w=>{sa=!1,Jg=!0,v(w)})})),await Promise.race(y),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Je=()=>{if(al&&il)return il;throw new Error("WebAssembly is not initialized yet.")}});var at,Bo,Pe,ua=E(()=>{"use strict";Br();at=(n,e)=>{let r=Je(),t=r.lengthBytesUTF8(n)+1,o=r._malloc(t);return r.stringToUTF8(n,o,t),e.push(o),o},Bo=(n,e,r,t)=>{if(typeof n=="object"&&n!==null){if(r.has(n))throw new Error("Circular reference in options");r.add(n)}Object.entries(n).forEach(([o,i])=>{let a=e?e+o:o;if(typeof i=="object")Bo(i,a+".",r,t);else if(typeof i=="string"||typeof i=="number")t(a,i.toString());else if(typeof i=="boolean")t(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Pe=n=>{let e=Je(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),a=e.getValue(o+t,"*"),s=a?e.UTF8ToString(a):"";throw new Error(`${n} ERROR_CODE: ${i}, ERROR_MESSAGE: ${s}`)}finally{e.stackRestore(r)}}});var Yg,Qg=E(()=>{"use strict";Br();ua();Yg=n=>{let e=Je(),r=0,t=[],o=n||{};try{if(n?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof n.logSeverityLevel!="number"||!Number.isInteger(n.logSeverityLevel)||n.logSeverityLevel<0||n.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${n.logSeverityLevel}`);if(n?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof n.logVerbosityLevel!="number"||!Number.isInteger(n.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${n.logVerbosityLevel}`);n?.terminate===void 0&&(o.terminate=!1);let i=0;return n?.tag!==void 0&&(i=at(n.tag,t)),r=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&Pe("Can't create run options."),n?.extra!==void 0&&Bo(n.extra,"",new WeakSet,(a,s)=>{let u=at(a,t),c=at(s,t);e._OrtAddRunConfigEntry(r,u,c)!==0&&Pe(`Can't set a run config entry: ${a} - ${s}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),t.forEach(a=>e._free(a)),i}}});var GS,WS,HS,qS,ey,ty=E(()=>{"use strict";Br();ua();GS=n=>{switch(n){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${n}`)}},WS=n=>{switch(n){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${n}`)}},HS=n=>{n.extra||(n.extra={}),n.extra.session||(n.extra.session={});let e=n.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),n.executionProviders&&n.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(n.enableMemPattern=!1)},qS=(n,e,r)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let s=t?.deviceType;if(s){let u=at("deviceType",r),c=at(s,r);Je()._OrtAddSessionConfigEntry(n,u,c)!==0&&Pe(`Can't set a session config entry: 'deviceType' - ${s}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let a=t;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let s=at("preferredLayout",r),u=at(a.preferredLayout,r);Je()._OrtAddSessionConfigEntry(n,s,u)!==0&&Pe(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=at(o,r);Je()._OrtAppendExecutionProvider(n,i)!==0&&Pe(`Can't append execution provider: ${o}.`)}},ey=n=>{let e=Je(),r=0,t=[],o=n||{};HS(o);try{let i=GS(o.graphOptimizationLevel??"all"),a=WS(o.executionMode??"sequential"),s=typeof o.logId=="string"?at(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let c=o.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let f=typeof o.optimizedModelFilePath=="string"?at(o.optimizedModelFilePath,t):0;if(r=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,s,u,c,f),r===0&&Pe("Can't create session options."),o.executionProviders&&qS(r,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let p=at("enableGraphCapture",t),m=at(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(r,p,m)!==0&&Pe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[p,m]of Object.entries(o.freeDimensionOverrides)){if(typeof p!="string")throw new Error(`free dimension override name must be a string: ${p}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let g=at(p,t);e._OrtAddFreeDimensionOverride(r,g,m)!==0&&Pe(`Can't set a free dimension override: ${p} - ${m}.`)}return o.extra!==void 0&&Bo(o.extra,"",new WeakSet,(p,m)=>{let g=at(p,t),y=at(m,t);e._OrtAddSessionConfigEntry(r,g,y)!==0&&Pe(`Can't set a session config entry: ${p} - ${m}.`)}),[r,t]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r)!==0&&Pe("Can't release session options."),t.forEach(a=>e._free(a)),i}}});var Nn,Nr,Rr,la,No,ca,fa,sl,ce=E(()=>{"use strict";Nn=n=>{switch(n){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${n}`)}},Nr=n=>{switch(n){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${n}`)}},Rr=(n,e)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][n],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return r>0?Math.ceil(t*r):void 0},la=n=>{switch(n){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${n}`)}},No=n=>{switch(n){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${n}`)}},ca=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",fa=n=>n==="float32"||n==="float16"||n==="int32"||n==="int64"||n==="uint32"||n==="uint64"||n==="int8"||n==="uint8"||n==="bool"||n==="uint4"||n==="int4",sl=n=>{switch(n){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${n}`)}}});var Ro,ul=E(()=>{"use strict";Ji();Ro=async n=>{if(typeof n=="string")if(!1)try{let{readFile:e}=fs("node:fs/promises");return new Uint8Array(await e(n))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=fs("node:fs"),t=r(n),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(n);if(!e.ok)throw new Error(`failed to load external data file: ${n}`);let r=e.headers.get("Content-Length"),t=r?parseInt(r,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${n}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(s){if(s instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw s}let a=0;for(;;){let{done:s,value:u}=await o.read();if(s)break;let c=u.byteLength;new Uint8Array(i,a,c).set(u),a+=c}return new Uint8Array(i,0,t)}}else return n instanceof Blob?new Uint8Array(await n.arrayBuffer()):n instanceof Uint8Array?n:new Uint8Array(n)}});var KS,jS,ry,ny,da,XS,we,ir=E(()=>{"use strict";ce();KS=["V","I","W","E","F"],jS=(n,e)=>{console.log(`[${KS[n]},${new Date().toISOString()}]${e}`)},da=(n,e)=>{ry=n,ny=e},XS=(n,e)=>{let r=No(n),t=No(ry);r>=t&&jS(r,typeof e=="function"?e():e)},we=(...n)=>{ny&&XS(...n)}});var pa,ll=E(()=>{"use strict";ce();pa=(n,e)=>new(la(e))(n)});var ma=E(()=>{"use strict"});var oy,cl,fl,ZS,JS,iy,pl,dl,sy,uy=E(()=>{"use strict";ir();ma();oy=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),cl=[],fl=n=>Math.ceil(Number(n)/16)*16,ZS=n=>{for(let e=0;e<cl.length;e++){let r=cl[e];if(n<=r)return r}return Math.ceil(n/16)*16},JS=1,iy=()=>JS++,pl=async(n,e,r,t)=>{let o=fl(r),i=n.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=n.getCommandEncoder();n.endComputePass(),a.copyBufferToBuffer(e,0,i,0,o),n.flush(),await i.mapAsync(GPUMapMode.READ);let s=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(s,0,r)),u}else return new Uint8Array(s.slice(0,r))}finally{i.destroy()}},dl=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of oy)cl.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(e,r){let t=r.buffer,o=r.byteOffset,i=r.byteLength,a=fl(i),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),c=u.getMappedRange();new Uint8Array(c).set(new Uint8Array(t,o,i)),u.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(u,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([f.finish()]),u.destroy(),we("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,r){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=fl(t.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,r,t){let o;if(t){if(o=t[0],e===t[1])return we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=iy();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:r}),we("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),we("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=ZS(e),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let c=(i?this.freeBuffers:this.freeUniformBuffers).get(t);c?c.length>0?o=c.pop():o=this.backend.device.createBuffer({size:t,usage:r}):o=this.backend.device.createBuffer({size:t,usage:r})}else o=this.backend.device.createBuffer({size:t,usage:r});let s={id:iy(),type:0,buffer:o};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),we("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let r=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(r);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return we("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,r){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await pl(this.backend,t.gpuData.buffer,t.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let r=oy.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];r===void 0||t.length>=r?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let r of this.buffersPending)e.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let r=this.capturedPendingBuffers.get(e);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(we("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},sy=(...n)=>new dl(...n)});var ml,fe,Ze=E(()=>{"use strict";ml=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=n=>new ml(n)});var hl,ar,D,ln,ha,ly,cy,be=E(()=>{"use strict";hl=class{static calcMatMulShape(e,r){return e[1]!==r[0]?void 0:[e[0],r[1]]}},ar=class{static calcShape(e,r,t=!1){let o=e.length,i=r.length;if(o===0)return r;if(i===0)return e;let a=Math.max(e.length,r.length),s=new Array(a);if(t){if(o<2||i<2)return;let u=hl.calcMatMulShape([e[o-2],e[o-1]],[r[i-2],r[i-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=t?3:1;u<=a;u++){let c=o-u<0?1:e[o-u],f=i-u<0?1:r[i-u];if(c!==f&&c>1&&f>1)return;let p=Math.max(c,f);if(c&&f)s[a-u]=Math.max(c,f);else{if(p>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,r){let t=e.length,o=r.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==r[o-i])return!1;return!0}},D=class n{static size(e){return n.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%r===0){o[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return n.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,t){let o=1;for(let i=r;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let t=new Array(r);t[r-1]=1,t[r-2]=e[r-1];for(let o=r-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(t=>this.normalizeAxis(t,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(t=>e[t]):e.slice().reverse()}static padShape(e,r){let t=e.length;return e.map((o,i)=>o+r[i]+r[i+t])}static areEqual(e,r){return e.length!==r.length?!1:e.every((t,o)=>t===r[o])}},ln=class n{static adjustPoolAttributes(e,r,t,o,i,a){if(!e&&t.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let s=0;s<r.length-2;s++)s>=t.length?t.push(r[s+2]):t[s]=r[s+2];for(let s=0;s<t.length;s++)if(s<o.length){if(o[s]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let s=0;s<t.length;s++)if(s<i.length){if(i[s]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let s=0;s<t.length*2;s++)if(s<a.length){if(a[s]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let s=0;s<t.length;s++){if(t[s]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[s]>=t[s]||a[s+t.length]>=t[s])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,t,o,i,a,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)n.adjustPadAndReturnShape(e[u+(a?1:2)],r[u],t[u],o[u],i,u,u+e.length-2,s)}}static computePoolOutputShape(e,r,t,o,i,a,s){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return n.computeShapeHelper(e,r,u,t,o,i,a,s),u}static computeConvOutputShape(e,r,t,o,i,a,s){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],r[0]];return n.computeShapeHelper(!1,e,u,t,o,i,a,s),u}static computeShapeHelper(e,r,t,o,i,a,s,u){if(e)for(let c=0;c<r.length-2;c++)t.push(1);else for(let c=0;c<r.length-2;c++)t.push(n.adjustPadAndReturnShape(r[c+2],o[c],i[c],a[c],s,c,c+r.length-2,u))}static adjustPadAndReturnShape(e,r,t,o,i,a,s,u){let c=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[a]=0,i[s]=0,Math.floor((e-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let p=((e+r-1)/r-1)*r+o-e;return i[a]=Math.floor(u==="SAME_LOWER"?(p+1)/2:p/2),i[s]=p-i[a],Math.floor((e+p-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[s]-c)/r+1)}},ha=class{static getShapeOfGemmResult(e,r,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let a,s,u;r?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let c=-1;if(o?(u=t[0],c=1):(u=t[1],c=0),t[c]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(i&&!ar.isValidBroadcast(i,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},ly=-34028234663852886e22,cy=34028234663852886e22});var cn,gl,Ve,st,q,Ee,yl,fn,Ht,Y,ba,B,G,fy,ga,bl,dy,Te=E(()=>{"use strict";ce();be();cn=64,gl=(n,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(n)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${n}`)}},Ve=(n,e=1)=>{let r=gl(n,e);return typeof r=="string"?r:r[0]},st=(n,e=1)=>{let r=gl(n,e);return typeof r=="string"?r:r[1]},q=(...n)=>{let e=[];return n.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:D.computeStrides(r)})}),e},Ee=n=>n%4===0?4:n%2===0?2:1,yl=(n="f32",e,r="0")=>!e||e===1?`${n}(${r})`:`vec${e}<${n}>(${r})`,fn=(n,e,r)=>n==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,Ht=(n,e)=>e===4?`(${n}.x + ${n}.y + ${n}.z + ${n}.w)`:e===2?`(${n}.x + ${n}.y)`:e===3?`(${n}.x + ${n}.y + ${n}.z)`:n,Y=(n,e,r,t)=>n.startsWith("uniforms.")&&r>4?typeof e=="string"?t==="f16"?`${n}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${n}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${n}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${n}[${Math.floor(e/4)}][${e%4}]`:r>1?`${n}[${e}]`:n,ba=(n,e,r,t,o)=>{let i=typeof r=="number",a=i?r:r.length,s=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,c=gl(e,o),f=typeof c=="string"?c:c[1],p=typeof c=="string"?c:c[0],m={indices:u,value:f,storage:p,tensor:e},g=V=>typeof V=="string"?V:`${V}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},x=i?"uniforms.":"",v=`${x}${n}_shape`,T=`${x}${n}_strides`,w="";for(let V=0;V<a-1;V++)w+=`
    let dim${V} = current / ${Y(T,V,a)};
    let rest${V} = current % ${Y(T,V,a)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;w+=`indices[${a-1}] = current;`;let I=a<2?"":`
  fn o2i_${n}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${w}
    return indices;
  }`,A=V=>(y.offsetToIndices=!0,a<2?V:`o2i_${n}(${V})`),P=[];if(a>=2)for(let V=a-1;V>=0;V--)P.push(`${Y(T,V,a)} * (indices[${V}])`);let k=a<2?"":`
  fn i2o_${n}(indices: ${m.indices}) -> u32 {
    return ${P.join("+")};
  }`,R=V=>(y.indicesToOffset=!0,a<2?V:`i2o_${n}(${V})`),z=(...V)=>a===0?"0u":`${m.indices}(${V.map(g).join(",")})`,F=(V,re)=>a<2?`${V}`:`${Y(V,re,a)}`,X=(V,re,Ae)=>a<2?`${V}=${Ae};`:`${Y(V,re,a)}=${Ae};`,Q={},de=(V,re)=>{y.broadcastedIndicesToOffset=!0;let Ae=`${re.name}broadcastedIndicesTo${n}Offset`;if(Ae in Q)return`${Ae}(${V})`;let zt=[];for(let Ge=a-1;Ge>=0;Ge--){let Ce=re.indicesGet("outputIndices",Ge+re.rank-a);zt.push(`${F(T,Ge)} * (${Ce} % ${F(v,Ge)})`)}return Q[Ae]=`fn ${Ae}(outputIndices: ${re.type.indices}) -> u32 {
             return ${zt.length>0?zt.join("+"):"0u"};
           }`,`${Ae}(${V})`},W=(V,re)=>(()=>{if(m.storage===m.value)return`${n}[${V}]=${re};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${n}[${V}]=vec2<u32>(u32(${re}), select(0u, 0xFFFFFFFFu, ${re} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${n}[${V}]=vec2<u32>(u32(${re}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${n}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${re}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),se=V=>(()=>{if(m.storage===m.value)return`${n}[${V}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${n}[${V}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${n}[${V}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${n}[${V}] & 0xFFu), bool(${n}[${V}] & 0xFF00u), bool(${n}[${V}] & 0xFF0000u), bool(${n}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),Fe=a<2?"":`
  fn get_${n}ByIndices(indices: ${m.indices}) -> ${f} {
    return ${se(`i2o_${n}(indices)`)};
  }`,te=a<2?"":(()=>{let V=s.map(Ae=>`d${Ae}: u32`).join(", "),re=s.map(Ae=>`d${Ae}`).join(", ");return`
  fn get_${n}(${V}) -> ${f} {
    return get_${n}ByIndices(${z(re)});
  }`})(),le=(...V)=>{if(V.length!==a)throw new Error(`indices length must be ${a}`);let re=V.map(g).join(",");return a===0?se("0u"):a===1?se(re[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${n}(${re})`)},ge=V=>a<2?se(V):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${n}ByIndices(${V})`),ee=a<2?"":`
  fn set_${n}ByIndices(indices: ${m.indices}, value: ${f}) {
    ${W(`i2o_${n}(indices)`,"value")}
  }`,ve=a<2?"":(()=>{let V=s.map(Ae=>`d${Ae}: u32`).join(", "),re=s.map(Ae=>`d${Ae}`).join(", ");return`
  fn set_${n}(${V}, value: ${f}) {
    set_${n}ByIndices(${z(re)}, value);
  }`})();return{impl:()=>{let V=[],re=!1;return y.offsetToIndices&&(V.push(I),re=!0),y.indicesToOffset&&(V.push(k),re=!0),y.broadcastedIndicesToOffset&&(Object.values(Q).forEach(Ae=>V.push(Ae)),re=!0),y.set&&(V.push(ve),re=!0),y.setByIndices&&(V.push(ee),re=!0),y.get&&(V.push(te),re=!0),y.getByIndices&&(V.push(Fe),re=!0),!i&&re&&V.unshift(`const ${v} = ${m.indices}(${r.join(",")});`,`const ${T} = ${m.indices}(${D.computeStrides(r).join(",")});`),V.join(`
`)},type:m,offsetToIndices:A,indicesToOffset:R,broadcastedIndicesToOffset:de,indices:z,indicesGet:F,indicesSet:X,set:(...V)=>{if(V.length!==a+1)throw new Error(`indices length must be ${a}`);let re=V[a];if(typeof re!="string")throw new Error("value must be string");let Ae=V.slice(0,a).map(g).join(",");return a===0?W("0u",re):a===1?W(Ae[0],re):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${n}(${Ae}, ${re})`)},setByOffset:W,setByIndices:(V,re)=>a<2?W(V,re):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${n}ByIndices(${V}, ${re});`),get:le,getByOffset:se,getByIndices:ge,usage:t,name:n,strides:T,shape:v,rank:a}},B=(n,e,r,t=1)=>ba(n,e,r,"input",t),G=(n,e,r,t=1)=>ba(n,e,r,"output",t),fy=(n,e,r)=>ba(n,e,r,"atomicOutput",1),ga=(n,e,r,t=1)=>ba(n,e,r,"internal",t),bl=class{constructor(e,r){this.normalizedDispatchGroup=e;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=cn){let r=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(r>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*t*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${t}, ${o})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,r){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${r}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(e,r,t=1){return this.uniforms.push({name:e,type:r,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:r,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${r}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${r}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${r}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[e(r.type),r.length??1])}},dy=(n,e)=>new bl(n,e)});var YS,py,QS,e$,t$,r$,ut,my,hy,yr=E(()=>{"use strict";ce();be();Ze();Te();YS=(n,e)=>{if(!n||n.length!==1)throw new Error("Transpose requires 1 input.");if(e.length!==0&&e.length!==n[0].dims.length)throw new Error(`perm size ${e.length} does not match input rank ${n[0].dims.length}`)},py=(n,e)=>e.length!==0?e:[...new Array(n).keys()].reverse(),QS=(n,e)=>D.sortBasedOnPerm(n,py(n.length,e)),e$=(n,e,r,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<e;++i)o+=`a[${n[i]}]=i[${i}];`;return o+="return a;}"},t$=(n,e)=>{let r=[],t=[];for(let o=0;o<n.length;++o)n[o]!==1&&r.push(n[o]),n[e[o]]!==1&&t.push(e[o]);return{newShape:r,newPerm:t}},r$=(n,e)=>{let r=0;for(let t=0;t<n.length;++t)if(e[n[t]]!==1){if(n[t]<r)return!1;r=n[t]}return!0},ut=(n,e)=>{let r=n.dataType,t=n.dims.length,o=py(t,e),i=QS(n.dims,o),a=n.dims,s=i,u=t<2||r$(o,n.dims),c;if(u)return c=x=>{let v=B("input",r,a,4),T=G("output",r,s,4);return`
  ${x.registerUniform("output_size","u32").declareVariables(v,T)}
  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let x=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(x/64/4)},programUniforms:[{type:12,data:Math.ceil(x/4)}]}},getShaderSource:c};let{newShape:f,newPerm:p}=t$(n.dims,o),m=D.areEqual(p,[2,3,1]),g=D.areEqual(p,[3,1,2]);if(f.length===2||m||g){a=m?[f[0],f[1]*f[2]]:g?[f[0]*f[1],f[2]]:f,s=[a[1],a[0]];let x=16;return c=v=>{let T=B("a",r,a.length),w=G("output",r,s.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(T,w)}
  var<workgroup> tile : array<array<${w.type.value}, ${x+1}>, ${x}>;
  ${v.mainStart([x,x,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${x} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${x}u + local_id.x;
    let input_row = workgroup_id_x * ${x}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${x}u + local_id.x;
    let output_row = workgroup_id_y * ${x}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${w.setByIndices(`${w.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(s[1]/x),y:Math.ceil(s[0]/x)},programUniforms:[{type:12,data:v},...q(a,s)]}},getShaderSource:c}}return c=x=>{let v=B("a",r,a.length),T=G("output",r,s.length);return`
  ${x.registerUniform("output_size","u32").declareVariables(v,T)}

  ${e$(o,t,v,T)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let x=D.size(i);return{outputs:[{dims:i,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...q(a,s)]}},getShaderSource:c}},my=(n,e)=>{YS(n.inputs,e.perm),n.compute(ut(n.inputs[0],e.perm))},hy=n=>fe({perm:n.perm})});var n$,o$,i$,a$,s$,u$,l$,c$,f$,d$,sr,by,gy,yy,_y,xy,Ty,wy,vy,Iy,Sy,$y=E(()=>{"use strict";ce();be();Te();ya();yr();n$={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},o$={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},i$={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},a$={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},s$=(n,e)=>{let r=[];for(let t=e-n;t<e;++t)r.push(t);return r},u$=(n,e)=>{let r=[],t=n.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&r.push(n[i]);let o=e.map(i=>n[i]);return[r,o]},l$=(n,e)=>{let r=n.length+e.length,t=[],o=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?t.push(n[o++]):t.push(1);return t},c$=(n,e)=>{for(let r=0;r<n.length;++r)if(n[n.length-r-1]!==e-1-r)return!1;return!0},f$=(n,e)=>{let r=[];if(!c$(n,e)){for(let t=0;t<e;++t)n.indexOf(t)===-1&&r.push(t);n.forEach(t=>r.push(t))}return r},d$=(n,e,r,t,o,i,a)=>{let s=r[0].dims,u=D.size(i),c=D.size(a),f=B("_A",r[0].dataType,s),p=G("output",o,i),m=64;u===1&&(m=256);let g=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,y=x=>`
        ${x.registerUniform("reduceSize","u32").declareVariables(f,p)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${x.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${i$[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${n$[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${o$[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${p.setByOffset("outputIndex",`${t==="mean"?`${p.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${p.type.storage}(${a$[t]})`}`)};
         }
        }`;return{name:n,shaderCache:{hint:`${e};${m}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:c}]})}},sr=(n,e,r,t)=>{let o=n.inputs.length===1?r:_l(n.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=n.inputs[0].dims.map((g,y)=>y));let a=D.normalizeAxes(i,n.inputs[0].dims.length),s=a,u=n.inputs[0],c=f$(s,n.inputs[0].dims.length);c.length>0&&(u=n.compute(ut(n.inputs[0],c),{inputs:[0],outputs:[-1]})[0],s=s$(s.length,u.dims.length));let[f,p]=u$(u.dims,s),m=f;o.keepDims&&(m=l$(f,a)),n.compute(d$(e,o.cacheKey,[u],t,n.inputs[0].dataType,m,p),{inputs:[u]})},by=(n,e)=>{sr(n,"ReduceMeanShared",e,"mean")},gy=(n,e)=>{sr(n,"ReduceL1Shared",e,"l1")},yy=(n,e)=>{sr(n,"ReduceL2Shared",e,"l2")},_y=(n,e)=>{sr(n,"ReduceLogSumExpShared",e,"logSumExp")},xy=(n,e)=>{sr(n,"ReduceMaxShared",e,"max")},Ty=(n,e)=>{sr(n,"ReduceMinShared",e,"min")},wy=(n,e)=>{sr(n,"ReduceProdShared",e,"prod")},vy=(n,e)=>{sr(n,"ReduceSumShared",e,"sum")},Iy=(n,e)=>{sr(n,"ReduceSumSquareShared",e,"sumSquare")},Sy=(n,e)=>{sr(n,"ReduceLogSumShared",e,"logSum")}});var ur,p$,_a,_l,lr,m$,h$,b$,g$,y$,_$,x$,T$,w$,v$,cr,Ay,Oy,Py,Cy,Ey,ky,Dy,By,Ny,Ry,ya=E(()=>{"use strict";ce();be();Ze();Te();$y();ur=n=>{if(!n||n.length===0||n.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(n.length===2&&n[1].dims.length!==1)throw new Error("Invalid axes input dims.")},p$=n=>["","",`var value = ${n.getByIndices("input_indices")};`,""],_a=(n,e,r,t,o,i,a=!1,s=!1)=>{let u=[],c=r[0].dims,f=c.length,p=D.normalizeAxes(o,f),m=!s&&p.length===0;c.forEach((v,T)=>{m||p.indexOf(T)>=0?a&&u.push(1):u.push(v)});let g=u.length,y=D.size(u);return{name:n,shaderCache:e,getShaderSource:v=>{let T=[],w=B("_A",r[0].dataType,f),I=G("output",i,g),A=t(w,I,p),P=A[2];for(let k=0,R=0;k<f;k++)m||p.indexOf(k)>=0?(a&&R++,P=`for(var j${k}: u32 = 0; j${k} < ${c[k]}; j${k}++) {
                  ${A[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${w.indicesSet("input_indices",k,`j${k}`)}
                  ${P}
                }`):(T.push(`${w.indicesSet("input_indices",k,I.indicesGet("output_indices",R))};`),R++);return`

        ${v.registerUniform("output_size","u32").declareVariables(w,I)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${I.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${A[0]}       // init ops for reduce max/min
          ${A[1]}
          ${P}
          ${A[3]}
          ${A.length===4?I.setByOffset("global_idx","value"):A.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...q(c,u)]})}},_l=(n,e)=>{let r=[];return n[1].dims[0]>0&&n[1].getBigInt64Array().forEach(t=>r.push(Number(t))),fe({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},lr=(n,e,r,t)=>{let o=n.inputs,i=o.length===1?r:_l(o,r);n.compute(_a(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?p$:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},m$=(n,e)=>{ur(n.inputs),lr(n,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},h$=(n,e)=>{ur(n.inputs),lr(n,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},b$=(n,e)=>{ur(n.inputs),lr(n,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},g$=(n,e)=>{ur(n.inputs),lr(n,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},y$=(n,e)=>{ur(n.inputs),lr(n,"ReduceMax",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(t.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},_$=(n,e)=>{ur(n.inputs),lr(n,"ReduceMean",e,(t,o,i)=>{let a=1;for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&(a*=n.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},x$=(n,e)=>{ur(n.inputs),lr(n,"ReduceMin",e,(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},T$=(n,e)=>{ur(n.inputs),lr(n,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},w$=(n,e)=>{ur(n.inputs),lr(n,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},v$=(n,e)=>{ur(n.inputs),lr(n,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},cr=(n,e,r)=>{if(e.length===0)return r;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=n[i]:o*=n[i];return o<32&&t>1024},Ay=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?_$(n,e):by(n,e)},Oy=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?h$(n,e):gy(n,e)},Py=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?b$(n,e):yy(n,e)},Cy=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?g$(n,e):_y(n,e)},Ey=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?y$(n,e):xy(n,e)},ky=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?x$(n,e):Ty(n,e)},Dy=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?T$(n,e):wy(n,e)},By=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?w$(n,e):vy(n,e)},Ny=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?v$(n,e):Iy(n,e)},Ry=(n,e)=>{cr(n.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?m$(n,e):Sy(n,e)}});var zy,Ly,My,xl,Vy=E(()=>{"use strict";ce();Ze();ya();zy=n=>{if(!n||n.length===0||n.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(n[0].dataType!==1)throw new Error("Invalid input type.")},Ly=(n,e)=>{zy(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(_a("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},My=(n,e)=>{zy(n.inputs);let r=(t,o,i)=>{let a=[];for(let s=0;s<t.rank;s++)(i.indexOf(s)>=0||i.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};n.compute(_a("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[n.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},xl=n=>fe(n)});var I$,Tl,S$,$$,A$,Rn,O$,Fy,xa=E(()=>{"use strict";ce();be();ma();Te();I$=(n,e)=>{let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4],s=n[5];if(a&&s)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],c=r.dims[1],f=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let p=o.dims[0]/3,m=p,g=m;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let I of e.qkvHiddenSizes)if(I%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");p=e.qkvHiddenSizes[0],m=e.qkvHiddenSizes[1],g=e.qkvHiddenSizes[2]}let y=c;if(p!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==p+m+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let x=0;if(a){if(m!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==m/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(x=a.dims[3])}let v=y+x,T=-1,w=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(s){if(s.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(s.dims[0]!==u||s.dims[1]!==e.numHeads||s.dims[2]!==c||s.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:c,pastSequenceLength:x,kvSequenceLength:y,totalSequenceLength:v,maxSequenceLength:T,inputHiddenSize:f,hiddenSize:p,vHiddenSize:g,headSize:Math.floor(p/e.numHeads),vHeadSize:Math.floor(g/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:w,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Tl=(n,e,r)=>e&&n?`
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
    `,S$=(n,e,r,t,o,i,a,s)=>{let u=Ee(a?1:i),c=64,f=i/u;f<c&&(c=32);let p=Math.ceil(i/u/c),m=[{type:12,data:e},{type:12,data:r},{type:12,data:t},{type:12,data:o},{type:12,data:f},{type:12,data:p}],g=Ve(n.dataType,u),y=st(1,u),x=["type"];a&&x.push("type"),s&&x.push("type");let v=T=>{let w=G("x",n.dataType,n.dims,u),I=[w],A=a?B("seq_lens",a.dataType,a.dims):void 0;A&&I.push(A);let P=s?B("total_sequence_length_input",s.dataType,s.dims):void 0;P&&I.push(P);let k=st(n.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${T.registerUniforms(R).declareVariables(...I)}
  ${T.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Tl(A,P,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${k}(1.0) / ${k}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${k}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${g};${u}`,inputDependencies:x},getShaderSource:v,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/c),y:o,z:e*r},programUniforms:m})}},$$=(n,e,r,t,o,i,a,s,u)=>{let c=a+i.kvSequenceLength,f=[i.batchSize,i.numHeads,i.sequenceLength,c],p=n>1&&t,m=i.kvNumHeads?i.kvNumHeads:i.numHeads,g=p?[i.batchSize,m,c,i.headSize]:void 0,y=i.nReps?i.nReps:1,x=i.scale===0?1/Math.sqrt(i.headSize):i.scale,v=Ee(i.headSize),T=i.headSize/v,w=12,I={x:Math.ceil(c/w),y:Math.ceil(i.sequenceLength/w),z:i.batchSize*i.numHeads},A=[{type:12,data:i.sequenceLength},{type:12,data:T},{type:12,data:c},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:x},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:y}],P=p&&t&&D.size(t.dims)>0,k=["type","type"];P&&k.push("type"),o&&k.push("type"),s&&k.push("type"),u&&k.push("type");let R=[{dims:f,dataType:e.dataType,gpuDataType:0}];p&&R.push({dims:g,dataType:e.dataType,gpuDataType:0});let z=F=>{let X=B("q",e.dataType,e.dims,v),Q=B("key",r.dataType,r.dims,v),de=[X,Q];if(P){let ee=B("past_key",t.dataType,t.dims,v);de.push(ee)}o&&de.push(B("attention_bias",o.dataType,o.dims));let W=s?B("seq_lens",s.dataType,s.dims):void 0;W&&de.push(W);let se=u?B("total_sequence_length_input",u.dataType,u.dims):void 0;se&&de.push(se);let Fe=G("output",e.dataType,f),te=[Fe];p&&te.push(G("present_key",e.dataType,g,v));let le=st(1,v),ge=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${X.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${X.type.storage}, ${w*w}>;
  ${F.registerUniforms(ge).declareVariables(...de,...te)}
  ${F.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Tl(W,se,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${P&&p?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${p?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${le}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${P&&p?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${p?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${le}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(v){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${v}`)}})()};
        output[outputIdx] = ${Fe.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${v};${o!==void 0};${t!==void 0};${n}`,inputDependencies:k},getRunData:()=>({outputs:R,dispatchGroup:I,programUniforms:A}),getShaderSource:z}},A$=(n,e,r,t,o,i,a=void 0,s=void 0)=>{let u=i+o.kvSequenceLength,c=o.nReps?o.nReps:1,f=o.vHiddenSize*c,p=n>1&&t,m=o.kvNumHeads?o.kvNumHeads:o.numHeads,g=p?[o.batchSize,m,u,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,f],x=12,v={x:Math.ceil(o.vHeadSize/x),y:Math.ceil(o.sequenceLength/x),z:o.batchSize*o.numHeads},T=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:f},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:c}],w=p&&t&&D.size(t.dims)>0,I=["type","type"];w&&I.push("type"),a&&I.push("type"),s&&I.push("type");let A=[{dims:y,dataType:e.dataType,gpuDataType:0}];p&&A.push({dims:g,dataType:e.dataType,gpuDataType:0});let P=k=>{let R=B("probs",e.dataType,e.dims),z=B("v",r.dataType,r.dims),F=[R,z];w&&F.push(B("past_value",t.dataType,t.dims));let X=a?B("seq_lens",a.dataType,a.dims):void 0;a&&F.push(X);let Q=s?B("total_sequence_length_input",s.dataType,s.dims):void 0;s&&F.push(Q);let W=[G("output",e.dataType,y)];p&&W.push(G("present_value",e.dataType,g));let se=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${x}u;
  var<workgroup> tileQ: array<${R.type.value}, ${x*x}>;
  var<workgroup> tileV: array<${R.type.value}, ${x*x}>;
  ${k.registerUniforms(se).declareVariables(...F,...W)}
  ${k.mainStart([x,x,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Tl(X,Q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&p?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${p?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&p?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${p?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${n}`,inputDependencies:I},getRunData:()=>({outputs:A,dispatchGroup:v,programUniforms:T}),getShaderSource:P}},Rn=(n,e,r,t,o,i,a,s,u,c,f=void 0,p=void 0)=>{let m=Math.min(n.outputCount,1+(a?1:0)+(s?1:0)),g=m>1?c.pastSequenceLength:0,y=g+c.kvSequenceLength,x=u&&D.size(u.dims)>0?u:void 0,v=[e,r];m>1&&a&&D.size(a.dims)>0&&v.push(a),x&&v.push(x),f&&v.push(f),p&&v.push(p);let T=n.compute($$(m,e,r,a,x,c,g,f,p),{inputs:v,outputs:m>1?[-1,1]:[-1]})[0];n.compute(S$(T,c.batchSize,c.numHeads,g,c.sequenceLength,y,f,p),{inputs:f&&p?[T,f,p]:[T],outputs:[]});let w=[T,t];m>1&&s&&D.size(s.dims)>0&&w.push(s),f&&w.push(f),p&&w.push(p),n.compute(A$(m,T,t,s,c,g,f,p),{inputs:w,outputs:m>1?[0,2]:[0]})},O$=(n,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,a=12,s={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},u=[n.inputs[0],n.inputs[1],n.inputs[2]],c=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],f=p=>{let m=G("output_q",u[0].dataType,r),g=G("output_k",u[0].dataType,r),y=G("output_v",u[0].dataType,r),x=B("input",u[0].dataType,u[0].dims),v=B("weight",u[1].dataType,u[1].dims),T=B("bias",u[2].dataType,u[2].dims),w=x.type.storage,I=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${w}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${w}, ${a*a}>;
  var<workgroup> tileWeightK: array<${w}, ${a*a}>;
  var<workgroup> tileWeightV: array<${w}, ${a*a}>;
  ${p.registerUniforms(I).declareVariables(x,v,T,m,g,y)}
  ${p.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
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
  }`};return n.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:n.inputs[0].dataType,gpuDataType:0}],dispatchGroup:s,programUniforms:c}),getShaderSource:f},{inputs:u,outputs:[-1,-1,-1]})},Fy=(n,e)=>{let r=I$(n.inputs,e),[t,o,i]=O$(n,r);return Rn(n,t,o,i,n.inputs[4],void 0,void 0,void 0,n.inputs[5],r)}});var P$,C$,E$,Uy,Gy=E(()=>{"use strict";pt();ce();be();Ze();Te();P$=(n,e)=>{if(!n||n.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(t,o,i)=>{let a=o.length;if(a!==t.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((s,u)=>{if(s!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(n[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?n[0].dims.slice(-1):n[0].dims.slice(-1).concat(n[0].dims.slice(1,n[0].dims.length-1)):n[0].dims.slice(1,e.spatial?2:void 0);r(n[1].dims,t,"Invalid input scale"),r(n[2].dims,t,"Invalid input B"),r(n[3].dims,t,"Invalid input mean"),r(n[4].dims,t,"Invalid input var")}else r(n[1].dims,[1],"Invalid input scale"),r(n[2].dims,[1],"Invalid input B"),r(n[3].dims,[1],"Invalid input mean"),r(n[4].dims,[1],"Invalid input var")},C$=(n,e)=>{let{epsilon:r,spatial:t,format:o}=e,i=n[0].dims,a=t?Ee(i[i.length-1]):1,s=o==="NHWC"&&i.length>1?a:1,u=D.size(i)/a,c=t,f=c?i.length:i,p=B("x",n[0].dataType,n[0].dims,a),m=B("scale",n[1].dataType,n[1].dims,s),g=B("bias",n[2].dataType,n[2].dims,s),y=B("inputMean",n[3].dataType,n[3].dims,s),x=B("inputVar",n[4].dataType,n[4].dims,s),v=G("y",n[0].dataType,f,a),T=()=>{let I="";if(t)I=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")I=`
            ${v.indicesSet("outputIndices","0","0")}
            let cOffset = ${v.indicesToOffset("outputIndices")};`;else{I=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let A=1;A<m.rank;A++)I+=`cIndices[${A}] = outputIndices[${A}];`;I+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return I},w=I=>`
  const epsilon = ${r};
  ${I.registerUniform("outputSize","u32").declareVariables(p,m,g,y,x,v)}
  ${I.mainStart()}
  ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${v.offsetToIndices(`global_idx * ${a}`)};
    ${T()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${x.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${v.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${a}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c?[{type:12,data:u},...q(i)]:[{type:12,data:u}]})}},E$=n=>fe(n),Uy=(n,e)=>{let{inputs:r,outputCount:t}=n,o=E$({...e,outputCount:t});if(he.webgpu.validateInputContent&&P$(r,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");n.compute(C$(r,o))}});var k$,D$,Wy,Hy=E(()=>{"use strict";be();Te();k$=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(n[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},D$=n=>{let e=n[0].dims,r=n[0].dims[2],t=D.size(e)/4,o=n[0].dataType,i=B("input",o,e,4),a=B("bias",o,[r],4),s=B("residual",o,e,4),u=G("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:f=>`
  const channels = ${r}u / 4;
  ${f.declareVariables(i,a,s,u)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${s.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Wy=n=>{k$(n.inputs),n.compute(D$(n.inputs))}});var B$,Be,qy,Ky,jy,Xy,Zy,Jy,Yy,Qy,e_,N$,t_,r_,n_,o_,zo,i_,Ta,a_,s_,u_,l_,c_,f_,d_,p_,m_,h_,b_,g_,y_,__,x_,T_,w_,v_,wl,vl,I_,S_,$_,R$,z$,A_,wa=E(()=>{"use strict";ce();be();Ze();Te();B$=(n,e,r,t,o,i,a)=>{let s=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let c=B("inputData",r,[s],4),f=G("outputData",t,[s],4),p=[{name:"vec_size",type:"u32"}];return a&&p.push(...a),`
      ${n.registerUniforms(p).declareVariables(c,f)}

  ${i??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",u)}
  }`},Be=(n,e,r,t,o,i=n.dataType,a,s)=>{let u=[{type:12,data:Math.ceil(D.size(n.dims)/4)}];return a&&u.push(...a),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:c=>B$(c,D.size(n.dims),n.dataType,i,r,t,s),getRunData:c=>({outputs:[{dims:n.dims,dataType:i}],dispatchGroup:{x:Math.ceil(D.size(c[0].dims)/64/4)},programUniforms:u})}},qy=n=>{n.compute(Be(n.inputs[0],"Abs","abs"))},Ky=n=>{n.compute(Be(n.inputs[0],"Acos","acos"))},jy=n=>{n.compute(Be(n.inputs[0],"Acosh","acosh"))},Xy=n=>{n.compute(Be(n.inputs[0],"Asin","asin"))},Zy=n=>{n.compute(Be(n.inputs[0],"Asinh","asinh"))},Jy=n=>{n.compute(Be(n.inputs[0],"Atan","atan"))},Yy=n=>{n.compute(Be(n.inputs[0],"Atanh","atanh"))},Qy=n=>fe(n),e_=(n,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}n.compute(Be(n.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},N$=n=>{let e,r,t=n.length>=2&&n[1].data!==0,o=n.length>=3&&n[2].data!==0;switch(n[0].dataType){case 1:e=t?n[1].getFloat32Array()[0]:-34028234663852886e22,r=o?n[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?n[1].getUint16Array()[0]:64511,r=o?n[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:e,max:r})},t_=(n,e)=>{let r=e||N$(n.inputs),t=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:n.inputs[0].dataType,data:r.min},{type:n.inputs[0].dataType,data:r.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},r_=n=>{n.compute(Be(n.inputs[0],"Ceil","ceil"))},n_=n=>{n.compute(Be(n.inputs[0],"Cos","cos"))},o_=n=>{n.compute(Be(n.inputs[0],"Cosh","cosh"))},zo=n=>fe(n),i_=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Ta=(n="f32")=>`
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
}`,a_=n=>{let e=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"Erf",r=>`erf_vf32(${r})`,Ta(e)))},s_=n=>{n.compute(Be(n.inputs[0],"Exp","exp"))},u_=n=>{n.compute(Be(n.inputs[0],"Floor","floor"))},l_=n=>{let e=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Ta(e)))},c_=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},f_=n=>{n.compute(Be(n.inputs[0],"Not",e=>`!${e}`))},d_=n=>{n.compute(Be(n.inputs[0],"Neg",e=>`-${e}`))},p_=n=>{n.compute(Be(n.inputs[0],"Reciprocal",e=>`1.0/${e}`))},m_=n=>{let e=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},h_=n=>{n.compute(Be(n.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},b_=n=>fe(n),g_=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"HardSigmoid",t=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${t} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},y_=n=>{n.compute(Be(n.inputs[0],"Sin","sin"))},__=n=>{n.compute(Be(n.inputs[0],"Sinh","sinh"))},x_=n=>{n.compute(Be(n.inputs[0],"Sqrt","sqrt"))},T_=n=>{n.compute(Be(n.inputs[0],"Tan","tan"))},w_=n=>`sign(${n}) * (1 - exp(-2 * abs(${n}))) / (1 + exp(-2 * abs(${n})))`,v_=n=>{n.compute(Be(n.inputs[0],"Tanh",w_))},wl=(n="f32")=>`
const fast_gelu_a: ${n} = 0.5;
const fast_gelu_b: ${n} = 0.7978845608028654;
const fast_gelu_c: ${n} = 0.035677408136300125;

fn tanh_v(v: vec4<${n}>) -> vec4<${n}> {
  return ${w_("v")};
}
`,vl=n=>`(fast_gelu_a + fast_gelu_a * tanh_v(${n} * (fast_gelu_c * ${n} * ${n} + fast_gelu_b))) * ${n}`,I_=n=>{let e=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"FastGelu",vl,wl(e),void 0,n.inputs[0].dataType))},S_=(n,e)=>{let r=st(n.inputs[0].dataType);return n.compute(Be(n.inputs[0],"ThresholdedRelu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},$_=n=>{n.compute(Be(n.inputs[0],"Log","log"))},R$=(n,e)=>`
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
`,z$=n=>`quick_gelu_impl(${n})`,A_=(n,e)=>{let r=st(n.inputs[0].dataType);n.compute(Be(n.inputs[0],"QuickGelu",z$,R$(r,e.alpha),e.cacheKey,n.inputs[0].dataType))}});var L$,M$,P_,C_=E(()=>{"use strict";be();Te();wa();L$=n=>{if(n[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(n[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(n[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(n[0].dims[2]!==n[1].dims[0])throw new Error("last dimension of input and bias are not the same")},M$=n=>{let e=n[0].dims.slice();e[2]=e[2]/2;let r=B("input",n[0].dataType,n[0].dims,4),t=B("bias",n[0].dataType,[n[0].dims[2]],4),o=G("output",n[0].dataType,e,4),i=D.size(e)/4,a=Ve(n[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${n[0].dims[2]/4/2}u;

  ${u.declareVariables(r,t,o)}

  ${Ta(a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},P_=n=>{L$(n.inputs),n.compute(M$(n.inputs))}});var V$,F$,fr,E_,k_,D_,B_,N_,R_,z_,L_,M_,V_,F_=E(()=>{"use strict";ce();be();Te();V$=(n,e,r,t,o,i,a,s,u,c,f,p)=>{let m,g;typeof s=="string"?m=g=(w,I)=>`${s}((${w}),(${I}))`:typeof s=="function"?m=g=s:(m=s.scalar,g=s.vector);let y=G("outputData",f,t.length,4),x=B("aData",u,e.length,4),v=B("bData",c,r.length,4),T;if(o)if(i){let w=D.size(e)===1,I=D.size(r)===1,A=e.length>0&&e[e.length-1]%4===0,P=r.length>0&&r[r.length-1]%4===0;w||I?T=y.setByOffset("global_idx",g(w?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"),I?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"))):T=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${x.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${v.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",g(a||A?x.getByOffset("offsetA / 4u"):`${x.type.value}(${x.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||P?v.getByOffset("offsetB / 4u"):`${v.type.value}(${v.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else T=y.setByOffset("global_idx",g(x.getByOffset("global_idx"),v.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(I,A,P="")=>{let k=`aData[indexA${A}][componentA${A}]`,R=`bData[indexB${A}][componentB${A}]`;return`
            let outputIndices${A} = ${y.offsetToIndices(`global_idx * 4u + ${A}u`)};
            let offsetA${A} = ${x.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let offsetB${A} = ${v.broadcastedIndicesToOffset(`outputIndices${A}`,y)};
            let indexA${A} = offsetA${A} / 4u;
            let indexB${A} = offsetB${A} / 4u;
            let componentA${A} = offsetA${A} % 4u;
            let componentB${A} = offsetB${A} % 4u;
            ${I}[${A}] = ${P}(${m(k,R)});
          `};f===9?T=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:T=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(x,v,y)}

        ${p??""}

        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${T}
      }`},F$=(n,e,r,t,o,i,a=r.dataType)=>{let s=r.dims.map(x=>Number(x)??1),u=t.dims.map(x=>Number(x)??1),c=!D.areEqual(s,u),f=s,p=D.size(s),m=!1,g=!1,y=[c];if(c){let x=ar.calcShape(s,u,!1);if(!x)throw new Error("Can't perform binary op on the given tensors");f=x.slice(),p=D.size(f);let v=D.size(s)===1,T=D.size(u)===1,w=s.length>0&&s[s.length-1]%4===0,I=u.length>0&&u[u.length-1]%4===0;y.push(v),y.push(T),y.push(w),y.push(I);let A=1;for(let P=1;P<f.length;P++){let k=s[s.length-P],R=u[u.length-P];if(k===R)A*=k;else break}A%4===0?(g=!0,m=!0):(v||T||w||I)&&(m=!0)}else m=!0;return y.push(m),{name:n,shaderCache:{hint:e+y.map(x=>x.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:x=>V$(x,s,u,f,m,c,g,o,r.dataType,t.dataType,a,i),getRunData:()=>({outputs:[{dims:f,dataType:a}],dispatchGroup:{x:Math.ceil(p/64/4)},programUniforms:[{type:12,data:Math.ceil(D.size(f)/4)},...q(s,u,f)]})}},fr=(n,e,r,t,o,i)=>{n.compute(F$(e,o??"",n.inputs[0],n.inputs[1],r,t,i))},E_=n=>{fr(n,"Add",(e,r)=>`${e}+${r}`)},k_=n=>{fr(n,"Div",(e,r)=>`${e}/${r}`)},D_=n=>{fr(n,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},B_=n=>{fr(n,"Mul",(e,r)=>`${e}*${r}`)},N_=n=>{let e=B("input",n.inputs[0].dataType,n.inputs[0].dims).type.value;fr(n,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
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
      `)},R_=n=>{fr(n,"Sub",(e,r)=>`${e}-${r}`)},z_=n=>{fr(n,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},L_=n=>{fr(n,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},M_=n=>{fr(n,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},V_=n=>{fr(n,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}});var G$,W$,H$,q$,U_,G_,W_=E(()=>{"use strict";ce();be();Ze();Te();G$=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");let r=0,t=n[r],o=t.dataType,i=t.dims.length;n.forEach((a,s)=>{if(s!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((u,c)=>{if(c!==e&&u!==t.dims[c])throw new Error("non concat dimensions must match")})}})},W$=(n,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${n}u>(${e});
    for (var i: u32 = 0u; i < ${n}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${n}u;
  }`,H$=(n,e)=>{let r=n.length,t=[];for(let o=0;o<r;++o){let i=e.setByOffset("global_idx",n[o].getByIndices("indices"));r===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},q$=(n,e,r,t)=>{let o=D.size(r),i=new Array(n.length),a=new Array(n.length),s=0,u=[],c=[],f=[{type:12,data:o}];for(let x=0;x<n.length;++x)s+=n[x].dims[e],i[x]=s,c.push(n[x].dims.length),a[x]=B(`input${x}`,t,c[x]),u.push("rank"),f.push({type:12,data:i[x]});for(let x=0;x<n.length;++x)f.push(...q(n[x].dims));f.push(...q(r));let p=G("output",t,r.length),m=p.indicesGet("indices",e),g=Array.from(Array(i.length).keys()).map(x=>`uniforms.sizeInConcatAxis${x}`).join(","),y=x=>`

  ${(()=>{x.registerUniform("outputSize","u32");for(let v=0;v<n.length;v++)x.registerUniform(`sizeInConcatAxis${v}`,"u32");return x.declareVariables(...a,p)})()}

  ${W$(i.length,g)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${p.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${g});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${H$(a,p)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:y}},U_=(n,e)=>{let r=n.inputs,t=r[0].dims,o=D.normalizeAxis(e.axis,t.length);G$(r,o);let i=t.slice();i[o]=r.reduce((s,u)=>s+(u.dims.length>o?u.dims[o]:0),0);let a=r.filter(s=>D.size(s.dims)>0);n.compute(q$(a,o,i,r[0].dataType),{inputs:a})},G_=n=>fe({axis:n.axis})});var qt,Kt,jt,va,zr=E(()=>{"use strict";ce();be();qt=(n,e,r="f32")=>{switch(n.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${n.activation}`)}},Kt=(n,e)=>{n.activation==="Clip"?e.push({type:1,data:n.clipMax},{type:1,data:n.clipMin}):n.activation==="HardSigmoid"?e.push({type:1,data:n.alpha},{type:1,data:n.beta}):n.activation==="LeakyRelu"&&e.push({type:1,data:n.alpha})},jt=(n,e)=>{n.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):n.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):n.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},va=n=>{let e=n?.activation||"";if(e==="HardSigmoid"){let[r,t]=n?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:t}}else if(e==="Clip"){let[r,t]=n?.activation_params||[ly,cy];return{activation:e,clipMax:t,clipMin:r}}else if(e==="LeakyRelu"){let[r]=n?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}});var it,H_,Ia=E(()=>{"use strict";it=(n,e)=>{switch(n){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${n}-component is not supported.`)}},H_=n=>`
      ${n?"value = value + getBiasByOutputCoords(coords);":""}
      `});var q_,K_=E(()=>{"use strict";q_=n=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${n}.x), i32(${n}.y), i32(${n}.z), 1));
}
`});var Lo,Sa,$a=E(()=>{"use strict";ce();be();Te();zr();Lo=(n,e,r,t,o)=>{let i=t-r;return`
      ${Array.from({length:r}).map((a,s)=>`
      if (${Y(e.shape,s,e.rank)} != 1) {
        ${e.indicesSet(n,s,Y(o,s+i,t))}
      } else {
        ${e.indicesSet(n,s,0)}
      }`).join("")}
`},Sa=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a[a.length-2],c=s[s.length-1],f=a[a.length-1],p=Ee(c),m=Ee(f),g=Ee(u),y=D.size(r)/p/g,x=n.length>2,v=t?t.slice(0,-2):r.slice(0,-2),w=[D.size(v),u,c],I=[{type:12,data:y},{type:12,data:u},{type:12,data:c},{type:12,data:f}];Kt(e,I),I.push(...q(v,a,s)),x&&I.push(...q(n[2].dims)),I.push(...q(w));let A=P=>{let k=ga("batch_dims",n[0].dataType,v.length),R=B("a",n[0].dataType,a.length,m),z=B("b",n[1].dataType,s.length,p),F=G("output",n[0].dataType,w.length,p),X=Ve(F.type.tensor),Q=qt(e,F.type.value,X),de=[R,z],W="";if(x){let te=o?p:1;de.push(B("bias",n[2].dataType,n[2].dims.length,te)),W=`${o?`value += bias[col / ${te}];`:`value += ${F.type.value}(bias[row + i]);`}`}let se=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];jt(e,se);let Fe=()=>{let te=`var a_data: ${R.type.value};`;for(let le=0;le<m;le++)te+=`
              let b_data${le} = b[(b_offset + (k + ${le}) * uniforms.N + col) / ${p}];`;for(let le=0;le<g;le++){te+=`a_data = a[(a_offset + (row + ${le}) * uniforms.K + k) / ${m}];`;for(let ge=0;ge<m;ge++)te+=`
            values[${le}] = fma(${z.type.value}(a_data${m===1?"":`[${ge}]`}), b_data${ge}, values[${le}]);
`}return te};return`
  ${P.registerUniforms(se).registerInternalVariables(k).declareVariables(...de,F)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${p})) * ${p};
    var index1 = global_idx / (uniforms.N / ${p});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${R.type.indices};
    ${Lo("a_indices",R,R.rank-2,k.rank,"batch_indices")}
    ${R.indicesSet("a_indices",R.rank-2,0)}
    ${R.indicesSet("a_indices",R.rank-1,0)}
    let a_offset = ${R.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${Lo("b_indices",z,z.rank-2,k.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${F.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${Fe()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${W}
      ${Q}
      let cur_indices = ${F.type.indices}(batch, row + i, col);
      let offset = ${F.indicesToOffset("cur_indices")};
      ${F.setByOffset(`offset / ${p}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${p};${m};${g};${o}`,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:I}),getShaderSource:A}}});var K$,j$,Il,j_,X$,Sl,Z$,Mo,Aa=E(()=>{"use strict";ce();be();Te();zr();$a();Ia();K$=(n,e)=>n?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,j$=(n,e)=>n?`
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
        }`,Il=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32)=>{let u=e[1]*n[1],c=e[0]*n[0],f=o?u:i,p=o?i:u,m=f/e[0],g=i/e[1];if(!((o&&m===4&&n[1]===4||!o&&(m===3||m===4))&&f%e[0]===0&&i%e[1]===0&&n[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${m} and workPerThread[1] ${n[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${n[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${f/m}>, ${p}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/n[0]}>, ${i}>;

const rowPerThread = ${n[1]};
const colPerThread = ${n[0]};
const innerElementSize = ${m};
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

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${K$(o,t)}
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
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${j$(o,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},j_=(n,e)=>n?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,X$=n=>n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Sl=(n,e,r="f32",t,o=!1,i=32,a=!1,s=32,u=!1)=>{let c=n[1]*e[1],f=n[0]*e[0],p=o?c:i,m=o?i:c;if(!(m%e[1]===0&&p%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${p} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let g=m/e[1],y=p/e[0],x=i/e[1],v=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${e[0]}) {
          ${j_(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${e[0]}) {
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
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${x};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${j_(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${x}; innerRow = innerRow + 1) {
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
      ${X$(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${p}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${i}>;
  const rowPerThread = ${n[1]};
  const colPerThread = ${n[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(s/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${s}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${v}
  }
`},Z$=(n,e,r,t,o=!1)=>{let[i,a,s,u]=t,c=Ve(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${it(n,c)} {
      var value = ${it(n,c)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${Lo("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${it(n,c)} {
      var value = ${it(n,c)}(0.0);
      let col = colIn * ${n};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${s.type.indices};
        ${Lo("bIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("bIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("bIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${it(n,c)}) {
      let col = colIn * ${n};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${it(n,c)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Mo=(n,e,r,t,o=!1,i)=>{let a=n[0].dims,s=n[1].dims,u=a.slice(0,-2),c=s.slice(0,-2),f=t?t.slice(0,-2):r.slice(0,-2),p=D.size(f),m=a[a.length-2],g=a[a.length-1],y=s[s.length-1],x=g%4===0&&y%4===0,v=m<=8?[4,1,1]:[4,4,1],T=[8,8,1],w=[Math.ceil(y/T[0]/v[0]),Math.ceil(m/T[1]/v[1]),Math.ceil(p/T[2]/v[2])],I=x?4:1,A=[...u,m,g/I],P=A.length,k=[...c,g,y/I],R=k.length,z=[p,m,y/I],F=[{type:6,data:m},{type:6,data:y},{type:6,data:g}];Kt(e,F),F.push(...q(f,A,k));let X=["rank","rank"],Q=n.length>2;Q&&(F.push(...q(n[2].dims)),X.push("rank")),F.push(...q(z));let de=W=>{let se=f.length,Fe=ga("batchDims",n[0].dataType,se,1),te=Ve(n[0].dataType),le=B("a",n[0].dataType,P,I),ge=B("b",n[1].dataType,R,I),ee=G("result",n[0].dataType,z.length,I),ve=[le,ge];if(Q){let re=o?I:1;ve.push(B("bias",n[2].dataType,n[2].dims.length,re))}let rt=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];jt(e,rt);let Ke=Ve(ee.type.tensor),L=qt(e,ee.type.value,Ke),V=Z$(I,Q,L,[Fe,le,ge,ee],o);return`
  ${W.registerUniforms(rt).registerInternalVariables(Fe).declareVariables(...ve,ee)}
  ${V}
  ${x?Il(v,T,te,Fe):Sl(v,T,te,Fe)}
                   `};return{name:"MatMul",shaderCache:{hint:`${v};${e.activation};${x};${o}`,inputDependencies:X},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:n[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:F}),getShaderSource:de}}});var J$,X_,Z_=E(()=>{"use strict";ce();ir();Te();zr();Ia();K_();Aa();J$=(n,e,r,t,o=!1,i,a=4,s=4,u=4,c="f32")=>{let f=X=>{switch(X){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${X} is not supported.`)}},p=X=>{switch(X){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${X} is not supported.`)}},m=n?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=n?`
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
    `,y=n?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",x=n?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",v=n?"row":"col",T=n?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${v} / outWidth;
    let outCol = ${v} % outWidth;

    let WRow = ${T} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${T} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${T} % inChannels;
    var resData = ${it(a,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${x}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(a)}
    }
    return resData;`,I=n?e&&t?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${it(a,c)}(0.0);`:t&&r?`
    let col = colIn * ${a};
    ${w}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${it(a,c)}(0.0);`,A=n?t&&r?p(s):`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(s)}
    }
    return ${it(s,c)}(0.0);`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(s)}
    }
    return ${it(s,c)}(0.0);`,P=it(u,c),k=n?it(a,c):it(s,c),R=n?it(s,c):it(a,c),z=qt(i,P,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${n?I:A}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${n?A:I}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${P}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${n?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${H_(o)}
      ${z}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},X_=(n,e,r,t,o,i,a,s,u)=>{let c=e.format==="NHWC",f=c?n[0].dims[3]:n[0].dims[1],p=r[0],m=c?r[2]:r[3],g=c?r[1]:r[2],y=c?r[3]:r[1],x=c&&(f%4===0||f%3===0)&&y%4===0,v=c?y:m*g,T=c?m*g:y,w=[8,8,1],I=t<=8?[4,1,1]:[4,4,1],A=[Math.ceil(v/w[0]/I[0]),Math.ceil(T/w[1]/I[1]),Math.ceil(p/w[2]/I[2])];we("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${A}`);let P=x?c&&f%4!==0?3:4:1,k=w[1]*I[1],R=w[0]*I[0],z=Math.max(w[0]*P,w[1]),F=t%k===0,X=o%R===0,Q=i%z===0,de=x?[P,4,4]:[1,1,1],W=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];Kt(e,W),W.push(...q(n[0].dims,n[1].dims));let se=["rank","rank"];a&&(W.push(...q(n[2].dims)),se.push("rank")),W.push(...q(r));let Fe=te=>{let le=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];jt(e,le);let ge=x?4:1,ee=Ve(n[0].dataType),ve=`
      fn setOutputAtIndex(flatIndex : i32, value : ${x?`vec4<${ee}>`:ee}) {
        result[flatIndex] = ${x?`vec4<${ee}>`:ee}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${x?`vec4<${ee}>`:ee}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${x?"/ 4":""}, value);
      }`,rt=B("x",n[0].dataType,n[0].dims.length,P===3?1:P),Ke=B("w",n[1].dataType,n[1].dims.length,ge),L=[rt,Ke],V=G("result",n[0].dataType,r.length,ge);if(a){let re=B("bias",n[2].dataType,n[2].dims.length,ge);L.push(re),ve+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${x?`vec4<${ee}>`:ee} {
          return bias[coords.${c?"w":"y"}${x?"/ 4":""}];
        }`}return`
        ${q_("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${te.registerUniforms(le).declareVariables(...L,V)}
        ${ve}
        ${J$(c,F,X,Q,a,e,de[0],de[1],de[2],ee)}
        ${x?Il(I,w,ee,void 0,!c,z):Sl(I,w,ee,void 0,!c,z,!1,void 0,s)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${P};${x};${F};${X};${Q};${k};${R};${z}`,inputDependencies:se},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:n[0].dataType}],dispatchGroup:{x:A[0],y:A[1],z:A[2]},programUniforms:W}),getShaderSource:Fe}}});var Y$,J_,Oa,Q$,Y_,eA,Q_,ex,tx=E(()=>{"use strict";ce();ir();be();Te();zr();Ia();Y$=n=>{let e=1;for(let r=0;r<n.length;r++)e*=n[r];return e},J_=n=>typeof n=="number"?[n,n,n]:n,Oa=(n,e)=>e<=1?n:n+(n-1)*(e-1),Q$=(n,e,r,t=1)=>{let o=Oa(e,t);return Math.floor((n[0]*(r-1)-r+o)/2)},Y_=(n,e,r,t,o)=>{o==null&&(o=Q$(n,e[0],t[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)n[a]+2*o>=e[a]&&(i[a]=Math.trunc((n[a]-e[a]+2*o)/t[a]+1));return i},eA=(n,e,r,t,o,i,a,s,u,c)=>{let f,p,m,g;if(n==="VALID"&&(n=0),typeof n=="number"){f={top:n,bottom:n,left:n,right:n,front:n,back:n};let y=Y_([e,r,t,1],[s,u,c],1,[o,i,a],n);p=y[0],m=y[1],g=y[2]}else if(Array.isArray(n)){if(!n.every((x,v,T)=>x===T[0]))throw Error(`Unsupported padding parameter: ${n}`);f={top:n[0],bottom:n[1],left:n[2],right:n[3],front:n[4],back:n[5]};let y=Y_([e,r,t,1],[s,u,c],1,[o,i,a],n[0]);p=y[0],m=y[1],g=y[2]}else if(n==="SAME_UPPER"){p=Math.ceil(e/o),m=Math.ceil(r/i),g=Math.ceil(t/a);let y=(p-1)*o+s-e,x=(m-1)*i+u-r,v=(g-1)*a+c-t,T=Math.floor(y/2),w=y-T,I=Math.floor(x/2),A=x-I,P=Math.floor(v/2),k=v-P;f={top:I,bottom:A,left:P,right:k,front:T,back:w}}else throw Error(`Unknown padding parameter: ${n}`);return{padInfo:f,outDepth:p,outHeight:m,outWidth:g}},Q_=(n,e,r,t,o,i=!1,a="channelsLast")=>{let s,u,c,f,p;if(a==="channelsLast")[s,u,c,f,p]=n;else if(a==="channelsFirst")[s,p,u,c,f]=n;else throw new Error(`Unknown dataFormat ${a}`);let[m,,g,y,x]=e,[v,T,w]=J_(r),[I,A,P]=J_(t),k=Oa(g,I),R=Oa(y,A),z=Oa(x,P),{padInfo:F,outDepth:X,outHeight:Q,outWidth:de}=eA(o,u,c,f,v,T,w,k,R,z),W=i?m*p:m,se=[0,0,0,0,0];return a==="channelsFirst"?se=[s,W,X,Q,de]:a==="channelsLast"&&(se=[s,X,Q,de,W]),{batchSize:s,dataFormat:a,inDepth:u,inHeight:c,inWidth:f,inChannels:p,outDepth:X,outHeight:Q,outWidth:de,outChannels:W,padInfo:F,strideDepth:v,strideHeight:T,strideWidth:w,filterDepth:g,filterHeight:y,filterWidth:x,effectiveFilterDepth:k,effectiveFilterHeight:R,effectiveFilterWidth:z,dilationDepth:I,dilationHeight:A,dilationWidth:P,inShape:n,outShape:se,filterShape:e}},ex=(n,e,r,t,o,i)=>{let a=i==="channelsLast",s=a?n[0].dims[3]:n[0].dims[1],u=!1,c=[64,1,1],f={x:r.map((w,I)=>I)},p=[Math.ceil(Y$(f.x.map(w=>r[w]))/c[0]),1,1];we("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let m=u?a&&s%4!==0?3:4:1,g=D.size(r),y=[{type:12,data:g},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];Kt(e,y),y.push(...q(n[0].dims,n[1].dims));let x=["rank","rank"],v=n.length===3;v&&(y.push(...q(n[2].dims)),x.push("rank")),y.push(...q(r));let T=w=>{let I=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];jt(e,I);let A=u?4:1,P=Ve(n[0].dataType),k=B("x",n[0].dataType,n[0].dims.length,m===3?1:m),R=B("W",n[1].dataType,n[1].dims.length,A),z=[k,R],F=G("result",n[0].dataType,r.length,A),X="";if(v){let W=B("bias",n[2].dataType,n[2].dims.length,A);z.push(W),X+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${P}>`:P} {
          return bias[${a?Y("coords",4,5):Y("coords",1,5)}${u?"/ 4":""}];
        }`}let Q=it(m,P),de=qt(e,Q,P);return`
            ${X}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
          ${w.registerUniforms(I).declareVariables(...z,F)}
          ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${F.offsetToIndices("global_idx")};
              let batch = ${Y("coords",0,k.rank)};
              let d2 = ${a?Y("coords",k.rank-1,k.rank):Y("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${a?Y("coords",1,k.rank):Y("coords",2,k.rank)},
              ${a?Y("coords",2,k.rank):Y("coords",3,k.rank)},
              ${a?Y("coords",3,k.rank):Y("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?Y("uniforms.x_shape",1,k.rank):Y("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${a?Y("uniforms.x_shape",2,k.rank):Y("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${a?Y("uniforms.x_shape",3,k.rank):Y("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${a?Y("uniforms.x_shape",4,k.rank):Y("uniforms.x_shape",1,k.rank)};
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
              ${v?"value = value + getBiasByOutputCoords(coords)":""};
              ${de}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${a};${m};${v}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:y}),getShaderSource:T}}});var rx,nx,ox=E(()=>{"use strict";ce();be();Te();zr();rx=(n,e,r,t)=>{let o=n.length>2,i=o?"value += b[output_channel];":"",a=n[0].dims,s=n[1].dims,u=e.format==="NHWC",c=u?r[3]:r[1],f=c/e.group,p=u&&f>=4?Ee(c):1,m=D.size(r)/p,g=[{type:12,data:m},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:f}];Kt(e,g),g.push(...q(a,[s[0],s[1],s[2],s[3]/p]));let y=o?["rank","rank","rank"]:["rank","rank"];g.push(...q([r[0],r[1],r[2],r[3]/p]));let x=v=>{let T=G("output",n[0].dataType,r.length,p),w=Ve(T.type.tensor),I=qt(e,T.type.value,w),A=B("x",n[0].dataType,a.length),P=B("w",n[1].dataType,s.length,p),k=[A,P];o&&k.push(B("b",n[2].dataType,n[2].dims,p));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];jt(e,R);let z=u?`
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
            let xVal = ${A.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${A.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${P.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${v.registerUniforms(R).declareVariables(...k,T)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${T.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${p} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${T.type.value} = ${T.type.value}(0);
    ${z}
    ${i}
    ${I}
    ${T.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:x}},nx=(n,e,r,t)=>{let o=n.length>2,i=Ee(r[3]),a=Ee(r[2]),s=D.size(r)/i/a,u=[n[0].dims[0],n[0].dims[1],n[0].dims[2],n[0].dims[3]/i],c=[n[1].dims[0],n[1].dims[1],n[1].dims[2],n[1].dims[3]/i],f=[r[0],r[1],r[2],r[3]/i],p=[{type:12,data:s},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];Kt(e,p),p.push(...q(u,c,f));let m=(a-1)*e.strides[1]+c[1],g=y=>{let x=G("output",n[0].dataType,f.length,i),v=Ve(x.type.tensor),T=qt(e,x.type.value,v),w=B("x",n[0].dataType,u.length,i),I=B("w",n[1].dataType,c.length,i),A=[w,I];o&&A.push(B("b",n[2].dataType,n[2].dims,i));let P=o?"value += b[output_channel];":"",k=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return jt(e,k),`
  ${y.registerUniforms(k).declareVariables(...A,x)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${m}>;
    var values: array<${x.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
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
      ${T}
      ${x.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${a};${m};${c[0]};${c[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(r):r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:g}}});var tA,$l,rA,Al,Ol,ix,nA,oA,Pl,ax=E(()=>{"use strict";be();Z_();tx();Aa();ox();zr();$a();yr();tA=(n,e,r,t,o,i)=>{let a=n[0],s=n.slice(i?1:2,i?3:4),u=s.length,c=e[0],p=e.slice(2).map((y,x)=>y+(y-1)*(r[x]-1)),g=s.map((y,x)=>y+t[x]+t[x+u]).map((y,x)=>Math.floor((y-p[x]+o[x])/o[x]));return g.splice(0,0,a),g.splice(i?3:1,0,c),g},$l=[2,3,1,0],rA=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length>5)throw new Error("greater than 5D is not supported");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[1]*e.group;if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(n.length===3&&(n[2].dims.length!==1||n[1].dims[0]!==n[2].dims[0]))throw new Error("invalid bias");let o=n[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape")},Al=(n,e)=>{let r=n.kernelShape.slice();r.length<e[1].dims.length-2&&r.push(...Array(e[1].dims.length-2-r.length).fill(0));for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let t=n.pads.slice();ln.adjustPadsBasedOnAutoPad(e[0].dims,n.strides,n.dilations,r,t,n.format==="NHWC",n.autoPad);let o=Object.assign({},n);return Object.assign(o,{kernelShape:r,pads:t}),o},Ol=n=>{let e=va(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],o=n.dilations,i=n.group,a=n.kernel_shape,s=n.pads,u=n.strides,c=n.w_is_const();return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,pads:s,strides:u,wIsConst:c,...e,cacheKey:`${n.format};${e.activation};`}},ix=(n,e,r,t)=>{let o=r.format==="NHWC",i=tA(e[0].dims,e[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let k=[e[0]];if(o){let z=n.kernelCustomData.wT??n.compute(ut(e[1],$l),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=z),k.push(z)}else k.push(e[1]);e.length===3&&k.push(e[2]),!n.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?n.compute(nx(k,r,i,t),{inputs:k}):n.compute(rx(k,r,i,t),{inputs:k});return}let a=e.length===3,s=e[0].dims[o?1:2],u=e[0].dims[o?2:3],c=e[0].dims[o?3:1],f=e[1].dims[2],p=e[1].dims[3],m=i[o?1:2],g=i[o?2:3],y=i[o?3:1],x=o&&f===s&&p===u&&r.pads[0]===0&&r.pads[1]===0;if(x||f===1&&p===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let k=i[0],R,z,F,X=[];if(o){let W=n.kernelCustomData.wT??n.compute(ut(e[1],$l),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=W),x){let se=s*u*c;R=e[0].reshape([1,k,se]),z=W.reshape([1,se,y]),F=[1,k,y]}else R=e[0].reshape([k,s*u,c]),z=W.reshape([1,c,y]),F=[k,m*g,y];X.push(R),X.push(z)}else R=e[0].reshape([k,c,s*u]),z=e[1].reshape([1,y,c]),F=[k,y,m*g],X.push(z),X.push(R);a&&X.push(e[2]);let Q=F[2],de=X[0].dims[X[0].dims.length-1];Q<8&&de<8?n.compute(Sa(X,r,i,F,o,t),{inputs:X}):n.compute(Mo(X,r,i,F,o,t),{inputs:X});return}let v=!0,T=n.kernelCustomData.wT??n.compute(ut(e[1],$l),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=T);let w=[e[0],T];a&&w.push(e[2]);let I=o?m*g:y,A=o?y:m*g,P=f*p*c;n.compute(X_(w,r,i,I,A,P,a,v,t),{inputs:w})},nA=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),s=[1].concat(e.kernelShape),u=Al({...e,pads:o,strides:i,dilations:a,kernelShape:s},t);ix(n,t,u,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},oA=(n,e,r)=>{let t=r.format==="NHWC"?"channelsLast":"channelsFirst",o=Al(r,e),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Q_(e[0].dims,e[1].dims,r.strides,r.dilations,i,!1,t);n.compute(ex(e,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],t))},Pl=(n,e)=>{if(rA(n.inputs,e),n.inputs[0].dims.length===3)nA(n,e);else if(n.inputs[0].dims.length===5)oA(n,n.inputs,e);else{let r=Al(e,n.inputs);ix(n,n.inputs,r)}}});var sx,ux=E(()=>{"use strict";ce();ir();be();Te();sx=(n,e,r)=>{let t=n.length>2,o=e.outputShape,i=e.format==="NHWC",a=e.group,s=n[1].dims,u=s[2]/a,c=s[3],f=i?Ee(u):1,p=i?Ee(c):1,m=i?c===1?f:p:1,g=D.size(o)/p,y=[Math.ceil(g/64),1,1];we("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${y}`);let x=["rank","rank"],v=[e.strides[0],e.strides[1]],T=[e.kernelShape[i?1:2],e.kernelShape[i?2:3]],w=[e.dilations[0],e.dilations[1]],I=[T[0]+(e.dilations[0]<=1?0:(e.kernelShape[i?1:2]-1)*(e.dilations[0]-1)),T[1]+(e.dilations[1]<=1?0:(e.kernelShape[i?2:3]-1)*(e.dilations[1]-1))],A=[I[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),I[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],P=[{type:12,data:g},{type:12,data:v},{type:12,data:T},{type:12,data:w},{type:12,data:I},{type:6,data:A},{type:12,data:u},{type:12,data:c},...q(n[0].dims,n[1].dims)];t&&(P.push(...q(n[2].dims)),x.push("rank")),P.push(...q(o));let k=R=>{let z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:v.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:A.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],F=Ve(n[0].dataType),X=i?1:2,Q=i?2:3,de=i?3:1,W=B("W",n[1].dataType,n[1].dims.length,m),se=B("Dy",n[0].dataType,n[0].dims.length,f),Fe=[se,W];t&&Fe.push(B("bias",n[2].dataType,[o[de]].length,p));let te=G("result",n[0].dataType,o.length,p),le=()=>{let ee="";if(f===1)ee+=`
        let w_offset = ${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${W.getByOffset(`w_offset / ${m}`)};
        dotProd = dotProd + xValue * wValue;`;else if(c===1)ee+=`
          let wValue = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${m}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let ve=0;ve<f;ve++)ee+=`
            let wValue${ve} = ${W.getByOffset(`${W.indicesToOffset(`${W.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ve}, wOutChannel)`)} / ${m}`)};
            dotProd = dotProd + xValue[${ve}] * wValue${ve};`;return ee},ge=`
            let outputIndices = ${te.offsetToIndices(`global_idx * ${p}`)};
            let batch = ${te.indicesGet("outputIndices",0)};
            let d1 = ${te.indicesGet("outputIndices",de)};
            let r = ${te.indicesGet("outputIndices",X)};
            let c = ${te.indicesGet("outputIndices",Q)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${te.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${F}(dyRCorner) + ${F}(wR)) / ${F}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${F}(uniforms.Dy_shape[${X}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${F}(dyCCorner) + ${F}(wC)) / ${F}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${F}(uniforms.Dy_shape[${Q}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${f}) {
                  let xValue = ${i?se.getByOffset(`${se.indicesToOffset(`${se.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):se.get("batch","inputChannel","idyR","idyC")};
                  ${le()}
                  inputChannel = inputChannel + ${f};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${t?` + bias[d1 / ${p}]`:""};
            ${te.setByOffset("global_idx","value")};
          `;return`
    ${R.registerUniforms(z).declareVariables(...Fe,te)}
      ${R.mainStart()}
      ${R.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ge}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};${f}${m}${p}${c===1}`,inputDependencies:x},getRunData:()=>({dispatchGroup:{x:y[0],y:y[1],z:y[2]},outputs:[{dims:r?r(o):o,dataType:n[0].dataType}],programUniforms:P}),getShaderSource:k}}});var iA,aA,sA,lx,cx,uA,fx,lA,dx,px=E(()=>{"use strict";ux();zr();yr();iA=(n,e,r,t,o,i)=>(n-1)*e+r+(t-1)*o+1-i,aA=(n,e,r,t,o)=>{let i=Math.floor(n/2);e==="SAME_UPPER"?(r[t]=i,r[o]=n-i):e==="SAME_LOWER"&&(r[t]=n-i,r[o]=i)},sA=(n,e,r,t,o,i,a,s,u,c)=>{let f=n.length-2,p=c.length===0;u.length<f&&u.push(...Array(f-u.length).fill(0));let m=n[0],g=e[s?3:1]*o;for(let y=0,x=n.length-f-(s?1:0);y<f;++y,++x){let v=n[x],T=p?v*a[y]:c[y],w=iA(v,a[y],i[y],e[x],r[y],T);aA(w,t,i,y,y+f),p&&c.push(a[y]*(v-1)+u[y]+(e[x]-1)*r[y]+1-i[y]-i[y+f])}c.splice(0,0,m),c.splice(s?3:1,0,g)},lx=(n,e)=>{let r=n.kernelShape.slice();if(n.kernelShape.length===0||n.kernelShape.reduce((p,m)=>p*m,1)===0){r.length=0;for(let p=2;p<e[1].dims.length;++p)r.push(e[1].dims[p])}let t=n.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(t?3:1,0,e[1].dims[1]);let o=n.pads.slice(),i=n.outputShape.slice(),a=n.outputPadding.slice(),s=e[0].dims,u=n.dilations.slice();if(u.reduce((p,m)=>p+m,0)===0){let p=e[0].dims.length-2;u=new Array(p).fill(1)}let c=n.strides.slice();if(c.reduce((p,m)=>p+m,0)===0){let p=e[0].dims.length-2;c=new Array(p).fill(1)}sA(s,r,u,n.autoPad,n.group,o,c,t,a,i);let f=Object.assign({},n);return Object.assign(f,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:u,strides:c}),f},cx=n=>{let e=va(n),r=n.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof n.autoPad>"u"?0:n.autoPad],o=n.dilations,i=n.group,a=n.kernelShape,s=n.pads,u=n.strides,c=n.wIsConst(),f=n.outputPadding,p=n.outputShape;return{autoPad:t,format:r,dilations:o,group:i,kernelShape:a,outputPadding:f,outputShape:p,pads:s,strides:u,wIsConst:c,...e,cacheKey:`${n.format};${e.activation};`}},uA=(n,e)=>{if(!n||n.length!==2&&n.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(n[0].dims.length!==4&&n[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(n[0].dims.length!==n[1].dims.length)throw new Error("filter does not have same dimension as input");let r=n[0].dims[e.format==="NHWC"?n[0].dims.length-1:1],t=n[1].dims[0];if(r!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=n[1].dims[1]*e.group;if(n.length===3&&(n[2].dims.length!==1||n[2].dims[0]!==o))throw new Error("invalid bias");let i=n[0].dims.length-2;if(e.dilations.reduce((f,p)=>f+p,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((f,p)=>f+p,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((f,p)=>f+p,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((f,p)=>f+p,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==n[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==n[0].dims.length-2)throw new Error("invalid output shape")},fx=(n,e,r,t)=>{let o=n.kernelCustomData.wT??n.compute(ut(e[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!n.kernelCustomData.wT&&(n.kernelCustomData.wT=o);let i=[e[0],o];e.length===3&&i.push(e[2]),n.compute(sx(i,r,t),{inputs:i})},lA=(n,e)=>{let r=e.format==="NHWC",t=[n.inputs[0].reshape(r?[n.inputs[0].dims[0],1,n.inputs[0].dims[1],n.inputs[0].dims[2]]:[n.inputs[0].dims[0],n.inputs[0].dims[1],1,n.inputs[0].dims[2]]),n.inputs[1].reshape([n.inputs[1].dims[0],n.inputs[1].dims[1],1,n.inputs[1].dims[2]])];n.inputs.length===3&&t.push(n.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[n.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let s=e.pads;s.length===0&&(s=[0,0]),s=[0,s[0],0,s[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let u=e.outputPadding;u=[0].concat(u);let c=lx({...e,pads:s,strides:a,dilations:i,kernelShape:o,outputPadding:u},t);fx(n,t,c,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},dx=(n,e)=>{if(uA(n.inputs,e),n.inputs[0].dims.length===3)lA(n,e);else{let r=lx(e,n.inputs);fx(n,n.inputs,r)}}});var cA,mx,hx,bx=E(()=>{"use strict";ce();be();Ze();Te();cA=(n,e,r,t)=>{let o=D.size(e),i=e.length,a=B("input",n,i),s=G("output",n,i),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=D.normalizeAxis(u,i),f=p=>{let m=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,g=Y("uniforms.input_shape","uniforms.axis",i),y=t.reverse?m+(t.exclusive?" + 1":""):"0",x=t.reverse?g:m+(t.exclusive?"":" + 1");return`
                ${p.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,s)}
                ${p.mainStart()}
                  ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${s.offsetToIndices("global_idx")};
                  var sum = ${s.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${x};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${s.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...q(e,e)]}),getShaderSource:f}},mx=(n,e)=>{let r=n.inputs[0].dims,t=n.inputs[0].dataType,o=n.inputs[1];n.compute(cA(t,r,o,e),{inputs:[0]})},hx=n=>{let e=n.exclusive===1,r=n.reverse===1;return fe({exclusive:e,reverse:r})}});var fA,dA,pA,gx,yx,_x=E(()=>{"use strict";ce();be();Ze();Te();fA=n=>{if(!n||n.length!==1)throw new Error("DepthToSpace requires 1 input.");if(n[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},dA=(n,e,r,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)o.push(r.indicesSet("a",n[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},pA=(n,e)=>{let r,t,o,i,a,s,u=e.format==="NHWC",c=e.blocksize,f=e.mode==="DCR";u?([r,t,o,i]=n.dims,a=f?[r,t,o,c,c,i/c**2]:[r,t,o,i/c**2,c,c],s=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,t,o,i]=[n.dims[0],n.dims[2],n.dims[3],n.dims[1]],a=f?[r,c,c,i/c**2,t,o]:[r,i/c**2,c,c,t,o],s=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let p=n.reshape(a),m=p.dims.length,g=n.dataType,y=B("a",g,m),x=G("output",g,m),v=T=>`
  ${T.registerUniform("output_size","u32").declareVariables(y,x)}

  ${dA(s,m,y,x)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${n.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:T=>{let w=u?[r,t*c,o*c,i/c**2]:[r,i/c**2,t*c,o*c],I=D.size(w),A=p.dims,P=D.sortBasedOnPerm(A,s);return{outputs:[{dims:w,dataType:T[0].dataType}],dispatchGroup:{x:Math.ceil(I/64)},programUniforms:[{type:12,data:I},...q(A,P)]}},getShaderSource:v}},gx=(n,e)=>{fA(n.inputs),n.compute(pA(n.inputs[0],e))},yx=n=>fe({blocksize:n.blocksize,mode:n.mode,format:n.format})});var Cl,Pa,xx,mA,hA,El,kl,Tx,bA,wx,vx,Ix=E(()=>{"use strict";ce();be();Ze();Te();Cl="[a-zA-Z]|\\.\\.\\.",Pa="("+Cl+")+",xx="^"+Pa+"$",mA="("+Pa+",)*"+Pa,hA="^"+mA+"$",El=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,r){let t=this.symbolToIndices.get(e);t===void 0?t=[r]:t.push(r),this.symbolToIndices.set(e,t)}},kl=class{constructor(e,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=r.includes("->")?r.split("->",2):[r,""];if(!t.match(RegExp(hA)))throw new Error("Invalid LHS term");if(t.split(",").forEach((s,u)=>{let c=e[u].dims.slice();if(!s.match(RegExp(xx)))throw new Error("Invalid LHS term");let f=this.processTerm(s,!0,c,u);this.lhs.push(f)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([s,u])=>u.count===1||s==="...").map(([s])=>s).join("");else if(!o.match(RegExp(Pa)))throw new Error("Invalid RHS");o.match(RegExp(Cl,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(s);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,r,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:r,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,r,t,o=-1){let i=t.length,a=!1,s=[],u=0;if(!e.match(RegExp(xx))&&!r&&e!=="")throw new Error("Invalid LHS term");let c=e.match(RegExp(Cl,"g")),f=new El(o);return c?.forEach((p,m)=>{if(p==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=i-c.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=t.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let x=String.fromCharCode(48+y);f.addSymbol(x,m+y),this.addSymbol(x,t[u++],o)}}else f.addSymbol(p,m+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(p,t[u++],o)}),f}},Tx=n=>n+"_max",bA=(n,e,r,t)=>{let i=n.map(f=>f.length).map((f,p)=>B(`input${p}`,e,f)),a=D.size(t),s=G("output",e,t.length),u=[...r.symbolToInfo.keys()].filter(f=>!r.rhs.symbolToIndices.has(f)),c=f=>{let p=[],m="var prod = 1.0;",g="var sum = 0.0;",y="sum += prod;",x=[],v=[],T=[],w=[],I=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((P,k)=>{if(r.rhs.symbolToIndices.has(k)){let R=r.rhs.symbolToIndices.get(k)?.[0];R!==void 0&&r.lhs.forEach((z,F)=>{if(P.inputIndices.includes(F)){let X=z.symbolToIndices.get(k);if(X===void 0)throw new Error("Invalid symbol error");X.forEach(Q=>{p.push(`${i[F].indicesSet(`input${F}Indices`,Q,s.indicesGet("outputIndices",R))}`)})}})}else r.lhs.forEach((R,z)=>{if(P.inputIndices.includes(z)){let F=R.symbolToIndices.get(k);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(X=>{x.push(`${i[z].indicesSet(`input${z}Indices`,X,`${k}`)}`)}),w.push(`prod *= ${i[z].getByIndices(`input${z}Indices`)};`)}}),v.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${Tx(k)}; ${k}++) {`),T.push("}")});let A=I?[...p,`let sum = ${i.map((P,k)=>P.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...p,g,...v,...x,m,...w,y,...T];return`
            ${f.registerUniforms(u.map(P=>({name:`${Tx(P)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,s)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${i.map((P,k)=>`var input${k}Indices: ${i[k].type.indices};`).join(`
`)}
            ${A.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:n.map(()=>"rank")},getRunData:()=>{let f=u.filter(m=>r.symbolToInfo.has(m)).map(m=>({type:12,data:r.symbolToInfo.get(m)?.dimValue||0}));f.push({type:12,data:a});let p=n.map((m,g)=>[...q(m)]).reduce((m,g)=>m.concat(g),f);return p.push(...q(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}},getShaderSource:c}},wx=(n,e)=>{let r=new kl(n.inputs,e.equation),t=r.outputDims,o=n.inputs.map((i,a)=>i.dims);n.compute(bA(o,n.inputs[0].dataType,r,t))},vx=n=>{let e=n.equation.replace(/\s+/g,"");return fe({equation:e})}});var gA,Sx,yA,_A,$x,Ax=E(()=>{"use strict";ce();be();Te();gA=n=>{if(!n||n.length!==2)throw new Error("Expand requires 2 input.");let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=r.length<e.length?0:r.length-e.length,o=e.length<r.length?0:e.length-r.length;for(;t<r.length&&o<e.length;++t,++o)if(r[t]!==e[o]&&r[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Sx=(n,e)=>{let r=n.length-e.length,t=[];for(let o=0;o<r;++o)t.push(n[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?n[o+r]:e[o]);return t},yA=(n,e)=>n.length>e.length?Sx(n,e):Sx(e,n),_A=n=>{let e=n[0].dims,r=Array.from(n[1].getBigInt64Array(),Number),t=yA(e,r),o=n[0].dataType,i=o===9||D.size(e)===1,a=o===9||e.length>0&&e[e.length-1]%4===0?4:1,s=i||t.length>0&&t[t.length-1]%4===0?4:1,u=Math.ceil(D.size(t)/s),c=p=>{let m=B("input",o,e.length,a),g=G("output",o,t.length,s),y;if(o===9){let x=(v,T,w="")=>`
          let outputIndices${T} = ${g.offsetToIndices(`outputOffset + ${T}u`)};
          let offset${T} = ${m.broadcastedIndicesToOffset(`outputIndices${T}`,g)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${v}[${T}] = ${w}(${m.getByOffset(`index${T}`)}[component${T}]);
        `;y=`
        let outputOffset = global_idx * ${s};
        var data = vec4<u32>(0);
        ${x("data",0,"u32")}
        ${x("data",1,"u32")}
        ${x("data",2,"u32")}
        ${x("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${s}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${m.getByOffset(`inputOffset / ${a}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(m,g)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},f=[{type:12,data:u},...q(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length};${a}${s}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:t,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f})}},$x=n=>{gA(n.inputs),n.compute(_A(n.inputs),{inputs:[0]})}});var xA,Ox,Px=E(()=>{"use strict";ce();be();Te();wa();xA=n=>{let e=n[0].dataType,r=D.size(n[0].dims),t=D.size(n[1].dims),o=t%4===0,i=a=>{let s=B("x",e,[1],4),u=B("bias",e,[1],4),c=G("y",e,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],p=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${u.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,m=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${p(0)}${p(1)}${p(2)}${p(3)}
      let bias = ${s.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(f).declareVariables(s,u,c)}

    ${wl(st(e))}

    ${a.mainStart(cn)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${s.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",vl("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(r/cn/4)}})}},Ox=n=>{n.inputs.length<2||D.size(n.inputs[1].dims)===0?I_(n):n.compute(xA(n.inputs))}});var TA,wA,Cx,Ex,kx=E(()=>{"use strict";ce();be();Ze();Te();TA=n=>{if(!n||n.length!==2)throw new Error("Gather requires 2 inputs.")},wA=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.axis,o),a=r.slice(0);a.splice(i,1,...t);let s=r[i],u=n[0].dataType===9?4:1,c=Math.ceil(D.size(a)/u),f=[{type:12,data:c},{type:6,data:s},{type:12,data:i},...q(n[0].dims,n[1].dims,a)],p=m=>{let g=B("data",n[0].dataType,n[0].dims.length,u),y=B("inputIndices",n[1].dataType,n[1].dims.length),x=G("output",n[0].dataType,a.length,u),v=w=>{let I=t.length,A=`var indicesIndices${w}  = ${y.type.indices}(0);`;for(let P=0;P<I;P++)A+=`${I>1?`indicesIndices${w}[${P}]`:`indicesIndices${w}`} = ${a.length>1?`outputIndices${w}[uniforms.axis + ${P}]`:`outputIndices${w}`};`;A+=`
          var idx${w} = ${y.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${g.type.indices};
        `;for(let P=0,k=0;P<o;P++)P===i?(A+=`${o>1?`dataIndices${w}[${P}]`:`dataIndices${w}`} = u32(idx${w});`,k+=I):(A+=`${o>1?`dataIndices${w}[${P}]`:`dataIndices${w}`} = ${a.length>1?`outputIndices${w}[${k}]`:`outputIndices${w}`};`,k++);return A},T;if(n[0].dataType===9){let w=(I,A,P="")=>`
          let outputIndices${A} = ${x.offsetToIndices(`outputOffset + ${A}u`)};
          ${v(A)};
          let offset${A} = ${g.indicesToOffset(`dataIndices${A}`)};
          let index${A} = offset${A} / 4u;
          let component${A} = offset${A} % 4u;
          ${I}[${A}] = ${P}(${g.getByOffset(`index${A}`)}[component${A}]);
        `;T=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${x.setByOffset("global_idx","value")}
      `}else T=`
      let outputIndices = ${x.offsetToIndices("global_idx")};
      ${v("")};
      let value = ${g.getByIndices("dataIndices")};
      ${x.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,y,x)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${T}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:f}),getShaderSource:p}},Cx=n=>fe({axis:n.axis}),Ex=(n,e)=>{let r=n.inputs;TA(r),n.compute(wA(n.inputs,e))}});var vA,Dx,Bx,Nx=E(()=>{"use strict";ce();be();Te();vA=(n,e,r,t,o,i,a,s,u)=>{let c=[{type:12,data:i},{type:12,data:t},{type:12,data:o},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:u}],f=[i];c.push(...q(e.dims,f));let p=m=>{let g=B("indices_data",e.dataType,e.dims.length),y=G("input_slice_offsets_data",12,1,1),x=[g,y],v=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(v).declareVariables(...x)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
  }`};return n.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:n.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:c}),getShaderSource:p},{inputs:[e],outputs:[-1]})[0]},Dx=(n,e)=>{let r=n.inputs,t=r[0].dims,o=r[0].dataType,i=r[1].dims,a=i[i.length-1],s=D.sizeToDimension(i,i.length-1),u=D.sizeFromDimension(t,e.batchDims+a),c=D.sizeToDimension(t,e.batchDims),f=D.sizeFromDimension(t,e.batchDims),p=s/c,m=new Array(a),g=u;for(let A=0;A<a;++A)m[a-1-A]=g,g*=t[e.batchDims+a-1-A];let y=vA(n,r[1],m,e.batchDims,t,s,p,f,a),x=e.batchDims+a;if(x>t.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let v=i.slice(0,-1).concat(t.slice(x)),T=D.size(v),w=[{type:12,data:T},{type:12,data:u},...q(r[0].dims,y.dims,v)],I=A=>{let P=B("data",r[0].dataType,r[0].dims.length),k=B("slice_offsets",12,y.dims.length),R=G("output",r[0].dataType,v.length);return`
          ${A.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(P,k,R)}
            ${A.mainStart()}
            ${A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};n.compute({name:"GatherND",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:v,dataType:o}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:w}),getShaderSource:I},{inputs:[r[0],y]})},Bx=n=>({batchDims:n.batch_dims,cacheKey:""})});var IA,SA,Rx,zx,Lx=E(()=>{"use strict";ce();be();Ze();Te();IA=(n,e)=>{if(n.length<3||n.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=D.normalizeAxis(e.quantizeAxis,n[0].dims.length),t=e.blockSize,o=n[0],i=n[2],a=n.length===4?n[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((s,u)=>u===r?Math.ceil(s/t)===i.dims[u]:s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((s,u)=>s===i.dims[u]).reduce((s,u)=>s&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},SA=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r.length,i=D.normalizeAxis(e.gatherAxis,o),a=D.normalizeAxis(e.quantizeAxis,o),s=r.slice(0);s.splice(i,1,...t);let u=D.size(s),c=n[2].dataType,p=n[0].dataType===22,m=[{type:12,data:u},{type:12,data:a},{type:12,data:i},{type:12,data:e.blockSize},...q(...n.map((y,x)=>y.dims),s)],g=y=>{let x=B("data",n[0].dataType,n[0].dims.length),v=B("inputIndices",n[1].dataType,n[1].dims.length),T=B("scales",n[2].dataType,n[2].dims.length),w=n.length>3?B("zeroPoint",n[3].dataType,n[3].dims.length):void 0,I=G("output",c,s.length),A=[x,v,T];w&&A.push(w);let P=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(P).declareVariables(...A,I)}
        ${y.mainStart()}
        let output_indices = ${I.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${I.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${I.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${x.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${I.indicesGet("output_indices","i")};
          ${x.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${x.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${s.length}; i++) {
          let index = ${I.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${x.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${x.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${x.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${w?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${w.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${w.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${p?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${st(c)}(quantized_data - zero_point) * scale;
        ${I.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${n.filter((y,x)=>x!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:n.length},(y,x)=>"rank")},getRunData:()=>({outputs:[{dims:s,dataType:c}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:g}},Rx=(n,e)=>{let r=n.inputs;IA(r,e),n.compute(SA(n.inputs,e))},zx=n=>fe({blockSize:n.blockSize,gatherAxis:n.gatherAxis,quantizeAxis:n.quantizeAxis})});var $A,AA,Mx,Vx,Fx=E(()=>{"use strict";ce();be();Ze();Te();$A=n=>{if(!n||n.length!==2)throw new Error("GatherElements requires 2 inputs.");if(n[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(n[0].dims.length!==n[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},AA=(n,e)=>{let r=n[0].dims,t=n[0].dataType,o=r.length,i=n[1].dims,a=n[1].dataType,s=D.normalizeAxis(e.axis,o),u=r[s],c=i.slice(0),f=D.size(c),p=B("input",t,o),m=B("indicesInput",a,i.length),g=G("output",t,c.length),y=[{type:12,data:f},{type:6,data:u},{type:12,data:s}];return y.push(...q(r,i,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:y}),getShaderSource:T=>`
      ${T.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(p,m,g)}
      ${T.mainStart()}
      ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${p.type.indices}(outputIndices);
      ${p.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${p.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},Mx=n=>fe({axis:n.axis}),Vx=(n,e)=>{let r=n.inputs;$A(r),n.compute(AA(n.inputs,e))}});var OA,PA,Ux,Gx,Wx=E(()=>{"use strict";ce();be();Te();OA=n=>{if(!n)throw new Error("Input is missing");if(n.length<2||n.length>3)throw new Error("Invaid input number.");if(n.length===3&&n[2].dims.length>2)throw new Error("Invalid input shape of C");if(n[0].dataType!==n[1].dataType||n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("Input types are mismatched")},PA=(n,e)=>{let r=n[0].dims.slice(),t=n[1].dims.slice(),[o,i,a]=ha.getShapeOfGemmResult(r,e.transA,t,e.transB,n.length===3?n[2].dims:void 0),s=[o,i];if(!s)throw new Error("Can't use gemm on the given tensors");let u=16,c=Math.ceil(i/u),f=Math.ceil(o/u),p=!0,m=D.size(s),g=[{type:12,data:p?c:m},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],y=["type","type"];n.length===3&&(g.push(...q(n[2].dims)),y.push("rank")),g.push(...q(s));let x=T=>{let w="";e.transA&&e.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let I=e.alpha===1?"":"value *= uniforms.alpha;",A=B("a",n[0].dataType,n[0].dims),P=B("b",n[1].dataType,n[1].dims),k=A.type.value,R=null,z=[A,P];n.length===3&&(R=B("c",n[2].dataType,n[2].dims.length),z.push(R));let F=G("output",n[0].dataType,s.length);z.push(F);let X=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${T.registerUniforms(X).declareVariables(...z)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${k}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${I}
    ${R!=null?`let cOffset = ${R.broadcastedIndicesToOffset("vec2(m, n)",F)}; value += ${k}(uniforms.beta) * ${R.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},v=T=>{let w=B("a",n[0].dataType,n[0].dims),I=B("b",n[1].dataType,n[1].dims),A=null,P=[w,I];n.length===3&&(A=B("c",n[2].dataType,n[2].dims.length),P.push(A));let k=G("output",n[0].dataType,s.length);P.push(k);let R=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],z="",F="";e.transA&&e.transB?(F=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(F=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(F=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(F=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${I.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let X=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${T.registerUniforms(R).declareVariables(...P)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${I.type.storage}, ${u}>, ${u}>;
  ${T.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${k.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${F}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${z}
      }
      workgroupBarrier();
    }

    ${X}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${A!=null?`let cOffset = ${A.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${k.type.value}(uniforms.beta) * ${A.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return p?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:c*f},programUniforms:g}),getShaderSource:v}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:s,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:g}),getShaderSource:x}},Ux=n=>{let e=n.transA,r=n.transB,t=n.alpha,o=n.beta;return{transA:e,transB:r,alpha:t,beta:o,cacheKey:`${n.transA};${n.transB};${n.alpha===1}`}},Gx=(n,e)=>{OA(n.inputs),n.compute(PA(n.inputs,e))}});var _r,Lr,zn,Ln,CA,EA,kA,DA,BA,NA,RA,zA,Hx,qx,Kx=E(()=>{"use strict";ce();be();Ze();Te();[_r,Lr,zn,Ln]=[0,1,2,3],CA=n=>{if(n[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(n[0].dims.length!==n[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(n[0].dims.length-2!==n[1].dims[n[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${n[0].dims.length-2}`);if(n[0].dims[0]!==n[1].dims[0])throw new Error("grid batch size must match input batch size")},EA=`
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
`,kA=n=>`
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
`,DA=n=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${n.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,BA=n=>`
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
`,NA=(n,e,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${_r}] = batch;
     indices[${Lr}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${zn}] = u32(r);
            indices[${Ln}] = u32(c);
          }
        `;case"border":return`
          indices[${zn}] = u32(clamp(r, 0, H - 1));
          indices[${Ln}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${zn}] = gs_reflect(r, border[1], border[3]);
          indices[${Ln}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${n.getByIndices("indices")};
  }
`,RA=(n,e,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${_r}], indices[${Lr}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${_r}], indices[${Lr}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${_r}], indices[${Lr}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${_r}], indices[${Lr}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${_r}], indices[${Lr}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${_r}], indices[${Lr}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${n.setByOffset("global_idx","result")}`,zA=(n,e)=>{let r=B("x",n[0].dataType,n[0].dims.length),t=[n[1].dims[0],n[1].dims[1],n[1].dims[2]],o=B("grid",n[1].dataType,t.length,2),i=[n[0].dims[0],n[0].dims[1],n[1].dims[1],n[1].dims[2]];e.format==="NHWC"&&(i=[n[0].dims[0],n[1].dims[1],n[1].dims[2],n[0].dims[3]],[_r,Lr,zn,Ln]=[0,3,1,2]);let a=G("output",n[0].dataType,i.length),s=r.type.value,u=D.size(i),c=[{type:12,data:u},...q(n[0].dims,t,i)],f=p=>`
  ${p.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${EA}
  ${kA(s)}
  ${DA(e)}
  ${BA(e)}
  ${NA(r,s,e)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${zn}]);
      let W_in = i32(uniforms.x_shape[${Ln}]);

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
      var grid_indices = vec3<u32>(indices[${_r}], indices[${zn}], indices[${Ln}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${RA(a,s,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:p=>{let m=D.size(i);return{outputs:[{dims:i,dataType:p[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:c}},getShaderSource:f}},Hx=(n,e)=>{CA(n.inputs),n.compute(zA(n.inputs,e))},qx=n=>fe({alignCorners:n.align_corners,mode:n.mode,paddingMode:n.padding_mode,format:n.format})});var Tt,VA,Xx,jx,FA,Vo,Zx,Dl=E(()=>{"use strict";ce();be();Ze();ma();xa();Te();yr();Tt=(n,e)=>n.length>e&&n[e].dims.length>0?n[e]:void 0,VA=(n,e)=>{let r=n[0],t=Tt(n,1),o=Tt(n,2),i=Tt(n,3),a=Tt(n,4),s=Tt(n,5),u=Tt(n,6),c=Tt(n,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],p=r.dims[1],m=r.dims.length===3?r.dims[2]:e.numHeads*r.dims[4],g=p,y=0,x=0,v=Math.floor(m/e.numHeads);if(u&&c&&D.size(u.dims)&&D.size(c.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==e.numHeads||u.dims[3]!==v)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==f||c.dims[1]!==e.numHeads||c.dims[3]!==v)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=u.dims[2],x=u.dims[2]}else if(u&&D.size(u.dims)||c&&D.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let T;if(t&&D.size(t.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');T=2,g=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==v)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');T=5,g=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==v)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');T=0,g=t.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==e.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');T=3}if(i&&D.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=y+g,I=0;if(a&&D.size(a.dims)>0){I=8;let R=a.dims;throw R.length===1?R[0]===f?I=1:R[0]===3*f+2&&(I=3):R.length===2&&R[0]===f&&R[1]===w&&(I=5),I===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let A=!1,P=m;if(o&&D.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(g!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(g!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let k=!1;if(a&&D.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(s&&D.size(s.dims)>0){if(s.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(s.dims[0]!==f||s.dims[1]!==e.numHeads||s.dims[2]!==p||s.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:w,maxSequenceLength:x,inputHiddenSize:0,hiddenSize:m,vHiddenSize:P,headSize:v,vHeadSize:Math.floor(P/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:I,scale:e.scale,broadcastResPosBias:k,passPastInKv:A,qkvFormat:T}},Xx=n=>fe({...n}),jx=fe({perm:[0,2,1,3]}),FA=(n,e,r,t,o,i,a)=>{let s=[t,o,i],u=D.size(s),c=[{type:12,data:u},{type:12,data:a},{type:12,data:i}],f=p=>{let m=G("qkv_with_bias",e.dataType,s),g=B("qkv",e.dataType,s),y=B("bias",r.dataType,s),x=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${p.registerUniforms(x).declareVariables(g,y,m)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return n.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:f},{inputs:[e,r],outputs:[-1]})[0]},Vo=(n,e,r,t,o,i,a,s)=>{let u=i;if(a&&D.size(a.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=FA(n,i,a,e,t,r*o,s),u=u.reshape([e,t,r,o]),r===1||t===1?u:n.compute(ut(u,jx.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,r,o])),r===1||t===1?u:n.compute(ut(u,jx.perm),{inputs:[u],outputs:[-1]})[0]},Zx=(n,e)=>{let r=VA(n.inputs,e),t=n.inputs[0],o=Tt(n.inputs,1),i=Tt(n.inputs,2),a=Tt(n.inputs,3),s=Tt(n.inputs,4),u=Tt(n.inputs,5),c=Tt(n.inputs,6),f=Tt(n.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let p=o&&i&&o.dims.length===4&&i.dims.length===4,m=Vo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t,a,0);if(p)return Rn(n,m,o,i,s,void 0,c,f,u,r);if(!o||!i)throw new Error("key and value must be provided");let g=Vo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),y=Vo(n,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Rn(n,m,g,y,s,void 0,c,f,u,r)}});var UA,GA,WA,HA,Bl,Jx,Yx,Nl=E(()=>{"use strict";ce();be();Ze();Te();UA=n=>{if(!n||n.length<1)throw new Error("too few inputs")},GA=(n,e)=>{let r=[],t=e.numOutputs;return n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(o=>r.push(Number(o))),t=r.length),fe({numOutputs:t,axis:e.axis,splitSizes:r})},WA=n=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${n}u; i += 1u ) {
    if (index < ${Y("uniforms.size_in_split_axis","i",n)}) {
        return i;
    }
    }
    return ${n}u;
}`,HA=n=>{let e=n.length,r=[];for(let t=0;t<e;++t){let o=n[t].setByIndices("indices","input[global_idx]");e===1?r.push(o):t===0?r.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${n[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Bl=(n,e)=>{let r=n[0].dims,t=D.size(r),o=n[0].dataType,i=D.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),s=B("input",o,r.length),u=new Array(e.numOutputs),c=[],f=[],p=0,m=[{type:12,data:t}];for(let y=0;y<e.numOutputs;y++){p+=e.splitSizes[y],u[y]=p;let x=r.slice();x[i]=e.splitSizes[y],f.push(x),a[y]=G(`output${y}`,o,x.length),c.push({dims:f[y],dataType:n[0].dataType})}m.push({type:12,data:u},...q(r,...f));let g=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(s,...a)}
  ${WA(u.length)}
  ${HA(a)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${s.offsetToIndices("global_idx")};
    var index = ${s.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${s.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:m})}},Jx=(n,e)=>{UA(n.inputs);let r=n.inputs.length===1?e:GA(n.inputs,e);n.compute(Bl(n.inputs,r),{inputs:[0]})},Yx=n=>{let e=n.axis,r=n.splitSizes,t=n.numOutputs<0?r.length:n.numOutputs;if(t!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return fe({axis:e,numOutputs:t,splitSizes:r})}});var qA,KA,Qx,e0,t0=E(()=>{"use strict";Ze();xa();Dl();Nl();yr();qA=(n,e)=>{if(e.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(e.doRotary&&n.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=n[0],t=n[1],o=n[2],i=n[3],a=n[4];if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let s=!1,u=r.dims[0],c=r.dims[1],f=r.dims.length===3?s?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],p=c,m=0,g=!t||t.dims.length===0,y=Math.floor(g?f/(e.numHeads+2*e.kvNumHeads):f/e.numHeads);g&&(f=y*e.numHeads);let x=i&&i.dims.length!==0,v=a&&a.dims.length!==0;if(x&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(x&&v){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=i.dims[2]}else if(x||v)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w=1;if(t&&t.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(r.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');p=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');p=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=t.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let I=0,A=!1,P=e.kvNumHeads?y*e.kvNumHeads:f;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(p!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');P=o.dims[2]}else{if(p!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');P=o.dims[1]*o.dims[3],A=!0}}let k=n.length>4?n[5]:void 0;if(k&&k.dims.length!==1&&k.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:P,headSize:y,vHeadSize:Math.floor(P/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:I,scale:e.scale,broadcastResPosBias:!1,passPastInKv:A,qkvFormat:w}},KA=fe({perm:[0,2,1,3]}),Qx=(n,e,r)=>{let t=e,o=r.kvNumHeads;return e.dims.length===3&&r.kvSequenceLength!==0&&(t=e.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),t=n.compute(ut(t,KA.perm),{inputs:[t],outputs:[-1]})[0]),t},e0=(n,e)=>{let r=qA(n.inputs,e);if(n.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(n.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=n.inputs[0],o=n.inputs[1]&&n.inputs[1].dims.length>0?n.inputs[1]:void 0,i=n.inputs[2]&&n.inputs[2].dims.length>0?n.inputs[2]:void 0,a=n.inputs[3]&&n.inputs[3].dims.length!==0?n.inputs[3]:void 0,s=n.inputs[4]&&n.inputs[4].dims.length!==0?n.inputs[4]:void 0,u=n.inputs.length>4?n.inputs[5]:void 0,c=n.inputs.length>5?n.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,p=fe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[m,g,y]=!o&&!i?n.compute(Bl([t],p),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],x=Vo(n,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,m,void 0,0);Rn(n,x,Qx(n,g,r),Qx(n,y,r),void 0,void 0,a,s,void 0,r,u,c)}});var r0,jA,XA,n0,o0=E(()=>{"use strict";ce();be();yr();Te();r0=(n,e,r,t,o,i,a,s)=>{let u=Ee(i),c=u===1?"f32":`vec${u}f`,f=u===1?"vec2f":`mat2x${u}f`,p=o*a,m=64;p===1&&(m=256);let g=[o,a,i/u],y=[o,a,2],x=["rank","type","type"],v=[];v.push(...q(g,y));let T=w=>{let I=B("x",e.dataType,3,u),A=B("scale",r.dataType,r.dims),P=B("bias",t.dataType,t.dims),k=G("output",1,3,2),R=[I,A,P,k];return`
  var<workgroup> workgroup_shared : array<${f}, ${m}>;
  const workgroup_size = ${m}u;
  ${w.declareVariables(...R)}
  ${w.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${I.get("batch","channel","h")});
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
      let sum_final = ${Ht("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Ht("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${s}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return n.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${s};${m}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:p},programUniforms:v}),getShaderSource:T},{inputs:[e,r,t],outputs:[-1]})[0]},jA=(n,e,r)=>{let t=e[0].dims,o=t,i=2,a=t[0],s=t[1],u=D.sizeFromDimension(t,i),c=Ee(u),f=D.size(o)/c,p=r0(n,e[0],e[1],e[2],a,u,s,r.epsilon),m=[a,s,u/c],g=[a,s],y=["type","none"],x=v=>{let T=B("x",e[0].dataType,m.length,c),w=B("scale_shift",1,g.length,2),I=G("output",e[0].dataType,m.length,c),A=[T,w,I];return`
  ${v.registerUniform("output_size","u32").declareVariables(...A)}
  ${v.mainStart()}
  ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${I.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${T.getByOffset("global_idx")} * ${I.type.value}(scale_shift.x) + ${I.type.value}(scale_shift.y);
      ${I.setByOffset("global_idx","value")};
  }`};n.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...q(m,g,m)]}),getShaderSource:x},{inputs:[e[0],p]})},XA=(n,e,r)=>{let t=e[0].dims,o=t,i=t[0],a=t[t.length-1],s=D.sizeFromDimension(t,1)/a,u=Ee(a),c=D.size(o)/u,f=[{type:12,data:s},{type:12,data:Math.floor(a/u)}],p=["type","type"],m=!1,g=[0,t.length-1];for(let T=0;T<t.length-2;T++)m=m||t[T+1]!==1,g.push(T+1);m=m&&t[t.length-1]!==1;let y=m?n.compute(ut(n.inputs[0],g),{inputs:[n.inputs[0]],outputs:[-1]})[0]:n.inputs[0].reshape(Array.from({length:t.length},(T,w)=>t[g[w]])),x=r0(n,y,e[1],e[2],i,s,a,r.epsilon),v=T=>{let w=Ve(e[0].dataType),I=u===1?"vec2f":`mat${u}x2f`,A=R=>{let z=R===0?"x":"y",F=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${w}(${F}(scale.${z}))`;case 2:return`vec2<${w}>(${F}(scale[0].${z}, scale[1].${z}))`;case 4:return`vec4<${w}>(${F}(scale[0].${z}, scale[1].${z}, scale[2].${z}, scale[3].${z}))`;default:throw new Error(`Not supported compoents ${u}`)}},P=B("input",e[0].dataType,e[0].dims,u),k=G("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${P.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${I}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${k.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${T.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${A(0)}, ${A(1)});
  }`};n.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:f}),getShaderSource:v},{inputs:[e[0],x]})},n0=(n,e)=>{e.format==="NHWC"?XA(n,n.inputs,e):jA(n,n.inputs,e)}});var ZA,JA,i0,a0=E(()=>{"use strict";ce();be();Te();ZA=n=>{if(!n||n.length<2)throw new Error("layerNorm requires at least 2 inputs.")},JA=(n,e,r)=>{let t=e.simplified,o=n[0].dims,i=n[1],a=!t&&n[2],s=o,u=D.normalizeAxis(e.axis,o.length),c=D.sizeToDimension(o,u),f=D.sizeFromDimension(o,u),p=D.size(i.dims),m=a?D.size(a.dims):0;if(p!==f||a&&m!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${m}`);let g=[];for(let P=0;P<o.length;++P)P<u?g.push(o[P]):g.push(1);let y=Ee(f),x=["type","type"],v=[{type:12,data:c},{type:1,data:f},{type:12,data:Math.floor(f/y)},{type:1,data:e.epsilon}];a&&x.push("type");let T=r>1,w=r>2,I=P=>{let k=Ve(n[0].dataType),R=[B("x",n[0].dataType,n[0].dims,y),B("scale",i.dataType,i.dims,y)];a&&R.push(B("bias",a.dataType,a.dims,y)),R.push(G("output",n[0].dataType,s,y)),T&&R.push(G("mean_data_output",1,g)),w&&R.push(G("inv_std_output",1,g));let z=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${P.registerUniforms(z).declareVariables(...R)}
  ${P.mainStart()}
    ${P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${yl("f32",y)};
    var mean_square_vector = ${yl("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${fn(k,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ht("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ht("mean_square_vector",y)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${fn(k,y,"x[j + offset]")};
      let f32scale = ${fn(k,y,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${fn(k,y,"bias[j]")}`:""}
      );
    }

    ${T?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},A=[{dims:s,dataType:n[0].dataType}];return T&&A.push({dims:g,dataType:1}),w&&A.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${t}`,inputDependencies:x},getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:v}),getShaderSource:I}},i0=(n,e)=>{ZA(n.inputs),n.compute(JA(n.inputs,e,n.outputCount))}});var YA,s0,u0=E(()=>{"use strict";be();$a();Aa();YA=n=>{if(!n||n.length!==2)throw new Error("MatMul requires 2 inputs.");if(n[0].dims[n[0].dims.length-1]!==n[1].dims[n[1].dims.length-2])throw new Error("shared dimension does not match.")},s0=n=>{YA(n.inputs);let e=ar.calcShape(n.inputs[0].dims,n.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],t=n.inputs[0].dims[n.inputs[0].dims.length-1];if(r<8&&t<8)n.compute(Sa(n.inputs,{activation:""},e));else{let o=e[e.length-2],i=D.size(n.inputs[0].dims.slice(0,-2)),a=D.size(n.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let s=n.inputs[0].reshape([1,i,t]),u=n.inputs[1].reshape([1,t,r]),c=[1,i,r],f=[s,u];n.compute(Mo(f,{activation:""},e,c),{inputs:f})}else n.compute(Mo(n.inputs,{activation:""},e))}}});var QA,eO,tO,l0,c0,f0=E(()=>{"use strict";ce();be();Ze();Te();QA=(n,e)=>{if(n.length<3||n.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=n[0],t=r.dims.length;if(r.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=n[1];if(!D.areEqual(a.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=n[2].dims;if(D.size(u)!==e.n*o)throw new Error("scales input size error.");if(n.length===4){let f=n[3].dims,p=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if(D.size(f)!==p)throw new Error("zeroPoints input size error.")}},eO=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),f=n[1].dims[2]/4,p=n[0].dataType,m=Ee(e.k),g=Ee(f),y=Ee(a),x=s.concat([o,a]),v=o>1&&a/y%2===0?2:1,T=D.size(x)/y/v,w=64,I=[],A=[u,o,i/m],P=D.convertShape(n[1].dims).slice();P.splice(-1,1,f/g),I.push(...q(A)),I.push(...q(P)),I.push(...q(n[2].dims)),n.length===4&&I.push(...q(D.convertShape(n[3].dims)));let k=[u,o,a/y];I.push(...q(k));let R=z=>{let F=A.length,X=B("a",n[0].dataType,F,m),Q=B("b",12,P.length,g),de=B("scales",n[2].dataType,n[2].dims.length),W=[X,Q,de],se=n.length===4?B("zero_points",12,n[3].dims.length):void 0;se&&W.push(se);let Fe=k.length,te=G("output",n[0].dataType,Fe,y),le=Ve(n[0].dataType),ge=(()=>{switch(m){case 1:return`array<${le}, 8>`;case 2:return`mat4x2<${le}>`;case 4:return`mat2x4<${le}>`;default:throw new Error(`${m}-component is not supported.`)}})(),ee=()=>{let Ke=`
          // reuse a data
            var input_offset = ${X.indicesToOffset(`${X.type.indices}(batch, row, word_offset)`)};
            var a_data: ${ge};
            for (var j: u32 = 0; j < ${8/m}; j++) {
              a_data[j] = ${X.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let L=0;L<y*v;L++)Ke+=`
            b_value = ${g===1?`b${L}_data`:`b${L}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${ge}(${Array.from({length:4},(V,re)=>`${le}(b_value_lower[${re}]), ${le}(b_value_upper[${re}])`).join(", ")});
            b_dequantized_values = ${m===1?`${ge}(${Array.from({length:8},(V,re)=>`(b_quantized_values[${re}] - ${se?`zero_point${L}`:"zero_point"}) * scale${L}`).join(", ")});`:`(b_quantized_values - ${ge}(${Array(8).fill(`${se?`zero_point${L}`:"zero_point"}`).join(",")})) * scale${L};`};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(L/y)}]${y>1?`[${L%y}]`:""} += ${Array.from({length:8/m},(V,re)=>`${m===1?`a_data[${re}] * b_dequantized_values[${re}]`:`dot(a_data[${re}], b_dequantized_values[${re}])`}`).join(" + ")};
          `;return Ke},ve=()=>{let Ke=`
            var col_index = col * ${y};
            ${se?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${le}(8);`}
            `;for(let L=0;L<y*v;L++)Ke+=`
            let scale${L} = ${de.getByOffset("col_index * nBlocksPerCol + block")};
            ${se?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${se.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${L} = ${le}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Ke},rt=()=>{let Ke=`col_index = col * ${y};`;for(let L=0;L<y*v;L++)Ke+=`
            let b${L}_data = ${Q.getByIndices(`${Q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Ke+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ge};
            var b_dequantized_values: ${ge};`,Ke};return`
        var<workgroup> workgroup_shared: array<${te.type.value}, ${v*w}>;
        ${z.declareVariables(...W,te)}
        ${z.mainStart([w,1,1])}
          let output_indices = ${te.offsetToIndices(`(global_idx / ${w}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${w}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/m};
            ${ve()}
            for (var word: u32 = 0; word < ${f}; word += ${g}) {
              ${rt()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${ee()}
                word_offset += ${8/m};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${w}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${te.setByIndices(`${te.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${m};${g};${y};${v};${w}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:x,dataType:p}],dispatchGroup:{x:T},programUniforms:I}),getShaderSource:R}},tO=(n,e)=>{let r=n[0].dims,t=r.length,o=r[t-2],i=e.k,a=e.n,s=r.slice(0,t-2),u=D.size(s),f=n[1].dims[2]/4,p=n[0].dataType,m=Ee(e.k),g=Ee(f),y=s.concat([o,a]),x=128,v=a%8===0?8:a%4===0?4:1,T=x/v,w=T*g*8,I=w/m,A=w/e.blockSize,P=D.size(y)/v,k=[],R=[u,o,i/m],z=D.convertShape(n[1].dims).slice();z.splice(-1,1,f/g),k.push(...q(R)),k.push(...q(z)),k.push(...q(n[2].dims)),n.length===4&&k.push(...q(D.convertShape(n[3].dims)));let F=[u,o,a];k.push(...q(F));let X=Q=>{let de=R.length,W=B("a",n[0].dataType,de,m),se=B("b",12,z.length,g),Fe=B("scales",n[2].dataType,n[2].dims.length),te=[W,se,Fe],le=n.length===4?B("zero_points",12,n[3].dims.length):void 0;le&&te.push(le);let ge=F.length,ee=G("output",n[0].dataType,ge),ve=Ve(n[0].dataType),rt=()=>{switch(m){case 1:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${m}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${I}>;
        var<workgroup> inter_results: array<array<${ee.type.value}, ${T}>, ${v}>;
        ${Q.declareVariables(...te,ee)}
        ${Q.mainStart([T,v,1])}
          let output_indices = ${ee.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${A} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${I};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${I}; a_offset += ${x})
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
            let block = tile * ${A} + local_id.x;
            ${le?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${le.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ve}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ve}(8);`}
            let scale = ${Fe.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${se.getByIndices(`${se.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/m};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${rt()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ve}>(${Array.from({length:4},(Ke,L)=>`${ve}(b_value_lower[${L}]), ${ve}(b_value_upper[${L}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ve}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ke,L)=>`${`dot(a_data${L}, b_dequantized_values[${L}])`}`).join(" + ")};
              word_offset += ${8/m};
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${ee.type.value} = ${ee.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ee.setByIndices(`${ee.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${m};${g};${T};${v}`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:p}],dispatchGroup:{x:P},programUniforms:k}),getShaderSource:X}},l0=(n,e)=>{QA(n.inputs,e),e.blockSize===32&&n.adapterInfo.isVendor("intel")&&n.adapterInfo.isArchitecture("gen-12lp")?n.compute(tO(n.inputs,e)):n.compute(eO(n.inputs,e))},c0=n=>fe(n)});var rO,nO,oO,iO,aO,sO,uO,lO,d0,p0=E(()=>{"use strict";ce();be();Te();rO=n=>{if(!n||n.length<1)throw new Error("Too few inputs");if(n[0].dataType!==1&&n[0].dataType!==10)throw new Error("Input type must be float or float16.");if(n.length>=2){let e=n[0].dims.length*2===n[1].dims[0];if(n.length===4&&(e=n[3].dims[0]*2===n[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},nO=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${Y("uniforms.x_strides",o,e)});
        `;return`
          value = ${n.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},oO=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},iO=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
                  k = i32(${Y("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},aO=(n,e,r)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${n.indicesGet("indices",o)}) - ${Y("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${Y("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${Y("uniforms.x_shape",o,e)})) {
                  k -= i32(${Y("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${Y("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},sO=(n,e,r)=>{switch(r.mode){case 0:return nO(n,e,r.pads.length);case 1:return oO(n,e,r.pads.length);case 2:return iO(n,e,r.pads.length);case 3:return aO(n,e,r.pads.length);default:throw new Error("Invalid mode")}},uO=(n,e)=>{let r=D.padShape(n[0].dims.slice(),e.pads),t=n[0].dims,o=D.size(r),i=[{type:12,data:o},{type:6,data:e.pads}],a=n.length>=3&&n[2].data;e.mode===0&&i.push({type:a?n[2].dataType:1,data:e.value}),i.push(...q(n[0].dims,r));let s=["rank"],u=c=>{let f=G("output",n[0].dataType,r.length),p=B("x",n[0].dataType,t.length),m=p.type.value,g=sO(f,t.length,e),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&y.push({name:"constant_value",type:a?m:"f32"}),`
            ${c.registerUniforms(y).declareVariables(p,f)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${a}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:r,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(r)/64)},programUniforms:i}),getShaderSource:u}},lO=(n,e)=>{if(n.length>1){let r=n[1].getBigInt64Array(),t=n.length>=3&&n[2].data?n[2].dataType===10?n[2].getUint16Array()[0]:n[2].getFloat32Array()[0]:0,o=n[0].dims.length,i=new Int32Array(2*o).fill(0);if(n.length>=4){let s=n[3].getBigInt64Array();for(let u=0;u<s.length;u++)i[Number(s[u])]=Number(r[u]),i[Number(s[u])+o]=Number(r[u+s.length])}else r.forEach((s,u)=>i[Number(u)]=Number(s));let a=[];return i.forEach(s=>a.push(s)),{mode:e.mode,value:t,pads:a}}else return e},d0=(n,e)=>{rO(n.inputs);let r=lO(n.inputs,e);n.compute(uO(n.inputs,r),{inputs:[0]})}});var Ca,m0,h0,b0,g0,cO,fO,y0,_0,x0,T0,w0,v0,I0,S0,$0,A0,O0,P0,C0=E(()=>{"use strict";pt();ce();be();Te();Ca=n=>{if(he.webgpu.validateInputContent&&(!n||n.length!==1))throw new Error("Pool ops requires 1 input.")},m0=(n,e,r)=>{let t=e.format==="NHWC",o=n.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),s=e.strides.slice(),u=i?e.dilations.slice():[],c=e.pads.slice();ln.adjustPoolAttributes(r,o,a,s,u,c);let f=ln.computePoolOutputShape(r,o,s,u,a,c,e.autoPad),p=Object.assign({},e);i?Object.assign(p,{kernelShape:a,strides:s,pads:c,dilations:u,cacheKey:e.cacheKey}):Object.assign(p,{kernelShape:a,strides:s,pads:c,cacheKey:e.cacheKey});let m=f.slice();return m.push(m.splice(1,1)[0]),[p,t?m:f]},h0=(n,e)=>{let r=e.format==="NHWC",t=D.size(n),o=D.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],c=e.pads[e.pads.length/2-1],f=e.pads[e.pads.length-1],p=!!(c+f);i.push({type:12,data:s},{type:12,data:u},{type:12,data:c},{type:12,data:f}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(e.kernelShape.length===2){let g=e.kernelShape[e.kernelShape.length-2],y=e.strides[e.strides.length-2],x=e.pads[e.pads.length/2-2],v=e.pads[e.pads.length-2];m=!!(x+v),i.push({type:12,data:g},{type:12,data:y},{type:12,data:x},{type:12,data:v}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,p,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let s=D.computeStrides(e.kernelShape);i.push({type:12,data:s},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:s.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((c,f)=>c+f);return[i,a,!!u,!1,!1]}},b0=(n,e,r,t,o,i,a,s,u,c,f,p)=>{let m=o.format==="NHWC",g=e.type.value,y=G("output",e.type.tensor,t);if(o.kernelShape.length<=2){let x="",v="",T="",w=r-(m?2:1);if(f?x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:x=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let A=r-(m?3:2);p?v=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${A}] = indices[${A}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${A}] < 0 || xIndices[${A}] >= uniforms.x_shape[${A}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:v=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${A}] = indices[${A}] * uniforms.sh - uniforms.phStart + j;
                `,T=`
              }
            `}return`
            ${n.registerUniforms(u).declareVariables(e,y)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${g}(${s});
              var pad = 0;
              ${v}
              ${x}
              ${T}
              ${a}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let x=o.kernelShape.length,v=o.pads.length,T="";return c?T=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:T=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${n.registerUniforms(u).declareVariables(e,y)}

            ${n.mainStart()}
              ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${x}>;

              var value = ${g}(${s});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${x-1}u; j++) {
                  offsets[j] = offset / ${Y("uniforms.kernelStrides","j",x)};
                  offset -= offsets[j] * ${Y("uniforms.kernelStrides","j",x)};
                }
                offsets[${x-1}] = offset;

                isPad = false;
                for (var j = ${r-x}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Y("uniforms.strides",`j - ${r-x}u`,x)}
                    + offsets[j - ${r-x}u] - ${Y("uniforms.pads","j - 2u",v)};
                  ${T}
              }
              ${a}

              output[global_idx] = value;
            }`}},g0=n=>`${n.format};${n.ceilMode};${n.autoPad};${n.kernelShape.length}`,cO=n=>`${g0(n)};${n.countIncludePad}`,fO=n=>`${g0(n)};${n.storageOrder};${n.dilations}`,y0=n=>({format:n.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][n.auto_pad],ceilMode:n.ceil_mode,kernelShape:n.kernel_shape,strides:n.strides,pads:n.pads}),_0=(n,e,r,t)=>{let[o,i]=m0(e,t,r),a=B("x",e.dataType,e.dims.length),s=a.type.value,u="value += x_val;",c="";o.countIncludePad?c+=`value /= ${s}(uniforms.kernelSize);`:c+=`value /= ${s}(i32(uniforms.kernelSize) - pad);`;let[f,p,m,g,y]=h0(i,o);f.push(...q(e.dims,i));let x=["rank"];return{name:n,shaderCache:{hint:`${t.cacheKey};${m};${g};${y}`,inputDependencies:x},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:f}),getShaderSource:v=>b0(v,a,e.dims.length,i.length,o,u,c,0,p,m,g,y)}},x0=n=>{let e=n.count_include_pad!==0,r=y0(n);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...r,cacheKey:""};return{...t,cacheKey:cO(t)}},T0=(n,e)=>{Ca(n.inputs),n.compute(_0("AveragePool",n.inputs[0],!1,e))},w0={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},v0=n=>{let e=n.format;return{format:e,...w0,cacheKey:e}},I0=(n,e)=>{Ca(n.inputs),n.compute(_0("GlobalAveragePool",n.inputs[0],!0,e))},S0=(n,e,r,t)=>{let[o,i]=m0(e,t,r),a=`
      value = max(x_val, value);
    `,s="",u=B("x",e.dataType,e.dims.length),c=["rank"],[f,p,m,g,y]=h0(i,o);return f.push(...q(e.dims,i)),{name:n,shaderCache:{hint:`${t.cacheKey};${m};${g};${y}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(D.size(i)/64)},programUniforms:f}),getShaderSource:x=>b0(x,u,e.dims.length,i.length,o,a,s,e.dataType===10?-65504:-1e5,p,m,g,y)}},$0=(n,e)=>{Ca(n.inputs),n.compute(S0("MaxPool",n.inputs[0],!1,e))},A0=n=>{let e=n.storage_order,r=n.dilations,t=y0(n);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:r,...t,cacheKey:""};return{...o,cacheKey:fO(o)}},O0=n=>{let e=n.format;return{format:e,...w0,cacheKey:e}},P0=(n,e)=>{Ca(n.inputs),n.compute(S0("GlobalMaxPool",n.inputs[0],!0,e))}});var pO,mO,E0,k0,D0=E(()=>{"use strict";ce();be();Ze();Te();pO=(n,e)=>{if(n.length<2||n.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(n.length===3&&n[1].dims===n[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(n.length===3&&n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[0].dataType===6&&n.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(n[1].dims.length!==0&&n[1].dims.length!==1&&n[1].dims.length!==n[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(n.length>2){if(n[0].dataType!==n[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(n[1].dims.length!==n[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!n[1].dims.map((r,t)=>r===n[2].dims[t]).reduce((r,t)=>r&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(n[1].dims.length===0||n[1].dims.length===1&&n[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!n[1].dims.map((o,i)=>i===e.axis||o===n[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(n[1].dims.length!==n[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=n[0].dims[e.axis],t=n[1].dims[e.axis];if(e.blockSize<Math.ceil(r/t)||e.blockSize>Math.ceil(r/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},mO=(n,e)=>{let r=D.normalizeAxis(e.axis,n[0].dims.length),t=n[0].dataType,o=t===3,i=n[0].dims,a=n[1].dataType,s=D.size(i),u=t===3||t===2,c=u?[Math.ceil(D.size(n[0].dims)/4)]:n[0].dims,f=n[1].dims,p=n.length>2?n[2]:void 0,m=p?u?[Math.ceil(D.size(p.dims)/4)]:p.dims:void 0,g=f.length===0||f.length===1&&f[0]===1,y=g===!1&&f.length===1,x=Ee(s),v=g&&(!u||x===4),T=v?x:1,w=v&&!u?x:1,I=B("input",u?12:t,c.length,w),A=B("scale",a,f.length),P=p?B("zero_point",u?12:t,m.length):void 0,k=G("output",a,i.length,T),R=[I,A];P&&R.push(P);let z=[c,f];p&&z.push(m);let F=[{type:12,data:s/T},{type:12,data:r},{type:12,data:e.blockSize},...q(...z,i)],X=Q=>{let de=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Q.registerUniforms(de).declareVariables(...R,k)}
      ${Q.mainStart()}
          ${Q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${k.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${I.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${T===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${I.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${A.getByOffset("0")}`:y?`
            let scale_index = ${k.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${A.getByOffset("scale_index")};`:`
            var scale_indices: ${A.type.indices} = output_indices;
            let index = ${A.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${A.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${A.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${P?g?u?`
                let zero_point_input = ${P.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${P.getByOffset("0")}`:y?u?`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${P.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${P.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${A.indicesToOffset("scale_indices")};
                let zero_point_input = ${P.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${P.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":I.type.value}(0);`};
      // Compute and write output
      ${k.setByOffset("global_idx",`${k.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:P?["rank","rank","rank"]:["rank","rank"]},getShaderSource:X,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/T/64),y:1,z:1},programUniforms:F})}},E0=(n,e)=>{pO(n.inputs,e),n.compute(mO(n.inputs,e))},k0=n=>fe({axis:n.axis,blockSize:n.blockSize})});var hO,bO,B0,N0=E(()=>{"use strict";pt();ce();Te();hO=(n,e,r)=>{let t=n===e,o=n<e&&r<0,i=n>e&&r>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},bO=(n,e,r,t)=>{let o=Math.abs(Math.ceil((e-n)/r)),i=[o],a=o,s=[{type:12,data:a},{type:t,data:n},{type:t,data:r},...q(i)],u=c=>{let f=G("output",t,i.length),p=f.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:p},{name:"delta",type:p}];return`
        ${c.registerUniforms(m).declareVariables(f)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${p}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:s})}},B0=n=>{let e=0,r=0,t=0;n.inputs[0].dataType===6?(e=n.inputs[0].getInt32Array()[0],r=n.inputs[1].getInt32Array()[0],t=n.inputs[2].getInt32Array()[0]):n.inputs[0].dataType===1&&(e=n.inputs[0].getFloat32Array()[0],r=n.inputs[1].getFloat32Array()[0],t=n.inputs[2].getFloat32Array()[0]),he.webgpu.validateInputContent&&hO(e,r,t),n.compute(bO(e,r,t,n.inputs[0].dataType),{inputs:[]})}});var gO,yO,R0,z0,L0=E(()=>{"use strict";ce();be();Ze();Te();gO=(n,e,r,t)=>{if(n!=="none"&&t!=="i32"&&t!=="u32"&&t!=="f32")throw new Error(`Input ${t} is not supported with reduction ${n}.`);let o=`{
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
                ${o}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return t==="i32"||t==="u32"?`atomicMin(&${e}, bitcast<${t}>(${r}));`:`${o}min(bitcast<${t}>(oldValue), (${r}))${i}`;case"mul":return`${o}(bitcast<${t}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${n} is not supported.`)}},yO=(n,e)=>{let r=n[0].dims,t=n[1].dims,o=r,i=1,a=Math.ceil(D.size(t)/i),s=t[t.length-1],u=D.sizeFromDimension(r,s),c=[{type:12,data:a},{type:12,data:s},{type:12,data:u},...q(n[1].dims,n[2].dims,o)],f=p=>{let m=B("indices",n[1].dataType,n[1].dims.length),g=B("updates",n[2].dataType,n[2].dims.length,i),y=e.reduction!=="none"&&e.reduction!==""?fy("output",n[0].dataType,o.length):G("output",n[0].dataType,o.length,i);return`
      ${p.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,g,y)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${e.reduction==="none"}) {
    let n = ${D.size(t)};
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
    ${gO(e.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${e.cacheKey}_${e.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:f}},R0=n=>fe({reduction:n.reduction}),z0=(n,e)=>{n.compute(yO(n.inputs,e),{inputs:[n.inputs[1],n.inputs[2]],outputs:[]})}});var _O,xO,TO,M0,wO,vO,IO,SO,$O,AO,OO,PO,V0,CO,EO,kO,DO,BO,F0,U0,G0=E(()=>{"use strict";ce();be();Ze();Te();_O=(n,e)=>{if(n.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),n.length>0){if(e.mode==="linear"){if(!(n.length===2||n.length===3||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1||n.length===5&&n[0]===1&&n[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(n.length===2||n.length===4&&n[0]===1&&n[1]===1||n.length===4&&n[0]===1&&n[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},xO=(n,e,r)=>{e.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(r).fill(1);return e.forEach((o,i)=>t[o]=n[i]),t},TO=(n,e,r,t,o,i)=>{let[a,s,u]=r>10?[1,2,3]:[-1,n.length>1?1:-1,-1],c=n[0].dims.length;if(a>0&&n.length>a&&n[a].dims.length>0)n[a].getFloat32Array().forEach(f=>i.push(f));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(s>0&&n.length>s&&n[s].dims.length===1&&n[s].dims[0]>0){if(n[s].getFloat32Array().forEach(f=>t.push(f)),t.length!==0&&t.length!==c&&r>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");_O(t,e),e.axes.length>0&&xO(t,e.axes,c).forEach((f,p)=>t[p]=f)}if(u>0&&n.length>u&&n[u].dims.length===1&&n[u].dims[0]>0&&(n[u].getBigInt64Array().forEach(f=>o.push(Number(f))),o.length!==0&&o.length!==c&&r>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},M0=(n,e,r,t)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${n}) * (${e});
  let whole = ${t}(big / (${r}));
  let fract = ${t}(big % (${r})) / ${t}(${r});
  return whole + fract;
`,wO=(n,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(n){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${e}(xResized) / ${e}(xScale);
          } else {
            ${M0("xResized","lengthOriginal","lengthResized",e)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${M0("xResized","lengthOriginal - 1","lengthResized - 1",e)}
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
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${n} is not supported`)}})()+"}",vO=(n,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(n){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${n} is not supported`)}})()+"}",IO=(n,e,r)=>{let t=new Array(r).fill(0).concat(new Array(r).fill(1)),o=n.length===0?t:n.slice();return e.length>0?(e.forEach((i,a)=>{t[i]=o[a],t[a+r]=o[e.length+a]}),t):o},SO=(n,e,r,t)=>{let o=[];if(r.length>0)if(t.length>0){if(n.forEach(i=>o.push(i)),Math.max(...t)>n.length)throw new Error("axes is out of bound");t.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=n.map((i,a)=>Math.round(i*e[a]))}return o},$O=(n,e,r)=>{let t=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=n.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=t),r.axes.forEach(i=>o[i]=Math.round(n[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,a)=>o[a]=Math.round(i*e[a]))),o},AO=(n,e,r,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${n.type.indices}) -> array<${n.type.value}, ${r.length}> {
      var original_indices: array<${n.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${n.indicesGet("output_indices","i")};
        var scale = ${Y("uniforms.scales","i",t)};
        var roi_low = ${Y("uniforms.roi","i",o)};
        var roi_hi = ${Y("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${n.type.value}(output_index);
        } else {
          var input_shape_i = ${Y("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,OO=(n,e,r,t,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
      var input_indices: ${n.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Y("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y("uniforms.roi","i",i)};
          var roi_hi = ${Y("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",t.length)};
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
        ${n.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,PO=(n,e)=>`
    fn checkInputIndices(input_indices: ${n.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${n.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Y("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,V0=(n,e,r,t)=>n.rank>t?`
    ${n.indicesSet("input_indices",e,"channel")};
    ${n.indicesSet("input_indices",r,"batch")};
`:"",CO=(n,e,r,t,o)=>{let[a,s,u,c]=r.length===2?[-1,0,1,-1]:[0,2,3,1],f=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${V0(n,c,a,2)}
      return ${n.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${f} = originalIndices[${s}];
      var col:${f} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
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
    }`},EO=(n,e,r,t,o,i,a,s,u,c)=>{let f=r.length===2,p=!0,[m,g]=f?[0,1]:p?[2,3]:[1,2],y=n.type.value,x=v=>{let T=v===m?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${n.type.indices}, output_indices: ${e.type.indices}) -> ${y} {
        var output_index = ${e.indicesGet("output_indices",v)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[v]},
        ${t[v]}, ${r[v]}, ${i[v]}, ${i[v]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${s} && (originalIdx < 0 || originalIdx > (${r[v]} - 1))) {
          return ${u};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${y} = originalIdx + ${y}(i);
          if (${T} < 0 || ${T} >= ${r[v]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:s?`return ${u};`:`${T} = max(0, min(${T}, ${r[v]} - 1));`};
          }
        var input_indices_copy: ${n.type.indices} = input_indices;
          ${n.indicesSet("input_indices_copy",v,`u32(${T})`)};
          data[i + 1] = ${v===m?n.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${x(m)};
    ${x(g)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${y} {
    var input_indices: ${n.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},kO=(n,e,r,t,o)=>{let[a,s,u,c,f]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],p=n.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${n.type.indices};
      ${n.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${n.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${n.indicesSet("input_indices",c,`max(0, min(width, ${r[c]} - 1))`)};
      ${V0(n,f,a,3)}
      return ${n.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${s}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${c}];
      ${t?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[c]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[c]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${f}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
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
    }`},DO=(n,e,r,t,o,i)=>{let a=n.dims,s=IO(i,e.axes,a.length),u=SO(a,t,o,e.axes),c=t.slice();t.length===0&&(c=a.map((w,I)=>w===0?1:u[I]/w),e.keepAspectRatioPolicy!=="stretch"&&(u=$O(a,c,e)));let f=G("output",n.dataType,u.length),p=B("input",n.dataType,a.length),m=D.size(u),g=a.length===u.length&&a.every((w,I)=>w===u[I]),y=e.coordinateTransformMode==="tf_crop_and_resize",x=e.extrapolationValue,v=p.type.value,T=w=>`
      ${g?"":`
      ${wO(e.coordinateTransformMode,v)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${PO(p,a)};
              ${vO(e.nearestMode,r,v)};
              ${OO(p,f,a,u,c.length,s.length,y)};
              `;case"linear":return`
              ${AO(f,a,u,c.length,s.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${CO(p,f,a,y,x)}`;if(a.length===3||a.length===5)return`${kO(p,f,a,y,x)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${EO(p,f,a,u,c,s,e.cubicCoeffA,y,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",s.length).declareVariables(p,f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${p.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${p.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${c.length>0?e.mode==="cubic"?c:c.length:""}|${o.length>0?o:""}|${s.length>0?s:""}|${g}|${e.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[{dims:u,dataType:n.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:c},{type:1,data:s},...q(a,u)]})}},BO=n=>{let e=n.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},F0=(n,e)=>{let r=[],t=[],o=[],i=BO(n);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");TO(n.inputs,e,i,r,t,o),n.compute(DO(n.inputs[0],e,i,r,t,o),{inputs:[0]})},U0=n=>{let e=n.antialias,r=n.axes,t=n.coordinateTransformMode,o=n.cubicCoeffA,i=n.excludeOutside!==0,a=n.extrapolationValue,s=n.keepAspectRatioPolicy,u=n.mode,c=n.nearestMode===""?"simple":n.nearestMode;return fe({antialias:e,axes:r,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:s,mode:u,nearestMode:c})}});var NO,RO,W0,H0=E(()=>{"use strict";ce();be();Ze();Te();NO=(n,e)=>{let[r,t,o,i]=n,{numHeads:a,rotaryEmbeddingDim:s}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!D.areEqual(t.dims,[])&&!D.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!D.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(s>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],c=r.dims[r.dims.length-2],f=o.dims[0],p=D.sizeFromDimension(r.dims,1)/c,m=s===0?o.dims[1]*2:p/a;if(s>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(c!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(m/2!==o.dims[1]&&s/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(c>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},RO=(n,e)=>{let{interleaved:r,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,a=n[0].dims[0],s=D.sizeFromDimension(n[0].dims,1),u=n[0].dims[n[0].dims.length-2],c=s/u,f=n[2].dims[1],p=o===0?f*2:c/t,m=new Array(a,u,c/p,p-f),g=D.computeStrides(m),y=[{type:1,data:i},{type:12,data:m},{type:12,data:g},...n[0].dims.length===3?new Array({type:12,data:[s,c,p,1]}):[],...n[0].dims.length===4?new Array({type:12,data:[s,p,u*p,1]}):[],...q(n[0].dims,n[1].dims,n[2].dims,n[3].dims,n[0].dims)],x=v=>{let T=B("input",n[0].dataType,n[0].dims.length),w=B("position_ids",n[1].dataType,n[1].dims.length),I=B("cos_cache",n[2].dataType,n[2].dims.length),A=B("sin_cache",n[3].dataType,n[3].dims.length),P=G("output",n[0].dataType,n[0].dims.length);return v.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${v.declareVariables(T,w,I,A,P)}

        ${v.mainStart(cn)}
          let half_rotary_emb_dim = uniforms.${I.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",G("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${T.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} -
                ${T.getByOffset("j")} * ${A.get("position_id","bsnh[3]")};
            ${P.setByOffset("i","re")}
            let im = ${T.getByOffset("i")} * ${A.get("position_id","bsnh[3]")} +
                ${T.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${P.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${P.setByOffset("k",T.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:x,getRunData:()=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(D.size(m)/cn)},programUniforms:y})}},W0=(n,e)=>{NO(n.inputs,e),n.compute(RO(n.inputs,e))}});var zO,LO,q0,K0=E(()=>{"use strict";ce();be();Te();zO=n=>{if(!n||n.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=n[0],r=n[1],t=n[2];if(e.dataType!==r.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(n.length>3){let a=n[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(n.length>4){let a=n[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},LO=(n,e,r,t)=>{let o=e.simplified,i=n[0].dims,a=D.size(i),s=i,u=a,c=i.slice(-1)[0],f=t?i.slice(0,-1).concat(1):[],p=!o&&n.length>3,m=n.length>4,g=t&&r>1,y=t&&r>2,x=r>3,v=64,T=Ee(c),w=[{type:12,data:u},{type:12,data:T},{type:12,data:c},{type:1,data:e.epsilon}],I=P=>{let k=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[B("x",n[0].dataType,n[0].dims,T),B("skip",n[1].dataType,n[1].dims,T),B("gamma",n[2].dataType,n[2].dims,T)];p&&R.push(B("beta",n[3].dataType,n[3].dims,T)),m&&R.push(B("bias",n[4].dataType,n[4].dims,T)),R.push(G("output",n[0].dataType,s,T)),g&&R.push(G("mean_output",1,f)),y&&R.push(G("inv_std_output",1,f)),x&&R.push(G("input_skip_bias_sum",n[0].dataType,s,T));let z=Ve(n[0].dataType),F=Ve(1,T);return`

      ${P.registerUniforms(k).declareVariables(...R)}
      var<workgroup> sum_shared : array<${F}, ${v}>;
      var<workgroup> sum_squared_shared : array<${F}, ${v}>;

      ${P.mainStart([v,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${v};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${v};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${v-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":z+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${x?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${fn(z,T,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${v};
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
        let mean = ${Ht("sum",T)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ht("square_sum",T)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${z}(mean)`}) *
            ${z}(inv_std_dev) * gamma[offset1d + i]
            ${p?"+ beta[offset1d + i]":""};
        }
      }`},A=[{dims:s,dataType:n[0].dataType}];return r>1&&A.push({dims:f,dataType:1}),r>2&&A.push({dims:f,dataType:1}),r>3&&A.push({dims:i,dataType:n[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${T};${g};${y};${x}`,inputDependencies:n.map((P,k)=>"type")},getShaderSource:I,getRunData:()=>({outputs:A,dispatchGroup:{x:Math.ceil(u/c)},programUniforms:w})}},q0=(n,e)=>{zO(n.inputs);let t=[0];n.outputCount>1&&t.push(-3),n.outputCount>2&&t.push(-3),n.outputCount>3&&t.push(3),n.compute(LO(n.inputs,e,n.outputCount,!1),{outputs:t})}});var MO,Ea,VO,j0,FO,UO,X0,Z0,J0=E(()=>{"use strict";ce();be();Ze();Te();MO=(n,e)=>{if(!n||n.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");n.slice(1).forEach((r,t)=>{if(n[t+1].dataType!==6&&n[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Ea=(n,e)=>{let r=[];if(n.length>e)if(n[e].dataType===7)n[e].getBigInt64Array().forEach(t=>r.push(Number(t)));else if(n[e].dataType===6)n[e].getInt32Array().forEach(t=>r.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},VO=(n,e)=>{if(n.length>1){let r=Ea(n,1),t=Ea(n,2),o=Ea(n,3);return o.length===0&&(o=[...Array(n[0].dims.length).keys()]),fe({starts:r,ends:t,axes:o})}else return e},j0=(n,e,r,t,o)=>{let i=n;return n<0&&(i+=r[t[e]]),o[e]<0?Math.max(0,Math.min(i,r[t[e]]-1)):Math.max(0,Math.min(i,r[t[e]]))},FO=(n,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${n.type.indices} {
          var input_indices: ${n.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
            let steps_i = ${Y("uniforms.steps","i",r.length)};
            let signs_i = ${Y("uniforms.signs","i",r.length)};
            let starts_i = ${Y("uniforms.starts","i",r.length)};
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
      }`,UO=(n,e)=>{let r=n[0].dims,t=D.size(r),o=e.axes.length>0?D.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Ea(n,4);i.forEach(T=>T!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=e.starts.map((T,w)=>j0(T,w,r,o,i)),s=e.ends.map((T,w)=>j0(T,w,r,o,i));if(o.length!==a.length||o.length!==s.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let T=0;T<r.length;++T)o.includes(T)||(a.splice(T,0,0),s.splice(T,0,r[T]),i.splice(T,0,1));let u=i.map(T=>Math.sign(T));i.forEach((T,w,I)=>{if(T<0){let A=(s[w]-a[w])/T,P=a[w],k=P+A*i[w];a[w]=k,s[w]=P,I[w]=-T}});let c=r.slice(0);o.forEach((T,w)=>{c[T]=Math.ceil((s[T]-a[T])/i[T])});let f={dims:c,dataType:n[0].dataType},p=G("output",n[0].dataType,c.length),m=B("input",n[0].dataType,n[0].dims.length),g=D.size(c),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],x=[{type:12,data:g},{type:12,data:a},{type:6,data:u},{type:12,data:i},...q(n[0].dims,c)],v=T=>`
      ${T.registerUniforms(y).declareVariables(m,p)}
        ${FO(m,p,r)}
        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${p.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${p.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:x})}},X0=(n,e)=>{MO(n.inputs,e);let r=VO(n.inputs,e);n.compute(UO(n.inputs,r),{inputs:[0]})},Z0=n=>{let e=n.starts,r=n.ends,t=n.axes;return fe({starts:e,ends:r,axes:t})}});var GO,WO,Y0,Q0,eT=E(()=>{"use strict";ce();be();Ze();yr();Te();GO=n=>{if(!n||n.length!==1)throw new Error("Softmax op requires 1 input.")},WO=(n,e)=>{let r=n.inputs[0],t=r.dims,o=D.size(t),i=t.length,a=D.normalizeAxis(e.axis,i),s=a<t.length-1,u,c=[];s?(c=Array.from({length:i},(R,z)=>z),c[a]=i-1,c[i-1]=a,u=n.compute(ut(r,c),{inputs:[r],outputs:[-1]})[0]):u=r;let f=u.dims,p=f[i-1],m=o/p,g=Ee(p),y=p/g,x=64;m===1&&(x=256);let v=(R,z)=>z===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:z===2?`max(${R}.x, ${R}.y)`:z===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,T=B("x",u.dataType,u.dims,g),w=G("result",u.dataType,u.dims,g),I=T.type.value,A=Ve(u.dataType)==="f32"?`var threadMax = ${I}(-3.402823e+38f);`:`var threadMax = ${I}(-65504.0h);`,P=R=>`
      var<workgroup> rowMaxShared : ${I};
      var<workgroup> rowSumShared : ${I};
      var<workgroup> threadShared : array<${I}, ${x}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${I} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${I}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables(T,w)}
      ${R.mainStart(x)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${x};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${A}
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
          rowMaxShared = ${I}(${v("threadShared[0]",g)});
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
          rowSumShared = ${I}(${Ht("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,k=n.compute({name:"Softmax",shaderCache:{hint:`${g};${x}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:u.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:P},{inputs:[u],outputs:[s?-1:0]})[0];s&&n.compute(ut(k,c),{inputs:[k]})},Y0=(n,e)=>{GO(n.inputs),WO(n,e)},Q0=n=>fe({axis:n.axis})});var tT,HO,qO,KO,rT,nT=E(()=>{"use strict";ce();be();Te();tT=n=>Array.from(n.getBigInt64Array(),Number),HO=n=>{if(!n||n.length!==2)throw new Error("Tile requires 2 inputs.");if(n[0].dataType!==1&&n[0].dataType!==10&&n[0].dataType!==6&&n[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(n[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(n[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(tT(n[1]).length!==n[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},qO=(n,e)=>{let r=[];for(let t=0;t<n.length;++t)r.push(n[t]*e[t]);return r},KO=(n,e)=>{let r=n[0].dims,t=e??tT(n[1]),o=qO(r,t),i=D.size(o),a=n[0].dataType,s=B("input",a,r.length),u=G("output",a,o.length),c=f=>`
      const inputShape = ${s.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(s,u)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${s.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${s.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${s.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",s.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:n[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...q(n[0].dims,o)]}),getShaderSource:c}},rT=n=>{HO(n.inputs),n.compute(KO(n.inputs),{inputs:[0]})}});var jO,XO,oT,iT=E(()=>{"use strict";ce();be();Te();jO=(n,e,r,t,o)=>{let i=G("output_data",o,r.length,4),a=B("a_data",e[1].dataType,e[1].dims.length,4),s=B("b_data",e[2].dataType,e[2].dims.length,4),u=B("c_data",e[0].dataType,e[0].dims.length,4),c,f=(p,m,g)=>`select(${m}, ${p}, ${g})`;if(!t)c=i.setByOffset("global_idx",f(a.getByOffset("global_idx"),s.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let p=(m,g,y="")=>{let x=`a_data[index_a${g}][component_a${g}]`,v=`b_data[index_b${g}][component_b${g}]`,T=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
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
            ${m}[${g}] = ${y}(${f(x,v,T)});
          `};o===9?c=`
            var data = vec4<u32>(0);
            ${p("data",0,"u32")}
            ${p("data",1,"u32")}
            ${p("data",2,"u32")}
            ${p("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${p("output_data[global_idx]",0)}
            ${p("output_data[global_idx]",1)}
            ${p("output_data[global_idx]",2)}
            ${p("output_data[global_idx]",3)}
          `}return`
        ${n.registerUniform("vec_size","u32").declareVariables(u,a,s,i)}
        ${n.mainStart()}
        ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},XO=n=>{let e=n[1].dims,r=n[2].dims,t=n[0].dims,o=n[1].dataType,i=!(D.areEqual(e,r)&&D.areEqual(r,t)),a=e,s=D.size(e);if(i){let c=ar.calcShape(ar.calcShape(e,r,!1),t,!1);if(!c)throw new Error("Can't perform where op on the given tensors");a=c,s=D.size(a)}let u=Math.ceil(s/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>jO(c,n,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(s/64/4)},programUniforms:[{type:12,data:u},...q(t,e,r,a)]})}},oT=n=>{n.compute(XO(n.inputs))}});var aT,sT=E(()=>{"use strict";Vy();xa();Gy();Hy();C_();F_();W_();ax();px();bx();_x();Ix();Ax();Px();kx();Nx();Lx();Fx();Wx();Kx();t0();o0();a0();u0();f0();Dl();p0();C0();D0();N0();L0();ya();G0();H0();K0();J0();eT();Nl();nT();yr();wa();iT();aT=new Map([["Abs",[qy]],["Acos",[Ky]],["Acosh",[jy]],["Add",[E_]],["ArgMax",[My,xl]],["ArgMin",[Ly,xl]],["Asin",[Xy]],["Asinh",[Zy]],["Atan",[Jy]],["Atanh",[Yy]],["Attention",[Fy]],["AveragePool",[T0,x0]],["BatchNormalization",[Uy]],["BiasAdd",[Wy]],["BiasSplitGelu",[P_]],["Cast",[e_,Qy]],["Ceil",[r_]],["Clip",[t_]],["Concat",[U_,G_]],["Conv",[Pl,Ol]],["ConvTranspose",[dx,cx]],["Cos",[n_]],["Cosh",[o_]],["CumSum",[mx,hx]],["DepthToSpace",[gx,yx]],["DequantizeLinear",[E0,k0]],["Div",[k_]],["Einsum",[wx,vx]],["Elu",[i_,zo]],["Equal",[D_]],["Erf",[a_]],["Exp",[s_]],["Expand",[$x]],["FastGelu",[Ox]],["Floor",[u_]],["FusedConv",[Pl,Ol]],["Gather",[Ex,Cx]],["GatherElements",[Vx,Mx]],["GatherBlockQuantized",[Rx,zx]],["GatherND",[Dx,Bx]],["Gelu",[l_]],["Gemm",[Gx,Ux]],["GlobalAveragePool",[I0,v0]],["GlobalMaxPool",[P0,O0]],["Greater",[z_]],["GreaterOrEqual",[M_]],["GridSample",[Hx,qx]],["GroupQueryAttention",[e0]],["HardSigmoid",[g_,b_]],["InstanceNormalization",[n0]],["LayerNormalization",[i0]],["LeakyRelu",[c_,zo]],["Less",[L_]],["LessOrEqual",[V_]],["Log",[$_]],["MatMul",[s0]],["MatMulNBits",[l0,c0]],["MaxPool",[$0,A0]],["Mul",[B_]],["MultiHeadAttention",[Zx,Xx]],["Neg",[d_]],["Not",[f_]],["Pad",[d0]],["Pow",[N_]],["QuickGelu",[A_,zo]],["Range",[B0]],["Reciprocal",[p_]],["ReduceMin",[ky]],["ReduceMean",[Ay]],["ReduceMax",[Ey]],["ReduceSum",[By]],["ReduceProd",[Dy]],["ReduceL1",[Oy]],["ReduceL2",[Py]],["ReduceLogSum",[Ry]],["ReduceLogSumExp",[Cy]],["ReduceSumSquare",[Ny]],["Relu",[m_]],["Resize",[F0,U0]],["RotaryEmbedding",[W0]],["ScatterND",[z0,R0]],["Sigmoid",[h_]],["Sin",[y_]],["Sinh",[__]],["Slice",[X0,Z0]],["SkipLayerNormalization",[q0]],["Split",[Jx,Yx]],["Sqrt",[x_]],["Softmax",[Y0,Q0]],["Sub",[R_]],["Tan",[T_]],["Tanh",[v_]],["ThresholdedRelu",[S_,zo]],["Tile",[rT]],["Transpose",[my,hy]],["Where",[oT]]])});var ka,uT=E(()=>{"use strict";pt();ir();Te();ka=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,r){this.repo.set(e,r)}run(e,r,t,o,i){St(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let f of r)u.push({binding:u.length,resource:{buffer:f.buffer}});for(let f of t)u.push({binding:u.length,resource:{buffer:f.buffer}});i&&u.push({binding:u.length,resource:i});let c=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:c,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}s.setPipeline(e.computePipeline),s.setBindGroup(0,c),s.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),gt(e.programInfo.name)}dispose(){}build(e,r){St(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(p=>{t.features.has(p.feature)&&o.push(`enable ${p.extension};`)});let a=dy(r,this.backend.device.limits),s=e.getShaderSource(a),u=`${o.join(`
`)}
${a.additionalImplementations}
${s}`,c=t.createShaderModule({code:u,label:e.name});we("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let f=t.createComputePipeline({compute:{module:c,entryPoint:"main"},layout:"auto",label:e.name});return gt(e.name),{programInfo:e,computePipeline:f,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let r=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&t<=i&&o<=i)return[r,t,o];let a=r*t*o,s=Math.ceil(Math.sqrt(a));if(s>i){if(s=Math.ceil(Math.cbrt(a)),s>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}});var ZO,JO,Rl,zl,Da,lT=E(()=>{"use strict";pt();ce();ir();ll();uy();sT();uT();ZO=(n,e)=>{if(e.length!==n.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${n.length}.`);let r=[];for(let t=0;t<n.length;++t){let o=n[t].dataType;switch(e[t]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=n[t].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=n[t].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return r.join("|")},JO=(n,e,r)=>{let t=n.name;return n.shaderCache?.hint&&(t+="["+n.shaderCache.hint+"]"),t+=":"+r+`:${ZO(e,n.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Rl=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},zl=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let r=e.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},Da=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,r){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=a=>r.features.has(a)&&t.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new zl(this.device),this.adapterInfo=new Rl(r.info||await r.requestAdapterInfo()),this.gpuDataManager=sy(this),this.programManager=new ka(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,da(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;St(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<r.length/2;o++){let i=t[o],a=i.kernelId,s=this.kernels.get(a),u=s.kernelType,c=s.kernelName,f=i.programName,p=i.inputTensorViews,m=i.outputTensorViews,g=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let x=Number(g-this.queryTimeBase),v=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(x)||!Number.isSafeInteger(v))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:p.map(T=>({dims:T.dims,dataType:Nr(T.dataType)})),outputsMetadata:m.map(T=>({dims:T.dims,dataType:Nr(T.dataType)})),kernelId:a,kernelType:u,kernelName:c,programName:f,startTime:x,endTime:v});else{let T="";p.forEach((I,A)=>{T+=`input[${A}]: [${I.dims}] | ${Nr(I.dataType)}, `});let w="";m.forEach((I,A)=>{w+=`output[${A}]: [${I.dims}] | ${Nr(I.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${c}|${f}" ${T}${w}execution time: ${v-x} ns`)}ni("GPU",`${f}::${g}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),gt()}run(e,r,t,o,i,a){St(e.name);let s=[];for(let I=0;I<r.length;++I){let A=r[I].data;if(A===0)continue;let P=this.gpuDataManager.get(A);if(!P)throw new Error(`no GPU data for input: ${A}`);s.push(P)}let{outputs:u,dispatchGroup:c,programUniforms:f}=e.getRunData(r),p=t.length===0?u.map((I,A)=>A):t;if(p.length!==u.length)throw new Error(`Output size ${p.length} must be equal to ${u.length}.`);let m=[],g=[];for(let I=0;I<u.length;++I){if(!Number.isInteger(p[I])||p[I]<-3||p[I]>=a)throw new Error(`Invalid output index: ${p[I]}`);if(p[I]===-3)continue;let A=p[I]===-1,P=p[I]===-2,k=A||P?i(u[I].dataType,u[I].dims):o(p[I],u[I].dataType,u[I].dims);if(m.push(k),k.data===0)continue;let R=this.gpuDataManager.get(k.data);if(!R)throw new Error(`no GPU data for output: ${k.data}`);if(A&&this.temporaryData.push(R),P){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(R)}g.push(R)}if(s.length!==r.length||g.length!==m.length){if(g.length===0)return gt(e.name),m;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(f){let I=0,A=[];f.forEach(z=>{let F=typeof z.data=="number"?[z.data]:z.data;if(F.length===0)return;let X=z.type===10?2:4,Q,de;z.type===10?(de=F.length>4?16:F.length>2?8:F.length*X,Q=F.length>4?16:X*F.length):(de=F.length<=2?F.length*X:16,Q=16),I=Math.ceil(I/de)*de,A.push(I);let W=z.type===10?8:4;I+=F.length>4?Math.ceil(F.length/W)*Q:F.length*X});let P=16;I=Math.ceil(I/P)*P;let k=new ArrayBuffer(I);f.forEach((z,F)=>{let X=A[F],Q=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(k,X,Q.length).set(Q);else if(z.type===12)new Uint32Array(k,X,Q.length).set(Q);else if(z.type===10)new Uint16Array(k,X,Q.length).set(Q);else if(z.type===1)new Float32Array(k,X,Q.length).set(Q);else throw new Error(`Unsupported uniform type: ${Nr(z.type)}`)});let R=this.gpuDataManager.create(I,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(R.buffer,0,k,0,I),this.gpuDataManager.release(R.id),y={offset:0,size:I,buffer:R.buffer}}let x=this.programManager.normalizeDispatchGroupSize(c),v=x[1]===1&&x[2]===1,T=JO(e,r,v),w=this.programManager.getArtifact(T);if(w||(w=this.programManager.build(e,x),this.programManager.setArtifact(T,w),we("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),f&&w.uniformVariablesInfo){if(f.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${f.length} in program "${w.programInfo.name}".`);for(let I=0;I<f.length;I++){let A=f[I],P=A.type,k=typeof A.data=="number"?1:A.data.length,[R,z]=w.uniformVariablesInfo[I];if(P!==R||k!==z)throw new Error(`Uniform variable ${I} mismatch: expect type ${R} with size ${z}, got type ${P} with size ${k} in program "${w.programInfo.name}".`)}}if(we("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${x[0]}x${x[1]}x${x[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let I={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:r,outputTensorViews:m};this.pendingKernels.push(I),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(I)}return this.programManager.run(w,s,g,x,y),gt(e.name),m}upload(e,r){this.gpuDataManager.upload(e,r)}memcpy(e,r){this.gpuDataManager.memcpy(e,r)}async download(e,r){await this.gpuDataManager.download(e,r)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,r,t,o){let i=aT.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(r,a)}releaseKernel(e){let r=this.kernelPersistentData.get(e);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,r,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,a=o.kernelName,s=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),we("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let c=this.env.debug;this.temporaryData=[];try{return c&&this.device.pushErrorScope("validation"),s(r,u[1]),0}catch(f){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${f}`)),1}finally{c&&t.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${i}] ${a}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,r,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let a=i.get(r),s=this.gpuDataManager.registerExternalBuffer(t,o,a);return i.set(r,[s,t]),s}unregisterBuffers(e){let r=this.sessionExternalDataMapping.get(e);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let r=this.gpuDataManager.get(e);if(!r)throw new Error(`no GPU data for buffer: ${e}`);return r.buffer}createDownloader(e,r,t){return async()=>{let o=await pl(this,e,r);return pa(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){we("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){we("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){we("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),a=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});function Ml(n,e=!0){if(n.byteLength%8!==0)throw new Error("Invalid Uint8Array length, must be a multiple of 8 (BigInt).");let r=n.byteLength/8,t=new BigInt64Array(n.buffer,n.byteOffset,r),o=new Int32Array(r);for(let i=0;i<r;i++){let a=t[i];if(a>2147483647n||a<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${i}: ${a}`);o[i]=Number(a)}return e?new Uint8Array(o.buffer):o}function pT(n){if(n.byteLength%4!==0)throw new Error("Invalid Uint8Array length, must be a multiple of 4 (Int32).");let e=n.byteLength/4,r=new Int32Array(n.buffer,n.byteOffset,e),t=BigInt64Array.from(r,BigInt);return new Uint8Array(t.buffer)}var YO,cT,QO,fT,Ba,Na,Ll,dT,mT=E(()=>{"use strict";ir();YO=1,cT=()=>YO++,QO=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),fT=(n,e)=>{let r=QO.get(n);if(!r)throw new Error("Unsupported data type.");return e.length>0?Math.ceil(e.reduce((t,o)=>t*o)*r/8):0},Ba=class{constructor(e){this.shouldConvertInt64toInt32=!1;this.isInt64ToInt32Converted=!1;let{sessionId:r,context:t,tensor:o,dataType:i,shape:a,shouldConvertInt64toInt32:s=!1}=e;this.sessionId=r,this.mlContext=t,this.mlTensor=o,this.dataType=i,this.tensorShape=a,this.shouldConvertInt64toInt32=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return fT(this.dataType,this.tensorShape)}destroy(){we("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e,r){if(e){let t=await this.mlContext.readTensor(this.mlTensor),o=pT(new Uint8Array(t));if(r){(r instanceof ArrayBuffer?new Uint8Array(r):new Uint8Array(r.buffer,r.byteOffset,r.byteLength)).set(o);return}else return o.buffer}else return r?await this.mlContext.readTensor(this.mlTensor,r):await this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,r,t){return this.mlContext===e&&this.dataType===r&&this.tensorShape.length===t.length&&this.tensorShape.every((o,i)=>o===t[i])}setIsInt64ToInt32Converted(e){this.isInt64ToInt32Converted=e}},Na=class{constructor(e,r){this.tensorManager=e;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,r,t,o){let i=this.tensorManager.getMLContext(e),a=r==="int64"&&!i.opSupportLimits().input.dataTypes.includes("int64");if(a&&(r="int32",we("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(i,r,t))return this.wrapper.tensor;if(o){if(this.wrapper.byteLength!==fT(r,t))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,r,t,s,!0,!0,a),o&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper){if(this.wrapper.shouldConvertInt64toInt32){let r=Ml(e,!0);this.wrapper.setIsInt64ToInt32Converted(!0),e=r instanceof Int32Array?new Uint8Array(r.buffer):r}if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else we("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload){let r=this.wrapper?.isInt64ToInt32Converted?pT(this.activeUpload):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,e):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},Ll=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}getMLContext(e){let r=this.backend.getMLContext(e);if(!r)throw new Error("MLContext not found for session.");return r}reserveTensorId(){let e=cT();return this.tensorTrackersById.set(e,new Na(this)),e}releaseTensorId(e){let r=this.tensorTrackersById.get(e);r&&(this.tensorTrackersById.delete(e),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(e,r,t,o,i){we("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${t}, shape: ${o}, copyOld: ${i}}`);let a=this.tensorTrackersById.get(r);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,t,o,i)}upload(e,r){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(r)}async download(e,r){we("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${r?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(r)}releaseTensorsForSession(e){for(let r of this.freeTensors)r.sessionId===e&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==e)}registerTensor(e,r,t,o){let i=this.getMLContext(e),a=cT(),s=new Ba({sessionId:e,context:i,tensor:r,dataType:t,shape:o});return this.tensorTrackersById.set(a,new Na(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,r,t,o,i,a,s=!1){let u=this.getMLContext(e);for(let[f,p]of this.freeTensors.entries())if(p.canReuseTensor(u,r,t)){we("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, shape: ${t}}`);let m=this.freeTensors.splice(f,1)[0];return m.sessionId=e,m}we("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, shape: ${t}}`);let c=await u.createTensor({dataType:r,shape:t,dimensions:t,usage:o,writable:i,readable:a});return new Ba({sessionId:e,context:u,tensor:c,dataType:r,shape:t,shouldConvertInt64toInt32:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},dT=(...n)=>new Ll(...n)});var Vl,e3,Ra,hT=E(()=>{"use strict";ce();Br();ll();mT();ir();Vl=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),e3=(n,e)=>{if(n===e)return!0;if(n===void 0||e===void 0)return!1;let r=Object.keys(n).sort(),t=Object.keys(e).sort();return r.length===t.length&&r.every((o,i)=>o===t[i]&&n[o]===e[o])},Ra=class{constructor(e){this.tensorManager=dT(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];this.sessionGraphInputs=new Map;this.temporaryGraphInputs=[];this.temporarySessionTensorIds=new Map;da(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){we("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){we("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let r=this.temporarySessionTensorIds.get(e);if(r){for(let t of r)we("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(t=>e3(t.options,e));if(r!==-1)return this.mlContextCache[r].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}registerMLContext(e,r){this.mlContextBySessionId.set(e,r);let t=this.sessionIdsByMLContext.get(r);t||(t=new Set,this.sessionIdsByMLContext.set(r,t)),t.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let r=this.mlContextBySessionId.get(e);if(!r)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(r);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){we("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,r,t,o,i){let a=Vl.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,r,a,o,i)}async createTemporaryTensor(e,r,t){we("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${t}}`);let o=Vl.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,o,t,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,r){if(!Je().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");we("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${r.byteLength}}`),this.tensorManager.upload(e,r)}async downloadTensor(e,r){return this.tensorManager.download(e,r)}createMLTensorDownloader(e,r){return async()=>{let t=await this.tensorManager.download(e);return pa(t,r)}}registerMLTensor(e,r,t,o){let i=Vl.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.registerTensor(e,r,i,o);return we("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${i}, dimensions: ${o}} -> {tensorId: ${a}}`),a}registerMLConstant(e,r,t,o,i,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let c=a.get(u);if(!c)throw new Error(`File with name ${u} not found in preloaded files.`);if(r+t>c.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let f=c.slice(r,r+t).buffer,p;switch(i.dataType){case"float32":p=new Float32Array(f);break;case"float16":p=new Uint16Array(f);break;case"int32":p=new Int32Array(f);break;case"uint32":p=new Uint32Array(f);break;case"int64":s?(p=Ml(new Uint8Array(f),!1),i.dataType="int32"):p=new BigInt64Array(f);break;case"uint64":p=new BigUint64Array(f);break;case"int8":p=new Int8Array(f);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(f);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return we("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),o.constant(i,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,r){let t=this.sessionGraphInputs.get(e);return t?t.includes(r):!1}isInt64Supported(e){return!!this.mlContextBySessionId.get(e)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}});var bT={};gn(bT,{init:()=>t3});var Fo,Fl,t3,gT=E(()=>{"use strict";ce();lT();ir();be();hT();Fo=class n{constructor(e,r,t,o){this.module=e;this.dataType=r;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=D.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(D.size(e)!==D.size(this.dims))throw new Error("Invalid new shape");return new n(this.module,this.dataType,this.data,e)}},Fl=class{constructor(e,r,t){this.module=e;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,a));let s=Number(e.getValue(o*i++,a));this.outputCount=Number(e.getValue(o*i++,a)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,a));let u=[];for(let c=0;c<s;c++){let f=Number(e.getValue(o*i++,a)),p=Number(e.getValue(o*i++,"*")),m=Number(e.getValue(o*i++,a)),g=[];for(let y=0;y<m;y++)g.push(Number(e.getValue(o*i++,a)));u.push(new Fo(e,f,p,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,r){let t=r?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,o=r?.outputs??[],i=(s,u,c)=>new Fo(this.module,u,this.output(s,c),c),a=(s,u)=>{let c=Rr(s,u);if(!c)throw new Error(`Unsupported data type: ${s}`);let f=c>0?this.backend.gpuDataManager.create(c).id:0;return new Fo(this.module,s,f,u)};return this.backend.run(e,t,o,i,a,this.outputCount)}output(e,r){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let s=0;s<r.length;s++)this.module.setValue(a+o*(s+1),r[s],i);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},t3=async(n,e,r,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(n==="webgpu"){let i=new Da;await i.initialize(r,t),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,s,u,c=!1)=>{if(c)we("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(s)}, size=${Number(u)}`),i.memcpy(Number(a),Number(s));else{we("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(s)}, size=${Number(u)}`);let f=e.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(u));i.upload(Number(s),f)}},async(a,s,u)=>{we("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${s}, size=${u}`),await i.download(Number(a),()=>e.HEAPU8.subarray(Number(s)>>>0,Number(s+u)>>>0))},(a,s,u)=>i.createKernel(a,Number(s),u,e.UTF8ToString(e._JsepGetNodeName(Number(s)))),a=>i.releaseKernel(a),(a,s,u,c)=>{we("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${a}, contextDataOffset=${s}`);let f=new Fl(e,i,Number(s));return i.computeKernel(Number(a),f,c)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new Ra(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,s,u,c,f)=>i.ensureTensor(a,s,u,c,f),(a,s)=>{i.uploadTensor(a,s)},async(a,s)=>i.downloadTensor(a,s)])}}});var r3,ea,ta,dn,n3,Do,ra,na,yT,oa,ia,aa,rl=E(()=>{"use strict";Qg();ty();ce();Br();ua();ul();r3=(n,e)=>{Je()._OrtInit(n,e)!==0&&Pe("Can't initialize onnxruntime.")},ea=async n=>{r3(n.wasm.numThreads,No(n.logLevel))},ta=async(n,e)=>{{let r=(gT(),qn(bT)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=n.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=n.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=n.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Je(),n,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Je(),n)}}},dn=new Map,n3=n=>{let e=Je(),r=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(n,o,o+t)!==0&&Pe("Can't get session input/output count.");let a=t===4?"i32":"i64";return[Number(e.getValue(o,a)),Number(e.getValue(o+t,a))]}finally{e.stackRestore(r)}},Do=n=>{let e=Je(),r=e._malloc(n.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${n.byteLength}.`);return e.HEAPU8.set(n,r),[r,n.byteLength]},ra=async(n,e)=>{let r,t,o=Je();Array.isArray(n)?[r,t]=n:n.buffer===o.HEAPU8.buffer?[r,t]=[n.byteOffset,n.byteLength]:[r,t]=Do(n);let i=0,a=0,s=0,u=[],c=[],f=[];try{if([a,u]=ey(e),e?.externalData&&o.mountExternalData){let w=[];for(let I of e.externalData){let A=typeof I=="string"?I:I.path;w.push(Ro(typeof I=="string"?I:I.data).then(P=>{o.mountExternalData(A,P)}))}await Promise.all(w)}for(let w of e?.executionProviders??[])if((typeof w=="string"?w:w.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,typeof w!="string"){let A=w,P=A?.context,k=A?.gpuDevice,R=A?.deviceType,z=A?.powerPreference;P?o.currentContext=P:k?o.currentContext=await o.jsepCreateMLContext(k):o.currentContext=await o.jsepCreateMLContext({deviceType:R,powerPreference:z})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,t,a),i===0&&Pe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[p,m]=n3(i),g=!!e?.enableGraphCapture,y=[],x=[],v=[];for(let w=0;w<p;w++){let I=o._OrtGetInputName(i,w);I===0&&Pe("Can't get an input name."),c.push(I),y.push(o.UTF8ToString(I))}for(let w=0;w<m;w++){let I=o._OrtGetOutputName(i,w);I===0&&Pe("Can't get an output name."),f.push(I);let A=o.UTF8ToString(I);x.push(A);{if(g&&e?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let P=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[A]??"cpu";if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(g&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(P)}}let T=null;return v.some(w=>w==="gpu-buffer"||w==="ml-tensor")&&(s=o._OrtCreateBinding(i),s===0&&Pe("Can't create IO binding."),T={handle:s,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(w=>sl(w))}),dn.set(i,[i,c,f,T,g,!1]),[i,y,x]}catch(p){throw c.forEach(m=>o._OrtFree(m)),f.forEach(m=>o._OrtFree(m)),s!==0&&o._OrtReleaseBinding(s)!==0&&Pe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&Pe("Can't release session."),p}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&Pe("Can't release session options."),u.forEach(p=>o._free(p)),o.unmountExternalData?.()}},na=n=>{let e=Je(),r=dn.get(n);if(!r)throw new Error(`cannot release session. invalid session id: ${n}`);let[t,o,i,a,s]=r;a&&(s&&e._OrtClearBoundOutputs(a.handle)!==0&&Pe("Can't clear bound outputs."),e._OrtReleaseBinding(a.handle)!==0&&Pe("Can't release IO binding.")),e.jsepOnReleaseSession?.(n),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&Pe("Can't release session."),dn.delete(n)},yT=async(n,e,r,t,o,i=!1)=>{if(!n){e.push(0);return}let a=Je(),s=a.PTR_SIZE,u=n[0],c=n[1],f=n[3],p=f,m,g;if(u==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=n[2].gpuBuffer;g=Rr(Nn(u),c);let T=a.jsepRegisterBuffer;if(!T)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');m=T(t,o,v,g)}else if(f==="ml-tensor"){let v=n[2].mlTensor;g=Rr(Nn(u),c);let T=a.jsepRegisterMLTensor;if(!T)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');m=T(t,v,Nn(u),c)}else{let v=n[2];if(Array.isArray(v)){g=s*v.length,m=a._malloc(g),r.push(m);for(let T=0;T<v.length;T++){if(typeof v[T]!="string")throw new TypeError(`tensor data at index ${T} is not a string`);a.setValue(m+T*s,at(v[T],r),"*")}}else{let T=a.jsepIsGraphInput;if(u!=="string"&&T){let w=a._OrtGetInputName(t,o),I=a.UTF8ToString(w);if(T(t,I)){let A=Nn(u);g=Rr(A,c),p="ml-tensor";let P=a.jsepCreateTemporaryTensor,k=a.jsepUploadTensor;if(!P||!k)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let R=await P(t,A,c);k(R,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),m=R}else g=v.byteLength,m=a._malloc(g),r.push(m),a.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,g),m)}else g=v.byteLength,m=a._malloc(g),r.push(m),a.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,g),m)}}let y=a.stackSave(),x=a.stackAlloc(4*c.length);try{c.forEach((T,w)=>a.setValue(x+w*s,T,s===4?"i32":"i64"));let v=a._OrtCreateTensor(Nn(u),m,g,x,c.length,sl(p));v===0&&Pe(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(v)}finally{a.stackRestore(y)}},oa=async(n,e,r,t,o,i)=>{let a=Je(),s=a.PTR_SIZE,u=dn.get(n);if(!u)throw new Error(`cannot run inference. invalid session id: ${n}`);let c=u[0],f=u[1],p=u[2],m=u[3],g=u[4],y=u[5],x=e.length,v=t.length,T=0,w=[],I=[],A=[],P=[],k=a.stackSave(),R=a.stackAlloc(x*s),z=a.stackAlloc(x*s),F=a.stackAlloc(v*s),X=a.stackAlloc(v*s);try{[T,w]=Yg(i);for(let W=0;W<x;W++)await yT(r[W],I,P,n,e[W],g);for(let W=0;W<v;W++)await yT(o[W],A,P,n,x+t[W],g);for(let W=0;W<x;W++)a.setValue(R+W*s,I[W],"*"),a.setValue(z+W*s,f[e[W]],"*");for(let W=0;W<v;W++)a.setValue(F+W*s,A[W],"*"),a.setValue(X+W*s,p[t[W]],"*");if(m&&!y){let{handle:W,outputPreferredLocations:se,outputPreferredLocationsEncoded:Fe}=m;if(f.length!==x)throw new Error(`input count from feeds (${x}) is expected to be always equal to model's input count (${f.length}).`);for(let te=0;te<x;te++){let le=e[te];await a._OrtBindInput(W,f[le],I[te])!==0&&Pe(`Can't bind input[${te}] for session=${n}.`)}for(let te=0;te<v;te++){let le=t[te];o[te]?.[3]?a._OrtBindOutput(W,p[le],A[te],0)!==0&&Pe(`Can't bind pre-allocated output[${te}] for session=${n}.`):a._OrtBindOutput(W,p[le],0,Fe[le])!==0&&Pe(`Can't bind output[${te}] to ${se[te]} for session=${n}.`)}dn.set(n,[c,f,p,m,g,!0])}a.jsepOnRunStart?.(c);let Q;m?Q=await a._OrtRunWithBinding(c,m.handle,v,F,T):Q=await a._OrtRun(c,z,R,x,X,v,F,T),Q!==0&&Pe("failed to call OrtRun().");let de=[];for(let W=0;W<v;W++){let se=Number(a.getValue(F+W*s,"*"));if(se===A[W]){de.push(o[W]);continue}let Fe=a.stackSave(),te=a.stackAlloc(4*s),le=!1,ge,ee=0;try{a._OrtGetTensorData(se,te,te+s,te+2*s,te+3*s)!==0&&Pe(`Can't access output tensor data on index ${W}.`);let rt=s===4?"i32":"i64",Ke=Number(a.getValue(te,rt));ee=a.getValue(te+s,"*");let L=a.getValue(te+s*2,"*"),V=Number(a.getValue(te+s*3,rt)),re=[];for(let Ge=0;Ge<V;Ge++)re.push(Number(a.getValue(L+Ge*s,rt)));a._OrtFree(L)!==0&&Pe("Can't free memory for tensor dims.");let Ae=re.reduce((Ge,Ce)=>Ge*Ce,1);ge=Nr(Ke);let zt=m?.outputPreferredLocations[t[W]];if(ge==="string"){if(zt==="gpu-buffer"||zt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Ge=[];for(let Ce=0;Ce<Ae;Ce++){let dr=a.getValue(ee+Ce*s,"*"),Mr=a.getValue(ee+(Ce+1)*s,"*"),Vr=Ce===Ae-1?void 0:Mr-dr;Ge.push(a.UTF8ToString(dr,Vr))}de.push([ge,re,Ge,"cpu"])}else if(zt==="gpu-buffer"&&Ae>0){let Ge=a.jsepGetBuffer;if(!Ge)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Ce=Ge(ee),dr=Rr(Ke,Ae);if(dr===void 0||!ca(ge))throw new Error(`Unsupported data type: ${ge}`);le=!0,de.push([ge,re,{gpuBuffer:Ce,download:a.jsepCreateDownloader(Ce,dr,ge),dispose:()=>{a._OrtReleaseTensor(se)!==0&&Pe("Can't release tensor.")}},"gpu-buffer"])}else if(zt==="ml-tensor"&&Ae>0){let Ge=a.jsepEnsureTensor,Ce=a.jsepIsInt64Supported;if(!Ge||!Ce)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Rr(Ke,Ae)===void 0||!fa(ge))throw new Error(`Unsupported data type: ${ge}`);if(ge==="int64"&&!Ce(n))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let Mr=await Ge(n,ee,Ke,re,!1);le=!0,de.push([ge,re,{mlTensor:Mr,download:a.jsepCreateMLTensorDownloader(ee,ge),dispose:()=>{a.jsepReleaseTensorId(ee),a._OrtReleaseTensor(se)}},"ml-tensor"])}else{let Ge=la(ge),Ce=new Ge(Ae);new Uint8Array(Ce.buffer,Ce.byteOffset,Ce.byteLength).set(a.HEAPU8.subarray(ee,ee+Ce.byteLength)),de.push([ge,re,Ce,"cpu"])}}finally{a.stackRestore(Fe),ge==="string"&&ee&&a._free(ee),le||a._OrtReleaseTensor(se),a.jsepOnRunEnd?.(c)}}return m&&!g&&(a._OrtClearBoundOutputs(m.handle)!==0&&Pe("Can't clear bound outputs."),dn.set(n,[c,f,p,m,g,!1])),de}finally{a.stackRestore(k),I.forEach(Q=>a._OrtReleaseTensor(Q)),A.forEach(Q=>a._OrtReleaseTensor(Q)),P.forEach(Q=>a._free(Q)),T!==0&&a._OrtReleaseRunOptions(T),w.forEach(Q=>a._free(Q))}},ia=n=>{let e=Je(),r=dn.get(n);if(!r)throw new Error("invalid session id");let t=r[0],o=e._OrtEndProfiling(t);o===0&&Pe("Can't get an profile file name."),e._OrtFree(o)},aa=n=>{let e=[];for(let r of n){let t=r[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var pn,Rt,Uo,La,Ma,za,Ul,Gl,Mn,Vn,i3,_T,xT,TT,wT,vT,IT,ST,Wl=E(()=>{"use strict";pt();rl();Br();Yi();pn=()=>!!he.wasm.proxy&&typeof document<"u",Uo=!1,La=!1,Ma=!1,Gl=new Map,Mn=(n,e)=>{let r=Gl.get(n);r?r.push(e):Gl.set(n,[e])},Vn=()=>{if(Uo||!La||Ma||!Rt)throw new Error("worker not ready")},i3=n=>{switch(n.data.type){case"init-wasm":Uo=!1,n.data.err?(Ma=!0,Ul[1](n.data.err)):(La=!0,Ul[0]()),za&&(URL.revokeObjectURL(za),za=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=Gl.get(n.data.type);n.data.err?e.shift()[1](n.data.err):e.shift()[0](n.data.out);break}default:}},_T=async()=>{if(!La){if(Uo)throw new Error("multiple calls to 'initWasm()' detected.");if(Ma)throw new Error("previous call to 'initWasm()' failed.");if(Uo=!0,pn())return new Promise((n,e)=>{Rt?.terminate(),Xg().then(([r,t])=>{try{Rt=t,Rt.onerror=i=>e(i),Rt.onmessage=i3,Ul=[n,e];let o={type:"init-wasm",in:he};!o.in.wasm.wasmPaths&&(r||import.meta.url?.startsWith("file:"))&&(o.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Rt.postMessage(o),za=r}catch(o){e(o)}},e)});try{await Qi(he.wasm),await ea(he),La=!0}catch(n){throw Ma=!0,n}finally{Uo=!1}}},xT=async n=>{if(pn())return Vn(),new Promise((e,r)=>{Mn("init-ep",[e,r]);let t={type:"init-ep",in:{epName:n,env:he}};Rt.postMessage(t)});await ta(he,n)},TT=async n=>pn()?(Vn(),new Promise((e,r)=>{Mn("copy-from",[e,r]);let t={type:"copy-from",in:{buffer:n}};Rt.postMessage(t,[n.buffer])})):Do(n),wT=async(n,e)=>{if(pn()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Vn(),new Promise((r,t)=>{Mn("create",[r,t]);let o={type:"create",in:{model:n,options:{...e}}},i=[];n instanceof Uint8Array&&i.push(n.buffer),Rt.postMessage(o,i)})}else return ra(n,e)},vT=async n=>{if(pn())return Vn(),new Promise((e,r)=>{Mn("release",[e,r]);let t={type:"release",in:n};Rt.postMessage(t)});na(n)},IT=async(n,e,r,t,o,i)=>{if(pn()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Vn(),new Promise((a,s)=>{Mn("run",[a,s]);let u=r,c={type:"run",in:{sessionId:n,inputIndices:e,inputs:u,outputIndices:t,options:i}};Rt.postMessage(c,aa(u))})}else return oa(n,e,r,t,o,i)},ST=async n=>{if(pn())return Vn(),new Promise((e,r)=>{Mn("end-profiling",[e,r]);let t={type:"end-profiling",in:n};Rt.postMessage(t)});ia(n)}});var $T,a3,Va,AT=E(()=>{"use strict";pt();Wl();ce();Ji();ul();$T=(n,e)=>{switch(n.location){case"cpu":return[n.type,n.dims,n.data,"cpu"];case"gpu-buffer":return[n.type,n.dims,{gpuBuffer:n.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[n.type,n.dims,{mlTensor:n.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${n.location} for ${e()}`)}},a3=n=>{switch(n[3]){case"cpu":return new It(n[0],n[2],n[1]);case"gpu-buffer":{let e=n[0];if(!ca(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:t,dispose:o}=n[2];return It.fromGpuBuffer(r,{dataType:e,dims:n[1],download:t,dispose:o})}case"ml-tensor":{let e=n[0];if(!fa(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:r,download:t,dispose:o}=n[2];return It.fromMLTensor(r,{dataType:e,dims:n[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${n[3]}`)}},Va=class{async fetchModelAndCopyToWasmMemory(e){return TT(await Ro(e))}async loadModel(e,r){St();let t;typeof e=="string"?t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await wT(t,r),gt()}async dispose(){return vT(this.sessionId)}async run(e,r,t){St();let o=[],i=[];Object.entries(e).forEach(m=>{let g=m[0],y=m[1],x=this.inputNames.indexOf(g);if(x===-1)throw new Error(`invalid input '${g}'`);o.push(y),i.push(x)});let a=[],s=[];Object.entries(r).forEach(m=>{let g=m[0],y=m[1],x=this.outputNames.indexOf(g);if(x===-1)throw new Error(`invalid output '${g}'`);a.push(y),s.push(x)});let u=o.map((m,g)=>$T(m,()=>`input "${this.inputNames[i[g]]}"`)),c=a.map((m,g)=>m?$T(m,()=>`output "${this.outputNames[s[g]]}"`):null),f=await IT(this.sessionId,i,u,s,c,t),p={};for(let m=0;m<f.length;m++)p[this.outputNames[s[m]]]=a[m]??a3(f[m]);return gt(),p}startProfiling(){}endProfiling(){ST(this.sessionId)}}});var PT={};gn(PT,{OnnxruntimeWebAssemblyBackend:()=>Fa,initializeFlags:()=>OT,wasmBackend:()=>s3});var OT,Fa,s3,CT=E(()=>{"use strict";pt();Wl();AT();OT=()=>{if((typeof he.wasm.initTimeout!="number"||he.wasm.initTimeout<0)&&(he.wasm.initTimeout=0),he.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof he.wasm.proxy!="boolean"&&(he.wasm.proxy=!1),typeof he.wasm.trace!="boolean"&&(he.wasm.trace=!1),typeof he.wasm.numThreads!="number"||!Number.isInteger(he.wasm.numThreads)||he.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)he.wasm.numThreads=1;else{let n=typeof navigator>"u"?fs("node:os").cpus().length:navigator.hardwareConcurrency;he.wasm.numThreads=Math.min(4,Math.ceil((n||1)/2))}},Fa=class{async init(e){OT(),await _T(),await xT(e)}async createInferenceSessionHandler(e,r){let t=new Va;return await t.loadModel(e,r),Promise.resolve(t)}},s3=new Fa});pt();pt();pt();var Ad="1.22.0";var yq=gs;{let n=(Rg(),qn(Ng)).onnxjsBackend;Sr("webgl",n,-10)}{let n=(CT(),qn(PT)).wasmBackend;Sr("webgpu",n,5),Sr("webnn",n,5),Sr("cpu",n,10),Sr("wasm",n,10)}Object.defineProperty(he.versions,"web",{value:Ad,enumerable:!0});export{t2 as InferenceSession,ni as TRACE,St as TRACE_FUNC_BEGIN,gt as TRACE_FUNC_END,It as Tensor,yq as default,he as env,Sr as registerBackend};
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
//# sourceMappingURL=ort.all.bundle.min.mjs.map
