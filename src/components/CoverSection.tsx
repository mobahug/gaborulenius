import React, { useEffect, useRef, useState } from "react";
import { colors as lightColors } from "../colors";
import { assetUrl } from "../utils/assets";
import { JUNGLE_LQIP } from "../journey/lqip";
import { clamp, easeInCubic, range } from "../journey/math";
import { registerScene } from "../journey/scrollTimeline";
import {
  getQualityTier,
  hasFinePointer,
  isWideLayout,
  prefersReducedMotion,
} from "../journey/device";

// Plain-DOM cover. It stays outside MUI/react-intl so the LCP avatar and the
// heading paint before the rest of the app has loaded.
const GREETINGS: Record<string, string> = {
  en: "Hi, I'm Gábor",
  fi: "Hei, olen Gábor",
};
const SKIP_LABELS: Record<string, string> = {
  en: "Skip to content",
  fi: "Siirry sisältöön",
};

const readDocumentLocale = (): string => {
  if (typeof document === "undefined") return "en";
  const value = document.documentElement.dataset.locale;
  return value === "fi" ? "fi" : "en";
};

type Exit = { x: number; y: number; scale: number };

/** A layer that walks past the camera as the visitor scrolls. */
type Layer = {
  id: string;
  rotate: number;
  mirror?: boolean;
  exit: Exit;
  wideOnly?: boolean;
};

/** Where a leaf's stalk is (left and top, as % of the scene) and how wide
 * the image is (vw). */
type Place = { x: number; y: number; width: number };

/**
 * A jungle leaf: an image rendered offline (tools/leaves), turned into
 * place around its stalk, breathing — a slow sway and swell, each on its
 * own rhythm.
 */
type LeafLayer = Layer & {
  /** public/cover/<image>.webp, and <image>-sm.webp at half the size. */
  image: string;
  /** Size of the large image (px). */
  size: [number, number];
  /** Where the stalk attaches, as fractions of the image. */
  origin: [number, number];
  wide: Place;
  narrow?: Place;
  /** Sway (deg), swell (scale), period (s), delay (s). */
  breathe: [number, number, number, number];
};

// The rendered ones are turned as in tools/leaves/cover.js, which lights
// each leaf for its turn; the monstera, the banana leaf and the fern are
// photographs (tools/leaves/photos.js). All of them are then graded into the
// film's look (tools/leaves/filmlook.js), which gives each a margin for its
// soft edge: the sizes, stalks and widths here are those of the final
// images.
const LEAVES: LeafLayer[] = [
  {
    id: "banana-high",
    image: "banana-high",
    size: [522, 1388],
    origin: [0.567, 0.959],
    rotate: 128,
    exit: { x: -0.36, y: -0.5, scale: 1.4 },
    wide: { x: -3, y: -4, width: 15.9 },
    breathe: [1.3, 1.012, 9.5, -3],
    wideOnly: true,
  },
  {
    id: "palm-high",
    image: "palm-high",
    size: [920, 1120],
    origin: [0.324, 0.962],
    rotate: 206,
    exit: { x: 0.34, y: -0.5, scale: 1.4 },
    wide: { x: 96, y: -8, width: 34.8 },
    narrow: { x: 104, y: -4, width: 71.6 },
    breathe: [1.6, 1.014, 7.5, -1],
  },
  {
    id: "alocasia",
    image: "alocasia",
    size: [934, 1274],
    origin: [0.5, 0.617],
    rotate: -52,
    exit: { x: 0.5, y: 0.35, scale: 1.5 },
    wide: { x: 104, y: 78, width: 31.1 },
    breathe: [1.1, 1.015, 8.5, -4],
    wideOnly: true,
  },
  {
    id: "monstera",
    image: "monstera",
    size: [1181, 1262],
    origin: [0.454, 0.739],
    rotate: 16,
    exit: { x: -0.5, y: 0.35, scale: 1.5 },
    wide: { x: 11, y: 100, width: 28.5 },
    narrow: { x: 6, y: 100, width: 73.9 },
    breathe: [0.9, 1.016, 10.5, -6],
  },
  {
    id: "fern-near",
    image: "fern-near",
    size: [573, 1348],
    origin: [0.101, 0.96],
    rotate: 118,
    exit: { x: -0.6, y: 0.5, scale: 1.7 },
    wide: { x: -2, y: 62, width: 16.4 },
    breathe: [1.8, 1.02, 6.5, -2],
    wideOnly: true,
  },
  {
    id: "heart-near",
    image: "heart-near",
    size: [674, 854],
    origin: [0.5, 0.73],
    rotate: -28,
    exit: { x: 0.6, y: 0.6, scale: 1.7 },
    wide: { x: 90, y: 116, width: 35.8 },
    narrow: { x: 96, y: 108, width: 77.9 },
    breathe: [1.4, 1.018, 7, -5],
  },
];

