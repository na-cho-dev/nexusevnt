import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const decoded = jwtDecode(token);
    const jwtUserRole = decoded.role;

    if (!jwtUserRole) {
      throw new Error('Role not found in token');
    }

    const fetchUserData = async () => {
      try {
        const currentTime = Date.now() / 1000;
        const apiEndPoint =
          jwtUserRole === 'Organizer'
            ? `/api/organizer/${decoded.id}`
            : `/api/attendee/${decoded.id}`;

        const response = await axiosInstance.get(apiEndPoint);
        const storedUser = response.data;

        if (decoded.exp > currentTime + 300) {
          setIsLoggedIn(true);
          const user_role = jwtUserRole.toLowerCase();

          setUserRole(storedUser[user_role].role || null);
          setUserId(storedUser[user_role]._id || null);
          setUserData(storedUser[user_role] || null);
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const checkToken = async () => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

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
      setIsLoggedIn(false);
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
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setUserData(null);
    setToken(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('ticketId');
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('paymentSuccess_')) {
        localStorage.removeItem(key);
      }
    });
  };

  // Log updated values in a separate useEffect
  useEffect(() => {
    console.log('User Data:', userData);
    console.log('User Role:', userRole);
    console.log('User ID:', userId);
  }, [userData, userRole, userId]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userId,
        userData,
        setUserData,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
