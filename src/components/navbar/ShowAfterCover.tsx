import React, { useState, useEffect, ReactElement } from "react";
import { Slide } from "@mui/material";
import { COVER_THRESHOLD } from "./navConstants";

type ShowAfterCoverProps = { children: ReactElement };

export const ShowAfterCover: React.FC<ShowAfterCoverProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > COVER_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
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
};
