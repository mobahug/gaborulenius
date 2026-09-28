# Cinematic journey — repository and video audit (pass A)

Audit of the five delivered films and of the code that plays them, done
before changing anything. It records what the footage actually contains,
where it can be joined invisibly, and how each act should be driven. The
implementation that follows it is described in `scrollcraft-journey.md`.

## 1. Repository as found

The working tree already replaced the procedural world of commit `7b1baa7`
with five scrubbed films:

| Concern                                  | Where                                          |
| ---------------------------------------- | ---------------------------------------------- |
| Scroll clock, eased `smoothY`, one rAF   | `src/journey/scrollTimeline.ts`, `useScene.ts` |
| Film data (sources, seams, focus)        | `src/journey/film/films.ts`                    |
| Scroll → film time, opacity, transforms  | `src/journey/film/filmTimeline.ts` (pure)      |
| Scrubbing one paused `<video>`           | `src/journey/film/scrubVideo.ts`               |
| Stack of five films, loading, the portal | `src/journey/film/FilmLayer.tsx`               |
| Stage sections with timed content        | `src/journey/film/FilmSection.tsx`, `stages/*` |
| Content moving in depth                  | `src/journey/film/ZoomBlocks.tsx`              |
| Plain-DOM cover and its leaves           | `src/components/CoverSection.tsx`, `foliage/*` |

What is sound and kept: scroll is the only clock (a pure function of the
eased scroll position), seeks are coalesced, every film has a still, films
load around the viewer, portrait screens follow each film's subject, reduced
motion shows stills, and all portfolio content is semantic DOM.

What the directive asks for and the tree lacks:

- No single director: `FilmLayer` computes the timeline and the portal
  geometry privately, other systems re-derive what they need. There is no
  journey/chapter/transition progress, direction, velocity or device tier in
  one place.
- Every act is scrubbed the same way; nothing plays, holds or bridges.
- Seams C–E are plain cross-fades of ±0.05–0.15 viewport heights, and seam B
  is a masked window. Nothing rendered by the browser carries a seam; nothing
  crosses between the film and the page.
- The scrub encodes still carry B-frames and a 1.25 s keyframe interval.

## 2. Source films

All five were delivered as `~/Downloads/<name>.mp4` (the neural file is
spelled `neural_decomplier.mp4`). They are identical in format:

| Property       | Value (all five)                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------- |
| Duration       | 8.042 s (193 frames)                                                                              |
| Frame rate     | 24 fps, constant                                                                                  |
| Dimensions     | 864 × 496 (16:9.2), no audio track                                                                |
| Codec          | H.264 High, level 3.1, CABAC; no colour tags                                                      |
| Keyframes      | chase 1, 64 · neural 1, 186 · explorer 1, 113, 192 · work 1 · ending 1                            |
| B-frames       | 116–149 of 193 samples reordered                                                                  |
| `moov`         | at the end of the file (not fast-start)                                                           |
| Bitrate / size | chase 7.9 Mb/s 7.9 MB · neural 5.4 / 5.4 · explorer 9.2 / 9.3 · work 5.6 / 5.7 · ending 5.4 / 5.4 |

The originals cannot be scrubbed: in Chromium a seek into the chase original
kept presenting the same frame (measured: eight seeks across the clip, one
identical frame), and every seek has to decode from frame 1.

### Shot breakdown

Motion figures come from a global pan/zoom estimate between consecutive
frames (`zoom` is the forward push per frame).

**jungle_chase** — warm jungle, low sun through haze, deep depth.

| Time      | Picture                                                                | Camera                      |
| --------- | ---------------------------------------------------------------------- | --------------------------- |
| 0–1.5 s   | Path into the jungle, light shafts, a small blue butterfly appears     | Slow dolly forward (≈2 %/f) |
| 1.5–2.5 s | Camera leaves the path after the butterfly                             | Pan right, speeding up      |
| 2.5–4.4 s | Through foliage; a dark trunk wipes across at 3.3–3.7 s                | Fast lateral travel         |
| 4.5–5.8 s | A scarlet macaw appears far away and flies at the camera               | Forward, macaw growing      |
| 5.8–6.5 s | Wings spread, the macaw fills the frame                                | Forward, fastest (≈14 %/f)  |
| 6.5–7.0 s | Head, then the eye                                                     | Push toward the eye         |
| 7.0–7.9 s | Iris (radial amber fibres) and pupil grow until the pupil is the frame | Dolly into the pupil        |
| 8.0 s     | Black                                                                  | —                           |

