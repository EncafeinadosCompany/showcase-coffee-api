const { DataTypes, Model, Sequelize } = require("sequelize");

const BRAND_TABLE = 'brands'

const brandSchema = {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  image_url:{
    type: DataTypes.STRING,
    allowNull: true,
    validate:{
      isUrl: true
    }
  },
  razon:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(150),
    allowNull: true
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

    this.hasMany(models.SocialBrandModel, {
      foreignKey: 'id_brand',
      as: 'social_networks'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: BRAND_TABLE,
      modelName: 'BrandModel',
      timestamps: false,
    };
  }
}

module.exports = { BRAND_TABLE, brandSchema, BrandModel };
