require('../../setup');
const { LiquidationModel } = require('../../../models/payments/liquidations.entity');
const { ProviderModel } = require('../../../models/companies/provider.entity');
const { DepositModel } = require('../../../models/payments/deposits.entity');

describe('🧪 LiquidationModel - Database Model Tests', () => {
    let liquidationData;

    beforeEach(() => {

        liquidationData = {
            current_debt: 25000,
            status: true,
            id_provider: 1
        };

    });

    afterEach(async () => {
        await LiquidationModel.destroy({ where: {  id_provider: 1 } });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = LiquidationModel.getAttributes();

            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('current_debt');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('id_provider');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new liquidation', async () => {
            try {

                const liquidation = await LiquidationModel.create(liquidationData);

                expect(liquidation).toBeDefined();
                expect(liquidation.id).toBeDefined();
                expect(liquidation.current_debt).toBe(liquidationData.current_debt);
                expect(liquidation.status).toBe(liquidationData.status);
                expect(liquidation.id_provider).toBe(liquidationData.id_provider);
            } catch (error) {
                console.error('Error creating liquidation:', error);
                throw error;
            }
        });
    });

});