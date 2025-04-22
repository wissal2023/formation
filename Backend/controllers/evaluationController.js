const db = require('../db/models');
const Evaluation = db.Evaluation;

// CREATE Evaluation
exports.createEvaluation = async (req, res) => {
  try {
    const { nbPoint, commentaire, formationId } = req.body;
    const evaluation = await Evaluation.create({
      nbPoint,
      commentaire,
      formationId
    });
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ all Evaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ one Evaluation
exports.getEvaluationById = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE Evaluation
exports.updateEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nbPoint, commentaire } = req.body;

    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) return res.status(404).json({ error: 'Not found' });

    evaluation.nbPoint = nbPoint ?? evaluation.nbPoint;
    evaluation.commentaire = commentaire ?? evaluation.commentaire;

    await evaluation.save();
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE Evaluation
exports.deleteEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) return res.status(404).json({ error: 'Not found' });

    await evaluation.destroy(); // soft-delete if paranoid is true
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
