const {productSchema, ProductModel} = require('./products/products.entity')
const {brandSchema, BrandModel} = require('./products/brands.entity')
const {variantProductScrema, VariantProductModel} = require('./products/variantsProducts.entity')
const {attributeSchema, AttributeModel} = require('./products/attribute.entity')
const {attributeProductSchema, AttributeProductModel} = require('./products/attributesProducts.entity')
const setupModels = (sequelize) => {
    console.log('Setting up models')

    //Products
    ProductModel.init(productSchema, ProductModel.config(sequelize))
    BrandModel.init(brandSchema, BrandModel.config(sequelize))
    VariantProductModel.init(variantProductScrema, VariantProductModel.config(sequelize))
    AttributeModel.init(attributeSchema, AttributeModel.config(sequelize))
    AttributeProductModel.init(attributeProductSchema, AttributeProductModel.config(sequelize))


    ProductModel.associate(sequelize.models)
    BrandModel.associate(sequelize.models)
    VariantProductModel.associate(sequelize.models)
    AttributeModel.associate(sequelize.models)
}

module.exports = setupModels