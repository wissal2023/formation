const { sequelize, Formation, FormationDetails, Video, Trace, User,Document,Historisation,Evaluation,NoteDigitale,Quiz} = require('../db/models');
const { USER_ROLES } = require('../db/constants/roles');

//app.use('/formations', formationRoutes);
// router.post('/AddFormation',authenticateToken, createFormation);
const createFormation = async (req, res) => {
  try {
    const user = req.user;
    if (!user || (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin'))
      return res.status(403).json({ message: 'Permission refusée.' });

    const formation = await Formation.create({
      ...req.body,
      status: 'in_progress', 
      userId: user.id
    });

    await Trace.create({
      userId: user.id,
      model: 'Formation',
      action: 'Création de formation',
      data: { id: formation.id, titre: formation.titre }
    });

    return res.status(201).json({ formation });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur création formation', error: error.message });
  }
};



/*
exports.createFormation = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {      
      const user = req.user;
      const userId = user.id;

    if (!user) 
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
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

    // Step 3: create a blank Video and link to FormationDetails
    let videoId = null;
    if (createEmptyVideo) {
      const emptyVideo = await Video.create({
        titre: '', // placeholder
        duree: 0,
        nomSection: '',
        nbreSection: '',
        formationDetailsId: formationDetails.id //  link to FormationDetails
      }, { transaction });

      videoId = emptyVideo.id;
    }

    // Step 4: Trace the creation
    await Trace.create({
      userId,
      model: 'Formation',
      action: 'Création de formation',
      data: {
        formationId: formation.id,
        titre: formation.titre,
        formationDetailsId: formationDetails.id,
        videoId
      }
    }, { transaction });

    await transaction.commit();
    return res.status(201).json({
      message: 'Formation, FormationDetails et vidéo vide créés',
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
*/
// get all
const getAllFormations = async (req, res) => {
  try {
    const user = req.user;

    // Tous les utilisateurs authentifiés peuvent voir toutes les formations
    if (USER_ROLES.includes(user.roleUtilisateur)) {
      const formations = await Formation.findAll({
        include: {
          model: User,
          attributes: ['username'], // only get the username
        },
      }

      );
      return res.status(200).json(formations);
    }

    return res.status(403).json({ message: 'Rôle utilisateur non autorisé.' });

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des formations', error });
  }
};


// get by id
const getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findByPk(req.params.id);
    if (!formation) return res.status(404).json({ message: 'Formation non trouvée' });
    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error });
  }
};

// UPDATE
const updateFormation = async (req, res) => {
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

const deleteFormation = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();  // Ensure atomic operations
  try {
    // Step 1: Find the Formation to delete, along with associated data
    const formation = await Formation.findByPk(id, {
      include: [
        { model: FormationDetails },
        { model: Evaluation },
        { model: NoteDigitale },
        { model: Quiz },
        { model: Historisation }
      ],
    });

    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    // Step 2: Archive the formation in the Historisation table
    const deletedData = {
      formation: formation.toJSON(),  // Get the formation as JSON
      formationDetails: formation.FormationDetails.map(detail => detail.toJSON()),
      evaluations: formation.Evaluations.map(eval => eval.toJSON()),
      noteDigitale: formation.NoteDigitales.map(note => note.toJSON()),
      quizzes: formation.Quizzes.map(quiz => quiz.toJSON())
    };

    await Historisation.create({
      action: 'deleted',
      deleted_data: deletedData,  // Store all related data that is being deleted
      formationId: formation.id,  // Link to the Formation being deleted
      userId: req.user.id  // User performing the deletion (assuming user info is in req.user)
    }, { transaction });

    // Step 3: Trace the deletion action in the Trace table
    await Trace.create({
      userId: req.user.id,  // User performing the deletion
      action: 'deleted',  // Action performed
      model: 'Formation',  // The model being modified
      data: {
        formationId: formation.id,
        titre: formation.titre,
        deletedData: deletedData,  // Including deleted data as part of the trace
      },
    }, { transaction });

    // Step 4: Delete the formation and its associated records (they will be deleted with CASCADE)
    await formation.destroy({ transaction });

    await transaction.commit();  // Commit the transaction

    res.status(200).json({ message: 'Formation and related data archived, deleted and traced successfully' });
  } catch (error) {
    await transaction.rollback();  // Rollback the transaction in case of error
    console.error(error);
    res.status(500).json({ message: 'Error deleting formation, storing in Historisation, or tracing', error });
  }
};

exports.getCompletedFormations = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the authenticated token
    console.log("User ID:", userId);
    console.log("Querying for status: completed");
    const completedFormations = await Formation.findAll({
      where: {
        userId: userId, 
        status: 'completed' // Correct filter for status
      },
      raw: true,
      paranoid: false // To return raw data without additional Sequelize model methods
    });

    console.log("Completed formations for user:", completedFormations);

    if (completedFormations.length === 0) {
      return res.status(404).json({ message: "No completed formations found for user" });
    }

    // Send back the number of completed formations
    res.json({ completedFormations: completedFormations.length });
    
  } catch (error) {
    console.error("Failed to get completed formations:", error);
    res.status(500).json({ message: "Failed to get completed formations", error: error.message });
  }
};

module.exports = {
  createFormation, getAllFormations,getFormationById, updateFormation, deleteFormation
};
