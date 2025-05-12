'use strict';
/** @type {import('sequelize-cli').Migration} */
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
      thematique: {
        type: Sequelize.STRING
      },
      verouillee: {
        type: Sequelize.BOOLEAN,
        defaultValue: false // Set default value for verouillee as false
      },
      typeFlag: { 
        type: Sequelize.ENUM('facultat', 'obligatoire'), 
        allowNull: false,
      },
      statusFormation: { 
        type: Sequelize.ENUM('created','finished'),
         allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {  // Soft delete support
        type: Sequelize.DATE
      }
    });

  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Formations');
  }
};
