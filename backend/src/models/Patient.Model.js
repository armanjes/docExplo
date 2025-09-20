import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["card", "paypal", "bkash"],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true, // optional, some may be unpaid
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
