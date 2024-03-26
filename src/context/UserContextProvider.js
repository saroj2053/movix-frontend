import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    } else {
      return { user: null, token: "" };
    }
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
