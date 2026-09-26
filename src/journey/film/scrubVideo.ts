/**
 * Drives one paused <video> to a target time. The shown time eases toward
 * the target (a few tens of milliseconds), so scrolling reads as motion
 * rather than a series of jumps; seeks are coalesced (never more than one in
 * flight), so fast scrolling cannot build up a backlog; and large jumps
 * (navigation, flicks) land immediately instead of sweeping through every
 * frame in between. The video is never played.
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
  private readonly onReady: () => void;

  constructor(video: HTMLVideoElement, onReady: () => void = () => {}) {
    this.video = video;
    this.onReady = onReady;
    video.muted = true;
    video.pause();
    video.addEventListener("loadedmetadata", this.onMetadata);
    video.addEventListener("seeked", this.onFrame);
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
    this.target = time;
    this.smooth = smooth;
    if (!this.frame) {
      this.lastTick = performance.now();
      this.tick(this.lastTick);
    }
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    if (this.frameCallback) {
      this.video.cancelVideoFrameCallback?.(this.frameCallback);
    }
    this.video.removeEventListener("loadedmetadata", this.onMetadata);
    this.video.removeEventListener("seeked", this.onFrame);
    this.video.removeEventListener("loadeddata", this.onFrame);
    this.video.removeEventListener("emptied", this.onEmptied);
  }

  private watchFrames() {
    const { video } = this;
    if (!video.requestVideoFrameCallback) return;
    const onPresented = (_now: number, metadata: { mediaTime: number }) => {
      this.presented = metadata.mediaTime;
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

  private onEmptied = () => {
    this.hasFrame = false;
    this.presented = null;
  };

  private tick = (now: number) => {
    this.frame = 0;
    const dt = Math.min(0.1, Math.max(0, (now - this.lastTick) / 1000));
    this.lastTick = now;
    const gap = this.target - this.shown;
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
        video.currentTime = time;
      }
    }

    // Keep easing while there is distance left or a seek is in flight.
    if (this.shown !== this.target || video.seeking) {
      this.frame = requestAnimationFrame(this.tick);
    }
  };
}
