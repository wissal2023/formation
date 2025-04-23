// controller/helpController.js
const { Help, HelpTranslation, User } = require('../db/models');

exports.getHelpByPage = async (req, res) => {
    const { page } = req.params;
    const lang = req.query.lang || 'fr';
  
    try {
      const helps = await Help.findAll({
        where: { page, isActive: true },
        include: [{
          model: HelpTranslation,
          where: { languageCode: lang },
          required: false
        }]
      });
  
      res.json(helps);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'aide' });
    }
  };
  

// 🔹 Create Help
exports.createHelp = async (req, res) => {
  try {
    const { page, title, content, language } = req.body;

    if (!page || !title || !content) {
      return res.status(400).json({ message: "Les champs requis sont manquants." });
    }

    const help = await Help.create({
      page,
      title,
      content,
      language: language || 'en',
      userId: req.user.id // Attach the logged-in user
    });

    res.status(201).json(help);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'aide.", error: error.message });
  }
};


// 🔹 Get All Helps (filtered by language)
exports.getAllHelps = async (req, res) => {
  try {
    const lang = req.lang || 'fr';
    const helps = await Help.findAll({
      where: { language: lang },
      include: [{ model: User, attributes: ['id', 'username'] }],
    });
    res.json(helps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get One Help by ID
exports.getHelpById = async (req, res) => {
  try {
    const help = await Help.findByPk(req.params.id);
    if (!help) return res.status(404).json({ message: 'Help not found' });
    res.json(help);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update Help
exports.updateHelp = async (req, res) => {
  try {
    const help = await Help.findByPk(req.params.id);
    if (!help) return res.status(404).json({ message: 'Help not found' });

    await help.update(req.body);
    res.json(help);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔹 Delete Help (soft delete)
exports.deleteHelp = async (req, res) => {
  try {
    const help = await Help.findByPk(req.params.id);
    if (!help) return res.status(404).json({ message: 'Help not found' });

    await help.destroy(); // soft delete thanks to `paranoid: true`
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
