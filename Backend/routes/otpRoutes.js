// backend/routes/otpRoutes
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { sendOtp, verifyOtp, generateSecret, verifyTotp} = require('../controllers/otpController');

router.post('/generate-otp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.get('/generate-secret', authenticateToken, generateSecret); 
router.post('/verifyTotp', authenticateToken, verifyTotp);

//router.post('/verify-google-otp', verifyGoogleOtp);
//router.get('/status', getOtpStatus);

module.exports = router;