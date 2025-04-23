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

// ADD
const addUserController = async (req, res) => {
    const { username, email, mdp, roleUtilisateur } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(mdp, 10);

        const newUser = await User.create({
            username,
            email,
            mdp: hashedPassword,
            roleUtilisateur,
            dateInscr: new Date(),
            derConnx: new Date(),
            // supabaseUserId supprimé car non utilisé
        });

        return res.status(201).json({
            message: 'User registered successfully in Postgres',
            user: newUser,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Connexion + OTP
const loginUserController = async (req, res) => {
    const { email, mdp } = req.body;

    try {
        const { data, error } = await userModel.supabase
            .from(userModel.tableName)
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await bcrypt.compare(mdp, data.mdp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign(
            { id: data.id, email: data.email },
            secretKey,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: { id: data.id, email: data.email },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur de connexion',
            error: error.message,
        });
    }
};

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

// GET BY ID
const getOnceUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

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

// GET BY NAME
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

// UPDATE
exports.updateUser = async (req, res) => {
    try {
        const { username, email, mdp, role } = req.body;
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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

// DELETE (soft)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

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