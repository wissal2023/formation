const { DailyStreak, User } = require('../db/models');
const moment = require('moment'); 


exports.trackLoginStreak = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let streak = await DailyStreak.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],  
    });

    const today = moment().startOf('day');
    const lastLoginDate = streak ? moment(streak.createdAt).startOf('day') : null;
    if (streak && lastLoginDate.isSame(today)) {
      return res.status(200).json({ message: 'Streak already tracked today', streak });
    }

    if (!streak || lastLoginDate.isBefore(today, 'day')) {
      if (streak && lastLoginDate.isSame(today.subtract(1, 'day'), 'day')) {
       
        if (streak.streakCount < 7) {
          streak.streakCount += 1;
        } else {
          streak.streakCount = 1;
          streak.nombreStreak += 1; 
          await weeklyStreakBadge(userId); 
        }
      } else {
        // Start a new streak
        streak = await DailyStreak.create({ 
          userId,
          nombreStreak: 1,  // Starting with a new streak
          streakCount: 1,   // Start the streak count from 1
        });
      }

      await streak.save();  // Save the updated streak count and nombreStreak

      return res.status(200).json({ message: 'Streak tracked successfully', streak });
    }

    res.status(400).json({ message: 'Error while tracking streak, please try again.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get the current streak for a user
exports.getUserStreak = async (req, res) => {
  const { userId } = req.params;

  try {
    // Get the most recent streak for the user
    const streak = await DailyStreak.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']]  // Get the most recent streak
    });

    if (!streak) {
      return res.status(404).json({ message: 'No streak found for this user' });
    }

    res.status(200).json({ streak });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Reset the streak (e.g., when a user skips logging in for a day)
exports.resetStreak = async (req, res) => {
  const { userId } = req.params;

  try {
    // Reset the streak by deleting the record
    const streak = await DailyStreak.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']]  // Get the most recent streak
    });

    if (!streak) {
      return res.status(404).json({ message: 'No streak to reset for this user' });
    }

    // Delete the most recent streak record
    await streak.destroy();

    res.status(200).json({ message: 'Streak reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
