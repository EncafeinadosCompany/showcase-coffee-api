const RoleService = require('../../services/users/role.service');

class RoleController {

    constructor() {
        this.roleService = new RoleService();
    }
    
     getRoles = async(req, res) =>{
        try {
            const roles = await this.roleService.getRoles();
            if (!roles) {
                return res.status(404).json({ message: 'Roles not found' });
            }
            return res.status(200).json(roles);
        } catch (error) {
            console.error('Error getting roles:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    async getRoleById(req, res) {
        try {
            const { id } = req.params
            const role = await this.roleService.getRoleById(id);

            if (!role) {
                return res.status(404).json({ message: 'Rol not found' });
            }

            return res.status(200).json(role);
        } catch (error) {
            console.error('Error getting rol:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    async createRole(req, res) {
        try {
            const role = req.body
            const newRole = await this.roleService.createRole(role);

            return res.status(201).json(newRole);
        } catch (error) {
            console.error('Error creating rol:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

}

module.exports = RoleController;