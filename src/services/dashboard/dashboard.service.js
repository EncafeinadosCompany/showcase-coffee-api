

class DashboardService {
    constructor(SalesVariantRepository, ShoppingVariantRepository, LiquidationRepository, DepositRepository) {
        this.salesVariantRepository = SalesVariantRepository;
        this.liquidationRepository= LiquidationRepository;
        this.depositRepository= DepositRepository;
        this.shoppingVariantRepository = ShoppingVariantRepository;

    }    

    async productTop(month, year) {
        try {
            const products = await this.salesVariantRepository.ProducTopData(month, year);
            return products;
        } catch (error) {
            console.error('Error fetching top products:', error.message);
            throw new Error('Error fetching top products.');
        }
    }

    async earlyDate() {
        try {
            const response = await this.shoppingVariantRepository.getByClosestRoastingDate();
            return response;
        } catch (error) {
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

    async getTotalDeposits() {
        try {
            const deposits = await this.depositRepository.getDeposits();
            let total = 0;
            for (const deposit of deposits) {
                total += deposit.amount;
            }
            return total;
        } catch (error) {
            console.error('Error fetching total deposit:', error.message);
            throw new Error('Error fetching total deposit.');
        }
    }


    async earnings(month, year) {

    const earnings = await this.shoppingVariantRepository.getEarning(1);

    console.log('ganancias:', earnings);

    return earnings;



    // return await this.salesVariantRepository.earnings(month, year);
}
}

module.exports = DashboardService;