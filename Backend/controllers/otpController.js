const otpModel = require('../services/otpModel'); 
const speakeasy = require('speakeasy'); 
const qrcode = require('qrcode'); 

const pool = require('../config/pool');

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
  const { email } = req.body;
  console.log("📥 Requête reçue avec email :", email);
  console.log("Email reçu côté backend :", req.body.email);

  if (!email) {
    return res.status(400).json({ message: "Email manquant dans la requête." });
  }

  const secret = speakeasy.generateSecret({ length: 20 });
  console.log("🔐 Secret généré :", secret);

  try {
    // Vérifie si un secret existe déjà pour cet email
    const check = await pool.query('SELECT * FROM google_otp WHERE email = $1', [email]);
    console.log("🔎 Vérification email dans DB :", check.rows);

    if (check.rows.length === 0) {
      await pool.query(
        'INSERT INTO google_otp (email, secret, verified) VALUES ($1, $2, $3)',
        [email, secret.base32, false]
      );
      console.log("✅ Secret enregistré en DB");
    }

    // ⚠️ Corrige ceci pour générer une URL OTP
    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: email,
      issuer: 'TeamwillApp',
      encoding: 'base32',
    });

    console.log("🌐 URL pour QR Code :", otpAuthUrl);

    // Générer le QR Code
    qrcode.toDataURL(otpAuthUrl, (err, data_url) => {
      if (err) {
        console.error("❌ Erreur QR Code :", err);
        return res.status(500).json({ message: "Erreur lors de la génération du QR Code." });
      }

      console.log("🖼️ QR Code généré !");
      res.status(200).json({
        message: 'QR Code généré avec succès.',
        secret: secret.base32,
        qrCodeUrl: data_url,
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la génération du secret.', error: error.message });
  }
};

// Vérifier l'OTP généré par Google Authenticator
const verifyGoogleOtp1 = (req, res) => {
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
    console.error("💥 Erreur générale :", error);
    res.status(500).json({ message: 'Erreur lors de la génération du secret.', error: error.message });
  }
};

// Vérifier l'OTP généré par Google Authenticator
const verifyGoogleOtp2 = async (req, res) => {
  const { email, token } = req.body;

  try {
    const result = await pool.query('SELECT secret FROM google_otp WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const secret = result.rows[0].secret;

    const isVerified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 1,
    });

    if (isVerified) {
      // Marquer comme vérifié
      await pool.query(`UPDATE google_otp SET verified = true WHERE email = $1`, [email]);

      res.status(200).json({ message: 'OTP vérifié avec succès ! 🎉' });
    } else {
      res.status(400).json({ message: 'OTP invalide !' });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification.", error: error.message });
  }
};

const getOtpStatus = async (req, res) => {
  const { email } = req.query;
  console.log("GET /otp/status called with email:", email); // 🔍

  try {
    const result = await pool.query('SELECT verified FROM google_otp WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ verified: false, message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ verified: result.rows[0].verified });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du statut.", error: error.message });
  }
};

// Exporter les fonctions
module.exports = { verifyOtp, generateSecret, verifyGoogleOtp1, verifyGoogleOtp2, getOtpStatus };
