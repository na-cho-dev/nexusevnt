import mongoose from 'mongoose';

const db_connection = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);

    console.log(`Connection to Database Successful`);
  } catch (err) {
    console.log(`Failed to connect to Database: ${err}`);
  }
};

export default db_connection;
