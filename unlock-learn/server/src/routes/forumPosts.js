// src/models/ForumPost.js
import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema(
  {
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumTopic', required: true },
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ForumPost = mongoose.model('ForumPost', forumPostSchema);

export default ForumPost;
