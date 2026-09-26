const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/bananaLeaf-Du9zzOj2.js","assets/vendor-react-CptINutj.js","assets/AppShell-BMAlyFLT.js","assets/vendor-intl-yz93lFsZ.js","assets/vendor-emotion-CS1ZSvAf.js","assets/vendor-mui-icons-ByeSausi.js","assets/vendor-mui-DGcXVZTA.js","assets/AppShell-Cex7-Uvz.css"])))=>i.map(i=>d[i]);
import{r as z,j as l,a as ne,d as $e}from"./vendor-react-CptINutj.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}})();const Se="modulepreload",ze=function(e){return"/gaborulenius/"+e},le={},we=function(n,t,i){let r=Promise.resolve();if(t&&t.length>0){let h=function(g){return Promise.all(g.map(M=>Promise.resolve(M).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),S=(m==null?void 0:m.nonce)||(m==null?void 0:m.getAttribute("nonce"));r=h(t.map(g=>{if(g=ze(g),g in le)return;le[g]=!0;const M=g.endsWith(".css"),o=M?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${g}"]${o}`))return;const s=document.createElement("link");if(s.rel=M?"stylesheet":Se,M||(s.as="script"),s.crossOrigin="",s.href=g,S&&s.setAttribute("nonce",S),document.head.appendChild(s),M)return new Promise((d,a)=>{s.addEventListener("load",d),s.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${g}`)))})}))}function c(h){const m=new Event("vite:preloadError",{cancelable:!0});if(m.payload=h,window.dispatchEvent(m),!m.defaultPrevented)throw h}return r.then(h=>{for(const m of h||[])m.status==="rejected"&&c(m.reason);return n().catch(c)})},G={bgDark:"#1e2a20",textLight:"#f2f3ef",textLightRgb:"242, 243, 239",textHeading:"#d8d8b4",accent:"#c0cc9c",accentHover:"#c8e59f",glassBg:"rgba(255, 255, 255, 0.05)",glassBorder:"rgba(255, 255, 255, 0.08)",navBg:"rgba(30, 42, 32, 0.9)",drawerBg:"rgba(30, 42, 32, 0.98)",overlayBg:"rgba(0, 0, 0, 0.4)",dividerBg:"rgba(255, 255, 255, 0.2)",btnBg:"#3a5223",btnBgHover:"#4c6e36"},K=e=>`/gaborulenius/${e.replace(/^\/+/,"")}`,Q=(e,n=0,t=1)=>Math.min(t,Math.max(n,e)),W=(e,n,t)=>t===n?e>=t?1:0:Q((e-n)/(t-n)),Je=(e,n,t)=>{const i=W(t,e,n);return i*i*(3-2*i)},Ve=e=>1-Math.pow(1-e,3),Oe=e=>e*e*e,Ie=e=>{let n=e>>>0;return()=>{n+=1831565813;let t=n;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}},de=e=>`M${e.map(([n,t])=>`${n.toFixed(1)} ${t.toFixed(1)}`).join("L")}Z`,Ne=({length:e,leaflets:n,leafletLength:t,leafletWidth:i,bend:r,seed:c})=>{const h=Ie(c),m=s=>[r*e*s*s,-e*s],S=s=>{const d=2*r*e*s,a=-e,f=Math.hypot(d,a);return[d/f,a/f]},g=[],M=[],o=[];for(let s=0;s<=16;s+=1){const d=s/16,[a,f]=m(d),[F,x]=S(d),w=i*.12*(1-d*.85);M.push([a-x*w,f+F*w]),o.push([a+x*w,f-F*w])}g.push(de([...M,...o.reverse()]));for(let s=0;s<n;s+=1){const d=.08+s/n*.9,[a,f]=m(d),[F,x]=S(d),w=1-Math.pow(d,1.6)*.75;[-1,1].forEach(j=>{const p=(.95+h()*.3)*j,R=Math.cos(p),y=Math.sin(p),u=F*R-x*y,b=F*y+x*R+.35,A=Math.hypot(u,b),L=u/A,N=b/A,B=-N,O=L,k=t*w*(.85+h()*.3),v=i*w*.5,E=(Y,H)=>[a+L*k*Y+B*H,f+N*k*Y+O*H];g.push(de([E(0,0),E(.25,v*.9),E(.6,v*.75),E(1,0),E(.6,-v*.55),E(.25,-v*.7)]))})}return g.join("")},Be="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAbADADASIAAhEBAxEB/8QAGgAAAwADAQAAAAAAAAAAAAAAAwQFAAIGB//EACoQAAICAQMCBAYDAAAAAAAAAAECAxEABBIhE1EFIjFBIzJhcYGhBhTw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgMB/8QAGhEBAQEBAAMAAAAAAAAAAAAAAQACERIiMf/aAAwDAQACEQMRAD8A84jSNJZAnylSRu9jhV+CiF2pjytcmu/0ycjFJKuu2PQvOArpIbunVv1+MilOseEhBrA6S9NgfLvPA+uXv5HDDp9CjaljL4jMd7zXdA9v975zOg1Q/vIxRHphYHG7GPHtfNqJ26khaveqH4GTcrskPCjTBdvw1BpmFn3FemIwUHezh5JASeSwu+2KAsJfKL4vjLWHyL0W8ro28EZvJG+mkRTJ869/TF4ZXj27WItbOUtA3XhlSUK423you/vh0pbG03UknTphmHANGyMDr3Lal0aQVfq2N+HxI03K/v64j4mANRIBwFND7YR9uTcHj2Umk6h2oBYHNcDBbQQWVttcV3zJuHAHA2+2CHmCX2ypC//Z",ke="(prefers-reduced-motion: reduce)",Ce="(min-width: 900px)",Pe="(hover: hover) and (pointer: fine)",V=e=>typeof window<"u"&&window.matchMedia(e).matches,re=()=>V(ke),he=()=>V(Ce),De=()=>V(Pe),Ye=()=>{var c;if(typeof window>"u")return"medium";const e=navigator,n=e.hardwareConcurrency??4,t=e.deviceMemory??8,i=V("(pointer: coarse)"),r=Math.min(window.screen.width,window.screen.height)<820;return(c=e.connection)!=null&&c.saveData||i&&r||t<=2||n<=2?"low":i||t<=4||n<=4?"medium":"high"},oe=new Set,se=new Set;let ie=null,ue=!1;const He=.09;let I=null,Z=0;const ge=e=>typeof e=="function"?e():e,xe=()=>{const e=window.innerHeight,n=window.scrollY;return{y:n,smoothY:I??n,vw:document.documentElement.clientWidth||window.innerWidth,vh:e,maxY:Math.max(0,document.documentElement.scrollHeight-e)}},Te=(e,n)=>{const t=performance.now(),i=t-Z>100?1/60:(t-Z)/1e3;return Z=t,I===null||Math.abs(e-I)>n*1.5||re()?I=e:(I+=(e-I)*(1-Math.exp(-i/He)),Math.abs(e-I)<.5&&(I=e)),I},ye=(e,n,t)=>{const{smoothY:i,vh:r}=e;return{viewport:e,top:n,height:t,pin:Q((i-n)/Math.max(1,t-r)),pass:Q((i+r-n)/Math.max(1,t+r)),enter:Q((i+r-n)/Math.max(1,r)),exit:Q((i-(n+t-r))/Math.max(1,r)),near:i+2*r>n&&i-r<n+t}},be=(e,n)=>{const t=e.getBoundingClientRect();return{top:t.top+n.y,height:t.height}},Qe=()=>{ie=null;const e=xe(),n={...e,smoothY:Te(e.y,e.vh)},t=[];oe.forEach(i=>{const r=ge(i.target);if(!r)return;const{top:c,height:h}=be(r,n);t.push([i,c,h])}),t.forEach(([i,r,c])=>{i.callback(ye(n,r,c))}),se.forEach(i=>i(n)),n.smoothY!==n.y&&D()},D=()=>{ie!==null||typeof window>"u"||(ie=window.requestAnimationFrame(Qe))},Ae=()=>{ue||typeof window>"u"||(ue=!0,window.addEventListener("scroll",D,{passive:!0}),window.addEventListener("resize",D),window.addEventListener("orientationchange",D),window.addEventListener("load",D),"ResizeObserver"in window&&new ResizeObserver(D).observe(document.documentElement))},fe=(e,n)=>{Ae();const t={target:e,callback:n};oe.add(t);const i=ge(e);if(i){const r=xe(),{top:c,height:h}=be(i,r);n(ye(r,c,h))}return D(),()=>{oe.delete(t)}},Ke=e=>(Ae(),se.add(e),D(),()=>{se.delete(e)}),me={en:"Hi, I'm Gábor",fi:"Hei, olen Gábor"},ve={en:"Skip to content",fi:"Siirry sisältöön"},ee=()=>typeof document>"u"?"en":document.documentElement.dataset.locale==="fi"?"fi":"en",te=[{id:"leaf-rear",rotate:0,exit:{x:.4,y:.45,scale:1.35},sway:[.8,9.5,-3],wideOnly:!0,spec:{baseX:.92,baseY:1.1,angle:-.42,bend:-.95,length:.8,halfWidth:.13,tears:10,seed:41,backlight:.22,shade:.78,turn:.35,blur:3.5}},{id:"leaf-high",rotate:0,exit:{x:.34,y:-.5,scale:1.4},sway:[1.4,7.5,-2],spec:{baseX:1.02,baseY:-.1,angle:-2.45,bend:-.7,length:.95,halfWidth:.18,tears:13,seed:29,backlight:.95,turn:.1,blur:1.2}},{id:"leaf-near",rotate:0,exit:{x:.5,y:.5,scale:1.5},sway:[1,8.5,-5],spec:{baseX:.97,baseY:1.08,angle:-.8,bend:-.6,length:.72,halfWidth:.12,tears:14,seed:11,backlight:.3,shade:.6,turn:.25,blur:1.2},narrow:{angle:-.74,length:.74,halfWidth:.15,tears:12,blur:1}},{id:"leaf-low",rotate:0,exit:{x:-.5,y:.4,scale:1.5},sway:[1.2,6.5,-1],wideOnly:!0,spec:{baseX:.05,baseY:1.08,angle:.72,bend:.55,length:.66,halfWidth:.12,tears:12,seed:3,backlight:.26,shade:.65,turn:.3,blur:1.6}}],q=1e3,P=300,_e=(e,n,t,i,r,c={})=>{const h=Math.min(-P,t*q-P),m=Math.max(P,t*q+P),S={x:h,y:-q-P*.4,width:m-h,height:q+P*.9};return{id:e,path:Ne({length:q,leaflets:15,leafletLength:P,leafletWidth:56,bend:t,seed:n}),box:S,origin:[-h/S.width*100,(q+P*.4)/S.height*100],rotate:i,exit:r,...c}},pe=[_e("fern-left",71,.28,-156,{x:-.32,y:-.42,scale:1.6},{mirror:!0,wideOnly:!0})],Ge=e=>Array.from({length:e},(n,t)=>{const i=Math.sin(t*12.9898)*43758.5453,r=c=>{const h=Math.sin(i+c*78.233)*43758.5453;return h-Math.floor(h)};return{x:r(1),y:r(2),z:.25+r(3)*.75,phase:r(4)*Math.PI*2,alpha:.3+r(5)*.6}}),J=(e,n)=>{const t=window;if(t.requestIdleCallback){const r=t.requestIdleCallback(e,{timeout:n});return()=>{var c;return(c=t.cancelIdleCallback)==null?void 0:c.call(t,r)}}const i=window.setTimeout(e,Math.min(n,1200));return()=>window.clearTimeout(i)},qe=()=>{const e=z.useRef(null),n=z.useRef(null),t=z.useRef(null),i=z.useRef(null),r=z.useRef(null),c=z.useRef({}),[h,m]=z.useState(ee),S=me[h]??me.en,g=ve[h]??ve.en;z.useEffect(()=>{const o=document.documentElement;m(ee());const s=new MutationObserver(()=>{m(ee())});return s.observe(o,{attributes:!0,attributeFilter:["data-locale"]}),()=>s.disconnect()},[]),z.useEffect(()=>{const o=e.current;if(!o)return;const s=re(),d=De()&&!s,a={x:0,y:0,targetX:0,targetY:0};let f=0,F={vw:window.innerWidth,vh:window.innerHeight},x=null;const w=[...te,...pe],j=()=>{const u=s?0:Oe(f),{vw:b,vh:A}=F,L=s?1:1-W(f,.72,.98);w.forEach(v=>{const E=c.current[v.id];if(!E)return;const Y=v.exit.x*b*u+a.x*34,H=v.exit.y*A*u+a.y*22,_=1+(v.exit.scale-1)*u;E.style.transform=`translate3d(${Y.toFixed(1)}px, ${H.toFixed(1)}px, 0) rotate(${v.rotate}deg) scale(${v.mirror?-_:_}, ${_})`,E.style.setProperty("--leave",L.toFixed(3))});const N=n.current;if(N){const v=s?0:W(f,.3,.84),E=s?0:f;N.style.transform=`translate3d(${(a.x*10).toFixed(1)}px, ${(a.y*8-E*A*.05).toFixed(1)}px, 0) scale(${(1+.3*u).toFixed(3)})`,N.style.opacity=(1-v).toFixed(3),N.style.filter=v>.01?`blur(${(v*6).toFixed(2)}px)`:""}const B=t.current;B&&(B.style.transform=`translate3d(${(a.x*14).toFixed(1)}px, ${(f*A*.07).toFixed(1)}px, 0) scale(${(1+.14*f).toFixed(3)})`,B.style.opacity=(s?1:1-W(f,.55,.98)).toFixed(3));const O=i.current;O&&(O.style.transform=`translate3d(${(a.x*6).toFixed(1)}px, 0, 0)`,O.style.opacity=(s?1:1-W(f,.55,.98)).toFixed(3));const k=r.current;k&&k.style.setProperty("--leave",L.toFixed(3))},p=fe(o,u=>{f=u.pin,F={vw:u.viewport.vw,vh:u.viewport.vh},j()}),R=()=>{x=null,a.x+=(a.targetX-a.x)*.08,a.y+=(a.targetY-a.y)*.08,j(),(Math.abs(a.targetX-a.x)>.001||Math.abs(a.targetY-a.y)>.001)&&(x=window.requestAnimationFrame(R))},y=u=>{f>=1||(a.targetX=Q(u.clientX/F.vw-.5,-.5,.5),a.targetY=Q(u.clientY/F.vh-.5,-.5,.5),x===null&&(x=window.requestAnimationFrame(R)))};return d&&window.addEventListener("pointermove",y,{passive:!0}),()=>{p(),d&&window.removeEventListener("pointermove",y),x!==null&&window.cancelAnimationFrame(x)}},[]),z.useEffect(()=>{let o=!1,s=()=>{},d=null,a=0;const f=()=>{s();const p=he(),R=te.filter(u=>p||!u.wideOnly),y=()=>{const u=R.shift();if(!u){d==null||d.releaseLeafRenderer();return}if(o||!d)return;const b=c.current[u.id],A=p?u.spec:{...u.spec,...u.narrow},L=Math.min(window.devicePixelRatio||1,(A.blur??0)>2?1:1.5);b&&d.paintBananaLeaf(b,A,L)&&b.dataset.ready!=="true"&&(b.dataset.ready="true",window.setTimeout(()=>{b.dataset.settled="true"},1300)),s=J(y,600)};s=J(y,2e3)},x=J(()=>{we(()=>import("./bananaLeaf-Du9zzOj2.js"),__vite__mapDeps([0,1])).then(p=>{o||(d=p,f())})},2e3);let w=`${window.innerWidth}`;const j=()=>{const p=`${window.innerWidth}`;p===w||!d||(w=p,window.clearTimeout(a),a=window.setTimeout(f,250))};return window.addEventListener("resize",j),()=>{o=!0,x(),s(),window.clearTimeout(a),window.removeEventListener("resize",j)}},[]),z.useEffect(()=>{const o=r.current,s=e.current;if(!o||!s)return;const d=o.getContext("2d");if(!d)return;const a=re(),F=Ye()==="low"?14:he()?42:22,x=Ge(F),w=Math.min(window.devicePixelRatio||1,1.5);let j=0,p=0,R=!0,y=null,u=0,b=!1;const A=document.createElement("canvas");A.width=32,A.height=32;const L=A.getContext("2d");(()=>{if(!L)return;const $=L.createRadialGradient(16,16,0,16,16,16),T="255, 238, 196";$.addColorStop(0,`rgba(${T}, 1)`),$.addColorStop(.35,`rgba(${T}, 0.45)`),$.addColorStop(1,`rgba(${T}, 0)`),L.clearRect(0,0,32,32),L.fillStyle=$,L.fillRect(0,0,32,32)})();const B=()=>{j=o.clientWidth,p=o.clientHeight,o.width=Math.round(j*w),o.height=Math.round(p*w),d.setTransform(w,0,0,w,0,0)},O=$=>{d.clearRect(0,0,j,p);const T=$/1e3;x.forEach(C=>{const Fe=a?0:T*(.004+C.z*.01),je=a?0:Math.sin(T*.6+C.phase)*.012,ae=((C.x+je)%1+1)%1*j,Le=a?0:u*C.z*.55;let U=C.y-Fe-Le;U=(U%1+1)%1*p;const Me=.62-U/p*.24,ce=Math.max(0,1-Math.abs(ae/j-Me)/.09),Re=a?1:.75+.25*Math.sin(T*1.7+C.phase*3),X=(1.2+C.z*3.2)*(1+ce*.6);d.globalAlpha=Math.min(1,C.alpha*(.45+ce*1.1)*Re),d.drawImage(A,ae-X,U-X,X*2,X*2)}),d.globalAlpha=1},k=$=>{y=null,O($),R&&!document.hidden&&!a&&(y=window.requestAnimationFrame(k))},v=()=>{y===null&&R&&!document.hidden&&(y=window.requestAnimationFrame(k))},E=fe(s,$=>{u=$.pin}),Y=new IntersectionObserver(([$])=>{R=$.isIntersecting,R&&b&&v()});Y.observe(s);const H=()=>{!document.hidden&&b&&v()};document.addEventListener("visibilitychange",H);const _=()=>{B(),a&&b&&O(0)};window.addEventListener("resize",_);const Ee=J(()=>{b=!0,B(),o.dataset.ready="true",window.setTimeout(()=>{o.dataset.settled="true"},1700),a?O(0):v()},2500);return()=>{E(),Y.disconnect(),document.removeEventListener("visibilitychange",H),window.removeEventListener("resize",_),y!==null&&window.cancelAnimationFrame(y),Ee()}},[]);const M=(o,s)=>`cover-layer cover-layer--${s} cover-layer--${o.id}${o.wideOnly?" cover-layer--wide-only":""}`;return l.jsxs(l.Fragment,{children:[l.jsx("a",{className:"cover-skip",href:"#home",children:g}),l.jsxs("div",{id:"cover",ref:e,className:"cover",children:[l.jsxs("section",{className:"cover-scene","aria-labelledby":"cover-heading",children:[l.jsx("div",{className:"cover-lqip","aria-hidden":"true"}),l.jsxs("div",{className:"cover-depth","aria-hidden":"true",children:[l.jsxs("div",{ref:t,className:"cover-mist",children:[l.jsx("div",{className:"cover-mist-band cover-mist-band--a"}),l.jsx("div",{className:"cover-mist-band cover-mist-band--b"})]}),l.jsx("div",{ref:i,className:"cover-shaft"}),l.jsx("canvas",{ref:r,className:"cover-pollen"})]}),l.jsxs("div",{ref:n,className:"cover-copy",children:[l.jsx("img",{alt:"Gábor Ulenius",src:K("profile-160.webp"),srcSet:`${K("profile-160.webp")} 160w, ${K("profile-320.webp")} 320w`,sizes:"(max-width: 600px) 140px, (max-width: 900px) 150px, 160px",width:160,height:160,decoding:"async",fetchPriority:"high",loading:"eager",className:"cover-avatar"}),l.jsx("h1",{id:"cover-heading",className:"cover-greeting",children:S})]}),l.jsxs("div",{className:"cover-depth cover-depth--near","aria-hidden":"true",children:[l.jsx("svg",{className:"cover-defs",width:"0",height:"0",focusable:"false",children:l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"cover-fern-fill",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0",className:"cover-stop-top"}),l.jsx("stop",{offset:"1",className:"cover-stop-bottom"})]}),l.jsx("filter",{id:"cover-fern-blur",x:"-10%",y:"-10%",width:"120%",height:"120%",children:l.jsx("feGaussianBlur",{stdDeviation:"6"})})]})}),pe.map(o=>l.jsx("div",{ref:s=>{c.current[o.id]=s},className:M(o,"fern"),style:{aspectRatio:`${o.box.width} / ${o.box.height}`,transformOrigin:`${o.origin[0].toFixed(2)}% ${o.origin[1].toFixed(2)}%`,transform:`rotate(${o.rotate}deg) scale(${o.mirror?-1:1}, 1)`},children:l.jsx("svg",{viewBox:`${o.box.x.toFixed(1)} ${o.box.y.toFixed(1)} ${o.box.width.toFixed(1)} ${o.box.height.toFixed(1)}`,focusable:"false",children:l.jsx("path",{d:o.path,fill:"url(#cover-fern-fill)",filter:"url(#cover-fern-blur)"})})},o.id)),te.map(o=>l.jsx("canvas",{ref:s=>{c.current[o.id]=s},className:M(o,"banana"),style:{"--sway":`${o.sway[0]}deg`,"--sway-period":`${o.sway[1]}s`,"--sway-delay":`${o.sway[2]}s`,transformOrigin:`${(o.spec.baseX*100).toFixed(1)}% ${(o.spec.baseY*100).toFixed(1)}%`}},o.id))]})]}),l.jsx("style",{children:`
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
          color: ${G.textLight};
          --fern-top: #16301d;
          --fern-bottom: #050c07;
        }
        .cover-stop-top { stop-color: var(--fern-top); }
        .cover-stop-bottom { stop-color: var(--fern-bottom); }
        .cover-defs { position: absolute; width: 0; height: 0; }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${Be}") center / cover no-repeat;
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
          .cover { height: 100vh; height: 100svh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--banana { transition: none; }
          .cover-layer--banana { animation: none; }
        }
      `})]})]})},We=ne.lazy(()=>we(()=>import("./AppShell-BMAlyFLT.js").then(e=>e.A),__vite__mapDeps([2,1,3,4,5,6,7])));"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const Ue=$e.createRoot(document.getElementById("root"));Ue.render(l.jsxs(ne.StrictMode,{children:[l.jsx(qe,{}),l.jsx(ne.Suspense,{fallback:null,children:l.jsx(We,{})})]}));export{we as _,K as a,W as b,Q as c,D as d,Ve as e,G as f,Ye as g,De as h,Ie as i,Ke as o,re as p,fe as r,Je as s};
