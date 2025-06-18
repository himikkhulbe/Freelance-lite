import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    const { name, username, email, password, role } = req.body;
    if(!name || !username || !email || !password || !role){
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
    const userId = req.user.id; // Assuming you have middleware to set req.user

    try {
        const user = await User.findById(userId).select("-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const logoutUser = (req, res) => {
    if (!req.cookies?.token) {
        return res.status(204).json({ message: "No user logged in" });
    }
    try{
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};