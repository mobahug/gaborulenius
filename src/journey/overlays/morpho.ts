import type { DirectorFrame } from "../director/director";
import { hasFinePointer } from "../device";
import { glowSprite, type Surface2D } from "./surface";

/*
 * On the jungle path, while the introduction and About are read, the
 * film's morpho — the blue butterfly that flies out of the light at the
 * camera — stays with the visitor: it comes out of the film as it passes
 * the camera, follows the pointer lazily, settles and slowly opens and
 * closes its wings when the pointer rests, and flies away up the path once
 * About has passed. Scrolling back brings it out again.
 *
 * Fine pointers only, never with reduced motion.
 */

/** The first film's times: out of the film as the morpho passes the
 * camera, away after About. */
const APPEAR = 1.65;
const LEAVE = 3.5;
/** Where it comes out of the film (fractions of the screen). */
const SPAWN = { x: 0.62, y: 0.42 };
/** It keeps a little up and to the left of the pointer, not on it. */
const OFFSET = { x: -16, y: -26 };
/** Wingspan (px). */
const SPAN = 42;
/** Sprite resolution: one wing, drawn this many times larger. */
const SCALE = 4;
const WING_W = 30;
const WING_H = 44;

/** The right wings (forewing and hindwing), in their own coordinates:
 * the body at x = 0, y = 0 at the wing root, the head up. */
const wingPath = (context: CanvasRenderingContext2D) => {
  context.beginPath();
  // Forewing, to its rounded tip up and out.
  context.moveTo(0, 0);
  context.bezierCurveTo(5, -12, 16, -19, 24, -17);
  context.bezierCurveTo(27, -12, 24, -4, 15, 0);
  context.bezierCurveTo(9, 2, 4, 2, 0, 1);
  // Hindwing, a rounded lobe below.
  context.moveTo(0, 1);
  context.bezierCurveTo(8, 1, 17, 4, 18, 11);
  context.bezierCurveTo(18, 18, 10, 21, 4, 15);
  context.bezierCurveTo(2, 12, 0, 6, 0, 1);
  context.closePath();
};

/** A wing, blue from above (with its black margin and white spots) or
 * brown from below, stamped with `drawImage`. */
const wingSprite = (upper: boolean) => {
  const canvas = document.createElement("canvas");
  canvas.width = WING_W * SCALE;
  canvas.height = WING_H * SCALE;
  const context = canvas.getContext("2d")!;
  context.scale(SCALE, SCALE);
  context.translate(1, 21);
  wingPath(context);
  const gradient = context.createRadialGradient(0, 0, 1, 0, 0, 24);
  if (upper) {
    gradient.addColorStop(0, "#0b2a6e");
    gradient.addColorStop(0.35, "#1c7cf2");
    gradient.addColorStop(0.7, "#4ec3ff");
    gradient.addColorStop(1, "#1a4fa8");
  } else {
    gradient.addColorStop(0, "#3a2a1c");
    gradient.addColorStop(0.6, "#6e5536");
    gradient.addColorStop(1, "#4a3826");
  }
  context.fillStyle = gradient;
  context.fill();
  context.lineWidth = upper ? 2.4 : 1.2;
  context.strokeStyle = upper ? "#07101f" : "#2a1f15";
  context.stroke();
  if (upper) {
    // White spots along the forewing's black margin.
    context.fillStyle = "rgba(245, 248, 255, 0.85)";
    [
      [21.5, -14.5],
      [23.5, -10.5],
      [20.5, -6.5],
    ].forEach(([x, y]) => {
      context.beginPath();
      context.arc(x, y, 0.8, 0, Math.PI * 2);
      context.fill();
    });
  } else {
    // Eyespots underneath.
    [
      [12, -8, 2.2],
      [10, 10, 2.6],
    ].forEach(([x, y, r]) => {
      context.fillStyle = "#d9b25a";
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#1a120a";
      context.beginPath();
      context.arc(x, y, r * 0.5, 0, Math.PI * 2);
      context.fill();
    });
  }
  return canvas;
};

