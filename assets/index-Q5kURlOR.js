const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AppShell-C9JgC7MZ.js","assets/vendor-react-CptINutj.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-icons-B4W1Hm5a.js","assets/vendor-mui-DB0xmhW9.js","assets/AppShell-Be6UrHyU.css"])))=>i.map(i=>d[i]);
import{r as u,j as c,a as ce,d as Oe}from"./vendor-react-CptINutj.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();const Ge="modulepreload",Je=function(e){return"/gaborulenius/"+e},ve={},Ue=function(r,t,i){let n=Promise.resolve();if(t&&t.length>0){let l=function(m){return Promise.all(m.map(B=>Promise.resolve(B).then(j=>({status:"fulfilled",value:j}),j=>({status:"rejected",reason:j}))))};document.getElementsByTagName("link");const A=document.querySelector("meta[property=csp-nonce]"),D=(A==null?void 0:A.nonce)||(A==null?void 0:A.getAttribute("nonce"));n=l(t.map(m=>{if(m=Je(m),m in ve)return;ve[m]=!0;const B=m.endsWith(".css"),j=B?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${j}`))return;const g=document.createElement("link");if(g.rel=B?"stylesheet":Ge,B||(g.as="script"),g.crossOrigin="",g.href=m,D&&g.setAttribute("nonce",D),document.head.appendChild(g),B)return new Promise((J,ie)=>{g.addEventListener("load",J),g.addEventListener("error",()=>ie(new Error(`Unable to preload CSS for ${m}`)))})}))}function a(l){const A=new Event("vite:preloadError",{cancelable:!0});if(A.payload=l,window.dispatchEvent(A),!A.defaultPrevented)throw l}return n.then(l=>{for(const A of l||[])A.status==="rejected"&&a(A.reason);return r().catch(a)})},v={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},V=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Ve="data:image/jpeg;base64,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",z=(e,r=0,t=1)=>Math.min(t,Math.max(r,e)),Z=(e,r,t)=>t===r?e>=t?1:0:z((e-r)/(t-r)),yt=(e,r,t)=>{const i=Z(t,e,r);return i*i*(3-2*i)},bt=e=>1-Math.pow(1-e,3),Ze=e=>e*e*e,Ce="(prefers-reduced-motion: reduce)",Xe="(min-width: 900px)",Ke="(hover: hover) and (pointer: fine)",X=e=>typeof window<"u"&&window.matchMedia(e).matches,oe=()=>typeof document<"u"&&document.documentElement.dataset.motion==="reduced"||X(Ce),_e=()=>X(Ce),et=()=>X(Xe),me=()=>X(Ke),tt=()=>{var a;if(typeof window>"u")return"medium";const e=navigator,r=e.hardwareConcurrency??4,t=e.deviceMemory??8,i=X("(pointer: coarse)"),n=Math.min(window.screen.width,window.screen.height)<820;return(a=e.connection)!=null&&a.saveData||i&&n||t<=2||r<=2?"low":i||t<=4||r<=4?"medium":"high"},rt=.12;let L=0,W=0,Q=0,de=0;const nt=()=>L!==0,ot=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight),it=e=>e.deltaMode===1?e.deltaY*40:e.deltaMode===2?e.deltaY*window.innerHeight:e.deltaY,at=(e,r)=>{let t=e instanceof Element?e:null;for(;t&&t!==document.body&&t!==document.documentElement;){if(t instanceof HTMLElement&&t.scrollHeight>t.clientHeight){const{overflowY:i}=getComputedStyle(t);if((i==="auto"||i==="scroll")&&(r<0?t.scrollTop>0:t.scrollTop+t.clientHeight<t.scrollHeight-1))return!0}t=t.parentElement}return!1},we=()=>{cancelAnimationFrame(L),L=0},Le=e=>{const r=Math.min(.05,(e-de)/1e3);de=e,Q+=(W-Q)*(1-Math.exp(-r/rt)),Math.abs(W-Q)<.5&&(Q=W),window.scrollTo({top:Q,behavior:"instant"}),L=Q===W?0:requestAnimationFrame(Le)},ge=e=>{if(e.defaultPrevented||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||document.body.style.overflow==="hidden")return;const r=it(e);!r||at(e.target,r)||(e.preventDefault(),L||(Q=window.scrollY,W=Q,de=performance.now(),L=requestAnimationFrame(Le)),W=Math.max(0,Math.min(ot(),W+r)))},xe=()=>{L&&Math.abs(window.scrollY-Q)>2&&we()},ne=()=>{L&&we()},Et=()=>{u.useEffect(()=>{if(!(!me()||oe()))return window.addEventListener("wheel",ge,{passive:!1}),window.addEventListener("scroll",xe,{passive:!0}),window.addEventListener("pointerdown",ne,!0),window.addEventListener("keydown",ne,!0),()=>{we(),window.removeEventListener("wheel",ge),window.removeEventListener("scroll",xe),window.removeEventListener("pointerdown",ne,!0),window.removeEventListener("keydown",ne,!0)}},[])},le=new Set,Ae=new Set;let he=null,ye=!1;const st=.09,ct=.02;let k=null,ae=0,be=null;const je=e=>typeof e=="function"?e():e;let G=null,ue=0;const Ye=()=>{G||(G=document.createElement("div"),G.setAttribute("aria-hidden","true"),G.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(G)),ue=G.offsetHeight||window.innerHeight},Ie=()=>{ue||Ye();const e=window.scrollY;return{y:e,smoothY:k??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:ue,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},Ee=()=>{Ye(),T()},dt=(e,r)=>{const t=performance.now(),i=t-ae>100?1/60:(t-ae)/1e3;if(ae=t,k===null||Math.abs(e-k)>r*1.5||oe())k=e;else{be??(be=!me());const n=be||nt()?ct:st;k+=(e-k)*(1-Math.exp(-i/n)),Math.abs(e-k)<.5&&(k=e)}return k},Fe=(e,r,t)=>{const{smoothY:i,vh:n}=e;return{viewport:e,top:r,height:t,pin:z((i-r)/Math.max(1,t-n)),pass:z((i+n-r)/Math.max(1,t+n)),enter:z((i+n-r)/Math.max(1,n)),exit:z((i-(r+t-n))/Math.max(1,n)),near:i+2*n>r&&i-n<r+t}},He=(e,r)=>{const t=e.getBoundingClientRect();return{top:t.top+r.y,height:t.height}},lt=()=>{he=null;const e=Ie(),r={...e,smoothY:dt(e.y,e.vh)},t=[];le.forEach(i=>{const n=je(i.target);if(!n)return;const{top:a,height:l}=He(n,r);t.push([i,a,l])}),t.forEach(([i,n,a])=>{i.callback(Fe(r,n,a))}),Ae.forEach(i=>i(r)),r.smoothY!==r.y&&T()},T=()=>{he!==null||typeof window>"u"||(he=window.requestAnimationFrame(lt))},Pe=()=>{ye||typeof window>"u"||(ye=!0,window.addEventListener("scroll",T,{passive:!0}),window.addEventListener("resize",Ee),window.addEventListener("orientationchange",Ee),window.addEventListener("load",T),"ResizeObserver"in window&&new ResizeObserver(T).observe(document.documentElement))},ke=(e,r)=>{Pe();const t={target:e,callback:r};le.add(t);const i=je(e);if(i){const n=Ie(),{top:a,height:l}=He(i,n);r(Fe(n,a,l))}return T(),()=>{le.delete(t)}},kt=e=>(Pe(),Ae.add(e),T(),()=>{Ae.delete(e)}),At="quickRead",ht=()=>typeof document<"u"&&document.documentElement.dataset.quickRead==="true",ut=()=>!_e(),mt=e=>{const r=new URL(window.location.href);try{localStorage.setItem(At,e?"1":"0"),r.searchParams.delete("read")}catch{r.searchParams.set("read",e?"1":"0")}window.history.replaceState(window.history.state,"",r),window.location.reload()},Qe={en:"Hi, I'm",fi:"Hei, olen"},Be={en:"Skip to content",fi:"Siirry sisältöön"},Se={en:{name:"Quick read",on:"Show everything on one calm page, without the film",off:"Back to the film journey"},fi:{name:"Pikaluku",on:"Näytä kaikki yhdellä rauhallisella sivulla ilman elokuvaa",off:"Takaisin elokuvamatkaan"}},se=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",Me=[{id:"banana-high",image:"banana-high",size:[365,972],origin:[.567,.959],rotate:128,exit:{x:-.36,y:-.5,scale:1.4},wide:{x:-3,y:-4,width:15.9},narrow:{x:-6,y:-3,width:32},breathe:[1.3,1.012,9.5,-3]},{id:"palm-high",image:"palm-high",size:[644,784],origin:[.324,.962],rotate:206,exit:{x:.34,y:-.5,scale:1.4},wide:{x:96,y:-8,width:34.8},narrow:{x:104,y:-4,width:71.6},breathe:[1.6,1.014,7.5,-1]},{id:"alocasia",image:"alocasia",size:[654,892],origin:[.5,.617],rotate:-52,exit:{x:.5,y:.35,scale:1.5},wide:{x:104,y:78,width:31.1},breathe:[1.1,1.015,8.5,-4],wideOnly:!0},{id:"monstera",image:"monstera",size:[827,883],origin:[.454,.739],rotate:16,exit:{x:-.5,y:.35,scale:1.5},wide:{x:11,y:100,width:28.5},narrow:{x:6,y:100,width:73.9},breathe:[.9,1.016,10.5,-6]},{id:"fern-near",image:"fern-near",size:[401,944],origin:[.101,.96],rotate:118,exit:{x:-.6,y:.5,scale:1.7},wide:{x:-2,y:62,width:16.4},breathe:[1.8,1.02,6.5,-2],wideOnly:!0},{id:"heart-near",image:"heart-near",size:[472,598],origin:[.5,.73],rotate:-28,exit:{x:.6,y:.6,scale:1.7},wide:{x:90,y:116,width:35.8},narrow:{x:96,y:108,width:77.9},breathe:[1.4,1.018,7,-5]}],Re=e=>{e.dataset.ready!=="true"&&(e.dataset.ready="true",window.setTimeout(()=>{e.dataset.settled="true"},1500))},wt=e=>Array.from({length:e},(r,t)=>{const i=Math.sin(t*12.9898)*43758.5453,n=a=>{const l=Math.sin(i+a*78.233)*43758.5453;return l-Math.floor(l)};return{x:n(1),y:n(2),z:.25+n(3)*.75,phase:n(4)*Math.PI*2,alpha:.3+n(5)*.6}}),pt=(e,r)=>{const t=window;if(t.requestIdleCallback){const n=t.requestIdleCallback(e,{timeout:r});return()=>{var a;return(a=t.cancelIdleCallback)==null?void 0:a.call(t,n)}}const i=window.setTimeout(e,Math.min(r,1200));return()=>window.clearTimeout(i)},ft=()=>{const e=u.useRef(null),r=u.useRef(null),t=u.useRef(null),i=u.useRef(null),n=u.useRef(null),a=u.useRef({}),[l,A]=u.useState(se),[D,m]=u.useState(!1);u.useEffect(()=>{const o=document.documentElement;if(o.dataset.videoReady==="true"){m(!0);return}const d=new MutationObserver(()=>{o.dataset.videoReady==="true"&&m(!0)});d.observe(o,{attributes:!0,attributeFilter:["data-video-ready"]});const w=window.setTimeout(()=>m(!0),3e3);return()=>{d.disconnect(),window.clearTimeout(w)}},[]);const B=Qe[l]??Qe.en,j=Be[l]??Be.en,g=Se[l]??Se.en,[J]=u.useState(ht),[ie]=u.useState(ut);u.useEffect(()=>{const o=document.documentElement;A(se());const d=new MutationObserver(()=>{A(se())});return d.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>d.disconnect()},[]),u.useEffect(()=>{const o=e.current;if(!o)return;const d=oe(),w=me()&&!d,s={x:0,y:0,targetX:0,targetY:0};let p=0,Y={vw:window.innerWidth,vh:window.innerHeight},b=null;const h=Me,S=()=>{const f=d?0:Ze(p),{vw:q,vh:M}=Y,R=d?1:1-Z(p,.72,.98);h.forEach(x=>{const P=a.current[x.id];if(!P)return;const _=x.exit.x*q*f+s.x*34,ee=x.exit.y*M*f+s.y*22,O=1+(x.exit.scale-1)*f;P.style.transform=`translate3d(${_.toFixed(1)}px, ${ee.toFixed(1)}px, 0) rotate(${x.rotate}deg) scale(${x.mirror?-O:O}, ${O})`,P.style.setProperty("--leave",R.toFixed(3))});const K=r.current;if(K){const x=d?0:Z(p,.3,.84),P=d?0:p;K.style.transform=`translate3d(${(s.x*10).toFixed(1)}px, ${(s.y*8-P*M*.05).toFixed(1)}px, 0) scale(${(1+.3*f).toFixed(3)})`,K.style.opacity=(1-x).toFixed(3)}const N=t.current;N&&(N.style.transform=`translate3d(${(s.x*14).toFixed(1)}px, ${(p*M*.07).toFixed(1)}px, 0) scale(${(1+.14*p).toFixed(3)})`,N.style.opacity=(d?1:1-Z(p,.55,.98)).toFixed(3));const H=i.current;H&&(H.style.transform=`translate3d(${(s.x*6).toFixed(1)}px, 0, 0)`,H.style.opacity=(d?1:1-Z(p,.55,.98)).toFixed(3));const U=n.current;U&&U.style.setProperty("--leave",R.toFixed(3))},I=ke(o,f=>{p=f.pin,Y={vw:f.viewport.vw,vh:f.viewport.vh},S()}),F=()=>{b=null,s.x+=(s.targetX-s.x)*.08,s.y+=(s.targetY-s.y)*.08,S(),(Math.abs(s.targetX-s.x)>.001||Math.abs(s.targetY-s.y)>.001)&&(b=window.requestAnimationFrame(F))},E=f=>{p>=1||(s.targetX=z(f.clientX/Y.vw-.5,-.5,.5),s.targetY=z(f.clientY/Y.vh-.5,-.5,.5),b===null&&(b=window.requestAnimationFrame(F)))};return w&&window.addEventListener("pointermove",E,{passive:!0}),()=>{I(),w&&window.removeEventListener("pointermove",E),b!==null&&window.cancelAnimationFrame(b)}},[]),u.useEffect(()=>{const o=n.current,d=e.current;if(!o||!d)return;const w=o.getContext("2d");if(!w)return;const s=oe(),Y=tt()==="low"?14:et()?42:22,b=wt(Y),h=Math.min(window.devicePixelRatio||1,1.5);let S=0,I=0,F=!0,E=null,f=0,q=!1;const M=document.createElement("canvas");M.width=32,M.height=32;const R=M.getContext("2d");(()=>{if(!R)return;const y=R.createRadialGradient(16,16,0,16,16,16),$="255, 238, 196";y.addColorStop(0,`rgba(${$}, 1)`),y.addColorStop(.35,`rgba(${$}, 0.45)`),y.addColorStop(1,`rgba(${$}, 0)`),R.clearRect(0,0,32,32),R.fillStyle=y,R.fillRect(0,0,32,32)})();const N=()=>{S=o.clientWidth,I=o.clientHeight,o.width=Math.round(S*h),o.height=Math.round(I*h),w.setTransform(h,0,0,h,0,0)},H=y=>{w.clearRect(0,0,S,I);const $=y/1e3;b.forEach(C=>{const We=s?0:$*(.004+C.z*.01),Te=s?0:Math.sin($*.6+C.phase)*.012,pe=((C.x+Te)%1+1)%1*S,De=s?0:f*C.z*.55;let te=C.y-We-De;te=(te%1+1)%1*I;const qe=.62-te/I*.24,fe=Math.max(0,1-Math.abs(pe/S-qe)/.09),Ne=s?1:.75+.25*Math.sin($*1.7+C.phase*3),re=(1.2+C.z*3.2)*(1+fe*.6);w.globalAlpha=Math.min(1,C.alpha*(.45+fe*1.1)*Ne),w.drawImage(M,pe-re,te-re,re*2,re*2)}),w.globalAlpha=1},U=y=>{E=null,H(y),F&&!document.hidden&&!s&&(E=window.requestAnimationFrame(U))},x=()=>{E===null&&F&&!document.hidden&&(E=window.requestAnimationFrame(U))},P=ke(d,y=>{f=y.pin}),_=new IntersectionObserver(([y])=>{F=y.isIntersecting,F&&q&&x()});_.observe(d);const ee=()=>{!document.hidden&&q&&x()};document.addEventListener("visibilitychange",ee);const O=()=>{N(),s&&q&&H(0)};window.addEventListener("resize",O);const ze=pt(()=>{q=!0,N(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),s?H(0):x()},2500);return()=>{P(),_.disconnect(),document.removeEventListener("visibilitychange",ee),window.removeEventListener("resize",O),E!==null&&window.cancelAnimationFrame(E),ze()}},[]);const $e=o=>`cover-layer cover-layer--leaf cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return c.jsxs(c.Fragment,{children:[c.jsx("a",{className:"cover-skip",href:"#home",children:j}),c.jsxs("div",{id:"cover",ref:e,className:"cover",children:[c.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[c.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),c.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[c.jsxs("div",{ref:t,className:"cover-mist",children:[c.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),c.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),c.jsx("div",{ref:i,className:"cover-shaft"}),c.jsx("canvas",{ref:n,className:"cover-pollen"})]}),c.jsxs("div",{ref:r,className:"cover-copy",children:[c.jsx("img",{alt:"Gábor Ulenius",src:V("profile-160.webp"),srcSet:`${V("profile-160.webp")} 160w, ${V("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),c.jsxs("h1",{id:"cover-heading",className:"cover-greeting",children:[B," ",c.jsx("span",{id:"cover-name",children:"Gábor"})]})]}),ie?c.jsxs("button",{type:"button",className:"cover-quick-read","aria-pressed":J,title:J?g.off:g.on,onClick:()=>mt(!J),children:[c.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",children:c.jsx("path",{d:"M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"})}),g.name]}):null,c.jsx("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:Me.map(o=>{const[d,w]=o.size,s=o.narrow??o.wide,p=V(`cover/${o.image}.webp`),b=`${V(`cover/${o.image}-sm.webp`)} ${Math.ceil(d/2)}w, ${p} ${d}w`;return c.jsxs("picture",{children:[o.wideOnly&&D?c.jsx("source",{media:"(min-width: 900px)",srcSet:b,sizes:`${o.wide.width}vw`}):null,c.jsx("img",{ref:h=>{a.current[o.id]=h,h!=null&&h.complete&&h.naturalWidth&&Re(h)},className:$e(o),src:D&&!o.wideOnly?p:void 0,srcSet:D&&!o.wideOnly?b:void 0,sizes:`(max-width: 899.95px) ${s.width}vw, ${o.wide.width}vw`,width:d,height:w,alt:"",decoding:"async",fetchPriority:"low",draggable:!1,onLoad:h=>Re(h.currentTarget),style:{"--x":`${o.wide.x}%`,"--y":`${o.wide.y}%`,"--w":`${o.wide.width}vw`,"--nx":`${s.x}%`,"--ny":`${s.y}%`,"--nw":`${s.width}vw`,"--ox":o.origin[0],"--oy":o.origin[1],"--aspect":w/d,"--breath-turn":`${o.breathe[0]}deg`,"--breath-grow":o.breathe[1],"--breath-period":`${o.breathe[2]}s`,"--breath-delay":`${o.breathe[3]}s`}})]},o.id)})})]}),c.jsx("style",{children:`
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
          color: ${v.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${Ve}") center / cover no-repeat;
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
          border: 3px solid ${v.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${v.bgDark};
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
          background: ${v.btnBg};
          color: ${v.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${v.accentHover};
          outline-offset: 3px;
        }
        /* The quick read switch, in the corner of the first screen (the
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
          border: 1px solid ${v.btnBorder};
          border-radius: 999px;
          background: ${v.btnBg};
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          color: ${v.textLight};
          font: 600 0.85rem/1 "Inter", system-ui, sans-serif;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .cover-quick-read svg {
          width: 18px;
          height: 18px;
          fill: ${v.accent};
        }
        .cover-quick-read:hover,
        .cover-quick-read[aria-pressed="true"] {
          background: ${v.btnBgHover};
          color: ${v.accentHover};
        }
        .cover-quick-read:focus-visible {
          outline: 2px solid ${v.accentHover};
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
      `})]})]})},vt=ce.lazy(()=>Ue(()=>import("./AppShell-C9JgC7MZ.js").then(e=>e.A),__vite__mapDeps([0,1,2,3,4,5,6])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const gt=Oe.createRoot(document.getElementById("root"));gt.render(c.jsxs(ce.StrictMode,{children:[c.jsx(ft,{}),c.jsx(ce.Suspense,{fallback:null,children:c.jsx(vt,{})})]}));export{Ue as _,V as a,Ie as b,z as c,T as d,bt as e,Z as f,tt as g,me as h,et as i,v as j,ut as k,ht as l,mt as m,kt as o,oe as p,ke as r,yt as s,Et as u};
