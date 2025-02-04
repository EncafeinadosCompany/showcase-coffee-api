const { DataTypes, Model, Sequelize } = require("sequelize");
const { PROVIDER_TABLE } = require("../providers/provider.entity");
const { STORE_TABLE } = require("./store.entity");

const STORE_PROVIDER_TABLE = "store_provider";

const storeProviderSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_store: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: STORE_TABLE, 
      key: "id", 
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  id_provider: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PROVIDER_TABLE, 
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
      foreignKey: "id_store",
    });

    this.belongsTo(models.ProviderModel, {
      as: "provider",
      foreignKey: "id_provider",
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