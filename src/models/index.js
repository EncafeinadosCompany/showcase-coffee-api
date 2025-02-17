const { RoleModel, roleSchema } = require('./users/roles.entity');
const { UserModel, userSchema } = require('./users/users.entity');

const { ProviderModel, providerSchema } = require('./companies/provider.entity');
const { BankAccountModel, bankAccountSchema } = require('./companies/bankAccounts.entity');
const { StoreModel, storeSchema } = require('./companies/store.entity');
const { EmployeeModel, employeeSchema } = require('./users/employees.entity');
const { AllianceModel, storeProviderSchema } = require('./companies/alliances.entity');

const { ProductModel, productSchema } = require('./products/products.entity');
const { BrandModel, brandSchema } = require('./products/brands.entity');
const { AttributeModel, attributeSchema } = require('./products/attribute.entity');
const { AttributeProductModel, attributeProductSchema} = require('./products/attributesProducts.entity')
const { VariantProductModel, variantProductSchema } = require('./products/variantsProducts.entity');

const { ShoppingModel, shoppingSchema } = require('./transactions/shopping.entity');
const { ShoppingVariantModel, shoppingVariantSchema } = require('./transactions/shoppingVariant.entity');
const { SalesModel, saleSchema } = require('./transactions/sales.entity');
const { SalesVariantModel, saleVariantSchema } = require('./transactions/salesVariant.entity');

const { LiquidationModel, liquidationSchema } = require('./payments/liquidations.entity');
const { LiquidationDetailModel, liquidationDetailSchema } = require('./payments/liquidationDetail.entity'); 
const { DepositModel, depositSchema } = require('./payments/deposits.entity'); 

const setupModels = (sequelize) => {

    RoleModel.init(roleSchema, RoleModel.config(sequelize));
    UserModel.init(userSchema, UserModel.config(sequelize));

    ProviderModel.init(providerSchema, ProviderModel.config(sequelize));
    StoreModel.init(storeSchema, StoreModel.config(sequelize));
    EmployeeModel.init(employeeSchema, EmployeeModel.config(sequelize));
    BankAccountModel.init(bankAccountSchema, BankAccountModel.config(sequelize));
    AllianceModel.init(storeProviderSchema, AllianceModel.config(sequelize));

    BrandModel.init(brandSchema, BrandModel.config(sequelize));
    ProductModel.init(productSchema, ProductModel.config(sequelize));
    AttributeModel.init(attributeSchema, AttributeModel.config(sequelize));
    AttributeProductModel.init(attributeProductSchema, AttributeProductModel.config(sequelize));
    VariantProductModel.init(variantProductSchema, VariantProductModel.config(sequelize));

    ShoppingModel.init(shoppingSchema, ShoppingModel.config(sequelize));
    ShoppingVariantModel.init(shoppingVariantSchema, ShoppingVariantModel.config(sequelize));

    SalesModel.init(saleSchema, SalesModel.config(sequelize));
    SalesVariantModel.init(saleVariantSchema, SalesVariantModel.config(sequelize));

    LiquidationModel.init(liquidationSchema, LiquidationModel.config(sequelize));
    LiquidationDetailModel.init(liquidationDetailSchema, LiquidationDetailModel.config(sequelize));
    DepositModel.init(depositSchema, DepositModel.config(sequelize));

    
    // Relationships
    RoleModel.associate(sequelize.models)
    UserModel.associate(sequelize.models)

    ProviderModel.associate(sequelize.models)
    StoreModel.associate(sequelize.models)
    EmployeeModel.associate(sequelize.models)
    BankAccountModel.associate(sequelize.models)
    AllianceModel.associate(sequelize.models)

    BrandModel.associate(sequelize.models)
    ProductModel.associate(sequelize.models)
    AttributeModel.associate(sequelize.models)
    AttributeProductModel.associate(sequelize.models)
    VariantProductModel.associate(sequelize.models)

    SalesModel.associate(sequelize.models)
    SalesVariantModel.associate(sequelize.models)

    ShoppingModel.associate(sequelize.models)
    ShoppingVariantModel.associate(sequelize.models)

    LiquidationModel.associate(sequelize.models)
    LiquidationDetailModel.associate(sequelize.models)
    DepositModel.associate(sequelize.models)
}

module.exports = setupModels