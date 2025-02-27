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

    async getAllSocialNetworks(req, res) {
        try {
            const socialNetworks = await this.brandService.getAllSocialNetworks();
            res.status(200).json(socialNetworks);
        } catch (error) {
            console.error('Error fetching all social networks:', error);
            res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const brands = await this.brandService.createBrand(req.body);
            res.status(200).json(brands);
        } catch (error) {
            console.error('Error creating new brand:', error);
            res.status(500).json({ error: error.message })
        }
    }

    async update (req,res){
        const {id} = req.params
        const data = req.body
        try {

            if (!id) {
                return res.status(400).json({ message: "Missing brand ID in request" });
            }

            const brands = await this.brandService.updateBrand( id, data);
            
            (!brands)
                ? res.status(404).json({message: `Brand with id ${id} not found`}) 
                : res.status(200).json(brands);
        }catch (error){
            console.log('Error updating brand:', error);
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = BrandController;