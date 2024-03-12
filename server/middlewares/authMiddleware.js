const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  // Check if the request headers contain the authorization key
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  // Grab the token from headers (take away "Bearer" string away)
  const token = authorization.split(" ")[1];

  try {
    // Decode and extract the user id from token
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    // Save user in request
    req.user = await User.findById(_id).select("_id");
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
