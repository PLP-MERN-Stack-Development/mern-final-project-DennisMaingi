// src/models/MpesaPayment.js
import mongoose from 'mongoose';

const mpesaPaymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    transactionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('MpesaPayment', mpesaPaymentSchema);
