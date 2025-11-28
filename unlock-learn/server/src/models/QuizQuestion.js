import mongoose from "mongoose";

const { Schema } = mongoose;

const quizQuestionSchema = new Schema({
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  question: { type: String, required: true },
  questionType: { type: String, default: 'multiple_choice' },
  options: { type: [String], default: [] },
  correctAnswer: { type: String, required: true },
  points: { type: Number, default: 1 },
  orderIndex: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);

export default QuizQuestion;
