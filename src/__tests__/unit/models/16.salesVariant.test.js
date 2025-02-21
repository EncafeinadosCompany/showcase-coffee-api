require('../../setup');
const { SalesVariantModel } = require('../../../models/transactions/salesVariant.entity');
const { createTestSale, createTestShopping, createTestShoppingVariant } = require('../utils/testHelpers');

describe('🧪 SalesVariantModel - Database Model Tests', () => {
    let salesVariantData;

    beforeEach(async () => {
        const sale = await createTestSale();
        const shopping = await createTestShopping();
        const shoppingVariant = await createTestShoppingVariant(shopping.id);

        salesVariantData = {
            id_sale: sale.id,
            id_shopping_variant:shoppingVariant.id,
            id_variant_products:1,
            quantity: 5,
            subtotal: 50000,
            status: true
        };
    });

    afterEach(async () => {
        await SalesVariantModel.destroy({ where: {  subtotal: 50000 } });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = SalesVariantModel.getAttributes();
            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('id_sale');
            expect(attributes).toHaveProperty('id_variant_products');
            expect(attributes).toHaveProperty('quantity');
            expect(attributes).toHaveProperty('subtotal');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new sales variant', async () => {
            try {
                const salesVariant = await SalesVariantModel.create(salesVariantData);

                expect(salesVariant).toBeDefined();
                expect(salesVariant.id).toBeDefined();
                expect(salesVariant.id_sale).toBe(salesVariantData.id_sale);
                expect(salesVariant.id_variant_products).toBe(salesVariantData.id_variant_products);
                expect(salesVariant.quantity).toBe(salesVariantData.quantity);
                expect(salesVariant.subtotal).toBe(salesVariantData.subtotal);
                expect(salesVariant.status).toBe(salesVariantData.status);
            } catch (error) {
                console.error('Error creating sales variant:', error);
                throw error;
            }
        });
    });
});