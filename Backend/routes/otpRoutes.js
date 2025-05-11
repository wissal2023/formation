// backend/routes/otpRoutes
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { sendOtp, verifyOtp, verifyTotp, generateTotpSecret} = require('../controllers/otpController');

router.post('/generate-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/generate-secret', authenticateToken, generateTotpSecret); 
router.post('/verifyTotp', authenticateToken, verifyTotp);


//router.get('/generate-secret', authenticateToken, generateSecret); 
//router.post('/verifyTotp', authenticateToken, verifyTotp);

//router.post('/verify-google-otp', verifyGoogleOtp);
//router.get('/status', getOtpStatus);

module.exports = router;