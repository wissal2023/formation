const { Evaluation, User, Formation, Trace } = require('../db/models');

exports.createEvaluation = async (req, res) => {
  const { nbPoint, commentaire, formationId } = req.body;
  const userId = req.user.id; 
  try {
    const formation = await Formation.findByPk(formationId);
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' });
    }

    const evaluation = await Evaluation.create({
      nbPoint,
      commentaire,
      formationId,
      userId, 
    });
    await Trace.create({
      userId, 
      action: 'Created Evaluation', 
      model: 'Evaluation', 
      data: {
        evaluationId: evaluation.id,
        formationId,
        nbPoint,
        commentaire,
      },
    });

    return res.status(201).json({
      message: 'Evaluation created successfully',
      evaluation,
    });
  } catch (error) {
    console.error('Error creating evaluation:', error);
    return res.status(500).json({ message: 'Error creating evaluation', error });
  }
};

exports.getEvaluationsByFormation = async (req, res) => {
  const { formationId } = req.params;

  try {
    const evaluations = await Evaluation.findAll({
      where: { formationId },
      attributes: ['nbPoint', 'commentaire'], 
    });

    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'No evaluations found for this formation' });
    }

    await Trace.create({
      userId: req.user.id, 
      action: 'Viewed Evaluations (Anonymous)', 
      model: 'Evaluation', 
      data: {
        formationId,
        evaluationsCount: evaluations.length,
      },
    });

    return res.status(200).json({ message: 'Evaluations retrieved successfully', evaluations });
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    return res.status(500).json({ message: 'Error fetching evaluations', error });
  }
};
exports.getEvaluationsByFormationAdmin = async (req, res) => {
  const { formationId } = req.params;

  try {
    const evaluations = await Evaluation.findAll({
      where: { formationId },
      include: [
        {
          model: User,
          attributes: ['id', 'username'], 
        },
      ],
    });

    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'No evaluations found for this formation' });
    }

    await Trace.create({
      userId: req.user.id, 
      action: 'Admin Viewed Evaluations',
      model: 'Evaluation', 
      data: {
        formationId,
        evaluationsCount: evaluations.length,
      },
    });

    return res.status(200).json({ message: 'Evaluations retrieved successfully', evaluations });
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    return res.status(500).json({ message: 'Error fetching evaluations', error });
  }
};
exports.updateEvaluation = async (req, res) => {
  const { evaluationId, nbPoint, commentaire } = req.body;
  const userId = req.user.id;

  try {
    const evaluation = await Evaluation.findByPk(evaluationId);
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    if (evaluation.userId !== userId) {
      return res.status(403).json({ message: 'You can only update your own evaluation' });
    }

    await evaluation.update({
      nbPoint,
      commentaire,
    });

    await Trace.create({
      userId,
      action: 'update_evaluation',
      model: 'Evaluation',
      data: {
        evaluationId: evaluation.id,
        formationId: evaluation.formationId,
        nbPoint,
        commentaire,
      },
    });

    return res.status(200).json({
      message: 'Evaluation updated successfully',
      evaluation,
    });
  } catch (error) {
    console.error('Error updating evaluation:', error);
    return res.status(500).json({ message: 'Error updating evaluation', error });
  }
};

exports.deleteEvaluation = async (req, res) => {
  const { evaluationId } = req.params;
  const userId = req.user.id; 
  try {
    const evaluation = await Evaluation.findByPk(evaluationId);
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }
    if (evaluation.userId !== userId && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'You cannot delete this evaluation' });
    }

    
    const evaluationData = {
      nbPoint: evaluation.nbPoint,
      commentaire: evaluation.commentaire,
      formationId: evaluation.formationId,
      userId: evaluation.userId,
    };

    await Historisation.create({
      action: 'delete_evaluation',
      deleted_data: evaluationData, 
    });

    await Trace.create({
      userId,
      action: 'delete_evaluation',
      model: 'Evaluation',
      data: {
        evaluationId,
        formationId: evaluation.formationId,
      },
    });
    await evaluation.destroy();

    return res.status(200).json({
      message: 'Evaluation deleted and moved to historisation successfully',
    });
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    return res.status(500).json({ message: 'Error deleting evaluation', error });
  }
};


exports.getAverageRatingForFormation = async (req, res) => {
  const { formationId } = req.params;

  try {
    const evaluations = await Evaluation.findAll({
      where: { formationId },
    });

    if (!evaluations.length) {
      return res.status(404).json({ message: 'No evaluations found for this formation' });
    }

    const averageRating = evaluations.reduce((sum, eval) => sum + eval.nbPoint, 0) / evaluations.length;

    return res.status(200).json({ message: 'Average rating fetched successfully', averageRating });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    return res.status(500).json({ message: 'Error fetching average rating', error });
  }
};
