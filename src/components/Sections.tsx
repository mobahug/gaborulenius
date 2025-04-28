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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
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
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion } from "framer-motion";
import colors from "../colors";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

interface Event {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  when: string;
  details: React.ReactNode;
}

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
    },
    {
      title:
        "Built an AI PoC to assist doctors in faster diagnosis via medical document analysis",
      href: "https://www.tietoevry.com/fi/asiakkaitamme/2024/generatiivinen-tekoaly-auttaa-kliinikoita-paatoksenteossa-uudessa-lastensairaalassa/",
    },
    {
      title:
        "Contributing to the HUS DataLake platform for real-time healthcare data access",
      href: "https://www.tietoevry.com/en/newsroom/all-news-and-releases/articles/2021/an-agile-and-cost-effective-way-to-combine-patient-data-from-different-systems-it-already-exists-and-this-is-how-it-works/",
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
            <ListItem disableGutters sx={{ mb: 2 }}>
              <ListItemText
                primary={<Typography variant="body1">{proj.title}</Typography>}
                secondary={
                  proj.href ? (
                    <Link
                      href={proj.href}
                      target="_blank"
                      underline="hover"
                      sx={{
                        display: "inline-block",
                        maxWidth: 300,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {shorten(proj.href)}
                    </Link>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ cursor: "default", opacity: 0.7 }}
                    >
                      (no link available)
                    </Typography>
                  )
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

const events: Event[] = [
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Full Stack Developer – Tietoevry",
    when: "Espoo, 2023 – Present",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          I’m working as a Full Stack Developer in the healthcare domain,
          building cloud-native, AI-powered solutions that improve the
          accessibility and usability of patient data across the Nordic region.
          My work focuses on React, TypeScript, Node.js, GraphQL, PostgreSQL,
          Docker, Kubernetes, Terraform, and Azure DevOps within Agile Scrum
          teams.
        </Typography>
        <Typography sx={{ color: colors.textLight, fontWeight: 600 }}>
          Notable contributions:
        </Typography>
        <List
          sx={{
            listStyle: "disc",
            pl: 4,
            color: colors.textLight,
            "& .MuiListItem-root": { display: "list-item", p: 0 },
          }}
        >
          <ListItem>
            <ListItemText primary="Developed an LLM-powered AI solution at ICT Days, Finland’s largest healthcare tech event" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Contributed to the HUS DataLake, enabling real-time access to healthcare data across multiple systems" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Built an AI PoC leveraging LLMs to help doctors find diagnoses faster through medical documents" />
          </ListItem>
        </List>
      </>
    ),
  },
  {
    icon: <WorkIcon />,
    bgColor: colors.btnBg,
    title: "Full Stack Developer – Anyhau",
    when: "Espoo, 2022 – 2023",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Worked on a greenfield web application for booking animal-related
          services, in collaboration with the 2022 Diili show winner. Built from
          the ground up using Next.js, Material UI, and MongoDB. The platform
          enable service providers to list offerings and customers to book and
          pay online.
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    title: "Software Developer – Hive Helsinki",
    when: "2021 – 2023",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          Completed a project-based program focused on teamwork,
          problem-solving, and self-directed learning. Built skills in
          collaboration, critical thinking, and adaptability for real-world
          software development.
        </Typography>
      </>
    ),
  },
  {
    icon: <SchoolIcon />,
    bgColor: colors.btnBg,
    title: "Finnish Language School – SataEdu",
    when: "2016 – 2017",
    details: (
      <>
        <Typography sx={{ color: colors.textLight }}>
          After the school I continued self-studies in Finnish to advance fluent
          conversational proficiency. Comfortable in everyday discussions, with
          ongoing efforts to improve further.
        </Typography>
      </>
    ),
  },
];

export function QualificationSection() {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpen = (evt: Event) => () => {
    setSelectedEvent(evt);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
              Professional Highlights
            </Typography>
          </motion.div>

          <Timeline
            position={isSmallScreen ? "right" : "alternate"}
            sx={{
              "& .MuiTimelineItem-root:before": {
                display: isSmallScreen ? "none" : undefined,
              },
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
                  {i < events.length - 1 && (
                    <TimelineConnector sx={{ bgcolor: colors.dividerBg }} />
                  )}
                </TimelineSeparator>

                <TimelineContent onClick={handleOpen(evt)}>
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

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
        slotProps={{
          transition: { timeout: { appear: 600, enter: 600, exit: 600 } },
          paper: {
            sx: {
              maxWidth: "900px",
            },
          },
        }}
        aria-labelledby="qualification-dialog-title"
      >
        <DialogTitle
          id="qualification-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 0,
            color: colors.textHeading,
          }}
        >
          {selectedEvent?.title}
          <IconButton onClick={handleClose} sx={{ color: colors.textLight }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 1 }}>
          <DialogContentText component="div" sx={{ color: colors.textLight }}>
            {selectedEvent?.details}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: colors.accent }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
            Email:{" "}
            <Link href="mailto:gaborulenius@gmail.com">
              gaborulenius@gmail.com
            </Link>
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const shorten = (url: string) => {
  try {
    const u = new URL(url);
    const path = u.pathname.split("/").filter(Boolean).slice(0, 2).join("/");
    return path ? `${u.host}/${path}…` : u.host;
  } catch {
    return url;
  }
};
