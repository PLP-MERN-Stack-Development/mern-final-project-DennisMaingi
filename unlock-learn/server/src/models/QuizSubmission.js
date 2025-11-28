import mongoose from "mongoose";

const { Schema } = mongoose;

const quizSubmissionSchema = new Schema({
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: Map, of: Schema.Types.Mixed, required: true },
  score: { type: Number },
  passed: { type: Boolean },
  submittedAt: { type: Date, default: Date.now },
});

const QuizSubmission = mongoose.model("QuizSubmission", quizSubmissionSchema);

export default QuizSubmission;
