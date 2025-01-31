const DepositRepository = require('../../repositories/payments/deposit.repository');

class DepositService {
  constructor() {
    this.depositRepository = new DepositRepository();
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
