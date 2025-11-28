import mongoose from "mongoose";

const { Schema } = mongoose;

const ticketMessageSchema = new Schema({
  ticketId: { type: Schema.Types.ObjectId, ref: 'SupportTicket', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isStaff: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const TicketMessage = mongoose.model("TicketMessage", ticketMessageSchema);

export default TicketMessage;
