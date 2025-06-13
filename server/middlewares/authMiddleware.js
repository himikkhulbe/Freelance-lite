import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: "Not authorized, no token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        req.user = user;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

