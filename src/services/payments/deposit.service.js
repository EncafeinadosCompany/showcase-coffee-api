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
      throw new Error('El ID del depósito es inválido.');
    }
    return await this.depositRepository.getDepositById(id);
  }

  async createDeposit(deposit) {
    const { date, amount, voucher, id_liquidation } = deposit;
    if (!date || !amount || !voucher || !id_liquidation) {
      throw new Error('Faltan datos obligatorios para crear el depósito.');
    }
    return await this.depositRepository.createDeposit(deposit);
  }

  async getDepositsByLiquidation(liquidationId) {
    if (!liquidationId || isNaN(liquidationId)) {
      throw new Error('El ID de la liquidación es inválido.');
    }
    return await this.depositRepository.getDepositsByLiquidation(liquidationId);
  }
}

module.exports = DepositService;
