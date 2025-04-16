// routes/userRoute.js
const express = require('express');
const router = express.Router();
const { addUserController, loginUserController, getAllUsers, getOnceUser, getUserByName } = require('../controllers/userController'); // On utilise maintenant userController pour tout

router.post('/register', addUserController);
router.post('/login', loginUserController);
router.get('/getAll', getAllUsers); // update to get user from BD
router.get('/getOnce/:id', getOnceUser);
router.get('/:name', getUserByName);


module.exports = router;

/** user of wissal & siwar
  router.put('/:id', userController.updateUser);
 router.delete('/:id', userController.deleteUser);
 
 module.exports = router;
 */