// routes/streakRoutes.js
const express = require('express');
const router = express.Router();
const { updateStreak, getStreak } = require('../controllers/dailyStreakController');
const authenticateToken = require('../utils/authMiddleware');

// Route to update the user's streak
// routes/streakRoutes.js
//router.post('/update', authenticateToken, updateStreak);
// Route to get the user's current streak
router.get('/get', authenticateToken, getStreak);

module.exports = router;
