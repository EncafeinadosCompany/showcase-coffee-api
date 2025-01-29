const { DataTypes, Model } = require('sequelize');

const PRODUCTS_TABLE = 'products';

const productSchema = {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    id_brand: {
        type: DataTypes.INTEGER
    }
};

class ProductModel extends Model {

    static associate (models){
        
        this.belongsTo(models.BrandModel, {foreignKey:'id_brand'})
      
        this.hasMany(models.VariantProductModel, {foreignKey:'id_product'});
    }
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCTS_TABLE,
            modelName: 'ProductModel',
            timestamps: true
        };
    }
}

module.exports = { PRODUCTS_TABLE, productSchema, ProductModel };