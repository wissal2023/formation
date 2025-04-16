// controllers/userController.js
//const supabase = require('../supabaseClient');
const bcrypt = require('bcrypt');
const db = require('../db/models');
const { generateOtp } = require('../services/otpService');
const { sendOtpEmail } = require('../utils/emailService');

const User = db.User;
const Otp = db.Otp; 


// ADD
const addUserController = async (req, res) => {
    const { username, email, mdp, roleUtilisateur } = req.body;

    try {
        // 1. Hash the password for local DB
        const hashedPassword = await bcrypt.hash(mdp, 10);

        /* 2. Register user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password: mdp,
        });

        if (authError) {
            return res.status(400).json({ error: authError.message });
        }
*/
        // 3. Save user data to local Postgres DB via Sequelize
        // The authData contains user information, including the user ID.
        const newUser = await User.create({
            username,
            email,
            mdp: hashedPassword,
            roleUtilisateur,
            dateInscr: new Date(),
            derConnx: new Date(),
            //supabaseUserId: authData.user.id, // Add the Supabase Auth user ID to your Postgres DB
        });

        return res.status(201).json({
            message: 'User registered successfully in both Supabase and Postgres',
            user: newUser,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
const loginUserController = async (req, res) => {
    const { email, mdp } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

        const otp = generateOtp();
        await sendOtpEmail(email, otp);

        // Store OTP in local DB (expire in 10 mins)
        await Otp.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });

        res.status(200).json({
            message: 'OTP envoyé à votre email.',
            userId: user.id,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la connexion.',
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
//GET BY ID
const getOnceUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id); // `findByPk` = find by primary key

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