/** A leaf fades in once loaded; after that its opacity follows the scroll
 * without easing. */
const showLeaf = (element: HTMLElement) => {
  if (element.dataset.ready === "true") return;
  element.dataset.ready = "true";
  window.setTimeout(() => {
    element.dataset.settled = "true";
  }, 1500);
};

type Pollen = {
  x: number;
  y: number;
  z: number;
  phase: number;
  alpha: number;
};

const createPollen = (count: number): Pollen[] =>
  Array.from({ length: count }, (_, index) => {
    const seed = Math.sin(index * 12.9898) * 43758.5453;
    const random = (offset: number) => {
      const value = Math.sin(seed + offset * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };
    return {
      x: random(1),
      y: random(2),
      z: 0.25 + random(3) * 0.75,
      phase: random(4) * Math.PI * 2,
      alpha: 0.3 + random(5) * 0.6,
    };
  });

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const whenIdle = (callback: () => void, timeout: number) => {
  const idleWindow = window as IdleWindow;
  if (idleWindow.requestIdleCallback) {
    const handle = idleWindow.requestIdleCallback(callback, { timeout });
    return () => idleWindow.cancelIdleCallback?.(handle);
  }
  const handle = window.setTimeout(callback, Math.min(timeout, 1200));
  return () => window.clearTimeout(handle);
};

const CoverSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const shaftRef = useRef<HTMLDivElement>(null);
  const pollenRef = useRef<HTMLCanvasElement>(null);
  const layerRefs = useRef<Record<string, HTMLElement | null>>({});

  // Track <html data-locale> so the cover updates when the user toggles
  // language. The attribute is set both by the inline pre-React script in
  // index.html (initial paint) and by I18nWrapper (after React mounts).
  const [locale, setLocale] = useState<string>(readDocumentLocale);
  // The leaves load once the first film is on screen (or a moment after the
  // page, if it is slow to come), so they never hold up its picture.
  const [leavesOn, setLeavesOn] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.videoReady === "true") {
      setLeavesOn(true);
      return;
    }
    const observer = new MutationObserver(() => {
      if (root.dataset.videoReady === "true") setLeavesOn(true);
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-video-ready"],
    });
    const fallback = window.setTimeout(() => setLeavesOn(true), 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  const greeting = GREETINGS[locale] ?? GREETINGS.en;
  const skipLabel = SKIP_LABELS[locale] ?? SKIP_LABELS.en;

  useEffect(() => {
    const root = document.documentElement;
    setLocale(readDocumentLocale());
    const observer = new MutationObserver(() => {
      setLocale(readDocumentLocale());
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-locale"],
    });
    return () => observer.disconnect();
  }, []);

  // Scroll + pointer choreography: the camera walks forward, the foreground
  // passes it, and the greeting is left behind in the mist.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const reduced = prefersReducedMotion();
    const finePointer = hasFinePointer() && !reduced;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let progress = 0;
    let viewport = { vw: window.innerWidth, vh: window.innerHeight };
    let pointerFrame: number | null = null;
    const layers: Layer[] = LEAVES;

    const apply = () => {
      const walk = reduced ? 0 : easeInCubic(progress);
      const { vw, vh } = viewport;

      // Everything in the scene is gone by the time it scrolls away, so its
      // edge never shows as a seam over the walk behind it.
      const leave = reduced ? 1 : 1 - range(progress, 0.72, 0.98);
      layers.forEach((spec) => {
        const element = layerRefs.current[spec.id];
        if (!element) return;
        const x = spec.exit.x * vw * walk + pointer.x * 34;
        const y = spec.exit.y * vh * walk + pointer.y * 22;
        const scale = 1 + (spec.exit.scale - 1) * walk;
        element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${spec.rotate}deg) scale(${spec.mirror ? -scale : scale}, ${scale})`;
        element.style.setProperty("--leave", leave.toFixed(3));
      });

      const copy = copyRef.current;
      if (copy) {
        const fade = reduced ? 0 : range(progress, 0.3, 0.84);
        const lift = reduced ? 0 : progress;
        // Only transform and opacity: nothing to repaint while scrolling.
        copy.style.transform = `translate3d(${(pointer.x * 10).toFixed(1)}px, ${(pointer.y * 8 - lift * vh * 0.05).toFixed(1)}px, 0) scale(${(1 + 0.3 * walk).toFixed(3)})`;
        copy.style.opacity = (1 - fade).toFixed(3);
      }

      const mist = mistRef.current;
      if (mist) {
        mist.style.transform = `translate3d(${(pointer.x * 14).toFixed(1)}px, ${(progress * vh * 0.07).toFixed(1)}px, 0) scale(${(1 + 0.14 * progress).toFixed(3)})`;
        mist.style.opacity = (
          reduced ? 1 : 1 - range(progress, 0.55, 0.98)
        ).toFixed(3);
      }

      const shaft = shaftRef.current;
      if (shaft) {
        shaft.style.transform = `translate3d(${(pointer.x * 6).toFixed(1)}px, 0, 0)`;
        shaft.style.opacity = (
          reduced ? 1 : 1 - range(progress, 0.55, 0.98)
        ).toFixed(3);
      }
      const pollen = pollenRef.current;
      if (pollen) {
        pollen.style.setProperty("--leave", leave.toFixed(3));
      }
    };

    const unregister = registerScene(wrapper, (frame) => {
      progress = frame.pin;
      viewport = { vw: frame.viewport.vw, vh: frame.viewport.vh };
      apply();
    });

    const settlePointer = () => {
      pointerFrame = null;
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;
      apply();
      if (
        Math.abs(pointer.targetX - pointer.x) > 0.001 ||
        Math.abs(pointer.targetY - pointer.y) > 0.001
      ) {
        pointerFrame = window.requestAnimationFrame(settlePointer);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (progress >= 1) return;
      pointer.targetX = clamp(event.clientX / viewport.vw - 0.5, -0.5, 0.5);
      pointer.targetY = clamp(event.clientY / viewport.vh - 0.5, -0.5, 0.5);
      if (pointerFrame === null) {
        pointerFrame = window.requestAnimationFrame(settlePointer);
      }
    };

    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      unregister();
      if (finePointer) window.removeEventListener("pointermove", onPointerMove);
      if (pointerFrame !== null) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  // Pollen drifting through the light. Starts once the page is idle so it
  // never competes with the first paint.
  useEffect(() => {
    const canvas = pollenRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = prefersReducedMotion();
    const tier = getQualityTier();
    const count = tier === "low" ? 14 : isWideLayout() ? 42 : 22;
    const pollen = createPollen(count);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let visible = true;
    let frameId: number | null = null;
    let scrollProgress = 0;
    let started = false;

    const sprite = document.createElement("canvas");
    sprite.width = 32;
    sprite.height = 32;
    const spriteContext = sprite.getContext("2d");
    const paintSprite = () => {
      if (!spriteContext) return;
      const gradient = spriteContext.createRadialGradient(
        16,
        16,
        0,
        16,
        16,
        16,
      );
      const tint = "255, 238, 196";
      gradient.addColorStop(0, `rgba(${tint}, 1)`);
      gradient.addColorStop(0.35, `rgba(${tint}, 0.45)`);
      gradient.addColorStop(1, `rgba(${tint}, 0)`);
      spriteContext.clearRect(0, 0, 32, 32);
      spriteContext.fillStyle = gradient;
      spriteContext.fillRect(0, 0, 32, 32);
    };
    paintSprite();

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const t = time / 1000;
      pollen.forEach((particle) => {
        const drift = reduced ? 0 : t * (0.004 + particle.z * 0.01);
        const sway = reduced ? 0 : Math.sin(t * 0.6 + particle.phase) * 0.012;
        const x = ((((particle.x + sway) % 1) + 1) % 1) * width;
        const parallax = reduced ? 0 : scrollProgress * particle.z * 0.55;
        let y = particle.y - drift - parallax;
        y = (((y % 1) + 1) % 1) * height;
        // Brighter where the particle crosses the light shaft.
        const shaftX = 0.62 - (y / height) * 0.24;
        const inShaft = Math.max(0, 1 - Math.abs(x / width - shaftX) / 0.09);
        const twinkle = reduced
          ? 1
          : 0.75 + 0.25 * Math.sin(t * 1.7 + particle.phase * 3);
        const size = (1.2 + particle.z * 3.2) * (1 + inShaft * 0.6);
        context.globalAlpha = Math.min(
          1,
          particle.alpha * (0.45 + inShaft * 1.1) * twinkle,
        );
        context.drawImage(sprite, x - size, y - size, size * 2, size * 2);
      });
      context.globalAlpha = 1;
    };

    const loop = (time: number) => {
      frameId = null;
      draw(time);
      if (visible && !document.hidden && !reduced) {
        frameId = window.requestAnimationFrame(loop);
      }
    };

    const start = () => {
      if (frameId === null && visible && !document.hidden) {
        frameId = window.requestAnimationFrame(loop);
      }
    };

    const unregister = registerScene(wrapper, (frame) => {
      scrollProgress = frame.pin;
    });

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && started) start();
    });
    intersection.observe(wrapper);

    const onVisibility = () => {
      if (!document.hidden && started) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      resize();
      if (reduced && started) draw(0);
    };
    window.addEventListener("resize", onResize);

    const cancelIdle = whenIdle(() => {
      started = true;
      resize();
      canvas.dataset.ready = "true";
      window.setTimeout(() => {
        canvas.dataset.settled = "true";
      }, 1700);
      if (reduced) draw(0);
      else start();
    }, 2500);

    return () => {
      unregister();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      cancelIdle();
    };
  }, []);

  const layerClass = (spec: Layer) =>
    `cover-layer cover-layer--leaf cover-layer--${spec.id}${spec.wideOnly ? " cover-layer--wide-only" : ""}`;

  return (
    <>
      <a className="cover-skip" href="#home">
        {skipLabel}
      </a>
      <div id="cover" ref={wrapperRef} className="cover">
        <section className="cover-scene" aria-labelledby="cover-heading">
          <div className="cover-lqip" aria-hidden="true" />
          <div className="cover-depth" aria-hidden="true">
            <div ref={mistRef} className="cover-mist">
              <div className="cover-mist-band cover-mist-band--a" />
              <div className="cover-mist-band cover-mist-band--b" />
            </div>
            <div ref={shaftRef} className="cover-shaft" />
            <canvas ref={pollenRef} className="cover-pollen" />
          </div>
          <div ref={copyRef} className="cover-copy">
            <img
              alt="Gábor Ulenius"
              src={assetUrl("profile-160.webp")}
              srcSet={`${assetUrl("profile-160.webp")} 160w, ${assetUrl(
                "profile-320.webp",
              )} 320w`}
              sizes="(max-width: 600px) 140px, (max-width: 900px) 150px, 160px"
              width={160}
              height={160}
              decoding="async"
              fetchPriority="high"
              loading="eager"
              className="cover-avatar"
            />
            <h1 id="cover-heading" className="cover-greeting">
              {greeting}
            </h1>
          </div>
          <div className="cover-depth cover-depth--near" aria-hidden="true">
            {LEAVES.map((leaf) => {
              const [width, height] = leaf.size;
              const narrow = leaf.narrow ?? leaf.wide;
              return (
                <img
                  key={leaf.id}
                  ref={(element) => {
                    layerRefs.current[leaf.id] = element;
                    // Already there (from the cache) before React listened.
                    if (element?.complete && element.naturalWidth) {
                      showLeaf(element);
                    }
                  }}
                  className={layerClass(leaf)}
                  src={
                    leavesOn ? assetUrl(`cover/${leaf.image}.webp`) : undefined
                  }
                  srcSet={
                    leavesOn
                      ? `${assetUrl(`cover/${leaf.image}-sm.webp`)} ${Math.ceil(width / 2)}w, ${assetUrl(`cover/${leaf.image}.webp`)} ${width}w`
                      : undefined
                  }
                  sizes={`(max-width: 899.95px) ${narrow.width}vw, ${leaf.wide.width}vw`}
                  width={width}
                  height={height}
                  alt=""
                  decoding="async"
                  fetchPriority="low"
                  draggable={false}
                  onLoad={(event) => showLeaf(event.currentTarget)}
                  style={
                    {
                      "--x": `${leaf.wide.x}%`,
                      "--y": `${leaf.wide.y}%`,
                      "--w": `${leaf.wide.width}vw`,
                      "--nx": `${narrow.x}%`,
                      "--ny": `${narrow.y}%`,
                      "--nw": `${narrow.width}vw`,
                      "--ox": leaf.origin[0],
                      "--oy": leaf.origin[1],
                      "--aspect": height / width,
                      "--breath-turn": `${leaf.breathe[0]}deg`,
                      "--breath-grow": leaf.breathe[1],
                      "--breath-period": `${leaf.breathe[2]}s`,
                      "--breath-delay": `${leaf.breathe[3]}s`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        </section>
        <style>{`
        .cover {
          position: relative;
          z-index: 1;
          height: 150vh;
          height: 150svh;
        }
        .cover-scene {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: ${lightColors.textLight};
        }
        .cover-lqip {
          position: absolute;
          inset: -4%;
          background: #1e2a20 url("${JUNGLE_LQIP}") center / cover no-repeat;
          filter: blur(22px) saturate(1.1);
          transition: opacity 900ms ease;
        }
        html[data-video-ready="true"] .cover-lqip { opacity: 0; }
        .cover-depth {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cover-depth--near { z-index: 3; }
        .cover-layer {
          position: absolute;
          will-change: transform;
        }
        /* A leaf: placed by its stalk (--x, --y) and its width (--w), turned
           around the stalk, fading in once loaded, and breathing. */
        .cover-layer--leaf {
          --lx: var(--x);
          --ly: var(--y);
          --lw: var(--w);
          left: calc(var(--lx) - var(--ox) * var(--lw));
          top: calc(var(--ly) - var(--oy) * var(--lw) * var(--aspect));
          width: var(--lw);
          height: auto;
          transform-origin: calc(var(--ox) * 100%) calc(var(--oy) * 100%);
          opacity: 0;
          transition: opacity 1.4s ease;
          user-select: none;
          animation: cover-leaf-breathe var(--breath-period, 8s) ease-in-out var(--breath-delay, 0s) infinite;
        }
        .cover-layer--leaf[data-ready="true"] { opacity: var(--leave, 1); }
        .cover-layer--leaf[data-settled="true"],
        .cover-pollen[data-settled="true"] { transition: none; }
        @keyframes cover-leaf-breathe {
          0%, 100% { rotate: calc(var(--breath-turn, 1deg) * -1); scale: 1; }
          50% { rotate: var(--breath-turn, 1deg); scale: var(--breath-grow, 1.015); }
        }
        @media (max-width: 899.95px) {
          .cover { height: 130vh; height: 130svh; }
          .cover-layer--wide-only { display: none; }
          .cover-layer--leaf { --lx: var(--nx); --ly: var(--ny); --lw: var(--nw); }
        }
        .cover-mist {
          position: absolute;
          inset: 0;
          will-change: transform, opacity;
        }
        .cover-mist-band {
          position: absolute;
          left: -20%;
          width: 140%;
          border-radius: 50%;
          filter: blur(30px);
        }
        .cover-mist-band--a {
          top: 52%;
          height: 42%;
          background: radial-gradient(closest-side, rgba(222, 236, 205, 0.18), rgba(222, 236, 205, 0));
          animation: cover-mist-drift 38s ease-in-out infinite alternate;
        }
        .cover-mist-band--b {
          top: 64%;
          height: 36%;
          background: radial-gradient(closest-side, rgba(240, 226, 186, 0.12), rgba(240, 226, 186, 0));
          animation: cover-mist-drift 52s ease-in-out -20s infinite alternate-reverse;
        }
        @keyframes cover-mist-drift {
          from { transform: translate3d(-4vw, 0, 0); }
          to { transform: translate3d(4vw, -1vh, 0); }
        }
        .cover-shaft {
          position: absolute;
          top: -12vh;
          left: 47vw;
          width: 22vw;
          height: 125vh;
          transform-origin: 50% 0;
          rotate: 17deg;
          background: linear-gradient(90deg, rgba(255, 226, 160, 0), rgba(255, 228, 168, 0.1) 38%, rgba(255, 240, 205, 0.16) 50%, rgba(255, 228, 168, 0.1) 62%, rgba(255, 226, 160, 0));
          -webkit-mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.6) 45%, transparent 88%);
          mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.6) 45%, transparent 88%);
          animation: cover-shaft-shimmer 9s ease-in-out infinite alternate;
        }
        @keyframes cover-shaft-shimmer {
          from { opacity: 0.7; }
          to { opacity: 1; }
        }
        .cover-pollen {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.6s ease;
        }
        .cover-pollen[data-ready="true"] { opacity: var(--leave, 1); }
        .cover-copy {
          position: relative;
          z-index: 2;
          max-width: 720px;
          padding: 0 24px;
          transform-origin: 50% 45%;
          will-change: transform, opacity;
        }
        .cover-avatar {
          display: block;
          width: 140px;
          height: 140px;
          margin: 0 auto 36px auto;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid ${lightColors.accent};
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.55), 0 0 0 10px rgba(255, 236, 190, 0.06);
          background-color: ${lightColors.bgDark};
        }
        @media (min-width: 600px) {
          .cover-avatar { width: 150px; height: 150px; }
        }
        @media (min-width: 900px) {
          .cover-avatar { width: 160px; height: 160px; }
        }
        .cover-greeting {
          margin: 0;
          font-family: "Inter", system-ui, sans-serif;
          font-size: clamp(2.5rem, 6.4vw, 5.4rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.02;
          color: #f4efdf;
          text-shadow: 0 2px 30px rgba(8, 14, 9, 0.6), 0 1px 2px rgba(8, 14, 9, 0.5);
        }
        .cover-skip {
          position: fixed;
          left: 16px;
          top: 16px;
          z-index: 1300;
          padding: 12px 18px;
          border-radius: 10px;
          background: ${lightColors.btnBg};
          color: ${lightColors.textLight};
          font: 600 1rem/1.2 "Inter", system-ui, sans-serif;
          text-decoration: none;
          transform: translateY(-160%);
          transition: transform 0.2s ease;
        }
        .cover-skip:focus-visible {
          transform: translateY(0);
          outline: 2px solid ${lightColors.accentHover};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cover { height: 100vh; height: 100svh; }
          .cover-mist-band, .cover-shaft { animation: none; }
          .cover-lqip, .cover-pollen, .cover-layer--leaf { transition: none; }
          .cover-layer--leaf { animation: none; }
        }
      `}</style>
      </div>
    </>
  );
};

export default CoverSection;
