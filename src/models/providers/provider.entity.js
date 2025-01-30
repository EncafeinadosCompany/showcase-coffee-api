const { DataTypes, Model } = require('sequelize');

const PROVIDER_TABLE = 'providers';

const providerSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nit: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    bank_account: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    type_account: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        unique: true,
    },

};

class ProviderModel extends Model {
    static associate(models) {

        this.hasMany(models.Product_providerModel, {
            foreignKey: 'id_provider',
            as: 'products', 
        });

        this.hasMany(models.EmployeeModel, {
            foreignKey: 'id_provider',
            as: 'employees',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROVIDER_TABLE,
            modelName: 'StoreModel',
            timestamps: false,
        };
    }
}

module.exports = { PROVIDER_TABLE, providerSchema, ProviderModel };