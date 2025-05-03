import { useRef } from "react";
import { Container, Stack } from "@mui/material";
import BirdManager, { SectionInfo } from "./BirdManager";
import { useBirdEffect } from "../hooks/useBirdEffect";
import Footer from "./Footer";
import { HomeSection } from "./sections/HomeSection";
import { AboutSection } from "./sections/AboutSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { QualificationSection } from "./sections/QualificationSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ContactSection } from "./sections/ContactSection";

export default function Hero() {
  const homeRef = useRef<HTMLDivElement>(null!);
  const aboutRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const qualificationRef = useRef<HTMLDivElement>(null!);
  const skillsRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);
  const footRef = useRef<HTMLDivElement>(null!);

  const sections: SectionInfo[] = [
    { id: "home", ref: homeRef },
    { id: "about", ref: aboutRef },
    { id: "projects", ref: projectsRef },
    { id: "qualification", ref: qualificationRef },
    { id: "skills", ref: skillsRef },
    { id: "contact", ref: contactRef },
    { id: "footer", ref: footRef },
  ];

  const { birdEnabled } = useBirdEffect();

  return (
    <>
      <Container maxWidth="md" sx={{ px: 0, position: "relative" }}>
        {birdEnabled ? <BirdManager sections={sections} /> : null}
        <Stack direction="column" spacing={40}>
          <HomeSection innerRef={homeRef} />
          <AboutSection innerRef={aboutRef} />
          <ProjectsSection innerRef={projectsRef} />
          <QualificationSection innerRef={qualificationRef} />
          <SkillsSection innerRef={skillsRef} />
          <ContactSection innerRef={contactRef} />
        </Stack>
      </Container>
      <Footer innerRef={footRef} />
    </>
  );
}
