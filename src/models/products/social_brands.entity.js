const {DataTypes , Model} = require('sequelize');
const {SOCIAL_NETWORK_TABLE} = require('./socialNetworks.entity')
const {BRAND_TABLE} = require('./brands.entity')
const SOCIAL_BRAND_TABLE = 'social_brands'

const socialBrandSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_brand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: BRAND_TABLE,
            key: 'id'
        }
    },
    id_social_network: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:SOCIAL_NETWORK_TABLE,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}

class SocialBrandModel extends Model {
    static associate(models) {
        this.belongsTo(models.BrandModel, {
            foreignKey: 'id_brand',
            as: 'brand'
        });
        this.belongsTo(models.SocialNetworkModel, {
            foreignKey: 'id_social_network',
            as: 'social_network'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SOCIAL_BRAND_TABLE,
            modelName: 'SocialBrandModel',
            timestamps: false
        };
    }
}

module.exports = { SOCIAL_BRAND_TABLE, SocialBrandModel, socialBrandSchema };