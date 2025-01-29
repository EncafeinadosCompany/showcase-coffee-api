const { DataTypes, Model } = require('sequelize');

const VARIANT_PRODUCT_TABLE = 'variants_products'

const variantProductSchema = {
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

        this.belongsToMany(models.AttributesModel, {
            through: 'attributes_products',
            as: 'attributes',
        });

        this.hasMany(models.ProductModel, {foreignkey: 'productId'}
            
        );

        this.hasMany(models.SalesVariantModel, {
            as: 'salesVariants',
            foreignKey: 'id_variant_products'
          });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: VARIANT_PRODUCT_TABLE,
            modelName: 'VariantProductModel',
            timestamps: true
        };
    }
}

module.exports = {VARIANT_PRODUCT_TABLE, variantProductSchema, VariantProductModel};