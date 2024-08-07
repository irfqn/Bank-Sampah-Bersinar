const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

// Helper function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login Request Body:', req.body); // Logging for debugging

  try {
    const user = await User.login(email, password);

    // Sign in token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.error('Login Error:', error.message); // Logging for debugging
    res.status(400).json({ error: error.message });
  }
};

// Signup controller
exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, birthPlace, birthDate, phone, nik, address } = req.body;

  console.log('Signup Request Body:', req.body); // Logging for debugging

  try {
    const user = await User.signup({ email, password, firstName, lastName, birthPlace, birthDate, phone, nik, address });

    // Sign in token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.error('Signup Error:', error.message); // Logging for debugging
    res.status(400).json({ error: error.message });
  }
};

// Profile controller
exports.profile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.error('Profile Error:', error.message); // Logging for debugging
    res.status(500).json({ message: error.message });
  }
};

// Get all users controller
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
