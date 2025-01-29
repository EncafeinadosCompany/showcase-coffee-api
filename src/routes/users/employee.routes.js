const express = require('express');

const EmployeeRepository = require('../../repositories/users/employee.repository');
const EmployeeService = require('../../services/users/employee.service');
const EmployeeController = require('../../controllers/users/employee.controller');

const router = express.Router();

const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

router
    .get('/', employeeController.getEmployees)
    .get('/:id', employeeController.getEmployeeById)
    .post('/', employeeController.createEmployee)

module.exports = router;