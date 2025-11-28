import mongoose from "mongoose";

const { Schema } = mongoose;

const courseReviewSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String, default: "" }
  },
  { timestamps: true }
);

const CourseReview = mongoose.model("CourseReview", courseReviewSchema);

export default CourseReview;
