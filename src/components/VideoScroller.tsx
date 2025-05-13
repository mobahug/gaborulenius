import { useThemeToggle } from "../hooks/useThemeToggle";

import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";

export const VideoScroller = () => {
  const { selectedTheme } = useThemeToggle();

  const src =
    selectedTheme === "dark"
      ? "/gaborulenius/gemini-jungle-dark.mp4"
      : "/gaborulenius/gemini-jungle-light.mp4";

  return <ScrollyVideo src={src} />;
};
