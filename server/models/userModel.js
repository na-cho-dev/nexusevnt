import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Field is required'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Field is required'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Field is required'],
      trim: true,
    },
    phone_number: {
      type: Number,
      required: [true, 'Field is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Field is required'],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ['Organizer', 'Attendee'],
      default: 'Attendee',
    },
    refresh_token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