**neural_decomplier** — black void, blue nebula, amber light.

| Time      | Picture                                                                      | Camera                     |
| --------- | ---------------------------------------------------------------------------- | -------------------------- |
| 0–0.6 s   | Void with a faint nebula; one spark at the exact frame centre (0.498, 0.498) | Static                     |
| 0.6–2.5 s | The spark grows amber dendrites with bright tips — a neuron                  | Near static, slow approach |
| 2.5–3.5 s | The network widens                                                           | Slow push                  |
| 3.5–5.7 s | Flight along an axon toward a bright node                                    | Fast lateral travel        |
| 5.7–7.2 s | Turn; a ringed node ahead                                                    | Forward                    |
| 7.2–7.8 s | The node becomes a tunnel of concentric, segmented rings                     | Fast push                  |
| 7.9–8.0 s | Neutral white (252, 252, 250)                                                | —                          |

**the_explorer** — Okavango Delta, golden hour.

| Time      | Picture                                                       | Camera                 |
| --------- | ------------------------------------------------------------- | ---------------------- |
| 0–0.3 s   | Cream white (255, 240, 213) opening onto the delta from above | —                      |
| 0.3–2.3 s | Aerial: channels and grass islands, map-like                  | Forward and down       |
| 2.3–3.8 s | Skimming a channel, passing a mokoro and its poler            | Fast forward (≈11 %/f) |
| 4.2–4.5 s | Plunge into the water (splash)                                | Down                   |
| 4.6–6.8 s | Underwater among reeds, sun rays, a fish in the distance      | Slow forward           |
| 6.8–7.8 s | The fish swims at the camera, mouth open, and swallows it     | Forward                |
| 7.9–8.0 s | Black                                                         | —                      |

**work_history** — modern office over a city, soft daylight.

| Time      | Picture                                                         | Camera               |
| --------- | --------------------------------------------------------------- | -------------------- |
| 0–0.4 s   | Black                                                           | —                    |
| 0.4–1.8 s | A drop's ripple on dark espresso, one specular highlight        | Macro, slow          |
| 1.8–3.3 s | Pull back: cup, saucer, desk, laptop                            | Dolly out and up     |
| 3.3–5.7 s | Arc across the desk: laptop with code, city windows, a monstera | Lateral arc          |
| 5.7–7.0 s | Toward the plant by the pillar                                  | Truck and push       |
| 7.0–8.0 s | Into one monstera leaf until it fills the frame (69, 77, 42)    | Push (up to ≈14 %/f) |

**ending** — the jungle again, warm backlight.

| Time       | Picture                                                                                                  | Camera                    |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| 0–0.9 s    | The same monstera leaf (72, 75, 44), pushing along the midrib into blur; dark band along the bottom edge | Push                      |
| 0.92–1.0 s | Built-in two-frame dissolve from the blur to a sharp jungle shot                                         | — (a cut inside the file) |
| 1.0–3.3 s  | Through dense monstera leaves                                                                            | Fast push                 |
| 3.3–4.2 s  | Out into a clearing with light shafts and a branch                                                       | Decelerating              |
| 4.2–6.0 s  | A macaw flies in and lands; an orange butterfly arrives                                                  | Static                    |
| 6.0–8.0 s  | The macaw perched, the butterfly settling on a leaf                                                      | Static                    |

## 3. Scrub encoding

Chromium, 864×496, each figure the time from setting `currentTime` to a
decoded frame being drawable (seek + `drawImage`), 190 forward single-frame
steps, 190 backward, 80 random, 30 long jumps:

