import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Last Name is required'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
    },
    phone_number: {
      type: Number,
      required: [true, 'Phone Number is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      select: false,
    },
    role: {
      type: String,
      required: false,
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
