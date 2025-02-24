class ImagesController {

    constructor(VariantService, ProductService) {
        this.variantService = VariantService;
        this.productService = ProductService;
    }

    async uploadImages(req, res) {
        try {
            const image_url = req.file.path;

            return res.status(200).json({
                message: "¡Image successfully uploaded!",
                image_url
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async updateImages(req, res) {
        try {
            const { id, type } = req.params;

            const image_url = req.file.path;

            if (type === 'variant') {
                await this.variantService.updateImage(id, image_url);

            } else if (type === 'product') {
                await this.productService.updateImage(id, image_url);
            }


            return res.status(200).json({
                message: "¡Image successfully uploaded!",
                image_url
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ImagesController;