| File                                   | Size   | Forward p50/p90     | Backward p50/p90 | Random p50/p90 |
| -------------------------------------- | ------ | ------------------- | ---------------- | -------------- |
| Original                               | 7.9 MB | frame never changes | —                | —              |
| Current `avconvert`, GOP ≈30, B-frames | 3.5 MB | 13.0 / 17.0 ms      | 13.0 / 17.1 ms   | 13.2 / 18.6 ms |
| GOP 12, no B-frames, 2.5 Mb/s          | 2.5 MB | 7.0 / 10.6 ms       | 7.4 / 10.9 ms    | 7.4 / 11.2 ms  |
| **GOP 8, no B-frames, 2.5 Mb/s**       | 2.5 MB | 6.5 / 8.9 ms        | 6.3 / 8.1 ms     | 6.5 / 8.5 ms   |
| GOP 6, no B-frames, 2.5 Mb/s           | 2.5 MB | 6.2 / 7.4 ms        | 6.2 / 7.4 ms     | 6.6 / 7.4 ms   |

Chosen: keyframe every 8 frames (⅓ s), no frame reordering, fast-start,
BT.709 tags, per-film bitrate (chase 2.6, neural 2.5, explorer 3.3, work 2.5,
ending 3.0 Mb/s) — together about 14 MB instead of 17.5 MB. Luma PSNR against
the originals: 42.9–47.8 dB mean; dark gradients (the neural void at 5×
gain) and the fastest motion (explorer 3.9 s) show no visible difference
from the current encodes. All-intra was not needed: below a GOP of 8 the
seek time stops improving while the size grows.

FFmpeg is not installed on this machine; the encodes are made with
AVFoundation/VideoToolbox (`AVAssetWriter`, `AVVideoMaxKeyFrameIntervalKey`,
`AVVideoAllowFrameReorderingKey = false`, `shouldOptimizeForNetworkUse`).
The originals are not modified or shipped.

## 4. Transition score

| From → To             | Exit visual                                                                        | Entry visual                                                                    | Camera continuity                                                                       | Concealment opportunity                                                   | Browser bridge                                                                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jungle chase → Neural | Dolly into the macaw's eye; amber radial iris fibres around a growing pupil; black | Black void, blue nebula, one spark at the centre growing amber radial dendrites | Forward push ends fast; neural opens static — the depth of the window carries the speed | The pupil itself (black = void), the macaw filling the frame at 5.8–6.9 s | Keyed macaw flies in front of the page; iris fibres fire signals inward, which cross the pupil into the void, converge on the spark and hand over to the film's dendrites                   |
| Neural → Explorer     | Ring tunnel, concentric segmented rings, white-out (cool white)                    | Cream white (warmer by ~17/255), then the delta from above                      | Both forward; white hides the change of scale                                           | 0.1 s of pure white on each side                                          | The rings keep expanding as topographic contour lines on the cream, a GPS trail and waypoints draw across them, the map tilts onto the ground plane and dissolves into the delta's channels |
| Explorer → Work       | Fish swallows the camera; black                                                    | Black, then a drop's ripple on espresso                                         | Forward into black, then static macro                                                   | 0.1 s + 0.4 s of pure black                                               | In the dark, one warm drop falls; where it lands ripple rings open, and the espresso's own ripple takes over — water becomes coffee                                                         |
| Work → Ending         | Push into a monstera leaf in the office                                            | The same leaf, closer and lower, pushing on                                     | Same direction and speed, same leaf                                                     | Nearly identical frames (mean difference 12 → 5.6 after alignment)        | Keep the alignment; hide the file's own dissolve at 0.92 s with a rack focus and a dark leaf crossing the lens                                                                              |

## 5. Playback per act

| Act                                          | Strategy                                                           | Why                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Cover + introduction (chase 0–1.1 s)         | Eased scrub, slow (0.35 s per viewport)                            | A walk forward under the greeting; the cover's own layers carry the motion             |
| About (chase 1.1–6.0 s)                      | Eased scrub                                                        | The butterfly, the camera following it and the macaw's arrival are beats to read along |
| The eye (chase 6.0–8.0 s + neural 0.4–1.3 s) | Scrub with a portal and a procedural bridge                        | The signature move; must reverse exactly                                               |
| Neural 1.3–7.6 s                             | Eased scrub                                                        | Flight through the network under the research content                                  |
| Neural → Explorer                            | Hold + bridge (outgoing held on white, incoming on cream)          | White is a hold, not a motion; the bridge draws the map                                |
| Explorer 0–7.8 s                             | Eased scrub                                                        | Continuous flight; the splash is an event to scrub through                             |
| Explorer → Work                              | Hold + bridge (black)                                              | Black is a hold; the drop is drawn by the browser                                      |
| Work 0.4–8.0 s                               | Eased scrub (the black first 0.4 s is skipped)                     | The pull-back and arc follow the experience content                                    |
| Ending 0–6.3 s                               | Eased scrub, bridge inside 0.8–1.2 s                               | Continues the leaf push, through the jungle to the clearing                            |
| Ending 6.3–8.0 s                             | Plays at authored speed once reached, scrubs again on the way back | Static camera: the butterfly settling is life, not a camera move; the page ends here   |

