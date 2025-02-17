const { sequelize } = require('../../config/connection');
const { Op } = require('sequelize');

const { ProductModel } = require('../../models/products/products.entity');
const { ShoppingModel } = require('../../models/transactions/shopping.entity');
const { LiquidationModel } = require('../../models/payments/liquidations.entity');
const { SalesVariantModel } = require('../../models/transactions/salesVariant.entity');
const { VariantProductModel } = require('../../models/products/variantsProducts.entity');
const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { EmployeeModel } = require('../../models/users/employees.entity');
const { ProviderModel } = require('../../models/companies/provider.entity');

class LiquidationRepository {

  constructor() { }

  async getAllLiquidations() {
    try {
      return await LiquidationModel.findAll({
        include: [
          {
            model: ProviderModel,
            as: 'provider',
            attributes: ['name'],
          },
        ],
      });
    } catch (error) {
      throw new Error(`Error retrieving liquidations: ${error.message}`);
    }
  };

  async getLiquidationById(liquidationId) {
    try {
      return await LiquidationModel.findByPk(liquidationId);
    } catch (error) {
      throw error;
    }
  };

  async getLiquidationByProvider(providerId) {
    try {
      return await LiquidationModel.findOne({ where: { id_provider: providerId } });
    } catch (error) {
      throw error;
    }
  };

  async getLiquidationSales(liquidationId) {
    try {
      const liquidation = await LiquidationModel.findByPk(liquidationId);
      if (!liquidation) return [];

      return await SalesVariantModel.findAll({
        attributes: [
          'id',
          'quantity',
          'subtotal',
          'created_at'
        ],
        include: [{
          model: VariantProductModel,
          as: 'variantProduct',
          required: true,
          attributes: ['id', 'stock', 'grammage'],
          include: [
            {
              model: ProductModel,
              as: 'product',
              attributes: ['name']
            },
            {
              model: ShoppingVariantModel,
              as: 'shoppingVariants',
              required: true,
              where: { status: true },
              attributes: ['shopping_price'],
              include: [{
                model: ShoppingModel,
                as: "shopping",
                required: true,
                include: [
                  {
                    model: EmployeeModel,
                    as: "employee",
                    required: true,
                    where: {
                      id_provider: liquidation.id_provider,
                      status: true
                    }
                  }
                ]
              }]
            }
          ]
        }],
        where: {
          status: true,
          created_at: {
            [Op.lte]: liquidation.updated_at
          }
        }
      });
    } catch (error) {
      throw new Error(`Error getting liquidation sales: ${error.message}`);
    }
  };

  async createLiquidation(liquidationData) {
    return await LiquidationModel.create(liquidationData);
  };

  async updateLiquidationDebt(liquidationId, newDebt) {
    try {
      return await LiquidationModel.update(
        {
          current_debt: sequelize.literal(`current_debt + ${newDebt}`),  
          updated_at: new Date()
        },
        { where: { id: liquidationId } }
      );
    } catch (error) {
      throw error;
    }
  };   

  async findProviderSales(providerId, startDate, endDate) {
    try {
      return await SalesVariantModel.findAll({
        attributes: [
          'id',
          'quantity',
          'subtotal',
          'created_at'
        ],
        include: [
          {
            model: ShoppingVariantModel,
            as: 'shoppingVariant',
            required: true,
            where: { status: true },
            attributes: ['shopping_price'],
            include: [{
              model: ShoppingModel,
              as: 'shopping',
              required: true,
              include: [{
                model: EmployeeModel,
                as: 'employee',
                required: true,
                where: { 
                  id_provider: providerId,
                  status: true 
                }
              }]
            }]
          }
        ],
        where: {
          status: true,
          created_at: {
            [Op.between]: [startDate, endDate]
          }
        }
      });
    } catch (error) {
      throw new Error(`Error finding provider sales: ${error.message}`);
    }
  };  

  async closeLiquidation(liquidationId) {
    try {
      return await LiquidationModel.update(
        { status: false },
        { where: { id: liquidationId } }
      );
    } catch (error) {
      throw new Error(`Error closing liquidation: ${error.message}`);
    }
  };

  async updateLiquidation(id, updateData, options = {}) {
    try {
      const liquidation = await this.getLiquidationById(id, options);
      if (!liquidation) {
        throw new Error('Liquidation not found.');
      }

      await liquidation.update(updateData, options);
      return liquidation;
    } catch (error) {
      console.error('Error updating liquidation:', error);
      throw new Error('Error updating liquidation.');
    }
  };

}

module.exports = LiquidationRepository;