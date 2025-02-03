class UserService {
    
    constructor(UserRepository) {
        this.userRepository = UserRepository;
    };

    async getUsers() {
        try {
            return await this.userRepository.getUsers();
        } catch (error) {
            throw new Error(error);
        }
    };

    async getUserById(id) {
        try {
            return await this.userRepository.getUserById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    async createUser(userData) {
        try {
            return await this.userRepository.createUser(userData);
        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = UserService;
