'use strict';

const {BRAND_TABLE} = require ('../../models/products/brands.entity')
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkDelete(BRAND_TABLE, null, {})

 
    await queryInterface.bulkInsert( BRAND_TABLE, [
      {
        id: 1,
        name: 'Juan Valdez Marca',
        description: 'Reconocida marca de café colombiano de alta calidad',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Oma Café Marca',
        description: 'Cadena colombiana especializada en café y repostería',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    
    console.log('Brands seeded successfully!')
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete(BRAND_TABLE, null, {})
  }
};