## 6. Browser constraints and risks

- 864×496 is the ceiling: on a 1440p screen the films are upscaled ~2.9×.
  Nothing should draw attention to texture detail; the procedural layers
  are drawn at screen resolution and carry the fine detail instead.
- A portrait phone shows the middle ~30 % of a frame; every bridge must map
  frame coordinates through the same cover crop and focus as the video.
- Mobile Safari decodes each `<video>` separately: at most three films are
  loaded at once, the previous one kept for reversals, the one after next
  never.
- Full-screen Canvas 2D and WebGL layers cost fill rate on phones: they run
  only inside their bridge windows, capped at DPR 1.5 (1 on low tier), and
  are cleared and hidden outside them.
- CSS `filter: blur()` on a full-screen video is expensive; used only for the
  ending's short rack focus.
- The keyed macaw needs the chase video as a WebGL texture: same-origin
  files, uploaded only when a new frame has been presented.
- Hidden panes and background tabs suspend video decoding; the director
  must never wait on a video to advance its own state.

## 7. Revision after review

The browser bridges in the transition score (the iris's light running into
the neuron, the contour map with the GPS trail, the falling drop, the dark
leaf passing the lens with a rack focus) and the velocity-driven camera
push were built, reviewed, and removed: the films join well enough on their
own shared frames, and the extra layers competed with them. The seams are
back to the footage's own joins — the pupil as a window, white into cream,
black into black, leaf onto leaf — as described in `scrollcraft-journey.md`.
The ending no longer plays its last seconds at authored speed; like every
other act it follows the scroll, and "Let's Connect" fades in with the page
instead of zooming toward the camera. What stays from the browser: the
macaw keyed out of the chase and flying in front of About, and the probe
that reads the neural film's neurons under the pointer.

## 8. Full-HD footage (September 2026)

The five films were delivered again at full HD and re-generated rather than
upscaled, so their timing and framing changed and were measured again:

| Film     | File                              | Format                                    |
| -------- | --------------------------------- | ----------------------------------------- |
| Chase    | `jungle_chase_seedance_2.5.mp4`   | 1920×1080 HEVC, 24 fps, 193 frames, audio |
| Neural   | `neural_decomplier_full_hd.mp4`   | 1880×1080 H.264, 30 fps, 240 frames       |
| Explorer | `the_explorer_full_hd.mp4`        | 1880×1080 H.264, 30 fps, 240 frames       |
| Work     | `work_history_full_hd.mp4`        | 1880×1080 H.264, 30 fps, 239 frames       |
| Ending   | `ending_seedance_2.5_full_hd.mp4` | 1922×1080 H.264, 30 fps, 239 frames       |

- The chase is a new take: a morpho flies at the camera (1.5–1.7 s) and
  away down the path, the macaw crosses the clearing from 3.7 s, turns to
  the camera at 5.6 s and the camera dives into its eye from 6.2 s. Its
  pupil was tracked again in every frame (circle fit to the dark disc) and
  followed past the frame's edges as it overflows (7.7–8 s). Cut to 47:27
  so every film shares one frame shape.
- The other four keep their beats and seams (white node → cream sky, fish
  mouth → black → espresso, office leaf → jungle leaf); their cue times
  still land on the same moments.
- The ending is a new take too (it replaced `ending_full_hd.mp4`): the same
  monstera leaf, 1.306 times closer than the office film's last frame,
  pushes along the midrib into jungle foliage, a clearing opens, the macaw
  flies in and lands on a branch on the right (3.9–5.8 s) and a morpho
  settles on a leaf beside it (5.8–7 s). The leaf join was fitted again.
