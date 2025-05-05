// services/otpService.js
const crypto = require('crypto');

// Générer un OTP
const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999); // Générer un code OTP à 6 chiffres
    return otp;
};


module.exports = {
    generateOtp
};

