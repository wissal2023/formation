const nodemailer = require('nodemailer');

// Fonction d'envoi d'OTP par email
exports.sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bouhjarons27@gmail.com',
            pass: 'qvek fcan exxv hzoq'
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