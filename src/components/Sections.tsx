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
  Tabs,
  Tab,
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion } from "framer-motion";
import colors from "../colors";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  allEvents,
  categories,
  Events,
  highlightedEvents,
  projects,
} from "../contexts";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`qualification-tabpanel-${index}`}
      aria-labelledby={`qualification-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export function QualificationSection() {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  const handleOpen = (evt: Events) => () => {
    setSelectedEvent(evt);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };
  return (
    <>
      <Paper id="qualification" sx={{ pt: 0 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Qualification Tabs"
          centered
          variant="fullWidth"
          sx={{
            p: 2,
          }}
        >
          <Tab
            label="Tab One"
            id="qualification-tab-0"
            aria-controls="qualification-tabpanel-0"
          />
          <Tab
            label="Tab Two"
            id="qualification-tab-1"
            aria-controls="qualification-tabpanel-1"
          />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
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
              {highlightedEvents.map((evt, i) => (
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
                    {i < highlightedEvents.length - 1 && (
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
          </motion.div>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div custom={1} variants={fadeUp}>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  color: colors.textHeading,
                }}
              >
                Full Timeline
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
              {allEvents.map((evt, i) => (
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
                    {i < allEvents.length - 1 && (
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
          </motion.div>
        </TabPanel>
      </Paper>
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
