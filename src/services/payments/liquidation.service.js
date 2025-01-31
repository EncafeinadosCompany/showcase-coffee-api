const LiquidationRepository = require('../../repositories/payments/liquidation.repository');
const DepositService = require('./deposit.service');

class LiquidationService {
  constructor() {
    this.liquidationRepository = new LiquidationRepository();
    this.depositService = new DepositService();
  }

  async getAllLiquidations() {
    return await this.liquidationRepository.getLiquidations();
  }

  async getLiquidationById(id) {
    if (!id || isNaN(id)) {
      throw new Error('The liquidation ID is invalid.');
    }
    return await this.liquidationRepository.getLiquidationById(id);
  }

  async createLiquidation(liquidation) {
    const { current_debt, status, id_shopping } = liquidation;
    if (!current_debt || !status || !id_shopping) {
      throw new Error('Missing required data to create the liquidation.');
    }
    return await this.liquidationRepository.createLiquidation(liquidation);
  }

  async getLiquidationWithDetails(id) {
    if (!id || isNaN(id)) {
      throw new Error('The liquidation ID is invalid.');
    }
    const liquidation = await this.liquidationRepository.getLiquidationWithDetails(id);
    if (!liquidation) {
      throw new Error('Liquidación no encontrada.');
    }
    return liquidation;
  }
}

module.exports = LiquidationService;
