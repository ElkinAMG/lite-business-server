"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("inventory", "enterprise_id", {
      type: Sequelize.STRING,
      references: {
        model: "enterprise",
        key: "NIT",
      },
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("inventory", "enterprise_id", {
      type: Sequelize.STRING,
      references: {
        model: "enterprise",
        key: "NIT",
      },
    });
  },
};
