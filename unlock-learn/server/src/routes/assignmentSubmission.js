// src/routes/assignment-submissions.js
import express from 'express';
import AssignmentSubmission from '../models/AssignmentSubmission.js';

const router = express.Router();

// Get submissions
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { userId } : {};
    const submissions = await AssignmentSubmission.find(filter);
    res.json(submissions);
  } catch (err) {
    console.error('Get submissions error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create submission
router.post('/', async (req, res) => {
  try {
    const submission = await AssignmentSubmission.create(req.body);
    res.status(201).json(submission);
  } catch (err) {
    console.error('Create submission error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update submission
router.put('/:id', async (req, res) => {
  try {
    const submission = await AssignmentSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    if (submission.userId.toString() !== req.body.userId) {
      return res.status(403).json({ error: 'Not authorized to update this submission' });
    }

    Object.assign(submission, req.body);
    await submission.save();
    res.json(submission);
  } catch (err) {
    console.error('Update submission error:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
