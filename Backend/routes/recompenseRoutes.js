const express = require('express');
const router = express.Router();
const recompenseController = require('../controllers/recompenseController');
const authenticateToken = require('../utils/authMiddleware');

router.post('/award-badge', authenticateToken, recompenseController.awardBadgeIfStreakReached);
router.get('/badges-count', authenticateToken, recompenseController.getUserBadgesCount);


module.exports = router;
