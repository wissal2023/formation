// backend/routes/docRoute.js:
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { uploadFile } = require('../utils/multerConfig');
const {createDocument, getAllDocuments, getDocumentById, getDocumentByName,
        updateDocument, deleteDocument } = require('../controllers/docController');

router.post('/AddDoc', authenticateToken,uploadFile.single('file'),  createDocument);
router.get('/', authenticateToken, getAllDocuments);
router.get('/:id',authenticateToken,  getDocumentById);
router.get('/:filename', authenticateToken, getDocumentByName);
router.put('/:id',authenticateToken,  updateDocument);
router.delete('/:id',authenticateToken,  deleteDocument);

module.exports = router;
