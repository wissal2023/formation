const express = require('express');
const router = express.Router();
const multer = require('multer');
const conversionFileController = require('../controllers/ConversionFileController');

const upload = multer({ dest: 'uploads/' });

router.post('/convert-to-pdf', upload.single('file'), conversionFileController.convertToPdf);
router.post('/convert-pdf-to-markdown', upload.single('file'), conversionFileController.convertPdfToMarkdown);
router.post('/extract-labeled-data', conversionFileController.extractLabeledData);

module.exports = router;
