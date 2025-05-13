import React from "react";
import {
  Box,
  IconButton,
  Avatar,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { FormattedMessage } from "react-intl";
import { navLinks } from "./navConstants";
import { LanguageToggle } from "./LanguageToggle";
import { colors as lightColors } from "../../colors";
import { colors as darkColors } from "../../colorsDark";
import { useActiveNavLink } from "../../hooks/useActiveNavLink";

type DesktopNavItemsProps = {
  selectedThemeVariant: "light" | "dark";
  onToggleTheme: () => void;
  onOpenSettings: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
};

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({
  selectedThemeVariant,
  onToggleTheme,
  onOpenSettings,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const theme = useTheme();
  const { currentActiveSectionId, setActiveSectionId } = useActiveNavLink();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
      <LanguageToggle />
      {navLinks.map(({ id, href }) => {
        const isActive = currentActiveSectionId === href;
        return (
          <MuiLink
            key={id}
            href={href}
            underline="none"
            onClick={() => {
              setActiveSectionId(href);
            }}
            sx={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: isActive
                ? theme.palette.mode === "dark"
                  ? darkColors.accent
                  : lightColors.accent
                : theme.palette.mode === "dark"
                  ? darkColors.textLight
                  : lightColors.textLight,
              position: "relative",
              "&:hover": {
                color:
                  theme.palette.mode === "dark"
                    ? darkColors.accentHover
                    : lightColors.accentHover,
              },
              "&::after": isActive
                ? {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: "100%",
                    height: 2,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? darkColors.accent
                        : lightColors.accent,
                  }
                : undefined,
            }}
          >
            <FormattedMessage id={id} />
          </MuiLink>
        );
      })}
      <IconButton color="inherit" onClick={onToggleTheme}>
        {selectedThemeVariant === "dark" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <MuiLink underline="none">
        <Box
          sx={{
            position: "relative",
            width: 35,
            height: 35,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Avatar
            src="/gaborulenius/profile-small.webp"
            alt="Profile"
            sx={{
              width: 35,
              height: 35,
              border: `2px solid ${theme.palette.mode === "dark" ? darkColors.accent : lightColors.accent}`,
            }}
          />
          <IconButton
            onClick={onOpenSettings}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              bgcolor: "rgba(0,0,0,0)",
              transition: "background-color 0.3s, opacity 0.5s",
              opacity: 0,
              "&:hover": { bgcolor: "rgba(0,0,0,0.5)", opacity: 1 },
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </MuiLink>
      <IconButton color="inherit" onClick={onToggleAudio}>
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
