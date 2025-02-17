require('../../../setup');
const { RoleModel } = require('../../../../models/users/roles.entity');

describe('🧪 RoleModel - Database Model Tests', () => {
    let roleData;

    beforeEach(() => {
        // Sample role data for tests
        roleData = {
            name: 'Admin',
            status: true
        };
    });

    afterEach(async () => {
        await RoleModel.destroy({ where: { name: 'Admin' } });
    });

    describe('🔹 Model Definition', () => {
        test('should have the correct schema', () => {
            const attributes = RoleModel.getAttributes();
            expect(attributes).toHaveProperty('id');
            expect(attributes).toHaveProperty('name');
            expect(attributes).toHaveProperty('status');
            expect(attributes).toHaveProperty('created_at');
            expect(attributes).toHaveProperty('updated_at');
        });
    });

    describe('📝 Model Creation', () => {
        test('should create a new role', async () => {
            try {
                const role = await RoleModel.create(roleData);

                expect(role).toBeDefined();
                expect(role.id).toBeDefined();
                expect(role.name).toBe(roleData.name);
                expect(role.status).toBe(roleData.status);
            } catch (error) {
                console.error('Error creating role:', error);
                throw error;
            }
        });
    });
});
