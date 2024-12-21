import User from '../models/userModel.js';

const userController = async (req, res) => {
  try {
    const newUser = new User({
      name: 'John Doe',
      email: 'john@doe.com',
    });

    await newUser.save();
    console.log('User created:', newUser);
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.log('An error occured while creating user!');
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
};

export default userController;
