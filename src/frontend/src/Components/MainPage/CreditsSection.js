import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import cdvLogo from "../../assets/images/cdv.svg";
import riotLogo from "../../assets/images/riot.svg";

function CreditsSection() {
  const { ref: creditsRef, inView: creditsIsVisible } = useInView({
    threshold: 0.5,
  });
  const leftTitleAnimation = useAnimation();
  const leftTextAnimation = useAnimation();
  const rightTitleAnimation = useAnimation();
  const rightTextAnimation = useAnimation();

  useEffect(() => {
    //Credits section is visible : animation
    if (creditsIsVisible) {
      leftTitleAnimation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
        },
      });
      leftTextAnimation.start({
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          duration: 0.5,
        },
      });
      rightTitleAnimation.start({
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.4,
          duration: 0.5,
        },
      });
      rightTextAnimation.start({
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.6,
          duration: 0.5,
        },
      });
    }

    //Credits section is not visible : animation
    if (!creditsIsVisible) {
      leftTitleAnimation.start({
        opacity: 0,
        x: "-50px",
        transition: {
          duration: 0.5,
        },
      });
      leftTextAnimation.start({
        opacity: 0,
        x: "-50px",
        transition: {
          duration: 0.5,
          delay: 0.2,
        },
      });
      rightTitleAnimation.start({
        opacity: 0,
        x: "50px",
        transition: {
          duration: 0.5,
          delay: 0.4,
        },
      });
      rightTextAnimation.start({
        opacity: 0,
        x: "50px",
        transition: {
          duration: 0.5,
          delay: 0.6,
        },
      });
    }
  }, [creditsIsVisible]);

  return (
    <div className="credits-container" ref={creditsRef}>
      <div className="credits-section">
        <div className="credits-section-image">
          <img className="credits-image" src={cdvLogo} alt="cdv-logo" />
        </div>
        <div className="credits-section-text">
          <motion.span
            className="credits-text-title"
            animate={leftTitleAnimation}
          >
            Project details
          </motion.span>
          <motion.span className="credits-text" animate={leftTextAnimation}>
            This project is a part of the BEng Thesis at Collegium Da Vinci.
          </motion.span>
        </div>
      </div>

      <div className="credits-section">
        <div className="credits-section-text">
          <motion.span
            className="credits-text-title"
            animate={rightTitleAnimation}
          >
            Game producer
          </motion.span>
          <motion.span className="credits-text" animate={rightTextAnimation}>
            Analitix isn't endorsed by Riot Games and doesn't reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing League of Legends. League of Legends and Riot Games are
            trademarks or registered trademarks of Riot Games, Inc. League of
            Legends © Riot Games, Inc. All of game assets used on website are
            property of Riot Games, Inc.
          </motion.span>
        </div>
        <div className="credits-section-image">
          <img className="credits-image" src={riotLogo} alt="riot-logo" />
        </div>
      </div>
    </div>
  );
}

export default CreditsSection;
