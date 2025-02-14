const { VARIANT_PRODUCT_TABLE } = require("../../models/products/variantsProducts.entity");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(VARIANT_PRODUCT_TABLE, [
      {
        id: 1,
        grammage: "250g",
        stock: 50,
        id_product: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        grammage: "100g",
        stock: 0,
        id_product: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 3,
        grammage: "500g",
        stock: 30,
        id_product: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      
      {
        id: 4,
        grammage: "1kg",
        stock: 20,
        id_product: 3,
        created_at: new Date(),
        updated_at: new Date(),
      }

    ]);
  
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete( VARIANT_PRODUCT_TABLE, null, {});
  },
};
