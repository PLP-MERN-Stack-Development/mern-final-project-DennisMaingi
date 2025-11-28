import mongoose from "mongoose";

const { Schema } = mongoose;

const quizSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    title: { type: String, required: true },
    instructorId: { type: String, required: true },
    description: { type: String },
    passingScore: { type: Number, default: 70 },
    timeLimitMinutes: { type: Number },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
