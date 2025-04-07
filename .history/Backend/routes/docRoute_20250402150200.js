const express = require('express');
const router = express.Router();
const documentController = require('../controllers/docController');

// POST /api/documents
router.post('/', docController.createDocument);

router.get('/', docController.getAllDocuments);

router.get('/:id', docController.getDocumentById);

router.put('/:id', docController.updateDocument);

router.delete('/:id', docController.deleteDocument);

module.exports = router;
