// controllers/formation.controller.js
const db = require('../db/models');
const Formation = db.Formation;

// CREATE
exports.createFormation = async (req, res) => {
  try {
    const formation = await Formation.create(req.body);
    res.status(201).json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};

// READ - all
exports.getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.findAll();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};

// READ - one
exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation non trouvée' });
    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error });
  }
};

// UPDATE
exports.updateFormation = async (req, res) => {
  try {
    const [updated] = await Formation.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedFormation = await Formation.findByPk(req.params.id);
      return res.status(200).json(updatedFormation);
    }
    res.status(404).json({ message: 'Formation non trouvée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// DELETE (soft delete)
exports.deleteFormation = async (req, res) => {
  try {
    const deleted = await Formation.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ message: 'Formation non trouvée' });
    res.status(200).json({ message: 'Formation supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error });
  }
};
