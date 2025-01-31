const { DepositModel } = require('../../models/payments/deposits.entity');

class DepositRepository {
  constructor() {}

  async getDeposits() {
    try {
      return await DepositModel.findAll();
    } catch (error) {
      console.error('Error al obtener los depósitos:', error);
      throw new Error('No se pudo obtener la lista de depósitos.');
    }
  }

  async getDepositById(id) {
    try {
      return await DepositModel.findByPk(id);
    } catch (error) {
      console.error(`Error al obtener el depósito con ID ${id}:`, error);
      throw new Error('No se pudo obtener el depósito.');
    }
  }

  async createDeposit(deposit) {
    try {
      return await DepositModel.create(deposit);
    } catch (error) {
      console.error('Error al crear el depósito:', error);
      throw new Error('No se pudo crear el depósito.');
    }
  }

  async getDepositsByLiquidation(liquidationId) {
    try {
      return await DepositModel.findAll({ where: { id_liquidation: liquidationId } });
    } catch (error) {
      console.error(`Error al obtener los depósitos de la liquidación ${liquidationId}:`, error);
      throw new Error('No se pudo obtener los depósitos.');
    }
  }
}

module.exports = DepositRepository;
