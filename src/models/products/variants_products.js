const {DataTypes, Model} = require('sequelize')

const VARIANTS_PRODUCTS_TABLE = 'variants_products'

const productScrema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    grammage: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },

    imagesId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brandId:{
        type: DataTypes.INTERGER,
        allowNull: true
    }
}

class VariantsProductsModel extends Model {
    static associate(models) {
        this.hasMany(models.ProductModel, {
            foreignKey: 'id',
            as: 'products',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: VARIANTS_PRODUCTS_TABLE,
            modelName: 'variants_products_model',
            timestamps: true
        };
    }
}

module.exports = {VARIANTS_PRODUCTS_TABLE, productScrema, VariantsProductsModel};