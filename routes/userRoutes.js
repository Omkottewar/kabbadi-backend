import express from "express";
import { updateProfile, getProfile,addAddress,getAddresses,selectAddress,updateCart } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.put("/update",  updateProfile);
router.post("/address/add", authMiddleware, addAddress);

// GET ALL ADDRESSES
router.get("/addresses", authMiddleware, getAddresses);

// SELECT DEFAULT ADDRESS
router.put("/address/select/:id", authMiddleware, selectAddress);


export default router;