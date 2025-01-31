const DepositRepository = require('../../repositories/payments/deposit.repository');
const LiquidationRepository = require('../../repositories/payments/liquidation.repository');

class DepositService {
  constructor() {
    this.depositRepository = new DepositRepository();
    this.liquidationRepository = new LiquidationRepository();
  }

  async getAllDeposits() {
    return await this.depositRepository.getDeposits();
  }

  async getDepositById(id) {
    if (!id || isNaN(id)) {
      throw new Error('The deposit ID is invalid.');
    }
    return await this.depositRepository.getDepositById(id);
  }

  async createDeposit(deposit) {
    const { date, amount, voucher, id_liquidation } = deposit;

    if (!date || !amount || !voucher || !id_liquidation) {
      throw new Error('Missing required data to create the deposit.');
    }

    const liquidation = await this.liquidationRepository.getLiquidationById(id_liquidation);
    if (!liquidation) {
      throw new Error('The associated liquidation was not found.');
    }

    const newDebt = liquidation.current_debt - amount;

    if (newDebt < 0) {
      throw new Error('The deposit amount exceeds the current debt.');
    }

    liquidation.current_debt = newDebt;
    if (newDebt === 0) {
      liquidation.status = 'false';
    }
    await this.liquidationRepository.updateLiquidation(liquidation.id, {
      current_debt: liquidation.current_debt,
      status: liquidation.status,
    });

    return await this.depositRepository.createDeposit(deposit);
  }

  async getDepositsByLiquidation(liquidationId) {
    if (!liquidationId || isNaN(liquidationId)) {
      throw new Error('The liquidation ID is invalid.');
    }
    return await this.depositRepository.getDepositsByLiquidation(liquidationId);
  }
}

module.exports = DepositService;
