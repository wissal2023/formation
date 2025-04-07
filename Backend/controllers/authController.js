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
