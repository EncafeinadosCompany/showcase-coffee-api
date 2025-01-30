

const {ProductModel} = require('../../models/products/products.entity')
const {BrandModel} = require('../../models/products/brands.entity')


class ProductsRepository {
  constructor() {}
  async getAll() {
    const products = await ProductModel.findAll({
      include: [
        {
          model:BrandModel,
          as: "brand", // Alias definido en la relación
          attributes: ["description"], // Campos que quieres traer de brands
        },
      ],
    });
    return products;
  }

  async getById(id) {
    const product = await ProductModel.findByPk(id, {
      include: [
        {
          model: BrandModel,
          as: "brands",
        },
      ],
    });
    return !product ? null : product;
  }

  async create(product) {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  }

}

module.exports = ProductsRepository;
