const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Student
        required: true
    },
    // Tracking the Stages
    status: {
        type: String,
        enum: ['Applied', 'Shortlisted', 'Interviewing', 'Selected', 'Rejected'],
        default: 'Applied'
    },
    
    // Resume version used for this specific application
    resumeUsed: {
        type: String, // URL of the resume at the time of application
        required: true
    },

    // AI & Filtering Data
    matchScore: {
        type: Number, // Percentage score from your ATS/AI logic
        default: 0
    },

    // Interview Details (Updated by Company/Admin)
    interviewDate: {
        type: Date
    },
    interviewLink: {
        type: String
    },
    feedback: {
        type: String // Recruiter's comments
    },

    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Prevent a student from applying to the same job twice
applicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);