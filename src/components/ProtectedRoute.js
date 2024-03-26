import React from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { user } = React.useContext(UserContext);

  if (!user.username) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
