import mongoose from 'mongoose';
const { Schema } = mongoose;

const userInteractionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    interaction_type: {
      type: String,
      enum: ['view', 'like', 'share', 'comment', 'enroll'],
      required: true,
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);

export default UserInteraction;
