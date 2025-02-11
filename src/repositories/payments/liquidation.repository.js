const { LiquidationModel } = require('../../models/payments/liquidations.entity');
const { DepositModel } = require('../../models/payments/deposits.entity');
const { ShoppingModel } = require('../../models/transactions/shopping.entity');

class LiquidationRepository {
  constructor() {}

  async getLiquidations() {
    try {
      return await LiquidationModel.findAll();
    } catch (error) {
      console.error('Error while fetching liquidations:', error);
      throw new Error('Failed to retrieve the list of liquidations.');
    }
  }

  async getLiquidationById(id) {
    try {
      return await LiquidationModel.findByPk(id);
    } catch (error) {
      console.error(`Error while fetching liquidation with ID ${id}:`, error);
      throw new Error('Failed to retrieve the liquidation.');
    }
  }

  async createLiquidation(liquidation) {
    try {
      return await LiquidationModel.create(liquidation);
    } catch (error) {
      console.error('Error while creating the liquidation:', error);
      throw new Error('Failed to create the liquidation.');
    }
  }

  async getLiquidationWithDetails(id) {
    try {
      return await LiquidationModel.findByPk(id, {
        include: [
          {
            model: DepositModel,
            as: 'deposits',
          },
          {
            model: ShoppingModel,
            as: 'shopping',
          },
        ],
      });
    } catch (error) {
      console.error(`Error while fetching liquidation with details (ID ${id}):`, error);
      throw new Error('Failed to retrieve the liquidation with details.');
    }
  }

  async updateLiquidation(id, data) {
    try {
      return await LiquidationModel.update(data, { where: { id } });
    } catch (error) {
      console.error(`Error while updating liquidation with ID ${id}:`, error);
      throw new Error('Failed to update the liquidation.');
    }
  }
}

module.exports = LiquidationRepository;
