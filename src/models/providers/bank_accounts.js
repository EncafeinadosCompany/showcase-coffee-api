const { DataTypes, Model, Sequelize } = require("sequelize");

const BANK_ACCOUNT_TABLE = "bank_accounts";

const bankAccountSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bank_account: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type_account: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provider_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "providers",
      key: "id", 
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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

class BankAccountModel extends Model {
  static associate(models) {
    this.belongsTo(models.ProviderModel, {
      as: "provider",
      foreignKey: "provider_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BANK_ACCOUNT_TABLE,
      modelName: "BankAccountModel",
      timestamps: false,
    };
  }
}

module.exports = { BANK_ACCOUNT_TABLE, bankAccountSchema, BankAccountModel };