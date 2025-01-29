const {DataTypes, Model} = require('sequelize')

const ATTRIBUTE_PRODUCTS_TABLE = 'attributes_products'

const attributeProductSchema = {
    atributteId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    varianstId: {
        type: DataTypes.STRING(150),
        allowNull: true,
        unique: true
    }
}

class AttributeProductModel extends Model {


    static config(sequelize) {
        return {
            sequelize,
            tableName: ATTRIBUTE_PRODUCTS_TABLE,
            modelName: 'AttributeProductModel',
            timestamps: true
        };
    }
}

module.exports = {ATTRIBUTE_PRODUCTS_TABLE, attributeProductSchema, AttributeProductModel};