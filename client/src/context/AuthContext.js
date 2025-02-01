import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../services/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');

    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime + 300) {
          setIsLoggedIn(true);
          const parsedUser = JSON.parse(storedUser);

          // ✅ Ensure userData is set correctly
          setUserRole(parsedUser?.role || null);
          setUserId(parsedUser?._id || null);
          setUserData(parsedUser || null);
          return;
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    setIsLoggedIn(false);
  }, [token]);

  const checkToken = async () => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // ✅ Refresh token only if it's about to expire (less than 5 mins remaining)
      if (decoded.exp > currentTime + 300) {
        console.log('Token is still valid, no refresh needed.');
        return;
      }

      const response = await axiosInstance.get('/refresh', {
        withCredentials: true,
      });
      const newAccessToken = response.data.accessToken;

      setToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
      console.log('Token refreshed:', newAccessToken);
    } catch (error) {
      console.error(
        'Token refresh failed:',
        error.response?.data?.message || error.message
      );
      logout();
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = (accessToken, currentUser) => {
    setIsLoggedIn(true);
    setUserRole(currentUser.role);
    setUserId(currentUser._id);
    setUserData(currentUser);
    setToken(accessToken);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userData', JSON.stringify(currentUser));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setUserData(null);
    setToken(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, userId, userData, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
