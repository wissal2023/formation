// controllers/userController.js
const supabase = require('../supabaseClient');
const bcrypt = require('bcrypt');
const db = require('../db/models');
const { generateOtp, otpDatabase } = require('../services/otpService');
const { sendOtpEmail } = require('../utils/emailService');
const userModel = require('../config/userModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const User = db.User;
//const { validateUser } = require('../utils/validationService');

// ADD

// Connexion + OTP

// GET ALL
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des utilisateurs.',
            error: err.message,
        });
    }
};
//GET BY ID
const getOnceUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id); // ⁠ findByPk ⁠ = find by primary key

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé.',
            });
        }

        res.status(200).json({
            message: 'Utilisateur récupéré avec succès.',
            user,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l\'utilisateur.',
            error: err.message,
        });
    }
};
//get user by name 
const getUserByName = async (req, res) => {
    const { name } = req.params;

    try {
        const user = await User.findOne({ where: { username: name } });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({
            message: 'Utilisateur récupéré avec succès.',
            user,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l\'utilisateur.',
            error: err.message,
        });
    }
};
//update user 
exports.updateUser = async (req, res) => {
    try {
      const { username, email, mdp, role } = req.body;
      const { id } = req.params;
  
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (email && !isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
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
  
//delete user (soft delete)

exports.deleteUser = async (req, res) => {
    try {
    const { id } = req.params;

    // First check if user exists
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Perform soft delete (sets deletedAt timestamp)
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully (soft delete)' });
    
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};
module.exports = {
    addUserController,
    loginUserController,
    getAllUsers,
    getOnceUser,
    getUserByName
};