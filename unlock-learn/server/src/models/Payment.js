import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    payment_method: {
      type: String,
      enum: ["stripe", "mpesa", "paypal"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending"
    },
    transaction_id: { type: String, required: true },
    stripe_session_id: { type: String },
    stripe_payment_intent: { type: String },
    phone_number: { type: String },
    mpesa_receipt_number: { type: String },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
