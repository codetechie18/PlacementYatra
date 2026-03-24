const User = require('../models/userSchema');
const Job = require('../models/jobSchema');
const Application = require('../models/applicationSchema');

// @desc    Get Placement Overview (Stats for Dashboard)
// @route   GET /api/admin/stats
exports.getStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalCompanies = await User.countDocuments({ role: 'company' });
        const totalJobs = await Job.countDocuments();
        
        // Count placed students (Status: Selected)
        const placedStudents = await Application.distinct('studentId', { status: 'Selected' });

        res.json({
            totalStudents,
            totalCompanies,
            totalJobs,
            placedCount: placedStudents.length,
            placementPercentage: totalStudents > 0 ? (placedStudents.length / totalStudents * 100).toFixed(2) : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Students with Eligibility (For Export to Excel)
// @route   GET /api/admin/all-students
exports.getAllStudents = async (req, res) => {
    try {
        // Sirf student role waale users fetch karein
        const students = await User.find({ role: 'student' })
            .select('-password') // Security: Password hide karein
            .sort({ 'studentDetails.cgpa': -1 }); // High CGPA top par

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Detailed Job Report
// @route   GET /api/admin/job-reports
exports.getJobReports = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('companyId', 'fullName companyDetails.companyName')
            .sort({ createdAt: -1 });
        
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete or Disable a User (Admin Power)
// @route   DELETE /api/admin/user/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};