import User from "../models/User.js";
import Otp from "../models/Otp.js";
export const getProfile = async (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { full_name, gender, dob, profile_image } = req.body;

    const updated = await User.findOneAndUpdate(
      { user_id: req.user.user_id },
      {
        $set: {
          full_name,
          gender,
          dob,
          profile_image,
          is_verified: true
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Profile updated",
      user: updated
    });
  } catch (error) {
    console.log("PROFILE UPDATE ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
