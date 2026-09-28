const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-L7OrOkm_.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-icons-fQrRj7E3.js","assets/vendor-mui-CXUgQPvW.js","assets/AppShell-CthMMC15.css"])))=>i.map(i=>d[i]);
import{r as f,j as c,a as te,d as Re}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const Me="modulepreload",je=function(e){return"/gaborulenius/"+e},Ae={},Le=function(n,r,i){let t=Promise.resolve();if(r&&r.length>0){let l=function(u){return Promise.all(u.map(Q=>Promise.resolve(Q).then(R=>({status:"fulfilled",value:R}),R=>({status:"rejected",reason:R}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),$=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));t=l(r.map(u=>{if(u=je(u),u in Ae)return;Ae[u]=!0;const Q=u.endsWith(".css"),R=Q?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${R}`))return;const y=document.createElement("link");if(y.rel=Q?"stylesheet":Me,Q||(y.as="script"),y.crossOrigin="",y.href=u,$&&y.setAttribute("nonce",$),document.head.appendChild(y),Q)return new Promise((o,A)=>{y.addEventListener("load",o),y.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(l){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=l,window.dispatchEvent(d),!d.defaultPrevented)throw l}return t.then(l=>{for(const d of l||[])d.status==="rejected"&&a(d.reason);return n().catch(a)})},T={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},N=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Fe="data:image/jpeg;base64,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",P=(e,n=0,r=1)=>Math.min(r,Math.max(n,e)),G=(e,n,r)=>r===n?e>=r?1:0:P((e-n)/(r-n)),qe=(e,n,r)=>{const i=G(r,e,n);return i*i*(3-2*i)},Xe=e=>1-Math.pow(1-e,3),Ye=e=>e*e*e,Ie="(prefers-reduced-motion: reduce)",Pe="(min-width: 900px)",We="(hover: hover) and (pointer: fine)",K=e=>typeof window<"u"&&window.matchMedia(e).matches,re=()=>K(Ie),$e=()=>K(Pe),ze=()=>K(We),He=()=>{var a;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,r=e.deviceMemory??8,i=K("(pointer: coarse)"),t=Math.min(window.screen.width,window.screen.height)<820;return(a=e.connection)!=null&&a.saveData||i&&t||r<=2||n<=2?"low":i||r<=4||n<=4?"medium":"high"},ne=new Set,oe=new Set;let ie=null,le=!1;const Oe=.09;let E=null,_=0;const ve=e=>typeof e=="function"?e():e;let D=null,ae=0;const ge=()=>{D||(D=document.createElement("div"),D.setAttribute("aria-hidden","true"),D.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(D)),ae=D.offsetHeight||window.innerHeight},fe=()=>{ae||ge();const e=window.scrollY;return{y:e,smoothY:E??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:ae,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},de=()=>{ge(),W()},Te=(e,n)=>{const r=performance.now(),i=r-_>100?1/60:(r-_)/1e3;return _=r,E===null||Math.abs(e-E)>n*1.5||re()?E=e:(E+=(e-E)*(1-Math.exp(-i/Oe)),Math.abs(e-E)<.5&&(E=e)),E},xe=(e,n,r)=>{const{smoothY:i,vh:t}=e;return{viewport:e,top:n,height:r,pin:P((i-n)/Math.max(1,r-t)),pass:P((i+t-n)/Math.max(1,r+t)),enter:P((i+t-n)/Math.max(1,t)),exit:P((i-(n+r-t))/Math.max(1,t)),near:i+2*t>n&&i-t<n+r}},ye=(e,n)=>{const r=e.getBoundingClientRect();return{top:r.top+n.y,height:r.height}},De=()=>{ie=null;const e=fe(),n={...e,smoothY:Te(e.y,e.vh)},r=[];ne.forEach(i=>{const t=ve(i.target);if(!t)return;const{top:a,height:l}=ye(t,n);r.push([i,a,l])}),r.forEach(([i,t,a])=>{i.callback(xe(n,t,a))}),oe.forEach(i=>i(n)),n.smoothY!==n.y&&W()},W=()=>{ie!==null||typeof window>"u"||(ie=window.requestAnimationFrame(De))},be=()=>{le||typeof window>"u"||(le=!0,window.addEventListener("scroll",W,{passive:!0}),window.addEventListener("resize",de),window.addEventListener("orientationchange",de),window.addEventListener("load",W),"ResizeObserver"in window&&new ResizeObserver(W).observe(document.documentElement))},he=(e,n)=>{be();const r={target:e,callback:n};ne.add(r);const i=ve(e);if(i){const t=fe(),{top:a,height:l}=ye(i,t);n(xe(t,a,l))}return W(),()=>{ne.delete(r)}},Ke=e=>(be(),oe.add(e),W(),()=>{oe.delete(e)}),ue={en:"Hi, I'm",fi:"Hei, olen"},me={en:"Skip to content",fi:"Siirry sisältöön"},ee=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",we=[{id:"banana-high",image:"banana-high",size:[365,972],origin:[.567,.959],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15.9},narrow:{x:-6,y:-3,width:32},breathe:[1.3,1.012,9.5,-3]},{id:"palm-high",image:"palm-high",size:[644,784],origin:[.324,.962],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34.8},narrow:{x:104,y:-4,width:71.6},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[654,892],origin:[.5,.617],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:31.1},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[827,883],origin:[.454,.739],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:28.5},narrow:{x:6,y:100,width:73.9},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[401,944],origin:[.101,.96],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:16.4},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[472,598],origin:[.5,.73],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:35.8},narrow:{x:96,y:108,width:77.9},breathe:[1.4,1.018,7,-5]}],pe=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},Je=e=>Array.from({length:e},(n,r)=>{const i=Math.sin(r*12.9898)*43758.5453,t=a=>{const l=Math.sin(i+a*78.233)*43758.5453;return l-Math.floor(l)};return{x:t(1),y:t(2),z:.25+t(3)*.75,phase:t(4)*Math.PI*2,alpha:.3+t(5)*.6}}),Ne=(e,n)=>{const r=window;if(r.requestIdleCallback){const t=r.requestIdleCallback(e,{timeout:n});return()=>{var a;return(a=r.cancelIdleCallback)==null?void 0:a.call(r,t)}}const i=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(i)},Ge=()=>{const e=f.useRef(null),n=f.useRef(null),r=f.useRef(null),i=f.useRef(null),t=f.useRef(null),a=f.useRef({}),[l,d]=f.useState(ee),[$,u]=f.useState(!1);f.useEffect(()=>{const o=document.documentElement;if(o.dataset.videoReady==="true"){u(!0);return}const A=new MutationObserver(()=>{o.dataset.videoReady==="true"&&u(!0)});A.observe(o,{attributes:!0,attributeFilter:["data-video-ready"]});const m=window.setTimeout(()=>u(!0),3e3);return()=>{A.disconnect(),window.clearTimeout(m)}},[]);const Q=ue[l]??ue.en,R=me[l]??me.en;f.useEffect(()=>{const o=document.documentElement;d(ee());const A=new MutationObserver(()=>{d(ee())});return A.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>A.disconnect()},[]),f.useEffect(()=>{const o=e.current;if(!o)return;const A=re(),m=ze()&&!A,s={x:0,y:0,targetX:0,targetY:0};let w=0,M={vw:window.innerWidth,vh:window.innerHeight},x=null;const h=we,B=()=>{const p=A?0:Ye(w),{vw:z,vh:k}=M,C=A?1:1-G(w,.72,.98);h.forEach(v=>{const Y=a.current[v.id];if(!Y)return;const V=v.exit.x*z*p+s.x*34,Z=v.exit.y*k*p+s.y*22,O=1+(v.exit.scale-1)*p;Y.style.transform=`translate3d(${V.toFixed(1)}px, ${Z.toFixed(1)}px, 0) rotate(${v.rotate}deg) scale(${v.mirror?-O:O}, ${O})`,Y.style.setProperty("--leave",C.toFixed(3))});const U=n.current;if(U){const v=A?0:G(w,.3,.84),Y=A?0:w;U.style.transform=`translate3d(${(s.x*10).toFixed(1)}px, ${(s.y*8-Y*k*.05).toFixed(1)}px, 0) scale(${(1+.3*p).toFixed(3)})`,U.style.opacity=(1-v).toFixed(3)}const H=r.current;H&&(H.style.transform=`translate3d(${(s.x*14).toFixed(1)}px, ${(w*k*.07).toFixed(1)}px, 0) scale(${(1+.14*w).toFixed(3)})`,H.style.opacity=(A?1:1-G(w,.55,.98)).toFixed(3));const F=i.current;F&&(F.style.transform=`translate3d(${(s.x*6).toFixed(1)}px, 0, 0)`,F.style.opacity=(A?1:1-G(w,.55,.98)).toFixed(3));const J=t.current;J&&J.style.setProperty("--leave",C.toFixed(3))},j=he(o,p=>{w=p.pin,M={vw:p.viewport.vw,vh:p.viewport.vh},B()}),L=()=>{x=null,s.x+=(s.targetX-s.x)*.08,s.y+=(s.targetY-s.y)*.08,B(),(Math.abs(s.targetX-s.x)>.001||Math.abs(s.targetY-s.y)>.001)&&(x=window.requestAnimationFrame(L))},b=p=>{w>=1||(s.targetX=P(p.clientX/M.vw-.5,-.5,.5),s.targetY=P(p.clientY/M.vh-.5,-.5,.5),x===null&&(x=window.requestAnimationFrame(L)))};return m&&window.addEventListener("pointermove",b,{passive:!0}),()=>{j(),m&&window.removeEventListener("pointermove",b),x!==null&&window.cancelAnimationFrame(x)}},[]),f.useEffect(()=>{const o=t.current,A=e.current;if(!o||!A)return;const m=o.getContext("2d");if(!m)return;const s=re(),M=He()==="low"?14:$e()?42:22,x=Je(M),h=Math.min(window.devicePixelRatio||1,1.5);let B=0,j=0,L=!0,b=null,p=0,z=!1;const k=document.createElement("canvas");k.width=32,k.height=32;const C=k.getContext("2d");(()=>{if(!C)return;const g=C.createRadialGradient(16,16,0,16,16,16),I="255, 238, 196";g.addColorStop(0,`rgba(${I}, 1)`),g.addColorStop(.35,`rgba(${I}, 0.45)`),g.addColorStop(1,`rgba(${I}, 0)`),C.clearRect(0,0,32,32),C.fillStyle=g,C.fillRect(0,0,32,32)})();const H=()=>{B=o.clientWidth,j=o.clientHeight,o.width=Math.round(B*h),o.height=Math.round(j*h),m.setTransform(h,0,0,h,0,0)},F=g=>{m.clearRect(0,0,B,j);const I=g/1e3;x.forEach(S=>{const Qe=s?0:I*(.004+S.z*.01),Be=s?0:Math.sin(I*.6+S.phase)*.012,se=((S.x+Be)%1+1)%1*B,ke=s?0:p*S.z*.55;let q=S.y-Qe-ke;q=(q%1+1)%1*j;const Ce=.62-q/j*.24,ce=Math.max(0,1-Math.abs(se/B-Ce)/.09),Se=s?1:.75+.25*Math.sin(I*1.7+S.phase*3),X=(1.2+S.z*3.2)*(1+ce*.6);m.globalAlpha=Math.min(1,S.alpha*(.45+ce*1.1)*Se),m.drawImage(k,se-X,q-X,X*2,X*2)}),m.globalAlpha=1},J=g=>{b=null,F(g),L&&!document.hidden&&!s&&(b=window.requestAnimationFrame(J))},v=()=>{b===null&&L&&!document.hidden&&(b=window.requestAnimationFrame(J))},Y=he(A,g=>{p=g.pin}),V=new IntersectionObserver(([g])=>{L=g.isIntersecting,L&&z&&v()});V.observe(A);const Z=()=>{!document.hidden&&z&&v()};document.addEventListener("visibilitychange",Z);const O=()=>{H(),s&&z&&F(0)};window.addEventListener("resize",O);const Ee=Ne(()=>{z=!0,H(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),s?F(0):v()},2500);return()=>{Y(),V.disconnect(),document.removeEventListener("visibilitychange",Z),window.removeEventListener("resize",O),b!==null&&window.cancelAnimationFrame(b),Ee()}},[]);const y=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return c.jsxs(c.Fragment,{children:[c.jsx("a",{className:"cover-skip",href:"#home",children:R}),c.jsxs("div",{id:"cover",ref:e,className:"cover",children:[c.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[c.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),c.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[c.jsxs("div",{ref:r,className:"cover-mist",children:[c.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),c.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),c.jsx("div",{ref:i,className:"cover-shaft"}),c.jsx("canvas",{ref:t,className:"cover-pollen"})]}),c.jsxs("div",{ref:n,className:"cover-copy",children:[c.jsx("img",{alt:"Gábor Ulenius",src:N("profile-160.webp"),srcSet:`${N("profile-160.webp")} 160w, ${N("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),c.jsxs("h1",{id:"cover-heading",className:"cover-greeting",children:[Q," ",c.jsx("span",{id:"cover-name",children:"Gábor"})]})]}),c.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:we.map(o=>{const[A,m]=o.size,s=o.narrow??o.wide,w=N(`cover/${o.image}.webp`),x=`${N(`cover/${o.image}-sm.webp`)} ${Math.ceil(A/2)}w, ${w} ${A}w`;return c.jsxs("picture",{children:[o.wideOnly&&$?c.jsx("source",{media:"(min-width: 900px)",srcSet:x,sizes:`${o.wide.width}vw`}):null,c.jsx("img",{ref:h=>{a.current[o.id]=h,h!=null&&h.complete&&h.naturalWidth&&pe(h)},className:y(o),src:$&&!o.wideOnly?w:void 0,srcSet:$&&!o.wideOnly?x:void 0,sizes:`(max-width: 899.95px) ${s.width}vw, ${o.wide.width}vw`,width:A,height:m,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:h=>pe(h.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${s.x}%`,"--ny":`${s.y}%`,"--nw":`${s.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":m/A,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}})]},o.id)})})]}),c.jsx("style",{children:`
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
          color: ${T.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${Fe}") center / cover no-repeat;
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
          border: 3px solid ${T.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${T.bgDark};
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
          background: ${T.btnBg};
          color: ${T.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${T.accentHover};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cover { height: 100vh; height: 100lvh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--leaf { transition: none; }
          .cover-layer--leaf { animation: none; }
        }
      `})]})]})},Ue=te.lazy(()=>Le(()=>import("./AppShell-L7OrOkm_.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Ve=Re.createRoot(document.getElementById("root"));Ve.render(c.jsxs(te.StrictMode,{children:[c.jsx(Ge,{}),c.jsx(te.Suspense,{fallback:null,children:c.jsx(Ue,{})})]}));export{Le as _,N as a,fe as b,P as c,W as d,Xe as e,G as f,He as g,ze as h,$e as i,T as j,Ke as o,re as p,he as r,qe as s};
