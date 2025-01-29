const { DataTypes, Model } = require('sequelize');
const { USER_TABLE } = require('./users.entity');

const EMPLOYEE_TABLE = 'employees';

const employeeSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: USER_TABLE,
      key: "id",
    },
  },
  identification: {
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
  id_store: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'stores',
      key: 'id'
    }
  },
  id_provider: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'providers',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
};

class EmployeeModel extends Model {
  static associate(models) {
    this.belongsTo(models.UserModel, {
      foreignKey: 'id_user',
      as: 'user',
    });

    this.belongsTo(models.StoreModel, {
      foreignKey: 'id_store',
      as: 'store',
    });

    this.belongsTo(models.ProviderModel, {
      foreignKey: 'id_provider',
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
      hooks: {
        beforeValidate: (employee) => {
          if (employee.type === 'store') {
            employee.id_provider = null;
            if (!employee.id_store) {
              throw new Error("La tienda es obligatorio para empleados de tienda");
            }
          } else if (employee.type === 'provider') {
            employee.id_store = null;
            if (!employee.id_provider) {
              throw new Error("El proveedor es obligatorio para empleados de proveedor");
            }
          }
        }
      }
    };
  }
}

module.exports = { EmployeeModel, employeeSchema, EMPLOYEE_TABLE };