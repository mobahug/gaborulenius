import React, { useMemo, useRef, type RefObject } from "react";
import { FormattedMessage } from "react-intl";
import { useActiveNavScrollSpy } from "../hooks/useActiveNavLink";
import { DeferredSection } from "./DeferredSection";
import ChaseStage from "../journey/stages/ChaseStage";
import EndingStage from "../journey/stages/EndingStage";
import ExplorerStage from "../journey/stages/ExplorerStage";
import NeuralStage from "../journey/stages/NeuralStage";
import WorkStage from "../journey/stages/WorkStage";

const Footer = React.lazy(() => import("./Footer"));

/**
 * Follows the scroll to highlight the current section in the navigation. A
 * component of its own, so that only it re-renders when the section
 * changes, not the whole journey.
 */
const NavScrollSpy = ({
  sections,
}: {
  sections: ReadonlyArray<RefObject<HTMLElement>>;
}) => {
  useActiveNavScrollSpy(sections);
  return null;
};

// Placeholder heights while the footer's code has not loaded yet.
const FOOTER_HEIGHTS = { mobile: 520, tablet: 380, desktop: 320 } as const;

/**
 * The page as one journey: five films directed by the scroll. The first
 * starts on the jungle path under the greeting, introduction and About,
 * follows a butterfly to a macaw and goes through its eye into a neural
 * network (the Neural Decompiler), out into the Okavango Delta (The
 * Explorer), down to a desk (experience, work projects, skills) and back to
 * the jungle (contact).
 */
export default function Hero() {
  const homeRef = useRef<HTMLDivElement>(null!);
  const aboutRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const experienceRef = useRef<HTMLDivElement>(null!);
  const skillsRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);

  const navSectionRefs = useMemo(
    () => [
      homeRef as React.RefObject<HTMLElement>,
      aboutRef as React.RefObject<HTMLElement>,
      projectsRef as React.RefObject<HTMLElement>,
      experienceRef as React.RefObject<HTMLElement>,
      skillsRef as React.RefObject<HTMLElement>,
      contactRef as React.RefObject<HTMLElement>,
    ],
    [],
  );

  return (
    <>
      <NavScrollSpy sections={navSectionRefs} />
      <ChaseStage homeRef={homeRef} aboutRef={aboutRef} />
      <section className="journey-projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="sr-only">
          <FormattedMessage id="projectHeading" />
        </h2>
        <NeuralStage projectsRef={projectsRef} />
        <ExplorerStage />
      </section>
      <WorkStage experienceRef={experienceRef} skillsRef={skillsRef} />
      <EndingStage contactRef={contactRef} />
      <DeferredSection id="footer" minHeights={FOOTER_HEIGHTS}>
        <Footer />
      </DeferredSection>
    </>
  );
}
