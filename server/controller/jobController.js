import Job from "../models/jobModels.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const createJob = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "client") {
        return res.status(403).json({ message: "Only clients can create jobs." });
    }

    try {
        const {
            title,
            description,
            category,
            requiredSkills,
            duration,
            deadline,
            budget
        } = req.body;

        const job = await Job.create({
            client: userId,
            title,
            description,
            category,
            requiredSkills,
            duration,
            deadline,
            budget
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyJobs = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const jobs = await Job.find({ client: userId }).populate("user", "name profilePicture username").sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}




export const getJobs = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ message: "Invalid User Id" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return user.status(404).json({ message: "User not found" });
        }
        const jobs = await Job.find({ client: userId });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}




export const getJob = async (req, res) => {
    const jobId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(404).json({ message: "Invalid Job Id" });
        }

        const job = await Job.findById(jobId)
            .populate("client", "name email profilePicture username isVerified averageRating reviewCount location createdAt Languages")
            .populate("proposals.freelancer", "name username profilePicture") // ✅ This populates freelancer in proposals
            .sort({ createdAt: -1 });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const jobs = await Job.find({ client: job.client._id.toString(), _id: { $ne: jobId } })
            .populate("client", "_id")
            .sort({ createdAt: -1 });
        console.log(jobs);
        res.status(200).json({ job, jobs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user._id;
    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(404).json({ message: "Invalid Job Id" });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (job.client.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this job" });
        }
        const allowedFields = ['title', 'description', 'category', 'requiredSkills', 'duration', 'deadline', 'budget'];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                job[field] = req.body[field];
            }
        });
        await job.save();
        res.status(200).json({ message: "Job updated successfully", job });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteJob = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user._id;

    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(404).json({ message: "Invalid Job Id" });
        }
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (job.client.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this job" });
        }

        await Job.findByIdAndDelete(jobId);

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Delete job error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("client", "name profilePicture username").sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const UploadProposal = async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user._id;
    const { bidAmount, coverLetter } = req.body;
    console.log(bidAmount, coverLetter);

    try {   
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(404).json({ message: "Invalid Job Id" });
        }
        const job = await Job.findById(jobId);ghhg
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        const user = await User.findById(userId);
        if(user.role !== 'freelancer'){
            return res.status(403).json({ message: "Only fleelancer can submit proposals." });
        
        }

        const proposal = {
            freelancer: userId,
            coverLetter,
            bidAmount,
            status: 'pending'
        };

        job.proposals.push(proposal);
        await job.save();

        res.status(201).json({ message: "Proposal submitted successfully", proposal });
    } catch (error) {
        console.error("Error submitting proposal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getProposals = async (req, res) => {
    const jobId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(404).json({ message: "Invalid Job Id" });
        }
        const job = await Job.findById(jobId).populate("proposals.freelancer", "name profilePicture username").sort({ createdAt: -1 });
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job.proposals);
        console.log("Proposals for job:", job);
    } catch (error) {
        console.error("Error fetching proposals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateProposalStatus = async (req, res) => {
    const jobId = req.params.jobId;
    const proposalId = req.params.proposalId;
    const { status } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(404).json({ message: "Invalid Job Id" });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const proposal = job.proposals.id(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }

        proposal.status = status;
        await job.save();

        res.status(200).json({ message: "Proposal status updated successfully", proposal });
    } catch (error) {
        console.error("Error updating proposal status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}