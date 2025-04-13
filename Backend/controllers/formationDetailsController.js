const db = require('../db/models');
const FormationDetails = db.FormationDetails;

// ✅ Create
exports.createFormationDetails = async (req, res) => {
  try {
    const data = await FormationDetails.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating formation details", error });
  }
};

// ✅ Read all
exports.getAllFormationDetails = async (req, res) => {
  try {
    const details = await FormationDetails.findAll();
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving formation details", error });
  }
};

// ✅ Read one by ID
exports.getFormationDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    const detail = await FormationDetails.findByPk(id);

    if (!detail) return res.status(404).json({ message: "Not found" });

    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving formation details", error });
  }
};

// ✅ Update
exports.updateFormationDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await FormationDetails.update(req.body, {
      where: { id }
    });

    if (!updated) return res.status(404).json({ message: "Not found" });

    const updatedDetails = await FormationDetails.findByPk(id);
    res.status(200).json(updatedDetails);
  } catch (error) {
    res.status(500).json({ message: "Error updating formation details", error });
  }
};

// ✅ Delete
exports.deleteFormationDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await FormationDetails.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Formation details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting formation details", error });
  }
};
