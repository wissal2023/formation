const { Reponse, Historisation, Trace } = require('../db/models');

exports.deleteReponse = async (req, res) => {
  const { reponseId } = req.params;
  const transaction = await sequelize.transaction();  // Begin transaction
  try {
    // Step 1: Find the reponse (answer) to delete
    const reponse = await Reponse.findByPk(reponseId);
    if (!reponse) {
      return res.status(404).json({ message: 'Reponse not found' });
    }

    // Step 2: Archive the reponse in Historisation (optional)
    const deletedData = reponse.toJSON();

    await Historisation.create({
      action: 'deleted',
      deleted_data: deletedData,
      reponseId: reponse.id,
      userId: req.user.id  // Assuming the logged-in user is in `req.user`
    }, { transaction });

    // Step 3: Delete the reponse (answer)
    await reponse.destroy({ transaction });

    // Step 4: Trace the deletion in the Trace table
    await Trace.create({
      userId: req.user.id,
      action: 'deleted',
      model: 'Reponse',
      data: {
        reponseId: reponse.id,
        deletedData: deletedData,
      },
    }, { transaction });

    await transaction.commit();  // Commit the transaction

    res.status(200).json({ message: 'Reponse deleted and traced successfully' });
  } catch (error) {
    await transaction.rollback();  // Rollback in case of error
    console.error('Error deleting reponse:', error);
    res.status(500).json({ message: 'Error deleting reponse', error });
  }
};
