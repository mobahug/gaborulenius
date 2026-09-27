const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/bananaLeaf-BmjCYCSv.js","assets/vendor-react-CptINutj.js","assets/AppShell-RoYyjq2x.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-BU2WnqO2.js","assets/vendor-mui-icons-FTwyKh2W.js","assets/AppShell-CQUZ_kBN.css"])))=>i.map(i=>d[i]);
import{r as $,j as l,a as re,d as ke}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const A of c.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&s(A)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}})();const ze="modulepreload",Ie=function(e){return"/gaborulenius/"+e},Ae={},be=function(n,t,s){let r=Promise.resolve();if(t&&t.length>0){let A=function(w){return Promise.all(w.map(R=>Promise.resolve(R).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};document.getElementsByTagName("link");const f=document.querySelector("meta[property=csp-nonce]"),L=(f==null?void 0:f.nonce)||(f==null?void 0:f.getAttribute("nonce"));r=A(t.map(w=>{if(w=Ie(w),w in Ae)return;Ae[w]=!0;const R=w.endsWith(".css"),o=R?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${w}"]${o}`))return;const i=document.createElement("link");if(i.rel=R?"stylesheet":ze,R||(i.as="script"),i.crossOrigin="",i.href=w,L&&i.setAttribute("nonce",L),document.head.appendChild(i),R)return new Promise((d,a)=>{i.addEventListener("load",d),i.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${w}`)))})}))}function c(A){const f=new Event("vite:preloadError",{cancelable:!0});if(f.payload=A,window.dispatchEvent(f),!f.defaultPrevented)throw A}return r.then(A=>{for(const f of A||[])f.status==="rejected"&&c(f.reason);return n().catch(c)})},U={bgDark:"#0b110d",textLight:"#f6f1e4",textMuted:"rgba(246, 241, 228, 0.74)",textHeading:"#e9dcb3",accent:"#d9c89a",accentHover:"#e9dcb3",accentRgb:"217, 200, 154",glassBg:"rgba(10, 16, 12, 0.6)",glassBgStrong:"rgba(9, 13, 10, 0.9)",glassBorder:"rgba(233, 220, 179, 0.16)",navBg:"rgba(7, 11, 8, 0.55)",drawerBg:"rgba(9, 13, 10, 0.94)",overlayBg:"rgba(3, 6, 4, 0.55)",dividerBg:"rgba(233, 220, 179, 0.16)",btnBg:"rgba(10, 16, 12, 0.5)",btnBgHover:"rgba(217, 200, 154, 0.16)",btnBorder:"rgba(217, 200, 154, 0.42)"},K=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,H=(e,n=0,t=1)=>Math.min(t,Math.max(n,e)),V=(e,n,t)=>t===n?e>=t?1:0:H((e-n)/(t-n)),et=(e,n,t)=>{const s=V(t,e,n);return s*s*(3-2*s)},tt=e=>1-Math.pow(1-e,3),Ne=e=>e*e*e,Ce=e=>{let n=e>>>0;return()=>{n+=1831565813;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}},he=e=>`M${e.map(([n,t])=>`${n.toFixed(1)} ${t.toFixed(1)}`).join("L")}Z`,Qe=({length:e,leaflets:n,leafletLength:t,leafletWidth:s,bend:r,seed:c})=>{const A=Ce(c),f=i=>[r*e*i*i,-e*i],L=i=>{const d=2*r*e*i,a=-e,u=Math.hypot(d,a);return[d/u,a/u]},w=[],R=[],o=[];for(let i=0;i<=16;i+=1){const d=i/16,[a,u]=f(d),[B,p]=L(d),v=s*.12*(1-d*.85);R.push([a-p*v,u+B*v]),o.push([a+p*v,u-B*v])}w.push(he([...R,...o.reverse()]));for(let i=0;i<n;i+=1){const d=.08+i/n*.9,[a,u]=f(d),[B,p]=L(d),v=1-Math.pow(d,1.6)*.75;[-1,1].forEach(M=>{const m=(.95+A()*.3)*M,j=Math.cos(m),b=Math.sin(m),h=B*j-p*b,x=B*b+p*j+.35,y=Math.hypot(h,x),S=h/y,Q=x/y,z=-Q,O=S,I=t*v*(.85+A()*.3),g=s*v*.5,E=(D,P)=>[a+S*I*D+z*P,u+Q*I*D+O*P];w.push(he([E(0,0),E(.25,g*.9),E(.6,g*.75),E(1,0),E(.6,-g*.55),E(.25,-g*.7)]))})}return w.join("")},De="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAbADADASIAAhEBAxEB/8QAGgAAAwADAQAAAAAAAAAAAAAAAwQFAQIGB//EACgQAAIBAwMCBgMBAAAAAAAAAAECAwARIQQSMRNRBQZBgZHRYXHh8P/EABgBAAMBAQAAAAAAAAAAAAAAAAECAwAE/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAERAhIhMf/aAAwDAQACEQMRAD8A8+hVFSRABm1r5NMIFgkUM29jYkA3Av6XFSo5NkhVcdjVKJ3BUic7SoLqSbqR6H2NczUInSeX8ahRp5ujMbjc1/gWo3miPSQSJBEtyi2lkBvvb6qf4LrXTVl1IBybgWsfUgd6T8U1jSTEu5ycnn4pOX3Q3yEjWodm5cAqDkW75/3elIGAiI5IbFGnkDJbnFsn80kjOA4W3PfirI31DK6Zi42HcGtm/ArcX02sMXVwCOL2J/lKiR4pAsbsq34Bp/TSs+jkjfayxlSoKg2uaXVQUijo3nZnYlyii1yb7cWAv+hb2qfqJS0rb3wM8XvVrwXSQTQTdSMHbGSMnkW+65zVMWYM2SW5pMuuD6wkgU0nV3OAAoOQMUBwvTuGyeQKzNl5CckGtQAwdjziroRH/9k=",Pe="(prefers-reduced-motion: reduce)",Ye="(min-width: 900px)",He="(hover: hover) and (pointer: fine)",Z=e=>typeof window<"u"&&window.matchMedia(e).matches,oe=()=>Z(Pe),ue=()=>Z(Ye),Te=()=>Z(He),We=()=>{var c;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,t=e.deviceMemory??8,s=Z("(pointer: coarse)"),r=Math.min(window.screen.width,window.screen.height)<820;return(c=e.connection)!=null&&c.saveData||s&&r||t<=2||n<=2?"low":s||t<=4||n<=4?"medium":"high"},ie=new Set,se=new Set;let ae=null,fe=!1;const Ue=.09;let k=null,ee=0;const xe=e=>typeof e=="function"?e():e;let _=null,ce=0;const ye=()=>{_||(_=document.createElement("div"),_.setAttribute("aria-hidden","true"),_.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100lvh;visibility:hidden;pointer-events:none;",document.body.appendChild(_)),ce=_.offsetHeight||window.innerHeight},Ee=()=>{ce||ye();const e=window.scrollY;return{y:e,smoothY:k??e,vw:document.documentElement.clientWidth||window.innerWidth,vh:ce,maxY:Math.max(0,document.documentElement.scrollHeight-window.innerHeight)}},me=()=>{ye(),T()},_e=(e,n)=>{const t=performance.now(),s=t-ee>100?1/60:(t-ee)/1e3;return ee=t,k===null||Math.abs(e-k)>n*1.5||oe()?k=e:(k+=(e-k)*(1-Math.exp(-s/Ue)),Math.abs(e-k)<.5&&(k=e)),k},Be=(e,n,t)=>{const{smoothY:s,vh:r}=e;return{viewport:e,top:n,height:t,pin:H((s-n)/Math.max(1,t-r)),pass:H((s+r-n)/Math.max(1,t+r)),enter:H((s+r-n)/Math.max(1,r)),exit:H((s-(n+t-r))/Math.max(1,r)),near:s+2*r>n&&s-r<n+t}},Me=(e,n)=>{const t=e.getBoundingClientRect();return{top:t.top+n.y,height:t.height}},Xe=()=>{ae=null;const e=Ee(),n={...e,smoothY:_e(e.y,e.vh)},t=[];ie.forEach(s=>{const r=xe(s.target);if(!r)return;const{top:c,height:A}=Me(r,n);t.push([s,c,A])}),t.forEach(([s,r,c])=>{s.callback(Be(n,r,c))}),se.forEach(s=>s(n)),n.smoothY!==n.y&&T()},T=()=>{ae!==null||typeof window>"u"||(ae=window.requestAnimationFrame(Xe))},Se=()=>{fe||typeof window>"u"||(fe=!0,window.addEventListener("scroll",T,{passive:!0}),window.addEventListener("resize",me),window.addEventListener("orientationchange",me),window.addEventListener("load",T),"ResizeObserver"in window&&new ResizeObserver(T).observe(document.documentElement))},ve=(e,n)=>{Se();const t={target:e,callback:n};ie.add(t);const s=xe(e);if(s){const r=Ee(),{top:c,height:A}=Me(s,r);n(Be(r,c,A))}return T(),()=>{ie.delete(t)}},nt=e=>(Se(),se.add(e),T(),()=>{se.delete(e)}),ge={en:"Hi, I'm Gábor",fi:"Hei, olen Gábor"},we={en:"Skip to content",fi:"Siirry sisältöön"},te=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",ne=[{id:"leaf-rear",rotate:0,exit:{x:.4,y:.45,scale:1.35},sway:[.8,9.5,-3],wideOnly:!0,spec:{baseX:.92,baseY:1.1,angle:-.42,bend:-.95,length:.8,halfWidth:.13,tears:10,seed:41,backlight:.22,shade:.78,turn:.35,blur:3.5}},{id:"leaf-high",rotate:0,exit:{x:.34,y:-.5,scale:1.4},sway:[1.4,7.5,-2],spec:{baseX:1.02,baseY:-.1,angle:-2.45,bend:-.7,length:.95,halfWidth:.18,tears:13,seed:29,backlight:.95,turn:.1,blur:1.2}},{id:"leaf-near",rotate:0,exit:{x:.5,y:.5,scale:1.5},sway:[1,8.5,-5],spec:{baseX:.97,baseY:1.08,angle:-.8,bend:-.6,length:.72,halfWidth:.12,tears:14,seed:11,backlight:.3,shade:.6,turn:.25,blur:1.2},narrow:{angle:-.74,length:.74,halfWidth:.15,tears:12,blur:1}},{id:"leaf-low",rotate:0,exit:{x:-.5,y:.4,scale:1.5},sway:[1.2,6.5,-1],wideOnly:!0,spec:{baseX:.05,baseY:1.08,angle:.72,bend:.55,length:.66,halfWidth:.12,tears:12,seed:3,backlight:.26,shade:.65,turn:.3,blur:1.6}}],X=1e3,C=300,Ve=(e,n,t,s,r,c={})=>{const A=Math.min(-C,t*X-C),f=Math.max(C,t*X+C),L={x:A,y:-X-C*.4,width:f-A,height:X+C*.9};return{id:e,path:Qe({length:X,leaflets:15,leafletLength:C,leafletWidth:56,bend:t,seed:n}),box:L,origin:[-A/L.width*100,(X+C*.4)/L.height*100],rotate:s,exit:r,...c}},pe=[Ve("fern-left",71,.28,-156,{x:-.32,y:-.42,scale:1.6},{mirror:!0,wideOnly:!0})],qe=e=>Array.from({length:e},(n,t)=>{const s=Math.sin(t*12.9898)*43758.5453,r=c=>{const A=Math.sin(s+c*78.233)*43758.5453;return A-Math.floor(A)};return{x:r(1),y:r(2),z:.25+r(3)*.75,phase:r(4)*Math.PI*2,alpha:.3+r(5)*.6}}),J=(e,n)=>{const t=window;if(t.requestIdleCallback){const r=t.requestIdleCallback(e,{timeout:n});return()=>{var c;return(c=t.cancelIdleCallback)==null?void 0:c.call(t,r)}}const s=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(s)},Ge=()=>{const e=$.useRef(null),n=$.useRef(null),t=$.useRef(null),s=$.useRef(null),r=$.useRef(null),c=$.useRef({}),[A,f]=$.useState(te),L=ge[A]??ge.en,w=we[A]??we.en;$.useEffect(()=>{const o=document.documentElement;f(te());const i=new MutationObserver(()=>{f(te())});return i.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>i.disconnect()},[]),$.useEffect(()=>{const o=e.current;if(!o)return;const i=oe(),d=Te()&&!i,a={x:0,y:0,targetX:0,targetY:0};let u=0,B={vw:window.innerWidth,vh:window.innerHeight},p=null;const v=[...ne,...pe],M=()=>{const h=i?0:Ne(u),{vw:x,vh:y}=B,S=i?1:1-V(u,.72,.98);v.forEach(g=>{const E=c.current[g.id];if(!E)return;const D=g.exit.x*x*h+a.x*34,P=g.exit.y*y*h+a.y*22,W=1+(g.exit.scale-1)*h;E.style.transform=`translate3d(${D.toFixed(1)}px, ${P.toFixed(1)}px, 0) rotate(${g.rotate}deg) scale(${g.mirror?-W:W}, ${W})`,E.style.setProperty("--leave",S.toFixed(3))});const Q=n.current;if(Q){const g=i?0:V(u,.3,.84),E=i?0:u;Q.style.transform=`translate3d(${(a.x*10).toFixed(1)}px, ${(a.y*8-E*y*.05).toFixed(1)}px, 0) scale(${(1+.3*h).toFixed(3)})`,Q.style.opacity=(1-g).toFixed(3)}const z=t.current;z&&(z.style.transform=`translate3d(${(a.x*14).toFixed(1)}px, ${(u*y*.07).toFixed(1)}px, 0) scale(${(1+.14*u).toFixed(3)})`,z.style.opacity=(i?1:1-V(u,.55,.98)).toFixed(3));const O=s.current;O&&(O.style.transform=`translate3d(${(a.x*6).toFixed(1)}px, 0, 0)`,O.style.opacity=(i?1:1-V(u,.55,.98)).toFixed(3));const I=r.current;I&&I.style.setProperty("--leave",S.toFixed(3))},m=ve(o,h=>{u=h.pin,B={vw:h.viewport.vw,vh:h.viewport.vh},M()}),j=()=>{p=null,a.x+=(a.targetX-a.x)*.08,a.y+=(a.targetY-a.y)*.08,M(),(Math.abs(a.targetX-a.x)>.001||Math.abs(a.targetY-a.y)>.001)&&(p=window.requestAnimationFrame(j))},b=h=>{u>=1||(a.targetX=H(h.clientX/B.vw-.5,-.5,.5),a.targetY=H(h.clientY/B.vh-.5,-.5,.5),p===null&&(p=window.requestAnimationFrame(j)))};return d&&window.addEventListener("pointermove",b,{passive:!0}),()=>{m(),d&&window.removeEventListener("pointermove",b),p!==null&&window.cancelAnimationFrame(p)}},[]),$.useEffect(()=>{let o=!1,i=()=>{},d=null,a=0;const u=()=>{i();const m=ue(),j=ne.filter(h=>m||!h.wideOnly),b=()=>{const h=j.shift();if(!h){d==null||d.releaseLeafRenderer();return}if(o||!d)return;const x=c.current[h.id],y=m?h.spec:{...h.spec,...h.narrow},S=Math.min(window.devicePixelRatio||1,(y.blur??0)>2?1:1.5);x&&d.paintBananaLeaf(x,y,S)&&x.dataset.ready!=="true"&&(x.dataset.ready="true",window.setTimeout(()=>{x.dataset.settled="true"},1300)),i=J(b,600)};i=J(b,2e3)},p=J(()=>{be(()=>import("./bananaLeaf-BmjCYCSv.js"),__vite__mapDeps([0,1])).then(m=>{o||(d=m,u())})},2e3);let v=`${window.innerWidth}`;const M=()=>{const m=`${window.innerWidth}`;m===v||!d||(v=m,window.clearTimeout(a),a=window.setTimeout(u,250))};return window.addEventListener("resize",M),()=>{o=!0,p(),i(),window.clearTimeout(a),window.removeEventListener("resize",M)}},[]),$.useEffect(()=>{const o=r.current,i=e.current;if(!o||!i)return;const d=o.getContext("2d");if(!d)return;const a=oe(),B=We()==="low"?14:ue()?42:22,p=qe(B),v=Math.min(window.devicePixelRatio||1,1.5);let M=0,m=0,j=!0,b=null,h=0,x=!1;const y=document.createElement("canvas");y.width=32,y.height=32;const S=y.getContext("2d");(()=>{if(!S)return;const F=S.createRadialGradient(16,16,0,16,16,16),Y="255, 238, 196";F.addColorStop(0,`rgba(${Y}, 1)`),F.addColorStop(.35,`rgba(${Y}, 0.45)`),F.addColorStop(1,`rgba(${Y}, 0)`),S.clearRect(0,0,32,32),S.fillStyle=F,S.fillRect(0,0,32,32)})();const z=()=>{M=o.clientWidth,m=o.clientHeight,o.width=Math.round(M*v),o.height=Math.round(m*v),d.setTransform(v,0,0,v,0,0)},O=F=>{d.clearRect(0,0,M,m);const Y=F/1e3;p.forEach(N=>{const je=a?0:Y*(.004+N.z*.01),Fe=a?0:Math.sin(Y*.6+N.phase)*.012,le=((N.x+Fe)%1+1)%1*M,Le=a?0:h*N.z*.55;let q=N.y-je-Le;q=(q%1+1)%1*m;const $e=.62-q/m*.24,de=Math.max(0,1-Math.abs(le/M-$e)/.09),Oe=a?1:.75+.25*Math.sin(Y*1.7+N.phase*3),G=(1.2+N.z*3.2)*(1+de*.6);d.globalAlpha=Math.min(1,N.alpha*(.45+de*1.1)*Oe),d.drawImage(y,le-G,q-G,G*2,G*2)}),d.globalAlpha=1},I=F=>{b=null,O(F),j&&!document.hidden&&!a&&(b=window.requestAnimationFrame(I))},g=()=>{b===null&&j&&!document.hidden&&(b=window.requestAnimationFrame(I))},E=ve(i,F=>{h=F.pin}),D=new IntersectionObserver(([F])=>{j=F.isIntersecting,j&&x&&g()});D.observe(i);const P=()=>{!document.hidden&&x&&g()};document.addEventListener("visibilitychange",P);const W=()=>{z(),a&&x&&O(0)};window.addEventListener("resize",W);const Re=J(()=>{x=!0,z(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),a?O(0):g()},2500);return()=>{E(),D.disconnect(),document.removeEventListener("visibilitychange",P),window.removeEventListener("resize",W),b!==null&&window.cancelAnimationFrame(b),Re()}},[]);const R=(o,i)=>`cover-layer cover-layer--${i} cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return l.jsxs(l.Fragment,{children:[l.jsx("a",{className:"cover-skip",href:"#home",children:w}),l.jsxs("div",{id:"cover",ref:e,className:"cover",children:[l.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[l.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),l.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[l.jsxs("div",{ref:t,className:"cover-mist",children:[l.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),l.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),l.jsx("div",{ref:s,className:"cover-shaft"}),l.jsx("canvas",{ref:r,className:"cover-pollen"})]}),l.jsxs("div",{ref:n,className:"cover-copy",children:[l.jsx("img",{alt:"Gábor Ulenius",src:K("profile-160.webp"),srcSet:`${K("profile-160.webp")} 160w, ${K("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),l.jsx("h1",{id:"cover-heading",className:"cover-greeting",children:L})]}),l.jsxs("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:[l.jsx("svg",{className:"cover-defs",width:"0",height:"0",focusable:"false",children:l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"cover-fern-fill",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0",className:"cover-stop-top"}),l.jsx("stop",{offset:"1",className:"cover-stop-bottom"})]}),l.jsx("filter",{id:"cover-fern-blur",x:"-10%",y:"-10%",width:"120%",height:"120%",children:l.jsx("feGaussianBlur",{stdDeviation:"6"})})]})}),pe.map(o=>l.jsx("div",{ref:i=>{c.current[o.id]=i},className:R(o,"fern"),style:{aspectRatio:`${o.box.width} / ${o.box.height}`,transformOrigin:`${o.origin[0].toFixed(2)}% ${o.origin[1].toFixed(2)}%`,transform:`rotate(${o.rotate}deg) scale(${o.mirror?-1:1}, 1)`},children:l.jsx("svg",{viewBox:`${o.box.x.toFixed(1)} ${o.box.y.toFixed(1)} ${o.box.width.toFixed(1)} ${o.box.height.toFixed(1)}`,focusable:"false",children:l.jsx("path",{d:o.path,fill:"url(#cover-fern-fill)",filter:"url(#cover-fern-blur)"})})},o.id)),ne.map(o=>l.jsx("canvas",{ref:i=>{c.current[o.id]=i},className:R(o,"banana"),style:{"--sway":`${o.sway[0]}deg`,"--sway-period":`${o.sway[1]}s`,"--sway-delay":`${o.sway[2]}s`,transformOrigin:`${(o.spec.baseX*100).toFixed(1)}% ${(o.spec.baseY*100).toFixed(1)}%`}},o.id))]})]}),l.jsx("style",{children:`
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
          background: #1e2a20 url("${De}") center / cover no-repeat;
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
          .cover { height: 130vh; height: 130svh; }
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
      `})]})]})},Je=re.lazy(()=>be(()=>import("./AppShell-RoYyjq2x.js").then(e=>e.A),__vite__mapDeps([2,1,3,4,5,6,7])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Ze=ke.createRoot(document.getElementById("root"));Ze.render(l.jsxs(re.StrictMode,{children:[l.jsx(Ge,{}),l.jsx(re.Suspense,{fallback:null,children:l.jsx(Je,{})})]}));export{be as _,K as a,Ee as b,V as c,T as d,tt as e,H as f,We as g,U as h,ue as i,Te as j,Ce as k,nt as o,oe as p,ve as r,et as s};
