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