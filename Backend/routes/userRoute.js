// routes/userRoute.js
const express = require('express');
const router = express.Router();
const { addUserController, loginUserController, getAllUsers, getOnceUser } = require('../controllers/usercontroller'); // On utilise maintenant userController pour tout
const verifyToken = require('../middleware/auth');


// Route pour l'enregistrement d'un utilisateur (avec Supabase)
router.post('/register', addUserController);

// Route pour la connexion d'un utilisateur (avec envoi OTP)
//router.post('/login', loginUserController);
router.post('/login', (req, res) => {
    // Exemple user fictif
    const user = {
      id: 1,
      username: 'ons',
      role: 'admin'
    };
  
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  
    res.json({
      message: 'Login réussi ✅',
      token: token
    });
  });
// Route pour récupérer tous les utilisateurs
router.get('/getAll', getAllUsers); // update to get user from BD

// Route pour récupérer un seul utilisateur par ID
router.get('/getOnce/:id', getOnceUser);
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Accès autorisé ! Voici des données secrètes 🔐', user: req.user });
  });
  

module.exports = router;

/** user of wissal & siwar
 * const userController = require('../controllers/userController'); // change le chemin selon ton projet
 
 router.get('/', userController.getAllUsers);
 router.get('/:name', userController.getUserByName);
 router.post('/addUser', userController.createUser);
 router.put('/:id', userController.updateUser);
 router.delete('/:id', userController.deleteUser);
 
 module.exports = router;
 */