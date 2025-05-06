const { FormationDetails, Trace,} = require('../db/models');
// app.use('/module', formationDetailsRoutes);
//router.post('/addDetail',authenticateToken, createFormationDetails);
const createFormationDetails = async (req, res) => {
    try {
      const user = req.user;
      const { formationId, duree, ...detailsData } = req.body;
  
      console.log("📥 Received data in backend module/addDetail:", req.body);
      console.log("🧠 Extracted formationId:", formationId);
      console.log("📝 Remaining detailsData:", detailsData);
      console.log("👤 Authenticated user:", user?.id);

      console.log("🧠 Received duree:", duree);
      const [hours, minutes] = duree.split(":").map(Number);
      const dureeInMinutes = (hours * 60) + minutes;
  

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

module.exports={
  createFormationDetails
}