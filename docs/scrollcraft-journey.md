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
| Cover (plain DOM, LCP) and its leaves                    | `src/components/CoverSection.tsx`, `tools/leaves/*`     |
| Introduction and About (film blocks of the chase)        | `src/journey/chapters/*`                                |
| Palette and interface (navigation, dialogs, cards …)     | `src/colors.ts`, `src/theme.tsx`                        |

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

| Seam              | Frames                      | Handling                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Chase → Neural    | pupil → void (portal)       | From 6.92 s of the chase the pupil (measured in every frame, `portal.track`) is a window: the neural film shows through it from its first spark, fading in as the pupil opens (over 0.6 s of the chase), framed with the pupil (`depth` 1) so the spark and its nebula glow inside the eye as it comes closer, and fills the screen as the pupil does. Each film keeps its videos to itself (`isolation`), so the chase's full-HD video never lies over the window. It is screen-blended over the chase, so its black void leaves the pupil's own dark reflections as they are — no edge between the two films, only the spark and the nebula glowing inside the eye — and the chase ends on black, where blending and covering are the same. The question waits until the pupil fills the screen (see below).                                                                                                                                               |
| Neural → Explorer | white node → warm white sky | ±0.1 viewport heights. White → cream, no black. Mean difference 17/255 (colour temperature only).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Explorer → Work   | fish mouth → reflection     | ±0.05. Both black; practically a cut inside black.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Work → Ending     | office leaf → jungle leaf   | ±0.2. The jungle leaf is the office leaf 1.306× closer, 1.6 % to the right (fitted between the last and the first frame). It opens at 1.2×, 8 % down — hiding a dark band along the bottom of its first second — and the office leaf is pushed in to 1.567× (1.306 × 1.2), 8.3 % down and 2.4 % left, starting 0.3vh early, so their veins lie on each other as they dissolve. The two leaves are not the same plant (holes and colours differ), so the seam is softened (`soften`): the office leaf goes out of focus as the camera closes in (to 1.4 % of the frame's height), the jungle leaf arrives just as soft, and it only comes back into focus (0.55–1.1 s) where its own shot defocuses into the jungle — the leaves melt into one another instead of showing double edges. The jungle leaf eases back once its shot has turned into the jungle (1.15–1.9 s). Shifts are fractions of the displayed frame, so the join holds on any screen shape. |

The pupil is cut where the chase actually is (the presented frame), but the
neural film seen through it follows the scroll's own time and a path with
the measured track's frame-to-frame wobble averaged out (±0.15 s), so it
glides instead of stepping with the footage's frames.

## Content over the films

`FilmSection` is a tall section in document order. Its blocks (`Cue`) and
time anchors (`Mark`) carry a film time — "the film is at 4.3 s in the
middle of this block's time on screen" — and the film follows the reading
between them.

A block does not scroll past like a credit roll. It stands still on the
screen for its stretch of the scroll (its hold, `hold` viewport heights,
90 by default, and a fifth more — three tenths more on phones — so it can
be read at leisure) while the film plays behind it: it is sticky, centred a
little high below the navigation, out of sight while it slides into place
and away again. It comes and goes the way the question in the pupil does
(`PortalTitle`) — fading in as it settles down into place from a little
above and grows from 94 % to its size, and passing the camera as it fades
out, growing to about 110 % (less than the question: a large block that
grows much makes the GPU draw it again mid-scroll) — and both take the same
time, however fast the page is scrolled: the block is shown while the
scroll is inside its hold (from 3 % to 90 % of it) and fades in or out over
1.2 s (0.8 s on touch screens, so a quick flick does not outrun it); once the page has moved past its hold, it goes with the page as it
fades. (Holding it in place from script instead fought a phone's own,
threaded scrolling: under a touch fling each block jumped back and forth by
up to 26 px, two or three times; now it moves one way only.) The next
block waits until the last one is less than 30 % there, so two blocks'
words never cross. The block's beats carry the motion (their
transform) and their parts and the veil the opacity: opacity on the block
itself would cut its veil off from the films. Out of sight it takes no
clicks, so it never catches one meant for the block on screen. A block
may come in beats (`film-beat`): an Explorer capability's words come first
and its phones follow 7 % of the hold later, and on the way out the phones
leave first, so the words frame each moment. A block holding keyboard
focus is always fully visible, still and in place — only that block, and
only for keyboard focus (`:focus-visible`), since a click also focuses a
button.
Each hold
takes only the scroll it is held for — the block's own height is given back
below it, where the next block is still out of sight — so the `Space`
between two blocks is the film on its own. The film's cue time lands in the
middle of the hold, and so does a link to the block (`.film-anchor`, which
also carries the ids and the navigation's refs, so the scroll spy, deep
links and reload never measure a sticky element). Content is cut into
beats that fit a phone's screen — About's words and its story, two work
projects at a time, the skills and then the tools, how the Explorer is
built one group at a time; a block that is still too tall for the screen
(a very short phone) scrolls with the page instead, fading in and out at
the edges. Content always stays in front of the films. With reduced motion
nothing is held: everything simply stays visible, in the page's flow.

