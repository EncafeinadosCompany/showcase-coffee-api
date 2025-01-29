const {productSchema, ProductModel} = require('./products/products.entity')
const {brandSchema, BrandModel} = require('./products/brands.entity')
const {variantProductScrema, VariantProductModel} = require('./products/variantsProducts.entity')
const {attributeSchema, AttributeModel} = require('./products/attribute.entity')
const {attributeProductSchema, AttributeProductModel} = require('./products/attributesProducts.entity')
const {productProviderSchema, Product_providerModel, PRODUCT_PROVIDER_TABLE} = require('./providers/products_providers.entity')
const {providerSchema, ProviderModel, PROVIDER_TABLE} = require('./providers/provider.entity')
const {storeSchema, StoreModel, STORE_TABLE} = require('./stores/store.entity')
const setupModels = (sequelize) => {
    console.log('Setting up models')

    //Products
    BrandModel.init(brandSchema, BrandModel.config(sequelize))
    ProductModel.init(productSchema, ProductModel.config(sequelize))
    VariantProductModel.init(variantProductScrema, VariantProductModel.config(sequelize))
    StoreModel.init(storeSchema, StoreModel.config(sequelize))
    ProviderModel.init(providerSchema, ProviderModel.config(sequelize))
    Product_providerModel.init(productProviderSchema, Product_providerModel.config(sequelize))
    AttributeModel.init(attributeSchema, AttributeModel.config(sequelize))
    AttributeProductModel.init(attributeProductSchema, AttributeProductModel.config(sequelize))

    BrandModel.associate(sequelize.models)
    ProductModel.associate(sequelize.models)
    VariantProductModel.associate(sequelize.models)
    AttributeModel.associate(sequelize.models)
}

module.exports = setupModels