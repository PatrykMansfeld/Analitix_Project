import React from "react";
import analitix_icon from "../../assets/icons/analitix.svg";
import linkedin_icon from "../../assets/icons/linkedin.svg";
import facebook_icon from "../../assets/icons/facebook.svg";
import instagram_icon from "../../assets/icons/instagram.svg";
import discord_icon from "../../assets/icons/discord.svg";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-left-section">
        <img className="footer-logo" src={analitix_icon} alt="logo"></img>
      </div>

      <div className="footer-middle-section">
        <div className="socials-section">
          <p className="socials-text"> Socials </p>
          <ul className="socials-list">
            <li>
              <img
                className="socials-icon"
                src={linkedin_icon}
                alt="linkedin"
              ></img>
            </li>
            <li>
              <img
                className="socials-icon"
                src={facebook_icon}
                alt="facebook"
              ></img>
            </li>
            <li>
              <img
                className="socials-icon"
                src={instagram_icon}
                alt="instagram"
              ></img>
            </li>
            <li>
              <img
                className="socials-icon"
                src={discord_icon}
                alt="discord"
              ></img>
            </li>
          </ul>
        </div>
        <div className="copyright">
          <p className="copyright-text">
            &copy; 2023 Analitix. All rights reserved.
          </p>
        </div>
      </div>
      <div className="footer-right-section"></div>
    </div>
  );
}

export default Footer;
/* //https://uxwing.com/linkedin-app-icon/ obrazki stąd */
