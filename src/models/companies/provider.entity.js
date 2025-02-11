const { DataTypes, Model, Sequelize } = require("sequelize");;

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
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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

class ProviderModel extends Model {
    static associate(models) {

        this.hasMany(models.BankAccountModel, {
            as: "bankAccounts",
            foreignKey: "id_provider",
          });
          
        this.hasMany(models.Product_providerModel, {
            as: 'id_provider',
            foreignKey: 'products',
        });

        this.hasMany(models.EmployeeModel, {
            foreignKey: 'id_provider',
            as: 'employees'
        });
        
        this.belongsToMany(models.StoreModel, {
            through: 'store_provider',
            foreignKey: "id_provider", otherKey: "id_store",
            as: "provider_store", 
          });

          this.hasMany(models.LiquidationModel, {
            as: "liquidations",
            foreignKey: "id_provider",
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROVIDER_TABLE,
            modelName: 'ProviderModel',
            timestamps: false,
        };
    }
}

module.exports = { PROVIDER_TABLE, providerSchema, ProviderModel };