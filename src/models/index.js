const {productSchema, ProductModel, PRODUCTS_TABLE } = require('./products/products.entity')
const {brandSchema, BrandModel, BRANDS_TABLE} = require('./products/brands.entity')
const {variantProductScrema, VariantProductModel, VARIANTS_PRODUCTS_TABLE} = require('./products/variantsProducts.entity')
const {productProviderSchema, Product_providerModel, PRODUCT_PROVIDER_TABLE} = require('./providers/products_providers.entity')
const {providerSchema, ProviderModel, PROVIDER_TABLE} = require('./providers/provider.entity')
const {storeSchema, StoreModel, STORE_TABLE} = require('./stores/store.entity')


const setupModels = (sequelize) => {
    console.log('Setting up models')

    //Products
    ProductModel.init(productSchema, ProductModel.config(sequelize))
    BrandModel.init(brandSchema, BrandModel.config(sequelize))
    VariantProductModel.init(variantProductScrema, VariantProductModel.config(sequelize))
    Product_providerModel.init(productProviderSchema, Product_providerModel.config(sequelize))
    ProviderModel.init(providerSchema, ProviderModel.config(sequelize))
    StoreModel.init(storeSchema, StoreModel.config(sequelize))
}

module.exports = setupModels