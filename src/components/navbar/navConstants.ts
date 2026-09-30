/** A part of a section: a block to go to, or (`group`) a project whose
 * parts follow it (until the next group). */
type NavPart = { id: string; href: string; group?: boolean };

type NavLink = {
  id: string;
  href: string;
  /** The section's own parts, shown on the rail while it is the current
   * one (see SectionRail) and in the phone's menu. */
  children?: ReadonlyArray<NavPart>;
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
      { id: "navNeural", href: "#neural", group: true },
      { id: "navNeuralCase", href: "#neural-case" },
      { id: "navNeuralMethod", href: "#neural-method" },
      { id: "navExplorer", href: "#explorer", group: true },
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

/** Every part of every section, in the page's order. */
export const allParts = navLinks.flatMap((link) => link.children ?? []);

/** The group (project) a part belongs to, if any: the part itself when it
 * is one, else the last group before it in its section. */
export const groupOf = (
  parts: ReadonlyArray<NavPart>,
  href: string | null,
): string | null => {
  const index = parts.findIndex((part) => part.href === href);
  for (let at = index; at >= 0; at -= 1) {
    if (parts[at].group) return parts[at].href;
  }
  return null;
};

/** A part's place in the page: the hold of the block its anchor is in (or
 * the anchor itself). */
export const placeOf = (href: string) => {
  const anchor = document.getElementById(href.slice(1));
  return anchor?.closest<HTMLElement>(".film-hold") ?? anchor;
};

/** A part counts as reached once its place in the page is this far up the
 * screen (as the scroll spy does for sections). */
export const PART_REACHED = 0.35;

/** The part on screen now, measured once (for the phone's menu; the rail
 * follows the scroll with the scroll clock instead). */
export const partOnScreen = () => {
  const line = window.innerHeight * PART_REACHED;
  let reached: string | null = null;
  let best = -Infinity;
  allParts.forEach(({ href }) => {
    const top = placeOf(href)?.getBoundingClientRect().top;
    if (top !== undefined && top <= line && top > best) {
      best = top;
      reached = href;
    }
  });
  return reached;
};
