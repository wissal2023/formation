const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, generateSecret, verifyGoogleOtp, getOtpStatus} = require('../controllers/otpController');

// Route pour générer le QR code et secret
router.post('/generate-secret', generateSecret); // Utilisation directe après la déstructuration
router.post('/generate-otp', sendOtp);

// Route pour vérifier l'OTP de Google Authenticator
router.post('/verify-google-otp', verifyGoogleOtp);

// Route pour vérifier l'OTP
router.post('/verifyOtp', verifyOtp);


router.get('/status', getOtpStatus);


module.exports = router;