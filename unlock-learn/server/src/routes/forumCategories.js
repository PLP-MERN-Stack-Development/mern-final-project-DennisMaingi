// src/models/ForumCategory.js
import mongoose from 'mongoose';

const forumCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const ForumCategory = mongoose.model('ForumCategory', forumCategorySchema);

export default ForumCategory;
