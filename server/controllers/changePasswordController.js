import { hashPassword, comparePassword } from '../utils/hash.js';
import User from '../models/usersModel.js';

const changePasswordController = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = String(req.user._id);

  // console.log('Request In Controller', req.user);
  console.log('User ID', userId, '->', typeof userId);
  console.log('Current Password', currentPassword);
  console.log('New Password', newPassword);

  try {
    const user = await User.findById(userId).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate old password
    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Incorrect old password' });

    // Validate new password strength
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password is too short' });
    }

    // Hash new password
    user.password = String(await hashPassword(newPassword));
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error updating password', error: err.message });
    console.log('Server Error:', err);
  }
};

export default changePasswordController;
