const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User (with role 'company')
        required: true
    },
    // Job/Internship Header
    title: {
        type: String,
        required: [true, 'Please add a job title'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Internship', 'Full-time', 'Contract'],
        default: 'Internship'
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },

    // Requirements & Eligibility
    skillsRequired: [{
        type: String
    }],
    minCgpa: {
        type: Number,
        default: 0
    },
    maxBacklogsAllowed: {
        type: Number,
        default: 0
    },
    batch: [Number], // e.g., [2025, 2026]

    // Compensation & Timeline
    package: {
        type: String, // e.g., "12 LPA" or "25k/month"
        required: true
    },
    location: {
        type: String,
        default: 'Remote'
    },
    deadline: {
        type: Date,
        required: true
    },

    // Status
    status: {
        type: String,
        enum: ['Open', 'Closed', 'Draft'],
        default: 'Open'
    },
    
    // Tracking
    applicantsCount: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);