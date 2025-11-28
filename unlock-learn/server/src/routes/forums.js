// src/routes/forum-topic.js
import express from 'express';
import ForumTopic from '../models/ForumTopic.js';

const router = express.Router();

// Get all forum topics for a category
router.get('/', async (req, res) => {
  const categoryId = req.query.categoryId;
  try {
    const filter = categoryId ? { categoryId } : {};
    const topics = await ForumTopic.find(filter);
    res.json(topics);
  } catch (err) {
    console.error('Get forum topics error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a forum topic
router.post('/', async (req, res) => {
  try {
    const topic = await ForumTopic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    console.error('Create forum topic error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update a forum topic
router.put('/:id', async (req, res) => {
  try {
    const topic = await ForumTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    Object.assign(topic, req.body);
    await topic.save();
    res.json(topic);
  } catch (err) {
    console.error('Update forum topic error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete a forum topic
router.delete('/:id', async (req, res) => {
  try {
    const topic = await ForumTopic.findById(req.params.id);
    if (!topic) return res.status(404).json({ error: 'Topic not found' });

    await topic.deleteOne();
    res.json({ message: 'Topic deleted' });
  } catch (err) {
    console.error('Delete forum topic error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
