import mongoose from "mongoose";

const { Schema } = mongoose;

const forumTopicSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "ForumCategory", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

const ForumTopic = mongoose.model("ForumTopic", forumTopicSchema);

export default ForumTopic;
