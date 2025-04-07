const { Document, Historisation } = require('../db/models');

// Create a document
exports.createDocument = async (req, res) => {
  try {
    const { filename, filetype, formation_id } = req.body;

    if (!filename || !filetype || !formation_id) {
      return res.status(400).json({ message: 'filename, filetype, and formation_id are required' });
    }

    const doc = await Document.create({ filename, filetype, formation_id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.findAll();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get document by name
exports.getDocumentByName= async (req, res) => {
  try {
    const doc = await Document.findOne({ where: { filename: req.params.name } });
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Update a document
exports.updateDocument = async (req, res) => {
  try {
    const { filename, filetype } = req.body;
    const { id } = req.params;

    const doc = await Document.findByPk(id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    await doc.update({ filename, filetype });
    res.status(200).json({ message: 'Document updated successfully', document: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//move deleted document to table historisation

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id, { paranoid: false }); // include even soft-deleted docs

    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Step 1: Store full doc content in Historisation
    await Historisation.create({
      action: `Document '${doc.filename}' permanently deleted.`,
      user_id: req.user?.id || 1,
      deletedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      // Add other fields to Historisation if you want to store document data here:
      // e.g. store filename, filetype, etc. or even doc.toJSON()
    });

    // Step 2: Hard delete document (bypass paranoid)
    await doc.destroy({ force: true }); // 💥 real delete from DB

    res.status(200).json({ message: 'Document permanently deleted and archived in Historisation' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
