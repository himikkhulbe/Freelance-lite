import Rating from "../models/ratingModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import Service from "../models/serviceModels.js";
import { ObjectId } from "mongodb";



const ratingUser = async (req, res) => {
    const {
        ratedId,
        rating,
        comment,
        serviceId
    } = req.body;
    console.log(req.body);

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
    let existingRating;
    if(serviceId){
    existingRating = await Rating.findOne({
        raterId: userId,
        ratedId,
        serviceId
    });
    }else{
    existingRating = await Rating.findOne({
        raterId: userId,
        ratedId,
    });
}
    if (existingRating) {
        return res.status(400).json({
            message: "You have already rated"
        });
    }
    try {
        const newRating = await Rating.create({
            raterId: userId,
            ratedId,
            rating,
            comment,
            serviceId
        })
        const avgResult = await Rating.aggregate([
            { $match: { ratedId: new ObjectId(ratedId) } },
            {
                $group: {
                    _id: "$ratedId",
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);
        console.log(avgResult)
        const avgRating = avgResult.length > 0 ? avgResult[0].averageRating : 0;
        await User.findByIdAndUpdate(ratedId, { averageRating: avgRating });

        if(serviceId){
        const avgServiceResult = await Rating.aggregate([
            { $match: { serviceId: new ObjectId(serviceId) } },
            {
                $group: {
                    _id: "$serviceId",
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);
        console.log(avgServiceResult);
        const avgServiceRating = avgServiceResult.length > 0 ? avgServiceResult[0].averageRating : 0;
        await Service.findByIdAndUpdate(serviceId, { rating: avgServiceRating });
    }
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export default ratingUser