Behind every block the film goes out of focus and a little darker, as if
the camera had racked focus onto the text: the veil (`.film-copy::before`,
and the experience timeline's panel). It is a backdrop blur with a forest
shade, feathered into the picture at its edges so it has no outline; it
comes in with its block and goes as the block leaves (`--veil`, set by
`FilmSection` in steps of 2 %), and its shade deepens over bright footage
(`--film-shade`, from each film's measured brightness curve, in steps of
0.05). The shade is set on the blocks themselves and is not inherited (a
registered property), so a change restyles only the veils — on the root it
restyled the whole page, some 840 elements, a few times per stage. The neural filaments, the Okavango's
reflections and the office window all turn into soft light behind the
words. On a narrow screen the veil spans the screen's width. Without
backdrop filters it is a deeper shade, and with `prefers-reduced-transparency`
an almost opaque one. A block is never faded or moved as a whole (only its
parts and its veil are), so nothing between the films and a veil — or a
glass card or button inside a block — hides the films from its blur.

The first scene works the same way as every other: the cover (the LCP,
plain DOM) holds for half a viewport while the greeting fades and the
leaves part, and the introduction and About follow as ordinary blocks —
nothing else is pinned — while the chase moves from the first scroll, about
0.8 s of film per viewport height, a little more than one second while the
macaw crosses the clearing, and slowing for the dive into the eye.

The chase itself is graded when it is encoded (saturation 1.16, contrast
1.12, vibrance 0.2, gamma 0.94): its opening frames were flat and greyish,
and now carry the richer greens of the old portfolio; it still ends on
black, so the pupil's hand-off is unchanged.

The cover's jungle leaves are images (`public/cover/`, WebP with alpha, a
large and a half-size one each), graded vivid and lime (more red, much less
blue, as the earlier painted leaves were): a banana leaf from the top left, a palm
frond hanging from the top right, a giant taro (alocasia) at the right
edge, a monstera and a fern crossing it at the bottom left, and a
heart-shaped philodendron close to the camera, dark and out of focus
(phones show the banana leaf, the palm frond, the monstera and the
philodendron, framing the greeting from the four corners). The
monstera, the banana leaf and the fern are photographs, cut out of their
white or checkerboard backgrounds by `tools/leaves/cutout.html` (the
background is what is bright, grey and reaches the edge, plus large
enclosed holes; the edges lose the background's light), turned upright,
cropped and graded like the rest (`photos.js`; the photos are not kept in
the repository). The others are rendered offline by `tools/leaves/` —
open `leaves.html` to preview and download them — from
each species' structure: its outline, midrib and veins, the monstera's
splits and holes, the banana's tears, the fern's pinnae and pinnules; a
height map (the blade's curve and fold, raised or sunken veins, the fine
veinlet network, undulation) lit per pixel with gloss and light through
the thin tissue; dry margins and blemishes; and graded into the film's
picture (softer colour, the mist between leaf and camera, grain). Both kinds
are then put into the film's own look (`filmlook.html`, from the large
images in `renders/`): each leaf's lightness and colours move toward the
film's around the place it hangs in (in Lab, their mean and spread; the
near ones a little darker than what is behind them), the film's haze
lifts it and its lights glow, it goes out of focus as much as it is near
the camera (the camera is focused on the path) and it gets the film's
grain — so the leaves read as part of the shot, not laid over it. Each
leaf is lit by the scene's sun turned back by the angle the cover places
it at. On the cover each one breathes — a slow sway and swell around its
stalk, on its own rhythm (CSS, so the compositor animates it) — and they
still part as the visitor walks in.

