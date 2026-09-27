import React from "react";
import Box from "@mui/material/Box";
import Hero from "./components/Hero";
import NavBar from "./components/navbar/NavBar";
import CursorLayer from "./journey/overlays/CursorLayer";

const App: React.FC = () => (
  <Box id="scrolly-container" sx={{ position: "relative" }}>
    <NavBar />
    <Box
      component="main"
      id="main-content"
      sx={{ position: "relative", zIndex: 2 }}
    >
      <Hero />
    </Box>
    <CursorLayer />
  </Box>
);
export default App;
