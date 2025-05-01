import React from "react";
import { Box } from "@mui/material";

export interface SectionWithPaperProps {
  id: string;
  innerRef: React.Ref<HTMLElement>;
  children: React.ReactNode;
}
export default function SectionWithPaper(
  props: React.PropsWithChildren<{
    id: string;
    innerRef: React.Ref<HTMLDivElement>;
  }>
) {
  const { id, innerRef, children } = props;
  return (
    <Box id={id} ref={innerRef as React.Ref<HTMLDivElement>}>
      {children}
    </Box>
  );
}
