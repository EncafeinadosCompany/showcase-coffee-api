const { RoleModel, roleSchema } = require('./users/roles.entity');
const { UserModel, userSchema } = require('./users/users.entity');

const { ProviderModel, providerSchema } = require('./providers/provider.entity');
const { StoreModel, storeSchema } = require('./stores/store.entity');
const { EmployeeModel, employeeSchema } = require('./users/employees.entity');

const { ProductModel, productSchema } = require('./products/products.entity');
const { BrandModel, brandSchema } = require('./products/brands.entity');
const { AttributeModel, attributeSchema } = require('./products/attribute.entity');
const { AttributeProductModel, attributeSchema} = require('./products/attributesProducts.entity')

const { VariantProductModel, variantProductSchema } = require('./products/variantsProducts.entity');
const { Product_providerModel, productProviderSchema } = require('./providers/products_providers.entity');

const { SalesModel, saleSchema } = require('./sales/sales.entity');
const { SalesVariantModel, saleVariantSchema } = require('./sales/salesVariant.entity');
const { ShoppingsModel, shoppingSchema } = require('./shoppings/shoppings.entity');
const { ShoppingVariantModel, shoppingVariantSchema } = require('./shoppings/shoppingVariant.entity');

const { LiquidationModel, liquidationSchema } = require('./payments/liquidations.entity');
const { DepositModel, depositSchema } = require('./payments/deposits.entity'); 


const setupModels = (sequelize) => {

    RoleModel.init(roleSchema, RoleModel.config(sequelize));
    UserModel.init(userSchema, UserModel.config(sequelize));

    ProviderModel.init(providerSchema, ProviderModel.config(sequelize));
    StoreModel.init(storeSchema, StoreModel.config(sequelize));
    EmployeeModel.init(employeeSchema, EmployeeModel.config(sequelize));

    ProductModel.init(productSchema, ProductModel.config(sequelize));
    BrandModel.init(brandSchema, BrandModel.config(sequelize));
    AttributeModel.init(attributeSchema, AttributeModel.config(sequelize));

    VariantProductModel.init(variantProductSchema, VariantProductModel.config(sequelize));

    Product_providerModel.init(productProviderSchema, Product_providerModel.config(sequelize));

    ShoppingsModel.init(shoppingSchema, ShoppingsModel.config(sequelize));
    ShoppingVariantModel.init(shoppingVariantSchema, ShoppingVariantModel.config(sequelize));

    LiquidationModel.init(liquidationSchema, LiquidationModel.config(sequelize));
    DepositModel.init(depositSchema, DepositModel.config(sequelize));

    SalesModel.init(saleSchema, SalesModel.config(sequelize));
    SalesVariantModel.init(saleVariantSchema, SalesVariantModel.config(sequelize));

    
    
    // Relationships
    // BrandModel.associate(sequelize.models)
    // ProductModel.associate(sequelize.models)
    VariantProductModel.associate(sequelize.models)
    AttributeModel.associate(sequelize.models)
    AttributeProductModel.associate(sequelize.models)

    SalesModel.associate(sequelize.models)
    SalesVariantModel.associate(sequelize.models)
}

module.exports = setupModels