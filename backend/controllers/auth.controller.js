const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateVerificationEmail, generateResetPasswordEmail } = require('../utils/mailer.js');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,             // secret key
      { expiresIn: '1d' }                 // token valid for 1 day
    );

    res.status(200).cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 }).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const first_name = firstName;
  const last_name = lastName;

  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const newUser = new User({ first_name, last_name, email, password: hashedPassword, verificationToken, verificationTokenExpiresAt });

    const savedUser = await newUser.save();
    await generateVerificationEmail(savedUser, verificationToken);
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email }, // payload
      process.env.JWT_SECRET,             // secret key
      { expiresIn: '1d' }                 // token valid for 1 day
    );

    res.status(201).cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 }).json({ message: "User created successfully", user: savedUser, token });

  } catch (error) {
    console.error("Error occurred during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/?verify=failed`);
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.redirect(`${process.env.CLIENT_URL}/?verify=success`);
  } catch (error) {
    console.error("Error verifying user:", error);
    res.redirect(`${process.env.CLIENT_URL}/?verify=error`);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // Send reset link
    await generateResetPasswordEmail(user, resetToken);

    res.json({ message: "Reset link sent" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) return res.status(400).json({ message: "Token and password are required" });

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    // Optionally send confirmation email
    // await generateResetPasswordEmail(user);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createVerification = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = verificationTokenExpiresAt;

    await user.save();

    await generateVerificationEmail(user, verificationToken);
    console.log('Done');
    res.status(200).json({ message: "Verification email sent successfully" });
  } catch (error) {
    console.error("Error creating verification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 }).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  Signup,
  Login,
  verifyUser,
  forgotPassword,
  resetPassword,
  createVerification,
  me
};
