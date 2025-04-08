const supabase = require('../supabaseClient');
const bcrypt = require('bcrypt');
const { generateOtp, otpDatabase } = require('../services/otpService');
const { sendOtpEmail } = require('../utils/emailService');
const userModel = require('../Models/userModel');

// ➤ Ajouter un utilisateur
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

// ➤ Connexion + OTP
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
// ➤ Récupérer tous les utilisateurs
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

// ➤ Récupérer un utilisateur par ID
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