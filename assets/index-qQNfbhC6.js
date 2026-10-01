const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-DMRCTYy0.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/theme-DP4aJf3Q.js","assets/vendor-mui-icons-CxYmXzqC.js","assets/vendor-mui-DHixjaIZ.js","assets/theme-CjK3DR0P.css","assets/AppShell-BStKtFZH.css","assets/QuickReadShell-C7f1PN95.js","assets/QuickReadShell-StjY5VHs.css"])))=>i.map(i=>d[i]);
import{r as m,j as c,a as _,d as Ne}from"./vendor-react-CptINutj.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const Ge="modulepreload",Je=function(e){return"/gaborulenius/"+e},ye={},Fe=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let l=function(u){return Promise.all(u.map(v=>Promise.resolve(v).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const A=document.querySelector("meta[property=csp-nonce]"),g=(A==null?void 0:A.nonce)||(A==null?void 0:A.getAttribute("nonce"));r=l(n.map(u=>{if(u=Je(u),u in ye)return;ye[u]=!0;const v=u.endsWith(".css"),y=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const b=document.createElement("link");if(b.rel=v?"stylesheet":Ge,v||(b.as="script"),b.crossOrigin="",b.href=u,g&&b.setAttribute("nonce",g),document.head.appendChild(b),v)return new Promise((i,d)=>{b.addEventListener("load",i),b.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(l){const A=new Event("vite:preloadError",{cancelable:!0});if(A.payload=l,window.dispatchEvent(A),!A.defaultPrevented)throw l}return r.then(l=>{for(const A of l||[])A.status==="rejected"&&a(A.reason);return t().catch(a)})},Ue=({children:e})=>{const[t,n]=m.useState(!1);return m.useEffect(()=>{var u;let o=0,r=0,a=0,l=null;const A=()=>{l==null||l.disconnect(),cancelAnimationFrame(r),window.clearTimeout(a),window.clearTimeout(o)},g=()=>{A(),n(!0)};return o=window.setTimeout(g,1e3),(u=PerformanceObserver.supportedEntryTypes)!=null&&u.includes("largest-contentful-paint")?(l=new PerformanceObserver(v=>{v.getEntries().some(b=>{var i;return(i=b.element)==null?void 0:i.closest("#cover")})&&g()}),l.observe({type:"largest-contentful-paint",buffered:!0})):r=requestAnimationFrame(()=>{a=window.setTimeout(g)}),A},[]),t?e:null},U={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)",floatBg:"rgba(10, 16, 12, 0.66)"},I=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,qe="data:image/jpeg;base64,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",O=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),Z=(e,t,n)=>n===t?e>=n?1:0:O((e-t)/(n-t)),Ft=(e,t,n)=>{const o=Z(n,e,t);return o*o*(3-2*o)},Lt=e=>1-Math.pow(1-e,3),Ve=e=>e*e*e,Ze="(prefers-reduced-motion: reduce)",_e="(min-width: 900px)",Xe="(hover: hover) and (pointer: fine)",ie=e=>typeof window<"u"&&window.matchMedia(e).matches,oe=()=>typeof document<"u"&&document.documentElement.dataset.motion==="reduced"||ie(Ze),Ke=()=>ie(_e),he=()=>ie(Xe),et=()=>{var a;if(typeof window>"u")return"medium";const e=navigator,t=e.hardwareConcurrency??4,n=e.deviceMemory??8,o=ie("(pointer: coarse)"),r=Math.min(window.screen.width,window.screen.height)<820;return(a=e.connection)!=null&&a.saveData||o&&r||n<=2||t<=2?"low":o||n<=4||t<=4?"medium":"high"},tt=.12;let j=0,z=0,C=0,ce=0;const nt=()=>j!==0,rt=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),ot=e=>e.deltaMode===1?e.deltaY*40:e.deltaMode===2?e.deltaY*window.innerHeight:e.deltaY,it=(e,t)=>{let n=e instanceof Element?e:null;for(;n&&n!==document.body&&n!==document.documentElement;){if(n instanceof HTMLElement&&n.scrollHeight>n.clientHeight){const{overflowY:o}=getComputedStyle(n);if((o==="auto"||o==="scroll")&&(t<0?n.scrollTop>0:n.scrollTop+n.clientHeight<n.scrollHeight-1))return!0}n=n.parentElement}return!1},me=()=>{cancelAnimationFrame(j),j=0},Le=e=>{const t=Math.min(.05,(e-ce)/1e3);ce=e,C+=(z-C)*(1-Math.exp(-t/tt)),Math.abs(z-C)<.5&&(C=z),window.scrollTo({top:C,behavior:"instant"}),j=C===z?0:requestAnimationFrame(Le)},be=e=>{if(e.defaultPrevented||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||document.body.style.overflow==="hidden")return;const t=ot(e);!t||it(e.target,t)||(e.preventDefault(),j||(C=window.scrollY,z=C,ce=performance.now(),j=requestAnimationFrame(Le)),z=Math.max(0,Math.min(rt(),z+t)))},xe=()=>{j&&Math.abs(window.scrollY-C)>2&&me()},re=()=>{j&&me()},It=()=>{m.useEffect(()=>{if(!(!he()||oe()))return window.addEventListener("wheel",be,{passive:!1}),window.addEventListener("scroll",xe,{passive:!0}),window.addEventListener("pointerdown",re,!0),window.addEventListener("keydown",re,!0),()=>{me(),window.removeEventListener("wheel",be),window.removeEventListener("scroll",xe),window.removeEventListener("pointerdown",re,!0),window.removeEventListener("keydown",re,!0)}},[])},le=new Set,de=new Set;let Ae=null,Ee=!1;const at=.09,st=.02;let B=null,ae=0,ke=null;const Ie=e=>typeof e=="function"?e():e;let q=null,ue=0;const je=()=>{q||(q=document.createElement("div"),q.setAttribute("aria-hidden","true"),q.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(q)),ue=q.offsetHeight||window.innerHeight},we=()=>{ue||je();const e=window.scrollY;return{y:e,smoothY:B??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:ue,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},Se=()=>{je(),D()},ct=(e,t)=>{const n=performance.now(),o=n-ae>100?1/60:(n-ae)/1e3;if(ae=n,B===null||Math.abs(e-B)>t*1.5||oe())B=e;else{ke??(ke=!he());const r=ke||nt()?st:at;B+=(e-B)*(1-Math.exp(-o/r)),Math.abs(e-B)<.5&&(B=e)}return B},Ye=(e,t,n)=>{const{smoothY:o,vh:r}=e;return{viewport:e,top:t,height:n,pin:O((o-t)/Math.max(1,n-r)),pass:O((o+r-t)/Math.max(1,n+r)),enter:O((o+r-t)/Math.max(1,r)),exit:O((o-(t+n-r))/Math.max(1,r)),near:o+2*r>t&&o-r<t+n}},Pe=(e,t)=>{const n=e.getBoundingClientRect();return{top:n.top+t.y,height:n.height}},lt=()=>{Ae=null;const e=we(),t={...e,smoothY:ct(e.y,e.vh)},n=[];le.forEach(o=>{const r=Ie(o.target);if(!r)return;const{top:a,height:l}=Pe(r,t);n.push([o,a,l])}),n.forEach(([o,r,a])=>{o.callback(Ye(t,r,a))}),de.forEach(o=>o(t)),t.smoothY!==t.y&&D()},D=()=>{Ae!==null||typeof window>"u"||(Ae=window.requestAnimationFrame(lt))},Te=()=>{Ee||typeof window>"u"||(Ee=!0,window.addEventListener("scroll",D,{passive:!0}),window.addEventListener("resize",Se),window.addEventListener("orientationchange",Se),window.addEventListener("load",D),"ResizeObserver"in window&&new ResizeObserver(D).observe(document.documentElement))},Qe=(e,t)=>{Te();const n={target:e,callback:t};le.add(n);const o=Ie(e);if(o){const r=we(),{top:a,height:l}=Pe(o,r);t(Ye(r,a,l))}return D(),()=>{le.delete(n)}},jt=e=>(Te(),de.add(e),D(),()=>{de.delete(e)}),Be={en:"Hi, I'm",fi:"Hei, olen"},Ce={en:"Skip to content",fi:"Siirry sisältöön"},se=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",Me=[{id:"banana-high",image:"banana-high",size:[365,972],origin:[.567,.959],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15.9},narrow:{x:-6,y:-3,width:32},breathe:[1.3,1.012,9.5,-3]},{id:"palm-high",image:"palm-high",size:[644,784],origin:[.324,.962],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34.8},narrow:{x:104,y:-4,width:71.6},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[654,892],origin:[.5,.617],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:31.1},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[827,883],origin:[.454,.739],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:28.5},narrow:{x:6,y:100,width:73.9},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[401,944],origin:[.101,.96],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:16.4},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[472,598],origin:[.5,.73],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:35.8},narrow:{x:96,y:108,width:77.9},breathe:[1.4,1.018,7,-5]}],Re=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},dt=e=>Array.from({length:e},(t,n)=>{const o=Math.sin(n*12.9898)*43758.5453,r=a=>{const l=Math.sin(o+a*78.233)*43758.5453;return l-Math.floor(l)};return{x:r(1),y:r(2),z:.25+r(3)*.75,phase:r(4)*Math.PI*2,alpha:.3+r(5)*.6}}),At=(e,t)=>{const n=window;if(n.requestIdleCallback){const r=n.requestIdleCallback(e,{timeout:t});return()=>{var a;return(a=n.cancelIdleCallback)==null?void 0:a.call(n,r)}}const o=window.setTimeout(e,Math.min(t,1200));return()=>window.clearTimeout(o)},ut=()=>{const e=m.useRef(null),t=m.useRef(null),n=m.useRef(null),o=m.useRef(null),r=m.useRef(null),a=m.useRef({}),[l,A]=m.useState(se),[g,u]=m.useState(!1);m.useEffect(()=>{const i=document.documentElement;if(i.dataset.videoReady==="true"){u(!0);return}const d=new MutationObserver(()=>{i.dataset.videoReady==="true"&&u(!0)});d.observe(i,{attributes:!0,attributeFilter:["data-video-ready"]});const w=window.setTimeout(()=>u(!0),3e3);return()=>{d.disconnect(),window.clearTimeout(w)}},[]);const v=Be[l]??Be.en,y=Ce[l]??Ce.en;m.useEffect(()=>{const i=document.documentElement;A(se());const d=new MutationObserver(()=>{A(se())});return d.observe(i,{attributes:!0,attributeFilter:["data-locale"]}),()=>d.disconnect()},[]),m.useEffect(()=>{const i=e.current;if(!i)return;const d=oe(),w=he()&&!d,s={x:0,y:0,targetX:0,targetY:0};let f=0,Y={vw:window.innerWidth,vh:window.innerHeight},k=null;const h=Me,M=()=>{const p=d?0:Ve(f),{vw:N,vh:R}=Y,F=d?1:1-Z(f,.72,.98);h.forEach(x=>{const $=a.current[x.id];if(!$)return;const K=x.exit.x*N*p+s.x*34,ee=x.exit.y*R*p+s.y*22,J=1+(x.exit.scale-1)*p;$.style.transform=`translate3d(${K.toFixed(1)}px, ${ee.toFixed(1)}px, 0) rotate(${x.rotate}deg) scale(${x.mirror?-J:J}, ${J})`,$.style.setProperty("--leave",F.toFixed(3))});const X=t.current;if(X){const x=d?0:Z(f,.3,.84),$=d?0:f;X.style.transform=`translate3d(${(s.x*10).toFixed(1)}px, ${(s.y*8-$*R*.05).toFixed(1)}px, 0) scale(${(1+.3*p).toFixed(3)})`,X.style.opacity=(1-x).toFixed(3)}const G=n.current;G&&(G.style.transform=`translate3d(${(s.x*14).toFixed(1)}px, ${(f*R*.07).toFixed(1)}px, 0) scale(${(1+.14*f).toFixed(3)})`,G.style.opacity=(d?1:1-Z(f,.55,.98)).toFixed(3));const W=o.current;W&&(W.style.transform=`translate3d(${(s.x*6).toFixed(1)}px, 0, 0)`,W.style.opacity=(d?1:1-Z(f,.55,.98)).toFixed(3));const V=r.current;V&&V.style.setProperty("--leave",F.toFixed(3))},P=Qe(i,p=>{f=p.pin,Y={vw:p.viewport.vw,vh:p.viewport.vh},M()}),T=()=>{k=null,s.x+=(s.targetX-s.x)*.08,s.y+=(s.targetY-s.y)*.08,M(),(Math.abs(s.targetX-s.x)>.001||Math.abs(s.targetY-s.y)>.001)&&(k=window.requestAnimationFrame(T))},Q=p=>{f>=1||(s.targetX=O(p.clientX/Y.vw-.5,-.5,.5),s.targetY=O(p.clientY/Y.vh-.5,-.5,.5),k===null&&(k=window.requestAnimationFrame(T)))};return w&&window.addEventListener("pointermove",Q,{passive:!0}),()=>{P(),w&&window.removeEventListener("pointermove",Q),k!==null&&window.cancelAnimationFrame(k)}},[]),m.useEffect(()=>{const i=r.current,d=e.current;if(!i||!d)return;const w=i.getContext("2d");if(!w)return;const s=oe(),Y=et()==="low"?14:Ke()?42:22,k=dt(Y),h=Math.min(window.devicePixelRatio||1,1.5);let M=0,P=0,T=!0,Q=null,p=0,N=!1;const R=document.createElement("canvas");R.width=32,R.height=32;const F=R.getContext("2d");(()=>{if(!F)return;const E=F.createRadialGradient(16,16,0,16,16,16),H="255, 238, 196";E.addColorStop(0,`rgba(${H}, 1)`),E.addColorStop(.35,`rgba(${H}, 0.45)`),E.addColorStop(1,`rgba(${H}, 0)`),F.clearRect(0,0,32,32),F.fillStyle=E,F.fillRect(0,0,32,32)})();const G=()=>{M=i.clientWidth,P=i.clientHeight,i.width=Math.round(M*h),i.height=Math.round(P*h),w.setTransform(h,0,0,h,0,0)},W=E=>{w.clearRect(0,0,M,P);const H=E/1e3;k.forEach(L=>{const $e=s?0:H*(.004+L.z*.01),He=s?0:Math.sin(H*.6+L.phase)*.012,ge=((L.x+He)%1+1)%1*M,Oe=s?0:p*L.z*.55;let te=L.y-$e-Oe;te=(te%1+1)%1*P;const ze=.62-te/P*.24,ve=Math.max(0,1-Math.abs(ge/M-ze)/.09),De=s?1:.75+.25*Math.sin(H*1.7+L.phase*3),ne=(1.2+L.z*3.2)*(1+ve*.6);w.globalAlpha=Math.min(1,L.alpha*(.45+ve*1.1)*De),w.drawImage(R,ge-ne,te-ne,ne*2,ne*2)}),w.globalAlpha=1},V=E=>{Q=null,W(E),T&&!document.hidden&&!s&&(Q=window.requestAnimationFrame(V))},x=()=>{Q===null&&T&&!document.hidden&&(Q=window.requestAnimationFrame(V))},$=Qe(d,E=>{p=E.pin}),K=new IntersectionObserver(([E])=>{T=E.isIntersecting,T&&N&&x()});K.observe(d);const ee=()=>{!document.hidden&&N&&x()};document.addEventListener("visibilitychange",ee);const J=()=>{G(),s&&N&&W(0)};window.addEventListener("resize",J);const We=At(()=>{N=!0,G(),i.dataset.ready="true",window.setTimeout(()=>{i.dataset.settled="true"},1700),s?W(0):x()},2500);return()=>{$(),K.disconnect(),document.removeEventListener("visibilitychange",ee),window.removeEventListener("resize",J),Q!==null&&window.cancelAnimationFrame(Q),We()}},[]);const b=i=>`cover-layer cover-layer--leaf cover-layer--${i.id}${i.wideOnly?" cover-layer--wide-only":""}`;return c.jsxs(c.Fragment,{children:[c.jsx("a",{className:"cover-skip",href:"#home",children:y}),c.jsxs("div",{id:"cover",ref:e,className:"cover",children:[c.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[c.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),c.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[c.jsxs("div",{ref:n,className:"cover-mist",children:[c.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),c.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),c.jsx("div",{ref:o,className:"cover-shaft"}),c.jsx("canvas",{ref:r,className:"cover-pollen"})]}),c.jsxs("div",{ref:t,className:"cover-copy",children:[c.jsx("img",{alt:"Gábor Ulenius",src:I("profile-160.webp"),srcSet:`${I("profile-160.webp")} 160w, ${I("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),c.jsxs("h1",{id:"cover-heading",className:"cover-greeting",children:[v," ",c.jsx("span",{id:"cover-name",children:"Gábor"})]})]}),c.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:Me.map(i=>{const[d,w]=i.size,s=i.narrow??i.wide,f=I(`cover/${i.image}.webp`),k=`${I(`cover/${i.image}-sm.webp`)} ${Math.ceil(d/2)}w, ${f} ${d}w`;return c.jsxs("picture",{children:[i.wideOnly&&g?c.jsx("source",{media:"(min-width: 900px)",srcSet:k,sizes:`${i.wide.width}vw`}):null,c.jsx("img",{ref:h=>{a.current[i.id]=h,h!=null&&h.complete&&h.naturalWidth&&Re(h)},className:b(i),src:g&&!i.wideOnly?f:void 0,srcSet:g&&!i.wideOnly?k:void 0,sizes:`(max-width: 899.95px) ${s.width}vw, ${i.wide.width}vw`,width:d,height:w,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:h=>Re(h.currentTarget),style:{"--x":`${i.wide.x}%`,"--y":`${i.wide.y}%`,"--w":`${i.wide.width}vw`,"--nx":`${s.x}%`,"--ny":`${s.y}%`,"--nw":`${s.width}vw`,"--ox":i.origin[0],"--oy":i.origin[1],"--aspect":w/d,"--breath-turn":`${i.breathe[0]}deg`,"--breath-grow":i.breathe[1],"--breath-period":`${i.breathe[2]}s`,"--breath-delay":`${i.breathe[3]}s`}})]},i.id)})})]}),c.jsx("style",{children:`
        /* As tall as the large viewport, like the films behind it: while a
           phone's toolbars are hidden the screen is that tall, and the
           leaves must reach its bottom. */
        .cover {
          position: relative;
          z-index: 1;
          height: 150vh;
          height: 150lvh;
        }
        .cover-scene {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100lvh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: ${U.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${qe}") center / cover no-repeat;
          filter: blur(22px) saturate(1.1);
          transition: opacity 900ms ease;
        }
        html[data-video-ready="true"] .cover-lqip { opacity: 0; }
        .cover-depth {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cover-depth--near { z-index: 3; }
        .cover-layer {
          position: absolute;
          will-change: transform;
        }
        /* A leaf: placed by its stalk (--x, --y) and its width (--w), turned
           around the stalk, fading in once loaded, and breathing. */
        .cover-layer--leaf {
          --lx: var(--x);
          --ly: var(--y);
          --lw: var(--w);
          left: calc(var(--lx) - var(--ox) * var(--lw));
          top: calc(var(--ly) - var(--oy) * var(--lw) * var(--aspect));
          width: var(--lw);
          height: auto;
          transform-origin: calc(var(--ox) * 100%) calc(var(--oy) * 100%);
          opacity: 0;
          transition: opacity 1.4s ease;
          user-select: none;
          animation: cover-leaf-breathe var(--breath-period, 8s) ease-in-out var(--breath-delay, 0s) infinite;
        }
        .cover-layer--leaf[data-ready="true"] { opacity: var(--leave, 1); }
        .cover-layer--leaf[data-settled="true"],
        .cover-pollen[data-settled="true"] { transition: none; }
        @keyframes cover-leaf-breathe {
          0%, 100% { rotate: calc(var(--breath-turn, 1deg) * -1); scale: 1; }
          50% { rotate: var(--breath-turn, 1deg); scale: var(--breath-grow, 1.015); }
        }
        @media (max-width: 899.95px) {
          .cover { height: 130vh; height: 130lvh; }
          .cover-layer--wide-only { display: none; }
          .cover-layer--leaf { --lx: var(--nx); --ly: var(--ny); --lw: var(--nw); }
        }
        .cover-mist {
          position: absolute;
          inset: 0;
          will-change: transform, opacity;
        }
        .cover-mist-band {
          position: absolute;
          left: -20%;
          width: 140%;
          border-radius: 50%;
          filter: blur(30px);
        }
        .cover-mist-band--a {
          top: 52%;
          height: 42%;
          background: radial-gradient(closest-side, rgba(222, 236, 205, 0.18), rgba(222, 236, 205, 0));
          animation: cover-mist-drift 38s ease-in-out infinite alternate;
        }
        .cover-mist-band--b {
          top: 64%;
          height: 36%;
          background: radial-gradient(closest-side, rgba(240, 226, 186, 0.12), rgba(240, 226, 186, 0));
          animation: cover-mist-drift 52s ease-in-out -20s infinite alternate-reverse;
        }
        @keyframes cover-mist-drift {
          from { transform: translate3d(-4vw, 0, 0); }
          to { transform: translate3d(4vw, -1vh, 0); }
        }
        .cover-shaft {
          position: absolute;
          top: -12vh;
          left: 47vw;
          width: 22vw;
          height: 125vh;
          transform-origin: 50% 0;
          rotate: 17deg;
          background: linear-gradient(90deg, rgba(255, 226, 160, 0), rgba(255, 228, 168, 0.1) 38%, rgba(255, 240, 205, 0.16) 50%, rgba(255, 228, 168, 0.1) 62%, rgba(255, 226, 160, 0));
          -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.6) 45%, transparent 88%);
          mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.6) 45%, transparent 88%);
          animation: cover-shaft-shimmer 9s ease-in-out infinite alternate;
        }
        @keyframes cover-shaft-shimmer {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }
        .cover-pollen {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.6s ease;
        }
        .cover-pollen[data-ready="true"] { opacity: var(--leave, 1); }
        .cover-copy {
          position: relative;
          z-index: 2;
          max-width: 720px;
          padding: 0 24px;
          transform-origin: 50% 45%;
          will-change: transform, opacity;
        }
        .cover-avatar {
          display: block;
          width: 140px;
          height: 140px;
          margin: 0 auto 36px auto;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid ${U.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${U.bgDark};
        }
        @media (min-width: 600px) {
          .cover-avatar { width: 150px; height: 150px; }
        }
        @media (min-width: 900px) {
          .cover-avatar { width: 160px; height: 160px; }
        }
        .cover-greeting {
          margin: 0;
          font-family: "Inter", system-ui, sans-serif;
          font-size: clamp(2.5rem, 6.4vw, 5.4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.02;
          color: #f4efdf;
          text-shadow: 0 2px 30px rgba(8, 14, 9, 0.6), 0 1px 2px rgba(8, 14, 9, 0.5);
        }
        .cover-skip {
          position: fixed;
          left: 16px;
          top: 16px;
          z-index: 1300;
          padding: 12px 18px;
          border-radius: 10px;
          background: ${U.btnBg};
          color: ${U.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${U.accentHover};
          outline-offset: 3px;
        }
        :root[data-motion="reduced"] .cover { height: 100vh; height: 100lvh; }
        :root[data-motion="reduced"] .cover-mist-band,
        :root[data-motion="reduced"] .cover-shaft { animation: none; }
        :root[data-motion="reduced"] .cover-lqip,
        :root[data-motion="reduced"] .cover-pollen,
        :root[data-motion="reduced"] .cover-layer--leaf { transition: none; }
        :root[data-motion="reduced"] .cover-layer--leaf { animation: none; }
      `})]})]})},ht="journey-position",Yt=()=>{try{const e=sessionStorage.getItem(ht);return e?JSON.parse(e):null}catch{return null}},mt=()=>{const e=performance.getEntriesByType("navigation")[0];return(e==null?void 0:e.type)==="reload"||(e==null?void 0:e.type)==="back_forward"},fe=()=>{const e=navigator;return e.connection??e.mozConnection??e.webkitConnection},Pt=()=>{const e=fe();return e!=null&&e.saveData?!1:!["slow-2g","2g"].includes((e==null?void 0:e.effectiveType)??"")},wt=()=>{const e=fe();if(e!=null&&e.saveData||["slow-2g","2g","3g"].includes((e==null?void 0:e.effectiveType)??""))return!0;const t=navigator.deviceMemory;return t!==void 0&&t<=2},ft=()=>{var t;const e=(t=fe())==null?void 0:t.downlink;return typeof e=="number"&&e>0&&e<4},pt=e=>({hd:I(`film/hd/${e}.mp4`),sd:I(`film/sd/${e}.mp4`),portrait:I(`film/portrait/${e}.mp4`)}),gt=640/1080,vt=(e,t)=>e/Math.max(1,t)<=gt+.001,yt=()=>wt()||ft()?"sd":"hd",bt=async(e,t,n)=>{const o=await fetch(e,{signal:n});if(!o.ok)throw new Error(`${o.status}`);const r=Number(o.headers.get("content-length"))||0;if(!o.body||!r)return o.blob();const a=o.body.getReader(),l=[];let A=0,g=-1;for(;;){const{done:u,value:v}=await a.read();if(u)break;l.push(v),A+=v.length;const y=Math.min(1,A/r);(y-g>=.01||y===1)&&(g=y,window.dispatchEvent(new CustomEvent("filmprogress",{detail:{index:t,progress:y}})))}return new Blob(l,{type:o.headers.get("content-type")??"video/mp4"})},xt="chase",Et=(e,t)=>pt(xt)[vt(e,t)?"portrait":yt()];let S=null;const kt=()=>{if(S||document.documentElement.dataset.motion==="reduced"||window.location.hash||mt())return;const{vw:e,vh:t}=we(),n=Et(e,t),o=new AbortController,r=bt(n,0,o.signal);r.catch(()=>{}),S={url:n,blob:r,abort:o}},Tt=e=>{if(!S||S.url!==e)return null;const t=S;return S=null,t},Wt=()=>{S==null||S.abort.abort(),S=null},St="quickRead",Qt=()=>typeof document<"u"&&document.documentElement.dataset.quickRead==="true",$t=e=>{const t=new URL(window.location.href);try{localStorage.setItem(St,e?"1":"0"),t.searchParams.delete("read")}catch{t.searchParams.set("read",e?"1":"0")}window.history.replaceState(window.history.state,"",t),window.location.reload()},Bt=_.lazy(()=>Fe(()=>import("./AppShell-DMRCTYy0.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),Ct=_.lazy(()=>Fe(()=>import("./QuickReadShell-C7f1PN95.js"),__vite__mapDeps([9,1,4,5,6,3,2,7,10]))),pe=Qt();pe||kt();window.addEventListener("vite:preloadError",()=>{try{const e=Number(sessionStorage.getItem("reloadedForUpdate")??0);if(Date.now()-e<3e4)return;sessionStorage.setItem("reloadedForUpdate",String(Date.now()))}catch{return}window.location.reload()});!pe&&"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Mt=Ne.createRoot(document.getElementById("root"));Mt.render(c.jsx(_.StrictMode,{children:pe?c.jsx(_.Suspense,{fallback:null,children:c.jsx(Ct,{})}):c.jsxs(c.Fragment,{children:[c.jsx(ut,{}),c.jsx(Ue,{children:c.jsx(_.Suspense,{fallback:null,children:c.jsx(Bt,{})})})]})}));export{ht as P,Fe as _,I as a,we as b,O as c,D as d,Lt as e,pt as f,et as g,he as h,Ke as i,Z as j,mt as k,Yt as l,yt as m,Wt as n,jt as o,oe as p,vt as q,Qe as r,Ft as s,Tt as t,bt as u,It as v,wt as w,U as x,$t as y,Pt as z};
