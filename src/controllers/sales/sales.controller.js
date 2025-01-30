const SaleService = require('../../services/sales/sales.service');

class SalesController {
  constructor() {
    this.saleService = new SaleService();
  }

  async getAllSales(req, res) {
    try {
      const sales = await this.saleService.getAllSales();
      res.status(200).json(sales);
    } catch (error) {
      console.error('Error fetching all sales:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getSalesById(req, res) {
    try {
      const { id } = req.params;
      const sale = await this.saleService.getSalesById(id);
      if (!sale) {
        return res.status(404).json({ message: `Sale with id ${id} not found` });
      }
      res.status(200).json(sale);
    } catch (error) {
      console.error(`Error fetching sale with id ${id}:`, error);
      res.status(500).json({ message: error.message });
    }
  }

  async createSaleWithDetails(req, res) {
    try {
      const saleData = req.body.sale;
      const detailsData = req.body.details;
      const newSale = await this.saleService.createSaleWithDetails(saleData, detailsData);
      res.status(201).json(newSale);
    } catch (error) {
      console.error('Error creating new sale:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async createSaleVariant(req, res) {
    try {
      const saleDetailData = req.body;
      const newSaleDetail = await this.saleService.createSaleVariant(saleDetailData);
      res.status(201).json(newSaleDetail);
    } catch (error) {
      console.error('Error creating new sale detail:', error);
      if (error.message.includes('Sale not found')) {
        return res.status(404).json({ message: error.message });
      } else if (error.message.includes('A sale detail already exists with this product')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async getAllSaleVariant(req, res) {
    try {
      const saleVariants = await this.saleService.getAllSaleVariant();
      res.status(200).json(saleVariants);
    } catch (error) {
      console.error('Error fetching all sale variants:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getSaleVariantById(req, res) {
    try {
      const { id } = req.params;
      const saleVariant = await this.saleService.getSaleVariantById(id);
      if (!saleVariant) {
        return res.status(404).json({ message: `Sale variant with id ${id} not found` });
      }
      res.status(200).json(saleVariant);
    } catch (error) {
      console.error(`Error fetching sale variant with id ${id}:`, error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = SalesController;
