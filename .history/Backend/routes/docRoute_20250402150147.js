const express = require('express');
const router = express.Router();
const documentController = require('../controllers/docController');

// POST /api/documents
router.post('/', docController.createDocument);

// GET /api/documents
router.get('/', docController.getAllDocuments);

// GET /api/documents/:id
router.get('/:id', docController.getDocumentById);

// PUT /api/documents/:id
router.put('/:id', docController.updateDocument);

router.delete('/:id', docController.deleteDocument);

module.exports = router;
