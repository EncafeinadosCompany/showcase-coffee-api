const express = require('express');

const UserRepository = require('../../repositories/users/user.repository');
const UserService = require('../../services/users/user.service');
const UserController = require('../../controllers/users/user.controller');

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router
    .get('/', userController.getUsers)
    .get('/:id', userController.getUserById)
    .post('/', userController.createUser)

module.exports = router;
