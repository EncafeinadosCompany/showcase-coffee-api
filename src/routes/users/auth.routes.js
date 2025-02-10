const EmployeeRepository = require("../../repositories/users/employee.repository");
const AuthController = require('../../controllers/users/auth.controller');
const AuthService = require("../../services/users/auth.service");

const employeeRepository = new EmployeeRepository();
const authService = new AuthService(employeeRepository);
const authController = new AuthController(authService);

const router = require('express').Router();

router
    .post('/', (req, res) => authController.login(req, res));
    
module.exports = router;