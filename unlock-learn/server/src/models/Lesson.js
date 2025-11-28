import mongoose from "mongoose";

const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    videoUrl: { type: String },
    orderIndex: { type: Number, required: true },
    durationMinutes: { type: Number },
    isPreview: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // automatically manages createdAt & updatedAt
);

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
