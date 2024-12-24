import User from '../models/userModel.js';

const logoutController = async (req, res) => {
  // On Client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.JWT) return res.sendStatus(204);
  const refreshToken = cookies.JWT;
  try {
    const existingUser = await User.findOne({ refresh_token: refreshToken });
    // console.log(existingUser);
    if (!existingUser) {
      res.clearCookie('JWT', {
        httpOnly: true,
        sameSite: 'None',
        secure: process.env.NODE_ENV_MODE === 'prod',
        path: '/',
      });
      return res.sendStatus(204);
    }

    // Delete Refresh Token from DB
    await User.findByIdAndUpdate(
      existingUser._id,
      { $unset: { refresh_token: '' } },
      { new: true }
    );
    console.log(`Logged out User: ${existingUser}`);
    res.clearCookie('JWT', {
      httpOnly: true,
      sameSite: 'None',
      secure: process.env.NODE_ENV_MODE === 'prod',
      path: '/',
    });
    return res.sendStatus(204);
  } catch (error) {
    console.log(`An error occured while Logging Out! ${error}`);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

export default logoutController;
