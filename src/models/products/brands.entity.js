const { DataTypes, Model } = require('sequelize');

const BRAND_TABLE='brands'

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
    }
}

class BrandModel extends Model {

    static associate(models) {
        this.belongsTo(models.productModel, {
            foreignKey: 'brandId',
            as: 'products',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BRAND_TABLE,
            modelName: 'BrandModel',
            timestamps: true
        };
    }
}

module.exports = {BRAND_TABLE, brandSchema, BrandModel};