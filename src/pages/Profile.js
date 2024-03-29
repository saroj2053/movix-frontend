import React, { useContext } from "react";
import "../assets/css/Profile.css";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import avatarImageSrc from "../assets/images/movix-avatar.png";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const getDate = () => {
    const timestamp = user.user.createdAt;
    const dateObj = new Date(timestamp);
    const date = dateObj.toISOString().split("T")[0];
    return date;
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({ user: null, token: "" });
    navigate("/login");
  };
  return (
    <div className="profile">
      <h2 className="profile__heading">My Profile</h2>
      <div className="profile__contents">
        <div className="profile__left">
          <div className="profile__avatar">
            <img src={avatarImageSrc} alt="" />
          </div>
        </div>
        <div className="profile__right">
          <p className="profile__username">{user.user.username}</p>
          <p className="profile__createdAt">
            Available since:{" "}
            <span className="user-registered-date">{getDate()}</span>
          </p>
          <h2 style={{ margin: "1rem 0" }}>My Wishlist</h2>
          <button
            type="button"
            className="profile__signOut-button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
