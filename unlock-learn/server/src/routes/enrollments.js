// src/routes/enrollments.js
import express from 'express';
import Enrollment from '../models/Enrollment.js';

const router = express.Router();

// Get enrollments
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { user_id: userId } : {};
    const enrollments = await Enrollment.find(filter);
    res.json(enrollments);
  } catch (err) {
    console.error('Get enrollments error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create enrollment
router.post('/', async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    console.error('Create enrollment error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update enrollment
router.put('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });

    if (enrollment.user_id.toString() !== req.body.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(enrollment, req.body);
    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    console.error('Update enrollment error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete enrollment
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });

    if (enrollment.user_id.toString() !== req.body.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await enrollment.deleteOne();
    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    console.error('Delete enrollment error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
