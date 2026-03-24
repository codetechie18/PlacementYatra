const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Configuration
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Setup
app.use('/api/auth', authRoutes);         // Login & Register
app.use('/api/student', studentRoutes);   // Profile Update, Job Apply
app.use('/api/company', companyRoutes);   // Post Jobs, View Applicants
app.use('/api/admin', adminRoutes);       // Stats & All User Management

// Root Route for Testing
app.get('/', (req, res) => {
    res.send('Placement Portal API is Running...');
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});