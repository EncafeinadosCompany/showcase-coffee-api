const {DataTypes, Model} = require('sequelize');
const SALE_VARIANT_TABLE= 'sales_variant'; 

const saleVariantSchema= {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_sales: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_products: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
};

class SalesVariantModel extends Model{
    static associate(models) {
        this.belongsTo(models.SalesModel, { 
          as: 'sale', 
          foreignKey: 'id_sales' 
        });
      }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SALE_VARIANT_TABLE,
            modelName: 'SalesVariantModel',
            timestamps: true,
        };
    }

}

module.exports = { SALE_VARIANT_TABLE, saleVariantSchema, SalesVariantModel };