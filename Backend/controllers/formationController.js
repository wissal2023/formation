const { sequelize, Formation, FormationDetails, UserFormation , Trace, User,Document,Historisation,Evaluation,NoteDigitale,Quiz} = require('../db/models');
const { USER_ROLES } = require('../db/constants/roles');

//app.use('/formations', formationRoutes);
// router.post('/AddFormation',authenticateToken, createFormation);
const createFormation = async (req, res) => {
  try {
    // Log incoming request data
    console.log('Request body:', req.body);

    // Ensure user exists and has the correct role
    const user = req.user;
    if (!user) {
      console.log('User not authenticated');
      return res.status(403).json({ message: 'Utilisateur non autorisé.' });
    }

    if (user.roleUtilisateur !== 'Formateur' && user.roleUtilisateur !== 'Admin') {
      console.log('User does not have permission. Role:', user.roleUtilisateur);
      return res.status(403).json({ message: 'Permission refusée.' });
    }

    // Log user validation success
    console.log('User authenticated and authorized:', user.id);

    // Attempt to create formation
    const formationData = {
      titre: req.body.titre,
      thematique: req.body.thematique,
      typeFlag: req.body.typeFlag,
      statusFormation: 'created',
    };

    // Create the Formation record
    const formation = await Formation.create(formationData);

    // Log formation creation success
    console.log('Formation created successfully:', formation.id, formation.titre);

    // Create the entry in the userFormations join table
    await formation.addUser(user.id);

    // Log Trace creation for audit purposes
    const traceData = {
      userId: user.id,
      model: 'Formation',
      action: 'Création de formation',
      data: { id: formation.id, titre: formation.titre },
    };

    const trace = await Trace.create(traceData);

    console.log('Trace created:', trace);

    // Respond with the created formation details
    return res.status(201).json({ formation });
  } catch (error) {
    // Log the full error stack
    console.error('Error in createFormation:', error);

    // Return the error message to the client
    return res.status(500).json({ message: 'Erreur création formation', error: error.message });
  }
};



//app.use('/formations', formationRoutes);
//router.get('/finished', authenticateToken, getAllFinishedFormations);
const getAllFinishedFormations = async (req, res) => {
  try {
    const user = req.user;
    console.log('User:', user); // Log the user object to check if it's being passed correctly

    if (!user || !user.roleUtilisateur) {
      console.log('User or roleUtilisateur is missing'); // Log if the user or role is not found
      return res.status(403).json({ message: 'Utilisateur non autorisé.' });
    }

    // Add a console log to check the where conditions and see if they are correct
    console.log('Fetching formations with conditions:', {
      statusFormation: 'finished',
      typeFlag: 'obligatoire'
    });

    const formations = await Formation.findAll({
      where: {
        statusFormation: 'finished',
        typeFlag: 'obligatoire'
      },
      include: [
        { model: User, attributes: ['username'] },
        {
          model: FormationDetails,
          include: [
            { model: Document },
            { model: Quiz }
          ]
        },
        {
          model: UserFormation,
          where: { userId: user.id },
          required: false // in case user isn't enrolled yet
        } 
      ]
    });

    console.log('Fetched formations:', formations); // Log the formations fetched from the database

    const enrichedFormations = formations.map(formation => {
      let progress = 0;

      const userFormation = formation.UserFormations?.[0]; // get the current user's relation entry
      console.log('User Formation:', userFormation); // Log the user's formation to check its status

      // +25% if the user has userformation.status = 'enrolled'
      if (userFormation?.status === 'enrolled') {
        progress += 25;
      }

      // +25% if user watched all videos or read all files
      // +25% if user started the quiz
      // +25% if user passed quiz and got certification

      // NOTE: Implement these checks with user-specific tracking tables if available

      return {
        ...formation.toJSON(),
        progress,
        isCompleted: progress === 100
      };
    });

    console.log('Enriched formations:', enrichedFormations); // Log the enriched formations after progress calculation

    return res.status(200).json(enrichedFormations);

  } catch (error) {
    console.error('Error in getAllFormations:', error); // Log the error if it happens
    res.status(500).json({ message: 'Erreur lors de la récupération des formations', error });
  }
};
//app.use('/formations', formationRoutes);
//router.post('/:id/status', authenticateToken, getFormationsByStatus); 
const getFormationsByStatus = async (req, res) => {
  try {
    const formationId = req.params.id;
    const userId = req.user.id;

    const formation = await Formation.findOne({ where: { id: formationId } });
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found.' });
    }

    
   // Create or update the UserFormation record
    const [userFormation, created] = await UserFormation.findOrCreate({
      where: { userId, formationId },
      defaults: { status: 'enrolled' }
    });

    if (!created) {
      // If already exists, update the status
      userFormation.status = 'enrolled';
      await userFormation.save();
    }

    return res.status(200).json({ message: 'User enrolled in the formation.' });
  } catch (err) {
    console.error('Enrollment error:', err);
    return res.status(500).json({ message: 'Enrollment failed.', error: err });
  }
};



//*************************************** */
// get all formations where status=finished & typeFlag=obligatoire
const getAllFormations = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.roleUtilisateur) {
      return res.status(403).json({ message: 'Utilisateur non autorisé.' });
    }
     
    const formations = await Formation.findAll({
      include: [
        { model: User, attributes: ['username'] },
        {
          model: FormationDetails,
          include: [
            { model: Document },
            { model: Quiz }
          ]
        }
      ]
    });

      const enrichedFormations = formations.map(formation => {
      let progress = 0;

      // +25% if titre and thematique exist
      if (formation.titre && formation.thematique) progress += 25;

      // +25% if FormationDetails exist
      if (formation.FormationDetail) progress += 25;

      // +25% if FormationDetails has Documents
      if (formation.FormationDetail && formation.FormationDetail.Documents?.length > 0) progress += 25;

      // +25% if FormationDetails has Quizzes
      if (formation.FormationDetail && formation.FormationDetail.Quizzes?.length > 0) progress += 25;

      return {
        ...formation.toJSON(),
        progress,
        isCompleted: progress === 100
      };
    });

    return res.status(200).json(enrichedFormations);
    
  } catch (error) {
    console.error('Error in getAllFormations:', error);
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
//app.use('/formations', formationRoutes);
//router.get('/completed', authenticateToken, getCompletedFormations);


const getCompletedFormations = async (req, res) => {
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
const getFormationsByUser = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID manquant dans le token." });
    }

    const userFormations = await Formation.findAll({
      where: { userId },
      include: {
        model: User,
        attributes: ['username'],
      },
    });

    if (userFormations.length === 0) {
      return res.status(404).json({ message: "Aucune formation trouvée pour cet utilisateur." });
    }

    return res.status(200).json(userFormations);
  } catch (error) {
    console.error("Erreur lors de la récupération des formations par utilisateur:", error);
    return res.status(500).json({ message: "Erreur interne du serveur", error: error.message, stack: error.stack });
  }
};



module.exports = {
  createFormation, getAllFinishedFormations,
  getAllFormations,getFormationById, updateFormation,
  deleteFormation, getCompletedFormations,
  getFormationsByUser, getFormationsByStatus
};
