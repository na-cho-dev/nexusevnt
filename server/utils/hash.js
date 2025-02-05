import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed Password:', hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.log(`Error hashing password: ${err}`);
    throw err;
  }
};

export const comparePassword = async (currentPassword, userPassword) => {
  try {
    const match = await bcrypt.compare(currentPassword, userPassword);
    if (match) {
      console.log('Password Matches');
      return true;
    } else {
      console.log('Password does not match');
      return false;
    }
  } catch (error) {
    console.error(`Error Comparing Password: ${error}`);
    throw error;
  }
};
