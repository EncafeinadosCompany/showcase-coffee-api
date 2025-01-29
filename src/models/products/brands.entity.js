const { DataTypes, Model } = require("sequelize");

const BRAND_TABLE = "brands";

const brandSchema = {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
};

class BrandModel extends Model {
  static associate(models) {
    this.hasMany(models.ProductModel, {
      foreignKey: "id_brand",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BRAND_TABLE,
      modelName: "BrandModel",
      timestamps: true,
    };
  }
}

module.exports = { BRAND_TABLE, brandSchema, BrandModel };
