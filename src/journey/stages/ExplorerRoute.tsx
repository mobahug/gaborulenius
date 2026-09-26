import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { assetUrl } from "../../utils/assets";
import { prefersReducedMotion } from "../device";
import { clamp } from "../math";
import { useScene } from "../useScene";

/** The route is walked down to this height of the screen (0 = top). */
const READING_LINE = 0.62;
/** The route is sampled every this many pixels down the page. */
const STEP = 4;
/** The recorded track wanders this far (px) around the planned route. */
const WANDER = 2.4;

type Waypoint = { y: number; element: HTMLElement };

type Route = {
  /** Page height (px, in the section) of the first sample, and the last. */
  top: number;
  end: number;
  /** Across (px) at every STEP down from `top`. */
  xs: Float32Array;
  waypoints: Waypoint[];
  height: number;
};

const offsetIn = (element: HTMLElement, ancestor: HTMLElement) => {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { left, top };
};

/** 0 → 1 with no slope at either end: the route leaves and meets every
 * waypoint going straight down. */
const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** A GPS track is never quite the planned route. */
const wander = (y: number) =>
  WANDER * (Math.sin(y / 47) + 0.6 * Math.sin(y / 19 + 1.3));

const polyline = (route: Route, amount: number) => {
  let d = "";
  route.xs.forEach((x, index) => {
    const y = route.top + index * STEP;
    const across = x + (amount ? wander(y) * amount : 0);
    d += `${index ? "L" : "M"}${across.toFixed(1)} ${y}`;
  });
  return d;
};

/** Across (px) where the route crosses `y`. */
const acrossAt = (route: Route, y: number) => {
  const position = (y - route.top) / STEP;
  const index = clamp(Math.floor(position), 0, route.xs.length - 1);
  const next = Math.min(index + 1, route.xs.length - 1);
  const t = position - index;
  return route.xs[index] + (route.xs[next] - route.xs[index]) * t;
};

/**
 * The Explorer's expedition route, under its blocks: a dashed planned route
 * over a faint topographic map, and the recorded track in red, walked down
 * to the reading line as the page scrolls, with the walker's position at its
 * head. It runs from under the title through every capability — beside its
 * words, from its waypoint (the capability's icon, which lights up once the
 * walker reaches it), and across the screen past its app screen to the next
 * — to how the app is built. Scrolling back walks it back.
 *
 * Only transforms change while scrolling: the track is drawn once and
 * uncovered by a clip that moves with the walker, so no frame repaints it.
 */
const ExplorerRoute = () => {
  const layerRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<Route | null>(null);
  const lastRef = useRef({ line: NaN, reached: -1 });

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const section = layer?.parentElement;
    if (!layer || !section) return;
    const plan = layer.querySelector<SVGSVGElement>(".explorer-route-plan")!;
    const track = layer.querySelector<SVGSVGElement>(".explorer-route-track")!;
    const [trailhead, finish] = Array.from(
      plan.querySelectorAll<SVGCircleElement>("circle"),
    );

    const measure = () => {
      const start = section.querySelector<HTMLElement>("[data-route-start]");
      const rails = Array.from(
        section.querySelectorAll<HTMLElement>("[data-route-rail]"),
      );
      if (!start || !rails.length) return;
      // Knots down the page: under the title, then for every block its
      // waypoint and the foot of its words, where the route ends.
      const knots: Array<[y: number, x: number]> = [];
      const waypoints: Waypoint[] = [];
      rails.forEach((rail, index) => {
        const icon = rail.querySelector<HTMLElement>("[data-route-point]");
        if (!icon) return;
        const at = offsetIn(icon, section);
        const x = at.left + icon.offsetWidth / 2;
        const y = at.top + icon.offsetHeight / 2;
        if (index === 0) {
          const title = offsetIn(start, section);
          knots.push([title.top + start.offsetHeight + 40, x]);
        }
        knots.push([y, x]);
        waypoints.push({ y, element: icon });
        knots.push([offsetIn(rail, section).top + rail.offsetHeight + 24, x]);
      });
      if (knots.length < 2) return;
      const top = knots[0][0];
      const end = knots[knots.length - 1][0];
      const count = Math.max(2, Math.floor((end - top) / STEP) + 1);
      const xs = new Float32Array(count);
      let k = 0;
      for (let index = 0; index < count; index += 1) {
        const y = top + index * STEP;
        while (k < knots.length - 2 && y > knots[k + 1][0]) k += 1;
        const [y0, x0] = knots[k];
        const [y1, x1] = knots[k + 1];
        const t = clamp((y - y0) / Math.max(1, y1 - y0));
        xs[index] = x0 + (x1 - x0) * smootherstep(t);
      }
      const width = section.clientWidth;
      const height = section.offsetHeight;
      const route: Route = { top, end, xs, waypoints, height };
      routeRef.current = route;
      lastRef.current = { line: NaN, reached: -1 };
      [plan, track].forEach((svg) => {
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("width", String(width));
        svg.setAttribute("height", String(height));
      });
      plan.querySelector("path")!.setAttribute("d", polyline(route, 0));
      const recorded = polyline(route, 1);
      track
        .querySelectorAll("path")
        .forEach((path) => path.setAttribute("d", recorded));
      trailhead.setAttribute("cx", xs[0].toFixed(1));
      trailhead.setAttribute("cy", String(top));
      finish.setAttribute("cx", xs[count - 1].toFixed(1));
      finish.setAttribute("cy", String(top + (count - 1) * STEP));
      layer.style.setProperty("--route-height", `${height}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useScene(layerRef, (frame) => {
    const route = routeRef.current;
    const layer = layerRef.current;
    if (!route || !layer || !frame.near) return;
    const reduced = prefersReducedMotion();
    const { smoothY, vh } = frame.viewport;
    const line = reduced
      ? route.end
      : clamp(smoothY + vh * READING_LINE - frame.top, route.top, route.end);
    const last = lastRef.current;
    if (Math.abs(line - last.line) < 0.25) return;
    last.line = line;
    // The track shows down to the walker: its clip is moved down with it,
    // and the track inside moved back up by as much, so it stays put.
    const reveal = layer.querySelector<HTMLElement>(".explorer-route-reveal")!;
    const track = reveal.firstElementChild as HTMLElement;
    const shift = line - route.height;
    reveal.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    track.style.transform = `translate3d(0, ${(-shift).toFixed(1)}px, 0)`;
    const head = layer.querySelector<HTMLElement>(".explorer-route-head")!;
    const x = acrossAt(route, line) + wander(line);
    head.style.transform = `translate3d(${x.toFixed(1)}px, ${line.toFixed(1)}px, 0)`;
    head.style.opacity = reduced
      ? "0"
      : clamp((line - route.top) / 40).toFixed(2);
    // Waypoints light up once reached.
    const reached = route.waypoints.filter(({ y }) => line >= y - 2).length;
    if (reached !== last.reached) {
      last.reached = reached;
      route.waypoints.forEach(({ element }, index) =>
        element.classList.toggle("route-reached", index < reached),
      );
    }
  });

  return (
    <div
      ref={layerRef}
      className="explorer-route"
      aria-hidden="true"
      style={
        {
          "--route-map": `url("${assetUrl("explorer/topography.svg")}")`,
        } as CSSProperties
      }
    >
      <svg className="explorer-route-plan">
        <path />
        <circle r="5" />
        <circle r="5" />
      </svg>
      <div className="explorer-route-reveal">
        <svg className="explorer-route-track">
          <path className="explorer-route-glow" />
          <path />
        </svg>
      </div>
      <div className="explorer-route-head" />
    </div>
  );
};

export default ExplorerRoute;
