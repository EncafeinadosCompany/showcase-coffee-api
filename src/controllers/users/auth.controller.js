const AuthService = require("../../services/users/auth.service");

class AuthController {
    
    constructor() {
        this.authService = new AuthService();
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }
            const result = await authService.login(email, password);
            return res.status(200).json(result);
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Server Error" });
        }
    }

}

module.exports = AuthController;
