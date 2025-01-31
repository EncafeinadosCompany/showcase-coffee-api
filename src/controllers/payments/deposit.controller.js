const DepositService = require('../../services/payments/deposit.service');

class DepositController {
  constructor() {
    this.depositService = new DepositService();
  }

  async getAllDeposits(req, res) {
    try {
      const deposits = await this.depositService.getAllDeposits();
      res.status(200).json(deposits);
    } catch (error) {
      console.error('Error fetching deposits:', error.message);
      res.status(500).json({ message: 'An error occurred while fetching deposits.' });
    }
  }

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
  }

  async createDeposit(req, res) {
    try {
      const depositData = req.body;
      const newDeposit = await this.depositService.createDeposit(depositData);
      res.status(201).json(newDeposit);
    } catch (error) {
      console.error('Error creating deposit:', error.message);
      res.status(400).json({ message: 'An error occurred while creating the deposit. Please check the input data.' });
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
  }
}

module.exports = DepositController;
