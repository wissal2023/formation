// controllers/userController.js
const bcrypt = require('bcrypt');
const db = require('../db/models');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { sendAccountEmail } = require('../utils/emailService');
const { User, Trace } = db;

const generateRandomPassword = (length = 12) => {
    return crypto.randomBytes(length).toString("base64").slice(0, length);
  };

//login
const loginUserController = async (req, res) => {
    const { email, mdp } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !user.isActive) {
            return res.status(403).json({ message: 'Votre compte est inactif ou introuvable.' });
        }

        const isMatch = await bcrypt.compare(mdp, user.mdp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

         // Update derConnx
        user.derConnx = new Date();
        await user.save();

        // Add Trace
        await Trace.create({
            userId: user.id,
            action: 'logging in',
            model: 'User', 
            data: {
              email: user.email,
              role: user.roleUtilisateur,
              derConnx: new Date(),
            }
          });

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.roleUtilisateur,  username: user.username  },
                process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send token in HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Fix here!
            maxAge: 3600000,
            sameSite: 'Lax',
        });

        res.status(200).json({
            message: 'Connexion réussie.',
            userId: user.id,
            roleUtilisateur: user.roleUtilisateur,
            mustUpdatePassword: user.mustUpdatePassword,
            username: user.username, 

        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la connexion.',
            error: error.message,
        });
    }
};

// ADD
const addUserController = async (req, res) => {
    const { username, email, roleUtilisateur  } = req.body;

    try {
        // 1. Validate creator (admin or formateur)
        const creator = req.user; //get tocken 
    
        if (!['Formateur', 'Admin'].includes(creator.roleUtilisateur)) {
          return res.status(403).json({ message: 'Permission refusée.' });
        }
    
        // 2. Generate & hash random password
        const generatedPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(generatedPassword, 8);
    
        // 3. Create the new user
        const newUser = await User.create({
          username,
          email,
          mdp: hashedPassword,
          defaultMdp: hashedPassword,
          roleUtilisateur,
          isActive: true,
          derConnx: new Date(),  
        });
    
        // 4. Trace the creation
        await Trace.create({
          userId:creator.id, // the ID of the admin/formateur who created this user
          model: 'Register a new user',
          action: 'Création d\'utilisateur',
          data: {
            createdUserId: newUser.id,
            createdUsername: newUser.username,
            role: newUser.roleUtilisateur
          }
        });
    
         // Send welcome email with credentials
         await sendAccountEmail({
            email,
            username,
            password: generatedPassword
          });

        // 5. Return response
        return res.status(201).json({
          message: 'Utilisateur créé avec succès.  Un email a été envoyé;',
          user: newUser,
          generatedPassword 
        });
    }
    catch (err) {
        console.error('[ERROR] Failed to create user:', err);
        return res.status(500).json({ error: err.message });
    }
};
//logout
const logoutUserController = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'Lax',
        });

        // trace the logout action
        if (req.user) {
            await Trace.create({
                userId: req.user.id,
                action: 'user logs out',
                model: 'User',
                data: {
                    email: req.user.email,
                    role: req.user.roleUtilisateur,
                    timestamp: new Date(),
                }
            });
        }

        res.status(200).json({ message: 'Déconnexion réussie.' });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la déconnexion.',
            error: error.message,
        });
    }
};
// update mdp
const updatePasswordController = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
  
    try {
      const user = await User.findByPk(userId);
      const isMatch = await bcrypt.compare(currentPassword, user.mdp);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Mot de passe actuel incorrect" });
      }
  
      user.mdp = await bcrypt.hash(newPassword, 10);
      user.mustUpdatePassword = false;
      await user.save();
  
      await Trace.create({
        userId: user.id,
        model: 'User',
        action: 'user changed passwrod',
        data: {
          userId: user.id,
          username: user.username
        }
      });

      res.status(200).json({ message: "passwoed changed successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
};
 //GET BY ID
 const getOnceUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
          attributes: ['email', 'roleUtilisateur', 'username']
        });
        
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
      }
};  
// GET ALL users
const getAllUsers = async (req, res) => {
  try {
    if (req.user.roleUtilisateur !== 'Admin') {
      return res.status(403).json({ message: 'Accès refusé. Seuls les administrateurs peuvent voir tous les utilisateurs.' });
    }

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








//************************ NEEDS TO BE UPDATED ***************************/

// update user
const updateUserController = async (req, res) => {
    const userId = req.params.id;
    const { username, photo, tel } = req.body;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
  
      user.username = username || user.username;
      user.photo = photo || user.photo;
      user.tel = tel || user.tel;
  
      await user.save();
      return res.status(200).json({ message: 'Profil mis à jour', user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  
const toggleUserActivation = async (req, res) => {
const userId = req.params.id;

try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({ message: `Utilisateur ${user.isActive ? 'activé' : 'désactivé'}.`, user });
} catch (err) {
    res.status(500).json({ error: err.message });
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
    logoutUserController,
    updateUserController,
    toggleUserActivation,
    updatePasswordController,

    getAllUsers,
    getOnceUser, 
    getUserByName
};