const { DateTypes, Model } = require('sequelize');

const ROLE_TABLE = 'roles';

const roleSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
};

class RoleModel extends Model {
    static associate(models) {

        this.hasMany(models.UserModel, {
            foreignKey: 'id_role',
            as: 'users',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ROLE_TABLE,
            modelName: 'RoleModel',
            timestamps: true,
        };
    }
}

module.exports = { ROLE_TABLE, roleSchema, RoleModel };