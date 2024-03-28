import "../assets/css/Navbar.css";
import React, { useContext, useEffect, useState } from "react";
import navbarBrandImageSrc from "../assets/images/movix-logo.svg";
import navbarAvatarImageSrc from "../assets/images/movix-avatar.png";

import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Navbar() {
  const [bgShow, setBgShow] = useState(false);

  const { user } = useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setBgShow(true);
      } else {
        setBgShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleBtnClick = () => {
    navigate("/login");
  };

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <div className={`navbar ${bgShow && "navbar__dark"}`}>
      <div className="navbar__left">
        <img
          onClick={() => {
            user.user !== null && user.token !== ""
              ? navigate("/home")
              : navigate("/");
          }}
          className="navbar__logo"
          src={navbarBrandImageSrc}
          alt="Navbar brand"
        />
      </div>

      <div className="navbar__right">
        {user.user !== null && user.token !== "" ? (
          <img
            onClick={handleAvatarClick}
            className="navbar__avatar"
            src={navbarAvatarImageSrc}
            alt="Navbar avatar"
          />
        ) : (
          <button type="button" className="starterBtn" onClick={handleBtnClick}>
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
