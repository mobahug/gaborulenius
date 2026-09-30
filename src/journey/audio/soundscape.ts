import { onDirectorFrame, type DirectorFrame } from "../director/director";
import { filmIndex } from "../film/films";
import { smoothstep } from "../math";
import { requestSceneFrame } from "../scrollTimeline";
import { assetUrl } from "../../utils/assets";

/*
 * The films' sound, when the visitor turns it on. Each scene has its own —
 * the jungle's music, a deep space score for the neural network, the
 * Okavango's birds above the water and its murmur under it, the office's
 * room — all as loud as one another. A scene's sound fades in once the
 * visitor has stayed on it for half a second; scrolling fast, or on to the
 * next scene, fades it out, and the next scene's sound fades in once the
 * page rests there. Skimming through the whole journey stays quiet.
 *
 * Each track streams from an <audio> element (so a phone never holds whole
 * decoded tracks in memory) through a gain of its own in one AudioContext
 * (the only way to set a volume on iOS). Nothing loads or plays until the
 * sound is turned on.
 */

export type TrackId = "jungle" | "neural" | "wetland" | "underwater" | "office";

/**
 * Each sound, and the gain that brings it to the jungle's loudness
 * (measured by tools/audio/encode-sounds.mjs; the loudest peak after its
 * gain, the office's, is −1 dBFS).
 */
const TRACKS: Record<TrackId, { file: string; gain: number }> = {
  jungle: { file: "audio/jungle.m4a", gain: 1 },
  neural: { file: "audio/neural.m4a", gain: 0.17 },
  wetland: { file: "audio/wetland.m4a", gain: 2.89 },
  underwater: { file: "audio/underwater.m4a", gain: 0.27 },
  office: { file: "audio/office.m4a", gain: 5.39 },
};
const TRACK_IDS = Object.keys(TRACKS) as TrackId[];

/** The Explorer's camera is under the water from this time of its film (s). */
const UNDER_WATER = 4.4;
/** A scene's sound starts once the page has stayed on it this long (s). */
const DWELL = 0.5;
/** From silence to full, and back (s). */
const FADE_IN = 2;
const FADE_OUT = 1.2;
/** Faster than this, in screens a second, the page is passing through. */
const FAST = 1.5;
/** How long the scroll's speed is averaged over (s). */
const SPEED_SMOOTHING = 0.5;
/**
 * No scroll counts as faster than this, so a page turned with the keyboard
 * or a flick of the finger (a screen in a third of a second) is not passing
 * through, nor is a jump (a link, the scroll bar).
 */
const SPEED_CAP = 3;
/** How often the sound follows the page (ms). */
const TICK_MS = 40;
/** A track silent this long stops playing (ms). */
const REST_MS = 2500;

type Levels = Record<TrackId, number>;

const silence = (): Levels => ({
  jungle: 0,
  neural: 0,
  wetland: 0,
  underwater: 0,
  office: 0,
});

/**
 * The sound of what is on screen: the film, or across a seam the one that
 * shows the most; in the Explorer, above or under the water.
 */
export const sceneAt = (
  frame: Pick<
    DirectorFrame,
    "activeChapter" | "transition" | "stage" | "timeline"
  >,
): TrackId => {
  const seam = frame.transition;
  const film = seam
    ? seam.progress < 0.5
      ? seam.from
      : seam.to
    : frame.activeChapter;
  switch (film) {
    case "neural":
      return "neural";
    case "explorer": {
      const index = filmIndex(film);
      const time =
        frame.stage.presented[index] ?? frame.timeline.films[index]?.time ?? 0;
      return time < UNDER_WATER ? "wetland" : "underwater";
    }
    case "work":
      return "office";
    default:
      return "jungle";
  }
};

/**
 * When each sound plays, apart from the Web Audio that plays it: the
 * scene's sound fades in once the page has stayed on it, calm, for DWELL;
 * every other sound fades out.
 */
export class Mixer {
  private scene: TrackId | null = null;
  /** Since when the page has been calm on its scene (ms). */
  private restingSince = 0;
  private speed = 0;
  private y: number | null = null;
  private last: number | null = null;
  private readonly progress = silence();

  /** The scene whose sound is about to play, while the page is calm. */
  get upcoming() {
    return this.speed > FAST ? null : this.scene;
  }

  /**
   * Starts at `now` as if the page had stayed there already: the visitor
   * has just asked for the sound.
   */
  start(now: number) {
    this.scene = null;
    this.restingSince = now - DWELL * 1000;
    this.speed = 0;
    this.y = null;
    this.last = null;
  }

  /** Every sound silent, as it is once the sound has been turned off. */
  hush() {
    TRACK_IDS.forEach((id) => (this.progress[id] = 0));
  }

  /** The scene on screen, from the director. */
  see(scene: TrackId, now: number) {
    if (scene === this.scene) return;
    // The first scene seen after starting is where the visitor already is.
    if (this.scene !== null) this.restingSince = now;
    this.scene = scene;
  }

  /** Advances to `now`, the page scrolled to `y`: each sound's level, 0–1. */
  step(now: number, y: number, screen: number): Levels {
    const dt = this.last === null ? 0 : Math.min(1, (now - this.last) / 1000);
    if (this.y !== null && dt > 0) {
      const instant = Math.min(SPEED_CAP, Math.abs(y - this.y) / screen / dt);
      this.speed +=
        (instant - this.speed) * (1 - Math.exp(-dt / SPEED_SMOOTHING));
    }
    this.last = now;
    this.y = y;
    const passing = this.speed > FAST;
    if (passing) this.restingSince = now;
    const settled = now - this.restingSince >= DWELL * 1000;
    const levels = silence();
    TRACK_IDS.forEach((id) => {
      // A sound still fading out comes back as soon as the page slows
      // down; a silent one waits for the visitor to stay.
      const rising =
        id === this.scene && !passing && (settled || this.progress[id] > 0);
      const progress =
        this.progress[id] + (rising ? dt / FADE_IN : -dt / FADE_OUT);
      this.progress[id] = Math.min(1, Math.max(0, progress));
      // Eased at both ends, and squared: even to the ear, with no edge.
      const eased = smoothstep(0, 1, this.progress[id]);
      levels[id] = eased * eased;
    });
    return levels;
  }
}