export class Morpho {
  private readonly enabled = hasFinePointer();
  private readonly upper: HTMLCanvasElement;
  private readonly lower: HTMLCanvasElement;
  private readonly glow = glowSprite(64, [
    [0, "rgba(90, 180, 255, 0.55)"],
    [1, "rgba(40, 120, 255, 0)"],
  ]);
  private pointer = { x: -1, y: -1, at: 0 };
  private x = 0;
  private y = 0;
  private vx = 0;
  private vy = 0;
  private heading = 0;
  private flap = 0;
  private stillFor = 0;
  private presence = 0;
  private out = false;
  private last = 0;
  private readonly onMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    this.pointer = {
      x: event.clientX,
      y: event.clientY,
      at: performance.now(),
    };
  };

  constructor() {
    this.upper = wingSprite(true);
    this.lower = wingSprite(false);
    if (this.enabled) {
      window.addEventListener("pointermove", this.onMove, { passive: true });
    }
  }

  dispose() {
    window.removeEventListener("pointermove", this.onMove);
  }

  /** Draws it if it is about; returns whether it is (to keep animating). */
  draw(frame: DirectorFrame, surface: Surface2D) {
    const chase = frame.timeline.films[0];
    const time = frame.stage.presented[0] ?? chase?.time ?? 0;
    const { vw, vh } = frame.viewport;
    const now = frame.now;
    const dt = this.last ? Math.min(0.05, (now - this.last) / 1000) : 1 / 60;
    this.last = now;
    const on =
      this.enabled &&
      !frame.reduced &&
      frame.activeChapter === "chase" &&
      time >= APPEAR &&
      time <= LEAVE;
    if (on && !this.out) {
      // Out of the film, where the morpho passes the camera.
      this.out = true;
      this.x = vw * SPAWN.x;
      this.y = vh * SPAWN.y;
      this.vx = -60;
      this.vy = -90;
    }
    if (!this.out) return false;
    this.presence +=
      ((on ? 1 : 0) - this.presence) * (1 - Math.exp(-dt / 0.35));
    if (!on && this.presence < 0.02) {
      this.out = false;
      this.presence = 0;
      return false;
    }

    // Where it is going: near the pointer while About is read, away up the
    // path once it has passed (or before the pointer has been seen).
    const pointer = this.pointer.x >= 0;
    const tx = on
      ? pointer
        ? this.pointer.x + OFFSET.x
        : this.x
      : this.x + 260;
    const ty = on ? (pointer ? this.pointer.y + OFFSET.y : this.y) : -120;
    const dx = tx - this.x;
    const dy = ty - this.y;
    const distance = Math.hypot(dx, dy);
    const speed = Math.hypot(this.vx, this.vy);
    // It settles once it has been close and slow for a moment.
    this.stillFor = on && distance < 18 && speed < 40 ? this.stillFor + dt : 0;
    const resting = this.stillFor > 0.5;
    if (resting) {
      this.vx *= 0.8;
      this.vy *= 0.8;
    } else {
      // A lazy spring toward the target, and the flutter of a butterfly.
      const t = now / 1000;
      const flutter = on ? 1 : 0.4;
      const ax =
        dx * 14 -
        this.vx * 5 +
        flutter * (Math.sin(t * 2.3 + 1.1) * 90 + Math.sin(t * 5.7) * 50);
      const ay =
        dy * 14 -
        this.vy * 5 +
        flutter * (Math.sin(t * 3.1) * 110 + Math.cos(t * 6.3) * 45);
      this.vx += ax * dt;
      this.vy += ay * dt;
      const max = on ? 700 : 520;
      const fast = Math.hypot(this.vx, this.vy);
      if (fast > max) {
        this.vx *= max / fast;
        this.vy *= max / fast;
      }
    }
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    // It faces where it flies; at rest it turns upright.
    const moving = Math.hypot(this.vx, this.vy) > 30;
    const aim = moving ? Math.atan2(this.vx, -this.vy) * 0.55 : 0;
    this.heading += (aim - this.heading) * (1 - Math.exp(-dt / 0.25));
    // Wing beats: fast in flight, a slow opening and closing at rest.
    this.flap += dt * (resting ? 1.4 : 21);
    // At rest it keeps its blue wings open, opening and closing slowly.
    const lift = resting
      ? 0.35 + 0.35 * Math.sin(this.flap)
      : 0.35 + 0.65 * Math.sin(this.flap);
    // The wing seen from above narrows as it rises: blue when open, the
    // brown underside as it closes.
    const open = Math.max(0.1, Math.cos((lift * 80 * Math.PI) / 180));

    const context = surface.begin(vw, vh, frame.deviceTier);
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.heading);
    context.globalAlpha = this.presence * 0.5;
    context.globalCompositeOperation = "lighter";
    context.drawImage(this.glow, -32, -32, 64, 64);
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = this.presence;
    const scale = SPAN / 2 / 24;
    const sprite = open > 0.42 ? this.upper : this.lower;
    [1, -1].forEach((side) => {
      context.save();
      context.scale(side * open * scale, scale);
      context.drawImage(sprite, -1, -21, WING_W, WING_H);
      context.restore();
    });
    // The body and its antennae.
    context.fillStyle = "#0d0d10";
    context.beginPath();
    context.ellipse(0, 2, 1.3, 7, 0, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(20, 20, 24, 0.9)";
    context.lineWidth = 0.7;
    context.beginPath();
    context.moveTo(0, -4);
    context.quadraticCurveTo(-2, -9, -4, -11);
    context.moveTo(0, -4);
    context.quadraticCurveTo(2, -9, 4, -11);
    context.stroke();
    context.restore();
    return true;
  }
}
