import React, { useState, useEffect, useRef, useCallback } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useActiveNavLink } from "../../hooks/useActiveNavLink";
import { Soundscape } from "../../journey/audio/soundscape";
import TopBar from "./TopBar";
import { useAfterCover } from "./useAfterCover";

const importMobileDrawer = () => import("./MobileDrawer");
const MobileDrawer = React.lazy(importMobileDrawer);
const SectionRail = React.lazy(() => import("./SectionRail"));

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
};

/** The journey's navigation: the bar (bare over the cover), the section
 * rail on wide screens and the menu on narrow ones. */
const NavBar: React.FC = () => {
  // Below ~1024px the rail no longer fits beside the blocks; use the menu.
  const isMobile = useMediaQuery("(max-width: 1023.95px)");
  const afterCover = useAfterCover();
  const { requestActiveSection } = useActiveNavLink();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileDrawerLoaded, setMobileDrawerLoaded] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

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

  // The films' sound: nothing loads until it is turned on.
  const soundscapeRef = useRef<Soundscape | null>(null);

  useEffect(() => {
    return () => soundscapeRef.current?.dispose();
  }, []);

  const handlePlayPause = () => {
    const soundscape = (soundscapeRef.current ??= new Soundscape());
    if (soundscape.playing) {
      soundscape.pause();
      setIsPlaying(false);
    } else {
      soundscape.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <TopBar
        mode="journey"
        compact={isMobile}
        bare={!afterCover}
        homeHref="#home"
        onHome={() => requestActiveSection("#home")}
        audio={{ playing: isPlaying, toggle: handlePlayPause }}
        menu={
          isMobile
            ? { open: toggleMobileDrawer(true), prefetch: prefetchMobileDrawer }
            : undefined
        }
      />
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
