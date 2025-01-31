import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("userData"); // Retrieve from localStorage

    if (storedAccessToken && storedUser) {
      setIsLoggedIn(true);
      const parsedUser = JSON.parse(storedUser); // Convert string back to object
      setUserRole(parsedUser.role);
      setUserId(parsedUser._id);
      setUserData(parsedUser);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (accessToken, currentUser) => {
    setIsLoggedIn(true);
    setUserRole(currentUser.role);
    setUserId(currentUser._id);
    setUserData(currentUser);
    
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(currentUser)); // Store userData persistently
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setUserData(null);
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData"); // Remove user data on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
