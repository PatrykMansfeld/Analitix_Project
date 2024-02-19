import React from "react";
import { motion } from "framer-motion";
import background from "../../assets/videos/home_page_bg.mp4";

function heroSection() {
  return (
    <div className="hero-section">
      {/* Background image */}
      <video autoPlay loop muted className="main-aboutapp-video">
        <source src={background} type="video/mp4" />
      </video>

      {/* Hero section */}
      <div className="hero-content">
        <h1 className="hero-heading">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Manage your team even better
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            {"\n"}with
          </motion.span>
          <motion.span
            className="hero-heading-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            {" "}
            Analitix
          </motion.span>
        </h1>
        <a href="#about-us">
          <motion.button
            className="hero-call-to-action"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            Learn more
          </motion.button>
        </a>
      </div>
    </div>
  );
}

export default heroSection;
