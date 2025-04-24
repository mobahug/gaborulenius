import { Container, Stack } from "@mui/material";
import {
  HomeSection,
  AboutSection,
  ProjectsSection,
  QualificationSection,
  SkillsSection,
  ContactSection,
} from "./Sections";

export default function Hero() {
  return (
    <Container maxWidth="md" sx={{ px: 0 }}>
      <Stack direction="column" spacing={40}>
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <QualificationSection />
        <SkillsSection />
        <ContactSection />
      </Stack>
    </Container>
  );
}
