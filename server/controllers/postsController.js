const mongoose = require("mongoose");
const Post = require("../models/postModel");
const User = require("../models/userModel");

/* --------------------------------------------- Get existing posts --------------------------------------------- */
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

/* --------------------------------------------- Get user's existing posts --------------------------------------------- */
const getUserPosts = async (req, res) => {
  // Grab the authenticated user from request body
  const user = await User.findById(req.user._id);

  try {
    const userPosts = await Post.find({ user: user._id }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ userPosts, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

/* --------------------------------------------- Create new post --------------------------------------------- */
const newPost = async (req, res) => {
  const { title, body } = req.body;

  // Check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Grab the authenticated user from request body
  const user = await User.findById(req.user._id);

  try {
    const post = await Post.create({ title, body, user: user._id });
    res.status(200).json({ msg: "Post Call successful", post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Post Call failed" });
  }
};

/* --------------------------------------------- Delete a post --------------------------------------------- */
const deletePost = async (req, res) => {
  // Check if ID has a valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  //Check if posts exist
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // Check the user owns the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    await post.deleteOne();
    return res.status(200).json({ msg: "Post was deleted" });
  } catch (err) {
    console.log(err);
  }
};

/* --------------------------------------------- Update a post --------------------------------------------- */
const updatePost = async (req, res) => {
  // Grab the data
  const { title, body } = req.body;

  // Check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Check if post exists
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }

  // Check the user owns the post
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  try {
    await post.updateOne({ title, body });
    return res.status(200).json({ msg: "Post was updated" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getPosts, getUserPosts, newPost, deletePost, updatePost };
