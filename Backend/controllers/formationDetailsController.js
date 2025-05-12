const { FormationDetails, Trace } = require('../db/models');

const createFormationDetails = async (req, res) => {
  try {
    const user = req.user;
    const { formationId, duree, ...detailsData } = req.body;

    console.log("📥 Received data in backend module/addDetail:", req.body);
    console.log("🧠 Extracted formationId:", formationId);
    console.log("📝 Remaining detailsData:", detailsData);
    console.log("👤 Authenticated user:", user?.id);
    console.log("🧠 Received duree:", duree);

    let dureeInMinutes;

    if (typeof duree === "string" && duree.includes(":")) {
      const [hours, minutes] = duree.split(":").map(Number);
      dureeInMinutes = (hours * 60) + minutes;
    } else {
      dureeInMinutes = Number(duree) * 60;
    }

    if (!formationId) {
      return res.status(400).json({ message: "formationId is required" });
    }

    const formationDetails = await FormationDetails.create({
      ...detailsData,
      duree: dureeInMinutes,
      formationId
    });
    console.log("✅ Created FormationDetails entry:", formationDetails);

    await Trace.create({
      userId: user.id,
      model: 'FormationDetails',
      action: 'Création de formation details',
      data: { id: formationDetails.id, formationId }
    });

    return res.status(201).json({ formationDetails });
  } catch (error) {
    console.error("❌ Error in createFormationDetails:", error);
    return res.status(500).json({ message: 'Erreur création formation details', error: error.message });
  }
};
const getAllDetails = async (req, res) => {
  try {
    const { formationId } = req.params;
    const detail = await FormationDetails.findOne({
      where: { formationId },
      attributes: ['description', 'plan']
    });

    if (!detail) {
      return res.status(404).json({ message: 'Formation details not found' });
    }

    res.json({
      description: detail.description,
      plan: detail.plan
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  createFormationDetails, 
  getAllDetails

};
