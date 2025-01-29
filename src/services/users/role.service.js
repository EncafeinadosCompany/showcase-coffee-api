class RoleService {

    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }

    async getRoles() {
        try {
            return await this.roleRepository.getRoles();
        } catch (error) {
            throw new Error(error);
        }
    };

    async getRoleById(id) {
        try {
            return await this.roleRepository.getRoleById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    async createRole(role) {
        try {
            const roleExists = await this.roleRepository.getRoleByName(role.name);
            if (roleExists) {
                throw new Error('Role already exists');
            }
            return this.roleRepository.createRole(role);

        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = RoleService;