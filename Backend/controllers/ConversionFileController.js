const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const PYTHON_API_BASE_URL = 'http://localhost:5001';

exports.convertToPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    const response = await axios.post(`${PYTHON_API_BASE_URL}/convert-to-pdf`, form, {
      headers: {
        ...form.getHeaders(),
      },
      responseType: 'stream',
    });

    res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
    response.data.pipe(res);
  } catch (error) {
    console.error('Error in convertToPdf:', error.message);
    res.status(500).json({ error: 'Conversion to PDF failed' });
  }
};

exports.convertPdfToMarkdown = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    const response = await axios.post(`${PYTHON_API_BASE_URL}/convert-pdf-to-markdown`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error in convertPdfToMarkdown:', error.message);
    res.status(500).json({ error: 'Conversion from PDF to Markdown failed' });
  }
};

exports.extractLabeledData = async (req, res) => {
  try {
    const { markdown } = req.body;
    if (!markdown) {
      return res.status(400).json({ error: 'No markdown content provided' });
    }

    const response = await axios.post(`${PYTHON_API_BASE_URL}/extract-labeled-data`, { markdown });

    res.json(response.data);
  } catch (error) {
    console.error('Error in extractLabeledData:', error.message);
    res.status(500).json({ error: 'Extraction of labeled data failed' });
  }
};
