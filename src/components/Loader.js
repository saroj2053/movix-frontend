import React from "react";
import "../assets/css/Loader.css";

const Loader = ({ text }) => {
  return (
    <div className="loader">
      <div className="loader__spin">
        <div id="loader"></div>
      </div>
      <h2 className="loader__title">Loading {text}</h2>
    </div>
  );
};

export default Loader;
