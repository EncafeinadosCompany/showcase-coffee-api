const express = require('express');

const AuthController = require('../../controllers/users/auth.controller');
// const { authenticateJWT } = require('../middlewares/auth.middleware');

const authController = new AuthController();

const router = express.Router();

router
    .post('/', (req, res) => authController.login(req, res));
    
module.exports = router;