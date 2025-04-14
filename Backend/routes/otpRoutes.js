const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, generateSecret, verifyGoogleOtp } = require('../Controllers/otpController');

// Route pour générer le QR code et secret
router.get('/generate-secret', generateSecret); // Utilisation directe après la déstructuration

// Route pour vérifier l'OTP de Google Authenticator
router.post('/verify-google-otp', verifyGoogleOtp);

// Route pour vérifier l'OTP
router.post('/verifyOtp', verifyOtp);

module.exports = router;