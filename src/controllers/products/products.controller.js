class ProductController {

    constructor(productService) {
        this.productService = productService;
    }

    create = async ( req , res) =>{
        try {
            const product = await this.productService.getAll();
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = ProductController;