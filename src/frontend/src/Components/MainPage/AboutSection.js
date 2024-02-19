import { React, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import aboutImage from "../../assets/images/about-heim.png";

function AboutSection() {
  const { ref: aboutUsRef, inView: aboutIsVisible } = useInView({
    threshold: 0.7,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (aboutIsVisible) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      });
    }
    if (!aboutIsVisible) {
      animation.start({
        y: "50px",
        opacity: 0,
        transition: {
          duration: 1,
        },
      });
    }
  }, [aboutIsVisible]);

  return (
    <div className="about-section" ref={aboutUsRef} id="about-us">
      <motion.div className="about-container" animate={animation}>
        <div className="about-text-section">
          <div className="about-text">
            <h3 className="about-title">About</h3>
            <p className="about-paragraph">
              Analitix is a web application that allows you to manage your team
              better. It is a tool that helps you keeping track of your team's
              performance. You can easily create and manage your team, add
              members and display data about their profiles.
            </p>
          </div>
        </div>
        <div className="about-image-section">
          <img className="about-image" src={aboutImage} alt="about"></img>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutSection;
