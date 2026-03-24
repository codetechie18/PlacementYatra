const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// 1. Protect: Check if user is logged in (Token Validation)
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and attach to req.user
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found with this token' });
            }

            next();
        } catch (error) {
            console.error('Token Error:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// 2. Authorize: Check if user has the right Role
// Use like: authorize('admin', 'company')
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access Denied: Role '${req.user.role}' is not authorized for this action.` 
            });
        }
        next();
    };
};

module.exports = { protect, authorize };