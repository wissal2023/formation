// backend/routes/otpRoutes
const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, generateSecret, verifyGoogleOtp, getOtpStatus} = require('../controllers/otpController');

router.post('/generate-otp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.get('/generate-secret', generateSecret); 
router.post('/verify-google-otp', verifyGoogleOtp);
router.get('/status', getOtpStatus);

module.exports = router;