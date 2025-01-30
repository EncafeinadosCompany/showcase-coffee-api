const { LiquidationModel } = require('../../models/payments/liquidation.entity');
const { DepositModel } = require('../../models/payments/deposit.entity');

class LiquidationRepository {
  constructor() {}

  async getLiquidations() {
    try {
      return await LiquidationModel.findAll();
    } catch (error) {
      console.error('Error al obtener las liquidaciones:', error);
      throw new Error('No se pudo obtener la lista de liquidaciones.');
    }
  }

  async getLiquidationById(id) {
    try {
      return await LiquidationModel.findByPk(id);
    } catch (error) {
      console.error(`Error al obtener la liquidación con ID ${id}:`, error);
      throw new Error('No se pudo obtener la liquidación.');
    }
  }

  async createLiquidation(liquidation) {
    try {
      return await LiquidationModel.create(liquidation);
    } catch (error) {
      console.error('Error al crear la liquidación:', error);
      throw new Error('No se pudo crear la liquidación.');
    }
  }

  async getLiquidationWithDeposits(id) {
    try {
      return await LiquidationModel.findByPk(id, {
        include: [
          {
            model: DepositModel,
            as: 'deposits',
          },
        ],
      });
    } catch (error) {
      console.error(`Error al obtener la liquidación con depósitos (ID ${id}):`, error);
      throw new Error('No se pudo obtener la liquidación con depósitos.');
    }
  }
}

module.exports = LiquidationRepository;



