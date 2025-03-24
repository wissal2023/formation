'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formation', {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('formations');
  }
};