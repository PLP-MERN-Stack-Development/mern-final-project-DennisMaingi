// src/routes/course-reviews.js
import express from 'express';
import CourseReview from '../models/CourseReview.js';

const router = express.Router();

// GET reviews for a course
router.get('/', async (req, res) => {
  const { courseId } = req.query;
  try {
    const filter = courseId ? { courseId } : {};
    const reviews = await CourseReview.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: err.message });
  }
});

// CREATE review
router.post('/', async (req, res) => {
  try {
    const review = new CourseReview(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE review (user ownership)
router.put('/:id', async (req, res) => {
  try {
    const review = await CourseReview.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.userId.toString() !== req.body.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