Blocks sit where their shot leaves room for them: for every film the left
and right halves were measured every 0.3 s for brightness and busyness, and
each block is timed to a moment and placed on the calmer side — the Neural
Decompiler's case study on the right while the axon's glowing tip fills the
left, the Explorer's capabilities alternating sides along the channel and
under the water (the mokoro's poler kept clear), the experience timeline
over the dark espresso, "Let's Connect" on the left beside the macaw on its
branch, with the morpho below it.

The Explorer is shown in the field rather than behind a dialog: each of its
four capabilities stands beside two of the app's screens in phones with a
dark bezel and a gold hairline — the one that does it in front, another
one behind it in shade — the words at the edge of the screen like every
other block, the phones toward the film (on a phone: the words, then the
screens below them). Either phone can be brought to the front by clicking
or tapping it (or with the keyboard: they are buttons); the other slides
back, and the caption names the one in front. How it is built (the three groups of the former
dialog) and its stack follow, one group at a time.

While its film plays, a small map in the corner (250 px, less on short
screens) walks the expedition
(`ExplorerMap.tsx`, wide screens only): an almost transparent topographic
map (a generated contour tile, `public/explorer/topography.svg`, 8 KB
compressed), the planned route dotted, the walked track in red with the
walker pulsing at its head, and a waypoint for every capability that lights
up once passed and takes you to it. The walk follows the film's time, so it
moves with the scroll and back.

Every film has one small thing of its own, in the same language — gold
hairlines, a red walker that moves with the film:

| Film     | Signature                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chase    | Whenever a block of the jungle scenes comes in — the introduction, About, its story, and the invitation at the end — two or three morphos of different sizes, blue on both sides of the wing like the film's, fade in from the edges of the screen and settle on it: on top of its heading, a button or the story card, or on the side of a button or the card, each time somewhere else, like the old portfolio's pixel bird; never more than five at once. A pointer close by startles one up for a moment, and they fly off when the block goes (`overlays/butterflies.ts`, drawn above the content). |
| Neural   | The pointer is a probe that reads the film's neurons (`overlays/neuralProbe.ts`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Explorer | The expedition map in the corner (`ExplorerMap.tsx`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Work     | The office's dial in the corner (`CareerDial.tsx`), in the map's language: the film's parts round it — the experience, the work projects, the skills and the tools — walked in red as the film plays, each lit once passed and taking you to it, and the one you are in named in the middle. Inside, the career: the events of the experience timeline's open tab (its highlights, or all of it), evenly spaced and oldest first, from the first one's year round to this one; each tells its story beside the timeline, and the one told is lit.                                                        |
| Ending   | The morphos settle on the invitation and its buttons (see Chase).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

The corner instruments show on wide screens only (at least 1100 × 680).

The question in the pupil (`PortalTitle`) is not there while the pupil is
still a circle. It comes in once the pupil covers the whole screen — the
moment is computed for the screen's size and shape (`pupilCoverTime`: a
portrait phone is covered before a wide desktop) — above the film's first
spark, sliding down into place as it fades in, holds while the neuron grows
below it, and passes the camera. It keeps its place in
the document (reading order, search) but is drawn fixed to the screen like
the films, so it never has to follow the page's scrolling and undo it: it
cannot lag or shake. Its anchor above it carries the `#projects` id for
links and the scroll spy.

