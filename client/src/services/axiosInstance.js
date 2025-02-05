import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3300',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('accessToken');

  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime + 300) {
      // Token is about to expire, refresh it
      try {
        const response = await axios.get('http://localhost:3300/refresh', {
          withCredentials: true,
        });

        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        token = newAccessToken;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        localStorage.removeItem('accessToken');
      }
    }
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
