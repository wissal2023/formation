const Certification = require('../db/models/certification');
const User = require('../db/models/user');
const Formation = require('../db/models/formation');
const Quiz = require('../db/models/quiz');

// Create certification after completing a course
exports.createCertif = async (req, res) => {
  try {
    const { userId, formationId } = req.body;

    // Check if the user and formation exist
    const user = await User.findByPk(userId);
    const formation = await Formation.findByPk(formationId);

    if (!user || !formation) {
      return res.status(404).json({ message: 'User or Course not found' });
    }

    // Fetch all quizzes associated with the formation
    const quizzes = await Quiz.findAll({
      where: { formationId: formation.id }
    });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this course' });
    }

    // Check if the user has completed all quizzes in the course
    const completedQuizzes = quizzes.filter(quiz => quiz.userId === user.id && quiz.status === 'Completed');

    if (completedQuizzes.length !== quizzes.length) {
      return res.status(400).json({ message: 'User has not completed all quizzes in the course' });
    }

    // Create the certification for the completed course
    const certification = await Certification.create({
      nom: user.firstName,  // Assuming the user's first name is stored in 'firstName'
      prenom: user.lastName,  // Assuming the user's last name is stored in 'lastName'
      dateObtention: new Date(),
      statut: 'Completed', // Set the status as 'Completed'
      formationId: formation.id // Link certification to the course (formation)
    });

    res.status(201).json({ message: 'Certification created successfully', certification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all certifications for a user
exports.getUserCertif = async (req, res) => {
  try {
    const { userId } = req.params;

    const certifications = await Certification.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email'],
        },
        {
          model: Formation,
          attributes: ['titre'],
        },
      ],
    });

    if (certifications.length === 0) {
      return res.status(404).json({ message: 'No certifications found for this user' });
    }

    res.status(200).json(certifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific certification by ID
exports.getCertifById = async (req, res) => {
  const { id } = req.params;

  try {
    const certification = await Certification.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email'],
        },
        {
          model: Formation,
          attributes: ['titre'],
        },
      ],
    });

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.status(200).json(certification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
