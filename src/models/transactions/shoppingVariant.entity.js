const { DataTypes, Model, Sequelize } = require("sequelize");;
const { SHOPPING_TABLE } = require('./shopping.entity')
const { VARIANT_PRODUCT_TABLE } = require('../products/variantsProducts.entity')

const SHOPPING_VARIANT_TABLE = 'shopping_variant';

const shoppingVariantSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_shopping: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SHOPPING_TABLE,
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
    roasting_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remaining_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    shopping_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    sale_price: {
        type: DataTypes.FLOAT,
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

class ShoppingVariantModel extends Model {
    static associate(models) {

        this.belongsTo(models.ShoppingModel, {
            as: 'shopping',
            foreignKey: 'id_shopping'
        });

        this.belongsTo(models.VariantProductModel, {
            as: "variant",
            foreignKey: 'id_variant_products'
        });

        this.hasMany(models.SalesVariantModel, { foreignKey: 'id_variant_products', as: 'salesVariants' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SHOPPING_VARIANT_TABLE,
            modelName: 'ShoppingVariantModel',
            timestamps: false,
            hooks: {
                beforeCreate: (shoppingVariant) => {
                    shoppingVariant.remaining_quantity = shoppingVariant.quantity;
                }
            }
        };
    }

}

module.exports = { SHOPPING_VARIANT_TABLE, shoppingVariantSchema, ShoppingVariantModel };