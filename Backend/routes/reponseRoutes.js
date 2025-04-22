// routes/reponseRoutes.js
const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/reponseController');


router.post('/', reponseController.createReponse);
router.get('/', reponseController.getAllReponses);
router.get('/:id', reponseController.getReponseById);
router.put('/:id', reponseController.updateReponse);
router.delete('/:id', reponseController.deleteReponse);

module.exports = router;
