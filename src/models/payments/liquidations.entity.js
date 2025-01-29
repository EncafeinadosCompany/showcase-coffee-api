const {DataTypes, Model} = require('sequelize')

const LIQUIDATION_TABLE='liquidations'

const liquidationSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    current_debt: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_shopping: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

class LiquidationModel extends Model {

    static associate(models) {
        this.hasMany(models.DepositsModel, {
            foreignKey: 'id_liquidation',
            as: 'deposits',
        });
    
        this.belongsTo(models.ShoppingsModel, {
            foreignKey: 'id_shopping',
            as: 'shopping',
                             
    });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: LIQUIDATION_TABLE,
            modelName: 'LiquidationModel',
            timestamps: true,
            underscored: true
        }
    }
}

module.exports = {LIQUIDATION_TABLE, liquidationSchema, LiquidationModel};



