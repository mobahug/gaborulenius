/**
 * The film layer's <video> elements, for overlays that read the footage
 * themselves (the keyed macaw, the neural probe). Registered once the film
 * layer has mounted.
 */
const videos: Array<HTMLVideoElement | null> = [];

export const registerFilmVideo = (
  index: number,
  video: HTMLVideoElement | null,
) => {
  videos[index] = video;
};

export const getFilmVideo = (index: number) => videos[index] ?? null;
