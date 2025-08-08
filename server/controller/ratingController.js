import Rating from "../models/ratingModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";


const ratingUser = async (req, res) => {
    const {
        ratedId,
        rating,
        comment,
        associated
    } = req.body;
    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }
    if (!comment) {
        return res.status(400).json({
            message: "Comment is required"
        });
    }
    const userId = req.user._id;
    if (ratedId == userId) {
        return res.status(400).json({
            message: "You cannot rate yourself"
        });
    }
    const isAvailableratedId = await User.findOne({
        _id: ratedId
    });
    if (!isAvailableratedId) {
        return res.status(400).json({
            message: "Rated User not found"
        });
    }
    const existingRating = await Rating.findOne({
        raterId: userId,
        ratedId
    });
    if (existingRating) {
        return res.status(400).json({
            message: "You have already rated this user"
        });
    }
    try {
        const newRating = await Rating.create({
            raterId: userId,
            ratedId,
            rating,
            comment,
            associated
        })
        const avgResult = await Rating.aggregate([
            { $match: { ratedId: ratedId } },
            {
                $group: {
                    _id: "$ratedId",
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);
        const avgRating = avgResult.length > 0 ? avgResult[0].averageRating : 0;

        // 📝 Update user model with new average
        await User.findByIdAndUpdate(ratedId, { averageRating: avgRating });
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export default ratingUser
