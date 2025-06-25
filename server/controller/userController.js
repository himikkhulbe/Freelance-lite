import User from "../models/userModel.js";
import Service from "../models/freelancerModels.js";
import Job from "../models/clientModels.js";
import Rating from "../models/ratingModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    const { name, username, email, password, role } = req.body;
    if (!name || !username || !email || !password || !role) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUser || existingUsername) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            role: role || "freelancer", // Default role to 'user' if not provided
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
        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password." });
        }

        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 3. Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // 4. Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // 5. Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // 6. Respond with user data (without password)
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
        res.status(500).json({ message: "Internal server error" });
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

        // Sort ratings by newest first
        const ratings = await Rating.find({ ratedId: userId })
            .populate("raterId", "name profilePicture username")
            .sort({ createdAt: -1 });
        if (user.role === "freelancer") {
            const services = await Service.find({ user: userId }).sort({ createdAt: -1 });
            data = { user, services, ratings };
            return res.status(200).json(data);
        }

        if (user.role === "client") {
            const jobs = await Job.find({ client: userId }).sort({ createdAt: -1 });
            data = { user, jobs, ratings };  // ratings already sorted
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
            sameSite: "none",
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
        .populate("raterId", "name profilePicture username")
        .sort({ createdAt: -1 });
        if (user.role === "freelancer") {
            const services = await Service.find({ user: userId });
            data = { user, services, ratings };
            return res.status(200).json(data);
        }
        if (user.role === "client") {
            const jobs = await Job.find({ client: userId });
            const ratings = await Rating.find({ ratedId: userId });
            data = { user, jobs, ratings };
            return res.status(200).json(data);
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        console.log("➡️ Body:", req.body);
        console.log("➡️ File:", req.file);

        const {
            name,
            "contactInfo[email]": email,
            "contactInfo[phone]": phone,
            "socialMedia[Github]": github,
            "socialMedia[Linkedin]": linkedin,
            "socialMedia[Twitter]": twitter,
            "socialMedia[Portfolio]": portfolio
        } = req.body;

        const updates = {};

        if (name) updates.name = name;
        if (req.file && req.file.path) {
            updates.profilePicture = req.file.path;
        }

        if (email || phone) {
            updates.contactInfo = {};
            if (email) updates.contactInfo.email = email;
            if (phone) updates.contactInfo.phone = phone;
        }

        if (github || linkedin || twitter || portfolio) {
            updates.socialMedia = {};
            if (github) updates.socialMedia.Github = github;
            if (linkedin) updates.socialMedia.Linkedin = linkedin;
            if (twitter) updates.socialMedia.Twitter = twitter;
            if (portfolio) updates.socialMedia.Portfolio = portfolio;
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
        console.error("🔥 Update User Profile Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
