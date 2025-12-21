import express from "express";
import { sendOtp, verifyOtp } from "../controllers/authController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", auth, (req, res) => {
    console.log("AUTH HEADER:", req.headers.authorization);

  res.json({
    success: true,
    user: req.user,
  });
});
export default router;
