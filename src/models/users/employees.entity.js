const { DataTypes, Model } = require('sequelize');

const EMPLOYEE_TABLE = 'employees';

const employeeSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('store', 'provider'), 
    allowNull: false,
  },
  idEntity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class EmployeeModel extends Model {
  static associate(models) {

    this.belongsTo(models.StoreModel, {
      foreignKey: 'idEntity',
      constraints: false,
      as: 'store',
    });

    this.belongsTo(models.ProviderModel, {
      foreignKey: 'idEntity',
      constraints: false, 
      as: 'provider',
    });

    this.hasMany(models.ShoppingsModel, {
      as: 'shoppings',
      foreignKey: 'id_employees'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: 'EmployeeModel',
      timestamps: true,
    };
  }
}

module.exports = { EMPLOYEE_TABLE, employeeSchema, EmployeeModel };