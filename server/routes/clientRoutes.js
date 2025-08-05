import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {createJob, getMyJobs, getJobs, getJob, updateJob, deleteJob, getAllJobs, UploadProposal, getProposals, updateProposalStatus} from "../controller/jobController.js";

const router = express.Router();


router.post("/job", protect, createJob);
router.get("/job/my", protect, getMyJobs);
router.get("/jobs/:id", getJobs);
router.get("/job/:id", getJob);
router.put("/job/:id", protect, updateJob);
router.delete("/job/:id", protect, deleteJob);
router.get("/jobs", getAllJobs);
router.post("/job/:id/proposal", protect, UploadProposal);
router.get("/job/:id/proposals", protect, getProposals);
router.put("/job/proposal/:id", protect, updateProposalStatus);



export default router;