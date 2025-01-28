const { DataTypes, Model } = require('sequelize');

const PRODUCTS_TABLE = 'products';

const productSchema = {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    brandId: {
        type: DataTypes.UUID 
    }
};

class ProductModel extends Model {

    static associate (models){
        
        this.hasMany(models.BrandModel, {
            foreignKey: 'brandId',
            as: 'brands'
        });
    }
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCTS_TABLE,
            modelName: 'ProductModel',
            timestamps: true
        };
    }
}

module.exports = { PRODUCTS_TABLE, productSchema, ProductModel };