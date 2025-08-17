import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
export default router; 