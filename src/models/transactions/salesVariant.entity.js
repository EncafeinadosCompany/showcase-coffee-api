const { DataTypes, Model, Sequelize } = require("sequelize");
const { VARIANT_PRODUCT_TABLE } = require('../products/variantsProducts.entity');
const { SALE_TABLE } = require('./sales.entity');
const { SHOPPING_VARIANT_TABLE } = require('../transactions/shoppingVariant.entity');

const SALE_VARIANT_TABLE = 'sales_variant';

const saleVariantSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_sale: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SALE_TABLE,
            key: 'id'
        }
    },
    id_shopping_variant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SHOPPING_VARIANT_TABLE,
            key: 'id'
        }
    },
    id_variant_products: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: VARIANT_PRODUCT_TABLE,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
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

class SalesVariantModel extends Model {
    static associate(models) {
        this.belongsTo(models.SalesModel, {
            as: 'sale',
            foreignKey: 'id_sale'
        });

        this.belongsTo(models.VariantProductModel, {
            as: 'variantProduct',
            foreignKey: 'id_variant_products'
        });

        this.belongsTo(models.ShoppingVariantModel, {
            as: 'shoppingVariant',
            foreignKey: 'id_shopping_variant'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SALE_VARIANT_TABLE,
            modelName: 'SalesVariantModel',
            timestamps: false,
        };
    }
}

module.exports = { SALE_VARIANT_TABLE, saleVariantSchema, SalesVariantModel };