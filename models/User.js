import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  label: { type: String, default: "Home" },
  name: String,
  phone: String,
  house_no: String,
  street: String,
  landmark: String,
  city: String,
  state: String,
  pincode: String,
  cart: [
  {
    product_id: String,
    variant_id: String,
    qty: Number
  }
],
  is_default: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema(
  {
    user_id: String,
    mobile: { type: String, required: true, unique: true },
    full_name: String,
    gender: String,
    dob: String,
    profile_image: String,
    is_verified: { type: Boolean, default: false },

    addresses: [addressSchema]   //  NEW
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
