const bcrypt = require('bcrypt');
const User = require('../models/user.model');


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

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const Signup = async (req, res) => {
  // Map frontend fields to backend fields
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

    const newUser = new User({ first_name, last_name, email, password: hashedPassword });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });

  } catch (error) {
    console.error("Error occurred during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  Signup,
  Login,
};
