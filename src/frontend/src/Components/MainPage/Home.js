import React from "react";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import BackToTopBtn from "./BackToTopBtn";
import Footer from "./Footer";
import MainHeader from "./MainHeader";
import CreditsSection from "./CreditsSection";
function Home() {
  return (
    <>
      <MainHeader />
      <HeroSection />
      <AboutSection />
      <CreditsSection />
      <BackToTopBtn />
      <Footer />
    </>
  );
}

export default Home;
