// src/models/ForumTopic.js
import mongoose from 'mongoose';

const forumTopicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumCategory' },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ForumTopic = mongoose.model('ForumTopic', forumTopicSchema);

export default ForumTopic;
