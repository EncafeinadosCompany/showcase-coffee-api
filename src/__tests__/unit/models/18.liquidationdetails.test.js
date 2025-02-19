require('../../setup');
const { LiquidationDetailModel } = require('../../../models/payments/liquidationDetail.entity');
const { createTestLiquidation, createTestShopping, createTestShoppingVariant,  createTestSale, createTestSaleVariant } = require('../utils/testHelpers');

describe('🧪 LiquidationDetailModel - Database Model Tests', () => {
    let liquidationDetailData;

    beforeEach(async () => {

        const liquidation = await createTestLiquidation();
        const shopping = await createTestShopping();
        const shoppingVariant = await createTestShoppingVariant(shopping.id);
        const sale = await createTestSale();
        const saleVariant = await createTestSaleVariant(sale.id, shoppingVariant.id);

        liquidationDetailData = {
            id_liquidation: liquidation.id,
            id_sales_variant: saleVariant.id,
            amount: 50000
        };
    });

    afterEach(async () => {
        await LiquidationDetailModel.destroy({ where: { id_liquidation: 1 } });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = LiquidationDetailModel.getAttributes();

            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('id_liquidation');
            expect(attributes).toHaveProperty('id_sales_variant');
            expect(attributes).toHaveProperty('amount');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new liquidation detail', async () => {
            try {
                const liquidationDetail = await LiquidationDetailModel.create(liquidationDetailData);

                expect(liquidationDetail).toBeDefined();
                expect(liquidationDetail.id).toBeDefined();
                expect(liquidationDetail.amount).toBe(liquidationDetailData.amount);
                expect(liquidationDetail.id_liquidation).toBe(liquidationDetailData.id_liquidation);
                expect(liquidationDetail.id_sales_variant).toBe(liquidationDetailData.id_sales_variant);
            } catch (error) {
                console.error('Error creating liquidation detail:', error);
                throw error;
            }
        });
    });

});