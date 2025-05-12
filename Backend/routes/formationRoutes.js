const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');

const { 
    createFormation, getAllFormations, getFormationById, updateFormation, 
    deleteFormation, getCompletedFormations,getAllFinishedFormations, getFormationsByUser,
    getFormationsByStatus,
    } = require('../controllers/formationController'); 

router.post('/AddFormation', authenticateToken, createFormation);
router.get('/finished', authenticateToken, getAllFinishedFormations);
router.post('/:id/status', authenticateToken, getFormationsByStatus); 
router.get('/formationbyuser', authenticateToken, getFormationsByUser); 

//  Generic routes after
router.get('/:id', authenticateToken, getFormationById);
router.put('/:id', updateFormation);
router.delete('/:id', deleteFormation);

// not sure
router.get('/all', authenticateToken, getAllFormations);
router.get('/completed', authenticateToken, getCompletedFormations);


module.exports = router;
