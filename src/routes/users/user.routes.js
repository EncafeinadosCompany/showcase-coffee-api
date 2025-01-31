const express = require('express');
const UserController = require('../../controllers/users/user.controller');

const router = express.Router();
const userController = new UserController(); 

router
    .get('/', (req, res) => userController.getUsers(req, res))
    .get('/:id',(req, res) => userController.getUserById(req, res))
    .post('/', (req, res) => userController.createUser(req, res));

module.exports = router;