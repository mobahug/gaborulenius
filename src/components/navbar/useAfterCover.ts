import { useEffect, useRef, useState } from "react";
import { onAfterSceneFrame, registerScene } from "../../journey/scrollTimeline";

/** The cover's words have faded out by this much of its scroll (see
 * CoverSection), and with them the cover. */
const COVER_GONE = 0.84;

/** Whether the cover has gone, for what only appears after it: the name in
 * the bar and the section rail. */
export const useAfterCover = () => {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    // How far the cover has been scrolled, measured by the scroll clock with
    // everything else, before anything is written in the frame.
    let coverPin: number | null = null;
    const unregister = registerScene(
      () => document.getElementById("cover"),
      (frame) => {
        coverPin = frame.pin;
      },
    );
    const stop = onAfterSceneFrame(({ y, vh }) => {
      const nextVisible =
        coverPin === null ? y > vh * 0.85 : coverPin >= COVER_GONE;
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
