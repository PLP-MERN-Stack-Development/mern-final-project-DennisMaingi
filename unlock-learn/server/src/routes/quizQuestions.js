// src/routes/quizQuestions.js
import express from 'express';
import QuizQuestion from '../models/QuizQuestion.js';

const router = express.Router();

// Get questions by quizId
router.get('/', async (req, res) => {
  const { quizId } = req.query;
  try {
    const filter = quizId ? { quizId } : {};
    const questions = await QuizQuestion.find(filter);
    res.json(questions);
  } catch (err) {
    console.error('Error fetching quiz questions:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create a question
router.post('/', async (req, res) => {
  try {
    const question = await QuizQuestion.create(req.body);
    res.status(201).json(question);
  } catch (err) {
    console.error('Error creating quiz question:', err);
    res.status(400).json({ error: err.message });
  }
});

// Update a question
router.put('/:id', async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    Object.assign(question, req.body);
    await question.save();
    res.json(question);
  } catch (err) {
    console.error('Error updating quiz question:', err);
    res.status(400).json({ error: err.message });
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    await question.deleteOne();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    console.error('Error deleting quiz question:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

