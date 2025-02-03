const RoleRepository = require('../../repositories/users/role.repository');
const RoleController = require('../../controllers/users/role.controller');
const RoleService = require('../../services/users/role.service');

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const router = require('express').Router();

router
    .get('/', (req, res) => roleController.getRoles(req, res))
    .get('/:id', (req, res) => roleController.getRoleById(req, res))
    .post('/', (req, res) => roleController.createRole(req, res))

module.exports = router;