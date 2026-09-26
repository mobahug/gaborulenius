import type { DirectorFrame } from "../director/director";
import { filmRect } from "../director/frameMapping";
import { FILMS } from "../film/films";
import { smoothstep } from "../math";

/*
 * The macaw flies in front of the page. While it comes at the camera
 * (4.95–6.85 s of the chase) the chase video is drawn a second time, above
 * the content, through a key that keeps only the bird: its scarlet plumage
 * and blue wing tips are the only saturated reds and blues in the jungle.
 * The key is taken at quarter resolution, dilated a little (so the white
 * face and the thin yellow band between red feathers are not holes) and
 * sampled smoothly, then the bird's own pixels are drawn over the words —
 * exactly where, and exactly as, the film underneath shows them.
 */

const CHASE = FILMS[0];
const WINDOW = { start: [4.95, 5.2], end: [6.5, 6.85] } as const;
const KEY_WIDTH = 216;
const KEY_HEIGHT = 124;

const VERTEX = `#version 300 es
in vec2 position;
out vec2 screen;
void main() {
  screen = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// Pass 1: the key, in frame coordinates (v = 0 at the top of the frame).
const KEY = `#version 300 es
precision mediump float;
in vec2 screen;
uniform sampler2D video;
uniform vec2 texel;
out vec4 color;
float bird(vec3 c) {
  float red = c.r - max(c.g, c.b);
  float blue = c.b - max(c.r, c.g);
  float k = smoothstep(0.10, 0.22, red) * smoothstep(0.18, 0.30, c.r);
  return max(k, smoothstep(0.12, 0.24, blue) * smoothstep(0.25, 0.4, c.b));
}
void main() {
  float m = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      m = max(m, bird(texture(video, screen + vec2(x, y) * texel).rgb));
    }
  }
  color = vec4(m, 0.0, 0.0, 1.0);
}`;

// Pass 2: the bird's pixels over the page, premultiplied.
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

export class MacawKey {
  private readonly canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | null = null;
  private key: WebGLProgram | null = null;
  private composite: WebGLProgram | null = null;
  private videoTexture: WebGLTexture | null = null;
  private maskTexture: WebGLTexture | null = null;
  private framebuffer: WebGLFramebuffer | null = null;
  private uploaded: number | null = null;
  private shown = false;
  private failed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.style.visibility = "hidden";
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      this.gl = null;
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
    const composite = gl && compile(gl, VERTEX, COMPOSITE);
    if (!gl || !key || !composite) {
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
      const handle = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, handle);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      return handle;
    };
    this.videoTexture = texture();
    this.maskTexture = texture();
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
    this.framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.maskTexture,
      0,
    );
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    gl.useProgram(composite);
    gl.uniform1i(gl.getUniformLocation(composite, "video"), 0);
    gl.uniform1i(gl.getUniformLocation(composite, "mask"), 1);
    gl.useProgram(key);
    gl.uniform1i(gl.getUniformLocation(key, "video"), 0);
    gl.uniform2f(
      gl.getUniformLocation(key, "texel"),
      1 / KEY_WIDTH,
      1 / KEY_HEIGHT,
    );
    this.gl = gl;
    this.key = key;
    this.composite = composite;
    return gl;
  }

  /**
   * Compiles the shaders and runs both passes once, invisibly, on an empty
   * texture while the page is idle (drivers finish compiling on the first
   * draw).
   */
  warm() {
    const gl = this.setup();
    if (!gl || !this.key || !this.composite) return;
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
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.viewport(0, 0, KEY_WIDTH, KEY_HEIGHT);
    gl.useProgram(this.key);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // At its real size, so the first frame of the bird allocates nothing.
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.round(window.innerWidth * ratio);
    this.canvas.height = Math.round(window.innerHeight * ratio);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.composite);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
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
    if (!gl || !this.key || !this.composite) return false;

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

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.videoTexture);
    if (this.uploaded !== time) {
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
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
      gl.viewport(0, 0, KEY_WIDTH, KEY_HEIGHT);
      gl.useProgram(this.key);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    const rect = filmRect(CHASE, time, vw, vh);
    gl.viewport(0, 0, width, height);
    gl.useProgram(this.composite);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.maskTexture);
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
