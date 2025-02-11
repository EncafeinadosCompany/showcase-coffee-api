class UserController {

    constructor(UserService) {
        this.userService = UserService;
    }

    async getUsers(req, res) {
        try {
            const users = await this.userService.getUsers();

            if (!users) return res.status(404).json({ message: 'Users not found' });

            return res.status(200).json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    async getUserById(req, res) {
        try {
            const { id } = req.params
            const user = await this.userService.getUserById(id);

            if (!user) return res.status(404).json({ message: 'User not found' });

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    async createUser(req, res) {
        try {
            const userData = req.body
            const user = await this.userService.createUser(userData);

            return res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

}

module.exports = UserController 