require('../../../setup');
const { DepositModel } = require('../../../../models/payments/deposits.entity');
const { LiquidationModel } = require('../../../../models/payments/liquidations.entity');

describe('🧪 DepositModel - Database Model Tests', () => {
    let depositData;
    let liquidationData;

    beforeEach(() => {
        // Sample data for tests
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
            status: true,
            id_liquidation: 1
        };
    });

    afterEach(async () => {
        // Clean database after each test
        await DepositModel.destroy({ where: {} });
        await LiquidationModel.destroy({ where: {} });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = DepositModel.getAttributes();

            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('date');
            expect(attributes).toHaveProperty('amount');
            expect(attributes).toHaveProperty('type_payment');
            expect(attributes).toHaveProperty('voucher');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('id_liquidation');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new deposit', async () => {
            try {
                // Create a liquidation first
                const liquidation = await LiquidationModel.create(liquidationData);
                
                const deposit = await DepositModel.create({
                    ...depositData,
                    id_liquidation: liquidation.id
                });

                expect(deposit).toBeDefined();
                expect(deposit.id).toBeDefined();
                expect(deposit.amount).toBe(depositData.amount);
                expect(deposit.type_payment).toBe(depositData.type_payment);
                expect(deposit.status).toBe(depositData.status);
                expect(deposit.id_liquidation).toBe(liquidation.id);
            } catch (error) {
                console.error('Error creating deposit:', error);
                throw error;
            }
        });

        test('should not create deposit without required fields', async () => {
            try {
                await DepositModel.create({
                    date: new Date()
                    // Missing required fields
                });
                fail('Should not create deposit without required fields');
            } catch (error) {
                expect(error.name).toBe('SequelizeValidationError');
            }
        });
    });

    describe('🔗 Model Associations', () => {
        test('should have association with LiquidationModel', () => {
            const associations = DepositModel.associations;
            expect(associations).toHaveProperty('liquidations');
        });

        test('should create a deposit with liquidation association', async () => {
            try {
                const liquidation = await LiquidationModel.create(liquidationData);
                
                const deposit = await DepositModel.create({
                    ...depositData,
                    id_liquidation: liquidation.id
                });

                const depositWithLiquidation = await DepositModel.findOne({
                    where: { id: deposit.id },
                    include: [{ model: LiquidationModel, as: 'liquidations' }]
                });

                expect(depositWithLiquidation).toBeDefined();
                expect(depositWithLiquidation.liquidations).toBeDefined();
                expect(depositWithLiquidation.liquidations.id).toBe(liquidation.id);
            } catch (error) {
                console.error('Error creating deposit with liquidation:', error);
                throw error;
            }
        });
    });
});