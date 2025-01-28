const {DataTypes, Model} = require('sequelize')

const BRANDS_TABLE='brands'

const brandScrema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: true,
        unique: true
    }
}

class brandModel extends Model {

    static associate(models) {
        this.hasMany(models.productModel, {
            foreignKey: 'brandId',
            as: 'brands',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: BRANDS_TABLE,
            modelName: 'brandModel',
            timestamps: true
        };
    }
}

module.exports = {BRANDS_TABLE, brandScrema, brandModel};