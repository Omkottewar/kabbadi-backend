import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import User from "../models/User.js";

console.log("JWT_SECRET LOADED IN MIDDLEWARE:", process.env.JWT_SECRET);

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-__v");

    if (!user) {
      return res.status(401).json({ success: false });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false });
  }
};

export default auth;
