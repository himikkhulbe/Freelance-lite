import mongoose from "mongoose";
import Job from "../models/jobModels.js";
import User from "../models/userModel.js";
import Proposal from "../models/proposalModels.js";

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

        const proposal = await Proposal.find({ job: jobId }).populate("freelancer", "name username profilePicture");;

        const job = await Job.findById(jobId)
            .populate("client", "name email profilePicture username isVerified averageRating reviewCount location createdAt Languages")
            .sort({ createdAt: -1 });

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const jobs = await Job.find({ client: job.client._id.toString(), _id: { $ne: jobId } })
            .populate("client", "_id")
            .sort({ createdAt: -1 });
        console.log(jobs);
        res.status(200).json({ job, jobs, proposal });

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

    try {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(404).json({ message: "Invalid Job Id" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        const user = await User.findById(userId);
        if (user.role !== 'freelancer')
            return res.status(403).json({ message: "Only freelancers can submit proposals." });
        const proposal = await Proposal.create({
            client: job.client,
            job: jobId,
            freelancer: userId,
            coverLetter,
            bidAmount,
            status: 'pending',
            editing: 0,
            startWork: 'pending',
            conpletedWork: 'pending'
        });
        res.status(201).json({ message: "Proposal submitted successfully", proposal });
    } catch (error) {
        console.error("Error submitting proposal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// proposal for particular jobs
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


// proposal fetch for freelancer
export const getMyProposals = async (req, res) => {
    const userId = req.user._id;
    console.log(userId);
    try {
        const proposals = await Proposal.find({ freelancer: userId }).populate("client", "name location contactInfo").populate("job", "title description budget deadline").sort({ createdAt: -1 });
        console.log(proposals);
        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


// editing by freelancer
export const editProposal = async (req, res) => {
    const proposalId = req.params.id;
    const { bidAmount, coverLetter } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(proposalId)) {
            return res.status(404).json({ message: "Invalid Proposal Id" });
        }
        if (!bidAmount || !coverLetter) {
            return res.status(400).json({ message: "Bid amount and cover letter are required" });
        }
        if (bidAmount < 0) {
            return res.status(400).json({ message: "Bid amount must be greater than 0" });
        }
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        if (proposal.editing >= 2) {
            return res.status(400).json({ message: "You can only edit a proposal twice" });
        }
        const editedProposal = await Proposal.findByIdAndUpdate(proposalId, { bidAmount, coverLetter, editing: proposal.editing + 1 }, { new: true });
        if (!editedProposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        res.status(200).json({ message: "Proposal updated successfully", editedProposal });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


// cancel by freelancer
export const cancelProposal = async (req, res) => {
    const proposalId = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(proposalId)) {
            return res.status(404).json({ message: "Invalid Proposal Id" });
        }
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) {
            return res.status(404).json({ message: "Proposal not found" });
        }
        if(proposal.freelancer.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: "You are not authorized to cancel this proposal" });
        }
        proposal.status = 'cancelled';
        await proposal.save();
        res.status(200).json({ message: "Proposal cancelled successfully", proposal });
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getReceivedProposals = async (req, res) => {
    const userId = req.user._id;
    try {
        const proposals = await Proposal.find({ client: userId }).populate("freelancer", "name profilePicture rating averageRating location contactInfo").populate("job", "title description budget deadline").sort({ createdAt: -1 });
        res.status(200).json(proposals);
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
    }



    export const agreeStartWork = async (req, res) => {
        const proposalId = req.params.id;
        const userId = req.user._id;
        try {
            const proposal = await Proposal.findById(proposalId);
            if (!proposal) {
                return res.status(404).json({ message: "Proposal not found" });
            }
            if (proposal.freelancer.toString() !== userId.toString()) {
                return res.status(403).json({ message: "You are not authorized to start work on this proposal" });
            }
            proposal.startWork = 'accepted';
            proposal.status = 'processing';
            await proposal.save();
            res.status(200).json({ message: "Proposal accepted successfully", proposal });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }   
        }



        export const markAsCompleted = async (req, res) => {
            const proposalId = req.params.id;
            const userId = req.user._id;
            try {
                const proposal = await Proposal.findById(proposalId);
                if (!proposal) {
                    return res.status(404).json({ message: "Proposal not found" });
                }
                if (proposal.freelancer.toString() !== userId.toString()) {
                    return res.status(403).json({ message: "You are not authorized to mark this proposal as completed" });
                }
                proposal.completedWork = 'completed';
                proposal.status = 'completed';
                await proposal.save();
                res.status(200).json({ message: "Proposal marked as completed successfully", proposal })
            }catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }

}