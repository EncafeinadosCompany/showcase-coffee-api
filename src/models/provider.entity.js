const { DataTypes, Model } = require('sequelize');

const STORE_TABLE = 'providers';

const providerSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nit: {
        type: DataTypes.STRING,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        unique: true,
    }
};

class ProviderModel extends Model {
    static associate(models) {

        this.hasMany(models.Product_providerModel, {
            foreignKey: 'providerId',
            as: 'products', 
        });

        this.hasMany(models.ProviderEmployeeModel, {
            foreignKey: 'providerId',
            as: 'employees',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: STORE_TABLE,
            modelName: 'StoreModel',
            timestamps: true,
        };
    }
}

module.exports = { PROVIDER_TABLE, providerSchema, ProviderModel };