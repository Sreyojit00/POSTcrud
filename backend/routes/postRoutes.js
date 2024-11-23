const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Adjust the path as needed
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Name of the folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Accepted file types
  },
});

// Initialize Multer
const upload = multer({ storage });

module.exports = upload;


// POST request to create a post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body; // Change content to description
    const image = req.file ? req.file.path : null; // Check if image exists

    // Create a new post in the database
    const newPost = new Post({ title, description, image });
    await newPost.save();

    // Send the newly created post as a response
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Server Error');
  }
});

// GET request to fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Server Error');
  }
});

// GET request to fetch a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Find a post by ID

    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Server Error');
  }
});

// PUT request to update a post
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body; // Change content to description
    const image = req.file ? req.file.path : null;

    // Find and update the post by ID
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true } // Return the updated post
    );

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Server Error');
  }
});

// DELETE request to delete a post
router.delete('/:id', async (req, res) => {
  try {
    // Find and delete the post by ID
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).send('Post not found');
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
