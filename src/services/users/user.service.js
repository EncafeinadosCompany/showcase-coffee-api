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

    async createPassword (name) {

        const cleanName = name
        .trim() 
        .replace(/\s+/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') 
        .toLowerCase(); 
    
        const finalName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    
        const nrmd = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
        return `${finalName}${nrmd}.`;
    };
}

module.exports = UserService;
