const { DataTypes, Model, Sequelize } = require("sequelize");;
const { STORE_TABLE } = require('../companies/store.entity');
const { EMPLOYEE_TABLE } = require('../users/employees.entity');

const SHOPPING_TABLE = 'shopping';

const shoppingSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_store: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: STORE_TABLE,
            key: 'id'
        }
    },
    id_employee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EMPLOYEE_TABLE,
            key: 'id'
        }
    },
    date_entry: {
        type: DataTypes.DATE,
        allowNull: false,
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
    },
};

class ShoppingModel extends Model {
    static associate(models) {

        this.hasMany(models.ShoppingVariantModel, {
            as: 'variants',
            foreignKey: 'id_shopping'
        });

        this.belongsTo(models.StoreModel, {
            as: 'store',
            foreignKey: 'id_store'
        });

        this.belongsTo(models.EmployeeModel, {
            as: 'employee',
            foreignKey: 'id_employee'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SHOPPING_TABLE,
            modelName: 'ShoppingModel',
            timestamps: false,
        };
    }

}

module.exports = { SHOPPING_TABLE, shoppingSchema, ShoppingModel };