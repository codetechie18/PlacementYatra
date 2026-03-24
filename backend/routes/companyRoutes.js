const express = require('express');
const router = express.Router();
const { postJob, getMyJobs, getJobApplicants, updateApplicationStatus } = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here require Company role
router.use(protect);
router.use(authorize('company'));

// @route   POST /api/company/post-job
router.post('/post-job', postJob);

// @route   GET /api/company/my-jobs
router.get('/my-jobs', getMyJobs);

// @route   GET /api/company/applicants/:jobId
router.get('/applicants/:jobId', getJobApplicants);

// @route   PUT /api/company/update-status/:applicationId
router.put('/update-status/:applicationId', updateApplicationStatus);

module.exports = router;