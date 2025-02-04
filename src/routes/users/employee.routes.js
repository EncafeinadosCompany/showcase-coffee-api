const EmployeeRepository = require('../../repositories/users/employee.repository');
const EmployeeController = require('../../controllers/users/employee.controller');
const EmployeeService = require('../../services/users/employee.service');

const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

const router = require('express').Router();

router
    .get('/', (req, res) => employeeController.getEmployees(req, res))
    .get('/:id', (req, res) => employeeController.getEmployeeById(req, res))
    .post('/', (req, res) => employeeController.createEmployee(req, res))

module.exports = router;