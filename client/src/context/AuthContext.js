import React, { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// AuthProvider to manage login state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined); // Start with undefined

  // Check if user is logged in on page load
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setIsLoggedIn(true); // Set to true if accessToken exists
    } else {
      setIsLoggedIn(false); // Set to false if no accessToken
    }
  }, []);

  // Handle login and logout
  const login = (access_Token) => {
    setIsLoggedIn(true);
    localStorage.setItem("accessToken", access_Token); // Store access token in localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
