// controllers/formation.controller.js
const { sequelize, Formation, FormationDetails, Video, Trace, User } = require('../db/models');

exports.createFormation = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.body.userId;
    const user = await User.findByPk(userId);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    if (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin')
      return res.status(403).json({ message: 'Permission refusée.' });

    const { formationData, detailsData, createEmptyVideo = false } = req.body;

    // Step 1: Create Formation
    const formation = await Formation.create({
      ...formationData,
      userId
    }, { transaction });

    // Step 2: Create FormationDetails
    const formationDetails = await FormationDetails.create({
      ...detailsData,
      formationId: formation.id
    }, { transaction });

    // Step 3: Optionally create a blank Video and link to FormationDetails
    let videoId = null;
    if (createEmptyVideo) {
      const emptyVideo = await Video.create({
        titre: '', // placeholder
        duree: 0,
        nomSection: '',
        nbreSection: '',
        formationDetailsId: formationDetails.id // ✅ link to FormationDetails
      }, { transaction });

      videoId = emptyVideo.id;
    }

    // Step 4: Trace the creation
    await Trace.create({
      userId,
      page: 'Formation',
      action: 'Création de formation',
      metadata: {
        formationId: formation.id,
        titre: formation.titre,
        formationDetailsId: formationDetails.id,
        videoId
      }
    }, { transaction });

    await transaction.commit();
    return res.status(201).json({
      message: 'Formation, FormationDetails et vidéo (placeholder) créés',
      formation,
      formationDetails,
      videoId
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Erreur lors de la création:', error);
    return res.status(500).json({ message: 'Erreur lors de la création', error });
  }
};


// READ - all
exports.getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.findAll();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération', error });
  }
};

// READ - one
exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation non trouvée' });
    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error });
  }
};

// UPDATE
exports.updateFormation = async (req, res) => {
  try {
    const [updated] = await Formation.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedFormation = await Formation.findByPk(req.params.id);
      return res.status(200).json(updatedFormation);
    }
    res.status(404).json({ message: 'Formation non trouvée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
};

// Delete
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
