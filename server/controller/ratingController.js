import Rating from "../models/ratingModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const ratingUser = async (req, res) => {
    const { ratedId, rating, comment } = req.body;
    const userId = req.user.id;
    try {
        const newRating = await Rating.create({
            raterId: userId,
            ratedId,
            rating,
            comment
        })
        const allRating = await Rating.find({ ratedId });
        console.log(allRating);

        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default ratingUser