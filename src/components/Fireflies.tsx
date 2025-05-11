import React from "react";
import Box from "@mui/material/Box";
import { styled, keyframes, alpha } from "@mui/system";
import { SxProps, Theme } from "@mui/material";

const expansiveDrift = keyframes`
  0% {
    /* Start off-screen or at an edge, invisible */
    transform: translate(var(--startX), var(--startY)) scale(0.7);
    opacity: 0;
  }
  5%, 10% { /* Fade in as it enters view */
    opacity: var(--maxOpacity);
    /* No specific transform here, allows it to move towards first major point */
  }
  25% {
    transform: translate(var(--point1X), var(--point1Y)) scale(1);
    opacity: var(--maxOpacity);
  }
  50% {
    transform: translate(var(--point2X), var(--point2Y)) scale(0.9);
    opacity: var(--maxOpacity);
  }
  75% {
    transform: translate(var(--point3X), var(--point3Y)) scale(1.1);
    opacity: var(--maxOpacity);
  }
  90%, 95% { /* Start fading out as it moves towards exit */
    opacity: var(--maxOpacity);
    /* No specific transform here, allows it to move towards its final off-screen point */
  }
  100% {
    /* End off-screen or at an opposite edge, invisible */
    transform: translate(var(--endX), var(--endY)) scale(0.7);
    opacity: 0;
  }
`;

const gentleGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 4px 1px var(--glowColorDim), 0 0 2px 0.5px var(--baseColor);
    opacity: 0.6;
  }
  50% {
    box-shadow: 0 0 12px 4px var(--glowColorBright), 0 0 6px 2px var(--baseColor);
    opacity: 1;
  }
`;

const FirefliesContainer = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  pointerEvents: "none",
  overflow: "hidden",
});

interface FireflyDotProps {
  startX: string;
  startY: string;
  point1X: string;
  point1Y: string;
  point2X: string;
  point2Y: string;
  point3X: string;
  point3Y: string;
  endX: string;
  endY: string;
  driftDuration: string;
  driftDelay: string;
  maxOpacity: number;
  animationDirection: "normal" | "alternate" | "reverse" | "alternate-reverse";

  glowDuration: string;
  glowDelay: string;

  baseColor: string;
  glowColorDim: string;
  glowColorBright: string;
  size: string;
}

const FireflyDot = styled(Box, {
  shouldForwardProp: (prop) =>
    ![
      "startX",
      "startY",
      "point1X",
      "point1Y",
      "point2X",
      "point2Y",
      "point3X",
      "point3Y",
      "endX",
      "endY",
      "driftDuration",
      "driftDelay",
      "maxOpacity",
      "animationDirection",
      "glowDuration",
      "glowDelay",
      "baseColor",
      "glowColorDim",
      "glowColorBright",
      "size",
    ].includes(prop as string),
})<FireflyDotProps>(
  ({
    startX,
    startY,
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
    endX,
    endY,
    driftDuration,
    driftDelay,
    maxOpacity,
    animationDirection,
    glowDuration,
    glowDelay,
    baseColor,
    glowColorDim,
    glowColorBright,
    size,
  }) => ({
    "--startX": startX,
    "--startY": startY,
    "--point1X": point1X,
    "--point1Y": point1Y,
    "--point2X": point2X,
    "--point2Y": point2Y,
    "--point3X": point3X,
    "--point3Y": point3Y,
    "--endX": endX,
    "--endY": endY,
    "--maxOpacity": maxOpacity,
    "--baseColor": baseColor,
    "--glowColorDim": glowColorDim,
    "--glowColorBright": glowColorBright,

    position: "absolute",
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    width: size,
    height: size,
    backgroundColor: baseColor,
    borderRadius: "50%",
    opacity: 0,
    willChange: "transform, opacity, box-shadow",
    animation: `
      ${expansiveDrift} ${driftDuration} infinite linear,
      ${gentleGlow} ${glowDuration} infinite ease-in-out
    `,
    animationDelay: `${driftDelay}, ${glowDelay}`,
    animationDirection: `${animationDirection}, normal`,
  }),
);

export interface FirefliesProps {
  sx?: SxProps<Theme>;
  count?: number;
  baseColor?: string;
  glowColor?: string;
  minMaxOpacity?: [number, number];
}

const Fireflies: React.FC<FirefliesProps> = ({
  sx,
  count = 40,
  baseColor = "#DAF7A6",
  glowColor = "#FFFACD",
  minMaxOpacity = [0.4, 0.8],
}) => {
  const fireflies = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const fireflySize = `${Math.random() * 1.8 + 0.8}px`;

      const driftDur = `${Math.random() * 40 + 60}s`;
      const driftDel = `${Math.random() * 90}s`;

      const randomScreenPoint = (allowOffscreenFactor = 1.5) => ({
        x: `${Math.random() * (100 * allowOffscreenFactor) - 50 * (allowOffscreenFactor - 1)}vw`,
        y: `${Math.random() * (100 * allowOffscreenFactor) - 50 * (allowOffscreenFactor - 1)}vh`,
      });

      const startPos = randomScreenPoint(2);
      const p1 = randomScreenPoint(1.2);
      const p2 = randomScreenPoint(1.2);
      const p3 = randomScreenPoint(1.2);
      const endPos = randomScreenPoint(2);

      const glowDur = `${Math.random() * 6 + 4}s`;
      const glowDel = `${driftDel + Math.random() * 5}s`;

      const peakOpacity =
        Math.random() * (minMaxOpacity[1] - minMaxOpacity[0]) +
        minMaxOpacity[0];

      const directions: FireflyDotProps["animationDirection"][] = [
        "normal",
        "reverse",
        "alternate",
      ];
      const animDirection =
        directions[Math.floor(Math.random() * directions.length)];

      return {
        id: `firefly-${i}`,
        size: fireflySize,
        startX: startPos.x,
        startY: startPos.y,
        point1X: p1.x,
        point1Y: p1.y,
        point2X: p2.x,
        point2Y: p2.y,
        point3X: p3.x,
        point3Y: p3.y,
        endX: endPos.x,
        endY: endPos.y,
        driftDuration: driftDur,
        driftDelay: driftDel,
        maxOpacity: peakOpacity,
        animationDirection: animDirection,
        glowDuration: glowDur,
        glowDelay: glowDel,
        baseColor: baseColor,
        glowColorDim: alpha(glowColor, 0.25),
        glowColorBright: alpha(glowColor, 0.75),
      };
    });
  }, [count, baseColor, glowColor, minMaxOpacity]);

  return (
    <FirefliesContainer sx={sx}>
      {fireflies.map((props) => (
        <FireflyDot key={props.id} {...props} />
      ))}
    </FirefliesContainer>
  );
};

export default Fireflies;
