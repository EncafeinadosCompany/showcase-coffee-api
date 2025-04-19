const { PRODUCT_TABLE } = require("../../models/products/products.entity");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: "Café Juan Valdez Clásico",
        id_brand: 1,
        image_url:
          "https://res.cloudinary.com/dllvnidd5/image/upload/v1739556008/images-coffee/1739556107547-c8.avif.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Café La Finca Premium",
        id_brand: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Café de Altura Tolima",
        id_brand: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    console.log("Products seeded successfully!");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
