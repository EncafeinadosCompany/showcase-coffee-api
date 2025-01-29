const {DataTypes, Model} = require('sequelize')

const VARIANTS_PRODUCTS_TABLE = 'variants_products'

const variantProductScrema = {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
        
    },
    grammage: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    id_product:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    imageId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_brand:{
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
        })

        this.belongsTo(models.ProductModel, {foreignKey:'id_product'});


        //    this.hasMany(models.VariantProductModel, {foreignkey:'id_product'});
        // this.hasMany(models.SalesVariantModel, {
        //     as: 'salesVariants',
        //     foreignKey: 'id_variant_products'
        //   });
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