import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { requestSceneFrame } from "../scrollTimeline";
import { Flock } from "./butterflies";
import { Morpho } from "./morpho";
import { Surface2D } from "./surface";
import "./overlays.css";

/**
 * Drawn above the content: on the jungle path, the film's morpho follows the
 * pointer while the introduction and About are read (see morpho.ts), and a
 * few butterflies land on their edges (butterflies.ts). Idle and hidden
 * everywhere else; it never takes a click.
 */
const CursorLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface = new Surface2D(canvas);
    const morpho = new Morpho();
    const flock = new Flock();
    const wake = () => requestSceneFrame();
    window.addEventListener("pointermove", wake, { passive: true });
    const stop = onDirectorFrame((frame) => {
      const following = morpho.update(frame);
      const flying = flock.update(frame);
      if (!following && !flying) {
        surface.idle();
        return;
      }
      const { vw, vh } = frame.viewport;
      const context = surface.begin(vw, vh, frame.deviceTier);
      if (flying) flock.render(context);
      if (following) morpho.render(context);
      // They fly on their own while they are out.
      requestSceneFrame();
    }, 25);
    return () => {
      stop();
      morpho.dispose();
      flock.dispose();
      window.removeEventListener("pointermove", wake);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="overlay-canvas overlay-canvas--cursor"
      aria-hidden="true"
    />
  );
};

export default CursorLayer;
