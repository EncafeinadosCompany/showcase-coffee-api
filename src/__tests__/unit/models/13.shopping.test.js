require('../../setup');
const { ShoppingModel } = require('../../../models/transactions/shopping.entity');

describe('🧪 ShoppingModel - Database Model Tests', () => {
    let shoppingData;

    beforeEach(() => {
        shoppingData = {
            id_store: 2,
            id_employee: 1,
            date_entry: new Date(),
            status: true
        };
    });

    afterEach(async () => {
        await ShoppingModel.destroy({ where: { id_store: 2 }, force: true }); 
    });
    
    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = ShoppingModel.getAttributes();
            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('id_store');
            expect(attributes).toHaveProperty('id_employee');
            expect(attributes).toHaveProperty('date_entry');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new shopping record', async () => {
            const shopping = await ShoppingModel.create(shoppingData);

            expect(shopping).toBeDefined();
            expect(shopping.id).toBeDefined();
            expect(shopping.id_store).toBe(shoppingData.id_store);
            expect(shopping.id_employee).toBe(shoppingData.id_employee);
            expect(shopping.date_entry).toEqual(shoppingData.date_entry);
            expect(shopping.status).toBe(shoppingData.status);
        });
    });
});
