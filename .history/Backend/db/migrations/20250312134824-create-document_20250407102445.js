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
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'formation', 
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