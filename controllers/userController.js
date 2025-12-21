import User from "../models/User.js";
import Otp from "../models/Otp.js";
export const getProfile = async (req, res) => {
  res.json({ success: true, user: req.user });
};
export const updateProfile = async (req, res) => {
  try {
    const { full_name, gender, dob, profile_image, addresses } = req.body;

    // Validate - addresses must be an array if provided
    if (addresses && !Array.isArray(addresses)) {
      return res.status(400).json({
        success: false,
        message: "Addresses must be an array"
      });
    }

    const updateData = {
      full_name,
      gender,
      dob,
      profile_image,
      is_verified: true
    };

    // Only update addresses if provided
    if (addresses) {
      updateData.addresses = addresses;
    }

    const updated = await User.findOneAndUpdate(
      { user_id: req.user.user_id },
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.json({
      success: true,
      message: "Profile updated",
      user: updated
    });
  } catch (error) {
    console.log("PROFILE UPDATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const userId = req.user.user_id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {
      label,
      name,
      phone,
      house_no,
      street,
      landmark,
      city,
      state,
      pincode
    } = req.body;

    const newAddress = {
      label,
      name,
      phone,
      house_no,
      street,
      landmark,
      city,
      state,
      pincode,
      is_default: false
    };

    // Push to array, let MongoDB generate _id
    const updated = await User.findOneAndUpdate(
      { user_id: userId },
      { $push: { addresses: newAddress } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Address added",
      addresses: updated.addresses
    });

  } catch (err) {
    console.log("ADD ADDRESS ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAddresses = async (req, res) => {
  const user = await User.findOne({ user_id: req.user.user_id });
  return res.json({ success: true, addresses: user.addresses });
};
export const selectAddress = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ user_id: req.user.user_id });
  if (!user) return res.json({ success: false });

  user.addresses.forEach(a => (a.is_default = a._id.toString() === id));
  await user.save();

  return res.json({ success: true, message: "Default address updated" });
};
export const updateCart = async (req, res) => {
  try {
    const { cart } = req.body;

    const updated = await User.findOneAndUpdate(
      { user_id: req.user.user_id },
      { $set: { cart } },
      { new: true }
    );

    res.json({
      success: true,
      cart: updated.cart
    });
  } catch (err) {
    console.log("UPDATE CART ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getCart = async (req, res) => {
  const user = await User.findOne({ user_id: req.user.user_id });
  res.json({ success: true, cart: user.cart || [] });
};
