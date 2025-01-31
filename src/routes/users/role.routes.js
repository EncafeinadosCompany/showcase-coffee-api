const RoleController = require('../../controllers/users/role.controller');

const router = require('express').Router();

const roleController = new RoleController();

router
    .get('/', (req, res) => roleController.getRoles(req, res))
    .get('/:id', (req, res) => roleController.getRoleById(req, res))
    .post('/', (req, res) => roleController.createRole(req, res))

module.exports = router;