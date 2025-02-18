const { UserModel } = require('../../../models/users/users.entity');
const { StoreModel } = require('../../../models/companies/store.entity');
const { ProviderModel } = require('../../../models/companies/provider.entity');
const { SalesModel } = require('../../../models/transactions/sales.entity');
const { ShoppingModel } = require('../../../models/transactions/shopping.entity');
const { ShoppingVariantModel } = require('../../../models/transactions/shoppingVariant.entity');
const { VariantProductModel } = require('../../../models/products/variantsProducts.entity');
const { ProductModel } = require('../../../models/products/products.entity');
const { BrandModel } = require('../../../models/products/brands.entity');
const { AttributeModel } = require('../../../models/products/attribute.entity');
const { AttributeProductModel } = require('../../../models/products/attributesProducts.entity');

class TestDataManager {

    // Create a test role
    static async createTestRole() {
        return RoleModel.create({
            id: 1,
            name: 'Test Role'
        });
    }

    // Create a test user
    static async createTestUser() {
        return UserModel.create({
            id: 1,
            email: 'john.doe@example.com',
            password: 'securepassword123',
            id_role: 1
        });
    }

    // Create a test brand
    static async createTestBrand() {
        return BrandModel.create({
            id: 1,
            name: 'Test Brand',
            description: 'Test Brand Description'
        });
    }

    // Create a test product
    static async createTestProduct() {
        await this.createTestBrand(); // Añade await aquí
        return ProductModel.create({
            id: 1,
            name: 'Test Product',
            status: true,
            id_brand: 1
        });
    }

    // Create a test attribute product
    static async createTestAttributeProduct() {
        await this.createTestAttribute(); // Añade await aquí
        return AttributeProductModel.create({
            id: 1,
            value: 'Test Value',
            id_attribute: 1,
            id_product: 1
        });
    }

    // Create a test variant product
    static async createTestVariant() {
        await this.createTestProduct(); // Añade await aquí
        return VariantProductModel.create({
            id: 1,
            grammage: '200g',
            id_product: 1,
            status: true
        });
    }

    // Create a test attribute
    static async createTestAttribute() {
        return AttributeModel.create({
            id: 1,
            description: 'Test Attribute'
        });
    }

    // Create a test store
    static async createTestStore() {
        return StoreModel.create({
            id: 1,
            name: 'Test Store',
            email: 'store@example.com',
            phone: '123-456-7890',
            address: '123 Test St',
            status: true
        });
    }

    // Create a test shopping
    static async createTestShopping() {
        return ShoppingModel.create({
            id: 1,
            id_store: 1,
            id_employee: 1,
            date_entry: new Date(),
            status: true
        });
    }

    // Create a test shopping variant
    static async createTestShoppingVariant() {
        return ShoppingVariantModel.create({
            id_shopping: 1,
            id_variant_products: 1,
            roasting_date: new Date(),
            quantity: 10,
            shopping_price: 500,
            sale_price: 750,
            status: true
        });
    }

    // Clean up test data

    static async cleanupTestData() {
        await ShoppingVariantModel.destroy({ where: { id_shopping: 1 } });
        await ShoppingModel.destroy({ where: { id: 1 } });
        await VariantProductModel.destroy({ where: { id: 1 } });
        await AttributeProductModel.destroy({ where: { id: 1 } });
        await ProductModel.destroy({ where: { id: 1 } });
        await BrandModel.destroy({ where: { id: 1 } });
        await AttributeModel.destroy({ where: { id: 1 } });
        await StoreModel.destroy({ where: { id: 1 } });
        await UserModel.destroy({ where: { id: 1 } });
    }


    // Método para inicializar todos los datos necesarios para una prueba
    static async setupTestData() {
        await this.createTestProduct();
        await this.createTestAttribute();
    }
}

module.exports = TestDataManager;