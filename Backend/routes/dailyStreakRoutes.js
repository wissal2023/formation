const express = require('express');
const router = express.Router();
const dailyStreakController = require('../controllers/dailyStreakController');

router.post('/track', dailyStreakController.trackLoginStreak);
router.get('/:userId', dailyStreakController.getUserStreak);
router.delete('/:userId/reset', dailyStreakController.resetStreak);

module.exports = router;
