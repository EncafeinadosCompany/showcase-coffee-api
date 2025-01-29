const express = require('express');

const RoleRepository = require('../../repositories/users/role.repository');
const RoleService = require('../../services/users/role.service');
const RoleController = require('../../controllers/users/role.controller');

const router = express.Router();

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

router
    .get('/', roleController.getRoles)
    .get('/:id', roleController.getRoleById)
    .post('/', roleController.createRole)

module.exports = router;