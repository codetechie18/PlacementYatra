const User = require('../models/userSchema');
const Job = require('../models/jobSchema');
const Application = require('../models/applicationSchema');
const extractTextFromPDF = require('../utils/pdfParser'); // PDF text extractor util
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Update Profile + Parse Resume (Merged)
// @route   PUT /api/student/profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, phone, rollNumber, branch, cgpa, batch, backlogs, skills } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'Student not found' });

        let extractedData = {};

        // 1. Agar Resume upload hua hai, toh AI se data extract karo
        if (req.file) {
            const rawText = await extractTextFromPDF(req.file.path);
            
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Extract details from this resume and return ONLY a JSON: 
                           { "skills": [], "cgpa": number, "summary": string }. 
                           Text: ${rawText}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            extractedData = JSON.parse(response.text());

            // Temp file delete karo
            fs.unlinkSync(req.file.path);
        }

        // 2. Data Merging Logic (Manual > AI Extracted)
        user.fullName = fullName || user.fullName;
        user.phone = phone || user.phone;

        user.studentDetails = {
            rollNumber: rollNumber || user.studentDetails.rollNumber,
            branch: branch || user.studentDetails.branch,
            // Agar user ne CGPA nahi dala toh AI wala use karein
            cgpa: cgpa || extractedData.cgpa || user.studentDetails.cgpa,
            batch: batch || user.studentDetails.batch,
            backlogs: backlogs !== undefined ? backlogs : user.studentDetails.backlogs,
            // Skills ko merge kar do (Unique values only)
            skills: Array.from(new Set([...(skills || []), ...(extractedData.skills || [])])),
            isProfileComplete: true
        };

        const updatedUser = await user.save();
        res.json({ message: "Profile updated successfully", updatedUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply for a Job (Same as before)
exports.applyToJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const student = await User.findById(req.user.id);
        
        // Eligibility Check
        if (student.studentDetails.cgpa < job.minCgpa) {
            return res.status(400).json({ 
                message: `Eligible nahi ho. Minimum ${job.minCgpa} CGPA chahiye.` 
            });
        }

        const application = await Application.create({
            jobId,
            studentId: req.user.id,
            resumeUsed: student.resumeUrl || "Attached",
            status: 'Applied'
        });

        job.applicantsCount += 1;
        await job.save();

        res.status(201).json({ message: 'Applied successfully', application });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ message: 'Already applied!' });
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Student Applications
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ studentId: req.user.id })
            .populate('jobId', 'title companyId package');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};