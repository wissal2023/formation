//backend/ utils/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

module.exports = async function authenticateToken(req, res, next) {
  
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide (cookie).' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Échec d\'authentification.', error: err.message });
  }
};
