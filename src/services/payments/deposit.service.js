class DepositService {
  constructor(depositRepository, liquidationRepository, sequelize) {
    this.depositRepository = depositRepository;
    this.liquidationRepository = liquidationRepository;
    this.sequelize = sequelize
  }

  async getAllDeposits() {
    return await this.depositRepository.getDeposits();
  }

  async getDepositById(id) {
    if (!id || isNaN(id)) {
      throw new Error('The deposit ID is invalid.');
    }
    return await this.depositRepository.getDepositById(id);
  };

  async getDepositsByLiquidation(liquidationId) {
    if (!liquidationId || isNaN(liquidationId)) {
      throw new Error('The liquidation ID is invalid.');
    }
    return await this.depositRepository.getDepositsByLiquidation(liquidationId);
  };

  async getTotalDepositsByLiquidation(liquidationId) {
    if (!liquidationId || isNaN(liquidationId)) {
      throw new Error('The liquidation ID is invalid.');
    }
    return await this.depositRepository.getTotalDepositsByLiquidation(liquidationId);
  };

  async createDeposit(deposit) {
    const { amount, voucher, id_liquidation, type_payment } = deposit;

    const transaction = await this.sequelize.transaction();
    try {
      const liquidation = await this.liquidationRepository.getLiquidationById(id_liquidation, { transaction });

      if (!liquidation) {
        throw new Error('The associated liquidation was not found.');
      }

      if (liquidation.current_debt < amount) {
        throw new Error('The current debit is less than the amount.');
      }
      const newDebt = liquidation.current_debt - amount;
      if (newDebt < 0) {
        throw new Error('The deposit amount exceeds the current debt.');
      }
      liquidation.current_debt = newDebt;

      if (newDebt === 0) {
        liquidation.status = false;
      }

      const newDeposit = await this.depositRepository.createDeposit({
        date: Date.now(),
        amount,
        voucher: voucher || 'Sin Comprobante',
        type_payment,
        id_liquidation,
      }, { transaction });

      await this.liquidationRepository.updateLiquidation(liquidation.id, {
        current_debt: liquidation.current_debt,
        status: liquidation.status,
      }, { transaction });


      await transaction.commit();
      return newDeposit;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

}

module.exports = DepositService;
