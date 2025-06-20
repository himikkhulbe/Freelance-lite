import express from "express";
import { registerUser, loginUser, getUserProfile, getOtherUserProfile, logoutUser, getServices } from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect,  getUserProfile);
router.post("/logout", protect, logoutUser);
router.get("/profile/:username", getOtherUserProfile);
router.get("/profile/:id/services", getServices);

export default router;
