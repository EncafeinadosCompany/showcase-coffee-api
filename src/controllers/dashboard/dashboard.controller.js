const express = require('express');

class DashboardController{

    constructor (dashboardService) {
        this.dashboardService = dashboardService;
    }

    async productTop(req, res) {

        const {month , year } = req.body
        try {
           
        // Validar que los valores existen y son números
        if (!month || !year || isNaN(month) || isNaN(year)) {
            return res.status(400).json({ error: "Mes y año son requeridos y deben ser números" });
        }

        const products = await this.dashboardService.productTop(Number(month), Number(year));

        res.json({ success: true, data: products });
           
        }catch(error) {
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' })
        }
    }

    async earlyDate(req, res) {

        try{
            const dashboardData = await this.dashboardService.earlyDate();

            !dashboardData 
                ? res.status(404).json({ message: 'Dashboard data not found.' }) 
                : res.status(200).json(dashboardData)

        }catch(error){
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' });
        }
    }

    async salesMonth(req, res) {
        try{
            const dashboardData = await this.dashboardService.salesMonth();

            !dashboardData 
                ? res.status(404).json({ message: 'Dashboard data not found.' }) 
                : res.status(200).json(dashboardData)

        }catch(error){
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' });
        }
    }

    async earnings (req, res) {
        try {
            const { month, year, variant } = req.body;
            const earnings = await this.dashboardService.earnings(month, year, variant);

            res.json({ success: true, data: earnings });

        }catch(error){
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
} 

module.exports = DashboardController;