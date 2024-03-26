import React from "react";
import "../assets/css/Landing.css";
import appLogo from "../assets/images/movix-logo.png";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__contents">
        <div className="landing__appLogo">
          <img src={appLogo} alt="movix site" />
        </div>
        <div className="landing__desc">
          <h1>Welcome to Movix Site</h1>
          <p>Your destination to get information about the TMDB movies</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
