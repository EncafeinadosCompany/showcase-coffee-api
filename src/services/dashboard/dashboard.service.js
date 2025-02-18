

class DashboardService {
    constructor(SalesVariantRepository, ShoppingVariantRepository, LiquidationRepository, DepositRepository) {
        this.salesVariantRepository = new SalesVariantRepository();
        this.liquidationRepository= LiquidationRepository;
        this.depositRepository= DepositRepository;
        this.shoppingVariantRepository = new ShoppingVariantRepository();

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

    async getTotalLiquidation() {
        try {
            const liquidations = await this.liquidationRepository.getAllLiquidations();
            let total = 0;
            for (const liquidation of liquidations) {
                total += liquidation.current_debt;
            }
            return total;
        } catch (error) {
            console.error('Error fetching total liquidation:', error.message);
            throw new Error('Error fetching total liquidation.');
        }
    }
}

module.exports = DashboardService;