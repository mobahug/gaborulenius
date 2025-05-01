import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import BirdSpriteFlying from "./BirdSpriteFlying";
import BirdSpriteIdle from "./BirdSpriteIdle";

export interface SectionInfo {
  id: string;
  ref: React.RefObject<HTMLDivElement>;
}

const FLY_DURATION = 1.5;
const IDLE_DELAY = 1000;
const FRAME_H = 32;

export default function BirdManager({ sections }: { sections: SectionInfo[] }) {
  const controls = useAnimation();
  const [mode, setMode] = useState<"flying" | "idle">("idle");
  const [target, setTarget] = useState<{ x: number; y: number }>({
    x: -1000,
    y: -1000,
  });

  const scrollDir = useRef<"down" | "up">("down");
  const lastY = useRef(window.scrollY);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollDir.current = y > lastY.current ? "down" : "up";
      lastY.current = y;

      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
      setMode("flying");

      let bestTop: number = Infinity;
      let bestRect: DOMRect | undefined;

      sections.forEach(({ ref }) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top >= 0 && r.top < bestTop && r.top < window.innerHeight) {
          bestTop = r.top;
          bestRect = r;
        }
      });

      if (bestRect) {
        setTarget({
          x: bestRect.right - FRAME_H,
          y: bestRect.top - FRAME_H,
        });
      }

      idleTimer.current = window.setTimeout(() => setMode("idle"), IDLE_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current !== null) {
        window.clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
    };
  }, [sections]);

  useEffect(() => {
    if (mode === "flying") {
      controls.start({
        x: target.x,
        y: target.y,
        transition: { duration: FLY_DURATION, ease: "easeInOut" },
      });
    } else {
      controls.set({ x: target.x, y: target.y });
    }
  }, [mode, target.x, target.y, controls]);

  return (
    <motion.div
      initial={false}
      animate={controls}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 199,
      }}
    >
      {mode === "flying" ? <BirdSpriteFlying /> : <BirdSpriteIdle />}
    </motion.div>
  );
}
