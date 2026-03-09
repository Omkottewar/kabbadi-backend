import { createMatch, getMyMatches } from "../controllers/MatchController.js";
import express from "express";
import { updateProfile, getProfile,addAddress,getAddresses,selectAddress,updateCart } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/create", authMiddleware, createMatch);

router.get("/my", authMiddleware, getMyMatches);

export default router;
