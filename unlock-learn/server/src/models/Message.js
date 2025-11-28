import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    conversationId: { type: String, required: true, index: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isAI: { type: Boolean, default: false },
    type: { type: String, enum: ["text", "image", "file", "system"], default: "text" },
    aiModel: { type: String, default: "google/gemini-2.5-flash" },
    tokens: {
      prompt: { type: Number },
      completion: { type: Number },
      total: { type: Number }
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

// Indexes
messageSchema.index({ conversationId: 1, createdAt: 1 });
messageSchema.index({ user: 1, createdAt: -1 });
messageSchema.index({ user: 1, conversationId: 1 });

// Virtual field for role
messageSchema.virtual("role").get(function () {
  return this.isAI ? "assistant" : "user";
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