| Stage    | Content (all existing copy and links)                                                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chase    | Greeting (cover), introduction and About over the path, the morpho and the macaw crossing behind them.                                                                |
| Neural   | The research question (inside the pupil, then full size), title and summary, case study, method, stack, repo link.                                                    |
| Explorer | Title and summary; the four capabilities, each beside two app screens; how it is built, one group at a time, and the stack; the map in the corner.                    |
| Work     | Experience timeline (tabs; the chosen role's story beside it on wider screens, in a dialog on phones), the four work projects with their links, the full skills list. |
| Ending   | "Let's Connect" with email, LinkedIn and GitHub, fading in like every other block; the footer follows.                                                                |

## Interface

Everything that is not the films speaks the films' language (`colors.ts`,
`theme.tsx`): cream text (#f6f1e4) and muted cream for secondary text, gold
accents and hairlines (#d9c89a, #e9dcb3), and dark forest-shade glass
surfaces — translucent, blurred, with a gold hairline — so the films show
through the navigation, the cards, the dialogs, the menu and the footer —
and the content's veil is the same glass without its edges. The office
film's three chapters are headed alike (Professional Highlights, Work
projects, Skills & Tools), and body copy is set a little heavier (Inter 450) to hold over moving pictures.
Buttons are glass pills with a gold hairline and gold icons, tinted gold on
hover; the language switch is a small segmented pill; focus rings are gold.
The browser's own chrome follows (`theme-color`, `color-scheme: dark`).

On wide screens the sections are on a rail at the right edge
(`SectionRail.tsx`): a dot for each, the current one lit, on a thin gold
line that fills as the journey goes on, the dots scrolled through filled
as the line is; hovering the dots (or tabbing into
the rail) shows their names in a glass panel, and each takes you there.
Until then only the dots' column takes the pointer, so the rail's names
never cover what is beside it (the map's last waypoint sits under them).
The current section opens its own parts below its dot, grouped by project
— the Neural Decompiler (its case study and method), the Explorer (each
capability, how it is built) — and the highlights and the work projects,
the skills and the tools: sections in larger, brighter type, a project's
name in small gold capitals, its parts under it. The part on screen is lit,
and its project, as the scroll goes on (the last whose block has come up to
a third of the screen). The bar at the top keeps only who this is (the
avatar and name, back to the top), the language and the sound. On phones
the bar keeps its menu, which lists the same sections and parts: the
current section open with the part on screen lit, the others opening with
their arrow, so any part is a tap away. Both come in once the cover has
gone. The scroll spy reads a block's section from its hold
(`data-section`), since the id is on the anchor inside it.

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

Each film is downloaded whole and given to its video element as a blob URL,
so every seek lands on frames already in memory; streamed with range
requests, a phone browser would fetch a seek's bytes only when asked and the
picture would stall while the visitor scrolls. Until a film is ready its
still stands in — for the chase, the still nearest before the scroll's time
(the path, the macaw's head, the eye), so a jump never shows a frame from
elsewhere in the film.

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

The same story, about 10 % less scroll per stage. The scroll clock's
viewport height is the large viewport (`100lvh`, measured once per resize)
and the fixed stage is exactly that tall, so nothing timed by the scroll
jumps, and the films do not resize, while a phone's toolbars slide in and
out. A 16:9 frame on a portrait
screen shows about its middle third, so each film has focus keyframes
(`focus`, object-position over film time) — the chase's follow the morpho,
the macaw and its eye, the ending's the macaw onto its branch and the morpho
to its leaf, measured in every frame — and the portal maps frame coordinates
through the same crop.

A portrait screen shows only a slice of each frame, much enlarged, so
phones need the full-HD films as much as wide screens do — but those take
long to arrive over a mobile connection (the chase alone is 5.9 MB). So a
phone first loads a film's light encode, which arrives fast, and once it
and its neighbours can show their frames, downloads the full-HD one of the
film being watched into a second video element in the background, drives it
with the film, and when it shows the same frame fades it in over the light
one, which is let go (`upgrade` in `FilmLayer.tsx`). One at a time; a
download for a film the visitor has left gives way. Saved data, 2G/3G and
very small memories stay with the light encodes.

## Reduced motion

Each stage shows its still instead of the film (no video is downloaded),
stills switch where a section's top crosses the middle of the screen, the
question is an ordinary block, spaces shrink to 12vh, and the page is about
13 viewport heights.

## Verification (September 2026, headless Chrome with H.264)

- `tsc -b`, `eslint`, `prettier`, `vite build`: clean.
- Every seam and the whole page shot at 1440×900 and 390×844, forward and
  backward, and with reduced motion; the first scene swept every 0.3
  viewport heights on both; the navigation, both dialogs and the menu shot
  on both.
- The question in the pupil, scrolled through the eye in 0.02 s steps at
  1440×900, 390×844 and 2560×1080: never visible before the pupil covers the
  screen (7.91, 7.76 and 7.91 s of the chase); while it moves its centre
  departs from a smooth path by under 0.6 px per frame.
- Oscillating slowly and quickly across the five film boundaries (pupil
  hand-off, white, black, leaf, the ending's own dissolve): 324 frames each,
  both viewports, no frame in which the films did not fully cover the stage.
- The leaf seam swept at 1440×900 and 390×844: no double edges while the
  leaves dissolve, and no dark rim from the blur at the screen's edges.
- Scripting per animation frame while scrolling (including the style and
  layout that the test's own scrolling forces): desktop p50 0.4–0.9 ms, p99
  up to 5.2 ms from a few frames at the pupil and the experience timeline —
  as before this round; phone emulation at 4× CPU p50 up to 0.5 ms, p99 up
  to 2.9 ms, 1.2 ms through the first scene; no long tasks. Traces of steady
  scrolls show no dropped frames; on the phone the main thread does about
  11–16 % more than before the veil, because a leaving block's parts are
  repainted as they fade instead of the whole block fading on the
  compositor.
- Reload in the eye, in the Explorer and in the work section returns to the
  same scroll position and film time; `#skills` from a fresh load lands on
  Skills.
- Every block held (none too tall for the screen) at 1440×900, 1280×720
  and 390×844, in English and in Finnish; at 360×640 About's words, the
  first group of how the Explorer is built and the experience timeline
  scroll instead. Every navigation link lands mid-hold, with its block in
  place and fully visible.
- Phone playback, in Chrome's phone emulation (Pixel 7: Android user agent,
  touch, the light encodes) with GPU compositing (Chrome for Testing's
  headless shell on ANGLE/Metal: on battery Chrome itself caps rendering at
  30 fps, and without a GPU the software compositor dominates), from a cold
  load over a throttled 4G connection (9 Mb/s, 60 ms), steady scrolls
  through the first scene, the eye, the Explorer and the office: at 4× and
  6× CPU slowdown p95 frame 18.5 ms, no frame over 25 ms in most ranges;
  one run showed a single long frame (0.57 s at 4×) as the Explorer's film
  arrived mid-scroll, which a traced run of the same moment did not
  reproduce. The film on screen trails the scroll's target by about 3 of its
  frames (p50; p95 4–5 at reading speed, about 12 when flicking at 2
  viewport heights per second) and shows 26–57 distinct film frames per
  second. On that connection the live site shows the first film's still
  1.7 s after the page starts loading, and the film itself — its whole light
  encode, 2.4 MB — about 6 s after.
- Not verified here: a real phone browser. The films' behaviour on iOS
  Safari (seeking, memory) can only be judged on a device.
