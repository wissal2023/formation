// backend/utils/emailSevice
const nodemailer = require('nodemailer');

exports.sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'bouhjarons27@gmail.com',
        to: email,
        subject: 'Votre OTP de vérification',
        text: `Bonjour, voici votre OTP : ${otp}. Il est valable pendant 10 minutes.`
    };

    await transporter.sendMail(mailOptions);
};