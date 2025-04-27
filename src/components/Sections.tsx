import {
  Box,
  Button,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion } from "framer-motion";
import colors from "../colors";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export function HomeSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="home">
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            Hello, I’m{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Gábor
            </Box>
          </Typography>
        </motion.div>
        <motion.div custom={2} variants={fadeUp}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Full Stack Developer at Tietoevry Care, specializing in
            cloud-native, AI-powered healthcare solutions.
          </Typography>
        </motion.div>
        <motion.div custom={3} variants={fadeUp}>
          <Button variant="contained" href="#projects">
            Explore My Work
          </Button>
        </motion.div>
      </Paper>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="about">
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },

              color: colors.textHeading,
            }}
          >
            About Me
          </Typography>
        </motion.div>
        <motion.div custom={2} variants={fadeUp}>
          <Typography variant="body1">
            Contributed to Finland’s largest healthcare data platform (HUS
            DataLake), improving data accessibility. Proficient in React,
            TypeScript, GraphQL, Node.js, Docker, Kubernetes, Terraform, and
            Azure Cloud. Worked on LLM-based AI prototypes, including a demo at
            ICT Days and a diagnostic tool piloted at the New Children’s
            Hospital for faster symptom-based searches.
          </Typography>
        </motion.div>
        <motion.div custom={3} variants={fadeUp}>
          <List>
            {[
              "📍 Finland, Espoo",
              "🎓 Hive Helsinki Alumni",
              "💼 2+ years professional work experience",
            ].map(text => (
              <ListItem key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </motion.div>
      </Paper>
    </motion.div>
  );
}

export function ProjectsSection() {
  const projects = [
    {
      title:
        " Developed an LLM-based AI solution for ICT Days, Finland’s largest healthcare tech event",
      href: "https://project1.example.com",
    },
    {
      title:
        "Built an AI PoC to assist doctors in faster diagnosis via medical document analysis",
      href: "https://project2.example.com",
    },
    {
      title:
        "Contributing to the HUS DataLake platform for real-time healthcare data access",
      href: "https://project3.example.com",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="projects">
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            Projects
          </Typography>
        </motion.div>
        {projects.map((proj, i) => (
          <motion.div key={proj.title} custom={i + 2} variants={fadeUp}>
            <ListItem sx={{ mb: 2 }}>
              <ListItemText
                primary={<Typography variant="body1">{proj.title}</Typography>}
                secondary={
                  <Link href={proj.href} target="_blank">
                    {proj.href.replace(/^https?:\/\//, "")}
                  </Link>
                }
              />
            </ListItem>
          </motion.div>
        ))}
      </Paper>
    </motion.div>
  );
}

const MotionTimelineItem = motion(TimelineItem);

export function QualificationSection() {
  const events = [
    {
      icon: <WorkIcon />,
      bgColor: colors.btnBg,
      title: "Full Stack Developer – Tietoevry",
      when: "Espoo, 2023 – Present",
    },
    {
      icon: <WorkIcon />,
      bgColor: colors.btnBg,
      title: "Full Stack Developer – Anyhau",
      when: "Espoo, 2022 – 2023",
    },
    {
      icon: <SchoolIcon />,
      bgColor: colors.btnBg,
      title: "Software Developer – Hive Helsinki",
      when: "2021 – 2023",
    },
    {
      icon: <SchoolIcon />,
      bgColor: colors.btnBg,
      title: "Finnish Language School – SataEdu",
      when: "2016 – 2017",
    },
    {
      icon: <SchoolIcon />,
      bgColor: colors.btnBg,
      title: "Construction Technician – Budapest",
      when: "2011 – 2016",
    },
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="qualification">
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            Qualification
          </Typography>
        </motion.div>

        <Timeline
          position={isSmallScreen ? "right" : "alternate"}
          sx={{
            "& .MuiTimelineItem-root:before": {
              display: isSmallScreen ? "none" : undefined,
            },
            p: 0,
          }}
        >
          {events.map((evt, i) => (
            <MotionTimelineItem
              key={evt.title}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    bgcolor: evt.bgColor,
                    color: colors.textLight,
                    border: `2px solid ${colors.accent}`,
                  }}
                  variant="outlined"
                >
                  {evt.icon}
                </TimelineDot>
                {i < events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h5" gutterBottom>
                  {evt.title}
                </Typography>
                <Box
                  component="time"
                  dateTime={evt.when}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: "primary.main",
                  }}
                >
                  <CalendarMonthIcon fontSize="small" />
                  <Typography variant="body2" color="primary.main">
                    {evt.when}
                  </Typography>
                </Box>
              </TimelineContent>
            </MotionTimelineItem>
          ))}
        </Timeline>
      </Paper>
    </motion.div>
  );
}

export function SkillsSection() {
  const categories = [
    {
      label: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "GraphQL",
        "HTML5",
        "CSS3",
        "JavaScript",
      ],
    },
    {
      label: "Backend",
      items: [
        "Node.js/Express",
        "PHP",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "MariaDB",
        "Redis",
        "GraphQL",
      ],
    },
    {
      label: "Tools",
      items: [
        "Azure DevOps",
        "Azure Cloud",
        "GitHub",
        "GitLab",
        "Git",
        "CI/CD pipelines",
        "Docker",
        "Kubernetes",
        "Asana",
        "Atlassian",
        "Jira",
        "Confluence",
        "Miro",
        "MAMP",
        "XAMPP",
        "LAMP",
        "MyphpAdmin",
        "pgAdmin",
        "DataGrip",
        "Postico 2",
        "DBeaver",
        "Mongoose",
        "Postman",
        "Lucidchart",
        "Bulma",
        "MUI",
        "Tailwind",
        "Redux",
        "Recoil",
        "Jotai",
        "VS Code",
        "Vim",
        "CLI",
        "Termux",
      ],
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="skills-tools">
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            Skills &amp; Tools
          </Typography>
        </motion.div>

        <Stack spacing={4}>
          {categories.map((cat, idx) => (
            <motion.div key={cat.label} custom={idx + 2} variants={fadeUp}>
              <Typography variant="h5" sx={{ color: colors.textLight, mb: 2 }}>
                {cat.label}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.5,
                }}
              >
                {cat.items.map(skill => (
                  <Box component="li" key={skill}>
                    <Chip
                      label={skill}
                      size="medium"
                      clickable
                      sx={{
                        border: `1px solid ${colors.glassBorder}`,
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: colors.accent,
                        transition: "background 0.3s",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </motion.div>
          ))}
        </Stack>
      </Paper>
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="contact">
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            Let’s Connect
          </Typography>
        </motion.div>
        <motion.div custom={2} variants={fadeUp}>
          <Typography variant="body1">
            Got a project or want to chat about nature & design? I’d love to
            hear from you.
          </Typography>
        </motion.div>
        <motion.div custom={3} variants={fadeUp}>
          <Typography variant="body1">
            Email: <Link href="mailto:you@example.com">you@example.com</Link>
          </Typography>
        </motion.div>
        <motion.div custom={4} variants={fadeUp}>
          <Button
            variant="contained"
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
          >
            LinkedIn
          </Button>
        </motion.div>
      </Paper>
    </motion.div>
  );
}
