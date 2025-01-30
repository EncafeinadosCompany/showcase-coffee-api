const { EmployeeModel } = require('../../models/users/employees.entity');

class EmployeesRepository {

    constructor() { }

    async getEmployees() {
        return await EmployeeModel.findAll({
            attributes: {
                exclude: ['employees']
            }
        });
    }

    async getEmployeeById(id) {
        return await EmployeeModel.findByPk(id, {
            attributes: {
                exclude: ['employees']
            }
        });
    }

    async createEmployee(employee) {
        const newEmployee = await EmployeeModel.create(employee);
        return newEmployee;
    }

}

module.exports = EmployeesRepository