// src/routes/quizSubmissions.js
import express from 'express';
import QuizSubmission from '../models/QuizSubmission.js';

const router = express.Router();

// Get submissions (optionally by user)
router.get('/', async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { userId } : {};
    const submissions = await QuizSubmission.find(filter);
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching quiz submissions:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a submission
router.post('/', async (req, res) => {
  try {
    const submission = await QuizSubmission.create(req.body);
    res.status(201).json(submission);
  } catch (err) {
    console.error('Error creating quiz submission:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
