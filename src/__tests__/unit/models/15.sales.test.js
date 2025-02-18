require('../../setup');
const { SalesModel } = require('../../../models/transactions/sales.entity');

describe('🧪 SalesModel - Database Model Tests', () => {
    let salesData;

    beforeEach(() => {
        // Sample sales data for tests
        salesData = {
            date: new Date(),
            type_payment: 'Efectivo',
            total: 100000,
            status: true
        };
    });

    afterEach(async () => {
        await SalesModel.destroy({ where: { date: salesData.date } });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = SalesModel.getAttributes();
            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('date');
            expect(attributes).toHaveProperty('type_payment');
            expect(attributes).toHaveProperty('total');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new sales record', async () => {
            const sale = await SalesModel.create(salesData);

            expect(sale).toBeDefined();
            expect(sale.id).toBeDefined();
            expect(sale.date).toEqual(salesData.date);
            expect(sale.type_payment).toBe(salesData.type_payment);
            expect(sale.total).toBe(salesData.total);
            expect(sale.status).toBe(salesData.status);
        });
    });
});
