const express = require('express');
const router = express.Router();
const docController = require('../controllers/docController');

router.post('/', docController.createDocument);

router.get('/', docController.getAllDocuments);

router.get('/:id', docController.getDocumentById);

router.put('/:id', docController.updateDocument);

router.delete('/:id', docController.deleteDocument);

module.exports = router;
