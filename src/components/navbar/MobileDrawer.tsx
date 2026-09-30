import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { FormattedMessage, useIntl } from "react-intl";
import { navLinks, partOnScreen } from "./navConstants";
import { LanguageToggle } from "./LanguageToggle";
import { colors as lightColors } from "../../colors";
import { useActiveNavLink } from "../../hooks/useActiveNavLink";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../../seo";

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
  // Each time it opens: the current section shows its parts, the one on
  // screen lit (the page does not scroll while the menu is open).
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activePart, setActivePart] = useState<string | null>(null);
  useEffect(() => {
    if (!open) return;
    setExpanded(currentActiveSectionId);
    setActivePart(partOnScreen());
  }, [open, currentActiveSectionId]);

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
      }}
      slotProps={{
        paper: {
          sx: {
            width: 288,
            background: drawerBackgroundColor,
            backdropFilter: "blur(18px) saturate(1.15)",
            color: textColor,
            border: "none",
            borderLeft: `1px solid ${lightColors.glassBorder}`,
            borderRadius: 0,
            borderTopLeftRadius: theme.spacing(5),
            borderBottomLeftRadius: theme.spacing(5),
            boxShadow: `0 8px 40px 0 ${alpha(theme.palette.common.black, 0.45)}`,
            p: theme.spacing(2, 0),
            willChange: "transform",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 1 }}>
        <IconButton
          onClick={onClose}
          aria-label={intl.formatMessage({ id: "navCloseMenu" })}
          sx={{
            color: textColor,
          }}
        >
          <CloseIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Box>

      {/* Navigation: the sections, each with its parts (grouped by
          project), so any of them is a tap away. */}
      <List disablePadding sx={{ px: 1.5 }}>
        {navLinks.map(({ id, href, children }) => {
          const isActive = currentActiveSectionId === href;
          const isExpanded = expanded === href && !!children;
          const section = intl.formatMessage({ id });
          let inGroup = false;

          return (
            <ListItem
              key={id}
              disablePadding
              sx={{ mb: 0.5, display: "block" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
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
                    borderRadius: 3,
                    color: isActive ? textColor : lightColors.textMuted,
                    transition:
                      "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: alpha(accentColor, 0.12),
                      color: accentColor,
                    },
                    "&.Mui-selected": {
                      backgroundColor: alpha(accentColor, 0.12),
                      boxShadow: `inset 2px 0 0 ${accentColor}`,
                      color: textColor,
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
                    primary={section}
                    slotProps={{
                      primary: {
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "inherit",
                      },
                    }}
                  />
                </ListItemButton>
                {children ? (
                  <IconButton
                    onClick={() => setExpanded(isExpanded ? null : href)}
                    aria-expanded={isExpanded}
                    aria-controls={`menu-parts-${id}`}
                    aria-label={intl.formatMessage(
                      { id: isExpanded ? "navHideParts" : "navShowParts" },
                      { section },
                    )}
                    sx={{ color: lightColors.textMuted }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transition: "transform 0.2s ease",
                        transform: isExpanded ? "rotate(180deg)" : "none",
                      }}
                    />
                  </IconButton>
                ) : null}
              </Box>
              {children ? (
                <Collapse in={isExpanded} timeout={200}>
                  <List
                    id={`menu-parts-${id}`}
                    disablePadding
                    sx={{ pt: 0.25, pb: 0.75 }}
                  >
                    {children.map((part) => {
                      if (part.group) inGroup = true;
                      const indent = part.group || !inGroup ? 3.5 : 5;
                      const here = activePart === part.href;
                      return (
                        <ListItemButton
                          key={part.id}
                          component="a"
                          href={part.href}
                          aria-current={here ? "location" : undefined}
                          onClick={() => {
                            requestActiveSection(href);
                            onClose();
                          }}
                          sx={{
                            minHeight: 40,
                            py: 0.5,
                            pl: indent,
                            pr: 2,
                            borderRadius: 3,
                            color: here
                              ? accentColor
                              : part.group
                                ? alpha(accentColor, 0.78)
                                : lightColors.textMuted,
                            "&:hover": {
                              backgroundColor: alpha(accentColor, 0.1),
                              color: accentColor,
                            },
                          }}
                        >
                          <ListItemText
                            primary={<FormattedMessage id={part.id} />}
                            slotProps={{
                              primary: part.group
                                ? {
                                    fontWeight: 700,
                                    fontSize: "0.72rem",
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "inherit",
                                  }
                                : {
                                    fontWeight: here ? 600 : 500,
                                    fontSize: "0.9rem",
                                    color: "inherit",
                                  },
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              ) : null}
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
            href: `mailto:${EMAIL}`,
            label: "Email",
            icon: <EmailRoundedIcon />,
          },
          {
            href: LINKEDIN_URL,
            label: "LinkedIn",
            icon: <LinkedInIcon />,
          },
          {
            href: GITHUB_URL,
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
        <Typography
          variant="overline"
          sx={{ color: headingColor, letterSpacing: "0.14em", fontWeight: 700 }}
        >
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
