const { ATTRIBUTE_TABLE } = require('../../models/products/attribute.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    
    await queryInterface.bulkInsert(ATTRIBUTE_TABLE, [
      {
        description: 'Aroma',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Acidez',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Altura',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Cuerpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Fragancia',
        created_at: new Date(),
        updated_at: new Date()
      },    
      {
        description: 'Origen',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Región',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Sabor',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Tostión',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        description: 'Tipo',
        created_at: new Date(),
        updated_at: new Date()
      },
     
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ATTRIBUTE_TABLE, null, {});
  },
};
