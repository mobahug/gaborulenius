import { useEffect, useRef, type CSSProperties } from "react";
import { assetUrl } from "../../utils/assets";
import { onDirectorFrame } from "../director/director";
import { filmIndex } from "../film/films";
import { clamp, smoothstep } from "../math";

/** The route on the map (a 200 × 200 box), from the trailhead to the camp. */
const ROUTE =
  "M 30 170 C 52 158, 56 136, 80 130 C 106 124, 128 136, 136 114 C 144 92, 112 84, 118 64 C 124 44, 152 50, 166 32";
/** Film times at which the walker sets out and arrives … */
const START = 1.2;
const END = 7.4;
/** … and reaches each waypoint: the four capabilities, then how the app is
 * built (the times of their blocks in ExplorerStage). */
const WAYPOINTS = [2.3, 3.3, 4.9, 5.8, 6.45];
const EXPLORER = filmIndex("explorer");
/** Samples of the walker's place along the route. */
const SAMPLES = 200;

const along = (time: number) => clamp((time - START) / (END - START));

/**
 * The Explorer's expedition, in a corner of the screen while its film plays
 * (wide screens only): an almost transparent topographic map, the planned
 * route dotted, the walked track in red with the walker at its head, and a
 * waypoint for every capability, lit once the walker has passed it. The
 * walk follows the film's time, so it moves with the scroll and back.
 */
const ExplorerMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const plan = map.querySelector<SVGPathElement>(".explorer-map-plan")!;
    const track = map.querySelector<SVGPathElement>(".explorer-map-track")!;
    const head = map.querySelector<HTMLElement>(".explorer-map-head")!;
    const stops = Array.from(
      map.querySelectorAll<SVGCircleElement>(".explorer-map-stop"),
    );
    const length = plan.getTotalLength();
    const samples = Array.from({ length: SAMPLES + 1 }, (_, index) =>
      plan.getPointAtLength((length * index) / SAMPLES),
    );
    WAYPOINTS.forEach((time, index) => {
      const point = plan.getPointAtLength(length * along(time));
      stops[index].setAttribute("cx", point.x.toFixed(1));
      stops[index].setAttribute("cy", point.y.toFixed(1));
    });
    track.style.strokeDasharray = `${length.toFixed(2)}`;
    const wide = window.matchMedia("(min-width: 900px)");
    let shown = -1;
    let walked = -1;
    let reached = -1;
    return onDirectorFrame((frame) => {
      const entry = frame.timeline.films[EXPLORER];
      const time = entry?.time ?? 0;
      // From the title to the end of the expedition, in the Explorer only.
      const visible =
        wide.matches && entry && frame.timeline.current === EXPLORER
          ? smoothstep(START - 0.4, START + 0.1, time) *
            (1 - smoothstep(END + 0.15, END + 0.45, time))
          : 0;
      const opacity = Math.round(visible * 50) / 50;
      if (opacity !== shown) {
        shown = opacity;
        map.style.opacity = String(opacity);
        map.style.visibility = opacity > 0 ? "visible" : "hidden";
      }
      if (opacity <= 0) return;
      const progress = frame.reduced
        ? 1
        : Math.round(along(time) * SAMPLES) / SAMPLES;
      if (progress !== walked) {
        walked = progress;
        track.style.strokeDashoffset = (length * (1 - progress)).toFixed(2);
        const point = samples[Math.round(progress * SAMPLES)];
        head.style.transform = `translate(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px)`;
      }
      const passed = WAYPOINTS.filter((stop) => time >= stop - 0.05).length;
      if (passed !== reached) {
        reached = passed;
        stops.forEach((stop, index) =>
          stop.classList.toggle("explorer-map-stop--reached", index < passed),
        );
      }
    }, 40);
  }, []);

  return (
    <div
      ref={mapRef}
      className="explorer-map"
      aria-hidden="true"
      style={
        {
          "--route-map": `url("${assetUrl("explorer/topography.svg")}")`,
        } as CSSProperties
      }
    >
      <svg viewBox="0 0 200 200" width="200" height="200">
        <path className="explorer-map-plan" d={ROUTE} />
        <path className="explorer-map-track" d={ROUTE} />
        {WAYPOINTS.map((time) => (
          <circle key={time} className="explorer-map-stop" r="4" />
        ))}
      </svg>
      <div className="explorer-map-head" />
    </div>
  );
};

export default ExplorerMap;
