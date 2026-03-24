const express = require('express');
const router = express.Router();
const { getStats, getAllStudents, getJobReports, deleteUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here require Admin role
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/stats
router.get('/stats', getStats);

// @route   GET /api/admin/all-students
router.get('/all-students', getAllStudents);

// @route   GET /api/admin/job-reports
router.get('/job-reports', getJobReports);

// @route   DELETE /api/admin/user/:id
router.delete('/user/:id', deleteUser);

module.exports = router;