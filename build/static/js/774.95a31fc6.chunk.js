"use strict";(self.webpackChunkearn3_onft_bridge=self.webpackChunkearn3_onft_bridge||[]).push([[774],{7171:function(e,t,n){n.d(t,{ConfigCtrl:function(){return E},zv:function(){return b},uA:function(){return y},ExplorerCtrl:function(){return N},jb:function(){return x},OptionsCtrl:function(){return C},AV:function(){return v},ThemeCtrl:function(){return V},ToastCtrl:function(){return J}});Symbol();const s=Symbol();const o=Object.getPrototypeOf,r=new WeakMap,i=e=>e&&(r.has(e)?r.get(e):o(e)===Object.prototype||o(e)===Array.prototype),a=function(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];r.set(e,t)},l=e=>"object"===typeof e&&null!==e,c=new WeakMap,d=new WeakSet,u=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object.is,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:(e,t)=>new Proxy(e,t),n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e=>l(e)&&!d.has(e)&&(Array.isArray(e)||!(Symbol.iterator in e))&&!(e instanceof WeakMap)&&!(e instanceof WeakSet)&&!(e instanceof Error)&&!(e instanceof Number)&&!(e instanceof Date)&&!(e instanceof String)&&!(e instanceof RegExp)&&!(e instanceof ArrayBuffer),o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e=>{switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:throw e}},r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:new WeakMap,u=arguments.length>5&&void 0!==arguments[5]?arguments[5]:function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o;const s=r.get(e);if((null==s?void 0:s[0])===t)return s[1];const i=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e));return a(i,!0),r.set(e,[t,i]),Reflect.ownKeys(e).forEach((t=>{if(Object.getOwnPropertyDescriptor(i,t))return;const s=Reflect.get(e,t),o={value:s,enumerable:!0,configurable:!0};if(d.has(s))a(s,!1);else if(s instanceof Promise)delete o.value,o.get=()=>n(s);else if(c.has(s)){const[e,t]=c.get(s);o.value=u(e,t(),n)}Object.defineProperty(i,t,o)})),i},p=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new WeakMap,g=arguments.length>7&&void 0!==arguments[7]?arguments[7]:[1,1],h=arguments.length>8&&void 0!==arguments[8]?arguments[8]:o=>{if(!l(o))throw new Error("object required");const r=p.get(o);if(r)return r;let a=g[0];const f=new Set,m=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:++g[0];a!==t&&(a=t,f.forEach((n=>n(e,t))))};let v=g[1];const b=e=>(t,n)=>{const s=[...t];s[1]=[e,...s[1]],m(s,n)},w=new Map,y=e=>{var t;const n=w.get(e);n&&(w.delete(e),null==(t=n[1])||t.call(n))},I=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o)),C={deleteProperty(e,t){const n=Reflect.get(e,t);y(t);const s=Reflect.deleteProperty(e,t);return s&&m(["delete",[t],n]),s},set(t,o,r,a){const u=Reflect.has(t,o),g=Reflect.get(t,o,a);if(u&&(e(g,r)||p.has(r)&&e(g,p.get(r))))return!0;y(o),l(r)&&(r=(e=>i(e)&&e[s]||null)(r)||r);let v=r;if(r instanceof Promise)r.then((e=>{r.status="fulfilled",r.value=e,m(["resolve",[o],e])})).catch((e=>{r.status="rejected",r.reason=e,m(["reject",[o],e])}));else{!c.has(r)&&n(r)&&(v=h(r));const e=!d.has(v)&&c.get(v);e&&((e,t)=>{if(w.has(e))throw new Error("prop listener already exists");if(f.size){const n=t[3](b(e));w.set(e,[t,n])}else w.set(e,[t])})(o,e)}return Reflect.set(t,o,v,a),m(["set",[o],r,g]),!0}},W=t(I,C);p.set(o,W);const E=[I,function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:++g[1];return v===e||f.size||(v=e,w.forEach((t=>{let[n]=t;const s=n[1](e);s>a&&(a=s)}))),a},u,e=>{f.add(e),1===f.size&&w.forEach(((e,t)=>{let[n,s]=e;if(s)throw new Error("remove already exists");const o=n[3](b(t));w.set(t,[n,o])}));return()=>{f.delete(e),0===f.size&&w.forEach(((e,t)=>{let[n,s]=e;s&&(s(),w.set(t,[n]))}))}}];return c.set(W,E),Reflect.ownKeys(o).forEach((e=>{const t=Object.getOwnPropertyDescriptor(o,e);"value"in t&&(W[e]=o[e],delete t.value,delete t.writable),Object.defineProperty(I,e,t)})),W};return[h,c,d,e,t,n,o,r,u,p,g]},[p]=u();function g(){return p(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function h(e,t,n){const s=c.get(e);let o;s||console.warn("Please use proxy object");const r=[],i=s[3];let a=!1;const l=i((e=>{r.push(e),n?t(r.splice(0)):o||(o=Promise.resolve().then((()=>{o=void 0,a&&t(r.splice(0))})))}));return a=!0,()=>{a=!1,l()}}var f=n(19778);const m=g({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),v={state:m,subscribe(e){return h(m,(()=>e(m)))},push(e,t){e!==m.view&&(m.view=e,t&&(m.data=t),m.history.push(e))},reset(e){m.view=e,m.history=[e]},replace(e){m.history.length>1&&(m.history[m.history.length-1]=e,m.view=e)},goBack(){if(m.history.length>1){m.history.pop();const[e]=m.history.slice(-1);m.view=e}},setData(e){m.data=e}},b={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"&&Boolean(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent))},isAndroid(){return b.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return b.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},formatNativeUrl(e,t,n){if(b.isHttpUrl(e))return this.formatUniversalUrl(e,t,n);let s=e;s.includes("://")||(s=e.replaceAll("/","").replaceAll(":",""),s=`${s}://`),s.endsWith("/")||(s=`${s}/`),this.setWalletConnectDeepLink(s,n);return`${s}wc?uri=${encodeURIComponent(t)}`},formatUniversalUrl(e,t,n){if(!b.isHttpUrl(e))return this.formatNativeUrl(e,t,n);let s=e;s.endsWith("/")||(s=`${s}/`),this.setWalletConnectDeepLink(s,n);return`${s}wc?uri=${encodeURIComponent(t)}`},async wait(e){return new Promise((t=>{setTimeout(t,e)}))},openHref(e,t){window.open(e,t,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(b.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(b.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(b.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(b.WCM_VERSION,"2.5.9")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=null==(e=v.state.data)?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},w=g({enabled:typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),userSessionId:"",events:[],connectedWalletId:void 0}),y={state:w,subscribe(e){return h(w.events,(()=>e(function(e,t){const n=c.get(e);n||console.warn("Please use proxy object");const[s,o,r]=n;return r(s,o(),t)}(w.events[w.events.length-1]))))},initialize(){w.enabled&&typeof(null==crypto?void 0:crypto.randomUUID)<"u"&&(w.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){w.connectedWalletId=e},click(e){if(w.enabled){const t={type:"CLICK",name:e.name,userSessionId:w.userSessionId,timestamp:Date.now(),data:e};w.events.push(t)}},track(e){if(w.enabled){const t={type:"TRACK",name:e.name,userSessionId:w.userSessionId,timestamp:Date.now(),data:e};w.events.push(t)}},view(e){if(w.enabled){const t={type:"VIEW",name:e.name,userSessionId:w.userSessionId,timestamp:Date.now(),data:e};w.events.push(t)}}},I=g({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),C={state:I,subscribe(e){return h(I,(()=>e(I)))},setChains(e){I.chains=e},setWalletConnectUri(e){I.walletConnectUri=e},setIsCustomDesktop(e){I.isCustomDesktop=e},setIsCustomMobile(e){I.isCustomMobile=e},setIsDataLoaded(e){I.isDataLoaded=e},setIsUiLoaded(e){I.isUiLoaded=e},setIsAuth(e){I.isAuth=e}},W=g({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),E={state:W,subscribe(e){return h(W,(()=>e(W)))},setConfig(e){var t,n;y.initialize(),C.setChains(e.chains),C.setIsAuth(Boolean(e.enableAuthMode)),C.setIsCustomMobile(Boolean(null==(t=e.mobileWallets)?void 0:t.length)),C.setIsCustomDesktop(Boolean(null==(n=e.desktopWallets)?void 0:n.length)),b.setModalVersionInStorage(),Object.assign(W,e)}},O="https://explorer-api.walletconnect.com";async function L(e,t){const n=new URL(e,O);return n.searchParams.append("projectId",E.state.projectId),Object.entries(t).forEach((e=>{let[t,s]=e;s&&n.searchParams.append(t,String(s))})),(await fetch(n)).json()}const A={async getDesktopListings(e){return L("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return L("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return L("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return L("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${O}/w3m/v1/getWalletImage/${e}?projectId=${E.state.projectId}`},getAssetImageUrl(e){return`${O}/w3m/v1/getAssetImage/${e}?projectId=${E.state.projectId}`}};var j=Object.defineProperty,M=Object.getOwnPropertySymbols,U=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable,D=(e,t,n)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const P=b.isMobile(),S=g({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),N={state:S,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=E.state;if("NONE"===e||"ALL"===t&&!e)return S.recomendedWallets;if(b.isArray(e)){const t={recommendedIds:e.join(",")},{listings:n}=await A.getAllListings(t),s=Object.values(n);s.sort(((t,n)=>e.indexOf(t.id)-e.indexOf(n.id))),S.recomendedWallets=s}else{const{chains:e,isAuth:n}=C.state,s=null===e||void 0===e?void 0:e.join(","),o=b.isArray(t),r={page:1,sdks:n?"auth_v1":void 0,entries:b.RECOMMENDED_WALLET_AMOUNT,chains:s,version:2,excludedIds:o?t.join(","):void 0},{listings:i}=P?await A.getMobileListings(r):await A.getDesktopListings(r);S.recomendedWallets=Object.values(i)}return S.recomendedWallets},async getWallets(e){const t=((e,t)=>{for(var n in t||(t={}))U.call(t,n)&&D(e,n,t[n]);if(M)for(var n of M(t))k.call(t,n)&&D(e,n,t[n]);return e})({},e),{explorerRecommendedWalletIds:n,explorerExcludedWalletIds:s}=E.state,{recomendedWallets:o}=S;if("ALL"===s)return S.wallets;o.length?t.excludedIds=o.map((e=>e.id)).join(","):b.isArray(n)&&(t.excludedIds=n.join(",")),b.isArray(s)&&(t.excludedIds=[t.excludedIds,s].filter(Boolean).join(",")),C.state.isAuth&&(t.sdks="auth_v1");const{page:r,search:i}=e,{listings:a,total:l}=P?await A.getMobileListings(t):await A.getDesktopListings(t),c=Object.values(a),d=i?"search":"wallets";return S[d]={listings:[...S[d].listings,...c],total:l,page:null!==r&&void 0!==r?r:1},{listings:c,total:l}},getWalletImageUrl(e){return A.getWalletImageUrl(e)},getAssetImageUrl(e){return A.getAssetImageUrl(e)},resetSearch(){S.search={listings:[],total:0,page:1}}},T=g({open:!1}),x={state:T,subscribe(e){return h(T,(()=>e(T)))},async open(e){return new Promise((t=>{const{isUiLoaded:n,isDataLoaded:s}=C.state;if(C.setWalletConnectUri(null===e||void 0===e?void 0:e.uri),C.setChains(null===e||void 0===e?void 0:e.chains),v.reset("ConnectWallet"),n&&s)T.open=!0,t();else{const e=setInterval((()=>{const n=C.state;n.isUiLoaded&&n.isDataLoaded&&(clearInterval(e),T.open=!0,t())}),200)}}))},close(){T.open=!1}};var R=Object.defineProperty,_=Object.getOwnPropertySymbols,$=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable,H=(e,t,n)=>t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;const K=g({themeMode:typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}),V={state:K,subscribe(e){return h(K,(()=>e(K)))},setThemeConfig(e){const{themeMode:t,themeVariables:n}=e;t&&(K.themeMode=t),n&&(K.themeVariables=((e,t)=>{for(var n in t||(t={}))$.call(t,n)&&H(e,n,t[n]);if(_)for(var n of _(t))B.call(t,n)&&H(e,n,t[n]);return e})({},n))}},z=g({open:!1,message:"",variant:"success"}),J={state:z,subscribe(e){return h(z,(()=>e(z)))},openToast(e,t){z.open=!0,z.message=e,z.variant=t},closeToast(){z.open=!1}};typeof window<"u"&&(window.Buffer||(window.Buffer=f.Buffer),window.global||(window.global=window),window.process||(window.process={env:{}}),window.global||(window.global=window))},774:function(e,t,n){n.d(t,{WalletConnectModal:function(){return o}});var s=n(7171);class o{constructor(e){this.openModal=s.jb.open,this.closeModal=s.jb.close,this.subscribeModal=s.jb.subscribe,this.setTheme=s.ThemeCtrl.setThemeConfig,s.ThemeCtrl.setThemeConfig(e),s.ConfigCtrl.setConfig(e),this.initUi()}async initUi(){if(typeof window<"u"){await Promise.all([n.e(741),n.e(459)]).then(n.bind(n,3459));const e=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",e),s.OptionsCtrl.setIsUiLoaded(!0)}}}}}]);
//# sourceMappingURL=774.95a31fc6.chunk.js.map