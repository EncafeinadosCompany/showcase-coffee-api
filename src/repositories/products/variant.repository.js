const { ProductModel } = require("../../models/products/products.entity");
const {VariantProductModel} = require('../../models/products/variantsProducts.entity')

class VariantRepository {
  constructor() {}

  async getAll() {
    const variants = await VariantProductModel.findAll({
      attributes:["id", "grammage", "stock", "id_product"],
      include: [
        {
          model: ProductModel,
          attributes: ["name"],
        },
      ],
    });
    return variants;
  }

  async getById(id) {
    const varaints = await VariantProductModel.findByPk(id, {
      attributes:["id", "grammage","stock", "id_product"],
      include: [
        {
          model: ProductModel,
          attributes: ["name"]
        },
      ],
    });
    return !varaints ? null : varaints;
  }

  async create(variant) {
    const new_variant = await VariantProductModel.create(variant);
    return new_variant;
  }

  async updateStock(id, newStock, options = {}) {
    try {
      const productVariant = await VariantProductModel.findByPk(id, options);
      if (!productVariant) throw new Error('Producto variante no encontrado.');

      productVariant.stock = newStock;
      await productVariant.save(options);
      return productVariant;
    } catch (error) {
      console.error('Error updating product variant stock:', error);
      throw error;
    }
  }

}

module.exports = VariantRepository
