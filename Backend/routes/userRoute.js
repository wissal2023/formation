// routes/userRoute.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { addUserController, loginUserController, getAllUsers, getOnceUser, getUserByName } = require('../controllers/userController'); // On utilise maintenant userController pour tout


router.get('/login', authenticateToken, (req, res) => {
  res.json({ message: 'Bienvenue sur le dashboard admin', user: req.user });
});

router.post('/register', addUserController);
router.post('/login', loginUserController);
router.get('/getAll', getAllUsers); // update to get user from BD
router.get('/getOnce/:id', getOnceUser);
router.get('/:name', getUserByName);


module.exports = router;