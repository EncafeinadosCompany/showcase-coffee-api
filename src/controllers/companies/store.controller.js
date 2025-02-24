class StoreController {

    constructor(StoreService) {
        this.storeService = StoreService;
    };

    async createStore(req, res) {
        try {
            const storeData = req.body;
            const store = await this.storeService.createStore(storeData);
            res.status(201).json(store);
        } catch (error) {
            console.error('Error creating store:', error);
            res.status(500).json({ error: error.message });
        }
    };

    async getAllStores(req, res) {
        try {
            const stores = await this.storeService.getAllStores();
            res.status(200).json(stores);
        } catch (error) {
            console.error('Error fetching all stores:', error);
            res.status(500).json({ error: error.message });
        }
    };

    async getStoreById(req, res) {
        try {
            const { id } = req.params;
            const store = await this.storeService.getStoreById(id);
            if (store) {
                res.status(200).json(store);
            } else {
                res.status(404).json({ message: 'Store not found' });
            }
        } catch (error) {
            console.error('Error fetching store by id:', error);
            res.status(500).json({ error: error.message });
        }
    };

    async updateStore(req, res) {
        try {
            const { id } = req.params;
            const storeData = req.body;
            const updatedStore = await this.storeService.updateStore(id, storeData);
            if (updatedStore) {
                res.status(200).json(updatedStore);
            } else {
                res.status(404).json({ message: 'Store not found' });
            }
        } catch (error) {
            console.error('Error updating store:', error);
            res.status(500).json({ error: error.message });
        }
    };

}

module.exports = { StoreController };