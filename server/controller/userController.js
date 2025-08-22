import User from "../models/userModel.js";
import Service from "../models/serviceModels.js";
import Job from "../models/jobModels.js";
import Rating from "../models/ratingModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    const { name, username, email, password, role } = req.body;
    if (!name || !username || !email || !password || !role) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUser || existingUsername) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            role: role || "freelancer",
        });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true, 
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal server error"});
    }
};


export const getUserProfile = async (req, res) => {
    const userId = req.user.id;
    let data;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const ratings = await Rating.find({ ratedId: userId })
        .populate("raterId", "name profilePicture username isVerified").populate("serviceId", "title")
            .sort({ createdAt: -1 });
        if (user.role === "freelancer") {
            const services = await Service.find({ user: userId }).populate("user", "name profilePicture username isVerified").sort({ createdAt: -1 });
            data = { user, services, ratings };
            return res.status(200).json(data);
        }

        if (user.role === "client") {
            const jobs = await Job.find({ client: userId }).populate("client", "name profilePicture username isVerified").sort({ createdAt: -1 });
            data = { user, jobs, ratings };  
            return res.status(200).json(data);
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logoutUser = (req, res) => {
    if (!req.cookies?.token) {
        return res.status(204).json({ message: "No user logged in" });
    }
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "None",
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOtherUserProfile = async (req, res) => {
    const userId = req.params.id;
    let data;
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const ratings = await Rating.find({ ratedId: userId })
        .populate("raterId", "name profilePicture username isVerified").populate("serviceId", "title")
        .sort({ createdAt: -1 });
        if (user.role === "freelancer") {
            const services = await Service.find({ user: userId }).populate("user", "name profilePicture username isVerified").sort({ createdAt: -1 });
            data = { user, services, ratings };
            return res.status(200).json(data);
        }
        if (user.role === "client") {
            const jobs = await Job.find({ client: userId }).populate("client", "name profilePicture username isVerified").sort({ createdAt: -1 });
            data = { user, jobs, ratings };
            return res.status(200).json(data);
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" , error: error.message});
    }
}

export const updateUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const {
            name,
            location,
            profilePicture,
            contactInfo,
            socialMedia,
            Domain,
            skills
        } = req.body;

        const updates = {};

        if (name) updates.name = name;
        if (profilePicture) updates.profilePicture = profilePicture;
        if (location) updates.location = location;
        if (Domain) updates.Domain = Domain;
        if (skills && Array.isArray(skills)) updates.skills = skills;

        if (contactInfo) {
            updates.contactInfo = {};
            if (contactInfo.email) updates.contactInfo.email = contactInfo.email;
            if (contactInfo.phone) updates.contactInfo.phone = contactInfo.phone;
        }

        if (socialMedia) {
            updates.socialMedia = {};
            if (socialMedia.Github) updates.socialMedia.Github = socialMedia.Github;
            if (socialMedia.Linkedin) updates.socialMedia.Linkedin = socialMedia.Linkedin;
            if (socialMedia.Twitter) updates.socialMedia.Twitter = socialMedia.Twitter;
            if (socialMedia.Portfolio) updates.socialMedia.Portfolio = socialMedia.Portfolio;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Update User Profile Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
