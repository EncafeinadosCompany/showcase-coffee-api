const { DataTypes, Model } = require("sequelize");

const SOCIAL_NETWORK_TABLE = 'social_networks'

const networkShema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}

class SocialNetworkModel extends Model {
    static associate(models) {
       

        this.hasMany(models.SocialBrandModel, {
            foreignKey: 'id_social_network',
            as: 'social_brands'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SOCIAL_NETWORK_TABLE,
            modelName: 'SocialNetworkModel',
            timestamps: false
        };
    }
}

module.exports = { SOCIAL_NETWORK_TABLE, SocialNetworkModel, networkShema };