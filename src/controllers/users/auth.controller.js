
class AuthController {
    
    constructor(AuthService) {
        this.authService = AuthService;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password required" });
            }
            const result = await this.authService.login(email, password);
            return res.status(200).json(result);
        } catch (error) {
            if (error.statusCode) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = AuthController;
