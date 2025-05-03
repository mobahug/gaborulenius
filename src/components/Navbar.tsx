import React, { useState, useEffect } from "react";
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
import colors from "../colors";
import { useBirdEffect } from "../hooks/useBirdEffect";
import { useLeavesEffect } from "../hooks/useLeavesEffect";
import SettingsIcon from "@mui/icons-material/Settings";
import { Transition } from "./Sections";
import { useAtom } from "jotai";
import { localeAtom } from "../hooks/localeAtom";
import { FormattedMessage } from "react-intl";

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
  const handlePlayPause = () => setIsPlaying(p => !p);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("effects");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            backgroundColor: colors.navBg,
            height: isMobile ? "72px" : "80px",
            justifyContent: "center",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: "72px",
              px: 3.5,
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
                      border: `2px solid ${colors.accent}`,
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
                <LanguageToggle />
                {navLinks.map(({ id, href }) => (
                  <MuiLink
                    key={id}
                    href={href}
                    underline="none"
                    sx={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: colors.textLight,
                      position: "relative",
                      "&:hover": { color: colors.accentHover },
                    }}
                  >
                    <FormattedMessage id={id} />
                  </MuiLink>
                ))}
                <MuiLink underline="none">
                  <Box
                    sx={{
                      position: "relative",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <Avatar
                      src="/parallaxMui/profile.jpg"
                      alt="Profile"
                      sx={{
                        width: "100%",
                        height: "100%",
                        border: `2px solid ${colors.accent}`,
                      }}
                    />

                    {/* Overlay button */}
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
                <Dialog
                  slots={{ transition: Transition }}
                  slotProps={{
                    transition: {
                      timeout: { appear: 600, enter: 600, exit: 600 },
                    },
                    paper: {
                      sx: {
                        minWidth: 900,
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
                      {/* Title + icon */}
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <SettingsIcon sx={{ color: colors.textHeading }} />
                        <Typography
                          variant="h3"
                          fontWeight={600}
                          sx={{ color: colors.textHeading }}
                        >
                          <FormattedMessage id="settingsTitle" />
                        </Typography>
                      </Stack>

                      {/* Close button */}
                      <IconButton
                        onClick={handleClose}
                        aria-label="Close settings"
                        sx={{
                          color: colors.textLight,
                          "&:hover": { color: colors.accentHover },
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>

                    {/* thin divider under title */}
                  </DialogTitle>
                  <Divider />
                  <DialogContent dividers sx={{ py: 6 }}>
                    <Box sx={{ display: "flex", minHeight: 320 }}>
                      {/* Sidebar */}
                      <List
                        disablePadding
                        sx={{
                          width: 200,
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
                                  onChange={() => {
                                    /* toggleDarkMode() */
                                  }}
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
                            <LanguageToggle size="large" />
                          </Stack>
                        )}
                      </Box>
                    </Box>
                  </DialogContent>

                  <DialogActions sx={{ pt: 6, px: 0, pb: 0 }}>
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      size="large"
                    >
                      <FormattedMessage id="buttonClose" />
                    </Button>
                  </DialogActions>
                </Dialog>

                <IconButton color="inherit" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <PauseCircleOutlineIcon fontSize="large" />
                  ) : (
                    <PlayCircleOutlineIcon fontSize="large" />
                  )}
                </IconButton>
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
          BackdropProps: { style: { backgroundColor: colors.overlayBg } },
        }}
        slotProps={{
          paper: {
            sx: {
              p: 3,
              width: 260,
              bgcolor: colors.drawerBg,
              color: colors.textLight,
              borderRadius: 0,
              transition: "transform 300ms ease-in-out",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon sx={{ color: colors.textLight, fontSize: 32 }} />
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
                    primary: { fontWeight: "bold", color: colors.textLight },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: colors.dividerBg, my: 2 }} />
        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: 2, p: 2 }}
        >
          <IconButton
            component="a"
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            aria-label="LinkedIn"
            sx={{ color: colors.textLight }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/mobahug"
            target="_blank"
            aria-label="GitHub"
            sx={{ color: colors.textLight }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
        <Divider sx={{ bgcolor: colors.dividerBg, my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-start", p: 3 }}>
          <Typography variant="h4">
            <FormattedMessage id="headingSettings" />
          </Typography>
        </Box>
        <Stack pl={3}>
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
          <LanguageToggle size="small" />
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
    <ButtonGroup size={size} aria-label="language switcher" sx={sx}>
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
