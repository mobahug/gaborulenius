import { useEffect, useRef } from "react";
import { getQualityTier } from "../journey/device";
import {
  Flock,
  type FlockBlock,
  type Perch,
} from "../journey/overlays/butterflies";
import { Surface2D } from "../journey/overlays/surface";

/** Still for this long before they come (ms). */
const SETTLE_MS = 1200;
/** At most one visit in this long (ms), however often the page stops. */
const COOLDOWN_MS = 9000;
/** Room kept clear under the bar and above the screen's bottom (px). */
const TOP_ROOM = 76;
const BOTTOM_ROOM = 40;

/** Where on a card a butterfly can sit: the card's top edge on the right
 * (clear of its heading), its buttons and the portrait — those on screen. */
const perchesOnCard = (card: HTMLElement): Perch[] => {
  const perches: Perch[] = [];
  const onScreen = (element: HTMLElement) => {
    const { top } = element.getBoundingClientRect();
    return top > TOP_ROOM && top < window.innerHeight - BOTTOM_ROOM;
  };
  const add = (
    element: HTMLElement,
    edge: Perch["edge"],
    from: number,
    to: number,
  ) => {
    if (onScreen(element)) perches.push({ element, edge, from, to });
  };
  add(card, "top", 0.6, 0.92);
  card
    .querySelectorAll<HTMLElement>(".qr-actions > .MuiButton-root")
    .forEach((button) => add(button, "top", 0.25, 0.75));
  card
    .querySelectorAll<HTMLElement>(".qr-portrait")
    .forEach((portrait) => add(portrait, "top", 0.4, 0.6));
  return perches;
};

/** The card the page has stopped on: the one most in view with room for a
 * butterfly on it. */
const cardInView = (): FlockBlock | null => {
  let best: FlockBlock | null = null;
  let bestArea = 0;
  const vh = window.innerHeight;
  document.querySelectorAll<HTMLElement>(".qr-card").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const area =
      Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, TOP_ROOM)) *
      rect.width;
    if (area > bestArea && perchesOnCard(card).length > 0) {
      bestArea = area;
      best = {
        element: card,
        shown: true,
        ready: true,
        x: rect.left,
        y: rect.top,
      };
    }
  });
  return best;
};

/**
 * The journey's blue morphos on quick read: when the page has stopped for a
 * moment, one or two fly in and settle on the card in view — on its edge,
 * a button or the portrait, never over its words — and fly off as soon as
 * the page moves again, or a pointer comes close. Now and then, not at
 * every stop; never with reduced motion (the page does not mount it).
 */
const QuickReadButterflies = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface = new Surface2D(canvas);
    const flock = new Flock({ perches: perchesOnCard, visitors: [1, 2] });
    const tier = getQualityTier();
    let frame = 0;
    let timer = 0;
    let movedAt = performance.now();
    let lastVisit = -COOLDOWN_MS;
    /** The card being visited, until the page moves. */
    let current: FlockBlock | null = null;

    const tick = (now: number) => {
      frame = 0;
      const still = now - movedAt > SETTLE_MS;
      if (still && !current && now - lastVisit > COOLDOWN_MS) {
        current = cardInView();
        if (current) lastVisit = now;
      }
      // Once the page moves, the card is no longer shown: they leave, and
      // the flock may visit it again at a later stop.
      const blocks = current
        ? [{ ...current, shown: still, ready: still }]
        : [];
      if (!still) current = null;
      const busy = flock.step(now, window.innerWidth, true, blocks);
      if (busy) {
        flock.render(
          surface.begin(window.innerWidth, window.innerHeight, tier),
        );
        frame = requestAnimationFrame(tick);
      } else {
        surface.idle();
        // Nothing out: wake when a visit may come.
        const due = Math.max(movedAt + SETTLE_MS, lastVisit + COOLDOWN_MS);
        window.clearTimeout(timer);
        timer = window.setTimeout(wake, Math.max(16, due - now + 16));
      }
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = () => {
      movedAt = performance.now();
      wake();
    };

    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    window.addEventListener("pointermove", wake, { passive: true });
    window.addEventListener("pointerdown", wake, { passive: true });
    wake();
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      flock.dispose();
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("pointerdown", wake);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="qr-butterflies" aria-hidden="true" />
  );
};

export default QuickReadButterflies;
