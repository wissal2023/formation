// backend/controllers/otpController
const otpModel = require('../services/otpModel'); 
const speakeasy = require('speakeasy'); 
const qrcode = require('qrcode'); 
const bcrypt = require('bcrypt'); 
const { generateOtp } = require('../services/otpService');
const { sendOtpEmail } = require('../utils/emailService');
const { Otp } = require('../db/models');

//router.post('/generate-otp', sendOtp);
const sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log('Email reçu depuis req.body:', email);

  if (!email) {
    return res.status(400).json({ message: 'Email requis.' });
  }
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp.toString(), 10); 
  console.log("OTP generated at:", new Date());

  try {
    await sendOtpEmail(email, otp);
    
    await Otp.create({
      email,
      otp:hashedOtp, 
      secret: null,
      verified: false
    });
    
    res.status(200).json({ message: 'OTP envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi ou du stockage de l\'OTP:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};
//router.post('/verifyOtp', verifyOtp);
  const verifyOtp = async (req, res) => {

  const { email, otp } = req.body;
  console.log("Received OTP request with email:", email);
  console.log("Received OTP:", otp);

  try {
    const { email, otp } = req.body;
    // Fetch the OTP from the database for the given email
    const otpRecord = await Otp.findOne({
      where: { email: email },
      order: [['created_at', 'DESC']], // Ensure you get the most recent OTP
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP not found.' });
    }

    // Compare the OTP entered by the user with the stored hashed OTP
    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
    
    if (!isOtpValid) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    return res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//router.get('/generate-secret', authenticateToken, generateSecret);  
const generateSecret = async (req, res) => {
  console.log("🧑‍💻 Utilisateur extrait du token:", req.user);

  try {
    console.log("✅ Requête reçue pour générer un secret 2FA");
    const email = req.user?.email;
    const force = req.body.force; // récupère force depuis le corps de la requête

    if (!email) return res.status(401).json({ message: 'Utilisateur non authentifié' });

    let otpEntry = await Otp.findOne({ where: { email } });
    let userSecret;

    // ⚠️ Si force = true, on supprime l'ancien enregistrement
    if (force && otpEntry) {
      await Otp.destroy({ where: { email } });
      otpEntry = null;
      console.log("♻️ Ancien secret supprimé pour régénération.");
    }

    if (otpEntry?.secret) {
      userSecret = otpEntry.secret;
      console.log("🕒 Secret déjà existant récupéré:", userSecret);
    } else {
      userSecret = speakeasy.generateSecret({ length: 20 }).base32;
      console.log("🔐 Nouveau secret généré:", userSecret);

      if (otpEntry) {
        otpEntry.secret = userSecret;
        await otpEntry.save();
      } else {
        await Otp.create({ email, secret: userSecret });
      }
    }

    const otpAuthUrl = speakeasy.otpauthURL({
      secret: userSecret,
      label: email,
      issuer: 'Teamwill',
    });

    const qrCodeUrl = await qrcode.toDataURL(otpAuthUrl);

    res.json({ qrCodeUrl, secret: userSecret });
  } catch (error) {
    console.error("Erreur lors de la génération du QR code:", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
//router.post('/verifyTotp', authenticateToken, verifyTotp);
const verifyTotp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("📥 Requête de vérification TOTP reçue avec :", { email, otp });

  try {
    const userSecret = await otpModel.getSecretForUser(email);

    if (!userSecret) {
      console.log(`❌ Aucun secret trouvé pour l'utilisateur : ${email}`);
      return res.status(404).json({ message: "Aucun secret TOTP trouvé pour cet utilisateur." });
    }

    console.log("🔐 Secret trouvé :", userSecret);

    const expectedToken = speakeasy.totp({
      secret: userSecret,
      encoding: 'base32',
      step: 30,
  
    });
    console.log(`🧪 Token attendu pour ${email}:`, expectedToken);
    console.log(`📩 Token reçu du client:`, otp);

    for (let i = -2; i <= 2; i++) {
      const t = speakeasy.totp({
        secret: userSecret,
        encoding: 'base32',
        step: 30,
        time: Math.floor(Date.now() / 1000 / 30) + i    
      });
      console.log(`🧪 Token valide à t+${i}:`, t);
    }

    const verified = speakeasy.totp.verify({
      secret: userSecret,
      encoding: 'base32',
      token: otp,
      window: 2
    });

    if (!verified) {
      console.log('❌ Token invalide : ne correspond pas au token attendu.');
      return res.status(400).json({ message: 'Code TOTP invalide.' });
    }

    console.log('✅ Code TOTP vérifié avec succès !');
    res.status(200).json({ message: 'Code TOTP vérifié avec succès.' });

  } catch (error) {
    console.error("🔥 Erreur inattendue lors de la vérification TOTP:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Exporter les fonctions
module.exports = { 
  verifyOtp, 
  generateSecret, 
  verifyTotp,
  sendOtp 
};
