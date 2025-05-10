const express = require('express');
const router = express.Router();
const authenticateToken = require('../utils/authMiddleware');
const { uploadFile } = require('../utils/multerConfig');
const {
  createDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentByName,
  getDocumentByFormation, // ✅ Add the controller function
  updateDocument,
  deleteDocument,
  servePDF
} = require('../controllers/docController');

router.post('/AddDoc', authenticateToken, uploadFile.single('file'), createDocument);
router.get('/view/:filename', authenticateToken, servePDF);
router.get('/', authenticateToken, getAllDocuments);
router.get('/:id', authenticateToken, getDocumentById);
router.get('/by-name/:filename', authenticateToken, getDocumentByName);
router.get('/byFormation/:id', authenticateToken, getDocumentByFormation); // ✅ New route
router.put('/:id', authenticateToken, updateDocument);
router.delete('/:id', authenticateToken, deleteDocument);

module.exports = router;
