import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {uploadServices, getMyServices, getServices, getservice, deleteService} from "../controller/serviceController.js";

const router = express.Router();

router.post("/service", protect, uploadServices);
router.get("/services/my", protect, getMyServices);
router.get("/services/:id", getServices);
router.get("/service/:id", getservice);
// router.put("/service/:id", protect, updateService);
router.delete("/service/:id", protect, deleteService);







export default router;
