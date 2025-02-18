const express = require('express');

class DashboardController{

    constructor (dashboardService) {
        this.dashboardService = dashboardService;
    }

    // productos mas vendidos
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

    // ventas por mes

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
            const { month, year } = req.body;
            const earnings = await this.dashboardService.earnings(month, year);

            res.json({ success: true, data: earnings });

        }catch(error){
            console.error('Error fetching dashboard data:', error.message);
            res.status(500).json({ message: 'An error occurred while fetching dashboard data.' });
        }
    }
} 

module.exports = DashboardController;