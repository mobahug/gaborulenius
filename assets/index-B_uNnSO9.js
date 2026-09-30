const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-D7AqoUP_.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/theme-CD9B5ful.js","assets/vendor-mui-icons-DcdLYpM1.js","assets/vendor-mui-2Aa4Eohn.js","assets/theme-CjK3DR0P.css","assets/AppShell-DVpWUYxJ.css","assets/QuickReadShell-BNhDmXFj.js","assets/LanguageToggle-CJS_cpJj.js","assets/QuickReadShell-9xr1K2Ga.css"])))=>i.map(i=>d[i]);
import{r as v,j as a,a as Z,d as Ne}from"./vendor-react-CptINutj.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const qe="modulepreload",Ge=function(e){return"/gaborulenius/"+e},fe={},Re=function(r,t,i){let n=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(B=>Promise.resolve(B).then(j=>({status:"fulfilled",value:j}),j=>({status:"rejected",reason:j}))))};document.getElementsByTagName("link");const A=document.querySelector("meta[property=csp-nonce]"),D=(A==null?void 0:A.nonce)||(A==null?void 0:A.getAttribute("nonce"));n=l(t.map(u=>{if(u=Ge(u),u in fe)return;fe[u]=!0;const B=u.endsWith(".css"),j=B?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${j}`))return;const b=document.createElement("link");if(b.rel=B?"stylesheet":qe,B||(b.as="script"),b.crossOrigin="",b.href=u,D&&b.setAttribute("nonce",D),document.head.appendChild(b),B)return new Promise((ie,o)=>{b.addEventListener("load",ie),b.addEventListener("error",()=>o(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(l){const A=new Event("vite:preloadError",{cancelable:!0});if(A.payload=l,window.dispatchEvent(A),!A.defaultPrevented)throw l}return n.then(l=>{for(const A of l||[])A.status==="rejected"&&s(A.reason);return r().catch(s)})},f={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},V=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Je="data:image/jpeg;base64,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",z=(e,r=0,t=1)=>Math.min(t,Math.max(r,e)),U=(e,r,t)=>t===r?e>=t?1:0:z((e-r)/(t-r)),gt=(e,r,t)=>{const i=U(t,e,r);return i*i*(3-2*i)},xt=e=>1-Math.pow(1-e,3),Ve=e=>e*e*e,Ue="(prefers-reduced-motion: reduce)",Ze="(min-width: 900px)",Xe="(hover: hover) and (pointer: fine)",oe=e=>typeof window<"u"&&window.matchMedia(e).matches,ne=()=>typeof document<"u"&&document.documentElement.dataset.motion==="reduced"||oe(Ue),_e=()=>oe(Ze),ue=()=>oe(Xe),Ke=()=>{var s;if(typeof window>"u")return"medium";const e=navigator,r=e.hardwareConcurrency??4,t=e.deviceMemory??8,i=oe("(pointer: coarse)"),n=Math.min(window.screen.width,window.screen.height)<820;return(s=e.connection)!=null&&s.saveData||i&&n||t<=2||r<=2?"low":i||t<=4||r<=4?"medium":"high"},et=.12;let C=0,W=0,Q=0,ce=0;const tt=()=>C!==0,rt=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),nt=e=>e.deltaMode===1?e.deltaY*40:e.deltaMode===2?e.deltaY*window.innerHeight:e.deltaY,ot=(e,r)=>{let t=e instanceof Element?e:null;for(;t&&t!==document.body&&t!==document.documentElement;){if(t instanceof HTMLElement&&t.scrollHeight>t.clientHeight){const{overflowY:i}=getComputedStyle(t);if((i==="auto"||i==="scroll")&&(r<0?t.scrollTop>0:t.scrollTop+t.clientHeight<t.scrollHeight-1))return!0}t=t.parentElement}return!1},me=()=>{cancelAnimationFrame(C),C=0},Le=e=>{const r=Math.min(.05,(e-ce)/1e3);ce=e,Q+=(W-Q)*(1-Math.exp(-r/et)),Math.abs(W-Q)<.5&&(Q=W),window.scrollTo({top:Q,behavior:"instant"}),C=Q===W?0:requestAnimationFrame(Le)},ve=e=>{if(e.defaultPrevented||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||document.body.style.overflow==="hidden")return;const r=nt(e);!r||ot(e.target,r)||(e.preventDefault(),C||(Q=window.scrollY,W=Q,ce=performance.now(),C=requestAnimationFrame(Le)),W=Math.max(0,Math.min(rt(),W+r)))},ge=()=>{C&&Math.abs(window.scrollY-Q)>2&&me()},re=()=>{C&&me()},bt=()=>{v.useEffect(()=>{if(!(!ue()||ne()))return window.addEventListener("wheel",ve,{passive:!1}),window.addEventListener("scroll",ge,{passive:!0}),window.addEventListener("pointerdown",re,!0),window.addEventListener("keydown",re,!0),()=>{me(),window.removeEventListener("wheel",ve),window.removeEventListener("scroll",ge),window.removeEventListener("pointerdown",re,!0),window.removeEventListener("keydown",re,!0)}},[])},de=new Set,le=new Set;let Ae=null,xe=!1;const it=.09,at=.02;let k=null,ae=0,be=null;const Ce=e=>typeof e=="function"?e():e;let G=null,he=0;const je=()=>{G||(G=document.createElement("div"),G.setAttribute("aria-hidden","true"),G.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(G)),he=G.offsetHeight||window.innerHeight},Ye=()=>{he||je();const e=window.scrollY;return{y:e,smoothY:k??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:he,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},ye=()=>{je(),T()},st=(e,r)=>{const t=performance.now(),i=t-ae>100?1/60:(t-ae)/1e3;if(ae=t,k===null||Math.abs(e-k)>r*1.5||ne())k=e;else{be??(be=!ue());const n=be||tt()?at:it;k+=(e-k)*(1-Math.exp(-i/n)),Math.abs(e-k)<.5&&(k=e)}return k},Ie=(e,r,t)=>{const{smoothY:i,vh:n}=e;return{viewport:e,top:r,height:t,pin:z((i-r)/Math.max(1,t-n)),pass:z((i+n-r)/Math.max(1,t+n)),enter:z((i+n-r)/Math.max(1,n)),exit:z((i-(r+t-n))/Math.max(1,n)),near:i+2*n>r&&i-n<r+t}},Fe=(e,r)=>{const t=e.getBoundingClientRect();return{top:t.top+r.y,height:t.height}},ct=()=>{Ae=null;const e=Ye(),r={...e,smoothY:st(e.y,e.vh)},t=[];de.forEach(i=>{const n=Ce(i.target);if(!n)return;const{top:s,height:l}=Fe(n,r);t.push([i,s,l])}),t.forEach(([i,n,s])=>{i.callback(Ie(r,n,s))}),le.forEach(i=>i(r)),r.smoothY!==r.y&&T()},T=()=>{Ae!==null||typeof window>"u"||(Ae=window.requestAnimationFrame(ct))},He=()=>{xe||typeof window>"u"||(xe=!0,window.addEventListener("scroll",T,{passive:!0}),window.addEventListener("resize",ye),window.addEventListener("orientationchange",ye),window.addEventListener("load",T),"ResizeObserver"in window&&new ResizeObserver(T).observe(document.documentElement))},Ee=(e,r)=>{He();const t={target:e,callback:r};de.add(t);const i=Ce(e);if(i){const n=Ye(),{top:s,height:l}=Fe(i,n);r(Ie(n,s,l))}return T(),()=>{de.delete(t)}},yt=e=>(He(),le.add(e),T(),()=>{le.delete(e)}),dt="quickRead",lt=()=>typeof document<"u"&&document.documentElement.dataset.quickRead==="true",At=e=>{const r=new URL(window.location.href);try{localStorage.setItem(dt,e?"1":"0"),r.searchParams.delete("read")}catch{r.searchParams.set("read",e?"1":"0")}window.history.replaceState(window.history.state,"",r),window.location.reload()},ke={en:"Hi, I'm",fi:"Hei, olen"},Qe={en:"Skip to content",fi:"Siirry sisältöön"},Be={en:{name:"Quick read",hint:"The essentials on one page, without the film"},fi:{name:"Pikakatsaus",hint:"Tärkeimmät asiat yhdellä sivulla ilman elokuvaa"}},se=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",Se=[{id:"banana-high",image:"banana-high",size:[365,972],origin:[.567,.959],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15.9},narrow:{x:-6,y:-3,width:32},breathe:[1.3,1.012,9.5,-3]},{id:"palm-high",image:"palm-high",size:[644,784],origin:[.324,.962],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34.8},narrow:{x:104,y:-4,width:71.6},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[654,892],origin:[.5,.617],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:31.1},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[827,883],origin:[.454,.739],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:28.5},narrow:{x:6,y:100,width:73.9},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[401,944],origin:[.101,.96],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:16.4},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[472,598],origin:[.5,.73],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:35.8},narrow:{x:96,y:108,width:77.9},breathe:[1.4,1.018,7,-5]}],Me=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},ht=e=>Array.from({length:e},(r,t)=>{const i=Math.sin(t*12.9898)*43758.5453,n=s=>{const l=Math.sin(i+s*78.233)*43758.5453;return l-Math.floor(l)};return{x:n(1),y:n(2),z:.25+n(3)*.75,phase:n(4)*Math.PI*2,alpha:.3+n(5)*.6}}),ut=(e,r)=>{const t=window;if(t.requestIdleCallback){const n=t.requestIdleCallback(e,{timeout:r});return()=>{var s;return(s=t.cancelIdleCallback)==null?void 0:s.call(t,n)}}const i=window.setTimeout(e,Math.min(r,1200));return()=>window.clearTimeout(i)},mt=()=>{const e=v.useRef(null),r=v.useRef(null),t=v.useRef(null),i=v.useRef(null),n=v.useRef(null),s=v.useRef({}),[l,A]=v.useState(se),[D,u]=v.useState(!1);v.useEffect(()=>{const o=document.documentElement;if(o.dataset.videoReady==="true"){u(!0);return}const d=new MutationObserver(()=>{o.dataset.videoReady==="true"&&u(!0)});d.observe(o,{attributes:!0,attributeFilter:["data-video-ready"]});const m=window.setTimeout(()=>u(!0),3e3);return()=>{d.disconnect(),window.clearTimeout(m)}},[]);const B=ke[l]??ke.en,j=Qe[l]??Qe.en,b=Be[l]??Be.en;v.useEffect(()=>{const o=document.documentElement;A(se());const d=new MutationObserver(()=>{A(se())});return d.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>d.disconnect()},[]),v.useEffect(()=>{const o=e.current;if(!o)return;const d=ne(),m=ue()&&!d,c={x:0,y:0,targetX:0,targetY:0};let w=0,Y={vw:window.innerWidth,vh:window.innerHeight},y=null;const h=Se,S=()=>{const p=d?0:Ve(w),{vw:O,vh:M}=Y,R=d?1:1-U(w,.72,.98);h.forEach(g=>{const P=s.current[g.id];if(!P)return;const _=g.exit.x*O*p+c.x*34,K=g.exit.y*M*p+c.y*22,q=1+(g.exit.scale-1)*p;P.style.transform=`translate3d(${_.toFixed(1)}px, ${K.toFixed(1)}px, 0) rotate(${g.rotate}deg) scale(${g.mirror?-q:q}, ${q})`,P.style.setProperty("--leave",R.toFixed(3))});const X=r.current;if(X){const g=d?0:U(w,.3,.84),P=d?0:w;X.style.transform=`translate3d(${(c.x*10).toFixed(1)}px, ${(c.y*8-P*M*.05).toFixed(1)}px, 0) scale(${(1+.3*p).toFixed(3)})`,X.style.opacity=(1-g).toFixed(3)}const N=t.current;N&&(N.style.transform=`translate3d(${(c.x*14).toFixed(1)}px, ${(w*M*.07).toFixed(1)}px, 0) scale(${(1+.14*w).toFixed(3)})`,N.style.opacity=(d?1:1-U(w,.55,.98)).toFixed(3));const H=i.current;H&&(H.style.transform=`translate3d(${(c.x*6).toFixed(1)}px, 0, 0)`,H.style.opacity=(d?1:1-U(w,.55,.98)).toFixed(3));const J=n.current;J&&J.style.setProperty("--leave",R.toFixed(3))},I=Ee(o,p=>{w=p.pin,Y={vw:p.viewport.vw,vh:p.viewport.vh},S()}),F=()=>{y=null,c.x+=(c.targetX-c.x)*.08,c.y+=(c.targetY-c.y)*.08,S(),(Math.abs(c.targetX-c.x)>.001||Math.abs(c.targetY-c.y)>.001)&&(y=window.requestAnimationFrame(F))},E=p=>{w>=1||(c.targetX=z(p.clientX/Y.vw-.5,-.5,.5),c.targetY=z(p.clientY/Y.vh-.5,-.5,.5),y===null&&(y=window.requestAnimationFrame(F)))};return m&&window.addEventListener("pointermove",E,{passive:!0}),()=>{I(),m&&window.removeEventListener("pointermove",E),y!==null&&window.cancelAnimationFrame(y)}},[]),v.useEffect(()=>{const o=n.current,d=e.current;if(!o||!d)return;const m=o.getContext("2d");if(!m)return;const c=ne(),Y=Ke()==="low"?14:_e()?42:22,y=ht(Y),h=Math.min(window.devicePixelRatio||1,1.5);let S=0,I=0,F=!0,E=null,p=0,O=!1;const M=document.createElement("canvas");M.width=32,M.height=32;const R=M.getContext("2d");(()=>{if(!R)return;const x=R.createRadialGradient(16,16,0,16,16,16),$="255, 238, 196";x.addColorStop(0,`rgba(${$}, 1)`),x.addColorStop(.35,`rgba(${$}, 0.45)`),x.addColorStop(1,`rgba(${$}, 0)`),R.clearRect(0,0,32,32),R.fillStyle=x,R.fillRect(0,0,32,32)})();const N=()=>{S=o.clientWidth,I=o.clientHeight,o.width=Math.round(S*h),o.height=Math.round(I*h),m.setTransform(h,0,0,h,0,0)},H=x=>{m.clearRect(0,0,S,I);const $=x/1e3;y.forEach(L=>{const ze=c?0:$*(.004+L.z*.01),We=c?0:Math.sin($*.6+L.phase)*.012,we=((L.x+We)%1+1)%1*S,Te=c?0:p*L.z*.55;let ee=L.y-ze-Te;ee=(ee%1+1)%1*I;const De=.62-ee/I*.24,pe=Math.max(0,1-Math.abs(we/S-De)/.09),Oe=c?1:.75+.25*Math.sin($*1.7+L.phase*3),te=(1.2+L.z*3.2)*(1+pe*.6);m.globalAlpha=Math.min(1,L.alpha*(.45+pe*1.1)*Oe),m.drawImage(M,we-te,ee-te,te*2,te*2)}),m.globalAlpha=1},J=x=>{E=null,H(x),F&&!document.hidden&&!c&&(E=window.requestAnimationFrame(J))},g=()=>{E===null&&F&&!document.hidden&&(E=window.requestAnimationFrame(J))},P=Ee(d,x=>{p=x.pin}),_=new IntersectionObserver(([x])=>{F=x.isIntersecting,F&&O&&g()});_.observe(d);const K=()=>{!document.hidden&&O&&g()};document.addEventListener("visibilitychange",K);const q=()=>{N(),c&&O&&H(0)};window.addEventListener("resize",q);const $e=ut(()=>{O=!0,N(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),c?H(0):g()},2500);return()=>{P(),_.disconnect(),document.removeEventListener("visibilitychange",K),window.removeEventListener("resize",q),E!==null&&window.cancelAnimationFrame(E),$e()}},[]);const ie=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return a.jsxs(a.Fragment,{children:[a.jsx("a",{className:"cover-skip",href:"#home",children:j}),a.jsxs("div",{id:"cover",ref:e,className:"cover",children:[a.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[a.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),a.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[a.jsxs("div",{ref:t,className:"cover-mist",children:[a.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),a.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),a.jsx("div",{ref:i,className:"cover-shaft"}),a.jsx("canvas",{ref:n,className:"cover-pollen"})]}),a.jsxs("div",{ref:r,className:"cover-copy",children:[a.jsx("img",{alt:"Gábor Ulenius",src:V("profile-160.webp"),srcSet:`${V("profile-160.webp")} 160w, ${V("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),a.jsxs("h1",{id:"cover-heading",className:"cover-greeting",children:[B," ",a.jsx("span",{id:"cover-name",children:"Gábor"})]})]}),a.jsxs("button",{type:"button",className:"cover-quick-read",title:b.hint,onClick:()=>At(!0),children:[a.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:a.jsx("path",{d:"M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"})}),b.name]}),a.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:Se.map(o=>{const[d,m]=o.size,c=o.narrow??o.wide,w=V(`cover/${o.image}.webp`),y=`${V(`cover/${o.image}-sm.webp`)} ${Math.ceil(d/2)}w, ${w} ${d}w`;return a.jsxs("picture",{children:[o.wideOnly&&D?a.jsx("source",{media:"(min-width: 900px)",srcSet:y,sizes:`${o.wide.width}vw`}):null,a.jsx("img",{ref:h=>{s.current[o.id]=h,h!=null&&h.complete&&h.naturalWidth&&Me(h)},className:ie(o),src:D&&!o.wideOnly?w:void 0,srcSet:D&&!o.wideOnly?y:void 0,sizes:`(max-width: 899.95px) ${c.width}vw, ${o.wide.width}vw`,width:d,height:m,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:h=>Me(h.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${c.x}%`,"--ny":`${c.y}%`,"--nw":`${c.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":m/d,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}})]},o.id)})})]}),a.jsx("style",{children:`
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
          color: ${f.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${Je}") center / cover no-repeat;
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
          border: 3px solid ${f.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${f.bgDark};
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
          background: ${f.btnBg};
          color: ${f.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${f.accentHover};
          outline-offset: 3px;
        }
        /* The way to quick read, in the corner of the first screen (the
           bar with its twin comes in once the cover has gone). */
        .cover-quick-read {
          position: absolute;
          top: max(16px, env(safe-area-inset-top));
          right: 16px;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px 9px 13px;
          border: 1px solid ${f.btnBorder};
          border-radius: 999px;
          background: ${f.btnBg};
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          color: ${f.textLight};
          font: 600 0.85rem/1 "Inter", system-ui, sans-serif;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .cover-quick-read svg {
          width: 18px;
          height: 18px;
          fill: ${f.accent};
        }
        .cover-quick-read:hover {
          background: ${f.btnBgHover};
          color: ${f.accentHover};
        }
        .cover-quick-read:focus-visible {
          outline: 2px solid ${f.accentHover};
          outline-offset: 3px;
        }
        @media (min-width: 900px) {
          .cover-quick-read { top: 24px; right: 28px; }
        }
        :root[data-motion="reduced"] .cover { height: 100vh; height: 100lvh; }
        :root[data-motion="reduced"] .cover-mist-band,
        :root[data-motion="reduced"] .cover-shaft { animation: none; }
        :root[data-motion="reduced"] .cover-lqip,
        :root[data-motion="reduced"] .cover-pollen,
        :root[data-motion="reduced"] .cover-layer--leaf { transition: none; }
        :root[data-motion="reduced"] .cover-layer--leaf { animation: none; }
      `})]})]})},wt=Z.lazy(()=>Re(()=>import("./AppShell-D7AqoUP_.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),pt=Z.lazy(()=>Re(()=>import("./QuickReadShell-BNhDmXFj.js"),__vite__mapDeps([9,1,4,5,6,3,2,7,10,11]))),Pe=lt();!Pe&&"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const ft=Ne.createRoot(document.getElementById("root"));ft.render(a.jsx(Z.StrictMode,{children:Pe?a.jsx(Z.Suspense,{fallback:null,children:a.jsx(pt,{})}):a.jsxs(a.Fragment,{children:[a.jsx(mt,{}),a.jsx(Z.Suspense,{fallback:null,children:a.jsx(wt,{})})]})}));export{Re as _,V as a,Ye as b,z as c,T as d,xt as e,U as f,Ke as g,ue as h,_e as i,f as j,At as k,yt as o,ne as p,Ee as r,gt as s,bt as u};
