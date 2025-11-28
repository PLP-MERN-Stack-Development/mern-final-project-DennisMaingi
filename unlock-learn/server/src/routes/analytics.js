// src/routes/analytics.js
import express from 'express';
import UserInteraction from '../models/UserInteraction.js';
import Course from '../models/Course.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Track interaction
router.post('/track', protect, async (req, res) => {
  try {
    const { interaction_type, course_id, metadata } = req.body;
    const userId = req.user._id;

    if (!interaction_type || !course_id) {
      return res.status(400).json({ error: 'interaction_type and course_id are required' });
    }

    const interaction = await UserInteraction.create({
      user_id: userId,
      course_id,
      interaction_type,
      metadata: metadata || {}
    });

    res.json({ message: 'Interaction recorded', interaction });
  } catch (err) {
    console.error('Analytics track error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Course analytics
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const stats = await UserInteraction.aggregate([
      { $match: { course_id: req.params.courseId } },
      { $group: { _id: '$interaction_type', count: { $sum: 1 } } }
    ]);
    res.json({ courseId: req.params.courseId, stats });
  } catch (err) {
    console.error('Course analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Top courses
router.get('/top-courses', protect, async (req, res) => {
  try {
    const topCourses = await UserInteraction.aggregate([
      { $group: { _id: '$course_id', interactions: { $sum: 1 } } },
      { $sort: { interactions: -1 } },
      { $limit: 10 }
    ]);

    const courses = await Course.find({ _id: { $in: topCourses.map(c => c._id) } })
      .select('title thumbnail category');

    res.json({ topCourses, courseDetails: courses });
  } catch (err) {
    console.error('Top courses error:', err);
    res.status(500).json({ error: err.message });
  }
});

// User analytics
router.get('/user', protect, async (req, res) => {
  try {
    const activity = await UserInteraction.aggregate([
      { $match: { user_id: req.user._id } },
      { $group: { _id: '$interaction_type', count: { $sum: 1 } } }
    ]);
    res.json({ userId: req.user._id, activity });
  } catch (err) {
    console.error('User analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Platform overview
router.get('/overview', protect, async (req, res) => {
  try {
    const overview = await UserInteraction.aggregate([
      { $group: { _id: '$interaction_type', total: { $sum: 1 } } }
    ]);

    const totalUsers = await UserInteraction.distinct('user_id').countDocuments();
    const totalCourses = await UserInteraction.distinct('course_id').countDocuments();

    res.json({ overview, totals: { usersActive: totalUsers, coursesEngaged: totalCourses } });
  } catch (err) {
    console.error('Overview analytics error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
