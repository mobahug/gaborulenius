import React from "react";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import SubjectIcon from "@mui/icons-material/Subject";
import { useIntl } from "react-intl";
import { colors } from "../../colors";
import {
  canSwitchQuickRead,
  isQuickRead,
  setQuickRead,
} from "../../journey/quickRead";

type QuickReadToggleProps = {
  sx?: SxProps<Theme>;
};

/**
 * Quick read on or off (the cover has its twin): the whole portfolio on one
 * calm page, or the film journey. Pressed, in gold, while it is on.
 */
export const QuickReadToggle: React.FC<QuickReadToggleProps> = ({ sx }) => {
  const intl = useIntl();
  if (!canSwitchQuickRead()) return null;
  const on = isQuickRead();

  return (
    <Button
      size="small"
      variant="outlined"
      aria-pressed={on}
      title={intl.formatMessage({ id: on ? "quickReadOff" : "quickReadOn" })}
      startIcon={<SubjectIcon />}
      onClick={() => setQuickRead(!on)}
      sx={{
        // As tall as the language switch beside it.
        minHeight: 34,
        py: 0.5,
        px: 1.75,
        fontSize: "0.8rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
        color: on ? colors.accentHover : colors.textLight,
        backgroundColor: on ? colors.btnBgHover : colors.btnBg,
        backdropFilter: "blur(10px)",
        "& .MuiButton-startIcon": { color: colors.accent },
        "&:hover": {
          backgroundColor: colors.btnBgHover,
          color: colors.accentHover,
        },
        ...sx,
      }}
    >
      {intl.formatMessage({ id: "quickRead" })}
    </Button>
  );
};
