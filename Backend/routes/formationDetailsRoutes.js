const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const {
  createFormationDetails,
 getAllDetails
} = require('../controllers/formationDetailsController'); 

router.post('/addDetail', authenticateToken, createFormationDetails);

router.get('/:formationId/details', authenticateToken, getAllDetails);
module.exports = router;
