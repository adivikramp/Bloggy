const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* --------------------------------------------- Creating JWT --------------------------------------------- */
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "10d" });
};

/* --------------------------------------------- Register User --------------------------------------------- */
const registerUser = async (req, res) => {
  // Grab data from request body
  const { email, password } = req.body;

  // Check the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  // Check if email is already registered
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Registering the user
    const user = await User.create({ email, password: hashedPassword });
    // Creating the json web token
    const token = createToken(user._id);
    // Send the response
    res.status(200).json({ email, token });
  } catch (err) {
    console.log(err);
  }
};

/* --------------------------------------------- Login User --------------------------------------------- */
const loginUser = async (req, res) => {
  // Grab data from request body
  const { email, password } = req.body;

  // Check the fields are not empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are mandatory" });
  }

  // Check if email is registered or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email not registered" });
  }

  // Check password
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(400).json({ error: "Password incorrect" });
  }

  try {
    // Creating the json web token
    const token = createToken(user._id);
    // Send the response
    res.status(200).json({ email, token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser };
