import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true },
    otp_hash: { type: String, required: true },
    expires_at: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Otp", otpSchema);
