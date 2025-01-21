import jwt from 'jsonwebtoken';

export const accessToken = (user, tokenVersion) => {
  return jwt.sign(
    { email: user.email, tokenVersion },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '24h',
    }
  );
};

export const refreshToken = (user, tokenVersion) => {
  return jwt.sign(
    { email: user.email, tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};
