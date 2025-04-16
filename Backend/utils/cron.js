const cron = require('node-cron');
const { Trace } = require('../db/models');  // Import Trace model
const { Op } = require('sequelize');

// Schedule a task to run every minute
cron.schedule('*/1 * * * *', async () => {
  try {
    // Permanently delete traces older than 5 minutes
    const result = await Trace.destroy({
      where: {
        createdAt: {
          [Op.lt]: new Date(new Date() - 5 * 60 * 1000)  // 5 minutes ago
        }
      }
    });

    console.log(`${result} trace logs permanently deleted.`);
  } catch (error) {
    console.error('Error while pruning old traces:', error);
  }
});
