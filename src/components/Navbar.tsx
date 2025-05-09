import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
  Box,
  useTheme,
  useMediaQuery,
  Slide,
  FormControlLabel,
  Switch,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ButtonGroup,
  ButtonGroupProps,
  Theme,
  SxProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { colors as lightColors } from "../colors";
import { colors as darkColors } from "../colorsDark";
import { useBirdEffect } from "../hooks/useBirdEffect";
import { useLeavesEffect } from "../hooks/useLeavesEffect";
import SettingsIcon from "@mui/icons-material/Settings";
import { Transition } from "./Sections";
import { useAtom } from "jotai";
import { localeAtom } from "../hooks/localeAtom";
import { FormattedMessage } from "react-intl";
import { useThemeToggle } from "../hooks/useThemeToggle";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const COVER_THRESHOLD = 300;

type ShowAfterCoverProps = { children: React.ReactElement };

const navLinks = [
  { id: "navHome", href: "#home" },
  { id: "navAbout", href: "#about" },
  { id: "navProjects", href: "#projects" },
  { id: "navSkills", href: "#skills-tools" },
  { id: "navContact", href: "#contact" },
];

type TabKey = "effects" | "appearance" | "language";

const tabConfig: { key: TabKey; id: string }[] = [
  { key: "effects", id: "tabsEffects" },
  { key: "appearance", id: "tabsAppearance" },
  { key: "language", id: "tabsLanguage" },
];

const NavBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { birdEnabled, toggleBirdEffects } = useBirdEffect();
  const { leavesEnabled, toggleLeavesEffects } = useLeavesEffect();
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("effects");
  const { selectedTheme, toggleTheme } = useThemeToggle();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const initializeAudio = useCallback(() => {
    const newSrc =
      selectedTheme === "dark"
        ? "/parallaxMui/jungle-music-night.mp3"
        : "/parallaxMui/jungle-music.mp3";

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = newSrc;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        });
      }
    } else {
      audioRef.current = new Audio(newSrc);
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        });
      }
    }
  }, [isPlaying, selectedTheme]);

  useEffect(() => {
    initializeAudio();
    return () => {
      audioRef.current?.pause();
    };
  }, [initializeAudio, selectedTheme]);

  const handlePlayPause = () => {
    if (!audioRef.current) {
      initializeAudio();
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            if (err.name !== "AbortError") console.error(err);
          });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (!isMobile && drawerOpen) setDrawerOpen(false);
  }, [isMobile, drawerOpen]);

  return (
    <>
      <ShowAfterCover>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            px: 2,
            borderRadius: 0,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            backdropFilter: "blur(10px)",
            height: isMobile ? "72px" : "64px",
            py: 0,
            justifyContent: "center",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: "72px",
              px: 1.5,
              py: 0,
              justifyContent: isMobile ? "space-between" : "center",
            }}
          >
            {isMobile ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <MuiLink href="#home" underline="none">
                  <Avatar
                    src="/parallaxMui/profile.jpg"
                    alt="Profile"
                    sx={{
                      width: 44,
                      height: 44,
                      border: `2px solid ${
                        theme.palette.mode === "dark"
                          ? darkColors.accent
                          : lightColors.accent
                      }`,
                    }}
                  />
                </MuiLink>
                <IconButton color="inherit" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseCircleOutlineIcon fontSize="large" />
                  ) : (
                    <PlayCircleOutlineIcon fontSize="large" />
                  )}
                </IconButton>
                {/* Menu on right */}
                <IconButton color="inherit" onClick={toggleDrawer(true)}>
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                <LanguageToggle />
                {navLinks.map(({ id, href }) => (
                  <MuiLink
                    key={id}
                    href={href}
                    underline="none"
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color:
                        theme.palette.mode === "dark"
                          ? darkColors.textLight
                          : lightColors.textLight,
                      position: "relative",
                      "&:hover": {
                        color:
                          theme.palette.mode === "dark"
                            ? darkColors.accentHover
                            : lightColors.accentHover,
                      },
                    }}
                  >
                    <FormattedMessage id={id} />
                  </MuiLink>
                ))}
                <IconButton color="inherit">
                  {selectedTheme === "dark" ? (
                    <LightModeOutlinedIcon onClick={toggleTheme} />
                  ) : (
                    <DarkModeOutlinedIcon onClick={toggleTheme} />
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
                      src="/parallaxMui/profile.jpg"
                      alt="Profile"
                      sx={{
                        width: 35,
                        height: 35,
                        border: `2px solid ${
                          theme.palette.mode === "dark"
                            ? darkColors.accent
                            : lightColors.accent
                        }`,
                      }}
                    />
                    <IconButton
                      onClick={handleOpen}
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
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.5)",
                          opacity: 1,
                        },
                      }}
                    >
                      <SettingsIcon />
                    </IconButton>
                  </Box>
                </MuiLink>
                <IconButton color="inherit" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseCircleOutlineIcon sx={{ fontSize: 32 }} />
                  ) : (
                    <PlayCircleOutlineIcon sx={{ fontSize: 32 }} />
                  )}
                </IconButton>
                <Dialog
                  slots={{ transition: Transition }}
                  slotProps={{
                    transition: {
                      timeout: { appear: 600, enter: 600, exit: 600 },
                    },
                    paper: {
                      sx: {
                        minWidth: 750,
                        py: 1,
                      },
                    },
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <DialogTitle sx={{ py: 4, px: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <SettingsIcon
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? darkColors.textHeading
                                : lightColors.textHeading,
                          }}
                        />
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? darkColors.textHeading
                                : lightColors.textHeading,
                          }}
                        >
                          <FormattedMessage id="settingsTitle" />
                        </Typography>
                      </Stack>

                      {/* Close button */}
                      <IconButton
                        onClick={handleClose}
                        aria-label="Close settings"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? darkColors.textLight
                              : lightColors.textLight,
                          "&:hover": {
                            color:
                              theme.palette.mode === "dark"
                                ? darkColors.accentHover
                                : lightColors.accentHover,
                          },
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    {/* thin divider under title */}
                  </DialogTitle>
                  <Divider />
                  <DialogContent dividers>
                    <Box sx={{ display: "flex", minHeight: 220 }}>
                      {/* Sidebar */}
                      <List
                        disablePadding
                        sx={{
                          width: 150,
                        }}
                      >
                        <Divider orientation="vertical" flexItem />
                        {tabConfig.map(({ key, id }) => (
                          <ListItemButton
                            sx={{
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius: 10,
                            }}
                            key={key}
                            selected={activeTab === key}
                            onClick={() => setActiveTab(key)}
                          >
                            <ListItemText
                              primary={<FormattedMessage id={id} />}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                      <Divider orientation="vertical" flexItem />

                      {/* Content panel */}
                      <Box sx={{ flex: 1, px: 4, py: 2 }}>
                        {activeTab === "effects" && (
                          <Stack spacing={3}>
                            <FormattedMessage id="effectsSubtitle" />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={birdEnabled}
                                  onChange={toggleBirdEffects}
                                  color="primary"
                                />
                              }
                              label={<FormattedMessage id="labelBirdCalls" />}
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={leavesEnabled}
                                  onChange={toggleLeavesEffects}
                                  color="primary"
                                />
                              }
                              label="Drifting Leaves"
                            />
                          </Stack>
                        )}

                        {activeTab === "appearance" && (
                          <Stack spacing={3}>
                            <FormattedMessage id="appearanceSubtitle" />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={theme.palette.mode === "dark"}
                                  onChange={toggleTheme}
                                  color="primary"
                                />
                              }
                              label={
                                <FormattedMessage id="labelNightfallMode" />
                              }
                            />
                            <FormattedMessage id="comingSoon" />
                          </Stack>
                        )}

                        {activeTab === "language" && (
                          <Stack spacing={3}>
                            <FormattedMessage id="languageSubtitle" />
                            {/* <LanguageSelect /> */}
                            <LanguageToggle />
                          </Stack>
                        )}
                      </Box>
                    </Box>
                  </DialogContent>

                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      size="large"
                    >
                      <FormattedMessage id="buttonClose" />
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ShowAfterCover>

      <Toolbar />

      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen
        swipeAreaWidth={0}
        transitionDuration={{ enter: 300, exit: 300 }}
        ModalProps={{
          BackdropProps: {
            style: {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? darkColors.overlayBg
                  : lightColors.overlayBg,
            },
          },
        }}
        slotProps={{
          paper: {
            sx: {
              p: 3,
              width: 260,
              bgcolor:
                theme.palette.mode === "dark"
                  ? darkColors.drawerBg
                  : lightColors.drawerBg,
              color:
                theme.palette.mode === "dark"
                  ? darkColors.textLight
                  : lightColors.textLight,
              borderRadius: 0,
              transition: "transform 300ms ease-in-out",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? darkColors.textLight
                    : lightColors.textLight,
                fontSize: 32,
              }}
            />
          </IconButton>
        </Box>
        <List disablePadding>
          {navLinks.map(({ id, href }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                component="a"
                href={href}
                onClick={toggleDrawer(false)}
              >
                <ListItemText
                  primary={<FormattedMessage id={id} />}
                  slotProps={{
                    primary: {
                      fontWeight: "bold",
                      color:
                        theme.palette.mode === "dark"
                          ? darkColors.textLight
                          : lightColors.textLight,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={{
            bgcolor:
              theme.palette.mode === "dark"
                ? darkColors.dividerBg
                : lightColors.dividerBg,
            my: 2,
          }}
        />
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: 2, p: 2 }}
        >
          <IconButton
            component="a"
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            aria-label="LinkedIn"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? darkColors.textLight
                  : lightColors.textLight,
            }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/mobahug"
            target="_blank"
            aria-label="GitHub"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? darkColors.textLight
                  : lightColors.textLight,
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
        <Divider
          sx={{
            bgcolor:
              theme.palette.mode === "dark"
                ? darkColors.dividerBg
                : lightColors.dividerBg,
            my: 2,
          }}
        />
        <Stack spacing={2} sx={{ px: 3, py: 2 }}>
          {/* Settings Header */}
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? darkColors.textHeading
                  : lightColors.textHeading,
              mb: 2,
            }}
          >
            <FormattedMessage id="headingSettings" />
          </Typography>

          {/* Theme & Language Controls */}
          <Stack direction="row" spacing={5} alignItems="center">
            <IconButton onClick={toggleTheme} color="inherit">
              {selectedTheme === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
            <LanguageToggle />
          </Stack>

          {/* Effects Section (without divider) */}
          <Typography
            variant="h6"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? darkColors.textHeading
                  : lightColors.textHeading,
            }}
          >
            <FormattedMessage id="headingEffects" defaultMessage="Effects" />
          </Typography>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={birdEnabled}
                  onChange={toggleBirdEffects}
                  color="primary"
                />
              }
              label={<FormattedMessage id="labelBird" />}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={leavesEnabled}
                  onChange={toggleLeavesEffects}
                  color="primary"
                />
              }
              label={<FormattedMessage id="labelLeaves" />}
            />
          </Stack>
        </Stack>
      </SwipeableDrawer>
    </>
  );
};

export default NavBar;

function ShowAfterCover({ children }: ShowAfterCoverProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > COVER_THRESHOLD);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Slide
      direction="down"
      in={visible}
      timeout={{ enter: 300, exit: 300 }}
      appear={false}
    >
      {children}
    </Slide>
  );
}

type LanguageToggleProps = Omit<ButtonGroupProps, "onChange"> & {
  sx?: SxProps<Theme>;
};

export function LanguageToggle({ sx, size = "small" }: LanguageToggleProps) {
  const [locale, setLocale] = useAtom(localeAtom);

  return (
    <ButtonGroup
      size={size}
      aria-label="language switcher"
      variant="contained"
      sx={{
        boxShadow: "none",
        "& .MuiButton-root": {
          px: 1,
          py: 1,
          fontSize: "0.9rem",
        },
        ...sx,
      }}
    >
      <Button
        onClick={() => setLocale("en")}
        variant={locale === "en" ? "contained" : "outlined"}
      >
        EN
      </Button>
      <Button
        onClick={() => setLocale("fi")}
        variant={locale === "fi" ? "contained" : "outlined"}
      >
        FI
      </Button>
    </ButtonGroup>
  );
}
