import React, { useState, useEffect, useRef, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useIntl } from "react-intl";
import MenuIcon from "@mui/icons-material/Menu";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { colors as lightColors } from "../../colors";
import { assetUrl } from "../../utils/assets";

const ShowAfterCover = React.lazy(() => import("./ShowAfterCover"));
const importMobileDrawer = () => import("./MobileDrawer");
const MobileDrawer = React.lazy(importMobileDrawer);
const DesktopNavItems = React.lazy(() => import("./DesktopNavItems"));
const SectionRail = React.lazy(() => import("./SectionRail"));

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
};

export const NavBar: React.FC = () => {
  const intl = useIntl();
  // Below ~1024px the full link row no longer fits; use the menu instead.
  const isMobile = useMediaQuery("(max-width: 1023.95px)");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileDrawerLoaded, setMobileDrawerLoaded] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSrcRef = useRef<string | null>(null);

  // Prefetch the mobile drawer chunk on idle so the first tap on the menu
  // button doesn't have to wait for a network round-trip + parse before the
  // open transition can start.
  useEffect(() => {
    if (!isMobile) return;
    const w = window as IdleWindow;
    if (w.requestIdleCallback) {
      const handle = w.requestIdleCallback(
        () => {
          void importMobileDrawer();
        },
        { timeout: 2500 },
      );
      return () => {
        if ("cancelIdleCallback" in window) {
          (
            window as Window & { cancelIdleCallback: (h: number) => void }
          ).cancelIdleCallback(handle);
        }
      };
    }
    const id = window.setTimeout(() => {
      void importMobileDrawer();
    }, 2000);
    return () => window.clearTimeout(id);
  }, [isMobile]);

  const prefetchMobileDrawer = useCallback(() => {
    if (mobileDrawerLoaded) return;
    void importMobileDrawer();
    setMobileDrawerLoaded(true);
  }, [mobileDrawerLoaded]);

  const toggleMobileDrawer = (open: boolean) => () => {
    if (open) {
      setMobileDrawerLoaded(true);
    }
    setMobileDrawerOpen(open);
  };
  const ensureAudio = useCallback(() => {
    const newSrc = assetUrl("jungle-music.mp3");
    const audio = audioRef.current ?? new Audio();

    if (!audioRef.current) {
      audio.loop = true;
      audio.preload = "none";
      audioRef.current = audio;
    }

    if (audioSrcRef.current !== newSrc) {
      audio.pause();
      audio.src = newSrc;
      audioSrcRef.current = newSrc;
    }

    return audio;
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    const audio = ensureAudio();

    if (isPlaying) {
      audio.play().catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    }
  }, [ensureAudio, isPlaying]);

  const handlePlayPause = () => {
    const audio = ensureAudio();

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <React.Suspense fallback={null}>
        <ShowAfterCover>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              px: 2,
              borderRadius: 0,
              height: isMobile ? "64px" : "60px",
              py: 0,
              justifyContent: "center",
            }}
          >
            <Toolbar
              disableGutters
              sx={{
                minHeight: isMobile ? "64px" : "60px",
                px: 1.5,
                py: 0,
                justifyContent: "space-between",
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
                      src={assetUrl("profile-160.webp")}
                      alt={intl.formatMessage({ id: "navHome" })}
                      sx={{
                        width: 40,
                        height: 40,
                        border: `1.5px solid ${lightColors.accent}`,
                      }}
                    />
                  </MuiLink>
                  <IconButton
                    color="inherit"
                    onClick={handlePlayPause}
                    aria-label={intl.formatMessage({
                      id: isPlaying ? "navAudioPause" : "navAudioPlay",
                    })}
                  >
                    {isPlaying ? (
                      <PauseCircleOutlineIcon fontSize="large" />
                    ) : (
                      <PlayCircleOutlineIcon fontSize="large" />
                    )}
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label={intl.formatMessage({ id: "navMenu" })}
                    onPointerDown={prefetchMobileDrawer}
                    onTouchStart={prefetchMobileDrawer}
                    onMouseEnter={prefetchMobileDrawer}
                    onClick={toggleMobileDrawer(true)}
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                </Box>
              ) : (
                <React.Suspense fallback={null}>
                  <DesktopNavItems
                    isPlayingAudio={isPlaying}
                    onToggleAudio={handlePlayPause}
                  />
                </React.Suspense>
              )}
            </Toolbar>
          </AppBar>
        </ShowAfterCover>
      </React.Suspense>
      {isMobile ? null : (
        <React.Suspense fallback={null}>
          <SectionRail />
        </React.Suspense>
      )}
      {mobileDrawerLoaded ? (
        <React.Suspense fallback={null}>
          <MobileDrawer
            open={mobileDrawerOpen}
            onClose={toggleMobileDrawer(false)}
            onOpen={toggleMobileDrawer(true)}
            isPlayingAudio={isPlaying}
            onToggleAudio={handlePlayPause}
          />
        </React.Suspense>
      ) : null}
    </>
  );
};

export default NavBar;
