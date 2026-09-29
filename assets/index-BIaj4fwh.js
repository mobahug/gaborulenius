const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-BCDmgD2K.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-icons-fQrRj7E3.js","assets/vendor-mui-CXUgQPvW.js","assets/AppShell-CthMMC15.css"])))=>i.map(i=>d[i]);
import{r as p,j as c,a as ae,d as $e}from"./vendor-react-CptINutj.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const A of a.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&i(A)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const ze="modulepreload",De=function(e){return"/gaborulenius/"+e},we={},Te=function(r,t,i){let n=Promise.resolve();if(t&&t.length>0){let A=function(u){return Promise.all(u.map(B=>Promise.resolve(B).then(R=>({status:"fulfilled",value:R}),R=>({status:"rejected",reason:R}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),D=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));n=A(t.map(u=>{if(u=De(u),u in we)return;we[u]=!0;const B=u.endsWith(".css"),R=B?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${R}`))return;const y=document.createElement("link");if(y.rel=B?"stylesheet":ze,B||(y.as="script"),y.crossOrigin="",y.href=u,D&&y.setAttribute("nonce",D),document.head.appendChild(y),B)return new Promise((o,l)=>{y.addEventListener("load",o),y.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(A){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=A,window.dispatchEvent(d),!d.defaultPrevented)throw A}return n.then(A=>{for(const d of A||[])d.status==="rejected"&&a(d.reason);return r().catch(a)})},G={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},V=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Oe="data:image/jpeg;base64,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",H=(e,r=0,t=1)=>Math.min(t,Math.max(r,e)),q=(e,r,t)=>t===r?e>=t?1:0:H((e-r)/(t-r)),dt=(e,r,t)=>{const i=q(t,e,r);return i*i*(3-2*i)},ht=e=>1-Math.pow(1-e,3),Ne=e=>e*e*e,Ge="(prefers-reduced-motion: reduce)",Je="(min-width: 900px)",Ue="(hover: hover) and (pointer: fine)",ne=e=>typeof window<"u"&&window.matchMedia(e).matches,re=()=>ne(Ge),Ve=()=>ne(Je),Be=()=>ne(Ue),qe=()=>{var a;if(typeof window>"u")return"medium";const e=navigator,r=e.hardwareConcurrency??4,t=e.deviceMemory??8,i=ne("(pointer: coarse)"),n=Math.min(window.screen.width,window.screen.height)<820;return(a=e.connection)!=null&&a.saveData||i&&n||t<=2||r<=2?"low":i||t<=4||r<=4?"medium":"high"},Ze=.12;let L=0,$=0,Q=0,se=0;const Xe=()=>L!==0,Ke=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),_e=e=>e.deltaMode===1?e.deltaY*40:e.deltaMode===2?e.deltaY*window.innerHeight:e.deltaY,et=(e,r)=>{let t=e instanceof Element?e:null;for(;t&&t!==document.body&&t!==document.documentElement;){if(t instanceof HTMLElement&&t.scrollHeight>t.clientHeight){const{overflowY:i}=getComputedStyle(t);if((i==="auto"||i==="scroll")&&(r<0?t.scrollTop>0:t.scrollTop+t.clientHeight<t.scrollHeight-1))return!0}t=t.parentElement}return!1},he=()=>{cancelAnimationFrame(L),L=0},Se=e=>{const r=Math.min(.05,(e-se)/1e3);se=e,Q+=($-Q)*(1-Math.exp(-r/Ze)),Math.abs($-Q)<.5&&(Q=$),window.scrollTo({top:Q,behavior:"instant"}),L=Q===$?0:requestAnimationFrame(Se)},fe=e=>{if(e.defaultPrevented||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||document.body.style.overflow==="hidden")return;const r=_e(e);!r||et(e.target,r)||(e.preventDefault(),L||(Q=window.scrollY,$=Q,se=performance.now(),L=requestAnimationFrame(Se)),$=Math.max(0,Math.min(Ke(),$+r)))},pe=()=>{L&&Math.abs(window.scrollY-Q)>2&&he()},te=()=>{L&&he()},ut=()=>{p.useEffect(()=>{if(!(!Be()||re()))return window.addEventListener("wheel",fe,{passive:!1}),window.addEventListener("scroll",pe,{passive:!0}),window.addEventListener("pointerdown",te,!0),window.addEventListener("keydown",te,!0),()=>{he(),window.removeEventListener("wheel",fe),window.removeEventListener("scroll",pe),window.removeEventListener("pointerdown",te,!0),window.removeEventListener("keydown",te,!0)}},[])},ce=new Set,le=new Set;let Ae=null,ve=!1;const tt=.09,rt=.02;let E=null,oe=0;const Me=e=>typeof e=="function"?e():e;let J=null,de=0;const ke=()=>{J||(J=document.createElement("div"),J.setAttribute("aria-hidden","true"),J.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(J)),de=J.offsetHeight||window.innerHeight},Ce=()=>{de||ke();const e=window.scrollY;return{y:e,smoothY:E??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:de,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},ge=()=>{ke(),z()},nt=(e,r)=>{const t=performance.now(),i=t-oe>100?1/60:(t-oe)/1e3;if(oe=t,E===null||Math.abs(e-E)>r*1.5||re())E=e;else{const n=Xe()?rt:tt;E+=(e-E)*(1-Math.exp(-i/n)),Math.abs(e-E)<.5&&(E=e)}return E},Le=(e,r,t)=>{const{smoothY:i,vh:n}=e;return{viewport:e,top:r,height:t,pin:H((i-r)/Math.max(1,t-n)),pass:H((i+n-r)/Math.max(1,t+n)),enter:H((i+n-r)/Math.max(1,n)),exit:H((i-(r+t-n))/Math.max(1,n)),near:i+2*n>r&&i-n<r+t}},Re=(e,r)=>{const t=e.getBoundingClientRect();return{top:t.top+r.y,height:t.height}},ot=()=>{Ae=null;const e=Ce(),r={...e,smoothY:nt(e.y,e.vh)},t=[];ce.forEach(i=>{const n=Me(i.target);if(!n)return;const{top:a,height:A}=Re(n,r);t.push([i,a,A])}),t.forEach(([i,n,a])=>{i.callback(Le(r,n,a))}),le.forEach(i=>i(r)),r.smoothY!==r.y&&z()},z=()=>{Ae!==null||typeof window>"u"||(Ae=window.requestAnimationFrame(ot))},Ye=()=>{ve||typeof window>"u"||(ve=!0,window.addEventListener("scroll",z,{passive:!0}),window.addEventListener("resize",ge),window.addEventListener("orientationchange",ge),window.addEventListener("load",z),"ResizeObserver"in window&&new ResizeObserver(z).observe(document.documentElement))},xe=(e,r)=>{Ye();const t={target:e,callback:r};ce.add(t);const i=Me(e);if(i){const n=Ce(),{top:a,height:A}=Re(i,n);r(Le(n,a,A))}return z(),()=>{ce.delete(t)}},mt=e=>(Ye(),le.add(e),z(),()=>{le.delete(e)}),ye={en:"Hi, I'm",fi:"Hei, olen"},be={en:"Skip to content",fi:"Siirry sisältöön"},ie=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",Ee=[{id:"banana-high",image:"banana-high",size:[365,972],origin:[.567,.959],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15.9},narrow:{x:-6,y:-3,width:32},breathe:[1.3,1.012,9.5,-3]},{id:"palm-high",image:"palm-high",size:[644,784],origin:[.324,.962],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34.8},narrow:{x:104,y:-4,width:71.6},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[654,892],origin:[.5,.617],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:31.1},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[827,883],origin:[.454,.739],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:28.5},narrow:{x:6,y:100,width:73.9},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[401,944],origin:[.101,.96],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:16.4},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[472,598],origin:[.5,.73],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:35.8},narrow:{x:96,y:108,width:77.9},breathe:[1.4,1.018,7,-5]}],Qe=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},it=e=>Array.from({length:e},(r,t)=>{const i=Math.sin(t*12.9898)*43758.5453,n=a=>{const A=Math.sin(i+a*78.233)*43758.5453;return A-Math.floor(A)};return{x:n(1),y:n(2),z:.25+n(3)*.75,phase:n(4)*Math.PI*2,alpha:.3+n(5)*.6}}),at=(e,r)=>{const t=window;if(t.requestIdleCallback){const n=t.requestIdleCallback(e,{timeout:r});return()=>{var a;return(a=t.cancelIdleCallback)==null?void 0:a.call(t,n)}}const i=window.setTimeout(e,Math.min(r,1200));return()=>window.clearTimeout(i)},st=()=>{const e=p.useRef(null),r=p.useRef(null),t=p.useRef(null),i=p.useRef(null),n=p.useRef(null),a=p.useRef({}),[A,d]=p.useState(ie),[D,u]=p.useState(!1);p.useEffect(()=>{const o=document.documentElement;if(o.dataset.videoReady==="true"){u(!0);return}const l=new MutationObserver(()=>{o.dataset.videoReady==="true"&&u(!0)});l.observe(o,{attributes:!0,attributeFilter:["data-video-ready"]});const m=window.setTimeout(()=>u(!0),3e3);return()=>{l.disconnect(),window.clearTimeout(m)}},[]);const B=ye[A]??ye.en,R=be[A]??be.en;p.useEffect(()=>{const o=document.documentElement;d(ie());const l=new MutationObserver(()=>{d(ie())});return l.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>l.disconnect()},[]),p.useEffect(()=>{const o=e.current;if(!o)return;const l=re(),m=Be()&&!l,s={x:0,y:0,targetX:0,targetY:0};let w=0,Y={vw:window.innerWidth,vh:window.innerHeight},x=null;const h=Ee,S=()=>{const f=l?0:Ne(w),{vw:T,vh:M}=Y,k=l?1:1-q(w,.72,.98);h.forEach(v=>{const P=a.current[v.id];if(!P)return;const X=v.exit.x*T*f+s.x*34,K=v.exit.y*M*f+s.y*22,N=1+(v.exit.scale-1)*f;P.style.transform=`translate3d(${X.toFixed(1)}px, ${K.toFixed(1)}px, 0) rotate(${v.rotate}deg) scale(${v.mirror?-N:N}, ${N})`,P.style.setProperty("--leave",k.toFixed(3))});const Z=r.current;if(Z){const v=l?0:q(w,.3,.84),P=l?0:w;Z.style.transform=`translate3d(${(s.x*10).toFixed(1)}px, ${(s.y*8-P*M*.05).toFixed(1)}px, 0) scale(${(1+.3*f).toFixed(3)})`,Z.style.opacity=(1-v).toFixed(3)}const O=t.current;O&&(O.style.transform=`translate3d(${(s.x*14).toFixed(1)}px, ${(w*M*.07).toFixed(1)}px, 0) scale(${(1+.14*w).toFixed(3)})`,O.style.opacity=(l?1:1-q(w,.55,.98)).toFixed(3));const I=i.current;I&&(I.style.transform=`translate3d(${(s.x*6).toFixed(1)}px, 0, 0)`,I.style.opacity=(l?1:1-q(w,.55,.98)).toFixed(3));const U=n.current;U&&U.style.setProperty("--leave",k.toFixed(3))},j=xe(o,f=>{w=f.pin,Y={vw:f.viewport.vw,vh:f.viewport.vh},S()}),F=()=>{x=null,s.x+=(s.targetX-s.x)*.08,s.y+=(s.targetY-s.y)*.08,S(),(Math.abs(s.targetX-s.x)>.001||Math.abs(s.targetY-s.y)>.001)&&(x=window.requestAnimationFrame(F))},b=f=>{w>=1||(s.targetX=H(f.clientX/Y.vw-.5,-.5,.5),s.targetY=H(f.clientY/Y.vh-.5,-.5,.5),x===null&&(x=window.requestAnimationFrame(F)))};return m&&window.addEventListener("pointermove",b,{passive:!0}),()=>{j(),m&&window.removeEventListener("pointermove",b),x!==null&&window.cancelAnimationFrame(x)}},[]),p.useEffect(()=>{const o=n.current,l=e.current;if(!o||!l)return;const m=o.getContext("2d");if(!m)return;const s=re(),Y=qe()==="low"?14:Ve()?42:22,x=it(Y),h=Math.min(window.devicePixelRatio||1,1.5);let S=0,j=0,F=!0,b=null,f=0,T=!1;const M=document.createElement("canvas");M.width=32,M.height=32;const k=M.getContext("2d");(()=>{if(!k)return;const g=k.createRadialGradient(16,16,0,16,16,16),W="255, 238, 196";g.addColorStop(0,`rgba(${W}, 1)`),g.addColorStop(.35,`rgba(${W}, 0.45)`),g.addColorStop(1,`rgba(${W}, 0)`),k.clearRect(0,0,32,32),k.fillStyle=g,k.fillRect(0,0,32,32)})();const O=()=>{S=o.clientWidth,j=o.clientHeight,o.width=Math.round(S*h),o.height=Math.round(j*h),m.setTransform(h,0,0,h,0,0)},I=g=>{m.clearRect(0,0,S,j);const W=g/1e3;x.forEach(C=>{const Fe=s?0:W*(.004+C.z*.01),Ie=s?0:Math.sin(W*.6+C.phase)*.012,ue=((C.x+Ie)%1+1)%1*S,Pe=s?0:f*C.z*.55;let _=C.y-Fe-Pe;_=(_%1+1)%1*j;const We=.62-_/j*.24,me=Math.max(0,1-Math.abs(ue/S-We)/.09),He=s?1:.75+.25*Math.sin(W*1.7+C.phase*3),ee=(1.2+C.z*3.2)*(1+me*.6);m.globalAlpha=Math.min(1,C.alpha*(.45+me*1.1)*He),m.drawImage(M,ue-ee,_-ee,ee*2,ee*2)}),m.globalAlpha=1},U=g=>{b=null,I(g),F&&!document.hidden&&!s&&(b=window.requestAnimationFrame(U))},v=()=>{b===null&&F&&!document.hidden&&(b=window.requestAnimationFrame(U))},P=xe(l,g=>{f=g.pin}),X=new IntersectionObserver(([g])=>{F=g.isIntersecting,F&&T&&v()});X.observe(l);const K=()=>{!document.hidden&&T&&v()};document.addEventListener("visibilitychange",K);const N=()=>{O(),s&&T&&I(0)};window.addEventListener("resize",N);const je=at(()=>{T=!0,O(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),s?I(0):v()},2500);return()=>{P(),X.disconnect(),document.removeEventListener("visibilitychange",K),window.removeEventListener("resize",N),b!==null&&window.cancelAnimationFrame(b),je()}},[]);const y=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return c.jsxs(c.Fragment,{children:[c.jsx("a",{className:"cover-skip",href:"#home",children:R}),c.jsxs("div",{id:"cover",ref:e,className:"cover",children:[c.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[c.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),c.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[c.jsxs("div",{ref:t,className:"cover-mist",children:[c.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),c.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),c.jsx("div",{ref:i,className:"cover-shaft"}),c.jsx("canvas",{ref:n,className:"cover-pollen"})]}),c.jsxs("div",{ref:r,className:"cover-copy",children:[c.jsx("img",{alt:"Gábor Ulenius",src:V("profile-160.webp"),srcSet:`${V("profile-160.webp")} 160w, ${V("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),c.jsxs("h1",{id:"cover-heading",className:"cover-greeting",children:[B," ",c.jsx("span",{id:"cover-name",children:"Gábor"})]})]}),c.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:Ee.map(o=>{const[l,m]=o.size,s=o.narrow??o.wide,w=V(`cover/${o.image}.webp`),x=`${V(`cover/${o.image}-sm.webp`)} ${Math.ceil(l/2)}w, ${w} ${l}w`;return c.jsxs("picture",{children:[o.wideOnly&&D?c.jsx("source",{media:"(min-width: 900px)",srcSet:x,sizes:`${o.wide.width}vw`}):null,c.jsx("img",{ref:h=>{a.current[o.id]=h,h!=null&&h.complete&&h.naturalWidth&&Qe(h)},className:y(o),src:D&&!o.wideOnly?w:void 0,srcSet:D&&!o.wideOnly?x:void 0,sizes:`(max-width: 899.95px) ${s.width}vw, ${o.wide.width}vw`,width:l,height:m,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:h=>Qe(h.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${s.x}%`,"--ny":`${s.y}%`,"--nw":`${s.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":m/l,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}})]},o.id)})})]}),c.jsx("style",{children:`
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
          color: ${G.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${Oe}") center / cover no-repeat;
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
          border: 3px solid ${G.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${G.bgDark};
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
          background: ${G.btnBg};
          color: ${G.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${G.accentHover};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cover { height: 100vh; height: 100lvh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--leaf { transition: none; }
          .cover-layer--leaf { animation: none; }
        }
      `})]})]})},ct=ae.lazy(()=>Te(()=>import("./AppShell-BCDmgD2K.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const lt=$e.createRoot(document.getElementById("root"));lt.render(c.jsxs(ae.StrictMode,{children:[c.jsx(st,{}),c.jsx(ae.Suspense,{fallback:null,children:c.jsx(ct,{})})]}));export{Te as _,V as a,Ce as b,H as c,z as d,ht as e,q as f,qe as g,Be as h,Ve as i,G as j,mt as o,re as p,xe as r,dt as s,ut as u};
