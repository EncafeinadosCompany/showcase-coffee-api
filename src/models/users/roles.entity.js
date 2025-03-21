const { DataTypes, Model, Sequelize } = require("sequelize");;

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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    }
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
            timestamps: false,
        };
    }
}

module.exports = { ROLE_TABLE, roleSchema, RoleModel };