const { ShoppingModel } = require('../../../models/transactions/shopping.entity');
const { ShoppingVariantModel } = require('../../../models/transactions/shoppingVariant.entity');
const { SalesModel } = require('../../../models/transactions/sales.entity');
const { SalesVariantModel } = require('../../../models/transactions/salesVariant.entity');
const { LiquidationModel } = require('../../../models/payments/liquidations.entity');

class TestDataManager {

    static async createTestShopping() {
        return ShoppingModel.create({
            id_store: 2,
            id_employee: 1,
            date_entry: new Date(),
            status: true
        });
    };

    static async createTestShoppingVariant(shoppingId) {
        return ShoppingVariantModel.create({
            id_shopping:shoppingId,
            id_variant_products: 1,
            roasting_date: new Date(),
            quantity: 10,
            shopping_price: 5000,
            sale_price: 10000,
            status: true
        });
    };

    static async createTestSale() {
        return SalesModel.create({
            date: new Date(),
            type_payment: 'Efectivo',
            total: 50000,
            status: true
        });
    };

    static async createTestSaleVariant(saleId, shoppingVariantId) {
        return SalesVariantModel.create({
            id_sale: saleId,
            id_shopping_variant: shoppingVariantId,
            id_variant_products: 1,
            quantity: 5,
            subtotal: 50000,
            status: true
        });
    };

    static async createTestLiquidation() {
        return LiquidationModel.create({
            current_debt: 25000,
            status: true,
            id_provider: 1
        });
    };

    // Clean up test data
    static async cleanupTestData() {
        await ShoppingVariantModel.destroy({ where: { id_shopping: 1 } });
        await ShoppingModel.destroy({ where: { id_store: 2 } });
        await SalesVariantModel.destroy({ where: { id_sale: 1 } });
        await SalesModel.destroy({ where: { total: 50000 } });
        await LiquidationModel.destroy({ where: {  current_debt: 25000 } });
    };

    static async setupTestData() {
        await this.createTestShopping();
        await this.createTestShoppingVariant();
        await this.createTestSale();
        await this.createTestSaleVariant();
        await this.createTestLiquidation();
    }
}

module.exports = TestDataManager;