const {DataTypes, Model} = require('sequelize')

const BRANDS_TABLE='brands'

const brandScrema = {
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
        this.belongsTo(models.ProductModel, {
            foreignKey: 'brandId',
            as: 'products',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BRANDS_TABLE,
            modelName: 'BrandModel',
            timestamps: true
        };
    }
}

module.exports = {BRANDS_TABLE, brandScrema, BrandModel};