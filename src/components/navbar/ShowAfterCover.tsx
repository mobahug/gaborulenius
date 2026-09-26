import React, { useState, useEffect, ReactElement, useRef } from "react";
import Slide from "@mui/material/Slide";
import { onAfterSceneFrame, registerScene } from "../../journey/scrollTimeline";
import { getCoverVisibility } from "./navConstants";

type ShowAfterCoverProps = { children: ReactElement };

const ShowAfterCover: React.FC<ShowAfterCoverProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    // The home section is measured by the scroll clock with everything else,
    // before anything is written in the frame, so reading it never forces a
    // layout.
    let homeTop: number | null = null;
    const unregister = registerScene(
      () => document.getElementById("home"),
      (frame) => {
        homeTop = frame.top - frame.viewport.y;
      },
    );
    const stop = onAfterSceneFrame(({ y, vh }) => {
      // Reveal once the cover has nearly finished fading out.
      const nextVisible = getCoverVisibility(homeTop, y, vh) < 0.05;

      if (visibleRef.current === nextVisible) {
        return;
      }

      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    });
    return () => {
      unregister();
      stop();
    };
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
};

export default ShowAfterCover;
