const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const authenticateToken = require('../utils/authMiddleware');

// Protected routes
router.post('/create', authenticateToken, quizController.createQuiz);
router.post('/quizzes/:id/attempt', authenticateToken, quizController.attemptQuiz);
router.put('/quizzes/:id', authenticateToken, quizController.updateQuiz);
router.delete('/quizzes/:quizId', authenticateToken, quizController.deleteQuiz);

// Public or optionally protected routes
router.get('/formations/:formationId/quizzes', quizController.getAllQuizzes);
router.get('/quizzes/:id', quizController.getQuizById);

// User-specific routes (should be protected)
router.get('/user/quizzes', authenticateToken, quizController.getAllQuizzesByUser);
router.get('/user/quiz-attempts', authenticateToken, quizController.getQuizAttemptsByUser);
router.get('/quizzes/:quizId/result', authenticateToken, quizController.getQuizResult);

module.exports = router;
