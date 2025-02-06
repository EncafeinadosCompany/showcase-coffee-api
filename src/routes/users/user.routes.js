const UserService = require('../../services/users/user.service');
const UserController = require('../../controllers/users/user.controller');
const UserRepository = require('../../repositories/users/user.repository');

const router = require('express').Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService); 

router
    .get('/', (req, res) => userController.getUsers(req, res))
    .get('/:id',(req, res) => userController.getUserById(req, res))
    .post('/', (req, res) => userController.createUser(req, res));

module.exports = router;