const {DataTypes, Model} = require('sequelize')

const DEPOSIT_TABLE='deposits'

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
        type: DataTypes.DECIMAL(10,2),
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
        allowNull: false
    }
}

class DepositModel extends Model {

    static associate(models) {
        this.belongsTo(models.LiquidationModel, {
            foreignKey: 'id_liquidation',
            as: 'liquidation',
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



