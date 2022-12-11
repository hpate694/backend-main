const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.server.model");
const config = require('../../config/config');
const jwtKey = config.secretKey;

// @desc Register new user
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    username, email, password, firstName, lastName, address, city, postalCode,
    question1, answer1, question2, answer2
  } = req.body;

  // Check if user is already registered
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already registered! Email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username, email, password: hashedPassword, firstName, lastName, address, city, postalCode,
    question1, answer1, question2, answer2
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      question1: user.question1,
      answer1: user.answer1,
      question2: user.question2,
      answer2: user.answer2
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user.username),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ username: id }, jwtKey, { expiresIn: "10h" });
};

const updatePassword = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.findOneAndUpdate({ "username": username }, { "$set": { "password": hashedPassword } });
  res.status(200).send("Password updated");

}

const getUser = async (req, res) => {
  const OneUser = await User.findById(req.params.user);
  console.log(OneUser)
  if (!OneUser) {
    res.status(404);
    throw new Error("User not found");
  }
  return res.status(200).json(OneUser);
}


module.exports = {
  registerUser,
  getUser,
  loginUser,
  updatePassword
};
