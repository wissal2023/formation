const supabase = require('../supabaseClient');
const bcrypt = require('bcrypt');
const { generateOtp, otpDatabase } = require('../services/otpService');
const { sendOtpEmail } = require('../utils/emailService');
const userModel = require('../config/userModel');

//const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// ADD
const addUserController = async (req, res) => {
    const { username, email, mdp, roleUtilisateur } = req.body;

    try {
        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(mdp, 10);

        // Créer l'utilisateur dans Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password: mdp, // ⚠️ ici c'est 'password', pas 'mdp'
        });

        if (authError) {
            throw new Error(authError.message);
        }

        // Ajouter l'utilisateur dans la table personnalisée
        const { data, error } = await supabase
            .from(userModel.tableName)
            .insert([
                {
                    username: username,
                    email: email,
                    mdp: hashedPassword,
                    roleutilisateur: roleUtilisateur,
                    dateinscription: new Date(),
                    derconnex: new Date(),
                }
            ])
            .select('*');

        if (error) {
            throw new Error(error.message);
        }

        res.status(201).json({
            message: 'Utilisateur ajouté avec succès',
            user: data[0],
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de l\'ajout de l\'utilisateur.',
            error: error.message,
        });
    }
};

// Connexion + OTP
const loginUserController = async (req, res) => {
    const { email, mdp } = req.body;

    try {
        // Récupérer l'utilisateur par email
        const { data, error } = await userModel.supabase
            .from(userModel.tableName)
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            throw new Error(error.message);
        }

        // Comparer le mot de passe haché
        const isMatch = await bcrypt.compare(mdp, data.mdp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Réponse si la connexion est réussie
        res.status(200).json({
            message: 'Utilisateur connecté avec succès',
            user: data,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la connexion de l\'utilisateur.',
            error: error.message,
        });
    }
};
// GET ALL
const getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from(userModel.tableName)
            .select('*');

        if (error) {
            return res.status(500).json({
                message: 'Erreur lors de la récupération des utilisateurs.',
                error: error.message,
            });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }

        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({
            message: 'Erreur serveur.',
            error: err.message,
        });
    }
};

//GET BY ID
const getOnceUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from(userModel.tableName)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({
                message: 'Utilisateur non trouvé.',
                error: error.message,
            });
        }

        res.status(200).json({
            message: 'Utilisateur récupéré avec succès.',
            user: data,
        });

    } catch (err) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l\'utilisateur.',
            error: err.message,
        });
    }
};

module.exports = {
    addUserController,
    loginUserController,
    getAllUsers,
    getOnceUser
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