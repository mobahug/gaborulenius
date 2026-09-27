import { useEffect, useRef } from "react";
import { onDirectorFrame } from "../director/director";
import { requestSceneFrame } from "../scrollTimeline";
import { Flock } from "./butterflies";
import { Surface2D } from "./surface";
import "./overlays.css";

/**
 * Drawn above the content: in the jungle scenes, a few of the film's blue
 * morphos land on the blocks' edges and fly up when the pointer comes close
 * (butterflies.ts). Idle and hidden everywhere else; it never takes a click.
 */
const CursorLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface = new Surface2D(canvas);
    const flock = new Flock();
    const wake = () => requestSceneFrame();
    window.addEventListener("pointermove", wake, { passive: true });
    const stop = onDirectorFrame((frame) => {
      if (!flock.update(frame)) {
        surface.idle();
        return;
      }
      const { vw, vh } = frame.viewport;
      flock.render(surface.begin(vw, vh, frame.deviceTier));
      // They fly on their own while they are out.
      requestSceneFrame();
    }, 25);
    return () => {
      stop();
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
