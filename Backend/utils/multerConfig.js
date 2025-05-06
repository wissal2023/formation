// backend/utils/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create directories if they don't exist
const userPhotoDir = path.join(__dirname, '..', 'assets', 'uploads');
const documentDir = path.join(__dirname, '..', 'assets', 'documents');

[userPhotoDir, documentDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ---- 1. For User Images --------------------------
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, userPhotoDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
  // File filter to allow only images
  const imageFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype);
    if (extOk && mimeOk) cb(null, true);
    else cb(new Error('Seuls les fichiers image sont autorisés.'));
  };
  
// Configure multer

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: imageFilter
});

// ---- 2. For All Files (Documents, Videos, etc.) ----
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, documentDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadFile = multer({
  storage: fileStorage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});



module.exports = {
  uploadImage, // For user avatars/photos
  uploadFile   // For documents, videos, etc.
};
