import express from 'express';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get course content (only for enrolled users)
router.get('/:courseId/content', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).select('content resources price');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Allow free courses without enrollment
    if (course.price === 0) {
      return res.json({ content: course.content || [], resources: course.resources || [], progress: 0 });
    }

    // Check enrollment for paid courses
    const enrollment = await Enrollment.findOne({
      user_id: req.user._id,
      course_id: req.params.courseId
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    res.json({ content: course.content || [], resources: course.resources || [], progress: enrollment.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark content as completed
router.post('/:courseId/content/:contentId/complete', protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user_id: req.user._id,
      course_id: req.params.courseId
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    if (!enrollment.completed_content.includes(req.params.contentId)) {
      enrollment.completed_content.push(req.params.contentId);
    }

    const course = await Course.findById(req.params.courseId);
    const totalContent = course.content.length;
    enrollment.progress = Math.round((enrollment.completed_content.length / totalContent) * 100);

    if (enrollment.progress === 100 && !enrollment.completed_at) {
      enrollment.completed_at = new Date();
    }

    await enrollment.save();
    res.json({ progress: enrollment.progress, completed: enrollment.progress === 100 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
