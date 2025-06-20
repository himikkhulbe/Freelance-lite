import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {createJob, getMyJobs, getJobs, getJob, updateJob, deleteJob} from "../controller/jobController.js";

const router = express.Router();


router.post("/job", protect, createJob);
router.get("/job/my", protect, getMyJobs);
router.get("/jobs/:id", getJobs);
router.get("/job/:id", getJob);
router.put("/job/:id", protect, updateJob);
router.delete("/job/:id", protect, deleteJob);


export default router;