import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {uploadServices, getServices} from "../controller/serviceController.js";

const router = express.Router();

router.post("/service", protect, uploadServices);
router.get("/:id/service", getServices);


export default router;