import { Box } from "@mui/material";
import CoverSection from "./components/CoverSection";
import Hero from "./components/Hero";
import Leaves from "./components/Leaves";
import { useLeavesEffect } from "./hooks/useLeavesEffect";
import NavBar from "./components/navbar/NavBar";

const App: React.FC = () => {
  const { leavesEnabled } = useLeavesEffect();

  return (
    <Box id="scrolly-container" sx={{ position: "relative" }}>
      <NavBar />
      {leavesEnabled && <Leaves sx={{ zIndex: 1 }} />}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <CoverSection />
        <Hero />
      </Box>
    </Box>
  );
};

export default App;
