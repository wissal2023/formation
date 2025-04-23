const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');

router.post('/evaluations', evaluationController.createEvaluation);
router.get('/evaluations/formation/:formationId', evaluationController.getEvaluationsByFormation);
router.get('/evaluations/formation/:formationId/admin', evaluationController.getEvaluationsByFormationAdmin);
router.put('/evaluations', evaluationController.updateEvaluation);
router.delete('/evaluations/:evaluationId', evaluationController.deleteEvaluation);
router.get('/formations/:formationId/average-rating', evaluationController.getAverageRatingForFormation);
module.exports = router;

