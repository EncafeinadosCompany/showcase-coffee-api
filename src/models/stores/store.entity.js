const { DataTypes, Model } = require('sequelize');

const STORE_TABLE = 'stores';

const storeSchema = {
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
    email: {
        type: DataTypes.STRING,
        unique: true,
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
    logo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
};

class StoreModel extends Model {
    static associate(models) {
        this.hasMany(models.ShoppingsModel, {
            foreignKey: 'id_store',
            as: 'shoppings',
        });

        this.hasMany(models.EmployeeModel, {
            foreignKey: 'id_entity',
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

module.exports = { STORE_TABLE, storeSchema, StoreModel };