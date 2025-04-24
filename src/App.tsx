import React from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import CoverSection from "./components/CoverSection";

const App: React.FC = () => {
  return (
    <>
      <CoverSection />
      <Hero />
      <Footer />
    </>
  );
};

export default App;
