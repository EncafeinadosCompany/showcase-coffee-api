const { DataTypes, Model } = require('sequelize');

const PRODUCTS_TABLE = 'products';

const productSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    id_brand: {
        type: DataTypes.UUID 
    }
};

class ProductModel extends Model {
    

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCTS_TABLE,
            modelName: 'productModel',
            timestamps: true
        };
    }
}

module.exports = { PRODUCTS_TABLE, productSchema, ProductModel };