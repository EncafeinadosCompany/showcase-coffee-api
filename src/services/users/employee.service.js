const EmployeeRepository = require('../../repositories/users/employee.repository');
class EmployeeService {

    constructor(employeeRepository) {
        this.employeeRepository = new EmployeeRepository();
    }

    async getEmployees() {
        try {
            return this.employeeRepository.getEmployees();
        } catch (error) {
            throw error;
        }
    };

    async getEmployeeById(id) {
        try {
            return this.employeeRepository.getEmployeeById(id);
        } catch (error) {
            throw error;
        }
    };

    async createEmployee(employee) {
        try {
            return this.employeeRepository.createEmployee(employee);
        } catch (error) {
            throw error;
        }
    };

}

module.exports = EmployeeService;