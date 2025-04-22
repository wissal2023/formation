// controllers/reponseController.js
const db = require('../db/models');
const Reponse = db.Reponse;

// Create a new Reponse
exports.createReponse = async (req, res) => {
  try {
    const reponse = await Reponse.create(req.body);
    res.status(201).json(reponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Reponses
exports.getAllReponses = async (req, res) => {
  try {
    const reponses = await Reponse.findAll();
    res.status(200).json(reponses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get one Reponse by ID
exports.getReponseById = async (req, res) => {
  try {
    const reponse = await Reponse.findByPk(req.params.id);
    if (!reponse) {
      return res.status(404).json({ message: "Reponse not found" });
    }
    res.status(200).json(reponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Reponse by ID
exports.updateReponse = async (req, res) => {
  try {
    const reponse = await Reponse.findByPk(req.params.id);
    if (!reponse) {
      return res.status(404).json({ message: "Reponse not found" });
    }
    await reponse.update(req.body);
    res.status(200).json(reponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete (soft) a Reponse by ID
exports.deleteReponse = async (req, res) => {
  try {
    const reponse = await Reponse.findByPk(req.params.id);
    if (!reponse) {
      return res.status(404).json({ message: "Reponse not found" });
    }
    await reponse.destroy();
    res.status(200).json({ message: "Reponse deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
