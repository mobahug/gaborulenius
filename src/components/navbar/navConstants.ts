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

export const navLinks = [
  { id: "navHome", href: "#home" },
  { id: "navAbout", href: "#about" },
  { id: "navProjects", href: "#projects" },
  { id: "navExperience", href: "#experience" },
  { id: "navSkills", href: "#skills" },
  { id: "navContact", href: "#contact" },
];