- Each film now has a full-HD and a light scrub encode, stills at 1128×648,
  and a new brightness curve.
- The macaw no longer flies in front of the page: every overlay drawing the
  footage over the content was removed, and content always stays in front
  of the films.

## 9. The leaf, and reading over the films (September 2026)

- The two leaves of the work → ending seam are different plants: when the
  jungle leaf dissolved in over the office leaf, their holes showed double
  edges and the green shifted. The seam is now softened: the office leaf
  goes out of focus as the camera closes in, the jungle leaf arrives just
  as soft, and it only sharpens where its own shot defocuses into the
  jungle (see `soften` in `films.ts`), so the two melt into one another.
- Text was hard to read wherever the footage is bright or busy behind it —
  the neural filaments, the reflections on the Okavango, the office window.
  The local shade behind each block became a veil in the films' own
  language: behind the words the film goes out of focus and a little
  darker, feathered into the picture (see "Content over the films" in
  `scrollcraft-journey.md`).

## 10. The Explorer in the field (September 2026)

The Explorer's screens, its fuller description and its stack were behind a
"View details" dialog. They are now part of its film: each capability
beside the app screen that does it, then how it is built, then the rest of
the app's screens in a strip, timed to the channel, the mokoro, the water
and the fish (see "Content over the films" in `scrollcraft-journey.md`).
The dialog, its carousel and its capability grid were removed.

Along the Explorer runs its expedition route: a planned route over a faint
topographic map and the recorded track in red, walked as the page scrolls,
through a waypoint at every capability — the same idea as the experience
timeline's trail, in the Explorer's own language (its app draws GPS trails
on topographic maps).

Measuring on a phone profile with GPU compositing showed the page restyling
all of its ~840 elements whenever the veils' shade changed, a few times per
stage (4–5 ms each on a mid-range phone): the shade is now set on the
blocks and not inherited.

## 11. Content that holds still (September 2026)

With the content scrolling over the films, every block crossed the screen
like a credit roll while the film moved behind it: two motions at once. Now
every block stands still where it appears — it fades in, holds while the
film plays, and fades out — so the film is the only thing that moves. The
content was cut into beats that fit a phone's screen. The Explorer's route
through the page could not follow content that stands still; it became a
small map in the corner, and the strip of small screens became a second
screen behind each capability's first.

## 12. Phones, colour and finding your way (September 2026)

- Phones: the blocks shook under a touch fling, because the script held a
  fading block in place against the phone's own scrolling; it no longer
  does. The films looked soft because phones got the light encodes while
  showing only a slice of each frame; they now move to full HD in the
  background once the light encode is on screen.
- Colour: the chase is graded richer, and the cover's leaves vivid lime.
- The morphos that land on the jungle scenes' blocks are all the film's
  blue morpho, two or three at a time in different sizes, somewhere else
  each time.
- A section rail at the right edge takes the navigation's links; the bar at
  the top keeps the name, the language and the sound.

## 13. Longer holds, the pupil and the leaves' look (September 2026)

- Blocks stay on screen longer: every hold is a fifth longer (three tenths
  on phones), a block shows from 3 % to 90 % of its hold, and the fades are
  1.2 s (0.8 s on touch screens, so a quick flick does not outrun them).
- The pupil: the neural film was held back by the chase's full-HD video,
  which lay over it (its z-index escaped its film); each film now keeps its
  videos to itself. The spark and its nebula fade in inside the pupil from
  the moment it opens and grow with it (the window film is framed with the
  pupil, `depth` 1), so the network no longer appears all at once when the
  eye fills the screen.
- Butterflies: always blue on both sides of the wing, with veins, the black
  margin and its white spots; they land on the tops and the sides of the
  blocks, buttons and the About card. The butterfly that followed the
  cursor is gone; the ones that land still fly off from a hovering pointer.
- Finding your way: the rail opens the current section's parts (the Neural
  Decompiler's case study and method, each capability of the Explorer, the
  highlights and work projects, skills and tools), lit as they come by; the
  Explorer map's waypoints and the career dial's roles take you to them.
