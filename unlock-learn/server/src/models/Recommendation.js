import mongoose from 'mongoose';

const RecommendationSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  recommendedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);
export default Recommendation;
