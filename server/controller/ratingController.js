import Rating from "../models/ratingModel.js";
import User from "../models/userModel.js";


const ratingUser = async (req, res) => {
    const {
        ratedId,
        rating,
        comment
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
            comment
        })
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export default ratingUser
