

const {ProductModel} = require('../../models/products/products.entity')
const {BrandModel} = require('../../models/products/brands.entity')


class ProductRepository {
  constructor() {}
  async getAll() {
    const products = await ProductModel.findAll({
      include: [
        {
          model:BrandModel,
          as: "brand",
          attributes: ["description"], 
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
          as: "brand",
          attributes: ["description"]
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

module.exports = ProductRepository;
