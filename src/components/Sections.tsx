import {
  Box,
  Button,
  Typography,
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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";
import colors from "../colors";
import { useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import {
  allEvents,
  categories,
  TimelineEvent,
  highlightedEvents,
  projects,
} from "../contexts";
import { FormattedMessage } from "react-intl";

export function HomeSection({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="home" ref={innerRef}>
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            <FormattedMessage
              id="homeGreeting"
              values={{
                name: (
                  <Box component="span" sx={{ color: "primary.main" }}>
                    Gábor
                  </Box>
                ),
              }}
            />
          </Typography>
        </motion.div>
        <motion.div custom={2} variants={fadeUp}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            <FormattedMessage id="homeSubtitle" />
          </Typography>
        </motion.div>
        <motion.div custom={3} variants={fadeUp}>
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            spacing={4}
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              href="#projects"
              startIcon={<SearchIcon />}
            >
              <FormattedMessage id="homeBtnExplore" />
            </Button>
            <Button
              variant="contained"
              component="a"
              href="/GaborCV.pdf"
              target="_blank"
              download
              startIcon={<FileDownloadIcon />}
            >
              <FormattedMessage id="homeBtnDownloadCv" />
            </Button>
          </Stack>
        </motion.div>
      </Paper>
    </motion.div>
  );
}

export function AboutSection({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="about" ref={innerRef}>
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            <FormattedMessage id="aboutHeading" />
          </Typography>
        </motion.div>
        <motion.div custom={2} variants={fadeUp}>
          <Typography variant="body1">
            <FormattedMessage id="aboutBody" />
          </Typography>
        </motion.div>
        <motion.div custom={3} variants={fadeUp}>
          <List>
            {["aboutLocation", "aboutEducation", "aboutExperience"].map(
              (id) => (
                <ListItem key={id}>
                  <ListItemText primary={<FormattedMessage id={id} />} />
                </ListItem>
              ),
            )}
          </List>
        </motion.div>
      </Paper>
    </motion.div>
  );
}

export function ProjectsSection({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="projects" ref={innerRef}>
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            <FormattedMessage id="projectHeading" />
          </Typography>
        </motion.div>
        {projects.map(({ id, href }, i) => (
          <motion.div key={id} custom={i + 2} variants={fadeUp}>
            <ListItem disableGutters sx={{ mb: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="body1">
                    <FormattedMessage id={id} />
                  </Typography>
                }
                secondary={
                  href ? (
                    <Button
                      variant="contained"
                      component="a"
                      href={href}
                      target="_blank"
                    >
                      <FormattedMessage id="buttonReadMore" />
                    </Button>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ opacity: 0.7 }}
                    >
                      <FormattedMessage id="noLinkAvailable" />
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

const MotionTimelineItem = motion.create(TimelineItem);

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

export function QualificationSection({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null,
  );
  const [tabIndex, setTabIndex] = useState(0);

  const handleOpen = (evt: TimelineEvent) => () => {
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
      <Paper id="qualification" ref={innerRef} sx={{ pt: 0 }}>
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
            label={<FormattedMessage id="qualificationTabHighlights" />}
            id="qualification-tab-0"
            aria-controls="qualification-tabpanel-0"
          />
          <Tab
            label={<FormattedMessage id="qualificationTabTimeline" />}
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
                <FormattedMessage id="qualificationHeadingHighlights" />
              </Typography>
            </motion.div>
            <Timeline
              position={isSmallScreen ? "right" : "alternate"}
              sx={{
                padding: 0,
                "& .MuiTimelineItem-root:before": {
                  display: isSmallScreen ? "none" : undefined,
                },
              }}
            >
              {highlightedEvents.map((evt, i) => (
                <MotionTimelineItem
                  key={evt.titleId}
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

                  <TimelineContent
                    onClick={handleOpen(evt)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography variant="h5" gutterBottom>
                      <FormattedMessage id={evt.titleId} />{" "}
                      <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </Typography>
                    <Box
                      component="time"
                      dateTime={evt.whenId}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        color: "primary.main",
                      }}
                    >
                      <CalendarMonthIcon fontSize="small" />
                      <Typography variant="body2" color="primary.main">
                        <FormattedMessage id={evt.whenId} />
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
                <FormattedMessage id="qualificationHeadingTimeline" />
              </Typography>
            </motion.div>
            <Timeline
              position={isSmallScreen ? "right" : "alternate"}
              sx={{
                padding: 0,
                "& .MuiTimelineItem-root:before": {
                  display: isSmallScreen ? "none" : undefined,
                },
              }}
            >
              {allEvents.map((evt, i) => (
                <MotionTimelineItem
                  key={evt.titleId}
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
                  <TimelineContent
                    onClick={handleOpen(evt)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography variant="h5" gutterBottom>
                      <FormattedMessage id={evt.titleId} />
                      <OpenInNewIcon sx={{ fontSize: 16 }} />
                    </Typography>
                    <Box
                      component="time"
                      dateTime={evt.whenId}
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        color: "primary.main",
                      }}
                    >
                      <CalendarMonthIcon fontSize="small" />
                      <Typography variant="body2" color="primary.main">
                        <FormattedMessage id={evt.whenId} />
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
          <FormattedMessage id={selectedEvent?.titleId} />
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
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ color: colors.accent }}
          >
            <FormattedMessage id="buttonClose" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function SkillsSection({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="skills-tools" ref={innerRef}>
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            <FormattedMessage id="skillsToolsHeading" />
          </Typography>
        </motion.div>
        <Stack spacing={4}>
          {categories.map((cat, idx) => (
            <motion.div key={cat.id} custom={idx + 2} variants={fadeUp}>
              <Typography variant="h5" sx={{ color: colors.textLight, mb: 2 }}>
                <FormattedMessage id={cat.id} />
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
                {cat.items.map((skill) => (
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

export function ContactSection({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Paper id="contact" ref={innerRef}>
        <motion.div custom={1} variants={fadeUp}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: colors.textHeading,
            }}
          >
            <FormattedMessage id="contactHeading" />
          </Typography>
        </motion.div>
        <motion.div custom={2} variants={fadeUp}>
          <Typography variant="body1">
            <FormattedMessage id="contactIntro" />
          </Typography>
        </motion.div>
        <motion.div custom={4} variants={fadeUp}>
          <Stack
            direction={isSmallScreen ? "column" : "row"}
            spacing={4}
            justifyContent="flex-end"
          >
            <Button
              variant="contained"
              component="a"
              href="mailto:gaborulenius@gmail.com"
              startIcon={<EmailIcon />}
            >
              <FormattedMessage id="contactBtnEmail" />
            </Button>
            <Button
              variant="contained"
              component="a"
              href="https://www.linkedin.com/in/g%C3%A0bor-horv%C3%A0th-ulenius-07526719a/"
              target="_blank"
              startIcon={<LinkedInIcon />}
            >
              <FormattedMessage id="contactBtnLinkedIn" />
            </Button>
          </Stack>
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

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// TODO: Uncomments once needed

// const shorten = (url: string) => {
//   try {
//     const u = new URL(url);
//     const path = u.pathname.split("/").filter(Boolean).slice(0, 2).join("/");
//     return path ? `${u.host}/${path}…` : u.host;
//   } catch {
//     return url;
//   }
// };
