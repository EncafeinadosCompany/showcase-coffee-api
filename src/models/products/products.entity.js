const { DataTypes, Model } = require("sequelize");

const { BRAND_TABLE } = require("./brands.entity");

const PRODUCT_TABLE = "products";

const productSchema = {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  id_brand: {
    type: DataTypes.INTEGER,
    references: {
      model: BRAND_TABLE,
      key: "id",
    },
  }
};

class ProductModel extends Model {
  static associate(models) {
    this.belongsTo(models.BrandModel, { foreignKey: "id_brand", as: "brand" });

    this.belongsToMany(models.AttributeModel, {
      through: 'attributes_products',
      foreignKey: "id_product",
      otherKey: "id_attribute",
    });

    this.hasMany(models.VariantProductModel, { foreignKey: "id_product" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "ProductModel",
      timestamps: false
    };
  }
}

module.exports = { PRODUCT_TABLE, productSchema, ProductModel };
