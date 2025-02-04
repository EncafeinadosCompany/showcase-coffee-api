class EmployeeService {

    constructor(EmployeeRepository, UserService) {
        this.userService = UserService;
        this.employeeRepository = EmployeeRepository;
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
            const email = employee.email;
            const role = employee.id_role;
            const password = await this.userService.createPassword(employee.name);

            const userData = { id_role: role, email: email, password: password };

            const user = await this.userService.createUser(userData);

            const employeeFinal = {
                ...employee,
                id_user: user.id,
            };

            return this.employeeRepository.createEmployee(employeeFinal);
        } catch (error) {
            throw error;
        }
    };

}

module.exports = EmployeeService;