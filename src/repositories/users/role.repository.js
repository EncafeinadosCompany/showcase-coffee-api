const { RoleModel } = require('../../models/users/roles.entity');

class RolesRepository {
    
    constructor() {}

    async getRoles() {
        return await RoleModel.findAll();
    }

    async getRoleById(id) {
        return await RoleModel.findByPk(id);
    }

    async createRole(role) {
        const newRole = await RoleModel.create(role);
        return newRole;
    }

}

module.exports = RolesRepository