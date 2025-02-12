class BrandController {

    constructor(BrandService) {
        this.brandService = BrandService;
    }
    async getAll(req, res) {
        try {
            const brands = await this.brandService.getAll()
            res.status(200).json(brands)

        } catch (error) {
            console.error('Error fetching all brands:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Missing brand ID in request" });
        }

        try {
            const brands = await this.brandService.getById(id);

            if (!brands) {
                return res.status(404).json({ message: `Brand with id ${id} not found` });
            }
            res.status(200).json(brands);

        } catch (error) {
            console.error(`Error fetching brand with id ${id}:`, error);
            res.status(500).json({ message: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const brands = await this.brandService.create(req.body);
            res.status(200).json(brands);
        } catch (error) {
            console.error('Error creating new brand:', error);
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = BrandController;