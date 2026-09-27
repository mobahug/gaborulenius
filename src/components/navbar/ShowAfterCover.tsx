import React, { ReactElement } from "react";
import Slide from "@mui/material/Slide";
import { useAfterCover } from "./useAfterCover";

type ShowAfterCoverProps = { children: ReactElement };

/** Slides its child (the navigation bar) in once the cover has gone. */
const ShowAfterCover: React.FC<ShowAfterCoverProps> = ({ children }) => {
  const visible = useAfterCover();
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
