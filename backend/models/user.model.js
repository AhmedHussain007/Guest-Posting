const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name too short"],
    maxlength: [50, "First name too long"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name too short"],
    maxlength: [50, "Last name too long"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    validate: {
      validator: function(v) {
        return /[A-Z]/.test(v) && /[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v);
      },
      message: props =>
        "Password must contain at least one uppercase letter, one number, and one special character",
    },
  },
  contact: {
    type: Number,
  },
  address: {
    type: String,
    default: "Update your address",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
