export const COVER_THRESHOLD = 300;

export const navLinks = [
  { id: "navHome", href: "#home" },
  { id: "navAbout", href: "#about" },
  { id: "navProjects", href: "#projects" },
  { id: "navExperience", href: "#experience" },
  { id: "navSkills", href: "#skills-tools" },
  { id: "navContact", href: "#contact" },
];

export type TabKey = "effects" | "appearance" | "language";

export const tabConfig: { key: TabKey; id: string }[] = [
  { key: "effects", id: "tabsEffects" },
  { key: "appearance", id: "tabsAppearance" },
  { key: "language", id: "tabsLanguage" },
];
