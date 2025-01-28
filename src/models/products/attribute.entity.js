const {DataType, Model} = require('sequelize')

const ATRIBUTE_TABLE = 'attribute_variants'

const attributeSchema = {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: true,
        unique: true
    }
}

class AttributeModel extends Model {

    static associate(models) {
        this.belongsToMany(models.VariantProductModel, { 
            through: 'attributes_products',  
            as: 'variantsProducts'});
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ATRIBUTE_TABLE,
            modelName: 'AttributeModel',
            timestamps: true
        };
    }
}

module.exports = {ATRIBUTE_TABLE, attributeSchema, AttributeModel};