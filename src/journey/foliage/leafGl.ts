import { createRandom } from "../math";
import type { BananaLeafSpec } from "./bananaLeaf";

/**
 * Banana leaves shaded per pixel with WebGL2: a blade on a curved midrib,
 * dense parallel veins leaving the midrib toward the tip, the blade pleated
 * along its veins, light glowing through it from behind and a glossy sheen
 * where it faces the sky, a raised pale midrib, splits that run exactly
 * along the veins, and dry, wavy margins. One offscreen WebGL canvas renders
 * every leaf; each result is copied into the leaf's own 2D canvas (with its
 * depth-of-field blur), so nothing is re-rendered while the page scrolls.
 */

const VERTEX = `#version 300 es
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
}`;

const MAX_TEARS = 32;
const MAX_HOLES = 8;

const FRAGMENT = `#version 300 es
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
uniform vec4 uTears[${MAX_TEARS}];
uniform int uTearCount;
uniform vec4 uHoles[${MAX_HOLES}];
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
  for (int index = 0; index < ${MAX_TEARS}; index++) {
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
  for (int index = 0; index < ${MAX_HOLES}; index++) {
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
}`;

type Program = {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  buffer: WebGLBuffer;
  locations: Record<string, WebGLUniformLocation | null>;
};

let shared: Program | null = null;
let failed = false;

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (import.meta.env.DEV) console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const getProgram = (): Program | null => {
  if (shared) return shared;
  if (failed) return null;
  failed = true;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2", {
    premultipliedAlpha: true,
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  if (!program || !buffer) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  const names = [
    "uResolution",
    "uLength",
    "uScale",
    "uSeed",
    "uBacklight",
    "uShade",
    "uStalk",
    "uTears",
    "uTearCount",
    "uHoles",
    "uHoleCount",
  ];
  const locations = Object.fromEntries(
    names.map((name) => [name, gl.getUniformLocation(program, name)]),
  );
  failed = false;
  shared = { gl, program, buffer, locations };
  return shared;
};

/** Frees the WebGL context once every leaf has been painted. */
export const releaseLeafRenderer = () => {
  if (!shared) return;
  shared.gl.getExtension("WEBGL_lose_context")?.loseContext();
  shared = null;
  failed = false;
};

const SAMPLES = 160;
const STALK = 0.06;
// Floats per vertex: position (2), s, y, blade half-width, tangent (2).
const STRIDE = 7;

/**
 * Renders `spec` into `target` (a 2D canvas sized by CSS). Returns false
 * when WebGL2 is not available, so the caller can fall back.
 */
