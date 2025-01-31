import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ element: Component, requiredRoles = [], ...rest }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);

  // ✅ Ensure auth state is loaded before making any decision
  if (isLoggedIn === undefined || userData === null) {
    return <div>Loading...</div>; // Show loading state until auth is resolved
  }

  // ✅ Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // ✅ Redirect to unauthorized page if role does not match
  if (requiredRoles.length > 0 && !requiredRoles.includes(userData.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // ✅ If everything is fine, render the component
  return <Component {...rest} />;
};

export default ProtectedRoute;
