const {upload} = require('../../config/cloudinary');
const ImagesController = require('../../controllers/products/images.controller');
const  {} = require('../../models/products/variantsProducts.entity');


const router = require('express').Router();
const VariantService = require('../../services/products/variants.service');
const VariantRepository = require('../../repositories/products/variant.repository');
const ProductRepository = require('../../repositories/products/products.repository');
const ProductService = require('../../services/products/products.service');

const productRepository = new ProductRepository();
const variantRepository = new VariantRepository();
const productService = new ProductService(productRepository);
const variantService = new VariantService(variantRepository);
const imagesController = new ImagesController(variantService, productService);

router

    .put('/:type/:id/add-image', upload.single('image'), (req, res) => imagesController.updateImages(req, res));

module.exports = router;