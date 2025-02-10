const { ATTRIBUTE_PRODUCT_TABLE } = require('../../models/products/attributesProducts.entity');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {

    await queryInterface.bulkInsert(ATTRIBUTE_PRODUCT_TABLE, [

      {
      id_attribute: 1,
      id_product: 2,
      value: 'San Carlos',
      created_at: new Date(),
      updated_at: new Date(),
      },

      {
      id_attribute: 2,
      id_product: 1,
      value: 'Notas frutales',
      created_at: new Date(),
      updated_at: new Date(),
      },
      {
      id_attribute: 3,
      id_product: 2,
      value: 'Dulce y afrutado',
      created_at: new Date(),
      updated_at: new Date(),
      },
      {
      id_attribute: 1,
      id_product: 3,
      value: 'La Esperanza',
      created_at: new Date(),
      updated_at: new Date(),
      },
      {
      id_attribute: 4,
      id_product: 5,
      value: 'Ligero',
      created_at: new Date(),
      updated_at: new Date(),
      },
      {id_attribute: 4,
        id_product:4,
        value:'Medio',
        created_at: new Date(),
        updated_at: new Date()
      }
      
    ]);
      
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