const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');

router.post('/certifications', certificationController.createCertification);
router.get('/certifications/:userId', certificationController.getUserCertifications);
router.get('/certifications/:userId/:certificationId', certificationController.displaycertification);
router.get('/certifications/formation/:formationId/count', certificationController.numberofcertifperformation);

module.exports = router;
