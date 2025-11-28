import mongoose from "mongoose";

const { Schema } = mongoose;

const certificateSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    enrollmentId: { type: Schema.Types.ObjectId, ref: "Enrollment", required: true },
    certificateNumber: { type: String, unique: true, required: true },
    issuedAt: { type: Date, default: Date.now }
  }
);

// Optional: ensure a unique certificate per course + user + enrollment
certificateSchema.index(
  { courseId: 1, userId: 1, enrollmentId: 1 },
  { unique: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
