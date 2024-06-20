'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Contacts", // Name of the referenced table
          key: "id", // Column in the referenced table
        },
      },
      messageId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direction: {
        type: Sequelize.STRING,
        allowNull: false
      },
      msgtimestamp: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Messages');
  }
};