// controllers/recompenseController.js
const db = require('../db/models');
const Recompense = db.Recompense;


// Create a new Recompense
exports.createRecompense = async (req, res) => {
  try {
    const recompense = await Recompense.create(req.body);
    res.status(201).json(recompense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Recompenses
exports.getAllRecompenses = async (req, res) => {
  try {
    const recompenses = await Recompense.findAll();
    res.status(200).json(recompenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single Recompense by ID
exports.getRecompenseById = async (req, res) => {
  try {
    const recompense = await Recompense.findByPk(req.params.id);
    if (!recompense) {
      return res.status(404).json({ message: "Recompense not found" });
    }
    res.status(200).json(recompense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a Recompense by ID
exports.updateRecompense = async (req, res) => {
  try {
    const recompense = await Recompense.findByPk(req.params.id);
    if (!recompense) {
      return res.status(404).json({ message: "Recompense not found" });
    }

    // Update fields with new values from request body
    await recompense.update(req.body);
    res.status(200).json(recompense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft delete a Recompense by ID (paranoid soft delete)
exports.deleteRecompense = async (req, res) => {
  try {
    const recompense = await Recompense.findByPk(req.params.id);
    if (!recompense) {
      return res.status(404).json({ message: "Recompense not found" });
    }

    // Soft delete
    await recompense.destroy();
    res.status(200).json({ message: "Recompense deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
