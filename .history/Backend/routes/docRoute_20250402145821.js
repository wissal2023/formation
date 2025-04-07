const express = require('express');
const router = express.Router();
const documentController = require('../controllers/docController');

// POST /api/documents
router.post('/', docController.createDocument);

// GET /api/documents
router.get('/', documentController.getAllDocuments);

// GET /api/documents/:id
router.get('/:id', documentController.getDocumentById);

// PUT /api/documents/:id
router.put('/:id', documentController.updateDocument);

// DELETE /api/documents/:id
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
