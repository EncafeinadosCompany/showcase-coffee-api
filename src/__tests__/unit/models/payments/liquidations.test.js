require('../../../setup');
const { LiquidationModel } = require('../../../../models/payments/liquidations.entity');
const { ProviderModel } = require('../../../../models/companies/provider.entity');
const { DepositModel } = require('../../../../models/payments/deposits.entity');

describe('🧪 LiquidationModel - Database Model Tests', () => {
    let liquidationData;
    let providerData;
    let depositData;

    beforeEach(() => {
        providerData = {
            name: 'Test Provider',
            nit: '900200345-1',
            email: 'test@provider.com',
            phone: '1234567890',
            address: 'Test Address',
            status: true
        };

        liquidationData = {
            current_debt: 1000.00,
            status: true,
            id_provider: 1
        };

        depositData = {
            date: new Date(),
            amount: 500.00,
            type_payment: 'Transferencia',
            voucher: '123456789',
            status: true
        };
    });

    afterEach(async () => {
        await DepositModel.destroy({ where: {} });
        await LiquidationModel.destroy({ where: {} });
        await ProviderModel.destroy({ where: {} });
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
                const provider = await ProviderModel.create(providerData);
                
                const liquidation = await LiquidationModel.create({
                    ...liquidationData,
                    id_provider: provider.id
                });

                expect(liquidation).toBeDefined();
                expect(liquidation.id).toBeDefined();
                expect(liquidation.current_debt).toBe(liquidationData.current_debt);
                expect(liquidation.status).toBe(liquidationData.status);
                expect(liquidation.id_provider).toBe(provider.id);
            } catch (error) {
                console.error('Error creating liquidation:', error);
                throw error;
            }
        });
    });

    describe('🔗 Model Associations', () => {
        test('should have associations with DepositModel and ProviderModel', () => {
            const associations = LiquidationModel.associations;
            
            expect(associations).toHaveProperty('deposits');
            expect(associations).toHaveProperty('provider');
        });

        test('should create a liquidation with deposits', async () => {
            try {
                const provider = await ProviderModel.create(providerData);
                
                const liquidation = await LiquidationModel.create({
                    ...liquidationData,
                    id_provider: provider.id
                });

                await DepositModel.create({
                    ...depositData,
                    id_liquidation: liquidation.id
                });

                const liquidationWithDeposits = await LiquidationModel.findOne({
                    where: { id: liquidation.id },
                    include: [
                        { model: DepositModel, as: 'deposits' },
                        { model: ProviderModel, as: 'provider' }
                    ]
                });

                expect(liquidationWithDeposits).toBeDefined();
                expect(liquidationWithDeposits.deposits).toHaveLength(1);
                expect(liquidationWithDeposits.provider.id).toBe(provider.id);
            } catch (error) {
                console.error('Error creating liquidation with deposits:', error);
                throw error;
            }
        });
    });
});