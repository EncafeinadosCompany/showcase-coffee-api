const { DataTypes, Model } = require('sequelize');

const PRODUCT_PROVIDER_TABLE = 'products_providers';

const productProviderSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    providerId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'providers', 
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
};

class Product_providerModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_PROVIDER_TABLE,
            modelName: 'Product_providerModel',
            timestamps: true,
        };
    }
}

module.exports = { PRODUCT_PROVIDER_TABLE, productProviderSchema, Product_providerModel };