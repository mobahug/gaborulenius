import { Box } from "@mui/material";
import CoverSection from "./components/CoverSection";
import Hero from "./components/Hero";
import Leaves from "./components/Leaves";
import NavBar from "./components/Navbar";
import { useLeavesEffect } from "./hooks/useLeavesEffect";

const App: React.FC = () => {
  const { leavesEnabled } = useLeavesEffect();

  return (
    <Box id="scrolly-container" sx={{ position: "relative" }}>
      <NavBar />
      <div id="scrolly-video" />
      {leavesEnabled ? (
        <Leaves
          sx={{
            zIndex: 1,
          }}
        />
      ) : null}
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
      </Box>
    </Box>
  );
};

export default App;
