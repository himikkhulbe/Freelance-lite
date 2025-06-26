import Job from "../models/clientModels.js";
import User from "../models/userModel.js";

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
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

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
