// controllers/formation.controller.js
const db = require('../db/models');
const Formation = db.Formation;
const User = db.User;

exports.createFormation = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Fetch the user details by userId
    const user = await User.findByPk(userId);

    // Check if the user exists and has the correct role
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Only allow "formateur" or "admin" to create formations
    if (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin') {
      return res.status(403).json({ message: 'Vous n\'avez pas la permission de créer une formation.' });
    }

    // Parse and format the dates as ISO strings
    const datedebut = new Date(req.body.datedebut).toISOString();
    const datefin = new Date(req.body.datefin).toISOString();

    // Validate the date objects
    if (isNaN(new Date(datedebut)) || isNaN(new Date(datefin))) {
      console.log(req.body.datedebut, req.body.datefin);
      return res.status(400).json({ message: 'Les dates sont invalides.' });
    }

    // Create the formation
    const formation = await Formation.create({
      ...req.body,
      datedebut, 
      datefin,
      userId, 
    });

    res.status(201).json(formation);
  } catch (error) {
    console.error('Erreur lors de la création de formation:', error);
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
