require('../../setup');
const { LiquidationDetailModel } = require('../../../models/payments/liquidationDetail.entity');
const { LiquidationModel } = require('../../../models/payments/liquidations.entity');
const { SalesVariantModel } = require('../../../models/transactions/salesVariant.entity');

describe('🧪 LiquidationDetailModel - Database Model Tests', () => {
    let liquidationDetailData;
    let liquidationData;
    let salesVariantData;

    beforeEach(() => {
        liquidationData = {
            current_debt: 1000.00,
            status: true,
            id_provider: 1
        };

        salesVariantData = {
            // Add sample data for SalesVariant according to your model
            quantity: 5,
            price: 100.00,
            status: true
        };

        liquidationDetailData = {
            amount: 500.00
        };
    });

    afterEach(async () => {
        await LiquidationDetailModel.destroy({ where: {} });
        await LiquidationModel.destroy({ where: {} });
        await SalesVariantModel.destroy({ where: {} });
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
                const liquidation = await LiquidationModel.create(liquidationData);
                const salesVariant = await SalesVariantModel.create(salesVariantData);

                const liquidationDetail = await LiquidationDetailModel.create({
                    ...liquidationDetailData,
                    id_liquidation: liquidation.id,
                    id_sales_variant: salesVariant.id
                });

                expect(liquidationDetail).toBeDefined();
                expect(liquidationDetail.id).toBeDefined();
                expect(liquidationDetail.amount).toBe(liquidationDetailData.amount);
                expect(liquidationDetail.id_liquidation).toBe(liquidation.id);
                expect(liquidationDetail.id_sales_variant).toBe(salesVariant.id);
            } catch (error) {
                console.error('Error creating liquidation detail:', error);
                throw error;
            }
        });
    });

    describe('🔗 Model Associations', () => {
        test('should have associations with LiquidationModel and SalesVariantModel', () => {
            const associations = LiquidationDetailModel.associations;
            
            expect(associations).toHaveProperty('liquidation');
            expect(associations).toHaveProperty('salesVariant');
        });

        test('should create a liquidation detail with associations', async () => {
            try {
                const liquidation = await LiquidationModel.create(liquidationData);
                const salesVariant = await SalesVariantModel.create(salesVariantData);

                const liquidationDetail = await LiquidationDetailModel.create({
                    ...liquidationDetailData,
                    id_liquidation: liquidation.id,
                    id_sales_variant: salesVariant.id
                });

                const detailWithAssociations = await LiquidationDetailModel.findOne({
                    where: { id: liquidationDetail.id },
                    include: [
                        { model: LiquidationModel, as: 'liquidation' },
                        { model: SalesVariantModel, as: 'salesVariant' }
                    ]
                });

                expect(detailWithAssociations).toBeDefined();
                expect(detailWithAssociations.liquidation.id).toBe(liquidation.id);
                expect(detailWithAssociations.salesVariant.id).toBe(salesVariant.id);
            } catch (error) {
                console.error('Error creating liquidation detail with associations:', error);
                throw error;
            }
        });
    });
});