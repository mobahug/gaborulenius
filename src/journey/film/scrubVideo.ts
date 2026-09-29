/**
 * Drives one <video> to a target time. The shown time eases toward the
 * target (a few tens of milliseconds), so scrolling reads as motion rather
 * than a series of jumps; seeks are coalesced (never more than one in
 * flight), so fast scrolling cannot build up a backlog; and large jumps
 * (navigation, flicks) land immediately instead of sweeping through every
 * frame in between.
 *
 * With `playForward` (phones), while the target moves forward steadily the
 * video plays instead, at the speed the scroll asks for and catching up on
 * any gap: a phone's decoder plays smoothly but takes 40–80 ms a seek
 * (measured on an Android phone), so seeking alone showed only 13–20 new
 * frames a second. Backward, at rest and on jumps it seeks as before.
 *
 * `presentedTime` is the time of the frame actually on screen (from
 * `requestVideoFrameCallback` where available), for layers that must line
 * up with the picture.
 */

/** Time constant of the easing toward the target, in seconds. */
const EASE_SECONDS = 0.035;
/** Beyond this distance the shown time jumps straight to the target. */
const JUMP_SECONDS = 1.2;
/** Frames closer than this are not worth a seek. */
const SEEK_EPSILON = 1 / 60;
/** A first frame this close to the target is good enough to show. */
const READY_SECONDS = 0.25;
/** Playing forward: it starts once the scroll moves faster than this (film
 * seconds a second) and never plays faster than the fastest. */
const PLAY_MIN_RATE = 0.12;
const PLAY_MAX_RATE = 4;
/** Arriving, it stops playing below this rate and settles by seeking (a
 * gap of well under a frame by then). */
const PLAY_STOP_RATE = 0.08;
/** It catches up on a gap over this much time. */
const CATCH_UP_SECONDS = 0.25;
/** Time constant of the target's measured speed. */
const SPEED_SECONDS = 0.12;
/** Once the target has not moved for this long (ms) the scroll has
 * stopped: the film only closes the gap, slowing into the frame. */
const REST_MS = 100;
/** For this long (ms) after the scroll last moved one way, the picture
 * never moves the other way: one still behind it (a phone's lag) waits
 * where it is until the scroll comes back to it. */
const AGAINST_MS = 160;
/** At rest a picture that close to its target on the far side stays. */
const HOLD_SECONDS = 0.1;

