// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérifie si le token existe
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant ou invalide.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Ajoute les infos de l’utilisateur au `req`
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};

module.exports = verifyToken;