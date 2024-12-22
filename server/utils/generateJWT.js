import jwt from 'jsonwebtoken';

export const accessToken = (email) => {
  return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30s',
  });
};

export const refreshToken = (email) => {
  return jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};
