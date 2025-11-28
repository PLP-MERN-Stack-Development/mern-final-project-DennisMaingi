// routes/content.js
import express from 'express';
import { protect } from "../middleware/protect.js";
import Content from '../models/Content.js'; // ✅ FIXED

const router = express.Router();

// CREATE content (protected)
router.post('/', protect, async (req, res) => {
  try {
    const content = await Content.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(content);
  } catch (err) {
    console.error('❌ Error creating content:', err);
    res.status(500).json({ message: 'Failed to create content.' });
  }
});

// GET ALL content
router.get('/', async (req, res) => {
  try {
    const content = await Content.find().sort({ createdAt: -1 });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch content.' });
  }
});

// GET content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found.' });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch this content.' });
  }
});

// UPDATE content (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Content not found.' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update content.' });
  }
});

// DELETE content (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Content not found.' });
    }

    res.json({ message: 'Content deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete content.' });
  }
});

export default router;
