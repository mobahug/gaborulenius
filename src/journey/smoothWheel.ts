import { useEffect } from "react";
import { hasFinePointer, prefersReducedMotion } from "./device";

/*
 * A mouse wheel or a trackpad glides the page: each wheel event moves a
 * target, and every frame the page eases toward it (as Lenis does), so the
 * films and the blocks move on continuously instead of a notch at a time.
 *
 * Touch screens keep their own scrolling, which already glides; so do the
 * keyboard, the scroll bar and links (a scroll the glide did not make ends
 * it), anything that scrolls by itself — the experience list, a story, a
 * dialog, the menu — and the page while a dialog holds it still. A pinch
 * (ctrl + wheel) and sideways scrolling are left to the browser.
 */

/** Time constant of the glide (s): about Lenis's `lerp: 0.1` at 60 fps. */
const GLIDE_SECONDS = 0.12;

let frame = 0;
let target = 0;
let current = 0;
let last = 0;

/** Whether the page is gliding toward a wheel's target (the scroll clock
 * then eases no further, see scrollTimeline.ts). */
export const isWheelGliding = () => frame !== 0;

const maxScroll = () =>
  Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

/** A wheel's movement in pixels, whatever unit it came in. */
const pixelsOf = (event: WheelEvent) =>
  event.deltaMode === 1
    ? event.deltaY * 40
    : event.deltaMode === 2
      ? event.deltaY * window.innerHeight
      : event.deltaY;

/** Whether something under the pointer scrolls that way by itself. */
const scrollsItself = (start: EventTarget | null, delta: number) => {
  let node = start instanceof Element ? start : null;
  while (node && node !== document.body && node !== document.documentElement) {
    if (node instanceof HTMLElement && node.scrollHeight > node.clientHeight) {
      const { overflowY } = getComputedStyle(node);
      if (overflowY === "auto" || overflowY === "scroll") {
        const room =
          delta < 0
            ? node.scrollTop > 0
            : node.scrollTop + node.clientHeight < node.scrollHeight - 1;
        if (room) return true;
      }
    }
    node = node.parentElement;
  }
  return false;
};

const stop = () => {
  cancelAnimationFrame(frame);
  frame = 0;
};

const step = (now: number) => {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  current += (target - current) * (1 - Math.exp(-dt / GLIDE_SECONDS));
  if (Math.abs(target - current) < 0.5) current = target;
  window.scrollTo({ top: current, behavior: "instant" });
  frame = current === target ? 0 : requestAnimationFrame(step);
};

const onWheel = (event: WheelEvent) => {
  if (
    event.defaultPrevented ||
    event.ctrlKey ||
    Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
    // A dialog or the menu holds the page still.
    document.body.style.overflow === "hidden"
  ) {
    return;
  }
  const delta = pixelsOf(event);
  if (!delta || scrollsItself(event.target, delta)) return;
  event.preventDefault();
  if (!frame) {
    current = window.scrollY;
    target = current;
    last = performance.now();
    frame = requestAnimationFrame(step);
  }
  target = Math.max(0, Math.min(maxScroll(), target + delta));
};

/** A scroll the glide did not make (the position restored after a reload,
 * a scroll bar dragged) takes over from it. */
const onScroll = () => {
  if (frame && Math.abs(window.scrollY - current) > 2) stop();
};

/** So does a click or a key, before it scrolls: a link's smooth scroll (or
 * the keys') would otherwise be undone by the glide's next frame. */
const onInput = () => {
  if (frame) stop();
};

/** Wheels glide, on devices with a mouse or a trackpad. */
export const useSmoothWheel = () => {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onInput, true);
    window.addEventListener("keydown", onInput, true);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onInput, true);
      window.removeEventListener("keydown", onInput, true);
    };
  }, []);
};
