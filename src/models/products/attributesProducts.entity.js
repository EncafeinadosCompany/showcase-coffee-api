const { DataTypes, Model } = require("sequelize");
const {ATTRIBUTE_TABLE} = require("./attribute.entity");
const {VARIANT_PRODUCT_TABLE} = require("./variantsProducts.entity");

const ATTRIBUTE_PRODUCT_TABLE = "attributes_products";

const attributeProductSchema = {
    id:{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_attribute: {
    type: DataTypes.INTEGER,
    references:{
        model:ATTRIBUTE_TABLE,
        key:'id'
    }
    },
  id_variant: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
        model:VARIANT_PRODUCT_TABLE,
        key:'id'
    }
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
