import React from "react";
import Button from "@mui/material/Button";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import SubjectIcon from "@mui/icons-material/Subject";
import { useIntl } from "react-intl";
import { colors } from "../../colors";
import { setQuickRead } from "../../journey/quickRead";

/** The two pages of the portfolio. */
export type PageMode = "journey" | "quick";

type ModeButtonProps = {
  /** The page this is; the button leads to the other one. */
  mode: PageMode;
  compact: boolean;
};

/**
 * Quick read from the journey, the film journey from quick read. One width
 * for both labels in both languages, so the button — and everything beside
 * it — stands in the same place on either page.
 */
export const ModeButton: React.FC<ModeButtonProps> = ({ mode, compact }) => {
  const intl = useIntl();
  const toQuickRead = mode === "journey";
  const label = intl.formatMessage({
    id: toQuickRead ? "quickRead" : "qrFilmJourney",
  });

  return (
    <Button
      size="small"
      variant="outlined"
      aria-label={label}
      title={intl.formatMessage({
        id: toQuickRead ? "quickReadOn" : "quickReadOff",
      })}
      startIcon={toQuickRead ? <SubjectIcon /> : <MovieOutlinedIcon />}
      onClick={() => setQuickRead(toQuickRead)}
      sx={{
        minWidth: compact ? 148 : 156,
        // A thumb's size on phones, like the round buttons beside it.
        minHeight: compact ? 44 : 34,
        py: 0.5,
        px: 1.5,
        justifyContent: "center",
        fontSize: compact ? "0.85rem" : "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        color: colors.textLight,
        backgroundColor: colors.floatBg,
        backdropFilter: "blur(10px)",
        "& .MuiButton-startIcon": { color: colors.accent },
        "&:hover": {
          backgroundColor: colors.btnBgHover,
          color: colors.accentHover,
        },
        // The narrowest phones keep the icon (the label names it still).
        "@media (max-width: 359.95px)": {
          minWidth: 44,
          px: 1,
          "& .mode-label": { display: "none" },
          "& .MuiButton-startIcon": { m: 0 },
        },
      }}
    >
      <span className="mode-label">{label}</span>
    </Button>
  );
};
