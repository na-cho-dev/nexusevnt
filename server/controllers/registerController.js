import User from '../models/usersModel.js';
import { hashPassword } from '../utils/hash.js';

const registerController = async (req, res) => {
  const { first_name, last_name, email, phone_number, role, password } =
    req.body;

  const userData = { first_name, last_name, email, phone_number, role, password };

  // Validate user input
  try {
    for (const key in userData) {
      if (key === 'role') continue;

      if (!userData[key]) {
        return res.status(400).json({ message: `${key} is required` });
      }
    }

    const isValidEmail = (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(userData.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const isValidPassword = (password) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );
    if (!isValidPassword(userData.password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters long, include uppercase, lowercase, numbers, and special characters.',
      });
    }

    const validRoles = ['Attendee', 'Organizer'];
    if (!validRoles.includes(userData.role)) {
      return res
        .status(400)
        .json({ message: 'Invalid role. Role must be Attendee or Organizer' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error validating user input', error: error.message });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({
        message: `User with email: ${userData.email} already exists!`,
      });
    }

    const existingPhoneNumber = await User.findOne({
      phone_number: userData.phone_number,
    });
    if (existingPhoneNumber) {
      return res.status(400).json({
        message: `User with phone number: ${userData.phone_number} already exists!`,
      });
    }

    // Hash the password and save user
    userData.password = String(await hashPassword(userData.password));
    const newUser = new User(userData);
    await newUser.save();

    const userResponse = {
      id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      phone_number: newUser.phone_number,
      role: newUser.role,
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse,
    });
  } catch (error) {
    console.log(`An error occurred while creating user! ${error}`);
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
};

export default registerController;
