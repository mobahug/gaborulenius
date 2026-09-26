import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { FormattedMessage, useIntl } from "react-intl";
import { navLinks } from "./navConstants";
import { LanguageToggle } from "./LanguageToggle";
import { colors as lightColors } from "../../colors";
import { useActiveNavLink } from "../../hooks/useActiveNavLink";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  onOpen,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const theme = useTheme();
  const intl = useIntl();
  const { currentActiveSectionId, requestActiveSection } = useActiveNavLink();

  const drawerBackgroundColor = lightColors.drawerBg;
  const textColor = lightColors.textLight;
  const headingColor = lightColors.textHeading;
  const accentColor = lightColors.accent;
  const dividerColor = alpha(lightColors.dividerBg, 0.7);

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      disableSwipeToOpen
      swipeAreaWidth={0}
      transitionDuration={{ enter: 220, exit: 180 }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: {
            backgroundColor: alpha(lightColors.overlayBg, 0.6),
            backdropFilter: "blur(4px)",
          },
        },
      }}
      slotProps={{
        paper: {
          sx: {
            width: 280,
            bgcolor: drawerBackgroundColor,
            color: textColor,
            borderTopLeftRadius: theme.spacing(2.5),
            borderBottomLeftRadius: theme.spacing(2.5),
            boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.37)}`,
            p: theme.spacing(2, 0),
            willChange: "transform",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 1 }}>
        <IconButton
          onClick={onClose}
          aria-label="Close navigation menu"
          sx={{
            color: textColor,
          }}
        >
          <CloseIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>

      {/* Navigation List */}
      <List disablePadding sx={{ px: 1.5 }}>
        {navLinks.map(({ id, href }) => {
          const isActive = currentActiveSectionId === href;

          return (
            <ListItem key={id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component="a"
                href={href}
                selected={isActive}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  requestActiveSection(href);
                  onClose();
                }}
                sx={{
                  py: 1.25,
                  px: 2,
                  borderRadius: 0.5,
                  transition:
                    "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: alpha(accentColor, 0.12),
                    color: accentColor,
                  },
                  "&.Mui-selected": {
                    backgroundColor: alpha(accentColor, 0.16),
                    boxShadow: `inset 3px 0 0 ${accentColor}`,
                    color: accentColor,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: alpha(accentColor, 0.2),
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: alpha(accentColor, 0.2),
                    boxShadow: `0 0 0 2px ${alpha(accentColor, 0.5)} inset`,
                  },
                }}
              >
                <ListItemText
                  primary={<FormattedMessage id={id} />}
                  slotProps={{
                    primary: {
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "inherit",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ bgcolor: dividerColor, mx: 2.5, my: 2 }} />

      {/* Social Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          px: 2.5,
          my: 1,
        }}
      >
        {[
          {
            href: "mailto:gaborulenius@gmail.com",
            label: "Email",
            icon: <EmailRoundedIcon />,
          },
          {
            href: "https://www.linkedin.com/in/g%C3%A0bor-horv%C3%A0th-ulenius-07526719a/",
            label: "LinkedIn",
            icon: <LinkedInIcon />,
          },
          {
            href: "https://github.com/mobahug",
            label: "GitHub",
            icon: <GitHubIcon />,
          },
        ].map((social) => (
          <IconButton
            key={social.label}
            component="a"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            sx={{
              color: alpha(textColor, 0.7),
              transition: "color 0.2s ease, transform 0.2s ease",
              "&:hover": {
                color: accentColor,
                transform: "scale(1.15)",
              },
            }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Box>

      <Divider sx={{ bgcolor: dividerColor, mx: 2.5, my: 2 }} />

      {/* Settings Section */}
      <Stack spacing={2} sx={{ px: 3.5 }}>
        <Typography variant="h6" sx={{ color: headingColor }}>
          <FormattedMessage id="headingSettings" />
        </Typography>

        {/* Sound & Language */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1 }}
        >
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
          <LanguageToggle size="small" />
        </Stack>
      </Stack>
    </SwipeableDrawer>
  );
};

export default MobileDrawer;
