import express from 'express';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Generate certificate
router.get('/:courseId/certificate', protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      user_id: req.user._id,
      course_id: req.params.courseId
    });

    if (!enrollment || enrollment.progress < 100) {
      return res.status(403).json({ message: 'Course not completed' });
    }

    const course = await Course.findById(req.params.courseId);
    const user = await User.findById(req.user._id);

    const certificateData = {
      studentName: user.fullName || user.email,
      courseName: course.title,
      completionDate: enrollment.completed_at || new Date(),
      certificateId: `CERT-${enrollment._id}`
    };

    enrollment.certificate_issued = true;
    await enrollment.save();

    res.json(certificateData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
