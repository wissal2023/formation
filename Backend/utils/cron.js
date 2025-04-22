const cron = require('node-cron');
const { Trace, User } = require('../db/models');  // Import Trace and User models
const { Op } = require('sequelize');
const moment = require('moment');  // For date comparisons
const { checkInactiveUsers } = require('../services/userService');  // Import checkInactiveUsers method

// Schedule a task to run every minute to delete old trace logs
cron.schedule('0 0 * * *', async () => {  // Run every minute
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

// Schedule a task to run every day at midnight to check inactive users
cron.schedule('0 0 * * *', async () => {  // Run every day at midnight
  try {
    // Call the method to check and deactivate inactive users
    await checkInactiveUsers();
  } catch (error) {
    console.error('Error while checking inactive users:', error);
  }
});
