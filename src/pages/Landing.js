import React from "react";
import "../assets/css/Landing.css";
import appLogo from "../assets/images/movix-logo.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <div className="landing__contents">
        <div className="landing__top">
          <div className="landing__appLogo">
            <img src={appLogo} alt="movix site" />
          </div>
          <div className="landing__desc">
            <h1>Welcome to Movix Site</h1>
            <p>Your destination to get information about the TMDB movies</p>
          </div>
        </div>
        <div className="landing__bottom">
          <button
            type="button"
            className="starterBtn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
