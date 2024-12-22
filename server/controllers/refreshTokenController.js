import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const refreshTokenController = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.JWT);
  if (!cookies?.JWT) return res.sendStatus(401);
  const refreshToken = cookies.JWT;
  try {
    const existingUser = await User.findOne({ refresh_token: refreshToken });
    if (!existingUser)
      return res
        .status(403)
        .json({ message: 'Forbidden: Failed to find User' });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || existingUser.email !== decoded.email)
          return res.status(403).json({ message: 'Forbidden' });

        const accessToken = jwt.sign(
          { email: decoded.email },
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

export default refreshTokenController;
