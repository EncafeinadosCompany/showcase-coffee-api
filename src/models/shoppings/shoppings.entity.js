const {DataTypes, Model} = require('sequelize');
const SHOPPING_TABLE= 'shoppings';

const shoppingSchema= {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_stores: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_employees: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

      this.belongsTo(models.StoreModel, {
        as: 'store',
        foreignKey: 'id_stores'
      });

      this.belongsTo(models.EmployeeModel, {
        as: 'employee',
        foreignKey: 'id_employees'
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