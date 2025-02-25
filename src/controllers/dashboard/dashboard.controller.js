class DashboardController {

    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }

    async productTop(req, res) {

        const { month, year } = req.body
        try {

            if (isNaN(month) || isNaN(year)) return res.status(400).json({ error: "Month and year are required" });

            const products = await this.dashboardService.productTop(Number(month), Number(year));

            res.json({ success: true, data: products });

        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' })
        }
    }

    async earlyDate(req, res) {

        try {
            const dashboardData = await this.dashboardService.earlyDate();

            !dashboardData
                ? res.status(404).json({ message: 'Dashboard data not found.' })
                : res.status(200).json(dashboardData)

        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' });
        }
    }

    async salesMonth(req, res) {
        try {
            const dashboardData = await this.dashboardService.salesMonth();

            !dashboardData
                ? res.status(404).json({ message: 'Dashboard data not found.' })
                : res.status(200).json(dashboardData)

        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' });
        }
    }

    async earnings(req, res) {
        try {
            const { month, year, variant } = req.body;
            const earnings = await this.dashboardService.earnings(month, year, variant);

            res.json({ success: true, data: earnings });

        } catch (error) {
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' });
        }
    }

    async getTotalLiquidation(req, res) {
        try {
            const totalLiquidation = await this.dashboardService.getTotalLiquidation();
            res.status(200).json({ totalLiquidation });
        } catch (error) {
            console.error('Error fetching total liquidation:', error.message);
            res.status(500).json({ error: 'Error fetching total liquidation' });
        }
    }

    async getTotalDeposits(req, res) {
        try {
            const totalDeposits = await this.dashboardService.getTotalDeposits();
            res.status(200).json({ totalDeposits });
        } catch (error) {
            console.error('Error fetching total liquidation:', error.message);
            res.status(500).json({ error: 'Error fetching total liquidation' });
        }
    }

    async getTotalBrands(req, res) {
        try {
            const totalBrands = await this.dashboardService.getTotalBrands();
            res.status(200).json({ totalBrands });
        } catch (error) {
            console.error('Error fetching total brands:', error.message);
            res.status(500).json({ error: 'Error fetching total brands' });
        }
    }

    async getTotalSalesByMonth(req, res) {
        try {
            const { month, year } = req.body;

            if (isNaN(month) || isNaN(year)) {
                return res.status(400).json({ error: "Month and year are required." });
            }

            const totalSales = await this.dashboardService.getTotalSalesByMonth(Number(month), Number(year));
            res.status(200).json({ totalSales });
        } catch (error) {
            console.error('Error fetching total sales by month:', error.message);
            res.status(500).json({ error: 'Error fetching total sales by month.' });
        }
    }

    async getTotalSalesByYear(req, res) {
        try {
            const { year } = req.body;

            if (isNaN(year)) {
                return res.status(400).json({ error: "Year is required." });
            }

            const totalSales = await this.dashboardService.getTotalSalesByYear(Number(year));
            res.status(200).json({ totalSales });
        } catch (error) {
            console.error('Error fetching total sales by year:', error.message);
            res.status(500).json({ error: 'Error fetching total sales by year.' });
        }
    }

    async getSalesCountByMonth(req, res) {
        try {
            const { month, year } = req.body;

            if (isNaN(month) || isNaN(year)) {
                return res.status(400).json({ error: "Month and year are required." });
            }

            const salesCount = await this.dashboardService.getSalesCountByMonth(Number(month), Number(year));
            res.status(200).json({ salesCount });
        } catch (error) {
            console.error('Error fetching sales count by month:', error.message);
            res.status(500).json({ error: 'Error fetching sales count by month.' });
        }
    }

    // Método para obtener la cantidad de ventas del año
    async getSalesCountByYear(req, res) {
        try {
            const { year } = req.body;

            if (isNaN(year)) {
                return res.status(400).json({ error: "Year is required." });
            }

            const salesCount = await this.dashboardService.getSalesCountByYear(Number(year));
            res.status(200).json({ salesCount });
        } catch (error) {
            console.error('Error fetching sales count by year:', error.message);
            res.status(500).json({ error: 'Error fetching sales count by year.' });
        }
    }
}

module.exports = DashboardController;