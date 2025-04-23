// routes/reponseRoutes.js
const express = require('express');
const router = express.Router();
const reponseController = require('../controllers/reponseController');


router.delete('/reponses/:reponseId', reponseController.deleteReponse);
module.exports = router;
