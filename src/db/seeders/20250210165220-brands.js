'use strict';

const {BRAND_TABLE} = require ('../../models/products/brands.entity')
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    await queryInterface.bulkInsert( BRAND_TABLE, [
      {
        name: 'Café',
        description: 'Marca tradicional de café colombiano con origen en el Eje Cafetero',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Juan Valdez Marca',
        description: 'Reconocida marca de café colombiano de alta calidad',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Oma Café Marca',
        description: 'Cadena colombiana especializada en café y repostería',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete(BRAND_TABLE, null, {})
  }
};
