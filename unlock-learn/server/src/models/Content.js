import mongoose from "mongoose";

const { Schema } = mongoose;

// -------------------------------
// Media Schema
// -------------------------------
const mediaSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^https?:\/\/\S+/.test(v),
        message: "Media URL must be a valid URL",
      },
    },
    mediaType: {
      type: String,
      enum: ["image", "video", "audio", "document"],
      required: true,
    },
  },
  { _id: false }
);

// -------------------------------
// Like Schema
// -------------------------------
const likeSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// -------------------------------
// Comment Schema (recursive)
// -------------------------------
const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [likeSchema],
    replies: [], // filled later
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// Add recursive structure AFTER schema creation
commentSchema.add({
  replies: [commentSchema],
});

// -------------------------------
// Content Schema
// -------------------------------
const contentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, maxlength: 1000 },
    content: { type: String, required: true },

    type: {
      type: String,
      enum: ["post", "course", "lesson", "article", "tutorial"],
      default: "post",
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
      validate: {
        validator: (v) => !v || /^https?:\/\/\S+/.test(v),
        message: "Thumbnail must be a valid URL",
      },
    },

    media: [mediaSchema],

    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    category: { type: String, default: "general" },
    tags: [String],

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    isPublic: { type: Boolean, default: true },

    accessLevel: {
      type: String,
      enum: ["free", "premium", "paid"],
      default: "free",
    },

    likes: [likeSchema],
    views: { type: Number, default: 0 },

    comments: [commentSchema],

    duration: { type: Number, min: 0 },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },

    prerequisites: [String],
    learningObjectives: [String],

    price: {
      amount: { type: Number, default: 0, min: 0 },
      currency: { type: String, default: "USD" },
    },
  },
  { timestamps: true }
);

// -------------------------------
// Indexes
// -------------------------------
contentSchema.index({ title: "text", description: "text", tags: "text" });
contentSchema.index({ type: 1, status: 1, isPublic: 1 });
contentSchema.index({ author: 1, createdAt: -1 });

// -------------------------------
// Export Model
// -------------------------------
const Content = mongoose.model("Content", contentSchema);

export default Content;
