import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // freelancer who created this service
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: ['Web Development', 'Graphic Design', 'Content Writing', 'SEO', 'Marketing', 'Data Entry', 'Video Editing', 'Others']
    },

    subcategory: {
        type: String // optional, like "React", "Node.js", etc.
    },

    tags: [{
        type: String // e.g., ['javascript', 'react', 'frontend']
    }],

    deliveryTime: {
        type: Number, // in days
        required: true
    },

    revisions: {
        type: Number,
        default: 1
    },

    price: {
        type: Number,
        required: true
    },

    images: [{
        type: String // image URLs (Cloudinary or S3)
    }],

    faqs: [{
        question: { type: String },
        answer: { type: String }
    }],

    requirements: [{
        type: String, // what client needs to provide
        default: ""
    }],

    isActive: {
        type: Boolean,
        default: true
    },

    rating: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

export default mongoose.model('Service', ServiceSchema);
