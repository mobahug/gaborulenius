import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { TimelineEvent } from "../../contexts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { colors as lightColors } from "../../colors";

type TimelineBlockProps = {
  events: TimelineEvent[];
  onSelect: (evt: TimelineEvent) => void;
  /** One column beside the dots, or alternating on either side. */
  position: "right" | "alternate";
  /** The event shown beside the timeline, when its details are shown there
   * (instead of in a dialog). */
  selectedId?: string;
  /** Where the chosen event's details are shown (its id). */
  controls?: string;
};

export const TimelineBlock: React.FC<TimelineBlockProps> = ({
  events,
  onSelect,
  position,
  selectedId,
  controls,
}) => {
  // Chosen in place: the details are beside the timeline. Otherwise they
  // open in a dialog.
  const inPlace = selectedId !== undefined;
  return (
    <Timeline
      position={position}
      sx={{
        m: 0,
        padding: 0,
        "& .MuiTimelineItem-root:before": {
          display: position === "right" ? "none" : undefined,
        },
      }}
    >
      {events.map((evt, i) => {
        const selected = inPlace && evt.titleId === selectedId;
        return (
          <TimelineItem key={evt.titleId} data-event={evt.titleId}>
            <TimelineSeparator>
              <TimelineDot
                className="trail-dot"
                sx={{
                  boxShadow: `0 0 8px ${alpha(lightColors.accent, 0.5)}`,
                  bgcolor: lightColors.btnBg,
                  color: lightColors.textLight,
                  border: `2px solid ${lightColors.accent}`,
                }}
                variant="outlined"
              >
                {evt.icon}
              </TimelineDot>
              {i < events.length - 1 && (
                <TimelineConnector
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: lightColors.dividerBg,
                  }}
                >
                  <span className="trail-fill" aria-hidden="true" />
                </TimelineConnector>
              )}
            </TimelineSeparator>

            <TimelineContent
              onClick={() => onSelect(evt)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(evt);
                }
              }}
              role="button"
              tabIndex={0}
              aria-current={selected ? "true" : undefined}
              aria-controls={inPlace ? controls : undefined}
              className={selected ? "is-selected" : undefined}
              sx={{
                "&:focus-visible": {
                  outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                  borderRadius: 0.5,
                },
                cursor: "pointer",
                borderRadius: 0.5,
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,.04)",
                  boxShadow: "0 2px 8px rgba(0,0,0,.25)",
                },
                // The chosen one: tinted, with a gold edge on the side of
                // its story (beside the timeline).
                ...(selected && {
                  "&, &:hover": {
                    backgroundColor: alpha(lightColors.accent, 0.08),
                    boxShadow: `inset -2px 0 0 ${lightColors.accent}`,
                  },
                  "& .trail-event-title": { color: lightColors.accent },
                }),
              }}
            >
              <Typography
                variant="subtitle2"
                component="h3"
                className="trail-event-title"
                gutterBottom
              >
                <FormattedMessage id={evt.titleId} />
                {inPlace ? null : (
                  <>
                    {" "}
                    <OpenInNewIcon sx={{ fontSize: 16 }} />
                  </>
                )}
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
                <Box component="span" sx={{ fontSize: "0.92rem" }}>
                  <FormattedMessage id={evt.whenId} />
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};
