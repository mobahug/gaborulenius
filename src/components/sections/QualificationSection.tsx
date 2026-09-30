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
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useAtom } from "jotai";
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
import {
  experienceTabAtom,
  selectedEventAtom,
} from "../../hooks/experienceAtoms";

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

/** Wide enough for the chosen event's details beside the timeline, instead
 * of in a dialog. */
const SPLIT_QUERY = "(min-width: 900px)";

/**
 * Experience and qualifications over the office film: no panel, only the
 * veil behind the words, like every block over the films (see `film.css`).
 * On wider screens the chosen event's story is told beside the timeline (the
 * career dial can choose it too); on phones it opens in a dialog. The list
 * keeps its height whichever tab is open (it scrolls inside), so switching
 * tabs never moves the block, or the page.
 */
const QualificationSection = () => {
  const intl = useIntl();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const split = useMediaQuery(SPLIT_QUERY, { noSsr: true });
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useAtom(selectedEventAtom);
  const [tabIndex, setTabIndex] = useAtom(experienceTabAtom);
  const trailRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const events = tabIndex === 0 ? highlightedEvents : allEvents;
  // The chosen event, or the latest one.
  const selectedEvent =
    events.find((evt) => evt.titleId === selectedId) ?? events[0];

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

  // An event chosen elsewhere (on the career dial) is brought into the
  // list's view — the list scrolls, never the page.
  useEffect(() => {
    const list = listRef.current;
    if (!split || !list || !selectedId) return;
    const item = list.querySelector<HTMLElement>(
      `[data-event="${selectedId}"]`,
    );
    if (!item) return;
    const bounds = list.getBoundingClientRect();
    const place = item.getBoundingClientRect();
    if (place.top >= bounds.top && place.bottom <= bounds.bottom) return;
    list.scrollTo({
      top: list.scrollTop + place.top - bounds.top - 12,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [split, selectedId, tabIndex]);

  const handleSelect = (evt: TimelineEvent) => {
    setSelectedId(evt.titleId);
    if (!split) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    listRef.current?.scrollTo({ top: 0 });
  };

  return (
    <>
      <Paper
        component="section"
        ref={trailRef}
        aria-label={intl.formatMessage({ id: "qualificationLabel" })}
        className={`trail-panel trail-panel--overlay${split ? " trail-panel--split" : ""}`}
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
        <Typography
          variant="h4"
          component="h2"
          className="film-part trail-heading"
        >
          <FormattedMessage
            id={
              tabIndex === 0
                ? "qualificationHeadingHighlights"
                : "qualificationHeadingTimeline"
            }
          />
        </Typography>
        <div className="trail-split">
          <div className="trail-master film-part">
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label={intl.formatMessage({ id: "qualificationTabs" })}
              centered
              variant="fullWidth"
              sx={{
                p: 2,
                pt: 0,
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
            <div ref={listRef} className="trail-list">
              {[highlightedEvents, allEvents].map((list, index) => (
                <TabPanel key={index} value={tabIndex} index={index}>
                  <TimelineBlock
                    events={list}
                    onSelect={handleSelect}
                    position={split || isSmallScreen ? "right" : "alternate"}
                    selectedId={split ? selectedEvent.titleId : undefined}
                    controls="trail-details"
                  />
                </TabPanel>
              ))}
            </div>
          </div>
          {split ? <TrailDetails event={selectedEvent} /> : null}
        </div>
      </Paper>
      {split ? null : (
        <QualificationDialog
          open={open}
          onClose={handleClose}
          event={selectedEvent}
        />
      )}
    </>
  );
};

/**
 * The chosen event's story, beside the timeline: it fades in, as the blocks
 * do, whenever another is chosen, and scrolls inside when it is long.
 */
const TrailDetails = ({ event }: { event: TimelineEvent }) => (
  <aside
    id="trail-details"
    className="trail-details film-part"
    aria-labelledby="trail-details-title"
  >
    <div key={event.titleId} className="trail-details-scroll">
      <Box
        component="p"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          m: 0,
          mb: 1,
          color: "primary.main",
          fontSize: "0.92rem",
        }}
      >
        <CalendarMonthIcon sx={{ fontSize: 18 }} />
        <FormattedMessage id={event.whenId} />
      </Box>
      <Typography
        id="trail-details-title"
        variant="h5"
        component="h3"
        className="trail-details-title"
      >
        <FormattedMessage id={event.titleId} />
      </Typography>
      <div className="trail-details-body">{event.details}</div>
    </div>
  </aside>
);

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
