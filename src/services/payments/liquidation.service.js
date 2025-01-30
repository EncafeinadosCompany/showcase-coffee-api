const LiquidationRepository = require('../repositories/payments/liquidation.repository');
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
      throw new Error('El ID de la liquidación es inválido.');
    }
    return await this.liquidationRepository.getLiquidationById(id);
  }

  async createLiquidation(liquidation) {
    const { current_debt, status, id_shopping } = liquidation;
    if (!current_debt || !status || !id_shopping) {
      throw new Error('Faltan datos obligatorios para crear la liquidación.');
    }
    return await this.liquidationRepository.createLiquidation(liquidation);
  }

  async getLiquidationWithDeposits(id) {
    if (!id || isNaN(id)) {
      throw new Error('El ID de la liquidación es inválido.');
    }
    const liquidation = await this.liquidationRepository.getLiquidationWithDeposits(id);
    if (!liquidation) {
      throw new Error('Liquidación no encontrada.');
    }
    return liquidation;
  }
}

module.exports = LiquidationService;
