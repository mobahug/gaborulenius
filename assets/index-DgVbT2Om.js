const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-D3PI0SSm.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-BU2WnqO2.js","assets/vendor-mui-icons-FTwyKh2W.js","assets/AppShell-CQUZ_kBN.css"])))=>i.map(i=>d[i]);
import{r as f,j as A,a as K,d as Re}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const ze="modulepreload",je=function(e){return"/gaborulenius/"+e},se={},Fe=function(n,r,i){let t=Promise.resolve();if(r&&r.length>0){let l=function(g){return Promise.all(g.map(b=>Promise.resolve(b).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),T=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));t=l(r.map(g=>{if(g=je(g),g in se)return;se[g]=!0;const b=g.endsWith(".css"),o=b?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${o}`))return;const c=document.createElement("link");if(c.rel=b?"stylesheet":ze,b||(c.as="script"),c.crossOrigin="",c.href=g,T&&c.setAttribute("nonce",T),document.head.appendChild(c),b)return new Promise((u,a)=>{c.addEventListener("load",u),c.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${g}`)))})}))}function s(l){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=l,window.dispatchEvent(h),!h.defaultPrevented)throw l}return t.then(l=>{for(const h of l||[])h.status==="rejected"&&s(h.reason);return n().catch(s)})},P={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},N=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,$e="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAbADADASIAAhEBAxEB/8QAGgAAAwADAQAAAAAAAAAAAAAAAwQFAQIGB//EACgQAAIBAwMCBgMBAAAAAAAAAAECAwARIQQSMRNRBQZBgZHRYXHh8P/EABgBAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAERAhIhMf/aAAwDAQACEQMRAD8A8+hVFSRABm1r5NMIFgkUM29jYkA3Av6XFSo5NkhVcdjVKJ3BUic7SoLqSbqR6H2NczUInSeX8ahRp5ujMbjc1/gWo3miPSQSJBEtyi2lkBvvb6qf4LrXTVl1IBybgWsfUgd6T8U1jSTEu5ycnn4pOX3Q3yEjWodm5cAqDkW75/3elIGAiI5IbFGnkDJbnFsn80kjOA4W3PfirI31DK6Zi42HcGtm/ArcX02sMXVwCOL2J/lKiR4pAsbsq34Bp/TSs+jkjfayxlSoKg2uaXVQUijo3nZnYlyii1yb7cWAv+hb2qfqJS0rb3wM8XvVrwXSQTQTdSMHbGSMnkW+65zVMWYM2SW5pMuuD6wkgU0nV3OAAoOQMUBwvTuGyeQKzNl5CckGtQAwdjziroRH/9k=",I=(e,n=0,r=1)=>Math.min(r,Math.max(n,e)),U=(e,n,r)=>r===n?e>=r?1:0:I((e-n)/(r-n)),Xe=(e,n,r)=>{const i=U(r,e,n);return i*i*(3-2*i)},Ge=e=>1-Math.pow(1-e,3),Ie=e=>e*e*e,Oe="(prefers-reduced-motion: reduce)",ke="(min-width: 900px)",Ce="(hover: hover) and (pointer: fine)",_=e=>typeof window<"u"&&window.matchMedia(e).matches,ee=()=>_(Oe),Le=()=>_(ke),Qe=()=>_(Ce),De=()=>{var s;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,r=e.deviceMemory??8,i=_("(pointer: coarse)"),t=Math.min(window.screen.width,window.screen.height)<820;return(s=e.connection)!=null&&s.saveData||i&&t||r<=2||n<=2?"low":i||r<=4||n<=4?"medium":"high"},te=new Set,re=new Set;let ne=null,ce=!1;const Pe=.09;let x=null,J=0;const ge=e=>typeof e=="function"?e():e;let H=null,oe=0;const we=()=>{H||(H=document.createElement("div"),H.setAttribute("aria-hidden","true"),H.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(H)),oe=H.offsetHeight||window.innerHeight},ve=()=>{oe||we();const e=window.scrollY;return{y:e,smoothY:x??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:oe,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},Ae=()=>{we(),O()},Ne=(e,n)=>{const r=performance.now(),i=r-J>100?1/60:(r-J)/1e3;return J=r,x===null||Math.abs(e-x)>n*1.5||ee()?x=e:(x+=(e-x)*(1-Math.exp(-i/Pe)),Math.abs(e-x)<.5&&(x=e)),x},fe=(e,n,r)=>{const{smoothY:i,vh:t}=e;return{viewport:e,top:n,height:r,pin:I((i-n)/Math.max(1,r-t)),pass:I((i+t-n)/Math.max(1,r+t)),enter:I((i+t-n)/Math.max(1,t)),exit:I((i-(n+r-t))/Math.max(1,t)),near:i+2*t>n&&i-t<n+r}},pe=(e,n)=>{const r=e.getBoundingClientRect();return{top:r.top+n.y,height:r.height}},He=()=>{ne=null;const e=ve(),n={...e,smoothY:Ne(e.y,e.vh)},r=[];te.forEach(i=>{const t=ge(i.target);if(!t)return;const{top:s,height:l}=pe(t,n);r.push([i,s,l])}),r.forEach(([i,t,s])=>{i.callback(fe(n,t,s))}),re.forEach(i=>i(n)),n.smoothY!==n.y&&O()},O=()=>{ne!==null||typeof window>"u"||(ne=window.requestAnimationFrame(He))},xe=()=>{ce||typeof window>"u"||(ce=!0,window.addEventListener("scroll",O,{passive:!0}),window.addEventListener("resize",Ae),window.addEventListener("orientationchange",Ae),window.addEventListener("load",O),"ResizeObserver"in window&&new ResizeObserver(O).observe(document.documentElement))},le=(e,n)=>{xe();const r={target:e,callback:n};te.add(r);const i=ge(e);if(i){const t=ve(),{top:s,height:l}=pe(i,t);n(fe(t,s,l))}return O(),()=>{te.delete(r)}},_e=e=>(xe(),re.add(e),O(),()=>{re.delete(e)}),de={en:"Hi, I'm Gábor",fi:"Hei, olen Gábor"},he={en:"Skip to content",fi:"Siirry sisältöön"},Z=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",ue=[{id:"banana-high",image:"banana-high",size:[494,1360],origin:[.571,.968],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15},breathe:[1.3,1.012,9.5,-3],wideOnly:!0},{id:"palm-high",image:"palm-high",size:[900,1100],origin:[.32,.97],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34},narrow:{x:104,y:-4,width:70},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[900,1240],origin:[.5,.62],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:30},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[1119,1200],origin:[.451,.751],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:27},narrow:{x:6,y:100,width:70},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[525,1300],origin:[.064,.977],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:15},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[640,820],origin:[.5,.74],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:34},narrow:{x:96,y:108,width:74},breathe:[1.4,1.018,7,-5]}],me=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},Ye=e=>Array.from({length:e},(n,r)=>{const i=Math.sin(r*12.9898)*43758.5453,t=s=>{const l=Math.sin(i+s*78.233)*43758.5453;return l-Math.floor(l)};return{x:t(1),y:t(2),z:.25+t(3)*.75,phase:t(4)*Math.PI*2,alpha:.3+t(5)*.6}}),Ue=(e,n)=>{const r=window;if(r.requestIdleCallback){const t=r.requestIdleCallback(e,{timeout:n});return()=>{var s;return(s=r.cancelIdleCallback)==null?void 0:s.call(r,t)}}const i=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(i)},Te=()=>{const e=f.useRef(null),n=f.useRef(null),r=f.useRef(null),i=f.useRef(null),t=f.useRef(null),s=f.useRef({}),[l,h]=f.useState(Z),T=de[l]??de.en,g=he[l]??he.en;f.useEffect(()=>{const o=document.documentElement;h(Z());const c=new MutationObserver(()=>{h(Z())});return c.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>c.disconnect()},[]),f.useEffect(()=>{const o=e.current;if(!o)return;const c=ee(),u=Qe()&&!c,a={x:0,y:0,targetX:0,targetY:0};let d=0,k={vw:window.innerWidth,vh:window.innerHeight},y=null;const C=ue,E=()=>{const m=c?0:Ie(d),{vw:L,vh:B}=k,S=c?1:1-U(d,.72,.98);C.forEach(w=>{const F=s.current[w.id];if(!F)return;const V=w.exit.x*L*m+a.x*34,q=w.exit.y*B*m+a.y*22,D=1+(w.exit.scale-1)*m;F.style.transform=`translate3d(${V.toFixed(1)}px, ${q.toFixed(1)}px, 0) rotate(${w.rotate}deg) scale(${w.mirror?-D:D}, ${D})`,F.style.setProperty("--leave",S.toFixed(3))});const W=n.current;if(W){const w=c?0:U(d,.3,.84),F=c?0:d;W.style.transform=`translate3d(${(a.x*10).toFixed(1)}px, ${(a.y*8-F*B*.05).toFixed(1)}px, 0) scale(${(1+.3*m).toFixed(3)})`,W.style.opacity=(1-w).toFixed(3)}const Q=r.current;Q&&(Q.style.transform=`translate3d(${(a.x*14).toFixed(1)}px, ${(d*B*.07).toFixed(1)}px, 0) scale(${(1+.14*d).toFixed(3)})`,Q.style.opacity=(c?1:1-U(d,.55,.98)).toFixed(3));const j=i.current;j&&(j.style.transform=`translate3d(${(a.x*6).toFixed(1)}px, 0, 0)`,j.style.opacity=(c?1:1-U(d,.55,.98)).toFixed(3));const Y=t.current;Y&&Y.style.setProperty("--leave",S.toFixed(3))},R=le(o,m=>{d=m.pin,k={vw:m.viewport.vw,vh:m.viewport.vh},E()}),z=()=>{y=null,a.x+=(a.targetX-a.x)*.08,a.y+=(a.targetY-a.y)*.08,E(),(Math.abs(a.targetX-a.x)>.001||Math.abs(a.targetY-a.y)>.001)&&(y=window.requestAnimationFrame(z))},p=m=>{d>=1||(a.targetX=I(m.clientX/k.vw-.5,-.5,.5),a.targetY=I(m.clientY/k.vh-.5,-.5,.5),y===null&&(y=window.requestAnimationFrame(z)))};return u&&window.addEventListener("pointermove",p,{passive:!0}),()=>{R(),u&&window.removeEventListener("pointermove",p),y!==null&&window.cancelAnimationFrame(y)}},[]),f.useEffect(()=>{const o=t.current,c=e.current;if(!o||!c)return;const u=o.getContext("2d");if(!u)return;const a=ee(),k=De()==="low"?14:Le()?42:22,y=Ye(k),C=Math.min(window.devicePixelRatio||1,1.5);let E=0,R=0,z=!0,p=null,m=0,L=!1;const B=document.createElement("canvas");B.width=32,B.height=32;const S=B.getContext("2d");(()=>{if(!S)return;const v=S.createRadialGradient(16,16,0,16,16,16),$="255, 238, 196";v.addColorStop(0,`rgba(${$}, 1)`),v.addColorStop(.35,`rgba(${$}, 0.45)`),v.addColorStop(1,`rgba(${$}, 0)`),S.clearRect(0,0,32,32),S.fillStyle=v,S.fillRect(0,0,32,32)})();const Q=()=>{E=o.clientWidth,R=o.clientHeight,o.width=Math.round(E*C),o.height=Math.round(R*C),u.setTransform(C,0,0,C,0,0)},j=v=>{u.clearRect(0,0,E,R);const $=v/1e3;y.forEach(M=>{const ye=a?0:$*(.004+M.z*.01),Ee=a?0:Math.sin($*.6+M.phase)*.012,ie=((M.x+Ee)%1+1)%1*E,Be=a?0:m*M.z*.55;let X=M.y-ye-Be;X=(X%1+1)%1*R;const Se=.62-X/R*.24,ae=Math.max(0,1-Math.abs(ie/E-Se)/.09),Me=a?1:.75+.25*Math.sin($*1.7+M.phase*3),G=(1.2+M.z*3.2)*(1+ae*.6);u.globalAlpha=Math.min(1,M.alpha*(.45+ae*1.1)*Me),u.drawImage(B,ie-G,X-G,G*2,G*2)}),u.globalAlpha=1},Y=v=>{p=null,j(v),z&&!document.hidden&&!a&&(p=window.requestAnimationFrame(Y))},w=()=>{p===null&&z&&!document.hidden&&(p=window.requestAnimationFrame(Y))},F=le(c,v=>{m=v.pin}),V=new IntersectionObserver(([v])=>{z=v.isIntersecting,z&&L&&w()});V.observe(c);const q=()=>{!document.hidden&&L&&w()};document.addEventListener("visibilitychange",q);const D=()=>{Q(),a&&L&&j(0)};window.addEventListener("resize",D);const be=Ue(()=>{L=!0,Q(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),a?j(0):w()},2500);return()=>{F(),V.disconnect(),document.removeEventListener("visibilitychange",q),window.removeEventListener("resize",D),p!==null&&window.cancelAnimationFrame(p),be()}},[]);const b=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return A.jsxs(A.Fragment,{children:[A.jsx("a",{className:"cover-skip",href:"#home",children:g}),A.jsxs("div",{id:"cover",ref:e,className:"cover",children:[A.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[A.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),A.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[A.jsxs("div",{ref:r,className:"cover-mist",children:[A.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),A.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),A.jsx("div",{ref:i,className:"cover-shaft"}),A.jsx("canvas",{ref:t,className:"cover-pollen"})]}),A.jsxs("div",{ref:n,className:"cover-copy",children:[A.jsx("img",{alt:"Gábor Ulenius",src:N("profile-160.webp"),srcSet:`${N("profile-160.webp")} 160w, ${N("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),A.jsx("h1",{id:"cover-heading",className:"cover-greeting",children:T})]}),A.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:ue.map(o=>{const[c,u]=o.size,a=o.narrow??o.wide;return A.jsx("img",{ref:d=>{s.current[o.id]=d,d!=null&&d.complete&&d.naturalWidth&&me(d)},className:b(o),src:N(`cover/${o.image}.webp`),srcSet:`${N(`cover/${o.image}-sm.webp`)} ${c/2}w, ${N(`cover/${o.image}.webp`)} ${c}w`,sizes:`(max-width: 899.95px) ${a.width}vw, ${o.wide.width}vw`,width:c,height:u,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:d=>me(d.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${a.x}%`,"--ny":`${a.y}%`,"--nw":`${a.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":u/c,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}},o.id)})})]}),A.jsx("style",{children:`
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
          color: ${P.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${$e}") center / cover no-repeat;
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
          border: 3px solid ${P.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${P.bgDark};
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
          background: ${P.btnBg};
          color: ${P.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${P.accentHover};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cover { height: 100vh; height: 100svh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--leaf { transition: none; }
          .cover-layer--leaf { animation: none; }
        }
      `})]})]})},We=K.lazy(()=>Fe(()=>import("./AppShell-D3PI0SSm.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Ve=Re.createRoot(document.getElementById("root"));Ve.render(A.jsxs(K.StrictMode,{children:[A.jsx(Te,{}),A.jsx(K.Suspense,{fallback:null,children:A.jsx(We,{})})]}));export{Fe as _,N as a,ve as b,I as c,O as d,Ge as e,U as f,De as g,P as h,Le as i,Qe as j,_e as o,ee as p,le as r,Xe as s};
