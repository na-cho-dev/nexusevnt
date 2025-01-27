import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext); // Access login state from context
  const navigate = useNavigate();
  
  // Local state to check if the login status is determined
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    // Check if login status has been determined (for example, from localStorage or context)
    if (isLoggedIn !== undefined) {
      setIsCheckingLogin(false); // Login status is checked, stop waiting
      if (!isLoggedIn) {
        navigate("/login"); // Redirect to login page if not logged in
      }
    }
  }, [isLoggedIn, navigate]);

  if (isCheckingLogin) {
    return null; // Return null while the login state is being checked (avoid flicker)
  }

  return isLoggedIn ? Component : null; // Render component if logged in, otherwise return null
};

export default ProtectedRoute;
