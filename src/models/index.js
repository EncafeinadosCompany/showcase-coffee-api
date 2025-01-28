const {productSchema, ProductModel, PRODUCTS_TABLE } = require('./products/products.entity')
const {brandSchema, BrandModel, BRANDS_TABLE} = require('./products/brands.entity')
const {variantProductScrema, VariantProductModel, VARIANTS_PRODUCTS_TABLE} = require('./products/variantsProducts.entity')


const setupModels = (sequelize) => {
    console.log('Setting up models')

    //Products
    ProductModel.init(productSchema, ProductModel.config(sequelize))
    BrandModel.init(brandSchema, BrandModel.config(sequelize))
    VariantProductModel.init(variantProductScrema, VariantProductModel.config(sequelize))
}

module.exports = setupModels