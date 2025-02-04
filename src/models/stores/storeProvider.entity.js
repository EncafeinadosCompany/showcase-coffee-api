const { DataTypes, Model, Sequelize } = require("sequelize");

const STORE_PROVIDER_TABLE = "store_provider";

const storeProviderSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "stores", 
      key: "id", 
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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

class StoreProviderModel extends Model {
  static associate(models) {
    this.belongsTo(models.StoreModel, {
      as: "store",
      foreignKey: "store_id",
    });

    this.belongsTo(models.ProviderModel, {
      as: "provider",
      foreignKey: "provider_id",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STORE_PROVIDER_TABLE,
      modelName: "StoreProviderModel",
      timestamps: false,
    };
  }
}

module.exports = { STORE_PROVIDER_TABLE, storeProviderSchema, StoreProviderModel };