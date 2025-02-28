const { DataTypes, Model, Sequelize } = require("sequelize");

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
        this.belongsToMany(models.ProductModel, { through: models.AttributeProductModel, foreignKey: 'id_attribute', otherKey: 'id_product', as:'details' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ATTRIBUTE_TABLE,
            modelName: 'AttributeModel',
            timestamps: false
        };
    }
}

module.exports = { ATTRIBUTE_TABLE, attributeSchema, AttributeModel };