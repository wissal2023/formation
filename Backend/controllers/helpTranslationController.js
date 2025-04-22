
// controller/helpTranslationController.js

const { HelpTranslation } = require('../db/models');

// Create a Help Translation
exports.createTranslation = async (req, res) => {
  try {
    const translation = await HelpTranslation.create(req.body);
    res.status(201).json(translation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Translation by ID
exports.getTranslationById = async (req, res) => {
    try {
        const translation = await HelpTranslation.findByPk(req.params.id);
        if (!translation) return res.status(404).json({ message: 'Translation not found' });
        res.json(translation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Help Translation
exports.updateTranslation = async (req, res) => {
    try {
        const translation = await HelpTranslation.findByPk(req.params.id);
        if (!translation) return res.status(404).json({ message: 'Translation not found' });

        await translation.update(req.body);
        res.json(translation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Help Translation (soft delete)
exports.deleteTranslation = async (req, res) => {
    try {
      const translation = await HelpTranslation.findByPk(req.params.id);
      if (!translation) return res.status(404).json({ message: 'Translation not found' });
  
      await translation.destroy(); // soft delete
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  