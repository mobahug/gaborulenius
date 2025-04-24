// Theme-aware MUI sections using your design tokens and glassy Paper
import {
  Box,
  Button,
  Typography,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import colors from "../colors";

export function HomeSection() {
  const theme = useTheme();
  return (
    <Paper id="home">
      <Typography variant="h1" gutterBottom fontSize={{ md: "3rem" }}>
        Hello, I’m{" "}
        <Box component="span" sx={{ color: "primary.main" }}>
          Your Name
        </Box>
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: "1.25rem", md: "1.375rem" }, mb: 4 }}
      >
        Front‑End Developer & UX Explorer crafting immersive digital experiences
        that blend aesthetics with purpose.
      </Typography>
      <Button variant="outlined" color="primary" href="#projects">
        Explore My Work
      </Button>
    </Paper>
  );
}

export function AboutSection() {
  return (
    <Paper id="about">
      <Typography variant="h1" gutterBottom fontSize={{ md: "3rem" }}>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        I’m a curious developer driven by the desire to build elegant, useful,
        and human-centered interfaces. Nature is my constant inspiration—both in
        design and in life.
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="📍 Based in Your City" />
        </ListItem>
        <ListItem>
          <ListItemText primary="🎓 B.Sc. in Computer Science" />
        </ListItem>
        <ListItem>
          <ListItemText primary="💼 3+ years of creative freelance work" />
        </ListItem>
      </List>
    </Paper>
  );
}

export function ProjectsSection() {
  return (
    <Paper id="projects">
      <Typography variant="h1" gutterBottom fontSize={{ md: "3rem" }}>
        Projects
      </Typography>
      <List>
        <ListItem sx={{ mb: 2 }}>
          <ListItemText
            primary={
              <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
                Project One — Smooth animated portfolio.
              </Typography>
            }
            secondary={
              <Link
                href="https://project1.example.com"
                target="_blank"
                sx={{ color: colors.textLight, fontSize: "1rem" }}
              >
                project1.example.com
              </Link>
            }
          />
        </ListItem>
        <ListItem sx={{ mb: 2 }}>
          <ListItemText
            primary={
              <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
                Project Two — Data viz dashboard with D3.js.
              </Typography>
            }
            secondary={
              <Link
                href="https://project2.example.com"
                target="_blank"
                sx={{ color: colors.textLight, fontSize: "1rem" }}
              >
                project2.example.com
              </Link>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
                Project Three — E‑commerce prototype with custom UI.
              </Typography>
            }
            secondary={
              <Link
                href="https://project3.example.com"
                target="_blank"
                sx={{ color: colors.textLight, fontSize: "1rem" }}
              >
                project3.example.com
              </Link>
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}

export function QualificationSection() {
  return (
    <Paper id="qualification">
      <Typography variant="h1" gutterBottom fontSize={{ md: "3rem" }}>
        Qualification
      </Typography>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">
              Full Stack Developer – Tietoevry
            </Typography>
            <Typography color="text.secondary">
              Espoo, 2023 – Present
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <WorkIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">Full Stack Developer – Anyhau</Typography>
            <Typography color="text.secondary">Espoo, 2022 – 2023</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">
              Software Developer – Hive Helsinki
            </Typography>
            <Typography color="text.secondary">2021 – 2023</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <SchoolIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">
              Finnish Language School – SataEdu
            </Typography>
            <Typography color="text.secondary">2016 – 2017</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <SchoolIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6">
              Construction Technician – Budapest
            </Typography>
            <Typography color="text.secondary">2011 – 2016</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Paper>
  );
}

export function SkillsSection() {
  return (
    <Paper id="skills-tools">
      <Typography variant="h1" gutterBottom fontSize={{ md: "3rem" }}>
        Skills & Tools
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Typography variant="h5">Frontend</Typography>
          <List dense>
            {[
              "React",
              "Next.js",
              "TypeScript",
              "GraphQL",
              "HTML5 & CSS",
              "JavaScript",
            ].map(item => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Backend</Typography>
          <List dense>
            {[
              "Node.js / Express",
              "PHP",
              "C",
              "PostgreSQL",
              "MySQL",
              "MariaDB",
              "MongoDB / Mongoose",
            ].map(item => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">Tools & DevOps</Typography>
          <List dense>
            {[
              "Git & GitHub / GitLab",
              "CI/CD pipelines",
              "Docker",
              "Kubernetes",
              "Terraform",
              "Azure DevOps / Cloud",
              "Jest",
              "Figma",
              "Asana · Jira · Confluence",
              "MAMP · XAMPP · LAMP",
              "pgAdmin · DBeaver",
              "Postman",
              "Lucidchart",
              "Bulma · MUI · Tailwind",
              "Redux · Recoil · Jotai",
              "VS Code · Vim · CLI · Termux",
            ].map(item => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}

export function ContactSection() {
  return (
    <Paper id="contact">
      <Typography variant="h1" gutterBottom fontSize={{ md: "3rem" }}>
        Let’s Connect
      </Typography>
      <Typography variant="body1" paragraph>
        Got a project or want to chat about nature & design? I’d love to hear
        from you.
      </Typography>
      <Typography variant="body1" paragraph>
        Email: <Link href="mailto:you@example.com">you@example.com</Link>
      </Typography>
      <Button
        variant="outlined"
        href="https://linkedin.com/in/yourprofile"
        target="_blank"
      >
        LinkedIn
      </Button>
    </Paper>
  );
}
