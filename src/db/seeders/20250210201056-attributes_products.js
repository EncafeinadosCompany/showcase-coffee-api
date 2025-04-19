const { ATTRIBUTE_PRODUCT_TABLE } = require('../../models/products/attributesProducts.entity');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {

    await queryInterface.bulkInsert(ATTRIBUTE_PRODUCT_TABLE, [

      // {
      //   id_attribute: 1,
      //   id_product: 1,
      //   value: 'Notas florales con toques de jazmín',
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // },
      {
        id_attribute: 3,
        id_product: 1,
        value: 'Huila, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id_attribute: 2,
        id_product: 2,
        value: ' Dulce y balanceada, con notas de frutos rojos',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_attribute: 1,
        id_product: 2,
        value: 'Afrutado y vibrante',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id_attribute: 2,
        id_product: 3,
        value: 'Suave y melosa, con toques de manzana verde',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_attribute: 3,
        id_product: 3,
        value: 'Tolima, Colombia',
        created_at: new Date(),
        updated_at: new Date(),
      }

    ]);

    console.log('Attributes Products seeded successfully!');
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(ATTRIBUTE_PRODUCT_TABLE, null, {});
  },
};
// const attributeValues = {
//   'Finca': ['El Paraíso', 'La Esperanza', 'San Carlos'],
//   'Aroma': ['Notas frutales', 'Chocolate intenso', 'Cítricos suaves'],
//   'Sabor': ['Dulce y afrutado', 'Equilibrado con caramelo', 'Cuerpo medio y suave'],
//   'Cuerpo': ['Ligero', 'Medio', 'Intenso'],
//   'Acidez': ['Baja', 'Media', 'Alta'],
//   'Origen': ['Colombia', 'Brasil', 'Etiopía'],
// };