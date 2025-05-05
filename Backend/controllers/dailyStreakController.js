const { DailyStreak } = require('../db/models');
const getStreak = async (req, res) => {
  try {
    const userId = req.user.id; // from authenticated token
    const streak = await DailyStreak.findOne({ where: { userId}, paranoid: false});
    

    
    if (!streak) {
      return res.status(404).json({ message: "Streak not found for user" });
    }

    res.json({ nombreStreak: streak.nombreStreak });
    const streaks = await DailyStreak.findAll({ raw: true });
    console.log("All streaks:", streaks);


  } catch (error) {
    console.error("Failed to get streak:", error);
    res.status(500).json({ message: "Failed to get streak", error: error.message });
  }
};


module.exports = {
  getStreak
};