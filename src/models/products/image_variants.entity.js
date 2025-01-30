const { DataTypes, Model, Sequelize } = require("sequelize");;
const { VARIANT_PRODUCT_TABLE } = require('../products/variantsProducts.entity')

const IMAGE_VARIANTS_TABLE = 'image_variants';

const imageVariantSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: VARIANT_PRODUCT_TABLE,
            key: 'id_product',
        },
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
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

class ImageVariantModel extends Model {
    static associate(models) {
        this.belongsTo(models.ProductModel, {
            foreignKey: 'id',
            as: 'product',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: IMAGE_VARIANTS_TABLE,
            modelName: 'ImageVariantModel',
            timestamps: false,
        };
    }
}

module.exports = { IMAGE_VARIANTS_TABLE, imageVariantSchema, ImageVariantModel };
