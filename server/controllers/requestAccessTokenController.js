import User from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import redisClient from '../database/redisDBConnect.js';

const requestAccessTokenController = async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log(`JWT Token: ${cookies.JWT}`);

    // Check Token in Cookie, Forbidden if not
    if (!cookies?.JWT) return res.sendStatus(401);

    // Else, saves the token to memory and use it to create an access token
    const refreshToken = cookies.JWT;
    const existingUser = await User.findOne({ refresh_token: refreshToken });
    if (!existingUser)
      return res
        .status(403)
        .json({ message: 'Forbidden: Failed to find User' });

    // Check if refresh token is correct and generate access token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || existingUser.email !== decoded.email)
          return res.status(403).json({ message: 'Forbidden' });

        const tokenVersionKey = `tokenVersion:${existingUser.email}`;
        let tokenVersion = await redisClient.incr(tokenVersionKey);

        const accessToken = jwt.sign(
          {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            tokenVersion,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        );
        // const access_token = accessToken(existingUser.email);
        console.log('Access token generated:', accessToken);
        return res.status(200).json({
          message: 'Token Verified Successfully',
          accessToken: accessToken,
        });
      }
    );
  } catch (error) {
    console.log(`An error occured while Refreshing Token! ${error}`);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export default requestAccessTokenController;
