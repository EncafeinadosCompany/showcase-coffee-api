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