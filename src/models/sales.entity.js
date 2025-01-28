const {DataTypes, Model} = require('sequelize');
const SALE_TABLE= 'sales';

const saleSchema= {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
};

class SalesModel extends Model{
    static associate(models) {
        this.hasMany(models.SalesVariantModel, { 
          as: 'variants', 
          foreignKey: 'id_sales' 
        });
  }    

    static config(sequelize) {
        return {
            sequelize,
            tableName: SALE_TABLE,
            modelName: 'SalesModel',
            timestamps: true,
        };
    }

}

module.exports = { SALE_TABLE, saleSchema, SalesModel };