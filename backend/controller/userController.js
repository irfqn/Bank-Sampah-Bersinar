
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // sign in token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.signup = async (req, res) => {
  const { email, password, firstName, lastName, birthPlace, birthDate, phone, nik, address } = req.body;

  try {
    const user = await User.signup({ email, password, firstName, lastName, birthPlace, birthDate, phone, nik, address });

    // sign in token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    // Mendapatkan ID pengguna dari token yang divalidasi
    const userId = req.user._id;
    // console.log(req.user)

    // Mengambil data profil pengguna berdasarkan ID-nya dari database
    const user = await User.findById(userId);

    // Mengirim data profil pengguna sebagai respons
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude the password field from the response

    // If no users found, return a 404 status code
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Send the list of users as a response
    res.status(200).json(users);
  } catch (error) {
    // Handle database or server errors
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
