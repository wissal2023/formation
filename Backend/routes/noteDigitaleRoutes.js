// backend/routes/noteDigitaleRoutes.js
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteDigitaleController');
const authenticateToken = require('../utils/authMiddleware');

router.post('/:formationId/notes', authenticateToken, noteController.createNote);
router.get('/notes/formation/:formationId', noteController.getNotesByFormation);  
router.put('/notes', noteController.updateNote);  
router.delete('/notes/:noteId', noteController.deleteNote); 


module.exports = router;
