const { Formation, FormationDetails, Document, Video, Certification, Historisation, User } = require('../db/models');
// Soft delete Formation and related data, storing in Historisation
exports.deleteFormation = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the Formation to be deleted, including related data
    const formation = await Formation.findByPk(id, {
      include: [
        { model: FormationDetails },
        { model: Document },
        { model: Video },
       
      ],
    });

    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    // Gather all related data (Formation, FormationDetails, Documents, Videos, Certifications)
    const deletedData = {
      formation: formation.toJSON(),  // Get the formation as JSON
      formationDetails: formation.FormationDetails.map(detail => detail.toJSON()),
      documents: formation.Documents.map(doc => doc.toJSON()),
      videos: formation.Videos.map(video => video.toJSON())
      
    };

    // Store the deleted data in Historisation
    await Historisation.create({
      action: 'deleted',
      deleted_data: deletedData,  // Store all related data that is being deleted
      formationId: formation.id,  // Link to the Formation being deleted
      userId: req.user.id  // User performing the deletion (assuming user info is in req.user)
    });

    // Delete the Formation and related data (it will be deleted with `CASCADE`)
    await formation.destroy();

    res.status(200).json({ message: 'Formation and related data deleted and stored in Historisation' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting formation and storing in Historisation', error });
  }
};
