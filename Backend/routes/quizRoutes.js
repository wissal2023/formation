const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/create', quizController.createQuiz);

router.post('/quizzes/:id/attempt', quizController.attemptQuiz);
router.put('/quizzes/:id', quizController.updateQuiz);
router.get('/formations/:formationId/quizzes', quizController.getAllQuizzes);
router.delete('/quizzes/:quizId', quizController.deleteQuiz); 
router.get('/quizzes/:id', quizController.getQuizById); 
router.get('/user/quizzes', quizController.getAllQuizzesByUser); 
router.get('/user/quiz-attempts', quizController.getQuizAttemptsByUser); 
router.get('/quizzes/:quizId/result', quizController.getQuizResult);

module.exports = router;
