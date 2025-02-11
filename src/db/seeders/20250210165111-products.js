const { PRODUCT_TABLE } = require('../../models/products/products.entity');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Café Juan Valdez Clásico',
        id_brand: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café La Finca Premium',
        id_brand: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café Orgánico Sierra Nevada',
        id_brand: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café Expreso Colombiano',
        id_brand: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café de Altura Tolima',
        id_brand: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café Gourmet Antioqueño',
        id_brand: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café Descafeinado Suave',
        id_brand: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Café Artesanal Huila',
        id_brand: 1,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
