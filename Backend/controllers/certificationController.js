const { Certification, User, Formation, Trace } = require('../db/models');  // Add Trace model

exports.createCertification = async (req, res) => {
  const { userId, quizId, statut } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const formation = await Formation.findOne({ where: { quizId } });
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found for the quiz' });
    }

    // Create the certification
    const certification = await Certification.create({
      nom: user.username,
      dateObtention: new Date(),
      statut,
      quizId,
      formationId: formation.id,
    });

    // Create a trace to log the action of the user earning a certification
    await Trace.create({
      action: 'Certification Earned',  // Action name
      deleted_data: {  // Save metadata about the action
        certificationId: certification.id,
        userId: user.id,
        formationId: formation.id,
      },
      file_data: null,  // Not needed in this case
    });

    return res.status(201).json({
      message: 'Certification created successfully',
      certification,
    });
  } catch (error) {
    console.error('Error creating certification:', error);
    return res.status(500).json({ message: 'Error creating certification', error });
  }
};

exports.getUserCertifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const certifications = await Certification.findAll({
      where: { userId },
      include: [
        {
          model: Formation,
          attributes: ['name'], 
        },
      ],
    });

    if (certifications.length === 0) {
      return res.status(404).json({ message: 'No certifications found for this user' });
    }

    const certificationDetails = certifications.map(cert => ({
      userName: cert.nom,  
      formationName: cert.Formation.name,
      dateObtention: cert.dateObtention,
      statut: cert.statut,
    }));

    return res.status(200).json({
      message: 'Certifications retrieved successfully',
      certifications: certificationDetails,
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return res.status(500).json({ message: 'Error fetching certifications', error });
  }
};
exports.displaycertification = async (req, res) => {
  const { userId, certificationId } = req.params; 

  try {
    // Retrieve the specific certification for the user
    const certification = await Certification.findOne({
      where: { id: certificationId, userId },  
      include: [
        {
          model: Formation,  
          attributes: ['name'], 
        },
      ],
    });

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found for this user' });
    }

    return res.status(200).json({
      message: 'Certification retrieved successfully',
      certification,
    });
  } catch (error) {
    console.error('Error fetching certification:', error);
    return res.status(500).json({ message: 'Error fetching certification', error });
  }
};
exports.numberofcertifperformation = async (req, res) => {
  const { formationId } = req.params; // formationId as URL param

  try {
    // Count how many certifications have been issued for the specified formation
    const certificationCount = await Certification.count({
      where: { formationId },
    });

    if (certificationCount === 0) {
      return res.status(404).json({ message: 'No users have achieved certification for this formation' });
    }

    return res.status(200).json({
      message: `Successfully retrieved the count of users with certifications for formation ID: ${formationId}`,
      certificationCount,
    });
  } catch (error) {
    console.error('Error fetching certification count:', error);
    return res.status(500).json({ message: 'Error fetching certification count', error });
  }
};
