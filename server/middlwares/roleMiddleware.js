import User from '../models/userModel.js';

export const roleMiddleware = (roles) => {
  const verifyRole = async (req, res, next) => {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      console.log(`User with email: ${userData.email} does not exists!`);
      return res.status(400).json({
        message: `User with email: ${userData.email} does not exists!`,
      });
    }
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: 'Access denied: insufficient permissions' });
    }

    next();
  };

  return verifyRole;
};
