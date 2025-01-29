class ProductController {

    constructor(productService) {
        this.productService = productService;

        console.log(this.authService)
    }

    create = async( req , res) =>{
        try {
            const product = await this.productService.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}