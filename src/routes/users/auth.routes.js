const express = require('express');

const AuthController = require('../../controllers/users/auth.controller');
const AuthService = require("../../services/users/auth.service");
const EmployeeRepository = require("../../repositories/users/employee.repository");
// const { authenticateJWT } = require('../middlewares/auth.middleware');

const employeeRepository = new EmployeeRepository();
const authService = new AuthService(employeeRepository);
const authController = new AuthController(authService);

const router = express.Router();

router
    .post('/', (req, res) => authController.login(req, res));
    
module.exports = router;