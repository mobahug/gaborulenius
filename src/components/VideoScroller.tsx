import { useThemeToggle } from "../hooks/useThemeToggle";

import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";

export const VideoScroller = () => {
  const { selectedTheme } = useThemeToggle();

  return (
    <ScrollyVideo
      src={
        selectedTheme === "dark"
          ? "/parallaxMui/gemini-jungle-dark.mp4"
          : "/parallaxMui/gemini-jungle-light.mp4"
      }
    />
  );
};
