const { DataTypes, Model } = require("sequelize");
const { PRODUCT_TABLE } = require("./products.entity");

const VARIANT_PRODUCT_TABLE = "variants_products";

const variantProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grammage: {
    type: DataTypes.STRING(10),
    allowNull: true,
    unique: true,
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class VariantProductModel extends Model {
  static associate(models) {
   

    this.belongsTo(models.ProductModel, { foreignKey: "id_product" });

    this.hasMany(models.ImageVariantModel, {
      as: "productImages",
      foreignKey: "id_product",
    });

    //    this.hasMany(models.VariantProductModel, {foreignkey:'id_product'});
    this.hasMany(models.SalesVariantModel, {
      as: "salesVariants",
      foreignKey: "id_variant_products",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VARIANT_PRODUCT_TABLE,
      modelName: "VariantProductModel",
      timestamps: true,
    };
  }
}

module.exports = {
  VARIANT_PRODUCT_TABLE,
  variantProductSchema,
  VariantProductModel,
};
