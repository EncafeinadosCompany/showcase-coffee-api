const { DataTypes, Model, Sequelize } = require("sequelize");

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
    validate: {
      notEmpty: {
        msg: "El nombre del producto no puede estar vacío",
      },
      len: {
        args: [1, 50],
        msg: "El nombre del producto debe tener entre 1 y 50 caracteres",
      },
    },
  },
  id_brand: {
    type: DataTypes.INTEGER,
    references: {
      model: BRAND_TABLE,
      key: "id",
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
};

class ProductModel extends Model {
  static associate(models) {
    this.belongsTo(models.BrandModel, { foreignKey: "id_brand", as: "brand" });

    this.belongsToMany(models.AttributeModel, {
      through: "attributes_products",
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
      timestamps: true,
    };
  }
}

module.exports = { PRODUCT_TABLE, productSchema, ProductModel };
