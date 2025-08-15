import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {createJob, getMyJobs, getJobs, getJob, updateJob, deleteJob, getAllJobs, UploadProposal, getProposals, getMyProposals, editProposal, cancelProposal, getReceivedProposals, agreeStartWork, markAsCompleted } from "../controller/jobController.js";

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
router.get("/myproposals", protect, getMyProposals);
router.put("/editproposal/:id", protect, editProposal);
router.put("/cancelproposal/:id", protect, cancelProposal);
router.get("/receivedproposals", protect, getReceivedProposals);
router.put("/agreestartwork/:id", protect, agreeStartWork);
router.put("/completework/:id", protect, markAsCompleted);



export default router;