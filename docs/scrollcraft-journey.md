# Cinematic journey — design and implementation notes

The portfolio is one continuous journey through five generated films. The
scroll position directs everything, and the real portfolio content scrolls
over the films as semantic HTML. The films are joined where the footage
itself makes the join invisible — a pupil, a white-out, a black frame, a
leaf. What the footage contains, and why each seam is where it is, is
recorded in `cinematic-audit.md`.

```
JUNGLE CHASE        the path (cover, #home) → a butterfly, the camera follows → a scarlet
                    macaw flies at the camera — in front of About — → its eye → the pupil
  ↓ the pupil is a window into the next film, until it fills the screen
NEURAL DECOMPILER   a spark → one neuron → a network flight → a ringed node → white   (#projects)
  ↓ white node = white sky
THE EXPLORER        Okavango from above → a mokoro → under the surface → a fish's mouth → black
  ↓ black mouth = black reflection
WORK HISTORY        espresso → the desk → the office → the plant → a leaf        (#experience, #skills)
  ↓ office leaf = jungle leaf
ENDING              through the leaves → the macaw lands, the butterfly settles  (#contact)
```

Scroll is the only clock: every picture is a function of the scroll
position, so scrolling back plays everything backwards and a navigation jump
lands in the same state slow scrolling would reach.

## Architecture

| Concern                                                  | File                                                    |
| -------------------------------------------------------- | ------------------------------------------------------- |
| Scroll clock (one listener, read/write, eased `smoothY`) | `src/journey/scrollTimeline.ts`, `useScene.ts`          |
| Scene director (one frame for every visual system)       | `src/journey/director/director.ts`                      |
| Frame ↔ screen mapping, the pupil's geometry            | `src/journey/director/frameMapping.ts`                  |
| Content shade from the footage's brightness              | `src/journey/director/filmLight.ts`                     |
| Return to the same moment after reload / deep link       | `src/journey/director/restorePosition.ts`               |
| Film data: sources, seams, focus, light                  | `src/journey/film/films.ts`                             |
| Master timeline (scroll → film time, pure)               | `src/journey/film/filmTimeline.ts`                      |
| Driving one video (scrub, presented frame)               | `src/journey/film/scrubVideo.ts`                        |
| The film stack, loading, the portal mask                 | `src/journey/film/FilmLayer.tsx`                        |
| Stage sections, timed content                            | `src/journey/film/FilmSection.tsx`, `stages/*Stage.tsx` |
| The question inside the pupil                            | `src/journey/film/PortalTitle.tsx`                      |
| The keyed macaw, the neural probe                        | `src/journey/overlays/*`                                |
| Cover (plain DOM, LCP) and its leaves                    | `src/components/CoverSection.tsx`, `journey/foliage/*`  |

### The director

`director.ts` runs once per animation frame, after the scroll clock has
measured every section, and hands one `DirectorFrame` to its subscribers in
a fixed order:

| Field                                              | Meaning                                                                            |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `journeyProgress`                                  | 0 at the top of the page, 1 at the bottom                                          |
| `activeChapter`, `chapterIndex`, `chapterProgress` | the film the visitor is in and how far through its section                         |
| `transition`, `transitionProgress`                 | the seam being crossed (the pupil opening, or a film fading in) and how far        |
| `scrollDirection`, `scrollVelocity`                | measured for presentation only; they decay to 0 when the page is still             |
| `reduced`, `deviceTier`                            | reduced motion, and a coarse CPU/memory tier                                       |
| `timeline`                                         | per film: time, opacity, transform, portal (from `computeTimeline`)                |
| `stage`                                            | filled in by the film layer: each film's _presented_ frame time and the open pupil |

The film layer subscribes first (order 0). It drives the videos and records
what is actually on screen, so everything after it lines up with the
picture rather than with where the scroll is taking it.

## Seams

| Seam              | Frames                      | Handling                                                                                                                                                                                                                                                  |
| ----------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chase → Neural    | pupil → void (portal)       | From 6.96 s of the chase the pupil (measured in every frame, `portal.track`) is a window: the neural film shows through it from its first spark, far away at first, and fills the screen as the pupil does. The question grows inside it (see below).     |
| Neural → Explorer | white node → warm white sky | ±0.1 viewport heights. White → cream, no black. Mean difference 17/255 (colour temperature only).                                                                                                                                                         |
| Explorer → Work   | fish mouth → reflection     | ±0.05. Both black; practically a cut inside black.                                                                                                                                                                                                        |
| Work → Ending     | office leaf → jungle leaf   | ±0.15. The office leaf is pushed in (1.09×, 4.3 % down, starting 0.3vh early) until its veins and holes lie on the jungle leaf (1.11×, 3 % down), which eases back once its shot has changed (it hides a dark band along the bottom of its first second). |

The pupil is cut where the chase actually is (the presented frame), but what
moves inside it — the neural film and the question — follows the scroll's
own time and a path with the measured track's frame-to-frame wobble averaged
out (±0.15 s), so it glides instead of stepping with the 24 fps footage.

## Content over the films

`FilmSection` is a tall section in normal document flow. Its blocks (`Cue`)
and time anchors (`Mark`) carry a film time — "this block's centre crosses
the middle of the screen when the film is at 4.3 s" — and the film follows
the reading between them. Blocks fade and rise in as they enter; the shade
behind them deepens over bright footage (`--film-shade`, from each film's
measured brightness curve, in steps of 0.05 so the page is restyled only a
few times per stage). With reduced motion blocks simply stay visible.

