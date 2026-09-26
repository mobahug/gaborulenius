import type { DirectorFrame } from "../director/director";
import { filmRect } from "../director/frameMapping";
import { FILMS } from "../film/films";
import { smoothstep } from "../math";

/*
 * The macaw flies in front of the page. While it crosses the clearing
 * (3.65–5.45 s of the chase, over About) the chase video is drawn a second
 * time, above the content, through a key that keeps only the bird: its
 * scarlet, yellow and blue feathers are the only saturated colours of those
 * hues in the jungle, whose greens and pale haze fall outside them. The key
 * is taken at quarter resolution and closed (dilated, then eroded by as
 * much), which fills the gaps between feathers and the white face without
 * growing the outline; sampled smoothly, it lets the bird's own pixels be
 * drawn over the words — exactly where, and exactly as, the film underneath
 * shows them.
 */

const CHASE = FILMS[0];
const WINDOW = { start: [3.65, 3.8], end: [5.2, 5.45] } as const;
const KEY_WIDTH = 470;
const KEY_HEIGHT = 270;
/** Radius of the closing, in key texels (≈ 20 px of the full-HD frame). */
const CLOSE = 5;

const VERTEX = `#version 300 es
in vec2 position;
out vec2 screen;
void main() {
  screen = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Pass 1: the key, in frame coordinates (v = 0 at the top of the frame).
const KEY = `#version 300 es
precision highp float;
in vec2 screen;
uniform sampler2D video;
out vec4 color;
float bird(vec3 c) {
  float high = max(c.r, max(c.g, c.b));
  float chroma = high - min(c.r, min(c.g, c.b));
  float saturation = high > 0.0 ? chroma / high : 0.0;
  float hue = 0.0;
  if (chroma > 1e-5) {
    if (high == c.r) hue = mod((c.g - c.b) / chroma, 6.0);
    else if (high == c.g) hue = (c.b - c.r) / chroma + 2.0;
    else hue = (c.r - c.g) / chroma + 4.0;
  }
  hue *= 60.0;
  float red = (hue > 335.0 || hue < 42.0 ? 1.0 : 0.0)
    * smoothstep(0.58, 0.7, saturation) * smoothstep(0.22, 0.32, high);
  float yellow = smoothstep(40.0, 46.0, hue) * (1.0 - smoothstep(58.0, 64.0, hue))
    * smoothstep(0.62, 0.75, saturation) * smoothstep(0.4, 0.5, high);
  float blue = smoothstep(185.0, 195.0, hue) * (1.0 - smoothstep(250.0, 262.0, hue))
    * smoothstep(0.16, 0.28, saturation) * smoothstep(0.18, 0.28, high);
  return max(red, max(yellow, blue));
}
void main() {
  color = vec4(bird(texture(video, screen).rgb), 0.0, 0.0, 1.0);
}`;

// Passes 2–5: the closing, separably — dilate across, then down, then
// erode across, then down.
const MORPH = `#version 300 es
precision mediump float;
in vec2 screen;
uniform sampler2D source;
uniform vec2 step;
uniform float grow;
out vec4 color;
void main() {
  float m = texture(source, screen).r;
  for (int i = 1; i <= ${CLOSE}; i++) {
    float a = texture(source, screen + step * float(i)).r;
    float b = texture(source, screen - step * float(i)).r;
    m = grow > 0.5 ? max(m, max(a, b)) : min(m, min(a, b));
  }
  color = vec4(m, 0.0, 0.0, 1.0);
}`;

// Last pass: the bird's pixels over the page, premultiplied.
const COMPOSITE = `#version 300 es
precision mediump float;
in vec2 screen;
uniform sampler2D video;
uniform sampler2D mask;
uniform vec4 frame;
uniform vec2 viewport;
uniform float envelope;
out vec4 color;
void main() {
  vec2 px = vec2(screen.x, 1.0 - screen.y) * viewport;
  vec2 uv = (px - frame.xy) / frame.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) {
    color = vec4(0.0);
    return;
  }
  float a = smoothstep(0.3, 0.75, texture(mask, uv).r) * envelope;
  color = vec4(texture(video, uv).rgb * a, a);
}`;

const compile = (
  gl: WebGL2RenderingContext,
  vertex: string,
  fragment: string,
) => {
  const program = gl.createProgram()!;
  [
    [gl.VERTEX_SHADER, vertex],
    [gl.FRAGMENT_SHADER, fragment],
  ].forEach(([type, source]) => {
    const shader = gl.createShader(type as number)!;
    gl.shaderSource(shader, source as string);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  });
  gl.bindAttribLocation(program, 0, "position");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  return program;
};

type Target = { texture: WebGLTexture; framebuffer: WebGLFramebuffer };

export class MacawKey {
  private readonly canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | null = null;
  private key: WebGLProgram | null = null;
  private morph: WebGLProgram | null = null;
  private composite: WebGLProgram | null = null;
  private videoTexture: WebGLTexture | null = null;
  /** The raw key, and two targets the closing ping-pongs between. */
  private targets: Target[] = [];
  private uploaded: number | null = null;
  private shown = false;
  private failed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.style.visibility = "hidden";
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      this.gl = null;
      this.targets = [];
    });
    canvas.addEventListener("webglcontextrestored", () => {
      this.uploaded = null;
    });
  }

  private setup() {
    if (this.gl || this.failed) return this.gl;
    const gl = this.canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    const key = gl && compile(gl, VERTEX, KEY);
    const morph = gl && compile(gl, VERTEX, MORPH);
    const composite = gl && compile(gl, VERTEX, COMPOSITE);
    if (!gl || !key || !morph || !composite) {
      this.failed = true;
      return null;
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const texture = () => {
      const handle = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, handle);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return handle;
    };
    this.videoTexture = texture();
    this.targets = [0, 1, 2].map(() => {
      const target = texture();
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        KEY_WIDTH,
        KEY_HEIGHT,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null,
      );
      const framebuffer = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        target,
        0,
      );
      return { texture: target, framebuffer };
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.useProgram(composite);
    gl.uniform1i(gl.getUniformLocation(composite, "video"), 0);
    gl.uniform1i(gl.getUniformLocation(composite, "mask"), 1);
    gl.useProgram(morph);
    gl.uniform1i(gl.getUniformLocation(morph, "source"), 0);
    gl.useProgram(key);
    gl.uniform1i(gl.getUniformLocation(key, "video"), 0);
    this.gl = gl;
    this.key = key;
    this.morph = morph;
    this.composite = composite;
    return gl;
  }

  /** The key of the picture in the video texture, closed; ends in target 2. */
  private keyPicture(gl: WebGL2RenderingContext) {
    const [raw, a, b] = this.targets;
    gl.viewport(0, 0, KEY_WIDTH, KEY_HEIGHT);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    gl.bindFramebuffer(gl.FRAMEBUFFER, raw.framebuffer);
    gl.useProgram(this.key);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.useProgram(this.morph);
    const step = gl.getUniformLocation(this.morph!, "step");
    const grow = gl.getUniformLocation(this.morph!, "grow");
    const passes: Array<[Target, Target, number, number, number]> = [
      [raw, a, 1 / KEY_WIDTH, 0, 1],
      [a, b, 0, 1 / KEY_HEIGHT, 1],
      [b, a, 1 / KEY_WIDTH, 0, 0],
      [a, b, 0, 1 / KEY_HEIGHT, 0],
    ];
    passes.forEach(([from, to, x, y, dilate]) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, to.framebuffer);
      gl.bindTexture(gl.TEXTURE_2D, from.texture);
      gl.uniform2f(step, x, y);
      gl.uniform1f(grow, dilate);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /**
   * Compiles the shaders and runs every pass once, invisibly, on an empty
   * texture while the page is idle (drivers finish compiling on the first
   * draw).
   */
  warm() {
    const gl = this.setup();
    if (!gl || !this.composite) return;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array(4),
    );
    this.keyPicture(gl);
    // At its real size, so the first frame of the bird allocates nothing.
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(window.innerWidth * ratio);
    this.canvas.height = Math.round(window.innerHeight * ratio);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.composite);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.targets[2].texture);
    gl.uniform1f(gl.getUniformLocation(this.composite, "envelope"), 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.uploaded = null;
  }

  private hide() {
    if (!this.shown) return;
    this.shown = false;
    this.canvas.style.visibility = "hidden";
    const gl = this.gl;
    if (gl) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
  }

  draw(frame: DirectorFrame, video: HTMLVideoElement | null) {
    const chase = frame.timeline.films[0];
    const time = frame.stage.presented[0];
    const envelope =
      time === null
        ? 0
        : smoothstep(WINDOW.start[0], WINDOW.start[1], time) *
          (1 - smoothstep(WINDOW.end[0], WINDOW.end[1], time));
    if (
      frame.reduced ||
      !chase ||
      !video ||
      time === null ||
      envelope <= 0 ||
      video.readyState < 2
    ) {
      this.hide();
      return false;
    }
    const gl = this.setup();
    if (!gl || !this.composite) return false;

    const { vw, vh } = frame.viewport;
    const ratio =
      frame.deviceTier === "low"
        ? 1
        : Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.round(vw * ratio);
    const height = Math.round(vh * ratio);
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }

    if (this.uploaded !== time) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        video,
      );
      this.uploaded = time;
      // The key only changes with the picture.
      this.keyPicture(gl);
    }

    const rect = filmRect(CHASE, time, vw, vh);
    gl.viewport(0, 0, width, height);
    gl.useProgram(this.composite);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.targets[2].texture);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    const program = this.composite;
    gl.uniform4f(
      gl.getUniformLocation(program, "frame"),
      rect.left,
      rect.top,
      rect.width,
      rect.height,
    );
    gl.uniform2f(gl.getUniformLocation(program, "viewport"), vw, vh);
    gl.uniform1f(gl.getUniformLocation(program, "envelope"), envelope);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!this.shown) {
      this.shown = true;
      this.canvas.style.visibility = "visible";
    }
    return true;
  }
}
