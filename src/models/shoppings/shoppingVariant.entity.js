const { DataTypes, Model } = require('sequelize');

const SHOPPING_VARIANT_TABLE= 'shopping_variant'; 

const shoppingVariantSchema= {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_shoppping: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_variant_products: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roasting_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shopping_prices: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    sale_prices: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
};

class ShoppingVariantModel extends Model{
    static associate(models) {
    this.belongsTo(models.ShoppingsModel, {
        as: 'shopping',
        foreignKey: 'id_shopping'
      });
      }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SHOPPING_VARIANT_TABLE,
            modelName: 'ShoppingVariantModel',
            timestamps: true,
        };
    }

}

module.exports = { SHOPPING_VARIANT_TABLE, shoppingVariantSchema, ShoppingVariantModel };