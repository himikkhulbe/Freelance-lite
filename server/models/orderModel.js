import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    requirement: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'processing' , 'completed' , 'accepted', 'rejected'],
        default: 'pending'
    },
    editing:{
        type: Number,
        default: 0,
    },
    startWork:{
        type: String,
        enum: ['pending', 'start', 'accepted'],
        default: 'pending'
    },
    completedWork:{
        type: String,
        enum: ['pending', 'request', 'completed'],
        default: 'pending'
    },
}, {timestamps: true});



export default mongoose.model("Order", orderSchema);
