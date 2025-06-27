import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['client', 'freelancer'],
        default: 'freelancer'
    },
    averageRating: {
        type: Number,
        default: 0
    },
    skills: [{
        type: String,
    }],
    location: {
        type: String,
    },
    bio: {
        type: String,
    },
    Languages: [{
        type: String,
    }],
    profilePicture: {
        type: String,
        default: ""
    },
    socialMedia: {
        Linkedin : {
            type: String,
            default: ""
        },
        Github : {
            type: String,
            default: ""
        },
        Twitter : {
            type: String,
            default: ""
    },
    Portfolio: {
        type: String,
        default: ""
    }},
    isVerified: {
        type: Boolean,
        default: false
    },
    contactInfo: {
        phone: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        }
    },
    location: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);