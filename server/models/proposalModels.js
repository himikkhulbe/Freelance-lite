import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
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
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    coverLetter: {
        type: String,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
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
    conpletedWork:{
        type: String,
        enum: ['pending', 'request', 'completed'],
        default: 'pending'
    },
}, {timestamps: true});



export default mongoose.model("Proposal", proposalSchema);
