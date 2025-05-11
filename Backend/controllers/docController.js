// backend/controllers/docController.js:
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { Document, Trace, Historisation,FormationDetails, Formation } = require('../db/models');

//app.use('/documents', docRoute );
//router.post('/AddDoc', authenticateToken,uploadFile.single('file'),  createDocument);
const createDocument = async (req, res) => {
  try {
    const user = req.user;
    const { formationDetailsId } = req.body;
    const file = req.file;

    if (!file) {
      console.log("no file found");
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }

    const newDocument = await Document.create({
      filename: file.filename,
      filetype: file.mimetype,
      uploadedDate: new Date(),
      formationDetailsId
    });

    await Trace.create({
      userId: user.id,
      model: 'Document',
      action: `add file (${file.originalname})`,
      data: {
        id: newDocument.id,
        filename: file.filename,
        filetype: file.mimetype,
        user: user.username || user.email ||  user.id
      }
    });

    return res.status(201).json({ message: 'Document téléchargé avec succès.', document: newDocument });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors du téléchargement du document.', error: error.message });
  }
};
//to be used for the video generator
/* router.post('/AddDoc', authenticateToken, createDocument);
const createDocument = async (req, res) => {
  try {
    const user = req.user;
    const { formationDetailsId } = req.body;
    const file = req.file;
    if (!file) {
      console.log("no file found");
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }
    const newDocument = await Document.create({
      filename: file.filename,
      filetype: file.mimetype,
      uploadedDate: new Date(),
      formationDetailsId
    });
    await Trace.create({
      userId: user.id,
      model: 'Document',
      action: `add file (${file.originalname})`,
      data: {
        id: newDocument.id,
        filename: file.filename,
        filetype: file.mimetype,
        user: user.username || user.email || user.id
      }
    });
     // Step 1: Prepare paths for Python script
     const pdfPath = path.join(__dirname, '..', 'assets', 'documents', file.filename);
     const videoOutputPath = path.join('assets/uploads', `${file.filename}-video.mp4`);
 
      // Step 2: Call the Python script
    exec(`python python/video_generator.py "${pdfPath}" "${videoOutputPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${stderr}`);
        return res.status(500).json({ message: 'Erreur lors de la génération de la vidéo.', error: stderr });
      }
      // Return the video URL
      return res.status(201).json({
        message: 'Document téléchargé avec succès.',
        document: newDocument,
        videoUrl: `/assets/uploads/${path.basename(videoOutputPath)}` // Return the video URL
      });
    });
  } catch (error) {
    console.error(error);
  }
}
*/
/* Create a document
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
*/

// 🔹 Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.findAll();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Get document by ID
const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// router.get('/:filename', authenticateToken, getDocumentByName);
const getDocumentByName= async (req, res) => {
  try {
    const doc = await Document.findOne({ where: { filename: req.params.name } });
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Update a document
const updateDocument = async (req, res) => {
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
const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByPk(req.params.id, { paranoid: false });

    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Step 1: Save deleted document data in Historisation
    await Historisation.create({
      action: `Document '${doc.filename}' permanently deleted.`,
      user_id: req.user?.id || 1,
      deleted_data: doc.toJSON() // full data of the document
    });

    // Step 2: Hard delete the document from DB
    await doc.destroy({ force: true });

    res.status(200).json({ message: 'Document permanently deleted and archived in Historisation' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const servePDF = (req, res) => {
  const { filename } = req.params;


const servePDF = (req, res) => {
  const { filename } = req.params;

  // Construct the full path to the PDF file
  const pdfPath = path.join(__dirname, '..', 'assets', 'documents', filename);

  // Check if the file exists
  fs.access(pdfPath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file does not exist, send a 404 error
      return res.status(404).json({ message: 'Fichier non trouvé.' });
    }

    // If the file exists, send it as a response
    res.sendFile(pdfPath);
  });

const getDocumentByFormation = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Document.findOne({ formation: id });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ filename: document.filename });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).json({ message: "Server error" });
  }

};
//app.use('/documents', docRoute );
//router.get('/:formationDetailsId', authenticateToken, getDocumentByFormation);
const getDocumentByFormation = async (req, res) => {
  try {
    // Fetch FormationDetails based on the formationId passed in the URL
    const formationDetails = await FormationDetails.findOne({
      where: { formationId: req.params.formationId }, // Use formationId from URL params
      include: {
        model: Document, // Include the related documents
        required: true,
      },
    });

    if (!formationDetails) {
      return res.status(404).json({ message: 'Formation details not found' });
    }


    // Fetch the first document related to this formation details
    const document = formationDetails.Documents[0]; // Assuming you want the first document

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Get the path to the document
    const documentPath = `/assets/documents/${document.filename}`;

    res.status(200).json({
      filename: document.filename,
      filetype: document.filetype,
      uploadedDate: document.uploadedDate,
      documentUrl: documentPath, // Return the document path as part of the response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentByName,
  updateDocument,
  deleteDocument,
  servePDF,
  getDocumentByFormation

};
