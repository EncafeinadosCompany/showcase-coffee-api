const { DataTypes, Model } = require("sequelize");

const ATTRIBUTE_PRODUCT_TABLE = "attributes_products";

const attributeProductSchema = {
  atributteId: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  varianstId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
};

class AttributeProductModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ATTRIBUTE_PRODUCT_TABLE,
      modelName: "AttributeProductModel",
      timestamps: true,
    };
  }
}

module.exports = {
  ATTRIBUTE_PRODUCT_TABLE,
  attributeProductSchema,
  AttributeProductModel,
};
