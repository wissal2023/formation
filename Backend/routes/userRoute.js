// routes/userRoute.js
const express = require('express');
const router = express.Router();
const {User} = require("../db/models");
const authenticateToken = require('../utils/authMiddleware');
const { addUserController, loginUserController, logoutUserController, updatePasswordController, getAllUsers, getOnceUser, getUserByName } = require('../controllers/userController'); // On utilise maintenant userController pour tout
router.get('/login', authenticateToken, (req, res) => {
  res.json({ message: 'Bienvenue sur le dashboard admin', user: req.user });
});
router.post('/login', loginUserController);
router.post("/change-password", authenticateToken, updatePasswordController);
router.post('/register', authenticateToken, addUserController);
router.post('/logout', logoutUserController);
router.get('/getOnce', authenticateToken, getOnceUser);


router.get('/getAll', authenticateToken, getAllUsers);
router.get('/:name', getUserByName);


module.exports = router;