export const renderBananaLeaf = (
  target: HTMLCanvasElement,
  spec: BananaLeafSpec,
  pixelRatio: number,
) => {
  const cssWidth = target.clientWidth;
  const cssHeight = target.clientHeight;
  if (cssWidth === 0 || cssHeight === 0) return false;
  const shader = getProgram();
  if (!shader) return false;
  const { gl, program, buffer, locations } = shader;

  const width = Math.round(cssWidth * pixelRatio);
  const height = Math.round(cssHeight * pixelRatio);
  const canvas = gl.canvas as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;

  const random = createRandom(spec.seed);
  const scale = height;
  const length = spec.length * scale;
  const halfWidth = spec.halfWidth * scale;
  const turn = spec.turn ?? 0;

  // Midrib: integrate a direction that turns more and more toward the tip.
  const rib: Array<[number, number]> = [];
  const tangents: Array<[number, number]> = [];
  const widths: Array<[number, number]> = [];
  let x = spec.baseX * width;
  let y = spec.baseY * height;
  for (let index = 0; index <= SAMPLES; index += 1) {
    const u = index / SAMPLES;
    const theta = spec.angle + spec.bend * Math.pow(u, 1.6);
    rib.push([x, y]);
    tangents.push([Math.sin(theta), -Math.cos(theta)]);
    // Rounded base, long parallel middle, tapering drooping tip.
    const blade = u < STALK ? 0 : (u - STALK) / (1 - STALK);
    const rise = Math.pow(
      Math.sin(Math.min(1, blade / 0.26) * (Math.PI / 2)),
      0.75,
    );
    const fall = Math.pow(
      Math.cos(Math.max(0, (blade - 0.58) / 0.42) * (Math.PI / 2)),
      0.85,
    );
    const profile = blade <= 0 ? 0 : rise * fall;
    const wobble = 1 + 0.04 * Math.sin(u * 19 + spec.seed);
    widths.push([
      halfWidth * profile * (1 - turn) * wobble,
      halfWidth * profile * (1 + turn * 0.15) * wobble,
    ]);
    x += Math.sin(theta) * (length / SAMPLES);
    y += -Math.cos(theta) * (length / SAMPLES);
  }

  // Two strips, one per side of the midrib, reaching a little past the
  // margin (the shader draws the actual outline) and wide enough for the
  // midrib along the stalk.
  const ribReach = scale * 0.012;
  const across = [0, 0.25, 0.5, 0.7, 0.85, 1, 1.12];
  const vertices: number[] = [];
  const push = (index: number, side: -1 | 1, fraction: number) => {
    const [rx, ry] = rib[index];
    const [tx, ty] = tangents[index];
    const nx = -ty;
    const ny = tx;
    const blade = widths[index][side < 0 ? 0 : 1];
    const reach = Math.max(blade, ribReach) * fraction;
    vertices.push(
      rx + nx * reach * side,
      ry + ny * reach * side,
      index / SAMPLES,
      reach * side,
      blade,
      tx,
      ty,
    );
  };
  for (const side of [-1, 1] as const) {
    for (let column = 0; column < across.length - 1; column += 1) {
      for (let index = 0; index < SAMPLES; index += 1) {
        const a = across[column];
        const b = across[column + 1];
        push(index, side, a);
        push(index, side, b);
        push(index + 1, side, a);
        push(index + 1, side, a);
        push(index, side, b);
        push(index + 1, side, b);
      }
    }
  }

  // Splits along the veins (as vein phases at the margin) and holes.
  const spacing = scale * 0.0036;
  const tears: number[] = [];
  let tearCount = 0;
  for (const side of [-1, 1] as const) {
    for (let tear = 0; tear < spec.tears && tearCount < MAX_TEARS; tear += 1) {
      const u = 0.16 + random() * 0.8;
      const index = Math.round(u * SAMPLES);
      const blade = widths[index][side < 0 ? 0 : 1];
      // The vein that reaches the margin here.
      const phase = Math.round((u * length - blade * 0.66) / spacing);
      const depth = 0.3 + random() * 0.65;
      const gap = scale * (0.002 + random() * 0.009);
      tears.push(phase, depth, gap, side);
      tearCount += 1;
    }
  }
  const holes: number[] = [];
  let holeCount = 0;
  const bites = Math.floor(random() * 3);
  for (let bite = 0; bite < bites && holeCount < MAX_HOLES; bite += 1) {
    const side = random() < 0.5 ? -1 : 1;
    holes.push(
      0.25 + random() * 0.65,
      0.86 + random() * 0.14,
      scale * (0.004 + random() * 0.009),
      side,
    );
    holeCount += 1;
  }

  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  const attribute = (name: string, size: number, offset: number) => {
    const location = gl.getAttribLocation(program, name);
    if (location < 0) return;
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(
      location,
      size,
      gl.FLOAT,
      false,
      STRIDE * 4,
      offset * 4,
    );
  };
  attribute("aPosition", 2, 0);
  attribute("aS", 1, 2);
  attribute("aY", 1, 3);
  attribute("aBlade", 1, 4);
  attribute("aTangent", 2, 5);

  gl.uniform2f(locations.uResolution, width, height);
  gl.uniform1f(locations.uLength, length);
  gl.uniform1f(locations.uScale, scale);
  gl.uniform1f(locations.uSeed, spec.seed);
  gl.uniform1f(locations.uBacklight, spec.backlight);
  gl.uniform1f(locations.uShade, spec.shade ?? 0);
  gl.uniform1f(locations.uStalk, STALK);
  gl.uniform4fv(
    locations.uTears,
    new Float32Array([...tears, ...Array((MAX_TEARS - tearCount) * 4).fill(0)]),
  );
  gl.uniform1i(locations.uTearCount, tearCount);
  gl.uniform4fv(
    locations.uHoles,
    new Float32Array([...holes, ...Array((MAX_HOLES - holeCount) * 4).fill(0)]),
  );
  gl.uniform1i(locations.uHoleCount, holeCount);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / STRIDE);

  // Copy into the leaf's own canvas, baking the depth-of-field blur.
  target.width = width;
  target.height = height;
  const context = target.getContext("2d");
  if (!context) return false;
  context.clearRect(0, 0, width, height);
  const blur = (spec.blur ?? 0) * pixelRatio;
  if (blur > 0.5 && "filter" in context) {
    context.filter = `blur(${blur.toFixed(1)}px)`;
  }
  context.drawImage(canvas, 0, 0);
  context.filter = "none";
  return true;
};
