

class DashboardService {
    constructor(SalesVariantRepository) {
        // this.shoppingVariantRepository = new ShoppingVariantRepository();
        this.salesVariantRepository = new SalesVariantRepository();
        // this.productRepository = ProductRepository;
    }

    async productTop(month , year) {
        try {
            const products = await this.salesVariantRepository.ProducTopData(month,year);
            return products;
        } catch (error) {
            console.error('Error fetching top products:', error.message);
            throw new Error('Error fetching top products.');
        }
    }

    async earlyDate (){

    }
}

module.exports = DashboardService;