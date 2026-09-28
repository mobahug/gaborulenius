const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-maKFRIoL.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-icons-fQrRj7E3.js","assets/vendor-mui-CXUgQPvW.js","assets/AppShell-7xabePIw.css"])))=>i.map(i=>d[i]);
import{r as f,j as A,a as te,d as Re}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const Me="modulepreload",je=function(e){return"/gaborulenius/"+e},Ae={},Le=function(n,r,i){let t=Promise.resolve();if(r&&r.length>0){let l=function(u){return Promise.all(u.map(b=>Promise.resolve(b).then(S=>({status:"fulfilled",value:S}),S=>({status:"rejected",reason:S}))))};document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),N=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));t=l(r.map(u=>{if(u=je(u),u in Ae)return;Ae[u]=!0;const b=u.endsWith(".css"),S=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${S}`))return;const g=document.createElement("link");if(g.rel=b?"stylesheet":Me,b||(g.as="script"),g.crossOrigin="",g.href=u,N&&g.setAttribute("nonce",N),document.head.appendChild(g),b)return new Promise((o,c)=>{g.addEventListener("load",o),g.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(l){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=l,window.dispatchEvent(h),!h.defaultPrevented)throw l}return t.then(l=>{for(const h of l||[])h.status==="rejected"&&a(h.reason);return n().catch(a)})},T={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},D=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Fe="data:image/jpeg;base64,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",Y=(e,n=0,r=1)=>Math.min(r,Math.max(n,e)),O=(e,n,r)=>r===n?e>=r?1:0:Y((e-n)/(r-n)),qe=(e,n,r)=>{const i=O(r,e,n);return i*i*(3-2*i)},Xe=e=>1-Math.pow(1-e,3),Ye=e=>e*e*e,Ie="(prefers-reduced-motion: reduce)",Pe="(min-width: 900px)",We="(hover: hover) and (pointer: fine)",K=e=>typeof window<"u"&&window.matchMedia(e).matches,re=()=>K(Ie),$e=()=>K(Pe),ze=()=>K(We),He=()=>{var a;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,r=e.deviceMemory??8,i=K("(pointer: coarse)"),t=Math.min(window.screen.width,window.screen.height)<820;return(a=e.connection)!=null&&a.saveData||i&&t||r<=2||n<=2?"low":i||r<=4||n<=4?"medium":"high"},ne=new Set,oe=new Set;let ie=null,le=!1;const Te=.09;let y=null,_=0;const ve=e=>typeof e=="function"?e():e;let J=null,ae=0;const fe=()=>{J||(J=document.createElement("div"),J.setAttribute("aria-hidden","true"),J.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(J)),ae=J.offsetHeight||window.innerHeight},ge=()=>{ae||fe();const e=window.scrollY;return{y:e,smoothY:y??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:ae,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},de=()=>{fe(),I()},De=(e,n)=>{const r=performance.now(),i=r-_>100?1/60:(r-_)/1e3;return _=r,y===null||Math.abs(e-y)>n*1.5||re()?y=e:(y+=(e-y)*(1-Math.exp(-i/Te)),Math.abs(e-y)<.5&&(y=e)),y},xe=(e,n,r)=>{const{smoothY:i,vh:t}=e;return{viewport:e,top:n,height:r,pin:Y((i-n)/Math.max(1,r-t)),pass:Y((i+t-n)/Math.max(1,r+t)),enter:Y((i+t-n)/Math.max(1,t)),exit:Y((i-(n+r-t))/Math.max(1,t)),near:i+2*t>n&&i-t<n+r}},ye=(e,n)=>{const r=e.getBoundingClientRect();return{top:r.top+n.y,height:r.height}},Je=()=>{ie=null;const e=ge(),n={...e,smoothY:De(e.y,e.vh)},r=[];ne.forEach(i=>{const t=ve(i.target);if(!t)return;const{top:a,height:l}=ye(t,n);r.push([i,a,l])}),r.forEach(([i,t,a])=>{i.callback(xe(n,t,a))}),oe.forEach(i=>i(n)),n.smoothY!==n.y&&I()},I=()=>{ie!==null||typeof window>"u"||(ie=window.requestAnimationFrame(Je))},be=()=>{le||typeof window>"u"||(le=!0,window.addEventListener("scroll",I,{passive:!0}),window.addEventListener("resize",de),window.addEventListener("orientationchange",de),window.addEventListener("load",I),"ResizeObserver"in window&&new ResizeObserver(I).observe(document.documentElement))},he=(e,n)=>{be();const r={target:e,callback:n};ne.add(r);const i=ve(e);if(i){const t=ge(),{top:a,height:l}=ye(i,t);n(xe(t,a,l))}return I(),()=>{ne.delete(r)}},Ke=e=>(be(),oe.add(e),I(),()=>{oe.delete(e)}),ue={en:"Hi, I'm Gábor",fi:"Hei, olen Gábor"},me={en:"Skip to content",fi:"Siirry sisältöön"},ee=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",we=[{id:"banana-high",image:"banana-high",size:[522,1388],origin:[.567,.959],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15.9},narrow:{x:-6,y:-3,width:32},breathe:[1.3,1.012,9.5,-3]},{id:"palm-high",image:"palm-high",size:[920,1120],origin:[.324,.962],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34.8},narrow:{x:104,y:-4,width:71.6},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[934,1274],origin:[.5,.617],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:31.1},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[1181,1262],origin:[.454,.739],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:28.5},narrow:{x:6,y:100,width:73.9},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[573,1348],origin:[.101,.96],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:16.4},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[674,854],origin:[.5,.73],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:35.8},narrow:{x:96,y:108,width:77.9},breathe:[1.4,1.018,7,-5]}],pe=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},Ne=e=>Array.from({length:e},(n,r)=>{const i=Math.sin(r*12.9898)*43758.5453,t=a=>{const l=Math.sin(i+a*78.233)*43758.5453;return l-Math.floor(l)};return{x:t(1),y:t(2),z:.25+t(3)*.75,phase:t(4)*Math.PI*2,alpha:.3+t(5)*.6}}),Ge=(e,n)=>{const r=window;if(r.requestIdleCallback){const t=r.requestIdleCallback(e,{timeout:n});return()=>{var a;return(a=r.cancelIdleCallback)==null?void 0:a.call(r,t)}}const i=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(i)},Oe=()=>{const e=f.useRef(null),n=f.useRef(null),r=f.useRef(null),i=f.useRef(null),t=f.useRef(null),a=f.useRef({}),[l,h]=f.useState(ee),[N,u]=f.useState(!1);f.useEffect(()=>{const o=document.documentElement;if(o.dataset.videoReady==="true"){u(!0);return}const c=new MutationObserver(()=>{o.dataset.videoReady==="true"&&u(!0)});c.observe(o,{attributes:!0,attributeFilter:["data-video-ready"]});const m=window.setTimeout(()=>u(!0),3e3);return()=>{c.disconnect(),window.clearTimeout(m)}},[]);const b=ue[l]??ue.en,S=me[l]??me.en;f.useEffect(()=>{const o=document.documentElement;h(ee());const c=new MutationObserver(()=>{h(ee())});return c.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>c.disconnect()},[]),f.useEffect(()=>{const o=e.current;if(!o)return;const c=re(),m=ze()&&!c,s={x:0,y:0,targetX:0,targetY:0};let d=0,P={vw:window.innerWidth,vh:window.innerHeight},E=null;const W=we,Q=()=>{const w=c?0:Ye(d),{vw:$,vh:B}=P,k=c?1:1-O(d,.72,.98);W.forEach(p=>{const L=a.current[p.id];if(!L)return;const V=p.exit.x*$*w+s.x*34,Z=p.exit.y*B*w+s.y*22,H=1+(p.exit.scale-1)*w;L.style.transform=`translate3d(${V.toFixed(1)}px, ${Z.toFixed(1)}px, 0) rotate(${p.rotate}deg) scale(${p.mirror?-H:H}, ${H})`,L.style.setProperty("--leave",k.toFixed(3))});const U=n.current;if(U){const p=c?0:O(d,.3,.84),L=c?0:d;U.style.transform=`translate3d(${(s.x*10).toFixed(1)}px, ${(s.y*8-L*B*.05).toFixed(1)}px, 0) scale(${(1+.3*w).toFixed(3)})`,U.style.opacity=(1-p).toFixed(3)}const z=r.current;z&&(z.style.transform=`translate3d(${(s.x*14).toFixed(1)}px, ${(d*B*.07).toFixed(1)}px, 0) scale(${(1+.14*d).toFixed(3)})`,z.style.opacity=(c?1:1-O(d,.55,.98)).toFixed(3));const j=i.current;j&&(j.style.transform=`translate3d(${(s.x*6).toFixed(1)}px, 0, 0)`,j.style.opacity=(c?1:1-O(d,.55,.98)).toFixed(3));const G=t.current;G&&G.style.setProperty("--leave",k.toFixed(3))},R=he(o,w=>{d=w.pin,P={vw:w.viewport.vw,vh:w.viewport.vh},Q()}),M=()=>{E=null,s.x+=(s.targetX-s.x)*.08,s.y+=(s.targetY-s.y)*.08,Q(),(Math.abs(s.targetX-s.x)>.001||Math.abs(s.targetY-s.y)>.001)&&(E=window.requestAnimationFrame(M))},x=w=>{d>=1||(s.targetX=Y(w.clientX/P.vw-.5,-.5,.5),s.targetY=Y(w.clientY/P.vh-.5,-.5,.5),E===null&&(E=window.requestAnimationFrame(M)))};return m&&window.addEventListener("pointermove",x,{passive:!0}),()=>{R(),m&&window.removeEventListener("pointermove",x),E!==null&&window.cancelAnimationFrame(E)}},[]),f.useEffect(()=>{const o=t.current,c=e.current;if(!o||!c)return;const m=o.getContext("2d");if(!m)return;const s=re(),P=He()==="low"?14:$e()?42:22,E=Ne(P),W=Math.min(window.devicePixelRatio||1,1.5);let Q=0,R=0,M=!0,x=null,w=0,$=!1;const B=document.createElement("canvas");B.width=32,B.height=32;const k=B.getContext("2d");(()=>{if(!k)return;const v=k.createRadialGradient(16,16,0,16,16,16),F="255, 238, 196";v.addColorStop(0,`rgba(${F}, 1)`),v.addColorStop(.35,`rgba(${F}, 0.45)`),v.addColorStop(1,`rgba(${F}, 0)`),k.clearRect(0,0,32,32),k.fillStyle=v,k.fillRect(0,0,32,32)})();const z=()=>{Q=o.clientWidth,R=o.clientHeight,o.width=Math.round(Q*W),o.height=Math.round(R*W),m.setTransform(W,0,0,W,0,0)},j=v=>{m.clearRect(0,0,Q,R);const F=v/1e3;E.forEach(C=>{const Qe=s?0:F*(.004+C.z*.01),Be=s?0:Math.sin(F*.6+C.phase)*.012,se=((C.x+Be)%1+1)%1*Q,ke=s?0:w*C.z*.55;let q=C.y-Qe-ke;q=(q%1+1)%1*R;const Ce=.62-q/R*.24,ce=Math.max(0,1-Math.abs(se/Q-Ce)/.09),Se=s?1:.75+.25*Math.sin(F*1.7+C.phase*3),X=(1.2+C.z*3.2)*(1+ce*.6);m.globalAlpha=Math.min(1,C.alpha*(.45+ce*1.1)*Se),m.drawImage(B,se-X,q-X,X*2,X*2)}),m.globalAlpha=1},G=v=>{x=null,j(v),M&&!document.hidden&&!s&&(x=window.requestAnimationFrame(G))},p=()=>{x===null&&M&&!document.hidden&&(x=window.requestAnimationFrame(G))},L=he(c,v=>{w=v.pin}),V=new IntersectionObserver(([v])=>{M=v.isIntersecting,M&&$&&p()});V.observe(c);const Z=()=>{!document.hidden&&$&&p()};document.addEventListener("visibilitychange",Z);const H=()=>{z(),s&&$&&j(0)};window.addEventListener("resize",H);const Ee=Ge(()=>{$=!0,z(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),s?j(0):p()},2500);return()=>{L(),V.disconnect(),document.removeEventListener("visibilitychange",Z),window.removeEventListener("resize",H),x!==null&&window.cancelAnimationFrame(x),Ee()}},[]);const g=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return A.jsxs(A.Fragment,{children:[A.jsx("a",{className:"cover-skip",href:"#home",children:S}),A.jsxs("div",{id:"cover",ref:e,className:"cover",children:[A.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[A.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),A.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[A.jsxs("div",{ref:r,className:"cover-mist",children:[A.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),A.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),A.jsx("div",{ref:i,className:"cover-shaft"}),A.jsx("canvas",{ref:t,className:"cover-pollen"})]}),A.jsxs("div",{ref:n,className:"cover-copy",children:[A.jsx("img",{alt:"Gábor Ulenius",src:D("profile-160.webp"),srcSet:`${D("profile-160.webp")} 160w, ${D("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),A.jsx("h1",{id:"cover-heading",className:"cover-greeting",children:b})]}),A.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:we.map(o=>{const[c,m]=o.size,s=o.narrow??o.wide;return A.jsx("img",{ref:d=>{a.current[o.id]=d,d!=null&&d.complete&&d.naturalWidth&&pe(d)},className:g(o),src:N?D(`cover/${o.image}.webp`):void 0,srcSet:N?`${D(`cover/${o.image}-sm.webp`)} ${Math.ceil(c/2)}w, ${D(`cover/${o.image}.webp`)} ${c}w`:void 0,sizes:`(max-width: 899.95px) ${s.width}vw, ${o.wide.width}vw`,width:c,height:m,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:d=>pe(d.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${s.x}%`,"--ny":`${s.y}%`,"--nw":`${s.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":m/c,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}},o.id)})})]}),A.jsx("style",{children:`
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
      `})]})]})},Ue=te.lazy(()=>Le(()=>import("./AppShell-maKFRIoL.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Ve=Re.createRoot(document.getElementById("root"));Ve.render(A.jsxs(te.StrictMode,{children:[A.jsx(Oe,{}),A.jsx(te.Suspense,{fallback:null,children:A.jsx(Ue,{})})]}));export{Le as _,D as a,ge as b,Y as c,I as d,Xe as e,O as f,He as g,ze as h,$e as i,T as j,Ke as o,re as p,he as r,qe as s};
