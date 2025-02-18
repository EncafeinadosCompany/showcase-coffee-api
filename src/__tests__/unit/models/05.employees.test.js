require('../../setup');
const { sequelize } = require('../../../config/connection');
const { EmployeeModel } = require('../../../models/users/employees.entity');


describe('🧪 EmployeeModel - Database Model Tests', () => {
    let employeeData;

    beforeEach(() => {
        // Datos de prueba
        employeeData = {
            identification: '123456789',
            name: 'John',
            last_name: 'Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            type: 'store',
            status: true,
            id_user: 1,
            id_store: 1,
            created_at: new Date(),
            updated_at: new Date()
        };
    });

    test('should create a new employee', async () => {
        const employee = await EmployeeModel.create(employeeData);

        expect(employee).toBeDefined();
        expect(employee.id).toBeDefined();
        expect(employee.identification).toBe(employeeData.identification);
        expect(employee.name).toBe(employeeData.name);
        expect(employee.last_name).toBe(employeeData.last_name);
        expect(employee.phone).toBe(employeeData.phone);
        expect(employee.email).toBe(employeeData.email);
        expect(employee.type).toBe(employeeData.type);
        expect(employee.status).toBe(employeeData.status);
        expect(employee.id_user).toBe(employeeData.id_user);
        expect(employee.id_store).toBe(employeeData.id_store);
        expect(employee.created_at).toEqual(employeeData.created_at);
        expect(employee.updated_at).toEqual(employeeData.updated_at);
    });
});
