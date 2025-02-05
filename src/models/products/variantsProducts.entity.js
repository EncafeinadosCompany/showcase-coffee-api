const { DataTypes, Model, Sequelize } = require("sequelize");
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
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 10],
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      isInt: true,
    },
  },
  id_product: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PRODUCT_TABLE,
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
  }
};

class VariantProductModel extends Model {
  static associate(models) {

    this.belongsTo(models.ProductModel, {
      as: "product",
      foreignKey: "id_product"
    });

    this.hasMany(models.ImageVariantModel, {
      as: "images",
      foreignKey: "id_variant",
    });

    this.hasMany(models.ShoppingVariantModel, {
      as: "shoppingVariants",
      foreignKey: "id_variant_products",
    });

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
      timestamps: false,
    };
  }
}

module.exports = {
  VARIANT_PRODUCT_TABLE,
  variantProductSchema,
  VariantProductModel,
};
