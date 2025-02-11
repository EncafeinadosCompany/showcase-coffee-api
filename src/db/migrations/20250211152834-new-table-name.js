'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.renameTable('shoppings', 'shopping');
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.renameTable('shopping', 'shoppings');
  }
};
