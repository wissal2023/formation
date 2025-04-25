const express = require('express');
const router = express.Router();
const { trackLoginStreak } = require('../controllers/dailyStreakController');  
router.post('/track-login-streak', trackLoginStreak); 

module.exports = router;
