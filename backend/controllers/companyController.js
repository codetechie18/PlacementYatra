const Job = require('../models/jobSchema');
const Application = require('../models/applicationSchema');
const User = require('../models/userSchema');

// @desc    Post a New Job/Internship
// @route   POST /api/company/post-job
exports.postJob = async (req, res) => {
    try {
        const { title, type, description, skillsRequired, minCgpa, maxBacklogsAllowed, batch, package, location, deadline } = req.body;

        const job = await Job.create({
            companyId: req.user.id, // Auth middleware se milega
            title,
            type,
            description,
            skillsRequired,
            minCgpa,
            maxBacklogsAllowed,
            batch,
            package,
            location,
            deadline
        });

        res.status(201).json({ message: 'Job posted successfully', job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Jobs Posted by this Company
// @route   GET /api/company/my-jobs
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ companyId: req.user.id });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Applicants for a Specific Job
// @route   GET /api/company/applicants/:jobId
exports.getJobApplicants = async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId })
            .populate('studentId', 'fullName email phone studentDetails'); // Student ki details join karna
        
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Application Status (Shortlist/Reject)
// @route   PUT /api/company/update-status/:applicationId
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status, interviewDate, feedback } = req.body;

        const application = await Application.findById(req.params.applicationId);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Update fields
        application.status = status || application.status;
        application.interviewDate = interviewDate || application.interviewDate;
        application.feedback = feedback || application.feedback;

        const updatedApplication = await application.save();
        res.json({ message: `Status updated to ${status}`, updatedApplication });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};