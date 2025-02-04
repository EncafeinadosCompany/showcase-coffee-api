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
            const password = await userService.createPassword(employee.name);
            
            const user = await userService.createUser({ id_role: employee.id_rol, email: email, password: password });
    
            employeeFinal = {
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