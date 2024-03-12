const express = require("express");
const router = express.Router();
const {
  getPosts,
  getUserPosts,
  newPost,
  deletePost,
  updatePost,
} = require("../controllers/postsController");
const auth = require("../middlewares/authMiddleware");

// Get all posts
router.get("/", getPosts);

// Get all user's posts
router.get("/user", auth, getUserPosts);

// Add new post
router.post("/", auth, newPost);

// Delete a post
router.delete("/:id", auth, deletePost);

// Update a post
router.put("/:id", auth, updatePost);

module.exports = router;
