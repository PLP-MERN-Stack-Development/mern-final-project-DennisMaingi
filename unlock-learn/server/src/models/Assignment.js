import mongoose from 'mongoose';

const { Schema } = mongoose;

const assignmentSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson' },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  maxPoints: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create and export the model
const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
