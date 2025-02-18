const { sequelize } = require('../../config/connection');
const { Op } = require('sequelize');

const { ShoppingModel } = require('../../models/transactions/shopping.entity');
const { LiquidationModel } = require('../../models/payments/liquidations.entity');
const { SalesVariantModel } = require('../../models/transactions/salesVariant.entity');
const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { LiquidationDetailModel } = require('../../models/payments/liquidationDetail.entity');
const { EmployeeModel } = require('../../models/users/employees.entity');
const { ProviderModel } = require('../../models/companies/provider.entity');

class LiquidationRepository {

  constructor() { }

  async getAllLiquidations() {
    return LiquidationModel.findAll({
      include: [{ model: ProviderModel, as: 'provider', attributes: ['name'] }],
    });
  };

  async getLiquidationById(liquidationId) {
    return LiquidationModel.findByPk(liquidationId);
  };

  async getLiquidationDetails(liquidationId) {
    return LiquidationDetailModel.findAll({
      include: [{ model: SalesVariantModel, as: 'sale', attributes: ['id', 'quantity', 'created_at'] }],
      where: { id_liquidation: liquidationId }
    });
  };

  async getLiquidationByProvider(providerId) {
    return LiquidationModel.findOne({ where: { id_provider: providerId } });
  };

  async createLiquidation(liquidationData) {
    return LiquidationModel.create(liquidationData);
  };

  async createLiquidationDetail(details) {
    return LiquidationDetailModel.bulkCreate(details);
  }

  async updateLiquidationAmount(liquidationId, newDebt) {
    return LiquidationModel.update(
      { current_debt: newDebt, updated_at: new Date() },
      { where: { id: liquidationId } }
    );
  };

  async updateLiquidation(id, updateData) {
    try {
      const liquidation = await this.getLiquidationById(id);
      if (!liquidation) throw new Error('Liquidation not found.');

      await liquidation.update(updateData);
      return liquidation;
    } catch (error) {
      console.error('Error updating liquidation:', error);
      throw new Error('Error updating liquidation.');
    }
  };


  async findProviderSalesPeriod(providerId, startDate, endDate) {
    return SalesVariantModel.findAll({
      attributes: ['id', 'quantity', 'created_at'],
      include: [{
        model: ShoppingVariantModel,
        as: 'shoppingVariant',
        attributes: ['id', 'shopping_price'],
        required: true,
        include: [{
          model: ShoppingModel,
          as: 'shopping',
          attributes: [],
          required: true,
          include: [{
            model: EmployeeModel,
            as: 'employee',
            attributes: [],
            required: true,
            where: {
              id_provider: providerId,
              status: true
            }
          }]
        }]
      }],
      where: {
        status: true,
        created_at: {
          [Op.between]: [startDate, endDate]
        }
      },
    });
  };

}

module.exports = LiquidationRepository;