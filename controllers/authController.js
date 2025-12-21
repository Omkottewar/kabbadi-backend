import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import User from "../models/User.js";
import Otp from "../models/Otp.js";

export const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile required" });

  const otp = 123456;
  const otp_hash = await bcrypt.hash(otp.toString(), 10);

  await Otp.findOneAndUpdate(
    { mobile },
    { otp_hash, expires_at: Date.now() + 2 * 60 * 1000 },
    { upsert: true }
  );

  return res.json({
    success: true,
    message: "OTP sent (testing mode)",
    note: "Use OTP 123456"
  });
};

export const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  const otpData = await Otp.findOne({ mobile });
  if (!otpData) return res.status(400).json({ message: "OTP not found" });

  if (otpData.expires_at < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  const valid = await bcrypt.compare(otp.toString(), otpData.otp_hash);
  if (!valid) {
    return res.status(400).json({
      message: "Invalid OTP",
      note: "For testing use 123456"
    });
  }

  let user = await User.findOne({ mobile });
  if (!user) {
    user = await User.create({
      user_id: uuidv4(),
      mobile,
      is_verified: true
    });
  }

  await Otp.deleteMany({ mobile });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.json({
    success: true,
    message: "Login success",
    user,
    token
  });
};
