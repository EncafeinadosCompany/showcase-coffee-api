const { DataTypes, Model, Sequelize } = require("sequelize");
const { ATTRIBUTE_TABLE } = require("./attribute.entity");
const { PRODUCT_TABLE } = require("./products.entity");

const ATTRIBUTE_PRODUCT_TABLE = "attributes_products";

const attributeProductSchema = {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  value: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  id_attribute: {
    type: DataTypes.INTEGER,
    references: {
      model: ATTRIBUTE_TABLE,
      key: 'id'
    }
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    }
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

class AttributeProductModel extends Model {
  static config(sequelize) {
    
    return {
      sequelize,
      tableName: ATTRIBUTE_PRODUCT_TABLE,
      modelName: "AttributeProductModel",
      timestamps: false,
    };
  }
}

module.exports = { ATTRIBUTE_PRODUCT_TABLE, attributeProductSchema, AttributeProductModel };
