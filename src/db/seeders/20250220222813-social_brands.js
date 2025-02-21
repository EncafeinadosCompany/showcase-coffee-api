'use strict';
const {SOCIAL_BRAND_TABLE} = require('../../models/products/social_brands.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert(SOCIAL_BRAND_TABLE, [{
        id_brand: 1,
        id_social_network: 1,
        description: 'NO APLICA',
        url: 'https://www.facebook.com/Starbucks/',
      },
      {
        id_brand: 1,
        id_social_network: 2,
        description: 'somosstarbucks',
        url: 'NO APLICA'
      },
      {
        id_brand: 2,
        id_social_network: 1,
        description: 'NO APLICA',
        url: 'https://www.facebook.com/Starbucks/'
      },
      {
        id_brand: 2,
        id_social_network: 2,
        description: 'somosstarbucks',
        url: 'NO APLICA'
      },
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete( SOCIAL_BRAND_TABLE , null, {});

  }
};
