import User from '../models/usersModel.js';
import { hashPassword } from '../utils/hash.js';

const registerController = async (req, res) => {
  const { first_name, last_name, email, phone_number, role, password } =
    req.body;

  const userData = {
    first_name,
    last_name,
    email,
    phone_number,
    role,
    password,
  };

  for (const key in userData) {
    if (key === 'role') continue;

    if (!userData[key])
      return res.status(400).json({ message: `${key} is required` });
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    console.log(`User with email: ${userData.email} already exists!`);
    return res
      .status(400)
      .json({ message: `User with email: ${userData.email} already exists!` });
  }

  userData.password = String(await hashPassword(userData.password));
  const newUser = new User(userData);

  try {
    await newUser.save();
    console.log('User created:', newUser);
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.log(`An error occured while creating user! ${error}`);
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
};

export default registerController;
