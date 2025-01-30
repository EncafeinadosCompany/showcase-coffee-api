const { ProductModel } = require("../../models/products/products.entity");
const {VariantProductModel} = require('../../models/products/variantsProducts.entity')
const { ImageVariantModel } = require("../../models/products/image_variants.entity");

class VariantRepository {
  constructor() {}

  async getAll() {
    const variants = await VariantProductModel.findAll({
      attributes: ["id", "grammage", "stock", "id_product"],
      include: [
        {
          model: ProductModel,
          attributes: ["name"],
        },
        {
          model: ImageVariantModel,
          as: "images",
          attributes: ["image_url"],
        },
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
          attributes: ["name"],
        },
        {
          model: ImageVariantModel,
          as: "images",
          attributes: ["image_url"],
        },
      ],
    });
    return !variant ? null : variant;
  }

  async create(variantData) {
    const { images, ...variant } = variantData;
    
    if (!images || images.length === 0) {
      throw new Error("At least one image is required");
    }

    const newVariant = await VariantProductModel.create(variant);
    const imagePromises = images.map((image) =>
      ImageVariantModel.create({
        id_variant: newVariant.id,
        image_url: image.url,
      })
    );

    await Promise.all(imagePromises);

    return newVariant;
  }

}

module.exports = VariantRepository
