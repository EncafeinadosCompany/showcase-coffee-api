const { DataTypes, Model, Sequelize } = require("sequelize");;

const SALE_TABLE = 'sales';

const saleSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type_payment: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
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
    },
};

class SalesModel extends Model {
    static associate(models) {
        this.hasMany(models.SalesVariantModel, {
            as: 'sales_variant',
            foreignKey: 'id_sale'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SALE_TABLE,
            modelName: 'SalesModel',
            timestamps: false,
        };
    }

}

module.exports = { SALE_TABLE, saleSchema, SalesModel };