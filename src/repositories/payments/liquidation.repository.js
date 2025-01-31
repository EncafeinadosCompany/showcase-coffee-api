const { LiquidationModel } = require('../../models/payments/liquidation.entity');
const { DepositModel } = require('../../models/payments/deposit.entity');
const { ShoppingsModel } = require('../../models/shoppings/shopping.entity');

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

  async getLiquidationWithDetails(id) {
    try {
      return await LiquidationModel.findByPk(id, {
        include: [
          {
            model: DepositModel,
            as: 'deposits',
          },
          {
            model: ShoppingsModel,
            as: 'shoppings',
          },
        ],
      });
    } catch (error) {
      console.error(`Error al obtener la liquidación con detalles (ID ${id}):`, error);
      throw new Error('No se pudo obtener la liquidación con detalles.');
    }
  }
}

module.exports = LiquidationRepository;
