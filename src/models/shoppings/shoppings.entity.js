const { DataTypes, Model } = require('sequelize');
const { STORE_TABLE } = require('../stores/store.entity');
const { EMPLOYEE_TABLE } = require('../users/employees.entity');

const SHOPPING_TABLE= 'shoppings';

const shoppingSchema= {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_store: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:STORE_TABLE,
            key: 'id'
        }
    },
    id_employees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: EMPLOYEE_TABLE,
            key: 'id'
        }
    },
    date_entry: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
};

class ShoppingsModel extends Model{
    static associate(models) {

    this.hasMany(models.ShoppingVariantModel, {
        as: 'variants',
        foreignKey: 'id_shopping'
      });

    this.hasMany(models.LiquidationModel, {
        as: 'liquidations',
        foreignKey: 'id_shopping'
        });

      this.belongsTo(models.StoreModel, {
        as: 'store',
        foreignKey: 'id_store'
      });

      this.belongsTo(models.EmployeeModel, {
        as: 'employee',
        foreignKey: 'id_employee'
      });
  }   
  
    static config(sequelize) {
        return {
            sequelize,
            tableName: SHOPPING_TABLE,
            modelName: 'ShoppingsModel',
            timestamps: true,
        };
    }

}

module.exports = { SHOPPING_TABLE, shoppingSchema, ShoppingsModel };