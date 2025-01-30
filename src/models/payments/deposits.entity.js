const { DataTypes, Model } = require('sequelize')

const DEPOSIT_TABLE = 'deposits'

const depositSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    voucher: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            isUrl: true
        }
    },

    id_liquidation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "liquidations",
            key: "id",
        },
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
}

class DepositModel extends Model {

    static associate(models) {
        this.belongsTo(models.LiquidationModel, {
            foreignKey: 'id_liquidation',
            as: 'liquidations',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DEPOSIT_TABLE,
            modelName: 'DepositModel',
            timestamps: true,
            underscored: true
        }
    }
}

module.exports = { DEPOSIT_TABLE, depositSchema, DepositModel };



