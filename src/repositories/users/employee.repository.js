const { EmployeeModel } = require('../../models/users/employees.entity');

class EmployeesRepository {

    constructor() { }

    async getEmployees() {
        return await EmployeeModel.findAll();
    }

    async getEmployeeById(id) {
        return await EmployeeModel.findByPk(id);
    }

    getEmployeeByUserId(id_user) {
        return EmployeeModel.findOne({
            where: { id_user }
        });
    }

    async createEmployee(employee) {
        const newEmployee = await EmployeeModel.create(employee);
        return newEmployee;
    }

}

module.exports = EmployeesRepository