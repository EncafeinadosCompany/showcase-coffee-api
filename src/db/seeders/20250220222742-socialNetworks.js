'use strict';
const {SOCIAL_NETWORK_TABLE} = require('../../models/products/socialNetworks.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      const [socialNetworks, metadata] = await queryInterface.sequelize.query(
        `SELECT * FROM ${SOCIAL_NETWORK_TABLE}`
      );
      if (socialNetworks.length > 0) {
        console.log('Social networks already exist, skipping seeding.');
        return;
      }
      console.log('Seeding social networks...');
  
      await queryInterface.bulkInsert( SOCIAL_NETWORK_TABLE, [
        {    
          id: 1,
          name: 'Facebook'
        },
        {
          id: 2,
          name: 'Instagram'
        },
        {
          id: 3,
          name: 'Twitter'
        },
        {
          id: 4,
          name: 'TikTok'
        },
        {
          id: 5,
          name: 'Pinterest'
        },
        {
          id: 6,
          name: 'Youtube'
        },
        {
          id: 7,
          name: 'Whatsapp'
        },
       
        ], {});
    
      console.log('Social networks seeded successfully!');
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete( SOCIAL_NETWORK_TABLE, null, {});
   
  }
};
