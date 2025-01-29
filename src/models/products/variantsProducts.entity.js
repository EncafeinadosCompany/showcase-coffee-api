const {DataTypes, Model} = require('sequelize')

const VARIANTS_PRODUCTS_TABLE = 'variants_products'

const variantProductScrema = {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        
    },
    grammage: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brandId:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
}

class VariantProductModel extends Model {
    static associate(models) {

        this.belongsToMany(models.AttributeModel, {
            through: 'attributes_products',
            foreignKey: 'variantId',
            as: 'attributes',
        });

        this.hasMany(models.ProductModel, {foreignkey: 'productId'}        
        )
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: VARIANTS_PRODUCTS_TABLE,
            modelName: 'VariantProductModel',
            timestamps: true
        };
    }
}

module.exports = {VARIANTS_PRODUCTS_TABLE, variantProductScrema, VariantProductModel};