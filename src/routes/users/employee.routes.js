const EmployeeController = require('../../controllers/users/employee.controller');

const router = require('express').Router();

const employeeController = new EmployeeController();

router
    .get('/', (req, res) => employeeController.getEmployees(req, res))
    .get('/:id', (req, res) => employeeController.getEmployeeById(req, res))
    .post('/', (req, res) => employeeController.createEmployee(req, res))

module.exports = router;