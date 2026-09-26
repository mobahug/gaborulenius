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
  titleId: string;
  events: TimelineEvent[];
  onClick: (evt: TimelineEvent) => void;
  isSmallScreen: boolean;
};

export const TimelineBlock: React.FC<TimelineBlockProps> = ({
  titleId,
  events,
  onClick,
  isSmallScreen,
}) => {
  return (
    <div>
      <Typography
        id={`${titleId}-heading`}
        variant="h4"
        component="h2"
        className="film-part trail-heading"
      >
        <FormattedMessage id={titleId} />
      </Typography>

      <Timeline
        position={isSmallScreen ? "right" : "alternate"}
        sx={{
          padding: 0,
          "& .MuiTimelineItem-root:before": {
            display: isSmallScreen ? "none" : undefined,
          },
        }}
      >
        {events.map((evt, i) => (
          <TimelineItem key={evt.titleId} className="film-part">
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
              onClick={() => onClick(evt)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onClick(evt);
                }
              }}
              role="button"
              tabIndex={0}
              sx={{
                "&:focus-visible": {
                  outline: (theme) => `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                  borderRadius: 0.5,
                },
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,.04)",
                  borderRadius: 0.5,
                  boxShadow: "0 2px 8px rgba(0,0,0,.25)",
                },
              }}
            >
              <Typography
                variant="subtitle2"
                component="h3"
                className="trail-event-title"
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
                <Box component="span" sx={{ fontSize: "0.92rem" }}>
                  <FormattedMessage id={evt.whenId} />
                </Box>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};
