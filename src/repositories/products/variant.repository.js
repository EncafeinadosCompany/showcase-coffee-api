const { ProductModel } = require("../../models/products/products.entity");
const { VariantProductModel } = require('../../models/products/variantsProducts.entity')

class VariantRepository {
  constructor() {}

  async getAll() {
    const variants = await VariantProductModel.findAll({
      attributes: ["id", "grammage", "stock", "id_product"],
      include: [
        {
          model: ProductModel,
          as: 'product',
          attributes: ["name"],
        }
      ],
    });
    return variants;
  }

  async getById(id) {
    const variant = await VariantProductModel.findByPk(id, {
      attributes: ["id", "grammage", "stock", "id_product"],
      include: [
        {
          model: ProductModel,
          as: 'product',
          attributes: ["name"],
        }
      ],
    });
    return !variant ? null : variant;
  }

  async create(variantData) {
    const newVariant = await VariantProductModel.create(variantData);
    return newVariant;
  }

  async updateStock(id, newStock, options = {}) {
    try {
      const productVariant = await VariantProductModel.findByPk(id, options);
      if (!productVariant) throw new Error('Producto variante no encontrado.');
  
      productVariant.stock = newStock;
      await productVariant.save(options);
      return productVariant;
    } catch (error) {
      throw error;
    }
  }

  async findByIdVariant(id) {
    const variant = await VariantProductModel.findByPk(id);
    return variant;
  }
}

module.exports = VariantRepository
