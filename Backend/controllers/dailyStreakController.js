const db = require('../db/models');
const DailyStreak = db.DailyStreak;





// ✅ Get a streak by ID
exports.getDailyStreakById = async (req, res) => {
  try {
    const id = req.params.id;
    const streak = await DailyStreak.findByPk(id, { include: db.User });
    if (!streak) return res.status(404).json({ message: 'Not found' });
    res.json(streak);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a streak
exports.updateDailyStreak = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await DailyStreak.update(req.body, {
      where: { id },
      returning: true
    });
    if (updated[0] === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated[1][0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete (soft delete) a streak
exports.deleteDailyStreak = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await DailyStreak.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Streak deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
