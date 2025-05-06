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
      status: { 
        type: Sequelize.ENUM('created','enrolled', 'in_progress', 'completed'), 
        allowNull: false,
      },
      userId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Ensure this references the correct table ('Users')
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
      deletedAt: {  // Soft delete support
        type: Sequelize.DATE
      }
    });

    // Optional: Add an index for userId if you query formations by user frequently
    await queryInterface.addIndex('Formations', ['userId']);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Formations');
  }
};
