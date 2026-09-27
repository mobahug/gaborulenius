const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-DFtATy3V.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-D-aHolcH.js","assets/vendor-mui-icons-qg0lJM8U.js","assets/AppShell-G2cHLFfm.css"])))=>i.map(i=>d[i]);
import{r as f,j as A,a as te,d as ze}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const Ie="modulepreload",Oe=function(e){return"/gaborulenius/"+e},Ae={},Ce=function(n,r,i){let t=Promise.resolve();if(r&&r.length>0){let d=function(u){return Promise.all(u.map(y=>Promise.resolve(y).then(M=>({status:"fulfilled",value:M}),M=>({status:"rejected",reason:M}))))};document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),Y=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));t=d(r.map(u=>{if(u=Oe(u),u in Ae)return;Ae[u]=!0;const y=u.endsWith(".css"),M=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${M}`))return;const p=document.createElement("link");if(p.rel=y?"stylesheet":Ie,y||(p.as="script"),p.crossOrigin="",p.href=u,Y&&p.setAttribute("nonce",Y),document.head.appendChild(p),y)return new Promise((o,c)=>{p.addEventListener("load",o),p.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(d){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=d,window.dispatchEvent(h),!h.defaultPrevented)throw d}return t.then(d=>{for(const h of d||[])h.status==="rejected"&&a(h.reason);return n().catch(a)})},Q={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},U=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Le="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAbADADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAwQFBgL/xAAtEAABAwIFAgUDBQAAAAAAAAABAgMRAAQFEiExQRNRIjJhcYEGI6EUkcHR4f/EABkBAAIDAQAAAAAAAAAAAAAAAAEEAgMFBv/EAB8RAAIBBAIDAAAAAAAAAAAAAAABAgMEERIVMSFB8P/aAAwDAQACEQMRAD8AiKxW5uTC3iW/U7fHNBReXGU5Vz2yyKC0yta95B/FUWMNbbH3FgzxH9VgQo79HVTvI0vGDuxvcVVH6fqqKTuAAP3oyvq3E8Jch5txJ2+4jQ+xO9Du75dtbuIaStZabKum35lRpA7b8f4ULO4exK1Q3f2y0pWCQl0apgx78zrr76UwrWAnyKlLE4JopXH1wnELNLF02kCJJT39qh2jqW7e4SH0kFRKQDAOnauMRwRkMOLazIWBKQDpprrWcbuFJOpqSt8J4K6lK1uOlq/vRsrBI60g/PAqrEJlKMyoE5RsNgD8wD6CoNmohcjmatMNpWpIVJHi0kxpNGgsIquXmQs8x1SlwdRCwYzoGm2kHSD7fjahJSppfjK1qjNmUAVd9ZJMa803boS9cPFaQS35SBG/fv8ANJCHcPU6sAqCso4AieNp03pgU1JmMXrgtfCZCyE9SdCe3rSmCYOl7LcvkKQfKn+TUXEHXH8RJdUVkKKBPABIAFbTDEpTh7IAgZRRmtUShVbWqP/Z",$=(e,n=0,r=1)=>Math.min(r,Math.max(n,e)),q=(e,n,r)=>r===n?e>=r?1:0:$((e-n)/(r-n)),_e=(e,n,r)=>{const i=q(r,e,n);return i*i*(3-2*i)},Ge=e=>1-Math.pow(1-e,3),$e=e=>e*e*e,je="(prefers-reduced-motion: reduce)",De="(min-width: 900px)",ke="(hover: hover) and (pointer: fine)",Z=e=>typeof window<"u"&&window.matchMedia(e).matches,re=()=>Z(je),Pe=()=>Z(De),Ne=()=>Z(ke),He=()=>{var a;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,r=e.deviceMemory??8,i=Z("(pointer: coarse)"),t=Math.min(window.screen.width,window.screen.height)<820;return(a=e.connection)!=null&&a.saveData||i&&t||r<=2||n<=2?"low":i||r<=4||n<=4?"medium":"high"},ne=new Set,oe=new Set;let ie=null,de=!1;const Qe=.09;let b=null,X=0;const we=e=>typeof e=="function"?e():e;let T=null,ae=0;const fe=()=>{T||(T=document.createElement("div"),T.setAttribute("aria-hidden","true"),T.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(T)),ae=T.offsetHeight||window.innerHeight},pe=()=>{ae||fe();const e=window.scrollY;return{y:e,smoothY:b??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:ae,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},le=()=>{fe(),j()},Ue=(e,n)=>{const r=performance.now(),i=r-X>100?1/60:(r-X)/1e3;return X=r,b===null||Math.abs(e-b)>n*1.5||re()?b=e:(b+=(e-b)*(1-Math.exp(-i/Qe)),Math.abs(e-b)<.5&&(b=e)),b},xe=(e,n,r)=>{const{smoothY:i,vh:t}=e;return{viewport:e,top:n,height:r,pin:$((i-n)/Math.max(1,r-t)),pass:$((i+t-n)/Math.max(1,r+t)),enter:$((i+t-n)/Math.max(1,t)),exit:$((i-(n+r-t))/Math.max(1,t)),near:i+2*t>n&&i-t<n+r}},be=(e,n)=>{const r=e.getBoundingClientRect();return{top:r.top+n.y,height:r.height}},Te=()=>{ie=null;const e=pe(),n={...e,smoothY:Ue(e.y,e.vh)},r=[];ne.forEach(i=>{const t=we(i.target);if(!t)return;const{top:a,height:d}=be(t,n);r.push([i,a,d])}),r.forEach(([i,t,a])=>{i.callback(xe(n,t,a))}),oe.forEach(i=>i(n)),n.smoothY!==n.y&&j()},j=()=>{ie!==null||typeof window>"u"||(ie=window.requestAnimationFrame(Te))},ye=()=>{de||typeof window>"u"||(de=!0,window.addEventListener("scroll",j,{passive:!0}),window.addEventListener("resize",le),window.addEventListener("orientationchange",le),window.addEventListener("load",j),"ResizeObserver"in window&&new ResizeObserver(j).observe(document.documentElement))},he=(e,n)=>{ye();const r={target:e,callback:n};ne.add(r);const i=we(e);if(i){const t=pe(),{top:a,height:d}=be(i,t);n(xe(t,a,d))}return j(),()=>{ne.delete(r)}},Ze=e=>(ye(),oe.add(e),j(),()=>{oe.delete(e)}),ue={en:"Hi, I'm Gábor",fi:"Hei, olen Gábor"},me={en:"Skip to content",fi:"Siirry sisältöön"},ee=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",ve=[{id:"banana-high",image:"banana-high",size:[522,1388],origin:[.567,.959],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15.9},narrow:{x:-6,y:-3,width:32},breathe:[1.3,1.012,9.5,-3]},{id:"palm-high",image:"palm-high",size:[920,1120],origin:[.324,.962],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34.8},narrow:{x:104,y:-4,width:71.6},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[934,1274],origin:[.5,.617],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:31.1},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[1181,1262],origin:[.454,.739],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:28.5},narrow:{x:6,y:100,width:73.9},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[573,1348],origin:[.101,.96],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:16.4},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[674,854],origin:[.5,.73],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:35.8},narrow:{x:96,y:108,width:77.9},breathe:[1.4,1.018,7,-5]}],ge=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},Ye=e=>Array.from({length:e},(n,r)=>{const i=Math.sin(r*12.9898)*43758.5453,t=a=>{const d=Math.sin(i+a*78.233)*43758.5453;return d-Math.floor(d)};return{x:t(1),y:t(2),z:.25+t(3)*.75,phase:t(4)*Math.PI*2,alpha:.3+t(5)*.6}}),We=(e,n)=>{const r=window;if(r.requestIdleCallback){const t=r.requestIdleCallback(e,{timeout:n});return()=>{var a;return(a=r.cancelIdleCallback)==null?void 0:a.call(r,t)}}const i=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(i)},qe=()=>{const e=f.useRef(null),n=f.useRef(null),r=f.useRef(null),i=f.useRef(null),t=f.useRef(null),a=f.useRef({}),[d,h]=f.useState(ee),[Y,u]=f.useState(!1);f.useEffect(()=>{const o=document.documentElement;if(o.dataset.videoReady==="true"){u(!0);return}const c=new MutationObserver(()=>{o.dataset.videoReady==="true"&&u(!0)});c.observe(o,{attributes:!0,attributeFilter:["data-video-ready"]});const m=window.setTimeout(()=>u(!0),3e3);return()=>{c.disconnect(),window.clearTimeout(m)}},[]);const y=ue[d]??ue.en,M=me[d]??me.en;f.useEffect(()=>{const o=document.documentElement;h(ee());const c=new MutationObserver(()=>{h(ee())});return c.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>c.disconnect()},[]),f.useEffect(()=>{const o=e.current;if(!o)return;const c=re(),m=Ne()&&!c,s={x:0,y:0,targetX:0,targetY:0};let l=0,D={vw:window.innerWidth,vh:window.innerHeight},E=null;const k=ve,B=()=>{const v=c?0:$e(l),{vw:P,vh:R}=D,S=c?1:1-q(l,.72,.98);k.forEach(g=>{const C=a.current[g.id];if(!C)return;const V=g.exit.x*P*v+s.x*34,K=g.exit.y*R*v+s.y*22,H=1+(g.exit.scale-1)*v;C.style.transform=`translate3d(${V.toFixed(1)}px, ${K.toFixed(1)}px, 0) rotate(${g.rotate}deg) scale(${g.mirror?-H:H}, ${H})`,C.style.setProperty("--leave",S.toFixed(3))});const J=n.current;if(J){const g=c?0:q(l,.3,.84),C=c?0:l;J.style.transform=`translate3d(${(s.x*10).toFixed(1)}px, ${(s.y*8-C*R*.05).toFixed(1)}px, 0) scale(${(1+.3*v).toFixed(3)})`,J.style.opacity=(1-g).toFixed(3)}const N=r.current;N&&(N.style.transform=`translate3d(${(s.x*14).toFixed(1)}px, ${(l*R*.07).toFixed(1)}px, 0) scale(${(1+.14*l).toFixed(3)})`,N.style.opacity=(c?1:1-q(l,.55,.98)).toFixed(3));const O=i.current;O&&(O.style.transform=`translate3d(${(s.x*6).toFixed(1)}px, 0, 0)`,O.style.opacity=(c?1:1-q(l,.55,.98)).toFixed(3));const W=t.current;W&&W.style.setProperty("--leave",S.toFixed(3))},z=he(o,v=>{l=v.pin,D={vw:v.viewport.vw,vh:v.viewport.vh},B()}),I=()=>{E=null,s.x+=(s.targetX-s.x)*.08,s.y+=(s.targetY-s.y)*.08,B(),(Math.abs(s.targetX-s.x)>.001||Math.abs(s.targetY-s.y)>.001)&&(E=window.requestAnimationFrame(I))},x=v=>{l>=1||(s.targetX=$(v.clientX/D.vw-.5,-.5,.5),s.targetY=$(v.clientY/D.vh-.5,-.5,.5),E===null&&(E=window.requestAnimationFrame(I)))};return m&&window.addEventListener("pointermove",x,{passive:!0}),()=>{z(),m&&window.removeEventListener("pointermove",x),E!==null&&window.cancelAnimationFrame(E)}},[]),f.useEffect(()=>{const o=t.current,c=e.current;if(!o||!c)return;const m=o.getContext("2d");if(!m)return;const s=re(),D=He()==="low"?14:Pe()?42:22,E=Ye(D),k=Math.min(window.devicePixelRatio||1,1.5);let B=0,z=0,I=!0,x=null,v=0,P=!1;const R=document.createElement("canvas");R.width=32,R.height=32;const S=R.getContext("2d");(()=>{if(!S)return;const w=S.createRadialGradient(16,16,0,16,16,16),L="255, 238, 196";w.addColorStop(0,`rgba(${L}, 1)`),w.addColorStop(.35,`rgba(${L}, 0.45)`),w.addColorStop(1,`rgba(${L}, 0)`),S.clearRect(0,0,32,32),S.fillStyle=w,S.fillRect(0,0,32,32)})();const N=()=>{B=o.clientWidth,z=o.clientHeight,o.width=Math.round(B*k),o.height=Math.round(z*k),m.setTransform(k,0,0,k,0,0)},O=w=>{m.clearRect(0,0,B,z);const L=w/1e3;E.forEach(F=>{const Be=s?0:L*(.004+F.z*.01),Re=s?0:Math.sin(L*.6+F.phase)*.012,se=((F.x+Re)%1+1)%1*B,Se=s?0:v*F.z*.55;let _=F.y-Be-Se;_=(_%1+1)%1*z;const Fe=.62-_/z*.24,ce=Math.max(0,1-Math.abs(se/B-Fe)/.09),Me=s?1:.75+.25*Math.sin(L*1.7+F.phase*3),G=(1.2+F.z*3.2)*(1+ce*.6);m.globalAlpha=Math.min(1,F.alpha*(.45+ce*1.1)*Me),m.drawImage(R,se-G,_-G,G*2,G*2)}),m.globalAlpha=1},W=w=>{x=null,O(w),I&&!document.hidden&&!s&&(x=window.requestAnimationFrame(W))},g=()=>{x===null&&I&&!document.hidden&&(x=window.requestAnimationFrame(W))},C=he(c,w=>{v=w.pin}),V=new IntersectionObserver(([w])=>{I=w.isIntersecting,I&&P&&g()});V.observe(c);const K=()=>{!document.hidden&&P&&g()};document.addEventListener("visibilitychange",K);const H=()=>{N(),s&&P&&O(0)};window.addEventListener("resize",H);const Ee=We(()=>{P=!0,N(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),s?O(0):g()},2500);return()=>{C(),V.disconnect(),document.removeEventListener("visibilitychange",K),window.removeEventListener("resize",H),x!==null&&window.cancelAnimationFrame(x),Ee()}},[]);const p=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return A.jsxs(A.Fragment,{children:[A.jsx("a",{className:"cover-skip",href:"#home",children:M}),A.jsxs("div",{id:"cover",ref:e,className:"cover",children:[A.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[A.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),A.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[A.jsxs("div",{ref:r,className:"cover-mist",children:[A.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),A.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),A.jsx("div",{ref:i,className:"cover-shaft"}),A.jsx("canvas",{ref:t,className:"cover-pollen"})]}),A.jsxs("div",{ref:n,className:"cover-copy",children:[A.jsx("img",{alt:"Gábor Ulenius",src:U("profile-160.webp"),srcSet:`${U("profile-160.webp")} 160w, ${U("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),A.jsx("h1",{id:"cover-heading",className:"cover-greeting",children:y})]}),A.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:ve.map(o=>{const[c,m]=o.size,s=o.narrow??o.wide;return A.jsx("img",{ref:l=>{a.current[o.id]=l,l!=null&&l.complete&&l.naturalWidth&&ge(l)},className:p(o),src:Y?U(`cover/${o.image}.webp`):void 0,srcSet:Y?`${U(`cover/${o.image}-sm.webp`)} ${Math.ceil(c/2)}w, ${U(`cover/${o.image}.webp`)} ${c}w`:void 0,sizes:`(max-width: 899.95px) ${s.width}vw, ${o.wide.width}vw`,width:c,height:m,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:l=>ge(l.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${s.x}%`,"--ny":`${s.y}%`,"--nw":`${s.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":m/c,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}},o.id)})})]}),A.jsx("style",{children:`
        .cover {
          position: relative;
          z-index: 1;
          height: 150vh;
          height: 150svh;
        }
        .cover-scene {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: ${Q.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${Le}") center / cover no-repeat;
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
          .cover { height: 130vh; height: 130svh; }
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
          border: 3px solid ${Q.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${Q.bgDark};
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
          background: ${Q.btnBg};
          color: ${Q.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${Q.accentHover};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cover { height: 100vh; height: 100svh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--leaf { transition: none; }
          .cover-layer--leaf { animation: none; }
        }
      `})]})]})},Je=te.lazy(()=>Ce(()=>import("./AppShell-DFtATy3V.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Ve=ze.createRoot(document.getElementById("root"));Ve.render(A.jsxs(te.StrictMode,{children:[A.jsx(qe,{}),A.jsx(te.Suspense,{fallback:null,children:A.jsx(Je,{})})]}));export{Ce as _,U as a,pe as b,$ as c,j as d,Ge as e,q as f,He as g,Ne as h,Pe as i,Q as j,Ze as o,re as p,he as r,_e as s};
