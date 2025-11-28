import mongoose from "mongoose";

const { Schema } = mongoose;

const forumCategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  orderIndex: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const ForumCategory = mongoose.model("ForumCategory", forumCategorySchema);

export default ForumCategory;
