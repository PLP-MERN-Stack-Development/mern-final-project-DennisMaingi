// src/models/AnalyticsEvent.js
import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventType: { type: String, required: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);

export default AnalyticsEvent;
