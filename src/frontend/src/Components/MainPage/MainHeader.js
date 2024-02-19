import React from "react";
import { Link } from "react-router-dom";
// import logo from "../../assets/logo.svg";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-logo-section">
          <Link className="navbar-logo-links" to="/">
            {/* <img className="navbar-logo" src={logo} alt="analitix-logo"></img> */}

            {/* <h1 className="navbar-title">Analitix</h1> */}

            <svg
              width="75"
              height="75"
              viewBox="0 0 1101 1142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M470.012 957.446L496.59 818.188C499.882 800.972 486.727 784.993 469.208 784.904C453.789 784.814 441.319 772.29 441.319 756.862V460.222C441.319 432.731 405.848 421.666 390.205 444.272L295.113 581.698C289.869 589.264 281.258 593.791 272.052 593.791H104.095C81.4955 593.791 68.177 568.444 81.0039 549.844L288.037 249.511L413.073 68.1223C418.302 60.5273 426.943 56 436.165 56H614.475C629.924 56 642.468 68.4946 642.527 83.938L644.106 565.48C644.151 580.924 656.695 593.418 672.159 593.418H786.409L520.634 978.608C503.413 1003.57 464.306 987.23 469.997 957.431L470.012 957.446Z"
                fill="white"
                stroke="white"
                stroke-width="25"
                stroke-miterlimit="10"
              />
              <path
                d="M871.013 448.397H605.313C589.79 448.397 577.216 461.011 577.261 476.529L577.886 661.417C577.931 676.86 590.475 689.355 605.939 689.355H720.204L454.414 1074.54C437.193 1099.5 398.086 1083.15 403.777 1053.37L430.355 914.124C433.647 896.909 420.507 880.929 402.973 880.84C387.554 880.75 375.084 868.226 375.084 852.798V476.439C375.084 460.951 362.525 448.397 347.032 448.397H109.369C86.7694 448.397 73.4509 423.051 86.2778 404.45L187.284 257.954C192.513 250.374 201.139 245.832 210.361 245.832L375.099 245.728L576.486 245.609L1025.73 245.341L894.119 436.275C888.89 443.87 880.25 448.397 871.028 448.397H871.013Z"
                fill="#754BC4"
                stroke="#754BC4"
                stroke-width="25"
                stroke-miterlimit="10"
              />
            </svg>
          </Link>
        </div>

        <div className="navbar-links-section">
          <ul className="navbar-links">
            <Link to="/login">
              <li className="navbar-link">
                <button className="navbar-btn">Sign In</button>
              </li>
            </Link>
            <Link to="/register">
              <li className="navbar-link">
                <button className="navbar-btn">Sign Up</button>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
// Nazwy klas do stylowania utworzone są z 3 części im głębiej w danego diva się wchodzi tym pierwsza część znika i zostaje zastąpiona nową która jest teraz na końcu.
