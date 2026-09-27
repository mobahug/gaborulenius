import { useEffect, useRef, useState } from "react";
import { onAfterSceneFrame, registerScene } from "../../journey/scrollTimeline";
import { getCoverVisibility } from "./navConstants";

/** Whether the cover has (nearly) finished fading out, for what only
 * appears after it: the navigation bar and the section rail. */
export const useAfterCover = () => {
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
      const nextVisible = getCoverVisibility(homeTop, y, vh) < 0.05;
      if (visibleRef.current === nextVisible) return;
      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    });
    return () => {
      unregister();
      stop();
    };
  }, []);

  return visible;
};
