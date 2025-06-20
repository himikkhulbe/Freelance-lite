import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import serviceController from "../controller/serviceController.js";

const router = express.Router();

router.post("/service", protect, serviceController);

export default router;