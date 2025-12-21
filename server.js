import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
console.log("ENV LOADED:", process.env.JWT_SECRET);
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/products", storeRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));