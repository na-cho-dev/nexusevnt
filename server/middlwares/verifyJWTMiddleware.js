import jwt, { decode } from 'jsonwebtoken';
import User from '../models/usersModel.js';
import redisClient from '../database/redisDBConnect.js';

const verifyJWT = async (req, res, next) => {
  // Gets the token from the header
  const excludedRoutes = ['/webhook, /success', '/cancel'];

  // Skip middleware for excluded routes
  if (excludedRoutes.includes(req.path)) {
    return next();
  }

  const auth_token = req.headers['authorization'];
  console.log(`Auth Header: ${auth_token}`); // Bearer <token>
  if (!auth_token)
    return res
      .status(401)
      .json({ message: 'Unauthorized Access: TOKEN required!' });
  const access_token = auth_token.split(' ')[1];

  try {
    // Decode the JWT token (without verifying it first)
    const decoded = jwt.decode(access_token);
    if (!decoded) return res.status(403).json({ message: 'Invalid Token' });

    const userEmail = decoded.email;
    const tokenVersion = decoded.tokenVersion; // Token version embedded in JWT payload

    // Check token version in Redis
    const redisTokenVersion = await redisClient.get(
      `tokenVersion:${userEmail}`
    );

    console.log(
      `Token Version in JWT: ${tokenVersion}; Typeof: ${typeof tokenVersion}`
    );
    console.log(
      `Token Version in Redis: ${redisTokenVersion}; Typeof: ${typeof redisTokenVersion}`
    );

    if (String(redisTokenVersion) !== String(tokenVersion))
      return res.status(403).json({ message: 'Token has been INVALIDATED' });

    // Proceed with further validation
    jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });

        console.log(
          'User ID From JWT:',
          decoded.id,
          'Type of ID:',
          typeof decoded.id
        );

        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
          return res.status(404).json({
            message: 'VerifyJWT: User not found.',
          });
        }

        req.user = user; // Attach user to the request
        // console.log("User In Verify JWT:", req.user)
        req.check = true;
        next();
      }
    );
  } catch (error) {
    console.error('Error in token verification:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export default verifyJWT;
