// routes/helpRoutes.js
const express = require('express');
const router = express.Router();
const {createHelp, getHelpByPage, getAllHelps, getHelpById, updateHelp, deleteHelp } = require('../controllers/helpController');
const authenticateToken = require('../utils/authMiddleware');


router.post('/', authenticateToken,createHelp);
router.get('/page/:page', authenticateToken, getHelpByPage);
router.get('/', authenticateToken, getAllHelps);
router.get('/:id', authenticateToken, getHelpById);
router.put('/:id', authenticateToken, updateHelp);
router.delete('/:id', authenticateToken, deleteHelp);


module.exports = router;
