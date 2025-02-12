const { sequelize } = require('../../config/connection');
const { Op } = require('sequelize');

const { ProductModel } = require('../../models/products/products.entity');
const { ShoppingModel } = require('../../models/transactions/shopping.entity');
const { LiquidationModel } = require('../../models/payments/liquidations.entity');
const { SalesVariantModel } = require('../../models/transactions/salesVariant.entity');
const { VariantProductModel } = require('../../models/products/variantsProducts.entity');
const { ShoppingVariantModel } = require('../../models/transactions/shoppingVariant.entity');
const { EmployeeModel } = require('../../models/users/employees.entity');

class LiquidationRepository {

  constructor() { }

  async getAllLiquidations() {
    try {
      return await LiquidationModel.findAll();
    } catch (error) {
      throw new error;
    }
  };

  async getLiquidationById(liquidationId) {
    try {
      return await LiquidationModel.findByPk(liquidationId);
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
          ['quantity', 'quantity'],
          'subtotal',
          'created_at',
          [
            sequelize.col('variantProduct.shoppingVariants.shopping_price'),
            'cost_price'
          ],
          [
            sequelize.literal('"SalesVariantModel"."quantity" * "variantProduct->shoppingVariants".shopping_price'),
            'provider_amount'
          ]
        ],
        include: [{
          model: VariantProductModel,
          as: 'variantProduct',
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
              where: { status: true },
              include: [{
                model: ShoppingModel,
                as: "shopping",
                attributes: ["id"],
                include: [
                  {
                    model: EmployeeModel,
                    as: "employee",
                    attributes: ["id_provider"],
                    where: {
                      id_provider: liquidation.id_provider
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

  async updateLiquidationDebt(liquidationId, newDebt, transaction) {
    try {
      return await LiquidationModel.update(
        {
          current_debt: sequelize.literal(`current_debt + ${newDebt}`),
          updated_at: new Date()
        },
        { where: { id: liquidationId }, transaction }
      );
    } catch (error) {
      throw error;
    }
  };  

  async findProviderSales(providerId, startDate, endDate, transaction) {
    try {
      return await SalesVariantModel.findAll({
        attributes: [
          'id',
          'quantity',
          'subtotal',
          'created_at',
          [
            sequelize.col('variantProduct.shoppingVariants.shopping_price'),
            'cost_price'
          ],
          [
            sequelize.literal('quantity * variantProduct.shoppingVariants.shopping_price'),
            'provider_amount'
          ]
        ],
        include: [{
          model: VariantProductModel,
          as: 'variantProduct',
          attributes: ['id', 'grammage'],
          include: [
            {
              model: ProductModel,
              as: 'product',
              attributes: ['name']
            },
            {
              model: ShoppingVariantModel,
              as: 'shoppingVariants',
              where: { status: true },
              include: [{
                model: ShoppingModel,
                as: 'shopping',
                include: [
                  {
                    model: EmployeeModel,
                    as: "employee",
                    where: { id_provider: providerId }
                  }
                ]
              }]
            }
          ]
        }],
        where: {
          status: true,
          created_at: {
            [Op.between]: [startDate, endDate]
          }
        },
        transaction
      });
    } catch (error) {
      throw new Error(`Error finding provider sales: ${error.message}`);
    }
  }

  async closeLiquidation(liquidationId, transaction) {
    try {
      return await LiquidationModel.update(
        { status: false },
        { where: { id: liquidationId }, transaction }
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
  }


}

module.exports = LiquidationRepository;