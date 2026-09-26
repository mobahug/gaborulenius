const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/bananaLeaf-BfIOpky3.js","assets/vendor-react-CptINutj.js","assets/AppShell-qsqB1DIu.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-icons-ByeSausi.js","assets/vendor-mui-DGcXVZTA.js","assets/AppShell-Cex7-Uvz.css"])))=>i.map(i=>d[i]);
import{r as $,j as l,a as ne,d as je}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}})();const Le="modulepreload",$e=function(e){return"/gaborulenius/"+e},le={},we=function(n,t,i){let r=Promise.resolve();if(t&&t.length>0){let d=function(g){return Promise.all(g.map(S=>Promise.resolve(S).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};document.getElementsByTagName("link");const f=document.querySelector("meta[property=csp-nonce]"),L=(f==null?void 0:f.nonce)||(f==null?void 0:f.getAttribute("nonce"));r=d(t.map(g=>{if(g=$e(g),g in le)return;le[g]=!0;const S=g.endsWith(".css"),o=S?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${o}`))return;const s=document.createElement("link");if(s.rel=S?"stylesheet":Le,S||(s.as="script"),s.crossOrigin="",s.href=g,L&&s.setAttribute("nonce",L),document.head.appendChild(s),S)return new Promise((A,a)=>{s.addEventListener("load",A),s.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${g}`)))})}))}function c(d){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=d,window.dispatchEvent(f),!f.defaultPrevented)throw d}return r.then(d=>{for(const f of d||[])f.status==="rejected"&&c(f.reason);return n().catch(c)})},U={bgDark:"#1e2a20",textLight:"#f2f3ef",textLightRgb:"242, 243, 239",textHeading:"#d8d8b4",accent:"#c0cc9c",accentHover:"#c8e59f",glassBg:"rgba(255, 255, 255, 0.05)",glassBorder:"rgba(255, 255, 255, 0.08)",navBg:"rgba(30, 42, 32, 0.9)",drawerBg:"rgba(30, 42, 32, 0.98)",overlayBg:"rgba(0, 0, 0, 0.4)",dividerBg:"rgba(255, 255, 255, 0.2)",btnBg:"#3a5223",btnBgHover:"#4c6e36"},Z=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,T=(e,n=0,t=1)=>Math.min(t,Math.max(n,e)),X=(e,n,t)=>t===n?e>=t?1:0:T((e-n)/(t-n)),Ge=(e,n,t)=>{const i=X(t,e,n);return i*i*(3-2*i)},Je=e=>1-Math.pow(1-e,3),Oe=e=>e*e*e,ke=e=>{let n=e>>>0;return()=>{n+=1831565813;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}},Ae=e=>`M${e.map(([n,t])=>`${n.toFixed(1)} ${t.toFixed(1)}`).join("L")}Z`,ze=({length:e,leaflets:n,leafletLength:t,leafletWidth:i,bend:r,seed:c})=>{const d=ke(c),f=s=>[r*e*s*s,-e*s],L=s=>{const A=2*r*e*s,a=-e,u=Math.hypot(A,a);return[A/u,a/u]},g=[],S=[],o=[];for(let s=0;s<=16;s+=1){const A=s/16,[a,u]=f(A),[B,p]=L(A),w=i*.12*(1-A*.85);S.push([a-p*w,u+B*w]),o.push([a+p*w,u-B*w])}g.push(Ae([...S,...o.reverse()]));for(let s=0;s<n;s+=1){const A=.08+s/n*.9,[a,u]=f(A),[B,p]=L(A),w=1-Math.pow(A,1.6)*.75;[-1,1].forEach(M=>{const v=(.95+d()*.3)*M,F=Math.cos(v),x=Math.sin(v),h=B*F-p*x,y=B*x+p*F+.35,b=Math.hypot(h,y),R=h/b,z=y/b,I=-z,O=R,N=t*w*(.85+d()*.3),m=i*w*.5,E=(P,Y)=>[a+R*N*P+I*Y,u+z*N*P+O*Y];g.push(Ae([E(0,0),E(.25,m*.9),E(.6,m*.75),E(1,0),E(.6,-m*.55),E(.25,-m*.7)]))})}return g.join("")},Ie="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAbADADASIAAhEBAxEB/8QAGgAAAwADAQAAAAAAAAAAAAAAAwQFAQIGB//EACgQAAIBAwMCBgMBAAAAAAAAAAECAwARIQQSMRNRBQZBgZHRYXHh8P/EABgBAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAERAhIhMf/aAAwDAQACEQMRAD8A8+hVFSRABm1r5NMIFgkUM29jYkA3Av6XFSo5NkhVcdjVKJ3BUic7SoLqSbqR6H2NczUInSeX8ahRp5ujMbjc1/gWo3miPSQSJBEtyi2lkBvvb6qf4LrXTVl1IBybgWsfUgd6T8U1jSTEu5ycnn4pOX3Q3yEjWodm5cAqDkW75/3elIGAiI5IbFGnkDJbnFsn80kjOA4W3PfirI31DK6Zi42HcGtm/ArcX02sMXVwCOL2J/lKiR4pAsbsq34Bp/TSs+jkjfayxlSoKg2uaXVQUijo3nZnYlyii1yb7cWAv+hb2qfqJS0rb3wM8XvVrwXSQTQTdSMHbGSMnkW+65zVMWYM2SW5pMuuD6wkgU0nV3OAAoOQMUBwvTuGyeQKzNl5CckGtQAwdjziroRH/9k=",Ne="(prefers-reduced-motion: reduce)",Ce="(min-width: 900px)",Qe="(hover: hover) and (pointer: fine)",J=e=>typeof window<"u"&&window.matchMedia(e).matches,re=()=>J(Ne),de=()=>J(Ce),De=()=>J(Qe),Pe=()=>{var c;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,t=e.deviceMemory??8,i=J("(pointer: coarse)"),r=Math.min(window.screen.width,window.screen.height)<820;return(c=e.connection)!=null&&c.saveData||i&&r||t<=2||n<=2?"low":i||t<=4||n<=4?"medium":"high"},oe=new Set,se=new Set;let ie=null,he=!1;const Ye=.09;let k=null,K=0;const ge=e=>typeof e=="function"?e():e,pe=()=>{const e=window.innerHeight,n=window.scrollY;return{y:n,smoothY:k??n,vw:document.documentElement.clientWidth||window.innerWidth,vh:e,maxY:Math.max(0,document.documentElement.scrollHeight-e)}},We=(e,n)=>{const t=performance.now(),i=t-K>100?1/60:(t-K)/1e3;return K=t,k===null||Math.abs(e-k)>n*1.5||re()?k=e:(k+=(e-k)*(1-Math.exp(-i/Ye)),Math.abs(e-k)<.5&&(k=e)),k},xe=(e,n,t)=>{const{smoothY:i,vh:r}=e;return{viewport:e,top:n,height:t,pin:T((i-n)/Math.max(1,t-r)),pass:T((i+r-n)/Math.max(1,t+r)),enter:T((i+r-n)/Math.max(1,r)),exit:T((i-(n+t-r))/Math.max(1,r)),near:i+2*r>n&&i-r<n+t}},ye=(e,n)=>{const t=e.getBoundingClientRect();return{top:t.top+n.y,height:t.height}},Te=()=>{ie=null;const e=pe(),n={...e,smoothY:We(e.y,e.vh)},t=[];oe.forEach(i=>{const r=ge(i.target);if(!r)return;const{top:c,height:d}=ye(r,n);t.push([i,c,d])}),t.forEach(([i,r,c])=>{i.callback(xe(n,r,c))}),se.forEach(i=>i(n)),n.smoothY!==n.y&&D()},D=()=>{ie!==null||typeof window>"u"||(ie=window.requestAnimationFrame(Te))},be=()=>{he||typeof window>"u"||(he=!0,window.addEventListener("scroll",D,{passive:!0}),window.addEventListener("resize",D),window.addEventListener("orientationchange",D),window.addEventListener("load",D),"ResizeObserver"in window&&new ResizeObserver(D).observe(document.documentElement))},ue=(e,n)=>{be();const t={target:e,callback:n};oe.add(t);const i=ge(e);if(i){const r=pe(),{top:c,height:d}=ye(i,r);n(xe(r,c,d))}return D(),()=>{oe.delete(t)}},Ze=e=>(be(),se.add(e),D(),()=>{se.delete(e)}),fe={en:"Hi, I'm Gábor",fi:"Hei, olen Gábor"},me={en:"Skip to content",fi:"Siirry sisältöön"},ee=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",te=[{id:"leaf-rear",rotate:0,exit:{x:.4,y:.45,scale:1.35},sway:[.8,9.5,-3],wideOnly:!0,spec:{baseX:.92,baseY:1.1,angle:-.42,bend:-.95,length:.8,halfWidth:.13,tears:10,seed:41,backlight:.22,shade:.78,turn:.35,blur:3.5}},{id:"leaf-high",rotate:0,exit:{x:.34,y:-.5,scale:1.4},sway:[1.4,7.5,-2],spec:{baseX:1.02,baseY:-.1,angle:-2.45,bend:-.7,length:.95,halfWidth:.18,tears:13,seed:29,backlight:.95,turn:.1,blur:1.2}},{id:"leaf-near",rotate:0,exit:{x:.5,y:.5,scale:1.5},sway:[1,8.5,-5],spec:{baseX:.97,baseY:1.08,angle:-.8,bend:-.6,length:.72,halfWidth:.12,tears:14,seed:11,backlight:.3,shade:.6,turn:.25,blur:1.2},narrow:{angle:-.74,length:.74,halfWidth:.15,tears:12,blur:1}},{id:"leaf-low",rotate:0,exit:{x:-.5,y:.4,scale:1.5},sway:[1.2,6.5,-1],wideOnly:!0,spec:{baseX:.05,baseY:1.08,angle:.72,bend:.55,length:.66,halfWidth:.12,tears:12,seed:3,backlight:.26,shade:.65,turn:.3,blur:1.6}}],_=1e3,Q=300,He=(e,n,t,i,r,c={})=>{const d=Math.min(-Q,t*_-Q),f=Math.max(Q,t*_+Q),L={x:d,y:-_-Q*.4,width:f-d,height:_+Q*.9};return{id:e,path:ze({length:_,leaflets:15,leafletLength:Q,leafletWidth:56,bend:t,seed:n}),box:L,origin:[-d/L.width*100,(_+Q*.4)/L.height*100],rotate:i,exit:r,...c}},ve=[He("fern-left",71,.28,-156,{x:-.32,y:-.42,scale:1.6},{mirror:!0,wideOnly:!0})],Ue=e=>Array.from({length:e},(n,t)=>{const i=Math.sin(t*12.9898)*43758.5453,r=c=>{const d=Math.sin(i+c*78.233)*43758.5453;return d-Math.floor(d)};return{x:r(1),y:r(2),z:.25+r(3)*.75,phase:r(4)*Math.PI*2,alpha:.3+r(5)*.6}}),G=(e,n)=>{const t=window;if(t.requestIdleCallback){const r=t.requestIdleCallback(e,{timeout:n});return()=>{var c;return(c=t.cancelIdleCallback)==null?void 0:c.call(t,r)}}const i=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(i)},_e=()=>{const e=$.useRef(null),n=$.useRef(null),t=$.useRef(null),i=$.useRef(null),r=$.useRef(null),c=$.useRef({}),[d,f]=$.useState(ee),L=fe[d]??fe.en,g=me[d]??me.en;$.useEffect(()=>{const o=document.documentElement;f(ee());const s=new MutationObserver(()=>{f(ee())});return s.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>s.disconnect()},[]),$.useEffect(()=>{const o=e.current;if(!o)return;const s=re(),A=De()&&!s,a={x:0,y:0,targetX:0,targetY:0};let u=0,B={vw:window.innerWidth,vh:window.innerHeight},p=null;const w=[...te,...ve],M=()=>{const h=s?0:Oe(u),{vw:y,vh:b}=B,R=s?1:1-X(u,.72,.98);w.forEach(m=>{const E=c.current[m.id];if(!E)return;const P=m.exit.x*y*h+a.x*34,Y=m.exit.y*b*h+a.y*22,H=1+(m.exit.scale-1)*h;E.style.transform=`translate3d(${P.toFixed(1)}px, ${Y.toFixed(1)}px, 0) rotate(${m.rotate}deg) scale(${m.mirror?-H:H}, ${H})`,E.style.setProperty("--leave",R.toFixed(3))});const z=n.current;if(z){const m=s?0:X(u,.3,.84),E=s?0:u;z.style.transform=`translate3d(${(a.x*10).toFixed(1)}px, ${(a.y*8-E*b*.05).toFixed(1)}px, 0) scale(${(1+.3*h).toFixed(3)})`,z.style.opacity=(1-m).toFixed(3),z.style.filter=m>.01?`blur(${(m*6).toFixed(2)}px)`:""}const I=t.current;I&&(I.style.transform=`translate3d(${(a.x*14).toFixed(1)}px, ${(u*b*.07).toFixed(1)}px, 0) scale(${(1+.14*u).toFixed(3)})`,I.style.opacity=(s?1:1-X(u,.55,.98)).toFixed(3));const O=i.current;O&&(O.style.transform=`translate3d(${(a.x*6).toFixed(1)}px, 0, 0)`,O.style.opacity=(s?1:1-X(u,.55,.98)).toFixed(3));const N=r.current;N&&N.style.setProperty("--leave",R.toFixed(3))},v=ue(o,h=>{u=h.pin,B={vw:h.viewport.vw,vh:h.viewport.vh},M()}),F=()=>{p=null,a.x+=(a.targetX-a.x)*.08,a.y+=(a.targetY-a.y)*.08,M(),(Math.abs(a.targetX-a.x)>.001||Math.abs(a.targetY-a.y)>.001)&&(p=window.requestAnimationFrame(F))},x=h=>{u>=1||(a.targetX=T(h.clientX/B.vw-.5,-.5,.5),a.targetY=T(h.clientY/B.vh-.5,-.5,.5),p===null&&(p=window.requestAnimationFrame(F)))};return A&&window.addEventListener("pointermove",x,{passive:!0}),()=>{v(),A&&window.removeEventListener("pointermove",x),p!==null&&window.cancelAnimationFrame(p)}},[]),$.useEffect(()=>{let o=!1,s=()=>{},A=null,a=0;const u=()=>{s();const v=de(),F=te.filter(h=>v||!h.wideOnly),x=()=>{const h=F.shift();if(!h){A==null||A.releaseLeafRenderer();return}if(o||!A)return;const y=c.current[h.id],b=v?h.spec:{...h.spec,...h.narrow},R=Math.min(window.devicePixelRatio||1,(b.blur??0)>2?1:1.5);y&&A.paintBananaLeaf(y,b,R)&&y.dataset.ready!=="true"&&(y.dataset.ready="true",window.setTimeout(()=>{y.dataset.settled="true"},1300)),s=G(x,600)};s=G(x,2e3)},p=G(()=>{we(()=>import("./bananaLeaf-BfIOpky3.js"),__vite__mapDeps([0,1])).then(v=>{o||(A=v,u())})},2e3);let w=`${window.innerWidth}`;const M=()=>{const v=`${window.innerWidth}`;v===w||!A||(w=v,window.clearTimeout(a),a=window.setTimeout(u,250))};return window.addEventListener("resize",M),()=>{o=!0,p(),s(),window.clearTimeout(a),window.removeEventListener("resize",M)}},[]),$.useEffect(()=>{const o=r.current,s=e.current;if(!o||!s)return;const A=o.getContext("2d");if(!A)return;const a=re(),B=Pe()==="low"?14:de()?42:22,p=Ue(B),w=Math.min(window.devicePixelRatio||1,1.5);let M=0,v=0,F=!0,x=null,h=0,y=!1;const b=document.createElement("canvas");b.width=32,b.height=32;const R=b.getContext("2d");(()=>{if(!R)return;const j=R.createRadialGradient(16,16,0,16,16,16),W="255, 238, 196";j.addColorStop(0,`rgba(${W}, 1)`),j.addColorStop(.35,`rgba(${W}, 0.45)`),j.addColorStop(1,`rgba(${W}, 0)`),R.clearRect(0,0,32,32),R.fillStyle=j,R.fillRect(0,0,32,32)})();const I=()=>{M=o.clientWidth,v=o.clientHeight,o.width=Math.round(M*w),o.height=Math.round(v*w),A.setTransform(w,0,0,w,0,0)},O=j=>{A.clearRect(0,0,M,v);const W=j/1e3;p.forEach(C=>{const Be=a?0:W*(.004+C.z*.01),Me=a?0:Math.sin(W*.6+C.phase)*.012,ae=((C.x+Me)%1+1)%1*M,Re=a?0:h*C.z*.55;let V=C.y-Be-Re;V=(V%1+1)%1*v;const Se=.62-V/v*.24,ce=Math.max(0,1-Math.abs(ae/M-Se)/.09),Fe=a?1:.75+.25*Math.sin(W*1.7+C.phase*3),q=(1.2+C.z*3.2)*(1+ce*.6);A.globalAlpha=Math.min(1,C.alpha*(.45+ce*1.1)*Fe),A.drawImage(b,ae-q,V-q,q*2,q*2)}),A.globalAlpha=1},N=j=>{x=null,O(j),F&&!document.hidden&&!a&&(x=window.requestAnimationFrame(N))},m=()=>{x===null&&F&&!document.hidden&&(x=window.requestAnimationFrame(N))},E=ue(s,j=>{h=j.pin}),P=new IntersectionObserver(([j])=>{F=j.isIntersecting,F&&y&&m()});P.observe(s);const Y=()=>{!document.hidden&&y&&m()};document.addEventListener("visibilitychange",Y);const H=()=>{I(),a&&y&&O(0)};window.addEventListener("resize",H);const Ee=G(()=>{y=!0,I(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),a?O(0):m()},2500);return()=>{E(),P.disconnect(),document.removeEventListener("visibilitychange",Y),window.removeEventListener("resize",H),x!==null&&window.cancelAnimationFrame(x),Ee()}},[]);const S=(o,s)=>`cover-layer cover-layer--${s} cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return l.jsxs(l.Fragment,{children:[l.jsx("a",{className:"cover-skip",href:"#home",children:g}),l.jsxs("div",{id:"cover",ref:e,className:"cover",children:[l.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[l.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),l.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[l.jsxs("div",{ref:t,className:"cover-mist",children:[l.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),l.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),l.jsx("div",{ref:i,className:"cover-shaft"}),l.jsx("canvas",{ref:r,className:"cover-pollen"})]}),l.jsxs("div",{ref:n,className:"cover-copy",children:[l.jsx("img",{alt:"Gábor Ulenius",src:Z("profile-160.webp"),srcSet:`${Z("profile-160.webp")} 160w, ${Z("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),l.jsx("h1",{id:"cover-heading",className:"cover-greeting",children:L})]}),l.jsxs("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:[l.jsx("svg",{className:"cover-defs",width:"0",height:"0",focusable:"false",children:l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"cover-fern-fill",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0",className:"cover-stop-top"}),l.jsx("stop",{offset:"1",className:"cover-stop-bottom"})]}),l.jsx("filter",{id:"cover-fern-blur",x:"-10%",y:"-10%",width:"120%",height:"120%",children:l.jsx("feGaussianBlur",{stdDeviation:"6"})})]})}),ve.map(o=>l.jsx("div",{ref:s=>{c.current[o.id]=s},className:S(o,"fern"),style:{aspectRatio:`${o.box.width} / ${o.box.height}`,transformOrigin:`${o.origin[0].toFixed(2)}% ${o.origin[1].toFixed(2)}%`,transform:`rotate(${o.rotate}deg) scale(${o.mirror?-1:1}, 1)`},children:l.jsx("svg",{viewBox:`${o.box.x.toFixed(1)} ${o.box.y.toFixed(1)} ${o.box.width.toFixed(1)} ${o.box.height.toFixed(1)}`,focusable:"false",children:l.jsx("path",{d:o.path,fill:"url(#cover-fern-fill)",filter:"url(#cover-fern-blur)"})})},o.id)),te.map(o=>l.jsx("canvas",{ref:s=>{c.current[o.id]=s},className:S(o,"banana"),style:{"--sway":`${o.sway[0]}deg`,"--sway-period":`${o.sway[1]}s`,"--sway-delay":`${o.sway[2]}s`,transformOrigin:`${(o.spec.baseX*100).toFixed(1)}% ${(o.spec.baseY*100).toFixed(1)}%`}},o.id))]})]}),l.jsx("style",{children:`
        .cover {
          position: relative;
          z-index: 1;
          height: 180vh;
          height: 180svh;
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
          color: ${U.textLight};
          --fern-top: #16301d;
          --fern-bottom: #050c07;
        }
        .cover-stop-top { stop-color: var(--fern-top); }
        .cover-stop-bottom { stop-color: var(--fern-bottom); }
        .cover-defs { position: absolute; width: 0; height: 0; }
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
        .cover-layer--fern { opacity: calc(0.9 * var(--leave, 1)); }
        .cover-layer--fern svg { display: block; width: 100%; height: 100%; overflow: visible; }
        .cover-layer--banana {
          opacity: 0;
          transition: opacity 1.2s ease;
          animation: cover-leaf-sway var(--sway-period, 8s) ease-in-out var(--sway-delay, 0s) infinite alternate;
        }
        .cover-layer--banana[data-ready="true"] { opacity: var(--leave, 1); }
        .cover-layer--banana[data-settled="true"],
        .cover-pollen[data-settled="true"] { transition: none; }
        @keyframes cover-leaf-sway {
          from { rotate: calc(var(--sway, 1deg) * -1); }
          to { rotate: var(--sway, 1deg); }
        }
        .cover-layer--leaf-rear { right: -2vw; bottom: 0; width: 30vw; height: 82vh; }
        .cover-layer--leaf-high { right: 0; top: 0; width: 38vw; height: 58vh; }
        .cover-layer--leaf-near { right: -4vw; bottom: 0; width: 40vw; height: 100vh; }
        .cover-layer--leaf-low { left: -6vw; bottom: 0; width: 32vw; height: 92vh; }
        .cover-layer--fern-left { height: 78vh; left: 4vw; top: -62vh; }
        @media (max-width: 899.95px) {
          .cover { height: 150vh; height: 150svh; }
          .cover-layer--wide-only { display: none; }
          .cover-layer--leaf-high { right: -8vw; top: 0; width: 64vw; height: 36vh; }
          .cover-layer--leaf-near { right: -12vw; bottom: 0; width: 96vw; height: 50vh; }
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
        @media (prefers-reduced-motion: reduce) {
          .cover { height: 100vh; height: 100svh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--banana { transition: none; }
          .cover-layer--banana { animation: none; }
        }
      `})]})]})},Xe=ne.lazy(()=>we(()=>import("./AppShell-qsqB1DIu.js").then(e=>e.A),__vite__mapDeps([2,1,3,4,5,6,7])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Ve=je.createRoot(document.getElementById("root"));Ve.render(l.jsxs(ne.StrictMode,{children:[l.jsx(_e,{}),l.jsx(ne.Suspense,{fallback:null,children:l.jsx(Xe,{})})]}));export{we as _,Z as a,X as b,T as c,D as d,Je as e,U as f,Pe as g,De as h,ke as i,Ze as o,re as p,ue as r,Ge as s};
