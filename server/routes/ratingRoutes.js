import express from "express";
import ratingUser from "../controller/ratingController.js"
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, ratingUser);

export default router;