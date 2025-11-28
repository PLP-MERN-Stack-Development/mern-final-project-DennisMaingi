import mongoose from "mongoose";

const { Schema } = mongoose;

const forumPostSchema = new Schema(
  {
    topicId: { type: Schema.Types.ObjectId, ref: "ForumTopic", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

const ForumPost = mongoose.model("ForumPost", forumPostSchema);

export default ForumPost;
