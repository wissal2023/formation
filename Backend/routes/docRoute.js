// backend/routes/docRoute.js:
const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { uploadFile } = require('../utils/multerConfig');
const {createDocument, getAllDocuments, getDocumentById, getDocumentByName,
        updateDocument, deleteDocument,  servePDF, getDocumentByFormation} = require('../controllers/docController');

router.post('/AddDoc', authenticateToken,uploadFile.single('file'),  createDocument);
router.put('/:id',authenticateToken,  updateDocument);
router.delete('/:id',authenticateToken,  deleteDocument);
router.get('/view/:filename', authenticateToken, servePDF);
router.get('/:formationId', authenticateToken, getDocumentByFormation);

//router.get('/byFormation/:id', authenticateToken, getDocumentByFormation); 
//router.get('/', authenticateToken, getAllDocuments);
//router.get('/:formationDetailsId', authenticateToken, getDocumentByName);
//router.get('/:id',authenticateToken,  getDocumentById);

module.exports = router;
