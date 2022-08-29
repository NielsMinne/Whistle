var uf=/([:*])(\w+)/g,lf="([^/]+)",hf=/\*/g,df="?(?:.*)",ff=/\/\?/g,pf="/?([^/]+|)",gf="(?:/^|^)",mf="";function $a(t){return t===void 0&&(t="/"),ti()?location.pathname+location.search+location.hash:t}function W(t){return t.replace(/\/+$/,"").replace(/^\/+/,"")}function mr(t){return typeof t=="string"}function yf(t){return typeof t=="function"}function yr(t){return t&&t.indexOf("#")>=0&&t.split("#").pop()||""}function vf(t,e){return e.length===0||!t?null:t.slice(1,t.length).reduce(function(n,r,s){return n===null&&(n={}),n[e[s]]=decodeURIComponent(r),n},null)}function vr(t){var e=W(t).split(/\?(.*)?$/);return[W(e[0]),e.slice(1).join("")]}function ei(t){for(var e={},n=t.split("&"),r=0;r<n.length;r++){var s=n[r].split("=");if(s[0]!==""){var i=decodeURIComponent(s[0]);e[i]?(Array.isArray(e[i])||(e[i]=[e[i]]),e[i].push(decodeURIComponent(s[1]||""))):e[i]=decodeURIComponent(s[1]||"")}}return e}function Va(t,e){var n=vr(W(t.currentLocationPath)),r=n[0],s=n[1],i=s===""?null:ei(s),o=[],a;if(mr(e.path)){if(a=gf+W(e.path).replace(uf,function(h,d,f){return o.push(f),lf}).replace(hf,df).replace(ff,pf)+"$",W(e.path)===""&&W(r)==="")return{url:r,queryString:s,hashString:yr(t.to),route:e,data:null,params:i}}else a=e.path;var c=new RegExp(a,mf),u=r.match(c);if(u){var l=mr(e.path)?vf(u,o):u.groups?u.groups:u.slice(1);return{url:W(r.replace(new RegExp("^"+t.instance.root),"")),queryString:s,hashString:yr(t.to),route:e,data:l,params:i}}return!1}function ja(){return!!(typeof window!="undefined"&&window.history&&window.history.pushState)}function ot(t,e){return typeof t[e]=="undefined"||t[e]===!0}function wf(t){if(!t)return{};var e=t.split(","),n={},r;return e.forEach(function(s){var i=s.split(":").map(function(o){return o.replace(/(^ +| +$)/g,"")});switch(i[0]){case"historyAPIMethod":n.historyAPIMethod=i[1];break;case"resolveOptionsStrategy":r||(r={}),r.strategy=i[1];break;case"resolveOptionsHash":r||(r={}),r.hash=i[1]==="true";break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":n[i[0]]=i[1]==="true";break}}),r&&(n.resolveOptions=r),n}function ti(){return typeof window!="undefined"}function Ef(t,e){return t===void 0&&(t=[]),e===void 0&&(e={}),t.filter(function(n){return n}).forEach(function(n){["before","after","already","leave"].forEach(function(r){n[r]&&(e[r]||(e[r]=[]),e[r].push(n[r]))})}),e}function Oe(t,e,n){var r=e||{},s=0;(function i(){if(!t[s]){n&&n(r);return}Array.isArray(t[s])?(t.splice.apply(t,[s,1].concat(t[s][0](r)?t[s][1]:t[s][2])),i()):t[s](r,function(o){typeof o=="undefined"||o===!0?(s+=1,i()):n&&n(r)})})()}Oe.if=function(t,e,n){return Array.isArray(e)||(e=[e]),Array.isArray(n)||(n=[n]),[t,e,n]};function Ba(t,e){typeof t.currentLocationPath=="undefined"&&(t.currentLocationPath=t.to=$a(t.instance.root)),t.currentLocationPath=t.instance._checkForAHash(t.currentLocationPath),e()}function ni(t,e){for(var n=0;n<t.instance.routes.length;n++){var r=t.instance.routes[n],s=Va(t,r);if(s&&(t.matches||(t.matches=[]),t.matches.push(s),t.resolveOptions.strategy==="ONE")){e();return}}e()}function _f(t,e){t.navigateOptions&&(typeof t.navigateOptions.shouldResolve!="undefined"&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),typeof t.navigateOptions.silent!="undefined"&&console.warn('"silent" is deprecated. Please check the documentation.')),e()}function Tf(t,e){t.navigateOptions.force===!0?(t.instance._setCurrent([t.instance._pathToMatchObject(t.to)]),e(!1)):e()}var qa=ti(),bf=ja();function If(t,e){if(ot(t.navigateOptions,"updateBrowserURL")){var n=("/"+t.to).replace(/\/\//g,"/"),r=qa&&t.resolveOptions&&t.resolveOptions.hash===!0;bf?(history[t.navigateOptions.historyAPIMethod||"pushState"](t.navigateOptions.stateObj||{},t.navigateOptions.title||"",r?"#"+n:n),location&&location.hash&&(t.instance.__freezeListening=!0,setTimeout(function(){if(!r){var s=location.hash;location.hash="",location.hash=s}t.instance.__freezeListening=!1},1))):qa&&(window.location.href=t.to)}e()}function Ha(t,e){var n=t.instance;if(!n.lastResolved()){e();return}Oe(n.lastResolved().map(function(r){return function(s,i){if(!r.route.hooks||!r.route.hooks.leave){i();return}var o=!1,a=t.instance.matchLocation(r.route.path,t.currentLocationPath,!1);if(r.route.path!=="*")o=!a;else{var c=t.matches?t.matches.find(function(u){return r.route.path===u.route.path}):!1;o=!c}if(ot(t.navigateOptions,"callHooks")&&o){Oe(r.route.hooks.leave.map(function(u){return function(l,h){return u(function(d){d===!1?t.instance.__markAsClean(t):h()},t.matches&&t.matches.length>0?t.matches.length===1?t.matches[0]:t.matches:void 0)}}).concat([function(){return i()}]));return}else i()}}),{},function(){return e()})}function Af(t,e){t.match.route.hooks&&t.match.route.hooks.before&&ot(t.navigateOptions,"callHooks")?Oe(t.match.route.hooks.before.map(function(n){return function(s,i){return n(function(o){o===!1?t.instance.__markAsClean(t):i()},t.match)}}).concat([function(){return e()}])):e()}function Sf(t,e){ot(t.navigateOptions,"callHandler")&&t.match.route.handler(t.match),t.instance.updatePageLinks(),e()}function kf(t,e){t.match.route.hooks&&t.match.route.hooks.after&&ot(t.navigateOptions,"callHooks")&&t.match.route.hooks.after.forEach(function(n){return n(t.match)}),e()}function Cf(t,e){var n=t.instance.lastResolved();if(n&&n[0]&&n[0].route===t.match.route&&n[0].url===t.match.url&&n[0].queryString===t.match.queryString){n.forEach(function(r){r.route.hooks&&r.route.hooks.already&&ot(t.navigateOptions,"callHooks")&&r.route.hooks.already.forEach(function(s){return s(t.match)})}),e(!1);return}e()}function Rf(t,e){var n=t.instance._notFoundRoute;if(n){t.notFoundHandled=!0;var r=vr(t.currentLocationPath),s=r[0],i=r[1],o=yr(t.to);n.path=W(s);var a={url:n.path,queryString:i,hashString:o,data:null,route:n,params:i!==""?ei(i):null};t.matches=[a],t.match=a}e()}function Nf(t,e){(!t.resolveOptions||t.resolveOptions.noMatchWarning===!1||typeof t.resolveOptions.noMatchWarning=="undefined")&&console.warn('Navigo: "'+t.currentLocationPath+`" didn't match any of the registered routes.`),e()}function Of(t,e){t.instance._setCurrent(null),e()}function Wa(t,e){ot(t.navigateOptions,"updateState")&&t.instance._setCurrent(t.matches),e()}var za=[Cf,Af,Sf,kf],Ga=[Ha,Rf,Oe.if(function(t){var e=t.notFoundHandled;return e},za.concat([Wa]),[Nf,Of])];function ri(){return ri=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ri.apply(this,arguments)}function Ka(t,e){var n=0;function r(){if(n===t.matches.length){Wa(t,e);return}Oe(za,ri({},t,{match:t.matches[n]}),function(){n+=1,r()})}Ha(t,r)}function si(t){t.instance.__markAsClean(t)}function ii(){return ii=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ii.apply(this,arguments)}var Ja="[data-navigo]";function QI(t,e){var n=e||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:Ja},r=this,s="/",i=null,o=[],a=!1,c,u=ja(),l=ti();t?s=W(t):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.');function h(g){return g.indexOf("#")>=0&&(n.hash===!0?g=g.split("#")[1]||"/":g=g.split("#")[0]),g}function d(g){return W(s+"/"+W(g))}function f(g,T,N,V){return g=mr(g)?d(g):g,{name:V||W(String(g)),path:g,handler:T,hooks:Ef(N)}}function m(g,T,N){var V=this;return typeof g=="object"&&!(g instanceof RegExp)?(Object.keys(g).forEach(function(M){if(typeof g[M]=="function")V.on(M,g[M]);else{var Ne=g[M],fn=Ne.uses,af=Ne.as,cf=Ne.hooks;o.push(f(M,fn,[c,cf],af))}}),this):(typeof g=="function"&&(N=T,T=g,g=s),o.push(f(g,T,[c,N])),this)}function _(g,T){if(r.__dirty){r.__waiting.push(function(){return r.resolve(g,T)});return}else r.__dirty=!0;g=g?W(s)+"/"+W(g):void 0;var N={instance:r,to:g,currentLocationPath:g,navigateOptions:{},resolveOptions:ii({},n,T)};return Oe([Ba,ni,Oe.if(function(V){var M=V.matches;return M&&M.length>0},Ka,Ga)],N,si),N.matches?N.matches:!1}function v(g,T){if(r.__dirty){r.__waiting.push(function(){return r.navigate(g,T)});return}else r.__dirty=!0;g=W(s)+"/"+W(g);var N={instance:r,to:g,navigateOptions:T||{},resolveOptions:T&&T.resolveOptions?T.resolveOptions:n,currentLocationPath:h(g)};Oe([_f,Tf,ni,Oe.if(function(V){var M=V.matches;return M&&M.length>0},Ka,Ga),If,si],N,si)}function D(g,T,N){var V=fr(g,T);return V!==null?(v(V.replace(new RegExp("^/?"+s),""),N),!0):!1}function L(g){return this.routes=o=o.filter(function(T){return mr(g)?W(T.path)!==W(g):yf(g)?g!==T.handler:String(T.path)!==String(g)}),this}function R(){u&&(this.__popstateListener=function(){r.__freezeListening||_()},window.addEventListener("popstate",this.__popstateListener))}function U(){this.routes=o=[],u&&window.removeEventListener("popstate",this.__popstateListener),this.destroyed=a=!0}function ye(g,T){return r._notFoundRoute=f("*",g,[c,T],"__NOT_FOUND__"),this}function ve(){if(!!l)return Ce().forEach(function(g){if(g.getAttribute("data-navigo")==="false"||g.getAttribute("target")==="_blank"){g.hasListenerAttached&&g.removeEventListener("click",g.navigoHandler);return}g.hasListenerAttached||(g.hasListenerAttached=!0,g.navigoHandler=function(T){if((T.ctrlKey||T.metaKey)&&T.target.tagName.toLowerCase()==="a")return!1;var N=g.getAttribute("href");if(typeof N=="undefined"||N===null)return!1;if(N.match(/^(http|https)/)&&typeof URL!="undefined")try{var V=new URL(N);N=V.pathname+V.search}catch{}var M=wf(g.getAttribute("data-navigo-options"));a||(T.preventDefault(),T.stopPropagation(),r.navigate(W(N),M))},g.addEventListener("click",g.navigoHandler))}),r}function Ce(){return l?[].slice.call(document.querySelectorAll(n.linksSelector||Ja)):[]}function Ue(g){return"/"+s+"/"+W(g)}function it(g){return c=g,this}function dn(){return i}function fr(g,T,N){var V=o.find(function(fn){return fn.name===g}),M=null;if(V){if(M=V.path,T)for(var Ne in T)M=M.replace(":"+Ne,T[Ne]);M=M.match(/^\//)?M:"/"+M}return M&&N&&!N.includeRoot&&(M=M.replace(new RegExp("^/"+s),"")),M}function Ys(g){return g.getAttribute("href")}function pr(g){var T=vr(W(g)),N=T[0],V=T[1],M=V===""?null:ei(V),Ne=yr(g),fn=f(N,function(){},[c],N);return{url:N,queryString:V,hashString:Ne,route:fn,data:null,params:M}}function Qs(){return pr(W($a(s)).replace(new RegExp("^"+s),""))}function Zs(g){var T={instance:r,currentLocationPath:g,to:g,navigateOptions:{},resolveOptions:n};return ni(T,function(){}),T.matches?T.matches:!1}function sf(g,T,N){typeof T!="undefined"&&(typeof N=="undefined"||N)&&(T=d(T));var V={instance:r,to:T,currentLocationPath:T};Ba(V,function(){}),typeof g=="string"&&(g=typeof N=="undefined"||N?d(g):g);var M=Va(V,{name:String(g),path:g,handler:function(){},hooks:{}});return M||!1}function gr(g,T,N){return typeof T=="string"&&(T=Fa(T)),T?(T.hooks[g]||(T.hooks[g]=[]),T.hooks[g].push(N),function(){T.hooks[g]=T.hooks[g].filter(function(V){return V!==N})}):(console.warn("Route doesn't exists: "+T),function(){})}function Fa(g){return typeof g=="string"?o.find(function(T){return T.name===d(g)}):o.find(function(T){return T.handler===g})}function of(g){g.instance.__dirty=!1,g.instance.__waiting.length>0&&g.instance.__waiting.shift()()}this.root=s,this.routes=o,this.destroyed=a,this.current=i,this.__freezeListening=!1,this.__waiting=[],this.__dirty=!1,this.__markAsClean=of,this.on=m,this.off=L,this.resolve=_,this.navigate=v,this.navigateByName=D,this.destroy=U,this.notFound=ye,this.updatePageLinks=ve,this.link=Ue,this.hooks=it,this.extractGETParameters=function(g){return vr(h(g))},this.lastResolved=dn,this.generate=fr,this.getLinkPath=Ys,this.match=Zs,this.matchLocation=sf,this.getCurrentLocation=Qs,this.addBeforeHook=gr.bind(this,"before"),this.addAfterHook=gr.bind(this,"after"),this.addAlreadyHook=gr.bind(this,"already"),this.addLeaveHook=gr.bind(this,"leave"),this.getRoute=Fa,this._pathToMatchObject=pr,this._clean=W,this._checkForAHash=h,this._setCurrent=function(g){return i=r.current=g},R.call(this),ve.call(this)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)==55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)==56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Pf=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Lf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,u=c?t[s+2]:0,l=i>>2,h=(i&3)<<4|a>>4;let d=(a&15)<<2|u>>6,f=u&63;c||(f=64,o||(d=64)),r.push(n[l],n[h],n[d],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Df(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Pf(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||a==null||u==null||h==null)throw Error();const d=i<<2|a>>4;if(r.push(d),u!==64){const f=a<<4&240|u>>2;if(r.push(f),h!==64){const m=u<<6&192|h;r.push(m)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Mf=function(t){try{return Lf.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xa(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Y())}function Ya(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Qa(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Uf(){return Y().indexOf("Electron/")>=0}function Za(){const t=Y();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Ff(){return Y().indexOf("MSAppHost/")>=0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f="FirebaseError";class at extends Error{constructor(e,n,r){super(n);this.code=e,this.customData=r,this.name=$f,Object.setPrototypeOf(this,at.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pn.prototype.create)}}class pn{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Vf(i,r):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new at(s,a,r)}}function Vf(t,e){return t.replace(jf,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const jf=/\{\$([^}]+)}/g;function Bf(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function wr(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(ec(i)&&ec(o)){if(!wr(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ec(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function mn(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function yn(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function qf(t,e){const n=new Hf(t,e);return n.subscribe.bind(n)}class Hf{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Wf(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=oi),s.error===void 0&&(s.error=oi),s.complete===void 0&&(s.complete=oi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Wf(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function oi(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(t){return t&&t._delegate?t._delegate:t}class ct{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new xf;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Kf(e))try{this.getOrInitializeService({instanceIdentifier:ut})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=ut){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ut){return this.instances.has(e)}getOptions(e=ut){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(!!r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Gf(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ut){return this.component?this.component.multipleInstances?e:ut:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Gf(t){return t===ut?void 0:t}function Kf(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new zf(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(P||(P={}));const Xf={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},Yf=P.INFO,Qf={[P.DEBUG]:"log",[P.VERBOSE]:"log",[P.INFO]:"info",[P.WARN]:"warn",[P.ERROR]:"error"},Zf=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Qf[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ai{constructor(e){this.name=e,this._logLevel=Yf,this._logHandler=Zf,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in P))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Xf[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,P.DEBUG,...e),this._logHandler(this,P.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,P.VERBOSE,...e),this._logHandler(this,P.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,P.INFO,...e),this._logHandler(this,P.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,P.WARN,...e),this._logHandler(this,P.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,P.ERROR,...e),this._logHandler(this,P.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(tp(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function tp(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ci="@firebase/app",tc="0.7.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui=new ai("@firebase/app"),np="@firebase/app-compat",rp="@firebase/analytics-compat",sp="@firebase/analytics",ip="@firebase/app-check-compat",op="@firebase/app-check",ap="@firebase/auth",cp="@firebase/auth-compat",up="@firebase/database",lp="@firebase/database-compat",hp="@firebase/functions",dp="@firebase/functions-compat",fp="@firebase/installations",pp="@firebase/installations-compat",gp="@firebase/messaging",mp="@firebase/messaging-compat",yp="@firebase/performance",vp="@firebase/performance-compat",wp="@firebase/remote-config",Ep="@firebase/remote-config-compat",_p="@firebase/storage",Tp="@firebase/storage-compat",bp="@firebase/firestore",Ip="@firebase/firestore-compat",Ap="firebase",Sp="9.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="[DEFAULT]",kp={[ci]:"fire-core",[np]:"fire-core-compat",[sp]:"fire-analytics",[rp]:"fire-analytics-compat",[op]:"fire-app-check",[ip]:"fire-app-check-compat",[ap]:"fire-auth",[cp]:"fire-auth-compat",[up]:"fire-rtdb",[lp]:"fire-rtdb-compat",[hp]:"fire-fn",[dp]:"fire-fn-compat",[fp]:"fire-iid",[pp]:"fire-iid-compat",[gp]:"fire-fcm",[mp]:"fire-fcm-compat",[yp]:"fire-perf",[vp]:"fire-perf-compat",[wp]:"fire-rc",[Ep]:"fire-rc-compat",[_p]:"fire-gcs",[Tp]:"fire-gcs-compat",[bp]:"fire-fst",[Ip]:"fire-fst-compat","fire-js":"fire-js",[Ap]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er=new Map,li=new Map;function Cp(t,e){try{t.container.addComponent(e)}catch(n){ui.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Pt(t){const e=t.name;if(li.has(e))return ui.debug(`There were multiple attempts to register component ${e}.`),!1;li.set(e,t);for(const n of Er.values())Cp(n,t);return!0}function _r(t,e){return t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function."},Tr=new pn("app","Firebase",Rp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ct("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt=Sp;function ZI(t,e={}){typeof e!="object"&&(e={name:e});const n=Object.assign({name:nc,automaticDataCollectionEnabled:!1},e),r=n.name;if(typeof r!="string"||!r)throw Tr.create("bad-app-name",{appName:String(r)});const s=Er.get(r);if(s){if(wr(t,s.options)&&wr(n,s.config))return s;throw Tr.create("duplicate-app",{appName:r})}const i=new Jf(r);for(const a of li.values())i.addComponent(a);const o=new Np(t,n,i);return Er.set(r,o),o}function hi(t=nc){const e=Er.get(t);if(!e)throw Tr.create("no-app",{appName:t});return e}function De(t,e,n){var r;let s=(r=kp[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${s}" with version "${e}":`];i&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ui.warn(a.join(" "));return}Pt(new ct(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Op(t){Pt(new ct("platform-logger",e=>new ep(e),"PRIVATE")),De(ci,tc,t),De(ci,tc,"esm2017"),De("fire-js","")}Op("");var Dp=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},w,di=di||{},A=Dp||self;function br(){}function fi(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function vn(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function Pp(t){return Object.prototype.hasOwnProperty.call(t,pi)&&t[pi]||(t[pi]=++Lp)}var pi="closure_uid_"+(1e9*Math.random()>>>0),Lp=0;function Mp(t,e,n){return t.call.apply(t.bind,arguments)}function xp(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function ee(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ee=Mp:ee=xp,ee.apply(null,arguments)}function Ir(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(this,r)}}function te(t,e){function n(){}n.prototype=e.prototype,t.Z=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.Vb=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(r,o)}}function Ge(){this.s=this.s,this.o=this.o}var Up=0,Fp={};Ge.prototype.s=!1;Ge.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),Up!=0)){var t=Pp(this);delete Fp[t]}};Ge.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const rc=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1},sc=Array.prototype.forEach?function(t,e,n){Array.prototype.forEach.call(t,e,n)}:function(t,e,n){const r=t.length,s=typeof t=="string"?t.split(""):t;for(let i=0;i<r;i++)i in s&&e.call(n,s[i],i,t)};function $p(t){e:{var e=Ng;const n=t.length,r=typeof t=="string"?t.split(""):t;for(let s=0;s<n;s++)if(s in r&&e.call(void 0,r[s],s,t)){e=s;break e}e=-1}return 0>e?null:typeof t=="string"?t.charAt(e):t[e]}function ic(t){return Array.prototype.concat.apply([],arguments)}function gi(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function Ar(t){return/^[\s\xa0]*$/.test(t)}var oc=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function de(t,e){return t.indexOf(e)!=-1}function mi(t,e){return t<e?-1:t>e?1:0}var fe;e:{var ac=A.navigator;if(ac){var cc=ac.userAgent;if(cc){fe=cc;break e}}fe=""}function yi(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function uc(t){const e={};for(const n in t)e[n]=t[n];return e}var lc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function hc(t,e){let n,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(n in r)t[n]=r[n];for(let i=0;i<lc.length;i++)n=lc[i],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function vi(t){return vi[" "](t),t}vi[" "]=br;function Vp(t){var e=qp;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var jp=de(fe,"Opera"),Mt=de(fe,"Trident")||de(fe,"MSIE"),dc=de(fe,"Edge"),wi=dc||Mt,fc=de(fe,"Gecko")&&!(de(fe.toLowerCase(),"webkit")&&!de(fe,"Edge"))&&!(de(fe,"Trident")||de(fe,"MSIE"))&&!de(fe,"Edge"),Bp=de(fe.toLowerCase(),"webkit")&&!de(fe,"Edge");function pc(){var t=A.document;return t?t.documentMode:void 0}var Sr;e:{var Ei="",_i=function(){var t=fe;if(fc)return/rv:([^\);]+)(\)|;)/.exec(t);if(dc)return/Edge\/([\d\.]+)/.exec(t);if(Mt)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(Bp)return/WebKit\/(\S+)/.exec(t);if(jp)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(_i&&(Ei=_i?_i[1]:""),Mt){var Ti=pc();if(Ti!=null&&Ti>parseFloat(Ei)){Sr=String(Ti);break e}}Sr=Ei}var qp={};function Hp(){return Vp(function(){let t=0;const e=oc(String(Sr)).split("."),n=oc("9").split("."),r=Math.max(e.length,n.length);for(let o=0;t==0&&o<r;o++){var s=e[o]||"",i=n[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],s[0].length==0&&i[0].length==0)break;t=mi(s[1].length==0?0:parseInt(s[1],10),i[1].length==0?0:parseInt(i[1],10))||mi(s[2].length==0,i[2].length==0)||mi(s[2],i[2]),s=s[3],i=i[3]}while(t==0)}return 0<=t})}var bi;if(A.document&&Mt){var gc=pc();bi=gc||parseInt(Sr,10)||void 0}else bi=void 0;var Wp=bi,zp=function(){if(!A.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{A.addEventListener("test",br,e),A.removeEventListener("test",br,e)}catch{}return t}();function oe(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};function wn(t,e){if(oe.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(fc){e:{try{vi(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Gp[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&wn.Z.h.call(this)}}te(wn,oe);var Gp={2:"touch",3:"pen",4:"mouse"};wn.prototype.h=function(){wn.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var En="closure_listenable_"+(1e6*Math.random()|0),Kp=0;function Jp(t,e,n,r,s){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.ia=s,this.key=++Kp,this.ca=this.fa=!1}function kr(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function Cr(t){this.src=t,this.g={},this.h=0}Cr.prototype.add=function(t,e,n,r,s){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=Ai(t,e,r,s);return-1<o?(e=t[o],n||(e.fa=!1)):(e=new Jp(e,this.src,i,!!r,s),e.fa=n,t.push(e)),e};function Ii(t,e){var n=e.type;if(n in t.g){var r=t.g[n],s=rc(r,e),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(kr(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function Ai(t,e,n,r){for(var s=0;s<t.length;++s){var i=t[s];if(!i.ca&&i.listener==e&&i.capture==!!n&&i.ia==r)return s}return-1}var Si="closure_lm_"+(1e6*Math.random()|0),ki={};function mc(t,e,n,r,s){if(r&&r.once)return vc(t,e,n,r,s);if(Array.isArray(e)){for(var i=0;i<e.length;i++)mc(t,e[i],n,r,s);return null}return n=Oi(n),t&&t[En]?t.N(e,n,vn(r)?!!r.capture:!!r,s):yc(t,e,n,!1,r,s)}function yc(t,e,n,r,s,i){if(!e)throw Error("Invalid event type");var o=vn(s)?!!s.capture:!!s,a=Ri(t);if(a||(t[Si]=a=new Cr(t)),n=a.add(e,n,r,o,i),n.proxy)return n;if(r=Xp(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)zp||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),r,s);else if(t.attachEvent)t.attachEvent(Ec(e.toString()),r);else if(t.addListener&&t.removeListener)t.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function Xp(){function t(n){return e.call(t.src,t.listener,n)}var e=Yp;return t}function vc(t,e,n,r,s){if(Array.isArray(e)){for(var i=0;i<e.length;i++)vc(t,e[i],n,r,s);return null}return n=Oi(n),t&&t[En]?t.O(e,n,vn(r)?!!r.capture:!!r,s):yc(t,e,n,!0,r,s)}function wc(t,e,n,r,s){if(Array.isArray(e))for(var i=0;i<e.length;i++)wc(t,e[i],n,r,s);else r=vn(r)?!!r.capture:!!r,n=Oi(n),t&&t[En]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=Ai(i,n,r,s),-1<n&&(kr(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=Ri(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Ai(e,n,r,s)),(n=-1<t?e[t]:null)&&Ci(n))}function Ci(t){if(typeof t!="number"&&t&&!t.ca){var e=t.src;if(e&&e[En])Ii(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Ec(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Ri(e))?(Ii(n,t),n.h==0&&(n.src=null,e[Si]=null)):kr(t)}}}function Ec(t){return t in ki?ki[t]:ki[t]="on"+t}function Yp(t,e){if(t.ca)t=!0;else{e=new wn(e,this);var n=t.listener,r=t.ia||t.src;t.fa&&Ci(t),t=n.call(r,e)}return t}function Ri(t){return t=t[Si],t instanceof Cr?t:null}var Ni="__closure_events_fn_"+(1e9*Math.random()>>>0);function Oi(t){return typeof t=="function"?t:(t[Ni]||(t[Ni]=function(e){return t.handleEvent(e)}),t[Ni])}function Q(){Ge.call(this),this.i=new Cr(this),this.P=this,this.I=null}te(Q,Ge);Q.prototype[En]=!0;Q.prototype.removeEventListener=function(t,e,n,r){wc(this,t,e,n,r)};function ne(t,e){var n,r=t.I;if(r)for(n=[];r;r=r.I)n.push(r);if(t=t.P,r=e.type||e,typeof e=="string")e=new oe(e,t);else if(e instanceof oe)e.target=e.target||t;else{var s=e;e=new oe(r,t),hc(e,s)}if(s=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];s=Rr(o,r,!0,e)&&s}if(o=e.g=t,s=Rr(o,r,!0,e)&&s,s=Rr(o,r,!1,e)&&s,n)for(i=0;i<n.length;i++)o=e.g=n[i],s=Rr(o,r,!1,e)&&s}Q.prototype.M=function(){if(Q.Z.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)kr(n[r]);delete t.g[e],t.h--}}this.I=null};Q.prototype.N=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)};Q.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};function Rr(t,e,n,r){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.ca&&o.capture==n){var a=o.listener,c=o.ia||o.src;o.fa&&Ii(t.i,o),s=a.call(c,r)!==!1&&s}}return s&&!r.defaultPrevented}var Di=A.JSON.stringify;function Qp(){var t=Tc;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class Zp{constructor(){this.h=this.g=null}add(e,n){const r=_c.get();r.set(e,n),this.h?this.h.next=r:this.g=r,this.h=r}}var _c=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new eg,t=>t.reset());class eg{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function tg(t){A.setTimeout(()=>{throw t},0)}function Pi(t,e){Li||ng(),Mi||(Li(),Mi=!0),Tc.add(t,e)}var Li;function ng(){var t=A.Promise.resolve(void 0);Li=function(){t.then(rg)}}var Mi=!1,Tc=new Zp;function rg(){for(var t;t=Qp();){try{t.h.call(t.g)}catch(n){tg(n)}var e=_c;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}Mi=!1}function Nr(t,e){Q.call(this),this.h=t||1,this.g=e||A,this.j=ee(this.kb,this),this.l=Date.now()}te(Nr,Q);w=Nr.prototype;w.da=!1;w.S=null;w.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),ne(this,"tick"),this.da&&(xi(this),this.start()))}};w.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function xi(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}w.M=function(){Nr.Z.M.call(this),xi(this),delete this.g};function Ui(t,e,n){if(typeof t=="function")n&&(t=ee(t,n));else if(t&&typeof t.handleEvent=="function")t=ee(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:A.setTimeout(t,e||0)}function bc(t){t.g=Ui(()=>{t.g=null,t.i&&(t.i=!1,bc(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class sg extends Ge{constructor(e,n){super();this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:bc(this)}M(){super.M(),this.g&&(A.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function _n(t){Ge.call(this),this.h=t,this.g={}}te(_n,Ge);var Ic=[];function Ac(t,e,n,r){Array.isArray(n)||(n&&(Ic[0]=n.toString()),n=Ic);for(var s=0;s<n.length;s++){var i=mc(e,n[s],r||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function Sc(t){yi(t.g,function(e,n){this.g.hasOwnProperty(n)&&Ci(e)},t),t.g={}}_n.prototype.M=function(){_n.Z.M.call(this),Sc(this)};_n.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Or(){this.g=!0}Or.prototype.Aa=function(){this.g=!1};function ig(t,e,n,r,s,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var l=u[0];u=u[1];var h=l.split("_");o=2<=h.length&&h[1]=="type"?o+(l+"="+u+"&"):o+(l+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+e+`
`+n+`
`+o})}function og(t,e,n,r,s,i,o){t.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+e+`
`+n+`
`+i+" "+o})}function xt(t,e,n,r){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+cg(t,n)+(r?" "+r:"")})}function ag(t,e){t.info(function(){return"TIMEOUT: "+e})}Or.prototype.info=function(){};function cg(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return Di(n)}catch{return e}}var lt={},kc=null;function Dr(){return kc=kc||new Q}lt.Ma="serverreachability";function Cc(t){oe.call(this,lt.Ma,t)}te(Cc,oe);function Tn(t){const e=Dr();ne(e,new Cc(e,t))}lt.STAT_EVENT="statevent";function Rc(t,e){oe.call(this,lt.STAT_EVENT,t),this.stat=e}te(Rc,oe);function pe(t){const e=Dr();ne(e,new Rc(e,t))}lt.Na="timingevent";function Nc(t,e){oe.call(this,lt.Na,t),this.size=e}te(Nc,oe);function bn(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return A.setTimeout(function(){t()},e)}var Pr={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Oc={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Fi(){}Fi.prototype.h=null;function Dc(t){return t.h||(t.h=t.i())}function Pc(){}var In={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function $i(){oe.call(this,"d")}te($i,oe);function Vi(){oe.call(this,"c")}te(Vi,oe);var ji;function Lr(){}te(Lr,Fi);Lr.prototype.g=function(){return new XMLHttpRequest};Lr.prototype.i=function(){return{}};ji=new Lr;function An(t,e,n,r){this.l=t,this.j=e,this.m=n,this.X=r||1,this.V=new _n(this),this.P=ug,t=wi?125:void 0,this.W=new Nr(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Lc}function Lc(){this.i=null,this.g="",this.h=!1}var ug=45e3,Bi={},Mr={};w=An.prototype;w.setTimeout=function(t){this.P=t};function qi(t,e,n){t.K=1,t.v=Vr(Fe(e)),t.s=n,t.U=!0,Mc(t,null)}function Mc(t,e){t.F=Date.now(),Sn(t),t.A=Fe(t.v);var n=t.A,r=t.X;Array.isArray(r)||(r=[String(r)]),Hc(n.h,"t",r),t.C=0,n=t.l.H,t.h=new Lc,t.g=fu(t.l,n?e:null,!t.s),0<t.O&&(t.L=new sg(ee(t.Ia,t,t.g),t.O)),Ac(t.V,t.g,"readystatechange",t.gb),e=t.H?uc(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),Tn(1),ig(t.j,t.u,t.A,t.m,t.X,t.s)}w.gb=function(t){t=t.target;const e=this.L;e&&$e(t)==3?e.l():this.Ia(t)};w.Ia=function(t){try{if(t==this.g)e:{const l=$e(this.g);var e=this.g.Da();const h=this.g.ba();if(!(3>l)&&(l!=3||wi||this.g&&(this.h.h||this.g.ga()||nu(this.g)))){this.I||l!=4||e==7||(e==8||0>=h?Tn(3):Tn(2)),xr(this);var n=this.g.ba();this.N=n;t:if(xc(this)){var r=nu(this.g);t="";var s=r.length,i=$e(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){ht(this),kn(this);var o="";break t}this.h.i=new A.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:i&&e==s-1});r.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=n==200,og(this.j,this.u,this.A,this.m,this.X,l,n),this.i){if(this.$&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Ar(a)){var u=a;break t}}u=null}if(n=u)xt(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Hi(this,n);else{this.i=!1,this.o=3,pe(12),ht(this),kn(this);break e}}this.U?(Uc(this,l,o),wi&&this.i&&l==3&&(Ac(this.V,this.W,"tick",this.fb),this.W.start())):(xt(this.j,this.m,o,null),Hi(this,o)),l==4&&ht(this),this.i&&!this.I&&(l==4?uu(this.l,this):(this.i=!1,Sn(this)))}else n==400&&0<o.indexOf("Unknown SID")?(this.o=3,pe(12)):(this.o=0,pe(13)),ht(this),kn(this)}}}catch{}finally{}};function xc(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Ba:!1}function Uc(t,e,n){let r=!0,s;for(;!t.I&&t.C<n.length;)if(s=lg(t,n),s==Mr){e==4&&(t.o=4,pe(14),r=!1),xt(t.j,t.m,null,"[Incomplete Response]");break}else if(s==Bi){t.o=4,pe(15),xt(t.j,t.m,n,"[Invalid Chunk]"),r=!1;break}else xt(t.j,t.m,s,null),Hi(t,s);xc(t)&&s!=Mr&&s!=Bi&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,pe(16),r=!1),t.i=t.i&&r,r?0<n.length&&!t.aa&&(t.aa=!0,e=t.l,e.g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),to(e),e.L=!0,pe(11))):(xt(t.j,t.m,n,"[Invalid Chunked Response]"),ht(t),kn(t))}w.fb=function(){if(this.g){var t=$e(this.g),e=this.g.ga();this.C<e.length&&(xr(this),Uc(this,t,e),this.i&&t!=4&&Sn(this))}};function lg(t,e){var n=t.C,r=e.indexOf(`
`,n);return r==-1?Mr:(n=Number(e.substring(n,r)),isNaN(n)?Bi:(r+=1,r+n>e.length?Mr:(e=e.substr(r,n),t.C=r+n,e)))}w.cancel=function(){this.I=!0,ht(this)};function Sn(t){t.Y=Date.now()+t.P,Fc(t,t.P)}function Fc(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=bn(ee(t.eb,t),e)}function xr(t){t.B&&(A.clearTimeout(t.B),t.B=null)}w.eb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(ag(this.j,this.A),this.K!=2&&(Tn(3),pe(17)),ht(this),this.o=2,kn(this)):Fc(this,this.Y-t)};function kn(t){t.l.G==0||t.I||uu(t.l,t)}function ht(t){xr(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,xi(t.W),Sc(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function Hi(t,e){try{var n=t.l;if(n.G!=0&&(n.g==t||Gi(n.i,t))){if(n.I=t.N,!t.J&&Gi(n.i,t)&&n.G==3){try{var r=n.Ca.g.parse(e)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0)e:if(!n.u){if(n.g)if(n.g.F+3e3<t.F)zr(n),Hr(n);else break e;eo(n),pe(18)}else n.ta=s[1],0<n.ta-n.U&&37500>s[2]&&n.N&&n.A==0&&!n.v&&(n.v=bn(ee(n.ab,n),6e3));if(1>=Gc(n.i)&&n.ka){try{n.ka()}catch{}n.ka=void 0}}else pt(n,11)}else if((t.J||n.g==t)&&zr(n),!Ar(e))for(s=n.Ca.g.parse(e),e=0;e<s.length;e++){let u=s[e];if(n.U=u[0],u=u[1],n.G==2)if(u[0]=="c"){n.J=u[1],n.la=u[2];const l=u[3];l!=null&&(n.ma=l,n.h.info("VER="+n.ma));const h=u[4];h!=null&&(n.za=h,n.h.info("SVER="+n.za));const d=u[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,n.K=r,n.h.info("backChannelRequestTimeoutMs_="+r)),r=n;const f=t.g;if(f){const m=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(m){var i=r.i;!i.g&&(de(m,"spdy")||de(m,"quic")||de(m,"h2"))&&(i.j=i.l,i.g=new Set,i.h&&(Ki(i,i.h),i.h=null))}if(r.D){const _=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;_&&(r.sa=_,B(r.F,r.D,_))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-t.F,n.h.info("Handshake RTT: "+n.O+"ms")),r=n;var o=t;if(r.oa=du(r,r.H?r.la:null,r.W),o.J){Kc(r.i,o);var a=o,c=r.K;c&&a.setTimeout(c),a.B&&(xr(a),Sn(a)),r.g=o}else au(r);0<n.l.length&&Wr(n)}else u[0]!="stop"&&u[0]!="close"||pt(n,7);else n.G==3&&(u[0]=="stop"||u[0]=="close"?u[0]=="stop"?pt(n,7):Qi(n):u[0]!="noop"&&n.j&&n.j.wa(u),n.A=0)}}Tn(4)}catch{}}function hg(t){if(t.R&&typeof t.R=="function")return t.R();if(typeof t=="string")return t.split("");if(fi(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}e=[],n=0;for(r in t)e[n++]=t[r];return e}function Wi(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(fi(t)||typeof t=="string")sc(t,e,void 0);else{if(t.T&&typeof t.T=="function")var n=t.T();else if(t.R&&typeof t.R=="function")n=void 0;else if(fi(t)||typeof t=="string"){n=[];for(var r=t.length,s=0;s<r;s++)n.push(s)}else for(s in n=[],r=0,t)n[r++]=s;r=hg(t),s=r.length;for(var i=0;i<s;i++)e.call(void 0,r[i],n&&n[i],t)}}function Ut(t,e){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(t)if(t instanceof Ut)for(n=t.T(),r=0;r<n.length;r++)this.set(n[r],t.get(n[r]));else for(r in t)this.set(r,t[r])}w=Ut.prototype;w.R=function(){zi(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t};w.T=function(){return zi(this),this.g.concat()};function zi(t){if(t.i!=t.g.length){for(var e=0,n=0;e<t.g.length;){var r=t.g[e];dt(t.h,r)&&(t.g[n++]=r),e++}t.g.length=n}if(t.i!=t.g.length){var s={};for(n=e=0;e<t.g.length;)r=t.g[e],dt(s,r)||(t.g[n++]=r,s[r]=1),e++;t.g.length=n}}w.get=function(t,e){return dt(this.h,t)?this.h[t]:e};w.set=function(t,e){dt(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e};w.forEach=function(t,e){for(var n=this.T(),r=0;r<n.length;r++){var s=n[r],i=this.get(s);t.call(e,i,s,this)}};function dt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var $c=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function dg(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),s=null;if(0<=r){var i=t[n].substring(0,r);s=t[n].substring(r+1)}else i=t[n];e(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function ft(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof ft){this.g=e!==void 0?e:t.g,Ur(this,t.j),this.s=t.s,Fr(this,t.i),$r(this,t.m),this.l=t.l,e=t.h;var n=new Nn;n.i=e.i,e.g&&(n.g=new Ut(e.g),n.h=e.h),Vc(this,n),this.o=t.o}else t&&(n=String(t).match($c))?(this.g=!!e,Ur(this,n[1]||"",!0),this.s=Cn(n[2]||""),Fr(this,n[3]||"",!0),$r(this,n[4]),this.l=Cn(n[5]||"",!0),Vc(this,n[6]||"",!0),this.o=Cn(n[7]||"")):(this.g=!!e,this.h=new Nn(null,this.g))}ft.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Rn(e,jc,!0),":");var n=this.i;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Rn(e,jc,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.i&&n.charAt(0)!="/"&&t.push("/"),t.push(Rn(n,n.charAt(0)=="/"?yg:mg,!0))),(n=this.h.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Rn(n,wg)),t.join("")};function Fe(t){return new ft(t)}function Ur(t,e,n){t.j=n?Cn(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Fr(t,e,n){t.i=n?Cn(e,!0):e}function $r(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Vc(t,e,n){e instanceof Nn?(t.h=e,Eg(t.h,t.g)):(n||(e=Rn(e,vg)),t.h=new Nn(e,t.g))}function B(t,e,n){t.h.set(e,n)}function Vr(t){return B(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function fg(t){return t instanceof ft?Fe(t):new ft(t,void 0)}function pg(t,e,n,r){var s=new ft(null,void 0);return t&&Ur(s,t),e&&Fr(s,e),n&&$r(s,n),r&&(s.l=r),s}function Cn(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Rn(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,gg),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function gg(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var jc=/[#\/\?@]/g,mg=/[#\?:]/g,yg=/[#\?]/g,vg=/[#\?@]/g,wg=/#/g;function Nn(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Ke(t){t.g||(t.g=new Ut,t.h=0,t.i&&dg(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}w=Nn.prototype;w.add=function(t,e){Ke(this),this.i=null,t=Ft(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function Bc(t,e){Ke(t),e=Ft(t,e),dt(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,t=t.g,dt(t.h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&zi(t)))}function qc(t,e){return Ke(t),e=Ft(t,e),dt(t.g.h,e)}w.forEach=function(t,e){Ke(this),this.g.forEach(function(n,r){sc(n,function(s){t.call(e,s,r,this)},this)},this)};w.T=function(){Ke(this);for(var t=this.g.R(),e=this.g.T(),n=[],r=0;r<e.length;r++)for(var s=t[r],i=0;i<s.length;i++)n.push(e[r]);return n};w.R=function(t){Ke(this);var e=[];if(typeof t=="string")qc(this,t)&&(e=ic(e,this.g.get(Ft(this,t))));else{t=this.g.R();for(var n=0;n<t.length;n++)e=ic(e,t[n])}return e};w.set=function(t,e){return Ke(this),this.i=null,t=Ft(this,t),qc(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};w.get=function(t,e){return t?(t=this.R(t),0<t.length?String(t[0]):e):e};function Hc(t,e,n){Bc(t,e),0<n.length&&(t.i=null,t.g.set(Ft(t,e),gi(n)),t.h+=n.length)}w.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),n=0;n<e.length;n++){var r=e[n],s=encodeURIComponent(String(r));r=this.R(r);for(var i=0;i<r.length;i++){var o=s;r[i]!==""&&(o+="="+encodeURIComponent(String(r[i]))),t.push(o)}}return this.i=t.join("&")};function Ft(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Eg(t,e){e&&!t.j&&(Ke(t),t.i=null,t.g.forEach(function(n,r){var s=r.toLowerCase();r!=s&&(Bc(this,r),Hc(this,s,n))},t)),t.j=e}var _g=class{constructor(t,e){this.h=t,this.g=e}};function Wc(t){this.l=t||Tg,A.PerformanceNavigationTiming?(t=A.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(A.g&&A.g.Ea&&A.g.Ea()&&A.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Tg=10;function zc(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Gc(t){return t.h?1:t.g?t.g.size:0}function Gi(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Ki(t,e){t.g?t.g.add(e):t.h=e}function Kc(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}Wc.prototype.cancel=function(){if(this.i=Jc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function Jc(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.D);return e}return gi(t.i)}function Ji(){}Ji.prototype.stringify=function(t){return A.JSON.stringify(t,void 0)};Ji.prototype.parse=function(t){return A.JSON.parse(t,void 0)};function bg(){this.g=new Ji}function Ig(t,e,n){const r=n||"";try{Wi(t,function(s,i){let o=s;vn(s)&&(o=Di(s)),e.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw e.push(r+"type="+encodeURIComponent("_badmap")),s}}function Ag(t,e){const n=new Or;if(A.Image){const r=new Image;r.onload=Ir(jr,n,r,"TestLoadImage: loaded",!0,e),r.onerror=Ir(jr,n,r,"TestLoadImage: error",!1,e),r.onabort=Ir(jr,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=Ir(jr,n,r,"TestLoadImage: timeout",!1,e),A.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=t}else e(!1)}function jr(t,e,n,r,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(r)}catch{}}function On(t){this.l=t.$b||null,this.j=t.ib||!1}te(On,Fi);On.prototype.g=function(){return new Br(this.l,this.j)};On.prototype.i=function(t){return function(){return t}}({});function Br(t,e){Q.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=Xi,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}te(Br,Q);var Xi=0;w=Br.prototype;w.open=function(t,e){if(this.readyState!=Xi)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,Pn(this)};w.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||A).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))};w.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Dn(this)),this.readyState=Xi};w.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Pn(this)),this.g&&(this.readyState=3,Pn(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof A.ReadableStream!="undefined"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Xc(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))};function Xc(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}w.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Dn(this):Pn(this),this.readyState==3&&Xc(this)}};w.Ua=function(t){this.g&&(this.response=this.responseText=t,Dn(this))};w.Ta=function(t){this.g&&(this.response=t,Dn(this))};w.ha=function(){this.g&&Dn(this)};function Dn(t){t.readyState=4,t.l=null,t.j=null,t.A=null,Pn(t)}w.setRequestHeader=function(t,e){this.v.append(t,e)};w.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};w.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function Pn(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Br.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var Sg=A.JSON.parse;function K(t){Q.call(this),this.headers=new Ut,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Yc,this.K=this.L=!1}te(K,Q);var Yc="",kg=/^https?$/i,Cg=["POST","PUT"];w=K.prototype;w.ea=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():ji.g(),this.C=this.u?Dc(this.u):Dc(ji),this.g.onreadystatechange=ee(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(i){Qc(this,i);return}t=n||"";const s=new Ut(this.headers);r&&Wi(r,function(i,o){s.set(o,i)}),r=$p(s.T()),n=A.FormData&&t instanceof A.FormData,!(0<=rc(Cg,e))||r||n||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach(function(i,o){this.g.setRequestHeader(o,i)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{tu(this),0<this.B&&((this.K=Rg(this.g))?(this.g.timeout=this.B,this.g.ontimeout=ee(this.pa,this)):this.A=Ui(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){Qc(this,i)}};function Rg(t){return Mt&&Hp()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}function Ng(t){return t.toLowerCase()=="content-type"}w.pa=function(){typeof di!="undefined"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,ne(this,"timeout"),this.abort(8))};function Qc(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,Zc(t),qr(t)}function Zc(t){t.D||(t.D=!0,ne(t,"complete"),ne(t,"error"))}w.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,ne(this,"complete"),ne(this,"abort"),qr(this))};w.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),qr(this,!0)),K.Z.M.call(this)};w.Fa=function(){this.s||(this.F||this.v||this.l?eu(this):this.cb())};w.cb=function(){eu(this)};function eu(t){if(t.h&&typeof di!="undefined"&&(!t.C[1]||$e(t)!=4||t.ba()!=2)){if(t.v&&$e(t)==4)Ui(t.Fa,0,t);else if(ne(t,"readystatechange"),$e(t)==4){t.h=!1;try{const a=t.ba();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var r;if(r=a===0){var s=String(t.H).match($c)[1]||null;if(!s&&A.self&&A.self.location){var i=A.self.location.protocol;s=i.substr(0,i.length-1)}r=!kg.test(s?s.toLowerCase():"")}n=r}if(n)ne(t,"complete"),ne(t,"success");else{t.m=6;try{var o=2<$e(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.ba()+"]",Zc(t)}}finally{qr(t)}}}}function qr(t,e){if(t.g){tu(t);const n=t.g,r=t.C[0]?br:null;t.g=null,t.C=null,e||ne(t,"ready");try{n.onreadystatechange=r}catch{}}}function tu(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(A.clearTimeout(t.A),t.A=null)}function $e(t){return t.g?t.g.readyState:0}w.ba=function(){try{return 2<$e(this)?this.g.status:-1}catch{return-1}};w.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};w.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),Sg(e)}};function nu(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case Yc:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}w.Da=function(){return this.m};w.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function Og(t){let e="";return yi(t,function(n,r){e+=r,e+=":",e+=n,e+=`\r
`}),e}function Yi(t,e,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=Og(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):B(t,e,n))}function Ln(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function ru(t){this.za=0,this.l=[],this.h=new Or,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=Ln("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=Ln("baseRetryDelayMs",5e3,t),this.$a=Ln("retryDelaySeedMs",1e4,t),this.Ya=Ln("forwardChannelMaxRetries",2,t),this.ra=Ln("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new Wc(t&&t.concurrentRequestLimit),this.Ca=new bg,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||t.Xb!==!1}w=ru.prototype;w.ma=8;w.G=1;function Qi(t){if(su(t),t.G==3){var e=t.V++,n=Fe(t.F);B(n,"SID",t.J),B(n,"RID",e),B(n,"TYPE","terminate"),Mn(t,n),e=new An(t,t.h,e,void 0),e.K=2,e.v=Vr(Fe(n)),n=!1,A.navigator&&A.navigator.sendBeacon&&(n=A.navigator.sendBeacon(e.v.toString(),"")),!n&&A.Image&&(new Image().src=e.v,n=!0),n||(e.g=fu(e.l,null),e.g.ea(e.v)),e.F=Date.now(),Sn(e)}hu(t)}w.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch{}};function Hr(t){t.g&&(to(t),t.g.cancel(),t.g=null)}function su(t){Hr(t),t.u&&(A.clearTimeout(t.u),t.u=null),zr(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&A.clearTimeout(t.m),t.m=null)}function Zi(t,e){t.l.push(new _g(t.Za++,e)),t.G==3&&Wr(t)}function Wr(t){zc(t.i)||t.m||(t.m=!0,Pi(t.Ha,t),t.C=0)}function Dg(t,e){return Gc(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.l=e.D.concat(t.l),!0):t.G==1||t.G==2||t.C>=(t.Xa?0:t.Ya)?!1:(t.m=bn(ee(t.Ha,t,e),lu(t,t.C)),t.C++,!0)}w.Ha=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const s=new An(this,this.h,t,void 0);let i=this.s;if(this.P&&(i?(i=uc(i),hc(i,this.P)):i=this.P),this.o===null&&(s.H=i),this.ja)e:{for(var e=0,n=0;n<this.l.length;n++){t:{var r=this.l[n];if("__data__"in r.g&&(r=r.g.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(e+=r,4096<e){e=n;break e}if(e===4096||n===this.l.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=ou(this,s,e),n=Fe(this.F),B(n,"RID",t),B(n,"CVER",22),this.D&&B(n,"X-HTTP-Session-Id",this.D),Mn(this,n),this.o&&i&&Yi(n,this.o,i),Ki(this.i,s),this.Ra&&B(n,"TYPE","init"),this.ja?(B(n,"$req",e),B(n,"SID","null"),s.$=!0,qi(s,n,null)):qi(s,n,e),this.G=2}}else this.G==3&&(t?iu(this,t):this.l.length==0||zc(this.i)||iu(this))};function iu(t,e){var n;e?n=e.m:n=t.V++;const r=Fe(t.F);B(r,"SID",t.J),B(r,"RID",n),B(r,"AID",t.U),Mn(t,r),t.o&&t.s&&Yi(r,t.o,t.s),n=new An(t,t.h,n,t.C+1),t.o===null&&(n.H=t.s),e&&(t.l=e.D.concat(t.l)),e=ou(t,n,1e3),n.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),Ki(t.i,n),qi(n,r,e)}function Mn(t,e){t.j&&Wi({},function(n,r){B(e,r,n)})}function ou(t,e,n){n=Math.min(t.l.length,n);var r=t.j?ee(t.j.Oa,t.j,t):null;e:{var s=t.l;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=s[0].h,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let c=0;c<n;c++){let u=s[c].h;const l=s[c].g;if(u-=i,0>u)i=Math.max(0,s[c].h-100),a=!1;else try{Ig(l,o,"req"+u+"_")}catch{r&&r(l)}}if(a){r=o.join("&");break e}}}return t=t.l.splice(0,n),e.D=t,r}function au(t){t.g||t.u||(t.Y=1,Pi(t.Ga,t),t.A=0)}function eo(t){return t.g||t.u||3<=t.A?!1:(t.Y++,t.u=bn(ee(t.Ga,t),lu(t,t.A)),t.A++,!0)}w.Ga=function(){if(this.u=null,cu(this),this.$&&!(this.L||this.g==null||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=bn(ee(this.bb,this),t)}};w.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,pe(10),Hr(this),cu(this))};function to(t){t.B!=null&&(A.clearTimeout(t.B),t.B=null)}function cu(t){t.g=new An(t,t.h,"rpc",t.Y),t.o===null&&(t.g.H=t.s),t.g.O=0;var e=Fe(t.oa);B(e,"RID","rpc"),B(e,"SID",t.J),B(e,"CI",t.N?"0":"1"),B(e,"AID",t.U),Mn(t,e),B(e,"TYPE","xmlhttp"),t.o&&t.s&&Yi(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var n=t.g;t=t.la,n.K=1,n.v=Vr(Fe(e)),n.s=null,n.U=!0,Mc(n,t)}w.ab=function(){this.v!=null&&(this.v=null,Hr(this),eo(this),pe(19))};function zr(t){t.v!=null&&(A.clearTimeout(t.v),t.v=null)}function uu(t,e){var n=null;if(t.g==e){zr(t),to(t),t.g=null;var r=2}else if(Gi(t.i,e))n=e.D,Kc(t.i,e),r=1;else return;if(t.I=e.N,t.G!=0){if(e.i)if(r==1){n=e.s?e.s.length:0,e=Date.now()-e.F;var s=t.C;r=Dr(),ne(r,new Nc(r,n,e,s)),Wr(t)}else au(t);else if(s=e.o,s==3||s==0&&0<t.I||!(r==1&&Dg(t,e)||r==2&&eo(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),s){case 1:pt(t,5);break;case 4:pt(t,10);break;case 3:pt(t,6);break;default:pt(t,2)}}}function lu(t,e){let n=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(n*=2),n*e}function pt(t,e){if(t.h.info("Error code "+e),e==2){var n=null;t.j&&(n=null);var r=ee(t.jb,t);n||(n=new ft("//www.google.com/images/cleardot.gif"),A.location&&A.location.protocol=="http"||Ur(n,"https"),Vr(n)),Ag(n.toString(),r)}else pe(2);t.G=0,t.j&&t.j.va(e),hu(t),su(t)}w.jb=function(t){t?(this.h.info("Successfully pinged google.com"),pe(2)):(this.h.info("Failed to ping google.com"),pe(1))};function hu(t){t.G=0,t.I=-1,t.j&&((Jc(t.i).length!=0||t.l.length!=0)&&(t.i.i.length=0,gi(t.l),t.l.length=0),t.j.ua())}function du(t,e,n){let r=fg(n);if(r.i!="")e&&Fr(r,e+"."+r.i),$r(r,r.m);else{const s=A.location;r=pg(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,n)}return t.aa&&yi(t.aa,function(s,i){B(r,i,s)}),e=t.D,n=t.sa,e&&n&&B(r,e,n),B(r,"VER",t.ma),Mn(t,r),r}function fu(t,e,n){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ba&&!t.qa?new K(new On({ib:!0})):new K(t.qa),e.L=t.H,e}function pu(){}w=pu.prototype;w.xa=function(){};w.wa=function(){};w.va=function(){};w.ua=function(){};w.Oa=function(){};function Gr(){if(Mt&&!(10<=Number(Wp)))throw Error("Environmental error: no available transport.")}Gr.prototype.g=function(t,e){return new _e(t,e)};function _e(t,e){Q.call(this),this.g=new ru(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!Ar(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Ar(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new $t(this)}te(_e,Q);_e.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,n=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),Pi(ee(t.hb,t,e))),pe(0),t.W=e,t.aa=n||{},t.N=t.X,t.F=du(t,null,t.W),Wr(t)};_e.prototype.close=function(){Qi(this.g)};_e.prototype.u=function(t){if(typeof t=="string"){var e={};e.__data__=t,Zi(this.g,e)}else this.v?(e={},e.__data__=Di(t),Zi(this.g,e)):Zi(this.g,t)};_e.prototype.M=function(){this.g.j=null,delete this.j,Qi(this.g),delete this.g,_e.Z.M.call(this)};function gu(t){$i.call(this);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}te(gu,$i);function mu(){Vi.call(this),this.status=1}te(mu,Vi);function $t(t){this.g=t}te($t,pu);$t.prototype.xa=function(){ne(this.g,"a")};$t.prototype.wa=function(t){ne(this.g,new gu(t))};$t.prototype.va=function(t){ne(this.g,new mu(t))};$t.prototype.ua=function(){ne(this.g,"b")};Gr.prototype.createWebChannel=Gr.prototype.g;_e.prototype.send=_e.prototype.u;_e.prototype.open=_e.prototype.m;_e.prototype.close=_e.prototype.close;Pr.NO_ERROR=0;Pr.TIMEOUT=8;Pr.HTTP_ERROR=6;Oc.COMPLETE="complete";Pc.EventType=In;In.OPEN="a";In.CLOSE="b";In.ERROR="c";In.MESSAGE="d";Q.prototype.listen=Q.prototype.N;K.prototype.listenOnce=K.prototype.O;K.prototype.getLastError=K.prototype.La;K.prototype.getLastErrorCode=K.prototype.Da;K.prototype.getStatus=K.prototype.ba;K.prototype.getResponseJson=K.prototype.Qa;K.prototype.getResponseText=K.prototype.ga;K.prototype.send=K.prototype.ea;var Pg=function(){return new Gr},Lg=function(){return Dr()},no=Pr,Mg=Oc,xg=lt,yu={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},Ug=On,Kr=Pc,Fg=K;const vu="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}we.UNAUTHENTICATED=new we(null),we.GOOGLE_CREDENTIALS=new we("google-credentials-uid"),we.FIRST_PARTY=new we("first-party-uid"),we.MOCK_USER=new we("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vt="9.6.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt=new ai("@firebase/firestore");function wu(){return gt.logLevel}function b(t,...e){if(gt.logLevel<=P.DEBUG){const n=e.map(ro);gt.debug(`Firestore (${Vt}): ${t}`,...n)}}function Je(t,...e){if(gt.logLevel<=P.ERROR){const n=e.map(ro);gt.error(`Firestore (${Vt}): ${t}`,...n)}}function Eu(t,...e){if(gt.logLevel<=P.WARN){const n=e.map(ro);gt.warn(`Firestore (${Vt}): ${t}`,...n)}}function ro(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(t="Unexpected state"){const e=`FIRESTORE (${Vt}) INTERNAL ASSERTION FAILED: `+t;throw Je(e),new Error(e)}function $(t,e){t||k()}function C(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class E extends Error{constructor(e,n){super(n),this.code=e,this.message=n,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Vg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(we.UNAUTHENTICATED))}shutdown(){}}class jg{constructor(e){this.t=e,this.currentUser=we.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new Ve;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ve,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{b("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(b("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ve)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(b("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?($(typeof r.accessToken=="string"),new $g(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return $(e===null||typeof e=="string"),new we(e)}}class Bg{constructor(e,n,r){this.type="FirstParty",this.user=we.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",n);const s=e.auth.getAuthHeaderValueForFirstParty([]);s&&this.headers.set("Authorization",s),r&&this.headers.set("X-Goog-Iam-Authorization-Token",r)}}class qg{constructor(e,n,r){this.h=e,this.l=n,this.m=r}getToken(){return Promise.resolve(new Bg(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(we.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Hg{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Wg{constructor(e){this.g=e,this.forceRefresh=!1,this.appCheck=null}start(e,n){this.o=s=>{e.enqueueRetryable(()=>(i=>(i.error!=null&&b("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`),n(i.token)))(s))};const r=s=>{b("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.appCheck.addTokenListener(this.o)};this.g.onInit(s=>r(s)),setTimeout(()=>{if(!this.appCheck){const s=this.g.getImmediate({optional:!0});s?r(s):b("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?($(typeof n.token=="string"),new Hg(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.p(r),this.T=r=>n.writeSequenceNumber(r))}p(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.T&&this.T(e),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(t){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */so.I=-1;class _u{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=zg(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function F(t,e){return t<e?-1:t>e?1:0}function jt(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new E(p.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new E(p.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new E(p.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new E(p.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Te.fromMillis(Date.now())}static fromDate(e){return Te.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Te(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?F(this.nanoseconds,e.nanoseconds):F(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.timestamp=e}static fromTimestamp(e){return new x(e)}static min(){return new x(new Te(0,0))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tu(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function mt(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function bu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,n,r){n===void 0?n=0:n>e.length&&k(),r===void 0?r=e.length-n:r>e.length-n&&k(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return xn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof xn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class q extends xn{construct(e,n,r){return new q(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new E(p.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new q(n)}static emptyPath(){return new q([])}}const Gg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ee extends xn{construct(e,n,r){return new Ee(e,n,r)}static isValidIdentifier(e){return Gg.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ee.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ee(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new E(p.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const a=e[s];if(a==="\\"){if(s+1===e.length)throw new E(p.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new E(p.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new E(p.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ee(n)}static emptyPath(){return new Ee([])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e){this.fields=e,e.sort(Ee.comparator)}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return jt(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e){this.binaryString=e}static fromBase64String(e){const n=atob(e);return new ae(n)}static fromUint8Array(e){const n=function(r){let s="";for(let i=0;i<r.length;++i)s+=String.fromCharCode(r[i]);return s}(e);return new ae(n)}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return F(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ae.EMPTY_BYTE_STRING=new ae("");const Kg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Xe(t){if($(!!t),typeof t=="string"){let e=0;const n=Kg.exec(t);if($(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:J(t.seconds),nanos:J(t.nanos)}}function J(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Bt(t){return typeof t=="string"?ae.fromBase64String(t):ae.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Au(t){const e=t.mapValue.fields.__previous_value__;return Iu(e)?Au(e):e}function Fn(t){const e=Xe(t.mapValue.fields.__local_write_time__.timestampValue);return new Te(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qt(t){return t==null}function Jr(t){return t===0&&1/t==-1/0}function Jg(t){return typeof t=="number"&&Number.isInteger(t)&&!Jr(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e){this.path=e}static fromPath(e){return new I(q.fromString(e))}static fromName(e){return new I(q.fromString(e).popFirst(5))}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}isEqual(e){return e!==null&&q.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return q.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new I(new q(e.slice()))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Iu(t)?4:10:k()}function Pe(t,e){const n=yt(t);if(n!==yt(e))return!1;switch(n){case 0:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Fn(t).isEqual(Fn(e));case 3:return function(r,s){if(typeof r.timestampValue=="string"&&typeof s.timestampValue=="string"&&r.timestampValue.length===s.timestampValue.length)return r.timestampValue===s.timestampValue;const i=Xe(r.timestampValue),o=Xe(s.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(r,s){return Bt(r.bytesValue).isEqual(Bt(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(r,s){return J(r.geoPointValue.latitude)===J(s.geoPointValue.latitude)&&J(r.geoPointValue.longitude)===J(s.geoPointValue.longitude)}(t,e);case 2:return function(r,s){if("integerValue"in r&&"integerValue"in s)return J(r.integerValue)===J(s.integerValue);if("doubleValue"in r&&"doubleValue"in s){const i=J(r.doubleValue),o=J(s.doubleValue);return i===o?Jr(i)===Jr(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return jt(t.arrayValue.values||[],e.arrayValue.values||[],Pe);case 10:return function(r,s){const i=r.mapValue.fields||{},o=s.mapValue.fields||{};if(Tu(i)!==Tu(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!Pe(i[a],o[a])))return!1;return!0}(t,e);default:return k()}}function $n(t,e){return(t.values||[]).find(n=>Pe(n,e))!==void 0}function Ht(t,e){const n=yt(t),r=yt(e);if(n!==r)return F(n,r);switch(n){case 0:return 0;case 1:return F(t.booleanValue,e.booleanValue);case 2:return function(s,i){const o=J(s.integerValue||s.doubleValue),a=J(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return Su(t.timestampValue,e.timestampValue);case 4:return Su(Fn(t),Fn(e));case 5:return F(t.stringValue,e.stringValue);case 6:return function(s,i){const o=Bt(s),a=Bt(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(s,i){const o=s.split("/"),a=i.split("/");for(let c=0;c<o.length&&c<a.length;c++){const u=F(o[c],a[c]);if(u!==0)return u}return F(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,i){const o=F(J(s.latitude),J(i.latitude));return o!==0?o:F(J(s.longitude),J(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(s,i){const o=s.values||[],a=i.values||[];for(let c=0;c<o.length&&c<a.length;++c){const u=Ht(o[c],a[c]);if(u)return u}return F(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(s,i){const o=s.fields||{},a=Object.keys(o),c=i.fields||{},u=Object.keys(c);a.sort(),u.sort();for(let l=0;l<a.length&&l<u.length;++l){const h=F(a[l],u[l]);if(h!==0)return h;const d=Ht(o[a[l]],c[u[l]]);if(d!==0)return d}return F(a.length,u.length)}(t.mapValue,e.mapValue);default:throw k()}}function Su(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return F(t,e);const n=Xe(t),r=Xe(e),s=F(n.seconds,r.seconds);return s!==0?s:F(n.nanos,r.nanos)}function io(t){return oo(t)}function oo(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(r){const s=Xe(r);return`time(${s.seconds},${s.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Bt(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,I.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(r){let s="[",i=!0;for(const o of r.values||[])i?i=!1:s+=",",s+=oo(o);return s+"]"}(t.arrayValue):"mapValue"in t?function(r){const s=Object.keys(r.fields||{}).sort();let i="{",o=!0;for(const a of s)o?o=!1:i+=",",i+=`${a}:${oo(r.fields[a])}`;return i+"}"}(t.mapValue):k();var e,n}function ku(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function ao(t){return!!t&&"integerValue"in t}function co(t){return!!t&&"arrayValue"in t}function Cu(t){return!!t&&"nullValue"in t}function Ru(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Xr(t){return!!t&&"mapValue"in t}function Vn(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return mt(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Vn(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Vn(t.arrayValue.values[n]);return e}return Object.assign({},t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.value=e}static empty(){return new be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Xr(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Vn(n)}setAll(e){let n=Ee.emptyPath(),r={},s=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=a.popLast()}o?r[a.lastSegment()]=Vn(o):s.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Xr(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Pe(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Xr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){mt(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new be(Vn(this.value))}}function Nu(t){const e=[];return mt(t.fields,(n,r)=>{const s=new Ee([n]);if(Xr(r)){const i=Nu(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Un(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,n,r,s,i){this.key=e,this.documentType=n,this.version=r,this.data=s,this.documentState=i}static newInvalidDocument(e){return new ce(e,0,x.min(),be.empty(),0)}static newFoundDocument(e,n,r){return new ce(e,1,n,r,0)}static newNoDocument(e,n){return new ce(e,2,n,be.empty(),0)}static newUnknownDocument(e,n){return new ce(e,3,n,be.empty(),2)}convertToFoundDocument(e,n){return this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ce&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}clone(){return new ce(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e,n=null,r=[],s=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.R=null}}function Ou(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Xg(t,e,n,r,s,i,o)}function uo(t){const e=C(t);if(e.R===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Qg(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),qt(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=Yr(e.startAt)),e.endAt&&(n+="|ub:",n+=Yr(e.endAt)),e.R=n}return e.R}function Yg(t){let e=t.path.canonicalString();return t.collectionGroup!==null&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map(n=>{return`${(r=n).field.canonicalString()} ${r.op} ${io(r.value)}`;var r}).join(", ")}]`),qt(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map(n=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(n)).join(", ")}]`),t.startAt&&(e+=", startAt: "+Yr(t.startAt)),t.endAt&&(e+=", endAt: "+Yr(t.endAt)),`Target(${e})`}function lo(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let s=0;s<t.orderBy.length;s++)if(!om(t.orderBy[s],e.orderBy[s]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let s=0;s<t.filters.length;s++)if(n=t.filters[s],r=e.filters[s],n.op!==r.op||!n.field.isEqual(r.field)||!Pe(n.value,r.value))return!1;var n,r;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Lu(t.startAt,e.startAt)&&Lu(t.endAt,e.endAt)}function ho(t){return I.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}class ge extends class{}{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.P(e,n,r):new Zg(e,n,r):n==="array-contains"?new nm(e,r):n==="in"?new rm(e,r):n==="not-in"?new sm(e,r):n==="array-contains-any"?new im(e,r):new ge(e,n,r)}static P(e,n,r){return n==="in"?new em(e,r):new tm(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.v(Ht(n,this.value)):n!==null&&yt(this.value)===yt(n)&&this.v(Ht(n,this.value))}v(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return k()}}V(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}function Qg(t){return t.field.canonicalString()+t.op.toString()+io(t.value)}class Zg extends ge{constructor(e,n,r){super(e,n,r),this.key=I.fromName(r.referenceValue)}matches(e){const n=I.comparator(e.key,this.key);return this.v(n)}}class em extends ge{constructor(e,n){super(e,"in",n),this.keys=Du("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class tm extends ge{constructor(e,n){super(e,"not-in",n),this.keys=Du("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Du(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>I.fromName(r.referenceValue))}class nm extends ge{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return co(n)&&$n(n.arrayValue,this.value)}}class rm extends ge{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&$n(this.value.arrayValue,n)}}class sm extends ge{constructor(e,n){super(e,"not-in",n)}matches(e){if($n(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!$n(this.value.arrayValue,n)}}class im extends ge{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!co(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>$n(this.value.arrayValue,r))}}class fo{constructor(e,n){this.position=e,this.before=n}}function Yr(t){return`${t.before?"b":"a"}:${t.position.map(e=>io(e)).join(",")}`}class Wt{constructor(e,n="asc"){this.field=e,this.dir=n}}function om(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}function Pu(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=I.comparator(I.fromName(o.referenceValue),n.key):r=Ht(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return t.before?r<=0:r<0}function Lu(t,e){if(t===null)return e===null;if(e===null||t.before!==e.before||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Pe(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,n=null,r=[],s=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.S=null,this.D=null,this.startAt,this.endAt}}function am(t,e,n,r,s,i,o,a){return new zt(t,e,n,r,s,i,o,a)}function Qr(t){return new zt(t)}function Zr(t){return!qt(t.limit)&&t.limitType==="F"}function es(t){return!qt(t.limit)&&t.limitType==="L"}function po(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function go(t){for(const e of t.filters)if(e.V())return e.field;return null}function Mu(t){return t.collectionGroup!==null}function jn(t){const e=C(t);if(e.S===null){e.S=[];const n=go(e),r=po(e);if(n!==null&&r===null)n.isKeyField()||e.S.push(new Wt(n)),e.S.push(new Wt(Ee.keyField(),"asc"));else{let s=!1;for(const i of e.explicitOrderBy)e.S.push(i),i.field.isKeyField()&&(s=!0);if(!s){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.S.push(new Wt(Ee.keyField(),i))}}}return e.S}function vt(t){const e=C(t);if(!e.D)if(e.limitType==="F")e.D=Ou(e.path,e.collectionGroup,jn(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of jn(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new Wt(i.field,o))}const r=e.endAt?new fo(e.endAt.position,!e.endAt.before):null,s=e.startAt?new fo(e.startAt.position,!e.startAt.before):null;e.D=Ou(e.path,e.collectionGroup,n,e.filters,e.limit,r,s)}return e.D}function cm(t,e,n){return new zt(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ts(t,e){return lo(vt(t),vt(e))&&t.limitType===e.limitType}function xu(t){return`${uo(vt(t))}|lt:${t.limitType}`}function mo(t){return`Query(target=${Yg(vt(t))}; limitType=${t.limitType})`}function ns(t,e){return e.isFoundDocument()&&function(n,r){const s=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):I.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(t,e)&&function(n,r){for(const s of n.explicitOrderBy)if(!s.field.isKeyField()&&r.data.field(s.field)===null)return!1;return!0}(t,e)&&function(n,r){for(const s of n.filters)if(!s.matches(r))return!1;return!0}(t,e)&&function(n,r){return!(n.startAt&&!Pu(n.startAt,jn(n),r)||n.endAt&&Pu(n.endAt,jn(n),r))}(t,e)}function Uu(t){return(e,n)=>{let r=!1;for(const s of jn(t)){const i=um(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function um(t,e,n){const r=t.field.isKeyField()?I.comparator(e.key,n.key):function(s,i,o){const a=i.data.field(s),c=o.data.field(s);return a!==null&&c!==null?Ht(a,c):k()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return k()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fu(t,e){if(t.C){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Jr(e)?"-0":e}}function $u(t){return{integerValue:""+t}}function lm(t,e){return Jg(e)?$u(e):Fu(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(){this._=void 0}}function hm(t,e,n){return t instanceof Bn?function(r,s){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return s&&(i.fields.__previous_value__=s),{mapValue:i}}(n,e):t instanceof Gt?ju(t,e):t instanceof Kt?Bu(t,e):function(r,s){const i=Vu(r,s),o=qu(i)+qu(r.N);return ao(i)&&ao(r.N)?$u(o):Fu(r.k,o)}(t,e)}function dm(t,e,n){return t instanceof Gt?ju(t,e):t instanceof Kt?Bu(t,e):n}function Vu(t,e){return t instanceof ss?ao(n=e)||function(r){return!!r&&"doubleValue"in r}(n)?e:{integerValue:0}:null;var n}class Bn extends rs{}class Gt extends rs{constructor(e){super(),this.elements=e}}function ju(t,e){const n=Hu(e);for(const r of t.elements)n.some(s=>Pe(s,r))||n.push(r);return{arrayValue:{values:n}}}class Kt extends rs{constructor(e){super(),this.elements=e}}function Bu(t,e){let n=Hu(e);for(const r of t.elements)n=n.filter(s=>!Pe(s,r));return{arrayValue:{values:n}}}class ss extends rs{constructor(e,n){super(),this.k=e,this.N=n}}function qu(t){return J(t.integerValue||t.doubleValue)}function Hu(t){return co(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e,n){this.field=e,this.transform=n}}function fm(t,e){return t.field.isEqual(e.field)&&function(n,r){return n instanceof Gt&&r instanceof Gt||n instanceof Kt&&r instanceof Kt?jt(n.elements,r.elements,Pe):n instanceof ss&&r instanceof ss?Pe(n.N,r.N):n instanceof Bn&&r instanceof Bn}(t.transform,e.transform)}class pm{constructor(e,n){this.version=e,this.transformResults=n}}class je{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new je}static exists(e){return new je(void 0,e)}static updateTime(e){return new je(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function is(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class os{}function gm(t,e,n){t instanceof as?function(r,s,i){const o=r.value.clone(),a=Ku(r.fieldTransforms,s,i.transformResults);o.setAll(a),s.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof wt?function(r,s,i){if(!is(r.precondition,s))return void s.convertToUnknownDocument(i.version);const o=Ku(r.fieldTransforms,s,i.transformResults),a=s.data;a.setAll(Gu(r)),a.setAll(o),s.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(r,s,i){s.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function vo(t,e,n){t instanceof as?function(r,s,i){if(!is(r.precondition,s))return;const o=r.value.clone(),a=Ju(r.fieldTransforms,i,s);o.setAll(a),s.convertToFoundDocument(zu(s),o).setHasLocalMutations()}(t,e,n):t instanceof wt?function(r,s,i){if(!is(r.precondition,s))return;const o=Ju(r.fieldTransforms,i,s),a=s.data;a.setAll(Gu(r)),a.setAll(o),s.convertToFoundDocument(zu(s),a).setHasLocalMutations()}(t,e,n):function(r,s){is(r.precondition,s)&&s.convertToNoDocument(x.min())}(t,e)}function mm(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=Vu(r.transform,s||null);i!=null&&(n==null&&(n=be.empty()),n.set(r.field,i))}return n||null}function Wu(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&jt(n,r,(s,i)=>fm(s,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}function zu(t){return t.isFoundDocument()?t.version:x.min()}class as extends os{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}}class wt extends os{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}}function Gu(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Ku(t,e,n){const r=new Map;$(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,a=e.data.field(i.field);r.set(i.field,dm(o,a,n[s]))}return r}function Ju(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,hm(i,o,e))}return r}class Xu extends os{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}}class ym extends os{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e){this.count=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X,O;function wm(t){switch(t){default:return k();case p.CANCELLED:case p.UNKNOWN:case p.DEADLINE_EXCEEDED:case p.RESOURCE_EXHAUSTED:case p.INTERNAL:case p.UNAVAILABLE:case p.UNAUTHENTICATED:return!1;case p.INVALID_ARGUMENT:case p.NOT_FOUND:case p.ALREADY_EXISTS:case p.PERMISSION_DENIED:case p.FAILED_PRECONDITION:case p.ABORTED:case p.OUT_OF_RANGE:case p.UNIMPLEMENTED:case p.DATA_LOSS:return!0}}function Yu(t){if(t===void 0)return Je("GRPC error has no .code"),p.UNKNOWN;switch(t){case X.OK:return p.OK;case X.CANCELLED:return p.CANCELLED;case X.UNKNOWN:return p.UNKNOWN;case X.DEADLINE_EXCEEDED:return p.DEADLINE_EXCEEDED;case X.RESOURCE_EXHAUSTED:return p.RESOURCE_EXHAUSTED;case X.INTERNAL:return p.INTERNAL;case X.UNAVAILABLE:return p.UNAVAILABLE;case X.UNAUTHENTICATED:return p.UNAUTHENTICATED;case X.INVALID_ARGUMENT:return p.INVALID_ARGUMENT;case X.NOT_FOUND:return p.NOT_FOUND;case X.ALREADY_EXISTS:return p.ALREADY_EXISTS;case X.PERMISSION_DENIED:return p.PERMISSION_DENIED;case X.FAILED_PRECONDITION:return p.FAILED_PRECONDITION;case X.ABORTED:return p.ABORTED;case X.OUT_OF_RANGE:return p.OUT_OF_RANGE;case X.UNIMPLEMENTED:return p.UNIMPLEMENTED;case X.DATA_LOSS:return p.DATA_LOSS;default:return k()}}(O=X||(X={}))[O.OK=0]="OK",O[O.CANCELLED=1]="CANCELLED",O[O.UNKNOWN=2]="UNKNOWN",O[O.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",O[O.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",O[O.NOT_FOUND=5]="NOT_FOUND",O[O.ALREADY_EXISTS=6]="ALREADY_EXISTS",O[O.PERMISSION_DENIED=7]="PERMISSION_DENIED",O[O.UNAUTHENTICATED=16]="UNAUTHENTICATED",O[O.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",O[O.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",O[O.ABORTED=10]="ABORTED",O[O.OUT_OF_RANGE=11]="OUT_OF_RANGE",O[O.UNIMPLEMENTED=12]="UNIMPLEMENTED",O[O.INTERNAL=13]="INTERNAL",O[O.UNAVAILABLE=14]="UNAVAILABLE",O[O.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,n){this.comparator=e,this.root=n||re.EMPTY}insert(e,n){return new ue(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,re.BLACK,null,null))}remove(e){return new ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,re.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new cs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new cs(this.root,e,this.comparator,!1)}getReverseIterator(){return new cs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new cs(this.root,e,this.comparator,!0)}}class cs{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class re{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r!=null?r:re.RED,this.left=s!=null?s:re.EMPTY,this.right=i!=null?i:re.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new re(e!=null?e:this.key,n!=null?n:this.value,r!=null?r:this.color,s!=null?s:this.left,i!=null?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return re.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return re.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,re.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw k();const e=this.left.check();if(e!==this.right.check())throw k();return e+(this.isRed()?0:1)}}re.EMPTY=null,re.RED=!0,re.BLACK=!1;re.EMPTY=new class{constructor(){this.size=0}get key(){throw k()}get value(){throw k()}get color(){throw k()}get left(){throw k()}get right(){throw k()}copy(t,e,n,r,s){return this}insert(t,e,n){return new re(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.comparator=e,this.data=new ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Qu(this.data.getIterator())}getIteratorFrom(e){return new Qu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof se)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new se(this.comparator);return n.data=e,n}}class Qu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Em=new ue(I.comparator);function Et(){return Em}const _m=new ue(I.comparator);function wo(){return _m}const Tm=new ue(I.comparator);function bm(){return Tm}const Im=new se(I.comparator);function j(...t){let e=Im;for(const n of t)e=e.add(n);return e}const Am=new se(F);function Zu(){return Am}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n){const r=new Map;return r.set(e,qn.createSynthesizedTargetChangeForCurrentChange(e,n)),new us(x.min(),r,Zu(),Et(),j())}}class qn{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n){return new qn(ae.EMPTY_BYTE_STRING,n,j(),j(),j())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,n,r,s){this.$=e,this.removedTargetIds=n,this.key=r,this.F=s}}class el{constructor(e,n){this.targetId=e,this.O=n}}class tl{constructor(e,n,r=ae.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class nl{constructor(){this.M=0,this.L=sl(),this.B=ae.EMPTY_BYTE_STRING,this.U=!1,this.q=!0}get current(){return this.U}get resumeToken(){return this.B}get K(){return this.M!==0}get j(){return this.q}W(e){e.approximateByteSize()>0&&(this.q=!0,this.B=e)}G(){let e=j(),n=j(),r=j();return this.L.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:k()}}),new qn(this.B,this.U,e,n,r)}H(){this.q=!1,this.L=sl()}J(e,n){this.q=!0,this.L=this.L.insert(e,n)}Y(e){this.q=!0,this.L=this.L.remove(e)}X(){this.M+=1}Z(){this.M-=1}tt(){this.q=!0,this.U=!0}}class Sm{constructor(e){this.et=e,this.nt=new Map,this.st=Et(),this.it=rl(),this.rt=new se(F)}ot(e){for(const n of e.$)e.F&&e.F.isFoundDocument()?this.at(n,e.F):this.ct(n,e.key,e.F);for(const n of e.removedTargetIds)this.ct(n,e.key,e.F)}ut(e){this.forEachTarget(e,n=>{const r=this.ht(n);switch(e.state){case 0:this.lt(n)&&r.W(e.resumeToken);break;case 1:r.Z(),r.K||r.H(),r.W(e.resumeToken);break;case 2:r.Z(),r.K||this.removeTarget(n);break;case 3:this.lt(n)&&(r.tt(),r.W(e.resumeToken));break;case 4:this.lt(n)&&(this.ft(n),r.W(e.resumeToken));break;default:k()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.nt.forEach((r,s)=>{this.lt(s)&&n(s)})}dt(e){const n=e.targetId,r=e.O.count,s=this.wt(n);if(s){const i=s.target;if(ho(i))if(r===0){const o=new I(i.path);this.ct(n,o,ce.newNoDocument(o,x.min()))}else $(r===1);else this._t(n)!==r&&(this.ft(n),this.rt=this.rt.add(n))}}gt(e){const n=new Map;this.nt.forEach((i,o)=>{const a=this.wt(o);if(a){if(i.current&&ho(a.target)){const c=new I(a.target.path);this.st.get(c)!==null||this.yt(o,c)||this.ct(o,c,ce.newNoDocument(c,e))}i.j&&(n.set(o,i.G()),i.H())}});let r=j();this.it.forEach((i,o)=>{let a=!0;o.forEachWhile(c=>{const u=this.wt(c);return!u||u.purpose===2||(a=!1,!1)}),a&&(r=r.add(i))});const s=new us(e,n,this.rt,this.st,r);return this.st=Et(),this.it=rl(),this.rt=new se(F),s}at(e,n){if(!this.lt(e))return;const r=this.yt(e,n.key)?2:0;this.ht(e).J(n.key,r),this.st=this.st.insert(n.key,n),this.it=this.it.insert(n.key,this.Tt(n.key).add(e))}ct(e,n,r){if(!this.lt(e))return;const s=this.ht(e);this.yt(e,n)?s.J(n,1):s.Y(n),this.it=this.it.insert(n,this.Tt(n).delete(e)),r&&(this.st=this.st.insert(n,r))}removeTarget(e){this.nt.delete(e)}_t(e){const n=this.ht(e).G();return this.et.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}X(e){this.ht(e).X()}ht(e){let n=this.nt.get(e);return n||(n=new nl,this.nt.set(e,n)),n}Tt(e){let n=this.it.get(e);return n||(n=new se(F),this.it=this.it.insert(e,n)),n}lt(e){const n=this.wt(e)!==null;return n||b("WatchChangeAggregator","Detected inactive target",e),n}wt(e){const n=this.nt.get(e);return n&&n.K?null:this.et.Et(e)}ft(e){this.nt.set(e,new nl),this.et.getRemoteKeysForTarget(e).forEach(n=>{this.ct(e,n,null)})}yt(e,n){return this.et.getRemoteKeysForTarget(e).has(n)}}function rl(){return new ue(I.comparator)}function sl(){return new ue(I.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const km=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),Cm=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))();class Rm{constructor(e,n){this.databaseId=e,this.C=n}}function hs(t,e){return t.C?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function il(t,e){return t.C?e.toBase64():e.toUint8Array()}function Nm(t,e){return hs(t,e.toTimestamp())}function Be(t){return $(!!t),x.fromTimestamp(function(e){const n=Xe(e);return new Te(n.seconds,n.nanos)}(t))}function Eo(t,e){return function(n){return new q(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function ol(t){const e=q.fromString(t);return $(dl(e)),e}function _o(t,e){return Eo(t.databaseId,e.path)}function To(t,e){const n=ol(e);if(n.get(1)!==t.databaseId.projectId)throw new E(p.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new E(p.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new I(al(n))}function bo(t,e){return Eo(t.databaseId,e)}function Om(t){const e=ol(t);return e.length===4?q.emptyPath():al(e)}function Io(t){return new q(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function al(t){return $(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function cl(t,e,n){return{name:_o(t,e),fields:n.value.mapValue.fields}}function Dm(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:k()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,u){return c.C?($(u===void 0||typeof u=="string"),ae.fromBase64String(u||"")):($(u===void 0||u instanceof Uint8Array),ae.fromUint8Array(u||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const u=c.code===void 0?p.UNKNOWN:Yu(c.code);return new E(u,c.message||"")}(o);n=new tl(r,s,i,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=To(t,r.document.name),i=Be(r.document.updateTime),o=new be({mapValue:{fields:r.document.fields}}),a=ce.newFoundDocument(s,i,o),c=r.targetIds||[],u=r.removedTargetIds||[];n=new ls(c,u,a.key,a)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=To(t,r.document),i=r.readTime?Be(r.readTime):x.min(),o=ce.newNoDocument(s,i),a=r.removedTargetIds||[];n=new ls([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=To(t,r.document),i=r.removedTargetIds||[];n=new ls([],i,s,null)}else{if(!("filter"in e))return k();{e.filter;const r=e.filter;r.targetId;const s=r.count||0,i=new vm(s),o=r.targetId;n=new el(o,i)}}return n}function Pm(t,e){let n;if(e instanceof as)n={update:cl(t,e.key,e.value)};else if(e instanceof Xu)n={delete:_o(t,e.key)};else if(e instanceof wt)n={update:cl(t,e.key,e.data),updateMask:qm(e.fieldMask)};else{if(!(e instanceof ym))return k();n={verify:_o(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,i){const o=i.transform;if(o instanceof Bn)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof Gt)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof Kt)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof ss)return{fieldPath:i.field.canonicalString(),increment:o.N};throw k()}(0,r))),e.precondition.isNone||(n.currentDocument=function(r,s){return s.updateTime!==void 0?{updateTime:Nm(r,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:k()}(t,e.precondition)),n}function Lm(t,e){return t&&t.length>0?($(e!==void 0),t.map(n=>function(r,s){let i=r.updateTime?Be(r.updateTime):Be(s);return i.isEqual(x.min())&&(i=Be(s)),new pm(i,r.transformResults||[])}(n,e))):[]}function Mm(t,e){return{documents:[bo(t,e.path)]}}function xm(t,e){const n={structuredQuery:{}},r=e.path;e.collectionGroup!==null?(n.parent=bo(t,r),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=bo(t,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(a){if(a.length===0)return;const c=a.map(u=>function(l){if(l.op==="=="){if(Ru(l.value))return{unaryFilter:{field:Jt(l.field),op:"IS_NAN"}};if(Cu(l.value))return{unaryFilter:{field:Jt(l.field),op:"IS_NULL"}}}else if(l.op==="!="){if(Ru(l.value))return{unaryFilter:{field:Jt(l.field),op:"IS_NOT_NAN"}};if(Cu(l.value))return{unaryFilter:{field:Jt(l.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Jt(l.field),op:Vm(l.op),value:l.value}}}(u));return c.length===1?c[0]:{compositeFilter:{op:"AND",filters:c}}}(e.filters);s&&(n.structuredQuery.where=s);const i=function(a){if(a.length!==0)return a.map(c=>function(u){return{field:Jt(u.field),direction:$m(u.dir)}}(c))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=function(a,c){return a.C||qt(c)?c:{value:c}}(t,e.limit);return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=ll(e.startAt)),e.endAt&&(n.structuredQuery.endAt=ll(e.endAt)),n}function Um(t){let e=Om(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){$(r===1);const l=n.from[0];l.allDescendants?s=l.collectionId:e=e.child(l.collectionId)}let i=[];n.where&&(i=ul(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(l=>function(h){return new Wt(Xt(h.field),function(d){switch(d){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(l)));let a=null;n.limit&&(a=function(l){let h;return h=typeof l=="object"?l.value:l,qt(h)?null:h}(n.limit));let c=null;n.startAt&&(c=hl(n.startAt));let u=null;return n.endAt&&(u=hl(n.endAt)),am(e,s,o,i,a,"F",c,u)}function Fm(t,e){const n=function(r,s){switch(s){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return k()}}(0,e.purpose);return n==null?null:{"goog-listen-tags":n}}function ul(t){return t?t.unaryFilter!==void 0?[Bm(t)]:t.fieldFilter!==void 0?[jm(t)]:t.compositeFilter!==void 0?t.compositeFilter.filters.map(e=>ul(e)).reduce((e,n)=>e.concat(n)):k():[]}function ll(t){return{before:t.before,values:t.position}}function hl(t){const e=!!t.before,n=t.values||[];return new fo(n,e)}function $m(t){return km[t]}function Vm(t){return Cm[t]}function Jt(t){return{fieldPath:t.canonicalString()}}function Xt(t){return Ee.fromServerFormat(t.fieldPath)}function jm(t){return ge.create(Xt(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return k()}}(t.fieldFilter.op),t.fieldFilter.value)}function Bm(t){switch(t.unaryFilter.op){case"IS_NAN":const e=Xt(t.unaryFilter.field);return ge.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=Xt(t.unaryFilter.field);return ge.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Xt(t.unaryFilter.field);return ge.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Xt(t.unaryFilter.field);return ge.create(s,"!=",{nullValue:"NULL_VALUE"});default:return k()}}function qm(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function dl(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}const Hm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Wm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&k(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new y((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof y?n:y.resolve(n)}catch(n){return y.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):y.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):y.reject(n)}static resolve(e){return new y((n,r)=>{n(e)})}static reject(e){return new y((n,r)=>{r(e)})}static waitFor(e){return new y((n,r)=>{let s=0,i=0,o=!1;e.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=y.resolve(!1);for(const r of e)n=n.next(s=>s?y.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}}function Hn(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&gm(i,e,r[s])}}applyToLocalView(e){for(const n of this.baseMutations)n.key.isEqual(e.key)&&vo(n,e,this.localWriteTime);for(const n of this.mutations)n.key.isEqual(e.key)&&vo(n,e,this.localWriteTime)}applyToLocalDocumentSet(e){this.mutations.forEach(n=>{const r=e.get(n.key),s=r;this.applyToLocalView(s),r.isValidDocument()||s.convertToNoDocument(x.min())})}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),j())}isEqual(e){return this.batchId===e.batchId&&jt(this.mutations,e.mutations,(n,r)=>Wu(n,r))&&jt(this.baseMutations,e.baseMutations,(n,r)=>Wu(n,r))}}class Ao{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){$(e.mutations.length===r.length);let s=bm();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Ao(e,n,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,n,r,s,i=x.min(),o=x.min(),a=ae.EMPTY_BYTE_STRING){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a}withSequenceNumber(e){return new _t(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,n){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(e){this.Gt=e}}function Km(t){const e=Um({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?cm(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(){this.zt=new Xm}addToCollectionParentIndex(e,n){return this.zt.add(n),y.resolve()}getCollectionParents(e,n){return y.resolve(this.zt.getEntries(n))}}class Xm{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new se(q.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new se(q.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e){this.se=e}next(){return this.se+=2,this.se}static ie(){return new Yt(0)}static re(){return new Yt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wn(t){if(t.code!==p.FAILED_PRECONDITION||t.message!==Hm)throw t;b("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={}}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s!==void 0){for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n])}else this.inner[r]=[[e,n]]}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),!0;return!1}forEach(e){mt(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return bu(this.inner)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(){this.changes=new zn(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}getReadTime(e){const n=this.changes.get(e);return n?n.readTime:x.min()}addEntry(e,n){this.assertNotApplied(),this.changes.set(e.key,{document:e,readTime:n})}removeEntry(e,n=null){this.assertNotApplied(),this.changes.set(e,{document:ce.newInvalidDocument(e),readTime:n})}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?y.resolve(r.document):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,n,r){this.Je=e,this.An=n,this.Jt=r}Rn(e,n){return this.An.getAllMutationBatchesAffectingDocumentKey(e,n).next(r=>this.Pn(e,n,r))}Pn(e,n,r){return this.Je.getEntry(e,n).next(s=>{for(const i of r)i.applyToLocalView(s);return s})}bn(e,n){e.forEach((r,s)=>{for(const i of n)i.applyToLocalView(s)})}vn(e,n){return this.Je.getEntries(e,n).next(r=>this.Vn(e,r).next(()=>r))}Vn(e,n){return this.An.getAllMutationBatchesAffectingDocumentKeys(e,n).next(r=>this.bn(n,r))}getDocumentsMatchingQuery(e,n,r){return function(s){return I.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}(n)?this.Sn(e,n.path):Mu(n)?this.Dn(e,n,r):this.Cn(e,n,r)}Sn(e,n){return this.Rn(e,new I(n)).next(r=>{let s=wo();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}Dn(e,n,r){const s=n.collectionGroup;let i=wo();return this.Jt.getCollectionParents(e,s).next(o=>y.forEach(o,a=>{const c=function(u,l){return new zt(l,null,u.explicitOrderBy.slice(),u.filters.slice(),u.limit,u.limitType,u.startAt,u.endAt)}(n,a.child(s));return this.Cn(e,c,r).next(u=>{u.forEach((l,h)=>{i=i.insert(l,h)})})}).next(()=>i))}Cn(e,n,r){let s,i;return this.Je.getDocumentsMatchingQuery(e,n,r).next(o=>(s=o,this.An.getAllMutationBatchesAffectingQuery(e,n))).next(o=>(i=o,this.Nn(e,i,s).next(a=>{s=a;for(const c of i)for(const u of c.mutations){const l=u.key;let h=s.get(l);h==null&&(h=ce.newInvalidDocument(l),s=s.insert(l,h)),vo(u,h,c.localWriteTime),h.isFoundDocument()||(s=s.remove(l))}}))).next(()=>(s.forEach((o,a)=>{ns(n,a)||(s=s.remove(o))}),s))}Nn(e,n,r){let s=j();for(const o of n)for(const a of o.mutations)a instanceof wt&&r.get(a.key)===null&&(s=s.add(a.key));let i=r;return this.Je.getEntries(e,s).next(o=>(o.forEach((a,c)=>{c.isFoundDocument()&&(i=i.insert(a,c))}),i))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.kn=r,this.xn=s}static $n(e,n){let r=j(),s=j();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new So(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{Fn(e){this.On=e}getDocumentsMatchingQuery(e,n,r,s){return function(i){return i.filters.length===0&&i.limit===null&&i.startAt==null&&i.endAt==null&&(i.explicitOrderBy.length===0||i.explicitOrderBy.length===1&&i.explicitOrderBy[0].field.isKeyField())}(n)||r.isEqual(x.min())?this.Mn(e,n):this.On.vn(e,s).next(i=>{const o=this.Ln(n,i);return(Zr(n)||es(n))&&this.Bn(n.limitType,o,s,r)?this.Mn(e,n):(wu()<=P.DEBUG&&b("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),mo(n)),this.On.getDocumentsMatchingQuery(e,n,r).next(a=>(o.forEach(c=>{a=a.insert(c.key,c)}),a)))})}Ln(e,n){let r=new se(Uu(e));return n.forEach((s,i)=>{ns(e,i)&&(r=r.add(i))}),r}Bn(e,n,r,s){if(r.size!==n.size)return!0;const i=e==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Mn(e,n){return wu()<=P.DEBUG&&b("QueryEngine","Using full collection scan to execute query:",mo(n)),this.On.getDocumentsMatchingQuery(e,n,x.min())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zm{constructor(e,n,r,s){this.persistence=e,this.Un=n,this.k=s,this.qn=new ue(F),this.Kn=new zn(i=>uo(i),lo),this.jn=x.min(),this.An=e.getMutationQueue(r),this.Qn=e.getRemoteDocumentCache(),this.He=e.getTargetCache(),this.Wn=new fl(this.Qn,this.An,this.persistence.getIndexManager()),this.Ye=e.getBundleCache(),this.Un.Fn(this.Wn)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.qn))}}function ey(t,e,n,r){return new Zm(t,e,n,r)}async function pl(t,e){const n=C(t);let r=n.An,s=n.Wn;const i=await n.persistence.runTransaction("Handle user change","readonly",o=>{let a;return n.An.getAllMutationBatches(o).next(c=>(a=c,r=n.persistence.getMutationQueue(e),s=new fl(n.Qn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(o))).next(c=>{const u=[],l=[];let h=j();for(const d of a){u.push(d.batchId);for(const f of d.mutations)h=h.add(f.key)}for(const d of c){l.push(d.batchId);for(const f of d.mutations)h=h.add(f.key)}return s.vn(o,h).next(d=>({Gn:d,removedBatchIds:u,addedBatchIds:l}))})});return n.An=r,n.Wn=s,n.Un.Fn(n.Wn),i}function ty(t,e){const n=C(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.Qn.newChangeBuffer({trackRemovals:!0});return function(o,a,c,u){const l=c.batch,h=l.keys();let d=y.resolve();return h.forEach(f=>{d=d.next(()=>u.getEntry(a,f)).next(m=>{const _=c.docVersions.get(f);$(_!==null),m.version.compareTo(_)<0&&(l.applyToRemoteDocument(m,c),m.isValidDocument()&&u.addEntry(m,c.commitVersion))})}),d.next(()=>o.An.removeMutationBatch(a,l))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.An.performConsistencyCheck(r)).next(()=>n.Wn.vn(r,s))})}function gl(t){const e=C(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.He.getLastRemoteSnapshotVersion(n))}function ny(t,e){const n=C(t),r=e.snapshotVersion;let s=n.qn;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Qn.newChangeBuffer({trackRemovals:!0});s=n.qn;const a=[];e.targetChanges.forEach((u,l)=>{const h=s.get(l);if(!h)return;a.push(n.He.removeMatchingKeys(i,u.removedDocuments,l).next(()=>n.He.addMatchingKeys(i,u.addedDocuments,l)));const d=u.resumeToken;if(d.approximateByteSize()>0){const f=h.withResumeToken(d,r).withSequenceNumber(i.currentSequenceNumber);s=s.insert(l,f),function(m,_,v){return $(_.resumeToken.approximateByteSize()>0),m.resumeToken.approximateByteSize()===0||_.snapshotVersion.toMicroseconds()-m.snapshotVersion.toMicroseconds()>=3e8?!0:v.addedDocuments.size+v.modifiedDocuments.size+v.removedDocuments.size>0}(h,f,u)&&a.push(n.He.updateTargetData(i,f))}});let c=Et();if(e.documentUpdates.forEach((u,l)=>{e.resolvedLimboDocuments.has(u)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,u))}),a.push(ry(i,o,e.documentUpdates,r,void 0).next(u=>{c=u})),!r.isEqual(x.min())){const u=n.He.getLastRemoteSnapshotVersion(i).next(l=>n.He.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(u)}return y.waitFor(a).next(()=>o.apply(i)).next(()=>n.Wn.Vn(i,c)).next(()=>c)}).then(i=>(n.qn=s,i))}function ry(t,e,n,r,s){let i=j();return n.forEach(o=>i=i.add(o)),e.getEntries(t,i).next(o=>{let a=Et();return n.forEach((c,u)=>{const l=o.get(c),h=(s==null?void 0:s.get(c))||r;u.isNoDocument()&&u.version.isEqual(x.min())?(e.removeEntry(c,h),a=a.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u,h),a=a.insert(c,u)):b("LocalStore","Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),a})}function sy(t,e){const n=C(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.An.getNextMutationBatchAfterBatchId(r,e)))}function iy(t,e){const n=C(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.He.getTargetData(r,e).next(i=>i?(s=i,y.resolve(s)):n.He.allocateTargetId(r).next(o=>(s=new _t(e,o,0,r.currentSequenceNumber),n.He.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.qn.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.qn=n.qn.insert(r.targetId,r),n.Kn.set(e,r.targetId)),r})}async function ko(t,e,n){const r=C(t),s=r.qn.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Hn(o))throw o;b("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.qn=r.qn.remove(e),r.Kn.delete(s.target)}function ml(t,e,n){const r=C(t);let s=x.min(),i=j();return r.persistence.runTransaction("Execute query","readonly",o=>function(a,c,u){const l=C(a),h=l.Kn.get(u);return h!==void 0?y.resolve(l.qn.get(h)):l.He.getTargetData(c,u)}(r,o,vt(e)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.He.getMatchingKeysForTargetId(o,a.targetId).next(c=>{i=c})}).next(()=>r.Un.getDocumentsMatchingQuery(o,e,n?s:x.min(),n?i:j())).next(a=>({documents:a,zn:i})))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(e){this.k=e,this.Xn=new Map,this.Zn=new Map}getBundleMetadata(e,n){return y.resolve(this.Xn.get(n))}saveBundleMetadata(e,n){var r;return this.Xn.set(n.id,{id:(r=n).id,version:r.version,createTime:Be(r.createTime)}),y.resolve()}getNamedQuery(e,n){return y.resolve(this.Zn.get(n))}saveNamedQuery(e,n){return this.Zn.set(n.name,function(r){return{name:r.name,query:Km(r.bundledQuery),readTime:Be(r.readTime)}}(n)),y.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(){this.ts=new se(Z.es),this.ns=new se(Z.ss)}isEmpty(){return this.ts.isEmpty()}addReference(e,n){const r=new Z(e,n);this.ts=this.ts.add(r),this.ns=this.ns.add(r)}rs(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.os(new Z(e,n))}cs(e,n){e.forEach(r=>this.removeReference(r,n))}us(e){const n=new I(new q([])),r=new Z(n,e),s=new Z(n,e+1),i=[];return this.ns.forEachInRange([r,s],o=>{this.os(o),i.push(o.key)}),i}hs(){this.ts.forEach(e=>this.os(e))}os(e){this.ts=this.ts.delete(e),this.ns=this.ns.delete(e)}ls(e){const n=new I(new q([])),r=new Z(n,e),s=new Z(n,e+1);let i=j();return this.ns.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Z(e,0),r=this.ts.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Z{constructor(e,n){this.key=e,this.fs=n}static es(e,n){return I.comparator(e.key,n.key)||F(e.fs,n.fs)}static ss(e,n){return F(e.fs,n.fs)||I.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay{constructor(e,n){this.Jt=e,this.referenceDelegate=n,this.An=[],this.ds=1,this.ws=new se(Z.es)}checkEmpty(e){return y.resolve(this.An.length===0)}addMutationBatch(e,n,r,s){const i=this.ds;this.ds++,this.An.length>0&&this.An[this.An.length-1];const o=new zm(i,n,r,s);this.An.push(o);for(const a of s)this.ws=this.ws.add(new Z(a.key,i)),this.Jt.addToCollectionParentIndex(e,a.key.path.popLast());return y.resolve(o)}lookupMutationBatch(e,n){return y.resolve(this._s(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.gs(r),i=s<0?0:s;return y.resolve(this.An.length>i?this.An[i]:null)}getHighestUnacknowledgedBatchId(){return y.resolve(this.An.length===0?-1:this.ds-1)}getAllMutationBatches(e){return y.resolve(this.An.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Z(n,0),s=new Z(n,Number.POSITIVE_INFINITY),i=[];return this.ws.forEachInRange([r,s],o=>{const a=this._s(o.fs);i.push(a)}),y.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new se(F);return n.forEach(s=>{const i=new Z(s,0),o=new Z(s,Number.POSITIVE_INFINITY);this.ws.forEachInRange([i,o],a=>{r=r.add(a.fs)})}),y.resolve(this.ys(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;I.isDocumentKey(i)||(i=i.child(""));const o=new Z(new I(i),0);let a=new se(F);return this.ws.forEachWhile(c=>{const u=c.key.path;return!!r.isPrefixOf(u)&&(u.length===s&&(a=a.add(c.fs)),!0)},o),y.resolve(this.ys(a))}ys(e){const n=[];return e.forEach(r=>{const s=this._s(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){$(this.ps(n.batchId,"removed")===0),this.An.shift();let r=this.ws;return y.forEach(n.mutations,s=>{const i=new Z(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.ws=r})}ee(e){}containsKey(e,n){const r=new Z(n,0),s=this.ws.firstAfterOrEqual(r);return y.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.An.length,y.resolve()}ps(e,n){return this.gs(e)}gs(e){return this.An.length===0?0:e-this.An[0].batchId}_s(e){const n=this.gs(e);return n<0||n>=this.An.length?null:this.An[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(e,n){this.Jt=e,this.Ts=n,this.docs=new ue(I.comparator),this.size=0}addEntry(e,n,r){const s=n.key,i=this.docs.get(s),o=i?i.size:0,a=this.Ts(n);return this.docs=this.docs.insert(s,{document:n.clone(),size:a,readTime:r}),this.size+=a-o,this.Jt.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return y.resolve(r?r.document.clone():ce.newInvalidDocument(n))}getEntries(e,n){let r=Et();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.clone():ce.newInvalidDocument(s))}),y.resolve(r)}getDocumentsMatchingQuery(e,n,r){let s=Et();const i=new I(n.path.child("")),o=this.docs.getIteratorFrom(i);for(;o.hasNext();){const{key:a,value:{document:c,readTime:u}}=o.getNext();if(!n.path.isPrefixOf(a.path))break;u.compareTo(r)<=0||ns(n,c)&&(s=s.insert(c.key,c.clone()))}return y.resolve(s)}Es(e,n){return y.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new uy(this)}getSize(e){return y.resolve(this.size)}}class uy extends Ym{constructor(e){super(),this.De=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.document.isValidDocument()?n.push(this.De.addEntry(e,s.document,this.getReadTime(r))):this.De.removeEntry(r)}),y.waitFor(n)}getFromCache(e,n){return this.De.getEntry(e,n)}getAllFromCache(e,n){return this.De.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e){this.persistence=e,this.Is=new zn(n=>uo(n),lo),this.lastRemoteSnapshotVersion=x.min(),this.highestTargetId=0,this.As=0,this.Rs=new Co,this.targetCount=0,this.Ps=Yt.ie()}forEachTarget(e,n){return this.Is.forEach((r,s)=>n(s)),y.resolve()}getLastRemoteSnapshotVersion(e){return y.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return y.resolve(this.As)}allocateTargetId(e){return this.highestTargetId=this.Ps.next(),y.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.As&&(this.As=n),y.resolve()}ce(e){this.Is.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Ps=new Yt(n),this.highestTargetId=n),e.sequenceNumber>this.As&&(this.As=e.sequenceNumber)}addTargetData(e,n){return this.ce(n),this.targetCount+=1,y.resolve()}updateTargetData(e,n){return this.ce(n),y.resolve()}removeTargetData(e,n){return this.Is.delete(n.target),this.Rs.us(n.targetId),this.targetCount-=1,y.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Is.forEach((o,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.Is.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),y.waitFor(i).next(()=>s)}getTargetCount(e){return y.resolve(this.targetCount)}getTargetData(e,n){const r=this.Is.get(n)||null;return y.resolve(r)}addMatchingKeys(e,n,r){return this.Rs.rs(n,r),y.resolve()}removeMatchingKeys(e,n,r){this.Rs.cs(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),y.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Rs.us(n),y.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Rs.ls(n);return y.resolve(r)}containsKey(e,n){return y.resolve(this.Rs.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(e,n){this.bs={},this.Be=new so(0),this.Ue=!1,this.Ue=!0,this.referenceDelegate=e(this),this.He=new ly(this),this.Jt=new Jm,this.Je=function(r,s){return new cy(r,s)}(this.Jt,r=>this.referenceDelegate.vs(r)),this.k=new Gm(n),this.Ye=new oy(this.k)}start(){return Promise.resolve()}shutdown(){return this.Ue=!1,Promise.resolve()}get started(){return this.Ue}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Jt}getMutationQueue(e){let n=this.bs[e.toKey()];return n||(n=new ay(this.Jt,this.referenceDelegate),this.bs[e.toKey()]=n),n}getTargetCache(){return this.He}getRemoteDocumentCache(){return this.Je}getBundleCache(){return this.Ye}runTransaction(e,n,r){b("MemoryPersistence","Starting transaction:",e);const s=new dy(this.Be.next());return this.referenceDelegate.Vs(),r(s).next(i=>this.referenceDelegate.Ss(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ds(e,n){return y.or(Object.values(this.bs).map(r=>()=>r.containsKey(e,n)))}}class dy extends Wm{constructor(e){super(),this.currentSequenceNumber=e}}class Ro{constructor(e){this.persistence=e,this.Cs=new Co,this.Ns=null}static ks(e){return new Ro(e)}get xs(){if(this.Ns)return this.Ns;throw k()}addReference(e,n,r){return this.Cs.addReference(r,n),this.xs.delete(r.toString()),y.resolve()}removeReference(e,n,r){return this.Cs.removeReference(r,n),this.xs.add(r.toString()),y.resolve()}markPotentiallyOrphaned(e,n){return this.xs.add(n.toString()),y.resolve()}removeTarget(e,n){this.Cs.us(n.targetId).forEach(s=>this.xs.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.xs.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}Vs(){this.Ns=new Set}Ss(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return y.forEach(this.xs,r=>{const s=I.fromPath(r);return this.$s(e,s).next(i=>{i||n.removeEntry(s)})}).next(()=>(this.Ns=null,n.apply(e)))}updateLimboDocument(e,n){return this.$s(e,n).next(r=>{r?this.xs.delete(n.toString()):this.xs.add(n.toString())})}vs(e){return 0}$s(e,n){return y.or([()=>y.resolve(this.Cs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ds(e,n)])}}class yl{constructor(){this.activeTargetIds=Zu()}Ms(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ls(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Os(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class fy{constructor(){this.pi=new yl,this.Ti={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e){return this.pi.Ms(e),this.Ti[e]||"not-current"}updateQueryState(e,n,r){this.Ti[e]=n}removeLocalQueryTarget(e){this.pi.Ls(e)}isLocalQueryTarget(e){return this.pi.activeTargetIds.has(e)}clearQueryState(e){delete this.Ti[e]}getAllActiveQueryTargets(){return this.pi.activeTargetIds}isActiveQueryTarget(e){return this.pi.activeTargetIds.has(e)}start(){return this.pi=new yl,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{Ei(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(){this.Ii=()=>this.Ai(),this.Ri=()=>this.Pi(),this.bi=[],this.vi()}Ei(e){this.bi.push(e)}shutdown(){window.removeEventListener("online",this.Ii),window.removeEventListener("offline",this.Ri)}vi(){window.addEventListener("online",this.Ii),window.addEventListener("offline",this.Ri)}Ai(){b("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.bi)e(0)}Pi(){b("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.bi)e(1)}static bt(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gy={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e){this.Vi=e.Vi,this.Si=e.Si}Di(e){this.Ci=e}Ni(e){this.ki=e}onMessage(e){this.xi=e}close(){this.Si()}send(e){this.Vi(e)}$i(){this.Ci()}Fi(e){this.ki(e)}Oi(e){this.xi(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.Mi=n+"://"+e.host,this.Li="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Bi(e,n,r,s,i){const o=this.Ui(e,n);b("RestConnection","Sending: ",o,r);const a={};return this.qi(a,s,i),this.Ki(e,o,a,r).then(c=>(b("RestConnection","Received: ",c),c),c=>{throw Eu("RestConnection",`${e} failed with error: `,c,"url: ",o,"request:",r),c})}ji(e,n,r,s,i){return this.Bi(e,n,r,s,i)}qi(e,n,r){e["X-Goog-Api-Client"]="gl-js/ fire/"+Vt,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Ui(e,n){const r=gy[e];return`${this.Mi}/v1/${n}:${r}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}Ki(e,n,r,s){return new Promise((i,o)=>{const a=new Fg;a.listenOnce(Mg.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case no.NO_ERROR:const u=a.getResponseJson();b("Connection","XHR received:",JSON.stringify(u)),i(u);break;case no.TIMEOUT:b("Connection",'RPC "'+e+'" timed out'),o(new E(p.DEADLINE_EXCEEDED,"Request time out"));break;case no.HTTP_ERROR:const l=a.getStatus();if(b("Connection",'RPC "'+e+'" failed with status:',l,"response text:",a.getResponseText()),l>0){const h=a.getResponseJson().error;if(h&&h.status&&h.message){const d=function(f){const m=f.toLowerCase().replace(/_/g,"-");return Object.values(p).indexOf(m)>=0?m:p.UNKNOWN}(h.status);o(new E(d,h.message))}else o(new E(p.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new E(p.UNAVAILABLE,"Connection failed."));break;default:k()}}finally{b("Connection",'RPC "'+e+'" completed.')}});const c=JSON.stringify(s);a.send(n,"POST",c,r,15)})}Qi(e,n,r){const s=[this.Mi,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Pg(),o=Lg(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new Ug({})),this.qi(a.initMessageHeaders,n,r),Xa()||Qa()||Uf()||Za()||Ff()||Ya()||(a.httpHeadersOverwriteParam="$httpHeaders");const c=s.join("");b("Connection","Creating WebChannel: "+c,a);const u=i.createWebChannel(c,a);let l=!1,h=!1;const d=new my({Vi:m=>{h?b("Connection","Not sending because WebChannel is closed:",m):(l||(b("Connection","Opening WebChannel transport."),u.open(),l=!0),b("Connection","WebChannel sending:",m),u.send(m))},Si:()=>u.close()}),f=(m,_,v)=>{m.listen(_,D=>{try{v(D)}catch(L){setTimeout(()=>{throw L},0)}})};return f(u,Kr.EventType.OPEN,()=>{h||b("Connection","WebChannel transport opened.")}),f(u,Kr.EventType.CLOSE,()=>{h||(h=!0,b("Connection","WebChannel transport closed"),d.Fi())}),f(u,Kr.EventType.ERROR,m=>{h||(h=!0,Eu("Connection","WebChannel transport errored:",m),d.Fi(new E(p.UNAVAILABLE,"The operation could not be completed")))}),f(u,Kr.EventType.MESSAGE,m=>{var _;if(!h){const v=m.data[0];$(!!v);const D=v,L=D.error||((_=D[0])===null||_===void 0?void 0:_.error);if(L){b("Connection","WebChannel received error:",L);const R=L.status;let U=function(ve){const Ce=X[ve];if(Ce!==void 0)return Yu(Ce)}(R),ye=L.message;U===void 0&&(U=p.INTERNAL,ye="Unknown error status: "+R+" with message "+L.message),h=!0,d.Fi(new E(U,ye)),u.close()}else b("Connection","WebChannel received:",v),d.Oi(v)}}),f(o,xg.STAT_EVENT,m=>{m.stat===yu.PROXY?b("Connection","Detected buffering proxy"):m.stat===yu.NOPROXY&&b("Connection","Detected no buffering proxy")}),setTimeout(()=>{d.$i()},0),d}}function No(){return typeof document!="undefined"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(t){return new Rm(t,!0)}class wl{constructor(e,n,r=1e3,s=1.5,i=6e4){this.Oe=e,this.timerId=n,this.Wi=r,this.Gi=s,this.zi=i,this.Hi=0,this.Ji=null,this.Yi=Date.now(),this.reset()}reset(){this.Hi=0}Xi(){this.Hi=this.zi}Zi(e){this.cancel();const n=Math.floor(this.Hi+this.tr()),r=Math.max(0,Date.now()-this.Yi),s=Math.max(0,n-r);s>0&&b("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Hi} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Ji=this.Oe.enqueueAfterDelay(this.timerId,s,()=>(this.Yi=Date.now(),e())),this.Hi*=this.Gi,this.Hi<this.Wi&&(this.Hi=this.Wi),this.Hi>this.zi&&(this.Hi=this.zi)}er(){this.Ji!==null&&(this.Ji.skipDelay(),this.Ji=null)}cancel(){this.Ji!==null&&(this.Ji.cancel(),this.Ji=null)}tr(){return(Math.random()-.5)*this.Hi}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,n,r,s,i,o,a,c){this.Oe=e,this.nr=r,this.sr=s,this.ir=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.rr=0,this.ar=null,this.cr=null,this.stream=null,this.ur=new wl(e,n)}hr(){return this.state===1||this.state===5||this.lr()}lr(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.dr()}async stop(){this.hr()&&await this.close(0)}wr(){this.state=0,this.ur.reset()}_r(){this.lr()&&this.ar===null&&(this.ar=this.Oe.enqueueAfterDelay(this.nr,6e4,()=>this.mr()))}gr(e){this.yr(),this.stream.send(e)}async mr(){if(this.lr())return this.close(0)}yr(){this.ar&&(this.ar.cancel(),this.ar=null)}pr(){this.cr&&(this.cr.cancel(),this.cr=null)}async close(e,n){this.yr(),this.pr(),this.ur.cancel(),this.rr++,e!==4?this.ur.reset():n&&n.code===p.RESOURCE_EXHAUSTED?(Je(n.toString()),Je("Using maximum backoff delay to prevent overloading the backend."),this.ur.Xi()):n&&n.code===p.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Tr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ni(n)}Tr(){}auth(){this.state=1;const e=this.Er(this.rr),n=this.rr;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.rr===n&&this.Ir(r,s)},r=>{e(()=>{const s=new E(p.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Ar(s)})})}Ir(e,n){const r=this.Er(this.rr);this.stream=this.Rr(e,n),this.stream.Di(()=>{r(()=>(this.state=2,this.cr=this.Oe.enqueueAfterDelay(this.sr,1e4,()=>(this.lr()&&(this.state=3),Promise.resolve())),this.listener.Di()))}),this.stream.Ni(s=>{r(()=>this.Ar(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}dr(){this.state=5,this.ur.Zi(async()=>{this.state=0,this.start()})}Ar(e){return b("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Er(e){return n=>{this.Oe.enqueueAndForget(()=>this.rr===e?n():(b("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class vy extends El{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.k=i}Rr(e,n){return this.ir.Qi("Listen",e,n)}onMessage(e){this.ur.reset();const n=Dm(this.k,e),r=function(s){if(!("targetChange"in s))return x.min();const i=s.targetChange;return i.targetIds&&i.targetIds.length?x.min():i.readTime?Be(i.readTime):x.min()}(e);return this.listener.Pr(n,r)}br(e){const n={};n.database=Io(this.k),n.addTarget=function(s,i){let o;const a=i.target;return o=ho(a)?{documents:Mm(s,a)}:{query:xm(s,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0?o.resumeToken=il(s,i.resumeToken):i.snapshotVersion.compareTo(x.min())>0&&(o.readTime=hs(s,i.snapshotVersion.toTimestamp())),o}(this.k,e);const r=Fm(this.k,e);r&&(n.labels=r),this.gr(n)}vr(e){const n={};n.database=Io(this.k),n.removeTarget=e,this.gr(n)}}class wy extends El{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.k=i,this.Vr=!1}get Sr(){return this.Vr}start(){this.Vr=!1,this.lastStreamToken=void 0,super.start()}Tr(){this.Vr&&this.Dr([])}Rr(e,n){return this.ir.Qi("Write",e,n)}onMessage(e){if($(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Vr){this.ur.reset();const n=Lm(e.writeResults,e.commitTime),r=Be(e.commitTime);return this.listener.Cr(r,n)}return $(!e.writeResults||e.writeResults.length===0),this.Vr=!0,this.listener.Nr()}kr(){const e={};e.database=Io(this.k),this.gr(e)}Dr(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Pm(this.k,r))};this.gr(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.ir=r,this.k=s,this.$r=!1}Fr(){if(this.$r)throw new E(p.FAILED_PRECONDITION,"The client has already been terminated.")}Bi(e,n,r){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.ir.Bi(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===p.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new E(p.UNKNOWN,s.toString())})}ji(e,n,r){return this.Fr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.ir.ji(e,n,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===p.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new E(p.UNKNOWN,s.toString())})}terminate(){this.$r=!0}}class _y{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.Or=0,this.Mr=null,this.Lr=!0}Br(){this.Or===0&&(this.Ur("Unknown"),this.Mr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.Mr=null,this.qr("Backend didn't respond within 10 seconds."),this.Ur("Offline"),Promise.resolve())))}Kr(e){this.state==="Online"?this.Ur("Unknown"):(this.Or++,this.Or>=1&&(this.jr(),this.qr(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Ur("Offline")))}set(e){this.jr(),this.Or=0,e==="Online"&&(this.Lr=!1),this.Ur(e)}Ur(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}qr(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Lr?(Je(n),this.Lr=!1):b("OnlineStateTracker",n)}jr(){this.Mr!==null&&(this.Mr.cancel(),this.Mr=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Qr=[],this.Wr=new Map,this.Gr=new Set,this.zr=[],this.Hr=i,this.Hr.Ei(o=>{r.enqueueAndForget(async()=>{Tt(this)&&(b("RemoteStore","Restarting streams for network reachability change."),await async function(a){const c=C(a);c.Gr.add(4),await Gn(c),c.Jr.set("Unknown"),c.Gr.delete(4),await fs(c)}(this))})}),this.Jr=new _y(r,s)}}async function fs(t){if(Tt(t))for(const e of t.zr)await e(!0)}async function Gn(t){for(const e of t.zr)await e(!1)}function _l(t,e){const n=C(t);n.Wr.has(e.targetId)||(n.Wr.set(e.targetId,e),Po(n)?Do(n):Qt(n).lr()&&Oo(n,e))}function Tl(t,e){const n=C(t),r=Qt(n);n.Wr.delete(e),r.lr()&&bl(n,e),n.Wr.size===0&&(r.lr()?r._r():Tt(n)&&n.Jr.set("Unknown"))}function Oo(t,e){t.Yr.X(e.targetId),Qt(t).br(e)}function bl(t,e){t.Yr.X(e),Qt(t).vr(e)}function Do(t){t.Yr=new Sm({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>t.Wr.get(e)||null}),Qt(t).start(),t.Jr.Br()}function Po(t){return Tt(t)&&!Qt(t).hr()&&t.Wr.size>0}function Tt(t){return C(t).Gr.size===0}function Il(t){t.Yr=void 0}async function by(t){t.Wr.forEach((e,n)=>{Oo(t,e)})}async function Iy(t,e){Il(t),Po(t)?(t.Jr.Kr(e),Do(t)):t.Jr.set("Unknown")}async function Ay(t,e,n){if(t.Jr.set("Online"),e instanceof tl&&e.state===2&&e.cause)try{await async function(r,s){const i=s.cause;for(const o of s.targetIds)r.Wr.has(o)&&(await r.remoteSyncer.rejectListen(o,i),r.Wr.delete(o),r.Yr.removeTarget(o))}(t,e)}catch(r){b("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ps(t,r)}else if(e instanceof ls?t.Yr.ot(e):e instanceof el?t.Yr.dt(e):t.Yr.ut(e),!n.isEqual(x.min()))try{const r=await gl(t.localStore);n.compareTo(r)>=0&&await function(s,i){const o=s.Yr.gt(i);return o.targetChanges.forEach((a,c)=>{if(a.resumeToken.approximateByteSize()>0){const u=s.Wr.get(c);u&&s.Wr.set(c,u.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach(a=>{const c=s.Wr.get(a);if(!c)return;s.Wr.set(a,c.withResumeToken(ae.EMPTY_BYTE_STRING,c.snapshotVersion)),bl(s,a);const u=new _t(c.target,a,1,c.sequenceNumber);Oo(s,u)}),s.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(r){b("RemoteStore","Failed to raise snapshot:",r),await ps(t,r)}}async function ps(t,e,n){if(!Hn(e))throw e;t.Gr.add(1),await Gn(t),t.Jr.set("Offline"),n||(n=()=>gl(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{b("RemoteStore","Retrying IndexedDB access"),await n(),t.Gr.delete(1),await fs(t)})}function Al(t,e){return e().catch(n=>ps(t,n,e))}async function gs(t){const e=C(t),n=Ye(e);let r=e.Qr.length>0?e.Qr[e.Qr.length-1].batchId:-1;for(;Sy(e);)try{const s=await sy(e.localStore,r);if(s===null){e.Qr.length===0&&n._r();break}r=s.batchId,ky(e,s)}catch(s){await ps(e,s)}Sl(e)&&kl(e)}function Sy(t){return Tt(t)&&t.Qr.length<10}function ky(t,e){t.Qr.push(e);const n=Ye(t);n.lr()&&n.Sr&&n.Dr(e.mutations)}function Sl(t){return Tt(t)&&!Ye(t).hr()&&t.Qr.length>0}function kl(t){Ye(t).start()}async function Cy(t){Ye(t).kr()}async function Ry(t){const e=Ye(t);for(const n of t.Qr)e.Dr(n.mutations)}async function Ny(t,e,n){const r=t.Qr.shift(),s=Ao.from(r,e,n);await Al(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await gs(t)}async function Oy(t,e){e&&Ye(t).Sr&&await async function(n,r){if(s=r.code,wm(s)&&s!==p.ABORTED){const i=n.Qr.shift();Ye(n).wr(),await Al(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,r)),await gs(n)}var s}(t,e),Sl(t)&&kl(t)}async function Dy(t,e){const n=C(t);e?(n.Gr.delete(2),await fs(n)):e||(n.Gr.add(2),await Gn(n),n.Jr.set("Unknown"))}function Qt(t){return t.Xr||(t.Xr=function(e,n,r){const s=C(e);return s.Fr(),new vy(n,s.ir,s.authCredentials,s.appCheckCredentials,s.k,r)}(t.datastore,t.asyncQueue,{Di:by.bind(null,t),Ni:Iy.bind(null,t),Pr:Ay.bind(null,t)}),t.zr.push(async e=>{e?(t.Xr.wr(),Po(t)?Do(t):t.Jr.set("Unknown")):(await t.Xr.stop(),Il(t))})),t.Xr}function Ye(t){return t.Zr||(t.Zr=function(e,n,r){const s=C(e);return s.Fr(),new wy(n,s.ir,s.authCredentials,s.appCheckCredentials,s.k,r)}(t.datastore,t.asyncQueue,{Di:Cy.bind(null,t),Ni:Oy.bind(null,t),Nr:Ry.bind(null,t),Cr:Ny.bind(null,t)}),t.zr.push(async e=>{e?(t.Zr.wr(),await gs(t)):(await t.Zr.stop(),t.Qr.length>0&&(b("RemoteStore",`Stopping write stream with ${t.Qr.length} pending writes`),t.Qr=[]))})),t.Zr}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ve,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,a=new Lo(e,n,o,s,i);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new E(p.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Mo(t,e){if(Je("AsyncQueue",`${e}: ${t}`),Hn(t))return new E(p.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e){this.comparator=e?(n,r)=>e(n,r)||I.comparator(n.key,r.key):(n,r)=>I.comparator(n.key,r.key),this.keyedMap=wo(),this.sortedSet=new ue(this.comparator)}static emptySet(e){return new Zt(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Zt)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Zt;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(){this.eo=new ue(I.comparator)}track(e){const n=e.doc.key,r=this.eo.get(n);r?e.type!==0&&r.type===3?this.eo=this.eo.insert(n,e):e.type===3&&r.type!==1?this.eo=this.eo.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.eo=this.eo.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.eo=this.eo.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.eo=this.eo.remove(n):e.type===1&&r.type===2?this.eo=this.eo.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.eo=this.eo.insert(n,{type:2,doc:e.doc}):k():this.eo=this.eo.insert(n,e)}no(){const e=[];return this.eo.inorderTraversal((n,r)=>{e.push(r)}),e}}class en{constructor(e,n,r,s,i,o,a,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c}static fromInitialDocuments(e,n,r,s){const i=[];return n.forEach(o=>{i.push({type:0,doc:o})}),new en(e,n,Zt.emptySet(n),i,r,s,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ts(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Py{constructor(){this.so=void 0,this.listeners=[]}}class Ly{constructor(){this.queries=new zn(e=>xu(e),ts),this.onlineState="Unknown",this.io=new Set}}async function xo(t,e){const n=C(t),r=e.query;let s=!1,i=n.queries.get(r);if(i||(s=!0,i=new Py),s)try{i.so=await n.onListen(r)}catch(o){const a=Mo(o,`Initialization of query '${mo(e.query)}' failed`);return void e.onError(a)}n.queries.set(r,i),i.listeners.push(e),e.ro(n.onlineState),i.so&&e.oo(i.so)&&Fo(n)}async function Uo(t,e){const n=C(t),r=e.query;let s=!1;const i=n.queries.get(r);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return n.queries.delete(r),n.onUnlisten(r)}function My(t,e){const n=C(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.oo(s)&&(r=!0);o.so=s}}r&&Fo(n)}function xy(t,e,n){const r=C(t),s=r.queries.get(e);if(s)for(const i of s.listeners)i.onError(n);r.queries.delete(e)}function Fo(t){t.io.forEach(e=>{e.next()})}class $o{constructor(e,n,r){this.query=e,this.ao=n,this.co=!1,this.uo=null,this.onlineState="Unknown",this.options=r||{}}oo(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new en(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0)}let n=!1;return this.co?this.ho(e)&&(this.ao.next(e),n=!0):this.lo(e,this.onlineState)&&(this.fo(e),n=!0),this.uo=e,n}onError(e){this.ao.error(e)}ro(e){this.onlineState=e;let n=!1;return this.uo&&!this.co&&this.lo(this.uo,e)&&(this.fo(this.uo),n=!0),n}lo(e,n){if(!e.fromCache)return!0;const r=n!=="Offline";return(!this.options.wo||!r)&&(!e.docs.isEmpty()||n==="Offline")}ho(e){if(e.docChanges.length>0)return!0;const n=this.uo&&this.uo.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}fo(e){e=en.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache),this.co=!0,this.ao.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.key=e}}class Nl{constructor(e){this.key=e}}class Uy{constructor(e,n){this.query=e,this.To=n,this.Eo=null,this.current=!1,this.Io=j(),this.mutatedKeys=j(),this.Ao=Uu(e),this.Ro=new Zt(this.Ao)}get Po(){return this.To}bo(e,n){const r=n?n.vo:new Cl,s=n?n.Ro:this.Ro;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=Zr(this.query)&&s.size===this.query.limit?s.last():null,u=es(this.query)&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((l,h)=>{const d=s.get(l),f=ns(this.query,h)?h:null,m=!!d&&this.mutatedKeys.has(d.key),_=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations);let v=!1;d&&f?d.data.isEqual(f.data)?m!==_&&(r.track({type:3,doc:f}),v=!0):this.Vo(d,f)||(r.track({type:2,doc:f}),v=!0,(c&&this.Ao(f,c)>0||u&&this.Ao(f,u)<0)&&(a=!0)):!d&&f?(r.track({type:0,doc:f}),v=!0):d&&!f&&(r.track({type:1,doc:d}),v=!0,(c||u)&&(a=!0)),v&&(f?(o=o.add(f),i=_?i.add(l):i.delete(l)):(o=o.delete(l),i=i.delete(l)))}),Zr(this.query)||es(this.query))for(;o.size>this.query.limit;){const l=Zr(this.query)?o.last():o.first();o=o.delete(l.key),i=i.delete(l.key),r.track({type:1,doc:l})}return{Ro:o,vo:r,Bn:a,mutatedKeys:i}}Vo(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r){const s=this.Ro;this.Ro=e.Ro,this.mutatedKeys=e.mutatedKeys;const i=e.vo.no();i.sort((u,l)=>function(h,d){const f=m=>{switch(m){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return k()}};return f(h)-f(d)}(u.type,l.type)||this.Ao(u.doc,l.doc)),this.So(r);const o=n?this.Do():[],a=this.Io.size===0&&this.current?1:0,c=a!==this.Eo;return this.Eo=a,i.length!==0||c?{snapshot:new en(this.query,e.Ro,s,i,e.mutatedKeys,a===0,c,!1),Co:o}:{Co:o}}ro(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ro:this.Ro,vo:new Cl,mutatedKeys:this.mutatedKeys,Bn:!1},!1)):{Co:[]}}No(e){return!this.To.has(e)&&!!this.Ro.has(e)&&!this.Ro.get(e).hasLocalMutations}So(e){e&&(e.addedDocuments.forEach(n=>this.To=this.To.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.To=this.To.delete(n)),this.current=e.current)}Do(){if(!this.current)return[];const e=this.Io;this.Io=j(),this.Ro.forEach(r=>{this.No(r.key)&&(this.Io=this.Io.add(r.key))});const n=[];return e.forEach(r=>{this.Io.has(r)||n.push(new Nl(r))}),this.Io.forEach(r=>{e.has(r)||n.push(new Rl(r))}),n}ko(e){this.To=e.zn,this.Io=j();const n=this.bo(e.documents);return this.applyChanges(n,!0)}xo(){return en.fromInitialDocuments(this.query,this.Ro,this.mutatedKeys,this.Eo===0)}}class Fy{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class $y{constructor(e){this.key=e,this.$o=!1}}class Vy{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Fo={},this.Oo=new zn(a=>xu(a),ts),this.Mo=new Map,this.Lo=new Set,this.Bo=new ue(I.comparator),this.Uo=new Map,this.qo=new Co,this.Ko={},this.jo=new Map,this.Qo=Yt.re(),this.onlineState="Unknown",this.Wo=void 0}get isPrimaryClient(){return this.Wo===!0}}async function jy(t,e){const n=Yy(t);let r,s;const i=n.Oo.get(e);if(i)r=i.targetId,n.sharedClientState.addLocalQueryTarget(r),s=i.view.xo();else{const o=await iy(n.localStore,vt(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await By(n,e,r,a==="current"),n.isPrimaryClient&&_l(n.remoteStore,o)}return s}async function By(t,e,n,r){t.Go=(l,h,d)=>async function(f,m,_,v){let D=m.view.bo(_);D.Bn&&(D=await ml(f.localStore,m.query,!1).then(({documents:U})=>m.view.bo(U,D)));const L=v&&v.targetChanges.get(m.targetId),R=m.view.applyChanges(D,f.isPrimaryClient,L);return xl(f,m.targetId,R.Co),R.snapshot}(t,l,h,d);const s=await ml(t.localStore,e,!0),i=new Uy(e,s.zn),o=i.bo(s.documents),a=qn.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline"),c=i.applyChanges(o,t.isPrimaryClient,a);xl(t,n,c.Co);const u=new Fy(e,n,i);return t.Oo.set(e,u),t.Mo.has(n)?t.Mo.get(n).push(e):t.Mo.set(n,[e]),c.snapshot}async function qy(t,e){const n=C(t),r=n.Oo.get(e),s=n.Mo.get(r.targetId);if(s.length>1)return n.Mo.set(r.targetId,s.filter(i=>!ts(i,e))),void n.Oo.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await ko(n.localStore,r.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(r.targetId),Tl(n.remoteStore,r.targetId),Vo(n,r.targetId)}).catch(Wn)):(Vo(n,r.targetId),await ko(n.localStore,r.targetId,!0))}async function Hy(t,e,n){const r=Qy(t);try{const s=await function(i,o){const a=C(i),c=Te.now(),u=o.reduce((h,d)=>h.add(d.key),j());let l;return a.persistence.runTransaction("Locally write mutations","readwrite",h=>a.Wn.vn(h,u).next(d=>{l=d;const f=[];for(const m of o){const _=mm(m,l.get(m.key));_!=null&&f.push(new wt(m.key,_,Nu(_.value.mapValue),je.exists(!0)))}return a.An.addMutationBatch(h,c,f,o)})).then(h=>(h.applyToLocalDocumentSet(l),{batchId:h.batchId,changes:l}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(i,o,a){let c=i.Ko[i.currentUser.toKey()];c||(c=new ue(F)),c=c.insert(o,a),i.Ko[i.currentUser.toKey()]=c}(r,s.batchId,n),await Kn(r,s.changes),await gs(r.remoteStore)}catch(s){const i=Mo(s,"Failed to persist write");n.reject(i)}}async function Ol(t,e){const n=C(t);try{const r=await ny(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Uo.get(i);o&&($(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.$o=!0:s.modifiedDocuments.size>0?$(o.$o):s.removedDocuments.size>0&&($(o.$o),o.$o=!1))}),await Kn(n,r,e)}catch(r){await Wn(r)}}function Dl(t,e,n){const r=C(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Oo.forEach((i,o)=>{const a=o.view.ro(e);a.snapshot&&s.push(a.snapshot)}),function(i,o){const a=C(i);a.onlineState=o;let c=!1;a.queries.forEach((u,l)=>{for(const h of l.listeners)h.ro(o)&&(c=!0)}),c&&Fo(a)}(r.eventManager,e),s.length&&r.Fo.Pr(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Wy(t,e,n){const r=C(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Uo.get(e),i=s&&s.key;if(i){let o=new ue(I.comparator);o=o.insert(i,ce.newNoDocument(i,x.min()));const a=j().add(i),c=new us(x.min(),new Map,new se(F),o,a);await Ol(r,c),r.Bo=r.Bo.remove(i),r.Uo.delete(e),jo(r)}else await ko(r.localStore,e,!1).then(()=>Vo(r,e,n)).catch(Wn)}async function zy(t,e){const n=C(t),r=e.batch.batchId;try{const s=await ty(n.localStore,e);Ll(n,r,null),Pl(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Kn(n,s)}catch(s){await Wn(s)}}async function Gy(t,e,n){const r=C(t);try{const s=await function(i,o){const a=C(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return a.An.lookupMutationBatch(c,o).next(l=>($(l!==null),u=l.keys(),a.An.removeMutationBatch(c,l))).next(()=>a.An.performConsistencyCheck(c)).next(()=>a.Wn.vn(c,u))})}(r.localStore,e);Ll(r,e,n),Pl(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Kn(r,s)}catch(s){await Wn(s)}}function Pl(t,e){(t.jo.get(e)||[]).forEach(n=>{n.resolve()}),t.jo.delete(e)}function Ll(t,e,n){const r=C(t);let s=r.Ko[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ko[r.currentUser.toKey()]=s}}function Vo(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Mo.get(e))t.Oo.delete(r),n&&t.Fo.zo(r,n);t.Mo.delete(e),t.isPrimaryClient&&t.qo.us(e).forEach(r=>{t.qo.containsKey(r)||Ml(t,r)})}function Ml(t,e){t.Lo.delete(e.path.canonicalString());const n=t.Bo.get(e);n!==null&&(Tl(t.remoteStore,n),t.Bo=t.Bo.remove(e),t.Uo.delete(n),jo(t))}function xl(t,e,n){for(const r of n)r instanceof Rl?(t.qo.addReference(r.key,e),Ky(t,r)):r instanceof Nl?(b("SyncEngine","Document no longer in limbo: "+r.key),t.qo.removeReference(r.key,e),t.qo.containsKey(r.key)||Ml(t,r.key)):k()}function Ky(t,e){const n=e.key,r=n.path.canonicalString();t.Bo.get(n)||t.Lo.has(r)||(b("SyncEngine","New document in limbo: "+n),t.Lo.add(r),jo(t))}function jo(t){for(;t.Lo.size>0&&t.Bo.size<t.maxConcurrentLimboResolutions;){const e=t.Lo.values().next().value;t.Lo.delete(e);const n=new I(q.fromString(e)),r=t.Qo.next();t.Uo.set(r,new $y(n)),t.Bo=t.Bo.insert(n,r),_l(t.remoteStore,new _t(vt(Qr(n.path)),r,2,so.I))}}async function Kn(t,e,n){const r=C(t),s=[],i=[],o=[];r.Oo.isEmpty()||(r.Oo.forEach((a,c)=>{o.push(r.Go(c,e,n).then(u=>{if(u){r.isPrimaryClient&&r.sharedClientState.updateQueryState(c.targetId,u.fromCache?"not-current":"current"),s.push(u);const l=So.$n(c.targetId,u);i.push(l)}}))}),await Promise.all(o),r.Fo.Pr(s),await async function(a,c){const u=C(a);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",l=>y.forEach(c,h=>y.forEach(h.kn,d=>u.persistence.referenceDelegate.addReference(l,h.targetId,d)).next(()=>y.forEach(h.xn,d=>u.persistence.referenceDelegate.removeReference(l,h.targetId,d)))))}catch(l){if(!Hn(l))throw l;b("LocalStore","Failed to update sequence numbers: "+l)}for(const l of c){const h=l.targetId;if(!l.fromCache){const d=u.qn.get(h),f=d.snapshotVersion,m=d.withLastLimboFreeSnapshotVersion(f);u.qn=u.qn.insert(h,m)}}}(r.localStore,i))}async function Jy(t,e){const n=C(t);if(!n.currentUser.isEqual(e)){b("SyncEngine","User change. New user:",e.toKey());const r=await pl(n.localStore,e);n.currentUser=e,function(s,i){s.jo.forEach(o=>{o.forEach(a=>{a.reject(new E(p.CANCELLED,i))})}),s.jo.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Kn(n,r.Gn)}}function Xy(t,e){const n=C(t),r=n.Uo.get(e);if(r&&r.$o)return j().add(r.key);{let s=j();const i=n.Mo.get(e);if(!i)return s;for(const o of i){const a=n.Oo.get(o);s=s.unionWith(a.view.Po)}return s}}function Yy(t){const e=C(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ol.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Xy.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Wy.bind(null,e),e.Fo.Pr=My.bind(null,e.eventManager),e.Fo.zo=xy.bind(null,e.eventManager),e}function Qy(t){const e=C(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=zy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Gy.bind(null,e),e}class Zy{constructor(){this.synchronizeTabs=!1}async initialize(e){this.k=ds(e.databaseInfo.databaseId),this.sharedClientState=this.Jo(e),this.persistence=this.Yo(e),await this.persistence.start(),this.gcScheduler=this.Xo(e),this.localStore=this.Zo(e)}Xo(e){return null}Zo(e){return ey(this.persistence,new Qm,e.initialUser,this.k)}Yo(e){return new hy(Ro.ks,this.k)}Jo(e){return new fy}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class ev{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Dl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Jy.bind(null,this.syncEngine),await Dy(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Ly}createDatastore(e){const n=ds(e.databaseInfo.databaseId),r=(s=e.databaseInfo,new yy(s));var s;return function(i,o,a,c){return new Ey(i,o,a,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return n=this.localStore,r=this.datastore,s=e.asyncQueue,i=a=>Dl(this.syncEngine,a,0),o=vl.bt()?new vl:new py,new Ty(n,r,s,i,o);var n,r,s,i,o}createSyncEngine(e,n){return function(r,s,i,o,a,c,u){const l=new Vy(r,s,i,o,a,c);return u&&(l.Wo=!0),l}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=C(e);b("RemoteStore","RemoteStore shutting down."),n.Gr.add(5),await Gn(n),n.Hr.shutdown(),n.Jr.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.ea(this.observer.next,e)}error(e){this.observer.error?this.ea(this.observer.error,e):console.error("Uncaught Error in snapshot listener:",e)}na(){this.muted=!0}ea(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tv{constructor(e,n,r,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=we.UNAUTHENTICATED,this.clientId=_u.A(),this.authCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{b("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,()=>Promise.resolve())}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new E(p.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ve;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Mo(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function nv(t,e){t.asyncQueue.verifyOperationInProgress(),b("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await pl(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t.offlineComponents=e}async function rv(t,e){t.asyncQueue.verifyOperationInProgress();const n=await sv(t);b("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener(s=>async function(i,o){const a=C(i);a.asyncQueue.verifyOperationInProgress(),b("RemoteStore","RemoteStore received new credentials");const c=Tt(a);a.Gr.add(3),await Gn(a),c&&a.Jr.set("Unknown"),await a.remoteSyncer.handleCredentialChange(o),a.Gr.delete(3),await fs(a)}(e.remoteStore,s)),t.onlineComponents=e}async function sv(t){return t.offlineComponents||(b("FirestoreClient","Using default OfflineComponentProvider"),await nv(t,new Zy)),t.offlineComponents}async function Ul(t){return t.onlineComponents||(b("FirestoreClient","Using default OnlineComponentProvider"),await rv(t,new ev)),t.onlineComponents}function iv(t){return Ul(t).then(e=>e.syncEngine)}async function ms(t){const e=await Ul(t),n=e.eventManager;return n.onListen=jy.bind(null,e.syncEngine),n.onUnlisten=qy.bind(null,e.syncEngine),n}function ov(t,e,n={}){const r=new Ve;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,c){const u=new Bo({next:h=>{i.enqueueAndForget(()=>Uo(s,l));const d=h.docs.has(o);!d&&h.fromCache?c.reject(new E(p.UNAVAILABLE,"Failed to get document because the client is offline.")):d&&h.fromCache&&a&&a.source==="server"?c.reject(new E(p.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new $o(Qr(o.path),u,{includeMetadataChanges:!0,wo:!0});return xo(s,l)}(await ms(t),t.asyncQueue,e,n,r)),r.promise}function av(t,e,n={}){const r=new Ve;return t.asyncQueue.enqueueAndForget(async()=>function(s,i,o,a,c){const u=new Bo({next:h=>{i.enqueueAndForget(()=>Uo(s,l)),h.fromCache&&a.source==="server"?c.reject(new E(p.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(h)},error:h=>c.reject(h)}),l=new $o(o,u,{includeMetadataChanges:!0,wo:!0});return xo(s,l)}(await ms(t),t.asyncQueue,e,n,r)),r.promise}class cv{constructor(e,n,r,s,i,o,a,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=c}}class Jn{constructor(e,n){this.projectId=e,this.database=n||"(default)"}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Jn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $l(t,e,n){if(!n)throw new E(p.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function uv(t,e,n,r){if(e===!0&&r===!0)throw new E(p.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Vl(t){if(!I.isDocumentKey(t))throw new E(p.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function jl(t){if(I.isDocumentKey(t))throw new E(p.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ys(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":k()}function Ie(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new E(p.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ys(t);throw new E(p.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e){var n;if(e.host===void 0){if(e.ssl!==void 0)throw new E(p.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new E(p.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,uv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e,n,r){this._authCredentials=n,this._appCheckCredentials=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bl({}),this._settingsFrozen=!1,e instanceof Jn?this._databaseId=e:(this._app=e,this._databaseId=function(s){if(!Object.prototype.hasOwnProperty.apply(s.options,["projectId"]))throw new E(p.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Jn(s.options.projectId)}(e))}get app(){if(!this._app)throw new E(p.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new E(p.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bl(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new Vg;switch(n.type){case"gapi":const r=n.client;return $(!(typeof r!="object"||r===null||!r.auth||!r.auth.getAuthHeaderValueForFirstParty)),new qg(r,n.sessionIndex||"0",n.iamToken||null);case"provider":return n.client;default:throw new E(p.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Fl.get(e);n&&(b("ComponentProvider","Removing Datastore"),Fl.delete(e),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Qe(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new le(this.firestore,e,this._key)}}class bt{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new bt(this.firestore,e,this._query)}}class Qe extends bt{constructor(e,n,r){super(e,n,Qr(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new le(this.firestore,null,new I(e))}withConverter(e){return new Qe(this.firestore,e,this._path)}}function e0(t,e,...n){if(t=z(t),$l("collection","path",e),t instanceof qo){const r=q.fromString(e,...n);return jl(r),new Qe(t,null,r)}{if(!(t instanceof le||t instanceof Qe))throw new E(p.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(q.fromString(e,...n));return jl(r),new Qe(t.firestore,null,r)}}function lv(t,e,...n){if(t=z(t),arguments.length===1&&(e=_u.A()),$l("doc","path",e),t instanceof qo){const r=q.fromString(e,...n);return Vl(r),new le(t,null,new I(r))}{if(!(t instanceof le||t instanceof Qe))throw new E(p.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(q.fromString(e,...n));return Vl(r),new le(t.firestore,t instanceof Qe?t.converter:null,new I(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(){this.ma=Promise.resolve(),this.ga=[],this.ya=!1,this.pa=[],this.Ta=null,this.Ea=!1,this.Ia=!1,this.Aa=[],this.ur=new wl(this,"async_queue_retry"),this.Ra=()=>{const n=No();n&&b("AsyncQueue","Visibility state changed to "+n.visibilityState),this.ur.er()};const e=No();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Ra)}get isShuttingDown(){return this.ya}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Pa(),this.ba(e)}enterRestrictedMode(e){if(!this.ya){this.ya=!0,this.Ia=e||!1;const n=No();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Ra)}}enqueue(e){if(this.Pa(),this.ya)return new Promise(()=>{});const n=new Ve;return this.ba(()=>this.ya&&this.Ia?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.ga.push(e),this.va()))}async va(){if(this.ga.length!==0){try{await this.ga[0](),this.ga.shift(),this.ur.reset()}catch(e){if(!Hn(e))throw e;b("AsyncQueue","Operation failed with retryable error: "+e)}this.ga.length>0&&this.ur.Zi(()=>this.va())}}ba(e){const n=this.ma.then(()=>(this.Ea=!0,e().catch(r=>{this.Ta=r,this.Ea=!1;const s=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(r);throw Je("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.Ea=!1,r))));return this.ma=n,n}enqueueAfterDelay(e,n,r){this.Pa(),this.Aa.indexOf(e)>-1&&(n=0);const s=Lo.createAndSchedule(this,e,n,r,i=>this.Va(i));return this.pa.push(s),s}Pa(){this.Ta&&k()}verifyOperationInProgress(){}async Sa(){let e;do e=this.ma,await e;while(e!==this.ma)}Da(e){for(const n of this.pa)if(n.timerId===e)return!0;return!1}Ca(e){return this.Sa().then(()=>{this.pa.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.pa)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Sa()})}Na(e){this.Aa.push(e)}Va(e){const n=this.pa.indexOf(e);this.pa.splice(n,1)}}function ql(t){return function(e,n){if(typeof e!="object"||e===null)return!1;const r=e;for(const s of n)if(s in r&&typeof r[s]=="function")return!0;return!1}(t,["next","error","complete"])}class qe extends qo{constructor(e,n,r){super(e,n,r),this.type="firestore",this._queue=new hv,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||Hl(this),this._firestoreClient.terminate()}}function t0(t=hi()){return _r(t,"firestore").getImmediate()}function vs(t){return t._firestoreClient||Hl(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function Hl(t){var e;const n=t._freezeSettings(),r=function(s,i,o,a){return new cv(s,i,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new tv(t._authCredentials,t._appCheckCredentials,t._queue,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new E(p.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ee(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new tn(ae.fromBase64String(e))}catch(n){throw new E(p.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new tn(ae.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new E(p.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new E(p.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return F(this._lat,e._lat)||F(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dv=/^__.*__$/;class fv{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new wt(e,this.data,this.fieldMask,n,this.fieldTransforms):new as(e,this.data,n,this.fieldTransforms)}}class Wl{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new wt(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function zl(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw k()}}class Es{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.k=r,this.ignoreUndefinedProperties=s,i===void 0&&this.ka(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get xa(){return this.settings.xa}$a(e){return new Es(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.k,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Fa(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.$a({path:r,Oa:!1});return s.Ma(e),s}La(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.$a({path:r,Oa:!1});return s.ka(),s}Ba(e){return this.$a({path:void 0,Oa:!0})}Ua(e){return bs(e,this.settings.methodName,this.settings.qa||!1,this.path,this.settings.Ka)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}ka(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ma(this.path.get(e))}Ma(e){if(e.length===0)throw this.Ua("Document fields must not be empty");if(zl(this.xa)&&dv.test(e))throw this.Ua('Document fields cannot begin and end with "__"')}}class pv{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.k=r||ds(e)}ja(e,n,r,s=!1){return new Es({xa:e,methodName:n,Ka:r,path:Ee.emptyPath(),Oa:!1,qa:s},this.databaseId,this.k,this.ignoreUndefinedProperties)}}function _s(t){const e=t._freezeSettings(),n=ds(t._databaseId);return new pv(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Gl(t,e,n,r,s,i={}){const o=t.ja(i.merge||i.mergeFields?2:0,e,n,s);zo("Data must be an object, but it was:",o,r);const a=Jl(r,o);let c,u;if(i.merge)c=new Un(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const l=[];for(const h of i.mergeFields){const d=Go(e,h,n);if(!o.contains(d))throw new E(p.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);Yl(l,d)||l.push(d)}c=new Un(l),u=o.fieldTransforms.filter(h=>c.covers(h.field))}else c=null,u=o.fieldTransforms;return new fv(new be(a),c,u)}class Ts extends nn{_toFieldTransform(e){if(e.xa!==2)throw e.xa===1?e.Ua(`${this._methodName}() can only appear at the top level of your update data`):e.Ua(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ts}}function Kl(t,e,n){return new Es({xa:3,Ka:e.settings.Ka,methodName:t._methodName,Oa:n},e.databaseId,e.k,e.ignoreUndefinedProperties)}class Wo extends nn{_toFieldTransform(e){return new yo(e.path,new Bn)}isEqual(e){return e instanceof Wo}}class gv extends nn{constructor(e,n){super(e),this.Qa=n}_toFieldTransform(e){const n=Kl(this,e,!0),r=this.Qa.map(i=>It(i,n)),s=new Gt(r);return new yo(e.path,s)}isEqual(e){return this===e}}class mv extends nn{constructor(e,n){super(e),this.Qa=n}_toFieldTransform(e){const n=Kl(this,e,!0),r=this.Qa.map(i=>It(i,n)),s=new Kt(r);return new yo(e.path,s)}isEqual(e){return this===e}}function yv(t,e,n,r){const s=t.ja(1,e,n);zo("Data must be an object, but it was:",s,r);const i=[],o=be.empty();mt(r,(c,u)=>{const l=Ko(e,c,n);u=z(u);const h=s.La(l);if(u instanceof Ts)i.push(l);else{const d=It(u,h);d!=null&&(i.push(l),o.set(l,d))}});const a=new Un(i);return new Wl(o,a,s.fieldTransforms)}function vv(t,e,n,r,s,i){const o=t.ja(1,e,n),a=[Go(e,r,n)],c=[s];if(i.length%2!=0)throw new E(p.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Go(e,i[d])),c.push(i[d+1]);const u=[],l=be.empty();for(let d=a.length-1;d>=0;--d)if(!Yl(u,a[d])){const f=a[d];let m=c[d];m=z(m);const _=o.La(f);if(m instanceof Ts)u.push(f);else{const v=It(m,_);v!=null&&(u.push(f),l.set(f,v))}}const h=new Un(u);return new Wl(l,h,o.fieldTransforms)}function wv(t,e,n,r=!1){return It(n,t.ja(r?4:3,e))}function It(t,e){if(Xl(t=z(t)))return zo("Unsupported field value:",e,t),Jl(t,e);if(t instanceof nn)return function(n,r){if(!zl(r.xa))throw r.Ua(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Ua(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(r);s&&r.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.Oa&&e.xa!==4)throw e.Ua("Nested arrays are not supported");return function(n,r){const s=[];let i=0;for(const o of n){let a=It(o,r.Ba(i));a==null&&(a={nullValue:"NULL_VALUE"}),s.push(a),i++}return{arrayValue:{values:s}}}(t,e)}return function(n,r){if((n=z(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return lm(r.k,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=Te.fromDate(n);return{timestampValue:hs(r.k,s)}}if(n instanceof Te){const s=new Te(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:hs(r.k,s)}}if(n instanceof Ho)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof tn)return{bytesValue:il(r.k,n._byteString)};if(n instanceof le){const s=r.databaseId,i=n.firestore._databaseId;if(!i.isEqual(s))throw r.Ua(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Eo(n.firestore._databaseId||r.databaseId,n._key.path)}}throw r.Ua(`Unsupported field value: ${ys(n)}`)}(t,e)}function Jl(t,e){const n={};return bu(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):mt(t,(r,s)=>{const i=It(s,e.Fa(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function Xl(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Te||t instanceof Ho||t instanceof tn||t instanceof le||t instanceof nn)}function zo(t,e,n){if(!Xl(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=ys(n);throw r==="an object"?e.Ua(t+" a custom object"):e.Ua(t+" "+r)}}function Go(t,e,n){if((e=z(e))instanceof ws)return e._internalPath;if(typeof e=="string")return Ko(t,e);throw bs("Field path arguments must be of type string or FieldPath.",t,!1,void 0,n)}const Ev=new RegExp("[~\\*/\\[\\]]");function Ko(t,e,n){if(e.search(Ev)>=0)throw bs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ws(...e.split("."))._internalPath}catch{throw bs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function bs(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new E(p.INVALID_ARGUMENT,a+t+c)}function Yl(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new _v(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Is("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class _v extends Ql{data(){return super.data()}}function Is(t,e){return typeof e=="string"?Ko(t,e):e instanceof ws?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Zl extends Ql{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new As(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Is("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class As extends Zl{data(e={}){return super.data(e)}}class eh{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Xn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new As(this._firestore,this._userDataWriter,r.key,r,new Xn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new E(p.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(r,s){if(r._snapshot.oldDocs.isEmpty()){let i=0;return r._snapshot.docChanges.map(o=>({type:"added",doc:new As(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Xn(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter),oldIndex:-1,newIndex:i++}))}{let i=r._snapshot.oldDocs;return r._snapshot.docChanges.filter(o=>s||o.type!==3).map(o=>{const a=new As(r._firestore,r._userDataWriter,o.doc.key,o.doc,new Xn(r._snapshot.mutatedKeys.has(o.doc.key),r._snapshot.fromCache),r.query.converter);let c=-1,u=-1;return o.type!==0&&(c=i.indexOf(o.doc.key),i=i.delete(o.doc.key)),o.type!==1&&(i=i.add(o.doc),u=i.indexOf(o.doc.key)),{type:Tv(o.type),doc:a,oldIndex:c,newIndex:u}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function Tv(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return k()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function th(t){if(es(t)&&t.explicitOrderBy.length===0)throw new E(p.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class nh{}function n0(t,...e){for(const n of e)t=n._apply(t);return t}class bv extends nh{constructor(e,n,r){super(),this.Ga=e,this.za=n,this.Ha=r,this.type="where"}_apply(e){const n=_s(e.firestore),r=function(s,i,o,a,c,u,l){let h;if(c.isKeyField()){if(u==="array-contains"||u==="array-contains-any")throw new E(p.INVALID_ARGUMENT,`Invalid Query. You can't perform '${u}' queries on FieldPath.documentId().`);if(u==="in"||u==="not-in"){sh(l,u);const f=[];for(const m of l)f.push(rh(a,s,m));h={arrayValue:{values:f}}}else h=rh(a,s,l)}else u!=="in"&&u!=="not-in"&&u!=="array-contains-any"||sh(l,u),h=wv(o,i,l,u==="in"||u==="not-in");const d=ge.create(c,u,h);return function(f,m){if(m.V()){const v=go(f);if(v!==null&&!v.isEqual(m.field))throw new E(p.INVALID_ARGUMENT,`Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${v.toString()}' and '${m.field.toString()}'`);const D=po(f);D!==null&&ih(f,m.field,D)}const _=function(v,D){for(const L of v.filters)if(D.indexOf(L.op)>=0)return L.op;return null}(f,function(v){switch(v){case"!=":return["!=","not-in"];case"array-contains":return["array-contains","array-contains-any","not-in"];case"in":return["array-contains-any","in","not-in"];case"array-contains-any":return["array-contains","array-contains-any","in","not-in"];case"not-in":return["array-contains","array-contains-any","in","not-in","!="];default:return[]}}(m.op));if(_!==null)throw _===m.op?new E(p.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${m.op.toString()}' filter.`):new E(p.INVALID_ARGUMENT,`Invalid query. You cannot use '${m.op.toString()}' filters with '${_.toString()}' filters.`)}(s,d),d}(e._query,"where",n,e.firestore._databaseId,this.Ga,this.za,this.Ha);return new bt(e.firestore,e.converter,function(s,i){const o=s.filters.concat([i]);return new zt(s.path,s.collectionGroup,s.explicitOrderBy.slice(),o,s.limit,s.limitType,s.startAt,s.endAt)}(e._query,r))}}function r0(t,e,n){const r=e,s=Is("where",t);return new bv(s,r,n)}class Iv extends nh{constructor(e,n){super(),this.Ga=e,this.Ja=n,this.type="orderBy"}_apply(e){const n=function(r,s,i){if(r.startAt!==null)throw new E(p.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(r.endAt!==null)throw new E(p.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");const o=new Wt(s,i);return function(a,c){if(po(a)===null){const u=go(a);u!==null&&ih(a,u,c.field)}}(r,o),o}(e._query,this.Ga,this.Ja);return new bt(e.firestore,e.converter,function(r,s){const i=r.explicitOrderBy.concat([s]);return new zt(r.path,r.collectionGroup,i,r.filters.slice(),r.limit,r.limitType,r.startAt,r.endAt)}(e._query,n))}}function s0(t,e="asc"){const n=e,r=Is("orderBy",t);return new Iv(r,n)}function rh(t,e,n){if(typeof(n=z(n))=="string"){if(n==="")throw new E(p.INVALID_ARGUMENT,"Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");if(!Mu(e)&&n.indexOf("/")!==-1)throw new E(p.INVALID_ARGUMENT,`Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(q.fromString(n));if(!I.isDocumentKey(r))throw new E(p.INVALID_ARGUMENT,`Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ku(t,new I(r))}if(n instanceof le)return ku(t,n._key);throw new E(p.INVALID_ARGUMENT,`Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ${ys(n)}.`)}function sh(t,e){if(!Array.isArray(t)||t.length===0)throw new E(p.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);if(t.length>10)throw new E(p.INVALID_ARGUMENT,`Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`)}function ih(t,e,n){if(!n.isEqual(e))throw new E(p.INVALID_ARGUMENT,`Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{convertValue(e,n="none"){switch(yt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return J(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Bt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw k()}}convertObject(e,n){const r={};return mt(e.fields,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertGeoPoint(e){return new Ho(J(e.latitude),J(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Au(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Fn(e));default:return null}}convertTimestamp(e){const n=Xe(e);return new Te(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=q.fromString(e);$(dl(r));const s=new Jn(r.get(1),r.get(3)),i=new I(r.popFirst(5));return s.isEqual(n)||Je(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i0(t){t=Ie(t,le);const e=Ie(t.firestore,qe);return ov(vs(e),t._key).then(n=>ah(e,t,n))}class Jo extends Av{constructor(e){super(),this.firestore=e}convertBytes(e){return new tn(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new le(this.firestore,null,n)}}function o0(t){t=Ie(t,bt);const e=Ie(t.firestore,qe),n=vs(e),r=new Jo(e);return th(t._query),av(n,t._query).then(s=>new eh(e,r,t,s))}function a0(t,e,n){t=Ie(t,le);const r=Ie(t.firestore,qe),s=oh(t.converter,e,n);return Ss(r,[Gl(_s(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,je.none())])}function c0(t,e,n,...r){t=Ie(t,le);const s=Ie(t.firestore,qe),i=_s(s);let o;return o=typeof(e=z(e))=="string"||e instanceof ws?vv(i,"updateDoc",t._key,e,n,r):yv(i,"updateDoc",t._key,e),Ss(s,[o.toMutation(t._key,je.exists(!0))])}function u0(t){return Ss(Ie(t.firestore,qe),[new Xu(t._key,je.none())])}function l0(t,e){const n=Ie(t.firestore,qe),r=lv(t),s=oh(t.converter,e);return Ss(n,[Gl(_s(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,je.exists(!1))]).then(()=>r)}function h0(t,...e){var n,r,s;t=z(t);let i={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||ql(e[o])||(i=e[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(ql(e[o])){const h=e[o];e[o]=(n=h.next)===null||n===void 0?void 0:n.bind(h),e[o+1]=(r=h.error)===null||r===void 0?void 0:r.bind(h),e[o+2]=(s=h.complete)===null||s===void 0?void 0:s.bind(h)}let c,u,l;if(t instanceof le)u=Ie(t.firestore,qe),l=Qr(t._key.path),c={next:h=>{e[o]&&e[o](ah(u,t,h))},error:e[o+1],complete:e[o+2]};else{const h=Ie(t,bt);u=Ie(h.firestore,qe),l=h._query;const d=new Jo(u);c={next:f=>{e[o]&&e[o](new eh(u,d,h,f))},error:e[o+1],complete:e[o+2]},th(t._query)}return function(h,d,f,m){const _=new Bo(m),v=new $o(d,_,f);return h.asyncQueue.enqueueAndForget(async()=>xo(await ms(h),v)),()=>{_.na(),h.asyncQueue.enqueueAndForget(async()=>Uo(await ms(h),v))}}(vs(u),l,a,c)}function Ss(t,e){return function(n,r){const s=new Ve;return n.asyncQueue.enqueueAndForget(async()=>Hy(await iv(n),r,s)),s.promise}(vs(t),e)}function ah(t,e,n){const r=n.docs.get(e._key),s=new Jo(t);return new Zl(t,s,e._key,r,new Xn(n.hasPendingWrites,n.fromCache),e.converter)}function d0(){return new Wo("serverTimestamp")}function f0(...t){return new gv("arrayUnion",t)}function p0(...t){return new mv("arrayRemove",t)}(function(t,e=!0){(function(n){Vt=n})(Lt),Pt(new ct("firestore",(n,{options:r})=>{const s=n.getProvider("app").getImmediate(),i=new qe(s,new jg(n.getProvider("auth-internal")),new Wg(n.getProvider("app-check-internal")));return r=Object.assign({useFetchStreams:e},r),i._setSettings(r),i},"PUBLIC")),De(vu,"3.4.0",t),De(vu,"3.4.0","esm2017")})();/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function Xo(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function ch(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Sv=ch,uh=new pn("auth","Firebase",ch());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh=new ai("@firebase/auth");function ks(t,...e){lh.logLevel<=P.ERROR&&lh.error(`Auth (${Lt}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(t,...e){throw Yo(t,...e)}function Le(t,...e){return Yo(t,...e)}function hh(t,e,n){const r=Object.assign(Object.assign({},Sv()),{[e]:n});return new pn("auth","Firebase",r).create(e,{appName:t.name})}function kv(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&ke(t,"argument-error"),hh(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Yo(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return uh.create(t,...e)}function S(t,e,...n){if(!t)throw Yo(e,...n)}function He(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ks(e),new Error(e)}function We(t,e){t||He(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh=new Map;function ze(t){We(t instanceof Function,"Expected a class definition");let e=dh.get(t);return e?(We(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,dh.set(t,e),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cv(t,e){const n=_r(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(wr(i,e!=null?e:{}))return s;ke(s,"already-initialized")}return n.initialize({options:e})}function Rv(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ze);(e==null?void 0:e.errorMap)&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Nv(){return fh()==="http:"||fh()==="https:"}function fh(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ov(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Nv()||Ya()||"connection"in navigator)?navigator.onLine:!0}function Dv(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e,n){this.shortDelay=e,this.longDelay=n,We(n>e,"Short delay should be less than long delay!"),this.isMobile=Xa()||Qa()}get(){return Ov()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(t,e){We(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;He("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;He("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;He("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pv={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lv=new Yn(3e4,6e4);function Qn(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function rn(t,e,n,r,s={}){return ph(t,s,()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const a=gn(Object.assign({key:t.config.apiKey},o)).slice(1),c=new(ea.headers());return c.set("Content-Type","application/json"),c.set("X-Client-Version",t._getSdkClientVersion()),t.languageCode&&c.set("X-Firebase-Locale",t.languageCode),ea.fetch()(gh(t,t.config.apiHost,n,a),Object.assign({method:e,headers:c,referrerPolicy:"no-referrer"},i))})}async function ph(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Pv),e);try{const s=new Mv(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw ta(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw ta(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw ta(t,"email-already-in-use",o);const l=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw hh(t,l,u);ke(t,l)}}catch(s){if(s instanceof at)throw s;ke(t,"network-request-failed")}}async function Zn(t,e,n,r,s={}){const i=await rn(t,e,n,r,s);return"mfaPendingCredential"in i&&ke(t,"multi-factor-auth-required",{_serverResponse:i}),i}function gh(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Zo(t.config,s):`${t.config.apiScheme}://${s}`}class Mv{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Le(this.auth,"timeout")),Lv.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ta(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=Le(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xv(t,e){return rn(t,"POST","/v1/accounts:delete",e)}async function Uv(t,e){return rn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Fv(t,e=!1){const n=z(t),r=await n.getIdToken(e),s=ra(r);S(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:er(na(s.auth_time)),issuedAtTime:er(na(s.iat)),expirationTime:er(na(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function na(t){return Number(t)*1e3}function ra(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ks("JWT malformed, contained fewer than 3 sections"),null;try{const s=Mf(n);return s?JSON.parse(s):(ks("Failed to decode base64 JWT payload"),null)}catch(s){return ks("Caught error parsing JWT payload as JSON",s),null}}function $v(t){const e=ra(t);return S(e,"internal-error"),S(typeof e.exp!="undefined","internal-error"),S(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sn(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof at&&Vv(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Vv({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=er(this.lastLoginAt),this.creationTime=er(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cs(t){var e;const n=t.auth,r=await t.getIdToken(),s=await sn(t,Uv(n,{idToken:r}));S(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=((e=i.providerUserInfo)===null||e===void 0?void 0:e.length)?Hv(i.providerUserInfo):[],a=qv(t.providerData,o),c=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(a==null?void 0:a.length),l=c?u:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new mh(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,h)}async function Bv(t){const e=z(t);await Cs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function qv(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Hv(t){return t.map(e=>{var{providerId:n}=e,r=Xo(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wv(t,e){const n=await ph(t,{},()=>{const r=gn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=gh(t,s,"/v1/token",`key=${i}`);return ea.fetch()(o,{method:"POST",headers:{"X-Client-Version":t._getSdkClientVersion(),"Content-Type":"application/x-www-form-urlencoded"},body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken!="undefined","internal-error"),S(typeof e.refreshToken!="undefined","internal-error");const n="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):$v(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return S(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await Wv(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new tr;return r&&(S(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(S(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(S(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new tr,this.toJSON())}_performRefresh(){return He("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(t,e){S(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class At{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Xo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.emailVerified=!1,this.isAnonymous=!1,this.tenantId=null,this.providerData=[],this.proactiveRefresh=new jv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.metadata=new mh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await sn(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Fv(this,e)}reload(){return Bv(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new At(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Cs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await sn(this,xv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,a,c,u,l;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,d=(s=n.email)!==null&&s!==void 0?s:void 0,f=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,m=(o=n.photoURL)!==null&&o!==void 0?o:void 0,_=(a=n.tenantId)!==null&&a!==void 0?a:void 0,v=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,D=(u=n.createdAt)!==null&&u!==void 0?u:void 0,L=(l=n.lastLoginAt)!==null&&l!==void 0?l:void 0,{uid:R,emailVerified:U,isAnonymous:ye,providerData:ve,stsTokenManager:Ce}=n;S(R&&Ce,e,"internal-error");const Ue=tr.fromJSON(this.name,Ce);S(typeof R=="string",e,"internal-error"),Ze(h,e.name),Ze(d,e.name),S(typeof U=="boolean",e,"internal-error"),S(typeof ye=="boolean",e,"internal-error"),Ze(f,e.name),Ze(m,e.name),Ze(_,e.name),Ze(v,e.name),Ze(D,e.name),Ze(L,e.name);const it=new At({uid:R,auth:e,email:d,emailVerified:U,displayName:h,isAnonymous:ye,photoURL:m,phoneNumber:f,tenantId:_,stsTokenManager:Ue,createdAt:D,lastLoginAt:L});return ve&&Array.isArray(ve)&&(it.providerData=ve.map(dn=>Object.assign({},dn))),v&&(it._redirectEventId=v),it}static async _fromIdTokenResponse(e,n,r=!1){const s=new tr;s.updateFromServerResponse(n);const i=new At({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Cs(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}yh.type="NONE";const vh=yh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(t,e,n){return`firebase:${t}:${e}:${n}`}class on{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Rs(this.userKey,s.apiKey,i),this.fullPersistenceKey=Rs("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?At._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new on(ze(vh),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||ze(vh);const o=Rs(r,e.config.apiKey,e.name);let a=null;for(const u of n)try{const l=await u._get(o);if(l){const h=At._fromJSON(e,l);u!==i&&(a=h),i=u;break}}catch{}const c=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new on(i,e,r):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new on(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Th(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Eh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ih(e))return"Blackberry";if(Ah(e))return"Webos";if(sa(e))return"Safari";if((e.includes("chrome/")||_h(e))&&!e.includes("edge/"))return"Chrome";if(bh(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Eh(t=Y()){return/firefox\//i.test(t)}function sa(t=Y()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function _h(t=Y()){return/crios\//i.test(t)}function Th(t=Y()){return/iemobile/i.test(t)}function bh(t=Y()){return/android/i.test(t)}function Ih(t=Y()){return/blackberry/i.test(t)}function Ah(t=Y()){return/webos/i.test(t)}function Ns(t=Y()){return/iphone|ipad|ipod/i.test(t)}function zv(t=Y()){var e;return Ns(t)&&!!((e=window.navigator)===null||e===void 0?void 0:e.standalone)}function Gv(){return Za()&&document.documentMode===10}function Sh(t=Y()){return Ns(t)||bh(t)||Ah(t)||Ih(t)||/windows phone/i.test(t)||Th(t)}function Kv(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(t,e=[]){let n;switch(t){case"Browser":n=wh(Y());break;case"Worker":n=`${wh(Y())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Lt}/${r}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jv{constructor(e,n){this.app=e,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ch(this),this.idTokenSubscription=new Ch(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=uh,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ze(n)),this._initializationPromise=this.queue(async()=>{var r,s;this._deleted||(this.persistenceManager=await on.create(this,e),!this._deleted&&(((r=this._popupRedirectResolver)===null||r===void 0?void 0:r._shouldInitProactively)&&await this._popupRedirectResolver._initialize(this),await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)))}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e)}}async initializeCurrentUser(e){var n;let r=await this.assertedPersistence.getCurrentUser();if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,i=r==null?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);(!s||s===i)&&(o==null?void 0:o.user)&&(r=o.user)}return r?r._redirectEventId?(S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)):this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Cs(e)}catch(n){if(n.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Dv()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?z(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(ze(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new pn("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ze(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await on.create(this,[ze(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return S(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,r,s):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=kh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}_getSdkClientVersion(){return this.clientVersion}}function nr(t){return z(t)}class Ch{constructor(e){this.auth=e,this.observer=null,this.addObserver=qf(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return He("not implemented")}_getIdTokenResponse(e){return He("not implemented")}_linkToIdToken(e,n){return He("not implemented")}_getReauthenticationResolver(e){return He("not implemented")}}async function Xv(t,e){return rn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yv(t,e){return Zn(t,"POST","/v1/accounts:signInWithPassword",Qn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qv(t,e){return Zn(t,"POST","/v1/accounts:signInWithEmailLink",Qn(t,e))}async function Zv(t,e){return Zn(t,"POST","/v1/accounts:signInWithEmailLink",Qn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr extends ia{constructor(e,n,r,s=null){super("password",r);this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new rr(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new rr(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if((n==null?void 0:n.email)&&(n==null?void 0:n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Yv(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Qv(e,{email:this._email,oobCode:this._password});default:ke(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return Xv(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Zv(e,{idToken:n,email:this._email,oobCode:this._password});default:ke(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function an(t,e){return Zn(t,"POST","/v1/accounts:signInWithIdp",Qn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ew="http://localhost";class St extends ia{constructor(){super(...arguments);this.pendingToken=null}static _fromParams(e){const n=new St(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ke("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Xo(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new St(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return an(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,an(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,an(e,n)}buildRequest(){const e={requestUri:ew,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=gn(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function nw(t){const e=mn(yn(t)).link,n=e?mn(yn(e)).deep_link_id:null,r=mn(yn(t)).deep_link_id;return(r?mn(yn(r)).link:null)||r||n||e||t}class oa{constructor(e){var n,r,s,i,o,a;const c=mn(yn(e)),u=(n=c.apiKey)!==null&&n!==void 0?n:null,l=(r=c.oobCode)!==null&&r!==void 0?r:null,h=tw((s=c.mode)!==null&&s!==void 0?s:null);S(u&&l&&h,"argument-error"),this.apiKey=u,this.operation=h,this.code=l,this.continueUrl=(i=c.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=nw(e);try{return new oa(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(){this.providerId=cn.PROVIDER_ID}static credential(e,n){return rr._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=oa.parseLink(n);return S(r,"argument-error"),rr._fromEmailAndCode(e,r.code,r.tenantId)}}cn.PROVIDER_ID="password";cn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";cn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr extends aa{constructor(){super(...arguments);this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et extends sr{constructor(){super("facebook.com")}static credential(e){return St._fromParams({providerId:et.PROVIDER_ID,signInMethod:et.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return et.credentialFromTaggedObject(e)}static credentialFromError(e){return et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return et.credential(e.oauthAccessToken)}catch{return null}}}et.FACEBOOK_SIGN_IN_METHOD="facebook.com";et.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt extends sr{constructor(){super("google.com");this.addScope("profile")}static credential(e,n){return St._fromParams({providerId:tt.PROVIDER_ID,signInMethod:tt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return tt.credentialFromTaggedObject(e)}static credentialFromError(e){return tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return tt.credential(n,r)}catch{return null}}}tt.GOOGLE_SIGN_IN_METHOD="google.com";tt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt extends sr{constructor(){super("github.com")}static credential(e){return St._fromParams({providerId:nt.PROVIDER_ID,signInMethod:nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nt.credentialFromTaggedObject(e)}static credentialFromError(e){return nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nt.credential(e.oauthAccessToken)}catch{return null}}}nt.GITHUB_SIGN_IN_METHOD="github.com";nt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt extends sr{constructor(){super("twitter.com")}static credential(e,n){return St._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return rt.credential(n,r)}catch{return null}}}rt.TWITTER_SIGN_IN_METHOD="twitter.com";rt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rw(t,e){return Zn(t,"POST","/v1/accounts:signUp",Qn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await At._fromIdTokenResponse(e,r,s),o=Rh(r);return new kt({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Rh(r);return new kt({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Rh(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends at{constructor(e,n,r,s){var i;super(n.code,n.message);this.operationType=r,this.user=s,Object.setPrototypeOf(this,Os.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Os(e,n,r,s)}}function Nh(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Os._fromErrorAndOperation(t,i,e,r):i})}async function sw(t,e,n=!1){const r=await sn(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return kt._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oh(t,e,n=!1){const{auth:r}=t,s="reauthenticate";try{const i=await sn(t,Nh(r,s,e,t),n);S(i.idToken,r,"internal-error");const o=ra(i.idToken);S(o,r,"internal-error");const{sub:a}=o;return S(t.uid===a,r,"user-mismatch"),kt._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ke(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dh(t,e,n=!1){const r="signIn",s=await Nh(t,r,e),i=await kt._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function iw(t,e){return Dh(nr(t),e)}async function g0(t,e){return Oh(z(t),e)}async function m0(t,e,n){const r=nr(t),s=await rw(r,{returnSecureToken:!0,email:e,password:n}),i=await kt._fromIdTokenResponse(r,"signIn",s);return await r._updateCurrentUser(i.user),i}function y0(t,e,n){return iw(z(t),cn.credential(e,n))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ow(t,e){return rn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function v0(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=z(t),i={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await sn(r,ow(r.auth,i));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function w0(t,e,n,r){return z(t).onAuthStateChanged(e,n,r)}const Ds="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ds,"1"),this.storage.removeItem(Ds),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aw(){const t=Y();return sa(t)||Ns(t)}const cw=1e3,uw=10;class Lh extends Ph{constructor(){super(()=>window.localStorage,"LOCAL");this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=aw()&&Kv(),this.fallbackToPolling=Sh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(r);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(r,e.newValue):this.storage.removeItem(r);else if(this.localCache[r]===e.newValue&&!n)return}const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Gv()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,uw):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},cw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Lh.type="LOCAL";const lw=Lh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mh extends Ph{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Mh.type="SESSION";const xh=Mh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hw(t){return Promise.all(t.map(async e=>{try{const n=await e;return{fulfilled:!0,value:n}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Ps(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o==null?void 0:o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const a=Array.from(o).map(async u=>u(n.origin,i)),c=await hw(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ps.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const u=ca("",20);s.port1.start();const l=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(h){const d=h;if(d.data.eventId===u)switch(d.data.status){case"ack":clearTimeout(l),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(d.data.response);break;default:clearTimeout(l),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(){return window}function fw(t){Me().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uh(){return typeof Me().WorkerGlobalScope!="undefined"&&typeof Me().importScripts=="function"}async function pw(){if(!(navigator==null?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function gw(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function mw(){return Uh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh="firebaseLocalStorageDb",yw=1,Ls="firebaseLocalStorage",$h="fbase_key";class ir{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ms(t,e){return t.transaction([Ls],e?"readwrite":"readonly").objectStore(Ls)}function vw(){const t=indexedDB.deleteDatabase(Fh);return new ir(t).toPromise()}function ua(){const t=indexedDB.open(Fh,yw);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Ls,{keyPath:$h})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Ls)?e(r):(r.close(),await vw(),e(await ua()))})})}async function Vh(t,e,n){const r=Ms(t,!0).put({[$h]:e,value:n});return new ir(r).toPromise()}async function ww(t,e){const n=Ms(t,!1).get(e),r=await new ir(n).toPromise();return r===void 0?null:r.value}function jh(t,e){const n=Ms(t,!0).delete(e);return new ir(n).toPromise()}const Ew=800,_w=3;class Bh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ua(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>_w)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Uh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ps._getInstance(mw()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await pw(),!this.activeServiceWorker)return;this.sender=new dw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);!r||((e=r[0])===null||e===void 0?void 0:e.fulfilled)&&((n=r[0])===null||n===void 0?void 0:n.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||gw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ua();return await Vh(e,Ds,"1"),await jh(e,Ds),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Vh(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>ww(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>jh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ms(s,!1).getAll();return new ir(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ew)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Bh.type="LOCAL";const Tw=Bh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bw(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Iw(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=Le("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",bw().appendChild(r)})}function Aw(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Yn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qh(t,e){return e?ze(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la extends ia{constructor(e){super("custom","custom");this.params=e}_getIdTokenResponse(e){return an(e,this._buildIdpRequest())}_linkToIdToken(e,n){return an(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return an(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Sw(t){return Dh(t.auth,new la(t),t.bypassAuthState)}function kw(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),Oh(n,new la(t),t.bypassAuthState)}async function Cw(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),sw(n,new la(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Sw;case"linkViaPopup":case"linkViaRedirect":return Cw;case"reauthViaPopup":case"reauthViaRedirect":return kw;default:ke(this.auth,"internal-error")}}resolve(e){We(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){We(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rw=new Yn(2e3,1e4);async function E0(t,e,n){const r=nr(t);kv(t,e,aa);const s=qh(r,n);return new Ct(r,"signInViaPopup",e,s).executeNotNull()}class Ct extends Hh{constructor(e,n,r,s,i){super(e,n,s,i);this.provider=r,this.authWindow=null,this.pollId=null,Ct.currentPopupAction&&Ct.currentPopupAction.cancel(),Ct.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){We(this.filter.length===1,"Popup operations only handle one event");const e=ca();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Le(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Le(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ct.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0?void 0:r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Le(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Rw.get())};e()}}Ct.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nw="pendingRedirect",ha=new Map;class Ow extends Hh{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r);this.eventId=null}async execute(){let e=ha.get(this.auth._key());if(!e){try{const r=await Dw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}ha.set(this.auth._key(),e)}return this.bypassAuthState||ha.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Dw(t,e){const n=Lw(e),r=Pw(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Pw(t){return ze(t._redirectPersistence)}function Lw(t){return Rs(Nw,t.config.apiKey,t.name)}async function Mw(t,e,n=!1){const r=nr(t),s=qh(r,e),o=await new Ow(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xw=10*60*1e3;class Uw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Fw(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!zh(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Le(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=xw&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wh(e))}saveEventToCache(e){this.cachedEventUids.add(Wh(e)),this.lastProcessedEventTime=Date.now()}}function Wh(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function zh({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Fw(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return zh(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $w(t,e={}){return rn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,jw=/^https?/;async function Bw(t){if(t.config.emulator)return;const{authorizedDomains:e}=await $w(t);for(const n of e)try{if(qw(n))return}catch{}ke(t,"unauthorized-domain")}function qw(t){const e=Qo(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!jw.test(n))return!1;if(Vw.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw=new Yn(3e4,6e4);function Gh(){const t=Me().___jsl;if(t==null?void 0:t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Ww(t){return new Promise((e,n)=>{var r,s,i;function o(){Gh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Gh(),n(Le(t,"network-request-failed"))},timeout:Hw.get()})}if((s=(r=Me().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0?void 0:s.Iframe)e(gapi.iframes.getContext());else if((i=Me().gapi)===null||i===void 0?void 0:i.load)o();else{const a=Aw("iframefcb");return Me()[a]=()=>{gapi.load?o():n(Le(t,"network-request-failed"))},Iw(`https://apis.google.com/js/api.js?onload=${a}`)}}).catch(e=>{throw xs=null,e})}let xs=null;function zw(t){return xs=xs||Ww(t),xs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gw=new Yn(5e3,15e3),Kw="__/auth/iframe",Jw="emulator/auth/iframe",Xw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Yw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Qw(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Zo(e,Jw):`https://${t.config.authDomain}/${Kw}`,r={apiKey:e.apiKey,appName:t.name,v:Lt},s=Yw.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${gn(r).slice(1)}`}async function Zw(t){const e=await zw(t),n=Me().gapi;return S(n,t,"internal-error"),e.open({where:document.body,url:Qw(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Xw,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=Le(t,"network-request-failed"),a=Me().setTimeout(()=>{i(o)},Gw.get());function c(){Me().clearTimeout(a),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},tE=500,nE=600,rE="_blank",sE="http://localhost";class Kh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function iE(t,e,n,r=tE,s=nE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},eE),{width:r.toString(),height:s.toString(),top:i,left:o}),u=Y().toLowerCase();n&&(a=_h(u)?rE:n),Eh(u)&&(e=e||sE,c.scrollbars="yes");const l=Object.entries(c).reduce((d,[f,m])=>`${d}${f}=${m},`,"");if(zv(u)&&a!=="_self")return oE(e||"",a),new Kh(null);const h=window.open(e||"",a,l);S(h,t,"popup-blocked");try{h.focus()}catch{}return new Kh(h)}function oE(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aE="__/auth/handler",cE="emulator/auth/handler";function Jh(t,e,n,r,s,i){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Lt,eventId:s};if(e instanceof aa){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Bf(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[c,u]of Object.entries(i||{}))o[c]=u}if(e instanceof sr){const c=e.getScopes().filter(u=>u!=="");c.length>0&&(o.scopes=c.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const c of Object.keys(a))a[c]===void 0&&delete a[c];return`${uE(t)}?${gn(a).slice(1)}`}function uE({config:t}){return t.emulator?Zo(t,cE):`https://${t.authDomain}/${aE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da="webStorageSupport";class lE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=xh,this._completeRedirectFn=Mw}async _openPopup(e,n,r,s){var i;We((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=Jh(e,n,r,Qo(),s);return iE(e,o,ca())}async _openRedirect(e,n,r,s){return await this._originValidation(e),fw(Jh(e,n,r,Qo(),s)),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(We(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r}async initAndGetManager(e){const n=await Zw(e),r=new Uw(e);return n.register("authEvent",s=>(S(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(da,{type:da},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[da];o!==void 0&&n(!!o),ke(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Bw(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Sh()||sa()||Ns()}}const hE=lE;var Xh="@firebase/auth",Yh="0.19.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{var s;e(((s=r)===null||s===void 0?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);!n||(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fE(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function pE(t){Pt(new ct("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),{apiKey:s,authDomain:i}=r.options;return(o=>{S(s&&!s.includes(":"),"invalid-api-key",{appName:o.name}),S(!(i==null?void 0:i.includes(":")),"argument-error",{appName:o.name});const a={apiKey:s,authDomain:i,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:kh(t)},c=new Jv(o,a);return Rv(c,n),c})(r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Pt(new ct("auth-internal",e=>{const n=nr(e.getProvider("auth").getImmediate());return(r=>new dE(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),De(Xh,Yh,fE(t)),De(Xh,Yh,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _0(t=hi()){const e=_r(t,"auth");return e.isInitialized()?e.getImmediate():Cv(t,{popupRedirectResolver:hE,persistence:[Tw,lw,xh]})}pE("Browser");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh="firebasestorage.googleapis.com",Zh="storageBucket",gE=2*60*1e3,mE=10*60*1e3;class G extends at{constructor(e,n){super(fa(e),`Firebase Storage: ${n} (${fa(e)})`);this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,G.prototype)}_codeEquals(e){return fa(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function fa(t){return"storage/"+t}function pa(){const t="An unknown error occurred, please check the error payload for server response.";return new G("unknown",t)}function yE(t){return new G("object-not-found","Object '"+t+"' does not exist.")}function vE(t){return new G("quota-exceeded","Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function wE(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new G("unauthenticated",t)}function EE(){return new G("unauthorized-app","This app does not have permission to access Firebase Storage on this project.")}function _E(t){return new G("unauthorized","User does not have permission to access '"+t+"'.")}function TE(){return new G("retry-limit-exceeded","Max retry time for operation exceeded, please try again.")}function bE(){return new G("canceled","User canceled the upload/download.")}function IE(t){return new G("invalid-url","Invalid URL '"+t+"'.")}function AE(t){return new G("invalid-default-bucket","Invalid default bucket '"+t+"'.")}function SE(){return new G("no-default-bucket","No default bucket found. Did you set the '"+Zh+"' property when initializing the app?")}function kE(){return new G("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")}function CE(){return new G("no-download-url","The given file does not have any download URLs.")}function ga(t){return new G("invalid-argument",t)}function ed(){return new G("app-deleted","The Firebase app was deleted.")}function RE(t){return new G("invalid-root-operation","The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function or(t,e){return new G("invalid-format","String does not match format '"+t+"': "+e)}function ar(t){throw new G("internal-error","Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Ae.makeFromUrl(e,n)}catch{return new Ae(e,"")}if(r.path==="")return r;throw AE(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(U){U.path.charAt(U.path.length-1)==="/"&&(U.path_=U.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function u(U){U.path_=decodeURIComponent(U.path)}const l="v[A-Za-z0-9_]+",h=n.replace(/[.]/g,"\\."),d="(/([^?#]*).*)?$",f=new RegExp(`^https?://${h}/${l}/b/${s}/o${d}`,"i"),m={bucket:1,path:3},_=n===Qh?"(?:storage.googleapis.com|storage.cloud.google.com)":n,v="([^?#]*)",D=new RegExp(`^https?://${_}/${s}/${v}`,"i"),R=[{regex:a,indices:c,postModify:i},{regex:f,indices:m,postModify:u},{regex:D,indices:{bucket:1,path:2},postModify:u}];for(let U=0;U<R.length;U++){const ye=R[U],ve=ye.regex.exec(e);if(ve){const Ce=ve[ye.indices.bucket];let Ue=ve[ye.indices.path];Ue||(Ue=""),r=new Ae(Ce,Ue),ye.postModify(r);break}}if(r==null)throw IE(e);return r}}class NE{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OE(t,e,n){let r=1,s=null,i=null,o=!1,a=0;function c(){return a===2}let u=!1;function l(...v){u||(u=!0,e.apply(null,v))}function h(v){s=setTimeout(()=>{s=null,t(f,c())},v)}function d(){i&&clearTimeout(i)}function f(v,...D){if(u){d();return}if(v){d(),l.call(null,v,...D);return}if(c()||o){d(),l.call(null,v,...D);return}r<64&&(r*=2);let R;a===1?(a=2,R=0):R=(r+Math.random())*1e3,h(R)}let m=!1;function _(v){m||(m=!0,d(),!u&&(s!==null?(v||(a=2),clearTimeout(s),h(0)):v||(a=1)))}return h(0),i=setTimeout(()=>{o=!0,_(!0)},n),_}function DE(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PE(t){return t!==void 0}function LE(t){return typeof t=="object"&&!Array.isArray(t)}function ma(t){return typeof t=="string"||t instanceof String}function td(t){return ya()&&t instanceof Blob}function ya(){return typeof Blob!="undefined"}function nd(t,e,n,r){if(r<e)throw ga(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw ga(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function rd(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Rt;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Rt||(Rt={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e,n,r,s,i,o,a,c,u,l,h){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=l,this.connectionFactory_=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((d,f)=>{this.resolve_=d,this.reject_=f,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Us(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=a=>{const c=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const a=i.getErrorCode()===Rt.NO_ERROR,c=i.getStatus();if(!a||this.isRetryStatusCode_(c)){const l=i.getErrorCode()===Rt.ABORT;r(!1,new Us(!1,null,l));return}const u=this.successCodes_.indexOf(c)!==-1;r(!0,new Us(u,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,a=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());PE(c)?i(c):i()}catch(c){o(c)}else if(a!==null){const c=pa();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(s.canceled){const c=this.appDelete_?ed():bE();o(c)}else{const c=TE();o(c)}};this.canceled_?n(!1,new Us(!1,null,!0)):this.backoffId_=OE(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&DE(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}isRetryStatusCode_(e){const n=e>=500&&e<600,s=[408,429].indexOf(e)!==-1,i=this.additionalRetryCodes_.indexOf(e)!==-1;return n||s||i}}class Us{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function xE(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function UE(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e!=null?e:"AppManager")}function FE(t,e){e&&(t["X-Firebase-GMPID"]=e)}function $E(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function VE(t,e,n,r,s,i){const o=rd(t.urlParams),a=t.url+o,c=Object.assign({},t.headers);return FE(c,e),xE(c,n),UE(c,i),$E(c,r),new ME(a,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jE(){return typeof BlobBuilder!="undefined"?BlobBuilder:typeof WebKitBlobBuilder!="undefined"?WebKitBlobBuilder:void 0}function BE(...t){const e=jE();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(ya())return new Blob(t);throw new G("unsupported-environment","This browser doesn't seem to support creating Blobs")}}function qE(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HE(t){return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class wa{constructor(e,n){this.data=e,this.contentType=n||null}}function WE(t,e){switch(t){case xe.RAW:return new wa(sd(e));case xe.BASE64:case xe.BASE64URL:return new wa(id(t,e));case xe.DATA_URL:return new wa(GE(e),KE(e))}throw pa()}function sd(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)==55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)==56320))e.push(239,191,189);else{const i=r,o=t.charCodeAt(++n);r=65536|(i&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)==56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function zE(t){let e;try{e=decodeURIComponent(t)}catch{throw or(xe.DATA_URL,"Malformed data URL.")}return sd(e)}function id(t,e){switch(t){case xe.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw or(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case xe.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw or(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=HE(e)}catch{throw or(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class od{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw or(xe.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=JE(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=e.substring(e.indexOf(",")+1)}}function GE(t){const e=new od(t);return e.base64?id(xe.BASE64,e.rest):zE(e.rest)}function KE(t){return new od(t).contentType}function JE(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e,n){let r=0,s="";td(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(td(this.data_)){const r=this.data_,s=qE(r,e,n);return s===null?null:new st(s)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new st(r,!0)}}static getBlob(...e){if(ya()){const n=e.map(r=>r instanceof st?r.data_:r);return new st(BE.apply(null,n))}else{const n=e.map(o=>ma(o)?WE(xe.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const s=new Uint8Array(r);let i=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)s[i++]=o[a]}),new st(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ad(t){let e;try{e=JSON.parse(t)}catch{return null}return LE(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XE(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function YE(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function cd(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QE(t,e){return e}class me{constructor(e,n,r,s){this.server=e,this.local=n||e,this.writable=!!r,this.xform=s||QE}}let Fs=null;function ZE(t){return!ma(t)||t.length<2?t:cd(t)}function ud(){if(Fs)return Fs;const t=[];t.push(new me("bucket")),t.push(new me("generation")),t.push(new me("metageneration")),t.push(new me("name","fullPath",!0));function e(i,o){return ZE(o)}const n=new me("name");n.xform=e,t.push(n);function r(i,o){return o!==void 0?Number(o):o}const s=new me("size");return s.xform=r,t.push(s),t.push(new me("timeCreated")),t.push(new me("updated")),t.push(new me("md5Hash",null,!0)),t.push(new me("cacheControl",null,!0)),t.push(new me("contentDisposition",null,!0)),t.push(new me("contentEncoding",null,!0)),t.push(new me("contentLanguage",null,!0)),t.push(new me("contentType",null,!0)),t.push(new me("metadata","customMetadata",!0)),Fs=t,Fs}function e_(t,e){function n(){const r=t.bucket,s=t.fullPath,i=new Ae(r,s);return e._makeStorageReference(i)}Object.defineProperty(t,"ref",{get:n})}function t_(t,e,n){const r={};r.type="file";const s=n.length;for(let i=0;i<s;i++){const o=n[i];r[o.local]=o.xform(r,e[o.server])}return e_(r,t),r}function ld(t,e,n){const r=ad(e);return r===null?null:t_(t,r,n)}function n_(t,e,n,r){const s=ad(e);if(s===null||!ma(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(u=>{const l=t.bucket,h=t.fullPath,d="/b/"+o(l)+"/o/"+o(h),f=va(d,n,r),m=rd({alt:"media",token:u});return f+m})[0]}function r_(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(n[i.server]=t[i.local])}return JSON.stringify(n)}class hd{constructor(e,n,r,s){this.url=e,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(t){if(!t)throw pa()}function s_(t,e){function n(r,s){const i=ld(t,s,e);return dd(i!==null),i}return n}function i_(t,e){function n(r,s){const i=ld(t,s,e);return dd(i!==null),n_(i,s,t.host,t._protocol)}return n}function fd(t){function e(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=EE():s=wE():n.getStatus()===402?s=vE(t.bucket):n.getStatus()===403?s=_E(t.path):s=r,s.serverResponse=r.serverResponse,s}return e}function o_(t){const e=fd(t);function n(r,s){let i=e(r,s);return r.getStatus()===404&&(i=yE(t.path)),i.serverResponse=s.serverResponse,i}return n}function a_(t,e,n){const r=e.fullServerUrl(),s=va(r,t.host,t._protocol),i="GET",o=t.maxOperationRetryTime,a=new hd(s,i,i_(t,n),o);return a.errorHandler=o_(e),a}function c_(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function u_(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=c_(null,e)),r}function l_(t,e,n,r,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let R="";for(let U=0;U<2;U++)R=R+Math.random().toString().slice(2);return R}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const u=u_(e,r,s),l=r_(u,n),h="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+l+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,d=`\r
--`+c+"--",f=st.getBlob(h,r,d);if(f===null)throw kE();const m={name:u.fullPath},_=va(i,t.host,t._protocol),v="POST",D=t.maxUploadRetryTime,L=new hd(_,v,s_(t,n),D);return L.urlParams=m,L.headers=o,L.body=f.uploadData(),L.errorHandler=fd(e),L}class h_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Rt.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Rt.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Rt.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,s){if(this.sent_)throw ar("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw ar("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw ar("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw ar("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw ar("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class d_ extends h_{initXhr(){this.xhr_.responseType="text"}}function pd(){return new d_}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,n){this._service=e,n instanceof Ae?this._location=n:this._location=Ae.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Nt(e,n)}get root(){const e=new Ae(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return cd(this._location.path)}get storage(){return this._service}get parent(){const e=XE(this._location.path);if(e===null)return null;const n=new Ae(this._location.bucket,e);return new Nt(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw RE(e)}}function f_(t,e,n){t._throwIfRoot("uploadBytes");const r=l_(t.storage,t._location,ud(),new st(e,!0),n);return t.storage.makeRequestWithTokens(r,pd).then(s=>({metadata:s,ref:t}))}function p_(t){t._throwIfRoot("getDownloadURL");const e=a_(t.storage,t._location,ud());return t.storage.makeRequestWithTokens(e,pd).then(n=>{if(n===null)throw CE();return n})}function g_(t,e){const n=YE(t._location.path,e),r=new Ae(t._location.bucket,n);return new Nt(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(t){return/^[A-Za-z]+:\/\//.test(t)}function y_(t,e){return new Nt(t,e)}function gd(t,e){if(t instanceof Ea){const n=t;if(n._bucket==null)throw SE();const r=new Nt(n,n._bucket);return e!=null?gd(r,e):r}else return e!==void 0?g_(t,e):t}function v_(t,e){if(e&&m_(e)){if(t instanceof Ea)return y_(t,e);throw ga("To use ref(service, url), the first argument must be a Storage instance.")}else return gd(t,e)}function md(t,e){const n=e==null?void 0:e[Zh];return n==null?null:Ae.makeFromBucketSpec(n,t)}class Ea{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Qh,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=gE,this._maxUploadRetryTime=mE,this._requests=new Set,s!=null?this._bucket=Ae.makeFromBucketSpec(s,this._host):this._bucket=md(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Ae.makeFromBucketSpec(this._url,e):this._bucket=md(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){nd("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){nd("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Nt(this,e)}_makeRequest(e,n,r,s){if(this._deleted)return new NE(ed());{const i=VE(e,this._appId,r,s,n,this._firebaseVersion);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const yd="@firebase/storage",vd="0.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd="storage";function T0(t,e,n){return t=z(t),f_(t,e,n)}function b0(t){return t=z(t),p_(t)}function I0(t,e){return t=z(t),v_(t,e)}function A0(t=hi(),e){return t=z(t),_r(t,wd).getImmediate({identifier:e})}function w_(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new Ea(n,r,s,e,Lt)}function E_(){Pt(new ct(wd,w_,"PUBLIC").setMultipleInstances(!0)),De(yd,vd,""),De(yd,vd,"esm2017")}E_();var __="firebase",T_="9.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */De(__,T_,"app");function b_(t){if(t.__esModule)return t;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(t).forEach(function(n){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}),e}var _a={exports:{}},Ta={exports:{}},ba={exports:{}},Ed=function(e,n){return function(){for(var s=new Array(arguments.length),i=0;i<s.length;i++)s[i]=arguments[i];return e.apply(n,s)}},I_=Ed,Ot=Object.prototype.toString;function Ia(t){return Ot.call(t)==="[object Array]"}function Aa(t){return typeof t=="undefined"}function A_(t){return t!==null&&!Aa(t)&&t.constructor!==null&&!Aa(t.constructor)&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}function S_(t){return Ot.call(t)==="[object ArrayBuffer]"}function k_(t){return typeof FormData!="undefined"&&t instanceof FormData}function C_(t){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&t.buffer instanceof ArrayBuffer,e}function R_(t){return typeof t=="string"}function N_(t){return typeof t=="number"}function _d(t){return t!==null&&typeof t=="object"}function $s(t){if(Ot.call(t)!=="[object Object]")return!1;var e=Object.getPrototypeOf(t);return e===null||e===Object.prototype}function O_(t){return Ot.call(t)==="[object Date]"}function D_(t){return Ot.call(t)==="[object File]"}function P_(t){return Ot.call(t)==="[object Blob]"}function Td(t){return Ot.call(t)==="[object Function]"}function L_(t){return _d(t)&&Td(t.pipe)}function M_(t){return typeof URLSearchParams!="undefined"&&t instanceof URLSearchParams}function x_(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function U_(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function Sa(t,e){if(!(t===null||typeof t=="undefined"))if(typeof t!="object"&&(t=[t]),Ia(t))for(var n=0,r=t.length;n<r;n++)e.call(null,t[n],n,t);else for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.call(null,t[s],s,t)}function ka(){var t={};function e(s,i){$s(t[i])&&$s(s)?t[i]=ka(t[i],s):$s(s)?t[i]=ka({},s):Ia(s)?t[i]=s.slice():t[i]=s}for(var n=0,r=arguments.length;n<r;n++)Sa(arguments[n],e);return t}function F_(t,e,n){return Sa(e,function(s,i){n&&typeof s=="function"?t[i]=I_(s,n):t[i]=s}),t}function $_(t){return t.charCodeAt(0)===65279&&(t=t.slice(1)),t}var Se={isArray:Ia,isArrayBuffer:S_,isBuffer:A_,isFormData:k_,isArrayBufferView:C_,isString:R_,isNumber:N_,isObject:_d,isPlainObject:$s,isUndefined:Aa,isDate:O_,isFile:D_,isBlob:P_,isFunction:Td,isStream:L_,isURLSearchParams:M_,isStandardBrowserEnv:U_,forEach:Sa,merge:ka,extend:F_,trim:x_,stripBOM:$_},un=Se;function bd(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Id=function(e,n,r){if(!n)return e;var s;if(r)s=r(n);else if(un.isURLSearchParams(n))s=n.toString();else{var i=[];un.forEach(n,function(c,u){c===null||typeof c=="undefined"||(un.isArray(c)?u=u+"[]":c=[c],un.forEach(c,function(h){un.isDate(h)?h=h.toISOString():un.isObject(h)&&(h=JSON.stringify(h)),i.push(bd(u)+"="+bd(h))}))}),s=i.join("&")}if(s){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e},V_=Se;function Vs(){this.handlers=[]}Vs.prototype.use=function(e,n,r){return this.handlers.push({fulfilled:e,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1};Vs.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};Vs.prototype.forEach=function(e){V_.forEach(this.handlers,function(r){r!==null&&e(r)})};var j_=Vs,B_=Se,q_=function(e,n){B_.forEach(e,function(s,i){i!==n&&i.toUpperCase()===n.toUpperCase()&&(e[n]=s,delete e[i])})},Ad=function(e,n,r,s,i){return e.config=n,r&&(e.code=r),e.request=s,e.response=i,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},H_=Ad,Sd=function(e,n,r,s,i){var o=new Error(e);return H_(o,n,r,s,i)},W_=Sd,z_=function(e,n,r){var s=r.config.validateStatus;!r.status||!s||s(r.status)?e(r):n(W_("Request failed with status code "+r.status,r.config,null,r.request,r))},js=Se,G_=js.isStandardBrowserEnv()?function(){return{write:function(n,r,s,i,o,a){var c=[];c.push(n+"="+encodeURIComponent(r)),js.isNumber(s)&&c.push("expires="+new Date(s).toGMTString()),js.isString(i)&&c.push("path="+i),js.isString(o)&&c.push("domain="+o),a===!0&&c.push("secure"),document.cookie=c.join("; ")},read:function(n){var r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),K_=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},J_=function(e,n){return n?e.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):e},X_=K_,Y_=J_,Q_=function(e,n){return e&&!X_(n)?Y_(e,n):n},Ca=Se,Z_=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],eT=function(e){var n={},r,s,i;return e&&Ca.forEach(e.split(`
`),function(a){if(i=a.indexOf(":"),r=Ca.trim(a.substr(0,i)).toLowerCase(),s=Ca.trim(a.substr(i+1)),r){if(n[r]&&Z_.indexOf(r)>=0)return;r==="set-cookie"?n[r]=(n[r]?n[r]:[]).concat([s]):n[r]=n[r]?n[r]+", "+s:s}}),n},kd=Se,tT=kd.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a"),r;function s(i){var o=i;return e&&(n.setAttribute("href",o),o=n.href),n.setAttribute("href",o),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=s(window.location.href),function(o){var a=kd.isString(o)?s(o):o;return a.protocol===r.protocol&&a.host===r.host}}():function(){return function(){return!0}}(),Bs=Se,nT=z_,rT=G_,sT=Id,iT=Q_,oT=eT,aT=tT,Ra=Sd,Cd=function(e){return new Promise(function(r,s){var i=e.data,o=e.headers,a=e.responseType;Bs.isFormData(i)&&delete o["Content-Type"];var c=new XMLHttpRequest;if(e.auth){var u=e.auth.username||"",l=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(u+":"+l)}var h=iT(e.baseURL,e.url);c.open(e.method.toUpperCase(),sT(h,e.params,e.paramsSerializer),!0),c.timeout=e.timeout;function d(){if(!!c){var m="getAllResponseHeaders"in c?oT(c.getAllResponseHeaders()):null,_=!a||a==="text"||a==="json"?c.responseText:c.response,v={data:_,status:c.status,statusText:c.statusText,headers:m,config:e,request:c};nT(r,s,v),c=null}}if("onloadend"in c?c.onloadend=d:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(d)},c.onabort=function(){!c||(s(Ra("Request aborted",e,"ECONNABORTED",c)),c=null)},c.onerror=function(){s(Ra("Network Error",e,null,c)),c=null},c.ontimeout=function(){var _="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(_=e.timeoutErrorMessage),s(Ra(_,e,e.transitional&&e.transitional.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",c)),c=null},Bs.isStandardBrowserEnv()){var f=(e.withCredentials||aT(h))&&e.xsrfCookieName?rT.read(e.xsrfCookieName):void 0;f&&(o[e.xsrfHeaderName]=f)}"setRequestHeader"in c&&Bs.forEach(o,function(_,v){typeof i=="undefined"&&v.toLowerCase()==="content-type"?delete o[v]:c.setRequestHeader(v,_)}),Bs.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),a&&a!=="json"&&(c.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&c.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(_){!c||(c.abort(),s(_),c=null)}),i||(i=null),c.send(i)})},ie=Se,Rd=q_,cT=Ad,uT={"Content-Type":"application/x-www-form-urlencoded"};function Nd(t,e){!ie.isUndefined(t)&&ie.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function lT(){var t;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(t=Cd),t}function hT(t,e,n){if(ie.isString(t))try{return(e||JSON.parse)(t),ie.trim(t)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(t)}var qs={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:lT(),transformRequest:[function(e,n){return Rd(n,"Accept"),Rd(n,"Content-Type"),ie.isFormData(e)||ie.isArrayBuffer(e)||ie.isBuffer(e)||ie.isStream(e)||ie.isFile(e)||ie.isBlob(e)?e:ie.isArrayBufferView(e)?e.buffer:ie.isURLSearchParams(e)?(Nd(n,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):ie.isObject(e)||n&&n["Content-Type"]==="application/json"?(Nd(n,"application/json"),hT(e)):e}],transformResponse:[function(e){var n=this.transitional,r=n&&n.silentJSONParsing,s=n&&n.forcedJSONParsing,i=!r&&this.responseType==="json";if(i||s&&ie.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(i)throw o.name==="SyntaxError"?cT(o,this,"E_JSON_PARSE"):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};qs.headers={common:{Accept:"application/json, text/plain, */*"}};ie.forEach(["delete","get","head"],function(e){qs.headers[e]={}});ie.forEach(["post","put","patch"],function(e){qs.headers[e]=ie.merge(uT)});var Na=qs,dT=Se,fT=Na,pT=function(e,n,r){var s=this||fT;return dT.forEach(r,function(o){e=o.call(s,e,n)}),e},Od=function(e){return!!(e&&e.__CANCEL__)},Dd=Se,Oa=pT,gT=Od,mT=Na;function Da(t){t.cancelToken&&t.cancelToken.throwIfRequested()}var yT=function(e){Da(e),e.headers=e.headers||{},e.data=Oa.call(e,e.data,e.headers,e.transformRequest),e.headers=Dd.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Dd.forEach(["delete","get","head","post","put","patch","common"],function(s){delete e.headers[s]});var n=e.adapter||mT.adapter;return n(e).then(function(s){return Da(e),s.data=Oa.call(e,s.data,s.headers,e.transformResponse),s},function(s){return gT(s)||(Da(e),s&&s.response&&(s.response.data=Oa.call(e,s.response.data,s.response.headers,e.transformResponse))),Promise.reject(s)})},he=Se,Pd=function(e,n){n=n||{};var r={},s=["url","method","data"],i=["headers","auth","proxy","params"],o=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(d,f){return he.isPlainObject(d)&&he.isPlainObject(f)?he.merge(d,f):he.isPlainObject(f)?he.merge({},f):he.isArray(f)?f.slice():f}function u(d){he.isUndefined(n[d])?he.isUndefined(e[d])||(r[d]=c(void 0,e[d])):r[d]=c(e[d],n[d])}he.forEach(s,function(f){he.isUndefined(n[f])||(r[f]=c(void 0,n[f]))}),he.forEach(i,u),he.forEach(o,function(f){he.isUndefined(n[f])?he.isUndefined(e[f])||(r[f]=c(void 0,e[f])):r[f]=c(void 0,n[f])}),he.forEach(a,function(f){f in n?r[f]=c(e[f],n[f]):f in e&&(r[f]=c(void 0,e[f]))});var l=s.concat(i).concat(o).concat(a),h=Object.keys(e).concat(Object.keys(n)).filter(function(f){return l.indexOf(f)===-1});return he.forEach(h,u),r};const vT="axios",wT="0.21.4",ET="Promise based HTTP client for the browser and node.js",_T="index.js",TT={test:"grunt test",start:"node ./sandbox/server.js",build:"NODE_ENV=production grunt build",preversion:"npm test",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",postversion:"git push && git push --tags",examples:"node ./examples/server.js",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",fix:"eslint --fix lib/**/*.js"},bT={type:"git",url:"https://github.com/axios/axios.git"},IT=["xhr","http","ajax","promise","node"],AT="Matt Zabriskie",ST="MIT",kT={url:"https://github.com/axios/axios/issues"},CT="https://axios-http.com",RT={coveralls:"^3.0.0","es6-promise":"^4.2.4",grunt:"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",mocha:"^8.2.1",sinon:"^4.5.0","terser-webpack-plugin":"^4.2.3",typescript:"^4.0.5","url-search-params":"^0.10.0",webpack:"^4.44.2","webpack-dev-server":"^3.11.0"},NT={"./lib/adapters/http.js":"./lib/adapters/xhr.js"},OT="dist/axios.min.js",DT="dist/axios.min.js",PT="./index.d.ts",LT={"follow-redirects":"^1.14.0"},MT=[{path:"./dist/axios.min.js",threshold:"5kB"}];var xT={name:vT,version:wT,description:ET,main:_T,scripts:TT,repository:bT,keywords:IT,author:AT,license:ST,bugs:kT,homepage:CT,devDependencies:RT,browser:NT,jsdelivr:OT,unpkg:DT,typings:PT,dependencies:LT,bundlesize:MT},Ld=xT,Pa={};["object","boolean","number","function","string","symbol"].forEach(function(t,e){Pa[t]=function(r){return typeof r===t||"a"+(e<1?"n ":" ")+t}});var Md={},UT=Ld.version.split(".");function xd(t,e){for(var n=e?e.split("."):UT,r=t.split("."),s=0;s<3;s++){if(n[s]>r[s])return!0;if(n[s]<r[s])return!1}return!1}Pa.transitional=function(e,n,r){var s=n&&xd(n);function i(o,a){return"[Axios v"+Ld.version+"] Transitional option '"+o+"'"+a+(r?". "+r:"")}return function(o,a,c){if(e===!1)throw new Error(i(a," has been removed in "+n));return s&&!Md[a]&&(Md[a]=!0,console.warn(i(a," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(o,a,c):!0}};function FT(t,e,n){if(typeof t!="object")throw new TypeError("options must be an object");for(var r=Object.keys(t),s=r.length;s-- >0;){var i=r[s],o=e[i];if(o){var a=t[i],c=a===void 0||o(a,i,t);if(c!==!0)throw new TypeError("option "+i+" must be "+c);continue}if(n!==!0)throw Error("Unknown option "+i)}}var $T={isOlderVersion:xd,assertOptions:FT,validators:Pa},Ud=Se,VT=Id,Fd=j_,$d=yT,Hs=Pd,Vd=$T,ln=Vd.validators;function cr(t){this.defaults=t,this.interceptors={request:new Fd,response:new Fd}}cr.prototype.request=function(e){typeof e=="string"?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=Hs(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var n=e.transitional;n!==void 0&&Vd.assertOptions(n,{silentJSONParsing:ln.transitional(ln.boolean,"1.0.0"),forcedJSONParsing:ln.transitional(ln.boolean,"1.0.0"),clarifyTimeoutError:ln.transitional(ln.boolean,"1.0.0")},!1);var r=[],s=!0;this.interceptors.request.forEach(function(d){typeof d.runWhen=="function"&&d.runWhen(e)===!1||(s=s&&d.synchronous,r.unshift(d.fulfilled,d.rejected))});var i=[];this.interceptors.response.forEach(function(d){i.push(d.fulfilled,d.rejected)});var o;if(!s){var a=[$d,void 0];for(Array.prototype.unshift.apply(a,r),a=a.concat(i),o=Promise.resolve(e);a.length;)o=o.then(a.shift(),a.shift());return o}for(var c=e;r.length;){var u=r.shift(),l=r.shift();try{c=u(c)}catch(h){l(h);break}}try{o=$d(c)}catch(h){return Promise.reject(h)}for(;i.length;)o=o.then(i.shift(),i.shift());return o};cr.prototype.getUri=function(e){return e=Hs(this.defaults,e),VT(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")};Ud.forEach(["delete","get","head","options"],function(e){cr.prototype[e]=function(n,r){return this.request(Hs(r||{},{method:e,url:n,data:(r||{}).data}))}});Ud.forEach(["post","put","patch"],function(e){cr.prototype[e]=function(n,r,s){return this.request(Hs(s||{},{method:e,url:n,data:r}))}});var jT=cr;function La(t){this.message=t}La.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")};La.prototype.__CANCEL__=!0;var jd=La,BT=jd;function Ws(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(s){e=s});var n=this;t(function(s){n.reason||(n.reason=new BT(s),e(n.reason))})}Ws.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};Ws.source=function(){var e,n=new Ws(function(s){e=s});return{token:n,cancel:e}};var qT=Ws,HT=function(e){return function(r){return e.apply(null,r)}},WT=function(e){return typeof e=="object"&&e.isAxiosError===!0},Bd=Se,zT=Ed,zs=jT,GT=Pd,KT=Na;function qd(t){var e=new zs(t),n=zT(zs.prototype.request,e);return Bd.extend(n,zs.prototype,e),Bd.extend(n,e),n}var Re=qd(KT);Re.Axios=zs;Re.create=function(e){return qd(GT(Re.defaults,e))};Re.Cancel=jd;Re.CancelToken=qT;Re.isCancel=Od;Re.all=function(e){return Promise.all(e)};Re.spread=HT;Re.isAxiosError=WT;ba.exports=Re;ba.exports.default=Re;var JT=ba.exports;const XT="@sendgrid/client",YT="Twilio SendGrid NodeJS API client",QT="7.6.0",ZT="Twilio SendGrid <help@twilio.com> (sendgrid.com)",eb=["Kyle Partridge <kyle.partridge@sendgrid.com>","David Tomberlin <david.tomberlin@sendgrid.com>","Swift <swift@sendgrid.com>","Brandon West <brandon.west@sendgrid.com>","Scott Motte <scott.motte@sendgrid.com>","Robert Acosta <robert.acosta@sendgrid.com>","Elmer Thomas <ethomas@twilio.com>","Adam Reis <adam@reis.nz>"],tb="MIT",nb="https://sendgrid.com",rb={type:"git",url:"git://github.com/sendgrid/sendgrid-nodejs.git"},sb={access:"public"},ib="index.js",ob={node:"6.* || 8.* || >=10.*"},ab={"@sendgrid/helpers":"^7.6.0",axios:"^0.21.4"},cb={chai:"4.2.0",nock:"^10.0.6"},ub={chai:"4.2.0"},lb=["http","rest","api","mail","sendgrid"],hb="86235101d8f6d088bb97e85afd142c0521d86a57";var db={name:XT,description:YT,version:QT,author:ZT,contributors:eb,license:tb,homepage:nb,repository:rb,publishConfig:sb,main:ib,engines:ob,dependencies:ab,devDependencies:cb,resolutions:ub,tags:lb,gitHead:hb},Ma=function t(e,n,r){if(typeof e!="object"||e===null)throw new Error("Non object passed to convertKeys: "+e);if(Array.isArray(e))return e;Array.isArray(r)||(r=[]);for(const s in e)if(e.hasOwnProperty(s)){const i=n(s);typeof e[s]=="object"&&e[s]!==null&&!r.includes(s)&&!r.includes(i)&&(e[s]=t(e[s],n,r)),i!==s&&(e[i]=e[s],delete e[s])}return e},fb=function(e){if(typeof e!="string")throw new Error("String expected for conversion to snake case");return e.trim().replace(/_+|\-+/g," ").replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(n,r){return Number(n)===0?"":r===0?n.toLowerCase():n.toUpperCase()})};const pb=Ma,gb=fb;var ur=function(e,n){return pb(e,gb,n)},mb=function(e){if(typeof e!="string")throw new Error("String expected for conversion to snake case");return e.trim().replace(/(\s*\-*\b\w|[A-Z])/g,function(n){return n=n.trim().toLowerCase().replace("-",""),(n[0]==="_"?"":"_")+n}).slice(1)};const yb=Ma,vb=mb;var Gs=function(e,n){return yb(e,vb,n)},lr=function(e){return JSON.parse(JSON.stringify(e))},wb={},Eb=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:wb}),Hd=b_(Eb);const _b=ur,Tb=Gs,bb=lr,Ib=Hd,Ab=Hd;class Sb{constructor(e){e&&this.fromData(e)}fromData(e){if(typeof e!="object")throw new Error("Expecting object for Mail data");e=bb(e),e=_b(e);const{content:n,filename:r,type:s,disposition:i,contentId:o,filePath:a}=e;if(typeof n!="undefined"&&typeof a!="undefined")throw new Error("The props 'content' and 'filePath' cannot be used together.");this.setFilename(r),this.setType(s),this.setDisposition(i),this.setContentId(o),this.setContent(a?this.readFile(a):n)}readFile(e){return Ib.readFileSync(Ab.resolve(e))}setContent(e){if(typeof e=="string"){this.content=e;return}else if(e instanceof Buffer&&e.toString!==void 0){this.content=e.toString(),this.disposition==="attachment"&&(this.content=e.toString("base64"));return}throw new Error("`content` expected to be either Buffer or string")}setFileContent(e){if(e instanceof Buffer&&e.toString!==void 0){this.content=e.toString("base64");return}throw new Error("`content` expected to be Buffer")}setFilename(e){if(typeof e!="undefined"){if(e&&typeof e!="string")throw new Error("String expected for `filename`");this.filename=e}}setType(e){if(typeof e!="undefined"){if(typeof e!="string")throw new Error("String expected for `type`");this.type=e}}setDisposition(e){if(typeof e!="undefined"){if(typeof e!="string")throw new Error("String expected for `disposition`");this.disposition=e}}setContentId(e){if(typeof e!="undefined"){if(typeof e!="string")throw new Error("String expected for `contentId`");this.contentId=e}}toJSON(){const{content:e,filename:n,type:r,disposition:s,contentId:i}=this,o={content:e,filename:n};return typeof r!="undefined"&&(o.type=r),typeof s!="undefined"&&(o.disposition=s),typeof i!="undefined"&&(o.contentId=i),Tb(o)}}var kb=Sb,Wd=function(e){if(e.indexOf("<")===-1)return["",e];let[n,r]=e.split("<");return n=n.trim(),r=r.replace(">","").trim(),[n,r]};const Cb=Wd;class Ks{constructor(e){e&&this.fromData(e)}fromData(e){if(typeof e=="string"){const[s,i]=Cb(e);e={name:s,email:i}}if(typeof e!="object")throw new Error("Expecting object or string for EmailAddress data");const{name:n,email:r}=e;this.setEmail(r),this.setName(n)}setName(e){if(typeof e!="undefined"){if(typeof e!="string")throw new Error("String expected for `name`");this.name=e}}setEmail(e){if(typeof e=="undefined")throw new Error("Must provide `email`");if(typeof e!="string")throw new Error("String expected for `email`");this.email=e}toJSON(){const{email:e,name:n}=this,r={email:e};return n!==""&&(r.name=n),r}static create(e){return Array.isArray(e)?e.filter(n=>!!n).map(n=>this.create(n)):e instanceof Ks?e:new Ks(e)}}var xa=Ks,Rb=function(e){return Nb(e)&&!Ob(e)};function Nb(t){return!!t&&typeof t=="object"}function Ob(t){var e=Object.prototype.toString.call(t);return e==="[object RegExp]"||e==="[object Date]"||Lb(t)}var Db=typeof Symbol=="function"&&Symbol.for,Pb=Db?Symbol.for("react.element"):60103;function Lb(t){return t.$$typeof===Pb}function Mb(t){return Array.isArray(t)?[]:{}}function hr(t,e){return e.clone!==!1&&e.isMergeableObject(t)?hn(Mb(t),t,e):t}function xb(t,e,n){return t.concat(e).map(function(r){return hr(r,n)})}function Ub(t,e){if(!e.customMerge)return hn;var n=e.customMerge(t);return typeof n=="function"?n:hn}function Fb(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(e){return t.propertyIsEnumerable(e)}):[]}function zd(t){return Object.keys(t).concat(Fb(t))}function Gd(t,e){try{return e in t}catch{return!1}}function $b(t,e){return Gd(t,e)&&!(Object.hasOwnProperty.call(t,e)&&Object.propertyIsEnumerable.call(t,e))}function Vb(t,e,n){var r={};return n.isMergeableObject(t)&&zd(t).forEach(function(s){r[s]=hr(t[s],n)}),zd(e).forEach(function(s){$b(t,s)||(Gd(t,s)&&n.isMergeableObject(e[s])?r[s]=Ub(s,n)(t[s],e[s],n):r[s]=hr(e[s],n))}),r}function hn(t,e,n){n=n||{},n.arrayMerge=n.arrayMerge||xb,n.isMergeableObject=n.isMergeableObject||Rb,n.cloneUnlessOtherwiseSpecified=hr;var r=Array.isArray(e),s=Array.isArray(t),i=r===s;return i?r?n.arrayMerge(t,e,n):Vb(t,e,n):hr(e,n)}hn.all=function(e,n){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(r,s){return hn(r,s,n)},{})};var jb=hn,Bb=jb,Kd=function t(e,n="{{",r="}}"){if(Array.isArray(e))return e.map(i=>t(i,n,r));const s={};for(const i in e)e.hasOwnProperty(i)&&(s[n+i+r]=String(e[i]));return s};const Dt=xa,qb=ur,Hb=Gs,Wb=lr,zb=Bb,Gb=Kd;class Kb{constructor(e){this.to=[],this.cc=[],this.bcc=[],this.headers={},this.customArgs={},this.substitutions={},this.substitutionWrappers=["{{","}}"],this.dynamicTemplateData={},e&&this.fromData(e)}fromData(e){if(typeof e!="object")throw new Error("Expecting object for Mail data");e=Wb(e),e=qb(e,["substitutions","dynamicTemplateData","customArgs","headers"]);const{to:n,from:r,cc:s,bcc:i,subject:o,headers:a,customArgs:c,sendAt:u,substitutions:l,substitutionWrappers:h,dynamicTemplateData:d}=e;this.setTo(n),this.setFrom(r),this.setCc(s),this.setBcc(i),this.setSubject(o),this.setHeaders(a),this.setSubstitutions(l),this.setSubstitutionWrappers(h),this.setCustomArgs(c),this.setDynamicTemplateData(d),this.setSendAt(u)}setSubject(e){if(typeof e!="undefined"){if(typeof e!="string")throw new Error("String expected for `subject`");this.subject=e}}setSendAt(e){if(typeof e!="undefined"){if(!Number.isInteger(e))throw new Error("Integer expected for `sendAt`");this.sendAt=e}}setTo(e){typeof e!="undefined"&&(Array.isArray(e)||(e=[e]),this.to=Dt.create(e))}setFrom(e){typeof e!="undefined"&&(this.from=Dt.create(e))}addTo(e){typeof e!="undefined"&&this.to.push(Dt.create(e))}setCc(e){typeof e!="undefined"&&(Array.isArray(e)||(e=[e]),this.cc=Dt.create(e))}addCc(e){typeof e!="undefined"&&this.cc.push(Dt.create(e))}setBcc(e){typeof e!="undefined"&&(Array.isArray(e)||(e=[e]),this.bcc=Dt.create(e))}addBcc(e){typeof e!="undefined"&&this.bcc.push(Dt.create(e))}setHeaders(e){if(typeof e!="undefined"){if(typeof e!="object"||e===null)throw new Error("Object expected for `headers`");this.headers=e}}addHeader(e,n){if(typeof e!="string")throw new Error("String expected for header key");if(typeof n!="string")throw new Error("String expected for header value");this.headers[e]=n}setCustomArgs(e){if(typeof e!="undefined"){if(typeof e!="object"||e===null)throw new Error("Object expected for `customArgs`");this.customArgs=e}}addCustomArg(e,n){if(typeof e!="string")throw new Error("String expected for custom arg key");if(typeof n!="string")throw new Error("String expected for custom arg value");this.customArgs[e]=n}setSubstitutions(e){if(typeof e!="undefined"){if(typeof e!="object")throw new Error("Object expected for `substitutions`");this.substitutions=e}}addSubstitution(e,n){if(typeof e!="string")throw new Error("String expected for substitution key");if(typeof n!="string"&&typeof n!="number")throw new Error("String or Number expected for substitution value");this.substitutions[e]=n}reverseMergeSubstitutions(e){if(!(typeof e=="undefined"||e===null)){if(typeof e!="object")throw new Error("Object expected for `substitutions` in reverseMergeSubstitutions");this.substitutions=Object.assign({},e,this.substitutions)}}setSubstitutionWrappers(e){if(!(typeof e=="undefined"||e===null)){if(!Array.isArray(e)||e.length!==2)throw new Error("Array expected with two elements for `substitutionWrappers`");this.substitutionWrappers=e}}deepMergeDynamicTemplateData(e){if(!(typeof e=="undefined"||e===null)){if(typeof e!="object")throw new Error("Object expected for `dynamicTemplateData` in deepMergeDynamicTemplateData");this.dynamicTemplateData=zb(e,this.dynamicTemplateData)}}setDynamicTemplateData(e){if(typeof e!="undefined"){if(typeof e!="object")throw new Error("Object expected for `dynamicTemplateData`");this.dynamicTemplateData=e}}toJSON(){const{to:e,from:n,cc:r,bcc:s,subject:i,headers:o,customArgs:a,sendAt:c,substitutions:u,substitutionWrappers:l,dynamicTemplateData:h}=this,d={to:e};if(Array.isArray(r)&&r.length>0&&(d.cc=r),Array.isArray(s)&&s.length>0&&(d.bcc=s),Object.keys(o).length>0&&(d.headers=o),u&&Object.keys(u).length>0){const[f,m]=l;d.substitutions=Gb(u,f,m)}return Object.keys(a).length>0&&(d.customArgs=a),h&&Object.keys(h).length>0&&(d.dynamicTemplateData=h),typeof i!="undefined"&&(d.subject=i),typeof c!="undefined"&&(d.sendAt=c),typeof n!="undefined"&&(d.from=n),Hb(d,["substitutions","dynamicTemplateData","customArgs","headers"])}}var Jd=Kb,Xd=function(e){return e.map(n=>typeof n=="object"&&n!==null&&typeof n.toJSON=="function"?n.toJSON():n)};const Jb=`
Content with characters ', " or & may need to be escaped with three brackets
{{{ content }}}
See https://sendgrid.com/docs/for-developers/sending-email/using-handlebars/ for more information.`;var Xb={DYNAMIC_TEMPLATE_CHAR_WARNING:Jb};const H=(t,e,n,r)=>{if(!(typeof t=="undefined"||typeof t[n]=="undefined")&&typeof t[n]!==r)throw new Error(`${r} expected for \`${e}.${n}\``)};var Yb={validateMailSettings(t){if(typeof t!="object")throw new Error("Object expected for `mailSettings`");const{bcc:e,bypassListManagement:n,footer:r,sandboxMode:s,spamCheck:i}=t;H(e,"bcc","enable","boolean"),H(e,"bcc","email","string"),H(n,"bypassListManagement","enable","boolean"),H(r,"footer","enable","boolean"),H(r,"footer","text","string"),H(r,"footer","html","string"),H(s,"sandboxMode","enable","boolean"),H(i,"spamCheck","enable","boolean"),H(i,"spamCheck","threshold","number"),H(i,"spamCheck","postToUrl","string")},validateTrackingSettings(t){if(typeof t!="object")throw new Error("Object expected for `trackingSettings`");const{clickTracking:e,openTracking:n,subscriptionTracking:r,ganalytics:s}=t;H(e,"clickTracking","enable","boolean"),H(e,"clickTracking","enableText","boolean"),H(n,"openTracking","enable","boolean"),H(n,"openTracking","substitutionTag","string"),H(r,"subscriptionTracking","enable","boolean"),H(r,"subscriptionTracking","text","string"),H(r,"subscriptionTracking","html","string"),H(r,"subscriptionTracking","substitutionTag","string"),H(s,"ganalytics","enable","boolean"),H(s,"ganalytics","utm_source","string"),H(s,"ganalytics","utm_medium","string"),H(s,"ganalytics","utm_term","string"),H(s,"ganalytics","utm_content","string"),H(s,"ganalytics","utm_campaign","string")}};const Yd=xa,dr=Jd,Qb=ur,Zb=Gs,eI=lr,Ua=Xd,{DYNAMIC_TEMPLATE_CHAR_WARNING:tI}=Xb,{validateMailSettings:nI,validateTrackingSettings:rI}=Yb;class Js{constructor(e){this.isDynamic=!1,this.hideWarnings=!1,this.personalizations=[],this.attachments=[],this.content=[],this.categories=[],this.headers={},this.sections={},this.customArgs={},this.trackingSettings={},this.mailSettings={},this.asm={},this.substitutions=null,this.substitutionWrappers=null,this.dynamicTemplateData=null,e&&this.fromData(e)}fromData(e){if(typeof e!="object")throw new Error("Expecting object for Mail data");e=eI(e),e=Qb(e,["substitutions","dynamicTemplateData","customArgs","headers","sections"]);const{to:n,from:r,replyTo:s,cc:i,bcc:o,sendAt:a,subject:c,text:u,html:l,content:h,templateId:d,personalizations:f,attachments:m,ipPoolName:_,batchId:v,sections:D,headers:L,categories:R,category:U,customArgs:ye,asm:ve,mailSettings:Ce,trackingSettings:Ue,substitutions:it,substitutionWrappers:dn,dynamicTemplateData:fr,isMultiple:Ys,hideWarnings:pr,replyToList:Qs}=e;this.setFrom(r),this.setReplyTo(s),this.setSubject(c),this.setSendAt(a),this.setTemplateId(d),this.setBatchId(v),this.setIpPoolName(_),this.setAttachments(m),this.setContent(h),this.setSections(D),this.setHeaders(L),this.setCategories(U),this.setCategories(R),this.setCustomArgs(ye),this.setAsm(ve),this.setMailSettings(Ce),this.setTrackingSettings(Ue),this.setHideWarnings(pr),this.setReplyToList(Qs),this.isDynamic?this.setDynamicTemplateData(fr):(this.setSubstitutions(it),this.setSubstitutionWrappers(dn)),this.addTextContent(u),this.addHtmlContent(l),f?this.setPersonalizations(f):Ys&&Array.isArray(n)?n.forEach(Zs=>this.addTo(Zs,i,o)):this.addTo(n,i,o)}setFrom(e){if(this._checkProperty("from",e,[this._checkUndefined])){if(typeof e!="string"&&typeof e.email!="string")throw new Error("String or address object expected for `from`");this.from=Yd.create(e)}}setReplyTo(e){if(this._checkProperty("replyTo",e,[this._checkUndefined])){if(typeof e!="string"&&typeof e.email!="string")throw new Error("String or address object expected for `replyTo`");this.replyTo=Yd.create(e)}}setSubject(e){this._setProperty("subject",e,"string")}setSendAt(e){this._checkProperty("sendAt",e,[this._checkUndefined,this._createCheckThatThrows(Number.isInteger,"Integer expected for `sendAt`")])&&(this.sendAt=e)}setTemplateId(e){this._setProperty("templateId",e,"string")&&e.indexOf("d-")===0&&(this.isDynamic=!0)}setBatchId(e){this._setProperty("batchId",e,"string")}setIpPoolName(e){this._setProperty("ipPoolName",e,"string")}setAsm(e){if(this._checkProperty("asm",e,[this._checkUndefined,this._createTypeCheck("object")])){if(typeof e.groupId!="number")throw new Error("Expected `asm` to include an integer in its `groupId` field");if(e.groupsToDisplay&&(!Array.isArray(e.groupsToDisplay)||!e.groupsToDisplay.every(n=>typeof n=="number")))throw new Error("Array of integers expected for `asm.groupsToDisplay`");this.asm=e}}setPersonalizations(e){if(!!this._doArrayCheck("personalizations",e)){if(!e.every(n=>typeof n=="object"))throw new Error("Array of objects expected for `personalizations`");this.personalizations=[],e.forEach(n=>this.addPersonalization(n))}}addPersonalization(e){this.isDynamic&&e.substitutions?delete e.substitutions:!this.isDynamic&&e.dynamicTemplateData&&delete e.dynamicTemplateData,e instanceof dr||(e=new dr(e)),this.isDynamic?this.applyDynamicTemplateData(e):this.applySubstitutions(e),this.personalizations.push(e)}addTo(e,n,r){if(typeof e=="undefined"&&typeof n=="undefined"&&typeof r=="undefined")throw new Error("Provide at least one of to, cc or bcc");this.addPersonalization(new dr({to:e,cc:n,bcc:r}))}setSubstitutions(e){this._setProperty("substitutions",e,"object")}setSubstitutionWrappers(e){let n=(r,s)=>{if(!Array.isArray(s)||s.length!==2)throw new Error("Array expected with two elements for `"+r+"`")};this._checkProperty("substitutionWrappers",e,[this._checkUndefined,n])&&(this.substitutionWrappers=e)}applySubstitutions(e){e instanceof dr&&(e.reverseMergeSubstitutions(this.substitutions),e.setSubstitutionWrappers(this.substitutionWrappers))}applyDynamicTemplateData(e){e instanceof dr&&e.deepMergeDynamicTemplateData(this.dynamicTemplateData)}setDynamicTemplateData(e){if(typeof e!="undefined"){if(typeof e!="object")throw new Error("Object expected for `dynamicTemplateData`");this.hideWarnings||Object.values(e).forEach(n=>{/['"&]/.test(n)&&console.warn(tI)}),this.dynamicTemplateData=e}}setContent(e){if(this._doArrayCheck("content",e)){if(!e.every(n=>typeof n=="object"))throw new Error("Expected each entry in `content` to be an object");if(!e.every(n=>typeof n.type=="string"))throw new Error("Expected each `content` entry to contain a `type` string");if(!e.every(n=>typeof n.value=="string"))throw new Error("Expected each `content` entry to contain a `value` string");this.content=e}}addContent(e){this._checkProperty("content",e,[this._createTypeCheck("object")])&&this.content.push(e)}addTextContent(e){this._checkProperty("text",e,[this._checkUndefined,this._createTypeCheck("string")])&&this.addContent({value:e,type:"text/plain"})}addHtmlContent(e){this._checkProperty("html",e,[this._checkUndefined,this._createTypeCheck("string")])&&this.addContent({value:e,type:"text/html"})}setAttachments(e){if(this._doArrayCheck("attachments",e)){if(!e.every(n=>typeof n.content=="string"))throw new Error("Expected each attachment to contain a `content` string");if(!e.every(n=>typeof n.filename=="string"))throw new Error("Expected each attachment to contain a `filename` string");if(!e.every(n=>!n.type||typeof n.type=="string"))throw new Error("Expected the attachment's `type` field to be a string");if(!e.every(n=>!n.disposition||typeof n.disposition=="string"))throw new Error("Expected the attachment's `disposition` field to be a string");this.attachments=e}}addAttachment(e){this._checkProperty("attachment",e,[this._checkUndefined,this._createTypeCheck("object")])&&this.attachments.push(e)}setCategories(e){let n=(r,s)=>{if(!Array.isArray(s)||!s.every(i=>typeof i=="string"))throw new Error("Array of strings expected for `"+r+"`")};typeof e=="string"&&(e=[e]),this._checkProperty("categories",e,[this._checkUndefined,n])&&(this.categories=e)}addCategory(e){this._checkProperty("category",e,[this._createTypeCheck("string")])&&this.categories.push(e)}setHeaders(e){this._setProperty("headers",e,"object")}addHeader(e,n){this._checkProperty("key",e,[this._createTypeCheck("string")])&&this._checkProperty("value",n,[this._createTypeCheck("string")])&&(this.headers[e]=n)}setSections(e){this._setProperty("sections",e,"object")}setCustomArgs(e){this._setProperty("customArgs",e,"object")}setTrackingSettings(e){typeof e!="undefined"&&(rI(e),this.trackingSettings=e)}setMailSettings(e){typeof e!="undefined"&&(nI(e),this.mailSettings=e)}setHideWarnings(e){if(typeof e!="undefined"){if(typeof e!="boolean")throw new Error("Boolean expected for `hideWarnings`");this.hideWarnings=e}}toJSON(){const{from:e,replyTo:n,sendAt:r,subject:s,content:i,templateId:o,personalizations:a,attachments:c,ipPoolName:u,batchId:l,asm:h,sections:d,headers:f,categories:m,customArgs:_,mailSettings:v,trackingSettings:D,replyToList:L}=this,R={from:e,subject:s,personalizations:Ua(a)};return Array.isArray(c)&&c.length>0&&(R.attachments=Ua(c)),Array.isArray(m)&&m.length>0&&(R.categories=m.filter(U=>U!=="")),Array.isArray(i)&&i.length>0&&(R.content=Ua(i)),Object.keys(f).length>0&&(R.headers=f),Object.keys(v).length>0&&(R.mailSettings=v),Object.keys(D).length>0&&(R.trackingSettings=D),Object.keys(_).length>0&&(R.customArgs=_),Object.keys(d).length>0&&(R.sections=d),Object.keys(h).length>0&&(R.asm=h),typeof n!="undefined"&&(R.replyTo=n),typeof r!="undefined"&&(R.sendAt=r),typeof l!="undefined"&&(R.batchId=l),typeof o!="undefined"&&(R.templateId=o),typeof u!="undefined"&&(R.ipPoolName=u),typeof L!="undefined"&&(R.replyToList=L),Zb(R,["substitutions","dynamicTemplateData","customArgs","headers","sections"])}static create(e){return Array.isArray(e)?e.filter(n=>!!n).map(n=>this.create(n)):e instanceof Js?e:new Js(e)}_checkProperty(e,n,r){return!r.some(s=>s(e,n))}_setProperty(e,n,r){let s=this._checkProperty(e,n,[this._checkUndefined,this._createTypeCheck(r)]);return s&&(this[e]=n),s}_checkUndefined(e,n){return typeof n=="undefined"}_createTypeCheck(e){return(n,r)=>{if(typeof r!==e)throw new Error(e+" expected for `"+n+"`")}}_createCheckThatThrows(e,n){return(r,s)=>{if(!e(s))throw new Error(n)}}_setArrayProperty(e,n){this._doArrayCheck(e,n)&&(this[e]=n)}_doArrayCheck(e,n){return this._checkProperty(e,n,[this._checkUndefined,this._createCheckThatThrows(Array.isArray,"Array expected for`"+e+"`")])}setReplyToList(e){if(this._doArrayCheck("replyToList",e)&&e.length){if(!e.every(n=>n&&typeof n.email=="string"))throw new Error("Expected each replyTo to contain an `email` string");this.replyToList=e}}}var sI=Js;class iI{constructor(e,n,r){this.statusCode=e,this.body=n,this.headers=r}toString(){return"HTTP "+this.statusCode+" "+this.body}}var oI=iI;class aI extends Error{constructor(e){super();const{headers:n,status:r,statusText:s,data:i}=e;this.code=r,this.message=s,this.response={headers:n,body:i},this.stack||Error.captureStackTrace(this,this.constructor);const o=new RegExp(process.cwd()+"/","gi");this.stack=this.stack.replace(o,"")}toString(){const{body:e}=this.response;let n=`${this.message} (${this.code})`;return e&&Array.isArray(e.errors)&&e.errors.forEach(r=>{const s=r.message,i=r.field,o=r.help;n+=`
  ${s}
    ${i}
    ${o}`}),n}toJSON(){const{message:e,code:n,response:r}=this;return{message:e,code:n,response:r}}}var cI=aI;const uI=ur,lI=lr,hI=["day","week","month"],dI=["us","ca"],Xs=["desc","asc"];class fI{constructor(e){this.startDate=null,this.endDate=null,this.aggregatedBy=null,e&&this.fromData(e)}fromData(e){if(typeof e!="object")throw new Error("Expecting object for Statistics data");e=lI(e),e=uI(e,["substitutions","customArgs"]);const{startDate:n,endDate:r,aggregatedBy:s}=e;this.setStartDate(n),this.setEndDate(r),this.setAggregatedBy(s)}setStartDate(e){if(typeof e=="undefined")throw new Error("Date expected for `startDate`");if(new Date(e)==="Invalid Date"||isNaN(new Date(e)))throw new Error("Date expected for `startDate`");console.log(e),this.startDate=new Date(e).toISOString().slice(0,10)}setEndDate(e){if(typeof e=="undefined"){this.endDate=new Date().toISOString().slice(0,10);return}if(new Date(e)==="Invalid Date"||isNaN(new Date(e)))throw new Error("Date expected for `endDate`");this.endDate=new Date(e).toISOString().slice(0,10)}setAggregatedBy(e){if(typeof e!="undefined")if(typeof e=="string"&&hI.includes(e.toLowerCase()))this.aggregatedBy=e;else throw new Error("Incorrect value for `aggregatedBy`")}getGlobal(){const{startDate:e,endDate:n,aggregatedBy:r}=this;return{startDate:e,endDate:n,aggregatedBy:r}}getAdvanced(e){const n=this.getGlobal();return typeof e=="undefined"||typeof e=="string"&&dI.includes(e.toLowerCase())&&(n.country=e),n}getAdvancedMailboxProviders(e){const n=this.getGlobal();if(typeof e=="undefined")return n;if(Array.isArray(e)&&e.some(r=>typeof r!="string"))throw new Error("Array of strings expected for `mailboxProviders`");return n.mailBoxProviders=e,n}getAdvancedBrowsers(e){const n=this.getGlobal();if(typeof e=="undefined")return n;if(Array.isArray(e)&&e.some(r=>typeof r!="string"))throw new Error("Array of strings expected for `browsers`");return n.browsers=e,n}getCategories(e){if(typeof e=="undefined")throw new Error("Array of strings expected for `categories`");if(!this._isValidArrayOfStrings(e))throw new Error("Array of strings expected for `categories`");const n=this.getGlobal();return n.categories=e,n}getSubuser(e){if(typeof e=="undefined")throw new Error("Array of strings expected for `subusers`");if(!this._isValidArrayOfStrings(e))throw new Error("Array of strings expected for `subusers`");const n=this.getGlobal();return n.subusers=e,n}getSubuserSum(e="delivered",n=Xs[0],r=5,s=0){if(typeof e!="string")throw new Error("string expected for `sortByMetric`");if(!Xs.includes(n.toLowerCase()))throw new Error("desc or asc expected for `sortByDirection`");if(typeof r!="number")throw new Error("number expected for `limit`");if(typeof s!="number")throw new Error("number expected for `offset`");const i=this.getGlobal();return i.sortByMetric=e,i.sortByDirection=n,i.limit=r,i.offset=s,i}getSubuserMonthly(e="delivered",n=Xs[0],r=5,s=0){if(typeof e!="string")throw new Error("string expected for `sortByMetric`");if(!Xs.includes(n.toLowerCase()))throw new Error("desc or asc expected for `sortByDirection`");if(typeof r!="number")throw new Error("number expected for `limit`");if(typeof s!="number")throw new Error("number expected for `offset`");const i=this.getGlobal();return i.sortByMetric=e,i.sortByDirection=n,i.limit=r,i.offset=s,i}_isValidArrayOfStrings(e){return!(!Array.isArray(e)||e.length<1||e.some(n=>typeof n!="string"))}}var pI=fI;const gI=kb,mI=xa,yI=sI,vI=Jd,wI=oI,EI=cI,_I=pI;var TI={Attachment:gI,EmailAddress:mI,Mail:yI,Personalization:vI,Response:wI,ResponseError:EI,Statistics:_I},bI=function(e,n){if(typeof e!="object"||e===null)throw new Error("Not an object provided for base");if(typeof n!="object"||n===null)throw new Error("Not an object provided for data");const r=Object.assign({},e);for(const s in n)n.hasOwnProperty(s)&&(n[s]&&Array.isArray(n[s])?r[s]=n[s]:n[s]&&typeof n[s]=="object"?r[s]=Object.assign({},n[s]):n[s]&&(r[s]=n[s]));return r};const II=Xd,AI=Ma,SI=lr,kI=bI,CI=Wd,RI=ur,NI=Gs,OI=Kd;var DI={arrayToJSON:II,convertKeys:AI,deepClone:SI,mergeData:kI,splitNameEmail:CI,toCamelCase:RI,toSnakeCase:NI,wrapSubstitutions:OI};const PI=TI,LI=DI;var Qd={classes:PI,helpers:LI};const MI=JT,xI=db,{helpers:{mergeData:Zd},classes:{Response:UI,ResponseError:FI}}=Qd,ef="SG.",tf="https://api.sendgrid.com/",$I="https://email.twilio.com/";class VI{constructor(){this.auth="",this.impersonateSubuser="",this.defaultHeaders={Accept:"application/json","Content-Type":"application/json","User-Agent":"sendgrid/"+xI.version+";nodejs"},this.defaultRequest={baseUrl:tf,url:"",method:"GET",headers:{},maxContentLength:1/0,maxBodyLength:1/0}}setApiKey(e){this.auth="Bearer "+e,this.setDefaultRequest("baseUrl",tf),this.isValidApiKey(e)||console.warn(`API key does not start with "${ef}".`)}setTwilioEmailAuth(e,n){const r=Buffer.from(e+":"+n).toString("base64");this.auth="Basic "+r,this.setDefaultRequest("baseUrl",$I),this.isValidTwilioAuth(e,n)||console.warn("Twilio Email credentials must be non-empty strings.")}isValidApiKey(e){return this.isString(e)&&e.trim().startsWith(ef)}isValidTwilioAuth(e,n){return this.isString(e)&&e&&this.isString(n)&&n}isString(e){return typeof e=="string"||e instanceof String}setImpersonateSubuser(e){this.impersonateSubuser=e}setDefaultHeader(e,n){return e!==null&&typeof e=="object"?(Object.assign(this.defaultHeaders,e),this):(this.defaultHeaders[e]=n,this)}setDefaultRequest(e,n){return e!==null&&typeof e=="object"?(Object.assign(this.defaultRequest,e),this):(this.defaultRequest[e]=n,this)}createHeaders(e){const n=Zd(this.defaultHeaders,e);return typeof n.Authorization=="undefined"&&this.auth&&(n.Authorization=this.auth),this.impersonateSubuser&&(n["On-Behalf-Of"]=this.impersonateSubuser),n}createRequest(e){let n={url:e.uri||e.url,baseUrl:e.baseUrl,method:e.method,data:e.body,params:e.qs,headers:e.headers};return n=Zd(this.defaultRequest,n),n.headers=this.createHeaders(n.headers),n.baseURL=n.baseUrl,delete n.baseUrl,n}request(e,n){e=this.createRequest(e);const r=new Promise((s,i)=>{MI(e).then(o=>s([new UI(o.status,o.data,o.headers),o.data])).catch(o=>o.response&&o.response.status>=400?i(new FI(o.response)):i(o))});if(n&&typeof n!="function")throw new Error("Callback passed is not a function.");return n?r.then(s=>n(null,s)).catch(s=>n(s,null)):r}}var nf=VI;const jI=nf;var BI=new jI;const qI=BI,HI=nf;Ta.exports=qI;Ta.exports.Client=HI;const{Client:WI}=Ta.exports,{classes:{Mail:zI}}=Qd;class GI{constructor(){this.setClient(new WI),this.setSubstitutionWrappers("{{","}}"),this.secretRules=[]}setClient(e){return this.client=e,this}setApiKey(e){return this.client.setApiKey(e),this}setTwilioEmailAuth(e,n){this.client.setTwilioEmailAuth(e,n)}setTimeout(e){typeof e!="undefined"&&this.client.setDefaultRequest("timeout",e)}setSubstitutionWrappers(e,n){if(typeof e=="undefined"||typeof n=="undefined")throw new Error("Must provide both left and right side wrappers");return Array.isArray(this.substitutionWrappers)||(this.substitutionWrappers=[]),this.substitutionWrappers[0]=e,this.substitutionWrappers[1]=n,this}setSecretRules(e){e instanceof Array||(e=[e]);const n=e.map(function(r){const s=typeof r;if(s==="string")return{pattern:new RegExp(r)};if(s==="object"){r instanceof RegExp?r={pattern:r}:r.hasOwnProperty("pattern")&&typeof r.pattern=="string"&&(r.pattern=new RegExp(r.pattern));try{return r.pattern.test(""),r}catch{}}});this.secretRules=n.filter(function(r){return r})}filterSecrets(e){if(typeof e=="object"&&!e.hasOwnProperty("content"))return;const n=this;e.content.forEach(function(r){n.secretRules.forEach(function(s){if(s.hasOwnProperty("pattern")&&!s.pattern.test(r.value))return;let i=`The pattern '${s.pattern}'`;throw s.name&&(i+=`identified by '${s.name}'`),i+=" was found in the Mail content!",new Error(i)})})}send(e,n=!1,r){if(typeof n=="function"&&(r=n,n=!1),Array.isArray(e)){const s=Promise.all(e.map(i=>this.send(i,n)));return r&&s.then(i=>r(null,i)).catch(i=>r(i,null)),s}try{typeof e.isMultiple=="undefined"&&(e.isMultiple=n),typeof e.substitutionWrappers=="undefined"&&(e.substitutionWrappers=this.substitutionWrappers);const s=zI.create(e),i=s.toJSON();this.filterSecrets(i);const o={method:"POST",url:"/v3/mail/send",headers:s.headers,body:i};return this.client.request(o,r)}catch(s){return r&&r(s,null),Promise.reject(s)}}sendMultiple(e,n){return this.send(e,!0,n)}}var rf=GI;const KI=rf;var JI=new KI;const XI=JI,YI=rf;_a.exports=XI;_a.exports.MailService=YI;var S0=_a.exports;export{lv as D,cn as E,tt as G,r0 as K,t0 as L,QI as N,s0 as Q,f0 as S,l0 as T,n0 as U,e0 as V,A0 as a,p0 as b,b0 as c,g0 as d,a0 as e,m0 as f,_0 as g,i0 as h,ZI as i,v0 as j,E0 as k,h0 as l,S0 as m,d0 as n,w0 as o,u0 as p,I0 as r,y0 as s,T0 as u,o0 as w,c0 as y};
