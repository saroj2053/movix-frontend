import React from "react";
import "../assets/css/Error.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/404_animation.json";

const Error = () => {
  const navigate = useNavigate();

  const handleGoBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="error">
      <div className="error__contents">
        <Lottie animationData={animationData} />
        <h1 className="error__title">Oops!</h1>
        <h4 className="error__subtitle">
          We can't seem to find the page you are looking for.
        </h4>
        <p>Error Code - 404</p>
        <button
          type="button"
          className="error__button"
          onClick={handleGoBackClick}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
