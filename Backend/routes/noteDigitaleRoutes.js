const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteDigitaleController');

router.post('/notes', noteController.createNote);  
router.get('/notes/formation/:formationId', noteController.getNotesByFormation);  
router.put('/notes', noteController.updateNote);  
router.delete('/notes/:noteId', noteController.deleteNote); 


module.exports = router;
