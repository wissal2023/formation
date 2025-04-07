
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // if you hashed passwords
const db = require('../db/models');
const User = db.User;

exports.login = async (req, res) => {
  const { email, mdp } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(mdp, user.mdp); // compare hashed password
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
=======
const supabase = require('../supabaseClient');
const { generateOtp, otpDatabase } = require('../services/otpService');
const { sendOtpEmail } = require('../utils/emailService');

// Inscription
exports.signup = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'Utilisateur inscrit avec succès', data });
};

// Connexion avec envoi automatique de l'OTP par email
const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error || !data.user) {
            return res.status(401).json({
                message: 'Échec de connexion',
                error: error?.message || 'Identifiants invalides'
            });
        }

        const otp = generateOtp();

        await sendOtpEmail(email, otp);

        otpDatabase[email] = {
            otp,
            timestamp: Date.now(),
        };

        res.status(200).json({
            message: 'Connexion réussie. Un OTP a été envoyé à votre email.',
            user: data.user
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la connexion", error: err.message });
    }
};

module.exports = {
    loginUserController,
};