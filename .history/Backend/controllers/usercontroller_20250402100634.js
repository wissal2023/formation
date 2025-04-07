const { User } = require('../db/models');

//get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  //get user by name 
 
exports.getUserByName = async (req, res) => {
    try {
      const user = await User.findOne({ where: { username: req.params.name } });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  