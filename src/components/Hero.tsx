import { useRef } from "react";
import { Container, Stack } from "@mui/material";
import BirdManager, { SectionInfo } from "./BirdManager";
import {
  HomeSection,
  AboutSection,
  ProjectsSection,
  QualificationSection,
  SkillsSection,
  ContactSection,
} from "./Sections";

export default function Hero() {
  const homeRef = useRef<HTMLDivElement>(null!);
  const aboutRef = useRef<HTMLDivElement>(null!);
  const projectsRef = useRef<HTMLDivElement>(null!);
  const qualificationRef = useRef<HTMLDivElement>(null!);
  const skillsRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);

  const sections: SectionInfo[] = [
    { id: "home", ref: homeRef },
    { id: "about", ref: aboutRef },
    { id: "projects", ref: projectsRef },
    { id: "qualification", ref: qualificationRef },
    { id: "skills", ref: skillsRef },
    { id: "contact", ref: contactRef },
  ];

  return (
    <Container maxWidth="md" sx={{ px: 0, position: "relative" }}>
      <BirdManager sections={sections} />

      <Stack direction="column" spacing={40}>
        <HomeSection innerRef={homeRef} />
        <AboutSection innerRef={aboutRef} />
        <ProjectsSection innerRef={projectsRef} />
        <QualificationSection innerRef={qualificationRef} />
        <SkillsSection innerRef={skillsRef} />
        <ContactSection innerRef={contactRef} />
      </Stack>
    </Container>
  );
}
