const { DataTypes, Model } = require('sequelize')

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
}

class AttributeModel extends Model {

    static associate(models) {
        this.belongsToMany(models.ProductModel, { through: 'attributes_products', foreignKey: 'id_attribute', otherKey: 'id_product' });
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

module.exports = { ATTRIBUTE_TABLE, attributeSchema, AttributeModel };