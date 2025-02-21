const { ProductModel } = require('../../models/products/products.entity')
const { BrandModel } = require('../../models/products/brands.entity')
const { AttributeModel } = require('../../models/products/attribute.entity')
const { VariantProductModel } = require('../../models/products/variantsProducts.entity')

class ProductRepository {
  constructor() { }
  async getAll() {
    const products = await ProductModel.findAll({
      attributes: ['id', 'name', 'status', 'image_url'],
      include: [
        {
          model: BrandModel,
          as: "brand",
          attributes: ['name', 'description', 'id'],
        },
        {
          model: AttributeModel,
          attributes: ['description', 'id'],
          as: "attributes",
          through: {
            as: 'attributes_products',
            attributes: ['value']
          }
        },

        {
          model: VariantProductModel,
          as: "product",
          attributes: ['id', 'id_product', 'grammage', 'stock']
        }
      ],
    });
    return products;
  }

  async getById(id) {
    const product = await ProductModel.findByPk(id, {
      attributes: ['id', 'name', 'status', 'image_url'],
      include: [
        {
          model: BrandModel,
          as: "brand",
          attributes: ['name', 'description', 'id'],
        },
        {
          model: AttributeModel,
          attributes: ['description', 'id'],
          as: "attributes",
          through: {
            as: 'attributes_products',
            attributes: ['value']
          }
        },
        {
          model: VariantProductModel,
          as: "product",
          attributes: ['id', 'grammage', 'stock']
        }
      ],
    });
    return !product ? null : product;
  }

  async create(product) {
    const newProduct = await ProductModel.create(product);
    return newProduct;
  }

  async updateImage(id, image_url) {
    try {

      const productImage = await ProductModel.findByPk(id);

      if (!productImage) throw new Error("product undefined")

      await productImage.update({ image_url });

      return image_url

    } catch (error) {
      throw error;
    }
  }



}

module.exports = ProductRepository;
