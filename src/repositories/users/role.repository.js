const { RoleModel } = require('../../models');

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