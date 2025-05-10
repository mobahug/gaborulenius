import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { useThemeToggle } from "../../hooks/useThemeToggle";
import { ShowAfterCover } from "./ShowAfterCover";
import { SettingsDialog } from "./SettingsDialog";
import { MobileDrawer } from "./MobileDrawer";
import { DesktopNavItems } from "./DesktopNavItems";
import { colors as lightColors } from "../../colors";
import { colors as darkColors } from "../../colorsDark";

export const NavBar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const { selectedTheme, toggleTheme } = useThemeToggle();

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMobileDrawer = (open: boolean) => () => setMobileDrawerOpen(open);
  const handleOpenSettings = () => setSettingsDialogOpen(true);
  const handleCloseSettings = () => setSettingsDialogOpen(false);

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
                      border: `2px solid ${theme.palette.mode === "dark" ? darkColors.accent : lightColors.accent}`,
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
                <IconButton color="inherit" onClick={toggleMobileDrawer(true)}>
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Box>
            ) : (
              <DesktopNavItems
                selectedThemeVariant={selectedTheme}
                onToggleTheme={toggleTheme}
                onOpenSettings={handleOpenSettings}
                isPlayingAudio={isPlaying}
                onToggleAudio={handlePlayPause}
              />
            )}
          </Toolbar>
        </AppBar>
      </ShowAfterCover>
      <MobileDrawer
        open={mobileDrawerOpen}
        onClose={toggleMobileDrawer(false)}
        onOpen={toggleMobileDrawer(true)}
      />
      <SettingsDialog open={settingsDialogOpen} onClose={handleCloseSettings} />
    </>
  );
};

export default NavBar;
