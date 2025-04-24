const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, generateSecret, verifyGoogleOtp, getOtpStatus} = require('../controllers/otpController');

router.get('/generate-secret', generateSecret); // Utilisation directe après la déstructuration
router.post('/generate-otp', sendOtp);
router.post('/verify-google-otp', verifyGoogleOtp);
router.post('/verifyOtp', verifyOtp);
router.get('/status', getOtpStatus);

module.exports = router;