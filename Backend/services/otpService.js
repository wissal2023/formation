// services/otpService.js
const crypto = require('crypto');
//const otpDatabase = {}; // Simuler une base de données temporaire pour stocker les OTP

// Générer un OTP
const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999); // Générer un code OTP à 6 chiffres
    return otp;
};

/* Vérifier un OTP
const verifyOtp = (email, otp) => {
    const otpData = otpDatabase[email];
    if (otpData && otpData.otp === otp) {
        const currentTime = Date.now();
        const timeDiff = currentTime - otpData.timestamp;
        // Si l'OTP est expiré (10 minutes max)
        if (timeDiff > 10 * 60 * 1000) {
            delete otpDatabase[email]; // Supprimer l'OTP expiré
            return false; // OTP expiré
        }
        delete otpDatabase[email]; // Supprimer l'OTP après la vérification
        return true; // OTP validé
    }
    return false; // OTP invalide
};
<<<<<<< HEAD


=======
*/

module.exports = {
    generateOtp
};

