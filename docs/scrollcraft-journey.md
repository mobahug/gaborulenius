# Cinematic journey — design and implementation notes

The portfolio is one continuous journey through five generated films. The
scroll position directs everything, and the real portfolio content scrolls
over the films as semantic HTML. The films are joined where the footage
itself makes the join invisible — a pupil, a white-out, a black frame, a
leaf. What the footage contains, and why each seam is where it is, is
recorded in `cinematic-audit.md`.

```
JUNGLE CHASE        the path (cover, #home) → a morpho butterfly, the camera follows → a
                    scarlet macaw crosses the clearing behind About → its eye → the pupil
  ↓ the pupil is a window into the next film, until it fills the screen
NEURAL DECOMPILER   a spark → one neuron → a network flight → a ringed node → white   (#projects)
  ↓ white node = white sky
THE EXPLORER        Okavango from above → a mokoro → under the surface → a fish's mouth → black
  ↓ black mouth = black reflection
WORK HISTORY        espresso → the desk → the office → the plant → a leaf        (#experience, #skills)
  ↓ office leaf = jungle leaf
ENDING              through the leaves → the macaw lands, the morpho settles     (#contact)
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
| The neural probe                                         | `src/journey/overlays/*`                                |
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

| Seam              | Frames                      | Handling                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chase → Neural    | pupil → void (portal)       | From 6.92 s of the chase the pupil (measured in every frame, `portal.track`) is a window: the neural film shows through it from its first spark, far away at first, and fills the screen as the pupil does. The question waits until then (see below).                                                                                                                                                                                                                                                                                                          |
| Neural → Explorer | white node → warm white sky | ±0.1 viewport heights. White → cream, no black. Mean difference 17/255 (colour temperature only).                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Explorer → Work   | fish mouth → reflection     | ±0.05. Both black; practically a cut inside black.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Work → Ending     | office leaf → jungle leaf   | ±0.15. The jungle leaf is the office leaf 1.306× closer, 1.6 % to the right (fitted between the last and the first frame). It opens at 1.2×, 8 % down — hiding a dark band along the bottom of its first second — and the office leaf is pushed in to 1.567× (1.306 × 1.2), 8.3 % down and 2.4 % left, starting 0.3vh early, so their veins and holes lie on each other as they dissolve; the jungle leaf eases back once its shot has turned into the jungle (1.15–1.9 s). Shifts are fractions of the displayed frame, so the join holds on any screen shape. |

The pupil is cut where the chase actually is (the presented frame), but the
neural film seen through it follows the scroll's own time and a path with
the measured track's frame-to-frame wobble averaged out (±0.15 s), so it
glides instead of stepping with the footage's frames.

## Content over the films

`FilmSection` is a tall section in normal document flow. Its blocks (`Cue`)
and time anchors (`Mark`) carry a film time — "this block's centre crosses
the middle of the screen when the film is at 4.3 s" — and the film follows
the reading between them. Blocks fade and rise in as they enter; the shade
behind them deepens over bright footage (`--film-shade`, from each film's
measured brightness curve, in steps of 0.05 so the page is restyled only a
few times per stage). Content always stays in front of the films. With
reduced motion blocks simply stay visible.

Blocks sit where their shot leaves room for them: for every film the left
and right halves were measured every 0.3 s for brightness and busyness, and
each block is timed to a moment and placed on the calmer side — the Neural
Decompiler's case study on the right while the axon's glowing tip fills the
left, the Explorer's capabilities beside the mokoro and then over the calm
water, the experience timeline over the dark espresso, "Let's Connect" on
the left beside the macaw on its branch, with the morpho below it.

The question in the pupil (`PortalTitle`) is not there while the pupil is
still a circle. It fades in out of the black once the pupil covers the whole
screen — the moment is computed for the screen's size and shape
(`pupilCoverTime`: a portrait phone is covered before a wide desktop) —
comes forward a little, holds, and passes the camera. It keeps its place in
the document (reading order, search) but is drawn fixed to the screen like
the films, so it never has to follow the page's scrolling and undo it: it
cannot lag or shake. Its anchor above it carries the `#projects` id for
links and the scroll spy.

| Stage    | Content (all existing copy and links)                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Chase    | Greeting (cover), introduction and About over the path, the morpho and the macaw crossing behind them.             |
| Neural   | The research question (inside the pupil, then full size), title and summary, case study, method, stack, repo link. |
| Explorer | Title and summary, four capabilities, stack, "View details" (screens and full description in the existing dialog). |
| Work     | Experience timeline (tabs and detail dialogs), the four work projects with their links, the full skills list.      |
| Ending   | "Let's Connect" with email, LinkedIn and GitHub, fading in like every other block; the footer follows.             |

## The neural probe

Inside the Neural Decompiler the pointer is a probe
(`overlays/neuralProbe.ts`, fine pointers only): the film's picture is read
back at 128×74, its brightest local maxima (the neurons) are found, and the
pointer connects to the bright ones near it, showing each one's brightness
as its "activation". It is drawn right above the films, under the content,
and is idle and hidden everywhere else.

## Films

The delivered full-HD files (the chase: 1920×1080 HEVC, 24 fps, 193 frames,
with an audio track; the ending: 1922×1080; the others: 1880×1080; H.264,
30 fps, 239–240 frames;
B-frames and few keyframes throughout) cannot be scrubbed. `public/film/hd/`
and `public/film/sd/` hold scrub encodes made with AVFoundation/VideoToolbox
(FFmpeg is not installed here): 1880×1080 (the chase and the ending cut by
20–21 px a side to
the same 47:27 frame) and 1128×648, a keyframe every 8 frames, no frame
reordering, fast-start, BT.709 tags, no audio. Full HD is 5–7.5 Mb/s (about
31 MB for all five), the light set 2–3 Mb/s (about 12.5 MB). Large screens
get full HD; low-tier devices and saved or slow connections get the light
set. A seek plus a drawable frame costs about three times as much at full HD
as at 864×496 (software decoding in headless Chrome: 21 ms against 7 ms at
the median; hardware decoders are far faster). Each film also has a still
(WebP, 1128×648) for reduced motion and loading.

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
(`focus`, object-position over film time) — the chase's follow the morpho,
the macaw and its eye, the ending's the macaw onto its branch and the morpho
to its leaf, measured in every frame — and the portal maps frame coordinates
through the same crop. Low-tier devices get the light encodes.

## Reduced motion

Each stage shows its still instead of the film (no video is downloaded),
stills switch where a section's top crosses the middle of the screen, the
question is an ordinary block, spaces shrink to 12vh, and the page is about
13 viewport heights.

## Verification (September 2026, headless Chrome with H.264)

- `tsc -b`, `eslint`, `prettier`, `vite build`: clean.
- Every seam shot at 1440×900 and 390×844, forward and backward; the whole
  page swept on both and with reduced motion.
- The question in the pupil, scrolled through the eye in 0.02 s steps at
  1440×900, 390×844 and 2560×1080: never visible before the pupil covers the
  screen (7.91, 7.76 and 7.91 s of the chase), fading in from there; while
  it moves its centre departs from a smooth path by under 0.6 px per frame.
- Oscillating slowly and quickly across the five film boundaries (pupil
  hand-off, white, black, leaf, the ending's own dissolve): 324 frames each,
  both viewports, no frame in which the films did not fully cover the stage.
- Cold cache at 4 Mb/s and 150 ms latency, steady scroll through 19 viewports:
  no uncovered frame; stills stood in for 9 frames at the top only.
- Scripting per animation frame while scrolling the whole page: desktop p50
  0.2 ms, p99 0.7 ms, max 2.4 ms; phone emulation at 4× CPU p50 0.6 ms, p99
  3.5 ms. The navigation's scroll spy and the cover's reveal
  take their measurements from the scroll clock's read phase, so nothing
  forces a layout after the journey has written its styles.
- Reload in the eye, in the Explorer and in the work section returns to the
  same moment; `#skills` from a fresh load lands on Skills.
