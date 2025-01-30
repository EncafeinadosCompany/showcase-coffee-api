const { ProductModel } = require("../../models/products/products.entity");
const {VariantProductModel} = require('../../models/products/variantsProducts.entity')

class VariantRepository {
  constructor() {}

  async getAll() {
    const variants = await VariantProductModel.findAll({
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

}

module.exports = VariantRepository
