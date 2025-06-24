import express from "express";
import { registerUser, loginUser, getUserProfile, getOtherUserProfile, logoutUser, updateUserProfile } from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect,  getUserProfile);
router.post("/logout", protect, logoutUser);
router.patch("/profile/update", protect, updateUserProfile);
router.get("/profile/:id", getOtherUserProfile);

export default router;
