const { DataTypes, Model } = require('sequelize');

const PRODUCT_PROVIDER_TABLE = 'products_providers';

const productProviderSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_provider: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'providers', 
            key: 'id',
        },
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
};

class Product_providerModel extends Model {
    static associate(models) {

        this.belongsTo(models.ProviderModel, {
            as: 'providers',
            foreignKey: 'id_provider'
          });

          this.belongsTo(models.ProductModel, {
            as: 'products',
            foreignKey: 'id_product'
          });
    }
    

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