import mongoose from 'mongoose';
const { Schema } = mongoose;

const userRoleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin', 'support'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // not using updatedAt
  }
);

// Ensure a user cannot have the same role twice
userRoleSchema.index({ userId: 1, role: 1 }, { unique: true });

const UserRole = mongoose.model('UserRole', userRoleSchema);

export default UserRole;
