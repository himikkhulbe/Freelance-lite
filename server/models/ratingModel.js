import mongoose from "mongoose";

const ratingModel = new mongoose.Schema({
    raterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ratedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
        },
    comment: {
        type: String,
        required: false
    }
}, {timestamps: true})

export default mongoose.model('Rating', ratingModel)
