import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";

// TODO: add this to helper.ts file
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// TODO: Uncomments once needed

// const shorten = (url: string) => {
//   try {
//     const u = new URL(url);
//     const path = u.pathname.split("/").filter(Boolean).slice(0, 2).join("/");
//     return path ? `${u.host}/${path}…` : u.host;
//   } catch {
//     return url;
//   }
// };
