const { DataTypes, Model } = require('sequelize');

const STORE_TABLE = 'stores';

const storeSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
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

class StoreModel extends Model {
    static associate(models) {
        this.hasMany(models.ShoppingModel, {
            foreignKey: 'storeId',
            as: 'shoppings',
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