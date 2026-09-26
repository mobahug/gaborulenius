import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import { alpha } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { FormattedMessage, useIntl } from "react-intl";
import { navLinks } from "./navConstants";
import { LanguageToggle } from "./LanguageToggle";
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
  const { currentActiveSectionId, requestActiveSection } = useActiveNavLink();
  const activeColor = lightColors.accent;
  const activeHoverColor = lightColors.accentHover;
  const inactiveColor = lightColors.textLight;

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: { md: 2.5, lg: 4 } }}
    >
      <LanguageToggle />
      {navLinks.map(({ id, href }) => {
        const isActive = currentActiveSectionId === href;
        return (
          <MuiLink
            key={id}
            href={href}
            underline="none"
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              requestActiveSection(href);
            }}
            sx={{
              fontSize: "0.9rem",
              fontWeight: 700,
              whiteSpace: "nowrap",
              color: isActive ? activeColor : inactiveColor,
              position: "relative",
              transition: "color 0.18s ease, background-color 0.18s ease",
              "&:hover": {
                color: activeHoverColor,
                backgroundColor: alpha(activeColor, 0.08),
              },
              "&:focus-visible": {
                outline: `2px solid ${alpha(activeColor, 0.55)}`,
                outlineOffset: 3,
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 4,
                left: 12,
                width: "calc(100% - 24px)",
                height: 2,
                borderRadius: 1,
                backgroundColor: activeColor,
                transform: isActive ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "center",
                transition: "transform 0.18s ease",
              },
            }}
          >
            <FormattedMessage id={id} />
          </MuiLink>
        );
      })}
      <MuiLink
        href="#home"
        underline="none"
        aria-label={intl.formatMessage({ id: "navHome" })}
      >
        <Avatar
          src={assetUrl("profile-160.webp")}
          alt=""
          sx={{
            width: 35,
            height: 35,
            border: `2px solid ${lightColors.accent}`,
          }}
        />
      </MuiLink>
      <IconButton
        color="inherit"
        onClick={onToggleAudio}
        aria-label={intl.formatMessage({
          id: isPlayingAudio ? "navAudioPause" : "navAudioPlay",
        })}
      >
        {isPlayingAudio ? (
          <PauseCircleOutlineIcon sx={{ fontSize: 32 }} />
        ) : (
          <PlayCircleOutlineIcon sx={{ fontSize: 32 }} />
        )}
      </IconButton>
    </Box>
  );
};

export default DesktopNavItems;
