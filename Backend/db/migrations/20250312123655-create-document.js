'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('document', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filename: {
          type: Sequelize.STRING
        },
        filetype: {
          type: Sequelize.STRING
        },
        uploadedDate: {
          type: Sequelize.DATE
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
<<<<<<< HEAD:Backend/db/migrations/20250312134824-create-document.js
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'formation', 
=======
        formationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Formations', 
>>>>>>> f91c1f96cc63d2779bb44373875e7e077acb7bb6:Backend/db/migrations/20250312123655-create-document.js
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('document');
  }
};