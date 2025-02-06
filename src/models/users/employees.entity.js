const { DataTypes, Model, Sequelize } = require("sequelize");;
const { USER_TABLE } = require('./users.entity');
const { STORE_TABLE } = require('../companies/store.entity');
const { PROVIDER_TABLE } = require('../companies/provider.entity');

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
  email: {
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
      model: STORE_TABLE,
      key: 'id'
    }
  },
  id_provider: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PROVIDER_TABLE,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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
      foreignKey: 'id_employee',
      as: 'shoppings',
    });

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EMPLOYEE_TABLE,
      modelName: 'EmployeeModel',
      timestamps: false,
      hooks: {
        beforeValidate: (employee) => {
          if (employee.type === 'store') {
            employee.id_provider = null;
            if (!employee.id_store) {
              throw new Error("Store ID is required");
            }
          } else if (employee.type === 'provider') {
            employee.id_store = null;
            if (!employee.id_provider) {
              throw new Error("Provider ID is required");
            }
          }
        }
      }

    };
  }
}

module.exports = { EmployeeModel, employeeSchema, EMPLOYEE_TABLE }; 