type Voice = {
  element: HTMLAudioElement;
  gain: GainNode;
  /** The gain it was last sent toward. */
  aim: number;
  /** Playing, or about to. */
  wanted: boolean;
  silentSince: number | null;
};

export class Soundscape {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private readonly voices = new Map<TrackId, Voice>();
  private readonly mixer = new Mixer();
  private stopWatching: (() => void) | null = null;
  private ticker = 0;
  private lastTick = 0;
  private suspendTimer = 0;

  get playing() {
    return this.stopWatching !== null;
  }

  /**
   * Turns the sound on. Call it from the click that asks for it: browsers
   * (iOS above all) let sound start only from a gesture, so every track is
   * readied here once, and may then play whenever the visitor reaches it.
   */
  play() {
    if (this.playing) return;
    const context = (this.context ??= new AudioContext());
    if (!this.master) {
      this.master = context.createGain();
      this.master.gain.value = 0;
      this.master.connect(context.destination);
    }
    window.clearTimeout(this.suspendTimer);
    // An iPhone keeps a page's Web Audio quiet under its silent switch
    // unless the page plays like a music app; the visitor asked for it.
    const session = (
      navigator as Navigator & { audioSession?: { type: string } }
    ).audioSession;
    if (session) session.type = "playback";
    void context.resume();
    TRACK_IDS.forEach((id) => {
      const voice = this.voice(id);
      if (!voice.element.paused) return;
      voice.element
        .play()
        .then(() => {
          if (!voice.wanted) voice.element.pause();
        })
        .catch(() => undefined);
    });
    // The scenes fade in by themselves; this only undoes a pause.
    this.master.gain.setTargetAtTime(1, context.currentTime, 0.05);
    this.mixer.start(performance.now());
    this.stopWatching = onDirectorFrame(
      (frame) => this.mixer.see(sceneAt(frame), frame.now),
      30,
    );
    requestSceneFrame();
    this.lastTick = performance.now();
    this.ticker = window.setInterval(() => this.tick(), TICK_MS);
  }

  /** Fades the sound out, then lets everything rest. */
  pause() {
    if (!this.playing || !this.context || !this.master) return;
    this.stopWatching?.();
    this.stopWatching = null;
    window.clearInterval(this.ticker);
    const context = this.context;
    this.master.gain.setTargetAtTime(0, context.currentTime, 0.25);
    this.suspendTimer = window.setTimeout(() => {
      this.voices.forEach((voice) => {
        voice.element.pause();
        voice.aim = 0;
        voice.wanted = false;
        voice.silentSince = null;
        voice.gain.gain.cancelScheduledValues(context.currentTime);
        voice.gain.gain.setValueAtTime(0, context.currentTime);
      });
      this.mixer.hush();
      void context.suspend();
    }, 1200);
  }

  dispose() {
    this.stopWatching?.();
    this.stopWatching = null;
    window.clearInterval(this.ticker);
    window.clearTimeout(this.suspendTimer);
    this.voices.forEach((voice) => {
      voice.element.pause();
      voice.element.removeAttribute("src");
    });
    this.voices.clear();
    void this.context?.close();
    this.context = null;
    this.master = null;
  }

  private voice(id: TrackId): Voice {
    const existing = this.voices.get(id);
    if (existing) return existing;
    const context = this.context!;
    const element = new Audio();
    element.loop = true;
    element.preload = "none";
    element.src = assetUrl(TRACKS[id].file);
    const gain = context.createGain();
    gain.gain.value = 0;
    context.createMediaElementSource(element).connect(gain);
    gain.connect(this.master!);
    const voice: Voice = {
      element,
      gain,
      aim: 0,
      wanted: false,
      silentSince: null,
    };
    this.voices.set(id, voice);
    return voice;
  }

  /** Follows the page: every sound toward its level. */
  private tick() {
    const context = this.context;
    if (!context) return;
    const now = performance.now();
    // Each step is smoothed over the time to the next (longer in a hidden
    // tab, whose timers slow down).
    const smoothing = Math.min(
      0.5,
      Math.max(0.03, (now - this.lastTick) / 1000),
    );
    this.lastTick = now;
    const levels = this.mixer.step(now, window.scrollY, window.innerHeight);
    const upcoming = this.mixer.upcoming;
    TRACK_IDS.forEach((id) => {
      const voice = this.voice(id);
      const aim = Math.round(levels[id] * TRACKS[id].gain * 1000) / 1000;
      if (aim !== voice.aim) {
        voice.aim = aim;
        voice.gain.gain.setTargetAtTime(aim, context.currentTime, smoothing);
      }
      // The sound about to start plays already, silent, so it is ready
      // when its fade begins.
      voice.wanted = aim > 0 || id === upcoming;
      if (voice.wanted) {
        voice.silentSince = null;
        if (voice.element.paused) voice.element.play().catch(() => undefined);
      } else {
        voice.silentSince ??= now;
        if (!voice.element.paused && now - voice.silentSince > REST_MS) {
          voice.element.pause();
        }
      }
    });
  }
}
