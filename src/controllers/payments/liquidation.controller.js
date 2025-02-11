class LiquidationController {

  constructor(liquidationService) {
    this.liquidationService = liquidationService;
  }

  async getAllLiquidations(req, res) {
    try {
      const liquidations = await this.liquidationService.getAllLiquidations();
      res.status(200).json(liquidations);
    } catch (error) {
      console.error('Error fetching liquidations:', error.message);
      res.status(500).json({ message: 'An error occurred while fetching liquidations.' });
    }
  };

  async getLiquidationById(req, res) {
    try {
      const { id } = req.params;
      const liquidation = await this.liquidationService.getLiquidationById(id);
      if (!liquidation) {
        return res.status(404).json({ message: 'Liquidation not found.' });
      }
      res.status(200).json(liquidation);
    } catch (error) {
      console.error(`Error fetching liquidation with ID ${req.params.id}:`, error.message);
      res.status(500).json({ message: 'An error occurred while fetching the liquidation.' });
    }
  };

  async createLiquidation(req, res) {
    try {
      const liquidationData = req.body;
      const newLiquidation = await this.liquidationService.createLiquidation(liquidationData);
      res.status(201).json(newLiquidation);
    } catch (error) {
      console.error('Error creating liquidation:', error.message);
      res.status(400).json({ message: 'An error occurred while creating the liquidation. Please check the input data.' });
    }
  };

  async getLiquidationWithDeposits(req, res) {
    try {
      const { id } = req.params;
      const liquidationWithDeposits = await this.liquidationService.getLiquidationWithDeposits(id);
      if (!liquidationWithDeposits) {
        return res.status(404).json({ message: 'Liquidation not found.' });
      }
      res.status(200).json(liquidationWithDeposits);
    } catch (error) {
      console.error(`Error fetching liquidation with deposits (ID ${req.params.id}):`, error.message);
      res.status(500).json({ message: 'An error occurred while fetching the liquidation with deposits.' });
    }
  };

}

module.exports = LiquidationController;
