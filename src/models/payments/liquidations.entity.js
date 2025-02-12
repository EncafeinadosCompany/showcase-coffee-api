const { DataTypes, Model, Sequelize } = require("sequelize");
const { PROVIDER_TABLE } = require("../companies/provider.entity");

const LIQUIDATION_TABLE = 'liquidations';

const liquidationSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    current_debt: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    id_provider: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PROVIDER_TABLE,
            key: 'id'
        }
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
    }
};

class LiquidationModel extends Model {
    static associate(models) {
        this.hasMany(models.DepositModel, {
            foreignKey: 'id_liquidation',
            as: 'deposits',
        });

        this.belongsTo(models.ProviderModel, {
            as: 'provider',
            foreignKey: 'id_provider'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: LIQUIDATION_TABLE,
            modelName: 'LiquidationModel',
            timestamps: false,
            underscored: true
        }
    }
}

module.exports = { LIQUIDATION_TABLE, liquidationSchema, LiquidationModel };
