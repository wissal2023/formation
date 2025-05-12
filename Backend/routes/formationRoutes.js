const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');

const { 
    createFormation, getAllFormations, getFormationById, updateFormation, 
    deleteFormation, getCompletedFormations, getFormationsByUser 
    } = require('../controllers/formationController'); 

//  Specific routes first
router.post('/AddFormation', authenticateToken, createFormation);
router.get('/completed', authenticateToken, getCompletedFormations);
router.get('/all', authenticateToken, getAllFormations);
router.get('/formationbyuser', authenticateToken, getFormationsByUser); 

//  Generic routes after
router.get('/:id', authenticateToken, getFormationById);
router.put('/:id', updateFormation);
router.delete('/:id', deleteFormation);

module.exports = router;
