import express from "express";
import { updateProfile, getProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);

export default router;
