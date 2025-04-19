const { VARIANT_PRODUCT_TABLE } = require("../../models/products/variantsProducts.entity");


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(VARIANT_PRODUCT_TABLE, [
      {
        grammage: "250g",
        stock: 0,
        id_product: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        grammage: "100g",
        stock: 0,
        id_product: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        grammage: "500g",
        stock: 0,
        id_product: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      
      {
        grammage: "1kg",
        stock: 0,
        id_product: 3,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
    
    console.log("Variants seeded successfully!");
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete( VARIANT_PRODUCT_TABLE, null, {});
  },
};
