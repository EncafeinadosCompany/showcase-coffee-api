

class DashboardService {
    constructor(SalesVariantRepository, ShoppingVariantRepository ) {
        this.shoppingVariantRepository = new ShoppingVariantRepository();
        this.salesVariantRepository = new SalesVariantRepository();
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

    async earlyDate(){
        try {
            const response = await this.shoppingVariantRepository.getByClosestRoastingDate();
            return response;
        }catch(error){
            console.error('Error fetching closest roasting date:', error.message);
            throw error;
        }

    }
}

module.exports = DashboardService;