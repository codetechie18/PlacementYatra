const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { fullName, email, password, phone, role, rollNumber, branch } = req.body;

        // FIX: Remove double await
        const userExists = await User.findOne({ email }); 
        
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Create User
        // Note: Password hashing is handled by the User model's pre-save hook
        const user = await User.create({
            fullName,
            email,
            password,
            phone,
            role: role || 'student',
            studentDetails: role === 'student' ? { rollNumber, branch } : undefined
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email and include password (since it's hidden by default in schema)
        const user = await User.findOne({ email }).select('+password');

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        // req.user comes from the protect middleware
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};