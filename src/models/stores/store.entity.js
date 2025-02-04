const { DataTypes, Model, Sequelize } = require("sequelize");;

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
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    }
};

class StoreModel extends Model {
    static associate(models) {
        this.hasMany(models.ShoppingsModel, {
            foreignKey: 'id_store',
            as: 'shoppings',
        });

        this.hasMany(models.EmployeeModel, {
            foreignKey: 'id_store',
            as: 'employees',
        });

        this.belongsToMany(models.ProviderModel, {
            through: models.StoreProviderModel,
            foreignKey: "store_id",
            as: "providers",
          });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: STORE_TABLE,
            modelName: 'StoreModel',
            timestamps: false,
        };
    }
}

module.exports = { STORE_TABLE, storeSchema, StoreModel };