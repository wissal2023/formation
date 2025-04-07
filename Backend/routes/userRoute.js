const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByName
} = require('../controllers/usercontroller');

// CRUD Routes
router.get('/', getUsers);            // GET all users
router.get('/name/:name', getUserByName);// GET user by ID
router.post('/add', createUser);         // POST new user
router.put('/:id', updateUser);       // PUT update user
router.delete('/:id', deleteUser);    // DELETE user

module.exports = router;
