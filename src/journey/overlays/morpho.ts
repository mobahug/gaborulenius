import type { DirectorFrame } from "../director/director";
import { hasFinePointer } from "../device";
import { drawButterfly, openness, spritesFor } from "./butterflies";
import { glowSprite } from "./surface";

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
export class Morpho {
  private readonly enabled = hasFinePointer();
  private readonly sprites = spritesFor("morpho");
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
  private lift = 0;
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
    if (this.enabled) {
      window.addEventListener("pointermove", this.onMove, { passive: true });
    }
  }

  dispose() {
    window.removeEventListener("pointermove", this.onMove);
  }

  /** Moves it on; returns whether it is about (to be drawn). */
  update(frame: DirectorFrame) {
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
    this.lift = lift;
    return true;
  }

  render(context: CanvasRenderingContext2D) {
    drawButterfly(
      context,
      this.sprites,
      this.x,
      this.y,
      this.heading,
      openness(this.lift),
      this.presence,
      SPAN,
      this.glow,
    );
  }
}
