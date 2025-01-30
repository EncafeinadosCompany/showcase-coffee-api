const EmployeeService = require('../../services/users/employee.service');

class EmployeeController {

    constructor() {
        this.employeeService = new EmployeeService();
    }

  async getEmployees(req, res) {
    try {
      const employees = await this.employeeService.getEmployees();
      if (!employees) {
        return res.status(404).json({ message: 'Employees not found' });
      }
      return res.status(200).json(employees);
    } catch (error) {
      console.error('Error getting employees:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

    async getEmployeeById(req, res) {
        try {
        const { id } = req.params;
        const employee = await this.employeeService.getEmployeeById(id);
    
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found'});
        }
    
        return res.status(200).json(employee);
        } catch (error) {
        console.error('Error getting employee:', error);
        return res.status(500).json({ message: 'Internal server error' });
        }
    };

    async createEmployee(req, res) {
        try {
        const employee = req.body;
        const newEmployee = await this.employeeService.createEmployee(employee);
    
        return res.status(201).json(newEmployee);
        } catch (error) {
        console.error('Error creating employee:', error);
        return res.status(500).json({ message: 'Internal server error' });
        }
    };
}

module.exports = EmployeeController;