class DashboardService {

    constructor(SalesVariantRepository, ShoppingVariantRepository, LiquidationRepository, DepositRepository, BrandsRepository) {
        this.salesVariantRepository = SalesVariantRepository;
        this.liquidationRepository = LiquidationRepository;
        this.depositRepository = DepositRepository;
        this.shoppingVariantRepository = ShoppingVariantRepository;
        this.brandsRepository = BrandsRepository;

    };

    async productTop(month, year) {
        try {
            const products = await this.salesVariantRepository.ProducTopData(month, year);
            return products;
        } catch (error) {
            console.error('Error fetching top products:', error.message);
            throw new Error('Error fetching top products.');
        }
    };

    async earlyDate() {
        try {
            const response = await this.shoppingVariantRepository.getByClosestRoastingDate();
            return response;
        } catch (error) {
            console.error('Error fetching closest roasting date:', error.message);
            throw error;
        }
    };

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
    };

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
    };

    async earnings(month, year, id_variant_products) {

        if (id_variant_products) return await this.getEarningsByProduct(id_variant_products);

        if (month && year) {
            return await this.getMonthlyEarnings(month, year)
        }

        if(year){
            return await this.getYearlyEarnings(year)
        }

    }

    private

    async getEarningsByProduct(id_variant_products) {

        const earning = await this.salesVariantRepository.getEarningsByProduct(id_variant_products);
        return earning
    };

    async getMonthlyEarnings(month, year) {
        try {

            const sales = await this.salesVariantRepository.getMonthlyEarnings(month, year);

            let totalEarnings = 0;

            sales.forEach(sale => {
                sale.sales_variant.forEach(variant => {
                    const { shopping_price, sale_price } = variant.shoppingVariant;
                    totalEarnings += (sale_price - shopping_price) * variant.quantity;
                });
            });

            return totalEarnings;
        } catch (error) {
            console.error('Error fetching monthly earnings:', error.message);
            throw new Error('Error fetching monthly earnings.');
        }
    }

    async getYearlyEarnings(year) {
        try {
            const sales = await this.salesVariantRepository.getYearlyEarnings(year);

            return sales;
        } catch (error) {
            console.error('Error fetching yearly earnings:', error.message);
            throw new Error('Error fetching yearly earnings.');
        }
    }

    async getTotalBrands() {
        try {
            const totalBrands = await this.brandsRepository.countBrands();
            return totalBrands;
        } catch (error) {
            console.error('Error fetching total brands:', error.message);
            throw new Error('Error fetching total brands.');
        }
    }

    async getTotalSalesByMonth(month, year) {
        try {
            const sales = await this.salesVariantRepository.getSalesByMonthAndYear(month, year);

            let totalSales = 0;
            sales.forEach((sale) => {
                const { sale_price } = sale.shoppingVariant;
                totalSales += sale_price * sale.quantity;
            });

            return totalSales;
        } catch (error) {
            console.error('Error fetching total sales by month:', error.message);
            throw new Error('Error fetching total sales by month.');
        }
    }

    // Método para obtener el total de ventas del año
    async getTotalSalesByYear(year) {
        try {
            const sales = await this.salesVariantRepository.getSalesByYear(year);

            let totalSales = 0;
            sales.forEach((sale) => {
                const { sale_price } = sale.shoppingVariant;
                totalSales += sale_price * sale.quantity;
            });

            return totalSales;
        } catch (error) {
            console.error('Error fetching total sales by year:', error.message);
            throw new Error('Error fetching total sales by year.');
        }
    }
    async getSalesCountByMonth(month, year) {
        try {
            const salesCount = await this.salesVariantRepository.getSalesCountByMonth(month, year);
            return salesCount;
        } catch (error) {
            console.error('Error fetching sales count by month:', error.message);
            throw new Error('Error fetching sales count by month.');
        }
    }

    // Método para obtener la cantidad de ventas del año
    async getSalesCountByYear(year) {
        try {
            const salesCount = await this.salesVariantRepository.getSalesCountByYear(year);
            return salesCount;
        } catch (error) {
            console.error('Error fetching sales count by year:', error.message);
            throw new Error('Error fetching sales count by year.');
        }
    }

}

module.exports = DashboardService;