- The experience: on wider screens the chosen role's story is told beside
  the timeline (a role on the career dial chooses it too); phones keep the
  dialog. The timeline keeps its height on either tab — a longer list
  scrolls inside it — so switching tabs no longer moves the page.
- Phones get the full-HD films first unless the connection is slow; the
  light encodes are for slow connections, which still move up to full HD.
- The cover's leaves are graded into the film's look (tools/leaves/
  filmlook.js): their colours moved toward the film's around each, the
  film's haze and glow, depth of field (the near ones softest) and grain.
- Let's Connect no longer shows the time in Espoo.

## 14. Finding your way, tidied (September 2026)

- The rail groups a section's parts by project (small gold capitals for the
  Neural Decompiler and the Explorer, their parts under them), with the
  sections in larger, brighter type; a lit dot's glow is no longer cut at
  the rail's side. Only the dots take the pointer until the rail opens, so
  the Explorer map's last waypoint, under the rail's names, can be clicked.
- The office's dial shows the film's parts like the map (experience, work
  projects, skills, tools: lit as passed, each a way there, the current one
  named in the middle); the career's years and roles stay inside it, the
  role whose story is told lit.
- The chosen role in the timeline has its gold edge on the side of its
  story.
- The phone's menu lists the parts too, grouped the same way, the current
  section open.
- A link card whose picture cannot be loaded shows only its words (Hive's
  picture had gone from its host).
- Follow-up: the rail's dots are filled once scrolled through, as its line
  is; the dial's career follows the timeline's open tab (its highlights or
  all of it, evenly spaced, oldest first); phones show the banana leaf at
  the top left too.

## 15. The story, chips and steady wings (September 2026)

- The career story is no longer a lone card on the right: it is told the
  way the greeting is — "My story", its title large, a line about it, the
  way to read it, and the author's portrait with the reading time and date
  — in a narrow column that leaves the film's morpho clear beside it.
  Chapter titles share one large size (Work projects and Skills & Tools
  were smaller).
- Tools, skills and technologies are chips, each on its own shade so it
  reads over the films, lit when pointed at.
- The morphos no longer seem to blink: at the top of a beat a wing stays a
  third open and a deeper blue, instead of a dark sliver.

## 16. Phones' full height, and a loader (September 2026)

- On a phone with its toolbars hidden, the cover's leaves were cut off
  above the bottom of the screen: the cover was as tall as the small
  viewport, the films behind it as tall as the large one. The cover is now
  as tall as the large viewport too.
- The first paint is a loader instead of a plain green screen: a morpho
  over the jungle's greens and a gold ring that fills with the first film's
  real download, leaving once that film plays (5.5 s at the most, or at a
  tap or a scroll), the morpho flying up as the jungle opens. It is there
  from the first paint (nothing shows through it before) and goes quickly
  for a visit from the cache.
- The cover's blurred placeholder was a tiny picture of the macaw's eye,
  which a hard reload showed first; it is now the path, the chase's first
  frame.

## 17. Smoother films on phones (September 2026)

- A scrubbed film is as smooth as its seeks are fast. Phones held upright
  had been decoding the whole full-HD frame to show a third of it; on a
  phone-like decoder that meant about 23 new frames a second while
  scrolling, with 50–70 ms seeks now and then.
- They now get portrait encodes (`public/film/portrait/`): the 640×1080
  window of the frame they show, following each film's focus, as sharp as
  full HD, a third of the size (about 12 MB for all five), seeking in
  8–9 ms. On the phone profile: 33 film frames a second while scrolling,
  over 4G too (9 before, while the full-HD chase was still arriving), and
  no frame over 34 ms (815 ms before).
- The full-HD films have a keyframe every 4 frames instead of 8 (15 %
  larger, seeks about a quarter faster).
- `?debug=film` shows how the film on screen is doing, on the device.
- The encodes are made by `tools/film/encode-films.mjs` from the masters.
- On a real Android phone the panel showed why phones stayed uneven: a seek
  takes 40–80 ms there even in the portrait window (13–20 new frames a
  second), while the page ran at 64–94 fps with no frames dropped. So on
  phones the film now plays while the scroll moves forward — at the
  scroll's speed, catching up on any gap — and seeks only backward, at rest
  and on jumps.
