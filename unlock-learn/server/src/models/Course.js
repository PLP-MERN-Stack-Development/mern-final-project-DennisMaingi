import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    difficulty_level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    level: String,

    is_published: { type: Boolean, default: true },

    price: { type: Number, default: 0 },
    currency: { type: String, default: 'USD' },
    enrolled: { type: Number, default: 0 },

    instructor: { type: Schema.Types.Mixed },

    thumbnail: { type: String, default: "" },

    duration: { type: Schema.Types.Mixed, default: 0 },

    tags: [{ type: String }],

    learning_objectives: [{ type: String }],

    requirements: [{ type: String }],

    content: [{
      title: String,
      type: { type: String, enum: ['video', 'pdf', 'text', 'quiz'] },
      url: String,
      duration: Number,
      order: Number
    }],

    resources: { type: Schema.Types.Mixed, default: [] }
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
