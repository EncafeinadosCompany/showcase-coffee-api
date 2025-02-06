const EmployeeRepository = require('../../repositories/users/employee.repository');
const EmployeeController = require('../../controllers/users/employee.controller');
const UserRepository = require('../../repositories/users/user.repository');
const EmployeeService = require('../../services/users/employee.service');
const UserService = require('../../services/users/user.service');

const { authenticateJWT } = require('../../middlewares/auth.middleware');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository, userService);
const employeeController = new EmployeeController(employeeService);

const router = require('express').Router();

router
    .get('/', (req, res) => employeeController.getEmployees(req, res))
    .get('/:id', (req, res) => employeeController.getEmployeeById(req, res))
    .post('/', (req, res) => employeeController.createEmployee(req, res))

module.exports = router;