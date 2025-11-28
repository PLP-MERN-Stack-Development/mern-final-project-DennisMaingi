// src/routes/posts.js
import express from 'express';
import Post from '../models/post.js';

const router = express.Router();

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// CREATE a new post
router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();

    // Emit new post event via socket.io if available
    const io = req.app.get('io');
    if (io) {
      io.emit('new_post', post);
    }

    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ error: err.message || 'Invalid data' });
  }
});

export default router;
