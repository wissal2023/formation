'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Formations', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      duree: {
        type: Sequelize.INTEGER
      },
      evaluation: {
        type: Sequelize.INTEGER
      },
      thematique: {
        type: Sequelize.STRING
      },
      datedebut: {
        type: Sequelize.DATE
      },
      datefin: {
        type: Sequelize.DATE
      },
      verouillee: {
        type: Sequelize.BOOLEAN
      },
      userId: {  // ✅ Foreign key linking to Users
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {  // ✅ Soft delete support
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Formations');
  }
};
