const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authenticateToken = require('../utils/authMiddleware');

// Protected routes
router.post('/create', authenticateToken, quizController.createQuiz);
router.post('/:id/attempt', authenticateToken, quizController.attemptQuiz);
router.put('/:id', authenticateToken, quizController.updateQuiz);
router.delete('/:quizId', authenticateToken, quizController.deleteQuiz);
// Public or optionally protected routes
router.get('/formation/:formationId', quizController.getQuizByFormation);
// User-specific routes (should be protected)
router.get('/user/quizzes', authenticateToken, quizController.getAllQuizzesByUser);
router.get('/user/quiz-attempts', authenticateToken, quizController.getQuizAttemptsByUser);
router.get('/:quizId/result', authenticateToken, quizController.getQuizResult);

module.exports = router;
