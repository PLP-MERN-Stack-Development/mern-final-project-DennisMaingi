// models/AssignmentSubmission.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const assignmentSubmissionSchema = new Schema(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    fileUrl: { type: String },
    submittedAt: { type: Date, default: Date.now },
    gradedAt: { type: Date },
    score: { type: Number },
    feedback: { type: String },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Unique submission per user per assignment
assignmentSubmissionSchema.index(
  { assignmentId: 1, userId: 1 },
  { unique: true }
);

const AssignmentSubmission = mongoose.model(
  "AssignmentSubmission",
  assignmentSubmissionSchema
);

export default AssignmentSubmission;
