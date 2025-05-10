import React from "react";
import Box from "@mui/material/Box";
import { styled, keyframes } from "@mui/system";
import { SxProps, Theme } from "@mui/material";
import { useThemeToggle } from "../hooks/useThemeToggle";

const fall1 = keyframes`
  0%   { transform: translate3d(300px, 0, 0)   rotate(0deg);   opacity: 0.7; }
  100% { transform: translate3d(-350px, 100vh, 0) rotate(90deg);  opacity: 0; }
`;
const fall2 = keyframes`
  0%   { transform: translate3d(0, 0, 0)      rotate(90deg);  opacity: 0.7; }
  100% { transform: translate3d(-400px, 100vh, 0) rotate(0deg);  opacity: 0; }
`;
const fall3 = keyframes`
  0%   { transform: translate3d(0, 0, 0)      rotate(-20deg); opacity: 0.7; }
  100% { transform: translate3d(-230px, 100vh, 0) rotate(-70deg);opacity: 0; }
`;

const LeavesContainer = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  pointerEvents: "none",
  overflow: "hidden",
}));

type LeafProps = {
  animation: ReturnType<typeof keyframes>;
  left: number;
  size: number;
  delay: number;
};
const LeafImg = styled("img", {
  shouldForwardProp: (prop) =>
    !["animation", "left", "size", "delay"].includes(prop as string),
})<LeafProps>(({ animation, left, size, delay }) => ({
  position: "absolute",
  top: "-50px",
  left: `${left}vw`,
  width: `${size}px`,
  opacity: 0.7,
  pointerEvents: "none",
  animation: `${animation} ${15 + Math.random() * 5}s infinite ease-in-out`,
  animationDelay: `${delay}s`,
}));

export type LeavesProps = {
  sx?: SxProps<Theme>;
};
const Leaves: React.FC<LeavesProps> = ({ sx }) => {
  const { selectedTheme } = useThemeToggle();
  const animations = [fall1, fall2, fall3];
  const leafCount = 10;

  return (
    <LeavesContainer sx={sx}>
      {Array.from({ length: leafCount }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 12 + Math.random() * 8;
        const delay = Math.random() * 10;
        const animation = animations[i % animations.length];

        return (
          <LeafImg
            key={i}
            src={
              selectedTheme === "dark"
                ? "/parallaxMui/dark-leaf.png"
                : "/parallaxMui/light-leaf.png"
            }
            animation={animation}
            left={left}
            size={size}
            delay={delay}
            alt="falling leaf"
          />
        );
      })}
    </LeavesContainer>
  );
};

export default Leaves;
