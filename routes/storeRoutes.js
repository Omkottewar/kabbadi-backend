import express from "express";
import { getStoreHome } from "../controllers/storeController.js";
import { getProductById } from "../controllers/productController.js";
const router = express.Router();

router.get("/home", getStoreHome);
router.get("/product/:id", getProductById);

export default router;
