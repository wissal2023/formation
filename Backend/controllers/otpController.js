const { sendOtpEmail } = require('../utils/emailService');  
const { generateOtp } = require('../services/otpService'); 
const otpModel = require('../services/otpModel'); 
const speakeasy = require('speakeasy'); 
const qrcode = require('qrcode'); 


// Vérifier l'OTP envoyé par email
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Vérifier si l'OTP est valide
    const isValid = await otpModel.isValidOtp(email, otp);

    if (!isValid) {
      return res.status(400).json({ message: 'OTP invalide ou expiré.' });
    }

    // Supprimer l'OTP après vérification
    await otpModel.deleteOtp(email);

    return res.status(200).json({ message: 'OTP vérifié avec succès.' });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification de l'OTP.", error: error.message });
  }
};

// Générer un secret pour Google Authenticator
const generateSecret = async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });

  try {
    const otpAuthUrl = secret.otpauth_url;

    // Convertir le QR code en image (DataURL)
    qrcode.toDataURL(otpAuthUrl, (err, data_url) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de la génération du QR Code." });
      }

      // Retourner le QR code et le secret à sauvegarder
      res.status(200).json({
        message: 'Scanne ce QR Code dans Google Authenticator.',
        secret: secret.base32, // Sauvegarde ce secret
        qrCodeUrl: data_url,
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la génération du secret.', error: error.message });
  }
};

// Vérifier l'OTP généré par Google Authenticator
const verifyGoogleOtp = (req, res) => {
  const { token, secret } = req.body;

  const isVerified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token,
    window: 1,
  });

  if (isVerified) {
    res.status(200).json({ message: 'OTP vérifié avec succès ! 🎉' });
  } else {
    res.status(400).json({ message: 'OTP invalide !' });
  }
};

// Exporter les fonctions
module.exports = { verifyOtp, generateSecret, verifyGoogleOtp };