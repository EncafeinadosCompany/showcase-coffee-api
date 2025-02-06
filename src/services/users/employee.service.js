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

    async createEmployee(data) {
        try {
            const email = data.email;
            const role = data.id_role;
            const password = await this.userService.createPassword(data.name);

            const user = await this.userService.createUser({ id_role: role, email: email, password: password });
            
            const employeeFinal = {
                ...data,
                id_user: user.id,
            };

            const employee = this.employeeRepository.createEmployee(employeeFinal);

            await this.userService.sendEmail(email, password);

            return employee;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = EmployeeService;