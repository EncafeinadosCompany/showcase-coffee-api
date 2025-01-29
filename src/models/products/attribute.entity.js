const {DataTypes, Model} = require('sequelize')

const ATTRIBUTE_TABLE = 'attribute'

const attributeSchema = {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
    }
}

class AttributeModel extends Model {

    static associate(models) {
        this.belongsToMany(models.ProductModel, { through:models.attributes_products, foreignKey:'id_attribute', otherKey:'id_variant'});   
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ATTRIBUTE_TABLE,
            modelName: 'AttributeModel',
            timestamps: true
        };
    }
}

module.exports = {ATTRIBUTE_TABLE, attributeSchema, AttributeModel};