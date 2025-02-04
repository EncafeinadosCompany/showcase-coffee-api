

const {ProductModel} = require('../../models/products/products.entity')
const {BrandModel} = require('../../models/products/brands.entity')
const {AttributeModel} = require('../../models/products/attribute.entity')
const {VariantProductModel} = require('../../models/products/variantsProducts.entity')


class ProductRepository {
  constructor() {}
  async getAll() {
    const products = await ProductModel.findAll({
      attributes: ['id', 'name','status'],
      include: [
        {
          model:BrandModel,
          as: "brand",
          attributes: ['name','description', 'id'], 
        },
        {
          model:AttributeModel, 
          attributes: ['description', 'id'],
          as: "attributes",
          through: {
            attributes: ['valor']
          }
        },
        {
          model:VariantProductModel,
          as: "variants",
          attributes: ['id', 'id_product', 'grammage', 'stock', 'roasting_date','shopping_price','sale_price']
        }
      ],
    });
    return products;
  }

  async getById(id) {
    const product = await ProductModel.findByPk(id, {
      attributes: ['id', 'name','status'],
      include: [
        {
          model:BrandModel,
          as: "brand",
          attributes: ['name', 'description', 'id'], 
        },
        {
          model:AttributeModel, 
          attributes: ['description', 'id'],
          as: "attributes",
          through: {
            attributes: ['valor']
          }
        },
        {
          model:VariantProductModel,
          as: "variants",
          attributes: ['id', 'grammage', 'stock', 'roasting_date','shopping_price','sale_price']
        }
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
