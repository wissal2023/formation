const express = require('express');
const router = express.Router();
const streakController = require('../controllers/dailyStreakController');

router.post('/', streakController.createDailyStreak);
router.get('/', streakController.getAllDailyStreaks);
router.get('/:id', streakController.getDailyStreakById);
router.put('/:id', streakController.updateDailyStreak);
router.delete('/:id', streakController.deleteDailyStreak);

module.exports = router;
