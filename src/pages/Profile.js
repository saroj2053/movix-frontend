import React, { useContext } from "react";
import "../assets/css/Profile.css";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const getDate = () => {
    const timestamp = user.createdAt;
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
      <div className="profile__contents">
        <h2>My Profile</h2>
        <p className="profile__username">Username: {user.username}</p>
        <p className="profile__createdAt">Available since: {getDate()}</p>
        <button
          type="button"
          className="profile__signOut-button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
