const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../../models/users/users.entity");

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
    
    constructor(EmployeeRepository) {
        this.employeeRepository = EmployeeRepository;
    }

    async login(email, password) {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            const error = new Error("The user does not exist");
            error.statusCode = 404;
            throw error;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }
        console.log("user", user.id);
        const employee = await this.employeeRepository.getEmployeeByUserId(user.id);

        console.log("employee", employee);
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.id_role },
            SECRET_KEY,
            { expiresIn: "10h" }
        );

        return { success: true, message: "Successful login", token, user, employee: employee ? employee : null };
    }
}

module.exports = AuthService;
