const { EmployeeModel } = require('../../models');

class EmployeesRepository {
    
    constructor() {}

    async getEmployees() {
        return await EmployeeModel.findAll();
    }

    async getEmployeeById(id) {
        return await EmployeeModel.findByPk(id);
    }

    async createEmployee(employee) {
        const newEmployee = await EmployeeModel.create(employee);
        return newEmployee;
    }

}

module.exports = EmployeesRepository