export const COVER_FADE_MIN_PX = 300;
export const COVER_FADE_VIEWPORT_RATIO = 0.85;

export const getCoverFadeThreshold = () =>
  Math.max(COVER_FADE_MIN_PX, window.innerHeight * COVER_FADE_VIEWPORT_RATIO);

// Returns 1 while cover should be fully visible, 0 once it should be fully hidden.
// Cover is fully gone the moment the home section's TOP reaches viewport center.
// `homeTop` is the section's top relative to the viewport, measured by the
// caller (null while the section does not exist yet).
export const getCoverVisibility = (
  homeTop: number | null,
  scrollY: number,
  viewportHeight: number,
) => {
  if (homeTop === null) {
    const fadeOutPoint = getCoverFadeThreshold();
    return Math.max(0, 1 - scrollY / fadeOutPoint);
  }

  const distance = homeTop - viewportHeight / 2;
  // Short, snappy fade: cover goes from full to gone over ~25% of viewport height.
  const fadeRange = viewportHeight * 0.25;
  return Math.min(1, Math.max(0, distance / fadeRange));
};

export type NavLink = {
  id: string;
  href: string;
  /** The section's own parts, shown on the rail while it is the current
   * one (see SectionRail). */
  children?: ReadonlyArray<{ id: string; href: string }>;
};

export const navLinks: ReadonlyArray<NavLink> = [
  { id: "navHome", href: "#home" },
  {
    id: "navAbout",
    href: "#about",
    children: [
      { id: "navAboutMe", href: "#about" },
      { id: "navAboutStory", href: "#story" },
    ],
  },
  {
    id: "navProjects",
    href: "#projects",
    children: [
      { id: "navNeural", href: "#neural" },
      { id: "navNeuralCase", href: "#neural-case" },
      { id: "navNeuralMethod", href: "#neural-method" },
      { id: "navExplorer", href: "#explorer" },
      { id: "navExplorerMaps", href: "#explorer-maps" },
      { id: "navExplorerPrecision", href: "#explorer-precision" },
      { id: "navExplorerCapture", href: "#explorer-capture" },
      { id: "navExplorerCloud", href: "#explorer-cloud" },
      { id: "navExplorerBuilt", href: "#explorer-built" },
    ],
  },
  {
    id: "navExperience",
    href: "#experience",
    children: [
      { id: "navHighlights", href: "#experience" },
      { id: "navWorkProjects", href: "#work" },
    ],
  },
  {
    id: "navSkills",
    href: "#skills",
    children: [
      { id: "navSkillsList", href: "#skills" },
      { id: "navTools", href: "#tools" },
    ],
  },
  { id: "navContact", href: "#contact" },
];
