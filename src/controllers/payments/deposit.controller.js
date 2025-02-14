class DepositController {
  
  constructor(depositService) {
    this.depositService = depositService;
  }

  async getAllDeposits(req, res) {
    try {
      const deposits = await this.depositService.getAllDeposits();
      res.status(200).json(deposits);
    } catch (error) {
      console.error('Error fetching deposits:', error.message);
      res.status(500).json({ message: 'An error occurred while fetching deposits.' });
    }
  };

  async getDepositById(req, res) {
    try {
      const { id } = req.params;
      const deposit = await this.depositService.getDepositById(id);
      if (!deposit) {
        return res.status(404).json({ message: 'Deposit not found.' });
      }
      res.status(200).json(deposit);
    } catch (error) {
      console.error(`Error fetching deposit with ID ${req.params.id}:`, error.message);
      res.status(500).json({ message: 'An error occurred while fetching the deposit.' });
    }
  };

  async createDeposit(req, res) {
    try {
      const depositData = req.body;
      if (!depositData.type_payment || !depositData.amount || !depositData.voucher || !depositData.id_liquidation) {
        console.log(depositData)
        return res.status(400).json({ message: 'Missing required data to create the deposit.' });

      }
      const newDeposit = await this.depositService.createDeposit(depositData);
      res.status(201).json(newDeposit);
    } catch (error) {
  
      if (error.message === 'The deposit ID is invalid.' || 
          error.message === 'The liquidation ID is invalid.' ||
          error.message === 'The associated liquidation was not found.') {
        res.status(404).json({ message: error.message });
      } else if (error.message === 'The current debit is less than the amount.' ||
                 error.message === 'The deposit amount exceeds the current debt.' ||
                 error.message === 'Missing required data to create the deposit.') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An error occurred while creating the deposit. Please check the input data.' });
      }
    }
  }


  async getDepositsByLiquidation(req, res) {
    try {
      const { liquidationId } = req.params;
      const deposits = await this.depositService.getDepositsByLiquidation(liquidationId);
      res.status(200).json(deposits);
    } catch (error) {
      console.error(`Error fetching deposits for liquidation ${req.params.liquidationId}:`, error.message);
      res.status(500).json({ message: 'An error occurred while fetching deposits for the liquidation.' });
    }
  };

}

module.exports = DepositController;
