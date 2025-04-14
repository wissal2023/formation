const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');

// Route to create certification after completing a course
router.post('/complete-course', certificationController.createCertif);

// Route to get all certifications for a specific user
router.get('/:userId', certificationController.getUserCertif);

// Route to get a specific certification by ID
router.get('/certification/:id', certificationController.getCertifById);

module.exports = router;
