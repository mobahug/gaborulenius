import React from "react";
import { Box } from "@mui/material";
import CoverSection from "./components/CoverSection";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Leaves from "./components/Leaves";
import NavBar from "./components/Navbar";

const App: React.FC = () => (
  <Box id="scrolly-container" sx={{ position: "relative" }}>
    <NavBar /> 
    <div id="scrolly-video" />
    <Leaves
      sx={{
        zIndex: 1,
      }}
    />
    <Box
      id="root"
      component="div"
      sx={{
        position: "relative",
        zIndex: 2,
      }}
    >
      <CoverSection />
      <Hero />
      <Footer />
    </Box>
  </Box>
);

export default App;
