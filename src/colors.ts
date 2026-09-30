/**
 * The journey's palette, shared by the films' content and every interface
 * element over them: warm cream text, gold accents and hairlines, and dark,
 * slightly translucent forest-shade surfaces (glass) that let the films show
 * through.
 */
export const colors = {
  /** Deepest surface: under the films, behind dialogs. */
  bgDark: "#0b110d",
  /** Body text: the cream of every block over the films. */
  textLight: "#f6f1e4",
  textLightRgb: "246, 241, 228",
  /** Secondary text. */
  textMuted: "rgba(246, 241, 228, 0.74)",
  /** Headings inside panels, kickers. */
  textHeading: "#e9dcb3",
  /** Accent: gold. */
  accent: "#d9c89a",
  accentHover: "#e9dcb3",
  accentRgb: "217, 200, 154",
  /** Glass surfaces: cards, the navigation, the footer … */
  glassBg: "rgba(10, 16, 12, 0.6)",
  /** … and those that must hold text over anything: dialogs, the menu. */
  glassBgStrong: "rgba(9, 13, 10, 0.9)",
  glassBorder: "rgba(233, 220, 179, 0.16)",
  navBg: "rgba(7, 11, 8, 0.55)",
  drawerBg: "rgba(9, 13, 10, 0.94)",
  overlayBg: "rgba(3, 6, 4, 0.55)",
  dividerBg: "rgba(233, 220, 179, 0.16)",
  /** Buttons: glass with a gold hairline; gold tint on hover. */
  btnBg: "rgba(10, 16, 12, 0.5)",
  btnBgHover: "rgba(217, 200, 154, 0.16)",
  btnBorder: "rgba(217, 200, 154, 0.42)",
  /** The controls floating over the films with no bar behind them: dark
   * enough that their words keep 4.5:1 over the brightest frames (the
   * Explorer's pale sky, the neural node). */
  floatBg: "rgba(10, 16, 12, 0.66)",
};
