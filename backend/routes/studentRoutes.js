const express = require('express');
const router = express.Router();
const multer = require('multer');
const { updateProfile, applyToJob, getMyApplications } = require('../controllers/studentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Multer Setup (Resume storage)
const upload = multer({ dest: 'uploads/' }); 

// @route   PUT /api/student/profile
// @desc    Update profile with optional Resume Parsing
router.put('/profile', protect, authorize('student'), upload.single('resume'), updateProfile);

// @route   POST /api/student/apply/:jobId
router.post('/apply/:jobId', protect, authorize('student'), applyToJob);

// @route   GET /api/student/my-applications
router.get('/my-applications', protect, authorize('student'), getMyApplications);

module.exports = router;