const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-BXDml9n7.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-BU2WnqO2.js","assets/vendor-mui-icons-FTwyKh2W.js","assets/AppShell-CQUZ_kBN.css"])))=>i.map(i=>d[i]);
import{r as f,j as A,a as te,d as je}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const Fe="modulepreload",Oe=function(e){return"/gaborulenius/"+e},Ae={},$e=function(n,r,i){let t=Promise.resolve();if(r&&r.length>0){let d=function(u){return Promise.all(u.map(y=>Promise.resolve(y).then(z=>({status:"fulfilled",value:z}),z=>({status:"rejected",reason:z}))))};document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),U=(h==null?void 0:h.nonce)||(h==null?void 0:h.getAttribute("nonce"));t=d(r.map(u=>{if(u=Oe(u),u in Ae)return;Ae[u]=!0;const y=u.endsWith(".css"),z=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${z}`))return;const p=document.createElement("link");if(p.rel=y?"stylesheet":Fe,y||(p.as="script"),p.crossOrigin="",p.href=u,U&&p.setAttribute("nonce",U),document.head.appendChild(p),y)return new Promise((o,c)=>{p.addEventListener("load",o),p.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(d){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=d,window.dispatchEvent(h),!h.defaultPrevented)throw d}return t.then(d=>{for(const h of d||[])h.status==="rejected"&&a(h.reason);return n().catch(a)})},H={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},Y=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Ie="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAbADADASIAAhEBAxEB/8QAGgAAAwADAQAAAAAAAAAAAAAAAwQFAQIGB//EACgQAAIBAwMCBgMBAAAAAAAAAAECAwARIQQSMRNRBQZBgZHRYXHh8P/EABgBAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAERAhIhMf/aAAwDAQACEQMRAD8A8+hVFSRABm1r5NMIFgkUM29jYkA3Av6XFSo5NkhVcdjVKJ3BUic7SoLqSbqR6H2NczUInSeX8ahRp5ujMbjc1/gWo3miPSQSJBEtyi2lkBvvb6qf4LrXTVl1IBybgWsfUgd6T8U1jSTEu5ycnn4pOX3Q3yEjWodm5cAqDkW75/3elIGAiI5IbFGnkDJbnFsn80kjOA4W3PfirI31DK6Zi42HcGtm/ArcX02sMXVwCOL2J/lKiR4pAsbsq34Bp/TSs+jkjfayxlSoKg2uaXVQUijo3nZnYlyii1yb7cWAv+hb2qfqJS0rb3wM8XvVrwXSQTQTdSMHbGSMnkW+65zVMWYM2SW5pMuuD6wkgU0nV3OAAoOQMUBwvTuGyeQKzNl5CckGtQAwdjziroRH/9k=",k=(e,n=0,r=1)=>Math.min(r,Math.max(n,e)),V=(e,n,r)=>r===n?e>=r?1:0:k((e-n)/(r-n)),_e=(e,n,r)=>{const i=V(r,e,n);return i*i*(3-2*i)},Je=e=>1-Math.pow(1-e,3),ke=e=>e*e*e,Le="(prefers-reduced-motion: reduce)",Ce="(min-width: 900px)",Qe="(hover: hover) and (pointer: fine)",Z=e=>typeof window<"u"&&window.matchMedia(e).matches,re=()=>Z(Le),De=()=>Z(Ce),Pe=()=>Z(Qe),Ne=()=>{var a;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,r=e.deviceMemory??8,i=Z("(pointer: coarse)"),t=Math.min(window.screen.width,window.screen.height)<820;return(a=e.connection)!=null&&a.saveData||i&&t||r<=2||n<=2?"low":i||r<=4||n<=4?"medium":"high"},ne=new Set,oe=new Set;let ie=null,de=!1;const He=.09;let x=null,K=0;const ge=e=>typeof e=="function"?e():e;let T=null,ae=0;const fe=()=>{T||(T=document.createElement("div"),T.setAttribute("aria-hidden","true"),T.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(T)),ae=T.offsetHeight||window.innerHeight},pe=()=>{ae||fe();const e=window.scrollY;return{y:e,smoothY:x??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:ae,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},le=()=>{fe(),L()},Ye=(e,n)=>{const r=performance.now(),i=r-K>100?1/60:(r-K)/1e3;return K=r,x===null||Math.abs(e-x)>n*1.5||re()?x=e:(x+=(e-x)*(1-Math.exp(-i/He)),Math.abs(e-x)<.5&&(x=e)),x},be=(e,n,r)=>{const{smoothY:i,vh:t}=e;return{viewport:e,top:n,height:r,pin:k((i-n)/Math.max(1,r-t)),pass:k((i+t-n)/Math.max(1,r+t)),enter:k((i+t-n)/Math.max(1,t)),exit:k((i-(n+r-t))/Math.max(1,t)),near:i+2*t>n&&i-t<n+r}},xe=(e,n)=>{const r=e.getBoundingClientRect();return{top:r.top+n.y,height:r.height}},Te=()=>{ie=null;const e=pe(),n={...e,smoothY:Ye(e.y,e.vh)},r=[];ne.forEach(i=>{const t=ge(i.target);if(!t)return;const{top:a,height:d}=xe(t,n);r.push([i,a,d])}),r.forEach(([i,t,a])=>{i.callback(be(n,t,a))}),oe.forEach(i=>i(n)),n.smoothY!==n.y&&L()},L=()=>{ie!==null||typeof window>"u"||(ie=window.requestAnimationFrame(Te))},ye=()=>{de||typeof window>"u"||(de=!0,window.addEventListener("scroll",L,{passive:!0}),window.addEventListener("resize",le),window.addEventListener("orientationchange",le),window.addEventListener("load",L),"ResizeObserver"in window&&new ResizeObserver(L).observe(document.documentElement))},he=(e,n)=>{ye();const r={target:e,callback:n};ne.add(r);const i=ge(e);if(i){const t=pe(),{top:a,height:d}=xe(i,t);n(be(t,a,d))}return L(),()=>{ne.delete(r)}},Ze=e=>(ye(),oe.add(e),L(),()=>{oe.delete(e)}),ue={en:"Hi, I'm Gábor",fi:"Hei, olen Gábor"},me={en:"Skip to content",fi:"Siirry sisältöön"},ee=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",we=[{id:"banana-high",image:"banana-high",size:[494,1360],origin:[.571,.968],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15},breathe:[1.3,1.012,9.5,-3],wideOnly:!0},{id:"palm-high",image:"palm-high",size:[900,1100],origin:[.32,.97],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34},narrow:{x:104,y:-4,width:70},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[900,1240],origin:[.5,.62],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:30},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[1119,1200],origin:[.451,.751],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:27},narrow:{x:6,y:100,width:70},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[525,1300],origin:[.064,.977],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:15},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[640,820],origin:[.5,.74],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:34},narrow:{x:96,y:108,width:74},breathe:[1.4,1.018,7,-5]}],ve=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},Ue=e=>Array.from({length:e},(n,r)=>{const i=Math.sin(r*12.9898)*43758.5453,t=a=>{const d=Math.sin(i+a*78.233)*43758.5453;return d-Math.floor(d)};return{x:t(1),y:t(2),z:.25+t(3)*.75,phase:t(4)*Math.PI*2,alpha:.3+t(5)*.6}}),We=(e,n)=>{const r=window;if(r.requestIdleCallback){const t=r.requestIdleCallback(e,{timeout:n});return()=>{var a;return(a=r.cancelIdleCallback)==null?void 0:a.call(r,t)}}const i=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(i)},Ve=()=>{const e=f.useRef(null),n=f.useRef(null),r=f.useRef(null),i=f.useRef(null),t=f.useRef(null),a=f.useRef({}),[d,h]=f.useState(ee),[U,u]=f.useState(!1);f.useEffect(()=>{const o=document.documentElement;if(o.dataset.videoReady==="true"){u(!0);return}const c=new MutationObserver(()=>{o.dataset.videoReady==="true"&&u(!0)});c.observe(o,{attributes:!0,attributeFilter:["data-video-ready"]});const m=window.setTimeout(()=>u(!0),3e3);return()=>{c.disconnect(),window.clearTimeout(m)}},[]);const y=ue[d]??ue.en,z=me[d]??me.en;f.useEffect(()=>{const o=document.documentElement;h(ee());const c=new MutationObserver(()=>{h(ee())});return c.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>c.disconnect()},[]),f.useEffect(()=>{const o=e.current;if(!o)return;const c=re(),m=Pe()&&!c,s={x:0,y:0,targetX:0,targetY:0};let l=0,C={vw:window.innerWidth,vh:window.innerHeight},E=null;const Q=we,S=()=>{const w=c?0:ke(l),{vw:D,vh:B}=C,M=c?1:1-V(l,.72,.98);Q.forEach(v=>{const $=a.current[v.id];if(!$)return;const X=v.exit.x*D*w+s.x*34,G=v.exit.y*B*w+s.y*22,N=1+(v.exit.scale-1)*w;$.style.transform=`translate3d(${X.toFixed(1)}px, ${G.toFixed(1)}px, 0) rotate(${v.rotate}deg) scale(${v.mirror?-N:N}, ${N})`,$.style.setProperty("--leave",M.toFixed(3))});const q=n.current;if(q){const v=c?0:V(l,.3,.84),$=c?0:l;q.style.transform=`translate3d(${(s.x*10).toFixed(1)}px, ${(s.y*8-$*B*.05).toFixed(1)}px, 0) scale(${(1+.3*w).toFixed(3)})`,q.style.opacity=(1-v).toFixed(3)}const P=r.current;P&&(P.style.transform=`translate3d(${(s.x*14).toFixed(1)}px, ${(l*B*.07).toFixed(1)}px, 0) scale(${(1+.14*l).toFixed(3)})`,P.style.opacity=(c?1:1-V(l,.55,.98)).toFixed(3));const O=i.current;O&&(O.style.transform=`translate3d(${(s.x*6).toFixed(1)}px, 0, 0)`,O.style.opacity=(c?1:1-V(l,.55,.98)).toFixed(3));const W=t.current;W&&W.style.setProperty("--leave",M.toFixed(3))},j=he(o,w=>{l=w.pin,C={vw:w.viewport.vw,vh:w.viewport.vh},S()}),F=()=>{E=null,s.x+=(s.targetX-s.x)*.08,s.y+=(s.targetY-s.y)*.08,S(),(Math.abs(s.targetX-s.x)>.001||Math.abs(s.targetY-s.y)>.001)&&(E=window.requestAnimationFrame(F))},b=w=>{l>=1||(s.targetX=k(w.clientX/C.vw-.5,-.5,.5),s.targetY=k(w.clientY/C.vh-.5,-.5,.5),E===null&&(E=window.requestAnimationFrame(F)))};return m&&window.addEventListener("pointermove",b,{passive:!0}),()=>{j(),m&&window.removeEventListener("pointermove",b),E!==null&&window.cancelAnimationFrame(E)}},[]),f.useEffect(()=>{const o=t.current,c=e.current;if(!o||!c)return;const m=o.getContext("2d");if(!m)return;const s=re(),C=Ne()==="low"?14:De()?42:22,E=Ue(C),Q=Math.min(window.devicePixelRatio||1,1.5);let S=0,j=0,F=!0,b=null,w=0,D=!1;const B=document.createElement("canvas");B.width=32,B.height=32;const M=B.getContext("2d");(()=>{if(!M)return;const g=M.createRadialGradient(16,16,0,16,16,16),I="255, 238, 196";g.addColorStop(0,`rgba(${I}, 1)`),g.addColorStop(.35,`rgba(${I}, 0.45)`),g.addColorStop(1,`rgba(${I}, 0)`),M.clearRect(0,0,32,32),M.fillStyle=g,M.fillRect(0,0,32,32)})();const P=()=>{S=o.clientWidth,j=o.clientHeight,o.width=Math.round(S*Q),o.height=Math.round(j*Q),m.setTransform(Q,0,0,Q,0,0)},O=g=>{m.clearRect(0,0,S,j);const I=g/1e3;E.forEach(R=>{const Se=s?0:I*(.004+R.z*.01),Be=s?0:Math.sin(I*.6+R.phase)*.012,se=((R.x+Be)%1+1)%1*S,Me=s?0:w*R.z*.55;let _=R.y-Se-Me;_=(_%1+1)%1*j;const Re=.62-_/j*.24,ce=Math.max(0,1-Math.abs(se/S-Re)/.09),ze=s?1:.75+.25*Math.sin(I*1.7+R.phase*3),J=(1.2+R.z*3.2)*(1+ce*.6);m.globalAlpha=Math.min(1,R.alpha*(.45+ce*1.1)*ze),m.drawImage(B,se-J,_-J,J*2,J*2)}),m.globalAlpha=1},W=g=>{b=null,O(g),F&&!document.hidden&&!s&&(b=window.requestAnimationFrame(W))},v=()=>{b===null&&F&&!document.hidden&&(b=window.requestAnimationFrame(W))},$=he(c,g=>{w=g.pin}),X=new IntersectionObserver(([g])=>{F=g.isIntersecting,F&&D&&v()});X.observe(c);const G=()=>{!document.hidden&&D&&v()};document.addEventListener("visibilitychange",G);const N=()=>{P(),s&&D&&O(0)};window.addEventListener("resize",N);const Ee=We(()=>{D=!0,P(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),s?O(0):v()},2500);return()=>{$(),X.disconnect(),document.removeEventListener("visibilitychange",G),window.removeEventListener("resize",N),b!==null&&window.cancelAnimationFrame(b),Ee()}},[]);const p=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return A.jsxs(A.Fragment,{children:[A.jsx("a",{className:"cover-skip",href:"#home",children:z}),A.jsxs("div",{id:"cover",ref:e,className:"cover",children:[A.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[A.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),A.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[A.jsxs("div",{ref:r,className:"cover-mist",children:[A.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),A.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),A.jsx("div",{ref:i,className:"cover-shaft"}),A.jsx("canvas",{ref:t,className:"cover-pollen"})]}),A.jsxs("div",{ref:n,className:"cover-copy",children:[A.jsx("img",{alt:"Gábor Ulenius",src:Y("profile-160.webp"),srcSet:`${Y("profile-160.webp")} 160w, ${Y("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),A.jsx("h1",{id:"cover-heading",className:"cover-greeting",children:y})]}),A.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:we.map(o=>{const[c,m]=o.size,s=o.narrow??o.wide;return A.jsx("img",{ref:l=>{a.current[o.id]=l,l!=null&&l.complete&&l.naturalWidth&&ve(l)},className:p(o),src:U?Y(`cover/${o.image}.webp`):void 0,srcSet:U?`${Y(`cover/${o.image}-sm.webp`)} ${c/2}w, ${Y(`cover/${o.image}.webp`)} ${c}w`:void 0,sizes:`(max-width: 899.95px) ${s.width}vw, ${o.wide.width}vw`,width:c,height:m,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:l=>ve(l.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${s.x}%`,"--ny":`${s.y}%`,"--nw":`${s.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":m/c,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}},o.id)})})]}),A.jsx("style",{children:`
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
          color: ${H.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${Ie}") center / cover no-repeat;
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
          border: 3px solid ${H.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${H.bgDark};
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
          background: ${H.btnBg};
          color: ${H.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${H.accentHover};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cover { height: 100vh; height: 100svh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--leaf { transition: none; }
          .cover-layer--leaf { animation: none; }
        }
      `})]})]})},qe=te.lazy(()=>$e(()=>import("./AppShell-BXDml9n7.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Xe=je.createRoot(document.getElementById("root"));Xe.render(A.jsxs(te.StrictMode,{children:[A.jsx(Ve,{}),A.jsx(te.Suspense,{fallback:null,children:A.jsx(qe,{})})]}));export{$e as _,Y as a,pe as b,k as c,L as d,Je as e,V as f,Ne as g,H as h,De as i,Pe as j,Ze as o,re as p,he as r,_e as s};
