import{k as xt}from"./index-CcwsyVb8.js";import"./vendor-react-CptINutj.js";const Ct=`#version 300 es
in vec2 aPosition;
in float aS;
in float aY;
in float aBlade;
in vec2 aTangent;
uniform vec2 uResolution;
out float vS;
out float vY;
out float vBlade;
out vec2 vTangent;
void main() {
  vS = aS;
  vY = aY;
  vBlade = aBlade;
  vTangent = aTangent;
  vec2 clip = aPosition / uResolution * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`,dt=32,ft=8,Et=`#version 300 es
precision highp float;
in float vS;
in float vY;
in float vBlade;
in vec2 vTangent;
out vec4 fragColor;

uniform float uLength;
uniform float uScale;
uniform float uSeed;
uniform float uBacklight;
uniform float uShade;
uniform float uStalk;
uniform vec4 uTears[${dt}];
uniform int uTearCount;
uniform vec4 uHoles[${ft}];
uniform int uHoleCount;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 4; octave++) {
    value += amplitude * noise(p);
    p = p * 2.03 + 17.1;
    amplitude *= 0.5;
  }
  return value;
}

// Distance (in vein spacings) to the nearest line of a periodic family.
float lineDistance(float phase, float period) {
  float x = phase / period;
  return abs(fract(x + 0.5) - 0.5) * period;
}

void main() {
  float side = vY < 0.0 ? -1.0 : 1.0;
  float y = abs(vY);
  float x = vS * uLength;
  float blade = max(vBlade, 1e-3);
  float t = y / blade;

  // Features are sized relative to the leaf, not to the canvas pixels.
  float spacing = uScale * 0.0036;
  float ribHalf = uScale * (0.0105 * pow(1.0 - vS, 1.3) + 0.0012);
  float seed = uSeed * 13.7 + side * 5.3;

  // ---- Lateral veins: nearly straight, leaving the midrib at about 70°
  // and turning toward the tip only close to the margin.
  float slope = 0.36 + 0.3 * t * t * t * t;
  float phi = (x - y * slope) / spacing;
  float phiWidth = max(fwidth(phi), 1e-4);

  // ---- Outline: a gently waving margin, a little ragged; the blade
  // narrows to nothing at the stalk.
  float wave = 0.03 * sin(x / (uScale * 0.09) + seed) + 0.02 * sin(x / (uScale * 0.031) + seed * 2.1);
  float ragged = 0.03 * (noise(vec2(x / (uScale * 0.012), seed)) - 0.5)
    + 0.018 * (noise(vec2(x / (uScale * 0.004), seed + 2.0)) - 0.5);
  float edge = 1.0 + wave + ragged;
  float tWidth = max(fwidth(t), 1e-4);
  float inBlade = 1.0 - smoothstep(edge - tWidth, edge + tWidth, t);
  inBlade *= smoothstep(uStalk, uStalk + 0.012, vS);

  // ---- The midrib, and the stalk below the blade.
  float yWidth = max(fwidth(y), 1e-4);
  float inRib = 1.0 - smoothstep(ribHalf - yWidth, ribHalf + yWidth, y);

  float coverage = max(inBlade, inRib);

  // ---- Splits along the veins, widest at the margin, and a few holes.
  float tear = 0.0;
  float tearEdge = 0.0;
  for (int index = 0; index < ${dt}; index++) {
    if (index >= uTearCount) break;
    vec4 split = uTears[index];
    if (split.w != side) continue;
    float start = 1.0 - split.y;
    if (t < start) continue;
    float open = (t - start) / max(split.y, 1e-3);
    float gap = split.z * pow(open, 1.6) / spacing;
    float distance = abs(phi - split.x);
    float cut = 1.0 - smoothstep(gap - phiWidth, gap + phiWidth, distance);
    tear = max(tear, cut);
    tearEdge = max(tearEdge, (1.0 - smoothstep(gap, gap + 2.5, distance)) * smoothstep(0.0, 0.3, open));
  }
  for (int index = 0; index < ${ft}; index++) {
    if (index >= uHoleCount) break;
    vec4 hole = uHoles[index];
    if (hole.w != side) continue;
    vec2 delta = vec2((x - hole.x * uLength) * 0.6, y - hole.y * blade);
    float wobble = 1.0 + 0.3 * (noise(delta / (hole.z * 0.6) + seed) - 0.5);
    float dist = length(delta) / wobble;
    float radius = hole.z;
    float cut = 1.0 - smoothstep(radius - 1.0, radius + 1.0, dist);
    tear = max(tear, cut);
    tearEdge = max(tearEdge, 0.6 * (1.0 - smoothstep(radius, radius * 1.5, dist)));
  }
  coverage *= 1.0 - tear * (1.0 - inRib);
  if (coverage <= 0.001) discard;

  // ---- Veins: very fine ones, barely more than a texture, and irregular
  // stronger ones between them.
  float fine = 1.0 - smoothstep(0.0, max(phiWidth * 0.9, 0.1), lineDistance(phi, 1.0));
  float strongPhase = phi + 2.5 * noise(vec2(phi / 9.0, seed));
  float strong = 1.0 - smoothstep(0.0, max(phiWidth * 1.3, 0.2), lineDistance(strongPhase, 8.0));

  // ---- Surface: pleated along the veins in bands of uneven width, the
  // halves hanging from the midrib, and a slow undulation.
  float pleatPhase = phi / 7.0 + 2.4 * fbm(vec2(phi / 24.0, t * 1.4 + seed));
  float pleatStrength = 0.45 + 0.55 * noise(vec2(x / (uScale * 0.07), t * 2.0 + seed + 5.0));
  float pleat = cos(pleatPhase * 6.2831);
  float pleatSlope = 0.3 * pleatStrength * pleat;
  vec2 gradPhi = vec2(1.0, -(slope + 1.2 * t * t * t * t)) / spacing;
  vec2 tilt = pleatSlope * normalize(gradPhi);
  tilt.y -= 0.6 * t;
  tilt += 0.16 * (vec2(
    noise(vec2(x / (uScale * 0.09), y / (uScale * 0.06) + seed)),
    noise(vec2(x / (uScale * 0.09) + 9.0, y / (uScale * 0.06) + seed))
  ) - 0.5);
  vec2 normalScreen = vec2(-vTangent.y, vTangent.x) * side;
  vec3 normal = normalize(vec3(
    -(vTangent * tilt.x + normalScreen * tilt.y),
    1.0
  ));

  // ---- Light: the sun behind the canopy shines through the blade, the sky
  // above lights and glosses the side we see.
  vec3 light = normalize(vec3(0.25, -0.85, 0.55));
  vec3 halfway = normalize(light + vec3(0.0, 0.0, 1.0));
  float diffuse = max(dot(normal, light), 0.0);
  float sheen = pow(max(dot(normal, halfway), 0.0), 18.0);

  float along = smoothstep(0.02, 0.3, vS) * (1.0 - 0.3 * smoothstep(0.78, 1.0, vS));
  float dapple = 0.5 + 0.9 * fbm(vec2(vS * 4.0, t * 1.1 + seed));
  // Thinner between the veins, and toward the margin.
  float thin = (1.0 - 0.12 * fine - 0.22 * strong) * (0.85 + 0.15 * smoothstep(0.2, 0.9, t));
  float glow = uBacklight * along * dapple * thin * (0.9 + 0.1 * pleat * pleatStrength);
  float mottle = 0.9 + 0.2 * fbm(vec2(x, y) / (uScale * 0.02) + seed);

  vec3 surface = vec3(0.05, 0.1, 0.036) * (0.4 + 0.8 * diffuse) * mottle;
  vec3 transmitted = mix(vec3(0.2, 0.32, 0.05), vec3(0.8, 0.86, 0.3), clamp(glow * 0.9, 0.0, 1.0));
  vec3 color = surface + transmitted * glow;
  color += vec3(0.58, 0.68, 0.62) * sheen * (0.34 - 0.24 * uBacklight) * (0.7 + 0.3 * pleat);
  // Deeper colour toward the margin and in the fold along the midrib.
  color *= 0.8 + 0.2 * smoothstep(1.0, 0.5, t);
  color *= 0.72 + 0.28 * smoothstep(0.0, ribHalf * 2.5, y - ribHalf);

  // ---- Dry margin (patchy), dry split edges and a drying tip.
  float dryWidth = 0.06 * smoothstep(0.35, 0.8, fbm(vec2(x / (uScale * 0.07), seed + 11.0)));
  float dry = smoothstep(edge - 0.012 - dryWidth, edge, t);
  dry = max(dry, tearEdge * 0.35);
  dry = max(dry, smoothstep(0.88, 1.0, vS) * 0.6);
  vec3 dryColor = mix(vec3(0.2, 0.15, 0.07), vec3(0.5, 0.4, 0.18), clamp(uBacklight * along, 0.0, 1.0));
  color = mix(color, dryColor, dry * 0.8);

  // ---- Midrib: a thick, pale ridge with a groove along its top, lit on
  // one flank, and translucent where the sun comes through.
  if (inRib > 0.0) {
    float across = clamp(vY / ribHalf, -1.0, 1.0);
    float ridge = sqrt(max(0.0, 1.0 - across * across));
    float groove = 1.0 - 0.35 * (1.0 - smoothstep(0.0, 0.28, abs(across + 0.1)));
    float ribLight = (0.5 + 0.5 * clamp(0.6 * ridge - 0.5 * across, 0.0, 1.0)) * groove;
    vec3 ribColor = mix(vec3(0.3, 0.36, 0.17), vec3(0.8, 0.82, 0.5), 0.3 + 0.6 * uBacklight * along);
    ribColor *= ribLight * (0.92 + 0.08 * noise(vec2(x / (uScale * 0.006), seed)));
    color = mix(color, ribColor, inRib);
  }

  color *= 1.0 - 0.55 * uShade;
  fragColor = vec4(color * coverage, coverage);
}`;let J=null,ht=!1;const Mt=(a,e,i)=>{const g=a.createShader(e);return g?(a.shaderSource(g,i),a.compileShader(g),a.getShaderParameter(g,a.COMPILE_STATUS)?g:(a.deleteShader(g),null)):null},At=()=>{if(J)return J;if(ht)return null;ht=!0;const e=document.createElement("canvas").getContext("webgl2",{premultipliedAlpha:!0,alpha:!0,antialias:!0,preserveDrawingBuffer:!1});if(!e)return null;const i=Mt(e,e.VERTEX_SHADER,Ct),g=Mt(e,e.FRAGMENT_SHADER,Et);if(!i||!g)return null;const p=e.createProgram(),S=e.createBuffer();if(!p||!S||(e.attachShader(p,i),e.attachShader(p,g),e.linkProgram(p),!e.getProgramParameter(p,e.LINK_STATUS)))return null;const t=Object.fromEntries(["uResolution","uLength","uScale","uSeed","uBacklight","uShade","uStalk","uTears","uTearCount","uHoles","uHoleCount"].map(f=>[f,e.getUniformLocation(p,f)]));return ht=!1,J={gl:e,program:p,buffer:S,locations:t},J},It=()=>{var a;J&&((a=J.gl.getExtension("WEBGL_lose_context"))==null||a.loseContext(),J=null,ht=!1)},j=160,ct=.06,wt=7,kt=(a,e,i)=>{const g=a.clientWidth,p=a.clientHeight;if(g===0||p===0)return!1;const S=At();if(!S)return!1;const{gl:n,program:t,buffer:f,locations:T}=S,H=Math.round(g*i),L=Math.round(p*i),c=n.canvas;c.width=H,c.height=L;const w=xt(e.seed),I=L,U=e.length*I,Q=e.halfWidth*I,E=e.turn??0,X=[],at=[],Z=[];let nt=e.baseX*H,C=e.baseY*L;for(let m=0;m<=j;m+=1){const b=m/j,v=e.angle+e.bend*Math.pow(b,1.6);X.push([nt,C]),at.push([Math.sin(v),-Math.cos(v)]);const P=b<ct?0:(b-ct)/(1-ct),R=Math.pow(Math.sin(Math.min(1,P/.26)*(Math.PI/2)),.75),D=Math.pow(Math.cos(Math.max(0,(P-.58)/.42)*(Math.PI/2)),.85),F=P<=0?0:R*D,G=1+.04*Math.sin(b*19+e.seed);Z.push([Q*F*(1-E)*G,Q*F*(1+E*.15)*G]),nt+=Math.sin(v)*(U/j),C+=-Math.cos(v)*(U/j)}const B=I*.012,tt=[0,.25,.5,.7,.85,1,1.12],et=[],O=(m,b,v)=>{const[P,R]=X[m],[D,F]=at[m],G=-F,mt=D,st=Z[m][b<0?0:1],N=Math.max(st,B)*v;et.push(P+G*N*b,R+mt*N*b,m/j,N*b,st,D,F)};for(const m of[-1,1])for(let b=0;b<tt.length-1;b+=1)for(let v=0;v<j;v+=1){const P=tt[b],R=tt[b+1];O(v,m,P),O(v,m,R),O(v+1,m,P),O(v+1,m,P),O(v,m,R),O(v+1,m,R)}const ut=I*.0036,rt=[];let ot=0;for(const m of[-1,1])for(let b=0;b<e.tears&&ot<dt;b+=1){const v=.16+w()*.8,P=Math.round(v*j),R=Z[P][m<0?0:1],D=Math.round((v*U-R*.66)/ut),F=.3+w()*.65,G=I*(.002+w()*.009);rt.push(D,F,G,m),ot+=1}const lt=[];let V=0;const gt=Math.floor(w()*3);for(let m=0;m<gt&&V<ft;m+=1){const b=w()<.5?-1:1;lt.push(.25+w()*.65,.86+w()*.14,I*(.004+w()*.009),b),V+=1}n.viewport(0,0,H,L),n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n.useProgram(t),n.bindBuffer(n.ARRAY_BUFFER,f),n.bufferData(n.ARRAY_BUFFER,new Float32Array(et),n.STATIC_DRAW);const q=(m,b,v)=>{const P=n.getAttribLocation(t,m);P<0||(n.enableVertexAttribArray(P),n.vertexAttribPointer(P,b,n.FLOAT,!1,wt*4,v*4))};q("aPosition",2,0),q("aS",1,2),q("aY",1,3),q("aBlade",1,4),q("aTangent",2,5),n.uniform2f(T.uResolution,H,L),n.uniform1f(T.uLength,U),n.uniform1f(T.uScale,I),n.uniform1f(T.uSeed,e.seed),n.uniform1f(T.uBacklight,e.backlight),n.uniform1f(T.uShade,e.shade??0),n.uniform1f(T.uStalk,ct),n.uniform4fv(T.uTears,new Float32Array([...rt,...Array((dt-ot)*4).fill(0)])),n.uniform1i(T.uTearCount,ot),n.uniform4fv(T.uHoles,new Float32Array([...lt,...Array((ft-V)*4).fill(0)])),n.uniform1i(T.uHoleCount,V),n.drawArrays(n.TRIANGLES,0,et.length/wt),a.width=H,a.height=L;const $=a.getContext("2d");if(!$)return!1;$.clearRect(0,0,H,L);const it=(e.blur??0)*i;return it>.5&&"filter"in $&&($.filter=`blur(${it.toFixed(1)}px)`),$.drawImage(c,0,0),$.filter="none",!0},Lt={shade:[24,44,18],glow:[150,176,58],edge:[18,32,12],rib:[206,208,132],margin:[118,98,48]},k=(a,e,i)=>[a[0]+(e[0]-a[0])*i,a[1]+(e[1]-a[1])*i,a[2]+(e[2]-a[2])*i],M=([a,e,i],g=1)=>`rgba(${Math.round(a)}, ${Math.round(e)}, ${Math.round(i)}, ${g})`,Tt=(a,e,i)=>{const g=Math.min(1,Math.max(0,(i-a)/(e-a)));return g*g*(3-2*g)},x=90,Pt=(a,e=64)=>{const i=Array.from({length:e},()=>a());return g=>{const p=Math.floor(g),S=g-p,n=i[(p%e+e)%e],t=i[((p+1)%e+e)%e],f=S*S*(3-2*S);return n+(t-n)*f}};let bt=null;const Rt=()=>{if(bt)return bt;const a=document.createElement("canvas");a.width=96,a.height=96;const e=a.getContext("2d");if(e){const i=e.createImageData(96,96),g=xt(97);for(let p=0;p<i.data.length;p+=4){const S=96+g()*64;i.data[p]=S,i.data[p+1]=S,i.data[p+2]=S,i.data[p+3]=255}e.putImageData(i,0,0)}return bt=a,a},Dt=(a,e,i=Math.min(window.devicePixelRatio||1,2))=>kt(a,e,i)||Bt(a,e,i),Bt=(a,e,i)=>{var yt;const g=a.clientWidth,p=a.clientHeight;if(g===0||p===0)return!1;const S=Math.round(g*i),n=Math.round(p*i);a.width=S,a.height=n;const t=a.getContext("2d");if(!t)return!1;const f=xt(e.seed),T=Lt,H=1-.55*(e.shade??0),L=o=>[o[0]*H,o[1]*H,o[2]*H],c={shade:L(T.shade),glow:L(T.glow),edge:L(T.edge),rib:L(T.rib),margin:L(T.margin)},w=n,I=e.length*w,U=e.halfWidth*w,Q=e.turn??0,E=[],X=[],at=[];let Z=e.baseX*S,nt=e.baseY*n;for(let o=0;o<=x;o+=1){const r=o/x,s=e.angle+e.bend*Math.pow(r,1.6);E.push([Z,nt]),X.push([Math.cos(s),Math.sin(s)]);const l=r<.06?0:(r-.06)/.94,h=Math.pow(Math.sin(Math.min(1,l/.26)*(Math.PI/2)),.75),d=Math.pow(Math.cos(Math.max(0,(l-.58)/.42)*(Math.PI/2)),.85),u=l<=0?.03:Math.max(.03,h*d),y=1+.045*Math.sin(r*23+e.seed)+(f()-.5)*.05;at.push([U*u*(1-Q)*y,U*u*(1+Q*.15)*y]),Z+=Math.sin(s)*(I/x),nt+=-Math.cos(s)*(I/x)}const C=(o,r,s=1)=>{const[l,h]=E[o],[d,u]=X[o],y=at[o][r<0?0:1]*s;return[l+r*d*y,h+r*u*y]};t.save(),t.clearRect(0,0,S,n);const B=new Path2D,tt=C(0,-1);B.moveTo(tt[0],tt[1]);for(let o=1;o<=x;o+=1){const[r,s]=C(o,-1);B.lineTo(r,s)}for(let o=x;o>=0;o-=1){const[r,s]=C(o,1);B.lineTo(r,s)}B.closePath();const et=Array.from({length:x+1},()=>.85+f()*.3),O=f()*Math.PI*2,ut=Pt(f),rt=.25+.5*e.backlight;for(const o of[-1,1])for(let r=0;r<x;r+=1){const s=r/x,l=Tt(.08,.45,s)*(1-.35*Tt(.72,1,s)),h=1+.2*Math.sin(s*Math.PI*2*17+O)*et[r],d=1-rt+rt*1.6*ut(s*7+(o<0?0:31)),u=e.backlight*l*et[r]*h*d*(o<0?1-Q*.6:1),y=k(c.shade,c.glow,u),_=k(c.shade,c.glow,u*.72),Y=k(c.edge,c.shade,.4+u*.3),A=E[r],W=C(r,o),z=t.createLinearGradient(A[0],A[1],W[0],W[1]);z.addColorStop(0,M(k(y,c.shade,.25))),z.addColorStop(.18,M(y)),z.addColorStop(.7,M(_)),z.addColorStop(1,M(Y)),t.fillStyle=z;const K=C(r+1,o);t.beginPath(),t.moveTo(A[0],A[1]),t.lineTo(E[r+1][0],E[r+1][1]),t.lineTo(K[0],K[1]),t.lineTo(W[0],W[1]),t.closePath(),t.fill()}t.save(),t.clip(B),t.lineCap="round";const ot=.0045;for(let o=.08;o<.985;o+=ot){const r=Math.round(o*x),s=Math.min(x,r+2),l=f()<.12;t.lineWidth=Math.max(.6,w*(l?.0016:8e-4)),t.strokeStyle=M(c.edge,l?.42:.24);for(const h of[-1,1]){const[d,u]=E[r],[y,_]=C(s,h,1.02),[Y,A]=C(Math.min(x,r+1),h,.55);t.beginPath(),t.moveTo(d,u),t.quadraticCurveTo(Y,A,y,_),t.stroke()}}t.restore(),t.save(),t.clip(B);const lt=t.createPattern(Rt(),"repeat");lt&&(t.globalCompositeOperation="soft-light",t.globalAlpha=.35,t.fillStyle=lt,t.fillRect(0,0,S,n)),t.restore(),t.save(),t.globalCompositeOperation="destination-out";const V=[];for(const o of[-1,1])for(let r=0;r<e.tears;r+=1){const s=.16+f()*.78,l=Math.round(s*x),h=Math.min(x,l+2),d=.3+f()*.68,u=w*(.003+f()*.009),[y,_]=C(h,o,1.05),[Y,A]=C(l,o,1-d),[W,z]=X[l],K=[-z,W],pt=[y+K[0]*u,_+K[1]*u],vt=[y-K[0]*u,_-K[1]*u];t.beginPath(),t.moveTo(Y,A),t.lineTo(pt[0],pt[1]),t.lineTo(vt[0],vt[1]),t.closePath(),t.fill(),V.push({inner:[Y,A],left:pt,right:vt})}const gt=3+Math.floor(f()*4);for(let o=0;o<gt;o+=1){const r=Math.round((.2+f()*.7)*x),s=f()<.5?-1:1,[l,h]=C(r,s,.97),d=w*(.004+f()*.008);t.beginPath(),t.ellipse(l,h,d*1.4,d,f()*Math.PI,0,Math.PI*2),t.fill()}t.restore(),t.save(),t.clip(B),t.lineCap="round",V.forEach(({inner:o,left:r,right:s})=>{for(const l of[r,s]){const h=t.createLinearGradient(o[0],o[1],l[0],l[1]);h.addColorStop(0,M(c.margin,.05)),h.addColorStop(.6,M(c.margin,.35)),h.addColorStop(1,M(k(c.margin,[70,46,20],.4),.7)),t.strokeStyle=h,t.lineWidth=Math.max(.8,w*.0016),t.beginPath(),t.moveTo(o[0],o[1]),t.lineTo(l[0],l[1]),t.stroke()}}),t.restore(),t.save(),t.clip(B);const q=Pt(f);for(const o of[-1,1])for(let r=2;r<x-1;r+=1){const s=r/x,l=q(s*18+(o<0?0:40)),[h,d]=C(r,o),[u,y]=C(r+1,o);t.strokeStyle=M(k(c.margin,[74,50,22],l*.5),.25+.45*l),t.lineWidth=Math.max(1,w*(.002+.006*l*l)),t.beginPath(),t.moveTo(h,d),t.lineTo(u,y),t.stroke()}const[$,it]=E[x],[m,b]=E[Math.round(x*.86)],v=t.createLinearGradient(m,b,$,it);v.addColorStop(0,M(c.margin,0)),v.addColorStop(1,M(k(c.margin,[80,54,24],.5),.55)),t.fillStyle=v,t.fill(B);const P=2+Math.floor(f()*4);for(let o=0;o<P;o+=1){const r=Math.round((.35+f()*.6)*x),s=f()<.5?-1:1,[l,h]=C(r,s,.45+f()*.45),d=w*(.006+f()*.012),u=t.createRadialGradient(l,h,0,l,h,d);u.addColorStop(0,M(k(c.margin,[90,62,26],.5),.5)),u.addColorStop(.7,M(c.margin,.2)),u.addColorStop(1,M(c.margin,0)),t.fillStyle=u,t.beginPath(),t.ellipse(l,h,d*1.6,d,f()*Math.PI,0,Math.PI*2),t.fill()}t.restore();const R=o=>w*(.014*Math.pow(1-o,1.2)+.0015),D=(o,r)=>{const s=new Path2D,l=[],h=[];E.forEach(([d,u],y)=>{const[_,Y]=X[y],A=R(y/x)*r/2,W=o*R(y/x);l.push([d+_*(W-A),u+Y*(W-A)]),h.push([d+_*(W+A),u+Y*(W+A)])}),s.moveTo(l[0][0],l[0][1]),l.forEach(([d,u])=>s.lineTo(d,u));for(let d=h.length-1;d>=0;d-=1)s.lineTo(h[d][0],h[d][1]);return s.closePath(),s},[F,G]=E[0],[mt,st]=E[x],N=t.createLinearGradient(F,G,mt,st);N.addColorStop(0,M(k(c.shade,c.rib,.35),.95)),N.addColorStop(.5,M(k(k(c.shade,c.rib,.35),c.rib,e.backlight),.95)),N.addColorStop(1,M(k(k(c.shade,c.rib,.35),c.rib,e.backlight),.9)),t.fillStyle=M(c.edge,.4),t.fill(D(.12,1.4)),t.fillStyle=N,t.fill(D(0,1)),t.fillStyle=M(k(c.rib,[255,250,220],.35),.35),t.fill(D(-.22,.28)),t.restore();const St=(e.blur??0)*i;if(St>.5&&"filter"in t){const o=document.createElement("canvas");o.width=S,o.height=n,(yt=o.getContext("2d"))==null||yt.drawImage(a,0,0),t.clearRect(0,0,S,n),t.filter=`blur(${St.toFixed(1)}px)`,t.drawImage(o,0,0),t.filter="none"}return!0};export{Dt as paintBananaLeaf,It as releaseLeafRenderer};
