class SalesController {

  constructor(SaleService) {
    this.saleService = SaleService;
  }

  async getAllSales(req, res) {
    try {
      const sales = await this.saleService.getAllSales();
      res.status(200).json(sales);
    } catch (error) {
      console.error('Error fetching all sales:', error);
      res.status(500).json({ message: error.message });
    }
  };

  async getSaleById(req, res) {
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
  };

  async createSale(req, res) {
    try {
      const sale = req.body;
      const newSale = await this.saleService.createSale(sale);
      res.status(201).json(newSale);
    } catch (error) {
      console.error('Error creating sale:', error);
      res.status(500).json({ message: error.message });
    }
  };

}

module.exports = SalesController;
