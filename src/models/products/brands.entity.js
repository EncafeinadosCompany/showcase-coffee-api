const { DataTypes, Model } = require('sequelize');

const BRAND_TABLE = 'brands'

const brandSchema = {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING(150),
    allowNull: true,
    unique: true
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
}

class BrandModel extends Model {
  static associate(models) {
    this.hasMany(models.ProductModel, {
      foreignKey: 'id_brand',
      as: 'products'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BRAND_TABLE,
      modelName: 'BrandModel',
      timestamps: true,
    };
  }
}

module.exports = { BRAND_TABLE, brandSchema, BrandModel };
