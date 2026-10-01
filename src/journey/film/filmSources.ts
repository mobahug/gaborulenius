import { assetUrl } from "../../utils/assets";
import { isModestConnection, wantsLightVideo } from "../../utils/connection";

/** The encodes of each film (see films.ts): full HD, the lighter one, and
 * the portrait window for phones held upright. */
export type Rendition = "hd" | "sd" | "portrait";

export const filmSources = (id: string): Record<Rendition, string> => ({
  hd: assetUrl(`film/hd/${id}.mp4`),
  sd: assetUrl(`film/sd/${id}.mp4`),
  portrait: assetUrl(`film/portrait/${id}.mp4`),
});

/** The portrait encodes' shape (640 × 1080): a screen no wider than this
 * sees in them exactly what it sees of the full frame. */
const PORTRAIT_ASPECT = 640 / 1080;

/** Whether a screen this shape gets the portrait encodes. */
export const isUpright = (vw: number, vh: number) =>
  vw / Math.max(1, vh) <= PORTRAIT_ASPECT + 0.001;

/**
 * The encode other screens get: full HD — on a connection known to be
 * modest the lighter encode first, full HD taking over later (see
 * FilmLayer); saved data, slow connections and very small memories stay
 * with the lighter one.
 */
export const wideRendition = (): Rendition =>
  wantsLightVideo() || isModestConnection() ? "sd" : "hd";
