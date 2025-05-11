import {
  TimelineItem,
  Timeline,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import {
  Box,
  useMediaQuery,
  Paper,
  Tabs,
  Tab,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { TimelineEvent, highlightedEvents, allEvents } from "../../contexts";
import { fadeUp, Transition } from "../Sections";
import { colors as lightColors } from "../../colors";
import { colors as darkColors } from "../../colorsDark";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const MotionTimelineItem = motion.create(TimelineItem);

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const QualificationSection = ({
  innerRef,
}: {
  innerRef: React.Ref<HTMLDivElement>;
}) => {
  const theme = useTheme();
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
      <Paper
        id="experience"
        ref={innerRef}
        sx={{ pt: 0, width: { xs: "100%", md: "80%" }, mx: "auto" }}
      >
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
              <Typography variant="h4" gutterBottom>
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
                        boxShadow: `0 0 8px ${alpha(theme.palette.mode === "dark" ? darkColors.accent : lightColors.accent, 0.5)}`,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? darkColors.btnBg
                            : lightColors.btnBg,
                        color:
                          theme.palette.mode === "dark"
                            ? darkColors.textLight
                            : lightColors.textLight,
                        border: `2px solid ${
                          theme.palette.mode === "dark"
                            ? darkColors.accent
                            : lightColors.accent
                        }`,
                      }}
                      variant="outlined"
                    >
                      {evt.icon}
                    </TimelineDot>
                    {i < highlightedEvents.length - 1 && (
                      <TimelineConnector
                        sx={{
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? darkColors.dividerBg
                              : lightColors.dividerBg,
                        }}
                      />
                    )}
                  </TimelineSeparator>

                  <TimelineContent
                    onClick={handleOpen(evt)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700 }}
                      gutterBottom
                    >
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
                      <CalendarMonthIcon sx={{ fontSize: 18 }} />
                      <Box component="span" sx={{ fontSize: "0.9rem" }}>
                        <FormattedMessage id={evt.whenId} />
                      </Box>
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
              <Typography variant="h4" gutterBottom>
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
                        boxShadow: `0 0 8px ${alpha(theme.palette.mode === "dark" ? darkColors.accent : lightColors.accent, 0.5)}`,
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? darkColors.btnBg
                            : lightColors.btnBg,
                        color:
                          theme.palette.mode === "dark"
                            ? darkColors.textLight
                            : lightColors.textLight,
                        border: `2px solid ${
                          theme.palette.mode === "dark"
                            ? darkColors.accent
                            : lightColors.accent
                        }`,
                      }}
                      variant="outlined"
                    >
                      {evt.icon}
                    </TimelineDot>
                    {i < allEvents.length - 1 && (
                      <TimelineConnector
                        sx={{
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? darkColors.dividerBg
                              : lightColors.dividerBg,
                        }}
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent
                    onClick={handleOpen(evt)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700 }}
                      gutterBottom
                    >
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
                      <CalendarMonthIcon sx={{ fontSize: 18 }} />
                      <Box component="span" sx={{ fontSize: "0.9rem" }}>
                        <FormattedMessage id={evt.whenId} />
                      </Box>
                    </Box>
                  </TimelineContent>
                </MotionTimelineItem>
              ))}
            </Timeline>
          </motion.div>
        </TabPanel>
      </Paper>
      <QualificationDialog
        open={open}
        onClose={handleClose}
        event={selectedEvent}
      />
    </>
  );
};

type QualificationDialogProps = {
  open: boolean;
  onClose: () => void;
  event: TimelineEvent | null;
};

const QualificationDialog: React.FC<QualificationDialogProps> = ({
  open,
  onClose,
  event,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        transition: { timeout: { appear: 600, enter: 600, exit: 600 } },
        paper: {
          sx: {
            maxWidth: "750px",
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
          color:
            theme.palette.mode === "dark"
              ? darkColors.textHeading
              : lightColors.textHeading,
        }}
      >
        <FormattedMessage id={event?.titleId} />
        <IconButton
          onClick={onClose}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 1 }}>
        <DialogContentText
          component="div"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? darkColors.textLight
                : lightColors.textLight,
          }}
        >
          {event?.details}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? darkColors.accent
                : lightColors.accent,
          }}
        >
          <FormattedMessage id="buttonClose" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QualificationSection;
