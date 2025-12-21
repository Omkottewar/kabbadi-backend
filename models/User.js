import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String },
    mobile: { type: String, required: true, unique: true },
    full_name: String,
    gender: String,
    dob: String,
    profile_image: String,
    is_verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
