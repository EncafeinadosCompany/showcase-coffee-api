const { ATTRIBUTE_TABLE } = require('../../models/products/attribute.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(ATTRIBUTE_TABLE, [
      {
        description: 'Finca',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Aroma',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Sabor',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Cuerpo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Acidez',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Origen',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ATTRIBUTE_TABLE, null, {});
  },
};
