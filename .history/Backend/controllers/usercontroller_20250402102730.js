const { User } = require('../db/models');
const bcrypt = require('bcrypt');

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

// create new user 
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

exports.createUser = async (req, res) => {
  try {
    const { username, email, mdp, role } = req.body;

    // Validation checks
    if (!username || !email || !mdp || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const validRoles = ['Admin', 'Formateur', 'Apprenant'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(mdp, 10); 

    // Create the user with hashed password
    const newUser = await User.create({
      username,
      email,
      mdp: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//update user 
// Utility to validate email
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// 🔹 Update user
exports.updateUser = async (req, res) => {
  try {
    const { username, email, mdp, role } = req.body;
    const { id } = req.params;

    // Find user by ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate if fields exist (you can make this optional or required)
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (mdp && mdp.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (role && !['Admin', 'Formateur', 'Apprenant'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const updatedFields = {
      username: username ?? user.username,
      email: email ?? user.email,
      role: role ?? user.role
    };

    if (mdp) {
      updatedFields.mdp = await bcrypt.hash(mdp, 10);
    }

    await User.update(updatedFields, { where: { id } });

    const updatedUser = await User.findByPk(id);

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
