import mongoose from "mongoose";

const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrolled_at: { type: Date, default: Date.now },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    completed_at: { type: Date },
    payment_id: { type: Schema.Types.ObjectId, ref: "Payment" },
    completed_content: [{ type: String }],
    certificate_issued: { type: Boolean, default: false },
    certificate_url: { type: String }
  },
  { timestamps: true }
);

// Ensure user cannot enroll in same course twice
enrollmentSchema.index({ user_id: 1, course_id: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
