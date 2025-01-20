import mongoose from 'mongoose';
// import Event from '../models/eventsModel.js';

const mongodb_connection = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);

    // await Event.collection.drop();
    console.log(`Connected to Mongo Database Successfully`);
  } catch (err) {
    console.log(`Failed to connect to Mongo Database: ${err}`);
  }
};

export default mongodb_connection;
