import type { DirectorFrame } from "../director/director";
import { filmRect } from "../director/frameMapping";
import { hasFinePointer } from "../device";
import { FILMS } from "../film/films";
import { smoothstep } from "../math";
import { glowSprite, type Surface2D } from "./surface";

/*
 * Inside the Neural Decompiler the pointer is a probe. Every few frames the
 * neural film's current picture is read back at low resolution and its
 * brightest points — the neurons the camera is flying past — are found; the
 * probe connects to the ones near it, pulses run along the connections, and
 * each one shows its "activation": its brightness in the film. The page is
 * reading the footage, the way the project reads a network's neurons.
 *
 * Fine pointers only, never with reduced motion, and only while the neural
 * film is on screen by itself.
 */

const NEURAL = FILMS[1];
const WIDTH = 128;
const HEIGHT = 74;
/** Film times in which the network is on screen (after the eye, before the white). */
const ACTIVE: readonly [number, number] = [1.45, 7.25];
const REACH = 230;
const MAX_LINKS = 5;
const IDLE_MS = 2600;

type Node = { x: number; y: number; value: number };

export class NeuralProbe {
  private readonly enabled = hasFinePointer();
  private readonly sampler: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D | null;
  private readonly spark = glowSprite(48, [
    [0, "rgba(255, 244, 222, 1)"],
    [0.25, "rgba(255, 206, 140, 0.7)"],
    [1, "rgba(255, 160, 70, 0)"],
  ]);
  private nodes: Node[] = [];
  private sampledAt = -1;
  private sampledTime = -1;
  private pointer = { x: -1, y: -1, at: 0 };
  private presence = 0;
  private lastDraw = 0;
  private readonly onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    this.pointer = {
      x: event.clientX,
      y: event.clientY,
      at: performance.now(),
    };
  };

  constructor() {
    this.sampler = document.createElement("canvas");
    this.sampler.width = WIDTH;
    this.sampler.height = HEIGHT;
    this.context = this.sampler.getContext("2d", { willReadFrequently: true });
    if (this.enabled) {
      window.addEventListener("pointermove", this.onMove, { passive: true });
    }
  }

  dispose() {
    window.removeEventListener("pointermove", this.onMove);
  }

  /** Brightest local maxima of the film's current picture (frame fractions). */
  private sample(video: HTMLVideoElement) {
    const context = this.context;
    if (!context || video.readyState < 2) return;
    context.drawImage(video, 0, 0, WIDTH, HEIGHT);
    const { data } = context.getImageData(0, 0, WIDTH, HEIGHT);
    const luma = new Float32Array(WIDTH * HEIGHT);
    for (let index = 0; index < luma.length; index += 1) {
      const offset = index * 4;
      luma[index] =
        (0.2126 * data[offset] +
          0.7152 * data[offset + 1] +
          0.0722 * data[offset + 2]) /
        255;
    }
    const found: Node[] = [];
    for (let y = 2; y < HEIGHT - 2; y += 1) {
      for (let x = 2; x < WIDTH - 2; x += 1) {
        const value = luma[y * WIDTH + x];
        if (value < 0.62) continue;
        let peak = true;
        for (let dy = -2; dy <= 2 && peak; dy += 1) {
          for (let dx = -2; dx <= 2; dx += 1) {
            if ((dx || dy) && luma[(y + dy) * WIDTH + x + dx] > value) {
              peak = false;
              break;
            }
          }
        }
        if (peak)
          found.push({ x: (x + 0.5) / WIDTH, y: (y + 0.5) / HEIGHT, value });
      }
    }
    // Brightest first, and only one node per neighbourhood (a glowing tip
    // is a plateau of equally bright pixels).
    found.sort((a, b) => b.value - a.value);
    const kept: Node[] = [];
    const spacing = 5 / WIDTH;
    for (const node of found) {
      if (kept.length >= 40) break;
      if (
        kept.every(
          (other) =>
            Math.hypot((other.x - node.x) * 1.74, other.y - node.y) > spacing,
        )
      ) {
        kept.push(node);
      }
    }
    this.nodes = kept;
  }

  draw(
    frame: DirectorFrame,
    surface: Surface2D,
    video: HTMLVideoElement | null,
  ) {
    const neural = frame.timeline.films[1];
    const time = frame.stage.presented[1];
    const now = frame.now;
    const on =
      this.enabled &&
      !frame.reduced &&
      !!video &&
      !!neural &&
      neural.opacity >= 1 &&
      !neural.window &&
      frame.activeChapter === "neural" &&
      time !== null &&
      time > ACTIVE[0] &&
      time < ACTIVE[1] &&
      this.pointer.x >= 0 &&
      now - this.pointer.at < IDLE_MS;
    // Fades in and out over a few frames, whatever the scroll does.
    const dt = this.lastDraw ? Math.min(0.1, (now - this.lastDraw) / 1000) : 0;
    this.lastDraw = now;
    this.presence +=
      ((on ? 1 : 0) - this.presence) * (1 - Math.exp(-dt / 0.18));
    if (this.presence < 0.01 || !video || time === null) {
      this.presence = on ? this.presence : 0;
      return false;
    }
    if (
      now - this.sampledAt > 120 ||
      Math.abs(time - this.sampledTime) > 0.08
    ) {
      this.sample(video);
      this.sampledAt = now;
      this.sampledTime = time;
    }

    const { vw, vh } = frame.viewport;
    const rect = filmRect(NEURAL, time, vw, vh);
    const { x: px, y: py } = this.pointer;
    const near = this.nodes
      .map((node) => {
        const x = rect.left + node.x * rect.width;
        const y = rect.top + node.y * rect.height;
        return {
          x,
          y,
          value: node.value,
          distance: Math.hypot(x - px, y - py),
        };
      })
      .filter((node) => node.distance < REACH)
      // Bright neurons win over near ones.
      .sort(
        (a, b) =>
          b.value -
          (b.distance / REACH) * 0.35 -
          (a.value - (a.distance / REACH) * 0.35),
      )
      .slice(0, MAX_LINKS);

    const context = surface.begin(vw, vh, frame.deviceTier);
    context.save();
    context.globalCompositeOperation = "lighter";
    const presence = this.presence;
    near.forEach((node, index) => {
      const strength =
        (1 - smoothstep(REACH * 0.4, REACH, node.distance)) * presence;
      context.globalAlpha = strength * 0.55;
      context.strokeStyle = "rgba(255, 200, 140, 1)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(px, py);
      context.lineTo(node.x, node.y);
      context.stroke();
      // A pulse running out to the neuron and back.
      const phase = ((now / 900 + index * 0.37) % 1) * 2;
      const k = phase < 1 ? phase : 2 - phase;
      const sx = px + (node.x - px) * k;
      const sy = py + (node.y - py) * k;
      context.globalAlpha = strength * 0.9;
      context.drawImage(this.spark, sx - 7, sy - 7, 14, 14);
      context.globalAlpha = strength;
      context.drawImage(this.spark, node.x - 12, node.y - 12, 24, 24);
    });
    context.globalCompositeOperation = "source-over";
    // Readouts: each neuron's activation, i.e. its brightness in the film.
    context.font = '500 11px ui-monospace, "SF Mono", Menlo, monospace';
    context.textBaseline = "middle";
    near.forEach((node) => {
      const strength =
        (1 - smoothstep(REACH * 0.4, REACH, node.distance)) * presence;
      context.globalAlpha = strength * 0.85;
      context.fillStyle = "rgba(255, 226, 186, 1)";
      context.fillText(node.value.toFixed(2), node.x + 12, node.y - 10);
    });
    // The probe itself: a small ring, the journey's motif.
    context.globalAlpha = presence * 0.8;
    context.strokeStyle = "rgba(255, 214, 160, 1)";
    context.lineWidth = 1.2;
    context.beginPath();
    context.arc(px, py, 9, 0, Math.PI * 2);
    context.stroke();
    context.restore();
    // Keep animating the pulses while the probe is out.
    return true;
  }
}
