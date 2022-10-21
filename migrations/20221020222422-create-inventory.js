"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventory", {
      SKU: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      additional_data: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      enterprise_id: {
        type: Sequelize.STRING,
        references: {
          model: "enterprise",
          key: "NIT",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inventory");
  },
};
