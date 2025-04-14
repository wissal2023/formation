const db = require('../db/models');
const Certification = db.Certification;

// ✅ CREATE
exports.createCertification = async (req, res) => {
  try {
    const newCert = await Certification.create(req.body);
    res.status(201).json(newCert);
  } catch (error) {
    res.status(500).json({ message: 'Error creating certification', error });
  }
};

// ✅ READ ALL
exports.getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.findAll();
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certifications', error });
  }
};

// ✅ READ ONE
exports.getCertificationById = async (req, res) => {
  try {
    const cert = await Certification.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certification not found' });
    res.status(200).json(cert);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certification', error });
  }
};

// ✅ UPDATE
exports.updateCertification = async (req, res) => {
  try {
    const cert = await Certification.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certification not found' });

    await cert.update(req.body);
    res.status(200).json(cert);
  } catch (error) {
    res.status(500).json({ message: 'Error updating certification', error });
  }
};

// ✅ DELETE (Soft delete thanks to paranoid: true)
exports.deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findByPk(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certification not found' });

    await cert.destroy();
    res.status(200).json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certification', error });
  }
};
