import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const jobSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
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

  requiredSkills: [{
    type: String,
    required: true
  }],

  budget: {
    type: Number,
    required: true
  },

  duration: {
    type: String, // e.g., "1 week", "2 months"
    required: true
  },

  deadline: {
    type: Date
  },

  category: {
    type: String,
    enum: ['Web Development', 'Design', 'Marketing', 'Data Entry', 'Writing', 'Video Editing', 'Others'],
    required: true
  },

  isOpen: {
    type: Boolean,
    default: true
  },

  proposals: [proposalSchema]
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
