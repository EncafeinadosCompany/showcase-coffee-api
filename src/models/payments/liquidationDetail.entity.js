const { DataTypes, Model, Sequelize } = require("sequelize");
const { LIQUIDATION_TABLE } = require('./liquidations.entity');
const { SALE_VARIANT_TABLE } = require('../transactions/salesVariant.entity');

const LIQUIDATION_DETAIL_TABLE = 'liquidation_details';

const liquidationDetailSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_liquidation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LIQUIDATION_TABLE,
            key: 'id'
        }
    },
    id_sales_variant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SALE_VARIANT_TABLE,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
};

class LiquidationDetailModel extends Model {
    static associate(models) {
        this.belongsTo(models.LiquidationModel, {
            as: 'liquidation',
            foreignKey: 'id_liquidation'
        });

        this.belongsTo(models.SalesVariantModel, {
            as: 'salesVariant',
            foreignKey: 'id_sales_variant'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: LIQUIDATION_DETAIL_TABLE,
            modelName: 'LiquidationDetailModel',
            timestamps: false,
        };
    }
}

module.exports = { LIQUIDATION_DETAIL_TABLE, liquidationDetailSchema, LiquidationDetailModel };
