import { useRef } from "react";
import { Container, Stack } from "@mui/material";
import SectionWithPaper from "./SectionWithPaper";
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
        <SectionWithPaper id="home" innerRef={homeRef}>
          <HomeSection />
        </SectionWithPaper>
        <SectionWithPaper id="about" innerRef={aboutRef}>
          <AboutSection />
        </SectionWithPaper>
        <SectionWithPaper id="projects" innerRef={projectsRef}>
          <ProjectsSection />
        </SectionWithPaper>
        <SectionWithPaper id="qualification" innerRef={qualificationRef}>
          <QualificationSection />
        </SectionWithPaper>
        <SectionWithPaper id="skills" innerRef={skillsRef}>
          <SkillsSection />
        </SectionWithPaper>
        <SectionWithPaper id="contact" innerRef={contactRef}>
          <ContactSection />
        </SectionWithPaper>
      </Stack>
    </Container>
  );
}

// export default function Hero() {
//   return (
//     <Container maxWidth="md" sx={{ px: 0 }}>
//       <Stack direction="column" spacing={40}>
//         <HomeSection />
//         <AboutSection />
//         <ProjectsSection />
//         <QualificationSection />
//         <SkillsSection />
//         <ContactSection />
//       </Stack>
//     </Container>
//   );
// }
