require('../../setup');
const { DepositModel } = require('../../../models/payments/deposits.entity');
const { createTestLiquidation, cleanupTestData } = require('../utils/testHelpers');

describe('🧪 DepositModel - Database Model Tests', () => {
    let depositData;
    
    beforeEach(async () => {
     const liquidation = await createTestLiquidation();
        
        depositData = {
            date: new Date(),
            amount: 10000,
            type_payment: 'Transferencia',
            voucher: '123456789',
            status: true,
            id_liquidation: liquidation.id
        };
    });

    afterEach(async () => {
        await DepositModel.destroy({ where: {  id_liquidation: 1 } });
        await cleanupTestData();
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
                
                const deposit = await DepositModel.create(depositData);

                expect(deposit).toBeDefined();
                expect(deposit.id).toBeDefined();
                expect(deposit.amount).toBe(depositData.amount);
                expect(deposit.type_payment).toBe(depositData.type_payment);
                expect(deposit.status).toBe(depositData.status);
                expect(deposit.id_liquidation).toBe(depositData.id_liquidation);
            } catch (error) {
                console.error('Error creating deposit:', error);
                throw error;
            }
        });

        test('should not create deposit without required fields', async () => {
            try {
                await DepositModel.create({
                    date: new Date(),
                });
                fail('Should not create deposit without required fields');
            } catch (error) {
                expect(error.name).toBe('SequelizeValidationError');
            }
        });
    });

});