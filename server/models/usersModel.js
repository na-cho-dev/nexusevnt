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
    profile_img: {
      data: { type: Buffer },
      mimeType: { type: String },
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      trim: true,
    },
    phone_number: {
      type: String,
      required: [true, 'Phone Number is required'],
      validate: {
        validator: function (v) {
          // Ensure it matches the E.164 format
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
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

userSchema.pre('save', function (next) {
  if (this.phoneNumber && !this.phoneNumber.startsWith('+')) {
    this.phoneNumber = `+${this.phoneNumber}`; // Prepend `+` if missing
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
