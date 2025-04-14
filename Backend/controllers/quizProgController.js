const db = require('../db/models');
const QuizProg = db.QuizProg;

// Create a new QuizProg
exports.create = async (req, res) => {
  try {
    const { completed, completedAt, pointGagne, quizId } = req.body;
    const newQuizProg = await QuizProg.create({ completed, completedAt, pointGagne, quizId });
    res.status(201).json(newQuizProg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all QuizProgs
exports.getAll = async (req, res) => {
  try {
    const quizProgs = await QuizProg.findAll({ include: db.Quiz });
    res.status(200).json(quizProgs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a QuizProg by ID
exports.getById = async (req, res) => {
  try {
    const quizProg = await QuizProg.findByPk(req.params.id, { include: db.Quiz });
    if (!quizProg) return res.status(404).json({ message: 'QuizProg not found' });
    res.status(200).json(quizProg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a QuizProg
exports.update = async (req, res) => {
  try {
    const { completed, completedAt, pointGagne } = req.body;
    const quizProg = await QuizProg.findByPk(req.params.id);
    if (!quizProg) return res.status(404).json({ message: 'QuizProg not found' });

    await quizProg.update({ completed, completedAt, pointGagne });
    res.status(200).json(quizProg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft Delete a QuizProg
exports.remove = async (req, res) => {
  try {
    const quizProg = await QuizProg.findByPk(req.params.id);
    if (!quizProg) return res.status(404).json({ message: 'QuizProg not found' });

    await quizProg.destroy(); // will soft-delete because of `paranoid: true`
    res.status(200).json({ message: 'QuizProg deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
