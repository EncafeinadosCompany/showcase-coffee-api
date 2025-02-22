const express = require('express');

// Middleware
const brandValidation = require('../../middlewares/products/Validations/brand.validation');
const errorMessages = require('../../middlewares/products/translations/errorMesaggesBrand');
const validationMiddleware = require('../../middlewares/validateRequest');

const router = express.Router();

const BrandController  = require('../../controllers/products/brands.controller');
const BrandRepository = require('../../repositories/products/blands.repository')
const SocialNetworksRepository = require('../../repositories/products/socialNetworks.repository');
const BrandService = require('../../services/products/brands.service');
const { authenticateJWT } = require('../../middlewares/auth.middleware');

const brandRepository = new BrandRepository();
const socialNetworksRepository = new SocialNetworksRepository();
const brandService = new BrandService(brandRepository, socialNetworksRepository);
const brandController = new BrandController(brandService);

    router
        .get('/', authenticateJWT, (req, res) => brandController.getAll(req, res))
        .get('/socialNetworks', authenticateJWT, (req, res) => brandController.getAllSocialNetworks(req, res))
        .get('/:id', authenticateJWT, (req, res) => brandController.getById(req, res))
        .post('/', authenticateJWT, brandValidation, (req , res) => brandController.create(req, res));

        
module.exports = router;