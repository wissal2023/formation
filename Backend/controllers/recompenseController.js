// controllers/recompenseController.js
const { Recompense, DailyStreak, User } = require('../db/models'); // Assuming your models are in the models folder
const moment = require('moment');

// Method to award badge when streak count reaches 7
const awardBadgeIfStreakReached = async (req, res) => {
  const userId = req.user.id; // Get userId from authenticated token

  try {
    // Find the user's latest streak record
    const lastStreak = await DailyStreak.findOne({
      where: { userId: userId },
      order: [['createdAt', 'DESC']]
    });

    if (!lastStreak) {
      return res.status(404).json({ message: 'No streak record found for this user' });
    }

    const streakCount = lastStreak.streakCount;

    // If the streak count is 5, award the badge
    if (streakCount === 5) {
      const existingBadge = await Recompense.findOne({
        where: {
          userId: userId,
          isUnlocked: true,
          name: '5-Day Streak Badge'
        }
      });

      if (existingBadge) {
        return res.status(400).json({ message: 'Badge already awarded to this user' });
      }

      const badgeData = {
        name: '5-Day Streak Badge',
        type: 'streak',
        description: 'Awarded for logging in for 5 consecutive days',
        icon: 'badge_icon_path_here',
        isUnlocked: true,
        userId: userId,
        points: 100,
        awardedDate: new Date()
      };

      const newBadge = await Recompense.create(badgeData);

      return res.status(200).json({
        message: 'Badge awarded successfully!',
        badge: newBadge
      });
    } else {
      return res.status(400).json({
        message: `User has not reached a 5-day streak. Current streak: ${streakCount}`
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to award badge',
      error: error.message
    });
  }
};


const getUserBadgesCount = async (req, res) => {
  const userId = req.user.id; // Get from token instead of params

  try {
    // Count badges where isUnlocked is true
    const badgesCount = await Recompense.count({
      where: { userId: userId, isUnlocked: true }
    });

    return res.status(200).json({
      message: `User has ${badgesCount} badge(s)`,
      badgesCount
    });
  } catch (error) {
    console.error('Error fetching badge count:', error);
    return res.status(500).json({
      message: 'Failed to retrieve badges count',
      error: error.message
    });
  }
};


module.exports = {
  awardBadgeIfStreakReached,
  getUserBadgesCount, // Export the new method
};

