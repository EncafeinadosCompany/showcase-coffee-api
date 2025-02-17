const { DepositModel } = require('../../models/payments/deposits.entity');

class DepositRepository {
  constructor() {}

  async getDeposits() {
    try {
      return await DepositModel.findAll();
    } catch (error) {
      console.error('Error while fetching deposits:', error);
      throw new Error('Failed to retrieve the list of deposits.');
    }
  }

  async getDepositById(id) {
    try {
      return await DepositModel.findByPk(id);
    } catch (error) {
      console.error(`Error while fetching deposit with ID ${id}:`, error);
      throw new Error('Failed to retrieve the deposit.');
    }
  }

  async getDepositsByLiquidation(liquidationId) {
    try {
      return await DepositModel.findAll({ where: { id_liquidation: liquidationId } });
    } catch (error) {
      console.error(`Error while fetching deposits for liquidation ${liquidationId}:`, error);
      throw new Error('Failed to retrieve deposits.');
    }
  }

  async createDeposit(deposit) {
    try {
      return await DepositModel.create(deposit);
    } catch (error) {
      console.error('Error while creating the deposit:', error);
      throw new Error('Failed to create the deposit.');
    }
  }

  async getDepositsByLiquidation(liquidationId) {
    try {
      return await DepositModel.findAll({ where: { id_liquidation: liquidationId } });
    } catch (error) {
      console.error(`Error while fetching deposits for liquidation ${liquidationId}:`, error);
      throw new Error('Failed to retrieve deposits.');
    }
  }
}

module.exports = DepositRepository;
