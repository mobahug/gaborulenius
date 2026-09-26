import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { TimelineEvent, highlightedEvents, allEvents } from "../../contexts";
import { Transition } from "../Sections";
import { colors as lightColors } from "../../colors";
import CloseIcon from "@mui/icons-material/Close";
import { TimelineBlock } from "./TimelineBlock";
import { prefersReducedMotion } from "../../journey/device";
import { holdProgress } from "../../journey/film/holdProgress";
import { clamp, smoothstep } from "../../journey/math";
import { requestSceneFrame } from "../../journey/scrollTimeline";
import { useScene } from "../../journey/useScene";

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

/**
 * Experience and qualifications over the office film: no panel, only the
 * veil behind the words, like every block over the films (see `film.css`).
 */
const QualificationSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null,
  );
  const [tabIndex, setTabIndex] = useState(0);
  const trailRef = useRef<HTMLElement>(null);

  // "The Trail": while the timeline is on screen the walker goes from its
  // first waypoint to its last; the path behind lights up and each
  // waypoint glows once reached. It follows the block's time on screen
  // (see FilmSection), not positions, so it reads no layout.
  const walkedRef = useRef(-1);
  useScene(trailRef, (frame) => {
    const section = trailRef.current;
    if (!section || !frame.near) return;
    const block = section.closest<HTMLElement>(".film-cue");
    const progress = block ? (holdProgress.get(block) ?? 0) : 1;
    const dots = section.querySelectorAll<HTMLElement>(".trail-dot");
    const stops = Math.max(1, dots.length - 1);
    const walked = prefersReducedMotion()
      ? stops
      : Math.round(smoothstep(0.1, 0.75, progress) * stops * 1000) / 1000;
    if (walked === walkedRef.current) return;
    walkedRef.current = walked;
    section
      .querySelectorAll<HTMLElement>(".trail-fill")
      .forEach((fill, index) => {
        fill.style.transform = `scaleY(${clamp(walked - index).toFixed(3)})`;
      });
    dots.forEach((dot, index) =>
      dot.classList.toggle("trail-dot--reached", walked >= index - 0.001),
    );
  });
  // The other tab has its own waypoints: draw its trail at once.
  useEffect(() => {
    walkedRef.current = -1;
    requestSceneFrame();
  }, [tabIndex]);

  const handleOpen = (evt: TimelineEvent) => {
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
        component="section"
        ref={trailRef}
        aria-label="Experience and qualifications"
        className="trail-panel trail-panel--overlay"
        sx={{
          pt: 0,
          width: "100%",
          borderRadius: 0,
          background: "none",
          backgroundImage: "none",
          backdropFilter: "none",
          border: "none",
          boxShadow: "none",
          "&:hover": { transform: "none" },
        }}
      >
        <Tabs
          className="film-part"
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
          <TimelineBlock
            titleId="qualificationHeadingHighlights"
            events={highlightedEvents}
            onClick={handleOpen}
            isSmallScreen={isSmallScreen}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <TimelineBlock
            titleId="qualificationHeadingTimeline"
            events={allEvents}
            onClick={handleOpen}
            isSmallScreen={isSmallScreen}
          />
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
  const intl = useIntl();
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
            pt: 2,
            pb: 0,
            maxWidth: "750px",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        },
      }}
      aria-labelledby="qualification-dialog-title"
    >
      <DialogTitle
        id="qualification-dialog-title"
        component="h3"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          p: 0,
          pb: 5,
          color: lightColors.textHeading,
        }}
      >
        <FormattedMessage id={event?.titleId} />
        <IconButton
          onClick={onClose}
          aria-label={intl.formatMessage({ id: "buttonClose" })}
          sx={{
            top: 2,
            right: -5,
            color: lightColors.textLight,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 0 }}>
        <DialogContentText
          component="div"
          sx={{
            color: lightColors.textLight,
          }}
        >
          {event?.details}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ py: 4 }}>
        <Button variant="contained" onClick={onClose}>
          <FormattedMessage id="buttonClose" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QualificationSection;
