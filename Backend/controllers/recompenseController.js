const { Recompense, DailyStreak } = require('../db/models');

// Method to check if the user has a 7-day streak and award a badge
exports.weeklyStreakBadge = async (userId) => {
  try {
    // Fetch the most recent streak record for the user
    const streak = await DailyStreak.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],  // Get the most recent streak record
    });

    if (!streak || streak.streakCount !== 7) {
      return; // Do nothing if streak count is not 7
    }

    // Check if the user already has the badge
    const existingReward = await Recompense.findOne({
      where: {
        userId,
        name: 'Weekly Streak Badge',
      },
    });

    if (existingReward) {
      return; // If the user already has the badge, do nothing
    }

    // Award the "Weekly Streak Badge"
    const recompense = await Recompense.create({
      name: 'Weekly Streak Badge',
      type: 'badge',
      description: 'Awarded for logging in for 7 consecutive days.',
      isUnlocked: true,
      userId,
    });

    console.log('User awarded Weekly Streak Badge:', recompense);
  } catch (error) {
    console.error('Error awarding Weekly Streak Badge:', error);
  }
};
