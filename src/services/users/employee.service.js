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

    async getEmployeeByProvider(id_provider) {
        try{
            return this.employeeRepository.getEmployeeByProvider(id_provider);
        }catch(error){
            throw error;
        }
    }

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

            const employee = await this.employeeRepository.createEmployee(employeeFinal);

            this.userService.sendEmail(email, password).catch(error => {
                console.error('Error sending email:', error);
            });

            return employee;
        } catch (error) {
            throw error;
        }
    };

}

module.exports = EmployeeService;