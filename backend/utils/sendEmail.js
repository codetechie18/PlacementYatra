const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Transporter banayein (Connect to Gmail)
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // App Password yahan use hoga
        },
    });

    // 2. Email options define karein
    const mailOptions = {
        from: `Placement Portal <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // 3. Email bhejein
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;