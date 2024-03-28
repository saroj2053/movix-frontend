import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    try {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (userData && token) {
        const user = JSON.parse(userData);
        return { user, token };
      } else {
        return { user: null, token: "" };
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
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
