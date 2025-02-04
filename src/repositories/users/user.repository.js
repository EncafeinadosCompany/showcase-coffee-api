const { UserModel } = require('../../models/users/users.entity');

class UsersRepository {

    constructor() {}

    async getUsers() {
        return await UserModel.findAll();
    }

    async getUserById(id) {
        return await UserModel.findByPk(id);
    }

    async createUser(user) {
        return await UserModel.create(user);
    }

}

module.exports = UsersRepository