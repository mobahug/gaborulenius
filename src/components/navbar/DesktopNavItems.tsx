import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useIntl } from "react-intl";
import { LanguageToggle } from "./LanguageToggle";
import { QuickReadToggle } from "./QuickReadToggle";
import { colors as lightColors } from "../../colors";
import { useActiveNavLink } from "../../hooks/useActiveNavLink";
import { assetUrl } from "../../utils/assets";

type DesktopNavItemsProps = {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
};

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({
  isPlayingAudio,
  onToggleAudio,
}) => {
  const intl = useIntl();
  const { requestActiveSection } = useActiveNavLink();

  // The sections are on the rail at the right edge (SectionRail); the bar
  // keeps who this is, quick read, the language and the sound.
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <MuiLink
        href="#home"
        underline="none"
        aria-label={intl.formatMessage({ id: "navHome" })}
        onClick={() => requestActiveSection("#home")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 1,
          color: lightColors.textLight,
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        <Avatar
          src={assetUrl("profile-160.webp")}
          alt=""
          sx={{
            width: 34,
            height: 34,
            border: `1.5px solid ${lightColors.accent}`,
          }}
        />
        <Box
          component="span"
          sx={{
            fontSize: "0.95rem",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          Gábor Ulenius
        </Box>
      </MuiLink>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <QuickReadToggle />
        <LanguageToggle />
        <IconButton
          color="inherit"
          onClick={onToggleAudio}
          aria-label={intl.formatMessage({
            id: isPlayingAudio ? "navAudioPause" : "navAudioPlay",
          })}
        >
          {isPlayingAudio ? (
            <PauseCircleOutlineIcon sx={{ fontSize: 28 }} />
          ) : (
            <PlayCircleOutlineIcon sx={{ fontSize: 28 }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default DesktopNavItems;