The question in the pupil (`PortalTitle`) keeps its place in the document
(reading order, search) but is drawn fixed to the screen like the films, so it
never has to follow the page's scrolling and undo it: it cannot lag or
shake. Its anchor above it carries the `#projects` id for links and the
scroll spy.

| Stage    | Content (all existing copy and links)                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Chase    | Greeting (cover), introduction and About over the path, the butterfly and the macaw's arrival.                     |
| Neural   | The research question (inside the pupil, then full size), title and summary, case study, method, stack, repo link. |
| Explorer | Title and summary, four capabilities, stack, "View details" (screens and full description in the existing dialog). |
| Work     | Experience timeline (tabs and detail dialogs), the four work projects with their links, the full skills list.      |
| Ending   | "Let's Connect" with email, LinkedIn and GitHub, fading in like every other block; the footer follows.             |

## Overlays

- **The macaw in front of the page** (`overlays/macawKey.ts`). While the
  macaw comes at the camera (4.95–6.85 s of the chase) the chase video is
  drawn a second time above the content through a key that keeps only the
  bird: its scarlet and blue are the only saturated reds and blues in the
  jungle (quarter-resolution key, dilated, WebGL2). It flies across About.
- **The neural probe** (`overlays/neuralProbe.ts`, fine pointers only).
  Inside the Neural Decompiler the film's picture is read back at 128×74,
  its brightest local maxima (the neurons) are found, and the pointer
  connects to the bright ones near it, showing each one's brightness as its
  "activation".

Both are idle and hidden outside their moments; the macaw's shaders are
compiled while the page is idle.

## Films

The delivered files (864×496, 24 fps, 193 frames, 1–3 keyframes each,
B-frames, metadata at the end) cannot be scrubbed. `public/film/*.mp4` are
scrub encodes made with AVFoundation/VideoToolbox (FFmpeg is not installed
here): a keyframe every 8 frames, no frame reordering, fast-start, BT.709
tags, 2.5–3.3 Mb/s — about 14 MB for all five. In Chromium a seek plus a
drawable frame takes 6.5 ms (p50) / 8.9 ms (p90), against 13 / 17 ms for the
previous GOP-30 encodes with B-frames. Each film also has a still (WebP) for
reduced motion and loading.

`ScrubVideo` eases the shown time toward the target (35 ms), never has more
than one seek in flight, jumps over gaps above 1.2 s, and reports the
presented frame's time from `requestVideoFrameCallback` (the `seeked` time
where that is missing).

## Loading

- The cover paints first over a 48×27 placeholder of the chase's first frame.
  The chase loads once the app has started; the next film once the visitor
  starts scrolling; after that the current film first and its neighbours once
  it can show a frame (or after 2.5 s).
- Jumps load nothing on the way: scrolling faster than 0.12 viewport heights
  per frame, and any in-page link (the page scrolls smoothly through
  everything in between), count as transit; loading starts where they land.
- On phones a film two stages away is released after staying that far for
  6 s (three away at once), so going back and forth over a seam never
  reloads anything.
- A film that is not ready holds the previous film's last frame through its
  seam (the seams are shared frames), then its still; the video fades in once
  it has the right frame. The stage never shows its own background at a seam.
- After a reload or back/forward the visitor returns to the same moment
  (section and progress, re-applied while lazy sections above settle); a link
  from elsewhere (`#skills`) lands on its section once it exists.

## Phones

The same story, about 10 % less scroll per stage. A 16:9 frame on a portrait
screen shows about its middle third, so each film has focus keyframes
(`focus`, object-position over film time), and the portal and the keyed
macaw map frame coordinates through the same crop. Low-tier devices draw the
macaw at device-pixel ratio 1.

## Reduced motion

Each stage shows its still instead of the film (no video is downloaded),
stills switch where a section's top crosses the middle of the screen, the
question is an ordinary block, spaces shrink to 12vh, and the page is about
13 viewport heights.

## Verification (September 2026, headless Chrome with H.264)

- `tsc -b`, `eslint`, `prettier`, `vite build`: clean.
- Every seam shot at 1440×900 and 390×844, forward and backward; the whole
  page swept on both and with reduced motion.
- The question in the pupil, scrolled steadily through the eye: its centre
  departs from a smooth path by at most 0.7 px (desktop) / 1.5 px (phone)
  per frame, its size by at most 0.7 % — against 9–12 px and 7.5 % while it
  followed the presented 24 fps frames.
- Oscillating slowly and quickly across the five film boundaries (pupil
  hand-off, white, black, leaf, the ending's own dissolve): 324 frames each,
  both viewports, no frame in which the films did not fully cover the stage.
- Cold cache at 4 Mb/s and 150 ms latency, steady scroll through 19 viewports:
  no uncovered frame; stills stood in for 9 frames at the top only.
- Scripting per animation frame while scrolling the whole page: desktop p50
  0.5 ms, p99 0.8 ms, max 1.8 ms; phone emulation at 4× CPU p50 0.1 ms, p99
  2.1 ms; no long tasks. The navigation's scroll spy and the cover's reveal
  take their measurements from the scroll clock's read phase, so nothing
  forces a layout after the journey has written its styles.
- Reload in the eye, in the Explorer and in the work section returns to the
  same moment; `#skills` from a fresh load lands on Skills.
