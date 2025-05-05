// routes/formationDetailsroutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { createFormationDetails } = require('../controllers/formationDetailsController'); 

router.post('/addDetail',authenticateToken, createFormationDetails);


module.exports = router;