type FrameCallbackVideo = HTMLVideoElement & {
  requestVideoFrameCallback?: (
    callback: (now: number, metadata: { mediaTime: number }) => void,
  ) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

export class ScrubVideo {
  readonly video: FrameCallbackVideo;
  private target = 0;
  private shown = 0;
  private presented: number | null = null;
  private lastTick = 0;
  private frame = 0;
  private frameCallback = 0;
  private smooth = true;
  private hasFrame = false;
  private seekStarted = 0;
  private playForward: boolean;
  private playing = false;
  /** How fast the target moves (film seconds a second), and its last. */
  private speed = 0;
  private lastTarget: number | null = null;
  private lastTargetAt = 0;
  /** When the target last moved, and which way (1 forward, -1 back). */
  private lastMoveAt = 0;
  private direction = 0;
  private readonly onReady: () => void;
  /** How long its latest seeks took (ms), how many frames it has put on
   * screen, and whether it plays or seeks: for the film overlay
   * (`?debug=film`). */
  readonly stats = { seeks: [] as number[], presented: 0, mode: "seek" };

  constructor(
    video: HTMLVideoElement,
    onReady: () => void = () => {},
    { playForward = false }: { playForward?: boolean } = {},
  ) {
    this.video = video;
    this.onReady = onReady;
    this.playForward = playForward;
    video.muted = true;
    video.pause();
    video.addEventListener("loadedmetadata", this.onMetadata);
    video.addEventListener("seeked", this.onFrame);
    video.addEventListener("seeked", this.onSeeked);
    video.addEventListener("loadeddata", this.onFrame);
    video.addEventListener("emptied", this.onEmptied);
    this.watchFrames();
  }

  /**
   * True once the video shows a frame near where it was asked to be, and
   * from then on until its source is released. `readyState` alone is not
   * enough: it drops during every seek, while the last frame stays on
   * screen.
   */
  get ready() {
    return this.hasFrame;
  }

  /** The time being shown (eased toward the target). */
  get shownTime() {
    return this.shown;
  }

  /** Time of the frame on screen, once there is one. */
  get presentedTime() {
    return this.hasFrame ? (this.presented ?? this.shown) : null;
  }

  /** Latest time the scroll position asks for. */
  setTarget(time: number, smooth = true) {
    const now = performance.now();
    if (this.lastTarget !== null) {
      const dt = (now - this.lastTargetAt) / 1000;
      const moved = time - this.lastTarget;
      if (Math.abs(moved) > JUMP_SECONDS) {
        // A jump, not a scroll: it has no way to hold to.
        this.speed = 0;
        this.direction = 0;
      } else {
        if (dt > 0) {
          this.speed +=
            (moved / dt - this.speed) * (1 - Math.exp(-dt / SPEED_SECONDS));
        }
        if (moved !== 0) this.direction = Math.sign(moved);
      }
      if (moved !== 0) this.lastMoveAt = now;
    }
    this.lastTarget = time;
    this.lastTargetAt = now;
    this.target = time;
    this.smooth = smooth;
    if (!this.frame) {
      this.lastTick = performance.now();
      this.tick(this.lastTick);
    }
  }

  dispose() {
    this.stopPlaying();
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (this.frameCallback) {
      this.video.cancelVideoFrameCallback?.(this.frameCallback);
    }
    this.video.removeEventListener("loadedmetadata", this.onMetadata);
    this.video.removeEventListener("seeked", this.onFrame);
    this.video.removeEventListener("seeked", this.onSeeked);
    this.video.removeEventListener("loadeddata", this.onFrame);
    this.video.removeEventListener("emptied", this.onEmptied);
  }

  private watchFrames() {
    const { video } = this;
    if (!video.requestVideoFrameCallback) return;
    const onPresented = (_now: number, metadata: { mediaTime: number }) => {
      this.presented = metadata.mediaTime;
      this.stats.presented += 1;
      this.frameCallback = video.requestVideoFrameCallback!(onPresented);
    };
    this.frameCallback = video.requestVideoFrameCallback(onPresented);
  }

  private clampTime(time: number) {
    const duration = this.video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return Math.max(0, time);
    // Never ask for the very end: some browsers show nothing there.
    return Math.min(Math.max(0, time), duration - 1 / 48);
  }

  private onMetadata = () => {
    // Ask for the first frame explicitly: some browsers (iOS Safari) decode
    // nothing for a paused video until it is seeked, even to where it is.
    if (!this.video.seeking)
      this.video.currentTime = this.clampTime(this.shown);
  };

  private onFrame = () => {
    const { video } = this;
    if (!video.requestVideoFrameCallback && !video.seeking) {
      this.presented = video.currentTime;
    }
    // The first frame after loading counts only once it is the right one,
    // so a jump never flashes the film's opening frame.
    if (
      !this.hasFrame &&
      video.readyState >= 2 &&
      Math.abs(video.currentTime - this.clampTime(this.shown)) < READY_SECONDS
    ) {
      this.hasFrame = true;
      this.presented ??= video.currentTime;
      this.onReady();
    }
    // A seek finished; if the target moved meanwhile, keep going.
    if (!this.frame) {
      this.lastTick = performance.now();
      this.tick(this.lastTick);
    }
  };

  private onSeeked = () => {
    if (!this.seekStarted) return;
    this.stats.seeks.push(performance.now() - this.seekStarted);
    if (this.stats.seeks.length > 60) this.stats.seeks.shift();
    this.seekStarted = 0;
  };

  /**
   * While the target moves forward steadily, plays toward it: at the
   * target's own speed, plus whatever closes the gap over CATCH_UP_SECONDS.
   * Once the target stops it only closes the gap, slowing into the frame
   * rather than passing it (and seeking back). Returns whether it is
   * playing.
   */
  private play(now: number) {
    const { video } = this;
    if (
      !this.playForward ||
      !this.hasFrame ||
      video.readyState < 3 ||
      video.seeking
    ) {
      return this.stopPlaying();
    }
    const moving = now - this.lastMoveAt < REST_MS;
    const speed = moving ? this.speed : 0;
    const time = video.currentTime;
    const gap = this.target - time;
    const rate = Math.min(PLAY_MAX_RATE, speed + gap / CATCH_UP_SECONDS);
    const start =
      moving && speed > PLAY_MIN_RATE && speed < PLAY_MAX_RATE && gap > -2 / 60;
    const keep = this.playing && rate > PLAY_STOP_RATE && gap > -1 / 60;
    // The scroll has turned back: never on forward (its measured speed
    // takes a moment to turn).
    const turnedBack = this.direction < 0 && now - this.lastMoveAt < AGAINST_MS;
    if (
      !(start || keep) ||
      turnedBack ||
      gap >= JUMP_SECONDS ||
      // Never into its end: an ended video would start again from 0.
      time >= this.clampTime(Infinity) - 1 / 30
    ) {
      return this.stopPlaying();
    }
    // The rate changes only when it matters: every change costs the
    // decoder a frame or two.
    const next = Math.max(0.0625, rate);
    const current = video.playbackRate;
    if (Math.abs(next - current) > Math.max(0.03, current * 0.08)) {
      video.playbackRate = next;
    }
    if (video.paused) {
      video.play().catch((error: DOMException) => {
        // Not allowed to play here at all: it only seeks.
        if (error?.name === "NotAllowedError") this.playForward = false;
      });
    }
    this.playing = true;
    this.shown = time;
    this.stats.mode = `play ×${video.playbackRate.toFixed(2)}`;
    return true;
  }

  /** Back to seeking, from the frame it has come to. */
  private stopPlaying() {
    if (this.playing) {
      this.playing = false;
      this.video.pause();
      this.shown = this.video.currentTime;
    }
    this.stats.mode = "seek";
    return false;
  }

  private onEmptied = () => {
    this.hasFrame = false;
    this.presented = null;
    this.playing = false;
  };

  private tick = (now: number) => {
    this.frame = 0;
    const dt = Math.min(0.1, Math.max(0, (now - this.lastTick) / 1000));
    this.lastTick = now;
    if (this.play(now)) {
      this.frame = requestAnimationFrame(this.tick);
      return;
    }
    const gap = this.target - this.shown;
    // Never against the scroll: while it goes one way (and at rest, when
    // only a few frames are left) a picture still on the other side of the
    // target waits there instead of moving away from the finger.
    const recent = now - this.lastMoveAt < AGAINST_MS;
    if (
      this.smooth &&
      this.direction !== 0 &&
      Math.sign(gap) === -this.direction &&
      Math.abs(gap) < JUMP_SECONDS &&
      (recent || Math.abs(gap) < HOLD_SECONDS)
    ) {
      if (recent) this.frame = requestAnimationFrame(this.tick);
      return;
    }
    if (!this.smooth || Math.abs(gap) > JUMP_SECONDS) {
      this.shown = this.target;
    } else {
      this.shown += gap * (1 - Math.exp(-dt / EASE_SECONDS));
      if (Math.abs(this.target - this.shown) < 0.002) this.shown = this.target;
    }

    const { video } = this;
    if (video.readyState >= 1 && !video.seeking) {
      const time = this.clampTime(this.shown);
      if (Math.abs(video.currentTime - time) > SEEK_EPSILON) {
        this.seekStarted = performance.now();
        video.currentTime = time;
      }
    }

    // Keep easing while there is distance left or a seek is in flight.
    if (this.shown !== this.target || video.seeking) {
      this.frame = requestAnimationFrame(this.tick);
    }
  };
}
