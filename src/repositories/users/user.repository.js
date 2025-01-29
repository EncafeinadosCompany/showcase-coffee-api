const { UserModel } = require('../../models');

class UsersRepository {

    constructor() {}

    async getUsers() {
        return await UserModel.findAll();
    }

    async getUserById(id) {
        return await UserModel.findByPk(id);
    }

    async createUser(user) {
        const newUser = await UserModel.create(user);
        return newUser;
    }

}

module.exports = UsersRepository